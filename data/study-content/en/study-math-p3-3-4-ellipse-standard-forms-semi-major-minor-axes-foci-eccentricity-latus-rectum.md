## 1. The one-sentence answer
**An ellipse is the set of all points in the plane whose distances to two fixed points (the foci) sum to a constant greater than the distance between the foci.**

An ellipse arises when a plane intersects a right circular cone at an angle shallower than the cone’s side but steeper than horizontal. The two foci are the only points that satisfy a reflection property: a ray leaving one focus reflects off the curve and reaches the other focus. This single geometric definition produces every algebraic and metric feature that follows.

The constant sum of distances equals twice the semi-major axis length. The distance between foci determines how stretched the curve becomes. All other quantities—semi-minor axis, eccentricity, and latus rectum—follow directly from these two lengths.

> [!NOTE]
> The defining sum of distances is fixed; changing the foci separation while keeping that sum constant simply stretches or compresses the same ellipse.

## 2. Why this matters — concrete and current
NASA’s Parker Solar Probe uses an elliptical transfer orbit whose perihelion lies inside Mercury’s orbit; the precise eccentricity determines the radiation dose and thermal load on each pass.

Semiconductor lithography machines from ASML employ elliptical mirrors to focus extreme-ultraviolet light; the two foci coincide with the plasma source and the reticle, and mirror eccentricity must be held below 10^{-6} to maintain nanometer overlay.

In gravitational-wave astronomy, LIGO data analysts fit elliptical orbits to binary black-hole inspirals; the eccentricity parameter distinguishes primordial binaries from those formed by dynamical capture.

Planetary ephemerides maintained by JPL’s Solar System Dynamics group rely on Keplerian elliptical elements; even tiny eccentricity errors accumulate into kilometer-scale position uncertainty after a few centuries.

Medical ultrasound transducers exploit the reflection property of elliptical cavities to concentrate acoustic energy at a second focus inside tissue, enabling targeted lithotripsy without mechanical movement of the source.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Distance formula         | Computes the constant sum that defines the ellipse        |
| Pythagorean theorem      | Relates the semi-axes to the linear eccentricity          |
| Completing the square    | Converts a general quadratic into standard ellipse form   |
| Parametric equations     | Supplies the cleanest way to plot or differentiate        |

## 4. Building the idea — from intuition to formalism

### Step 1 — The constant-sum definition
Place two pins at (−c,0) and (c,0). Stretch a string of length 2a > 2c between them and trace the curve with a pencil. Every point P on the curve satisfies PF₁ + PF₂ = 2a.

A concrete example: c = 3, 2a = 10. The foci are 6 units apart; the string length is 10. Any point on the resulting oval is 10 units from the two foci combined.

Formally,
\[
PF_1 + PF_2 = 2a, \quad a > c.
\]

> [!WARNING]
> If a equals c the string is taut between the foci and the “curve” collapses to the line segment joining them; the ellipse ceases to exist.

### Step 2 — Deriving the standard equation
Let P = (x,y). The distance sum yields
\[
\sqrt{(x+c)^2 + y^2} + \sqrt{(x-c)^2 + y^2} = 2a.
\]
Isolate one radical, square both sides, simplify, isolate the remaining radical, and square again. After cancellation the equation reduces to
\[
\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1,
\]
where b² = a
² − c².

> [!WARNING]
> Algebraic sign errors during the second squaring step commonly produce the hyperbola equation instead; always verify that the final constant term is positive and the coefficients of x² and y² have the same sign.

### Step 3 — Identifying the semi-axes
In the equation above, a is the semi-major axis (half the longer diameter) and b is the semi-minor axis (half the shorter diameter). The major axis lies along the line joining the foci.

### Step 4 — Locating the foci
The foci lie on the major axis at distance c = √(a² − b
²) from the center. For the horizontal major-axis case they are (±c,0).

### Step 5 — Eccentricity
Define
\[
e = \frac{c}{a}, \quad 0 \le e < 1.
\]
Eccentricity measures elongation: e = 0 gives a circle; values near 1 give very flat ellipses.

### Step 6 — Latus rectum
The chord through either focus perpendicular to the major axis has length 2b²/a. This segment is called the latus rectum; its length appears in orbital mechanics as a direct measure of angular momentum.

### Step 7 — Textbook standard forms
Horizontal major axis:
\[
\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1, \quad a > b > 0.
\]
Vertical major axis:
\[
\frac{x^2}{b^2} + \frac{y^2}{a^2} = 1, \quad a > b > 0.
\]
Foci, eccentricity, and latus rectum adjust symmetrically.

## 5. Worked examples — every step shown

**Example 1 — Identify a and b from equation**
- *Given:* \(\frac{x^2}{25} + \frac{y^2}{16} = 1\)
- *Find:* semi-major and semi-minor axes.

Divide both denominators by their square roots: a² = 25 ⇒ a = 5; b
² = 16 ⇒ b = 4.  
*Why:* The larger denominator sits under the variable whose axis is major.  
**5 and 4**

*Reflection:* The numbers appear directly once the equation is written with 1 on the right-hand side; no further algebra is required.

**Example 2 — Locate the foci**
- *Given:* \(\frac{x^2}{9} + \frac{y^2}{4} = 1\)
- *Find:* coordinates of the foci.

a² = 9, b² = 4 ⇒ c² = 9 − 4 = 5 ⇒ c = √5.  
Foci lie at (±√5, 0).  
*Why:* Pythagorean relation c² = a² − b² follows from the distance definition after the derivation in Step 2.  
**(±√5, 0)**

*Reflection:* Always confirm a > b before subtracting; swapping them yields an imaginary c.

**Example 3 — Compute eccentricity and latus rectum**
- *Given:* ellipse with a = 5, b = 3.
- *Find:* e and length of latus rectum.

c = √(25 − 9) = 4.  
e = 4/5 = 0.8.  
Latus rectum length = 2·9/5 = 18/5.  
*Why:* Definition e = c/a; latus-rectum formula 2b
²/a is obtained by substituting x = ±c into the ellipse equation and solving for y, then doubling.  
**e = 0.8, length = 18/5**

*Reflection:* Both quantities depend only on a and b; once these are known, no coordinate geometry is needed.

**Example 4 — Convert general equation to standard form**
- *Given:* 9x² + 4y² = 36.
- *Find:* standard form, a, b, foci.

Divide by 36:
\[
\frac{x^2}{4} + \frac{y^2}{9} = 1.
\]
a² = 9, b² = 4 (vertical major axis).  
c = √(9 − 4) = √5.  
Foci at (0, ±√5).  
*Why:* Completing the square is unnecessary here because no linear terms appear; division normalizes the constant to 1.  
**Standard form \(\frac{x^2}{4} + \frac{y^2}{9} = 1\), foci (0, ±√5)**

*Reflection:* Orientation is revealed by which denominator is larger after normalization.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Swapping a and b                  | Forgetting to compare denominators after normalization | Always assign a to the larger semi-axis length       |
| Using c² = a² + b
²                | Confusing ellipse with hyperbola                    | Memorize the sign: ellipse subtracts, hyperbola adds |
| Reporting e ≥ 1                   | Treating any oval as an ellipse                     | Enforce a > c before computing e                     |
| Forgetting the factor 2 in latus rectum | Thinking “length through focus” is just b²/a        | Derive the chord length once and keep the 2          |
| Placing foci on the minor axis    | Misidentifying major-axis direction                 | Sketch the ellipse or check which a is larger        |
| Using Cartesian distance sum without isolating radicals | Algebraic mess                                     | Follow the two-square sequence exactly once          |
| Assuming the standard form allows negative b | Treating b as a coordinate rather than length       | Enforce b > 0 by definition                          |

## 7. The textbook-precise statement
An ellipse is the locus of points P such that PF₁ + PF₂ = 2a where F₁, F₂ are fixed foci separated by distance 2c < 2a. In standard position the Cartesian equation is
\[
\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1 \quad (a > b > 0),
\]
with foci at (±c, 0), c = √(a² − b²), eccentricity e = c/a, and latus rectum of length 2b²/a. (Stewart, *Calculus*, 9e, §10.5, Definition and Theorem 3.)

## 8. Visual — diagram or schematic
```text
          y
          ^
          |      b
          |     /\
          |    /  \
      ----+---*----*---> x
          |  /      \
          | /   a    \
          |/          \
     (-c,0)*           * (c,0)   foci
          |\          /
          | \        /
          |  \      /
          |   \    /
          |    \  /
          |     \/
          |      -b
```
Horizontal major axis of length 2a, vertical minor axis of length 2b, foci at distance c from center.

## 9. The memory technique
1. **The hook** — Picture a racetrack with two ice-cream cones (the foci) inside; the string looped around both cones and pulled taut by a pencil produces the oval path.
2. **What to overlearn** — c² = a
² − b², e = c/a < 1, latus rectum = 2b²/a.
3. **Spaced-repetition schedule** — Review the three relations at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Return to the string definition, isolate one square root, square twice, and recover c² = a² − b² in under two minutes.

## 10. What this unlocks
Mastery of the ellipse supplies the geometric language for Kepler’s first law, the reflection property used in optics, and the quadratic-form classification of conics.

- Next: hyperbolas and the unified focus-directrix definition of all conics.
- Polar equation of conics with focus at the origin.
- Parametric speed and arc-length integrals on ellipses.
- Affine transformations that map circles to ellipses.

## 11. Self-check — five questions, no answers
1. Write the standard equation of the ellipse whose foci are at (−4,0) and (4,0) and whose major-axis length is 10.
2. An ellipse has semi-minor axis 6 and eccentricity 0.8. Compute the semi-major axis and the latus-rectum length.
3. Convert 25x² + 9y² − 225 = 0 to standard form and state the coordinates of the foci.
4. Explain why the string construction cannot produce an ellipse when the constant sum equals the distance between the foci.
5. A whispering gallery is modeled by the ellipse \(\frac{x^2}{36} + \frac{y^2}{16} = 1\). Where must two people stand so that a whisper at one point is heard clearly at the other?