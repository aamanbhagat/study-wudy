## 1. The one-sentence answer
**Function transformations replace the input or output of a base function \(f(x)\) by arithmetic operations that rigidly move, flip, or scale its graph while preserving its essential shape.**

A vertical shift adds or subtracts a constant from every output value, sliding the entire graph up or down by that constant. A horizontal shift replaces the input \(x\) by \(x-h\), sliding the graph left or right. Reflections multiply either the input or the output by \(-1\), flipping the graph across an axis. Stretches and compressions multiply the input or output by a positive constant other than 1, expanding or squeezing distances from the axes.

These four families of operations commute in well-defined ways, so any finite sequence of them can be written as a single expression \(a f(b(x-h))+k\). The order of application matters only when both horizontal and vertical operations are present.

> [!NOTE]
> The single most important insight is that every transformation acts independently on either the domain (horizontal) or the range (vertical); once this separation is seen, the algebraic rules become mechanical rather than mysterious.

## 2. Why this matters — concrete and current
In aerospace trajectory design, NASA’s General Mission Analysis Tool models rocket altitude as a quadratic base function that is then vertically shifted by launch-pad elevation and horizontally shifted by ignition delay; the resulting closed-form expression feeds directly into real-time guidance software.

Semiconductor process engineers at TSMC describe transistor threshold-voltage curves as a base logistic function that is stretched vertically by oxide-thickness variation and reflected horizontally when the doping polarity is reversed; these transformed models are embedded in SPICE simulators used for every 3 nm chip tape-out.

In machine-learning interpretability, the activation surfaces of residual networks are routinely analyzed by applying horizontal compressions that correspond to learning-rate scaling; papers from DeepMind’s 2023 work on “function-space SGD” rely on exactly these transformations to predict training dynamics without retraining.

Seismologists at the USGS convert raw ground-motion time series into response spectra by first stretching the time axis to account for site-specific shear-wave velocity, then reflecting and shifting the amplitude axis; the resulting standardized curves determine building-code requirements across California.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Ordered pairs and function notation \(f(x)\) | Every transformation is defined by substituting into or operating on this expression. |
| Coordinate-plane geometry | Shifts, reflections, and stretches are geometric motions whose algebraic counterparts must be derived from distances to axes. |
| Domain and range         | Horizontal operations affect the domain; vertical operations affect the range; keeping them separate prevents sign errors. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Vertical translation
Adding a constant \(k\) to every output value moves every point on the graph straight up (if \(k>0\)) or down (if \(k<0\)) by \(|k|\) units.  
For \(f(x)=x^2\), the point \((1,1)\) becomes \((1,1+3)=(1,4)\) when \(k=3\).  
The transformed function is therefore  
\[g(x)=f(x)+k.\]  
> [!WARNING]  
> Treating a vertical shift as a change to the input variable instead of the output immediately produces a horizontal shift—the most common first error.

### Step 2 — Horizontal translation
Replacing the input \(x\) by \(x-h\) moves every point \(|h|\) units left (if \(h>0\)) or right (if \(h<0\)).  
For \(f(x)=x^2\), the point \((1,1)\) becomes \((1+2,1)=(3,1)\) when \(h=2\).  
The transformed function is  
\[g(x)=f(x-h).\]

### Step 3 — Reflection across an axis
Multiplying the output by \(-1\) reflects the graph across the \(x\)-axis; multiplying the input by \(-1\) reflects across the \(y\)-axis.  
Algebraically these are \(g(x)=-f(x)\) and \(g(x)=f(-x)\), respectively.

### Step 4 — Vertical scaling
Multiplying the output by a positive constant \(a\neq1\) stretches the graph away from the \(x\)-axis when \(a>1\) and compresses toward the \(x\)-axis when \(0<a<1\).  
The rule is  
\[g(x)=a f(x).\]

### Step 5 — Horizontal scaling
Multiplying the input by a positive constant \(b\neq1\) compresses the graph toward the \(y\)-axis when \(b>1\) and stretches away when \(0<b<1\).  
The rule is  
\[g(x)=f(bx).\]

### Step 6 — Composition into a single expression
Any sequence of the above operations applied to \(f\) yields the general transformed function  
\[g(x)=a f(b(x-h))+k,\]  
where the parameters act independently on domain and range.

## 5. Worked examples — every step shown

**Example 1 — Simple vertical shift**  
*Given:* \(f(x)=x^2\) and \(k=4\).  
*Find:* equation and three image points of the shifted graph.  
Start with the base: \(f(x)=x^2\).  
Add the constant to the output: \(g(x)=x^2+4\).  
*Why:* the definition of vertical translation replaces every \(y\)-value by \(y+4\).  
Evaluate at three points:  
\(g(0)=4\), \(g(1)=5\), \(g(-1)=5\).  
**\(g(x)=x^2+4\)**  
*Reflection:* the only operation performed was vertical; domain points remain unchanged.

**Example 2 — Horizontal shift combined with reflection**  
*Given:* \(f(x)=\sqrt{x}\) and \(h=3\).  
*Find:* the equation after shifting right 3 units and then reflecting across the \(x\)-axis.  
First apply the horizontal shift: \(f(x-3)=\sqrt{x-3}\).  
*Why:* replace every occurrence of \(x\) by \(x-3\).  
Now reflect: \(g(x)=-\sqrt{x-3}\).  
*Why:* multiply the entire output by \(-1\).  
**\(g(x)=-\sqrt{x-3}\)**  
*Reflection:* order matters; reflecting before shifting would have produced a different horizontal displacement.

**Example 3 — Vertical stretch followed by horizontal compression**  
*Given:* \(f(x)=|x|\), \(a=3\), \(b=2\).  
*Find:* the combined equation.  
Scale vertically first: \(3|x|\).  
*Why:* multiply output by 3.  
Then compress horizontally: \(g(x)=3|2x|\).  
*Why:* replace \(x\) by \(2x\) inside the absolute value.  
**\(g(x)=3|2x|\)**  
*Reflection:* the factor 2 inside forces every \(x\)-coordinate to be halved, independent of the vertical stretch.

**Example 4 — Full general transformation**  
*Given:* \(f(x)=x^3\), \(a=\frac12\), \(b=-1\), \(h=2\), \(k=-3\).  
*Find:* the equation and the image of the point \((1,1)\).  
Write the general form: \(g(x)=a f(b(x-h))+k\).  
Substitute parameters: \(g(x)=\frac12 f(-1\cdot(x-2))-3\).  
Insert the base: \(g(x)=\frac12[-(x-2)]^3-3\).  
*Why:* first shift input by +2, then multiply input by −1 (reflection), then scale output by ½, finally shift output by −3.  
Image of \((1,1)\): new input \(x=1\) gives argument \(-(1-2)=-(-1)=1\), cube is 1, half is ½, subtract 3 yields \(g(1)=-2.5\).  
**\(g(x)=\frac12(-(x-2))^3-3\)**  
*Reflection:* the negative sign inside the cube simultaneously reflects and scales; tracking each parameter separately prevents sign errors.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Confusing \(f(x+3)\) with a right shift | Students read “plus” as “move right”                | Always test with a concrete point: \(x=0\) moves to \(x=-3\) (left). |
| Applying reflection after scaling | Order of operations inside the expression is misread | Perform horizontal operations on the input first, then vertical on the output. |
| Treating \(a<0\) as only a reflection | Forgetting the absolute scaling factor              | Write \(a=-|a|\) explicitly; separate sign from magnitude. |
| Forgetting domain restriction after horizontal shift | New domain is not recomputed                        | After any horizontal change, solve \(b(x-h)\) inside original domain. |
| Writing \(f(x)-k\) as a horizontal shift | Mixing input and output variables                   | Keep the variable of the shift outside the function symbol. |
| Assuming stretches preserve intercepts | Vertical stretch moves y-intercept; horizontal does not | Check both intercepts after each transformation. |
| Reversing stretch/compression when \(b>1\) | Misremembering whether \(b\) compresses or stretches | Remember: larger \(b\) squeezes the graph toward the y-axis. |

## 7. The textbook-precise statement
Let \(f:\mathbb{R}\to\mathbb{R}\) be a function. For real constants \(a\neq0\), \(b\neq0\), \(h\), and \(k\), the function  
\[g(x)=a f(b(x-h))+k\]  
is obtained from \(f\) by a horizontal shift of \(h\) units, a horizontal scaling by factor \(1/|b|\), a reflection across the y-axis if \(b<0\), a vertical scaling by factor \(|a|\), a reflection across the x-axis if \(a<0\), and a vertical shift of \(k\) units. (See Stewart, *Calculus*, 9e, §1.3, Transformations of Functions.)

## 8. Visual — diagram or schematic
```
y
↑
|               g(x) = -2f(x-1)+3
|          reflected & stretched
|     •
|    / \
|   /   \
f(x) •-----•-----•
|  /       \
| /         \
|/           \
+--------------------→ x
     -1   0   1   2   3
```
The diagram shows the base V-shaped graph of an absolute-value function, the same graph after a right shift of 1, a vertical stretch by 2, a reflection across the x-axis, and an upward shift of 3. Tick marks indicate that distances from the y-axis are halved (horizontal compression implicit in the scaling) while distances from the x-axis are doubled before reflection.

## 9. The memory technique

**The hook**  
Picture the graph sitting on a table: vertical operations are “lift the table or flip it over”; horizontal operations are “slide or squeeze the table sideways.”

**What to overlearn**  
1. \(g(x)=f(x-h)\) moves right when \(h>0\).  
2. \(g(x)=a f(x)\) stretches vertically by \(|a|\).  
3. Inside the parentheses always acts horizontally; outside acts vertically.

**Spaced-repetition schedule**  
Review the four core rules at 1 day, 3 days, 7 days, 16 days, and 35 days after first mastery.

**First-principles fallback**  
If the formulas are forgotten, pick any base function (e.g., \(f(x)=x^2\)), apply one geometric change at a time to three labeled points, and read the new coordinates back into an algebraic expression.

## 10. What this unlocks
Mastery of these transformations supplies the language needed to analyze periodicity, symmetry, and asymptotic behavior of every elementary function that follows.

- Trigonometric functions and their phase shifts  
- Exponential and logarithmic graphs  
- Rational-function end behavior after shifts  
- Piecewise-defined functions built by translating standard pieces  
- Taylor polynomials centered away from zero (horizontal shift)  

## 11. Self-check — five questions, no answers
1. Write the equation of \(y=x^2\) after it has been reflected across the y-axis, compressed horizontally by a factor of 3, and shifted down 2 units.  
2. The point \((4,2)\) lies on the graph of \(y=f(x)\). Give the coordinates of its image on the graph of \(y=-3f(2x-1)+5\).  
3. Explain why \(f(-x+3)\) is not the same as \(f(-(x+3))\) and state the geometric difference.  
4. A vertical stretch by factor 2 followed by a reflection across the x-axis is performed on \(f(x)\). Show that the composite is identical to first reflecting and then stretching by 2.  
5. Determine all values of \(k\) for which the graph of \(y=|x-k|\) intersects the graph of \(y=-|x|\) at exactly one point.