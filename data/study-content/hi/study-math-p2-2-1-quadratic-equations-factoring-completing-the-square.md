## 1. The one-sentence answer
**Quadratic equations are equations of the form \(ax^2 + bx + c = 0\) (with \(a \neq 0\)) that you solve by rewriting them as a product of linear factors or by turning them into a perfect square.**

A quadratic equation always has degree two, so its graph is a parabola. Factoring works when the quadratic splits cleanly into two binomials whose product is zero; each binomial then gives one root. Completing the square works for any quadratic: you add and subtract a constant term to create \((x + k)^2\) on one side, after which taking square roots immediately yields the solutions. Both routes give the exact roots without approximation.

The real power appears when you compare them: factoring is fast for integer coefficients that cooperate, while completing the square always succeeds and directly produces the vertex form \(a(x - h)^2 + k\). This vertex form later becomes the bridge to the quadratic formula and to graphing.

> [!NOTE]
> The deepest insight is that every quadratic can be rewritten as a scaled and shifted square; once you see the equation as \(a(x - h)^2 = m\), the two roots appear symmetrically around the vertex \(h\).

## 2. Why this matters — concrete and current
In aerospace trajectory planning at NASA’s Jet Propulsion Laboratory, projectile equations under constant gravity are solved by completing the square to locate the exact apex time without numerical iteration.  

Semiconductor firms such as TSMC use quadratic models of carrier mobility versus doping concentration; factoring these quadratics lets process engineers isolate the two critical doping thresholds that determine device yield.  

In reinforcement-learning libraries (e.g., Stable-Baselines3), the advantage function in policy-gradient methods reduces to a quadratic loss whose minimum is found by completing the square, giving a closed-form update for the value baseline.  

Modern portfolio theory at firms such as BlackRock expresses variance of a two-asset portfolio as a quadratic in the weight \(w\); completing the square reveals the minimum-variance weight in one algebraic step, which is then coded directly into rebalancing algorithms.  

In fundamental physics, the Schrödinger equation for the harmonic oscillator is reduced to a quadratic characteristic equation; factoring supplies the energy eigenvalues \(E_n = \hbar\omega(n + 1/2)\) that underwrite every quantum-optics experiment.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Linear equations         | You must isolate terms and move constants correctly       |
| Polynomial multiplication| Reverse of factoring; you verify roots by expanding       |
| Square-root definition   | Completing the square ends with \(\sqrt{\text{number}}\)  |
| Coefficient arithmetic   | Signs and fractions appear constantly; accuracy matters   |

If any row above feels shaky, pause and review that single concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Recognise the standard form
A quadratic equation is any equation that can be written \(ax^2 + bx + c = 0\) where \(a \neq 0\). The coefficient \(a\) tells you the parabola opens upward or downward; \(b\) shifts it sideways; \(c\) lifts it vertically.

Example: \(2x^2 - 5x + 3 = 0\). Here \(a=2\), \(b=-5\), \(c=3\).

Formal statement:  
$$ax^2 + bx + c = 0,\qquad a\in\mathbb{R}\setminus\{0\}.$$

> [!WARNING]
> If you accidentally treat a linear term as quadratic (for instance writing \(2x - 5x + 3 = 0\)), the entire degree drops and factoring fails.

### Step 2 — Factor when possible
If two numbers \(p\) and \(q\) exist such that \(p+q = b/a\) and \(pq = c/a\), then  
$$a(x - r_1)(x - r_2) = 0$$  
where \(r_1, r_2\) are the roots. Setting each factor to zero gives the solutions.

Example: \(x^2 - 5x + 6 = 0\) factors as \((x-2)(x-3)=0\), so roots are 2 and 3.

Formal statement:  
$$ax^2 + bx + c = a(x - r_1)(x - r_2).$$

> [!WARNING]
> Sign errors in \(p\) and \(q\) flip the middle coefficient; always expand the factored form to double-check.

### Step 3 — Move the constant and prepare the square
When factoring is impossible, isolate the \(x^2\) and \(x\) terms, then divide by \(a\):  
$$x^2 + \frac{b}{a}x = -\frac{c}{a}.$$

Add \(\left(\frac{b}{2a}\right)^2\) to both sides to create a perfect square on the left.

### Step 4 — Complete the square
Left side becomes \(\left(x + \frac{b}{2a}\right)^2\). Right side is now a number, possibly negative.

Formal step:  
$$x^2 + \frac{b}{a}x + \left(\frac{b}{2a}\right)^2 = -\frac{c}{a} + \left(\frac{b}{2a}\right)^2.$$

### Step 5 — Extract roots
Take square roots of both sides and solve the resulting linear equations. You obtain  
$$x = -\frac{b}{2a} \pm \sqrt{\left(\frac{b}{2a}\right)^2 + \frac{c}{a}}.$$

This expression is algebraically identical to the quadratic formula, yet derived without memorisation.

### Step 6 — Write vertex form
The completed-square version \(a(x - h)^2 + k = 0\) directly displays the vertex \((h,k)\) and axis of symmetry \(x = h\).

## 5. Worked examples — har step show karo

**Example 1 — Simple integer factoring**  
*Given:* \(x^2 - 7x + 12 = 0\)  
*Find:* roots  

We look for two numbers that multiply to 12 and add to −7: −3 and −4.  
Thus \(x^2 - 7x + 12 = (x-3)(x-4)\).  
Set each factor to zero: \(x-3=0\) or \(x-4=0\).  
**Final answer**  
\(x=3\) or \(x=4\)  

*Reflection:* The numbers were obvious; the same pattern works whenever the discriminant is a perfect square.

**Example 2 — Leading coefficient greater than 1**  
*Given:* \(2x^2 + 7x + 3 = 0\)  
*Find:* roots  

Split the middle term: \(2x^2 + 6x + x + 3 = 0\).  
Group: \(2x(x+3) + 1(x+3) = 0\).  
Factor common binomial: \((2x+1)(x+3)=0\).  
**Final answer**  
\(x = -\frac12\) or \(x = -3\)  

*Reflection:* Always factor out the leading coefficient first; it prevents fraction mistakes later.

**Example 3 — Completing the square with fractions**  
*Given:* \(x^2 - 3x - 5 = 0\)  
*Find:* exact roots  

Divide by 1 (already monic). Add \(\left(\frac{3}{2}\right)^2 = \frac{9}{4}\):  
\(x^2 - 3x + \frac{9}{4} = 5 + \frac{9}{4} = \frac{29}{4}\).  
\((x - \frac{3}{2})^2 = \frac{29}{4}\).  
\(x - \frac{3}{2} = \pm \frac{\sqrt{29}}{2}\).  
**Final answer**  
\(x = \frac{3 \pm \sqrt{29}}{2}\)  

*Reflection:* The half-coefficient squared always produces the needed fraction; keep the common denominator.

**Example 4 — Negative constant term, irrational roots**  
*Given:* \(3x^2 - 12x - 7 = 0\)  
*Find:* roots via completing the square  

Divide by 3: \(x^2 - 4x = \frac{7}{3}\).  
Add 4: \(x^2 - 4x + 4 = \frac{7}{3} + 4 = \frac{19}{3}\).  
\((x-2)^2 = \frac{19}{3}\).  
\(x-2 = \pm \sqrt{\frac{19}{3}}\).  
**Final answer**  
\(x = 2 \pm \sqrt{\frac{19}{3}}\)  

*Reflection:* The square root of a fraction is handled by writing \(\sqrt{19}/\sqrt{3}\); rationalising is optional until graphing.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to divide by \(a\) before completing square | Students treat \(ax^2\) as if \(a=1\)       | Always divide the entire equation by \(a\) first |
| Sign error when splitting middle term | Negative \(b\) confuses the pair search     | Write the two numbers as \(p+q=b\) explicitly |
| Losing the \(\pm\) when taking square root | Forgetting one root                         | Write both \(+\) and \(-\) on the same line  |
| Mixing vertex form with standard form | \(k\) placed on wrong side                  | Keep \(a(x-h)^2 + k = 0\) until the end      |
| Arithmetic slip in \(\frac{b}{2a}\) | Fraction arithmetic under time pressure     | Compute \(\frac{b}{2a}\) on paper before squaring |
| Discarding a valid root     | Thinking “negative under square root is invalid” | Check discriminant sign only after completing square |

## 7. The textbook-precise statement
A quadratic equation \(ax^2 + bx + c = 0\) with \(a \neq 0\) possesses solutions given by the quadratic formula  
\[x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}.\]  
Equivalently, the equation may be rewritten by completing the square:  
\[a\left(x + \frac{b}{2a}\right)^2 = \frac{b^2 - 4ac}{4a},\]  
provided the discriminant \(b^2 - 4ac\) is handled according to its sign. (See Sullivan, *Algebra & Trigonometry*, 10e, §2.3.)

## 8. Visual — diagram or schematic
```text
          parabola y = x^2 - 4x - 5
               /\
              /  \
   root -1   /    \   root 5
            /      \
  vertex (2,-9) ------
```
Axis of symmetry \(x=2\) is the vertical line through the vertex; the two roots lie equidistant on either side.

## 9. The memory technique
1. **The hook** — Picture a square frame that is missing two rectangular strips; you slide those strips into place to finish the square, then the roots sit at the corners.
2. **What to overlearn** — The half-coefficient squared step: \(\left(\frac{b}{2a}\right)^2\) must be added to both sides.
3. **Spaced-repetition schedule** — Review today, day 3, day 7, day 16, day 35.
4. **First-principles fallback** — Start from \(ax^2 + bx + c = 0\), divide by \(a\), add and subtract \(\left(\frac{b}{2a}\right)^2\), then take square roots.

## 10. What this unlocks
- Derivation and use of the quadratic formula  
- Graphing parabolas in vertex form  
- Solving maximum/minimum word problems  
- Transition to higher-degree polynomials via factoring  

## 11. Self-check — five questions, no answers
1. Factor \(x^2 - 10x + 21\) and state both roots.  
2. Complete the square for \(2x^2 - 8x + 1 = 0\) and give exact roots.  
3. Why does dividing by \(a\) before completing the square preserve equality?  
4. A student obtained only one root for \(x^2 - 6x + 9 = 0\); what mistake most likely occurred?  
5. Convert \(y = 3x^2 + 12x - 7\) into vertex form and identify the vertex coordinates.