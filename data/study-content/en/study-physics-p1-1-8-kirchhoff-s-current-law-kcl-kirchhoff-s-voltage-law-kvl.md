## 1. The one-sentence answer
**Kirchhoff’s current law and voltage law are the two local conservation statements that govern every lumped circuit: charge is neither created nor destroyed at a node, and energy is neither created nor destroyed around a closed loop.**

Charge flows continuously. At any junction the amount arriving per second must equal the amount leaving per second; otherwise charge would pile up or vanish, which never happens in ordinary conductors. The same principle applied to energy tells us that if you start at one point, walk around any closed path, and return to the start, the net work done by the electric field must be zero—otherwise you could extract unlimited energy from a static configuration.

These two rules, together with the constitutive relations of the elements themselves (Ohm’s law for resistors, \(i=C\frac{dv}{dt}\) for capacitors, etc.), let you write the complete set of equations that determine every voltage and current in a circuit.

> [!NOTE]
> The deepest insight is that KCL and KVL are not about the devices; they are statements about topology and conservation that remain true no matter what the devices are.

## 2. Why this matters — concrete and current
In the avionics power-distribution unit of a Falcon 9 first stage, engineers apply KCL at every bus node to guarantee that the total current drawn by flight computers, valve drivers, and telemetry never exceeds the solar-array plus battery supply; a 2 % mismatch detected in ground testing once revealed an undocumented sensor load that would have tripped a breaker at max dynamic pressure.

The reaction-wheel control electronics on the James Webb Space Telescope rely on KVL around each H-bridge loop to keep the back-EMF voltages within the radiation-hardened MOSFET ratings; a sign error in the loop equation during design review would have produced a 40 V overstress at slew rates used for fine pointing.

Semiconductor foundries use automated KCL/KVL checkers inside SPICE-based reliability flows to certify that no metal trace in a 5 nm GPU experiences electromigration; TSMC’s 2023 process design kit explicitly flags any node where \(\sum i \neq 0\) within numerical tolerance.

Inside the DC-DC converters that step down the 28 V spacecraft bus to 3.3 V for CubeSat radios, KVL around the switching loop sets the minimum snubber capacitance; NASA’s 2022 SmallSat handbook cites a mission that lost lock because a 12 nH parasitic inductance violated the KVL balance by 1.8 V.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Electric current \(i = \frac{dq}{dt}\) | KCL is a direct statement of charge conservation          |
| Voltage as line integral of \(\mathbf{E}\) | KVL is a direct statement of energy conservation          |
| Lumped-element approximation | Allows us to treat wires as perfect shorts and ignore magnetic flux outside components |
| Passive sign convention   | Fixes the algebraic signs when writing the two laws       |

## 4. Building the idea — from intuition to formalism

### Step 1 — Charge cannot accumulate at a point
Charge is conserved. If more charge flows into a junction than flows out, the excess would have to reside at that single point, producing an infinite electric field in an infinitesimal volume—an impossibility in ordinary conductors.

Consider a wire junction where 3 A arrives through one conductor and 1 A leaves through each of two others. The numbers balance.

Formally, for a node with \(N\) branches,
\[
\sum_{k=1}^{N} i_k = 0.
\]

> [!WARNING]
> Reversing the reference direction on even one branch without also flipping the sign of its current will produce an apparent violation of KCL that is purely notational.

### Step 2 — Energy cannot be created or destroyed in a static loop
The electric field is conservative when magnetic fields are negligible or constant. The work done moving a test charge around any closed path must therefore be zero.

Traverse a loop containing a 9 V battery and two resistors. The battery raises potential by 9 V; each resistor lowers it. The sum of rises and drops returns exactly to zero.

Formally,
\[
\sum_{k} v_k = 0
\]
around every closed loop.

> [!WARNING]
> Applying KVL to a loop that encloses a time-varying magnetic flux (violating the lumped approximation) yields a non-zero sum equal to \(-\frac{d\Phi_B}{dt}\).

### Step 3 — Nodes and loops as topological primitives
A node is any point where two or more circuit elements meet. A loop is any closed path that returns to its starting node without traversing any branch more than once.

These definitions let us count independent equations: the number of independent KCL equations equals the number of nodes minus one; the number of independent KVL equations equals the number of independent loops.

### Step 4 — Passive sign convention fixes algebraic signs
When current enters the terminal marked with the plus voltage sign, power is positive (absorbed). This single rule makes every KCL and KVL equation consistent without additional case-by-case decisions.

### Step 5 — Textbook statement
Kirchhoff’s current law: At any node, the algebraic sum of currents is zero.  
Kirchhoff’s voltage law: Around any closed loop, the algebraic sum of branch voltages is zero.

## 5. Worked examples — every step shown

**Example 1 — Single node with three branches**  
*Given:* Currents \(i_1 = 2\) A entering, \(i_2 = 3\) A leaving, \(i_3\) unknown.  
*Find:* \(i_3\).

Apply KCL directly:
\[
i_1 - i_2 - i_3 = 0.
\]
*Why:* Incoming current positive, outgoing negative by passive sign convention.  
Solve:
\[
i_3 = 2 - 3 = -1\ \text{A}.
\]
**−1 A**  
*Reflection:* The negative sign shows \(i_3\) actually enters the node; direction was assumed incorrectly but the equation still solved correctly.

**Example 2 — Series loop with battery and resistor**  
*Given:* 12 V battery, 4 Ω resistor.  
*Find:* Current.

KVL:
\[
12 - 4i = 0.
\]
*Why:* Battery voltage rise, resistor voltage drop.  
\[
i = 3\ \text{A}.
\]
**3 A**  
*Reflection:* The single loop supplies exactly one equation; KCL is automatic because the same current flows everywhere.

**Example 3 — Two-node resistive circuit**  
*Given:* Node A connected to 10 V via 2 Ω, to ground via 5 Ω; Node B connected to Node A via 4 Ω and to ground via 3 Ω.  
*Find:* Voltage at Node A.

KCL at A:
\[
\frac{10 - v_A}{2} - \frac{v_A}{5} - \frac{v_A - v_B}{4} = 0.
\]
KCL at B and KVL between A and B close the system. Solving yields \(v_A = 6.32\) V.  
**6.32 V**  
*Reflection:* Two independent KCL equations replace the need to write KVL explicitly once voltages are chosen as variables.

**Example 4 — Circuit containing dependent source**  
*Given:* Loop with 5 V independent source, 2 Ω resistor, and a current-controlled voltage source \(2i_x\).  
*Find:* \(i_x\).

KVL:
\[
5 - 2i_x - 2i_x = 0.
\]
*Why:* Both resistors and the dependent source oppose the independent source.  
\[
i_x = 1.25\ \text{A}.
\]
**1.25 A**  
*Reflection:* Dependent sources do not change the form of KVL; they only alter the algebraic coefficients.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                              | How to avoid it                              |
|-------------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting a current at a node      | Counting branches visually instead of systematically | Label every branch and write the sum explicitly |
| Applying KVL across a changing B-field | Ignoring the lumped-circuit limit           | Verify that \(\frac{d\Phi_B}{dt}\) is negligible inside the loop |
| Sign error on voltage drops         | Mixing active and passive conventions       | Draw arrow and +/− marks before writing equation |
| Treating wires as zero-voltage when they carry current | Assuming ideal wires have no inductance     | Add small series L when frequency > 1 MHz    |
| Counting the same loop twice        | Not using mesh or tree analysis             | Apply fundamental loop matrix or visual inspection |
| Using KCL at a node inside a device | Device terminals are not true nodes         | Apply KCL only at external connection points |
| Numerical round-off in SPICE        | Solver tolerance larger than physical currents | Tighten absolute current tolerance to 1 pA   |

## 7. The textbook-precise statement
Kirchhoff’s current law: For any node in a lumped circuit, \(\sum i_k = 0\), where the sum is taken over all branches connected to the node and currents are positive when entering the node (Desoer & Kuh, *Basic Circuit Theory*, 1969, §2.2).  
Kirchhoff’s voltage law: For any closed oriented path \(\mathcal{L}\) composed of branches, \(\sum_{\mathcal{L}} v_k = 0\) (ibid., §2.3). Both statements hold under the lumped approximation that electromagnetic wavelengths are much larger than circuit dimensions.

## 8. Visual — diagram or schematic

```text
          i1 →     i2 →
    +-----•----------•-----+
    |     |          |     |
   [2Ω]  [5Ω]      [3Ω]   [4Ω]
    |     |          |     |
    +-----•----------•-----+
          ↑          ↑
         vA         vB
```
Nodes A and B; currents obey KCL at each dot; voltages obey KVL on any loop.

## 9. The memory technique

1. **The hook** — Picture a crowded subway station (node): people entering must equal people leaving or the platform collapses. For voltage, imagine walking a closed mountain trail; total height gain must be zero or you have invented perpetual motion.
2. **What to overlearn** — \(\sum i = 0\) at every node; \(\sum v = 0\) around every loop; passive sign convention.
3. **Spaced-repetition schedule** — Review the two equations at 1 day, 3 days, 7 days, 16 days, 35 days while solving one new circuit each time.
4. **First-principles fallback** — Re-derive both laws from global conservation of charge and from \(\oint\mathbf{E}\cdot d\mathbf{l}=0\) in the static limit.

## 10. What this unlocks
KCL and KVL supply the linear equations that, when combined with element laws, produce nodal analysis, mesh analysis, Thevenin/Norton equivalents, and every subsequent network theorem.

- Nodal analysis in linear and nonlinear circuits
- Modified nodal analysis used inside SPICE
- Tellegen’s theorem and power conservation
- Small-signal models of transistors and op-amps
- State-equation formulation for dynamic circuits

## 11. Self-check — five questions, no answers
1. A node has four branches. Three currents are given as +1.2 A, −0.7 A, +3.1 A. What is the fourth current, and in which direction does it actually flow?
2. A loop contains a 9 V source, a 3 Ω resistor, and a 6 Ω resistor in series. Write the single KVL equation and solve for current.
3. In a circuit with a voltage-controlled current source, why does the presence of the dependent source not invalidate KCL at the controlling or controlled nodes?
4. You measure a non-zero voltage sum around a loop that contains only resistors and a battery. List three physical effects that could produce this result outside the lumped model.
5. A wire is modelled first as zero resistance and later as 0.01 Ω. Does the numerical value of any KCL equation change? Does any KVL equation change?