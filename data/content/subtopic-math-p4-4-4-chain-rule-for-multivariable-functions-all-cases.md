## What it is
The multivariable chain rule is a method for finding the rate of change of a composite function whose constituent parts depend on multiple variables. It tells you how a change in an ultimate independent variable propagates through a chain of intermediate dependent variables to affect the final output. It generalizes the single-variable rule $ (f(g(x)))' = f'(g(x))g'(x) $ to higher dimensions.

## Why it matters
This rule is the engine of optimization and sensitivity analysis in complex systems. In machine learning, the backpropagation algorithm used to train deep neural networks is nothing more than a clever, large-scale application of the multivariable chain rule. In physics and aerospace, it's used to calculate how quantities change along a trajectory, such as finding the rate of change of atmospheric pressure experienced by a rising rocket, where pressure is a function of position $(x, y, z)$ and position is a function of time $t$.

## When to study it
You must be fluent with single-variable calculus, especially the chain rule. From multivariable calculus, you need a solid grasp of partial derivatives, the gradient ($\nabla f$), and the total differential ($df$). A basic understanding of matrix multiplication is also essential for the general form involving the Jacobian matrix. If you are not comfortable with partial derivatives, pause and master those first.

## How to study it (step by step)
1.  **Revisit the total differential.** For a function $z = f(x, y)$, recall that the change in $z$ for small changes in $x$ and $y$ is approximately $dz = \frac{\partial f}{\partial x}dx + \frac{\partial f}{\partial y}dy$. This is the foundation.
2.  **Derive the simplest case.** Consider $z = f(x, y)$ where $x = x(t)$ and $y = y(t)$. All variables ultimately depend on a single variable $t$. Divide the total differential by $dt$: $\frac{dz}{dt} = \frac{\partial f}{\partial x}\frac{dx}{dt} + \frac{\partial f}{\partial y}\frac{dy}{dt}$. Convince yourself this makes intuitive sense.
3.  **Draw dependency diagrams.** For the case above, draw a diagram with $z$ at the top, arrows pointing to $x$ and $y$, and arrows from both $x$ and $y$ pointing down to $t$. Understand that to find $\frac{dz}{dt}$, you must sum the contributions from all paths from $z$ to $t$.
4.  **Generalize to more intermediate variables.** Now consider $z = f(x, y)$ where $x = x(s, t)$ and $y = y(s, t)$. Draw the new dependency diagram. Use the "sum over paths" logic to write down the formula for $\frac{\partial z}{\partial s}$ and $\frac{\partial z}{\partial t}$. Notice the use of $\partial$ instead of $d$ because $s$ and $t$ are independent.
5.  **Introduce the Jacobian matrix.** For a vector-valued function $\mathbf{f}: \mathbb{R}^n \to \mathbb{R}^m$, its derivative is the Jacobian matrix $D\mathbf{f}$, an $m \times n$ matrix of all first-order partial derivatives.
6.  **State the most general form.** For functions $\mathbf{y} = \mathbf{f}(\mathbf{u})$ and $\mathbf{u} = \mathbf{g}(\mathbf{x})$, the chain rule is $D(\mathbf{f} \circ \mathbf{g})_\mathbf{x} = D\mathbf{f}_\mathbf{u} \cdot D\mathbf{g}_\mathbf{x}$. Recognize this as matrix multiplication. Verify that the dimensions of the Jacobian matrices make sense for this product.

## Key ideas, with intuition
1.  **Summing Rates of Influence.** The core idea is that the total change in the final output is the sum of changes propagated through all possible intermediate pathways. If $z$ depends on $x$ and $y$, and both $x$ and $y$ depend on $t$, then $t$ influences $z$ *through* $x$ AND *through* $y$. We must add these two effects.
    $$
    \text{Total Rate} = (\text{Rate } z \text{ changes wrt } x) \times (\text{Rate } x \text{ changes wrt } t) + (\text{Rate } z \text{ changes wrt } y) \times (\text{Rate } y \text{ changes wrt } t)
    $$

2.  **Dependency Diagrams Clarify Everything.** Before writing any formula, draw a simple tree diagram showing which variables depend on which. The final output is the root, the ultimate independent variables are the leaves. To find a derivative, trace all paths between the two relevant variables.

3.  **Partial vs. Total Derivatives Matter.**
    - Use a total derivative $\frac{d}{dt}$ when a variable ultimately depends on only *one* other variable (e.g., $z$ with respect to $t$ in the case $z(x(t), y(t))$).
    - Use a partial derivative $\frac{\partial}{\partial s}$ when a variable depends on *more than one* other variable (e.g., $z$ with respect to $s$ in the case $z(x(s,t), y(s,t))$).

4.  **The Jacobian as a "Derivative Matrix".** In single-variable calculus, the derivative is a number (slope). In multivariable calculus, the derivative of a function $\mathbf{f}: \mathbb{R}^n \to \mathbb{R}^m$ at a point is a linear map that best approximates the function. This linear map is represented by the $m \times n$ Jacobian matrix. The chain rule in this context, $D(\mathbf{f} \circ \mathbf{g}) = (D\mathbf{f}) \cdot (D\mathbf{g})$, is the multivariable analogue of multiplying slopes. It states that the best linear approximation of a composition is the composition of the linear approximations.

## Worked example
Let $w = x^2 + yz$, where $x = 3s+t$, $y = st$, and $z = s-t$. Find $\frac{\partial w}{\partial s}$.

**Step 1: Identify dependencies and draw the diagram.**
$w$ depends on $x, y, z$.
$x, y, z$ all depend on $s, t$.
We want the rate of change of $w$ with respect to $s$.

**Step 2: Use the dependency diagram to write the chain rule formula.**
There are three paths from $w$ to $s$:
- Path 1: $w \to x \to s$
- Path 2: $w \to y \to s$
- Path 3: $w \to z \to s$

The formula is the sum of the products of derivatives along each path:
$$
\frac{\partial w}{\partial s} = \frac{\partial w}{\partial x}\frac{\partial x}{\partial s} + \frac{\partial w}{\partial y}\frac{\partial y}{\partial s} + \frac{\partial w}{\partial z}\frac{\partial z}{\partial s}
$$

**Step 3: Calculate each partial derivative.**
- $\frac{\partial w}{\partial x} = 2x$
- $\frac{\partial w}{\partial y} = z$
- $\frac{\partial w}{\partial z} = y$

- $\frac{\partial x}{\partial s} = 3$
- $\frac{\partial y}{\partial s} = t$
- $\frac{\partial z}{\partial s} = 1$

**Step 4: Substitute the derivatives into the formula.**
$$
\frac{\partial w}{\partial s} = (2x)(3) + (z)(t) + (y)(1)
$$
$$
\frac{\partial w}{\partial s} = 6x + zt + y
$$

**Step 5: Express the result in terms of the independent variables $s$ and $t$.**
Substitute the original expressions for $x, y, z$:
$$
\frac{\partial w}{\partial s} = 6(3s+t) + (s-t)t + (st)
$$
$$
\frac{\partial w}{\partial s} = 18s + 6t + st - t^2 + st
$$
$$
\frac{\partial w}{\partial s} = 18s + 6t + 2st - t^2
$$

**Reflection:** Each step was methodical. We first established the structure of the problem with a dependency diagram (Step 1-2). Then we executed the mechanical calculation of individual partials (Step 3). Finally, we assembled the pieces (Step 4) and simplified (Step 5). This process prevents errors.

## Diagrams

**Case 1:** $z = f(x,y)$, where $x=x(t), y=y(t)$. Find $\frac{dz}{dt}$.

```text
      z
     / \
    /   \
   x     y
    \   /
     \ /
      t
```
Paths: $z \to x \to t$ and $z \to y \to t$.

**Case 2:** $w = f(x,y)$, where $x=x(s,t), y=y(s,t)$. Find $\frac{\partial w}{\partial s}$.

```text
      w
     / \
    /   \
   x     y
  / \   / \
 /   \ /   \
s     t s     t
```
Paths from $w$ to $s$: $w \to x \to s$ and $w \to y \to s$.

## Memory technique — remember this forever
1.  **Mnemonic: "The Dependency Tree Traversal"**
    To find the derivative of a "root" variable (e.g., $w$) with respect to a "leaf" variable (e.g., $s$), you must traverse the dependency tree.
    - **Identify all paths** from the root to the leaf.
    - For each path, **multiply the derivatives** along every branch.
    - **Sum the results** from all paths.
    This story transforms the formula from abstract symbols into a concrete procedure.

2.  **Formulas to Overlearn:**
    - **Scalar output, vector input, single parameter path:** $z=f(x_1, ..., x_n)$, $x_i=x_i(t)$.
      $$ \frac{dz}{dt} = \sum_{i=1}^{n} \frac{\partial f}{\partial x_i} \frac{dx_i}{dt} = \nabla f \cdot \mathbf{r}'(t) $$
    - **General Jacobian Form:** $\mathbf{y} = \mathbf{f}(\mathbf{u})$, $\mathbf{u} = \mathbf{g}(\mathbf{x})$.
      $$ D(\mathbf{f} \circ \mathbf{g})_{\mathbf{x}} = D\mathbf{f}_{\mathbf{u}} \cdot D\mathbf{g}_{\mathbf{x}} $$
    Do not paraphrase these. Burn them into memory exactly as written.

3.  **Spaced Repetition Schedule:**
    Review this topic and re-derive the main formulas at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days.** Set calendar reminders now.

4.  **First Principles Pathway:**
    If you forget the formula, rebuild it from the **total differential**. For $z=f(x,y)$, the fundamental approximation is $\Delta z \approx \frac{\partial z}{\partial x}\Delta x + \frac{\partial z}{\partial y}\Delta y$. If $x$ and $y$ depend on $t$, then divide everything by $\Delta t$: $\frac{\Delta z}{\Delta t} \approx \frac{\partial z}{\partial x}\frac{\Delta x}{\Delta t} + \frac{\partial z}{\partial y}\frac{\Delta y}{\Delta t}$. Taking the limit as $\Delta t \to 0$ gives the chain rule. This always works.

## Common mistakes
1.  **Forgetting to Sum:** Students often calculate the influence through one intermediate variable (e.g., $\frac{\partial w}{\partial x}\frac{\partial x}{\partial s}$) and forget to add the contributions from the other paths (e.g., from $y$ and $z$). Always draw the diagram to ensure you account for all paths.
2.  **Mixing Partial and Total Derivatives:** Writing $\frac{df}{dx}$ when you mean $\frac{\partial f}{\partial x}$. Remember: if the function you are differentiating depends on more than one variable, use a partial derivative $\partial$. If it depends on only one, use a total derivative $d$.
3.  **Incorrect Jacobian Matrix Order:** The order of matrix multiplication is $D\mathbf{f}(\mathbf{g}(\mathbf{x})) \cdot D\mathbf{g}(\mathbf{x})$. Reversing it will fail, as the inner dimensions of the matrices will not match. The dimensions flow from right to left: $\mathbf{x} \in \mathbb{R}^n \xrightarrow{D\mathbf{g}} \mathbb{R}^m \xrightarrow{D\mathbf{f}} \mathbb{R}^p$.

## Self-check
1.  Let $z = \sin(x) \cos(y)$, where $x = t^2$ and $y = \frac{1}{t}$. Find $\frac{dz}{dt}$.
2.  Let $P = u^2 + v^2 + w^2$, where $u = r\cos\theta$, $v = r\sin\theta$, and $w = r$. Find $\frac{\partial P}{\partial r}$ and $\frac{\partial P}{\partial \theta}$. What do you notice about your result for $\frac{\partial P}{\partial \theta}$?
3.  Let $\mathbf{f}(u,v) = (u^2v, u-v)$ and $\mathbf{g}(x,y) = (e^x, \cos(xy))$. Let $\mathbf{h} = \mathbf{f} \circ \mathbf{g}$. Calculate the Jacobian matrix of $\mathbf{h}$ at the point $(x,y)=(0,1)$.