## 1. The one-sentence answer
**The one-dimensional heat equation is obtained by applying conservation of thermal energy to a thin rod while expressing the heat flux through Fourier’s law.**

Fourier’s law states that heat flows from hotter to colder regions proportionally to the negative temperature gradient. When you integrate the resulting flux difference over a small interval and let the interval length approach zero, the temperature function satisfies a parabolic PDE whose diffusion coefficient is the material’s thermal diffusivity.

This derivation assumes no internal heat sources, constant material properties, and perfect insulation on the lateral surface so that temperature varies only along the length. The final equation therefore encodes the intuitive fact that curvature in the temperature profile drives the rate of change of temperature.

> [!NOTE]
> The deepest insight is that the second spatial derivative appears because the *difference* of fluxes (itself proportional to the first derivative) must be balanced by the time derivative; hence the equation is second-order in space and first-order in time.

## 2. Why this matters — concrete and current
In semiconductor manufacturing, Intel and TSMC solve the 1D heat equation along interconnect lines to predict Joule-heating-induced electromigration; the same model supplies the temperature field that feeds into their reliability simulators.

NASA’s Mars rovers use a 1D radial heat equation (mathematically identical after coordinate change) inside the MMRTG power units to size the thermoelectric legs that convert plutonium decay heat into electricity.

Climate scientists at NOAA incorporate the 1D heat equation as the vertical column model inside ocean GCMs; the resulting eddy-diffusivity profiles appear in CMIP6 submissions that guide IPCC AR6 projections.

Additive-manufacturing firms such as GE Additive solve the 1D heat equation along laser-scan tracks to set scan speed so that the melt-pool solidification front stays within the narrow process window that avoids cracking in titanium alloys.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Definite integral    | Expresses total heat content inside an arbitrary segment  |
| Fundamental theorem of calculus | Converts the integral statement into a pointwise PDE     |
| Taylor expansion     | Evaluates flux at the right endpoint from the left value  |
| Limit definition of derivative | Produces the second spatial derivative after subtraction |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Fourier’s law of heat conduction
Heat flux at any cross-section is proportional to the negative temperature gradient. Consider a rod of cross-sectional area A; the amount of heat per unit time crossing position x is q(x,t) = −K A u_x(x,t), where K is thermal conductivity.  
Example: if u_x = −3 °C/m and K A = 2 W·m/°C, then q = 6 W, i.e., heat flows in the positive-x direction.  
Formal statement:  
$$q(x,t)=-K A\frac{\partial u}{\partial x}(x,t).$$  
> [!WARNING]  
> Forgetting the minus sign reverses the direction of heat flow and produces an unstable “backward-heat” equation.

### Step 2 — Thermal energy stored in a segment
The heat energy contained between x and x+Δx equals ∫_x^{x+Δx} c ρ A u(s,t) ds, where c is specific heat and ρ is density.  
Example: uniform temperature 50 °C, Δx = 0.1 m, c ρ A = 10^6 J/(m³·°C) gives stored energy 5×10^4 J.  
Formal statement:  
$$E(t)=\int_x^{x+\Delta x}c\rho A u(s,t)\,ds.$$

### Step 3 — Time rate of change of stored energy
Differentiating under the integral sign yields  
$$\frac{dE}{dt}=\int_x^{x+\Delta x}c\rho A\frac{\partial u}{\partial t}(s,t)\,ds.$$  
This equals the net power entering the segment.

### Step 4 — Net power from conduction
Power in at left minus power out at right: q(x,t) − q(x+Δx,t).  
Using the definition of q,  
$$q(x,t)-q(x+\Delta x,t)=KA\bigl(u_x(x+\Delta x,t)-u_x(x,t)\bigr).$$

### Step 5 — Energy balance and the integral identity
Conservation requires  
$$\int_x^{x+\Delta x}c\rho A u_t\,ds=KA\bigl(u_x(x+\Delta x,t)-u_x(x,t)\bigr).$$  
Divide by Δx and let Δx→0; the integrand must equal the derivative of the flux term.

### Step 6 — Passage to the PDE
After the limit we obtain the pointwise equation  
$$c\rho u_t=K u_{xx},$$  
or, with thermal diffusivity α = K/(cρ),  
$$u_t=\alpha u_{xx}.$$

## 5. Worked examples — har step show karo

**Example 1 — Uniform initial temperature**  
*Given:* u(x,0)=50 °C on a rod of length L, insulated ends, α=1.  
*Find:* Show that u(x,t)=50 satisfies the heat equation.  
Step 1: u_t=0.  
Step 2: u_x=0 hence u_xx=0.  
Step 3: 0=α·0 holds identically.  
*Why:* Both sides vanish, confirming the constant function is a trivial solution.  
**Final answer**  
u(x,t) ≡ 50  

*Reflection:* The example verifies that equilibrium states satisfy the PDE; any non-constant solution must decay toward such states.

**Example 2 — Linear temperature profile**  
*Given:* u(x,0)=x on an infinite rod.  
*Find:* Verify it solves u_t=α u_xx.  
u_t=0, u_xx=0, identity holds.  
**Final answer**  
Any linear function u(x,t)=ax+b is a stationary solution.  

*Reflection:* Linear profiles produce zero flux gradient and therefore never evolve.

**Example 3 — Separation of variables preview**  
*Given:* Assume u(x,t)=X(x)T(t). Substitute into u_t=α u_xx and separate variables.  
X T'=α X'' T ⇒ T'/T=α (X''/X)=−λ.  
Yields T(t)=e^{−αλ t}, X''+λ X=0.  
**Final answer**  
Product solutions of the form X(x)e^{−αλ t} exist for any eigenvalue λ.  

*Reflection:* This shows how the derivation immediately enables the standard solution technique.

**Example 4 — Deriving α from material data**  
*Given:* K=400 W/(m·K), c=385 J/(kg·K), ρ=8960 kg/m³ (copper).  
*Find:* α.  
α=K/(cρ)=400/(385·8960)≈1.15×10^{-4} m²/s.  
**Final answer**  
α≈1.15×10^{-4} m²/s  

*Reflection:* The numerical value tells you the time scale on which heat diffuses across a given length.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Sign error in Fourier’s law | Intuitive “heat flows down gradient”        | Always write q=−K A u_x                      |
| Forgetting cross-section A  | Treating flux as if it were per unit area   | Keep A explicit until final division         |
| Confusing cρ with α         | Mixing conductivity with diffusivity        | Memorize α=K/(cρ) as the single coefficient  |
| Taking limit before dividing by Δx | Produces 0=0 identity instead of PDE     | Divide first, then pass to the limit         |
| Ignoring units              | α appears dimensionally inconsistent        | Check [α]=length²/time before numerical work |
| Assuming variable K         | Real materials have temperature-dependent K | State “constant K” explicitly in hypotheses  |

## 7. The textbook-precise statement
Let u(x,t) denote temperature at position x∈(a,b) and time t>0. Assume the rod has constant cross-sectional area A, constant thermal conductivity K>0, constant density ρ>0 and constant specific heat c>0. Fourier’s law asserts that the heat flux (energy per unit time) across any cross-section is q(x,t)=−K A ∂u/∂x. Conservation of energy on an arbitrary subinterval [x,x+Δx] then yields  
∫_x^{x+Δx} c ρ A ∂u/∂t (s,t) ds = K A (∂u/∂x (x,t) − ∂u/∂x (x+Δx,t)).  
Dividing by Δx, letting Δx→0 and invoking the fundamental theorem of calculus produces the classical heat equation  
∂u/∂t = α ∂²u/∂x², α=K/(c ρ),  
valid for all (x,t)∈(a,b)×(0,∞), provided u is twice differentiable in x and once in t. (Strauss, Partial Differential Equations: An Introduction, 2e, §2.1)

## 8. Visual — diagram or schematic
```text
x=0               x               x+Δx             x=L
 |-----------------|-----------------|-----------------|
 heat flux q(x) →  |   segment Δx    | ← q(x+Δx)
                   |  stored heat    |
                   |  cρA u dx       |
                   v  net inflow     v
               drives u_t
```
Left arrow shows incoming flux at x; right arrow shows outgoing flux at x+Δx. Curvature of u between the two faces creates the imbalance that changes temperature.

## 9. The memory technique
1. **The hook** — Picture a tiny thermometer sitting on a curved temperature hill; the steeper the curvature beneath it, the faster its reading changes.  
2. **What to overlearn** — u_t = α u_xx together with α = K/(cρ).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from Fourier’s law plus energy balance on [x,x+Δx] and pass to the limit.

## 10. What this unlocks
Mastery of this derivation lets you move immediately to separation of variables, maximum principles, and fundamental solutions for the heat equation.  
- Eigenfunction expansions on bounded intervals  
- Green’s functions and Duhamel’s principle  
- Numerical schemes (Crank–Nicolson, finite-volume methods)  
- Extensions to variable coefficients and higher dimensions

## 11. Self-check — five questions, no answers
1. Derive the heat equation once more, but now allow a distributed heat source f(x,t).  
2. A copper rod (α≈1.15×10^{-4} m²/s) of length 10 cm has ends suddenly held at 0 °C. Estimate the time for the fundamental mode to decay by a factor e^{-1}.  
3. Identify the precise step where the assumption of constant K is used; what changes if K=K(u)?  
4. Suppose you forget the minus sign in Fourier’s law. Which physical law is violated?  
5. Show that any solution of the heat equation on the whole line with bounded initial data remains bounded for all t>0.