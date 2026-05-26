## 1. The one-sentence answer
**Pythagorean identities are the three algebraic relations obtained by applying the Pythagorean theorem to the definitions of sine and cosine on the unit circle, yielding \(\sin^2\theta + \cos^2\theta = 1\) together with its two immediate algebraic consequences.**

These relations follow directly from the geometry of a right triangle whose hypotenuse has length 1. The horizontal leg has length \(\cos\theta\) and the vertical leg has length \(\sin\theta\); their squares therefore sum to the square of the hypotenuse, which is 1. Once this single equation is in hand, the remaining two identities are produced by dividing through by \(\cos^2\theta\) or by \(\sin^2\theta\), respectively. The three statements together constitute the complete set of Pythagorean identities.

The same geometric fact reappears in every later trigonometric identity and in every application that reduces a combination of sines and cosines to a constant or to a single function.

> [!NOTE]
> The single equation \(\sin^2\theta + \cos^2\theta = 1\) is the only one that must be memorised; the other two are obtained in one algebraic step each.

## 2. Why this matters — concrete and current
In GPS receivers the pseudorange equations are linearised by substituting the small-angle approximations that rest on \(\sin^2\phi + \cos^2\phi = 1\), allowing centimetre-level positioning in real time.

In semiconductor lithography, phase-shift masks are designed using the identity to guarantee that the electric-field vectors of two coherent beams sum to unit intensity, preserving critical-dimension fidelity below 5 nm.

In the James Webb Space Telescope’s fine-steering mirror control loop, the quaternion-to-Euler conversion routine invokes the secant form of the identity to keep the rotation matrix orthonormal at every 2 ms update.

In AC power-system simulators used by utilities, instantaneous power is expressed as \(P = VI(\cos^2\omega t + \sin^2\omega t)\), which collapses identically to \(VI\) only because the Pythagorean identity holds for every sample.

In machine-learning layers that implement rotary positional embeddings, the rotation matrix is constructed from \(\cos\theta\) and \(\sin\theta\) blocks whose squared sum is forced to 1, guaranteeing that attention scores remain invariant under rotation.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Pythagorean theorem      | Supplies the geometric relation \(a^2 + b^2 = c^2\) that becomes the identity once \(c = 1\). |
| Unit-circle definitions  | \(\cos\theta\) and \(\sin\theta\) are the coordinates of the point at angle \(\theta\) on the circle of radius 1. |
| Algebraic division       | Allows the two derived identities to be obtained from the primary one without new geometry. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Coordinates on the unit circle
Any angle \(\theta\) determines a unique point on the circle of radius 1 centred at the origin. The horizontal distance from the origin to that point is defined to be \(\cos\theta\); the vertical distance is defined to be \(\sin\theta\).

Example: \(\theta = 0\) places the point at \((1,0)\), so \(\cos 0 = 1\) and \(\sin 0 = 0\).

\[
(\cos\theta)^2 + (\sin\theta)^2 = 1^2.
\]

> [!WARNING]
> Treating \(\cos\theta\) as a length rather than a signed coordinate will produce sign errors in quadrants II and III.

### Step 2 — Apply the Pythagorean theorem
The line segment from the origin to the point is the hypotenuse of the right triangle whose legs are the coordinate distances. Because the hypotenuse equals 1, the theorem states that the sum of the squares of the legs equals 1.

\[
\cos^2\theta + \sin^2\theta = 1.
\]

### Step 3 — First algebraic consequence
Divide the identity through by \(\cos^2\theta\) (valid wherever \(\cos\theta \neq 0\)):

\[
\frac{\cos^2\theta}{\cos^2\theta} + \frac{\sin^2\theta}{\cos^2\theta} = \frac{1}{\cos^2\theta} \implies 1 + \tan^2\theta = \sec^2\theta.
\]

> [!WARNING]
> Division by \(\cos^2\theta\) is undefined at odd multiples of \(\pi/2\); those angles must be excluded from the domain of the resulting identity.

### Step 4 — Second algebraic consequence
Divide the original identity by \(\sin^2\theta\) (valid wherever \(\sin\theta \neq 0\)):

\[
\frac{\cos^2\theta}{\sin^2\theta} + \frac{\sin^2\theta}{\sin^2\theta} = \frac{1}{\sin^2\theta} \implies \cot^2\theta + 1 = \csc^2\theta.
\]

### Step 5 — Textbook statement of all three identities
The three relations, valid wherever the functions are defined, are therefore

\[
\sin^2\theta + \cos^2\theta = 1, \qquad 1 + \tan^2\theta = \sec^2\theta, \qquad 1 + \cot^2\theta = \csc^2\theta.
\]

## 5. Worked examples — every step shown

**Example 1 — Verify the primary identity at a standard angle**  
*Given:* \(\theta = \pi/3\).  
*Find:* Confirm \(\sin^2\theta + \cos^2\theta = 1\).

\[
\sin(\pi/3) = \sqrt{3}/2, \quad \cos(\pi/3) = 1/2.
\]

*Why:* These are the exact values read from the 30-60-90 triangle inscribed in the unit circle.

\[
\left(\frac{\sqrt{3}}{2}\right)^2 + \left(\frac{1}{2}\right)^2 = \frac{3}{4} + \frac{1}{4} = 1.
\]

**Answer:**  
**1**

*Reflection:* The numerical check works because the angle lies in the first quadrant where both functions are positive; the identity itself is independent of sign.

**Example 2 — Derive the secant identity from a known value**  
*Given:* \(\cos\theta = 3/5\).  
*Find:* \(\sec^2\theta\).

\[
\sin^2\theta = 1 - \cos^2\theta = 1 - (9/25) = 16/25.
\]

*Why:* Direct substitution of the given value into the primary identity.

\[
\tan^2\theta = \frac{\sin^2\theta}{\cos^2\theta} = \frac{16/25}{9/25} = 16/9.
\]

*Why:* Division yields the tangent squared term required by the target identity.

\[
1 + \tan^2\theta = 1 + 16/9 = 25/9 \implies \sec^2\theta = 25/9.
\]

**Answer:**  
**\(\sec^2\theta = 25/9\)**

*Reflection:* The intermediate value of \(\sin^2\theta\) is never needed explicitly once the division step is recognised.

**Example 3 — Simplify an expression containing mixed functions**  
*Given:* \(\frac{\sec^2\theta - 1}{\tan^2\theta}\).  
*Find:* Its simplest form.

\[
\sec^2\theta - 1 = \tan^2\theta
\]

*Why:* The second Pythagorean identity rearranged.

\[
\frac{\tan^2\theta}{\tan^2\theta} = 1.
\]

**Answer:**  
**1**

*Reflection:* Recognition of the exact pattern of the identity collapses the expression in one step.

**Example 4 — Solve a trigonometric equation**  
*Given:* \(\sin^2\theta + \cos^2\theta + \sin\theta = 2\).  
*Find:* All solutions in \([0,2\pi)\).

\[
1 + \sin\theta = 2 \implies \sin\theta = 1.
\]

*Why:* The primary identity replaces the squared pair instantly.

Solutions: \(\theta = \pi/2\).

**Answer:**  
**\(\theta = \pi/2\)**

*Reflection:* The equation is over-determined until the identity reduces the two squared terms to a constant.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Writing \(\sin^2\theta + \cos^2\theta = -1\) | Sign error when reading coordinates in quadrant III | Always square the coordinate values; squares erase signs. |
| Dividing by \(\cos^2\theta\) at \(\theta = \pi/2\) | Forgetting the domain restriction                   | State the excluded angles before each derived identity. |
| Treating \(\tan^2\theta + 1 = \sec^2\theta\) as valid for all \(\theta\) | Overlooking points where cosine vanishes            | Add the explicit proviso “where defined”.            |
| Confusing \(\cot^2\theta + 1 = \csc^2\theta\) with its reciprocal form | Mixing the two division routes                      | Derive each identity from the primary one each time until automatic. |
| Using the identities inside an integral without absolute-value adjustment | Forgetting that \(\sec\theta\) can be negative      | Keep the original \(\cos\theta\) sign until the final simplification. |
| Assuming the identities imply \(\sin\theta = \pm\sqrt{1 - \cos^2\theta}\) without quadrant check | Losing the sign information                         | Re-attach the correct sign from the quadrant after taking the square root. |
| Cancelling \(\sin^2\theta\) in \(\sin^2\theta + \cos^2\theta = 1\) to obtain \(\cos^2\theta = 1\) | Illegal cancellation when \(\sin\theta = 0\)        | Never cancel a variable factor that can be zero.     |

## 7. The textbook-precise statement
Let \(\theta\) be any real number. Then, wherever the functions are defined,

\[
\sin^2\theta + \cos^2\theta = 1,
\]

\[
1 + \tan^2\theta = \sec^2\theta \quad (\cos\theta \neq 0),
\]

\[
1 + \cot^2\theta = \csc^2\theta \quad (\sin\theta \neq 0).
\]

These are the three Pythagorean identities (Stewart, *Calculus*, 9e, §1.3, identities (6)–(8)).

## 8. Visual — diagram or schematic
```text
          y
          ^
          |     P=(cos θ, sin θ)
          |    /
          |   /  radius = 1
          |  /
          | / θ
----------+-----------> x
          |0
```
The horizontal leg is exactly \(\cos\theta\), the vertical leg is exactly \(\sin\theta\), and the hypotenuse is the radius 1. The Pythagorean theorem applied to this single right triangle yields the primary identity.

## 9. The memory technique

1. **The hook**  
   Picture a metal right triangle whose hypotenuse is welded to length 1; the legs are labelled “cos” and “sin”. Squaring and adding the legs always returns the fixed hypotenuse squared, i.e., 1.

2. **What to overlearn**  
   - \(\sin^2\theta + \cos^2\theta = 1\) (primary)  
   - Division by \(\cos^2\theta\) produces the secant form  
   - Division by \(\sin^2\theta\) produces the cosecant form

3. **Spaced-repetition schedule**  
   Review at 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback**  
   Return to the unit-circle point \((\cos\theta, \sin\theta)\), apply the Pythagorean theorem to the coordinate triangle, then divide by the appropriate squared function.

## 10. What this unlocks
These identities are the algebraic foundation for every subsequent trigonometric identity, for integration techniques that rationalise powers of sine and cosine, and for the rotation matrices used in linear algebra and computer graphics.

- Angle-addition formulas  
- Multiple-angle formulas  
- Trigonometric substitution in calculus  
- Fourier-series coefficient derivations  
- Rotation-matrix orthogonality proofs

## 11. Self-check — five questions, no answers
1. Evaluate \(\cos^2(\pi/4) + \sin^2(\pi/4)\) without calculating the individual values.

2. Starting from \(\sin^2\theta + \cos^2\theta = 1\), obtain \(1 + \cot^2\theta = \csc^2\theta\) by a single division; state the excluded angles.

3. Simplify \(\frac{1 - \cos^2\theta}{\sin^2\theta}\) to a single trigonometric function.

4. Solve \(\sec^2\theta - \tan^2\theta = 1\) over the reals and explain why every real number is a solution.

5. A student claims that \(\sin^2\theta + \cos^2\theta = 1\) implies \(\tan^2\theta + \cot^2\theta = 1\). Is the claim true? If not, supply a counter-example angle.