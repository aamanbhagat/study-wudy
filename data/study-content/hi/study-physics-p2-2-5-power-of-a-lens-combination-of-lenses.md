## 1. The one-sentence answer
**Power of a lens is the reciprocal of focal length measured in metres, and the net power of thin lenses placed in contact equals the algebraic sum of their individual powers.**

Lens power quantifies how strongly a lens converges or diverges rays. A shorter focal length produces a larger magnitude of power because the same refraction occurs over a smaller distance. When two or more thin lenses touch, each refraction adds linearly, so the final wavefront curvature is simply the sum of the curvatures produced by each surface.

This linearity holds only for paraxial rays and negligible thickness. Once separation becomes comparable to focal lengths, ray-transfer matrices must replace the simple addition rule.

> [!NOTE]
> The single most important insight is that power is an additive quantity precisely because it measures wavefront curvature (in dioptres), not image distance; curvature adds when surfaces are in contact, exactly as voltages add in series.

## 2. Why this matters — concrete and current
Space telescopes such as JWST combine multiple powered mirrors and corrective lenses whose net power must be known to sub-micrometre precision to maintain diffraction-limited performance across a 6.5 m aperture.  

Satellite laser-communication terminals (e.g., NASA’s LCRD) use powered lens doublets to collimate 1550 nm beams; total power dictates both beam divergence and the required pointing accuracy of the spacecraft attitude-control system.  

Smartphone camera modules stack five to seven powered elements; manufacturers optimise the algebraic sum of powers to achieve 120° wide-angle fields while keeping the module thickness below 6 mm.  

High-energy laser facilities (NIF, LMJ) employ chains of powered lenses to expand and focus megajoule pulses; cumulative power errors of only 0.1 % shift the focal spot enough to miss ignition targets.  

Electron-microscope objective lenses are magnetic, yet the optical-power concept transfers directly through the analogous focal-length formula; corrector-lens combinations cancel spherical aberration to reach sub-ångström resolution.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Thin-lens equation       | Supplies the definition of focal length that power inverts                           |
| Sign convention (Cartesian) | Prevents sign errors when powers of converging and diverging lenses are added     |
| Paraxial-ray approximation | Justifies the linear addition of powers without higher-order aberrations           |
| Wavefront curvature      | Gives the physical reason why powers add for contacting surfaces                   |

If any row is unfamiliar, pause and review the thin-lens derivation before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — From focal length to power
A lens that bends parallel rays to a point at distance \(f\) changes the curvature of the wavefront by \(1/f\). Power is therefore defined as \(P = 1/f\) with \(f\) in metres, giving the dioptre (D).  
Example: a 20 cm focal-length lens has \(P = 5\) D.  
Formal statement:  
$$P = \frac{1}{f}.$$  
> [!WARNING]  
> Using centimetres for \(f\) produces a power value 100 times too large; always convert to metres first.

### Step 2 — Sign of power
Positive power for converging lenses (real focus, \(f > 0\)); negative power for diverging lenses (virtual focus, \(f < 0\)).  
Example: \(-2\) D lens diverges parallel rays as though they came from a point 50 cm to the left.  
Formal: \(P > 0\) when centre of curvature lies to the right of the surface for light travelling left to right.

### Step 3 — Contact addition rule
Two thin lenses touching share the same incident and emergent wavefront curvature at the contact plane. Curvatures therefore add:  
$$P_{\text{net}} = P_1 + P_2.$$  
Example: \(+3\) D and \(-1\) D lenses give \(+2\) D net.  
Formal:  
$$\frac{1}{F} = \frac{1}{f_1} + \frac{1}{f_2}.$$  
> [!WARNING]  
> The rule fails if the lenses are separated by more than a few millimetres; intermediate image formation changes the effective object distance for the second lens.

### Step 4 — Separation correction
When lenses are separated by distance \(d\), the power formula becomes  
$$P_{\text{net}} = P_1 + P_2 - d\,P_1 P_2.$$  
The extra term accounts for the change in ray height between the two elements.  
Example: two 5 D lenses 10 cm apart yield \(P_{\text{net}} = 9\) D, not 10 D.

### Step 5 — Matrix formulation (rigorous close)
The ray-transfer matrix for a thin lens of power \(P\) is  
$$\begin{pmatrix}1 & 0 \\ -P & 1\end{pmatrix}.$$  
Cascading matrices for separated lenses automatically produces the \(d\,P_1 P_2\) term and higher-order systems.

## 5. Worked examples — har step show karo

**Example 1 — Simple power calculation**  
*Given:* A biconvex lens has \(f = +25\) cm.  
*Find:* Power in dioptres.  
Convert: \(f = 0.25\) m.  
$$P = \frac{1}{0.25} = 4.$$  
*Why:* focal length must be in metres.  
**Final answer**  
**+4 D**

*Reflection:* The sign is positive because the lens converges; always state the sign explicitly.

**Example 2 — Two lenses in contact**  
*Given:* \(+5\) D and \(-2\) D lenses touch.  
*Find:* Net power and focal length.  
$$P = 5 + (-2) = 3\ \text{D}, \quad F = \frac{1}{3} = 0.333\ \text{m}.$$  
*Why:* powers add algebraically when separation is zero.  
**Final answer**  
**+3 D, \(F = +33.3\) cm**

*Reflection:* The result is still converging because the positive lens dominates.

**Example 3 — Separated lenses**  
*Given:* Two \(+10\) D lenses separated by 5 cm.  
*Find:* Net power.  
$$P = 10 + 10 - 0.05 \times 10 \times 10 = 15\ \text{D}.$$  
*Why:* the \(-d P_1 P_2\) term reduces total power.  
**Final answer**  
**+15 D**

*Reflection:* At \(d = 10\) cm the system becomes afocal (\(P = 0\)), showing the formula’s predictive power.

**Example 4 — Three-element telephoto**  
*Given:* \(+20\) D, \(-15\) D, \(+8\) D with separations 3 cm and 2 cm.  
*Find:* Equivalent power using successive application.  
First pair: \(P_{12} = 20 - 15 - 0.03 \times 20 \times 15 = 5 - 9 = -4\) D.  
Add third: \(P = -4 + 8 - 0.02 \times (-4) \times 8 = 4 + 0.64 = 4.64\) D.  
*Why:* each separation is applied only to the current pair.  
**Final answer**  
**+4.64 D**

*Reflection:* Matrix multiplication yields the identical result and scales to arbitrary numbers of elements.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Forgetting to convert cm to m     | Habit of using cm in school problems        | Always write \(f\) in metres before taking reciprocal |
| Adding focal lengths instead of powers | Intuitive but wrong because \(f\) is not additive | Convert each \(f\) to \(P\) first, then add         |
| Ignoring sign when a diverging lens is present | Positive bias from everyday magnifying glasses | Explicitly label every power positive or negative   |
| Using contact formula for separated lenses | Textbook examples often assume contact      | Insert the \(-d P_1 P_2\) term or switch to matrices |
| Mixing object-side and image-side sign conventions | Different books use different conventions   | Fix one Cartesian convention and stay consistent    |
| Neglecting lens thickness for “thick” elements | Real lenses have finite thickness           | Use the back-vertex power formula for precision work |

## 7. The textbook-precise statement
For a thin lens of refractive index \(n\) surrounded by air, the power is  
$$P = (n-1)\left(\frac{1}{R_1}-\frac{1}{R_2}\right),$$  
where \(R_1\) and \(R_2\) follow the Cartesian sign convention. When \(N\) thin lenses are placed in contact, the equivalent power is exactly  
$$P_{\text{eq}} = \sum_{i=1}^N P_i.$$  
If the \(i\)-th and \((i+1)\)-th lenses are separated by distance \(d_i\), the combined power is obtained from the product of translation and refraction matrices (Born & Wolf, *Principles of Optics*, 7e, §4.2.2).

## 8. Visual — diagram or schematic
```text
Parallel rays → [P1 = +5 D] --d=5 cm-- [P2 = +5 D] → focus
Ray height at P1: h
Ray height at P2: h - d·θ   (θ = h·P1)
Net power reduced by d·P1·P2
```

## 9. The memory technique
1. **The hook** — Imagine each lens stamping a “curvature credit” (dioptres) onto the passing wavefront; when lenses touch, the credits simply add in the same ledger.  
2. **What to overlearn** — \(P = 1/f\) (metres), \(P_{\text{net}} = P_1 + P_2\) (contact), \(P_{\text{net}} = P_1 + P_2 - d P_1 P_2\) (separated).  
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from the sagitta approximation or the ABCD matrix product if the formula is forgotten.

## 10. What this unlocks
Mastery of lens power lets you design afocal beam expanders, telephoto objectives, and microscope tube lenses without ray tracing every surface.  

- Eyepiece design (Ramsden, Kellner)  
- Zoom-lens varifocal groups  
- Atmospheric-turbulence corrector plates in adaptive optics  
- Ray-transfer-matrix chains for laser cavities  

## 11. Self-check — five questions, no answers
1. A +8 D lens is paired in contact with a −3.5 D lens. What is the focal length of the combination?  
2. Two +6 D lenses are placed 8 cm apart. Calculate the equivalent power and state whether the system is converging or diverging.  
3. Why does the separated-lens formula contain a minus sign in front of the \(d P_1 P_2\) term?  
4. A thin lens has surfaces with radii +12 cm and −18 cm and refractive index 1.5. Find its power.  
5. In a three-lens system the middle diverging lens is moved 2 mm closer to the first lens. Does the total power increase or decrease? Explain qualitatively.