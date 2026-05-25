## What it is
Fracture mechanics studies how materials fail due to the propagation of microscopic flaws. The **stress intensity factor ($K$)** quantifies the severity of the stress field near the tip of a crack under a given remote load. **Fracture toughness ($K_{IC}$)** is the critical material property that dictates the maximum stress intensity the material can withstand before that crack violently and unstably propagates. 

## Why it matters
In aerospace, structures like rocket propellant tanks and aircraft fuselages are highly stressed and aggressively weight-optimized. Micro-cracks are inevitable due to manufacturing defects or cyclic fatigue. Traditional strength of materials (comparing stress to yield strength) will falsely predict these structures are safe. Fracture mechanics tells you exactly how large a flaw can be before a pressurized tank unzips catastrophically in flight.

## When to study it
You must already possess a rock-solid understanding of:
1. Linear Elastic Solid Mechanics (stress, strain, Young's Modulus $E$, Poisson's ratio $\nu$).
2. Yield criteria (Von Mises).
3. Thin-walled pressure vessel theory (hoop and longitudinal stress).
If you do not understand why hoop stress is $\sigma = \frac{pr}{t}$, return to basic statics and solid mechanics before proceeding.

## How to study it (step by step)
1. **Contrast $K_t$ and $K$:** Spend 20 minutes proving to yourself why a Stress Concentration Factor ($K_t$, dimensionless) for a macroscopic hole is fundamentally different from a Stress Intensity Factor ($K$, units of $\text{MPa}\sqrt{\text{m}}$) for a mathematically sharp crack.
2. **Analyze the Singularity:** Plot the function $\sigma(r) = \frac{1}{\sqrt{r}}$. Observe how stress approaches infinity as distance to the crack tip $r \to 0$. 
3. **Memorize the Fundamental Equation:** Learn $K_I = Y \sigma \sqrt{\pi a}$. Understand every term, especially the geometry factor $Y$ and the characteristic crack length $a$.
4. **Distinguish Plane Stress vs. Plane Strain:** Spend 30 minutes reading why thick materials (plane strain) are *more* brittle and have a lower, constant toughness ($K_{IC}$) compared to thin materials (plane stress). 
5. **Calculate Critical Flaw Sizes:** Solve 3-5 problems where you are given an operating stress and a material's $K_{IC}$, and you must find the maximum allowable crack size $a_c$.

## Key ideas, with intuition

**1. The Infinity Problem**
If you pull on a plate with a mathematically sharp crack, linear elasticity predicts the stress exactly at the crack tip is infinite. Specifically, the stress field ahead of the crack tip (at distance $r$ and angle $\theta$) is described by:
$$ \sigma_{ij}(r, \theta) = \frac{K}{\sqrt{2\pi r}} f_{ij}(\theta) $$
Because of the $\frac{1}{\sqrt{r}}$ term, as $r \to 0$, $\sigma \to \infty$. 

**2. The Stress Intensity Factor ($K$)**
Since the stress is theoretically infinite at the tip for *any* load, we cannot use maximum stress to predict failure. Instead, we look at the *numerator* of the singularity: $K$. $K$ acts as a "volume knob" for the infinite stress field. A higher $K$ means the $1/\sqrt{r}$ curve is shifted higher, affecting a larger volume of material. For a remote tensile stress $\sigma$ and a crack of length $a$:
$$ K_I = Y \sigma \sqrt{\pi a} $$
Where $Y$ is a dimensionless geometry factor (often $\approx 1$), and the subscript $I$ denotes "Mode I" (opening mode, where forces pull perpendicular to the crack).

**3. Fracture Toughness ($K_{IC}$)**
In reality, the material yields at the crack tip, blunting it and preventing true infinite stress. However, if the surrounding elastic stress field (dictated by $K_I$) is strong enough, it will tear the yielded zone apart. The critical value of $K_I$ that causes this is $K_{IC}$ (Mode I, Plane Strain Fracture Toughness). 
Failure occurs when:
$$ K_I \ge K_{IC} $$

## Worked example
**Problem:** A cylindrical titanium rocket motor case has a radius $R = 1.0\text{ m}$ and thickness $t = 5\text{ mm}$. It operates at an internal pressure $p = 3\text{ MPa}$. The titanium alloy has a yield strength $\sigma_y = 900\text{ MPa}$ and a fracture toughness $K_{IC} = 50\text{ MPa}\sqrt{\text{m}}$. Non-destructive evaluation (NDE) detects a longitudinal through-thickness crack of length $2a = 12\text{ mm}$. Assume $Y = 1$. Will the tank fail?

**Step 1: Calculate the remote stress.**
A longitudinal crack is pulled apart by hoop stress. 
$$ \sigma_{\text{hoop}} = \frac{pR}{t} = \frac{(3 \times 10^6\text{ Pa})(1.0\text{ m})}{0.005\text{ m}} = 600\text{ MPa} $$
*Reflection:* The hoop stress (600 MPa) is well below the yield strength (900 MPa). By traditional strength of materials, the tank is safe.

**Step 2: Identify the crack length parameter $a$.**
For an internal (through-thickness) crack of total length $12\text{ mm}$, the parameter $a$ is half the length.
$$ a = \frac{12\text{ mm}}{2} = 6\text{ mm} = 0.006\text{ m} $$
*Reflection:* Using $2a$ instead of $a$ is a fatal, common error. 

**Step 3: Calculate the Stress Intensity Factor $K_I$.**
$$ K_I = Y \sigma_{\text{hoop}} \sqrt{\pi a} $$
$$ K_I = (1) (600\text{ MPa}) \sqrt{\pi (0.006\text{ m})} $$
$$ K_I = 600 \times \sqrt{0.01885}\text{ MPa}\sqrt{\text{m}} \approx 600 \times 0.1373 \approx 82.4\text{ MPa}\sqrt{\text{m}} $$

**Step 4: Compare to Fracture Toughness.**
$$ K_I (82.4) > K_{IC} (50) $$
*Reflection:* The tank will violently rupture. Even though the bulk stress is safe, the micro-mechanics at the crack tip exceed the material's capacity to resist fracture.

## Diagrams

```text
MODE I FRACTURE (Opening Mode)

      Remote Stress (\sigma)
      ^^^^^^^^^^^^^^^^^^^^
      |  |  |  |  |  |  |
    -----------------------
    |                     |
    |                     |
----|==== crack           |
    | (length a)  *       |  --> x (distance r from tip)
    |            Tip      |
    -----------------------
      |  |  |  |  |  |  |
      vvvvvvvvvvvvvvvvvvvv
      Remote Stress (\sigma)

STRESS AHEAD OF CRACK TIP (y-axis = \sigma_y, x-axis = r)

\sigma_y
 ^
 |  |
 |  | \
 |  |  \ <--- \sigma_y = K_I / \sqrt{2 \pi r}
 |  |   \
 |  |    \
 |  |       \
 |  |          \___________________ \sigma (remote bulk stress)
 |  | Yield Zone |
 +--|------------|---------------------------------> r
   r=0          r_y
```

## Memory technique — remember this forever
1. **The Hook:** "$K$ is the **K**iller, $K_{IC}$ is the **C**apacity." $K$ is what you are doing to the part; $K_{IC}$ is what the part can take.
2. **The Formula:** Overlearn $K = Y \sigma \sqrt{\pi a}$. 
   *   Units check: Stress is MPa, $\sqrt{a}$ is $\sqrt{\text{m}}$. Result: $\text{MPa}\sqrt{\text{m}}$.
3. **Spaced Repetition:** Review the distinction between $a$ (edge crack) and $2a$ (internal crack) at 1, 3, 7, 16, and 35 days.
4. **First Principles Pathway:** If you forget the formula, derive it from Griffith's Energy Balance. The strain energy released by a growing crack is $G = \frac{\pi \sigma^2 a}{E}$. The relationship between energy release rate and stress intensity is $K^2 = E G$. Substitute $G$: $K^2 = E \left(\frac{\pi \sigma^2 a}{E}\right) = \pi \sigma^2 a$. Therefore, $K = \sigma \sqrt{\pi a}$.

## Common mistakes
* **Confusing $a$ and $2a$:** For an edge crack, the physical length is $a$. For a crack in the middle of a panel, the physical length is $2a$. The formula always uses $a$.
* **Ignoring the units:** $\text{MPa}\sqrt{\text{m}}$ is standard. If you use mm for crack length without converting to meters, your $K$ will be off by a factor of $\sqrt{1000} \approx 31.6$.
* **Confusing $K_t$ and $K_I$:** $K_t$ is a stress multiplier for a blunt geometry (like a circular hole, $K_t=3$). $K_I$ is the amplitude of a singularity for a sharp crack. You cannot use $K_t$ for cracks.

## Self-check
1. If you double the remote stress $\sigma$, by what factor does the stress intensity $K_I$ increase? If you double the crack length $a$, by what factor does $K_I$ increase?
2. A material has $K_{IC} = 40\text{ MPa}\sqrt{\text{m}}$. It is subjected to a stress of $200\text{ MPa}$. Assuming an edge crack ($Y=1.12$), calculate the critical crack length $a_c$ in millimeters.
3. Why does a thick plate have a lower fracture toughness ($K_{IC}$, plane strain) than a very thin sheet of the exact same material (plane stress)? Think about the constraint on the material in the yield zone at the crack tip.