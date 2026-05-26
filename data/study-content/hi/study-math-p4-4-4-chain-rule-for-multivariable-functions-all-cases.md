## 1. The one-sentence answer
**The chain rule for multivariable functions tells you how to differentiate a composition of functions when each function depends on several variables at once.**

Iska matlab yeh hai ki agar aapka final output ek function ka function hai, aur har level par multiple inputs hain, to derivative nahi sirf ek simple multiplication ban jaati. Har path ko alag-alag track karna padta hai aur un sabko add karna padta hai. Jaise temperature ek jagah se dusri jagah badalti hai aur time ke saath bhi, to total change dono effects ko combine karke nikalna padega.

Aapko pehle single-variable chain rule yaad hoga: \( \frac{d}{dx} f(g(x)) = f'(g(x)) \cdot g'(x) \). Multivariable case mein yeh tree ban jaata hai jisme har branch ka apna gradient hota hai. Agar koi variable missing hai to uska term zero ho jaata hai.

> [!NOTE]
> Sabse badi aha yeh hai ki multivariable chain rule ek single formula nahi balki ek tree-walking rule hai: jitne independent paths hain utne partial derivatives add karo, har path par product rule laga ke.

## 2. Why this matters — concrete and current
Neural network training mein backpropagation exactly multivariable chain rule ka baar-baar application hai. OpenAI aur Google DeepMind ke large language models gradient descent ke liye is rule ko har layer par apply karte hain taaki millions of weights update ho sakein.

In aerospace, NASA’s trajectory optimisation software (jaisa General Mission Analysis Tool) rocket ke position, velocity aur fuel mass ke beech chain rule use karta hai jab thrust vector aur gravity dono simultaneously change ho rahe hote hain.

Semiconductor lithography machines (ASML ke EUV scanners) mein lens heating aur wafer expansion dono temperature aur time ke functions hain; multivariable chain rule se exact overlay error predict kiya jaata hai.

Climate models (jaise ECMWF’s IFS) mein humidity, pressure aur temperature ke coupled PDEs ko discretise karne ke baad chain rule se sensitivity derivatives nikale jaate hain jo data assimilation step mein use hote hain.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Partial derivatives      | Har variable ke alag-alag effect ko measure karne ke liye |
| Gradient vector          | Sab partials ko ek vector mein pack karne ke liye         |
| Single-variable chain rule | Intuition aur basic multiplication pattern ke liye      |
| Tree diagram / dependency graph | Multiple paths ko visually track karne ke liye         |
| Limit definition of derivative | Rigorous proof samajhne ke liye                        |

Agar partial derivatives ya gradient abhi clear nahi hain to pehle woh padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Single path, two variables
Agar \( z = f(x,y) \) aur \( x = g(t) \), \( y = h(t) \) dono sirf \( t \) par depend karte hain, to \( z \) ka total change dono paths se aata hai.  
Example: \( z = x^2 y \), \( x = t \), \( y = t^2 \).  
Formal statement:  
$$ \frac{dz}{dt} = \frac{\partial f}{\partial x} \frac{dx}{dt} + \frac{\partial f}{\partial y} \frac{dy}{dt}. $$  
> [!WARNING] Agar aap ek path bhool jaayein (jaise sirf \( x \) ka term likhein) to final derivative galat ho jaayegi.

### Step 2 — Two intermediate variables, one parameter
Ab \( z = f(u,v) \) jahaan \( u = g(x,y) \), \( v = h(x,y) \) aur \( x,y \) dono \( t \) ke functions hain. Tree mein ab teen levels hain.  
Example: \( z = u^2 + v \), \( u = x + y \), \( v = xy \), \( x = t^2 \), \( y = t \).  
Formal:  
$$ \frac{dz}{dt} = \frac{\partial z}{\partial u}\frac{du}{dt} + \frac{\partial z}{\partial v}\frac{dv}{dt}. $$  
> [!WARNING] \( \frac{du}{dt} \) khud ek chain rule hai; ise expand karna bhoolna common galti hai.

### Step 3 — Vector form with gradient
Jab input ek vector \( \mathbf{r}(t) \) ho to poora expression gradient dot velocity ban jaata hai:  
$$ \frac{dz}{dt} = \nabla f \cdot \mathbf{r}'(t). $$  
Yeh notation saare partial products ko compactly likhta hai.

### Step 4 — Multiple final outputs (Jacobian)
Agar \( \mathbf{F}(u,v) \) ek vector-valued function hai aur \( u,v \) dono \( t \) ke functions, to result ek Jacobian matrix times velocity vector hota hai.  
Formal:  
$$ \frac{d\mathbf{F}}{dt} = D\mathbf{F} \cdot \frac{d\mathbf{r}}{dt}. $$

### Step 5 — Full general case (any number of variables)
Tree ke har level par matrix multiplication (ya dot product) karke final derivative nikaalte hain. Textbook-grade statement yahi hai ki composition \( f\circ g \) ki derivative \( Df(g(\mathbf{x})) \cdot Dg(\mathbf{x}) \) hoti hai.

## 5. Worked examples — har step show karo

**Example 1 — Temperature along a path**  
*Given:* \( T(x,y) = x^2 + 3y \), \( x = t \), \( y = 2t^2 \).  
*Find:* \( \frac{dT}{dt} \) at \( t=1 \).  
Step 1: \( \frac{\partial T}{\partial x} = 2x \), \( \frac{\partial T}{\partial y} = 3 \).  
*Why:* Direct partials liye kyunki T dono x aur y par depend karta hai.  
Step 2: \( \frac{dx}{dt}=1 \), \( \frac{dy}{dt}=4t \).  
*Why:* Ab time derivatives liye.  
Step 3: \( \frac{dT}{dt} = 2x(1) + 3(4t) \).  
At \( t=1 \): \( 2(1) + 12 = 14 \).  
**14**  
*Reflection:* Simple case ne tree structure clear kiya; ek path miss karne se 12 ka term gayab ho jaata.

**Example 2 — Two intermediate variables**  
*Given:* \( z = u^2 v \), \( u = x+y \), \( v = x y \), \( x = \sin t \), \( y = e^t \).  
*Find:* \( \frac{dz}{dt} \).  
Step 1: \( \frac{\partial z}{\partial u} = 2uv \), \( \frac{\partial z}{\partial v} = u^2 \).  
*Why:* Outer function ke partials.  
Step 2: \( \frac{\partial u}{\partial x}=1 \), \( \frac{\partial u}{\partial y}=1 \), \( \frac{\partial v}{\partial x}=y \), \( \frac{\partial v}{\partial y}=x \).  
*Why:* Inner functions ke partials.  
Step 3: Chain rule multiply karke add:  
$$ \frac{dz}{dt} = 2uv\left(\cos t + e^t\right) + u^2\left(y\cos t + x e^t\right). $$  
**Final expression above**  
*Reflection:* Har partial ko sahi variable se multiply karna padta hai.

**Example 3 — Gradient form**  
*Given:* \( f(x,y) = x e^y \), \( \mathbf{r}(t) = (t^2, t^3) \).  
*Find:* \( \frac{df}{dt} \).  
\( \nabla f = (e^y, x e^y) \), \( \mathbf{r}'(t) = (2t, 3t^2) \).  
Dot product: \( e^{t^3} \cdot 2t + t^2 e^{t^3} \cdot 3t^2 \).  
**\( 2t e^{t^3} + 3t^4 e^{t^3} \)**  
*Reflection:* Vector notation ne calculation ko short kar diya.

**Example 4 — Jacobian case**  
*Given:* \( \mathbf{F}(u,v) = (u+v, uv) \), \( u = x^2 \), \( v = y^2 \), \( x=t \), \( y=t^2 \).  
*Find:* Jacobian of composition.  
Jacobian of F: \( \begin{pmatrix} 1 & 1 \\ v & u \end{pmatrix} \).  
Velocity vector after chain: \( (2t, 2t^2 \cdot 2t) \).  
Matrix multiply karke final derivative vector milta hai.  
**Resulting vector: \( (2t + 4t^3, 2t^4 + 2t^4) \)**  
*Reflection:* Matrix size aur multiplication order yaad rakhna zaroori hai.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Missing one path in tree          | Visualising only one variable               | Har variable ke liye alag column banao       |
| Treating all variables independent| Confusion between partial and total         | Explicitly likho kis kis par depend karta hai|
| Forgetting to chain inner derivatives | “Obvious” lagta hai                       | Har level par derivative symbol likho        |
| Jacobian transpose galat lena     | Row vs column vector convention             | D(F) hamesha left side par multiply hota hai |
| Zero partial ko bhool jaana       | Constant variable ko ignore karna           | Har variable ke liye partial zero check karo |
| Notation mix-up (d vs ∂)          | Single-variable habit                       | Total derivative ke liye d, partial ke liye ∂ |

## 7. The textbook-precise statement
Let \( f: \mathbb{R}^m \to \mathbb{R}^p \) and \( g: \mathbb{R}^n \to \mathbb{R}^m \) be differentiable at \( \mathbf{a} \) and \( \mathbf{b} = g(\mathbf{a}) \) respectively. Then the composite \( f \circ g \) is differentiable at \( \mathbf{a} \) and  
$$ D(f\circ g)(\mathbf{a}) = Df(g(\mathbf{a})) \cdot Dg(\mathbf{a}). $$  
All first-order partial derivatives exist in a neighbourhood and are continuous. (Stewart, *Calculus*, 9e, §14.5, Theorem 3).

## 8. Visual — diagram or schematic
```
t
├── x(t) ──► u(x,y)
│            ├──► z(u,v)
└── y(t) ──► v(x,y)
```
Har arrow ek derivative factor deta hai; final \( dz/dt \) mein dono paths ke products add hote hain.

## 9. The memory technique
**The hook** — Tree ke har branch ko alag colour ka paint brush samjho; har brush stroke ka apna gradient hota hai aur final colour un sab strokes ka sum hota hai.

**What to overlearn**  
1. \( \frac{dz}{dt} = \nabla f \cdot \mathbf{r}'(t) \)  
2. Jacobian multiplication order: outer Jacobian left side par.

**Spaced-repetition schedule** — 1 din, 3 din, 7 din, 16 din, 35 din.

**First-principles fallback** — Limit definition se shuru karo: \( \Delta z \approx \frac{\partial f}{\partial u}\Delta u + \frac{\partial f}{\partial v}\Delta v \), phir \( \Delta u \) aur \( \Delta v \) ko bhi expand karo.

## 10. What this unlocks
Yeh rule aapko gradient descent, implicit differentiation, change of variables in multiple integrals aur sensitivity analysis sab mein le jaata hai.

- Backpropagation in deep learning  
- Total differentials in thermodynamics  
- Linearisation of nonlinear systems  
- Euler-Lagrange equations derivation

## 11. Self-check — five questions, no answers
1. \( z = x^2 y + y^3 x \), \( x = e^t \), \( y = \sin t \); compute \( dz/dt \) at \( t=0 \).  
2. Ek tree diagram banao jab teen variables \( u,v,w \) ek hi \( t \) par depend karein.  
3. Jacobian matrix ka size kya hoga jab input 3D aur output 2D ho?  
4. Kyun \( \frac{\partial z}{\partial x} \) aur \( \frac{dz}{dx} \) alag hote hain? Ek example do.  
5. Agar ek variable constant rakha jaaye to chain rule ka kaunsa term gayab ho jaata hai?