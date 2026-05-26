## 1. The one-sentence answer
**A hyperbola is the conic section defined by the set of points where the absolute difference of distances to two fixed foci remains constant, producing two separate branches with linear asymptotes.**

Iska matlab yeh hai ki hyperbola ek aisi curve hai jo do foci se dooriyon ke difference ko fixed rakhti hai. Jab aap is difference ko constant maante ho, toh naturally do branches ban jaati hain jo kabhi nahi milti. Standard equation mein yeh difference 2a ke barabar hota hai aur foci ke beech ki doori 2c hoti hai jahaan c > a.

Eccentricity e = c/a hamesha 1 se badi hoti hai, jo hyperbola ko ellipse (e < 1) se alag karti hai. Asymptotes woh lines hain jinke kareeb branches jaati hain lekin unhe touch nahi karti.

> [!NOTE]
> Sabse badi aha moment yeh hai ki hyperbola ki definition mein “difference” (subtraction) use hota hai, jabki ellipse mein “sum” (addition) use hota hai — yahi ek sign change dono curves ko bilkul alag bana deta hai.

## 2. Why this matters — concrete and current
Orbital mechanics mein hyperbolic trajectories spacecraft ko gravitational slingshot dene ke liye use hoti hain; NASA ke Voyager missions ne Jupiter aur Saturn ke gravity assist ke through hyperbolic paths follow kiye the.

Semiconductor lithography machines (ASML ke EUV scanners) mein hyperbolic mirrors light ko focus karne ke liye design kiye jaate hain kyunki unki reflective properties eccentricity par depend karti hain.

Radio telescope arrays jaise Event Horizon Telescope hyperbolic reflectors ka use karte hain distant signals ko collect karne ke liye jahaan signal strength eccentricity se control hoti hai.

Special relativity mein hyperbolic functions (cosh, sinh) Minkowski space-time diagrams mein Lorentz transformations ko represent karte hain; yeh particle physics accelerators jaise CERN ke LHC mein daily calculations mein aate hain.

Acoustic engineering mein certain concert hall designs hyperbolic ceiling curves use karte hain taaki sound waves specific foci par concentrate hon bina distortion ke.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Distance formula     | Foci aur points ke beech distance calculate karne ke liye |
| Definition of conic  | Hyperbola ko circle/ellipse/parabola se compare karne ke liye |
| Asymptote behaviour  | Branches ki limiting lines samajhne ke liye               |
| Square root domain   | Equation solve karte waqt valid values check karne ke liye |

Agar distance formula ya conic definition weak hai toh pehle woh revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start with the locus definition
Hyperbola un points ka set hai jahaan do fixed points (foci) se distances ka absolute difference ek constant number (2a) ke barabar hota hai.  
Concrete example: foci (5,0) aur (-5,0) par rakho aur difference = 6 rakho. Ek point (x,y) ke liye |distance to first focus − distance to second focus| = 6.  
Formal statement:  
$$| \sqrt{(x - c)^2 + y^2} - \sqrt{(x + c)^2 + y^2} | = 2a$$  
> [!WARNING]
> Agar aap difference ki jagah sum likh do toh equation ellipse ban jaayegi — definition ka sign galat padne se poora curve type badal jaata hai.

### Step 2 — Simplify to standard form
Distance equation ko square karke aur simplify karke aap (x²/a²) − (y²/b²) = 1 paate ho jahaan b² = c² − a².  
Example: c = 5, a = 3 → b² = 16. Equation ban jaati hai x²/9 − y
²/16 = 1.  
Formal:  
$$\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1, \quad b^2 = c^2 - a^2, \quad c > a > 0$$

### Step 3 — Locate the foci and eccentricity
Foci (±c, 0) par hote hain. Eccentricity e = c/a > 1 define karte hain.  
Example: a = 3, c = 5 → e = 5/3 ≈ 1.67.  
Formal: foci at (±ae, 0) aur e > 1.

### Step 4 — Derive the asymptotes
Jab x aur y bade ho jaayein toh equation mein dominant terms x²/a
² − y²/b² ≈ 0 ban jaate hain. Isse lines y = ±(b/a)x nikalti hain.  
Formal: asymptotes  
$$y = \pm \frac{b}{a}x$$

### Step 5 — Write both standard orientations
Agar transverse axis vertical ho toh equation (y
²/a²) − (x²/b²) = 1 ban jaati hai. Foci (0, ±c) aur asymptotes y = ±(a/b)x.  
Formal statements cover both cases with corresponding foci and asymptote slopes.

## 5. Worked examples — har step show karo

**Example 1 — Basic parameter extraction**  
*Given:* Equation \(\frac{x^2}{16} - \frac{y^2}{9} = 1\).  
*Find:* a, b, c, e, foci, asymptotes.  
Step 1: Compare with standard form → a² = 16 so a = 4.  
*Why:* Direct coefficient reading.  
Step 2: b
² = 9 so b = 3.  
*Why:* Same comparison.  
Step 3: c² = a
² + b² = 16 + 9 = 25 → c = 5.  
*Why:* Pythagorean relation from definition.  
Step 4: e = c/a = 5/4.  
*Why:* Definition of eccentricity.  
**Final answer**  
a = 4, b = 3, c = 5, e = 5/4, foci (±5,0), asymptotes y = ±(3/4)x.

*Reflection:* Yeh example basic identification ki practice deti hai; har parameter ek fixed relation se nikalti hai.

**Example 2 — Finding equation from foci and vertex**  
*Given:* Foci (0,±10), vertex (0,6).  
*Find:* Equation.  
Step 1: c = 10, a = 6 (vertex distance).  
*Why:* Vertex se a directly milta hai.  
Step 2: b² = c² − a² = 100 − 36 = 64.  
*Why:* Definition se.  
Step 3: Transverse axis vertical → \(\frac{y^2}{36} - \frac{x^2}{64} = 1\).  
**Final answer**  
\(\frac{y^2}{36} - \frac{x^2}{64} = 1\).

*Reflection:* Orientation decide karna zaroori hai warna foci galat axis par aa jaate hain.

**Example 3 — Asymptote verification**  
*Given:* \(\frac{x^2}{25} - \frac{y^2}{144} = 1\).  
*Find:* Asymptotes and check a point far away.  
Step 1: a = 5, b = 12.  
*Why:* Coefficients.  
Step 2: Asymptotes y = ±(12/5)x.  
*Why:* Formula.  
Step 3: Point (25, 60) check karo — value 1 − 1 = 0 ke kareeb hoti hai.  
**Final answer**  
Asymptotes: y = ±(12/5)x.

*Reflection:* Asymptotes sirf limit behaviour dikhate hain, actual curve unhe cross nahi karti.

**Example 4 — Eccentricity from difference condition**  
*Given:* |PF₁ − PF₂| = 8, foci at (±5,0).  
*Find:* Equation and e.  
Step 1: 2a = 8 → a = 4, c = 5.  
*Why:* Direct from definition.  
Step 2: b² = 25 − 16 = 9.  
*Why:* Relation.  
Step 3: Equation \(\frac{x^2}{16} - \frac{y^2}{9} = 1\), e = 5/4.  
**Final answer**  
\(\frac{x^2}{16} - \frac{y^2}{9} = 1\), e = 5/4.

*Reflection:* Definition se seedha equation tak jaana sabse safe tareeka hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                          | How to avoid it                              |
|-----------------------------|-----------------------------------------|----------------------------------------------|
| Using c² = a² − b
² instead of a² + b² | Ellipse formula yaad reh jaati hai     | Har baar definition yaad karo: hyperbola mein addition |
| Forgetting e > 1            | Value 1 se kam nikal aati hai           | c > a check karo pehle                       |
| Wrong asymptote slope       | a aur b swap kar dete hain              | Slope hamesha b/a ya a/b clearly likho       |
| Missing transverse axis direction | Equation dekhte hi horizontal assume karte hain | Pehle dekho kaunsa term positive hai         |
| Using 2c = 2a               | Difference ko zero samajh lete hain     | c > a strictly enforce karo                  |
| Sign error in difference    | Absolute value bhool jaate hain         | Definition mein | | likh ke solve karo         |

## 7. The textbook-precise statement
A hyperbola is the locus of points P such that |PF₁ − PF₂| = 2a where F₁, F₂ are fixed foci separated by distance 2c with c > a > 0. Its standard equation with transverse axis along the x-axis is  
$$\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1, \quad b^2 = c^2 - a^2.$$  
The foci are at (±c, 0), the eccentricity is e = c/a > 1, and the asymptotes are the lines y = ±(b/a)x. (Thomas’ Calculus, 15e, §10.6)

## 8. Visual — diagram or schematic
```
          y
          ^
          |     asymptote y=(b/a)x
          |   /
   branch |  /     .
          | /    .
   focus  |/   .
  (-c,0)  *-----* vertex (a,0)   focus (c,0)
          | \   .
          |  \    .
          |   \     .
          |    \      asymptote y=-(b/a)x
          +-------------------> x
```

## 9. The memory technique
**The hook** — Do foci ko do magnets samajh lo; hyperbola woh “difference tape” hai jo hamesha fixed length ka hota hai, isliye branches alag-alag rehti hain.

**What to overlearn** — c² = a
² + b², e = c/a > 1, asymptotes y = ±(b/a)x (horizontal case).

**Spaced-repetition schedule** — 1 din baad, 3 din, 7 din, 16 din, 35 din.

**First-principles fallback** — Agar formula bhool jaaye toh distance definition se shuru karo: |d1 − d2| = 2a likho, square twice karo aur simplify karo.

## 10. What this unlocks
Yeh section aapko hyperbolic orbits, reflection properties aur special relativity ke hyperbolic functions ke liye ready karta hai.  
- Next: rectangular hyperbola xy = c²  
- Polar form with focus as origin  
- Hyperbolic functions sinh, cosh aur unke identities  
- Conic section classification via discriminant B² − 4AC

## 11. Self-check — five questions, no answers
1. Equation \(\frac{y^2}{9} - \frac{x^2}{16} = 1\) ke liye foci aur asymptotes likho.  
2. Agar e = 2 aur a = 3 ho toh equation (horizontal) kya hogi?  
3. Kya (3,4) point \(\frac{x^2}{9} - \frac{y^2}{16} = 1\) par hyperbola ke andar, bahar ya curve par hai?  
4. Agar foci (0,0) aur (8,0) hon aur 2a = 4 ho toh kya valid hyperbola banti hai? Kyun?  
5. Asymptote slope galat nikal aaye toh kaunsa step sabse pehle check karoge?