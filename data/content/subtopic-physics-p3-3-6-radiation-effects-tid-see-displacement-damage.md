## What it is
Space radiation degrades spacecraft electronics and materials through three distinct physical mechanisms. **Total Ionizing Dose (TID)** is the long-term, cumulative buildup of trapped electrical charge in insulating layers caused by ionizing radiation. **Single Event Effects (SEE)** are instantaneous glitches or catastrophic shorts caused by a single high-energy particle striking a sensitive microchip node. **Displacement Damage (DD)** occurs when particles physically collide with atoms in a semiconductor crystal, knocking them out of place and permanently shattering the lattice structure.

## Why it matters
If you do not account for these effects, your spacecraft will die in orbit. TID slowly shifts the operating voltages of transistors until the flight computer fails to boot. SEE causes bit-flips in memory (crashing software) or latch-ups (creating a dead short that burns out power rails). Displacement damage degrades the minority carrier lifetime in semiconductors, which is the primary reason solar array efficiency drops steadily over a mission's lifetime. Understanding this is non-negotiable for avionics design, satellite systems engineering, and deep-space mission planning.

## When to study it
Do not attempt this until you have mastered:
1. **Basic Semiconductor Physics:** You must understand p-n junctions, MOSFET operation (gate oxide, threshold voltage), and bandgaps. 
2. **Atomic Physics:** Ionization energy and particle scattering.
3. **Orbital Mechanics (Basic):** You should know what the Van Allen radiation belts are and how Earth's magnetic field traps particles.

If you do not know why a gate voltage turns on a MOSFET, go back to solid-state physics.

## How to study it (step by step)
1. **Map the environment:** Define the sources—Galactic Cosmic Rays (heavy ions, SEE), Solar Particle Events (protons, TID/SEE/DD), and Trapped Belts (electrons/protons, TID/DD).
2. **Trace TID physics:** Study how radiation generates electron-hole pairs in $SiO_2$. Understand why electrons escape but holes get trapped, creating a phantom gate voltage.
3. **Trace SEE physics:** Learn the concept of Linear Energy Transfer (LET). Understand how an ion track creates a cylinder of plasma that can flip a memory bit if the deposited charge exceeds the node's critical charge ($Q_{crit}$).
4. **Categorize SEE:** Memorize the difference between "soft" errors (Single Event Upset - SEU, Single Event Transient - SET) which can be fixed by a reboot, and "hard" errors (Single Event Latch-up - SEL, Single Event Burnout - SEB) which destroy the hardware.
5. **Trace DD physics:** Study Non-Ionizing Energy Loss (NIEL). Understand Frenkel defects (vacancies and interstitials) and how they act as recombination centers, killing solar cell efficiency.

## Key ideas, with intuition

**1. Total Ionizing Dose (TID) — The Phantom Voltage**
Radiation deposits energy into the gate oxide ($SiO_2$) of a MOSFET, creating electron-hole pairs. Electrons are highly mobile and are quickly swept out by the electric field. Holes are heavy and slow; they get trapped in the oxide defects. This trapped positive charge ($\Delta Q_{ot}$) alters the electric field, shifting the threshold voltage ($V_{th}$) required to turn the transistor on.
$$ \Delta V_{th} = -\frac{\Delta Q_{ot}}{C_{ox}} $$
*Intuition:* TID is like plaque building up in an artery. It happens slowly, but eventually, the signal can't get through.

**2. Single Event Effects (SEE) — The Charge Dump**
A heavy ion punches through a sensitive junction. The rate at which it loses energy is its Linear Energy Transfer (LET), typically measured in $\text{MeV} \cdot \text{cm}^2 / \text{mg}$. If the charge deposited ($Q_{dep}$) in the sensitive volume is greater than the critical charge ($Q_{crit}$) holding the bit state, the bit flips (0 becomes 1).
*Intuition:* SEE is a sniper bullet. It is an instantaneous, localized strike.

**3. Displacement Damage (DD) — The Wrecking Ball**
Instead of ionizing atoms (stripping electrons), a heavy particle (like a neutron or proton) collides directly with the nucleus of a silicon atom, knocking it out of the crystal lattice. This creates a trap in the middle of the bandgap. Electrons fall into these traps and recombine with holes before they can do useful work.
*Intuition:* DD is structural damage. It physically shatters the perfect crystal highway, causing traffic jams (recombination) for charge carriers.

## Worked example
**Problem:** A heavy ion with an LET of $20 \text{ MeV} \cdot \text{cm}^2/\text{mg}$ strikes a silicon memory node. The sensitive depletion depth is $L = 2 \mu\text{m}$. The critical charge of the node is $Q_{crit} = 0.5 \text{ pC}$. Will this strike cause a Single Event Upset (SEU)? 
*(Note: Density of Si $\rho = 2.33 \text{ g/cm}^3$. It takes $3.6 \text{ eV}$ to create one electron-hole pair in Si. Elementary charge $e = 1.6 \times 10^{-19} \text{ C}$.)*

**Step 1: Calculate the energy deposited in the sensitive volume.**
The LET is normalized by density. We find the energy loss per unit length ($dE/dx$) by multiplying by the density of Silicon:
$$ \frac{dE}{dx} = \text{LET} \times \rho = \left(20 \frac{\text{MeV} \cdot \text{cm}^2}{\text{mg}}\right) \times \left(2330 \frac{\text{mg}}{\text{cm}^3}\right) = 46,600 \frac{\text{MeV}}{\text{cm}} $$
Now, multiply by the depth $L = 2 \mu\text{m} = 2 \times 10^{-4} \text{ cm}$ to find total Energy ($E_{dep}$):
$$ E_{dep} = 46,600 \frac{\text{MeV}}{\text{cm}} \times (2 \times 10^{-4} \text{ cm}) = 9.32 \text{ MeV} = 9.32 \times 10^6 \text{ eV} $$
*Why it works:* LET tells us energy lost per path length per density. Multiplying by density and path length gives absolute energy dumped into that specific node.

**Step 2: Convert deposited energy to deposited charge ($Q_{dep}$).**
Divide by the energy required to make one pair ($3.6 \text{ eV}$), then multiply by the charge of one electron ($e$):
$$ Q_{dep} = \frac{E_{dep}}{3.6 \text{ eV}} \times e = \frac{9.32 \times 10^6 \text{ eV}}{3.6 \text{ eV}} \times (1.6 \times 10^{-19} \text{ C}) $$
$$ Q_{dep} = 2.58 \times 10^6 \text{ electrons} \times (1.6 \times 10^{-19} \text{ C}) = 4.14 \times 10^{-13} \text{ C} = 0.414 \text{ pC} $$
*Why it works:* Energy becomes charge carriers. Charge carriers become current.

**Step 3: Compare $Q_{dep}$ to $Q_{crit}$.**
$$ Q_{dep} (0.414 \text{ pC}) < Q_{crit} (0.5 \text{ pC}) $$
**Result:** The deposited charge is less than the critical charge. The node will *not* flip. No SEU occurs.

## Diagrams

```text
RADIATION EFFECTS ON A MOSFET

         TID (The Sunburn)                  SEE (The Sniper)
         Cumulative trapped charge          Instantaneous ion track
         
             Gate                                Gate
           +------+                            +------+
           |      |                            |      |
  ---------+------+---------          ---------+------+---------
  Oxide    | +  + | <- Trapped        Oxide    |      |   | Heavy Ion
  ---------+------+---------          ---------+------+---V-----
           |      |   Holes                    |      |   |  
  Source   |      |   Drain           Source   |      |   |  Drain
  [N+]     |      |   [N+]            [N+]     |      |  *|* [N+]
           |      |                            |      | * | * <- e-/h+
           |      |                            |      |*  |  *   plasma
  ==========================          ==========================
           P-Substrate                         P-Substrate
```

## Memory technique — remember this forever
1. **The Mnemonic Story:** 
   * **TID** is a **Sunburn**: It builds up slowly over time, you don't notice it immediately, but eventually, it ruins your day (voltage shifts).
   * **SEE** is a **Sniper**: A single, sudden bullet (heavy ion) that either grazes you (SEU/soft error) or kills you instantly (SEL/hard error).
   * **DD** is a **Wrecking Ball**: It doesn't just burn or pierce; it physically smashes the building's foundation (the crystal lattice), making the solar panels permanently inefficient.

2. **Formulas to overlearn:**
   * Dose Units: $1 \text{ Gy} = 100 \text{ rad} = 1 \text{ J/kg}$.
   * Charge Deposition: $Q_{dep} = \frac{\text{LET} \cdot \rho \cdot L \cdot e}{3.6 \text{ eV}}$ (for Silicon).

3. **Spaced-repetition schedule:** Review this concept at 1 day, 3 days, 7 days, 16 days, and 35 days.

4. **First principles pathway:** If you forget the SEE formula, follow the units. You need Charge (Coulombs). You are given LET (Energy * Area / Mass). Multiply by density (Mass / Volume) to get Energy / Length. Multiply by Length to get Energy. Divide by Energy/pair to get number of pairs. Multiply by fundamental charge (Coulombs/pair) to get Coulombs.

## Common mistakes
* **Assuming shielding fixes everything:** Aluminum shielding drastically reduces TID by stopping electrons. However, it can *worsen* SEE. High-energy Galactic Cosmic Rays hit the shield and shatter (spallation), creating a shotgun blast of secondary particles that hit the electronics.
* **Confusing TID and DD:** Both degrade performance over time. But TID damages the *insulators* (oxides) via trapped charge, while DD damages the *semiconductor bulk* (silicon lattice) via physical collisions.
* **Forgetting the density multiplier in LET:** LET is usually provided in $\text{MeV} \cdot \text{cm}^2/\text{mg}$. Students often multiply this directly by length, resulting in nonsense units. You *must* multiply by the material density first.

## Self-check
1. A satellite in a high-radiation orbit experiences a gradual decrease in power from its solar arrays over 5 years. Which of the three radiation effects is primarily responsible for this?
2. A heavy ion strikes a silicon node with a depth of $5 \mu\text{m}$. If the LET is $10 \text{ MeV} \cdot \text{cm}^2/\text{mg}$ and $\rho = 2.33 \text{ g/cm}^3$, calculate the energy deposited in MeV.
3. As microchips shrink (Moore's Law), the gate oxide becomes thinner, but the node capacitance also becomes smaller. Explain conceptually why smaller transistors are generally *more* resistant to TID, but *less* resistant to SEE.