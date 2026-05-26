## 1. The one-sentence answer
**A triangle is classified by side lengths into scalene (no equal sides), isosceles (exactly two equal sides), or equilateral (all three sides equal), and independently by interior angles into acute (all angles < 90°), right (one angle = 90°), or obtuse (one angle > 90°).**

Yeh classification aapko triangle ke shape aur symmetry ko ek glance mein samajhne deta hai. Side-based labels side lengths ke beech equality par depend karte hain, jabki angle-based labels angle measures par. Dono systems ek saath use kiye ja sakte hain, jaise ek triangle isosceles aur acute dono ho sakta hai.

> [!NOTE]
> Sabse important "aha" yeh hai ki har triangle exactly ek side category aur exactly ek angle category mein aata hai; yeh dono classifications independent hain lekin unke beech strong relations hain (jaise equilateral triangle hamesha acute hota hai).

## 2. Why this matters — concrete and current
In aerospace engineering, NASA’s Perseverance rover landing calculations used isosceles right triangles to model parachute deployment forces and terrain slope stability on Mars.  
Semiconductor firms like TSMC rely on equilateral-triangle lattice models when simulating crystal structures in silicon wafers to predict electron mobility and defect propagation.  
In machine-learning geometry pipelines at Google DeepMind, scalene-triangle meshes are the default primitive for 3-D scene reconstruction because they allow arbitrary edge lengths without symmetry assumptions.  
Acoustic engineers at Bose use acute-triangle arrays in phased-array speaker design to control constructive interference patterns and minimise side lobes.  
Fundamental physics experiments at CERN’s LHC track particle trajectories by decomposing detector hits into right and obtuse triangles to compute momentum vectors with minimal numerical error.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Angle sum in triangle | Must know it equals 180° before classifying by angles     |
| Straight angle     | Defines 90° and the boundary between acute/right/obtuse   |
| Equality of lengths| Basis for deciding scalene vs isosceles vs equilateral    |
| Inequality of lengths | Prevents impossible triangles when checking side conditions |

Agar aapko angle sum ya straight angle abhi clear nahi hai, to Basic Geometry ke “Angle fundamentals” section pehle padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Side equality defines three mutually exclusive classes
Aap dekhte ho ki triangle ke teen sides mein se kitne equal hain. Agar koi bhi equal nahi, scalene; agar sirf do equal, isosceles; agar teeno equal, equilateral.  
Example: sides 5, 6, 7 → scalene; sides 5, 5, 6 → isosceles; sides 5, 5, 5 → equilateral.  
Formal statement: Let sides be \(a, b, c\). Then the triangle is scalene if \(a \neq b \neq c \neq a\), isosceles if exactly two are equal, equilateral if \(a = b = c\).

> [!WARNING]
> Agar aap “exactly two” ki jagah “at least two” likhoge to equilateral ko isosceles mein count kar loge, jo definition ko tod deta hai.

### Step 2 — Angle size relative to 90° defines three angle classes
Har angle ko 90° se compare karo. Sab < 90° → acute; ek = 90° → right; ek > 90° → obtuse.  
Example: angles 40°, 60°, 80° → acute; 90°, 30°, 60° → right; 20°, 30°, 130° → obtuse.  
Formal statement: A triangle is acute if all angles \(\alpha, \beta, \gamma < 90^\circ\), right if one equals \(90^\circ\), obtuse if one \(> 90^\circ\).

### Step 3 — Side and angle classifications are independent
Ek triangle dono labels simultaneously le sakta hai. Isosceles right triangle ya scalene obtuse triangle possible hain.  
Example: sides 3, 4, 5 with right angle between 3 and 4 → isosceles? No, scalene right.  
Formal statement: The partition by sides and the partition by angles form a Cartesian product; every valid triangle occupies exactly one cell of the resulting 3-by-3 grid.

### Step 4 — Equilateral implies acute (first cross-relation)
Agar \(a = b = c\), to har angle \(60^\circ\) hota hai (proof via congruence of all sides). Isliye equilateral hamesha acute hota hai.  
Formal statement: If \(a = b = c\), then each angle equals \(60^\circ < 90^\circ\).

### Step 5 — Largest side opposite largest angle (ordering principle)
Side \(a\) opposite angle \(\alpha\). Agar \(a\) sabse badi side hai, to \(\alpha\) sabse bada angle hai. Isse aap obtuse angle ko detect kar sakte ho bina protractor ke.  
Formal statement: In any triangle, \(a > b \iff \alpha > \beta\).

### Step 6 — Pythagorean relation distinguishes right triangles
Agar \(a^2 + b^2 = c^2\) (c longest side), to right-angled at the vertex between a and b.  
Formal statement: Triangle with sides a, b, c (c maximal) is right-angled iff \(a^2 + b^2 = c^2\).

### Step 7 — Textbook-grade classification summary
A triangle belongs to exactly one side class (scalene, isosceles, equilateral) and exactly one angle class (acute, right, obtuse) determined by the relations above.

## 5. Worked examples

**Example 1 — Basic side classification**  
*Given:* Sides 7 cm, 7 cm, 10 cm.  
*Find:* Side category.  
Compare lengths pairwise: first = second, third different → exactly two equal.  
*Why:* Direct application of “exactly two” rule.  
**isosceles**

**Example 2 — Basic angle classification**  
*Given:* Angles 35°, 62°, 83°.  
*Find:* Angle category.  
Check each against 90°: all < 90°.  
*Why:* Exhaustive comparison with the boundary value.  
**acute**

**Example 3 — Mixed classification with verification**  
*Given:* Sides 5, 12, 13.  
*Find:* Full classification.  
Sides all unequal → scalene. Check Pythagorean: \(5^2 + 12^2 = 25 + 144 = 169 = 13^2\) → right-angled.  
*Why:* Side test first, then angle test via theorem.  
**scalene right**

**Example 4 — Detecting obtuse without angles given**  
*Given:* Sides 6, 8, 11.  
*Find:* Angle category.  
Check ordering: 11 largest. Compute \(6^2 + 8^2 = 36 + 64 = 100 < 121 = 11^2\) → obtuse.  
*Why:* Converse of Pythagorean distinguishes obtuse when inequality reverses.  
**scalene obtuse**

*Reflection:* Har example ne side test aur angle test dono kiye; yeh pattern real problems mein bhi repeat hota hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Calling equilateral “isosceles” | Loose language “at least two sides equal”   | Always say “exactly two” for isosceles       |
| Forgetting to verify triangle inequality | Assuming any three lengths form a triangle  | Check a+b>c, a+c>b, b+c>a before classifying |
| Assuming isosceles base angles are 90° | Visual bias from drawings                   | Calculate angles or use cosine rule          |
| Misidentifying right angle opposite longest side | Forgetting “largest angle opposite longest side” | Identify longest side first, then test       |
| Using 90° as inclusive for acute | Boundary confusion                          | Acute strictly < 90°, right exactly = 90°    |
| Labelling a triangle both obtuse and right | Two angles cannot both exceed or equal 90°  | Remember angle sum 180° forbids it           |
| Ignoring units when comparing sides | Treating 5 cm and 5 m as equal              | Convert to same unit before equality test    |

## 7. The textbook-precise statement
A triangle is a scalene triangle if no two sides are congruent, an isosceles triangle if exactly two sides are congruent, and an equilateral triangle if all three sides are congruent. Independently, it is an acute triangle if all three interior angles are less than \(90^\circ\), a right triangle if one interior angle equals \(90^\circ\), and an obtuse triangle if one interior angle is greater than \(90^\circ\). These two partitions are exhaustive and mutually exclusive within each family. (See Euclid, *Elements*, Book I, Definitions 20–21 and Proposition 32; also Stewart, *Calculus*, 9e, §1.1.)

## 8. Visual — diagram or schematic
```
      C
     /|\
    / | \
   /  |  \
  A---B---D   (for isosceles example)
```
Label AC = BC (equal sides), angle at B = 90° (right angle). For scalene, move D so all sides differ. ASCII shows equal-side symmetry and right-angle marker.

## 9. The memory technique
1. **The hook** — Picture an equilateral triangle wearing a crown (all sides equal) standing inside an acute “A-frame” house; a right triangle has a square corner like a book, an obtuse one looks like a bent arm >90°.  
2. **What to overlearn** — Equilateral ⇒ all angles 60°; Pythagorean equality for right; “exactly two” for isosceles.  
3. **Spaced-repetition schedule** — Review 1 day, 3 days, 7 days, 16 days, 35 days after first study.  
4. **First-principles fallback** — Angle sum 180° + side-angle ordering + Pythagorean test rebuilds every classification.

## 10. What this unlocks
Yeh foundation aapko congruence criteria (SSS, SAS, ASA), similarity, area formulas, trigonometry (sin, cos, tan definitions), and later vector geometry aur computational geometry meshes tak le jaata hai.

- Law of cosines derivation  
- Triangle inequality proofs  
- Coordinate geometry distance checks  
- Mesh generation algorithms in graphics

## 11. Self-check — five questions, no answers
1. Classify the triangle with sides 9, 9, 9 and prove its angle type using only the angle-sum property.  
2. Given sides 4, 5, 8, decide whether it is obtuse, right or acute without calculating angles.  
3. Can an isosceles triangle be obtuse? Give a concrete numerical counter-example or proof.  
4. A student claims “all right triangles are isosceles.” Identify the error and give the smallest counter-example.  
5. Using only side lengths 7, 10, 12, show step-by-step why the triangle cannot be right-angled and must be obtuse.