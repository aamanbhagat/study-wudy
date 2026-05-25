## What it is
An airfoil is the two-dimensional cross-sectional shape of a wing, blade (propeller, rotor, or turbine), or fin. Its aerodynamic performance is primarily defined by three key geometric parameters: its **chord**, a straight line connecting its front and back ends; its **thickness**, the distance between its upper and lower surfaces; and its **camber**, the curvature of its median line.

## Why it matters
These three parameters are the fundamental design variables that determine an airfoil's lift, drag, and stability characteristics. In aerospace engineering, you will manipulate camber, chord, and thickness to design wings for specific missions, whether it's maximizing lift for a cargo plane, minimizing drag for a supersonic fighter, or ensuring gentle stall characteristics for a trainer aircraft. Understanding this geometry is the first step to predicting and controlling aerodynamic forces.

## When to study it
You should have a solid grasp of basic 2D coordinate geometry (defining lines and curves) and introductory fluid dynamics concepts, specifically pressure, velocity, and the qualitative form of Bernoulli's principle (where velocity is high, pressure is low). This topic is a gateway to quantitative aerodynamics; without these geometric fundamentals, analyzing pressure distributions and forces is impossible.

## How to study it (step by step)
1.  **Draw and Label:** On paper, sketch a generic airfoil shape. Identify the foremost point as the **Leading Edge (LE)** and the rearmost point as the **Trailing Edge (TE)**.
2.  **Define the Chord:** Draw a straight line connecting the LE and the TE. This is the **chord line**. The length of this line is the **chord**, denoted by $c$. This line is the primary reference for all other measurements.
3.  **Define the Camber:** Sketch a curve that is exactly halfway between the upper and lower surfaces of the airfoil. This is the **mean camber line**. For a symmetrical airfoil, the mean camber line is identical to the chord line.
4.  **Quantify Camber and Thickness:** The maximum distance between the chord line and the mean camber line is the **maximum camber**, often expressed as a percentage of the chord length (e.g., 2%c). The distance between the upper and lower surfaces (measured perpendicular to the chord line) is the **thickness**, and its maximum value is also expressed as a percentage of chord (e.g., 12%c).
5.  **Connect to a Standard:** Research the "NACA 4-Digit Series" of airfoils. Understand how the 4-digit code (e.g., NACA 2412) directly specifies the maximum camber, the location of maximum camber, and the maximum thickness as percentages of the chord. This bridges the gap from abstract geometry to a real-world engineering classification system.
6.  **Solve a "Decoding" Problem:** Find the specifications for a NACA 4415 airfoil. Calculate the maximum camber, its location, and the maximum thickness in absolute units for a wing with a 2-meter chord. This forces you to apply the definitions.

## Key ideas, with intuition
1.  **Chord Line as the Reference:** The chord line is the ruler against which everything else is measured. The angle between the chord line and the oncoming airflow is the **angle of attack**, $\alpha$, the most critical variable in determining lift. Think of the chord line as the airfoil's "attitude" relative to the wind.

2.  **Camber as the "Pre-Set" Lift Generator:** Camber is asymmetry. A cambered airfoil has a more curved upper surface than its lower surface. This forces the air flowing over the top to travel a longer path, and thus a higher average velocity, than the air below. By Bernoulli's principle, this creates a pressure difference ($P_{lower} > P_{upper}$), resulting in a net upward force (lift), even when the chord line is parallel to the airflow ($\alpha=0$).
    $$L'(\alpha=0) \propto \text{Camber}$$
    where $L'$ is the lift per unit span. A symmetrical airfoil (zero camber) must be pitched at a positive angle of attack to generate lift.

3.  **Thickness for Structure and Stall:** Thickness provides the volume needed for internal structural support (spars and ribs). Aerodynamically, increasing thickness tends to increase the maximum lift an airfoil can produce before it stalls. However, it also increases drag, particularly at high speeds where compressibility effects (shock waves) become an issue. The shape of the thickness distribution, especially near the leading edge, strongly influences how abruptly the airfoil stalls. A fatter, rounder leading edge typically leads to a more gentle, predictable stall.

## Worked example
**Problem:** Decode the properties of a NACA 2412 airfoil. If a wing section using this airfoil has a chord length $c = 1.5$ meters, what are the maximum camber, location of maximum camber, and maximum thickness in meters?

**Solution:**
The NACA 4-digit series is defined as NACA MPXX.
-   **M:** The first digit is the maximum camber in percent of chord.
-   **P:** The second digit is the position of the maximum camber from the leading edge in tenths of the chord.
-   **XX:** The last two digits are the maximum thickness in percent of chord.

**Step 1: Decode the designation.**
For NACA 2412:
-   M = 2
-   P = 4
-   XX = 12

**Step 2: Interpret the decoded values.**
-   Maximum camber, $m = M\% \times c = 2\%$ of the chord length.
-   Position of max camber, $p = P \times 10\% \times c = 40\%$ of the chord length from the LE.
-   Maximum thickness, $t_{max} = XX\% \times c = 12\%$ of the chord length.

**Step 3: Calculate the absolute dimensions for $c = 1.5$ m.**
-   Maximum camber: $m = 0.02 \times 1.5 \, \text{m} = 0.03 \, \text{m}$ (or 3 cm).
-   Position of max camber: $p = 0.40 \times 1.5 \, \text{m} = 0.60 \, \text{m}$ (or 60 cm from the leading edge).
-   Maximum thickness: $t_{max} = 0.12 \times 1.5 \, \text{m} = 0.18 \, \text{m}$ (or 18 cm).

**Reflection:** This systematic decoding process shows how a simple four-digit number can concisely communicate the three most critical geometric properties of an airfoil. Each digit has a precise meaning tied directly back to the definitions of camber, chord, and thickness, allowing engineers to quickly understand the shape and infer the likely performance of an airfoil.

## Diagrams
A generic cambered airfoil with its key geometric parameters labeled.

```text
      Upper Surface
       /------------------\
      /                    \    .
     /                      \   . t(x) = thickness at x
    /                        \  .
   <--------------------------> Mean Camber Line
LE . . . . . . . . . . . . . . TE
   <--------------------------> Chord Line (length c)
    \                        /
     \                      /
      \                    /
       \------------------/
      Lower Surface

      ^
      | m = max camber
      |
   <----p---->
   (location of max camber)
```

Comparison of a symmetrical vs. a cambered airfoil.

```text
Symmetrical Airfoil (e.g., NACA 0012):
- Mean Camber Line IS the Chord Line
- Zero lift at zero angle of attack

       /------\
      /        \
LE <------------> TE
      \        /
       \------/

Cambered Airfoil (e.g., NACA 2412):
- Mean Camber Line is curved above the Chord Line
- Produces lift at zero angle of attack

       /--------\
      /          \
LE <--------------> TE
      \---------/
```

## Memory technique — remember this forever
1.  **The "Banana Wing" Story:**
    Imagine a simple, straight stick. That's your **chord line**. Now, bend the stick slightly, like a banana. The amount of bend is the **camber**. The flesh of the banana that you add around the bent stick is the **thickness**. A symmetrical airfoil is just a stick with flesh, no bend. A high-performance glider wing is a slightly bent stick (low camber) with very little flesh (thin).

2.  **Must Overlearn:**
    *   **NACA MPXX:** **M**ax camber (%), **P**osition of camber (tenths), **XX** thickness (%).
    *   **Camber $\rightarrow$ Lift at $\alpha=0$**.
    *   **Thickness $\rightarrow$ Strength & Stall behavior**.

3.  **Spaced Repetition Schedule:**
    Review these definitions and the NACA decoding process in 1 day, 3 days, 7 days, 16 days, and 35 days. Spend 5 minutes each time re-deriving the properties of a random NACA 4-digit airfoil.

4.  **First Principles Pathway:**
    If you forget everything, draw a wing cross-section. The simplest possible line to define its length is the straight line from the front tip to the back tip: the **chord**. The average shape is the line down the middle: the **mean camber line**. The "fatness" is the distance from top to bottom: the **thickness**. These are pure geometric definitions that you can always reconstruct visually.

## Common mistakes
1.  **Confusing Chord Line and Mean Camber Line:** For a cambered airfoil, they are different. The chord is *always* a straight line. The mean camber line is (usually) a curve. Angle of attack is measured from the chord line.
2.  **Incorrect Measurement Axis:** Camber and thickness are, by convention, measured perpendicular to the *chord line*, not the mean camber line.
3.  **Units in NACA Designation:** Forgetting that M and XX are percentages ($/100$) and P is in tenths ($/10$). A common error is saying the max camber of a NACA 2412 is "2" instead of "2% of the chord".
4.  **Assuming More Camber/Thickness is Always Better:** These are design trade-offs. More camber increases lift but also produces a strong twisting force (pitching moment) and more drag. More thickness adds strength but increases drag, especially at high speeds.

## Self-check
1.  Describe the geometric properties of a NACA 0015 airfoil. What is a key aerodynamic characteristic of this airfoil at zero angle of attack?
2.  Sketch, on the same chord line, a NACA 4212 and a NACA 2412 airfoil. Which one would likely produce a stronger pitching moment, and why?
3.  An airfoil for a radio-controlled aircraft has a chord of 30 cm. Its maximum thickness is 3.6 cm. Its maximum camber is 1.2 cm, located 9 cm from the leading edge. What is its NACA 4-digit designation?