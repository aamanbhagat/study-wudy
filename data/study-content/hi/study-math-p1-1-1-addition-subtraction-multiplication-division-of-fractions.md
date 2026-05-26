## 1. The one-sentence answer
**Fractions par addition, subtraction, multiplication aur division karna ek aisa set of rules hai jo aapko rational numbers ke beech arithmetic operations allow karta hai bina unhe decimals mein convert kiye.**

Fractions basically ek quantity ko parts mein todne ka tareeka hai. Jab aap do fractions ko add ya subtract karte ho, aap unke parts ko same size ke pieces mein laate ho taaki woh directly combine ho sakein. Multiplication aur division mein yeh common size ki zaroorat nahi padti kyunki woh scaling aur splitting ke through kaam karte hain.

Yeh operations integers se aage badhkar aapko exact values ke saath kaam karne dete hain, jaise recipe scaling ya probability calculations mein. Sabse badi aha yeh hai ki addition aur subtraction ke liye common denominator zaroori hota hai, lekin multiplication aur division ke liye nahi.

> [!NOTE]
> Addition aur subtraction ke liye common denominator laana sirf ek technical step nahi hai — yeh ensure karta hai ki aap equivalent pieces ko combine kar rahe ho, warna aap apples aur oranges ko count kar rahe hote ho.

## 2. Why this matters — concrete and current
In semiconductor design, Intel aur TSMC engineers fraction arithmetic use karte hain mask alignment calculations mein, jahaan sub-nanometer precision ke liye exact ratios maintain karna padta hai bina floating-point rounding errors ke.

SpaceX ke Falcon rocket trajectory simulations mein fractions appear karte hain fuel mixture ratios aur thrust vectoring ke liye, kyunki real-time control loops mein exact rational values se hi deterministic predictions ban sakte hain.

Modern machine learning frameworks jaise PyTorch mein batch normalization layers fraction operations pe depend karte hain jab running statistics update hote hain, especially low-precision training mein jahaan decimal conversion accuracy kharab kar sakta hai.

Financial risk models at firms jaise Jane Street mein option pricing ke liye fractional position sizing use hoti hai, taaki portfolio weights exact fractions mein represent kiye ja sakein aur rounding se slippage na ho.

Natural phenomena jaise Mendelian genetics mein allele frequency calculations fractions ke through hi model kiye jaate hain, jahaan population genetics papers exact ratios preserve karte hain.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Positive integers    | Numerator aur denominator ko samajhne ke liye             |
| Division as sharing  | Fraction ko ek quantity ke parts mein todne ke liye       |
| Equivalent fractions | Addition aur subtraction ke liye common base banana       |
| Reciprocal           | Division ko multiplication mein convert karne ke liye     |

Agar aapko equivalent fractions ya reciprocal ka idea clear nahi hai, toh pehle woh padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Visualising a fraction as parts of a whole
Ek fraction \( \frac{a}{b} \) ka matlab hai ek whole ko \( b \) equal parts mein todna aur unmein se \( a \) parts lena.  
Example: \( \frac{3}{4} \) ka matlab pizza ko 4 slices mein kaatna aur 3 lena.  
Formal statement: \( \frac{a}{b} \) represents the measure \( a \times \frac{1}{b} \).  
> [!WARNING] Agar aap \( a \) aur \( b \) ko sirf numbers samajh ke unke beech relation bhool jaoge toh baad ke operations mein common units ki galti ho jaayegi.

### Step 2 — Multiplication of two fractions
Jab do fractions multiply hote hain, aap unke numerators aur denominators ko alag-alag multiply karte ho.  
Example: \( \frac{2}{3} \times \frac{4}{5} = \frac{8}{15} \).  
Formal: \( \frac{a}{b} \times \frac{c}{d} = \frac{ac}{bd} \).  
> [!WARNING] Agar aap cross terms ko mix kar doge toh result galat scale hoga.

### Step 3 — Division as multiplication by reciprocal
Division ko aap multiply by the flipped fraction se replace kar sakte ho.  
Example: \( \frac{3}{4} \div \frac{2}{5} = \frac{3}{4} \times \frac{5}{2} \).  
Formal: \( \frac{a}{b} \div \frac{c}{d} = \frac{a}{b} \times \frac{d}{c} \).  
> [!WARNING] Reciprocal lena bhool jaane se sign aur value dono flip ho jaate hain.

### Step 4 — Addition and subtraction require common denominator
Pehle dono fractions ko same denominator wale equivalent fractions mein convert karo, phir numerators add/subtract karo.  
Example: \( \frac{1}{2} + \frac{1}{3} = \frac{3}{6} + \frac{2}{6} = \frac{5}{6} \).  
Formal: \( \frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd} \).  
> [!WARNING] Agar denominator same nahi kiya toh aap alag-alag size ke pieces ko directly add kar rahe hote ho.

### Step 5 — Reducing to lowest terms after every operation
Har operation ke baad gcd nikaal ke fraction ko simplify karo.  
Formal: Divide numerator aur denominator by \( \gcd(a,b) \).  
> [!WARNING] Simplification skip karne se aage ke calculations mein computational waste aur comparison errors hote hain.

## 5. Worked examples — har step show karo

**Example 1 — Simple multiplication**  
*Given:* \( \frac{3}{8} \times \frac{5}{6} \)  
*Find:* Product  
\( \frac{3}{8} \times \frac{5}{6} = \frac{3 \times 5}{8 \times 6} \) (numerators aur denominators alag multiply kiye)  
\( = \frac{15}{48} \) (intermediate result)  
\( = \frac{5}{16} \) (gcd 3 se divide kiya)  
**\( \frac{5}{16} \)**  
*Reflection:* Yeh simple case multiplication rule ko seedha test karta hai; simplification last mein accuracy badhata hai.

**Example 2 — Division using reciprocal**  
*Given:* \( \frac{7}{9} \div \frac{2}{3} \)  
*Find:* Quotient  
\( \frac{7}{9} \div \frac{2}{3} = \frac{7}{9} \times \frac{3}{2} \) (reciprocal liya)  
\( = \frac{7 \times 3}{9 \times 2} = \frac{21}{18} \)  
\( = \frac{7}{6} \) (gcd 3 se divide)  
**\( \frac{7}{6} \)**  
*Reflection:* Reciprocal step ko miss karna sabse common error hai yahaan.

**Example 3 — Addition with different denominators**  
*Given:* \( \frac{2}{5} + \frac{1}{4} \)  
*Find:* Sum  
\( \frac{2}{5} = \frac{2 \times 4}{5 \times 4} = \frac{8}{20} \), \( \frac{1}{4} = \frac{1 \times 5}{4 \times 5} = \frac{5}{20} \) (common denominator 20 banaya)  
\( \frac{8}{20} + \frac{5}{20} = \frac{13}{20} \)  
**\( \frac{13}{20} \)**  
*Reflection:* Common denominator ne pieces ko same size kiya, bina iske addition meaningless hota.

**Example 4 — Mixed subtraction and simplification**  
*Given:* \( \frac{5}{6} - \frac{3}{8} \)  
*Find:* Difference  
\( \frac{5}{6} = \frac{20}{24} \), \( \frac{3}{8} = \frac{9}{24} \) (denominator 24 liya)  
\( \frac{20}{24} - \frac{9}{24} = \frac{11}{24} \) (already lowest terms)  
**\( \frac{11}{24} \)**  
*Reflection:* Subtraction mein bhi same rule apply hota hai; negative results avoid karne ke liye order check karo.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Adding numerators and denominators directly | Intuition ki galat application              | Always common denominator pehle laao         |
| Forgetting to flip fraction in division | Reciprocal rule yaad nahi rehta             | Division ko “multiply by reciprocal” bol ke yaad rakho |
| Cancelling across + or − signs    | Over-generalisation of cancellation         | Sirf multiplication mein cancel karo         |
| Not simplifying after operation   | Laziness ya gcd nikaalne ki aadat nahi      | Har final answer pe gcd check karo           |
| Using different units for denominators | Visualisation weak hoti hai                 | Hamesha same whole ka reference lo           |
| Sign errors in subtraction        | Negative fractions se discomfort            | Subtraction ko add negative ke roop mein dekho |

## 7. The textbook-precise statement
Let \( a,b,c,d \) be integers with \( b \neq 0 \), \( d \neq 0 \). Then  
\[ \frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd}, \quad \frac{a}{b} - \frac{c}{d} = \frac{ad - bc}{bd}, \]  
\[ \frac{a}{b} \cdot \frac{c}{d} = \frac{ac}{bd}, \quad \frac{a}{b} \div \frac{c}{d} = \frac{ad}{bc} \ (c \neq 0). \]  
All results are considered up to equivalence of fractions. (Lang, *Basic Mathematics*, 1971, Chapter 1, §3.)

## 8. Visual — diagram or schematic
```text
Whole: [================]   (length 1)
Fraction 1/2: [========        ]
Fraction 1/3: [=====           ]
Common denom 6:
1/2 = 3/6   [=== === ===     ]
1/3 = 2/6   [=== ===         ]
Sum   = 5/6 [=== === === === ===]
```
Yeh diagram dikhata hai ki common denominator lene ke baad hi lengths directly add ho sakti hain.

## 9. The memory technique
1. **The hook** — Pizza slices yaad rakho: multiplication mein slices ko scale karo, addition mein same size slices chahiye.
2. **What to overlearn** — \( \frac{a}{b} + \frac{c}{d} = \frac{ad+bc}{bd} \) aur reciprocal rule.
3. **Spaced-repetition schedule** — 1 din, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Fraction ko repeated addition ke roop mein socho aur common unit laao.

## 10. What this unlocks
Yeh foundation aapko decimals, percentages, ratios, aur algebra mein variable fractions handle karne deta hai.

- Rational expressions simplification
- Solving linear equations with fractional coefficients
- Probability calculations with exact fractions
- Dimensional analysis in physics

## 11. Self-check — five questions, no answers
1. Compute \( \frac{5}{12} + \frac{7}{18} \) aur result ko lowest terms mein likho.
2. Explain kyun \( \frac{2}{3} \times \frac{4}{5} \) mein common denominator ki zaroorat nahi padti.
3. \( \frac{9}{14} \div \frac{3}{7} \) galat karne ka ek common tareeka kya hai aur sahi answer kya hai?
4. Agar \( \frac{a}{b} + \frac{c}{d} \) mein \( b = d \) ho toh formula simplify hota hai ya nahi? Example do.
5. Detect the trap: student ne \( \frac{1}{2} + \frac{1}{3} = \frac{2}{5} \) kiya — yeh kyun galat hai aur sahi kaise nikaale?