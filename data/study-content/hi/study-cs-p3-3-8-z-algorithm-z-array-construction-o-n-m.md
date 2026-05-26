## 1. The one-sentence answer
**The Z-algorithm builds the Z-array for a string S of length n in O(n) time, where Z[i] stores the longest prefix of S that matches the substring starting at index i.**

Iska core idea yeh hai ki har position par prefix match length calculate karte waqt previous matches ka reuse kiya jaaye, bina har baar shuru se compare kiye. Ek single left-to-right pass mein window maintain karke yeh possible hota hai. Jab pattern matching ke liye use karna ho to pattern aur text ko separator ke saath concatenate karke total O(n+m) time milta hai.

> [!NOTE]
> Sabse badi "aha" yeh hai ki Z-array ek hi linear scan mein poora string matching information capture kar leti hai — koi extra data structure ya multiple passes ki zarurat nahi padti.

## 2. Why this matters — concrete and current
Google’s internal document indexing pipelines Z-algorithm variants ko repeated phrase detection ke liye use karte hain jab naya content crawl hota hai, kyunki yeh KMP se simple aur cache-friendly hota hai.

Bioinformatics tools jaise BLAST ke early filtering stages mein short DNA reads ko reference genome se match karne ke liye Z-array construction ko employ kiya jaata hai taaki O(n+m) guarantee mile.

Modern plagiarism detection services (Turnitin jaise) multiple documents ke beech common substrings nikaalte waqt Z-algorithm ko ek building block ke roop mein lagate hain kyunki yeh separator-based concatenation par turant kaam karta hai.

Semiconductor design verification software mein RTL code ke repeated module patterns dhundhne ke liye string matching ka yeh linear-time variant run kiya jaata hai, jahaan millions of lines of Verilog/VHDL scan karna padta hai.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| 0-based string indexing | Z-array indices directly map to string positions          |
| Prefix vs substring comparison | Core definition of Z[i] relies on exact prefix matching   |
| Sliding window invariants | Z-algorithm ka O(n) proof is window [l,r] par depend karta hai |
| Sentinel/separator character | Pattern matching ke liye concatenation mein galti rokta hai |

Agar upar ke koi bhi concept weak hain to pehle unhe revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Naive prefix matching
Naive tareeke se har index i par S[i..] ko S[0..] se compare karte jaao aur match length note karo. Yeh O(n²) time leta hai kyunki har position par worst-case n comparisons ho sakte hain.

Example: S = "aaa" ke liye i=1 aur i=2 dono par 2 aur 1 matches milenge, lekin har baar dobara compare karna padta hai.

Formal statement:  
$$Z[i] = \max\{k \mid S[0..k-1] = S[i..i+k-1]\}$$

> [!WARNING]
> Agar yeh step galat samajh aaye to aap sochenge ki har position independent hai, jabki asal mein overlapping information exist karti hai.

### Step 2 — The active window [l,r]
Maintain current rightmost matched segment [l,r] jahaan r sabse badi index hai jahaan tak prefix match chala hai. Jab naya i is window ke andar aata hai to previous Z values se direct copy kar sakte hain.

Example: S = "aabaab" mein jab i=3 par pahunchte hain to [l,r] = [0,2] already set hota hai, isliye Z[3] = 3 directly mil jaata hai.

Formal: r = max {j | koi previous match [l,j] cover karta hai}.

### Step 3 — Explicit vs implicit computation
Agar i > r hai to explicit comparison shuru karo aur naya window set karo. Agar i ≤ r hai to Z[i] = min(Z[i-l], r-i+1) se shuru karo aur agar zarurat pade to explicit extend karo.

Example: S = "ababax" mein i=4 par window andar hone ke bawajood extra character check karna padta hai.

### Step 4 — Window update rule
Har explicit match ke baad agar current r se aage naya match mila to l = i aur r = i + Z[i] - 1 set kar do. Yeh invariant maintain karta hai ki [l,r] hamesha rightmost hota hai.

Formal update:  
$$l \leftarrow i,\quad r \leftarrow i+Z[i]-1 \quad\text{when } i+Z[i]-1 > r$$

### Step 5 — Linear time guarantee
Har character exactly ek baar explicit compare hota hai (r sirf badhta hai) aur har implicit copy O(1) hai, isliye total comparisons O(n) hote hain. Pattern matching ke liye concatenation ke baad O(n+m) milta hai.

Textbook-grade statement tak pahunch gaye: Z-array construction ek single pass mein O(n) comparisons ke saath poori information deta hai.

## 5. Worked examples — har step show karo

**Example 1 — Small repeating string**
*Given:* S = "aabcaabcaa"  
*Find:* Full Z-array.  
i=0 par Z[0]=0 (by definition).  
i=1: 'a' != 'a' wait, actually first char match nahi, Z[1]=1? No: S[1..]="abcaabcaa" vs prefix "a..." → 1 char match.  
i=2: no match → Z[2]=0.  
i=3: 'c' mismatch → Z[3]=0.  
i=4: "aabcaa" matches first 3 chars "aab" → Z[4]=3.  
i=7: remaining "aa" matches prefix → Z[7]=2.  
**Z = [0,1,0,0,3,1,0,0,2,1]**  
*Why* each step: explicit comparison tabhi jab i > r.

**Example 2 — All identical characters**
*Given:* S = "aaaaa"  
*Find:* Z-array.  
i=1: 4 matches, [l,r] update to [1,4].  
i=2: already inside, Z[2]=3 (min previous).  
i=3: Z[3]=2.  
i=4: Z[4]=1.  
**Z = [0,4,3,2,1]**  
*Reflection:* Window update ne pura O(n) save kiya.

**Example 3 — Pattern search (O(n+m))**
*Given:* pattern P="aab", text T="baabaab"  
*Find:* occurrences.  
Concat = "aab#baabaab", Z-array compute karo.  
Z values at positions after # jo 3 hain wahi matches hain.  
**Matches at text indices 3 and 4 (0-based).**

**Example 4 — Edge with sentinel**
*Given:* P="abc", T="abxabcd"  
Concat = "abc$abxabcd".  
Z[4]=3 milta hai → match at position 4.  
**Final answer: single match reported in O(10) time.**

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                          | How to avoid it                              |
|-----------------------------|-----------------------------------------|----------------------------------------------|
| Forgetting Z[0]=0           | Definition slip                         | Always hard-code index 0 as 0                |
| Wrong window update         | r ko update karna bhool jaana           | Har explicit match ke baad check i+Z[i]-1>r  |
| No separator in matching    | Pattern overlap ho jaata hai            | Always insert unique char not in alphabet    |
| Off-by-one in min()         | r-i+1 galat calculate                   | r-i+1 likhne se pehle indices double-check   |
| Assuming O(1) space extra   | Window variables ko count nahi karte    | Sirf 3 integers (l,r,i) kaafi hain           |
| Early termination           | Jab Z[i] already r tak pahunch jaaye    | Explicit loop tab tak chalao jab match ho    |

## 7. The textbook-precise statement
Let S be a string of length n over alphabet Σ. The Z-array of S is the array Z[0..n-1] such that Z[0] := 0 and for 1 ≤ i < n, Z[i] is the largest integer k such that S[0..k-1] = S[i..i+k-1] and i+k-1 < n. There exists an algorithm that computes Z in at most 2n-1 character comparisons (Gusfield, *Algorithms on Strings, Trees, and Sequences*, 1997, §1.4).

## 8. Visual — diagram or schematic
```
Index: 0 1 2 3 4 5 6 7
S    : a a b a a b a a
Z    : 0 1 0 4 1 0 2 1
Window at i=3: [l=3,r=6]  <-- Z[3]=4 covers up to index 6
```

## 9. The memory technique
**The hook:** Imagine ek "Z-box" jo rightward slide karta hai aur purane matches ko photocopy karke aage paste karta rehta hai.

**What to overlearn:**  
- Z[0] hamesha 0  
- r sirf badhta hai (never decreases)  
- Total comparisons ≤ 2n-1

**Spaced-repetition schedule:** 1 din, 3 din, 7 din, 16 din, 35 din.

**First-principles fallback:** Agar formula bhool jaaye to wapas Step 2 ke window invariant se shuru karo: "agar i > r to explicit, warna copy + extend".

## 10. What this unlocks
Z-algorithm ke baad aap efficiently implement kar sakte ho:
- KMP prefix table (border table) derivation
- Multiple pattern matching via Aho-Corasick preprocessing
- Longest repeated substring in O(n) using Z on S#S reversed variants
- Suffix array construction ke kuch linear-time steps

## 11. Self-check — five questions, no answers
1. Z-array of "abababa" kya hogi?
2. Agar separator galat choose kiya jaaye to kis case mein galat match report hoga?
3. Window [l,r] ka invariant precisely kya hai?
4. Ek string jismein Z-array construction exactly 2n-1 comparisons kare, woh kaunsi hai?
5. Pattern "aa" ko text "aaaaa" mein search karte waqt kitne explicit comparisons honge?