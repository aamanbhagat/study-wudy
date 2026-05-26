## 1. The one-sentence answer
**Inverse trigonometric functions recover the unique angle (within a restricted principal range) whose trigonometric value is given.**

The ordinary sine, cosine and tangent functions map angles to numbers but are not one-to-one over all real numbers, so they possess no true inverses. Restricting their domains to intervals on which they become one-to-one produces three new functions—arcsin, arccos and arctan—each of which accepts a real number and returns an angle measured in radians. These functions are defined precisely so that their compositions with the original trigonometric functions recover the identity on the restricted domains.

The graphs of the inverse functions are therefore reflections of the restricted trigonometric graphs across the line y = x. Their domains are the closed intervals [−1,1] for arcsin and arccos and the entire real line for arctan; their ranges are the closed intervals [−π/2,π/2], [0,π] and (−π/2,π/2) respectively.

> [!NOTE]
> The ranges are chosen once and for all by convention; any other choice would break the fundamental identity sin(arcsin x) = x for x ∈ [−1,1].

## 2. Why this matters — concrete and current
In satellite attitude control, engineers at SpaceX compute the required rotation angles from measured direction cosines by applying arccos to the dot product of two unit vectors; the resulting principal value lies in [0,π] and is fed directly into quaternion updates.

In semiconductor lithography, ASML’s alignment systems use arctan to convert measured intensity ratios from phase-shift masks into sub-nanometer overlay corrections; the continuous range (−π/2,π/2) matches the small-angle regime of the optical model.

In robotics, Boston Dynamics’ Atlas humanoid obtains joint angles from end-effector positions via arcsin applied to normalized components of the forward-kinematics Jacobian; the range [−π/2,π/2] prevents gimbal-lock singularities during real-time trajectory planning.

In machine-learning libraries, PyTorch’s atan2 implementation (built on arctan) converts Cartesian gradients into polar angles for rotation-equivariant networks; the two-argument form supplies the correct quadrant automatically.

In fundamental physics, the Planck collaboration extracts the angular scale of acoustic peaks in the cosmic microwave background by inverting the spherical-harmonic relation with arccos, mapping multipole moments ℓ back to angular separations on the sky.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| One-to-one functions     | Only injective functions possess inverses on their domains |
| Domain and range         | The new functions inherit restricted domains from the originals and produce restricted ranges of angles |
| Graphs of sin, cos, tan  | Reflection across y = x produces the inverse graphs       |
| Interval notation        | Precise description of domains [−1,1] and ranges [−π/2,π/2] etc. |

## 4. Building the idea — from intuition to formalism

### Step 1 — The sine function is not invertible on the full real line
Sine repeats every 2π, so many angles share the same sine value; no single-valued inverse exists without restriction.  
Example: sin(π/6) = sin(5π/6) = 1/2, yet π/6 ≠ 5π/6.  
Formally, the equation y = sin θ does not define θ as a function of y when θ ranges over all reals.  
> [!WARNING] Treating every solution of sin θ = x as “the” inverse produces contradictory values and breaks algebraic identities.

### Step 2 — Restrict the domain of sine to [−π/2,π/2]
On this closed interval sine is continuous and strictly increasing from −1 to 1, hence bijective onto [−1,1].  
Example: the restricted sine maps −π/2 to −1, 0 to 0 and π/2 to 1, each value attained exactly once.  
Formally, let f : [−π/2,π/2] → [−1,1] be f(θ) = sin θ. Then f is bijective.  
> [!WARNING] Choosing any other interval of length π (for instance [0,π]) yields a different but equally valid inverse; the community standard is [−π/2,π/2].

### Step 3 — Define arcsin via the inverse-function relation
The inverse function arcsin : [−1,1] → [−π/2,π/2] satisfies both sin(arcsin x) = x and arcsin(sin θ) = θ whenever θ lies in [−π/2,π/2].  
Example: arcsin(1/2) = π/6 because sin(π/6) = 1/2 and π/6 ∈ [−π/2,π/2].  
Formally,  
$$ \arcsin x \quad\text{is the unique }\theta\in[-\pi/2,\pi/2]\text{ such that }\sin\theta=x. $$  
> [!WARNING] The second identity arcsin(sin θ) = θ fails outside the restricted interval; students who omit the domain check obtain incorrect simplifications.

### Step 4 — Repeat the construction for cosine on [0,π]
Cosine is continuous and strictly decreasing from 1 to −1 on [0,π], hence bijective onto [−1,1].  
Example: arccos(1/2) = π/3.  
Formally,  
$$ \arccos x \quad\text{is the unique }\theta\in[0,\pi]\text{ such that }\cos\theta=x. $$  
> [!WARNING] The range [0,π] forces arccos(−x) = π − arccos(x), a relation that is frequently misremembered.

### Step 5 — Define arctan on (−∞,∞) with range (−π/2,π/2)
Tangent maps (−π/2,π/2) bijectively onto ℝ.  
Example: arctan(1) = π/4.  
Formally,  
$$ \arctan x \quad\text{is the unique }\theta\in(-\pi/2,\pi/2)\text{ such that }\tan\theta=x. $$  
> [!WARNING] The open interval excludes the vertical asymptotes; writing arctan(∞) = π/2 is an abuse of notation that conceals the fact that π/2 is never attained.

### Step 6 — Obtain the graphs by reflection
Each inverse graph is the mirror image across y = x of the corresponding restricted trigonometric graph.  
The resulting curves are strictly increasing, odd (except arccos), and possess horizontal asymptotes for arctan.

### Step 7 — State the complete domain–range table
| Function | Domain     | Range          |
|----------|------------|----------------|
| arcsin   | [−1,1]     | [−π/2,π/2]     |
| arccos   | [−1,1]     | [0,π]          |
| arctan   | ℝ          | (−π/2,π/2)     |

## 5. Worked examples — every step shown

**Example 1 — Simple evaluation**  
*Given:* x = √3/2.  
*Find:* arcsin(√3/2).  
Step 1: Recall arcsin returns an angle in [−π/2,π/2] whose sine is √3/2.  
*Why:* Definition of arcsin.  
Step 2: The reference angle π/3 satisfies sin(π/3) = √3/2 and lies inside the interval.  
*Why:* 30-60-90 triangle.  
**π/3**

*Reflection:* The value is positive because the range is symmetric about zero and the input is positive.

**Example 2 — Negative input**  
*Given:* x = −1/2.  
*Find:* arccos(−1/2).  
Step 1: arccos returns θ ∈ [0,π] with cos θ = −1/2.  
*Why:* Range of arccos.  
Step 2: The angle 2π/3 satisfies the equation and lies in [0,π].  
*Why:* Reference angle π/3 in second quadrant.  
**2π/3**

*Reflection:* arccos always yields a non-negative result, unlike arcsin.

**Example 3 — Composition identity check**  
*Given:* θ = 5π/6.  
*Find:* arcsin(sin(5π/6)).  
Step 1: sin(5π/6) = 1/2.  
*Why:* Sine of second-quadrant angle.  
Step 2: arcsin(1/2) = π/6 because 5π/6 ∉ [−π/2,π/2].  
*Why:* Range restriction forces the principal value.  
**π/6**

*Reflection:* The identity arcsin(sin θ) = θ holds only inside the principal interval.

**Example 4 — Equation solving**  
*Given:* sin φ = 0.8, φ ∈ [0,2π].  
*Find:* all solutions.  
Step 1: φ₁ = arcsin(0.8) ≈ 0.9273 rad.  
*Why:* Definition supplies one solution inside [−π/2,π/2].  
Step 2: Second solution in [0,π] is φ₂ = π − φ₁ ≈ 2.2143 rad.  
*Why:* Sine is positive in first and second quadrants.  
Step 3: No further solutions appear in [π,2π] because sine is negative there.  
*Why:* Sign check against the unit circle.  
**φ₁ ≈ 0.9273, φ₂ ≈ 2.2143**

*Reflection:* Always generate the second solution via the supplementary-angle identity before checking periodicity.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| arcsin(sin(5π/6)) = 5π/6          | Forgetting range restriction                        | Always verify θ lies inside [−π/2,π/2]               |
| arccos(−x) = −arccos(x)           | Confusing with odd-function property of arcsin      | Use identity arccos(−x) = π − arccos(x)              |
| Writing arctan(∞) = π/2           | Treating infinity as a number in the range          | State the horizontal asymptote explicitly            |
| Assuming arcsin x + arccos x = π/2 for all x | Over-generalising the identity valid on [−1,1] | Verify numerically outside domain                    |
| Using degrees in calculator output| Calculator mode mismatch                            | Set calculator to radians before any inverse trig call |
| Plotting arctan with closed endpoints | Misreading open interval (−π/2,π/2)               | Draw open circles at the asymptotes                  |
| Solving tan θ = 1 with θ = 5π/4   | Ignoring principal range of arctan                  | Reduce modulo π only after adding the principal value |

## 7. The textbook-precise statement
Let f : [−π/2,π/2] → [−1,1] be given by f(θ) = sin θ. Then f is bijective and its inverse function, denoted arcsin, satisfies  
$$ \arcsin : [-1,1] \to [-\pi/2,\pi/2],\qquad \sin(\arcsin x)=x,\quad \arcsin(\sin\theta)=\theta\text{ for }\theta\in[-\pi/2,\pi/2]. $$  
Analogous statements hold for arccos on [0,π] and arctan on (−π/2,π/2). (Stewart, *Calculus*, 9e, §1.5 and §3.4.)

## 8. Visual — diagram or schematic

```text
y
↑
π/2 ┼─────────────────╮
    │                  ╲
    │                   ╲   y = arcsin x
    │                    ╲
 0  ┼───────────●─────────●───────────→ x
    │          /         /           [-1,1]
    │         /         /
-π/2 ┼───────╯         /
    └───────────────────────────────
         -1          0          1
```
The curve is the reflection across y = x of the restricted sine wave on [−π/2,π/2]. Horizontal asymptotes of arctan lie at y = ±π/2 (not shown).

## 9. The memory technique

1. **The hook** — Picture a bow (arc) shooting an arrow whose sine is the vertical rise; the angle the arrow makes with the horizontal is arcsin.  
2. **What to overlearn** — Domain–range table; the three identities sin(arcsin x) = x, cos(arccos x) = x, tan(arctan x) = x; the supplementary relation arccos(−x) = π − arccos(x).  
3. **Spaced-repetition schedule** — Review table and identities after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the range by asking: “On which interval is sine strictly increasing from −1 to 1?”

## 10. What this unlocks
Mastery of these principal values and graphs is the gateway to integration of rational functions of sine and cosine, to polar-coordinate calculus, and to the complex logarithm via the formula Arg(z) = arctan(Im z / Re z) (adjusted for quadrant).

- Trigonometric substitution in integrals  
- Polar and spherical coordinate transformations  
- Argument of a complex number and branch cuts  
- Linear fractional transformations in the extended complex plane  
- Rotation matrices and Euler angles in three-dimensional graphics

## 11. Self-check — five questions, no answers
1. Evaluate arcsin(−√2/2) + arccos(−√2/2) without a calculator.  
2. For which real numbers x does the equation arcsin(x) + arccos(x) = π/2 hold? Prove your claim.  
3. Sketch, on the same axes, y = arctan x and y = arctan(x + 1) − π/4; state the horizontal shift and any change in asymptotes.  
4. Solve tan θ = −1 for θ ∈ (−π,π] and identify which solution equals arctan(−1).  
5. Let f(x) = arcsin x + arccos x. Compute f′(x) for x ∈ (−1,1) and explain why the derivative is zero while f itself is constant.