## 1. The one-sentence answer
**Two non-vertical lines are perpendicular if and only if the product of their slopes equals −1.**

Yeh rule coordinate geometry mein lines ke orientation ko directly link karta hai unke slopes se. Slope m = Δy/Δx hota hai, jo line ke inclination angle θ ke saath m = tan θ define karta hai. Jab do lines perpendicular hon, unke angles ka difference 90° hota hai, isliye unke tangents ka product −1 ban jaata hai.

Aap isko geometrically soch sakte hain: ek line ka slope m₁ hai to uske perpendicular line ka slope m₂ aisa hona chahiye ki dono directions ka dot product zero ho jaaye. Algebraically yeh m₁m₂ = −1 tak simplify ho jaata hai.

> [!NOTE]
> The single “aha” moment yeh hai ki perpendicular condition slope space mein ek rectangular hyperbola banati hai (m₁m₂ = −1), jo vertical line (undefined slope) ko automatically exclude karti hai.

## 2. Why this matters — concrete and current
In semiconductor layout tools such as those from TSMC and Intel, perpendicular interconnect traces are routed using this exact slope-product rule so that electric-field vectors remain orthogonal and crosstalk is minimised.

In aerospace trajectory planning at NASA’s Ames Research Center, flight-path segments that must intersect at right angles (for example, runway approach and crosswind correction) are validated by checking m₁m₂ = −1 inside the flight-management software.

Modern GPU rasterisers inside NVIDIA RTX chips use the same relation when generating perpendicular edge normals for real-time lighting calculations; any deviation produces visible shading artefacts.

In structural engineering software such as ETABS, beam–column joints are checked for orthogonality by converting member slopes into this product test before finite-element meshing begins.

Fundamental physics experiments at CERN’s LHC rely on perpendicular detector planes whose alignment is first verified in the xy-projection via the slope-product identity before full 3-D rotation matrices are applied.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Slope definition | m = tan θ links algebraic slope to geometric angle        |
| Angle-difference formula | tan(α − β) = (tan α − tan β)/(1 + tan α tan β) gives the 90° condition |
| Vertical-line exception | Slope becomes undefined, so the product rule does not apply |

Agar upar ke teen concepts se koi bhi weak hai, to pause karke unhe pehle solid kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Slope as tangent of inclination
Ek line ka slope uske horizontal se banaye angle θ ka tangent hota hai.  
Example: line jo (0,0) se (3,4) tak jaati hai uska slope m = 4/3 = tan θ, jahaan θ ≈ 53.13°.  
Formal statement:  
$$m = \tan\theta.$$  
> [!WARNING] Agar aap θ aur tan θ ko interchangeably treat karne lagen to 90° par undefined slope ka exception bhool jaoge.

### Step 2 — Angle between two lines
Do lines ke beech ka angle φ unke inclination angles ka difference hota hai: φ = |θ₁ − θ₂|.  
Example: θ₁ = 30°, θ₂ = 120° → φ = 90°.  
Formal:  
$$\phi = |\theta_1 - \theta_2|.$$  
> [!WARNING] Sign bhoolne se φ negative aa sakta hai aur tan φ galat ho jaayega.

### Step 3 — Tangent subtraction formula
φ = 90° hone par tan φ undefined ho jaata hai, isliye denominator zero hona chahiye:  
1 + m₁m₂ = 0.  
Example: m₁ = 2, m₂ = −1/2 → 1 + (2)(−1/2) = 0.  
Formal statement:  
$$\tan\phi = \frac{m_1 - m_2}{1 + m_1 m_2}.$$  
> [!WARNING] Agar denominator ko check kiye bina tan φ likh doge to 90° case miss ho jaayega.

### Step 4 — Perpendicular condition
Denominator zero ⇒ 1 + m₁m₂ = 0 ⇒ m₁m₂ = −1.  
Formal:  
$$m_1 m_2 = -1 \quad (m_1,m_2\text{ defined}).$$  
> [!WARNING] Vertical line (m undefined) ko alag se handle karna padta hai.

### Step 5 — Vector confirmation (rigorous closure)
Direction vectors ⟨1, m₁⟩ aur ⟨1, m₂⟩ ka dot product zero hona chahiye:  
1·1 + m₁m₂ = 0 ⇒ m₁m₂ = −1.  
Yeh step algebra aur geometry ko ek saath band karta hai.

## 5. Worked examples — har step show karo

**Example 1 — Simple horizontal–vertical check**  
*Given:* Line A: y = 3x + 1, Line B: y = (−1/3)x + 2.  
*Find:* Are they perpendicular?  
Step 1: m_A = 3, m_B = −1/3.  
Step 2: Product = 3 × (−1/3) = −1.  
*Why:* Direct substitution of the derived condition.  
**Final answer**  
They are perpendicular.

**Example 2 — Points se slopes nikaal kar check**  
*Given:* Points P(1,2), Q(4,6) aur R(2,7), S(6,3).  
*Find:* PQ ⊥ RS?  
m_PQ = (6−2)/(4−1) = 4/3.  
m_RS = (3−7)/(6−2) = (−4)/4 = −1.  
Product = (4/3)×(−1) = −4/3 ≠ −1.  
*Why:* Points se slope nikaalne ke baad hi product test lagta hai.  
**Final answer**  
Not perpendicular.

**Example 3 — Mixed with vertical line**  
*Given:* Line C: x = 5 (vertical), Line D: y = 4x − 1.  
*Find:* Perpendicular?  
Vertical line ka slope undefined, product rule apply nahi hota.  
Dot-product test: direction vectors ⟨0,1⟩ aur ⟨1,4⟩ → 0·1 + 1·4 = 4 ≠ 0.  
*Why:* Undefined slope ko alag case treat karna zaroori hai.  
**Final answer**  
Not perpendicular.

**Example 4 — Find missing slope**  
*Given:* Line through (0,0) slope 5, find slope of perpendicular line through (2,3).  
m₂ = −1/5.  
Equation: y − 3 = (−1/5)(x − 2).  
*Why:* Product condition seedha m₂ deta hai.  
**Final answer**  
Slope = −1/5; equation y = (−1/5)x + 17/5.

*Reflection:* Har example ne slope nikaalne, product check karne aur exception handle karne ki practice di; general pattern yahi hai ki points → slopes → product test.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting vertical lines   | Slope undefined, product rule inapplicable  | Always check if either line is x = constant  |
| Sign error in −1            | tan(90°) condition galat sign le liya       | Denominator zero test yaad rakho             |
| Using degrees instead of radians in calculator | Calculator mode mismatch               | Slope formula uses tan of actual angle, not numerical mode |
| Assuming all lines have slopes | Horizontal/vertical cases                 | Explicitly test for undefined slope          |
| Calculating angle instead of product | Extra work and rounding error           | Direct m₁m₂ = −1 test use karo               |
| Parallel lines product = +1 confusion | Mixing parallel vs perpendicular rules | Parallel: m₁ = m₂; perpendicular: m₁m₂ = −1  |
| Forgetting to verify both lines non-vertical | Silent failure on vertical cases       | Two-line check list bana lo                    |

## 7. The textbook-precise statement
Let L₁ and L₂ be two lines in the Cartesian plane with defined slopes m₁ and m₂ respectively. Then L₁ is perpendicular to L₂ if and only if m₁m₂ = −1. (If either slope is undefined the lines are perpendicular precisely when one is vertical and the other is horizontal.)  
Stewart, *Calculus*, 9e, §1.2, p. 22.

## 8. Visual — diagram or schematic
```
y
↑
|     /
|    /   m₂ = −1/2
|   /
|  /
| / 90°
|/___________→ x
  \
   \   m₁ = 2
    \
```

Horizontal axis x, vertical axis y. Line with slope 2 rising steeply; line with slope −1/2 falling gently; right angle marked at intersection.

## 9. The memory technique
1. **The hook** — Picture a “negative one” sitting between two perpendicular skis; jab slopes multiply karein to “−1” hi milega.  
2. **What to overlearn** — m₁m₂ = −1 (non-vertical case) aur vertical-horizontal pair exception.  
3. **Spaced-repetition schedule** — Review 1 day, 3 days, 7 days, 16 days, 35 days later.  
4. **First-principles fallback** — Direction vectors ⟨1,m₁⟩ · ⟨1,m₂⟩ = 0 se seedha m₁m₂ = −1 derive kar lo.

## 10. What this unlocks
Yeh rule aapko lines ke beech angles, reflection problems, normal-tangent pairs aur circle–line orthogonality tak le jaata hai.

- Angle between two lines formula
- Equation of tangent and normal to a circle
- Orthogonal trajectories in differential equations
- Reflection property of ellipses and parabolas

## 11. Self-check — five questions, no answers
1. Slope 7 wali line ke perpendicular slope kya hoga?  
2. Points (0,0), (1,1) aur (0,2), (2,0) wali lines perpendicular hain kya?  
3. Ek vertical line aur slope 0 wali line ka product test kyun fail karta hai?  
4. m = 2/3 aur m = −3/2 wali lines ka angle 90° hai? Prove karo.  
5. Agar do lines ka angle 45° hai aur ek slope 1 hai, doosri slope kya ho sakti hai?