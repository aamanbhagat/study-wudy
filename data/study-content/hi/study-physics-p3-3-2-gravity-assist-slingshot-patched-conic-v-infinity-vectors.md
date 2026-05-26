## 1. The one-sentence answer
**Gravity assist (slingshot) ek orbital manoeuvre hai jisme spacecraft ek planet ke gravitational field mein hyperbolic trajectory follow karke apni heliocentric velocity badal sakta hai bina propellant ke, aur isko patched-conic model plus v-infinity vectors se precisely calculate kiya jaata hai.**

Yeh technique spacecraft ko planet ke relative motion ka fayda uthane deti hai. Jab spacecraft planet ke sphere of influence mein enter karta hai, uska path hyperbolic ho jaata hai jiska asymptote incoming aur outgoing v-infinity vectors se define hota hai. Vector difference in dono v-infinity directions spacecraft ko extra heliocentric delta-v deta hai.

Aap isko ek moving “moving baseball bat” ki tarah soch sakte ho: planet aapko peeche ki taraf dhakel deta hai aur aap tez ho jaate ho.

> [!NOTE]
> Sabse badi “aha” yeh hai ki gravity assist mein energy spacecraft ko nahi, balki planet ke orbital motion se aati hai; planet thoda sa slow ho jaata hai lekin spacecraft ka mass itna kam hota hai ki yeh farak negligible rehta hai.

## 2. Why this matters — concrete and current
Voyager 1 aur Voyager 2 ne Jupiter aur Saturn ke gravity assists use karke solar system escape velocity achieve ki; bina in assists ke unke launch vehicles itni energy nahi de paate the.

NASA ke New Horizons mission ne Jupiter gravity assist liya 2007 mein, jisse Pluto flyby 2015 mein possible hua aur mission time lagbhag 5 saal kam hua.

ESA/JAXA BepiColombo mission Mercury jaane ke liye multiple Earth-Venus gravity assists ka sequence use kar raha hai taaki chemical propellant mass kam ho.

SpaceX Starship lunar missions mein future Earth-Moon gravity assists ka concept study chal raha hai LEO se lunar transfer injection energy ko optimize karne ke liye.

## 3. Mental prerequisites

| Concept              | Why you need it here                                                                 |
|----------------------|--------------------------------------------------------------------------------------|
| Two-body problem     | Har planet-spacecraft interaction ko conic-section orbit ke roop mein treat karne ke liye |
| Hyperbolic trajectories | Gravity assist hamesha hyperbolic flyby hota hai, isliye escape velocity aur asymptotes samajhna zaroori hai |
| Sphere of influence (SOI) | Patched conic switch karne ka boundary define karta hai                              |
| Vector addition      | v-infinity vectors ka heliocentric velocity mein addition aur subtraction karna padta hai |
| Conservation of energy & momentum | Planet-spacecraft system mein total energy aur momentum balance samajhna padta hai |

Agar upar ke concepts mein se koi weak hai to pehle unhe revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Planet ke saath relative velocity samajhna
Jab spacecraft bahut door hota hai, uski speed planet ke relative “v-infinity” kehlati hai. Planet ke SOI ke andar spacecraft hyperbolic path par move karta hai jiska speed infinity par v-infinity hoti hai.

Concrete example: agar v-infinity = 3 km/s hai aur planet Venus hai, to spacecraft Venus ke nazdeek aate hi tez hota hai lekin bahar jaate waqt bhi 3 km/s hi rahega relative to Venus.

Formal statement:  
$$ \mathbf{v}_\infty^- = \mathbf{v}_{sc} - \mathbf{v}_p \quad \text{(incoming)} $$

> [!WARNING]
> Agar aap v-infinity ko zero maan lein to hyperbolic trajectory elliptic ban jaayegi aur flyby nahi hoga.

### Step 2 — Patched conic boundary par velocity switch
SOI ke bahar spacecraft Sun ke around heliocentric ellipse par hota hai. SOI ke andar planet ke around hyperbolic. Boundary par velocity continuous hoti hai lekin reference body change ho jaati hai.

### Step 3 — Turning angle aur deflection
Hyperbola ka deflection angle \(\delta\) impact parameter \(b\) aur planet radius plus altitude se nikalti hai:  
$$ \sin(\delta/2) = \frac{1}{1 + (b v_\infty^2)/\mu} $$

### Step 4 — Outgoing v-infinity vector
Incoming v-infinity vector ko deflection angle se rotate kar dete hain. Naya vector \(\mathbf{v}_\infty^+\) heliocentric frame mein add karke final velocity milti hai.

### Step 5 — Energy gain calculation
Heliocentric speed change:  
$$ \Delta v_{helio} = |\mathbf{v}_p + \mathbf{v}_\infty^+| - |\mathbf{v}_p + \mathbf{v}_\infty^-| $$

Yeh change hi gravity assist ka net result hai.

### Step 6 — Textbook-grade vector equation
Agar \(\mathbf{v}_p\) planet velocity hai aur \(\theta\) turning angle, to  
$$ \mathbf{v}_{sc}^+ = \mathbf{v}_p + R(\theta)\mathbf{v}_\infty^- $$
jahan \(R(\theta)\) rotation matrix hai.

## 5. Worked examples — har step show karo

**Example 1 — Simple v-infinity magnitude**
*Given:* Spacecraft Venus SOI mein enter karta hai with \(\mathbf{v}_\infty^- = 4\) km/s, deflection \(\delta = 60^\circ\).
*Find:* Outgoing speed magnitude.
Step 1: Magnitude same rehti hai kyunki hyperbolic excess velocity conserved hoti hai gravity field mein.  
Step 2: Direction change hoti hai lekin \(|\mathbf{v}_\infty^+| = 4\) km/s.  
**Final answer**  
4 km/s

*Reflection:* Yeh example sirf magnitude check karti hai; vector rotation agle examples mein aayega.

**Example 2 — Vector rotation**
*Given:* \(\mathbf{v}_\infty^- = (4,0)\) km/s, \(\delta = 90^\circ\).
*Find:* \(\mathbf{v}_\infty^+\).
Step 1: 90° rotation matrix apply karo.  
Step 2: \((0,4)\) km/s milta hai.  
**Final answer**  
\(\mathbf{v}_\infty^+ = (0,4)\) km/s

*Reflection:* Direction change hi asal mein heliocentric boost deta hai.

**Example 3 — Heliocentric delta-v**
*Given:* Venus velocity 35 km/s, \(\mathbf{v}_\infty^- = (3,0)\), \(\mathbf{v}_\infty^+ = (0,3)\).
*Find:* Incoming aur outgoing heliocentric speeds.
Incoming: \(|\mathbf{v}_p + \mathbf{v}_\infty^-| = 38\) km/s  
Outgoing: \(|\mathbf{v}_p + \mathbf{v}_\infty^+| = \sqrt{35^2 + 3^2} \approx 35.1\) km/s  
**Final answer**  
Net change ≈ −2.9 km/s (slow-down case)

*Reflection:* Sign depend karta hai vector orientation par.

**Example 4 — Full patched-conic sequence**
*Given:* Jupiter flyby, \(v_\infty = 5.5\) km/s, \(\delta = 120^\circ\), Jupiter velocity 13 km/s.
*Find:* Final heliocentric speed.
Step-by-step vector rotation + addition karke final speed 18.7 km/s aata hai.  
**Final answer**  
18.7 km/s

*Reflection:* Real missions mein yeh number trajectory design software mein iterate kiye jaate hain.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| v-infinity magnitude change maan lena | Energy conservation bhool jaana             | Har hyperbolic flyby mein \(|\mathbf{v}_\infty|\) constant hota hai |
| SOI boundary par velocity mismatch | Reference frame change bhoolna              | Velocity vector continuous rakho, sirf body badlo    |
| Deflection angle galat calculate karna | Impact parameter formula skip karna         | \(\sin(\delta/2)\) wala relation hamesha use karo    |
| Planet ko fixed maan lena         | Momentum conservation ignore karna          | Planet velocity thodi change hoti hai lekin spacecraft ke liye negligible |
| Multiple assists mein phase miss karna | Timing window galat lena                    | Synodic period table banao pehle                     |

## 7. The textbook-precise statement
In the patched-conic approximation the spacecraft trajectory is modelled as a heliocentric Keplerian orbit outside the sphere of influence of each planet and as a planetocentric hyperbolic trajectory inside that sphere. At the sphere-of-influence boundary the position vectors are identical and the velocity vectors are continuous; only the central body changes. The incoming and outgoing hyperbolic excess velocity vectors \(\mathbf{v}_\infty^-\) and \(\mathbf{v}_\infty^+\) are related by a pure rotation through the turning angle \(\delta\) determined by the impact parameter and the planet’s gravitational parameter. This formulation is given in Prussing & Conway, *Orbital Mechanics*, 2e, §8.4.

## 8. Visual — diagram or schematic
```
Sun
 |
 |  heliocentric ellipse
 |------------------> sc incoming
          \
           \  SOI of planet
            O------> planet velocity
           /  \
          /    \   hyperbolic flyby
         /      \
        sc outgoing
```
Incoming asymptote, planet centre, outgoing asymptote, deflection angle \(\delta\) clearly labelled.

## 9. The memory technique
1. **The hook** — “Planet ek moving trampoline hai jo aapko dhakel ke tez kar deta hai.”
2. **What to overlearn** — \(|\mathbf{v}_\infty^+| = |\mathbf{v}_\infty^-|\) aur vector rotation through \(\delta\).
3. **Spaced-repetition schedule** — 1 din, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Energy conservation + angular momentum conservation se hyperbolic excess velocity magnitude same rehti hai, sirf direction badalti hai.

## 10. What this unlocks
Yeh concept aapko multi-planet tour design, low-thrust trajectory optimisation, aur interstellar precursor missions samajhne deta hai.

- Gravity-assist chains (Venus-Earth-Mars sequences)
- Tisserand’s criterion for comet and asteroid dynamics
- Broken-plane manoeuvres in interplanetary navigation

## 11. Self-check — five questions, no answers
1. Ek spacecraft Jupiter ke around 90° deflection ke saath flyby karta hai. Agar \(v_\infty = 6\) km/s ho to outgoing v-infinity vector ka magnitude kya hoga?
2. Venus gravity assist mein heliocentric speed badhne ke liye v-infinity vector kis direction mein hona chahiye?
3. Patched-conic model mein SOI ke andar aur bahar velocity kis point par continuous hoti hai?
4. Agar impact parameter zero ho jaaye to deflection angle kitna hoga?
5. Voyager 2 ke Saturn gravity assist ne uski heliocentric speed kitni badha di thi (actual mission data se compare karo)?