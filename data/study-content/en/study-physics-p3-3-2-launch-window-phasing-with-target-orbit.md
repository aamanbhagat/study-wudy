## 1. The one-sentence answer
**A launch window for phasing with a target orbit is the finite interval during which a vehicle must depart its launch site so that the resulting orbit intersects the target at the correct relative phase angle for rendezvous or station-keeping.**

The target satellite already occupies a specific angular position in its orbit. Because both the launch site on the rotating Earth and the target move continuously, only certain departure times place the ascending spacecraft on an intercept trajectory whose period and argument of perigee close the phase gap without prohibitive propellant cost. The window therefore opens when the ground-relative phase angle equals the value that will be consumed by differential mean motion during the transfer time and closes when that angle exceeds the reachable set for the chosen transfer orbit.

The underlying constraint is geometric and kinematic: the launch vehicle injects into an orbit whose nodal crossing and true anomaly at injection must satisfy the time-of-flight equation that matches the target’s future position. Small changes in launch time rotate the relative geometry by the sum of Earth rotation and target orbital rate, rapidly driving the required phasing burn outside the vehicle’s performance envelope.

> [!NOTE]
> The decisive insight is that the launch window is not a property of the rocket alone; it is the intersection of the target’s periodic ground track with the launch site’s daily passage beneath the orbital plane, filtered by the transfer orbit’s ability to absorb the residual phase error.

## 2. Why this matters — concrete and current
SpaceX Crew Dragon missions to the ISS require a launch window typically 1–5 seconds wide every 23–25 hours because the station’s orbital period and the Cape’s latitude produce a repeating relative geometry that must be matched within a few kilometres at rendezvous.  

NASA’s Artemis lunar missions schedule trans-lunar injection windows that recur every 6–8 days; each window is sized so that the phasing orbit after TLI places Orion at the correct lunar phase for the NRHO arrival.  

Planet Labs launches multiple Dove satellites from a single Electron vehicle; the launch window is chosen so that the initial parking orbit’s nodal precession and differential drag produce the exact along-track spacing required for the final constellation plane.  

Iridium-NEXT replenishment flights from Vandenberg used a 39-minute daily window to insert replacement satellites into the existing 66-satellite Walker constellation; missing the window forced a multi-day wait and extra plane-change propellant.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Keplerian period \(T=2\pi\sqrt{a^3/\mu}\) | Determines how fast the target moves relative to the chaser’s transfer orbit |
| Mean anomaly and phase angle | Quantifies the angular lead or lag that must be closed by differential period |
| Launch-site latitude and nodal precession | Fixes the daily recurrence of the orbital plane over the pad |
| Two-body time-of-flight equation | Converts required phase change into a unique transfer semi-major axis |

## 4. Building the idea — from intuition to formalism

### Step 1 — Relative angular motion sets the clock
A target in low Earth orbit advances roughly 3.6° per minute in inertial space. A launch site on Earth rotates at 15° per hour. The difference produces a steadily changing phase angle between the launch meridian and the target’s ground track.  
Example: ISS at 400 km has period 92.5 min; a Florida launch site therefore sees the same relative geometry repeat every 23.5 h.  
Formally the inertial phase rate is \(\dot{\theta}_\text{rel}=\sqrt{\mu/a_t^3}- \omega_\ Earth\cos\phi\).  
> [!WARNING]
> Treating the target as fixed in inertial space underestimates the required lead angle by several degrees per hour and produces a missed intercept.

### Step 2 — Phasing orbit as a controllable delay line
Once the vehicle reaches a parking orbit of semi-major axis \(a_p\), its period differs from the target’s, so the along-track separation changes at rate \(\Delta\dot{M}=n_p-n_t\). The time spent in this orbit is the control variable that converts any initial phase error into the exact angle needed at departure.  
Example: a 10 km lower parking orbit yields \(\Delta n\approx0.004^\circ/\text{s}\), closing a 30° gap in roughly 2 h.  
The phasing time is \(t_\text{phase}=(\Delta\theta_\text{desired})/\Delta n\).

### Step 3 — Injection epoch fixes the initial phase
The launch epoch \(t_0\) determines the right ascension of the launch site relative to the target’s ascending node. The initial phase angle is therefore \(\Delta\theta(t_0)=\theta_t(t_0)-\Omega(t_0)-\omega_\text{site}\). Only epochs that map this angle into the reachable set after \(t_\text{phase}\) are admissible.

### Step 4 — Transfer orbit must satisfy the rendezvous condition
At the end of phasing the vehicle performs a burn into a transfer orbit whose time of flight \(t_\text{TOF}\) satisfies \(\Delta\theta(t_0+t_\text{phase}+t_\text{TOF})=0\) when both vehicles meet at the same true anomaly. Lambert’s problem supplies the required \(\Delta v\).

### Step 5 — Window width is the allowable phase tolerance divided by relative rate
If the vehicle can tolerate a phase error of \(\pm\delta\theta\) at injection, the corresponding time tolerance is \(\Delta t_w=2\delta\theta/|\dot{\theta}_\text{rel}|\). For ISS-class missions \(\delta\theta\) is a few tenths of a degree, yielding windows of seconds.

### Step 6 — Daily recurrence and plane-crossing constraints close the set
Because the orbital plane precesses and the launch site rotates, admissible epochs recur once per day minus the nodal shift. The final textbook statement follows directly.

## 5. Worked examples — every step shown

**Example 1 — 30° phase catch-up**  
*Given:* Target at 400 km, \(a_t=6778\) km; chaser parks at 300 km, \(a_p=6678\) km.  
*Find:* Phasing time to close +30° lead.  
\(n_t=\sqrt{\mu/a_t^3}=0.001125\) rad/s  
\(n_p=\sqrt{\mu/a_p^3}=0.001142\) rad/s  
\(\Delta n=0.000017\) rad/s  
\(t_\text{phase}=(\pi/6)/\Delta n=3086\) s \(\approx51.4\) min  
**3086 s**  
*Reflection:* The calculation assumes impulsive burns and neglects drag; both become visible in later examples.

**Example 2 — Launch-window duration**  
*Given:* Allowable phase tolerance \(\pm0.2^\circ\), relative inertial rate 0.061°/s.  
\(\Delta t_w=2\times0.2/0.061=6.56\) s  
**6.6 s**  
*Reflection:* Real missions add 1–2 s margin for trajectory-update latency.

**Example 3 — Multi-rev phasing**  
*Given:* Same orbits, but target leads by 330° (i.e., –30°).  
Two-revolution solution: \(t_\text{phase}=(330^\circ+360^\circ k)/\Delta n\) for integer \(k\). Choosing \(k=1\) yields 6.1 h instead of 51 min.  
**6.1 h**  
*Reflection:* Extra revolutions trade time for lower \(\Delta v\).

**Example 4 — Nodal recurrence filter**  
*Given:* ISS inclination 51.6°, node precesses –5°/day. Launch site crosses plane once per 23.56 h. Only one of the two daily passes satisfies the phase window.  
*Result:* Windows open every 47 h on average.  
*Reflection:* Latitude and nodal drift together set the ultimate cadence.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using inertial phase rate instead of relative rate | Forgets Earth rotation contribution | Always subtract \(\omega_E\cos\phi\) |
| Assuming single-rev transfer is cheapest | Ignores that extra revolutions can reduce \(\Delta v\) | Evaluate Lambert solutions for \(N=0,1,2\) revs |
| Ignoring launch-site latitude effect on nodal crossing | Treats every orbit as equatorial | Compute \(\Omega(t)\) with \(J_2\) and check elevation at injection |
| Treating window as symmetric around optimum | Vehicle performance envelope is usually one-sided | Map \(\Delta v\) versus epoch and retain only feasible side |
| Neglecting drag in long phasing orbits | Low orbits decay several km per day | Include secular \(\dot{a}\) term in mean-motion difference |
| Confusing argument of latitude with true anomaly | Both appear in relative-angle equations | Use consistent element set throughout |
| Rounding epoch to nearest minute | Window widths are seconds | Keep at least 0.1 s resolution in timeline |

## 7. The textbook-precise statement
A launch opportunity exists at epoch \(t_0\) if there exists a parking orbit semi-major axis \(a_p\) and integer number of revolutions \(N\) such that the phasing angle accumulated in time \(t_\text{phase}=N\cdot T_p\) plus the subsequent transfer time-of-flight satisfies
\[
\theta_t(t_0+t_\text{phase}+t_\text{TOF})=\theta_\text{inj}(t_0)+\Delta\theta_\text{transfer}(a_p,N)
\]
within the vehicle’s \(\Delta v\) budget. (Vallado, *Fundamentals of Astrodynamics and Applications*, 4e, §6.4, Eq. 6-46.)

## 8. Visual — diagram or schematic
```text
                  North Pole
                      |
   Target orbit ----->O---------> (target at t0)
                      |   Δθ
   Earth centre       |
                      |
Launch site (φ) ----->x   (rotating eastward)
                      |
   Parking orbit <---- (chaser after insertion)
```
Horizontal axis is equatorial plane; vertical axis is polar. The angle \(\Delta\theta\) between target position vector and launch meridian is the quantity driven to zero by the phasing strategy.

## 9. The memory technique
1. **The hook** — Picture the target as the hour hand of a clock and the launch site as a second hand that also moves because the clock itself is spinning; the window is the instant both hands line up for the chosen transfer “gear ratio”.
2. **What to overlearn** — \(\Delta n = n_p - n_t\), window width \(\Delta t_w = 2\delta\theta/|\dot{\theta}_\text{rel}|\), and the recurrence interval \(T_\text{rec}=2\pi/(\dot{\Omega}-\omega_E\cos\phi)\).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive \(\Delta n\) from Kepler’s third law applied to two concentric orbits, then integrate the relative angle until it equals the desired lead.

## 10. What this unlocks
Mastery of launch-window phasing supplies the timing foundation for rendezvous, proximity operations, constellation deployment, and formation flying. The same relative-mean-motion arithmetic appears in:
- Lambert targeting for intercept
- Clohessy–Wiltshire initial conditions
- J₂-perturbed ground-track repeat cycles
- On-orbit servicing mission design

## 11. Self-check — five questions, no answers
1. A target at 500 km leads the launch meridian by 45°. If the chaser parks 20 km lower, how many minutes of phasing are required for a one-revolution catch-up?  
2. Why does raising the parking orbit sometimes shorten rather than lengthen the required phasing time?  
3. A launch site at 28° latitude sees two ascending passes per day. Which pass can possibly satisfy an ISS (51.6°) rendezvous constraint?  
4. If drag lowers the parking orbit by 3 km during a 4-hour phasing burn, does the actual catch-up angle increase or decrease relative to the drag-free prediction?  
5. Derive the exact expression for the maximum admissible phase error given a fixed transfer \(\Delta v\) budget and a 400 km circular target.