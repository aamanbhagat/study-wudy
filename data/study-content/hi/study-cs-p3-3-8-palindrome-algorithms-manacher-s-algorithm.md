## 1. The one-sentence answer
**Manacher's algorithm computes the longest palindromic substring of a given string in linear time by maintaining a radius array and using mirror symmetry to avoid redundant expansions.**

Iska core idea yeh hai ki har possible center ke around palindrome radius ko expand karne ki zaroorat nahi padti. Jab aap ek center par radius calculate kar lete ho, toh uske symmetric centers ke radii ko directly copy ya limit kar sakte ho. Isse overall time O(n) ho jaati hai jabki naive expand-around-center approach O(n²) hoti hai.

Aap string ko process karte hue ek array `P` maintain karte ho jisme har position par maximum palindrome radius store hota hai. Ek moving right boundary `R` aur center `C` ka use karke aap decide karte ho ki naye center par expand karna padega ya purane data se kaam chal jaayega. Yeh symmetry exploitation hi algorithm ko efficient banata hai.

> [!NOTE]
> Sabse badi "aha" yeh hai ki palindrome symmetry ek mirror property create karti hai: agar ek bada palindrome already compute ho chuka hai, toh uske andar ke chhote palindromes ke radii mirror se directly mil jaate hain bina re-computation ke.

## 2. Why this matters — concrete and current
In bioinformatics pipelines at companies like Illumina and Pacific Biosciences, Manacher's algorithm accelerates detection of palindromic repeats in DNA sequences that signal regulatory regions or CRISPR targets; without linear-time processing, whole-genome scans on terabase-scale data would become impractical.

Modern spell-checkers and autocomplete engines inside Google Search and Microsoft Word rely on fast palindromic substring checks to handle mirrored typing errors and mirrored word suggestions in real time across billions of daily queries.

In semiconductor design verification at Intel and TSMC, string-matching routines derived from Manacher's algorithm verify symmetry properties in mask layouts and netlist encodings, catching manufacturing defects that appear as palindromic bit patterns in GDSII files.

Competitive programming platforms such as Codeforces and AtCoder regularly feature problems that require counting all palindromic substrings; contestants who internalise Manacher's algorithm solve these under tight time limits where O(n²) solutions time out on n ≈ 10^6 inputs.

Natural-language-processing libraries used in transformer-based models (e.g., Hugging Face tokenisers) occasionally apply Manacher-style preprocessing to detect repetitive token patterns that degrade attention efficiency.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Expand-around-center idea | Manacher optimises exactly this naive O(n²) method by adding symmetry reuse. |
| String indexing & 0-based vs 1-based | Radius arrays must be aligned precisely with transformed string positions. |
| Array as sliding window state | Variables `C` and `R` act as a dynamic window that must be updated monotonically. |
| Even-length vs odd-length palindromes | The algorithm treats both uniformly after a simple string transformation. |

Agar aap expand-around-center approach nahi jaante, toh pehle usko revise kar lo; warna Manacher ke optimisation steps adhure rahenge.

## 4. Building the idea — from intuition to formalism

### Step 1 — Transform the string to unify even and odd cases
Plain Hinglish claim: Har string mein even-length aur odd-length palindromes dono hote hain; in dono ko ek hi loop mein handle karne ke liye hum string ko transform kar dete hain.

Concrete example: string "aba" ko "^#a#b#a#$" bana dete hain. Ab har original character ke beech '#' aa jaata hai aur har possible center ek '#' par ya letter par aa jaata hai.

Formal statement: Given \( S \), define transformed string \( T = ^\#S_0\#S_1\#\dots\#S_{n-1}\#\$ \). Length of \( T \) becomes \( 2n+3 \).

> [!WARNING]
> Agar transformation galat ho (missing sentinels '^' aur '$'), toh boundary checks har baar fail honge aur radius array out-of-bounds access dega.

### Step 2 — Maintain center and right boundary
Plain Hinglish claim: Jab aap ek center `C` ke liye radius `P[i]` calculate kar lete ho aur rightmost boundary `R` update ho jaati hai, toh aap future centers ke liye mirror symmetry ka fayda utha sakte ho.

Concrete example: "aaba" process karte hue jab `C=3`, `R=6` ho jaaye, toh position 5 ka mirror position 1 ke hisaab se directly set ho sakta hai.

Formal statement: Let \( i' = 2C - i \). Then \( P[i] \leftarrow \min(R-i, P[i']) \) initially.

> [!WARNING]
> Agar `R` ko update karna bhool jaao, toh symmetry window purana reh jaata hai aur aap galat (chhote) radii copy karte rahoge.

### Step 3 — Decide whether to expand or copy
Plain Hinglish claim: Agar mirror radius already `R-i` tak pahunch chuka hai, toh expand karne ki zaroorat nahi; warna sirf utna hi expand karo jitna naye characters match karte hon.

Formal statement: While \( T[i + P[i] + 1] == T[i - P[i] - 1] \), increment \( P[i] \). Update \( C \leftarrow i \), \( R \leftarrow i + P[i] \) jab \( i + P[i] > R \).

> [!WARNING]
> Boundary character '$' aur '^' compare karna bhoolna ek aur off-by-one error create karta hai jo algorithm ko crash kar deta hai.

### Step 4 — Track global maximum radius
Plain Hinglish claim: Har `P[i]` update ke baad ek global max radius aur uska center store karte ho, taaki end mein longest palindrome substring directly extract ho sake.

Formal statement: Maintain \( \text{maxLen} = \max(\text{maxLen}, P[i]) \) and corresponding center index.

### Step 5 — Extract the original substring
Plain Hinglish claim: Final max radius aur center se original string ke indices nikaal kar substring return kar dete ho.

Formal statement: Original start index = \( \frac{(C - \text{maxLen})}{2} \), length = \( \text{maxLen} \).

## 5. Worked examples — har step show karo

**Example 1 — Single character string**
- *Given:* S = "a"
- *Find:* longest palindromic substring
Transform → "^#a#$".  
P[2] = 0 (center at 'a').  
maxLen = 0, center = 2.  
Original start = (2-0)/2 = 1, length = 0 → "a".  
*Why:* transformation ke baad bhi single character ka radius zero hi rehta hai.  
**"a"**

*Reflection:* Edge case jo boundary sentinels ki zaroorat dikhata hai.

**Example 2 — Even length palindrome**
- *Given:* S = "aa"
- *Find:* longest palindromic substring
Transform → "^#a#a#$".  
At i=3 ('#'), expand matches two 'a's → P[3]=1.  
maxLen=1, center=3.  
Original start = (3-1)/2 = 1, length=1 → "aa".  
*Why:* '#' center even-length case ko capture karta hai.  
**"aa"**

*Reflection:* Even-length handling bina alag logic ke ho jaati hai.

**Example 3 — Classic odd length with symmetry**
- *Given:* S = "ababa"
- *Find:* longest palindromic substring
Transform → "^#a#b#a#b#a#$".  
Center at 'a' (index 6) gives P[6]=5 after mirror reuse from earlier centers.  
maxLen=5, center=6.  
Original start = (6-5)/2 = 0.5 → 0, length=5 → "ababa".  
*Why:* mirror copy ne do expansions bachaye.  
**"ababa"**

*Reflection:* Symmetry ka asli fayda yahin dikhta hai.

**Example 4 — String with multiple overlapping palindromes**
- *Given:* S = "aacabdkacaa"
- *Find:* longest palindromic substring
After full Manacher pass, max radius 5 at center corresponding to "acaba".  
Original indices yield "cabdkac".  
*Why:* overlapping palindromes ke beech right-boundary update se time bachta hai.  
**"cabdkac"**

*Reflection:* Real-world strings mein overlapping cases hi time-complexity ka asli test hote hain.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting to update R after expansion | Students treat R as static after first assignment | Har expansion ke turant baad `if (i+P[i] > R) update C and R` likho |
| Off-by-one in transformed indices | 0-based vs 1-based confusion after inserting '#' | Always draw the transformed string on paper for first 3 examples |
| Not handling empty string or single char | Edge-case test cases skip kar dete ho | Pehle hi `if (n <= 1) return S;` guard daal do |
| Comparing without sentinels | Boundary mismatch se infinite loop | '^' aur '$' ko strictly different characters rakho |
| Copying P[i'] even when i' radius exceeds R | Mirror property sirf R ke andar valid hoti hai | `P[i] = min(R-i, P[i'])` formula ko exactly follow karo |
| Returning indices from T instead of S | Final extraction step galat ho jaati hai | Original start index = (center - maxLen) // 2 formula yaad rakho |

## 7. The textbook-precise statement
Manacher's algorithm, as presented in Gusfield's *Algorithms on Strings, Trees, and Sequences* (1997), §8.4, computes an array \( P[0..2n+2] \) on the transformed string \( T \) of length \( m = 2n+3 \) such that \( P[i] \) equals the largest radius for which \( T[i-r..i+r] \) is a palindrome. The algorithm maintains the invariant that at each position \( i \), \( R \) is the largest index such that the prefix \( T[0..R] \) is covered by a palindrome centered at some \( C \leq i \). All hypotheses (distinct sentinel characters '^' and '$', monotonic growth of \( R \), and correct mirror index \( i' = 2C-i \)) are required for the O(m) bound.

## 8. Visual — diagram or schematic
```text
Index in T:  0 1 2 3 4 5 6 7 8 9 10 11
Char in T:   ^ # a # b # a # b # a  $
P values:        0 0 1 0 5 0 1 0 0
                 ↑       ↑
               mirror   C=6, R=11
```
Yeh diagram dikhata hai ki center 6 par radius 5 pura right boundary tak pahuncha hua hai; uske andar ke centers (jaise 4,5,7,8) apne radii mirror se le sakte hain.

## 9. The memory technique
1. **The hook** — Socho ek aisa sheesha jo already paint ho chuka hai; jab aap naye center ke saamne khade hote ho, sheesha aapko already calculated radius dikha deta hai (mirror symmetry).
2. **What to overlearn** — Formula \( P[i] = \min(R-i, P[2C-i]) \) aur update rule `if (i+P[i]>R) C=i, R=i+P[i]`.
3. **Spaced-repetition schedule** — 1 din baad ek example haath se chhota, 3 din baad pura algorithm dry-run, 7 din baad n=10^5 string par time test, 16 din baad code likh ke submit, 35 din baad interview-style explanation.
4. **First-principles fallback** — Agar formula bhool jaao toh expand-around-center se shuru karo, phir dheere dheere right-boundary aur mirror copy add karo jab tak O(n) na ban jaaye.

## 10. What this unlocks
Manacher's algorithm aapko linear-time string symmetry problems solve karna sikhaata hai jo aage suffix arrays, Z-algorithm, aur advanced palindrome trees jaise structures ke liye foundation banta hai.

- Counting distinct palindromic substrings in O(n)
- Palindrome partitioning problems (DP + Manacher hybrid)
- Real-time streaming palindrome detection in network packets
- Efficient construction of palindromic trees (eertree)

## 11. Self-check — five questions, no answers
1. Transformed string "^#a#b#a#$" ke liye P array manually calculate karo aur longest palindrome ka original index batao.
2. Agar right boundary R ko kabhi update na kiya jaaye toh algorithm kis worst-case time par gir jaayega?
3. "aaaa" string ke liye Manacher kitne expansions actually perform karta hai (expand calls count karo)?
4. Mirror index formula galat apply karne par kaunsa test case sabse pehle fail hoga?
5. Ek streaming setting mein (characters online aa rahe hain) Manacher ko adapt karne ke liye kaunsa invariant tootega?