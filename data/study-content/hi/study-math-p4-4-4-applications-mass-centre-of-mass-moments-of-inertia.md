## 1. The one-sentence answer
**Mass, centre of mass and moments of inertia are computed by integrating scalar or vector density functions over a region in \(\mathbb{R}^2\) or \(\mathbb{R}^3\).**

In multivariable calculus aap density \(\rho(x,y)\) ya \(\rho(x,y,z)\) ko double ya triple integral ke through integrate karte ho to total mass nikaalte ho. Centre of mass ke coordinates tab milte hain jab aap moment integrals ko total mass se divide karte ho, jaise \( \bar{x} = \frac{M_y}{m} \). Moments of inertia similarly second-moment integrals se aate hain jo rotation ke resistance ko measure karte hain.

Yeh sab ek hi framework mein aate hain: density function ko appropriate powers of coordinates ke saath integrate karna. Agar region irregular hai to Cartesian ya polar coordinates choose karna padta hai.

> [!NOTE]
> The single deepest insight is that every quantity here is simply a weighted integral of the density; once you see mass, moments and inertia as different weighting functions applied to the same \(\rho\), the entire topic collapses into one idea.

## 2. Why this matters — concrete and current
SpaceX uses centre-of-mass calculations for Falcon 9 stages so that the vehicle remains stable during re-entry burns; small shifts in propellant distribution change the centre of mass by centimetres and must be compensated by gimbal angles.

In semiconductor lithography, ASML’s EUV machines model the moment of inertia of the wafer stage to sub-nanometre precision; any error in the inertia tensor produces vibration that ruins overlay accuracy.

NASA’s Perseverance rover team computed the moments of inertia of the entire spacecraft stack before each trajectory correction manoeuvre; these values feed directly into the attitude-control algorithms that keep the heat shield pointed correctly.

Geophysicists at the Lamont-Doherty Earth Observatory integrate density models of the Himalayas to obtain the centre of mass of the mountain range; the resulting gravitational torque explains measured plate-flexure data.

Automotive companies such as Tesla run finite-element integrations over battery-pack densities to locate the vehicle centre of mass within 2 mm; this number governs rollover thresholds reported in NHTSA tests.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Double and triple integrals | All mass and moment formulas are literally these integrals |
| Polar / cylindrical coordinates | Most symmetric laminas and solids become trivial in these systems |
| Continuous density function \(\rho\) | Replaces the discrete “point-mass” assumption             |
| First-moment definitions   | Centre of mass is first moment divided by total mass      |

If any row is missing, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Mass as total “stuff”
Plain Hinglish claim: mass tab nikalti hai jab aap density ko poore area ya volume ke upar integrate karte ho.  
Concrete example: ek square lamina \(0\le x\le 1\), \(0\le y\le 1\) jiski density \(\rho(x,y)=x+y\) hai.  
Formal statement:
\[
m=\iint_D\rho(x,y)\,dA.
\]
> [!WARNING]
> Agar aap density ko constant maan lete ho jab woh actually vary karti hai, to mass galat aa jaayegi aur saare baaki quantities bhi.

### Step 2 — First moments about the axes
Plain Hinglish claim: \(M_y\) aur \(M_x\) moments hain jo mass ko distance se weight karte hain.  
Concrete example: same square mein \(M_y=\iint_D x\rho(x,y)\,dA\).  
Formal statement:
\[
M_y=\iint_D x\rho(x,y)\,dA,\qquad M_x=\iint_D y\rho(x,y)\,dA.
\]

### Step 3 — Centre-of-mass coordinates
Plain Hinglish claim: centre of mass \(\bar{x},\bar{y}\) moments ko total mass se divide karke milta hai.  
Formal statement:
\[
\bar{x}=\frac{M_y}{m},\qquad\bar{y}=\frac{M_x}{m}.
\]

### Step 4 — Moments of inertia about an axis
Plain Hinglish claim: inertia \(I_x\) aur \(I_y\) second-power distances ke saath integrate hote hain.  
Formal statement:
\[
I_x=\iint_D y^2\rho(x,y)\,dA,\qquad I_y=\iint_D x^2\rho(x,y)\,dA.
\]

### Step 5 — Parallel-axis theorem (textbook statement)
Agar \(I_{cm}\) centre-of-mass ke around inertia hai aur \(d\) distance hai, to kisi parallel axis ke liye \(I=I_{cm}+md^2\).

## 5. Worked examples — har step show karo

**Example 1 — Uniform triangular lamina**  
*Given:* Triangle \(0\le x\le 1\), \(0\le y\le 1-x\), \(\rho=1\).  
*Find:* mass and centre of mass.  
\[
m=\int_0^1\int_0^{1-x}1\,dy\,dx=\int_0^1(1-x)\,dx=\frac12.
\]
\[
M_y=\int_0^1\int_0^{1-x}x\,dy\,dx=\int_0^1x(1-x)\,dx=\frac16,\quad\bar{x}=\frac13.
\]
*Why* each integral: inner integral height \((1-x)\) deta hai, outer \(x\) weight karta hai.  
**Final answer:** \(m=\frac12\), \((\bar{x},\bar{y})=(\frac13,\frac13)\).  
*Reflection:* symmetry ne \(\bar{y}=\bar{x}\) forced kiya; pattern triangular regions mein common hai.

**Example 2 — Variable density disk**  
*Given:* Disk \(x^2+y^2\le1\), \(\rho=x^2+y^2\).  
*Find:* mass.  
Switch to polar: \(m=\int_0^{2\pi}\int_0^1 r^2\cdot r\,dr\,d\theta=\frac{\pi}{2}\).  
*Why* polar: radial symmetry density mein.  
**Final answer:** \(m=\frac{\pi}{2}\).

**Example 3 — Moment of inertia of a square plate**  
*Given:* Square \([-1,1]\times[-1,1]\), \(\rho=1\).  
*Find:* \(I_z\) about origin.  
\[
I_z=\int_{-1}^1\int_{-1}^1(x^2+y^2)\,dx\,dy= \frac{8}{3}.
\]
*Why* add \(x^2+y^2\): perpendicular-axis theorem se \(I_z=I_x+I_y\).  
**Final answer:** \(\frac{8}{3}\).

**Example 4 — Composite body**  
*Given:* semicircular disk radius 2, density 3, joined to rectangle.  
*Find:* overall centre of mass (full calculation omitted for brevity but follows same four integrals).  
**Final answer:** \((\bar{x},\bar{y})\) obtained by adding moments and masses of each piece.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to divide by \(m\) | Students treat moments as centre of mass    | Always write \(\bar{x}=M_y/m\) explicitly    |
| Using wrong coordinate system | Region symmetry ignore kar dete hain        | Check boundaries; switch to polar early      |
| Density treated as constant   | “Uniform” assumption habit                  | Read problem statement twice for \(\rho(x,y)\) |
| Sign error in limits          | Region description galat padhte hain        | Sketch region before integrating             |
| Parallel-axis distance squared| Forget \(d^2\)                              | Write theorem statement before applying      |
| Units mismatch                | Mix kg and g in composite problems          | Keep SI units throughout                     |

## 7. The textbook-precise statement
Let \(D\subset\mathbb{R}^2\) be a bounded lamina with continuous density \(\rho(x,y)\). The mass, first moments and centre of mass are defined by
\[
m=\iint_D\rho(x,y)\,dA,\qquad
M_y=\iint_D x\rho(x,y)\,dA,\qquad
M_x=\iint_D y\rho(x,y)\,dA,\qquad
(\bar{x},\bar{y})=\Bigl(\frac{M_y}{m},\frac{M_x}{m}\Bigr)
\]
provided \(m>0\). The moments of inertia about the coordinate axes are
\[
I_x=\iint_D y^2\rho(x,y)\,dA,\qquad I_y=\iint_D x^2\rho(x,y)\,dA.
\]
(Stewart, *Calculus*, 9e, §15.5–15.6.)

## 8. Visual — diagram or schematic
```
y
^
|     (x̄,ȳ)  ← centre of mass
|    /\
|   /  \   lamina D
|  /____\
+-------------> x
  0          1
```
Region \(D\) bounded by \(y=0\), \(x=0\), \(x+y=1\); density arrows point inward showing higher \(\rho\) near \(x=1\).

## 9. The memory technique

1. **The hook** — picture a thin metal plate; mass is total metal, centre of mass is balance point, inertia is how hard it is to spin the plate about that point.
2. **What to overlearn** — \(m=\iint\rho\,dA\), \(\bar{x}=M_y/m\), \(I_x=\iint y^2\rho\,dA\).
3. **Spaced-repetition schedule** — review integrals after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — start from definition “total mass = integral of density”, then attach coordinate weights for moments and squares for inertia.

## 10. What this unlocks
These integrals appear inside derivations of the inertia tensor, in rigid-body dynamics courses, and as the starting point for variational principles in continuum mechanics.

- Green’s theorem applications to moments  
- Divergence theorem for 3-D centre of mass  
- Finite-element stiffness matrices in engineering  

## 11. Self-check — five questions, no answers
1. For the unit disk with \(\rho=r\), compute mass in polar coordinates.  
2. A square plate has density proportional to distance from one corner; where does the centre of mass lie relative to the geometric centre?  
3. Show that \(I_z=I_x+I_y\) for any planar lamina (perpendicular-axis theorem).  
4. Identify the coordinate-system mistake that would produce a negative mass.  
5. Given two separate laminas, write the composite centre-of-mass formula without integrating the union.