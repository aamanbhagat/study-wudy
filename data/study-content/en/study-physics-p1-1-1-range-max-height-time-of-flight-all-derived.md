## 1. The one-sentence answer
**Range, maximum height, and time of flight are the three closed-form expressions obtained by integrating the constant-acceleration kinematic equations after the initial velocity vector is decomposed into independent horizontal and vertical components.**

A projectile launched with speed \(v_0\) at angle \(\theta\) above the horizontal follows a parabolic path because gravity acts only vertically while the horizontal velocity remains constant. The time the object spends in the air is fixed solely by the vertical motion returning to the launch height. Once that flight duration is known, the horizontal displacement (range) follows immediately from the unchanging horizontal speed. The peak height is reached exactly when the vertical velocity passes through zero, again using only the vertical equation.

These three quantities therefore exhaust the description of the ideal trajectory. They are not independent; each is a different projection of the same two underlying differential equations \(\ddot{x}=0\) and \(\ddot{y}=-g\).

> [!NOTE]
> The single deepest insight is that the horizontal and vertical motions never exchange information; every derived formula is simply the result of solving one component and then multiplying by the duration supplied by the other.

## 2. Why this matters — concrete and current
SpaceX recovers Falcon 9 first stages by predicting the exact down-range landing point using the range equation modified for a non-zero landing altitude and a time-varying mass; the same calculation supplies the entry-interface coordinates for the Dragon capsule.

Artillery fire-control computers on modern howitzers solve the quadratic for time of flight in real time, then correct for Coriolis and wind by iterating the ideal range and height formulas; the U.S. Army’s M777 system performs this at 10 Hz during flight.

Basketball analytics platforms such as Second Spectrum reconstruct three-dimensional trajectories from broadcast video by fitting the observed arc to the analytic maximum-height and range expressions, yielding release speed and angle for every three-point attempt.

ESA’s Juice mission trajectory designers used the vacuum range equation to size the gravity-assist maneuvers at Earth and Venus; the resulting \(\sin 2\theta\) dependence dictated the precise launch windows published in the 2023 mission analysis report.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector decomposition     | Initial velocity must be split into \(v_x\) and \(v_y\) that evolve separately. |
| Constant-acceleration kinematics | The four equations relating displacement, velocity, acceleration, and time are applied once per axis. |
| Independence of perpendicular axes | Horizontal acceleration is zero; vertical acceleration is \(-g\); the two never couple. |
| Quadratic formula        | Vertical displacement yields a quadratic equation whose roots give the two times the projectile is at a given height. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Resolve the launch velocity
The initial velocity vector \(\vec{v}_0\) points at angle \(\theta\). Its horizontal part never changes; its vertical part is eroded by gravity at rate \(g\).

A cannon fires a ball at 50 m/s and 30°. Then \(v_{0x}=50\cos 30^\circ=43.3\) m/s stays constant, while \(v_{0y}=50\sin 30^\circ=25\) m/s begins to decrease.

\[
v_{0x}=v_0\cos\theta,\qquad v_{0y}=v_0\sin\theta
\]

> [!WARNING]
> Treating the full speed \(v_0\) as the horizontal speed produces a range that grows without bound as \(\theta\to 90^\circ\), contradicting observation.

### Step 2 — Write the vertical position equation
Vertical motion starts at \(y=0\), ends at \(y=0\) again. The only acceleration is \(-g\).

\[
y(t)=v_{0y}t-\frac12 gt^2
\]

Set \(y(T)=0\) and solve for the nonzero root \(T\):

\[
T=\frac{2v_{0y}}{g}=\frac{2v_0\sin\theta}{g}
\]

### Step 3 — Locate the maximum height
Vertical velocity reaches zero at the apex. Substitute that instant into the vertical position equation.

\[
v_y(t)=v_{0y}-gt=0\quad\Rightarrow\quad t_\text{apex}=\frac{v_{0y}}{g}
\]

\[
H=v_{0y}\Bigl(\frac{v_{0y}}{g}\Bigr)-\frac12 g\Bigl(\frac{v_{0y}}{g}\Bigr)^2=\frac{v_{0y}^2}{2g}
\]

### Step 4 — Obtain the range
Horizontal displacement is simply constant speed times total flight time.

\[
R=v_{0x}T=(v_0\cos\theta)\Bigl(\frac{2v_0\sin\theta}{g}\Bigr)=\frac{v_0^2\sin 2\theta}{g}
\]

### Step 5 — Textbook statement of the three results
Under constant gravity, flat ground, and no drag, the time of flight, maximum height, and range are exactly the three closed expressions above.

## 5. Worked examples — every step shown

**Example 1 — Level-ground baseball**
- *Given:* \(v_0=40\) m/s, \(\theta=45^\circ\), \(g=9.8\) m/s².
- *Find:* \(T\), \(H\), \(R\).

Vertical component: \(v_{0y}=40\sin45^\circ=28.28\) m/s.  
Time of flight: \(T=2\times28.28/9.8=5.77\) s.  
*Why:* Solve \(y=0\) for the nonzero root.  
Maximum height: \(H=(28.28)^2/(2\times9.8)=40.8\) m.  
*Why:* Use apex time \(v_{0y}/g\).  
Range: \(R=40\cos45^\circ\times5.77=163\) m.  
*Why:* Multiply constant \(v_{0x}\) by \(T\).

**Final answer**  
**\(T=5.77\) s, \(H=40.8\) m, \(R=163\) m**

*Reflection:* The 45° case collapses \(\sin2\theta=1\), giving the absolute maximum range for fixed speed.

**Example 2 — Elevated launch point**
- *Given:* Same launch, but landing 10 m below launch height.
- *Find:* New time of flight.

Solve \(y(T)=-10\):  
\(-10=28.28T-4.9T^2\).  
Quadratic formula yields \(T=6.3\) s (positive root).  
*Why:* The extra displacement shifts the constant term, requiring the quadratic solution.

**Final answer**  
**\(T=6.3\) s**

*Reflection:* The simple \(2v_{0y}/g\) formula fails once launch and landing heights differ.

**Example 3 — Maximum-height condition**
- *Given:* \(v_0=100\) m/s. Find \(\theta\) that maximizes \(H\).

\(H=\frac{(100\sin\theta)^2}{2g}\). Differentiate with respect to \(\theta\) and set to zero: \(\theta=90^\circ\).  
*Why:* Height depends only on the sine term; it is largest at vertical launch.

**Final answer**  
**\(\theta=90^\circ\) maximizes height.**

*Reflection:* Range and height are optimized by different angles, revealing the trade-off.

**Example 4 — Complementary angles**
- *Given:* \(\theta=30^\circ\) and \(\theta=60^\circ\), same \(v_0\).
- *Find:* Compare ranges.

\(\sin(2\times30^\circ)=\sin60^\circ=\sqrt3/2\), identical for 60°.  
*Why:* The double-angle identity is symmetric about 45°.

**Final answer**  
**Ranges are equal.**

*Reflection:* The identity \(\sin(90^\circ-\phi)=\sin\phi\) is the algebraic origin of complementary-angle equivalence.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using \(v_0\) instead of \(v_{0x}\) for range | Students forget decomposition. | Always write \(v_{0x}=v_0\cos\theta\) first. |
| Forgetting the factor of 2 in time of flight | Confuse apex time with total time. | Remember the trajectory is symmetric; total time is twice the ascent time. |
| Applying range formula on sloped ground | Formula assumes \(y=0\) at both ends. | Solve the quadratic \(y(T)=0\) with the actual landing height. |
| Treating \(g\) as positive | Sign error in vertical acceleration. | Adopt the convention \(\vec{a}=-g\hat{j}\) consistently. |
| Maximizing range at 45° even with wind or drag | Ideal derivation omits those forces. | Re-derive from the differential equations once non-gravitational forces appear. |
| Using \(\sin\theta\) for both height and range without checking dimensions | Mixing components. | Verify every term has correct trigonometric factor before substituting numbers. |
| Neglecting that \(T\) itself depends on \(\theta\) | Treating flight time as fixed. | Always recompute \(T\) when launch angle changes. |

## 7. The textbook-precise statement
In the absence of air resistance, with constant gravitational acceleration \(-g\hat{j}\) and launch and landing at the same horizontal level, the time of flight, maximum height, and range of a projectile launched with speed \(v_0\) at angle \(\theta\) are
\[
T=\frac{2v_0\sin\theta}{g},\qquad
H=\frac{v_0^2\sin^2\theta}{2g},\qquad
R=\frac{v_0^2\sin 2\theta}{g}.
\]
(Halliday, Resnick & Walker, *Fundamentals of Physics*, 12e, §4-3.)

## 8. Visual — diagram or schematic
```text
          H
          ^
         /|\  apex
        / | \
       /  |  \
      /   |   \
     /    |    \
    /     |     \
   /      |      \
  /       |       \
 /        |        \
o---------+---------o------> x
 launch   R/2      landing
          (symmetry point)
v0 at angle θ above horizontal
vertical axis y, horizontal axis x
g downward
```

## 9. The memory technique
**The hook**  
Picture a basketball arcing through a perfect 45° rainbow; the ball’s shadow on the ground travels at constant speed while the ball itself rises and falls like a bouncing ball on a vertical clock—two motions that never talk to each other.

**What to overlearn**  
- \(T=2v_0\sin\theta/g\)  
- \(H=v_0^2\sin^2\theta/(2g)\)  
- \(R=v_0^2\sin2\theta/g\)

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Start from \(\ddot{x}=0\), \(\ddot{y}=-g\), integrate twice, impose boundary conditions \(y(0)=y(T)=0\) and \(v_y(t_\text{apex})=0\), then multiply \(x(T)\) by the resulting \(T\).

## 10. What this unlocks
These three expressions are the reference solutions against which every more realistic trajectory model is compared.

- Numerical integration of drag and wind begins by subtracting the ideal range from the simulated range.
- Orbital-mechanics “gravity-turn” trajectories reduce to the same decomposition once thrust is aligned with velocity.
- Monte-Carlo landing-dispersion analyses for reusable rockets treat the ideal range equation as the mean and add stochastic perturbations.
- Video-based motion capture in biomechanics recovers release parameters by fitting observed arcs to the analytic height and range formulas.

## 11. Self-check — five questions, no answers
1. A projectile is launched at 60° with speed 20 m/s on level ground. Compute its range and compare it with the range at 30°; explain why they are equal without calculating both.

2. Derive the launch angle that maximizes range when the landing point is a vertical distance \(h\) below the launch point; show that the optimum angle is no longer 45°.

3. A ball is thrown horizontally from a cliff of height \(H\) with speed \(v_0\). Write the exact expression for the horizontal distance traveled before impact and prove it is not given by the standard range formula.

4. Identify the algebraic step that would fail if the acceleration due to gravity were allowed to point at an angle to the vertical; illustrate with a one-line counter-example.

5. Two projectiles are launched with identical speeds but angles \(\theta\) and \(90^\circ-\theta\). Show that their maximum heights sum to a quantity independent of \(\theta\).