## 1. The one-sentence answer
**The general form \(x^2 + y^2 + Dx + Ey + F = 0\) is an expanded equation of a circle whose centre and radius become visible only after rewriting it by completing the square.**

Any circle equation can be rearranged into this expanded polynomial. The coefficients \(D\), \(E\), and \(F\) contain the location of the centre and the size of the radius, but they are hidden inside linear and constant terms. Completing the square isolates the squared binomials that directly display the centre coordinates and the radius length.

The conversion works because every circle satisfies the distance definition \((x - h)^2 + (y - k)^2 = r^2\). Expanding that definition produces exactly the general form, so reversing the expansion recovers \(h\), \(k\), and \(r\).

> [!NOTE]
> The centre is always at \((-D/2, -E/2)\) and the radius is \(\sqrt{(D/2)^2 + (E/2)^2 - F}\); memorising these two expressions removes the need to complete the square on every problem.

## 2. Why this matters — concrete and current
In GPS receivers manufactured by Garmin and u-blox, satellite ranging data are first expressed as quadratic distance equations; converting each to standard circle form locates the receiver position in real time.

Semiconductor lithography machines at ASML use circle-fitting algorithms on alignment marks; the general-form coefficients are extracted from camera pixels and immediately converted to centre coordinates to align wafers within nanometres.

MRI scanners at Siemens Healthineers reconstruct circular cross-sections of blood vessels from gradient-echo data; the general equation is fitted to edge points and converted to centre-radius form to compute vessel diameter for stenosis diagnosis.

Collision-avoidance software on autonomous drones from DJI maintains circular safety buffers around obstacles; the buffers are stored in general form for fast intersection tests and converted to standard form only when a pilot requests a visual radius readout.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Distance formula         | Defines the circle as all points at fixed distance from centre |
| Completing the square    | Rewrites \(x^2 + Dx\) as \((x + D/2)^2 - (D/2)^2\)        |
| Binomial expansion       | Shows why the general form and standard form are equivalent |

## 4. Building the idea — from intuition to formalism

### Step 1 — Recognise the two algebraic faces of a circle
A circle is the set of points at constant distance \(r\) from a centre \((h,k)\).  
Example: centre \((3,4)\), radius 5 gives \((x-3)^2 + (y-4)^2 = 25\).  
Expanding yields the general form:
\[
x^2 + y^2 - 6x - 8y + 0 = 0.
\]
> [!WARNING]
> If the constant term after expansion is written on the left side, the sign of \(F\) will be reversed and the radius formula will produce an imaginary number.

### Step 2 — Isolate the quadratic and linear terms
Group the \(x\) terms and the \(y\) terms while moving the constant to the right side:
\[
x^2 + Dx + y^2 + Ey = -F.
\]

### Step 3 — Complete the square for \(x\)
Add and subtract \((D/2)^2\) inside the \(x\) group:
\[
x^2 + Dx + (D/2)^2 + y^2 + Ey = -F + (D/2)^2.
\]
This produces
\[
(x + D/2)^2.
\]

### Step 4 — Complete the square for \(y\)
Add and subtract \((E/2)^2\) on the left:
\[
(x + D/2)^2 + (y + E/2)^2 = -F + (D/2)^2 + (E/2)^2.
\]
The right-hand side must be positive for a real circle.

### Step 5 — Read the centre and radius directly
The equation is now in standard form, so
\[
h = -D/2, \quad k = -E/2, \quad r = \sqrt{(D/2)^2 + (E/2)^2 - F}.
\]
This is the textbook statement of the conversion.

## 5. Worked examples — every step shown

**Example 1 — Simple coefficients, positive radius**  
*Given:* \(x^2 + y^2 + 4x - 6y - 12 = 0\)  
*Find:* centre and radius.  

Move constant:  
\(x^2 + 4x + y^2 - 6y = 12\)  
*Why:* isolates quadratics and linears.  

Complete square for \(x\):  
\(x^2 + 4x + 4 + y^2 - 6y = 12 + 4\)  
*Why:* adds \((4/2)^2\).  

Complete square for \(y\):  
\((x + 2)^2 + (y - 3)^2 = 16 + 9\)  
*Why:* adds \((-6/2)^2 = 9\).  

**Final answer**  
\((x + 2)^2 + (y - 3)^2 = 25\)  
Centre \((-2, 3)\), radius 5.  

*Reflection:* All signs flipped correctly because each linear coefficient was halved and then negated.

**Example 2 — Negative linear coefficient for y**  
*Given:* \(x^2 + y^2 - 8x - 10y + 5 = 0\)  
*Find:* centre and radius.  

\(x^2 - 8x + y^2 - 10y = -5\)  
Add 16 and 25:  
\((x - 4)^2 + (y - 5)^2 = 36\)  
**Final answer**  
Centre \((4, 5)\), radius 6.

*Reflection:* The constant moved to the right changes sign; forgetting this produces a negative radius squared.

**Example 3 — Using the direct formula without completing squares**  
*Given:* \(x^2 + y^2 + 2x + 2y - 11 = 0\)  
*Find:* centre and radius via formulas.  

\(D = 2\), \(E = 2\), \(F = -11\)  
\(h = -2/2 = -1\), \(k = -2/2 = -1\)  
\(r = \sqrt{1 + 1 + 11} = \sqrt{13}\)  
**Final answer**  
Centre \((-1, -1)\), radius \(\sqrt{13}\).

*Reflection:* The formula bypasses intermediate steps once the pattern is internalised.

**Example 4 — Degenerate case (no real circle)**  
*Given:* \(x^2 + y^2 + 6x + 8y + 25 = 0\)  
*Find:* radius.  

\(D = 6\), \(E = 8\), \(F = 25\)  
\(r^2 = 9 + 16 - 25 = 0\)  
**Final answer**  
Radius 0 (a single point, not a circle).

*Reflection:* Always verify \(r^2 > 0\) before claiming a circle exists.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Sign error on \(h = -D/2\)        | Forgetting the expansion produces \(-2h = D\) | Write the expansion once and keep it visible |
| Treating \(F\) as already moved   | Equation sometimes written with \(= -F\)    | Always move constant first, then check sign  |
| Radius squared left under radical | Stopping after \(r^2\) calculation          | Explicitly take square root and verify positive |
| Missing the factor of ½ on both D and E | Halving only one coefficient                | Compute \(D/2\) and \(E/2\) in one line      |
| Assuming every general equation is a circle | Degenerate cases when \(r^2 \le 0\)         | Compute \(r^2\) before naming centre/radius  |
| Confusing general form with line equation | Both contain \(Dx + Ey + F\)                | Check for \(x^2 + y^2\) terms first          |
| Arithmetic slip when \(D\) or \(E\) is odd | Fractions appear after halving              | Keep fractions until final radius            |

## 7. The textbook-precise statement
A circle with centre \((h,k)\) and radius \(r > 0\) has equation
\[
(x - h)^2 + (y - k)^2 = r^2.
\]
Expanding and collecting like terms produces the general form
\[
x^2 + y^2 + Dx + Ey + F = 0,
\]
where
\[
D = -2h, \quad E = -2k, \quad F = h^2 + k^2 - r^2.
\]
Conversely, given the general form with \(D^2 + E^2 - 4F > 0\), the centre and radius are recovered by
\[
h = -D/2, \quad k = -E/2, \quad r = \sqrt{(D/2)^2 + (E/2)^2 - F}.
\]
(Stewart, *Calculus*, 9e, §1.9, Equation 4 and Exercise 1.9.42.)

## 8. Visual — diagram or schematic
```text
          y
          ^
          |
     +----|-------------+
    /     |      C      \
   /      |   (-D/2,-E/2) \
  /       |        •       \
 /        |                 \
|         |                  |
|         +------------------> x
 \        |                 /
  \       |               /
   \      |             /
    \     |           /
     +----|---------+
          |
```
The diagram shows a circle whose centre lies at the point whose coordinates are exactly half the negated linear coefficients; the constant \(F\) determines how far the radius extends from that centre.

## 9. The memory technique

1. **The hook**  
   Picture the linear terms \(Dx + Ey\) as two arrows pointing from the origin toward the centre; each arrow must be cut in half and reversed, giving the mnemonic “half and flip”.

2. **What to overlearn**  
   - Centre = \((-D/2, -E/2)\)  
   - Radius squared = \((D/2)^2 + (E/2)^2 - F\)  
   - \(r^2\) must be positive.

3. **Spaced-repetition schedule**  
   Review at 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback**  
   Expand \((x + D/2)^2 + (y + E/2)^2\) and match coefficients with the given general equation; the constant term immediately yields \(r^2\).

## 10. What this unlocks
Mastery of the general-to-standard conversion lets you move without friction into the full family of conic sections, where the same completing-the-square technique classifies ellipses, hyperbolas, and parabolas. It also supplies the algebraic engine behind circle–circle intersection tests used in computational geometry and robotic path planning.

- Equation of tangent to a circle  
- Radical axis of two circles  
- Inversion geometry and circle families  
- Least-squares circle fitting in computer vision

## 11. Self-check — five questions, no answers
1. Convert \(x^2 + y^2 - 10x + 4y + 13 = 0\) to standard form and state centre and radius.  
2. A circle has general equation \(x^2 + y^2 + Dx + Ey + F = 0\). If the centre is \((2,-3)\), what are the values of \(D\) and \(E\)?  
3. Show that the equation \(x^2 + y^2 + 2x + 2y + 3 = 0\) does not represent a real circle.  
4. Two circles are given by \(x^2 + y^2 - 4x + 6y - 12 = 0\) and \(x^2 + y^2 + 2x - 2y - 1 = 0\). Without finding their intersection points, determine whether one lies inside the other.  
5. Derive the radius formula directly from the expansion of \((x - h)^2 + (y - k)^2 = r^2\) without completing the square on a specific numerical example.