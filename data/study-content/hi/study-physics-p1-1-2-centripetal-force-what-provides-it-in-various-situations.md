## 1. The one-sentence answer
**Centripetal force is not a separate force; it is the net radial component of real forces (gravity, tension, friction, normal force) that points toward the center and equals \( m v^2 / r \) or \( m \omega^2 r \).**

Newton’s second law still applies exactly: \(\sum \vec{F} = m \vec{a}\). When an object moves in a circle at constant speed, its acceleration is purely radial and equals \( v^2 / r \) toward the center. Therefore whatever real forces are already present must add up to produce exactly that inward acceleration; no extra “centripetal” label is required.

The phrase “what provides it” simply means: identify which of the known forces (tension in a string, gravitational attraction, static friction on a road, component of normal force on a banked track) supplies the required inward magnitude and direction.

> [!NOTE]
> The single most important realization is that centripetal force is an effect, not a cause; once you stop hunting for a mysterious new force and instead ask “which already-known force points inward and how large is it?”, every circular-motion problem reduces to an ordinary Newton’s-law problem.

## 2. Why this matters — concrete and current
SpaceX Starlink satellites maintain low-Earth orbits because Earth’s gravity supplies the entire centripetal force; engineers calculate the exact altitude where gravitational acceleration \( GM/r^2 \) equals the required \( v^2/r \) for the chosen orbital speed.  

ISRO’s Chandrayaan-3 lander used the same principle during its powered descent: the throttleable engines and lunar gravity together produced the precise radial acceleration needed to keep the trajectory curved toward the surface at the correct rate.  

In Formula-1 cars, tire–road static friction is the sole source of centripetal force while cornering at 5 g; Michelin and Pirelli publish friction-coefficient maps that teams feed directly into vehicle-dynamics models.  

Inside a particle accelerator such as the LHC, superconducting dipole magnets create the Lorentz force \( q v B \) that continuously supplies the centripetal acceleration for protons traveling at 0.999999991 c; the ring radius (8.4 km) is chosen so that the available magnetic field exactly matches \( mv^2/r \).

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Newton’s second law      | \(\sum F = ma\) is the only equation that ever gives the centripetal requirement |
| Vector decomposition     | You must separate radial and tangential components        |
| Kinematic relation \(a_r = v^2/r\) | This is the acceleration that real forces must produce |
| Free-body diagrams       | Every centripetal-force problem begins with a correct FBD |

If any row above is shaky, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Circular motion still obeys \(\sum \vec{F} = m\vec{a}\)
Newton’s second law never switches off. When speed is constant the tangential acceleration is zero, so the net force must also be zero in the tangential direction; only the radial direction carries a non-zero net force.

Example: a puck on an ice table tied to a string moves in a circle. The only horizontal force is tension; therefore tension alone equals \( m v^2 / r \).

Formal statement:  
\[ \sum F_r = m \frac{v^2}{r} \]  
where the subscript \( r \) means the component toward the center.

> [!WARNING]
> If you forget that the net force is still \( m a \) and start adding an extra “centripetal force” arrow, the free-body diagram immediately violates Newton’s third law.

### Step 2 — Direction is strictly toward the center
The kinematic acceleration vector for uniform circular motion is  
\[ \vec{a} = -\frac{v^2}{r} \hat{r} \]  
(negative sign shows inward). Hence every force that contributes must have a resultant in the \( -\hat{r} \) direction.

### Step 3 — Identify the real physical agent
List every force that can act: gravity, contact forces, electromagnetic forces. Decide which of them has a radial component and set its magnitude equal to \( m v^2 / r \).

### Step 4 — Write the radial equation
After drawing the free-body diagram, resolve all forces along the radial line and equate the inward sum to \( m v^2 / r \). No other equation is required for the radial direction when speed is constant.

### Step 5 — Solve for the unknown
Usually the unknown is either speed, radius, or the magnitude of one of the forces (tension, friction coefficient, bank angle, etc.). The algebra is ordinary; only the interpretation is new.

### Step 6 — Check limiting cases
Ask what happens if \( v \to 0 \), if \( r \to \infty \), or if the supplying force is removed. The object must fly off tangentially—the classic “string cut” demonstration.

## 5. Worked examples — har step show karo

**Example 1 — Stone on a string**  
*Given:* A 0.2 kg stone is swung in a horizontal circle of radius 0.8 m at 3 rev/s.  
*Find:* Tension in the string.  

The only radial force is tension \( T \).  
\[ T = m \frac{v^2}{r} \]  
First convert revolutions to linear speed:  
\[ v = 2\pi r f = 2\pi(0.8)(3) = 15.08\,\text{m/s} \]  
*Why:* frequency gives revolutions per second; circumference gives distance per revolution.  
\[ T = (0.2)\frac{(15.08)^2}{0.8} = 56.85\,\text{N} \]  
**56.85 N**  
*Reflection:* The problem is trivial once you accept that tension alone supplies the entire inward force.

**Example 2 — Car on a flat curve**  
*Given:* 1500 kg car travels at 20 m/s on a curve of radius 100 m; \(\mu_s = 0.7\).  
*Find:* Does the car skid?  

Maximum friction:  
\[ f_{\max} = \mu_s mg = 0.7 \times 1500 \times 9.8 = 10290\,\text{N} \]  
Required centripetal force:  
\[ F_c = \frac{m v^2}{r} = \frac{1500 \times 400}{100} = 6000\,\text{N} \]  
*Why:* 6000 N < 10290 N, so friction is sufficient.  
**No skidding**  
*Reflection:* Friction is the only horizontal force; it must point exactly toward the center.

**Example 3 — Banked curve with no friction**  
*Given:* Design a banked curve of radius 200 m for 25 m/s with zero friction.  
*Find:* Banking angle \(\theta\).  

Normal force \( N \) has component \( N \sin\theta \) inward.  
\[ N \sin\theta = m \frac{v^2}{r},\qquad N \cos\theta = mg \]  
Divide:  
\[ \tan\theta = \frac{v^2}{rg} = \frac{625}{200\times9.8} = 0.319 \]  
\[ \theta = 17.8^\circ \]  
**17.8°**  
*Reflection:* The normal force itself is tilted so its horizontal component supplies the centripetal requirement.

**Example 4 — Vertical circle at the top**  
*Given:* 0.5 kg mass on a string of length 1.2 m moves at 6 m/s at the highest point.  
*Find:* Tension.  

Both gravity and tension point inward:  
\[ T + mg = m \frac{v^2}{r} \]  
\[ T = 0.5\left(\frac{36}{1.2} - 9.8\right) = 10.1\,\text{N} \]  
**10.1 N**  
*Reflection:* At the top the two real forces add; if \( v \) were smaller, \( T \) could become zero and the mass would leave the circle.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Drawing an extra “centripetal force” arrow | Students treat it as a new interaction      | Never include it on any free-body diagram    |
| Using \( m v^2 / r \) as a force on the left side | Confusing the effect with the cause         | Always write real forces on left, \( m v^2 / r \) on right |
| Forgetting that friction or normal force can point inward | Habit of thinking friction only opposes motion | Resolve every contact force into radial and tangential parts |
| Applying the same equation at top and bottom of vertical circle | Missing that gravity changes direction relative to radius | Redraw FBD at each critical point            |
| Assuming the object must stay in circle even when tension goes negative | Not checking limiting cases                 | Always verify \( T \ge 0 \) or \( N \ge 0 \) |
| Using \( g \) instead of local gravity on other planets | Over-generalizing Earth-only numbers        | Keep \( g \) symbolic until numerical substitution |

## 7. The textbook-precise statement
In inertial frames, an object moving in uniform circular motion of radius \( r \) with speed \( v \) experiences a radial acceleration of magnitude \( v^2/r \) directed toward the center. By Newton’s second law the net force toward the center must therefore satisfy
\[ \sum F_r = m\frac{v^2}{r}. \]
All forces appearing in the sum are real interactions (gravitational, electromagnetic, or contact). No additional “centripetal force” is postulated. (Taylor, *Classical Mechanics*, 1e, §3.3; Kleppner & Kolenkow, *An Introduction to Mechanics*, 2e, §4.4.)

## 8. Visual — diagram or schematic
```
          center
            •
           /|\
          / | \
   T <-- /  |  \ --> T   (string tension inward)
        /   |   \
       /    r    \
      •-----------•  mass m, speed v
           circle
```
The single radial arrow from mass to center is labelled “net real force = \( m v^2 / r \)”.

## 9. The memory technique
1. **The hook** — Imagine a dog on a leash running around a pole; the leash tension is the only thing “pulling it inward”—no magic extra force appears.
2. **What to overlearn** — The equation \( \sum F_r = m v^2 / r \) and the fact that the left side contains only ordinary forces.
3. **Spaced-repetition schedule** — Review the four worked examples after 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — Start from \(\vec{a} = d^2\vec{r}/dt^2\) in polar coordinates; the radial term immediately gives \( -r\dot\theta^2 = -v^2/r \); equate to \(\sum F_r / m\).

## 10. What this unlocks
Once you can identify the real source of centripetal force you are ready for:
- Non-uniform circular motion (tangential acceleration appears)
- Conical pendulum and banked curves with friction
- Gravitational orbits and effective potential
- Charged-particle motion in magnetic fields (Lorentz force supplies the centripetal requirement)

## 11. Self-check — five questions, no answers
1. A puck on frictionless ice is tied to a string and moves in a circle. You suddenly shorten the string by pulling it through a hole. What happens to the puck’s speed?
2. Why does a car skid outward on an icy flat curve even though “centripetal force” is required?
3. Draw the free-body diagram for a motorcycle at the exact top of a vertical loop-the-loop; label every force that contributes to the centripetal requirement.
4. A satellite in circular orbit suddenly loses 10 % of its speed. Will it fall straight down? Explain using only Newton’s laws.
5. In Example 4 above, what is the minimum speed at the top so that the string never goes slack?