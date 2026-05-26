## 1. The one-sentence answer
**A parabola reflects every ray parallel to its axis through its focus (and conversely).**

A parabola is the set of points equidistant from a fixed point (the focus) and a fixed line (the directrix). Light or radio waves obey the law that the angle of incidence equals the angle of reflection at any tangent. Because every point on the curve satisfies the focus-directrix distance equality, the tangent at that point bisects the angle formed by the incoming parallel ray and the line to the focus. The two distances therefore force the reflection path to land exactly on the focus.

This single geometric fact converts an incoming plane wave into a concentrated point, or sends energy from a point source outward as a parallel beam. The property holds for any point on the curve and requires no approximation.

> [!NOTE]
> The focus is not a point on the curve; it lies inside the parabolic bowl, yet every reflected ray converges there exactly because the curve was defined by equal distances to focus and directrix.

## 2. Why this matters — concrete and current
The 500-metre FAST radio telescope in China uses a 300-metre parabolic reflector whose surface is adjusted in real time so that incoming radio waves from pulsars and fast radio bursts are focused to a single feed horn; without the reflective property the signals would remain spread over metres and undetectable.

Every direct-broadcast satellite television dish sold since the 1980s is a paraboloid of revolution whose focal length is chosen so that the LNB receiver sits at the focus; the same geometry appears in the uplink antennas at every geostationary satellite ground station operated by SES and Intelsat.

The primary mirror of the Hubble Space Telescope is a paraboloid of 2.4 m diameter whose focal length of 5.52 m places the secondary mirror at the focus; the same principle governs the 6.5 m primary of JWST, whose 18 hexagonal segments are figured to a common parabolic parent surface.

Automotive headlamp reflectors and searchlight mirrors are parabolic sections that turn the isotropic output of a bulb filament into a forward parallel beam; the same shape appears in reverse in solar concentrators that focus sunlight onto a receiver tube at the focus, achieving temperatures above 600 °C in commercial plants such as Ivanpah.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Focus-directrix definition of parabola | Supplies the equal-distance relation that forces the reflection angle |
| Slope of tangent line    | Determines the normal needed to apply the reflection law  |
| Vector reflection formula | Converts the geometric angle condition into coordinate algebra |
| Standard form \( y = \frac{1}{4p}x^2 \) | Gives explicit coordinates for focus, directrix and tangent |

## 4. Building the idea — from intuition to formalism

### Step 1 — Equal distance defines the curve
Any point on the parabola is exactly as far from the focus as from the directrix. Place the focus at \( (0,p) \) and directrix \( y = -p \). For a point \( (x,y) \) the equality \( \sqrt{x^2 + (y-p)^2} = y + p \) immediately yields the equation \( y = \frac{x^2}{4p} \).

### Step 2 — The tangent line at an arbitrary point
Differentiate the equation to obtain the slope \( \frac{dy}{dx} = \frac{x}{2p} \). At point \( P(x_0, \frac{x_0^2}{4p}) \) the tangent therefore has slope \( m = \frac{x_0}{2p} \).

### Step 3 — Incoming ray parallel to the axis
A ray parallel to the y-axis meets the curve at P with direction vector \( (0,1) \). The normal vector at P can be constructed from the tangent slope; its direction is \( (-m,1) \).

### Step 4 — Apply the reflection law
The reflection formula states that if \( \mathbf{i} \) is the incident direction and \( \mathbf{n} \) the unit normal, the reflected direction is \( \mathbf{r} = \mathbf{i} - 2(\mathbf{i}\cdot\mathbf{n})\mathbf{n} \). Substituting the parallel incident vector and the normal derived from the parabola’s derivative shows that \( \mathbf{r} \) points exactly toward the focus \( (0,p) \).

### Step 5 — Algebraic verification
Substitute coordinates: the vector from P to focus is \( (-x_0, p - \frac{x_0^2}{4p}) \). After normalisation and insertion into the reflection formula the resulting direction matches this vector, confirming the ray passes through the focus.

### Step 6 — The textbook statement
Any ray parallel to the axis of a parabola reflects through the focus; conversely, any ray originating at the focus reflects parallel to the axis.

## 5. Worked examples — every step shown

**Example 1 — Verify the property at the vertex**  
*Given:* Parabola \( y = \frac{1}{4p}x^2 \), point \( (0,0) \).  
*Find:* Reflected direction of a ray coming from \( y = +\infty \).  

The tangent at the vertex is horizontal, slope 0. Normal is vertical \( (0,1) \). Incident vector \( (0,1) \).  
Reflected vector: \( (0,1) - 2((0,1)\cdot(0,1))(0,1) = (0,1) - 2(0,1) = (0,-1) \).  
Direction \( (0,-1) \) points from vertex toward focus \( (0,p) \).  

**Final answer**  
The ray reflects straight down the axis through the focus.

*Reflection:* The vertex case is the simplest instance; the normal coincides with the axis, so reflection reverses the ray exactly.

**Example 2 — Point with nonzero x-coordinate**  
*Given:* \( p = 1 \), point \( P(2,1) \).  
*Find:* Show the reflected ray passes through focus \( (0,1) \).  

Slope of tangent: \( m = 2/(2\cdot1) = 1 \).  
Normal vector proportional to \( (-1,1) \). Unit normal \( \mathbf{n} = \frac{1}{\sqrt{2}}(-1,1) \).  
Incident unit vector \( \mathbf{i} = (0,1) \).  
Reflected: \( \mathbf{r} = \mathbf{i} - 2(\mathbf{i}\cdot\mathbf{n})\mathbf{n} \).  
\( \mathbf{i}\cdot\mathbf{n} = 1/\sqrt{2} \).  
\( \mathbf{r} = (0,1) - 2(1/\sqrt{2})\cdot\frac{1}{\sqrt{2}}(-1,1) = (0,1) - ( -1,1 ) = (1,0) \).  
Direction \( (1,0) \) from \( (2,1) \) reaches \( (0,1) \) after scaling.

**Final answer**  
Vector from P to focus is exactly \( (-2,0) \), parallel to the computed reflected direction.

*Reflection:* The algebra confirms the geometric claim without assuming the answer.

**Example 3 — Derive focal length from measured aperture**  
*Given:* A parabolic dish 4 m across and 1 m deep.  
*Find:* Location of focus.  

Equation \( y = \frac{x^2}{4p} \). At \( x = 2 \), \( y = 1 \):  
\( 1 = 4/(4p) \) ⇒ \( p = 1 \). Focus lies 1 m above vertex.

**Final answer**  
Focus is at height 1 m.

*Reflection:* Depth and diameter fix p directly from the standard form.

**Example 4 — Reverse ray from focus**  
*Given:* Ray leaves focus toward \( P(2,1) \) on \( y = x^2/4 \).  
*Find:* Direction after reflection.  

By reversibility of light paths the outgoing ray must be parallel to the axis.

**Final answer**  
Reflected ray travels vertically upward, parallel to y-axis.

*Reflection:* The property is symmetric; the same proof runs backward.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using the vertex as focus | Confuses the curve’s lowest point with the internal focus | Always locate focus at \( (0,p) \) from the equation |
| Forgetting the normal must be unit length | Reflection formula requires \( \|\mathbf{n}\|=1 \) | Normalise before applying the formula |
| Treating the directrix distance as vertical only | Students measure distance to line incorrectly at slanted points | Use the full distance formula \( |y+p| \) |
| Assuming the property holds only at the vertex | Over-generalising the obvious vertical case | Perform the vector calculation at a general \( x_0 \) |
| Mixing focal length with radius of curvature | Confuses parabola with circle | Remember radius of curvature at vertex is \( 2p \), not p |
| Ignoring the converse statement | Forgets the antenna transmit mode | State both directions explicitly in every derivation |
| Sign error in normal vector | Slope sign flips when axes are rotated | Keep consistent orientation of outward normal |

## 7. The textbook-precise statement
Let the parabola be given by \( y = \frac{x^2}{4p} \) with focus \( F(0,p) \) and directrix \( y = -p \). Let \( P(x_0,y_0) \) be any point on the parabola and let \( \ell \) be the tangent line at P. Then a ray parallel to the positive y-axis that strikes P is reflected along the line PF. Conversely, a ray originating at F and striking P is reflected parallel to the axis. (Stewart, *Calculus*, 9e, §3.4, Theorem on parabolic mirrors.)

## 8. Visual — diagram or schematic
```text
          ↑ incoming parallel rays
          │   │   │   │
          ▼   ▼   ▼   ▼
       -----------------  parabola y = x²/4p
      /                 \
     /                   \
    /          F          \   focus (0,p)
   /            •          \
  /                         \
 /___________________________\
              directrix y = -p
```
Labelled elements: axis of symmetry (vertical centre line), focus F, directrix, sample incident ray parallel to axis, reflected ray from surface point to F, tangent at that point.

## 9. The memory technique

**The hook**  
Picture a satellite dish as a giant invisible funnel that catches every radio wave sliding straight down the sky and slides it exactly into the tiny receiver at the bottom; the funnel’s shape is the only curve that performs this trick for all incoming parallel paths.

**What to overlearn**  
1. Equation \( y = \frac{x^2}{4p} \) with focus at \( (0,p) \).  
2. Reflected ray from parallel incidence passes through focus.  
3. The reflection law plus equal-distance definition together imply the property.

**Spaced-repetition schedule**  
Review the definition and focus location after 1 day, the vector proof after 3 days, a full worked example after 7 days, a trap-identification exercise after 16 days, and the textbook statement after 35 days.

**First-principles fallback**  
Start from the focus-directrix distance equality, differentiate to obtain the tangent slope, construct the normal, apply the vector reflection formula, and verify the output direction is the vector from the point to the focus.

## 10. What this unlocks
Mastery of the parabolic reflection property supplies the geometric engine behind the reflective properties of the ellipse (sum of distances constant) and the hyperbola (difference of distances constant). It also opens the design of Cassegrain and Gregorian dual-reflector systems, the calculation of coma and spherical aberration in optical telescopes, and the shaping of phased-array feeds that emulate parabolic surfaces electronically.

- Ellipse reflection property  
- Hyperbola reflection property  
- Two-mirror telescope prescriptions  
- Aperture efficiency calculations in radio astronomy  
- Solar concentrator flux mapping  

## 11. Self-check — five questions, no answers
1. For the parabola \( y = \frac{x^2}{8} \), locate the focus and verify that a ray parallel to the y-axis at \( x = 4 \) reflects through the focus.  
2. A parabolic antenna has depth 0.75 m and diameter 3 m. Compute its focal length and the angle subtended by the rim at the focus.  
3. Show algebraically that the normal at any point on \( y = \frac{x^2}{4p} \) bisects the angle between the line to the focus and the vertical.  
4. Identify the error in the following claim: “Because the vertex is on the parabola, a ray parallel to the axis must reflect back along itself from the vertex.”  
5. A ray leaves the focus of \( y = \frac{x^2}{4} \) at an angle of 30° to the axis. After reflection, what is the direction of the outgoing ray relative to the axis?