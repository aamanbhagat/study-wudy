## 1. The one-sentence answer
**Limit laws let you compute the limit of a complicated expression by breaking it into simpler pieces whose limits you already know.**

Iska matlab yeh hai ki agar aapko pata hai ki do functions alag-alag kya value approach kar rahe hain, to aap unke sum, product, quotient ya constant multiple ka limit seedha nikaal sakte ho bina har baar definition se shuru kiye. Yeh laws ek tarah ke “algebra of limits” hain jo aapko function ko piece-wise handle karne dete hain.

Pehle aap sirf basic limits jaise \( \lim_{x \to a} x = a \) ya \( \lim_{x \to a} c = c \) seekhte ho. Limit laws uske baad aate hain taaki aap polynomials, rational functions aur aur complex expressions ke limits nikaal sako.

> [!NOTE]
> Sabse badi “aha” yeh hai ki limits preserve algebraic operations — agar dono functions ka limit exist karta hai, to unka sum, product wagairah ka limit bhi exist karta hai aur woh alag-alag limits ko combine karke mil jaata hai.

## 2. Why this matters — concrete and current
In aerospace trajectory planning, SpaceX uses these laws to combine velocity and acceleration limits when Falcon 9 performs a boost-back burn; the total velocity change is treated as a sum of individual engine contributions whose limits are known from thrust curves.

In semiconductor process control at TSMC, the critical dimension of a transistor gate is modelled as a quotient of two measured quantities (etch depth over resist thickness); the limit laws guarantee that small measurement errors do not explode when the denominator stays away from zero.

Inside the Adam optimiser used by every major ML lab, the effective learning-rate schedule is a constant-multiple of a ratio of two exponentially-weighted moving averages; the product and quotient laws justify why the combined expression still converges when each moving average converges.

In fluid-dynamics simulations at NASA’s CFD codes, density and velocity fields are multiplied to obtain momentum flux; the product law lets engineers pass the limit inside the multiplication when refining the mesh to a continuous solution.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Definition of limit      | You must know what \( \lim_{x \to a} f(x) = L \) actually means before combining several such statements. |
| Basic limit examples     | You need the trivial limits \( \lim c = c \) and \( \lim x = a \) as building blocks. |
| Function arithmetic      | You must be comfortable writing \( f+g \), \( fg \), \( f/g \) so the laws have something to act on. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Limits behave like numbers when they exist
Agar dono limits exist karte hain, to woh numbers ki tarah hi add, multiply, divide ho sakte hain.  
Example: \( \lim_{x \to 2} x = 2 \) aur \( \lim_{x \to 2} 3 = 3 \) dono exist karte hain, isliye unka sum bhi 5 hona chahiye.  
$$ \lim_{x \to a} \bigl( f(x) + g(x) \bigr) = \lim_{x \to a} f(x) + \lim_{x \to a} g(x) $$  
> [!WARNING] Agar ek bhi limit exist nahi karta (jaise \( \lim_{x \to 0} \frac{1}{x} \)), to sum law automatically fail ho jaata hai.

### Step 2 — Constant multiple is the simplest scaling
Constant ko bahar nikaal sakte ho kyunki woh function ke behaviour ko sirf scale karta hai.  
Example: \( \lim_{x \to 3} 5x = 5 \times 3 = 15 \).  
$$ \lim_{x \to a} \bigl( c \cdot f(x) \bigr) = c \cdot \lim_{x \to a} f(x) $$  
> [!WARNING] Constant ko andar le aane ki koshish mat karo jab c khud x par depend kare.

### Step 3 — Product law multiplies the separate limits
Dono functions apni-apni taraf jaakar limit pakad lete hain, phir unke limits ko multiply kar dete hain.  
Example: \( \lim_{x \to 1} x(x+1) = 1 \times 2 = 2 \).  
$$ \lim_{x \to a} \bigl( f(x) g(x) \bigr) = \lim_{x \to a} f(x) \cdot \lim_{x \to a} g(x) $$  
> [!WARNING] Agar ek limit infinity hai aur dusra zero, to product indeterminate ban jaata hai — law seedha apply nahi hota.

### Step 4 — Quotient law needs a non-zero denominator limit
Division tabhi safe hai jab bottom wala limit zero na ho.  
Example: \( \lim_{x \to 2} \frac{x}{x-1} = \frac{2}{1} = 2 \).  
$$ \lim_{x \to a} \frac{f(x)}{g(x)} = \frac{\lim f(x)}{\lim g(x)} \quad \text{provided } \lim g(x) \neq 0 $$  
> [!WARNING] Students aksar denominator zero hone par bhi limit nikaalne ki koshish karte hain — yeh law tab apply nahi hota.

### Step 5 — All four laws ek saath combine kiye ja sakte hain
Polynomial ya rational function ko term-by-term tod kar har law apply karo.  
Formal statement ab textbook style mein likha ja sakta hai (dekho section 7).

## 5. Worked examples — har step show karo

**Example 1 — Constant multiple on a linear function**  
*Given:* \( \lim_{x \to 4} x = 4 \).  
*Find:* \( \lim_{x \to 4} 7x \).  
Step 1: Identify the constant \( c = 7 \).  
Step 2: Apply constant-multiple law directly.  
$$ 7 \cdot \lim_{x \to 4} x = 7 \cdot 4 = 28. $$  
*Why:* Constant ko limit ke bahar nikaalna allowed hai.  
**28**  
*Reflection:* Yeh sabse easy case hai; sirf scaling yaad rakhna hai.

**Example 2 — Sum of two simple limits**  
*Given:* \( \lim_{x \to 1} x = 1 \), \( \lim_{x \to 1} (x+3) = 4 \).  
*Find:* \( \lim_{x \to 1} (2x + x + 3) \).  
Step 1: Split into two functions.  
Step 2: Use sum law.  
$$ \lim (2x) + \lim (x+3) = 2\cdot1 + 4 = 6. $$  
*Why:* Sum law dono limits ko alag-alag compute karne deta hai.  
**6**  
*Reflection:* Notice that we reused the constant-multiple law inside the sum.

**Example 3 — Product of linear terms**  
*Given:* \( \lim_{x \to 2} (x-1) = 1 \), \( \lim_{x \to 2} (x+1) = 3 \).  
*Find:* \( \lim_{x \to 2} (x-1)(x+1) \).  
Step 1: Apply product law.  
$$ 1 \cdot 3 = 3. $$  
*Why:* Product law multiplies the already-known limits.  
**3**  
*Reflection:* Same answer milta hai agar expand karke sum law use karte, showing consistency.

**Example 4 — Quotient with non-zero denominator**  
*Given:* \( \lim_{x \to 3} (x^2-1) = 8 \), \( \lim_{x \to 3} (x-2) = 1 \).  
*Find:* \( \lim_{x \to 3} \frac{x^2-1}{x-2} \).  
Step 1: Check denominator limit ≠ 0.  
Step 2: Apply quotient law.  
$$ \frac{8}{1} = 8. $$  
*Why:* Denominator ka limit 1 hai, isliye safe hai.  
**8**  
*Reflection:* Agar denominator ka limit zero hota toh yeh example invalid ho jaata.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Applying quotient law when denominator → 0 | Student forgets to check the bottom limit   | Always compute lim g(x) first and verify ≠ 0 |
| Treating ∞ − ∞ as a number        | Intuition that “infinity is just big”       | Recognise indeterminate forms early          |
| Pulling a variable constant out   | Confusing constant with a function of x     | Check whether the multiplier depends on x    |
| Forgetting that limits must exist | Assuming both sides exist without proof     | State existence explicitly before combining  |
| Using limit laws on one-sided limits without care | Laws hold for one-sided too but conditions differ | Verify both one-sided limits exist and match |
| Mixing up product and quotient signs | Algebraic slip while writing the expression | Write each law in symbols before substituting |

## 7. The textbook-precise statement
If \( \lim_{x \to a} f(x) = L \) and \( \lim_{x \to a} g(x) = M \), then the following hold (provided in the quotient case that \( M \neq 0 \)):

\[
\lim_{x \to a} [f(x) + g(x)] = L + M,
\quad
\lim_{x \to a} [f(x) g(x)] = L M,
\quad
\lim_{x \to a} \frac{f(x)}{g(x)} = \frac{L}{M},
\quad
\lim_{x \to a} [c f(x)] = c L.
\]

These are stated exactly as Theorem 2 in Stewart, *Calculus*, 9e, §2.3.

## 8. Visual — diagram or schematic
```text
          f(x) ──► L
                    │
                    +   ──► L+M   (sum law)
                    │
          g(x) ──► M

          f(x) ──► L
                    │
                    ×   ──► L·M   (product law)
                    │
          g(x) ──► M
```

## 9. The memory technique
1. **The hook** — Imagine four arithmetic buttons on a calculator; each button works only when both numbers on the screen are finite.
2. **What to overlearn** — The four symbolic statements in section 7 and the single condition “denominator limit ≠ 0”.
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Return to the ε-δ definition: show that for any ε > 0 you can find δ that works for the combined expression by using the δ’s of the separate limits.

## 10. What this unlocks
These laws are the gateway to differentiating every elementary function and to evaluating almost every limit that appears in Calculus I.

- Continuity of polynomials and rational functions
- Derivative of sums and products (next two lectures)
- L’Hôpital’s rule (later, when limits become indeterminate)
- Rigorous ε-δ proofs of continuity for algebraic combinations

## 11. Self-check — five questions, no answers
1. Compute \( \lim_{x \to 2} 3(x^2 + 5x) \) using only the laws.
2. Does the quotient law apply to \( \lim_{x \to 0} \frac{x}{x^2} \)? Explain in one sentence.
3. Give a concrete counter-example where the sum law cannot be used.
4. Show that \( \lim_{x \to 1} \frac{(x-1)(x+2)}{x-1} \) cannot be evaluated by the quotient law directly; then evaluate it another way.
5. A student writes \( \lim_{x \to \infty} (x \cdot \frac{1}{x}) = \infty \cdot 0 \). Identify the mistake using the laws.