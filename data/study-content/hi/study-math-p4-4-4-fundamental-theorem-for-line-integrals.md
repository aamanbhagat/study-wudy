## 1. The one-sentence answer

**The Fundamental Theorem for Line Integrals states that the line integral of a conservative vector field equals the difference in the scalar potential function evaluated at the endpoints.**

Yeh theorem basically path independence ko guarantee karta hai jab vector field ek gradient ho. Agar aapke paas F = ∇f hai, toh ∫_C F · dr sirf starting aur ending points par depend karega, beech ke curve ka shape matter nahi karta. Iska matlab yeh hai ki closed curves par integral zero ho jaata hai, kyunki start aur end same point hote hain.

Aap ise single-variable calculus ke Fundamental Theorem of Calculus ka direct extension samajh sakte ho, lekin ab domain ek curve hoti hai instead of an interval. Gradient operator yahan key role play karta hai kyunki woh potential function se vector field banata hai.

> [!NOTE]
> The deepest "aha" here is that conservative fields turn path integrals into simple endpoint subtraction, exactly like how antiderivatives turn definite integrals into F(b) − F(a).

## 2. Why this matters — concrete and current

In electrostatics, the electric field E = −∇V where V is the electric potential; spacecraft trajectory planners at NASA use this to compute work done by gravitational forces along any transfer orbit without integrating the entire path.

In machine-learning optimisation, gradient-based methods such as Adam rely on the fact that the gradient field is conservative, so the total “work” (loss decrease) between two parameter vectors is path-independent and equals the difference in the loss function.

Semiconductor device modelling at TSMC uses line integrals of the electric field along doping gradients; the theorem lets engineers replace lengthy numerical path integrals with simple potential differences at contacts.

In computational fluid dynamics, circulation around an airfoil is evaluated via the fundamental theorem when the velocity field derives from a velocity potential, allowing rapid lift calculations in Boeing’s aerodynamic solvers.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Gradient             | Defines the conservative vector field F = ∇f              |
| Line integral        | The object whose value the theorem simplifies             |
| Path independence    | The property the theorem characterises                    |
| Simply connected domain | Guarantees that every closed curve can be contracted     |

Agar gradient ya line integral abhi clear nahi hain, pause karke unhe pehle revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — From scalar functions to vector fields via the gradient
Aap already jaante ho ki ek scalar function f(x,y) ka gradient ∇f ek vector field deta hai. Iska matlab direction of steepest ascent mil jaata hai.

Example: f(x,y) = x² + y, ∇f = (2x, 1). Yeh vector field conservative hai by construction.

Formal statement: Let f : D ⊂ ℝ² → ℝ be C¹. Then F := ∇f is called conservative on D.

> [!WARNING]
> Agar domain simply connected nahi hai, gradient se bhi path independence toot sakti hai (think of arg(z) around the origin).

### Step 2 — Parametrised curves and the definition of the line integral
Ek curve C ko r(t) = (x(t), y(t)), a ≤ t ≤ b se parametrise karte hain. Line integral ∫_C F · dr = ∫_a^b F(r(t)) · r'(t) dt ban jaata hai.

Example: r(t) = (t, t²), 0 ≤ t ≤ 1, F = (2x, 1) deta hai ∫_0^1 (2t·1 + 1·2t) dt = 3.

### Step 3 — Chain rule along the curve
d/dt [f(r(t))] = ∇f(r(t)) · r'(t) by the multivariable chain rule. Yeh step directly link karta hai scalar change ko vector field ke dot product se.

### Step 4 — Integrating the chain-rule identity
Integrate both sides from a to b: ∫_a^b d/dt [f(r(t))] dt = ∫_a^b ∇f(r(t)) · r'(t) dt.

Left side collapses to f(r(b)) − f(r(a)) by the single-variable fundamental theorem.

### Step 5 — Statement of the theorem
Therefore ∫_C ∇f · dr = f(B) − f(A) where A = r(a), B = r(b).

Formal theorem: If F = ∇f on an open connected set D and C is any piecewise-smooth curve in D from A to B, then ∫_C F · dr = f(B) − f(A).

## 5. Worked examples — har step show karo

**Example 1 — Straight-line path**
*Given:* f(x,y) = x + 3y, C is the straight line from (0,0) to (2,1).
*Find:* ∫_C ∇f · dr.
∇f = (1,3). Parametrise r(t) = (2t,t), 0≤t≤1. Then r'(t)=(2,1).
∫_0^1 (1·2 + 3·1) dt = 5.
*Why:* Direct substitution of the chain-rule integrand.
**Final answer:** 5

*Reflection:* Even though the path is linear, the result only depends on endpoints, hinting at path independence.

**Example 2 — Parabolic path, same endpoints**
*Given:* Same f, now C: r(t)=(t,t²), 0≤t≤2 (ends at (2,4)? Wait, adjust to (2,1): use r(t)=(2t,t), already done. New curve r(t)=(t³/4, t/2), 0≤t≤2 ends at (2,1).
∫_0^2 (1·(3t²/4) + 3·(1/2)) dt = [ (3/4)(t³/3) + (3/2)t ]_0^2 = 5.
*Why:* Same value appears, confirming independence.
**Final answer:** 5

*Reflection:* Different parametrisation yields identical result; the theorem predicts this.

**Example 3 — Closed curve**
*Given:* f(x,y)=x²y, C unit circle traversed once.
*Find:* ∫_C ∇f · dr.
Endpoints identical ⇒ integral = 0.
**Final answer:** 0

*Reflection:* Closed-curve test is the quickest way to verify conservativeness numerically.

**Example 4 — Three-dimensional case**
*Given:* f(x,y,z)=x² + yz, C helix r(t)=(cos t, sin t, t), 0≤t≤2π from (1,0,0) to (1,0,2π).
∇f=(2x,z,y). Integral evaluates to f(end)−f(start)= (1+0·2π) − (1+0·0) = 0? Wait f(1,0,2π)=1+0·2π=1, f(1,0,0)=1, difference 0? Actually yz term at end is 0·2π=0, same. Adjust: difference is zero only if values match. Correct calc yields f(B)−f(A)=0.
**Final answer:** 0

*Reflection:* Theorem extends verbatim to ℝ³; only endpoint values matter.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to check domain is simply connected | Students apply theorem on punctured plane   | Always verify simple connectedness first     |
| Using a non-conservative field | Confusing any vector field with a gradient  | Test curl = 0 before applying theorem        |
| Wrong endpoints in parametrisation | Mixing r(a) and r(b)                        | Explicitly compute r(a) and r(b) each time   |
| Ignoring piecewise-smooth requirement | Assuming only C¹ curves                     | Split integral at corners if needed          |
| Sign error in f(B)−f(A)     | Mixing start and end                        | Always write f(end) − f(start)               |

## 7. The textbook-precise statement

Let D be an open connected subset of ℝ^n and let F be a continuous vector field on D. Suppose there exists a differentiable scalar function f : D → ℝ such that F = ∇f. If C is any piecewise-smooth curve lying in D with initial point A and terminal point B, then  
∫_C F · dr = f(B) − f(A).  
(See Stewart, *Calculus*, 9e, §16.3, Theorem 2.)

## 8. Visual — diagram or schematic

```
A (start) ---->------ B (end)
   \               /
    \   any curve /
     \           /
      \         /
       \       /
        \     /
         \   /
          \ /
         (potential difference only)
```

Horizontal axis: parameter t from a to b. Vertical: value of f(r(t)). The net rise equals f(B)−f(A) regardless of wiggles in the curve.

## 9. The memory technique

**The hook:** Picture a mountain whose height is the scalar potential f. Walking any trail from camp A to camp B, the net change in your altimeter reading is always f(B)−f(A); the path’s twists never add extra height.

**What to overlearn:** ∫_C ∇f · dr = f(B)−f(A) and curl(∇f) ≡ 0.

**Spaced-repetition schedule:** Review after 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback:** Start from the chain rule d/dt[f(r(t))] = ∇f·r'(t), integrate both sides, apply ordinary FTC on the left.

## 10. What this unlocks

You can now decide instantly whether a line integral needs a full parametrisation or just endpoint evaluation, and you gain the language to discuss conservative fields in physics and optimisation.

- Stokes’ theorem (next major generalisation)
- Path-independent work in mechanics
- Exact differentials in thermodynamics
- Conservative-force tests in orbital mechanics

## 11. Self-check — five questions, no answers

1. Compute ∫_C ∇(x³ + y) · dr from (0,0) to (1,2) along any path.
2. Show that F = (y, −x) is not conservative on ℝ².
3. If ∫_C F · dr = 0 for every closed curve C, must F be conservative?
4. A particle moves in the force field F = ∇(x y). What is the work done from (0,0) to (3,4)?
5. Give a counter-example where curl F = 0 yet the line integral depends on path.