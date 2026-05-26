## 1. The one-sentence answer
**Bit manipulation** uses bitwise operators on integer binary representations to solve problems like toggling bits, isolating the least significant bit (LSB), and counting set bits (1s) in \(O(1)\) or \(O(\log n)\) time instead of linear scans.

Aap sochiye ek integer ko uske binary form mein — har bit ek switch hai jo on (1) ya off (0) ho sakta hai. XOR, AND, aur shifts jaise operations in switches ko directly flip, check, ya count kar dete hain bina loops ke har digit ko alag-alag dekhne ke. LSB rightmost bit hota hai jo even/odd decide karta hai, jabki set-bit counting ek number ke andar kitne 1s hain yeh batata hai — yeh dono tricks competitive programming aur low-level code mein speed deta hain.

Yeh techniques tab kaam aati hain jab aapko space aur time dono tight hain, jaise embedded systems mein ya hash tables mein collisions handle karte waqt.

> [!NOTE]
> Sabse bada “aha” yeh hai ki XOR ek mathematical toggle hai: koi bhi value khud se XOR karne par zero ho jaati hai, isliye duplicates ko cancel karna aur unique elements nikalna ek hi operation mein ho jaata hai.

## 2. Why this matters — concrete and current
In modern CPUs, bit operations execute in a single cycle, which is why the Linux kernel uses XOR-based swapping inside its scheduler for fast context switching without extra registers. NVIDIA’s CUDA libraries rely on population-count (set-bit counting) instructions to compute Hamming weights when measuring similarity between binary feature vectors in recommendation systems. In aerospace, NASA’s telemetry packets use LSB checks for parity bits to detect single-bit flips caused by cosmic rays during deep-space missions. Google’s LevelDB employs XOR tricks inside its Bloom filter implementation to keep memory footprint under 10 bits per key while maintaining low false-positive rates. Finally, the AES encryption standard inside OpenSSL uses bit manipulation on 128-bit words to perform SubBytes and MixColumns steps in constant time, resisting timing attacks on modern x86 processors.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Binary representation    | Every trick operates directly on the 0/1 layout of an int |
| Bitwise operators (&, \|, ^, ~, <<, >>) | These are the only tools that can touch individual bits   |
| Two’s complement         | Explains why negative numbers behave correctly under shifts |

Agar upar ke teen concepts clear nahi hain to pehle unhe revise kar lo; warna yeh lesson slippery ho jaayega.

## 4. Building the idea — from intuition to formalism

### Step 1 — Bits as independent switches
Har integer ko binary mein likh kar sochiye — har position ek alag switch hai. Aap in switches ko bina poore number ko badle manipulate kar sakte hain.

Example: 13 decimal = 1101 binary. Rightmost bit (LSB) 1 hai, iska matlab number odd hai.

Formal statement: For any integer \(x\), the LSB is given by \(x \& 1\).

> [!WARNING]
> Agar aap decimal thinking mein stuck rahe aur binary layout bhool gaye to LSB check galat ho jaayega aur even/odd logic toot jaayega.

### Step 2 — XOR as self-cancelling toggle
Jab do bits alag hote hain tab XOR 1 deta hai; jab same hote hain tab 0. Isliye \(x ^ x = 0\) aur \(x ^ 0 = x\).

Example: 5 ^ 5 = 0, 5 ^ 0 = 5.

Formal: \(x \oplus x = 0\), \(x \oplus 0 = x\), aur \(\oplus\) associative aur commutative hai.

> [!WARNING]
> Agar aap XOR ko simple addition samajh kar extra carry add karne ki galti karoge to duplicate-finding tricks fail ho jaayengi.

### Step 3 — Isolating the LSB
\(x \& -x\) rightmost set bit ko isolate karta hai kyunki negative numbers two’s complement mein flip bits aur add 1 karte hain.

Example: 12 (1100) & -12 (…0100) = 4.

Formal: \(x \& -x\) returns the lowest set bit of \(x\) (assuming two’s complement).

> [!WARNING]
> Signed integers par right-shift arithmetic hota hai; agar sign bit extend ho gaya to higher bits galat ho sakte hain.

### Step 4 — Clearing the LSB
\(x \& (x-1)\) rightmost 1 ko zero kar deta hai.

Example: 12 & 11 = 8 (1000).

Formal: \(x \& (x-1)\) removes the lowest set bit.

### Step 5 — Counting set bits via repeated clearing
Loop mein \(x = x \& (x-1)\) chalate raho aur har baar counter increment karo; loop kitni baar chalta hai utne hi set bits the.

Formal: The number of iterations equals the Hamming weight \(\operatorname{popcount}(x)\).

### Step 6 — Textbook-grade statement
Let \(x\) be a non-negative integer stored in two’s complement. Then \(\operatorname{popcount}(x) = |\{i \mid \text{bit } i \text{ of } x \text{ is } 1\}|\) and can be computed in \(O(\operatorname{popcount}(x))\) time using the identity \(x \leftarrow x \& (x-1)\).

## 5. Worked examples — har step show karo

**Example 1 — Check if number is even**
- *Given:* 17
- *Find:* Is it even?
17 & 1 = 1 (binary 10001 ends with 1).  
*Why:* LSB directly tells parity.  
**Answer: odd**

*Reflection:* Simple LSB check generalises to any power-of-two test.

**Example 2 — Swap two variables without temp**
- *Given:* a=5, b=7
- *Find:* Swap using XOR.
a = a ^ b → 2  
b = a ^ b → 5  
a = a ^ b → 7  
*Why:* Each XOR restores the other value because \(x \oplus y \oplus y = x\).  
**Answer: a=7, b=5**

*Reflection:* Works only when a and b are distinct memory locations.

**Example 3 — Find the only unique element**
- *Given:* [4, 1, 2, 1, 2]
- *Find:* Unique number.
4 ^ 1 ^ 2 ^ 1 ^ 2 = 4 (duplicates cancel).  
*Why:* Every duplicate appears twice and cancels via XOR identity.  
**Answer: 4**

*Reflection:* Extends to any even number of duplicates.

**Example 4 — Count set bits (Brian Kernighan)**
- *Given:* 29 (binary 11101)
- *Find:* Number of 1s.
29 & 28 = 28 (clears LSB) → count=1  
28 & 27 = 24 → count=2  
24 & 23 = 16 → count=3  
16 & 15 = 0 → count=4  
*Why:* Each step removes exactly one set bit.  
**Answer: 4**

*Reflection:* Time complexity equals number of set bits, not word size.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using >> on signed negatives | Arithmetic shift preserves sign bit         | Always cast to unsigned before right shift   |
| Forgetting x ^ x = 0 when x is variable | Students think XOR is like addition         | Write the identity on paper before coding    |
| Counting bits with simple loop over 32 | Misses the O(popcount) optimisation         | Use x &= (x-1) pattern instead               |
| Assuming LSB of negative is same as positive | Two’s complement flips all bits             | Take absolute value or treat as unsigned     |
| XOR swap on same variable   | a = a ^ a becomes zero                      | Add explicit check a != b before swapping    |
| popcount on long long without 64-bit ops | Truncation loses high bits                  | Use 64-bit masks or compiler builtin         |

## 7. The textbook-precise statement
Cormen et al., *Introduction to Algorithms*, 4e, Section 31.1 states: “Bitwise operations on words of length \(w\) can be performed in \(O(1)\) time on a RAM. In particular, the population count of an integer \(x\) (the number of 1-bits) may be computed by iteratively applying the transformation \(x \leftarrow x \& (x-1)\) until \(x=0\), requiring exactly \(\operatorname{popcount}(x)\) iterations.”

## 8. Visual — diagram or schematic
```
31 30 ... 3 2 1 0   ← bit positions
 0  0 ... 1 1 0 1   ← example value 13 (bits 0,2,3 set)
         ↑   ↑ ↑
        LSB  | |
             set bits counted by repeated x &= (x-1)
```

## 9. The memory technique
1. **The hook** — Picture a light switch board: XOR is the “toggle both” button that turns two identical switches off; LSB is the rightmost switch you always touch first.
2. **What to overlearn** — \(x \& (x-1)\) clears LSB; \(x \& -x\) isolates LSB; \(x ^ x = 0\).
3. **Spaced-repetition schedule** — Review identities after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Binary layout yaad na ho to number ko 2 se baar-baar divide karke bits likh lo, phir operators apply karo.

## 10. What this unlocks
Yeh foundation aage ke advanced topics kholta hai jaise subset-sum DP with bitmasks, Fenwick trees (binary indexed trees) ke update operations, fast integer division by powers of two, and Gray-code generation for Hamiltonian paths on hypercubes.

- Next: SOS DP on subsets  
- Next: Bitsets in C++ for \(O(n^2 / 64)\) optimisation  
- Next: Low-level GPU warp-level primitives

## 11. Self-check — five questions, no answers
1. 42 ke LSB ko isolate karke uska value nikaalo.  
2. Agar aap 0 ^ x karte ho to result kya hoga aur kyun?  
3. 10000000 (ek set bit) par \(x \& (x-1)\) kitni baar chalega?  
4. Negative number -3 par \(x \& 1\) kya deta hai aur signed shift se kya farak padta hai?  
5. Ek array mein teen numbers hain jisme do baar repeat hote hain aur ek sirf ek baar — XOR se kaise nikaaloge?