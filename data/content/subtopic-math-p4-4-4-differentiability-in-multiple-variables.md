## What it is
A function of multiple variables is **differentiable** at a point if it can be well-approximated by a linear function (a tangent plane or hyperplane) near that point. This is a stronger condition than simply having partial derivatives exist; it requires that the function's surface is "locally flat" and has no sharp corners, cusps, or breaks.

## Why it matters
Differentiability is the foundation for optimization algorithms like **gradient descent**, which powers most of machine learning. The algorithm assumes the loss function is locally linear, allowing it to take a step in the "downhill" direction given by the gradient. In aerospace, linearizing complex, non-linear equations of motion for a rocket or satellite is a standard technique for control system design, and this linearization is only valid if the system's state function is differentiable.

## When to study it
Before tackling this, you must have a firm grasp of:
1.  **Single-variable calculus:** Specifically, the limit definition of a derivative.
2.  **Vectors and vector operations:** Dot products and norms are essential.
3.  **Limits in multiple variables:** You must understand what $\lim_{\mathbf{x} \to \mathbf{a}} g(\mathbf{x})$ means, including path dependence.
4.  **Partial derivatives:** You must be able to compute $\frac{\partial f}{\partial x_i}$ for a function $f(\mathbf{x})$.

If any of these are weak, master them first. This topic builds directly upon them.

## How to study it (step by step)
1.  **Revisit the 1D case.** Write down the definition of the derivative $f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}$. Rearrange it to see the linear approximation: $f(a+h) \approx f(a) + f'(a)h$. Understand that the error in this approximation, $f(a+h) - f(a) - f'(a)h$, goes to zero *faster* than $h$.
2.  **Generalize to n-dimensions.** Replace the scalars $a$ and $h$ with vectors $\mathbf{a}$ and $\mathbf{h}$. The term $f'(a)h$ becomes a linear transformation. For a scalar function $f: \mathbb{R}^n \to \mathbb{R}$, this transformation is the dot product with the gradient vector: $\nabla f(\mathbf{a}) \cdot \mathbf{h}$.
3.  **Write the formal definition.** A function $f$ is differentiable at $\mathbf{a}$ if its partial derivatives exist at $\mathbf{a}$ and the following limit is zero:
    $$ \lim_{\mathbf{h} \to \mathbf{0}} \frac{f(\mathbf{a} + \mathbf{h}) - f(\mathbf{a}) - \nabla f(\mathbf{a}) \cdot \mathbf{h}}{\|\mathbf{h}\|} = 0 $$
    Internalize what each part means: $f(\mathbf{a} + \mathbf{h}) - f(\mathbf{a})$ is the true change in $f$, $\nabla f(\mathbf{a}) \cdot \mathbf{h}$ is the linear approximation of that change, and dividing by $\|\mathbf{h}\|$ forces the error to be insignificant even for small steps.
4.  **Study the sufficient condition.** Prove or at least understand the theorem: If all partial derivatives of $f$ exist in an open region containing $\mathbf{a}$ and are *continuous* at $\mathbf{a}$, then $f$ is differentiable at $\mathbf{a}$. This is your primary tool for showing a function is differentiable without using the limit definition.
5.  **Work with a counterexample.** Analyze the function $f(x, y) = \frac{xy}{x^2+y^2}$ for $(x,y) \neq (0,0)$ and $f(0,0)=0$. Show that $\frac{\partial f}{\partial x}$ and $\frac{\partial f}{\partial y}$ both exist at $(0,0)$ (they are both 0), but the function is not even continuous at the origin, let alone differentiable. This cements the idea that partials are not enough.

## Key ideas, with intuition
1.  **Differentiability means "Locally Linear".**
    The core idea is that if you zoom in infinitely close to the graph of a differentiable function, it looks like a flat plane (or hyperplane). The single-variable analogue is zooming in on a curve until it looks like a straight line. This flat plane is the **tangent plane**. Its equation is given by the linear approximation:
    $$ L(\mathbf{x}) = f(\mathbf{a}) + \nabla f(\mathbf{a}) \cdot (\mathbf{x} - \mathbf{a}) $$
    Differentiability means that $f(\mathbf{x}) \approx L(\mathbf{x})$ for $\mathbf{x}$ near $\mathbf{a}$, and this approximation is extremely good.

2.  **The Error Term Must Vanish Faster Than The Step Size.**
    The formal definition can be rewritten by defining an error term $E(\mathbf{h}) = f(\mathbf{a} + \mathbf{h}) - f(\mathbf{a}) - \nabla f(\mathbf{a}) \cdot \mathbf{h}$. Differentiability at $\mathbf{a}$ means:
    $$ \lim_{\mathbf{h} \to \mathbf{0}} \frac{E(\mathbf{h})}{\|\mathbf{h}\|} = 0 $$
    This is the rigorous way of saying the error $E(\mathbf{h})$ becomes negligible compared to the length of the step vector $\mathbf{h}$ as the step gets smaller. Any approximation can have an error that goes to 0, but only the *linear* approximation has an error that goes to 0 this quickly.

3.  **Existence of Partials is Necessary, but Not Sufficient.**
    If a function is differentiable at $\mathbf{a}$, then all its partial derivatives must exist at $\mathbf{a}$. However, the converse is false. You can construct functions with "creases" or "spikes" that are aligned with the axes. Along an axis, the function looks smooth (so the partial derivative exists), but approaching from another direction reveals the non-differentiable behavior.

4.  **Continuity of Partials is Sufficient.**
    This is the practical theorem you will use most often. To prove $f$ is differentiable on some domain, you typically compute its partial derivatives and show that they are continuous functions on that domain. For most functions made of elementary parts (polynomials, sines, exponentials, etc.), this is straightforward. The limit definition is reserved for tricky points, like the origin in a piecewise function.

## Worked example
**Question:** Show that $f(x, y) = x^2 + y^2$ is differentiable at the point $\mathbf{a} = (1, 2)$.

**Solution:**
We will use the formal definition of differentiability.

1.  **Calculate necessary components.**
    -   $f(\mathbf{a}) = f(1, 2) = 1^2 + 2^2 = 5$.
    -   Compute partial derivatives: $\frac{\partial f}{\partial x} = 2x$ and $\frac{\partial f}{\partial y} = 2y$.
    -   Evaluate the gradient at $\mathbf{a}$: $\nabla f(\mathbf{a}) = \nabla f(1, 2) = \langle 2(1), 2(2) \rangle = \langle 2, 4 \rangle$.

2.  **Set up the limit.**
    Let $\mathbf{h} = \langle h_1, h_2 \rangle$. The point near $\mathbf{a}$ is $\mathbf{a} + \mathbf{h} = (1+h_1, 2+h_2)$.
    We must show that $\lim_{\mathbf{h} \to \mathbf{0}} \frac{f(\mathbf{a} + \mathbf{h}) - f(\mathbf{a}) - \nabla f(\mathbf{a}) \cdot \mathbf{h}}{\|\mathbf{h}\|} = 0$.

3.  **Substitute components into the limit expression.**
    -   $f(\mathbf{a} + \mathbf{h}) = f(1+h_1, 2+h_2) = (1+h_1)^2 + (2+h_2)^2 = (1+2h_1+h_1^2) + (4+4h_2+h_2^2)$.
    -   $\nabla f(\mathbf{a}) \cdot \mathbf{h} = \langle 2, 4 \rangle \cdot \langle h_1, h_2 \rangle = 2h_1 + 4h_2$.
    -   $\|\mathbf{h}\| = \sqrt{h_1^2 + h_2^2}$.

    The numerator is:
    $[(1+2h_1+h_1^2) + (4+4h_2+h_2^2)] - 5 - (2h_1 + 4h_2)$
    $= (5 + 2h_1 + 4h_2 + h_1^2 + h_2^2) - 5 - 2h_1 - 4h_2$
    $= h_1^2 + h_2^2$.

4.  **Evaluate the limit.**
    The limit becomes:
    $$ \lim_{\mathbf{h} \to \mathbf{0}} \frac{h_1^2 + h_2^2}{\sqrt{h_1^2 + h_2^2}} $$
    Since $h_1^2 + h_2^2 = \|\mathbf{h}\|^2$, this simplifies to:
    $$ \lim_{\mathbf{h} \to \mathbf{0}} \frac{\|\mathbf{h}\|^2}{\|\mathbf{h}\|} = \lim_{\mathbf{h} \to \mathbf{0}} \|\mathbf{h}\| = 0 $$
    The limit is indeed 0.

**Reflection:**
Each step had a purpose. Step 1 gathered the ingredients for the linear approximation. Step 2 stated our goal using the formal definition. Step 3 plugged everything into the formula and simplified the error term. Step 4 evaluated the final limit, confirming that the error term vanishes faster than $\|\mathbf{h}\|$. This confirms the function is differentiable at $(1,2)$. Note that we could also have simply observed that the partials $2x$ and $2y$ are continuous everywhere, which is a much faster way to reach the same conclusion for this simple function.

## Diagrams
This diagram illustrates the linear approximation of a function $f(x,y)$ at a point $\mathbf{a}$. The true value is $f(\mathbf{x})$, while the approximation $L(\mathbf{x})$ lies on the tangent plane. Differentiability means the error $E = f(\mathbf{x}) - L(\mathbf{x})$ is small relative to the distance $\|\mathbf{x}-\mathbf{a}\|$.

```text
       z ^
         |
         |         Surface z = f(x,y)
         |        /
         |      . f(x)
         |     /| E
         |    .---- L(x) on Tangent Plane
         |   /
         |  f(a)
         | .
         |/___________________________> y
        /
       /
      a------(x-a)----->x
     /
    v x
```

## Memory technique — remember this forever
1.  **Visual Hook:** "Differentiable is locally flat." Picture a smooth, curved satellite dish. From miles away, it's curved. If you are an ant standing on it, it looks like a perfectly flat plane. Differentiability is the mathematical guarantee of this "ant's perspective".

2.  **Formulas to Overlearn:**
    *   The Definition: $\displaystyle \lim_{\mathbf{h} \to \mathbf{0}} \frac{f(\mathbf{a} + \mathbf{h}) - f(\mathbf{a}) - \nabla f(\mathbf{a}) \cdot \mathbf{h}}{\|\mathbf{h}\|} = 0$
    *   The Linear Approximation: $L(\mathbf{x}) = f(\mathbf{a}) + \nabla f(\mathbf{a}) \cdot (\mathbf{x} - \mathbf{a})$

3.  **Spaced Repetition Schedule:**
    Review this concept and re-derive the main formula at: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:**
    If you forget the multivariable definition, rebuild it from the single-variable case.
    *   Start with $f(x) \approx f(a) + f'(a)(x-a)$.
    *   Generalize to vectors: $x \to \mathbf{x}$, $a \to \mathbf{a}$.
    *   The multiplication $f'(a)(x-a)$ must become a linear operation. For a scalar field $f$, the best linear approximation of change is the directional derivative, which is maximized by the gradient. This leads to the dot product: $\nabla f(\mathbf{a}) \cdot (\mathbf{x}-\mathbf{a})$.
    *   So, $f(\mathbf{x}) \approx f(\mathbf{a}) + \nabla f(\mathbf{a}) \cdot (\mathbf{x}-\mathbf{a})$.
    *   The formal definition of differentiability is just a precise statement about the error in this approximation. The error must go to zero faster than the distance $\|\mathbf{x}-\mathbf{a}\|$.

## Common mistakes
1.  **Assuming Partial Derivatives Imply Differentiability.** This is the most common error. The function $f(x,y) = \sqrt[3]{xy}$ has partial derivatives that exist at $(0,0)$, but it is not differentiable there (it has a "crease"). Always check for continuity of the partials or use the limit definition for tricky points.
2.  **Forgetting the Denominator $\|\mathbf{h}\|$.** Students often check if the numerator of the limit definition, $f(\mathbf{a} + \mathbf{h}) - f(\mathbf{a}) - \nabla f(\mathbf{a}) \cdot \mathbf{h}$, goes to zero. This is just a test for continuity. Differentiability is a stronger condition, requiring that it goes to zero *faster* than $\|\mathbf{h}\|$.
3.  **Mistaking the Gradient for the Derivative.** In one variable, $f'(x)$ is a number. In multiple variables, the derivative (or "total derivative") is technically the *linear map* represented by the Jacobian matrix. For a scalar function $f: \mathbb{R}^n \to \mathbb{R}$, the gradient vector $\nabla f$ is used to *represent* this linear map via the dot product, but they are conceptually distinct.

## Self-check
1.  Use the theorem on continuous partial derivatives to show that $f(x, y, z) = e^{xyz} \sin(x+y)$ is differentiable everywhere in $\mathbb{R}^3$.
2.  Let $f(x, y) = \frac{x^3}{x^2+y^2}$ for $(x,y) \neq (0,0)$ and $f(0,0)=0$. Use the limit definition to determine if $f$ is differentiable at the origin.
3.  If a function $f: \mathbb{R}^2 \to \mathbb{R}$ is differentiable at a point $\mathbf{a}$, does every directional derivative at $\mathbf{a}$ have to exist? Conversely, if every directional derivative exists at $\mathbf{a}$, must $f$ be differentiable at $\mathbf{a}$? Justify your reasoning.