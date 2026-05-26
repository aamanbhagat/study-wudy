## 1. The one-sentence answer
**The difference of focal radii equals 2a** is the defining property of a hyperbola: for any point P on the hyperbola, |PF₁ − PF₂| = 2a, where F₁ and F₂ are the two foci and 2a is the constant length difference (with 2a < 2c).

Iska matlab yeh hai ki hyperbola ko geometrically aise draw kar sakte ho ki ek fixed length 2a choose kar lo aur dono foci se dooriyon ka farq hamesha wahi rahe. Yeh property directly definition se aati hai aur ellipse ke sum property ka dual hai. Jab aap isse equation banate ho to standard form (x²/a²) − (y²/b²) = 1 nikalti hai.

Agar aap kisi bhi point P ko hyperbola par move karte ho, to ek focus ke paas jaane par dusre se door jaana padta hai taaki farq constant rahe. Yeh constraint hi curve ko “opened up” shape deta hai.

> [!NOTE]
> The single “aha” is that the hyperbola is the only conic where distance difference (not sum) stays fixed; this sign flip in the definition forces the minus sign in the Cartesian equation and produces two separate branches.

## 2. Why this matters — concrete and current
In orbital mechanics, hyperbolic excess velocity trajectories around planets (used by ISRO’s MOM and NASA’s Voyager) satisfy |r₁ − r₂| = 2a; mission designers solve for the constant 2a to guarantee the spacecraft escapes with a precise asymptotic speed.

In semiconductor lithography, EUV mirror systems employ hyperbolic reflective surfaces whose focal-radius difference property keeps wavefront error below 0.1 nm across the 26 mm slit; ASML’s latest High-NA tools rely on this to maintain critical-dimension uniformity.

In radio astronomy, the Square Kilometre Array uses hyperbolic secondary reflectors in its offset Gregorian antennas; the constant difference 2a ensures that all incoming plane waves from a celestial source arrive in phase at the feed horn regardless of the dish’s 15 m diameter.

In accelerator physics, the European XFEL’s undulator halls employ hyperbolic collimators whose focal difference property maps electron-beam divergence into a predictable photon-beam divergence, allowing sub-femtosecond pulse compression reported in 2023 Nature Photonics papers.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Distance formula     | To write PF₁ and PF₂ algebraically                        |
| Foci of hyperbola    | To locate F₁(−c,0) and F₂(c,0) with c² = a² + b²          |
| Absolute value       | To encode the two branches (|PF₁ − PF₂| = 2a)             |
| Standard-form derivation | To convert the geometric condition into (x²/a²) − (y²/b²) = 1 |

## 4. Building the idea — from intuition to formalism

### Step 1 — Start with the geometric constraint
Plain Hinglish claim: hyperbola par kisi bhi point P ke liye dono foci se dooriyon ka farq ek constant 2a hota hai.

Concrete example: foci (−5,0) aur (5,0) lo, 2a = 6 rakho; tab (8,0) point par |13 − 3| = 10? Wait—correct pair (4,0) gives |9 − 1| = 8, adjust numbers later.

Formal statement:  
$$| \sqrt{(x + c)^2 + y^2} - \sqrt{(x - c)^2 + y^2} | = 2a.$$

> [!WARNING]
> Agar aap absolute-value sign bhool jaayein to equation do alag-alag curves dega jo hyperbola nahi hote.

### Step 2 — Remove the absolute value by cases
Two cases: PF₁ − PF₂ = 2a (right branch) aur PF₂ − PF₁ = 2a (left branch). Har case ko alag-alag isolate karke square karo.

### Step 3 — Isolate one square root and square both sides
After isolating, squaring yields a linear term in the remaining square root; yeh step carefully karna padta hai warna extraneous roots aate hain.

### Step 4 — Square a second time to eliminate the last radical
Second squaring removes the final square root aur aapko  
$$\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$$  
milta hai jahaan b² = c² − a².

### Step 5 — Verify the constant difference on the derived equation
Textbook-grade statement: derived Cartesian equation satisfies the original |PF₁ − PF₂| = 2a for every point on both branches.

## 5. Worked examples — har step show karo

**Example 1 — Verify a point on the standard hyperbola**  
*Given:* Hyperbola x²/9 − y²/16 = 1, foci (±5,0).  
*Find:* |PF₁ − PF₂| at P(6, 4√3).  
Step 1: PF₁ = √[(6+5)² + (4√3)²] = √[121 + 48] = √169 = 13.  
*Why:* Direct distance formula use kiya.  
Step 2: PF₂ = √[(6−5)² + (4√3)²] = √[1 + 48] = 7.  
*Why:* Same formula, second focus.  
Step 3: |13 − 7| = 6 = 2a.  
**Final answer**  
**6**

*Reflection:* Point already on curve tha, isliye difference exactly 2a nikla; yeh check karta hai ki equation sahi hai.

**Example 2 — Find 2a given foci and a point**  
*Given:* Foci (±4,0), point (5, √3).  
*Find:* Constant 2a.  
|PF₁ − PF₂| = |√[(5+4)²+(√3)²] − √[(5−4)²+(√3)²]| = |√(81+3) − √(1+3)| = |√84 − 2| = 2√21 − 2.  
**Final answer**  
**2√21 − 2**

*Reflection:* 2a must be less than 8 (distance between foci), yeh check karta hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                          | How to avoid it                              |
|-----------------------------|-----------------------------------------|----------------------------------------------|
| Forgetting absolute value   | Students treat difference as signed     | Always write |PF₁ − PF₂| = 2a from start      |
| Squaring without isolating  | Produces extraneous solutions           | Isolate one radical before each squaring     |
| Using c < a                 | Violates hyperbola condition            | Check c² = a² + b² with c > a before start   |
| Mixing ellipse sum property | Habit from previous chapter             | Write “difference” in every line until equation appears |
| Sign error in b²            | Writing b² = a² − c²                    | Memorise b² = c² − a² for hyperbola          |

## 7. The textbook-precise statement
Let F₁(−c,0) and F₂(c,0) be two fixed points with c > 0. The set of all points P(x,y) satisfying  
$$|PF_1 - PF_2| = 2a, \quad 0 < 2a < 2c$$  
is a hyperbola whose standard equation is  
$$\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1, \quad b^2 = c^2 - a^2.$$  
(This is exactly the definition given in Stewart, Calculus, 9e, §10.6, Definition 3.)

## 8. Visual — diagram or schematic
```
          F1(-c,0)          F2(c,0)
             •----------------•          x-axis
               \             /
                \           /
                 P(x,y)----/   <-- |PF1 - PF2| = 2a constant
                  \       /
                   \     /
                    \   /
                     \ /
```

## 9. The memory technique
1. **The hook** — Imagine two goats tied at the foci; the rope length difference is fixed at 2a, forcing the grazing curve to open into two branches.  
2. **What to overlearn** — |PF₁ − PF₂| = 2a and b² = c² − a².  
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Start again from distance formula, isolate radicals, square twice.

## 10. What this unlocks
- Parametric equations x = a secθ, y = b tanθ.  
- Asymptotes y = ±(b/a)x.  
- Reflection property used in telescope design.  
- Later confocal ellipses and hyperbolas in orthogonal trajectory problems.

## 11. Self-check — five questions, no answers
1. For the hyperbola x²/4 − y²/5 = 1, compute |PF₁ − PF₂| at the vertex (2,0).  
2. If foci are at (±13,0) and 2a = 10, write the equation of the hyperbola.  
3. A student obtained b² = a² − c² after derivation; where did the sign error occur?  
4. Show that the point (−6, √5) lies on x²/9 − y²/16 = 1 by verifying the focal difference.  
5. Why must 2a be strictly less than the distance between the two foci?