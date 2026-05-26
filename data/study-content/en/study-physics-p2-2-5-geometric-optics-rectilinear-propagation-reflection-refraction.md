## 1. The one-sentence answer
**Geometric optics treats light as rays that travel in straight lines through uniform media, reflect with equal angles at surfaces, and refract according to a speed-dependent bending rule at interfaces.**

Rectilinear propagation means that, in any region where the refractive index is constant, a ray continues along a Euclidean straight line because every infinitesimal segment experiences the same phase velocity. Reflection occurs when the ray encounters a boundary; the incident and reflected directions lie in the same plane and make equal angles with the surface normal. Refraction arises when the ray crosses into a medium of different index; the component of the wave vector parallel to the interface is conserved, producing a directional change whose magnitude is fixed by the ratio of the indices.

These three rules together allow any ray path through lenses, mirrors, and layered media to be constructed with only geometry and trigonometry.

> [!NOTE]
> The entire predictive power of geometric optics collapses to a single local statement: at every point the ray either goes straight or obeys angle or Snell equality; no integration or wave summation is required until diffraction limits are reached.

## 2. Why this matters — concrete and current
James Webb Space Telescope’s 18-segment primary mirror was aligned on orbit using only geometric ray tracing of star images; each segment’s actuator commands were computed from measured spot centroids assuming rectilinear propagation and equal-angle reflection. Any deviation from the law of reflection larger than 50 nm would have produced unacceptable wavefront error.

Fiber-optic gyroscopes inside SpaceX Falcon 9 guidance units rely on total internal reflection to keep laser light circulating inside coiled silica fibers; the Sagnac phase shift extracted from the recombined beams supplies inertial rotation data accurate to 0.001° h⁻¹, directly enabling autonomous first-stage landings.

Atmospheric refraction corrections applied to ground-based radar tracking of re-entering capsules (e.g., Orion EFT-1) use Snell’s law across layered density shells; without the correction the predicted impact point drifts by several kilometres.

Semiconductor EUV lithography scanners at ASML employ multilayer Mo/Si mirrors at 13.5 nm whose reflectivity is computed from Fresnel coefficients derived from the same reflection law; each mirror must maintain 70 % reflectivity across 40 layers, a specification set by geometric ray budgets.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Plane geometry & angles  | All three laws are statements about angles at a point     |
| Trigonometric functions  | Snell’s law and critical-angle calculations require sine  |
| Constant speed in medium | Rectilinear propagation follows from uniform phase velocity |
| Normal vector to surface | Reflection and refraction angles are measured from the normal |

## 4. Building the idea — from intuition to formalism

### Step 1 — Straight-line travel in uniform media
Light advances at constant speed inside a homogeneous transparent medium, so the shortest-time path between any two points is the Euclidean straight line.  
Example: a laser pointer in air produces a visible dot on a distant wall exactly along the geometric line of sight.  
Mathematically, the ray path \(\mathbf{r}(s)\) satisfies
\[
\frac{d^2\mathbf{r}}{ds^2}=0
\]
inside a region of constant index.  
> [!WARNING]
> If the index varies continuously (graded-index fibre), the ray curves; assuming straight lines there produces positional errors that grow quadratically with distance.

### Step 2 — The law of reflection
At a smooth interface the incident ray, reflected ray and surface normal lie in one plane, and the angles of incidence and reflection are equal.  
Example: a billiard ball bouncing off a cushion obeys the identical angle rule; light does likewise.  
Formal statement:
\[
\theta_i=\theta_r
\]
with all angles measured from the normal.  
> [!WARNING]
> Measuring angles from the surface instead of the normal inverts the equality and yields wrong image locations in mirror calculations.

### Step 3 — Origin of refraction
When the ray crosses into a slower medium the wavefronts must stay continuous across the boundary; the part of the wavefront that enters first slows first, rotating the propagation direction.  
Example: a straw appears bent at the air–water surface because rays from the submerged end travel slower in water.  
The parallel component of the wave vector is conserved, giving the quantitative relation in the next step.

### Step 4 — Snell’s law
Conservation of the tangential wave-vector component produces
\[
n_1\sin\theta_1=n_2\sin\theta_2
\]
where \(n=c/v\) is the absolute refractive index.  
Example: air-to-glass at 45° incidence with \(n=1.5\) yields \(\theta_2\approx28.1^\circ\).  
> [!WARNING]
> Using wavelength instead of index, or confusing relative and absolute indices, produces inconsistent results across multiple interfaces.

### Step 5 — Total internal reflection
When \(n_1>n_2\) and \(\theta_1>\theta_c=\arcsin(n_2/n_1)\), no real \(\theta_2\) exists; the ray reflects completely.  
This is the limiting case of Snell’s law and completes the set of geometric-optics rules.

## 5. Worked examples — every step shown

**Example 1 — Image location by plane mirror**  
*Given:* Object 10 cm in front of a plane mirror.  
*Find:* Image distance.  
Ray from object tip strikes mirror at incidence angle \(\theta_i\); reflected ray appears to come from a point 10 cm behind the mirror because \(\theta_r=\theta_i\) forces symmetric extension of the backward ray.  
Image distance = 10 cm behind mirror.  
**10 cm behind the mirror**  
*Reflection:* The equality of angles alone fixes the image; no calculation beyond symmetry is required.

**Example 2 — Apparent depth in water**  
*Given:* Fish 2.0 m below water surface, observer in air, \(n_\text{water}=1.33\).  
*Find:* Apparent depth for near-normal viewing.  
Snell’s law at small angles reduces to \(\theta_1/\theta_2\approx n_2/n_1\).  
Apparent depth = real depth / \(n\) = 2.0 / 1.33 ≈ 1.50 m.  
**1.50 m**  
*Reflection:* Small-angle limit converts the sine ratio directly into a linear depth scaling.

**Example 3 — Critical angle for glass–air interface**  
*Given:* \(n_\text{glass}=1.50\).  
*Find:* Critical angle.  
\[
\sin\theta_c=\frac{1}{1.50}=0.6667 \implies\theta_c=41.81^\circ
\]  
**41.81°**  
*Reflection:* Any ray steeper than this is trapped by total internal reflection.

**Example 4 — Ray through prism**  
*Given:* 60° crown-glass prism, \(n=1.52\), incident ray at 30° to first normal.  
*Find:* Exit angle after second face.  
First surface: \(1\cdot\sin30^\circ=1.52\sin\theta_2\) → \(\theta_2=19.2^\circ\).  
Prism angle gives interior incidence at second face = 40.8°.  
Second surface: \(1.52\sin40.8^\circ=1\cdot\sin\theta_4\) → \(\theta_4=82.3^\circ\).  
**Exit angle 82.3°**  
*Reflection:* Each interface applies Snell independently; the prism angle links the two interior angles.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Measuring angles from surface     | Habit from everyday “angle of bounce” talk  | Always draw the normal first                 |
| Using wavelength in Snell’s law   | Confusion with wave optics                  | Replace \(\lambda\) by \(n\) only            |
| Forgetting plane-of-incidence rule| 3-D sketches omitted                        | Verify coplanarity before applying 2-D law   |
| Sign error on virtual images      | Mirror/lens sign convention mixed           | Adopt Cartesian sign convention consistently |
| Applying Snell outside the plane  | Assuming azimuthal symmetry                 | Project onto plane containing normal         |
| Ignoring dispersion               | Treating \(n\) as constant across spectrum  | Use \(n(\lambda)\) for polychromatic beams   |
| Assuming TIR when \(n_1<n_2\)     | Over-generalising critical-angle condition  | Check \(n_1>n_2\) before computing \(\theta_c\) |

## 7. The textbook-precise statement
In a homogeneous isotropic medium, light rays propagate rectilinearly. At a smooth interface between two such media the reflected ray obeys
\[
\hat{\mathbf{k}}_r=\hat{\mathbf{k}}_i-2(\hat{\mathbf{k}}_i\cdot\hat{\mathbf{n}})\hat{\mathbf{n}},
\]
while the transmitted ray satisfies Snell’s law
\[
n_1(\hat{\mathbf{k}}_i\times\hat{\mathbf{n}})=n_2(\hat{\mathbf{k}}_t\times\hat{\mathbf{n}}).
\]
(Born & Wolf, *Principles of Optics*, 7e, §3.2.2).

## 8. Visual — diagram or schematic
```text
          air (n=1)
            ^
            |  θ_i
            | /
------------+-------------- interface
            | \
            |  θ_r   (reflection)
 water (n=1.33)
            |
            v  θ_t   (refraction)
```
Normal is vertical line through “+”. All angles measured from this normal. Parallel wave-vector component \(k_x=n\sin\theta\) is continuous across the boundary.

## 9. The memory technique
1. **The hook** — Picture a marching band crossing from pavement onto sand: the rank that hits sand first slows, pivoting the whole line exactly as wavefronts pivot at an interface.  
2. **What to overlearn** — \(\theta_i=\theta_r\) and \(n_1\sin\theta_1=n_2\sin\theta_2\); critical-angle definition \(\theta_c=\arcsin(n_2/n_1)\).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive Snell from continuity of phase along the interface: set optical path lengths equal for adjacent rays, yielding the sine ratio directly.

## 10. What this unlocks
Mastery of ray tracing through arbitrary sequences of reflections and refractions is the prerequisite for paraxial lens formulas, aberration theory, and radiometric throughput calculations.  
- Thin-lens equation and lensmaker’s formula  
- Prism deviation and dispersion  
- Fibre-optic acceptance angle and étendue conservation  
- First-order optical design in Zemax or Code V

## 11. Self-check — five questions, no answers
1. A ray in air strikes a glass plate (\(n=1.60\)) at 55°. Compute the refracted angle inside the glass.  
2. Two plane mirrors form a 90° dihedral angle. Where is the final image of an object placed 5 cm from both mirrors?  
3. What is the smallest incidence angle (in diamond, \(n=2.42\)) that produces total internal reflection into air?  
4. A fish is 1.2 m below the surface. An observer looks from air at 60° to the normal. By how much does the apparent depth differ from the small-angle result?  
5. A prism with apex 30° deviates a 633 nm HeNe beam by 18.4°. Determine the refractive index at that wavelength, assuming symmetric passage.