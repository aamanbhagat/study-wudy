## 1. The one-sentence answer
**Euler's formula states that \(e^{i\theta} = \cos\theta + i\sin\theta\) for any real \(\theta\), and the Taylor series proof shows this equality by matching coefficients after substituting an imaginary argument into the exponential series.**

Aap already jaante hain ki exponential, sine aur cosine functions ko infinite power series mein likha ja sakta hai. Jab aap exponential function mein argument \(i\theta\) daalte hain, toh har term \((i\theta)^n/n!\) ban jaata hai. Iska matlab yeh hai ki series ke real parts exactly cosine series ban jaate hain aur imaginary parts sine series ban jaate hain, isliye dono sides equal ho jaati hain.

Yeh proof sirf series manipulation par depend karta hai; koi geometry ya differential equation nahi chahiye. Ek baar series definitions accept karne ke baad, equality almost mechanical ho jaati hai.

> [!NOTE]
> The single deepest insight is that the imaginary unit \(i\) acts as a 90-degree rotation operator inside the series, automatically separating the cosine (even powers) and sine (odd powers) without any extra trigonometric identities.

## 2. Why this matters — concrete and current
In quantum mechanics, the time-evolution operator \(e^{-iHt/\hbar}\) for any Hamiltonian \(H\) is written directly using Euler's formula; every qubit simulation on IBM Quantum hardware ultimately evaluates this expression.

In aerospace, phased-array radar on satellites such as ESA's Sentinel-1 uses complex exponentials \(e^{i\theta}\) to steer beams electronically; the phase shift \(\theta\) is applied via Euler's formula inside the digital signal processor.

In semiconductor design, Intel's latest RF transceivers model on-chip inductors and capacitors with phasors of the form \(e^{i\omega t}\); circuit simulators like Spectre rely on the identity to convert differential equations into algebraic multiplication by \(i\omega\).

In machine learning, the Fourier features used by transformers in models such as Google's Perceiver IO are generated from \(\cos(\omega x)\) and \(\sin(\omega x)\), which are computed as the real and imaginary parts of \(e^{i\omega x}\) for numerical stability.

In fundamental physics, the path-integral formulation of quantum electrodynamics expresses every photon propagator with the factor \(e^{iS/\hbar}\); the entire Feynman-diagram machinery collapses without this compact notation.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Taylor series        | Supplies the infinite power-series definitions of \(e^x\), \(\sin x\) and \(\cos x\) |
| Complex arithmetic   | Required to compute powers of \(i\) and separate real/imaginary parts |
| Radius of convergence| Guarantees that all three series converge for every real or imaginary argument |

Agar aapne Taylor series abhi tak nahi padha, toh pehle woh padh lo; bina series ke yeh proof shuru bhi nahi hota.

## 4. Building the idea — from intuition to formalism

### Step 1 — Recall the exponential series
Aap jaante hain ki exponential function ko har jagah power series se define kar sakte hain.  
Concrete example: \(e^1 \approx 1 + 1 + 1/2 + 1/6 + 1/24 + \dots\).  
Formal statement:  
$$e^z = \sum_{n=0}^\infty \frac{z^n}{n!}.$$  
> [!WARNING] Agar aap series ko sirf real numbers ke liye maante hain, toh imaginary substitution invalid ho jaayegi.

### Step 2 — Write the sine and cosine series
Sine aur cosine bhi apni series se define hote hain.  
Formal statements:  
$$\sin x = \sum_{n=0}^\infty (-1)^n \frac{x^{2n+1}}{(2n+1)!}, \qquad \cos x = \sum_{n=0}^\infty (-1)^n \frac{x^{2n}}{(2n)!}.$$

### Step 3 — Substitute \(z = i\theta\)
Ab \(e^{i\theta}\) ki series likho. Har power \((i\theta)^n\) calculate karo.  
Formal step:  
$$e^{i\theta} = \sum_{n=0}^\infty \frac{(i\theta)^n}{n!}.$$

### Step 4 — Powers of \(i\) cycle every four terms
\(i^0 = 1\), \(i^1 = i\), \(i^2 = -1\), \(i^3 = -i\), \(i^4 = 1\) aur phir repeat.  
Yeh cycle real aur imaginary terms ko automatically alag kar deta hai.

### Step 5 — Separate even and odd powers
Even \(n = 2k\) real (cosine-like) aur odd \(n = 2k+1\) imaginary (sine-like) bante hain.  
After grouping:  
$$e^{i\theta} = \sum_{k=0}^\infty (-1)^k \frac{\theta^{2k}}{(2k)!} + i \sum_{k=0}^\infty (-1)^k \frac{\theta^{2k+1}}{(2k+1)!}.$$

### Step 6 — Match the trigonometric series
Right-hand side exactly \(\cos\theta + i\sin\theta\) ban jaata hai.  
Textbook-grade conclusion:  
$$e^{i\theta} = \cos\theta + i\sin\theta.$$

## 5. Worked examples — har step show karo

**Example 1 — Verify at \(\theta = 0\)**
*Given:* \(\theta = 0\).  
*Find:* Value of both sides.  
Left side: \(e^{i\cdot0} = e^0 = 1\).  
Right side: \(\cos0 + i\sin0 = 1 + i\cdot0 = 1\).  
*Why:* Direct substitution checks the constant term.  
**Final answer**  
1 = 1

*Reflection:* Trivial case confirms the constant term matches; generalisation to any \(\theta\) needs the full series.

**Example 2 — Verify at \(\theta = \pi/2\)**
*Given:* \(\theta = \pi/2\).  
*Find:* Both sides.  
Left: \(e^{i\pi/2}\).  
Series yields \(0 + i\cdot1 = i\).  
Right: \(\cos(\pi/2) + i\sin(\pi/2) = 0 + i\cdot1 = i\).  
*Why:* Odd-power terms survive, confirming the sine part.  
**Final answer**  
\(i = i\)

*Reflection:* Shows how the cycle of \(i\) isolates the imaginary unit correctly.

**Example 3 — Derive \(\cos\theta\) from real part**
*Given:* Euler's formula.  
*Find:* Expression for cosine.  
Take real part of both sides: \(\operatorname{Re}(e^{i\theta}) = \cos\theta\).  
*Why:* Real part isolates the even powers automatically.  
**Final answer**  
\(\cos\theta = \operatorname{Re}(e^{i\theta})\)

*Reflection:* This identity is used daily in signal processing to avoid separate cosine calls.

**Example 4 — Compute \(e^{i\pi}\)**  
*Given:* \(\theta = \pi\).  
*Find:* Value.  
Left: \(e^{i\pi}\).  
Series separates to \(-1 + i\cdot0 = -1\).  
Right: \(\cos\pi + i\sin\pi = -1 + i\cdot0 = -1\).  
*Why:* Even powers give the famous result \(e^{i\pi} + 1 = 0\).  
**Final answer**  
\(-1\)

*Reflection:* Demonstrates how one compact expression encodes both trigonometric values and the constant \(-1\).

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting \(i^2 = -1\)           | Students treat \(i\) as a normal variable   | Write the first four powers of \(i\) explicitly before summing |
| Stopping the series after three terms | Looks “close enough” for real numbers      | Always keep the summation symbol until the final matching step |
| Confusing radius of convergence   | Think series only work for small \(\theta\) | Recall that exponential series converges everywhere in \(\mathbb{C}\) |
| Mixing degrees and radians        | Calculator in degree mode                   | Always convert to radians before substitution |
| Dropping the imaginary unit after separation | Think “real part is enough”              | Keep the factor \(i\) in front of the sine series until the very end |
| Assuming the proof needs derivatives | Recall only differential proof             | Emphasise that Taylor proof uses only algebraic substitution |

## 7. The textbook-precise statement
Let \(\theta\in\mathbb{R}\). The exponential function on the complex plane is defined by the power series
\[
\exp(z)=\sum_{n=0}^\infty\frac{z^n}{n!},
\]
which converges absolutely for every \(z\in\mathbb{C}\). Substituting \(z=i\theta\) and separating real and imaginary parts using \(i^{2k}=(-1)^k\) and \(i^{2k+1}=(-1)^k i\) yields
\[
\exp(i\theta)=\sum_{k=0}^\infty(-1)^k\frac{\theta^{2k}}{(2k)!}+i\sum_{k=0}^\infty(-1)^k\frac{\theta^{2k+1}}{(2k+1)!}.
\]
The right-hand side is precisely the Taylor series of \(\cos\theta+i\sin\theta\). Hence
\[
e^{i\theta}=\cos\theta+i\sin\theta.
\]
(Source: Stewart, *Calculus*, 9e, §10.10, Theorem 3.)

## 8. Visual — diagram or schematic
```text
Series terms for e^{iθ}
n=0: 1                 → real
n=1: iθ                → imag
n=2: (iθ)^2/2 = -θ²/2  → real
n=3: (iθ)^3/6 = -iθ³/6 → imag
n=4: +θ⁴/24            → real
          ↓
     cos series   + i sin series
```

## 9. The memory technique

**The hook**  
Picture the letter \(e\) wearing a tiny imaginary crown that spins 90 degrees each time you multiply by \(i\); after four spins it returns to 1, exactly like the unit circle.

**What to overlearn**  
1. \(e^{i\theta}=\cos\theta+i\sin\theta\)  
2. Powers of \(i\) cycle: \(1,i,-1,-i\)  
3. Even powers feed cosine, odd powers feed sine.

**Spaced-repetition schedule**  
Review after 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Agar formula bhool jaayein, toh series \(\sum(i\theta)^n/n!\) likho, powers of \(i\) alag karo aur cosine/sine series se compare karo.

## 10. What this unlocks
Euler's formula is the gateway to polar form of complex numbers, De Moivre's theorem, and every frequency-domain technique in engineering.

- Complex multiplication becomes addition of angles  
- Fourier series and Fourier transforms  
- Quantum gates expressed as rotations on the Bloch sphere  
- Laplace transforms evaluated along the imaginary axis  
- Stability analysis of linear ODEs via characteristic roots \(e^{i\omega t}\)

## 11. Self-check — five questions, no answers
1. Using only the series, compute the first four non-zero terms of \(e^{i\pi/3}\) and verify they match \(\cos(\pi/3)+i\sin(\pi/3)\).  
2. Why does the proof fail if we replace \(i\) by a real number larger than the radius of convergence?  
3. Separate real and imaginary parts of the series for \(e^{2i\theta}\) and show it equals \(\cos2\theta+i\sin2\theta\).  
4. A student claims the identity holds only for \(|\theta|<1\); what single fact in the proof contradicts this?  
5. Starting from Euler's formula, derive the angle-addition formula for cosine in two lines.