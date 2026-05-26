## 1. The one-sentence answer
**The Barrowman equations locate the centre of pressure of a finned rocket by summing the normal-force contributions of nose, body, and fins, each weighted by its own centre-of-pressure position, under the assumptions of slender-body theory and small angles of attack.**

A rocket in flight experiences aerodynamic forces distributed along its length. The single point at which the net normal force may be considered to act is the centre of pressure (CP). For static stability the CP must lie aft of the centre of gravity (CG); the Barrowman method supplies an explicit algebraic route from geometry to that CP location.

The method treats the vehicle as a linear superposition of three classes of component. Each component possesses its own normal-force-curve slope \(C_{N\alpha}\) and its own local CP station \(x_i\). The vehicle CP is then the first moment of these contributions divided by their sum. Because the underlying aerodynamics are linearised, the result is independent of angle of attack within the small-angle regime.

> [!NOTE]
> The decisive insight is that fins dominate both the total normal-force slope and the aft movement of the CP; a 10 % change in fin span typically shifts the CP farther than a comparable change in nose shape.

## 2. Why this matters — concrete and current
Model rocketry certification by the National Association of Rocketry and the Tripoli Rocketry Association relies on Barrowman-derived CP calculations to guarantee stability margins before flight. Commercial software such as RockSim and OpenRocket implements the equations directly, allowing thousands of hobbyists and university teams to iterate designs without wind-tunnel testing.

Sounding-rocket programmes at NASA Wallops and Andøya Space routinely employ Barrowman CP estimates in pre-flight stability reviews for vehicles reaching 100–300 km apogee; the method supplies the initial guess that is later refined by CFD or flight telemetry.

CubeSat deployers such as the Rocket Lab Electron and Firefly Alpha use finned first stages whose CP must be known to within a few centimetres; Barrowman results feed the six-degree-of-freedom simulators that certify stage-separation clearance.

Amateur high-power attempts on the 100 km boundary (e.g., the Copenhagen Suborbitals and USC Rocket Propulsion Laboratory flights) have repeatedly shown that a Barrowman-predicted static margin below 1 calibre correlates with observed coning or tumbling within the first 3 s after launch.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Centre of pressure       | The quantity the equations compute                        |
| Normal-force-curve slope \(C_{N\alpha}\) | Each component’s contribution is proportional to this slope |
| Reference length and area | Non-dimensional coefficients must be referred to the same quantities |
| Moment arm and first moment | The CP is literally the first moment of normal-force contributions |
| Small-angle approximation | Linearisation underlying every Barrowman term             |

## 4. Building the idea — from intuition to formalism

### Step 1 — Aerodynamic force acts at a single station per component
Any slender body at small angle of attack produces a normal force that can be replaced by an equal force acting at one longitudinal station—the component CP—without changing the net force or moment about the vehicle CG.  
Example: a 3-calibre ogive nose alone has its CP at approximately 1.3 calibres from the tip.  
The formal statement is that the pitching moment about an arbitrary station \(x_r\) equals the normal force times the lever arm \((x_{cp}-x_r)\):
\[
M = N(x_{cp}-x_r).
\]

> [!WARNING]
> Treating the entire vehicle as a single body from the outset hides the fact that fins move the CP aft far more efficiently than nose shaping; the component-wise decomposition is essential.

### Step 2 — Superposition of normal-force slopes
Because the flow is linear, the vehicle normal-force-curve slope is the arithmetic sum of the component slopes, each already non-dimensionalised to the same reference area and length:
\[
C_{N\alpha} = C_{N\alpha,\text{nose}} + C_{N\alpha,\text{body}} + C_{N\alpha,\text{fins}}.
\]

### Step 3 — First-moment definition of the vehicle CP
The vehicle CP station is the weighted average of the component CP stations, weights being the component normal-force slopes:
\[
x_{cp} = \frac{\sum_i C_{N\alpha,i}\,x_{cp,i}}{C_{N\alpha}}.
\]

### Step 4 — Explicit component expressions (Barrowman)
Nose and body terms follow slender-body theory; fin terms include an empirical correction for aspect ratio. The classic fin normal-force slope for four rectangular fins is
\[
C_{N\alpha,f} = \frac{2}{\sqrt{1+(2l_f/s)^2}} \left(\frac{S_f}{S_{\text{ref}}}\right),
\]
where \(l_f\) is the semi-span, \(s\) the mean chord, and \(S_f\) the total fin area.

### Step 5 — Final textbook statement
The Barrowman centre-of-pressure location for a finned rocket is therefore
\[
x_{cp} = \frac{C_{N\alpha,n}x_n + C_{N\alpha,b}x_b + C_{N\alpha,f}x_f}{C_{N\alpha,n}+C_{N\alpha,b}+C_{N\alpha,f}},
\]
valid for \(\alpha \lesssim 10^\circ\), Mach < 0.8, and fins of aspect ratio greater than 0.5 (Barrowman, “The Theoretical Prediction of the Centre of Pressure”, 1966).

## 5. Worked examples — every step shown

**Example 1 — Single nose cone**  
*Given:* Ogive nose, \(C_{N\alpha,n}=2\), \(x_n=1.3D\) from tip, no body or fins, reference length \(D\).  
*Find:* \(x_{cp}\).  
The total normal-force slope is simply the nose contribution:  
\(C_{N\alpha}=2\).  
*Why:* Only one term exists.  
The moment sum is \(2\times1.3D\).  
*Why:* Definition of first moment.  
Thus
\[
x_{cp}=\frac{2\times1.3D}{2}=1.3D.
\]
**1.3D from tip**  
*Reflection:* The trivial case confirms that an isolated component’s CP is recovered exactly.

**Example 2 — Nose plus cylindrical body**  
*Given:* Nose as above plus body of length 8D with \(C_{N\alpha,b}=0\) (slender-body result).  
*Find:* \(x_{cp}\).  
Total slope remains 2.  
Body contributes zero normal force, hence zero moment.  
Result unchanged: \(x_{cp}=1.3D\).  
*Reflection:* Body-alone adds no restoring force; stability must come from fins.

**Example 3 — Add four rectangular fins**  
*Given:* Previous vehicle plus fins with \(C_{N\alpha,f}=6\), \(x_f=12D\).  
*Find:* \(x_{cp}\).  
Total slope \(=2+0+6=8\).  
Moment sum \(=2\times1.3D+6\times12D=75.6D\).  
\[
x_{cp}=\frac{75.6D}{8}=9.45D.
\]
**9.45D from nose tip**  
*Reflection:* Fins dominate both numerator and denominator, pulling CP aft by more than 8 calibres.

**Example 4 — Effect of fin sweep**  
*Given:* Same fins but swept, increasing effective aspect ratio so \(C_{N\alpha,f}=7.2\), \(x_f\) unchanged.  
Total slope \(=9.2\).  
Moment sum \(=2\times1.3D+7.2\times12D=89D\).  
\[
x_{cp}=9.67D.
\]
**9.67D**  
*Reflection:* Higher fin lift slope moves CP farther aft even at identical geometric station.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Using body-alone \(C_{N\alpha}\) from 2-D airfoil tables | Forgetting slender-body theory gives zero for a cylinder | Always set body contribution to zero for subsonic Barrowman |
| Measuring fin CP from leading edge instead of mean aerodynamic chord | Misreading the reference station in the original report | Locate each fin CP at ¼ of its own mean chord aft of its own leading edge |
| Adding fin and body interference factors twice | Double-counting the “carry-over” lift | Use the plain Barrowman expressions; interference is already absorbed in the empirical fin term |
| Applying the equations at \(\alpha=15^\circ\) | Linear theory breakdown                     | Restrict to \(\alpha<10^\circ\) or switch to nonlinear methods |
| Neglecting the reference-area change when clustering motors | Different reference diameter in the denominator | Re-normalise all \(C_{N\alpha}\) to a single reference area before summing |
| Placing the coordinate origin at the CG instead of the nose tip | Sign errors in lever arms                   | Fix origin at nose tip; convert CG location afterwards |
| Ignoring Mach-number dependence of fin lift slope | Using sea-level incompressible values at Mach 0.7 | Multiply fin term by the Prandtl–Glauert factor when required |

## 7. The textbook-precise statement
For a body of revolution with cruciform fins at angle of attack \(\alpha\), the centre-of-pressure location measured from the nose tip is
\[
x_{cp}=\frac{\sum_{i=1}^{N}C_{N\alpha,i}\,x_{cp,i}}{\sum_{i=1}^{N}C_{N\alpha,i}},
\]
where each \(C_{N\alpha,i}\) is evaluated at the reference area \(S_{\rm ref}\) and the sum runs over nose, body and fin sets. The result holds under the hypotheses of potential flow, \(\alpha\ll1\), and fin aspect ratio \(\ge0.5\). (Barrowman, Technical Information Report 33, U.S. Army Missile Command, 1966.)

## 8. Visual — diagram or schematic
```text
Nose tip (x=0)
   ▲
   │  Ogive nose          Body (cylinder)          Fins (4×)
   │◀───── 3D ─────▶│◀──────── 8D ────────▶│◀─ 1D ─▶
   │                │                      │
   │                │                      │  ▲
   │                │                      │  │ span l_f
   │                │                      │  ▼
   └────────────────┴──────────────────────┴──────► x
                CG                  CP
                ●                   ◆
```
Axis: x increasing aft from nose tip. CG and CP shown as filled symbols; distances measured in body diameters D.

## 9. The memory technique

1. **The hook**  
   Picture a weather-vane: the heavy nose is the CG, the broad tail is the CP; the arrow always points into the wind because the CP lies behind the pivot.

2. **What to overlearn**  
   - \(x_{cp}\) is the first-moment ratio of normal-force slopes.  
   - Fins supply ~75 % of total \(C_{N\alpha}\) on a typical model.  
   - Body-alone \(C_{N\alpha}=0\) in slender-body theory.

3. **Spaced-repetition schedule**  
   Review the three-line moment-ratio formula at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.

4. **First-principles fallback**  
   Re-derive the weighted-average expression from the definition \(M=N(x_{cp}-x_r)\) applied to each component and summed.

## 10. What this unlocks
Mastery of the Barrowman CP permits immediate calculation of static margin \(SM=(x_{cp}-x_{cg})/D\), the single most important stability metric for any finned rocket. The same component-wise decomposition reappears in dynamic stability derivatives, roll-coupling analysis, and the preliminary sizing of canards or TVC vanes. Subsequent topics—Roskam’s lateral-directional derivatives, the rocket “trim curve,” and the open-source RASAero II code—rest directly on this foundation.

## 11. Self-check — five questions, no answers
1. A nose-alone rocket yields \(x_{cp}=1.3D\). Add fins that double the total normal-force slope at station 10D. Where is the new CP?  
2. Why does the Barrowman body term vanish for a pure cylinder, and what physical mechanism is missing?  
3. If fin sweep increases \(C_{N\alpha,f}\) by 20 % while geometric station stays fixed, does the vehicle become more or less stable? Quantify the change in static margin.  
4. A designer measures all lengths from the CG instead of the nose tip. Which term in the Barrowman equation changes sign, and why?  
5. At what approximate angle of attack does the linear Barrowman prediction typically depart from flight data by more than 10 % of a calibre, and what physical phenomenon is responsible?