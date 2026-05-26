## 1. The one-sentence answer
**Radix sort ek non-comparative stable sorting algorithm hai jo integers ko unke digits ke basis par bucket sort (usually counting sort) ke through O(d(n+k)) time mein sort karta hai, jahaan d digits ki count hai aur k digit ka maximum range.**

Iska core idea yeh hai ki aap har digit position ko alag-alag pass mein process karte ho bina elements ko directly compare kiye. LSD approach rightmost digit se shuru karti hai aur left ki taraf badhti hai, jabki MSD leftmost se shuru hoti hai. Dono cases mein har pass counting sort ka use karta hai taaki stability bani rahe.

Yeh tabhi efficient hota hai jab d chhota ho relative to n, matlab numbers ke digits ki sankhya limited ho. Agar numbers bahut bade hain to d badh jaata hai aur complexity linear nahi rehti.

> [!NOTE]
> Sabse badi aha yeh hai ki comparison-based lower bound Ω(n log n) ko bypass karna possible hai jab input restricted domain (jaise fixed-length integers) mein aata hai, kyunki radix sort elements ko compare nahi karta balki unke representation ko exploit karta hai.

## 2. Why this matters — concrete and current
In semiconductor manufacturing, Intel aur TSMC radix sort ka variant use karte hain mask alignment data aur wafer defect coordinates ko sort karne ke liye jab billions of points ko process karna hota hai; yeh step photolithography pipeline mein real-time hota hai aur O(d(n+k)) speed critical hai kyunki d typically 6-8 hota hai coordinate values ke liye.

Google’s BigQuery aur Spanner jaise distributed databases LSD radix sort implement karte hain internal shuffle aur sort phases mein jab columnar data ko numeric keys par reorder karna hota hai, kyunki yeh quicksort se better cache locality deta hai fixed-width integers par.

Aerospace trajectory planning mein NASA JPL ke Monte Carlo simulations radix sort MSD variant ka use karti hain jab millions of particle positions ko high-dimensional keys (position + velocity) par sort karna hota hai; MSD early termination allow karti hai jab prefixes already distinct ho jaayein.

Modern GPU radix sort implementations (NVIDIA CUB library) machine learning training pipelines mein gradient histograms sort karne ke liye use hote hain, jaise PyTorch ke sparse embedding updates mein, jahaan d = 4 (float32 keys) aur k = 256 hota hai warps ke liye.

## 3. Mental prerequisites

| Concept              | Why you need it here |
|----------------------|----------------------|
| Counting sort        | Radix sort ka har digit pass counting sort ko subroutine ke roop mein call karta hai; bina iske O(n+k) digit bucketing nahi banega. |
| Stable sort          | Har pass ke baad relative order preserve hona zaroori hai taaki previous digits ka result next pass mein sahi rahe. |
| Digit extraction     | Numbers ko base-b representation mein todna (modulo aur division) samajhna padega taaki LSD/MSD alag kiya ja sake. |
| Big-O with parameters| Complexity O(d(n+k)) ko samajhne ke liye d aur k ko independent parameters ke roop mein dekhna zaroori hai. |

Agar counting sort aur stability clear nahi hain to pehle unhe padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Represent numbers as digit sequences
Har integer ko ek fixed-length digit array mein socho jahaan har position ek radix (base) ke hisaab se value rakhti hai.  
Example: 802 ko base-10 mein [8,0,2] ke roop mein dekho.  
Formal statement:  
$$x = \sum_{i=0}^{d-1} digit_i \cdot b^i$$  
> [!WARNING]
> Agar length fix nahi ki (leading zeros pad karke) to MSD pass galat buckets mein daal sakta hai.

### Step 2 — Process one digit position at a time using stable bucketing
Ek digit position choose karo aur us position ke values (0 se b-1) ke hisaab se elements ko buckets mein daalo using counting sort.  
Example: numbers [170,45,75,90] ke units digit par bucketing karne se order [170,90,45,75] ban jaata hai.  
Formal: Har pass ke liye counting sort O(n+k) time leta hai jahaan k = b.

### Step 3 — LSD direction: least to most significant
Rightmost digit se shuru karo aur left ki taraf move karo; har pass previous ordering ko preserve karta hai kyunki counting sort stable hai.  
Example: 802, 24, 2, 66 ko LSD se sort karne par pehle units, phir tens, phir hundreds process hote hain.  
Formal invariant: i-th pass ke baad last i digits sorted hote hain.

### Step 4 — MSD direction: most to least significant with recursion
Leftmost digit se shuru karo; ek bucket ke andar recursively MSD apply karo.  
Example: 170, 45, 75, 90 mein MSD (hundreds) par 0-bucket aur 1-bucket bante hain, phir 0-bucket ko recursively sort karo.  
Formal: MSD early termination allow karta hai jab ek bucket mein sirf ek element bache.

### Step 5 — Complexity derivation
d passes, har pass O(n+k), total O(d(n+k)).  
$$T(n,d,k) = d \cdot (c_1 n + c_2 k)$$  
Jahaan k usually 10 (decimal) ya 256 (bytes) hota hai.

### Step 6 — When LSD vs MSD choose karna hai
LSD tab better jab d chhota aur numbers fixed length ke hon; MSD tab jab variable length ho aur early pruning possible ho.

## 5. Worked examples — har step show karo

**Example 1 — Basic LSD on 3-digit numbers**  
*Given:* [170, 45, 75, 90, 802, 24, 2, 66]  
*Find:* Sorted order using LSD radix sort (base 10).  
Pass 1 (units): counting sort yields [170,90,2,802,24,45,75,66].  
*Why:* Units digit 0,0,2,2,4,5,5,6 ke hisaab se stable placement.  
Pass 2 (tens): [2,24,45,66,70,75,90,802].  
*Why:* Previous order preserve karke tens digits par bucketing.  
Pass 3 (hundreds): [2,24,45,66,75,90,170,802].  
**Final sorted array: [2, 24, 45, 66, 75, 90, 170, 802]**  
*Reflection:* Yeh example isliye simple thi kyunki d=3 fixed tha; generalisation yeh hai ki har pass sirf O(n+10) leta hai.

**Example 2 — MSD on same input**  
*Given:* Same array.  
*Find:* MSD order.  
First pass (hundreds digit): 0-bucket [45,75,90,24,2,66], 1-bucket [170], 8-bucket [802].  
*Why:* MSD leftmost digit dekhta hai.  
Recurse on 0-bucket (tens digit): yields [2,24,45,66,75,90].  
**Final sorted array: [2, 24, 45, 66, 75, 90, 170, 802]**  
*Reflection:* MSD ne 1-bucket aur 8-bucket ko recurse nahi kiya kyunki single element the, jo early exit dikhata hai.

**Example 3 — LSD with leading-zero padding**  
*Given:* [7, 23, 105] (treat as 3 digits).  
*Find:* Order after LSD.  
Pass 1 units: [105,23,7] → [105,23,7].  
Pass 2 tens: [105,7,23].  
Pass 3 hundreds: [7,23,105].  
**Final: [7, 23, 105]**  
*Reflection:* Padding ne MSD aur LSD ko consistent banaya; bina padding ke MSD galat ho sakta tha.

**Example 4 — Edge case single digit**  
*Given:* [5, 3, 9, 1]  
*Find:* LSD (d=1).  
Single counting sort pass: [1,3,5,9].  
**Final: [1, 3, 5, 9]**  
*Reflection:* Jab d=1 radix sort counting sort ban jaata hai, jo boundary case dikhata hai.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting stability | Students counting sort ke jagah unstable sort use karte hain | Har digit pass mein explicitly stable counting sort implement karo |
| Variable length numbers | MSD bucket mein length mismatch | Pehle sab numbers ko maximum d digits tak pad karo |
| k ko bada lena | k=10^9 le liya to O(n+k) kharab ho jaata hai | k hamesha digit range (0-9 ya 0-255) rakho |
| LSD par early exit sochna | MSD mein possible hai lekin LSD mein nahi | LSD ke liye hamesha d full passes lagao |
| Negative numbers | Digit extraction negative par fail | Pehle negative numbers ko offset karke positive banao |
| Base-1 ya base-0 galti | b=1 meaningless hai | Base hamesha ≥2 rakho |

## 7. The textbook-precise statement
Radix sort is defined in Cormen et al., *Introduction to Algorithms*, 4e, Chapter 8.3: given n d-digit numbers in base b where each digit lies in {0,…,b−1}, the algorithm produces a sorted output in Θ(d(n+b)) time using Θ(n+b) auxiliary space by performing d passes of a stable sort (counting sort) on successive digit positions. LSD processes positions from 0 to d−1; MSD processes from d−1 to 0 with recursion on each bucket. The algorithm is correct because after the i-th pass the last i digits of every element are in sorted order (inductive invariant).

## 8. Visual — diagram or schematic
```
Input:  [170, 45, 75, 90, 802, 24, 2, 66]
           ↓ LSD Pass 1 (units)
Buckets: 0:[170,90] 1:[] 2:[802,2] 3:[] 4:[24] 5:[45,75] 6:[66] ...
Output: [170, 90, 802, 2, 24, 45, 75, 66]
           ↓ Pass 2 (tens)
Buckets: 0:[2] 2:[24] 4:[45] 6:[66] 7:[70] 7:[75] 9:[90] 0:[802]
Output: [2, 24, 45, 66, 70, 75, 90, 802]
```

## 9. The memory technique
1. **The hook** — Imagine numbers as trains with d coaches; LSD cleans from the last coach forward, MSD from the engine backward, each coach using the same stable bucket station.
2. **What to overlearn** — O(d(n+k)) with k = base, stability invariant after every pass, and that LSD always runs exactly d passes.
3. **Spaced-repetition schedule** — Review algorithm steps after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Agar formula bhool jaaye to counting sort ka O(n+k) step yaad karo aur usko d baar multiply kar do.

## 10. What this unlocks
Radix sort samajhne ke baad aap string sorting (MSD radix on characters), suffix array construction, aur parallel GPU sorting kernels ko samajh sakte ho.

- Bucket sort generalisation
- Counting sort as primitive
- Cache-oblivious sorting variants
- External memory sorting (when d large)

## 11. Self-check — five questions, no answers
1. Ek 5-digit number array par LSD radix sort ke liye exactly kitne counting sort calls lagenge?
2. MSD radix sort kab LSD se asymptotically better ho sakta hai?
3. Agar base b = n ho to complexity kya ban jaati hai?
4. Negative integers ke liye LSD implementation mein pehla extra step kya hoga?
5. Kyun MSD implementation recursion depth d tak ja sakti hai lekin LSD nahi?