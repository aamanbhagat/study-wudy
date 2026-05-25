## What it is
A sandwich structure is a composite structural element consisting of two thin, stiff, high-strength face sheets attached to a thick, lightweight, low-density core. The face sheets carry in-plane loads and bending moments (as tension and compression), while the core maintains the distance between the face sheets, carries transverse shear loads, and prevents the face sheets from buckling.

## Why it matters
In aerospace, mass is your most expensive constraint. Sandwich panels (typically carbon fiber face sheets over an aluminum honeycomb or foam core) offer an exceptionally high bending-stiffness-to-weight ratio. They form the backbone of satellite buses, rocket payload fairings, and aircraft floorboards. Understanding them is the bridge between basic mechanics of materials and advanced lightweight structural engineering.

## When to study it
Do not attempt this until you have mastered:
1. **Statics:** Free body diagrams, shear and moment diagrams.
2. **Mechanics of Materials:** Euler-Bernoulli beam theory, the parallel axis theorem, second moment of area ($I$), normal bending stress ($\sigma = \frac{My}{I}$), and transverse shear stress ($\tau = \frac{VQ}{It}$).

If you cannot derive the bending stress distribution of a solid rectangular beam from first principles, return to Mechanics of Materials.

## How to study it (step by step)
1. **Review the I-beam:** Recognize that a sandwich panel is conceptually just an extruded I-beam. The face sheets act as the flanges; the core acts as the web.
2. **Derive the Area Moment of Inertia ($I$):** Use the parallel axis theorem on two thin rectangles separated by a core. Ignore the core's contribution to bending.
3. **Analyze Normal Stress:** Calculate the tension and compression in the face sheets under a bending moment $M$.
4. **Analyze Shear Stress:** Calculate the shear stress $\tau$ in the core under a transverse shear force $V$. Understand why shear is assumed constant across the core thickness.
5. **Study Failure Modes:** Map out the distinct ways this structure fails: face yielding, core shear failure, face wrinkling (local buckling), and intra-cell dimpling.

## Key ideas, with intuition

**1. The Geometry of Stiffness**
Bending stiffness is the product of the material's Young's Modulus $E$ and the cross-section's second moment of area $I$. To maximize $I$ for a given mass, you must move material as far away from the neutral axis as possible, because $I$ scales with the square of the distance from the neutral axis ($y^2$). The core's primary job is simply to hold the stiff face sheets far apart.

**2. Bending Stiffness ($D$)**
Consider a sandwich panel of width $b$. The face sheets have thickness $t_f$ and Young's modulus $E_f$. The core has thickness $c$. The distance between the mid-planes of the face sheets is $h = c + t_f$. 
By the parallel axis theorem, the second moment of area of the face sheets is:
$$ I = 2 \left( \frac{1}{12} b t_f^3 + (b t_f) \left(\frac{h}{2}\right)^2 \right) $$
Because the face sheets are thin ($t_f \ll h$), the $\frac{1}{12} b t_f^3$ term is negligible. Thus:
$$ I \approx \frac{b t_f h^2}{2} $$
The bending stiffness is $D = E_f I$. The core's modulus $E_c$ is usually so low it is ignored in bending.

**3. Core Shear**
When the panel bends, the face sheets want to slide past each other. The core prevents this by carrying transverse shear. Because the face sheets take almost all the bending normal stress, the shear stress $\tau$ in the core is roughly constant through its thickness:
$$ \tau_c \approx \frac{V}{b h} $$
where $V$ is the applied shear force.

## Worked example
**Problem:** Prove the mass-efficiency of a sandwich panel. Compare the bending stiffness of a solid aluminum plate of thickness $2t$ to a sandwich panel with two aluminum face sheets each of thickness $t$, separated by a weightless core of thickness $c = 10t$. Both panels have width $b$.

**Step 1: Calculate $I$ for the solid plate.**
The solid plate has total thickness $h_{solid} = 2t$.
$$ I_{solid} = \frac{1}{12} b (2t)^3 = \frac{8}{12} b t^3 = \frac{2}{3} b t^3 $$

**Step 2: Calculate $I$ for the sandwich panel.**
The sandwich panel has face sheets of thickness $t$. The distance between their centroids is $h = c + t = 10t + t = 11t$.
Using the simplified formula for thin face sheets:
$$ I_{sw} \approx 2 \left( (bt) \left(\frac{11t}{2}\right)^2 \right) = 2 \left( bt \frac{121 t^2}{4} \right) = \frac{121}{2} b t^3 = 60.5 \, b t^3 $$

**Step 3: Compare.**
Because the core is assumed weightless, both panels contain exactly the same amount of aluminum ($2bt$) and therefore have the exact same mass.
$$ \frac{I_{sw}}{I_{solid}} = \frac{60.5 \, b t^3}{\frac{2}{3} b t^3} = 90.75 $$

**Reflection:** By simply inserting a lightweight core of thickness $10t$, we increased the bending stiffness by over 90 times without adding mass. This quadratic scaling with thickness is why spacecraft rely entirely on sandwich structures.

## Diagrams

```text
CROSS-SECTION                 STRESS DISTRIBUTIONS

      b                       Normal Stress (\sigma)   Shear Stress (\tau)
<----------->                 Compressive (-)          
============= ^ t_f           |\                       |
|           | |               | \                      |
|   CORE    | c      N.A. - - + - - - - - - - - - - -  |=================|
|           | |                \ |                     |                 |
|           | |                 \|                     |                 |
============= v t_f           Tensile (+)              |
                              (Core carries ~0         (Core carries ~all
                               bending stress)          shear stress)
```
*Note: The normal stress drops to near-zero in the core because $E_{core} \ll E_{face}$. The shear stress is parabolic in the solid face sheets but effectively constant across the core.*

## Memory technique — remember this forever
1. **Visual Hook:** Think of an ice cream sandwich. The cookies are dense and handle the tension/compression of your bite. The ice cream is thick, light, and handles the shear (if the ice cream melts, the cookies slide past each other). 
2. **Must-Overlearn Formulas:**
   * $I \approx \frac{b t_f h^2}{2}$ (Bending resistance)
   * $\tau_c \approx \frac{V}{b h}$ (Core shear stress)
3. **Spaced-Repetition Schedule:** Review this mental model and derive the formulas at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you forget the formula for $I$, draw two rectangles of area $A = bt_f$ separated by distance $h$. Apply the parallel axis theorem: $I = \Sigma (I_{local} + A d^2)$. Drop $I_{local}$ because it's tiny. $I = 2 \times (bt_f)(h/2)^2 = b t_f h^2 / 2$.

## Common mistakes
* **Ignoring transverse shear deformation:** In standard solid beams (Euler-Bernoulli), we assume plane sections remain plane and ignore shear deformation. Sandwich panels have very low shear moduli in the core ($G_c$), meaning the core actually deforms in shear significantly. You must often use Timoshenko beam theory to account for this added deflection.
* **Assuming the core carries bending moment:** Students often try to calculate $\frac{1}{12} b c^3$ for the core and add it to $I$. Because $E_{core}$ is usually orders of magnitude lower than $E_{face}$, its actual contribution to stiffness $D$ is effectively zero.
* **Forgetting local buckling:** You can make $h$ incredibly large to get infinite stiffness on paper, but eventually, the face sheets become so thin relative to the core cells that they wrinkle like aluminum foil under compression.

## Self-check
1. Derive the maximum normal stress $\sigma_{max}$ in the face sheets as a function of an applied bending moment $M$, width $b$, face thickness $t_f$, and centroid distance $h$.
2. A honeycomb core has a shear strength of $1.5 \text{ MPa}$. If a sandwich panel is $20 \text{ mm}$ thick (centroid-to-centroid) and $100 \text{ mm}$ wide, what is the maximum transverse shear force $V$ it can withstand before core failure?
3. Why is an aluminum honeycomb core highly anisotropic (different properties in different directions) in shear, whereas a foam core is generally isotropic? Think about the geometry of the hexagonal cells.