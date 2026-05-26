## 1. The one-sentence answer
**Spring potential energy is the work stored in a Hookean spring when it is displaced from equilibrium, equal to \(\frac12 kx^2\).**

A spring exerts a restoring force proportional to its stretch or compression. Because that force changes with position, the energy stored cannot be found by simple multiplication of force and distance; the force must be integrated along the path.

The integral of \(F(x) = -kx\) from the equilibrium position to a final displacement \(x\) yields exactly \(\frac12 kx^2\). This quantity is defined as the elastic potential energy of the spring.

> [!NOTE]
> The factor of one-half appears because the average force during the displacement is half the final force; the same factor appears whenever a linear restoring force is integrated.

## 2. Why this matters — concrete and current
SpaceX Falcon 9 landing legs incorporate crushable honeycomb springs whose stored elastic energy is calculated with \(\frac12 kx^2\) to ensure the vehicle decelerates from 250 m s\(^{-1}\) touchdown velocity without exceeding 5 g on the payload.  

JWST’s sunshield tensioning cables are modeled as stiff springs; mission planners integrate the stored energy over the deployment sequence to guarantee that the final membrane tension remains within the 0.3–0.5 N range required for thermal stability.  

Semiconductor wire-bonding machines use voice-coil actuators whose return springs must be sized so that the elastic energy released in 50 µs does not exceed the fracture energy of 25 µm gold wire.  

Seismic isolation tables in LIGO employ maraging-steel blade springs whose potential-energy curves are mapped to 10\(^{-18}\) m precision; any deviation from the quadratic form would appear as excess noise between 10 Hz and 100 Hz.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Work as \(\int\mathbf{F}\cdot d\mathbf{r}\) | The definition of potential energy is negative work done by the conservative force. |
| Linear restoring force \(F=-kx\) | Hooke’s law supplies the explicit force function that must be integrated. |
| Antiderivative of a linear function | The integral of \(-kx\) with respect to \(x\) produces the quadratic term. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Force varies with position
A constant force stores energy equal to \(F\Delta x\). When force grows linearly with stretch, the energy is no longer \(F_\text{final}\times x\); only the area under the force–displacement line counts.

Concrete example: stretch a spring 0.1 m with final force 10 N; the stored energy equals the area of the triangle, not the rectangle 10 N × 0.1 m.

Formal statement:  
\[
W = \int_{0}^{x} F(x')\,dx' = \int_{0}^{x} (-kx')\,dx'.
\]

> [!WARNING]
> Treating the force as constant at its maximum value overestimates the stored energy by a factor of two.

### Step 2 — Work done by the spring
The spring force points opposite the displacement, so the work done *by* the spring is negative.

Formal statement:  
\[
W_\text{spring} = \int_{0}^{x} (-kx')\,dx' = -\frac12 kx^2.
\]

### Step 3 — Potential energy defined
For any conservative force the change in potential energy satisfies \(\Delta U = -W_\text{conservative}\).

Thus the spring potential energy relative to the unstretched position is  
\[
U(x) = \frac12 kx^2.
\]

### Step 4 — Verification by differentiation
Differentiating the candidate potential recovers the original force:  
\[
F = -\frac{dU}{dx} = -kx,
\]
confirming consistency.

### Step 5 — Textbook result
The elastic potential energy stored in an ideal Hookean spring displaced by \(x\) from equilibrium is therefore  
\[
U = \frac12 kx^2.
\]

## 5. Worked examples — every step shown

**Example 1 — Single stretch**  
*Given:* \(k=200\) N m\(^{-1}\), \(x=0.05\) m.  
*Find:* \(U\).  

\[
U = \frac12 kx^2
\]  
*Why:* direct substitution of the derived formula.  

**Answer:** \(\mathbf{0.25}\) J

*Reflection:* The calculation is immediate once the quadratic dependence is accepted; the only arithmetic risk is forgetting the one-half.

**Example 2 — From compression to extension**  
*Given:* spring stretched 3 cm, then pushed 2 cm past equilibrium.  
*Find:* net change in \(U\).  

Initial: \(U_i = \frac12 k(0.03)^2\).  
Final: \(U_f = \frac12 k(-0.02)^2\).  
\[
\Delta U = \frac12 k[(0.02)^2-(0.03)^2] = \frac12 k(-0.0005) = -0.00025k.
\]  
*Why:* potential is measured from the same zero (unstretched length) and depends only on the square of displacement.  

**Answer:** \(\mathbf{-0.00025k}\) J (if \(k\) in N m\(^{-1}\))

*Reflection:* Sign of displacement disappears; only the magnitude squared matters.

**Example 3 — Two springs in series**  
*Given:* two springs \(k_1=100\), \(k_2=300\) N m\(^{-1}\) joined end-to-end, total stretch 4 cm.  
*Find:* total stored energy.  

Equivalent stiffness:  
\[
\frac1{k_\text{eq}}=\frac1{k_1}+\frac1{k_2}\implies k_\text{eq}=75\,\text{N m}^{-1}.
\]  
Energy:  
\[
U=\frac12(75)(0.04)^2=0.06\,\text{J}.
\]  
*Why:* series combination reduces to a single effective \(k\) before applying the energy formula.  

**Answer:** \(\mathbf{0.06}\) J

*Reflection:* Energy is stored in the equivalent spring; individual energies can be recovered later if needed.

**Example 4 — Energy converted to kinetic**  
*Given:* 0.2 kg mass on \(k=500\) N m\(^{-1}\) spring, released from 5 cm compression.  
*Find:* speed at equilibrium.  

Conservation:  
\[
\frac12 kx^2=\frac12 mv^2\implies v=x\sqrt{\frac k m}=0.05\sqrt{2500}=2.5\,\text{m s}^{-1}.
\]  
*Why:* all elastic potential converts to kinetic when \(U=0\) at \(x=0\).  

**Answer:** \(\mathbf{2.5}\) m s\(^{-1}\)

*Reflection:* The square-root dependence on \(k/m\) is the signature of simple harmonic motion.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using \(U=Fx\) instead of \(\frac12 kx^2\) | Habit from constant-force problems | Always integrate or remember the triangular area. |
| Forgetting the negative sign in \(F=-kx\) | Sign convention confusion | Keep the restoring-force direction explicit until the integral is set up. |
| Adding energies of springs in series by summing \(k\) values | Misapplication of parallel rule | Compute \(k_\text{eq}\) first, then apply \(\frac12 k_\text{eq}x^2\). |
| Treating potential as zero at maximum displacement | Misreading the reference point | Zero is defined only at the unstretched length. |
| Omitting units when \(k\) is given in N mm\(^{-1}\) | Unit inconsistency | Convert to SI before substituting. |
| Assuming energy is path-dependent | General work intuition | Verify that \(\nabla\times\mathbf{F}=0\) or simply note \(U\) is a state function of \(x\) alone. |
| Differentiating \(U\) without the chain rule for composite systems | Careless calculus | Write \(U(x)\) explicitly before taking \(dU/dx\). |

## 7. The textbook-precise statement
For an ideal spring obeying Hooke’s law \(\mathbf{F}=-k\mathbf{x}\) (where \(k>0\) is constant), the elastic potential energy relative to the equilibrium position \(\mathbf{x}=0\) is the scalar function  
\[
U(\mathbf{x})=\frac12 k|\mathbf{x}|^2,
\]  
defined on \(\mathbb{R}^3\) (or \(\mathbb{R}\) in one dimension). This expression satisfies \(\mathbf{F}=-\nabla U\) identically and is unique up to an additive constant. (See Taylor, *Classical Mechanics*, 2005, §4.3.)

## 8. Visual — diagram or schematic
```text
Force (N)
   ↑
 F=kx ───╲
          ╲
           ╲  area = ½kx²
            ╲
             ╲
              ╲
0 ──────────────► x (m)
   equilibrium   final position
```
Horizontal axis: displacement from equilibrium.  
Vertical axis: magnitude of restoring force.  
Shaded triangular region is exactly the stored potential energy.

## 9. The memory technique
1. **The hook** — picture a right triangle whose base is stretch \(x\) and height is final force \(kx\); the area of that triangle is the energy.  
2. **What to overlearn** — \(U=\frac12 kx^2\) and the fact that \(F=-dU/dx\).  
3. **Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — start from \(W=\int(-kx)dx\), change sign for potential, obtain the quadratic.

## 10. What this unlocks
Mastery of spring potential energy supplies the potential term required for the total mechanical energy of any mass–spring system and is the direct gateway to simple harmonic motion.

- Derivation of the SHO differential equation \(\ddot x+\omega^2 x=0\)  
- Conservation of energy proofs for vertical springs and pendula  
- Normal-mode analysis of coupled oscillators  
- Hamiltonian formulation of the harmonic oscillator in classical mechanics

## 11. Self-check — five questions, no answers
1. A spring of stiffness 150 N m\(^{-1}\) is stretched 80 mm; calculate the stored energy in joules.  
2. Two identical springs are placed in parallel and stretched by the same amount \(x\); express the total energy stored in terms of a single spring’s energy \(U_1\).  
3. Show that the work done by the spring force over any closed path is zero.  
4. A mass on a vertical spring oscillates; at what displacement is the elastic potential energy exactly half its maximum value?  
5. If the force law were \(F=-kx^3\), what would the corresponding potential energy function be, and why would it no longer be called “spring potential energy” in the Hookean sense?