## 1. The one-sentence answer
**Relative motion** is the velocity of one object measured in the reference frame of another object, obtained by vector subtraction of the frame velocity from the absolute velocity.

When two objects move, their velocities only make sense once you fix the observer. In one dimension you simply add or subtract scalar speeds with direction signs. In two dimensions you treat velocities as vectors and use components or the parallelogram rule. River-boat problems are the classic 2-D case: the boat’s velocity relative to water and the water’s velocity relative to ground must be added vectorially to give the boat’s path over ground; the time to cross depends only on the perpendicular component.

> [!NOTE]
> The single most important insight is that **velocity is always relative to a chosen frame**; change the frame and the numbers change, but the underlying physics (Newton’s laws in inertial frames) stays the same.

## 2. Why this matters — concrete and current
SpaceX uses relative-velocity calculations in real time during Dragon docking with the ISS; the approach speed must be kept below 0.1 m/s in the station’s frame while both objects orbit at 7.66 km/s.

Airbus and Boeing flight-management systems continuously solve 2-D relative-wind problems so that the aircraft’s heading compensates for cross-winds; a 30-knot cross-wind on final approach is handled by the same vector decomposition used in river-boat problems.

Satellite mega-constellations such as Starlink perform station-keeping burns whose delta-v is computed in the instantaneous orbital frame of each satellite; relative motion between adjacent satellites must remain below a few metres per second to avoid collision.

Oceanographic drifters and underwater gliders correct their trajectories for unknown currents exactly as a boat corrects for river flow; the correction algorithm is a direct 2-D relative-velocity solution updated every few minutes.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector addition          | Velocities add as vectors in 2-D                          |
| Component resolution     | Allows separation of motion parallel and perpendicular to river banks |
| Reference-frame change   | Defines what “relative to water” and “relative to ground” mean |
| Average velocity         | Time of crossing equals distance divided by perpendicular velocity component |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Choose the reference frame
Velocity numbers are meaningless until you state whose frame you are using.  
Example: a boat moving at 3 m/s in still water appears stationary to a swimmer drifting with it.  
Formal statement: the velocity of A relative to B is \(\vec{v}_{AB}=\vec{v}_A-\vec{v}_B\).  
> [!WARNING]  
> If you forget to subtract the frame velocity, every subsequent vector will point in the wrong direction.

### Step 2 — One-dimensional velocity addition
When motion is collinear, simply attach signs.  
Example: two cars on a straight road, 20 m/s east and 15 m/s west; relative speed is 35 m/s.  
Formal: \(v_{12}=v_1-v_2\) with consistent sign convention.  
> [!WARNING]  
> Sign errors here produce the classic “they are approaching at 5 m/s instead of 35 m/s” mistake.

### Step 3 — Extend to two dimensions via components
Any velocity vector can be written \(\vec{v}=v_x\hat{i}+v_y\hat{j}\).  
Relative velocity components are subtracted separately:  
\[
v_{AB,x}=v_{A,x}-v_{B,x},\qquad v_{AB,y}=v_{A,y}-v_{B,y}.
\]

### Step 4 — River-boat geometry
Let \(\vec{v}_{b/w}\) be boat velocity relative to water and \(\vec{v}_{w/g}\) water velocity relative to ground. The observed velocity over ground is  
\[
\vec{v}_{b/g}=\vec{v}_{b/w}+\vec{v}_{w/g}.
\]  
The crossing time depends only on the component perpendicular to the current.

### Step 5 — Shortest-time versus shortest-path
To minimise time, aim the boat straight across so the perpendicular component is maximised. To reach the point directly opposite, aim upstream so the resultant has zero downstream component.

### Step 6 — General vector equation
For arbitrary heading angle \(\theta\) measured from the perpendicular,  
\[
v_{b/g,x}=v_{b/w}\sin\theta-v_{w/g},\qquad v_{b/g,y}=v_{b/w}\cos\theta.
\]  
Time to cross width \(d\) is \(t=d/v_{b/g,y}\).

## 5. Worked examples — har step show karo

**Example 1 — Simple 1-D overtaking**  
*Given:* Car A at 25 m/s, Car B at 20 m/s, both east.  
*Find:* velocity of A relative to B.  
Step: \(v_{AB}=25-20=5\) m/s east.  
*Why:* direct subtraction because frames are collinear.  
**5 m/s east**

*Reflection:* trivial numbers reveal the sign convention that will be used in 2-D.

**Example 2 — River crossing, no aiming correction**  
*Given:* river 100 m wide, \(v_{b/w}=4\) m/s perpendicular, current \(v_{w/g}=3\) m/s downstream.  
*Find:* time to cross and downstream drift.  
Perpendicular component remains 4 m/s, so \(t=100/4=25\) s.  
Drift: \(3\times25=75\) m.  
*Why:* time depends only on the perpendicular velocity.  
**25 s, 75 m downstream**

*Reflection:* shows that fastest crossing is not the shortest path.

**Example 3 — Reaching directly opposite bank**  
*Given:* same river and boat speed; find heading angle so resultant is perpendicular.  
Let \(\theta\) be upstream angle from perpendicular.  
\(v_{b/g,x}=4\sin\theta-3=0\) ⇒ \(\sin\theta=3/4\) ⇒ \(\theta=48.6^\circ\).  
Time: \(t=100/(4\cos 48.6^\circ)=37.5\) s.  
*Why:* zero x-component forces resultant straight across.  
**Heading 48.6° upstream, 37.5 s**

*Reflection:* extra time is the price of zero drift.

**Example 4 — Wind-affected aircraft (2-D relative motion)**  
*Given:* plane airspeed 200 km/h, wind 50 km/h at 30° north of east; pilot wants due-east ground track.  
Resolve wind: \(v_{wx}=43.3\) km/h, \(v_{wy}=25\) km/h.  
Heading angle \(\phi\) south of east satisfies \(200\sin\phi=25\) ⇒ \(\phi=7.2^\circ\).  
Ground speed: \(200\cos 7.2^\circ+43.3=241.7\) km/h east.  
*Why:* same vector addition as river boat, only labels changed.  
**Heading 7.2° south of east, ground speed 241.7 km/h**

*Reflection:* identical mathematics appears in aviation and missile guidance.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using boat speed as ground speed  | Forgetting current must be added            | Always write \(\vec{v}_{b/g}=\vec{v}_{b/w}+\vec{v}_{w/g}\) first |
| Taking time = width / boat speed  | Ignoring that only perpendicular component matters | Identify which component is perpendicular before dividing |
| Wrong sign on current             | Confusing upstream versus downstream        | Draw arrows for every velocity before writing equations |
| Solving for angle with calculator in degrees/radians mismatch | Mode error on calculator                    | Check calculator mode before inverse trig    |
| Assuming minimum-time path is shortest | Intuition from still water                  | Compare two headings explicitly              |
| Forgetting resultant magnitude changes | Treating vectors as scalars                 | Always compute both components then Pythagoras |

## 7. The textbook-precise statement
In an inertial frame the relative velocity of particle A with respect to particle B is defined by the vector equation  
\[
\vec{v}_{A/B}=\vec{v}_A-\vec{v}_B.
\]  
When B is a moving medium (water, air) the same relation holds provided all velocities are measured with respect to the same inertial frame. For steady, uniform current the time to traverse a straight-line distance \(d\) perpendicular to the current is  
\[
t=\frac{d}{(\vec{v}_{b/w}\cdot\hat{n})},
\]  
where \(\hat{n}\) is the unit normal to the current; the path over ground is a straight line only if the resultant velocity has zero component parallel to the current. (Kleppner & Kolenkow, *An Introduction to Mechanics*, 1st ed., §3.3).

## 8. Visual — diagram or schematic
```text
          y (across river)
          ^
          |  v_b/w (boat relative water)
          |   /
          |  / θ
----------+---------> x (downstream)
          |     v_w/g (current)
          |
Ground frame: resultant v_b/g = v_b/w + v_w/g
```
River banks parallel to x-axis, width d along y. θ is heading angle from the y-axis.

## 9. The memory technique

1. **The hook**  
   Picture the river as a moving conveyor belt; the boat’s engine only gives velocity relative to the belt, not the room.

2. **What to overlearn**  
   - \(\vec{v}_{b/g}=\vec{v}_{b/w}+\vec{v}_{w/g}\)  
   - Crossing time = width / perpendicular component only  
   - \(\sin\theta = v_{current}/v_{boat}\) for zero-drift heading

3. **Spaced-repetition schedule**  
   Review the vector equation after 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback**  
   If the formula is forgotten, return to the definition \(\vec{v}_{A/B}=\vec{v}_A-\vec{v}_B\) and resolve every velocity into components along and across the river.

## 10. What this unlocks
Relative-motion mastery is required for projectile motion on moving platforms, pursuit curves, orbital rendezvous, and Doppler-effect derivations.  
- Next immediate topics: 2-D projectile motion with moving launch platform, relative acceleration, fictitious forces in non-inertial frames.  
- Later: Hohmann transfers, missile guidance, wind-triangle navigation in meteorology.

## 11. Self-check — five questions, no answers
1. Two trains approach each other at 30 m/s and 40 m/s on the same straight track. What is their closing speed?  
2. A boat whose speed in still water is 5 m/s must cross a 200 m river with a 2 m/s current. What heading angle gives zero downstream drift?  
3. In Example 2 above, if the boat instead aims straight across, where does it land relative to the starting point?  
4. An aircraft must fly due north at 300 km/h ground speed while a 40 km/h wind blows from the west. What airspeed and heading are required?  
5. A river-boat problem yields two possible heading angles for a given resultant speed. Which angle corresponds to minimum crossing time and why?