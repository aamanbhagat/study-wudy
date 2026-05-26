## 1. The one-sentence answer
**The Frobenius method constructs series solutions to second-order linear ODEs about regular singular points by inserting a trial form \( y = x^r \sum_{n=0}^\infty a_n x^n \) and determining the admissible exponents \( r \) from an indicial equation.**

A point \( x_0 \) where the coefficient functions fail to be analytic is called a singular point. When the singularity is mild enough that \( (x-x_0)P(x) \) and \( (x-x_0)^2 Q(x) \) remain analytic, the equation still admits at least one solution that behaves like a power times a power series; the method simply augments the ordinary power-series ansatz with the unknown power \( r \).

The indicial equation is quadratic and supplies the two possible leading exponents. Once those exponents are known, the recurrence for the coefficients \( a_n \) proceeds exactly as in the analytic-coefficient case, except that the lowest-order balance has already been removed.

> [!NOTE]
> The indicial roots encode the leading singular or regular behaviour; everything else is then fixed by a recurrence that never looks back at the singularity itself.

## 2. Why this matters — concrete and current
In orbital mechanics, the two-body problem with atmospheric drag yields a radial equation whose only singular point lies at the origin; the indicial root \( r = -1 \) immediately produces the correct leading decay of the perturbation series used by SpaceX trajectory software.

Quantum mechanics textbooks still derive the radial hydrogen wave functions by applying the Frobenius method to the associated Laguerre equation at its regular singular point \( r = 0 \); the indicial root \( r = l+1 \) enforces the correct centrifugal barrier.

Bessel functions of the first kind appear in the design of circular waveguides and in the scattering cross-sections computed by every microwave-engineering package; their series expansion about the regular singular point at the origin is obtained in one pass by the Frobenius procedure.

In semiconductor physics the radial Schrödinger equation for a hydrogenic impurity in a quantum dot again possesses a regular singular point at the origin; the method supplies the correct envelope function that enters every subsequent effective-mass calculation.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Analytic function        | Guarantees that the coefficient series converge in a disk |
| Ordinary power-series solution | Supplies the recurrence machinery that Frobenius merely augments |
| Classification of singular points | Identifies precisely when the indicial equation exists    |
| Euler–Cauchy equation    | Gives the exactly solvable model whose solutions are pure powers \( x^r \) |

## 4. Building the idea — from intuition to formalism

### Step 1 — Singular points block ordinary power series
If the coefficients \( P(x) \) and \( Q(x) \) are analytic at \( x_0 \), every solution is analytic there and an ordinary power series works. When either coefficient diverges, the same ansatz usually produces inconsistent recurrence relations at the lowest orders.

Consider \( x^2 y'' + x y' + (x^2 - n^2) y = 0 \) (Bessel). Substituting \( y = \sum a_k x^k \) yields a contradiction in the constant term unless an extra factor \( x^r \) is inserted.

Formally, \( x_0 \) is a singular point whenever \( P \) or \( Q \) fails to be analytic at \( x_0 \).

> [!WARNING]
> Treating a singular point as regular and forcing an ordinary power series produces either division by zero or an empty solution set.

### Step 2 — Regular versus irregular singularities
Multiply the standard form \( y'' + P y' + Q y = 0 \) by \( x^2 \) (assuming \( x_0 = 0 \)). The point is regular singular precisely when the new coefficients \( xP \) and \( x^2 Q \) are analytic.

For Bessel’s equation the products are \( x \) and \( x^2 - n^2 \), both analytic, so the origin is regular singular.

> [!WARNING]
> If \( xP \) or \( x^2 Q \) still diverges, the singularity is irregular and the Frobenius ansatz fails; logarithmic or more exotic factors appear.

### Step 3 — The indicial ansatz
Assume a solution of the form
\[
y = x^r \sum_{n=0}^\infty a_n x^n, \quad a_0 \ne 0.
\]
The unknown real number \( r \) absorbs the leading singular behaviour.

Differentiate term-by-term and substitute into the cleared equation; the lowest-order term must vanish independently of the series.

### Step 4 — The indicial equation
After substitution the coefficient of the lowest power \( x^r \) yields a quadratic equation in \( r \):
\[
r(r-1) + p_0 r + q_0 = 0,
\]
where \( p_0 \) and \( q_0 \) are the constant terms of the analytic functions \( xP(x) \) and \( x^2 Q(x) \).

The two roots \( r_1, r_2 \) are the only admissible leading exponents.

> [!WARNING]
> Omitting the constant terms \( p_0, q_0 \) produces the wrong quadratic and therefore the wrong leading behaviour.

### Step 5 — Recurrence and the second solution
With \( r \) fixed, every higher coefficient \( a_n \) is determined by a linear recurrence. When the roots differ by an integer the smaller root may force all coefficients to vanish, signalling that a second independent solution must contain a logarithm.

The textbook theorem states: if \( x = 0 \) is a regular singular point, then at least one solution of Frobenius type exists; a second linearly independent solution is either another Frobenius series or that series multiplied by \( \ln x \).

## 5. Worked examples — every step shown

**Example 1 — Euler–Cauchy equation**
*Given:* \( x^2 y'' - 3x y' + 3y = 0 \).  
*Find:* series solution about \( x=0 \).

Assume \( y = x^r \sum a_n x^n \).  
Differentiate: \( y' = \sum (n+r) a_n x^{n+r-1} \), \( y'' = \sum (n+r)(n+r-1) a_n x^{n+r-2} \).  
*Why:* term-by-term differentiation is valid inside the radius of convergence.  
Substitute and collect powers: lowest term \( [r(r-1) - 3r + 3] a_0 x^r = 0 \).  
*Why:* all higher powers contain positive powers of \( x \) and cannot cancel the constant term.  
Indicial equation: \( r^2 - 4r + 3 = 0 \).  
Roots: \( r=1,3 \).  
For \( r=1 \), recurrence gives \( a_n = 0 \) for \( n\ge 1 \).  
Solution: \( y_1 = x \).  
For \( r=3 \), likewise \( y_2 = x^3 \).  

**\( y = c_1 x + c_2 x^3 \)**

*Reflection:* The equation is exactly solvable; the method recovers the exact monomials.

**Example 2 — Bessel equation of order zero**
*Given:* \( x^2 y'' + x y' + x^2 y = 0 \).  
*Find:* Frobenius series.

Indicial equation: \( r^2 = 0 \), repeated root \( r=0 \).  
Recurrence: \( a_{2k} = (-1)^k a_0 / (2^{2k} (k!)^2) \), odd coefficients zero.  
Series: \( J_0(x) = \sum_{k=0}^\infty (-1)^k (x/2)^{2k} / (k!)^2 \).

**\( J_0(x) \)**

*Reflection:* Repeated root forces the second solution to contain \( \ln x \).

**Example 3 — Indicial roots differing by integer**
*Given:* \( x y'' + y' - y = 0 \).  
*Find:* both solutions.

Indicial: \( r^2 = 0 \).  
One solution is the exponential series with \( r=0 \).  
Second solution requires logarithmic term: \( y_2 = y_1 \ln x + \sum b_n x^n \).

**\( y_1 = \sum x^n / (n!)^2 \), \( y_2 = y_1 \ln x + \dots \)**

*Reflection:* Difference of roots is zero, the borderline case.

**Example 4 — Non-integer roots**
*Given:* \( 2x^2 y'' + 3x y' - (x+1) y = 0 \).  
*Find:* general solution about zero.

Indicial: \( 2r(r-1) + 3r - 1 = 0 \), roots \( r = 1/2, -1 \).  
Two independent Frobenius series exist.

**\( y = c_1 x^{1/2} \sum a_n x^n + c_2 x^{-1} \sum b_n x^n \)**

*Reflection:* Distinct non-integer roots guarantee two pure power-series solutions.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to multiply by \( x^2 \) before reading \( p_0, q_0 \) | Habit from regular-point problems           | Always clear the leading coefficient first   |
| Using the larger root first when roots differ by integer | Recurrence may force all coefficients to vanish | Test the smaller root first                  |
| Assuming both solutions are Frobenius series | Logarithmic case is invisible until recurrence fails | Check difference of roots before declaring   |
| Shifting index incorrectly        | Off-by-one error in recurrence              | Write three consecutive terms explicitly     |
| Ignoring radius of convergence    | Series may terminate or diverge             | Compute ratio test on recurrence             |
| Treating irregular singular points with Frobenius | Method is simply invalid                    | Verify analyticity of \( xP \) and \( x^2 Q \) first |
| Dropping the \( a_0 \ne 0 \) condition | Zero solution masquerades as valid          | Normalise \( a_0 = 1 \) at the outset        |

## 7. The textbook-precise statement
Let the equation be
\[
x^2 y'' + x p(x) y' + q(x) y = 0,
\]
where \( p \) and \( q \) are analytic at \( x=0 \) with Taylor expansions \( p(x) = \sum p_k x^k \), \( q(x) = \sum q_k x^k \). Then there exists at least one solution of the form
\[
y = x^r \sum_{n=0}^\infty a_n x^n, \quad a_0 \ne 0,
\]
where \( r \) satisfies the indicial equation
\[
r(r-1) + p_0 r + q_0 = 0.
\]
A second linearly independent solution is either another series of the same type or that series multiplied by \( \ln x \). (Boyce & DiPrima, *Elementary Differential Equations*, 11e, §6.4.)

## 8. Visual — diagram or schematic
```text
x=0 (regular singular)
          | analytic
p(x), q(x) |
          v
xP(x) analytic   x²Q(x) analytic
          |               |
          +---------------+
                  |
         Indicial quadratic
                  |
         two roots r1 ≥ r2
                  |
     Frobenius series (r1)   or   ln|x|·series (r2)
```

## 9. The memory technique
1. **The hook** — picture an archaeological dig: the indicial roots are the two “depths” at which you first strike solid ground; once you have the depth, the rest of the series is just shovelling upward.
2. **What to overlearn** — the indicial equation \( r(r-1) + p_0 r + q_0 = 0 \); the statement that \( xP \) and \( x^2 Q \) analytic is exactly the definition of regular singular.
3. **Spaced-repetition schedule** — review the definition and indicial equation at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — return to the cleared equation, collect the coefficient of the single lowest power \( x^r \), set it to zero; that quadratic is the indicial equation.

## 10. What this unlocks
Mastery of the Frobenius method lets you generate the special-function series (Bessel, Legendre, hypergeometric) that appear throughout physics and engineering, and supplies the rigorous starting point for asymptotic matching and WKB approximations.

- Next: Frobenius method at irregular singular points (asymptotic series)
- Next: Sturm–Liouville theory and eigenfunction expansions
- Next: Laplace-transform solutions of equations with regular singular points

## 11. Self-check — five questions, no answers
1. Classify the point \( x=0 \) for the equation \( x^3 y'' + x^2 y' + y = 0 \).
2. Write the indicial equation for \( x y'' + (1+x) y' - y = 0 \).
3. For which difference of indicial roots does the method guarantee two distinct Frobenius series?
4. In Example 3 above, why does the recurrence for the smaller root fail?
5. Derive the indicial equation directly from the original coefficients \( P(x) \) and \( Q(x) \) without first multiplying through by \( x^2 \).