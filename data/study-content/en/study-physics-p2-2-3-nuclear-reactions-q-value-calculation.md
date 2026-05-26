## 1. The one-sentence answer
**The Q-value of a nuclear reaction is the difference between the total rest-mass energy of the initial nuclei and the total rest-mass energy of the final nuclei, expressed through E = mc².**

This quantity tells you whether a reaction can occur spontaneously and how much kinetic energy will appear (or must be supplied) after the reaction. Positive Q means mass is converted into kinetic energy of the products; negative Q means the reaction requires an energy input at least equal to |Q| to proceed. The calculation rests only on precise atomic or nuclear masses and the speed of light; no knowledge of the reaction mechanism itself is needed for the energy balance.

In practice you look up the masses of the participating species in atomic mass units, convert the mass defect into mega-electron-volts, and obtain a single number that governs kinematics, cross-section thresholds, and energy release in reactors or stars.

> [!NOTE]
> The sign of Q alone decides whether a reaction is exoergic or endoergic; its magnitude sets the minimum bombarding energy required for endoergic cases once momentum conservation is taken into account.

## 2. Why this matters — concrete and current
ITER’s deuterium-tritium fusion experiments rely on the Q-value of the reaction ²H + ³H → ⁴He + n (+17.6 MeV) to predict the 14.1 MeV neutron energy that must be captured in the tritium-breeding blanket.

NASA’s Nuclear Thermal Propulsion designs for Mars missions use the Q-value of uranium fission fragments to size the propellant heating chamber, directly affecting specific impulse figures published in the 2023 NASA NTP reference mission report.

The Borexino solar neutrino experiment compares measured neutrino fluxes against the Q-values of the pp-chain reactions (especially ³He + ³He → ⁴He + 2p, Q = 12.86 MeV) to constrain the Sun’s core temperature profile.

Radioisotope thermoelectric generators on Voyager and Perseverance convert the 5.5 MeV alpha-decay Q-value of ²³⁸Pu into electrical power; the 87.7-year half-life and Q-value together fix the fuel mass needed for a 14-year outer-planet cruise.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Rest energy E = mc²      | Converts measured mass defects directly into energy       |
| Conservation of energy and momentum | Determines kinematic thresholds for endoergic reactions   |
| Atomic versus nuclear mass | Avoids electron-mass cancellation errors in tabulated data |
| Unified atomic mass unit (u) and MeV/c² conversion | Provides the practical numerical bridge from mass tables to energy |

## 4. Building the idea — from intuition to formalism

### Step 1 — Rest energy of a free particle
A particle at rest still possesses energy equal to its rest mass times c².  
Example: an isolated proton has rest energy 938.272 MeV.  
$$E_0 = m c^2$$  
> [!WARNING]  
> Using atomic masses instead of nuclear masses without correcting for electrons will produce an error of several MeV in reactions that change proton number.

### Step 2 — Total rest energy before and after a reaction
Write the reaction a + b → c + d. The initial total rest energy is (m_a + m_b)c²; the final total is (m_c + m_d)c².  
Example: ¹⁴N(α,p)¹⁷O uses masses of ¹⁴N, ⁴He, ¹H, and ¹⁷O.  
$$E_{\text{initial}} = (m_a + m_b)c^2, \quad E_{\text{final}} = (m_c + m_d)c^2$$  
> [!WARNING]  
> Omitting the projectile’s rest mass when it is at rest in the lab frame leads to an incorrect sign for Q.

### Step 3 — Definition of the Q-value
Subtract the final from the initial rest energy.  
$$Q = (m_a + m_b - m_c - m_d)c^2$$  
A positive result means kinetic energy is released; a negative result means kinetic energy must be supplied.

### Step 4 — Conversion to convenient units
Express masses in u and multiply by the conversion factor 931.494 MeV/u.  
$$Q\,(\text{MeV}) = 931.494 \times \Delta m\,(\text{u})$$  
> [!WARNING]  
> Using 931 instead of 931.494 introduces a systematic 0.05 % error that matters for precision cross-section work.

### Step 5 — Kinematic threshold for endoergic reactions
For negative Q, the minimum lab kinetic energy of the projectile is  
$$E_{\text{th}} = -Q\left(1 + \frac{m_a}{m_b}\right)$$  
where m_a is projectile mass and m_b is target mass. This follows from simultaneous conservation of energy and momentum in the center-of-mass frame.

### Step 6 — Textbook statement of the result
The Q-value is therefore the invariant mass difference expressed in energy units; it fixes both the energy release and the kinematic threshold of any two-body nuclear reaction.

## 5. Worked examples — every step shown

**Example 1 — Simple exoergic capture**  
*Given:* ¹H + ²H → ³He + γ, masses 1.007825 u, 2.014102 u, 3.016029 u.  
*Find:* Q.  
Mass defect: Δm = 1.007825 + 2.014102 − 3.016029 = 0.005898 u.  
Q = 931.494 × 0.005898 = 5.494 MeV.  
**5.494 MeV**  
*Reflection:* The photon carries the entire Q because the ³He recoil is negligible; the arithmetic is direct once masses are aligned.

**Example 2 — Endoergic reaction with threshold**  
*Given:* ¹⁴N(α,p)¹⁷O, masses 14.003074 u, 4.002603 u, 1.007825 u, 16.999132 u.  
*Find:* Q and lab threshold for α on stationary ¹⁴N.  
Δm = 14.003074 + 4.002603 − 1.007825 − 16.999132 = −1.00128 u.  
Q = 931.494 × (−1.00128) = −932.7 keV.  
E_th = 0.9327 × (1 + 4/14) = 1.20 MeV.  
**Q = −0.933 MeV, E_th = 1.20 MeV**  
*Reflection:* The extra factor (1 + m_α/m_N) arises purely from momentum conservation; forgetting it underestimates the required accelerator energy.

**Example 3 — Fission fragment energy release**  
*Given:* ²³⁵U + n → ¹⁴¹Ba + ⁹²Kr + 3n, masses 235.043930 u, 1.008665 u, 140.914411 u, 91.926156 u.  
*Find:* Total Q.  
Δm = 236.052595 − (140.914411 + 91.926156 + 3.025995) = 0.186033 u.  
Q = 931.494 × 0.186033 = 173.3 MeV.  
**173.3 MeV**  
*Reflection:* The three neutrons must be included on the product side; their masses matter at the 0.1 MeV level.

**Example 4 — Branching ratio implication**  
*Given:* ³He + ⁴He → ⁷Be + γ (Q = 1.586 MeV) versus ³He + ⁴He → ⁷Be + e⁺ + e⁻ (Q = −0.327 MeV).  
*Find:* Which channel is open at stellar temperatures ~15 MK.  
Only the radiative channel has positive Q and is therefore allowed; the pair-production channel is closed.  
**Only radiative capture proceeds**  
*Reflection:* Sign of Q immediately eliminates entire classes of reactions without needing cross-section data.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using atomic masses without electron correction | Tables list atomic not nuclear masses       | Add or subtract electron masses explicitly when Z changes |
| Reporting Q in u instead of MeV   | Forgetting the conversion factor            | Always multiply by 931.494 immediately       |
| Ignoring the kinematic threshold factor | Treating threshold as simply |Q|           | Apply (1 + m_projectile/m_target) for endoergic cases |
| Sign error in mass defect         | Subtracting initial from final              | Consistently compute (initial − final)       |
| Neglecting neutron mass in fission | Counting only heavy fragments               | Include every product species listed in the reaction equation |
| Confusing Q with binding energy per nucleon | Both involve mass defects                   | Remember Q is for the specific reaction, not per nucleon |
| Using rest masses at relativistic energies | Non-relativistic intuition carries over     | Verify that total energy includes kinetic terms before subtracting |

## 7. The textbook-precise statement
For a reaction a + b → c + d the Q-value is defined as  
$$Q = (m_a + m_b - m_c - m_d)c^2$$  
where the masses are the rest masses of the participating nuclei (or atoms, with electron masses balanced). When Q > 0 the reaction is exoergic; when Q < 0 it is endoergic and the laboratory threshold energy of the projectile is  
$$E_{\text{th}} = -Q\left(1 + \frac{m_a}{m_b}\right)$$  
provided the target is at rest. (Krane, *Introductory Nuclear Physics*, 1988, §14.2.)

## 8. Visual — diagram or schematic
```text
Lab frame (target at rest)
  projectile (m_a, E_lab) ────────►  target (m_b)
               │
               ▼  reaction
          products c, d with total KE = Q + E_lab (if Q>0)

Center-of-mass frame
  Both approach along line of impact; total momentum = 0
  After reaction, products fly back-to-back with KE_cm = Q + E_cm
```
The diagram shows the lab-to-CM transformation that produces the threshold factor (1 + m_a/m_b).

## 9. The memory technique
1. **The hook** — Picture a nuclear “balance scale” where mass on the left pan disappears and the right pan drops, releasing energy proportional to the missing weight; the scale reading is Q.  
2. **What to overlearn** — Q = Δm × 931.494 MeV/u; E_th = −Q(1 + m_a/m_b) for Q < 0; always compute initial minus final masses.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.  
4. **First-principles fallback** — Re-derive from E_initial = E_final using only conservation of four-momentum; the invariant mass difference is Q/c².

## 10. What this unlocks
Mastery of Q-value calculation lets you predict energy release and thresholds for any two-body nuclear process and feeds directly into reactor design, stellar modeling, and radiation-transport codes.  

- Compound-nucleus level densities and Hauser-Feshbach theory  
- Kinematic reconstruction in nuclear spectroscopy  
- Cross-section threshold laws and Coulomb-barrier penetration  
- Energy balance in fusion propulsion and fission fragment rockets  

## 11. Self-check — five questions, no answers
1. Calculate Q for ⁷Li(p,n)⁷Be using the atomic masses 7.016004 u, 1.007825 u, 1.008665 u, 7.016929 u.  
2. An endoergic reaction has Q = −2.37 MeV. What is the minimum proton energy on a stationary ¹²C target?  
3. Why does the Q-value of β⁻ decay depend on atomic rather than nuclear masses?  
4. In a fission event releasing 195 MeV, what fraction of Q appears as kinetic energy of the two fragments versus neutrons and γ-rays?  
5. A proposed reaction has Q = +0.12 MeV yet is never observed at low energy. Identify the conservation law most likely violated.