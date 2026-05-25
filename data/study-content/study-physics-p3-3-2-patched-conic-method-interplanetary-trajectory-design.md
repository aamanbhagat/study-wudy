## 1. What it is — in plain English

Imagine you want to travel from your home on Earth to a friend's house on Mars. That's a really long trip, and along the way, you'll be influenced by the gravity of many different things: Earth, the Moon, the Sun, Mars, and even Jupiter. Trying to calculate the exact path considering all these pulls at once is incredibly complex, like trying to predict the exact path of a feather in a hurricane.

The "patched conic method" is a clever trick to simplify this super-complicated problem. Instead of trying to calculate everything at once, we break the journey into three main "zones" or "patches." Each zone is dominated by the gravity of just one main body.

First, when you're near Earth, Earth's gravity is the strongest influence, so we pretend only Earth is pulling on you. Your path here looks like a hyperbola, which is a specific type of curved path. Once you've gone far enough from Earth, its pull becomes weak.

Second, in the vast space between planets, the Sun's gravity is by far the strongest force. So, we pretend only the Sun is pulling on you, and your path becomes a big ellipse around the Sun, like a mini-planet. Finally, as you get close to Mars, Mars's gravity starts to dominate. We then switch back to pretending only Mars is pulling on you, and your path again looks like a hyperbola, but this time it's curving *towards* Mars. We "patch" these three simple paths together at the boundaries of these zones.

This method isn't perfectly accurate, but it gives us a really good first guess for how to get from one planet to another. It's like planning a long road trip: you might plan your route based on major highways (Sun's gravity), then switch to local roads once you get close to a city (planet's gravity), without trying to map every single pothole along the way.

## 2. Why it matters — real-world applications

The patched conic method is a cornerstone of preliminary mission design for interplanetary travel. Its simplicity and reasonable accuracy make it indispensable for initial planning.

1.  **Interplanetary Probe Design (e.g., Mars Rovers, Voyager, New Horizons):** Before any deep-space mission is launched, engineers use the patched conic method to calculate the initial required velocity (delta-V) to escape Earth, the travel time to the target planet, and the velocity at which the spacecraft will arrive. This forms the basis for fuel budget calculations, trajectory corrections, and overall mission timelines. Without it, designing missions like Perseverance or the James Webb Space Telescope's journey to L2 would be prohibitively complex from the outset.
2.  **Asteroid Deflection and Planetary Defense:** If an asteroid were on a collision course with Earth, rapid trajectory planning would be critical. The patched conic method allows for quick, back-of-the-envelope calculations to determine the necessary impulse (delta-V) and timing for a deflection mission, whether it's a kinetic impactor or a gravity tractor. This provides vital initial data for emergency response scenarios.
3.  **Space Tourism and Future Colonization Planning:** As humanity looks towards expanding into the solar system, understanding the basic mechanics of interplanetary travel becomes crucial. Companies like SpaceX, Blue Origin, and government agencies like NASA use these foundational methods to plan hypothetical journeys for crewed missions to Mars or the Moon, determining optimal launch windows, travel durations, and the energy requirements for transportation systems like Starship.
4.  **Gravity Assist Maneuvers (Slingshots):** While gravity assists are a more advanced concept, the patched conic method provides the framework for understanding how a spacecraft interacts with a planet's gravitational field to gain or lose speed relative to the Sun. The change in the hyperbolic trajectory around the assisting planet is calculated using patched conics, which then translates into a different heliocentric trajectory. This was crucial for missions like Voyager, which used Jupiter and Saturn for gravity assists to reach the outer solar system.

## 3. Prerequisites — what you must know first

Before diving into the patched conic method, ensure you have a solid grasp of these fundamental concepts in orbital mechanics and classical physics. If any of these feel unfamiliar, pause and review them.

*   **Newton's Law of Universal Gravitation:** Describes the attractive force between any two masses. $F = G \frac{m_1 m_2}{r^2}$.
*   **Two-Body Problem:** The simplified model where only two masses interact gravitationally, leading to conic section trajectories. This is the foundation upon which patched conics are built.
*   **Orbital Elements:** The six parameters that uniquely define an orbit (e.g., semi-major axis $a$, eccentricity $e$, inclination $i$, longitude of the ascending node $\Omega$, argument of periapsis $\omega$, true anomaly $\nu$).
*   **Conic Sections:** The basic shapes of orbits in the two-body problem: circles, ellipses (closed orbits), parabolas, and hyperbolas (open orbits).
*   **Specific Energy (Vis-Viva Equation):** A fundamental equation relating an orbiting body's velocity $v$, distance $r$ from the central body, and the orbit's semi-major axis $a$. $v^2 = \mu \left( \frac{2}{r} - \frac{1}{a} \right)$.
*   **Standard Gravitational Parameter ($\mu$):** The product of the gravitational constant $G$ and the mass of the central body $M$, i.e., $\mu = GM$. It simplifies orbital calculations.
*   **Escape Velocity:** The minimum velocity an object needs to break free from the gravitational pull of a massive body, resulting in a parabolic trajectory.
*   **Hyperbolic Trajectories:** Open orbits where an object has more than escape velocity, meaning it will never return to the central body. Characterized by a positive specific energy.
*   **Hohmann Transfer Orbit:** A specific type of elliptical transfer orbit between two circular, coplanar orbits, requiring minimum fuel. It's a key component of many interplanetary transfers.
*   **Frames of Reference:** Understanding how velocities and positions change when viewed from different moving reference points (e.g., Earth-centered vs. Sun-centered).
*   **Vector Addition and Subtraction:** Essential for combining velocities in different frames of reference.

## 4. The core idea — step by step

The patched conic method simplifies the complex N-body problem (where N is the number of celestial bodies) into a sequence of tractable two-body problems. This is achieved by dividing the journey into distinct regions, or "patches," where the gravitational influence of a single body dominates.

### Step 1: The Simplification — The Sphere of Influence (SOI)

**Plain English:** We can't track every gravitational pull from every planet and the Sun all at once. It's too hard! So, we draw imaginary bubbles around each planet. Inside a planet's bubble, we pretend only that planet's gravity matters. Outside that bubble, we ignore the planet and only consider the Sun's gravity. These bubbles are called "Spheres of Influence."

**Small Concrete Example:** Imagine a tiny space probe near Earth. As long as it's within about 925,000 km of Earth, Earth's gravity is the main boss. Beyond that, the Sun takes over. When it gets close to Mars, Mars's 577,000 km bubble becomes the new boss.

**Formal/Mathematical Version:** The radius of a planet's Sphere of Influence ($r_{SOI}$) is an approximation based on the planet's mass ($m_p$), the Sun's mass ($M_S$), and the distance between the planet and the Sun ($R_{pS}$). It's often calculated using the formula:

$$ r_{SOI} = R_{pS} \left( \frac{m_p}{M_S} \right)^{2/5} $$

This formula is derived by comparing the gravitational acceleration due to the planet with the differential gravitational acceleration due to the Sun (i.e., the difference between the Sun's pull on the spacecraft and its pull on the planet).

**What could go wrong:** Using the SOI as a hard boundary for *all* gravitational effects. In reality, gravity never truly "turns off." This is an approximation. If the spacecraft spends a long time near the SOI boundary, or if the masses are more comparable (e.g., Earth-Moon system), this approximation can lead to significant errors.

### Step 2: The Three Phases of Interplanetary Travel

**Plain English:** We break the entire trip into three distinct parts, each governed by a different gravitational "boss" and thus a different type of path.

1.  **Departure Phase:** Near the departure planet (e.g., Earth). The spacecraft is under the planet's gravity. Its path here is a hyperbola relative to the planet, designed to escape the planet's pull.
2.  **Interplanetary Transfer Phase:** In the vast space between planets. The spacecraft is primarily under the Sun's gravity. Its path here is typically an ellipse (like a Hohmann transfer) around the Sun.
3.  **Arrival Phase:** Near the target planet (e.g., Mars). The spacecraft enters the target planet's SOI. Its path here is again a hyperbola relative to the planet, as it approaches and potentially orbits or lands.

**Small Concrete Example:**
1.  **Departure:** Your rocket fires to leave Earth's orbit, zooming away from Earth on a curved path that gets faster and faster until it's "free" of Earth.
2.  **Transfer:** You're now cruising in a big, oval-shaped path around the Sun, slowly catching up to Mars.
3.  **Arrival:** As you get close to Mars, Mars's gravity pulls you in, bending your path sharply around it.

**Formal/Mathematical Version:** Each phase is treated as a two-body problem:
1.  **Departure:** Central body is the departure planet. Trajectory is a hyperbola.
2.  **Transfer:** Central body is the Sun. Trajectory is an ellipse (often a Hohmann transfer).
3.  **Arrival:** Central body is the target planet. Trajectory is a hyperbola.

The velocity of the spacecraft at the boundary of each SOI is crucial for "patching" these trajectories together.

**What could go wrong:** Assuming the transfer is always a simple Hohmann transfer. While common, more complex elliptical transfers (bi-elliptic, non-coplanar) or even direct hyperbolic transfers are possible, but the principle of patching remains.

### Step 3: Hyperbolic Excess Velocity ($v_\infty$)

**Plain English:** When a spacecraft leaves a planet's gravity (or approaches it), it doesn't just "stop" at the edge of the planet's influence. It still has some speed left over relative to the planet, even when it's "far away." This leftover speed is called the "hyperbolic excess velocity." It's the speed it would have if it were infinitely far away from the planet, but still under its influence. This speed is the *key* to linking the planet-centered and Sun-centered phases.

**Small Concrete Example:** Imagine throwing a ball really hard upwards. It slows down, but if you throw it hard enough, it will still have speed when it's "free" of Earth's gravity. That "leftover" speed is $v_\infty$. If you throw it just enough to escape, $v_\infty = 0$. If you throw it harder, $v_\infty > 0$.

**Formal/Mathematical Version:** For a hyperbolic trajectory, the specific energy $\mathcal{E}$ is positive:
$$ \mathcal{E} = \frac{v^2}{2} - \frac{\mu}{r} = \frac{v_\infty^2}{2} $$
Where $v$ is the velocity at distance $r$ from the central body, $\mu$ is the central body's gravitational parameter, and $v_\infty$ is the hyperbolic excess velocity.
This equation shows that the hyperbolic excess velocity is directly related to the specific energy of the hyperbolic trajectory. It represents the velocity of the spacecraft relative to the central body when $r \to \infty$.

**What could go wrong:** Confusing $v_\infty$ with the actual velocity at the SOI boundary. While $v_\infty$ is defined at infinity, for practical purposes in patched conics, the velocity *at the SOI boundary* relative to the planet is approximated as $v_\infty$. This is an acceptable approximation because the SOI is typically far enough that the planet's gravitational pull is very weak there.

### Step 4: Matching Velocities at the SOI Boundaries

**Plain English:** This is where the "patching" happens. When our spacecraft leaves Earth's bubble, it has a certain speed relative to Earth ($v_{\infty, \text{departure}}$). But Earth itself is moving around the Sun. So, to figure out the spacecraft's speed relative to the Sun *after* leaving Earth, we simply add its speed relative to Earth to Earth's speed relative to the Sun. We do the same thing in reverse when arriving at Mars: we know its speed relative to the Sun, subtract Mars's speed relative to the Sun, and that gives us its speed relative to Mars ($v_{\infty, \text{arrival}}$).

**Small Concrete Example:** You're on a moving train (Earth around the Sun). You throw a ball forward from the train (spacecraft escaping Earth). The ball's speed relative to the ground (Sun) is its speed relative to the train (Earth) *plus* the train's speed relative to the ground.

**Formal/Mathematical Version:**
Let $\mathbf{V}_{SC/P}$ be the spacecraft's velocity relative to the planet, and $\mathbf{V}_{P/S}$ be the planet's velocity relative to the Sun.
The spacecraft's velocity relative to the Sun, $\mathbf{V}_{SC/S}$, is:
$$ \mathbf{V}_{SC/S} = \mathbf{V}_{SC/P} + \mathbf{V}_{P/S} $$
At the edge of the departure planet's SOI, $\mathbf{V}_{SC/P}$ is effectively $\mathbf{v}_{\infty, \text{departure}}$. So, the spacecraft's velocity in the heliocentric frame just after leaving Earth's SOI is:
$$ \mathbf{V}_{departure, \text{heliocentric}} = \mathbf{v}_{\infty, \text{departure}} + \mathbf{V}_{\text{Earth/Sun}} $$
Similarly, upon arrival at the target planet's SOI, the spacecraft's velocity relative to the target planet (its hyperbolic excess velocity relative to the target planet) is:
$$ \mathbf{v}_{\infty, \text{arrival}} = \mathbf{V}_{\text{arrival, heliocentric}} - \mathbf{V}_{\text{Target/Sun}} $$
It's important to note that these are vector additions/subtractions. For simpler, coplanar transfers, we often deal with magnitudes, but the direction is crucial.

**What could go wrong:** Forgetting to account for the planet's orbital velocity around the Sun. This is a very common mistake and will lead to completely incorrect heliocentric transfer orbits. Also, confusing the *direction* of the vectors.

### Step 5: Calculating Delta-V ($\Delta V$)

**Plain English:** Delta-V is the change in velocity you need to make using your rocket engines. It's like how much you need to push the accelerator or brake pedal. We calculate the Delta-V needed for two main parts:
1.  **Departure Burn:** How much extra speed you need to get from your initial orbit around Earth (e.g., Low Earth Orbit) onto the hyperbolic escape path.
2.  **Arrival Burn (Optional):** How much you need to slow down when you get to Mars to be captured into an orbit around Mars, instead of just flying past it.
The interplanetary cruise itself usually doesn't need a big burn, maybe just small corrections.

**Small Concrete Example:**
1.  You're in a parking lot (LEO). You need to speed up to get onto the highway (escape Earth). That's $\Delta V_1$.
2.  You're on the highway (heliocentric transfer). You might need a tiny nudge to stay on course.
3.  You're approaching your friend's driveway (Mars). You need to brake to turn in, or you'll just fly past (capture into Mars orbit). That's $\Delta V_2$.

**Formal/Mathematical Version:**
The $\Delta V$ required to escape from an initial circular parking orbit (radius $r_0$) around the departure planet to achieve a specific $v_{\infty, \text{departure}}$ is:
First, calculate the velocity in the parking orbit: $v_0 = \sqrt{\frac{\mu_p}{r_0}}$.
Then, the velocity at periapsis ($r_0$) of the escape hyperbola is given by the Vis-Viva equation (or conservation of energy for the hyperbola):
$$ v_{p, \text{hyperbola}}^2 = v_{\infty, \text{departure}}^2 + \frac{2\mu_p}{r_0} $$
So, the $\Delta V$ for departure is:
$$ \Delta V_{\text{departure}} = v_{p, \text{hyperbola}} - v_0 $$
For arrival, if we want to be captured into a circular parking orbit (radius $r_f$) around the target planet, we first calculate the velocity at periapsis of the arrival hyperbola (closest approach to the target planet, $r_f$):
$$ v_{p, \text{arrival hyperbola}}^2 = v_{\infty, \text{arrival}}^2 + \frac{2\mu_T}{r_f} $$
Then, the velocity required for the circular parking orbit around the target planet is: $v_{f, \text{circular}} = \sqrt{\frac{\mu_T}{r_f}}$.
So, the $\Delta V$ for capture is:
$$ \Delta V_{\text{capture}} = v_{p, \text{arrival hyperbola}} - v_{f, \text{circular}} $$
Here, $\mu_p$ is the gravitational parameter of the departure planet, and $\mu_T$ is for the target planet.

**What could go wrong:** Forgetting to account for the initial velocity in the parking orbit. The $\Delta V$ is always the *change* in velocity, not the absolute velocity. Also, assuming the hyperbolic periapsis radius is the same as the parking orbit radius for arrival; often, a capture burn is performed at a higher altitude or after some aerobraking.

### Step 6: Iterative Refinement and Limitations

**Plain English:** The patched conic method is a fantastic starting point, but it's like a rough sketch. It tells us *approximately* how much fuel we need and how long the trip will take. But because we ignored all those other gravitational pulls (like the Moon, or Jupiter, or the small tug from the Sun when we were near Earth), the real path will be slightly different. So, after we get this first estimate, engineers use much more powerful computers to simulate the path precisely, considering *all* the gravitational forces. This fine-tunes the trajectory and allows for tiny course corrections during the actual mission.

**Small Concrete Example:** You plan a road trip with a paper map (patched conics). It gets you to the right city. But then you use your phone's GPS (N-body simulation) to navigate the exact streets and avoid traffic, making small turns along the way.

**Formal/Mathematical Version:** The patched conic method is a zero-order approximation to the N-body problem. For higher fidelity, numerical integration of the N-body equations of motion is performed:
$$ \ddot{\mathbf{r}}_i = \sum_{j=1, j \neq i}^N G m_j \frac{\mathbf{r}_j - \mathbf{r}_i}{|\mathbf{r}_j - \mathbf{r}_i|^3} $$
This requires sophisticated software and significant computational power. The patched conic solution provides the initial conditions for these more precise simulations.

**What could go wrong:** Relying solely on patched conics for final mission design. It's not accurate enough for precise navigation, especially for long-duration missions or those involving close planetary flybys (gravity assists).

## 5. Worked examples — multiple, with every step shown

We will use the following constants:
*   Gravitational parameter of the Sun, $\mu_{Sun} = 1.327 \times 10^{11} \text{ km}^3/\text{s}^2$
*   Gravitational parameter of Earth, $\mu_{Earth} = 3.986 \times 10^5 \text{ km}^3/\text{s}^2$
*   Gravitational parameter of Mars, $\mu_{Mars} = 4.283 \times 10^4 \text{ km}^3/\text{s}^2$
*   Mean orbital radius of Earth, $r_{Earth} = 1.496 \times 10^8 \text{ km}$
*   Mean orbital radius of Mars, $r_{Mars} = 2.279 \times 10^8 \text{ km}$
*   Radius of Earth, $R_{Earth} = 6378 \text{ km}$
*   Radius of Mars, $R_{Mars} = 3390 \text{ km}$
*   Assume circular, coplanar orbits for Earth and Mars for simplicity unless otherwise specified.

### Example 1 (Easy): Heliocentric Hohmann Transfer from Earth to Mars

**Problem:** Calculate the $\Delta V$ required for the heliocentric transfer phase of a Hohmann transfer from Earth's orbit to Mars's orbit. Assume the spacecraft has already escaped Earth's SOI and is in an orbit around the Sun.

**Given:**
*   $r_1 = r_{Earth} = 1.496 \times 10^8 \text{ km}$ (initial circular orbit radius around Sun)
*   $r_2 = r_{Mars} = 2.279 \times 10^8 \text{ km}$ (final circular orbit radius around Sun)
*   $\mu_{Sun} = 1.327 \times 10^{11} \text{ km}^3/\text{s}^2$

**Wanted:** $\Delta V_{Hohmann}$ (the total $\Delta V$ for the heliocentric transfer phase).

**Solution:**

**Step 1: Calculate the initial velocity of Earth (and spacecraft before burn) in its heliocentric orbit.**
$$ v_1 = \sqrt{\frac{\mu_{Sun}}{r_1}} $$
This is the velocity of Earth in its assumed circular orbit around the Sun.
$$ v_1 = \sqrt{\frac{1.327 \times 10^{11} \text{ km}^3/\text{s}^2}{1.496 \times 10^8 \text{ km}}} $$
$$ v_1 = \sqrt{886.9 \text{ km}^2/\text{s}^2} $$
$$ v_1 = 29.78 \text{ km/s} $$
This is the orbital velocity of Earth around the Sun. The spacecraft, after escaping Earth, will initially match this velocity relative to the Sun.

**Step 2: Calculate the semi-major axis of the Hohmann transfer ellipse.**
For a Hohmann transfer, the perihelion is at $r_1$ and the aphelion is at $r_2$.
$$ a_{transfer} = \frac{r_1 + r_2}{2} $$
The semi-major axis is the average of the initial and final orbital radii.
$$ a_{transfer} = \frac{1.496 \times 10^8 \text{ km} + 2.279 \times 10^8 \text{ km}}{2} $$
$$ a_{transfer} = \frac{3.775 \times 10^8 \text{ km}}{2} $$
$$ a_{transfer} = 1.8875 \times 10^8 \text{ km} $$
This defines the size of the elliptical path the spacecraft will take around the Sun.

**Step 3: Calculate the velocity at perihelion of the transfer ellipse ($v_{p, transfer}$).**
We use the Vis-Viva equation for the transfer ellipse at $r_1$.
$$ v_{p, transfer}^2 = \mu_{Sun} \left( \frac{2}{r_1} - \frac{1}{a_{transfer}} \right) $$
This is the velocity the spacecraft needs to have relative to the Sun at Earth's orbit to enter the transfer ellipse.
$$ v_{p, transfer}^2 = 1.327 \times 10^{11} \left( \frac{2}{1.496 \times 10^8} - \frac{1}{1.8875 \times 10^8} \right) $$
$$ v_{p, transfer}^2 = 1.327 \times 10^{11} \left( 1.3369 \times 10^{-8} - 5.2975 \times 10^{-9} \right) $$
$$ v_{p, transfer}^2 = 1.327 \times 10^{11} \left( 8.0715 \times 10^{-9} \right) $$
$$ v_{p, transfer}^2 = 1070.7 \text{ km}^2/\text{s}^2 $$
$$ v_{p, transfer} = 32.72 \text{ km/s} $$
This is the velocity required at Earth's orbital distance to start the Hohmann transfer.

**Step 4: Calculate the first $\Delta V$ burn for the heliocentric transfer ($\Delta V_1$).**
This is the change in velocity needed to go from Earth's orbital velocity ($v_1$) to the transfer ellipse perihelion velocity ($v_{p, transfer}$).
$$ \Delta V_1 = v_{p, transfer} - v_1 $$
This burn happens *after* the spacecraft has escaped Earth's gravity, and its velocity is measured relative to the Sun.
$$ \Delta V_1 = 32.72 \text{ km/s} - 29.78 \text{ km/s} $$
$$ \Delta V_1 = 2.94 \text{ km/s} $$
This is the first major burn for the interplanetary transfer.

**Step 5: Calculate the velocity at aphelion of the transfer ellipse ($v_{a, transfer}$).**
We use the Vis-Viva equation for the transfer ellipse at $r_2$.
$$ v_{a, transfer}^2 = \mu_{Sun} \left( \frac{2}{r_2} - \frac{1}{a_{transfer}} \right) $$
This is the velocity the spacecraft will have relative to the Sun when it reaches Mars's orbit.
$$ v_{a, transfer}^2 = 1.327 \times 10^{11} \left( \frac{2}{2.279 \times 10^8} - \frac{1}{1.8875 \times 10^8} \right) $$
$$ v_{a, transfer}^2 = 1.327 \times 10^{11} \left( 8.7758 \times 10^{-9} - 5.2975 \times 10^{-9} \right) $$
$$ v_{a, transfer}^2 = 1.327 \times 10^{11} \left( 3.4783 \times 10^{-9} \right) $$
$$ v_{a, transfer}^2 = 461.5 \text{ km}^2/\text{s}^2 $$
$$ v_{a, transfer} = 21.48 \text{ km/s} $$
This is the spacecraft's velocity relative to the Sun when it arrives at Mars's orbital distance.

**Step 6: Calculate the velocity of Mars in its heliocentric orbit ($v_2$).**
$$ v_2 = \sqrt{\frac{\mu_{Sun}}{r_2}} $$
This is the velocity of Mars in its assumed circular orbit around the Sun.
$$ v_2 = \sqrt{\frac{1.327 \times 10^{11} \text{ km}^3/\text{s}^2}{2.279 \times 10^8 \text{ km}}} $$
$$ v_2 = \sqrt{582.2 \text{ km}^2/\text{s}^2} $$
$$ v_2 = 24.13 \text{ km/s} $$
This is the orbital velocity of Mars around the Sun.

**Step 7: Calculate the second $\Delta V$ burn for the heliocentric transfer ($\Delta V_2$).**
This is the change in velocity needed to go from the transfer ellipse aphelion velocity ($v_{a, transfer}$) to Mars's orbital velocity ($v_2$). This burn would be needed to circularize the orbit around Mars, but in this example, it represents the velocity difference at arrival.
$$ \Delta V_2 = v_2 - v_{a, transfer} $$
This burn would typically be a retro-burn to slow down and match Mars's orbit.
$$ \Delta V_2 = 24.13 \text{ km/s} - 21.48 \text{ km/s} $$
$$ \Delta V_2 = 2.65 \text{ km/s} $$
This is the second major burn for the interplanetary transfer (or the required change to enter a circular orbit matching Mars).

**Step 8: Calculate the total $\Delta V$ for the heliocentric transfer.**
$$ \Delta V_{Hohmann} = \Delta V_1 + \Delta V_2 $$
This is the sum of the two burns required for the heliocentric transfer.
$$ \Delta V_{Hohmann} = 2.94 \text{ km/s} + 2.65 \text{ km/s} $$
$$ \Delta V_{Hohmann} = 5.59 \text{ km/s} $$

**Final Answer:**
The total $\Delta V$ required for the heliocentric Hohmann transfer from Earth's orbit to Mars's orbit is $\boxed{5.59 \text{ km/s}}$.

**Reflection:** This example focused only on the *heliocentric* part of the journey. It assumes the spacecraft magically appears at Earth's orbit with Earth's velocity and then magically gets captured by Mars. The trickiness here is keeping track of which velocity belongs to which orbit (circular Earth, transfer ellipse, circular Mars) and which central body (Sun).

### Example 2 (Medium): Earth Departure from Low Earth Orbit (LEO)

**Problem:** A spacecraft is in a circular Low Earth Orbit (LEO) at an altitude of 300 km. Calculate the $\Delta V$ required to escape Earth's Sphere of Influence (SOI) and achieve a hyperbolic excess velocity ($v_\infty$) of 3.0 km/s relative to Earth.

**Given:**
*   Altitude of LEO, $h_{LEO} = 300 \text{ km}$
*   Radius of Earth, $R_{Earth} = 6378 \text{ km}$
*   Gravitational parameter of Earth, $\mu_{Earth} = 3.986 \times 10^5 \text{ km}^3/\text{s}^2$
*   Hyperbolic excess velocity, $v_\infty = 3.0 \text{ km/s}$

**Wanted:** $\Delta V_{escape}$ (the burn required to leave LEO).

**Solution:**

**Step 1: Calculate the radius of the initial LEO parking orbit.**
$$ r_{LEO} = R_{Earth} + h_{LEO} $$
This is the distance from the center of the Earth to the spacecraft in LEO.
$$ r_{LEO} = 6378 \text{ km} + 300 \text{ km} $$
$$ r_{LEO} = 6678 \text{ km} $$

**Step 2: Calculate the velocity of the spacecraft in the LEO parking orbit.**
$$ v_{LEO} = \sqrt{\frac{\mu_{Earth}}{r_{LEO}}} $$
This is the velocity the spacecraft currently has in its circular orbit around Earth.
$$ v_{LEO} = \sqrt{\frac{3.986 \times 10^5 \text{ km}^3/\text{s}^2}{6678 \text{ km}}} $$
$$ v_{LEO} = \sqrt{59.69 \text{ km}^2/\text{s}^2} $$
$$ v_{LEO} = 7.726 \text{ km/s} $$

**Step 3: Calculate the velocity required at $r_{LEO}$ to achieve the desired hyperbolic escape trajectory.**
We use the Vis-Viva equation for a hyperbola, where the specific energy is $\frac{v_\infty^2}{2}$.
$$ v_{p, hyperbola}^2 = v_\infty^2 + \frac{2\mu_{Earth}}{r_{LEO}} $$
This is the velocity at the closest approach (periapsis) of the escape hyperbola, which is $r_{LEO}$ in this case.
$$ v_{p, hyperbola}^2 = (3.0 \text{ km/s})^2 + \frac{2 \times 3.986 \times 10^5 \text{ km}^3/\text{s}^2}{6678 \text{ km}} $$
$$ v_{p, hyperbola}^2 = 9.0 \text{ km}^2/\text{s}^2 + \frac{7.972 \times 10^5 \text{ km}^3/\text{s}^2}{6678 \text{ km}} $$
$$ v_{p, hyperbola}^2 = 9.0 + 119.38 $$
$$ v_{p, hyperbola}^2 = 128.38 \text{ km}^2/\text{s}^2 $$
$$ v_{p, hyperbola} = 11.33 \text{ km/s} $$
This is the velocity the spacecraft *needs* to have at the LEO altitude to escape Earth with a $v_\infty$ of 3.0 km/s.

**Step 4: Calculate the $\Delta V$ required for the escape burn.**
$$ \Delta V_{escape} = v_{p, hyperbola} - v_{LEO} $$
This is the difference between the required escape velocity and the current orbital velocity.
$$ \Delta V_{escape} = 11.33 \text{ km/s} - 7.726 \text{ km/s} $$
$$ \Delta V_{escape} = 3.604 \text{ km/s} $$

**Final Answer:**
The $\Delta V$ required to escape Earth's SOI from LEO with a $v_\infty$ of 3.0 km/s is $\boxed{3.604 \text{ km/s}}$.

**Reflection:** This example highlights the first phase of the patched conic method: escaping the departure planet. The key is to understand how $v_\infty$ relates to the velocity at periapsis of the escape hyperbola using the Vis-Viva equation. The $\Delta V$ is the *difference* in velocities at the point of the burn.

### Example 3 (Medium-Hard): Earth to Mars — Departure $\Delta V$ and Mars Arrival $v_\infty$

**Problem:** A spacecraft departs from a 300 km altitude LEO around Earth and uses a Hohmann transfer to reach Mars's orbit. Calculate:
a) The $\Delta V$ required to escape Earth's SOI and enter the heliocentric Hohmann transfer.
b) The hyperbolic excess velocity ($v_\infty$) of the spacecraft relative to Mars upon arrival at Mars's SOI.

**Given:**
*   $h_{LEO} = 300 \text{ km}$
*   $R_{Earth} = 6378 \text{ km}$
*   $r_{Earth} = 1.496 \times 10^8 \text{ km}$
*   $r_{Mars} = 2.279 \times 10^8 \text{ km}$
*   $\mu_{Sun} = 1.327 \times 10^{11} \text{ km}^3/\text{s}^2$
*   $\mu_{Earth} = 3.986 \times 10^5 \text{ km}^3/\text{s}^2$
*   $\mu_{Mars} = 4.283 \times 10^4 \text{ km}^3/\text{s}^2$

**Wanted:**
a) $\Delta V_{escape}$
b) $v_{\infty, \text{arrival}}$ at Mars

**Solution (Part a: Earth Departure $\Delta V$):**

**Step 1: Calculate $v_1$ (Earth's heliocentric velocity) and $v_{p, transfer}$ (heliocentric velocity at perihelion of transfer ellipse).**
From Example 1, we found:
$v_1 = 29.78 \text{ km/s}$
$v_{p, transfer} = 32.72 \text{ km/s}$

**Step 2: Calculate the required hyperbolic excess velocity relative to Earth ($v_{\infty, \text{departure}}$).**
The burn to enter the heliocentric transfer orbit occurs *after* escaping Earth. The spacecraft's velocity relative to the Sun, after escaping Earth, is the sum of its hyperbolic excess velocity relative to Earth and Earth's orbital velocity around the Sun. To achieve the required heliocentric velocity $v_{p, transfer}$, we need a specific $v_{\infty, \text{departure}}$.
Assuming the escape burn is timed such that $v_{\infty, \text{departure}}$ is aligned with Earth's orbital velocity:
$$ v_{\infty, \text{departure}} = v_{p, transfer} - v_1 $$
This is the extra velocity the spacecraft needs relative to Earth to achieve the desired heliocentric transfer velocity.
$$ v_{\infty, \text{departure}} = 32.72 \text{ km/s} - 29.78 \text{ km/s} $$
$$ v_{\infty, \text{departure}} = 2.94 \text{ km/s} $$

**Step 3: Calculate the LEO parking orbit radius and velocity.**
From Example 2:
$r_{LEO} = R_{Earth} + h_{LEO} = 6378 \text{ km} + 300 \text{ km} = 6678 \text{ km}$
$v_{LEO} = \sqrt{\frac{\mu_{Earth}}{r_{LEO}}} = \sqrt{\frac{3.986 \times 10^5}{6678}} = 7.726 \text{ km/s}$

**Step 4: Calculate the velocity required at $r_{LEO}$ for the escape hyperbola ($v_{p, hyperbola}$).**
Using the $v_{\infty, \text{departure}}$ calculated in Step 2:
$$ v_{p, hyperbola}^2 = v_{\infty, \text{departure}}^2 + \frac{2\mu_{Earth}}{r_{LEO}} $$
$$ v_{p, hyperbola}^2 = (2.94 \text{ km/s})^2 + \frac{2 \times 3.986 \times 10^5 \text{ km}^3/\text{s}^2}{6678 \text{ km}} $$
$$ v_{p, hyperbola}^2 = 8.6436 + 119.38 = 128.0236 \text{ km}^2/\text{s}^2 $$
$$ v_{p, hyperbola} = 11.315 \text{ km/s} $$

**Step 5: Calculate the $\Delta V$ for departure from LEO.**
$$ \Delta V_{escape} = v_{p, hyperbola} - v_{LEO} $$
$$ \Delta V_{escape} = 11.315 \text{ km/s} - 7.726 \text{ km/s} $$
$$ \Delta V_{escape} = 3.589 \text{ km/s} $$

**Final Answer (Part a):**
The $\Delta V$ required to escape Earth's SOI and enter the heliocentric Hohmann transfer is $\boxed{3.589 \text{ km/s}}$.

---

**Solution (Part b: Mars Arrival $v_\infty$):**

**Step 1: Calculate $v_{a, transfer}$ (heliocentric velocity at aphelion of transfer ellipse) and $v_2$ (Mars's heliocentric velocity).**
From Example 1, we found:
$v_{a, transfer} = 21.48 \text{ km/s}$
$v_2 = 24.13 \text{ km/s}$

**Step 2: Calculate the hyperbolic excess velocity relative to Mars ($v_{\infty, \text{arrival}}$).**
Upon arrival at Mars's SOI, the spacecraft's velocity relative to Mars is the difference between its heliocentric velocity and Mars's heliocentric velocity.
$$ v_{\infty, \text{arrival}} = |v_{a, transfer} - v_2| $$
The absolute value is used because $v_\infty$ is a magnitude. The direction of relative velocity determines if it's an approach or departure. For a Hohmann transfer, the spacecraft arrives "behind" Mars in its orbit, meaning it's slower than Mars relative to the Sun, so it needs to slow down to be captured.
$$ v_{\infty, \text{arrival}} = |21.48 \text{ km/s} - 24.13 \text{ km/s}| $$
$$ v_{\infty, \text{arrival}} = |-2.65 \text{ km/s}| $$
$$ v_{\infty, \text{arrival}} = 2.65 \text{ km/s} $$

**Final Answer (Part b):**
The hyperbolic excess velocity of the spacecraft relative to Mars upon arrival is $\boxed{2.65 \text{ km/s}}$.

**Reflection:** This example combines the concepts from Example 1 and 2. The crucial step is understanding that the $v_{\infty, \text{departure}}$ from Earth is what *adds* to Earth's velocity to achieve the transfer orbit's perihelion velocity. Similarly, $v_{\infty, \text{arrival}}$ at Mars is the *difference* between the transfer orbit's aphelion velocity and Mars's velocity. The frame of reference switching is the trickiest part here.

### Example 4 (Hard): Full Earth-Mars Transfer $\Delta V$ with Capture

**Problem:** A spacecraft starts in a circular LEO at 300 km altitude around Earth. It performs a Hohmann transfer to Mars. Upon arrival, it is to be captured into a circular orbit around Mars at an altitude of 500 km. Calculate the total $\Delta V$ required for the entire mission (departure from LEO, heliocentric transfer, and capture into Mars orbit).

**Given:** (Same as Example 3, plus Mars parking orbit altitude)
*   $h_{LEO} = 300 \text{ km}$
*   $h_{Mars\_orbit} = 500 \text{ km}$
*   $R_{Earth} = 6378 \text{ km}$
*   $R_{Mars} = 3390 \text{ km}$
*   $r_{Earth} = 1.496 \times 10^8 \text{ km}$
*   $r_{Mars} = 2.279 \times 10^8 \text{ km}$
*   $\mu_{Sun} = 1.327 \times 10^{11} \text{ km}^3/\text{s}^2$
*   $\mu_{Earth} = 3.986 \times 10^5 \text{ km}^3/\text{s}^2$
*   $\mu_{Mars} = 4.283 \times 10^4 \text{ km}^3/\text{s}^2$

**Wanted:** $\Delta V_{total}$

**Solution:**

**Part 1: Earth Departure $\Delta V$**
This is identical to Part a of Example 3.

**Step 1: Calculate $v_{\infty, \text{departure}}$ for the heliocentric Hohmann transfer.**
From Example 3, Step 2:
$v_{\infty, \text{departure}} = 2.94 \text{ km/s}$

**Step 2: Calculate $r_{LEO}$ and $v_{LEO}$.**
From Example 3, Step 3:
$r_{LEO} = 6678 \text{ km}$
$v_{LEO} = 7.726 \text{ km/s}$

**Step 3: Calculate $v_{p, hyperbola}$ at $r_{LEO}$.**
From Example 3, Step 4:
$v_{p, hyperbola} = 11.315 \text{ km/s}$

**Step 4: Calculate $\Delta V_{departure}$.**
$$ \Delta V_{departure} = v_{p, hyperbola} - v_{LEO} $$
$$ \Delta V_{departure} = 11.315 \text{ km/s} - 7.726 \text{ km/s} = 3.589 \text{ km/s} $$
This is the first component of the total $\Delta V$.

---

**Part 2: Heliocentric Transfer $\Delta V$**
For a Hohmann transfer, no $\Delta V$ is explicitly performed *during* the heliocentric cruise phase (assuming no mid-course corrections). The $\Delta V$ is applied at the start and end of this phase, which we calculate separately for departure and arrival. So, for the "transfer phase" itself, $\Delta V_{transfer} = 0$.

---

**Part 3: Mars Arrival and Capture $\Delta V$**

**Step 1: Calculate $v_{\infty, \text{arrival}}$ at Mars.**
This is identical to Part b of Example 3.
From Example 3, Step 2 (Part b):
$v_{\infty, \text{arrival}} = 2.65 \text{ km/s}$

**Step 2: Calculate the radius of the target Mars parking orbit.**
$$ r_{Mars\_orbit} = R_{Mars} + h_{Mars\_orbit} $$
This is the distance from the center of Mars to the spacecraft in its target orbit.
$$ r_{Mars\_orbit} = 3390 \text{ km} + 500 \text{ km} $$
$$ r_{Mars\_orbit} = 3890 \text{ km} $$

**Step 3: Calculate the velocity required at $r_{Mars\_orbit}$ for the arrival hyperbola ($v_{p, \text{arrival hyperbola}}$).**
The spacecraft arrives at Mars's SOI with $v_{\infty, \text{arrival}}$. It then falls towards Mars. We need to find its velocity at the periapsis of this arrival hyperbola, which we assume is $r_{Mars\_orbit}$.
$$ v_{p, \text{arrival hyperbola}}^2 = v_{\infty, \text{arrival}}^2 + \frac{2\mu_{Mars}}{r_{Mars\_orbit}} $$
$$ v_{p, \text{arrival hyperbola}}^2 = (2.65 \text{ km/s})^2 + \frac{2 \times 4.283 \times 10^4 \text{ km}^3/\text{s}^2}{3890 \text{ km}} $$
$$ v_{p, \text{arrival hyperbola}}^2 = 7.0225 + \frac{8.566 \times 10^4}{3890} $$
$$ v_{p, \text{arrival hyperbola}}^2 = 7.0225 + 22.02 $$
$$ v_{p, \text{arrival hyperbola}}^2 = 29.0425 \text{ km}^2/\text{s}^2 $$
$$ v_{p, \text{arrival hyperbola}} = 5.389 \text{ km/s} $$
This is the velocity the spacecraft will have when it reaches its closest approach to Mars (at $r_{Mars\_orbit}$) if it doesn't burn.

**Step 4: Calculate the velocity required for the circular Mars parking orbit ($v_{Mars\_orbit}$).**
$$ v_{Mars\_orbit} = \sqrt{\frac{\mu_{Mars}}{r_{Mars\_orbit}}} $$
This is the velocity the spacecraft needs to have to be in a stable circular orbit at 500 km altitude around Mars.
$$ v_{Mars\_orbit} = \sqrt{\frac{4.283 \times 10^4 \text{ km}^3/\text{s}^2}{3890 \text{ km}}} $$
$$ v_{Mars\_orbit} = \sqrt{11.01 \text{ km}^2/\text{s}^2} $$
$$ v_{Mars\_orbit} = 3.318 \text{ km/s} $$

**Step 5: Calculate $\Delta V_{capture}$.**
This is the difference between the velocity the spacecraft has at periapsis of the arrival hyperbola and the velocity it needs for the circular orbit. This burn slows the spacecraft down.
$$ \Delta V_{capture} = v_{p, \text{arrival hyperbola}} - v_{Mars\_orbit} $$
$$ \Delta V_{capture} = 5.389 \text{ km/s} - 3.318 \text{ km/s} $$
$$ \Delta V_{capture} = 2.071 \text{ km/s} $$
This is the second major component of the total $\Delta V$.

---

**Part 4: Total $\Delta V$**

**Step 1: Sum all the $\Delta V$ components.**
$$ \Delta V_{total} = \Delta V_{departure} + \Delta V_{capture} $$
$$ \Delta V_{total} = 3.589 \text{ km/s} + 2.071 \text{ km/s} $$
$$ \Delta V_{total} = 5.660 \text{ km/s} $$

**Final Answer:**
The total $\Delta V$ required for the entire mission (departure from LEO, heliocentric transfer, and capture into Mars orbit) is $\boxed{5.660 \text{ km/s}}$.

**Reflection:** This example is the most complete, covering all three phases of the patched conic method. The trickiness lies in correctly identifying the reference frame for each velocity and applying the Vis-Viva equation appropriately for both circular and hyperbolic orbits. It demonstrates how $v_\infty$ acts as the crucial link between the planet-centered and Sun-centered phases. The sum of $\Delta V$s required is a key output for mission planners.

## 6. Common mistakes and traps

1.  **Confusing Frames of Reference:** A very common error is mixing up velocities relative to the Sun with velocities relative to a planet. For example, using Earth's orbital velocity around the Sun directly in a planet-centered calculation, or forgetting to add/subtract the planet's orbital velocity when transitioning between frames.
2.  **Incorrect Hyperbolic Excess Velocity ($v_\infty$) Application:** Students sometimes forget that $v_\infty$ is the velocity at "infinity" relative to the central body, or they use it as an actual velocity at the SOI boundary without understanding its definition in the Vis-Viva equation. It's a measure of the specific energy of the hyperbolic trajectory.
3.  **Ignoring Planet's Orbital Velocity:** When calculating the $\Delta V$ for departure from a planet's SOI to enter a heliocentric transfer, it's critical to add the spacecraft's $v_{\infty, \text{departure}}$ vectorially to the planet's heliocentric orbital velocity. Neglecting this leads to a completely wrong heliocentric transfer.
4.  **Misinterpreting $\Delta V$:** $\Delta V$ is always a *change* in velocity. It's not the absolute velocity required. For example, to escape LEO, you calculate the velocity needed at LEO periapsis for the hyperbola, then subtract the existing LEO orbital velocity.
5.  **Assuming Instantaneous Burns:** The patched conic method assumes all $\Delta V$ burns are instantaneous (impulsive maneuvers). In reality, burns take time, which can slightly alter the trajectory, especially for very large $\Delta V$s.
6.  **Using Incorrect Gravitational Parameter ($\mu$):** Always ensure you're using the $\mu$ of the *central body* for the current two-body problem. For the heliocentric phase, use $\mu_{Sun}$. For the planet-centered phases, use $\mu_{planet}$.

## 7. Textbook-precise explanation

The patched conic method is an approximate technique used for preliminary design of interplanetary trajectories, simplifying the N-body problem into a sequence of two-body problems. It hinges on the concept of a "sphere of influence" (SOI) for each major celestial body.

**Definition of Sphere of Influence (SOI):**
For a spacecraft influenced by a planet (mass $m_p$) orbiting a much larger central body (mass $M_S$, typically the Sun) at a distance $R_{pS}$, the Sphere of Influence is an imaginary sphere centered on the planet. Within this sphere, the gravitational acceleration due to the planet is considered dominant over the differential gravitational acceleration due to the Sun. The radius of the SOI ($r_{SOI}$) is commonly approximated by the Tisserand criterion or Laplace's formula:

$$ r_{SOI} = R_{pS} \left( \frac{m_p}{M_S} \right)^{2/5} $$

Outside this sphere, the gravitational influence of the Sun is considered dominant, and the planet's gravity is neglected. Inside this sphere, the planet's gravity is considered dominant, and the Sun's gravity is neglected.

**Trajectory Phases:**
An interplanetary trajectory is decomposed into three distinct phases, each modeled as a two-body problem:

1.  **Departure Phase (Planet-Centered):** The spacecraft begins in an orbit around the departure planet (e.g., Earth). An impulsive burn is executed to place the spacecraft on a hyperbolic escape trajectory relative to the planet. The trajectory is governed by the departure planet's gravitational parameter ($\mu_{planet, dep}$). The velocity of the spacecraft at the edge of the SOI, relative to the departure planet, is its hyperbolic excess velocity, $v_{\infty, \text{departure}}$. The specific energy of this hyperbola is $\mathcal{E}_{dep} = \frac{v_{\infty, \text{departure}}^2}{2}$.

2.  **Interplanetary Transfer Phase (Sun-Centered):** Once the spacecraft exits the departure planet's SOI, its motion is primarily governed by the Sun's gravity. The spacecraft's velocity relative to the Sun immediately after leaving the SOI ($\mathbf{V}_{SC/S, dep}$) is the vector sum of its hyperbolic excess velocity relative to the planet ($\mathbf{v}_{\infty, \text{departure}}$) and the planet's orbital velocity relative to the Sun ($\mathbf{V}_{P/S, dep}$):
    $$ \mathbf{V}_{SC/S, dep} = \mathbf{v}_{\infty, \text{departure}} + \mathbf{V}_{P/S, dep} $$
    This velocity vector defines the initial conditions for a heliocentric transfer orbit, which is typically an ellipse (e.g., a Hohmann transfer ellipse). The trajectory is governed by the Sun's gravitational parameter ($\mu_{Sun}$). The spacecraft travels along this heliocentric trajectory until it reaches the target planet's SOI.

3.  **Arrival Phase (Planet-Centered):** As the spacecraft approaches the target planet's SOI, its motion again becomes dominated by the target planet's gravity. The spacecraft's velocity relative to the target planet ($\mathbf{v}_{\infty, \text{arrival}}$) upon entering its SOI is the vector difference between the spacecraft's heliocentric velocity at arrival ($\mathbf{V}_{SC/S, arr}$) and the target planet's orbital velocity relative to the Sun ($\mathbf{V}_{P/S, arr}$):
    $$ \mathbf{v}_{\infty, \text{arrival}} = \mathbf{V}_{SC/S, arr} - \mathbf{V}_{P/S, arr} $$
    This $\mathbf{v}_{\infty, \text{arrival}}$ defines a hyperbolic trajectory relative to the target planet, governed by the target planet's gravitational parameter ($\mu_{planet, arr}$). If capture into orbit around the target planet is desired, an impulsive retro-burn is performed at the periapsis of this arrival hyperbola to reduce the spacecraft's velocity sufficiently to enter a closed elliptical or circular orbit.

**Calculation of Delta-V:**
The total $\Delta V$ for the mission is the sum of the $\Delta V$s for departure and arrival/capture.
*   **Departure $\Delta V$:** To transition from an initial circular parking orbit (radius $r_0$) around the departure planet to a hyperbolic escape trajectory with $v_{\infty, \text{departure}}$:
    $$ \Delta V_{dep} = \sqrt{v_{\infty, \text{departure}}^2 + \frac{2\mu_{planet, dep}}{r_0}} - \sqrt{\frac{\mu_{planet, dep}}{r_0}} $$
*   **Arrival/Capture $\Delta V$:** To transition from an arrival hyperbolic trajectory with $v_{\infty, \text{arrival}}$ to a final circular parking orbit (radius $r_f$) around the target planet:
    $$ \Delta V_{arr} = \sqrt{v_{\infty, \text{arrival}}^2 + \frac{2\mu_{planet, arr}}{r_f}} - \sqrt{\frac{\mu_{planet, arr}}{r_f}} $$
The patched conic method provides a computationally efficient means to obtain initial trajectory parameters, which are then refined using higher-fidelity N-body numerical integration methods.

(See: *Orbital Mechanics for Engineering Students* by Howard D. Curtis, 4th Edition, Chapter 8: "Interplanetary Trajectories"; *Fundamentals of Astrodynamics* by Roger R. Bate, Donald D. Mueller, Jerry E. White, Chapter 6: "Interplanetary Trajectories")

## 8. ASCII diagrams

Here's an ASCII diagram illustrating the concept of a Sphere of Influence and the three phases of a patched conic trajectory.

```text
                                  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .