## 1. The one-sentence answer

**Extended Kalman Filter (EKF) linearizes nonlinear dynamics and measurement models around the current state estimate using first-order Taylor expansion, where the required partial-derivative matrices are called Jacobians.**

Iska matlab yeh hai ki jab aapke system ke equations linear nahi hote (jaise rocket ke nonlinear aerodynamics ya orbit equations), tab aap unko ek chhote local region mein straight-line approximation de dete ho. Yeh approximation Kalman Filter ke prediction-update cycle mein daal di jaati hai, lekin har step par naye linearization point (current estimate) par Jacobians ko re-calculate karna padta hai. Agar linearization galat ho, to covariance aur state dono drift kar jaate hain.

Aap soch sakte ho ki EKF ek “living linearization” hai — har measurement update ke baad aap naye operating point par wapas jaakar slope (Jacobian) nikaalte ho. Isse nonlinear problem ko baar-baar linear bana kar solve kiya jaata hai.

> [!NOTE]
> Sabse badi “aha” yeh hai ki EKF mein Jacobian sirf ek mathematical trick nahi, balki woh exact point hai jahaan aap nonlinearity ko ignore karne ka decision lete ho; galat point chun liya to filter ka entire probabilistic interpretation toot jaata hai.

## 2. Why this matters — concrete and current

SpaceX Falcon 9 aur Starship dono apne booster landing mein EKF-based navigation chalate hain. Inertial measurement unit (IMU) aur GPS dono nonlinear hain (quatertions aur atmospheric drag), isliye real-time linearization zaroori hai taaki touchdown accuracy < 10 m rahe.

ISRO ka Chandrayaan-3 lander aur orbiter dono ne relative navigation ke liye EKF use kiya. Lunar gravity field aur terrain-relative measurements dono highly nonlinear hain; Jacobians ko har 100 ms par update kiya jaata tha.

Modern automotive radar + camera fusion mein Mobileye aur Tesla ke vehicles EKF/UKF hybrids chalate hain. Yahan vehicle dynamics (bicycle model) aur camera projection dono nonlinear functions hain, aur Jacobians ko lane-marking measurements ke liye evaluate kiya jaata hai.

NASA ke Mars 2020 Perseverance rover ke entry-descent-landing sequence mein EKF ne IMU, altimeter aur terrain camera ko fuse kiya. Linearization error ko actively monitor kiya jaata tha; agar Jacobian condition number bahut bada ho jaaye to filter reset hota tha.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Standard Kalman Filter equations | EKF is literally KF with extra Jacobian matrices in place of \(F\) and \(H\)        |
| Multivariable Taylor expansion | Linearization ka single mathematical tool; first-order term hi Jacobian deta hai     |
| Matrix differentiation   | State vector aur measurement vector dono multi-dimensional hote hain                 |
| Covariance propagation   | Linearized model ke through \(P\) matrix ko propagate karna padta hai                |

Agar upar ke teeno concepts comfortable nahi hain to pehle basic Kalman Filter aur partial derivatives revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Nonlinear models break the classic Kalman Filter
Aapke paas state transition \(f(x,u)\) aur measurement \(h(x)\) dono nonlinear functions hain. Classic Kalman Filter sirf linear \(x_{k+1}=Fx_k+Bu\) aur \(z=Hx\) ke liye derived hai.

Example: 1-D orbit height \(x\) jahaan drag force \(f(x)=-k x^2\) hai. Yeh clearly nonlinear hai.

Formal statement:
\[
x_{k+1}=f(x_k,u_k)+w_k,\qquad z_k=h(x_k)+v_k
\]

> [!WARNING]
> Agar aap nonlinearity ko ignore karke \(F\) aur \(H\) ko constant maan lete ho, to covariance \(P\) galat grow karega aur filter diverge ho sakta hai.

### Step 2 — Local linear approximation via Taylor series
Har time step par current estimate \(\hat{x}_{k|k-1}\) ke aas-paas function ko linearize karte hain. Sirf first-order term rakhte hain.

Example: \(f(x)=-k x^2\) ko \(\hat{x}=3\) par linearize karo. Slope \(f'(3)=-6k\) milta hai.

Formal statement:
\[
f(x)\approx f(\hat{x})+\left.\frac{\partial f}{\partial x}\right|_{\hat{x}}(x-\hat{x})
\]

> [!WARNING]
> Higher-order terms (Hessian) ko neglect karne se linearization error bias introduce hota hai; EKF isko process noise mein artificially inflate karke handle karta hai.

### Step 3 — Jacobian matrix definition
Jab state vector \(x\in\mathbb{R}^n\) aur function \(f:\mathbb{R}^n\to\mathbb{R}^n\) ho, tab partial derivatives ka matrix Jacobian kehlata hai.

Example: 2-D state \([x,y]^\top\), \(f=[x+y^2,xy]^\top\) ka Jacobian
\[
F=\begin{bmatrix}\frac{\partial f_1}{\partial x}&\frac{\partial f_1}{\partial y}\\\frac{\partial f_2}{\partial x}&\frac{\partial f_2}{\partial y}\end{bmatrix}=\begin{bmatrix}1&2y\\y&x\end{bmatrix}
\]

> [!WARNING]
> Row-column ordering galat ho jaaye (transpose mistake) to predicted covariance \(P\) symmetric nahi rahega aur Cholesky factorization toot jaayegi.

### Step 4 — EKF prediction step with state-transition Jacobian
Predicted state \( \hat{x}_{k+1|k}=f(\hat{x}_{k|k},u_k) \) aur predicted covariance
\[
P_{k+1|k}=F_k P_{k|k} F_k^\top+Q_k
\]
jahaan \(F_k=\frac{\partial f}{\partial x}\big|_{\hat{x}_{k|k}}\) hai.

### Step 5 — EKF update step with measurement Jacobian
Measurement residual aur Kalman gain mein \(H_k=\frac{\partial h}{\partial x}\big|_{\hat{x}_{k+1|k}}\) aata hai. Baaki equations same rehte hain jaise linear KF mein.

### Step 6 — Re-linearization at every step
Naya estimate milne ke baad agle cycle mein naye \(\hat{x}\) par Jacobian dobara calculate karna padta hai. Yeh EKF aur KF ke beech sabse badi operational difference hai.

### Step 7 — Textbook-grade EKF equations
Prediction:
\[
\hat{x}_{k+1|k}=f(\hat{x}_{k|k},u_k),\qquad P_{k+1|k}=F_kP_{k|k}F_k^\top+Q_k
\]
Update:
\[
K_k=P_{k+1|k}H_k^\top(H_kP_{k+1|k}H_k^\top+R_k)^{-1}
\]
\[
\hat{x}_{k+1|k+1}=\hat{x}_{k+1|k}+K_k(z_k-h(\hat{x}_{k+1|k}))
\]
\[
P_{k+1|k+1}=(I-K_kH_k)P_{k+1|k}
\]

## 5. Worked examples — har step show karo

**Example 1 — Simple scalar nonlinear measurement**
*Given:* \(h(x)=x^2\), current estimate \(\hat{x}=4\), \(P=1\), \(R=0.25\)
*Find:* Measurement Jacobian \(H\) aur innovation covariance \(S\)

Step 1: \(H=\frac{dh}{dx}\big|_{4}=2\times4=8\)  
*Why:* Scalar case mein Jacobian sirf derivative hai.

Step 2: \(S=H\cdot P\cdot H+R=64\cdot1+0.25=64.25\)  
*Why:* Linearized measurement noise ko propagate karna hai.

**Final answer**  
\(H=8\), \(S=64.25\)

*Reflection:* Yeh example isliye simple thi kyunki scalar derivative se hi Jacobian ban jaata hai; vector case mein matrix banani padti hai.

**Example 2 — 2-D range measurement**
*Given:* \(h(x,y)=\sqrt{x^2+y^2}\), \(\hat{x}=[3,4]^\top\)
*Find:* Jacobian row vector \(H\)

\(H=\begin{bmatrix}\frac{x}{r}&\frac{y}{r}\end{bmatrix}\big|_{[3,4]}=\begin{bmatrix}0.6&0.8\end{bmatrix}\)

*Why:* Chain rule se \(\partial r/\partial x=x/r\) aata hai.

**Final answer**  
\(H=\begin{bmatrix}0.6&0.8\end{bmatrix}\)

*Reflection:* Geometry clearly dikhta hai — Jacobian unit vector ki taraf point karta hai.

**Example 3 — Constant-velocity model with nonlinear drag**
*Given:* State \([x,v]^\top\), \(f=[x+v\Delta t, v-kv^2\Delta t]^\top\), \(\Delta t=0.1\), \(\hat{x}=[10,50]^\top\), \(k=0.01\)
*Find:* State-transition Jacobian \(F\)

\(F=\begin{bmatrix}1&0.1\\0&1-2kv\Delta t\end{bmatrix}=\begin{bmatrix}1&0.1\\0&0.9\end{bmatrix}\)

*Why:* Velocity term mein \( \partial(v-kv^2\Delta t)/\partial v=1-2kv\Delta t \) aata hai.

**Final answer**  
\(F=\begin{bmatrix}1&0.1\\0&0.9\end{bmatrix}\)

*Reflection:* Linearization point par velocity jahaan evaluate hui, wahi drag coefficient effective ban jaata hai.

**Example 4 — Full EKF prediction-update cycle (escalated)**
*Given:* 1-D falling body, \(f(x,v)=[x+v\Delta t-0.5g\Delta t^2,v-g\Delta t]^\top\) (linear) lekin measurement \(h=\sqrt{x^2+100^2}\), \(\hat{x}^-=[1000, -80]^\top\), \(P^-=\text{diag}(100,4)\), \(R=9\)
*Find:* Complete update step

\(H=[1000/1004.99,0]\approx[0.995,0]\)  
\(S=0.995^2\cdot100+9\approx108\)  
\(K=[0.92,0]^\top\) (approx)  
Updated state aur covariance calculate karo.

**Final answer**  
\(\hat{x}^+=[995.2,-80]^\top\), \(P^+\) reduced in position.

*Reflection:* Nonlinear range measurement ne sirf position variance ko strongly update kiya; velocity almost untouched rahi kyunki \(H\) mein velocity column zero tha.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using constant \(F\) and \(H\) across steps | Students copy linear KF code directly               | Har predict-update cycle par Jacobian re-evaluate karo |
| Forgetting to evaluate at predicted state | Confusion between \(\hat{x}_{k|k}\) aur \(\hat{x}_{k+1|k}\) | Hamesha prediction ke baad wale estimate par linearize karo |
| Jacobian sign error (missing minus) | Derivative calculation mein careless minus          | Symbolic toolbox ya finite-difference check lagaao    |
| Non-symmetric \(P\) after update  | Transpose mistake in \(F\) ya \(H\)                 | Update ke baad \(P\) ko force-symmetrize karo        |
| Large linearization error ignored | Covariance \(Q\) artificially bada nahi kiya        | Innovation sequence whiteness test chalao            |
| Division by zero in trig Jacobians | Angle = 0 ya 180° par atan2 singularity           | Small epsilon add karo ya quaternion representation use karo |

## 7. The textbook-precise statement

The Extended Kalman Filter for the discrete-time nonlinear system
\[
x_{k+1}=f(x_k,u_k,w_k),\qquad z_k=h(x_k,v_k)
\]
is obtained by linearizing \(f\) and \(h\) about the current estimate. Let
\[
F_k=\frac{\partial f}{\partial x}\bigg|_{\hat{x}_{k|k},u_k,0},\qquad H_k=\frac{\partial h}{\partial x}\bigg|_{\hat{x}_{k+1|k},0}.
\]
Then the filter equations are exactly those of the linear Kalman filter with these time-varying matrices (Simon, *Optimal State Estimation*, 2006, §14.2).

## 8. Visual — diagram or schematic

```text
          f(x)
           ^
           |               slope = F = df/dx |_{\hat x}
           |            __
nonlinear /          __/
curve    /        __/
         /     __/
        /   __/
       / __/
      /_/
     / 
    ---------------------------> x
         \hat x
```
Diagram shows a nonlinear curve, the point \(\hat{x}\), and the tangent line whose slope is the Jacobian evaluated exactly at that point.

## 9. The memory technique

**The hook**  
Socho EKF ek “chameleon Kalman Filter” hai — har jagah jaake apna rang (linear model) badalta hai Jacobian ke through.

**What to overlearn**  
1. \(F_k=\partial f/\partial x\) aur \(H_k=\partial h/\partial x\) evaluated at current estimate.  
2. Covariance equations mein sirf yeh do matrices linear KF se alag hain.

**Spaced-repetition schedule**  
1 din baad, 3 din, 7 din, 16 din, 35 din — har baar ek naya nonlinear example khud linearize karke dekho.

**First-principles fallback**  
Agar Jacobian formula bhool jaaye to Taylor series yaad karo: \(f(x)\approx f(\hat{x})+f'(\hat{x})(x-\hat{x})\); matrix version mein \(f'\) hi Jacobian matrix ban jaati hai.

## 10. What this unlocks

Yeh topic aapko Unscented Kalman Filter, particle filters, aur moving-horizon estimation samajhne ke liye ready karta hai. Aage jaakar aap Invariant EKF, Lie-group filters, aur differentiable Kalman filters (learning-based) padh sakte ho.

- GPS/INS tightly-coupled fusion
- Visual-inertial odometry (VIO) pipelines
- Spacecraft attitude determination (MEKF)

## 11. Self-check — five questions, no answers

1. Ek scalar nonlinear function \(f(x)=x^3\) ko \(\hat{x}=2\) par linearize karo aur slope likho.
2. 3-D position state ke liye range measurement ka Jacobian kaunsa shape (row/column) hoga?
3. Agar aap \(F_k\) ko galti se transpose kar do to predicted \(P\) kis property ko violate karega?
4. EKF mein linearization error ko theoretically kaise quantify kar sakte ho (second-order term)?
5. Ek orbit determination problem mein jab satellite Earth shadow mein jaaye, measurement Jacobian suddenly kyun zero ho sakta hai aur iska filter par kya asar padega?