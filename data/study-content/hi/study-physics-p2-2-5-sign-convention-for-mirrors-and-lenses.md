## 1. The one-sentence answer
**Sign convention for mirrors and lenses** ek standardized Cartesian rule set hai jo object distance, image distance, focal length aur magnification ke signs ko fix karta hai taaki lens aur mirror formula har situation mein sahi result de.

Iska core yeh hai ki light hamesha left se right ki taraf incident maana jaata hai. Koi bhi distance usi direction mein positive hoti hai aur opposite direction mein negative. Heights principal axis ke upar positive aur neeche negative maane jaate hain. Yeh rules aapko har case (concave, convex, real, virtual) mein ek hi formula set se kaam chalane dete hain bina alag-alag cases yaad karne ke.

Jab aap u, v, f aur m calculate karte ho, sign galat ho jaaye to image real dikhega lekin actually virtual hota hai ya magnification ka sign ulta aa jaata hai. Isliye convention pehle clearly fix karna zaroori hai.

> [!NOTE]
> Yeh convention sirf ek bookkeeping trick nahi hai — yeh aapko geometry aur ray diagrams ko directly algebraic equations mein translate karne deta hai bina kisi exception ke.

## 2. Why this matters — concrete and current
JWST ke primary mirror segments ko align karte waqt optical engineers exactly isi Cartesian sign convention ka use karte hain taaki wavefront error calculations consistent rahein across 18 hexagonal segments.

SpaceX Starlink terminals mein phased-array optics aur corrective lenses ke design mein same convention apply hoti hai jab beam steering aur focal-plane array positioning ki baat aati hai.

Semiconductor lithography machines (ASML EUV scanners) ke catadioptric projection optics mein object-to-image distance signs is convention se fix kiye jaate hain, warna nanometer-level overlay errors aa jaate hain.

Gravitational lensing studies (HST aur JWST data) mein astronomers effective focal length aur image magnification calculate karte waqt yahi sign rules apply karte hain taaki multiple images ke positions sahi predict ho sakein.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Ray optics basics    | Incident, reflected and refracted ray paths samajhna zaroori hai sign decide karne ke liye |
| Principal axis       | Distances aur heights ko measure karne ka reference line yahi hai |
| Focal point          | Concave aur convex surfaces ke liye f ki sign define karta hai |
| Real vs virtual image| Sign convention decide karta hai ki v positive hai ya negative |

Agar upar ke concepts clear nahi hain to pehle ray diagrams aur basic mirror-lens formula padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Choose the direction of incident light
Light ko hamesha left se right ki taraf jaata hua maana jaata hai. Isse har measurement ka positive direction fix ho jaata hai.

Example: object left side par hai to object distance u ko left se right direction mein measure karna padega.

Formal statement:  
$$u = -(\text{distance from pole to object})$$

> [!WARNING]
> Agar aap light direction arbitrarily change kar doge to pura sign table collapse ho jaayega aur formula galat result dega.

### Step 2 — Measure all distances from the optical centre or pole
Pole (mirror) ya optical centre (lens) ko origin maante hain. Is point se measured distances ko sign rule apply karte hain.

Example: 30 cm left par object → u = −30 cm.

Formal statement:  
All linear distances measured from pole/optical centre along the optic axis follow the incident-light direction rule.

### Step 3 — Apply sign to focal length according to surface type
Concave mirror aur convex lens mein light actually converge karti hai, isliye f negative hota hai mirrors ke liye aur positive lenses ke liye (standard convention).

Formal statement:  
$$f = -\frac{R}{2} \quad (\text{concave mirror}), \quad f = +\frac{R}{2} \quad (\text{convex mirror})$$

### Step 4 — Fix image distance sign by actual position
Agar image right side (transmitted/reflected light side) par banti hai to v positive, agar left side par to negative.

Formal statement:  
$$v = +(\text{distance}) \quad \text{if image is on the side of outgoing light}$$

### Step 5 — Assign height signs relative to principal axis
Object ya image jo principal axis ke upar hai uski height positive, neeche negative.

Formal statement:  
$$h = +(\text{height}) \quad \text{above principal axis}$$

### Step 6 — Write the mirror/lens formula with signs
Mirror formula:  
$$\frac{1}{v} + \frac{1}{u} = \frac{1}{f}$$

Lens formula:  
$$\frac{1}{v} - \frac{1}{u} = \frac{1}{f}$$

Dono mein u, v, f already signed values hote hain.

### Step 7 — Apply magnification formula consistently
$$m = -\frac{v}{u} = \frac{h_i}{h_o}$$

Negative m ka matlab inverted image.

### Step 8 — Verify with ray diagram
Hamesha sign values daalne ke baad ek quick ray diagram se cross-check karo ki real/virtual aur erect/inverted conclusions match kar rahe hain.

## 5. Worked examples — har step show karo

**Example 1 — Concave mirror, object beyond centre**
*Given:* Concave mirror, f = −20 cm, object at u = −30 cm.  
*Find:* v and m.  

Step: mirror formula mein values daalo  
$$\frac{1}{v} + \frac{1}{-30} = \frac{1}{-20}$$  
Why: dono u aur f already signed hain.  
Solve: 1/v = −1/20 + 1/30 = −1/60 → v = −60 cm.  
m = −v/u = −(−60)/(−30) = −2.  

**Final answer**  
v = −60 cm, m = −2 (real, inverted, magnified).

*Reflection:* yeh case simple tha kyunki dono real distances negative the; sign convention ne directly correct v diya.

**Example 2 — Convex mirror**
*Given:* Convex mirror, R = +40 cm, object at 20 cm left.  
*Find:* v.  

f = +20 cm (convex).  
u = −20 cm.  
1/v + 1/(−20) = 1/20  
1/v = 1/20 + 1/20 = 1/10 → v = +10 cm.  

**Final answer**  
v = +10 cm (virtual, erect, diminished).

*Reflection:* Convex mirror ka positive f yahin decide karta hai ki image hamesha virtual aayegi.

**Example 3 — Convex lens, object inside focal length**
*Given:* f = +15 cm, u = −10 cm.  
*Find:* v, m.  

1/v − 1/(−10) = 1/15  
1/v = 1/15 − 1/10 = −1/30 → v = −30 cm.  
m = −(−30)/(−10) = −3.  

**Final answer**  
v = −30 cm, m = −3 (virtual, erect, magnified).

*Reflection:* Lens formula mein minus sign ki wajah se virtual image ka v negative aaya.

**Example 4 — Concave lens with real object**
*Given:* Concave lens, f = −12 cm, u = −18 cm.  
*Find:* v.  

1/v − 1/(−18) = 1/(−12)  
1/v = −1/12 + 1/18 = −1/36 → v = −36 cm.  

**Final answer**  
v = −36 cm (virtual image on same side).

*Reflection:* Negative f ne ensure kiya ki diverging lens ke liye image hamesha virtual rahe.

## 6. Common traps and how to avoid them

| Trap                          | Why it happens                              | How to avoid it                              |
|-------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to make u negative | Students object distance ko positive lete hain | Hamesha left side object → u negative yaad rakho |
| Sign of f for convex mirror   | “Convex” word sunte hi negative soch lete hain | Rule: converging surfaces f negative (mirrors) |
| Using mirror formula for lens | Formula sign structure alag hoti hai        | Lens ke liye 1/v − 1/u yaad karo             |
| Height sign for inverted image| m negative hone par height galat lete hain  | m = −v/u formula se hi sign decide karo      |
| Changing light direction mid-problem | Ray diagram right-to-left banate hain     | Poore calculation mein left-to-right fixed rakho |
| Missing virtual image sign    | v positive soch lete hain jab image left par ho | Outgoing light side check karo               |
| Radius vs focal length sign   | R aur f ko alag-alag sign dete hain         | f = R/2 with correct sign of R apply karo    |

## 7. The textbook-precise statement
In the Cartesian sign convention, the incident light is taken to travel from left to right. The pole or optical centre is the origin. Distances measured in the direction of the incident light are positive; those measured opposite to the incident light are negative. Heights measured upward from the principal axis are positive; those measured downward are negative. Under this convention the mirror equation is  
$$\frac{1}{v}+\frac{1}{u}=\frac{1}{f}$$  
and the lens equation is  
$$\frac{1}{v}-\frac{1}{u}=\frac{1}{f},$$  
where u, v and f carry their algebraic signs. (Hecht, *Optics*, 5e, §5.2.3)

## 8. Visual — diagram or schematic
```
          ↑ h_o (positive)
          |
   Object o--------|---------> (incident light L→R)
          |        Pole
          |←--u--→| (u negative)
          
Concave mirror curves back
          |←--f--→ (f negative)
          
Image forms at v (negative if on left)
```

## 9. The memory technique
1. **The hook** — Imagine a river flowing left to right; anything downstream (same direction) is “+”, upstream is “−”.
2. **What to overlearn** — u always negative for real object on left; f negative for concave mirror/convex lens; m negative means inverted.
3. **Spaced-repetition schedule** — Review signs after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Light direction left-to-right fix karo, pole origin lo, aur outgoing light side ko positive maan lo.

## 10. What this unlocks
Sign convention master karne ke baad aap thin-lens combinations, two-mirror systems, compound microscopes aur telescope magnification calculations directly kar sakte ho.

- Lens maker’s formula derivation
- Combination of lenses and mirrors
- Aberration calculations in optical design
- Ray-transfer matrix (ABCD) formalism

## 11. Self-check — five questions, no answers
1. Ek concave mirror ke liye f = −25 cm aur object at −40 cm par v kya aayega?
2. Agar m = +2.5 aaye to image erect hai ya inverted? Real hai ya virtual?
3. Convex lens f = +10 cm, object inside focal length par v ka sign kya hoga?
4. Radius of curvature +30 cm wale convex mirror ka f ka sign kya hoga?
5. Mirror formula mein u = +30 cm daalne se kaunsa physical situation violate hoti hai?