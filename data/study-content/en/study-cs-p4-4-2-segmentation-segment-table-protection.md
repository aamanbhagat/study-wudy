## 1. The one-sentence answer
**Segmentation divides a process’s address space into variable-sized logical units called segments, each described by an entry in a segment table that supplies base address, limit, and protection attributes for translation and access control.**

A segment represents a semantically meaningful region such as code, data, or stack. The operating system maintains one segment table per process; each table entry records the segment’s starting physical address, its length, and a set of protection bits. When a program issues a logical address consisting of a segment selector and an offset, hardware indexes the segment table, verifies that the offset lies inside the limit, checks the protection bits against the current privilege level, and finally adds the base to produce the physical address.

If any check fails, the hardware raises a protection or segmentation fault. This mechanism therefore simultaneously solves relocation and enforces fine-grained access rights without requiring fixed-size pages.

> [!NOTE]
> The segment table is the single source of truth for both address mapping and protection; any change to a segment’s rights or location is performed by updating exactly one table entry.

## 2. Why this matters — concrete and current
Intel’s x86-64 architecture still retains the segment registers (CS, DS, SS, ES, FS, GS) for legacy compatibility and for thread-local storage; every user-mode memory reference is implicitly qualified by a segment selector whose descriptor supplies the base and limit used by the processor’s segmentation unit.

In safety-critical avionics certified to DO-178C, the VxWorks 653 partitioning kernel uses segmentation to isolate time and space partitions; each partition’s code and data segments are described by dedicated segment descriptors whose protection bits prevent one partition from writing into another even if a software fault occurs.

Modern confidential-computing platforms such as Intel SGX rely on an extended form of segmentation (enclave page cache mappings) to enforce that only code executing inside an enclave may access its private segments; the segment-table-like structures are consulted on every memory reference to guarantee confidentiality against a compromised hypervisor.

Semiconductor design tools from Synopsys and Cadence model memory-protection units (MPUs) found in ARM Cortex-R processors; these MPUs are essentially simplified segment tables with a small number of variable-length regions used to protect boot ROM, peripheral registers, and safety-critical data in automotive ECUs.

## 3. Mental prerequisites
| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Logical vs. physical address | Segmentation performs the mapping from logical (segment, offset) pairs to physical addresses. |
| Base-and-limit registers | Each segment table entry is a generalization of a single base-limit pair to many segments. |
| Privilege rings          | Protection bits in the segment descriptor are interpreted relative to the current privilege level (CPL). |

## 4. Building the idea — from intuition to formalism

### Step 1 — Logical address space is not contiguous
A programmer thinks of code, static data, and the stack as separate regions that may grow or shrink independently. The hardware therefore cannot assume a single contiguous block of memory for an entire process.

Example: a 16-bit address space might allocate addresses 0x0000–0x0FFF for code, 0x1000–0x17FF for data, and 0xFF00–0xFFFF for the stack. These three intervals are not adjacent.

Formal statement: a logical address is the pair (s, d) where s identifies a segment and d is an offset within that segment.

> [!WARNING]
> Treating the entire address space as one flat segment hides the independent growth of stack and heap and prevents per-segment protection.

### Step 2 — Each segment is described by a table entry
The operating system allocates a segment table in memory. Every entry contains at minimum a base physical address, a limit (length), and a protection field.

Example: segment 2 might occupy physical addresses 0x4000–0x47FF; its table entry stores base = 0x4000, limit = 0x0800, protection = read/write.

Formal statement: segment table entry STE[s] = (base[s], limit[s], prot[s]).

### Step 3 — Translation uses table lookup plus offset
Hardware extracts the segment selector s from the logical address, reads STE[s], checks d < limit[s], then computes physical address = base[s] + d.

Display math:
$$
\text{PA} = \text{base}[s] + d \quad \text{provided } 0 \le d < \text{limit}[s]
$$

> [!WARNING]
> Adding the offset before checking the limit produces an out-of-bounds physical address that may silently corrupt another process.

### Step 4 — Protection bits are consulted on every reference
Each STE contains bits indicating allowed operations (read, write, execute) and the minimum privilege level permitted.

Example: a code segment may have prot = execute-only at ring 3; any write attempt raises a protection fault.

Formal statement: access is granted only when the requested operation is a subset of prot[s] and CPL ≤ DPL[s].

### Step 5 — Segment table resides in protected memory
The segment table itself is reachable only through a dedicated register (LDTR or GDTR) that the operating system loads while in kernel mode; user processes cannot modify their own tables.

### Step 6 — Faults are precise and restartable
When a limit or protection violation occurs, the processor pushes the faulting logical address and the current privilege level onto the stack, allowing the OS to diagnose and possibly extend the segment or terminate the process.

## 5. Worked examples — every step shown

**Example 1 — Single-segment translation**
- *Given:* STE[1] = (base=0x2000, limit=0x0100, prot=RW), logical address (1, 0x0040).
- *Find:* physical address and access decision.
- Read STE[1] → base = 0x2000.  
  *Why:* selector 1 indexes the table directly.  
- Check 0x0040 < 0x0100 → true.  
  *Why:* offset must lie inside the segment.  
- Compute PA = 0x2000 + 0x0040 = 0x2040.  
  *Why:* relocation is simple addition after validation.  
**0x2040**  
*Reflection:* The example isolates the three atomic checks that every later example will repeat.

**Example 2 — Protection violation**
- *Given:* same STE[1], logical address (1, 0x0040), request = write, prot = R only.
- *Find:* outcome.
- Offset check passes.  
  *Why:* 0x0040 < limit.  
- Protection check fails (write ∉ prot).  
  *Why:* hardware must examine prot bits before issuing the bus cycle.  
**Protection fault raised**  
*Reflection:* Translation and protection are orthogonal; both must succeed.

**Example 3 — Segment extension**
- *Given:* current limit = 0x0100, program requests 0x0200 bytes.
- *Find:* new table entry.
- OS allocates new physical region of size 0x0200.  
  *Why:* variable segment size requires fresh contiguous physical memory.  
- Update STE[1] ← (newbase, 0x0200, RW).  
  *Why:* single atomic write to the table entry relocates the entire segment.  
**STE[1] updated**  
*Reflection:* Growing a segment never requires copying user data if the OS can find a sufficiently large free physical region.

**Example 4 — Cross-segment call**
- *Given:* code segment 0 (execute-only) calls procedure at offset 0x0030 inside segment 2 (execute/read).
- *Find:* required hardware actions.
- Push return address using current SS segment.  
  *Why:* stack pointer is interpreted relative to SS.  
- Load new CS selector = 2, offset = 0x0030.  
  *Why:* far call changes both segment and offset.  
- Hardware verifies execute permission on segment 2.  
  *Why:* protection check occurs on the target descriptor.  
**Call succeeds if DPL permits**  
*Reflection:* Segment changes are the architectural mechanism behind controlled privilege transfers.

## 6. Common traps and how to avoid them
| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting to check limit before adding offset | Programmer assumes offset is always valid           | Always perform the comparison d < limit first        |
| Confusing segment selector with segment number | Selector contains RPL bits and TI flag              | Mask out the low two bits before indexing the table  |
| Storing segment table in user-writable memory | OS omits write-protect bit on the page holding the table | Map the segment table with kernel-only protection    |
| Assuming segments are page-aligned | Variable sizing breaks page assumptions             | Keep segment base and limit independent of page size |
| Ignoring that stack grows downward | Limit check uses unsigned comparison                | Use the processor’s signed or direction flag logic   |
| Reusing a stale segment descriptor after deletion | Descriptor cache not flushed                        | Issue an explicit segment reload or TLB flush        |
| Overlapping segments without intent | Base + limit arithmetic creates unintended aliasing | Validate non-overlap at segment creation time        |

## 7. The textbook-precise statement
A logical address (s, d) is translated by the segment table ST of the current process. Let ST[s] = (base, limit, prot, DPL). Translation succeeds if and only if  
$$
0 \le d < \text{limit} \quad \text{and} \quad \text{requested access} \subseteq \text{prot} \quad \text{and} \quad \text{CPL} \le \text{DPL}.
$$
The resulting physical address is base + d. (Silberschatz, Galvin, Gagne, *Operating System Concepts*, 10e, §9.4.)

## 8. Visual — diagram or schematic
```text
Logical address
  15   14..2   1 0
+------------------+
|  s   |   d       |
+------------------+
         |
         v
Segment table (in memory)
+------+--------+-------+------+
| Seg  | Base   | Limit | Prot |
+------+--------+-------+------+
|  0   | 0x0000 | 0x1000| RX   |
|  1   | 0x2000 | 0x0800| RW   |
|  2   | 0x4000 | 0x0200| R    |
+------+--------+-------+------+
         |
         +--[index s]--> base + d  --> Physical address
```

## 9. The memory technique
**The hook** — Picture the segment table as a hotel front desk: each room (segment) has a starting corridor number (base), a length of corridor (limit), and a key-card type (protection). You may walk only as far as your key allows.

**What to overlearn**  
- Logical address = (segment selector, offset)  
- Physical address = base[s] + d only after d < limit[s] and protection check  
- Segment table is indexed by selector, not by virtual page number

**Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — Re-derive translation by starting from the definition of a logical address as a pair, writing the three validation predicates, then performing the addition.

## 10. What this unlocks
Segmentation supplies the protection substrate on which paging, demand paging, and modern virtual-memory systems are built; once segments can be relocated and guarded individually, the operating system can safely introduce page tables inside each segment, enable sharing of read-only segments, and implement copy-on-write for fork().

- Next: paging and page-table walks  
- Next: TLB and address-space identifiers  
- Next: memory-mapped files and segment-backed mappings

## 11. Self-check — five questions, no answers
1. A process issues logical address (3, 0x0FFF) and the segment-3 limit is 0x1000. Does the access succeed before the protection check is even performed?

2. Why must the segment table itself be inaccessible to user-mode stores?

3. Two segments have bases 0x1000/limit 0x0800 and 0x1400/limit 0x0800. Do they overlap? What hardware consequence follows if they do?

4. A ring-3 instruction attempts to read a segment whose DPL = 0. Which bit of the descriptor causes the fault?

5. After a segment is grown by the OS, which single hardware-visible change guarantees that all future references see the new size?