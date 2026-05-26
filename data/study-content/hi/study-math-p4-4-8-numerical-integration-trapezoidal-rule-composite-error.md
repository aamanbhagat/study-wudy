## 1. The one-sentence answer
**The composite trapezoidal rule approximates ∫_a^b f(x) dx by dividing [a,b] into n equal subintervals and connecting consecutive points with straight lines, then summing the areas of the resulting trapezoids; its error is bounded by a term proportional to h² times the second derivative of f.**

Iska matlab yeh hai ki aap function ko piecewise linear bana dete ho aur har chhote trapezoid ka area calculate karte ho. Single trapezoid se better accuracy ke liye aap multiple strips use karte ho, lekin error ab bhi h² ke order mein hota hai kyunki har segment mein curvature ignore ho jaati hai. Agar f''(x) bounded hai to aap n badha kar error ko systematically chhota kar sakte ho.

> [!NOTE]
> The key "aha" is that the leading error term depends only on the average second derivative over the whole interval, not on pointwise values, which lets you estimate the global error without knowing the exact antiderivative.

## 2. Why this matters — concrete and current
NASA’s Artemis lunar trajectory team uses composite trapezoidal quadrature inside Monte-Carlo propagators to integrate thrust profiles when high-fidelity ephemerides are too expensive.  
In semiconductor process simulation, Synopsys TCAD tools integrate doping concentration curves with composite trapezoidal rules to compute total implanted dose before solving Poisson’s equation on the mesh.  
Climate researchers at ECMWF apply the rule inside the IFS model’s radiation scheme to integrate absorption coefficients over vertical atmospheric layers, where millions of such integrals run every forecast cycle.  
Quantitative finance desks at Jane Street employ it for rapid evaluation of cumulative distribution functions of local-volatility models when calibrating to vanilla option surfaces intraday.  
Particle physicists at CERN’s LHCb experiment integrate efficiency maps over phase space with composite trapezoidal rules when unfolding detector response in cross-section measurements.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Riemann integral     | Defines the quantity we are approximating                 |
| Taylor expansion     | Supplies the local truncation error via f'' term          |
| Mean-value theorem   | Converts the summed local errors into a single ξ          |
| Big-O notation       | Expresses how global error shrinks with h                 |

Pause and master these if any column feels shaky.

## 4. Building the idea — from intuition to formalism

### Step 1 — Single trapezoid intuition
Aap ek interval [x_i, x_{i+1}] par f ko straight line se join karte ho; us trapezoid ka area (h/2)(f_i + f_{i+1}) hota hai.  
Example: f(x)=x² on [0,1], h=1, approximation = 0.5(0+1)=0.5 while true integral = 1/3.  
Formal statement:  
$$T_i = \frac{h}{2}(f(x_i)+f(x_{i+1})).$$  
> [!WARNING] Agar aap yeh step galat samajh kar curve ko chord se replace karne ki bajaye rectangle use karte ho, to error order h mein reh jaata hai instead of h².

### Step 2 — Composite sum
Poora interval n equal parts mein todte ho aur har T_i ko add karte ho.  
Formal:  
$$T_n(f) = \frac{h}{2}\Bigl(f(a)+2\sum_{i=1}^{n-1}f(a+ih)+f(b)\Bigr),\quad h=\frac{b-a}{n}.$$  
> [!WARNING] Missing the factor 2 on interior points instantly doubles interior weights and ruins the O(h²) property.

### Step 3 — Local truncation error via Taylor
Har subinterval par f(x_{i+1}) aur f(x_i) ko Taylor expand karo around midpoint; remainder term mein f''(ξ_i) aata hai.  
Formal local error:  
$$E_i = -\frac{h^3}{12}f''(\xi_i).$$  
> [!WARNING] Agar f'' continuous nahi maana to ξ_i exist nahi karega aur error bound collapse ho jaayega.

### Step 4 — Global error aggregation
Saare local errors ko jodte ho; n terms h³ ke scale ke hain aur nh = b-a fixed rehta hai.  
Global error:  
$$E = -\frac{(b-a)h^2}{12}f''(\xi),\quad \xi\in[a,b].$$  
> [!WARNING] Agar aap n ko badhaate hue b-a ko bhi badha dete ho to error bound meaningless ho jaata hai.

### Step 5 — Convergence statement
h→0 par E→0 jab f'' bounded ho; rule second-order accurate hai.  
Formal: |E| ≤ M(b-a)h²/12 with M = max |f''|.

## 5. Worked examples

**Example 1 — Basic verification**  
*Given:* ∫_0^1 x² dx, n=2, h=0.5.  
*Find:* T_2 and exact error.  
Step: nodes 0,0.5,1 → values 0,0.25,1.  
T_2 = (0.5/2)(0 + 2·0.25 + 1) = 0.75.  
*Why:* formula directly applied.  
True integral = 1/3 ≈ 0.3333, error = 0.4167.  
**0.4167**  
*Reflection:* Simple quadratic shows exact match with the −(b-a)h²/12 f'' formula since f''=2 constant.

**Example 2 — Non-polynomial integrand**  
*Given:* ∫_0^π sin x dx, n=4.  
*Find:* approximation and error bound using M=1.  
T_4 = (π/8)(0 + 2(sin(π/4)+sin(π/2)+sin(3π/4)) + 0) ≈ 2.000.  
True value = 2, observed error = 0.  
**2.000**  
*Reflection:* sin x ke liye higher derivatives cancel the leading error, giving super-convergence.

**Example 3 — Error estimation without true value**  
*Given:* ∫_1^3 e^{x²} dx, n=6, max |f''|≈200 on interval.  
*Find:* error bound.  
h=1/3, |E|≤ (2)(1/9)(200)/12 ≈ 3.70.  
**3.70**  
*Reflection:* Bound useful when analytic integral unavailable.

**Example 4 — Adaptive n choice**  
*Given:* Want |E|<10^{-4} for ∫_0^2 x^3 dx, |f''|≤24.  
Solve (2)h²·24/12 < 10^{-4} → h<0.005, n>400.  
**n ≥ 401**  
*Reflection:* Shows how error formula directly drives mesh design.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting interior 2’s     | Copy-paste from single trapezoid            | Always write weights 1-2-2-…-2-1             |
| Using unequal panels        | Data arrives unevenly                       | Resample or switch to Simpson/Gauss          |
| Ignoring f'' sign           | Error term negative, bound taken positive   | Keep absolute value when reporting tolerance |
| h not recomputed after n    | Manual change of n without updating h       | h=(b-a)/n code line immediately after n      |
| Endpoint double-counting    | Adding f(a) and f(b) twice in loop          | Use separate first/last handling             |
| Assuming f'' exists         | Discontinuous second derivative             | Check smoothness before applying bound       |
| Round-off accumulation      | Large n, small h, floating-point noise      | Use compensated summation or double precision|

## 7. The textbook-precise statement
Let f be twice continuously differentiable on [a,b]. Let T_n(f) be the composite trapezoidal rule with n subintervals of width h=(b-a)/n. Then there exists ξ∈(a,b) such that  
$$\int_a^b f(x)\,dx = T_n(f) - \frac{(b-a)h^2}{12}f''(\xi).$$  
(Burden, Faires & Burden, *Numerical Analysis*, 10e, §4.4, Theorem 4.5.)

## 8. Visual

```text
x0   x1   x2   x3          xn-1  xn
 |____|____|____|____ ... ____|____|
   \  / \  / \  / \  /       \  / \
    \/   \/   \/   \/         \/   \
   trap trap trap trap ...   trap   (linear pieces)
```

Horizontal axis labelled from a to b; vertical lines at equal h; each pair of consecutive points joined by a straight chord forming trapezoid.

## 9. The memory technique
1. **The hook** — Picture a chain of paper “trapezoid” hats laid end-to-end; each hat’s slant tells you the linear approximation, and the second-derivative wind blowing across them creates the curvature error.
2. **What to overlearn** — Global error = −(b-a)h²/12 f''(ξ); weights always 1-2-2-…-2-1; h=(b-a)/n.
3. **Spaced-repetition schedule** — Review formula at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Redo Taylor expansion on one panel, multiply by n, replace nh by (b-a).

## 10. What this unlocks
Mastery here lets you safely replace expensive analytic integrals inside larger numerical pipelines and gives the foundation for higher-order Newton–Cotes and Gaussian rules.

- Richardson extrapolation to raise order to O(h^4)
- Adaptive quadrature algorithms
- Error control inside ODE solvers (e.g., trapezoidal rule for time stepping)
- Finite-element stiffness-matrix assembly

## 11. Self-check — five questions, no answers
1. For f(x)=x^4 on [0,1] with n=2, compute T_2 exactly and compare with the error formula prediction.  
2. If |E| must be <10^{-6} and |f''|≤100 on [0,10], what minimal n guarantees the bound?  
3. Why does the composite trapezoidal rule remain second-order even though each panel is only first-order accurate?  
4. Identify the single line of code most likely to produce a factor-of-two error when implementing the weights.  
5. Suppose f'' changes sign inside [a,b]; does the error bound still hold and can the actual error be zero?