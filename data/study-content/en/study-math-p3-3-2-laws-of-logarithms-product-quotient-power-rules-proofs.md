## 1. The one-sentence answer

**The three logarithm laws are direct translations of the three exponent laws through the inverse relationship between the exponential and logarithm functions.**

Let \(b > 0\), \(b \neq 1\), and let \(a, c > 0\). The exponential function \(f(x) = b^x\) multiplies when its inputs add. Because the logarithm is defined to be the exact inverse operation, it must turn multiplication back into addition. The same reversal produces the quotient and power rules.  

The proofs therefore require only two ingredients: the algebraic rules already known for exponents, and the definition \(\log_b y = x\) if and only if \(b^x = y\). No new axioms are introduced.  

Once these identities are established they may be used in either direction: to compress products into sums or to expand sums back into products, whichever simplifies the expression at hand.

> [!NOTE]
> The single deepest insight is that logarithms do not “invent” arithmetic; they merely transport the arithmetic already present in the exponential group into additive form.

## 2. Why this matters — concrete and current

In radio astronomy the flux density of a source is recorded on a logarithmic scale (the jansky). Converting between two receivers whose gains differ by a constant factor reduces to a single subtraction of logarithms, exactly the quotient rule; the same identity appears in the reduction of interferometric visibilities at the Event Horizon Telescope.

Modern automatic differentiation frameworks such as JAX and PyTorch compute gradients of log-likelihoods. The product rule converts a product of probabilities into a sum of log-probabilities, turning an underflow-prone multiplication into a numerically stable addition that is executed billions of times per training run on GPU clusters.

Semiconductor process engineers measure dopant concentration profiles with secondary-ion mass spectrometry. The raw count rates span many orders of magnitude; the power rule converts the exponentiated depth dependence into a straight line on a semi-log plot, allowing immediate extraction of diffusion coefficients without iterative numerical fitting.

In orbital-mechanics software used by SpaceX for Falcon 9 trajectory optimisation, specific impulse and propellant mass are combined through the Tsiolkovsky equation. Taking the logarithm converts the exponential mass-ratio term into a linear expression that can be differentiated analytically inside the optimiser, reducing each guidance cycle from milliseconds to microseconds.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Laws of exponents        | The logarithm laws are literal inverses of these          |
| Definition of \(\log_b\) | Supplies the biconditional that converts every step       |
| Domain restrictions      | Guarantees every logarithm appearing in a proof is defined |

## 4. Building the idea — from intuition to formalism

### Step 1 — Exponent multiplication becomes addition
When two powers of the same base are multiplied, their exponents add:  
\[
b^x \cdot b^y = b^{x+y}.
\]
This is the only algebraic fact we start with.

### Step 2 — Logarithm as exact inverse
By definition, \(\log_b (b^x) = x\). Applying the logarithm to both sides of the exponent rule therefore yields an identity whose left-hand side is already a logarithm of a product.

### Step 3 — Product rule
Let \(a = b^x\) and \(c = b^y\). Then  
\[
\log_b (a \cdot c) = \log_b (b^x \cdot b^y) = \log_b (b^{x+y}) = x + y = \log_b a + \log_b c.
\]
Hence  
\[
\log_b (ac) = \log_b a + \log_b c.
\]

> [!WARNING]
> Replacing the base inside the logarithm on only one side of the equation breaks the inverse relationship and produces an incorrect identity.

### Step 4 — Quotient rule
Write the quotient as a product with a negative exponent:  
\[
\frac{a}{c} = a \cdot c^{-1}.
\]
Apply the product rule already proved and the power rule (derived next) to obtain  
\[
\log_b \Bigl(\frac{a}{c}\Bigr) = \log_b a - \log_b c.
\]

### Step 5 — Power rule
Raise \(a = b^x\) to the power \(k\):  
\[
a^k = (b^x)^k = b^{xk}.
\]
Taking logarithms immediately gives  
\[
\log_b (a^k) = kx = k \log_b a.
\]

### Step 6 — Textbook statement
All three identities hold for any valid base \(b > 0\), \(b \neq 1\) and positive arguments, with no further restrictions.

## 5. Worked examples — every step shown

**Example 1 — Direct product**  
*Given:* \(\log_3 4 + \log_3 9\).  
*Find:* a single logarithm.  

Apply the product rule in the forward direction:  
\[
\log_3 4 + \log_3 9 = \log_3 (4 \cdot 9) = \log_3 36.
\]  
*Why:* The sum of logs with identical bases equals the log of the product.  

**Final answer**  
\(\log_3 36\)

*Reflection:* The example is trivial once the direction of the rule is recognised; the same move compresses any product that appears inside a larger expression.

**Example 2 — Mixed quotient and power**  
*Given:* \(2\log 5 - \log 2\).  
*Find:* a single logarithm (base 10).  

Rewrite the coefficient via the power rule:  
\[
2\log 5 = \log 5^2 = \log 25.
\]  
*Why:* The scalar multiplier becomes the exponent.  

Subtract using the quotient rule:  
\[
\log 25 - \log 2 = \log \Bigl(\frac{25}{2}\Bigr).
\]  
*Why:* Difference of logs equals log of quotient.  

**Final answer**  
\(\log(12.5)\)

*Reflection:* Two distinct rules were required; recognising the coefficient as an exponent is the step most often omitted.

**Example 3 — Nested expression**  
*Given:* \(\log_b \sqrt{a^3 c}\).  
*Find:* an expression free of radicals and powers.  

Convert the square root:  
\[
\sqrt{a^3 c} = (a^3 c)^{1/2}.
\]  
*Why:* Radical notation is a fractional exponent.  

Apply the power rule:  
\[
\log_b (a^3 c)^{1/2} = \frac12 \log_b (a^3 c).
\]  
*Why:* The outer exponent travels outside the logarithm.  

Distribute the remaining logarithm with the product rule:  
\[
\frac12 (\log_b a^3 + \log_b c) = \frac32 \log_b a + \frac12 \log_b c.
\]  
*Why:* Product inside becomes sum; power rule again on the first term.  

**Final answer**  
\(\dfrac32\log_b a + \dfrac12\log_b c\)

*Reflection:* Each layer of nesting is peeled by one rule; the order of application is dictated by the outermost operation.

**Example 4 — Change-of-base disguised**  
*Given:* \(\log_2 3 \cdot \log_3 5 \cdot \log_5 8\).  
*Find:* a numerical value.  

Insert the change-of-base identity \(\log_p q = 1/\log_q p\) between the first two factors:  
\[
\log_2 3 \cdot \log_3 5 = \frac{\log 3}{\log 2} \cdot \frac{\log 5}{\log 3} = \frac{\log 5}{\log 2} = \log_2 5.
\]  
*Why:* Intermediate terms cancel telescopically.  

Multiply by the final factor:  
\[
\log_2 5 \cdot \log_5 8 = \log_2 8 = 3.
\]  
*Why:* The product rule in reverse yields a single log whose argument is a power of the base.  

**Final answer**  
\(3\)

*Reflection:* The chain demonstrates that the logarithm laws remain valid even when bases differ, provided each consecutive pair matches.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Applying a rule to logs of different bases | Visual similarity of the symbols                    | Write the base explicitly on every logarithm         |
| Forgetting the domain \(a,c>0\)   | Over-generalising algebraic manipulation            | Check positivity of every argument before each step  |
| Treating \(\log a^b\) as \(b\log a\) only when \(b\) is integer | Confusion between exponent rules and log rules      | Derive the power rule once for real exponents        |
| Writing \(\log(a+b)=\log a+\log b\) | Pattern-matching the product rule too eagerly       | Verify that the operation inside is multiplication   |
| Cancelling bases across different logs | Treating logs like fractions                        | Convert everything to the same base first            |
| Ignoring that \(\log 1 = 0\)      | Assuming every constant needs separate handling     | Memorise the three elementary values: \(\log_b 1=0\), \(\log_b b=1\), \(\log_b b^k = k\) |
| Sign error in quotient rule       | Subtraction feels symmetric but direction matters   | Always rewrite quotient as product with negative exponent before applying rules |

## 7. The textbook-precise statement

Let \(b > 0\), \(b \neq 1\), and let \(x, y > 0\). Then the following identities hold:

\[
\log_b (xy) = \log_b x + \log_b y,
\]

\[
\log_b \Bigl(\frac{x}{y}\Bigr) = \log_b x - \log_b y,
\]

\[
\log_b (x^y) = y \log_b x.
\]

These are proved in Stewart, *Calculus*, 9e, §3.4, using only the definition of the logarithm and the exponent laws.

## 8. Visual — diagram or schematic

```text
          Exponent world                  Logarithm world
               b^x                             log_b
          multiplication  <── inverse ──>      addition
               b^y
          ───────────────────────────────
               b^{x+y}                         log_b(x·y)
```

The left column shows the exponent rule; the right column shows the transported addition. The horizontal double arrow labelled “inverse” is the definition of the logarithm that makes the correspondence exact.

## 9. The memory technique

1. **The hook**  
   Picture a pair of identical twins: one twin multiplies toy blocks, the other adds the same blocks after they have been passed through a magic mirror labelled “log”. The mirror never changes the total number of blocks; it only changes the operation.

2. **What to overlearn**  
   - \(\log(xy)=\log x+\log y\) (product)  
   - \(\log(x^y)=y\log x\) (power)  
   - The three elementary values: \(\log_b 1=0\), \(\log_b b=1\), \(\log_b b^k=k\)

3. **Spaced-repetition schedule**  
   Review at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.

4. **First-principles fallback**  
   Return to the definition: set \(x=\log_b a\), \(y=\log_b c\), rewrite \(a=b^x\), \(c=b^y\), substitute into the exponent law, then apply \(\log_b\) to both sides.

## 10. What this unlocks

These three identities are the only algebraic tools required to solve exponential and logarithmic equations, to differentiate and integrate functions involving logs and exponentials, and to manipulate entropy expressions in information theory.  

- Change-of-base formula  
- Logarithmic differentiation  
- Integration of rational functions of exponentials  
- Asymptotic analysis of algorithms (Master theorem)  
- Decibel and magnitude calculations in physics

## 11. Self-check — five questions, no answers

1. Prove the quotient rule starting from the product rule and the power rule with exponent \(-1\).

2. Simplify \(\log_8 4 + \log_8 16\) to a single number without using a calculator.

3. Show that \(\log_b a + \log_a b = \frac{\log a}{\log b} + \frac{\log b}{\log a}\) is always at least 2 for \(a,b>0\), \(a,b\neq1\).

4. Identify the first incorrect step in the following chain:  
   \(\log(x+y)=\log x+\log y=\log(xy)\).

5. Express \(\ln\sqrt[3]{\frac{e^2}{x^5}}\) as a linear combination of \(\ln e\) and \(\ln x\).