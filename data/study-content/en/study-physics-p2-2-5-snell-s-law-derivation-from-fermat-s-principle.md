## 1. The one-sentence answer
**Snell's law follows directly from Fermat's principle by minimizing the travel time of a light ray across an interface between two media.**

Fermat's principle asserts that a light ray follows the path that requires the least time between two points. When the ray crosses from one uniform medium into another, the speed changes, so the straight-line path in space is no longer the shortest path in time. The actual trajectory therefore bends at the interface; the precise angle of bending is fixed by the condition that any small sideways shift of the crossing point must leave the total time unchanged to first order.

The resulting relation equates the optical path lengths on each side through the sines of the angles of incidence and refraction. Because the refractive index of a medium is inversely proportional to the speed of light inside it, the geometric condition immediately translates into the familiar statement \(n_1\sin\theta_1=n_2\sin\theta_2\).

> [!NOTE]
> The "aha" is that refraction is not a force deflecting the ray; it is the geometric consequence of nature choosing the quickest route when speeds differ.

## 2. Why this matters — concrete and current
In the design of multi-element camera lenses for space telescopes, engineers at NASA and Lockheed Martin apply the Fermat-derived form of Snell's law to trace rays through hundreds of surfaces while enforcing minimum-time paths; any deviation produces wavefront errors that degrade the point-spread function below the diffraction limit required for exoplanet imaging.

Fiber-optic transceivers manufactured by companies such as Corning and Intel rely on controlled refraction at the core-cladding boundary. The acceptance angle of each fiber is calculated from the same minimization principle; exceeding that angle converts guided modes into radiation modes and raises bit-error rates in data-center interconnects operating at 400 Gbps.

Atmospheric scientists modeling radio-occultation measurements from the COSMIC-2 satellite constellation invert Snell's law layer by layer to recover vertical profiles of electron density. The underlying time-minimization assumption converts measured phase delays into refractivity gradients that feed global weather-prediction models.

In immersion lithography tools produced by ASML, the final lens element sits in a liquid whose refractive index is chosen to increase the numerical aperture. Ray-tracing software inside the tool enforces Fermat's principle at every interface to keep the aerial image in focus across a 26 mm field while printing features smaller than 10 nm.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Definition of refractive index \(n=c/v\) | Converts the geometric time integral into the optical-path length that appears in Fermat's principle |
| Elementary differentiation and setting derivative to zero | Locates the stationary point of travel time with respect to the interface crossing coordinate |
| Trigonometric definitions of sine in right triangles | Extracts the angle dependence once the derivative is formed |
| Notation for angles measured from the surface normal | Ensures consistent labeling of \(\theta_1\) and \(\theta_2\) on opposite sides of the interface |

## 4. Building the idea — from intuition to formalism

### Step 1 — State Fermat's principle precisely
A light ray travels between two fixed points along the trajectory that makes the elapsed time stationary (usually a minimum).  
Consider a ray that must go from point A above a flat interface to point B below it.  
The mathematical statement is that the optical path length \(\int n\,ds\) is extremized.  
> [!WARNING]  
> Treating the principle as “light always takes the shortest geometric path” instead of the shortest-time path produces the wrong angles whenever speeds differ.

### Step 2 — Fix the geometry
Draw a horizontal interface separating medium 1 (\(n_1\)) above from medium 2 (\(n_2\)) below. Place A at height \(h_1\) and horizontal coordinate 0; place B at height \(h_2\) and horizontal coordinate \(L\). Let the ray cross the interface at variable coordinate \(x\).  
The two segments are straight lines because each medium is homogeneous.  
The angle each segment makes with the normal follows from \(\tan\theta=x/h\) in the appropriate triangle.

### Step 3 — Write travel time as a function of \(x\)
Time is distance divided by speed:  
\[
t(x)=\frac{\sqrt{h_1^2+x^2}}{v_1}+\frac{\sqrt{h_2^2+(L-x)^2}}{v_2}.
\]
Substitute \(v=c/n\):  
\[
t(x)=\frac{n_1}{c}\sqrt{h_1^2+x^2}+\frac{n_2}{c}\sqrt{h_2^2+(L-x)^2}.
\]

### Step 4 — Differentiate with respect to the free variable
Require \(\frac{dt}{dx}=0\) for a stationary path:  
\[
\frac{dt}{dx}=\frac{n_1}{c}\frac{x}{\sqrt{h_1^2+x^2}}-\frac{n_2}{c}\frac{L-x}{\sqrt{h_2^2+(L-x)^2}}=0.
\]
Cancel \(c\) and recognize that \(x/\sqrt{h_1^2+x^2}=\sin\theta_1\) and \((L-x)/\sqrt{h_2^2+(L-x)^2}=\sin\theta_2\).

### Step 5 — Recover the sine relation
The stationarity condition collapses to  
\[
n_1\sin\theta_1=n_2\sin\theta_2.
\]
This is Snell's law. The same algebraic steps hold if the ray is reflected instead of transmitted, recovering the law of reflection as the special case \(n_1=n_2\).

## 5. Worked examples — every step shown

**Example 1 — Air-to-water interface at 30° incidence**  
*Given:* Ray in air (\(n_1=1.000\)) strikes water (\(n_2=1.333\)) at \(\theta_1=30^\circ\).  
*Find:* \(\theta_2\).  
Step 1: Write Snell's law \(1.000\sin 30^\circ=1.333\sin\theta_2\).  
*Why* — direct substitution of known indices and angle.  
Step 2: \(\sin\theta_2=0.5000/1.333=0.3751\).  
*Why* — isolate the unknown sine.  
Step 3: \(\theta_2=\arcsin(0.3751)=22.0^\circ\).  
**Final answer**  
\(\theta_2=22.0^\circ\)

*Reflection:* The arithmetic is trivial; the example verifies that the derived law reproduces measured refraction angles.

**Example 2 — Glass-to-air critical-angle calculation**  
*Given:* Ray inside glass (\(n_1=1.500\)) incident on air (\(n_2=1.000\)).  
*Find:* Critical angle \(\theta_c\).  
Step 1: Set \(\theta_2=90^\circ\) so \(\sin\theta_2=1\).  
*Why* — definition of critical ray that grazes the surface.  
Step 2: \(1.500\sin\theta_c=1.000\cdot1\).  
*Why* — apply Snell's law at the limiting angle.  
Step 3: \(\sin\theta_c=1/1.500=0.6667\), \(\theta_c=41.8^\circ\).  
**Final answer**  
\(\theta_c=41.8^\circ\)

*Reflection:* The same stationary-time condition now signals the onset of total internal reflection.

**Example 3 — Minimum-time path versus straight-line path**  
*Given:* \(h_1=h_2=1\) m, \(L=2\) m, \(n_1=1\), \(n_2=1.5\), \(c=3\times10^8\) m/s.  
*Find:* Travel time for both the Fermat path and the straight geometric line.  
Step 1: Solve Snell's law for \(x\): \(\sin\theta_1=1.5\sin\theta_2\), yielding \(x=0.804\) m.  
*Why* — locate the optimal crossing point.  
Step 2: Compute distances and divide by speeds.  
Fermat time = 11.55 ns.  
Straight-line time = 11.79 ns.  
**Final answer**  
Fermat path is 0.24 ns faster.

*Reflection:* Demonstrates that the derived angle indeed produces a measurable time advantage.

**Example 4 — Layered atmosphere with continuously varying index**  
*Given:* Index decreases linearly from 1.0003 at sea level to 1.0000 at 10 km.  
*Find:* Approximate ray curvature for a grazing ray.  
Step 1: Replace discrete Snell's law by its differential form \(n\sin\theta=\) constant.  
*Why* — continuous limit of the same minimization.  
Step 2: Differentiate to obtain radius of curvature \(R=n/|\nabla n|\).  
*Why* — chain rule applied to the invariant.  
Step 3: Insert values: \(R\approx 2.5\times10^7\) m.  
**Final answer**  
Ray bends with radius 25 000 km.

*Reflection:* Shows how the identical variational principle extends beyond a single interface.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Measuring angles from the surface instead of the normal | Habit from everyday language (“angle of incidence”) | Always draw the normal and label \(\theta\) from it before writing Snell's law |
| Forgetting that \(n\) is larger where speed is smaller | Confusing “optically denser” with geometric density | Write \(v=c/n\) explicitly each time the time integral is formed |
| Treating Fermat's principle as a maximum instead of a minimum | Rare cases exist (e.g., elliptical mirrors) but are exceptional | Check second derivative or compare nearby paths to confirm a minimum |
| Applying the law when one medium has \(n<1\) without checking evanescent behavior | Sign error in square-root for imaginary angles | Verify \(\sin\theta_2\le1\) before taking arcsin |
| Using wavelength-dependent \(n\) inconsistently across the derivation | Dispersion is omitted in the basic model | State “assume monochromatic light” at the outset |
| Neglecting the possibility that the stationary path is a saddle | Occurs in anisotropic media | Restrict the derivation to isotropic, homogeneous layers until advanced chapters |
| Confusing phase velocity with group velocity in the time integral | Advanced students import wave-packet ideas too early | Keep the derivation strictly geometric; introduce packets only after the ray result is obtained |

## 7. The textbook-precise statement
Fermat's principle states that the optical path length  
\[
\mathcal{L}=\int_A^B n(\mathbf{r})\,ds
\]  
is stationary with respect to infinitesimal variations of the path. For a planar interface separating two isotropic homogeneous media with indices \(n_1\) and \(n_2\), the stationarity condition reduces to  
\[
n_1\sin\theta_1=n_2\sin\theta_2,
\]  
where \(\theta_1\) and \(\theta_2\) are the angles between the ray and the surface normal. (Born & Wolf, *Principles of Optics*, 7e, §3.2.1.)

## 8. Visual — diagram or schematic
```text
          A
          |  
 h1       |  
          |     θ1
----------+---------- interface (y=0)
          |     θ2
 h2       |  
          |  
          B
x=0      x          x=L
```
- Vertical distances \(h_1\) and \(h_2\) are fixed.  
- Horizontal crossing coordinate \(x\) is varied.  
- \(\theta_1=\arctan(x/h_1)\), \(\theta_2=\arctan((L-x)/h_2)\).  
- Normal is drawn perpendicular to the interface at the crossing point.

## 9. The memory technique

**The hook**  
Picture a lifeguard on a beach who must reach a drowning swimmer; she runs faster on sand than she swims, so she instinctively bends her path exactly as Snell's law predicts.

**What to overlearn**  
1. \(n_1\sin\theta_1=n_2\sin\theta_2\)  
2. The optical path length \(\int n\,ds\) is the quantity minimized.  
3. Angles are measured from the normal.

**Spaced-repetition schedule**  
Review the derivation at 1 day, 3 days, 7 days, 16 days, and 35 days after first mastery.

**First-principles fallback**  
Re-derive by writing \(t(x)\), setting \(dt/dx=0\), and identifying the sines; the algebra is only two lines once the geometry is drawn.

## 10. What this unlocks
Snell's law derived from Fermat's principle supplies the local boundary condition used in every subsequent ray-tracing algorithm and in the eikonal equation of wave optics.  

- Derivation of the paraxial refraction formula for spherical surfaces  
- Construction of the lensmaker's equation  
- Hamilton's point characteristic and the foundations of Hamiltonian optics  
- Phase-matching conditions at multilayer dielectric stacks  
- Ray equation in gradient-index media (e.g., SELFOC lenses)

## 11. Self-check — five questions, no answers
1. A ray travels from water into diamond. If the angle of incidence is 12°, what is the angle of refraction?  
2. Show that the stationary-time condition for reflection yields \(\theta_i=\theta_r\) without assuming Snell's law in advance.  
3. A thin film of index 1.38 is deposited on glass. At what angle of incidence from air does the reflected ray suffer a 180° phase shift relative to the incident ray?  
4. In a continuously stratified medium where \(n(y)=n_0(1+\alpha y)\), derive the differential equation obeyed by the ray path \(x(y)\).  
5. Two possible crossing points on an interface give the same travel time; which one is stable against small perturbations, and why?