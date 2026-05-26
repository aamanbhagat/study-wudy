## 1. The one-sentence answer
**Combinational logic circuits produce outputs that depend only on the current inputs through fixed Boolean functions, with no memory elements.**

A half adder adds two single bits and yields a sum bit plus a carry bit. Extending this with an extra input produces the full adder, which forms the building block of binary arithmetic units inside every processor. Multiplexers route one of several inputs to a single output under the control of select lines, while decoders convert a binary code into a one-hot signal that activates exactly one of many outputs.

These four blocks together implement arithmetic, data routing, and address decoding—the three operations that dominate the datapath of any digital system. Once the truth table of a combinational block is fixed, its gate-level realization is completely determined; changing the inputs instantly changes the outputs with no dependence on prior state.

> [!NOTE]
> The decisive insight is that every combinational circuit is nothing more than a programmable truth table realized in silicon; mastering the mapping from table to gates is therefore the single skill that unlocks all subsequent hardware design.

## 2. Why this matters — concrete and current
In the Intel Core i9-13900K, the 64-bit integer ALU is built from arrays of full adders arranged in a carry-lookahead topology; each clock cycle the adder must produce correct sums for up to four fused multiply-add operations, directly determining the chip’s SPECint score.

Modern DDR5 memory controllers inside AMD Ryzen 7000 processors use 1-to-32 decoders to select one of 32 banks within a rank; a single decoder error produces an entire row of corrupted data visible as blue-screen crashes during large matrix multiplications.

NVIDIA’s Hopper H100 GPU contains thousands of 32-to-1 multiplexers inside each tensor core to steer partial products from the FP8 matrix engine to the accumulation registers; the mux latency directly limits the 989 teraflops peak throughput quoted in the H100 white paper.

SpaceX’s Falcon 9 flight computer, hardened against radiation, implements its command decoder with triple-modular-redundancy combinational logic so that a cosmic-ray strike on one decoder instance cannot issue an erroneous engine-gimbal command.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Two-input gates (AND, OR, XOR, NOT) | Every adder, mux, and decoder is assembled exclusively from these gates. |
| Truth tables         | The specification of every combinational block begins as a truth table. |
| Binary positional notation | Addition and selection are defined over binary vectors; without this representation the carry chain is meaningless. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Boolean functions of two variables
Any mapping from two bits to one bit can be realized by a single gate. The XOR function, for example, is true exactly when the inputs differ.

**Example.** Inputs 0 and 1 produce output 1; inputs 1 and 1 produce output 0.

$$S = A \oplus B = A'B + AB'$$

A subtle error is to treat XOR as OR; the circuit then asserts the output when both inputs are 1, violating the definition of addition without carry.

### Step 2 — The half adder
A half adder adds two bits and reports both the sum and the carry that will be fed to the next column.

**Example.** 1 + 1 must produce sum 0 and carry 1.

$$S = A \oplus B, \quad C = A \cdot B$$

Omitting the carry output turns the circuit into a mere XOR gate and silently discards overflow information.

### Step 3 — The full adder
A full adder accepts a third input (carry-in) so that three bits can be summed in one column.

**Example.** 1 + 1 + 1 yields sum 1 and carry 1.

$$S = A \oplus B \oplus C_{in}$$
$$C_{out} = AB + BC_{in} + AC_{in}$$

Confusing the two carry equations produces a circuit whose carry propagates one gate delay too late, breaking timing in a multi-bit adder.

### Step 4 — Ripple-carry composition
Cascading full adders by wiring each \(C_{out}\) to the next \(C_{in}\) creates an n-bit adder whose latency grows linearly with width.

**Example.** Four full adders chained produce a 4-bit sum.

The longest carry chain must be analyzed; otherwise the clock period is set incorrectly and the adder produces wrong results at speed.

### Step 5 — The multiplexer
A 2-to-1 multiplexer selects one of two data inputs according to a single select bit.

**Example.** When \(S=0\) the output equals \(I_0\); when \(S=1\) the output equals \(I_1\).

$$Y = S'I_0 + SI_1$$

Treating the select line as an enable rather than a choice produces a wired-AND behavior instead of true selection.

### Step 6 — The decoder
An n-to-2^n decoder asserts exactly one of 2^n outputs corresponding to the binary input value.

**Example.** A 2-to-4 decoder with input 10 asserts only output 2.

$$D_i = \prod_{k=0}^{n-1} (I_k \oplus b_k)$$
where \(b_k\) is the k-th bit of i.

Leaving an output floating (no pull-down) allows noise to create spurious assertions on unselected lines.

## 5. Worked examples — every step shown

**Example 1 — Half-adder truth table to gates**  
*Given:* Inputs A=1, B=1.  
*Find:* Sum and carry.  
1. Write the two minterms: \(S = A'B + AB'\).  
   *Why:* XOR definition requires exactly one input true.  
2. \(C = AB\).  
   *Why:* Carry is generated only when both bits are 1.  
**1 1**  
**Final answer: S=0, C=1**

*Reflection:* The example forces explicit use of both equations; many students compute only the sum and forget carry.

**Example 2 — Full adder with carry-in = 1**  
*Given:* A=1, B=0, Cin=1.  
*Find:* S and Cout.  
1. \(S = 1 \oplus 0 \oplus 1 = 0\).  
   *Why:* Three XORs count the number of 1s modulo 2.  
2. \(C_{out} = (1\cdot0) + (0\cdot1) + (1\cdot1) = 1\).  
   *Why:* Majority function detects at least two 1s.  
**Final answer: S=0, Cout=1**

*Reflection:* The carry equation is symmetric; verifying all three product terms prevents omission of any pairwise conjunction.

**Example 3 — 4-to-1 multiplexer selection**  
*Given:* I0=0, I1=1, I2=0, I3=1, S=10 (binary).  
*Find:* Y.  
1. S=10 selects I2.  
   *Why:* The two select bits form the binary index 2.  
2. Y = I2 = 0.  
   *Why:* Only the chosen input is forwarded.  
**Final answer: Y=0**

*Reflection:* The example shows that the select value is interpreted as an integer index, a frequent source of off-by-one errors.

**Example 4 — 3-to-8 decoder output vector**  
*Given:* Input = 101.  
*Find:* Which output is asserted.  
1. Convert 101 to decimal 5.  
   *Why:* Decoder treats inputs as binary number.  
2. Assert D5 only.  
   *Why:* One-hot encoding requires exactly one line high.  
**Final answer: 00000010 (D5 high)**

*Reflection:* The one-hot guarantee must be checked; any design that allows two outputs to be simultaneously active violates decoder semantics.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using OR instead of XOR for sum | Intuitive “addition” suggests OR            | Always derive sum from parity (mod-2 count)  |
| Forgetting Cin in full-adder carry | Carry equation looks like half-adder carry  | Expand the majority function explicitly      |
| Treating mux select as enable | Enable gates usually AND all inputs         | Verify that exactly one data path is active  |
| Decoder outputs not mutually exclusive | Missing inverter on one select line        | Draw the full AND tree for each output       |
| Ignoring propagation delay in ripple adder | Gate delay appears only in timing diagrams  | Count gate levels along the carry chain      |
| Confusing active-high versus active-low decoder | Datasheet polarity symbol overlooked        | Mark every bubble (inversion) on the schematic |
| Assuming combinational output is stable while inputs change | No memory implies instant update            | Insert explicit timing arcs when composing blocks |

## 7. The textbook-precise statement
A combinational logic circuit realizes a Boolean function \(f:\{0,1\}^n\to\{0,1\}^m\) whose output vector at time t depends only on the input vector present at time t. The half adder is defined by the pair of functions
\[
S(A,B)=A\oplus B,\qquad C(A,B)=A\cdot B.
\]
The full adder extends the domain to three variables:
\[
S(A,B,C_{in})=A\oplus B\oplus C_{in},\qquad C_{out}(A,B,C_{in})=AB+BC_{in}+AC_{in}.
\]
A k-to-1 multiplexer and an n-to-2^n decoder are likewise expressed by their canonical sum-of-products forms (Mano, *Digital Design*, 6e, §4.2–4.4).

## 8. Visual — diagram or schematic
```text
Half adder          Full adder (one bit)
A ──▶┌─────┐        A ──▶┌─────┐
     │ XOR │─▶ S      B ──▶│ FA  │─▶ S
B ──▶└─────┘             Cin─▶└─────┘
     ┌─────┐               ┌─────┐
A ──▶│ AND │─▶ C       Cout◀│ MAJ │◀── three inputs
B ──▶└─────┘
```
The FA block internally contains two XORs, two ANDs and one OR arranged so that the carry chain proceeds left to right.

## 9. The memory technique
1. **The hook** — Picture a half adder as two siblings: the XOR “difference detector” that lights up when exactly one is present, and the AND “both-present” gate that raises the carry flag like a hand signal.
2. **What to overlearn** — \(S=A\oplus B\oplus C_{in}\), \(C_{out}=AB+BC_{in}+AC_{in}\); the 2-to-1 mux equation \(Y=S'I_0+SI_1\); decoder outputs are exactly one-hot.
3. **Spaced-repetition schedule** — Review truth tables at 1 day, redraw gate schematics at 3 days, build a 4-bit adder at 7 days, design a 4-to-1 mux feeding a decoder at 16 days, and verify an 8-bit ALU slice at 35 days.
4. **First-principles fallback** — Re-derive every output column from the definition “count the number of 1s” (parity for sum, majority for carry) or “select the indexed input” for mux/decoder.

## 10. What this unlocks
Mastery of these four blocks lets you read any ALU, memory controller, or instruction decoder schematic and immediately recognize the data paths. The next concepts that rest directly on this foundation are:

- Carry-lookahead and prefix adders
- Barrel shifters built from staged multiplexers
- Instruction opcode decoding trees in CPU control units
- FPGA LUT configuration as arbitrary combinational functions

## 11. Self-check — five questions, no answers
1. Draw the gate-level schematic of a full adder using only two-input gates and label every internal node.
2. A 4-bit ripple-carry adder receives inputs 1111 and 0001; what is the final carry-out and why does it appear two gate delays after the least-significant-bit carry?
3. Implement a 4-to-1 multiplexer using only 2-to-1 multiplexers; show the select-bit wiring.
4. A 3-to-8 decoder is built with eight 3-input AND gates. One AND gate has an inverted input on the middle bit. Which output line is permanently stuck at 0 regardless of the binary input?
5. Suppose the carry equation of a “full adder” is accidentally replaced by the half-adder carry; construct a concrete 3-bit input pattern that produces an incorrect sum and identify the numerical error magnitude.