## What it is
The critical Mach number, $M_{cr}$, is the freestream Mach number ($M_\infty$) at which the flow at some point on an object's surface first reaches the speed of sound ($M=1$). Even though the object itself is moving at subsonic speed ($M_\infty < 1$), the fluid accelerating over its curved surfaces creates a local pocket of sonic flow. This marks the onset of the transonic flight regime.

## Why it matters
Exceeding $M_{cr}$ is a critical design constraint for subsonic aircraft. The appearance of local supersonic flow leads to the formation of shock waves, which dramatically increase drag (wave drag) and can cause flow separation, leading to a loss of lift and potential control problems ("Mach tuck"). Understanding and predicting $M_{cr}$ is fundamental to designing efficient and safe high-speed subsonic wings, like those on commercial airliners.

## When to study it
You should have a solid grasp of the following before tackling this subtopic:
*   **Isentropic Flow Relations:** You must be comfortable with the equations relating pressure, temperature, density, and area to Mach number for isentropic (reversible, adiabatic) flow.
*   **Compressible Bernoulli's Equation:** Understand that $h + V^2/2 = \text{constant}$ is the relevant energy conservation principle.
*   **Pressure Coefficient ($C_p$):** You should know its definition and how it relates pressure on a surface to freestream dynamic pressure.
*   **Basic Airfoil Aerodynamics:** Understand that airfoils generate lift by creating pressure differences, which requires accelerating flow over the top surface.

If these are not familiar, review them first.

## How to study it (step by step)
1.  **Revisit Flow Acceleration:** Draw an airfoil. Sketch streamlines over it. Convince yourself, from the continuity principle (streamtube narrowing), that flow must accelerate over the curved upper surface. The point of maximum velocity is the point of minimum pressure.
2.  **Connect Pressure and Mach Number:** Write down the isentropic relation between pressure and Mach number: $p_0/p = (1 + \frac{\gamma-1}{2}M^2)^{\gamma/(\gamma-1)}$. Realize that since stagnation pressure $p_0$ is constant along a streamline, a lower local static pressure $p$ implies a higher local Mach number $M$.
3.  **Define the Critical Condition:** Formally state the condition for $M_{cr}$: The freestream Mach number is $M_\infty = M_{cr}$ when the local Mach number at the point of minimum pressure is exactly $M_{local} = 1$.
4.  **Derive the Critical Pressure Coefficient:** Use the isentropic relation from step 2 to find the specific pressure coefficient, $C_{p,cr}$, that corresponds to a local Mach number of 1 for a given freestream $M_\infty$. This is the "target" $C_p$ value.
5.  **Calculate $M_{cr}$ for an Airfoil:** For a given airfoil, you know its minimum pressure coefficient in incompressible flow, $C_{p,0}$. Use a compressibility correction (like the Prandtl-Glauert rule, $C_p = C_{p,0}/\sqrt{1-M_\infty^2}$) to estimate how this minimum pressure changes as speed increases. Find the $M_\infty$ where this value equals $C_{p,cr}$. This is the airfoil's critical Mach number.
6.  **Sketch the Flow Fields:** Draw three diagrams of an airfoil: one for $M_\infty < M_{cr}$, one for $M_\infty = M_{cr}$, and one for $M_\infty > M_{cr}$. Show the development of the local supersonic bubble and the eventual formation of a shock wave.

## Key ideas, with intuition
1.  **Flow Accelerates Over Curves:** An object placed in a fluid forces the streamlines to curve around it. To travel the longer path over a curved surface (like an airfoil's upper surface) in the same amount of time, the fluid must accelerate. This is the heart of the matter.
    $$ V_{local} > V_\infty $$
2.  **Local Mach Number is Higher than Freestream:** Since velocity is higher at certain points on the surface, and the local temperature (and thus local speed of sound) hasn't dropped as much, the local Mach number is higher than the freestream Mach number.
    $$ M_{local} = \frac{V_{local}}{a_{local}} > \frac{V_\infty}{a_\infty} = M_\infty $$
3.  **The "First to Break" Barrier:** The critical Mach number isn't when the whole aircraft is sonic. It's the freestream speed where the *single fastest point* of the flow on the aircraft's skin just touches Mach 1. This is why a Boeing 787 cruises at $M_\infty \approx 0.85$ but has supersonic flow over its wings.
4.  **Pressure is the Link:** We can't easily measure local velocity, but we can measure pressure. The isentropic flow equations provide the exact link between the pressure we can measure and the Mach number we care about. The key relationship links the pressure at the sonic point ($p^*$) to the freestream pressure ($p_\infty$) via the freestream Mach number ($M_{cr}$).
    $$ \frac{p^*}{p_\infty} = \left( \frac{2 + (\gamma-1)M_{cr}^2}{\gamma+1} \right)^{\gamma/(\gamma-1)} $$
    This equation tells you how low the pressure has to get (relative to freestream) to create a sonic point for a given flight speed.

## Worked example
**Problem:** An experimental aircraft is in a wind tunnel at $M_\infty = 0.8$ in air ($\gamma=1.4$). Pressure sensors on the wing indicate the minimum pressure coefficient is $C_{p,min} = -0.45$. Has the flow over the wing become locally supersonic? (i.e., has the critical Mach number been exceeded?)

**Solution:**

1.  **State the Goal:** We need to determine if the conditions are sufficient to create sonic flow. We do this by calculating the *critical pressure coefficient* ($C_{p,cr}$) for the given freestream Mach number, $M_\infty = 0.8$. This is the pressure coefficient *required* to have $M_{local}=1$. We then compare our measured $C_{p,min}$ to this value.

2.  **Find the Critical Pressure Ratio:** First, find the ratio of static pressure at a sonic point ($p^*$) to the freestream static pressure ($p_\infty$) using the isentropic relation.
    $$ \frac{p^*}{p_\infty} = \left[ \frac{2+(\gamma-1)M_\infty^2}{\gamma+1} \right]^{\gamma/(\gamma-1)} $$
    Substitute the values $M_\infty=0.8$ and $\gamma=1.4$:
    $$ \frac{p^*}{p_\infty} = \left[ \frac{2+(1.4-1)(0.8)^2}{1.4+1} \right]^{1.4/(1.4-1)} = \left[ \frac{2+0.4(0.64)}{2.4} \right]^{3.5} $$
    $$ \frac{p^*}{p_\infty} = \left[ \frac{2.256}{2.4} \right]^{3.5} = (0.94)^{3.5} \approx 0.8033 $$

3.  **Calculate the Critical Pressure Coefficient:** Now, convert this pressure ratio into the critical pressure coefficient, $C_{p,cr}$.
    $$ C_{p,cr} = \frac{p^* - p_\infty}{\frac{1}{2}\rho_\infty V_\infty^2} = \frac{p^*/p_\infty - 1}{\frac{1}{2}\gamma M_\infty^2} $$
    Substitute the values from step 2 and the problem statement:
    $$ C_{p,cr} = \frac{0.8033 - 1}{\frac{1}{2}(1.4)(0.8)^2} = \frac{-0.1967}{0.7(0.64)} = \frac{-0.1967}{0.448} \approx -0.439 $$

4.  **Compare and Conclude:** The pressure coefficient required to achieve local sonic flow at $M_\infty=0.8$ is $C_{p,cr} = -0.439$. The actual minimum pressure coefficient on the wing is $C_{p,min} = -0.45$.
    Since pressure is inversely related to velocity, a more negative $C_p$ means a higher velocity. Because our actual $C_{p,min}$ is *more negative* than the critical value ($ -0.45 < -0.439 $), the flow at that point has accelerated *past* Mach 1.
    **Conclusion:** Yes, the critical Mach number has been exceeded. A region of local supersonic flow exists on the wing.

*Reflection:* Each step builds on the last. Step 1 frames the problem. Step 2 uses the core physical principle (isentropic relations) to find the pressure state at the sonic point. Step 3 translates this physical state into the aerodynamic coefficient we use in practice. Step 4 compares the requirement to the reality to make a final conclusion.

## Diagrams
An airfoil at its critical Mach number. The flow is subsonic everywhere except for a single point on the upper surface where it just reaches sonic velocity.

```text
       M_local < 1
      . . . . . . . . . . . . . . . . . . . Streamlines accelerating
 . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . Point where M_local = 1 . . .
. . . . . . . . . . . . .v. . . . . . . . . .
                  _________________
                /                   \
M_infinity = M_cr  /_____________________\    <-- Airfoil
    (subsonic)
. . . . . . . . . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . . . . . . Streamlines
       M_local < 1
```

## Memory technique — remember this forever
1.  **The Story:** Imagine you're driving on a highway with a 600 mph speed limit ($M_\infty < 1$). You approach a large, curved hill (an airfoil). To get over the top, you have to press the accelerator. Your *car's speed* ($M_{local}$) increases. The "Critical Mach number" is the highway speed where your speedometer just kisses the sound barrier ($M_{local}=1$) at the very crest of the hill, even though your overall highway trip is still subsonic. The "critical" part is that right after this, you'll hit a "wall" of air (a shock wave).

2.  **Formulas to Overlearn:**
    *   The concept: $M_{cr}$ is the freestream $M_\infty$ where $\max(M_{local}) = 1$.
    *   The isentropic pressure-Mach backbone: $\frac{p_0}{p} = \left(1 + \frac{\gamma-1}{2}M^2\right)^{\gamma/(\gamma-1)}$. This is your tool for everything.

3.  **Spaced Repetition Schedule:** Review this lesson and re-work the example in 1 day, 3 days, 7 days, 16 days, and 35 days.

4.  **First Principles Pathway:** If you forget all the formulas, rebuild from the steady flow energy equation: $h + \frac{1}{2}V^2 = h_0$. Use the ideal gas relations ($h=c_p T$, $a^2=\gamma R T$, $c_p = \frac{\gamma R}{\gamma-1}$) to derive the temperature-Mach relation $\frac{T_0}{T} = 1 + \frac{\gamma-1}{2}M^2$. From there, use the isentropic laws ($p/\rho^\gamma=const$, $T/p^{(\gamma-1)/\gamma}=const$) to get the pressure-Mach relation. This allows you to relate any two points in the flow (freestream and the sonic point) and solve for the critical condition.

## Common mistakes
*   **Confusing $M_{cr}$ with $M=1$:** The critical Mach number is a *freestream* value that is always less than 1. It is the flight speed that *causes* sonic flow somewhere on the body.
*   **Sign Errors with $C_p$:** For lift-producing surfaces, the accelerated flow is on the top, where pressure is lower than freestream. This means $C_p$ is negative. A higher speed means a *more negative* $C_p$. Don't forget this when comparing values.
*   **Applying Incompressible Approximations:** Using Bernoulli's equation ($p + \frac{1}{2}\rho V^2 = const$) or Prandtl-Glauert corrections too close to Mach 1. The full isentropic relations are required for accuracy.
*   **Thinking the whole wing goes supersonic:** At $M_{cr}$, only a single point becomes sonic. Just above $M_{cr}$, a small bubble of supersonic flow forms, which grows as $M_\infty$ increases.

## Self-check
1.  An aircraft is flying precisely at its critical Mach number, $M_{cr} = 0.82$. Is the aircraft breaking the sound barrier? Explain your reasoning in one sentence.
2.  Two airfoils have the same shape, but one is 10% thicker than the other. Which airfoil will have a lower critical Mach number? Justify your answer by describing the effect of thickness on flow acceleration.
3.  Starting from the isentropic relation for pressure, $\frac{p_0}{p} = (1 + \frac{\gamma-1}{2}M^2)^{\gamma/(\gamma-1)}$, and the definition of pressure coefficient, $C_p = \frac{p-p_\infty}{q_\infty}$, derive the full expression for the critical pressure coefficient ($C_{p,cr}$) as a function of freestream Mach number $M_\infty$ and $\gamma$.