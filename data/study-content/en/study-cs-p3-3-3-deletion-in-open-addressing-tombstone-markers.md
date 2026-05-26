## 1. The one-sentence answer
**Tombstone markers solve deletion in open-addressing hash tables by replacing a removed key with a special “deleted” sentinel that keeps probe sequences intact while still allowing later insertions to reuse the slot.**

Open addressing places every key in a single array by following a deterministic probe sequence from its hash index. When a key must be removed, simply clearing its slot breaks the chain: any later search that would have continued past that slot now stops prematurely and reports the key absent even though it still exists farther along the sequence. The tombstone replaces erasure with a distinguishable sentinel value that search treats as “occupied, continue probing” while insertion treats it as “available for reuse.”

The sentinel therefore decouples the two operations that would otherwise conflict. Search never terminates early, yet the table does not permanently waste space after deletions.

> [!NOTE]
> The single crucial insight is that a tombstone is *not* an empty slot for search, yet *is* an empty slot for insertion; this asymmetry preserves correctness without extra bookkeeping.

## 2. Why this matters — concrete and current
Linear-probing hash tables with tombstones appear inside the Linux kernel’s dentry cache, where file-system path lookups must survive frequent creation and removal of negative dentries without corrupting subsequent lookups.

Google’s LevelDB and its descendant RocksDB both employ open-addressing structures for their in-memory memtables; tombstone deletion lets them retire overwritten keys while still guaranteeing that later Get operations find the correct (possibly newer) value in the probe chain.

Modern JavaScript engines such as V8 use open-addressing hash tables for object property maps; tombstone markers allow rapid property deletion during garbage-collection cycles without forcing full table rebuilds that would stall the main thread.

Semiconductor design tools from Synopsys and Cadence rely on large open-addressed symbol tables for netlist connectivity; deletion of temporary nodes during optimization passes must not invalidate reachability queries that follow probe sequences.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Linear probing (or any fixed probe sequence) | Tombstones exist only because probe sequences must continue past a deleted slot. |
| Distinction between search and insert termination conditions | The sentinel’s asymmetric semantics rely on search continuing while insert may stop. |
| Load factor and clustering | Tombstones increase effective load and can worsen clustering if not managed. |

## 4. Building the idea — from intuition to formalism

### Step 1 — The probe-sequence invariant
A key \(k\) belongs to the table if and only if it lies somewhere along the probe sequence that begins at \(h(k)\).  
Example: table size 7, linear probing, keys 10, 17, 24 all hash to index 3; they occupy slots 3, 4, 5.  
Formally, the set of occupied positions for any key is the ordered sequence  
\[p_0 = h(k),\quad p_i = (p_{i-1} + 1) \bmod m.\]  
> [!WARNING]  
> Treating a cleared slot as the end of every probe sequence violates the invariant and produces false negatives.

### Step 2 — Why ordinary deletion breaks the invariant
Clearing slot \(p_j\) shortens every probe sequence that previously continued past \(p_j\).  
Example: after deleting 17 from slot 4, a search for 24 stops at the now-empty slot 4 and reports absence.  
No mathematical adjustment restores the invariant without additional state.

### Step 3 — Introduction of the sentinel
Replace the cleared cell with a distinct value \(\text{DEL}\) that is neither empty nor any legal key.  
Search now continues when it encounters \(\text{DEL}\); insertion may treat \(\text{DEL}\) as a reusable vacancy.  
The probe sequence itself is unchanged; only the interpretation of its members differs by operation.

### Step 4 — Search and insertion rules with \(\text{DEL}\)
Search: stop only at an empty slot or the sought key; treat \(\text{DEL}\) as occupied.  
Insertion: stop at the first empty or \(\text{DEL}\) slot; place the new key there.  
These two rules together re-establish the probe-sequence invariant after deletion.

### Step 5 — Textbook statement
Cormen et al., *Introduction to Algorithms*, 4e, §11.4: “Deletion in open addressing is performed by marking the slot as deleted rather than empty, so that searches that would otherwise terminate early continue correctly.”

## 5. Worked examples — every step shown

**Example 1 — Single deletion, linear probing**  
*Given:* Table size 7, \(h(k)=k \bmod 7\), linear probing; initial content after inserts 10, 17, 24: [_,_,_,10,17,24,_].  
*Find:* Delete 17 and then search for 24.  
Step 1: locate 17 at index 4.  
*Why:* \(10 \bmod 7=3\), \(17 \bmod 7=3\), probe reaches 4.  
Step 2: write \(\text{DEL}\) into index 4.  
*Why:* Sentinel replaces erasure.  
Step 3: search for 24 begins at 3, sees 10, continues, sees \(\text{DEL}\), continues, finds 24.  
*Why:* Search rule ignores \(\text{DEL}\).  
**[\(\text{DEL}\),10,17,24 still reachable]**  

*Reflection:* The example isolates the false-negative failure that tombstones prevent.

**Example 2 — Reuse of tombstone on insertion**  
*Given:* Same table after Example 1.  
*Find:* Insert 31 (\(31 \bmod 7=3\)).  
Step 1: probe reaches index 4 containing \(\text{DEL}\).  
*Why:* Insertion accepts \(\text{DEL}\) as vacancy.  
Step 2: store 31 at index 4.  
*Why:* Slot is reclaimed without breaking later probes.  
**Final table:** [_,_,_,10,31,24,_]  

*Reflection:* Reclamation works only because search still traverses the original sequence.

**Example 3 — Multiple clustered tombstones**  
*Given:* Table after successive deletions of 10 and 31.  
*Find:* Search for 24.  
Step sequence: index 3=\(\text{DEL}\), 4=\(\text{DEL}\), 5=24.  
*Why:* Consecutive sentinels are traversed exactly as occupied cells would be.  
**Result:** 24 found after two continuations.  

*Reflection:* Demonstrates that clustering of tombstones only lengthens probes; correctness is preserved.

**Example 4 — Mixed operations under load factor 0.5**  
*Given:* Size-11 table, keys inserted in order 5,16,27,38 then delete 16, insert 49.  
*Find:* Final probe length for 38.  
Algebraic steps: each insertion follows \(p_i=(h(k)+i)\bmod 11\); tombstone at former location of 16 is reused by 49; 38 remains at its original offset. Search traverses one tombstone then reaches 38 in three probes.  
**Final probe length for 38 is 3.**  

*Reflection:* Shows interaction between load, clustering and tombstone reuse.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using the same sentinel for “empty” and “deleted” | Implementation reuses a single null value | Allocate a distinct sentinel or a separate boolean flag array |
| Forgetting to count tombstones toward load factor | Table appears under-loaded while probes lengthen | Increment a separate “live+deleted” counter for resize decisions |
| Searching with an insertion-style early exit | Mental conflation of the two rules | Implement two separate probe loops or pass an operation flag |
| Never cleaning tombstones | Table gradually fills with DEL entries | Periodic global rebuild when deleted count exceeds threshold |
| Deleting a key that never existed | Probe continues forever on all-DEL table | Always verify key presence before writing DEL |
| Resizing without propagating tombstones | New table loses necessary continuation markers | Re-insert only live keys; discard DEL entries during resize |
| Assuming quadratic probing behaves identically | Different probe sequences interact differently with DEL | Verify sentinel semantics for each chosen probe function |

## 7. The textbook-precise statement
In an open-addressing hash table of size \(m\) that uses probe sequence \(p(k,i)\) for \(i=0,1,\dots,m-1\), deletion of key \(k\) replaces the cell containing \(k\) with a special value \(\text{DEL}\notin U\cup\{\text{EMPTY}\}\). Subsequent SEARCH operations treat any cell holding \(\text{DEL}\) as occupied and continue probing; INSERT operations treat the same cell as vacant. The representation invariant is thereby restored: a key \(k\) is reported present exactly when it occurs in its probe sequence before the first EMPTY. (Cormen et al., *Introduction to Algorithms*, 4e, §11.4.)

## 8. Visual — diagram or schematic
```text
Index:  0   1   2   3   4   5   6
Value:  E  10 DEL  24  17  E   E
Probe for 24 (h=3): 3→24 ✓          (continues past DEL)
Probe for 17 (h=3): 3→24→4→17 ✓     (search rule)
Insert 31 (h=3):    3→24→4→DEL→write 31 here
Legend: E=EMPTY, DEL=tombstone, numbers=live keys
```

## 9. The memory technique
**The hook** — picture a graveyard where every headstone is labelled “DEL”; mourners (search) must walk past every stone, yet new residents (insert) may move into any vacant plot marked DEL.  
**What to overlearn** — (1) search never stops on DEL, (2) insert stops on DEL or EMPTY, (3) load factor includes tombstones for resize.  
**Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.  
**First-principles fallback** — re-derive the probe-sequence invariant, then observe that only an asymmetric sentinel satisfies both search continuation and insertion reuse.

## 10. What this unlocks
Tombstone deletion is the last missing primitive that makes open addressing practical for dynamic sets; it directly enables the next topics of lazy deletion versus eager cleanup, incremental rehashing, and Robin-Hood probing with deletion.

- Robin-Hood hashing with deletion
- Hopscotch hashing deletion rules
- Cuckoo hashing eviction on deletion
- Concurrent hash tables with marked deleted slots

## 11. Self-check — five questions, no answers
1. In a linear-probing table containing only tombstones and one target key, what is the worst-case number of probes for a successful search?  
2. After a sequence of \(n\) insertions followed by \(n\) deletions using tombstones, what fraction of slots can still be occupied by live keys?  
3. Suppose quadratic probing is used; does the tombstone rule for insertion remain identical to the linear-probing rule?  
4. A table never reclaims tombstones. After many deletions its load factor (live keys only) is 0.3 yet average probe length exceeds 30. Why?  
5. Design a one-sentence argument showing that a single shared sentinel for both EMPTY and DEL necessarily produces either false negatives or lost insertion opportunities.