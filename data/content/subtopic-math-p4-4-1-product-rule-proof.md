## What it is
The product rule proof is the formal algebraic derivation showing that the derivative of two multiplied functions is not simply the product of their individual derivatives. It uses the limit definition of the derivative and a clever algebraic technique—adding and subtracting the same term—to establish that $\frac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)$.

## Why it matters
This proof introduces the "adding zero" technique, a foundational maneuver you will use constantly in real analysis and differential equations. Practically, the product rule is the mathematical engine behind integration by parts, deriving the conservation of momentum in physics, and calculating gradients for backpropagation in machine learning. You cannot do vector calculus without it.

## When to study it
You must be completely comfortable with:
*   The limit definition of the derivative: $f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$
*   Limit laws (specifically, that the limit of a sum is the sum of the limits, and the limit of a product is the product of the limits).
*   Factoring algebraic expressions.

If you cannot write down the limit definition of a derivative from memory, stop and review that first.

## How to study it (step by step)
1. Write out the limit definition of the derivative for a combined function $P(x) = f(x)g(x)$.
2. Stare at the numerator: $f(x+h)g(x+h) - f(x)g(x)$. Realize you cannot factor this as is.
3. Inject the "add zero" trick: subtract and add $f(x+h)g(x)$ in the middle of the numerator.
4. Split the fraction into two separate terms.
5. Factor out the common terms in each fraction ($f(x+h)$ in the first, $g(x)$ in the second).
6. Apply the limit as $h \to 0$ to each piece individually, recognizing the definitions of $f'(x)$ and $g'(x)$.
7. Draw the geometric rectangle model (below) to prove to yourself *why* the algebra works.

## Key ideas, with intuition
*   **The "Add Zero" Trick:** In mathematical analysis, when you are stuck bridging two terms, you often add and subtract a cross-term. Here, adding $- f(x+h)g(x) + f(x+h)g(x)$ acts as a stepping stone between the fully incremented state $f(x+h)g(x+h)$ and the base state $f(x)g(x)$. It allows you to decouple the simultaneous changes in $f$ and $g$.
*   **The Geometric Area Intuition:** Imagine a rectangle with width $f(x)$ and height $g(x)$. Its area is $A = f(x)g(x)$. If you increase $x$ by a tiny amount $\Delta x$, the width grows by $\Delta f$ and the height grows by $\Delta g$.
*   The new area is $(f + \Delta f)(g + \Delta g) = fg + f\Delta g + g\Delta f + \Delta f \Delta g$.
*   The *change* in area is the new area minus the old area: $\Delta A = f\Delta g + g\Delta f + \Delta f \Delta g$. As the changes become infinitesimally small, the $\Delta f \Delta g$ term (a tiny corner rectangle) vanishes much faster than the rest, leaving $f dg + g df$.

## Worked example
**Goal:** Prove $\frac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)$.

**Step 1:** Set up the limit definition for the product.
$$ \frac{d}{dx}[f(x)g(x)] = \lim_{h \to 0} \frac{f(x+h)g(x+h) - f(x)g(x)}{h} $$

**Step 2:** Add zero in the numerator by subtracting and adding $f(x+h)g(x)$.
$$ = \lim_{h \to 0} \frac{f(x+h)g(x+h) - f(x+h)g(x) + f(x+h)g(x) - f(x)g(x)}{h} $$

**Step 3:** Group the terms and split the fraction.
$$ = \lim_{h \to 0} \left[ \frac{f(x+h)g(x+h) - f(x+h)g(x)}{h} + \frac{f(x+h)g(x) - f(x)g(x)}{h} \right] $$

**Step 4:** Factor out the common terms from each numerator.
$$ = \lim_{h \to 0} \left[ f(x+h)\frac{g(x+h) - g(x)}{h} + g(x)\frac{f(x+h) - f(x)}{h} \right] $$

**Step 5:** Apply the limit. As $h \to 0$, $f(x+h) \to f(x)$. The difference quotients become the derivatives $g'(x)$ and $f'(x)$.
$$ = f(x)g'(x) + g(x)f'(x) $$

**Reflection:** The "add zero" trick allowed us to hold one function at the $(x+h)$ state and the other at the $x$ state. This isolated the individual rates of change, turning a complex simultaneous change into two simple, independent derivatives.

## Diagrams
```text
      f(x)             Δf
+-------------------+-------+
|                   |       |
|      f(x)Δg       | ΔfΔg  | Δg
|                   |       |
+-------------------+-------+
|                   |       |
|                   |       |
|     f(x)g(x)      | g(x)Δf| g(x)
|                   |       |
|                   |       |
+-------------------+-------+
```
The large bottom-left rectangle is the original area $f(x)g(x)$. When $x$ changes, $f$ grows by $\Delta f$ (rightward) and $g$ grows by $\Delta g$ (upward). The change in area consists of three new rectangles: the top strip ($f(x)\Delta g$), the right strip ($g(x)\Delta f$), and the tiny top-right corner ($\Delta f \Delta g$). Divide by $\Delta x$ and let it approach zero; the corner vanishes, yielding the product rule.

## Memory technique — remember this forever
1. **Mnemonic:** "Left d-Right plus Right d-Left." (The left function times the derivative of the right, plus the right function times the derivative of the left).
2. **Formulas to overlearn:** 
   $$ (uv)' = u'v + uv' $$
3. **Spaced-repetition schedule:** Review this derivation at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you ever blank on the algebraic proof, draw the rectangle. 
   * Area = $uv$. 
   * New Area = $(u+du)(v+dv) = uv + u\,dv + v\,du + du\,dv$. 
   * Subtract the old area $uv$ to get the change: $u\,dv + v\,du + du\,dv$. 
   * Divide by $dx$ and drop the $du\,dv$ term (because an infinitesimal squared is zero). 
   * Result: $u\frac{dv}{dx} + v\frac{du}{dx}$.

## Common mistakes
*   **The Freshman's Dream:** Assuming $(fg)' = f'g'$. This ignores the cross-terms of the expanding rectangle. The derivative of an area is not just the product of the changing sides.
*   **Forgetting the limit on the factored term:** In Step 5, students often leave $f(x+h)g'(x)$ in the final answer because they forget to apply $\lim_{h \to 0}$ to the $f(x+h)$ term sitting outside the difference quotient.
*   **Memorizing without the geometry:** Memorizing the "add zero" trick as pure algebra makes it brittle. If you remember the rectangle, you will intuitively know *why* you are adding and subtracting a cross-term.

## Self-check
1. Reproduce the algebraic proof, but this time, "add zero" by subtracting and adding $f(x)g(x+h)$ instead of $f(x+h)g(x)$. Does the proof still work? Show the steps.
2. Explain geometrically, using the rectangle model, why the term $\frac{\Delta f \Delta g}{\Delta x}$ disappears when taking the limit as $\Delta x \to 0$.
3. Using the limit definition and the product rule proof techniques, derive the derivative of three multiplied functions: $\frac{d}{dx}[f(x)g(x)h(x)]$.