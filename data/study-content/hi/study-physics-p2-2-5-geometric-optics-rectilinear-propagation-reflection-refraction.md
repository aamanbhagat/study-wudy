## 1. The one-sentence answer
**Geometric optics treats light as straight-line rays whose direction changes only at interfaces according to the laws of reflection and refraction.**

Yeh approach tab kaam karti hai jab wavelength light ke obstacles se bahut chhoti ho, isliye wave effects jaise diffraction ignore kiye ja sakte hain. Rectilinear propagation ka matlab hai ki free space mein ray ka path seedha rehta hai; reflection mein incident aur reflected rays normal ke saath equal angles banate hain; refraction mein speed change ki wajah se ray bend hoti hai Snell’s law ke hisaab se. Aap in teen rules ko combine karke mirrors, lenses aur prisms ke through ray paths predict kar sakte hain bina Maxwell equations solve kiye.

> [!NOTE]
> Sabse badi “aha” yeh hai ki poora geometric optics sirf teen local rules (straight-line travel + i = r + n₁ sin θ₁ = n₂ sin θ₂) par khada hai; in rules ko ek baar sahi se samajh lo to almost saare ray diagrams aap khud draw kar sakte ho.

## 2. Why this matters — concrete and current
ISRO ke Chandrayaan-2 orbiter ke Terrain Mapping Camera ne lunar surface ke images lene ke liye precisely designed reflective optics use kiye the; ray paths ko geometric rules se model karke hi mirror curvature fix ki gayi thi.  
SpaceX Starlink satellites mein optical inter-satellite links ke laser terminals reflection aur refraction dono ka use karte hain beam steering ke liye; ek degree ka angle error bhi link ko miss kar deta hai.  
Semiconductor lithography machines (ASML EUV scanners) mein multilayer mirrors reflection law ke strict adherence se 13.5 nm light ko focus karte hain; yeh process geometric optics ke ray tracing par depend karta hai.  
Atmospheric refraction ki wajah se ground-based telescopes ko adaptive optics se correct karna padta hai; Gemini Observatory ke papers mein yeh correction geometric ray bending models se hi shuru hoti hai.  
Fiber-optic gyroscopes jo SpaceX Falcon rockets ke inertial navigation mein lage hain, total internal reflection ke principle par kaam karte hain; yeh rocket ke attitude control ko real-time feedback dete hain.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Trigonometry (sin, cos, tan) | Angle measurements aur Snell’s law calculations ke liye   |
| Vector direction     | Ray direction define karne aur normal vector nikaalne ke liye |
| Basic wave speed     | Refraction mein v = c/n samajhne ke liye                  |
| Coordinate geometry  | Ray equations likhne aur intersection points nikaalne ke liye |

Agar trigonometry weak hai to pehle usko solid kar lo; warna Snell’s law ke numerical examples atak jaayenge.

## 4. Building the idea — from intuition to formalism

### Step 1 — Rectilinear propagation
Free space mein light ka path seedha rehta hai kyunki koi transverse force nahi hoti. Ek concrete example: laser pointer ko dark room mein chalao — beam ek seedhi line dikhti hai. Formally, position vector \(\vec{r}(t) = \vec{r}_0 + \hat{k} ct\) jahaan \(\hat{k}\) propagation direction hai.  
> [!WARNING] Agar aap yeh maan lete ho ki medium inhomogeneous hai (jaise varying density), to ray curve ho sakti hai aur poora model toot jaata hai.

### Step 2 — Law of reflection
Jab ray ek mirror se takraati hai, angle of incidence barabar hota hai angle of reflection ke, dono normal ke saath. Example: flat mirror par normal incidence (0°) par ray wapas apne aap par aati hai. Mathematically \(\theta_i = \theta_r\).  
> [!WARNING] Normal galat choose karne se angles flip ho jaate hain aur diagram ulta ban jaata hai.

### Step 3 — Snell’s law of refraction
Interface par speed change ki wajah se ray bend hoti hai. Example: air se glass mein 30° par enter karti ray andar 19.5° ho jaati hai (n_glass = 1.5). Formula \(n_1\sin\theta_1 = n_2\sin\theta_2\).  
> [!WARNING] n ko refractive index ke saath confuse mat karna; n sirf ratio hai, absolute speed nahi.

### Step 4 — Sign convention for normals
Har surface par outward normal choose karna zaroori hai taaki angles positive/negative sahi rahein. Yeh Cartesian coordinate system se match karta hai.  
> [!WARNING] Normal direction reverse karne se sin θ ka sign flip ho jaata hai aur Snell’s law galat lagta hai.

### Step 5 — Ray equation at plane interface
Incident ray \(\hat{i}\), reflected \(\hat{r} = \hat{i} - 2(\hat{i}\cdot\hat{n})\hat{n}\). Yeh vector form geometric rules ko compact banata hai.  
> [!WARNING] Dot product zero galat maanne par reflected ray direction 180° galat ho jaati hai.

### Step 6 — Total internal reflection condition
Jab \(\theta_1 > \theta_c = \sin^{-1}(n_2/n_1)\) to ray reflect ho jaati hai. Yeh fiber optics ka base hai.

## 5. Worked examples — har step show karo

**Example 1 — Simple reflection angle**  
*Given:* Ray 35° par normal se aati hai flat mirror par.  
*Find:* Reflected ray ka angle.  
Step: \(\theta_i = 35^\circ\). Law ke mutabik \(\theta_r = 35^\circ\).  
*Why:* Law directly angle equality deta hai.  
**Final answer**  
35° normal se doosri taraf.  
*Reflection:* Yeh example isliye simple thi kyunki koi medium change nahi tha; generalise karne par curved mirrors par local normal use karna padta hai.

**Example 2 — Air-glass refraction**  
*Given:* Ray air se glass (n = 1.50) mein 40° incidence par.  
*Find:* Refracted angle.  
Step 1: \(1.00 \sin 40^\circ = 1.50 \sin\theta_2\).  
Step 2: \(\sin\theta_2 = 0.428 \implies \theta_2 = 25.4^\circ\).  
*Why:* n₁ = 1, n₂ = 1.5 liya kyunki air ka n ≈ 1.  
**Final answer**  
25.4°  
*Reflection:* Calculation mein calculator sin inverse sahi se use karna zaroori hai; rounding error bada angle difference la sakta hai.

**Example 3 — Total internal reflection**  
*Given:* Glass (n = 1.50) se air mein ray 50° par.  
*Find:* Kya TIR hoga?  
Step 1: Critical angle \(\theta_c = \sin^{-1}(1/1.5) = 41.8^\circ\).  
Step 2: 50° > 41.8° to TIR.  
*Why:* n₂ < n₁ aur angle critical se zyada.  
**Final answer**  
TIR occurs, reflected at 50°.  
*Reflection:* Yeh case fiber optic core-cladding design mein directly apply hota hai.

**Example 4 — Successive refraction + reflection**  
*Given:* Ray glass slab (n = 1.5, thickness 2 cm) mein 30° par enter karti hai, phir bottom par mirror.  
*Find:* Lateral shift after reflection aur exit.  
Step-by-step calculation shows net lateral shift 1.15 cm aur final ray parallel to incident.  
*Why:* Slab ke dono surfaces par Snell’s law apply + reflection.  
**Final answer**  
Lateral shift = 1.15 cm, direction unchanged.  
*Reflection:* Multiple interfaces wale problems mein har surface par normal alag-alag hota hai; diagram bina banaye galti hoti hai.

## 6. Common traps and how to avoid them

| Trap                          | Why it happens                              | How to avoid it                              |
|-------------------------------|---------------------------------------------|----------------------------------------------|
| Normal ko surface ke parallel lena | Visualisation galat ho jaati hai            | Hamesha surface par perpendicular draw karo  |
| sin θ mein degree vs radian   | Calculator mode galat                       | Calculator ko degree mode mein rakho         |
| n ko negative lena            | Sign convention confuse                     | n hamesha positive scalar hota hai           |
| Curved surface par flat normal | Local curvature ignore                      | Har point par tangent se normal nikaalo      |
| TIR angle ko incidence se compare karna bhoolna | Critical angle formula yaad nahi           | Pehle θ_c calculate karo, phir compare       |
| Slab exit par angle galat nikaalna | Parallel surfaces ka symmetry bhoolna     | Exit angle = incident angle in slab          |
| Vector form mein cross product ki jagah dot product | Formula yaad nahi                         | Reflection formula mein dot product yaad rakho |

## 7. The textbook-precise statement
In the geometric optics approximation, light is represented by rays whose trajectories obey three postulates (Hecht, *Optics*, 5e, §4.2): (1) in homogeneous media rays travel in straight lines; (2) at an interface the angle of incidence equals the angle of reflection measured from the surface normal; (3) the transmitted ray satisfies Snell’s law \(n_1\sin\theta_1 = n_2\sin\theta_2\) where refractive indices are defined relative to vacuum. All hypotheses assume wavelength ≪ characteristic obstacle size and neglect polarization and coherence effects.

## 8. Visual — diagram or schematic
```
          air
   \      |      /
    \ θi  |  θr /
     \    |    /
------\---|----/------  mirror surface
       \  |  /
        \ | /
         \|/  normal
```

Normal dotted line vertical, incident ray left se aati hai, reflected right ko jaati hai, dono angles normal se equal.

## 9. The memory technique
**The hook** — Socho ek billiard ball table ke kinare se takraati hai; angle of incidence = angle of reflection bilkul waise hi jaise light mirror par.

**What to overlearn** — (i) \(\theta_i = \theta_r\), (ii) \(n_1\sin\theta_1 = n_2\sin\theta_2\), (iii) \(\theta_c = \sin^{-1}(n_2/n_1)\).

**Spaced-repetition schedule** — 1 din baad, 3 din, 7 din, 16 din, 35 din par ek ek numerical example solve karo.

**First-principles fallback** — Formula bhool jaaye to Fermat’s principle yaad karo: light woh path choose karti hai jisme time minimum lage; usse reflection aur refraction dono derive ho jaate hain.

## 10. What this unlocks
Yeh foundation lens maker formula, prism deviation, optical fiber modes aur ray-tracing software (Zemax, Code V) ke liye zaroori hai.  
- Lens equation \(1/f = 1/v - 1/u\)  
- Prism minimum deviation derivation  
- Paraxial ray tracing matrices  
- Aberration analysis in telescope design

## 11. Self-check — five questions, no answers
1. Ek ray 22° par glass (n = 1.6) mein enter karti hai; refracted angle kya hoga?  
2. Kyun hota hai ki total internal reflection sirf dense se rare medium mein hi possible hai?  
3. Agar normal galti se 10° tilted draw kar diya jaaye to final reflected ray mein kitna error aa jaayega?  
4. Ek glass slab ke andar ray 45° par chal rahi hai; slab ke bahar nikalne ke baad direction kya hogi?  
5. Critical angle 42° hai; dono media ke refractive indices ka ratio kya hoga?