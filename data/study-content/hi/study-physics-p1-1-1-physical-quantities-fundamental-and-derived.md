## 1. The one-sentence answer
**Physical quantities are measurable properties of nature; fundamental quantities form the independent base set while derived quantities are constructed from them through multiplication and division of powers.**

Aap jab kisi cheez ko measure karte ho, jaise rocket ki speed ya uska mass, toh woh ek physical quantity hoti hai. Kuch quantities aisi hain jo khud se define hoti hain aur unko aur chhota nahi kiya ja sakta — inko **fundamental quantities** kehte hain. Baaki sab quantities in fundamental ones ke combinations se banti hain, jaise velocity = distance/time, isliye unko **derived quantities** bolte hain.

Iska matlab yeh hai ki har measurement system mein aapko sirf 7 fundamental quantities (SI units mein) yaad rakhni padti hain; baaki sab unke powers aur products se nikal jaate hain. Rocket science mein yeh farak samajhna zaroori hai kyunki thrust, specific impulse aur orbital energy sab derived hain lekin unke dimensions fundamental quantities se hi aate hain.

> [!NOTE]
> The single “aha” moment is realising that once you fix the seven base units, every other measurable thing in physics automatically gets its unit and dimensional formula without any extra definition.

## 2. Why this matters — concrete and current
ISRO’s PSLV and GSLV missions calculate propellant mass flow rate (kg s⁻¹) which is derived from the fundamental quantities mass and time; any mismatch in the derived unit immediately shows up as incorrect thrust predictions in post-flight telemetry.

SpaceX’s Raptor engine controller converts chamber pressure (derived from force per area) into real-time mixture-ratio commands; the firmware treats pressure as kg m⁻¹ s⁻² so that sensor calibration constants remain consistent across different propellant loads.

Semiconductor fabs that produce radiation-hardened chips for satellites rely on derived quantities such as electron mobility (m² V⁻¹ s⁻¹) when modelling single-event upsets; the mobility formula is built only from charge, mass and electric field, all traceable to the five base quantities.

Orbital-mechanics packages such as NASA’s GMAT propagate state vectors using acceleration, a derived quantity whose dimension m s⁻² must stay dimensionally homogeneous with gravitational parameter μ (m³ s⁻²) or the integrator produces secular energy drift.

LIGO’s strain measurement h is dimensionless yet obtained by dividing two lengths; the fact that both lengths share the same fundamental dimension (metre) lets scientists subtract mirror displacement noise at 10⁻¹⁹ m level.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| SI base units        | To know which seven quantities are declared fundamental   |
| Exponent arithmetic  | To combine powers when forming derived quantities         |
| Dimensional homogeneity | To check whether an equation can possibly be correct     |

Agar aapko exponents ya SI prefixes yaad nahi, toh pehle woh revise kar lo warna derived-quantity formulas galat banenge.

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify what can be measured independently
Kuch quantities aisi hain jo kisi aur quantity par depend nahi karti; unko aap seedha instrument se padh sakte ho. Mass ko balance par, length ko scale par, time ko clock par measure kar sakte hain. Velocity ko aap seedha nahi measure kar sakte; uske liye distance aur time dono chahiye.

Example: ek weighing scale aapko sirf mass batati hai, kisi aur cheez ki zaroorat nahi.

Formal statement: A quantity is fundamental if its dimension cannot be expressed as a product of powers of other quantities.

> [!WARNING]
> Agar aap galti se velocity ko fundamental maan lete ho toh aapko har naye speed ke liye alag unit define karni padegi aur system inconsistent ho jaayega.

### Step 2 — Choose the base set for mechanics
Mechanics ke liye teen fundamental quantities kaafi hain: mass (M), length (L), time (T). In teen se velocity, acceleration, force, energy sab ban jaate hain.

Formal: [M], [L], [T] constitute the mechanical base.

### Step 3 — Write any quantity as a product of powers
Har derived quantity ko M^a L^b T^c ke roop mein likha ja sakta hai. Velocity ke liye a=0, b=1, c=-1.

$$[v] = \mathrm{L}^1\mathrm{T}^{-1}$$

### Step 4 — Apply the same rule to force
Force = mass × acceleration, acceleration = L T^{-2}, isliye

$$[F] = \mathrm{M}^1\mathrm{L}^1\mathrm{T}^{-2}$$

### Step 5 — Extend to thermodynamics and electromagnetism
Agar heat capacity ya charge add karna ho toh temperature (Θ) aur current (I) ko base mein daal dete hain. Ab total seven base quantities ho jaate hain.

### Step 6 — Check dimensional homogeneity of equations
Dono taraf dimensions match hone chahiye. Newton’s second law F = ma already match karti hai kyunki [F] = [m][a].

### Step 7 — Obtain the unit from the dimension formula
Jab aap [F] = M L T^{-2} jaante ho toh unit Newton = kg m s^{-2} automatically mil jaata hai.

## 5. Worked examples — har step show karo

**Example 1 — Dimension of momentum**
- *Given:* Momentum p = m v
- *Find:* [p]
- Step 1: [m] = M  
  *Why:* mass is fundamental.
- Step 2: [v] = L T^{-1}  
  *Why:* already derived in Step 3 above.
- Step 3: [p] = [m][v] = M L T^{-1}  
  *Why:* multiply dimensions like ordinary powers.
**Final answer**  
**[p] = M L T^{-1}**

*Reflection:* Simple multiplication shows how two derived quantities combine; same method scales to any formula.

**Example 2 — Dimension of pressure**
- *Given:* Pressure = force / area
- *Find:* [P]
- [F] = M L T^{-2}  
  *Why:* from Step 4.
- Area = L²  
  *Why:* length squared.
- [P] = M L T^{-2} / L² = M L^{-1} T^{-2}  
  *Why:* subtract exponents when dividing.
**Final answer**  
**[P] = M L^{-1} T^{-2}**

*Reflection:* Division of dimensions is the only new operation; students often forget the negative sign.

**Example 3 — Check if kinetic energy formula is dimensionally correct**
- *Given:* (1/2) m v²
- *Find:* Does [KE] match [energy]?
- [m v²] = M (L T^{-1})² = M L² T^{-2}  
  *Why:* square each dimension.
- Energy dimension from work = force × distance = M L T^{-2} × L = M L² T^{-2}  
  *Why:* matches exactly.
**Final answer**  
**Dimensionally consistent**

*Reflection:* This quick check catches 90 % of algebraic mistakes before numerical calculation.

**Example 4 — Derive unit of specific impulse**
- *Given:* I_sp = thrust / (mass-flow rate × g₀)
- *Find:* SI unit
- Thrust = M L T^{-2}  
- Mass-flow = M T^{-1}  
- g₀ = L T^{-2}  
- I_sp = (M L T^{-2}) / ((M T^{-1})(L T^{-2})) = T  
  *Why:* M and L cancel, leaving only time.
**Final answer**  
**Unit of I_sp is seconds (s)**

*Reflection:* The cancellation reveals why specific impulse is quoted in seconds even though it feels like a velocity.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Treating velocity as fundamental  | Everyday language calls speed a “basic” idea | Always ask “can I measure it with one instrument alone?” |
| Forgetting negative exponents     | Students write L/T instead of L T^{-1}      | Write every derived quantity in single-line power form |
| Adding quantities with different dimensions | Intuition says “add lengths and times”     | Check dimensions on both sides before any arithmetic |
| Using g = 9.8 without units       | g is already a derived quantity             | Always attach m s^{-2} when substituting g   |
| Confusing mass and weight         | Weight is force, hence derived              | Write [W] = M L T^{-2} every time you see weight |
| Mixing SI and CGS base sets       | Some books still use dyne                   | Fix one system (preferably SI) for the entire problem |
| Writing radian as a derived unit  | Angle is dimensionless                      | Remember [θ] = 1 (no M, L, T)                |

## 7. The textbook-precise statement
A physical quantity is said to be fundamental when its dimension is chosen as one of the independent base dimensions of the system; all other quantities are derived and possess dimensions that are products of powers of the base dimensions (Resnick, Halliday & Walker, *Fundamentals of Physics*, 12e, §1-4). In the International System the seven base dimensions are mass (M), length (L), time (T), electric current (I), thermodynamic temperature (Θ), amount of substance (N) and luminous intensity (J). Any derived quantity Q therefore admits a unique dimensional formula  
$$[Q] = \mathrm{M}^a\mathrm{L}^b\mathrm{T}^c\mathrm{I}^d\Theta^e\mathrm{N}^f\mathrm{J}^g$$  
where the exponents are integers or rational numbers fixed by the defining relation of Q.

## 8. Visual — diagram or schematic
```text
Fundamental (base)          Derived (built)
      M ─┐
      L ─┼──► velocity   L T⁻¹
      T ─┘
      M ─┐
      L ─┼──► force      M L T⁻²
      T ─┘
```
Arrow means “combined by multiplication/division of powers”.

## 9. The memory technique
1. **The hook** — Picture seven coloured bricks labelled M, L, T, I, Θ, N, J; every derived quantity is a Lego structure built from these bricks only.
2. **What to overlearn** — The three mechanical base dimensions M, L, T and the fact that velocity is always L T⁻¹, force always M L T⁻².
3. **Spaced-repetition schedule** — Review the seven base dimensions after 1 day, 3 days, 7 days, 16 days and 35 days.
4. **First-principles fallback** — If you forget a formula, start from the defining equation (e.g., F = ma) and rebuild the dimension by multiplying the known dimensions of each symbol.

## 10. What this unlocks
Once you master fundamental versus derived quantities you can instantly verify any new equation that appears in kinematics or orbital mechanics and you gain the language needed for dimensional analysis.

- Next topic: dimensional analysis and Buckingham π theorem
- Vector representation of derived quantities such as velocity and acceleration
- Unit conversions between SI and customary systems used in older rocket literature

## 11. Self-check — five questions, no answers
1. Write the dimensional formula of kinetic energy and show it matches work.
2. A student claims “power is fundamental because engines produce it”. Refute in one sentence using the definition.
3. Derive the dimension of gravitational constant G from F = G m₁ m₂ / r².
4. Check whether the equation s = ut + at² is dimensionally homogeneous.
5. In a hypothetical system where force, velocity and time are chosen as base quantities, express mass in terms of these three.