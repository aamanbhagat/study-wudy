## 1. The one-sentence answer
**Like terms share identical variable factors with identical exponents, so their coefficients can be added or subtracted during simplification; unlike terms cannot be combined.**

Iska matlab yeh hai ki jab aap ek expression mein same variables ko same powers ke saath dekhte ho, unke numerical multipliers ko ek saath laa sakte ho. Variables alag ho, ya powers alag ho, toh woh terms alag-alag rehte hain. Yeh rule expressions ko compact banata hai bina kisi information ko khoye.

Aap isko ek collection ki tarah soch sakte ho: same “type” ke items ko count karna easy hai, lekin different types ko alag rakhna padta hai. Pehli baar is concept ko padhte hue, sirf variables aur exponents match karne par focus karo; constants (jaise 5 ya −3) hamesha like terms hote hain kyunki unme koi variable nahi hota.

> [!NOTE]
> Sabse bada “aha” yeh hai ki simplification sirf addition ya subtraction nahi hai — yeh pehle identify karna hai ki kaun se terms actually combine ho sakte hain.

## 2. Why this matters — concrete and current
In computer algebra systems used by SpaceX for trajectory optimisation, like-term collection reduces polynomial size before feeding them into solvers, cutting computation time on Falcon 9 guidance loops.

Semiconductor design software from Synopsys applies the same rule while simplifying Boolean polynomials that model gate delays; combining like terms shrinks the expression before logic synthesis.

In machine-learning compilers such as Google’s XLA, automatic differentiation produces large expressions containing repeated powers of weights; merging like terms before GPU code generation lowers memory traffic.

Natural phenomena like orbital mechanics equations in NASA’s GMAT tool also rely on collecting like powers of the radial distance variable to keep the force polynomials manageable during long-duration simulations.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Variables and constants | To recognise what stays fixed and what changes            |
| Exponents            | To check whether powers of each variable match            |
| Coefficients         | To know which numbers can be added once like terms are identified |

Agar upar ke teen concepts clear nahi hain, toh pehle unhe revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Spotting identical variable parts
Aap dekhte ho ki har term mein kaun se variables hain aur unke exponents kya hain. Agar dono bilkul same hain, toh woh like terms hain.

Example: 4x²y aur −7x²y mein x²y dono jagah same hai.

Formal statement: Terms \(a x_1^{e_1} x_2^{e_2}\dots\) aur \(b x_1^{e_1} x_2^{e_2}\dots\) like terms hain jab variable set aur exponent tuple identical ho.

> [!WARNING]
> Agar exponent mismatch ko ignore kiya (jaise x² aur x³ ko combine karna) toh poora expression galat ho jaayega.

### Step 2 — Adding or subtracting only the coefficients
Jab like terms mil jaayein, unke numerical factors ko combine karo; variables aur exponents waise hi copy karo.

Example: 4x²y + (−7x²y) = (4 − 7)x²y = −3x²y.

Formal statement: \(a \cdot m + b \cdot m = (a + b) \cdot m\), jahaan m monomial hai.

### Step 3 — Leaving unlike terms untouched
Agar variable ya exponent alag ho, toh term ko expression mein waise hi rakhna hai.

Example: 5x² + 3x cannot be simplified further.

Formal statement: Distinct monomials form a basis; their linear combination stays as written.

### Step 4 — Handling constants as a special case
Constants (pure numbers) sab ek dusre ke like terms hote hain kyunki unme variable factor zero hota hai.

Example: 8 + (−2) + 5 = 11.

### Step 5 — Distributing negatives before combining
Jab minus sign aaye, toh uske baad wale term ke coefficient ko negative karo pehle.

Example: 9x − (4x − 2) = 9x − 4x + 2.

Formal statement: −(c·m) = (−c)·m.

### Step 6 — Writing the final polynomial in standard form
Combined like terms ko descending powers mein arrange karo.

Example: 2x + 5x² − 3x + 7 = 5x² − x + 7.

## 5. Worked examples — har step show karo

**Example 1 — Basic collection**
*Given:* 6a + 2a − 4a  
*Find:* simplified value  
6a aur 2a like hain (variable a, power 1). Coefficients 6 + 2 = 8, phir 8 − 4 = 4.  
**4a**  
*Reflection:* Sirf coefficients badle; variable same raha. General rule: same monomial ke saath coefficients add karo.

**Example 2 — Mixed variables**
*Given:* 3x²y − 5x²y + 7xy²  
*Find:* simplified expression  
Pehle 3x²y aur −5x²y ko combine: (3 − 5)x²y = −2x²y. 7xy² unlike hai.  
**−2x²y + 7xy²**  
*Reflection:* Exponents x²y aur xy² alag hain, isliye alag rehte hain.

**Example 3 — With parentheses**
*Given:* 4m − (2m − 9) + 3  
*Find:* simplified value  
Negative distribute: 4m − 2m + 9 + 3. 4m − 2m = 2m, constants 9 + 3 = 12.  
**2m + 12**  
*Reflection:* Parentheses hataane ke baad hi like terms dikhte hain.

**Example 4 — Higher degree**
*Given:* 2x³ + 5x² − x³ + 4x² − 7  
*Find:* simplified polynomial  
x³ terms: 2 − 1 = 1 → x³. x² terms: 5 + 4 = 9 → 9x². Constant −7. Descending order mein likho.  
**x³ + 9x² − 7**  
*Reflection:* Degree ke hisaab se arrange karna final polish hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                     | How to avoid it                              |
|-----------------------------|------------------------------------|----------------------------------------------|
| Combining x² and x³         | Exponents ignore kiye              | Exponent tuple ko explicitly compare karo    |
| Treating 2xy and 2x y² as like | Variables ke powers miss hue     | Har variable ka exponent list banao          |
| Forgetting to distribute minus | Parentheses dekh kar skip kiya   | Minus sign ke baad wale term ko pehle sign-flip karo |
| Adding constants to variables | “Sab numbers hain” socha           | Constants ko alag monomial maano             |
| Writing 3x + 2x = 5x²       | Power galat laga di                | Resultant term ka exponent original jaisa rakho |
| Ignoring repeated like terms  | Expression lamba dekh kar thak gaye | Ek baar scan karke saare like terms mark karo |

## 7. The textbook-precise statement
Two monomials \(a x_1^{e_1}\dots x_k^{e_k}\) and \(b x_1^{e_1}\dots x_k^{e_k}\) are like terms if and only if the sequences of variables and their corresponding exponents are identical. Their sum is the single monomial \((a+b) x_1^{e_1}\dots x_k^{e_k}\). Unlike terms remain separate summands. (Blitzer, *Introductory Algebra*, 7e, §1.4)

## 8. Visual — diagram or schematic
```text
Expression:  4x²y   +   7x²y   −   3xy²   +   5
             └──like──┘          └──unlike──┘
Combine:     (4+7)x²y − 3xy² + 5
Result:          11x²y − 3xy² + 5
```

## 9. The memory technique
1. **The hook** — “Same haircut, same colour” visual: do terms tabhi combine hote hain jab unke “baal” (variables) aur “length” (exponents) bilkul same dikhein.
2. **What to overlearn** — Like terms tab combine hote hain jab variable set + exponent tuple identical ho; constants hamesha like hote hain.
3. **Spaced-repetition schedule** — 1 din baad, 3 din baad, 7 din baad, 16 din baad, 35 din baad ek-do expressions simplify karke check karo.
4. **First-principles fallback** — Agar rule bhool jaaye toh har term ko variable-exponent pairs ki list mein tod do aur lists match hone par hi coefficients add karo.

## 10. What this unlocks
Yeh step aapko polynomial arithmetic, equation solving, aur function graphing ke liye taiyaar karta hai.

- Polynomial multiplication aur division
- Solving linear aur quadratic equations
- Factoring expressions
- Evaluating functions at specific points

## 11. Self-check — five questions, no answers
1. 8p − 3p + 5p ko simplify karo.
2. Kyun 4a²b aur 4ab² ko combine nahi kar sakte?
3. (2x − 7) − (5x + 1) ko expand aur simplify karo.
4. 3x³ + 2x² − x³ + 4x² − 6 mein sabse badi degree ka term kaunsa hai?
5. Ek expression do jisme teen unlike terms hon aur usko standard form mein likho.