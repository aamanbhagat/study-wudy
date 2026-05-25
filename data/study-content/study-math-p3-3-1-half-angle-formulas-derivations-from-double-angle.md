## 1. What it is — in plain English

Imagine you have a cake, and you know everything about its size, shape, and ingredients. Now, what if you cut that cake exactly in half? How would you describe the properties of that half-cake based on what you knew about the whole cake?

In mathematics, specifically trigonometry, we often deal with angles. A "half-angle formula" is like a special recipe that tells us how to find the sine, cosine, or tangent of an angle that's exactly half the size of another angle we already know about.

So, if you know the trigonometric values (like sine or cosine) for an angle, say $60^\circ$, these formulas let you calculate the trigonometric values for $30^\circ$ (which is half of $60^\circ$) directly, without needing to look them up or use a calculator. It's a bridge connecting the properties of a whole angle to the properties of its half.

Essentially, these formulas are powerful tools that allow us to break down calculations involving larger or more complex angles into simpler, smaller parts. They reveal a fundamental relationship between an angle and its bisected counterpart, making many calculations more accessible and elegant.

## 2. Why it matters — real-world applications

Half-angle formulas, while appearing abstract, are fundamental tools in various scientific and engineering disciplines where precise angular relationships are critical.

1.  **Aerospace Engineering & Navigation:** When designing flight paths or satellite orbits, engineers constantly deal with changes in angles. For instance, calculating the precise adjustment needed for a spacecraft's trajectory might involve relating a desired small change in direction (a half-angle scenario) to the current orientation. These formulas help in optimizing fuel consumption by precisely determining burn durations and angles, or in correcting for small deviations in course. They are embedded in the algorithms that power inertial navigation systems and guidance control.

2.  **Physics — Wave Mechanics and Optics:** In the study of waves (sound, light, water), phenomena like interference and diffraction depend on the phase differences and angles of interacting waves. When waves combine or split, their effective angles can be halved or doubled. For example, understanding how light refracts through a lens or prism, or how sound waves reflect off surfaces, can involve these identities to simplify complex wave equations. They are also crucial in deriving and simplifying equations in quantum mechanics for angular momentum.

3.  **Computer Graphics and Machine Learning:** In computer graphics, rendering realistic 3D environments involves numerous trigonometric calculations for rotations, transformations, and lighting effects. Half-angle formulas can simplify the computation of vectors and normals, especially when dealing with reflections or refractions of light on surfaces, which often involve angles being bisected. In machine learning, particularly in areas like signal processing or neural networks that use periodic activation functions, these identities can be used to simplify calculations or optimize the learning process by transforming complex features into simpler, more manageable forms.

4.  **Electrical Engineering — Signal Processing:** Analyzing alternating current (AC) circuits, radio waves, or any periodic signal often involves trigonometric functions. When signals are modulated, filtered, or combined, the frequencies (which are related to angles over time) can be halved or doubled. Half-angle formulas assist in simplifying the mathematical models of these processes, allowing engineers to design more efficient filters or understand signal distortion.

5.  **Surveying and Cartography:** When surveyors measure land or create maps, they use instruments that measure angles with extreme precision. Sometimes, to improve accuracy or to work around obstacles, they might bisect an angle and measure the half-angle, then use these formulas to relate it back to the full angle or other features in their calculations. This ensures that large-scale maps and construction projects are built on accurate angular foundations.

## 3. Prerequisites — what you must know first

Before diving into half-angle formulas, ensure you have a solid grasp of these foundational concepts:

*   **Basic Trigonometric Ratios (SOH CAH TOA):** Understanding sine, cosine, and tangent as ratios of sides in a right-angled triangle.
*   **Unit Circle:** Knowledge of the unit circle, how angles are measured, and the signs of sine, cosine, and tangent in each of the four quadrants.
*   **Pythagorean Identity:** The fundamental identity $\sin^2\theta + \cos^2\theta = 1$, and its variations ($1+\tan^2\theta=\sec^2\theta$, $1+\cot^2\theta=\csc^2\theta$).
*   **Reciprocal and Quotient Identities:** For example, $\sec\theta = 1/\cos\theta$, $\tan\theta = \sin\theta/\cos\theta$.
*   **Double Angle Formulas:** Specifically, the formulas for $\cos(2\theta)$, $\sin(2\theta)$, and $\tan(2\theta)$. These are the direct starting point for deriving half-angle formulas.
*   **Algebraic Manipulation:** Proficiency in rearranging equations, solving for variables, working with square roots, and rationalizing denominators.
*   **Understanding of $\pm$ sign:** Knowing that when you take a square root, there are two possible solutions (positive and negative), and how to choose the correct sign based on the quadrant of the angle.

If any of these feel unfamiliar, pause here and review them. Building on shaky foundations will lead to frustration.

## 4. The core idea — step by step

The core idea behind half-angle formulas is to reverse-engineer the double-angle formulas. We start with knowing how to find $\cos(2\theta)$ if we know $\sin(\theta)$ or $\cos(\theta)$, and then we manipulate those equations to find $\sin(\theta)$ or $\cos(\theta)$ if we know $\cos(2\theta)$. Finally, a simple substitution makes it explicit that we're talking about half-angles.

### Step 1: Recall Double Angle Cosine Formulas

**Plain-English Statement:** The double angle formulas for cosine are our starting point because they relate the cosine of an angle ($2\theta$) directly to the sine or cosine of half that angle ($\theta$). There are three main forms, but we'll focus on the two that involve only sine or only cosine.

**Small Concrete Example:** If you know $\cos(30^\circ)$, the double angle formula lets you find $\cos(2 \times 30^\circ) = \cos(60^\circ)$. We want to go the other way: if we know $\cos(60^\circ)$, how do we find $\cos(30^\circ)$?

**Formal/Mathematical Version:**
The two crucial double angle formulas for cosine are:
$$ \cos(2\theta) = 2\cos^2(\theta) - 1 $$
$$ \cos(2\theta) = 1 - 2\sin^2(\theta) $$

**What Could Go Wrong:** Forgetting these specific forms or confusing them with the $\sin(2\theta)$ or $\tan(2\theta)$ formulas. Make sure you remember these exactly.

### Step 2: Isolate $\cos^2(\theta)$ from the first formula

**Plain-English Statement:** Our goal is to find an expression for $\cos(\theta)$ in terms of $\cos(2\theta)$. To do this, we first need to isolate the $\cos^2(\theta)$ term from the double angle formula that contains it. Think of it like solving a simple algebraic equation for $x^2$.

**Small Concrete Example:** If you have the equation $y = 2x^2 - 1$, and you want to solve for $x^2$, you'd first add 1 to both sides ($y+1 = 2x^2$), then divide by 2 ($x^2 = (y+1)/2$). We're doing the same, but with trigonometric terms.

**Formal/Mathematical Version:**
Starting with:
$$ \cos(2\theta) = 2\cos^2(\theta) - 1 $$
Add 1 to both sides:
$$ \cos(2\theta) + 1 = 2\cos^2(\theta) $$
Divide by 2:
$$ \cos^2(\theta) = \frac{1 + \cos(2\theta)}{2} $$

**What Could Go Wrong:** Common algebraic mistakes include incorrect signs (e.g., subtracting 1 instead of adding) or multiplying by 2 instead of dividing. Be careful with these basic steps.

### Step 3: Isolate $\sin^2(\theta)$ from the second formula

**Plain-English Statement:** Similarly, we need an expression for $\sin(\theta)$ in terms of $\cos(2\theta)$. We'll use the other double angle cosine formula and isolate the $\sin^2(\theta)$ term.

**Small Concrete Example:** If you have $y = 1 - 2x^2$, and you want to solve for $x^2$, you'd first subtract 1 from both sides ($y-1 = -2x^2$), then divide by -2 ($x^2 = (y-1)/(-2) = (1-y)/2$).

**Formal/Mathematical Version:**
Starting with:
$$ \cos(2\theta) = 1 - 2\sin^2(\theta) $$
Subtract 1 from both sides:
$$ \cos(2\theta) - 1 = -2\sin^2(\theta) $$
Divide by -2 (or multiply by -1/2):
$$ \frac{\cos(2\theta) - 1}{-2} = \sin^2(\theta) $$
$$ \sin^2(\theta) = \frac{1 - \cos(2\theta)}{2} $$

**What Could Go Wrong:** The most common error here is a sign mistake when dividing by $-2$. Remember that $\frac{A-B}{-C} = \frac{B-A}{C}$.

### Step 4: Introduce the "Half Angle" substitution

**Plain-English Statement:** Now we have formulas for $\sin^2(\theta)$ and $\cos^2(\theta)$ in terms of $\cos(2\theta)$. To make these "half-angle" formulas explicit, we simply relabel our angles. Let's say we're interested in an angle $\alpha$. Then $2\theta$ can be replaced with $\alpha$, which means $\theta$ must be $\alpha/2$. This substitution makes the "half-angle" relationship clear.

**Small Concrete Example:** If you have a recipe for a "double batch" cake and you want to know how much flour to use for a "single batch," you'd just divide the "double batch" amount by two. Here, $\alpha$ is our "double batch" angle, and $\alpha/2$ is our "single batch" angle.

**Formal/Mathematical Version:**
Let $\alpha = 2\theta$.
This implies that $\theta = \frac{\alpha}{2}$.
Now, substitute $\theta = \frac{\alpha}{2}$ into the equations from Step 2 and Step 3:

From Step 2:
$$ \cos^2\left(\frac{\alpha}{2}\right) = \frac{1 + \cos(\alpha)}{2} $$

From Step 3:
$$ \sin^2\left(\frac{\alpha}{2}\right) = \frac{1 - \cos(\alpha)}{2} $$

**What Could Go Wrong:** Confusing which angle is the "half" and which is the "whole." Always remember that the angle on the left side of the equation (e.g., $\alpha/2$) is half of the angle on the right side (e.g., $\alpha$).

### Step 5: Derive Half Angle Formulas for Sine and Cosine (with the crucial $\pm$ sign)

**Plain-English Statement:** We now have expressions for $\sin^2(\alpha/2)$ and $\cos^2(\alpha/2)$. To get the actual $\sin(\alpha/2)$ and $\cos(\alpha/2)$, we need to take the square root of both sides. This is where the crucial $\pm$ sign comes in. The choice of positive or negative depends entirely on which quadrant the angle $\alpha/2$ lies in.

**Small Concrete Example:** If you know $x^2 = 4$, then $x$ could be $2$ or $-2$. You need more information (like "$x$ is positive") to pick the correct sign. Similarly, for $\sin(\alpha/2)$, if $\alpha/2$ is in the first or second quadrant, $\sin(\alpha/2)$ will be positive. If $\alpha/2$ is in the third or fourth quadrant, $\sin(\alpha/2)$ will be negative.

**Formal/Mathematical Version:**
Taking the square root of the equations from Step 4:
$$ \cos\left(\frac{\alpha}{2}\right) = \pm\sqrt{\frac{1 + \cos(\alpha)}{2}} $$
$$ \sin\left(\frac{\alpha}{2}\right) = \pm\sqrt{\frac{1 - \cos(\alpha)}{2}} $$
The choice of the $\pm$ sign depends on the quadrant in which $\frac{\alpha}{2}$ lies.

**What Could Go Wrong:** Forgetting the $\pm$ sign is the most common and significant error. Always remember to consider both possibilities initially and then use the quadrant information to select the correct sign. Not correctly identifying the quadrant of $\alpha/2$ is another major trap.

### Step 6: Derive Half Angle Formula for Tangent

**Plain-English Statement:** Once we have formulas for $\sin(\alpha/2)$ and $\cos(\alpha/2)$, finding $\tan(\alpha/2)$ is straightforward because tangent is simply sine divided by cosine.

**Small Concrete Example:** If you know $\sin(30^\circ) = 1/2$ and $\cos(30^\circ) = \sqrt{3}/2$, then $\tan(30^\circ) = (1/2) / (\sqrt{3}/2) = 1/\sqrt{3}$. We'll do the same with our derived formulas.

**Formal/Mathematical Version:**
$$ \tan\left(\frac{\alpha}{2}\right) = \frac{\sin\left(\frac{\alpha}{2}\right)}{\cos\left(\frac{\alpha}{2}\right)} $$
Substitute the derived formulas:
$$ \tan\left(\frac{\alpha}{2}\right) = \frac{\pm\sqrt{\frac{1 - \cos(\alpha)}{2}}}{\pm\sqrt{\frac{1 + \cos(\alpha)}{2}}} $$
$$ \tan\left(\frac{\alpha}{2}\right) = \pm\sqrt{\frac{1 - \cos(\alpha)}{1 + \cos(\alpha)}} $$
Again, the sign depends on the quadrant of $\alpha/2$. However, there are more convenient forms for $\tan(\alpha/2)$ that avoid the square root and the $\pm$ ambiguity, which we'll explore next.

**What Could Go Wrong:** Algebraic errors in simplifying the complex fraction under the square root. Also, still needing to determine the sign based on the quadrant.

### Step 7: Alternative and More Convenient Half Angle Formulas for Tangent

**Plain-English Statement:** The tangent formula with the square root and $\pm$ sign can be cumbersome. Thankfully, there are two alternative forms that are often much easier to use because they don't involve square roots and their signs are automatically correct. We derive these by cleverly multiplying the numerator and denominator by specific terms.

**Small Concrete Example:** Imagine you have a fraction $\frac{\sqrt{A}}{\sqrt{B}}$. You could rationalize it by multiplying by $\frac{\sqrt{B}}{\sqrt{B}}$. We're doing something similar, but designed to eliminate the square root from the expression for $\tan(\alpha/2)$.

**Formal/Mathematical Version:**
Let's start with $\tan\left(\frac{\alpha}{2}\right) = \frac{\sin\left(\frac{\alpha}{2}\right)}{\cos\left(\frac{\alpha}{2}\right)}$.
**Derivation 1 (multiplying by $2\cos(\alpha/2)$):**
$$ \tan\left(\frac{\alpha}{2}\right) = \frac{\sin\left(\frac{\alpha}{2}\right)}{\cos\left(\frac{\alpha}{2}\right)} $$
Multiply numerator and denominator by $2\cos(\alpha/2)$:
$$ \tan\left(\frac{\alpha}{2}\right) = \frac{2\sin\left(\frac{\alpha}{2}\right)\cos\left(\frac{\alpha}{2}\right)}{2\cos^2\left(\frac{\alpha}{2}\right)} $$
Recognize the numerator as $\sin(2 \times \alpha/2) = \sin(\alpha)$ and the denominator as $2\cos^2(\alpha/2) = 1 + \cos(\alpha)$ (from Step 4, rearranged):
$$ \tan\left(\frac{\alpha}{2}\right) = \frac{\sin(\alpha)}{1 + \cos(\alpha)} $$

**Derivation 2 (multiplying by $2\sin(\alpha/2)$):**
$$ \tan\left(\frac{\alpha}{2}\right) = \frac{\sin\left(\frac{\alpha}{2}\right)}{\cos\left(\frac{\alpha}{2}\right)} $$
Multiply numerator and denominator by $2\sin(\alpha/2)$:
$$ \tan\left(\frac{\alpha}{2}\right) = \frac{2\sin^2\left(\frac{\alpha}{2}\right)}{2\sin\left(\frac{\alpha}{2}\right)\cos\left(\frac{\alpha}{2}\right)} $$
Recognize the numerator as $2\sin^2(\alpha/2) = 1 - \cos(\alpha)$ (from Step 4, rearranged) and the denominator as $\sin(\alpha)$:
$$ \tan\left(\frac{\alpha}{2}\right) = \frac{1 - \cos(\alpha)}{\sin(\alpha)} $$

These two formulas for $\tan(\alpha/2)$ are generally preferred because they do not involve square roots and automatically yield the correct sign.

**What Could Go Wrong:** Forgetting these alternative forms and always resorting to the square root version, which can lead to more complex calculations and potential sign errors. Also, algebraic errors during the multiplication and substitution steps.

## 5. Worked examples — multiple, with every step shown

Here are several worked examples demonstrating the application of half-angle formulas.

### Example 1: Find the exact value of $\sin(15^\circ)$

**Problem:** Find the exact value of $\sin(15^\circ)$ using a half-angle formula.

**Given:** We need to find $\sin(15^\circ)$.
**Wanted:** The exact numerical value of $\sin(15^\circ)$.

**Solution:**
1.  **Identify the angle relationship:** We recognize that $15^\circ$ is half of $30^\circ$. So, we can set $\alpha/2 = 15^\circ$, which means $\alpha = 30^\circ$.
    *   *Explanation:* The half-angle formulas relate $\alpha/2$ to $\alpha$. We choose an $\alpha$ for which we know the trigonometric values.
2.  **Choose the appropriate formula:** We need to find $\sin(15^\circ)$, so we'll use the half-angle formula for sine:
    $$ \sin\left(\frac{\alpha}{2}\right) = \pm\sqrt{\frac{1 - \cos(\alpha)}{2}} $$
    *   *Explanation:* This is the formula that connects the sine of the half-angle to the cosine of the full angle.
3.  **Determine the sign:** The angle $15^\circ$ is in the first quadrant ($0^\circ < 15^\circ < 90^\circ$). In the first quadrant, the sine function is positive.
    *   *Explanation:* This step is crucial for choosing between the $\pm$ signs. For $15^\circ$, sine is positive.
4.  **Substitute the value of $\alpha$:** Substitute $\alpha = 30^\circ$ into the formula:
    $$ \sin(15^\circ) = +\sqrt{\frac{1 - \cos(30^\circ)}{2}} $$
    *   *Explanation:* We replace $\alpha$ with $30^\circ$ and use the positive sign as determined in the previous step.
5.  **Recall the known value of $\cos(30^\circ)$:** We know that $\cos(30^\circ) = \frac{\sqrt{3}}{2}$.
    *   *Explanation:* This is a basic trigonometric value that should be memorized or derived from the unit circle.
6.  **Substitute and simplify:**
    $$ \sin(15^\circ) = \sqrt{\frac{1 - \frac{\sqrt{3}}{2}}{2}} $$
    *   *Explanation:* Substitute the value of $\cos(30^\circ)$ into the expression.
    $$ \sin(15^\circ) = \sqrt{\frac{\frac{2}{2} - \frac{\sqrt{3}}{2}}{2}} $$
    *   *Explanation:* Find a common denominator in the numerator.
    $$ \sin(15^\circ) = \sqrt{\frac{\frac{2 - \sqrt{3}}{2}}{2}} $$
    *   *Explanation:* Combine the terms in the numerator.
    $$ \sin(15^\circ) = \sqrt{\frac{2 - \sqrt{3}}{4}} $$
    *   *Explanation:* Divide the fraction in the numerator by 2 (which is the same as multiplying by $1/2$).
    $$ \sin(15^\circ) = \frac{\sqrt{2 - \sqrt{3}}}{\sqrt{4}} $$
    *   *Explanation:* Apply the square root to both the numerator and the denominator.
    $$ \sin(15^\circ) = \frac{\sqrt{2 - \sqrt{3}}}{2} $$
    *   *Explanation:* Simplify the denominator $\sqrt{4} = 2$.

**Final Answer:**
$$ \boxed{\sin(15^\circ) = \frac{\sqrt{2 - \sqrt{3}}}{2}} $$

**Reflection:** This example was relatively straightforward because $15^\circ$ is in the first quadrant, simplifying the sign choice. The main challenge was careful algebraic manipulation of the nested square root.

---

### Example 2: Find the exact value of $\cos(112.5^\circ)$

**Problem:** Find the exact value of $\cos(112.5^\circ)$ using a half-angle formula.

**Given:** We need to find $\cos(112.5^\circ)$.
**Wanted:** The exact numerical value of $\cos(112.5^\circ)$.

**Solution:**
1.  **Identify the angle relationship:** We recognize that $112.5^\circ$ is half of $225^\circ$. So, we set $\alpha/2 = 112.5^\circ$, which means $\alpha = 225^\circ$.
    *   *Explanation:* We choose an $\alpha$ for which we know the trigonometric values. $225^\circ$ is a standard angle on the unit circle.
2.  **Choose the appropriate formula:** We need to find $\cos(112.5^\circ)$, so we'll use the half-angle formula for cosine:
    $$ \cos\left(\frac{\alpha}{2}\right) = \pm\sqrt{\frac{1 + \cos(\alpha)}{2}} $$
    *   *Explanation:* This formula relates the cosine of the half-angle to the cosine of the full angle.
3.  **Determine the sign:** The angle $112.5^\circ$ is in the second quadrant ($90^\circ < 112.5^\circ < 180^\circ$). In the second quadrant, the cosine function is negative.
    *   *Explanation:* This step is crucial for choosing between the $\pm$ signs. For $112.5^\circ$, cosine is negative.
4.  **Substitute the value of $\alpha$:** Substitute $\alpha = 225^\circ$ into the formula:
    $$ \cos(112.5^\circ) = -\sqrt{\frac{1 + \cos(225^\circ)}{2}} $$
    *   *Explanation:* We replace $\alpha$ with $225^\circ$ and use the negative sign as determined in the previous step.
5.  **Recall the known value of $\cos(225^\circ)$:** The angle $225^\circ$ is in the third quadrant. Its reference angle is $225^\circ - 180^\circ = 45^\circ$. In the third quadrant, cosine is negative. So, $\cos(225^\circ) = -\cos(45^\circ) = -\frac{\sqrt{2}}{2}$.
    *   *Explanation:* This requires knowledge of unit circle values and quadrant signs.
6.  **Substitute and simplify:**
    $$ \cos(112.5^\circ) = -\sqrt{\frac{1 + \left(-\frac{\sqrt{2}}{2}\right)}{2}} $$
    *   *Explanation:* Substitute the value of $\cos(225^\circ)$ into the expression.
    $$ \cos(112.5^\circ) = -\sqrt{\frac{1 - \frac{\sqrt{2}}{2}}{2}} $$
    *   *Explanation:* Simplify the signs.
    $$ \cos(112.5^\circ) = -\sqrt{\frac{\frac{2}{2} - \frac{\sqrt{2}}{2}}{2}} $$
    *   *Explanation:* Find a common denominator in the numerator.
    $$ \cos(112.5^\circ) = -\sqrt{\frac{\frac{2 - \sqrt{2}}{2}}{2}} $$
    *   *Explanation:* Combine the terms in the numerator.
    $$ \cos(112.5^\circ) = -\sqrt{\frac{2 - \sqrt{2}}{4}} $$
    *   *Explanation:* Divide the fraction in the numerator by 2.
    $$ \cos(112.5^\circ) = -\frac{\sqrt{2 - \sqrt{2}}}{\sqrt{4}} $$
    *   *Explanation:* Apply the square root to both the numerator and the denominator.
    $$ \cos(112.5^\circ) = -\frac{\sqrt{2 - \sqrt{2}}}{2} $$
    *   *Explanation:* Simplify the denominator $\sqrt{4} = 2$.

**Final Answer:**
$$ \boxed{\cos(112.5^\circ) = -\frac{\sqrt{2 - \sqrt{2}}}{2}} $$

**Reflection:** This example introduced the necessity of correctly determining the sign of the half-angle based on its quadrant, which was negative in this case. It also reinforced the need for accurate recall of unit circle values for the full angle.

---

### Example 3: Given $\tan(\theta) = -3/4$ and $\theta$ is in Q2, find $\sin(\theta/2)$, $\cos(\theta/2)$, and $\tan(\theta/2)$.

**Problem:** Given $\tan(\theta) = -3/4$ and $\theta$ is in Quadrant II, find the exact values of $\sin(\theta/2)$, $\cos(\theta/2)$, and $\tan(\theta/2)$.

**Given:** $\tan(\theta) = -3/4$, $\theta \in (\pi/2, \pi)$ (Quadrant II).
**Wanted:** $\sin(\theta/2)$, $\cos(\theta/2)$, $\tan(\theta/2)$.

**Solution:**
1.  **Determine $\cos(\theta)$:** Since $\theta$ is in Quadrant II, $\sin(\theta)$ is positive and $\cos(\theta)$ is negative. We can construct a right triangle for a reference angle where $\tan(\text{ref}) = 3/4$. The opposite side is 3, the adjacent side is 4, and the hypotenuse is $\sqrt{3^2+4^2} = \sqrt{9+16} = \sqrt{25} = 5$.
    *   *Explanation:* We need $\cos(\theta)$ to use the half-angle formulas. We use the given $\tan(\theta)$ and quadrant information to find it.
    Since $\theta$ is in Q2, $\cos(\theta)$ is negative.
    $$ \cos(\theta) = -\frac{\text{adjacent}}{\text{hypotenuse}} = -\frac{4}{5} $$
    *   *Explanation:* From the reference triangle and the quadrant, we get the value of $\cos(\theta)$.

2.  **Determine the quadrant of $\theta/2$:**
    Given $\theta \in (\pi/2, \pi)$.
    Divide the inequality by 2:
    $$ \frac{\pi/2}{2} < \frac{\theta}{2} < \frac{\pi}{2} $$
    $$ \frac{\pi}{4} < \frac{\theta}{2} < \frac{\pi}{2} $$
    This means $\theta/2$ is in Quadrant I.
    *   *Explanation:* This step is critical for determining the signs of $\sin(\theta/2)$, $\cos(\theta/2)$, and $\tan(\theta/2)$. In Q1, all three are positive.

3.  **Calculate $\sin(\theta/2)$:**
    Use the half-angle formula for sine, choosing the positive sign since $\theta/2$ is in Q1:
    $$ \sin\left(\frac{\theta}{2}\right) = +\sqrt{\frac{1 - \cos(\theta)}{2}} $$
    Substitute $\cos(\theta) = -4/5$:
    $$ \sin\left(\frac{\theta}{2}\right) = \sqrt{\frac{1 - \left(-\frac{4}{5}\right)}{2}} $$
    *   *Explanation:* Substitute the value of $\cos(\theta)$ and simplify the double negative.
    $$ \sin\left(\frac{\theta}{2}\right) = \sqrt{\frac{1 + \frac{4}{5}}{2}} $$
    $$ \sin\left(\frac{\theta}{2}\right) = \sqrt{\frac{\frac{5}{5} + \frac{4}{5}}{2}} $$
    *   *Explanation:* Find a common denominator in the numerator.
    $$ \sin\left(\frac{\theta}{2}\right) = \sqrt{\frac{\frac{9}{5}}{2}} $$
    *   *Explanation:* Combine terms in the numerator.
    $$ \sin\left(\frac{\theta}{2}\right) = \sqrt{\frac{9}{10}} $$
    *   *Explanation:* Divide the fraction by 2.
    $$ \sin\left(\frac{\theta}{2}\right) = \frac{\sqrt{9}}{\sqrt{10}} = \frac{3}{\sqrt{10}} $$
    *   *Explanation:* Apply the square root to numerator and denominator. Simplify $\sqrt{9}=3$.
    Rationalize the denominator:
    $$ \sin\left(\frac{\theta}{2}\right) = \frac{3}{\sqrt{10}} \times \frac{\sqrt{10}}{\sqrt{10}} = \frac{3\sqrt{10}}{10} $$

    **Final Answer for $\sin(\theta/2)$:**
    $$ \boxed{\sin\left(\frac{\theta}{2}\right) = \frac{3\sqrt{10}}{10}} $$

4.  **Calculate $\cos(\theta/2)$:**
    Use the half-angle formula for cosine, choosing the positive sign since $\theta/2$ is in Q1:
    $$ \cos\left(\frac{\theta}{2}\right) = +\sqrt{\frac{1 + \cos(\theta)}{2}} $$
    Substitute $\cos(\theta) = -4/5$:
    $$ \cos\left(\frac{\theta}{2}\right) = \sqrt{\frac{1 + \left(-\frac{4}{5}\right)}{2}} $$
    *   *Explanation:* Substitute the value of $\cos(\theta)$.
    $$ \cos\left(\frac{\theta}{2}\right) = \sqrt{\frac{1 - \frac{4}{5}}{2}} $$
    $$ \cos\left(\frac{\theta}{2}\right) = \sqrt{\frac{\frac{5}{5} - \frac{4}{5}}{2}} $$
    *   *Explanation:* Find a common denominator in the numerator.
    $$ \cos\left(\frac{\theta}{2}\right) = \sqrt{\frac{\frac{1}{5}}{2}} $$
    *   *Explanation:* Combine terms in the numerator.
    $$ \cos\left(\frac{\theta}{2}\right) = \sqrt{\frac{1}{10}} $$
    *   *Explanation:* Divide the fraction by 2.
    $$ \cos\left(\frac{\theta}{2}\right) = \frac{\sqrt{1}}{\sqrt{10}} = \frac{1}{\sqrt{10}} $$
    *   *Explanation:* Apply the square root to numerator and denominator.
    Rationalize the denominator:
    $$ \cos\left(\frac{\theta}{2}\right) = \frac{1}{\sqrt{10}} \times \frac{\sqrt{10}}{\sqrt{10}} = \frac{\sqrt{10}}{10} $$

    **Final Answer for $\cos(\theta/2)$:**
    $$ \boxed{\cos\left(\frac{\theta}{2}\right) = \frac{\sqrt{10}}{10}} $$

5.  **Calculate $\tan(\theta/2)$:**
    We can use the ratio $\sin(\theta/2) / \cos(\theta/2)$ or one of the convenient tangent half-angle formulas. Let's use $\frac{1-\cos(\theta)}{\sin(\theta)}$. First, we need $\sin(\theta)$.
    Since $\theta$ is in Q2 and $\tan(\theta) = -3/4$, we know $\sin(\theta)$ is positive.
    From our reference triangle, $\sin(\theta) = \frac{\text{opposite}}{\text{hypotenuse}} = \frac{3}{5}$.
    *   *Explanation:* We need $\sin(\theta)$ for the tangent formula.

    Using $\tan\left(\frac{\theta}{2}\right) = \frac{1 - \cos(\theta)}{\sin(\theta)}$:
    $$ \tan\left(\frac{\theta}{2}\right) = \frac{1 - \left(-\frac{4}{5}\right)}{\frac{3}{5}} $$
    *   *Explanation:* Substitute the values of $\cos(\theta)$ and $\sin(\theta)$.
    $$ \tan\left(\frac{\theta}{2}\right) = \frac{1 + \frac{4}{5}}{\frac{3}{5}} $$
    $$ \tan\left(\frac{\theta}{2}\right) = \frac{\frac{5}{5} + \frac{4}{5}}{\frac{3}{5}} $$
    *   *Explanation:* Find a common denominator in the numerator.
    $$ \tan\left(\frac{\theta}{2}\right) = \frac{\frac{9}{5}}{\frac{3}{5}} $$
    *   *Explanation:* Combine terms in the numerator.
    $$ \tan\left(\frac{\theta}{2}\right) = \frac{9}{5} \times \frac{5}{3} $$
    *   *Explanation:* Multiply by the reciprocal of the denominator.
    $$ \tan\left(\frac{\theta}{2}\right) = \frac{9}{3} = 3 $$

    Alternatively, using $\tan\left(\frac{\theta}{2}\right) = \frac{\sin(\theta/2)}{\cos(\theta/2)}$:
    $$ \tan\left(\frac{\theta}{2}\right) = \frac{\frac{3\sqrt{10}}{10}}{\frac{\sqrt{10}}{10}} $$
    $$ \tan\left(\frac{\theta}{2}\right) = \frac{3\sqrt{10}}{10} \times \frac{10}{\sqrt{10}} = 3 $$

    **Final Answer for $\tan(\theta/2)$:**
    $$ \boxed{\tan\left(\frac{\theta}{2}\right) = 3} $$

**Reflection:** This example was harder because it required an initial step to find $\cos(\theta)$ from $\tan(\theta)$ and the quadrant information. Crucially, determining the quadrant of $\theta/2$ was essential for selecting the correct signs for sine and cosine. Using the alternative tangent formulas avoided the square root and simplified the calculation considerably.

---

### Example 4: Prove the identity $\frac{1 - \tan^2(x/2)}{1 + \tan^2(x/2)} = \cos(x)$

**Problem:** Prove the identity $\frac{1 - \tan^2(x/2)}{1 + \tan^2(x/2)} = \cos(x)$.

**Given:** The identity $\frac{1 - \tan^2(x/2)}{1 + \tan^2(x/2)} = \cos(x)$.
**Wanted:** A step-by-step proof.

**Solution:**
We will start from the Left-Hand Side (LHS) and transform it into the Right-Hand Side (RHS).

1.  **Start with the LHS:**
    $$ \text{LHS} = \frac{1 - \tan^2(x/2)}{1 + \tan^2(x/2)} $$
    *   *Explanation:* This is the expression we need to manipulate.
2.  **Recall the Pythagorean identity involving tangent:** We know that $1 + \tan^2(\theta) = \sec^2(\theta)$. Apply this to the denominator.
    *   *Explanation:* This identity simplifies the denominator significantly.
    $$ \text{LHS} = \frac{1 - \tan^2(x/2)}{\sec^2(x/2)} $$
3.  **Express $\tan(x/2)$ and $\sec(x/2)$ in terms of $\sin(x/2)$ and $\cos(x/2)$:**
    Recall $\tan(\theta) = \frac{\sin(\theta)}{\cos(\theta)}$ and $\sec(\theta) = \frac{1}{\cos(\theta)}$.
    $$ \text{LHS} = \frac{1 - \frac{\sin^2(x/2)}{\cos^2(x/2)}}{\frac{1}{\cos^2(x/2)}} $$
    *   *Explanation:* This allows us to work with sine and cosine, which are more fundamental.
4.  **Simplify the numerator by finding a common denominator:**
    $$ \text{LHS} = \frac{\frac{\cos^2(x/2)}{\cos^2(x/2)} - \frac{\sin^2(x/2)}{\cos^2(x/2)}}{\frac{1}{\cos^2(x/2)}} $$
    *   *Explanation:* Prepare to combine the terms in the numerator.
    $$ \text{LHS} = \frac{\frac{\cos^2(x/2) - \sin^2(x/2)}{\cos^2(x/2)}}{\frac{1}{\cos^2(x/2)}} $$
    *   *Explanation:* Combine the terms in the numerator into a single fraction.
5.  **Simplify the complex fraction:** Multiply the numerator by the reciprocal of the denominator.
    $$ \text{LHS} = \frac{\cos^2(x/2) - \sin^2(x/2)}{\cos^2(x/2)} \times \frac{\cos^2(x/2)}{1} $$
    *   *Explanation:* This is a standard algebraic step for simplifying fractions within fractions.
    $$ \text{LHS} = \cos^2(x/2) - \sin^2(x/2) $$
    *   *Explanation:* The $\cos^2(x/2)$ terms cancel out.
6.  **Recall the double angle formula for cosine:** We know that $\cos(2\theta) = \cos^2(\theta) - \sin^2(\theta)$.
    Let $\theta = x/2$. Then $2\theta = 2(x/2) = x$.
    $$ \text{LHS} = \cos(2 \times x/2) $$
    *   *Explanation:* We recognize the form of the expression matches the double angle formula for cosine.
    $$ \text{LHS} = \cos(x) $$
    *   *Explanation:* Simplify the angle.

7.  **Conclusion:**
    $$ \text{LHS} = \cos(x) = \text{RHS} $$
    The identity is proven.

**Reflection:** This example shows how half-angle formulas (or rather, their squared forms, which are directly related to double angle formulas) are implicitly used in other identities. The key was recognizing the double angle cosine formula in the simplified expression. This identity is also known as the "tangent half-angle substitution" or "Weierstrass substitution" when used in calculus.

## 6. Common mistakes and traps

Students often stumble on these points when working with half-angle formulas:

1.  **Forgetting the $\pm$ Sign:** This is the most frequent error. When taking the square root, both positive and negative solutions exist. Students often forget to include $\pm$ or choose the wrong sign.
2.  **Incorrectly Determining the Quadrant of $\alpha/2$:** The choice of the $\pm$ sign depends entirely on the quadrant of the *half-angle* ($\alpha/2$), not the original angle ($\alpha$). Forgetting this, or making an error in determining the half-angle's quadrant, leads to incorrect signs.
3.  **Algebraic Errors:** Manipulating complex fractions, especially those with nested square roots, can be tricky. Errors in finding common denominators, distributing signs, or simplifying fractions are common.
4.  **Confusing Double Angle and Half Angle Formulas:** While they are related, swapping parts of the formulas (e.g., using $1+\cos\alpha$ for sine instead of cosine) will lead to incorrect results.
5.  **Not Rationalizing Denominators (where expected):** While not strictly wrong, many instructors and textbooks expect answers to be rationalized, meaning no square roots in the denominator.
6.  **Ignoring the Alternative Tangent Formulas:** Always using $\pm\sqrt{\frac{1-\cos\alpha}{1+\cos\alpha}}$ for tangent can be more cumbersome and error-prone than using $\frac{1-\cos\alpha}{\sin\alpha}$ or $\frac{\sin\alpha}{1+\cos\alpha}$, which avoid the square root and the sign ambiguity.

## 7. Textbook-precise explanation

The half-angle identities are derived directly from the double-angle identities for cosine. Specifically, from the identities:
$$ \cos(2\theta) = 1 - 2\sin^2(\theta) $$
$$ \cos(2\theta) = 2\cos^2(\theta) - 1 $$

By solving the first identity for $\sin^2(\theta)$, we get:
$$ 2\sin^2(\theta) = 1 - \cos(2\theta) $$
$$ \sin^2(\theta) = \frac{1 - \cos(2\theta)}{2} $$

By solving the second identity for $\cos^2(\theta)$, we get:
$$ 2\cos^2(\theta) = 1 + \cos(2\theta) $$
$$ \cos^2(\theta) = \frac{1 + \cos(2\theta)}{2} $$

To transform these into half-angle identities, we let $A = 2\theta$, which implies $\theta = A/2$. Substituting these into the squared formulas yields:
$$ \sin^2\left(\frac{A}{2}\right) = \frac{1 - \cos(A)}{2} $$
$$ \cos^2\left(\frac{A}{2}\right) = \frac{1 + \cos(A)}{2} $$

Taking the square root of both sides, we introduce the $\pm$ sign, which must be chosen based on the quadrant of the angle $A/2$:
$$ \sin\left(\frac{A}{2}\right) = \pm\sqrt{\frac{1 - \cos(A)}{2}} $$
$$ \cos\left(\frac{A}{2}\right) = \pm\sqrt{\frac{1 + \cos(A)}{2}} $$

For the tangent half-angle identity, we use the quotient identity $\tan(A/2) = \frac{\sin(A/2)}{\cos(A/2)}$:
$$ \tan\left(\frac{A}{2}\right) = \frac{\pm\sqrt{\frac{1 - \cos(A)}{2}}}{\pm\sqrt{\frac{1 + \cos(A)}{2}}} = \pm\sqrt{\frac{1 - \cos(A)}{1 + \cos(A)}} $$

More convenient forms for $\tan(A/2)$ that avoid the square root and the sign ambiguity are derived as follows:
$$ \tan\left(\frac{A}{2}\right) = \frac{2\sin^2(A/2)}{2\sin(A/2)\cos(A/2)} = \frac{1 - \cos(A)}{\sin(A)} $$
(by substituting $2\sin^2(A/2) = 1-\cos(A)$ and $2\sin(A/2)\cos(A/2) = \sin(A)$)

And similarly:
$$ \tan\left(\frac{A}{2}\right) = \frac{2\sin(A/2)\cos(A/2)}{2\cos^2(A/2)} = \frac{\sin(A)}{1 + \cos(A)} $$
(by substituting $2\sin(A/2)\cos(A/2) = \sin(A)$ and $2\cos^2(A/2) = 1+\cos(A)$)

These identities are fundamental in advanced trigonometry and are frequently encountered in calculus for integration techniques (e.g., the Weierstrass substitution for rationalizing trigonometric integrals).

*Reference: Stewart, J. (2021). *Calculus: Early Transcendentals* (9th ed.). Cengage Learning. (Chapter 1, Section 1.5 - Trigonometric Functions, Identities)*
*Reference: Blitzer, R. (2018). *Precalculus* (7th ed.). Pearson. (Chapter 5, Section 5.4 - Double-Angle, Half-Angle, and Product-to-Sum Formulas)*

## 8. ASCII diagrams

```text
               Y-axis
                ^
                |
                |     Quadrant II (-,+)
                |        sin > 0
                |        cos < 0
                |        tan < 0
                |
                |          . P(cos(α/2), sin(α/2))  <-- If α/2 is in Q1
                |         /|
                |        / |
                |       /  | sin(α/2)
                |      /   |
                |     /    |
                |α/2 /     |
                |   /______|
----------------|-----------X-axis
                |  cos(α/2)
                |
Quadrant III (-,-)      Quadrant IV (+,-)
   sin < 0                 sin < 0
   cos < 0                 cos > 0
   tan > 0                 tan < 0
                |
                |
                |
                |
                |
                v
```

**Description of the Figure:**
This ASCII diagram represents the unit circle, divided into its four quadrants. The X-axis represents the cosine value and the Y-axis represents the sine value. Each quadrant is labeled with its number (I, II, III, IV) and the signs of sine, cosine, and tangent within that quadrant.

The point $P(\cos(\alpha/2), \sin(\alpha/2))$ is shown in Quadrant I, illustrating an example where $\alpha/2$ is an acute angle. The segment from the origin to P forms the angle $\alpha/2$ with the positive X-axis. The horizontal projection of P onto the X-axis represents $\cos(\alpha/2)$, and the vertical projection represents $\sin(\alpha/2)$.

This diagram is crucial for understanding how to choose the correct $\pm$ sign in the half-angle formulas. If the angle $\alpha/2$ falls into a different quadrant, the signs of its sine, cosine, and tangent values will change according to the quadrant rules shown in the diagram. For instance, if $\alpha/2$ were in Quadrant II, $\sin(\alpha/2)$ would be positive, but $\cos(\alpha/2)$ would be negative.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic / Visual Hook:**
    Think of the "Double-Angle Cosine Sandwich."
    *   **"Cosine is the King, he likes to be in the middle!"** The half-angle formulas for sine and cosine *both* depend on $\cos(\alpha)$.
    *   **"Sine gets the MINUS, Cosine gets the PLUS!"**
        *   $\sin^2(\alpha/2)$ has $1 - \cos(\alpha)$ in the numerator (think "sine is sensitive, it subtracts").
        *   $\cos^2(\alpha/2)$ has $1 + \cos(\alpha)$ in the numerator (think "cosine is positive, it adds").
    *   **"All over TWO, like a divided sandwich!"** Both formulas have a denominator of 2.
    *   **"Don't forget the Root, and the Choice of Quadrant Fruit!"** Always remember $\pm\sqrt{\dots}$ and that you pick the sign based on the quadrant of the *half-angle*.

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    *   $\sin^2\left(\frac{A}{2}\right) = \frac{1 - \cos(A)}{2}$ (and its square root form with $\pm$)
    *   $\cos^2\left(\frac{A}{2}\right) = \frac{1 + \cos(A)}{2}$ (and its square root form with $\pm$)
    *   $\tan\left(\frac{A}{2}\right) = \frac{1 - \cos(A)}{\sin(A)}$ (This form is usually the most practical and avoids the $\pm$ ambiguity and square roots)

3.  **Spaced-Repetition Schedule:**
    To truly embed these formulas and their derivations into your long-term memory:
    *   **Review 1:** After 1 day. Attempt to re-derive all formulas from the double-angle identities.
    *   **Review 2:** After 3 days. Work through 2-3 new examples.
    *   **Review 3:** After 7 days. Focus on the tricky parts: sign choice, algebraic simplification, and the alternative tangent forms.
    *   **Review 4:** After 16 days. Mix in these problems with other trigonometry topics to ensure recall in a broader context.
    *   **Review 5:** After 35 days. Attempt to teach the concept to an imaginary student or explain it thoroughly without notes.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget a half-angle formula, you can always rebuild it from its origin.
    1.  **Recall the Double Angle Cosine Formulas:**
        *   $\cos(2\theta) = 1 - 2\sin^2(\theta)$
        *   $\cos(2\theta) = 2\cos^2(\theta) - 1$
    2.  **Isolate the squared terms:**
        *   From the first: $2\sin^2(\theta) = 1 - \cos(2\theta) \Rightarrow \sin^2(\theta) = \frac{1 - \cos(2\theta)}{2}$
        *   From the second: $2\cos^2(\theta) = 1 + \cos(2\theta) \Rightarrow \cos^2(\theta) = \frac{1 + \cos(2\theta)}{2}$
    3.  **Perform the Half-Angle Substitution:** Let $\alpha = 2\theta$, so $\theta = \alpha/2$. Substitute this into the isolated squared terms.
        *   $\sin^2(\alpha/2) = \frac{1 - \cos(\alpha)}{2}$
        *   $\cos^2(\alpha/2) = \frac{1 + \cos(\alpha)}{2}$
    4.  **Take the Square Root:** Remember the $\pm$ sign.
        *   $\sin(\alpha/2) = \pm\sqrt{\frac{1 - \cos(\alpha)}{2}}$
        *   $\cos(\alpha/2) = \pm\sqrt{\frac{1 + \cos(\alpha)}{2}}$
    5.  **Derive Tangent (if needed):** Use $\tan(\alpha/2) = \frac{\sin(\alpha/2)}{\cos(\alpha/2)}$ or the more convenient forms by multiplying numerator and denominator by $2\sin(\alpha/2)$ or $2\cos(\alpha/2)$ respectively.

This pathway ensures that even if you draw a blank on the specific formula, you can reconstruct it logically.

## 10. Connections — what this leads to

Mastering half-angle formulas is not just about memorizing identities; it's about building a deeper understanding of trigonometric relationships that unlocks several advanced topics:

1.  **Calculus — Integration of Trigonometric Functions:** Half-angle formulas are indispensable for integrating even powers of sine and cosine. For example, to integrate $\int \sin^2(x) dx$ or $\int \cos^2(x) dx$, you *must* use the identities $\sin^2(x) = \frac{1-\cos(2x)}{2}$ and $\cos^2(x) = \frac{1+\cos(2x)}{2}$, which are precisely the half-angle formulas (just with $x$ instead of $x/2$ on the LHS). Without these, these common integrals are much harder, if not impossible, to solve directly. They are also key components of the **Weierstrass substitution** (or tangent half-angle substitution), a powerful technique for rationalizing trigonometric integrals by converting them into rational functions of a new variable $t = \tan(x/2)$.

2.  **Further Trigonometric Identities:** Half-angle formulas are part of a larger family of identities (sum-to-product, product-to-sum, power-reducing) that are all interconnected. Understanding the derivation of half-angle formulas strengthens your ability to derive and manipulate other complex identities.

3.  **Solving Complex Trigonometric Equations:** Some trigonometric equations might involve angles that are multiples or fractions of each other. Half-angle formulas allow you to express all terms in a common angle, simplifying the equation to a solvable form.

4.  **Fourier Series and Signal Processing:** In advanced mathematics and engineering, particularly in the study of periodic phenomena, functions are often decomposed into sums of sines and cosines (Fourier series). Manipulating these series, especially when dealing with different frequencies or phases, often involves trigonometric identities, including half-angle formulas, to simplify or transform expressions.

5.  **Complex Numbers and De Moivre's Theorem:** While not directly used in the formulas themselves, the general manipulation of angles and their relationships, which half-angle formulas exemplify, is foundational for understanding how trigonometric functions relate to complex numbers through Euler's formula and De Moivre's Theorem. These tools allow for powerful geometric interpretations of complex number operations, often involving angle bisection or doubling.

6.  **Parametric Equations and Curve Tracing:** When describing curves using parametric equations where coordinates are functions of an angle (e.g., $x = f(\theta)$, $y = g(\theta)$), these identities can simplify the expressions or help in converting between different forms of parametrization.

## 11. Self-check questions

1.  Find the exact value of $\cos(22.5^\circ)$ using a half-angle formula.
2.  Given that $\sin(A) = 5/13$ and $A$ is in Quadrant II, find the exact value of $\tan(A/2)$.
3.  Prove the identity $\tan\left(\frac{x}{2}\right) = \csc(x) - \cot(x)$.
4.  If $\cos(\theta) = -7/25$ and $\theta \in (\pi, 3\pi/2)$, find the exact values of $\sin(\theta/2)$ and $\cos(\theta/2)$.
5.  Derive a half-angle formula for $\csc(\theta/2)$ in terms of $\cos(\theta)$. (Hint: Recall that $\csc(x) = 1/\sin(x)$).