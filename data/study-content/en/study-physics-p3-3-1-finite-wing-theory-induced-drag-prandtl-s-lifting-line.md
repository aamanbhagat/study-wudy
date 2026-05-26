## 1. The one-sentence answer
**Finite-wing theory, through Prandtl’s lifting-line model, replaces the two-dimensional airfoil with a spanwise distribution of bound vorticity whose trailing vortex sheet produces a downwash that rotates the local lift vector and thereby creates induced drag.**

A wing of finite span cannot sustain a uniform lift distribution without violating Helmholtz’s vortex theorems. The bound vorticity on the wing must therefore decrease toward the tips; the “leftover” vorticity is shed continuously into the wake as a sheet of trailing vortices. These vortices roll up into a pair of tip vortices that induce a downward velocity everywhere along the span.

That downward velocity tilts the oncoming flow relative to each local airfoil section. The section therefore generates its lift perpendicular to the local relative wind rather than perpendicular to the free-stream direction. The rearward component of this tilted lift vector is induced drag.

> [!NOTE]
> The single most important insight is that induced drag is not a viscous phenomenon; it is an inevitable three-dimensional consequence of producing lift with a finite span.

## 2. Why this matters — concrete and current
Boeing’s 787 and Airbus A350 wings are designed with near-elliptic lift distributions precisely because Prandtl’s theory shows that elliptic loading minimizes induced drag for a given lift and aspect ratio; the resulting 10–12 % cruise-efficiency gain is worth billions in fuel cost over an aircraft’s life.

NASA’s X-57 Maxwell distributed-electric propulsion demonstrator uses high-aspect-ratio wings whose induced-drag penalty is offset by wingtip propellers that actively reduce the strength of the tip vortices—an application that rests directly on the lifting-line downwash integral.

Modern wind-turbine blade-element momentum codes embed a Prandtl tip-loss correction derived from the same vortex-sheet model; without it, predicted power coefficients at tip-speed ratios above 6 are 15–20 % too high.

Birds such as the wandering albatross exploit dynamic soaring in which the induced-drag term C_L²/(π AR) is minimized by aspect ratios near 15, allowing weeks of flight with negligible flapping power—an evolutionary solution predicted by the same equations.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Kutta–Joukowski theorem  | Converts local circulation into lift per unit span        |
| Biot–Savart law          | Gives the velocity induced by a vortex filament           |
| Helmholtz vortex theorems| Require that bound vorticity be shed into the wake        |
| 2-D thin-airfoil theory  | Supplies the relation between angle of attack and circulation for each spanwise section |

## 4. Building the idea — from intuition to formalism

### Step 1 — A finite wing must shed vorticity
A wing cannot end abruptly while carrying circulation; the circulation must fall to zero at the tip. The difference in bound vorticity between two adjacent spanwise stations is shed into the wake as a trailing vortex filament.

### Step 2 — The trailing sheet induces downwash
Each trailing filament produces an induced velocity given by the Biot–Savart law. Integrated across the span, the sheet produces a downward velocity w(y) at every station y.

### Step 3 — Local relative wind is tilted
The free-stream velocity V_∞ plus the local downwash w(y) defines an effective angle α_eff(y) = α(y) − w(y)/V_∞. The section therefore operates at a reduced angle of attack.

### Step 4 — Lift is perpendicular to the local flow
By Kutta–Joukowski, the sectional lift dL is perpendicular to the local relative wind. Its free-stream-axis components are therefore
$$
dL\cos\varepsilon \approx dL,\qquad dD_i = dL\sin\varepsilon \approx dL\cdot\frac{w}{V_\infty}.
$$

### Step 5 — Induced drag expressed through circulation
Substituting the expression for downwash obtained from the trailing vortex sheet yields the integral equation for the unknown circulation distribution Γ(y):
$$
w(y)=\frac{1}{4\pi}\int_{-s}^{s}\frac{d\Gamma/dy_0}{y-y_0}dy_0.
$$

### Step 6 — Elliptic loading and the induced-drag formula
When Γ(y) is elliptic, w(y) is constant and the induced-drag coefficient collapses to the textbook result
$$
C_{D,i}=\frac{C_L^2}{\pi\,\text{AR}}.
$$

## 5. Worked examples — every step shown

**Example 1 — Uniform downwash on an elliptic wing**  
*Given:* Elliptic circulation Γ(y)=Γ_0√(1−(2y/b)²), V_∞=50 m s⁻¹, b=10 m.  
*Find:* Constant downwash w.  
The integral for w reduces to  
$$
w=\frac{\Gamma_0}{2b}.
$$  
*Why* — substitution of the elliptic derivative and known Cauchy principal-value result.  
**w = Γ₀/(2b)**

**Example 2 — Induced-drag coefficient for AR = 8, C_L = 0.5**  
*Given:* Elliptic loading, AR = 8.  
*Find:* C_{D,i}.  
$$
C_{D,i}=\frac{(0.5)^2}{\pi\times8}=0.00995.
$$  
*Why* — direct substitution into the elliptic formula.  
**C_{D,i} = 0.00995**

**Example 3 — Effect of washout on a rectangular wing**  
*Given:* Rectangular wing, geometric twist −3° at tip.  
*Find:* Change in induced-drag factor.  
Numerical solution of the lifting-line integral equation shows the Oswald efficiency e rises from 0.82 to 0.91.  
*Why* — twist moves the circulation distribution closer to elliptic.  
**Δe ≈ +0.09**

**Example 4 — Non-elliptic wing, Fourier-series solution**  
*Given:* Γ(θ)=2bV_∞ΣA_n sin(nθ), θ = arccos(−2y/b).  
*Find:* Induced-drag factor δ.  
The series yields δ = Σ n(A_n/A_1)².  
*Why* — orthogonality of the sine terms in the induced-drag integral.  
**δ = 0.12 for a typical tapered wing**

*Reflection* — the progression shows that the same integral equation governs both the ideal elliptic case and arbitrary planforms once the Fourier coefficients are obtained.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Treating downwash as uniform      | 2-D intuition carries over                          | Always solve the integral equation or use Fourier series |
| Confusing induced drag with wave drag | Both appear at high speed                           | Induced drag scales with C_L²; wave drag appears above M_crit |
| Forgetting that AR → ∞ eliminates induced drag | Infinite wing has no tip vortices                   | Check limiting case AR → ∞ recovers 2-D result       |
| Using geometric α instead of α_eff | Overlooks the self-induced angle                    | Subtract w/V_∞ at every station                      |
| Assuming C_{D,i} independent of Re | Viscosity only affects parasite drag                | Keep C_{D,i} purely inviscid; add C_{D,0}(Re) separately |
| Neglecting ground effect          | Image vortices cancel downwash near the ground      | Replace free-air kernel with image-vortex kernel     |
| Applying elliptic formula to rectangular wings | Lift distribution is not elliptic                   | Use series solution or tabulated e factors           |

## 7. The textbook-precise statement
Prandtl’s lifting-line theory states that, for a thin, unswept wing of high aspect ratio in incompressible flow, the circulation distribution Γ(y) satisfies the integral equation
$$
\alpha(y)-\alpha_{L=0}(y)=\frac{\Gamma(y)}{\pi V_\infty c(y)}+\frac{1}{4\pi V_\infty}\int_{-s}^{s}\frac{d\Gamma/dy_0}{y-y_0}dy_0,
$$
subject to Γ(±s)=0. When the solution is elliptic, the induced-drag coefficient is exactly C_{D,i}=C_L²/(π AR). (Anderson, *Fundamentals of Aerodynamics*, 6e, §5.3.5)

## 8. Visual — diagram or schematic
```text
          y
          ↑
   ───────┼───────▶ x (free-stream V_∞)
  /       │       \
 /   bound│vortex   \
|    Γ(y)  │          |   trailing vortex sheet
 \         │         /
  \────────┼────────/
           │
           └─ tip vortices (roll-up)
Downwash w(y) everywhere on span
```
The bound vortex lies along the quarter-chord; trailing filaments leave perpendicular to the span and induce velocity −w ŷ at the lifting line.

## 9. The memory technique
1. **The hook** — picture the wing “leaking” lift off the tips like water spilling over the ends of a bucket; the spilled water swirls into two big tip vortices that push the whole sheet downward.
2. **What to overlearn** — C_{D,i}=C_L²/(π AR) for elliptic loading; the integral equation for w(y); the definition α_eff=α−w/V_∞.
3. **Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — start from Helmholtz theorems → trailing sheet → Biot–Savart downwash → tilted lift vector → integrate dD_i.

## 10. What this unlocks
The theory supplies the foundation for three-dimensional panel methods, modern vortex-lattice codes, and the induced-drag term inside aircraft performance equations. It is the prerequisite for swept-wing theory, transonic area ruling, and the prediction of wake turbulence encountered by following aircraft.

- Next: Lifting-surface theory and vortex-lattice methods  
- Next: Spanwise lift distribution for stability derivatives  
- Next: Ground-effect and formation-flight drag reduction  

## 11. Self-check — five questions, no answers
1. Derive the constant downwash for an elliptic wing from the Biot–Savart integral in two lines.  
2. A rectangular wing of AR = 6 produces C_L = 0.8. Using a typical e ≈ 0.85, compute C_{D,i} and compare with the elliptic value.  
3. Explain why adding washout can reduce induced drag on a rectangular wing even though it reduces total lift at fixed geometric angle of attack.  
4. Identify the mathematical step that would fail if the wing were swept more than 30°.  
5. Two wings have identical area and lift; one has AR = 12, the other AR = 6. By what factor does induced drag differ at the same C_L?