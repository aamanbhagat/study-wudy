## 1. The one-sentence answer
**Software testing in embedded systems splits into host-based unit tests that run fast on your development machine and Hardware-In-the-Loop (HIL) tests that connect the real compiled binary to actual hardware for timing-accurate validation.**

Host-based unit tests let aap quickly verify individual functions using mocks for peripherals, so logic errors surface in seconds without needing target hardware. HIL testing then places the same binary inside a closed control loop with real sensors and actuators, exposing timing, interrupt, and electrical-behaviour bugs that only appear when the MCU runs at full speed. The two layers together give both velocity during development and confidence before deployment.

> [!NOTE]
> The decisive insight is that host tests catch 80 % of functional mistakes at zero hardware cost, while HIL is the only way to prove that the remaining 20 % of timing and interface faults will not appear in the field.

## 2. Why this matters — concrete and current
SpaceX uses host-based unit tests for every flight-software module before any HIL run on the Falcon 9 avionics rig; the same binary is later exercised on a HIL bench that includes real thrust-vector-control actuators.

Texas Instruments ships its C2000 motor-control library with a host test suite that runs on x86 and a HIL suite that connects the MCU to a dynamometer; customers cite the combination as the reason field returns dropped 40 %.

The Mars Perseverance rover team at JPL maintained a continuous HIL facility called the Vehicle System Testbed; every software patch had to survive both host unit tests and HIL before uplink.

STMicroelectronics’ automotive MCAL drivers are validated first on host with AUTOSAR-compliant mocks and then on HIL benches that include real CAN and LIN networks from production ECUs.

Google’s Coral Edge TPU firmware team runs nightly host unit tests on every driver and weekly HIL campaigns that close the loop with the actual neural accelerator silicon.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| C or C++ build system    | Host tests compile the same sources with a different target; you must understand cross-compilation flags and mocking. |
| Interrupt-driven I/O     | HIL reveals timing violations that only occur when real interrupts fire at production rates. |
| Basic control theory     | HIL setups close feedback loops; you must recognise stability and latency requirements. |
| Version-controlled CI    | Both host and HIL runs must be reproducible; you need to script flashing and result collection. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Separate concerns by execution environment
Host tests run on your laptop where time is cheap and peripherals are fake; HIL runs on the real MCU where time is real and peripherals are physical.  
Example: a PID controller function can be unit-tested on x86 with a mocked ADC reading; the identical object file later runs on an STM32 connected to a real motor.  
Formal statement: let \( T_h \) be the test set executed on host and \( T_{hil} \) the test set executed on target; correctness requires \( \forall t \in T_h \cup T_{hil},\; \text{behaviour}(t) \) matches specification.  
> [!WARNING] If you place timing assertions inside host tests you will obtain false positives because simulated time never matches hardware clock jitter.

### Step 2 — Introduce hardware abstraction layers (HAL)
A thin HAL lets the same source compile against either a host mock or the real driver; the switch is done at link time.  
Example: `adc_read()` is declared in `hal.h`; `hal_host.c` returns scripted values while `hal_stm32.c` reads the real ADC register.  
Formal statement: define two implementations \( HAL_{host} \) and \( HAL_{target} \) of the same interface; tests link against exactly one.

### Step 3 — Define unit-test boundaries
A unit is any pure function or state machine whose inputs and outputs can be controlled without side effects outside the HAL.  
Example: a Kalman-filter update function receives a vector of sensor values and emits a state estimate; it never touches GPIO directly.  
Formal statement: a function \( f: I \to O \) is testable on host if every element of \( I \) can be supplied by a mock and every element of \( O \) can be observed.

### Step 4 — Add deterministic scheduling for HIL
HIL requires the plant model to run at the exact sample rate of the controller; this is achieved with real-time operating-system tasks or FPGA-based plant simulators.  
Example: a 1 kHz current-control loop on an STM32 must receive new current samples every 1 ms from the HIL simulator; any jitter > 50 µs invalidates the test.  
Formal statement: let \( T_s \) be the sample period; the HIL scheduler must guarantee \( |t_{actual} - nT_s| < \epsilon \) for all steps \( n \).

### Step 5 — Close the loop and measure latency
After the controller writes to the actuator, the plant simulator must return the next sensor value within one sample; end-to-end latency is recorded on every cycle.  
Formal statement: the closed-loop transfer function under test is \( G_{cl}(z) = \frac{C(z)P(z)}{1+C(z)P(z)} \) where \( C \) is the controller binary running on target and \( P \) is the plant implemented in the HIL rig.

## 5. Worked examples — har step show karo

**Example 1 — Host unit test of a simple moving-average filter**  
*Given:* array of 4 samples and filter length 4.  
*Find:* output of `moving_avg()`.  
Step 1: include the host mock header. *Why*: so the function compiles on x86.  
Step 2: call `moving_avg({1,2,3,4})`. *Why*: supplies deterministic input.  
Step 3: assert result equals 2.5. *Why*: verifies arithmetic.  
**Final answer**  
**2.5**

*Reflection*: the example is simple yet forces you to separate the algorithm from hardware access.

**Example 2 — Same filter under HIL with real ADC**  
*Given:* STM32 Nucleo board sampling a 2.5 V reference at 1 kHz.  
*Find:* measured average after 1000 samples.  
Step 1: flash the identical object file. *Why*: guarantees no source divergence.  
Step 2: start HIL rig that supplies constant 2.5 V. *Why*: plant is now physical.  
Step 3: read 1000 filtered values via SWD and compute mean. *Why*: captures real quantisation.  
**Final answer**  
**2.499 V ± 0.003 V**

*Reflection*: HIL reveals the 1-LSB offset hidden by the host mock.

**Example 3 — Detecting a missed deadline**  
*Given:* 2 kHz control task on STM32F4 with 10 µs worst-case execution.  
*Find:* whether the task overruns when an extra CAN ISR fires.  
Step 1: instrument the task with GPIO toggle at entry and exit. *Why*: allows external logic analyser measurement.  
Step 2: enable CAN traffic at 1 Mbps. *Why*: creates realistic interrupt load.  
Step 3: observe 520 µs gap between toggles. *Why*: proves deadline miss.  
**Final answer**  
**Deadline missed by 20 µs**

*Reflection*: host tests cannot expose this because they lack real interrupt timing.

**Example 4 — Full closed-loop stability test**  
*Given:* PI speed controller for a brushed DC motor, HIL plant with 5 ms mechanical time constant.  
*Find:* step-response overshoot at 500 rpm reference.  
Step 1: load reference trajectory into HIL FPGA. *Why*: guarantees repeatable excitation.  
Step 2: capture encoder velocity at 10 kHz. *Why*: sufficient bandwidth for 5 ms dynamics.  
Step 3: compute peak overshoot = 18 %. *Why*: matches simulation within 2 %.  
**Final answer**  
**18 % overshoot, stable**

*Reflection*: the match between host simulation and HIL measurement validates both the model and the implementation.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Using `sleep()` inside host tests | Developer copies desktop code               | Replace all timing with a virtual clock mock         |
| Ignoring compiler optimisation    | Host uses -O0, target uses -O2              | Build host tests with the same optimisation flags    |
| Assuming HIL is deterministic     | Real hardware has clock drift               | Log timestamps and accept bounded jitter             |
| Testing only happy paths          | Edge cases appear only under load           | Inject fault conditions via HIL fault-injection pins |
| Sharing source between host and target without HAL | Global variables hide hardware access     | Mandate an explicit HAL layer reviewed in every PR   |
| Running HIL without version control on plant model | Plant changes silently break tests        | Store FPGA bitstream and wiring diagram in the repo  |
| Measuring latency only at startup | Thermal drift appears after 30 min          | Run HIL campaigns for at least one thermal time constant |

## 7. The textbook-precise statement
In “Embedded Systems: Introduction to Arm Cortex-M Microcontrollers” (Valvano, 6e, §8.4), software testing for embedded systems is defined as a two-tier process: (1) host-based unit testing performed on a development workstation using hardware abstraction layers that replace peripheral drivers with deterministic mocks, and (2) hardware-in-the-loop testing in which the cross-compiled binary executes on the target microcontroller while interacting in real time with a physical or emulated plant. The host tier must achieve statement, branch, and MC/DC coverage; the HIL tier must verify that all hard real-time deadlines are met under worst-case interrupt load and that closed-loop stability margins remain within specification when the plant parameters vary inside their tolerance envelope.

## 8. Visual — diagram or schematic
```
Host PC (x86)                  Target MCU
+-------------+               +-------------+
|  Unit Tests | --link-->     |  HAL_mock   |
|  (Catch2)   |               +-------------+
+-------------+                     |
                                    v
                               +-------------+
                               |  Real HW    |
                               |  (STM32)    |
                               +------+------+
                                      |
                               HIL rig (FPGA)
                               +------+------+
                                      |
                               Physical plant
                               (motor, sensors)
```

## 9. The memory technique
1. **The hook** — picture two rooms: a fast “lab bench” on your laptop where you test Lego bricks (host tests) and a noisy factory floor where the same bricks control a real conveyor belt (HIL).
2. **What to overlearn** — host tests must reach ≥80 % MC/DC coverage; HIL must guarantee latency < 10 % of sample period.
3. **Spaced-repetition schedule** — review the HAL interface after 1 day, run a full HIL campaign after 3 days, compare host vs HIL coverage after 7 days, audit timing margins after 16 days, and re-execute the entire suite after 35 days.
4. **First-principles fallback** — if you forget a coverage number, rebuild from the definition: every branch taken both ways on host, every deadline met on target under maximum interrupt load.

## 10. What this unlocks
Mastering host-plus-HIL testing lets you safely adopt model-based design, continuous integration for safety-critical code, and automated regression on physical hardware.  
- You can now integrate processor-in-the-loop (PIL) testing.  
- You can move to ISO 26262 ASIL decomposition arguments.  
- You can design fault-injection campaigns that feed directly into FMEA.  
- You can maintain a digital twin that stays synchronised with the HIL rig.

## 11. Self-check — five questions, no answers
1. A developer places a 10 ms `delay()` inside a host unit test of a 1 kHz controller; which coverage metric will silently become meaningless?  
2. In a HIL run the measured loop latency jumps from 120 µs to 480 µs exactly when CAN traffic is enabled; what single hardware resource is most likely starved?  
3. You observe identical numerical outputs on host and HIL for 10 000 samples, yet the motor oscillates on the real vehicle; list the three most probable missing test conditions.  
4. Write the one-line CMake command that switches a target between `hal_host` and `hal_stm32` without touching any source file.  
5. A safety requirement states “brake command must be issued within 3 ms of sensor fault detection”; translate this into one host-test assertion and one HIL measurement that together satisfy the requirement.