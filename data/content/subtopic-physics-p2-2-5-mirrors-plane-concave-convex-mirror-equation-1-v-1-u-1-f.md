## What it is
A mirror is a surface that reflects light to form an image. We will analyze three types: plane (flat), concave (curved inward like a cave), and convex (curved outward). The mirror equation is a mathematical formula, $\frac{1}{v} + \frac{1}{u} = \frac{1}{f}$, that relates the object distance ($u$), the image distance ($v$), and the focal length ($f$) for spherical mirrors.

## Why it matters
This topic is the foundation of geometric optics. In aerospace, mirrors are critical for telescopes (like Hubble and James Webb), laser communication systems, and optical navigation sensors. In computer science, the principles of ray tracing, used to render realistic 3D graphics, are a direct computational implementation of the geometric optics you will learn here.

## When to study it
Before proceeding, you must be comfortable with basic Euclidean geometry, specifically the properties of similar triangles and small-angle approximations (i.e., for a small angle $\theta$ in radians, $\sin\theta \approx \tan\theta \approx \theta$). You must also understand the Law of Reflection: the angle of incidence equals the angle of reflection ($\theta_i = \theta_r$). If these concepts are not solid, review them first.

## How to study it (step by step)
1.  **Draw the diagrams.** Start with a large diagram of a concave mirror. Mark the pole (P), the center of curvature (C), and the principal axis. Convince yourself from the law of reflection that a ray parallel to the principal axis reflects through a point halfway between C and P. This is the focal point, F.
2.  **Derive $f = R/2$.** Using your diagram from step 1, use geometry to prove that the focal length $f$ is half the radius of curvature $R$ for rays close to the principal axis (the paraxial approximation).
3.  **Learn the four principal rays.** For any spherical mirror, there are 4 special rays whose paths are easy to predict. Master drawing them for both concave and convex mirrors to locate an image graphically. This builds intuition.
4.  **Derive the mirror equation.** Draw a ray diagram for an object in front of a concave mirror. Use similar triangles to relate the object height, image height, object distance, and image distance to the focal length. This will lead you directly to $\frac{1}{v} + \frac{1}{u} = \frac{1}{f}$.
5.  **Master the sign convention.** The mirror equation is useless without a strict sign convention. Adopt the Cartesian sign convention: the pole of the mirror is the origin $(0,0)$, light travels from left to right. All distances measured in the direction of light are positive; against are negative.
6.  **Solve problems.** Work through 5 problems for concave mirrors and 5 for convex mirrors. For each, first draw the ray diagram to estimate the image location and characteristics (real/virtual, inverted/upright, magnified/diminished), then solve mathematically. Check if your math matches your drawing.

## Key ideas, with intuition
1.  **Focal Point as a "Gathering Point":** A mirror's curvature determines its power to bend light. For a concave mirror, parallel rays (like those from a very distant star) are all bent to converge at a single point, the focal point. For a convex mirror, they are bent to appear as if they are diverging from a single point behind the mirror. The distance from the mirror to this point is the focal length, $f$. It's the most important intrinsic property of a mirror.

2.  **The Law of Reflection Dictates Everything:** The complex behavior of a curved mirror is just the Law of Reflection ($\theta_i = \theta_r$) applied at every point on a curved surface. The normal at any point on a spherical mirror is simply the line passing through that point and the center of curvature, C. The mirror and magnification equations are just the geometric consequences of this simple law.

3.  **One Equation, One Convention, All Cases:** The power of the mirror equation lies in its universality. With a strict sign convention, the single formula below works for concave, convex, and even plane mirrors, and correctly predicts whether the image is real or virtual.
    $$ \frac{1}{\text{image distance}} + \frac{1}{\text{object distance}} = \frac{1}{\text{focal length}} \implies \frac{1}{v} + \frac{1}{u} = \frac{1}{f} $$
    The sign convention is not arbitrary; it's what encodes the geometry into the algebra. **Real is Positive Convention** is a common starting point: real objects ($u$) and real images ($v$) have positive distances. A concave mirror has a positive focal length because it can form a real image. A convex mirror always forms a virtual image, so its focal length is negative.

4.  **Magnification relates sizes and distances:** The ratio of the image height ($h_i$) to the object height ($h_o$) is the magnification, $m$. Geometry shows this is also related to the distances. The negative sign is crucial: it tells us if the image is inverted.
    $$ m = \frac{h_i}{h_o} = -\frac{v}{u} $$
    If $m$ is negative, the image is inverted. If $|m| > 1$, the image is magnified. If $|m| < 1$, the image is diminished.

## Worked example
**Problem:** An object of height 3 cm is placed 30 cm in front of a concave mirror with a radius of curvature of 40 cm. Find the position, nature, and size of the image.

**Step 1: Identify knowns and establish the sign convention.**
The mirror is the origin. Light travels from the object to the mirror (left to right).
-   Object distance, $u = +30$ cm (real object, measured against light direction from a pole at origin, but standard convention takes object distance as positive). Let's stick to the simpler real-is-positive convention for now: real objects have positive $u$.
-   Object height, $h_o = +3$ cm (upright).
-   Radius of curvature, $R = +40$ cm (concave mirror's center is on the real side).
-   The mirror is concave, so its focal length is positive. We calculate it.

**Step 2: Calculate the focal length.**
For a spherical mirror, $f = R/2$.
$$ f = \frac{+40 \text{ cm}}{2} = +20 \text{ cm} $$

**Step 3: Apply the mirror equation to find the image distance, $v$.**
$$ \frac{1}{v} + \frac{1}{u} = \frac{1}{f} $$
$$ \frac{1}{v} + \frac{1}{30} = \frac{1}{20} $$
$$ \frac{1}{v} = \frac{1}{20} - \frac{1}{30} $$
To subtract the fractions, find a common denominator, which is 60.
$$ \frac{1}{v} = \frac{3}{60} - \frac{2}{60} = \frac{1}{60} $$
$$ v = +60 \text{ cm} $$

**Step 4: Analyze the result for $v$.**
Since $v$ is positive, the image is formed on the same side of the mirror as the object. This means light rays actually converge there. Therefore, the image is **real**. It is located **60 cm** in front of the mirror.

**Step 5: Apply the magnification equation to find the image size and nature.**
$$ m = -\frac{v}{u} = -\frac{+60}{+30} = -2 $$
The magnification is $m = -2$.
-   The negative sign indicates the image is **inverted**.
-   The magnitude $|m|=2$ indicates the image is **twice the size** of the object.

Calculate the image height, $h_i$:
$$ m = \frac{h_i}{h_o} \implies h_i = m \cdot h_o = (-2) \cdot (3 \text{ cm}) = -6 \text{ cm} $$
The height is -6 cm. The negative sign confirms it is inverted.

**Reflection:**
-   Step 1 correctly translated the physical setup into signed variables. This is the most critical step.
-   Step 2 used the fundamental relationship between $R$ and $f$.
-   Step 3 was pure algebraic manipulation of the mirror equation.
-   Steps 4 and 5 interpreted the signs of the results ($v$ and $m$) to describe the physical characteristics of the image, closing the loop from math back to physics. The positive $v$ meant a real image, and the negative $m$ meant an inverted image.

## Diagrams
A ray diagram for a concave mirror forming a real image. O is the object, I is the image. C is the center of curvature, F is the focal point, P is the pole.

```text
      ^
      | h_o
      O
      | A . . . . . . . . . . . . . . . . . . . . . B
      |  \ .                                     . |
      |   \  .                                  .  |
      |    \   .                               .   |
<---- | ----\----F-----------------C-----------P----)---- Principal Axis
      |      \    .                          .     |
      |       \     .                      .       |
      |        \      .                  .         |
      |         \       .              .           | h_i
      B' . . . . . \ . . . . . . . . .I            v
                     \                 |
                      V

<---------- u ---------->
<---------------- v ------------------>
<---------- f ---------->
<---------------- R ------------------>
```
**Description of the rays (ASCII limitations):**
1.  A ray from the top of the object (A) travels parallel to the principal axis, hits the mirror at B, and reflects through the focal point F, passing through the tip of the image I.
2.  A ray from the top of the object (A) passes through the focal point F, hits the mirror at B', and reflects parallel to the principal axis, also passing through I.
3.  A ray from A passing through C would hit the mirror perpendicularly and reflect back on itself, also passing through I.

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Think of the mirror equation as a relationship between three rates. $\frac{1}{u}$ is the curvature of the wavefronts arriving from the object. $\frac{1}{f}$ is the fixed curvature the mirror *adds*. $\frac{1}{v}$ is the final curvature of the wavefronts leaving the mirror, which determines where they focus to form the image. **Object's curvature + Mirror's curvature = Image's curvature.** For signs, remember: "Concave is Positive" (like a cave you can go into, it's a real place). Convex mirrors are therefore negative. A "Positive Image" is a "Real Image".

2.  **Must Overlearn:**
    -   Mirror Equation: $$ \frac{1}{v} + \frac{1}{u} = \frac{1}{f} $$
    -   Magnification: $$ m = -\frac{v}{u} $$
    -   Focal Length: $$ f = \frac{R}{2} $$

3.  **Spaced Repetition Schedule:** Review your derivations and solve one problem on Day 1, Day 3, Day 7, Day 16, and Day 35.

4.  **First Principles Pathway:** If you forget the mirror equation, you can always re-derive it.
    -   Draw a large, clear diagram of a concave mirror with an object.
    -   Draw a ray from the top of the object parallel to the axis, reflecting through F.
    -   Draw a second ray hitting the pole P and reflecting.
    -   Identify two pairs of similar triangles in your diagram. One pair will involve the object/image heights and distances $u,v$. The other will involve the focal length.
    -   Use the property of similar triangles (ratio of corresponding sides is equal) and the paraxial approximation ($\tan\theta \approx \theta$) to derive the relationship.

## Common mistakes
1.  **Sign Convention Errors:** The most common failure. Applying a sign incorrectly to $u$, $v$, $f$, or $R$. For example, using a positive $f$ for a convex mirror. Always write down your sign convention and known variables before starting.
2.  **Mixing up $v$ and $u$:** In a hurry, it's easy to swap the values for object distance ($u$) and image distance ($v$) in the formula. Always label them clearly.
3.  **Confusing Virtual and Real:** A real image is formed where light rays *actually converge*. You can place a screen there and see the image. A virtual image is formed where rays only *appear to diverge from*. You cannot project it onto a screen. A positive $v$ means real, a negative $v$ means virtual.
4.  **Forgetting Magnification is Negative for Inverted Images:** Students often calculate the magnitude of $m$ correctly but forget that the negative sign in $m = -v/u$ means the image is inverted relative to the object.

## Self-check
1.  You stand 2 meters in front of a large plane mirror. Where is your image located, what is its magnification, and what is the mirror's focal length?
2.  An object is placed at the center of curvature of a concave mirror. Use the mirror equation to determine the location and magnification of the image. Does your result match what a ray diagram would predict?
3.  A convex mirror has a focal length of -15 cm. An object is placed 10 cm in front of it. Where is the image, and is it real or virtual? Is it upright or inverted?