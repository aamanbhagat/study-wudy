## 1. The one-sentence answer
**Distributed databases partition data across independent nodes via sharding while maintaining synchronized copies of that data through replication.**

Sharding divides a dataset into smaller, non-overlapping subsets called shards and assigns each shard to a separate server. This removes single-machine size limits and allows linear growth in storage and query throughput as nodes are added. Replication then creates identical copies of each shard on multiple nodes so that the loss of any one node does not erase the data.

Taken together, the two mechanisms let a system survive node failures while still serving reads and writes at scale. The central engineering tension is that every sharding decision affects how replication traffic, consistency guarantees, and recovery procedures must be designed.

> [!NOTE]
> The decisive insight is that sharding controls *where* data lives while replication controls *how many* independent copies exist; these two decisions are orthogonal yet must be solved together because a shard that is never replicated offers no fault tolerance and a fully replicated dataset that is never sharded hits a single-node ceiling.

## 2. Why this matters — concrete and current
Google Spanner uses range-based sharding combined with synchronous replication across Paxos groups to deliver externally consistent transactions at global scale for its advertising and financial systems.  

Amazon DynamoDB applies consistent hashing for sharding and configurable replication factors (typically three) so that the service can absorb the loss of entire availability zones while still meeting single-digit-millisecond latency SLAs for millions of customers.  

Meta’s TAO graph store shards user social graphs by consistent hashing on object IDs and replicates each shard across multiple data centers, enabling the “like” and “friend” operations that sustain billions of daily reads.  

CockroachDB, used by several large fintech platforms, shards by key ranges and replicates via Raft so that a regional outage does not halt transaction processing, satisfying regulatory requirements for continuous availability.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| CAP theorem              | Explains the unavoidable trade-off among consistency, availability, and partition tolerance that every sharding-plus-replication design must navigate. |
| Basic ACID properties    | Defines the guarantees a replicated shard must preserve or relax when nodes fail or network partitions occur. |
| Hash functions           | Provide the deterministic mapping from keys to shards that makes both lookup and load balancing possible. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Partitioning removes the single-node bottleneck
A single server can store and serve only a finite number of rows and queries. By splitting the key space into disjoint intervals or hash buckets, each interval can be assigned to a distinct node, allowing aggregate capacity to grow with the number of nodes.

Concrete example: keys 1–1 000 000 are split into four shards of 250 000 keys each; each shard lives on its own machine.

Formal statement: given a key space \(K\) and \(n\) nodes, a sharding function \(s: K \to \{1,\dots,n\}\) produces the assignment \(k \mapsto s(k)\).

> [!WARNING]
> If the sharding function is not deterministic, the same key may map to different nodes on successive lookups, silently losing or duplicating data.

### Step 2 — Sharding strategies define the mapping function
Four canonical strategies exist: range partitioning, hash partitioning, directory-based partitioning, and consistent hashing. Each trades off load balance, range-query support, and re-sharding cost.

Formal statement: a strategy is a concrete realization of \(s\) together with a rebalancing protocol when nodes join or leave.

### Step 3 — Replication creates independent copies of each shard
Once a shard is placed on a node, replication copies its state to \(r-1\) additional nodes (replication factor \(r\)). Copies may be kept synchronously or asynchronously.

Formal statement: for shard \(S_i\) the replica set is \(R_i = \{N_{i1},\dots,N_{ir}\}\) with one designated leader for writes under master-slave replication.

### Step 4 — Consistency models constrain replica divergence
Under eventual consistency any replica may accept a write; under strong consistency only the leader accepts writes and propagates them before acknowledging the client.

Formal statement: a system satisfies linearizability if every read returns the value of the most recent write that completed before the read started, across all replicas.

### Step 5 — Combining sharding and replication yields the full architecture
Each shard \(S_i\) is independently replicated to its own replica set \(R_i\). Routing tables map keys to the current leader of the appropriate replica set.

Formal statement: the complete mapping is the composition \(k \mapsto \text{leader}(R_{s(k)})\).

### Step 6 — Textbook statement of the result
A distributed database is a pair \((S,R)\) where \(S\) is a partition of the key space and \(R\) assigns to each shard a replica set of size at least two; correctness requires that every read and write is routed to a live replica that holds the latest version according to the chosen consistency model.

## 5. Worked examples — every step shown

**Example 1 — Range sharding with factor-2 replication**  
*Given:* keys are integers; two nodes; replication factor 2.  
*Find:* placement of key 42.  

Step 1: divide key space at 500 → shard A = [1,500], shard B = [501,1000].  
*Why:* range boundaries give contiguous blocks.  

Step 2: assign shard A to node 1, shard B to node 2.  
*Why:* each shard must reside on a distinct node.  

Step 3: replicate shard A to node 2 and shard B to node 1.  
*Why:* replication factor 2 requires a second copy.  

**Final placement**  
42 → shard A leader on node 1, replica on node 2.  

*Reflection:* The example shows that replication doubles storage but does not change the sharding decision.

**Example 2 — Hash sharding with consistent hashing**  
*Given:* 3 nodes, 1000 keys, replication factor 3.  
*Find:* number of virtual nodes needed for balance.  

Step 1: place 100 virtual nodes per physical node on the ring.  
*Why:* virtual nodes smooth hash distribution.  

Step 2: each key hashes to a point; the next 3 virtual nodes (wrapping around) become its replicas.  
*Why:* consistent hashing guarantees at most a 1/3 movement on node addition.  

**Final answer**  
300 virtual nodes total; each physical node owns 100.  

*Reflection:* Virtual nodes decouple logical replication factor from physical node count.

**Example 3 — Re-sharding after node failure**  
*Given:* node 2 fails; its shards must be reassigned.  
*Find:* new leaders.  

Step 1: detect failure via heartbeat timeout.  
*Why:* liveness check triggers reconfiguration.  

Step 2: promote the highest-ranked replica of each lost shard.  
*Why:* promotion restores write availability without data movement.  

**Final answer**  
All former replicas of node 2 become leaders on their surviving nodes.  

*Reflection:* Replication supplies the spare copies that make failover instantaneous.

**Example 4 — Read routing under eventual consistency**  
*Given:* three replicas per shard, last-write-wins timestamp.  
*Find:* which replica answers a read.  

Step 1: client contacts any replica.  
*Why:* any replica may serve reads.  

Step 2: replica returns value with highest timestamp.  
*Why:* monotonic timestamps implement last-write-wins.  

**Final answer**  
The replica reporting the maximum timestamp wins.  

*Reflection:* Eventual consistency trades immediate correctness for higher availability.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                                      | How to avoid it                                      |
|-----------------------------|-----------------------------------------------------|------------------------------------------------------|
| Hot-spot keys under hash sharding | Popular keys hash to the same node                  | Add per-key salting or use virtual nodes             |
| Re-sharding under load      | Operators wait until capacity is exhausted          | Trigger rebalance at 70 % utilization                |
| Stale reads after failover  | Clients cache old leader addresses                  | Use lease-based leader discovery or version vectors  |
| Synchronous replication latency | All replicas must acknowledge before commit       | Choose quorum size smaller than replication factor   |
| Directory-service single point of failure | Shard map stored on one node                     | Replicate the directory itself with Raft or Paxos    |
| Ignoring cross-shard transactions | Application issues multi-shard updates without coordination | Use two-phase commit or sagas                        |
| Over-replication            | Every shard given maximum replicas “just in case”   | Set per-shard replication factor based on durability SLA |

## 7. The textbook-precise statement
A distributed database consists of a sharding function \(s: K \to \{1,\dots,m\}\) that partitions the key space \(K\) into \(m\) shards and a replication assignment \(r: \{1,\dots,m\} \to 2^N\) such that \(|r(i)|\geq 2\) for every shard. Correctness requires that for every operation there exists a replica set \(R = r(s(k))\) whose members agree on the ordering of writes according to the chosen consistency model (linearizability, sequential consistency, or eventual consistency). See Özsu & Valduriez, *Principles of Distributed Database Systems*, 4e, Chapter 13.

## 8. Visual — diagram or schematic
```text
Key space K
[0 ------------------------------------------- 2^32-1]
          |                  |                  |
       Shard 1            Shard 2            Shard 3
     (range 0-2^10)    (range 2^11-2^21)   (hash mod 3)
          |                  |                  |
   +------+------+    +------+------+    +------+------+
   |             |    |             |    |             |
 Node A (L)   Node B (R)  Node B (L)   Node C (R)  Node C (L)   Node A (R)
```
L = leader, R = replica. Arrows indicate replication direction; each shard has its own independent replica set.

## 9. The memory technique
1. **The hook** — picture a library where every book is torn into chapters (shards) and each chapter is photocopied onto several shelves in different rooms (replicas).  
2. **What to overlearn** — (a) consistent hashing ring with virtual nodes, (b) quorum rule \(W+R > N\), (c) leader election via highest epoch number.  
3. **Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — start from a single node, add one node, derive the minimal mapping change that preserves both partition and replication invariants.

## 10. What this unlocks
Mastery of sharding and replication lets you design systems that scale horizontally while surviving failures.  

- Next: quorum systems and the Raft consensus algorithm  
- Next: distributed transaction protocols (Two-Phase Commit, Percolator)  
- Next: geo-replication and latency-optimal replica placement  
- Next: operational concerns such as online schema changes and backup across shards

## 11. Self-check — five questions, no answers
1. A system shards by hash and replicates each shard to three nodes. If one node fails, how many keys must change location under consistent hashing versus naive modulo hashing?  
2. Under what workload would range sharding produce severe load imbalance while hash sharding would not?  
3. Draw the replica sets after a node joins a consistent-hashing ring that already contains three nodes and replication factor three.  
4. Why does increasing the replication factor from three to five not automatically improve read latency under quorum reads?  
5. A cross-shard transaction updates two shards whose leaders reside on different nodes. Which additional protocol is required to guarantee atomicity?