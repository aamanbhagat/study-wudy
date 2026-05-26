## 1. The one-sentence answer
**Trigonometric integrals of the form ∫ sin^m(x) cos^n(x) dx (and their tan/sec analogues) are reduced to elementary antiderivatives by using Pythagorean identities to exploit the parity of the exponents.**

When one exponent is odd, factor out a single factor of that function to serve as the differential of the other; the remaining even power converts directly into an algebraic expression via an identity. When both exponents are even, repeated application of half-angle identities lowers the total degree until only constants and single-angle terms remain. The same logic extends to integrals in tan(x) and sec(x) because their derivatives are again multiples of the same two functions, closing the substitution loop.

The decisive observation is that the circle relation sin²θ + cos²θ = 1 (or its tan/sec form) always supplies an algebraic bridge between the two factors; parity simply determines whether that bridge yields a substitution or a power-reduction.

> [!NOTE]
> The method succeeds precisely because the derivative of one trigonometric function is a constant multiple of the other; this single structural fact turns every even power into a polynomial in the remaining function after substitution.

## 2. Why this matters — concrete and current
In aerospace trajectory optimization, NASA’s General Mission Analysis Tool integrates expressions containing sin^m θ cos^n θ that arise when transforming Keplerian orbital elements into Cartesian coordinates under oblate-Earth gravity models.  

Semiconductor lithography simulators at ASML solve wave-propagation integrals whose angular spectrum contains even powers of sine and cosine; these are reduced via the techniques below before numerical quadrature, cutting runtime by roughly 40 percent on each mask layout.  

Machine-learning libraries such as TensorFlow Probability evaluate Fourier-feature mappings for periodic data; the underlying integrals of sin^m(x)cos^n(x) appear when computing exact moments of wrapped-normal distributions used in robotics orientation estimation.  

High-energy physics Monte Carlo generators (e.g., MadGraph5_aMC@NLO) repeatedly integrate matrix elements that reduce to tan^k θ sec^m θ forms after Feynman-parameterization; analytic reduction via the methods here supplies cross-checks against purely numerical results.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Pythagorean identities   | Supply the algebraic relation that converts even powers into polynomials |
| Chain rule / substitution| Converts the saved odd factor into du                     |
| Basic antiderivatives of sin, cos, tan, sec | Serve as the terminal case once reduction is complete     |

## 4. Building the idea — from intuition to formalism

### Step 1 — The parity test
An exponent is odd when it is not divisible by two.  
Example: ∫ sin³x cos²x dx has odd power on sine.  
Formal statement: if m is odd, write m = 2k+1 and isolate one sin x factor.  
> [!WARNING]
> Treating an even exponent as odd produces an unsimplifiable square root after substitution.

### Step 2 — Saving the odd factor for substitution
Factor sin x dx when m odd; replace the remaining even power of sine by (1 − cos²x)^k.  
Example: sin³x = sin x · (1 − cos²x).  
Formal statement: ∫ sin^{2k+1}x cos^n x dx = ∫ (1 − cos²x)^k cos^n x sin x dx.  
> [!WARNING]
> Reversing the roles (saving cosine when sine is odd) yields a more complicated substitution.

### Step 3 — The substitution itself
Let u = cos x, then du = −sin x dx.  
The integral collapses to a polynomial in u.  
Formal statement: ∫ (1 − u²)^k u^n (−du).  
> [!WARNING]
> Forgetting the minus sign from du produces an incorrect sign in the final antiderivative.

### Step 4 — Even–even case via power reduction
Both exponents even ⇒ apply the identities sin²θ = (1 − cos 2θ)/2 and cos²θ = (1 + cos 2θ)/2 repeatedly.  
Formal statement: each application lowers total degree by 2.  
> [!WARNING]
> Stopping after one reduction when further reductions are possible leaves an unevaluated even-power integral.

### Step 5 — Tan/sec identities
The relation 1 + tan²θ = sec²θ plays the role of the Pythagorean identity.  
When secant is even, save sec²θ for du = sec θ tan θ dθ after writing everything in tan θ.  
Formal statement: ∫ tan^m θ sec^n θ dθ with n even reduces to ∫ u^m (1 + u²)^{(n−2)/2} du.  
> [!WARNING]
> Applying the sine-cosine method to a tan/sec integral forces unnecessary Weierstrass substitutions.

### Step 6 — The general decision procedure
Test parity of m and n first; if either odd, substitute; if both even, reduce powers; if the integrand is already in tan/sec, test parity of the secant power.  
This exhausts all cases that possess elementary antiderivatives.

## 5. Worked examples — every step shown

**Example 1 — Odd sine power**  
*Given:* ∫ sin³x cos²x dx  
*Find:* the antiderivative.  
Step 1: sin³x = sin x (1 − cos²x)  
*Why:* isolates the differential factor.  
Step 2: ∫ (1 − cos²x) cos²x sin x dx  
*Why:* even power converted algebraically.  
Step 3: u = cos x, du = −sin x dx → −∫ (1 − u²) u² du  
*Why:* substitution replaces the trig integral by a polynomial.  
Step 4: −∫ (u² − u⁴) du = −(u³/3 − u⁵/5) + C  
*Why:* standard power rule.  
**−(cos³x)/3 + (cos⁵x)/5 + C**

*Reflection:* The only non-obvious move was recognizing that the remaining even power becomes a polynomial; the same pattern generalizes to any odd exponent.

**Example 2 — Both even**  
*Given:* ∫ sin²x cos²x dx  
*Find:* the antiderivative.  
Step 1: sin²x cos²x = (sin x cos x)² = (½ sin 2x)² = ¼ sin² 2x  
*Why:* product-to-double-angle identity.  
Step 2: ¼ · (1 − cos 4x)/2 = (1/8)(1 − cos 4x)  
*Why:* second power-reduction.  
Step 3: ∫ (1/8 − (1/8)cos 4x) dx = x/8 − (1/32)sin 4x + C  
*Why:* term-by-term integration.  
**x/8 − (1/32)sin 4x + C**

*Reflection:* Two successive reductions were required; counting total degree (4) predicts exactly two halvings.

**Example 3 — Odd secant power**  
*Given:* ∫ tan³x sec⁴x dx  
*Find:* the antiderivative.  
Step 1: sec⁴x = sec²x · sec²x = (1 + tan²x) sec²x  
*Why:* identity supplies the factor for du.  
Step 2: ∫ tan³x (1 + tan²x) sec²x dx  
*Why:* substitution-ready form.  
Step 3: u = tan x, du = sec²x dx → ∫ u³(1 + u²) du  
*Why:* direct replacement.  
Step 4: ∫ (u³ + u⁵) du = u⁴/4 + u⁶/6 + C  
*Why:* polynomial antiderivative.  
**tan⁴x/4 + tan⁶x/6 + C**

*Reflection:* The secant exponent being even dictated saving sec²x rather than tan x.

**Example 4 — Mixed tan/sec with reduction**  
*Given:* ∫ tan⁴x sec³x dx  
*Find:* the antiderivative (requires integration by parts after reduction).  
Step 1: tan⁴x = tan²x · tan²x = (sec²x − 1) tan²x  
*Why:* convert to secant for later steps.  
Step 2: ∫ (sec²x − 1) tan²x sec³x dx = ∫ (sec⁵x tan²x − sec³x tan²x) dx  
*Why:* split into two standard forms.  
Step 3: each term is reduced by saving sec²x and integrating by parts on the resulting odd power of secant.  
*Why:* even power of tan already eliminated.  
**Final result after parts:** (sec³x tan²x)/3 − (sec³x)/3 + (1/3)ln|sec x + tan x| + C (up to constants)

*Reflection:* The combination of even tan power and odd sec power forces a hybrid reduction-plus-parts strategy.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Saving the wrong function when both exponents odd | Habit of always saving sine                 | Test which function’s derivative matches the other factor |
| Dropping the minus sign from du   | Forgetting chain-rule constant              | Write du = … explicitly before substituting  |
| Applying power reduction to an odd exponent | Misreading parity                           | Circle the exponents and label “odd/even” first |
| Using sin² + cos² = 1 on tan/sec integrand | Identity mismatch                           | Switch immediately to 1 + tan² = sec²        |
| Stopping reduction too early      | Not counting total degree                   | Write the degree after each halving          |
| Confusing ∫ sec x dx with ∫ sec³ x dx | Both appear “standard”                      | Memorize that sec³ x requires integration by parts |
| Sign error in back-substitution   | Losing track of u = cos x versus sin x      | Keep the original variable visible beside u  |

## 7. The textbook-precise statement
Let m, n be non-negative integers. The indefinite integral ∫ sin^m x cos^n x dx is elementary. If at least one of m, n is odd, the integral reduces via the substitution u = cos x (when m odd) or u = sin x (when n odd) to a polynomial integral. If both are even, repeated use of the identities sin²x = (1 − cos 2x)/2 and cos²x = (1 + cos 2x)/2 yields a finite sum of multiple-angle terms. The identical statement holds for ∫ tan^m x sec^n x dx upon replacing the Pythagorean identity by 1 + tan²x = sec²x (Stewart, *Calculus*, 9e, §7.2).

## 8. Visual — diagram or schematic
```text
Start
 │
 ▼
Is m or n odd?
 ├── Yes ──► Save odd factor → u = remaining trig → polynomial
 │
 No (both even)
 │
 ▼
Apply half-angle identities repeatedly
 │
 ▼
Single-angle or constant terms → integrate termwise
```

## 9. The memory technique

1. **The hook** — Picture an “odd man out”: the single odd-powered function is the one you push outside the parentheses to become du.  
2. **What to overlearn** — sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ, and the two half-angle formulas.  
3. **Spaced-repetition schedule** — Review the parity decision tree at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive any missing integral by writing the integrand in exponential form e^{iθ} and extracting real/imaginary parts.

## 10. What this unlocks
Mastery of these reductions supplies the algebraic engine behind Fourier coefficient calculations, Laplace-transform tables for periodic forcing functions, and the exact evaluation of elliptic-integral precursors.  

- Next: integration of products of sines and cosines of different arguments (product-to-sum identities).  
- Next: reduction formulas for ∫ sin^n x dx when n is arbitrary.  
- Next: trigonometric substitution in algebraic integrals (√(a² − x²) etc.).  
- Next: the full theory of Fourier series on [−π, π].

## 11. Self-check — five questions, no answers
1. Compute ∫ sin⁵x cos²x dx.  
2. Compute ∫ sin⁴x cos⁴x dx and verify by differentiation.  
3. Decide whether ∫ tan³x sec³x dx is elementary and, if so, outline the first two steps.  
4. Identify the error in the following attempted solution: ∫ sin²x cos³x dx = ∫ (1 − cos²x) cos³x sin x dx with u = sin x.  
5. Without integrating, determine the degree of the polynomial that appears after the substitution u = tan x in ∫ tan⁶x sec⁴x dx.