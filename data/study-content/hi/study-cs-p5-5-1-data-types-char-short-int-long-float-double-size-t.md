## 1. The one-sentence answer
**C data types define the exact size in bytes and the interpretation rules for every value stored in memory.**

Aap jab `int x = 42;` likhte ho, to compiler ko pata chal jaata hai ki `x` ko 4 bytes (ya platform ke hisaab se) allocate karna hai aur usme signed integer values store honge. Har type ka apna range hota hai — `char` 1 byte leke -128 se 127 tak ja sakta hai, jabki `double` 8 bytes mein floating-point numbers ko high precision ke saath represent karta hai. `size_t` ek unsigned integer type hai jo specially object sizes aur array indices ke liye bana hai, isliye negative values ka sawal hi nahi uthta.

Iska asli matlab yeh hai ki aapko har variable ke liye memory footprint aur overflow behaviour pehle se pata hota hai. Jab aap low-level systems code likhte ho, yeh knowledge decide karti hai ki program kitna fast aur kitna safe chalega.

> [!NOTE]
> Sabse badi aha moment yeh hai ki C mein type sirf ek label nahi hai — woh memory layout aur bit-pattern interpretation ka contract hai jo compiler aur hardware dono follow karte hain.

## 2. Why this matters — concrete and current
Linux kernel mein `size_t` ka use har jagah hota hai — `kmalloc`, `copy_to_user`, aur page allocator routines mein — kyunki 64-bit systems par 4 GB se badi objects ko handle karna padta hai bina sign bit ke waste kiye.

NVIDIA ke CUDA kernels mein `float` aur `double` ka choice directly FP32 vs FP64 throughput ko affect karta hai; scientific simulations jaise molecular dynamics mein galat precision choose karne se numerical instability aa jaati hai.

Google’s TensorFlow Lite Micro library embedded devices par `int8_t` aur `int16_t` types ka use karti hai taaki model weights SRAM mein fit ho aur inference latency kam rahe.

Semiconductor companies jaise ARM apne CMSIS headers mein `uint32_t`, `int64_t` jaise fixed-width types define karti hain taaki same source code different Cortex-M cores par bina recompile kiye chal sake.

Modern browsers ke JavaScript engines (V8) mein `double` ka exclusive use hota hai numbers ke liye, isliye C programmers ko pata hona chahiye ki `int` se `double` conversion mein precision loss kab hota hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Binary representation | Har data type ka value bits mein kaise store hota hai yeh samajhna zaroori hai |
| sizeof operator      | Actual memory size compile-time par nikaalne ke liye     |
| Signed vs unsigned   | Range aur overflow behaviour directly ispe depend karta hai |
| IEEE 754             | `float` aur `double` ke rounding aur special values (NaN, Inf) ke liye |

Agar aapko signed/unsigned ka difference ya `sizeof` ka basic use nahi pata, to pehle woh padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Memory is just bytes; types give meaning
C mein har variable ek address par bytes ka block occupy karta hai. Type decide karti hai ki un bytes ko kaise padha jaaye.  
Example: `char c = 65;` aur `int i = 65;` dono alag-alag space lete hain.  
Formal: A type \( T \) maps a sequence of \( n \) bytes to a value in a defined set \( V_T \).

> [!WARNING]
> Agar aap type galat samajh ke bytes padhoge to sign extension ya endianness ki wajah se value bilkul alag aa sakti hai.

### Step 2 — Integer types differ only in width and signedness
`char` (1 byte), `short` (2), `int` (≥2, usually 4), `long` (≥4, often 8) aur `long long` (≥8) sirf width mein differ karte hain. Signed version negative values allow karti hai, unsigned nahi.  
Example: `unsigned char` 0–255 tak jaata hai, signed `char` -128–127.  
Formal: Range of signed \( n \)-byte integer is \( [-2^{8n-1}, 2^{8n-1}-1] \).

> [!WARNING]
> `int` ki width platform pe depend karti hai — 16-bit microcontrollers par `int` 2 bytes ka hota hai.

### Step 3 — Floating types follow IEEE 754
`float` (4 bytes) aur `double` (8 bytes) sign bit, exponent aur mantissa ke combination se real numbers represent karte hain.  
Example: `float f = 0.1f;` exactly 0.1 nahi hota.  
Formal: Value = \( (-1)^s \times 2^{e-b} \times (1 + m/2^p) \).

### Step 4 — size_t is the canonical unsigned size type
`size_t` hamesha unsigned hota hai aur `sizeof` operator ka return type hai. 64-bit systems par yeh 8 bytes ka hota hai.  
Formal: `size_t` is the unsigned integer type returned by `sizeof`.

### Step 5 — Promotion and conversion rules
Jab `char` ko `int` mein daalte ho to sign extension hota hai agar signed ho. `float` se `double` safe hai, lekin `double` se `float` rounding laa sakta hai.

## 5. Worked examples — har step show karo

**Example 1 — Basic sizes**  
*Given:* 64-bit Linux, gcc  
*Find:* sizes of all basic types  
`printf("%zu\n", sizeof(char));` → 1  
`printf("%zu\n", sizeof(short));` → 2  
`printf("%zu\n", sizeof(int));` → 4  
`printf("%zu\n", sizeof(long));` → 8  
`printf("%zu\n", sizeof(float));` → 4  
`printf("%zu\n", sizeof(double));` → 8  
`printf("%zu\n", sizeof(size_t));` → 8  
*Why:* `sizeof` compile-time constant deta hai jo type ke according bytes count karta hai.  
**Final answer:** sizes as listed above.

*Reflection:* Tricky part yeh hai ki `long` 64-bit par 8 bytes hota hai, lekin 32-bit systems par 4 bytes — hamesha `sizeof` use karo.

**Example 2 — Unsigned overflow**  
*Given:* `unsigned char x = 255; x = x + 1;`  
*Find:* final value of x  
255 + 1 = 256 → 256 mod 256 = 0 (wrap-around)  
*Why:* Unsigned types modular arithmetic follow karte hain.  
**Final answer:** x becomes 0.

*Reflection:* Signed overflow undefined behaviour hai, unsigned nahi — yeh difference important hai.

**Example 3 — Float precision loss**  
*Given:* `float f = 16777217.0f;`  
*Find:* stored value  
16777217 cannot be represented exactly in 23-bit mantissa → becomes 16777216.0  
*Why:* Mantissa sirf 23 bits rakhti hai, isliye 2²⁴ ke aas-paas precision khatam ho jaati hai.  
**Final answer:** f == 16777216.0f

*Reflection:* Isliye monetary calculations mein `float`/`double` avoid karte hain.

**Example 4 — size_t in array indexing**  
*Given:* `size_t n = (size_t)-1;` (all bits 1)  
*Find:* risk when used as array size  
Negative value ka wrap-around ek bahut badi positive number ban jaata hai → allocation fail ya overflow.  
*Why:* `size_t` unsigned hai, isliye `(size_t)-1` maximum possible value hai.  
**Final answer:** n holds SIZE_MAX.

*Reflection:* Hamesha signed values ko `size_t` mein cast karne se pehle check karo.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Assuming `int` is always 4 bytes | Old 16/32-bit machines par alag hota tha   | `int32_t` ya `int64_t` use karo              |
| `char` signed ya unsigned   | Compiler default alag hota hai              | Explicit `signed char` ya `unsigned char`    |
| `sizeof` ko int mein store karna | `size_t` unsigned hota hai                 | `size_t` ya `ssize_t` use karo               |
| Float comparison with ==    | Rounding errors se exact match nahi hota    | Epsilon tolerance use karo                   |
| Mixing signed/unsigned      | Promotion rules unexpected results dete hain| Same signedness rakhna prefer karo           |

## 7. The textbook-precise statement
In C, each data type is a complete object type whose size is a positive integer constant given by `sizeof(T)`. The minimum ranges are specified in ISO/IEC 9899:2018 §5.2.4.2.1. `size_t` is the unsigned integer type of the result of the `sizeof` operator (K&R, *The C Programming Language*, 2e, §2.2 and Annex B). Conversion between types follows the usual arithmetic conversions (ISO 9899 §6.3.1.8).

## 8. Visual — diagram or schematic
```
Address: 0x1000   0x1001   0x1002   0x1003
Type:    char     short (2B)      int (4B)
Value:   0x41     0x0042          0x00000043
Bytes:   [41]     [42 00]         [43 00 00 00]
```
Diagram shows how different types occupy contiguous memory starting at same address; `sizeof` tells exact byte count.

## 9. The memory technique

**The hook**  
Socho har type ek alag size ke “dabbe” jaisa hai — `char` ek chhota dabba, `double` ek bada dabba.

**What to overlearn**  
- `sizeof(char) == 1` always  
- `size_t` unsigned aur `sizeof` ka return type  
- `float` 4B, `double` 8B

**Spaced-repetition schedule**  
Review 1 din, 3 din, 7 din, 16 din, 35 din baad.

**First-principles fallback**  
Agar sizes bhool jaao to `sizeof` likh ke compile-time par dekh lo aur range ke liye `<limits.h>` aur `<stdint.h>` headers check karo.

## 10. What this unlocks
Yeh knowledge aapko pointers, dynamic memory (`malloc`), aur low-level bit manipulation ke liye taiyaar karti hai.

- Pointer arithmetic correctly karna  
- Struct padding aur alignment samajhna  
- Safe array indexing with `size_t`  
- Writing portable code across 32/64-bit platforms

## 11. Self-check — five questions, no answers
1. 32-bit system par `long` aur `int` ka size same ho sakta hai?  
2. `unsigned char` mein 255 + 2 karne ke baad value kya hogi?  
3. `double` se `float` conversion mein kab precision loss hota hai?  
4. Kyun `size_t` ko loop counter ke liye signed `int` se behtar maana jaata hai?  
5. Agar `char` signed hai aur aap usko `int` mein promote karte ho, to negative value ka kya hota hai?