## 1. The one-sentence answer
**Composition of functions chains two mappings so that the output of one becomes the input of the other.**

Think of any process that occurs in stages. First you convert an input into an intermediate value; then you convert that intermediate value into a final result. The overall effect is a single new mapping whose rule you obtain by substituting the first rule into the second. This substitution produces the two notations \(f(g(x))\) and \(g(f(x))\), which are almost never equal.

The order of the functions is fixed by the order of the stages. Reversing the stages yields a different overall mapping, exactly as reversing the order of two successive machine operations yields a different product. Domain restrictions appear automatically: the output of the inner function must lie inside the domain of the outer function, or the composition is undefined at that point.

> [!NOTE]
> The single deepest insight is that composition is not multiplication or addition; it is substitution of entire expressions, and the parentheses are not optional decoration—they encode the required order of evaluation.

## 2. Why this matters — concrete and current
In modern neural-network training, each layer applies an affine transformation followed by a nonlinear activation; the entire network is therefore the composition of dozens of such layer functions. Changing the order of two layers changes the function the network computes and can alter training dynamics by orders of magnitude, which is why frameworks such as PyTorch expose explicit `nn.Sequential` objects that enforce a chosen composition order.

In aerospace guidance, the transformation from Earth-centered inertial coordinates to body-fixed coordinates is the composition of three successive rotation matrices (yaw, pitch, roll). NASA’s Orion flight software evaluates this composition at 100 Hz; an accidental reversal of any two rotations produces an attitude error that grows quadratically with time and has caused documented trajectory-correction failures in simulation.

Semiconductor process control models the cumulative effect of sequential deposition, etch, and anneal steps as a composition of nonlinear maps from film thickness to electrical resistance. Intel’s process-control group uses these composed models to predict final transistor threshold voltage; an undetected domain violation in any intermediate map has led to over-etch predictions that scrap entire wafers.

In computer graphics, the OpenGL rendering pipeline composes model, view, and projection transformations into a single 4×4 matrix applied to every vertex. A sign error in the order of composition produces the well-known “inside-out” rendering artifact visible in many student shaders.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Definition of a function | Composition is defined only when each rule maps every element of its domain to exactly one output. |
| Function notation \(f(x)\) | The symbols \(f(g(x))\) are parsed by substituting the expression \(g(x)\) wherever the variable appears in the rule for \(f\). |
| Domain and range         | The range of the inner function must intersect the domain of the outer function, or the composition is undefined on part of the domain. |

## 4. Building the idea — from intuition to formalism

### Step 1 — A function is a rule that assigns a unique output to each allowed input
A function is completely described by its rule and the set of inputs for which the rule is defined.  
Example: \(f(x) = x^2\) with domain all real numbers.  
Formal statement:  
\[
f: D_f \to \mathbb{R},\qquad x \mapsto x^2.
\]
> [!WARNING]
> Treating “function” as merely an algebraic expression without a domain will later produce undefined compositions that look syntactically correct.

### Step 2 — Apply one function after another by feeding the output of the first into the second
Imagine two separate machines. The first produces an intermediate number; the second accepts only numbers inside its own allowed set and produces a final result.  
Example: Let \(g(x) = x+1\). Feed the output of \(g\) into \(f\): replace every occurrence of the input variable in \(f\) by the expression \(x+1\).  
Formal statement (still informal): the new rule is “square whatever \(g\) produces.”

### Step 3 — Write the chained rule with parentheses that enforce order
The notation \(f(g(x))\) means “evaluate \(g\) first, then apply \(f\) to that result.”  
Example:  
\[
f(g(x)) = (x+1)^2.
\]
Display math:  
\[
(f\circ g)(x) := f(g(x)).
\]
> [!WARNING]
> Writing \(fg(x)\) without parentheses is ambiguous and will be misread as multiplication by many readers.

### Step 4 — The reverse chain produces a different rule
Swapping the machines yields \(g(f(x))\).  
Example:  
\[
g(f(x)) = x^2 + 1.
\]
The two results \((x+1)^2\) and \(x^2+1\) differ, proving order matters.

### Step 5 — Domain of the composition is the largest set on which the inner function’s outputs lie inside the outer function’s domain
Let \(D_g\) be the domain of \(g\) and \(D_f\) the domain of \(f\). Then  
\[
D_{f\circ g} = \{x\in D_g \mid g(x)\in D_f\}.
\]
Example: If \(f(x)=\sqrt{x}\) (domain \([0,\infty)\)) and \(g(x)=x-3\), then \(f(g(x))\) is defined only when \(x-3\geq 0\), i.e., \(x\geq 3\).

### Step 6 — Formal definition
Let \(f:D_f\to\mathbb{R}\) and \(g:D_g\to\mathbb{R}\). The composition \(f\circ g\) is the function  
\[
f\circ g : D_{f\circ g}\to\mathbb{R},\qquad (f\circ g)(x) = f(g(x)),
\]
where the domain is exactly the set defined in Step 5. This is the statement found in any rigorous calculus text.

## 5. Worked examples — every step shown

**Example 1 — Linear inside quadratic**  
*Given:* \(f(x)=x^2+3\), \(g(x)=2x-1\).  
*Find:* \((f\circ g)(x)\) and its domain (both functions defined on \(\mathbb{R}\)).  

Step 1: Replace the input of \(f\) by the expression for \(g(x)\).  
\[
f(g(x)) = (2x-1)^2 + 3.
\]  
*Why:* The definition of composition substitutes the entire inner expression.  

Step 2: Expand.  
\[
(2x-1)^2 + 3 = 4x^2-4x+1+3 = 4x^2-4x+4.
\]  
*Why:* Algebraic simplification yields an explicit polynomial rule.  

**Final answer**  
\[
(f\circ g)(x)=4x^2-4x+4,\qquad\text{domain }=\mathbb{R}.
\]

*Reflection:* The example is easy because domains are unrestricted; the only skill required is correct substitution order.

**Example 2 — Domain restriction appears**  
*Given:* \(f(x)=\sqrt{x}\), \(g(x)=x-4\).  
*Find:* \((f\circ g)(x)\).  

Step 1: Write the substitution.  
\[
f(g(x))=\sqrt{x-4}.
\]  
*Why:* Direct replacement.  

Step 2: Determine where the expression inside the square root is nonnegative.  
\[
x-4\geq 0\implies x\geq 4.
\]  
*Why:* The range of \(g\) must intersect the domain of \(f\).  

**Final answer**  
\[
(f\circ g)(x)=\sqrt{x-4},\qquad\text{domain }[4,\infty).
\]

*Reflection:* Forgetting the domain check produces an expression that is syntactically valid but mathematically undefined on part of the real line.

**Example 3 — Composition with a constant function**  
*Given:* \(f(x)=5\), \(g(x)=x^2\).  
*Find:* both \(f\circ g\) and \(g\circ f\).  

Step 1: \(f(g(x))=f(x^2)=5\).  
*Why:* The outer function ignores its input.  

Step 2: \(g(f(x))=g(5)=5^2=25\).  
*Why:* The inner function now returns a constant, which is squared by the outer.  

**Final answer**  
\[
(f\circ g)(x)=5,\qquad(g\circ f)(x)=25.
\]

*Reflection:* Constants expose that composition is not commutative even in trivial cases.

**Example 4 — Trigonometric composition with restricted domain**  
*Given:* \(f(x)=\sin x\) (domain \(\mathbb{R}\)), \(g(x)=1/x\) (domain \(\mathbb{R}\setminus\{0\}\)).  
*Find:* \((f\circ g)(x)\).  

Step 1: Substitute.  
\[
f(g(x))=\sin(1/x).
\]  
*Why:* Direct replacement.  

Step 2: Domain is all \(x\neq 0\) because \(\sin\) accepts every real number.  
**Final answer**  
\[
(f\circ g)(x)=\sin(1/x),\qquad\text{domain }\mathbb{R}\setminus\{0\}.
\]

*Reflection:* The outer function’s domain was unrestricted, so only the inner function’s restriction survived.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Reversing order: computing \(g(f(x))\) when \(f(g(x))\) was asked | Students read left-to-right and apply functions in written order | Always parse the parentheses: the innermost function is evaluated first. |
| Ignoring domain of inner function | Algebraic simplification hides the restriction | After obtaining the rule, explicitly solve \(g(x)\in D_f\). |
| Treating \(f\circ g\) as multiplication | Notation \(fg(x)\) is sometimes used for products in older texts | Never omit the circle or parentheses; write \(f\circ g\) until the habit is automatic. |
| Plugging a single number into the outer function instead of the whole expression | Confusing evaluation with composition | Replace the variable, not a specific value, unless a numerical check is intended. |
| Forgetting that constants are functions | Viewing constants as “numbers” rather than constant functions | Rewrite every constant \(c\) mentally as the function \(x\mapsto c\). |
| Assuming the composition is defined everywhere the outer function is | Overlooking that the inner function may miss the outer domain | Always intersect range of inner with domain of outer. |
| Cancelling variables across composition | Treating composition like fraction cancellation | Composition has no cancellation law; only substitution is valid. |

## 7. The textbook-precise statement
Let \(f:A\to B\) and \(g:C\to A\) be functions. The composition \(f\circ g\) is the function  
\[
f\circ g:C\to B,\qquad (f\circ g)(x)=f(g(x))
\]  
whose domain is exactly \(C\) provided the codomain of \(g\) equals the domain of \(f\). (If the codomain of \(g\) is larger than the domain of \(f\), restrict the domain of \(g\) accordingly.) See Stewart, *Calculus*, 9e, §1.3, Definition of Composition.

## 8. Visual — diagram or schematic
```text
x ──[ g ]──▶ g(x) ──[ f ]──▶ f(g(x))
          (inner)          (outer)

Domain of g          Range of g must sit inside
                     Domain of f
```
The left-to-right arrow order matches the order of evaluation: \(g\) acts first.

## 9. The memory technique
1. **The hook** — Picture a thick London fog rolling from left to right; the fog (f) can only form after the ground (g) has cooled. Thus “fog” = f after g.
2. **What to overlearn** — The two notations  
   \[
   (f\circ g)(x)=f(g(x)),\qquad (g\circ f)(x)=g(f(x))
   \]
   and the fact that these are unequal in general.
3. **Spaced-repetition schedule** — Review the definition and one domain example after 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — Re-derive by writing “apply the inner rule, then feed every resulting number into the outer rule,” then enforce the range-domain intersection.

## 10. What this unlocks
Composition is the operation that turns a collection of simple functions into arbitrarily complex ones. It is the direct prerequisite for inverse functions (the search for a function that undoes a given composition), for the chain rule in differentiation, for functional iteration in dynamical systems, and for the layer-wise forward pass in deep learning.

- Chain rule: \(\frac{d}{dx}(f\circ g)=(f'\circ g)\cdot g'\)
- Inverse-function theorem
- Functional powers \(f^{(n)}=f\circ f\circ\cdots\circ f\)
- Category-theoretic composition of morphisms

## 11. Self-check — five questions, no answers
1. If \(f(x)=x+2\) and \(g(x)=x^2-1\), compute both \((f\circ g)(3)\) and \((g\circ f)(3)\).
2. Find the largest possible domain of \(f\circ g\) when \(f(x)=\sqrt{2-x}\) and \(g(x)=x^2+1\).
3. Give an example of two non-constant functions \(f\) and \(g\) such that \(f\circ g=g\circ f\).
4. Suppose \(h(x)=(x+1)^3\). Express \(h\) as the composition of two simpler non-linear functions in two different ways.
5. A student claims that if \(f(g(x))=x\) for all \(x\) in the domain of \(g\), then \(g(f(x))=x\) as well. Construct a counter-example showing the claim is false.