## 1. The one-sentence answer
**Equations of motion (SUVAT) are obtained by successive integration of the definition of acceleration under the assumption that acceleration remains constant.**

Aap already jaante hain ki velocity position ka time derivative hota hai aur acceleration velocity ka time derivative. Jab acceleration constant maana jaaye, to usko ek baar integrate karne se velocity mil jaati hai aur doosri baar integrate karne se position. Is process mein dono integration constants ko initial conditions se determine karna padta hai, jo ultimately five SUVAT relations deta hai.

Yeh approach sirf formulas yaad karne se alag hai kyunki yeh dikhaata hai ki har relation kis mathematical step se aa rahi hai. Agar acceleration time ke saath badlegi, to yeh same method use karke numerical ya symbolic integration kar sakte ho.

> [!NOTE]
> The single most important insight is that the familiar SUVAT set is simply the antiderivative pair of a constant function, with the two constants fixed by initial velocity and initial position.

## 2. Why this matters — concrete and current
SpaceX Falcon 9 first-stage boost-back burn mein constant thrust (hence nearly constant acceleration) ka assumption karke exact touchdown velocity predict karte hain; calculus derivation wahi equation deta hai jo onboard guidance mein hard-coded hoti hai.

ISRO ke Reusable Launch Vehicle landing experiments mein same integration se vertical velocity profile banaya jaata hai taaki heat-shield separation timing sahi ho.

Semiconductor lithography machines (ASML EUV steppers) mein stage acceleration ko constant rakh ke sub-nanometer positioning accuracy achieve karte hain; yeh positioning equations SUVAT integration se hi derive hote hain.

Projectile motion tables used in long-range artillery fire-control computers constant gravitational acceleration ke integration par based hain; har range table entry ek closed-form SUVAT result hoti hai.

Particle-detector tracking algorithms (LHCb experiment) constant magnetic field mein charged-particle trajectories ko circular arcs ke pieces mein todte hain, jinke local segments SUVAT-style integrated equations se fit kiye jaate hain.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Derivative           | Defines instantaneous velocity and acceleration           |
| Indefinite integral  | Reverses differentiation to recover velocity and position |
| Definite integral    | Applies limits to obtain displacement over finite time    |
| Constant of integration | Fixes the two arbitrary constants using initial conditions |
| Assumption of constant acceleration | Allows analytic antiderivatives without numerical methods |

Agar derivative ya indefinite integral abhi clear nahi, to pause karke woh pehle revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start from definitions
Acceleration ko velocity ke derivative ke roop mein likho. Iska matlab acceleration, velocity mein kitni jaldi change aa raha hai, yeh batata hai.

Concrete example: agar ek rocket ka acceleration 10 m/s² constant hai, to velocity linearly badhegi.

Formal statement:
$$
a = \frac{dv}{dt} = \text{constant}.
$$

> [!WARNING]
> Agar aap derivative ko sirf slope samajh kar ruk jaate ho aur antiderivative nahi dhundhte, to velocity aur position expressions kabhi nahi milenge.

### Step 2 — First integration for velocity
Dono taraf integrate karo. Left side velocity deta hai, right side time ke saath linear term.

Formal statement:
$$
\int a\,dt = \int a\,dt \implies v(t) = at + C_1.
$$

### Step 3 — Apply initial condition for velocity
t = 0 par velocity u maano. Isse C₁ = u milta hai.

Formal statement:
$$
v(t) = u + at.
$$

### Step 4 — Second integration for position
Velocity ko position ke derivative ke roop mein likh kar doosri baar integrate karo.

Formal statement:
$$
\frac{ds}{dt} = u + at \implies s(t) = ut + \frac12 at^2 + C_2.
$$

### Step 5 — Apply initial condition for position
t = 0 par s = 0 lete hain (origin choose kar sakte ho), to C₂ = 0.

Formal statement:
$$
s(t) = ut + \frac12 at^2.
$$

### Step 6 — Eliminate time to obtain remaining SUVAT relations
v = u + at se t nikaal kar s mein daalo aur v² = u² + 2as pao. Yeh step sirf algebraic manipulation hai.

### Step 7 — Textbook-grade compact form
Constant acceleration a ke liye displacement, velocity aur time ke beech ke sabhi relations ek hi integration family se aate hain.

## 5. Worked examples — har step show karo

**Example 1 — Basic velocity from constant acceleration**
*Given:* a = 3 m/s², u = 5 m/s.
*Find:* v(t).
- Integrate a once: v(t) = 3t + C₁.  
  *Why:* antiderivative of constant is linear term.
- t = 0 par v = 5: C₁ = 5.  
  *Why:* fixes the integration constant using initial data.
**v(t) = 5 + 3t**

*Reflection:* Yeh sabse simple case hai; yahin se baaki equations build hoti hain.

**Example 2 — Position from velocity**
*Given:* v(t) = 5 + 3t, s(0) = 0.
*Find:* s(t).
- Integrate v: s(t) = 5t + (3/2)t² + C₂.  
  *Why:* velocity position ka derivative hai, isliye antiderivative position deta hai.
- s(0) = 0: C₂ = 0.  
  *Why:* reference point origin par set kiya.
**s(t) = 5t + (3/2)t²**

*Reflection:* Do integration constants alag-alag initial conditions se aate hain.

**Example 3 — Derive v² = u² + 2as**
*Given:* v = u + at, s = ut + (1/2)at².
*Find:* relation without t.
- t = (v − u)/a solve karo.  
  *Why:* time eliminate karna hai.
- Isko s mein substitute: s = u(v − u)/a + (1/2)a[(v − u)/a]².  
  *Why:* algebraic substitution.
- Simplify: multiply by 2a, rearrange.  
  *Why:* terms collect karne se quadratic cancel hota hai.
**v² = u² + 2as**

*Reflection:* Yeh equation time ke bina energy-like relations deti hai.

**Example 4 — Non-zero initial position**
*Given:* a = −9.8 m/s², u = 20 m/s, s(0) = 15 m.
*Find:* s(t) aur time of flight jab s = 0.
- v(t) = 20 − 9.8t.  
  *Why:* first integration.
- s(t) = 15 + 20t − 4.9t².  
  *Why:* second integration with C₂ = 15.
- Set s = 0: 4.9t² − 20t − 15 = 0.  
  *Why:* quadratic formula ready.
**t ≈ 4.82 s (positive root)**

*Reflection:* Initial position sirf constant term badalta hai; baaki structure same rehta hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting +C after integration | Students treat indefinite integral as definite | Har antiderivative ke baad C likho aur baad mein evaluate karo |
| Using s = ut + ½at² when a varies | Over-generalising constant-a formula        | Check problem statement mein a constant hai ya nahi |
| Sign error in a (e.g., gravity) | Coordinate direction choose nahi karte      | Pehle +ve direction fix karo, phir a sign lagao |
| Mixing average and instantaneous velocity | Derivative ko average samajhna              | Derivative definition yaad rakh: limit Δt→0 |
| Applying SUVAT to circular motion | Acceleration direction change hoti hai      | Sirf jab |a| aur direction dono constant hon tab use karo |

## 7. The textbook-precise statement
Under the hypothesis that acceleration a is constant in both magnitude and direction, the velocity and position of a particle are given by the unique solutions of the initial-value problems
\[
\frac{dv}{dt}=a,\qquad v(0)=u
\]
and
\[
\frac{ds}{dt}=v(t),\qquad s(0)=s_0.
\]
Integration yields the five equivalent kinematic relations (Halliday, Resnick & Walker, *Fundamentals of Physics*, 12e, §2-5, equations 2-11 through 2-15).

## 8. Visual — diagram or schematic
```
t-axis
  ↑
  |          v(t) = u + at
  |        /
  |      /
  |    /
  |  /
  |/____________________→ t
  u (intercept)
```
Velocity-time graph: straight line starting at u, slope exactly equal to constant a. Area under line between t=0 and t gives displacement s.

## 9. The memory technique
1. **The hook** — Imagine acceleration as a “constant tap on the gas pedal”; one tap gives velocity ramp, two taps give position parabola.
2. **What to overlearn** — v = u + at and s = ut + ½at² together with the rule “two integrations, two constants fixed by initial data”.
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Bhool jaaye to derivative definitions likho: a = dv/dt, v = ds/dt, dono taraf integrate karo aur constants lagao.

## 10. What this unlocks
Yeh derivation aapko variable acceleration, numerical integration aur differential-equation models ke liye ready karti hai.

- Projectile motion with linear air drag
- Rocket equation with variable mass
- Orbital mechanics two-body problem (local linearisation)
- Kalman-filter state propagation in inertial navigation

## 11. Self-check — five questions, no answers
1. Derive v² = u² + 2as starting only from a = dv/dt without using time explicitly.
2. A particle starts at s = −3 m with u = 4 m/s and a = 2 m/s². Write s(t) and find the instant when velocity doubles.
3. Why does the constant-acceleration assumption break for a satellite in low-Earth orbit?
4. Show that the average velocity over [0,t] equals (u + v)/2 only when acceleration is constant.
5. A velocity-time graph is a straight line crossing v = 0 at t = 5 s. If displacement from t = 0 to t = 10 s is zero, what must be the value of u?