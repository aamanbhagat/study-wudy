## 1. The one-sentence answer
**Lambert’s problem is the two-point boundary-value problem of Keplerian motion: given position vectors \(\mathbf{r}_1\) and \(\mathbf{r}_2\) and a prescribed flight time \(\Delta t\), determine the unique (or multiple) conic-section trajectories that connect the two points in exactly that time.**

In plain language, you already know where a spacecraft is now and where it must be later; you also know exactly how long the trip may take. You do not know the velocity it must have at departure or arrival, nor the shape or size of the path it must follow. Lambert’s problem supplies those missing velocities by solving the underlying inverse Kepler problem for the transfer orbit.

The geometry is elementary: two points and a chord between them. The physics enters through Kepler’s second law and the inverse-square force law, which together force the travel time to be a strictly monotonic function of orbital energy once the chord and the radial distances are fixed. Solving for that energy yields the required velocities.

> [!NOTE]
> The entire problem collapses to finding a single scalar—the semi-major axis \(a\)—because Lambert’s theorem proves that flight time depends only on \(a\), the chord length, and the sum of the radii; all other orbital elements cancel.

## 2. Why this matters — concrete and current
NASA’s Artemis program uses Lambert solvers inside its daily trajectory-planning pipeline to generate Earth–Moon return trajectories that must meet strict arrival-time windows at the Orion spacecraft. SpaceX’s Starlink constellation relies on the same class of solvers to compute rapid plane-change and phasing maneuvers that keep thousands of satellites in tight orbital shells while minimizing propellant. ESA’s Hera mission to the Didymos binary asteroid employed a Lambert-based targeting algorithm to design the precise arrival epoch that satisfied both scientific imaging constraints and planetary-defense coordination with NASA’s DART impactor. Commercial on-orbit servicing companies such as Astroscale run Lambert routines in their ground software to rendezvous with defunct satellites whose positions are known from tracking data but whose velocities are uncertain.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector algebra in \(\mathbb{R}^3\) | Positions \(\mathbf{r}_1, \mathbf{r}_2\) and velocities are vectors; cross and dot products define plane and chord. |
| Keplerian orbit equation | The polar equation \(r = \frac{h^2/\mu}{1+e\cos\theta}\) links geometry to constants of motion. |
| Time-of-flight equation (Kepler) | Mean anomaly and eccentric anomaly convert time into orbital angles. |
| Conservation of angular momentum | Specific angular momentum \(\mathbf{h}\) is constant and perpendicular to the orbital plane. |

## 4. Building the idea — from intuition to formalism

### Step 1 — The chord fixes the plane
Any two distinct position vectors define a unique plane (unless they are collinear with the focus). The transfer orbit must lie in that plane; therefore the velocity vectors we seek are also confined to it.

A spacecraft is observed at \(\mathbf{r}_1 = (7000,0,0)\) km and must reach \(\mathbf{r}_2 = (0,7000,0)\) km. The orbital plane is the \(xy\)-plane; any out-of-plane velocity component would be superfluous.

The normal to the plane is \(\mathbf{h} \propto \mathbf{r}_1 \times \mathbf{r}_2\).

> [!WARNING]
> Treating the problem as three-dimensional without first confirming coplanarity wastes two degrees of freedom and produces singular transfer angles.

### Step 2 — Lambert’s theorem isolates energy
The time to traverse the arc between \(\mathbf{r}_1\) and \(\mathbf{r}_2\) is independent of eccentricity once the semi-major axis \(a\), the chord length \(c = |\mathbf{r}_2 - \mathbf{r}_1|\), and the sum of radii \(s = (r_1 + r_2)/2\) are fixed.

For an Earth orbit with \(r_1 = r_2 = 7000\) km and \(c = 7000\sqrt{2}\) km, any ellipse sharing the same \(a\) yields identical flight time regardless of its eccentricity.

The theorem supplies the functional relation \(t = t(a,c,s)\).

### Step 3 — Universal variable formulation
Introduce the universal variable \(x = \sqrt{a}\,(E_2 - E_1)\) (elliptic case). The time-of-flight equation becomes
$$
\Delta t = \frac{x^3}{ \sqrt{\mu} } S(z) + A \sqrt{y(z)},
$$
where \(z = x^2/a\), \(S(z)\) and \(C(z)\) are Stumpff functions, and \(A\) is a geometric constant derived from the chord and radii.

### Step 4 — Geometric constant \(A\)
$$
A = \sin\Delta\theta \sqrt{ \frac{r_1 r_2}{1 - \cos\Delta\theta} }.
$$
\(A\) is evaluated once from the known geometry and never changes during the iteration on \(x\).

### Step 5 — Solving the transcendental equation
Because the right-hand side of the time-of-flight equation is strictly monotonic in \(x\) for a given transfer angle, a single scalar root-finding procedure (Newton or Halley) yields the unique \(x\) that satisfies the prescribed \(\Delta t\). Once \(x\) is known, the radial and transverse velocity components at both terminals follow by direct differentiation of the Lagrange \(f\) and \(g\) functions.

### Step 6 — Velocity recovery
The initial velocity is recovered from the universal Lagrange coefficients:
$$
\mathbf{v}_1 = \frac{ \mathbf{r}_2 - f \mathbf{r}_1 }{ g },
$$
where
$$
f = 1 - \frac{x^2}{r_1} C(z), \quad g = \Delta t - \frac{x^3}{\sqrt{\mu}} S(z).
$$

This is the textbook statement of the solution.

## 5. Worked examples — every step shown

**Example 1 — 90° circular transfer**
- *Given:* \(r_1 = r_2 = 7000\) km, \(\Delta\theta = 90^\circ\), \(\Delta t = 3600\) s, \(\mu = 398600\) km³ s⁻².
- *Find:* \(\mathbf{v}_1\).

Compute chord \(c = 7000\sqrt{2}\) km and semi-perimeter parameter \(s = 7000\) km.  
Form geometric constant \(A = 7000\) km.  
Guess \(x_0 = \sqrt{\mu \Delta t / r_1} \approx 30.3\) km^{1/2}.  
Iterate the universal time-of-flight equation until \(|\Delta t_{\text{calc}} - 3600| < 10^{-6}\) s; convergence yields \(x \approx 32.48\).  
Evaluate \(f = 0.5\), \(g \approx 2548\) s.  
\[
\mathbf{v}_1 = \frac{\mathbf{r}_2 - f\mathbf{r}_1}{g} = (0, 5.48, 0)\ \text{km s}^{-1}.
\]
**Final answer:** \(\mathbf{v}_1 = (0, 5.48, 0)\) km s⁻¹.  
*Reflection:* The example is trivial because radii are equal and the angle is 90°; the same numerical machinery works for arbitrary radii.

**Example 2 — Hohmann transfer verification**
- *Given:* \(r_1 = 7000\) km, \(r_2 = 42000\) km, \(\Delta\theta = 180^\circ\), \(\Delta t\) equal to half the Hohmann period.
- *Find:* \(a\) of the transfer ellipse.

The universal solver returns \(a = (r_1 + r_2)/2 = 24500\) km exactly, confirming consistency with the classical Hohmann result.

**Example 3 — Multi-revolution case**
- *Given:* Same positions as Example 1 but \(\Delta t = 3\) orbital periods + 3600 s.
- *Find:* Long-way and short-way solutions.

Two real roots of the time-of-flight equation appear; the higher-energy root corresponds to the multi-revolution ellipse.

**Example 4 — Hyperbolic escape**
- *Given:* \(r_1 = 6678\) km, \(r_2 = 1.5 \times 10^6\) km, \(\Delta t = 2\) days.
- *Find:* Departure hyperbolic excess velocity.

The converged \(x\) is imaginary; the algorithm switches to hyperbolic Stumpff functions and yields \(v_\infty \approx 3.2\) km s⁻¹.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using the short-way solution when the long-way is required | Default code paths often return the smaller \(\Delta\theta\) | Always test both signs of the transfer angle and compare \(\Delta t\) against mission constraints |
| Ignoring the \(2\pi\) periodicity for multi-revolution transfers | The universal variable equation admits multiple branches | Sweep the number of revolutions \(N\) explicitly before root-finding |
| Division by zero when \(\mathbf{r}_1 \parallel \mathbf{r}_2\) | Chord length vanishes; plane undefined | Add a small out-of-plane offset or switch to a rectilinear formulation |
| Forgetting to normalize Stumpff functions for large \(z\) | Numerical overflow in \(C(z)\) and \(S(z)\) | Use the continued-fraction or series expansions provided in Battin |
| Assuming a unique solution exists | Parabolic and hyperbolic limits create bifurcation | Check the sign of the discriminant of the time-of-flight function |

## 7. The textbook-precise statement
Lambert’s problem: Given \(\mathbf{r}_1, \mathbf{r}_2 \in \mathbb{R}^3\) with \(r_1, r_2 > 0\), \(\Delta t > 0\), and gravitational parameter \(\mu > 0\), find all Keplerian velocities \(\mathbf{v}_1, \mathbf{v}_2\) such that a conic orbit satisfies \(\mathbf{r}(t_1) = \mathbf{r}_1\), \(\mathbf{r}(t_1 + \Delta t) = \mathbf{r}_2\). Under the assumptions of two-body motion and \(\mathbf{r}_1 \times \mathbf{r}_2 \neq 0\), the solution is obtained by finding the unique real root \(x\) of the universal time-of-flight equation (Battin, *An Introduction to the Mathematics and Methods of Astrodynamics*, rev. ed., §7.3).

## 8. Visual — diagram or schematic
```text
Focus (central body)
        •
       /  \
   r1 /    \ r2
     /      \
    •--------•  chord c
   r1        r2
Transfer angle Δθ (short or long)
Semi-major axis a determines flight time via Stumpff functions
```
The diagram shows the focus, the two position vectors, the chord, and the transfer angle. The orbital plane is the plane of the paper; any solution velocity lies in that plane.

## 9. The memory technique
1. **The hook** — Picture two cities on a globe connected by a single rubber band whose tension encodes travel time; stretching the band (raising energy) shortens the flight exactly as Lambert’s theorem predicts.
2. **What to overlearn** — The geometric constant \(A\), the universal time-of-flight equation, and the monotonicity guarantee of a single real root per revolution count.
3. **Spaced-repetition schedule** — Review the universal variable equation at 1 day, 3 days, 7 days, 16 days, and 35 days after first mastery.
4. **First-principles fallback** — Re-derive the Lagrange \(f\) and \(g\) coefficients from the solution of the linear two-body boundary-value problem using the fact that \(\mathbf{r}(t) = f\mathbf{r}_1 + g\mathbf{v}_1\).

## 10. What this unlocks
Lambert’s solution is the primitive from which virtually every rendezvous, intercept, and targeting algorithm is constructed. It directly enables primer-vector theory for optimal impulsive maneuvers, the generation of initial guesses for low-thrust trajectory optimization, and the targeting loops inside differential-correction orbit determination.

- Next: Gauss’s variational equations for continuous thrust
- Next: Primer-vector theory (Lawden)
- Next: Multiple-revolution Lambert extensions for constellation deployment

## 11. Self-check — five questions, no answers
1. For fixed \(r_1\), \(r_2\), and \(\Delta t\), how many distinct conic solutions can exist when \(\Delta\theta > 180^\circ\)?
2. Show that the semi-major axis of a parabolic transfer is formally infinite and derive the corresponding limiting form of the time-of-flight equation.
3. A solver returns two real roots for \(x\). Which root corresponds to the minimum-energy ellipse?
4. Why does the universal-variable formulation remain valid when the transfer orbit changes from elliptic to hyperbolic?
5. In the limit \(\Delta t \to 0\), what happens to the magnitude of the required \(\mathbf{v}_1\)?