## 1. The one-sentence answer
**Free fall is one-dimensional motion under constant gravitational acceleration whose magnitude is 9.8 m/s² and whose direction is always toward Earth’s center; the numerical sign of this acceleration is fixed once a coordinate axis is chosen.**

An object released near Earth’s surface experiences a steady change in velocity of 9.8 m/s every second, directed downward. No other forces (air resistance, thrust) act, so the acceleration vector remains exactly constant in both size and direction. The value 9.8 m/s² is therefore the magnitude; the sign appears only after an observer decides which way is positive.

Because displacement, velocity, and acceleration are vectors, their algebraic signs must stay consistent with the chosen axis throughout any calculation. Reversing the axis reverses every sign; forgetting this single rule produces every common error in free-fall problems.

> [!NOTE]
> The single most important insight is that **g itself never changes sign**; only the coordinate convention you adopt can flip the algebraic sign that appears in the equations.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage return-to-launch-site burns treat the booster as a free-falling body once the engines cut off; the guidance loop integrates the constant –9.80665 m/s² (positive upward) to predict touchdown velocity within centimeters per second.  

Semiconductor wire-bonding machines drop a capillary tool onto a silicon die; the impact velocity is calculated from free-fall kinematics so that the force stays below the fracture threshold of 7 µm gold wire.  

The Gravity Recovery and Climate Experiment Follow-On (GRACE-FO) satellites measure tiny deviations from 9.8 m/s² caused by Earth’s non-uniform mass distribution; those deviations are the raw data for monthly global water-storage maps.  

Elevator ride-quality standards (ISO 18738) require manufacturers to keep peak acceleration during emergency stops below 0.2 g; the calculation begins from the free-fall equation with the sign convention that upward is positive.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Displacement & position  | Free fall is defined by change in position along one axis |
| Average vs. instantaneous velocity | Velocity changes continuously under constant acceleration |
| Vector sign convention   | Direction of g must be encoded as + or – once an axis is fixed |
| One-dimensional kinematics equations | All free-fall problems are solved with these four equations |

## 4. Building the idea — from intuition to formalism

### Step 1 — Gravity produces constant acceleration
Near Earth’s surface every unsupported object speeds up downward at the same rate regardless of its mass.  
Drop a marble and a coin from the same height; both reach the floor after the same time.  
The acceleration vector is therefore  
$$ \vec{a} = -g \hat{j} $$  
where \( g = 9.8 \) m/s² and \(\hat{j}\) points upward.  

> [!WARNING]  
> Treating g as a variable that depends on the object’s mass will produce answers that violate the equivalence principle.

### Step 2 — Choose a coordinate axis
An axis is an imaginary directed line; its positive sense is chosen once and never changed inside a given problem.  
If you stand on the ground and point the positive y-axis straight up, then every downward quantity receives a minus sign.  
The acceleration component along this axis is therefore the scalar  
$$ a_y = -g. $$

> [!WARNING]  
> Switching the positive direction midway through a calculation without flipping all signs yields velocity or position values that point the wrong way.

### Step 3 — Write the kinematic definitions with the chosen sign
Velocity is the time derivative of position; acceleration is the time derivative of velocity. With constant \( a_y = -g \),  
$$ v_y(t) = v_{y0} - g t, $$  
$$ y(t) = y_0 + v_{y0} t - \frac{1}{2} g t^2. $$

> [!WARNING]  
> Omitting the minus sign in front of g when upward is positive turns a physically correct deceleration into an unphysical acceleration upward.

### Step 4 — Apply initial conditions
At release, \( v_{y0} = 0 \). The equations simplify to  
$$ v_y = -g t, \qquad y = y_0 - \frac{1}{2} g t^2. $$  
The negative sign tells you velocity becomes more negative (downward) as time increases.

> [!WARNING]  
> Setting \( v_{y0} \) to a positive number when the object is actually thrown downward violates the chosen coordinate convention.

### Step 5 — Recover the textbook statement
Under the single assumption that air resistance is negligible, the acceleration of any object in free fall is exactly  
$$ a_y = -g = -9.8\,\text{m/s}^2 $$  
when the positive y-axis points away from Earth’s center. This is the precise statement used in every subsequent derivation.

## 5. Worked examples — every step shown

**Example 1 — Ball dropped from rest**  
*Given:* A ball is released from rest at \( y_0 = 20 \) m, upward positive.  
*Find:* Velocity and position after 2.0 s.  

Step 1: \( a_y = -9.8 \) m/s² (definition of free fall).  
*Why:* Constant gravitational acceleration with upward positive.  

Step 2: \( v_y(t) = 0 - 9.8 t \).  
*Why:* Direct integration of constant acceleration from initial velocity zero.  

Step 3: At \( t = 2.0 \) s, \( v_y = -19.6 \) m/s.  
*Why:* Simple substitution; negative sign indicates downward motion.  

Step 4: \( y(t) = 20 - \frac12(9.8)t^2 \).  
*Why:* Second integration with initial position 20 m.  

Step 5: \( y(2.0) = 0.4 \) m.  
*Why:* Arithmetic yields position still above ground.  

**0.4 m**  
*Reflection:* The example is easy because initial velocity is zero; the only possible sign error is forgetting the minus on g.

**Example 2 — Ball thrown upward**  
*Given:* Ball thrown upward at 15 m/s from y = 0.  
*Find:* Time to reach maximum height.  

Step 1: At apex, \( v_y = 0 \).  
*Why:* Velocity changes continuously from positive to negative.  

Step 2: \( 0 = 15 - 9.8 t \).  
*Why:* Use velocity equation with known final velocity.  

Step 3: \( t = 1.53 \) s.  
*Why:* Division isolates time; result must be positive.  

**1.53 s**  
*Reflection:* The sign of initial velocity is crucial; reversing it would give a nonsense negative time.

**Example 3 — Object thrown downward**  
*Given:* Ball thrown downward at 10 m/s from 30 m height.  
*Find:* Speed on impact with ground.  

Step 1: \( v_y^2 = v_{y0}^2 + 2 a_y \Delta y \).  
*Why:* Avoids explicit time; uses displacement directly.  

Step 2: \( v_y^2 = (-10)^2 + 2(-9.8)(-30) \).  
*Why:* Both initial velocity and displacement are negative.  

Step 3: \( v_y = -27.2 \) m/s.  
*Why:* Negative root chosen because motion is downward.  

**-27.2 m/s**  
*Reflection:* Two negatives inside the square root must be handled carefully; dropping either sign produces an incorrect magnitude.

**Example 4 — Two objects released at different times**  
*Given:* First ball dropped at t = 0 from 50 m; second dropped at t = 1.5 s from same height.  
*Find:* Time after first release when they are 10 m apart.  

Step 1: Write positions: \( y_1 = 50 - 4.9 t^2 \), \( y_2 = 50 - 4.9 (t-1.5)^2 \).  
*Why:* Same acceleration, different initial times.  

Step 2: Set \( y_1 - y_2 = 10 \).  
*Why:* Algebraic statement of separation.  

Step 3: Expand and solve quadratic: \( t = 2.84 \) s.  
*Why:* Quadratic formula yields physical root greater than 1.5 s.  

**2.84 s**  
*Reflection:* Time offset must be substituted before expanding; omitting it is the most frequent algebraic slip.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using g = +9.8 when upward is positive | Confusing magnitude with component          | Write \( a_y = -g \) immediately after choosing axis |
| Taking square-root velocity without sign check | Forgetting motion direction                 | Always compare final velocity sign with chosen positive direction |
| Mixing coordinate systems mid-problem | Changing “up” halfway through calculation   | Fix axis once at the start; restate it before each new equation |
| Treating g as variable with height in short problems | Over-applying inverse-square law too early  | Use constant g for heights ≪ Earth radius    |
| Forgetting t = 0 reference when two objects released at different times | Implicit assumption both start at same instant | Explicitly write \( t_2 = t_1 - \Delta t \)  |
| Reporting only speed instead of velocity | Losing vector information                   | State both magnitude and direction or signed component |
| Using 9.81 instead of 9.8 without justification | Over-precision in introductory work         | Adopt 9.8 m/s² unless problem states otherwise |

## 7. The textbook-precise statement
When air resistance is negligible, the acceleration of an object in free fall is constant and equal to the local gravitational acceleration vector \(\vec{g}\). With the positive y-axis directed vertically upward, the scalar component is  
$$ a_y = -g, \qquad g = 9.80\,\text{m/s}^2 $$  
(Halliday, Resnick & Walker, *Fundamentals of Physics*, 12e, §2-6). This statement assumes a flat-Earth, constant-g approximation valid for displacements much smaller than Earth’s radius.

## 8. Visual — diagram or schematic
```text
y (m)
 ^
 |          v = 0 (apex)
 |             *
 |            / \
 |           /   \
 |          /     \
 |         /       \
 |        /         \
 |       /           \
 |      /             \
 |     /               \
 |    /                 \
 |   /                   \
 |  /                     \
 | /                       \
 |/_________________________\______> t (s)
y0 (release)          ground
Positive y upward → a_y = –9.8 m/s² everywhere
```

## 9. The memory technique
1. **The hook** — Picture an arrow labeled “g” painted on the floor pointing straight down; every velocity vector you calculate must eventually point the same way as that arrow.  
2. **What to overlearn** — \( a_y = -g \) (upward positive), \( v_y = v_{y0} - gt \), \( y = y_0 + v_{y0}t - \frac12 g t^2 \).  
3. **Spaced-repetition schedule** — Review the three equations at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from \( a_y = \text{constant} \) by integrating twice with respect to time, inserting the chosen sign of the axis at the first integration step.

## 10. What this unlocks
Mastery of signed free-fall acceleration lets you move without hesitation into two-dimensional projectile motion, orbital mechanics, and non-inertial frames.  

- Projectile motion in the x-y plane  
- Escape velocity and circular-orbit derivations  
- Effective gravity inside an accelerating elevator or rocket  
- Numerical integration of variable-g trajectories for interplanetary transfers  

## 11. Self-check — five questions, no answers
1. A stone is thrown vertically upward with speed 12 m/s. What is its velocity 1.8 s later if upward is positive?  
2. An object falls from rest for 3.5 s. How far has it moved if downward is taken as positive?  
3. Two balls are released from the same height 0.8 s apart. Which equation correctly gives their separation as a function of time after the first release?  
4. A student calculates the impact speed of a ball thrown upward and obtains a positive number. What sign-convention mistake has most likely occurred?  
5. Derive the time at which a ball thrown upward at speed \( v_0 \) returns to its release height; show that the result is independent of the sign chosen for g provided the axis remains fixed.