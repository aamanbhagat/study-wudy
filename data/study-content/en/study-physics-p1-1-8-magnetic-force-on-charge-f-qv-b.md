## 1. The one-sentence answer
**The magnetic force on a point charge is the vector quantity F = q(v × B), which is always perpendicular to both the charge’s velocity and the magnetic field.**

A stationary charge feels nothing from a magnetic field. Only when the charge moves does a force appear, and that force never does work because it cannot push along the direction of motion. The strength of the force grows with the charge’s speed, with the field strength, and with the sine of the angle between them; the direction is fixed by the geometry of the cross product.

The cross product encodes two experimental facts at once: the force vanishes when velocity is parallel or anti-parallel to B, and it reaches maximum when velocity is perpendicular to B. The right-hand rule that accompanies the cross product tells an observer which way the force points for a positive charge; a negative charge simply reverses that direction.

> [!NOTE]
> The magnetic force changes a charge’s direction but never its speed; this single property is why magnetic fields are used to steer beams without adding or removing kinetic energy.

## 2. Why this matters — concrete and current
In the LHC at CERN, 7 TeV protons travel inside 8.3 T superconducting dipoles whose only job is to supply the precise F = qv × B needed to keep the 27 km orbit stable; any miscalculation of the cross-product direction would send the beam into the wall within microseconds.

Hall-effect sensors in every modern electric vehicle (Tesla, Rivian, BYD) measure current by placing a semiconductor plate perpendicular to the wire; the resulting transverse voltage is literally q(v_d × B) where v_d is the drift speed of electrons, giving a contactless ammeter accurate to 0.1 %.

Mass spectrometers used in semiconductor fabs (Applied Materials, Lam Research) separate dopant ions by sending them through a uniform B field; ions of different charge-to-mass ratio follow circular arcs whose radii are set directly by |F| = qvB, allowing isotope-pure beams for 3 nm node doping.

Earth’s magnetosphere deflects solar-wind protons and electrons via the same Lorentz force; without it the atmosphere would be stripped as it was on Mars, a fact now quantified by MAVEN satellite data and used to design radiation shielding for crewed Mars missions.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector notation          | Velocity and B are vectors; the force is their cross product |
| Right-hand rule for axes | Determines the unique direction of v × B                  |
| Sine function in right triangles | Gives the component of v perpendicular to B            |
| Newton’s second law      | F = ma is how we turn the magnetic force into observable motion |

## 4. Building the idea — from intuition to formalism

### Step 1 — Magnetic fields act only on moving charges
A charge at rest in a pure magnetic field experiences zero force. A charge moving through the same field feels a sideways push whose strength increases with speed.  
Example: an electron drifting at 10^6 m s^{-1} through a 0.1 T laboratory magnet feels a force roughly 10^5 times larger than the same electron at rest.  
Formal statement: if v = 0 then F = 0.  
> [!WARNING] Treating a stationary charge as experiencing a magnetic force is the most common entry-level error and immediately violates both experiment and the definition of B.

### Step 2 — The force is perpendicular to velocity
The magnetic force never points along v, so it cannot change speed—only direction.  
Example: a proton entering a uniform B field at 45° follows a helical path whose pitch remains constant while its radius is set by the perpendicular speed component.  
Formal statement: F · v = 0 for any v and B.  
> [!WARNING] Forgetting that F ⊥ v leads to the false prediction that magnetic fields can accelerate particles to higher energies, a mistake that appears in many incorrect fusion-reactor sketches.

### Step 3 — The force is also perpendicular to B
If the velocity lies exactly along B, the force vanishes.  
Example: electrons fired parallel to the axis of a solenoid coast in a straight line; those fired at a small angle spiral.  
Formal statement: F = 0 whenever v ∥ B.  
> [!WARNING] Confusing the angle between v and B with the angle between v and the force direction produces a sign error in every subsequent calculation.

### Step 4 — Magnitude scales with sin θ
Only the component of velocity perpendicular to B contributes.  
Example: at θ = 90° the force is qvB; at θ = 30° it drops to qvB/2.  
Formal statement: |F| = q v B sin θ.  
> [!WARNING] Using cos θ instead of sin θ reverses the dependence on angle and yields zero force at the point of maximum experimental force.

### Step 5 — Direction is given by the right-hand rule
Point fingers of the right hand along v, curl toward B; thumb gives F for positive q.  
Example: v east, B north → F vertically up for a positive charge.  
Formal statement: the ordered triple (v, B, F/q) obeys the right-hand orientation of three-dimensional space.

### Step 6 — Vector product assembles all facts
The single expression that satisfies magnitude qvB sin θ and the observed direction is the cross product.  
Formal statement:  
$$ \mathbf{F} = q (\mathbf{v} \times \mathbf{B}) $$

## 5. Worked examples — every step shown

**Example 1 — Electron in uniform field**  
*Given:* q = −e, v = 3.0 × 10^6 m s^{-1} ĵ, B = 0.20 T k̂.  
*Find:* F.  

v × B = |i    j    k|  
   |0  3e6  0|  
   |0    0  0.2| = i(3e6·0.2) − j(0) + k(0) = 6.0 × 10^5 î.  
*Why:* determinant gives the only non-zero component.  
F = (−e)(6.0 × 10^5 î) = −9.6 × 10^{-14} î N.  
*Why:* negative charge reverses direction.  
**−9.6 × 10^{-14} î N**  

*Reflection:* The calculation shows both magnitude and the reversal of direction for negative charge; the same arithmetic applies to any sign of q.

**Example 2 — Proton at arbitrary angle**  
*Given:* v = 4.0 × 10^5 (î + ĵ) m s^{-1}, B = 0.50 T î.  
*Find:* |F|.  

v⊥ = v sin 45° = 4.0 × 10^5 / √2.  
|F| = (1.6 × 10^{-19})(4.0 × 10^5 / √2)(0.50).  
*Why:* only the perpendicular component enters sin θ.  
**2.26 × 10^{-14} N**  

*Reflection:* The angle dependence appears explicitly; omitting the sin θ factor is the most frequent numerical error.

**Example 3 — Circular motion radius**  
*Given:* electron, v = 2.0 × 10^7 m s^{-1} ⊥ B = 0.10 T.  
*Find:* radius of orbit.  

F = evB supplies centripetal force: evB = m v² / r.  
r = m v / (e B).  
*Why:* equate magnitudes and solve for r.  
**r = 1.14 mm**  

*Reflection:* Magnetic force alone produces circular motion; no work is done, speed stays constant.

**Example 4 — Helical pitch**  
*Given:* proton with v∥ = 3.0 × 10^5 m s^{-1}, v⊥ = 4.0 × 10^5 m s^{-1}, B = 0.20 T.  
*Find:* pitch after one period.  

T = 2π m / (q B).  
Pitch = v∥ T.  
*Why:* parallel speed is constant; period set by perpendicular cyclotron frequency.  
**9.82 mm**  

*Reflection:* The decomposition into parallel and perpendicular components is the key step that generalises to any uniform B.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using |F| = qvB without sin θ     | Students remember only the maximum case     | Always write |v × B| = vB sin θ first         |
| Reversing direction for +q vs −q  | Right-hand rule feels arbitrary             | Fix the rule for positive charge, then flip  |
| Treating B as a force             | Language overlap (“magnetic force field”)   | Keep B units tesla, F units newton           |
| Adding electric and magnetic forces without vector check | Both called “Lorentz force”            | Write F_total = qE + q(v × B) explicitly     |
| Assuming work is done             | Everyday forces usually do work             | Compute F · v = 0 every time                 |
| Forgetting cross product is zero when parallel | 2-D intuition dominates                  | Draw v and B on paper before calculating     |
| Using left-hand rule               | Cultural or textbook variation              | Standardise on right-hand rule for v × B     |

## 7. The textbook-precise statement
The Lorentz magnetic force on a point charge q whose velocity is v in a magnetic field B is  
$$ \mathbf{F} = q (\mathbf{v} \times \mathbf{B}), $$  
where the cross product is taken in the usual right-handed Cartesian basis. This relation holds in the non-relativistic limit and when radiation reaction is negligible (Jackson, *Classical Electrodynamics*, 3e, §11.1).

## 8. Visual — diagram or schematic
```text
        B (out of page) × × × × ×
                             
   v →  •  F (up)          (right-hand rule:
          ↑                  fingers along v,
          |                  curl toward B,
          |                  thumb along F)
```
Labelled axes: x right (v), y up (F), z out (B). The × symbols indicate B pointing out of the page.

## 9. The memory technique
1. **The hook** — Picture an arrow (velocity) slapped by a field (B) so that the resulting force is the direction your fingers curl; the slap is always sideways, never forward.  
2. **What to overlearn** — F = q(v × B), |F| = qvB sin θ, F ⊥ v always.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from the experimental facts that force vanishes for v ∥ B and reaches maximum for v ⊥ B, then insert the right-hand orientation.

## 10. What this unlocks
Mastery of F = q(v × B) is the gateway to the full Lorentz force, to the Biot–Savart law for currents, and to the design of every magnetic spectrometer, rail accelerator, and tokamak field coil.  

- Cyclotron frequency ω = qB/m  
- Magnetic rigidity Bρ in accelerator physics  
- Hall-effect and magnetoresistance tensors  
- Guiding-centre drifts in inhomogeneous fields  
- Lorentz transformation of electromagnetic fields

## 11. Self-check — five questions, no answers
1. An alpha particle (q = +2e) enters a 1.5 T field at 30° to B with speed 5 × 10^6 m s^{-1}. Compute the magnitude of the force.  
2. A negative pion travels exactly parallel to a uniform B. Describe its subsequent motion in one sentence.  
3. Why does the radius of curvature of a proton in a given B field decrease if its kinetic energy is doubled while the field stays constant?  
4. Identify the error: “The magnetic field does work on the charge, increasing its speed.”  
5. A velocity selector uses perpendicular E and B fields. Derive the single speed that travels straight through undeflected.