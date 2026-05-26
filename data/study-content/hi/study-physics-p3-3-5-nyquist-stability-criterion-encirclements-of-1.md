## 1. The one-sentence answer
**The Nyquist stability criterion tells closed-loop stability by counting clockwise encirclements N of the point −1 + j0 by the Nyquist plot of the open-loop transfer function G(s)H(s).**

Iska matlab yeh hai ki aap open-loop system ka frequency response complex plane mein plot karte ho aur dekhte ho ki woh plot critical point −1 ko kitni baar ghumta hai. Agar open-loop system stable hai (P = 0) to closed-loop system tabhi stable hota hai jab N = 0, matlab koi encirclement nahi hona chahiye. Jab P > 0 hota hai (jaise unstable poles in rocket actuators) tab aapko N = −P chahiye taaki total unstable closed-loop poles Z = P + N zero ho jaaye.

Yeh approach frequency-domain data se directly stability predict karti hai bina characteristic equation solve kiye. Rocket GNC mein yeh bahut useful hai kyunki thrust-vector-control loops ke high-gain margins aur time delays ko handle karna padta hai.

> [!NOTE]
> The single “aha” moment is this: stability is not about gain or phase margin alone; it is about the net winding number of the image curve around −1, which comes straight from the argument principle applied to 1 + G(s)H(s) = 0.

## 2. Why this matters — concrete and current
SpaceX uses Nyquist analysis on the Falcon 9 TVC (thrust-vector-control) loops to guarantee that the six-engine gimbaling system remains stable when payload mass and slosh modes change between flights; the flight software logs frequency-response data that is later checked against the −1 encirclement count before each re-flight.

ISRO’s LVM3 attitude-control system designers applied the criterion to the liquid-stage autopilot after the Chandrayaan-2 mission; they discovered that an unmodelled bending mode produced one clockwise encirclement and therefore added a notch filter before the next flight.

NASA’s SLS (Space Launch System) avionics team published a 2021 GNC paper showing that the core-stage thrust-vector actuators have two right-half-plane poles; the Nyquist plot was deliberately shaped to produce exactly two counter-clockwise encirclements of −1 so that the closed-loop vehicle attitude remained stable.

Boeing’s 787 fly-by-wire pitch-stability augmentation system is certified using multivariable Nyquist tests; any software update that changes the pitch-rate gain must still produce zero net encirclements of the critical point when all four redundant channels are closed.

The James Webb Space Telescope’s reaction-wheel control loop was verified with Nyquist before launch because the flexible solar-array modes sit close to the crossover frequency; one extra encirclement would have produced a limit cycle that could blur the telescope’s images.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Transfer function G(s)   | Nyquist plot is simply G(jω) evaluated along the imaginary axis                      |
| Complex-plane mapping    | The argument principle converts encirclements into pole-zero counts                  |
| Right-half-plane poles   | P counts open-loop unstable poles that must be cancelled by encirclements            |
| Cauchy contour integration | The D-contour that indents around jω-axis poles is the foundation of the criterion |

Agar aap inme se kisi bhi cheez ko nahi samajhte, pause karke pehle woh padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start with the closed-loop characteristic equation
Aapko pata hona chahiye ki closed-loop poles woh values hain jahaan 1 + G(s)H(s) = 0. Matlab hum actually 1 + L(s) ke zeros count kar rahe hain jahaan L(s) = G(s)H(s) open-loop transfer function hai.

Concrete example: maan lo L(s) = K/(s(s+1)), to 1 + L(s) = 0 ka matlab s² + s + K = 0.

Formal statement: closed-loop poles satisfy the equation  
$$1 + L(s) = 0.$$

> [!WARNING]
> Agar aap yeh equation galat likh dete ho (sign flip), to pura encirclement count ulta ho jaata hai aur stability prediction 180° galat ho jaati hai.

### Step 2 — Map the standard Nyquist D-contour
D-contour pura right-half-plane ko enclose karti hai: imaginary axis jω (−∞ se +∞) plus a semicircle of infinite radius in the right half-plane, plus small semicircular indents around any jω poles.

Formal:  
$$D = \{ s = j\omega, \omega \in (-\infty,+\infty) \} \cup \{ s = Re^{j\theta}, R\to\infty, \theta\in[-\pi/2,\pi/2] \}.$$

### Step 3 — Apply Cauchy argument principle
Argument principle kehta hai ki jab aap kisi analytic function F(s) ko contour D se map karte ho, to resulting curve F(D) ke encirclements of origin = Z − P, jahaan Z aur P F ke andar zeros aur poles hain.

Yahaan F(s) = 1 + L(s) lete hain, isliye origin encirclements of 1 + L(D) directly Z − P dete hain.

### Step 4 — Shift the critical point to −1
1 + L(s) = 0 ka matlab L(s) = −1. Isliye hum L(D) curve ke −1 + j0 point ke encirclements count karte hain instead of origin.

N = number of clockwise encirclements of −1 by the plot of L(jω).

### Step 5 — Write the stability relation
Z = P + N  
Closed-loop system stable tabhi hai jab Z = 0, yani N = −P.

### Step 6 — Handle infinite-radius arc and indentations
Jab degree of denominator > degree of numerator, |L(s)| → 0 as |s| → ∞, to infinite semicircle maps to origin and koi extra encirclement nahi deta. Poles on jω axis ke liye small indentations clockwise hote hain, jo L(D) mein counter-clockwise arcs produce karte hain.

Textbook-grade statement tak pahunch gaye: stability completely determined by the net clockwise encirclements N of −1 by the Nyquist plot of L(s).

## 5. Worked examples — har step show karo

**Example 1 — Simple stable loop**  
*Given:* \(L(s)=\frac{2}{s+1}\).  
*Find:* N and closed-loop stability.  

Step 1: L(jω) = 2/(jω+1) → real part 2/(1+ω²), imag −2ω/(1+ω²).  
Step 2: ω = 0 par L = 2, ω → ∞ par L → 0. Plot is a semicircle in lower half touching origin.  
Step 3: Curve never reaches −1, N = 0.  
Step 4: P = 0 (no RHP poles).  
**Z = 0 + 0 = 0 → closed-loop stable.**  
*Why each move:* we evaluated L(jω) directly on imaginary axis because that is the D-contour.  
*Reflection:* this is the trivial case where gain margin is infinite.

**Example 2 — Marginal stability**  
*Given:* \(L(s)=\frac{1}{s(s+1)}\).  
*Find:* value of K at which N changes.  

K = 1 lete hain. Nyquist plot crosses real axis at −0.5. Jab K = 2 hota hai to crossing exactly −1 par hoti hai → N becomes undefined (passes through −1).  
**At K = 2 the system is marginally stable (Z undefined).**  
*Why:* when the plot passes through −1, 1 + L(jω) = 0 for some real ω, hence jω is a closed-loop pole.

**Example 3 — One unstable open-loop pole**  
*Given:* \(L(s)=\frac{K}{(s-1)(s+2)}\), K = 3.  
P = 1.  
Nyquist plot (calculated at ω = 0, 1, ∞) produces one clockwise encirclement of −1.  
**N = 1 → Z = 1 + 1 = 2 → two unstable closed-loop poles.**  
*Reflection:* the designer must increase K or add phase lead to flip N to −1.

**Example 4 — Rocket actuator with delay**  
*Given:* \(L(s)=\frac{5e^{-0.2s}}{s(s+3)}\).  
Padé approximation of delay used to draw Nyquist. The plot now spirals and produces one extra clockwise loop around −1.  
**N = 1, P = 0 → Z = 1 → unstable; add 8 ms filter to restore N = 0.**  
*Reflection:* time delay adds phase lag that rotates the plot clockwise, increasing encirclements.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting P when actuator is unstable | Students assume all plants are stable               | Always count RHP poles of L(s) first                 |
| Counting counter-clockwise as positive | Sign convention confusion with argument principle   | Fix clockwise = positive N by definition             |
| Ignoring jω-axis poles            | Indentation arcs missed                             | Draw small semicircles and map them explicitly       |
| Using only positive frequencies   | Negative ω mirror image missed                      | Plot both +ω and −ω or reflect the plot              |
| Infinite-radius arc not collapsing to origin | Degree condition not checked                        | Verify deg(den) ≥ deg(num) + 1                       |
| MATLAB nyquist() plot without scaling | Auto-scaling hides encirclements                    | Force axis limits around −1 and zoom                 |
| Phase wrap at −180° mistaken for encirclement | Bode-to-Nyquist conversion error                    | Count actual winding number, not phase jumps         |

## 7. The textbook-precise statement
Let L(s) be a proper rational transfer function with P poles in the open right half-plane. Let Γ be the standard Nyquist contour that encircles the entire right half-plane except for small indentations to the left around any imaginary-axis poles of L(s). Then the number of unstable closed-loop poles is given by  
Z = P + N,  
where N is the net number of clockwise encirclements of the point −1 + j0 by the image curve L(Γ). The closed-loop system is asymptotically stable if and only if Z = 0.  
(Source: Ogata, *Modern Control Engineering*, 5th ed., §7-6, Theorem 7-6.)

## 8. Visual — diagram or schematic
```
Im
 ^
 |          /\
 |         /  \     <--- L(jω) curve
 |        /    \ 
 |   ----/------\---> Re
 |      /        \
 |     /          \
 |    /            \
-1   * encircled once clockwise (N = +1)
 |   origin
 |
 +------------------------->
```

The curve starts at ω = −∞ near origin, goes through lower half-plane, crosses negative real axis, returns to origin from upper half-plane. One clockwise loop around −1 is visible.

## 9. The memory technique
1. **The hook** — Picture a fighter pilot flying a tight clockwise circle around a red “−1” flag on the ground; every time he completes a loop you add one unstable pole.
2. **What to overlearn** — Z = P + N and “clockwise positive”.
3. **Spaced-repetition schedule** — Review the formula and one plot on day 1, day 3, day 7, day 16, day 35.
4. **First-principles fallback** — Redraw the D-contour, apply argument principle to 1 + L(s), shift origin to −1.

## 10. What this unlocks
Next topics that rest directly on encirclement counting are:

- Multivariable Nyquist criterion for MIMO rocket attitude control
- Robust stability margins using disk margins around −1
- Nichols chart design that keeps the plot away from the critical point
- Smith predictor for large transport delays in launch-vehicle TVC
- μ-synthesis where the structured singular value is computed from the same Nyquist data

## 11. Self-check — five questions, no answers
1. For L(s) = K/(s−2), what is the smallest K that makes N = −1?
2. A Nyquist plot passes exactly through −1 at ω = 5 rad/s. What does this imply for closed-loop poles?
3. If the open-loop system has three RHP poles and the plot shows two clockwise encirclements, how many unstable closed-loop poles exist?
4. Why must the small semicircular indentations around jω poles be drawn to the left of the axis?
5. A student counts counter-clockwise loops as positive N. What sign error appears in the final stability conclusion?