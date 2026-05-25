## What it is
Kepler's second law states that the line segment joining a planet and the Sun sweeps out equal areas during equal intervals of time. This means a planet moves fastest when it is closest to the Sun (perihelion) and slowest when it is farthest away (aphelion). This law is a direct consequence of the conservation of angular momentum.

## Why it matters
This principle governs the speed of any object in a central force field, from comets to artificial satellites. In aerospace engineering, it's fundamental for mission design: calculating transfer orbit timings, planning flyby maneuvers, and understanding how a satellite's velocity changes throughout its orbit without any thrust. It is the reason a satellite naturally speeds up as it approaches its perigee.

## When to study it
You must be comfortable with the following before proceeding:
*   **Vector calculus:** Specifically, the vector cross product ($\vec{a} \times \vec{b}$) and the time derivative of a vector.
*   **Classical mechanics:** Newton's Law of Universal Gravitation, the definitions of torque ($\vec{\tau} = \vec{r} \times \vec{F}$), and angular momentum ($\vec{L} = \vec{r} \times \vec{p} = \vec{r} \times m\vec{v}$).
*   **The relationship between torque and angular momentum:** $\vec{\tau} = \frac{d\vec{L}}{dt}$.

If any of these are weak, pause and review them. The derivation that follows depends entirely on them.

## How to study it (step by step)
1.  **Start with the force.** Write down Newton's Law of Universal Gravitation for a satellite of mass $m$ orbiting a primary body of mass $M$. Express it in vector form, showing the force $\vec{F}_g$ is directed along the position vector $\vec{r}$.
2.  **Calculate the torque.** Use the definition $\vec{\tau} = \vec{r} \times \vec{F}_g$. Because gravity is a central force, $\vec{F}_g$ is always anti-parallel to $\vec{r}$. What is the cross product of two parallel (or anti-parallel) vectors?
3.  **Invoke the conservation law.** Since $\vec{\tau} = \frac{d\vec{L}}{dt}$, what does zero torque imply about the angular momentum vector $\vec{L}$? State this conclusion clearly. This is the physical core of the law.
4.  **Connect momentum to area.** Consider the small area $dA$ swept out by the position vector $\vec{r}$ in a small time $dt$. The satellite moves by $d\vec{r} = \vec{v}dt$. Approximate this area as a triangle with sides $\vec{r}$ and $d\vec{r}$.
5.  **Derive the areal velocity.** The area of a triangle formed by two vectors is $\frac{1}{2}|\vec{a} \times \vec{b}|$. Use this to write $dA$ in terms of $\vec{r}$ and $d\vec{r}$. Substitute $d\vec{r} = \vec{v}dt$ and find the rate of change of area, $\frac{dA}{dt}$, known as the areal velocity.
6.  **Combine results.** You now have an expression for $\frac{dA}{dt}$ in terms of $\vec{r}$ and $\vec{v}$. Relate this to the magnitude of the angular momentum, $L = |\vec{L}| = |\vec{r} \times m\vec{v}|$.
7.  **State the final law.** Using the fact that $\vec{L}$ is constant (from step 3), show that the areal velocity $\frac{dA}{dt}$ must also be constant. This is Kepler's second law.

## Key ideas, with intuition
1.  **Gravity is a "Central Force".** The force of gravity from the Sun on a planet always points directly towards the center of the Sun. There is no sideways or tangential force component to "spin up" or "spin down" the planet in its orbit.
    $$ \vec{F}_g = - \frac{GMm}{r^2} \hat{r} $$
    The force vector $\vec{F}_g$ is always parallel to the position unit vector $\hat{r}$.

2.  **Central Forces Produce Zero Torque.** Torque, $\vec{\tau}$, is the rotational equivalent of force. It measures how much a force "twists" an object around a pivot. Since gravity always pulls straight through the pivot point (the Sun), it cannot cause any twisting.
    $$ \vec{\tau} = \vec{r} \times \vec{F}_g = \vec{r} \times \left( - \frac{GMm}{r^2} \hat{r} \right) = 0 $$
    This is because $\vec{r}$ is parallel to $\hat{r}$, and the cross product of parallel vectors is zero.

3.  **Zero Torque means Constant Angular Momentum.** The fundamental law of rotational dynamics is $\vec{\tau} = \frac{d\vec{L}}{dt}$. If the torque is zero, then the rate of change of angular momentum is zero.
    $$ \frac{d\vec{L}}{dt} = 0 \implies \vec{L} = \text{constant vector} $$
    This is the core physical principle. The planet's angular momentum vector $\vec{L} = \vec{r} \times m\vec{v}$ never changes throughout its orbit.

4.  **Areal Velocity is Proportional to Angular Momentum.** In a tiny time $dt$, the planet moves by $d\vec{r} = \vec{v}dt$. The area swept out is the area of the small triangle formed by vectors $\vec{r}$ and $d\vec{r}$.
    $$ dA = \frac{1}{2} |\vec{r} \times d\vec{r}| = \frac{1}{2} |\vec{r} \times (\vec{v}dt)| = \frac{1}{2} |\vec{r} \times \vec{v}| dt $$
    The rate at which area is swept, or "areal velocity," is therefore:
    $$ \frac{dA}{dt} = \frac{1}{2} |\vec{r} \times \vec{v}| $$
    Since we know $\vec{L} = m(\vec{r} \times \vec{v})$, we can write $|\vec{L}| = L = m|\vec{r} \times \vec{v}|$. Substituting this in gives the crucial link:
    $$ \frac{dA}{dt} = \frac{L}{2m} $$
    Since $L$ and $m$ are constant, the areal velocity is constant. This is Kepler's second law.

## Worked example
**Problem:** The Juno spacecraft reached a perijove (closest approach to Jupiter) of 4,200 km above Jupiter's cloud tops. Its speed at that point was 58 km/s. Jupiter's radius is 69,911 km. At apojove (farthest point), its altitude was 8.1 million km. What was its speed at apojove?

**Solution:**
1.  **Identify the governing principle.** The only significant force on Juno is Jupiter's gravity, which is a central force. Therefore, Juno's angular momentum is conserved.
    $$ L_{\text{perijove}} = L_{\text{apojove}} $$

2.  **Express angular momentum at the apsides.** At the closest (perijove) and farthest (apojove) points of an orbit, the velocity vector $\vec{v}$ is exactly perpendicular to the position vector $\vec{r}$. Therefore, the magnitude of the cross product $|\vec{r} \times \vec{v}|$ simplifies from $rv\sin\theta$ to just $rv$ (since $\sin(90^\circ)=1$).
    $$ L = |\vec{r} \times m\vec{v}| = mrv $$

3.  **Set up the conservation equation.** Let $p$ denote perijove and $a$ denote apojove.
    $$ m r_p v_p = m r_a v_a $$
    The mass $m$ of the spacecraft cancels out.
    $$ r_p v_p = r_a v_a $$

4.  **Calculate the radii.** The distances given are altitudes. We need the radii from the center of Jupiter.
    *   $r_p = R_{\text{Jupiter}} + h_p = 69,911 \text{ km} + 4,200 \text{ km} = 74,111 \text{ km}$
    *   $r_a = R_{\text{Jupiter}} + h_a = 69,911 \text{ km} + 8,100,000 \text{ km} = 8,169,911 \text{ km}$

5.  **Solve for the unknown speed, $v_a$.**
    $$ v_a = v_p \frac{r_p}{r_a} $$
    $$ v_a = (58 \text{ km/s}) \frac{74,111 \text{ km}}{8,169,911 \text{ km}} $$
    $$ v_a \approx 58 \times 0.0090712 \text{ km/s} $$
    $$ v_a \approx 0.526 \text{ km/s} $$

**Reflection:**
*   Step 1 worked because we correctly identified the problem as an application of a conservation law.
*   Step 2 worked because we recognized the special geometry of the apsides, which simplifies the math significantly.
*   Step 3 correctly cancelled the spacecraft's mass, showing the result is independent of how heavy the satellite is.
*   Step 4 avoided the common mistake of using altitude instead of radius.
*   The final result makes physical sense: the spacecraft is moving much, much slower at its farthest point, as predicted by Kepler's second law.

## Diagrams
An elliptical orbit showing two equal areas swept in equal time intervals.

```text
                  Aphelion (slow)
                      *
                    / | \
                   /  |  \
                  /   |   \ A_2
                 /    .____\
                /   Sun(F)  \
               /             \
              /               \
             |                 |
             \._               /
              \ `-.___________/
               \ A_1 /
                `---`
                  *
           Perihelion (fast)

If time to sweep A_1 equals time to sweep A_2,
then Area(A_1) = Area(A_2).
```

The infinitesimal area element $dA$.

```text
              ^ y
              |
              |
              |     r(t+dt)
              |    /
              |  ,/
              | /<---- dr = v*dt
              |/
              *-----------> r(t)
             /|
            / | dA
           /  |
      Sun *---+----------------> x

The area of the shaded triangle, dA, is
dA = 1/2 * |r x dr|
```

## Memory technique — remember this forever
1.  **Mnemonic:** The "Anxious Gardener" rule. Imagine a gardener tethered to a post in the middle of a large elliptical lawn. He has to water the entire lawn by sweeping his hose. To water equal areas in equal times, he must run very fast when the hose is short (near the post) and walk very slowly when the hose is long (at the far edge of the lawn). The hose is the radius vector, his path is the orbit.

2.  **Formulas to Overlearn:**
    *   $\vec{\tau} = \frac{d\vec{L}}{dt}$ (The cause-and-effect of rotational motion)
    *   $\vec{L} = \vec{r} \times m\vec{v}$ (The quantity being conserved)
    *   $\frac{dA}{dt} = \frac{L}{2m}$ (The direct link between mechanics and Kepler's law)

3.  **Spaced Repetition Schedule:** Review this material and re-derive the main result from scratch at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Set calendar reminders.

4.  **First Principles Pathway:** If you forget everything, rebuild it.
    *   Force: Gravity is central ($\vec{F} \propto -\hat{r}$).
    *   Torque: $\vec{\tau} = \vec{r} \times \vec{F}$. Parallel vectors have zero cross product, so $\vec{\tau}=0$.
    *   Conservation: $\vec{\tau} = d\vec{L}/dt = 0$, so $\vec{L}$ is constant.
    *   Area: Area of a small swept triangle is $dA = \frac{1}{2}|\vec{r} \times d\vec{r}| = \frac{1}{2}|\vec{r} \times \vec{v}dt|$.
    *   Link: Areal velocity $\frac{dA}{dt} = \frac{1}{2}|\vec{r} \times \vec{v}| = \frac{|\vec{L}|}{2m}$. Since $L$ and $m$ are constant, so is $\frac{dA}{dt}$.

## Common mistakes
*   **Using altitude instead of radius.** Always add the radius of the central body ($R_{\text{Earth}}$, $R_{\text{Sun}}$, etc.) to the altitude to get the orbital radius $r$.
*   **Assuming $L=mrv$ is always true.** This simplification is only valid at periapsis and apoapsis, where the velocity is perfectly perpendicular to the position vector. For any other point in the orbit, you must use the full cross product magnitude: $L = mrv\sin\theta$, where $\theta$ is the angle between $\vec{r}$ and $\vec{v}$.
*   **Forgetting the factor of $1/2$ in the area formula.** The area of the triangle is $dA = \frac{1}{2}|\vec{r} \times d\vec{r}|$, not $|\vec{r} \times d\vec{r}|$. This leads to the factor of $2m$ in the denominator of $\frac{dA}{dt} = \frac{L}{2m}$.

## Self-check
1.  A comet has a speed of 55 km/s at its perihelion distance of $0.6$ AU from the Sun. Its aphelion is at $30$ AU. What is its speed at aphelion?
2.  The specific angular momentum of a satellite is defined as $h = L/m$. If a satellite in an elliptical Earth orbit has a specific angular momentum of $h = 50,000 \text{ km}^2/\text{s}$, what is its areal velocity? Does this velocity change?
3.  A satellite is in an orbit where its perigee radius is $r_p$ and its apogee radius is $r_a$. Prove that the ratio of its speed at perigee to its speed at apogee is the inverse of the ratio of the radii: $\frac{v_p}{v_a} = \frac{r_a}{r_p}$. Then, using this result and the conservation of energy, derive expressions for $v_p$ and $v_a$ purely in terms of $G$, $M$, $r_p$, and $r_a$.