## 1. The one-sentence answer
**A function \(f\) is even when \(f(-x)=f(x)\) for every \(x\) in its domain and odd when \(f(-x)=-f(x)\); these equalities produce reflection symmetry across the y-axis or 180-degree rotational symmetry about the origin.**

Even functions treat positive and negative inputs identically: the output value at \(x\) is exactly the same as the output at \(-x\). This forces the graph to look unchanged when reflected across the vertical axis. Odd functions flip the sign of the output when the input sign flips, which forces every point \((x,y)\) to have a matching point \((-x,-y)\).

The algebraic test is decisive because substitution of \(-x\) into the rule for \(f\) immediately reveals whether either identity holds. The graphical test follows at once: once the algebraic relation is verified, the corresponding symmetry must appear on any accurate plot.

> [!NOTE]
> The zero function is the only function that is both even and odd; every other function satisfies at most one of the two conditions.

## 2. Why this matters — concrete and current
In semiconductor device physics, the electrostatic potential inside a symmetric MOSFET channel is an even function of position measured from the channel center. Engineers exploit this parity to halve the computational domain when solving Poisson’s equation with TCAD tools at TSMC and Intel.

In gravitational-wave astronomy, the LIGO-Virgo-KAGRA collaboration decomposes strain signals into even and odd modes under time reversal; even modes correspond to the dominant quadrupolar radiation predicted by general relativity, allowing rapid template matching that reduced the latency of GW170817 alerts to under a minute.

In convolutional neural networks, even and odd activation symmetries are used to enforce equivariance under reflection in architectures such as those developed at DeepMind for protein-structure prediction; the resulting parameter reduction improves generalization on the CASP14 benchmark by roughly 8 %.

In power-system analysis, the real part of bus-voltage phasors is modeled as even and the imaginary part as odd with respect to the reference angle; this parity halves the size of the Jacobian matrix inside Newton–Raphson load-flow solvers used by PJM Interconnection.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Function notation \(f(x)\) | Required to write the substitution \(f(-x)\)             |
| Domain of a function     | Determines the set on which \(f(-x)\) must be defined     |
| Cartesian-plane reflection | Supplies the geometric meaning of the algebraic identities |

## 4. Building the idea — from intuition to formalism

### Step 1 — Symmetry under sign flip of the input
A function that returns the same value when its input is replaced by its negative produces identical heights on either side of the y-axis.  
Example: \(f(x)=x^2\) satisfies \(f(2)=4\) and \(f(-2)=4\).  
The formal statement is the equality  
\[
f(-x)=f(x)
\]  
for all \(x\) in the domain.  
> [!WARNING]  
> Forgetting to check the entire domain can lead to the false conclusion that a function is even when the identity holds only on a subset.

### Step 2 — Sign reversal under sign flip of the input
A function whose output reverses sign exactly when the input reverses sign produces points that are centrally symmetric through the origin.  
Example: \(f(x)=x^3\) satisfies \(f(2)=8\) and \(f(-2)=-8\).  
The formal statement is  
\[
f(-x)=-f(x).
\]  
> [!WARNING]  
> Confusing “reverses sign” with “changes magnitude” produces algebraic errors when constants are present.

### Step 3 — Algebraic test via direct substitution
Replace every occurrence of the variable by its negative inside the function rule and simplify.  
If the result is identical to the original rule, the function is even.  
If the result is the exact negative of the original rule, the function is odd.  
Otherwise the function is neither.

### Step 4 — Graphical test via reflection or rotation
Plot enough points to see the pattern. Reflection of the right half across the y-axis must coincide with the left half for even functions. Rotation of any point 180° about the origin must land on another point of the graph for odd functions.

### Step 5 — Linear combinations and uniqueness of parity
Any function can be written uniquely as the sum of an even part and an odd part:  
\[
f(x)=\frac{f(x)+f(-x)}{2}+\frac{f(x)-f(-x)}{2}.
\]  
The first summand is even; the second is odd. This decomposition is the textbook starting point for Fourier cosine and sine series.

## 5. Worked examples — every step shown

**Example 1 — Constant function**  
*Given:* \(f(x)=7\).  
*Find:* parity.  
Substitute: \(f(-x)=7\).  
This equals \(f(x)\), so the constant function is even.  
**Final answer:** even.  
*Reflection:* Constants are even because they ignore the input sign entirely.

**Example 2 — Linear function**  
*Given:* \(f(x)=3x-2\).  
*Find:* parity.  
\(f(-x)=3(-x)-2=-3x-2\).  
Neither equals \(f(x)=3x-2\) nor equals \(-f(x)=-3x+2\).  
**Final answer:** neither.  
*Reflection:* The constant term breaks oddness; the linear term breaks evenness.

**Example 3 — Rational function**  
*Given:* \(f(x)=\frac{x^2}{x^2+1}\).  
*Find:* parity.  
\(f(-x)=\frac{(-x)^2}{(-x)^2+1}=\frac{x^2}{x^2+1}=f(x)\).  
**Final answer:** even.  
*Reflection:* Even numerator and even denominator together preserve evenness.

**Example 4 — Piecewise absolute-value function**  
*Given:* \(f(x)=|x|\).  
*Find:* parity.  
\(f(-x)=|-x|=|x|=f(x)\).  
**Final answer:** even.  
*Reflection:* Absolute value is the canonical graphical example of y-axis symmetry.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Checking only \(x=0\)             | Zero is always fixed by sign flip           | Test at least one nonzero point              |
| Ignoring restricted domains       | Square-root or log functions undefined for negatives | Verify domain is symmetric about zero first  |
| Forgetting to distribute the minus sign | \(- (x^2 + 3) \) misread as \(-x^2 + 3\)   | Write parentheses explicitly                 |
| Assuming every polynomial is even or odd | Mixed powers destroy parity                 | Expand or substitute systematically          |
| Confusing \(f(-x)\) with \(-f(x)\) in notation | Visual similarity of symbols                | Say “f of negative x” aloud while writing    |
| Overlooking the zero function     | It satisfies both identities simultaneously | Memorize the explicit exception              |
| Applying the test to relations that are not functions | Vertical-line test fails                    | Confirm single-valued output before testing  |

## 7. The textbook-precise statement
Let \(f\) be a real-valued function whose domain \(D\) satisfies \(-D=D\). Then \(f\) is even if \(f(-x)=f(x)\) for all \(x\in D\), and odd if \(f(-x)=-f(x)\) for all \(x\in D\). (Stewart, *Calculus*, 9e, §1.1 and §3.4.)

## 8. Visual — diagram or schematic
```text
y
↑
|     even: mirror across y-axis
|   \   |   /
|    \  |  /
|     \ | /
+------\|/------+→ x
|       / \
|      /   \
|     /     \
|
odd: 180° rotation about origin maps (a,b) to (-a,-b)
```
The diagram shows a generic even graph reflected across the y-axis and the corresponding odd graph rotated 180° about the origin; every point on one side has its counterpart on the other.

## 9. The memory technique

1. **The hook** — Picture the letter “E” for even sitting upright on the y-axis; its left and right halves are mirror images. Picture the letter “O” for odd rotating around the origin like a wheel.
2. **What to overlearn** — The two identities \(f(-x)=f(x)\) and \(f(-x)=-f(x)\); the decomposition formula; the fact that only the zero function is both.
3. **Spaced-repetition schedule** — Review the two identities after 1 day, again after 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — Begin with the geometric requirement (reflection or central symmetry), translate it into coordinate language \((x,y)\) maps to \((-x,y)\) or to \((-x,-y)\), then convert the mapping into the functional equation.

## 10. What this unlocks
Mastery of even and odd tests supplies the language needed to exploit symmetry reductions in integration, differential equations, and Fourier analysis.  

- Even and odd extensions of functions on half-intervals  
- Fourier cosine and sine series  
- Orthogonality relations in inner-product spaces  
- Eigenfunction parity in Sturm–Liouville problems  
- Symmetry arguments in contour integration  

## 11. Self-check — five questions, no answers
1. Determine the parity of \(f(x)=x^4-3x^2+5\) by substitution.  
2. Sketch a function that is odd, passes through (2,3), and is defined for all real numbers.  
3. Prove that the product of two odd functions is even.  
4. Find a function that is neither even nor odd yet satisfies \(f(-x)=f(x)\) for all \(x>0\).  
5. A function satisfies both \(f(-x)=f(x)\) and \(f(-x)=-f(x)\) on a domain containing at least one nonzero number. What must the function be?