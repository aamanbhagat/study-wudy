## 1. The one-sentence answer
**Total internal reflection occurs when light travels from a denser to a rarer medium at an angle greater than the critical angle, causing 100 % reflection with zero transmission.**

Iska matlab yeh hai ki jab light ek medium se doosre medium mein jaati hai jahaan speed badhti hai (refractive index kam hota hai), toh kuch angle ke baad woh surface par bounce back kar jaati hai instead of refracting out. Aap isko samajh sakte hain jaise ek ball jo ek slanted wall se itni tez speed se takraaye ki woh andar nahi jaa paati. Yeh phenomenon sirf tab hota hai jab light optically denser medium se rarer medium ki taraf jaaye. Derivation critical angle nikaalne ke liye Snell’s law ko boundary condition par apply karti hai jahaan refracted ray 90° ho jaata hai.

> [!NOTE]
> The single “aha” moment is realising that the critical angle is not a material property in isolation — it is the exact angle at which the refracted ray skims along the interface, forcing all subsequent larger angles into perfect reflection.

## 2. Why this matters — concrete and current
In optical fibre gyroscopes used by ISRO’s PSLV and GSLV rockets, total internal reflection keeps laser light trapped inside the fibre coil so that rotation-induced phase shifts can be measured with nanoradian precision; any leakage would destroy inertial navigation accuracy during upper-stage burns.

SpaceX’s Starlink satellites employ TIR-based laser inter-satellite links; the critical-angle design of the collimators ensures that the 1550 nm beam remains inside the glass terminal even when the satellite attitude changes by several degrees, allowing continuous data relay without mechanical gimbals.

In semiconductor lithography machines made by ASML, catadioptric projection optics rely on TIR prisms to fold the 13.5 nm EUV beam path; the critical angle of the fluoride coatings determines the numerical aperture and therefore the smallest feature size printable on a chip.

Natural phenomena such as the green flash at sunset arise because TIR at the sharp temperature inversion layer in the atmosphere selectively reflects the last sliver of sunlight, an effect studied in papers on atmospheric optics for high-altitude balloon missions.

Fibre-optic temperature sensors embedded in reusable rocket engines (e.g., Blue Origin’s BE-4) use TIR to confine light while the cladding refractive index changes with heat; the critical-angle shift directly reports chamber-wall temperature without electrical wiring that could fail under vibration.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Snell’s law          | Relates incident and refracted angles across an interface |
| Refractive index \(n\) | Quantifies optical density; appears in every ratio        |
| Angle of incidence   | Must be measured from the normal; geometry of TIR starts here |
| Limiting case \(\sin 90^\circ = 1\) | Sets the boundary condition that defines the critical angle |

Agar aap Snell’s law ya refractive index definition nahi samajhte, toh pehle woh padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Light slows down in denser media
Light ki speed medium ke refractive index \(n\) ke ulta anupat mein hoti hai. Jab light optically denser se rarer medium ki taraf jaati hai, woh normal se door bend hoti hai. Agar incident angle badhta rahe, refracted angle bhi badhega jab tak woh 90° na ho jaaye.

Concrete example: water-to-air interface par \(n = 1.33\). 30° incidence par refracted ray almost 42° hota hai; 48° incidence par woh 90° ho jaata hai.

Formal statement:  
$$n_1 \sin\theta_1 = n_2 \sin\theta_2$$

> [!WARNING]
> Agar aap normal ko reference lene ki jagah surface se angle lene lagen toh pura derivation ulta pad jaayega.

### Step 2 — Define the critical angle
Critical angle \(\theta_c\) woh incident angle hai jahaan refracted ray exactly 90° ho. Is point ke baad koi real refracted ray exist nahi karta.

Formal statement:  
$$\theta_c = \arcsin\left(\frac{n_2}{n_1}\right) \quad (n_1 > n_2)$$

### Step 3 — Apply boundary condition \(\sin\theta_2 = 1\)
Snell’s law mein \(\theta_2 = 90^\circ\) daal do. \(\sin 90^\circ = 1\) hone se equation seedha \(\theta_c\) par solve ho jaati hai.

### Step 4 — Verify the inequality for TIR
Jab \(\theta_1 > \theta_c\), left side \(n_1\sin\theta_1\) right side \(n_2\) se bada ho jaata hai. Koi real \(\theta_2\) exist nahi karta, isliye energy conservation ke liye 100 % reflection hota hai.

### Step 5 — Textbook-grade statement
For an interface between media of indices \(n_1 > n_2\), total internal reflection occurs for all angles of incidence satisfying \(\theta_1 > \arcsin(n_2/n_1)\), with the reflection coefficient becoming identically unity.

## 5. Worked examples

**Example 1 — Water-air interface**  
*Given:* \(n_\text{water}=1.33\), \(n_\text{air}=1.00\)  
*Find:* \(\theta_c\)  
Snell’s law at critical: \(1.33\sin\theta_c = 1.00\times1\)  
\(\sin\theta_c = 1/1.33 \approx 0.7519\)  
\(\theta_c = \arcsin(0.7519) \approx 48.8^\circ\)  
**48.8°**  
*Why:* Direct substitution of limiting case.  
*Reflection:* Simplest numerical case; shows \(\theta_c\) depends only on ratio of indices.

**Example 2 — Glass-air, crown glass**  
*Given:* \(n_g=1.52\)  
*Find:* \(\theta_c\)  
\(1.52\sin\theta_c = 1\)  
\(\theta_c = \arcsin(1/1.52) \approx 41.1^\circ\)  
**41.1°**  
*Why:* Same algebra, different material constant.  
*Reflection:* Demonstrates why crown-glass prisms show TIR above ~41°.

**Example 3 — Diamond-air**  
*Given:* \(n_d=2.42\)  
*Find:* \(\theta_c\)  
\(\theta_c = \arcsin(1/2.42) \approx 24.4^\circ\)  
**24.4°**  
*Why:* High index yields small critical angle, hence brilliant sparkle.  
*Reflection:* Extreme value shows how material choice controls TIR threshold.

**Example 4 — Fibre core-cladding**  
*Given:* core \(n_1=1.48\), cladding \(n_2=1.46\)  
*Find:* maximum acceptance angle inside core for TIR  
\(\theta_c = \arcsin(1.46/1.48) \approx 80.0^\circ\)  
Incident angle must exceed 80° inside core.  
**80.0°**  
*Why:* Small index difference gives large \(\theta_c\), requiring steep angles.  
*Reflection:* Real telecom fibre geometry; shows why numerical aperture is small.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using \(\theta_c = \arcsin(n_1/n_2)\) with inverted indices | Students memorise formula without direction of light travel | Always confirm \(n_1 > n_2\) before writing the ratio |
| Measuring angles from the interface instead of the normal | Confusion with reflection law | Draw the normal line first in every diagram |
| Forgetting that TIR requires denser-to-rarer travel | Over-generalising from ordinary refraction | State the direction of propagation before calculating |
| Treating \(\theta_c\) as wavelength-dependent without dispersion | Ignoring Sellmeier equation in broadband light | Check if problem states single wavelength; otherwise note dispersion |
| Assuming 100 % reflection even below \(\theta_c\) | Misreading “total” as always true | Verify incident angle exceeds \(\theta_c\) each time |
| Using degrees and radians interchangeably in calculator | Calculator mode error | Explicitly set calculator to degrees when \(\arcsin\) is used |
| Ignoring evanescent wave and thinking energy disappears | Lack of wave picture | Remember Poynting vector is tangential; energy is conserved via reflection |

## 7. The textbook-precise statement
When a plane wave is incident from medium 1 (\(n_1\)) onto medium 2 (\(n_2 < n_1\)) at an interface, total internal reflection occurs for every real angle of incidence \(\theta_1\) satisfying  
$$\theta_1 > \theta_c = \arcsin\left(\frac{n_2}{n_1}\right).$$  
Under this condition the Fresnel reflection coefficient for both polarisations equals unity and the time-averaged Poynting flux normal to the interface is identically zero. (Hecht, *Optics*, 5e, §5.4.2)

## 8. Visual

```text
          air (n₂=1.00)
          ↑
   normal │
          │
 denser  │  rarer
medium   │ medium
  n₁     │
──────────┼────────── interface
   θ₁     │     θ₂=90° (critical ray)
     \    │    /
      \   │   /
       \  │  /
        \ │ /
         \│/
          ● incident ray
```

## 9. The memory technique
**The hook** — Picture a fish swimming from deep water toward the surface; when it crosses the critical angle it “slides along the mirror” and never reaches the air.

**What to overlearn** — \(\theta_c = \arcsin(n_2/n_1)\) with \(n_1 > n_2\) and the inequality \(\theta_i > \theta_c\) for TIR.

**Spaced-repetition schedule** — Review derivation after 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — Start from Snell’s law, set \(\sin\theta_2 = 1\), solve for \(\theta_1\).

## 10. What this unlocks
Mastering critical-angle derivation lets you analyse fibre numerical aperture, prism reflectors, and evanescent-wave sensors without external references.

- Fibre-optic communication link budget calculations
- Design of TIR prisms in laser cavities
- Understanding Goos-Hänchen shift in precision metrology
- Modelling atmospheric mirages for high-altitude optics

## 11. Self-check — five questions, no answers
1. Calculate \(\theta_c\) for a fluorite (\(n=1.43\)) to air interface.
2. A ray inside an optical fibre (\(n_\text{core}=1.50\)) strikes the core-cladding boundary at 75°. If cladding index is 1.48, does TIR occur?
3. Why must the incident medium always be optically denser for TIR to be possible?
4. A student measures the angle from the interface instead of the normal and obtains 30°. What is the correct angle of incidence?
5. In a step-index fibre the core index increases by 0.01 due to temperature; qualitatively, does the critical angle increase or decrease?