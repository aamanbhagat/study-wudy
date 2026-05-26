## 1. The one-sentence answer
**Safe string functions in C replace the unbounded `strcpy` with variants that accept an explicit size bound, guaranteeing that writes never exceed a caller-provided destination capacity.**

The classic `strcpy` copies bytes from source to destination until it encounters a null terminator. Because the destination size is never communicated to the function, any source longer than the destination silently overwrites adjacent memory. Bounded replacements solve this by accepting a maximum count `n` and stopping after at most `n` bytes.

The three replacements differ in how they treat the final byte and what they return. `strncpy` copies at most `n` bytes and pads the remainder with nulls when the source is shorter than `n`, yet leaves the destination unterminated when the source is longer. `snprintf` formats output into a buffer of size `n` and always writes a terminating null within that size. `strlcpy` copies at most `n-1` bytes, always writes a null terminator, and returns the length of the source so the caller can detect truncation.

> [!NOTE]
> The decisive property is not merely “copy at most n bytes” but “guarantee a null terminator is written inside the supplied bound”; only `snprintf` and `strlcpy` make that guarantee for every input length.

## 2. Why this matters — concrete and current
In the Linux kernel’s networking stack, `strncpy` was historically used to copy interface names into `struct net_device`; a source name exceeding `IFNAMSIZ` left the structure without a terminator, enabling subsequent `strcmp` calls to read past the end of the allocated object and trigger kernel memory corruption (CVE-2018-12232).

NASA’s Core Flight System (cFS) flight software, used on multiple CubeSat missions, replaced all `strcpy` calls with `snprintf` after static analysis showed that command-string buffers could be overflowed by malformed ground packets; the change eliminated a class of single-event-upset-induced crashes observed during radiation testing.

OpenSSL’s X.509 name parsing routines adopted `strlcpy` on BSD-derived platforms to copy distinguished-name components; the function’s return value lets the library detect and reject names that would have been silently truncated, closing a potential impersonation vector reported in 2015.

The Android media framework’s stagefright library switched from `strcpy` to bounded equivalents after a crafted MP4 atom could overflow a fixed-size codec-name buffer, a defect that allowed remote code execution on millions of devices.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Null-terminated strings | Every safe function still relies on the sentinel `'\0'` to know where data ends. |
| Pointer and array decay | Destination arguments are passed as pointers; the size bound must be supplied separately. |
| Buffer layout        | Adjacent stack or heap objects can be overwritten if a write exceeds the declared size. |
| Return-value conventions | `strlcpy` and `snprintf` communicate truncation via their return values; callers must test them. |

## 4. Building the idea — from intuition to formalism

### Step 1 — The unbounded copy
A C string copy that receives only source and destination pointers has no information about the destination’s capacity.  
Example: `strcpy(dst, src)` where `dst` is declared as `char dst[8]` and `src` contains 20 bytes writes past the end of `dst`.  
Formal statement: for any `char *dst, *src`, the call performs `while ((*dst++ = *src++))` with no length test.  
> [!WARNING]  
> Assuming the compiler or runtime will detect the overrun is false; the language provides no such check.

### Step 2 — Adding an explicit bound
`strncpy(dst, src, n)` limits the number of bytes examined and written.  
Example: `strncpy(dst, src, 8)` copies at most eight bytes.  
Formal statement: copy the minimum of `n` and the source length, then, if the source was shorter than `n`, pad the remainder with null bytes.  
> [!WARNING]  
> The padding rule is frequently misremembered; many programmers expect a terminator to appear after exactly `n` bytes even when the source is long.

### Step 3 — The termination gap in strncpy
When the source length is greater than or equal to `n`, `strncpy` writes exactly `n` bytes and stops, leaving the final byte non-null.  
Example: source “12345678” copied with `n=8` yields an unterminated eight-byte sequence.  
Formal statement: if `strlen(src) >= n` then `dst[n-1]` is not necessarily `'\0'`.  
> [!WARNING]  
> Subsequent string functions that scan for `'\0'` will read past the intended buffer.

### Step 4 — Formatted output with size limit
`snprintf(dst, n, fmt, …)` writes at most `n-1` characters plus a terminating null, returning the number of characters that would have been written had space been unlimited.  
Formal statement: the call produces a string whose length is at most `n-1` and whose last byte is always `'\0'`.  
> [!WARNING]  
> Using the return value as a size for a later copy without checking against `n` reintroduces overflow.

### Step 5 — Explicit length return and guaranteed termination
`strlcpy(dst, src, n)` copies at most `n-1` bytes, writes `'\0'` at `dst[min(strlen(src),n-1)]`, and returns `strlen(src)`.  
Formal statement: `dst` is always null-terminated after the call; the returned value equals the source length regardless of truncation.  
> [!WARNING]  
> Treating the return value as the new string length without comparing it to `n-1` silently accepts truncated data.

### Step 6 — Unified safety contract
A function is safe for bounded buffers precisely when (a) it never writes beyond the supplied size and (b) it always leaves a valid null-terminated string inside that size. Only `snprintf` and `strlcpy` satisfy both clauses for every input.

## 5. Worked examples — every step shown

**Example 1 — Basic safe copy with strlcpy**  
*Given:* `char dst[8]; const char *src = "hello";`  
*Find:* contents of `dst` after `strlcpy(dst, src, sizeof(dst))`.  
Step 1: `strlen(src) == 5 < 7`, therefore copy all five characters.  
*Why:* The bound `n-1` leaves room for the terminator.  
Step 2: write `'h','e','l','l','o','\0'` into the first six bytes.  
*Why:* `strlcpy` always appends the terminator.  
Step 3: return value equals 5.  
**Result:** `dst` contains the string “hello”.  

*Reflection:* The example is simple because the source fits; the interesting case appears when the source is longer.

**Example 2 — Truncation detection with strlcpy**  
*Given:* `char dst[4]; const char *src = "abcdef";`  
*Find:* return value and final state of `dst`.  
Step 1: `n-1 = 3`, source length = 6 > 3.  
*Why:* Only three characters may be copied.  
Step 2: copy “abc” and write `'\0'` at index 3.  
*Why:* Termination is mandatory.  
Step 3: return 6.  
**Result:** `dst` holds “abc” (length 3) and the caller observes 6 > 3, detecting truncation.

*Reflection:* The return value is the only reliable signal; comparing it with `n-1` is the required check.

**Example 3 — strncpy leaving an unterminated buffer**  
*Given:* `char dst[4] = {0}; const char *src = "abcd";`  
*Find:* result of `strncpy(dst, src, 4)`.  
Step 1: source length equals bound, so no padding occurs.  
*Why:* Padding is conditional on source length < n.  
Step 2: bytes “abcd” are written; `dst[3]` is `'d'`.  
*Why:* The function stops after exactly n bytes.  
**Result:** `dst` contains four non-null characters and is not a valid C string.

*Reflection:* This is the classic trap that later string routines will violate.

**Example 4 — snprintf with return-value arithmetic**  
*Given:* `char dst[8];`  
*Find:* safe construction of “user: name”.  
Step 1: `int n = snprintf(dst, sizeof(dst), "user: %s", "name");`.  
*Why:* The format string plus argument length is known at runtime.  
Step 2: if `n >= sizeof(dst)` then truncation occurred.  
*Why:* The return value reports the required size, not the written size.  
**Result:** `dst` contains a properly terminated string or the caller can allocate a larger buffer.

*Reflection:* `snprintf` combines formatting and bounding in one call, unlike the pure copy functions.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using `strncpy` and assuming the result is always terminated | The padding rule only applies when source length < n | After any `strncpy`, explicitly set `dst[n-1] = '\0'` or switch to `strlcpy`. |
| Passing `sizeof(dst)` to `strlcpy` when `dst` is a pointer | `sizeof` yields pointer size, not array size | Use a macro or pass the true capacity; never rely on `sizeof` on decayed arrays. |
| Ignoring the return value of `snprintf` | Programmers treat it like `sprintf` | Compare return value against buffer size before using the string. |
| Copying with `n = 0` | Some functions treat zero as “no work” while others write nothing | Reserve `n = 0` for error paths only; assert `n > 0` in production builds. |
| Assuming `strlcpy` is available on every platform | It is a BSD extension, not ISO C | Provide a portable implementation or use `snprintf(dst, n, "%s", src)` instead. |
| Re-using the destination buffer without resetting it | Residual data from a previous truncated copy remains | Zero the buffer or use `memset` before the next bounded copy. |
| Passing a signed `int` size to functions expecting `size_t` | Negative values wrap to huge unsigned sizes | Always use `size_t` or `sizeof` expressions for size arguments. |

## 7. The textbook-precise statement
A call `strlcpy(dst, src, n)` with `dst` a pointer to at least `n` writable bytes, `src` a pointer to a null-terminated string, and `n > 0` produces a result satisfying `dst[k] = src[k]` for `0 ≤ k < min(n-1, strlen(src))`, `dst[min(n-1, strlen(src))] = '\0'`, and returns `strlen(src)`. The analogous guarantee for `snprintf` appears in ISO/IEC 9899:2018 §7.21.6.5. (Kernighan & Ritchie, *The C Programming Language*, 2nd ed., §B3; OpenBSD manual page strlcpy(3).)

## 8. Visual — diagram or schematic
```text
Before (unsafe strcpy):
dst: [ . . . . . . . ]  (capacity 8)
src: [ h e l l o   w o r l d \0 ]
          ^^^^^^^^^^^^^^^^^^^^^^^^  writes past dst[7]

After strlcpy(dst, src, 8):
dst: [ h e l l o   w \0 ]  (always terminated)
src unchanged
return value = 11  (source length, signals truncation)
```

## 9. The memory technique

1. **The hook** — Picture three sentries at a castle gate: “n-copy” stops at the wall, “sn-print” always plants a flag (null) inside the wall, “l-copy” also tells you how long the invading army really was.
2. **What to overlearn** — `strlcpy` and `snprintf` guarantee a terminator inside the supplied size; `strncpy` does not. The return value of `strlcpy` equals source length; compare it with `n-1`.
3. **Spaced-repetition schedule** — Review the three-function comparison table after 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — Re-derive the termination requirement from the definition of a C string: any routine that may leave `dst[n-1] != '\0'` is unsafe for subsequent string operations.

## 10. What this unlocks
Mastery of bounded string functions removes the most common source of buffer overflows in C, allowing safe construction of larger abstractions such as dynamic string libraries, network protocol parsers, and logging frameworks.

- Bounded string formatting (`snprintf` chains)  
- Safe dynamic arrays (`strlcat` patterns)  
- Custom arena allocators that track remaining capacity  
- Static-analysis annotations (`__attribute__((bounded)))`  
- Transition to C++ `std::string_view` or Rust `&str` without hidden copies

## 11. Self-check — five questions, no answers
1. Write a single expression that safely copies an arbitrary null-terminated string into a stack buffer of 64 bytes and reports whether truncation occurred.  
2. What is the observable difference, byte-by-byte, between `strncpy(d, s, 5)` and `strlcpy(d, s, 5)` when `strlen(s) == 7`?  
3. A caller passes `n = sizeof(dst)` to `snprintf`. Under what exact condition does the resulting string remain usable as a C string even though the return value exceeds `n`?  
4. Identify the latent defect: `char buf[16]; strncpy(buf, user_input, strlen(user_input));`.  
5. Derive, from first principles, why `strncpy` followed by an unconditional `dst[n-1] = '\0'` is still inferior to `strlcpy` when the source length is unknown at compile time.