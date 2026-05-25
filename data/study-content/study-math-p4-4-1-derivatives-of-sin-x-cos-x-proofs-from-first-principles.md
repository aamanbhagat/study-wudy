## 1. What it is — in plain English

Imagine you're tracking the height of a specific point on a spinning Ferris wheel. As the wheel turns, the height goes up and down in a smooth, wave-like pattern. This pattern is described by trigonometric functions like sine or cosine. Now, what if you wanted to know how fast that point is moving *up or down* at any exact moment? That "how fast" is what the derivative tells you.

So, when we talk about the "derivative of $\sin x$" or "derivative of $\cos x$", we're simply finding the mathematical formula that describes the instantaneous rate of change (or the steepness of the curve) of these wave-like functions at any given point $x$.

Think of it like this: if $\sin x$ represents the position of something oscillating back and forth, its derivative will tell you its instantaneous velocity. If $\cos x$ represents the temperature fluctuation throughout the day, its derivative will tell you how quickly the temperature is rising or falling at any specific hour. We're getting to the heart of how these fundamental wave patterns evolve.

## 2. Why it matters — real-world applications

Understanding the derivatives of sine and cosine is absolutely fundamental across many scientific and engineering disciplines because periodic (wave-like) phenomena are ubiquitous in nature and technology.

1.  **Physics and Engineering (Simple Harmonic Motion & Waves):** Any system that oscillates or vibrates, from a swinging pendulum to a mass on a spring, or even the vibrations of atoms in a crystal, can often be modeled using sine and cosine functions. The derivative allows physicists and engineers to calculate the instantaneous velocity and acceleration of these oscillating systems. For example, in designing shock absorbers for a car or analyzing the resonant frequencies of a bridge, understanding how the position (sine/cosine) relates to velocity (derivative) and acceleration (second derivative) is critical for predicting behavior and preventing failure.

2.  **Electrical Engineering (AC Circuits & Signal Processing):** Alternating current (AC) electricity, radio waves, sound waves, and light waves are all periodic and described by sine and cosine functions. When designing filters, amplifiers, or communication systems (like those used by companies such as Qualcomm or Broadcom), engineers need to analyze how these signals change over time. Derivatives help determine characteristics like instantaneous voltage/current rates of change, power consumption, and frequency response, which are essential for ensuring clear signal transmission and efficient power delivery.

3.  **Aerospace Engineering (Orbital Mechanics & Control Systems):** Satellites and spacecraft often follow periodic orbits or exhibit oscillatory movements (e.g., in their attitude or orientation). Companies like SpaceX or NASA use derivatives of trigonometric functions to model and predict these movements. For instance, calculating the rate of change of a satellite's position in orbit or designing control systems to dampen unwanted oscillations in a rocket's trajectory relies heavily on these fundamental derivatives to ensure stability and precision.

4.  **Computer Graphics and Animation:** Creating realistic movements for characters, special effects like water ripples, or even the subtle sway of trees in a simulated wind often involves periodic functions. Animators and game developers (e.g., at Pixar or Epic Games) use derivatives to control the speed and acceleration of these animated motions, making them appear smooth and natural. For example, controlling the velocity profile of a bouncing ball or the rhythmic movement of a character's walk cycle might involve manipulating the derivatives of sine and cosine functions.

## 3. Prerequisites — what you must know first

Before diving into the proofs for the derivatives of $\sin x$ and $\cos x$, ensure you have a solid grasp of these foundational concepts:

*   **Functions**: Understanding what a function is (an input-output rule), its domain, and its range.
*   **Trigonometric Functions**: Definitions of $\sin x$, $\cos x$, $\tan x$, etc., in terms of the unit circle and right triangles, understanding angles in radians, and knowing their graphs.
*   **Fundamental Trigonometric Identities**: Key identities like $\sin^2 x + \cos^2 x = 1$, and especially the **angle sum identities**:
    *   $\sin(A+B) = \sin A \cos B + \cos A \sin B$
    *   $\cos(A+B) = \cos A \cos B - \sin A \sin B$
*   **Limits**: The concept of a limit, how to evaluate limits, limit laws (sum, difference, product, quotient, constant multiple rules for limits).
*   **Special Trigonometric Limits**: You absolutely must know and understand the proofs for these two critical limits:
    *   $\lim_{x \to 0} \frac{\sin x}{x} = 1$
    *   $\lim_{x \to 0} \frac{\cos x - 1}{x} = 0$
*   **Definition of the Derivative (from first principles)**: The formal definition of the derivative of a function $f(x)$ as a limit.
*   **Algebra**: Proficiency in manipulating algebraic expressions, factoring, and simplifying fractions.

If any of these prerequisites feel shaky, pause here and review them thoroughly. They are the building blocks for what follows.

## 4. The core idea — step by step

The core idea is to apply the fundamental definition of the derivative (the "first principles" definition) to the sine and cosine functions, using trigonometric identities and special limits to simplify the resulting expression.

### ### Step 1: Recall the Definition of the Derivative

*   **Plain English Statement:** The derivative of a function $f(x)$, denoted $f'(x)$ or $\frac{d}{dx}f(x)$, tells us the instantaneous rate of change of $f(x)$ with respect to $x$. Geometrically, it's the slope of the tangent line to the graph of $f(x)$ at any point $x$. We find this by taking the limit of the average rate of change over an infinitesimally small interval.

*   **Small Concrete Example:** If $f(x) = x^2$, the average rate of change between $x$ and $x+h$ is $\frac{(x+h)^2 - x^2}{h}$. The derivative is the limit of this as $h$ approaches zero.

*   **Formal/Mathematical Version:**
    $$ f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} $$
    Here, $h$ represents a small change in $x$.

*   **What Could Go Wrong:** Forgetting the $\lim_{h \to 0}$ part means you're calculating an average rate of change over a finite interval, not the instantaneous rate. Misinterpreting $h$ as a variable that doesn't go to zero will lead to incorrect results.

### ### Step 2: Apply the Definition to $f(x) = \sin x$

*   **Plain English Statement:** To find the derivative of $\sin x$, we substitute $\sin x$ into the $f(x)$ spot in our derivative definition. This means we'll be looking at the difference between $\sin(x+h)$ and $\sin x$, divided by $h$, as $h$ gets tiny.

*   **Small Concrete Example:** If we were finding the derivative of $f(x) = x^3$, we'd write $\lim_{h \to 0} \frac{(x+h)^3 - x^3}{h}$. Here, we replace $x^3$ with $\sin x$.

*   **Formal/Mathematical Version:**
    $$ \frac{d}{dx}(\sin x) = \lim_{h \to 0} \frac{\sin(x+h) - \sin x}{h} $$

*   **What Could Go Wrong:** A common mistake is to misinterpret $\sin(x+h)$ as $\sin x + \sin h$, which is incorrect. The sine function does not distribute over addition.

### ### Step 3: Use the Angle Sum Identity for Sine

*   **Plain English Statement:** The expression $\sin(x+h)$ is difficult to work with directly. Fortunately, there's a trigonometric identity that lets us expand it into terms involving $\sin x$, $\cos x$, $\sin h$, and $\cos h$. This is a crucial step to break down the complex term.

*   **Small Concrete Example:** You might recall $\sin(30^\circ + 60^\circ) = \sin(90^\circ) = 1$. Using the identity: $\sin(30^\circ)\cos(60^\circ) + \cos(30^\circ)\sin(60^\circ) = (\frac{1}{2})(\frac{1}{2}) + (\frac{\sqrt{3}}{2})(\frac{\sqrt{3}}{2}) = \frac{1}{4} + \frac{3}{4} = 1$. The identity works.

*   **Formal/Mathematical Version:**
    We use the identity $\sin(A+B) = \sin A \cos B + \cos A \sin B$.
    Substituting $A=x$ and $B=h$:
    $$ \sin(x+h) = \sin x \cos h + \cos x \sin h $$
    Now, substitute this back into our limit expression from Step 2:
    $$ \frac{d}{dx}(\sin x) = \lim_{h \to 0} \frac{(\sin x \cos h + \cos x \sin h) - \sin x}{h} $$

*   **What Could Go Wrong:** Using the wrong trigonometric identity (e.g., confusing sine and cosine sum formulas) or making a sign error in the identity. This will lead the entire derivation astray.

### ### Step 4: Rearrange and Factor Terms

*   **Plain English Statement:** Now we have a sum of terms in the numerator. We want to rearrange these terms and factor out common parts so that we can isolate expressions that look like our special trigonometric limits (those involving $\frac{\sin h}{h}$ and $\frac{\cos h - 1}{h}$). Look for terms with $\sin x$ and terms with $\cos x$.

*   **Small Concrete Example:** If you had $\frac{ax - a + bx}{h}$, you could rearrange to $\frac{a(x-1) + bx}{h}$. Here, we're doing something similar but with trig functions.

*   **Formal/Mathematical Version:**
    Group the terms involving $\sin x$:
    $$ \lim_{h \to 0} \frac{\sin x \cos h - \sin x + \cos x \sin h}{h} $$
    Factor out $\sin x$ from the first two terms:
    $$ \lim_{h \to 0} \frac{\sin x (\cos h - 1) + \cos x \sin h}{h} $$

*   **What Could Go Wrong:** Algebraic errors during factoring or rearrangement. It's easy to drop a term or misapply the distributive property. Double-check your factoring.

### ### Step 5: Split the Limit and Apply Limit Laws

*   **Plain English Statement:** We now have two distinct parts in the numerator, separated by an addition sign. The limit of a sum is the sum of the limits (provided each individual limit exists). We can split this single fraction into two separate fractions and then apply the limit to each part individually. Also, constants (like $\sin x$ and $\cos x$, which are fixed with respect to $h$) can be pulled outside the limit.

*   **Small Concrete Example:** $\lim_{h \to 0} \frac{Ah + Bh}{h} = \lim_{h \to 0} (\frac{Ah}{h} + \frac{Bh}{h}) = \lim_{h \to 0} A + \lim_{h \to 0} B = A+B$.

*   **Formal/Mathematical Version:**
    $$ \lim_{h \to 0} \left( \frac{\sin x (\cos h - 1)}{h} + \frac{\cos x \sin h}{h} \right) $$
    Using the limit sum rule, and pulling out constants:
    $$ \left( \lim_{h \to 0} \sin x \frac{\cos h - 1}{h} \right) + \left( \lim_{h \to 0} \cos x \frac{\sin h}{h} \right) $$
    $$ = \sin x \left( \lim_{h \to 0} \frac{\cos h - 1}{h} \right) + \cos x \left( \lim_{h \to 0} \frac{\sin h}{h} \right) $$

*   **What Could Go Wrong:** Incorrectly applying limit laws, such as trying to pull out terms that *do* depend on $h$ from the limit. Forgetting that $\sin x$ and $\cos x$ are constants *with respect to $h$* is a common conceptual error.

### ### Step 6: Evaluate the Special Trigonometric Limits

*   **Plain English Statement:** At this point, we have two limits that are precisely the special trigonometric limits we reviewed in the prerequisites. We can now substitute their known values.

*   **Small Concrete Example:** If you know $\lim_{h \to 0} \frac{h}{h} = 1$, you'd substitute 1.

*   **Formal/Mathematical Version:**
    Recall the special limits:
    $$ \lim_{h \to 0} \frac{\sin h}{h} = 1 $$
    $$ \lim_{h \to 0} \frac{\cos h - 1}{h} = 0 $$
    Substitute these values into our expression from Step 5:
    $$ \sin x (0) + \cos x (1) $$
    $$ = 0 + \cos x $$
    $$ = \cos x $$

*   **What Could Go Wrong:** Misremembering the values of these special limits, especially confusing which one is 0 and which is 1, or getting the sign wrong for the cosine limit.

### ### Step 7: Repeat for $f(x) = \cos x$ (Derivation of $\frac{d}{dx}(\cos x)$)

*   **Plain English Statement:** The process for finding the derivative of $\cos x$ is almost identical. We'll start with the definition, use the angle sum identity for cosine, rearrange, split the limit, and apply the same special limits.

*   **Formal/Mathematical Version:**
    1.  **Definition:**
        $$ \frac{d}{dx}(\cos x) = \lim_{h \to 0} \frac{\cos(x+h) - \cos x}{h} $$
    2.  **Angle Sum Identity:** Use $\cos(A+B) = \cos A \cos B - \sin A \sin B$.
        $$ \frac{d}{dx}(\cos x) = \lim_{h \to 0} \frac{(\cos x \cos h - \sin x \sin h) - \cos x}{h} $$
    3.  **Rearrange and Factor:**
        $$ \frac{d}{dx}(\cos x) = \lim_{h \to 0} \frac{\cos x (\cos h - 1) - \sin x \sin h}{h} $$
    4.  **Split the Limit:**
        $$ \frac{d}{dx}(\cos x) = \cos x \left( \lim_{h \to 0} \frac{\cos h - 1}{h} \right) - \sin x \left( \lim_{h \to 0} \frac{\sin h}{h} \right) $$
    5.  **Evaluate Limits:**
        $$ = \cos x (0) - \sin x (1) $$
        $$ = 0 - \sin x $$
        $$ = -\sin x $$

*   **What Could Go Wrong:** The most common error here is a sign mistake, specifically forgetting the negative sign that arises from the angle sum identity for cosine and the special limits.

## 5. Worked examples — multiple, with every step shown

### Example 1: Derive $\frac{d}{dx}(\sin x)$ from first principles.

**Problem:** Find the derivative of $f(x) = \sin x$ using the definition of the derivative.

**Given:** The function $f(x) = \sin x$.
**Want:** The derivative $f'(x) = \frac{d}{dx}(\sin x)$.

**Solution:**

1.  **Start with the definition of the derivative:**
    $$ f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} $$
    *This is the fundamental formula for finding a derivative from first principles.*

2.  **Substitute $f(x) = \sin x$ into the definition:**
    $$ \frac{d}{dx}(\sin x) = \lim_{h \to 0} \frac{\sin(x+h) - \sin x}{h} $$
    *We replace $f(x)$ with $\sin x$ and $f(x+h)$ with $\sin(x+h)$.*

3.  **Apply the angle sum identity for sine: $\sin(A+B) = \sin A \cos B + \cos A \sin B$**
    $$ \frac{d}{dx}(\sin x) = \lim_{h \to 0} \frac{(\sin x \cos h + \cos x \sin h) - \sin x}{h} $$
    *This identity expands $\sin(x+h)$ into terms that are easier to manipulate.*

4.  **Rearrange the numerator to group terms:**
    $$ \frac{d}{dx}(\sin x) = \lim_{h \to 0} \frac{\sin x \cos h - \sin x + \cos x \sin h}{h} $$
    *We've simply reordered the terms to prepare for factoring.*

5.  **Factor out $\sin x$ from the first two terms:**
    $$ \frac{d}{dx}(\sin x) = \lim_{h \to 0} \frac{\sin x (\cos h - 1) + \cos x \sin h}{h} $$
    *Factoring helps us isolate expressions that resemble our special limits.*

6.  **Split the fraction into two separate limits using limit laws:**
    $$ \frac{d}{dx}(\sin x) = \lim_{h \to 0} \left( \frac{\sin x (\cos h - 1)}{h} + \frac{\cos x \sin h}{h} \right) $$
    $$ \frac{d}{dx}(\sin x) = \left( \lim_{h \to 0} \sin x \frac{\cos h - 1}{h} \right) + \left( \lim_{h \to 0} \cos x \frac{\sin h}{h} \right) $$
    *The limit of a sum is the sum of the limits. This separates the problem into two more manageable parts.*

7.  **Pull out $\sin x$ and $\cos x$ from their respective limits (they are constants with respect to $h$):**
    $$ \frac{d}{dx}(\sin x) = \sin x \left( \lim_{h \to 0} \frac{\cos h - 1}{h} \right) + \cos x \left( \lim_{h \to 0} \frac{\sin h}{h} \right) $$
    *Any term that doesn't depend on $h$ can be treated as a constant and moved outside the limit operation.*

8.  **Evaluate the special trigonometric limits:**
    *   We know $\lim_{h \to 0} \frac{\cos h - 1}{h} = 0$.
    *   We know $\lim_{h \to 0} \frac{\sin h}{h} = 1$.
    $$ \frac{d}{dx}(\sin x) = \sin x (0) + \cos x (1) $$
    *Substituting the known values of these fundamental limits.*

9.  **Simplify to get the final result:**
    $$ \frac{d}{dx}(\sin x) = 0 + \cos x $$
    $$ \boxed{\frac{d}{dx}(\sin x) = \cos x} $$
    *The final algebraic simplification.*

**Reflection:** The trickiest part here is remembering and correctly applying the angle sum identity and recognizing the special limits. Each step builds logically on the previous one.

---

### Example 2: Derive $\frac{d}{dx}(\cos x)$ from first principles.

**Problem:** Find the derivative of $f(x) = \cos x$ using the definition of the derivative.

**Given:** The function $f(x) = \cos x$.
**Want:** The derivative $f'(x) = \frac{d}{dx}(\cos x)$.

**Solution:**

1.  **Start with the definition of the derivative:**
    $$ f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} $$
    *The starting point for any first-principles derivative.*

2.  **Substitute $f(x) = \cos x$ into the definition:**
    $$ \frac{d}{dx}(\cos x) = \lim_{h \to 0} \frac{\cos(x+h) - \cos x}{h} $$
    *Replacing the generic function $f(x)$ with our specific function $\cos x$.*

3.  **Apply the angle sum identity for cosine: $\cos(A+B) = \cos A \cos B - \sin A \sin B$**
    $$ \frac{d}{dx}(\cos x) = \lim_{h \to 0} \frac{(\cos x \cos h - \sin x \sin h) - \cos x}{h} $$
    *This identity is key to expanding $\cos(x+h)$ into terms we can manipulate.*

4.  **Rearrange the numerator to group terms:**
    $$ \frac{d}{dx}(\cos x) = \lim_{h \to 0} \frac{\cos x \cos h - \cos x - \sin x \sin h}{h} $$
    *Reordering terms to make factoring easier.*

5.  **Factor out $\cos x$ from the first two terms:**
    $$ \frac{d}{dx}(\cos x) = \lim_{h \to 0} \frac{\cos x (\cos h - 1) - \sin x \sin h}{h} $$
    *Factoring helps us identify the special limit forms.*

6.  **Split the fraction into two separate limits using limit laws:**
    $$ \frac{d}{dx}(\cos x) = \lim_{h \to 0} \left( \frac{\cos x (\cos h - 1)}{h} - \frac{\sin x \sin h}{h} \right) $$
    $$ \frac{d}{dx}(\cos x) = \left( \lim_{h \to 0} \cos x \frac{\cos h - 1}{h} \right) - \left( \lim_{h \to 0} \sin x \frac{\sin h}{h} \right) $$
    *The limit of a difference is the difference of the limits. This breaks down the problem.*

7.  **Pull out $\cos x$ and $\sin x$ from their respective limits:**
    $$ \frac{d}{dx}(\cos x) = \cos x \left( \lim_{h \to 0} \frac{\cos h - 1}{h} \right) - \sin x \left( \lim_{h \to 0} \frac{\sin h}{h} \right) $$
    *Treating $\cos x$ and $\sin x$ as constants with respect to $h$, allowing them to be moved outside the limit.*

8.  **Evaluate the special trigonometric limits:**
    *   We know $\lim_{h \to 0} \frac{\cos h - 1}{h} = 0$.
    *   We know $\lim_{h \to 0} \frac{\sin h}{h} = 1$.
    $$ \frac{d}{dx}(\cos x) = \cos x (0) - \sin x (1) $$
    *Substituting the known values of the special limits.*

9.  **Simplify to get the final result:**
    $$ \frac{d}{dx}(\cos x) = 0 - \sin x $$
    $$ \boxed{\frac{d}{dx}(\cos x) = -\sin x} $$
    *Final algebraic simplification.*

**Reflection:** The most common mistake here is forgetting the negative sign in the final answer. Pay close attention to the minus sign from the angle sum identity and how it propagates.

---

### Example 3: Find $\frac{d}{dx}(2\sin x)$ from first principles.

**Problem:** Find the derivative of $f(x) = 2\sin x$ using the definition of the derivative.

**Given:** The function $f(x) = 2\sin x$.
**Want:** The derivative $f'(x) = \frac{d}{dx}(2\sin x)$.

**Solution:**

1.  **Start with the definition of the derivative:**
    $$ f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} $$
    *The fundamental definition.*

2.  **Substitute $f(x) = 2\sin x$ into the definition:**
    $$ \frac{d}{dx}(2\sin x) = \lim_{h \to 0} \frac{2\sin(x+h) - 2\sin x}{h} $$
    *Substituting the given function into the limit expression.*

3.  **Factor out the constant 2 from the numerator:**
    $$ \frac{d}{dx}(2\sin x) = \lim_{h \to 0} \frac{2(\sin(x+h) - \sin x)}{h} $$
    *This is a constant multiple, so we can pull it out of the limit.*

4.  **Pull the constant 2 outside the limit:**
    $$ \frac{d}{dx}(2\sin x) = 2 \lim_{h \to 0} \frac{\sin(x+h) - \sin x}{h} $$
    *By the constant multiple rule for limits, a constant factor can be moved outside the limit operator.*

5.  **Recognize the remaining limit as the definition of $\frac{d}{dx}(\sin x)$:**
    $$ \frac{d}{dx}(2\sin x) = 2 \left( \frac{d}{dx}(\sin x) \right) $$
    *We've already derived this in Example 1.*

6.  **Substitute the known derivative of $\sin x$:**
    $$ \frac{d}{dx}(2\sin x) = 2 (\cos x) $$
    *Using the result from Example 1, $\frac{d}{dx}(\sin x) = \cos x$.*

7.  **Simplify to get the final result:**
    $$ \boxed{\frac{d}{dx}(2\sin x) = 2\cos x} $$
    *Final simplification.*

**Reflection:** This example demonstrates the constant multiple rule for derivatives in action, even when using first principles. It shows that if you have a constant multiplied by a function, you can differentiate the function and then multiply by the constant.

---

### Example 4: Find $\frac{d}{dx}(\sin(x+c))$ from first principles, where $c$ is a constant.

**Problem:** Find the derivative of $f(x) = \sin(x+c)$ using the definition of the derivative, where $c$ is a constant.

**Given:** The function $f(x) = \sin(x+c)$ and $c$ is a constant.
**Want:** The derivative $f'(x) = \frac{d}{dx}(\sin(x+c))$.

**Solution:**

1.  **Start with the definition of the derivative:**
    $$ f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} $$
    *The foundational definition.*

2.  **Substitute $f(x) = \sin(x+c)$ into the definition:**
    $$ \frac{d}{dx}(\sin(x+c)) = \lim_{h \to 0} \frac{\sin((x+h)+c) - \sin(x+c)}{h} $$
    *Carefully substitute $x+h$ into the argument of the sine function: $(x+h)+c = x+c+h$.*

3.  **Rewrite the argument for clarity:**
    $$ \frac{d}{dx}(\sin(x+c)) = \lim_{h \to 0} \frac{\sin((x+c)+h) - \sin(x+c)}{h} $$
    *We can treat $(x+c)$ as a single variable, say $A$, and $h$ as $B$. This sets up the angle sum identity.*

4.  **Apply the angle sum identity for sine: $\sin(A+B) = \sin A \cos B + \cos A \sin B$**
    Let $A = (x+c)$ and $B = h$.
    $$ \frac{d}{dx}(\sin(x+c)) = \lim_{h \to 0} \frac{(\sin(x+c) \cos h + \cos(x+c) \sin h) - \sin(x+c)}{h} $$
    *This expands the $\sin((x+c)+h)$ term.*

5.  **Rearrange and factor out $\sin(x+c)$:**
    $$ \frac{d}{dx}(\sin(x+c)) = \lim_{h \to 0} \frac{\sin(x+c) \cos h - \sin(x+c) + \cos(x+c) \sin h}{h} $$
    $$ \frac{d}{dx}(\sin(x+c)) = \lim_{h \to 0} \frac{\sin(x+c) (\cos h - 1) + \cos(x+c) \sin h}{h} $$
    *Grouping terms and factoring to prepare for splitting the limit.*

6.  **Split the fraction into two separate limits:**
    $$ \frac{d}{dx}(\sin(x+c)) = \lim_{h \to 0} \left( \frac{\sin(x+c) (\cos h - 1)}{h} + \frac{\cos(x+c) \sin h}{h} \right) $$
    $$ \frac{d}{dx}(\sin(x+c)) = \sin(x+c) \left( \lim_{h \to 0} \frac{\cos h - 1}{h} \right) + \cos(x+c) \left( \lim_{h \to 0} \frac{\sin h}{h} \right) $$
    *Applying limit laws and treating $\sin(x+c)$ and $\cos(x+c)$ as constants with respect to $h$.*

7.  **Evaluate the special trigonometric limits:**
    *   $\lim_{h \to 0} \frac{\cos h - 1}{h} = 0$
    *   $\lim_{h \to 0} \frac{\sin h}{h} = 1$
    $$ \frac{d}{dx}(\sin(x+c)) = \sin(x+c) (0) + \cos(x+c) (1) $$
    *Substituting the known values of the special limits.*

8.  **Simplify to get the final result:**
    $$ \frac{d}{dx}(\sin(x+c)) = 0 + \cos(x+c) $$
    $$ \boxed{\frac{d}{dx}(\sin(x+c)) = \cos(x+c)} $$
    *Final algebraic simplification.*

**Reflection:** This example is a subtle precursor to the chain rule. It shows that a horizontal shift (adding a constant $c$ to $x$) does not change the form of the derivative; the derivative of $\sin(x+c)$ is simply $\cos(x+c)$, not $\cos(x+c)$ multiplied by some factor. This is because the derivative of $(x+c)$ with respect to $x$ is just $1$. This confirms that the derivative tells us about the *shape* of the curve, which is unaffected by horizontal shifts.

## 6. Common mistakes and traps

1.  **Forgetting to use radians:** The special limits $\lim_{x \to 0} \frac{\sin x}{x} = 1$ and $\lim_{x \to 0} \frac{\cos x - 1}{x} = 0$ (and thus the derivatives of $\sin x$ and $\cos x$) are only valid when $x$ is measured in radians. If degrees were used, the formulas would involve a constant factor of $\frac{\pi}{180}$.
2.  **Incorrectly applying angle sum/difference formulas:** A common error is misremembering the signs or swapping sine and cosine in identities like $\sin(A+B)$ or $\cos(A+B)$. For instance, writing $\cos(A+B) = \cos A \cos B + \sin A \sin B$ (wrong sign) or $\sin(A+B) = \sin A \cos B - \cos A \sin B$ (wrong sign).
3.  **Algebraic errors in factoring or splitting fractions:** Mistakes can occur when factoring out $\sin x$ or $\cos x$ from terms, or when incorrectly splitting the numerator into separate fractions. For example, $\frac{A+B}{C}$ is $\frac{A}{C} + \frac{B}{C}$, but $\frac{A}{B+C}$ is *not* $\frac{A}{B} + \frac{A}{C}$.
4.  **Misremembering the special limits:** Confusing $\lim_{h \to 0} \frac{\sin h}{h} = 1$ with $\lim_{h \to 0} \frac{\cos h - 1}{h} = 0$, or getting the sign wrong for the cosine limit (e.g., thinking it's $+1$ or $-1$).
5.  **Dropping the limit notation:** It's crucial to write $\lim_{h \to 0}$ at each step until the limit is actually evaluated. Omitting it implies that the expression is equal to the derivative from the beginning, which is not true until the limit process is complete.
6.  **Sign errors in the final result:** Especially for $\frac{d}{dx}(\cos x)$, forgetting the negative sign is a very common oversight. The mnemonic "co-functions get a co-sign (negative sign)" can help.

## 7. Textbook-precise explanation

The derivation of the derivatives of the sine and cosine functions from first principles relies on the formal definition of the derivative and two fundamental trigonometric limits, assuming the angle $x$ is measured in radians.

**Definition of the Derivative:**
For a function $f(x)$, its derivative $f'(x)$ is defined as:
$$ f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} $$
provided this limit exists.

**Key Trigonometric Identities:**
1.  $\sin(A+B) = \sin A \cos B + \cos A \sin B$
2.  $\cos(A+B) = \cos A \cos B - \sin A \sin B$

**Fundamental Trigonometric Limits (proven previously):**
1.  $\lim_{h \to 0} \frac{\sin h}{h} = 1$
2.  $\lim_{h \to 0} \frac{\cos h - 1}{h} = 0$

---

**Derivation of $\frac{d}{dx}(\sin x)$:**

Let $f(x) = \sin x$. Applying the definition of the derivative:
$$ \frac{d}{dx}(\sin x) = \lim_{h \to 0} \frac{\sin(x+h) - \sin x}{h} $$
Using the angle sum identity for sine, $\sin(x+h) = \sin x \cos h + \cos x \sin h$:
$$ \frac{d}{dx}(\sin x) = \lim_{h \to 0} \frac{(\sin x \cos h + \cos x \sin h) - \sin x}{h} $$
Rearranging and factoring out $\sin x$:
$$ \frac{d}{dx}(\sin x) = \lim_{h \to 0} \frac{\sin x (\cos h - 1) + \cos x \sin h}{h} $$
Splitting the fraction and applying the limit sum rule:
$$ \frac{d}{dx}(\sin x) = \lim_{h \to 0} \left( \sin x \frac{\cos h - 1}{h} + \cos x \frac{\sin h}{h} \right) $$
Applying the limit constant multiple rule, where $\sin x$ and $\cos x$ are constants with respect to $h$:
$$ \frac{d}{dx}(\sin x) = \sin x \left( \lim_{h \to 0} \frac{\cos h - 1}{h} \right) + \cos x \left( \lim_{h \to 0} \frac{\sin h}{h} \right) $$
Substituting the values of the fundamental trigonometric limits:
$$ \frac{d}{dx}(\sin x) = \sin x (0) + \cos x (1) $$
$$ \frac{d}{dx}(\sin x) = \cos x $$

---

**Derivation of $\frac{d}{dx}(\cos x)$:**

Let $f(x) = \cos x$. Applying the definition of the derivative:
$$ \frac{d}{dx}(\cos x) = \lim_{h \to 0} \frac{\cos(x+h) - \cos x}{h} $$
Using the angle sum identity for cosine, $\cos(x+h) = \cos x \cos h - \sin x \sin h$:
$$ \frac{d}{dx}(\cos x) = \lim_{h \to 0} \frac{(\cos x \cos h - \sin x \sin h) - \cos x}{h} $$
Rearranging and factoring out $\cos x$:
$$ \frac{d}{dx}(\cos x) = \lim_{h \to 0} \frac{\cos x (\cos h - 1) - \sin x \sin h}{h} $$
Splitting the fraction and applying the limit difference rule:
$$ \frac{d}{dx}(\cos x) = \lim_{h \to 0} \left( \cos x \frac{\cos h - 1}{h} - \sin x \frac{\sin h}{h} \right) $$
Applying the limit constant multiple rule:
$$ \frac{d}{dx}(\cos x) = \cos x \left( \lim_{h \to 0} \frac{\cos h - 1}{h} \right) - \sin x \left( \lim_{h \to 0} \frac{\sin h}{h} \right) $$
Substituting the values of the fundamental trigonometric limits:
$$ \frac{d}{dx}(\cos x) = \cos x (0) - \sin x (1) $$
$$ \frac{d}{dx}(\cos x) = -\sin x $$

These derivations confirm that for angles measured in radians, the derivative of $\sin x$ is $\cos x$, and the derivative of $\cos x$ is $-\sin x$. This is a standard result found in any introductory calculus textbook (e.g., Stewart, Calculus, 9e, §3.3 "Derivatives of Trigonometric Functions").

## 8. ASCII diagrams

Here are a few ASCII diagrams to visualize the concepts.

**Figure 1: Unit Circle Definition of Sine and Cosine**
This diagram shows a point P on the unit circle, with angle $\theta$ from the positive x-axis. Its coordinates are $(\cos\theta, \sin\theta)$.

```text
       Y
       |
       |     P(cos(theta), sin(theta))
       |   / |
       |  /  | sin(theta)
       | /   |
       O-----+----- X
           cos(theta)

  The Unit Circle:
  - Radius = 1
  - Angle 'theta' is measured counter-clockwise from the positive X-axis.
  - X-coordinate of P is cos(theta).
  - Y-coordinate of P is sin(theta).
```

**Figure 2: Graphs of Sine and Cosine with Tangent Slope**
This illustrates the relationship between the sine function and its derivative, the cosine function. Notice how the slope of $\sin x$ (the dashed tangent lines) matches the value of $\cos x$. Where $\sin x$ has a peak (slope 0), $\cos x$ is 0. Where $\sin x$ is steepest going up (slope 1), $\cos x$ is 1.

```text
      ^ y
      |
    1 +       *           *           *        <-- Peaks of sin(x) (slope 0)
      |     *   *       *   *       *   *
      |   *       *   *       *   *       *
      +-------------------------------------> x
      0 ---pi/2---pi---3pi/2--2pi---5pi/2
      |   / \     / \     / \     / \
      |  /   \   /   \   /   \   /   \       <-- Dashed lines show tangent slopes
      | /     \ /     \ /     \ /     \
   -1 +*-------*-------*-------*-------*      <-- Valleys of sin(x) (slope 0)

      ^ y
      |
    1 *           *           *              <-- Peaks of cos(x) (derivative of sin(x))
      | *       *   *       *   *       *
      |   *   *       *   *       *   *
      +-------------------------------------> x
      0 ---pi/2---pi---3pi/2--2pi---5pi/2
      |
   -1 +       *           *           *      <-- Valleys of cos(x)

  Observation:
  - When sin(x) is increasing (positive slope), cos(x) is positive.
  - When sin(x) is decreasing (negative slope), cos(x) is negative.
  - When sin(x) has a horizontal tangent (slope 0 at peaks/valleys), cos(x) is zero.
```

**Figure 3: Visualizing the Special Limit $\lim_{h \to 0} \frac{\sin h}{h} = 1$**
This diagram shows a sector of a unit circle with a small angle $h$. It illustrates that for small $h$, the arc length $h$ is approximately equal to the length of the opposite side of the triangle, $\sin h$.

```text
       Y
       |
       |     .-- P(cos h, sin h)
       |   / |
       |  /  | sin h
       | /   |
       O-----+----- X
       1    cos h

  For a small angle h (in radians) on the unit circle:
  - The arc length from (1,0) to P is h.
  - The vertical side of the right triangle is sin h.
  - As h approaches 0, the length of the arc (h) becomes
    almost identical to the length of the opposite side (sin h).
  - Therefore, sin h / h approaches 1.
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic / Visual Hook:**
    *   **"Sine is Positive, Cosine is Cold (Negative)"**:
        *   When you differentiate $\sin x$, you get $\cos x$ (positive).
        *   When you differentiate $\cos x$ (a "co-function"), you get $-\sin x$ (it's "cold" or gets a "negative sign").
    *   **The Derivative Cycle**: Imagine a cycle:
        $\sin x \xrightarrow{d/dx} \cos x \xrightarrow{d/dx} -\sin x \xrightarrow{d/dx} -\cos x \xrightarrow{d/dx} \sin x$
        This helps visualize the pattern and the signs.

2.  **The 1-3 Formulas/Facts You MUST Overlearn:**
    *   $\frac{d}{dx}(\sin x) = \cos x$
    *   $\frac{d}{dx}(\cos x) = -\sin x$
    *   The two special limits (which are the foundation for the proofs):
        *   $\lim_{h \to 0} \frac{\sin h}{h} = 1$
        *   $\lim_{h \to 0} \frac{\cos h - 1}{h} = 0$
    (And implicitly, you must remember the angle sum identities for sine and cosine.)

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Immediately after learning, review the derivations and formulas.
    *   **Day 3:** Review again. Try to re-derive from scratch without looking.
    *   **Day 7:** Review. Focus on the tricky steps and common mistakes.
    *   **Day 16:** Review. Ensure you can still perform the full derivation and apply the formulas quickly.
    *   **Day 35:** Final review to solidify long-term memory.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the formulas, you can always rebuild them by following these steps:
    *   **Step 1: Start with the definition:** $f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$
    *   **Step 2: Substitute $f(x)$** (either $\sin x$ or $\cos x$).
    *   **Step 3: Apply the correct angle sum identity** ($\sin(A+B)$ or $\cos(A+B)$).
    *   **Step 4: Rearrange and factor** terms to isolate $(\cos h - 1)$ and $\sin h$.
    *   **Step 5: Split the limit** into two parts.
    *   **Step 6: Substitute the special limits** ($\lim_{h \to 0} \frac{\sin h}{h} = 1$ and $\lim_{h \to 0} \frac{\cos h - 1}{h} = 0$).
    *   **Step 7: Simplify.**

This pathway ensures that even if a formula slips your mind, you have a reliable method to reconstruct it from fundamental principles.

## 10. Connections — what this leads to

The derivatives of $\sin x$ and $\cos x$ are fundamental results that unlock a vast array of topics in calculus and beyond:

1.  **Derivatives of Other Trigonometric Functions:** Knowing $\frac{d}{dx}(\sin x)$ and $\frac{d}{dx}(\cos x)$ is essential for deriving the derivatives of the other four trigonometric functions ($\tan x$, $\cot x$, $\sec x$, $\csc x$) using the quotient rule. For example, $\frac{d}{dx}(\tan x) = \frac{d}{dx}\left(\frac{\sin x}{\cos x}\right)$.

2.  **Chain Rule:** The ability to differentiate $\sin x$ and $\cos x$ is immediately extended by the chain rule to differentiate composite functions like $\sin(g(x))$ or $\cos(g(x))$. This allows us to differentiate functions like $\sin(x^2)$, $\cos(3x-1)$, or $\sin(\ln x)$. This is crucial for modeling more complex periodic phenomena.

3.  **Product Rule and Quotient Rule:** These derivative rules combine with the derivatives of $\sin x$ and $\cos x$ to handle functions like $x \sin x$, $e^x \cos x$, or $\frac{\sin x}{x^2}$.

4.  **Higher Order Derivatives:** Repeated differentiation of $\sin x$ and $\cos x$ leads to a cyclical pattern ($\sin \to \cos \to -\sin \to -\cos \to \sin \dots$). This pattern is vital in solving and understanding **differential equations**, especially those describing simple harmonic motion (e.g., $y'' + y = 0$).

5.  **Implicit Differentiation:** When dealing with equations where $y$ is implicitly defined in terms of $x$ and trigonometric functions, knowing these derivatives is necessary (e.g., finding $\frac{dy}{dx}$ for $\sin(xy) = x^2$).

6.  **Related Rates and Optimization:** Many real-world problems involving changing angles, lengths, or positions (e.g., a ladder sliding down a wall, a rotating beacon) use trigonometric functions, and their derivatives are needed to solve related rates problems or find maximum/minimum values in optimization problems.

7.  **Taylor Series and Power Series:** The derivatives of $\sin x$ and $\cos x$ are used to generate their respective Taylor series expansions around a point. For instance, the Taylor series for $\sin x$ around $x=0$ is $x - \frac{x^3}{3!} + \frac{x^5}{5!} - \dots$, which is derived from repeatedly differentiating $\sin x$ and evaluating at $x=0$.

8.  **Integration (Antiderivatives):** The inverse relationship between differentiation and integration means that knowing $\frac{d}{dx}(\sin x) = \cos x$ implies $\int \cos x \, dx = \sin x + C$, and similarly for $\cos x$. This forms the basis for integrating trigonometric functions.

9.  **Complex Numbers (Euler's Formula):** The derivatives of $\sin x$ and $\cos x$ play a role in proving Euler's formula, $e^{ix} = \cos x + i \sin x$, which deeply connects exponential functions with trigonometry and has profound implications in fields like electrical engineering and quantum mechanics.

## 11. Self-check questions

1.  Using the definition of the derivative (first principles), prove that $\frac{d}{dx}(\sin x) = \cos x$. Show every algebraic and limit step.
2.  Using the definition of the derivative (first principles), prove that $\frac{d}{dx}(\cos x) = -\sin x$. Show every algebraic and limit step.
3.  Given the results from Q1 and Q2, find the derivative of $f(x) = 3\cos x - 7\sin x + 10$.
4.  Without using the product rule, derive $\frac{d}{dx}(\sin x \cos x)$ from first principles. (Hint: Use a double angle identity to simplify the function first, then apply the definition of the derivative.)
5.  Explain in your own words why the condition that $x$ must be in radians is essential for the derivative formulas $\frac{d}{dx}(\sin x) = \cos x$ and $\frac{d}{dx}(\cos x) = -\sin x$ to be true. What would the formulas look like if $x$ were in degrees?