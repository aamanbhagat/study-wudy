## What it is
The physical layer converts a computer's abstract binary data (1s and 0s) into physical signals, like voltages on a wire or pulses of light in a fiber optic cable. Line encoding schemes (like NRZ and Manchester) are the specific rules for this translation. Bandwidth, along with the Nyquist and Shannon-Hartley theorems, define the fundamental physical limits on how fast this data can be transmitted over a given medium.

## Why it matters
In aerospace, communicating with deep-space probes like Voyager or the Mars rovers is constrained by extreme power limitations and thermal noise. The Shannon-Hartley theorem is not an academic exercise; it is the hard limit that dictates the maximum data rate you can get from Mars for a given antenna size and transmitter power. In machine learning, training large distributed models is often bottlenecked by the speed of the network interconnects between GPUs, whose design is a direct application of these physical layer principles.

## When to study it
You should be comfortable with basic digital logic (binary numbers), the physics of waves (frequency, amplitude), and logarithms (especially base 2). A conceptual understanding of Fourier analysis (that complex signals can be decomposed into simple sine waves) is very helpful for grasping why bandwidth is a limiting factor, but not strictly required to use the main formulas.

## How to study it (step by step)
1.  **Draw the Waveforms:** Take the bitstream `01101001`. On graph paper, draw the voltage vs. time graphs for both Non-Return-to-Zero Level (NRZ-L) and Manchester encoding. For NRZ-L, let 1 be +V and 0 be -V. For Manchester, let 1 be a low-to-high transition in the middle of the bit period, and 0 be a high-to-low transition.
2.  **Count the Transitions:** For the stream in step 1, count the number of voltage level changes required for NRZ-L vs. Manchester. Notice that Manchester has at least one transition per bit, while NRZ-L can have long periods of no transitions. This is the key intuition: more transitions per second require the physical medium to support higher frequencies, thus requiring more bandwidth.
3.  **Reason about Nyquist's Limit:** Imagine a noiseless channel with bandwidth $H$. The sampling theorem states that to reconstruct a signal with maximum frequency $H$, you need to take $2H$ samples per second. If each sample can represent one of $V$ distinct voltage levels, how many bits of information can each sample carry? It's $\log_2(V)$. Combine these to derive the Nyquist formula for channel capacity, $C$.
4.  **Introduce Noise with Shannon:** Now, imagine your $V$ voltage levels are "fuzzy" due to random thermal noise. If the noise is large compared to the signal, you can no longer distinguish between closely spaced levels. This is the core idea of Shannon's limit. The capacity now depends not on the number of levels you *try* to create, but on the ratio of your signal's power ($S$) to the noise's power ($N$).
5.  **Calculate and Compare:** Find the theoretical maximum data rate of a standard telephone line, which has a bandwidth of about 3000 Hz and a typical signal-to-noise ratio ($S/N$) of 30 dB. First, calculate the Shannon capacity. Then, calculate the Nyquist capacity assuming you use 2 signal levels (V=2). Note the significant difference and understand that Shannon's is the true upper bound.

## Key ideas, with intuition
1.  **Encoding: A Language for Wires.** Computers use abstract bits; wires use continuous voltages. Line encoding is the dictionary.
    *   **Non-Return-to-Zero (NRZ):** The simplest dictionary. High voltage means '1', low voltage means '0'. It's efficient but suffers from "baseline wander" and clock recovery problems: a long string of `111111...` or `000000...` looks like a flat DC signal, making it hard for the receiver to know where one bit ends and the next begins.
    *   **Manchester Encoding:** A more robust dictionary. It embeds the clock signal into the data. A '0' is represented by a high-to-low transition in the middle of the bit interval; a '1' is a low-to-high transition. This guarantees a transition in every bit, which the receiver uses to synchronize its clock. The cost is efficiency: it requires twice the bandwidth of NRZ for the same bit rate.

2.  **Bandwidth: The Pipe's Width.** A physical channel cannot respond instantaneously to changes. Bandwidth ($H$, in Hertz) measures the range of frequencies a channel can transmit faithfully. A signal that changes very rapidly (like in a high-data-rate stream) has high-frequency components. If the channel's bandwidth is too low, it will "smear out" these fast transitions, corrupting the data.

3.  **Nyquist's Limit: Speed on a Perfect Road.** For a *noiseless* channel, the maximum data rate is limited only by the bandwidth and the number of signal levels used.
    $$ C = 2H \log_2(V) $$
    Where $C$ is the capacity in bits per second (bps), $H$ is the bandwidth in Hz, and $V$ is the number of discrete signal levels. The $2H$ factor comes from the Nyquist sampling theorem: you can send at most 2 symbols (baud) per second per Hertz of bandwidth. Each symbol carries $\log_2(V)$ bits of information.

4.  **Shannon's Limit: Speed in a Blizzard.** For a real, *noisy* channel, the capacity is limited by bandwidth and the signal-to-noise ratio ($S/N$).
    $$ C = H \log_2(1 + S/N) $$
    Here, $S/N$ is the ratio of signal power to noise power (a dimensionless quantity). This is the ultimate, unbreakable speed limit of a channel, regardless of how many signal levels you try to use or how cleverly you encode your data. Noise fundamentally limits your ability to distinguish one signal level from another.

## Worked example
**Problem:** The Deep Space Network communicates with a probe near Jupiter. The channel has a bandwidth of 20 kHz. The received signal power at the ground station is $S = 1.2 \times 10^{-15}$ Watts, and the background thermal noise power is $N = 0.4 \times 10^{-15}$ Watts. What is the maximum theoretical data rate?

**Solution:**
1.  **Identify the context.** The problem specifies a channel with noise ($N > 0$). Therefore, the Shannon-Hartley theorem must be used to find the absolute maximum data rate.

2.  **List the known variables.**
    *   Bandwidth, $H = 20 \text{ kHz} = 20,000 \text{ Hz}$.
    *   Signal power, $S = 1.2 \times 10^{-15} \text{ W}$.
    *   Noise power, $N = 0.4 \times 10^{-15} \text{ W}$.

3.  **Calculate the Signal-to-Noise ratio ($S/N$).** This must be a linear, dimensionless ratio.
    $$ S/N = \frac{1.2 \times 10^{-15} \text{ W}}{0.4 \times 10^{-15} \text{ W}} = 3 $$

4.  **Apply the Shannon-Hartley formula.**
    $$ C = H \log_2(1 + S/N) $$
    $$ C = 20,000 \times \log_2(1 + 3) $$
    $$ C = 20,000 \times \log_2(4) $$

5.  **Solve the logarithm.** Recall that $\log_2(x)$ asks "2 to what power gives x?". Since $2^2 = 4$, $\log_2(4) = 2$.
    $$ C = 20,000 \times 2 $$

6.  **State the final answer with units.**
    $$ C = 40,000 \text{ bps} = 40 \text{ kbps} $$

**Reflection:**
This result is the absolute theoretical maximum data rate possible over this link, as dictated by the laws of physics. No matter how many signal levels we use or what encoding scheme is invented, we cannot transmit error-free data faster than 40 kbps. Each step was necessary: identifying the correct physical model (Shannon), calculating the key parameter ($S/N$), and then systematically applying the formula.

## Diagrams
Here are the waveforms for the bitstream `0110` using NRZ-L and Manchester encoding. The `|` characters denote the boundary between bit periods.

**NRZ-L (Non-Return-to-Zero Level)**
A '1' is high, a '0' is low. The level only changes when the bit value changes.

```text
Bitstream:     0   |   1   |   1   |   0   |
           +V  +-------+-------+
               |       |       |
Voltage        |       |       |
           0V -+-------+-------+-----------
               |       |       |
           -V -+       +-------+-------+
                 Time -->
```

**Manchester Encoding**
A '0' is a high-to-low transition; a '1' is a low-to-high transition. There is a transition in the middle of every bit period.

```text
Bitstream:     0   |   1   |   1   |   0   |
           +V --+   +---+   +---+   +--
              | |   |   |   |   |   | |
Voltage       | | / |   | / |   | / | |
           0V --+---+---+---+---+---+---
                | \ |   | \ |   | \ |
                |   +---+   +---+   +--
           -V
                 Time -->
```

## Memory technique — remember this forever
1.  **Mnemonic Story:** Imagine sending messages across a canyon.
    *   **Encoding:** NRZ is holding a flag up for '1' and down for '0'. Simple, but if you hold it up for a long time, your friend might lose track of the timing. Manchester is waving the flag down-then-up for '1' and up-then-down for '0' *every single time*, which keeps the rhythm perfectly but is twice the work.
    *   **Theorists:** Sir **Nyquist** is a traffic engineer on a *perfectly clear day*. He says the number of cars you can get through depends on the road width ($H$) and how many people you can pack in each car ($V$). Sir **Shannon** is the same engineer in a *blinding blizzard* (Noise). He says, "Forget how many people fit in a car. All that matters is the road width ($H$) and how well you can see the cars at all ($S/N$)."

2.  **Formulas to Overlearn:**
    *   Nyquist (Noiseless): $$C = 2H \log_2(V)$$
    *   Shannon (Noisy): $$C = H \log_2(1 + S/N)$$

3.  **Spaced Repetition Schedule:** Review these formulas and the mnemonic story at **1 day, 3 days, 7 days, 16 days, 35 days**. Actively rewrite them from memory each time.

4.  **First Principles Pathway:** If you forget Nyquist, re-derive it. A signal of bandwidth $H$ can be perfectly reconstructed from $2H$ samples per second (Sampling Theorem). Each sample is a symbol. If you have $V$ possible symbols (levels), each symbol carries $\log_2(V)$ bits of information. Therefore, Capacity = (symbols/sec) $\times$ (bits/symbol) = $2H \times \log_2(V)$. The Shannon formula's derivation is non-trivial, so for that, trust the intuition: capacity grows with bandwidth ($H$) and signal-to-noise ratio ($S/N$), with diminishing returns (hence the logarithm).

## Common mistakes
1.  **Confusing Bit Rate and Baud Rate.** Bit rate is bits/sec. Baud rate is symbols/sec. For NRZ, they are the same. For Manchester, the signal changes twice per bit, so the baud rate is twice the bit rate. For a system with 4 voltage levels, each symbol carries $\log_2(4)=2$ bits, so the bit rate is twice the baud rate.
2.  **Using Nyquist in a Noisy Channel.** If the problem mentions noise, signal-to-noise ratio, or gives separate signal and noise powers, you *must* use Shannon for the theoretical maximum. Nyquist tells you the capacity for a *specific scheme* (V levels) in an *ideal* channel.
3.  **S/N Ratio in Decibels (dB).** Often, S/N is given in dB. You must convert it to a linear ratio before using Shannon's formula. The conversion is: $S/N_{\text{linear}} = 10^{(S/N_{\text{dB}} / 10)}$. Plugging dB values directly into the logarithm is a very common error.
4.  **Forgetting the `+1` in Shannon's Formula.** The formula is $\log_2(1 + S/N)$, not $\log_2(S/N)$. This is mathematically crucial; for a very low S/N, capacity should approach zero, which $\log_2(S/N)$ would not do correctly.

## Self-check
1.  A system uses Manchester encoding. To achieve a data rate of 20 Mbps, what is the minimum required baud rate? What does this imply about the bandwidth needed compared to an NRZ signal at the same data rate?
2.  You are designing a communication system for a noiseless channel with a 1 MHz bandwidth. The goal is to achieve a data rate of 8 Mbps. How many distinct voltage levels must your transmitter and receiver be able to distinguish?
3.  A Wi-Fi access point operates in a 20 MHz channel. The measured signal power is 100 mW and the noise power from other devices is 1 mW. What is the maximum theoretical data rate? If you move twice as far away, the signal power drops to 25 mW (due to the inverse square law). What is the new maximum data rate?