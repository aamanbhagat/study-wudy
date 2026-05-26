## 1. The one-sentence answer
**The nth roots of a complex number z are exactly n distinct complex numbers w satisfying w^n = z, obtained by taking the nth root of the modulus and dividing the argument into n equal parts spaced by 2π/n.**

Aap z ko pehle polar form mein likho: z = r (cos θ + i sin θ), jahaan r = |z| aur θ = arg(z). Phir nth root lene ke liye modulus ka nth root lo aur argument ko n equal angles mein baanto. Har root ke liye argument mein 2kπ add karo (k = 0, 1, …, n-1) taaki saare distinct solutions mil jaayein. Yeh process De Moivre’s theorem se seedha aata hai aur ek hi z ke liye n alag-alag w deta hai jo ek regular n-gon banate hain complex plane mein.

Yeh roots sirf calculation nahi hain; woh ek closed algebraic structure banate hain jismein har root doosre roots se multiplication aur rotation ke through juda hota hai. Agar aap ek root paa lete ho to baaki roots uske powers se mil jaate hain jab n prime ho.

> [!NOTE]
> The single most important “aha” moment is that adding 2kπ inside the argument before dividing by n automatically generates every distinct root without repetition or omission; the 2π periodicity of the complex exponential is what forces exactly n solutions.

## 2. Why this matters — concrete and current
In NVIDIA’s cuFFT library the nth roots of unity are pre-computed as twiddle factors; every GPU-accelerated FFT used in autonomous-vehicle radar and real-time MRI reconstruction relies on these exact roots to diagonalise circulant matrices in O(n log n) time.

In quantum computing, the phase estimation algorithm (Shor’s factoring routine on IBM Quantum and Google Sycamore) repeatedly applies controlled powers of the unitary operator whose eigenvalues are nth roots of unity; the precision of the estimated phase is limited only by how accurately these roots are resolved on the Bloch sphere.

Semiconductor firms such as TSMC use nth-root calculations when designing polyphase filters for 5G mmWave beam-forming chips; the roots determine the exact rotation angles that cancel image frequencies in the RF front-end.

In orbital mechanics, NASA’s Deep Space Network employs sixth-root and eighth-root extractions of complex phasors when solving Kepler’s equation for low-thrust spiral trajectories; each root corresponds to a distinct launch window separated by 2π/n in mean anomaly.

Fundamental physics employs the same construction in the representation theory of cyclic groups: the energy eigenvalues of a particle on a ring are precisely the nth roots of unity scaled by ħ²/2mR², appearing in any Aharonov–Bohm interference experiment.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Polar form of z          | Converts multiplication into addition of arguments        |
| De Moivre’s theorem      | Supplies the algebraic rule (cos θ + i sin θ)^n = …       |
| Argument (multi-valued)  | Recognises that θ and θ + 2kπ represent the same z        |
| Modulus of product       | Shows |w^n| = |w|^n = r so |w| = r^{1/n} is unique       |

Agar aap inme se koi bhi weak feel karte hain to pehle polar-form conversion aur De Moivre’s theorem revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Write z in polar form
Aap z = x + iy ko r(cos θ + i sin θ) mein badlo jahaan r = √(x² + y²) aur θ = atan2(y, x).  
Example: z = −1 + i√3 → r = 2, θ = 2π/3.  
Formal: z = r (cos θ + i sin θ).  
> [!WARNING] Using only the principal arctan instead of atan2 can place θ in the wrong quadrant and shift every subsequent root by π.

### Step 2 — Raise an unknown w to the nth power
Let w = ρ (cos φ + i sin φ). Then w^n = ρ^n (cos (nφ) + i sin (nφ)) by De Moivre.  
Set this equal to z: ρ^n = r and nφ = θ + 2kπ.  
Formal: ρ^n (cos (nφ) + i sin (nφ)) = r (cos θ + i sin θ).

### Step 3 — Solve for modulus
ρ must be positive real, so ρ = r^{1/n} is the unique positive solution.  
Example: r = 8, n = 3 → ρ = 2.  
Formal: ρ = r^{1/n}.

### Step 4 — Solve for argument
nφ = θ + 2kπ ⇒ φ_k = (θ + 2kπ)/n, k = 0,1,…,n−1.  
These n angles are distinct modulo 2π.  
Formal: φ_k = θ/n + 2kπ/n, k = 0,…,n−1.

### Step 5 — Write the n roots explicitly
w_k = r^{1/n} [cos((θ + 2kπ)/n) + i sin((θ + 2kπ)/n)], k = 0,…,n−1.  
This is the complete solution set; any further k repeats a previous root.

### Step 6 — Textbook-grade statement
If z = r (cos θ + i sin θ) with r > 0 and θ ∈ ℝ, then the n distinct solutions of w^n = z are given by the formula in Step 5.

## 5. Worked examples — har step show karo

**Example 1 — Cube roots of 8**  
*Given:* z = 8.  
*Find:* all w such that w³ = 8.  
8 = 8(cos 0 + i sin 0), r = 8, θ = 0, n = 3.  
ρ = 8^{1/3} = 2.  
φ_k = (0 + 2kπ)/3, k = 0,1,2.  
w₀ = 2(cos 0 + i sin 0) = 2  
w₁ = 2(cos 2π/3 + i sin 2π/3) = −1 + i√3  
w₂ = 2(cos 4π/3 + i sin 4π/3) = −1 − i√3  
*Why* each step: modulus extraction is unique; arguments spaced by 120° guarantee three distinct cube roots.  
**Final answer**  
2, −1 + i√3, −1 − i√3

*Reflection:* The example is easy because θ = 0, yet it already shows the equilateral-triangle geometry that generalises to any n.

**Example 2 — Fourth roots of −1**  
*Given:* z = −1 = 1(cos π + i sin π).  
*Find:* w⁴ = −1.  
ρ = 1, φ_k = (π + 2kπ)/4 = π(2k+1)/4, k = 0,1,2,3.  
w₀ = cos(π/4) + i sin(π/4) = (√2/2)(1+i)  
w₁ = cos(3π/4) + i sin(3π/4) = (√2/2)(−1+i)  
w₂ = cos(5π/4) + i sin(5π/4) = (√2/2)(−1−i)  
w₃ = cos(7π/4) + i sin(7π/4) = (√2/2)(1−i)  
**Final answer**  
(√2/2)(±1 ± i) in all sign combinations

*Reflection:* The four roots lie on the axes of symmetry of the square; noticing the 90° spacing helps visualise higher even roots.

**Example 3 — Square roots of i**  
*Given:* i = 1(cos π/2 + i sin π/2).  
*Find:* w² = i.  
ρ = 1, φ_k = (π/2 + 2kπ)/2 = π/4 + kπ, k = 0,1.  
w₀ = cos(π/4) + i sin(π/4)  
w₁ = cos(5π/4) + i sin(5π/4)  
**Final answer**  
(√2/2)(1+i), (√2/2)(−1−i)

*Reflection:* Adding 2π once already produces the second distinct root; further k repeats.

**Example 4 — Primitive 5th roots of unity**  
*Given:* z = 1, n = 5.  
*Find:* all w with w⁵ = 1 except w = 1.  
ρ = 1, φ_k = 2kπ/5, k = 1,2,3,4.  
The four complex numbers cos(2π/5) + i sin(2π/5), …  
**Final answer**  
e^{2π i k /5} for k = 1,2,3,4

*Reflection:* These roots generate the cyclotomic field ℚ(ζ₅) and appear in every DFT of length 5.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using only principal arg          | atan2 not used                              | Always apply atan2(y,x) or add 2kπ explicitly |
| Forgetting k up to n−1            | Thinking k = 0..n is enough                 | Count exactly n distinct values of k         |
| Writing ρ = r^{1/n} with negative r | Confusing real and complex modulus        | Remember r = |z| ≥ 0 always                    |
| Adding 2kπ after dividing by n    | Order of operations error                   | Add 2kπ inside the argument before division  |
| Claiming roots repeat for k ≥ n   | Missing 2π periodicity                      | Reduce k modulo n and verify distinct angles |
| Mixing degrees and radians        | Calculator in wrong mode                    | Keep every angle in radians for De Moivre    |
| Losing the conjugate-pair pattern | Not noticing θ and −θ symmetry              | Check that if w is a root then conjugate(w) is also a root when z is real |

## 7. The textbook-precise statement
Let z be a nonzero complex number written in polar form z = r (cos θ + i sin θ), where r > 0 and θ ∈ ℝ. The equation w^n = z, n a positive integer, possesses exactly n distinct solutions in ℂ given by  
w_k = r^{1/n} \left[ \cos\left(\frac{\theta + 2k\pi}{n}\right) + i \sin\left(\frac{\theta + 2k\pi}{n}\right) \right], \quad k = 0,1,\dots,n-1.  
These are all the solutions; the arguments differ by multiples of 2π/n and therefore lie in distinct congruence classes modulo 2π. (Churchill, *Complex Variables and Applications*, 9e, §7.3)

## 8. Visual — diagram or schematic
```
Complex plane
          ^
          |   w1
          |  /
   w2 ----+---- w0   (regular n-gon vertices)
          |  \
          |   wn-1
----------+----------> real
          |
```
Label: centre at origin, radius r^{1/n}, angular spacing exactly 2π/n; each vertex is one root w_k.

## 9. The memory technique
1. **The hook** — Picture a bicycle wheel with n spokes; each spoke is one root and the whole wheel rotates by 2π/n each time you multiply by the primitive root.
2. **What to overlearn** — The explicit formula w_k = r^{1/n} [cos((θ+2kπ)/n) + i sin((θ+2kπ)/n)], k = 0…n−1, and the fact that the roots form vertices of a regular n-gon.
3. **Spaced-repetition schedule** — Review the formula at 1 day, 3 days, 7 days, 16 days, 35 days; each time recompute one fresh example from scratch.
4. **First-principles fallback** — If the formula vanishes, start from w^n = r (cos θ + i sin θ), apply De Moivre, equate moduli and arguments, then insert the 2kπ term to count n solutions.

## 10. What this unlocks
Mastery of nth roots lets you solve any polynomial whose roots are equally spaced on a circle and prepares you for roots-of-unity filters, cyclotomic polynomials, and the discrete Fourier transform.

- Fast Fourier Transform (FFT) algorithms
- Cyclotomic field extensions in algebraic number theory
- Phase estimation in quantum algorithms
- Stability analysis of linear recurrence relations via roots of unity

## 11. Self-check — five questions, no answers
1. Compute all fourth roots of −16i and plot them.
2. Show that the product of all nth roots of z equals (−1)^{n+1} z when n is odd.
3. How many distinct solutions does w^6 = 1 have inside the unit disk?
4. If w is an nth root of z, prove that w · e^{2π i /n} is also an nth root.
5. Find the mistake: “the square roots of i are (√2/2)(1+i) and (√2/2)(1−i)”.