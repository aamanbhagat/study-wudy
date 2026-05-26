## 1. The one-sentence answer
**RAID is a collection of disk-array organizations that combine multiple independent disks into a single logical unit, trading capacity, performance, and reliability according to explicit redundancy rules.**

RAID achieves this by deciding, for every block written, exactly where copies or parity information will reside. The choice of placement determines how many disks may fail before data is lost and how many disks participate in each read or write.

At the lowest level the operating system or controller sees only a linear address space; underneath that abstraction the array controller or software layer maps each logical block onto one or more physical sectors according to the chosen level.

> [!NOTE]
> The decisive insight is that redundancy is not free: every extra copy or parity block consumes both capacity and write bandwidth, and the precise cost depends on the arithmetic relationship between data blocks and check blocks.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover stores science imagery and telemetry on a pair of RAID-1 mirrored solid-state drives; any single flash die failure must not terminate a multi-year mission 200 million kilometres from Earth.

Google’s Colossus file system stripes data across thousands of chunkservers using a RAID-5-like parity scheme inside each 3-way replicated cluster; the design keeps petabyte-scale repair traffic tolerable while surviving routine disk failures that occur at roughly one per day per 10 000 drives.

Modern NVMe-oF storage arrays from Pure Storage and Dell EMC employ RAID-6 across 24-drive enclosures so that two simultaneous drive failures—common during firmware upgrades—do not cause data loss or performance collapse for database workloads.

AWS’s EBS gp3 and io2 Block Express volumes are internally protected by a RAID-10 variant that stripes 4 kB blocks across multiple underlying devices while maintaining two full mirrors, delivering the 99.999 % durability SLA that financial trading platforms contractually require.

The Linux Software RAID (md) driver, used by millions of servers, implements levels 0, 1, 5, 6 and 10; its performance characteristics directly affect container-image startup latency in Kubernetes clusters running at hyperscale.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                      |
|----------------------------|-----------------------------------------------------------|
| Disk geometry (sectors, tracks) | RAID controllers address physical sectors; misalignment destroys striping efficiency |
| XOR as bitwise parity      | RAID 5 and 6 compute parity with XOR; understanding its algebraic properties is required for reconstruction |
| Mean time between failures (MTBF) | Reliability calculations compare array MTBF against single-disk MTBF |
| Queueing and I/O scheduling | Striping changes the arrival rate and service time seen by each disk |

## 4. Building the idea — from intuition to formalism

### Step 1 — Striping spreads consecutive blocks across disks
Placing successive blocks on different disks lets multiple disks service a single large request in parallel.  
Example: four 4 KiB blocks written to a four-disk array become one block per disk.  
Formally, logical block \(L\) is stored on disk \(d = L \bmod N\) at offset \(\lfloor L/N \rfloor\), where \(N\) is the number of data disks.  
> [!WARNING]  
> If you forget that striping is only an address-mapping rule and not a redundancy rule, you will incorrectly assume RAID 0 tolerates failures.

### Step 2 — Mirroring duplicates every block on a second disk
Each write is performed twice; a read may be served from either copy.  
Example: disk 0 holds block \(L\), disk 1 holds an identical copy.  
Formally, two disks store identical content, yielding \(C = D/2\) usable capacity for \(D\) disks.  
> [!WARNING]  
> Treating the second copy as “free” capacity leads to sudden space exhaustion when administrators forget the 50 % overhead.

### Step 3 — Parity replaces one full copy with a compact check block
Instead of storing two identical copies, store one data copy plus the bitwise XOR of all data blocks in a stripe.  
Example: blocks \(A, B, C\) on three disks; parity \(P = A \oplus B \oplus C\) on the fourth.  
Formally, \(P = \bigoplus_{i=0}^{k-1} D_i\) where \(k\) is stripe width.  
> [!WARNING]  
> Computing parity on every write adds a read-modify-write cycle; omitting that cycle produces silent corruption.

### Step 4 — RAID 5 distributes parity to eliminate a single bottleneck
Parity blocks rotate across all disks so no disk is dedicated to parity.  
Example: stripe 0 parity on disk 4, stripe 1 parity on disk 3, etc.  
Formally, parity disk for stripe \(s\) is \((s \bmod N)\).  
> [!WARNING]  
> Fixed parity disk creates a permanent write hotspot; rotation removes it only if the rotation rule is applied consistently on every stripe.

### Step 5 — RAID 6 adds a second independent parity function
Two parity equations (usually XOR and Reed-Solomon) survive any two disk failures.  
Example: \(P = \bigoplus D_i\), \(Q = \bigoplus i \cdot D_i\) over GF(2^8).  
Formally, minimum distance 3 in the code allows recovery from any two erasures.  
> [!WARNING]  
> Using two identical XOR functions yields only distance 2; the second function must be algebraically independent.

### Step 6 — RAID 10 composes striping and mirroring
A striped set of mirrored pairs yields both parallelism and full redundancy.  
Example: four disks form two mirrors; the mirrors are then striped.  
Formally, usable capacity equals half the raw capacity while tolerating one failure per mirror.  
> [!WARNING]  
> RAID 10 is not RAID 01; swapping the order changes rebuild behaviour and failure tolerance.

### Step 7 — Capacity, performance and reliability are linked by stripe geometry
Let \(N\) be total disks, \(k\) data disks per stripe. Then usable fraction is \(k/N\), minimum write cost is 1 for RAID 0, 2 for RAID 1/10, 4 for RAID 5, and 6 for RAID 6 (read-modify-write).  
> [!WARNING]  
> Ignoring the read-modify-write multiplier produces optimistic throughput predictions that never appear in practice.

## 5. Worked examples — every step shown

**Example 1 — Four-disk RAID 0 capacity and mapping**  
*Given:* 4 disks, 1 TiB each, RAID 0.  
*Find:* usable capacity and location of logical block 5 000 000.  
Step 1: usable capacity = \(4 \times 1\) TiB because no redundancy is stored.  
*Why* — RAID 0 stores only data blocks.  
Step 2: disk index = \(5\,000\,000 \bmod 4 = 0\).  
*Why* — modular arithmetic implements round-robin striping.  
Step 3: offset on disk 0 = \(\lfloor 5\,000\,000 / 4 \rfloor = 1\,250\,000\).  
*Why* — each disk receives every fourth block.  
**1 TiB usable; block 5 000 000 on disk 0 at offset 1 250 000**

*Reflection* — The arithmetic is identical to simple interleaving; the only trap is forgetting that failure of any disk destroys the entire array.

**Example 2 — RAID 5 parity calculation**  
*Given:* stripe containing blocks \(A=0b1100\), \(B=0b1010\), \(C=0b0110\).  
*Find:* parity block \(P\).  
Step 1: \(P = A \oplus B \oplus C\).  
*Why* — XOR is associative and commutative, order does not matter.  
Step 2: \(0b1100 \oplus 0b1010 = 0b0110\).  
*Why* — bit-wise exclusive-or.  
Step 3: \(0b0110 \oplus 0b0110 = 0b0000\).  
*Why* — final XOR yields parity.  
**P = 0b0000**

*Reflection* — The same XOR reconstructs any single missing block; students often forget that parity must also be updated on every write.

**Example 3 — RAID 6 two-failure recovery**  
*Given:* disks 0–3 hold \(D_0, D_1, P, Q\); disks 2 and 3 fail.  
*Find:* recovered \(D_0, D_1\).  
Step 1: recompute \(P' = D_0 \oplus D_1\) from surviving data.  
*Why* — definition of first parity.  
Step 2: \(P' \oplus P\) yields the lost parity location, confirming consistency.  
*Why* — equality must hold or second parity is required.  
Step 3: use second parity equation to solve the linear system over GF(2^8).  
*Why* — two independent equations allow two unknowns.  
**Both blocks recovered**

*Reflection* — RAID 6 recovery cost is quadratic in stripe width; the algebraic independence of the two parities is the key property.

**Example 4 — RAID 10 versus RAID 5 write cost**  
*Given:* 8 KiB random write, 4 KiB blocks, 4-disk arrays.  
*Find:* minimum physical I/Os.  
Step 1 (RAID 10): two mirrored writes → 2 I/Os.  
*Why* — each mirror pair is independent.  
Step 2 (RAID 5): read old data and parity, write new data and parity → 4 I/Os.  
*Why* — read-modify-write is mandatory to keep parity consistent.  
**RAID 10: 2 I/Os; RAID 5: 4 I/Os**

*Reflection* — The factor-of-two difference explains why database logs often prefer RAID 10 despite lower capacity efficiency.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Assuming RAID 5 survives two failures | Parity protects only one disk               | Count the number of independent parity equations     |
| Ignoring rebuild traffic          | Rebuild reads every surviving disk          | Model rebuild as additional load in queueing analysis |
| Using RAID 0 for anything persistent | Zero redundancy is obvious on paper         | Require explicit justification for any production use |
| Confusing RAID 10 with RAID 01    | Both use mirroring and striping             | Remember 10 stripes mirrors; 01 mirrors stripes      |
| Forgetting parity rotation        | Early RAID 4 designs used fixed parity disk | Verify parity location cycles through all members    |
| Underestimating small-write penalty | 4 KiB write expands to 4 physical I/Os      | Measure IOPS with realistic 4 KiB random-write mix   |
| Treating SSD wear as uniform      | RAID 5/6 parity disks receive extra writes  | Enable wear levelling across the entire array        |

## 7. The textbook-precise statement
A RAID array of level \(\ell\) over \(N\) disks is defined by a mapping \(M: \mathbb{N} \to (\mathbb{Z}_N \times \mathbb{N})^r\) that places each logical block onto \(r\) physical (disk, offset) pairs together with an encoding function whose minimum distance satisfies the fault-tolerance claim of \(\ell\). For RAID 5 the encoding is a systematic \((N, N-1)\) parity code; for RAID 6 it is a systematic \((N, N-2)\) MDS code over GF(\(2^8\)). (Silberschatz, Galvin, Gagne, *Operating System Concepts*, 10e, §11.7.)

## 8. Visual — diagram or schematic
```text
RAID 5 stripe layout (N=4)
Disk0   Disk1   Disk2   Disk3
D0      D1      D2      P0
D3      D4      P1      D5
D6      P2      D7      D8
P3      D9      D10     D11
...
P rotates left each stripe; any single disk failure leaves a complete stripe.
```

## 9. The memory technique
**The hook** — Picture five disks standing in a row; RAID 0 is a relay race passing the baton, RAID 1 is identical twins, RAID 5 is four friends plus one accountant who keeps the checksum, RAID 6 adds a second accountant, and RAID 10 is two pairs of twins racing in stripes.

**What to overlearn** — RAID 0: capacity = \(N \times D\), fault tolerance = 0; RAID 1: capacity = \(D/2\), tolerance = 1; RAID 5: capacity = \((N-1)D\), tolerance = 1; RAID 6: capacity = \((N-2)D\), tolerance = 2; RAID 10: capacity = \(D/2\), tolerance = 1 per mirror.

**Spaced-repetition schedule** — Review definitions at 1 day, 3 days, 7 days, 16 days, 35 days after first study.

**First-principles fallback** — Re-derive usable capacity by counting how many disks store user data versus check data in one stripe; re-derive fault tolerance by counting the minimum number of independent equations needed to solve for lost blocks.

## 10. What this unlocks
RAID trade-offs directly determine the design of distributed storage systems, erasure-coded object stores, and modern file-system logging layers.  

- Next: erasure coding in Ceph and MinIO  
- Next: log-structured merge-tree write amplification under different RAID levels  
- Next: NVMe Zoned Namespaces that expose RAID-like geometry to the host  
- Next: reliability models in Google’s Chubby and Spanner papers  

## 11. Self-check — five questions, no answers
1. A four-disk RAID 5 array loses one disk; how many additional disk failures can it survive before data loss becomes possible?  
2. Compute the minimum number of physical I/Os required for an 8 KiB random write on a four-disk RAID 6 array using 4 KiB blocks.  
3. Why does RAID 10 exhibit lower tail latency than RAID 5 under sustained random-write load?  
4. An administrator replaces a failed disk in a RAID 5 array while a second disk begins to fail; which sequence of events guarantees data loss?  
5. Derive the steady-state fraction of usable capacity for a RAID 6 array whose stripe width grows to 20 disks; does the fraction approach 1?