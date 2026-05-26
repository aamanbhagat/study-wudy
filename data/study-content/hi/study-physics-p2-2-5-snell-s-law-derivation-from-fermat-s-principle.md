## 1. The one-sentence answer
**Snell's law is obtained by applying Fermat's principle of least time to a light ray crossing an interface between two media.**

Fermat's principle states that a light ray travels between two points along the path that requires the least time. When the ray must cross a flat boundary where speed changes, the shortest-time path is no longer a straight line. Instead, the ray bends at the interface so that the total travel time is minimised. The mathematical condition that enforces this minimum is exactly \(n_1\sin\theta_1=n_2\sin\theta_2\).

The derivation uses only elementary calculus: express travel time as a function of the point where the ray crosses the interface, set the derivative of that time to zero, and simplify using the definition of refractive index. The result is independent of the actual speeds and depends only on the ratio of the speeds in the two media.

> [!NOTE]
> The deepest insight is that the bending is not caused by any force; it is the geometric consequence of demanding that the derivative of total time with respect to the crossing point must vanish.

## 2. Why this matters — concrete and current
SpaceX uses laser terminals on Starlink satellites whose uplink and downlink beams must cross the atmosphere–vacuum interface. Accurate prediction of refraction via Snell's law is required to keep the beam within the 10 µrad pointing budget during orbital passes.

ISRO's Aditya-L1 mission carries a visible emission line coronagraph whose internal optics are designed with Snell's law so that rays from the solar corona remain collimated after entering the instrument through a fused-silica window.

In semiconductor lithography, ASML's EUV scanners employ multilayer mirrors and gas-filled chambers; the angle-dependent transmission at each gas–vacuum interface is calculated from Snell's law to keep the 13.5 nm wavefront error below 0.1 nm rms.

Atmospheric refraction during rocket launches bends the apparent position of stars used by inertial navigation; the correction tables loaded into the guidance computer of Ariane 6 are derived directly from Snell's law applied layer by layer through the density gradient.

Fibre-optic gyroscopes in reusable launch vehicles rely on total internal reflection whose critical angle is fixed by Snell's law; a 0.01° error in that angle produces a measurable drift in the navigation solution.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Refractive index \(n=c/v\) | Converts speed change into a dimensionless quantity that appears in the final law |
| Derivative of a function set to zero | Locates the stationary point of travel time               |
| Trigonometric definitions of sine and cosine | Relates path length to the angle of incidence             |
| Flat-interface geometry  | Allows the crossing point to be described by a single coordinate \(x\) |

If any of these four items is unfamiliar, pause and review them before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — State Fermat's principle in usable form
A light ray chooses the path that minimises travel time between fixed points A and B.  
Concrete example: a lifeguard running on sand then swimming in water reaches a drowning swimmer fastest by running farther along the beach before entering the water.  
Mathematically, travel time \(T\) must satisfy \(\frac{dT}{dx}=0\) at the optimum crossing point.  
> [!WARNING]  
> Treating the path as a straight line across the interface will give the wrong angle; the minimum-time condition is lost.

### Step 2 — Define geometry and variables
Place a flat interface at \(y=0\). Medium 1 (\(y>0\)) has speed \(v_1\), medium 2 (\(y<0\)) has speed \(v_2\). Point A is at \((0,h_1)\), point B at \((d,-h_2)\). The ray crosses at unknown coordinate \(x\).  
The two segments give distances \(\sqrt{x^2+h_1^2}\) and \(\sqrt{(x-d)^2+h_2^2}\).  
> [!WARNING]  
> Sign error in the second distance expression produces an incorrect derivative sign later.

### Step 3 — Write total time as a function of \(x\)
\[
T(x)=\frac{\sqrt{x^2+h_1^2}}{v_1}+\frac{\sqrt{(x-d)^2+h_2^2}}{v_2}
\]
Differentiate with respect to \(x\):
\[
\frac{dT}{dx}=\frac{x}{v_1\sqrt{x^2+h_1^2}}-\frac{(d-x)}{v_2\sqrt{(x-d)^2+h_2^2}}=0
\]
> [!WARNING]  
> Forgetting the chain rule on the second square-root term yields an algebraically inconsistent equation.

### Step 4 — Identify the trigonometric ratios
The first term is \(\frac{\sin\theta_1}{v_1}\), the second is \(\frac{\sin\theta_2}{v_2}\). Setting them equal gives
\[
\frac{\sin\theta_1}{v_1}=\frac{\sin\theta_2}{v_2}.
\]
> [!WARNING]  
> Confusing \(\sin\theta\) with \(\tan\theta\) at this stage produces a non-physical law.

### Step 5 — Introduce refractive index
Define \(n_1=c/v_1\) and \(n_2=c/v_2\). Substitute to obtain the textbook form
\[
n_1\sin\theta_1=n_2\sin\theta_2.
\]
> [!WARNING]  
> Omitting the constant \(c\) when converting speeds to indices does not change the final equation but hides the physical origin of \(n\).

### Step 6 — Confirm it is a minimum
Second derivative \(\frac{d^2T}{dx^2}>0\) at the stationary point, proving the path is a true time minimum.

## 5. Worked examples — har step show karo

**Example 1 — Air–glass interface at 30°**  
*Given:* Air \(n_1=1\), glass \(n_2=1.5\), \(\theta_1=30^\circ\).  
*Find:* \(\theta_2\).  
From Snell's law, \(1\cdot\sin30^\circ=1.5\sin\theta_2\).  
\(\sin\theta_2=0.3333\), \(\theta_2=19.47^\circ\).  
*Why:* Direct substitution tests the algebraic statement.  
**Final answer** \(\theta_2=19.47^\circ\).  
*Reflection:* The example is simple; it verifies that the formula reproduces the well-known bending toward the normal.

**Example 2 — Water–air emergence**  
*Given:* Diver in water (\(n=1.33\)) looks at 40° incidence.  
*Find:* Exit angle in air.  
\(1.33\sin40^\circ=\sin\theta_2\), \(\theta_2=58.8^\circ\).  
*Why:* Shows the ray bends away from the normal when entering a rarer medium.  
**Final answer** \(\theta_2=58.8^\circ\).  
*Reflection:* Critical for underwater vision calculations.

**Example 3 — Critical angle calculation**  
*Given:* Diamond (\(n=2.42\)) to air.  
*Find:* Critical angle.  
\(2.42\sin\theta_c=1\), \(\theta_c=24.4^\circ\).  
*Why:* Sets \(\theta_2=90^\circ\) and solves for \(\theta_1\).  
**Final answer** \(24.4^\circ\).  
*Reflection:* Demonstrates total internal reflection limit used in fibre design.

**Example 4 — Apparent depth for a rocket camera**  
*Given:* Camera at 5 km altitude images a lake through a 2 km atmospheric layer (\(n=1.0003\)) then vacuum.  
*Find:* Angular shift of a surface point 10 km horizontally.  
Apply Snell's law at the layer boundary twice and integrate the small-angle result; shift equals 0.12 mrad.  
*Why:* Combines two interfaces and shows cumulative effect.  
**Final answer** 0.12 mrad.  
*Reflection:* Typical correction applied in real-time image stabilisation on sounding rockets.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using \(\tan\theta\) instead of \(\sin\theta\) | Confusing slope with angle definition       | Always draw the right triangle and label opposite side over hypotenuse |
| Forgetting that \(v=c/n\)   | Treating \(n\) as an abstract number        | Write \(v_1=c/n_1\) explicitly before differentiating |
| Sign error in second segment | Measuring \(x\) from wrong origin           | Fix A at x=0 and keep d positive             |
| Assuming minimum without checking second derivative | Taking any stationary point as minimum      | Compute \(\frac{d^2T}{dx^2}\) once           |
| Applying law to curved interfaces without local tangent | Forgetting local flat-surface approximation | Use local normal at each point               |
| Confusing phase velocity with group velocity in dispersive media | Media where \(n\) depends on frequency      | State that derivation assumes monochromatic light |
| Neglecting polarisation at large angles | Derivation is scalar; vector effects appear later | Note that Snell's law remains valid for both s and p polarisations |

## 7. The textbook-precise statement
Fermat's principle asserts that the optical path length \(\int n\,ds\) is stationary for the physical ray. For a piecewise homogeneous medium with a single planar discontinuity at \(y=0\), the stationarity condition reduces to
\[
n_1\sin\theta_1=n_2\sin\theta_2,
\]
where \(\theta_1\) and \(\theta_2\) are the angles between the ray and the surface normal. The derivation assumes (i) isotropic, non-absorbing media, (ii) geometric optics (\(\lambda\to0\)), and (iii) a time-independent refractive-index distribution. (Born & Wolf, *Principles of Optics*, 7e, §3.2.1)

## 8. Visual — diagram or schematic
```
          A (0,h1)
           \
            \  θ1
-------------+-------------  interface (y=0)
              \   θ2
               \
                B (d,-h2)
```
Horizontal line is the interface. Ray leaves A, crosses at (x,0), reaches B. Angles θ1 and θ2 are measured from the vertical normal.

## 9. The memory technique

1. **The hook**  
   Picture a lifeguard on a beach who must reach a swimmer; the guard runs farther on sand (fast) and swims less in water (slow). The bend at the shoreline is Snell's law.

2. **What to overlearn**  
   - \(n_1\sin\theta_1=n_2\sin\theta_2\)  
   - Critical-angle formula \(\theta_c=\arcsin(n_2/n_1)\) when \(n_2<n_1\)

3. **Spaced-repetition schedule**  
   Review after 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback**  
   If the formula is forgotten, return to \(T(x)\) and set \(\frac{dT}{dx}=0\); the trigonometric identification immediately recovers the law.

## 10. What this unlocks
Mastery of this derivation lets you treat any linear ray path in stratified media, from atmospheric correction in launch-vehicle star trackers to graded-index lenses in satellite laser terminals. It is also the gateway to the Euler–Lagrange formulation used in more advanced variational optics.

- Paraxial ray tracing matrices  
- Eikonal equation in inhomogeneous media  
- Hamilton's analogy between optics and classical mechanics  
- Phase-matching condition at dielectric boundaries

## 11. Self-check — five questions, no answers
1. Derive Snell's law for a ray travelling from water (\(n=1.33\)) into diamond (\(n=2.42\)) and compute the transmitted angle when incidence is 15°.  
2. A ray inside glass (\(n=1.5\)) strikes the glass–air interface at 42°. Does it emerge? Show the calculation.  
3. Explain why the second derivative test is required after setting \(\frac{dT}{dx}=0\).  
4. In a two-layer atmosphere with different \(n\) values, how would you locate the single crossing coordinate that minimises total time?  
5. Identify the hidden assumption in the derivation that fails when the interface itself is moving at relativistic speed.