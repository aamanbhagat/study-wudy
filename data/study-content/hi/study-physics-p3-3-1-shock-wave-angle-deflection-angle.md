## 1. The one-sentence answer

**Shock wave angle (β) aur deflection angle (θ) oblique shock waves mein flow direction change aur wave inclination ke beech ka geometric-mathematical link hain.**

Jab supersonic flow kisi wedge ya corner se guzarta hai, toh ek oblique shock ban-ta hai jo flow ko abruptly turn kar deta hai. β shock surface aur incoming flow ke beech ka angle hota hai, jabki θ actual flow deflection angle hota hai. Dono angles Mach number aur specific heat ratio γ par depend karte hain.

Iska core yeh hai ki normal shock relations ko local coordinate frame mein rotate karke oblique case handle kiya jaata hai, lekin mass, momentum aur energy conservation same rehte hain. Result ek transcendental equation ban-ta hai jo β aur θ ko relate karti hai.

> [!NOTE]
> Sabse badi aha yeh hai ki ek hi Mach number aur deflection θ ke liye do possible β values ho sakte hain (weak aur strong shock), aur ek maximum θ hota hai jiske baad shock detached ho jaata hai.

## 2. Why this matters — concrete and current

NASA X-43A scramjet flights mein inlet design ke liye exact oblique shock angles calculate kiye gaye the taaki Mach 9.6+ flow ko efficiently compress kiya ja sake bina excessive total pressure loss ke.

SpaceX Starship re-entry par bow shock ke deflection behaviour ko model karne ke liye θ-β-M curves use hote hain, kyunki heat shield par local shock angle heat flux decide karta hai.

ISRO’s Reusable Launch Vehicle Technology Demonstrator (RLV-TD) ke hypersonic phase mein oblique shock-boundary layer interaction ko predict karne ke liye yeh angles zaroori the.

Boeing aur Airbus supersonic business jet concepts (jaise Boom Overture) mein engine nacelle shocks ko fuselage se deflect karne ke liye β aur θ ka precise control sonic boom signature kam karne ke liye use hota hai.

Natural phenomena mein, Titan ke dense nitrogen atmosphere mein Huygens probe ke entry shock wave angle ne heat load aur trajectory dono ko affect kiya tha.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Normal shock relations   | Oblique shock ko local normal component mein decompose karke pressure, density jumps nikaalte hain |
| Mach number definition   | M = V/a; sirf supersonic M > 1 par hi oblique shocks stable rehte hain |
| Rankine-Hugoniot equations | Mass, momentum, energy conservation ko wave frame mein apply karna padta hai |
| γ (specific heat ratio)  | Equation of state aur isentropic relations mein yeh constant chahiye |
| Flow deflection at wall  | Geometry se θ directly milta hai (wedge angle), jo boundary condition ban-ta hai |

Agar normal shock relations ya Mach wave concept weak hain toh pehle woh padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Normal shock ko oblique frame mein ghumana
Oblique shock asal mein normal shock hi hota hai jo incoming velocity vector ke saath tilted hai. Iska matlab local normal component hi shock ke across jump experience karta hai.

Ek 10° wedge par M = 2 ka flow aata hai. Normal shock sirf stagnation pressure loss deta, lekin yahan flow ko sirf 10° turn karna hai, isliye shock inclined hota hai.

Mathematically, incoming velocity V₁ ko decompose karo:  
$$V_{1n}=V_1\sin\beta,\qquad V_{1t}=V_1\cos\beta.$$

> [!WARNING]
> Agar aap V_{1t} ko bhi shock ke across change hone ka soch lein toh momentum conservation violate ho jaayega aur pressure jump galat nikalega.

### Step 2 — Tangential velocity continuity
Shock surface ke parallel velocity component continuous rehta hai kyunki koi force tangential direction mein nahi hai.

Isliye V_{1t}=V_{2t}. Iska seedha matlab hai downstream Mach number ka tangential part same rehta hai.

Formal:  
$$M_{1t}=M_{2t}=M_1\cos\beta.$$

### Step 3 — Normal component par normal-shock formulae
Normal component par hi normal shock relations apply hote hain. Pressure ratio, density ratio, normal Mach number jump sab V_n par depend karte hain.

Normal Mach number M_{1n}=M_1\sin\beta. Pressure ratio:  
$$ \frac{p_2}{p_1}=1+\frac{2\gamma}{\gamma+1}(M_{1n}^2-1). $$

### Step 4 — Deflection angle ka geometric link
Downstream flow direction change θ, β aur downstream normal Mach number se nikal-ta hai.

Tanθ = (V_{1n}-V_{2n})/V_{1t}. Isko normal shock velocity relation se substitute karne par θ-β-M equation milti hai:  
$$ \tan\theta=2\cot\beta\frac{M_1^2\sin^2\beta-1}{M_1^2(\gamma+\cos 2\beta)+2}. $$

### Step 5 — Weak aur strong shock solutions
θ-β-M equation quadratic nature ki wajah se ek hi (M,θ) pair ke liye do β solutions hote hain. Weak solution (chhota β) zyadatar attached shocks mein hota hai.

M=2, θ=10° par weak β≈39.3° aur strong β≈83.7° dono mathematically valid hain, lekin strong wala almost normal shock jaisa hota hai aur usually experimental setup mein nahi dikhta.

### Step 6 — Detachment criterion
Maximum θ (θ_max) ke baad koi attached oblique shock solution nahi bachta. Flow abhi bhi turn karna chahta hai lekin shock detach ho jaata hai aur bow shock ban jaata hai.

θ_max ka value M aur γ par depend karta hai; M=2, γ=1.4 ke liye θ_max≈23°.

## 5. Worked examples — har step show karo

**Example 1 — Simple wedge deflection**  
*Given:* M₁=2.0, γ=1.4, wedge half-angle θ=10°.  
*Find:* β (weak solution).  

θ-β-M equation mein values daalo:  
tan(10°)=0.1763 = 2 cotβ (4 sin²β −1)/(2(1.4+cos2β)+2).  
Numerical solve karne par β≈39.3°.  
**39.3°**  
*Reflection:* Equation transcendental hai isliye numerical root finding zaroori; weak root hi physically attached shock deta hai.

**Example 2 — Pressure ratio after oblique shock**  
*Given:* M₁=2.5, θ=15°, γ=1.4.  
*Find:* p₂/p₁.  

Pehle β nikaalo (≈45.3°). Phir M_{1n}=2.5 sin45.3°≈1.77.  
Normal shock pressure ratio:  
p₂/p₁=1+2*1.4/2.4*(1.77²−1)=5.82.  
**5.82**  
*Reflection:* Sirf normal component jump deta hai; tangential part pressure ko affect nahi karta.

**Example 3 — Strong versus weak**  
*Given:* M₁=3.0, θ=20°.  
*Find:* dono β aur unke M_{2n}.  

Weak β≈42.8°, strong β≈78.1°.  
Weak case M_{2n}=0.78 (subsonic normal component), strong case M_{2n}=0.51.  
**Weak: 42.8°, Strong: 78.1°**  
*Reflection:* Strong solution downstream mein zyada entropy produce karta hai.

**Example 4 — Maximum deflection**  
*Given:* M₁=4.0, γ=1.4.  
*Find:* θ_max.  

θ-β-M curve ko differentiate karke extremum dhundho ya numerically scan karo. θ_max≈27.5° milta hai.  
**27.5°**  
*Reflection:* Isse zyada deflection chahiye toh shock must detach.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| β=90° assume karna jab θ chhota ho | Normal shock habit se | Always check θ_max table pehle |
| γ=1.4 bhool kar γ=1.67 use karna | Air ke liye galat assumption | Problem statement mein gas clearly note karo |
| Strong shock solution ko physically real maan lena | Equation dono deta hai | Attached flow geometry check karo; strong rarely attached |
| M_{2n} >1 rehne ki galti | Normal component subsonic hona chahiye | Post-shock M_{2n}=M_2 sin(β−θ) verify karo |
| β aur θ ko interchange karna | Notation confusion | β hamesha wave angle, θ deflection angle |

## 7. The textbook-precise statement

For steady, inviscid, adiabatic flow of a perfect gas with constant γ across an oblique shock wave, the relationship between upstream Mach number M₁, shock angle β, and flow deflection angle θ is given by  
$$\tan\theta=2\cot\beta\frac{M_1^2\sin^2\beta-1}{M_1^2(\gamma+\cos 2\beta)+2},$$  
where β is measured from the upstream velocity vector, θ is the turning angle imposed by the wall, and the solution must satisfy M_{1n}=M_1\sin\beta>1 together with the entropy condition. (Anderson, *Modern Compressible Flow*, 3e, §4.3)

## 8. Visual — diagram or schematic

```
          upstream flow
               →
    β ↗︎────────────── shock wave
     /               \
    /                 \ downstream
   /   θ (deflection)  \ flow
  wall───────────────────
```

β: angle between shock and upstream velocity; θ: angle between wall and downstream velocity.

## 9. The memory technique

1. **The hook** — Imagine a supersonic jet flying past a 10° ramp; the shock is like a tilted “speed breaker” whose steepness (β) decides kitna zor se flow mudega (θ).
2. **What to overlearn** — θ-β-M equation ka exact form aur yeh ki weak β hamesha θ_max ke neeche hota hai.
3. **Spaced-repetition schedule** — 1 din baad equation likho, 3 din baad ek example solve karo, 7 din baad dono weak-strong roots nikaalo, 16 din baad θ_max table banao, 35 din baad real wedge geometry se compare karo.
4. **First-principles fallback** — Agar equation bhool jaaye toh normal component decompose karo, tangential velocity constant rakho, aur normal shock pressure jump laga kar θ nikaal lo.

## 10. What this unlocks

Yeh concept aage oblique shock reflections, shock-expansion theory, supersonic inlet design, aur Prandtl-Meyer expansion fans ko samajhne ke liye zaroori hai.

- Shock reflection off walls (regular aur Mach reflection)
- Supersonic nozzle design with correct back-pressure
- Hypersonic vehicle wave-rider shapes
- Linearised supersonic thin-airfoil theory

## 11. Self-check — five questions, no answers

1. M₁=2.0, γ=1.4, θ=5° par weak β kya hoga?
2. Agar θ_max cross kar jaaye toh flow structure kaunsa banta hai?
3. Strong solution kyun experimentally kam dikhta hai?
4. M_{1n} <1 hone par kya hota hai?
5. Wedge angle 30° aur M=1.8 par shock attached rahega ya detach?