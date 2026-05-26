## 1. The one-sentence answer
**Buoyancy arises because hydrostatic pressure increases with depth, so the net force on a submerged body points upward and equals the weight of the fluid displaced.**

Pressure at any depth \(h\) in a fluid of density \(\rho\) is \(P = P_0 + \rho g h\). On a closed surface the horizontal pressure components cancel, but the vertical components do not: the upward push on the lower surface exceeds the downward push on the upper surface. The difference integrates exactly to \(\rho V g\), where \(V\) is the displaced volume. This is Archimedes’ principle derived solely from the gradient of pressure.

> [!NOTE]
> The “aha” moment is realising that buoyancy is not a new force; it is simply the unbalanced part of the ordinary pressure field that already exists inside the fluid.

## 2. Why this matters — concrete and current
SpaceX recovers Falcon 9 first stages by controlling the vehicle’s attitude while it descends through the atmosphere and then splashes down; the final water landing loads depend on the buoyant force that appears the instant the engine section touches the sea. Engineers must predict the sudden upward force to within a few percent so that the hull and recovery hardware survive.

Submarines and autonomous underwater vehicles (AUVs) used by the Indian Navy maintain neutral buoyancy by continuously trimming ballast water; any error in the Archimedes calculation appears as an unwanted vertical acceleration that must be countered by the dive planes, increasing power consumption and acoustic signature.

In semiconductor manufacturing, wafers are transported through ultra-pure water baths inside FOUP cleaning stations. The wafers are held by Bernoulli grippers whose lift force is set by the same pressure-difference mechanism; a 0.1 mm error in immersion depth changes the buoyant contribution enough to crack the wafer.

LNG carrier tanks are filled with membrane-type containment systems whose inner hull must withstand the buoyant uplift when a leak floods the insulation space; classification societies require explicit verification of the Archimedes-derived load case.

Natural phenomena such as the rising of magma diapirs in the Earth’s mantle are also governed by the same pressure-difference mechanism operating on timescales of millions of years.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Hydrostatic pressure gradient \(\frac{dP}{dz} = -\rho g\) | Gives the linear increase of pressure with depth that creates the net force |
| Surface integral of pressure force \(\mathbf{F} = -\int P\,d\mathbf{A}\) | Converts the pressure field into the total buoyant vector |
| Volume of geometric primitives (cylinder, sphere, prism) | Required when you evaluate the integral over a real body |
| Free-body diagram and equilibrium | Lets you separate buoyancy from weight and other external forces |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Pressure increases linearly with depth
A fluid at rest transmits pressure equally in all directions, yet the pressure itself grows with depth because each layer must support the weight of everything above it. Consider a small fluid element of height \(dh\); vertical force balance immediately yields \(dP = -\rho g\,dh\).

Example: At the surface of a swimming pool \(P = 1\) atm; at 10 m depth in fresh water the gauge pressure is already \(\approx 1\) atm.

Formal statement:  
\[P(z) = P_0 + \rho g (h_0 - z)\]  
where \(z\) increases upward.

> [!WARNING]
> Forgetting that \(z\) is measured upward (or reversing the sign of \(g\)) produces a buoyancy force in the wrong direction.

### Step 2 — Resolve pressure force on an arbitrary closed surface
The force on any surface element is \(-P\,d\mathbf{A}\) (negative because pressure pushes inward). Split the vector area into horizontal and vertical parts. Horizontal components cancel by symmetry around the body; only the vertical component survives.

### Step 3 — Evaluate the vertical component explicitly
For a body whose projection onto the horizontal plane has area \(A(z)\) at height \(z\), the net vertical force is  
\[F_z = -\int_{z_\text{bottom}}^{z_\text{top}} P(z) \frac{dA}{dz}\,dz.\]  
Substitute the linear pressure law and interchange the order of integration.

### Step 4 — Interchange integral to recover displaced volume
After substitution the expression collapses to  
\[F_z = \rho g \int_{V} dV = \rho V g,\]  
where the integral is exactly the volume enclosed by the surface (i.e., the displaced volume).

### Step 5 — Direction and equilibrium statement
Because \(F_z\) is positive when \(z\) increases upward, the force is upward—opposite to gravity. In equilibrium the body experiences an additional downward force equal to its own weight; the difference is the observed buoyancy.

### Step 6 — Textbook-grade statement
When a body is immersed in a fluid at rest, the resultant force due to hydrostatic pressure equals the weight of the fluid displaced and acts vertically upward through the centre of mass of the displaced fluid.

## 5. Worked examples

**Example 1 — Rectangular block**
*Given:* A 0.2 m × 0.2 m × 0.5 m steel block is lowered so its bottom face is 3 m below the water surface; water density \(\rho = 1000\) kg m\(^{-3}\).  
*Find:* Net buoyant force.  

Bottom pressure: \(P_b = 1000 \times 9.81 \times 3.5 = 34{,}335\) Pa.  
Top pressure: \(P_t = 1000 \times 9.81 \times 3.0 = 29{,}430\) Pa.  
Area of each face: \(A = 0.04\) m².  
Net force: \((P_b - P_t)A = (4905)(0.04) = 196.2\) N upward.  

*Why:* The pressure difference is exactly \(\rho g \times\) height of block; multiplying by area recovers \(\rho g V\).  

**Final answer**  
**196.2 N upward**

*Reflection:* The calculation never needed the material density—only geometry and immersion depth—showing buoyancy depends solely on displaced volume.

**Example 2 — Sphere**
*Given:* A 0.1 m radius sphere is fully submerged.  
*Find:* Buoyant force.  

Volume \(V = \frac{4}{3}\pi r^3 = 4.1888 \times 10^{-3}\) m³.  
Buoyancy \(F_b = 1000 \times 9.81 \times 4.1888 \times 10^{-3} = 41.1\) N.  

*Why:* The integral over the spherical surface reduces to the enclosed volume regardless of shape.

**Final answer**  
**41.1 N upward**

*Reflection:* Demonstrates that the derivation is geometry-independent once the volume is known.

**Example 3 — Partially submerged cylinder**
*Given:* A vertical cylinder of cross-section 0.01 m² floats with 0.3 m submerged in water.  
*Find:* Weight of the cylinder.  

At equilibrium, weight equals buoyancy:  
\(W = \rho g V_\text{disp} = 1000 \times 9.81 \times 0.01 \times 0.3 = 29.43\) N.  

*Why:* Only the submerged portion contributes to the pressure integral.

**Final answer**  
**29.43 N**

*Reflection:* The same pressure-difference logic works for floating bodies; the immersed volume self-adjusts until \(F_b = mg\).

**Example 4 — Apparent weight in accelerating elevator**
*Given:* A beaker containing water and a submerged object sits in an elevator accelerating upward at \(a = 2\) m s\(^{-2}\).  
*Find:* New buoyant force.  

Effective \(g_\text{eff} = g + a\).  
\(F_b' = \rho V g_\text{eff} = 1.2 \times\) original buoyancy.  

*Why:* The pressure gradient itself becomes \(\rho g_\text{eff}\), exactly as the derivation predicts when gravity is replaced by the non-inertial acceleration.

**Final answer**  
**1.2 times the original buoyant force**

*Reflection:* Shows the derivation is local and survives changes of reference frame.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using atmospheric pressure instead of gauge pressure | Students forget that the constant \(P_0\) integrates to zero over a closed surface | Always drop \(P_0\) before integrating |
| Reversing the sign of the buoyant force | Confusing the direction of \(d\mathbf{A}\) (outward vs inward normal) | Remember pressure pushes inward, so force on body is \(-\int P\,d\mathbf{A}\) |
| Applying the formula to compressible fluids without correction | Density \(\rho\) is taken constant while it actually varies | Check Mach number or use barotropic relation first |
| Forgetting that only the submerged volume counts | Visualising the whole object instead of the displaced part | Draw the free surface and shade only the wetted region |
| Ignoring surface tension on small objects | Capillary forces become comparable to \(\rho V g\) for mm-scale bodies | Compare Bond number; if \(\ll 1\), add capillary term separately |
| Using weight of the body instead of displaced fluid | Mixing up equilibrium condition with the definition of buoyancy | Write two separate equations: buoyancy = \(\rho_\text{fluid} V g\) and weight = \(m_\text{body} g\) |
| Misidentifying the centre of buoyancy | Assuming it coincides with geometric centre for non-uniform shapes | Locate centroid of the displaced volume, not of the solid |

## 7. The textbook-precise statement
Let \(\Omega\) be a bounded domain in \(\mathbb{R}^3\) with piecewise smooth boundary \(\partial\Omega\) immersed in an incompressible fluid of constant density \(\rho\) whose pressure satisfies \(\nabla P = -\rho g\,\mathbf{k}\). Then the hydrostatic force exerted by the fluid on the body is
\[
\mathbf{F} = -\int_{\partial\Omega} P\,\mathbf{n}\,dA = \rho g V\,\mathbf{k},
\]
where \(V = \text{vol}(\Omega)\) and \(\mathbf{k}\) is the upward unit vector. (See Kundu, Cohen & Dowling, *Fluid Mechanics*, 6e, §4.3, eq. 4.3.12.)

## 8. Visual — diagram or schematic
```
          Free surface (P = P0)
                 --------------------
                 |                  |
                 |      ↑ F_b       |
          z ↑    |   +----------+   |
            |    |   |          |   |
            |    |   |  Body    |   |
            |    |   |   Ω      |   |
            |    |   +----------+   |
            |    |                  |
            |    |  P = P0 + ρg(h-z)|
           -+----+-------------------
                 Pressure increases downward
```
The diagram shows a closed body \(\Omega\) whose lower surface sits at greater depth and therefore experiences higher pressure; the resulting net force \(F_b\) points upward.

## 9. The memory technique
1. **The hook** — Picture a tiny diver inside a balloon; the water below pushes harder than the water above, so the balloon shoots upward exactly as if it were filled with the water that is missing.
2. **What to overlearn** — \(F_b = \rho V g\) (vector direction upward) and the pressure gradient \(\frac{dP}{dz} = -\rho g\).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from \(\nabla P = -\rho g\,\mathbf{k}\), integrate over any closed surface, interchange the volume integral; the result must be \(\rho V g\) upward.

## 10. What this unlocks
You can now derive the stability of floating bodies (metacentric height), compute the torque on submerged gates, and analyse the propulsion of jellyfish or the ascent of rocket propellant tanks under microgravity. The same pressure-integral technique reappears in aerodynamics as the origin of lift when the flow is steady and inviscid.

- Next: Stability of floating bodies and metacentric height
- Next: Pressure forces on plane and curved surfaces
- Next: Introduction to potential flow and d’Alembert’s paradox

## 11. Self-check — five questions, no answers
1. A cube of side 0.1 m is suspended so that its top face lies exactly at the free surface; derive the buoyant force without assuming the formula.
2. An object hangs from a spring scale in air, then in water, then in glycerine; rank the three scale readings and justify using only the pressure gradient.
3. A helium balloon is tied inside an accelerating car; does it lean forward or backward? Explain via the effective gravity vector.
4. A student claims buoyancy on a fully submerged sphere is \(\rho g \times \frac{4}{3}\pi r^3\) only if the sphere is at rest; is the claim correct? Why or why not?
5. Two identical beakers contain the same volume of water; one has a floating wooden block, the other has a submerged iron block held by a string. In which beaker is the water level higher?