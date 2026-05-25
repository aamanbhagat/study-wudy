## 1. What it is — in plain English

Imagine you have a group of friends, and they all want to share important news with each other, but they only have one telephone line for everyone. They can't all talk at once, or it would be chaos! They need a clear set of rules to decide who gets to speak, when, and how, so that everyone can hear the message correctly and important news isn't missed.

The CAN bus is a lot like that shared telephone line for electronic devices. It's a special kind of communication system used inside things like cars, airplanes, or industrial machines. Instead of many wires connecting every single device to every other device (which would be a tangled mess!), CAN uses just two wires that all the devices plug into.

When a device wants to send a message, it puts its message onto these shared wires. But here's the clever part: every message has a unique "ID" or priority tag. If two devices try to talk at the exact same time, the CAN bus has a built-in "referee" system that immediately decides which message is more important (the one with the lower ID) and lets it through, while the less important message waits its turn. This way, critical information, like "the brakes are failing!", always gets through first.

## 2. Why it matters — real-world applications

The CAN bus is absolutely crucial for modern technology because it provides a robust, efficient, and reliable way for different electronic components to communicate, especially in environments where real-time performance and safety are paramount.

1.  **Aerospace (Criticality Highlighted):** In aircraft, CAN bus (and its derivatives like ARINC 825) is fundamental for "fly-by-wire" systems, where pilot commands are translated into electronic signals that control flight surfaces. For example, in the **Airbus A380** or **Boeing 787**, various sensors (airspeed, altitude), actuators (flaps, rudder), and control units (engine management, landing gear) constantly exchange data over CAN. Its error detection and arbitration features are vital for ensuring that critical flight control messages are prioritized and delivered without corruption, even in the presence of electromagnetic interference or component failures. The redundancy built into aerospace systems often involves multiple CAN buses.
2.  **Automotive Industry:** This is where CAN bus originated and is most widely used. Almost every modern car, from a **Ford F-150** to a **Mercedes-Benz S-Class**, uses CAN to connect its various Electronic Control Units (ECUs). This includes the engine control unit, anti-lock braking system (ABS), airbags, power steering, infotainment system, and even electric window controls. CAN allows these systems to share sensor data (e.g., wheel speed from ABS to engine control for traction control) and coordinate actions, making vehicles safer, more efficient, and more feature-rich.
3.  **Industrial Automation and Robotics:** In factories, CAN bus is used to connect programmable logic controllers (PLCs), sensors, actuators, and robotic arms. For instance, a **FANUC robot** in an assembly line might use CAN to communicate precise joint positions and motor commands in real-time. Its deterministic arbitration ensures that emergency stop signals or critical synchronization commands are always processed immediately, maintaining safety and production efficiency.
4.  **Medical Devices:** High-precision medical equipment, such as MRI machines, CT scanners, and patient monitoring systems, often employ CAN bus. It enables reliable communication between different modules – for example, a sensor measuring a patient's vital signs might send data to a display unit and a central monitoring station via CAN, ensuring that life-critical information is transmitted accurately and promptly.

## 3. Prerequisites — what you must know first

Before diving deep into the CAN bus, ensure you have a solid grasp of these foundational concepts:

*   **Digital Logic & Binary:** Understanding bits (0s and 1s), bytes, hexadecimal, and how data is represented digitally.
*   **Basic Electronics:** Concepts of voltage levels, electrical signals, pull-up/pull-down resistors, and the idea of a bus (shared communication line).
*   **Network Fundamentals:** Basic understanding of nodes (devices), packets (messages), protocols (rules for communication), and broadcast communication.
*   **Embedded Systems Basics:** Familiarity with microcontrollers, how they interact with peripherals, and the concept of interrupts.
*   **Real-time Systems Concepts:** An appreciation for determinism (predictable timing), latency (delay), and throughput in time-critical applications.
*   **Data Structures (Basic):** How data can be organized into structures or bit fields.

## 4. The core idea — step by step

The CAN bus is a message-based protocol designed for robust and efficient communication among multiple electronic control units (ECUs) in real-time applications. Its core strength lies in its ability to manage concurrent access to a shared bus without a central controller, using a clever arbitration scheme, and its robust error handling.

### ### Step 1: The Shared Bus and Differential Signaling

**Plain-English Statement:** Instead of each device having its own separate wire to talk to every other device, all devices share just two wires. To make communication reliable even in noisy environments (like a car engine bay), messages are sent as a difference in voltage between these two wires, rather than a single voltage compared to ground.

**Concrete Example:** Imagine you have 10 sensors and 10 actuators in an airplane wing. If each needed a direct wire to every other, you'd have $10 \times 9 / 2 = 45$ pairs of wires. With CAN, you have just two main wires running through the wing, and all 20 devices tap into them. When a device sends a '1', it might make one wire slightly higher voltage than the other; for a '0', it reverses this. The receiving device only cares about the *difference*, ignoring overall noise that affects both wires equally.

**Formal/Mathematical Version:** The CAN physical layer typically uses a twisted pair of wires, CAN_H (High) and CAN_L (Low), for differential signaling.
A **dominant bit (logical 0)** is transmitted when CAN_H is pulled to a higher voltage (e.g., $3.5\text{V}$) and CAN_L is pulled to a lower voltage (e.g., $1.5\text{V}$).
A **recessive bit (logical 1)** is transmitted when both CAN_H and CAN_L are at approximately the same voltage (e.g., $2.5\text{V}$), often achieved by pull-up/pull-down resistors at the bus ends.
The differential voltage $V_{diff} = V_{CAN\_H} - V_{CAN\_L}$.
For dominant: $V_{diff} \approx 2\text{V}$.
For recessive: $V_{diff} \approx 0\text{V}$.

**What could go wrong:** If the wires aren't properly twisted or shielded, external electromagnetic interference (EMI) could introduce noise that affects one wire differently than the other, leading to incorrect interpretation of bits. Also, missing termination resistors at the ends of the bus can cause signal reflections, distorting the message.

### ### Step 2: Message-Based Communication and Arbitration

**Plain-English Statement:** Unlike other networks where you send a message *to* a specific address, on CAN, you send a message *about* something. Every message has an ID, which also acts as its priority. If multiple devices try to send messages at the same time, the message with the *lowest* ID wins the right to continue transmitting, while others back off and wait.

**Concrete Example:** Two sensors, A and B, try to send messages. Sensor A wants to send "Engine Temp: 90C" with ID `0x100`. Sensor B wants to send "Brake Pressure: 500psi" with ID `0x050`. Both start transmitting. When they reach the part of their message containing their IDs, they compare bit by bit. `0x050` is `000001010000` in binary, and `0x100` is `000100000000`. The first difference occurs at the 4th bit (from MSB). Sensor B sends a '0' (dominant) while Sensor A sends a '0' (dominant). Then at the 5th bit, Sensor B sends a '0' (dominant), and Sensor A sends a '0' (dominant). This continues until the 8th bit (from MSB), where Sensor B sends a '1' (recessive) and Sensor A sends a '0' (dominant). Since a dominant bit (0) 'overwrites' a recessive bit (1) on the bus, the bus will show a '0'. Sensor A, seeing a '0' on the bus when it expected to transmit a '1', realizes it has lost arbitration and stops transmitting. Sensor B continues.

**Formal/Mathematical Version:** Arbitration is performed bit-wise non-destructively during the Arbitration Field of the CAN frame.
A dominant bit (logical 0) always "wins" over a recessive bit (logical 1) on the bus. If one node transmits a dominant bit and another transmits a recessive bit at the same time, the bus state will be dominant.
A node monitors the bus while transmitting. If it transmits a recessive bit (1) but observes a dominant bit (0) on the bus, it immediately stops transmitting and becomes a receiver.
The message with the lowest numerical ID value has the highest priority because it will keep transmitting dominant bits for longer during the arbitration phase.

**What could go wrong:** If two nodes are assigned the exact same CAN ID, they will both transmit identical arbitration fields and continue to transmit, leading to a "collision" and an error state. Good system design ensures unique IDs for critical messages.

### ### Step 3: The CAN Frame Format (Standard and Extended)

**Plain-English Statement:** A CAN message isn't just the data; it's a structured "envelope" that contains various fields, like a sender's address, a priority, the actual data, and a way to check for errors. There are two main types: standard (shorter ID) and extended (longer ID).

**Concrete Example:** Imagine sending a text message. It's not just "Hello"; it also includes who it's from, who it's to, and maybe a timestamp. A CAN frame is similar. If a sensor sends `0x123` (ID) and `0xAB` (Data), the actual bits on the bus would look like a long sequence starting with a "Start of Frame" bit, then the `0x123` ID, then a "Data Length Code" indicating 1 byte of data, then `0xAB`, then error checking bits, and finally "End of Frame" bits.

**Formal/Mathematical Version:** The CAN frame is defined by ISO 11898-1.
**Standard CAN Frame (CAN 2.0A):**
*   **SOF (Start Of Frame):** 1 dominant bit.
*   **Arbitration Field:** 11-bit Identifier ($ID_{10}$ to $ID_0$) + RTR (Remote Transmission Request) bit.
    *   $ID$: $2^{11}-1 = 2047$ possible IDs.
    *   RTR: 0 for Data Frame, 1 for Remote Frame.
*   **Control Field:** IDE (Identifier Extension) bit + $r_0$ (reserved) + DLC (Data Length Code).
    *   IDE: 0 for Standard Frame, 1 for Extended Frame.
    *   $r_0$: Reserved bit, always dominant.
    *   DLC: 4 bits, $0-8$ bytes of data.
*   **Data Field:** $0-8$ bytes of actual data.
*   **CRC Field (Cyclic Redundancy Check):** 15-bit CRC + 1-bit CRC Delimiter (recessive).
*   **ACK Field (Acknowledgement):** 1-bit ACK Slot + 1-bit ACK Delimiter.
    *   Transmitter sends recessive in ACK Slot. Receiver sends dominant if message received correctly.
*   **EOF (End Of Frame):** 7 recessive bits.
*   **IFS (Interframe Space):** 3 recessive bits (minimum).

**Extended CAN Frame (CAN 2.0B):**
*   Adds an 18-bit Identifier Extension ($ID_{28}$ to $ID_{11}$) after the 11-bit base ID.
*   Total ID length: 29 bits ($2^{29}-1$ possible IDs).
*   The IDE bit in the Control Field is set to 1.

**What could go wrong:** Incorrectly interpreting a field (e.g., misreading DLC) can lead to data corruption or misaligned reception. If a receiver doesn't acknowledge, the transmitter assumes an error.

### ### Step 4: Bit Stuffing

**Plain-English Statement:** To prevent long sequences of identical bits (which could be mistaken for the "End of Frame" signal or cause timing issues), the CAN bus automatically inserts an opposite bit after every five consecutive identical bits. This is like adding a small, non-meaningful pause to a monotonous speech to keep listeners engaged.

**Concrete Example:** If a part of your message data is `111110000011111`.
After bit stuffing, it becomes: `11111**0**0000**1**1111**0**`.
The bolded bits are "stuff bits" added by the transmitter. The receiver automatically removes them.

**Formal/Mathematical Version:** After five consecutive bits of the same polarity (e.g., `00000` or `11111`), a stuff bit of the opposite polarity is inserted by the transmitter. This applies to all fields from SOF to CRC.
The maximum number of bits in a standard CAN frame (with 8 data bytes) without bit stuffing is $1 + 11 + 1 + 6 + 8 \times 8 + 15 + 1 + 2 + 7 + 3 = 111$ bits.
With bit stuffing, the actual number of bits can be higher. The worst-case bit stuffing ratio is $1/5$, meaning every 5 bits, one additional bit might be added.

**What could go wrong:** If a transmitter fails to insert a stuff bit, or a receiver incorrectly removes one, it leads to a "stuff error," indicating a problem with the message integrity. This is a critical error detection mechanism.

### ### Step 5: Error Detection Mechanisms

**Plain-English Statement:** The CAN bus is paranoid about errors. It uses several clever tricks to detect if a message has been corrupted during transmission. These include checking for consistency in the message structure, looking for specific patterns, and using a mathematical checksum.

**Concrete Example:**
1.  **CRC (Cyclic Redundancy Check):** Before sending, the transmitter performs a complex calculation on the entire message (ID, data, etc.) and generates a small "checksum" number. It sends this checksum along with the message. The receiver performs the *same* calculation. If its calculated checksum doesn't match the one received, it knows the message is bad.
2.  **ACK (Acknowledgement):** After receiving a message, if a receiver thinks it's valid, it signals back to the sender by sending a "dominant" bit in a specific slot. If the sender doesn't see this dominant bit (meaning no one acknowledged or someone acknowledged an error), it knows something went wrong.
3.  **Bit Monitoring:** As a node transmits, it also listens to the bus. If it transmits a '1' but sees a '0' on the bus, it knows another node is transmitting a higher priority message (arbitration) or there's an error (e.g., short circuit).
4.  **Frame Check:** The receiver checks if the received frame conforms to the standard CAN frame format (e.g., correct bit counts for fields, proper delimiters).
5.  **Stuff Error:** As mentioned in Step 4, if more than five consecutive identical bits are received without an intervening stuff bit, it's an error.

**Formal/Mathematical Version:**
*   **CRC:** A 15-bit CRC field is calculated using a polynomial $G(x) = x^{15} + x^{14} + x^{10} + x^8 + x^7 + x^4 + x^3 + x^0$. The message bits (from SOF to Data Field) are treated as a polynomial, divided by $G(x)$, and the remainder is the CRC.
*   **ACK:** The ACK field consists of two bits: ACK Slot and ACK Delimiter. The transmitter sends recessive (1) in the ACK Slot. Any receiver that correctly receives the message will overwrite this with a dominant (0). The ACK Delimiter is always recessive (1).
*   **Bit Monitoring:** Every transmitting node continuously monitors the bus. If it detects a bit value on the bus that is different from the bit it is transmitting (and it's not during arbitration where a recessive bit is overwritten by a dominant ID), it signals a bit error.
*   **Frame Check:** Checks for:
    *   **Form Error:** Incorrect fixed-form bits (e.g., delimiters not recessive, SOF not dominant).
    *   **Stuff Error:** Violation of bit stuffing rules.
    *   **CRC Error:** Calculated CRC does not match received CRC.
    *   **ACK Error:** Transmitter sends recessive in ACK slot but does not detect a dominant bit from any receiver.

**What could go wrong:** A single error detection mechanism might fail in very specific, rare scenarios. However, the combination of multiple mechanisms makes CAN extremely robust. If a node consistently fails CRC checks, it might be faulty.

### ### Step 6: Error Confinement

**Plain-English Statement:** If a device on the CAN bus starts sending bad messages frequently, it could disrupt the entire network. To prevent one "naughty" device from taking down the whole system, CAN has a system to track how many errors each device makes. If a device makes too many errors, it's temporarily "punished" by being silenced, allowing the rest of the network to continue functioning.

**Concrete Example:** Imagine a faulty sensor in an airplane's wing starts sending corrupted temperature readings. If it keeps doing this, other devices might get confused or slow down. The CAN bus protocol keeps two counters for this sensor: one for transmit errors (TEC) and one for receive errors (REC). If the TEC or REC goes above a certain threshold (e.g., 127), the sensor is put into "Error Passive" state, meaning it can still talk but has to wait longer. If it keeps sending bad messages and its TEC goes even higher (e.g., 255), it's put into "Bus-off" state, where it's completely disconnected from the bus and can't send or receive anything until it's reset. This protects critical flight control systems from being overwhelmed by a single faulty component.

**Formal/Mathematical Version:** Each CAN controller maintains two internal counters:
*   **TEC (Transmit Error Counter):** Incremented for transmit errors, decremented for successful transmissions.
*   **REC (Receive Error Counter):** Incremented for receive errors, decremented for successful receptions.

Based on these counters, a CAN node can be in one of three error states:
1.  **Error Active:** (TEC and REC $\le 127$)
    *   Normal operating state.
    *   Detects errors and signals them by transmitting an **Active Error Flag** (6 dominant bits).
2.  **Error Passive:** (TEC or REC $> 127$)
    *   Node is generating too many errors.
    *   Detects errors but transmits a **Passive Error Flag** (6 recessive bits), which does not interfere with other messages.
    *   Must wait for an additional 8 recessive bits (Suspend Transmission) after the Interframe Space before transmitting a new message.
3.  **Bus-off:** (TEC $> 255$)
    *   Node is severely faulty.
    *   Completely disconnected from the bus. Cannot transmit or receive.
    *   Requires software intervention (e.g., microcontroller reset) to return to Error Active state.

**Error Flag:**
*   **Active Error Flag:** 6 dominant bits. Overwrites any ongoing transmission, signaling an error to all nodes.
*   **Passive Error Flag:** 6 recessive bits. Does not actively interfere with bus communication.

**What could go wrong:** A node might enter Bus-off state due to a temporary fault or external noise, and if not properly managed by higher-level software, it could permanently disable a critical function until a reset, even if the fault was transient.

## 5. Worked examples — multiple, with every step shown

### Example 1: Arbitration Decision

**Problem:** Two CAN nodes, Node A and Node B, attempt to transmit messages simultaneously.
Node A's message ID: `0x1A5`
Node B's message ID: `0x1A0`
Determine which node wins arbitration and explain why. Assume standard CAN (11-bit ID).

**Given:**
*   Node A ID: `0x1A5`
*   Node B ID: `0x1A0`
*   Arbitration rule: Lower ID wins (dominant bit '0' wins over recessive bit '1').

**What we want:** The winning node and the step-by-step arbitration process.

**Step 1: Convert IDs to Binary.**
*   Node A ID `0x1A5`:
    *   `0x1` is `0001`
    *   `0xA` is `1010`
    *   `0x5` is `0101`
    *   So, `0x1A5` (11-bit) = `00110100101`
    *   *Explanation:* Convert each hexadecimal digit to its 4-bit binary equivalent. Since it's an 11-bit ID, we can omit leading zeros if they don't affect the 11-bit representation, but it's good practice to show them for clarity up to the maximum 11 bits.

*   Node B ID `0x1A0`:
    *   `0x1` is `0001`
    *   `0xA` is `1010`
    *   `0x0` is `0000`
    *   So, `0x1A0` (11-bit) = `00110100000`
    *   *Explanation:* Same conversion process for Node B's ID.

**Step 2: Compare IDs bit by bit from Most Significant Bit (MSB).**
We'll compare bit by bit, from left to right (MSB to LSB).
*   **Bit 1 (MSB):**
    *   Node A: `0` (Dominant)
    *   Node B: `0` (Dominant)
    *   Bus State: `0` (Dominant)
    *   *Explanation:* Both nodes transmit a dominant '0'. The bus remains dominant. No decision yet.

*   **Bit 2:**
    *   Node A: `0` (Dominant)
    *   Node B: `0` (Dominant)
    *   Bus State: `0` (Dominant)
    *   *Explanation:* Still no difference.

*   **Bit 3:**
    *   Node A: `1` (Recessive)
    *   Node B: `1` (Recessive)
    *   Bus State: `1` (Recessive)
    *   *Explanation:* Both transmit recessive '1'. The bus is recessive. No decision yet.

*   **Bit 4:**
    *   Node A: `1` (Recessive)
    *   Node B: `1` (Recessive)
    *   Bus State: `1` (Recessive)
    *   *Explanation:* Still no difference.

*   **Bit 5:**
    *   Node A: `0` (Dominant)
    *   Node B: `0` (Dominant)
    *   Bus State: `0` (Dominant)
    *   *Explanation:* Still no difference.

*   **Bit 6:**
    *   Node A: `1` (Recessive)
    *   Node B: `1` (Recessive)
    *   Bus State: `1` (Recessive)
    *   *Explanation:* Still no difference.

*   **Bit 7:**
    *   Node A: `0` (Dominant)
    *   Node B: `0` (Dominant)
    *   Bus State: `0` (Dominant)
    *   *Explanation:* Still no difference.

*   **Bit 8:**
    *   Node A: `0` (Dominant)
    *   Node B: `0` (Dominant)
    *   Bus State: `0` (Dominant)
    *   *Explanation:* Still no difference.

*   **Bit 9:**
    *   Node A: `1` (Recessive)
    *   Node B: `0` (Dominant)
    *   Bus State: `0` (Dominant)
    *   *Explanation:* **Crucial step!** Node A transmits a `1` (recessive), but Node B transmits a `0` (dominant). Since dominant `0` overwrites recessive `1`, the bus shows a `0`. Node A, which transmitted a `1` but observed a `0` on the bus, realizes it has lost arbitration. Node B transmitted a `0` and observed a `0`, so it continues transmitting.

**Step 3: Declare the Winner.**
Since Node B's ID (`0x1A0`) has a dominant bit (`0`) at the first point of difference where Node A's ID (`0x1A5`) had a recessive bit (`1`), Node B wins arbitration. Node A stops transmitting and becomes a receiver.

**Final Answer:**
**Node B (ID `0x1A0`) wins arbitration.**

**Reflection:** This example highlights that arbitration is a bit-wise process and the *first* dominant bit encountered in a lower ID value determines the winner. The numerical value of the ID directly translates to priority: lower ID, higher priority.

---

### Example 2: Data Length Code (DLC) and Bit Stuffing Impact

**Problem:** A CAN node needs to send a message with the following 4 bytes of data: `0xAA, 0x55, 0xFF, 0x00`.
1.  What is the Data Length Code (DLC) for this message?
2.  Show how the first byte (`0xAA`) would be bit-stuffed if it were part of a longer sequence of identical bits.

**Given:**
*   Data: `0xAA, 0x55, 0xFF, 0x00`
*   Bit Stuffing Rule: Insert an opposite bit after 5 consecutive identical bits.

**What we want:** DLC value, and the bit-stuffed representation of `0xAA` in a specific context.

**Part 1: Determine DLC.**

**Step 1: Count the number of data bytes.**
*   We have `0xAA`, `0x55`, `0xFF`, `0x00`.
*   There are 4 bytes of data.
    *   *Explanation:* The DLC field directly indicates the number of data bytes in the Data Field.

**Step 2: Map byte count to DLC value.**
*   The DLC is a 4-bit field representing the number of data bytes from 0 to 8.
*   For 4 bytes, the DLC value is `4`.
    *   *Explanation:* A DLC of `4` signals to all receivers that they should expect 4 bytes in the Data Field.

**Final Answer (Part 1):**
**The Data Length Code (DLC) for this message is `4` (binary `0100`).**

---

**Part 2: Bit Stuffing for `0xAA`.**

**Step 1: Convert `0xAA` to binary.**
*   `0xA` is `1010`
*   So, `0xAA` = `10101010`
    *   *Explanation:* Each hex digit is 4 bits.

**Step 2: Apply bit stuffing rules.**
Let's assume `0xAA` is preceded by a sequence of 1s, for example, `...11111` followed by `10101010`.
*   Original sequence (with preceding bits): `...11111 | 10101010`
*   Compare with `11111`:
    *   The first `1` of `0xAA` continues the sequence of five `1`s.
    *   So, after `...11111`, we have `1`. This makes six `1`s.
    *   According to the rule, after five `1`s, a `0` must be stuffed.
*   Stuffed sequence: `...11111` **0** `10101010`
    *   *Explanation:* The `0` is inserted after the 5th `1` to break the sequence. The `1` from `0xAA` then follows. Now we have `10101010`.
    *   Let's re-evaluate the `10101010` part itself.
    *   `1` (stuff bit break)
    *   `0`
    *   `1`
    *   `0`
    *   `1`
    *   `0`
    *   `1`
    *   `0`
    *   No sequence of 5 identical bits occurs within `10101010`.

Let's take a simpler example for `0xAA` in isolation to demonstrate the rule more clearly without prior context.
If the data was `0xFF, 0xFF, 0xFF` (which is `11111111 11111111 11111111`).
*   `11111` (5 ones) -> insert `0` -> `111110`
*   `111` (remaining from first byte, plus 2 from second) -> `11111` -> insert `0` -> `111110111110`
*   And so on.

For `0xAA` (`10101010`), there are no sequences of five identical bits. So, in isolation, it would not be stuffed.
Let's modify the problem to make bit stuffing evident for `0xAA`.
**Modified Problem:** How would the bit sequence `1111110101010` (which includes `0xAA` preceded by a few ones) be bit-stuffed?

**Step 1 (Modified): Analyze the bit sequence.**
*   Sequence: `1111110101010`

**Step 2 (Modified): Apply bit stuffing.**
*   `11111` (first 5 ones) -> **0** (stuff bit) -> `111110`
*   Next bit is `1` (from original sequence) -> `1111101`
*   Next bit is `0` -> `11111010`
*   Next bit is `1` -> `111110101`
*   Next bit is `0` -> `1111101010`
*   Next bit is `1` -> `11111010101`
*   Next bit is `0` -> `111110101010`
    *   *Explanation:* We scan the sequence. After the first five `1`s, a `0` is inserted. No other sequence of five identical bits occurs in the rest of the example.

**Final Answer (Part 2, modified):**
**The bit-stuffed sequence for `1111110101010` is `11111010101010`.**

**Reflection:** Bit stuffing is crucial for maintaining synchronization and detecting errors. It's a low-level mechanism that the CAN hardware handles automatically, but understanding its role is key to robust communication. The example shows that even a single bit can trigger stuffing if it extends a sequence of identical bits.

---

### Example 3: Error Confinement State Transition

**Problem:** A CAN node starts in the "Error Active" state. It then experiences a series of errors and successful transmissions. Track its error state transitions based on the following sequence of events:
1.  Transmits a message, but receives an ACK Error.
2.  Transmits a message, but detects a Bit Error.
3.  Receives a message correctly.
4.  Transmits a message, no error.
5.  Transmits a message, detects a Bit Error.
6.  Transmits a message, detects a Bit Error.
7.  Transmits a message, detects a Bit Error.
8.  Receives 10 correct messages.
9.  Transmits a message, detects a Bit Error.
10. Transmits a message, detects a Bit Error.

Assume initial TEC = 0, REC = 0.
*   ACK Error: TEC + 8
*   Bit Error (Transmit): TEC + 8
*   Bit Error (Receive): REC + 8
*   Successful Transmission: TEC - 1 (if > 0)
*   Successful Reception: REC - 1 (if > 0)

**Given:**
*   Initial state: Error Active (TEC=0, REC=0)
*   Error/Success rules as above.
*   State thresholds:
    *   Error Active: TEC, REC <= 127
    *   Error Passive: TEC or REC > 127
    *   Bus-off: TEC > 255

**What we want:** The TEC, REC, and error state after each event.

**Step 1: Initial State.**
*   TEC = 0, REC = 0
*   State: **Error Active**
    *   *Explanation:* Both counters are well below 127.

**Step 2: Event 1 - Transmits, ACK Error.**
*   TEC = 0 + 8 = 8
*   REC = 0
*   State: **Error Active**
    *   *Explanation:* TEC is incremented. Still below 127.

**Step 3: Event 2 - Transmits, Bit Error.**
*   TEC = 8 + 8 = 16
*   REC = 0
*   State: **Error Active**
    *   *Explanation:* Another transmit error, TEC increments.

**Step 4: Event 3 - Receives message correctly.**
*   TEC = 16
*   REC = 0 - 1 = -1 -> clamped to 0 (REC cannot go below 0)
*   State: **Error Active**
    *   *Explanation:* Successful reception, REC decrements but cannot be negative.

**Step 5: Event 4 - Transmits message, no error.**
*   TEC = 16 - 1 = 15
*   REC = 0
*   State: **Error Active**
    *   *Explanation:* Successful transmission, TEC decrements.

**Step 6: Event 5 - Transmits, Bit Error.**
*   TEC = 15 + 8 = 23
*   REC = 0
*   State: **Error Active**

**Step 7: Event 6 - Transmits, Bit Error.**
*   TEC = 23 + 8 = 31
*   REC = 0
*   State: **Error Active**

**Step 8: Event 7 - Transmits, Bit Error.**
*   TEC = 31 + 8 = 39
*   REC = 0
*   State: **Error Active**

**Step 9: Event 8 - Receives 10 correct messages.**
*   TEC = 39
*   REC = 0 (since REC was 0, it stays 0 even after 10 successful receptions)
*   State: **Error Active**
    *   *Explanation:* REC cannot go below 0.

**Step 10: Event 9 - Transmits, Bit Error.**
*   TEC = 39 + 8 = 47
*   REC = 0
*   State: **Error Active**

**Step 11: Event 10 - Transmits, Bit Error.**
*   TEC = 47 + 8 = 55
*   REC = 0
*   State: **Error Active**

Let's extend this to reach Error Passive and Bus-off. Let's assume the node continues to transmit with Bit Errors.

**Step 12: More Transmit Bit Errors (repeated 9 times).**
*   Current TEC = 55.
*   To reach Error Passive (TEC > 127), we need to add at least $128 - 55 = 73$ to TEC.
*   Each Bit Error adds 8. So, $73 / 8 \approx 9.125$. We need 10 more errors.
*   After 9 more Bit Errors: TEC = $55 + (9 \times 8) = 55 + 72 = 127$.
*   After 10th Bit Error: TEC = $127 + 8 = 135$.
*   REC = 0
*   State: **Error Passive** (TEC > 127)
    *   *Explanation:* Once TEC exceeds 127, the node transitions to Error Passive. It will now transmit Passive Error Flags.

**Step 13: Even More Transmit Bit Errors (repeated 16 times).**
*   Current TEC = 135.
*   To reach Bus-off (TEC > 255), we need to add at least $256 - 135 = 121$ to TEC.
*   Each Bit Error adds 8. So, $121 / 8 = 15.125$. We need 16 more errors.
*   After 15 more Bit Errors: TEC = $135 + (15 \times 8) = 135 + 120 = 255$.
*   After 16th Bit Error: TEC = $255 + 8 = 263$.
*   REC = 0
*   State: **Bus-off** (TEC > 255)
    *   *Explanation:* Once TEC exceeds 255, the node transitions to Bus-off. It stops all communication.

**Final Answer (Summarized):**
| Event # | Event Description                 | TEC | REC | State           |
| :------ | :-------------------------------- | :-- | :-- | :-------------- |
| Initial | -                                 | 0   | 0   | **Error Active** |
| 1       | Transmit, ACK Error               | 8   | 0   | **Error Active** |
| 2       | Transmit, Bit Error               | 16  | 0   | **Error Active** |
| 3       | Receive Correct                   | 16  | 0   | **Error Active** |
| 4       | Transmit Correct                  | 15  | 0   | **Error Active** |
| 5       | Transmit, Bit Error               | 23  | 0   | **Error Active** |
| 6       | Transmit, Bit Error               | 31  | 0   | **Error Active** |
| 7       | Transmit, Bit Error               | 39  | 0   | **Error Active** |
| 8       | Receive 10 Correct                | 39  | 0   | **Error Active** |
| 9       | Transmit, Bit Error               | 47  | 0   | **Error Active** |
| 10      | Transmit, Bit Error               | 55  | 0   | **Error Active** |
| 11      | **+9 more Transmit Bit Errors**   | 127 | 0   | **Error Active** |
| 12      | **+1 more Transmit Bit Error**    | 135 | 0   | **Error Passive** |
| 13      | **+15 more Transmit Bit Errors**  | 255 | 0   | **Error Passive** |
| 14      | **+1 more Transmit Bit Error**    | 263 | 0   | **Bus-off**      |

**Reflection:** This example demonstrates the self-healing and fault-containment nature of CAN. A single faulty node can be isolated without bringing down the entire bus, which is critical in safety-critical applications like aerospace where a single sensor failure should not crash the aircraft. The thresholds are designed to be forgiving initially but become stricter with persistent errors.

---

### Example 4: Simplified CAN Frame Structure (Standard Frame)

**Problem:** Construct a simplified bit sequence for a standard CAN data frame with the following characteristics:
*   ID: `0x032`
*   RTR: Data Frame
*   Data Length Code (DLC): 2 bytes
*   Data: `0xBE, 0xEF`
*   Assume the CRC is `0x1234` (for simplicity, not actually calculated) and ACK is successful.
*   Ignore bit stuffing for this example, and use placeholders for EOF/IFS.

**Given:**
*   ID: `0x032`
*   RTR: 0 (Data Frame)
*   DLC: 2 (binary `0010`)
*   Data: `0xBE, 0xEF`
*   CRC: `0x1234` (15 bits, so `0100100011010000` is 16 bits, let's use `010010001101000`)
*   ACK: `0` (Dominant, indicates successful reception)
*   SOF: `0`
*   IDE: `0` (Standard Frame)
*   $r_0$: `0` (Reserved)
*   CRC Delimiter: `1`
*   ACK Delimiter: `1`
*   EOF: `1111111` (7 recessive bits)
*   IFS: `111` (3 recessive bits)

**What we want:** The concatenated bit sequence representing the CAN frame.

**Step 1: Convert ID to Binary.**
*   ID `0x032` (11-bit):
    *   `0x0` is `0000`
    *   `0x3` is `0011`
    *   `0x2` is `0010`
    *   So, `0x032` = `00000110010`
    *   *Explanation:* 11 bits for the standard ID.

**Step 2: Convert Data to Binary.**
*   `0xBE`: `10111110`
*   `0xEF`: `11101111`
    *   *Explanation:* Each byte is 8 bits.

**Step 3: Assemble the Frame Fields sequentially.**

*   **SOF (Start Of Frame):** `0` (1 bit)
    *   *Explanation:* Signals the beginning of a frame.

*   **Arbitration Field:**
    *   ID: `00000110010` (11 bits)
    *   RTR: `0` (1 bit, for Data Frame)
    *   Combined: `000001100100`
    *   *Explanation:* ID determines priority; RTR distinguishes Data vs. Remote frames.

*   **Control Field:**
    *   IDE: `0` (1 bit, for Standard Frame)
    *   $r_0$: `0` (1 bit, reserved)
    *   DLC: `0010` (4 bits, for 2 data bytes)
    *   Combined: `000010`
    *   *Explanation:* IDE indicates frame type, $r_0$ is reserved, DLC specifies data length.

*   **Data Field:**
    *   Data 1: `10111110` (8 bits, for `0xBE`)
    *   Data 2: `11101111` (8 bits, for `0xEF`)
    *   Combined: `1011111011101111`
    *   *Explanation:* The actual payload of the message.

*   **CRC Field:**
    *   CRC: `010010001101000` (15 bits, from problem statement)
    *   CRC Delimiter: `1` (1 bit, recessive)
    *   Combined: `0100100011010001`
    *   *Explanation:* Error detection checksum and its delimiter.

*   **ACK Field:**
    *   ACK Slot: `0` (1 bit, dominant from receiver)
    *   ACK Delimiter: `1` (1 bit, recessive)
    *   Combined: `01`
    *   *Explanation:* Acknowledgment from receiving nodes and its delimiter.

*   **EOF (End Of Frame):** `1111111` (7 bits, recessive)
    *   *Explanation:* Marks the end of the frame.

*   **IFS (Interframe Space):** `111` (3 bits, recessive)
    *   *Explanation:* Minimum idle time before a new frame can start.

**Step 4: Concatenate all fields.**

`SOF` `Arbitration Field` `Control Field` `Data Field` `CRC Field` `ACK Field` `EOF` `IFS`

**Final Answer:**
`0` `000001100100` `000010` `1011111011101111` `0100100011010001` `01` `1111111` `111`

**Concatenated bit sequence (with spaces for readability between fields):**
`0 000001100100 000010 1011111011101111 0100100011010001 01 1111111 111`

**Reflection:** This example shows how various pieces of information (ID, data, control bits, error checks) are packed into a single, highly structured frame. Understanding this format is essential for debugging and protocol analysis. Each field has a specific purpose, contributing to the robustness and efficiency of CAN communication.

## 6. Common mistakes and traps

1.  **Confusing CAN IDs with Node Addresses:** Students often assume the CAN ID refers to a specific node, like an IP address. In reality, a CAN ID identifies the *message content* (e.g., "Engine Temperature") and its priority, not the sender or receiver. Multiple nodes can send or receive messages with the same ID.
2.  **Misunderstanding Dominant/Recessive Logic:** Assuming '1' is high and '0' is low, or that '1' wins arbitration. The crucial point is that a dominant '0' *overwrites* a recessive '1' on the bus, and *lower ID numbers* (which have more leading '0's or a '0' at the first point of difference) win arbitration.
3.  **Forgetting Bit Stuffing:** Failing to account for bit stuffing when calculating maximum frame lengths or analyzing raw bit streams. Bit stuffing is an automatic hardware mechanism but is critical for maintaining synchronization and detecting errors.
4.  **Ignoring Termination Resistors:** Not understanding the necessity of 120-ohm termination resistors at *each end* of the bus. Without them, signal reflections cause data corruption, especially at higher bit rates or longer bus lengths.
5.  **Underestimating Error Confinement:** Not appreciating that error counters (TEC/REC) and state transitions (Error Active, Passive, Bus-off) are fundamental to CAN's reliability, preventing a single faulty node from crippling the entire network.
6.  **Incorrectly Interpreting DLC:** Assuming the DLC field indicates the *actual* number of bytes in the data field. While usually true, a DLC of `9` to `15` is valid but still means 8 data bytes (these values are reserved for future protocol extensions in some implementations like CANopen). The maximum data bytes is always 8.

## 7. Textbook-precise explanation

The Controller Area Network (CAN) protocol, standardized by **ISO 11898**, specifies a multi-master, message broadcast system designed for robust, real-time communication in electrically noisy environments. It operates primarily at the data link layer (LLC and MAC sublayers) and physical layer of the OSI model.

**Physical Layer:** CAN employs a differential signaling scheme over a twisted pair of wires, CAN\_High (CAN\_H) and CAN\_Low (CAN\_L), typically terminated with 120 $\Omega$ resistors at each bus end to prevent signal reflections. A **dominant bit (logical 0)** is transmitted by actively driving CAN\_H high and CAN\_L low, creating a differential voltage ($V_{diff} \approx 2\text{V}$). A **recessive bit (logical 1)** is transmitted by allowing both lines to float to a common voltage ($V_{diff} \approx 0\text{V}$), usually through passive pull-up/pull-down networks.

**Arbitration:** CAN utilizes a non-destructive, bit-wise arbitration method. When multiple nodes attempt to transmit simultaneously, they monitor the bus while sending their message identifiers (IDs). If a node transmits a recessive bit (1) but observes a dominant bit (0) on the bus, it immediately ceases transmission and becomes a receiver, having lost arbitration. This ensures that the message with the numerically **lowest ID** (which translates to the highest priority, as more leading dominant bits win) gains access to the bus without data loss, only delay for the losing nodes.

**Frame Format (Standard CAN 2.0A):** A CAN data frame is composed of distinct fields:
*   **Start of Frame (SOF):** 1 dominant bit, synchronizes all nodes.
*   **Arbitration Field:**
    *   **Identifier (ID):** 11 bits ($ID_{10}-ID_0$), defining message priority and content.
    *   **Remote Transmission Request (RTR):** 1 bit. Dominant (0) for a data frame, recessive (1) for a remote frame (a request for data with the specified ID).
*   **Control Field:**
    *   **Identifier Extension Bit (IDE):** 1 bit. Dominant (0) for a standard 11-bit ID, recessive (1) for an extended 29-bit ID.
    *   **Reserved Bit ($r_0$):** 1 dominant bit.
    *   **Data Length Code (DLC):** 4 bits, specifying the number of data bytes (0-8) in the Data Field.
*   **Data Field:** 0 to 8 bytes of application data.
*   **CRC Field (Cyclic Redundancy Check):**
    *   **CRC Sequence:** 15 bits, calculated over SOF, Arbitration Field, Control Field, and Data Field using the generator polynomial $G(x) = x^{15} + x^{14} + x^{10} + x^8 + x^7 + x^4 + x^3 + x^0$.
    *   **CRC Delimiter:** 1 recessive bit.
*   **ACK Field (Acknowledgement):**
    *   **ACK Slot:** 1 bit. Transmitter sends recessive. Any receiver that correctly receives the frame overwrites this with a dominant bit.
    *   **ACK Delimiter:** 1 recessive bit.
*   **End of Frame (EOF):** 7 recessive bits, signals the end of the data frame.
*   **Interframe Space (IFS):** A minimum of 3 recessive bits, providing a buffer between frames.

**Bit Stuffing:** To ensure synchronization and detect errors, CAN employs bit stuffing. After five consecutive bits of the same polarity (e.g., `00000` or `11111`), a 'stuff bit' of the opposite polarity is automatically inserted by the transmitter. Receivers automatically de-stuff these bits. This applies to SOF, Arbitration Field, Control Field, Data Field, and CRC Sequence.

**Error Detection and Confinement:** CAN incorporates multiple error detection mechanisms:
*   **Bit Monitoring:** A transmitter monitors the bus while transmitting; if the transmitted bit differs from the observed bus state (outside of arbitration), a bit error is detected.
*   **Stuff Error:** Detection of six consecutive identical bits.
*   **CRC Error:** Mismatch between received and locally calculated CRC.
*   **Form Error:** Detection of a dominant bit in fixed-form recessive fields (e.g., CRC Delimiter, ACK Delimiter, EOF).
*   **ACK Error:** A transmitter detects a recessive bit in the ACK Slot (meaning no receiver acknowledged).

Nodes maintain **Transmit Error Counters (TEC)** and **Receive Error Counters (REC)**. These counters are incremented upon error detection and decremented upon successful transmissions/receptions. Based on these counters, a node operates in one of three states:
1.  **Error Active:** (TEC, REC $\le 127$) Normal operation, transmits an Active Error Flag (6 dominant bits) upon error.
2.  **Error Passive:** (TEC or REC $> 127$) Generates many errors, transmits a Passive Error Flag (6 recessive bits), and must wait for an 8-bit Suspend Transmission period before attempting to transmit.
3.  **Bus-off:** (TEC $> 255$) Severely faulty, disconnects from the bus, requiring software reset to rejoin.

This comprehensive error handling and confinement strategy ensures high data integrity and network availability, making CAN suitable for safety-critical applications like those in aerospace.

*(Refer to: ISO 11898-1:2015, Road vehicles — Controller area network (CAN) — Part 1: Data link layer and physical media independent requirements. Also, "The CAN Bus Explained" by P. E. G. O'Reilly provides an accessible yet detailed overview.)*

## 8. ASCII diagrams

```text
+----------------------------------------------------------------------------------+
|                                  CAN Bus Topology                                |
+----------------------------------------------------------------------------------+
|                                                                                  |
|  +-----+         +-----+         +-----+         +-----+         +-----+         |
|  |     |---------|     |---------|     |---------|     |---------|     |         |
|  | ECU |         | ECU |         | ECU |         | ECU |         | ECU |         |
|  |  1  |---------|  2  |---------|  3  |---------|  4  |---------|  5  |         |
|  +-----+         +-----+         +-----+         +-----+         +-----+         |
|     |               |               |               |               |             |
|     +---------------+---------------+---------------+---------------+-------------+
|     |               |               |               |               |             |
|     +-----------------------------------------------------------------------------+
|                                  CAN_H (High)                                    |
|             +---------------------------------------------------------------------+
|             |                                                                     |
|             +---------------------------------------------------------------------+
|                                  CAN_L (Low)                                     |
|                                                                                  |
|  (120 Ohm)                                                               (120 Ohm) |
|  Termination                                                             Termination |
|  Resistor                                                                Resistor    |
+----------------------------------------------------------------------------------+
```

```text
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------