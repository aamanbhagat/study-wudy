## 1. The one-sentence answer
**Shock waves form when an object moves faster than sound, creating a Mach cone whose angle depends only on the Mach number \(M = v/c\).**

Jab koi object sound ki speed se tez chalta hai, uske aage pressure waves compress ho jaati hain aur ek conical surface ban jaati hai jise Mach cone kehte hain. Iska angle directly Mach number se nikalta hai kyunki wavefronts ka superposition ek fixed geometry deta hai. Rocket ke liye yeh critical hai kyunki re-entry aur supersonic flight mein yeh cone heat flux, drag aur structural load decide karti hai.

Aap jab \(M > 1\) cross karte ho, linear wave equation ka solution abruptly change ho jaata hai aur discontinuity (shock) appear karti hai. Yeh discontinuity energy aur momentum conserve karti hai lekin entropy badhaati hai.

> [!NOTE]
> The single deepest insight: Mach cone ka half-angle \(\mu = \arcsin(1/M)\) sirf local speed ratio par depend karta hai, na ki object ke shape par; shape sirf shock strength badalti hai.

## 2. Why this matters — concrete and current
SpaceX Starship re-entry plasma sheath mein Mach 25+ par shock layer heat flux ko control karti hai; without accurate Mach-cone prediction, tile ablation rate galat calculate hoti hai.

ISRO’s Gaganyaan crew module aur DRDO’s hypersonic glide vehicle dono ke design mein Mach-cone angle se wave-drag aur sonic-boom footprint decide hota hai, jo mission trajectory ko directly affect karta hai.

NASA’s X-59 QueSST aircraft low-boom design mein Mach-cone shaping use karti hai taaki ground par pressure signature 75 Pa se neeche rahe; yeh 2020s ke commercial supersonic travel regulations ka basis hai.

Pratt & Whitney aur GE ke ramjet-scramjet transition studies mein Mach 5–8 ke andar oblique shock trains ka exact location engine unstart prevent karti hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Wave speed \(c\)     | Reference speed jis se object velocity compare hoti hai   |
| Linear superposition | Samajhne ke liye ki subsonic waves kaise spread hote hain |
| Doppler effect       | Frequency shift ka intuition deta hai before shock forms  |
| Conservation laws    | Shock jump conditions derive karne ke liye zaroori        |

Agar aap inme se koi bhi weak feel karte ho, pehle “Wave motion on a string” aur “Doppler effect” padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Source moving slower than sound
Ek point source jo sound speed \(c\) se kam velocity \(v\) se move kar raha hai, har instant par spherical wavefronts emit karta hai. In waves ka envelope ek smooth surface banata hai jo source ke aage bhi exist karti hai.

Example: 300 m/s par airplane udd raha hai jab \(c = 340\) m/s. Har 0.1 s mein naya sphere release hota hai aur purane spheres source ko peeche chhod dete hain.

Formal statement: radius of wavefront at emission time \(t_e\) is \(r = c(t - t_e)\), source position \(x_s = v t_e\).

> [!WARNING]
> Agar aap yahan galti se \(v = c\) laga do, to envelope suddenly disappear ho jaata hai aur aap subsonic regime ko supersonic se confuse kar doge.

### Step 2 — Source reaches sound speed
Jab \(v = c\), saare wavefronts source ke exactly aage touch karte hain aur ek plane wavefront ban jaati hai jo source ke saath move karti hai.

### Step 3 — Supersonic source and envelope construction
Ab \(v > c\). Har naya sphere purane spheres ke andar release hota hai. Unka common tangent ek cone deta hai jiska apex source par hota hai.

Formal: cone half-angle \(\mu\) satisfy karta hai \(\sin\mu = c/v = 1/M\).

### Step 4 — Mach angle derivation
Consider source ne time \(t\) pe travel kiya distance \(vt\). Same time mein sound wave radius \(ct\) tak pahunchi. Right triangle mein opposite side \(ct\), hypotenuse \(vt\), isliye \(\sin\mu = 1/M\).

### Step 5 — Weak versus strong shocks
Linear theory sirf \(\mu\) deti hai. Real fluid mein Rankine–Hugoniot relations shock strength decide karti hain; pressure jump \(\Delta p \propto (M^2 - 1)\).

### Step 6 — Rocket-relevant geometry
Rocket nose ke aage oblique shock attach rehta hai jab \(M > 1/\sin\alpha\) (where \(\alpha\) nose angle). Detached shock tab banta hai jab local \(M\) cone angle se kam ho.

## 5. Worked examples — har step show karo

**Example 1 — Simple Mach number**
*Given:* Rocket speed 1700 m/s, local sound speed 340 m/s.  
*Find:* Mach number.  
\(M = 1700 / 340 = 5\).  
*Why:* Direct division because Mach number dimensionless speed ratio hai.  
**5**

*Reflection:* Yeh step zero calculation hai lekin galti tab hoti hai jab temperature change se \(c\) badal jaaye.

**Example 2 — Mach angle**
*Given:* \(M = 2.5\).  
*Find:* Mach angle \(\mu\).  
\(\sin\mu = 1/2.5 = 0.4\), \(\mu = \arcsin(0.4) \approx 23.58^\circ\).  
*Why:* Formula \(\mu = \arcsin(1/M)\) Step 4 se directly aata hai.  
**\(\mu \approx 23.58^\circ\)**

*Reflection:* Angle sirf \(M\) par depend karta hai, rocket diameter par nahi.

**Example 3 — Time to form cone**
*Given:* Source emits sound every 0.01 s, \(v = 680\) m/s, \(c = 340\) m/s.  
*Find:* Cone length after 0.05 s.  
Source travels 34 m in 0.05 s. Sound from first emission travels 17 m. Cone slant length 34 m, axial length \(34\sqrt{1-(1/M)^2}\).  
*Why:* Pythagorean difference se axial projection nikalti hai.  
**Axial length \(\approx 29.4\) m**

*Reflection:* Multiple emission points same cone geometry repeat karte hain.

**Example 4 — Rocket nose shock**
*Given:* 10° half-angle cone, freestream \(M = 3\).  
*Find:* Attached or detached shock.  
Attachment condition \(M > 1/\sin 10^\circ \approx 5.76\). Since 3 < 5.76, shock detaches.  
*Why:* Local flow turning angle Mach cone angle se zyada hai.  
**Detached shock**

*Reflection:* Real nose design mein detached shock heat load badhaata hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using ground \(c = 340\) m/s at altitude | Temperature lapse rate bhool jaate hain     | Local \(c = \sqrt{\gamma R T}\) calculate karo |
| \(\mu = \arccos(1/M)\) galat formula    | sin aur cos confuse karte hain              | Hamesha \(\sin\mu = 1/M\) yaad rakho         |
| Linear theory strong shocks par apply   | Weak-shock assumption miss karte hain       | \(M-1 \ll 1\) check karo warna RH relations  |
| 2-D wedge aur 3-D cone angle same samajhna | Axisymmetric relief factor ignore karte hain | Cone ke liye \(\mu\) same, strength alag     |
| Shock position = Mach cone surface      | Attached shock body se thoda door hota hai  | Shock stand-off distance alag se calculate   |

## 7. The textbook-precise statement
When an object moves at constant supersonic speed \(v > c\) through an inviscid compressible fluid, the locus of all infinitesimal wavelets emitted by the object forms a right circular cone (Mach cone) whose generators make an angle \(\mu\) with the velocity vector satisfying \(\sin\mu = c/v = 1/M\), where \(M\) is the Mach number. This result follows from the method of characteristics applied to the linearized potential equation and holds only for weak disturbances; finite-strength shocks obey the Rankine–Hugoniot jump conditions instead (Anderson, *Fundamentals of Aerodynamics*, 6e, §9.6).

## 8. Visual — diagram or schematic
```
          source (rocket nose)
               *
              /|\
             / | \   <- Mach cone surface
            /  |  \
           /   μ   \
          /    |    \
         /     |     \
        /      |      \
       *-------|-------*   <- wavefront spheres
               |
            velocity vector v
```
Cone half-angle \(\mu\), axis along velocity. Spheres ke tangents hi cone banate hain.

## 9. The memory technique
1. **The hook** — Imagine a boat faster than water waves; its wake is exactly the Mach cone.
2. **What to overlearn** — \(M = v/c\), \(\sin\mu = 1/M\), and \(\mu\) independent of amplitude for weak waves.
3. **Spaced-repetition schedule** — Review 1 din, 3 din, 7 din, 16 din, 35 din later.
4. **First-principles fallback** — Wavefront spheres draw karo, common tangents lo, right triangle mein \(\sin\mu = ct/vt\) likho.

## 10. What this unlocks
Yeh section aapko supersonic aerodynamics, nozzle flow, and re-entry heating ke liye ready karta hai.

- Oblique shock relations
- Prandtl–Meyer expansion fans
- Hypersonic similarity rules
- Sonic boom carpet calculations

## 11. Self-check — five questions, no answers
1. Ek object \(M = 1.8\) par udd raha hai. Mach angle kitna hoga?
2. Agar local temperature 250 K hai aur rocket 2000 m/s par hai, to \(M\) kya hai (\(\gamma = 1.4\), \(R = 287\))?
3. Kyun ek blunt body par detached shock banta hai jab pointed body par attached?
4. Linear theory strong shock ke liye kyun galat prediction deti hai?
5. Agar Mach cone angle 30° hai, to minimum \(M\) kya hona chahiye taaki shock attached rahe 15° nose ke liye?