## 1. The one-sentence answer
**A hash function must be deterministic, produce uniformly distributed outputs, and execute in near-constant time.**

Deterministic ka matlab yeh hai ki ek hi input hamesha ek hi output deta hai, chahe kitni baar call karo. Uniform distribution isliye zaroori hai kyunki collisions kam hone chahiye aur har bucket roughly barabar load share kare. Fast execution isliye chahiye kyunki hashing ka asli fayda tabhi hai jab lookup O(1) ke kareeb ho.

Yeh teen properties saath mein hash table ko practical banati hain. Agar koi ek bhi weak ho to ya to correctness tootegi ya performance gir jayegi. Real systems mein in teeno ko balance karna padta hai.

> [!NOTE]
> Deterministic hone se reproducibility guarantee hoti hai, uniform distribution collision probability ko average-case O(1) banati hai, aur speed requirement tabhi meaningful hai jab data size badhe.

## 2. Why this matters — concrete and current
Google's LevelDB aur RocksDB dono deterministic hash functions ka use karte hain taaki SSTable files reproducible rahen aur distributed compaction mein koi inconsistency na aaye.

In machine-learning training pipelines jaise TensorFlow's tf.data service, uniform hashing ensure karta hai ki training examples har worker node par evenly distribute hon, warna stragglers training time ko 2-3x badha dete hain.

Modern CPUs par hardware-accelerated CRC32 aur AES-NI instructions fast hash computation ke liye use hote hain; Intel's Data Direct I/O feature isko leverage karke network packet classification ko line-rate par le aata hai.

Semiconductor design verification tools (Synopsys VCS, Cadence Xcelium) deterministic hashing ka use karte hain signal-name-to-pointer mapping ke liye, jisse billion-gate designs mein regression runs identical results dete hain.

Blockchain nodes (Bitcoin Core, Ethereum geth) fast non-cryptographic hash functions (SipHash-2-4) use karte hain transaction mempool lookup ke liye taaki 10,000+ tx/s handle kar sakein bina CPU bottleneck ke.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Array indexing       | Hash output ko direct bucket address mein convert karne ke liye |
| Modulo operation     | Uniform distribution ko fixed-size table par map karne ke liye |
| Probability basics   | Uniformity ko mathematically define karne ke liye         |
| Worst-case vs average-case analysis | Kyunki deterministic + uniform dono average-case O(1) guarantee dete hain |

Agar modulo aur probability distributions abhi clear nahi hain to pehle woh padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Determinism from functional definition
Ek function deterministic tabhi hota hai jab woh pure function ho — koi hidden state ya random number generator use na kare.  
Example: `h("hello")` agar aaj 0x7f3a2b1c deta hai to kal bhi wahi dena chahiye.  
Formal statement:  
$$ \forall x \in U, \forall t_1, t_2 \in T : h(x, t_1) = h(x, t_2) $$  
> [!WARNING]
> Agar time ya thread-ID jaise external factors leak ho gaye to reproducibility toot jayegi aur debugging nightmare ban jayega.

### Step 2 — Uniformity as equal probability over range
Uniformity ka matlab har possible output value ka probability exactly 1/|R| hona chahiye jahaan R hash function ka range hai.  
Example: 32-bit hash table ke liye har bucket ka expected load n/2^32 hona chahiye.  
Formal statement:  
$$ \forall y \in R, P(h(x) = y) = \frac{1}{|R|} $$  
> [!WARNING]
> Agar distribution biased hai (jaise sirf even numbers) to kuch buckets overflow ho jayenge aur lookup time O(n) ban jayega.

### Step 3 — Speed as bounded instruction count
Fast ka matlab computation ka time input length ke saath linear ya constant hona chahiye, ideally O(1) ya O(len(x)) with small constant.  
Example: MurmurHash3 8-byte key ko 4-5 CPU cycles mein process karta hai.  
Formal statement:  
$$ T(h(x)) \leq c \cdot |x| \quad \text{where } c \text{ is small constant} $$  
> [!WARNING]
> Agar hash function andar cryptographic rounds laga deta hai (SHA-256) to speed requirement violate ho jayegi.

### Step 4 — Independence between determinism and uniformity
Deterministic hone se uniformity automatically nahi aati; dono alag-alag design choices hain.  
Example: Identity function deterministic hai lekin uniform nahi jab keys clustered hon.  
Formal statement: Determinism ek property of the mapping function hai; uniformity ek property of the output distribution hai.

### Step 5 — Interaction with table size via modulo
Final bucket index usually `hash_value % m` se banta hai. Uniformity tabhi preserve hoti hai jab m aur hash range ke beech koi common factor na ho.  
Formal statement:  
$$ \text{if } \gcd(h(x), m) = 1 \text{ for most } x \text{ then distribution remains uniform} $$

### Step 6 — Textbook-grade combined requirement
Ek achha hash function ek mapping \( h: U \to \{0,1\}^w \) hai jo deterministic, \( \epsilon \)-almost universal, aur \( O(|x|) \) time mein computable ho.

## 5. Worked examples — har step show karo

**Example 1 — Determinism check**  
*Given:* Function \( h(x) = (x \cdot 31) \bmod 2^{32} \)  
*Find:* h(42) dono baar same hai ya nahi.  
Step 1: 42 × 31 = 1302.  
Step 2: 1302 mod 4294967296 = 1302.  
Step 3: Dobara calculate karo → wahi 1302.  
*Why:* Multiplication aur modulo dono pure operations hain.  
**Final answer**  
1302  
*Reflection:* Simple arithmetic function determinism ko easily satisfy karti hai.

**Example 2 — Uniformity test on small range**  
*Given:* Keys 1, 2, 3, 4 aur hash table size 4.  
*Find:* Distribution after h(x) = (x × 2654435761) mod 4.  
Step 1: 1 × 2654435761 = 2654435761 → 1 mod 4.  
Step 2: 2 → 2, 3 → 3, 4 → 0.  
Step 3: Outputs {1,2,3,0} — perfectly uniform.  
*Why:* Prime multiplier ne bias ko tod diya.  
**Final answer**  
{0,1,2,3} each once  
*Reflection:* Small table par bhi multiplier choice uniformity affect karti hai.

**Example 3 — Speed measurement**  
*Given:* 10 million 8-byte keys.  
*Find:* Time taken by MurmurHash3 vs SHA-256.  
Step 1: MurmurHash3 measured 0.12 s.  
Step 2: SHA-256 measured 4.8 s.  
Step 3: Ratio ≈ 40× slower.  
*Why:* Cryptographic rounds extra CPU cycles lete hain.  
**Final answer**  
MurmurHash3 satisfies speed; SHA-256 does not.  
*Reflection:* Production hash tables non-cryptographic fast hashes use karti hain.

**Example 4 — Combined failure case**  
*Given:* Bad hash h(x) = x mod 1000 (non-uniform when keys are multiples of 1000).  
*Find:* Load on bucket 0 with 10,000 keys.  
Step 1: All keys 1000,2000,...10000000 map to 0.  
Step 2: Bucket 0 has 10,000 entries.  
Step 3: Lookup becomes O(n) in worst case.  
*Why:* Deterministic to hai lekin uniform nahi.  
**Final answer**  
Worst-case lookup O(n)  
*Reflection:* Sirf determinism kaafi nahi; uniformity bhi zaroori hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using time-dependent hash   | Developer adds random seed for “security”   | Never use rand() or time inside hash         |
| Ignoring modulo bias        | Table size not coprime with multiplier      | Choose prime table sizes or use power-of-two with good mixer |
| Cryptographic hash for tables | Copy-paste from security code               | Always pick SipHash/Murmur/FNV for hash tables |
| Assuming 32-bit is enough   | Modern datasets > 2^32 entries              | Use 64-bit or 128-bit hashes                 |
| Not testing uniformity      | Visual inspection of few keys               | Run chi-square or collision-count tests      |
| Re-using same hash for crypto and tables | Single function everywhere                  | Separate concerns: fast hash vs cryptographic hash |
| Forgetting string length    | Hash only first few characters              | Always include full length in computation    |

## 7. The textbook-precise statement
A hash function \( h \) for a hash table is a deterministic mapping \( h: U \to \{0, \dots, 2^w-1\} \) such that (1) \( h(x) \) depends only on \( x \), (2) for any distinct keys \( x_i, x_j \) the values \( h(x_i) \) and \( h(x_j) \) are uniformly distributed over the codomain when averaged over all possible key sets, and (3) \( h \) can be evaluated in time linear in the length of \( x \). (Cormen et al., *Introduction to Algorithms*, 4e, Chapter 11, Section 11.2)

## 8. Visual — diagram or schematic
```
Key space U (arbitrary)          Hash function h          Output range R
+-------------------+            +-------------+          +-------------+
|  "apple"          |  ----->    | deterministic | -----> | 0x3f8a2c1b  |
|  "banana"         |            | uniform       |        | 0x7e1b9d4f  |
|  12345            |            | O(len) fast   |        | 0x1a2b3c4d  |
+-------------------+            +-------------+          +-------------+
                                                          |
                                                          v
                                                 Bucket index = h % m
```

## 9. The memory technique
**The hook** — Socho ek hash function ek “magic postbox” hai jo har letter ko ek fixed, evenly-spread aur turant-result wale slot mein daal deta hai bina kabhi mood badle.

**What to overlearn**  
- Deterministic: same input → same output (always)  
- Uniform: P(output = y) = 1/|R| for every y  
- Fast: time ≤ c·|x| with tiny c

**Spaced-repetition schedule** — Review properties at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — Agar definition bhool jaaye to socho: “Agar main ek hi key do baar daalu to bucket alag to nahi hoga? Agar distribution uneven hai to ek bucket kyun bhar raha hai? Aur agar yeh 100 million keys par slow hai to production mein kaise chalega?”

## 10. What this unlocks
Yeh teen properties agle DSA topics ke liye foundation hain.  
- Collision resolution techniques (chaining, open addressing)  
- Universal hashing families  
- Consistent hashing in distributed systems  
- Bloom filters aur Count-Min sketches  
- Hash-based sets aur maps in every standard library

## 11. Self-check — five questions, no answers
1. Ek hash function deterministic nahi hai to kaunsa data-structure invariant tootega?  
2. 10,000 keys aur table size 1024 par uniformity kaise empirically verify karoge?  
3. Kyun MurmurHash3 production hash tables mein SHA-256 se behtar hai?  
4. Agar multiplier aur table size ka gcd > 1 ho to distribution kis tarah biased ho jayegi?  
5. Ek string hash function jo sirf pehle 4 characters dekhta hai, kaunsi property violate karta hai jab keys “aaaa1”, “aaaa2”, … hain?