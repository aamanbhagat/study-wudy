## What it is
The `np.fft` module provides functions for computing the Fast Fourier Transform (FFT). The FFT is an efficient algorithm to compute the Discrete Fourier Transform (DFT), which decomposes a sequence of values (like a signal over time) into its constituent frequencies. In essence, it translates a signal from the time domain to the frequency domain.

## Why it matters
The FFT is a cornerstone of digital signal processing and scientific computing. In aerospace, it's used to analyze vibrations in rocket structures, process radar and communication signals, and solve fluid dynamics equations using spectral methods. In machine learning, Fourier features are used in various models, and convolutions (fundamental to CNNs) can be computed efficiently via FFTs.

## When to study it
Before tackling `np.fft`, you must have a solid grasp of these prerequisites. If not, master them first.
1.  **NumPy:** Creating and manipulating `ndarray` objects. You should be comfortable with array creation, indexing, and vectorized operations.
2.  **Complex Numbers:** Specifically, Euler's formula ($e^{i\theta} = \cos\theta + i\sin\theta$) and the meaning of magnitude and phase of a complex number. The output of the FFT is complex.
3.  **Discrete Fourier Transform (DFT):** You must understand what the transform represents mathematically. The FFT is just a *fast algorithm* for the DFT. Without this, `np.fft` is a black box that will mislead you.

## How to study it (step by step)
1.  **Review the DFT.** Write down the formula for the DFT and its inverse. Identify the roles of the number of samples ($N$), the sample index ($n$), and the frequency index ($k$).
2.  **Generate a perfect signal.** Create a NumPy array representing a pure sine wave. For example, a 50 Hz sine wave sampled at 1000 Hz for 2 seconds. Plot it to confirm it looks correct (amplitude vs. time).
3.  **Apply `np.fft.fft`.** Use `np.fft.fft` on your sine wave data. Plot the *absolute value* (`np.abs`) of the result against the array indices (0, 1, 2, ...). Observe the symmetry.
4.  **Create the correct frequency axis.** The plot from step 3 is not physically meaningful yet. Use `np.fft.fftfreq` to generate the correct frequencies corresponding to each output bin of the FFT. Re-plot the FFT magnitude against these frequencies. You should now see a sharp peak at 50 Hz (and -50 Hz).
5.  **Combine signals.** Create a new signal by adding two different sine waves (e.g., 50 Hz and 120 Hz). Repeat steps 3 and 4. The power of the FFT should become obvious: the frequency plot will clearly show two distinct peaks at 50 Hz and 120 Hz, separating the mixed signal.
6.  **Investigate the inverse.** Take the output of your FFT from step 5 and apply `np.fft.ifft`. Plot the result. It should perfectly reconstruct your original two-sine-wave signal, demonstrating the reversibility of the transform.

## Key ideas, with intuition
1.  **The Bridge Between Domains:** The core idea is a change of basis. A signal can be described as a sequence of amplitude values at discrete time steps (the time domain). Alternatively, it can be described as a sum of pure sinusoids, each with a specific frequency, amplitude, and phase (the frequency domain). The FFT is the bridge that takes you from the time domain to the frequency domain.

2.  **Projection onto Sinusoids:** The DFT formula calculates how much of a specific frequency is present in the signal. Think of it as a dot product. For each frequency $k$, you are "projecting" your entire time-domain signal $x_n$ onto a complex sinusoid (a "basis vector") of that frequency. A large value for a given frequency bin $X_k$ means the signal strongly correlates with a sinusoid of that frequency.
    $$
    X_k = \sum_{n=0}^{N-1} x_n \cdot e^{-i 2\pi k n / N}
    $$
    Here, $x_n$ is the signal, and $e^{-i 2\pi k n / N}$ is the complex sinusoid for frequency bin $k$.

3.  **Complex Output = Amplitude + Phase:** The output of the FFT, $X_k$, is an array of complex numbers. Do not ignore the imaginary part.
    -   The **magnitude**, $|X_k|$, gives you the amplitude of the sinusoid at frequency $k$. This is what is usually plotted and is often the most important piece of information.
    -   The **angle**, $\arg(X_k)$, gives you the phase shift of that sinusoid. This is critical for signal reconstruction but often ignored in simple spectral analysis.

4.  **The Nyquist Frequency:** You cannot resolve frequencies that are higher than half your sampling rate. If you sample a signal at $f_s = 1000$ Hz, the highest frequency you can uniquely identify is $f_{Nyquist} = f_s / 2 = 500$ Hz. Any frequency content above this will be "aliased" — it will incorrectly appear as a lower frequency in your FFT output. This is a fundamental limit of discrete sampling.

## Worked example
Let's find the constituent frequencies of a noisy signal. We'll create a signal composed of a 30 Hz and an 80 Hz sine wave, sampled at 500 Hz, and add some random noise.

```python
import numpy as np
import matplotlib.pyplot as plt

# 1. Setup signal parameters
fs = 500  # Sampling frequency in Hz
T = 1.0 / fs  # Sampling period in seconds
N = 1000  # Number of sample points
t = np.linspace(0.0, N*T, N, endpoint=False) # Time vector

# 2. Create the signal: 30 Hz and 80 Hz sine waves + noise
# Amplitudes are 0.7 and 1.0 respectively
x = 0.7 * np.sin(2.0 * np.pi * 30.0 * t) + 1.0 * np.sin(2.0 * np.pi * 80.0 * t)
x_noisy = x + 2.5 * np.random.randn(N)

# 3. Compute the FFT
# The output yf is complex
yf = np.fft.fft(x_noisy)
# Generate the frequency axis. xf is in Hz.
xf = np.fft.fftfreq(N, T)

# 4. Plot the results
# We only need to plot the first half of the samples (due to symmetry)
N_half = N // 2

plt.figure(figsize=(12, 6))

plt.subplot(1, 2, 1)
plt.plot(t, x_noisy)
plt.title("Time Domain Signal")
plt.xlabel("Time (s)")
plt.ylabel("Amplitude")
plt.grid()

plt.subplot(1, 2, 2)
# The magnitude of the FFT is scaled by 2/N to get the correct amplitude
plt.plot(xf[:N_half], 2.0/N * np.abs(yf[:N_half]))
plt.title("Frequency Domain (FFT)")
plt.xlabel("Frequency (Hz)")
plt.ylabel("Amplitude")
plt.grid()
plt.xlim(0, fs/2) # Only show up to Nyquist frequency
plt.tight_layout()
plt.show()
```

**Reflection:**
-   **Step 1 & 2:** We created a realistic scenario. The time-domain plot shows a messy, noisy signal where the underlying structure is not obvious.
-   **Step 3:** `np.fft.fft` performed the transformation. The crucial companion step was `np.fft.fftfreq`, which provided the physically meaningful x-axis for our frequency plot. Without it, we'd be plotting against meaningless integer indices.
-   **Step 4:** By plotting the magnitude of the FFT output against the generated frequencies, the hidden structure is revealed. We see two sharp peaks precisely at 30 Hz and 80 Hz, successfully identifying the original components despite the noise. The scaling by `2.0/N` is a normalization convention to recover the original amplitudes (0.7 and 1.0).

## Diagrams
Here is the relationship between the time and frequency domains for a simple signal.

Time Domain View: A pure sine wave.
```text
Amplitude
   ^
 1 +      *
   |     * *
   |    *   *
   |   *     *
 0 +--*-------*-------*-----> Time
   | *         *     *
   |*           *   *
   |*             * *
-1 +                *
```

Frequency Domain View (Magnitude of FFT): A single spike at the wave's frequency.
```text
Amplitude
   ^
   |
   |
   |        |
   |        |
   |        |
   |________|________________> Frequency
            ^
           f_0
```

## Memory technique — remember this forever
1.  **The Prism Analogy:** Think of the FFT as a prism. The time-domain signal is a beam of white light (a mixture of all colors). The FFT (`np.fft.fft`) is the prism itself, which splits the white light into its constituent rainbow of colors (the frequency spectrum). The inverse FFT (`np.fft.ifft`) is like a second, inverted prism that recombines the rainbow back into white light.

2.  **Must-overlearn formulas/facts:**
    -   **DFT Definition:** $X_k = \sum_{n=0}^{N-1} x_n \cdot e^{-i 2\pi k n / N}$
    -   **Nyquist Limit:** $f_{max} = f_s / 2$ (Max frequency is half the sample rate).
    -   **Frequency Bin Location:** The frequency of bin $k$ is $f_k = k \cdot (f_s / N)$. This is what `np.fft.fftfreq` calculates for you.

3.  **Spaced Repetition Schedule:** Review this material and re-implement the worked example from scratch at **1 day, 3 days, 7 days, 16 days, 35 days**.

4.  **First Principles Pathway:** If you forget everything, start with the DFT formula. Remember it's a projection. The term $e^{-i 2\pi k n / N}$ is a point rotating on the complex unit circle. The whole sum asks: "If we wrap our signal $x_n$ around this circle, what is the center of mass?" If the signal has a strong component at the frequency of rotation, the center of mass will be far from the origin. This gives you the intuition for what $X_k$ represents.

## Common mistakes
1.  **Plotting against Index, not Frequency:** The most common error is `plt.plot(np.abs(yf))`. This plots FFT magnitude against the array index `k`, which is not frequency. You **must** use `np.fft.fftfreq` to generate the correct x-axis in Hz.
2.  **Ignoring Symmetry and Nyquist:** For a real-valued input signal, the FFT output is conjugate symmetric. The second half of the array is redundant. Students often plot the entire array, showing a mirrored spectrum from $f_s/2$ to $f_s$, which is confusing and uninformative. Always plot from 0 up to the Nyquist frequency, $f_s/2$.
3.  **Forgetting to use `np.abs()`:** The output of `np.fft.fft` is complex. Plotting it directly will either fail or produce a confusing plot with real and imaginary parts. You almost always want to plot the magnitude: `np.abs(yf)`.
4.  **Incorrect Amplitude Scaling:** The raw output magnitude of the FFT scales with the number of samples, $N$. To get an amplitude that is independent of the signal length, you must normalize, typically by dividing by $N$ (or $N/2$ for single-sided spectra of real signals).

## Self-check
1.  You have a signal containing 4096 data points, sampled at a rate of 2048 Hz. You compute the FFT. At which array index `k` would you expect to find the peak corresponding to a 128 Hz sine wave?
2.  You are analyzing audio from a rocket engine test, sampled at 44.1 kHz. You need to check for a specific harmonic vibration at 25 kHz. Why will a standard FFT of this data fail to give you a meaningful result for that frequency? What is the term for this phenomenon?
3.  A colleague sends you the complex output `Y` from an FFT. They tell you `Y[10]` is `30 - 40j`. What is the amplitude and phase of the frequency component in that bin? How would you use `np.fft.ifft` to prove that your calculation is correct for just that single component?