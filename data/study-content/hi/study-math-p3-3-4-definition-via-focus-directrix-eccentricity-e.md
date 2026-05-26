## 1. The one-sentence answer
A **conic section** is the locus of all points P such that the ratio of the distance from P to a fixed point (the focus) to the distance from P to a fixed line (the directrix) equals a constant e called the eccentricity.

Yeh definition geometry aur algebra dono ko ek saath pakadti hai. Focus ek point hai jo curve ko “khichta” hai, directrix ek line hai jo use “dhakelti” hai, aur unke beech ka constant ratio e decide karta hai ki curve kis shape ka hoga. Agar aap is ratio ko fix karke saare possible points P collect karte ho to aapko automatically ellipse, parabola ya hyperbola mil jaata hai bina kisi coordinate system ke.

Is approach se aap dekh sakte ho ki teen alag-alag curves asal mein ek hi family ki members hain; sirf e ki value badalne se curve ka type change ho jaata hai.

> [!NOTE]
> The single “aha” moment is this: instead of memorising three separate equations, you only need to remember one ratio definition; everything else (including the standard equations) follows by choosing coordinates wisely.

## 2. Why this matters — concrete and current
Kepler’s first law states that planetary orbits are ellipses with the sun at one focus; the eccentricity definition directly gives the orbit shape once the gravitational parameter and angular momentum are known, which is why JPL’s SPICE toolkit still uses focus-directrix parameters for trajectory design.

In satellite communications, engineers at SpaceX and ISRO choose the eccentricity of a transfer orbit so that the apogee distance satisfies the directrix condition for minimum fuel; this is taught in orbital-mechanics courses at MIT and Caltech.

Semiconductor lithography machines from ASML use elliptical mirrors whose reflective surfaces are defined by two foci and a fixed eccentricity; any deviation in e changes the focal spot size and therefore the printed feature size on a chip.

Radio telescopes such as the Five-hundred-meter Aperture Spherical Telescope (FAST) in China shape their secondary reflectors as hyperboloids whose eccentricity is chosen so that rays from the primary focus satisfy the constant-ratio property and reach the feed horn without phase error.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Distance formula | To write PF and the perpendicular distance to the directrix mathematically |
| Ratio            | The constant e is literally a ratio; you must be comfortable comparing two lengths |
| Cartesian plane  | You will later place the focus and directrix on axes to derive equations |

Agar distance formula ya ratio ki samajh weak hai to pause karke coordinate geometry ke basic distance section ko revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Fix the two “anchors”
Aap ek point F (focus) aur ek line D (directrix) choose karte ho. In dono ko fix karne ke baad hi curve ka shape decide hota hai.
Example: F at (0,0) aur D the line x = –p. Har point P(x,y) ke liye aap do distances calculate karte ho.
Formal statement: Let F be a fixed point and D a fixed line in the plane. The set of points P satisfying the ratio condition is the conic.

> [!WARNING]
> Agar aap directrix ko bhi move karte rahe to definition collapse ho jaayegi; both focus and directrix must remain fixed.

### Step 2 — Introduce the constant ratio e
Ab aap ek positive constant e introduce karte ho. Yeh ratio PF/PD = e define karta hai.
Example: Agar e = 1/2 to PF hamesha PD ka aadha hoga.
Formal:  
$$
\frac{PF}{PD} = e, \quad e > 0.
$$

> [!WARNING]
> e ko negative mat lena; distance ratio hamesha non-negative hoti hai, isliye e > 0 by definition.

### Step 3 — Classify the curve by the value of e
- 0 < e < 1 → ellipse  
- e = 1 → parabola  
- e > 1 → hyperbola  

Yeh classification geometry se aati hai, algebra se nahi. Jab aap baad mein equation derive karoge to yahi values discriminant ko control karti hain.

### Step 4 — Write the locus equation without coordinates
Locus = { P | PF = e · PD }. Yeh abhi bhi coordinate-free hai; aapne sirf definition use ki hai.

### Step 5 — Place coordinates to obtain an algebraic equation
Focus ko origin par aur directrix ko x = –p par rakh kar aap distance expressions likh sakte ho aur equation derive kar sakte ho. Yeh step textbook equations tak le jaata hai.

### Step 6 — Recover the standard forms
After simplification you obtain the familiar equations (x²/a² + y²/b² = 1, y² = 4ax, etc.). Har standard form ek special case of the focus-directrix definition hai.

### Step 7 — Verify the eccentricity from the equation
Given any second-degree equation, aap e ko calculate kar sakte ho aur confirm kar sakte ho ki woh kis type ka conic hai. Yeh reverse engineering step hai jo exams mein aksar aata hai.

## 5. Worked examples — har step show karo

**Example 1 — Basic parabola check**
*Given:* Focus F(0,0), directrix x = –2, e = 1.  
*Find:* Equation of the conic and verify a point.  
Step 1: Let P(x,y). Then PF = √(x² + y
²).  
Step 2: PD = |x + 2|.  
Step 3: √(x
² + y²) = 1 · |x + 2|.  
Square both sides: x
² + y² = (x + 2)².  
Expand: x² + y
² = x² + 4x + 4 → y² = 4x + 4.  
*Why:* Squaring removes the square-root and absolute-value simultaneously because both sides are non-negative.  
**Final answer**  
y² = 4(x + 1) (still a parabola, just shifted).  
*Reflection:* Shifting the directrix simply translates the vertex; the eccentricity remains 1.

**Example 2 — Ellipse with e = 1/2**
*Given:* F(0,0), directrix x = –4, e = 1/2.  
*Find:* Locus equation.  
PF = (1/2)PD → 2√(x² + y²) = |x + 4|.  
Square: 4(x
² + y²) = (x + 4)².  
4x² + 4y² = x² + 8x + 16 → 3x² + 4y² – 8x – 16 = 0.  
*Why:* Multiplying by 2 before squaring keeps e inside the algebra cleanly.  
**Final answer**  
3x² + 4y² – 8x – 16 = 0 (ellipse).  
*Reflection:* The coefficient 3 versus 4 already hints at different semi-axes; e = 1/2 tells us it must be an ellipse.

**Example 3 — Hyperbola with e = 2**
*Given:* F(3,0), directrix x = 1, e = 2.  
*Find:* Equation.  
PF = 2·PD.  
√[(x–3)² + y²] = 2|x – 1|.  
Square: (x–3)² + y² = 4(x–1)².  
x² – 6x + 9 + y² = 4(x
² – 2x + 1) → –3x² + 2y
² + 2x + 5 = 0.  
**Final answer**  
3x² – 2y² – 2x – 5 = 0 (hyperbola).  
*Reflection:* Negative coefficient of x² confirms the hyperbola type predicted by e > 1.

**Example 4 — Verify e from a given equation**
*Given:* 9x² + 25y² = 225.  
*Find:* eccentricity using focus-directrix definition.  
Rewrite: x
²/25 + y²/9 = 1 → a = 5, b = 3.  
c = √(a² – b
²) = 4.  
e = c/a = 4/5 = 0.8.  
Directrix: x = ±a/e = ±25/4.  
*Why:* The relation e = c/a is derived from the focus-directrix definition, so it must hold.  
**Final answer**  
e = 4/5, directrices x = ±25/4.  
*Reflection:* You recovered e without ever drawing the curve; the algebraic invariants are sufficient.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                                      |
|-----------------------------|---------------------------------------------|------------------------------------------------------|
| Forgetting absolute value on PD | Students treat distance as signed           | Always write |ax + by + c|/√(a²+b
²) for line distance |
| Squaring both sides when e ≠ 1 | Extra solutions appear if signs ignored     | Check that both sides are non-negative before squaring |
| Using two foci instead of one focus + directrix | Confusion with ellipse definition           | Remember the given definition uses only one focus    |
| Taking e < 0                | Thinking ratio can be negative              | State e > 0 explicitly at the start                  |
| Placing directrix through focus | Makes PD = 0 for some points                | Ensure perpendicular distance from focus to directrix > 0 |
| Mixing up a and ae in ellipse | Forgetting c = ae                           | Derive c from e first, then a = c/e                  |
| Assuming all conics are centred at origin | Coordinate choice not stated                | Always mention the coordinate system you chose       |

## 7. The textbook-precise statement
A conic section is the set of all points P in the Euclidean plane such that  
$$
\frac{|PF|}{|Pd(P,\ell)|} = e,
$$  
where F is a fixed point (focus), ℓ is a fixed line (directrix) not containing F, and e > 0 is a constant (eccentricity). When e = 1 the set is a parabola, when 0 < e < 1 an ellipse, and when e > 1 a hyperbola (Thomas’ Calculus, 15th ed., §10.6, Definition 1).

## 8. Visual — diagram or schematic
```
          directrix
              |
              |   P
              |  /
              | /  PF
F-------------+--------> x-axis
   (focus)     d
              |
```
F at (0,0), directrix x = –p. Any point P satisfies PF = e · (horizontal distance to the vertical line).

## 9. The memory technique
1. **The hook** — Imagine a goat tied to a stake (focus) that is also scared of a straight fence (directrix); the rope-to-fence ratio is always e, tracing the conic.
2. **What to overlearn** — PF = e · PD; 0 < e < 1 ellipse, e = 1 parabola, e > 1 hyperbola.
3. **Spaced-repetition schedule** — Review the definition after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — If you forget the names, redraw the locus by picking 5–6 points that keep the measured ratio exactly e; the shape appears automatically.

## 10. What this unlocks
Once you own the focus-directrix definition you can derive every standard equation, understand reflection properties, and move directly into orbital mechanics or optical design.

- Polar equation of conics with focus as pole  
- Reflective property proofs for ellipse and parabola  
- Kepler problem and specific angular momentum  
- Conic fitting in computer-vision libraries (OpenCV)

## 11. Self-check — five questions, no answers
1. A point moves so that its distance to (2,0) is always 1.5 times its distance to the line x = –2. What is its eccentricity and type?  
2. Derive the equation of the conic with focus (0,3), directrix y = –3 and e = 2/3.  
3. Show that the curve 16x² – 9y² = 144 satisfies the focus-directrix definition with e = 5/4.  
4. If the directrix is moved twice as far from the focus while e is kept constant, how does the size of the resulting ellipse change?  
5. A student obtained the equation y² = –4x after squaring. Which step most likely introduced an extraneous solution?