## 1. The one-sentence answer
**Weightlessness is the condition in which the normal force vanishes because every part of an object accelerates identically under gravity alone.**

In ordinary language this means you feel “weightless” whenever nothing pushes or pulls on you except gravity. Stand in an elevator that suddenly drops: the floor no longer presses upward, your stomach seems to rise, and for those few seconds you are weightless even though Earth’s gravity has not changed. The same physics occurs on a much larger scale inside an orbiting spacecraft: the entire vehicle and everything inside it fall toward Earth at the same rate, so relative to the cabin floor no contact force appears.

The distinction that matters is between *true* weightlessness (free fall under gravity with no other forces) and *apparent* weight (the reading on a scale or the force your feet feel). Apparent weight can be zero while true gravitational force remains large; the two quantities are therefore not the same.

> [!NOTE]
> The single decisive insight is that weight is not a property of mass alone; it is the contact force required to keep an object from accelerating with the local gravitational field.

## 2. Why this matters — concrete and current
SpaceX Crew Dragon and NASA’s Orion spacecraft both rely on precise knowledge of free-fall conditions to keep thrusters from firing unnecessarily during coast phases; any residual acceleration produces an unwanted “artificial gravity” that must be budgeted in propellant margins.

The International Space Station’s microgravity research racks are calibrated to 10⁻⁶ g; distinguishing true free fall from residual aerodynamic drag or gravity-gradient torques determines whether a given crystal-growth run is valid.

Commercial zero-g aircraft (Zero Gravity Corporation’s modified Boeing 727) sell parabolic flights that deliver 20–25 s of free fall; pilots must maintain the correct 1/3-g nose-down profile or paying passengers experience nausea instead of the intended weightless interval.

Semiconductor manufacturers now test thin-film deposition processes on suborbital rockets (e.g., Blue Origin New Shepard) because the absence of buoyancy-driven convection in true free fall yields more uniform layers than any Earth-based simulation can reproduce.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Newton’s second law      | Weightlessness is defined by the net force being exactly mg with no additional contact term. |
| Normal force             | Apparent weight is the magnitude of the normal force; its absence is the observable signature. |
| Free-fall trajectory     | Only when acceleration equals local g does the normal force drop to zero. |
| Non-inertial frames      | An orbiting cabin is a freely falling frame; fictitious forces appear if analysed from the ground frame. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Everyday contact forces create the sensation of weight
Your feet push upward on the floor with a force equal to your weight when you stand at rest. That push is the normal force.  
Example: bathroom scale reads 700 N for a 70 kg person on Earth.  
Formal statement:  
$$N = mg \quad \text{(at rest on surface)}.$$  
> [!WARNING]  
> Treating the scale reading as “true weight” hides the fact that gravity itself never disappears; only the contact force can be removed.

### Step 2 — Removing the contact force produces apparent weightlessness
If the supporting surface accelerates downward at g, the normal force must drop to zero to satisfy Newton’s second law for the object.  
Example: an elevator cable snaps; inside, a scale reads zero while both scale and passenger accelerate at g.  
Formal statement:  
$$N - mg = m(-g) \implies N = 0.$$  
> [!WARNING]  
> Students often conclude gravity has been “turned off”; the passenger and scale are still accelerating under gravity.

### Step 3 — Orbital motion is continuous free fall
In circular orbit the gravitational force supplies the centripetal acceleration; the spacecraft and astronaut fall at the same rate, so no normal force appears between them.  
Example: ISS altitude 400 km, orbital speed 7.66 km s⁻¹ yields  
$$a = \frac{GM}{r^2} \approx 8.7\,\text{m s}^{-2}$$ directed toward Earth’s centre.  
Formal statement:  
$$mg_{\text{eff}} = m\frac{v^2}{r} \implies N = 0.$$  
> [!WARNING]  
> Confusing orbital speed with “escaping gravity” leads to the false claim that gravity is zero at altitude.

### Step 4 — Distinction between true gravitational field and measured acceleration
The local gravitational field g remains finite; the accelerometer (or human inner ear) registers only the *difference* between actual acceleration and g.  
Formal statement:  
$$\text{apparent weight} = m(\mathbf{a} - \mathbf{g}).$$  
> [!WARNING]  
> In a rotating space station the centrifugal term creates a non-zero apparent weight even though the station is not in free fall.

### Step 5 — Textbook definition of weightlessness
An object is weightless when its acceleration equals the local gravitational acceleration, rendering the normal force identically zero.  
Formal statement (final):  
$$\mathbf{N} = 0 \quad \Leftrightarrow \quad \mathbf{a} = \mathbf{g}.$$

## 5. Worked examples — every step shown

**Example 1 — Elevator at rest**  
*Given:* 70 kg passenger, elevator a = 0, g = 9.8 m s⁻².  
*Find:* normal force N.  
N − mg = ma  
N − 70 × 9.8 = 70 × 0  
N = 686 N  
*Why:* Newton’s second law with a = 0.  
**686 N**  
*Reflection:* Baseline case; any later drop in N must be produced by downward acceleration.

**Example 2 — Freely falling elevator**  
*Given:* same passenger, cable cut, a = −g.  
*Find:* N.  
N − mg = m(−g)  
N = 0  
*Why:* The only force left is gravity, so contact force vanishes.  
**0 N**  
*Reflection:* Demonstrates apparent weightlessness without change in g.

**Example 3 — Apparent weight in accelerating elevator**  
*Given:* elevator accelerates upward at 2 m s⁻².  
*Find:* scale reading.  
N − 686 = 70 × 2  
N = 826 N  
*Why:* Net force must produce observed acceleration.  
**826 N**  
*Reflection:* Shows how apparent weight can exceed true gravitational force.

**Example 4 — Astronaut in low Earth orbit**  
*Given:* r = 6.77 × 10⁶ m, M_Earth = 5.97 × 10²⁴ kg.  
*Find:* N inside capsule.  
g_eff = GM/r² ≈ 8.69 m s⁻²  
Centripetal requirement = v²/r = g_eff  
Thus N = 0 by construction of free-fall orbit.  
**0 N**  
*Reflection:* Gravity is still ~89 % of surface value; only the contact force disappears.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                   | How to avoid it                                      |
|-----------------------------------|--------------------------------------------------|------------------------------------------------------|
| “Gravity disappears in orbit”     | Everyday language equates weight with gravity    | Always compute g = GM/r² at orbital radius           |
| Confusing free fall with no gravity | Elevator demo feels like floating                | Draw free-body diagrams in inertial frame            |
| Treating scale reading as invariant | Forgetting non-inertial frames                   | Write N = m(a − g) explicitly                        |
| Ignoring air resistance on parabolic flights | Small drag produces residual g                   | Include drag acceleration in micro-g budget          |
| Believing weightlessness requires vacuum | Spacecraft cabin is pressurised                  | Note that pressure acts equally on all surfaces      |
| Mixing weight and mass in variable-g planets | Habit of saying “weight = 70 kg”                 | Keep units strict: weight in newtons, mass in kg     |
| Assuming artificial gravity is free fall | Rotating habitats feel weight but are not falling | Distinguish centrifugal force from gravitational free fall |

## 7. The textbook-precise statement
An object of mass m is said to be weightless in a gravitational field g when the only force acting on it is m g and its acceleration therefore satisfies a = g. Under this condition the normal force N exerted by any supporting surface is identically zero. (See Kleppner & Kolenkow, *An Introduction to Mechanics*, 2e, §4.3, “Weight and Weightlessness”.)

## 8. Visual — diagram or schematic
```text
Ground frame (inertial)          Freely falling frame
      ▲ g                         (accelerating downward at g)
      │                           astronaut ───► a = g
   ┌──┴──┐                        floor exerts N = 0
   │scale│  N = mg
   └──┬──┘
      │
   Earth
```
The left panel shows the usual surface case; the right panel shows the same objects inside a freely falling elevator or orbiting capsule. Relative acceleration between astronaut and floor is zero, hence N = 0.

## 9. The memory technique
1. **The hook** — picture yourself inside a falling elevator with a bathroom scale under your feet; the instant the cable snaps, the needle slams to zero even though Earth is still pulling.  
2. **What to overlearn** — N = m(a − g) and the equivalence a = g ⇒ N = 0.  
3. **Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — start from Newton’s second law on the object plus the supporting surface; set the contact force to zero and solve for a.

## 10. What this unlocks
Mastery of true versus apparent weightlessness supplies the conceptual foundation for orbital mechanics, non-inertial reference frames, and the design of microgravity experiments.  

- Next: two-body orbital equations and Kepler’s laws  
- Effective potential in central-force problems  
- Coriolis and centrifugal effects inside rotating habitats  
- Accelerometer calibration for inertial navigation systems

## 11. Self-check — five questions, no answers
1. An elevator descends at constant 3 m s⁻². What does a bathroom scale read for a 60 kg passenger?  
2. Why does the International Space Station require periodic reboosts even though its occupants are weightless?  
3. Draw the free-body diagram of an astronaut standing on a scale inside a rotating space station of radius 100 m spinning at 2 rpm. Is N zero?  
4. A skydiver reaches terminal velocity. Is the skydiver weightless? Explain using the definition a = g.  
5. In the reference frame of the Moon, is an apple falling toward Earth’s surface weightless? Justify with the appropriate acceleration vector.