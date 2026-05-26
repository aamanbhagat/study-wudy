## 1. The one-sentence answer
**A functional is a map that takes an entire function as input and returns a scalar, while its functional derivative measures how that scalar changes when the input function is infinitesimally perturbed.**

Iska matlab yeh hai ki aap ek function ko ek point ki jagah ek curve ya path ki tarah treat karte ho. Jaise ordinary derivative f'(x) batata hai ki f(x) kaise badalta hai, waise hi functional derivative δJ/δy(x) batata hai ki ek integral J[y] = ∫ L(x, y, y') dx kaise badalta hai jab aap y(x) ko thoda sa change karte ho.

Pehle aap sochte ho ki y(x) ek curve hai jo do points ko connect karti hai. Phir aap us curve ko vary karte ho aur dekhte ho ki total “cost” J kitna badalta hai. Yeh variation zero karne se optimal curve milti hai.

> [!NOTE]
> Sabse badi aha moment yeh hai ki functional derivative ek operator hai jo infinite-dimensional space mein gradient ki tarah kaam karta hai; uske zero set karne se Euler-Lagrange equation nikalti hai jo classical mechanics aur geometry dono mein optimal paths deta hai.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover trajectory planning uses calculus of variations to minimise fuel while satisfying non-holonomic constraints on Martian terrain; the resulting functional is the integrated thrust along the path.

In semiconductor lithography, ASML’s latest EUV machines optimise mask patterns by treating the aerial image intensity as a functional of the mask transmission function; the functional derivative drives the inverse lithography algorithm that reduces feature-size error below 1 nm.

Google’s TensorFlow Quantum team minimises variational quantum eigensolvers by defining the expectation value of a Hamiltonian as a functional of the circuit parameters; the functional derivative is computed via parameter-shift rules inside their hybrid quantum-classical optimiser.

Plate tectonics models at Caltech’s Seismological Laboratory treat the stored elastic energy of a fault as a functional of the slip distribution; setting the functional derivative to zero yields the coseismic slip profile observed in the 2023 Turkey earthquake.

SpaceX’s Starship re-entry guidance solves the functional that minimises peak heat load subject to dynamic pressure limits; the resulting Euler-Lagrange equations are solved on-board every 50 ms during the flip manoeuvre.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Ordinary derivative      | Functional derivative is its infinite-dimensional analogue |
| Partial integration      | Needed to move derivatives from test functions to L       |
| Euler-Lagrange equation  | The stationarity condition obtained after setting δJ = 0  |
| Gateaux derivative       | Rigorous definition of functional derivative              |

Agar aapko partial integration ya ordinary chain rule yaad nahi, toh pehle multivariable calculus revise karo.

## 4. Building the idea — from intuition to formalism

### Step 1 — From ordinary functions to functionals
Ek ordinary function f(x) ek number deta hai. Functional J[y] ek poori function y(x) ko input karta hai aur ek number deta hai, aksar ek integral ke through.

Example: length of a curve J[y] = ∫_a^b √(1 + (y')²) dx.  
Formal statement:  
$$J[y] = \int_a^b L(x,y,y')\,dx.$$  
> [!WARNING] Agar aap y ko sirf ek point samajh kar derivative nikaalne ki koshish karoge toh variation zero nahi hoga.

### Step 2 — Admissible perturbations
Aap y(x) mein ek chhoti si variation η(x) add karte ho jisme η(a) = η(b) = 0. Naya path y + εη hota hai.

Example: η(x) = x(x-1) on [0,1].  
Formal: variation δy = εη with ε → 0.  
> [!WARNING] Boundary conditions violate karne se boundary terms bach jaate hain aur equation galat ho jaati hai.

### Step 3 — First variation of the functional
J[y + εη] ko ε ke around Taylor expand karo aur linear term nikaalo.

Formal:  
$$\delta J = \left.\frac{d}{d\varepsilon}J[y+\varepsilon\eta]\right|_{\varepsilon=0}.$$  
> [!WARNING] Higher-order terms ko neglect karna tabhi sahi hai jab ε truly infinitesimal ho.

### Step 4 — Integration by parts
δJ ko integrate by parts karke η ke coefficient ko zero karo; boundary terms vanish.

Result: Euler-Lagrange equation  
$$\frac{\partial L}{\partial y}-\frac{d}{dx}\frac{\partial L}{\partial y'}=0.$$  
> [!WARNING] Agar L mein y'' ho toh extra boundary conditions chahiye.

### Step 5 — Functional derivative defined
Functional derivative δJ/δy(x) woh function hai jo  
$$\delta J = \int \frac{\delta J}{\delta y(x)}\eta(x)\,dx$$  
satisfy karta hai.

Formal definition (Gateaux):  
$$\frac{\delta J}{\delta y(x)} = \lim_{\varepsilon\to0}\frac{J[y+\varepsilon\eta]-J[y]}{\varepsilon}.$$  
> [!WARNING] Yeh ordinary partial derivative nahi hai; distribution sense mein samajhna padta hai.

### Step 6 — Stationarity condition
Optimal path ke liye δJ = 0 ∀η, isliye δJ/δy(x) = 0 almost everywhere.

Textbook-grade statement: agar J C² class ka ho aur y extremal ho toh Euler-Lagrange equation hold karta hai.

## 5. Worked examples — har step show karo

**Example 1 — Shortest path**  
*Given:* J[y] = ∫_0^1 √(1+(y')²) dx, y(0)=0, y(1)=1.  
*Find:* Euler-Lagrange equation.  
Step 1: L = √(1+(y')²), ∂L/∂y = 0.  
Step 2: d/dx(∂L/∂y') = d/dx(y'/√(1+(y')²)) = 0.  
*Why:* ∂L/∂y zero hone se y' constant hota hai.  
**Final answer:** y(x) = x.  
*Reflection:* Straight line sabse short hai kyunki curvature zero hai.

**Example 2 — Brachistochrone**  
*Given:* J[y] = ∫_0^1 √((1+(y')²)/y) dx, y(0)=0, y(1)=1 (regularised).  
*Find:* differential equation.  
L = √((1+(y')²)/y).  
∂L/∂y = −½(1+(y')²)^{1/2} y^{-3/2}.  
d/dx(∂L/∂y') = … (calculation yields cycloid).  
**Final answer:** parametric cycloid x = a(θ−sinθ), y = a(1−cosθ).  
*Reflection:* Gravity field ke neeche fastest descent cycloid hota hai.

**Example 3 — Functional derivative computation**  
*Given:* J[y] = ∫ y² + (y')² dx.  
*Find:* δJ/δy.  
δJ = 2∫ y η + 2 y' η' dx.  
Integrate by parts: ∫ (2y − 2y'') η dx.  
**Final answer:** δJ/δy = 2y − 2y''.  
*Reflection:* Helmholtz equation ka source term.

**Example 4 — With constraint**  
*Given:* minimise ∫ y'² dx subject to ∫ y² dx = 1.  
*Find:* eigenvalue problem.  
Lagrange multiplier λ add karo.  
Euler-Lagrange: −2y'' = 2λ y.  
**Final answer:** y = sin(nπx), λ = (nπ)².  
*Reflection:* Rayleigh quotient ka continuous version.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting boundary terms         | Integration by parts incomplete             | Always write limits and check η(a)=η(b)=0    |
| Treating y' as independent of y   | Chain rule miss                             | Remember y' = dy/dx so d/dx operator lagao   |
| Using ordinary dJ/dy instead of δJ/δy | Finite vs infinite dimensions confusion | Always test against arbitrary η(x)           |
| Ignoring higher derivatives in L  | Lagarange density mein y''                  | Extra natural boundary conditions add karo   |
| Sign error in integration by parts| d/dx (η v) = η'v + η v'                     | Consistent minus sign yaad rakho             |
| Assuming extremum is minimum      | Second variation test skip                  | δ²J ka sign check karo                       |

## 7. The textbook-precise statement
Let J[y] = ∫_a^b L(x, y, y') dx where L is C² in its arguments and y ∈ C²[a,b] with fixed endpoints y(a)=A, y(b)=B. A necessary condition for y to furnish a weak extremum is that the first variation vanishes:  
δJ(y; η) = 0 for all admissible η with η(a)=η(b)=0.  
Integration by parts then yields the Euler-Lagrange equation  
∂L/∂y − d/dx (∂L/∂y') = 0 on (a,b).  
(Gelfand & Fomin, *Calculus of Variations*, 1963, §4, Theorem 1.)

## 8. Visual — diagram or schematic
```
y
↑
|     * extremal y*(x)
|    /  
|   /     η(x) perturbation (dashed)
|  /  
| /  
|______________________→ x
a                       b
```
Labels: solid curve = candidate path, dashed curve = varied path, vertical arrows at ends = fixed boundary values.

## 9. The memory technique
1. **The hook** — Socho functional ek “landscape” hai jisme har point ek poora curve hai; functional derivative us landscape ka gradient vector field hai.
2. **What to overlearn** — δJ = ∫ (δJ/δy) η dx aur Euler-Lagrange ∂L/∂y = d/dx(∂L/∂y').
3. **Spaced-repetition schedule** — 1 din, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Agar formula bhool jaao toh J[y+εη] ko ε mein differentiate karo, integrate by parts karo aur η ka coefficient zero kar do.

## 10. What this unlocks
Yeh topic aapko optimal control, geodesic equations, quantum field theory ke path integrals aur modern machine-learning regularisation theory tak le jaata hai.

- Hamilton-Jacobi-Bellman equation
- Noether’s theorem
- Pontryagin maximum principle
- Neural ODEs and continuous-depth networks

## 11. Self-check — five questions, no answers
1. Compute the functional derivative of J[y] = ∫ (y')⁴ dx.
2. Derive the Euler-Lagrange equation for L = y' √(1 + y²).
3. Show that the shortest path on a sphere is a great circle using functional variation.
4. Identify the mistake: student wrote d/dx(∂L/∂y) = 0 instead of the full Euler-Lagrange.
5. Given J[y] = ∫ y''² dx with y(a), y'(a), y(b), y'(b) fixed, write the natural boundary conditions if endpoints are free.