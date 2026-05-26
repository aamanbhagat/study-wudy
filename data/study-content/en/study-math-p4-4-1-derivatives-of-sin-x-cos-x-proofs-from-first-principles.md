## 1. The one-sentence answer
**The derivatives of \(\sin x\) and \(\cos x\) are obtained directly from the definition of the derivative together with two standard trigonometric limits.**

The derivative at a point measures the instantaneous rate of change. For a function \(f\), this is the limit of the difference quotient as the increment approaches zero. When \(f(x)=\sin x\), the difference quotient simplifies, after a trigonometric identity, to an expression whose limit is exactly \(\cos x\). The same process applied to \(\cos x\) yields \(-\sin x\).

These two results are foundational because every subsequent differentiation rule for trigonometric, exponential, and composite functions ultimately rests on them. Without establishing them from first principles, later formulas remain unproven assertions.

> [!NOTE]
> The key insight is that the familiar derivatives \(\frac{d}{dx}\sin x=\cos x\) and \(\frac{d}{dx}\cos x=-\sin x\) are not definitions; they are theorems proved by converting the difference quotient into the two standard limits \(\lim_{\theta\to0}\frac{\sin\theta}{\theta}=1\) and \(\lim_{\theta\to0}\frac{1-\cos\theta}{\theta}=0\).

## 2. Why this matters — concrete and current
In orbital mechanics, NASA’s Deep Space Network uses precise models of sinusoidal signals to track spacecraft velocity; the derivative of the carrier phase directly supplies range-rate observables, and those derivatives are computed from the sine and cosine rules established here.

In semiconductor design, phase-locked loops inside Intel and TSMC chips rely on the instantaneous frequency of a voltage-controlled oscillator; the loop filter equations contain \(\frac{d}{dt}\sin(\omega t)\) and \(\frac{d}{dt}\cos(\omega t)\), which must be known exactly to guarantee stability margins.

Modern audio codecs such as Opus and AAC employ modified discrete cosine transforms whose time-domain derivatives appear in perceptual masking calculations; the underlying differentiation rules trace back to the first-principles proofs.

In machine-learning accelerators, the Fourier-feature mappings used by Google’s SIREN networks and NVIDIA’s instant neural graphics primitives are differentiated analytically; every gradient step therefore invokes the cosine and negative-sine derivatives.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Definition of the derivative   | Supplies the exact limit that must be evaluated           |
| Limit laws (sum, product, quotient) | Allow algebraic rearrangement of the difference quotient |
| Standard limits \(\lim_{\theta\to0}\frac{\sin\theta}{\theta}=1\) and \(\lim_{\theta\to0}\frac{1-\cos\theta}{\theta}=0\) | These two limits are the only non-algebraic ingredients |
| Angle-addition formulas        | Convert \(\sin(x+h)\) and \(\cos(x+h)\) into usable terms |

## 4. Building the idea — from intuition to formalism

### Step 1 — State the definition cleanly
The derivative is the limit of the difference quotient.  
Example: at \(x=0\), the slope of \(\sin x\) should be the limit of \(\frac{\sin h}{h}\) as \(h\to0\).  
\[
f'(x)=\lim_{h\to0}\frac{f(x+h)-f(x)}{h}.
\]
> [!WARNING]  
> Treating the derivative as a mechanical rule instead of this limit leaves the trigonometric results unproved.

### Step 2 — Insert the sine addition formula
Write the difference quotient for \(f(x)=\sin x\):  
\[
\frac{\sin(x+h)-\sin x}{h}=\frac{\sin x\cos h+\cos x\sin h-\sin x}{h}.
\]
Factor:  
\[
\sin x\cdot\frac{\cos h-1}{h}+\cos x\cdot\frac{\sin h}{h}.
\]
> [!WARNING]  
> Omitting the addition formula forces an intractable expression that cannot be evaluated with known limits.

### Step 3 — Take the limit term by term
Apply the two standard limits as \(h\to0\): the first term vanishes and the second becomes \(\cos x\).  
\[
\lim_{h\to0}\left(\sin x\cdot\frac{\cos h-1}{h}+\cos x\cdot\frac{\sin h}{h}\right)=\sin x\cdot0+\cos x\cdot1=\cos x.
\]
> [!WARNING]  
> Interchanging limit and multiplication is valid only because both limits exist and are finite.

### Step 4 — Repeat the process for cosine
Use the cosine addition formula and the same two limits to obtain \(-\sin x\).  
\[
\frac{d}{dx}\cos x=-\sin x.
\]
> [!WARNING]  
> Sign errors commonly appear here if the cosine addition formula is misremembered.

### Step 5 — State the textbook result
Both derivatives have therefore been established from the definition.

## 5. Worked examples — every step shown

**Example 1 — Derivative of \(\sin x\) at \(x=\pi/2\)**  
*Given:* \(f(x)=\sin x\).  
*Find:* \(f'(\pi/2)\).  
Step 1: Write the definition  
\[
f'(\pi/2)=\lim_{h\to0}\frac{\sin(\pi/2+h)-\sin(\pi/2)}{h}.
\]  
*Why:* Direct application of the derivative definition.  
Step 2: Simplify using \(\sin(\pi/2+h)=\cos h\) and \(\sin(\pi/2)=1\)  
\[
\lim_{h\to0}\frac{\cos h-1}{h}=0.
\]  
*Why:* The second standard limit.  
**Final answer**  
\[
0
\]

*Reflection:* The example isolates the \((1-\cos h)/h\) limit and shows why the result is zero at a peak.

**Example 2 — Derivative of \(\sin x\) at a general point**  
*Given:* \(f(x)=\sin x\).  
*Find:* \(f'(x)\).  
Step 1: Form the difference quotient and apply the addition formula  
\[
\frac{\sin x\cos h+\cos x\sin h-\sin x}{h}=\sin x\cdot\frac{\cos h-1}{h}+\cos x\cdot\frac{\sin h}{h}.
\]  
*Why:* Algebraic identity.  
Step 2: Take the limit  
\[
\lim_{h\to0}=\sin x\cdot0+\cos x\cdot1=\cos x.
\]  
*Why:* Standard limits exist.  
**Final answer**  
\[
\cos x
\]

*Reflection:* The general case follows immediately once the two limits are recognised.

**Example 3 — Derivative of \(\cos x\) at \(x=0\)**  
*Given:* \(f(x)=\cos x\).  
*Find:* \(f'(0)\).  
Step 1: Definition  
\[
\lim_{h\to0}\frac{\cos h-1}{h}=0.
\]  
*Why:* Standard limit.  
Step 2: Recognise the result equals \(-\sin 0=0\).  
**Final answer**  
\[
0
\]

*Reflection:* Verifies consistency at a known point.

**Example 4 — Second derivative of \(\sin x\)**  
*Given:* \(f(x)=\sin x\).  
*Find:* \(f''(x)\).  
Step 1: First derivative is \(\cos x\).  
*Why:* Proven above.  
Step 2: Differentiate again using the cosine rule  
\[
\frac{d}{dx}\cos x=-\sin x.
\]  
*Why:* Same first-principles argument.  
**Final answer**  
\[
-\sin x
\]

*Reflection:* Repeated application yields the familiar cycle of derivatives.

## 6. Common traps and how to avoid them

| Trap                                      | Why it happens                              | How to avoid it                                      |
|-------------------------------------------|---------------------------------------------|------------------------------------------------------|
| Forgetting to factor after the addition formula | Algebraic steps look messy                  | Always separate the \(\sin x\) and \(\cos x\) coefficients before taking limits |
| Using \(\lim\frac{\sin h}{h}=1\) without justification | Treating it as obvious rather than a theorem | Prove or cite the geometric squeeze-theorem argument |
| Sign error in the cosine derivative       | Misremembering the cosine addition formula  | Write the formula explicitly each time               |
| Interchanging limit and product without checking existence | Over-reliance on “limit laws always work”   | Verify both component limits exist first             |
| Evaluating at \(x=0\) only and assuming generality | Special case hides the \(\cos x\) factor    | Perform the general-\(x\) calculation once           |
| Confusing radians with degrees            | Calculator mode left in degrees             | Work exclusively in radians; restate the standard limits in degrees if needed |
| Applying L’Hôpital prematurely            | Desire for a shortcut                       | Derive these two derivatives before any rule that uses them |

## 7. The textbook-precise statement
Let \(f(x)=\sin x\) and \(g(x)=\cos x\). Then, for every real \(x\),
\[
f'(x)=\lim_{h\to0}\frac{\sin(x+h)-\sin x}{h}=\cos x,
\]
\[
g'(x)=\lim_{h\to0}\frac{\cos(x+h)-\cos x}{h}=-\sin x,
\]
where the two limits exist because
\[
\lim_{\theta\to0}\frac{\sin\theta}{\theta}=1,\qquad\lim_{\theta\to0}\frac{1-\cos\theta}{\theta}=0
\]
have already been established (Stewart, *Calculus*, 9e, §3.3–3.4).

## 8. Visual — diagram or schematic
```text
y
↑
|          . (x, sin x)
|         / \
| slope = cos x → horizontal tangent when cos x = 0
|       /
|______/_______________→ x
     0   π/2   π
```
The curve is \(y=\sin x\); the tangent line at any point has slope exactly \(\cos x\), which is zero at the peaks and \(\pm1\) at the zeros.

## 9. The memory technique
**The hook**  
Picture a unit circle: the vertical rise is \(\sin\theta\) and the horizontal run is \(\cos\theta\); their rates of change are each other, rotated by 90°.

**What to overlearn**  
\[
\frac{d}{dx}\sin x=\cos x,\qquad\frac{d}{dx}\cos x=-\sin x.
\]

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Return to the difference quotient, insert the angle-addition formulas, and invoke the two standard limits.

## 10. What this unlocks
These two derivatives are the gateway to all further trigonometric calculus and to the differentiation of periodic phenomena.  
- Chain rule applied to \(\sin(u(x))\) and \(\cos(u(x))\)  
- Higher-order derivatives and Taylor series for sine and cosine  
- Differentiation of \(\tan x\), \(\sec x\), and the inverse trigonometric functions  
- Differential equations of simple harmonic motion  
- Fourier analysis and frequency-domain methods

## 11. Self-check — five questions, no answers
1. Using only the definition, compute \(\frac{d}{dx}\sin x\) at \(x=\pi/6\) and verify it equals \(\frac{\sqrt{3}}{2}\).  
2. Show that the second derivative of \(\sin x\) equals \(-\sin x\) by applying the first-principles argument twice.  
3. Identify the precise location in the proof where the assumption that angles are measured in radians is essential.  
4. Suppose the standard limit \(\lim_{\theta\to0}\frac{\sin\theta}{\theta}\) were instead equal to 2; what would the derivative of \(\sin x\) become?  
5. A student claims that “the derivative of \(\cos x\) is \(\sin x\) because cosine is just sine shifted.” Explain why this reasoning is insufficient for a first-principles proof.