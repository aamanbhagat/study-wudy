## 1. The one-sentence answer
**A definite integral equals the limit of Riemann sums formed by partitioning an interval and summing rectangle areas whose heights are sampled from the function at chosen points inside each subinterval.**

The construction begins with any continuous function on a closed interval. Divide the interval into finitely many subintervals, each carrying its own width. Inside every subinterval select one sample point, multiply the function value there by the subinterval width, and add the products. The resulting finite sum approximates the net signed area between the graph and the axis. Refining the partition so that every subinterval width shrinks toward zero converts the approximation into an exact value.

The choice of sample point inside each subinterval produces the familiar variants: left endpoint, right endpoint, or midpoint. All three converge to the same limit when the function is continuous, yet they differ visibly on coarse partitions. The formal definition therefore states that the integral exists precisely when this limit is the same no matter how the sample points are chosen, provided the maximum subinterval width tends to zero.

> [!NOTE]
> The integral is not “area” itself; it is the number obtained after the limit erases every trace of the arbitrary partition and sampling rule.

## 2. Why this matters — concrete and current
NASA’s trajectory optimization codes integrate thrust and drag profiles along candidate flight paths; the integral is evaluated by adaptive Riemann-sum quadrature inside the GPOPS-II solver, ensuring fuel-minimal routes for Artemis lunar transfers.

In semiconductor process simulation, Synopsys TCAD tools compute total dopant dose by integrating concentration profiles obtained from secondary-ion mass spectrometry; the underlying engine uses midpoint Riemann sums on adaptively refined meshes to keep dose error below 0.1 %.

Modern transformer training pipelines evaluate the attention entropy integral over token-position distributions; libraries such as xFormers replace the integral by a high-order midpoint Riemann sum on GPU tensor cores, yielding gradients that remain stable even when sequence lengths exceed 32 k tokens.

High-energy physicists at CERN reconstruct missing transverse energy in ATLAS events by numerically integrating calorimeter cell deposits; the algorithm employs left-endpoint Riemann sums on a polar grid whose cell widths are chosen so that the quadrature error lies below the intrinsic detector resolution.

## 3. Mental prerequisites

| Concept              | Why you need it here                                                                 |
|----------------------|--------------------------------------------------------------------------------------|
| Limit of a function  | The integral is defined only after every subinterval width is driven to zero.        |
| Partition of an interval | The domain must be split into contiguous subintervals before any sum can be written. |
| Function evaluation  | Heights of rectangles are obtained by evaluating the integrand at chosen sample points. |
| Summation notation   | The total area approximation is literally a finite sum that later becomes a limit.   |

## 4. Building the idea — from intuition to formalism

### Step 1 — Partition the interval
Any closed interval \([a,b]\) can be divided into \(n\) contiguous subintervals by inserting \(n-1\) points between \(a\) and \(b\). The subinterval lengths need not be equal.  
Example: On \([0,3]\) with \(n=3\), the points \(0,1,2,3\) produce three subintervals each of width 1.  
Formally, a partition \(P\) of \([a,b]\) is a set \(a=x_0<x_1<\dots<x_n=b\).  
> [!WARNING]
> Omitting the requirement that the points are strictly increasing allows overlapping or empty subintervals and destroys the subsequent limit.

### Step 2 — Form the subinterval widths
Define \(\Delta x_i=x_i-x_{i-1}\). The largest of these widths is the mesh or norm of the partition, written \(\|P\|\).  
Example: The partition above has \(\Delta x_i=1\) for all \(i\), so \(\|P\|=1\).  
Formally, \(\Delta x_i=x_i-x_{i-1}\).  
> [!WARNING]
> Treating all \(\Delta x_i\) as equal when they are not leads to incorrect weighting in the sum.

### Step 3 — Choose sample points
Inside each subinterval \([x_{i-1},x_i]\) pick any point \(\xi_i\). The three classical choices are \(\xi_i=x_{i-1}\) (left), \(\xi_i=x_i\) (right), or \(\xi_i=(x_{i-1}+x_i)/2\) (midpoint).  
Example: For the second subinterval \([1,2]\), left sample is 1, right sample is 2, midpoint is 1.5.  
Formally, \(\xi_i\in[x_{i-1},x_i]\).  
> [!WARNING]
> Selecting \(\xi_i\) outside the closed subinterval produces a sum that does not correspond to any rectangle lying under the graph.

### Step 4 — Build the Riemann sum
The Riemann sum for partition \(P\) and choice \(\{\xi_i\}\) is \(\sum_{i=1}^n f(\xi_i)\Delta x_i\).  
Example: For \(f(x)=x^2\) on \([0,3]\) with the uniform partition and left samples, the sum equals \(0\cdot1+1\cdot1+4\cdot1=5\).  
Formally, \(S(P,f,\xi)=\sum_{i=1}^n f(\xi_i)\Delta x_i\).  
> [!WARNING]
> Forgetting to multiply by \(\Delta x_i\) yields a plain sum of function values whose limit is almost never the integral.

### Step 5 — Take the limit
The definite integral exists when \(\lim_{\|P\|\to0}S(P,f,\xi)\) equals the same number for every sequence of partitions whose mesh tends to zero and for every admissible choice of sample points. That common limit is written \(\int_a^b f(x)\,dx\).  
Example: The left, right, and midpoint sums for \(f(x)=x^2\) on \([0,3]\) all approach 9 as \(n\to\infty\).  
Formally, \(\int_a^b f(x)\,dx=\lim_{\|P\|\to0}\sum f(\xi_i)\Delta x_i\).

## 5. Worked examples — every step shown

**Example 1 — Left Riemann sum on a linear function**  
*Given:* \(f(x)=3x+1\) on \([0,2]\), partition into 4 equal subintervals, left endpoints.  
*Find:* the numerical Riemann sum.  
Divide \([0,2]\) into subintervals of width \(\Delta x=0.5\).  
The division points are \(0,0.5,1,1.5,2\).  
Left samples: \(0,0.5,1,1.5\).  
*Why:* each sample is the left endpoint of its subinterval.  
Compute terms: \(f(0)\cdot0.5=1\cdot0.5=0.5\), \(f(0.5)\cdot0.5=2.5\cdot0.5=1.25\), \(f(1)\cdot0.5=4\cdot0.5=2\), \(f(1.5)\cdot0.5=5.5\cdot0.5=2.75\).  
Sum: \(0.5+1.25+2+2.75=6.5\).  
**6.5**  
*Reflection:* The exact integral is 8; the underestimate is expected for an increasing function sampled from the left.

**Example 2 — Right Riemann sum**  
*Given:* same \(f\) and partition, now right endpoints.  
Right samples: \(0.5,1,1.5,2\).  
Terms: \(2.5\cdot0.5=1.25\), \(4\cdot0.5=2\), \(5.5\cdot0.5=2.75\), \(7\cdot0.5=3.5\).  
Sum: 9.5.  
**9.5**  
*Reflection:* The overestimate mirrors the left-endpoint underestimate; their average already equals the true integral.

**Example 3 — Midpoint rule**  
*Given:* same data, midpoint samples.  
Midpoints: \(0.25,0.75,1.25,1.75\).  
Terms: \(1.75\cdot0.5=0.875\), \(3.25\cdot0.5=1.625\), \(4.75\cdot0.5=2.375\), \(6.25\cdot0.5=3.125\).  
Sum: 8.  
**8**  
*Reflection:* For a linear function the midpoint rule recovers the exact integral on any uniform partition.

**Example 4 — Non-uniform partition**  
*Given:* \(f(x)=x^2\) on \([0,1]\), partition \(\{0,0.1,0.3,1\}\), arbitrary interior points \(\xi_1=0.05\), \(\xi_2=0.2\), \(\xi_3=0.7\).  
Widths: 0.1, 0.2, 0.7.  
Terms: \((0.05)^2\cdot0.1=0.00025\), \((0.2)^2\cdot0.2=0.008\), \((0.7)^2\cdot0.7=0.343\).  
Sum: 0.35125.  
**0.35125**  
*Reflection:* The same limit is obtained once the mesh is driven to zero regardless of unequal widths.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using \(\Delta x\) instead of each \(\Delta x_i\) | Habit from uniform partitions                       | Always write \(\Delta x_i=x_i-x_{i-1}\) explicitly   |
| Picking sample points outside subintervals | Misreading interval notation                        | Verify \(\xi_i\in[x_{i-1},x_i]\) before evaluating   |
| Confusing mesh \(\|P\|\) with number of subintervals | Both quantities shrink together                     | Track only the largest \(\Delta x_i\)                |
| Forgetting the limit symbol when writing the integral | Treating a single sum as already exact              | Write the integral only after the limit is stated    |
| Assuming every Riemann sum equals the integral | Ignoring that the limit must exist and be unique    | Check that left, right, and midpoint limits coincide |
| Using open intervals for partitions | Notation inherited from open-set topology           | Always begin with closed \([a,b]\) and strict inequalities |
| Neglecting sign when area lies below axis | Visual intuition of “area” overrides signed height  | Keep the algebraic sign of \(f(\xi_i)\) unchanged    |

## 7. The textbook-precise statement
Let \(f\) be defined on the closed interval \([a,b]\). A partition \(P=\{a=x_0<\dots<x_n=b\}\) of \([a,b]\) has norm \(\|P\|=\max_i\Delta x_i\). For any choice of points \(\xi_i\in[x_{i-1},x_i]\) the corresponding Riemann sum is \(\sum_{i=1}^n f(\xi_i)\Delta x_i\). The definite integral of \(f\) from \(a\) to \(b\) is the number \(I\) such that for every \(\varepsilon>0\) there exists \(\delta>0\) with the property that \(\bigl|\sum f(\xi_i)\Delta x_i-I\bigr|<\varepsilon\) whenever \(\|P\|<\delta\). When this limit exists we write \(\int_a^b f(x)\,dx=I\). (Stewart, *Calculus*, 9e, §5.2, Definition of the Definite Integral.)

## 8. Visual — diagram or schematic
```text
x-axis:  a ─── x0 ─── x1 ─── x2 ─── … ─── xn ─── b
          |        |        |               |
height:  f(ξ1)   f(ξ2)   f(ξ3)          f(ξn)
          ▄▄▄     ▄▄▄     ▄▄▄             ▄▄▄
          ███     ███     ███             ███   ← rectangles
          ███     ███     ███             ███
Δx_i:     ←Δx1→  ←Δx2→  ←Δx3→          ←Δxn→
```
Each vertical bar represents one term \(f(\xi_i)\Delta x_i\); the total shaded area is the Riemann sum. As the vertical lines become denser the jagged upper boundary approaches the graph of \(f\).

## 9. The memory technique
1. **The hook** — Picture a city skyline of rectangular buildings whose roofs are sliced off by a smooth curve; the integral is the exact volume of concrete once every roof is planed flush with the curve.  
2. **What to overlearn** — The definition \(\int_a^b f=\lim_{\|P\|\to0}\sum f(\xi_i)\Delta x_i\) together with the three classical choices of \(\xi_i\).  
3. **Spaced-repetition schedule** — Review the definition at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Rebuild by writing an arbitrary partition, inserting sample points, forming the sum, and stating that the limit must be independent of all choices.

## 10. What this unlocks
Mastery of Riemann sums supplies the rigorous foundation for every subsequent integration technique and for the Fundamental Theorem of Calculus.  

- Antiderivatives become evaluation tools rather than mysterious reversals.  
- Substitution, integration by parts, and partial fractions are justified by transforming Riemann sums.  
- Arc length, surface area, and volume of revolution formulas are obtained by applying the same limit process to new geometric sums.  
- Lebesgue integration later relaxes the continuity requirement while preserving the identical limiting idea.

## 11. Self-check — five questions, no answers
1. For \(f(x)=x^3\) on \([0,1]\) with the uniform partition into \(n=2\) subintervals, compute the left, right, and midpoint Riemann sums.  
2. Prove that if \(f\) is continuous on \([a,b]\) then the left-endpoint and right-endpoint Riemann sums differ by at most \(\|P\|\cdot\max|f'|\cdot(b-a)\).  
3. Construct a partition of \([0,1]\) and a choice of sample points such that the Riemann sum for \(f(x)=1/x\) equals 2; does the integral exist?  
4. A function is defined to be zero at every rational and one at every irrational. Show that its Riemann sums on any partition can be made arbitrarily close to both 0 and 1 by suitable choice of sample points.  
5. Suppose the mesh of every partition is required to be exactly \(1/n\). Does the resulting restricted limit still equal the definite integral for every continuous function?