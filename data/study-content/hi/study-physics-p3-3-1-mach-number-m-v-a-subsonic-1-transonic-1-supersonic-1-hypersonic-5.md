## 1. The one-sentence answer
**Mach number M = V/a** ek dimensionless ratio hai jo local flow speed V ko local speed of sound a se divide karta hai, aur iske basis par flow ko subsonic (M < 1), transonic (M ≈ 1), supersonic (M > 1) aur hypersonic (M > 5) regimes mein classify kiya jaata hai.

Speed of sound a temperature aur medium properties par depend karti hai, isliye ek hi velocity alag-alag altitudes par alag M produce karti hai. Jab M badhta hai, density changes aur pressure waves ka behaviour dramatically badal jaata hai — yeh compressible flow ka core insight hai. Aap jab M ko calculate karte ho, aap actually decide kar rahe ho ki flow equations mein kaunsi terms (jaise density variation) important hain aur kaunsi neglect ki ja sakti hain.

> [!NOTE]
> Sabse badi “aha” yeh hai ki M = 1 ek mathematical singularity nahi balki ek physical transition point hai jahaan pressure waves apne aap se aage nahi ja sakte, isliye information upstream tak pahunchna band ho jaati hai.

## 2. Why this matters — concrete and current
NASA’s X-59 QueSST aircraft deliberately flies at M ≈ 0.8 ke just neeche taaki sonic boom ko shape di ja sake; designers ko exact M distribution pata hona zaroori hai warna cabin pressure loads galat predict honge.

SpaceX Starship re-entry trajectory M = 25 tak pahunchti hai; heat-shield tiles ka design hypersonic regime ke real-gas effects aur dissociation par depend karta hai jo sirf M ke through correctly model kiye ja sakte hain.

Lockheed Martin F-35 ke internal weapons bay doors ka timing aur shock-wave interaction transonic regime (M = 0.95–1.05) mein sharply badalta hai, isliye flight-control laws ko M-dependent gain scheduling use karni padti hai.

European XFEL aur laser-plasma accelerators mein relativistic electron bunches ka effective Mach number > 100 hota hai; beam-physics teams compressible-flow analogies use karti hain taaki wakefield structures predict kar sakein.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Speed of sound       | a = √(γRT) Mach number ki denominator hai                 |
| Isentropic relations | Pressure, density aur temperature ratios M par depend karte hain |
| Continuum assumption | Fluid element concept tabhi valid hai jab Knudsen number low ho |
| Reference frames     | Local static vs stagnation quantities ko distinguish karna |

Agar speed of sound aur isentropic flow aapke liye clear nahi hain, to pehle woh sections padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Speed of sound as information speed
Sound waves chhote pressure disturbances hain jo fluid mein propagate karti hain. Inki speed a = √(∂p/∂ρ)_s hoti hai. Jab koi object is speed se kam move karta hai, uske aage ke molecules ko disturbance pahunch jaati hai aur woh pehle se displace ho jaate hain.

Concrete example: 340 m/s par ek chhoti pressure wave 1 second mein 340 m door tak jaati hai. Agar aap 200 m/s se bike chala rahe ho, wave aapko pehle se “bata” deti hai.

Formal statement:  
$$a = \sqrt{\left(\frac{\partial p}{\partial\rho}\right)_s}$$

> [!WARNING]
> Agar aap is step mein isothermal derivative use kar doge to a ki value √(RT) ban jaayegi jo galat hai; flow almost always isentropic hota hai.

### Step 2 — Definition of Mach number
Mach number ko local velocity V aur local speed of sound a ka ratio define karte hain:  
$$M = \frac{V}{a}$$

Yeh ratio dimensionless hai isliye geometry aur scale independent comparison deti hai.

### Step 3 — Regime boundaries
- M < 1 → subsonic: disturbances aage ja sakti hain
- M ≈ 1 → transonic: dono regimes mix hote hain, local supersonic pockets bante hain
- M > 1 → supersonic: disturbances sirf Mach cone ke andar hi rehti hain
- M > 5 → hypersonic: dissociation, ionization aur real-gas effects dominate karte hain

### Step 4 — Mach wave angle
Supersonic flow mein disturbance Mach cone banati hai jiska half-angle μ satisfy karti hai  
$$\sin\mu = \frac{1}{M}$$

Jab M badhta hai, cone narrow hoti jaati hai.

### Step 5 — Compressible flow equations switch
Continuity, momentum aur energy equations mein density ρ ko constant maanna tabhi valid hai jab M ≪ 1. Jab M > 0.3, ρ variation ko retain karna padta hai; isliye full compressible Navier–Stokes ya Euler equations use hote hain.

### Step 6 — Textbook-grade statement
Local Mach number M(x) har point par flow ke thermodynamic state ko determine karta hai. Isentropic relations  
$$\frac{p_0}{p} = \left(1 + \frac{\gamma-1}{2}M^2\right)^{\gamma/(\gamma-1)}$$  
tabhi apply hote hain jab flow isentropic aur M locally defined ho.

## 5. Worked examples — har step show karo

**Example 1 — Simple classification**  
*Given:* V = 250 m/s, T = 288 K, γ = 1.4, R = 287 J kg⁻¹ K⁻¹  
*Find:* Mach number aur regime  
a = √(γRT) = √(1.4 × 287 × 288) = 340.2 m/s  
M = 250 / 340.2 = 0.735  
*Why:* Temperature se a nikala kyunki speed of sound sirf local T par depend karti hai.  
**0.735 — subsonic**

**Example 2 — Altitude effect**  
*Given:* Same V = 250 m/s lekin T = 216.7 K (11 km altitude)  
a = √(1.4 × 287 × 216.7) = 294.1 m/s  
M = 250 / 294.1 = 0.850  
*Why:* Thanda air → kam a → zyada M, isliye aircraft ko same IAS par bhi higher Mach par fly karna padta hai.  
**0.850 — subsonic lekin transonic ke kareeb**

**Example 3 — Supersonic classification**  
*Given:* V = 680 m/s, T = 250 K  
a = √(1.4 × 287 × 250) = 315.7 m/s  
M = 680 / 315.7 = 2.15  
*Why:* M > 1 hone se flow properties suddenly change; shock waves possible hain.  
**2.15 — supersonic**

**Example 4 — Hypersonic edge case**  
*Given:* Re-entry vehicle V = 7500 m/s, T = 250 K  
a = 315.7 m/s  
M = 7500 / 315.7 = 23.76  
*Why:* M > 5 hone par vibrational excitation aur dissociation shuru ho jaate hain, perfect-gas model toot jaata hai.  
**23.76 — hypersonic**

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Constant a = 340 m/s lena   | Sea-level value yaad rehti hai              | Hamesha local static temperature use karo    |
| M = 1 ko “exactly 1” maanna | Transonic band actually 0.8–1.2 hota hai    | Local M distribution dekho, na ki freestream |
| γ = 1.4 hamesha daalna      | Air ke liye default lagta hai               | High T par γ(T) table check karo             |
| Stagnation pressure ignore karna | Isentropic relation bhool jaate hain     | M jaanne ke baad p₀/p formula turant apply karo |

## 7. The textbook-precise statement
The Mach number at any point in a compressible flow is defined by  
$$M = \frac{V}{\sqrt{\gamma R T}}$$  
where V is the local flow velocity, T the local static temperature, γ the ratio of specific heats and R the gas constant. The flow is subsonic when M < 1, sonic when M = 1, supersonic when M > 1 and hypersonic when M ≳ 5. All isentropic relations between stagnation and static quantities are valid only when the flow is adiabatic and the local Mach number is used. (Anderson, *Fundamentals of Aerodynamics*, 6e, §4.3)

## 8. Visual — diagram or schematic
```
          Subsonic (M<1)          Transonic          Supersonic (M>1)
               .                    .                    .
              / \                  /|\                  / \
             /   \                / | \                /   \
            /     \              /  |  \              /     \
           /   o   \            /   |   \            /   o   \
          /         \          /    |    \          /         \
         /___________\        /_____|_____\        /___________\ 
               |                    |                    |
            object               mixed               Mach cone
```

## 9. The memory technique
1. **The hook** — “Sub-Trans-Super-Hyper” ko “Samosa-Tikka-Soup-Hakka” ki tarah yaad rakho: Samosa (slow), Tikka (touch 1), Soup (supersonic), Hakka (hyper).
2. **What to overlearn** — a = √(γRT) aur M = V/a dono cold recall hone chahiye.
3. **Spaced-repetition schedule** — 1 din, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Temperature se a nikaalo, V divide karo, phir regime decide karo.

## 10. What this unlocks
Mach number aapko compressible Bernoulli equation, normal/oblique shock relations, Prandtl-Meyer expansion aur nozzle design tak le jaata hai.

- Normal shock tables
- Area-Mach number relation (A/A*)
- Hypersonic similarity parameters

## 11. Self-check — five questions, no answers
1. 500 m/s velocity par 10 km altitude (T = 223 K) par Mach number kya hai?
2. Agar local M = 0.95 ho lekin freestream M = 0.82, flow kis regime mein hai?
3. M = 2.0 par Mach angle μ kitna hai?
4. Kyun M > 5 par γ = 1.4 use karna galat ho sakta hai?
5. Ek student ne a = 340 m/s fixed karke M calculate kiya; uska answer kis case mein sabse zyada galat hoga?