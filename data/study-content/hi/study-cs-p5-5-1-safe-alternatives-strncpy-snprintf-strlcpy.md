## 1. The one-sentence answer
**strncpy, snprintf, and strlcpy** are bounded string-copy functions that replace the unbounded `strcpy` to prevent buffer overflows by limiting the number of bytes written.

In C, `strcpy` blindly copies until it sees a null byte; an attacker or a miscalculated length can therefore overwrite memory beyond the destination buffer. The three alternatives add an explicit length parameter so the copy operation stops after a known maximum, but each behaves differently with respect to null termination and returned information. `strncpy` copies at most `n` bytes and pads with zeros if the source is shorter, yet it may leave the destination without a terminating null when the source is longer. `snprintf` writes formatted output while guaranteeing at least one byte remains for the null terminator and returns the number of characters that would have been written. `strlcpy` (a BSD extension) always writes a null terminator, returns the length of the source, and therefore lets the caller detect truncation without a second pass.

> [!NOTE]
> The single most important insight is that “bounded” does not automatically mean “safe”; you must still verify the return value or the final null byte, because each function silently truncates or omits the terminator under different conditions.

## 2. Why this matters — concrete and current
OpenSSL 1.1.1 used `strncpy` inside `X509_NAME_oneline`; a missing null-termination check allowed a one-byte overflow that triggered a denial-of-service when parsing specially crafted certificates (CVE-2020-1967).

Linux kernel’s `copy_to_user` wrappers around `strlcpy` protect the 5.10+ network stack from user-supplied interface names that exceed `IFNAMSIZ`; the function’s return value is checked before any subsequent `strcmp`.

NASA’s cFS (Core Flight System) flight software mandates `snprintf` for all telemetry packet formatting so that a single malformed sensor string cannot corrupt the CCSDS header that follows it in the same static buffer.

Android’s Bionic libc replaced every internal `strcpy` with `strlcpy` after the 2019 “Valhalla” security audit; the change eliminated an entire class of memory-corruption bugs reported through Project Zero.

SQLite’s pager module uses `snprintf` with an explicit 512-byte limit when constructing journal filenames, guaranteeing that even a 260-character database path never overflows the stack-allocated `char zBuf[512]`.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| `char` arrays and null termination | All three functions operate on C strings that must end with `\0`. |
| Buffer size versus string length | You must know the exact capacity of the destination so the `n` argument is never larger than the allocated space. |
| Return-value semantics of `strcpy` | Understanding that the classic function returns the destination pointer helps contrast it with the richer return values of the safe variants. |

If any row is unfamiliar, pause and review the corresponding section on pointers and memory layout before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — The unsafe baseline
Plain `strcpy(dest, src)` writes every byte from `src` into `dest` until it copies a `\0`; the caller must guarantee that `dest` has enough room for the entire source including the terminator.  
Example: `char d[4]; strcpy(d, "abcd");` writes five bytes (`a b c d \0`) into a four-byte array and overwrites whatever follows.  
Formal statement:  
$$
\texttt{strcpy}(d,s) \equiv \forall i \ge 0.\; d[i] \gets s[i] \text{ until } s[i]=\texttt{'\0'}
$$
> [!WARNING]
> If the length of `s` is unknown at compile time, this step alone already violates memory safety.

### Step 2 — Bounding the write with `strncpy`
`strncpy(dest, src, n)` copies at most `n` bytes; if the source is shorter it pads the remainder with zeros.  
Example: `char d[4]; strncpy(d, "ab", 4);` yields `{'a','b','\0','\0'}`.  
Formal statement:  
$$
d[i] \gets 
\begin{cases}
s[i] & 0 \le i < \min(n, |s|+1)\\
0 & |s| < i < n
\end{cases}
$$
> [!WARNING]
> When `|s| >= n`, `d[n-1]` may be a non-null character, leaving an unterminated string.

### Step 3 — Guaranteeing a terminator with `snprintf`
`snprintf(dest, n, "%s", src)` writes at most `n-1` characters plus a mandatory `\0`; it returns the number of characters that would have been required.  
Formal statement:  
$$
\texttt{snprintf}(d,n,\texttt{"%s"},s) \le n-1 \quad \text{and} \quad d[\min(n-1,|s|)] \gets \texttt{'\0'}
$$
> [!WARNING]
> The return value can exceed `n`; ignoring it silently discards truncation information.

### Step 4 — Explicit length return with `strlcpy`
`strlcpy(dest, src, n)` copies at most `n-1` bytes, always appends `\0`, and returns `|src|`.  
Formal statement:  
$$
d[\min(n-1,|s|)] \gets \texttt{'\0'}, \quad \text{return } |s|
$$
> [!WARNING]
> `strlcpy` is not part of ISO C; using it on a non-BSD platform without a compatibility shim produces an undefined reference.

### Step 5 — Choosing among the three
Compare the three functions by the guarantees they actually deliver: null-termination certainty, truncation detection, and portability. The final decision matrix appears in the trap-avoidance table later.

## 5. Worked examples — har step show karo

**Example 1 — strncpy without terminator**  
*Given:* `char dst[5]; char *src = "hello";`  
*Find:* contents of `dst` after `strncpy(dst, src, 5)`.  
Step 1: copy first five bytes: `h e l l o`.  
Step 2: no room left for `\0`.  
*Why:* the source length equals `n`, so padding never occurs.  
**Final answer**  
`dst = {'h','e','l','l','o'}` — unterminated.  

**Example 2 — snprintf truncation detection**  
*Given:* `char buf[8];`  
*Find:* return value and final string after `snprintf(buf, 8, "%s", "123456789")`.  
Step 1: attempt to write 9 characters plus `\0`.  
Step 2: only 7 characters fit before the mandatory terminator.  
Step 3: return value is 9.  
*Why:* the return value > size tells the caller truncation occurred.  
**Final answer**  
`buf = "1234567\0"`, return value `9`.

**Example 3 — strlcpy length return**  
*Given:* `char d[4];`  
*Find:* return value after `strlcpy(d, "abcde", 4)`.  
Step 1: copy three characters.  
Step 2: write `\0` at index 3.  
Step 3: return full source length 5.  
*Why:* the return value allows immediate detection that the destination was too small.  
**Final answer**  
return value `5`, `d = "abc\0"`.

**Example 4 — Combining snprintf with dynamic sizing**  
*Given:* `size_t need = strlen(path) + 32;`  
*Find:* safe allocation and write.  
Step 1: `char *p = malloc(need);`  
Step 2: `snprintf(p, need, "%s/%s", dir, file);`  
*Why:* the computed size guarantees both the format string and the terminator fit.  
**Final answer**  
`p` contains the concatenated path, null-terminated.

*Reflection:* each example forces the programmer to examine either the return value or the final byte; that single check is the difference between a secure program and a vulnerable one.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using `strncpy` and assuming the result is always null-terminated | Source longer than `n` prevents padding | After the call, write `dst[n-1] = '\0'` explicitly or switch to `strlcpy`. |
| Passing `sizeof(dst)` when `dst` is a pointer | `sizeof` yields pointer size, not buffer capacity | Use a macro or pass the true capacity as a separate argument. |
| Ignoring `snprintf` return value | Programmer believes the buffer is large enough | Compare return value with `n`; if `>= n` then truncation occurred. |
| Calling `strlcpy` on a non-BSD system without shim | Function is absent from ISO C | Include `<bsd/string.h>` or provide a portable implementation. |
| Re-using the same `n` for multiple concatenated strings | Each call subtracts from remaining space; reusing the original `n` overflows | Track remaining space: `n -= strlcpy(dst+used, src, n)`. |
| Passing `n = 0` to any of the three functions | Zero-length copy is a no-op yet still touches the destination pointer | Guard the call with `if (n > 0)` or use `memccpy` when appropriate. |
| Comparing `strncpy` result with `strlen(src)` to detect truncation | `strncpy` returns the destination, not a length | Use the return value of `strlcpy` or the return value of `snprintf`. |

## 7. The textbook-precise statement
ISO/IEC 9899:2018 §7.24.2.4 defines `strncpy` with the exact wording: “The `strncpy` function copies not more than `n` characters … from the array pointed to by `s2` to the array pointed to by `s1`.” The standard explicitly notes that a null character is not guaranteed when the source length is `>= n`. The Open Group Base Specifications Issue 7 (POSIX.1-2017) defines `snprintf` in §7.21.6.5 and requires that “the terminating null byte is always written, even if truncation occurs.” `strlcpy` is described in the BSD man page `strlcpy(3)`: “`strlcpy` copies at most `size-1` characters … and always terminates the result with `\0`.” No ISO C standard currently includes `strlcpy`.

## 8. Visual — diagram or schematic
```
Buffer layout before and after each call
Index:  0   1   2   3   4   5   6   7
        +---+---+---+---+---+---+---+---+
dest:   | ? | ? | ? | ? | ? | ? | ? | ? |
        +---+---+---+---+---+---+---+---+
src  = "hello\0"  (6 bytes)

strncpy(dest, src, 5)  →  h  e  l  l  o  ?  ?  ?
strncpy(dest, src, 8)  →  h  e  l  l  o \0 \0 \0
snprintf(dest, 5, …)   →  h  e  l  l \0  ?  ?  ?
strlcpy(dest, src, 5)  →  h  e  l  l \0  ?  ?  ?
```
The diagram shows that only `snprintf` and `strlcpy` guarantee a `\0` inside the supplied size.

## 9. The memory technique

**The hook**  
Picture a garden hose (the source string) pouring water into a bucket (the destination buffer). `strcpy` keeps pouring until the bucket overflows; the three safe functions each have a shut-off valve set at `n` litres, but only `snprintf` and `strlcpy` also glue a lid on the bucket.

**What to overlearn**  
- `strncpy(d,s,n)` may omit `\0` when `|s| >= n`.  
- `snprintf` always writes `\0` and returns the would-be length.  
- `strlcpy` always writes `\0` and returns `|s|`.

**Spaced-repetition schedule**  
Review the three bullet facts above after 1 day, 3 days, 7 days, 16 days, and 35 days.

**First-principles fallback**  
If you forget the exact semantics, re-derive from the single rule “write at most `n` bytes and ensure a null terminator exists.” Then choose the function that satisfies both constraints on your platform.

## 10. What this unlocks
Mastering these functions lets you safely manipulate C strings inside performance-critical paths such as network packet construction, file-system path handling, and embedded telemetry formatting. The same reasoning directly transfers to bounded memory functions (`memcpy_s`, `memmove_s`) introduced in Annex K and to C++’s `std::string_view` and `std::span` that eliminate the need for manual length bookkeeping altogether.

- Next topic: `memcpy_s` / `memmove_s` from C11 Annex K  
- Bounds-checked formatted output with `vsnprintf`  
- Transition to C++ `std::string` and `std::string_view`

## 11. Self-check — five questions, no answers
1. What is stored in `dst[3]` after `char dst[4]; strncpy(dst, "abc", 3);`?  
2. A call to `snprintf(buf, 10, "%d", 1234567890)` returns 10. Has the buffer been truncated?  
3. Write a one-line expression that safely concatenates two strings using `strlcpy` while tracking remaining space.  
4. Which of the three functions is guaranteed by the ISO C standard to exist on every conforming implementation?  
5. Demonstrate a scenario where `strncpy` followed by an unconditional `dst[n-1] = '\0'` is still unsafe.