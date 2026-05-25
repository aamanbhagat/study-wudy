## What it is
Kepler's First Law of Planetary Motion states that the orbit of a planet is an ellipse with the central massive body (like the Sun) located at one of the two foci. It is the crucial realization that bridges the abstract, ancient Greek geometry of conic sections with the physical reality of how gravity dictates motion in the universe.

## Why it matters
This is the foundational geometric principle of all orbital mechanics and rocket science. Every satellite launch, interplanetary trajectory, and orbital rendezvous relies on understanding the geometry of ellipses. By knowing that orbits are conic sections, aerospace engineers can determine a spacecraft's entire future path, energy, and angular momentum just by measuring its velocity and position at a single point in time. 

## When to study it
You should study this only after you have mastered the pure geometry of conic sections. You must already understand:
1. The Cartesian equation of an ellipse: $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$.
2. The definition of foci and the focal distance $c$, where $a^2 = b^2 + c^2$.
3. The definition of eccentricity: $e = \frac{c}{a}$.
If you do not know that the sum of the distances from any point on an ellipse to the two foci is a constant $2a$, stop and review basic ellipse geometry immediately.

## How to study it (step by step)
1. **Ground the geometry:** Draw an ellipse using the "two pins and a string" method. The pins are the foci. The string length is $2a$. This physically locks in the definition of the shape.
2. **Assign the physics:** Place a massive body (e.g., the Earth or Sun) at *one* of the foci. Leave the other focus completely empty. 
3. **Define the extremes:** Mark the point on the ellipse closest to the massive body. Call this the *periapsis* (or perihelion/perigee). Mark the farthest point. Call this the *apoapsis* (or aphelion/apogee).
4. **Derive the extreme distances:** Using the semi-major axis $a$ and focal distance $c$, prove to yourself geometrically that the periapsis distance is $r_p = a - c$ and the apoapsis distance is $r_a = a + c$.
5. **Introduce eccentricity:** Substitute $c = ae$ into your extreme distance formulas to get $r_p = a(1-e)$ and $r_a = a(1+e)$. Observe how the orbit changes as $e \to 0$ (circle) and $e \to 1$ (parabola).

## Key ideas, with intuition

**1. The Focus is the Center of Force**
In pure math, we often center an ellipse at the origin $(0,0)$. In physics, the geometric center is empty space. Gravity is a central force pulling toward a mass, so the mass *must* sit at a focus. The entire coordinate system for orbital mechanics is shifted so the origin is at the focus.

**2. Eccentricity dictates the orbit's "squish" and energy**
Eccentricity $e = \frac{c}{a}$ measures how far the focus is off-center. 
* If $e = 0$, $c = 0$. The foci merge at the center. The orbit is a circle.
* If $0 < e < 1$, the orbit is an ellipse (closed, repeating orbit).
* If $e \ge 1$, the shape opens up into a parabola or hyperbola (escape trajectory). 

**3. Polar coordinates are the natural language of orbits**
Because gravity pulls radially toward the focus, Cartesian coordinates $(x,y)$ are clumsy. We use polar coordinates $(r, \theta)$ with the origin at the massive body. The polar equation of an ellipse measured from one focus is:
$$r(\theta) = \frac{a(1-e^2)}{1 + e \cos \theta}$$
Notice that when $\theta = 0$, $\cos \theta = 1$, and $r = a(1-e)$, which is exactly the periapsis.

## Worked example
**Problem:** A satellite is in an elliptical Earth orbit. Its closest approach to Earth's center (perigee) is $r_p = 7,000$ km, and its farthest point (apogee) is $r_a = 10,000$ km. Find the semi-major axis $a$, the focal distance $c$, and the eccentricity $e$.

**Step 1: Relate the extremes to $a$ and $c$.**
From the geometry of the ellipse, the major axis spans the entire length of the orbit. Therefore, the sum of the closest and farthest distances equals the total major axis:
$$2a = r_p + r_a$$

**Step 2: Solve for $a$.**
$$2a = 7,000 + 10,000 = 17,000 \text{ km}$$
$$a = 8,500 \text{ km}$$

**Step 3: Solve for $c$.**
The distance between the two extremes is $2a$, but the distance from the center of the ellipse to the focus is $c$. Geometrically, $r_a - r_p$ gives the distance between the two foci ($2c$):
$$2c = r_a - r_p$$
$$2c = 10,000 - 7,000 = 3,000 \text{ km}$$
$$c = 1,500 \text{ km}$$

**Step 4: Calculate eccentricity $e$.**
$$e = \frac{c}{a} = \frac{1,500}{8,500} = \frac{3}{17} \approx 0.176$$

*Reflection:* This works because the geometry of the ellipse perfectly constrains the distances. By simply knowing how close and how far the satellite gets, we completely define the size ($a$) and shape ($e$) of the orbit.

## Diagrams

```text
                           y
                           ^
                     ____--|--____
                  .-'      |      '-.
                /'         |         '\
               |           |           |
 Apoapsis <----x-----------+-----------O----> Periapsis
   (r_a)       |         Center      Focus      (r_p)
                \.       (0,0)       (Sun)   ./
                  '-.____  |  ____.-'
                         --|--
                           |
                           v
|------------------------ 2a -------------------------|
|------------ a -----------|----------- a ------------|
                           |---- c ----|-- r_p --|
|---------- r_a -----------|
```

## Memory technique — remember this forever
1. **The Hook:** "Peri is Petite, Apo is Apart." *Peri*apsis is the small distance, *Apo*apsis is the far apart distance. 
2. **The Formulas to Overlearn:**
   * $r_p = a(1-e)$
   * $r_a = a(1+e)$
3. **Spaced-repetition schedule:** Review these derivations in 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget the formulas, draw the major axis. Mark the center, mark the focus at distance $c$ from the center. The short side is clearly $a - c$. The long side is clearly $a + c$. Substitute $c = ae$ to recover the formulas.

## Common mistakes
1. **Putting the central mass at the geometric center.** The Sun is *never* at $(0,0)$ of the ellipse's Cartesian grid. It is always at $(\pm c, 0)$.
2. **Confusing altitude with orbital radius.** Orbital equations require $r$, the distance from the *center* of the massive body. Problems often give you *altitude* above the surface. You must add the radius of the planet ($r = r_{\text{planet}} + \text{altitude}$) before doing any math.
3. **Assuming $e=0$ means there is no orbit.** An eccentricity of $0$ simply means the focal distance $c=0$. The orbit is a perfect circle.

## Self-check
1. A spacecraft is in an orbit with a semi-major axis of $12,000$ km and an eccentricity of $0.25$. What is its periapsis distance?
2. Prove algebraically that the semi-minor axis $b$ of an orbit can be expressed purely in terms of its extreme distances as $b = \sqrt{r_p r_a}$.
3. A comet swings around the Sun and has an eccentricity of $e = 1.05$. Based on the equation $r_p = a(1-e)$, $a$ must be negative for $r_p$ to be a positive distance. What geometric shape does this represent, and will the comet ever return?