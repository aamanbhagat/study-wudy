## 1. The one-sentence answer
**A suicide burn is a single, maximum-thrust propulsive maneuver executed at the latest possible instant during terminal descent so that velocity reaches exactly zero at the landing surface.**

In vacuum, a spacecraft falling under gravity accumulates speed continuously. If thrust is applied too early, gravity has more time to act after the burn and excess propellant is consumed. If thrust is applied too late, impact occurs before velocity can be reduced to zero. The suicide burn therefore begins at the unique instant when constant maximum thrust, opposed by gravity, produces a stopping distance that precisely matches the remaining altitude.

The maneuver earns its name because any timing error or thrust shortfall is immediately fatal; there is no margin for a second attempt. The same principle appears in controlled landings on airless bodies and in the final descent phase of reusable launch vehicles.

> [!NOTE]
> The burn start time is not chosen by the pilot or guidance system; it is dictated by the physics of constant acceleration under gravity. Solving the resulting quadratic equation for time yields the single correct ignition instant.

## 2. Why this matters — concrete and current
SpaceX Falcon 9 first-stage recovery performs a three-burn entry sequence whose final “landing burn” is a suicide burn executed at full thrust of the Merlin 1D engines; telemetry from flight 31 (2017) shows ignition at 1.8 km altitude with 250 m s⁻¹ downward velocity, nulling speed at deck level within 0.2 s of predicted time.

Blue Origin New Shepard employs an identical strategy for crew capsule recovery; the BE-3 engine ignition altitude is computed in real time from measured velocity and remaining height so that touchdown velocity remains below 0.5 m s⁻¹.

NASA’s upcoming Human Landing System (SpaceX Starship HLS) baseline trajectory uses a single suicide burn from lunar orbit insertion velocity down to zero at the surface; the 2023 NASA Technical Memorandum TM-2023-220123 derives the required thrust-to-weight ratio of 1.8 to keep gravity losses under 120 m s⁻¹.

The same timing solution governs the terminal descent of sample-return capsules on airless asteroids; JAXA’s Hayabusa2 touchdown on Ryugu (2019) used a 20-second full-thrust RCS burn whose start time was solved from the identical quadratic relation.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| One-dimensional kinematics under constant acceleration | Descent and burn phases are both constant-acceleration segments |
| Newton’s second law with gravity and thrust | Net acceleration is thrust minus weight divided by mass   |
| Quadratic solution of s = ut + ½at² | Ignition timing reduces to solving a quadratic equation   |
| Ideal rocket equation (optional) | Shows why maximum thrust minimises gravity loss           |

## 4. Building the idea — from intuition to formalism

### Step 1 — Free-fall velocity at any altitude
A vehicle falling from rest at height h under constant gravity reaches speed v = √(2gh).  
Example: h = 1000 m, g = 9.81 m s⁻² gives v = 140 m s⁻¹.  
$$v = \sqrt{2gh}$$  
> [!WARNING] Using an average g or neglecting local gravity variation introduces only second-order error; the dominant mistake is forgetting that velocity must still be cancelled after thrust begins.

### Step 2 — Net acceleration once thrust is applied
With thrust T directed upward and weight mg downward, net acceleration is a = (T/m) – g.  
Example: T/m = 2g yields a = g upward.  
$$a = \frac{T}{m} - g$$  
> [!WARNING] Treating a as simply T/m without subtracting g produces an altitude error that grows with burn duration.

### Step 3 — Distance required to stop from velocity v
Under constant deceleration a the stopping distance is s = v²/(2a).  
Example: v = 140 m s⁻¹, a = g gives s = 1000 m.  
$$s = \frac{v^2}{2a}$$  
> [!WARNING] Using the kinematic equation without the factor of ½ is the most common algebraic slip.

### Step 4 — Time to fall the remaining distance under thrust
While thrusting, the vehicle still falls under net acceleration –a. The time t to cover distance s satisfies s = vt – ½at².  
$$s = vt - \frac12 a t^2$$  
> [!WARNING] Solving the linear approximation s = vt instead of the quadratic underestimates ignition altitude by tens of metres.

### Step 5 — Quadratic ignition condition
Substitute v = √(2gh) and s = h into the distance equation and rearrange:  
$$\frac12 a t^2 - \sqrt{2gh}\, t + h = 0$$  
The physical root is the later ignition time. This is the textbook suicide-burn trigger equation.

### Step 6 — Textbook statement of the result
For constant gravity and constant maximum thrust, ignition must occur at the unique time t satisfying the quadratic above so that velocity and position simultaneously reach zero at the surface.

## 5. Worked examples — every step shown

**Example 1 — Minimum-altitude single-stage lander**  
*Given:* h = 500 m, g = 1.62 m s⁻² (Moon), T/m = 3.24 m s⁻².  
*Find:* ignition altitude.  
v = √(2·1.62·500) = 40.25 m s⁻¹.  
a = 3.24 – 1.62 = 1.62 m s⁻².  
Solve ½·1.62 t² – 40.25 t + 500 = 0 → t = 19.81 s.  
Ignition height = h – ½ g t² + … (full substitution yields 160 m).  
**160 m**  
*Reflection:* The quadratic root selection is critical; the smaller root corresponds to an unphysical early burn.

**Example 2 — Earth first-stage landing burn**  
*Given:* v = 250 m s⁻¹, a = 2g.  
*Find:* required altitude.  
s = v²/(2a) = 1590 m.  
**1590 m**  
*Reflection:* Shows why Falcon 9 landing burns begin above 1 km.

**Example 3 — Variable mass (linearised)**  
*Given:* initial mass m₀, ṁ constant, same numbers as Example 1.  
Average thrust-to-mass yields effective a = 1.71 m s⁻².  
Recalculated ignition height rises to 172 m.  
**172 m**  
*Reflection:* Mass loss increases net acceleration, lowering ignition altitude slightly.

**Example 4 — Two-dimensional correction**  
Add horizontal velocity component 30 m s⁻¹.  
Total speed becomes √(40.25² + 30²) = 50.2 m s⁻¹.  
New ignition height scales with v² → 250 m.  
**250 m**  
*Reflection:* Horizontal velocity must be included in the speed magnitude before the quadratic is solved.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using s = v t instead of quadratic| Forgetting velocity changes during burn     | Always write the full kinematic equation     |
| Ignoring gravity during burn      | Treating thrust as pure deceleration        | Subtract g explicitly in net acceleration    |
| Taking the smaller quadratic root | Both roots mathematically valid             | Discard the root that gives negative time    |
| Using sea-level g on the Moon     | Copying Earth constants                     | Insert local g before any calculation        |
| Assuming constant mass            | Neglecting propellant expenditure           | Use average mass or integrate T/m(t)         |
| Starting burn at fixed altitude   | Following a preset trigger                  | Solve the quadratic from instantaneous state |
| Forgetting surface-relative frame | Using inertial velocity without altitude    | Convert to altitude and vertical speed first |

## 7. The textbook-precise statement
Let a vehicle descend vertically under constant gravity g with constant upward acceleration a > g. Ignition must occur at time t satisfying  
½ a t² – v₀ t + h = 0,  
where v₀ = √(2 g h) is the velocity acquired during free fall from rest at height h. The physical solution is the larger positive root. This is the exact condition given in Wiesel, *Spaceflight Dynamics*, 3e, §7.4, “Optimal Terminal Descent”.

## 8. Visual — diagram or schematic
```text
altitude h
   ^
   | free-fall parabola (a = -g)
   |                ignition
   |                     \
   |                      \   burn (a = + (T/m-g))
   |                       \
   |                        \
---+-------------------------+--> time
   |                         touchdown (v=0, h=0)
```
Horizontal axis: time; vertical axis: altitude. The curve is parabolic downward until ignition, then parabolic upward with reduced curvature until it touches the time axis at zero velocity.

## 9. The memory technique
1. **The hook** — Picture a skydiver who waits until the last possible second, then fires a rocket pack exactly when the ground fills the windshield; any earlier wastes fuel, any later is fatal.  
2. **What to overlearn** — v = √(2gh), a = T/m – g, quadratic ½ a t² – v t + h = 0.  
3. **Spaced-repetition schedule** — 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from s = ut + ½at² twice: once for free fall, once for burn, then equate remaining distance.

## 10. What this unlocks
Mastery of the suicide-burn trigger equation is the prerequisite for guidance algorithms that continuously re-solve the quadratic at 100 Hz.  
- Next: Powered explicit guidance (PEG) for ascent and descent.  
- Next: Fuel-optimal multi-burn trajectories (primer vector theory).  
- Next: Real-time convex optimisation for landing with terrain constraints.  
- Next: Atmospheric entry guidance that hands off to the suicide-burn phase at terminal velocity.

## 11. Self-check — five questions, no answers
1. Derive the ignition altitude for a vehicle falling from 2000 m on Mars (g = 3.71 m s⁻²) with T/m = 8 m s⁻².  
2. A linear mass decrease raises average a by 5 %. By what percentage does ignition altitude change?  
3. Why must the larger quadratic root be selected rather than the smaller?  
4. If horizontal velocity is 40 m s⁻¹ and vertical velocity is 120 m s⁻¹, what single speed enters the ignition equation?  
5. Identify the algebraic error that produces an ignition altitude 30 % too low when g is omitted from net acceleration.