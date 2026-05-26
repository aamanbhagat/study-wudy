## 1. The one-sentence answer
**Infinite limits describe a function growing without bound as its input approaches a finite value, while limits at infinity describe the function approaching a finite value as its input grows without bound; these behaviors produce vertical and horizontal asymptotes, respectively.**

A vertical asymptote occurs when the output of a function becomes arbitrarily large in magnitude near a specific finite input. This forces the graph to shoot upward or downward without touching the vertical line at that input. Horizontal asymptotes appear when the output settles toward a constant value once the input is taken far to the left or right on the real line.

These two notions are distinct yet complementary. One fixes the input and lets the output explode; the other fixes the output scale and lets the input recede to infinity. Both are detected by examining one-sided limits that equal \(\pm\infty\) or a real number \(L\).

> [!NOTE]
> The decisive insight is that \(\lim_{x\to a}f(x)=\infty\) does **not** mean the limit exists; it is a precise statement that \(f(x)\) eventually exceeds every finite bound, which is exactly what produces a vertical asymptote.

## 2. Why this matters — concrete and current
In semiconductor device physics, the current–voltage characteristic of a tunnel diode exhibits vertical asymptotes near the peak and valley voltages; circuit simulators at companies such as TSMC rely on accurate infinite-limit models to predict when the diode enters negative-resistance regions without numerical overflow.

Orbital-mechanics software used by SpaceX for Starship re-entry trajectories models atmospheric drag with rational functions whose horizontal asymptotes determine terminal velocity; misidentifying the asymptote produces incorrect skip trajectories that can add hundreds of meters per second of velocity error.

In transformer-based language models, attention scores are normalized by a softmax whose output saturates at horizontal asymptotes of 0 and 1; gradient clipping strategies at OpenAI and Google DeepMind are tuned by examining the rate at which these limits are approached for very large key-query dot products.

Radio-telescope calibration at the Event Horizon Telescope project fits baseline visibilities with sinc-like functions whose horizontal asymptotes must be subtracted to isolate the faint black-hole shadow signal; an error of even 0.1 percent in the asymptote value corrupts the final image reconstruction.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| One-sided limits         | Infinite limits are detected only from left or right      |
| \(\epsilon\)-\(\delta\) definition of finite limits | Supplies the template that is modified for \(\infty\)     |
| Rational functions       | Most textbook examples reduce to comparing degrees        |
| Continuity on an interval| Guarantees that limits inside the interval equal function values |

## 4. Building the idea — from intuition to formalism

### Step 1 — Output explosion near a finite input
When a function’s values become arbitrarily large as the input approaches a number \(a\) from one side, the function is said to tend to infinity.  
Consider \(f(x)=1/(x-2)\) as \(x\) approaches 2 from the right.  
The formal statement is
\[
\lim_{x\to a^+}f(x)=+\infty
\]
if for every \(M>0\) there exists \(\delta>0\) such that \(0<x-a<\delta\) implies \(f(x)>M\).  
> [!WARNING]
> Treating \(\infty\) as a number and writing \(f(a)=\infty\) destroys the logical distinction between “the function is undefined” and “the function grows without bound.”

### Step 2 — Sign and direction
The symbols \(+\infty\) and \(-\infty\) distinguish upward from downward explosion; both left- and right-hand versions must be checked separately.  
For \(f(x)=1/(x-2)\) from the left, the values plunge to \(-\infty\).  
\[
\lim_{x\to a^-}f(x)=-\infty
\]
is defined by replacing the inequality \(f(x)>M\) with \(f(x)<-M\).

### Step 3 — Vertical asymptote definition
A vertical line \(x=a\) is a vertical asymptote if at least one of the one-sided infinite limits holds.  
The graph approaches the line arbitrarily closely in the horizontal direction while its vertical coordinate diverges.

### Step 4 — Input receding to infinity
A limit at infinity asks what finite number (if any) the function values approach once the input is taken arbitrarily far away.  
For large positive \(x\), \(f(x)=1/x\) shrinks toward zero.  
\[
\lim_{x\to+\infty}f(x)=L
\]
means that for every \(\epsilon>0\) there exists \(N\) such that \(x>N\) implies \(|f(x)-L|<\epsilon\).

### Step 5 — Horizontal asymptote definition
A horizontal line \(y=L\) is a horizontal asymptote when the limit at plus or minus infinity equals \(L\).  
The graph may cross the line finitely many times but eventually stays within any prescribed vertical band around \(L\).

### Step 6 — Connection to rational functions
For a rational function, the end behavior is governed by the ratio of leading terms; polynomial long division isolates the horizontal asymptote explicitly.

### Step 7 — Textbook statement
The preceding steps combine into the standard definitions of infinite limits, limits at infinity, and their associated asymptotes.

## 5. Worked examples — every step shown

**Example 1 — Simple vertical asymptote**  
*Given:* \(f(x)=\frac{1}{x-3}\).  
*Find:* \(\lim_{x\to 3^+}f(x)\) and any vertical asymptote.  

Step 1: Let \(M>0\) be given.  
*Why:* This is the arbitrary bound required by the definition.  

Step 2: Choose \(\delta=1/M\).  
*Why:* When \(0<x-3<\delta\), the denominator is smaller than \(1/M\), so the fraction exceeds \(M\).  

Step 3: Therefore \(\lim_{x\to 3^+}f(x)=+\infty\).  
*Why:* The definition is satisfied.  

**\(x=3\) is a vertical asymptote.**  

*Reflection:* The key algebraic move is solving the inequality \(1/(x-3)>M\) for the distance to 3; the same pattern appears in every infinite-limit proof.

**Example 2 — Horizontal asymptote via division**  
*Given:* \(f(x)=\frac{2x^2+1}{x^2-4}\).  
*Find:* \(\lim_{x\to+\infty}f(x)\).  

Step 1: Divide numerator and denominator by \(x^2\):  
\[
f(x)=\frac{2+1/x^2}{1-4/x^2}.
\]  
*Why:* Highest powers dominate for large \(x\).  

Step 2: Take the limit term by term:  
\[
\lim_{x\to+\infty}f(x)=\frac{2+0}{1-0}=2.
\]  
*Why:* Each \(1/x^2\) term vanishes by the standard limit \(\lim_{x\to\infty}1/x=0\).  

**The line \(y=2\) is a horizontal asymptote.**  

*Reflection:* Polynomial division or dividing by the highest power always reduces the problem to known finite limits.

**Example 3 — Two-sided infinite limits with sign change**  
*Given:* \(f(x)=\frac{x+1}{x(x-1)}\).  
*Find:* behavior as \(x\to 1\).  

Step 1: Right-hand limit: let \(x=1+h\), \(h\to 0^+\).  
*Why:* Factorization shows the denominator changes sign only at the roots.  

Step 2: \(f(1+h)=\frac{2+h}{ (1+h) h }\) tends to \(+\infty\).  
*Why:* Numerator approaches 2 while denominator approaches 0 from positive side.  

Step 3: Left-hand limit yields \(-\infty\).  
*Why:* Denominator approaches 0 from negative side.  

**\(x=1\) is a vertical asymptote; the two sides disagree in sign.**

*Reflection:* One must always examine both sides; a sign change produces opposite infinities.

**Example 4 — Oblique asymptote precursor**  
*Given:* \(f(x)=\frac{x^2+3x}{x-1}\).  
*Find:* end behavior as \(x\to+\infty\).  

Step 1: Perform division: \(f(x)=x+4+\frac{4}{x-1}\).  
*Why:* The linear term grows without bound, so no horizontal asymptote exists.  

Step 2: \(\lim_{x\to+\infty}f(x)=+\infty\).  
*Why:* The dominant term \(x\) diverges.  

**No horizontal asymptote; the graph climbs like the line \(y=x+4\).**

*Reflection:* Degree of numerator exceeding degree of denominator by one produces a slant asymptote instead of a horizontal one.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Writing \(\lim_{x\to a}f(x)=\infty\) as “the limit exists” | Linguistic habit of treating \(\infty\) as a number | Always say “the limit is infinite” or “diverges to infinity” |
| Forgetting to check one-sided behavior | Assuming symmetry around \(a\)              | Explicitly compute both left and right limits        |
| Canceling a factor that is zero at the asymptote | Algebraic reflex overrides domain analysis  | Factor first, then state the domain before taking limits |
| Confusing \(y=L\) with a vertical line | Mixing the roles of \(x\) and \(y\)         | Remember: vertical asymptotes are \(x=\)constant     |
| Using \(\lim_{x\to\infty}1/x=0\) without justification | Treating it as obvious rather than proven   | Cite the \(\epsilon\)-definition once, then reuse    |
| Missing that a function may cross a horizontal asymptote | Visual expectation of “never touching”      | Plot or compute a few large but finite points        |
| Applying L’Hôpital to \(\infty/\infty\) at infinity without rewriting | Forgetting that \(\infty\) is not a number  | Convert to a finite limit via substitution \(t=1/x\) |

## 7. The textbook-precise statement
Let \(f\) be defined on \((a,b)\) except possibly at \(a\). We say
\[
\lim_{x\to a^+}f(x)=+\infty
\]
if for every \(M>0\) there exists \(\delta>0\) such that \(a<x<a+\delta\) implies \(f(x)>M\). Analogous statements hold for \(-\infty\) and left-hand limits. The line \(x=a\) is a vertical asymptote if any one-sided infinite limit occurs.  

For limits at infinity,
\[
\lim_{x\to+\infty}f(x)=L
\]
if for every \(\epsilon>0\) there exists \(N\) such that \(x>N\) implies \(|f(x)-L|<\epsilon\). The line \(y=L\) is then a horizontal asymptote. (See Stewart, *Calculus*, 9e, §3.4, Definitions 4–7.)

## 8. Visual — diagram or schematic
```text
y
^
|               f(x) = 1/(x-2)
|          +
|         /|
|        / |
|       /  |
|      /   | vertical asymptote x=2
|     /    |
|    /     |
|   /      |
+--/-------+--> x
   2
          horizontal asymptote y=0
```
The curve approaches the dashed vertical line \(x=2\) while \(y\to\pm\infty\), and flattens toward the dashed horizontal line \(y=0\) as \(x\to\pm\infty\).

## 9. The memory technique
1. **The hook** — Picture a roller-coaster track that drops straight down an elevator shaft (vertical asymptote) then levels off for miles along a flat plain (horizontal asymptote).  
2. **What to overlearn** — The four limit notations \(\lim_{x\to a^\pm}f(x)=\pm\infty\) and \(\lim_{x\to\pm\infty}f(x)=L\); the degree-comparison rule for rational functions.  
3. **Spaced-repetition schedule** — Review the four notations at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Return to the \(\epsilon\)-\(M\) or \(\epsilon\)-\(N\) definitions and re-derive the asymptote statements for any specific rational function.

## 10. What this unlocks
Mastery of infinite limits and limits at infinity supplies the language needed to classify the long-term behavior of every elementary function and to justify the first derivative test for global extrema.  

- Graph sketching of rational, exponential, and logarithmic functions  
- L’Hôpital’s rule applied to indeterminate forms \(\infty/\infty\) and \(0/0\)  
- Improper integrals and their convergence tests  
- Asymptotic analysis in algorithms and big-O notation  

## 11. Self-check — five questions, no answers
1. Compute \(\lim_{x\to 0^-}\frac{1}{x^3}\) and decide whether \(x=0\) is a vertical asymptote.  
2. Find all horizontal asymptotes of \(f(x)=\frac{3x^2-2x+5}{x^2+7}\).  
3. Does \(\lim_{x\to\infty}\frac{x}{\sqrt{x^2+1}}\) exist? If so, evaluate it; if not, explain why.  
4. Construct a rational function whose graph has exactly two vertical asymptotes and one horizontal asymptote.  
5. A student claims that if \(\lim_{x\to a}f(x)=\infty\) then \(f\) is undefined at \(a\). Is the claim necessarily true? Provide a counter-example or proof.