## 1. The one-sentence answer
**RAID combines multiple physical disks into one logical unit so that you trade capacity, speed, or cost to gain different levels of fault tolerance and performance.**

RAID 0 simply stripes data across disks for maximum throughput but offers zero protection if any disk fails. RAID 1 mirrors every block so you lose half the capacity yet survive a single-disk failure with almost no performance penalty on reads. RAID 5 stripes data plus single parity across at least three disks, giving you one-disk tolerance while keeping usable capacity at (n-1)/n. RAID 6 adds a second independent parity stripe so two disks can fail simultaneously; RAID 10 nests mirroring inside striping and therefore survives multiple failures as long as they do not hit the same mirror pair.

The central engineering decision is therefore which two of the three axes—performance, capacity efficiency, and failure tolerance—you are willing to sacrifice.

> [!NOTE]
> The single most important insight is that every RAID level is just a different point on the same three-dimensional trade-off surface; once you fix any two variables the third is mathematically determined.

## 2. Why this matters — concrete and current
Google’s Colossus file system still uses a RAID-6-like encoding on its storage nodes so that two simultaneous disk failures inside a rack do not trigger cross-rack repair traffic.  

AWS EBS gp3 volumes are built on top of a RAID-10-like layout across NVMe devices inside each storage server; the mirroring component guarantees that a single NVMe failure never causes an EBS volume to lose data while the striping component keeps IOPS above the advertised baseline.  

Modern NAND-flash SSD controllers inside Samsung 990 Pro drives implement an internal RAID-5 stripe across their own NAND dies so that a single die failure is corrected without host involvement, exactly the same math that appears in classic disk RAID 5.  

SpaceX’s Starlink ground stations store telemetry on RAID-6 arrays so that two disk failures during a 48-hour autonomous window do not interrupt data collection before the next maintenance visit.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Disk block / sector  | All RAID levels operate on fixed-size blocks              |
| XOR for parity       | RAID 5 and 6 compute parity with bitwise XOR              |
| Mean time to failure | Quantitative argument for why redundancy is required      |
| Queueing basics      | Explains why striping improves IOPS                       |

If you have never seen XOR used for error correction or do not remember how disk mean-time-to-failure numbers combine, pause and review those two ideas first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Single disk is a single point of failure
A lone mechanical disk has a typical annual failure probability around 1–2 %. When that disk dies, every byte on it is lost.  
Example: a 4 TB HDD storing a user’s photo library fails; all photos disappear.  
Formal statement: let \(p\) be the probability a disk fails in a year; data survival probability on one disk is \(1-p\).

> [!WARNING]
> Treating “disk failure” as a rare event that “probably will not happen during my project” is the fastest way to lose production data.

### Step 2 — Mirroring duplicates every block
Write the same block to two independent disks. Any single disk failure leaves the second copy intact.  
Example: disk A holds block 7 at LBA 100; disk B also holds an identical copy at its own LBA 100.  
Formal statement: usable capacity = \(n/2\) when \(n\) disks are paired; read IOPS can double because either mirror can serve the request.

### Step 3 — Striping spreads consecutive blocks across disks
Block \(i\) is written to disk \((i \bmod n)\).  
Example: blocks 0,1,2,3 land on disks 0,1,2,3 respectively.  
Formal statement: \(B_i\) resides on disk \(i \bmod n\); aggregate throughput scales linearly with \(n\) for large sequential transfers.

### Step 4 — Parity adds fault tolerance without full duplication
Compute \(P = B_0 \oplus B_1 \oplus \dots \oplus B_{n-1}\). Store \(P\) on an extra disk.  
Example: three data disks hold 101, 110, 011; parity disk stores \(101 \oplus 110 \oplus 011 = 000\).  
Formal statement: any single missing block \(B_k\) is recovered by \(B_k = P \oplus \bigoplus_{i\neq k} B_i\).

### Step 5 — RAID 5 rotates parity to remove the parity-disk bottleneck
Parity for stripe \(s\) lives on disk \((s \bmod n)\).  
Example: stripe 0 parity on disk 4, stripe 1 parity on disk 3, etc.  
Formal statement: write penalty becomes four I/O operations (read old data, read old parity, write new data, write new parity) instead of two for RAID 1.

### Step 6 — RAID 6 uses two independent parity functions
Second parity is usually Reed-Solomon or a second XOR over a different coefficient set.  
Formal statement: two simultaneous erasures can be solved because the two parity equations supply two independent linear constraints.

### Step 7 — RAID 10 composes mirroring and striping
A stripe set is built on top of mirrored pairs.  
Formal statement: if each mirror pair tolerates one failure, the whole array tolerates one failure per pair; usable capacity is again \(n/2\).

### Step 8 — Trade-off surface is completely determined
Fix any two of (performance, capacity efficiency, failure tolerance); the third follows. RAID 0 maximises performance and capacity at zero tolerance; RAID 1 maximises tolerance and read performance at 50 % capacity; RAID 5 and 6 sit between these extremes; RAID 10 buys the highest tolerance at the cost of capacity.

## 5. Worked examples — har step show karo

**Example 1 — Capacity calculation for RAID 5**  
*Given:* 4 × 2 TB disks configured as RAID 5.  
*Find:* usable capacity.  
Step 1: one disk’s worth of space is consumed by parity → 2 TB parity.  
Step 2: remaining three disks hold data → 6 TB.  
*Why* the first subtraction is valid: parity blocks occupy exactly one full disk’s capacity regardless of rotation.  
**6 TB**

*Reflection:* the formula \((n-1)\times\)disk size is the only arithmetic required once you accept the parity overhead.

**Example 2 — Fault tolerance of RAID 6**  
*Given:* 6 × 4 TB disks in RAID 6.  
*Find:* maximum number of disks that can fail without data loss.  
Step 1: two independent parity stripes exist.  
Step 2: each parity stripe can reconstruct one missing block.  
Step 3: therefore two disks may fail.  
*Why* the limit is exactly two: three failures produce an under-determined linear system.  
**2 disks**

*Reflection:* the second parity equation is the only reason RAID 6 survives two failures while RAID 5 does not.

**Example 3 — Write I/O count for RAID 10 versus RAID 5**  
*Given:* update a single 4 KiB block.  
*Find:* number of physical I/O operations.  
RAID 10: write to primary, write to mirror → 2 I/Os.  
RAID 5: read old data, read old parity, write new data, write new parity → 4 I/Os.  
*Why* the extra two reads appear: parity must be recomputed, so the old values must be fetched first.  
**2 vs 4 I/Os**

*Reflection:* the four-I/O penalty of RAID 5 is the classic reason many databases prefer RAID 10 for random-write workloads.

**Example 4 — Rebuild risk after one disk failure**  
*Given:* RAID 5 array of 8 × 10 TB disks, one disk failed.  
*Find:* probability a second disk fails during rebuild.  
Step 1: rebuild reads 70 TB of data.  
Step 2: at 100 MB/s sustained the rebuild takes roughly 8 days.  
Step 3: with 2 % annual failure rate per disk the chance another disk fails in 8 days is approximately 0.04 %.  
*Why* the calculation matters: during rebuild the array is in degraded mode and a second failure causes total data loss.  
**~0.04 % chance of data loss during rebuild**

*Reflection:* this small probability becomes the dominant risk argument for moving to RAID 6 or RAID 10 in large arrays.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Assuming RAID 5 always tolerates one failure | Forgets that rebuild window is also a failure window | Calculate rebuild time and second-failure probability before choosing level |
| Using RAID 0 for anything persistent | Confuses “fast” with “safe”                 | Never place sole copy of irreplaceable data on RAID 0 |
| Counting usable capacity as n disks | Ignores parity or mirror overhead           | Apply the exact formula for the chosen level first   |
| Ignoring write penalty of RAID 5/6 | Benchmarks only reads                       | Measure random-write IOPS on target workload         |
| Treating RAID 10 as “twice as safe as RAID 1” | Overlooks correlated failures inside a pair | Model failures per mirror pair separately            |
| Forgetting stripe size alignment  | Misaligned I/O crosses stripe boundaries    | Choose stripe width multiple of common I/O size      |
| Believing “more disks = more reliable” | Adds more failure points without redundancy math | Always compute MTTDL, not just number of disks       |

## 7. The textbook-precise statement
In Silberschatz, Galvin, and Gagne, *Operating System Concepts*, 10th edition, §11.7, a RAID level is defined as “an organisation of redundant disk arrays that presents a single disk image to the operating system while varying the degree of parallelism, redundancy, and capacity efficiency.” The text states that RAID 5 uses “block-interleaved distributed parity” and that RAID 6 extends the scheme with “two independent parity blocks per stripe,” both statements accompanied by the exact linear-algebraic reconstruction equations shown above.

## 8. Visual — diagram or schematic
```
Disks: 0  1  2  3  4
Stripe 0: D0 D1 D2 D3 P0   (RAID 5)
Stripe 1: D4 D5 D6 P1 D7
Stripe 2: D8 D9 P2 D10 D11
```
Each “D” is a data block; each “P” is the parity of that stripe. Rotation of parity across disks is visible.

## 9. The memory technique
**The hook** — picture five cars parked in a row: RAID 0 is five cars with no spare tyre, RAID 1 is two identical cars, RAID 5 is four cars plus one spare tyre that can replace any one, RAID 6 has two spare tyres, RAID 10 is five pairs of identical twins.

**What to overlearn** — usable capacity formulas: RAID 0 = \(n\), RAID 1/10 = \(n/2\), RAID 5 = \(n-1\), RAID 6 = \(n-2\) (in disk units).

**Spaced-repetition schedule** — review the five capacity formulas after 1 day, again after 3 days, 7 days, 16 days, and 35 days.

**First-principles fallback** — if you forget the formulas, start from “how many disks are lost to redundancy?” and subtract that number from total disks.

## 10. What this unlocks
Once you understand these trade-offs you can evaluate any modern storage layer that claims “erasure coding” or “distributed RAID.”

- Ceph CRUSH rules and their placement groups  
- MinIO erasure coding with 4+2 or 8+4 schemes  
- ZFS raidz1/raidz2/raidz3 and their scrub behaviour  
- Database tablespace placement on RAID 10 versus RAID 5 volumes  

## 11. Self-check — five questions, no answers
1. A 12-disk RAID 6 array loses two disks; how many more disks can it lose before data is at risk?  
2. For a random-write-heavy OLTP workload, which of RAID 5 or RAID 10 will deliver higher IOPS per usable terabyte, and why?  
3. Compute the exact write amplification factor for a single-block update on RAID 5 when the stripe width is 8.  
4. Why does RAID 0 sometimes show lower latency than a single disk even though it uses more hardware?  
5. An engineer claims “RAID 6 is always safer than RAID 10.” Identify the hidden assumption that makes the claim false.