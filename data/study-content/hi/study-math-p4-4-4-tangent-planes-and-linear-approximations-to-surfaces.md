## 1. The one-sentence answer
**Tangent plane ek flat surface hoti hai jo kisi given point par surface ko touch karti hai aur wahan local linear behaviour capture karti hai, jisse linear approximation ban sakti hai.**

Iska matlab yeh hai ki jab aap ek surface \(z = f(x,y)\) ke paas kisi point \((x_0,y_0)\) par jaate ho, toh surface ka curvature chhoti distances par ignore karke ek plane se replace kar sakte ho. Yeh plane partial derivatives \(f_x\) aur \(f_y\) se define hoti hai, kyunki woh slope ko x-aur y-directions mein batate hain. Linear approximation phir sirf uss plane ka equation ban jaata hai, jo function values ko quickly estimate karne deta hai bina original function compute kiye.

> [!NOTE]
> Sabse badi "aha" yeh hai ki ek nonlinear surface ko locally ek linear object se replace karna multivariable calculus ka foundation hai — yeh single-variable derivative ka direct extension hai, lekin ab do directions mein simultaneously.

## 2. Why this matters — concrete and current
Aerospace firms jaise SpaceX trajectory planning mein re-entry heat shields ke temperature surfaces ko linearly approximate karte hain taaki real-time guidance algorithms fast rahein; har simulation step mein full nonlinear CFD solve karna impossible hota hai.

Semiconductor companies jaise TSMC photolithography machines mein lens surface aberrations ko tangent-plane approximations se correct karte hain, jisse sub-3 nm node par overlay errors micrometers se nanometers tak gir jaate hain.

Machine-learning training pipelines (PyTorch, JAX) mein second-order optimizers jaise K-FAC Hessian ko local quadratic surfaces se replace karte hain; tangent-plane step gradient descent ko stabilize karta hai jab curvature high hoti hai.

Climate models (ECMWF IFS) mein ocean-surface flux parametrization tangent planes use karti hai taaki terabytes-scale grids par energy-balance equations real-time solve ho sakein.

Fundamental physics experiments jaise LIGO mirror-alignment control systems mein wavefront aberrations ko linear approximations se track karte hain, jisse picometer-level displacement detection possible hota hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Partial derivatives  | Slope of the surface along each coordinate axis define karte hain |
| Gradient vector      | Normal vector to the tangent plane deta hai               |
| Single-variable linear approximation | Direct analogy jo multivariable case ko samajhne mein madad karta hai |
| Limit definition of derivative | Rigor samajhne ke liye zaroori hai jab error term vanish karta hai |

Agar partial derivatives ya gradient abhi clear nahi hain toh pehle woh sections padho.

## 4. Building the idea — from intuition to formalism

### Step 1 — Local flatness from single-variable intuition
Ek curve \(y = f(x)\) par kisi point par tangent line slope \(f'(x_0)\) se banti hai aur chhote \(\Delta x\) ke liye function ko linearly approximate karti hai. Surface ke liye yahi idea do variables mein extend hoti hai: dono directions mein slopes chahiye.

Example: \(f(x,y) = x^2 + y^2\) at (1,1) par surface ek paraboloid hai lekin nazdeek se dekho toh woh ek tilted plane jaisi dikhti hai.

Formal statement: surface \(z = f(x,y)\) ke liye point \((x_0,y_0,f(x_0,y_0))\) par tangent plane ka normal vector \(\nabla f(x_0,y_0)\) hota hai.

> [!WARNING]
> Agar aap sirf ek direction ka slope lete ho aur doosra bhool jaate ho toh plane ka normal galat ho jaata hai aur approximation poori surface par fail ho jaati hai.

### Step 2 — Partial derivatives give the two slopes
\(f_x(x_0,y_0)\) x-direction mein slope deta hai jab y fix rakho; \(f_y(x_0,y_0)\) y-direction mein slope deta hai.

Example: \(f(x,y) = x^2 y\) at (1,2) par \(f_x = 2xy = 4\), \(f_y = x^2 = 1\).

Formal: \(f_x(x_0,y_0) = \lim_{h\to0}\frac{f(x_0+h,y_0)-f(x_0,y_0)}{h}\).

### Step 3 — Normal vector from gradient
Gradient \(\nabla f = (f_x,f_y,-1)\) plane ka normal ban jaata hai kyunki plane equation \(f_x(x-x_0)+f_y(y-y_0)-(z-z_0)=0\) se aati hai.

### Step 4 — Plane equation assemble karna
Tangent plane: \(z - z_0 = f_x(x_0,y_0)(x-x_0) + f_y(x_0,y_0)(y-y_0)\).

### Step 5 — Linear approximation function
\(L(x,y) = f(x_0,y_0) + f_x(x_0,y_0)(x-x_0) + f_y(x_0,y_0)(y-y_0)\), jisse \(f(x,y) \approx L(x,y)\) for \((x,y)\) near \((x_0,y_0)\).

### Step 6 — Error term vanishes in limit
Remainder \(E(x,y) = f(x,y) - L(x,y)\) satisfy karta hai \(\lim_{(x,y)\to(x_0,y_0)} \frac{E(x,y)}{\sqrt{(x-x_0)^2+(y-y_0)^2}} = 0\).

### Step 7 — Textbook-grade definition
Agar \(f\) continuously differentiable hai toh above limit zero hota hai aur tangent plane well-defined rehta hai.

## 5. Worked examples — har step show karo

**Example 1 — Simple paraboloid**
*Given:* \(f(x,y) = x^2 + y^2\) at \((1,2)\).  
*Find:* tangent plane equation.  
Step 1: compute \(f_x = 2x\), \(f_y = 2y\).  
Step 2: at point \(f_x(1,2)=2\), \(f_y(1,2)=4\).  
Step 3: plane \(z-5 = 2(x-1) + 4(y-2)\).  
*Why:* partials se hi slopes milte hain.  
**Final answer**  
\[z = 2x + 4y - 5\]  
*Reflection:* basic case jisme calculation transparent hai aur general formula seedha apply hota hai.

**Example 2 — Product function**
*Given:* \(f(x,y) = xy + e^y\) at \((0,0)\).  
*Find:* linear approximation \(L(x,y)\).  
\(f_x = y\), \(f_y = x + e^y\).  
At point: \(f_x=0\), \(f_y=1\), \(f(0,0)=1\).  
\(L(x,y) = 1 + 0\cdot x + 1\cdot(y-0)\).  
*Why:* exponential term ka partial \(e^y\) deta hai.  
**Final answer**  
\[L(x,y) = 1 + y\]  
*Reflection:* transcendental functions bhi same rule follow karti hain.

**Example 3 — Verify error vanishes**
*Given:* \(f(x,y) = x^2 y\) at \((1,1)\).  
*Find:* show \(\frac{E}{\sqrt{h^2+k^2}}\to0\).  
\(L=2(x-1)+(y-1)+1\).  
\(E = (1+h)^2(1+k) - L\).  
Limit calculation after expansion zero hota hai.  
**Final answer**  
error term satisfies definition.  
*Reflection:* rigor check karta hai ki approximation sach mein linear hai.

**Example 4 — Normal vector use**
*Given:* \(f(x,y)=\sin x\cos y\) at \((\pi/2,0)\).  
*Find:* normal vector to tangent plane.  
\(\nabla f = (\cos x\cos y, -\sin x\sin y)\).  
At point: \((0,-1)\).  
Plane: \(0(x-\pi/2)-1(y-0)-(z-0)=0\).  
**Final answer**  
normal = \((0,-1,-1)\) after normalization.  
*Reflection:* gradient directly normal deta hai bina plane equation likhe.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using only one partial derivative | Student single-variable habit se sochta hai | Dono \(f_x\) aur \(f_y\) zaroor compute karo |
| Forgetting to evaluate at point   | Algebra skip karne ki tendency              | Point substitute karne se pehle derivatives likho |
| Confusing plane with surface      | Visualisation weak hoti hai                 | Normal vector check karo — plane flat hota hai |
| Division by zero in limit check   | Point par gradient zero hota hai            | Check karo \(f_x,f_y\) dono zero toh nahi    |
| Wrong sign in plane equation      | z term sign bhool jaate hain                | Equation \(f_x\Delta x + f_y\Delta y - \Delta z =0\) yaad rakho |

## 7. The textbook-precise statement
Let \(f\) be a function of two variables that is differentiable at \((x_0,y_0)\). The tangent plane to the surface \(z=f(x,y)\) at the point \((x_0,y_0,z_0)\) is given by
\[
z-z_0 = f_x(x_0,y_0)(x-x_0)+f_y(x_0,y_0)(y-y_0).
\]
The linear approximation (or tangent approximation) is the function
\[
L(x,y)=f(x_0,y_0)+f_x(x_0,y_0)(x-x_0)+f_y(x_0,y_0)(y-y_0).
\]
Differentiability implies
\[
\lim_{(x,y)\to(x_0,y_0)}\frac{f(x,y)-L(x,y)}{\sqrt{(x-x_0)^2+(y-y_0)^2}}=0.
\]
(Source: Stewart, *Calculus*, 9e, §14.4.)

## 8. Visual — diagram or schematic
```
          z
          ^
          |   / tangent plane
          |  /
          | /   normal vector (gradient)
 surface /|/ 
    \   / |  
     \ /  |  
      *---|------> y   point (x0,y0,z0)
     /    |
    /     |
```
Plane surface ko point par touch karti hai; normal vector surface ke gradient ke parallel hota hai.

## 9. The memory technique
**The hook** — Gradient ko “arrow jo plane ko seedha khada karta hai” visualise karo; plane uss arrow ke liye perpendicular hoti hai.

**What to overlearn** — Formula \(z-z_0=f_x\Delta x+f_y\Delta y\) aur condition that error term divided by distance →0.

**Spaced-repetition schedule** — 1 din baad ek example solve karo; 3 din baad normal vector nikaalo; 7 din baad error limit prove karo; 16 din baad textbook statement likho; 35 din baad naya surface choose karke plane banao.

**First-principles fallback** — Agar formula bhool jaaye toh partial derivatives se slopes lo, normal vector banao, dot-product zero se plane equation derive karo.

## 10. What this unlocks
Yeh concept aapko multivariable Taylor expansion, gradient descent surfaces, aur differential geometry ke tangent spaces tak le jaata hai.

- Hessian matrix via second-order tangent planes
- Directional derivatives along any vector in the plane
- Implicit surfaces \(F(x,y,z)=0\) ke liye tangent planes
- Optimization me critical-point classification

## 11. Self-check — five questions, no answers
1. \(f(x,y)=x^3-y^2\) at (1,1) par tangent plane equation likho.
2. Linear approximation \(L(0.1,0.1)\) for \(f(x,y)=\sqrt{x+y}\) at origin kya hai?
3. Gradient zero hone par tangent plane kyun exist nahi karti?
4. Error term \(\frac{E}{\sqrt{h^2+k^2}}\) ka limit zero kyun hona zaroori hai?
5. Ek surface jisme \(f_x=2\), \(f_y=-1\) at point (3,4,5) par normal vector kya hoga?