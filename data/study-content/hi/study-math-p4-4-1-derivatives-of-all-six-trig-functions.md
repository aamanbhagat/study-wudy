## 1. The one-sentence answer
**Derivatives of all six trigonometric functions are the six standard formulas that tell you the instantaneous slope of sine, cosine, tangent, cotangent, secant and cosecant at any point x.**

Iska matlab yeh hai ki jab aap ek trig function ko differentiate karte ho, toh result ek aur trig function hota hai jo uske slope ko exactly capture karta hai. Aap limit definition se shuru karte ho, sin aur cos ke liye basic limits use karte ho, aur phir quotient ya chain rule se baaki char functions derive karte ho. Yeh formulas har jagah kaam aate hain jahaan periodic motion ya circular geometry involve hoti hai.

> [!NOTE]
> Sabse badi aha moment yeh hai ki sirf do limits (lim sin h/h = 1 aur lim (1-cos h)/h = 0) se pura set ban jaata hai; baaki sab algebraic manipulation hai.

## 2. Why this matters — concrete and current
In orbital mechanics, SpaceX ke Starlink satellites ke attitude control algorithms continuously sine aur cosine derivatives use karte hain taaki angular velocity se torque calculate kar sakein.  
Semiconductor lithography machines (ASML ke EUV steppers) mein wafer alignment ke liye high-frequency oscillations ke phase derivatives sine aur cosine ke through track kiye jaate hain, jisse sub-nanometer precision milti hai.  
In reinforcement learning, robotics simulators (MuJoCo aur Isaac Gym) trigonometric joint angles ke derivatives compute karte hain taaki policy gradients stable rahein jab robot arms circular trajectories follow karte hain.  
Gravitational wave detectors jaise LIGO mein strain signals ko Fourier space mein analyse karte waqt secant aur tangent derivatives se chirp mass estimation hoti hai.  
Fundamental physics mein, quantum harmonic oscillator wavefunctions ke time evolution mein cosine derivative directly probability current deta hai.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Limit definition of derivative | Base se sin x aur cos x ke derivatives prove karne ke liye |
| Standard limits lim (sin h)/h = 1 aur lim (1-cos h)/h = 0 | Sirf ye do limits se pura trig derivative table nikal jaata hai |
| Quotient rule aur chain rule | tan, cot, sec, csc ke derivatives derive karne ke liye     |
| Pythagorean identities     | Simplification steps mein sec² = 1 + tan² jaise relations use hote hain |

Agar upar ke koi bhi concept weak hain toh pehle unhe revise karo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start with the definition for sine
Aap derivative ko limit ke through socho: slope nikaalne ke liye chhote se chhota change lo.  
Example: x = 0 par sin x ka slope 1 hona chahiye kyunki unit circle par y = x line tangent hoti hai.  
Formal statement:  
$$ \frac{d}{dx} \sin x = \lim_{h \to 0} \frac{\sin(x+h) - \sin x}{h} $$  
> [!WARNING]
> Agar aap limit ko galat evaluate karo (jaise sin h/h ko 1 ke jagah 0 maan lo) toh poora table collapse ho jaayega.

### Step 2 — Use angle-addition formula and known limits
Sin(x+h) = sin x cos h + cos x sin h likho, limit andar daalo. Sirf do terms survive karte hain jo known limits dete hain.  
Formal:  
$$ \frac{d}{dx} \sin x = \cos x \cdot 1 + \sin x \cdot 0 = \cos x $$

### Step 3 — Repeat exactly for cosine
Wahi process, lekin cos(x+h) = cos x cos h - sin x sin h. Result negative sine aata hai.  
Formal:  
$$ \frac{d}{dx} \cos x = -\sin x $$

### Step 4 — Derive tangent using quotient rule
Tan x = sin x / cos x. Quotient rule lagaao.  
Formal:  
$$ \frac{d}{dx} \tan x = \frac{\cos^2 x + \sin^2 x}{\cos^2 x} = \sec^2 x $$

### Step 5 — Derive secant and cosecant similarly
Sec x = 1/cos x par quotient rule. Result sec x tan x aata hai. Csc x ke liye negative sign aata hai.  
Formal statements:  
$$ \frac{d}{dx} \sec x = \sec x \tan x, \qquad \frac{d}{dx} \csc x = -\csc x \cot x $$

### Step 6 — Derive cotangent
Cot x = cos x / sin x. Quotient rule se –csc² x milta hai.  
Formal:  
$$ \frac{d}{dx} \cot x = -\csc^2 x $$

### Step 7 — Textbook-grade summary
Saare six derivatives ek saath:  
$$ \begin{align*} \frac{d}{dx}\sin x &= \cos x, & \frac{d}{dx}\cos x &= -\sin x, \\ \frac{d}{dx}\tan x &= \sec^2 x, & \frac{d}{dx}\cot x &= -\csc^2 x, \\ \frac{d}{dx}\sec x &= \sec x\tan x, & \frac{d}{dx}\csc x &= -\csc x\cot x. \end{align*} $$

## 5. Worked examples — har step show karo

**Example 1 — Basic sine at a point**  
*Given:* f(x) = sin x, x = π/3  
*Find:* f'(π/3)  
Step 1: Formula apply karo → cos(π/3).  
*Why:* Direct rule, koi manipulation nahi chahiye.  
**Final answer:** 1/2  

*Reflection:* Yeh sabse simple case hai; galti sirf value galat yaad karne se hoti hai.

**Example 2 — Tangent with product**  
*Given:* y = x² tan x  
*Find:* dy/dx  
Step 1: Product rule → 2x tan x + x² sec² x.  
*Why:* Dono factors differentiate kiye, second factor ka derivative sec² x hai.  
**Final answer:** 2x tan x + x² sec² x  

*Reflection:* Product rule + tan derivative ka combination common hai.

**Example 3 — Secant in quotient**  
*Given:* f(x) = sec x / (1 + x)  
*Find:* f'(x)  
Step 1: Quotient rule numerator sec x tan x, denominator (1+x)².  
Step 2: Subtract term (sec x)/(1+x)².  
*Why:* Har piece ko rule ke hisaab se differentiate kiya.  
**Final answer:** [sec x tan x (1+x) - sec x] / (1+x)²  

*Reflection:* Negative sign aur common factor sec x ko factor out karna easy step hai.

**Example 4 — Chain rule with cosecant**  
*Given:* y = csc(3x² + 1)  
*Find:* dy/dx  
Step 1: Chain rule outer derivative –csc u cot u, u = 3x² + 1.  
Step 2: Multiply by du/dx = 6x.  
*Why:* Inner function ka derivative alag se nikaala.  
**Final answer:** –6x csc(3x² + 1) cot(3x² + 1)  

*Reflection:* Chain rule bhoolna sabse badi trap hai jab argument simple x nahi hota.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Sign flip in cos or csc     | Negative sign yaad nahi rehta               | Har derivative likhte waqt sign check karo   |
| Using sin² + cos² = 1 wrong | Tan derivative mein galat identity          | Sec² = 1 + tan² yaad rakhna better hai       |
| Forgetting chain rule       | Argument constant maan liya                 | Har baar u = … likh ke differentiate karo    |
| Cot and tan signs swapped   | Reciprocal functions confuse hote hain      | Table ek baar likh ke side mein rakh lo      |
| Limit step skipped          | Direct formula yaad kar liya                | Pehle do basic limits prove kar ke yaad karo |
| Domain ignore karna         | Sec, csc discontinuities bhool jaate hain   | Derivative likhne se pehle domain note karo  |
| x in degrees instead radians| Calculator mode galat                       | Hamesha radians assume karo, degree mention karo |

## 7. The textbook-precise statement
Let f be a trigonometric function among the six standard functions. Then, wherever f is defined and differentiable, its derivative is given by the following formulas (all angles in radians):  
(d/dx) sin x = cos x,  
(d/dx) cos x = −sin x,  
(d/dx) tan x = sec² x,  
(d/dx) cot x = −csc² x,  
(d/dx) sec x = sec x tan x,  
(d/dx) csc x = −csc x cot x.  
These identities hold on every open interval where the respective function is defined. (Stewart, *Calculus*, 9e, §3.4)

## 8. Visual — diagram or schematic
```
Unit circle (x,y) with tangent line at angle θ
          y
          |     / tangent line (slope = cos θ)
          |    /
     sinθ |   / 
          |  /
          | / θ
----------+---------- x
          | 
       cosθ
```
Horizontal radius = cos θ, vertical = sin θ. Tangent line at (cos θ, sin θ) has slope exactly cos θ / 1 (for unit circle), jo sin x ke derivative ka geometric meaning deta hai.

## 9. The memory technique
**The hook** — Imagine six dancers on a rotating wheel: sin and cos are the main couple (cos leads sin), tan is the spotlight that squares itself, sec chases tan, while cot and csc carry negative signs like mirrors.  
**What to overlearn** — d(sin x)/dx = cos x, d(cos x)/dx = −sin x, aur sec² x = 1 + tan² x identity.  
**Spaced-repetition schedule** — 1 din baad, 3 din, 7 din, 16 din, 35 din par formulas bina dekhe likho.  
**First-principles fallback** — Limit definition yaad na ho toh sin(x+h) expand karke do known limits lagaao; baaki functions quotient rule se nikaal lo.

## 10. What this unlocks
Ab aap implicit differentiation, related rates, aur Taylor series ke liye ready ho.  
- L'Hôpital's rule with trig limits  
- Maxima-minima problems in periodic functions  
- Differential equations jaise simple harmonic motion  
- Fourier series coefficients derive karne ka base

## 11. Self-check — five questions, no answers
1. x = π/4 par tan x ka derivative kya hai?  
2. Prove karo ki d(sec x)/dx = sec x tan x using only quotient rule.  
3. y = sin(2x) cos(3x) ka derivative find karo (chain + product).  
4. Kis point par cot x ka derivative zero hota hai?  
5. Identify the mistake: student ne d(csc x)/dx = csc x cot x likha — galti kya hai?