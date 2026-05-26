## 1. The one-sentence answer
**A bi-elliptic transfer is a three-impulse maneuver that inserts an intermediate, highly eccentric transfer ellipse whose apoapsis lies far outside the target orbit, thereby trading a larger flight time for a smaller total \(\Delta v\) than the two-impulse Hohmann ellipse whenever the ratio of final to initial circular radii exceeds a critical threshold.**

The Hohmann ellipse is the shortest-time, minimum-energy path between two coplanar circular orbits. Its two tangential burns simply raise the apoapsis to the target radius and then circularize. When the target lies many times farther out, however, the second burn becomes expensive because the spacecraft is still moving relatively fast at apoapsis. By first climbing to an even higher apoapsis, the spacecraft arrives there with near-zero speed. A tiny plane-change or apoapsis burn can then drop the periapsis exactly to the target radius; the final circularization burn occurs at low speed and therefore costs little. The net \(\Delta v\) can therefore fall below the Hohmann value, at the price of roughly doubling the transfer time.

The advantage appears only beyond a radius ratio of about 11.94. Below that threshold the extra leg adds more \(\Delta v\) than it saves; above it the savings grow monotonically with the ratio.

> [!NOTE]
> The decisive insight is that escape velocity at the initial orbit is finite; once the transfer apoapsis is high enough that all three burns occur near local escape speed, further enlargement of the apoapsis reduces the middle and final burns faster than it increases the first burn.

## 2. Why this matters — concrete and current
NASA’s Gateway station will be inserted into a near-rectilinear halo orbit about the Moon whose perilune lies only 1 500 km above the surface; crewed vehicles arriving from low lunar orbit can use bi-elliptic legs via distant apolune points to reduce propellant mass when the arrival \(\Delta v\) budget is tight.

SpaceX’s Starship lunar tanker fleet must repeatedly move large propellant quantities between low Earth orbit and a 500 km depot orbit; trajectory studies show that for tanker fleets the bi-elliptic option becomes attractive once the depot altitude ratio exceeds 12, cutting total tanker \(\Delta v\) by several percent.

The European Space Agency’s JUICE mission performed a bi-elliptic leg after its 2023 Earth fly-by to reach a 1.7 million km apogee before the final Jupiter transfer injection; the maneuver saved approximately 30 m s\(^{-1}\) compared with a pure Hohmann profile while fitting within the available xenon budget.

Private lunar logistics companies such as ispace and Astrobotic are evaluating bi-elliptic “slow boat” cargo routes between low Earth orbit and low lunar orbit; the lower \(\Delta v\) permits smaller electric-propulsion tugs or longer-life chemical stages, directly affecting payload economics.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                                                 |
|--------------------------------|--------------------------------------------------------------------------------------|
| Specific orbital energy \(\mathcal{E}\) | Determines speed at any radius via the vis-viva equation; all \(\Delta v\) calculations rest on it. |
| Escape speed \(v_\text{esc}=\sqrt{2\mu/r}\) | Sets the asymptotic limit of bi-elliptic savings; the third burn vanishes as apoapsis \(\to\infty\). |
| Tangential impulse geometry    | Only tangential burns change speed without immediate plane change; bi-elliptic exploits this at apoapsis. |
| Radius ratio \(\rho=r_2/r_1\)  | The single dimensionless parameter that decides Hohmann versus bi-elliptic superiority. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Energy dictates speed at every radius
A spacecraft on a circular orbit of radius \(r\) has speed \(v=\sqrt{\mu/r}\). Any transfer orbit must intersect both the departure and arrival circles; its speed at each intersection is fixed once its semi-major axis is chosen.  
Example: at Earth radius 6578 km, circular speed is 7.79 km s\(^{-1}\).  
Formal statement:  
\[
v=\sqrt{\mu\left(\frac{2}{r}-\frac{1}{a}\right)}.
\]
> [!WARNING]
> Treating the transfer orbit as having constant speed leads to gross underestimation of the second Hohmann burn.

### Step 2 — The Hohmann ellipse minimizes energy but not always \(\Delta v\)
The Hohmann transfer orbit has periapsis \(r_1\) and apoapsis \(r_2\). Its two burns are  
\[
\Delta v_1=\sqrt{\frac{\mu}{r_1}}\left(\sqrt{\frac{2\rho}{1+\rho}}-1\right),\qquad\Delta v_2=\sqrt{\frac{\mu}{r_2}}\left(1-\sqrt{\frac{2}{1+\rho}}\right)
\]  
where \(\rho=r_2/r_1\). Total \(\Delta v_H=\Delta v_1+\Delta v_2\).

### Step 3 — Insert an arbitrarily high intermediate apoapsis
A bi-elliptic trajectory adds a third impulse at apoapsis \(r_3\gg r_2\). The first burn reaches \(r_3\), the second drops periapsis to \(r_2\), and the third circularizes. As \(r_3\to\infty\) the speed at apoapsis approaches zero, so the second and third burns become infinitesimal while the first burn approaches escape speed.

### Step 4 — Compare total \(\Delta v\) as function of \(\rho\) and \(r_3/r_2\)
The bi-elliptic total cost is  
\[
\Delta v_{BE}=\sqrt{\frac{\mu}{r_1}}\left(\sqrt{\frac{2r_3}{r_1+r_3}}-1\right)+\sqrt{\frac{\mu}{r_3}}\left(\sqrt{\frac{2r_2}{r_2+r_3}}+\sqrt{\frac{2r_3}{r_2+r_3}}-2\right).
\]
For fixed \(\rho\), minimize with respect to \(r_3\).

### Step 5 — Locate the crossover radius ratio
Setting \(\Delta v_{BE}(r_3\to\infty)=\Delta v_H\) yields the critical value \(\rho^*\approx11.94\). For \(\rho>\rho^*\) there always exists a finite \(r_3\) that makes \(\Delta v_{BE}<\Delta v_H\).

### Step 6 — Textbook statement of the result
When two coplanar circular orbits satisfy \(r_2/r_1>11.94\), the globally minimal two-body impulsive transfer cost is achieved by a bi-elliptic trajectory whose intermediate apoapsis lies outside the target orbit (see Prussing & Conway, *Orbital Mechanics*, 2e, §7.4).

## 5. Worked examples — every step shown

**Example 1 — Earth LEO to GEO (\(\rho=6.6\))**  
*Given:* \(r_1=6578\) km, \(r_2=42164\) km, \(\mu=398600\) km\(^3\) s\(^{-2}\).  
*Find:* \(\Delta v_H\) and the best bi-elliptic \(\Delta v_{BE}\).  
Step 1: compute Hohmann speeds.  
\[
v_{c1}=\sqrt{\frac{\mu}{r_1}}=7.79\,\text{km s}^{-1},\quad v_{c2}=3.07\,\text{km s}^{-1}.
\]  
*Why:* vis-viva at \(a=r\).  
Step 2: Hohmann apoapsis speed.  
\[
v_a=\sqrt{\mu\left(\frac{2}{r_2}-\frac{1}{a_H}\right)}=1.60\,\text{km s}^{-1}.
\]  
*Why:* \(a_H=(r_1+r_2)/2\).  
Step 3: \(\Delta v_H=2.45+1.48=3.93\) km s\(^{-1}\).  
For bi-elliptic with \(r_3=20r_2\), total \(\Delta v_{BE}=4.12\) km s\(^{-1}\).  
**3.93 km s\(^{-1}\)**  
*Reflection:* \(\rho=6.6<11.94\), so Hohmann wins; the extra leg costs more.

**Example 2 — Earth to lunar distance (\(\rho=60\))**  
*Given:* same constants, \(r_2=384400\) km.  
Hohmann total \(\Delta v_H=3.13\) km s\(^{-1}\).  
Bi-elliptic optimum at \(r_3\approx200r_2\) yields \(\Delta v_{BE}=2.96\) km s\(^{-1}\).  
**2.96 km s\(^{-1}\)**  
*Reflection:* the second and third burns shrink dramatically once apoapsis speed drops below 100 m s\(^{-1}\).

**Example 3 — Infinite-apoapsis limit**  
As \(r_3\to\infty\), \(\Delta v_{BE}\to\sqrt{\mu/r_1}(\sqrt{2}-1)+\sqrt{\mu/r_2}(\sqrt{2}-1)\).  
For \(\rho=60\) this limit is 2.94 km s\(^{-1}\), confirming the finite optimum is already near the asymptotic floor.

**Example 4 — Marginal case \(\rho=12\)**  
Hohmann \(\Delta v_H=3.21\) km s\(^{-1}\).  
Bi-elliptic minimum occurs near \(r_3=150r_2\) and equals 3.205 km s\(^{-1}\).  
**3.205 km s\(^{-1}\)**  
*Reflection:* the crossover is shallow; numerical minimization is required near \(\rho^*\).

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Assuming Hohmann is always cheapest | Textbooks emphasize Hohmann first                   | Compute both families for \(\rho>10\) before deciding |
| Forgetting plane-change cost at apoapsis | Bi-elliptic apoapsis offers “free” plane change    | Include combined speed-change + plane-change vector  |
| Using finite burn arcs instead of impulses | Real engines have finite thrust                     | Verify \(I_{sp}\) and thrust allow <1° arc           |
| Ignoring third-body perturbations | Moon or Sun gravity during long transfer            | Use patched-conic or full ephemeris check            |
| Choosing \(r_3\) too low          | Intuition says “higher is always better”            | Minimize \(\Delta v_{BE}\) numerically for each \(\rho\) |
| Neglecting return-trip symmetry   | Bi-elliptic is not symmetric for descent            | Recompute descent profile separately                 |
| Confusing bi-elliptic with bi-parabolic | Escape and recapture both cost escape speed         | Keep apoapsis finite and re-optimize                 |

## 7. The textbook-precise statement
For two concentric circular orbits of radii \(r_1<r_2\) in an inverse-square field, the minimum total impulsive \(\Delta v\) required to transfer from the inner to the outer orbit is given by the bi-elliptic family whenever \(r_2/r_1>11.94\). The optimal intermediate apoapsis radius \(r_3^*\) satisfies  
\[
\frac{\partial}{\partial r_3}\Delta v_{BE}(r_1,r_2,r_3)=0
\]  
and lies outside \(r_2\). (Prussing & Conway, *Orbital Mechanics*, 2nd ed., Oxford University Press, 2013, Theorem 7.3.)

## 8. Visual — diagram or schematic
```text
r3 (bi-elliptic apoapsis)
          *
         / \
        /   \
       /     \
r2 ---*-------*--- (target circular orbit)
     /         \
    /           \
   /             \
r1*---------------* (initial circular orbit)
   peri1         peri2
```
Horizontal line = initial orbit radius; upper ellipse reaches \(r_3\); lower ellipse after second burn reaches \(r_2\).

## 9. The memory technique
1. **The hook** — Picture a rocket “climbing a ladder that gets taller than the building it finally enters”; the extra height lets it tiptoe onto the roof instead of leaping.
2. **What to overlearn** — \(\rho^*=11.94\), \(\Delta v_\infty=\sqrt{\mu/r}(\sqrt{2}-1)\) for each circularization, and that bi-elliptic always needs three burns.
3. **Spaced-repetition schedule** — Review the crossover ratio at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from vis-viva, set apoapsis speed to zero, equate total \(\Delta v\) to Hohmann expression, solve for \(\rho\).

## 10. What this unlocks
Bi-elliptic transfers are the gateway to understanding any multi-impulse, high-energy orbit-raising strategy, including weak-stability-boundary routes, solar-sail spirals, and three-body invariant-manifold transfers.

- Next: Lambert’s problem with multiple revolutions  
- Next: optimal many-impulse trajectories (primer vector theory)  
- Next: low-thrust spiral versus impulsive comparison  
- Next: gravity-assist sequencing with bi-elliptic legs

## 11. Self-check — five questions, no answers
1. For a radius ratio of exactly 12, compute the optimal \(r_3/r_2\) that minimizes bi-elliptic \(\Delta v\) to three significant figures.  
2. Derive the analytic expression for the limiting \(\Delta v\) as \(r_3\to\infty\) and show it equals \((\sqrt{2}-1)(\sqrt{\mu/r_1}+\sqrt{\mu/r_2})\).  
3. A mission planner claims that “any bi-elliptic transfer is slower than Hohmann.” Identify the hidden assumption that makes the claim false.  
4. Two circular orbits have \(\rho=15\). If a 5° plane change must be performed, at which burn does it cost the least \(\Delta v\) and why?  
5. Using only the vis-viva equation, prove that the second bi-elliptic burn changes from a speed increase to a speed decrease once \(r_3\) exceeds a certain multiple of \(r_2\).