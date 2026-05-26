## 1. The one-sentence answer
**Bernoulli's equation is obtained by integrating Newton's second law along a streamline for an inviscid fluid parcel.**

Consider a small fluid element moving along a curved path. The only forces acting in the tangential direction are the pressure difference across its ends and the component of gravity. Newton's second law then states that the net tangential force equals mass times tangential acceleration. Because the velocity changes only along the path, the acceleration reduces to the convective term \(v \frac{dv}{ds}\). Substituting the forces and rearranging yields an exact differential that integrates immediately to a constant.

The result connects pressure, speed, and height without invoking energy conservation explicitly; it is simply the tangential component of \(F=ma\) written in Eulerian form and integrated once.

> [!NOTE]
> The constant is constant only along one streamline; different streamlines generally carry different values unless the flow is also irrotational.

## 2. Why this matters — concrete and current
In the design of the Merlin 1D rocket engine, the Bernoulli relation supplies the first estimate of chamber pressure required to reach a chosen throat Mach number before full Navier–Stokes simulation is run.  

During SpaceX Falcon 9 re-entry, the pressure ports on the interstage measure local static pressure; the same relation converts those readings into freestream velocity for real-time angle-of-attack corrections.  

In the compressor test rigs at NASA Glenn, researchers apply the integrated streamline form to calibrate five-hole probes, obtaining total pressure directly from measured static pressure and velocity vectors without traversing an entire radial line.  

Atmospheric scientists tracking mountain-wave rotors over the Andes use the same equation to infer vertical velocity from radiosonde pressure and temperature once horizontal speed is known from GPS, closing the continuity check within 2 %.  

Semiconductor CVD reactors employ the relation to set the laminar shower-head flow speed so that precursor residence time remains uniform across 300 mm wafers, reducing thickness variation below 1 %.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Streamline definition    | Acceleration is evaluated only in the tangential direction; normal accelerations are balanced by pressure gradients perpendicular to the streamline. |
| Material derivative      | The acceleration of a fluid particle contains the convective term \(v \partial v / \partial s\) that must be substituted into \(F=ma\). |
| Inviscid-flow assumption | Zero shear stress removes the viscous term, leaving only pressure and body forces in the tangential momentum balance. |
| Incompressible or barotropic relation | Allows density to be treated as constant or a function of pressure alone so the pressure integral closes. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Isolate the tangential direction
A fluid particle travels along a streamline; only the component of force parallel to the local velocity vector changes its speed. All perpendicular forces merely curve the path.  
Consider a short segment of a garden hose lying on a table: water speeds up only when the cross-section narrows, not when the hose bends.  
The unit tangent vector \(\mathbf{s}\) therefore projects every vector equation onto a scalar ODE along the path:  
\[
\frac{Dv}{Dt}\Big|_{\text{tangential}} = a_s.
\]

> [!WARNING]
> Treating the full vector acceleration instead of its tangential projection mixes centripetal terms that have nothing to do with speed change and prevents clean integration.

### Step 2 — Write the tangential acceleration
In Eulerian coordinates the tangential acceleration of a steady flow is the convective derivative  
\[
a_s = v \frac{\partial v}{\partial s}.
\]
A parcel moving at 3 m/s through a nozzle whose speed rises 1 m/s per metre experiences 3 m/s² tangential acceleration.  
Thus  
\[
a_s = v \frac{dv}{ds}.
\]

> [!WARNING]
> Omitting the chain-rule step and writing \(\partial v/\partial t\) alone misses the entire convective contribution in steady flow.

### Step 3 — Evaluate tangential forces
Pressure acts on the two ends of a small cylindrical element of length \(ds\) and cross-section \(dA\); the net force is \(-\frac{\partial p}{\partial s} ds\, dA\). Gravity contributes \(-\rho g \frac{\partial z}{\partial s} ds\, dA\). No shear exists for an inviscid fluid.  
The mass of the element is \(\rho\, ds\, dA\). Newton's second law therefore reads  
\[
-\frac{\partial p}{\partial s} - \rho g \frac{\partial z}{\partial s} = \rho v \frac{dv}{ds}.
\]

> [!WARNING]
> Retaining a viscous term at this stage produces a non-integrable equation and destroys the simple Bernoulli constant.

### Step 4 — Rearrange into an exact differential
Multiply through by \(ds\) and divide by \(\rho\):  
\[
\frac{1}{\rho} dp + g\, dz + v\, dv = 0.
\]
Each term is now an exact differential along the streamline.

### Step 5 — Integrate along the streamline
For constant density the integrals are immediate:  
\[
\frac{p}{\rho} + gz + \frac{v^2}{2} = C,
\]
where \(C\) is constant along any single streamline. This is Bernoulli's equation.

## 5. Worked examples — every step shown

**Example 1 — Horizontal tube of varying diameter**  
*Given:* Water (\(\rho=1000\) kg m\(^{-3}\)) flows steadily through a horizontal tube; pressure at section 1 is 200 kPa, speed \(v_1=2\) m s\(^{-1}\).  
*Find:* Pressure at section 2 where \(v_2=5\) m s\(^{-1}\).  

Apply Bernoulli along the streamline:  
\[
\frac{p_1}{\rho} + \frac{v_1^2}{2} = \frac{p_2}{\rho} + \frac{v_2^2}{2}.
\]  
*Why:* \(z\) is constant and the constant cancels.  
Substitute numbers:  
\[
\frac{200000}{1000} + \frac{4}{2} = \frac{p_2}{1000} + \frac{25}{2} \implies 204 = \frac{p_2}{1000} + 12.5.
\]  
\[
p_2 = 191.5\,\text{kPa}.
\]  
**191.5 kPa**  

*Reflection:* The example isolates the pressure–velocity trade-off without gravitational work; the same algebra appears inside a rocket feed line.

**Example 2 — Tank draining through a small orifice**  
*Given:* Large open tank, water surface at height \(H=2\) m above orifice.  
*Find:* Exit speed.  

Surface: \(p=\) atm, \(v\approx0\). Orifice: \(p=\) atm.  
\[
gz_1 = \frac{v_2^2}{2} \implies v_2 = \sqrt{2gH}.
\]  
**\(v_2 = \sqrt{2\times9.81\times2}\approx6.26\) m s\(^{-1}\)**  

*Reflection:* Torricelli's theorem is simply Bernoulli evaluated between free surface and vena contracta.

**Example 3 — Pitot tube in air**  
*Given:* Air \(\rho=1.2\) kg m\(^{-3}\), pitot measures 250 Pa dynamic pressure.  
*Find:* Flight speed.  

\[
\frac{1}{2}\rho v^2 = 250 \implies v = \sqrt{\frac{500}{1.2}}\approx20.4\,\text{m s}^{-1}.
\]  
**20.4 m s\(^{-1}\)**  

*Reflection:* The measurement works because the streamline stagnates isentropically at the nose; total pressure is the Bernoulli constant.

**Example 4 — Streamline connecting two points at different heights and speeds**  
*Given:* \(\rho=1000\), \(p_1=150\) kPa, \(v_1=3\) m s\(^{-1}\), \(z_1=0\); \(p_2=120\) kPa, \(v_2=4\) m s\(^{-1}\), \(z_2=1.5\) m.  
*Find:* Verify consistency.  

Left side: \(150000/1000 + 9/2 + 9.81\times0 = 154.5\).  
Right side: \(120000/1000 + 16/2 + 9.81\times1.5 = 134.715\).  
Difference indicates either measurement error or that the points do not lie on the same streamline.  

*Reflection:* The check forces explicit recognition that the constant belongs to one streamline only.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Applying the same constant across streamlines | Students assume irrotationality without stating it | Label each streamline with its own \(C\) until vorticity is shown to be zero |
| Using \(\partial v/\partial t\) instead of \(v dv/ds\) | Confusing unsteady and convective acceleration | Always write the material derivative along the path first |
| Forgetting that density must be constant or barotropic | Integration step fails otherwise | State the barotropic condition before integrating |
| Including viscous losses inside the derivation | The force balance is written for an inviscid element | Keep the inviscid assumption explicit until the integral is finished |
| Treating \(p/\rho + gz + v^2/2\) as mechanical energy per unit mass without justification | The equation looks like energy but was derived from momentum | Re-derive from \(F=ma\) each time until the link is automatic |
| Neglecting that the tube must be a streamline | Pressure taps not on the same streamline give inconsistent readings | Trace the actual streamline connecting measurement points |
| Applying the equation to compressible gas without correction | Density changes along the streamline | Use the isentropic relation or the compressible form |

## 7. The textbook-precise statement
For an inviscid fluid of constant density \(\rho\) in steady flow, the tangential component of the Euler equation along any streamline reduces to  
\[
v\frac{dv}{ds} = -\frac{1}{\rho}\frac{dp}{ds} - g\frac{dz}{ds}.
\]  
Integration yields the Bernoulli constant  
\[
\frac{p}{\rho} + \frac{v^2}{2} + gz = C(\text{streamline}).
\]  
(White, *Fluid Mechanics*, 8e, §3.5, eq. 3.18.)

## 8. Visual — diagram or schematic
```text
          streamline
   s → •───────────────•───────────────•
       |               |               |
       p, v, z         p+dp, v+dv      p+2dp, v+2dv
       ds              ds
       element length ds, area dA
Gravity component: −ρ g (dz/ds) ds dA
Pressure net force: −(dp/ds) ds dA
Mass: ρ ds dA
F_s = m a_s  ⇒  −dp − ρ g dz = ρ v dv   (after dividing by dA)
```

## 9. The memory technique
1. **The hook** — Picture a tiny bead of water sliding down a curved wire; the only thing that changes its speed is the pressure push from behind and gravity; the wire itself supplies the sideways force that bends the path.  
2. **What to overlearn** — The differential form \(v\,dv + dp/\rho + g\,dz = 0\) and the integrated constant along one streamline.  
3. **Spaced-repetition schedule** — Review the differential form after 1 day, the integration after 3 days, a worked rocket-nozzle example after 7 days, and a multi-streamline comparison after 16 and 35 days.  
4. **First-principles fallback** — Start from the tangential projection of \(\rho Dv/Dt = -\nabla p - \rho g \nabla z\), insert the convective acceleration, and integrate.

## 10. What this unlocks
Bernoulli's relation supplies the pressure–velocity coupling required for every subsequent integral analysis of inviscid flow.  
- Circulation and Kelvin's theorem  
- Velocity potential and Laplace's equation for irrotational flow  
- Lift on a 2-D aerofoil via Kutta–Joukowski  
- Rocket nozzle performance maps before CFD  
- Hydraulic jump and open-channel relations

## 11. Self-check — five questions, no answers
1. A streamline in water curves sharply; at the point of maximum curvature the local pressure is 50 kPa below the value predicted by Bernoulli. What physical mechanism was omitted?  
2. Derive the differential form of Bernoulli's equation starting from the tangential Euler equation in orthogonal curvilinear coordinates.  
3. Two pitot tubes are placed on different streamlines inside a non-uniform jet. Their stagnation pressures differ by 300 Pa. Is this possible for steady inviscid incompressible flow? Explain.  
4. A Venturi meter is installed in a vertical pipe carrying oil. The throat lies 0.8 m above the inlet. If the measured pressure drop is 12 kPa and density is 850 kg m\(^{-3}\), calculate the velocity at the throat when inlet velocity is 1.5 m s\(^{-1}\).  
5. Show that the Bernoulli constant \(C\) is identical for every streamline if and only if the vorticity is zero.