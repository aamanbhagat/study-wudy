## 1. The one-sentence answer
**The internal energy of an ideal gas equals (f/2)nRT because every quadratic term in the energy of each molecule contributes (1/2)kT per molecule on average, and an ideal gas has no potential energy.**

An ideal gas consists of point particles that never interact except through elastic collisions. Their only energy is therefore kinetic, and that kinetic energy is partitioned equally among the available quadratic degrees of freedom. Each such term—whether translational, rotational, or (at high temperature) vibrational—receives an average energy of (1/2)kT per molecule. Multiplying by the number of molecules and the number of degrees of freedom immediately yields the macroscopic expression U = (f/2)nRT.

Because pressure and volume enter the ideal-gas law only through the work term, the internal energy depends solely on temperature. This independence is what makes the first law of thermodynamics tractable for ideal gases and is the foundation for all subsequent calculations of heat capacities and adiabatic processes.

> [!NOTE]
> The factor f/2 is not arbitrary; it is exactly the number of independent quadratic terms in the Hamiltonian, so any change in f (for example when a diatomic gas begins to vibrate) produces an immediate, measurable jump in molar heat capacity.

## 2. Why this matters — concrete and current
In liquid-propellant rocket engines such as the RS-25, the combustion chamber contains a mixture of hot ideal gases whose internal energy sets both the chamber temperature and the maximum exhaust velocity; nozzle design codes therefore solve the energy equation using U = (f/2)nRT to obtain the correct stagnation enthalpy.

Semiconductor plasma etchers rely on the same relation to predict ion and electron energies inside low-pressure argon discharges; process engineers adjust RF power while holding f fixed at 3 for monatomic argon, thereby controlling etch rate without recalibrating the entire thermal model.

Climate models that treat the troposphere as an ideal-gas mixture use the temperature dependence of U to compute the dry adiabatic lapse rate; any error in f for water vapor (f = 6 at room temperature) propagates directly into forecasts of convective available potential energy.

High-altitude balloon experiments measuring cosmic-ray ionization employ the same formula to subtract the known internal-energy contribution of the residual helium atmosphere from the total heat deposited in the detector.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Ideal-gas law PV = nRT   | Supplies the macroscopic variables that U must be consistent with |
| Average translational KE = (3/2)kT | Provides the baseline for monatomic gases and the starting point for counting additional degrees of freedom |
| First law ΔU = Q − W     | Shows why a function of T alone simplifies all energy balances |
| Quadratic terms in energy | Identifies which molecular motions contribute to U        |

## 4. Building the idea — from intuition to formalism

### Step 1 — Molecules possess only kinetic energy
An ideal gas is defined so that intermolecular forces are zero except during instantaneous collisions; therefore potential energy is identically zero and every joule stored in the gas is kinetic.

A helium atom at 300 K moves at roughly 1.3 km s⁻¹; its kinetic energy is the entire internal energy of the sample.

$$U = \sum_i \frac12 m_i v_i^2$$

> [!WARNING]
> If you allow even a small attractive potential, U acquires a density dependence and the simple (f/2)nRT form collapses.

### Step 2 — Equipartition assigns (1/2)kT to each quadratic term
Classical statistical mechanics states that each quadratic term in the energy (p_x²/2m, L_x²/2I, …) receives an average energy (1/2)kT per molecule when the system is in thermal equilibrium.

For a single particle the three translational terms give (3/2)kT; adding two rotational terms for a dumbbell molecule raises the total to (5/2)kT.

$$ \langle \tfrac12 m v_x^2 \rangle = \tfrac12 kT $$

> [!WARNING]
> Equipartition fails at low temperature when quantum level spacing exceeds kT; the formula then overestimates U.

### Step 3 — Count the degrees of freedom f
f is the number of independent quadratic terms that are fully excited. Translation always contributes 3; linear molecules add 2 rotations; nonlinear molecules add 3; vibration adds 2 per mode when active.

At room temperature N₂ has f = 5; above ~1000 K vibration begins and f rises toward 7.

$$ f = 3 + f_\text{rot} + 2f_\text{vib (active)} $$

> [!WARNING]
> Miscounting rotations (for example treating CO₂ as nonlinear) produces the wrong heat-capacity ratio γ.

### Step 4 — Sum over all molecules
Multiply the average energy per molecule by N = nN_A to obtain the macroscopic internal energy.

$$ U = \frac f2 N kT = \frac f2 nRT $$

### Step 5 — Temperature is the sole independent variable
Because the right-hand side contains only T (and constants), U is independent of P or V; any process that changes only P or V at constant T leaves U unchanged.

## 5. Worked examples — every step shown

**Example 1 — Monatomic gas at fixed volume**  
*Given:* 2.0 mol argon (f = 3), T = 400 K.  
*Find:* U.  

U = (3/2) n R T  
= (3/2) × 2.0 mol × 8.314 J mol⁻¹ K⁻¹ × 400 K  
= 4988.4 J  

**Why** each factor appears: f/2 counts quadratic terms, n converts moles to molecules via R, T supplies the energy scale.

**Example 2 — Diatomic gas heated at constant pressure**  
*Given:* 1.5 mol O₂, ΔT = 50 K, f = 5.  
*Find:* ΔU.  

ΔU = (5/2) n R ΔT  
= (5/2) × 1.5 × 8.314 × 50 = 1558.875 J  

*Reflection:* Constant pressure does not affect ΔU for an ideal gas; only temperature matters.

**Example 3 — Change in degrees of freedom**  
*Given:* 0.8 mol CO₂ at 1500 K where vibration is active (f = 7).  
*Find:* U.  

U = (7/2) × 0.8 × 8.314 × 1500 = 34918.8 J  

*Reflection:* The jump from f = 5 to f = 7 increases U by 40 % at the same T.

**Example 4 — Mixture**  
*Given:* 1 mol He (f = 3) + 2 mol N₂ (f = 5), T = 300 K.  
*Find:* Total U.  

U_He = (3/2) × 1 × 8.314 × 300 = 3741.3 J  
U_N₂ = (5/2) × 2 × 8.314 × 300 = 12471 J  
U_total = 16212.3 J  

*Reflection:* Internal energies are additive; each species uses its own f.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using Cv instead of f/2     | Confusing molar heat capacity with energy formula | Remember U = (f/2)nRT while Cv = (f/2)R     |
| Forgetting vibrational contribution | Assuming f is always 5 for diatomics       | Check temperature against characteristic vibrational temperature |
| Treating U as function of P | Misreading first-law statements             | Verify that only T appears on the right-hand side |
| Applying formula to real gases at high density | Ignoring intermolecular potentials        | Restrict use to P ≪ critical pressure        |
| Using N instead of n        | Mixing molecules and moles                  | Always write nRT, never NkT unless k is explicit |
| Ignoring electronic excitation | Assuming only translation/rotation/vibration | Note that electronic levels usually lie far above kT at room temperature |
| Applying at T = 0           | Classical equipartition breaks down         | Switch to quantum statistics below ~10 K     |

## 7. The textbook-precise statement
For an ideal gas whose molecules have f fully excited quadratic degrees of freedom and whose interactions are negligible, the internal energy is exactly  
$$ U = \frac f2 n R T, $$  
where n is the amount of substance, R the gas constant, and T the absolute temperature. This follows from the equipartition theorem applied to the classical Hamiltonian (Feynman Lectures on Physics, Vol. I, §40-4).

## 8. Visual — diagram or schematic
```text
Energy per molecule
          ^
   (f=7)  |   vibrational (2)   ──────  (7/2)kT
          |   rotational (2)    ──────  (5/2)kT
   (f=5)  |   translational (3) ──────  (3/2)kT
          +----------------------------------> T
                0          300 K     1000 K
```
Each horizontal band represents an additional quadratic term that becomes active at higher temperature; the total height of the stack at any T equals the average energy per molecule.

## 9. The memory technique

1. **The hook** — Picture a molecule as a tiny dumbbell holding three tiny fans (translation) and two spinning wheels (rotation); each fan or wheel stores one “half-kT battery.”
2. **What to overlearn** — U = (f/2)nRT; Cv = fR/2; γ = 1 + 2/f.
3. **Spaced-repetition schedule** — 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from equipartition on each quadratic term, multiply by N, replace Nk by nR.

## 10. What this unlocks
This relation supplies the internal-energy term in the first law for every ideal-gas process and is required before adiabatic expansions, isentropic flow, and speed-of-sound derivations can be performed.

- Next: Mayer’s relation Cp − Cv = R
- Next: Adiabatic condition TV^{γ−1} = constant
- Next: Isentropic nozzle relations in rocket propulsion

## 11. Self-check — five questions, no answers
1. A monatomic gas and a diatomic gas have the same n and T. Which has larger U, and by what factor?
2. At what approximate temperature does the vibrational degree of freedom of N₂ begin to raise f above 5?
3. Derive the molar internal energy of a gas whose molecules are linear triatomic and fully vibrationally excited.
4. An ideal-gas sample is compressed isothermally. Does U change? Justify using the defining expression.
5. A mixture contains equal moles of He and CO₂ at 800 K. Compute the effective average f for the mixture if CO₂ vibration is active.