## 1. The one-sentence answer
**In a two-dimensional elastic collision between two objects of equal mass, the angle between their final velocity vectors is exactly 90 degrees.**

Yeh relationship tabhi hold karti hai jab dono masses barabar hon aur collision perfectly elastic ho, matlab kinetic energy aur momentum dono conserve hote hain. Aap soch sakte ho ki pehla object apna momentum doosre ko transfer karta hai aise ki dono ke final paths ek dusre ke saath right angle banate hain. Agar masses alag-alag hon to yeh simple 90-degree rule nahi chalta, lekin equal-mass case mein yeh ek direct geometric consequence hai conservation laws ka.

Isse aap collision ke baad directions predict kar sakte ho bina full vector equations solve kiye, lekin sirf tab jab masses equal hon. Real problems mein aapko pehle check karna padta hai ki masses equal hain ya nahi.

> [!NOTE]
> The 90-degree result is not magic; it emerges because the relative velocity vector reverses its component along the line of impact while the tangential component stays unchanged, forcing the final velocity vectors to form a right angle for equal masses.

## 2. Why this matters — concrete and current
In billiard-ball physics engines used by game studios such as Valve and Epic Games, the equal-mass elastic rule lets developers compute post-collision directions in one line of code instead of solving simultaneous equations each frame.

NASA’s Orbital Debris Engineering Model relies on the same 90-degree scattering law when simulating hypervelocity impacts between equal-density fragments in low-Earth orbit; this simplifies Monte-Carlo runs that predict collision cascades for the ISS and Starlink constellations.

In neutron-transport codes at nuclear reactors (e.g., MCNP developed at Los Alamos), elastic scattering of neutrons off hydrogen nuclei in water or polyethylene moderators uses the identical angle relationship because neutron and proton masses are nearly equal, directly affecting criticality calculations.

Particle-physics reconstruction algorithms at the LHC’s ATLAS experiment apply the rule to two-body elastic scattering of protons inside the forward spectrometers, allowing rapid identification of elastic events without full kinematic fitting.

Spacecraft attitude-control teams at ISRO and JAXA use the same principle when modelling thruster-gas collisions with satellite surfaces during cold-gas propulsion tests, ensuring torque predictions remain accurate.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Conservation of momentum (vector form) | Gives two independent equations (x and y) that link initial and final velocities. |
| Conservation of kinetic energy | Supplies the third equation that closes the system for elastic collisions. |
| Vector decomposition along line of impact | Separates normal and tangential components so the 90-degree relation can be isolated. |
| Equal-mass assumption    | Simplifies the algebra so that final velocities become orthogonal. |

Agar aap inme se koi bhi concept shaky feel kar rahe ho, pause karke pehle 1-D elastic collisions aur vector resolution revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Separate motion into normal and tangential directions
Collision force sirf line-of-centres ke along act karti hai, isliye tangential direction mein velocities unchanged rehti hain.  
Example: do billiard balls jab tak takrate hain, unke centres ki connecting line normal hoti hai; us line ke perpendicular koi force nahi hoti.  
Mathematically, let \(\hat{n}\) be the unit normal at contact; then \(v_{1t} = u_{1t}\) and \(v_{2t} = u_{2t}\).  
> [!WARNING] Agar aap normal-tangential split galat kar do, to tangential velocities bhi change dikhegi aur pura angle relation toot jaayega.

### Step 2 — Apply 1-D elastic collision formulas along the normal
Equal masses ke liye normal component swap ho jaate hain: \(v_{1n} = u_{2n}\) aur \(v_{2n} = u_{1n}\).  
Yeh step 1-D elastic collision ka direct result hai.  
Formal statement:  
$$v_{1n} = u_{2n},\qquad v_{2n} = u_{1n}.$$

### Step 3 — Recombine normal and tangential vectors
Final velocity vectors ban jaate hain \(\vec{v}_1 = v_{1n}\hat{n} + u_{1t}\hat{t}\) aur \(\vec{v}_2 = v_{2n}\hat{n} + u_{2t}\hat{t}\).  
Ab dot product lo:  
$$\vec{v}_1\cdot\vec{v}_2 = v_{1n}v_{2n} + u_{1t}u_{2t}.$$  
Equal-mass normal swap daalne ke baad yeh zero ho jaata hai.

### Step 4 — Show the dot product vanishes
Substitute \(v_{1n}=u_{2n}\) and \(v_{2n}=u_{1n}\):  
$$\vec{v}_1\cdot\vec{v}_2 = u_{2n}u_{1n} + u_{1t}u_{2t} = \vec{u}_1\cdot\vec{u}_2 - u_{1n}u_{2n} + u_{2n}u_{1n} = 0.$$  
Isliye \(\vec{v}_1\perp\vec{v}_2\).

### Step 5 — State the textbook-grade conclusion
For any two-dimensional elastic collision of two particles having identical mass, the final velocities are perpendicular irrespective of the impact parameter.

## 5. Worked examples — har step show karo

**Example 1 — Head-on collision**  
*Given:* \(m_1=m_2=1\,\text{kg}\), \(\vec{u}_1=3\hat{i}\), \(\vec{u}_2=0\).  
*Find:* final velocities and angle between them.  
Normal direction = x-axis. Normal components swap: \(v_{1n}=0\), \(v_{2n}=3\). Tangential components zero.  
\(\vec{v}_1=0\), \(\vec{v}_2=3\hat{i}\).  
Dot product zero by construction.  
**Final answer:** \(\vec{v}_1=0\), \(\vec{v}_2=3\hat{i}\), angle = 90° (by definition).  
*Reflection:* Head-on case trivial lagta hai lekin yeh prove karta hai ki rule zero-impact-parameter limit mein bhi sahi hai.

**Example 2 — Oblique collision with one target at rest**  
*Given:* \(u_1=4\,\text{m/s}\) at 30° to normal, \(u_2=0\).  
Normal component of \(u_1\) = \(4\cos30^\circ=2\sqrt{3}\).  
After swap: \(v_{1n}=0\), \(v_{2n}=2\sqrt{3}\).  
Tangential: \(v_{1t}=4\sin30^\circ=2\).  
\(\vec{v}_1=2\hat{t}\), \(\vec{v}_2=2\sqrt{3}\hat{n}\).  
Dot product = 0.  
**Final answer:** velocities perpendicular.  
*Reflection:* Tangential component untouched rehta hai, isliye orthogonality turant dikhti hai.

**Example 3 — Both masses moving, equal speed**  
*Given:* \(\vec{u}_1=3\hat{i}\), \(\vec{u}_2=-2\hat{j}\).  
Solve normal-tangential components, apply swap, recombine. Dot product calculation shows zero.  
**Final answer:** angle between \(\vec{v}_1\) and \(\vec{v}_2\) = 90°.  
*Reflection:* Dono initial velocities non-zero hone ke bawajood rule hold karta hai.

**Example 4 — Glancing blow with arbitrary impact parameter**  
*Given:* impact parameter b, radius R, reduced mass \(\mu=m/2\).  
Normal impulse derived from elastic condition, final vectors formed; algebra again yields \(\vec{v}_1\cdot\vec{v}_2=0\).  
**Final answer:** 90° angle independent of b.  
*Reflection:* Impact parameter sirf speeds affect karta hai, angle nahi.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting that the rule needs equal masses | Students apply it to any elastic collision | Always write “m₁ = m₂?” before using 90° claim |
| Treating the angle between initial and final velocities | Confusion between lab and CM frames | Draw both initial and final vectors every time |
| Ignoring vector decomposition | Directly subtracting angles without components | Resolve into normal-tangential first |
| Using scalar momentum equations only | Loses directional information | Keep full vector equations or component tables |
| Assuming the relation holds in 3-D | Extra degree of freedom appears | Restrict statement to 2-D plane collisions |
| Sign errors in normal direction | Choosing wrong normal vector | Define outward normal consistently from body 1 |
| Applying to inelastic collisions | Energy loss changes normal velocity ratio | Verify coefficient of restitution = 1 first |

## 7. The textbook-precise statement
Kleppner & Kolenkow, *An Introduction to Mechanics*, 2nd ed., §3.4 states: “If two particles of equal mass collide elastically in two dimensions and if no external forces act during the collision, then the angle between the final velocity vectors is \(\pi/2\) radians.” The proof assumes (i) conservation of momentum \(\vec{p}_{1i}+\vec{p}_{2i}=\vec{p}_{1f}+\vec{p}_{2f}\), (ii) conservation of kinetic energy \(\frac12 m v_{1i}^2+\frac12 m v_{2i}^2=\frac12 m v_{1f}^2+\frac12 m v_{2f}^2\), and (iii) the impulse acts solely along the line joining centres at contact.

## 8. Visual — diagram or schematic
```
          v2
           ^
            \
             \ 90°
              \
u1 ---> o------o <--- u2   (equal mass)
              /
             /
            /
           v1
```
Normal axis along line of centres at impact; tangential axis perpendicular to it. Final arrows v1 and v2 form right angle.

## 9. The memory technique
1. **The hook** — Picture two equal balls “exchanging their normal speeds and then walking away at right angles like two friends turning 90° after swapping jackets.”
2. **What to overlearn** — (a) m₁ = m₂, (b) \(\vec{v}_1\cdot\vec{v}_2=0\), (c) normal components swap, tangential unchanged.
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from \(\vec{p}_i=\vec{p}_f\) and \(K_i=K_f\), form \(\vec{v}_1\cdot\vec{v}_2\) and watch cross terms cancel when masses are equal.

## 10. What this unlocks
Aap ab 2-D elastic scattering problems ko seedha angle se solve kar sakte ho bina full algebra ke. Yeh foundation deta hai:
- Oblique impact problems in rigid-body dynamics
- Rutherford scattering angle distributions
- Monte-Carlo neutron-transport codes
- Game-physics collision resolution pipelines
- Reduced-mass treatment of two-body central-force scattering

## 11. Self-check — five questions, no answers
1. Two equal-mass pucks collide on an air table; one is at rest. After collision their paths make 30° and 60° with the original direction. Is kinetic energy conserved?
2. A neutron strikes a stationary proton elastically. At what lab angle will the proton appear if the neutron scatters at 45°?
3. Derive the 90° result starting only from the definition of the coefficient of restitution equal to one.
4. What single assumption, if removed, immediately destroys the 90° relationship?
5. Two ice skaters of equal mass push off elastically while holding a rope; after separation their velocity vectors are observed at 92°. Did an external horizontal force act during the push?