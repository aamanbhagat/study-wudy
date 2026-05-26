## 1. The one-sentence answer
**A vector is a quantity that possesses both magnitude and direction and is represented by an arrow whose length encodes magnitude and whose orientation encodes direction; its components are the orthogonal projections of that arrow onto chosen coordinate axes.**

Any physical quantity that changes when you rotate the coordinate system—displacement, velocity, force—must be treated as a vector. The arrow picture makes addition and scaling immediate: place arrows tail-to-head and the resultant closes the polygon. Once the arrow is drawn, its length is extracted by the Pythagorean theorem and its direction by an inverse tangent; the same arrow is then decomposed into pieces parallel to each axis so that every subsequent calculation can be performed with ordinary numbers.

The decomposition step is decisive. Without it, three-dimensional problems remain geometrically tangled; with it, every vector equation splits into independent scalar equations, one per axis. This separation is what lets engineers and physicists turn the geometry of motion into arithmetic.

> [!NOTE]
> The components are not auxiliary numbers; they are the vector itself expressed in a chosen basis. Change the basis and the numbers change, yet the arrow in space remains unchanged.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 guidance computer resolves the thrust vector of each Merlin engine into body-frame components at 50 Hz; a 0.1° misalignment in any component produces a torque that the nitrogen thrusters must cancel within milliseconds.

In semiconductor lithography, ASML’s extreme-ultraviolet scanners steer a 250 W plasma source by treating the photon momentum flux as a vector whose components are measured on quadrant photodiodes; sub-nanometer overlay tolerances collapse if any single component drifts by more than 10 µrad.

LIGO’s gravitational-wave strain is extracted by projecting the differential arm-length change onto the two orthogonal interferometer arms; the resulting vector signal is then decomposed into plus and cross polarization components that encode the source’s sky location.

The Parker Solar Probe’s FIELDS instrument records the interplanetary magnetic field as three orthogonal components at 293 Hz; scientists reconstruct the field-line curvature from those components to decide when the spacecraft has crossed the Alfvén critical surface.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Real-number arithmetic   | Component values are ordinary signed numbers.             |
| Right-triangle geometry  | Magnitude and direction are recovered via Pythagoras and arctangent. |
| Cartesian coordinate axes| Components are defined only after axes have been chosen.  |

## 4. Building the idea — from intuition to formalism

### Step 1 — Distinguish quantities that point from those that do not
Some measured quantities remain unchanged under rotation of your laboratory; others reverse sign or mix their values. The former are scalars, the latter vectors.  
Example: mass is 5 kg no matter how you turn the scale. Displacement from (0,0) to (3,4) changes both its measured east-west and north-south pieces when you rotate the map.  
Formally, a scalar \(s\) satisfies \(s' = s\) under any orthogonal transformation, while a vector \(\mathbf{v}\) satisfies \(\mathbf{v}' = R\mathbf{v}\) for rotation matrix \(R\).

> [!WARNING]
> Treating a vector component as a scalar that happens to have a sign leads to sign errors the moment the coordinate system is rotated.

### Step 2 — Represent the vector by a directed line segment
Draw an arrow whose length is proportional to magnitude and whose arrowhead indicates sense.  
Example: a 5 m displacement due east is an arrow five units long pointing right.  
The geometric object is independent of any coordinate grid drawn on the paper.

### Step 3 — Extract magnitude
The length of the arrow is the magnitude. In components \((v_x, v_y)\) it is recovered by the Euclidean norm  
\[
|\mathbf{v}| = \sqrt{v_x^2 + v_y^2}.
\]

### Step 4 — Extract direction
The angle \(\theta\) that the arrow makes with the positive x-axis satisfies  
\[
\theta = \tan^{-1}\left(\frac{v_y}{v_x}\right)
\]  
with quadrant correction via atan2.

### Step 5 — Resolve into Cartesian components
Project the arrow onto each axis. The projections are the signed lengths  
\[
v_x = |\mathbf{v}|\cos\theta, \quad v_y = |\mathbf{v}|\sin\theta.
\]

### Step 6 — Reconstruct from components
Given any pair \((v_x, v_y)\), the original arrow is recovered by the linear combination  
\[
\mathbf{v} = v_x\hat{i} + v_y\hat{j},
\]  
where \(\hat{i}\) and \(\hat{j}\) are unit vectors along the axes. This is the textbook definition of a vector in a Cartesian basis.

## 5. Worked examples — every step shown

**Example 1 — Simple 2-D displacement**  
*Given:* A rover moves 3 m east then 4 m north.  
*Find:* magnitude and direction of net displacement.  

Draw the two legs tail-to-head; resultant arrow reaches (3,4).  
\[
|\mathbf{r}| = \sqrt{3^2 + 4^2} = 5~\text{m}.
\]  
*Why:* Pythagorean theorem applied to the right triangle formed by components.  
\[
\theta = \tan^{-1}(4/3) \approx 53.13^\circ~\text{north of east}.
\]  
*Why:* definition of tangent in the same triangle.  
**5 m at 53.13° north of east**

*Reflection:* The numbers 3-4-5 are chosen so arithmetic is trivial; the same logic applies when lengths are measured.

**Example 2 — Force vector from angle**  
*Given:* A 120 N force acts at 35° above the +x axis.  
*Find:* x and y components.  

\[
F_x = 120\cos 35^\circ = 98.3~\text{N}, \quad F_y = 120\sin 35^\circ = 68.8~\text{N}.
\]  
*Why:* adjacent side over hypotenuse gives cosine projection; opposite side gives sine.  
**\(F_x = 98.3\) N, \(F_y = 68.8\) N**

*Reflection:* Sign of each component is fixed once the quadrant of the angle is known.

**Example 3 — Three-dimensional velocity**  
*Given:* Velocity components \(v_x = 2\), \(v_y = -3\), \(v_z = 6\) m/s.  
*Find:* speed and unit vector.  

Speed  
\[
v = \sqrt{2^2 + (-3)^2 + 6^2} = 7~\text{m/s}.
\]  
*Why:* Euclidean norm extended to three dimensions.  
Unit vector  
\[
\hat{v} = \frac{2}{7}\hat{i} - \frac{3}{7}\hat{j} + \frac{6}{7}\hat{k}.
\]  
*Why:* divide each component by the magnitude.  
**Speed = 7 m/s; \(\hat{v} = (2/7, -3/7, 6/7)\)**

*Reflection:* Normalization is required whenever only direction, not magnitude, matters.

**Example 4 — Vector addition by components**  
*Given:* \(\mathbf{A} = (4,1)\), \(\mathbf{B} = (-2,5)\).  
*Find:* resultant magnitude and direction.  

Add component-wise:  
\[
R_x = 4 + (-2) = 2, \quad R_y = 1 + 5 = 6.
\]  
*Why:* vector addition is defined component-wise in a common basis.  
Magnitude  
\[
|R| = \sqrt{2^2 + 6^2} = \sqrt{40} \approx 6.325.
\]  
Angle  
\[
\theta = \tan^{-1}(6/2) = 71.57^\circ.
\]  
**Resultant magnitude 6.325 at 71.57°**

*Reflection:* Component-wise addition replaces geometric construction and scales to any number of vectors.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Forgetting quadrant correction    | Calculator atan returns only −90° to 90°    | Always use atan2(y,x) or inspect signs of both components |
| Treating components as independent scalars | Components change together under rotation   | Recompute magnitude after any coordinate change      |
| Using degrees instead of radians in formulas | Most math libraries expect radians          | Convert explicitly or set calculator mode            |
| Reversing sine and cosine         | Confusion between adjacent/opposite sides   | Draw the angle and label adjacent side first         |
| Adding magnitudes instead of components | Intuition from scalar arithmetic            | Never add lengths unless vectors are collinear       |
| Omitting the unit-vector basis    | Notation \(\mathbf{v} = (v_x,v_y)\) hides basis | Write \(\mathbf{v} = v_x\hat{i} + v_y\hat{j}\) explicitly |
| Assuming components are always positive | Positive lengths mistaken for signed projections | Remember each component carries its own sign         |

## 7. The textbook-precise statement
A vector \(\mathbf{v}\) in a three-dimensional Cartesian frame is an ordered triple of real numbers \((v_x, v_y, v_z)\) relative to an orthonormal right-handed basis \(\{\hat{i},\hat{j},\hat{k}\}\), such that  
\[
\mathbf{v} = v_x\hat{i} + v_y\hat{j} + v_z\hat{k}
\]  
and the magnitude is the Euclidean norm  
\[
|\mathbf{v}| = \sqrt{v_x^2 + v_y^2 + v_z^2}.
\]  
Direction is the equivalence class of all positive scalar multiples of \(\mathbf{v}\). (See Goldstein, Poole & Safko, *Classical Mechanics*, 3e, §1.1.)

## 8. Visual — diagram or schematic
```text
          y
          ^
          |
      (v_x,v_y) --> arrow
         /|
        / |  length = |v|
       /  |
      /   |
     /    |
    +----------> x
   origin
```
The arrow starts at the origin, ends at point \((v_x, v_y)\). Horizontal leg is exactly \(v_x\), vertical leg exactly \(v_y\). Hypotenuse length is recovered by Pythagoras.

## 9. The memory technique

1. **The hook** — Picture an arrow pinned to a map; its shadow on the east-west fence is \(v_x\), on the north-south fence is \(v_y\); the arrow itself never changes when you repaint the fences.
2. **What to overlearn** — \(|\mathbf{v}| = \sqrt{v_x^2 + v_y^2}\), \(\mathbf{v} = v_x\hat{i} + v_y\hat{j}\), component addition is performed axis by axis.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Redraw the arrow, drop perpendiculars to each axis, read off the intercepts, then apply Pythagoras.

## 10. What this unlocks
Component decomposition turns every vector equation into three independent scalar equations, enabling the entire machinery of one-dimensional kinematics to be applied along each axis.  

- Projectile motion (next subtopic)  
- Newton’s second law in three dimensions  
- Work and line integrals  
- Torque and angular momentum cross products  

## 11. Self-check — five questions, no answers
1. A vector has components (3, −4). What is its magnitude?  
2. Convert the vector of magnitude 10 at 120° into Cartesian components.  
3. Two forces \(\mathbf{F}_1 = (2,0,0)\) N and \(\mathbf{F}_2 = (0,3,4)\) N act at one point. Find the magnitude of their resultant.  
4. Why does rotating the coordinate axes change the numerical values of the components while leaving the magnitude unchanged?  
5. A student adds the magnitudes of two vectors to obtain the resultant magnitude. Under what single geometric condition is this procedure correct?