## 1. The one-sentence answer
**The general form of a circle is the equation \(x^2 + y^2 + 2gx + 2fy + c = 0\), from which the centre is directly read as \((-g, -f)\) and the radius as \(\sqrt{g^2 + f^2 - c}\).**

Iska matlab yeh hai ki jab aapko circle ka equation is form mein diya jaaye, to aapko pehle usko standard form \((x - h)^2 + (y - k)^2 = r^2\) mein convert karne ki zaroorat nahi padti har baar. Centre aur radius ke values seedha coefficients se nikal jaate hain. Yeh shortcut coordinate geometry mein bahut time bachata hai jab aap multiple circles compare kar rahe ho ya unke intersections dhundh rahe ho.

Aap is equation ko expand karke dekh sakte ho ki yeh actually \((x + g)^2 + (y + f)^2 = g^2 + f^2 - c\) ban jaata hai. Isliye centre \((-g, -f)\) hota hai. Radius tabhi real hoti hai jab \(g^2 + f^2 - c > 0\).

> [!NOTE]
> Sabse badi aha moment yeh hai ki general form mein linear terms \(2gx\) aur \(2fy\) already centre ki information carry karte hain — aapko sirf unke half coefficients ko negative karke padhna hai.

## 2. Why this matters — concrete and current
In aerospace trajectory planning, SpaceX uses the general circle equation to model circular parking orbits around Earth before transferring to elliptical paths; centre coordinates give the exact offset from Earth’s centre while radius encodes orbital altitude.

Semiconductor mask design at TSMC relies on converting general circle equations into centre-radius form to place circular vias on silicon wafers with sub-nanometre precision, ensuring minimal overlap errors during lithography.

In machine-learning clustering, libraries such as scikit-learn internally convert general quadratic forms (including circles) to centre-radius representation when fitting circular decision boundaries for anomaly detection in sensor data from autonomous vehicles.

Gravitational lensing calculations at the Event Horizon Telescope project treat the photon ring around a black hole as a circle whose general equation is fitted to radio-image pixels; extracting centre and radius lets physicists measure the black-hole shadow diameter directly.

Robotic path planning at Boston Dynamics uses the same conversion when programming circular avoidance zones around obstacles; centre and radius are read from the general equation stored in the robot’s map to compute real-time clearance distances.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Cartesian coordinates    | Every point on the circle is identified by an (x, y) pair |
| Distance formula         | Radius is the Euclidean distance from centre to any point |
| Completing the square    | Converts general form back to standard form when needed   |
| Quadratic equations      | Ensures the radius expression under the square root is non-negative |

Agar completing the square weak hai, to usko pehle revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start from the definition of a circle
A circle is the set of all points at fixed distance r from a centre (h, k). Iska seedha equation \((x - h)^2 + (y - k)^2 = r^2\) banta hai. Jab aap isko expand karte ho, to aapko \(x^2 + y^2 - 2hx - 2ky + (h^2 + k^2 - r^2) = 0\) milta hai.

Example: centre (3, −2), radius 5 → equation becomes \(x^2 + y^2 - 6x + 4y - 12 = 0\).

Formal statement:  
$$x^2 + y^2 + Dx + Ey + F = 0$$  
where \(D = -2h\), \(E = -2k\), \(F = h^2 + k^2 - r^2\).

> [!WARNING]
> Agar aap D aur E ko half karke sign galat laga dete ho, to centre ka sign flip ho jaayega aur pura diagram ulta ban jaayega.

### Step 2 — Rename coefficients for convenience
Log traditionally \(D = 2g\) aur \(E = 2f\) likhte hain, isliye general form \(x^2 + y^2 + 2gx + 2fy + c = 0\) ban jaati hai. Ab centre seedha \((-g, -f)\) ban jaata hai.

### Step 3 — Extract centre
Compare karne se \(2g = D\) ⇒ \(g = D/2\), centre ka x-coordinate \(-g = -D/2\). Same for y.

### Step 4 — Extract radius
Constant term c compare karo: \(c = h^2 + k^2 - r^2\) ⇒ \(r^2 = g^2 + f^2 - c\). Root lena mat bhoolna.

### Step 5 — Condition for real circle
Agar \(g^2 + f^2 - c < 0\), radius imaginary hai — equation koi real circle represent nahi karti.

### Step 6 — Textbook-grade statement
Agar equation \(x^2 + y^2 + 2gx + 2fy + c = 0\) given hai aur \(g^2 + f^2 - c > 0\), to centre \((-g, -f)\) aur radius \(\sqrt{g^2 + f^2 - c}\) hota hai.

## 5. Worked examples — har step show karo

**Example 1 — Direct reading**  
*Given:* \(x^2 + y^2 + 8x - 6y - 11 = 0\)  
*Find:* centre and radius  

Compare with \(x^2 + y^2 + 2gx + 2fy + c = 0\):  
\(2g = 8\) ⇒ \(g = 4\)  
\(2f = -6\) ⇒ \(f = -3\)  
\(c = -11\)  

Centre = \((-g, -f) = (-4, 3)\)  
Radius = \(\sqrt{4^2 + (-3)^2 - (-11)} = \sqrt{16 + 9 + 11} = \sqrt{36} = 6\)  

*Why:* coefficients ko directly half kiya kyunki definition mein 2g aur 2f already present hain.  
**Final answer**  
Centre \((-4, 3)\), radius 6

*Reflection:* Yeh sabse simple case hai; galti sirf sign mein hoti hai.

**Example 2 — Convert to standard form first**  
*Given:* \(x^2 + y^2 - 4x + 10y + 13 = 0\)  
*Find:* centre and radius  

Complete square:  
\((x^2 - 4x) + (y^2 + 10y) = -13\)  
\((x - 2)^2 - 4 + (y + 5)^2 - 25 = -13\)  
\((x - 2)^2 + (y + 5)^2 = 16\)  

Centre \((2, -5)\), radius 4  

*Why:* completing square verify karta hai ki general-form shortcut sahi deta hai.  
**Final answer**  
Centre \((2, -5)\), radius 4

*Reflection:* Dono tareeke same result dete hain.

**Example 3 — Radius zero (point circle)**  
*Given:* \(x^2 + y^2 + 6x - 8y + 25 = 0\)  
\(g = 3\), \(f = -4\), \(c = 25\)  
Radius = \(\sqrt{9 + 16 - 25} = 0\)  

**Final answer**  
Centre \((-3, 4)\), radius 0 (degenerate point circle)

*Reflection:* Condition \(g^2 + f^2 - c = 0\) yaad rakhna zaroori hai.

**Example 4 — Imaginary circle**  
*Given:* \(x^2 + y^2 - 2x - 4y + 10 = 0\)  
Radius = \(\sqrt{1 + 4 - 10} < 0\)  

**Final answer**  
No real circle exists

*Reflection:* Hamesha discriminant check karo pehle.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting the negative sign      | Students read g directly as centre x        | Always write centre = (−g, −f)               |
| Missing the square-root           | Radius formula mein root bhool jaate hain   | Write \(\sqrt{g^2 + f^2 − c}\) explicitly    |
| Sign error in 2f term             | Equation mein +2fy dekh kar f positive lete | Coefficient ko carefully divide by 2         |
| Radius negative under root        | c value badi hoti hai                       | Check \(g^2 + f^2 − c > 0\) before proceeding|
| Treating c as radius              | Confusion with constant term                | Remember c = h² + k² − r²                    |
| Not checking degeneracy           | Zero or negative radius ignore karte hain   | Always compute radius squared first          |
| Confusing general form with line  | Linear terms dekh kar line samajh lete hain | Confirm x² + y
² terms present hain            |

## 7. The textbook-precise statement
Let the equation \(x^2 + y^2 + 2gx + 2fy + c = 0\) be given, where \(g, f, c \in \mathbb{R}\). If \(g^2 + f^2 - c > 0\), then the set of points satisfying the equation is a circle with centre \((-g, -f)\) and radius \(\sqrt{g^2 + f^2 - c}\). If \(g^2 + f^2 - c = 0\), the set reduces to the single point \((-g, -f)\). If \(g^2 + f^2 - c < 0\), the equation represents the empty set in the real plane. (Thomas’ Calculus, 15e, §10.1)

## 8. Visual — diagram or schematic
```
          y
          |
          |       * (x,y)
          |      /
(-g,-f)---C----+------> x
          |   r
          |
```
C = centre at (−g, −f). Har point (x, y) par distance r fixed hoti hai.

## 9. The memory technique
**The hook** — Imagine the letters “g” and “f” sitting at the centre but wearing negative signs like hats; radius is the “growth” you get after subtracting c and taking square root.

**What to overlearn**  
- Centre = (−g, −f)  
- Radius² = g² + f² − c  
- Real circle ⇔ g
² + f² − c > 0

**Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — Expand \((x + g)^2 + (y + f)^2 = r^2\) and match coefficients.

## 10. What this unlocks
Yeh technique aapko directly circle–line intersections, radical axes, and family of circles padhne deta hai.

- Orthogonal circles  
- Circle through three points  
- Power of a point  
- Inversion geometry

## 11. Self-check — five questions, no answers
1. Equation \(x^2 + y^2 - 10x + 8y + 5 = 0\) ka centre aur radius kya hai?  
2. Agar centre (4, −3) aur radius 7 ho, to general form likho.  
3. Equation \(x^2 + y^2 + 2x + 2y + 3 = 0\) real circle represent karti hai kya?  
4. Radius zero hone par equation kis point ko represent karti hai?  
5. Ek student ne centre (g, f) likha — galti kya hai aur sahi value kya hogi?