## 1. The one-sentence answer
**A hyperbola is the locus of points where the absolute difference of distances to two fixed foci is constant.**

That constant difference equals \(2a\), while the distance between foci is \(2c\) with \(c > a\). The curve therefore consists of two separate branches that open away from each other. The ratio \(e = c/a > 1\) is called the eccentricity and quantifies how “open” the branches are. The lines that the branches approach at infinity are the asymptotes.

The algebraic description begins from the distance definition and simplifies, after translation and rotation, to one of two standard forms. Every geometric feature—asymptotes, foci, vertices—then reads off directly from the coefficients.

> [!NOTE]
> The single number \(e > 1\) fixes the entire shape up to scale; changing \(e\) stretches or squeezes the hyperbola while the asymptotes rotate accordingly.

## 2. Why this matters — concrete and current
Orbital mechanics at NASA’s Jet Propulsion Laboratory uses hyperbolic excess velocity to design gravity-assist trajectories; the eccentricity of the hyperbola relative to a planet determines the turn angle of the spacecraft’s path.  
In particle accelerators such as the LHC, beam-focusing magnets produce hyperbolic field lines; the eccentricity of those equipotentials controls how tightly the proton bunches are squeezed before collision.  
Radio telescopes employ hyperbolic sub-reflectors (Cassegrain geometry) to map incoming plane waves onto a feed horn; the eccentricity is chosen so that the secondary focus coincides with the receiver.  
In special relativity the invariant interval \(x^2 - c^2 t^2 = \pm 1\) is a hyperbola in Minkowski space; particle physicists at CERN read proper time and rapidity directly from the eccentricity of these world-lines.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Distance formula in plane| Core definition uses \(\lvert d_1 - d_2 \rvert = 2a\)     |
| Completing the square    | Converts general quadratic into standard form             |
| Slope-intercept lines    | Asymptotes are limiting lines \(y = mx\)                  |
| Pythagorean relation     | \(c^2 = a^2 + b^2\) appears identically to ellipses       |

## 4. Building the idea — from intuition to formalism

### Step 1 — The difference-of-distances definition
A hyperbola is the set of all points \(P\) satisfying \(\lvert PF_1 - PF_2 \rvert = 2a\) where \(F_1, F_2\) are fixed foci and \(2a\) is a positive constant smaller than the distance between the foci.  
Concrete example: foci at \((-5,0)\) and \((5,0)\), constant difference \(6\). Any point on either branch obeys that rule.  
Formal statement:  
\[
\lvert \sqrt{(x+ c)^2 + y^2} - \sqrt{(x- c)^2 + y^2} \rvert = 2a, \quad c > a > 0.
\]
> [!WARNING]
> Reversing the inequality produces an ellipse; forgetting the absolute value yields only one branch.

### Step 2 — Algebraic simplification to standard form
Isolate one square root, square both sides, isolate the remaining radical, and square again. After cancellation the cross terms vanish and the equation reduces to  
\[
\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1, \quad b^2 = c^2 - a^2.
\]
The same process with foci on the \(y\)-axis yields the conjugate form.

### Step 3 — Vertices, transverse axis, conjugate axis
Setting \(y=0\) gives the vertices \((\pm a, 0)\). The segment between them is the transverse axis of length \(2a\). The conjugate axis of length \(2b\) lies along \(x=0\) and does not intersect the curve.

### Step 4 — Asymptotes as limiting lines
Divide the standard equation by \(x^2\) and let \(x \to \infty\): the \(1/x^2\) terms disappear, leaving  
\[
\frac{y^2}{x^2} = \frac{b^2}{a^2} \implies y = \pm \frac{b}{a}x.
\]
These two lines are the asymptotes; the hyperbola never touches them yet approaches them arbitrarily closely.

### Step 5 — Location of the foci
The foci lie on the transverse axis at \((\pm c, 0)\) where \(c = \sqrt{a^2 + b^2}\). This follows directly from the original distance condition once the standard form is obtained.

### Step 6 — Eccentricity
Define \(e = c/a\). Because \(c > a\), necessarily \(e > 1\). The eccentricity is invariant under scaling and completely determines the opening angle of the asymptotes via \(\tan\theta = b/a = \sqrt{e^2 - 1}\).

### Step 7 — Textbook statement
Any hyperbola centered at the origin with transverse axis along the \(x\)-axis has equation  
\[
\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1, \quad a>0,\ b>0,
\]
asymptotes \(y = \pm (b/a)x\), foci \((\pm ae, 0)\), eccentricity \(e = \sqrt{1 + (b/a)^2}\).

## 5. Worked examples — every step shown

**Example 1 — Read parameters from equation**  
*Given:* \(\frac{x^2}{16} - \frac{y^2}{9} = 1\).  
*Find:* \(a\), \(b\), \(c\), \(e\), asymptotes, foci.  

Divide: \(a^2 = 16\) so \(a = 4\).  
\(b^2 = 9\) so \(b = 3\).  
\(c^2 = a^2 + b^2 = 25\) so \(c = 5\).  
*Why:* Pythagorean relation from foci definition.  
\(e = c/a = 5/4\).  
Asymptotes: \(y = \pm (3/4)x\).  
Foci: \((\pm 5, 0)\).  

**Final answer**  
\(a=4\), \(b=3\), \(c=5\), \(e=5/4\), asymptotes \(y=\pm\frac{3}{4}x\), foci \((\pm5,0)\).

*Reflection:* The only arithmetic required is extracting square roots; the geometry follows at once.

**Example 2 — Equation from foci and vertex**  
*Given:* foci at \((0,\pm6)\), vertex at \((0,4)\).  
*Find:* standard equation.  

Transverse axis is vertical, so form \(\frac{y^2}{a^2} - \frac{x^2}{b^2} = 1\).  
\(a = 4\).  
\(c = 6\).  
\(b^2 = c^2 - a^2 = 20\).  
*Why:* distance from center to focus is \(c\).  

**Final answer**  
\[
\frac{y^2}{16} - \frac{x^2}{20} = 1.
\]

*Reflection:* Orientation is dictated by the axis containing the foci.

**Example 3 — Find eccentricity from asymptote slope**  
*Given:* asymptotes \(y = \pm\frac{5}{12}x\), vertex \((12,0)\).  
*Find:* \(e\).  

Slope \(b/a = 5/12\), vertex gives \(a = 12\).  
\(b = 5\).  
\(c = \sqrt{144 + 25} = 13\).  
\(e = 13/12\).

**Final answer**  
\(e = 13/12\).

*Reflection:* Slope directly supplies the ratio \(b/a\); \(e\) follows from Pythagoras.

**Example 4 — Hyperbola through a point with given foci**  
*Given:* foci \((\pm5,0)\), passes through \((6, \sqrt{7})\).  
*Find:* equation and eccentricity.  

\(2c = 10\), \(c=5\).  
Let difference be \(2a\):  
\[
\sqrt{(6+5)^2 + 7} - \sqrt{(6-5)^2 + 7} = 2a \implies \sqrt{121+7} - \sqrt{1+7} = 2a.
\]
\(\sqrt{128} - \sqrt{8} = 8\sqrt{2} - 2\sqrt{2} = 6\sqrt{2} = 2a\), so \(a = 3\sqrt{2}\).  
\(b^2 = c^2 - a^2 = 25 - 18 = 7\).  
Equation: \(\frac{x^2}{18} - \frac{y^2}{7} = 1\).  
\(e = 5/(3\sqrt{2}) = \frac{5\sqrt{2}}{6}\).

**Final answer**  
\(\frac{x^2}{18} - \frac{y^2}{7} = 1\), \(e = \frac{5\sqrt{2}}{6}\).

*Reflection:* The distance condition is evaluated at the given point; algebra yields \(a\) directly.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using \(c^2 = a^2 - b^2\)         | Confusing ellipse with hyperbola            | Always check \(e > 1\); \(c^2 = a^2 + b^2\)  |
| Forgetting the absolute value     | Definition has \(\lvert d_1 - d_2 \rvert\)  | Write the absolute value in every derivation |
| Swapping \(a\) and \(b\)          | Both appear under squares                   | Identify transverse axis first               |
| Asymptotes written as \(y = \pm bx/a\) | Slope inverted by habit                | Slope is always \(b/a\) for horizontal transverse axis |
| Assuming hyperbola is bounded     | Visual similarity to ellipse                | Note two disconnected branches               |
| Placing foci on conjugate axis    | Misreading orientation                      | Foci always lie on transverse axis           |
| Using \(e < 1\) for hyperbola     | Memorization without sign check             | Verify \(c > a\) before computing \(e\)      |

## 7. The textbook-precise statement
A hyperbola is the set of points \(P\) in the plane such that the absolute difference of distances from \(P\) to two distinct fixed points (the foci) is a positive constant \(2a\) smaller than the distance between the foci. After placing the center at the origin and the transverse axis along the coordinate axis, the equation takes one of the two forms  
\[
\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1 \quad\text{or}\quad \frac{y^2}{a^2} - \frac{x^2}{b^2} = 1,
\]  
where \(b^2 = c^2 - a^2\) and \(c\) is the linear eccentricity. The eccentricity is \(e = c/a > 1\), the foci are at \((\pm ae,0)\) or \((0,\pm ae)\), and the asymptotes are \(y = \pm(b/a)x\) or \(x = \pm(b/a)y\) respectively. (Stewart, *Calculus*, 9e, §10.5.)

## 8. Visual — diagram or schematic
```text
          y
          ^
          |     asymptote y=(b/a)x
          |    /
   +b     |   /     branch
          |  /   
          | /     vertex (a,0)
   -------+---------> x
          | \     focus (c,0)
          |  \
          |   \    other branch
          |    \
          |     asymptote y=-(b/a)x
          v
```
Center at (0,0), vertices at (±a,0), foci at (±c,0), conjugate axis from (0,-b) to (0,b). The two branches open left and right, never crossing the asymptotes.

## 9. The memory technique
1. **The hook** — Picture two stars (the foci) pulling a comet; the comet’s path is a hyperbola that “misses” both stars by a fixed distance difference, racing off to infinity along straight-line asymptotes.  
2. **What to overlearn** — \(c^2 = a^2 + b^2\), \(e = c/a > 1\), asymptotes \(y = \pm(b/a)x\).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Start from \(\lvert PF_1 - PF_2 \rvert = 2a\), isolate one radical, square twice, simplify.

## 10. What this unlocks
Hyperbolas appear as trajectories under inverse-square repulsion, as level curves of linear fractional transformations, and as the graphs of rational functions after coordinate rotation.  

- Next: polar equations of conics with focus-directrix definition.  
- Later: hyperbolic navigation systems (LORAN), hyperbolic geometry models, and special-relativistic velocity addition.  
- Techniques: rotation of axes to eliminate \(xy\) terms, parametric equations \(x = a\sec\theta\), \(y = b\tan\theta\).

## 11. Self-check — five questions, no answers
1. Write the standard equation of the hyperbola with foci at \((0,\pm10)\) and eccentricity \(5/4\).  
2. A hyperbola has asymptotes \(y = \pm\frac{4}{3}x\) and passes through \((6,4)\). Find its foci.  
3. Show that the difference of distances from any point on the hyperbola \(\frac{x^2}{9} - \frac{y^2}{16} = 1\) to the foci equals 6.  
4. For which value of \(k\) does the line \(y = kx\) intersect the hyperbola \(\frac{x^2}{4} - \frac{y^2}{9} = 1\) at exactly one point?  
5. Derive the relation \(e^2 = 1 + \frac{b^2}{a^2}\) starting only from the distance definition and the standard form.