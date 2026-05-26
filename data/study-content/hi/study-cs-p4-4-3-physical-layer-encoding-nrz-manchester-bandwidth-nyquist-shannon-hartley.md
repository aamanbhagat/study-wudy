## 1. The one-sentence answer
**Physical layer encoding converts bits into signals using schemes like NRZ and Manchester, while bandwidth limits how fast those signals can change, and the Nyquist and Shannon-Hartley formulas give the theoretical maximum data rate over a channel.**

Encoding maps 0s and 1s to voltage levels or transitions so the receiver can recover the bits reliably. NRZ keeps a constant level for each bit, which is simple but creates long runs of identical levels that confuse clock recovery. Manchester forces a transition in the middle of every bit, solving the clock problem at the cost of twice the signal changes. Bandwidth measures the range of frequencies a channel can carry, directly limiting how many such changes per second are possible. Nyquist tells the maximum signalling rate on a noiseless channel; Shannon-Hartley adds noise and gives the ultimate bit-rate ceiling.

> [!NOTE]
> The deepest insight is that every extra bit per second ultimately costs either more bandwidth or more signal power; you cannot escape this trade-off no matter how clever the coding becomes.

## 2. Why this matters — concrete and current
USB 3.2 Gen 2×2 inside every modern laptop uses Manchester-style encoding on its differential pairs to keep the receiver clock locked while pushing 20 Gbps over a few metres of cable.

5G millimetre-wave base stations rely on Shannon-Hartley calculations every millisecond to decide how many bits to place in each resource block once the measured SNR and allocated bandwidth are known.

NASA’s Deep Space Network applies Nyquist-rate pulse shaping on the 70 m dishes so that a 2 kHz bandwidth channel from Voyager can still deliver error-free telemetry at 160 bps across 23 billion kilometres.

PCIe 6.0 transceivers inside data-centre GPUs use NRZ-to-PAM4 conversion; the link-training firmware continuously measures available bandwidth and noise to stay inside the Shannon limit while delivering 64 GT/s per lane.

Under-sea fibre cables from Google and Microsoft run at 200 Gbps per wavelength only because engineers keep the launched power and bandwidth just below the Shannon-Hartley bound calculated for each 50 GHz slice of spectrum.

## 3. Mental prerequisites

| Concept              | Why you need it here                                                                 |
|----------------------|--------------------------------------------------------------------------------------|
| Frequency and Hertz  | Bandwidth is measured in Hz; Nyquist counts signal changes per second in the same unit. |
| Logarithms base 2    | Shannon-Hartley capacity formula uses log₂(1+SNR) to convert power ratio into bits.   |
| Voltage vs time plot | NRZ and Manchester are defined by voltage levels and transitions over time.          |
| Bit vs baud          | You must separate information bits from signalling symbols before applying Nyquist.   |

If any row above is unclear, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Bits must become distinguishable voltage patterns
A wire only carries voltage that changes with time. To send a bit, the sender must create two recognisably different voltage behaviours so the receiver can map them back to 0 and 1.  
Example: sending the bit string 1101 on a wire that swings between −1 V and +1 V.  
Formally, an encoding is a function \(E: \{0,1\} \to \mathbb{R}^{[0,T]}\), where \(T\) is the bit duration.  
> [!WARNING]  
> Treating the mapping as obvious hides the fact that the receiver must also recover the exact start and end of each \(T\); without that, the bits are unreadable.

### Step 2 — NRZ keeps the level constant for the whole bit time
Non-Return-to-Zero (NRZ) simply sets high voltage for 1 and low voltage for 0 and holds it until the next bit.  
Example: 1101 becomes +1 V for two bit times, then −1 V, then +1 V.  
Formal definition: \(E(b) = +V\) if \(b=1\), \(-V\) if \(b=0\), for \(0 \le t < T\).  
> [!WARNING]  
> A long string of identical bits produces no transitions; the receiver’s clock drifts and eventually samples the wrong bit.

### Step 3 — Manchester forces a mid-bit transition
Manchester encoding guarantees exactly one transition per bit by XOR-ing the data with a clock that toggles at \(T/2\).  
Example: bit 1 becomes low-to-high; bit 0 becomes high-to-low.  
Formal rule: \(E(b,t) = (-1)^{b} \cdot \operatorname{sign}(t - T/2)\).  
> [!WARNING]  
> The transition rate is twice that of NRZ, so the channel must support twice the bandwidth or the signal will be filtered.

### Step 4 — Bandwidth counts the highest frequency the channel passes
Any signal that changes every \(T_s\) seconds contains frequency components up to roughly \(1/(2T_s)\). The channel’s bandwidth \(B\) therefore limits the fastest safe transition rate.  
Example: a 4 kHz voice channel cannot carry a clean square wave faster than 8000 transitions per second.  
Mathematically, \(B \ge \frac{1}{2T_s}\).

### Step 5 — Nyquist gives the maximum symbol rate on a noiseless channel
For a channel of bandwidth \(B\) Hz with \(L\) distinct levels, the maximum symbol rate without inter-symbol interference is \(2B\) symbols per second.  
Formula:  
$$R_{\text{symbol}} \le 2B.$$  
> [!WARNING]  
> Using more than \(2B\) symbols per second produces overlapping pulses that the receiver cannot separate even with infinite SNR.

### Step 6 — Shannon-Hartley adds noise and gives the ultimate bit-rate limit
When additive white Gaussian noise is present, the capacity in bits per second is  
$$C = B \log_2\left(1 + \frac{S}{N}\right).$$  
This is the highest rate at which error probability can be made arbitrarily small.  
> [!WARNING]  
> The formula assumes Gaussian noise and infinite coding delay; real systems fall short by 1–3 dB.

## 5. Worked examples — har step show karo

**Example 1 — NRZ waveform for 10110**  
*Given:* Bit duration \(T=1\) ms, voltages \(\pm 1\) V.  
*Find:* Voltage at \(t=2.5\) ms.  
Step 1: bits are 1,0,1,1,0.  
Step 2: at \(t=2.5\) ms we are inside the third bit (1), so voltage = +1 V.  
*Why:* NRZ holds the level for the entire bit interval.  
**Final answer** +1 V

*Reflection:* The example is simple, yet it shows why long runs of 1s produce no edges.

**Example 2 — Manchester bit rate versus NRZ**  
*Given:* Channel bandwidth 10 MHz.  
*Find:* Maximum bit rate for each scheme.  
Step 1: Manchester needs one transition per bit, so symbol time \(T_s = 1/(2B)\).  
Step 2: \(B=10^7\) Hz \(\Rightarrow T_s=50\) ns \(\Rightarrow\) bit rate = 20 Mbps.  
Step 3: NRZ needs only one transition per two bits on average, so its limit is 10 Mbps under the same bandwidth.  
*Why:* The extra transition halves the usable bit duration.  
**Final answer** Manchester 20 Mbps, NRZ 10 Mbps

*Reflection:* Students often forget that Manchester’s transition rate, not its bit rate, must fit inside \(B\).

**Example 3 — Nyquist symbol rate**  
*Given:* \(B=4\) kHz, 4 voltage levels.  
*Find:* Maximum bit rate.  
Step 1: \(R_{\text{symbol}} \le 2B = 8000\) baud.  
Step 2: each symbol carries \(\log_2 4 = 2\) bits.  
Step 3: bit rate = 16000 bps.  
*Why:* Nyquist counts symbols; bits follow from levels.  
**Final answer** 16000 bps

*Reflection:* The calculation separates symbol rate from bit rate, a common source of confusion.

**Example 4 — Shannon-Hartley capacity**  
*Given:* \(B=20\) MHz, \(S/N=31\).  
*Find:* Capacity.  
Step 1: \(\frac{S}{N}=31 \Rightarrow 1+\frac{S}{N}=32\).  
Step 2: \(\log_2 32 = 5\).  
Step 3: \(C=20 \times 10^6 \times 5 = 100\) Mbps.  
*Why:* The logarithm converts the linear power ratio into bits per symbol.  
**Final answer** 100 Mbps

*Reflection:* Even with 31 times more signal than noise, capacity is only five bits per Hz, illustrating the slow growth of the log function.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Confusing baud with bps           | Textbooks use both words; students equate them      | Always write “symbols/s” or “bits/s” explicitly      |
| Forgetting the factor 2 in Nyquist| Remembering only “B symbols per second”             | Write the full inequality \(R_s\le 2B\) every time   |
| Using log₁₀ instead of log₂       | Calculator default is base 10                       | Add the conversion \( \log_2 x = \frac{\ln x}{\ln 2} \) |
| Ignoring that Manchester doubles bandwidth | Visualising only the data rate, not transitions | Count transitions per second before applying B limit |
| Treating Shannon as achievable rate | Marketing literature quotes “capacity” as throughput | Remember \(C\) is the theoretical ceiling, not a guarantee |
| Assuming infinite levels in Nyquist | Forgetting that real channels have noise            | Always pair Nyquist with Shannon when noise exists   |
| Neglecting units in SNR           | SNR given in dB but formula expects linear ratio    | Convert dB to linear: \(10^{x/10}\) before plugging in |

## 7. The textbook-precise statement
Kurose and Ross, Computer Networking: A Top-Down Approach, 8e, §1.2.2 and §1.4 state:  
“Let a channel have bandwidth \(B\) Hz. In the absence of noise the maximum symbol rate is \(2B\) symbols per second (Nyquist). When additive white Gaussian noise of power \(N\) is present and the received signal power is \(S\), the information capacity is exactly \(C=B\log_2(1+S/N)\) bits per second (Shannon-Hartley). Both results assume ideal sinc pulse shaping and arbitrarily long block coding.”

## 8. Visual — diagram or schematic
```text
Time axis (ms): 0    1    2    3    4
NRZ (10110):   +1V--+1V--+1V--+1V--+1V
               |    |    |    |    |
Manchester:    +1V-- -1V +1V--+1V-- -1V
               ^    ^    ^    ^    ^
               mid-bit transitions always present
Bandwidth limit shown as a low-pass filter cutting frequencies > 1/(2T)
```

## 9. The memory technique
1. **The hook** — Picture a train track: NRZ is a straight rail that stays flat for many carriages; Manchester is a rail that must wiggle once per carriage so the wheels never lose count.
2. **What to overlearn** — \(2B\) (Nyquist) and \(B\log_2(1+S/N)\) (Shannon-Hartley); also remember Manchester doubles the required bandwidth.
3. **Spaced-repetition schedule** — Review the two formulas after 1 day, 3 days, 7 days, 16 days and 35 days; each time derive them from the waveform sketch.
4. **First-principles fallback** — If the formula is lost, redraw the sinc pulse in frequency domain, count its zero crossings inside bandwidth \(B\), then add the log of distinguishable power levels.

## 10. What this unlocks
These results are the foundation for every later layer: link-layer framing must respect the bit rate given by Shannon, transport protocols tune their window size to the same capacity, and physical-layer research on 6G and optical links still begins from the same two equations.

- Next topics: line coding variants (4B5B, 8B/10B), pulse shaping filters, constellation diagrams (QPSK, QAM), channel coding (Hamming, LDPC), and OFDM.

## 11. Self-check — five questions, no answers
1. A channel of 5 MHz bandwidth uses NRZ with two levels. What is the theoretical maximum bit rate according to Nyquist?  
2. If the same channel has SNR = 15 dB, what does Shannon-Hartley predict for capacity?  
3. Why does Manchester encoding never allow more than 15 consecutive identical bits even if the data contains a long run of zeros?  
4. A designer claims “I will send 100 Mbps through a 10 MHz channel by using 32 voltage levels.” Which theorem is violated and why?  
5. Convert the Shannon formula into an expression that shows how many extra dB of power are needed to double the bit rate while keeping bandwidth fixed.