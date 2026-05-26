## 1. The one-sentence answer
**Hydrostatic pressure equals the weight per unit area of the fluid column above a point, giving \( p = \rho g h \) for constant density.**

A fluid at rest transmits force only through normal pressure. Imagine slicing the fluid horizontally: the slice cannot accelerate, so net vertical force on it must vanish. The only forces are pressure from above, pressure from below, and the slice’s own weight. Balancing these forces immediately produces a linear rise of pressure with depth.

The same balance holds for any horizontal area. Because pressure acts equally in all directions at a point, the result is independent of the shape of the container or the orientation of the surface.

> [!NOTE]
> The “h” in \(\rho g h\) is measured vertically; slant height or path length through the fluid does not appear.

## 2. Why this matters — concrete and current
SpaceX measures ullage pressure in Falcon 9 propellant tanks with sensors calibrated against the exact \(\rho g h\) head of liquid oxygen; a 10 cm error in level corresponds to a 1.14 kPa offset that must be subtracted before engine start.

Civil engineers sizing the 57 m deep Grand Ethiopian Renaissance Dam stilling basin use the same relation to set the thickness of the concrete apron that resists uplift pressures reaching 560 kPa.

Oceanographers deploying Argo floats convert measured pressure at 2000 m into depth using the UNESCO equation of state; the leading term remains \(\rho g h\) with a small compressibility correction of order 1 %.

Semiconductor wet benches maintain photoresist filtration at 20–30 kPa gauge; the height of the resist column above the filter is deliberately chosen so that \(\rho g h\) supplies the required head without pumps that could introduce bubbles.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Density \(\rho\) | Converts volume to mass; appears directly in weight       |
| Force balance    | Equilibrium of a fluid element supplies the differential equation |
| Constant g       | Treats gravity as uniform over laboratory or tank scales  |
| Incompressible flow | Allows \(\rho\) to be taken outside the integral         |

## 4. Building the idea — from intuition to formalism

### Step 1 — A static fluid cannot sustain shear
A fluid element at rest experiences only normal forces from surrounding pressure. Any shear would produce continuous deformation, contradicting the static condition.  
**Formal statement:** The stress tensor reduces to \(-p \mathbf{I}\).  
> [!WARNING]  
> Treating the fluid as able to support shear leads to the erroneous conclusion that pressure can vary horizontally.

### Step 2 — Isolate a thin vertical slab
Cut a vertical cylinder of cross-section \(A\) and height \(dh\) from the fluid. The cylinder’s weight is \(\rho g A\, dh\).  
**Formal statement:**  
\[
dW = \rho g A\, dh
\]

### Step 3 — Write vertical force balance
Pressure on the bottom face pushes upward with force \(p(z+dh)A\); pressure on the top pushes downward with \(p(z)A\). Net force plus weight equals zero.  
**Formal statement:**  
\[
p(z+dh)A - p(z)A - \rho g A\, dh = 0
\]

### Step 4 — Take the continuum limit
Divide by \(A\, dh\) and let \(dh \to 0\):  
\[
\frac{dp}{dz} = -\rho g
\]

### Step 5 — Integrate for constant density
Separate variables and integrate from the free surface (\(z=0\), \(p=p_\text{atm}\)) to depth \(h\):  
\[
\int_{p_\text{atm}}^{p} dp = -\rho g \int_0^h dz \implies p = p_\text{atm} + \rho g h
\]

## 5. Worked examples — every step shown

**Example 1 — Gauge pressure at 3 m depth in water**  
*Given:* \(\rho = 1000\,\text{kg m}^{-3}\), \(h = 3\,\text{m}\), \(g = 9.81\,\text{m s}^{-2}\).  
*Find:* Gauge pressure.  
Step 1: \(p_\text{gauge} = \rho g h\).  
*Why:* Gauge pressure is defined as absolute pressure minus atmospheric pressure; the derivation already isolates the \(\rho g h\) term.  
**\( 29430\,\text{Pa} \)**  
*Reflection:* The arithmetic is trivial; the conceptual move is recognizing that only vertical depth enters.

**Example 2 — Oil–water interface**  
*Given:* 2 m layer of oil (\(\rho_o = 800\,\text{kg m}^{-3}\)) above water (\(\rho_w = 1000\,\text{kg m}^{-3}\)), total depth 5 m.  
*Find:* Pressure 5 m below the free surface.  
Step 1: Pressure after oil layer = \(\rho_o g \cdot 2\).  
*Why:* Apply the integrated result across the oil column.  
Step 2: Add water contribution = \(\rho_w g \cdot 3\).  
*Why:* Continue the integration across the second constant-density layer.  
**\( 4.51 \times 10^4\,\text{Pa} \)**  
*Reflection:* When density jumps, integrate piecewise; pressure remains continuous at the interface.

**Example 3 — U-tube manometer deflection**  
*Given:* Mercury (\(\rho = 13600\,\text{kg m}^{-3}\)) deflection \(h = 0.25\,\text{m}\).  
*Find:* Pressure difference.  
Step 1: Both legs open to atmosphere at the top; the difference equals \(\rho g h\).  
*Why:* The derivation is applied between the two free surfaces.  
**\( 33354\,\text{Pa} \)**  
*Reflection:* Manometer reading directly supplies the hydrostatic head regardless of tube inclination.

**Example 4 — Variable-density ocean profile**  
*Given:* Linear density increase \(\rho(z) = \rho_0(1 + \alpha z)\), \(\alpha = 5 \times 10^{-4}\,\text{m}^{-1}\), depth 1000 m.  
*Find:* Pressure at 1000 m.  
Step 1: Solve \(\frac{dp}{dz} = -\rho(z)g\).  
*Why:* Density is no longer constant; the differential equation must be integrated directly.  
Step 2: \(p = p_\text{atm} + \rho_0 g \int_0^h (1 + \alpha z)\, dz\).  
*Why:* Substitute the linear profile and integrate term by term.  
**\( 1.013 \times 10^7\,\text{Pa} \)** (including small correction)  
*Reflection:* The constant-density formula is the first-order term of a more general integral.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using slant height instead of vertical depth | Confusing path length with gravitational potential | Always measure \(h\) along the gravity vector |
| Forgetting gauge vs absolute | Mixing reference pressures                  | State the reference surface explicitly       |
| Applying \(\rho g h\) to compressible gases | Density changes appreciably with pressure   | Check \(\Delta\rho/\rho \ll 1\) first        |
| Assuming pressure is isotropic in flowing fluids | Forgetting the derivation assumes \(\mathbf{v}=0\) | Verify static condition before use           |
| Neglecting atmospheric contribution | Treating the surface as vacuum              | Subtract \(p_\text{atm}\) when gauge pressure is required |
| Placing the origin at the bottom | Sign error in the differential equation     | Fix the free surface at \(z=0\) and integrate downward |
| Ignoring temperature stratification | Density varies with \(T\) as well as depth  | Use local \(\rho(T,p)\) when gradients exceed 1 % |

## 7. The textbook-precise statement
For an incompressible fluid of constant density \(\rho\) in a uniform gravitational field \(g\), the pressure increase with depth \(h\) measured vertically downward from a free surface at pressure \(p_0\) is exactly  
\[
p = p_0 + \rho g h.
\]
This follows at once from \(\nabla p = \rho\mathbf{g}\) integrated along any vertical path (Batchelor, *An Introduction to Fluid Dynamics*, §1.3).

## 8. Visual — diagram or schematic
```text
          free surface  p = p_atm
                 |
                 |  h = 0
                 v
          ------------------  z = 0
                 |
                 |  depth h
          fluid  |
          column |
                 |
          ------------------  z = -h
                 |
                 v  p = p_atm + ρ g h
```
Vertical coordinate \(z\) increases upward; pressure increases linearly downward.

## 9. The memory technique
**The hook** — picture a stack of identical books; each added book increases the pressure on the table by its weight per unit area. Depth is simply the number of books.

**What to overlearn**  
- \( p = \rho g h \) (gauge)  
- \(\frac{dp}{dz} = -\rho g\) (differential form)  
- \(h\) is measured vertically.

**Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — redraw the vertical fluid element, set net force to zero, recover the differential equation, integrate.

## 10. What this unlocks
Mastery of \(\rho g h\) is the direct gateway to buoyancy via Archimedes’ principle, to the hydrostatic term in Bernoulli’s equation, and to the pressure boundary conditions used in computational fluid dynamics for free-surface flows.

- Archimedes’ principle and metacentric stability  
- Derivation of Bernoulli’s equation along a streamline  
- Manometer and piezometer design  
- Initial conditions for Navier–Stokes solvers with hydrostatic pressure

## 11. Self-check — five questions, no answers
1. A tank contains two immiscible liquids of densities \(\rho_1\) and \(\rho_2\). Derive the pressure at depth \(h_2\) in the lower liquid.  
2. Why does the pressure at a given depth remain unchanged when the container is tilted?  
3. A diver measures 300 kPa absolute at 20 m in seawater (\(\rho = 1025\,\text{kg m}^{-3}\)). What is the local atmospheric pressure?  
4. Identify the hidden assumption that fails when the same formula is applied to the Earth’s atmosphere above 10 km.  
5. A U-tube contains water on one side and oil on the other. The oil column is 0.4 m higher than the water column. Find the density of the oil if the pressure difference between the two free surfaces is zero.