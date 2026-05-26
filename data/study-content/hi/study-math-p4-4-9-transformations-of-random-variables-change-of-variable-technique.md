## 1. The one-sentence answer
**The change-of-variable technique computes the pdf of Y = g(X) by rescaling the pdf of X with the absolute value of the derivative of the inverse transformation.**

Aap already jaante hain ki ek random variable X ki pdf f_X(x) se uske probabilities nikaalte hain. Jab aap usko transform karte ho Y = g(X) mein, toh probabilities same rehte hain lekin density spread ya compress ho jaati hai. Change-of-variable technique isi density adjustment ko directly handle karti hai bina cumulative distribution function build kiye.

Iska core idea yeh hai ki agar g monotonic aur differentiable hai, toh f_Y(y) = f_X(g^{-1}(y)) |d/dy g^{-1}(y)|. Yeh formula sirf ek point transformation nahi, balki locally kitna stretch ho raha hai density ka, usko account karti hai.

> [!NOTE]
> The single “aha” moment is realising that probability mass is invariant, so any compression of the x-axis must be compensated by inflating the density height exactly by the absolute Jacobian factor.

## 2. Why this matters — concrete and current
In quantitative finance, Black-Scholes model mein log-stock-price transformation ka pdf nikaalna change-of-variable se hi hota hai; JPMorgan aur Citadel jaise funds daily yeh technique use karte hain implied volatility surfaces build karne ke liye.

In machine learning, Normalizing Flows (RealNVP, Glow) neural networks ke andar invertible transformations ke pdfs ko exactly isi method se track karte hain; OpenAI aur DeepMind ke papers 2017–2023 tak isko density estimation ke liye core building block maante hain.

Semiconductor process control mein, transistor threshold voltage ka variation log-normal distribution follow karta hai; Intel aur TSMC yield models mein change-of-variable apply karke failure probabilities calculate karte hain.

Gravitational-wave astronomy (LIGO-Virgo) mein chirp-mass transformation se source-parameter posterior densities nikaali jaati hain; 2020–2024 ke detection papers mein yeh step explicit likha hota hai.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Continuous pdf & support | Transformation only well-defined when density exists      |
| Inverse function         | Must express X in terms of Y to substitute back           |
| Derivative & chain rule  | Jacobian factor comes directly from differentiation       |
| Monotonicity             | Guarantees one-to-one mapping so pdf formula remains valid|
| Absolute value           | Preserves positivity of probability regardless of slope sign |

Agar inverse function ya derivative weak hai toh pehle woh revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Probability is preserved under transformation
Plain Hinglish claim: Jab aap X ko Y = g(X) mein badalte ho, toh kisi interval ki probability same rehti hai.

Concrete example: X ~ Uniform(0,1), Y = 2X. P(0.2 < X < 0.4) = 0.2 aur P(0.4 < Y < 0.8) bhi 0.2 hai.

Formal statement:  
$$P(a < X < b) = P(g(a) < Y < g(b)) \quad \text{(g strictly increasing)}.$$

> [!WARNING]
> Agar aap monotonicity bhool jaayein toh ek interval do intervals mein split ho sakta hai aur formula toot jaayega.

### Step 2 — Density must stretch or shrink to keep area same
Plain Hinglish claim: Agar transformation slope chhota hai toh x-axis compress hoti hai, isliye density height badhaani padti hai.

Concrete example: Y = X/2, slope 1/2, density double ho jaati hai taaki area 1 rahe.

Formal statement:  
$$f_Y(y) = f_X(x) \left| \frac{dx}{dy} \right|.$$  
$$where x = g^{-1}(y).$$

> [!WARNING]
> Derivative sign galat lene se negative pdf ban sakti hai — hamesha absolute value lo.

### Step 3 — Solve for the inverse explicitly
Plain Hinglish claim: Formula mein X ki jagah Y ke terms mein likhna zaroori hai.

Concrete example: Y = e^X ⇒ X = ln Y, dx/dy = 1/Y.

Formal statement:  
$$x = g^{-1}(y) \quad \Rightarrow \quad \frac{dx}{dy} = \frac{d}{dy} g^{-1}(y).$$

### Step 4 — Handle the support of the new variable
Plain Hinglish claim: Nayi variable ka domain purane domain ke image ke hisaab se badalta hai.

Concrete example: X ∈ (0,∞), Y = √X ⇒ Y ∈ (0,∞) still, lekin Y = X² ⇒ Y ∈ (0,∞) bhi lekin mapping alag.

Formal statement:  
$$\mathcal{Y} = g(\mathcal{X}).$$

### Step 5 — Differentiate and multiply
Plain Hinglish claim: Ab sirf derivative nikaal ke multiply kar do.

Formal statement:  
$$f_Y(y) = f_X(g^{-1}(y)) \left| \frac{d}{dy} g^{-1}(y) \right|, \quad y \in \mathcal{Y}.$$

### Step 6 — Verify integral equals one
Plain Hinglish claim: Final check ke liye nayi pdf integrate karke 1 aana chahiye.

Formal statement:  
$$\int_{\mathcal{Y}} f_Y(y)\, dy = 1.$$

## 5. Worked examples — har step show karo

**Example 1 — Linear stretch**
*Given:* X ∼ Exp(λ=1), pdf f_X(x) = e^{-x} for x > 0.  
*Find:* pdf of Y = 2X.  

Step 1: Y = 2X ⇒ X = Y/2, dx/dy = 1/2.  
*Why:* Inverse solve karna zaroori hai substitution ke liye.  
Step 2: f_Y(y) = e^{-y/2} ⋅ |1/2| = (1/2) e^{-y/2}, y > 0.  
**Final answer**  
**(1/2) e^{-y/2}, y > 0**  

*Reflection:* Linear case sabse simple hai; general formula seedha apply hota hai.

**Example 2 — Reciprocal transformation**
*Given:* X ∼ Uniform(1,3).  
*Find:* pdf of Y = 1/X.  

X = 1/Y, dx/dy = −1/y².  
f_X(x) = 1/2, 1 < x < 3 ⇒ 1/3 < y < 1.  
f_Y(y) = (1/2) ⋅ |−1/y²| = 1/(2 y²), 1/3 < y < 1.  
**Final answer**  
**1/(2 y²) on (1/3,1)**  

*Reflection:* Absolute value ne negative slope ko handle kiya; support bhi badal gaya.

**Example 3 — Quadratic (two-to-one)**
*Given:* X ∼ N(0,1).  
*Find:* pdf of Y = X².  

Y = X² non-monotonic. Split into X > 0 and X < 0 branches.  
For y > 0, two inverses: x = √y, x = −√y.  
dx/dy = 1/(2√y) each.  
f_Y(y) = ϕ(√y) ⋅ 1/(2√y) + ϕ(−√y) ⋅ 1/(2√y) = (1/√(2π y)) e^{-y/2}.  
**Final answer**  
**χ²(1) density**  

*Reflection:* Non-monotonic cases mein branches alag-alag count karni padti hain.

**Example 4 — Exponential of normal**
*Given:* X ∼ N(μ,σ²).  
*Find:* pdf of Y = e^X (log-normal).  

X = ln Y, dx/dy = 1/Y.  
f_Y(y) = (1/(y σ √(2π))) exp{−(ln y − μ)²/(2σ²)}, y > 0.  
**Final answer**  
**Log-normal(μ,σ²)**  

*Reflection:* Yeh transformation finance aur reliability mein bahut common hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting absolute value   | Slope negative hone par sign bhool jaate hain | Hamesha |dx/dy| likho                        |
| Wrong support               | Image of original interval nahi nikaalte    | Pehle g(a) aur g(b) calculate karo           |
| Treating non-monotonic as one-to-one | Graph visually nahi dekhte               | Derivative zero points dhundo aur branches banao |
| Jacobian missing in higher dimensions | Multivariate case sochte hi nahi         | Multivariate Jacobian determinant yaad rakho |
| Differentiating f_X instead of inverse | Formula confuse ho jaata hai             | Sirf inverse function differentiate karo     |
| Not checking ∫f_Y = 1       | Calculation error chhup jaati hai           | Hamesha last mein integrate verify karo      |
| Using cdf method unnecessarily | Extra work aur mistakes                     | Direct change-of-variable try karo pehle     |

## 7. The textbook-precise statement
Let X be a continuous random variable with pdf f_X that is continuous on an open interval I. Let g : I → ℝ be continuously differentiable and strictly monotonic. Then Y = g(X) has pdf  
$$f_Y(y) = f_X(g^{-1}(y)) \left| \frac{d}{dy} g^{-1}(y) \right|$$  
for y ∈ g(I), provided the derivative exists and is nonzero. (Ross, *A First Course in Probability*, 10e, §7.2)

## 8. Visual — diagram or schematic
```text
x-axis:  0 ---- a ---- b ---- c
          |      |      |
f_X      [==== density =====]
          |      |      |
g(x)      |      |      |
          v      v      v
y-axis:  0 ---- g(a) - g(b) - g(c)
          |      |      |
f_Y      [ stretched/compressed density ]
```
Label: vertical arrows show how intervals map; horizontal stretch factor |dx/dy| density height adjust karta hai.

## 9. The memory technique
1. **The hook** — Imagine squeezing a toothpaste tube: same paste (probability) thinner tube (compressed x) mein aane ke liye height badh jaati hai — woh height factor hi |dx/dy| hai.
2. **What to overlearn** — f_Y(y) = f_X(x) |dx/dy| with x = g^{-1}(y); always absolute value; support changes with image of g.
3. **Spaced-repetition schedule** — Review formula day 1, day 3, day 7, day 16, day 35 with one new example each time.
4. **First-principles fallback** — Probability equality P(X ∈ dx) = P(Y ∈ dy) se shuru karo, dy = |g'(x)| dx likho, density ratio nikaal lo.

## 10. What this unlocks
Yeh technique aapko directly pdf nikaalne deti hai bina cdf ke, jo aage ke topics ke liye zaroori hai.

- Order statistics ke distributions
- Multivariate Jacobian transformations
- Normalizing flows in deep generative models
- Moment-generating functions via transformed variables
- Asymptotic approximations (delta method)

## 11. Self-check — five questions, no answers
1. X ∼ U(0,1), Y = −ln X. Derive f_Y(y) using change-of-variable.
2. Derive the pdf of Y = X³ when X ∼ N(0,1) and identify where the formula needs branching.
3. Y = 1/X, X ∼ Gamma(α,β). Show that Y is also Gamma after adjusting parameters.
4. A student forgot the absolute value and got negative density for Y = −X. Explain the exact step that broke.
5. Using only the definition of probability preservation, re-derive the change-of-variable formula from scratch without looking at notes.