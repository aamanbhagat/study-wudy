## What it is
Specific angular momentum, denoted by $h$, is the angular momentum of an orbiting body per unit of its own mass. The formula $h = \sqrt{GMp}$ states that this value is constant for a given orbit and is determined by the gravitational parameter of the central body ($GM$) and the geometry of the orbit, specifically its "width" at the focus, known as the semi-latus rectum ($p$).

## Why it matters
This equation is a fundamental bridge between orbital dynamics (the forces causing motion) and orbital kinematics (the geometric shape of the path). In aerospace engineering, if you know the required shape of an orbit (e.g., the semi-latus rectum $p$ needed for a spy satellite's imaging pass), this formula directly tells you the specific angular momentum required to achieve it. This, in turn, dictates the velocity vectors needed for orbital insertion burns.

## When to study it
Before tackling this, you must have a firm grasp of the following prerequisites. If you are not comfortable with these, pause and review them first.
- **Newton's Law of Universal Gravitation:** The source of the central force.
- **Vector Calculus:** Specifically, the definition and properties of the cross product.
- **Classical Mechanics:** The definition of angular momentum $\vec{L} = \vec{r} \times \vec{p}$ and specific angular momentum $\vec{h} = \vec{r} \times \vec{v}$.
- **The Two-Body Problem:** You should understand why the gravitational force being a central force implies that specific angular momentum is a conserved quantity.
- **Conic Sections:** You must know the polar equation for a conic section, $r = \frac{p}{1 + e \cos \nu}$, and the definitions of semi-latus rectum ($p$), eccentricity ($e$), and true anomaly ($\nu$).

## How to study it (step by step)
1.  **Re-derive the constancy of $\vec{h}$:** Start with the two-body equation of motion, $\ddot{\vec{r}} = -\frac{\mu}{r^3}\vec{r}$, where $\mu = GM$. Take the cross product with $\vec{r}$: $\vec{r} \times \ddot{\vec{r}} = -\vec{r} \times \frac{\mu}{r^3}\vec{r}$. The right side is zero because $\vec{r} \times \vec{r} = 0$. Show that the left side is the time derivative of $\vec{r} \times \dot{\vec{r}}$, which is $\frac{d}{dt}(\vec{r} \times \vec{v}) = \frac{d\vec{h}}{dt}$. Thus, $\frac{d\vec{h}}{dt} = 0$, proving $\vec{h}$ is a constant vector.
2.  **Derive the Orbit Equation from dynamics:** This is a crucial derivation. Start with $\ddot{\vec{r}} + \frac{\mu}{r^3}\vec{r} = 0$. Take the cross product with $\vec{h}$: $\ddot{\vec{r}} \times \vec{h} = -\frac{\mu}{r^3}(\vec{r} \times \vec{h})$. Use the vector triple product identity $\vec{A} \times (\vec{B} \times \vec{C}) = (\vec{A} \cdot \vec{C})\vec{B} - (\vec{A} \cdot \vec{B})\vec{C}$ to simplify the right side. Integrate with respect to time to arrive at $\dot{\vec{r}} \times \vec{h} = \mu(\frac{\vec{r}}{r} + \vec{e})$, where $\vec{e}$ is a constant vector of integration (the eccentricity vector).
3.  **Find the scalar form:** Take the dot product of the result from step 2 with $\vec{r}$: $\vec{r} \cdot (\dot{\vec{r}} \times \vec{h}) = \mu(\vec{r} \cdot \frac{\vec{r}}{r} + \vec{r} \cdot \vec{e})$. Use scalar triple product properties to show the left side is $h^2$. The right side becomes $\mu(r + re\cos\nu)$.
4.  **Isolate $r$ and make the connection:** You now have $h^2 = \mu r (1 + e \cos \nu)$. Rearranging gives $r = \frac{h^2/\mu}{1 + e \cos \nu}$. This is the dynamically derived orbit equation.
5.  **Compare with geometry:** Compare the equation from step 4 with the geometric polar equation for a conic section: $r = \frac{p}{1 + e \cos \nu}$. By simple inspection of the numerators, you see that $p = \frac{h^2}{\mu}$.
6.  **Solve for $h$:** Rearrange the result from step 5: $h^2 = \mu p = GMp$. Therefore, $h = \sqrt{GMp}$.

## Key ideas, with intuition
1.  **Angular Momentum is Conserved because Gravity Pulls Straight:** The gravitational force always points from the satellite to the Earth. It has no "sideways" component to add or remove spin from the system. This means it exerts no torque, so angular momentum cannot change. $h$ is constant throughout the orbit.
2.  **$p$ is the Orbit's "Width at the Focus":** Forget other parameters for a moment. The semi-latus rectum $p$ is simply the distance from the central body to the satellite when it's at a right angle to the main axis of the orbit (true anomaly $\nu = 90^\circ$). A bigger $p$ means a wider orbit.
    $$p = a(1-e^2) \quad \text{(for an ellipse)}$$
3.  **The Formula is a "Cause and Effect" Bridge:** This is the core intuition.
    - **Cause (Dynamics):** The gravitational pull of the central body ($\mu = GM$) and the amount of angular momentum you give the satellite ($h$).
    - **Effect (Geometry):** The resulting shape, specifically the width ($p$), of the orbit.
    $$h^2 = \underbrace{GM}_{\text{Physics}} \underbrace{p}_{\text{Geometry}}$$
    To get a wider orbit ($p$) around the same planet ($GM$), you need more specific angular momentum ($h$).

## Worked example
**Problem:** A spy satellite is in a circular Low Earth Orbit (LEO) at an altitude of 400 km. Calculate its specific angular momentum. Use Earth's gravitational parameter $\mu_E \approx 398,600 \text{ km}^3/\text{s}^2$ and Earth's equatorial radius $R_E \approx 6,378 \text{ km}$.

**Solution:**
1.  **Identify parameters:**
    - Altitude $z = 400 \text{ km}$
    - Earth's radius $R_E = 6,378 \text{ km}$
    - Earth's gravitational parameter $\mu_E = 398,600 \text{ km}^3/\text{s}^2$

2.  **Determine the orbital geometry:** The orbit is circular. For a circular orbit, the eccentricity $e=0$. The semi-latus rectum $p$ is equal to the semi-major axis $a$, which is simply the constant orbital radius $r$.
    $$r = R_E + z = 6378 \text{ km} + 400 \text{ km} = 6778 \text{ km}$$
    Therefore, for this orbit, $p = r = 6778 \text{ km}$.

3.  **Apply the formula:** Use the direct relationship $h = \sqrt{\mu_E p}$.
    $$h = \sqrt{(398,600 \text{ km}^3/\text{s}^2) \cdot (6778 \text{ km})}$$

4.  **Calculate the result:**
    $$h = \sqrt{2,701,586,800 \text{ km}^4/\text{s}^2}$$
    $$h \approx 51,977 \text{ km}^2/\text{s}$$

**Reflection:**
- Step 1 ensured we had all necessary constants and understood the problem statement.
- Step 2 was the key geometric insight: simplifying the problem by recognizing that for a circular orbit, $p$ is just the radius. This avoided needing to use the more general formula $p=a(1-e^2)$.
- Step 3 and 4 were a direct application of the formula, showing how it connects the gravitational environment ($\mu_E$) and the orbital size ($p$) to the required constant of motion ($h$).

## Diagrams
Here is an elliptical orbit showing the semi-latus rectum $p$.

```text
                 /-------------------\
                /                     \
               /                       \
              |           | B           |
              |          *F-------------P --- p
      <-------A'----------C-----------A-------> Major Axis
   Periapsis  |                         |  Apoapsis
              |                         |
               \                       /
                \                     /
                 \-------------------/

  F = Focus (location of central body, e.g., Earth)
  C = Center of ellipse
  A = Apoapsis point, A' = Periapsis point
  p = Semi-latus rectum: The line segment FP, where the angle A'FP is 90 degrees.
      It measures the "width" of the orbit at the focus.
```

## Memory technique — remember this forever
1.  **The Mnemonic Story:** Imagine "Grandma's Purse". The gravitational parameter is **GM**. The shape of the orbit is the **p**urse. To keep the purse swinging in a wide arc, you need a certain amount of **h**url (specific angular momentum). The formula feels like a law of physics: "The **h**url you need is the square root of **G**rand**M**a's **p**urse."
    $$h = \sqrt{GMp}$$
2.  **Formulas to Overlearn (Do not paraphrase):**
    - $\vec{h} = \vec{r} \times \vec{v}$ (The fundamental definition)
    - $h = \sqrt{GMp}$ (The dynamics-geometry link)
    - $p = a(1-e^2)$ (The geometry link for ellipses)
3.  **Spaced Repetition Schedule:**
    - Review this entire mini-lesson and re-derive the main formula tomorrow (Day 1).
    - Solve two new problems using it (Day 3).
    - Explain the derivation to a wall or friend (Day 7).
    - Quick re-derivation from memory (Day 16).
    - Final check, solve a hard problem (Day 35).
4.  **First Principles Pathway (if you forget):**
    - Start with the equation of motion: $\ddot{\vec{r}} + \frac{\mu}{r^3}\vec{r} = 0$.
    - Remember that its solution (the Orbit Equation) relates radius $r$ to the constants $h$ and $e$: $r = \frac{h^2/\mu}{1 + e \cos \nu}$.
    - Remember the geometric definition of a conic section: $r = \frac{p}{1 + e \cos \nu}$.
    - Compare the numerators: $p = h^2/\mu$.
    - Solve for $h$. This path is foolproof.

## Common mistakes
1.  **Using Satellite Mass:** The mass $M$ in $GM$ is *always* the mass of the large, central body (e.g., Earth, Sun). The satellite's mass $m$ has been divided out to get *specific* angular momentum.
2.  **Confusing $p$ and $a$:** Do not assume the semi-latus rectum $p$ is the same as the semi-major axis $a$. They are only equal for a perfect circle ($e=0$). For all other ellipses, $p < a$.
3.  **Unit Inconsistency:** Astrodynamics calculations often use kilometers (km) instead of meters (m). The standard value for Earth's $\mu$ is in $\text{km}^3/\text{s}^2$. If you use it, ensure your radius/distance parameters like $p$ are also in km, not meters. Mixing them will lead to large errors.

## Self-check
1.  A comet follows a parabolic ($e=1$) trajectory around the Sun. Its perihelion distance (closest approach) is $0.5$ AU. Calculate its specific angular momentum. (You will need to look up the Sun's gravitational parameter $\mu_{Sun}$ and the definition of an Astronomical Unit, AU).
2.  Two spacecraft are in orbit around Mars. Spacecraft A is in a circular orbit with radius $R$. Spacecraft B is in an elliptical orbit with periapsis distance $r_p = 0.5R$ and apoapsis distance $r_a = 1.5R$. Which spacecraft has the greater specific angular momentum? Prove it mathematically.
3.  The specific mechanical energy of an orbit is given by $\mathcal{E} = -\frac{\mu}{2a}$. Using this fact and the formulas $h = \sqrt{\mu p}$ and $p = a(1-e^2)$, derive an expression for the speed of a satellite at periapsis ($v_p$) solely in terms of $\mu$, $a$, and $e$.