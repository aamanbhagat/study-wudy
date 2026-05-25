## 1. What it is — in plain English

Imagine you have two separate angles, let's call them Angle A and Angle B. You know everything about them: their sine, cosine, and tangent values. Now, what if you wanted to find the sine, cosine, or tangent of the *combined* angle, either Angle A *plus* Angle B, or Angle A *minus* Angle B?

These "sum and difference formulas" are like special recipes that tell you exactly how to combine the individual sine, cosine, and tangent values of Angle A and Angle B to find the sine, cosine, or tangent of their sum or difference. It's not as simple as just adding or subtracting the values directly – for example, $\sin(A+B)$ is almost never equal to $\sin A + \sin B$. Think of it like baking: if you have a recipe for chocolate cake and a recipe for vanilla cake, you can't just add them together to get a chocolate-vanilla swirl cake; you need a specific recipe for the combined cake that tells you how to blend the ingredients.

These formulas provide that precise "recipe" for combining angles. They allow us to break down complex angles into simpler ones, or to understand how two angles interact when added or subtracted. They are fundamental tools for analyzing waves, rotations, and many other phenomena where angles are combined.

## 2. Why it matters — real-world applications

These formulas are not just abstract mathematical curiosities; they are foundational to many real-world applications across science and engineering.

1.  **Physics — Wave Interference and Superposition:** When two waves meet (like sound waves, light waves, or even ocean waves), they combine. The resulting wave's amplitude and phase can be described using these sum and difference formulas. For example, in acoustics, understanding how two sound waves of slightly different frequencies combine to produce "beats" (a pulsating sound) directly uses $\cos(A-B)$ and $\cos(A+B)$ to show how two cosine waves combine into a product of cosines. This is crucial for designing noise-canceling headphones or understanding how musical instruments produce their unique sounds.

2.  **Aerospace Engineering — Navigation and Control Systems:** Aircraft and spacecraft navigation rely heavily on precise calculations involving angles. When an aircraft changes its heading or altitude, its orientation relative to a fixed coordinate system (like Earth's surface) changes. Sum and difference formulas are used in coordinate transformations and rotation matrices, which are essential for calculating a vehicle's position, velocity, and attitude. For instance, if you know the angle of a flight path relative to one axis and then rotate your coordinate system, these formulas help you find the new angle relative to the new axes. This is vital for autopilot systems and missile guidance.

3.  **Computer Graphics and Robotics — Rotations:** In 2D and 3D computer graphics (think video games, CAD software, or animated movies), objects are constantly being rotated. When you rotate an object around a point or an axis, the coordinates of its vertices change. These rotations are fundamentally based on trigonometric functions and often involve combining rotations. If you rotate an object by angle A and then by angle B, the total rotation can be described using sum formulas for sine and cosine, which are embedded in the rotation matrices used in graphics engines. Similarly, robot arms perform sequences of rotations, and the final position of the end-effector is calculated using these principles.

4.  **Electrical Engineering — Signal Processing:** In telecommunications and signal processing, engineers often deal with combining or separating sinusoidal signals (like radio waves or alternating currents). For example, frequency modulation (FM) radio involves varying the frequency of a carrier wave based on an audio signal. Demodulating these signals to extract the original audio often involves operations that can be simplified or understood using trigonometric sum and difference identities. They are also used in analyzing the phase relationships between different components in an AC circuit.

## 3. Prerequisites — what you must know first

Before diving into the sum and difference formulas, ensure you have a solid grasp of these foundational concepts:

*   **Unit Circle:** Understanding how angles are measured in standard position, and how the coordinates of points on the unit circle relate to the sine and cosine of the angle.
*   **Basic Trigonometric Definitions:** Definitions of sine, cosine, and tangent in terms of opposite/adjacent/hypotenuse for right triangles, and in terms of x, y, r for angles in standard position.
*   **Special Angles:** Knowing the exact values of sine, cosine, and tangent for common angles like $0^\circ, 30^\circ, 45^\circ, 60^\circ, 90^\circ$ (and their radian equivalents).
*   **Pythagorean Identity:** The fundamental identity $\sin^2 \theta + \cos^2 \theta = 1$.
*   **Reciprocal and Quotient Identities:** Understanding that $\tan \theta = \sin \theta / \cos \theta$, $\cot \theta = 1/\tan \theta$, $\sec \theta = 1/\cos \theta$, and $\csc \theta = 1/\sin \theta$.
*   **Even/Odd Identities:** Knowing that $\cos(-\theta) = \cos \theta$ (cosine is an even function) and $\sin(-\theta) = -\sin \theta$ (sine is an odd function). Also, $\tan(-\theta) = -\tan \theta$.
*   **Cofunction Identities:** Understanding relationships like $\sin(\pi/2 - \theta) = \cos \theta$ and $\cos(\pi/2 - \theta) = \sin \theta$.
*   **Distance Formula:** How to calculate the distance between two points $(x_1, y_1)$ and $(x_2, y_2)$ in a coordinate plane: $d = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$. This is crucial for the primary proof.
*   **Algebraic Manipulation:** Proficiency in expanding expressions, squaring binomials, and simplifying algebraic equations.

## 4. The core idea — step by step

The core idea is to derive a formula for $\cos(A-B)$ using the distance formula on the unit circle. Once we have this, all other sum and difference formulas can be derived from it using various trigonometric identities. This approach provides a rigorous foundation.

### Step 1: The Goal and Initial Setup

**Plain English Statement:** We want to find a way to express the cosine of the difference between two angles, say $A$ and $B$, in terms of the sines and cosines of $A$ and $B$ individually. We'll use the unit circle and the distance formula because the distance between two points on a circle depends on the angle between them.

**Small Concrete Example:** Imagine you want to find $\cos(15^\circ)$. You know $15^\circ = 45^\circ - 30^\circ$. If we had a formula for $\cos(A-B)$, we could plug in $A=45^\circ$ and $B=30^\circ$ to get the value.

**Formal/Mathematical Version:** We place two angles, $A$ and $B$, in standard position on the unit circle. Let $P_A$ be the point corresponding to angle $A$, and $P_B$ be the point corresponding to angle $B$.
The coordinates of $P_A$ are $(\cos A, \sin A)$.
The coordinates of $P_B$ are $(\cos B, \sin B)$.

The angle between $P_A$ and $P_B$ is $A-B$.

Now, consider rotating the entire configuration so that $P_B$ moves to the point $(1,0)$ (which corresponds to an angle of $0$). If we rotate $P_A$ by the same amount (which is $-B$), its new angle will be $A-B$. Let's call this new point $P_{A-B}$.
The coordinates of $P_{A-B}$ are $(\cos(A-B), \sin(A-B))$.
The point $P_0$ (which $P_B$ moved to) is $(1,0)$.

The key insight is that the distance between $P_A$ and $P_B$ is the *same* as the distance between $P_{A-B}$ and $P_0$, because we've only rotated the points, not changed their relative separation.

$$ \text{Distance}(P_A, P_B) = \text{Distance}(P_{A-B}, P_0) $$

**What could go wrong:** Forgetting that rotation preserves distances. Assuming the points are on any circle, not specifically the unit circle (which simplifies coordinates).

### Step 2: Deriving the Cosine Difference Formula: $\cos(A-B)$

**Plain English Statement:** We will apply the distance formula to both pairs of points identified in Step 1 and set the squared distances equal to each other. This will allow us to simplify and isolate $\cos(A-B)$.

**Small Concrete Example:** If $P_1 = (x_1, y_1)$ and $P_2 = (x_2, y_2)$, then $d^2 = (x_2-x_1)^2 + (y_2-y_1)^2$. We'll use this for our two pairs of points.

**Formal/Mathematical Version:**
Using the distance formula $d^2 = (x_2-x_1)^2 + (y_2-y_1)^2$:

For $P_A(\cos A, \sin A)$ and $P_B(\cos B, \sin B)$:
$$ d_1^2 = (\cos A - \cos B)^2 + (\sin A - \sin B)^2 $$
Expand this:
$$ d_1^2 = (\cos^2 A - 2\cos A \cos B + \cos^2 B) + (\sin^2 A - 2\sin A \sin B + \sin^2 B) $$
Rearrange terms and use the Pythagorean identity ($\sin^2 \theta + \cos^2 \theta = 1$):
$$ d_1^2 = (\cos^2 A + \sin^2 A) + (\cos^2 B + \sin^2 B) - 2\cos A \cos B - 2\sin A \sin B $$
$$ d_1^2 = 1 + 1 - 2\cos A \cos B - 2\sin A \sin B $$
$$ d_1^2 = 2 - 2\cos A \cos B - 2\sin A \sin B \quad (*)$$

For $P_{A-B}(\cos(A-B), \sin(A-B))$ and $P_0(1,0)$:
$$ d_2^2 = (\cos(A-B) - 1)^2 + (\sin(A-B) - 0)^2 $$
Expand this:
$$ d_2^2 = (\cos^2(A-B) - 2\cos(A-B) + 1) + \sin^2(A-B) $$
Rearrange terms and use the Pythagorean identity:
$$ d_2^2 = (\cos^2(A-B) + \sin^2(A-B)) - 2\cos(A-B) + 1 $$
$$ d_2^2 = 1 - 2\cos(A-B) + 1 $$
$$ d_2^2 = 2 - 2\cos(A-B) \quad (**) $$

Now, set $d_1^2 = d_2^2$:
$$ 2 - 2\cos A \cos B - 2\sin A \sin B = 2 - 2\cos(A-B) $$
Subtract 2 from both sides:
$$ -2\cos A \cos B - 2\sin A \sin B = -2\cos(A-B) $$
Divide by -2:
$$ \cos A \cos B + \sin A \sin B = \cos(A-B) $$
Thus, the first fundamental formula:
$$ \boxed{\cos(A-B) = \cos A \cos B + \sin A \sin B} $$

**What could go wrong:** Algebraic errors when expanding the squared terms, forgetting the Pythagorean identity, or making sign errors when dividing by -2.

### Step 3: Deriving the Cosine Sum Formula: $\cos(A+B)$

**Plain English Statement:** Now that we have the formula for the difference of angles, we can easily find the formula for the sum of angles by treating $A+B$ as $A-(-B)$ and using the even/odd identities for cosine and sine.

**Small Concrete Example:** If we know $\cos(A-B)$, we can find $\cos(A+B)$ by substituting $-B$ for $B$.

**Formal/Mathematical Version:**
We use the formula for $\cos(A-B)$ and replace $B$ with $-B$:
$$ \cos(A+B) = \cos(A - (-B)) $$
Apply the $\cos(X-Y)$ formula where $X=A$ and $Y=-B$:
$$ \cos(A - (-B)) = \cos A \cos(-B) + \sin A \sin(-B) $$
Recall the even/odd identities: $\cos(-B) = \cos B$ and $\sin(-B) = -\sin B$.
Substitute these into the equation:
$$ \cos(A+B) = \cos A (\cos B) + \sin A (-\sin B) $$
$$ \boxed{\cos(A+B) = \cos A \cos B - \sin A \sin B} $$

**What could go wrong:** Forgetting the even/odd identities for sine and cosine, leading to an incorrect sign.

### Step 4: Deriving the Sine Sum Formula: $\sin(A+B)$

**Plain English Statement:** We can derive the sine sum formula from the cosine difference formula by using cofunction identities, which relate sine and cosine. Specifically, we know $\sin \theta = \cos(\pi/2 - \theta)$.

**Small Concrete Example:** We know $\sin(30^\circ) = \cos(90^\circ - 30^\circ) = \cos(60^\circ)$. We will apply this idea to $\sin(A+B)$.

**Formal/Mathematical Version:**
Use the cofunction identity $\sin \theta = \cos(\pi/2 - \theta)$. Let $\theta = A+B$:
$$ \sin(A+B) = \cos\left(\frac{\pi}{2} - (A+B)\right) $$
Rearrange the terms inside the cosine:
$$ \sin(A+B) = \cos\left(\left(\frac{\pi}{2} - A\right) - B\right) $$
Now, apply the $\cos(X-Y)$ formula, where $X = (\pi/2 - A)$ and $Y = B$:
$$ \sin(A+B) = \cos\left(\frac{\pi}{2} - A\right) \cos B + \sin\left(\frac{\pi}{2} - A\right) \sin B $$
Apply the cofunction identities again: $\cos(\pi/2 - A) = \sin A$ and $\sin(\pi/2 - A) = \cos A$.
Substitute these back:
$$ \boxed{\sin(A+B) = \sin A \cos B + \cos A \sin B} $$

**What could go wrong:** Incorrectly applying the cofunction identities, or making sign errors when rearranging terms inside the cosine.

### Step 5: Deriving the Sine Difference Formula: $\sin(A-B)$

**Plain English Statement:** Similar to how we derived $\cos(A+B)$ from $\cos(A-B)$, we can derive $\sin(A-B)$ from $\sin(A+B)$ by replacing $B$ with $-B$ and using the even/odd identities.

**Small Concrete Example:** If we know $\sin(A+B)$, we can find $\sin(A-B)$ by substituting $-B$ for $B$.

**Formal/Mathematical Version:**
We use the formula for $\sin(A+B)$ and replace $B$ with $-B$:
$$ \sin(A-B) = \sin(A + (-B)) $$
Apply the $\sin(X+Y)$ formula where $X=A$ and $Y=-B$:
$$ \sin(A + (-B)) = \sin A \cos(-B) + \cos A \sin(-B) $$
Recall the even/odd identities: $\cos(-B) = \cos B$ and $\sin(-B) = -\sin B$.
Substitute these into the equation:
$$ \sin(A-B) = \sin A (\cos B) + \cos A (-\sin B) $$
$$ \boxed{\sin(A-B) = \sin A \cos B - \cos A \sin B} $$

**What could go wrong:** Again, sign errors due to incorrect application of even/odd identities.

### Step 6: Deriving the Tangent Sum Formula: $\tan(A+B)$

**Plain English Statement:** Since tangent is defined as sine divided by cosine ($\tan \theta = \sin \theta / \cos \theta$), we can derive the tangent sum formula by dividing the $\sin(A+B)$ formula by the $\cos(A+B)$ formula. We will then simplify the resulting complex fraction by dividing all terms by $\cos A \cos B$.

**Small Concrete Example:** If $\tan A = 1$ and $\tan B = \sqrt{3}$, we can find $\tan(A+B)$ using the formula.

**Formal/Mathematical Version:**
$$ \tan(A+B) = \frac{\sin(A+B)}{\cos(A+B)} $$
Substitute the derived formulas for $\sin(A+B)$ and $\cos(A+B)$:
$$ \tan(A+B) = \frac{\sin A \cos B + \cos A \sin B}{\cos A \cos B - \sin A \sin B} $$
To simplify this expression and get it in terms of $\tan A$ and $\tan B$, divide every term in the numerator and denominator by $\cos A \cos B$. (This step assumes $\cos A \neq 0$ and $\cos B \neq 0$, which means $A \neq \pi/2 + n\pi$ and $B \neq \pi/2 + n\pi$).
$$ \tan(A+B) = \frac{\frac{\sin A \cos B}{\cos A \cos B} + \frac{\cos A \sin B}{\cos A \cos B}}{\frac{\cos A \cos B}{\cos A \cos B} - \frac{\sin A \sin B}{\cos A \cos B}} $$
Simplify each term:
$$ \tan(A+B) = \frac{\frac{\sin A}{\cos A} + \frac{\sin B}{\cos B}}{1 - \frac{\sin A}{\cos A} \cdot \frac{\sin B}{\cos B}} $$
Substitute $\tan \theta = \sin \theta / \cos \theta$:
$$ \boxed{\tan(A+B) = \frac{\tan A + \tan B}{1 - \tan A \tan B}} $$

**What could go wrong:** Algebraic errors during the division and simplification. Forgetting the assumption that $\cos A \cos B \neq 0$, which means the formula is undefined if $A$ or $B$ is an odd multiple of $\pi/2$.

### Step 7: Deriving the Tangent Difference Formula: $\tan(A-B)$

**Plain English Statement:** Similar to previous derivations, we can get the tangent difference formula by substituting $-B$ for $B$ in the $\tan(A+B)$ formula and using the odd identity for tangent.

**Small Concrete Example:** If we know $\tan(A+B)$, we can find $\tan(A-B)$ by substituting $-B$ for $B$.

**Formal/Mathematical Version:**
Use the formula for $\tan(A+B)$ and replace $B$ with $-B$:
$$ \tan(A-B) = \tan(A + (-B)) $$
Apply the $\tan(X+Y)$ formula where $X=A$ and $Y=-B$:
$$ \tan(A + (-B)) = \frac{\tan A + \tan(-B)}{1 - \tan A \tan(-B)} $$
Recall the odd identity: $\tan(-B) = -\tan B$.
Substitute this into the equation:
$$ \tan(A-B) = \frac{\tan A + (-\tan B)}{1 - \tan A (-\tan B)} $$
$$ \boxed{\tan(A-B) = \frac{\tan A - \tan B}{1 + \tan A \tan B}} $$

**What could go wrong:** Sign errors when substituting $-\tan B$. Forgetting the domain restrictions for tangent.

## 5. Worked examples — multiple, with every step shown

### Example 1: Finding the exact value of $\sin(75^\circ)$

**Problem:** Find the exact value of $\sin(75^\circ)$.

**Given:** We need to find $\sin(75^\circ)$.
**Want:** The exact numerical value.

**Solution:**
We can express $75^\circ$ as a sum of two familiar angles: $75^\circ = 45^\circ + 30^\circ$.
So, we will use the sine sum formula: $\sin(A+B) = \sin A \cos B + \cos A \sin B$.

1.  **Identify A and B:**
    Let $A = 45^\circ$ and $B = 30^\circ$.
    *This step breaks down the complex angle into simpler, known angles.*

2.  **Recall trigonometric values for A and B:**
    For $A=45^\circ$:
    $\sin 45^\circ = \frac{\sqrt{2}}{2}$
    $\cos 45^\circ = \frac{\sqrt{2}}{2}$
    For $B=30^\circ$:
    $\sin 30^\circ = \frac{1}{2}$
    $\cos 30^\circ = \frac{\sqrt{3}}{2}$
    *Knowing these exact values from the unit circle is crucial.*

3.  **Apply the sine sum formula:**
    $$ \sin(75^\circ) = \sin(45^\circ + 30^\circ) = \sin 45^\circ \cos 30^\circ + \cos 45^\circ \sin 30^\circ $$
    *This is the direct application of the formula.*

4.  **Substitute the known values:**
    $$ \sin(75^\circ) = \left(\frac{\sqrt{2}}{2}\right) \left(\frac{\sqrt{3}}{2}\right) + \left(\frac{\sqrt{2}}{2}\right) \left(\frac{1}{2}\right) $$
    *Replace each trigonometric function with its exact numerical value.*

5.  **Perform multiplication:**
    $$ \sin(75^\circ) = \frac{\sqrt{2} \cdot \sqrt{3}}{2 \cdot 2} + \frac{\sqrt{2} \cdot 1}{2 \cdot 2} $$
    $$ \sin(75^\circ) = \frac{\sqrt{6}}{4} + \frac{\sqrt{2}}{4} $$
    *Multiply the numerators and denominators separately.*

6.  **Combine the fractions:**
    $$ \sin(75^\circ) = \frac{\sqrt{6} + \sqrt{2}}{4} $$
    *Since the denominators are the same, we can add the numerators directly.*

**Final Answer:**
$$ \boxed{\sin(75^\circ) = \frac{\sqrt{6} + \sqrt{2}}{4}} $$

**Reflection:** This example was straightforward because $75^\circ$ can be easily expressed as a sum of common angles, and all values are positive. The main challenge is remembering the formula and the exact trigonometric values.

---

### Example 2: Finding the exact value of $\cos(15^\circ)$

**Problem:** Find the exact value of $\cos(15^\circ)$.

**Given:** We need to find $\cos(15^\circ)$.
**Want:** The exact numerical value.

**Solution:**
We can express $15^\circ$ as a difference of two familiar angles: $15^\circ = 45^\circ - 30^\circ$ (or $60^\circ - 45^\circ$). Let's use $45^\circ - 30^\circ$.
So, we will use the cosine difference formula: $\cos(A-B) = \cos A \cos B + \sin A \sin B$.

1.  **Identify A and B:**
    Let $A = 45^\circ$ and $B = 30^\circ$.
    *This step selects appropriate angles for the difference formula.*

2.  **Recall trigonometric values for A and B:**
    For $A=45^\circ$:
    $\sin 45^\circ = \frac{\sqrt{2}}{2}$
    $\cos 45^\circ = \frac{\sqrt{2}}{2}$
    For $B=30^\circ$:
    $\sin 30^\circ = \frac{1}{2}$
    $\cos 30^\circ = \frac{\sqrt{3}}{2}$
    *Accuracy in recalling these values is essential.*

3.  **Apply the cosine difference formula:**
    $$ \cos(15^\circ) = \cos(45^\circ - 30^\circ) = \cos 45^\circ \cos 30^\circ + \sin 45^\circ \sin 30^\circ $$
    *Careful application of the formula, noting the '+' sign in the middle for cosine difference.*

4.  **Substitute the known values:**
    $$ \cos(15^\circ) = \left(\frac{\sqrt{2}}{2}\right) \left(\frac{\sqrt{3}}{2}\right) + \left(\frac{\sqrt{2}}{2}\right) \left(\frac{1}{2}\right) $$
    *Plug in the exact values.*

5.  **Perform multiplication:**
    $$ \cos(15^\circ) = \frac{\sqrt{6}}{4} + \frac{\sqrt{2}}{4} $$
    *Simplify the products.*

6.  **Combine the fractions:**
    $$ \cos(15^\circ) = \frac{\sqrt{6} + \sqrt{2}}{4} $$
    *Add the fractions with common denominators.*

**Final Answer:**
$$ \boxed{\cos(15^\circ) = \frac{\sqrt{6} + \sqrt{2}}{4}} $$

**Reflection:** Interestingly, $\sin(75^\circ)$ and $\cos(15^\circ)$ yield the same result. This is expected due to the cofunction identity $\sin \theta = \cos(90^\circ - \theta)$, as $75^\circ = 90^\circ - 15^\circ$. This example reinforces the importance of remembering the correct sign in the formula (plus for $\cos(A-B)$).

---

### Example 3: Finding $\tan(A+B)$ given $\sin A$ and $\cos B$ in specific quadrants

**Problem:** Given $\sin A = \frac{3}{5}$ where $A$ is in Quadrant I, and $\cos B = -\frac{12}{13}$ where $B$ is in Quadrant II, find $\tan(A+B)$.

**Given:**
*   $\sin A = \frac{3}{5}$, $A \in \text{Quadrant I}$
*   $\cos B = -\frac{12}{13}$, $B \in \text{Quadrant II}$
**Want:** $\tan(A+B)$

**Solution:**
To use the formula $\tan(A+B) = \frac{\tan A + \tan B}{1 - \tan A \tan B}$, we first need to find $\tan A$ and $\tan B$. This requires finding $\cos A$ and $\sin B$.

1.  **Find $\cos A$ and $\tan A$ (for angle A in Q1):**
    We know $\sin^2 A + \cos^2 A = 1$.
    $$ \left(\frac{3}{5}\right)^2 + \cos^2 A = 1 $$
    $$ \frac{9}{25} + \cos^2 A = 1 $$
    $$ \cos^2 A = 1 - \frac{9}{25} = \frac{25}{25} - \frac{9}{25} = \frac{16}{25} $$
    $$ \cos A = \pm\sqrt{\frac{16}{25}} = \pm\frac{4}{5} $$
    Since $A$ is in Quadrant I, $\cos A$ must be positive.
    $$ \cos A = \frac{4}{5} $$
    Now find $\tan A$:
    $$ \tan A = \frac{\sin A}{\cos A} = \frac{3/5}{4/5} = \frac{3}{4} $$
    *This step uses the Pythagorean identity and quadrant information to find the missing trigonometric ratios for angle A.*

2.  **Find $\sin B$ and $\tan B$ (for angle B in Q2):**
    We know $\sin^2 B + \cos^2 B = 1$.
    $$ \sin^2 B + \left(-\frac{12}{13}\right)^2 = 1 $$
    $$ \sin^2 B + \frac{144}{169} = 1 $$
    $$ \sin^2 B = 1 - \frac{144}{169} = \frac{169}{169} - \frac{144}{169} = \frac{25}{169} $$
    $$ \sin B = \pm\sqrt{\frac{25}{169}} = \pm\frac{5}{13} $$
    Since $B$ is in Quadrant II, $\sin B$ must be positive.
    $$ \sin B = \frac{5}{13} $$
    Now find $\tan B$:
    $$ \tan B = \frac{\sin B}{\cos B} = \frac{5/13}{-12/13} = -\frac{5}{12} $$
    *This step is similar to step 1, but careful attention is paid to the sign of sine in Quadrant II.*

3.  **Apply the tangent sum formula:**
    $$ \tan(A+B) = \frac{\tan A + \tan B}{1 - \tan A \tan B} $$
    *Write down the formula before substituting to avoid errors.*

4.  **Substitute the calculated values of $\tan A$ and $\tan B$:**
    $$ \tan(A+B) = \frac{\frac{3}{4} + \left(-\frac{5}{12}\right)}{1 - \left(\frac{3}{4}\right) \left(-\frac{5}{12}\right)} $$
    *Substitute carefully, especially with negative signs.*

5.  **Simplify the numerator:**
    $$ \frac{3}{4} - \frac{5}{12} = \frac{9}{12} - \frac{5}{12} = \frac{4}{12} = \frac{1}{3} $$
    *Find a common denominator and combine the fractions.*

6.  **Simplify the denominator:**
    $$ 1 - \left(-\frac{15}{48}\right) = 1 + \frac{15}{48} = 1 + \frac{5}{16} = \frac{16}{16} + \frac{5}{16} = \frac{21}{16} $$
    *Perform multiplication first, then addition/subtraction. Simplify the fraction if possible.*

7.  **Divide the simplified numerator by the simplified denominator:**
    $$ \tan(A+B) = \frac{\frac{1}{3}}{\frac{21}{16}} = \frac{1}{3} \cdot \frac{16}{21} $$
    *Remember that dividing by a fraction is the same as multiplying by its reciprocal.*

8.  **Final multiplication:**
    $$ \tan(A+B) = \frac{16}{63} $$

**Final Answer:**
$$ \boxed{\tan(A+B) = \frac{16}{63}} $$

**Reflection:** This example is tricky due to the multiple steps involved: first finding the missing trig ratios using the Pythagorean identity and quadrant rules, then substituting these into the tangent sum formula, and finally performing careful fraction arithmetic. Sign errors are a common trap here.

---

### Example 4: Proving a trigonometric identity using sum formulas

**Problem:** Prove the identity $\sin(x + \frac{\pi}{2}) = \cos x$.

**Given:** The identity $\sin(x + \frac{\pi}{2}) = \cos x$.
**Want:** To show that the left-hand side (LHS) is equal to the right-hand side (RHS).

**Solution:**
We will start with the LHS and apply the sine sum formula.

1.  **Identify A and B in the LHS:**
    The LHS is $\sin(x + \frac{\pi}{2})$.
    Let $A = x$ and $B = \frac{\pi}{2}$.
    *This maps the given expression to the general form of the sum formula.*

2.  **Recall trigonometric values for B:**
    For $B = \frac{\pi}{2}$ (or $90^\circ$):
    $\sin(\frac{\pi}{2}) = 1$
    $\cos(\frac{\pi}{2}) = 0$
    *These are fundamental values from the unit circle.*

3.  **Apply the sine sum formula:**
    $$ \text{LHS} = \sin(A+B) = \sin A \cos B + \cos A \sin B $$
    Substitute $A=x$ and $B=\frac{\pi}{2}$:
    $$ \sin\left(x + \frac{\pi}{2}\right) = \sin x \cos\left(\frac{\pi}{2}\right) + \cos x \sin\left(\frac{\pi}{2}\right) $$
    *This is the direct application of the formula.*

4.  **Substitute the known values for $\cos(\frac{\pi}{2})$ and $\sin(\frac{\pi}{2})$:**
    $$ \sin\left(x + \frac{\pi}{2}\right) = \sin x (0) + \cos x (1) $$
    *Replace the constant trigonometric functions with their numerical values.*

5.  **Simplify the expression:**
    $$ \sin\left(x + \frac{\pi}{2}\right) = 0 + \cos x $$
    $$ \sin\left(x + \frac{\pi}{2}\right) = \cos x $$
    *Perform the multiplication and addition.*

6.  **Compare with the RHS:**
    The LHS simplifies to $\cos x$, which is exactly the RHS.
    $$ \text{LHS} = \cos x = \text{RHS} $$
    *This confirms the identity.*

**Final Answer:**
$$ \boxed{\sin\left(x + \frac{\pi}{2}\right) = \cos x} $$

**Reflection:** This example demonstrates how sum formulas can be used to prove other trigonometric identities, particularly cofunction identities. It's relatively easy because the values for $\pi/2$ are simple (0 or 1), leading to significant simplification. It highlights the power of these formulas in simplifying expressions.

## 6. Common mistakes and traps

1.  **Assuming Linearity:** The most common mistake is assuming $\sin(A+B) = \sin A + \sin B$ or $\cos(A+B) = \cos A + \cos B$. This is almost never true.
2.  **Sign Errors in Cosine Formulas:** Students often mix up the signs in the cosine formulas: $\cos(A+B)$ has a *minus* sign ($\cos A \cos B - \sin A \sin B$), while $\cos(A-B)$ has a *plus* sign ($\cos A \cos B + \sin A \sin B$).
3.  **Sign Errors in Tangent Formulas:** Similar to cosine, the numerator sign for $\tan(A \pm B)$ matches the sign, while the denominator sign is opposite. For $\tan(A+B)$, it's $(\tan A + \tan B) / (1 - \tan A \tan B)$. For $\tan(A-B)$, it's $(\tan A - \tan B) / (1 + \tan A \tan B)$.
4.  **Incorrectly Applying Even/Odd Identities:** When deriving formulas (or solving problems) involving negative angles, forgetting that $\sin(-B) = -\sin B$ while $\cos(-B) = \cos B$ can lead to incorrect signs in the final formula.
5.  **Algebraic Errors with Fractions:** Especially in tangent problems, dealing with complex fractions (fractions within fractions) requires careful arithmetic, finding common denominators, and correctly inverting and multiplying.
6.  **Quadrant Sign Errors:** When given $\sin A$ or $\cos A$ and a quadrant, students might forget to correctly determine the sign of the *other* trigonometric functions ($\cos A$, $\sin A$, or $\tan A$) based on the quadrant. For example, if $\cos B$ is negative in Q2, $\sin B$ must be positive, and $\tan B$ must be negative.

## 7. Textbook-precise explanation

The sum and difference formulas for trigonometric functions provide a means to express the sine, cosine, or tangent of a sum or difference of two angles in terms of the sines, cosines, and tangents of the individual angles. These identities are fundamental in advanced trigonometry and calculus.

**Theorem (Sum and Difference Formulas):**
For any real numbers (angles) $A$ and $B$:

1.  **Cosine Difference Formula:**
    $$ \cos(A-B) = \cos A \cos B + \sin A \sin B $$
2.  **Cosine Sum Formula:**
    $$ \cos(A+B) = \cos A \cos B - \sin A \sin B $$
3.  **Sine Sum Formula:**
    $$ \sin(A+B) = \sin A \cos B + \cos A \sin B $$
4.  **Sine Difference Formula:**
    $$ \sin(A-B) = \sin A \cos B - \cos A \sin B $$
5.  **Tangent Sum Formula:**
    $$ \tan(A+B) = \frac{\tan A + \tan B}{1 - \tan A \tan B} $$
    (Provided $\cos A \neq 0$, $\cos B \neq 0$, and $\cos(A+B) \neq 0$)
6.  **Tangent Difference Formula:**
    $$ \tan(A-B) = \frac{\tan A - \tan B}{1 + \tan A \tan B} $$
    (Provided $\cos A \neq 0$, $\cos B \neq 0$, and $\cos(A-B) \neq 0$)

**Proof Outline:**
The primary derivation typically begins with the **Cosine Difference Formula**.
Consider a unit circle centered at the origin. Let $P_A = (\cos A, \sin A)$ and $P_B = (\cos B, \sin B)$ be points on the unit circle corresponding to angles $A$ and $B$ in standard position. The distance between $P_A$ and $P_B$ can be calculated using the distance formula:
$$ d(P_A, P_B)^2 = (\cos A - \cos B)^2 + (\sin A - \sin B)^2 $$
$$ d(P_A, P_B)^2 = 2 - 2(\cos A \cos B + \sin A \sin B) \quad (*) $$
Now, rotate the entire configuration such that the angle $B$ aligns with the positive x-axis (i.e., angle $0$). The new coordinates for $P_B$ will be $P_0 = (1,0)$, and the new coordinates for $P_A$ will be $P_{A-B} = (\cos(A-B), \sin(A-B))$. Since rotation preserves distance, the distance between $P_A$ and $P_B$ is equal to the distance between $P_{A-B}$ and $P_0$.
$$ d(P_{A-B}, P_0)^2 = (\cos(A-B) - 1)^2 + (\sin(A-B) - 0)^2 $$
$$ d(P_{A-B}, P_0)^2 = 2 - 2\cos(A-B) \quad (**) $$
Equating $(*)$ and $(**)$ yields $\cos(A-B) = \cos A \cos B + \sin A \sin B$.

The remaining formulas are derived from this initial identity using established trigonometric relationships:
*   $\cos(A+B)$ is obtained by substituting $-B$ for $B$ in $\cos(A-B)$ and using $\cos(-B) = \cos B$, $\sin(-B) = -\sin B$.
*   $\sin(A+B)$ is derived by using the cofunction identity $\sin \theta = \cos(\pi/2 - \theta)$ with $\theta = A+B$, then applying the $\cos(X-Y)$ formula.
*   $\sin(A-B)$ is obtained by substituting $-B$ for $B$ in $\sin(A+B)$.
*   $\tan(A \pm B)$ are derived by expressing $\tan \theta = \sin \theta / \cos \theta$ and substituting the respective sum/difference formulas for sine and cosine, followed by dividing the numerator and denominator by $\cos A \cos B$.

These identities are critical for simplifying trigonometric expressions, solving trigonometric equations, proving further identities (such as double-angle and half-angle formulas), and in applications involving wave phenomena and rotations.

*(Reference: Stewart, J. (2016). Calculus (8th ed., Early Transcendentals). Cengage Learning. Chapter 1.5, "Trigonometric Functions.")*
*(Reference: Thomas, G. B., Weir, M. D., & Hass, J. (2014). Thomas' Calculus (13th ed.). Pearson. Chapter 1.6, "Trigonometric Functions.")*

## 8. ASCII diagrams

Here is a conceptual ASCII diagram illustrating the setup for the proof of $\cos(A-B)$ using the unit circle. It shows the points $P_A$, $P_B$, $P_{A-B}$, and $P_0$ (which is $(1,0)$). The key is that the arc length (and thus chord length) between $P_A$ and $P_B$ is the same as between $P_{A-B}$ and $P_0$.

```text
       Y-axis
        ^
        |
    P_A (cos A, sin A)
     *  /|
    /   |
   /    |  sin A
  /     |
O-------+------> X-axis
 (0,0)  cos A

     P_B (cos B, sin B)
      *
     / \
    /   \
   /     \
  /       \
 /         \
P_A -------- P_B   <-- Chord length 1
 (Angle between P_A and P_B is A-B)


Now, rotate the system so P_B moves to (1,0):

       Y-axis
        ^
        |
        |
        |  P_{A-B} (cos(A-B), sin(A-B))
        * /|
       /  |
      /   | sin(A-B)
     /    |
O----*-----+------> X-axis
 (0,0) P_0 (1,0)
      cos(A-B)

     P_{A-B} ------- P_0   <-- Chord length 2
 (Angle between P_{A-B} and P_0 is A-B)

The crucial insight is that Chord length 1 = Chord length 2.
We use the distance formula for these two lengths:
d(P_A, P_B)^2 = d(P_{A-B}, P_0)^2
```

**Description of the Figure:**

The diagram shows a unit circle in a Cartesian coordinate system.
1.  **Top left:** Point $P_A$ is shown in the first quadrant, with coordinates $(\cos A, \sin A)$. Angle $A$ is measured counter-clockwise from the positive x-axis to the line segment $OP_A$.
2.  **Top right:** Point $P_B$ is shown, also in the first quadrant (for simplicity, but it could be anywhere), with coordinates $(\cos B, \sin B)$. Angle $B$ is measured counter-clockwise from the positive x-axis to the line segment $OP_B$.
3.  **Middle:** A dashed line segment (chord) connects $P_A$ and $P_B$. The angle between the radial lines $OP_A$ and $OP_B$ is $A-B$.
4.  **Bottom left:** The entire system is conceptually rotated such that the line segment $OP_B$ now aligns with the positive x-axis. This means $P_B$ has moved to $P_0$, which is $(1,0)$.
5.  **Bottom right:** Due to this rotation, $P_A$ has moved to a new position, $P_{A-B}$, corresponding to the angle $A-B$. Its coordinates are $(\cos(A-B), \sin(A-B))$.
6.  **Bottom middle:** A dashed line segment (chord) connects $P_{A-B}$ and $P_0$. The key premise of the proof is that the length of the chord $P_A P_B$ is equal to the length of the chord $P_{A-B} P_0$. By setting the squared distances equal and expanding, the $\cos(A-B)$ formula is derived.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic / Visual Hook:**

    The most popular mnemonic for the sine and cosine sum/difference formulas is a catchy rhyme:

    *   **"Sine, Cos, Cos, Sine, same sign!"** for $\sin(A \pm B)$
        *   $\sin(A+B) = \sin A \cos B + \cos A \sin B$
        *   $\sin(A-B) = \sin A \cos B - \cos A \sin B$
        (Notice the sign in the formula matches the sign in the angle addition/subtraction.)

    *   **"Cos, Cos, Sine, Sine, opposite sign!"** for $\cos(A \pm B)$
        *   $\cos(A+B) = \cos A \cos B - \sin A \sin B$
        *   $\cos(A-B) = \cos A \cos B + \sin A \sin B$
        (Notice the sign in the formula is opposite to the sign in the angle addition/subtraction.)

    For tangent, think of it as a fraction:
    *   **"Tan plus Tan over 1 minus Tan Tan"** for $\tan(A+B)$
        *   $\tan(A+B) = \frac{\tan A + \tan B}{1 - \tan A \tan B}$
        (The numerator matches the sign of the sum, the denominator is opposite.)
    *   **"Tan minus Tan over 1 plus Tan Tan"** for $\tan(A-B)$
        *   $\tan(A-B) = \frac{\tan A - \tan B}{1 + \tan A \tan B}$
        (Again, numerator matches, denominator opposite.)

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**

    While there are six formulas, if you *must* prioritize, focus on these three, as the others can be derived:
    1.  **$\cos(A-B) = \cos A \cos B + \sin A \sin B$** (This is the starting point for all derivations)
    2.  **$\sin(A+B) = \sin A \cos B + \cos A \sin B$** (The most common sine form)
    3.  **$\tan(A+B) = \frac{\tan A + \tan B}{1 - \tan A \tan B}$** (The most common tangent form)

    Commit these to memory through repeated writing and recitation.

3.  **Spaced-Repetition Schedule:**

    To embed these formulas and their derivations deeply into long-term memory, follow this spaced-repetition schedule:
    *   **Review 1:** 1 day after initial learning.
    *   **Review 2:** 3 days after Review 1.
    *   **Review 3:** 7 days after Review 2.
    *   **Review 4:** 16 days after Review 3.
    *   **Review 5:** 35 days after Review 4.
    During each review, not only recall the formulas but also briefly re-derive them from first principles.

4.  **The First-Principles Re-derivation Pathway:**

    If you ever forget *all* the formulas, you can always rebuild them by remembering this pathway:
    *   **Start with the Unit Circle and Distance Formula:** This is the most robust starting point. Draw a unit circle, place points $P_A(\cos A, \sin A)$ and $P_B(\cos B, \sin B)$. Then, rotate the system so $P_B$ is at $(1,0)$, making $P_A$ become $P_{A-B}(\cos(A-B), \sin(A-B))$. Equate the squared distances: $d(P_A, P_B)^2 = d(P_{A-B}, P_0)^2$. This will yield $\cos(A-B) = \cos A \cos B + \sin A \sin B$.
    *   **Derive $\cos(A+B)$:** From $\cos(A-B)$, substitute $-B$ for $B$. Remember $\cos(-B)=\cos B$ and $\sin(-B)=-\sin B$.
    *   **Derive $\sin(A+B)$:** Use the cofunction identity $\sin \theta = \cos(\pi/2 - \theta)$. Apply it to $\sin(A+B) = \cos(\pi/2 - (A+B)) = \cos((\pi/2 - A) - B)$, then use the $\cos(X-Y)$ formula. Remember $\cos(\pi/2 - A) = \sin A$ and $\sin(\pi/2 - A) = \cos A$.
    *   **Derive $\sin(A-B)$:** From $\sin(A+B)$, substitute $-B$ for $B$. Remember $\cos(-B)=\cos B$ and $\sin(-B)=-\sin B$.
    *   **Derive $\tan(A \pm B)$:** Use the quotient identity $\tan \theta = \sin \theta / \cos \theta$. Substitute the derived sum/difference formulas for sine and cosine, then divide the numerator and denominator by $\cos A \cos B$ to express everything in terms of tangent. Remember $\tan(-B)=-\tan B$.

## 10. Connections — what this leads to

The sum and difference formulas are cornerstones of trigonometry, unlocking a vast array of further identities and applications. Mastering them is essential for progression in mathematics.

1.  **Double-Angle Formulas:** These are direct consequences, found by setting $A=B$ in the sum formulas. For example, $\sin(2A) = \sin(A+A) = \sin A \cos A + \cos A \sin A = 2\sin A \cos A$. Similarly for $\cos(2A)$ and $\tan(2A)$.
2.  **Half-Angle Formulas:** Derived from the double-angle formulas, these allow you to find trigonometric values for half an angle, e.g., $\sin(A/2)$, $\cos(A/2)$, $\tan(A/2)$.
3.  **Product-to-Sum and Sum-to-Product Formulas:** These identities allow you to convert products of sines and cosines into sums (and vice-versa), which are invaluable for integration in calculus and for analyzing wave phenomena in physics and engineering.
4.  **Solving Trigonometric Equations:** Many complex trigonometric equations can be simplified or solved by applying sum and difference formulas to combine or expand terms.
5.  **Complex Numbers and Euler's Formula:** The sum and difference formulas have a deep connection to the multiplication of complex numbers in polar form and Euler's formula ($e^{i\theta} = \cos \theta + i \sin \theta$). They are implicitly used when showing that $e^{i(A+B)} = e^{iA}e^{iB}$.
6.  **Calculus — Derivatives and Integrals:** The derivatives of $\sin x$ and $\cos x$ are often derived using the limit definition, which requires the sum formulas for $\sin(x+h)$ and $\cos(x+h)$. These formulas are also crucial for simplifying expressions before integration.
7.  **Wave Mechanics and Fourier Analysis:** In physics and engineering, the superposition of waves (e.g., sound waves, light waves, quantum wave functions) is fundamentally described by combining sinusoidal functions. Fourier analysis, which decomposes complex signals into sums of sines and cosines, relies heavily on these underlying identities.
8.  **Linear Algebra — Rotation Matrices:** In 2D and 3D graphics and robotics, rotations are represented by matrices. The entries of these rotation matrices are directly derived from the sine and cosine of the rotation angle, and combining rotations often implicitly uses the sum and difference formulas.

## 11. Self-check questions

1.  Using the sum or difference formulas, find the exact value of $\tan(105^\circ)$.
2.  Prove the identity: $\cos(x - \frac{3\pi}{2}) = -\sin x$.
3.  Given $\cos A = -\frac{5}{13}$ with $A$ in Quadrant III, and $\sin B = \frac{4}{5}$ with $B$ in Quadrant II, find $\sin(A-B)$.
4.  Simplify the expression: $\cos 5x \cos 2x - \sin 5x \sin 2x$.
5.  If $\tan x = 2$ and $\tan y = 3$, find $\tan(x+y)$ and explain why this result implies that $x+y$ is in a particular quadrant.