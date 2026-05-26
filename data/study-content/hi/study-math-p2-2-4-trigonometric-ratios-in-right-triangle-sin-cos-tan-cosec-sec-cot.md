## 1. The one-sentence answer
**Trigonometric ratios are the six constant ratios formed by the sides of a right triangle, each ratio depending only on one acute angle.**

A right triangle has one 90-degree angle. The two acute angles determine how the three sides relate to each other. When you divide any two sides, you always get the same number for a given angle, no matter how large or small the triangle is. These six numbers are named sine, cosine, tangent, cosecant, secant and cotangent.

The definitions come directly from the sides: opposite, adjacent and hypotenuse. Once you fix an acute angle, the ratios become fixed properties of that angle. This is why trigonometry works for measuring heights, distances and angles without physically climbing or reaching the target.

> [!NOTE]
> The single most important realisation is that these ratios are properties of the angle itself, not of any particular triangle size; similarity of right triangles makes the ratios invariant.

## 2. Why this matters — concrete and current
In aerospace navigation, Boeing and Airbus flight-management systems use sine and cosine of latitude and longitude differences to compute great-circle routes; every waypoint calculation begins with these ratios applied to the spherical triangle formed by the aircraft, departure airport and destination.

Semiconductor lithography machines at ASML rely on precise angle measurements of laser beams reflected from silicon wafers; the machines convert tiny angular deviations into nanometre-scale corrections using tangent ratios derived from right-triangle approximations of the optical path.

In machine-learning libraries such as PyTorch and TensorFlow, the positional-encoding layer of transformer models applies sine and cosine functions of token indices; the functions are evaluated exactly as right-triangle ratios scaled to the embedding dimension.

Surveying software used by the Indian Space Research Organisation during Chandrayaan landing-site selection computes elevation angles of terrain features from stereo images; each elevation angle is obtained by taking the arctangent of height difference over horizontal baseline extracted from right-triangle geometry.

In fundamental physics, the decomposition of forces on an inclined plane in any Newtonian-mechanics simulation begins with sine and cosine of the incline angle; every physics engine from Unity to OpenRocket uses these ratios to resolve gravity into components.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Right angle and hypotenuse | Defines which side is opposite every acute angle          |
| Similar triangles        | Guarantees that side ratios remain constant for a given angle |
| Labelling opposite/adjacent sides | Prevents swapping ratios when angle changes               |

If any of these three ideas are unclear, pause and review the geometry of right triangles before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the reference angle and label the sides
Fix one acute angle inside the right triangle; call it \(\theta\). The side directly across from \(\theta\) is the opposite side, the side next to \(\theta\) (that is not the hypotenuse) is the adjacent side, and the longest side opposite the right angle is the hypotenuse.  
Example: in a 3-4-5 triangle with \(\theta\) next to the side of length 4, opposite = 3, adjacent = 4, hypotenuse = 5.  
Formal statement: label the sides relative to \(\theta\) only.  
> [!WARNING]  
> If you label sides relative to the other acute angle instead, every ratio will be swapped and the numerical values will be wrong.

### Step 2 — Form the three primary ratios
Divide opposite by hypotenuse to obtain sine, adjacent by hypotenuse to obtain cosine, and opposite by adjacent to obtain tangent.  
Example: \(\sin\theta = 3/5 = 0.6\), \(\cos\theta = 4/5 = 0.8\), \(\tan\theta = 3/4 = 0.75\).  
Formal statement:  
\[
\sin\theta = \frac{\text{opposite}}{\text{hypotenuse}}, \quad
\cos\theta = \frac{\text{adjacent}}{\text{hypotenuse}}, \quad
\tan\theta = \frac{\text{opposite}}{\text{adjacent}}.
\]

### Step 3 — Define the three reciprocal ratios
Cosecant, secant and cotangent are simply the reciprocals of sine, cosine and tangent respectively.  
Example: \(\csc\theta = 5/3\), \(\sec\theta = 5/4\), \(\cot\theta = 4/3\).  
Formal statement:  
\[
\csc\theta = \frac{1}{\sin\theta}, \quad
\sec\theta = \frac{1}{\cos\theta}, \quad
\cot\theta = \frac{1}{\tan\theta}.
\]

### Step 4 — Write the complete set of six ratios for any right triangle
Combine Steps 2 and 3 into one list that covers every possible division of two sides.  
Formal statement (textbook-ready):  
For acute angle \(\theta\) in right triangle ABC with right angle at C,  
\[
\sin\theta = \frac{a}{c},\ 
\cos\theta = \frac{b}{c},\ 
\tan\theta = \frac{a}{b},\ 
\csc\theta = \frac{c}{a},\ 
\sec\theta = \frac{c}{b},\ 
\cot\theta = \frac{b}{a},
\]  
where \(a\) is opposite \(\theta\), \(b\) is adjacent to \(\theta\), and \(c\) is the hypotenuse.

## 5. Worked examples — har step show karo

**Example 1 — Basic 3-4-5 triangle**  
*Given:* Right triangle with sides 3, 4, 5; \(\theta\) opposite the side of length 3.  
*Find:* All six ratios.  
Opposite = 3, adjacent = 4, hypotenuse = 5.  
\[
\sin\theta = \frac{3}{5}, \quad
\cos\theta = \frac{4}{5}, \quad
\tan\theta = \frac{3}{4}.
\]  
Reciprocals:  
\[
\csc\theta = \frac{5}{3}, \quad
\sec\theta = \frac{5}{4}, \quad
\cot\theta = \frac{4}{3}.
\]  
*Why* each division was chosen: the definitions require opposite over hypotenuse for sine, etc.  
**Final answer**  
\(\sin\theta=3/5\), \(\cos\theta=4/5\), \(\tan\theta=3/4\), \(\csc\theta=5/3\), \(\sec\theta=5/4\), \(\cot\theta=4/3\).  
*Reflection:* The numbers are exact fractions because the triangle is scaled; the same ratios appear in any similar triangle.

**Example 2 — 30-60-90 triangle**  
*Given:* Standard 30-60-90 triangle with sides \(1\), \(\sqrt{3}\), \(2\); \(\theta=30^\circ\).  
*Find:* \(\sin 30^\circ\) and \(\cos 30^\circ\).  
Opposite to 30° is 1, hypotenuse is 2.  
\[
\sin 30^\circ = \frac{1}{2}, \quad
\cos 30^\circ = \frac{\sqrt{3}}{2}.
\]  
*Why* we used the known side lengths: they come from bisecting an equilateral triangle.  
**Final answer**  
\(\sin 30^\circ = 1/2\), \(\cos 30^\circ = \sqrt{3}/2\).  
*Reflection:* Memorising these two values lets you obtain the remaining four ratios instantly via reciprocals.

**Example 3 — Find missing side using tangent**  
*Given:* \(\tan\theta = 5/12\), adjacent side = 12.  
*Find:* opposite side and hypotenuse.  
Opposite = \(5\), hypotenuse = \(\sqrt{5^2+12^2}=13\).  
*Why* Pythagoras was applied after finding the opposite side: the hypotenuse must satisfy the right-triangle relation.  
**Final answer**  
Opposite = 5, hypotenuse = 13.  
*Reflection:* Tangent directly supplies the missing side; once two sides exist, the third follows from Pythagoras.

**Example 4 — Evaluate all ratios from a coordinate point**  
*Given:* Point (8, 15) lies on the terminal side of \(\theta\) in quadrant I; hypotenuse = 17.  
*Find:* All six ratios.  
Opposite = 15, adjacent = 8, hypotenuse = 17.  
\[
\sin\theta = 15/17,\ 
\cos\theta = 8/17,\ 
\tan\theta = 15/8,\ 
\csc\theta = 17/15,\ 
\sec\theta = 17/8,\ 
\cot\theta = 8/15.
\]  
*Why* the distance formula gave the hypotenuse: it is the Euclidean length from origin to the point.  
**Final answer**  
\(\sin\theta=15/17\), \(\cos\theta=8/17\), \(\tan\theta=15/8\), \(\csc\theta=17/15\), \(\sec\theta=17/8\), \(\cot\theta=8/15\).  
*Reflection:* Any point in the plane can be turned into a right triangle whose ratios equal the trigonometric values of the angle formed with the positive x-axis.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Labelling opposite side for the wrong angle | Student looks at the other acute angle      | Always mark the reference angle first        |
| Writing sin = adjacent/hypotenuse | Confusing sine with cosine                  | Repeat the definition aloud before writing   |
| Forgetting that cosecant is 1/sin | Treating all six names as independent       | Derive the three reciprocal names every time |
| Using hypotenuse for tangent      | Mixing tangent with sine                    | Remember tangent never uses hypotenuse       |
| Calculator in degree vs radian mode | Default mode mismatch                       | Check mode before every numerical evaluation |
| Assuming ratios change with triangle size | Forgetting similarity                       | Draw two different-sized similar triangles   |
| Swapping secant and cosecant      | Alphabetical confusion                      | Link secant to cosine (both start with “co”) |

## 7. The textbook-precise statement
Let \(\triangle ABC\) be a right triangle with right angle at C and acute angle \(\theta\) at A. Let side \(BC = a\) (opposite \(\theta\)), side \(AC = b\) (adjacent to \(\theta\)), and hypotenuse \(AB = c\). Then the six trigonometric ratios of \(\theta\) are defined by  
\[
\sin\theta = \frac{a}{c},\quad
\cos\theta = \frac{b}{c},\quad
\tan\theta = \frac{a}{b},\quad
\csc\theta = \frac{c}{a},\quad
\sec\theta = \frac{c}{b},\quad
\cot\theta = \frac{b}{a}.
\]  
These definitions presuppose \(a,b,c>0\) and \(0^\circ < \theta < 90^\circ\). (Stewart, *Calculus*, 9e, §1.3)

## 8. Visual — diagram or schematic
```
      C
      |\
      | \   hypotenuse c
      |  \
   b  |   \  A  (angle θ)
      |    \
      |_____\
      B   a
```
- Right angle at C.  
- Side a opposite θ (BC).  
- Side b adjacent to θ (AC).  
- Hypotenuse c (AB).

## 9. The memory technique
**The hook** — Picture a right triangle standing on its hypotenuse like a slide; the angle θ is the slope angle, opposite is the “rise”, adjacent is the “run”. Sine is “rise over slide”, cosine is “run over slide”.

**What to overlearn** — The three primary definitions and the fact that \(\sin^2\theta + \cos^2\theta = 1\) for every acute θ.

**Spaced-repetition schedule** — Review the six definitions after 1 day, again after 3 days, 7 days, 16 days and 35 days.

**First-principles fallback** — Redraw the right triangle, label opposite/adjacent/hypotenuse relative to the chosen angle, then write each ratio as the appropriate division of two sides.

## 10. What this unlocks
Mastery of these ratios lets you move directly into angle measurement, inverse trigonometric functions, trigonometric identities and the solution of oblique triangles.  

- Solving triangles with the Law of Sines and Law of Cosines  
- Graphing periodic functions in pre-calculus  
- Vector resolution in physics and engineering mechanics  
- Fourier analysis and signal processing in electrical engineering  

## 11. Self-check — five questions, no answers
1. In a right triangle with hypotenuse 13 and one leg 5, compute all six ratios for the acute angle opposite the leg of length 5.  
2. If \(\tan\theta = 7/24\), find \(\sin\theta\) and \(\cos\theta\) without finding θ.  
3. A student writes \(\sec\theta = \text{adjacent}/\text{hypotenuse}\). Identify the error and correct it.  
4. Explain why \(\cot(90^\circ - \theta) = \tan\theta\) using only side labels.  
5. A ladder 10 m long leans against a wall making a 60° angle with the ground. Compute the exact height reached on the wall using a single trigonometric ratio.