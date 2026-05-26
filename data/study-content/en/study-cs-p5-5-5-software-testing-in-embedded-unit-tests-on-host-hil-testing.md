## 1. The one-sentence answer
**Software testing in embedded systems separates fast, repeatable verification on a development host from faithful validation against real hardware timing and interfaces via HIL.**

Unit tests on the host compile the same C or C++ modules against a native toolchain and run them inside a desktop operating system, catching logic errors before any silicon is powered. This approach exploits the fact that most algorithmic defects are independent of the target microcontroller’s instruction set or memory map. Hardware-in-the-loop testing then closes the loop by coupling the production binary to physical sensors, actuators, and communication buses, exposing timing, electrical, and concurrency faults that only appear under real load.

The two layers together form a verification pyramid: host unit tests give breadth and speed; HIL supplies the depth required by safety standards such as ISO 26262 and DO-178C.

> [!NOTE]
> The decisive insight is that host tests can be executed in milliseconds on a laptop while HIL runs must respect the real-time clock of the plant; any test that mixes these two timescales will either run too slowly to be useful or too fast to catch deadline violations.

## 2. Why this matters — concrete and current
SpaceX verifies flight-software attitude controllers on x86 hosts using the same source files later cross-compiled for the Falcon 9 flight computer; only after host suites pass does the binary enter a HIL rig that includes actual thrust-vectoring servos and GPS receivers.

Bosch Automotive uses host-based unit tests for its engine-control software to achieve statement coverage above 95 % within continuous-integration pipelines measured in minutes; nightly HIL campaigns on engine dynamometers then confirm closed-loop lambda regulation under transient load.

NASA’s Jet Propulsion Laboratory runs rover motor-control modules through host unit tests on Linux before executing the identical modules against a HIL bench containing flight-representative motors and encoders, thereby satisfying the fault-injection requirements of NASA-STD-8739.8.

STMicroelectronics validates motor-control firmware for industrial drives by first proving current-loop math on the host with synthetic ADC samples, then feeding the same firmware real three-phase inverters and current sensors inside a HIL chamber that reproduces 400 V bus transients.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                                                 |
|----------------------------|--------------------------------------------------------------------------------------|
| C or C++ translation units | Embedded firmware is almost always delivered as separate compilation units that must be linkable on both host and target. |
| Basic unit-test harness    | You must understand assertions, fixtures, and test isolation before scaling to cross-compilation. |
| Real-time scheduling       | HIL correctness depends on deadline monotonicity and worst-case execution time; without this notion, timing faults remain invisible. |
| Memory-mapped I/O          | Distinguishing volatile hardware registers from ordinary RAM is required to write host mocks that preserve the same access pattern. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Separate concerns by abstraction level
Logic errors reside in algorithms; timing and electrical errors reside in the hardware interface.  
Example: a PID controller that computes an incorrect integral term fails on any processor; a PWM duty-cycle register that is written too late fails only on the real timer peripheral.  
Formally, let \(M\) be the module under test and \(I\) its interface contract. Host testing verifies \(M\) against \(I\) in a simulated environment; HIL verifies \(M\) against the physical realisation of \(I\).

> [!WARNING]
> Treating a timing-dependent race as a pure logic bug on the host will produce a green test suite that later fails on silicon.

### Step 2 — Host compilation re-uses the identical source
Cross-compilation changes only the toolchain and the definitions of hardware registers.  
Example: `#ifdef HOST` supplies a RAM-backed mock for an ADC register that the target maps to address `0x40012000`.  
The same translation unit therefore yields both `pid.o` (host) and `pid.o` (ARM).

### Step 3 — Mocking replaces hardware with deterministic doubles
A mock must reproduce the observable contract, not the internal timing, of the peripheral.  
Example: a UART mock that returns a fixed byte sequence on each read allows deterministic replay of a GPS message.

### Step 4 — Coverage metrics remain host-first
Statement and branch coverage are collected on the host because instrumentation overhead is negligible and test execution is fast.

### Step 5 — HIL injects real-time plant dynamics
The hardware loop supplies continuous-time signals whose bandwidth exceeds the discrete-time controller sample rate.  
Formally, the closed-loop system becomes \(\dot{x}=f(x,u)\) where \(u\) is produced by the embedded binary at each sample instant.

### Step 6 — Fault injection distinguishes the layers
Host tests inject logical faults (division by zero, buffer overflow). HIL injects electrical faults (sensor dropout, bus-off, power glitch).

### Step 7 — Regression gate ordering
All host unit tests must pass before any binary is admitted to the HIL rig; this ordering minimises expensive hardware time.

## 5. Worked examples — every step shown

**Example 1 — Host unit test of a saturating integrator**  
*Given:* Module `integrator.c` containing `int32_t integrate(int32_t input, int32_t *state)`.  
*Find:* Verify that the integrator saturates at \(\pm 10000\).  
Compile with `gcc -DHOST -c integrator.c`.  
Create test file that calls `integrate(200, &s)` repeatedly.  
After 60 iterations the state must equal 10000.  
*Why:* The loop exercises the upper saturation branch.  
**Final answer**  
```
assert(state == 10000);
```
*Reflection:* The example is trivial yet demonstrates that the identical source compiles and runs without any target hardware.

**Example 2 — Mocking an ADC peripheral**  
*Given:* Production code reads `volatile uint16_t *ADC_DR = (uint16_t*)0x40012000`.  
*Find:* Supply deterministic samples on the host.  
Define  
```c
#ifdef HOST
uint16_t mock_adc[3] = {2048, 2050, 2049};
uint16_t *ADC_DR = mock_adc;
#endif
```  
*Why:* Pointer arithmetic remains unchanged; only the backing store differs.  
**Final answer**  
Host test observes the sequence 2048, 2050, 2049 without silicon.

**Example 3 — HIL step response measurement**  
*Given:* DC-motor current controller binary loaded on an STM32.  
*Find:* Measure 10 %–90 % rise time under 2 A step.  
Connect HIL simulator that outputs actual phase currents and records PWM edges on an oscilloscope.  
Observed rise time = 180 µs.  
*Why:* Only the physical plant and real PWM timer can produce this datum.  
**Final answer**  
Rise time = 180 µs (must be < 200 µs per requirement).

**Example 4 — Combined regression gate**  
*Given:* 1200 host unit tests and one HIL scenario.  
*Find:* Decide whether to promote a new commit.  
Run host suite in 14 s; all pass.  
Only then flash the binary into the HIL target.  
*Why:* The ordering eliminates 99 % of defects before hardware time is consumed.  
**Final answer**  
Commit promoted only after both layers green.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Running timing assertions on host | Host clock is orders of magnitude faster            | Mark all deadlines with `#ifdef TARGET` guards       |
| Sharing the same mock across tests| Global state leaks between test cases               | Reset mock state in a `setUp` fixture                |
| Ignoring volatile semantics       | Compiler optimises hardware accesses on host        | Keep `volatile` qualifiers even in host mocks        |
| Measuring coverage only on host   | Uncovered hardware paths remain invisible           | Add HIL fault-injection cases to coverage reports    |
| Assuming HIL is deterministic     | Plant noise and sensor jitter vary each run         | Record multiple runs and apply statistical bounds    |
| Forgetting endianness in mocks    | Host is little-endian while some targets are big    | Use explicit byte-order conversion macros            |
| Linking production I/O drivers    | Real drivers block or hang the host test process    | Provide link-time replacement via weak symbols       |

## 7. The textbook-precise statement
Let \(S\) be the source modules of an embedded control system. Host testing is the relation  
\[
T_{\text{host}}(S, I) \equiv \forall t \in \text{TestCases},\; \text{assert}(M(t) \models I)
\]  
where \(I\) is the software interface contract and execution occurs on a general-purpose processor. HIL testing is the relation  
\[
T_{\text{HIL}}(S, P) \equiv \forall \tau \in \text{PlantTrajectories},\; \text{closedLoop}(S, P, \tau) \models \text{SafetySpec}
\]  
where \(P\) is the physical plant. ISO 26262-6 (2018) §9.4.3 requires both layers for ASIL C/D software. Reference: “Embedded Software Verification” in *Handbook of Hardware/Software Codesign*, Springer, 2017.

## 8. Visual — diagram or schematic

```text
Host CI (x86/Linux)          HIL Rig
+------------------+        +---------------------+
|  gcc -DHOST      |        |  Cross-compile      |
|  unit tests      |        |  flash binary       |
|  (ms per test)   |        |                     |
|  coverage 95 %   |        |  Real MCU + plant   |
|                  |        |  (µs deadlines)     |
+--------+---------+        +----------+----------+
         |                             |
         v                             v
   Green → promote binary → only then enter HIL
```

## 9. The memory technique

1. **The hook** — Picture two concentric circles: the inner circle is your laptop (host tests) and the outer circle is the actual machine wrapped around it (HIL).  
2. **What to overlearn** — Host tests run in milliseconds; HIL respects the plant’s real-time clock. Coverage first on host, timing only on HIL.  
3. **Spaced-repetition schedule** — Review distinction at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive by asking: “Does this defect depend on the instruction timing or the algorithm alone?”

## 10. What this unlocks
Host-plus-HIL discipline is the foundation for model-based testing, software-in-the-loop (SIL) co-simulation, and automated fault-injection campaigns required by ISO 26262 and DO-178C. It directly precedes integration testing of multiple ECUs on a vehicle bus and the construction of digital-twin environments.

## 11. Self-check — five questions, no answers
1. Why can a host test never detect a missed deadline caused by an interrupt service routine that runs 40 µs late?  
2. A test that asserts a PWM register write occurs within 2 µs of an ADC conversion complete interrupt—should it be written for host or HIL execution?  
3. If a mock UART returns data synchronously on the host but the real UART uses DMA, which additional fault class appears only in HIL?  
4. You observe 100 % branch coverage on the host yet a field failure occurs when the supply voltage droops. Which layer was missing?  
5. Formulate the exact guard macro that prevents a `while (timer < deadline)` busy-wait from executing on the host.