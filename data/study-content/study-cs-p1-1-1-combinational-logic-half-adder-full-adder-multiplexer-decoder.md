## 1. What it is — in plain English

Imagine you have a bunch of simple on/off switches, like light switches. "Combinational logic" is about putting these switches together in clever ways so that when you flip a certain pattern of input switches, a specific pattern of output switches turns on or off, *immediately*. There's no memory involved; the output only depends on what the inputs are *right now*.

Think of it like a very basic, instant decision-making machine. If you press button A and button B, then light C turns on. If you press button A and not button B, then light D turns on. The moment you change a button, the lights change.

In the world of computers, these "switches" are electrical signals representing 0s (off) and 1s (on). The circuits we'll talk about — half adders, full adders, multiplexers, and decoders — are fundamental building blocks that perform these instant decisions. They are like tiny, specialized gadgets that handle specific tasks: adding binary numbers, or intelligently routing data, or picking out a specific address.

These are the absolute bedrock of how computers process information. Without these simple, fast, memory-less decision-makers, a computer couldn't even add two numbers or figure out where to fetch data from its memory.

## 2. Why it matters — real-world applications

These seemingly simple circuits are the invisible workhorses behind virtually every piece of digital technology you interact with.

1.  **Central Processing Units (CPUs) and Graphics Processing Units (GPUs):** At the heart of every processor, from the low-power chips in your smartwatch to the high-performance cores in an NVIDIA H100 GPU, are **adders**. The Arithmetic Logic Unit (ALU) within a CPU performs all arithmetic operations (addition, subtraction, multiplication, division) using cascades of full adders. GPUs use massive arrays of adders for floating-point calculations crucial for rendering complex 3D graphics, scientific simulations, and especially in **Machine Learning** for matrix multiplications in neural networks. For instance, Intel's latest Core i9 processors contain billions of transistors, many of which are configured as these fundamental logic gates forming adders and other combinational circuits.

2.  **Memory Addressing and Control:** When your computer needs to read or write data to a specific location in its RAM (Random Access Memory), it sends a binary "address" to the memory controller. A **decoder** circuit is essential here. It takes the binary address (e.g., 20 bits long) and activates *only* the single output line corresponding to that unique memory location, allowing the CPU to access the correct data. This is critical for the efficient functioning of all modern computer systems, including those used in **aerospace** for flight control computers that need to access specific sensor data or command registers quickly.

3.  **Data Routing and Communication Systems:** Imagine a network switch or a router. It needs to direct incoming data packets to the correct outgoing port based on the packet's destination address. **Multiplexers** (and their inverse, demultiplexers) are key components in such systems. A multiplexer can select one of many incoming data streams (e.g., from different network interfaces) and route it to a single processing unit, or vice-versa. This is fundamental in telecommunications, satellite communication, and even within complex integrated circuits where different functional blocks might need to share a common data bus. For example, in a modern smartphone SoC (System on Chip), a MUX might route data from either the camera sensor or the Wi-Fi module to the main memory controller.

4.  **Display Technologies and Control Panels:** In a liquid crystal display (LCD) or an OLED screen, complex logic is required to control which pixels light up and with what color. Decoders are used to select specific rows or columns of pixels, while multiplexers might be used to route color data to the selected pixels. Even simpler control panels, like those in industrial machinery or medical devices, use decoders to interpret button presses (binary input) into specific actions or indicator lights (activating a specific output).

## 3. Prerequisites — what you must know first

Before diving deep into combinational logic, ensure you have a solid grasp of these foundational concepts:

*   **Binary Numbers:** Understanding how numbers are represented using only 0s and 1s (base-2 system).
*   **Boolean Algebra:** The mathematical system for analyzing and simplifying logical expressions (variables can only be true/false or 1/0).
*   **Logic Gates (AND, OR, NOT, XOR, NAND, NOR):** Knowing the function, truth table, and standard symbol for each of these basic digital components.
*   **Truth Tables:** A table showing all possible input combinations for a logic circuit and their corresponding outputs.
*   **Digital Signals:** The concept that information in digital circuits is represented by discrete voltage levels, typically high (1) and low (0).
*   **Basic Circuit Concepts:** An input is where data enters, an output is where data leaves, and a circuit transforms inputs into outputs.

## 4. The core idea — step by step

Combinational logic circuits are characterized by having outputs that are *purely* a function of their current inputs. They have no memory elements. We will explore four fundamental types: the half adder, full adder, multiplexer, and decoder.

### Step 1: Binary Addition — The Foundation

**Plain English:** Before we build circuits to add, we need to remember how simple binary addition works. When you add two binary digits (bits), there are four possibilities:
*   $0 + 0$
*   $0 + 1$
*   $1 + 0$
*   $1 + 1$
The first three are straightforward, but $1 + 1$ in binary is $10_2$, which means a sum of $0$ and a "carry-out" of $1$ to the next position, just like when you add $5+5=10$ in decimal, you get a sum of $0$ and carry $1$ to the tens place.

**Small concrete example:**
Let's add $1_2$ and $1_2$:
$1_2 + 1_2 = 10_2$.
Here, the "sum" bit is $0$, and the "carry-out" bit is $1$.

**The formal/mathematical version:**
We can represent this with a truth table for two input bits, $A$ and $B$, producing a Sum ($S$) and a Carry-out ($C_{out}$):

| $A$ | $B$ | $S$ | $C_{out}$ |
| :--: | :-: | :-: | :-------: |
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |

**What could go wrong:** Students often forget that $1+1$ in binary results in *both* a sum of 0 *and* a carry of 1. It's not just "2" like in decimal. This carry-out is crucial for multi-bit addition.

### Step 2: The Half Adder

**Plain English:** A half adder is the simplest circuit that performs binary addition. It takes two single binary inputs (let's call them $A$ and $B$) and produces two outputs: a "Sum" ($S$) and a "Carry-out" ($C_{out}$). It's called "half" because it can't handle a "carry-in" from a previous addition stage.

**Small concrete example:**
If we input $A=1$ and $B=0$ into a half adder:
*   $A=1, B=0 \implies S=1, C_{out}=0$.
This matches $1+0=1_2$.

If we input $A=1$ and $B=1$:
*   $A=1, B=1 \implies S=0, C_{out}=1$.
This matches $1+1=10_2$.

**The formal/mathematical version:**
From the truth table in Step 1, we can derive the Boolean expressions for $S$ and $C_{out}$:
*   The Sum ($S$) output is 1 when $A$ is 0 and $B$ is 1, OR when $A$ is 1 and $B$ is 0. This is the definition of an XOR (Exclusive OR) gate.
    $$S = A \oplus B$$
*   The Carry-out ($C_{out}$) output is 1 only when both $A$ and $B$ are 1. This is the definition of an AND gate.
    $$C_{out} = A \cdot B$$

**What could go wrong:** A common mistake is to confuse the Sum output with an OR gate ($A+B$) instead of an XOR gate. While $0+1=1$ and $1+0=1$ are true for both, an OR gate would give $1+1=1$, which is incorrect for the sum bit of binary addition (it should be 0 with a carry).

### Step 3: The Full Adder

**Plain English:** A full adder is a more complete binary adder. Unlike a half adder, it takes *three* binary inputs: two data bits ($A$ and $B$) and a "Carry-in" ($C_{in}$) from a previous addition stage. It still produces two outputs: a "Sum" ($S$) and a "Carry-out" ($C_{out}$). Full adders are essential for adding numbers with multiple bits, as they allow carries to propagate from one bit position to the next.

**Small concrete example:**
Let's add three $1$s: $A=1, B=1, C_{in}=1$.
*   First, consider $A+B$: $1+1 = 10_2$ (Sum=0, Carry=1).
*   Now, add the $C_{in}$ to that Sum: $0+1 = 1_2$ (Sum=1, Carry=0).
*   The final $C_{out}$ is generated by considering any carries from $A+B$ OR from the sum of $(A \oplus B) + C_{in}$.
So, for $A=1, B=1, C_{in}=1$:
*   $S = 1$
*   $C_{out} = 1$ (because $A$ and $B$ were both 1, generating a carry)

**The formal/mathematical version:**
The truth table for a full adder has 3 inputs ($A, B, C_{in}$) and $2^3 = 8$ possible input combinations:

| $A$ | $B$ | $C_{in}$ | $S$ | $C_{out}$ |
| :--: | :-: | :------: | :-: | :-------: |
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 1 | 0 | 1 |
| 1 | 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 1 | 1 |

From this truth table, the Boolean expressions are:
$$S = A \oplus B \oplus C_{in}$$
$$C_{out} = (A \cdot B) + (C_{in} \cdot (A \oplus B))$$
This can also be expressed as $C_{out} = (A \cdot B) + (B \cdot C_{in}) + (A \cdot C_{in})$.

**What could go wrong:** Deriving the $C_{out}$ expression can be tricky. It's often helpful to think of it as "a carry is generated if $A$ and $B$ are both 1, OR if one of $A$ or $B$ is 1 AND $C_{in}$ is 1." Also, simply adding $A, B, C_{in}$ and taking the LSB as Sum and MSB as Carry is a good mental check.

### Step 4: The Multiplexer (MUX)

**Plain English:** A multiplexer, often shortened to MUX, is like a smart switch or a data selector. It takes several input data lines but has only one output line. It also has "select" lines. The values on the select lines determine *which* of the input data lines gets connected to the single output line. It's a "many-to-one" device.

**Small concrete example:**
Consider a 2-to-1 MUX. It has two data inputs ($I_0, I_1$) and one select line ($S$).
*   If $S=0$, the output ($Y$) is connected to $I_0$.
*   If $S=1$, the output ($Y$) is connected to $I_1$.

So, if $I_0=0, I_1=1$, and $S=0$, then $Y=0$.
If $I_0=0, I_1=1$, and $S=1$, then $Y=1$.

**The formal/mathematical version:**
For a 2-to-1 MUX with inputs $I_0, I_1$ and select $S$:

| $S$ | $I_0$ | $I_1$ | $Y$ |
| :-: | :---: | :---: | :-: |
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 1 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 0 |
| 1 | 1 | 1 | 1 |

The Boolean expression for the output $Y$ is:
$$Y = (\overline{S} \cdot I_0) + (S \cdot I_1)$$
This means "if $S$ is 0 (i.e., $\overline{S}$ is 1), then output $I_0$, ELSE if $S$ is 1, then output $I_1$."
A MUX with $N$ select lines can select from $2^N$ data inputs. For example, a 4-to-1 MUX needs 2 select lines ($S_1, S_0$).

**What could go wrong:** Students sometimes confuse the data inputs with the select inputs. The select inputs don't become the output directly; they *choose* which data input becomes the output. Also, ensuring the correct mapping of select line combinations to input lines (e.g., $S_1S_0=00$ selects $I_0$, $S_1S_0=01$ selects $I_1$, etc.) is crucial.

### Step 5: The Decoder

**Plain English:** A decoder is the opposite of encoding. It takes a binary code as input and activates *only one* of its output lines, corresponding to that input code. Think of it like a binary-to-address translator. If you give it a binary number, it points to a specific "address" or "location." It's a "one-to-many" device, but only one output is active at a time.

**Small concrete example:**
Consider a 2-to-4 decoder. It has two input lines ($A_1, A_0$) and four output lines ($O_0, O_1, O_2, O_3$).
*   If inputs $A_1A_0 = 00$, then $O_0$ is active (high), and $O_1, O_2, O_3$ are inactive (low).
*   If inputs $A_1A_0 = 01$, then $O_1$ is active, and $O_0, O_2, O_3$ are inactive.
*   If inputs $A_1A_0 = 10$, then $O_2$ is active, and $O_0, O_1, O_3$ are inactive.
*   If inputs $A_1A_0 = 11$, then $O_3$ is active, and $O_0, O_1, O_2$ are inactive.

**The formal/mathematical version:**
For a 2-to-4 decoder with inputs $A_1, A_0$ and outputs $O_0, O_1, O_2, O_3$:

| $A_1$ | $A_0$ | $O_0$ | $O_1$ | $O_2$ | $O_3$ |
| :---: | :---: | :---: | :---: | :---: | :---: |
| 0 | 0 | 1 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 0 | 0 |
| 1 | 0 | 0 | 0 | 1 | 0 |
| 1 | 1 | 0 | 0 | 0 | 1 |

The Boolean expressions for the outputs are derived directly from the minterms of the inputs:
$$O_0 = \overline{A_1} \cdot \overline{A_0}$$
$$O_1 = \overline{A_1} \cdot A_0$$
$$O_2 = A_1 \cdot \overline{A_0}$$
$$O_3 = A_1 \cdot A_0$$
A decoder with $N$ input lines will have $2^N$ output lines.

**What could go wrong:** The most common mistake is thinking multiple outputs can be active simultaneously (unless it's a special type of decoder, which is not the default assumption). For a standard binary decoder, *only one* output line is high (active) for any given input combination. Also, ensuring the correct mapping of input binary code to output line (e.g., $00_2$ maps to $O_0$, $01_2$ maps to $O_1$, etc.) is essential.

## 5. Worked examples — multiple, with every step shown

### Example 1: Half Adder Calculation

**Problem:** Given a Half Adder with inputs $A=1$ and $B=0$, determine the Sum ($S$) and Carry-out ($C_{out}$).

**Given:**
*   Input $A = 1$
*   Input $B = 0$
*   Circuit: Half Adder

**Want:**
*   Output $S$
*   Output $C_{out}$

**Steps:**

1.  **Recall the Half Adder logic expressions:**
    *   $S = A \oplus B$
    *   $C_{out} = A \cdot B$
    This is the fundamental definition of a Half Adder.

2.  **Substitute the given values for $A$ and $B$ into the Sum expression:**
    $$S = 1 \oplus 0$$
    The XOR operation ($ \oplus $) returns 1 if the inputs are different, and 0 if they are the same. Since 1 and 0 are different, the result is 1.

3.  **Calculate the Sum:**
    $$S = 1$$
    This is the sum bit resulting from adding 1 and 0.

4.  **Substitute the given values for $A$ and $B$ into the Carry-out expression:**
    $$C_{out} = 1 \cdot 0$$
    The AND operation ($ \cdot $) returns 1 only if both inputs are 1. Since one input is 0, the result is 0.

5.  **Calculate the Carry-out:**
    $$C_{out} = 0$$
    This is the carry bit generated from adding 1 and 0.

**Final Answer:**
For $A=1, B=0$ in a Half Adder:
$\boxed{\text{Sum} = 1}$
$\boxed{\text{Carry-out} = 0}$

**Reflection:** This was a straightforward application of the Half Adder's logic. The key is remembering that the Sum is an XOR operation and the Carry-out is an AND operation. It directly reflects $1_2 + 0_2 = 1_2$ (sum 1, no carry).

---

### Example 2: Full Adder Calculation

**Problem:** Given a Full Adder with inputs $A=1$, $B=1$, and $C_{in}=1$, determine the Sum ($S$) and Carry-out ($C_{out}$).

**Given:**
*   Input $A = 1$
*   Input $B = 1$
*   Input $C_{in} = 1$
*   Circuit: Full Adder

**Want:**
*   Output $S$
*   Output $C_{out}$

**Steps:**

1.  **Recall the Full Adder logic expressions:**
    *   $S = A \oplus B \oplus C_{in}$
    *   $C_{out} = (A \cdot B) + (C_{in} \cdot (A \oplus B))$
    These are the defined Boolean expressions for a Full Adder.

2.  **Substitute the given values into the Sum expression:**
    $$S = 1 \oplus 1 \oplus 1$$
    First, perform $1 \oplus 1$. The XOR operation returns 0 if inputs are the same.
    $$S = 0 \oplus 1$$
    Next, perform $0 \oplus 1$. The XOR operation returns 1 if inputs are different.
    $$S = 1$$
    This is the sum bit.

3.  **Substitute the given values into the Carry-out expression:**
    $$C_{out} = (1 \cdot 1) + (1 \cdot (1 \oplus 1))$$
    First, perform the AND operation inside the first parenthesis: $1 \cdot 1 = 1$.
    $$C_{out} = (1) + (1 \cdot (1 \oplus 1))$$
    Next, perform the XOR operation inside the second parenthesis: $1 \oplus 1 = 0$.
    $$C_{out} = 1 + (1 \cdot 0)$$
    Then, perform the AND operation inside the second parenthesis: $1 \cdot 0 = 0$.
    $$C_{out} = 1 + 0$$
    Finally, perform the OR operation.
    $$C_{out} = 1$$
    This is the carry-out bit.

**Final Answer:**
For $A=1, B=1, C_{in}=1$ in a Full Adder:
$\boxed{\text{Sum} = 1}$
$\boxed{\text{Carry-out} = 1}$

**Reflection:** This example involves three inputs, making the calculations slightly more involved, especially for the $C_{out}$ expression. The trick is to carefully apply the order of operations (parentheses first, then AND, then OR/XOR) and recall the definitions of each logic gate. This result corresponds to $1_2 + 1_2 + 1_2 = 11_2$ (sum 1, carry 1).

---

### Example 3: 4-to-1 Multiplexer Operation

**Problem:** A 4-to-1 Multiplexer has data inputs $I_0=0, I_1=1, I_2=0, I_3=1$. The select lines are $S_1=1$ and $S_0=0$. Determine the output $Y$.

**Given:**
*   Data Inputs: $I_0=0, I_1=1, I_2=0, I_3=1$
*   Select Inputs: $S_1=1, S_0=0$
*   Circuit: 4-to-1 Multiplexer

**Want:**
*   Output $Y$

**Steps:**

1.  **Understand the function of a Multiplexer:** A MUX selects one of its data inputs based on the binary value of its select lines and routes that selected input to the single output.
    The number of select lines ($N$) determines the number of data inputs ($2^N$). For a 4-to-1 MUX, $N=2$ select lines ($S_1, S_0$) control $2^2=4$ data inputs ($I_0, I_1, I_2, I_3$).

2.  **Interpret the select line values as a binary number:**
    The select lines $S_1S_0$ form a 2-bit binary number.
    Given $S_1=1$ and $S_0=0$, the binary select code is $10_2$.

3.  **Convert the binary select code to its decimal equivalent:**
    The binary code $10_2$ is equivalent to decimal $2$.
    $1 \cdot 2^1 + 0 \cdot 2^0 = 2 + 0 = 2$.
    This means the MUX will select the input line corresponding to index 2.

4.  **Identify the data input corresponding to the selected index:**
    The selected index is 2. Therefore, the MUX will select data input $I_2$.

5.  **Determine the value of the selected data input:**
    Given $I_2 = 0$.

6.  **The output $Y$ is the value of the selected data input:**
    $$Y = I_2 = 0$$

**Final Answer:**
For a 4-to-1 MUX with $I_0=0, I_1=1, I_2=0, I_3=1$ and select lines $S_1=1, S_0=0$:
$\boxed{Y = 0}$

**Reflection:** The key to solving MUX problems is to correctly interpret the select lines as a binary number and use that number to identify which data input is chosen. Forgetting the order of select lines (e.g., $S_1S_0$ vs $S_0S_1$) or miscalculating the decimal equivalent can lead to errors.

---

### Example 4: 3-to-8 Decoder Operation

**Problem:** A 3-to-8 Decoder has inputs $A_2=1, A_1=0, A_0=1$. Which output line ($O_0$ through $O_7$) is active (high)? Provide the Boolean expression for that specific output.

**Given:**
*   Inputs: $A_2=1, A_1=0, A_0=1$
*   Circuit: 3-to-8 Decoder

**Want:**
*   The active output line.
*   The Boolean expression for that active output line.

**Steps:**

1.  **Understand the function of a Decoder:** A decoder takes a binary input code and activates *only one* of its $2^N$ output lines, where $N$ is the number of input lines. For a 3-to-8 decoder, $N=3$ inputs ($A_2, A_1, A_0$) control $2^3=8$ outputs ($O_0, \dots, O_7$).

2.  **Form the binary input code from the given inputs:**
    The inputs $A_2, A_1, A_0$ form a 3-bit binary number.
    Given $A_2=1, A_1=0, A_0=1$, the binary input code is $101_2$.

3.  **Convert the binary input code to its decimal equivalent:**
    The binary code $101_2$ is equivalent to decimal $5$.
    $1 \cdot 2^2 + 0 \cdot 2^1 + 1 \cdot 2^0 = 4 + 0 + 1 = 5$.
    This decimal value indicates which output line will be active.

4.  **Identify the active output line:**
    Since the decimal equivalent of the input code is 5, the output line $O_5$ will be active (high). All other output lines will be inactive (low).

5.  **Derive the Boolean expression for the active output line ($O_5$):**
    For a decoder, each output line corresponds to a unique minterm of the input variables. A minterm is an AND term where each input variable appears once, either in its true or complemented form, such that the term evaluates to 1 only for that specific input combination.
    For $O_5$, the input combination is $A_2=1, A_1=0, A_0=1$.
    *   $A_2$ is 1, so it appears as $A_2$.
    *   $A_1$ is 0, so it appears as $\overline{A_1}$.
    *   $A_0$ is 1, so it appears as $A_0$.
    Therefore, the Boolean expression for $O_5$ is the AND of these terms.
    $$O_5 = A_2 \cdot \overline{A_1} \cdot A_0$$

**Final Answer:**
For a 3-to-8 Decoder with inputs $A_2=1, A_1=0, A_0=1$:
The active output line is $\boxed{O_5}$.
The Boolean expression for $O_5$ is $\boxed{O_5 = A_2 \cdot \overline{A_1} \cdot A_0}$.

**Reflection:** This example highlights the direct mapping from binary input to a single active output in a decoder. The trickiest part might be correctly forming the minterm expression for the active output, ensuring each input variable is included in its correct (true or complemented) form.

## 6. Common mistakes and traps

1.  **Confusing XOR with OR for Sum in Adders:** Students often incorrectly use an OR gate for the Sum output of a half or full adder ($S = A+B$). While $0+1=1$ and $1+0=1$ are true for both, $1+1$ gives $1$ for OR, but $0$ (with a carry) for XOR, which is the correct sum bit for binary addition.
2.  **Forgetting the Carry-out in Adders:** In binary addition, $1+1$ doesn't just result in "0"; it results in "0 with a carry of 1." Neglecting this carry-out bit means the addition will be incorrect for multi-bit numbers.
3.  **Misinterpreting Select Lines in Multiplexers:** A common error is to think the select lines themselves become part of the output, or that they directly output their value. Instead, select lines *choose* which of the *data* inputs is routed to the output.
4.  **Activating Multiple Outputs in Decoders:** For a standard binary decoder, *only one* output line should be active (high) for any given input combination. Activating multiple outputs indicates a fundamental misunderstanding of its purpose.
5.  **Incorrectly Mapping Inputs to Outputs in MUX/Decoders:** Ensure you understand how the binary value on the select lines (MUX) or input lines (Decoder) maps to the specific data input or output line. Forgetting the order (e.g., $S_1S_0$ vs $S_0S_1$) or miscalculating the decimal equivalent can lead to selecting/activating the wrong line.
6.  **Simplifying Logic Expressions Prematurely or Incorrectly:** While simplification is important, ensure you fully understand the initial, unsimplified expressions derived from truth tables before attempting K-maps or Boolean algebra theorems. A mistake in the initial derivation will propagate.

## 7. Textbook-precise explanation

Combinational logic circuits are a class of digital logic circuits whose outputs are solely a function of their present inputs. They contain no memory elements (such as flip-flops or latches), meaning their state does not depend on past inputs or outputs. The behavior of a combinational circuit can be fully described by a set of Boolean expressions or a truth table.

**Half Adder (HA):**
A half adder is a combinational circuit that performs the addition of two single binary digits, $A$ and $B$. It produces two outputs: a Sum ($S$) and a Carry-out ($C_{out}$).
*   **Truth Table:**
    | $A$ | $B$ | $S$ | $C_{out}$ |
    | :-: | :-: | :-: | :-------: |
    | 0 | 0 | 0 | 0 |
    | 0 | 1 | 1 | 0 |
    | 1 | 0 | 1 | 0 |
    | 1 | 1 | 0 | 1 |
*   **Boolean Expressions:**
    $S = A \oplus B$
    $C_{out} = A \cdot B$
*   **Canonical Sum of Products (SOP):**
    $S = \overline{A}B + A\overline{B}$
    $C_{out} = AB$

**Full Adder (FA):**
A full adder is a combinational circuit that performs the addition of three single binary digits: two input bits ($A$ and $B$) and a Carry-in ($C_{in}$) from a previous stage of addition. It produces a Sum ($S$) and a Carry-out ($C_{out}$). Full adders are typically cascaded to form multi-bit adders.
*   **Truth Table:**
    | $A$ | $B$ | $C_{in}$ | $S$ | $C_{out}$ |
    | :-: | :-: | :------: | :-: | :-------: |
    | 0 | 0 | 0 | 0 | 0 |
    | 0 | 0 | 1 | 1 | 0 |
    | 0 | 1 | 0 | 1 | 0 |
    | 0 | 1 | 1 | 0 | 1 |
    | 1 | 0 | 0 | 1 | 0 |
    | 1 | 0 | 1 | 0 | 1 |
    | 1 | 1 | 0 | 0 | 1 |
    | 1 | 1 | 1 | 1 | 1 |
*   **Boolean Expressions:**
    $S = A \oplus B \oplus C_{in}$
    $C_{out} = (A \cdot B) + (C_{in} \cdot (A \oplus B))$
    An alternative, often simpler, expression for $C_{out}$ is:
    $C_{out} = AB + AC_{in} + BC_{in}$
*   **Canonical Sum of Products (SOP):**
    $S = \overline{A}\overline{B}C_{in} + \overline{A}B\overline{C_{in}} + A\overline{B}\overline{C_{in}} + ABC_{in}$
    $C_{out} = \overline{A}BC_{in} + A\overline{B}C_{in} + AB\overline{C_{in}} + ABC_{in}$

**Multiplexer (MUX):**
A multiplexer is a combinational circuit that selects one of $2^N$ input data lines and routes it to a single output line. The selection is controlled by $N$ select lines. It functions as a data selector. A MUX can also be referred to as a data selector.
*   **Functionality:** For an $M$-to-1 MUX (where $M=2^N$), if the binary value on the $N$ select lines is $k$, then the input data line $I_k$ is connected to the output $Y$.
*   **Example: 2-to-1 MUX (Inputs $I_0, I_1$, Select $S$, Output $Y$):**
    $$Y = \overline{S} \cdot I_0 + S \cdot I_1$$
*   **Example: 4-to-1 MUX (Inputs $I_0, I_1, I_2, I_3$, Select $S_1, S_0$, Output $Y$):**
    $$Y = \overline{S_1}\overline{S_0}I_0 + \overline{S_1}S_0I_1 + S_1\overline{S_0}I_2 + S_1S_0I_3$$

**Decoder:**
A decoder is a combinational circuit that converts a binary input code of $N$ bits into $2^N$ unique output lines. For any given input code, only one of the $2^N$ output lines is active (typically high), while all others are inactive (low). It essentially performs binary-to-$2^N$ line conversion.
*   **Functionality:** For an $N$-to-$2^N$ decoder, if the binary value on the $N$ input lines is $k$, then the output line $O_k$ is activated.
*   **Example: 2-to-4 Decoder (Inputs $A_1, A_0$, Outputs $O_0, O_1, O_2, O_3$):**
    *   $O_0 = \overline{A_1}\overline{A_0}$
    *   $O_1 = \overline{A_1}A_0$
    *   $O_2 = A_1\overline{A_0}$
    *   $O_3 = A_1A_0$
*   **Enable Input:** Decoders often include an enable (EN) input. If EN is inactive, all outputs are inactive regardless of the input code. If EN is active, the decoder functions normally.

For further rigorous study, consult "Digital Design" by M. Morris Mano and Michael D. Ciletti, 6th Edition, Chapter 4, or "Fundamentals of Digital Logic with VHDL Design" by Stephen Brown and Zvonko Vranesic, 3rd Edition, Chapter 4.

## 8. ASCII diagrams

```text
+---------------------+
|     Half Adder      |
|                     |
| A ----- XOR ----- S |
|       /             |
| B ----/            /|
|       \           / |
|        AND ----- C  |
+---------------------+

Diagram 1: Half Adder Circuit
(S is Sum, C is Carry-out)
```

```text
+------------------------------------+
|            Full Adder              |
|                                    |
| A ---+                             |
|      |                             |
| B ---+--+      +-------------+    |
|      |  |      | Half Adder  |    |
| Cin--+  +------+ A_in  B_in  |    |
|         |      |             |    |
|         +------+ S_out Cin_out +--+--- S (Sum)
|                |             |    |
|                +-------------+    |
|                     |              |
|                     |              |
|         +-----------+              |
|         | Half Adder  |            |
|         | A_in  B_in  |            |
|         |             |            |
|         +-------------+            |
|               |                    |
|               |                    |
|               +------ OR -------- C_out (Carry-out)
|                                    |
+------------------------------------+

Diagram 2: Full Adder built from two Half Adders and an OR gate
(Note: The first HA takes A and B as inputs. Its Sum goes to the second HA as A_in, and its Carry-out goes to the OR gate. Cin goes to the second HA as B_in. The second HA's Sum is the final S. The second HA's Carry-out also goes to the OR gate to produce the final C_out.)
```

```text
+-------------------------------------+
|          2-to-1 Multiplexer         |
|                                     |
| I0 ---+                             |
|       |                             |
| I1 ---+                             |
|       |                             |
|       +---- [Selection Logic] ---- Y |
|       |                             |
| S ----+                             |
|                                     |
+-------------------------------------+

Diagram 3: 2-to-1 Multiplexer (conceptual block)

Detailed 2-to-1 MUX:
+-------------------------------------+
|          2-to-1 Multiplexer         |
|                                     |
| I0 ----+                            |
|        |                            |
|        +--- AND ---+               |
|        |           |               |
| S -----+--- NOT ---+               |
|        |                           |
|        |                           |
| I1 ----+                           |
|        |                           |
|        +--- AND ---+               |
|        |           |               |
| S -----+-----------+               |
|                    |               |
|                    +--- OR ----- Y |
+-------------------------------------+

Diagram 3b: 2-to-1 Multiplexer (gate level)
```

```text
+-------------------------------------+
|          2-to-4 Decoder             |
|                                     |
| A1 ----+                            |
|        |                            |
| A0 ----+                            |
|        |                            |
|        +---- [Decoding Logic] ---- O0 |
|        |                            |
|        +---- [Decoding Logic] ---- O1 |
|        |                            |
|        +---- [Decoding Logic] ---- O2 |
|        |                            |
|        +---- [Decoding Logic] ---- O3 |
|                                     |
+-------------------------------------+

Diagram 4: 2-to-4 Decoder (conceptual block)

Detailed 2-to-4 Decoder:
+-------------------------------------------------+
|              2-to-4 Decoder                     |
|                                                 |
| A1 ----+-----------+-----------+-----------+   |
|        |           |           |           |   |
|        |   NOT     |   NOT     |           |   |
|        +----INV----+-----------+---INV-----+   |
|        |           |           |           |   |
| A0 ----+---INV-----+-----------+---INV-----+   |
|        |           |           |           |   |
|        |           |           |           |   |
|        +---AND-----+---AND-----+---AND-----+---AND-----+
|            |           |           |           |         |
|            O0          O1          O2          O3        |
+-------------------------------------------------+

Diagram 4b: 2-to-4 Decoder (gate level)
(INV represents an inverter/NOT gate. Each output is a minterm: O0 = !A1!A0, O1 = !A1A0, O2 = A1!A0, O3 = A1A0)
```

## 9. Memory technique — never forget this

1.  **Specific mnemonic or visual hook:**
    *   **Half Adder (HA):** Think "HAnds over XOR." H for Half, A for AND (for Carry), XOR for Sum. It's half because it *hands over* the carry but doesn't take one in.
    *   **Full Adder (FA):** Think "Full of XORs and an OR-ed carry." It's full because it takes a carry *in* ($C_{in}$) and its Sum is A XOR B XOR $C_{in}$. The $C_{out}$ is a bit more complex, but it's fundamentally an OR of two AND terms: $(A \cdot B)$ (carry from $A,B$) OR ($C_{in} \cdot (A \oplus B)$) (carry from $C_{in}$ and the sum of $A,B$).
    *   **Multiplexer (MUX):** "MUltiple X choice." It's a selector that chooses one ($X$) from multiple inputs. Visualize a traffic controller directing cars from several lanes into one exit.
    *   **Decoder:** "DECODE the address." It takes a binary code (like an address) and lights up (activates) *only* the specific output line that corresponds to that address. Visualize a post office sorting machine: you give it a zip code (binary input), and it routes the letter to one specific pigeonhole (active output).

2.  **The 1-3 formulas/facts they MUST overlearn:**
    *   **Half Adder:** $S = A \oplus B$, $C_{out} = A \cdot B$
    *   **Full Adder:** $S = A \oplus B \oplus C_{in}$, $C_{out} = (A \cdot B) + (C_{in} \cdot (A \oplus B))$
    *   **Multiplexer (2-to-1):** $Y = \overline{S} \cdot I_0 + S \cdot I_1$ (generalize this idea: select lines pick one input)
    *   **Decoder:** Each output is a minterm of the inputs (e.g., for $N$ inputs $A_N...A_0$, output $O_k$ corresponds to the minterm for binary value $k$).

3.  **Spaced-repetition schedule:**
    *   Review these concepts and formulas:
        *   **1 day** after initially learning.
        *   **3 days** after the first review.
        *   **7 days** after the second review.
        *   **16 days** after the third review.
        *   **35 days** after the fourth review.
    *   Actively try to re-derive the truth tables and expressions during these reviews, rather than just passively reading them.

4.  **The first-principles re-derivation pathway:**
    *   **For Adders (Half and Full):**
        1.  Start with the fundamental rules of binary addition ($0+0=00, 0+1=01, 1+0=01, 1+1=10$).
        2.  For a Half Adder, list all 4 input combinations for $A, B$ and determine the $S$ and $C_{out}$ based on binary addition. This forms the truth table.
        3.  Examine the $S$ column: recognize it as the XOR function.
        4.  Examine the $C_{out}$ column: recognize it as the AND function.
        5.  For a Full Adder, extend to 3 inputs ($A, B, C_{in}$). List all 8 combinations. Mentally perform $A+B+C_{in}$ in binary to get $S$ and $C_{out}$.
        6.  From the Full Adder truth table, use K-maps or Boolean algebra to derive the simplified expressions for $S$ and $C_{out}$. (Alternatively, recognize that $S$ is XOR of all three, and $C_{out}$ is a carry if any two inputs are 1, or all three are 1).
    *   **For Multiplexer:**
        1.  Understand its purpose: select one of $2^N$ inputs based on $N$ select lines.
        2.  For a 2-to-1 MUX, list the truth table with $S, I_0, I_1$ as inputs and $Y$ as output. When $S=0$, $Y=I_0$. When $S=1$, $Y=I_1$. Fill in the $Y$ column accordingly.
        3.  Derive the SOP expression from the truth table. You'll see it naturally forms $Y = \overline{S}I_0 + SI_1$.
    *   **For Decoder:**
        1.  Understand its purpose: activate one of $2^N$ outputs based on $N$ input lines.
        2.  For a 2-to-4 Decoder, list the truth table with $A_1, A_0$ as inputs and $O_0, O_1, O_2, O_3$ as outputs.
        3.  For each input combination, set the corresponding output line to 1 and all others to 0.
        4.  Derive the Boolean expression for each output. You'll see each output is a direct minterm of the inputs (e.g., $O_0 = \overline{A_1}\overline{A_0}$).

## 10. Connections — what this leads to

These fundamental combinational logic circuits are the bedrock upon which more complex digital systems are built. Mastering them unlocks understanding of many advanced topics:

*   **Arithmetic Logic Units (ALUs):** Full adders are the core components of ALUs, which are responsible for all arithmetic and logical operations within a CPU. Understanding how full adders work is crucial to comprehending how a CPU performs calculations like addition, subtraction (via two's complement addition), multiplication, and division.
*   **Multi-bit Adders (Ripple-Carry, Carry-Lookahead):** By cascading full adders, you can create circuits to add numbers of any bit length (e.g., 8-bit, 16-bit, 64-bit adders). This leads to the study of different adder architectures like ripple-carry adders (simple but slow) and carry-lookahead adders (more complex but much faster), which are critical for high-performance computing.
*   **Memory Addressing and Organization:** Decoders are indispensable for selecting specific memory locations (RAM, ROM, cache lines) or peripheral devices in a computer system. This directly ties into computer architecture, memory management, and how the CPU interacts with its memory hierarchy.
*   **Data Routing and Control Units:** Multiplexers are extensively used in data paths to select which data source (e.g., from a register, memory, or ALU output) should be routed to a destination. They are key components in control units that direct the flow of information within a processor.
*   **Hardware Description Languages (HDLs):** When you learn VHDL or Verilog, you will describe these combinational circuits using code. Understanding their underlying logic is essential to write efficient and correct HDL code that synthesizes into functional hardware.
*   **Sequential Logic:** While combinational logic has no memory, it forms the "logic" part of sequential circuits. For example, the next-state logic of a Finite State Machine (FSM) is often implemented using combinational logic, which then feeds into memory elements (flip-flops) to store the state.
*   **Microprocessor Design:** All these components are integrated into the complex design of microprocessors. A deep understanding of combinational logic is a prerequisite for understanding pipelines, instruction decoding, register files, and other core microprocessor elements.
*   **Digital Signal Processing (DSP):** Many DSP algorithms involve rapid arithmetic operations. Specialized adders and multipliers (which are built from adders) are fundamental in hardware accelerators for DSP applications.

## 11. Self-check questions

1.  Explain, in your own words, the fundamental difference between a Half Adder and a Full Adder. Why is this difference important for practical computer arithmetic?
2.  A 8-to-1 Multiplexer has data inputs $I_0$ through $I_7$ and three select lines $S_2, S_1, S_0$. If the select lines are set to $S_2=1, S_1=0, S_0=1$, and the inputs are $I_0=0, I_1=1, I_2=0, I_3=1, I_4=1, I_5=0, I_6=1, I_7=0$, what will be the output $Y$? Show your reasoning.
3.  Design a 1-bit full adder using only NAND gates. (Hint: Start by deriving the sum-of-products expressions for S and Cout, then convert to NAND logic using De Morgan's theorems or by double-inverting.)
4.  Consider a 4-to-16 decoder. How many input lines does it have? How many output lines? If the input code is $1101_2$, which specific output line will be active? Write down the Boolean expression for that active output line using the input variables $A_3, A_2, A_1, A_0$.
5.  You are tasked with building a circuit that takes two 2-bit binary numbers, $A = A_1A_0$ and $B = B_1B_0$, and outputs their 3-bit sum $S = S_2S_1S_0$. Draw a block diagram showing how you would connect Full Adders and/or Half Adders to achieve this, clearly labeling all inputs, outputs, and carry lines.