## 1. The one-sentence answer
**Graphs of functions let you see the complete input-output behaviour of a function on a coordinate plane instead of just reading numbers from a table.**

Aap ek function ko graph karte ho to uske har input value ke liye output kya aata hai, yeh ek line ya curve ke roop mein dikhta hai. Isse aap turant samajh jaate ho ki function increasing hai, decreasing hai, koi peak hai, ya koi jagah par yeh defined hi nahi hai. Plotting points se shuru karke aap key features jaise intercepts, slope changes aur end behaviour padhna seekh jaate ho.

Yeh sirf drawing nahi hai. Graph ek visual record hai jo aapko function ke domain, range aur continuity jaise properties ek saath dikhaata hai. Jab aap graph padhte ho to aap function ke mathematical behaviour ko geometrically interpret kar rahe hote ho.

> [!NOTE]
> Sabse badi aha yeh hai ki ek function ka graph uske equation se zyada information ek saath deta hai — aap ek glance mein dekh sakte ho ki koi input value allowed hai ya nahi aur uska output kitna bada ho sakta hai.

## 2. Why this matters — concrete and current
SpaceX rocket trajectories mein thrust aur altitude ka relation ek function hota hai; engineers uske graph se maximum acceleration points turant identify karte hain.

In semiconductor design, TSMC aur Intel transistor current-voltage curves graph karke leakage aur saturation regions ko optimise karte hain.

Machine learning mein activation functions (ReLU, sigmoid) ke graphs dekh kar researchers vanishing gradient problems ko spot karte hain, jaise jo papers mein 2015 ke baad popular hue.

Climate models mein NASA ke GCM simulations temperature-pressure functions ke graphs se feedback loops detect karte hain.

Medical devices jaise ECG machines heart-rate functions ke graphs plot karke arrhythmia detect karte hain real time.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Ordered pairs        | Graph ek set of (x, y) points se banta hai                |
| Domain and range     | X-axis par allowed inputs aur y-axis par possible outputs dikhane ke liye |
| Function definition  | Har x ke liye sirf ek y hona chahiye, warna graph nahi banta |
| Slope                | Line ka steepness aur direction samajhne ke liye          |

Agar domain-range ya ordered pairs weak hain to pehle wohi revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Choosing points inside the domain
Aap function ka domain dekho aur usme se 5–7 evenly spaced x-values chuno. Har x ke liye f(x) calculate karo aur (x, f(x)) pair banao.  
Example: f(x) = 2x + 1 ke liye x = −2, −1, 0, 1, 2 lo.  
Formal statement: Let \( f: D \to \mathbb{R} \). Select distinct \( x_i \in D \) and compute ordered pairs \( (x_i, f(x_i)) \).  
> [!WARNING] Agar aap domain ke bahar x choose karoge to points hi nahi banenge aur graph galat ho jaayega.

### Step 2 — Plotting the ordered pairs on coordinate plane
X-axis par input aur y-axis par output mark karo. Har pair ko dot se represent karo.  
Example: upar wale points plot karne par (−2, −3), (−1, −1), (0, 1), (1, 3), (2, 5) milte hain.  
Formal: Place each pair in the Cartesian plane with origin at (0,0) and unit scale on both axes.

### Step 3 — Connecting the points with the correct shape
Linear function ke liye straight line, quadratic ke liye parabola. Points ke beech smooth curve ya line draw karo.  
Formal: The graph is the set \( \{(x, f(x)) \mid x \in D\} \).

### Step 4 — Reading x-intercept and y-intercept
X-intercept woh point hai jahaan graph x-axis ko touch kare (y=0). Y-intercept (0, f(0)).  
Formal: Solve \( f(x) = 0 \) for x-intercepts; evaluate \( f(0) \) for y-intercept.

### Step 5 — Identifying increasing/decreasing intervals
Left se right jaate hue dekho ki function upar ja raha hai ya neeche.  
Formal: f is increasing on interval I if \( x_1 < x_2 \) in I implies \( f(x_1) < f(x_2) \).

### Step 6 — Determining domain and range from the graph
X-axis par jitna graph chalta hai woh domain; y-axis par jitna cover hota hai woh range.  
Formal: Domain = projection of graph onto x-axis; Range = projection onto y-axis.

### Step 7 — Noting symmetry, vertices or asymptotes
Quadratic mein vertex, rational functions mein vertical/horizontal asymptotes mark karo.  
Formal statement: The graph is complete once all such features are labelled.

## 5. Worked examples — har step show karo

**Example 1 — Linear function intercepts**  
*Given:* \( f(x) = 3x - 6 \)  
*Find:* x-intercept and y-intercept from graph.  
Step 1: Domain = all real numbers. Choose x = 0, 2.  
Step 2: f(0) = −6, f(2) = 0.  
Step 3: Points (0, −6) and (2, 0).  
Step 4: Connect with straight line.  
*Why:* Two points determine the line for linear functions.  
**Final answer: x-intercept (2,0), y-intercept (0,−6)**

*Reflection:* Simple case shows intercepts directly give roots and initial value; generalises to any linear model.

**Example 2 — Quadratic vertex**  
*Given:* \( f(x) = x^2 - 4x + 3 \)  
*Find:* Vertex and range from graph.  
Step 1: Domain all reals. Points: x=0,1,2,3,4.  
Step 2: f values: 3,0,−1,0,3.  
Step 3: Plot and join into parabola.  
Step 4: Lowest point (2,−1).  
*Why:* Vertex formula or symmetry axis x=2 se confirm.  
**Final answer: vertex (2,−1), range \([-1,\infty)\)**

*Reflection:* Parabola symmetry se range turant mil jaata hai.

**Example 3 — Absolute value**  
*Given:* \( f(x) = |x-1| + 2 \)  
*Find:* Minimum point and shape.  
Step 1–3: Points around x=1 plot karo.  
Step 4: V-shape with corner at (1,2).  
*Why:* Absolute value inside shifts vertex.  
**Final answer: minimum at (1,2)**

*Reflection:* Piecewise definition graph mein ek sharp corner banata hai.

**Example 4 — Simple rational**  
*Given:* \( f(x) = \frac{1}{x} \)  
*Find:* Asymptotes and behaviour.  
Step 1: Domain x ≠ 0.  
Step 2: Points x=1,2,0.5,−1.  
Step 3: Plot and observe approach to axes.  
Step 4: Vertical asymptote x=0, horizontal y=0.  
*Why:* Denominator zero par undefined.  
**Final answer: no intercepts, asymptotes x=0 and y=0**

*Reflection:* Graph shows why function never touches axes.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Plotting points outside domain | Forgetting restrictions like x≠0           | Domain pehle check karo, phir hi points lo   |
| Joining points with straight line for quadratic | Habit from linear functions                 | Shape pehle identify karo (parabola, V etc.) |
| Missing vertical asymptote  | Only looking at plotted points              | Denominator zero points alag se mark karo    |
| Reading range wrong         | Graph ke end tak nahi dekha                 | Arrows ya dashed lines se end behaviour dekho|
| Assuming symmetry without checking | Visual guess                                | Axis of symmetry equation verify karo        |
| Forgetting to label scale   | Hurry mein plot karna                       | Har 1 unit clearly mark karo                 |
| Confusing x-intercept with root | Terminology mix-up                          | “Where y=0” likh ke confirm karo             |

## 7. The textbook-precise statement
A function f is graphed by plotting the set of all points (x, f(x)) in the Cartesian plane where x belongs to the domain of f. The resulting curve displays intercepts, intervals of increase or decrease, local extrema, and asymptotic behaviour when they exist. (Larson, *Precalculus*, 10e, §1.5)

## 8. Visual — diagram or schematic
```
y
↑
|         /
|        /
|       /   f(x)=x
|      /
|     /
|    /
|___/_______________→ x
   /|
  / |
 /  |
/   |
```

X-axis and y-axis labelled, origin marked, line passing through (0,0) and (1,1) with arrowheads showing extension.

## 9. The memory technique
**The hook** — Graph ko ek “movie screen” samjho jahaan x-axis time hai aur y-axis result; har point ek frame hai.

**What to overlearn** — Domain = x-projection, Range = y-projection; intercepts solve f(x)=0 aur f(0).

**Spaced-repetition schedule** — 1 din baad ek linear graph plot karo, 3 din baad quadratic, 7 din baad rational with asymptotes, 16 din baad mixed set, 35 din baad without notes.

**First-principles fallback** — Agar kuch yaad na aaye to domain se points calculate karo, plot karo, aur phir intercepts aur shape observe karo.

## 10. What this unlocks
Yeh skill aapko later transformations of functions, derivatives ke graphs, aur optimisation problems samajhne mein madad karti hai.

- Function transformations (shifts, stretches)
- Derivative as slope of tangent
- Area under curve (integral)
- Optimisation using vertex or critical points

## 11. Self-check — five questions, no answers
1. f(x) = −2x + 4 ka x-intercept kya hai?
2. Quadratic f(x) = x² − 6x + 5 ka vertex aur range kya hai?
3. f(x) = 1/(x−2) ka vertical asymptote kya hai aur kyun?
4. Ek graph dekh kar kaise pata karoge ki woh kisi function ka graph hai ya sirf ek curve?
5. f(x) = |x| + 3 aur g(x) = |x+3| ke graphs mein kya farak hai aur woh kaise reflect hota hai domain-range par?