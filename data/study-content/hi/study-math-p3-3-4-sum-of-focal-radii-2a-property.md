## 1. The one-sentence answer
**For every point P on an ellipse, the sum of distances from P to the two foci equals exactly 2a, the length of the major axis.**

Iska matlab yeh hai ki ellipse ki definition mein hi yeh constant sum built-in hai. Jab aap kisi bhi point ko choose karte ho on the curve, dono foci tak ki distances ka total hamesha same rehta hai. Yeh property sirf ellipse ke liye valid hai, circle ko chhod kar baaki conics mein nahi.

Yeh constant 2a major axis ke length ke barabar hota hai kyunki vertices par yeh sum directly measure kiya ja sakta hai. Agar aap foci ko move karte ho (eccentricity badhaate hue), tab bhi sum fixed rehta hai jab tak a same rahe.

> [!NOTE]
> The defining “aha” is that the ellipse is the only curve where this sum remains invariant; this single constancy forces the quadratic equation we later call the ellipse.

## 2. Why this matters — concrete and current
In orbital mechanics, every elliptical orbit around Earth satisfies PF₁ + PF₂ = 2a; this lets mission planners at ISRO and NASA compute transfer times without integrating the full trajectory each time.

Semiconductor mask writers use elliptical laser spots whose focal-sum property keeps the exposure dosage uniform across the wafer even when the beam is off-axis.

In whispering-gallery acoustics, elliptical domes in the Gol Gumbaz or modern concert halls rely on the same sum being constant so sound from one focus reaches the other focus with fixed path length and therefore fixed phase.

GPS receivers correct ionospheric delay by treating the satellite-receiver path as one focal radius of a very flat ellipse whose second focus lies at the Earth’s centre; the 2a constraint supplies an extra equation that reduces the number of unknowns.

In machine-vision cameras, elliptical mirrors focus light from an LED onto a sensor; the constant-sum rule guarantees that every ray takes the same optical path length, preserving pulse timing to picoseconds.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Distance formula         | To write PF₁ and PF₂ mathematically                       |
| Definition of focus      | To locate the two fixed points inside the ellipse         |
| Major-axis length 2a     | To recognise the constant value of the sum                |
| Standard ellipse equation| To verify the property algebraically after derivation     |

Agar distance formula ya focus ki location aapko clear nahi, to pehle unhe revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Visualise two pins and a string
Aap ek string ko do pins (foci) ke around lapet kar ek tight loop banate ho; jab pencil string ko stretch karke ghumaate ho, to har jagah total string length same rehti hai. Yeh length hi 2a hai.

Concrete example: foci at (−1,0) aur (1,0), string length 4. Jab pencil (0,√3) par pahunchta hai, dono distances 2 + 2 = 4.

Formal statement: Let F₁(−c,0), F₂(c,0) aur P(x,y) ellipse par ho. Then  
$$PF_1 + PF_2 = 2a.$$

> [!WARNING]
> Agar aap string length ko 2a se chhota lete ho, curve hi nahi banti; isliye 2a > 2c hona zaroori hai.

### Step 2 — Place the foci from eccentricity
c = ae, jahaan e < 1. Isse foci ki position a ke hisaab se nikalti hai.

### Step 3 — Write distances explicitly
$$PF_1 = \sqrt{(x + c)^2 + y^2}, \quad PF_2 = \sqrt{(x - c)^2 + y^2}.$$

### Step 4 — Add the square roots and simplify
After squaring twice aur ellipse equation \(\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1\) use karne par, sum exactly 2a par pahunchta hai.

### Step 5 — Verify at the vertices
Vertices (±a,0) par: distance to nearer focus = a − c, to farther = a + c; total 2a. Property holds.

### Step 6 — Textbook-grade statement
Any point on the ellipse satisfies the constant-sum definition; conversely, the locus of points whose sum of distances to two fixed points is constant is an ellipse.

## 5. Worked examples — har step show karo

**Example 1 — Vertex check**  
*Given:* Ellipse \(\frac{x^2}{16} + \frac{y^2}{9} = 1\), foci (±√7,0).  
*Find:* Sum at (4,0).  
Step 1: c = √7.  
Step 2: Distance to F₁ = 4 − √7, to F₂ = 4 + √7.  
Step 3: Sum = 8 = 2a.  
*Why* each move: Direct substitution verifies definition.  
**8**

*Reflection:* Trivial case, yet proves constant equals major-axis length.

**Example 2 — End of minor axis**  
*Given:* Same ellipse, point (0,3).  
*Find:* Sum of focal radii.  
Distance to F₁: √((0+√7)² + 3²) = √(7+9) = 4.  
Distance to F₂: identical by symmetry = 4.  
Sum = 8.  
*Why* symmetry works: Both foci equidistant from y-axis.  
**8**

*Reflection:* Shows property holds off the major axis.

**Example 3 — Arbitrary interior point on curve**  
*Given:* Point (2, (3√3)/2) on same ellipse.  
*Find:* PF₁ + PF₂.  
Compute PF₁ = √((2+√7)² + (3√3/2)²) = √(4 + 2√28 + 7 + 6.75) = 4 after simplification using ellipse relation.  
PF₂ likewise 4. Sum = 8.  
*Why* algebra collapses: The ellipse equation forces the cross terms to cancel.  
**8**

*Reflection:* Demonstrates algebraic necessity of the property.

**Example 4 — Numerical verification with e = 0.5**  
*Given:* a = 5, e = 0.5 → c = 2.5, b = √(25−6.25) = √18.75.  
Point (0,b). Sum must be 10. Direct distance calculation yields 2 × √(2.5² + 18.75) = 10.  
*Why* we trust it: Matches 2a regardless of b.  
**10**

*Reflection:* Generalises to any eccentricity < 1.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using 2a = 2c                     | Confusing major axis with focal distance    | Always enforce a > c before starting         |
| Forgetting to square twice        | Algebraic mess after first squaring         | Keep both square-root terms till second squaring |
| Taking point inside ellipse       | Sum becomes < 2a                            | Verify point satisfies ellipse equation first|
| Swapping a and b                  | Reading minor axis as 2a                    | Check which denominator is larger            |
| Using hyperbolic identity         | Mixing PF₁ − PF₂ = 2a instead of sum        | Write “sum” explicitly in every line         |
| Assuming foci at (±a,0)           | Placing foci at vertices                    | Calculate c = √(a² − b²) every time          |
| Ignoring sign of coordinates      | Distance formula yields negative under sqrt | Square both sides before taking roots        |

## 7. The textbook-precise statement
Definition (Thomas’ Calculus, 15th ed., §10.1): An ellipse is the set of all points in the plane the sum of whose distances from two fixed points F₁ and F₂ (the foci) is a positive constant 2a. Equivalently, the equation \(\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1\) with 0 < b < a implies that for every point P(x,y) on the curve,  
$$ \sqrt{(x + c)^2 + y^2} + \sqrt{(x - c)^2 + y^2} = 2a, \quad c = \sqrt{a^2 - b^2}. $$

## 8. Visual — diagram or schematic
```
          y
          |
      b   |     P(x,y)
          |    /   \
   F1-----C-----F2
 (-c,0)  (0,0)  (c,0)
          |    \   /
          |     \ /
         -b   |
          |
         -a-----a-----x
```
F₁ aur F₂ foci hain; har P ke liye dotted lines ki lengths ka total = 2a.

## 9. The memory technique
1. **The hook** — Imagine a rigid ring of string looped around two thumbtacks; the pencil never stretches the ring, so total length stays 2a.
2. **What to overlearn** — 2a is constant; c = ae; b² = a² − c
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from distance formula, add the two square roots, square twice, substitute ellipse equation; the radicals cancel leaving 2a.

## 10. What this unlocks
Yeh property aage ke liye direct tool ban jaati hai.

- Reflection property of tangents
- Kepler’s first law derivation
- Parametric equations aur eccentric angle
- Directrix-eccentricity definition equivalence
- Area aur arc-length integrals of ellipse

## 11. Self-check — five questions, no answers
1. For the ellipse \(\frac{x^2}{25} + \frac{y^2}{16} = 1\), compute the sum of focal radii at (3, 16/5).
2. If the sum of focal radii is 10 and distance between foci is 8, find a and c.
3. A point (x,y) satisfies PF₁ + PF₂ = 6 but lies inside the ellipse of Example 1; what inequality must hold?
4. Show that the sum at the end of the latus rectum equals 2a without using coordinates.
5. Two ellipses share the same foci but different 2a values; can they intersect at more than two points? Why?