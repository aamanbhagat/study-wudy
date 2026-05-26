## 1. The one-sentence answer
**The first law for open systems equates the time rate of change of energy stored within a control volume to the sum of heat addition, work extraction, and the net energy transported across its boundaries by mass flow.**

A closed system exchanges only heat and work; its energy balance is simply \(\Delta E = Q - W\). Flow problems require tracking fluid that crosses an imaginary surface, carrying its own internal energy, flow work, kinetic energy, and potential energy. The open-system statement therefore augments the closed-system balance with explicit inlet and outlet fluxes expressed through mass-flow-weighted enthalpies.

The resulting equation is written for an arbitrary control volume and reduces, under steady one-dimensional flow, to the familiar relation \(h + \frac{V^2}{2} + gz = \text{constant}\) between any two stations when heat and shaft work are absent.

> [!NOTE]
> The single conceptual leap is that “flow work” \(p v\) is already embedded inside the enthalpy that multiplies every mass-flow term; forgetting this double-counts pressure forces at the ports.

## 2. Why this matters — concrete and current
SpaceX’s Raptor engine uses the steady-flow energy equation to predict the enthalpy drop across its fuel and oxidizer turbopumps; the same relation supplies the chamber stagnation temperature that sets the maximum specific impulse.

In the compressor test rigs at NASA Glenn, unsteady inlet distortion is quantified by integrating the unsteady form of the open-system energy equation over a control volume that encloses the rotor; the measured power imbalance directly reveals stall margin.

Ramjet and scramjet performance codes (e.g., those used by the Hypersonic International Flight Research Experimentation program) solve the steady one-dimensional energy balance across the inlet, isolator, combustor, and nozzle to locate thermal choking limits before any CFD is run.

Gas-turbine manufacturers such as GE and Siemens employ the same balance inside cycle-analysis tools to allocate cooling flow; a 1 % error in the enthalpy-flux term shifts predicted turbine inlet temperature by 30 K and changes life estimates by thousands of hours.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Closed-system first law \(\Delta E = Q - W\) | Provides the starting energy balance before mass crosses the boundary |
| Definition of enthalpy \(h = u + pv\) | Converts flow work at ports into a compact flux term |
| Mass-flow rate \(\dot{m} = \rho A V\) | Converts specific energies into power units (W) |
| Control-volume versus control-mass distinction | Tells you which energy is “inside” versus “crossing” |

## 4. Building the idea — from intuition to formalism

### Step 1 — Start with the closed-system statement
Energy is conserved for a fixed collection of matter: the change in its total energy equals heat added minus work done.  
Concrete example: 1 kg of air in a rigid, insulated tank receives 100 J of paddle-wheel work; its internal energy rises by 100 J.  
Formal statement:  
\[
\frac{dE}{dt}\Big|_{\text{system}} = \dot{Q} - \dot{W}.
\]

> [!WARNING]
> If the system is later allowed to exchange mass, this equation alone cannot be applied because the identity of the “system” changes with time.

### Step 2 — Replace the closed system with a fixed control volume
Draw an imaginary surface that stays fixed in space while fluid crosses it. All energy accounting is now performed inside this surface.  
Formal statement: the time derivative is taken of the instantaneous contents of the volume,  
\[
\frac{d}{dt}\int_{\text{CV}} e\,\rho\,d\mathcal{V}.
\]

### Step 3 — Add the energy carried by mass crossing the surface
Every infinitesimal mass \(dm\) that enters carries its specific energy \(e = u + \frac{V^2}{2} + gz\). In addition, the pressure force at the port pushes the mass in, performing flow work \(p\,dv\) per unit mass.  
The net flux term therefore appears with a minus sign for outflow and a plus sign for inflow:  
\[
\sum_{\text{in}} \dot{m}_i\left(h_i + \frac{V_i^2}{2} + gz_i\right) - \sum_{\text{out}} \dot{m}_e\left(h_e + \frac{V_e^2}{2} + gz_e\right).
\]

### Step 4 — Include shaft work and heat transfer that cross the control surface
Heat \(\dot{Q}\) and shaft work \(\dot{W}_{\text{shaft}}\) are written exactly as in the closed-system case; flow work has already been absorbed into enthalpy.  
The complete instantaneous balance is therefore  
\[
\frac{d}{dt}\int_{\text{CV}} e\,\rho\,d\mathcal{V} = \dot{Q} - \dot{W}_{\text{shaft}} + \sum_{\text{in}} \dot{m}_i\left(h_i + \frac{V_i^2}{2} + gz_i\right) - \sum_{\text{out}} \dot{m}_e\left(h_e + \frac{V_e^2}{2} + gz_e\right).
\]

### Step 5 — Specialize to steady, single-stream flow
Under steady state the accumulation term vanishes, inlet and outlet mass flows are equal, and the equation collapses to  
\[
h_1 + \frac{V_1^2}{2} + gz_1 + q = h_2 + \frac{V_2^2}{2} + gz_2 + w_{\text{shaft}}.
\]
This is the textbook statement used throughout compressible aerodynamics.

## 5. Worked examples — every step shown

**Example 1 — Adiabatic nozzle**  
*Given:* Air enters a converging nozzle at \(h_1 = 300\,\text{kJ/kg}\), \(V_1 = 50\,\text{m/s}\); exit velocity is \(300\,\text{m/s}\).  
*Find:* Exit enthalpy.  

Step: Set \(q = 0\), \(w_{\text{shaft}} = 0\), neglect gravity.  
\[
h_1 + \frac{V_1^2}{2} = h_2 + \frac{V_2^2}{2}.
\]  
*Why:* Steady single-stream energy balance with no external transfers.  
\[
h_2 = 300 + \frac{50^2 - 300^2}{2 \times 1000} = 255.75\,\text{kJ/kg}.
\]  
**255.75 kJ/kg**

*Reflection:* The kinetic-energy term must be converted from m²/s² to kJ/kg by dividing by 1000; missing this factor is the most common arithmetic slip.

**Example 2 — Compressor with heat loss**  
*Given:* \(\dot{m} = 10\,\text{kg/s}\), \(h_1 = 290\,\text{kJ/kg}\), \(h_2 = 450\,\text{kJ/kg}\), \(V_1 = V_2 = 100\,\text{m/s}\), \(\dot{Q} = -50\,\text{kW}\).  
*Find:* Required shaft power.  

Step: Solve the steady balance for \(\dot{W}_{\text{shaft}}\).  
\[
\dot{W}_{\text{shaft}} = \dot{Q} + \dot{m}\Bigl[(h_1 - h_2) + \frac{V_1^2 - V_2^2}{2}\Bigr].
\]  
*Why:* Rearrangement isolates the unknown work term.  
\[
\dot{W}_{\text{shaft}} = -50 + 10\Bigl[(290-450) + 0\Bigr] = -1650\,\text{kW}.
\]  
**-1650 kW**

*Reflection:* The sign convention (positive work out of the system) must be applied consistently; reversing it produces an impossible positive power for a compressor.

**Example 3 — Turbine stage with elevation change**  
*Given:* Water, \(h_1 = 3400\,\text{kJ/kg}\), \(V_1 = 10\,\text{m/s}\), \(z_1 = 100\,\text{m}\); exit \(h_2 = 2900\,\text{kJ/kg}\), \(V_2 = 20\,\text{m/s}\), \(z_2 = 0\).  
*Find:* Specific work output.  

\[
w_{\text{shaft}} = (h_1 - h_2) + \frac{V_1^2 - V_2^2}{2} + g(z_1 - z_2).
\]  
*Why:* All terms on the left-hand side of the steady balance moved to the right.  
\[
w_{\text{shaft}} = 500 + \frac{100-400}{2000} + 9.81\times100/1000 = 598.55\,\text{kJ/kg}.
\]  
**598.55 kJ/kg**

*Reflection:* Potential-energy contribution is small for gases but decisive for liquids; always retain the term until magnitudes are checked.

**Example 4 — Unsteady filling of a tank**  
*Given:* An evacuated tank of volume \(1\,\text{m}^3\) is filled from a reservoir at \(h_0 = 500\,\text{kJ/kg}\); final pressure reaches reservoir pressure, final temperature is uniform.  
*Find:* Final specific internal energy.  

Step: Accumulation equals inlet enthalpy flux only.  
\[
\frac{d}{dt}(m u)_{\text{CV}} = \dot{m}_{\text{in}} h_0.
\]  
*Why:* No exit, no work, no heat.  
Integrating from empty to final state yields \(u_2 = h_0\).  
**u₂ = h₀**

*Reflection:* The result is counter-intuitive until one realizes that the last parcel of mass entering must push earlier parcels, converting flow work into internal energy.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating \(pv\) as separate work after already using enthalpy | Students remember “flow work” from closed-system lectures | Always verify that the flux term contains \(h\), not \(u\) |
| Sign error on shaft work | Different textbooks define positive work differently | Adopt one convention (work positive out) and annotate every equation |
| Forgetting the accumulation term in transient problems | Steady-state examples dominate homework | Write the full integral form first, then set the derivative to zero only when justified |
| Using static instead of stagnation enthalpy when velocities differ | Confusion between static and total quantities | Check that \(h + V^2/2\) is used whenever kinetic energy is non-negligible |
| Neglecting gravity for liquids | “It’s small for air” heuristic applied indiscriminately | Compute the term once; retain if \(\Delta z > 100\,\text{m}\) for liquids |
| Inconsistent mass-flow directions at multiple ports | Complex geometry drawings | Label every port “in” or “out” before writing the summation |
| Units mismatch between kJ/kg and m²/s² | Factor of 1000 omitted | Carry units through every line until the final numerical answer |

## 7. The textbook-precise statement
For an arbitrary control volume the first law of thermodynamics for an open system reads  
\[
\frac{d}{dt}\int_{\text{CV}} \rho e\,d\mathcal{V} = \dot{Q}_{\text{CV}} - \dot{W}_{\text{shaft,CV}} + \sum_{\text{in}}\dot{m}_i\left(h_i+\frac{V_i^2}{2}+gz_i\right)-\sum_{\text{out}}\dot{m}_e\left(h_e+\frac{V_e^2}{2}+gz_e\right),
\]  
where \(e = u + V^2/2 + gz\) and the summations are replaced by surface integrals when flow is not uniform. This is equation (5.69) in Anderson, *Fundamentals of Aerodynamics*, 6e.

## 8. Visual — diagram or schematic
```text
          Q_dot (heat in)
              ↓
   ┌──────────────────────────────┐
   │          Control Volume      │
   │                              │
→ m1(h1+V1²/2+gz1)     m2(h2+V2²/2+gz2) →
   │                              │
   │          W_shaft (out)       │
   └──────────────────────────────┘
              ↑
           z increasing upward
```
Inlet port on left, outlet on right; heat arrow entering top surface; shaft-work arrow leaving bottom surface; elevation coordinate shown on right.

## 9. The memory technique
1. **The hook** — Picture a bucket with holes: water (mass) carries energy in and out, a heater adds heat, a paddle removes work; whatever is left changes the water level inside.  
2. **What to overlearn** — Steady single-stream equation \(h + V^2/2 + gz + q = h + V^2/2 + gz + w\); definition \(h = u + pv\); sign convention (work positive out).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from the closed-system statement by adding the surface integral of \((e + pv)\rho\mathbf{V}\cdot d\mathbf{A}\).

## 10. What this unlocks
The steady-flow energy equation is the foundation for every subsequent compressible-flow relation: isentropic relations, normal-shock tables, Fanno and Rayleigh lines, and nozzle design. It also supplies the energy jump condition across shocks and the matching condition between core and bypass streams in turbofan cycle analysis.

## 11. Self-check — five questions, no answers
1. An insulated valve drops the pressure of steam from 10 bar to 1 bar; does the exit temperature rise, fall, or stay the same?  
2. Write the unsteady energy balance for a rocket combustion chamber during the first 0.1 s after ignition when the chamber is still filling.  
3. A centrifugal compressor adds 200 kW to a 5 kg/s airflow while losing 10 kW of heat; inlet and exit kinetic energies are equal. What is the stagnation-enthalpy rise?  
4. Why does the energy equation for a control volume contain enthalpy rather than internal energy at the ports?  
5. Two identical turbines operate between the same inlet state and exit pressure; one has a 50 m elevation drop, the other does not. Which produces more work per unit mass, and by how much?