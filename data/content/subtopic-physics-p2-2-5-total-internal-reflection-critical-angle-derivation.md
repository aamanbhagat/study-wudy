## What it is
Total internal reflection (TIR) is a phenomenon where a light ray traveling from a medium with a higher refractive index to one with a lower refractive index is completely reflected back into the first medium. This occurs only if the angle of incidence is greater than a specific value called the critical angle. Below this angle, light refracts and reflects; at or above it, only reflection occurs.

## Why it matters
TIR is the fundamental principle behind fiber optics, which forms the backbone of the internet and modern telecommunications. In aerospace, fiber optic sensors are used for structural health monitoring in aircraft and spacecraft because they are lightweight and immune to electromagnetic interference. It is also essential for designing optical instruments like binoculars and medical endoscopes.

## When to study it
You must have a solid understanding of Snell's Law and the definition of the refractive index ($n = c/v$). You also need basic trigonometry, specifically the properties of the sine function and its inverse. If you cannot derive and apply Snell's Law ($n_1 \sin\theta_1 = n_2 \sin\theta_2$) from memory, review that first.

## How to study it (step by step)
1.  **Review Snell's Law:** Write down the formula $n_1 \sin\theta_1 = n_2 \sin\theta_2$. Define every term ($n_1, n_2$ are refractive indices of medium 1 and 2; $\theta_1, \theta_2$ are the angles of incidence and refraction, measured from the normal).
2.  **Draw the Scenario:** Draw a boundary between two media. Label the top medium $n_2$ and the bottom medium $n_1$. Set the condition for TIR: $n_1 > n_2$. Draw a light ray starting in medium 1, hitting the boundary, and refracting into medium 2. Crucially, since $n_1 > n_2$, the ray must bend *away* from the normal.
3.  **Find the Limit:** Ask yourself: what is the maximum possible angle of refraction, $\theta_2$? The ray can't bend more than $90^\circ$ from the normal, as that would mean it's skimming the surface. This limiting case defines the critical angle.
4.  **Derive the Formula:** Set $\theta_2 = 90^\circ$ in Snell's Law. The angle of incidence $\theta_1$ that causes this is, by definition, the critical angle, $\theta_c$. Solve the equation for $\theta_c$.
5.  **Test the Boundary Condition:** Use your derived formula to calculate the critical angle for a common interface, like glass ($n_1=1.5$) to air ($n_2=1.0$).
6.  **Consider the "Impossible" Case:** What does Snell's Law predict if $\theta_1 > \theta_c$? You will find that $\sin\theta_2$ must be greater than 1, which has no real solution. This mathematical impossibility confirms that refraction cannot occur, so the light must be totally reflected.

## Key ideas, with intuition
1.  **Denser to Lighter is Required:** TIR can only happen when light travels from a "slower" (optically denser, higher $n$) medium to a "faster" (optically less dense, lower $n$) one. Think of it as a car driving from mud onto pavement; it can speed up and turn away from the perpendicular path. The reverse—pavement to mud—always bends the car *toward* the perpendicular, so it can never skim the boundary.
    $$ n_1 > n_2 \implies \text{TIR is possible} $$
2.  **Refraction has a Speed Limit:** As the angle of incidence $\theta_1$ increases, the angle of refraction $\theta_2$ also increases, but faster. There is a maximum possible value for $\theta_2$, which is $90^\circ$. The light ray cannot bend any further away from the normal.
3.  **The Critical Angle is the Tipping Point:** The critical angle, $\theta_c$, is the specific angle of incidence that results in the maximum possible angle of refraction ($90^\circ$). It's the exact point where refraction ceases to be possible.
    $$ \text{At the critical angle } \theta_1 = \theta_c \text{, we have } \theta_2 = 90^\circ $$
4.  **The Derivation is Just Snell's Law at the Limit:** We start with the governing equation of refraction and plug in the limiting condition.
    $$
    \begin{align*}
    n_1 \sin\theta_1 &= n_2 \sin\theta_2 && \text{(Snell's Law)} \\
    n_1 \sin\theta_c &= n_2 \sin(90^\circ) && \text{(Substitute the critical angle condition)} \\
    n_1 \sin\theta_c &= n_2 (1) && \text{(Since } \sin(90^\circ) = 1 \text{)} \\
    \sin\theta_c &= \frac{n_2}{n_1} && \text{(Solve for } \sin\theta_c \text{)}
    \end{align*}
    $$

## Worked example
**Problem:** A laser beam originates inside a block of diamond ($n_1 = 2.42$) and strikes the boundary with the surrounding air ($n_2 = 1.00$). Calculate the critical angle. What happens if the beam strikes the boundary at an angle of incidence of $30^\circ$?

**Solution:**

1.  **Check the condition for TIR.**
    The light travels from diamond ($n_1 = 2.42$) to air ($n_2 = 1.00$). Since $n_1 > n_2$, total internal reflection is possible.
    *This step confirms we are allowed to proceed. If light were going from air to diamond, TIR would be impossible, and the concept of a critical angle wouldn't apply in the same way.*

2.  **Apply the critical angle formula.**
    We derived $\sin\theta_c = \frac{n_2}{n_1}$.
    $$ \sin\theta_c = \frac{1.00}{2.42} \approx 0.413 $$
    *This step directly uses the formula derived from first principles (Snell's Law at the limit).*

3.  **Solve for the angle $\theta_c$.**
    $$ \theta_c = \arcsin(0.413) \approx 24.4^\circ $$
    The critical angle for the diamond-air interface is $24.4^\circ$.
    *This is the final calculation to find the angle itself.*

4.  **Analyze the $30^\circ$ case.**
    The given angle of incidence is $\theta_1 = 30^\circ$. We compare this to the critical angle:
    $$ 30^\circ > 24.4^\circ \implies \theta_1 > \theta_c $$
    Since the angle of incidence is greater than the critical angle, the light will not refract into the air. It will undergo total internal reflection, reflecting off the boundary back into the diamond at an angle of reflection equal to the angle of incidence ($30^\circ$).
    *This final step interprets the result. The critical angle is a threshold, and our incident angle is beyond it, triggering TIR.*

## Diagrams

**Case 1: Refraction ($\theta_1 < \theta_c$)**
The light ray bends away from the normal as it enters the less dense medium.
```text
      Medium 2 (less dense, n2)
      ^ Normal
      |     /
      |    /  <-- Refracted ray (theta_2)
------+------------------ Boundary
      |  /
(n1)  | / <-- Incident ray (theta_1)
      |/
      *
Medium 1 (denser, n1)
```

**Case 2: Critical Angle ($\theta_1 = \theta_c$)**
The refracted ray skims along the boundary at $90^\circ$ to the normal.
```text
      Medium 2 (less dense, n2)
      ^ Normal
      |
      +----------------> Refracted ray (theta_2 = 90)
------+------------------ Boundary
      |    /
(n1)  |   / <-- Incident ray (theta_1 = theta_c)
      |  /
      | /
      *
Medium 1 (denser, n1)
```

**Case 3: Total Internal Reflection ($\theta_1 > \theta_c$)**
No light enters medium 2. The ray reflects as if from a perfect mirror.
```text
      Medium 2 (less dense, n2)
      ^ Normal
      |
      |
------+------------------ Boundary
   \  |  /
    \ | /
     \|/  <-- Incident & Reflected rays
      *
Medium 1 (denser, n1)
```

## Memory technique — remember this forever
1.  **Visual Hook:** Picture a submarine underwater (dense medium) looking up. It can only see the outside world through a circular "window" on the surface directly above it. The edge of this circle is defined by the critical angle. Anything outside that circle is just a reflection of the ocean floor. **TIR is seeing the floor when you look up.**

2.  **Must-know formulas:**
    *   Snell's Law: $n_1 \sin\theta_1 = n_2 \sin\theta_2$
    *   Critical Angle: $\sin\theta_c = \frac{n_2}{n_1}$ (where $n_1 > n_2$)

3.  **Spaced Repetition Schedule:**
    *   Now: Re-derive the critical angle formula from Snell's Law without looking.
    *   1 day: Do it again.
    *   3 days: Do it again.
    *   7 days: Solve a problem.
    *   16 days: Re-derive.
    *   35 days: Re-derive and solve a problem.

4.  **First Principles Pathway:** If you forget the formula for $\theta_c$, don't panic. Rebuild it.
    *   Start with Snell's Law: $n_1 \sin\theta_1 = n_2 \sin\theta_2$.
    *   State the definition: "The critical angle is the angle of incidence $\theta_1$ that produces a refracted angle $\theta_2$ of exactly $90^\circ$."
    *   Substitute: $n_1 \sin\theta_c = n_2 \sin(90^\circ)$.
    *   Simplify: $n_1 \sin\theta_c = n_2(1)$.
    *   Isolate: $\sin\theta_c = \frac{n_2}{n_1}$. You have just re-derived it.

## Common mistakes
1.  **Inverting the refractive indices.** The formula is $\sin\theta_c = n_2/n_1$. Since $\sin\theta$ cannot be greater than 1, you know that the numerator must be the smaller index ($n_{less\_dense}$) and the denominator must be the larger index ($n_{denser}$). If your calculator gives you a domain error, you probably flipped them.
2.  **Applying the concept in the wrong direction.** TIR only happens when going from dense to less dense ($n_1 > n_2$). A light ray going from air into water can never experience TIR.
3.  **Angle confusion.** Always measure angles with respect to the normal line, not the surface. A question might state "the light ray makes an angle of $70^\circ$ with the surface"; this means the angle of incidence is $90^\circ - 70^\circ = 20^\circ$.

## Self-check
1.  Calculate the critical angle for light traveling from water ($n=1.33$) into ice ($n=1.31$).
2.  A point source of light is located 2 meters below the surface of a large pool of a transparent liquid with refractive index $n=1.8$. What is the radius of the largest circle on the surface through which light can emerge?
3.  You are given a 45-45-90 prism made of glass with refractive index $n_g$. A light ray enters one of the short faces of the prism perpendicular to the surface. What is the minimum value of $n_g$ required for the ray to be totally internally reflected at the hypotenuse, assuming the prism is in air ($n_{air}=1.0$)?