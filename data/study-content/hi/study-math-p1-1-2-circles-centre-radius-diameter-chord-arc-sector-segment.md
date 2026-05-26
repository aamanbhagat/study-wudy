## 1. The one-sentence answer
**A circle is the set of all points in a plane that lie at a fixed distance (the radius) from a fixed point (the centre).**

Iska matlab yeh hai ki circle geometry ka sabse basic closed curve hai jismein har point centre se equal distance par hota hai. Jab aap is distance ko double karte hain to diameter milta hai, aur uske alawa jo line segments ya curves andar hote hain unko chord, arc, sector aur segment kehte hain. Yeh definitions sirf naming nahi hain — yeh aapko baad mein area, angle aur length nikalne ke liye formal tools dete hain.

Yeh subtopic aapko sirf shapes yaad karne nahi sikhaata. Yeh aapko yeh samjhaata hai ki ek hi figure ke alag-alag parts kaise alag-alag properties leke aate hain, aur kaise un parts ko measure karne ke liye alag-alag formulas ready hote hain.

> [!NOTE]
> Sabse badi aha yeh hai ki circle ki har property ultimately ek hi cheez se aati hai — centre se har boundary point tak ki distance constant hai. Baaki sab (chord, arc, sector) usi constant distance ke consequences hain.

## 2. Why this matters — concrete and current
In satellite navigation systems like GPS, the intersection of multiple circles (each defined by signal travel time from a satellite) gives your exact position on Earth; the centre is the satellite and the radius is the distance calculated from signal delay.

In semiconductor manufacturing, the silicon wafer is a near-perfect circle whose centre and radius must be controlled to sub-micron precision so that photolithography machines can align circuit layers correctly; any deviation in diameter creates unusable edge chips.

In aerospace, the cross-section of a rocket fuselage or fuel tank is circular because the hoop stress formula \(\sigma = \frac{pr}{t}\) distributes pressure uniformly only when the radius is constant from the centre; SpaceX and ISRO both rely on this property for tank design.

In machine learning, radial basis function kernels measure similarity between points using the Euclidean distance from a centre; the “radius” hyperparameter directly controls how wide each basis function spreads, affecting model generalisation on datasets such as MNIST or ImageNet embeddings.

In particle physics detectors at CERN, the drift chambers are cylindrical; ionisation trails are reconstructed as arcs whose curvature gives the momentum of charged particles via the relation \(p = 0.3Br\) where \(B\) is magnetic field strength and \(r\) is the radius of the fitted circle.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Point and line   | Every definition of centre, radius and chord begins with points and straight-line segments. |
| Distance formula | Radius is literally the distance from centre to any point on the circle; without distance you cannot write the equation of a circle. |
| Plane            | All parts (arc, sector, segment) are defined inside a two-dimensional flat surface. |

Agar aap in teeno concepts mein comfortable nahi ho to pause karke unhe pehle revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — From equal distance to the centre
Aap notice karte ho ki jab saare points ek fixed jagah se ek hi doori par hote hain to ek ghooma hua figure banta hai. Iska concrete example: compass ki needle ek jagah (centre) par fix karo aur pencil ghumao — har point pencil ke lead se needle tak same length par hai.

Formal statement: A circle with centre \(O\) and radius \(r\) is the set \(\{P \mid OP = r\}\).

> [!WARNING]
> Agar aap “fixed distance” ko sirf visually yaad rakhte ho aur mathematically define nahi karte, to baad mein equation of circle likhte waqt galti ho jaayegi.

### Step 2 — Radius versus diameter
Radius ek centre se boundary tak ka segment hai. Diameter usi line ko extend karke boundary ke doosre taraf tak le jaata hai, isliye diameter = 2 × radius.

Formal: Diameter \(d = 2r\), aur diameter ka midpoint hamesha centre hota hai.

### Step 3 — Chord as any connecting segment
Chord woh line segment hai jo circle ke andar do points ko join karta hai. Radius aur diameter dono special chords hain kyunki unka ek end (ya dono ends) centre se juda hota hai.

### Step 4 — Arc as portion of the boundary
Arc circle ki boundary ka koi bhi continuous hissa hai. Minor arc 180° se chhota hota hai, major arc usse bada.

Formal: Arc \(AB\) subtended by central angle \(\angle AOB\).

### Step 5 — Sector and segment
Sector woh region hai jo do radii aur unke beech ka arc contain karta hai (jaise pizza slice). Segment woh region hai jo ek chord aur uske corresponding arc ke beech banta hai.

Formal area expressions appear only after these regions are clearly named.

### Step 6 — The complete hierarchy
Ek point → centre; fixed distance → radius; double radius → diameter; any two points on circle → chord; boundary portion → arc; radii + arc → sector; chord + arc → segment.

## 5. Worked examples — har step show karo

**Example 1 — Identify the parts**
- *Given:* Circle with centre \(O\), points \(A,B\) on circumference, line segment \(AB\) drawn.
- *Find:* Name the radius, a chord, and the minor arc.
- Step 1: Radius \(OA\) ya \(OB\) (distance from centre).  
  *Why:* Definition says radius must start at centre.
- Step 2: Chord \(AB\).  
  *Why:* \(AB\) joins two points on circle and does not pass through centre.
- Step 3: Minor arc \(AB\).  
  *Why:* The shorter curve from \(A\) to \(B\).

**Final answer**  
Radius: \(OA\) or \(OB\); Chord: \(AB\); Minor arc: arc \(AB\).

*Reflection:* Yeh example isliye simple thi kyunki sirf naming thi; generalisation yeh hai ki har baar pehle centre dhundo.

**Example 2 — Length of diameter from radius**
- *Given:* Radius \(r = 7\) cm.
- *Find:* Diameter length.
- Calculation: \(d = 2 \times 7 = 14\) cm.  
  *Why:* Diameter definition directly doubles the radius.

**Final answer**  
**14 cm**

*Reflection:* Basic scaling step; later yeh 2r factor area aur circumference dono mein aayega.

**Example 3 — Distinguish sector and segment**
- *Given:* Chord \(AB\) aur uske corresponding minor arc.
- *Find:* Kaunsa region sector hai aur kaunsa segment.
- Sector = region \(OAB\) (centre included).  
  *Why:* Sector requires two radii.
- Segment = region between chord \(AB\) and arc \(AB\) (centre excluded).  
  *Why:* Segment definition never includes centre.

**Final answer**  
Sector contains centre; segment does not.

*Reflection:* Students aksar in dono ko mix karte hain kyunki dono “slice” lagte hain.

**Example 4 — Calculate arc length (introducing angle)**
- *Given:* Radius 10 cm, central angle \(60^\circ\).
- *Find:* Minor arc length.
- Step 1: Full circumference \(2\pi r = 20\pi\).  
  *Why:* Base length of whole boundary.
- Step 2: Fraction of circle = \(60/360 = 1/6\).  
  *Why:* Central angle proportion.
- Step 3: Arc length = \(\frac{1}{6} \times 20\pi = \frac{10\pi}{3}\) cm.  
  *Why:* Arc is proportional part of circumference.

**Final answer**  
**\(\dfrac{10\pi}{3}\) cm**

*Reflection:* Yeh example already arc length formula ki taraf le jaata hai.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Calling diameter a radius         | Visual similarity of lengths                | Always check whether the segment passes through centre |
| Treating every chord as diameter  | Forgetting only longest chord is diameter   | Measure or verify if midpoint = centre       |
| Confusing sector with segment     | Both look like “pizza pieces”               | Ask: does the region contain the centre?     |
| Using arc length formula without angle | Jumping to formula without central angle    | First locate or calculate central angle      |
| Assuming arc is always minor      | Language habit of saying “the arc”          | Explicitly state minor or major              |
| Forgetting radius is perpendicular bisector of chord | Missing theorem application                 | Draw the radius to midpoint and verify 90°   |
| Mixing up segment area with sector area | Both involve arc                          | Sector area uses angle; segment area subtracts triangle |

## 7. The textbook-precise statement
A circle in the Euclidean plane is the locus of points at a constant positive distance \(r\) (the radius) from a fixed point \(O\) (the centre). A chord is any line segment whose endpoints lie on the circle. A diameter is a chord that passes through the centre. An arc is a connected portion of the circle bounded by two points. A sector is the region bounded by two radii and the included arc. A segment is the region bounded by a chord and the included arc. (Reference: Euclid, *Elements*, Book III, Definitions 1–6; modern treatment in Hartshorne, *Geometry: Euclid and Beyond*, §5.1.)

## 8. Visual — diagram or schematic
```
          A
         /|\
        / | \
       /  |  \   minor arc AB
      /   |O  \
     B-----|-----D   (D is other end of diameter)
           |
```
- O = centre  
- OA = OB = radius  
- AB = chord  
- AD = diameter (through O)  
- Region OAB = sector  
- Region between AB and arc AB = segment

## 9. The memory technique
**The hook** — Imagine a pizza: the full pizza is the circle, the centre is where all slices meet, the crust length between two cuts is the arc, the slice itself (including pointy tip) is the sector, and the part with only crust and cheese but no tip is the segment.

**What to overlearn**  
- Radius \(r\), diameter \(d = 2r\)  
- Sector = radii + arc; segment = chord + arc

**Spaced-repetition schedule**  
Review after 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Agar definitions bhool jaayein to sirf yeh yaad rakho: centre dhundo, usse equal distance wale points dhundo — baaki sab usi se nikal aayega.

## 10. What this unlocks
Yeh foundation aapko circle ki area, circumference, inscribed angles, cyclic quadrilaterals aur power of a point jaise advanced results tak le jaata hai.

- Circumference and area formulas  
- Inscribed angle theorem  
- Intersecting chords theorem  
- Equation of circle in coordinate geometry  
- Circular motion and centripetal acceleration in physics

## 11. Self-check — five questions, no answers
1. Ek circle mein radius 5 cm hai. Diameter kitna hoga aur woh kis point se guzarta hai?

2. Agar chord centre se 3 cm door hai aur radius 5 cm hai to chord ki length nikaalo.

3. Minor arc aur major arc mein kya farak hai? Ek example do jismein central angle 120° ho.

4. Sector aur segment ka area nikaalne ke liye kaunsa region pehle calculate karna zaroori hai?

5. Ek student sochta hai ki “diameter bhi ek chord hai”. Sahi hai ya galat? Apne jawab ko definition se justify karo.