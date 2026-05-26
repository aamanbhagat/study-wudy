## 1. The one-sentence answer
**Two lines are perpendicular if and only if the product of their slopes equals −1, provided neither line is vertical.**

Slope measures the rate of change of y with respect to x. When two lines meet at a right angle, their directions are orthogonal, so an increase along one line must be exactly offset by a compensating decrease along the other. This compensation produces the product −1.  

A vertical line has undefined slope and is perpendicular to every horizontal line (slope 0). The rule therefore excludes vertical lines by requiring both slopes to exist as real numbers.  

The relation follows directly from the angle-addition formula once the tangent of 90° is recognized to be undefined.

> [!NOTE]
> The single algebraic condition m₁m₂ = −1 replaces the geometric requirement that the angle between the lines equal 90°; the algebra encodes the geometry.

## 2. Why this matters — concrete and current
In semiconductor mask design, orthogonal routing of metal layers minimizes crosstalk; CAD tools such as those from Cadence enforce m₁m₂ = −1 at every T-junction to guarantee 90° turns between traces.

In aerospace guidance, the local vertical (plumb line) must remain perpendicular to the horizon plane; inertial measurement units inside SpaceX Falcon avionics use slope-product checks to verify sensor alignment during flight-software initialization.

In computer-vision pipelines at OpenCV, vanishing-point detection for architectural scenes identifies perpendicular edges by testing whether the product of fitted line slopes is −1 within floating-point tolerance, enabling accurate camera-pose recovery.

In robotics path planning, the MoveIt framework for ROS represents obstacle normals as lines whose slopes satisfy the product condition with the robot’s velocity vector, ensuring collision-free motion along surfaces.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Definition of slope  | Slope is the only quantity that appears in the final rule |
| Coordinate plane     | Lines are represented by ordered pairs (x,y)              |
| Angle-addition formula for tangent | Converts geometric 90° into algebraic −1                |
| Vertical and horizontal lines | Special cases that must be stated separately            |

## 4. Building the idea — from intuition to formalism

### Step 1 — Slope records direction
Slope m = Δy/Δx tells how steeply a line rises. A concrete pair of points (0,0) and (2,4) gives m = 2.  
$$m = \frac{y_2 - y_1}{x_2 - x_1}.$$  
> [!WARNING] Treating slope as an angle rather than a ratio will later produce incorrect signs.

### Step 2 — Two slopes determine an angle
If two lines intersect, the angle θ between them satisfies  
$$\tan\theta = \left| \frac{m_2 - m_1}{1 + m_1 m_2} \right|.$$  
The formula follows from the tangent subtraction identity applied to the angles each line makes with the x-axis.

### Step 3 — Right angle forces the denominator to vanish
For θ = 90°, tan θ is undefined, so the denominator must be zero:  
$$1 + m_1 m_2 = 0.$$  
Hence  
$$m_1 m_2 = -1.$$  
> [!WARNING] Omitting the absolute-value bars hides the fact that only the denominator, not the numerator, controls perpendicularity.

### Step 4 — Vertical lines are handled separately
A vertical line has Δx = 0, so its slope is undefined. It meets every horizontal line (m = 0) at 90°. The product rule therefore applies exclusively when both slopes exist as finite real numbers.

### Step 5 — The complete criterion
Two distinct lines are perpendicular precisely when either (a) one is vertical and the other horizontal, or (b) both slopes exist and satisfy m₁m₂ = −1.

## 5. Worked examples — every step shown

**Example 1 — Horizontal and vertical**  
*Given:* Line A: y = 3 (slope 0). Line B: x = 4 (vertical).  
*Find:* Are they perpendicular?  
Step 1: Slope of A is 0.  
*Why:* Constant y means Δy = 0.  
Step 2: Slope of B is undefined.  
*Why:* Δx = 0.  
Step 3: One line horizontal, one vertical.  
*Why:* Matches the separate case in Step 4.  
**They are perpendicular.**

**Example 2 — Simple non-axis-aligned pair**  
*Given:* Line through (0,0) and (1,2); line through (0,0) and (2,−1).  
*Find:* Check perpendicularity.  
Step 1: m₁ = 2/1 = 2.  
*Why:* Δy/Δx.  
Step 2: m₂ = −1/2.  
*Why:* Δy/Δx.  
Step 3: 2 × (−1/2) = −1.  
*Why:* Product equals −1.  
**The lines are perpendicular.**

**Example 3 — Lines not through origin**  
*Given:* y = 4x + 1 and y = (−1/4)x − 7.  
*Find:* Verify perpendicularity.  
Step 1: Extract slopes: m₁ = 4, m₂ = −1/4.  
*Why:* Slope is coefficient of x.  
Step 2: 4 × (−1/4) = −1.  
*Why:* Direct multiplication.  
**The lines are perpendicular.**

**Example 4 — Finding the missing slope**  
*Given:* Line with slope 5 passes through (1,2). Find slope of a perpendicular line.  
*Find:* Required slope m.  
Step 1: Write condition 5m = −1.  
*Why:* Product must be −1.  
Step 2: m = −1/5.  
*Why:* Solve linear equation.  
**The perpendicular slope is −1/5.**

*Reflection:* Each example isolates one variable (slope, intercept, or missing value) while the product condition remains unchanged; the algebraic move is always division or multiplication by −1.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting vertical/horizontal case | Over-generalizing the product rule          | State the two cases explicitly before computing |
| Using the formula when lines are parallel | 1 + m₁m₂ never zero when m₁ = m₂          | Check m₁ ≠ m₂ first                          |
| Sign error in reciprocal          | Confusing −1/m with 1/m                     | Always attach the minus sign visibly         |
| Assuming every right angle has finite slopes | Overlooking axes                            | Draw quick sketch of axes before calculation |
| Applying rule to line segments    | Segments may meet at endpoint but not intersect as lines | Extend segments to full lines first          |
| Calculator floating-point test    | −0.999999 ≠ −1 exactly                      | Use exact fractions or tolerance with warning |
| Ignoring domain of tangent        | Division by zero when 1 + m₁m₂ = 0          | Verify denominator vanishes before quoting angle |

## 7. The textbook-precise statement
Let L₁ and L₂ be two distinct non-vertical lines with slopes m₁ and m₂ respectively. Then L₁ ⊥ L₂ if and only if m₁m₂ = −1.  
If one line is vertical, it is perpendicular to the other precisely when the other is horizontal.  
(Stewart, *Calculus*, 9e, §1.2, Theorem on slopes of perpendicular lines.)

## 8. Visual — diagram or schematic
```text
y
↑
│     L2 (m=−1/2)
│    /
│   /
│  /
│ / 90°
│/___________ L1 (m=2)
│
└──────────────→ x
```
L1 rises steeply (slope 2); L2 falls gently (slope −1/2). Their intersection forms a right angle exactly when the product of slopes is −1.

## 9. The memory technique
1. **The hook** — Picture a seesaw: when one end goes up steeply, the other must go down at the reciprocal steepness with opposite sign, locking the product at −1.  
2. **What to overlearn** — m₁m₂ = −1 (finite slopes); vertical ⊥ horizontal.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from tan(θ₂ − θ₁) undefined ⇒ 1 + m₁m₂ = 0.

## 10. What this unlocks
The perpendicular-slope rule supplies the normal vector needed for tangent lines, circle equations, distance-from-point-to-line formulas, and orthogonal projections in linear algebra.  
- Equations of tangent lines to circles and parabolas  
- Normal vectors in multivariable calculus  
- Orthogonal bases in linear regression  
- Reflection laws in geometric optics  

## 11. Self-check — five questions, no answers
1. A line has slope 3; what slope must a second line have to be perpendicular to it?  
2. Show algebraically that the lines 2x − 3y = 7 and 3x + 2y = 1 are perpendicular.  
3. Why does the product rule fail when one line is vertical? Give a numerical counter-example if the rule is misapplied.  
4. Two lines intersect at (4,−2). One has slope −5/2. Find the equation of the perpendicular line through the same point.  
5. A triangle has vertices A(0,0), B(6,0), C(2,4). Verify that angle at B is a right angle using only slopes.