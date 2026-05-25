## What it is
Combinational logic circuits are digital circuits whose outputs are a pure function of their present inputs only. They have no memory; a given set of inputs will *always* produce the same outputs, regardless of the sequence of inputs that came before. We build these circuits by combining basic logic gates like AND, OR, NOT, and XOR.

## Why it matters
These circuits are the fundamental building blocks of a computer's Arithmetic Logic Unit (ALU), the part of the CPU that performs calculations like addition, subtraction, and logical operations. In aerospace, they are used in flight control systems and sensor data processing where deterministic, immediate responses are critical. In machine learning, custom hardware accelerators (like GPUs and TPUs) use massive arrays of these circuits to perform the matrix multiplications at the heart of neural networks.

## When to study it
You must have a solid understanding of the three fundamental logic gates (AND, OR, NOT) and the XOR gate. You must also be comfortable creating and reading truth tables, which map all possible input combinations to their corresponding outputs. Without these, the following derivations will be impossible to follow.

## How to study it (step by step)
1.  **Derive the Half Adder.** Start with the goal: add two single bits, $A$ and $B$. Create a truth table with inputs $A, B$ and outputs Sum ($S$) and Carry-out ($C_{out}$). From the truth table, derive the boolean logic expressions for $S$ and $C_{out}$ in terms of $A$ and $B$. Draw the circuit diagram using logic gates.
2.  **Derive the Full Adder.** Now add three bits: $A$, $B$, and a Carry-in ($C_{in}$). Repeat the process: create the truth table, derive the boolean expressions for $S$ and $C_{out}$, and draw the circuit. Notice how it's more complex than the half adder.
3.  **Build a Full Adder from Half Adders.** This is a key insight into hierarchical design. Prove to yourself, by tracing the logic, that you can construct a full adder using two half adders and an OR gate. This reduces complexity.
4.  **Understand the Multiplexer (MUX).** Think of it as a data selector. A 2-to-1 MUX has two data inputs ($I_0, I_1$), one selector input ($S$), and one output ($Y$). If $S=0$, $Y=I_0$. If $S=1$, $Y=I_1$. Generalize this to a 4-to-1 MUX with two selector lines.
5.  **Understand the Decoder.** Think of it as an address decoder. A 2-to-4 decoder has two input lines ($A_1, A_0$) and four output lines ($Y_0, Y_1, Y_2, Y_3$). The binary value of the inputs determines which *one* output line is activated (e.g., if input is $10_2$, output $Y_2$ is high and all others are low).
6.  **Connect them.** Think about how a MUX and a decoder are opposites. A decoder takes a binary code and activates one of many outputs. A MUX takes many inputs and, based on a binary code, selects one to pass to its single output.

## Key ideas, with intuition
1.  **Memoryless Computation.** The defining feature of combinational logic is the absence of state. The output is determined *solely* by the current inputs. This is like a simple calculator: pressing `2 + 3` always gives `5`, no matter what you did before. This contrasts with *sequential* logic (like flip-flops), which has memory.
2.  **Sum of Products (SOP).** This is the mechanical way to turn any truth table into a logic circuit. For each output column, find all the rows where the output is '1'. For each of these rows, create an AND term of all the inputs (using NOT for inputs that are '0'). Finally, OR all these AND terms together. This *always* works.
3.  **Hierarchical Design.** We don't design a 64-bit adder from scratch. We design a half adder. We use two half adders to make a full adder. We chain 64 full adders to make a 64-bit ripple-carry adder. This principle of building complex systems from simpler, verified blocks is fundamental to all engineering.
4.  **Data Flow vs. Control Flow.** Adders are for data processing—they transform input values into a new output value. Multiplexers and Decoders are for data routing and control—they don't change the data, but rather select which data goes where, or which component gets enabled. A CPU uses decoders to interpret an instruction's opcode and activate the correct functional unit (e.g., the adder).

## Worked example
Let's derive the **Full Adder** from first principles. A full adder adds three bits: $A$, $B$, and a carry-in bit, $C_{in}$. It produces two outputs: a sum bit, $S$, and a carry-out bit, $C_{out}$.

**Step 1: Create the Truth Table.**
We list all 8 ($2^3$) possible combinations of inputs and determine the outputs. For example, $1+1+1 = 3$, which is $11_2$ in binary, so $S=1$ and $C_{out}=1$.

| $A$ | $B$ | $C_{in}$ | $C_{out}$ | $S$ |
|:---:|:---:|:--------:|:---------:|:---:|
| 0   | 0   | 0        | 0         | 0   |
| 0   | 0   | 1        | 0         | 1   |
| 0   | 1   | 0        | 0         | 1   |
| 0   | 1   | 1        | 1         | 0   |
| 1   | 0   | 0        | 0         | 1   |
| 1   | 0   | 1        | 1         | 0   |
| 1   | 1   | 0        | 1         | 0   |
| 1   | 1   | 1        | 1         | 1   |

**Step 2: Derive Boolean Expressions using Sum-of-Products.**

For the Sum ($S$) column, we find the rows where $S=1$:
- Row 2: $\bar{A} \cdot \bar{B} \cdot C_{in}$
- Row 3: $\bar{A} \cdot B \cdot \bar{C}_{in}$
- Row 5: $A \cdot \bar{B} \cdot \bar{C}_{in}$
- Row 8: $A \cdot B \cdot C_{in}$

ORing them together gives: $S = (\bar{A} \cdot \bar{B} \cdot C_{in}) + (\bar{A} \cdot B \cdot \bar{C}_{in}) + (A \cdot \bar{B} \cdot \bar{C}_{in}) + (A \cdot B \cdot C_{in})$.
With boolean algebra, this simplifies to the much cleaner expression:
$$ S = A \oplus B \oplus C_{in} $$

For the Carry-out ($C_{out}$) column, we find the rows where $C_{out}=1$:
- Row 4: $\bar{A} \cdot B \cdot C_{in}$
- Row 6: $A \cdot \bar{B} \cdot C_{in}$
- Row 7: $A \cdot B \cdot \bar{C}_{in}$
- Row 8: $A \cdot B \cdot C_{in}$

ORing them together gives: $C_{out} = (\bar{A} \cdot B \cdot C_{in}) + (A \cdot \bar{B} \cdot C_{in}) + (A \cdot B \cdot \bar{C}_{in}) + (A \cdot B \cdot C_{in})$.
This simplifies to:
$$ C_{out} = (A \cdot B) + (A \cdot C_{in}) + (B \cdot C_{in}) $$

**Step 3: Reflect.**
The truth table is the ground truth. The Sum-of-Products method provides a mechanical way to convert that truth into a logical expression. Boolean algebra then simplifies that expression into a more efficient circuit. The final expressions tell us exactly which gates to use to build our full adder.

## Diagrams
A Half Adder (adds A, B):

```text
       A ---|`\      
            | o |---- Sum (A XOR B)
       B ---| /
            
       A ---|`\
            | & |---- Carry (A AND B)
       B ---| /
```

A Full Adder built from two Half Adders and an OR gate:

```text
          A ---|`\      S1
               | o |---|`\
          B ---| /    |   | o |---- Sum_final (A XOR B XOR Cin)
               |      | /
               |  Cin --|
               |
          A ---|`\  C1
               | & |---|`\
          B ---| /    |   |
                      | + |---- Carry_out_final
               .------| /
               |
          S1 --|`\  C2
               | & |---|
         Cin --| /
```

## Memory technique — remember this forever
1.  **The Story:** Think of a construction site.
    - **Combinational Logic** is the worker who just follows blueprints (the inputs) with no memory of yesterday. What they build today (output) depends only on today's blueprint.
    - **Adder:** The bricklayer. Takes bricks (bits), adds them up. A **Half** Adder is an apprentice who can only add two piles. A **Full** Adder is the master who can add two piles *plus* the leftover bricks carried over from the last row.
    - **Multiplexer (MUX):** The foreman with one wheelbarrow (output). He looks at his clipboard (select lines) and tells one of *many* workers (inputs) to dump their load into it. "Many to one."
    - **Decoder:** The site manager. He shouts a code word (input) over the loudspeaker, and *one* specific team (output) on the site activates. "Few to many."

2.  **Must-know formulas:**
    - Half Adder: $S = A \oplus B$, $C_{out} = A \cdot B$
    - Full Adder: $S = A \oplus B \oplus C_{in}$, $C_{out} = (A \cdot B) + (C_{in} \cdot (A \oplus B))$ (This is an efficient form)

3.  **Spaced Repetition:** Review these concepts from scratch (re-derive the truth tables and expressions) at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Do not just read your notes; force your brain to retrieve the information.

4.  **First Principles Pathway:** If you forget everything, you can rebuild it.
    - **Goal:** What am I trying to achieve? (e.g., "Add three bits.")
    - **Truth Table:** List all possible inputs and manually calculate the correct outputs. This is pure logic and requires no memorization.
    - **Sum-of-Products:** For each output, find the '1's. Write the AND-term for each row. OR them all together.
    - **Circuit Diagram:** Convert the final boolean expression directly into gates. One AND gate for each term, one OR gate to combine them.

## Common mistakes
1.  **Confusing MUX and Decoder.** Remember the flow. MUX: Many inputs -> 1 output. Decoder: N inputs -> $2^N$ outputs. A MUX is a selector; a decoder is an activator.
2.  **Forgetting the Carry Chain.** When building a multi-bit adder (e.g., 4-bit), the $C_{out}$ of bit 0 *must* be connected to the $C_{in}$ of bit 1. Forgetting this connection means you're just doing four separate 1-bit additions, which is incorrect.
3.  **Mixing up Sum and Carry Logic.** The Sum logic for an adder almost always involves XOR gates because of its "add without carry" behavior. The Carry logic involves AND gates because a carry is only generated when *both* inputs are 1.
4.  **Off-by-one with Select/Address Lines.** A MUX with 4 data inputs needs 2 select lines ($2^2 = 4$). A decoder with 3 address lines can activate one of 8 outputs ($2^3 = 8$). Students often use N inputs for N outputs, which is wrong.

## Self-check
1.  Using only basic gates (AND, OR, NOT), design a 2-to-4 decoder. It has two inputs, $A_1$ and $A_0$, and four outputs, $Y_0, Y_1, Y_2, Y_3$. When the input is $00_2$, only $Y_0$ is 1. When the input is $01_2$, only $Y_1$ is 1, and so on. Provide the boolean expression for each of the four outputs.
2.  Design a 4-to-1 multiplexer. You have four data inputs ($I_0, I_1, I_2, I_3$), two select lines ($S_1, S_0$), and one output ($Y$). Draw the complete circuit diagram.
3.  Using the components we've discussed (adders, decoders, MUXes, and basic gates), design a 1-bit Arithmetic Logic Unit (ALU). It should take two data inputs, $A$ and $B$, and a 2-bit "opcode" $OP$. If $OP=00$, the output should be $A \text{ AND } B$. If $OP=01$, the output should be $A \text{ OR } B$. If $OP=10$, the output should be $A+B$ (the sum bit from a full adder). You can assume a $C_{in}$ of 0 for the addition.