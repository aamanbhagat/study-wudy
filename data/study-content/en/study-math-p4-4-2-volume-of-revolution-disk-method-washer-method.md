## 1. The one-sentence answer
**The disk and washer methods obtain the volume of a solid of revolution by slicing the solid perpendicular to the axis of rotation and summing the volumes of the resulting disks or annular washers via definite integration.**

A region in the plane is rotated around a fixed axis. Every cross-section perpendicular to that axis is a filled circle (disk) when the region touches the axis, or a ring with a hole (washer) when it does not. The area of each slice is therefore \(\pi r^2\) or \(\pi(R^2 - r^2)\). Because the radius may vary continuously with position along the axis, the total volume is recovered by integrating these areas.

The same idea applies whether the axis is the x-axis, y-axis, or any horizontal or vertical line. The only change is which variable is treated as the independent variable of integration and how the outer and inner radii are expressed.

> [!NOTE]
> The decisive insight is that volume is accumulated area, not length: once the cross-sectional area function \(A(x)\) is identified, integration reduces to the single familiar operation \(\int A(x)\,dx\).

## 2. Why this matters — concrete and current
NASA’s Parker Solar Probe heat-shield design uses volumes of revolution to calculate the exact mass of carbon-composite material rotated about the spacecraft axis; the washer method accounts for the central cut-out that reduces weight while preserving thermal protection.

In semiconductor manufacturing, ASML’s extreme-ultraviolet lithography scanners model the molten-tin droplet target as a surface of revolution; disk-method integrals predict the plasma volume generated upon laser impact, directly affecting source power and wafer throughput.

Turbine-blade cooling channels inside GE’s LEAP jet engines are designed by revolving a closed curve around the engine axis; washer integrals give the precise coolant-flow cross-section at every station along the span, controlling both heat transfer and centrifugal stress.

Magnetic-confinement fusion devices such as ITER’s toroidal field coils are wound on surfaces of revolution; the washer method computes the volume of superconductor within each winding pack, which determines the stored magnetic energy and the required cryogenic refrigeration load.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Definite integral        | Converts the continuous sum of slice volumes into a number|
| Area of a circle         | Supplies the integrand \(\pi r^2\)                        |
| Function as graph        | Radius at each x or y is read from the bounding curves    |
| Limits of integration    | Mark the interval along the axis that the solid occupies  |

## 4. Building the idea — from intuition to formalism

### Step 1 — Rotation produces circular cross-sections
Rotating any plane region about an external axis sweeps out a solid whose every perpendicular slice is a disk or washer.  
Example: the rectangle bounded by \(y=0\), \(y=3\), \(x=1\), \(x=2\) rotated about the x-axis yields a cylindrical shell whose every cross-section is a disk of radius 3.  
Formal statement: the intersection of the solid with the plane at fixed \(x\) is a set of concentric circles whose radii are the distances from the axis to the boundary curves.  
> [!WARNING]  
> Treating the slice as a cylinder of constant radius when the radius actually changes with x produces an incorrect volume.

### Step 2 — Area of a single slice
The area of a disk of radius \(R(x)\) is \(\pi[R(x)]^2\).  
For the rectangle above, \(R(x)=3\) so the area is \(9\pi\).  
Formal statement: \(A(x)=\pi[R(x)]^2\).  
> [!WARNING]  
> Forgetting the square on the radius yields a surface-area integral instead of a volume integral.

### Step 3 — From slice to infinitesimal volume
An infinitesimal slice of thickness \(dx\) has volume \(dV=A(x)\,dx\).  
The cylinder example gives \(dV=9\pi\,dx\).  
Formal statement: \(dV=\pi[R(x)]^2\,dx\).  
> [!WARNING]  
> Using \(dy\) when the axis of integration is x mixes variables and produces an inconsistent integral.

### Step 4 — Summation by integration
Summing the infinitesimal volumes from \(a\) to \(b\) yields the definite integral \(\int_a^b\pi[R(x)]^2\,dx\).  
The cylinder integrates to \(9\pi(2-1)=9\pi\).  
Formal statement: volume \(V=\int_a^b A(x)\,dx\).  
> [!WARNING]  
> Reversing the limits without changing sign yields a negative volume, which is physically meaningless.

### Step 5 — Washer method for regions that do not touch the axis
When the region lies between two curves \(y=R(x)\) and \(y=r(x)\), each slice is an annulus whose area is \(\pi(R^2-r^2)\).  
The integral becomes \(\int_a^b\pi([R(x)]^2-[r(x)]^2)\,dx\).  
Formal statement: washer volume \(V=\int_a^b\pi(R_{\text{outer}}^2-R_{\text{inner}}^2)\,dx\).

### Step 6 — Choice of variable
The axis of rotation dictates the variable of integration; the integrand must be expressed in that variable.  
If rotation is about the y-axis, solve all curves for x in terms of y and integrate with respect to y.  
Formal statement: the differential element is always taken perpendicular to the axis of rotation.

### Step 7 — Textbook statement of the disk/washer theorem
Let \(R(x)\) and \(r(x)\) be continuous on \([a,b]\) with \(R(x)\ge r(x)\ge0\). The volume of the solid obtained by rotating the region between the graphs about the x-axis is given by the integral above.

## 5. Worked examples — every step shown

**Example 1 — Disk method, constant radius**  
*Given:* Region under \(y=4\) from \(x=0\) to \(x=3\), rotated about x-axis.  
*Find:* Volume.  
Step 1: radius \(R(x)=4\).  
*Why:* Distance from x-axis to the line is constantly 4.  
Step 2: area \(A(x)=\pi(4)^2=16\pi\).  
*Why:* Disk area formula.  
Step 3: \(V=\int_0^3 16\pi\,dx=16\pi x\big|_0^3=48\pi\).  
**\(48\pi\)**  

*Reflection:* The integrand never varied; the integral simply multiplies constant cross-section by length.

**Example 2 — Disk method, variable radius**  
*Given:* Region under \(y=\sqrt{x}\) from \(x=0\) to \(x=4\), rotated about x-axis.  
*Find:* Volume.  
Step 1: \(R(x)=\sqrt{x}\).  
*Why:* y-value supplies radius.  
Step 2: \(A(x)=\pi(\sqrt{x})^2=\pi x\).  
*Why:* Square removes the root.  
Step 3: \(V=\int_0^4\pi x\,dx=\frac{\pi}{2}x^2\big|_0^4=8\pi\).  
**\(8\pi\)**  

*Reflection:* Squaring the function simplified the integrand before integration.

**Example 3 — Washer method**  
*Given:* Region between \(y=x^2\) and \(y=4\) from \(x=0\) to \(x=2\), rotated about x-axis.  
*Find:* Volume.  
Step 1: outer radius \(R(x)=4\), inner radius \(r(x)=x^2\).  
*Why:* Upper curve farther from axis.  
Step 2: \(A(x)=\pi(16-x^4)\).  
*Why:* Difference of squares.  
Step 3: \(V=\int_0^2\pi(16-x^4)\,dx=\pi(16x-\frac15 x^5)\big|_0^2=\pi(32-\frac{32}5)=\frac{128\pi}5\).  
**\(\dfrac{128\pi}{5}\)**  

*Reflection:* Two radii produce a single integrand; limits unchanged because both curves span the same x-interval.

**Example 4 — Rotation about y-axis, functions solved for x**  
*Given:* Region between \(x=y^2\) and \(x=4\) from \(y=0\) to \(y=2\), rotated about y-axis.  
*Find:* Volume.  
Step 1: outer radius \(x=4\), inner radius \(x=y^2\).  
*Why:* Measured from y-axis.  
Step 2: \(A(y)=\pi(16-y^4)\).  
*Why:* Integrate with respect to y.  
Step 3: \(V=\int_0^2\pi(16-y^4)\,dy=\frac{128\pi}5\).  
**\(\dfrac{128\pi}{5}\)**  

*Reflection:* Swapping variables requires rewriting every radius in the new variable.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Squaring the radius after integration | Confuses area with circumference            | Square inside the integrand before integrating |
| Integrating along the wrong axis  | Forgets slices must be perpendicular to rotation axis | Sketch the axis and draw one perpendicular slice |
| Using the same limits for both radii when curves have different domains | Overlooks that inner and outer functions may start or stop at different points | Determine separate intersection points for each pair of curves |
| Forgetting \(\pi\)                | Treats the integral as an area rather than volume | Write \(\pi\) explicitly in the area formula |
| Mixing dx and dy in one integral  | Changes variable mid-calculation            | Choose one variable and express everything in it |
| Taking absolute value of radius   | Radius is already a distance and non-negative | Drop any absolute-value symbols around radii |
| Rotating about a line other than a coordinate axis without shifting | Forgets to subtract the axis offset from each radius | Replace every radius expression by distance to the actual axis |

## 7. The textbook-precise statement
Let \(f\) and \(g\) be continuous functions on \([a,b]\) satisfying \(f(x)\ge g(x)\ge0\). The volume of the solid generated by rotating the region between the graphs of \(y=f(x)\) and \(y=g(x)\) about the x-axis is
\[
V=\int_a^b\pi\bigl([f(x)]^2-[g(x)]^2\bigr)\,dx.
\]
When \(g\equiv0\) the formula reduces to the disk method. (Stewart, *Calculus*, 9e, §6.2, Theorem 2.)

## 8. Visual — diagram or schematic
```text
y
↑
|   outer radius R(x)
|   ●───────────────────────●
|  /                         \
| /   washer cross-section    \
| |     (annulus)              |
| \                           /
|  \                         /
|   ●───────────────────────●  inner radius r(x)
|   |<------- dx ---------->|
+-----------------------------------> x
          axis of rotation
```
The rectangle between the two curves is rotated about the x-axis; each vertical strip sweeps an annular washer whose outer radius is the upper curve and inner radius the lower curve.

## 9. The memory technique
**The hook** — Picture a stack of coins of varying size sliding along the axis; each coin is a disk or washer, and the integral simply adds their volumes.

**What to overlearn**  
- Disk: \(V=\pi\int R^2\,dx\)  
- Washer: \(V=\pi\int(R_{\text{outer}}^2-R_{\text{inner}}^2)\,dx\)  
- Always square the radius before integrating.

**Spaced-repetition schedule** — Review the two formulas at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.

**First-principles fallback** — Re-derive by writing the area of one perpendicular slice, multiply by thickness \(dx\), then integrate; the geometry of the slice dictates whether the integrand contains one or two radii.

## 10. What this unlocks
Mastery of disk and washer methods supplies the template for every later volume technique that accumulates cross-sectional area.  

- Shell method follows by rotating the differential element parallel rather than perpendicular to the axis.  
- Arc-length integrals replace area \(\pi r^2\) with arc-length element \(\sqrt{1+(y')^2}\).  
- Surface-area integrals revolve the same arc-length element around an axis.  
- Pappus’s centroid theorem generalizes both disk and washer results by revolving an arbitrary plane figure about an external axis.  
- Multiple integrals in three dimensions reduce to these single integrals when cylindrical or spherical symmetry is present.

## 11. Self-check — five questions, no answers
1. Write the volume integral for the region under \(y=e^x\) from \(x=0\) to \(x=1\) rotated about the x-axis.  
2. The region between \(y=x\) and \(y=x^2\) from \(x=0\) to \(x=1\) is rotated about the x-axis. Which curve supplies the outer radius?  
3. A washer integral yields a negative value. Identify the most probable algebraic error.  
4. Rotate the region bounded by \(x=0\), \(x=9-y^2\), and the y-axis about the y-axis. Must the integral be written with respect to y? Why?  
5. Two students obtain different limits of integration for the same solid. Under what geometric condition are both answers correct?