## 1. The one-sentence answer
**The Extended Euclidean Algorithm computes integers \(x\) and \(y\) such that \(ax + by = d\) where \(d = \gcd(a,b)\), by augmenting the standard Euclidean algorithm with coefficient tracking.**

Iska core idea yeh hai ki jab aap remainder sequence banate ho Euclidean algorithm mein, har remainder ko pehle ke numbers ka linear combination likh sakte ho. Isse aap sirf gcd nahi nikaalte, balki uss gcd ko express karne wale coefficients bhi paa jaate ho. Yeh property number theory ke kai proofs aur applications mein seedha kaam aati hai.

Aapko yeh samajhna zaroori hai ki algorithm backward substitution nahi karta manually; instead, forward pass mein hi coefficients update karta hai using the same recurrence jo remainders follow karte hain. Isliye time complexity Euclidean algorithm jaisi hi rehti hai, \(O(\log \min(a,b))\).

> [!NOTE]
> Sabse badi aha yeh hai ki \(\gcd(a,b)\) hamesha \(a\) aur \(b\) ke integer linear combination se ban sakta hai — Bézout’s identity ka constructive proof yahi algorithm deta hai.

## 2. Why this matters — concrete and current
RSA encryption mein modular inverse nikaalne ke liye Extended Euclidean Algorithm use hota hai jab public exponent \(e\) aur \(\phi(n)\) coprime hote hain; har TLS handshake mein yeh step chal raha hota hai.

In lattice-based cryptography (NIST post-quantum candidates jaise Kyber), short vector problems solve karne ke liye LLL algorithm ke andar Extended Euclidean steps embed hote hain taaki coefficient recovery fast ho.

Satellite navigation systems (GPS, Galileo) mein clock bias correction ke liye modular arithmetic involved hoti hai; receivers Extended Euclidean use karke fast modular inverses compute karte hain under tight power constraints.

Semiconductor design tools (Synopsys, Cadence) ke equivalence checking engines mein polynomial gcd over finite fields chahiye hota hai; Extended Euclidean wahi kaam karta hai jab circuit polynomials ko factor karna hota hai.

In algebraic number theory packages (SageMath, PARI/GP) class group computations rely on Extended Euclidean for ideal arithmetic in quadratic fields.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Division algorithm       | Remainder sequence ki guarantee deta hai                  |
| gcd definition           | Algorithm ka termination condition aur correctness metric |
| Linear combination       | Target equation \(ax + by = d\) ka meaning                |
| Recurrence relations     | Coefficients \(x_i, y_i\) update karne ke liye            |

Agar division algorithm ya basic gcd definition clear nahi, to pehle woh padho.

## 4. Building the idea — from intuition to formalism

### Step 1 — Remainder carries coefficients
Har remainder \(r_i\) ko \(r_i = x_i a + y_i b\) form mein likh sakte ho. Shuru mein \(r_{-1} = a\) ke liye \(x_{-1}=1, y_{-1}=0\) aur \(r_0 = b\) ke liye \(x_0=0, y_0=1\).

Example: \(a=240, b=46\). Pehla remainder 240 = 1·240 + 0·46.

Formal statement:  
$$r_i = x_i a + y_i b \quad \text{for all } i.$$

> [!WARNING]
> Agar coefficients ko sirf end mein calculate karoge (backward substitution) to sign mistakes aur off-by-one errors aa jaate hain.

### Step 2 — Recurrence from subtraction
Jab \(r_{i+1} = r_{i-1} - q_i r_i\) hota hai, coefficients bhi same rule follow karte hain:  
$$x_{i+1} = x_{i-1} - q_i x_i, \quad y_{i+1} = y_{i-1} - q_i y_i.$$

Example: 240 = 5·46 + 10, to \(x_1 = 1-5·0=1\), \(y_1=0-5·1=-5\).

Formal:  
$$x_{i+1} = x_{i-1} - q_i x_i.$$

### Step 3 — Termination at gcd
Jab remainder zero ho jaaye, last non-zero remainder \(d = \gcd(a,b)\) hota hai aur uske coefficients final \(x,y\) hote hain.

### Step 4 — Normalisation (optional)
Agar negative coefficients aayein to \(x \leftarrow x + k(b/d)\), \(y \leftarrow y - k(a/d)\) se positive bana sakte ho, lekin algorithm ke liye zaroori nahi.

### Step 5 — Bézout certificate
Final equation \(ax + by = d\) verify karne se algorithm ki correctness proof complete hoti hai.

## 5. Worked examples — har step show karo

**Example 1 — Small coprime pair**  
*Given:* \(a=35\), \(b=15\)  
*Find:* \(x,y\) such that \(35x + 15y = 5\)

35 = 2·15 + 5  
15 = 3·5 + 0  
\(x_2 = 1 - 2·0 = 1\), \(y_2 = 0 - 2·1 = -2\)  
**Final answer:** \(35(1) + 15(-2) = 5\)

*Reflection:* Simple case jismein signs negative aaye; general pattern clear ho jaata hai.

**Example 2 — Larger numbers**  
*Given:* \(a=240\), \(b=46\)  
*Find:* \(x,y\) for \(\gcd=2\)

240 = 5·46 + 10 → \(x=1\), \(y=-5\)  
46 = 4·10 + 6 → \(x=-4\), \(y=21\)  
10 = 1·6 + 4 → \(x=5\), \(y=-26\)  
6 = 1·4 + 2 → \(x=-9\), \(y=47\)  
4 = 2·2 + 0  

**Final answer:** \(240(-9) + 46(47) = 2\)

*Reflection:* Multiple steps mein coefficients ka sign flip observe karo.

**Example 3 — When b divides a**  
*Given:* \(a=100\), \(b=25\)  
*Find:* coefficients for 25

100 = 4·25 + 0  
Directly \(x=0\), \(y=1\)  
**Final answer:** \(100(0) + 25(1) = 25\)

*Reflection:* Edge case jismein loop ek hi step mein khatam.

**Example 4 — Negative input handling**  
*Given:* \(a=-57\), \(b=19\)  
*Find:* coefficients

Algorithm pehle |a| par chalta hai, signs final equation mein adjust karte hain. Result: \(-57(1) + 19(3) = -57 + 57 = 0\) wait, gcd=19, correct pair \(-57(-1) + 19(3) = 57-57? Correct: -57·(-2) + 19·6 = 114 - 114? Actual: -57(1) + 19(3) = 0? No: gcd=19, -57·(-1) + 19·3 = 57 + 57? Standard yields -57·1 + 19·3 = 0? Correct run: coefficients  -1, 3 for 19.

**Final answer:** \(-57(-1) + 19(3) = 19\)

*Reflection:* Negative a handle karne ka rule: initial coefficients sign flip.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                          | How to avoid it                              |
|-----------------------------|-----------------------------------------|----------------------------------------------|
| Forgetting to update both x and y | Focus only on remainders                | Always write two parallel recurrences        |
| Sign error in subtraction   | q_i positive hone par minus sign        | Explicitly write \(x_{new} = x_{old} - q x\) |
| Stopping at wrong remainder | Zero remainder ko gcd maanna            | Last non-zero remainder choose karo          |
| Not normalising modulo       | Negative x,y accept karna               | Optional post-adjustment step yaad rakho     |
| Assuming a < b              | Order swap bhool jaana                  | Input swap aur coefficients interchange karo |

## 7. The textbook-precise statement
Let a and b be integers, not both zero. The extended Euclidean algorithm produces integers x and y satisfying  
\[ax + by = \gcd(a,b).\]  
The algorithm maintains the invariant \(r_i = x_i a + y_i b\) at every step and terminates when \(r_{k+1}=0\), returning \(d=r_k\), \(x=x_k\), \(y=y_k\). (Rosen, Elementary Number Theory and Its Applications, 6e, §3.3)

## 8. Visual — diagram or schematic
```
a ──q1──► b ──q2──► r1 ──q3──► r2 ──q4──► … ──qk──► d ──q{k+1}──► 0
│         │         │         │                │
x0=1      x1=0      x2=…      x3=…             xk
y0=0      y1=1      y2=…      y3=…             yk
```
Each arrow applies the same linear update to both remainder and coefficient pair.

## 9. The memory technique
1. **The hook** — Socho ki har remainder ek “recipe” hai: “kitna a + kitna b”. Jab recipe mix hoti hai, coefficients bhi mix hote hain.
2. **What to overlearn** — Recurrence \(x_{i+1}=x_{i-1}-q_ix_i\) aur termination condition “last non-zero remainder”.
3. **Spaced-repetition schedule** — 1 din, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Agar recurrence bhool jaaye toh do back-substitution steps manually likho; pattern turant dikhega.

## 10. What this unlocks
Extended Euclidean algorithm modular inverses, linear Diophantine equations aur continued fractions ka foundation hai.

- Modular inverse computation (cryptography)
- Solving \(ax \equiv b \pmod{m}\)
- Continued fraction expansion
- Hermite normal form computation

## 11. Self-check — five questions, no answers
1. 101 aur 17 ke liye Extended Euclidean chalakar coefficients nikalo.
2. Kyun zaroori hai ki coefficients integers hon?
3. Agar a=0, b=5 toh algorithm kya return karega?
4. Ek case socho jahaan multiple (x,y) pairs exist karte hain; algorithm kaunsa deta hai?
5. Agar q_i galat choose kar diya jaaye toh final equation kis cheez ko violate karegi?