## 1. The one-sentence answer
**Distributed databases shard data across multiple nodes using strategies such as range, hash, or directory-based partitioning while replicating shards to achieve scalability, availability, and fault tolerance.**

Sharding splits large tables horizontally so each node stores only a subset of rows. Replication then creates copies of those shards on other nodes so reads and writes survive node failures. Aap dekh sakte ho ki yeh dono techniques saath mein kaam karte hain: sharding throughput badhata hai aur replication durability deta hai.

Real systems mein aapko trade-offs milte hain. Agar aap ek shard ko zyada nodes par replicate karte ho to write latency badh sakti hai, lekin read availability improve hoti hai. Directory-based sharding metadata maintain karta hai jo routing decisions leta hai.

> [!NOTE]
> The core insight is that sharding and replication are orthogonal yet coupled: sharding decides “where a row lives” while replication decides “how many copies exist and how they stay consistent.”

## 2. Why this matters — concrete and current
Google Spanner shards user data by key ranges across data centers and replicates each shard synchronously using Paxos to meet external-consistency guarantees for financial transactions.

Amazon DynamoDB uses consistent hashing for sharding and configurable replication factors (usually three) so that shopping-cart and inventory workloads survive entire availability-zone outages.

Meta’s TAO graph store shards social-graph edges by user ID ranges and maintains master-slave replicas within each region so that the Like and Friend-list APIs remain available during regional disasters.

CockroachDB, used by several fintech startups, applies range-based sharding with Raft replication; each 64 MiB range is replicated across three nodes, allowing the ledger to tolerate one node failure without losing ACID properties.

Kubernetes StatefulSets combined with etcd replicate shard metadata; cloud-native operators rely on this pattern to scale stateful workloads such as Prometheus or Vitess.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| ACID properties          | Sharding and replication must preserve atomicity and durability across nodes.        |
| CAP theorem              | Every design choice trades consistency against availability when partitions occur.   |
| Consistent hashing       | Hash-based sharding needs this to minimise data movement when nodes join or leave.   |
| Two-phase commit / Paxos | Replication protocols rely on these to agree on write order across replicas.         |

Agar aapne upar ke concepts nahi padhe to pehle unhe cover kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Partition the key space
Aap data ko logically ek key space ke roop mein socho. Har row ek primary key se identify hoti hai. Partitioning is key space ko disjoint intervals ya buckets mein todta hai.

Example: user IDs 1 se 1 000 000 tak hain. Range sharding karte hue aap 1-250 000 ko node A, 250 001-500 000 ko node B assign karte ho.

Formal statement: Let \(K\) be the totally ordered key space. A sharding function \(S: K \to \{1..N\}\) maps each key to a shard identifier.

> [!WARNING]
> Agar boundary keys galat choose kiye (hot spots) to ek shard overloaded ho jayega aur scalability khatam ho jayegi.

### Step 2 — Choose a sharding strategy
Range sharding keys ko sorted order mein todta hai. Hash sharding ek hash function apply karke uniform distribution deta hai. Directory sharding ek lookup table maintain karta hai.

Example: hash sharding mein \(S(k) = \text{hash}(k) \bmod N\).

Formal statement: Hash strategy uses a uniform hash \(h: K \to \{0..M-1\}\) followed by modulo reduction.

> [!WARNING]
> Range sharding query routing ko simple banata hai lekin load imbalance create kar sakta hai; hash sharding load balance karta hai lekin range queries ko mushkil.

### Step 3 — Replicate each shard
Har shard ke multiple copies alag nodes par rakho. Replication factor \(R\) decide karta hai kitni copies hongi.

Example: \(R=3\) matlab har shard teen nodes par exist karta hai.

Formal statement: For shard \(s\), the replica set \(\text{Replicas}(s)\) satisfies \(|\text{Replicas}(s)| = R\).

> [!WARNING]
> Agar \(R\) odd nahi rakha aur network partition aayi to quorum-based protocols deadlock mein phas sakte hain.

### Step 4 — Define consistency model
Synchronous replication har write ko \(R\) replicas tak pahunchata hai before acknowledging. Asynchronous replication sirf primary par write karta hai aur background mein copies banata hai.

Formal statement: Strong consistency requires that every read sees the latest committed write; eventual consistency only guarantees convergence after a quiescence period.

> [!WARNING]
> Asynchronous replication read-after-write anomalies create kar sakti hai agar aap secondary se read karte ho.

### Step 5 — Route queries with shard map
Client ya coordinator ek shard map consult karta hai jo key ko replica set se map karta hai. Map change hone par (re-sharding) aapko atomic hand-off chahiye.

Formal statement: A routing function \(R(k)\) returns the current primary replica for key \(k\).

## 5. Worked examples — har step show karo

**Example 1 — Range sharding a user table**  
*Given:* Keys 1–1 000 000, three nodes, range boundaries at 333 333 and 666 666.  
*Find:* Shard for key 450 000.  
Step: Compare 450 000 against boundaries → lies in second interval.  
*Why:* Range comparison directly gives the owning shard without hashing.  
**Shard 2**

*Reflection:* Simple numeric comparison works only when keys are ordered; string keys need locale-aware ordering.

**Example 2 — Hash sharding with consistent hashing**  
*Given:* Virtual nodes on a 0–2³² ring, three physical nodes each owning 100 virtual nodes. Key “user:42” hashes to 1 234 567 890.  
*Find:* Owning node.  
Step: Locate successor of 1 234 567 890 on the ring.  
*Why:* Consistent hashing minimises keys that move when a node is added.  
**Node B**

*Reflection:* Virtual nodes smooth load even when physical node count is small.

**Example 3 — Quorum write under replication factor 3**  
*Given:* Write must reach quorum \(W=2\). Three replicas A (primary), B, C.  
*Find:* Minimum acknowledgements needed.  
Step: Primary waits for one more ACK besides its own.  
*Why:* \(W > R/2\) guarantees that any two replica sets intersect.  
**2 acknowledgements**

*Reflection:* Quorum math directly follows from pigeonhole principle.

**Example 4 — Resharding after node addition**  
*Given:* Original 4 shards, add fifth node, use consistent hashing.  
*Find:* Fraction of keys expected to move.  
Step: Each key re-hashes; probability it lands on new node is 1/5.  
*Why:* Only 20 % data movement occurs instead of full re-partition.  
**Approximately 20 % keys move**

*Reflection:* The calculation assumes uniform hashing; real workloads need monitoring.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                                      | How to avoid it                                      |
|-----------------------------|-----------------------------------------------------|------------------------------------------------------|
| Hot-spot keys on range shard| Sequential IDs cluster at upper boundary            | Add synthetic shard key or switch to hash            |
| Reading from stale replica  | Application ignores read preference flags           | Always set read preference to primary or use sessions|
| Forgetting replication lag  | Metrics only track primary latency                  | Export replica lag as first-class metric             |
| Directory shard map becomes single point of failure | Central lookup table not replicated | Store shard map inside same consensus system         |
| Re-sharding under load      | Live migration without throttling                   | Use incremental token ranges and back-pressure       |
| Quorum misconfiguration     | Setting W+R ≤ R allows non-overlapping sets         | Enforce W+R > R at deployment time                   |

## 7. The textbook-precise statement
A distributed database system partitions the database into shards and maintains R replicas of each shard. Let \(K\) be the key space, \(S:K\to\{1..N\}\) the sharding function, and \(\text{Replicas}(s)\) the set of nodes storing shard \(s\). A write operation on key \(k\) succeeds only after acknowledgements from a write quorum \(W\) replicas where \(W+R>R\). Reads contact a read quorum of size \(R\). The system guarantees linearizability when \(W+R>R\) and the underlying replication protocol (Paxos or Raft) orders all writes. (Özsu & Valduriez, Principles of Distributed Database Systems, 4e, §9.3–9.5)

## 8. Visual — diagram or schematic
```
Key space: [0 … 2^32-1]
Ring (consistent hashing):
  0 ── Node A (vnode 1) ── Node B (vnode 2) ── Node C (vnode 3) ── back to 0
Shards:
  Shard 0: keys [0, 1.4e9)   replicas on A,B
  Shard 1: keys [1.4e9, 2.8e9) replicas on B,C
  Shard 2: keys [2.8e9, 4.2e9) replicas on C,A
```
Each arc represents a virtual node; arrows show replication targets.

## 9. The memory technique
1. **The hook** — Picture a library where every shelf (shard) has three identical copies on different floors (replicas); if one floor closes you still find the book.
2. **What to overlearn** — Quorum rule \(W+R>R\), consistent-hashing ring, and the fact that range versus hash is the only strategic choice that affects query patterns.
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Derive the minimal replica count from the inequality \(W+R>R\) by assuming one node may be unreachable.

## 10. What this unlocks
Once aap sharding and replication samajh jaate ho, aap CAP trade-offs, consistency models (linearizability vs causal), and distributed transaction protocols (Spanner-style TrueTime, Percolator) ko directly model kar sakte ho.

- Next topics: vector clocks, gossip protocols, distributed query planning
- Systems: TiDB, YugabyteDB, FaunaDB design discussions

## 11. Self-check — five questions, no answers
1. Calculate the expected data movement when a fifth node joins a four-node consistent-hash ring.
2. A system sets \(W=1\), \(R=1\), replication factor 3. Which anomaly can occur after a successful write?
3. Given keys 1–10 000 and range boundaries at 2500 and 7500, which shard owns key 6000?
4. Why does hash sharding break efficient range scans even when the hash function is uniform?
5. Draw the quorum intersection argument that proves \(W+R>R\) prevents split-brain writes.