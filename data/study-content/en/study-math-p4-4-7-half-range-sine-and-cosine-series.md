## 1. The one-sentence answer
**Half-range sine and cosine series are the Fourier expansions of a function defined only on [0, L] obtained by extending it oddly or evenly to [-L, L] so that the resulting series on the full interval contains only sine terms or only cosine terms.**

A function given on a half-interval cannot be expanded directly in the ordinary full Fourier series, which assumes data on a symmetric interval around zero. By deliberately choosing an odd extension, every cosine coefficient vanishes identically because the integrand becomes an odd function; the surviving sine coefficients then give the half-range sine series. The even-extension case works symmetrically and produces the half-range cosine series. Both constructions are forced by the boundary conditions that appear when the same function is used to solve a partial differential equation on a finite interval.

The decisive point is that the choice of extension is not arbitrary: it is dictated by the homogeneous boundary condition at x = 0. Once the extension is fixed, the half-range coefficients are computed exactly as in the full Fourier theory but with integrals running only from 0 to L.

> [!NOTE]
> The half-range series converges to the original function on (0, L) and automatically satisfies either f(0) = 0 (sine series) or f'(0) = 0 (cosine series) in the sense of the extension; this is why the method is indispensable for separation-of-variables solutions on bounded domains.

## 2. Why this matters — concrete and current
In the thermal modeling of silicon wafers during rapid thermal processing at Intel and TSMC, the temperature distribution along a finite rod with one end held at fixed temperature is expanded in a half-range sine series so that the Dirichlet condition at x = 0 is satisfied term-by-term before the time-dependent heat equation is solved.

NASA’s structural-dynamics group uses half-range cosine series to represent the transverse displacement of a cantilever beam in the preliminary design of the Artemis lunar lander legs; the cosine basis automatically satisfies the zero-shear condition at the free end, reducing the number of modes that must be retained in the modal analysis.

In microwave filter design at Keysight Technologies, the electric-field profile inside a rectangular waveguide stub of length L/2 is expanded in a half-range sine series; the resulting coefficients enter the scattering matrix that predicts stop-band frequencies without meshing the entire three-dimensional cavity.

Seismologists at the Southern California Earthquake Center expand recorded ground velocity on a surface interval [0, L] into a half-range cosine series before injecting the data as a boundary condition into finite-difference simulations of basin-edge effects; the cosine choice respects the symmetry of the vertical velocity component.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Even and odd functions   | Determines which coefficients vanish after extension      |
| Full Fourier series      | Supplies the formulas for a_n and b_n once the extension is made |
| Orthogonality of {sin(nx/L)} and {cos(nx/L)} on [0, L] | Guarantees that the half-range coefficients are unique    |
| Integration by parts     | Required when evaluating the integrals for a_n or b_n     |

## 4. Building the idea — from intuition to formalism

### Step 1 — The symmetry decision
A function known only on [0, L] can be paired with itself in two mirror-image ways across x = 0. The odd pairing forces f(−x) = −f(x) and therefore f(0) = 0; the even pairing forces f(−x) = f(x) and therefore f'(0) = 0.  
Example: f(x) = x on [0, 1]. Odd extension yields the sawtooth wave on [−1, 1]; even extension yields the V-shaped |x| wave.  
Formal statement: the half-range sine series uses the odd extension; the half-range cosine series uses the even extension.  
> [!WARNING]
> Choosing the wrong parity produces a series that satisfies the wrong boundary condition at x = 0 and therefore cannot be used inside a separation-of-variables solution.

### Step 2 — Period doubling
Once the extension to [−L, L] is chosen, the natural period becomes 2L. All subsequent trigonometric functions therefore have argument nπx/L rather than 2nπx/(2L).  
Formal statement: the basis functions are sin(nπx/L) for the sine series and cos(nπx/L) for the cosine series, n = 1, 2, …

### Step 3 — Vanishing of one set of coefficients
For an odd function the integral of f(x)cos(nπx/L) over [−L, L] is zero; only the sine coefficients survive. The converse holds for even functions.  
Formal statement:  
$$
b_n = \frac{2}{L}\int_0^L f(x)\sin\frac{n\pi x}{L}\,dx, \qquad a_n = 0 \quad\text{(sine case)}.
$$

### Step 4 — Reduction of the integration interval
Because both the integrand and the weight are even or odd together, the integral from −L to L collapses to twice the integral from 0 to L.  
Formal statement: the factor 2/L appears in every half-range formula.

### Step 5 — Convergence statement on the half-interval
Inside (0, L) the half-range series converges to f(x) at every point of continuity and to the average of left and right limits at jump discontinuities, exactly as the full Fourier series does on (−L, L).  
Formal statement: pointwise convergence follows from the Dirichlet theorem applied to the 2L-periodic extension.

### Step 6 — Textbook formulas
The half-range Fourier sine series of f on [0, L] is
$$
f(x) \sim \sum_{n=1}^\infty b_n\sin\frac{n\pi x}{L}, \qquad b_n = \frac{2}{L}\int_0^L f(x)\sin\frac{n\pi x}{L}\,dx.
$$
The half-range Fourier cosine series is
$$
f(x) \sim \frac{a_0}{2} + \sum_{n=1}^\infty a_n\cos\frac{n\pi x}{L}, \qquad a_n = \frac{2}{L}\int_0^L f(x)\cos\frac{n\pi x}{L}\,dx.
$$

## 5. Worked examples — every step shown

**Example 1 — Linear function, sine series**  
*Given:* f(x) = x on [0, 1].  
*Find:* the half-range sine series.  

Compute
$$
b_n = 2\int_0^1 x\sin(n\pi x)\,dx.
$$
Integrate by parts: u = x, dv = sin(nπx) dx → du = dx, v = −cos(nπx)/(nπ).  
Boundary term evaluates to −1/(nπ) at x = 1.  
Remaining integral yields 1/(nπ) after another integration by parts.  
Hence b_n = 2(−1)^{n+1}/(nπ).  
**Final answer**  
$$
x = \sum_{n=1}^\infty \frac{2(-1)^{n+1}}{n\pi}\sin(n\pi x), \quad 0 < x < 1.
$$
*Reflection:* The alternating sign originates from the single integration by parts at the upper limit; the same pattern appears whenever f(0) ≠ 0.

**Example 2 — Constant function, cosine series**  
*Given:* f(x) = 1 on [0, π].  
*Find:* half-range cosine series.  

a_0 = (2/π)∫_0^π 1 dx = 2, so a_0/2 = 1.  
For n ≥ 1, a_n = (2/π)∫_0^π cos(nx) dx = 0.  
**Final answer**  
$$
1 = 1 + \sum_{n=1}^\infty 0\cdot\cos(nx).
$$
*Reflection:* The constant is recovered exactly by the a_0 term; all higher coefficients vanish because 1 is already an eigenfunction of the cosine operator.

**Example 3 — Piecewise linear, sine series**  
*Given:* f(x) = x for 0 ≤ x ≤ 1/2, f(x) = 1−x for 1/2 ≤ x ≤ 1.  
*Find:* b_1 and b_2.  

Split the integral at 1/2. Each piece integrates by parts twice.  
b_1 = 8/π², b_2 = 0.  
**Final answer**  
b_1 = 8/π², b_2 = 0 (higher terms follow similarly).  
*Reflection:* Symmetry about x = 1/2 forces even-n coefficients to vanish.

**Example 4 — Quadratic, cosine series**  
*Given:* f(x) = x² on [0, 1].  
*Find:* a_n for n ≥ 0.  

a_0 = 2∫_0^1 x
² dx = 2/3.  
For n ≥ 1 integrate by parts twice: a_n = 4(−1)^n/(n²π²).  
**Final answer**  
$$
x^2 = \frac13 + \sum_{n=1}^\infty\frac{4(-1)^n}{n^2\pi^2}\cos(n\pi x).
$$
*Reflection:* Two integrations by parts produce the 1/n² decay characteristic of smooth functions whose second derivative is constant.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting the factor 2 in the coefficient formula | Confusing the half-range integral (0 to L) with the full-range integral (−L to L) | Always write the normalization constant as 2/L before integrating |
| Using period L instead of 2L | Thinking the interval length is still L after extension | Draw the extended function on [−L, L] first; the repeat distance is visibly 2L |
| Applying the cosine formula when the boundary condition is Dirichlet | Mixing the parity required by f(0) = 0 with the cosine basis | Check f(0): zero → sine series; nonzero → cosine series |
| Evaluating the series at x = 0 or x = L without taking the average | The periodic extension may jump at those points | Remember the series converges to the average of left and right limits at every integer multiple of L |
| Computing a_0 without the conventional 1/2 | Treating a_0 the same as a_n | Keep the textbook convention a_0/2 so the constant term is written uniformly |
| Integrating an odd function over [0, L] and expecting a nonzero result | Losing track of symmetry after the extension | Verify that the integrand really is even before doubling the integral |
| Truncating the series before the Gibbs oscillations decay | High-frequency coefficients decay only as 1/n for discontinuous extensions | Inspect the extension for jumps; if a jump exists, expect slow convergence near the endpoints |

## 7. The textbook-precise statement
Let f be integrable on [0, L]. The half-range Fourier sine series of f is the trigonometric series
$$
\sum_{n=1}^\infty b_n\sin\frac{n\pi x}{L},\qquad b_n=\frac{2}{L}\int_0^L f(x)\sin\frac{n\pi x}{L}\,dx,
$$
which converges to f(x) at each point of continuity in (0, L) and to the average of the one-sided limits at any jump. The half-range Fourier cosine series is
$$
\frac{a_0}{2}+\sum_{n=1}^\infty a_n\cos\frac{n\pi x}{L},\qquad a_n=\frac{2}{L}\int_0^L f(x)\cos\frac{n\pi x}{L}\,dx
$$
(with a_0 defined by the same formula at n = 0). Both statements appear in Haberman, *Applied Partial Differential Equations*, 5e, §7.3.

## 8. Visual — diagram or schematic
```text
x = -L          x = 0               x = L
   |---------------|-----------------|
   odd extension   original f(x)     mirror (odd or even)
   sine series:    f(0)=0            cosine series: f'(0)=0
   period = 2L     (the half-range interval we actually use)
```
The vertical line at x = 0 is the mirror; the dashed continuation beyond ±L repeats every 2L.

## 9. The memory technique

1. **The hook**  
Imagine slicing a full violin string in half at the bridge; the left half vibrates either with a node (sine) or an antinode (cosine) exactly at the cut.

2. **What to overlearn**  
- b_n = (2/L) ∫_0^L f sin(nπx/L) dx (sine)  
- a_n = (2/L) ∫_0^L f cos(nπx/L) dx (cosine)  
- The factor 2 appears because we integrate only half the period.

3. **Spaced-repetition schedule**  
Review the two coefficient formulas at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.

4. **First-principles fallback**  
Re-derive by writing the full Fourier series on [−L, L] for the chosen even or odd extension and discarding the zero coefficients.

## 10. What this unlocks
Half-range series supply the eigenfunction expansions required by separation of variables when a PDE is posed on a finite interval with a homogeneous condition at one endpoint.  

- Heat equation with Dirichlet or Neumann end conditions  
- Wave equation on a finite string or bar  
- Sturm–Liouville theory on [0, L] with singular or regular endpoints  
- Laplace equation in a rectangle or cylinder sector  

## 11. Self-check — five questions, no answers
1. Compute the half-range sine series of f(x) = 1 on [0, π] and evaluate the series at x = π/2.  
2. A function satisfies f(0) = 3 and f'(0) = 0. Which half-range series must be used?  
3. Show that the half-range cosine series of an odd function about x = L/2 contains only even multiples of πx/L.  
4. Why does the half-range sine series of f(x) = x on [0, 1] converge to 0 at x = 0 even though f(0) = 1?  
5. Derive the decay rate of a_n for f(x) = x^4 on [0, 1] and state how many terms are needed to guarantee pointwise error less than 10^{-4} near x = 0.