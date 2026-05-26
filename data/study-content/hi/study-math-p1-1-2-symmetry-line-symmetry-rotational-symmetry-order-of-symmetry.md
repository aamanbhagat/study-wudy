## 1. The one-sentence answer
**Symmetry** ek geometric figure ka woh property hai jismein woh figure ek line ke across reflect ho, ya ek point ke around rotate ho, aur original figure jaisa hi dikhe.

Line symmetry tab hoti hai jab kisi line ke dono taraf figure ka mirror image ban jaaye. Rotational symmetry tab hoti hai jab figure ko kisi angle se ghumane par woh apne aap se match kare. Order of rotational symmetry batata hai ki 360° ke full rotation mein figure kitni baar apne original position par aa jaata hai. Yeh dono properties figure ke shape aur uske invariant points ko directly control karti hain.

Yeh concepts plane figures par apply hote hain aur aapko symmetry axis ya centre of rotation dhundne mein madad karte hain. Ek baar aap line aur rotation dono ko alag-alag samajh jaate ho, toh unka combination (jaise dihedral groups) aasani se samajh aa jaata hai.

> [!NOTE]
> Sabse badi aha yeh hai ki symmetry sirf “dikhta hai same” nahi hota — yeh ek transformation hai jo figure ko apne aap par map karta hai bina kisi change ke.

## 2. Why this matters — concrete and current
In aerospace engineering, NASA uses line and rotational symmetry of rocket nozzles and heat shields to ensure uniform stress distribution during re-entry; any asymmetry creates torque that the guidance system must correct.

In semiconductor manufacturing, ASML’s EUV lithography machines rely on rotational symmetry of lens systems to achieve sub-5 nm overlay accuracy; even a single degree of rotational mismatch ruins an entire wafer batch.

In machine learning, convolutional neural networks exploit translational and rotational symmetry of filters so that the same feature detector works regardless of object orientation in an image; companies such as OpenAI and Meta explicitly encode these symmetries in their vision transformers.

In crystallography, the International Union of Crystallography classifies all 230 space groups using rotational symmetry orders; this classification directly determines material properties such as piezoelectricity used in ultrasound transducers.

In particle physics, the LHCb experiment at CERN measures CP violation by studying rotational symmetry breaking in B-meson decays; the order of symmetry tells physicists whether a decay channel is allowed or forbidden.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Angle measurement in degrees | Rotational symmetry is defined by angles that bring the figure back onto itself. |
| Reflection as a transformation | Line symmetry is exactly a reflection isometry. |
| Basic properties of regular polygons | Most textbook examples are regular polygons whose symmetry orders are easy to count. |

Agar upar ke teen concepts clear nahi hain, toh pehle unhe revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Line symmetry as mirror reflection
Line symmetry ka matlab hai ki figure ko ek line ke saath fold karne par dono halves perfectly overlap ho jaayein.  
Example: ek isosceles triangle mein base ke perpendicular bisector par fold karo — dono slanted sides match ho jaate hain.  
Formally, line \( l \) ek line of symmetry hai agar reflection \( \sigma_l \) ke liye \( \sigma_l(F) = F \) ho.  
> [!WARNING] Agar aap reflection ko sirf “mirror image” samajh ke rakhoge aur actual mapping nahi check karoge, toh aap galat lines ko symmetry lines declare kar doge jaise rectangle ke diagonals.

### Step 2 — Rotational symmetry around a centre
Rotational symmetry tab hoti hai jab figure ko ek fixed point (centre) ke around ghumane par woh apne aap se match kare.  
Example: square ko 90° ghumao — har vertex next vertex ki jagah le leta hai.  
Formally, point \( O \) centre hai aur angle \( \theta \) rotational symmetry deta hai jab rotation \( R_{O,\theta}(F) = F \).  
> [!WARNING] Centre galat choose karne se order zero ho jaata hai; har figure ka rotational centre automatically uska centroid nahi hota.

### Step 3 — Order of rotational symmetry
Order \( n \) ka matlab hai ki 360° mein figure \( n \) baar apne original position par aa jaata hai.  
Example: equilateral triangle ka order 3 hai kyunki 120°, 240°, 360° par woh match karta hai.  
Formally, smallest positive angle \( \theta = 360^\circ / n \) hota hai jahaan \( R_{O,\theta}^k(F) = F \) for \( k = 1,2,\dots,n \).  
> [!WARNING] Students aksar 360° ko count karte hain aur order ek extra badha dete hain; 360° hamesha order ka last step hota hai, nahi ki ek extra match.

### Step 4 — Distinguishing line vs rotational symmetry
Line symmetry reflection deta hai, rotational symmetry proper rotation deta hai. Dono ek saath ho sakte hain (regular polygon) ya alag-alag (parallelogram has rotational order 2 lekin koi line symmetry nahi).  
Formal test: agar sirf identity aur 180° rotation figure ko preserve karein, toh order 2 hai aur line symmetry absent ho sakti hai.

### Step 5 — Combining both symmetries
Jab ek figure dono line aur rotational symmetry rakhta hai, toh uske symmetry transformations ek finite group banate hain (dihedral group \( D_n \)).  
Example: square ka group \( D_4 \) hai jismein 4 reflections aur 4 rotations hain.

## 5. Worked examples — har step show karo

**Example 1 — Square**  
*Given:* Ek square with vertices (0,0), (1,0), (1,1), (0,1).  
*Find:* Lines of symmetry and rotational order.  
Step 1: x = 0.5 vertical line check karo — reflection maps (0,0)→(1,0) aur (0,1)→(1,1).  
*Why:* Reflection formula \( x' = 1 - x \) vertices ko vertices par hi le jaata hai.  
Step 2: 90° rotation about (0.5,0.5) check karo — (0,0) maps to (1,0).  
*Why:* 360°/90° = 4, isliye order 4.  
**Final answer:** 4 lines of symmetry, rotational order 4.

*Reflection:* Square sab symmetries ek saath dikhata hai, isliye yeh dihedral group \( D_4 \) ka canonical example hai.

**Example 2 — Rectangle (not square)**  
*Given:* Rectangle (0,0), (2,0), (2,1), (0,1).  
*Find:* Symmetry elements.  
Step 1: Vertical line x = 1 — reflection works.  
Step 2: Horizontal line y = 0.5 — reflection works.  
Step 3: 180° rotation about centre works, 90° nahi.  
**Final answer:** 2 lines of symmetry, rotational order 2.

*Reflection:* Extra length difference 90° rotation ko rok deti hai.

**Example 3 — Equilateral triangle**  
*Given:* Vertices (0,0), (1,0), (0.5, √3/2).  
*Find:* Order of rotational symmetry.  
Step 1: Centre = centroid (0.5, √3/6).  
Step 2: 120° rotation maps each vertex to next.  
**Final answer:** Rotational order 3, 3 lines of symmetry.

*Reflection:* 360°/120° = 3, yeh formula seedha order deta hai.

**Example 4 — Parallelogram (not rectangle or rhombus)**  
*Given:* (0,0), (3,0), (4,1), (1,1).  
*Find:* Any symmetry.  
Step 1: Koi bhi line fold nahi karti — sides unequal.  
Step 2: 180° rotation about centre maps figure to itself.  
**Final answer:** No line symmetry, rotational order 2.

*Reflection:* Sirf 180° symmetry hone ka matlab hai figure “point symmetric” hai lekin mirror nahi.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Counting 360° as extra symmetry   | Students treat full turn as separate match  | Order = 360° / smallest angle, 360° ko mat count karo |
| Assuming every polygon has line symmetry | Regular polygons ki symmetry generalise kar dete hain | Rectangle vs rhombus alag se check karo     |
| Choosing wrong centre for rotation | Centre ko centroid maan lete hain           | Actual mapping karke verify karo             |
| Confusing reflection with rotation | Both preserve distances                     | Reflection orientation reverse karti hai, rotation nahi |
| Forgetting order-1 figures        | “Har cheez symmetric hoti hai” soch lete hain | Scalene triangle order 1 hoti hai            |
| Diagonal as line symmetry in rectangle | Square ki symmetry extend kar dete hain     | Length-width ratio check karo                |

## 7. The textbook-precise statement
A figure \( F \) in the Euclidean plane possesses line symmetry with respect to line \( l \) if the reflection \( \sigma_l \) across \( l \) satisfies \( \sigma_l(F) = F \). It possesses rotational symmetry of order \( n \) about point \( O \) if \( n \) is the smallest positive integer such that the rotation \( R_{O,2\pi/n} \) maps \( F \) onto itself and \( R_{O,2\pi k/n}(F) = F \) for every integer \( k \). (See: Coxeter, *Introduction to Geometry*, 2nd ed., §3.3, Wiley, 1969.)

## 8. Visual — diagram or schematic
```
          y
          ^
          |
   (0,1)  +-----C-----+(1,1)
          |           |
          |     O     |
          |           |
   (0,0)  +-----B-----+(1,0)
          +-----------------> x
```
Square ABCD with centre O. Vertical line through O, horizontal line through O, and two diagonals are the four lines of symmetry. 90° rotations about O cycle the vertices A→B→C→D→A.

## 9. The memory technique
1. **The hook** — “Mirror for lines, spin for order” visualise karo: ek mirror line ke liye, ek fidget spinner order ke liye.
2. **What to overlearn** — Order \( n = 360^\circ / \theta_{\text{min}} \); square → 4, equilateral triangle → 3, regular pentagon → 5.
3. **Spaced-repetition schedule** — 1 din baad ek square aur triangle draw karke symmetry likho; 3 din baad rectangle vs parallelogram compare karo; 7 din baad ek irregular pentagon ka order decide karo; 16 aur 35 din baad full dihedral group examples.
4. **First-principles fallback** — Angle 360° se divide karo, mapping check karo; agar mapping fail ho toh order 1.

## 10. What this unlocks
Yeh foundation aapko dihedral groups, wallpaper groups, and symmetry in differential equations tak le jaata hai.  
- Next: rotational symmetry in polar coordinates  
- Next: group actions on polygons  
- Next: symmetry breaking in physics models  
- Next: Fourier analysis on cyclic groups

## 11. Self-check — five questions, no answers
1. Ek regular octagon ka rotational order kya hai aur kitni lines of symmetry hain?  
2. Kya ek isosceles trapezium mein 180° rotational symmetry hoti hai? Proof do.  
3. Ek scalene triangle ke liye line symmetry aur rotational order dono zero kyun hote hain?  
4. Rectangle aur rhombus mein symmetry difference ko ek table mein likho.  
5. 72° rotational symmetry wala figure kaunsa regular polygon ho sakta hai? Order calculate karke batao.