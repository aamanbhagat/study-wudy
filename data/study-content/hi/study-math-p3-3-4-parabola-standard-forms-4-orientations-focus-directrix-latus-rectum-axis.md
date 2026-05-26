## 1. The one-sentence answer
**A parabola is the locus of points equidistant from a fixed point (focus) and a fixed line (directrix).**

Iska matlab yeh hai ki har point par focus aur directrix ki distance barabar hoti hai. Standard coordinate geometry mein yeh curve four orientations mein appear karti hai jab vertex origin par ho: right, left, up, aur down. Aap in forms ko axis, focus, directrix aur latus rectum ke through fully describe kar sakte ho.

Yeh definition se hi aapko pata chalta hai ki parabola ek conic section hai jisme eccentricity exactly 1 hoti hai. Isliye uske equations quadratic terms mein sirf ek variable squared dikhte hain.

> [!NOTE]
> The single most important “aha” is that the focus-directrix distance equality forces the squared term and the linear term to balance exactly, producing the clean 4a coefficient that controls every geometric feature at once.

## 2. Why this matters — concrete and current
Satellite dishes built by companies such as Hughes Network Systems use the reflective property of a parabolic surface so that all incoming radio waves from a geostationary satellite converge exactly at the feed horn placed at the focus.

Automotive headlamp reflectors in modern LED matrix headlights from manufacturers like Osram and Valeo are parabolic sections; the filament or LED chip sits at the focus so that rays emerge parallel to the axis, satisfying ECE and FMVSS beam-pattern regulations.

NASA’s James Webb Space Telescope employs a 6.5 m primary mirror whose individual hexagonal segments are figured to a parabolic profile; the focus-directrix definition guarantees that wavefront errors remain below 150 nm across the entire aperture.

Projectile trajectories under constant gravity (neglecting air resistance) are parabolic arcs; missile-guidance software in Raytheon’s SM-3 interceptor repeatedly solves the focus-directrix parameters in real time to predict impact point.

Parabolic troughs in concentrated solar power plants such as Morocco’s Noor-Ouarzazate complex concentrate sunlight onto a linear receiver tube placed along the focal line, achieving thermal efficiencies above 30 %.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Cartesian coordinates and distance formula | To translate the geometric definition into algebraic equations |
| Definition of locus  | To understand that every point on the curve satisfies one fixed condition |
| Basic symmetry of even/odd functions | To recognise why only one squared term appears in each standard form |
| Linear equations     | To write the directrix and axis as straight lines         |

Agar aap inme se kisi bhi concept ko comfortable nahi feel karte, pause karke pehle woh revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — The geometric definition
Aap define karte ho ki parabola woh curve hai jiske har point ki focus se distance directrix se distance ke barabar hoti hai.  
Example: focus (a,0) aur directrix x = –a lo. Point (x,y) ke liye \(\sqrt{(x-a)^2+y^2}=|x+a|\).  
Squaring both sides gives the algebraic relation \(y^2=4ax\).  
> [!WARNING] Agar aap squaring step mein signs galat handle karo to equation ka sign flip ho jaayega aur orientation ulta ho jaayegi.

### Step 2 — Extracting focus and directrix from the equation
Jab equation \(y^2=4ax\) dikhe, a ko immediately identify karo; focus automatically (a,0) par aur directrix x = –a par aa jaata hai.  
Formal: For \(y^2=4ax\), focus = \((a,0)\), directrix: \(x=-a\).

### Step 3 — Axis of symmetry
Axis woh line hoti hai jo curve ko perfectly symmetric todti hai. \(y^2=4ax\) ke liye axis x-axis (y=0) hai kyunki y ki koi odd power nahi hai.  
Formal statement: axis is the line of symmetry passing through vertex and focus.

### Step 4 — Latus rectum length and endpoints
Latus rectum focus se guzarti hui directrix ke parallel chord hai. Length 4a nikalti hai.  
Endpoints for \(y^2=4ax\): (a,2a) aur (a,–2a).  
Formal: length of latus rectum = \(4|a|\).

### Step 5 — The four orientations by sign changes
Agar a negative ho jaaye (\(y^2=-4ax\)) curve left ki taraf khulta hai.  
Agar x aur y swap ho jaayein (\(x^2=4ay\)) curve upward khulta hai.  
Negative sign ke saath downward orientation milta hai.  
Formal: the four canonical forms are  
\[
y^2=4ax,\quad y^2=-4ax,\quad x^2=4ay,\quad x^2=-4ay
\]
with corresponding focus, directrix and axis obtained by cyclic permutation of coordinates and signs.

### Step 6 — Vertex at origin assumption
Sabhi four forms vertex origin par fix karte hain. Agar vertex (h,k) par ho toh aap \((x-h)\) aur \((y-k)\) substitute kar dete ho.

## 5. Worked examples — har step show karo

**Example 1 — Identify elements of \(y^2=12x\)**
- *Given:* \(y^2=12x\)
- *Find:* focus, directrix, latus rectum, axis.
Compare with \(y^2=4ax\): \(4a=12\) so \(a=3\).  
Focus = \((3,0)\).  
Directrix: \(x=-3\).  
Latus rectum length = \(4\times3=12\).  
Axis: y=0 (x-axis).  
*Why:* coefficient 12 ko seedha 4a se equate kiya kyunki definition se 4a hi focus ki x-coordinate deta hai.  
**Final answer**  
Focus (3,0), directrix x=–3, latus rectum length 12, axis: x-axis.

*Reflection:* Yeh example isliye simple thi kyunki vertex origin par tha; sign aur coefficient dono ek saath dekhne ki aadat pad jaati hai.

**Example 2 — Write equation given focus (–2,0) and directrix x=2**
- *Given:* focus (–2,0), directrix x=2.
- *Find:* equation.
Midpoint of focus and directrix is vertex (0,0). Distance from vertex to focus = 2, hence a=2 but opening left, so sign negative.  
Equation becomes \(y^2=-8x\).  
*Why:* a ki value focus-directrix distance ka aadha hoti hai aur sign opening direction batata hai.  
**Final answer**  
\(y^2=-8x\)

*Reflection:* Directrix aur focus ke beech symmetry dekhna zaroori hai warna sign galat ho sakta hai.

**Example 3 — Find latus rectum endpoints for \(x^2=-16y\)**
- *Given:* \(x^2=-16y\)
- *Find:* endpoints of latus rectum.
4a=16, a=4, opens downward so focus (0,–4).  
Latus rectum: y=–4, plug into equation: \(x^2=-16(–4)=64\), x=±8.  
Endpoints (±8,–4).  
*Why:* latus rectum hamesha focus ke y-coordinate (ya x-coordinate) par directrix ke parallel hota hai.  
**Final answer**  
Endpoints (8,–4) and (–8,–4)

*Reflection:* Sign negative hone ke bawajood length still 4|a| hoti hai.

**Example 4 — Equation with vertex (1,–2) opening upward, latus rectum length 6**
- *Given:* vertex (1,–2), opens up, LR length 6.
- *Find:* equation.
LR length =4a=6 ⇒ a=3/2.  
Shifted form: \((x-1)^2=4\cdot\frac{3}{2}(y+2)\).  
Simplify: \((x-1)^2=6(y+2)\).  
*Why:* vertex shift (h,k) ko (x–h) aur (y–k) mein daalna padta hai aur 4a ko LR length se nikaalna padta hai.  
**Final answer**  
\((x-1)^2=6(y+2)\)

*Reflection:* Vertex shift aur sign dono ek saath handle karna advanced problems mein common trap hota hai.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Writing 4a instead of –4a when curve opens left | Students copy the positive template without checking sign | Always verify focus coordinate sign against the given direction |
| Forgetting that latus rectum length is 4\|a\| even when a is negative | Absolute value overlooked | Replace a by \|a\| when stating length |
| Placing directrix at x=a instead of x=–a | Confusing focus x-coordinate with directrix | Remember focus aur directrix vertex ke opposite sides par hote hain |
| Using (h+k) instead of (x–h) while shifting vertex | Mixing translation formula | Write shifted variables explicitly before substituting |
| Assuming axis is always the x-axis | Over-generalising first example | Identify which variable is squared; that decides the axis |
| Missing that eccentricity must be exactly 1 | Definition se link nahi banate | Re-derive eccentricity from PF/PD=1 before memorising forms |

## 7. The textbook-precise statement
A parabola is the set of all points in the plane equidistant from a fixed point F (the focus) and a fixed line l (the directrix) not containing F. When the vertex is placed at the origin and the axis along a coordinate axis, the equation takes one of the four forms  
\[
y^2=4ax,\qquad y^2=-4ax,\qquad x^2=4ay,\qquad x^2=-4ay
\]  
where a≠0. For each form the focus, directrix, axis and latus rectum are uniquely determined as stated in Steps 2–4 above. (Thomas’ Calculus, 15th ed., §10.1)

## 8. Visual — diagram or schematic
```
          directrix
              |
  (-a)        |        focus (a,0)
     x=-a     |          ●
--------------+-------------- axis (y=0)
              |   parabola
             /|\   y^2=4ax
            / | \
           /  |  \
          /   |   \
```

## 9. The memory technique
**The hook** — Imagine a parabolic mirror “catching” every ray from the focus and throwing it perfectly parallel to the axis; the directrix is the “wall” that the curve never crosses.

**What to overlearn** —  
- Four canonical equations and their a signs.  
- Focus = (a,0) or cyclic permutations; directrix opposite sign.  
- Latus rectum length always 4|a|.

**Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — Agar formula bhool jaaye to distance definition \(\sqrt{(x-x_f)^2+(y-y_f)^2}=|Ax+By+C|/\sqrt{A^2+B^2}\) se shuru karo aur square kar ke equation derive kar lo.

## 10. What this unlocks
Parabola ke mastery ke baad aap ellipse aur hyperbola ke similar focus-directrix definitions, reflective properties, aur optical-design calculations ko jaldi samajh jaoge.  

- Polar equations of conics with focus as pole  
- Parametric equations and tangent/normal derivations  
- Optimization problems (maximum range of projectile)  
- Quadratic Bézier curves in computer graphics

## 11. Self-check — five questions, no answers
1. For the parabola \(x^2=8y\), state focus, directrix and length of latus rectum.  
2. Derive the equation of the parabola whose focus is (0,–5) and directrix is y=5.  
3. A parabola opens left with vertex (2,–1) and latus rectum length 10. Write its equation.  
4. Show that the point (3,6) lies on \(y^2=12x\) and verify that its distance to focus equals its distance to directrix.  
5. If the latus rectum of \(y^2=4ax\) is a chord whose midpoint lies on the parabola itself, find the value of a.