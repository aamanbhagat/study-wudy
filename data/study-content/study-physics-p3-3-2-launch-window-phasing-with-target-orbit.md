## 1. What it is — in plain English

Imagine you're trying to catch a bus. You don't just run out to the bus stop any old time; you check the schedule. You know it takes you 5 minutes to walk to the stop, and the bus takes 10 minutes to get from the previous stop to yours. So, you need to leave your house 5 minutes before the bus is scheduled to arrive at *your* stop. You're timing your departure so you and the bus arrive at the same place at the same time.

In rocket science, a "launch window" is essentially that precise schedule. When we talk about "phasing with a target orbit," it means we need to launch our spacecraft at a very specific moment so that it arrives at a certain point in space *exactly* when another object (our "target") or a specific empty slot in an orbit is also at that same point.

It's like trying to throw a ball to a friend who is riding a merry-go-round. You can't just throw it straight at them because they'll move by the time the ball gets there. You have to "lead" them, throwing the ball to where they *will be* when the ball reaches their path. The "launch window" tells you the exact second to release the ball.

So, "launch window — phasing with target orbit" is all about finding the perfect launch time to ensure your spacecraft meets up with something else in space, or reaches a specific orbital position, at the right moment. It's a critical calculation that ensures missions don't miss their mark by millions of kilometers or even just a few meters.

## 2. Why it matters — real-world applications

The ability to precisely time a launch to phase with a target orbit is fundamental to almost all space operations beyond simply putting a satellite into a random orbit. Here are a few critical applications:

1.  **International Space Station (ISS) Rendezvous and Docking:** Every crewed mission (e.g., SpaceX Crew Dragon, Soyuz) and uncrewed cargo mission (e.g., Northrop Grumman Cygnus, SpaceX Cargo Dragon) to the ISS requires an extremely precise launch window. The ISS is orbiting Earth at roughly 7.66 km/s. The launch vehicle must insert the spacecraft into an initial orbit, then perform a series of maneuvers to catch up and dock. The launch window ensures that the spacecraft is launched when the ISS is in the correct position relative to the launch site, allowing the spacecraft to reach the ISS's orbital plane and then rendezvous effectively. Missing the window by even a few seconds can result in days of delay or even mission scrub.

2.  **Satellite Constellation Deployment (e.g., Starlink, OneWeb):** Companies deploying large constellations of communication satellites need to place many satellites into specific orbital "slots" within a shared orbital plane. Each new satellite launched must phase with the existing satellites or designated empty slots to maintain precise spacing. For example, if a constellation requires 60 satellites evenly spaced in an orbit, a replacement satellite must be launched to arrive at the exact location of the defunct satellite (or its intended slot) at the correct time, ensuring uniform coverage and avoiding collisions.

3.  **Interplanetary Missions (e.g., Mars Rovers, Europa Clipper):** While often discussed as "planetary alignment," this is a grand-scale phasing problem. To send a probe to Mars, Earth and Mars must be in specific positions relative to each other when the probe departs Earth. The probe will then follow a long, elliptical transfer orbit (often a Hohmann-like transfer) that takes many months. The launch window ensures that when the probe arrives at Mars's orbit, Mars itself is precisely at that point. Missing this window means the probe would arrive at an empty spot in space, with Mars long gone or not yet arrived. These windows typically occur only every 26 months for Mars.

4.  **On-Orbit Servicing and Debris Removal:** As the space industry matures, missions to refuel, repair, or upgrade existing satellites, or to de-orbit space debris, are becoming more common. These missions require the servicing spacecraft to rendezvous with a non-cooperative (or semi-cooperative) target. Calculating the launch window is crucial to ensure the servicer can efficiently reach the target's orbit and match its position and velocity for a safe approach and grappling operation.

## 3. Prerequisites — what you must know first

Before diving deep into launch windows and phasing, ensure you have a solid grasp of these foundational concepts:

*   **Newton's Law of Universal Gravitation:** The fundamental force governing orbital motion, explaining why objects attract each other.
*   **Kepler's Laws of Planetary Motion:**
    *   **First Law:** Orbits are ellipses with the central body at one focus.
    *   **Second Law:** A line segment joining a planet and the Sun sweeps out equal areas during equal intervals of time (implies objects move faster closer to the central body).
    *   **Third Law:** The square of the orbital period is proportional to the cube of the semi-major axis of its orbit ($P^2 \propto a^3$).
*   **Orbital Elements (Classical Keplerian Elements):** The six parameters that uniquely define an orbit. For phasing, the most relevant are:
    *   **Semi-major axis ($a$):** Defines the size of the orbit.
    *   **Eccentricity ($e$):** Defines the shape of the orbit (how elliptical it is).
    *   **True Anomaly ($\nu$):** The angular position of the spacecraft in its orbit, measured from periapsis.
*   **Orbital Period ($P$):** The time it takes for a spacecraft to complete one full revolution around the central body.
*   **Mean Motion ($n$):** The average angular speed of a spacecraft in its orbit, usually in radians per unit time.
*   **Gravitational Parameter ($\mu$):** A constant for a given central body, $\mu = GM$, where $G$ is the gravitational constant and $M$ is the mass of the central body (e.g., Earth, Sun).
*   **Hohmann Transfer Orbit:** A common type of elliptical transfer orbit used to move between two circular coplanar orbits, requiring the minimum amount of fuel. You should understand its geometry and how to calculate its time of flight.
*   **Reference Frames:** Understanding inertial (non-accelerating) and rotating reference frames is helpful, especially when considering Earth's rotation.
*   **Basic Trigonometry and Algebra:** Essential for manipulating equations and solving for unknown angles and times.
*   **Angular Displacement:** How to calculate the change in angle of an object moving at a constant angular velocity over a given time.

## 4. The core idea — step by step

The core idea behind a launch window for phasing is to ensure that your spacecraft, after undergoing a transfer trajectory, arrives at the rendezvous point *at the exact same time* as your target. This means you need to launch when the target is at a specific "initial phase angle" relative to your launch point.

### Step 1: Define the Target Orbit and Target Object's Position

**Plain English:** First, we need to know exactly where our "bus" (the target object or orbital slot) is going and where it is *right now*. We need its address in space.

**Concrete Example:** Let's say we want to rendezvous with the International Space Station (ISS). We know the ISS is in a nearly circular orbit at an altitude of approximately 400 km. At our planned launch time, we need to know its precise position (e.g., its true anomaly or angular position relative to a fixed direction in space).

**Formal/Mathematical Version:**
The target orbit is characterized by its semi-major axis $a_{target}$ and eccentricity $e_{target}$. For simplicity, we often assume circular orbits ($e_{target} \approx 0$).
The target's angular velocity (mean motion) is given by:
$$n_{target} = \sqrt{\frac{\mu}{a_{target}^3}}$$
where $\mu$ is the gravitational parameter of the central body (e.g., Earth).
At any given time $t$, its angular position $\theta_{target}(t)$ can be determined if we know its initial position $\theta_{target,0}$ at $t_0$:
$$\theta_{target}(t) = \theta_{target,0} + n_{target}(t - t_0)$$

**What could go wrong:** Incorrectly assuming the target's orbit is perfectly circular when it has significant eccentricity, or using an outdated ephemeris (position data) for the target. Even small errors in $a_{target}$ will lead to errors in $n_{target}$ and thus incorrect phasing.

### Step 2: Define the Transfer Orbit and Calculate its Time of Flight (TOF)

**Plain English:** Next, we need to figure out *how* we're going to get from our initial position (usually on Earth) to the target orbit. This path is called the transfer orbit. We also need to know how long that journey will take.

**Concrete Example:** To go from a low Earth parking orbit to the ISS's orbit, we might use a series of small burns, but for simplicity, let's consider a Hohmann transfer from a low Earth orbit (LEO) to a higher LEO. The transfer orbit will be an ellipse. We need to calculate how many hours or days it will take to traverse this ellipse to the rendezvous point.

**Formal/Mathematical Version:**
A common transfer orbit is the Hohmann transfer, which is an ellipse tangent to both the initial and target circular orbits.
The semi-major axis of the Hohmann transfer orbit is:
$$a_{transfer} = \frac{r_{initial} + r_{target}}{2}$$
where $r_{initial}$ is the radius of the initial orbit (e.g., parking orbit) and $r_{target}$ is the radius of the target orbit.
The time of flight ($TOF$) for a Hohmann transfer (half an elliptical orbit) is half the period of the transfer orbit:
$$TOF = \frac{P_{transfer}}{2} = \pi \sqrt{\frac{a_{transfer}^3}{\mu}}$$
For other types of transfers (e.g., bi-elliptic, direct transfer), the $TOF$ calculation will differ but the principle remains: determine the duration of the transfer.

**What could go wrong:** Using the wrong radius for the initial or target orbit, or miscalculating $a_{transfer}$. Most critically, assuming a Hohmann transfer is always optimal when mission constraints (like time-criticality or non-coplanar orbits) might require a different, faster (but more fuel-intensive) transfer. Forgetting to divide the full orbital period by 2 for a Hohmann transfer.

### Step 3: Determine the Required Relative Phasing Angle

**Plain English:** This is the clever part. While our spacecraft is on its journey (the $TOF$), the target object isn't sitting still; it's moving! So, when we *launch*, the target needs to be at a specific angle *ahead* or *behind* the rendezvous point. This way, by the time our spacecraft arrives at the rendezvous point, the target will have moved into that exact spot. It's like throwing a football to a running receiver – you throw it to where they *will be*, not where they are *now*.

**Concrete Example:** If our transfer orbit takes 2 hours, and the ISS moves 30 degrees every hour, then during our 2-hour flight, the ISS will move 60 degrees. If we want to meet the ISS at a specific point, let's say directly above our launch site, then at the moment of launch, the ISS must be 60 degrees *ahead* of that rendezvous point. This way, it will "lead" us, and by the time we arrive, it will have covered the 60 degrees and be waiting for us.

**Formal/Mathematical Version:**
During the $TOF$, the target object will cover an angular distance of:
$$\Delta\theta_{target} = n_{target} \cdot TOF$$
The transfer orbit itself will also cover an angular distance. For a Hohmann transfer, the spacecraft travels 180 degrees ( $\pi$ radians) relative to the central body.
Let $\Delta\theta_{transfer}$ be the angular travel of the spacecraft in the transfer orbit (e.g., $\pi$ radians for a Hohmann transfer to the opposite side).
The required initial phase angle ($\phi_{initial}$) between the target and the spacecraft's *rendezvous point* at the moment of launch is:
$$\phi_{initial} = \Delta\theta_{target} - \Delta\theta_{transfer}$$
If $\phi_{initial}$ is positive, the target must be ahead of the rendezvous point at launch. If negative, it must be behind. We often normalize this angle to be between $0$ and $2\pi$ radians (or $0$ and $360$ degrees).
For a Hohmann transfer where the spacecraft is launched into the transfer orbit from $r_{initial}$ and arrives at $r_{target}$ 180 degrees later:
$$\phi_{initial} = n_{target} \cdot TOF - \pi$$
This $\phi_{initial}$ is the angle the target must *lead* the spacecraft's initial position (or the desired rendezvous point) at the moment of injection into the transfer orbit.

**What could go wrong:** Forgetting that the spacecraft itself also moves through an angle during the transfer. Incorrectly calculating the direction of lead/lag (i.e., should the target be ahead or behind?). Not normalizing the angle correctly, leading to confusion about multiple revolutions.

### Step 4: Calculate the Launch Window (Timing the Launch)

**Plain English:** Now that we know the target needs to be at a specific angle when we launch, we can figure out *when* to launch. We observe the target's current position and its speed. We then wait until it rotates into that required initial phase angle relative to our launch site.

**Concrete Example:** If our launch site is at 0 degrees longitude (relative to some fixed direction in space) and the target needs to be 60 degrees ahead of us, and it's currently at 10 degrees ahead, we need to wait until it moves another 50 degrees. If the target moves at 1 degree per minute, we wait 50 minutes. This gives us our launch time.

**Formal/Mathematical Version:**
Let $\theta_{target,current}$ be the current angular position of the target at time $t_{current}$.
Let $\theta_{launch\_site}$ be the angular position of the launch site (or the desired injection point) at $t_{current}$.
The current relative phase angle is $\phi_{current} = \theta_{target,current} - \theta_{launch\_site}$.
We need the initial relative phase angle to be $\phi_{initial}$ (calculated in Step 3).
The difference we need to "make up" is $\Delta\phi = \phi_{initial} - \phi_{current}$.
If $\Delta\phi$ is positive, the target needs to move further ahead. If negative, it needs to move back (or we wait for it to complete a revolution and come around).
The time until the target reaches the desired initial phase angle (i.e., the time of the launch window) is:
$$\Delta t_{launch} = \frac{\Delta\phi}{n_{target} - n_{Earth}}$$
Where $n_{Earth}$ is the angular velocity of Earth's rotation (if the launch site is fixed on Earth). If we're considering a fixed point in an inertial frame, $n_{Earth}$ would be 0. More simply, if we define $\theta_{launch\_site}$ as the desired *inertial* injection point, then we just need to wait for the target to reach $\phi_{initial}$ relative to that point.
A simpler approach: Determine the absolute angular position the target *must* be at launch, $\theta_{target,launch} = \theta_{rendezvous} + \phi_{initial}$. Then find the time $t_{launch}$ such that $\theta_{target}(t_{launch}) = \theta_{target,launch}$.
If $\theta_{target,launch}$ is the required angular position of the target at launch, and $\theta_{target,0}$ is its position at $t_0$, then:
$$t_{launch} = t_0 + \frac{\theta_{target,launch} - \theta_{target,0}}{n_{target}}$$
This gives the precise moment of the launch window. Since launch sites rotate with Earth, the launch window often opens when the target orbit's plane passes over the launch site, and then the specific phasing determines the exact time within that plane-crossing window.

**What could go wrong:** Forgetting to account for Earth's rotation if the launch site is fixed on Earth. Not handling angles correctly (e.g., $350^\circ$ vs $-10^\circ$). Not accounting for multiple possible launch windows (e.g., if the target makes multiple revolutions before we can catch it).

## 5. Worked examples — multiple, with every step shown

We will use the following constants for Earth:
*   Gravitational parameter, $\mu = 3.986 \times 10^{14} \text{ m}^3/\text{s}^2$
*   Earth's radius, $R_E = 6378 \text{ km} = 6.378 \times 10^6 \text{ m}$

### Example 1: Simple Co-planar Circular Orbit Rendezvous

**Problem:** A new satellite needs to be launched from a 200 km altitude circular parking orbit (Orbit A) to rendezvous with an existing satellite (Target) in a 400 km altitude circular orbit (Orbit B). Both orbits are circular and coplanar. The transfer will be a Hohmann transfer. The target satellite is currently at an angular position of $45^\circ$ (true anomaly) relative to a fixed inertial direction. The new satellite will be injected into the transfer orbit when it is directly over the equator at $0^\circ$ longitude (in the same inertial direction). Calculate the required initial phase angle for the target satellite at the moment of launch, and the time to wait until the launch window opens. Assume the target is moving in the same direction as the launch vehicle.

**Given:**
*   Initial parking orbit altitude $h_A = 200 \text{ km}$
*   Target orbit altitude $h_B = 400 \text{ km}$
*   Initial radius $r_A = R_E + h_A = 6378 + 200 = 6578 \text{ km} = 6.578 \times 10^6 \text{ m}$
*   Target radius $r_B = R_E + h_B = 6378 + 400 = 6778 \text{ km} = 6.778 \times 10^6 \text{ m}$
*   Target's current angular position $\theta_{target,current} = 45^\circ$
*   Desired launch injection point (inertial) $\theta_{launch\_injection} = 0^\circ$

**What we want:**
1.  Required initial phase angle ($\phi_{initial}$) for the target at launch.
2.  Time to wait until the launch window opens ($\Delta t_{wait}$).

---

**Step 1: Calculate the semi-major axis of the Hohmann transfer orbit.**

$$a_{transfer} = \frac{r_A + r_B}{2}$$
*This is the average of the initial and target orbit radii, defining the size of the elliptical transfer path.*

$$a_{transfer} = \frac{6.578 \times 10^6 \text{ m} + 6.778 \times 10^6 \text{ m}}{2}$$
$$a_{transfer} = \frac{13.356 \times 10^6 \text{ m}}{2}$$
$$a_{transfer} = 6.678 \times 10^6 \text{ m}$$

**Step 2: Calculate the Time of Flight (TOF) for the Hohmann transfer.**

$$TOF = \pi \sqrt{\frac{a_{transfer}^3}{\mu}}$$
*This formula gives the time it takes to travel half of the transfer ellipse, which is exactly the duration of a Hohmann transfer.*

$$TOF = \pi \sqrt{\frac{(6.678 \times 10^6 \text{ m})^3}{3.986 \times 10^{14} \text{ m}^3/\text{s}^2}}$$
$$TOF = \pi \sqrt{\frac{2.977 \times 10^{20} \text{ m}^3}{3.986 \times 10^{14} \text{ m}^3/\text{s}^2}}$$
$$TOF = \pi \sqrt{7.469 \times 10^5 \text{ s}^2}$$
$$TOF = \pi \times 864.23 \text{ s}$$
$$TOF = 2715.4 \text{ s}$$
*Convert to minutes for better intuition:*
$$TOF = 2715.4 \text{ s} \times \frac{1 \text{ min}}{60 \text{ s}} \approx 45.26 \text{ min}$$

**Step 3: Calculate the mean motion ($n$) of the target orbit.**

$$n_{target} = \sqrt{\frac{\mu}{a_{target}^3}}$$
*This is the average angular speed of the target satellite in its circular orbit. We need $a_{target}$, which is $r_B$.*

$$n_{target} = \sqrt{\frac{3.986 \times 10^{14} \text{ m}^3/\text{s}^2}{(6.778 \times 10^6 \text{ m})^3}}$$
$$n_{target} = \sqrt{\frac{3.986 \times 10^{14} \text{ m}^3/\text{s}^2}{3.116 \times 10^{20} \text{ m}^3}}$$
$$n_{target} = \sqrt{1.279 \times 10^{-6} \text{ s}^{-2}}$$
$$n_{target} = 0.001131 \text{ rad/s}$$
*Convert to degrees per second for easier understanding:*
$$n_{target} = 0.001131 \text{ rad/s} \times \frac{180^\circ}{\pi \text{ rad}} \approx 0.0648 \text{ deg/s}$$

**Step 4: Calculate the angular displacement of the target during TOF.**

$$\Delta\theta_{target} = n_{target} \cdot TOF$$
*This tells us how far the target satellite will move in its orbit while our new satellite is on its transfer trajectory.*

$$\Delta\theta_{target} = (0.001131 \text{ rad/s}) \times (2715.4 \text{ s})$$
$$\Delta\theta_{target} = 3.072 \text{ radians}$$
*Convert to degrees:*
$$\Delta\theta_{target} = 3.072 \text{ rad} \times \frac{180^\circ}{\pi \text{ rad}} \approx 176.0^{\circ}$$

**Step 5: Determine the required initial phase angle ($\phi_{initial}$).**

For a Hohmann transfer, the spacecraft travels $\pi$ radians ($180^\circ$) from its initial position to the rendezvous point. So, $\Delta\theta_{transfer} = \pi \text{ radians} = 180^\circ$.
The required initial phase angle (how far ahead the target needs to be at launch) is:
$$\phi_{initial} = \Delta\theta_{target} - \Delta\theta_{transfer}$$
*The target must lead by the amount it moves during the transfer, minus the 180 degrees our spacecraft travels to the other side of the orbit.*

$$\phi_{initial} = 176.0^\circ - 180^\circ$$
$$\phi_{initial} = -4.0^\circ$$
*A negative angle means the target must be $4.0^\circ$ *behind* the rendezvous point at the moment of launch. Since our launch injection point is $0^\circ$, the target needs to be at $-4.0^\circ$ (or $356.0^\circ$) at launch.*

**Required Initial Phase Angle: $\boxed{\mathbf{-4.0^\circ}}$ (or $\mathbf{356.0^\circ}$)**

**Step 6: Calculate the time to wait until the launch window opens.**

The target is currently at $\theta_{target,current} = 45^\circ$.
The desired position of the target at launch is $\theta_{target,launch} = -4.0^\circ$.
The target needs to move from $45^\circ$ to $-4.0^\circ$. Since it's moving in the positive direction, it needs to complete almost a full revolution.
The angular distance it needs to cover is $(360^\circ - 45^\circ) + (-4.0^\circ) = 315^\circ - 4.0^\circ = 311^\circ$.
More generally, let's find the difference:
$\Delta\phi_{required} = \theta_{target,launch} - \theta_{target,current}$
$\Delta\phi_{required} = -4.0^\circ - 45^\circ = -49^\circ$.
Since the target moves in the positive direction, a negative $\Delta\phi_{required}$ means it needs to travel $360^\circ - 49^\circ = 311^\circ$ to reach that position.
$$ \Delta t_{wait} = \frac{\Delta\phi_{required,normalized}}{n_{target}} $$
*We need to wait for the target to rotate $311^\circ$ from its current position to reach the required launch position.*

$$\Delta t_{wait} = \frac{311^\circ}{0.0648 \text{ deg/s}}$$
$$\Delta t_{wait} = 4799.4 \text{ s}$$
*Convert to minutes:*
$$\Delta t_{wait} = 4799.4 \text{ s} \times \frac{1 \text{ min}}{60 \text{ s}} \approx 79.99 \text{ min}$$

**Time to wait until launch window opens: $\boxed{\mathbf{4799.4 \text{ s} \text{ (approx. 80 minutes)}}}$**

**Reflection:** The tricky part here was correctly interpreting the negative phase angle and calculating the waiting time when the target needs to travel almost a full revolution. It's easy to accidentally calculate $-49^\circ$ and think it's a short wait, forgetting the target moves positively.

---

### Example 2: Phasing for a Satellite Constellation Slot

**Problem:** A satellite constellation requires satellites to be equally spaced in a circular orbit at 700 km altitude. There are 10 satellites in this plane. One satellite has failed, and a replacement needs to be launched into a 200 km parking orbit, then transferred via Hohmann to the 700 km orbit to take the place of the failed satellite. Assume the failed satellite's slot is currently at $180^\circ$ true anomaly. The launch injection point is fixed at $0^\circ$ true anomaly. Calculate the required initial phase angle for the target slot at launch, and the time until the launch window opens if the target slot is currently at $180^\circ$.

**Given:**
*   Target orbit altitude $h_B = 700 \text{ km}$
*   Initial parking orbit altitude $h_A = 200 \text{ km}$
*   $r_A = R_E + h_A = 6378 + 200 = 6578 \text{ km} = 6.578 \times 10^6 \text{ m}$
*   $r_B = R_E + h_B = 6378 + 700 = 7078 \text{ km} = 7.078 \times 10^6 \text{ m}$
*   Target slot's current angular position $\theta_{slot,current} = 180^\circ$
*   Desired launch injection point (inertial) $\theta_{launch\_injection} = 0^\circ$

**What we want:**
1.  Required initial phase angle ($\phi_{initial}$) for the target slot at launch.
2.  Time to wait until the launch window opens ($\Delta t_{wait}$).

---

**Step 1: Calculate the semi-major axis of the Hohmann transfer orbit.**

$$a_{transfer} = \frac{r_A + r_B}{2}$$
*Same logic as Example 1.*

$$a_{transfer} = \frac{6.578 \times 10^6 \text{ m} + 7.078 \times 10^6 \text{ m}}{2}$$
$$a_{transfer} = \frac{13.656 \times 10^6 \text{ m}}{2}$$
$$a_{transfer} = 6.828 \times 10^6 \text{ m}$$

**Step 2: Calculate the Time of Flight (TOF) for the Hohmann transfer.**

$$TOF = \pi \sqrt{\frac{a_{transfer}^3}{\mu}}$$
*Same logic as Example 1.*

$$TOF = \pi \sqrt{\frac{(6.828 \times 10^6 \text{ m})^3}{3.986 \times 10^{14} \text{ m}^3/\text{s}^2}}$$
$$TOF = \pi \sqrt{\frac{3.185 \times 10^{20} \text{ m}^3}{3.986 \times 10^{14} \text{ m}^3/\text{s}^2}}$$
$$TOF = \pi \sqrt{7.990 \times 10^5 \text{ s}^2}$$
$$TOF = \pi \times 893.8 \text{ s}$$
$$TOF = 2808.0 \text{ s}$$
*Convert to minutes:*
$$TOF \approx 46.80 \text{ min}$$

**Step 3: Calculate the mean motion ($n$) of the target orbit.**

$$n_{target} = \sqrt{\frac{\mu}{a_{target}^3}}$$
*Same logic as Example 1. Here $a_{target} = r_B$.*

$$n_{target} = \sqrt{\frac{3.986 \times 10^{14} \text{ m}^3/\text{s}^2}{(7.078 \times 10^6 \text{ m})^3}}$$
$$n_{target} = \sqrt{\frac{3.986 \times 10^{14} \text{ m}^3/\text{s}^2}{3.541 \times 10^{20} \text{ m}^3}}$$
$$n_{target} = \sqrt{1.125 \times 10^{-6} \text{ s}^{-2}}$$
$$n_{target} = 0.001061 \text{ rad/s}$$
*Convert to degrees per second:*
$$n_{target} = 0.001061 \text{ rad/s} \times \frac{180^\circ}{\pi \text{ rad}} \approx 0.0608 \text{ deg/s}$$

**Step 4: Calculate the angular displacement of the target slot during TOF.**

$$\Delta\theta_{target} = n_{target} \cdot TOF$$
*This is how far the empty slot will move while our replacement satellite is traveling.*

$$\Delta\theta_{target} = (0.001061 \text{ rad/s}) \times (2808.0 \text{ s})$$
$$\Delta\theta_{target} = 2.979 \text{ radians}$$
*Convert to degrees:*
$$\Delta\theta_{target} = 2.979 \text{ rad} \times \frac{180^\circ}{\pi \text{ rad}} \approx 170.7^{\circ}$$

**Step 5: Determine the required initial phase angle ($\phi_{initial}$).**

For a Hohmann transfer, $\Delta\theta_{transfer} = 180^\circ$.
$$\phi_{initial} = \Delta\theta_{target} - \Delta\theta_{transfer}$$
*The target slot must lead by the amount it moves during the transfer, relative to the 180 degrees our spacecraft travels.*

$$\phi_{initial} = 170.7^\circ - 180^\circ$$
$$\phi_{initial} = -9.3^\circ$$
*This means the target slot must be $9.3^\circ$ *behind* the rendezvous point (which is $180^\circ$ from our launch point) at the moment of launch. If our launch point is $0^\circ$, our rendezvous point is $180^\circ$. So the target slot needs to be at $180^\circ - 9.3^\circ = 170.7^\circ$ at launch.*

**Required Initial Phase Angle: $\boxed{\mathbf{-9.3^\circ}}$ (or $\mathbf{350.7^\circ}$ relative to the rendezvous point)**

**Step 6: Calculate the time to wait until the launch window opens.**

The target slot is currently at $\theta_{slot,current} = 180^\circ$.
The desired position of the target slot at launch is $\theta_{slot,launch} = 170.7^\circ$.
The target slot needs to move from $180^\circ$ to $170.7^\circ$. Since it moves in the positive direction, it needs to travel $(360^\circ - 180^\circ) + 170.7^\circ = 180^\circ + 170.7^\circ = 350.7^\circ$. Or, more simply, it needs to travel $170.7^\circ - 180^\circ = -9.3^\circ$. Since it moves positively, this means it needs to travel $360^\circ - 9.3^\circ = 350.7^\circ$.
$$ \Delta t_{wait} = \frac{\Delta\phi_{required,normalized}}{n_{target}} $$

$$\Delta t_{wait} = \frac{350.7^\circ}{0.0608 \text{ deg/s}}$$
$$\Delta t_{wait} = 5768.1 \text{ s}$$
*Convert to minutes:*
$$\Delta t_{wait} = 5768.1 \text{ s} \times \frac{1 \text{ min}}{60 \text{ s}} \approx 96.14 \text{ min}$$

**Time to wait until launch window opens: $\boxed{\mathbf{5768.1 \text{ s} \text{ (approx. 96.1 minutes)}}}$**

**Reflection:** This example reinforces the concept of a target "slot" rather than a physical object, which behaves identically. The negative phase angle again means the target needs to be *behind* the rendezvous point at launch.

---

### Example 3: Interplanetary Transfer (Earth to Mars, simplified)

**Problem:** We want to launch a probe from Earth to Mars using a Hohmann transfer. For simplicity, assume Earth and Mars are in perfectly circular, coplanar orbits around the Sun.
*   Earth's orbital radius $r_E = 1 \text{ AU} = 1.496 \times 10^8 \text{ km} = 1.496 \times 10^{11} \text{ m}$
*   Mars's orbital radius $r_M = 1.524 \text{ AU} = 2.280 \times 10^8 \text{ km} = 2.280 \times 10^{11} \text{ m}$
*   Gravitational parameter of the Sun $\mu_{Sun} = 1.327 \times 10^{20} \text{ m}^3/\text{s}^2$
Calculate the Time of Flight (TOF) and the required initial phase angle between Earth and Mars at the moment of launch.

**Given:**
*   $r_A = r_E = 1.496 \times 10^{11} \text{ m}$
*   $r_B = r_M = 2.280 \times 10^{11} \text{ m}$
*   $\mu = \mu_{Sun} = 1.327 \times 10^{20} \text{ m}^3/\text{s}^2$

**What we want:**
1.  Time of Flight (TOF).
2.  Required initial phase angle ($\phi_{initial}$) between Earth and Mars at launch.

---

**Step 1: Calculate the semi-major axis of the Hohmann transfer orbit.**

$$a_{transfer} = \frac{r_E + r_M}{2}$$
*This defines the elliptical path the probe will take from Earth's orbit to Mars's orbit.*

$$a_{transfer} = \frac{1.496 \times 10^{11} \text{ m} + 2.280 \times 10^{11} \text{ m}}{2}$$
$$a_{transfer} = \frac{3.776 \times 10^{11} \text{ m}}{2}$$
$$a_{transfer} = 1.888 \times 10^{11} \text{ m}$$

**Step 2: Calculate the Time of Flight (TOF) for the Hohmann transfer.**

$$TOF = \pi \sqrt{\frac{a_{transfer}^3}{\mu_{Sun}}}$$
*This is the travel time for the probe from Earth to Mars.*

$$TOF = \pi \sqrt{\frac{(1.888 \times 10^{11} \text{ m})^3}{1.327 \times 10^{20} \text{ m}^3/\text{s}^2}}$$
$$TOF = \pi \sqrt{\frac{6.726 \times 10^{33} \text{ m}^3}{1.327 \times 10^{20} \text{ m}^3/\text{s}^2}}$$
$$TOF = \pi \sqrt{5.068 \times 10^{13} \text{ s}^2}$$
$$TOF = \pi \times 7.119 \times 10^6 \text{ s}$$
$$TOF = 2.237 \times 10^7 \text{ s}$$
*Convert to days and then years for intuition:*
$$TOF = 2.237 \times 10^7 \text{ s} \times \frac{1 \text{ min}}{60 \text{ s}} \times \frac{1 \text{ hr}}{60 \text{ min}} \times \frac{1 \text{ day}}{24 \text{ hr}} \approx 259.0 \text{ days}$$
$$TOF = 259.0 \text{ days} \times \frac{1 \text{ year}}{365.25 \text{ days}} \approx 0.709 \text{ years}$$

**Time of Flight: $\boxed{\mathbf{2.237 \times 10^7 \text{ s} \text{ (approx. 259 days)}}}$**

**Step 3: Calculate the mean motion ($n$) of Mars's orbit.**

$$n_{Mars} = \sqrt{\frac{\mu_{Sun}}{a_{Mars}^3}}$$
*This is the average angular speed of Mars around the Sun. Here $a_{Mars} = r_M$.*

$$n_{Mars} = \sqrt{\frac{1.327 \times 10^{20} \text{ m}^3/\text{s}^2}{(2.280 \times 10^{11} \text{ m})^3}}$$
$$n_{Mars} = \sqrt{\frac{1.327 \times 10^{20} \text{ m}^3/\text{s}^2}{1.185 \times 10^{34} \text{ m}^3}}$$
$$n_{Mars} = \sqrt{1.120 \times 10^{-14} \text{ s}^{-2}}$$
$$n_{Mars} = 1.058 \times 10^{-7} \text{ rad/s}$$
*Convert to degrees per day for intuition:*
$$n_{Mars} = 1.058 \times 10^{-7} \text{ rad/s} \times \frac{180^\circ}{\pi \text{ rad}} \times \frac{3600 \text{ s}}{1 \text{ hr}} \times \frac{24 \text{ hr}}{1 \text{ day}} \approx 0.528 \text{ deg/day}$$

**Step 4: Calculate the angular displacement of Mars during TOF.**

$$\Delta\theta_{Mars} = n_{Mars} \cdot TOF$$
*This tells us how far Mars will travel in its orbit while the probe is on its way.*

$$\Delta\theta_{Mars} = (1.058 \times 10^{-7} \text{ rad/s}) \times (2.237 \times 10^7 \text{ s})$$
$$\Delta\theta_{Mars} = 2.366 \text{ radians}$$
*Convert to degrees:*
$$\Delta\theta_{Mars} = 2.366 \text{ rad} \times \frac{180^\circ}{\pi \text{ rad}} \approx 135.6^{\circ}$$

**Step 5: Determine the required initial phase angle ($\phi_{initial}$).**

For a Hohmann transfer from Earth to Mars, the probe travels $180^\circ$ relative to the Sun. So, $\Delta\theta_{transfer} = 180^\circ$.
$$\phi_{initial} = \Delta\theta_{Mars} - \Delta\theta_{transfer}$$
*Mars must lead Earth at launch by an angle such that it arrives at the rendezvous point ($180^\circ$ from Earth's launch point) at the same time as the probe.*

$$\phi_{initial} = 135.6^\circ - 180^\circ$$
$$\phi_{initial} = -44.4^\circ$$
*This means that at the moment of launch, Mars must be $44.4^\circ$ *behind* the position it needs to be in to be directly opposite Earth. More intuitively, if Earth is at $0^\circ$, the probe targets $180^\circ$. Mars needs to be at $180^\circ - 44.4^\circ = 135.6^\circ$ at launch.*

**Required Initial Phase Angle (Mars relative to Earth at launch): $\boxed{\mathbf{-44.4^\circ}}$**

**Reflection:** This example highlights the long TOF and the significant angular travel of the target planet. The negative phase angle indicates that Mars must be *behind* Earth's position relative to the transfer orbit's aphelion point at launch. This means Mars will "catch up" to the probe's arrival point. This is a classic "lead angle" problem for interplanetary transfers.

---

### Example 4: Geosynchronous Transfer Orbit (GTO) Injection

**Problem:** A communications satellite needs to be launched into a Geosynchronous Transfer Orbit (GTO) from a Low Earth Orbit (LEO) parking orbit at 200 km altitude. The GTO will have a perigee at 200 km altitude and an apogee at Geosynchronous Earth Orbit (GEO) altitude (35786 km). The target slot in GEO is at $90^\circ$ longitude. The launch vehicle injects the satellite into GTO when it crosses the equator at $0^\circ$ longitude (inertial). Calculate the required initial phase angle for the target GEO slot at the moment of GTO injection.

**Given:**
*   Perigee altitude $h_p = 200 \text{ km} \implies r_p = R_E + h_p = 6378 + 200 = 6578 \text{ km} = 6.578 \times 10^6 \text{ m}$
*   Apogee altitude $h_a = 35786 \text{ km} \implies r_a = R_E + h_a = 6378 + 35786 = 42164 \text{ km} = 4.2164 \times 10^7 \text{ m}$
*   Target GEO slot position $\theta_{GEO,target} = 90^\circ$
*   Launch injection point (inertial) $\theta_{launch\_injection} = 0^\circ$
*   $\mu = 3.986 \times 10^{14} \text{ m}^3/\text{s}^2$

**What we want:**
1.  Time of Flight (TOF) from perigee to apogee of the GTO.
2.  Required initial phase angle ($\phi_{initial}$) for the target GEO slot at GTO injection.

---

**Step 1: Calculate the semi-major axis of the GTO.**

For an elliptical orbit, the semi-major axis is:
$$a_{GTO} = \frac{r_p + r_a}{2}$$
*This defines the size of the elliptical transfer orbit from LEO to GEO.*

$$a_{GTO} = \frac{6.578 \times 10^6 \text{ m} + 4.2164 \times 10^7 \text{ m}}{2}$$
$$a_{GTO} = \frac{4.8742 \times 10^7 \text{ m}}{2}$$
$$a_{GTO} = 2.4371 \times 10^7 \text{ m}$$

**Step 2: Calculate the Time of Flight (TOF) from perigee to apogee.**

This is half the period of the GTO, similar to a Hohmann transfer (which GTO is a form of).
$$TOF = \pi \sqrt{\frac{a_{GTO}^3}{\mu}}$$
*This is the time it takes for the satellite to travel from its low point (perigee) to its high point (apogee) in the GTO.*

$$TOF = \pi \sqrt{\frac{(2.4371 \times 10^7 \text{ m})^3}{3.986 \times 10^{14} \text{ m}^3/\text{s}^2}}$$
$$TOF = \pi \sqrt{\frac{1.446 \times 10^{22} \text{ m}^3}{3.986 \times 10^{14} \text{ m}^3/\text{s}^2}}$$
$$TOF = \pi \sqrt{3.628 \times 10^7 \text{ s}^2}$$
$$TOF = \pi \times 6023.3 \text{ s}$$
$$TOF = 18925 \text{ s}$$
*Convert to hours:*
$$TOF = 18925 \text{ s} \times \frac{1 \text{ min}}{60 \text{ s}} \times \frac{1 \text{ hr}}{60 \text{ min}} \approx 5.257 \text{ hours}$$

**Time of Flight: $\boxed{\mathbf{18925 \text{ s} \text{ (approx. 5.26 hours)}}}$**

**Step 3: Calculate the mean motion ($n$) of the target GEO orbit.**

The GEO orbit has a radius $r_{GEO} = R_E + h_a = 4.2164 \times 10^7 \text{ m}$.
$$n_{GEO} = \sqrt{\frac{\mu}{r_{GEO}^3}}$$
*This is the angular speed of a satellite in a GEO orbit. By definition, a GEO satellite completes one revolution in one sidereal day.*

$$n_{GEO} = \sqrt{\frac{3.986 \times 10^{14} \text{ m}^3/\text{s}^2}{(4.2164 \times 10^7 \text{ m})^3}}$$
$$n_{GEO} = \sqrt{\frac{3.986 \times 10^{14} \text{ m}^3/\text{s}^2}{7.494 \times 10^{22} \text{ m}^3}}$$
$$n_{GEO} = \sqrt{5.319 \times 10^{-9} \text{ s}^{-2}}$$
$$n_{GEO} = 7.293 \times 10^{-5} \text{ rad/s}$$
*Convert to degrees per hour for intuition:*
$$n_{GEO} = 7.293 \times 10^{-5} \text{ rad/s} \times \frac{180^\circ}{\pi \text{ rad}} \times \frac{3600 \text{ s}}{1 \text{ hr}} \approx 14.99^\circ/\text{hr}$$
*(Indeed, a GEO satellite moves $360^\circ$ in approximately 24 hours, so $15^\circ/\text{hr}$ is expected.)*

**Step 4: Calculate the angular displacement of the target GEO slot during TOF.**

$$\Delta\theta_{GEO} = n_{GEO} \cdot TOF$$
*This tells us how far the desired GEO slot will move while our satellite is in GTO.*

$$\Delta\theta_{GEO} = (7.293 \times 10^{-5} \text{ rad/s}) \times (18925 \text{ s})$$
$$\Delta\theta_{GEO} = 1.380 \text{ radians}$$
*Convert to degrees:*
$$\Delta\theta_{GEO} = 1.380 \text{ rad} \times \frac{180^\circ}{\pi \text{ rad}} \approx 79.05^{\circ}$$

**Step 5: Determine the required initial phase angle ($\phi_{initial}$).**

The satellite is injected into GTO at perigee (0 degrees true anomaly) and arrives at apogee (180 degrees true anomaly) where the GEO slot is. So, $\Delta\theta_{transfer} = 180^\circ$.
The required initial phase angle (how far ahead the GEO slot needs to be at GTO injection) is:
$$\phi_{initial} = \Delta\theta_{GEO} - \Delta\theta_{transfer}$$
*The GEO slot must lead by the amount it moves during the transfer, relative to the 180 degrees our satellite travels.*

$$\phi_{initial} = 79.05^\circ - 180^\circ$$
$$\phi_{initial} = -100.95^\circ$$
*This means that at the moment of GTO injection (when the satellite is at $0^\circ$ longitude), the target GEO slot must be $100.95^\circ$ *behind* the rendezvous point in GEO. The rendezvous point is $180^\circ$ from the launch point. So the GEO slot needs to be at $180^\circ - 100.95^\circ = 79.05^\circ$ at GTO injection.*

**Required Initial Phase Angle (GEO slot relative to GTO injection point): $\boxed{\mathbf{-100.95^\circ}}$**

**Reflection:** This example demonstrates how phasing applies to transfer orbits that aren't purely Hohmann (though GTO is often a Hohmann-like transfer from LEO to GEO). The long TOF and the relatively slow angular velocity of GEO lead to a significant required lead angle for the target slot. The negative value here means the GEO slot needs to be "behind" the target rendezvous point at injection, allowing it to rotate into position during the transfer.

## 6. Common mistakes and traps

1.  **Forgetting the target moves during TOF:** The most common error. Students often calculate the target's position at launch and assume it stays there, neglecting its angular motion during the transfer.
2.  **Incorrectly calculating relative angular velocity:** When dealing with objects in different orbits or a moving launch site (Earth's rotation), it's crucial to use the correct relative angular velocity to find the closing rate or required lead angle.
3.  **Units mix-up:** Mixing degrees and radians in calculations, or kilometers and meters, without proper conversion. Mean motion $n$ is typically in radians/second, so angular displacements $\Delta\theta$ will be in radians unless explicitly converted.
4.  **Assuming instantaneous transfer:** All transfers take time. Even if the transfer orbit isn't a simple Hohmann, it still has a non-zero Time of Flight that must be accounted for.
5.  **Not accounting for multiple revolutions of the target:** If the TOF is long, the target might complete one or more full revolutions. The required phase angle might be $\phi_{initial} + k \cdot 360^\circ$ for some integer $k$. The calculation for waiting time must consider this to find the *next* available window.
6.  **Confusing launch time with arrival time:** The launch window specifies *when to launch*, not *when to arrive*. The phasing calculation ensures arrival at the correct time.
7.  **Misinterpreting positive/negative phase angles:** A positive required phase angle means the target needs to be "ahead" of the rendezvous point at launch. A negative angle means it needs to be "behind." Normalizing angles to $0-360^\circ$ (or $0-2\pi$ rad) can help avoid confusion.

## 7. Textbook-precise explanation

The concept of a "launch window for phasing with a target orbit" is a critical aspect of mission design in astrodynamics, ensuring that a spacecraft, after executing a specified transfer trajectory, achieves a desired relative position and velocity with respect to a target object or orbital slot at a predetermined point in space and time.

Consider a spacecraft (S/C) initiating a transfer from an initial orbit to a target orbit, with a known Time of Flight ($TOF$). The target object (TGT) is already in the target orbit, possessing its own orbital characteristics. For a successful rendezvous or insertion into a specific orbital slot, the S/C must arrive at the designated rendezvous point ($R_v$) in the target orbit precisely when the TGT is also at $R_v$.

Let the mean motion (average angular velocity) of the target orbit be $n_{TGT}$, given by Kepler's Third Law:
$$n_{TGT} = \sqrt{\frac{\mu}{a_{TGT}^3}}$$
where $\mu$ is the gravitational parameter of the central body and $a_{TGT}$ is the semi-major axis of the target orbit.

During the $TOF$ of the S/C's transfer, the TGT will traverse an angular distance $\Delta\theta_{TGT}$:
$$\Delta\theta_{TGT} = n_{TGT} \cdot TOF$$

The transfer trajectory itself, for instance, a Hohmann transfer, dictates that the S/C will travel a specific angular distance relative to the central body. For a Hohmann transfer from an initial circular orbit to a larger circular orbit, the S/C traverses $\pi$ radians ($180^\circ$) from perigee to apogee, arriving at the opposite side of the central body relative to its departure point. Let this angular travel of the spacecraft be $\Delta\theta_{transfer}$.

To achieve rendezvous, the TGT must be positioned at an initial angular offset, or "phasing angle" ($\phi_{initial}$), relative to the S/C's departure point such that its angular travel $\Delta\theta_{TGT}$ during $TOF$ brings it to the rendezvous point simultaneously with the S/C. If the S/C departs from an angular position $\theta_{S/C,depart}$ and the rendezvous point is $\theta_{R_v}$, then $\theta_{R_v} - \theta_{S/C,depart} = \Delta\theta_{transfer}$.
The required initial phase angle of the target relative to the S/C's departure point at the moment of launch is:
$$\phi_{initial} = \Delta\theta_{TGT} - \Delta\theta_{transfer}$$
This angle $\phi_{initial}$ represents the angular lead (if positive) or lag (if negative) the target must have relative to the S/C's departure position when the S/C is injected into its transfer orbit. The angle is typically normalized to be within $[0, 2\pi)$ radians or $[0, 360^\circ)$.

The launch window then opens when the target object's current angular position, $\theta_{TGT,current}$, relative to the desired S/C injection point, matches the calculated $\phi_{initial}$. If the launch site is rotating with the central body (e.g., Earth), the calculation must also account for the angular velocity of the launch site. The time until the launch window opens, $\Delta t_{wait}$, can be determined by:
$$\Delta t_{wait} = \frac{(\phi_{initial} - \phi_{current}) \pmod{2\pi}}{n_{relative}}$$
where $\phi_{current}$ is the current phase angle and $n_{relative}$ is the relative angular velocity between the target and the inertial launch point, or simply $n_{TGT}$ if the launch point is considered inertially fixed for the purpose of target phasing.

This calculation forms the basis for mission planning in numerous scenarios, including interplanetary trajectories (e.g., "pork chop plots" for Earth-Mars transfers), rendezvous and docking with space stations, and precise constellation deployment.

**References:**
*   Vallado, D. A. (2013). *Fundamentals of Astrodynamics and Applications* (4th ed.). Microcosm Press. (Chapter 6: Orbit Maneuvering, specifically Section 6.2: Rendezvous and Phasing).
*   Curtis, H. D. (2010). *Orbital Mechanics for Engineering Students* (3rd ed.). Elsevier Butterworth-Heinemann. (Chapter 6: Orbit Transfers, specifically Section 6.5: Rendezvous).

## 8. ASCII diagrams

Here's an ASCII diagram illustrating the concept of phasing for a Hohmann transfer:

```text
                                  ^
                                  |
                                  | Transfer Orbit (elliptical)
                                  |
                                  |
  Rendezvous Point (Apogee)       *---------------------> Target Orbit (circular)
      (S/C arrives here)         / \                  _ _ _ _ _ _ _ _ _ _ _ _ _ _
                                /   \                /                           \
                               /     \              /                             \
                              /       \            /                               \
                             /         \          /                                 \
                            /           \        /                                   \
                           /             \      /                                     \
                          /               \    /                                       \
                         /                 \  /                                         \
                        /                   \/                                           \
                       /                    /\                                            \
                      /                    /  \                                            \
                     /                    /    \                                           \
                    /                    /      \                                          \
                   /                    /        \                                         \
                  /                    /          \                                        \
                 /                    /            \                                       \
                /                    /              \                                      \
               /                    /                \                                     \
              /                    /                  \                                    \
             /                    /                    \                                   \
            /                    /                      \                                  \
           /                    /                        \                                 \
          /                    /                          \                                \
         /                    /                            \                               \
        /                    /                              \                               \
       /                    /                                \                               \
      /                    /                                  \                               \
     /                    /                                    \                               \
    /                    /                                      \                               \
   /                    /                                        \                               \
  |                    /                                          \                               \
  |                   /                                            \                               \
  |                  /                                              \                               \
  |                 /                                                \                               \
  |                /                                                  \                               \
  |               /                                                    \                               \
  |              /                                                      \                               \
  |             /                                                        \                               \
  |            /                                                          \                               \
  |           /                                                            \                               \
  |          /                                                              \                               \
  |         /                                                                \                               \
  |        /                                                                  \                               \
  |       /                                                                    \                               \
  |      /                                                                      \                               \
  |     /                                                                        \                               \
  |    /                                                                          \                               \
  |   /                                                                            \                               \
  |  /                                                                              \                               \
  | /                                                                                \                               \
  |/___________________________________________________________________________________\________________________________\
  O (Central Body)
   \
    \
     \
      \
       \
        \
         \
          \
           \
            \
             \
              \
               \
                \
                 \
                  \
                   \
                    \
                     \
                      \
                       \
                        \
                         \
                          \
                           \
                            \
                             \
                              \
                               \
                                \
                                 \
                               