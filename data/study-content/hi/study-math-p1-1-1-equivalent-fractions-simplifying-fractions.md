## 1. The one-sentence answer
**Equivalent fractions** represent the exact same rational number even though their numerators and denominators differ; **simplifying a fraction** means rewriting it in lowest terms by dividing numerator and denominator by their greatest common divisor.

Iska matlab yeh hai ki 1/2 aur 2/4 dono ek hi value dikhate hain kyunki dono mein same quantity ko alag-alag tareeke se express kiya gaya hai. Jab aap kisi fraction ko multiply ya divide karte ho same non-zero number se, fraction ki value nahi badalti. Yeh property hi equivalent fractions ki buniyad hai aur isko samajhna baad ke saare fraction operations ke liye zaroori hai.

> [!NOTE]
> Sabse badi aha yeh hai ki fraction ka “size” sirf numerator aur denominator ke ratio par depend karta hai, unki absolute values par nahi; isliye dono ko ek hi number se scale karne se woh size wahi rehta hai.

## 2. Why this matters — concrete and current
In semiconductor mask design, Intel aur TSMC engineers scaling factors use karte hain jo fractions mein hote hain; equivalent fractions ensure ki layout dimensions exact same physical size represent karein jab mask ko different process nodes par shrink kiya jaaye.

NASA’s Mars Perseverance rover ke navigation algorithms mein probability calculations fractions ke through hote hain; simplifying fractions before floating-point conversion se rounding errors kam hote hain aur trajectory predictions reliable rehte hain.

Modern computer-graphics pipelines (DirectX, Vulkan) mein texture coordinates fractions ke roop mein store hote hain; equivalent-fraction reduction se mip-map sampling mein aliasing kam hoti hai aur memory bandwidth bach ti hai.

Stock-market order-matching engines jaise NYSE Arca mein share quantities fractional lots mein express kiye jaate hain; lowest-term fractions use karne se settlement calculations mein overflow aur precision loss avoid hota hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Meaning of numerator and denominator | Defines what a fraction actually represents               |
| Multiplication of integers | Core operation that creates equivalent fractions          |
| Division of integers and remainders | Needed to test divisibility when simplifying              |
| Notion of common factors (divisors) | Identifies what can be cancelled without changing value   |

Agar aapko multiplication tables ya simple divisibility rules yaad nahi hain, to pehle unhe solid kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Visual slices stay equal when scaled uniformly
Jab aap ek pizza ko do hisson mein kaat-te ho aur phir har hisse ko do-do hisson mein kaat-te ho, to aapke paas chaar hisse hain lekin har hissa pehle wale hisse ka aadha hi hai. Iska matlab 1/2 aur 2/4 visually same area cover karte hain.

**Example:** Ek rectangle ko vertically aadha kaato → left half = 1/2. Usi left half ko vertically do barabar hisson mein kaato → dono chhote hisse milkar phir bhi 1/2 hain, ab 2/4 ke roop mein.

$$ \frac{1}{2} = \frac{1 \times 2}{2 \times 2} = \frac{2}{4} $$

> [!WARNING]
> Agar aap sirf numerator badha do lekin denominator nahi, fraction ka size badal jaayega; scaling dono parts par ek saath honi chahiye.

### Step 2 — Cross-multiplication test for equivalence
Do fractions a/b aur c/d tabhi equivalent hain jab a×d = b×c. Yeh test directly multiplication se aata hai aur kisi bhi common multiplier ko dhundhne ki zaroorat nahi padti.

**Example:** Check whether 3/5 = 9/15. 3×15 = 45 aur 5×9 = 45, dono barabar, isliye equivalent.

$$ \frac{a}{b} = \frac{c}{d} \iff a d = b c \quad (b,d \neq 0) $$

> [!WARNING]
> Cross-multiplication galat direction mein ya zero denominator ke saath mat use karna; equality false ho jaayegi.

### Step 3 — Greatest common divisor (GCD) finds the largest possible cancellation
Simplifying ka matlab hai numerator aur denominator dono ko unke sabse bade common divisor se divide karna taaki fraction lowest terms mein aa jaaye.

**Example:** 12/18 ke liye GCD(12,18) = 6. Dono ko 6 se divide karo → 2/3.

$$ \frac{12}{18} = \frac{12 \div 6}{18 \div 6} = \frac{2}{3} $$

> [!WARNING]
> Sirf ek common factor cancel karne se fraction lowest terms mein nahi pahunchta; hamesha GCD use karo.

### Step 4 — Prime factorisation gives systematic GCD
Har number ko primes mein tod do, common primes ko multiply karke GCD nikaalo. Yeh method badi numbers ke liye bhi reliable hai.

**Example:** 48 = 2^4 × 3, 36 = 2^2 × 3^2. Common primes 2^2 × 3 = 12. GCD = 12.

$$ \gcd(48,36) = 2^{\min(4,2)} \times 3^{\min(1,2)} = 2^2 \times 3 = 12 $$

> [!WARNING]
> Prime factors galat count karne se GCD galat niklega aur fraction simplify nahi hogi.

### Step 5 — Canonical form is unique for each rational
Har non-zero rational number ko ek aur sirf ek unique fraction a/b ke roop mein likha ja sakta hai jahaan a aur b coprime hain (gcd(a,b)=1) aur b>0. Yeh final formal statement hai.

## 5. Worked examples — har step show karo

**Example 1 — Basic visual scaling**  
*Given:* 3/7  
*Find:* Two equivalent fractions.  
Multiply numerator and denominator by 2:  
$$ \frac{3}{7} = \frac{3\times2}{7\times2} = \frac{6}{14} $$  
*Why:* Same multiplier dono parts par apply kiya.  
Multiply by 3:  
$$ \frac{3}{7} = \frac{9}{21} $$  
**Final answer**  
6/14 and 9/21 are equivalent to 3/7.  
*Reflection:* Simple scaling se equivalence samajh aati hai; yeh method badi fractions ke liye bhi kaam karta hai.

**Example 2 — Cross-multiplication verification**  
*Given:* 8/12 and 14/21  
*Find:* Are they equivalent?  
8×21 = 168, 12×14 = 168. Equal, therefore equivalent.  
**Final answer**  
Yes, 8/12 ≡ 14/21.  
*Reflection:* Cross-multiplication se turant pata chal jaata hai bina GCD dhundhe.

**Example 3 — Simplifying with GCD**  
*Given:* 42/70  
*Find:* Simplified form.  
GCD(42,70) = 14.  
42 ÷ 14 = 3, 70 ÷ 14 = 5.  
**Final answer**  
3/5.  
*Reflection:* Poora GCD use karne se ek hi step mein lowest terms mil jaati hai.

**Example 4 — Larger numbers via prime factors**  
*Given:* 315/420  
*Find:* Lowest terms.  
315 = 3^2 × 5 × 7, 420 = 2^2 × 3 × 5 × 7.  
Common = 3 × 5 × 7 = 105.  
315 ÷ 105 = 3, 420 ÷ 105 = 4.  
**Final answer**  
3/4.  
*Reflection:* Prime factor method badi aur composite numbers ke liye safe hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Cancelling individual digits (e.g., 16/64 → 1/4) | Visual similarity misleads                  | Always cancel factors, never digits          |
| Forgetting to divide both parts by GCD            | Partial cancellation se satisfaction        | GCD nikaal ke hi cancel karo                 |
| Using different multipliers for num/den           | Multiplication property bhool jaana         | Ek hi number se multiply/divide karo         |
| Treating 0/0 as a fraction                        | Edge case confusion                         | Denominator zero allowed nahi                |
| Negative signs mishandled                         | Sign rules yaad nahi rehte                  | Negative ko sirf numerator mein rakho        |
| Stopping at any common factor                     | GCD ki jagah koi bhi factor use karna       | Prime factorisation se poora GCD confirm karo|
| Assuming all fractions with same numerator equal  | Misunderstanding ratio                      | Cross-multiplication test always apply karo  |

## 7. The textbook-precise statement
A fraction a/b is in lowest terms if and only if a and b are integers, b > 0, and gcd(a, b) = 1. Two fractions a/b and c/d (b, d ≠ 0) are equivalent if and only if a d = b c. Every rational number has a unique representation in lowest terms with positive denominator (see: Niven, Zuckerman & Montgomery, *An Introduction to the Theory of Numbers*, 5e, §1.1).

## 8. Visual — diagram or schematic
```
Number line segment [0,1]
0 ------------------ 1
   |         |         |
  1/3       2/3      3/3=1
   |    2/6=1/3     4/6=2/3
```
Labels show 1/3 and 2/6 at same position, 2/3 and 4/6 at same position; arrows indicate scaling by 2.

## 9. The memory technique
**The hook** — Imagine a pizza that you can stretch uniformly in all directions; every slice grows or shrinks together, so the amount of pizza on your plate never changes even though the slice count changes.

**What to overlearn** — a/b = (a k)/(b k) for any integer k ≠ 0; fraction is lowest terms only when gcd(a,b)=1.

**Spaced-repetition schedule** — Review equivalence test after 1 day, GCD method after 3 days, mixed problems after 7 days, then 16 and 35 days.

**First-principles fallback** — Cross-multiplication equality a d = b c directly from definition of rational equality; rebuild GCD via Euclidean algorithm if prime list bhool jaaye.

## 10. What this unlocks
Yeh concept aapko addition, subtraction, multiplication aur division of fractions ke liye taiyar karta hai, aur aage jaakar rational expressions, equations aur real-number arithmetic ke liye solid base deta hai.

- Adding fractions with unlike denominators
- Solving linear equations containing fractions
- Working with ratios and proportions
- Converting between decimals and fractions
- Understanding rational functions in algebra

## 11. Self-check — five questions, no answers
1. 5/8 ke teen equivalent fractions likho aur cross-multiplication se verify karo.  
2. 84/126 ko lowest terms mein likho aur GCD kaise nikala yeh step-by-step batao.  
3. Kya 0/5 aur 0/7 equivalent hain? Apne jawab ko mathematically justify karo.  
4. Ek student ne 26/39 ko 2/3 samajh kar cancel kiya; galti kya thi aur sahi kaise karte?  
5. Diya gaya hai ki 7/11 = k/77. Value of k nikaalo aur prove karo ki yeh fraction already lowest terms mein hai.