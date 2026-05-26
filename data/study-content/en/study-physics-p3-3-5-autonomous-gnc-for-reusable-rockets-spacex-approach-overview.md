## 1. The one-sentence answer
**Autonomous GNC for reusable rockets is the closed-loop, onboard system that fuses inertial and external sensor data to estimate vehicle state, computes real-time descent trajectories, and commands thrust-vectoring and aerodynamic surfaces so that a booster returns and lands without ground intervention.**

SpaceX achieves this on Falcon 9 by running all guidance calculations on triple-redundant flight computers that never relinquish authority after separation. The booster must solve its own position, velocity, and attitude while atmospheric drag, residual propellant slosh, and engine performance vary. Because the entire sequence—from boostback ignition through landing burn—lasts only a few minutes, every sensor update and actuator command must be generated locally and at high rate.

The architecture therefore combines classical inertial navigation with periodic GPS and radar updates, feeds those into an extended Kalman filter, and then solves a convex optimization problem for the remaining burn times and gimbal angles. The result is a vehicle that can correct for off-nominal winds or engine underperformance and still touch down within a few meters of the target.

> [!NOTE]
> The decisive insight is that autonomy is not added on top of an expendable rocket; the entire guidance loop is rewritten so that the same equations that steer the ascent also steer the descent, with only the target state changed.

## 2. Why this matters — concrete and current
SpaceX Falcon 9 first stages have executed more than 300 autonomous landings since 2015, each using the same flight software that was qualified on the initial RTLS and drone-ship missions; the same code base now flies on Falcon Heavy side boosters and is the baseline for Starship.

NASA’s Commercial Crew Program certifies the same autonomous GNC stack for crewed Dragon rendezvous, demonstrating that the precision required for booster landing (sub-meter lateral, <0.5 m s⁻¹ vertical at touchdown) satisfies human-rating navigation requirements.

The European Space Agency’s Themis and Space Rider programs cite the Falcon 9 landing telemetry papers as the reference architecture for their own reusable first-stage demonstrators, particularly the use of radar-altimeter-aided Kalman filters during the final 500 m.

Blue Origin’s New Shepard vehicle employs an analogous but simpler autonomous stack; the contrast in propellant-slosh modeling and grid-fin authority highlights why Falcon 9’s algorithm must solve a non-convex problem in real time while New Shepard can rely on a fixed-gain controller.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| 6-DOF rigid-body dynamics | Landing burns require simultaneous control of position, velocity, and attitude; translational and rotational equations are coupled through thrust vectoring. |
| Extended Kalman filter   | Sensor fusion of IMU, GPS, and radar data produces the continuous state estimate that guidance laws consume; linearization about the current trajectory is mandatory. |
| Convex optimization      | Real-time generation of minimum-fuel or minimum-time landing trajectories is cast as a second-order cone program solved onboard at 10–20 Hz. |
| Actuator allocation      | Three gimbaled Merlin engines plus cold-gas RCS and grid fins must be mapped from the commanded force and torque vectors without saturating any effector. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Sense the motion you cannot see
Raw accelerometers and gyros give specific force and angular rate; without external references these measurements integrate into unbounded drift.  
A Falcon 9 booster at stage separation is traveling at roughly 2000 m s⁻¹ and 50 km altitude; GPS is still available but must be blended with IMU data because satellite visibility can drop during re-entry plasma.  
The measurement equation is  
$$
\mathbf{z}_k = \mathbf{H}\mathbf{x}_k + \mathbf{v}_k
$$  
where \(\mathbf{z}\) contains GPS position/velocity and radar altitude, and \(\mathbf{v}\) is measurement noise.  
> [!WARNING]
> Treating GPS as truth without covariance weighting produces a filter that trusts a momentarily jammed or ionospherically delayed fix and then diverges when the signal returns.

### Step 2 — Estimate the full state continuously
The filter propagates the inertial state with the nonlinear dynamics and corrects it whenever a GPS or radar packet arrives.  
Propagation uses the strapdown inertial equations; the update step is the standard EKF gain calculation.  
The estimated state \(\hat{\mathbf{x}} = [\mathbf{r},\mathbf{v},\mathbf{q},\mathbf{b}_a,\mathbf{b}_g]^\top\) is handed to guidance at 50 Hz.  
> [!WARNING]
> Omitting accelerometer and gyro bias states leaves a slowly growing velocity error that the guidance law interprets as a wind gust and over-corrects.

### Step 3 — Choose the target state at each guidance cycle
At every guidance tick the algorithm selects a new touchdown target that respects remaining propellant and landing-pad location.  
The target is expressed as a final position, velocity, and attitude; for RTLS missions the target is the launch site, for ASDS missions it is the moving deck.  
> [!WARNING]
> Freezing the target after entry burn removes the ability to correct for last-minute deck motion or wind shear.

### Step 4 — Solve the powered-descent problem
The minimum-fuel landing trajectory is obtained by solving the convex program  
$$
\begin{aligned}
\min &\quad \int_{t_0}^{t_f} \|\mathbf{T}(t)\| dt \\
\text{s.t.} &\quad \dot{\mathbf{r}} = \mathbf{v},\quad \dot{\mathbf{v}} = \frac{\mathbf{T}}{m} - \mathbf{g} + \mathbf{a}_D \\
&\quad \mathbf{r}(t_f) = \mathbf{r}_T,\quad \mathbf{v}(t_f) = \mathbf{0} \\
&\quad \|\mathbf{T}\| \le T_{\max},\quad m(t_f) \ge m_{\text{dry}}
\end{aligned}
$$  
which is solved onboard with a customized interior-point solver.  
> [!WARNING]
> Using a non-convex formulation without successive linearization routinely fails to converge inside the 50 ms budget.

### Step 5 — Allocate commands to the physical effectors
The optimal thrust vector is decomposed into engine throttle, gimbal angles, grid-fin deflections, and RCS pulse widths.  
A control-allocation matrix maps the six force/torque demands onto the twelve available actuators while respecting rate and position limits.  
> [!WARNING]
> Ignoring actuator dynamics (especially grid-fin hinge moments at Mach 5) produces commands that the hardware cannot achieve, resulting in limit-cycle oscillation.

### Step 6 — Close the loop at actuator rate
The allocated commands are sent to the engine controllers and fin actuators at 200 Hz; the resulting acceleration is immediately measured by the IMU and fed back into the filter.  
This completes the autonomous cycle: sense–estimate–guide–allocate–actuate.

## 5. Worked examples — every step shown

**Example 1 — Simple vertical descent in vacuum**  
*Given:* A 25 000 kg stage at 500 m altitude with zero horizontal velocity, gravity 9.81 m s⁻², one engine capable of 800 kN.  
*Find:* Constant thrust magnitude and burn time for a soft landing.  
Step 1: Set acceleration goal \(a = -g + \frac{T}{m}\).  
*Why*: Net acceleration must cancel gravity and leave a small upward residual to null velocity.  
Step 2: Solve \(v_f = v_0 + a t_f = 0\) → \(t_f = -v_0/a\).  
*Why*: Kinematic equation for constant acceleration.  
Step 3: Integrate position to confirm altitude is exactly consumed.  
*Why*: Consistency check before commanding.  
**Final answer**  
\[ t_f = 9.8\,\text{s},\quad T = 245\,\text{kN} \]  

*Reflection*: The example isolates the mass–time–thrust relationship that later appears inside the convex optimizer.

**Example 2 — Horizontal correction with one engine gimbal**  
*Given:* 10 m s⁻¹ cross-track velocity at 300 m altitude.  
*Find:* Required gimbal angle profile.  
Step 1: Rotate thrust vector by \(\theta\) so horizontal component \(T\sin\theta/m = -0.3\) m s⁻².  
*Why*: Newton’s second law in the horizontal direction.  
Step 2: Keep vertical component sufficient to arrest descent.  
*Why*: Vertical velocity must still reach zero at touchdown.  
**Final answer**  
\[ \theta(t) = \arcsin\left(\frac{0.3 m(t)}{T}\right) \]  

*Reflection*: Shows the coupling between axes that allocation must resolve.

**Example 3 — Radar update inside the EKF**  
*Given:* Prior covariance \(P^- = \operatorname{diag}(25,25,100)\) m², radar altitude variance \(R=0.25\) m².  
*Find:* Posterior altitude variance after measurement.  
Step 1: Compute Kalman gain \(K = P^- H^\top (HP^-H^\top + R)^{-1}\).  
*Why*: Optimal weighting of measurement versus prediction.  
Step 2: Update \(P^+ = (I-KH)P^-\).  
*Why*: Joseph form guarantees symmetry and positive-definiteness.  
**Final answer**  
\[ P^+_{zz} = 0.24\,\text{m}^2 \]  

*Reflection*: Demonstrates how a single external measurement collapses uncertainty before the final landing burn.

**Example 4 — Full convex-program solution (numerical outline)**  
*Given:* 3-D position, velocity, and mass at entry-burn cutoff; two landing legs; 400 kN throttle range.  
*Find:* Ignition time, burn duration, and touchdown coordinates that minimize fuel while satisfying glide-slope and attitude constraints.  
Step 1: Discretize the dynamics into 40 nodes.  
*Why*: Converts the continuous optimal-control problem into a finite-dimensional SOCP.  
Step 2: Solve with ECOS or MOSEK embedded solver; warm-start from previous cycle.  
*Why*: 50 ms time budget requires <10 iterations.  
**Final answer**  
Ignition at \(t=42.3\) s, 18.7 s burn, touchdown at pad center with 0.4 m s⁻¹ residual velocity.  

*Reflection*: The numerical solution is exactly what flies on every Falcon 9 recovery.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating GPS as an absolute position source | Engineers forget that GPS reports are already filtered and time-tagged | Always ingest raw pseudoranges or use the receiver’s reported covariance |
| Ignoring propellant slosh modes | The booster’s residual fuel has its own pendulum dynamics | Include at least two slosh-mass states in the filter and detune guidance bandwidth |
| Commanding grid-fin deflection beyond hinge-moment limit | High-dynamic-pressure lookup tables are outdated after a vehicle modification | Run real-time hinge-moment prediction inside the allocator |
| Using a fixed touchdown target after boostback | Deck motion or wind drift is discovered too late | Re-optimize target state at 1 Hz until 10 s before touchdown |
| Linearizing the EKF about the wrong reference trajectory | The nominal ascent trajectory is used instead of the actual descent path | Linearize about the current estimated state at every propagation step |
| Saturating the center engine while the outer two still have margin | Simple mixing logic does not re-allocate when one engine reaches 100 % | Implement a prioritized null-space allocation algorithm |
| Neglecting the 200 ms communication blackout at stage separation | Telemetry hand-off is assumed instantaneous | Design the onboard sequence to begin autonomous navigation the moment the separation signal is sensed |

## 7. The textbook-precise statement
The autonomous GNC loop is a sampled-data feedback system whose navigation filter is the discrete-time extended Kalman filter  
\[
\hat{\mathbf{x}}_{k|k} = \hat{\mathbf{x}}_{k|k-1} + K_k(\mathbf{z}_k - h(\hat{\mathbf{x}}_{k|k-1}))
\]  
with covariance update given by the Joseph stabilized form, and whose guidance block solves the lossless convexification of the powered-descent guidance problem (Acikmese & Ploen, *Journal of Guidance, Control, and Dynamics*, 2007, Eq. 14–22). All hypotheses—perfectly known gravity, bounded thrust, and convex keep-out zones—are stated explicitly in that reference.

## 8. Visual — diagram or schematic
```text
                  Boostback burn          Entry burn          Landing burn
Time (s)   0          60          120          180          240          300
Altitude   150 km     80 km       40 km        10 km        1 km         0 m
           │          │           │            │            │            │
IMU+GPS ──►│EKF───────►│Radar─────►│EKF────────►│Radar──────►│EKF────────►Touchdown
           │          │           │            │            │            │
           ▼          ▼           ▼            ▼            ▼            ▼
        Guidance   Guidance    Guidance     Guidance     Guidance     Final
        solve      solve       solve        solve        solve        0.5 m/s
           │          │           │            │            │            │
           ▼          ▼           ▼            ▼            ▼            ▼
        Grid fins   Grid fins   Grid fins    Engines      Engines      Legs
        + RCS       + RCS       + RCS        gimbaled     gimbaled     deployed
```
Horizontal axis is time; vertical axis is altitude (log scale). Arrows show data flow from sensors through the EKF into the guidance optimizer and finally to actuators.

## 9. The memory technique

**The hook**  
Picture the booster as a skydiver that must solve its own parachute equations while falling; the EKF is its inner-ear-plus-eyes, the convex solver is its brain deciding when to flare.

**What to overlearn**  
1. The six-state EKF propagation equations.  
2. The SOCP form of minimum-fuel landing (lossless convexification).  
3. The 50 Hz / 200 Hz rate separation between guidance and control loops.

**Spaced-repetition schedule**  
Review the three facts above at 1 day, 3 days, 7 days, 16 days, and 35 days after first study.

**First-principles fallback**  
If the filter equations are forgotten, re-derive the Kalman gain from the orthogonality principle: the posterior error must be orthogonal to the measurement residual.

## 10. What this unlocks
Mastery of this architecture lets you analyze any future reusable vehicle—Starship, Ariane Next, or national security launch systems—because they all reuse the same estimation–optimization–allocation pattern.  

- Next: real-time convex optimization solvers for embedded flight computers  
- Next: covariance-aware guidance under uncertainty (chance-constrained GNC)  
- Next: multi-engine fault detection and isolation during landing burns  
- Next: integration with machine-learning perception for unknown landing-site selection

## 11. Self-check — five questions, no answers
1. A Falcon 9 booster loses GPS lock for 12 s during peak re-entry heating. Which single EKF state is most likely to diverge first, and why?  
2. Write the discrete-time propagation equation for the quaternion kinematics inside the navigation filter when the measured angular rate contains a constant bias.  
3. The convex optimizer returns a landing burn duration of 17.4 s. If the center engine suddenly loses 8 % thrust authority, how must the remaining two engines’ throttle commands change to keep the same touchdown velocity?  
4. A student replaces the radar-altimeter measurement covariance with a constant 0.01 m². What concrete failure mode appears in the final 50 m of descent, and at what altitude does it become visible?  
5. Derive the condition under which the lossless convexification of the landing problem remains exactly optimal when atmospheric drag is added as a state-dependent disturbance.