## 1. The one-sentence answer
**The standard form (x-h)² + (y-k)² = r² directly encodes the geometric definition of a circle: every point (x,y) lies at fixed distance r from a centre (h,k).**

Iska matlab yeh hai ki aapko centre aur radius dekar turant equation likh sakte hain, aur equation dekar centre aur radius nikaal sakte hain. Yeh form Pythagorean distance ko coordinate plane par directly translate karti hai bina kisi extra terms ke. Jab aap is equation ko expand karte hain to general form x² + y² + Dx + Ey + F = 0 milta hai, lekin standard form sabse clean aur readable rehta hai.

> [!NOTE]
> The single “aha” is that the squared distances from (x,y) to (h,k) must always equal r²; this equality is both the definition and the equation—no further derivation needed once distance formula is accepted.

## 2. Why this matters — concrete and current
In GPS receivers, satellites broadcast their positions; your phone solves simultaneous circle equations (one per satellite) whose intersections give your latitude-longitude fix within metres.

Computer graphics pipelines in Unity and Unreal Engine store every circular light source or collision boundary in (h,k,r) form so that GPU shaders can test point-in-circle conditions in constant time.

Semiconductor lithography machines from ASML align circular wafer edges by fitting measured edge points to the same equation; sub-nanometre accuracy in centre location determines chip yield.

Planetary ephemerides at NASA JPL model asteroid orbits as near-circular paths around the Sun; the standard form supplies the initial two-body guess before perturbations are added.

Medical CT scanners reconstruct circular cross-sections of blood vessels; the Hough-transform algorithm inside reconstruction software votes for candidate (h,k,r) triples exactly in this parameterisation.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Distance formula | Directly produces (x-h)² + (y-k)² = r²                    |
| Square of a number | Removes the square-root that appears in raw distance      |
| Cartesian plane  | Supplies the ordered-pair language for points (x,y)       |
| Equality vs identity | Distinguishes the locus (all points satisfying equality) from arbitrary points |

Agar distance formula ya coordinate plane clear nahi hai, to wapas jaakar woh pehle padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Distance stays constant
Aapko sirf yeh samajhna hai ki circle ke har point ka centre se distance ek hi number r hota hai.  
Example: centre (3,4) aur radius 5 liya to (3+5,4) = (8,4) ka distance 5 hai, (3,4+5) = (3,9) ka distance bhi 5 hai.  
Formal: distance between (x,y) and (h,k) equals r.  
$$ \sqrt{(x-h)^2 + (y-k)^2} = r $$

> [!WARNING]
> Agar aap yahan distance ko sirf “lagbhag barabar” maan lete ho, to equation ek inequality ban jaati hai aur circle nahi banta.

### Step 2 — Square both sides
Square-root hatao taaki algebra asaan ho.  
Example: upar wale points par dono taraf square karne se 25 = 25 milta hai.  
Formal statement:  
$$ (x-h)^2 + (y-k)^2 = r^2 $$

### Step 3 — Identify parameters
(h,k) centre hai, r radius hai. In teeno numbers ko jaan kar equation turant likhi ja sakti hai.  
Example: centre (−2,1), r = 7 → (x+2)² + (y−1)² = 49.

### Step 4 — Verify a point lies on circle
Kisi bhi point (x₀,y₀) ko equation mein daal kar dekho ki equality satisfy hoti hai ya nahi.  
Example: (5,1) ko (x−3)² + (y+2)² = 25 mein daalne par 4 + 9 = 13 ≠ 25, isliye point circle par nahi hai.

### Step 5 — Recover centre and radius from equation
Agar equation already (x−h)² + (y−k)² = r² form mein hai, to coefficients seedha padh lo.  
Example: (x+7)² + (y−4)² = 36 → h = −7, k = 4, r = 6.

### Step 6 — Textbook-grade statement
Jab (h,k,r) given ho to equation (x−h)² + (y−k)² = r² hi circle ka unique standard description hai.

## 5. Worked examples — har step show karo

**Example 1 — Centre and radius directly given**  
*Given:* Centre (1,−3), radius 4.  
*Find:* Equation.  
Step 1: h = 1, k = −3, r = 4 likho.  
Step 2: Standard form mein daal do.  
$$ (x-1)^2 + (y+3)^2 = 16 $$  
*Why:* Parameters ko sahi jagah rakhne se equation turant ban jaati hai.  
**Final answer**  
$$ (x-1)^2 + (y+3)^2 = 16 $$

*Reflection:* Yeh sabse simple case hai; galti sirf sign mein hoti hai.

**Example 2 — Point and centre given, radius nikaalo**  
*Given:* Centre (−2,5), point (1,9) circle par hai.  
*Find:* Equation.  
Step 1: Radius nikaalo:  
$$ r = \sqrt{(1-(-2))^2 + (9-5)^2} = \sqrt{9+16} = 5 $$  
Step 2: Standard form likho.  
$$ (x+2)^2 + (y-5)^2 = 25 $$  
*Why:* Distance formula se r nikaal kar equation complete hoti hai.  
**Final answer**  
$$ (x+2)^2 + (y-5)^2 = 25 $$

*Reflection:* Radius calculation galat ho to poora equation galat ho jaata hai.

**Example 3 — Equation se centre-radius nikaalna**  
*Given:* (x−4)² + (y+1)² = 9.  
*Find:* Centre, radius, aur verify point (4,2).  
Step 1: h = 4, k = −1, r = 3 padho.  
Step 2: Point check karo: (4−4)² + (2+1)² = 9 = 9, sahi hai.  
**Final answer**  
Centre (4,−1), radius 3.

*Reflection:* Sign flip (y+1) ko (y−(−1)) samajhna zaroori hai.

**Example 4 — Three points se circle nikaalna (escalated)**  
*Given:* Points A(1,1), B(5,1), C(3,4).  
*Find:* Equation.  
Step 1: Perpendicular bisector of AB: midpoint (3,1), vertical line x = 3.  
Step 2: Perpendicular bisector of AC: midpoint (2,2.5), slope of AC = 3/2 → perpendicular slope −2/3.  
Equation: y−2.5 = (−2/3)(x−2).  
Step 3: x = 3 daal kar k = 2.5 − (2/3)(1) = 11/6.  
Step 4: Radius from centre (3,11/6) to A.  
$$ r^2 = (3-1)^2 + (11/6-1)^2 = 4 + (5/6)^2 = 169/36 $$  
**Final answer**  
$$ (x-3)^2 + (y-11/6)^2 = 169/36 $$

*Reflection:* Teen points wala case general form solve karne ki zaroorat dikhata hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Writing (x+h) instead of (x−h) | Sign of h ko bhool jaana                    | h ko centre x-coordinate maano, minus sign fixed rakho |
| Forgetting to square r      | Radius ko linear sochna                     | r² likhne se pehle r ko square kar lo        |
| Treating (h,k) as a point on circle | Centre aur circumference ko mix karna       | Centre plug-in karne par left side zero aata hai, yeh check karo |
| Expanding before identifying parameters | General form jaldi dekhna                   | Pehle standard form ko padho, expand sirf jab maanga jaaye |
| Radius negative lena        | Square-root galat nikaalna                  | r = √(number) hamesha non-negative hota hai  |
| Using = r instead of = r²   | Distance formula ka square-root bhoolna     | Dono taraf square karne ka step yaad rakho   |
| Assuming all circles pass through origin | Extra assumption add karna                  | Equation mein (0,0) daal kar verify karo     |

## 7. The textbook-precise statement
A circle with centre (h,k) and radius r > 0 is the locus of all points (x,y) in the plane satisfying  
$$ (x-h)^2 + (y-k)^2 = r^2. $$  
Here h,k ∈ ℝ and r is a positive real number. This is the unique equation of degree two whose level set is exactly that circle (Stewart, *Calculus*, 9e, §1.8, Definition of a Circle).

## 8. Visual — diagram or schematic
```
          y
          ^
          |
          |      (h,k)
          |       •  ← centre
          |      /|\
          |   r / | \ r
          |    /  |  \
----------+---+---+---+---> x
          |       •
          |     (x,y) on circle
```
Horizontal axis x, vertical axis y. Centre marked at arbitrary (h,k). Every point on the circumference satisfies distance r to centre.

## 9. The memory technique
1. **The hook** — Imagine a radio tower at (h,k) broadcasting exactly distance r; every listener on the circle hears the same signal strength.
2. **What to overlearn** — (x−h)² + (y−k)² = r² and the fact that h,k are subtracted, r is squared.
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Distance formula yaad na ho to (x−h) aur (y−k) ke differences ke squares ka sum r² ke barabar likh do.

## 10. What this unlocks
Yeh form aapko turant centre-radius de deta hai, jo agle topics ke liye zaroori hai.  
- General equation x² + y² + Dx + Ey + F = 0 ko complete-the-square se standard form mein laana.  
- Do circles ke intersection points nikaalna.  
- Circle-line intersections aur tangents.  
- Conic sections ke family mein circle ko pehchanna.

## 11. Self-check — five questions, no answers
1. Centre (0,0) aur radius √2 wali circle ka equation likho.  
2. Equation (x+3)² + (y−7)² = 4 se centre aur radius nikaalo.  
3. Kya point (−1,4) circle (x−2)² + (y+1)² = 25 par hai?  
4. Teen points (0,0), (4,0), (2,3) se guzarti circle ka standard equation likho.  
5. Agar equation (x−h)² + (y−k)² = −9 ho to kya yeh kisi real circle ko represent karti hai? Kyun?