## 1. The one-sentence answer
**Heights and distances problems use trigonometric ratios (primarily tan, sin, and cos) to calculate unknown vertical heights or horizontal distances when an angle of elevation or depression is known.**

Yeh problems asal mein right-angled triangles par based hote hain jahaan aap ek observed angle se opposite ya adjacent side nikaalte ho. Aap line of sight ko hypotenuse maante ho aur ground ko base, jisse simple equations ban jaati hain. Jab multiple angles ya objects hote hain, tab aap successive triangles join karke relations build karte ho. 

Pehli baar dekhne par yeh sirf "building ki height nikaalna" lagta hai, lekin yeh actually coordinate geometry aur vectors ki taraf pehla bridge hai.

> [!NOTE]
> Core "aha" yeh hai ki angle of elevation/depression hamesha horizontal se measure hota hai, isliye tan θ = height / distance directly applicable hota hai bina kisi projection adjustment ke.

## 2. Why this matters — concrete and current
Surveying companies jaise Trimble aur Leica Geosystems drone-based LiDAR mapping mein heights and distances ke trigonometric models use karte hain taaki real-time terrain elevation calculate kar sakein.

SpaceX Falcon 9 landing burns mein onboard cameras angles of depression measure karke landing pad se vertical distance aur horizontal offset nikaalte hain, jisse thrust vector adjustments possible hote hain.

ISRO ke Chandrayaan-3 mission ne lunar surface pe rover ke position fix karne ke liye successive elevation angles se distance triangulation kiya tha.

Civil engineering firms jaise AECOM high-rise building construction mein crane boom angles aur shadow lengths se temporary heights verify karte hain bina total station setup kiye.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Right-angled triangle definitions | Sine, cosine, tangent ratios seedha yahin se aate hain    |
| Angle of elevation and depression | Problem statement mein yeh angles hi given hote hain      |
| Basic algebraic rearrangement | Height = distance × tan θ jaise equations solve karni padti hain |
| Pythagoras theorem   | Hypotenuse verify karne ya diagonal distance nikaalne ke liye |

Agar aapko tan θ = opposite/adjacent abhi bhi mechanically yaad nahi, toh pehle basic trig ratios wapas padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Visualise the line of sight
Aap ek point se kisi tall object ki top ko dekhte ho. Line of sight aur ground ke beech ka angle elevation angle kehlata hai. Iska matlab yeh hai ki aap ek right triangle bana sakte ho jahaan vertical side height hai aur horizontal side distance.

Example: 30° elevation angle se 50 m door ek tower dikhta hai. Formal statement: tan θ = h / d, jahaan θ elevation angle, h height, d horizontal distance.

> [!WARNING]
> Agar aap angle ko vertical surface se measure karoge instead of horizontal se, toh pura triangle galat banega aur answer 90° off ho jaayega.

### Step 2 — Introduce angle of depression
Jab observer upar hota hai aur neeche object dekhta hai, tab angle depression kehlata hai. Yeh angle bhi horizontal se hi measure hota hai, isliye tan θ = h / d same relation apply hota hai.

Formal: depression angle θ ke liye bhi tan θ = opposite / adjacent identical rehta hai.

### Step 3 — Single triangle setup
Given one angle and one side, solve for the unknown height ya distance. Equation h = d × tan θ directly use karo.

### Step 4 — Two-angle problems
Jab ek hi object ke liye do different positions se angles milein, tab do triangles share karte hain common height. Let d1 aur d2 distances hon, θ1 aur θ2 angles, toh h = d1 tan θ1 = d2 tan θ2, phir d1 − d2 solve karo.

### Step 5 — Include shadow or mirror cases
Kabhi kabhi object ka shadow ya mirror reflection se angle milta hai. Shadow case mein sun ke elevation angle se tan θ = h / shadow length.

### Step 6 — Textbook-grade statement
Agar successive angles θ aur φ hain with distance x between observation points, toh height h = x / (cot θ − cot φ).

## 5. Worked examples — har step show karo

**Example 1 — Simple tower height**
*Given:* 40 m door khade hokar 35° elevation angle se tower top dikhta hai.  
*Find:* Tower height.  
Step 1: tan 35° = h / 40.  
Step 2: h = 40 × tan 35°.  
*Why:* Direct tan definition apply ki kyunki single right triangle bana.  
**h = 28.01 m** (approx).  
*Reflection:* Yeh basic case hai; galti sirf calculator mode mein ho sakti hai.

**Example 2 — Angle of depression**
*Given:* Lighthouse 60 m high, ship 200 m door, depression angle from top.  
*Find:* Depression angle.  
tan θ = 60 / 200 = 0.3 → θ = arctan(0.3).  
*Why:* Depression bhi horizontal se measure hota hai, isliye same ratio.  
**θ ≈ 16.7°**.  
*Reflection:* Students often vertical angle lete hain; yahan avoid kiya.

**Example 3 — Two positions**
*Given:* Tower ke paas 50 m door 30° elevation, 150 m door 15° elevation.  
*Find:* Tower height.  
h = 50 tan 30° = 50 / √3.  
Cross-check with second: h = 150 tan 15°.  
*Why:* Dono expressions equal set kiye.  
**h ≈ 28.87 m**.  
*Reflection:* Distance difference use karke consistency verify hoti hai.

**Example 4 — Shadow problem**
*Given:* 4 m lamppost ka shadow 3 m, sun elevation angle find karo.  
tan θ = 4 / 3 → θ = arctan(4/3).  
*Why:* Shadow horizontal base banata hai.  
**θ ≈ 53.13°**.  
*Reflection:* Real sun movement problems mein yeh daily use hota hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                     | How to avoid it                          |
|-----------------------------|------------------------------------|------------------------------------------|
| Using sin instead of tan    | Students hypotenuse soch lete hain | Hamesha check karo ki base horizontal hai ya nahi |
| Measuring angle from vertical | Diagram galat padhte hain          | Explicitly "horizontal se" note karo     |
| Forgetting units conversion | Mixed m aur km                     | Pehle saare lengths same unit mein laao  |
| Ignoring observer height    | Eye level zero assume karte hain   | Agar given ho toh add/subtract karo      |
| Calculator degree/radian mode | Default radian rehta hai           | Har calculation se pehle DEG mode set karo |
| Two-angle mein sign error   | d1 − d2 galat direction            | Diagram mein arrows laga ke direction fix karo |

## 7. The textbook-precise statement
In a right triangle formed by a vertical object of height h, a horizontal distance d, and a line of sight making an angle θ with the horizontal, the fundamental relation is tan θ = h/d. When two observation points separated by distance x yield angles of elevation θ and φ (θ > φ), the height satisfies h = x ⋅ (tan θ tan φ) / (tan θ − tan φ). All angles are measured from the horizontal; the observer’s eye height, if nonzero, must be added to h before applying the formula. (Stewart, *Precalculus*, 8e, §6.2)

## 8. Visual — diagram or schematic
```
Observer (eye level 0)
          \
           \  θ (elevation)
            \ 
------------- horizontal ground -----------------
              d (distance)
              | 
              | h (height)
              tower
```

Horizontal line observer se niklegi, line of sight θ angle par jaayegi, vertical tower h height ki.

## 9. The memory technique
1. **The hook** — Socho ek surya ast ho raha hai aur tum apni shadow ki lambai se apni height nikaal rahe ho; wohi tan θ wala triangle hai.
2. **What to overlearn** — tan θ = h/d, aur two-angle formula h = x / (cot θ − cot φ).
3. **Spaced-repetition schedule** — 1 din baad, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Agar formula bhool jaaye toh right triangle draw karke opposite/adjacent label karke tan define kar do.

## 10. What this unlocks
Yeh section aapko 3D coordinate systems aur vectors ki taraf le jaata hai.  
- Next: Law of sines in oblique triangles  
- Navigation and bearing problems  
- Projectile motion angle calculations  
- Surveying and GIS mapping techniques  

## 11. Self-check — five questions, no answers
1. Ek 25 m building se 40° depression angle par ek car dikhti hai; car kitni door hai?  
2. Do observation points 80 m apart hain; angles 25° aur 40° hain. Tower height kya hogi?  
3. Agar aap 2 m height par khade ho aur 30° elevation se 15 m door pole dikhe, pole ki asal height kya hai?  
4. Shadow length 5 m hai aur sun ka elevation 60°; object height find karo.  
5. Kyun agar aap angle ko vertical wall se measure karoge toh tan function galat result dega?