## 1. The one-sentence answer
**Ampere’s circuital law in magnetostatic form asserts that the circulation of the magnetic field around any closed path equals μ₀ times the total current threading that path.**

This equality follows directly from the experimental fact that steady currents produce magnetic fields whose strength falls as 1/r around a long straight wire and whose direction circles the wire according to the right-hand rule. Because the field is divergenceless and curl-free except at the current itself, its line integral collapses to a simple product of field magnitude and path length once symmetry is used to pull the field out of the integral. The law therefore converts an otherwise intractable volume integral over all space into an algebraic relation between B and the enclosed current whenever the geometry supplies enough symmetry.

The magnetostatic restriction means all currents are constant in time and no electric fields are changing; under those conditions the displacement-current term vanishes and the integral form closes exactly on the conduction current alone.

> [!NOTE]
> The single deepest insight is that symmetry turns an unknown vector field into a single unknown scalar that can be solved for by inspection once the correct Amperian loop is drawn.

## 2. Why this matters — concrete and current
In the design of Hall-effect thrusters flown on thousands of commercial satellites, engineers use the law to calculate the azimuthal magnetic field inside the annular discharge channel; the resulting B-field strength directly sets the electron cyclotron radius and therefore the ionization efficiency that determines specific impulse.

Particle-accelerator beam lines at facilities such as CERN’s LHC employ large numbers of superconducting dipole magnets whose field maps are obtained by integrating Ampère’s law over rectangular Amperian loops that exploit the iron yoke symmetry; any deviation from the predicted ∮B·dl immediately signals a quench risk or misalignment.

Magnetic shielding of sensitive spacecraft electronics against solar energetic particles relies on the same integral relation applied to cylindrical current sheets; the enclosed-current term yields the minimum amperage needed in the shield coils to keep the interior field below a few microtesla, a calculation performed daily in radiation-hardness reviews at NASA and ESA.

In semiconductor manufacturing, the magnetic lenses of electron-beam lithography tools are sized with Ampère’s law applied to solenoid geometries; the resulting uniform axial field determines beam spot size and therefore the minimum feature pitch achievable at each technology node.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Steady current           | Only time-independent J produces a pure magnetostatic B   |
| Line integral ∮F·dr      | The law is stated as a circulation; you must evaluate it  |
| Right-hand rule          | Fixes the sense of positive current through the surface   |
| Symmetry arguments       | Allows B to be removed from the integral                  |
| Surface bounded by curve | Defines precisely which current is “enclosed”             |

## 4. Building the idea — from intuition to formalism

### Step 1 — Currents create circling field lines
A steady current produces magnetic field lines that form closed circles around the flow. For an infinite straight wire the circles lie in planes perpendicular to the wire and their radius grows without bound.

Example: a wire along z carrying +I in the +z direction yields B that points in the azimuthal φ̂ direction.

Formal statement:  
$$ \mathbf{B}(\mathbf{r}) = \frac{\mu_0 I}{2\pi r}\hat{\phi} \quad (r>0). $$

> [!WARNING]
> Reversing the assumed current direction without reversing the integration sense produces a sign error that propagates through every later calculation.

### Step 2 — Circulation is path-independent for symmetric fields
Because the field strength depends only on radial distance and its direction is everywhere tangent to circles of constant r, the integral ∮B·dl evaluated on any circle centered on the wire equals B times the circumference.

Formal statement:  
$$ \oint_C \mathbf{B}\cdot d\mathbf{l} = B_\phi \cdot 2\pi r. $$

### Step 3 — Enclosed current is the net threading current
Only currents that pierce any surface whose boundary is the chosen path contribute. Currents outside that surface contribute zero net circulation.

Formal statement:  
$$ I_\text{enc} = \int_S \mathbf{J}\cdot d\mathbf{A}. $$

### Step 4 — The integral equals μ₀ I_enc
Experiments and the Biot-Savart law together fix the proportionality constant. The circulation is therefore exactly μ₀ times the enclosed current.

Formal statement:  
$$ \oint_C \mathbf{B}\cdot d\mathbf{l} = \mu_0 I_\text{enc}. $$

### Step 5 — The surface may be deformed arbitrarily
Any surface bounded by the same closed curve C yields the same I_enc because ∇·J=0 for steady currents; therefore the law is independent of the particular surface chosen.

### Step 6 — Differential form via Stokes’ theorem
Applying Stokes’ theorem to an arbitrary infinitesimal surface converts the integral law into the local relation  
$$ \nabla\times\mathbf{B}=\mu_0\mathbf{J}. $$

This is the textbook magnetostatic statement of Ampère’s law.

## 5. Worked examples — every step shown

**Example 1 — Infinite straight wire**  
*Given:* An infinitely long wire along the z-axis carries current I uniformly.  
*Find:* B at perpendicular distance r.  

Choose circular Amperian loop of radius r centered on the wire.  
Symmetry forces B constant in magnitude and tangent to the path, so  
$$ \oint \mathbf{B}\cdot d\mathbf{l}=B\cdot 2\pi r. $$  
*Why:* every point on the circle experiences identical |B| and dl is everywhere parallel to B.  

All current pierces the interior disk, therefore I_enc=I.  
*Why:* the chosen surface is bounded by the loop and the wire threads it once.  

Apply the law:  
$$ B\cdot 2\pi r=\mu_0 I \implies B=\frac{\mu_0 I}{2\pi r}. $$  
**Final answer:**  
$$ \mathbf{B}=\frac{\mu_0 I}{2\pi r}\hat{\phi}. $$

*Reflection:* The only non-obvious step was recognizing that symmetry removes B from the integral; once that is granted, algebra is immediate.

**Example 2 — Solenoid**  
*Given:* Long solenoid of radius R, n turns per unit length, current I.  
*Find:* B inside and outside.  

Rectangular Amperian loop with one long side inside, one outside, and two radial ends.  
Outside: enclosed current is zero, circulation must vanish, hence B_out=0.  
Inside: enclosed current is nLI, circulation reduces to B·L, yielding  
$$ B=\mu_0 n I. $$  
**Final answer:**  
$$ B=\mu_0 n I \quad (r<R),\qquad B=0 \quad (r>R). $$

*Reflection:* The radial ends contribute nothing because B is axial; this is the key geometric cancellation.

**Example 3 — Infinite current sheet**  
*Given:* Infinite sheet in xy-plane with uniform surface current density K in +x direction.  
*Find:* B above and below the sheet.  

Rectangular loop straddling the sheet, sides parallel to y.  
Circulation equals 2B L; enclosed current is K L.  
Thus B=μ₀ K/2 on each side, direction given by right-hand rule.  
**Final answer:**  
$$ \mathbf{B}=\frac{\mu_0}{2}K\times\hat{n}. $$

*Reflection:* The factor of two arises because the loop crosses the sheet once and samples equal-magnitude fields on both sides.

**Example 4 — Coaxial cable return path**  
*Given:* Inner wire radius a carrying +I, outer sheath from b to c carrying –I uniformly.  
*Find:* B in all regions.  

Apply the law in four zones (r<a, a<r<b, b<r<c, r>c).  
I_enc changes at each boundary, producing four distinct expressions for B.  
**Final answer:**  
$$ B(r)=\begin{cases} 
\frac{\mu_0 I r}{2\pi a^2} & r<a \\
\frac{\mu_0 I}{2\pi r} & a<r<b \\
\frac{\mu_0 I(c^2-r^2)}{2\pi r(c^2-b^2)} & b<r<c \\
0 & r>c 
\end{cases}. $$

*Reflection:* The outer return current must be integrated carefully; forgetting the radial weighting inside the sheath is a common algebraic slip.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                                      | How to avoid it                                      |
|-------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Wrong sign of I_enc                 | Forgetting right-hand rule when defining positive normal | Draw the loop and curl fingers; thumb fixes normal   |
| Using open path instead of closed   | Intuitive but illegal under Stokes’ theorem         | Always close the curve before integrating            |
| Assuming B constant on non-symmetric path | Over-generalizing the wire result                   | Verify |B| and angle are constant before pulling B out |
| Ignoring return currents            | Thinking only the “obvious” wire matters            | Draw the entire circuit; net I_enc must be consistent with ∇·J=0 |
| Applying the law to time-varying cases | Forgetting displacement current                     | Check that ∂E/∂t=0 everywhere before using magnetostatic form |
| Choosing surface that currents graze | Ambiguous piercing count                            | Deform surface so every current crosses cleanly or not at all |
| Confusing H with B in materials     | Materials introduce M; law for H is ∮H·dl=I_free    | Use B version only in vacuum or add free-current caveat |

## 7. The textbook-precise statement
In any region where the magnetic field is magnetostatic (∂E/∂t=0) and the current density satisfies ∇·J=0, the circulation of B around any closed oriented curve C obeys  
$$ \oint_C\mathbf{B}\cdot d\mathbf{l}=\mu_0\int_S\mathbf{J}\cdot d\mathbf{A}, $$  
where S is any oriented surface bounded by C. Equivalently, in differential form,  
$$ \nabla\times\mathbf{B}=\mu_0\mathbf{J}. $$  
(Griffiths, *Introduction to Electrodynamics*, 4th ed., §5.3, Eq. 5.35 and Eq. 5.36.)

## 8. Visual — diagram or schematic
```text
          B (circles)
           ↻ ↻ ↻
          /       \
         /  Amperian \
        |    loop C    |   wire along z
         \             /
          \___________/
               ↑ I
```
The diagram shows an infinite wire perpendicular to the page carrying current I out of the page. Concentric circles represent B lines. The largest circle is the Amperian loop C of radius r; the surface S is the flat disk bounded by C. The right-hand rule orients dl counterclockwise when viewed from above, so positive current pierces S in the +z direction.

## 9. The memory technique

1. **The hook**  
   Picture a closed belt of current; the magnetic field walks around the belt exactly once for every ampere that threads the belt’s interior—like a turnstile that clicks once per enclosed passenger.

2. **What to overlearn**  
   - ∮B·dl=μ₀ I_enc (integral)  
   - ∇×B=μ₀J (differential)  
   - Right-hand rule linking dl sense to surface normal

3. **Spaced-repetition schedule**  
   Review at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.

4. **First-principles fallback**  
   Begin from the Biot-Savart law for a single current element, integrate over a symmetric geometry, then apply Stokes’ theorem to recover the integral statement.

## 10. What this unlocks
Ampère’s law supplies the magnetostatic member of Maxwell’s equations and thereby opens the route to electromagnetic waves, inductance calculations, and the magnetic vector potential.  

- Differential form immediately yields the vector Poisson equation for A.  
- Combined with Faraday’s law it produces the full set of Maxwell equations in vacuum.  
- Serves as the foundation for the Biot-Savart law inversion and for calculating self-inductance of coils used in rocket magnetometers and attitude-control torquers.

## 11. Self-check — five questions, no answers
1. A steady current I flows in a wire of arbitrary shape. Is ∮B·dl around a closed loop that does not enclose the wire necessarily zero?  
2. Derive the magnetic field inside a long tightly wound toroidal solenoid using an appropriate Amperian loop; state the enclosed current explicitly.  
3. A coaxial cable carries +I on the inner conductor and –I uniformly distributed in the outer sheath. At what radius is |B| maximum?  
4. Explain why the magnetostatic form cannot be applied unchanged to a charging capacitor.  
5. Two infinite parallel sheets carry equal and opposite surface currents. Construct an Amperian loop that shows the field is zero outside the sandwich and uniform between them; compute its magnitude.