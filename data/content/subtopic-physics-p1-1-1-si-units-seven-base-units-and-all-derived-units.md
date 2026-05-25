## What it is
The International System of Units (SI) is the modern form of the metric system, providing a universal, standardized language for measurement in science and technology. It is built upon seven base units, each corresponding to a fundamental physical quantity, from which all other derived units are constructed through multiplication and division.

## Why it matters
In aerospace, a unit error can lead to catastrophic failure, like the Mars Climate Orbiter loss, which resulted from a mix-up between metric and imperial units. In physics, the fundamental constants are expressed in SI units, and all theoretical models must be dimensionally consistent. In computer science, especially in robotics and simulations, sensor data and physical models rely on a consistent unit system to interact with the real world correctly.

## When to study it
This is the absolute foundation. Before you can analyze motion, forces, or energy, you must be fluent in the language used to measure them. The only prerequisite is basic algebra—specifically, manipulating variables and exponents. If you are not comfortable with rules like $x^a \cdot x^b = x^{a+b}$, review that first.

## How to study it (step by step)
1.  **Memorize the Seven Base Units.** Write down the seven base quantities and their corresponding SI units and symbols. Don't just read them; write them from memory until you can do it perfectly.
2.  **Derive Force.** Take the defining equation for force, Newton's second law: $F = ma$. Substitute the base units for mass ($kg$) and acceleration ($m/s^2$). Write out the resulting derived unit for the Newton ($N$).
3.  **Derive Energy and Power.** First, use the equation for work, $W = Fd$ (Work = Force $\times$ distance), to derive the units for the Joule ($J$). Then, use the equation for power, $P = W/t$ (Power = Work / time), to derive the units for the Watt ($W$). Notice how derived units build upon each other.
4.  **Practice Dimensional Analysis.** Take a physics equation you know, like the one for kinetic energy, $E_k = \frac{1}{2}mv^2$. Write it out using only SI units instead of variables: $[J] = [kg] \cdot ([m]/[s])^2$. Verify that the left and right sides are equivalent. The brackets $[...]$ denote "the units of...".
5.  **Connect to Constants.** Briefly research how one of the base units is defined via a fundamental constant. For example, the meter is defined by fixing the speed of light $c$ to be exactly $299,792,458 \, m/s$. This anchors the unit to a universal, unchanging property of nature.

## Key ideas, with intuition
1.  **Base units are the alphabet; derived units are the words.** You cannot describe complex ideas without words, and you cannot form words without letters. Similarly, you cannot describe complex physical quantities like pressure or momentum without derived units, which are themselves built from the seven fundamental base units.
2.  **Equations must be dimensionally homogeneous.** This is a fancy way of saying "you can't add apples and oranges." Every term in a valid physical equation must have the same units. If you have an equation $A = B + C$, the units of $A$, $B$, and $C$ must be identical. This is your most powerful tool for catching errors.
    $$
    \text{Distance} = \text{Initial Velocity} \times \text{Time} + \frac{1}{2} \times \text{Acceleration} \times \text{Time}^2
    $$
    $$
    [m] = \left[\frac{m}{s}\right] \cdot [s] + \left[\frac{m}{s^2}\right] \cdot [s]^2
    $$
    $$
    [m] = [m] + [m] \quad (\text{This works.})
    $$
3.  **Units are part of the calculation.** Treat units as algebraic variables. They can be multiplied, divided, and cancelled. This practice, known as dimensional analysis, not only prevents errors but can help you derive equations from scratch. If you know a quantity depends on mass, length, and time, you can often find the relationship by figuring out how to combine their units to get the desired result.

## Worked example
A Falcon 9 first stage has a dry mass of approximately $m = 25,000 \, \text{kg}$ and travels at a velocity of $v = 2,300 \, \text{m/s}$ at stage separation. Calculate its kinetic energy and express the result in both Joules and base SI units.

**Step 1: State the formula.**
The formula for kinetic energy is:
$$
E_k = \frac{1}{2}mv^2
$$

**Step 2: Substitute the values with their units.**
Always carry the units through the calculation. This is non-negotiable.
$$
E_k = \frac{1}{2} (25,000 \, \text{kg}) \left(2,300 \, \frac{\text{m}}{\text{s}}\right)^2
$$

**Step 3: Perform the arithmetic.**
$$
E_k = \frac{1}{2} (25,000 \, \text{kg}) \left(5,290,000 \, \frac{\text{m}^2}{\text{s}^2}\right)
$$
$$
E_k = 66,125,000,000 \, \text{kg} \cdot \frac{\text{m}^2}{\text{s}^2}
$$
$$
E_k = 6.6125 \times 10^{10} \, \text{kg} \cdot \text{m}^2 \cdot \text{s}^{-2}
$$

**Step 4: Express in derived units (Joules).**
The Joule ($J$) is the unit of energy. By definition, $1 \, J = 1 \, \text{kg} \cdot \text{m}^2 \cdot \text{s}^{-2}$.
$$
E_k = 6.6125 \times 10^{10} \, J
$$
This is often expressed as $66.125$ Gigajoules ($GJ$).

**Reflection:**
- Step 1 worked because we identified the correct physical principle.
- Step 2 worked because we included units with our numbers, treating them as inseparable.
- Step 3 worked by applying algebra to both the numbers and the units. The units combined to form $\text{kg} \cdot \text{m}^2 \cdot \text{s}^{-2}$.
- Step 4 worked because we recognized this combination of base units as the definition of the derived unit for energy, the Joule.

## Diagrams
This diagram shows how three common derived units are constructed from three of the base units.

```text
       Base Units
      +-----------+
      |           |
  [kg] (mass)   [m] (length)   [s] (time)
      |           |              |
      |           |______________|
      |                  |
      |           [m/s] (velocity)
      |                  |
      |           [m/s²] (acceleration)
      |                  |
      |__________________|
                 |
  +--------------------------------+
  | F = m * a                      |
  | [N] = [kg] * [m/s²]            |--> Force (Newton)
  +--------------------------------+
                 |
                 | uses Force
                 V
  +--------------------------------+
  | W = F * d                      |
  | [J] = [N] * [m]                |--> Energy (Joule)
  |     = [kg*m/s²] * [m]          |
  +--------------------------------+
                 |
                 | uses Energy
                 V
  +--------------------------------+
  | P = W / t                      |
  | [W] = [J] / [s]                |--> Power (Watt)
  |     = [kg*m²/s²] / [s]         |
  +--------------------------------+
```

## Memory technique — remember this forever
1.  **Mnemonic for the 7 base units:** "So Many Kings Are Cuddling Lovely Moles."
    - **S**econd (time), **M**eter (length), **K**ilogram (mass), **A**mpere (electric current), **C**andela (luminous intensity), **K**elvin (temperature), **M**ole (amount of substance). Note: I used 'K' for Kelvin since it's more common in physics than Candela. Let's refine: "Some Mighty King Always Commands Loyal Men". Second, Meter, Kilogram, Ampere, Candela, Kelvin, Mole. Pick one and burn it in.

2.  **Must overlearn:**
    *   The 7 base quantities and their SI units (from the mnemonic).
    *   Newton: $1 \, N = 1 \, \text{kg} \cdot \text{m} \cdot \text{s}^{-2}$
    *   Joule: $1 \, J = 1 \, N \cdot \text{m} = 1 \, \text{kg} \cdot \text{m}^2 \cdot \text{s}^{-2}$
    *   Watt: $1 \, W = 1 \, J/s = 1 \, \text{kg} \cdot \text{m}^2 \cdot \text{s}^{-3}$

3.  **Spaced repetition schedule:** Review these facts and re-derive the units for N, J, and W at these intervals: 24 hours, 3 days, 7 days, 16 days, 35 days. Do not skip this.

4.  **First principles pathway:** If you forget the base unit composition of a derived unit (e.g., the Pascal for pressure), rebuild it from a defining equation.
    *   Pressure is Force per unit Area: $P = F/A$.
    *   Units of Force are Newtons: $[N]$. Units of Area are square meters: $[m^2]$.
    *   So, $[Pa] = [N]/[m^2]$.
    *   You already memorized the Newton: $[N] = [kg \cdot m \cdot s^{-2}]$.
    *   Substitute it in: $[Pa] = \frac{[kg \cdot m \cdot s^{-2}]}{[m^2]} = [kg \cdot m^{-1} \cdot s^{-2}]$. You can rebuild any derived unit this way.

## Common mistakes
1.  **Using grams instead of kilograms.** The 'k' in 'kg' is the only prefix that is part of a base unit. All calculations involving mass in physics formulas (like $F=ma$ or $E_k = \frac{1}{2}mv^2$) require kilograms.
2.  **Confusing Mass and Weight.** Mass is the amount of matter, measured in kilograms ($kg$). Weight is the force of gravity on that mass, measured in Newtons ($N$). An object has the same mass on Earth and the Moon, but different weights.
3.  **Ignoring Prefixes in Calculation.** When a problem gives you a value like $520 \, \text{nm}$ (nanometers) or $25 \, \text{ms}$ (milliseconds), you *must* convert it to base units ($520 \times 10^{-9} \, \text{m}$ or $25 \times 10^{-3} \, \text{s}$) before substituting into a formula.

## Self-check
1.  The unit of pressure is the Pascal ($Pa$), defined as one Newton per square meter. Express the Pascal in terms of the base SI units ($kg$, $m$, $s$).
2.  A rocket engine produces a thrust (force) of $2.2 \, \text{MN}$ (meganewtons) and has an exhaust velocity of $4.1 \, \text{km/s}$. The simplified rocket equation states that Thrust = (mass flow rate) $\times$ (exhaust velocity). Calculate the mass flow rate and ensure your final answer has units of $kg/s$.
3.  The universal gravitational constant is $G \approx 6.674 \times 10^{-11} \, \text{m}^3 \cdot \text{kg}^{-1} \cdot \text{s}^{-2}$. Newton's law of universal gravitation is $F = G \frac{m_1 m_2}{r^2}$. Use this equation to prove that the units given for $G$ are correct.