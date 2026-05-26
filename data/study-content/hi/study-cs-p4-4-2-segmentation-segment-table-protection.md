## 1. The one-sentence answer
**Segmentation** uses a segment table to translate logical addresses into physical addresses while enforcing per-segment protection rules.

Segmentation divides a process’s address space into variable-length logical units such as code, data, and stack. Each segment carries its own base, limit, and protection bits. The segment table stores these values so the hardware can perform a bounds check and access-rights check on every memory reference. When a reference falls outside the limit or violates the protection bits, the hardware raises a fault before any physical memory is touched.

> [!NOTE]
> The “aha” moment is that protection is not an add-on; it is performed in the same hardware step that converts the logical address, making illegal accesses impossible to hide.

## 2. Why this matters — concrete and current
Intel’s 64-bit x86 processors still retain the segmentation hardware (even though paging dominates) and use it inside the Global Descriptor Table to isolate kernel code from user code and to mark certain segments as execute-only for control-flow integrity.

In the seL4 microkernel, each user-level thread is given its own set of segments whose protection bits are set at capability creation time; any attempt by a thread to write into a read-only segment immediately triggers a capability fault that the kernel can audit.

Modern Java and .NET runtimes rely on segmentation-like bounds checking inside the interpreter or JIT to guarantee that bytecode cannot escape its object’s memory region, a technique directly derived from hardware segment-limit checks.

NVIDIA’s CUDA driver uses segmentation to map GPU kernels into host address space with execute-only rights, preventing accidental or malicious modification of kernel code while it is resident on the device.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Logical vs physical address | Segmentation performs the translation step                |
| Base-limit register pair    | Each segment table entry is exactly a base-limit pair     |
| Protection bits (R/W/X)     | The hardware checks these bits on every reference         |
| Trap/fault mechanism        | Illegal segment access must raise a synchronous exception |

If any row above is unfamiliar, pause and review the corresponding concept before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Logical division of address space
A process does not see one flat array of bytes; instead the compiler and linker already group bytes into meaningful regions.  
Example: a tiny C program places its instructions in one region, global variables in another, and the call stack in a third.  
Formal statement: address space = {S₀, S₁, …, Sₙ} where each Sᵢ = [baseᵢ … baseᵢ + limitᵢ).  
> [!WARNING] Treating the entire address space as a single segment collapses the protection granularity to “all or nothing.”

### Step 2 — Segment table as the mapping structure
Every running process is given a segment table whose entries are indexed by a segment selector (part of the logical address).  
Example: selector 0x2 points to entry 2 that contains base = 0x4000, limit = 0x0FFF, rights = RW.  
Formal statement: ST[selector] = (base, limit, rights).  
> [!WARNING] Forgetting to reload the segment-table register on context switch maps the new process to the old process’s physical memory.

### Step 3 — Address translation with bounds check
Logical address (s, d) is legal only when d < limit of ST[s]. Physical address = base + d.  
Example: (s=1, d=0x0200) with ST[1] = (0x8000, 0x03FF) yields physical address 0x8200.  
Formal statement: if d ≥ limit then raise Segment-Fault else PA = base + d.  
> [!WARNING] Using “>” instead of “≥” allows one byte of overflow.

### Step 4 — Protection check in the same cycle
Rights bits are examined immediately after the bounds check.  
Example: an instruction fetch (opcode read) on a data segment whose X bit is clear raises a protection fault.  
Formal statement: accessType ∈ rights ⟹ allow else fault.  
> [!WARNING] Checking protection after the memory access has already occurred creates a window for information leakage.

### Step 5 — Hardware register that points to the table
The CPU contains a dedicated register (LDTR or GDTR on x86) holding the physical address and size of the active segment table.  
Example: on process switch the kernel executes LGDT newTableDescriptor.  
Formal statement: SegTablePtr = (tableBase, tableLimit).  
> [!WARNING] Allowing user code to write this register removes all isolation.

## 5. Worked examples — har step show karo

**Example 1 — Simple valid access**  
*Given:* ST[0] = (0x1000, 0x01FF, RX), logical address (0, 0x00A0).  
*Find:* physical address and whether access is allowed.  
Step 1: selector = 0 → entry found.  
Step 2: offset 0x00A0 < 0x01FF → bounds OK.  
Step 3: rights contain X → fetch allowed.  
Step 4: PA = 0x1000 + 0x00A0 = **0x10A0**.  
*Reflection:* The example is easy because every check passes; the same steps catch violations when any single check fails.

**Example 2 — Bounds violation**  
*Given:* ST[2] = (0x2000, 0x00FF, RW), logical address (2, 0x0100).  
Step 1: selector valid.  
Step 2: 0x0100 ≮ 0x00FF → **segment fault raised**.  
*Reflection:* The fault occurs before any physical address is computed, guaranteeing no out-of-segment byte is touched.

**Example 3 — Protection violation on write**  
*Given:* ST[1] = (0x3000, 0x0FFF, RX), logical address (1, 0x0040) with write intent.  
Step 1–2 pass, but rights lack W → **protection fault**.  
*Reflection:* Bounds and rights are independent; a legal offset can still be illegal for a given operation.

**Example 4 — Context-switch reload**  
*Given:* Process A uses table at 0x9000, Process B uses table at 0xA000.  
After switch: LGDT loads new table pointer. Next reference uses ST_B.  
*Reflection:* Without the reload, Process B would inherit Process A’s mapping and protection, breaking isolation.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using page-table arithmetic on segment table | Confusing fixed-size pages with variable segments | Always draw the variable-length box first    |
| Forgetting the selector field     | Treating logical address as a single integer | Explicitly split address into (s, d)         |
| Checking protection after translation | Performance micro-optimization that leaks data | Perform rights check in the same pipeline stage |
| Not masking the selector bits     | Reading extra high bits as selector         | Mask with the hardware-defined selector width |
| Assuming limit is inclusive       | Off-by-one when limit = 0xFF allows byte 0xFF | Treat limit as exclusive upper bound         |
| Reusing stale segment descriptors | Descriptor cache not flushed on update      | Use segment-table flush instruction or reload |

## 7. The textbook-precise statement
From Silberschatz, Galvin, Gagne, *Operating System Concepts*, 10e, §8.4:  
“A segment table is an array of segment descriptors, each containing a base address, a limit, and a set of protection and status bits. A logical address consists of a segment selector s and an offset d. The hardware indexes the segment table with s; if d ≥ limit or the requested operation is not permitted by the protection bits, a trap is generated; otherwise the physical address is base + d.”

## 8. Visual — diagram or schematic
```
Logical Address
+---------+------------+
|   s     |     d      |
+---------+------------+
      |           |
      v           v
Segment Table            Physical Memory
+-----+-------+-----+    +-----------------+
|base | limit | R W X| -> | segment bytes   |
+-----+-------+-----+    +-----------------+
      |           ^
      +-----------+  (if d < limit and rights OK)
```

## 9. The memory technique

**The hook**  
Picture each segment as a locked glass room; the segment table is the guard’s clipboard that records the room’s starting tile, length, and which keys (R/W/X) open its door.

**What to overlearn**  
- Logical address = (selector, offset)  
- Fault if offset ≥ limit or operation ∉ rights  
- Segment table register must be reloaded on every context switch

**Spaced-repetition schedule**  
Review the three facts above after 1 day, 3 days, 7 days, 16 days, and 35 days.

**First-principles fallback**  
If you forget the exact bits, re-derive from the requirement: “the hardware must know where the segment lives, how big it is, and who may touch it,” which directly yields base, limit, and protection bits.

## 10. What this unlocks
Segmentation with protection is the foundation for capability-based addressing, process isolation in microkernels, and language-level memory safety. It also prepares you for the next topics:

- Combining segmentation with paging (segmented-paging)
- Intel x86 descriptor tables (GDT/LDT)
- Capability architectures such as CHERI

## 11. Self-check — five questions, no answers
1. A logical address (3, 0x200) is presented; ST[3] shows limit 0x1FF. Which exception is raised first—bounds or protection—and why?  
2. Why must the segment-table register itself be inaccessible to user-mode code?  
3. Draw the segment table entry layout for a 16-bit selector machine with 24-bit base and 16-bit limit.  
4. A kernel wishes to create a read-only code segment shared among ten processes. Which protection bits are set and how many table entries are required?  
5. Suppose the bounds check were performed after the protection check; construct a concrete attack scenario that succeeds.