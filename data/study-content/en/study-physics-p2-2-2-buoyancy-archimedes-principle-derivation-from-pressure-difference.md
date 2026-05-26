## 1. The one-sentence answer
**Buoyancy arises because hydrostatic pressure increases linearly with depth, producing a net upward force on any submerged body equal to the weight of the fluid it displaces.**

Consider a solid object placed in a liquid at rest. The liquid exerts normal force on every face of the object. Because pressure at a given depth is the same in all directions yet grows strictly with depth, the force on the lower surfaces exceeds the force on the upper surfaces. Horizontal forces cancel in pairs. The resulting imbalance is the buoyant force.

This imbalance can be computed without knowing the object’s shape: integrate the pressure over the entire surface. The integral reduces exactly to the weight of the fluid whose volume equals the volume enclosed by that surface.

> [!NOTE]
> The buoyant force depends only on the displaced volume and the fluid density; the object’s own density or material never enters the derivation until one compares weights to decide whether the object sinks or floats.

## 2. Why this matters — concrete and current
SpaceX recovers Falcon 9 first stages by guiding them onto drone ships; the legs must remain above the waterline while the vehicle is still heavy with residual propellant. Engineers therefore verify that the stage’s average density after landing remains below seawater density, a direct application of Archimedes’ principle.

The James Webb Space Telescope’s sunshield was tensioned and tested in a 1-g neutral-buoyancy tank at NASA Goddard. Technicians adjusted lead weights until the net force and torque on each membrane segment matched the zero-g condition, allowing realistic deployment rehearsals.

Semiconductor foundries use megasonic cleaning baths in which silicon wafers are held at precise submersion depths. The upward buoyant force on each wafer must be known to within 0.1 % so that robotic end-effectors apply the correct normal load and avoid micro-scratches.

Oceanographic floats such as the Argo array adjust their volume by pumping oil into an external bladder. The change in displaced volume alters buoyancy until the float reaches a target isopycnal surface; the control law is written directly from the pressure-difference derivation.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Hydrostatic pressure     | \(p = p_0 + \rho g h\) supplies the depth-dependent force |
| Surface integral of force| Net force equals \(\oint -p\,\mathbf{n}\,dA\)             |
| Volume integral identity | Divergence theorem converts surface integral to \(\rho g V\) |
| Vector area cancellation | Horizontal components on closed surfaces sum to zero      |

## 4. Building the idea — from intuition to formalism

### Step 1 — Pressure grows with depth
Pressure in an incompressible fluid increases linearly with depth because each additional layer of fluid must support the weight of everything above it.  
Example: at 10 m in fresh water the gauge pressure is already \(9.8 \times 10^4\) Pa.  
Formal statement:  
$$p(h) = p_0 + \rho g h.$$  
> [!WARNING]  
> Treating pressure as constant over the height of the object erases the net force entirely.

### Step 2 — Force on a surface element
The force on an infinitesimal patch is the local pressure acting normal to the surface and inward:  
$$d\mathbf{F} = -p\,\mathbf{n}\,dA.$$  
For a closed body the vector area element \(\mathbf{n}\,dA\) points outward by convention.

### Step 3 — Horizontal cancellation
Any two patches symmetric about a vertical axis experience equal pressures but opposite horizontal normals; their force contributions cancel. Only vertical components survive.

### Step 4 — Vertical force imbalance
On the bottom face the pressure is higher than on the top face by \(\rho g \Delta h\). The vertical component is therefore  
$$F_z = \int_{\text{bottom}} p\,dA - \int_{\text{top}} p\,dA.$$  
After cancellation of side contributions this difference equals \(\rho g\) times the enclosed volume.

### Step 5 — Application of the divergence theorem
The surface integral \(\oint p\,\mathbf{n}\,dA\) converts via \(\nabla p = \rho g\,\hat{z}\) into the volume integral  
$$\mathbf{F}_B = -\int_V \nabla p\,dV = -\rho g V\,\hat{z}.$$  
Hence  
$$F_B = \rho V g$$ upward—the textbook statement of Archimedes’ principle.

## 5. Worked examples — every step shown

**Example 1 — Cube of side \(a\) submerged in water**  
*Given:* Cube, side \(a = 0.2\) m, top face at depth \(h = 1.0\) m, \(\rho = 1000\) kg m\(^{-3}\).  
*Find:* Magnitude of buoyant force.  

Pressure on top: \(p_t = \rho g h\).  
*Why:* Direct use of hydrostatic law.  

Pressure on bottom: \(p_b = \rho g (h + a)\).  
*Why:* Depth increased by side length \(a\).  

Net force: \(F_B = (p_b - p_t)a^2 = \rho g a \cdot a^2\).  
*Why:* Side forces cancel by symmetry.  

**\(\mathbf{F}_B = 78.4\,\text{N}\) upward**

*Reflection:* The result is independent of \(h\), showing buoyancy cares only about displaced volume.

**Example 2 — Sphere of radius \(R\)**  
*Given:* Solid sphere, radius \(R\).  
*Find:* Buoyant force when fully submerged.  

Surface integral reduces by symmetry to vertical component only.  
Using the divergence theorem directly yields \(F_B = \rho g \cdot \frac{4}{3}\pi R^3\).  
*Why:* Volume of sphere is standard.  

**\(\mathbf{F}_B = \frac{4}{3}\pi R^3 \rho g\) upward**

*Reflection:* Shape independence appears once the volume integral is invoked.

**Example 3 — Partially submerged wooden block**  
*Given:* Rectangular block, base area \(A\), height \(H\), density \(\rho_w < \rho_f\).  
*Find:* Equilibrium submersion depth \(d\).  

Weight equals buoyancy at equilibrium:  
\(\rho_w A H g = \rho_f A d g\).  
*Why:* Net force zero when magnitudes match.  

**\(d = (\rho_w / \rho_f) H\)**

*Reflection:* The same pressure-difference argument applies at the waterline; only the submerged volume counts.

**Example 4 — Balloon in layered atmosphere**  
*Given:* Helium balloon volume \(V(z)\) that changes with altitude because external pressure drops.  
*Find:* Condition for neutral buoyancy.  

Set \(\rho_{\text{He}}(z) V(z) g = \rho_{\text{air}}(z) V(z) g\).  
*Why:* Local densities and local displaced volume must balance.  

**Neutral equilibrium occurs wherever \(\rho_{\text{He}}(z) = \rho_{\text{air}}(z)\)**

*Reflection:* The derivation still holds locally even when density varies, provided the balloon is small compared with the scale height.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using gauge pressure on only one face | Forgetting that atmospheric pressure acts everywhere | Always integrate the full pressure field            |
| Forgetting that sides cancel      | Visualising only top and bottom                     | Draw closed surface and pair opposite normals       |
| Applying \(\rho g V\) to open containers | Treating “displaced” volume as ambiguous            | Define displaced volume strictly as volume below free surface enclosed by object |
| Confusing buoyant force with net force | Adding object weight too early                      | Compute buoyancy first, then compare with weight    |
| Assuming fluid must be incompressible | Real liquids are slightly compressible              | Note that derivation uses only local \(\nabla p = \rho g \hat z\); compressibility enters only if \(\rho\) varies |
| Sign error on direction           | Mis-defining outward normal                         | Consistently use outward normal and minus sign      |
| Ignoring free-surface deformation | Large objects create their own waves                | Restrict analysis to objects small compared with capillary length |

## 7. The textbook-precise statement
**Archimedes’ principle (fluid statics).**  
Let \(\Omega\) be a bounded region in \(\mathbb{R}^3\) occupied by an object immersed in an incompressible fluid of constant density \(\rho\). The fluid is at rest under gravity \(\mathbf{g} = -g\hat{z}\). The pressure satisfies \(\nabla p = \rho\mathbf{g}\) inside the fluid. Then the total force exerted by the fluid on the boundary \(\partial\Omega\) is  
$$\mathbf{F}_B = -\oint_{\partial\Omega} p\,\mathbf{n}\,dA = \rho g V(\Omega)\,\hat{z},$$  
where \(\mathbf{n}\) is the outward unit normal and \(V(\Omega)\) is the volume of \(\Omega\). (See Batchelor, *An Introduction to Fluid Dynamics*, §1.3.)

## 8. Visual — diagram or schematic
```text
          Free surface
   -----------------------------  z = 0
               p = p_atm
          ↑  F_top = p_top * A
   +------+   top face at depth h
   |      |   
   | cube |   pressure rises with depth
   |      |   
   +------+   bottom face at depth h+a
          ↓  F_bottom = p_bottom * A   (larger)
   Net F_B = F_bottom - F_top upward
```
The diagram shows a cube with top and bottom faces labelled; side faces omitted because their net contribution is zero. Depth coordinate increases downward.

## 9. The memory technique
1. **The hook** — Picture a stack of invisible bricks; each deeper brick presses harder. The object simply “feels” more bricks pushing up from below than from above.
2. **What to overlearn** — \(F_B = \rho V g\) (vector upward) and the statement that only displaced volume matters.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive from \(\nabla p = \rho g \hat z\) and the divergence theorem whenever the formula feels shaky.

## 10. What this unlocks
Archimedes’ principle is the foundation for hydrostatic stability analysis, floating-body dynamics, and the design of variable-buoyancy systems.  

- Metacentric height and roll stability of ships  
- Submarine depth control and hover  
- Hot-air balloon altitude regulation  
- Acoustic levitation and bubble dynamics in liquids  
- Derivation of the added-mass tensor for bodies accelerating through fluids

## 11. Self-check — five questions, no answers
1. A cube of side 10 cm rests with its top face 20 cm below the free surface of mercury (\(\rho = 13600\) kg m\(^{-3}\)). Compute the buoyant force.  
2. Why does a helium balloon rise in air yet sink in a sealed, helium-filled chamber?  
3. A boat in a swimming pool throws a dense iron anchor overboard. Does the water level of the pool rise, fall, or stay the same?  
4. An inverted empty glass is pushed mouth-down into water until its rim is 30 cm below the surface. What is the buoyant force if the glass volume is 500 cm³?  
5. Identify the hidden assumption that would make the standard derivation of \(F_B = \rho V g\) invalid for a submarine hovering at 3000 m depth.