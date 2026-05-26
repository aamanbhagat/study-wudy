## 1. The one-sentence answer
**State-space representation converts a system of linear differential equations into the compact matrix form \(\dot{x}=Ax+Bu\), \(y=Cx+Du\), where the internal state vector \(x\) evolves under the influence of the input vector \(u\) and produces the output vector \(y\).**

Any collection of higher-order linear differential equations that describe a physical plant can be rewritten as a set of coupled first-order equations. The first-order form is obtained simply by defining each successive derivative of the original variables as a new component of the vector \(x\). Once this choice is made, the coefficients that multiply the states and the inputs assemble themselves into the constant matrices \(A\) and \(B\); the same states and inputs are then combined by \(C\) and \(D\) to form any measured outputs.

The resulting description is coordinate-free in the sense that any valid set of states yields an equivalent dynamical portrait, yet the matrices themselves change with the coordinate choice. The representation therefore separates the intrinsic physics (the eigenvalues of \(A\)) from the particular sensors and actuators chosen for a given vehicle.

> [!NOTE]
> The matrices \(A\), \(B\), \(C\), and \(D\) are not arbitrary; they are the unique linear map that reproduces every trajectory of the original differential equations when the initial state and input history are supplied.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 booster performs real-time three-axis attitude control during boost-back burns by propagating a six-state rigid-body model whose \(A\) matrix contains the inertia tensor and whose \(B\) matrix maps TVC gimbal commands; the same state vector is fed to the Kalman filter that fuses IMU and GPS data.  

NASA’s OSIRIS-REx spacecraft used a 12-state orbital-element formulation of exactly this form to generate the guidance commands that executed the Touch-and-Go sampling maneuver at Bennu; the \(C\) matrix extracted range and bearing observables for the LIDAR.  

Modern electric vertical-takeoff aircraft such as Joby Aviation’s prototypes embed the state-space model of the coupled rigid-body and rotor dynamics inside their flight-control computers, allowing gain-scheduled LQR controllers to stabilize the vehicle across the entire transition envelope.  

Semiconductor-grade reaction-wheel assemblies on satellites (Airbus OneWeb constellation) rely on the same representation to schedule torque commands that keep star-tracker line-of-sight jitter below 0.001 arc-second; the \(D\) matrix here is identically zero because reaction wheels produce no instantaneous torque feed-through to the optical payload.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| First-order vector ODE         | The entire representation is nothing but \(\dot{x}=f(x,u)\) written in matrix form. |
| Matrix multiplication          | Every term \(Ax\), \(Bu\), \(Cx\), \(Du\) is a matrix-vector product. |
| Linear independence of states  | Guarantees that the chosen \(x\) spans the full solution space of the original differential equations. |
| Initial-value problem          | The state at \(t_0\) is the sole piece of history required to integrate forward. |

## 4. Building the idea — from intuition to formalism

### Step 1 — From scalar derivatives to a vector
A single second-order equation such as \(\ddot{\theta}+2\zeta\omega_n\dot{\theta}+\omega_n^2\theta=u\) already contains two pieces of information that must be carried forward in time: the angle and its rate. Define the two-component vector \(x=\begin{bmatrix}\theta\\\dot{\theta}\end{bmatrix}\). The original equation then becomes two coupled first-order statements.

\[
\dot{x}_1=x_2,\qquad\dot{x}_2=-\omega_n^2 x_1-2\zeta\omega_n x_2+u
\]

### Step 2 — Collecting coefficients into matrix A
All terms that multiply components of \(x\) are moved to the left-hand side and assembled column-wise. The result is the system matrix

\[
A=\begin{bmatrix}0&1\\-\omega_n^2&-2\zeta\omega_n\end{bmatrix}.
\]

> [!WARNING]
> Swapping the order of the two states produces a different numerical matrix even though the underlying physics is identical; eigenvalues remain unchanged, but eigenvector interpretations shift.

### Step 3 — Introducing the input matrix B
Any external forcing that does not depend on the state appears in a separate column vector \(B\). In the example above the torque enters only the second equation, so

\[
B=\begin{bmatrix}0\\1\end{bmatrix}.
\]

### Step 4 — Forming the output equation
Sensors rarely measure every state. If only angle is measured, the output row vector \(C=\begin{bmatrix}1&0\end{bmatrix}\) extracts \(\theta\) while \(D=0\) because the actuator does not appear directly in the measurement.

### Step 5 — Compact matrix notation
Stacking the two vector equations yields the canonical pair

\[
\dot{x}=Ax+Bu,\qquad y=Cx+Du.
\]

### Step 6 — Verification against the original scalar equation
Differentiate the first state equation once and substitute the second; the original second-order equation is recovered exactly, confirming that no information has been lost or added.

## 5. Worked examples — every step shown

**Example 1 — First-order thermal system**  
*Given:* \(\dot{T}=-\frac{hA}{mc}T+\frac{hA}{mc}T_\text{amb}\).  
*Find:* State-space matrices with \(x=T\), \(u=T_\text{amb}\), \(y=T\).  

Define \(x=T\). The scalar equation is already first-order, therefore  
\[
A=\begin{bmatrix}-\frac{hA}{mc}\end{bmatrix},\quad
B=\begin{bmatrix}\frac{hA}{mc}\end{bmatrix},\quad
C=\begin{bmatrix}1\end{bmatrix},\quad
D=\begin{bmatrix}0\end{bmatrix}.
\]  
*Why* the scalar is already a 1-by-1 matrix: the definition of \(x\) matches the single derivative present.  

**Final answer**  
\[
\dot{x}=Ax+Bu,\quad y=Cx+Du
\]  
with the four matrices shown above.

*Reflection:* The trivial case reveals that dimension of \(A\) equals the order of the highest derivative.

**Example 2 — Planar double integrator (rocket attitude)**  
*Given:* \(\ddot{\theta}=u/I\).  
*Find:* Full state-space quadruple.  

Set \(x_1=\theta\), \(x_2=\dot{\theta}\). Then  
\[
\dot{x}_1=x_2,\qquad\dot{x}_2=\frac{1}{I}u.
\]  
Hence  
\[
A=\begin{bmatrix}0&1\\0&0\end{bmatrix},\quad
B=\begin{bmatrix}0\\1/I\end{bmatrix},\quad
C=\begin{bmatrix}1&0\end{bmatrix},\quad
D=0.
\]  
*Why* the second row of \(A\) is zero: no restoring torque exists.

**Final answer**  
\[
\dot{x}=\begin{bmatrix}0&1\\0&0\end{bmatrix}x+\begin{bmatrix}0\\1/I\end{bmatrix}u,\quad
y=\begin{bmatrix}1&0\end{bmatrix}x.
\]

*Reflection:* The pair \((A,B)\) is controllable; every initial attitude and rate can be driven to zero.

**Example 3 — Mass-spring-damper with position output**  
*Given:* \(m\ddot{z}+c\dot{z}+kz=F\).  
*Find:* Matrices when \(y=z\).  

States: \(x_1=z\), \(x_2=\dot{z}\).  
\[
A=\begin{bmatrix}0&1\\-k/m&-c/m\end{bmatrix},\quad
B=\begin{bmatrix}0\\1/m\end{bmatrix},\quad
C=\begin{bmatrix}1&0\end{bmatrix},\quad
D=0.
\]

**Final answer**  
\[
\dot{x}=Ax+Bu,\quad y=Cx.
\]

*Reflection:* \(D=0\) because force does not instantly affect position.

**Example 4 — Rocket altitude with drag and thrust**  
*Given:* \(m\dot{v}=-mg-D(v)+T\), \(D=0.5\rho C_dA v^2\). Linearize about hover.  
*Find:* State-space model with states altitude and vertical speed.  

After linearization the drag term contributes a damping coefficient \(b= \rho C_dA v_0\). The matrices become  
\[
A=\begin{bmatrix}0&1\\0&-b/m\end{bmatrix},\quad
B=\begin{bmatrix}0\\1/m\end{bmatrix},\quad
C=\begin{bmatrix}1&0\end{bmatrix},\quad
D=0.
\]

**Final answer**  
\[
\dot{x}=Ax+Bu,\quad y=Cx+Du.
\]

*Reflection:* Gravity appears as a constant bias that is trimmed out before linearization; only the perturbation dynamics remain in \(A\).

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Treating \(D\) as always zero     | Most mechanical plants have no direct feed-through  | Check whether any input appears algebraically in the output equation. |
| Using the wrong state ordering    | Different textbooks label position or velocity first| Fix a consistent convention before writing \(A\).    |
| Forgetting that \(A\) changes with coordinate choice | Eigenvalues are invariant, matrix entries are not   | Verify eigenvalues after any similarity transform.   |
| Omitting initial condition \(x(0)\) | The differential equation alone is incomplete       | Always state the initial state vector explicitly.    |
| Confusing controllability with stability | Both involve \(A\) and \(B\), yet they are distinct | Compute rank of controllability matrix separately.   |
| Assuming time-invariant coefficients | Rocket mass changes during burn                     | Verify constancy of \(A,B,C,D\) over the interval of interest. |
| Scaling states without rescaling \(B,C\) | Physical units become inconsistent                  | Keep track of units on every matrix entry.           |

## 7. The textbook-precise statement
A linear time-invariant system of order \(n\) with \(m\) inputs and \(p\) outputs admits the state-space realization
\[
\dot{x}(t)=A x(t)+B u(t),\qquad y(t)=C x(t)+D u(t),
\]
where \(A\in\mathbb{R}^{n\times n}\), \(B\in\mathbb{R}^{n\times m}\), \(C\in\mathbb{R}^{p\times n}\), \(D\in\mathbb{R}^{p\times m}\), provided the \(n\) scalar components of \(x\) are linearly independent and span the solution space of the original \(n\)th-order vector differential equation. (Ogata, *Modern Control Engineering*, 5e, §3-2.)

## 8. Visual — diagram or schematic
```text
u(t) ──►[ B ]──►(+)──►[ 1/s ]──►[ A ]──┐
                 ▲                     │
                 └─────────────────────┘
                           │
                           ▼
                        [ C ]──►(+)──► y(t)
                           ▲         │
                           └─[ D ]───┘
```
Horizontal arrows carry vector signals; the integrator block \(1/s\) converts \(\dot{x}\) into \(x\); the feedback loop through \(A\) is the internal dynamics; feed-through path \(D\) is shown explicitly.

## 9. The memory technique
1. **The hook** — Picture four letters marching in alphabetical order: A (internal dynamics) feeds back on itself, B admits the outside world, C shows selected states to the outside, D lets the outside leak straight through.  
2. **What to overlearn** — The exact dimensions: \(A\) is always square \(n\times n\); \(B\) is tall \(n\times m\); \(C\) is wide \(p\times n\); \(D\) is \(p\times m\).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Start from the highest-order scalar equation, introduce one new state per derivative, and read the coefficients directly into the rows of \(A\) and \(B<|eos|>