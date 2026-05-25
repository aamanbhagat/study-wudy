## 1. What it is — in plain English

Imagine you want to build a super-cool, high-tech treehouse. You don't just grab some wood and start hammering, right? First, you figure out exactly what you want: how many rooms, a slide, a secret entrance, how strong it needs to be to hold your friends. That's like defining your "requirements."

The "V-model" is like a fancy roadmap for building really complicated things, like rockets or satellites. It's shaped like a letter 'V' because you start at the top-left by breaking down your big idea into tiny, manageable pieces (like deciding on the exact type of wood for each part of the treehouse). Then you go down to the bottom of the 'V' where you actually build those tiny pieces. Finally, you climb up the right side of the 'V' by putting all those pieces back together, one by one, and checking if they work exactly as you planned, all the way up to testing the whole treehouse.

"Requirements traceability" is like having a super-detailed notebook where you write down every single wish you had for your treehouse (e.g., "must have a strong ladder"). Then, for each wish, you draw lines to show which design drawing addressed it, which piece of wood was used for it, and which test proved it was strong enough. So, if someone asks, "Did you make sure the ladder is strong?", you can immediately point to the specific design, material, and test that confirms it. It's about making sure nothing gets forgotten and everything you promised gets built and verified.

Together, the V-model gives you the structure for how to build complex systems, and requirements traceability gives you the confidence that you've built the *right* system, exactly as intended, every step of the way.

## 2. Why it matters — real-world applications

The V-model and requirements traceability are absolutely critical for any complex system, especially in aerospace, where failure can be catastrophic, costly, and even deadly.

1.  **SpaceX Starship Development:** Building a reusable, interplanetary transport system like Starship involves millions of components and thousands of requirements, from engine thrust and structural integrity to life support and autonomous landing. The V-model provides the framework for decomposing the overall mission into vehicle requirements, then into engine, tank, and avionics requirements. Requirements traceability ensures that every design decision, every manufactured part, and every test performed on a Raptor engine or a Starship flap can be linked directly back to a high-level mission requirement. This is essential for ensuring safety, performance, and ultimately, mission success.

2.  **NASA's Artemis Program:** For missions aiming to return humans to the Moon and eventually Mars, the V-model is the standard lifecycle model. The Orion spacecraft, the Space Launch System (SLS), and the Lunar Gateway all follow this rigorous process. Requirements like "Orion must protect crew from radiation" are decomposed into subsystem requirements (e.g., "Habitat module must provide X amount of shielding"). Traceability allows NASA engineers to verify that the shielding material chosen, its thickness, and its placement in the design directly address the radiation protection requirement, and that subsequent tests validate its effectiveness. Without this, the risk of mission failure or crew harm would be unacceptable.

3.  **Automotive Industry (e.g., Tesla Autopilot):** While not aerospace, autonomous driving systems are complex, safety-critical software-hardware integrations. A requirement like "Vehicle must safely detect and react to pedestrians" is broken down into sensor specifications, processing algorithms, and braking system response times. The V-model guides the development from high-level safety goals to detailed software coding and hardware integration. Requirements traceability ensures that every line of code, every sensor choice, and every test scenario (simulated or real-world) can be traced back to the original safety and performance requirements. This is crucial for certification and public trust.

4.  **Medical Device Manufacturing:** Developing a new MRI machine or a robotic surgical assistant demands extreme precision and reliability. Requirements such as "Device must accurately image soft tissue without harmful radiation" drive the entire development process. The V-model helps manage the complexity of integrating advanced physics (magnetism, RF), precision mechanics, and sophisticated software. Traceability is paramount for regulatory compliance (e.g., FDA approval), proving that every design choice and every test performed ensures patient safety and diagnostic accuracy.

## 3. Prerequisites — what you must know first

Before diving deep into the V-model and requirements traceability, ensure you have a solid grasp of these foundational concepts:

*   **Basic Engineering Design Process:** Understanding the general steps engineers take to solve problems, typically involving defining, designing, building, and testing.
*   **Concept of a "System":** What a system is (a collection of interacting components working together for a common purpose) and how it differs from a simple component.
*   **Project Lifecycle Phases:** Familiarity with common project phases like initiation, planning, execution, monitoring & control, and closure.
*   **Stakeholders:** Who the various people or groups are that have an interest in or are affected by a project (e.g., customers, users, regulators, developers).
*   **Iterative Development:** The idea that projects often involve repeating steps or refining designs based on feedback, rather than a single linear pass.
*   **Verification vs. Validation:** The distinction between "Did we build the system right?" (verification) and "Did we build the right system?" (validation).
*   **Documentation Importance:** Why keeping detailed records, specifications, and reports is crucial in engineering.

## 4. The core idea — step by step

The V-model is a graphical representation of a system development lifecycle that illustrates the relationship between development phases and corresponding testing phases. Requirements traceability is the backbone that connects these phases.

### Step 1: The V-model as a Lifecycle Structure

*   **Plain-English Statement:** Imagine your project as a journey. The V-model is like looking at that journey from above, showing you where you break things down into smaller pieces, build those pieces, and then put them back together and check them. It's called a 'V' because the left side is all about defining and decomposing, the bottom is about building, and the right side is all about integrating and verifying.

*   **Small Concrete Example:** Let's say you're building a simple remote-controlled car.
    *   **Left Side:** You start with the big idea (a remote-controlled car), then decide it needs a motor, a battery, a chassis, and a remote. Then you detail what each of those needs (motor needs to spin at X RPM, battery needs Y voltage, etc.).
    *   **Bottom:** You actually buy/build the motor, battery, chassis, and remote.
    *   **Right Side:** You test the motor on its own, then connect the motor and battery and test them together, then assemble the whole car and test if it drives properly with the remote.

*   **Formal/Mathematical Version:** The V-model is a sequential execution of processes where each development activity on the left side of the 'V' has a corresponding testing activity on the right side.
    $$
    \text{Development Phases (Left Side)} \quad \leftrightarrow \quad \text{Testing Phases (Right Side)}
    $$
    The model emphasizes that testing is not an afterthought but an integral part of each development stage, directly linked to the artifacts produced in the corresponding decomposition phase.

*   **What Could Go Wrong:** Treating the V-model as a purely linear waterfall model where you can't go back. This ignores the iterative nature of real-world projects. Also, not understanding that each "level" on the left side corresponds to a "level" on the right side.

### Step 2: Left Side of the V — Decomposition & Definition

*   **Plain-English Statement:** This is where you figure out *what* you need to build. You start with the big picture (the whole system) and progressively break it down into smaller, more detailed parts. For each part, you define exactly what it needs to do. This is where requirements are born and refined.

*   **Small Concrete Example:** For our remote-controlled car:
    *   **Mission/Concept:** "Build a fun, durable RC car for kids."
    *   **System Requirements:** "Car must be able to drive on grass," "Car must be controlled wirelessly from 10m," "Car must run for 30 minutes on a single charge."
    *   **Subsystem Requirements:** For the "Power System" subsystem, a requirement might be: "Battery must provide 7.2V for 30 minutes under load."
    *   **Component Requirements:** For the "Battery" component, a requirement might be: "Battery must be a 7.2V NiMH pack with 1800mAh capacity."

*   **Formal/Mathematical Version:** This side involves hierarchical decomposition.
    $$
    \text{System Definition} \rightarrow \text{System Requirements} \rightarrow \text{Subsystem Requirements} \rightarrow \text{Component Requirements}
    $$
    Each step involves refining and detailing the requirements from the previous level, often using techniques like functional decomposition, performance specification, and interface definition. This process generates a structured set of verifiable requirements, often stored in a Requirements Management System (RMS).

*   **What Could Go Wrong:** Ambiguous or incomplete requirements are a major pitfall. If a requirement isn't clear or measurable (e.g., "The car should be fast"), it's impossible to design for it or test it effectively. Missing critical requirements entirely can lead to major redesigns later.

### Step 3: The Trough — Design & Implementation

*   **Plain-English Statement:** This is the actual "doing" part. Based on all the detailed requirements you defined on the left side, you now design each part, build it, or write the software for it. This is where ideas turn into tangible components.

*   **Small Concrete Example:** For our RC car:
    *   **System Design:** Overall architecture of the car (where motor goes, how chassis is structured).
    *   **Subsystem Design:** Design of the power system (how battery connects to motor controller).
    *   **Component Design/Implementation:** Detailed CAD drawings for the chassis, circuit diagrams for the motor controller, selecting the specific motor and battery, writing the firmware for the remote control.

*   **Formal/Mathematical Version:** This phase translates the "what" (requirements) into "how" (design) and then into physical or logical artifacts (implementation). It involves:
    *   **Architectural Design:** High-level structure.
    *   **Detailed Design:** Component-level blueprints, schematics, algorithms.
    *   **Coding/Manufacturing:** Production of software modules, hardware components, and assemblies.
    $$
    \text{Component Requirements} \rightarrow \text{Component Design} \rightarrow \text{Component Implementation}
    $$
    This is typically where the bulk of engineering effort in terms of creation occurs.

*   **What Could Go Wrong:** Design flaws (e.g., a chassis design that's too weak), manufacturing defects, or software bugs introduced during this phase. Also, designs that don't actually meet the requirements defined on the left side, indicating a disconnect.

### Step 4: Right Side of the V — Integration & Verification

*   **Plain-English Statement:** Now that you've built all the small pieces, you start putting them together, step by step, and checking if they work. You don't just test the whole thing at the very end; you test each piece, then small groups of pieces, then larger groups, until the whole system is tested. Each test checks if a specific requirement from the left side has been met.

*   **Small Concrete Example:** For our RC car:
    *   **Unit Testing:** Test the motor by itself to ensure it spins at the correct RPM. Test the battery to ensure it holds charge for 30 minutes.
    *   **Integration Testing:** Connect the motor and battery to the motor controller. Test if the motor controller can correctly drive the motor using battery power.
    *   **System Testing:** Assemble the entire car. Test if it responds to the remote control, drives on grass, and runs for 30 minutes.
    *   **Acceptance Testing:** Give the car to a kid (the customer/user) and see if they find it fun and durable.

*   **Formal/Mathematical Version:** This side mirrors the decomposition on the left, but in reverse (integration) and with a focus on proving compliance (verification and validation).
    $$
    \text{Component Testing} \rightarrow \text{Integration Testing} \rightarrow \text{System Testing} \rightarrow \text{Acceptance Testing/Validation}
    $$
    Each testing phase corresponds directly to a development phase on the left side:
    *   Component Testing verifies Component Requirements.
    *   Integration Testing verifies Subsystem Requirements and interfaces.
    *   System Testing verifies System Requirements.
    *   Acceptance Testing/Validation verifies overall Mission/Concept.
    The goal is to demonstrate that the implemented system correctly fulfills all specified requirements.

*   **What Could Go Wrong:** Insufficient testing (e.g., only testing the whole car, not individual parts), finding critical issues late in the process (which means going all the way back to design or even requirements), or tests that don't actually cover the requirements they're supposed to verify.

### Step 5: Requirements Traceability — The Golden Thread

*   **Plain-English Statement:** This is the "notebook" or "golden thread" that connects everything. For every single requirement you wrote down on the left side, you keep a record of which design document addresses it, which component implements it, and which test proves it works. It's like having a clear path from "I want a strong ladder" to "here's the blueprint for the strong ladder," to "here's the strong ladder built," to "here's the test report showing the ladder held 200 lbs."

*   **Small Concrete Example:**
    *   Requirement ID: `REQ-RC-001`: "The RC car shall operate wirelessly up to 10 meters."
    *   This requirement traces to:
        *   Design Document: `DD-RC-003-RF-Module` (specifying a 2.4GHz radio module).
        *   Component: `PN-RF-24G-01` (the actual radio module part number).
        *   Test Case: `TC-RC-005-RangeTest` (a test where the car is driven away from the remote, measuring distance).
        *   Test Report: `TR-RC-005-RangeTest-Pass` (documenting the successful test result).
    *   If `TC-RC-005-RangeTest` fails, you immediately know `REQ-RC-001` is not met, and you can investigate `DD-RC-003-RF-Module` or `PN-RF-24G-01`.

*   **Formal/Mathematical Version:** Requirements traceability establishes a bidirectional link between requirements and other system lifecycle artifacts (design elements, code modules, test cases, documentation). It can be represented as a matrix or a graph:
    $$
    \text{Requirement}_i \leftrightarrow \text{Design Element}_j \leftrightarrow \text{Implementation Module}_k \leftrightarrow \text{Test Case}_l
    $$
    *   **Forward Traceability:** From requirements down to design, implementation, and test (ensuring all requirements are addressed).
    *   **Backward Traceability:** From test results, implementation, or design back to the originating requirement (ensuring no "gold plating" or unverified features).
    This ensures completeness, consistency, and verifiability of the system.

*   **What Could Go Wrong:** Lack of traceability is a common and dangerous trap. If you can't prove that a requirement has been met, or if you don't know which requirement a failed test relates to, you lose control over the project. This can lead to non-compliance, safety issues, or building features nobody asked for.

### Step 6: The Iterative Nature

*   **Plain-English Statement:** The V-model might look like a straight path, but in reality, you often have to go back. If a test fails, or if a new requirement comes up, you don't just push forward. You go back to the relevant step on the left side (design, or even requirements) to fix the issue, and then come back down and up the 'V' again. It's a cycle of refinement.

*   **Small Concrete Example:** During the "System Testing" of our RC car, we discover it can't drive on thick grass, even though "Car must be able to drive on grass" was a requirement.
    *   We trace this failure back to the "System Requirements" phase.
    *   We might then go back to "Subsystem Design" to consider a more powerful motor or larger wheels.
    *   This leads to "Component Implementation" (new motor/wheels), then "Unit Testing" (new motor/wheels), then "Integration Testing," and finally "System Testing" again to verify the fix.

*   **Formal/Mathematical Version:** While the V-model depicts a single pass, in practice, it incorporates feedback loops and iterations.
    $$
    \text{If Test_Phase}_X \text{ Fails} \Rightarrow \text{Return to Development_Phase}_Y
    $$
    This implies robust change management processes and configuration control to manage modifications to requirements, designs, and implementations. Each iteration refines the system, addressing identified deficiencies or incorporating new insights.

*   **What Could Go Wrong:** Ignoring feedback or trying to force a linear progression despite issues. This "pushing forward" mentality can lead to accumulating defects, costly rework late in the project, or even project failure. Not properly managing changes to requirements or designs during iterations can also lead to confusion and errors.

## 5. Worked examples — multiple, with every step shown

### Example 1 (Easy): Building a simple temperature sensor for a home automation system.

**Problem:** Design and verify a temperature sensor module that reports room temperature to a central hub.

**Given:**
*   **High-level Requirement (HLR-001):** The home automation system shall monitor room temperature.
*   **Derived Requirement (DR-001):** The temperature sensor module shall measure temperature between $0^\circ C$ and $50^\circ C$.
*   **Derived Requirement (DR-002):** The temperature sensor module shall have an accuracy of $\pm 1^\circ C$.
*   **Derived Requirement (DR-003):** The temperature sensor module shall transmit data wirelessly.

**What we want:** To demonstrate how DR-002 (accuracy) is addressed through the V-model and traceability.

---

**Step 1: Decomposition (Left side of V - Requirements)**
*   **DR-002:** The temperature sensor module shall have an accuracy of $\pm 1^\circ C$.
    *   *Explanation:* This is our specific requirement we're focusing on. It's derived from the higher-level need to monitor temperature.

**Step 2: Design (Trough of V - Detailed Design)**
*   **Design Decision (DD-TS-001):** Select a specific temperature sensor component.
    *   *Explanation:* To meet DR-002, we need to choose a sensor chip. We research available sensors.
*   **Decision:** Choose the `LM35` analog temperature sensor.
    *   *Explanation:* The LM35 datasheet specifies an accuracy of $\pm 0.5^\circ C$ at $25^\circ C$, which is within our $\pm 1^\circ C$ requirement.
*   **Design Document Entry (DDE-TS-001):** The circuit design shall incorporate the LM35 sensor connected to an Analog-to-Digital Converter (ADC) input of a microcontroller.
    *   *Explanation:* This specifies how the chosen sensor will be integrated into the module's circuit.

**Step 3: Implementation (Trough of V - Coding/Manufacturing)**
*   **Component Acquisition (CA-TS-001):** Purchase `LM35` temperature sensor ICs.
    *   *Explanation:* We get the actual physical component.
*   **Module Assembly (MA-TS-001):** Assemble the sensor module, including the LM35, microcontroller, and wireless transmitter.
    *   *Explanation:* The physical construction of the module.
*   **Firmware Development (FWD-TS-001):** Write firmware to read the ADC value from the LM35 and convert it to temperature in degrees Celsius.
    *   *Explanation:* The software that makes the sensor work. It includes a calibration step if necessary, but for LM35, direct conversion is often used.

**Step 4: Verification (Right side of V - Testing)**
*   **Test Case Definition (TC-TS-001):** Verify DR-002: Temperature Sensor Accuracy Test.
    *   *Explanation:* We define how we will test the accuracy.
    *   **Procedure:**
        1.  Place the assembled temperature sensor module in an environmental chamber.
        2.  Place a calibrated reference thermometer in the chamber next to the module.
        3.  Set the chamber to $10^\circ C$, $25^\circ C$, and $40^\circ C$.
        4.  At each temperature, record the reading from the reference thermometer and the reading from our sensor module.
        5.  Calculate the difference between the module's reading and the reference reading.
        6.  **Pass Criteria:** The absolute difference must be less than or equal to $1^\circ C$ at all tested points.

*   **Test Execution (TE-TS-001):** Execute TC-TS-001.
    *   *Explanation:* Perform the test.
    *   **Results:**
        *   Chamber $10^\circ C$: Reference $10.0^\circ C$, Module $10.2^\circ C$. Difference $= 0.2^\circ C$.
        *   Chamber $25^\circ C$: Reference $25.0^\circ C$, Module $24.8^\circ C$. Difference $= -0.2^\circ C$.
        *   Chamber $40^\circ C$: Reference $40.0^\circ C$, Module $39.9^\circ C$. Difference $= -0.1^\circ C$.
    *   All differences are within $\pm 1^\circ C$.

*   **Test Report (TR-TS-001):** TC-TS-001 passed. DR-002 is verified.
    *   *Explanation:* Document the outcome.

**Step 5: Traceability**
*   **Traceability Linkage:**
    *   DR-002 ("accuracy $\pm 1^\circ C$")
        *   $\rightarrow$ DD-TS-001 (LM35 sensor selection)
        *   $\rightarrow$ DDE-TS-001 (Circuit design for LM35)
        *   $\rightarrow$ CA-TS-001 (LM35 acquisition)
        *   $\rightarrow$ FWD-TS-001 (Firmware for LM35)
        *   $\rightarrow$ TC-TS-001 (Accuracy Test Case)
        *   $\rightarrow$ TE-TS-001 (Test Execution Results)
        *   $\rightarrow$ TR-TS-001 (Test Report indicating pass)

---
**Final Answer:** **DR-002, the requirement for $\pm 1^\circ C$ accuracy, is successfully traced from its definition through design, implementation, and verified by passing Test Case TC-TS-001.**

**Reflection:** This example highlights how a single requirement drives specific design choices and dictates a particular test. The traceability ensures that if the test failed, we would immediately know which requirement was at risk and could investigate the linked design and implementation artifacts.

### Example 2 (Medium): Designing a Satellite's Attitude Control System (ACS) Reaction Wheel.

**Problem:** A satellite's ACS requires a reaction wheel that can generate a specific torque to reorient the spacecraft.

**Given:**
*   **System Requirement (SR-ACS-001):** The satellite shall maintain its pointing accuracy within $0.01^\circ$ during normal operations.
*   **Derived Requirement (DR-RW-001):** The reaction wheel shall generate a maximum torque of $10 \, \text{mNm}$ (milliNewton-meters).
*   **Derived Requirement (DR-RW-002):** The reaction wheel shall have a maximum power consumption of $5 \, \text{W}$.
*   **Derived Requirement (DR-RW-003):** The reaction wheel shall operate in vacuum conditions (pressure $< 10^{-6} \, \text{Torr}$).

**What we want:** To demonstrate the V-model and traceability for DR-RW-001 (maximum torque).

---

**Step 1: Decomposition (Left side of V - Requirements)**
*   **DR-RW-001:** The reaction wheel shall generate a maximum torque of $10 \, \text{mNm}$.
    *   *Explanation:* This is a critical performance requirement for the reaction wheel, derived from the overall satellite pointing accuracy.

**Step 2: Design (Trough of V - Detailed Design)**
*   **Design Decision (DD-RW-001):** Select a motor type and wheel inertia.
    *   *Explanation:* Torque is a product of motor current/magnetic field and the inertia of the spinning wheel. We need to design or select these.
*   **Calculation for Torque:**
    The torque $\tau$ generated by a reaction wheel is given by the change in angular momentum $\vec{L}$ over time:
    $$
    \tau = \frac{d\vec{L}}{dt} = I \frac{d\omega}{dt} = I \alpha
    $$
    where $I$ is the moment of inertia of the wheel and $\alpha$ is the angular acceleration.
    Alternatively, for a DC motor, torque is proportional to current:
    $$
    \tau = K_t I_{motor}
    $$
    where $K_t$ is the motor torque constant and $I_{motor}$ is the motor current.
    *   *Explanation:* We need to ensure our motor and wheel can achieve $10 \, \text{mNm}$. Let's assume we select a motor with $K_t = 0.005 \, \text{Nm/A}$.
    *   Required current: $I_{motor} = \frac{\tau}{K_t} = \frac{10 \times 10^{-3} \, \text{Nm}}{0.005 \, \text{Nm/A}} = 2 \, \text{A}$.
    *   *Explanation:* This means our motor driver must be able to supply 2A.
*   **Design Document Entry (DDE-RW-001):** The reaction wheel assembly shall utilize a brushless DC motor with a torque constant $K_t \ge 0.005 \, \text{Nm/A}$ and a wheel with moment of inertia $I = 0.001 \, \text{kg m}^2$. The motor driver shall be capable of supplying $2 \, \text{A}$ peak current.
    *   *Explanation:* This formally captures the design choices based on the torque requirement.

**Step 3: Implementation (Trough of V - Coding/Manufacturing)**
*   **Component Acquisition (CA-RW-001):** Purchase a specific brushless DC motor (e.g., "Maxon EC 22") and fabricate a reaction wheel from aluminum alloy.
    *   *Explanation:* Physical components are procured or manufactured.
*   **Assembly (MA-RW-001):** Assemble the motor, wheel, bearings, and housing into the reaction wheel unit.
    *   *Explanation:* The physical construction.
*   **Firmware Development (FWD-RW-001):** Develop control algorithms for the motor driver to achieve desired torque commands based on ACS input.
    *   *Explanation:* Software to control the wheel's speed and acceleration, thus controlling torque.

**Step 4: Verification (Right side of V - Testing)**
*   **Test Case Definition (TC-RW-001):** Verify DR-RW-001: Reaction Wheel Maximum Torque Test.
    *   *Explanation:* How we will test the torque.
    *   **Procedure:**
        1.  Mount the reaction wheel on a torque test stand (e.g., using a calibrated torque transducer).
        2.  Apply a command to the reaction wheel controller to achieve maximum angular acceleration.
        3.  Measure the peak torque generated by the wheel using the torque transducer.
        4.  **Pass Criteria:** The measured peak torque must be $\ge 10 \, \text{mNm}$.

*   **Test Execution (TE-RW-001):** Execute TC-RW-001.
    *   *Explanation:* Perform the test.
    *   **Results:**
        *   Measured peak torque: $10.5 \, \text{mNm}$.
    *   The measured torque is $\ge 10 \, \text{mNm}$.

*   **Test Report (TR-RW-001):** TC-RW-001 passed. DR-RW-001 is verified.
    *   *Explanation:* Document the outcome.

**Step 5: Traceability**
*   **Traceability Linkage:**
    *   DR-RW-001 ("max torque $10 \, \text{mNm}$")
        *   $\rightarrow$ DD-RW-001 (Motor/wheel selection, current calculation)
        *   $\rightarrow$ DDE-RW-001 (Design specification of motor/driver)
        *   $\rightarrow$ CA-RW-001 (Motor/wheel acquisition)
        *   $\rightarrow$ FWD-RW-001 (Control firmware)
        *   $\rightarrow$ TC-RW-001 (Max Torque Test Case)
        *   $\rightarrow$ TE-RW-001 (Test Execution Results)
        *   $\rightarrow$ TR-RW-001 (Test Report indicating pass)
        *   $\leftarrow$ SR-ACS-001 (Overall pointing accuracy requirement)

---
**Final Answer:** **DR-RW-001, the requirement for $10 \, \text{mNm}$ maximum torque, is successfully traced from its derivation from the system-level pointing accuracy, through detailed design and implementation of the reaction wheel, and verified by passing Test Case TC-RW-001, which measured $10.5 \, \text{mNm}$.**

**Reflection:** This example shows how a performance requirement (torque) directly influences component selection and electrical design (motor constant, current). It also demonstrates how a test must be specifically designed to measure that performance. The backward traceability to SR-ACS-001 ensures we remember *why* this torque is needed.

### Example 3 (Hard): Ensuring a Mars Rover's Scientific Instrument Data Integrity.

**Problem:** A Mars rover's Spectrometer Instrument (SI) must transmit its scientific data to Earth with guaranteed integrity, even through intermittent communication links.

**Given:**
*   **Mission Requirement (MR-001):** All scientific data collected by the rover shall be transmitted to Earth for analysis.
*   **System Requirement (SR-SI-001):** The Spectrometer Instrument (SI) shall acquire and store scientific data.
*   **Derived Requirement (DR-SI-001):** The SI shall store data with error detection and correction (EDAC) codes.
*   **Derived Requirement (DR-SI-002):** The SI shall transmit data packets with a checksum.
*   **Derived Requirement (DR-SI-003):** The SI's data storage system shall have a Mean Time To Data Loss (MTTDL) of at least 10 years.

**What we want:** To demonstrate the V-model and traceability for DR-SI-003 (MTTDL of 10 years). This involves reliability engineering and statistical analysis.

---

**Step 1: Decomposition (Left side of V - Requirements)**
*   **DR-SI-003:** The SI's data storage system shall have a Mean Time To Data Loss (MTTDL) of at least 10 years.
    *   *Explanation:* This is a critical reliability requirement, ensuring the long-term integrity of precious scientific data. It's derived from the mission's long operational lifespan.

**Step 2: Design (Trough of V - Detailed Design)**
*   **Design Decision (DD-SI-001):** Select data storage technology and architecture.
    *   *Explanation:* To achieve a high MTTDL, we need robust storage.
*   **Architectural Design (AD-SI-001):** The data storage system shall employ solid-state NAND flash memory with a RAID-1 (mirroring) configuration for critical data, managed by a dedicated Flight Data Recorder (FDR) controller. Additionally, it will use a Hamming code for EDAC on each data block.
    *   *Explanation:* This specifies the redundancy and error correction mechanisms. RAID-1 provides hardware redundancy, and Hamming codes provide software redundancy.
*   **Reliability Analysis (RA-SI-001):** Perform a reliability block diagram analysis and FMEA (Failure Mode and Effects Analysis) for the proposed storage system.
    *   *Explanation:* This is a design-phase activity to *predict* if the design meets the MTTDL.
    *   **Calculation (Simplified):** If a single flash memory module has a Mean Time To Failure (MTTF) of 5 years, and we use two in a RAID-1 configuration, the system MTTF (and thus MTTDL) is significantly increased. For a simple redundant system where either component can fail without system failure, if $R_1(t) = e^{-\lambda_1 t}$ and $R_2(t) = e^{-\lambda_2 t}$ are individual reliabilities, system reliability $R_S(t) = 1 - (1-R_1(t))(1-R_2(t))$. If $\lambda_1 = \lambda_2 = \lambda$ (failure rate, inverse of MTTF), then for small $t$, $R_S(t) \approx 1 - (\lambda t)^2$. The MTTF of such a system is approximately $1.5 \times \text{MTTF}_{\text{single}}$ if repair is not possible, or much higher if repair/replacement is possible (which isn't on Mars). With EDAC, the effective failure rate is further reduced.
    *   **Result:** The analysis, considering component MTTF values, controller reliability, and EDAC effectiveness, predicts an MTTDL of 12 years for the proposed architecture. This meets DR-SI-003.
*   **Design Document Entry (DDE-SI-001):** Specifies the exact NAND flash modules, FDR controller, and EDAC algorithm parameters.

**Step 3: Implementation (Trough of V - Coding/Manufacturing)**
*   **Component Acquisition (CA-SI-001):** Procure radiation-hardened NAND flash modules and the FDR controller.
    *   *Explanation:* Critical components are acquired.
*   **Assembly (MA-SI-001):** Assemble the data storage board with redundant flash modules and the FDR.
    *   *Explanation:* Physical construction.
*   **Firmware Development (FWD-SI-001):** Implement the RAID-1 logic, Hamming code generation/checking, and bad block management within the FDR firmware.
    *   *Explanation:* The software that ensures data integrity and redundancy.

**Step 4: Verification (Right side of V - Testing)**
*   **Test Case Definition (TC-SI-001):** Verify DR-SI-003: Data Storage System Accelerated Life Test and Fault Injection.
    *   *Explanation:* We cannot wait 10 years. We use accelerated testing and fault injection.
    *   **Procedure:**
        1.  **Accelerated Life Test:** Subject multiple prototype storage units to extreme temperature cycling, radiation exposure, and vibration for an extended period (e.g., 6 months), mimicking 10 years of Mars environment stresses, using established acceleration factors. Continuously write and read data.
        2.  **Fault Injection Test (Software):** Deliberately introduce single-bit and multi-bit errors into the raw data stored in the flash memory (e.g., by flipping bits directly) and verify that the EDAC mechanism detects and corrects them.
        3.  **Fault Injection Test (Hardware):** Simulate failure of one of the RAID-1 mirrored flash modules and verify that the system continues to operate and retrieve data from the remaining healthy module.
        4.  **Pass Criteria:**
            *   No data loss observed during accelerated life testing.
            *   All single-bit errors are corrected, and multi-bit errors are detected (or corrected if within code capability) during fault injection.
            *   System remains operational and data accessible after simulated module failure.

*   **Test Execution (TE-SI-001):** Execute TC-SI-001.
    *   *Explanation:* Perform the tests.
    *   **Results:**
        *   Accelerated life tests show no data loss.
        *   All injected single-bit errors are corrected; injected double-bit errors are detected.
        *   System successfully recovers and operates using the remaining module after simulated failure.

*   **Test Report (TR-SI-001):** TC-SI-001 passed. DR-SI-003 is verified by analysis and testing.
    *   *Explanation:* Document the outcome. Note that for MTTDL, verification is often a combination of analysis (prediction) and testing (demonstration of robustness).

**Step 5: Traceability**
*   **Traceability Linkage:**
    *   DR-SI-003 ("MTTDL of 10 years")
        *   $\rightarrow$ DD-SI-001 (Storage technology selection)
        *   $\rightarrow$ AD-SI-001 (RAID-1, EDAC architecture)
        *   $\rightarrow$ RA-SI-001 (Reliability analysis predicting 12 years)
        *   $\rightarrow$ DDE-SI-001 (Detailed component specs)
        *   $\rightarrow$ CA-SI-001 (Component acquisition)
        *   $\rightarrow$ FWD-SI-001 (Firmware for RAID/EDAC)
        *   $\rightarrow$ TC-SI-001 (Accelerated Life & Fault Injection Test)
        *   $\rightarrow$ TE-SI-001 (Test Execution Results)
        *   $\rightarrow$ TR-SI-001 (Test Report indicating pass)
        *   $\leftarrow$ SR-SI-001 (Instrument data storage)
        *   $\leftarrow$ MR-001 (All scientific data transmitted)

---
**Final Answer:** **DR-SI-003, the requirement for a 10-year MTTDL for the Spectrometer Instrument's data storage, is successfully traced. It was addressed by an architectural design incorporating RAID-1 and EDAC, predicted to meet the requirement via reliability analysis, implemented with radiation-hardened components and robust firmware, and verified through a combination of accelerated life testing and fault injection tests.**

**Reflection:** This example highlights that not all requirements can be verified by a simple pass/fail test. Reliability requirements often rely on a combination of predictive analysis during design and rigorous, often accelerated, testing or fault injection during verification. Traceability ensures that these complex verification methods are clearly linked back to the original, critical reliability requirements.

### Example 4 (Conceptual): Tracing a Safety Requirement for a Rocket Engine's Propellant Valve.

**Problem:** A critical safety requirement for a liquid rocket engine's main propellant valve.

**Given:**
*   **System Safety Requirement (SSR-001):** The engine shall not experience an uncontrolled shutdown (e.g., explosion) due to valve malfunction.
*   **Derived Requirement (DR-PV-001):** The main propellant valve shall fail-safe (close) upon loss of control signal or power.
*   **Derived Requirement (DR-PV-002):** The main propellant valve shall have a single point of failure probability $< 10^{-7}$.

**What we want:** To conceptually trace DR-PV-001 and briefly touch upon DR-PV-002.

---

**Step 1: Decomposition (Left side of V - Requirements)**
*   **DR-PV-001:** The main propellant valve shall fail-safe (close) upon loss of control signal or power.
    *   *Explanation:* This is a critical safety requirement. If power or signal is lost, the valve must shut off propellant flow to prevent an uncontrolled event.

**Step 2: Design (Trough of V - Detailed Design)**
*   **Design Decision (DD-PV-001):** Select valve actuation mechanism.
    *   *Explanation:* How the valve opens and closes.
*   **Architectural Design (AD-PV-001):** The main propellant valve shall be a normally-closed, spring-loaded valve. An electrical actuator will be used to *open* the valve by compressing the spring. Upon loss of electrical power or control signal, the spring shall automatically return the valve to its closed position.
    *   *Explanation:* This directly addresses DR-PV-001. The "fail-safe" mechanism is inherent in the spring-loaded design.
*   **Detailed Design (DDE-PV-001):** Specifies spring constant, actuator force, materials, and interface with control system. For DR-PV-002, a Fault Tree Analysis (FTA) or Probabilistic Risk Assessment (PRA) would be conducted here to ensure the probability of failure is below $10^{-7}$, potentially leading to redundant actuators or control paths.

**Step 3: Implementation (Trough of V - Coding/Manufacturing)**
*   **Component Acquisition (CA-PV-001):** Procure specialized, flight-qualified spring, actuator, and valve body.
    *   *Explanation:* These are high-reliability components.
*   **Assembly (MA-PV-001):** Precision assembly of the valve, ensuring correct spring tension and actuator integration.
    *   *Explanation:* Critical assembly steps.
*   **Firmware Development (FWD-PV-001):** Develop control software for the actuator, with watchdog timers and error handling for signal loss.
    *   *Explanation:* Software to manage the actuator, but also to detect and react to signal loss.

**Step 4: Verification (Right side of V - Testing)**
*   **Test Case Definition (TC-PV-001):** Verify DR-PV-001: Fail-Safe Actuation Test.
    *   *Explanation:* How we will test the fail-safe mechanism.
    *   **Procedure:**
        1.  Connect the valve to a test rig with simulated propellant pressure.
        2.  Apply power and a "open" command to the valve actuator.
        3.  Verify the valve opens.
        4.  **Simulate Power Loss:** Abruptly cut power to the actuator while the valve is open.
        5.  **Simulate Signal Loss:** Restore power but cut the control signal to the actuator while the valve is open.
        6.  **Pass Criteria:** In both power loss and signal loss scenarios, the valve must fully close within a specified time (e.g., $100 \, \text{ms}$).

*   **Test Execution (TE-PV-001):** Execute TC-PV-001.
    *   *Explanation:* Perform the tests.
    *   **Results:**
        *   Upon power loss, valve closed in $85 \, \text{ms}$.
        *   Upon signal loss, valve closed in $92 \, \text{ms}$.
    *   Both results are within the $100 \, \text{ms}$ criteria.

*   **Test Report (TR-PV-001):** TC-PV-001 passed. DR-PV-001 is verified.
    *   *Explanation:* Document the outcome.

**Step 5: Traceability**
*   **Traceability Linkage:**
    *   DR-PV-001 ("fail-safe close")
        *   $\rightarrow$ DD-PV-001 (Valve actuation mechanism selection)
        *   $\rightarrow$ AD-PV-001 (Spring-loaded design)
        *   $\rightarrow$ DDE-PV-001 (Detailed design specs)
        *   $\rightarrow$ CA-PV-001 (Component acquisition)
        *   $\rightarrow$ FWD-PV-001 (Actuator control firmware)
        *   $\rightarrow$ TC-PV-001 (Fail-Safe Actuation Test)
        *   $\rightarrow$ TE-PV-001 (Test Execution Results)
        *   $\rightarrow$ TR-PV-001 (Test Report indicating pass)
        *   $\leftarrow$ SSR-001 (Engine safety requirement)

---
**Final Answer:** **DR-PV-001, the requirement for the main propellant valve to fail-safe (close) upon loss of control signal or power, is conceptually traced. This was addressed by designing a normally-closed, spring-loaded valve. Its implementation involved procuring and assembling specific components and developing control firmware. Verification was achieved through Test Case TC-PV-001, which successfully demonstrated the valve's closure within the specified time upon simulated power and signal loss, thus contributing to the overall engine safety requirement (SSR-001).**

**Reflection:** This example emphasizes the critical nature of safety requirements and how they drive fundamental design decisions (like spring-loaded mechanisms). Traceability here is not just about functionality, but about proving that a safety-critical feature is robustly implemented and verified, directly mitigating a significant risk.

## 6. Common mistakes and traps

1.  **Treating the V-model as purely linear (Waterfall in disguise):** Students often see the 'V' and assume it's a strict, one-way progression. This ignores the iterative nature, feedback loops, and need to revisit earlier stages when problems are found.
2.  **Neglecting Requirements Traceability:** Failing to establish clear links between requirements, design, implementation, and test cases. This leads to "orphan" requirements (not built or tested) or "gold-plated" features (built but not required), making verification and validation impossible.
3.  **Ambiguous or Unverifiable Requirements:** Writing requirements that are subjective ("The system should be user-friendly") or lack measurable criteria ("The rocket should fly fast"). If you can't measure it, you can't verify it.
4.  **Insufficient Testing at Lower Levels:** Skipping unit or integration testing and relying solely on system-level testing. This pushes defect discovery to very late stages, making fixes exponentially more expensive and time-consuming.
5.  **Poor Communication Between "Sides" of the V:** Design teams on the left side of the V (decomposition) not adequately communicating with testing teams on the right side (integration/verification). This can lead to tests that don't match requirements or designs that are untestable.
6.  **Scope Creep without Change Control:** Allowing new requirements or changes to existing ones without properly updating traceability, re-evaluating design, or re-planning tests. This undermines the V-model's structure and traceability's integrity.

## 7. Textbook-precise explanation

Systems engineering is an interdisciplinary field of engineering and management that focuses on how to design, integrate, and manage complex systems over their life cycles. The V-model and requirements traceability are foundational concepts within this discipline.

The **V-model** is a graphical representation of a system development lifecycle, often described as a variant of the waterfall model, but explicitly emphasizing the relationship between development activities and corresponding verification and validation activities. It delineates the hierarchical decomposition of the system on the left side of the 'V' and the subsequent integration and verification/validation on the right side.

The phases of the V-model are typically defined as:

**Left Side (Decomposition & Definition):**
*   **Concept/Mission Definition:** The highest-level understanding of the system's purpose and operational environment.
*   **System Requirements Definition:** Translation of concept into measurable, verifiable, and achievable system-level requirements. This includes functional, performance, interface, and non-functional requirements.
*   **System Design (Architecture):** Allocation of system requirements to logical and physical subsystems, defining interfaces and overall system architecture.
*   **Subsystem Design:** Detailed design of each subsystem based on allocated requirements.
*   **Component Design:** Detailed design of individual components, including hardware, software units, and human elements.

**Trough (Implementation):**
*   **Component Implementation:** The actual manufacturing of hardware components, coding of software units, and development of human procedures.

**Right Side (Integration & Verification/Validation):**
*   **Component Testing (Unit Testing):** Verification that individual components meet their specified design and requirements.
*   **Subsystem Integration & Testing:** Integration of components into subsystems and verification that subsystems meet their allocated requirements and interfaces.
*   **System Integration & Testing:** Integration of all subsystems into the complete system and verification that the integrated system meets all system requirements.
*   **Acceptance Testing / System Validation:** Validation that the system meets the original concept/mission objectives and satisfies stakeholder needs in its operational environment. This answers "Did we build the *right* system?"
*   **Operations & Maintenance:** Deployment, operational use, and ongoing support of the system.

Each phase on the left side has a corresponding test phase on the right side, ensuring that artifacts produced during decomposition are systematically verified during integration. For instance, System Requirements are validated through System Testing, and Component Design is verified through Component Testing.

**Requirements Traceability** is the ability to describe and follow the life of a requirement, in both a forward and backward direction, from its origin, through its development and specification, to its deployment and use, and through all periods of refinement and change. It establishes explicit, documented links between requirements and other system artifacts, such as:

*   **Parent-Child Traceability:** Linking high-level requirements to lower-level derived requirements.
*   **Design Traceability:** Linking requirements to specific design elements (architectural diagrams, detailed designs, interface control documents).
*   **Implementation Traceability:** Linking requirements to implemented code modules, hardware components, or manufacturing specifications.
*   **Verification Traceability:** Linking requirements to test cases, test procedures, and test results that prove the requirement has been met.
*   **Validation Traceability:** Linking system-level requirements and acceptance criteria to validation activities.

This creates a "golden thread" of information, typically managed within a Requirements Management System (RMS) or Product Lifecycle Management (PLM) tool.
*   **Forward Traceability (from requirements to downstream artifacts):** Ensures that all requirements are addressed in the design, implemented, and tested.
*   **Backward Traceability (from downstream artifacts back to requirements):** Ensures that no "gold-plating" (unnecessary features) occurs and that every design element, piece of code, or test case serves a legitimate requirement.

**Referenced Texts:**
*   INCOSE (International Council on Systems Engineering) Systems Engineering Handbook: A Guide for System Life Cycle Processes and Activities. (Specifically, sections on System Life Cycle Processes and Technical Processes like Requirements Definition, Design, Verification, and Validation).
*   NASA SP-2016-6105 Rev2, NASA Systems Engineering Handbook. (Provides detailed application of SE principles, including the V-model, within NASA projects).

## 8. ASCII diagrams

Here's an ASCII representation of the V-model, emphasizing the left (decomposition) and right (integration/verification) sides, and the central implementation phase.

```text
                                  ^
                                 / \
                                /   \
                               /     \
                              /       \
                             /         \
                            /           \
                           /             \
                          /               \
                         /                 \
        Mission/Concept ------------------- Acceptance Testing/Validation
               |                                 ^
               |                                 |
               |                                 |
               v                                 |
        System Requirements ------------------- System Testing
               |                                 ^
               |                                 |
               |                                 |
               v                                 |
        Subsystem Design ------------------- Integration Testing
               |                                 ^
               |                                 |
               |                                 |
               v                                 |
        Component Design ------------------- Component Testing
               |                                 ^
               |                                 |
               |                                 |
               v                                 |
        Component Implementation (BUILD) <-------+
```

**Explanation of the Diagram:**

*   **Left Side (Decomposition):** Starts at the top with "Mission/Concept" and progressively breaks down the system into more detailed specifications: "System Requirements," "Subsystem Design," and "Component Design." The arrows pointing downwards indicate this breakdown process.
*   **Trough (Implementation):** At the bottom of the 'V' is "Component Implementation (BUILD)," representing the actual creation of the smallest units of the system (e.g., writing code, manufacturing parts).
*   **Right Side (Integration & Verification/Validation):** This side mirrors the left. It starts at the bottom with "Component Testing" (verifying individual components), then moves upwards through "Integration Testing" (putting subsystems together and testing them), "System Testing" (testing the whole system against its requirements), and finally "Acceptance Testing/Validation" (ensuring the system meets the original mission goals and user needs). The arrows pointing upwards indicate the integration and testing process.
*   **Horizontal Lines:** These lines represent the direct correspondence between a development phase on the left and its verification phase on the right. For example, "System Requirements" are verified during "System Testing."
*   **Traceability (Implicit):** While not explicitly drawn with individual lines for every requirement, the entire structure of the V-model implies traceability. Every step on the left should be traceable to a step on the right, and vice-versa. If a test fails on the right, you trace back horizontally and then up the left side to identify the originating requirement or design flaw.

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    *   **The "V" for "Verify Everything":** Think of the 'V' as a giant checklist. The left side is where you *list* everything you want to build and how it should work (your requirements). The right side is where you *verify* that you actually built everything on your list, and that it works as expected. The bottom is where you *build* the smallest pieces.
    *   **The "Golden Thread":** Imagine a golden thread running through every single requirement. From the moment you write it down, that thread connects it to the design drawing, the specific part, the piece of code, and the test report. If the thread breaks anywhere, you have a problem.

2.  **Formulas/Facts They MUST Overlearn:**
    1.  **The V-model is a lifecycle model that links development (decomposition) to testing (integration).** Left side = defining and breaking down. Right side = building up and checking.
    2.  **Requirements Traceability is bidirectional.** It ensures every requirement is built and tested (forward trace) and that everything built/tested corresponds to a requirement (backward trace).
    3.  **Core V-model phases (simplified):** Requirements $\rightarrow$ Design $\rightarrow$ Build $\rightarrow$ Test $\rightarrow$ Integrate $\rightarrow$ Validate.

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review this entire lesson. Draw the V-model from memory. Explain traceability in your own words.
    *   **Day 3:** Briefly review the V-model diagram and the definition of traceability. Try to recall one example for each side of the V.
    *   **Day 7:** Redraw the V-model and list the corresponding activities on each side. Explain why traceability is bidirectional.
    *   **Day 16:** Think of a new complex system (not covered in the lesson) and mentally walk it through the V-model, identifying key requirements and how you'd trace them.
    *   **Day 35:** Explain the V-model and traceability to an imaginary peer, using an analogy they would understand. Focus on the "why it matters" aspect.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the V-model, ask yourself:
    *   "How would I build something really, really complicated (like a rocket) from scratch, ensuring it works perfectly and safely?"
    *   You'd start with a big idea, then break it down into smaller pieces (requirements, design). That's the left side.
    *   Then you'd build those small pieces (implementation). That's the bottom.
    *   Then you'd put the small pieces together, checking each step as you go, until the whole thing is built and tested (integration, verification, validation). That's the right side.
    *   "How would I make sure I didn't forget anything, and that everything I built was actually needed?" You'd keep a detailed record, linking every decision and every part back to the original needs. That's traceability.
    This natural thought process will lead you back to the core structure of the V-model and the necessity of traceability.

## 10. Connections — what this leads to

Understanding the V-model and requirements traceability is fundamental to many advanced topics in aerospace engineering and systems management:

*   **Verification and Validation (V&V):** The right side of the V-model *is* V&V. This lesson provides the framework for understanding how V&V activities are planned, executed, and documented throughout the lifecycle.
*   **Risk Management:** Unclear requirements, untraceable changes, or insufficient testing (failures in V-model adherence or traceability) are major sources of project risk. This knowledge is crucial for identifying, assessing, and mitigating those risks.
*   **Configuration Management:** As systems evolve through the V-model, requirements, designs, code, and test cases change. Configuration management processes ensure that these artifacts are version-controlled, their relationships are maintained (via traceability), and changes are controlled.
*   **Change Management:** When a test fails or a new requirement emerges, the V-model implies going back. Change management provides the formal process for evaluating the impact of changes, approving them, and updating all affected artifacts (which traceability helps identify).
*   **Space Mission Assurance:** This discipline relies heavily on rigorous systems engineering processes, including the V-model and comprehensive traceability, to ensure the reliability, safety, and success of space missions.
*   **Certification and Compliance:** For aerospace systems (e.g., FAA, NASA standards), demonstrating compliance with regulations often requires showing complete requirements traceability from high-level safety regulations down to test results.
*   **Agile Development in Systems Engineering:** While the V-model is traditionally seen as sequential, modern systems engineering often integrates agile principles. Understanding the V-model helps in structuring agile sprints within a larger V-model framework, where each sprint might represent a mini-V or contribute to a phase of the overall V.
*   **Model-Based Systems Engineering (MBSE):** MBSE uses models as the primary means of information exchange. The V-model provides the lifecycle context, and traceability is embedded within these models, linking different views and levels of abstraction.
*   **Specialty Engineering Disciplines:** Concepts like reliability engineering, maintainability engineering, and human factors engineering feed their specific requirements into the left side of the V and have their verification activities on the right side, all linked by traceability.

## 11. Self-check questions

1.  Describe the primary purpose of the V-model in complex system development and explain how the left side differs from the right side.
2.  Imagine a requirement for a satellite: "The satellite's solar panels shall generate a minimum of 500 Watts of power in Earth orbit." Outline the types of artifacts you would expect to link to this requirement using forward traceability, from design to verification.
3.  Why is bidirectional traceability considered superior to only forward or only backward traceability? Provide a specific scenario where the lack of backward traceability could lead to problems.
4.  A project team decided to skip component testing and proceed directly to system integration testing. Using the V-model, explain the potential consequences of this decision and how it impacts risk and cost.
5.  Consider a scenario where a critical safety requirement for a rocket's thrust vector control system is "The engine nozzle gimbal shall respond to control commands within 50 milliseconds." Design a conceptual test case (including procedure and pass criteria) that would verify this requirement, and explain how this test would link back to the original requirement within a traceability matrix.