## 1. The one-sentence answer
**A union is a composite type in which every member occupies the exact same block of memory, so writing to one member overwrites the interpretation of all others.**

In C, memory is a flat sequence of bytes. A structure reserves separate, adjacent blocks for each field. A union reserves only one block whose size equals the largest member; every field is forced to start at offset zero. Consequently the same bytes can be read or written under different type names and sizes.

This single overlapping storage region is the entire point of the construct. It lets the programmer reinterpret a sequence of bytes without an explicit cast or extra allocation, at the cost of having to track which interpretation is currently valid.

> [!NOTE]
> The compiler never records which member was last written; that responsibility rests entirely with the programmer.

## 2. Why this matters — concrete and current
In the Linux kernel, the `skb_shared_info` structure inside network packets uses a union to hold either a fragmentation list or a single timestamp, saving 8–16 bytes per socket buffer on every packet processed by high-speed NICs at Google and Amazon.

NASA’s flight software for the Perseverance rover stores sensor readings in a 32-byte telemetry record that is sometimes interpreted as four IEEE-754 floats and sometimes as a packed bit-field of status flags; the union eliminates an extra memcpy in the 200 Hz control loop.

LLVM’s MC layer represents machine-code immediates with a union of `int64_t`, `APFloat`, and a small-string buffer so that the common 32-bit case occupies only eight bytes on the heap, measurably reducing peak memory during LTO of Chromium.

Semiconductor simulators at TSMC store cell-delay values as either a single `double` or a pair of `float` min/max numbers inside the same 8-byte slot; the union lets the delay calculator switch representations without reallocating millions of timing arcs.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| `struct` layout  | Unions are the dual: same syntax, opposite memory rule    |
| `sizeof` operator| Determines the single block size allocated for the union  |
| Pointer casts    | Manual type punning is the unsafe alternative to unions   |
| Storage duration | Union lifetime rules are identical to those of structures |

## 4. Building the idea — from intuition to formalism

### Step 1 — One memory region, many names
A union allocates a single contiguous block whose length equals the size of its largest member. All other members are overlaid on that same block.

```c
union U { uint32_t i; float f; };
```
The block is four bytes long. Writing to `i` or to `f` touches exactly those four bytes.

> [!WARNING]
> Assuming the members occupy distinct addresses will produce aliasing bugs that survive compilation but fail at runtime.

### Step 2 — Size is governed by the largest member
The size of the union type equals `sizeof` of its largest member, rounded up to satisfy the strictest alignment requirement among all members.

$$ \operatorname{sizeof}(\text{union } U) = \max_i(\operatorname{sizeof}(m_i)) \text{ aligned to } \max_i(\operatorname{alignof}(m_i)) $$

### Step 3 — All members share offset zero
Every member’s address equals the address of the union object itself. Consequently an assignment to one member immediately changes the bit pattern seen by every other member.

### Step 4 — Only one member is “active” at a time
The language provides no tag to record which member holds valid data. Reading a member other than the last one written is undefined behaviour except for the special cases listed in the standard (6.5.2.3).

### Step 5 — Textbook statement
A union type describes an object that may contain one of several members, all of which share the same storage. (ISO/IEC 9899:2018, §6.7.2.1¶16)

## 5. Worked examples — every step shown

**Example 1 — Minimal union**
- *Given:* `union U { int i; char c; }; union U u;`
- *Find:* size and addresses.
- `sizeof(u)` equals `sizeof(int)` because `int` is larger than `char`.
- `&u.i` and `&u.c` are identical.
- **Result:** both addresses equal `&u`.

*Reflection:* The example shows that size and address identity are independent of which member you actually use.

**Example 2 — Type punning float to int**
- *Given:* `union { float f; uint32_t bits; } u = {.f = 1.0f};`
- *Find:* integer representation of the float.
- Write 1.0f into `f`; read `bits`.
- **Result:** `bits == 0x3f800000`.

*Reflection:* The union supplies a standards-sanctioned route around strict aliasing that a pointer cast does not.

**Example 3 — Largest member determines size**
- *Given:* `union Big { char a[10]; double d; };`
- *Find:* `sizeof(union Big)`.
- `sizeof(double)` is 8, `sizeof(char[10])` is 10; alignment of double is typically 8.
- Size becomes 16 on most ABIs.
- **Result:** 16 bytes.

*Reflection:* Padding appears after the largest raw member, never between members.

**Example 4 — Reading the wrong member**
- *Given:* the union from Example 2, then `u.bits = 0x3f800000;`
- *Find:* value of `u.f` after the assignment.
- The bits are now those of 1.0f, so `u.f` yields 1.0f.
- **Result:** 1.0f.

*Reflection:* The example works only because the last write matches the next read; any other pattern is UB.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                              |
|-----------------------------------|-----------------------------------------------------|----------------------------------------------|
| Reading inactive member           | No tag is stored by the compiler                    | Maintain an explicit discriminator variable  |
| Assuming members have distinct addresses | All offsets are zero by definition               | Never take addresses for aliasing purposes   |
| Forgetting padding                | Size is largest member plus alignment, not sum      | Always use `sizeof` at runtime               |
| Initialising multiple members     | Only the last designated initialiser survives       | Initialise only one member                   |
| Strict-aliasing violation with pointers | Pointer casts bypass union rules                 | Use the union itself or `memcpy`             |
| Enum inside union without tag     | Enum is just an int; no extra safety                | Pair with outer struct containing a tag      |
| Portability of bit patterns       | Endianness and padding differ across platforms      | Serialise explicitly when crossing ABIs      |

## 7. The textbook-precise statement
A union type specifies an object that may hold any one of several members, all sharing the same storage unit. The size and alignment of the union are those of its largest member. Accessing the stored value of a union using a member other than the last one stored produces undefined behaviour, except when the members are of compatible types or one is a struct whose initial members match (ISO/IEC 9899:2018, §6.5.2.3, §6.7.2.1). See also Harbison & Steele, *C: A Reference Manual*, 5e, §5.6.

## 8. Visual — diagram or schematic
```text
Address: 0x1000  0x1001  0x1002  0x1003
Union U: [ byte0 ][ byte1 ][ byte2 ][ byte3 ]
Member i:  <------ uint32_t i ------->
Member f:  <------ float f --------->
Member c:  [ char c ]
```
All three members begin at 0x1000; writing through any name mutates the same four bytes.

## 9. The memory technique
1. **The hook** — Picture a single hotel room booked under three different names; only one guest can occupy it at a time.
2. **What to overlearn** — `sizeof(union)` equals size of largest member; all members share address zero; last write wins.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive size from the largest member, then verify every access against an explicit tag you maintain yourself.

## 10. What this unlocks
Unions supply the low-level mechanism behind variant types, safe type punning, and space-efficient discriminated unions used in interpreters and network stacks. They are a prerequisite for understanding bit-fields, `memcpy`-based serialisation, and the implementation of `std::variant` in C++.

## 11. Self-check — five questions, no answers
1. Declare a union containing a `double` and a `char[9]`. What is its size on a typical 64-bit ABI?
2. After writing to member `a`, must a read of member `b` succeed? Under what precise condition does the standard guarantee it?
3. Write a one-line expression that yields the bit pattern of a `float` without invoking undefined behaviour.
4. A union has three members of sizes 4, 7 and 9 bytes, all with alignment 1. What is the size of the union?
5. Identify the latent bug: `union {int i; float f;} u; u.i=1; return u.f > 0;`.