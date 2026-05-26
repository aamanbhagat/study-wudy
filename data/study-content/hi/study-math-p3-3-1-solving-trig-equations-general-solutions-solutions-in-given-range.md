## 1. The one-sentence answer
**Solving trig equations means finding all x that satisfy an equation built from sine, cosine or tangent, first by writing the complete infinite family (general solution) and then by filtering only those values that lie inside a stated interval.**

Trigonometric equations are periodic, so each solution you find repeats forever. The general solution captures every repetition using an integer parameter n. Once you have that family you simply plug in values of n until x falls inside the required range such as [0, 2π] or [-π, π].

The key skill is moving between the unit-circle picture and the algebraic form without losing any branch of the solution. When the equation mixes different functions or contains a linear argument like 2x + π/3, you must first reduce it to one of the six basic forms before applying the general-solution formulas.

> [!NOTE]
> The single most important insight is that every trigonometric equation ultimately reduces to solving sin θ = k, cos θ = k or tan θ = k; all other manipulations are only rearrangements that preserve this core step.

## 2. Why this matters — concrete and current
In phased-array radar used by SpaceX’s Starlink satellites, engineers solve sin(ωt + ϕ) = constant to schedule precise phase shifts across thousands of antenna elements so beams point at moving user terminals without mechanical motion.

In semiconductor lithography, ASML’s EUV scanners model the interference pattern on the wafer as a cosine sum; solving the resulting trig equation gives the exact exposure times that keep critical-dimension error below 1 nm.

In inertial-navigation firmware inside Apple’s iPhone and Vision Pro, the attitude-heading reference system repeatedly solves tan θ = a_y / a_x to extract Euler angles from accelerometer data; the general solution plus quadrant correction prevents 180° flips during rapid motion.

In climate-model post-processing at ECMWF, researchers isolate El Niño events by solving cos(2π t / T) + ε sin(2π t / T) = threshold; the general solution lets them locate every onset time across a 40-year reanalysis dataset.

In quantum-control software for superconducting qubits at Google Quantum AI, pulse waveforms are shaped by solving sin(Ωt) = desired rotation angle; the solutions in a finite gate window determine the minimal-time pulse that achieves a target fidelity above 99.9 %.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Unit-circle definitions of sin, cos, tan | Every general solution is read directly from the circle’s symmetry points.            |
| Periodicity: sin(x + 2π) = sin x, etc. | Tells you how far apart identical values repeat, fixing the spacing in the general solution. |
| Inverse functions arcsin, arccos, arctan and their ranges | Supply the principal value that seeds the general solution.                           |
| Trigonometric identities (co-function, even-odd) | Allow rewriting equations into a single function before solving.                      |
| Interval notation and inequalities | Needed to filter the infinite list down to a closed interval.                         |

If any row above is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Locate the reference angle on the unit circle
You first isolate a single trigonometric function equal to a constant k. The reference angle α = arcsin|k| (or arccos, arctan) gives the acute angle whose trig value matches |k|.

Example: solve sin x = 1/2. Then α = π/6.

Formal statement: let α = arcsin|k| where |k| ≤ 1; α lies in [0, π/2].

> [!WARNING]
> If you forget that arcsin returns only values in [-π/2, π/2], you will miss solutions in other quadrants.

### Step 2 — Write the two families inside one period
On the unit circle, sin equals k at two points per full rotation: one in quadrant I or IV, the other in quadrant II or III. These give the two prototype solutions x = α and x = π − α (adjusted for sign).

For sin x = 1/2 we obtain x = π/6 and x = 5π/6 inside [0, 2π).

Formal: the two base solutions are α and π − α when k > 0.

### Step 3 — Add the period to generate the general solution
Because the function repeats every 2π, every base solution plus 2πn, n ∈ ℤ, is also a solution.

Thus the general solution for sin x = sin α is
$$x = n\pi + (-1)^n\alpha,\qquad n\in\mathbb{Z}.$$

### Step 4 — Specialise the formula for cosine and tangent
Cosine is even, so its two solutions per period are symmetric about the x-axis: x = ±α + 2πn. Tangent has period π and one solution per period: x = α + πn.

### Step 5 — Restrict n to obtain solutions in a given interval
Substitute successive integers n into the general solution and keep only those x that satisfy a ≤ x ≤ b. Because the spacing is 2π or π, usually at most a handful of n need checking.

### Step 6 — Verify by substitution and quadrant check
Plug each candidate back into the original equation. This catches sign errors that arise when k is negative or when the argument is linear (e.g., 2x).

### Step 7 — Textbook-grade general statement
Any equation reducible to one of the six elementary forms
sin θ = k, cos θ = k, tan θ = k (|k| ≤ 1 for sin/cos)
possesses the general solutions listed in Step 3–4; solutions inside a closed interval are obtained by selecting the finite subset that satisfies the inequality.

## 5. Worked examples — har step show karo

**Example 1 — Basic sine equation**
*Given:* sin x = √3/2  
*Find:* all real x, then those in [0, 2π].

α = π/3.  
General solution: x = nπ + (-1)^n(π/3).  
For n = 0: x = π/3  
For n = 1: x = 2π/3  
For n = 2: x = 7π/3 > 2π, stop.  
Solutions in [0, 2π]: π/3, 2π/3.  
*Why each move:* we used the standard sine formula directly after reading α from arcsin.

**Example 2 — Negative cosine value**
*Given:* cos x = −1/2  
*Find:* x ∈ [−π, π].

α = π/3.  
General: x = ±π/3 + 2πn.  
n = 0: ±π/3  
n = −1: −π/3 − 2π = −7π/3 < −π, discard; +π/3 − 2π = −5π/3  
n = 1: π/3 + 2π = 7π/3 > π, discard; −π/3 + 2π = 5π/3  
Solutions: −5π/3, −π/3, π/3, 5π/3.

**Example 3 — Linear argument**
*Given:* sin(2x) = 1/2, x ∈ [0, π]  
*Find:* all such x.

Let θ = 2x, so θ = nπ + (−1)^n(π/6).  
Then x = θ/2.  
Testing n = 0,1,2,3,4 yields x = π/12, 5π/12, 13π/12, 17π/12 (others outside [0, π]).  
*Why:* we substituted the general solution for θ and halved every term.

**Example 4 — Mixed functions**
*Given:* √3 sin x − cos x = 1, x ∈ [0, 2π)  
*Find:* solutions.

Rewrite as R sin(x − α) = 1 where R = 2, tan α = 1/√3 so α = π/6.  
Thus sin(x − π/6) = 1/2.  
General: x − π/6 = nπ + (−1)^n(π/6).  
Solving and filtering: x = π/3, 2π/3.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using only the principal value    | Students stop after arcsin and forget other quadrants | Always write both base angles before adding period   |
| Forgetting period of tan is π     | Confuse with sin/cos period 2π                      | Memorise tan(x + π) = tan x separately               |
| Wrong sign when k < 0             | Apply α = arcsin|k| but place solutions incorrectly | Draw unit circle and mark signs in each quadrant     |
| Not dividing the period for linear arguments | Solve for x instead of θ = ax + b                | Substitute θ first, solve, then back-substitute      |
| Missing solutions at interval endpoints | Strict inequality used by mistake                | Check both closed and open interval endpoints        |
| Division by cos when solving tan  | Lose solutions where cos = 0                        | Convert to sin/cos form and check cos = 0 separately |
| Calculator in degree mode         | Mix radian answers with degree results              | Keep calculator in radian mode throughout            |

## 7. The textbook-precise statement
Let k ∈ [−1,1]. The equation sin x = k possesses the general solution
$$x=n\pi+(-1)^n\alpha,\qquad n\in\mathbb{Z},$$
where α = arcsin k ∈ [−π/2,π/2]. The equation cos x = k possesses
$$x=\pm\alpha+2\pi n,\qquad n\in\mathbb{Z}.$$
The equation tan x = k (k ∈ ℝ) possesses
$$x=\alpha+\pi n,\qquad n\in\mathbb{Z},$$
where α = arctan k ∈ (−π/2,π/2).  
Any solution belonging to a closed interval [a,b] is obtained by testing successive integers n until the resulting x lies outside [a,b].  
(Stewart, *Calculus*, 9e, §7.5, Theorem 3 and subsequent examples.)

## 8. Visual — diagram or schematic
```
          y
          ^
   +------+------+
  /       |       \
 /   QII  |  QI    \
|         |         |
|   5π/6--+--π/6    |  sin x = 1/2
|         |         |
 \   QIII |  QIV   /
  \       |       /
   +------+------+
          x
```
Labelled points: π/6 (QI) and 5π/6 (QII) are the two solutions inside [0, 2π). The same pattern repeats every 2π.

## 9. The memory technique
**The hook** — picture a sine wave crossing the line y = k; every crossing is either an “up” or “down” mirror image, which the (−1)^n term encodes.

**What to overlearn** — the three general-solution formulas exactly as written in Section 7, plus the fact that tan period = π.

**Spaced-repetition schedule** — review the three formulas after 1 day, 3 days, 7 days, 16 days and 35 days.

**First-principles fallback** — redraw the unit circle, mark the two angles whose sine (or cosine) equals k, then add 2π repeatedly; this rebuilds any forgotten formula.

## 10. What this unlocks
Mastery of general solutions lets you proceed directly to advanced identities, Fourier-series coefficient calculations, and differential-equation boundary-value problems that contain trig terms.

- Solving systems of trig equations that appear in geometry of circles and triangles
- Finding periods and amplitudes in AC-circuit analysis
- Linearising trig equations for small-angle approximations in physics
- Preparing for inverse trig substitution in integration techniques

## 11. Self-check — five questions, no answers
1. Write the general solution of cos x = −√3/2 and list all values inside [−2π, 2π].
2. Solve sin 3x = 1/2 for x ∈ [0, 2π/3].
3. Without a calculator, decide how many solutions the equation tan x = 1 has inside (0, 4π).
4. An equation yields the candidate set {π/6 + 2πn}. One student claims π/6 + 2π(−1) = −11π/6 lies outside [0, 2π]; is the claim correct?
5. Explain why replacing sin(2x) = 1/2 by 2x = arcsin(1/2) alone loses half the solutions.