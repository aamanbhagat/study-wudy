## What it is
A one-sided limit describes the exact value a function approaches as you get infinitely close to a specific input from *only one direction*—either strictly from values lesser than the target (the left) or greater than the target (the right). It allows us to analyze the behavior of functions at points where they might suddenly break, jump, or behave unpredictably.

## Why it matters
In aerospace engineering, one-sided limits govern sudden state changes, like the instantaneous jump in air density across a supersonic shockwave. In computer science and machine learning, they are essential for analyzing non-smooth activation functions (like ReLU) and control logic containing piecewise conditions (e.g., "if thrust > 100kN, switch modes"). They form the strict mathematical foundation for defining continuity and differentiability.

## When to study it
You must already understand basic function notation, the concept of a general limit (the idea of "approaching" a value), and domain restrictions. If you cannot confidently evaluate $\lim_{x \to 2} (3x + 1)$ or identify where $f(x) = 1/x$ is undefined, review basic limits and algebraic functions first. 

## How to study it (step by step)
1. **Visualize the break:** Graph a piecewise function with a visible jump (e.g., a step function). Trace your finger along the curve from the left, then from the right, noting the different y-values. 
2. **Master the notation:** Learn to instantly read $x \to a^-$ as "approaching $a$ from the left" and $x \to a^+$ as "approaching $a$ from the right." 
3. **Deconstruct absolute values:** Break down functions like $f(x) = \frac{|x|}{x}$ algebraically into piecewise functions. Compute both one-sided limits at $x=0$. Absolute values are the most common source of hidden one-sided limit problems.
4. **Prove the Limit Existence Theorem:** Convince yourself that a general limit $\lim_{x \to a} f(x)$ only exists if both one-sided limits exist and equal each other.
5. **Analyze asymptotes:** Practice finding one-sided limits at vertical asymptotes (e.g., $f(x) = \frac{1}{x}$ as $x \to 0^+$ vs $x \to 0^-$) to understand how functions escape to positive or negative infinity.

## Key ideas, with intuition
*   **The Left-Hand Limit:** Written as $\lim_{x \to a^-} f(x) = L$. The minus sign in the superscript means $x$ is approaching $a$ through values strictly *less than* $a$. If $a=2$, $x$ takes values like $1.9, 1.99, 1.999$.
*   **The Right-Hand Limit:** Written as $\lim_{x \to a^+} f(x) = R$. The plus sign means $x$ is approaching $a$ through values strictly *greater than* $a$. If $a=2$, $x$ takes values like $2.1, 2.01, 2.001$.
*   **The Bridge to General Limits:** The two-sided (general) limit exists and equals $L$ *if and only if* both one-sided limits exist and are equal. Mathematically:
    $$ \lim_{x \to a} f(x) = L \iff \lim_{x \to a^-} f(x) = \lim_{x \to a^+} f(x) = L $$
*   **Jump Discontinuities:** If $\lim_{x \to a^-} f(x) \neq \lim_{x \to a^+} f(x)$, the graph has a "jump." The function is fundamentally broken at $x=a$. The general limit does not exist, regardless of whether $f(a)$ itself is defined.

## Worked example
Evaluate the left-hand and right-hand limits of $f(x) = \frac{x^2 - 4}{|x - 2|}$ as $x$ approaches $2$. Does the general limit exist?

*Step 1: Factor the numerator.*
$$f(x) = \frac{(x-2)(x+2)}{|x-2|}$$

*Step 2: Define the absolute value as a piecewise function.*
By definition, $|x - 2| = (x - 2)$ for $x > 2$, and $|x - 2| = -(x - 2)$ for $x < 2$.

*Step 3: Evaluate the right-hand limit ($x \to 2^+$).*
Since $x \to 2^+$, we know $x > 2$. Therefore, we substitute $|x - 2|$ with $(x - 2)$.
$$ \lim_{x \to 2^+} \frac{(x-2)(x+2)}{x-2} = \lim_{x \to 2^+} (x+2) = 2 + 2 = 4 $$

*Step 4: Evaluate the left-hand limit ($x \to 2^-$).*
Since $x \to 2^-$, we know $x < 2$. Therefore, we substitute $|x - 2|$ with $-(x - 2)$.
$$ \lim_{x \to 2^-} \frac{(x-2)(x+2)}{-(x-2)} = \lim_{x \to 2^-} -(x+2) = -(2 + 2) = -4 $$

*Step 5: Compare the limits.*
Because $4 \neq -4$, the left and right limits are not equal. 

*Conclusion:* 
The general limit $\lim_{x \to 2} f(x)$ does not exist. 

*Reflection:* Factoring allowed us to isolate the problematic $(x-2)$ term. The absolute value forced the function to behave differently depending on the direction of approach, creating a jump discontinuity at $x=2$.

## Diagrams
Here is the graph of the function from the worked example: $f(x) = \frac{x^2 - 4}{|x - 2|}$. Notice the jump discontinuity at $x=2$. The open circles (`o`) indicate the function is undefined at exactly $x=2$.

```text
       y
       ^
     4 |                   o------- f(x) approaches 4 from the right
       |                 /
       |               /
     0 +-------------+-------------> x
       |             2
       |           /
    -4 |---------o  f(x) approaches -4 from the left
       |
```

## Memory technique — remember this forever
1. **The Hook:** Think of the superscript minus/plus signs as a "wind direction". $x \to a^-$ means the wind is blowing from the negative numbers (the left). $x \to a^+$ means the wind is blowing from the positive numbers (the right).
2. **Overlearn this fact:** $\lim_{x \to a} f(x) = L \iff \lim_{x \to a^-} f(x) = \lim_{x \to a^+} f(x) = L$. (If the left and right don't match, the general limit is dead).
3. **Spaced Repetition Schedule:** Review this concept and the worked example at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you freeze on an exam and forget how to evaluate a one-sided limit algebraically, plug in numerical values. For $\lim_{x \to a^-}$, plug in $x = a - 0.001$. For $\lim_{x \to a^+}$, plug in $x = a + 0.001$. The numerical trend will always reveal the algebraic truth.

## Common mistakes
*   **Confusing $x \to -a$ with $x \to a^-$.** The minus sign's position is critical. $x \to -2$ means approaching negative two from both sides. $x \to 2^-$ means approaching positive two from the left.
*   **Assuming $f(a)$ is the limit.** The actual function value at the point (a closed dot on a graph) has absolutely no bearing on where the function is *heading* (the limit). 
*   **Using the wrong piece of a piecewise function.** When evaluating $\lim_{x \to a^-}$, you must use the equation defined for $x < a$. Students frequently plug $a$ into the wrong equation.

## Self-check
1. Evaluate $\lim_{x \to 0^-} \frac{1}{x}$ and $\lim_{x \to 0^+} \frac{1}{x}$.
2. Let $f(x) = \begin{cases} x^2 & \text{if } x < 1 \\ 3 - x & \text{if } x \geq 1 \end{cases}$. Find $\lim_{x \to 1^-} f(x)$ and $\lim_{x \to 1^+} f(x)$. Does the general limit exist?
3. Determine the left and right limits of $f(x) = e^{1/x}$ as $x \to 0$. *(Hint: think about the behavior of $1/x$ from question 1, and how the exponential function responds to massive positive vs. massive negative inputs).*