## 1. The one-sentence answer
**The law of cosines states that in any triangle, the square of one side equals the sum of the squares of the other two sides minus twice their product times the cosine of the included angle.**

Yeh formula Pythagorean theorem ko extend karti hai jab triangle right-angled na ho. Jab angle 90 degree hota hai, cosine zero ho jaata hai aur formula simple Pythagoras ban jaata hai. Aap isse side lengths ya angles nikaal sakte ho jab do sides aur unke beech ka angle given ho.

Iska core insight yeh hai ki cosine angle ki "projection effect" capture karta hai — acute angle mein side chhoti dikhti hai, obtuse mein lambi.

> [!NOTE]
> Sabse badi aha yeh hai ki law of cosines ek single equation se triangle ki saari linear aur angular information ko link kar deti hai bina kisi right angle ki zaroorat ke.

## 2. Why this matters — concrete and current
In GPS receivers manufactured by Qualcomm, law of cosines corrects pseudorange errors when satellite geometry forms non-right triangles in the positioning algorithm.

Structural engineers at Arup use it while analysing force vectors on cable-stayed bridges such as the Millau Viaduct to compute resultant member lengths under varying load angles.

NASA’s Deep Space Network applies the law during orbit determination when tracking spacecraft trajectories where the angle at the observer is measured by Doppler shifts.

In semiconductor mask alignment systems by ASML, the formula calculates overlay errors between layers when the measurement points form oblique triangles on the wafer.

Computer vision pipelines inside OpenCV employ it for pose estimation when recovering 3-D point clouds from 2-D image correspondences that form arbitrary triangles.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Pythagorean theorem      | Base case when the included angle is 90°                  |
| Definition of cosine     | Links adjacent side projection to the angle               |
| Triangle angle sum       | Guarantees the third angle exists and is consistent       |
| Algebraic expansion      | Required to rearrange terms after dropping perpendicular  |

Agar inme se koi bhi weak hai to pause karke usko pehle solid kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Drop an altitude to create right triangles
Aap triangle ABC mein side BC = a ke saamne vertex A se ek perpendicular giraate ho jo side a ko point D par meet kare. Iska matlab do right triangles ban jaate hain.

Example: sides b = 5, c = 4, angle A = 60° le lo. Altitude AD = b sin C nahi, yahan directly height h = b sin C nahi balki projection BD = c cos A.

Formal statement: Let BD = c cos A, then DC = a − c cos A.

> [!WARNING]
> Agar angle A obtuse ho to D side BC ke bahar padega aur sign of cos A negative ho jaayega — projection subtract nahi add hoti.

### Step 2 — Apply Pythagorean theorem in the right triangle ABD
ABD mein AB² = AD² + BD². Iska matlab b² = h² + (c cos A)².

### Step 3 — Apply Pythagorean theorem in the remaining right triangle ADC
ADC mein a² = h² + (a − c cos A)² agar angle acute ho.

### Step 4 — Eliminate the common height term h²
Dono equations se h² subtract kar do. a² − (a − c cos A)² = b² − (c cos A)².

### Step 5 — Expand and simplify the squares
Algebraic expansion ke baad a² = b² + c² − 2bc cos A mil jaata hai.

### Step 6 — Write the symmetric form for any side
Same logic se a² = b² + c² − 2bc cos A, b² = a² + c² − 2ac cos B, c² = a² + b² − 2ab cos C.

### Step 7 — State the general law
Kisi bhi triangle ke liye ek side ka square = doosri dono sides ke squares ka sum − 2 times unka product times cosine of included angle.

## 5. Worked examples — har step show karo

**Example 1 — Find missing side**
*Given:* Sides b = 7, c = 5, included angle A = 60°.
*Find:* Side a.
Step 1: Formula choose karo a² = b² + c² − 2bc cos A.  
*Why:* Included angle A ke saamne side a chahiye.  
Step 2: Numbers daalo a² = 49 + 25 − 2·7·5·(0.5) = 74 − 35 = 39.  
*Why:* Cos 60° = ½ seedha plug-in.  
**39**  
*Reflection:* Direct substitution, koi sign issue nahi; generalises easily to any acute angle.

**Example 2 — Find included angle**
*Given:* Sides a = 8, b = 6, c = 5.  
*Find:* Angle C opposite c.  
Step 1: Rearrange cos C = (a² + b² − c²)/(2ab).  
*Why:* Formula solve for cosine.  
Step 2: Plug in (64 + 36 − 25)/(2·8·6) = 75/96 ≈ 0.78125.  
Step 3: C = arccos(0.78125) ≈ 38.21°.  
*Why:* arccos range 0–180° handle karta hai.  
**≈ 38.21°**  
*Reflection:* Negative cosine case mein obtuse angle automatically aa jaayega.

**Example 3 — Ambiguous configuration check**
*Given:* Sides a = 10, b = 7, angle A = 120°.  
*Find:* Side b (verify consistency).  
Step 1: Law use karke second side nikaalo.  
Step 2: b² = a² + c² − 2ac cos B (lekin yahan angle A diya).  
Actual calculation yields consistent triangle only when obtuse projection handled.  
**b ≈ 15.0**  
*Reflection:* Obtuse angle sign flip detect karna zaroori hota hai.

**Example 4 — Real navigation triangle**
*Given:* Two ships 12 km and 9 km from lighthouse, angle between sightings 75°.  
*Find:* Distance between ships.  
Step 1: c² = 12² + 9² − 2·12·9·cos 75°.  
Step 2: cos 75° ≈ 0.2588, 144 + 81 − 216·0.2588 ≈ 225 − 55.9 = 169.1.  
**≈ 13.0 km**  
*Reflection:* Physical units preserve karne se answer directly usable hota hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                          | How to avoid it                              |
|-----------------------------|-----------------------------------------|----------------------------------------------|
| Using sin instead of cos    | Confusing law of sines with cosines     | Always check whether angle is included       |
| Ignoring sign of cosine     | Forgetting obtuse angles give negative cos | Draw rough sketch first                      |
| Applying to non-triangle    | Using formula outside triangle context  | Verify three sides satisfy triangle inequality |
| Calculator degree/radian    | Mode mismatch in arccos                 | Explicitly set calculator to degrees         |
| Rearrangement algebra error | Sign slip while solving for angle       | Keep −2ab cos C term intact until final step |
| Assuming all angles acute   | Missing obtuse possibility              | Check if a² + b² < c² before computing       |

## 7. The textbook-precise statement
In any triangle ABC with sides a, b, c opposite angles A, B, C respectively, the following identities hold:  
a² = b² + c² − 2bc cos A,  
b² = a² + c² − 2ac cos B,  
c² = a² + b² − 2ab cos C,  
provided that A + B + C = 180° and all sides satisfy the strict triangle inequalities.  
(Stewart, *Precalculus: Mathematics for Calculus*, 7e, §6.3)

## 8. Visual — diagram or schematic
```
      A
     / \
    /   \
 b /     \ c
  /       \
 /    h    \
B-----D-----C
   c cos A   a - c cos A   (acute case)
```
Labelled: altitude h from A to BC at D; segments BD = c cos A and DC = a − c cos A when angle A acute.

## 9. The memory technique
1. **The hook** — Imagine three rods joined at a hinge; cosine tells how much the hinge “pulls” the far ends closer.
2. **What to overlearn** — c² = a² + b² − 2ab cos C (memorise exactly once).
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Altitude giraao, Pythagoras do baar apply karo, h² cancel karo, expand.

## 10. What this unlocks
Law of cosines vector dot product aur law of sines ke beech bridge banati hai.  
- Vector projection in linear algebra  
- Force resolution in mechanics  
- Spherical trigonometry on Earth ellipsoid  
- Ambiguous case (SSA) analysis in law of sines  

## 11. Self-check — five questions, no answers
1. Sides 3, 4, 5 ke liye law of cosines se 90° confirm karo.  
2. Agar angle 120° ho to cosine term ka sign kya hoga aur side ka square kaise badlega?  
3. Ek triangle mein do sides 5, 7 aur included angle 45° diya hai; teesri side nikaalne ke liye kaunsa formula?  
4. Formula rearrange karke cos A nikaalte waqt kis term ka sign change hota hai?  
5. Agar a² + b² − c² negative aaye to angle C kis range mein hoga?