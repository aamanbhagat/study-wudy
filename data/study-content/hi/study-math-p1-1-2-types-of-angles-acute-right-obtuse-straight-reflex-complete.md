## 1. The one-sentence answer
**Angles are classified by their measure in degrees into acute (<90°), right (=90°), obtuse (>90° and <180°), straight (=180°), reflex (>180° and <360°), and complete (=360°).**

Yeh classification aapko ek angle ko dekh kar turant uske size aur behaviour ko samajhne mein madad karti hai. Har type ka apna alag mathematical aur geometric role hota hai, jaise acute angles chhote turns dikhate hain jabki reflex angles bade, almost poore circles ko represent karte hain. Degree measure 0° se 360° tak continuous hota hai, aur boundary values (jaise exactly 90°) specially named hain kyunki woh unique properties le kar aate hain.

> [!NOTE]
> Sabse badi aha yeh hai ki straight angle ek line banata hai aur complete angle ek poora circle cover karta hai — in dono ko samajh lene se aapko rotation aur direction ke beech ka link turant dikhta hai.

## 2. Why this matters — concrete and current
In aerospace engineering, Boeing aur Airbus ke flight control systems reflex angles ko use karte hain jab aircraft ka heading 180° se zyada turn karta hai, jaise holding patterns mein.  
Semiconductor lithography machines (ASML ke EUV scanners) right angles ko sub-nanometer precision ke saath align karte hain taaki circuit layers perfectly overlap karein.  
Robotics mein Boston Dynamics ke Atlas robot obtuse angles ko detect karke balance maintain karta hai jab woh uneven terrain par move karta hai.  
Navigation apps jaise Google Maps acute angles ko shortest-path algorithms mein use karte hain taaki turns ko minimise kiya ja sake.  
Fundamental physics experiments (CERN ke particle detectors) complete angles ko 360° symmetry ke liye track karte hain jab particles circular paths follow karte hain.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Point and ray        | Angle do rays se banta hai jo ek common point se nikalte hain |
| Degree as unit       | Har type ki definition degree measure par based hoti hai  |
| Straight line        | Straight angle 180° ko define karta hai                   |

Agar aap inme se koi bhi weak feel kar rahe hain, toh pehle “Basic geometric primitives” padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Angle as amount of turn
Ek angle do rays ke beech ka turn hota hai. Turn ko aap ek circle ke hisse ke roop mein soch sakte hain.  
Example: 0° par dono rays ek hi direction mein hain; 90° par ek ray dusri se perpendicular ho jaati hai.  
Formal statement: An angle is the figure formed by two rays sharing a common endpoint, measured as the amount of rotation from one ray to the other.  
> [!WARNING] Turn ko hamesha smaller side se mat lo — 270° turn ko 90° samajhna galat hai.

### Step 2 — Degree scale from 0° to 360°
Circle ko 360 equal parts mein baanta jaata hai, har part 1° hota hai.  
Example: Ek poora ghumao 360° hai.  
Formal statement: $$ \theta \in [0^\circ, 360^\circ] $$ where \(\theta\) is the measure of the angle.  
> [!WARNING] 360° ko 0° ke barabar mat samajho jab direction matter karti hai.

### Step 3 — Acute and right angles
90° se kam wale acute hain; exactly 90° right angle hai.  
Example: Ek square ka corner right angle hai (90°); ek 45° slice acute hai.  
Formal statement: Acute: \(0^\circ < \theta < 90^\circ\); Right: \(\theta = 90^\circ\).  
> [!WARNING] 90° ko “almost acute” mat bolo — woh alag category hai.

### Step 4 — Obtuse and straight angles
90° se 180° ke beech obtuse hai; exactly 180° straight angle hai.  
Example: Ek flat line 180° straight angle banati hai; 120° obtuse hai.  
Formal statement: Obtuse: \(90^\circ < \theta < 180^\circ\); Straight: \(\theta = 180^\circ\).  
> [!WARNING] Straight angle ko 0° mat samajho — woh ek line banata hai.

### Step 5 — Reflex angles
180° se 360° ke beech reflex angles aate hain.  
Example: 270° turn ek reflex angle hai.  
Formal statement: Reflex: \(180^\circ < \theta < 360^\circ\).  
> [!WARNING] Reflex ko hamesha major arc ke saath associate karo, minor arc ke saath nahi.

### Step 6 — Complete angle
Exactly 360° ko complete angle kehte hain.  
Example: Ek full circle wapas starting ray par.  
Formal statement: Complete: \(\theta = 360^\circ\).  
> [!WARNING] Complete angle ko 0° ke saath confuse mat karo jab closed path discuss ho.

### Step 7 — Unified classification
In sabko ek table mein daal kar aap kisi bhi \(\theta\) ko turant classify kar sakte hain.  
Formal statement: The six types partition the interval \([0^\circ, 360^\circ]\) into mutually exclusive categories.

## 5. Worked examples — har step show karo

**Example 1 — Simple classification**  
*Given:* \(\theta = 67^\circ\)  
*Find:* Type of angle  
67° < 90° hai, isliye acute.  
*Why:* Direct comparison with 90° boundary.  
**acute angle**

**Example 2 — Boundary check**  
*Given:* \(\theta = 180^\circ\)  
*Find:* Type  
Exactly 180° hai, isliye straight.  
*Why:* Boundary value alag category banati hai.  
**straight angle**

**Example 3 — Reflex identification**  
*Given:* \(\theta = 215^\circ\)  
*Find:* Type  
215° > 180° aur < 360° hai, isliye reflex.  
*Why:* Upper aur lower bounds dono check kiye.  
**reflex angle**

**Example 4 — Mixed set classification**  
*Given:* Angles 35°, 90°, 142°, 180°, 310°, 360°  
*Find:* All types  
35° → acute; 90° → right; 142° → obtuse; 180° → straight; 310° → reflex; 360° → complete.  
*Why:* Har value ko apni range se match kiya.  
**acute, right, obtuse, straight, reflex, complete**

*Reflection:* Yeh examples isliye tricky the kyunki boundaries aur reflex range dono test hue; general rule yeh hai ki hamesha 90°, 180°, 360° ke saath compare karo pehle.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                     | How to avoid it                          |
|-----------------------------|------------------------------------|------------------------------------------|
| 90° ko acute bolna          | “Kam” word se confusion            | Exactly 90° ko alag category yaad rakho  |
| 180° ko reflex bolna        | 180° bhi bada lagta hai            | Reflex sirf 180° ke upar hota hai        |
| 360° ko 0° samajhna         | Full circle 0° jaisa dikhta hai    | Direction matter kare toh alag rakho     |
| Minor arc ko reflex bolna   | Diagram mein badi taraf confuse    | Hamesha larger rotation choose karo      |
| Degree symbol bhoolna       | Informal writing                   | Har numerical measure ke saath ° likho   |
| Obtuse aur reflex mix karna | Dono 90° se bade hain              | 180° boundary ko clear line banao        |

## 7. The textbook-precise statement
An angle is the union of two rays with a common endpoint called the vertex. Its measure is the amount of rotation, expressed in degrees, required to map one ray onto the other. The six types are defined by partitioning the closed interval [0°, 360°] as follows: acute if 0° < θ < 90°, right if θ = 90°, obtuse if 90° < θ < 180°, straight if θ = 180°, reflex if 180° < θ < 360°, and complete if θ = 360°. (See Euclid, *Elements*, Book I, Definition 8–9, and modern treatment in Greenberg, *Euclidean and Non-Euclidean Geometries*, 4e, §1.2.)

## 8. Visual — diagram or schematic
```
          0°/360°
            |
   270° ----+---- 90° (right)
            |
          180° (straight)
Reflex region: 180°–360° (clockwise or counterclockwise larger arc)
Acute: inside 0°–90° quadrant
```

## 9. The memory technique
1. **The hook** — Imagine a clock: 3 o’clock right angle, 6 o’clock straight, 9 o’clock reflex start, 12 o’clock complete.  
2. **What to overlearn** — Boundaries 90°, 180°, 360° aur unke strict inequalities.  
3. **Spaced-repetition schedule** — Review 1 din, 3 din, 7 din, 16 din, 35 din ke baad.  
4. **First-principles fallback** — Agar bhool jaayein toh 90° se compare karo, phir 180°, phir 360°.

## 10. What this unlocks
Yeh classification aapko triangles, polygons, aur circle theorems samajhne ke liye ready karti hai.  
- Triangle angle sum (180°) directly obtuse aur acute properties par depend karti hai.  
- Cyclic quadrilaterals reflex angles ko involve karte hain.  
- Trigonometric functions (sin, cos) acute aur obtuse dono ke liye defined hain.

## 11. Self-check — five questions, no answers
1. 47° kis type ka angle hai?  
2. Ek reflex angle ka minimum aur maximum possible measure kya hai?  
3. 180° aur 360° mein kya farak hai geometrically?  
4. Agar ek angle 90° se thoda kam hai lekin aap 270° rotation le rahe hain, toh woh kis category mein aayega?  
5. 135° angle ko acute, obtuse, ya reflex — kaunsa sahi hai aur kyun?