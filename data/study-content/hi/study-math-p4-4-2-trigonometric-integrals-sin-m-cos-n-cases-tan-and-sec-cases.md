## 1. The one-sentence answer
**Trigonometric integrals of the form ∫ sin^m(x) cos^n(x) dx (and their tan-sec analogues) are solved by using power-reduction identities or strategic substitution that exploits the derivative of one factor to cancel the other.**

Aap already jaante hain ki derivative of sin(x) is cos(x) and derivative of tan(x) is sec²(x). Jab m ya n mein se ek odd hota hai, toh aap us odd power wale factor ko alag karke uske derivative ko du bana dete hain; baaki even powers ko multiple-angle identities se simplify kar dete hain. Jab dono even hote hain, tab power-reduction formulas jaise sin²θ = (1−cos2θ)/2 seedha integral ko elementary functions mein tod dete hain. Tan^m sec^n cases mein bhi yahi logic repeat hota hai kyunki d(tan x) = sec²x dx aur d(sec x) = sec x tan x dx naturally appear karte hain.

Yeh technique sirf computational trick nahi hai; yeh is baat ko formalise karti hai ki trigonometric polynomials ko differential field mein integrate karna possible hai jab powers integer hote hain. Agar aap yeh nahi samajhte toh Fourier series ya Laplace transforms jaise advanced topics mein stuck ho jaayenge.

> [!NOTE]
> The single “aha” moment is this: you never integrate sin^m cos^n by brute force; you always convert the integral into ∫ u^k du by saving exactly one factor whose derivative supplies the missing du.

## 2. Why this matters — concrete and current
In orbital mechanics, NASA’s Deep Space Network uses integrals of the form ∫ sin^mθ cos^nθ dθ to compute antenna gain patterns for high-gain parabolic reflectors; even-powered terms arise directly from Legendre polynomial expansions of the radiation integral.

In semiconductor lithography, ASML’s EUV scanners rely on Fourier optics where the pupil function contains secant-weighted integrals; evaluating ∫ sec^mφ tan^nφ dφ determines the exact aerial-image intensity on the wafer at each focus offset.

In machine-learning audio pipelines at Google, the Constant-Q Transform internally evaluates power-reduction formulas for ∫ sin^{2k}ωt dt to obtain exact bin energies without FFT leakage; this step runs millions of times per training batch on TPU pods.

In quantum mechanics, the radial matrix elements for hydrogen-like atoms reduce to ∫ sin^mθ cos^nθ dθ after separation of variables in spherical coordinates; these appear in every modern computational chemistry package such as ORCA when calculating transition dipole moments.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Chain rule & substitution | To recognise that d(sin x) = cos x dx supplies the du     |
| Basic trig identities    | sin²x + cos²x = 1 and double-angle formulas reduce powers |
| Integration by parts     | Required when both powers are even or when sec³x appears  |
| Derivative of tan and sec| d(tan x) = sec²x dx and d(sec x) = sec x tan x dx         |

Agar aap inme se koi bhi weak feel kar rahe hain, toh pehle Calculus I substitution aur trig review complete kar lijiye.

## 4. Building the idea — from intuition to formalism

### Step 1 — Spot the odd power
Aap dekhte hain ki sin ya cos mein se kisi ek ki power odd hai. Us odd power wale factor ko ek unit alag kar do; uske saath jo dx hai woh uske derivative ko du bana deta hai.

Example: ∫ sin³x cos²x dx mein sin³x = sin²x · sin x = (1−cos²x) sin x, isliye du = −cos x dx ban jaata hai.

Formal statement:  
Let m be odd. Write  
$$
\int \sin^m x \cos^n x \, dx = \int (\sin^2 x)^{(m-1)/2} \sin x \cdot \cos^n x \, dx = -\int (1-u^2)^{(m-1)/2} u^n \, du
$$  
where u = cos x.

> [!WARNING]
> Agar aap odd power wale factor ko alag karna bhool jaayein aur dono ko even treat karne ki koshish karein, toh aapko unnecessary multiple-angle mess milega aur answer galat ho jaayega.

### Step 2 — Even powers → power-reduction identities
Jab dono m aur n even hote hain, toh repeated use of  
$$
\sin^2\theta = \frac{1-\cos 2\theta}{2},\qquad \cos^2\theta = \frac{1+\cos 2\theta}{2}
$$  
integral ko sum of constant aur cos(kx) terms mein tod deta hai jo elementary hote hain.

### Step 3 — Tan-sec case: save sec² or sec tan
Agar power of sec even hai, save sec²x dx = d(tan x). Agar power of tan odd hai, save sec x tan x dx = d(sec x).

### Step 4 — Reduction formula for remaining even cases
Agar dono even hain aur tan-sec mix hai, tab reduction formula  
$$
\int \sec^n x \, dx = \frac{\sec^{n-2}x\tan x}{n-1} + \frac{n-2}{n-1}\int\sec^{n-2}x\,dx
$$  
lagta hai; yeh integration by parts se derive hota hai.

### Step 5 — Textbook-grade closure
After substitution or reduction, the resulting rational function of u is integrated by partial fractions or recognised as arcsin/arctan; back-substitute trig functions to obtain the antiderivative in original variable.

## 5. Worked examples — har step show karo

**Example 1 — Odd sine power**  
*Given:* ∫ sin³x cos²x dx  
*Find:* indefinite integral  

Write sin³x = (1−cos²x) sin x.  
Let u = cos x, du = −sin x dx.  
$$
\int (1-u^2) u^2 (-du) = -\int(u^2-u^4)\,du = -\Bigl(\frac{u^3}{3}-\frac{u^5}{5}\Bigr)+C
$$  
Back-substitute:  
**−(cos³x)/3 + (cos⁵x)/5 + C**  

*Why:* Odd power allowed direct substitution; even cos²x became polynomial in u.

*Reflection:* Classic odd-power pattern; generalises to any odd m, even n.

**Example 2 — Both even**  
*Given:* ∫ sin⁴x dx  
*Find:* indefinite integral  

Use sin²x = (1−cos2x)/2 twice:  
$$
\sin^4 x = \Bigl(\frac{1-\cos2x}{2}\Bigr)^2 = \frac{1-2\cos2x+\cos^2 2x}{4}
$$  
cos²2x = (1+cos4x)/2, therefore  
$$
\int\sin^4 x\,dx = \int\frac{3-4\cos2x+\cos4x}{8}\,dx = \frac{3x}{8}-\frac{\sin2x}{4}+\frac{\sin4x}{32}+C
$$  
**Final answer:** (3x/8) − (sin2x)/4 + (sin4x)/32 + C  

*Reflection:* Pure algebraic reduction; no substitution needed once identities applied.

**Example 3 — Tan-sec, odd tan power**  
*Given:* ∫ tan³x sec²x dx  
*Find:* indefinite integral  

Let u = tan x, du = sec²x dx.  
∫ u³ du = u⁴/4 + C  
**tan⁴x/4 + C**  

*Why:* sec²x exactly matched du, odd power of tan became polynomial.

**Example 4 — Sec³x (both odd, integration by parts)**  
*Given:* ∫ sec³x dx  
*Find:* indefinite integral  

Integration by parts: let u = sec x, dv = sec²x dx → du = sec x tan x dx, v = tan x.  
$$
\int\sec^3 x\,dx = \sec x\tan x - \int\tan x\cdot\sec x\tan x\,dx = \sec x\tan x - \int\sec x\tan^2 x\,dx
$$  
tan²x = sec²x−1, so  
$$
\int\sec^3 x\,dx = \sec x\tan x - \int\sec^3 x\,dx + \int\sec x\,dx
$$  
2∫sec³x dx = sec x tan x + ln|sec x + tan x| + C  
**∫sec³x dx = (sec x tan x + ln|sec x + tan x|)/2 + C**

*Reflection:* Reduction formula prototype; appears in every table of integrals.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting the minus sign after u = cos x | Students treat du = sin x dx as positive    | Always write du = −sin x dx explicitly       |
| Applying power reduction when one power is odd | Pattern recognition fails under time pressure | First check parity of both exponents         |
| Losing the constant factor when using sin²θ = (1−cos2θ)/2 twice | Arithmetic slip in coefficient counting     | Keep fractions outside integral until end    |
| Using reduction formula for sec^n without the sec tan term | Forgetting integration-by-parts boundary term | Write the uv − ∫v du line every time         |
| Back-substituting wrong trig function after u = tan x | Confusing u with sec x                      | Draw a small right triangle with opposite = u, adjacent = 1 |

## 7. The textbook-precise statement
Let m, n be non-negative integers. The indefinite integral  
$$
\int\sin^m x\cos^n x\,dx
$$  
can be evaluated in elementary functions by the following algorithm (Stewart, *Calculus*, 9e, §7.2): if m odd, save one sin x dx and substitute u = cos x; if n odd, save one cos x dx and substitute u = sin x; if both even, apply the power-reduction identities repeatedly until only constants and cos(kx) or sin(kx) remain. The same logic extends verbatim to integrals of the form ∫ tan^m x sec^n x dx by saving sec²x dx or sec x tan x dx. All resulting rational integrals are elementary.

## 8. Visual — decision flowchart

```text
Start
  |
  v
Is m odd? ──Yes──> u=cos x, du=-sin x dx
  | No
  v
Is n odd? ──Yes──> u=sin x, du=cos x dx
  | No
  v
Both even ──> Apply sin²=(1-cos2θ)/2 repeatedly
  |
  v
Tan/Sec case? ──Yes──> Save sec² or sec tan
  |
  v
Result: polynomial or arctan/arcsin + C
```

## 9. The memory technique

**The hook**  
Picture a seesaw: the “odd kid” (odd power) jumps off first and becomes du; the “even kid” stays and gets split by the half-angle mirror.

**What to overlearn**  
1. sin²θ = (1−cos2θ)/2 and cos²θ = (1+cos2θ)/2  
2. If m odd → u = cos x; if n odd → u = sin x  
3. Reduction formula coefficient (n−2)/(n−1) for sec^n

**Spaced-repetition schedule**  
Review the three identities at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Differentiate the answer you obtained; if you recover the integrand, the antiderivative is correct even if you forgot the exact formula.

## 10. What this unlocks
Mastery here directly feeds Fourier series coefficients, Laplace transforms of periodic functions, and residue calculus contour integrals that contain rational functions of sine and cosine.  

- Next: Integration of products of sines and cosines with different arguments (product-to-sum identities)  
- Orthogonal polynomial expansions (Legendre, Chebyshev)  
- Evaluating real integrals via complex exponentials (Euler’s formula)

## 11. Self-check — five questions, no answers
1. Compute ∫ sin⁵x cos²x dx completely.  
2. Without looking up, derive the reduction formula for ∫ sec^n x dx.  
3. Evaluate ∫ tan⁴x sec⁴x dx and state which power you saved.  
4. Identify the mistake: a student wrote ∫ sin²x cos³x dx = ∫ u²(1−u²) du with u = sin x.  
5. Show that ∫_0^{π/2} sin^m x cos^n x dx = [Γ((m+1)/2)Γ((n+1)/2)] / [2Γ((m+n+2)/2)] when m,n > −1 (Wallis formula) and verify for m=2, n=2.