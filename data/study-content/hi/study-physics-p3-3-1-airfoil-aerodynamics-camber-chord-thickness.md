## 1. The one-sentence answer
**An airfoil is defined by its chord line, camber line, and thickness distribution, which together control how air accelerates and generates lift and drag in compressible flow.**

Chord is the straight-line distance from leading edge to trailing edge. Camber measures the curvature of the mean line away from this chord, shifting the zero-lift angle. Thickness is the local vertical distance between upper and lower surfaces, expressed as a percentage of chord. These three geometric parameters fix the pressure distribution around the airfoil at any given Mach number and angle of attack.

When you change camber, you move the point where flow first reaches sonic speed; when you increase thickness, you raise the peak local Mach number even at the same angle of attack. The interplay of these three quantities therefore decides whether an airfoil stays subsonic or develops shocks.

> [!NOTE]
> The single most important insight is that camber and thickness are not independent decorations; both alter the effective angle that the oncoming flow “sees,” so a 2 % camber change can shift the critical Mach number by the same amount as a 1° change in angle of attack.

## 2. Why this matters — concrete and current
NASA’s X-59 QueSST uses a carefully tailored camber and 4.1 % thickness distribution to keep the upper-surface Mach peak below 1.0 at cruise, eliminating the sonic boom signature on the ground.

Boeing’s 787-10 wing employs a supercritical airfoil family whose camber line is reflexed near the trailing edge; this delays shock-induced separation up to Mach 0.85 and allows the aircraft to fly 10 % farther on the same fuel load.

SpaceX’s Starship flaps operate as cambered plates at hypersonic entry; the 8 % thickness and 3° camber chosen after wind-tunnel tests reduce peak heating by shifting the bow shock standoff distance.

The Eurofighter Typhoon’s leading-edge slats vary effective camber in flight; at Mach 0.9 the slat deflection changes the zero-lift angle by 4°, giving the pilot an extra 2 g of sustained turn rate without entering buffet.

In compressor cascades of the GE9X engine, rotor blades are designed with 6–8 % thickness and controlled camber so that relative Mach numbers of 1.3 do not produce passage shocks that would stall the stage.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Angle of attack          | Sets the geometric incidence relative to the chord line                             |
| Pressure coefficient     | Converts local surface velocity into the lift and drag that camber and thickness produce |
| Isentropic relations     | Allow you to calculate the local Mach number once thickness-induced acceleration is known |
| Thin-airfoil approximation | Gives the first-order analytic link between camber, thickness, and lift-curve slope |

If any row above is unfamiliar, pause and review that concept before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Draw the reference chord
The chord is the longest straight line that can be drawn inside the airfoil, conventionally placed from leading edge (LE) to trailing edge (TE).  
Example: a NACA 0012 airfoil has chord length 1 m; every coordinate is later normalised by this length.  
Mathematically the chord line satisfies  
$$y=0,\quad 0\le x\le c.$$  
> [!WARNING]  
> Treating the chord as anything other than the straight geometric line will rotate every subsequent angle and destroy the definition of angle of attack.

### Step 2 — Locate the camber line
The camber line is the locus of mid-points between upper and lower surfaces measured perpendicular to the chord.  
For a circular-arc camber of maximum height \(f\) at mid-chord, the camber line is  
$$y_c(x)=\frac{4f}{c^2}x(c-x).$$  
> [!WARNING]  
> If you measure camber from the chord but forget it is a mean line, you will double-count thickness when you later add the two surfaces.

### Step 3 — Add thickness distribution
Thickness \(t(x)\) is added symmetrically (or asymmetrically) normal to the camber line. The upper surface ordinate becomes  
$$y_u=y_c+\frac{t(x)}{2}\cos\theta,\qquad\theta=\arctan\left(\frac{dy_c}{dx}\right).$$  
Example: NACA 2412 has 2 % camber at 40 % chord and 12 % maximum thickness.  
> [!WARNING]  
> Adding thickness along the y-axis instead of normal to the camber line creates an artificial blunt trailing edge that changes the Kutta condition.

### Step 4 — Non-dimensionalise everything
All lengths are divided by chord \(c\); camber ratio \(f/c\) and thickness ratio \(t/c\) become the only two geometric parameters that remain.  
This normalisation lets you compare a 1 m wind-tunnel model with a 10 m wing directly.

### Step 5 — Link geometry to surface speed (thin-airfoil result)
Under the small-perturbation assumption the perturbation velocity on the surface is  
$$u(x)=\frac{1}{\pi}\int_0^c\frac{\gamma(\xi)}{x-\xi}d\xi,$$  
where the vortex sheet strength \(\gamma\) is fixed by the camber slope and angle of attack. The resulting \(C_p=-2u/U_\infty\) then determines whether local Mach number exceeds 1.

### Step 6 — Obtain lift and drag coefficients
Integration of the pressure distribution yields the classic relations  
$$C_l=2\pi(\alpha-\alpha_{L=0}),\qquad\alpha_{L=0}=-\frac{1}{\pi}\int_0^\pi\frac{dy_c}{dx}(\theta)d\theta.$$  
Thickness enters only at second order through the critical-Mach correction.

### Step 7 — Introduce compressibility correction
At higher Mach numbers the Prandtl-Glauert factor stretches both camber and thickness effects:  
$$C_{p,\text{comp}}=\frac{C_{p,\text{inc}}}{\sqrt{1-M_\infty^2}}.$$  
This is the first point where the three geometric parameters cease to be purely geometric and become aerodynamic.

## 5. Worked examples — har step show karo

**Example 1 — Flat-plate zero-thickness limit**  
*Given:* Chord \(c=1\), \(\alpha=5^\circ\), zero camber, zero thickness.  
*Find:* \(C_l\).  
Step 1: \(\alpha_{L=0}=0\) because \(dy_c/dx=0\).  
Step 2: \(C_l=2\pi\alpha=2\pi\times0.0873=0.548\).  
*Why* the factor \(2\pi\)? It is the analytic result of integrating the vortex-sheet solution for a flat plate.  
**Final answer** \(C_l=0.548\).

**Example 2 — Pure camber, zero thickness**  
*Given:* Circular-arc camber, \(f/c=0.02\) at mid-chord, \(\alpha=0\).  
*Find:* \(\alpha_{L=0}\).  
The camber slope integral evaluates to \(\alpha_{L=0}=-0.035\) rad \(\approx-2^\circ\).  
*Why* negative? Positive camber produces positive lift at zero geometric angle.  
**Final answer** \(\alpha_{L=0}=-2^\circ\).

**Example 3 — Thickness effect on critical Mach**  
*Given:* NACA 0012 at \(M_\infty=0.7\), \(\alpha=0\).  
*Find:* Peak local Mach.  
Using the incompressible \(C_{p,\min}=-0.45\) and Glauert correction, local \(M=0.92\).  
*Why* the rise? Thickness accelerates flow even at zero lift.  
**Final answer** \(M_{\text{local}}=0.92\).

**Example 4 — Combined camber and thickness at transonic speed**  
*Given:* NACA 2412 at \(M_\infty=0.75\), \(\alpha=2^\circ\).  
*Find:* Whether a shock forms.  
Camber alone would give \(C_{p,\min}=-0.6\); thickness adds another \(-0.3\); after compressibility correction \(M_{\text{local}}=1.05>1\).  
*Why* shock appears? The two geometric contributions add linearly at this order.  
**Final answer** Shock present; wave drag appears.

*Reflection:* Each example isolates one geometric driver before recombining them; the same sequence scales to any airfoil family.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Measuring camber from chord instead of mean line | Students confuse “height above chord” with actual camber definition | Always integrate the midpoint locus first            |
| Adding thickness vertically rather than normal to camber | Simplifies drawing but violates surface definition | Use the local camber slope angle \(\theta\)          |
| Forgetting that \(\alpha_{L=0}\) depends only on camber | Thickness contribution is second-order              | Compute \(\alpha_{L=0}\) before adding thickness     |
| Using incompressible \(C_p\) at \(M>0.5\) | Misses the \(\sqrt{1-M^2}\) amplification           | Apply Prandtl-Glauert or better, a transonic solver  |
| Treating chord as the aerodynamic reference at high Mach | Shock position moves the effective neutral point    | Recompute aerodynamic centre after obtaining \(C_p\) |
| Confusing maximum thickness with trailing-edge thickness | Affects Kutta condition and base drag               | Report both \(t_{\max}/c\) and \(t_{\text{TE}}/c\)   |
| Normalising coordinates by span instead of chord | Destroys all non-dimensional coefficients           | Always divide by local chord before plotting         |

## 7. The textbook-precise statement
In Anderson, *Fundamentals of Aerodynamics*, 6e, §4.4, an airfoil profile is described by a chord line of length \(c\) joining the leading-edge point to the trailing-edge point, a camber line \(y_c(x)\) whose slope satisfies the Kutta condition at \(x=c\), and a thickness function \(t(x)\) measured perpendicular to the camber line. The surface coordinates are then given by  
$$x_u=x-y_c'\frac{t}{2},\quad y_u=y_c+\frac{t}{2},\quad\text{and similarly for the lower surface}.$$  
All aerodynamic coefficients are non-dimensionalised by \(c\) and are functions of angle of attack measured from the chord line, free-stream Mach number, and the two non-dimensional geometric parameters \(f/c\) and \(t_{\max}/c\).

## 8. Visual — diagram or schematic
```
          upper surface
               /\
              /  \          thickness t(x)
chord line   /    \____________________
   0---------+-------------------------+--→ x
            /      camber line y_c(x)
           /
        lower surface
```
LE at (0,0), TE at (c,0); camber line peaks at \(x=0.4c\), \(y=f\); thickness added normal to camber line.

## 9. The memory technique
**The hook** — picture the chord as a ruler, the camber line as a bent paper strip lying on the ruler, and thickness as two equal slices of bread placed above and below the strip.

**What to overlearn** — \(C_l=2\pi(\alpha-\alpha_{L=0})\) with \(\alpha_{L=0}\) determined solely by camber; \(t/c\) controls critical Mach via \(C_{p,\min}\).

**Spaced-repetition schedule** — review the three geometric definitions after 1 day, 3 days, 7 days, 16 days, and 35 days.

**First-principles fallback** — if you forget the formula, redraw the camber line, compute its slope integral, and re-derive \(\alpha_{L=0}\) from the thin-airfoil integral equation.

## 10. What this unlocks
You can now predict zero-lift angle, critical Mach number, and the onset of wave drag for any given geometry before running CFD.  

- Next: shock-expansion theory on supersonic airfoils  
- Next: transonic area rule and supercritical airfoil design  
- Next: viscous coupling via boundary-layer displacement on camber line  
- Next: panel-method implementation that ingests (camber, thickness) tables directly

## 11. Self-check — five questions, no answers
1. A NACA 23012 airfoil has what \(\alpha_{L=0}\) if its camber line is given by the standard NACA mean-line equation?  
2. At \(M_\infty=0.72\), how much does increasing thickness from 10 % to 13 % raise the peak local Mach number for the same lift coefficient?  
3. Why does a 1 % increase in trailing-edge thickness change wave drag more than the same increase placed at mid-chord?  
4. If camber is doubled but thickness is halved, does the critical Mach number rise or fall? Give the dominant term.  
5. Draw the pressure distribution you expect on a cambered airfoil once a normal shock sits at 55 % chord; mark the regions of subsonic and supersonic flow.