## What it is
The orbit equation, $r = \frac{p}{1 + e \cos\theta}$, is the mathematical solution to the two-body problem under gravity, expressed in polar coordinates. It describes the radial distance $r$ of an orbiting body from a central body as a function of its angular position $\theta$. This single equation defines all conic sections (circles, ellipses, parabolas, and hyperbolas) based on the values of its parameters.

## Why it matters
This equation is the bedrock of astrodynamics, allowing us to predict the position of any satellite, planet, or spacecraft at any time. In aerospace engineering, it's used to design transfer orbits to other planets, plan satellite constellations, and perform orbital maneuvers. Understanding its derivation connects the fundamental laws of motion directly to the observable shapes of orbits, a cornerstone of physics.

## When to study it
You must be proficient with the following before proceeding. If you are not, master them first.
*   **Newton's Laws:** Specifically, $\vec{F} = m\vec{a}$ and the Law of Universal Gravitation, $\vec{F}_g = - \frac{GMm}{r^2}\hat{r}$.
*   **Vector Calculus:** Time derivatives of vectors, dot products, and cross products. You must be comfortable with the vector triple product identity: $\vec{A} \times (\vec{B} \times \vec{C}) = \vec{B}(\vec{A} \cdot \vec{C}) - \vec{C}(\vec{A} \cdot \vec{B})$.
*   **Polar Coordinates:** Expressing vectors and their time derivatives ($\vec{v}$ and $\vec{a}$) in polar coordinates ($r, \theta$) and their associated unit vectors ($\hat{r}, \hat{\theta}$).
*   **Conservation Laws:** Specifically, the concept of a conserved quantity (a quantity whose time derivative is zero) and the physical interpretation of conserved angular momentum.

## How to study it (step by step)
1.  **Start with the Equation of Motion.** Write Newton's Second Law for a satellite of mass $m$ orbiting a central body of mass $M$. Simplify it into the standard form $\ddot{\vec{r}} + \frac{\mu}{r^2}\hat{r} = 0$, where $\mu = GM$.
2.  **Prove Angular Momentum is Conserved.** Take the cross product of the position vector $\vec{r}$ with the equation of motion. Show that this implies $\frac{d}{dt}(\vec{r} \times \dot{\vec{r}}) = 0$. This conserved quantity is the specific angular momentum, $\vec{h} = \vec{r} \times \vec{v}$.
3.  **Introduce the Laplace-Runge-Lenz (LRL) Vector.** This is the key insight. Take the cross product of the equation of motion with $\vec{h}$. The goal is to integrate the result. You will need the identity $\frac{d}{dt}(\vec{v} \times \vec{h}) = \ddot{\vec{r}} \times \vec{h}$.
4.  **Integrate to find the LRL vector.** After cross-multiplying, you will find an expression that can be integrated with respect to time. The result is $\vec{v} \times \vec{h} = \mu \hat{r} + \vec{C}$, where $\vec{C}$ is a constant vector of integration. Define the eccentricity vector as $\vec{e} = \vec{C}/\mu$. This shows another vector quantity, $\vec{e}$, is conserved.
5.  **Use the Dot Product to get a Scalar Equation.** Take the dot product of the result from the previous step with the position vector $\vec{r}$. The equation becomes $\vec{r} \cdot (\vec{v} \times \vec{h}) = \mu \vec{r} \cdot \hat{r} + \vec{r} \cdot \vec{C}$.
6.  **Simplify and Rearrange.** Use the scalar triple product identity ($\vec{A} \cdot (\vec{B} \times \vec{C}) = (\vec{A} \times \vec{B}) \cdot \vec{C}$) on the left side. The left side becomes $h^2$. The right side becomes $\mu r + r C \cos\theta$. Solve for $r$ to arrive at the final orbit equation.

## Key ideas, with intuition
1.  **Central Force implies Constant Angular Momentum.** The gravitational force always points along the line connecting the two bodies ($\vec{F} \propto -\hat{r}$). There is no "side-ways" force, or torque, to change the angular momentum. This forces the orbit to lie in a single, fixed plane, perpendicular to the constant angular momentum vector $\vec{h}$.
    $$ \vec{\tau} = \vec{r} \times \vec{F} = \vec{r} \times (-\frac{GMm}{r^2}\hat{r}) = 0 $$
    Since torque is the rate of change of angular momentum, $\vec{L}$, we have $\frac{d\vec{L}}{dt} = 0$, so $\vec{L}$ (and specific angular momentum $\vec{h} = \vec{L}/m$) is constant.

2.  **The "Hidden" Conserved Vector.** For a perfect $1/r^2$ force law like gravity, there is another, less obvious, conserved quantity: the Laplace-Runge-Lenz (LRL) vector. This vector points from the central body to the point of closest approach (periapsis) and has a magnitude equal to the orbit's eccentricity, $e$.
    $$ \vec{e} = \frac{\vec{v} \times \vec{h}}{\mu} - \hat{r} $$
    The fact that $\vec{e}$ is constant means the orbit's orientation is fixed in space. The periapsis doesn't drift or precess. This is why orbits are perfect, closed ellipses in the ideal two-body problem.

3.  **The Dot Product Reveals the Geometry.** The final step in the derivation involves taking $\vec{r} \cdot \vec{e}$. A dot product is a projection. This step projects the position vector $\vec{r}$ onto the fixed axis defined by the LRL vector $\vec{e}$ (the axis pointing to periapsis). This projection naturally introduces the cosine of the angle between them, $\theta$, which is exactly the angle we need for our polar equation.

## Worked example
We will derive the orbit equation from first principles.

**Step 1: Equation of Motion**
Start with Newton's Second Law and Law of Gravitation. Let $m$ be the satellite mass and $M$ be the central body mass.
$$ m\ddot{\vec{r}} = -\frac{GMm}{r^2}\hat{r} $$
Divide by $m$ and define the standard gravitational parameter $\mu = GM$.
$$ \ddot{\vec{r}} = -\frac{\mu}{r^2}\hat{r} \quad \text{(Eq. 1)} $$

**Step 2: Conservation of Angular Momentum**
The specific angular momentum is $\vec{h} = \vec{r} \times \vec{v} = \vec{r} \times \dot{\vec{r}}$. Let's show it's constant.
$$ \frac{d\vec{h}}{dt} = \frac{d}{dt}(\vec{r} \times \dot{\vec{r}}) = (\dot{\vec{r}} \times \dot{\vec{r}}) + (\vec{r} \times \ddot{\vec{r}}) $$
The first term is zero since the cross product of any vector with itself is zero. Substitute Eq. 1 into the second term.
$$ \frac{d\vec{h}}{dt} = \vec{r} \times (-\frac{\mu}{r^2}\hat{r}) $$
Since $\vec{r} = r\hat{r}$, the vectors $\vec{r}$ and $\hat{r}$ are parallel. Their cross product is zero.
$$ \frac{d\vec{h}}{dt} = 0 \implies \vec{h} = \text{constant vector} $$
This confirms angular momentum is conserved.

**Step 3: Introduce the LRL Vector**
Take the cross product of the equation of motion (Eq. 1) with $\vec{h}$:
$$ \ddot{\vec{r}} \times \vec{h} = -\frac{\mu}{r^2}(\hat{r} \times \vec{h}) $$
Let's work on both sides. The left side is $\frac{d}{dt}(\dot{\vec{r}} \times \vec{h})$ because $\vec{h}$ is constant. For the right side, substitute $\vec{h} = \vec{r} \times \dot{\vec{r}} = (r\hat{r}) \times \dot{\vec{r}}$.
$$ \hat{r} \times \vec{h} = \hat{r} \times (\vec{r} \times \dot{\vec{r}}) = \hat{r} \times (r\hat{r} \times \dot{\vec{r}}) $$
Using the vector triple product identity $\vec{A} \times (\vec{B} \times \vec{C}) = \vec{B}(\vec{A} \cdot \vec{C}) - \vec{C}(\vec{A} \cdot \vec{B})$:
$$ \hat{r} \times \vec{h} = r\hat{r}(\hat{r} \cdot \dot{\vec{r}}) - \dot{\vec{r}}(\hat{r} \cdot r\hat{r}) $$
We know $\hat{r} \cdot \hat{r} = 1$ and $r = |\vec{r}|$, so $\frac{d}{dt}(r^2) = \frac{d}{dt}(\vec{r} \cdot \vec{r}) = 2\vec{r} \cdot \dot{\vec{r}} = 2r\hat{r} \cdot \dot{\vec{r}}$. Thus, $\dot{r} = \hat{r} \cdot \dot{\vec{r}}$.
$$ \hat{r} \times \vec{h} = r\hat{r}(\dot{r}) - \dot{\vec{r}}(r) = r\dot{r}\hat{r} - r\dot{\vec{r}} = -r^2 \frac{d}{dt}(\hat{r}) $$
The last step uses the identity $\dot{\vec{r}} = \frac{d}{dt}(r\hat{r}) = \dot{r}\hat{r} + r\dot{\hat{r}}$.
Substitute this back into the equation:
$$ \frac{d}{dt}(\dot{\vec{r}} \times \vec{h}) = -\frac{\mu}{r^2}(-r^2 \frac{d\hat{r}}{dt}) = \mu \frac{d\hat{r}}{dt} $$

**Step 4: Integrate**
Integrate both sides with respect to time:
$$ \int \frac{d}{dt}(\dot{\vec{r}} \times \vec{h}) dt = \int \mu \frac{d\hat{r}}{dt} dt $$
$$ \dot{\vec{r}} \times \vec{h} = \mu \hat{r} + \vec{C} $$
where $\vec{C}$ is a constant vector of integration. This $\vec{C}$ is proportional to the LRL vector.

**Step 5: Dot with $\vec{r}$**
Take the dot product of the entire equation with $\vec{r}$:
$$ \vec{r} \cdot (\dot{\vec{r}} \times \vec{h}) = \vec{r} \cdot (\mu \hat{r} + \vec{C}) $$
$$ \vec{r} \cdot (\vec{v} \times \vec{h}) = \mu(\vec{r} \cdot \hat{r}) + \vec{r} \cdot \vec{C} $$

**Step 6: Simplify and Rearrange**
Use the scalar triple product identity on the left: $\vec{r} \cdot (\vec{v} \times \vec{h}) = (\vec{r} \times \vec{v}) \cdot \vec{h} = \vec{h} \cdot \vec{h} = h^2$.
On the right, $\vec{r} \cdot \hat{r} = r$. Also, $\vec{r} \cdot \vec{C} = rC\cos\theta$, where $\theta$ is the angle between $\vec{r}$ and the constant vector $\vec{C}$. We align our coordinate system so $\vec{C}$ points along the x-axis, making $\theta$ the standard polar angle.
$$ h^2 = \mu r + rC\cos\theta $$
$$ h^2 = r(\mu + C\cos\theta) $$
Solve for $r$:
$$ r = \frac{h^2}{\mu + C\cos\theta} = \frac{h^2/\mu}{1 + (C/\mu)\cos\theta} $$
This is the orbit equation. We define the semi-latus rectum $p = h^2/\mu$ and the eccentricity $e = C/\mu$.
$$ r = \frac{p}{1 + e\cos\theta} $$

*Reflection*: Each step transformed the problem. The initial vector differential equation (Step 1) was first simplified by finding a conserved quantity, $\vec{h}$ (Step 2). A clever manipulation using a second conserved quantity, $\vec{C}$ (Steps 3-4), allowed us to move from a differential equation to an algebraic one. Finally, a geometric projection via the dot product (Step 5) converted the vector equation into the final scalar polar form (Step 6).

## Diagrams
This diagram shows the geometry of an orbit in the orbital plane. The central body is at the origin, which is one focus of the ellipse. The vector $\vec{e}$ (the LRL vector) points towards periapsis, defining the $\theta=0$ direction.

```text
              *
           *     *
        *           *
      *               *
     *        ^        *
    *         | r       *
   *          |/         *
   *----------F-----------P---> (direction of e, theta=0)
    *       / | \       *
     *     /  θ  \     *
      *             *
        *         *
           * * *

F: Focus (Central Body)
P: Periapsis (point of closest approach)
r: Radial distance from F to orbiting body
θ: True anomaly (angle from periapsis)
```

## Memory technique — remember this forever
1.  **The Story:** "To find an orbit's path, you need two constant compasses. The first compass, **h**, is **h**igh above the plane, fixing its tilt. The second, **e**, is the **e**ccentric one, pointing to the **e**ntrance (periapsis). The whole derivation is just crossing the equation of motion with **h**, integrating to find **e**, then dotting with your position **r** to see where you are relative to the entrance."
2.  **Must Overlearn:**
    *   Equation of Motion: $\ddot{\vec{r}} = -\frac{\mu}{r^2}\hat{r}$
    *   Specific Angular Momentum: $\vec{h} = \vec{r} \times \vec{v}$
    *   The Orbit Equation: $r = \frac{p}{1 + e\cos\theta}$ where $p = h^2/\mu$
3.  **Spaced Repetition Schedule:** Redo the full derivation from a blank sheet of paper at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Do not just read it. Re-derive it.
4.  **First Principles Pathway:** If you forget everything, remember this sequence:
    $\vec{F}=m\vec{a} \implies \ddot{\vec{r}} = f(r)\hat{r}$.
    $\implies \vec{r} \times \ddot{\vec{r}} = 0 \implies \vec{h} = \text{const}$.
    $\implies \ddot{\vec{r}} \times \vec{h} = ... \implies \frac{d}{dt}(\dot{\vec{r}} \times \vec{h}) = \mu \frac{d\hat{r}}{dt}$.
    Integrate $\implies \dot{\vec{r}} \times \vec{h} = \mu\hat{r} + \vec{C}$.
    Dot with $\vec{r} \implies h^2 = \mu r + rC\cos\theta$.
    Solve for $r$.

## Common mistakes
*   **Sign Errors:** The gravitational force is attractive, so $\vec{F} = -\frac{GMm}{r^2}\hat{r}$. Forgetting this minus sign will propagate through the entire derivation and yield a nonsensical result.
*   **Misusing the Vector Triple Product:** Applying the identity $\vec{A} \times (\vec{B} \times \vec{C}) = \vec{B}(\vec{A} \cdot \vec{C}) - \vec{C}(\vec{A} \cdot \vec{B})$ incorrectly is common. Write it down carefully and substitute correctly. The term $\hat{r} \times (\vec{r} \times \dot{\vec{r}})$ is a frequent point of failure.
*   **Confusing Constants:** Do not mix up $\mu=GM$, the constant vector $\vec{h}$, the constant scalar $h=|\vec{h}|$, the constant vector $\vec{C}$, and the constant scalar $C=|\vec{C}|$. Keep track of which quantities are vectors and which are scalars.
*   **Forgetting Why $\theta$ is Measured from Periapsis:** The angle $\theta$ appears from the dot product $\vec{r} \cdot \vec{C}$. This means $\theta$ is defined as the angle from the constant vector $\vec{C}$. Since $\vec{C}$ (and thus $\vec{e}$) points to periapsis, $\theta=0$ *must* be the periapsis direction.

## Self-check
1.  What physical quantity is represented by $p = h^2/\mu$, and what is its geometric meaning on the conic section?
2.  The derivation relied on the LRL vector $\vec{e}$ being constant. This is only true for a perfect $1/r^2$ force law. If the gravitational force were instead proportional to $1/r^{2.001}$ (as it is, slightly, due to general relativity), how would an elliptical orbit's properties change over time?
3.  Derive the relationship between the eccentricity $e$ and the specific mechanical energy of the orbit, $\mathcal{E} = \frac{v^2}{2} - \frac{\mu}{r}$, by evaluating the expression for $\vec{C}$ at periapsis, where $\vec{r}$ and $\vec{v}$ are perpendicular.