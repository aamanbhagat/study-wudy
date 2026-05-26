## 1. The one-sentence answer

**SIMD packs multiple scalar operations into a single instruction that executes on wide vector registers, letting one CPU instruction process 4–16 data elements in parallel.**

Iska matlab yeh hai ki normal scalar code mein aap ek loop ke andar ek-ek element par kaam karte ho, jabki SIMD usi loop ko vector register ke andar ek saath process kar deta hai. SSE ne 128-bit XMM registers introduce kiye jo 4 floats ya 2 doubles ko ek saath handle karte hain; AVX ne yeh 256-bit YMM tak badha diya aur AVX-512 ne 512-bit ZMM tak. Result yeh hota hai ki same arithmetic operation ka latency almost same rehta hai lekin throughput 4×–16× ho jaata hai jab data aligned aur independent ho.

> [!NOTE]
> The real “aha” moment is realising that SIMD does not reduce the latency of one addition; it hides that latency by filling the execution ports with multiple independent additions inside one instruction.

## 2. Why this matters — concrete and current

Intel’s AVX-512 units inside Xeon Scalable processors power the matrix-multiply kernels in Intel oneDNN that Facebook and Microsoft use for inference on CPU-only fleets. NASA’s Pleiades supercomputer runs CFD codes whose hottest loops are hand-vectorised with AVX2 intrinsics, delivering the majority of its sustained FLOPS. Modern video encoders such as x264 and SVT-AV1 use SSE4.1 and AVX2 SAD and SAD-BW instructions to compute motion-estimation scores for every macroblock in real time on laptops. TensorFlow Lite’s CPU backend automatically detects AVX2 support and rewrites depthwise convolutions into 8-wide float32 SIMD loops, cutting mobile-to-server latency by 3–5× on Intel Chromebooks. Finally, the Linux kernel’s crypto routines (AES-NI + AVX) encrypt disk I/O for every LUKS volume; without SIMD the per-core throughput would drop below 1 GB/s on current CPUs.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| CPU register file        | SIMD lives inside wider architectural registers (XMM/YMM/ZMM) |
| Data alignment           | Unaligned loads split across cache lines and lose half the throughput |
| Loop dependence analysis | Vectorisation is legal only when iterations are independent |
| Instruction latency vs throughput | SIMD shines on throughput-bound arithmetic, not latency-bound chains |

## 4. Building the idea — from intuition to formalism

### Step 1 — Scalar loop versus packed operation
Ek normal loop ek baar mein ek float add karta hai. SIMD ek hi add instruction ke andar 8 floats add kar deta hai jab 256-bit register use karte ho.  
Concrete example: four-element arrays `a[4] + b[4]` normally four `addss` instructions lete hain; AVX `vaddps ymm0, ymm1, ymm2` se ek instruction mein ho jaata hai.  
Formal statement:  
$$T_{\text{scalar}} = n \cdot L_{\text{add}},\qquad T_{\text{SIMD}} = \lceil n / w \rceil \cdot L_{\text{add}}$$  
where \(w\) is the number of elements in the vector register.  
> [!WARNING] Agar aap \(w\) ko count karna bhool jaayein to speed-up ka formula hi galat ho jaayega.

### Step 2 — Register evolution: XMM → YMM → ZMM
SSE ne 128-bit XMM registers diye (xmm0–xmm15). AVX ne unhi registers ko 256-bit YMM bana diya aur legacy SSE code ko VEX prefix se chalaane diya. AVX-512 ne 32 ZMM registers aur mask registers introduce kiye.  
Formal: register width doubles every major extension while keeping backward compatibility via prefixes.

### Step 3 — Alignment requirement
128-bit loads must be 16-byte aligned; 256-bit loads 32-byte aligned. Misaligned access either faults (older SSE) or incurs 2× latency penalty (AVX).  
Formal: \(\text{address} \equiv 0 \pmod{2^k}\) where \(k = 4 + \log_2(w/128)\).

### Step 4 — Data-independent lanes
Har vector lane ka result sirf usi lane ke inputs par depend karta hai. Cross-lane operations (horizontal add, permute) alag instructions hain.  
Formal: for lane \(i\), \(r_i = f(a_i, b_i)\) only.

### Step 5 — Masking in AVX-512
AVX-512 lets you supply a k-register mask so that only selected lanes write results; masked lanes keep old values or zero depending on zeroing modifier.  
Formal: \(r_i = m_i ? f(a_i,b_i) : (zeroing ? 0 : r_i)\).

### Step 6 — Compiler vectorisation contract
Compiler must prove absence of dependence, sufficient alignment, and trip-count multiple of vector width. When any fails, scalar fallback remains.

## 5. Worked examples — har step show karo

**Example 1 — Four-wide float add**  
*Given:* two 4-element float arrays.  
*Find:* SIMD version using SSE.  
```c
__m128 a = _mm_load_ps(&x[0]);          // 16-byte aligned
__m128 b = _mm_load_ps(&y[0]);
__m128 c = _mm_add_ps(a, b);
_mm_store_ps(&z[0], c);
```
*Why* `_mm_load_ps` not `_mm_loadu_ps`: alignment guarantees single cache-line read.  
**Final answer:** one 128-bit instruction replaces four scalar adds.

**Example 2 — AVX2 8-wide integer dot product**  
*Given:* two int32 arrays of length 8.  
*Find:* 256-bit multiply-add.  
```c
__m256i va = _mm256_load_si256((__m256i*)x);
__m256i vb = _mm256_load_si256((__m256i*)y);
__m256i prod = _mm256_mullo_epi32(va, vb);
```
*Why* `_mm256_mullo_epi32`: produces eight 32-bit products in one instruction.  
**Final answer:** eight multiplies in 5 cycles instead of ~40 scalar cycles.

**Example 3 — Horizontal sum reduction**  
*Given:* `__m256 v`.  
*Find:* sum of all eight floats.  
```c
__m128 lo = _mm256_castps256_ps128(v);
__m128 hi = _mm256_extractf128_ps(v, 1);
__m128 sum = _mm_add_ps(lo, hi);
sum = _mm_hadd_ps(sum, sum);
sum = _mm_hadd_ps(sum, sum);
float total = _mm_cvtss_f32(sum);
```
*Why* two `_mm_hadd_ps`: reduces eight lanes to one scalar in three instructions.  
**Final answer:** scalar total extracted after three shuffles + adds.

**Example 4 — AVX-512 masked store**  
*Given:* length-19 array (not multiple of 16).  
*Find:* safe vectorised tail.  
```c
__mmask16 k = (1 << (n % 16)) - 1;
__m512 v = _mm512_maskz_loadu_ps(k, &x[i]);
...
_mm512_mask_storeu_ps(&z[i], k, result);
```
*Why* mask `k`: only first `(n%16)` lanes write, preventing page fault.  
**Final answer:** correct result with no scalar cleanup loop.

*Reflection:* examples 2–4 show that once alignment and independence are guaranteed, the same pattern scales from SSE to AVX-512 with only width and mask changes.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using `_mm_loadu_ps` everywhere | Convenience hides 2× latency penalty        | Profile; keep hot buffers 32-byte aligned    |
| Assuming every loop auto-vectorises | Compiler cannot prove independence          | Use `#pragma omp simd` or intrinsics         |
| Ignoring denormals in AVX   | FTZ/DAZ flags off → 100× slowdown           | Set MXCSR DAZ+FTZ once at startup            |
| Mixing SSE and AVX code     | VEX prefix penalty on Haswell               | Recompile whole module with AVX enabled      |
| Writing to same memory from two lanes | False dependence through aliasing           | Use restrict / __restrict or disjoint buffers|
| Forgetting mask zeroing     | Old data leaks into masked lanes            | Explicitly choose `_mm512_maskz_*` variants  |
| Measuring only latency      | Throughput is the real metric               | Use 1000-iteration warm-up + throughput counters |

## 7. The textbook-precise statement

In a SIMD instruction set architecture, a single instruction specifies an operation that is applied element-wise to corresponding lanes of two or more vector registers of width \(W\) bits. Let \(w = W / \tau\) be the number of elements of type \(\tau\). For any arithmetic operator \(\oplus\) the instruction computes  
\[
r[i] \leftarrow a[i] \oplus b[i],\qquad 0 \le i < w
\]  
provided the memory operands are aligned to \(W/8\) bytes and no intra-lane dependence exists between iterations. (Hennessy & Patterson, *Computer Architecture: A Quantitative Approach*, 6e, §4.4, “SIMD Extensions”.)

## 8. Visual — diagram or schematic

```text
256-bit YMM register
[ lane7 | lane6 | lane5 | lane4 | lane3 | lane2 | lane1 | lane0 ]  (each lane = 32-bit float)
          ^       ^       ^       ^       ^       ^       ^       ^
          |       |       |       |       |       |       |       |
        vaddps applies the SAME opcode to every lane in parallel
```

## 9. The memory technique

1. **The hook** — Picture eight soldiers standing shoulder-to-shoulder; one shouted order (“add!”) makes all eight raise their rifles simultaneously. That single command is the SIMD instruction.

2. **What to overlearn** — 256-bit = 8 floats, 512-bit = 16 floats; alignment equals register width in bytes; mask registers only appear in AVX-512.

3. **Spaced-repetition schedule** — Review the hook image after 1 day, again at 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback** — If you forget the intrinsic name, remember “load vector → arithmetic → store vector” and look up the `_mm256_*` family that matches the width you need.

## 10. What this unlocks

Once you internalise SIMD you can read and write the vectorised kernels inside BLAS, JPEG decoders, and neural-network runtimes. It directly precedes understanding of GPU SIMT, tensor cores, and automatic vectorisation passes in LLVM.

- Next topics: GPU warp execution, tensor core matrix-multiply, roofline analysis with vectorised code.

## 11. Self-check — five questions, no answers

1. Calculate theoretical speed-up of an AVX2 dot-product loop on an array of 1024 floats versus scalar code, assuming perfect alignment and no remainder.

2. A loop contains `a[i] = b[i] * c[i-1]`. Can it be legally vectorised? Why or why not?

3. You observe 2× slowdown after adding `_mm256_loadu_ps`. Name the most probable cause and the one-line fix.

4. In AVX-512, what value does a masked-out lane contain after `_mm512_mask_add_ps` when zeroing is enabled versus when it is disabled?

5. A developer reports “AVX code is slower than SSE on my machine.” List the two most common configuration mistakes that produce this symptom.