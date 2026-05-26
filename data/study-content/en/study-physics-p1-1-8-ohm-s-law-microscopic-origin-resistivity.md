## 1. The one-sentence answer
**Ohm’s law at the microscopic scale states that the current density \(\mathbf{J}\) inside a conductor is proportional to the applied electric field \(\mathbf{E}\), with the proportionality constant set by the material’s conductivity \(\sigma = ne^2\tau/m\), where resistivity \(\rho=1/\sigma\) encodes the scattering that limits electron motion.**

Electrons in a metal are not at rest; they move at high Fermi speeds yet produce no net current until an electric field is applied. The field exerts a steady force between random collisions with the ionic lattice, giving each electron a small average “drift” velocity opposite the field. When this drift velocity is multiplied by the number density of electrons and their charge, the resulting current density turns out to be linear in \(\mathbf{E}\).

The linearity survives only because the time between collisions—the relaxation time \(\tau\)—is independent of the field strength for ordinary laboratory fields. Any process that changes \(\tau\) (temperature, impurities, lattice vibrations) therefore changes the resistivity.

> [!NOTE]
> The single deepest insight is that resistivity is not a property of individual electrons but of the *average time* between momentum-destroying collisions; change that time and you change the material’s resistance without altering charge or mass.

## 2. Why this matters — concrete and current
In the design of high-current bus bars for Starship’s avionics bays, SpaceX engineers must predict resistive heating to within a few percent; the microscopic formula lets them compute how impurity scattering in copper alloys raises \(\rho\) at cryogenic temperatures and thereby sets the required cross-section.

Semiconductor foundries such as TSMC use the same relation when modeling interconnect resistance in 3 nm nodes: electron–phonon scattering sets \(\tau\), which sets \(\rho\) of the cobalt or ruthenium liners, which in turn limits RC delay and therefore clock frequency.

Planetary magnetospheres generate currents whose microscopic resistivity controls magnetic diffusion; measurements from the Juno mission at Jupiter rely on laboratory values of \(\rho(T)\) for metallic hydrogen to decide whether the observed field can be maintained by dynamo action.

Superconducting transition-edge sensors in CMB telescopes (SPT-3G, Simons Observatory) operate precisely at the point where \(\tau\) diverges; any microscopic understanding of residual resistivity from defects is required to keep Johnson noise below the photon-noise floor.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Electric field \(\mathbf{E}\) and force \(q\mathbf{E}\) | Supplies the steady acceleration between collisions       |
| Number density \(n\) and charge \(e\) | Converts single-electron drift into macroscopic current   |
| Momentum and average value | Drift velocity is an ensemble average, not an instantaneous speed |
| Mean free time \(\tau\) | Encodes all scattering physics that ultimately sets \(\rho\) |

## 4. Building the idea — from intuition to formalism

### Step 1 — Macroscopic observation
A steady voltage across a wire produces a steady current. The ratio \(V/I\) is constant for a given specimen at fixed temperature. This is the empirical starting point.

### Step 2 — Current as charge transport
Current \(I\) is the amount of charge crossing a surface per unit time. For a wire of cross-section \(A\) carrying electrons of density \(n\) drifting at speed \(v_d\), the current is \(I = neAv_d\).  
$$I=neAv_d$$  
> [!WARNING]
> Treating \(v_d\) as the Fermi speed instead of the tiny field-induced drift velocity leads to currents many orders of magnitude too large.

### Step 3 — Force between collisions
Between collisions an electron feels constant force \(-e\mathbf{E}\). Starting from rest after a collision, its speed grows linearly with time: \(v(t)=- (eE/m)t\). The longest an electron can accelerate is the mean time \(\tau\) to the next collision.

### Step 4 — Averaging over many electrons
Electrons collide at random times, so the average velocity (drift velocity) is the time average of \(v(t)\) over one relaxation interval:  
$$v_d=-\frac{eE}{m}\tau.$$  
(The negative sign shows direction opposite the field for electrons.)

### Step 5 — Current density
Substitute the drift velocity into the expression for current and divide by area:  
$$J=ne v_d=-\frac{ne^2\tau}{m}E.$$  
Define conductivity \(\sigma=ne^2\tau/m\) so that \(\mathbf{J}=\sigma\mathbf{E}\).

### Step 6 — Resistivity and Ohm’s law
The reciprocal of conductivity is resistivity:  
$$\rho=\frac{m}{ne^2\tau}.$$  
In a uniform wire, \(\mathbf{E}=V/L\) and \(I=JA\), recovering the familiar \(V=IR\) with \(R=\rho L/A\).

### Step 7 — Microscopic content of resistivity
Everything that affects scattering—temperature (phonons), impurities, defects—enters only through \(\tau\). This is the microscopic origin of Ohm’s law and of material-specific resistivity.

## 5. Worked examples — every step shown

**Example 1 — Drift speed in copper**  
*Given:* \(n=8.5\times10^{28}\) m\(^{-3}\), \(\tau=2.5\times10^{-14}\) s, \(E=0.1\) V m\(^{-1}\).  
*Find:* \(v_d\).  
Step 1: Write \(v_d=-eE\tau/m\).  
*Why:* Direct result of constant acceleration averaged over \(\tau\).  
Step 2: Insert numbers (\(e=1.6\times10^{-19}\) C, \(m=9.1\times10^{-31}\) kg).  
*Why:* Converts microscopic parameters into observable speed.  
**\(v_d\approx-4.4\times10^{-4}\) m s\(^{-1}\)**  

*Reflection:* The result is only a few tenths of a millimetre per second; the enormous Fermi speed is invisible to net current.

**Example 2 — Conductivity of silver**  
*Given:* \(n=5.86\times10^{28}\) m\(^{-3}\), \(\tau=4\times10^{-14}\) s.  
*Find:* \(\sigma\).  
Step 1: \(\sigma=ne^2\tau/m\).  
*Why:* Definition after averaging collisions.  
Step 2: Evaluate.  
*Why:* Yields SI unit siemens per metre.  
**\(\sigma=6.3\times10^7\) S m\(^{-1}\)**  

*Reflection:* Matches tabulated values; the formula therefore already contains the measured resistivity.

**Example 3 — Temperature rise of a wire**  
*Given:* Copper wire, \(R=0.1\) Ω, \(I=10\) A for 60 s, mass 5 g, specific heat 385 J kg\(^{-1}\) K\(^{-1}\).  
*Find:* Temperature increase (neglect heat loss).  
Step 1: Energy dissipated = \(I^2Rt\).  
*Why:* Joule heating follows from \(J=\sigma E\).  
Step 2: \(\Delta T=\frac{I^2Rt}{mc}\).  
*Why:* Converts electrical work into thermal energy.  
**\(\Delta T\approx31\) K**  

*Reflection:* Resistivity itself rises with \(T\), so the calculation is only approximate.

**Example 4 — Mean free path**  
*Given:* \(\tau=2.5\times10^{-14}\) s, Fermi speed \(v_F=1.6\times10^6\) m s\(^{-1}\).  
*Find:* \(\ell=v_F\tau\).  
Step 1: Multiply.  
*Why:* Distance travelled between collisions at the actual random speed.  
**\(\ell\approx40\) nm**  

*Reflection:* Only tens of atomic spacings; hence even tiny impurity concentrations matter.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using Fermi speed instead of drift speed for \(v_d\) | Fermi speed is the random thermal motion; drift is the tiny net addition | Always derive \(v_d\) from \(eE\tau/m\) |
| Forgetting the negative sign on electron drift | Charge \(q=-e\) is easy to drop | Keep the charge symbol until the final current direction is stated |
| Treating \(\tau\) as constant with temperature | Phonon population grows with \(T\) | Remember \(\rho(T)\) data before assuming constant \(\sigma\) |
| Confusing resistivity with resistance | Resistance also depends on geometry | Write \(R=\rho L/A\) explicitly each time |
| Applying the formula to semiconductors without checking carrier density | Both electrons and holes contribute and \(n\) is not fixed | Use the two-carrier expression or verify extrinsic regime first |
| Ignoring quantum statistics | Pauli exclusion limits which electrons can scatter | Note that the simple Drude model still works numerically because only electrons near \(E_F\) participate |
| Setting \(E=0\) inside a perfect conductor | Superconductors have \(\tau\to\infty\), not \(E=0\) in the normal sense | Distinguish normal metals from superconductors |

## 7. The textbook-precise statement
In a classical Drude metal the current density satisfies  
$$\mathbf{J}=\frac{ne^2\tau}{m}\mathbf{E}$$  
provided the electric field is weak enough that \(\tau\) remains field-independent and the distribution function deviates only linearly from equilibrium. Resistivity is then  
$$\rho=\frac{m}{ne^2\tau}.$$  
(See Ashcroft & Mermin, *Solid State Physics*, Ch. 1, Eq. 1.12.)

## 8. Visual — diagram or schematic
```text
E →→→→→→→→→→→→→→→→→→ (field direction)
e⁻  •   •   •   •   •   •   •   •   •   •
      \   \   \   \   \   \   \   \   \
       drift velocity v_d (very small, leftward)

Each zig-zag segment represents free acceleration for average time τ;
length of segment ≈ v_F τ (mean free path). Lattice ions shown as +.
```
The diagram shows electrons (dots) repeatedly accelerated by \(\mathbf{E}\) then scattered; the net leftward drift accumulates over many collisions.

## 9. The memory technique

1. **The hook** — Picture a pinball machine where the ball is constantly smacked by bumpers (ions) but gravity (the field) slowly pulls it downhill; the average downhill speed is set only by how long the ball flies between bumper hits.
2. **What to overlearn** — \(v_d=-eE\tau/m\), \(J=\sigma E\), \(\rho=m/ne^2\tau\).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive drift velocity from Newton’s law averaged over one \(\tau\), then insert into \(J=ne v_d\).

## 10. What this unlocks
This microscopic picture is the foundation for every subsequent transport calculation in solids.

- Temperature dependence of resistivity via Matthiessen’s rule  
- Hall effect and magnetoresistance  
- Wiedemann–Franz law linking thermal and electrical conductivity  
- Electron–phonon scattering rates in metals used for rocket combustion-chamber liners  
- Boltzmann transport equation in advanced device modelling

## 11. Self-check — five questions, no answers
1. A copper wire and an aluminium wire have identical length and resistance. Which carries the larger current density under the same voltage?  
2. If impurity concentration doubles and halves \(\tau\), by what factor does resistivity change at room temperature?  
3. Show that the power dissipated per unit volume is \(\mathbf{J}\cdot\mathbf{E}\).  
4. Why does the simple Drude formula give the correct room-temperature resistivity of copper even though it ignores quantum statistics?  
5. A sudden step in electric field is applied to a metal. Sketch the time evolution of current density for \(t\ll\tau\) and \(t\gg\tau\).