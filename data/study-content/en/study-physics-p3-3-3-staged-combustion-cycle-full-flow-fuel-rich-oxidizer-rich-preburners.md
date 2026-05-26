## 1. The one-sentence answer
**The full-flow staged combustion cycle routes every molecule of both fuel and oxidizer through dedicated preburners—one fuel-rich and one oxidizer-rich—before they reach the main chamber, extracting maximum work from the propellants to drive the turbopumps while still achieving complete combustion.**

In ordinary staged combustion only a fraction of one propellant passes through a preburner; the remainder enters the chamber directly. Full flow changes the accounting: the fuel turbopump is powered exclusively by a fuel-rich preburner and the oxidizer turbopump by an oxidizer-rich preburner. Both streams, now at elevated pressure and temperature, then mix and burn completely in the main chamber. The result is higher chamber pressure for a given turbopump power and the elimination of any propellant that bypasses the turbines entirely.

Because both preburners run at mixture ratios far from stoichiometric, their turbine-exit temperatures remain tolerable for metallic blades while still delivering the necessary power. The architecture therefore solves the classic trade-off between pump power and thermal limits without discarding any propellant overboard.

> [!NOTE]
> The decisive advantage appears only when both preburners exist: each turbine receives the entire mass flow of its propellant, so the same shaft power can be produced at lower pressure ratios and lower temperatures than in any partial-flow cycle.

## 2. Why this matters — concrete and current
SpaceX’s Raptor engine family on Starship uses exactly this cycle; both methane and oxygen pass through separate preburners before the main 330-bar chamber, enabling the high thrust-to-weight and reusability targets of the vehicle.

NASA’s former Integrated Powerhead Demonstrator program and current Reusable Launch Vehicle studies adopted full-flow staged combustion to reach chamber pressures above 300 bar while keeping turbine temperatures below 1 000 K, numbers unattainable with gas-generator or simple staged-combustion cycles.

Russian RD-270 and the later proposed RD-701 derivatives explored oxidizer-rich preburners in the 1960s–70s; modern Chinese YF-215 and Japanese LE-9 follow-on concepts explicitly cite the same full-flow layout to close the performance gap with U.S. and European engines.

The cycle appears in recent academic propulsion papers (e.g., AIAA 2022-4123) that quantify a 5–8 % specific-impulse gain over equivalent gas-generator engines at the same propellant combination, directly affecting payload fractions on lunar and Mars trajectories.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                                                 |
|--------------------------------|--------------------------------------------------------------------------------------|
| Turbopump power balance        | Preburner gas must supply exactly the power absorbed by the pumps; energy equations close the cycle. |
| Mixture ratio and stoichiometry| Fuel-rich and oxidizer-rich states are defined relative to the stoichiometric ratio; temperature limits follow directly. |
| Simple staged-combustion cycle | Full-flow is an extension; understanding the partial-flow version reveals what changes when both streams pass through turbines. |
| Isentropic pump and turbine relations | Efficiency definitions and temperature–pressure relations are required for the worked examples. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Separate the two propellant streams
Every propellant molecule must eventually reach the main chamber, yet each must first pass through its own turbine.  
Example: in a LOX/LCH4 engine the oxygen line is routed through an oxidizer-rich preburner while the methane line is routed through a fuel-rich preburner.  
Formally the mass-flow continuity statements are  
$$
\dot{m}_{\text{O}_2,\text{total}} = \dot{m}_{\text{O}_2,\text{pb}} \qquad \dot{m}_{\text{CH}_4,\text{total}} = \dot{m}_{\text{CH}_4,\text{pb}}.
$$  
> [!WARNING] Treating the two preburners as a single mixed-gas generator destroys the temperature advantage that allows metallic turbines.

### Step 2 — Drive each turbopump with its own preburner
The oxidizer pump is powered only by the oxidizer-rich preburner gas; the fuel pump only by the fuel-rich preburner gas.  
Power balance for the oxidizer side:  
$$
\dot{m}_{\text{O}_2} c_p (T_{\text{ox,pb}} - T_{\text{ox,post}}) \eta_t = \dot{m}_{\text{O}_2} \frac{\Delta p_{\text{pump}}}{\rho \eta_p}.
$$  
> [!WARNING] Cross-coupling the turbines (fuel preburner driving oxidizer pump) re-introduces the mixture-ratio constraints that full flow was designed to remove.

### Step 3 — Keep both preburners far from stoichiometric
Fuel-rich preburner runs at O/F ≪ stoichiometric; oxidizer-rich at O/F ≫ stoichiometric. Turbine inlet temperatures therefore stay below 1 000 K while pressure is still raised.  
The two mixture ratios are independent control variables.

### Step 4 — Recombine the streams in the main injector
Preburner effluents, now at high pressure, enter the main injector together with any trim flow. Combustion in the main chamber occurs at the overall mission mixture ratio.

### Step 5 — Close the cycle with chamber pressure as the figure of merit
The net result is expressed by the relation between delivered chamber pressure \(p_c\) and the available preburner pressure ratio. The textbook statement appears in Step 8.

## 5. Worked examples — every step shown

**Example 1 — Verify mass continuity**  
*Given:* Total oxygen flow 100 kg/s, total methane flow 33 kg/s.  
*Find:* Preburner flows.  
Both preburners receive the entire propellant; therefore  
\[
\dot{m}_{\text{O}_2,\text{pb}} = 100\,\text{kg/s}, \quad \dot{m}_{\text{CH}_4,\text{pb}} = 33\,\text{kg/s}.
\]  
*Why* — mass conservation requires every kilogram to pass the turbines.  
**Final answer**  
\(\dot{m}_{\text{O}_2,\text{pb}} = 100\,\text{kg/s}\), \(\dot{m}_{\text{CH}_4,\text{pb}} = 33\,\text{kg/s}\).  

*Reflection* — the numbers are identical to the totals; any deviation would imply a bypass the cycle forbids.

**Example 2 — Oxidizer-side power balance**  
*Given:* Pump \(\Delta p = 400\) bar, \(\rho_{\text{LOX}} = 1140\) kg m^{-3}, \(\eta_p = 0.75\), \(\eta_t = 0.85\), \(c_p = 1\,200\) J kg^{-1} K^{-1}.  
*Find:* Required turbine temperature drop.  
Pump power per unit mass:  
\[
\frac{\Delta p}{\rho\eta_p} = \frac{4\times10^7}{1140\times0.75} = 46\,783\,\text{J kg}^{-1}.
\]  
*Why* — definition of hydraulic power.  
Turbine work equality:  
\[
c_p\Delta T\eta_t = 46\,783 \implies \Delta T = \frac{46\,783}{1\,200\times0.85} = 46.3\,\text{K}.
\]  
**Final answer**  
\(\Delta T_t = 46.3\) K.  

*Reflection* — modest temperature drop suffices because the entire oxygen flow participates.

**Example 3 — Mixture-ratio choice for temperature limit**  
*Given:* Oxidizer-rich preburner must stay below 950 K.  
*Find:* Allowable O/F.  
Using CEA equilibrium tables (standard procedure), O/F > 80 yields \(T < 950\) K at 300 bar.  
**Final answer**  
O/F \(\ge 80\).  

*Reflection* — the extreme ratio is acceptable only because all oxygen later mixes with fuel in the main chamber.

**Example 4 — Net chamber-pressure gain versus gas-generator cycle**  
*Given:* Same turbopump efficiencies, same propellant.  
*Find:* Ratio of achievable \(p_c\).  
Full-flow staged combustion retains 100 % of propellant mass through turbines; gas-generator discards ~3 %. The resulting pressure ratio scales directly with mass flow, producing ~7 % higher \(p_c\) at identical turbine inlet temperature.  
**Final answer**  
\(p_{c,\text{FF}} / p_{c,\text{GG}} \approx 1.07\).  

*Reflection* — the gain originates solely from the extra turbine mass flow.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming both preburners run at the same mixture ratio | Visual symmetry misleads | Keep two independent O/F variables until the main chamber. |
| Forgetting that preburner effluent still contains unburned propellant | Treating preburners as complete combustors | Track elemental mass fractions through each station. |
| Using a single turbine efficiency for both preburners | Different gas compositions | Apply separate \(\eta_t\) values derived from each gas’s \(\gamma\). |
| Neglecting pump cavitation margin when pressures rise | Higher \(p_c\) implies higher pump discharge | Recalculate NPSH after cycle closure. |
| Drawing the oxidizer-rich preburner downstream of the fuel preburner | Incorrect plumbing intuition | Maintain parallel, independent preburner legs. |
| Expecting stoichiometric main-chamber ignition | Preburner products are already hot | Verify ignition still requires separate igniters or torch. |
| Confusing full-flow with oxygen-rich staged combustion only | Historical naming overlap | Explicitly confirm both preburners exist and both flows are total. |

## 7. The textbook-precise statement
A full-flow staged-combustion cycle exists when the propellant delivery system satisfies  
\[
\dot{m}_f = \dot{m}_{f,\text{pb}}, \quad \dot{m}_o = \dot{m}_{o,\text{pb}}
\]  
with separate preburners whose effluents recombine only in the main injector at overall mixture ratio \(r = \dot{m}_o / \dot{m}_f\). Turbine power balances close independently for each pump. (Sutton & Biblarz, *Rocket Propulsion Elements*, 9e, §6.6, “Full-Flow Staged Combustion Cycle”.)

## 8. Visual — diagram or schematic
```text
Fuel tank ──► Fuel pump ──► Fuel-rich preburner ──►
                                         │
Ox tank  ──► Ox pump   ──► Ox-rich preburner   ──► Main injector ──► Chamber/Nozzle
                                         │
                              (both streams mix here)
```
Labelled stations: preburner exits at 800–950 K, 300–400 bar; main chamber at 3 500 K, 300 bar.

## 9. The memory technique
1. **The hook** — picture two separate fireplaces (preburners), one burning almost pure wood (fuel-rich), one almost pure oxygen (oxidizer-rich); both chimneys feed the same furnace (main chamber) so nothing is wasted.  
2. **What to overlearn** — \(\dot{m}_{f,\text{total}} = \dot{m}_{f,\text{pb}}\) and \(\dot{m}_{o,\text{total}} = \dot{m}_{o,\text{pb}}\); each preburner O/F is chosen solely for turbine temperature.  
3. **Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — start from mass continuity, write two independent power balances, enforce main-chamber stoichiometry only at the injector.

## 10. What this unlocks
Mastery of the full-flow cycle supplies the thermodynamic foundation for the next layer of propulsion analysis: variable-mixture-ratio throttling, deep-throttling turbopump maps, and closed-loop engine control. These in turn enable the study of reusable booster trajectories, Mars ascent vehicle sizing, and the integration of full-flow engines with electric pump feed systems.

## 11. Self-check — five questions, no answers
1. Why does the full-flow cycle permit higher chamber pressure than a gas-generator cycle at the same turbine temperature?  
2. Derive the required preburner temperature drop if the oxidizer pump must deliver 500 bar and the turbine efficiency is 0.80.  
3. In a LOX/LCH4 full-flow engine the fuel-rich preburner runs at O/F = 0.3. What is the resulting main-chamber mixture ratio if no trim flows exist?  
4. Identify the single station in the cycle where the two propellant streams first reach the overall mission mixture ratio.  
5. A proposed design routes 5 % of the oxygen around the oxidizer-rich preburner; does this configuration still qualify as full-flow staged combustion? Explain the violation.