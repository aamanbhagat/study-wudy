## 1. The one-sentence answer
**Physical-layer encoding maps bits to analog or digital signal levels while bandwidth, the Nyquist rate, and the Shannon-Hartley theorem together determine the theoretical maximum error-free bit rate over a noisy channel.**

Encoding is the concrete translation step: each bit (or group of bits) must be represented by a distinguishable voltage, light intensity, or electromagnetic change that a receiver can sample and recover. NRZ holds a constant level for an entire bit time; Manchester forces a mid-bit transition so the receiver can extract both data and clock. Bandwidth is simply the width of the frequency interval the physical medium will pass without severe attenuation. Nyquist shows that, even with perfect signaling, you cannot send more than 2B independent symbols per second on a channel of bandwidth B. Shannon-Hartley then folds in noise: the same bandwidth yields at most B log₂(1+SNR) bits per second when thermal or interference noise is present.

The two ideas are inseparable in practice. A clever encoding may reduce the required bandwidth or improve noise immunity, yet it cannot exceed the Shannon limit; conversely, a channel whose bandwidth and SNR allow 10 Gbps is useless if the chosen encoding produces signals the receiver cannot synchronize.

> [!NOTE]
> The deepest insight is that every extra bit per second ultimately costs either more bandwidth or a higher signal-to-noise ratio; encoding only rearranges the trade-off, it never removes the fundamental limit.

## 2. Why this matters — concrete and current
PCIe 5.0 and 6.0 backplanes inside modern GPUs and AI accelerators rely on NRZ and PAM-4 encoding at 32 GT/s per lane; the Nyquist and Shannon calculations dictate exactly how much equalization and forward-error-correction overhead must be budgeted to keep bit-error rates below 10⁻¹⁵.

NASA’s Deep Space Network uses Manchester-like biphase encoding on the uplink to the Voyager probes so that the spacecraft can recover bit timing from an extremely weak, Doppler-shifted carrier whose bandwidth is only a few hertz.

Amazon’s custom Nitro networking chips inside EC2 instances employ 112 Gbps PAM-4 SerDes links whose Shannon capacity was calculated during design to decide the precise transmit power and forward-error-correction strength needed across the 5 cm PCB traces and connectors.

Undersea fiber-optic cables operated by Google and Microsoft apply probabilistic constellation shaping derived from the Shannon-Hartley formula; each additional 0.1 bit per symbol gained through better encoding directly multiplies the cable’s revenue-carrying capacity without laying new fiber.

## 3. Mental prerequisites

| Concept              | Why you need it here |
|----------------------|----------------------|
| Frequency-domain representation of signals | Bandwidth is defined in hertz; Nyquist and Shannon are frequency-domain statements. |
| Notion of noise power and signal-to-noise ratio | Shannon-Hartley capacity is an explicit function of SNR. |
| Sampling theorem intuition | Nyquist rate is the sampling theorem applied to symbol transmission. |
| Logarithms base 2 | Both capacity formulas are expressed in bits, hence log₂. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Mapping bits to distinguishable signals
A transmitter must turn a sequence of 0s and 1s into a physical quantity (voltage, current, optical power) that persists long enough for the receiver to measure it.  
Example: send bit 1 as +1 V and bit 0 as −1 V for a duration T.  
Formally, the encoding is a function \(e:\{0,1\}\to\mathbb{R}\) constant on each interval \([kT,(k+1)T)\).  
> [!WARNING]
> If the chosen levels are too close, thermal noise will make decisions unreliable even when bandwidth is ample.

### Step 2 — NRZ encoding
NRZ keeps the signal constant for the entire bit period; a 1 is represented by one voltage, a 0 by another.  
Concrete example: USB 2.0 low-speed uses NRZ with 0 V and 3.3 V.  
The power spectrum of an infinite NRZ sequence has a null at DC only if the data are perfectly balanced; long runs of identical bits produce a spectral line at f=0.

### Step 3 — Manchester encoding
Manchester encoding forces a transition in the middle of every bit cell: 0 is encoded as high-to-low, 1 as low-to-high (or vice versa).  
This guarantees exactly one transition per bit, allowing the receiver to recover a clock from the data stream itself.  
Formally, the Manchester waveform for bit b on interval [kT,(k+1)T) is  
\[ s(t) = (-1)^{b} \cdot \operatorname{sgn}\bigl(t - (k+\tfrac12)T\bigr). \]

### Step 4 — Bandwidth as the support of the channel transfer function
Any physical medium attenuates high frequencies. Bandwidth B is the width of the frequency interval where |H(f)| remains above a usable threshold.  
For baseband channels the first null of the sinc-shaped NRZ spectrum lies at 1/T; thus the minimal B needed is roughly 1/(2T).

### Step 5 — Nyquist symbol-rate limit
Even with zero noise and perfect filters, a band-limited channel of width B can support at most 2B independent symbol decisions per second.  
Nyquist’s theorem states that the maximum symbol rate is  
\[ R_s = 2B \]  
when the pulse shape satisfies the Nyquist ISI criterion (raised-cosine filter with roll-off 0).

### Step 6 — From symbols to bits via multilevel signaling
If each symbol carries \(\log_2 M\) bits (M-ary PAM, QAM, etc.), the bit rate becomes  
\[ C_{\text{Nyquist}} = 2B\log_2 M. \]

### Step 7 — Shannon-Hartley capacity with noise
When additive white Gaussian noise of power spectral density N₀/2 is present, the maximum mutual information is  
\[ C = B\log_2\bigl(1+\tfrac{S}{N_0B}\bigr) \]  
bits per second, where S is average received signal power.  
This is the ultimate limit; no encoding or modulation can exceed it.

### Step 8 — The textbook statement of the result
Combining the above, any practical encoding must satisfy both the Nyquist symbol-rate constraint and the Shannon noisy-channel bound; the gap between the two reveals how much coding gain remains available.

## 5. Worked examples — every step shown

**Example 1 — NRZ bit duration from bandwidth**  
*Given:* A baseband channel passes frequencies up to 50 MHz with acceptable attenuation.  
*Find:* Shortest bit time T for NRZ.  
Step 1: Nyquist says maximum symbol rate = 2B = 100 Mbaud.  
*Why:* One symbol per bit in binary NRZ.  
Step 2: Therefore T = 1/100 MHz = 10 ns.  
**10 ns**  
*Reflection:* The calculation assumes ideal sinc pulses; real NRZ needs extra bandwidth for the abrupt edges.

**Example 2 — Manchester versus NRZ bandwidth**  
*Given:* 100 Mbps data.  
*Find:* Null-to-null bandwidth for each encoding.  
Step 1: NRZ main lobe width = 2×bit rate = 200 MHz.  
*Why:* First null at 1/T.  
Step 2: Manchester transition rate is twice as high, first null at 2/T, so 400 MHz.  
**Manchester occupies twice the bandwidth of NRZ for the same bit rate.**  
*Reflection:* The extra bandwidth buys self-clocking.

**Example 3 — Nyquist rate with 4-PAM**  
*Given:* B = 25 MHz, four voltage levels.  
*Find:* Maximum bit rate.  
Step 1: Symbol rate = 2B = 50 Mbaud.  
*Why:* Nyquist.  
Step 2: Each symbol carries log₂4 = 2 bits.  
Step 3: Bit rate = 50 Mbaud × 2 = 100 Mbps.  
**100 Mbps**  
*Reflection:* Multilevel signaling converts bandwidth into bits only when SNR permits distinguishing the levels.

**Example 4 — Shannon-Hartley numerical evaluation**  
*Given:* B = 20 MHz, SNR = 30 dB = 1000.  
*Find:* Capacity.  
Step 1: Compute 1+SNR = 1001.  
*Why:* Direct substitution.  
Step 2: log₂(1001) ≈ 9.97.  
Step 3: C = 20×10⁶ × 9.97 ≈ 199.4 Mbps.  
**199.4 Mbps**  
*Reflection:* Even infinite SNR would give only 2B log₂M bits; noise caps M.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Confusing baud with bits per second | Multilevel encodings hide the distinction | Always compute log₂M separately. |
| Treating Shannon capacity as achievable with uncoded NRZ | Capacity assumes ideal coding and infinite block length | Remember the gap to capacity is closed only by coding. |
| Forgetting that Manchester doubles the required bandwidth | Mid-bit transition doubles the highest frequency | Sketch the waveform and count transitions. |
| Using B instead of 2B in Nyquist | Mistaking passband for baseband | Check whether the channel is baseband or modulated. |
| Ignoring that SNR must be measured at the receiver | Transmit power is irrelevant without path loss | Always use received S and N₀. |
| Assuming NRZ has no DC component | Long runs of identical bits produce DC | Insert scrambling or use 8b/10b when DC balance matters. |
| Applying Nyquist without the raised-cosine pulse | ISI destroys the 2B limit | Verify the pulse satisfies the Nyquist criterion. |

## 7. The textbook-precise statement
Let a baseband channel have bandwidth B Hz and be corrupted by additive white Gaussian noise of power spectral density N₀/2. The maximum rate at which information can be transmitted with arbitrarily small error probability is  
\[ C = B\log_2\left(1+\frac{S}{N_0B}\right) \]  
bits per second (Shannon-Hartley theorem). When the channel is noiseless, the maximum symbol rate is 2B symbols per second provided the pulses are chosen to satisfy the Nyquist inter-symbol-interference criterion (Nyquist, 1928).  
Reference: Tanenbaum & Wetherall, *Computer Networks*, 6e, §2.2–2.3; Cover & Thomas, *Elements of Information Theory*, 2e, Ch. 9.

## 8. Visual — diagram or schematic

```text
NRZ:      1  1  0  1  0  0
        +---+---+---+---+---+---+
        |   |   |   |   |   |   |
    +1V |   |   |   |   |   |   |
        |   |   |   |   |   |   |
     0V +---+---+---+---+---+---+
            0   1   2   3   4   5   time (T)

Manchester:
        +---+   +---+   +---+   +---+
    +1V |   |   |   |   |   |   |   |
        |   +---+   +---+   +---+   |
     0V +---+   +---+   +---+   +---+
            0   1   2   3   4   5   time (T)
```
Each Manchester bit cell contains exactly one transition; NRZ cells may contain none.

## 9. The memory technique

**The hook**  
Picture a tightrope walker (the signal) crossing a canyon (bandwidth B). Each step must be placed exactly 1/(2B) seconds apart (Nyquist). Wind (noise) limits how many distinct step heights the walker can safely choose (Shannon).

**What to overlearn**  
- \( R_s \le 2B \)  
- \( C = B\log_2(1+\text{SNR}) \)  
- Manchester guarantees a transition every T/2.

**Spaced-repetition schedule**  
Review the two formulas at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Start from the sampling theorem: a signal of bandwidth B has 2B degrees of freedom per second; each degree of freedom can carry at most log₂(1+SNR) bits in noise.

## 10. What this unlocks
Mastery of these limits lets you evaluate any new physical layer—5G NR, PCIe 6.0, optical DSP, or satellite downlinks—without hand-waving.  

- Next: line coding and scrambling (8b/10b, 64b/66b)  
- Pulse shaping and raised-cosine filters  
- Modulation (QPSK, QAM) and passband Shannon capacity  
- Forward-error-correction coding gain versus Shannon limit  
- Data-link framing and clock recovery circuits

## 11. Self-check — five questions, no answers
1. A channel has B = 10 MHz. What is the maximum symbol rate under the Nyquist theorem?  
2. Why does Manchester encoding require twice the bandwidth of NRZ for the same bit rate?  
3. Compute the Shannon capacity of a 5 MHz channel whose received SNR is 20 dB.  
4. An engineer claims “our 4-PAM link runs at 2B bits per second.” Under what SNR condition is this claim possible?  
5. A long run of identical bits in NRZ produces a spectral line at DC. How does this affect AC-coupled receivers?