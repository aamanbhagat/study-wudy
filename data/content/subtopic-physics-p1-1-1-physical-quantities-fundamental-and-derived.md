## What it is
A physical quantity is any property of a physical system that can be quantified by measurement. We split them into two types: **fundamental quantities**, which are the independent base set (like length or time), and **derived quantities**, which are constructed by combining fundamental quantities (like velocity, which is length divided by time).

## Why it matters
This isn't just academic bookkeeping; it's the foundation of **dimensional analysis**, a powerful tool for error-checking complex equations in physics and engineering. In rocket science, a dimensional check on your thrust or trajectory equations can catch catastrophic errors before they happen. For machine learning, ensuring your input features have consistent and correct dimensions can prevent a model from learning nonsensical relationships.

## When to study it
You should be comfortable with basic algebra, specifically manipulating symbolic expressions and exponents (e.g., knowing that $\frac{x}{y^2} = xy^{-2}$). No other prerequisites are needed. This is one of the very first building blocks of physics.

## How to study it (step by step)
1.  **Memorize the 7 SI Fundamental Quantities:** Write down the seven fundamental quantities (Mass, Length, Time, Temperature, Electric Current, Amount of Substance, Luminous Intensity) and their corresponding SI units (kilogram, meter, second, Kelvin, Ampere, mole, candela) and dimensional symbols ($M, L, T, \Theta, I, N, J$). Create flashcards.
2.  **Derive Velocity and Acceleration:** Start from the definitions $v = \frac{\Delta x}{\Delta t}$ and $a = \frac{\Delta v}{\Delta t}$. Use the dimensional symbols ($L, T$) to derive the dimensions of velocity ($[v]$) and acceleration ($[a]$). Do this on paper until it's automatic.
3.  **Derive Force and Energy:** Use Newton's second law, $F=ma$, to derive the dimensions of force, $[F]$. Then use the definition of work, $W=Fd$, to derive the dimensions of energy/work, $[W]$. These two are among the most important derived quantities.
4.  **Verify an Equation:** Take the kinematic equation $x_f = x_i + v_i t + \frac{1}{2}at^2$. Write down the dimensions for each term on both sides of the equation. Verify that they are all the same (i.e., the equation is dimensionally homogeneous). Note that the constant $\frac{1}{2}$ is dimensionless.
5.  **Find the Dimensions of a Constant:** Use Newton's Law of Universal Gravitation, $F = G \frac{m_1 m_2}{r^2}$. You already know the dimensions of $F$, $m$, and $r$ (which is a length). Algebraically solve for the dimensions of the gravitational constant, $[G]$.

## Key ideas, with intuition
*   **The Alphabet Analogy:** Think of the seven fundamental quantities ($M, L, T, ...$) as the letters of an alphabet. All other derived quantities (velocity, force, pressure, etc.) are the "words" we build from these letters. The rules of physics are the "grammar" that dictates how these words can form valid "sentences" (equations).
*   **Dimensions vs. Units:** This is a critical distinction. A **dimension** is the fundamental nature of the quantity. For example, the distance between two points has the dimension of Length, $[L]$. A **unit** is an arbitrary standard we use to measure that dimension. We could measure that length in meters (m), feet (ft), or light-years (ly). The unit changes, but the dimension $[L]$ does not.
    $$
    \text{distance} = 5 \text{ meters} \implies [\text{distance}] = L
    $$
*   **Dimensional Homogeneity:** A physical equation is only valid if the dimensions on both sides of the equals sign are identical. You cannot add a length to a time, just as you cannot add 5 meters to 10 seconds. This is a powerful sanity check.
    $$
    \text{If } A = B+C, \text{ then it must be that } [A] = [B] = [C].
    $$

## Worked example
Let's derive the dimensions of **Pressure** ($P$).

**1. Recall a defining equation for pressure.**
Pressure is defined as force per unit area.
$$
P = \frac{F}{A}
$$

**2. Express the dimensions of the equation.**
We want to find $[P]$, so we need $[F]$ and $[A]$.
$$
[P] = \frac{[F]}{[A]}
$$

**3. Determine the dimensions of the components.**
*   Area ($A$) is length times length, so its dimension is $[A] = L \cdot L = L^2$.
*   Force ($F$) is a derived quantity. We find its dimensions from Newton's second law, $F=ma$.
    *   Mass has dimension $[m] = M$.
    *   Acceleration ($a$) is change in velocity over time. Velocity is change in distance over time.
    $$
    [a] = \frac{[\text{velocity}]}{[\text{time}]} = \frac{[ \text{distance} / \text{time} ]}{[\text{time}]} = \frac{L/T}{T} = \frac{L}{T^2} = LT^{-2}
    $$
    *   Therefore, the dimensions of force are $[F] = [m][a] = M \cdot LT^{-2} = MLT^{-2}$.

**4. Substitute the component dimensions back into the pressure equation.**
$$
[P] = \frac{[F]}{[A]} = \frac{MLT^{-2}}{L^2}
$$

**5. Simplify the expression.**
Using the rules of exponents:
$$
[P] = ML^{1-2}T^{-2} = ML^{-1}T^{-2}
$$
The dimensions of pressure are Mass per Length per Time-Squared.

**Reflection:** Each step was a logical deduction. We started with a definition ($P=F/A$). We broke down the right-hand side into more fundamental components ($F=ma$, $A=L^2$) until we reached the base dimensions ($M, L, T$). The process is pure algebraic substitution.

## Diagrams
Here is a dependency tree showing how derived quantities are built from fundamental ones.

```text
      FUNDAMENTAL QUANTITIES
      +---------------------+
      | Mass (M)            |
      | Length (L)          |
      | Time (T)            |
      | ... (and 4 others)  |
      +---------------------+
                 |
                 | (Combine using multiplication/division)
                 V
      +---------------------+---------------------+
      |      LEVEL 1        |      LEVEL 2        |
      | DERIVED QUANTITIES  | DERIVED QUANTITIES  |
      +---------------------+---------------------+
      |                     |                     |
      | Velocity [v] = L/T  | Force [F] = M * [a] |
      |      = LT⁻¹         |    = M * LT⁻²       |
      |                     |    = MLT⁻²          |
      | Acceleration [a]    |                     |
      |      = [v]/T        | Work [W] = [F] * L  |
      |      = LT⁻²/T       |    = MLT⁻² * L      |
      |      = LT⁻²         |    = ML²T⁻²         |
      |                     |                     |
      | Area [A] = L²       | Pressure [P]=[F]/[A]|
      |                     |    = MLT⁻²/L²       |
      |                     |    = ML⁻¹T⁻²        |
      +---------------------+---------------------+
```

## Memory technique — remember this forever
1.  **Mnemonic:** The seven fundamental SI quantities are **L**ength, **M**ass, **T**ime, electric **C**urrent, **T**emperature, **A**mount of substance, **L**uminous intensity. Remember: "**L**ittle **M**en **T**ake **C**ool **T**hings **A**nd **L**eave".
2.  **Must overlearn:**
    *   Dimensions of Force: $[F] = MLT^{-2}$
    *   Dimensions of Energy/Work: $[W] = ML^2T^{-2}$
    These two appear in nearly every branch of physics. Burn them into your memory.
3.  **Spaced repetition:** Review your derivations of Force and Energy at these intervals: 1 day from now, 3 days from now, 7 days, 16 days, 35 days. After that, it will be permanent.
4.  **First principles pathway:** If you forget the dimensions of any quantity (e.g., Power), don't panic. Just ask, "What is an equation that defines it?" For Power, $P = \frac{W}{t}$ (Work over time). You already burned $[W]$ into memory. So, $[P] = \frac{[W]}{[t]} = \frac{ML^2T^{-2}}{T} = ML^2T^{-3}$. You can rebuild anything from a defining equation.

## Common mistakes
*   **Confusing Dimensions and Units:** Stating that the dimension of force is "Newtons". A Newton is a *unit*. The *dimension* is $MLT^{-2}$. A unit is how you measure; a dimension is what you are measuring.
*   **Forgetting Exponents:** When dealing with squared quantities like in kinetic energy ($E_k = \frac{1}{2}mv^2$), a common mistake is to write $[E_k] = M \cdot (LT^{-1})^2 = MLT^{-2}$. This is wrong. The exponent distributes: $[E_k] = M \cdot (L^2T^{-2}) = ML^2T^{-2}$.
*   **Giving Dimensions to Pure Numbers:** The $\frac{1}{2}$ in $E_k = \frac{1}{2}mv^2$ or the $2\pi$ in the period of a pendulum $T = 2\pi\sqrt{L/g}$ are dimensionless. They are scaling factors and have no physical dimension. Do not include them in your analysis.

## Self-check
1.  Momentum ($p$) is defined as mass times velocity, $p=mv$. What are the dimensions of momentum?
2.  The pressure ($P$) in a fluid can be calculated by $P = \rho g h$, where $\rho$ is density (mass/volume), $g$ is the acceleration due to gravity, and $h$ is the height of the fluid. Verify that this equation is dimensionally consistent.
3.  The escape velocity from a planet is given by $v_e = \sqrt{\frac{2GM}{r}}$, where $G$ is the universal gravitational constant, $M$ is the mass of the planet, and $r$ is its radius. Use this equation to derive the dimensions of $G$.