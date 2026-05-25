## What it is
Product-to-sum formulas are trigonometric identities that convert the multiplication of two trigonometric functions (like sine and cosine) into a sum or difference of those functions. They allow you to rewrite a product of waves as a linear combination of separate waves.

## Why it matters
In calculus, integrating a product like $\int \sin(5x)\cos(2x) dx$ is difficult, but integrating a sum is trivial because the integral operator is linear. In physics and aerospace engineering, these formulas explain wave interference. When two signals multiply (as in Amplitude Modulation for radio transmissions), the product-to-sum formulas reveal the exact frequencies of the resulting sidebands. They are the mathematical mechanism behind acoustic "beats" and signal modulation.

## When to study it
You must already possess absolute fluency in the **angle addition and subtraction formulas**:
1. $\sin(A \pm B) = \sin(A)\cos(B) \pm \cos(A)\sin(B)$
2. $\cos(A \pm B) = \cos(A)\cos(B) \mp \sin(A)\sin(B)$

If you cannot write these down from memory instantly, stop. Go back and memorize them. The product-to-sum formulas are merely algebraic consequences of these four equations.

## How to study it (step by step)
1. Write down the expansion for $\sin(A+B)$ and $\sin(A-B)$ directly above one another.
2. Add the two equations together. Observe how the $\cos(A)\sin(B)$ terms cancel out, leaving you with $2\sin(A)\cos(B)$. Divide by 2 to isolate the product.
3. Repeat this process for cosines: write down $\cos(A+B)$ and $\cos(A-B)$. Add them to isolate $\cos(A)\cos(B)$.
4. Subtract $\cos(A+B)$ from $\cos(A-B)$ to isolate $\sin(A)\sin(B)$. Pay strict attention to the negative signs here.
5. Practice by converting products of standard unit circle angles (e.g., $75^\circ$ and $15^\circ$) into sums, and verify that the arithmetic holds up.

## Key ideas, with intuition
**Idea 1: Superposition vs. Modulation**
Geometrically, adding two waves produces a new wave via superposition. Multiplying two waves produces a complex modulated wave. The product-to-sum identities prove that *every modulated wave can be perfectly described as the simple superposition of two other waves*. 

**Idea 2: The Derivation is just Elimination**
You are solving a system of linear equations. Let $x = \sin(A)\cos(B)$ and $y = \cos(A)\sin(B)$. The addition formulas are just $x + y = \sin(A+B)$ and $x - y = \sin(A-B)$. Adding the equations eliminates $y$. 

The three core formulas are:
$$ \sin(A)\cos(B) = \frac{1}{2} \left[ \sin(A+B) + \sin(A-B) \right] $$
$$ \cos(A)\cos(B) = \frac{1}{2} \left[ \cos(A+B) + \cos(A-B) \right] $$
$$ \sin(A)\sin(B) = \frac{1}{2} \left[ \cos(A-B) - \cos(A+B) \right] $$

## Worked example
**Problem:** Evaluate the exact value of $\cos(75^\circ)\cos(15^\circ)$ without a calculator.

**Step 1: Identify the correct formula.**
We have a product of two cosines. We will use:
$$ \cos(A)\cos(B) = \frac{1}{2} \left[ \cos(A+B) + \cos(A-B) \right] $$

**Step 2: Substitute the angles.**
Let $A = 75^\circ$ and $B = 15^\circ$.
$$ \cos(75^\circ)\cos(15^\circ) = \frac{1}{2} \left[ \cos(75^\circ + 15^\circ) + \cos(75^\circ - 15^\circ) \right] $$

**Step 3: Simplify the arguments.**
$$ \cos(75^\circ)\cos(15^\circ) = \frac{1}{2} \left[ \cos(90^\circ) + \cos(60^\circ) \right] $$

**Step 4: Evaluate using standard unit circle values.**
We know $\cos(90^\circ) = 0$ and $\cos(60^\circ) = \frac{1}{2}$.
$$ \frac{1}{2} \left[ 0 + \frac{1}{2} \right] = \frac{1}{4} $$

*Reflection:* Multiplying non-standard angles ($75^\circ, 15^\circ$) directly is practically impossible by hand. The product-to-sum conversion shifts the complexity from the functions to the arguments, yielding standard angles ($90^\circ, 60^\circ$) that are trivial to evaluate.

## Diagrams
Here is the structural logic of the derivation. By stacking the addition formulas, the elimination of terms becomes visually obvious.

```text
Deriving sin(A)cos(B):

Equation 1:    sin(A)cos(B)  +  cos(A)sin(B)  =  sin(A+B)
Equation 2:    sin(A)cos(B)  -  cos(A)sin(B)  =  sin(A-B)
             --------------------------------------------- (ADD)
Result:      2*sin(A)cos(B)  +       0        =  sin(A+B) + sin(A-B)

Divide by 2:   sin(A)cos(B)                   =  1/2 [ sin(A+B) + sin(A-B) ]
```

## Memory technique — remember this forever
**1. The Mnemonic: "Sine Mixes, Cosine Matches"**
*   If the product is **mixed** ($\sin\cos$), it comes from adding **Sines**.
*   If the product is **matched** ($\cos\cos$ or $\sin\sin$), it comes from adding/subtracting **Cosines**.

**2. What to overlearn:**
Do not memorize the formulas by rote. Memorize the *stack-and-add* derivation shown in the diagram above. If you memorize the derivation, you get six formulas (product-to-sum and sum-to-product) for the price of zero memorization.

However, you must strictly remember the anomaly: **$\sin(A)\sin(B)$ requires subtracting $\cos(A+B)$ from $\cos(A-B)$.** It is the only formula where the $(A-B)$ term comes first. 

**3. Spaced-repetition schedule:**
Re-derive all three formulas on a blank sheet of paper at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. 

**4. First principles pathway:**
If you freeze during an exam, write down $\cos(A+B)$ and $\cos(A-B)$. Add them. Subtract them. You will have rebuilt the matched formulas in 15 seconds.

## Common mistakes
1. **Forgetting the $\frac{1}{2}$ factor.** Students often write $\sin(A)\cos(B) = \sin(A+B) + \sin(A-B)$. The factor of 2 generated by adding the equations must be divided out.
2. **Reversing the subtraction in the sine-sine formula.** Because $\cos(A+B) = \cos(A)\cos(B) - \sin(A)\sin(B)$, the $\sin\sin$ term is negative. To make it positive, you must compute $\cos(A-B) - \cos(A+B)$, not the other way around.
3. **Using this for $\sin(x)\cos(x)$.** While the product-to-sum formula works here, it is inefficient. Recognize that $A=B$, meaning you should immediately use the double-angle formula: $\sin(x)\cos(x) = \frac{1}{2}\sin(2x)$.

## Self-check
1. Express $\sin(4\theta)\sin(2\theta)$ as a sum or difference of trigonometric functions.
2. Calculate the exact value of $\sin(105^\circ)\cos(15^\circ)$ without a calculator.
3. Evaluate the indefinite integral $\int \sin(mx)\cos(nx) dx$, assuming $m$ and $n$ are constants and $m \neq n$.