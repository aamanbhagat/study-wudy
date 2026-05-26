## 1. The one-sentence answer
**Gravitational potential energy between two masses is the scalar function \(U(r) = -GMm/r\) that stores the work done against the inverse-square gravitational force.**

This expression replaces the familiar \(mgh\) once separations become comparable to the radius of the attracting body. The inverse-distance dependence follows directly from integrating the force law; the negative sign is required so that \(U\) increases (approaches zero) as the masses separate to infinity. For separations much smaller than the source radius the Taylor expansion of \(-GMm/r\) recovers the linear \(mgh\) form, but the linear term is only the first-order local approximation.

The zero of potential is conventionally placed at infinite separation. Consequently every finite configuration possesses negative potential energy, and the magnitude \(|U|\) grows without bound as \(r\) approaches zero.

> [!NOTE]
> The negative sign is not arbitrary: it encodes the fact that the gravitational force is attractive, so positive work must be supplied to increase separation.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 and Starship trajectories are integrated with the exact two-body potential \(U = -GMm/r\) rather than \(mgh\); the difference determines whether a second-stage restart can achieve the required C3 energy for geostationary transfer or heliocentric escape.

ESA’s JUICE mission to Jupiter uses the same potential to design gravity-assist sequences at Ganymede and Callisto; mission designers solve the vis-viva equation derived from conservation of \(K + U\) at every fly-by.

LIGO’s waveform templates incorporate the binding energy \(U = -GMm/r\) of inspiralling black-hole binaries; post-Newtonian expansions begin from this Newtonian term and add relativistic corrections that are measurable in the final orbits.

Semiconductor foundries model dopant-ion trajectories inside crystal lattices with the same \(1/r\) potential when calculating channeling and stopping ranges; the potential governs whether an implanted ion reaches the target depth or backscatters.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Newton’s law of gravity  | Supplies the force whose line integral yields \(U(r)\)    |
| Work–energy theorem      | Defines potential energy as the work done by a conservative force |
| Conservative force test  | Guarantees that \(U\) depends only on position, not path  |
| Definite integration     | Converts the differential force into the finite-difference potential |

## 4. Building the idea — from intuition to formalism

### Step 1 — The force law is known
The gravitational force on mass \(m\) at distance \(r\) from mass \(M\) is \(\mathbf{F} = - (GMm/r^2) \hat{r}\).  
Concrete example: at Earth’s surface, \(r \approx 6371\) km gives the familiar weight \(mg\).  
Formal statement:  
$$F_r = -\frac{GMm}{r^2}.$$  
> [!WARNING]
> Treating the force as constant (\(F = mg\)) beyond a few hundred kilometres produces cumulative trajectory errors that grow quadratically with distance.

### Step 2 — Potential energy is defined via work
Because gravity is conservative, the work done by the field when the separation changes from \(r_1\) to \(r_2\) equals the negative change in a scalar function \(U\).  
Formal statement:  
$$W_{\text{field}} = \int_{r_1}^{r_2} F_r\,dr = -\Delta U.$$  
> [!WARNING]
> Reversing the sign convention here inverts every orbital-energy relation that follows.

### Step 3 — Perform the definite integral
Substitute the force:  
$$W_{\text{field}} = \int_{r_1}^{r_2} -\frac{GMm}{r^2}\,dr = GMm\left[\frac{1}{r}\right]_{r_1}^{r_2}.$$  
Hence  
$$\Delta U = U(r_2) - U(r_1) = -GMm\left(\frac{1}{r_2} - \frac{1}{r_1}\right).$$

### Step 4 — Fix the zero of potential
Set \(U(\infty) = 0\). Then  
$$U(r) = -\frac{GMm}{r}.$$  
This choice makes \(U < 0\) for all finite \(r\).

### Step 5 — Recover the near-surface approximation
Taylor-expand about \(r = R_E + h\) with \(h \ll R_E\):  
$$U(R_E + h) = -\frac{GM_E m}{R_E} + mgh + \cdots,$$  
where \(g = GM_E/R_E^2\). The constant term is dropped by redefining the zero, leaving the familiar \(mgh\).

## 5. Worked examples — every step shown

**Example 1 — Potential at two altitudes**  
*Given:* \(M_E = 5.972 \times 10^{24}\) kg, \(R_E = 6.371 \times 10^6\) m, \(m = 1000\) kg, \(r_1 = R_E\), \(r_2 = 2R_E\).  
*Find:* \(U(r_1)\) and \(U(r_2)\).  

Step 1: Write \(U(r) = -GMm/r\).  
*Why:* Definition obtained in Step 4 above.  

Step 2: Substitute \(r_1 = R_E\):  
$$U(R_E) = -\frac{(6.67430 \times 10^{-11})(5.972 \times 10^{24})(1000)}{6.371 \times 10^6} = -6.25 \times 10^{10}\ \text{J}.$$  
*Why:* Direct arithmetic evaluation.  

Step 3: Substitute \(r_2 = 2R_E\):  
$$U(2R_E) = -3.125 \times 10^{10}\ \text{J}.$$  
*Why:* Halving the denominator doubles the magnitude but keeps the sign.  

**Final answer**  
$$\mathbf{U(R_E) = -6.25 \times 10^{10}\ J,\quad U(2R_E) = -3.125 \times 10^{10}\ J}.$$  
*Reflection:* The factor-of-two change illustrates how rapidly potential flattens with distance.

**Example 2 — Escape speed from Earth’s surface**  
*Given:* Same constants as above.  
*Find:* Minimum speed \(v_\text{esc}\) such that total energy \(\ge 0\).  

Step 1: Set \(K + U = 0\) at launch:  
$$\frac12 m v^2 - \frac{GM_E m}{R_E} = 0.$$  
*Why:* Zero total energy is the threshold for reaching infinity with zero kinetic energy remaining.  

Step 2: Solve:  
$$v = \sqrt{\frac{2GM_E}{R_E}} = 11.2\ \text{km s}^{-1}.$$  
*Why:* Algebraic rearrangement isolates \(v\).  

**Final answer**  
$$\mathbf{v_\text{esc} = 11.2\ km/s}.$$  
*Reflection:* The square-root dependence on \(1/R\) shows why launch sites at higher altitude need modestly lower speeds.

**Example 3 — Comparison with linear approximation**  
*Given:* Same constants, \(h = 10\) km.  
*Find:* Fractional error between \(mgh\) and exact \(\Delta U\).  

Step 1: Exact \(\Delta U = GMm(1/R_E - 1/(R_E+h))\).  
*Why:* Direct use of the potential difference.  

Step 2: Linear: \(mgh = 9.81 \times 10^7\) J.  
Exact difference evaluates to \(9.79 \times 10^7\) J.  
*Why:* The second-order term \(-m g h^2/R_E\) accounts for the 0.2 % discrepancy.  

**Final answer**  
**Fractional error \(\approx 0.2\%\)**.  
*Reflection:* Even at modest altitude the linear model already deviates measurably.

**Example 4 — Circular-orbit total energy**  
*Given:* Low-Earth orbit, \(r = R_E + 400\) km.  
*Find:* Total mechanical energy per unit mass.  

Step 1: Centripetal balance gives \(v^2 = GM/r\).  
*Why:* Newton’s second law for circular motion.  

Step 2: \(E = \frac12 v^2 + U/m = GM/(2r) - GM/r = -GM/(2r)\).  
*Why:* Substitution and simplification.  

**Final answer**  
$$\mathbf{E/m = -GM_E/(2r) = -2.99 \times 10^7\ J/kg}.$$  
*Reflection:* Negative total energy confirms a bound orbit.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using \(U = mgh\) at GEO altitude | Habit from introductory labs                        | Always compare \(h\) with \(R_E\); switch when \(h/R_E > 0.01\) |
| Dropping the minus sign           | Confusing potential with potential energy magnitude | Write \(U = -GMm/r\) explicitly before every calculation |
| Setting zero at the surface       | Misreading older engineering tables                 | Re-derive zero from infinity each time until automatic |
| Treating \(G\) and \(g\) interchangeably | Notation overlap                                   | Keep \(g = GM/R^2\) local; never substitute into \(U\) |
| Forgetting reduced mass in two-body problem | Assuming one body fixed                             | Replace \(m\) by \(\mu = m_1 m_2/(m_1+m_2)\) when masses are comparable |
| Sign error in escape-velocity algebra | Solving \(\frac12 mv^2 = U\) instead of \(= -U\)    | Always check that total \(E \ge 0\) at infinity      |
| Ignoring spherical symmetry       | Applying point-mass formula inside a planet         | Use Gauss’s law or shell theorem first               |

## 7. The textbook-precise statement
For two point masses \(M\) and \(m\) separated by vector \(\mathbf{r}\), the gravitational potential energy is the scalar  
$$U(\mathbf{r}) = -\frac{GMm}{r},\qquad r = |\mathbf{r}|,$$  
where the zero of potential lies at \(r \to \infty\). The force is recovered by \(\mathbf{F} = -\nabla U\). The expression also holds outside any spherically symmetric mass distribution by Newton’s shell theorem. (See Goldstein, Poole & Safko, *Classical Mechanics*, 3rd ed., §3.3.)

## 8. Visual — diagram or schematic
```text
U(r)
 ^
 0 |                                   .  (asymptotic)
   |                                .
   |                             .
-ε |--------------------------.---------> r
   |                       .
   |                    .
   |                 .
   |              .
   |           .
   |        .
   |     .
   |  .
-∞ |___________________________________________> r
      0          R_E         2R_E        ∞
```
Horizontal axis: radial separation \(r\). Vertical axis: potential \(U\). Curve is the rectangular hyperbola \(U = -GMm/r\). Asymptote at \(U=0\) for \(r\to\infty\); vertical asymptote at \(r=0\).

## 9. The memory technique
1. **The hook** — Picture a bottomless gravitational well whose depth at distance \(r\) is exactly \(GMm/r\); you must climb “up” the well (supply positive energy) to reach flat ground at infinity.
2. **What to overlearn** — \(U = -GMm/r\), escape condition \(E \ge 0\), and the first two terms of the Taylor expansion that recovers \(mgh\).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.
4. **First-principles fallback** — Re-integrate \(F_r = -GMm/r^2\) from \(r\) to \(\infty\) with the definition \(U(\infty)=0\).

## 10. What this unlocks
Conservation of total mechanical energy \(E = K + U\) becomes the central integral of motion for any central-force problem. The same scalar \(U\) appears in the effective one-dimensional radial potential that yields orbit equations, escape criteria, and virial-theorem relations.

- Two-body problem reduction to equivalent one-body motion  
- Vis-viva equation and orbital elements  
- Derivation of Kepler’s laws from Newton’s gravity  
- Introduction to gravitational potential \(\Phi = -GM/r\) (field theory)  
- Hamiltonian formulation of celestial mechanics  

## 11. Self-check — five questions, no answers
1. A 500 kg satellite is at \(r = 3R_E\). Compute the work required to move it to \(r = 4R_E\) using the exact potential.  
2. Show that the linear approximation \(mgh\) underestimates the true \(\Delta U\) when moving outward; quantify the leading error term.  
3. A spacecraft at GEO has total energy \(E < 0\). What single number must be added to reach parabolic escape?  
4. Why does placing the zero of \(U\) at the planet’s surface create an inconsistent sign for escape velocity?  
5. Two asteroids of masses \(m_1\) and \(m_2\) orbit their common centre of mass. Replace the potential with the correct reduced-mass form and state the new total energy expression.