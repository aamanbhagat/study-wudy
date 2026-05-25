## 1. What it is — in plain English

Imagine you're listening to a musical chord. You hear a rich, combined sound. But you know that chord is actually made up of several individual notes, each with its own pitch (how high or low it is) and loudness. If you could somehow separate those notes, you'd understand the chord much better.

The Fast Fourier Transform, or FFT, is like a super-smart tool that does exactly this for any kind of signal. Instead of musical notes, it breaks down complex signals—like sounds, radio waves, or even patterns in data—into their simplest "ingredients": basic, pure waves, each with a specific frequency (how fast it wiggles) and strength.

So, if you feed a complicated signal into the FFT, it doesn't tell you what the signal looks like over time. Instead, it tells you *what pure frequencies are present in that signal and how strong each one is*. It transforms the signal from a "time view" to a "frequency view."

NumPy's `np.fft` module provides a highly optimized way to perform this FFT operation using Python. It's the go-to tool for anyone working with digital signals and needing to understand their frequency content.

## 2. Why it matters — real-world applications

The ability to decompose signals into their constituent frequencies is incredibly powerful and underpins countless technologies and scientific discoveries.

1.  **Audio Processing and Music Production:** Ever used noise-canceling headphones or adjusted the bass and treble on your stereo? FFT is at the heart of it. It's used to identify and remove unwanted noise from recordings, equalize audio (boosting or cutting specific frequencies), synthesize sounds, and even analyze musical structure to detect instruments or tempo. Companies like Spotify use it for audio analysis, and professional audio software (e.g., Ableton Live, Logic Pro) relies heavily on FFT for effects, analysis, and mastering.
2.  **Image and Video Compression:** When you take a picture with your phone or watch a video online, FFT (or a similar transform, like the Discrete Cosine Transform which is closely related) is often used to compress the data. It transforms the image data into its frequency components. High-frequency components often represent fine details that are less noticeable to the human eye, so they can be discarded or compressed more aggressively without significant loss in perceived quality, leading to smaller file sizes (JPEG, MPEG).
3.  **Telecommunications and Wireless Communication:** From your cell phone to Wi-Fi routers and satellite communication, FFT is crucial. It allows for efficient modulation and demodulation of signals, packing more data into limited bandwidth. For instance, Orthogonal Frequency-Division Multiplexing (OFDM), a technology used in 4G LTE, 5G, and Wi-Fi, relies on FFT to transmit multiple data streams simultaneously on different frequency carriers, maximizing data transfer rates and robustness against interference.
4.  **Medical Imaging (MRI):** Magnetic Resonance Imaging (MRI) machines use powerful magnetic fields and radio waves to create detailed images of organs and tissues inside the body. The raw data collected by an MRI scanner is in the "k-space" (frequency domain). An FFT is then applied to this frequency-domain data to reconstruct the familiar anatomical images we see, allowing doctors to diagnose diseases without invasive surgery.
5.  **Vibration Analysis and Structural Health Monitoring (Aerospace/Engineering):** Engineers use FFT to analyze vibrations in structures like aircraft wings, bridges, or rotating machinery. By transforming vibration data from the time domain to the frequency domain, they can identify specific resonant frequencies, detect early signs of fatigue, imbalance, or damage, and predict potential failures, ensuring safety and optimizing maintenance schedules. This is critical in aerospace for predicting engine component life or detecting wing flutter.

## 3. Prerequisites — what you must know first

Before diving deep into NumPy's FFT, ensure you have a solid grasp of these fundamental concepts:

*   **Python Basics:** Variables, data types, lists, loops, functions, basic object-oriented concepts.
*   **NumPy Basics:** How to create and manipulate `ndarray` objects, basic array operations (addition, multiplication, slicing), and broadcasting.
*   **Complex Numbers:** Understanding the real and imaginary parts of a complex number, its magnitude and phase, and basic arithmetic operations (addition, multiplication).
*   **Trigonometry:** Familiarity with sine and cosine functions, their properties (amplitude, frequency, phase), and how they relate to circular motion.
*   **Euler's Formula:** The relationship $e^{ix} = \cos(x) + i\sin(x)$, which is fundamental to understanding the complex exponential used in the Fourier Transform.
*   **Signals and Waves:** The concept of a signal changing over time, and how it can be represented as a combination of simpler, periodic waves.
*   **Sampling:** Understanding what it means to digitize a continuous signal by taking discrete measurements at regular intervals, and the concept of sampling rate.
*   **Discrete Fourier Transform (DFT):** The mathematical idea of transforming a finite sequence of discrete data points from the time domain into a sequence of frequency-domain components.

## 4. The core idea — step by step

Let's break down the core concept of the Fast Fourier Transform, building intuition step by step.

### ### Step 1: The Problem: Complex Signals

*   **Plain English:** The world is full of messy, complicated signals. Think about the sound of a bustling city street, a fluctuating stock price, or the erratic readings from a sensor on a machine. These signals change rapidly and irregularly over time, making them hard to understand directly.
*   **Small concrete example:** Imagine recording the sound of a car horn, a dog barking, and someone talking, all at once. If you plot the sound wave over time, it would look like a very jagged, irregular line.
*   **Formal/mathematical version:** We often represent such a signal as a function of time, $x(t)$, for a continuous signal, or as a sequence of discrete values, $x[n]$, for a digital signal (where $n$ is the sample index).
*   **What could go wrong:** Assuming all real-world signals are simple and predictable. Most are not, and their complexity hides underlying patterns.

### ### Step 2: The Solution: Simple Waves are Building Blocks

*   **Plain English:** A brilliant idea, first formalized by Joseph Fourier, is that *any* complex, messy signal can be perfectly recreated by adding up a bunch of simple, pure sine and cosine waves. Each of these simple waves has its own specific frequency (how fast it wiggles), amplitude (how tall it is), and phase (where it starts in its cycle).
*   **Small concrete example:** Just like a master chef can create any dish by combining basic ingredients (salt, sugar, flour, spices), or a painter can create any color by mixing primary colors, a complex sound (like an orchestra) can be seen as a sum of many individual, pure musical notes (which are essentially sine waves).
*   **Formal/mathematical version:** For a continuous periodic signal, this is the Fourier Series:
    $$x(t) = A_0 + \sum_{k=1}^{\infty} \left( A_k \cos\left(\frac{2\pi k t}{T}\right) + B_k \sin\left(\frac{2\pi k t}{T}\right) \right)$$
    where $T$ is the period, and $A_k, B_k$ are coefficients (amplitudes) for each frequency $k/T$. For discrete signals, we use the Discrete Fourier Transform (DFT).
*   **What could go wrong:** Believing that complex signals are fundamentally irreducible. The Fourier insight is that they *are* reducible to simpler components.

### ### Step 3: From Time Domain to Frequency Domain

*   **Plain English:** When we look at a signal over time (e.g., a waveform on an oscilloscope), we are in the "time domain." The Fourier Transform allows us to switch our perspective to the "frequency domain." Instead of seeing *when* a signal is high or low, we see *what frequencies* are present in the signal and *how strong* each one is. It's like switching from looking at a single ingredient (e.g., a raw egg) to looking at the nutritional breakdown of a finished cake (how much protein, fat, carbs).
*   **Small concrete example:** If you plot a sound wave, the x-axis is time. If you apply the Fourier Transform, the x-axis becomes frequency, and the y-axis shows the "strength" or "power" of each frequency component. A pure tone would show a single spike at its frequency in the frequency domain. A complex sound would show multiple spikes.
*   **Formal/mathematical version:** The Fourier Transform $\mathcal{F}\{x(t)\}$ maps a function of time $x(t)$ to a function of frequency $X(f)$ (or angular frequency $X(\omega)$). For discrete signals, the Discrete Fourier Transform (DFT) maps $x[n]$ to $X[k]$.
*   **What could go wrong:** Confusing the two domains. A high value in the time domain means a strong signal *at that specific time*. A high value in the frequency domain means a strong presence of *that specific frequency* throughout the signal.

### ### Step 4: The Discrete Fourier Transform (DFT)

*   **Plain English:** Since computers deal with discrete samples (digital data) rather than continuous signals, we use the Discrete Fourier Transform (DFT). The DFT is a specific mathematical formula that takes a sequence of $N$ data points (our sampled signal in the time domain) and transforms it into another sequence of $N$ data points (representing the frequencies present in the signal). Each point in the output sequence tells us the amplitude and phase of a specific frequency component.
*   **Small concrete example:** If you have 1000 samples of a sound, the DFT will give you 1000 complex numbers. The first number might represent the strength of the 0 Hz component, the second the strength of the 1 Hz component, and so on, up to half the sampling rate (due to Nyquist theorem).
*   **Formal/mathematical version:** For a discrete signal $x[n]$ with $N$ samples, where $n = 0, 1, \dots, N-1$, the Discrete Fourier Transform $X[k]$ for $k = 0, 1, \dots, N-1$ is given by:
    $$X[k] = \sum_{n=0}^{N-1} x[n] e^{-i 2\pi k n / N}$$
    Here, $i$ is the imaginary unit ($i^2 = -1$), and $e^{-i 2\pi k n / N}$ is a complex exponential that represents a rotating vector in the complex plane. Each $X[k]$ is a complex number whose magnitude $|X[k]|$ gives the amplitude of the $k$-th frequency component, and its argument $\arg(X[k])$ gives its phase.
*   **What could go wrong:** The complex exponential $e^{-i 2\pi k n / N}$ can be intimidating. Remember Euler's formula: $e^{i\theta} = \cos(\theta) + i\sin(\theta)$. So, $e^{-i 2\pi k n / N} = \cos(-2\pi k n / N) + i\sin(-2\pi k n / N)$. This term essentially correlates the input signal $x[n]$ with a complex sinusoid of frequency $k$.

### ### Step 5: The Fast Fourier Transform (FFT) Algorithm

*   **Plain English:** Calculating the DFT directly using the formula from Step 4 is computationally very expensive, especially for long signals. If you have $N$ samples, it takes about $N^2$ operations. For $N=1,000,000$, that's a trillion operations! The Fast Fourier Transform (FFT) is not a different *transform*; it's a super-clever, highly optimized *algorithm* to compute the *same* DFT result much, much faster. It uses a "divide and conquer" strategy, breaking down the large DFT into smaller, easier-to-compute DFTs.
*   **Small concrete example:** Imagine you have a huge list of numbers to sum. Instead of adding them one by one, you divide the list into two halves, sum each half, and then add the two sums. The FFT takes this idea much further, recursively breaking down the problem. This dramatically reduces the number of operations.
*   **Formal/mathematical version:** The most common FFT algorithm is the Cooley-Tukey algorithm. It works most efficiently when $N$ (the number of samples) is a power of 2 (e.g., 256, 1024, 4096). Its computational complexity is approximately $N \log_2 N$. For $N=1,000,000$, this is about 20 million operations, a massive improvement over $N^2$.
*   **What could go wrong:** Confusing the FFT as a *type* of transform distinct from the DFT. It is an *algorithm* for computing the DFT. Also, not realizing that while FFT is fast, its output still needs careful interpretation.

### ### Step 6: NumPy's `np.fft` Module

*   **Plain English:** NumPy provides a highly optimized implementation of the FFT algorithm in its `np.fft` module. This means you don't have to write the complex FFT algorithm yourself; you just feed your sampled signal (a NumPy array) into a function like `np.fft.fft()`, and it quickly returns the frequency components. It also provides inverse transforms to go back to the time domain, and utilities to help interpret the frequencies.
*   **Small concrete example:**
    ```python
    import numpy as np
    import matplotlib.pyplot as plt

    # Create a simple sine wave
    sampling_rate = 100 # samples per second
    duration = 1 # second
    t = np.linspace(0, duration, int(sampling_rate * duration), endpoint=False)
    frequency = 5 # Hz
    amplitude = 1
    signal = amplitude * np.sin(2 * np.pi * frequency * t)

    # Perform FFT
    fft_output = np.fft.fft(signal)

    # Calculate corresponding frequencies
    frequencies = np.fft.fftfreq(len(signal), d=1/sampling_rate)

    # Plot magnitude spectrum
    plt.plot(frequencies, np.abs(fft_output))
    plt.title('Frequency Spectrum')
    plt.xlabel('Frequency (Hz)')
    plt.ylabel('Magnitude')
    plt.grid(True)
    plt.show()
    ```
*   **Formal/mathematical version:** The `np.fft` module includes functions like:
    *   `np.fft.fft(a, n=None, axis=-1, norm=None)`: Computes the 1D Discrete Fourier Transform.
    *   `np.fft.ifft(a, n=None, axis=-1, norm=None)`: Computes the 1D inverse DFT.
    *   `np.fft.fftfreq(n, d=1.0)`: Returns the DFT sample frequencies.
    *   `np.fft.fftshift(x, axes=None)`: Shifts zero-frequency component to the center of the spectrum.
    *   `np.fft.rfft(a, n=None, axis=-1, norm=None)`: Computes the DFT for real input. (More efficient for real signals).
*   **What could go wrong:** The output of `np.fft.fft` is a complex array. The frequencies are ordered in a specific way: 0 Hz, then positive frequencies up to Nyquist, then negative frequencies (wrapping around). This often requires `np.fft.fftfreq` to get the correct frequency values and `np.fft.fftshift` to reorder the output for intuitive plotting (moving the 0 Hz component to the center).

## 5. Worked examples — multiple, with every step shown

Let's walk through several examples to solidify your understanding of `np.fft`.

### Example 1: Single Pure Sine Wave

**Problem:** Generate a 10 Hz sine wave, sample it at 100 Hz for 1 second, and then use NumPy's FFT to find its frequency components.

**Given:**
*   Signal: Sine wave
*   Frequency of signal ($f_{\text{signal}}$): 10 Hz
*   Sampling rate ($f_s$): 100 Hz
*   Duration ($T$): 1 second

**What we want:**
*   The frequency spectrum of the sampled signal.

**Steps:**

1.  **Define parameters:**
    ```python
    import numpy as np
    import matplotlib.pyplot as plt

    f_signal = 10  # Hz, frequency of the sine wave
    f_s = 100      # Hz, sampling rate
    duration = 1   # seconds
    ```
    *Explanation:* We set up the basic characteristics of our signal and how we'll sample it.

2.  **Create the time vector:**
    ```python
    num_samples = int(f_s * duration) # Calculate total number of samples
    t = np.linspace(0, duration, num_samples, endpoint=False)
    ```
    *Explanation:* `np.linspace` creates an array of evenly spaced numbers over a specified interval. `endpoint=False` means the last point (`duration`) is not included, which is standard for sampling periodic signals to avoid duplicate points. `num_samples` determines the length of our signal.

3.  **Generate the sine wave signal:**
    ```python
    signal = np.sin(2 * np.pi * f_signal * t)
    ```
    *Explanation:* This is the standard formula for a sine wave: $A \sin(2\pi f t)$, where $A=1$ (amplitude). We're creating the time-domain representation of our 10 Hz sine wave.

4.  **Perform the FFT:**
    ```python
    fft_output = np.fft.fft(signal)
    ```
    *Explanation:* This is the core step. `np.fft.fft()` takes our time-domain signal array and returns an array of complex numbers representing the frequency components. The length of `fft_output` will be the same as `signal` (`num_samples`).

5.  **Calculate the corresponding frequencies:**
    ```python
    frequencies = np.fft.fftfreq(num_samples, d=1/f_s)
    ```
    *Explanation:* The `fft_output` array doesn't directly tell us *which* frequencies it represents. `np.fft.fftfreq(N, d)` generates an array of frequency bins. `N` is the number of samples, and `d` is the sample spacing (inverse of the sampling rate). This array will correctly map each element of `fft_output` to its corresponding frequency in Hz.

6.  **Analyze and plot the magnitude spectrum:**
    ```python
    # Take the absolute value (magnitude) of the complex FFT output
    magnitude_spectrum = np.abs(fft_output)

    # Plotting
    plt.figure(figsize=(10, 4))

    plt.subplot(1, 2, 1) # Time domain plot
    plt.plot(t, signal)
    plt.title('Time Domain Signal (10 Hz Sine Wave)')
    plt.xlabel('Time (s)')
    plt.ylabel('Amplitude')
    plt.grid(True)

    plt.subplot(1, 2, 2) # Frequency domain plot
    plt.plot(frequencies, magnitude_spectrum)
    plt.title('Frequency Domain Spectrum')
    plt.xlabel('Frequency (Hz)')
    plt.ylabel('Magnitude')
    plt.grid(True)
    plt.xlim(-f_s/2, f_s/2) # Limit x-axis to Nyquist frequency range
    plt.tight_layout()
    plt.show()
    ```
    *Explanation:* The `fft_output` contains complex numbers. The magnitude (absolute value) of these complex numbers tells us the strength of each frequency component. We plot this against the `frequencies` array. We also show the original time-domain signal for comparison. The `xlim` is set to the Nyquist frequency range (from $-f_s/2$ to $f_s/2$) because frequencies outside this range are aliases.

7.  **Identify the dominant frequency:**
    ```python
    # Find the index of the peak magnitude (ignoring the DC component at 0 Hz)
    # We often look at the positive frequencies only, or use fftshift for better visualization.
    # For a simple sine wave, we expect two symmetric peaks.
    # Let's find the positive frequency peak.
    positive_frequencies = frequencies[frequencies >= 0]
    positive_magnitude_spectrum = magnitude_spectrum[frequencies >= 0]

    # Find the index of the maximum magnitude in the positive frequency range
    peak_idx = np.argmax(positive_magnitude_spectrum)
    dominant_frequency = positive_frequencies[peak_idx]

    print(f"Dominant frequency detected: {dominant_frequency:.2f} Hz")
    ```
    *Explanation:* We expect a strong peak at 10 Hz. The `np.argmax` function helps us find the index of the highest magnitude, and then we use that index to retrieve the corresponding frequency.

**Final Answer:**
The FFT output will show two distinct peaks in the magnitude spectrum: one at **10 Hz** and another at **-10 Hz**. This is characteristic of a real-valued sine wave. The magnitude of these peaks will be proportional to half the amplitude of the sine wave times the number of samples.

**Reflection:** This example demonstrates the most basic use of FFT. The key takeaway is how a single, pure frequency in the time domain translates into distinct spikes at that frequency (and its negative counterpart) in the frequency domain. It also highlights the importance of `np.fft.fftfreq` to correctly interpret the frequency axis.

---

### Example 2: Sum of Two Sine Waves

**Problem:** Create a signal that is the sum of a 5 Hz sine wave and a 20 Hz sine wave. Sample it at 100 Hz for 2 seconds. Use FFT to identify both constituent frequencies.

**Given:**
*   Signal 1: Sine wave, $f_1 = 5$ Hz, Amplitude $A_1 = 1.0$
*   Signal 2: Sine wave, $f_2 = 20$ Hz, Amplitude $A_2 = 0.5$
*   Sampling rate ($f_s$): 100 Hz
*   Duration ($T$): 2 seconds

**What we want:**
*   The frequency spectrum, clearly showing peaks at 5 Hz and 20 Hz.

**Steps:**

1.  **Define parameters:**
    ```python
    import numpy as np
    import matplotlib.pyplot as plt

    f1 = 5      # Hz
    A1 = 1.0
    f2 = 20     # Hz
    A2 = 0.5
    f_s = 100   # Hz
    duration = 2 # seconds
    ```
    *Explanation:* Setting up the parameters for our two sine waves and the sampling.

2.  **Create the time vector:**
    ```python
    num_samples = int(f_s * duration)
    t = np.linspace(0, duration, num_samples, endpoint=False)
    ```
    *Explanation:* Same as before, creating the time points for our signal.

3.  **Generate the composite signal:**
    ```python
    signal1 = A1 * np.sin(2 * np.pi * f1 * t)
    signal2 = A2 * np.sin(2 * np.pi * f2 * t)
    composite_signal = signal1 + signal2
    ```
    *Explanation:* We generate each sine wave separately and then sum them to create our complex time-domain signal.

4.  **Perform the FFT:**
    ```python
    fft_output = np.fft.fft(composite_signal)
    ```
    *Explanation:* Applying the FFT to the combined signal.

5.  **Calculate the corresponding frequencies:**
    ```python
    frequencies = np.fft.fftfreq(num_samples, d=1/f_s)
    ```
    *Explanation:* Getting the correct frequency bins for our FFT output.

6.  **Analyze and plot the magnitude spectrum (using `fftshift` for better visualization):**
    ```python
    magnitude_spectrum = np.abs(fft_output)

    # Shift the zero-frequency component to the center for better visualization
    shifted_fft_output = np.fft.fftshift(fft_output)
    shifted_frequencies = np.fft.fftshift(frequencies)
    shifted_magnitude_spectrum = np.abs(shifted_fft_output)

    plt.figure(figsize=(12, 5))

    plt.subplot(1, 2, 1)
    plt.plot(t, composite_signal)
    plt.title('Time Domain Composite Signal')
    plt.xlabel('Time (s)')
    plt.ylabel('Amplitude')
    plt.grid(True)

    plt.subplot(1, 2, 2)
    plt.plot(shifted_frequencies, shifted_magnitude_spectrum)
    plt.title('Frequency Domain Spectrum (Shifted)')
    plt.xlabel('Frequency (Hz)')
    plt.ylabel('Magnitude')
    plt.grid(True)
    plt.xlim(-f_s/2, f_s/2)
    plt.tight_layout()
    plt.show()
    ```
    *Explanation:* We calculate the magnitude spectrum. This time, we introduce `np.fft.fftshift`. The raw output of `np.fft.fft` has the 0 Hz component at index 0, positive frequencies from index 1 up to `N/2-1`, and negative frequencies from `N/2` to `N-1`. `fftshift` rearranges this so that the 0 Hz component is in the middle, with negative frequencies to its left and positive frequencies to its right, making the plot more intuitive. We apply `fftshift` to both the FFT output and the frequencies array to ensure they align.

7.  **Identify the dominant frequencies:**
    ```python
    # Find peaks in the positive frequency range of the shifted spectrum
    # We consider only the positive half for simplicity in identifying distinct frequencies
    positive_shifted_frequencies = shifted_frequencies[shifted_frequencies >= 0]
    positive_shifted_magnitude_spectrum = shifted_magnitude_spectrum[shifted_frequencies >= 0]

    # Find indices of peaks (e.g., by checking values above a certain threshold)
    # A simple way for clean signals is to find local maxima or just the largest ones.
    # For this example, knowing we have two, we can find the two largest positive magnitudes.
    # To avoid picking nearby points of the same peak, we can filter.
    # Let's just pick the top 2 overall for simplicity here.
    sorted_indices = np.argsort(positive_shifted_magnitude_spectrum)[::-1] # Sort descending

    # Get the top 2 frequencies (excluding potential DC bias at 0 Hz if present)
    detected_frequencies = []
    for idx in sorted_indices:
        freq = positive_shifted_frequencies[idx]
        if freq > 0.1: # Ignore frequencies very close to 0 Hz
            detected_frequencies.append(freq)
        if len(detected_frequencies) == 2: # We expect two distinct positive frequencies
            break

    print(f"Detected frequencies: {np.sort(detected_frequencies)}")
    ```
    *Explanation:* We look for the peaks in the magnitude spectrum. Since we expect two main frequencies, we identify the two strongest peaks in the positive frequency range.

**Final Answer:**
The FFT output will clearly show four distinct peaks in the magnitude spectrum: two at **5 Hz** (and -5 Hz) and two at **20 Hz** (and -20 Hz). The peak corresponding to 5 Hz will be twice as high as the peak for 20 Hz, reflecting their original amplitudes (1.0 vs 0.5).

**Reflection:** This example demonstrates the power of FFT to disentangle multiple frequencies present in a single signal. It also introduces `np.fft.fftshift`, which is crucial for creating easily interpretable frequency plots with the zero frequency at the center.

---

### Example 3: Approximating a Square Wave

**Problem:** A square wave can be approximated by a sum of odd-harmonic sine waves (Fourier Series). Generate a square wave and use FFT to observe its harmonic components.

**Given:**
*   Signal: Square wave
*   Fundamental frequency ($f_{\text{fundamental}}$): 2 Hz
*   Sampling rate ($f_s$): 100 Hz
*   Duration ($T$): 2 seconds

**What we want:**
*   The frequency spectrum, showing peaks at odd multiples of the fundamental frequency (2 Hz, 6 Hz, 10 Hz, etc.).

**Steps:**

1.  **Define parameters:**
    ```python
    import numpy as np
    import matplotlib.pyplot as plt
    from scipy import signal as sp_signal # Using scipy's square wave for convenience

    f_fundamental = 2  # Hz
    f_s = 100          # Hz
    duration = 2       # seconds
    ```
    *Explanation:* Setting up the fundamental frequency for our square wave and sampling parameters. We'll use `scipy.signal.square` for easy square wave generation.

2.  **Create the time vector:**
    ```python
    num_samples = int(f_s * duration)
    t = np.linspace(0, duration, num_samples, endpoint=False)
    ```
    *Explanation:* Standard time vector creation.

3.  **Generate the square wave signal:**
    ```python
    square_wave = sp_signal.square(2 * np.pi * f_fundamental * t)
    ```
    *Explanation:* `scipy.signal.square` generates a square wave with a period of $2\pi$ (for the input argument). We scale `t` by `2 * np.pi * f_fundamental` to get a 2 Hz square wave.

4.  **Perform the FFT:**
    ```python
    fft_output = np.fft.fft(square_wave)
    ```
    *Explanation:* Compute the DFT of the square wave.

5.  **Calculate the corresponding frequencies:**
    ```python
    frequencies = np.fft.fftfreq(num_samples, d=1/f_s)
    ```
    *Explanation:* Get the frequency bins.

6.  **Analyze and plot the magnitude spectrum (using `fftshift`):**
    ```python
    shifted_fft_output = np.fft.fftshift(fft_output)
    shifted_frequencies = np.fft.fftshift(frequencies)
    shifted_magnitude_spectrum = np.abs(shifted_fft_output)

    plt.figure(figsize=(12, 5))

    plt.subplot(1, 2, 1)
    plt.plot(t, square_wave)
    plt.title('Time Domain Square Wave (2 Hz)')
    plt.xlabel('Time (s)')
    plt.ylabel('Amplitude')
    plt.grid(True)
    plt.ylim(-1.5, 1.5)

    plt.subplot(1, 2, 2)
    plt.plot(shifted_frequencies, shifted_magnitude_spectrum)
    plt.title('Frequency Domain Spectrum of Square Wave')
    plt.xlabel('Frequency (Hz)')
    plt.ylabel('Magnitude')
    plt.grid(True)
    plt.xlim(-f_s/2, f_s/2)
    plt.tight_layout()
    plt.show()
    ```
    *Explanation:* Plotting the time-domain square wave and its frequency spectrum. We use `fftshift` for clarity. According to Fourier Series theory, a square wave should have strong components at its fundamental frequency and its odd harmonics (3rd, 5th, 7th, etc.). The magnitude of these harmonics decreases with increasing frequency.

7.  **Identify the harmonic components:**
    ```python
    # Find peaks in the positive frequency range
    positive_shifted_frequencies = shifted_frequencies[shifted_frequencies >= 0]
    positive_shifted_magnitude_spectrum = shifted_magnitude_spectrum[shifted_frequencies >= 0]

    # Filter for significant peaks
    # The magnitude of the k-th harmonic is proportional to 1/k.
    # We expect peaks at f_fundamental, 3*f_fundamental, 5*f_fundamental, etc.
    # Let's set a threshold relative to the largest peak.
    max_mag = np.max(positive_shifted_magnitude_spectrum)
    threshold = max_mag * 0.1 # Example threshold, adjust as needed

    harmonic_frequencies = []
    for freq, mag in zip(positive_shifted_frequencies, positive_shifted_magnitude_spectrum):
        if mag > threshold:
            # Round to nearest integer to account for floating point inaccuracies
            rounded_freq = round(freq)
            if rounded_freq % f_fundamental == 0 and (rounded_freq / f_fundamental) % 2 == 1:
                # Check if it's an odd multiple of the fundamental
                harmonic_frequencies.append(rounded_freq)

    # Remove duplicates and sort
    harmonic_frequencies = sorted(list(set(harmonic_frequencies)))
    print(f"Detected harmonic frequencies (rounded): {harmonic_frequencies} Hz")
    ```
    *Explanation:* We iterate through the positive frequencies and their magnitudes. We set a threshold to identify significant peaks. We then check if these peaks correspond to odd multiples of the fundamental frequency, as predicted by Fourier theory for a square wave.

**Final Answer:**
The frequency spectrum will show prominent peaks at **2 Hz** (the fundamental), **6 Hz** (3rd harmonic), **10 Hz** (5th harmonic), **14 Hz** (7th harmonic), and so on, with their magnitudes decreasing as the frequency increases.

**Reflection:** This example vividly illustrates Fourier's principle that complex waveforms are composed of simpler sine waves. It demonstrates how FFT can be used to analyze the harmonic content of non-sinusoidal periodic signals, which is fundamental in fields like electronics and acoustics.

---

### Example 4: Signal with Noise and Windowing (Harder)

**Problem:** Analyze a noisy signal consisting of a 15 Hz sine wave corrupted by random noise. Use FFT to extract the dominant frequency and demonstrate the effect of windowing.

**Given:**
*   Signal: 15 Hz sine wave, Amplitude 1.0
*   Noise: Gaussian random noise
*   Sampling rate ($f_s$): 200 Hz
*   Duration ($T$): 4 seconds

**What we want:**
*   The frequency spectrum, clearly showing the 15 Hz component amidst noise.
*   Demonstrate how a window function (e.g., Hann window) can improve spectral leakage.

**Steps:**

1.  **Define parameters:**
    ```python
    import numpy as np
    import matplotlib.pyplot as plt
    from scipy.signal import hann # Import Hann window

    f_signal = 15  # Hz
    A_signal = 1.0
    f_s = 200      # Hz
    duration = 4   # seconds
    ```
    *Explanation:* Set up signal and sampling parameters. We'll use `scipy.signal.hann` for the window function.

2.  **Create the time vector:**
    ```python
    num_samples = int(f_s * duration)
    t = np.linspace(0, duration, num_samples, endpoint=False)
    ```
    *Explanation:* Standard time vector.

3.  **Generate the clean sine wave and add noise:**
    ```python
    clean_signal = A_signal * np.sin(2 * np.pi * f_signal * t)
    noise = 0.5 * np.random.randn(num_samples) # Gaussian noise with std dev 0.5
    noisy_signal = clean_signal + noise
    ```
    *Explanation:* We create the pure sine wave and then add random Gaussian noise to simulate a real-world noisy measurement.

4.  **Perform FFT on the raw noisy signal:**
    ```python
    fft_raw = np.fft.fft(noisy_signal)
    frequencies = np.fft.fftfreq(num_samples, d=1/f_s)
    shifted_fft_raw = np.fft.fftshift(fft_raw)
    shifted_frequencies = np.fft.fftshift(frequencies)
    magnitude_raw = np.abs(shifted_fft_raw)
    ```
    *Explanation:* Perform FFT on the noisy signal without any windowing. We'll compare this to the windowed version.

5.  **Apply a window function (Hann window) and then perform FFT:**
    ```python
    hann_window = hann(num_samples) # Generate a Hann window
    windowed_signal = noisy_signal * hann_window # Apply the window to the signal

    fft_windowed = np.fft.fft(windowed_signal)
    shifted_fft_windowed = np.fft.fftshift(fft_windowed)
    magnitude_windowed = np.abs(shifted_fft_windowed)
    ```
    *Explanation:* Windowing is crucial when the signal segment you're analyzing is not perfectly periodic within the sampling window. If the signal starts and ends abruptly (which is common, especially with noise), it creates "spectral leakage" in the FFT, spreading energy across frequencies. A window function (like Hann, Hamming, Blackman) smoothly tapers the signal at its beginning and end, reducing this leakage. We multiply our noisy signal by the Hann window before performing the FFT.

6.  **Analyze and plot the results:**
    ```python
    plt.figure(figsize=(14, 6))

    plt.subplot(1, 2, 1)
    plt.plot(t, noisy_signal)
    plt.title('Time Domain Noisy Signal (15 Hz Sine + Noise)')
    plt.xlabel('Time (s)')
    plt.ylabel('Amplitude')
    plt.grid(True)

    plt.subplot(1, 2, 2)
    plt.plot(shifted_frequencies, magnitude_raw, label='No Window')
    plt.plot(shifted_frequencies, magnitude_windowed, label='Hann Window', alpha=0.7)
    plt.title('Frequency Domain Spectrum Comparison')
    plt.xlabel('Frequency (Hz)')
    plt.ylabel('Magnitude')
    plt.grid(True)
    plt.xlim(-f_s/2, f_s/2)
    plt.legend()
    plt.tight_layout()
    plt.show()
    ```
    *Explanation:* We plot the noisy signal in the time domain and then compare the magnitude spectra of the raw FFT and the windowed FFT. The windowed spectrum should show a cleaner peak at 15 Hz with less "fuzziness" (leakage) around it.

7.  **Identify the dominant frequency (from windowed spectrum for better accuracy):**
    ```python
    # Focus on positive frequencies for identifying the peak
    positive_shifted_frequencies = shifted_frequencies[shifted_frequencies >= 0]
    positive_magnitude_windowed = magnitude_windowed[shifted_frequencies >= 0]

    peak_idx = np.argmax(positive_magnitude_windowed)
    dominant_frequency = positive_shifted_frequencies[peak_idx]

    print(f"Dominant frequency detected (from windowed spectrum): {dominant_frequency:.2f} Hz")
    ```
    *Explanation:* We find the strongest peak in the positive frequency range of the windowed spectrum to identify our original signal frequency.

**Final Answer:**
The FFT of the noisy signal will show a clear peak at **15 Hz** (and -15 Hz), standing out from the broadband noise floor. The spectrum generated with the **Hann window** will exhibit a sharper, narrower peak at 15 Hz with significantly reduced spectral leakage (i.e., less energy spread into adjacent frequency bins) compared to the raw FFT, making the 15 Hz component more distinct.

**Reflection:** This example introduces the practical challenge of noise and the crucial concept of windowing in FFT analysis. In real-world applications, signals are rarely perfectly periodic within the observation window, and windowing helps mitigate artifacts (spectral leakage) that can obscure true frequency components. It shows how FFT can be used to extract signals from noise, a fundamental task in signal processing.

## 6. Common mistakes and traps

1.  **Misinterpreting the FFT Output Order:** The raw output of `np.fft.fft` has 0 Hz (DC component) at index 0, followed by positive frequencies up to the Nyquist frequency, and then negative frequencies. Many students expect a symmetric spectrum centered at 0 Hz.
    *   *Why it happens:* Not understanding the default ordering of `np.fft.fft` output.
    *   *Solution:* Always use `np.fft.fftfreq` to generate the correct frequency axis and `np.fft.fftshift` to reorder both the FFT output and the frequency axis for intuitive plotting.

2.  **Incorrect Sampling Rate (`d` in `fftfreq`):** Forgetting to provide the correct sample spacing (`d = 1/sampling_rate`) to `np.fft.fftfreq` leads to an incorrect frequency axis.
    *   *Why it happens:* Assuming `fftfreq` magically knows the sampling rate or using the default `d=1.0`.
    *   *Solution:* Explicitly calculate `d = 1.0 / sampling_rate` and pass it to `fftfreq`.

3.  **Violating the Nyquist-Shannon Sampling Theorem (Aliasing):** Attempting to analyze frequencies higher than half the sampling rate ($f_s/2$). These high frequencies will "fold back" and appear as lower frequencies in the spectrum.
    *   *Why it happens:* Not understanding that a discrete signal can only represent frequencies up to half its sampling rate.
    *   *Solution:* Ensure your sampling rate is at least twice the highest frequency component you expect (or are interested in) in your signal. If higher frequencies are present, apply an anti-aliasing filter *before* sampling.

4.  **Ignoring the Complex Nature of FFT Output:** The output of `np.fft.fft` is an array of complex numbers. Students sometimes plot just the real part or forget that the magnitude (`np.abs()`) represents the amplitude of the frequency component and the phase (`np.angle()`) represents its phase shift.
    *   *Why it happens:* Lack of familiarity with complex numbers or their role in signal representation.
    *   *Solution:* For amplitude spectrum, always use `np.abs(fft_output)`. For phase information, use `np.angle(fft_output)`.

5.  **Spectral Leakage (Not Using Window Functions):** When a signal segment is not perfectly periodic within the observed window (e.g., it starts/ends abruptly), the FFT spreads energy from a single frequency into adjacent frequency bins, making peaks look wider and less distinct.
    *   *Why it happens:* Assuming the signal is inherently periodic within the chosen observation window, or unaware of the concept of windowing.
    *   *Solution:* For non-periodic or finite-duration signals, apply a window function (e.g., Hann, Hamming, Blackman) to the signal *before* performing the FFT. NumPy itself doesn't have window functions, but `scipy.signal` does.

6.  **Confusing FFT with DFT:** Thinking FFT is a different mathematical transform from the Discrete Fourier Transform.
    *   *Why it happens:* The "Fast" in FFT can imply a different result, not just a faster computation.
    *   *Solution:* Remember that FFT is an *algorithm* for efficiently computing the *Discrete Fourier Transform (DFT)*. They produce the same mathematical result.

## 7. Textbook-precise explanation

The Fast Fourier Transform (FFT) is an efficient algorithm to compute the Discrete Fourier Transform (DFT). Given a finite sequence of $N$ complex numbers $x_0, x_1, \dots, x_{N-1}$ (representing samples of a signal in the time domain), their DFT is a sequence of $N$ complex numbers $X_0, X_1, \dots, X_{N-1}$ (representing the signal in the frequency domain), defined by the formula:

$$X_k = \sum_{n=0}^{N-1} x_n e^{-i 2\pi k n / N} \quad \text{for } k = 0, 1, \dots, N-1$$

where $i = \sqrt{-1}$ is the imaginary unit, and $e^{-i 2\pi k n / N}$ is the complex exponential, also known as a twiddle factor. This formula can be expanded using Euler's formula $e^{i\theta} = \cos(\theta) + i\sin(\theta)$ as:

$$X_k = \sum_{n=0}^{N-1} x_n \left( \cos\left(\frac{2\pi k n}{N}\right) - i \sin\left(\frac{2\pi k n}{N}\right) \right)$$

Each $X_k$ is a complex number. Its magnitude, $|X_k| = \sqrt{\text{Re}(X_k)^2 + \text{Im}(X_k)^2}$, represents the amplitude of the $k$-th frequency component, and its argument (phase angle), $\arg(X_k) = \text{atan2}(\text{Im}(X_k), \text{Re}(X_k))$, represents the phase shift of that component.

The inverse Discrete Fourier Transform (IDFT) reconstructs the original time-domain signal from its frequency components:

$$x_n = \frac{1}{N} \sum_{k=0}^{N-1} X_k e^{i 2\pi k n / N} \quad \text{for } n = 0, 1, \dots, N-1$$

The direct computation of the DFT involves $N^2$ complex multiplications and additions. The FFT algorithm, notably the Cooley-Tukey algorithm, significantly reduces this computational complexity to $O(N \log N)$ operations, particularly when $N$ is a power of 2. This efficiency makes real-time spectral analysis of large datasets feasible.

Key properties of the DFT include:
*   **Linearity:** The DFT of a sum of signals is the sum of their individual DFTs.
*   **Periodicity:** Both $x_n$ and $X_k$ are periodic with period $N$.
*   **Symmetry for Real Signals:** If $x_n$ is a real-valued signal, then its DFT exhibits Hermitian symmetry: $X_k = X_{N-k}^*$ (where $^*$ denotes complex conjugation). This means the magnitude spectrum $|X_k|$ is symmetric, and the phase spectrum $\arg(X_k)$ is anti-symmetric.
*   **Parseval's Theorem:** This theorem states that the total energy of the signal is the same in both the time and frequency domains:
    $$\sum_{n=0}^{N-1} |x_n|^2 = \frac{1}{N} \sum_{k=0}^{N-1} |X_k|^2$$

The `numpy.fft` module provides implementations for these transforms and related utilities. `np.fft.fft(x)` computes the DFT, and `np.fft.ifft(X)` computes the IDFT. `np.fft.fftfreq(N, d)` generates the corresponding frequencies for the DFT output, ordered from 0 to positive Nyquist frequency, then negative Nyquist to just below 0. `np.fft.fftshift(X)` rearranges the output to place the zero-frequency component in the center, which is often more intuitive for visualization.

**References:**
*   Oppenheim, A. V., & Schafer, R. W. (2009). *Discrete-Time Signal Processing* (3rd ed.). Pearson. (Chapter 8: The Discrete Fourier Transform)
*   Press, W. H., Teukolsky, S. A., Vetterling, W. T., & Flannery, B. P. (2007). *Numerical Recipes: The Art of Scientific Computing* (3rd ed.). Cambridge University Press. (Chapter 12: Fast Fourier Transform)

## 8. ASCII diagrams

Here's a conceptual diagram illustrating the transformation from the time domain to the frequency domain via FFT.

```text
                                  FFT (np.fft.fft)
                                  ---------------->
+---------------------+           +---------------------+
|   TIME DOMAIN       |           |   FREQUENCY DOMAIN  |
|                     |           |                     |
|  Amplitude          |           |   Magnitude         |
|    ^                |           |     ^               |
|    |                |           |     |               |
|    |     .          |           |     |    *          |
|    |    /|\         |           |     |    |          |
|    |   / | \        |           |     |    |          |
|    |  /  |  \       |           |     |    |          |
|    | /   |   \      |           |     |    |          |
|    |/____|____\__   |           |     |____|____*____>|
|    0   Time (s)     |           |     0   Frequency (Hz)
|                     |           |                     |
|  A complex signal   |           |  Its constituent    |
|  (e.g., sum of       |           |  frequencies and    |
|  sine waves)        |           |  their strengths    |
+---------------------+           +---------------------+
      |                                     ^
      |                                     |
      ---------------------------------------
              IFFT (np.fft.ifft)
              <----------------
```

**Description of Diagram:**

The diagram shows two boxes, representing the "Time Domain" and "Frequency Domain."

*   **Time Domain (Left Box):**
    *   The x-axis is "Time (s)".
    *   The y-axis is "Amplitude".
    *   A wavy line (represented by `/\` and `|`) indicates a complex signal that changes over time, potentially showing multiple superimposed waves.
    *   Below the graph, it states: "A complex signal (e.g., sum of sine waves)".

*   **Frequency Domain (Right Box):**
    *   The x-axis is "Frequency (Hz)".
    *   The y-axis is "Magnitude" (or Amplitude).
    *   Vertical lines (represented by `*` and `|`) indicate distinct peaks at specific frequencies, with the height of the line representing the strength (magnitude) of that frequency component. In this example, there are two distinct peaks, implying the original signal was made of two primary frequencies.
    *   Below the graph, it states: "Its constituent frequencies and their strengths".

*   **Arrows:**
    *   An arrow labeled "FFT (np.fft.fft)" points from the Time Domain box to the Frequency Domain box, indicating the transformation from time to frequency.
    *   An arrow labeled "IFFT (np.fft.ifft)" points from the Frequency Domain box back to the Time Domain box, indicating the inverse transformation.

This diagram visually encapsulates the core idea: FFT breaks down a complex time-varying signal into its fundamental frequency components.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    *   **FFT: "Frequency Finder Tool"** – Think of it as a specialized metal detector for signals. You feed it a jumbled mess of sound/data (like digging in dirt), and it tells you exactly what pure tones or "metals" (frequencies) are hidden inside and how strong they are.
    *   **Visual:** Imagine a prism. White light (a complex signal) goes in, and out come distinct bands of colors (individual frequencies of light). FFT is the mathematical prism for digital signals.

2.  **1-3 Formulas/Facts They MUST Overlearn:**
    *   **DFT Formula (Conceptual):** $X[k] = \sum x[n] \cdot (\text{complex sinusoid of frequency } k)$. Don't need to memorize every symbol initially, but understand it's a sum of signal points multiplied by rotating complex exponentials.
    *   **Nyquist-Shannon Sampling Theorem:** $f_s \ge 2 \cdot f_{\text{max}}$. Your sampling rate must be at least twice the highest frequency you want to detect. If not, aliasing occurs (high frequencies masquerade as low ones).
    *   **FFT is an *algorithm*, not a transform:** It's a fast way to compute the Discrete Fourier Transform (DFT).

3.  **Spaced-Repetition Schedule:**
    *   **Today (0 days):** Review this entire lesson. Re-implement one of the worked examples from scratch.
    *   **1 Day:** Briefly recall the main purpose of FFT, the Nyquist theorem, and the need for `fftfreq`/`fftshift`. Mentally walk through the steps of Example 2.
    *   **3 Days:** Explain FFT in plain English to an imaginary friend. Write down the conceptual DFT formula. Try to debug a simple FFT problem (e.g., where `fftfreq` is omitted).
    *   **7 Days:** Review the "Common mistakes and traps" section. Implement Example 4 (noisy signal with windowing) without looking at the solution.
    *   **16 Days:** Attempt to derive the basic idea of the DFT from Euler's formula. Write down the full DFT formula. Compare your understanding with the "Textbook-precise explanation."
    *   **35 Days:** Explain the difference between DFT and FFT, and why windowing is important. Brainstorm 3 new real-world applications of FFT.

4.  **First-Principles Re-derivation Pathway:**
    *   **Start with a simple sine wave:** $y(t) = A \sin(2\pi f t)$.
    *   **Connect to Euler's Formula:** Recall that $\sin(\theta) = \text{Im}(e^{i\theta})$. So, a sine wave can be expressed using complex exponentials. $e^{i\theta} = \cos(\theta) + i\sin(\theta)$. This shows that complex exponentials are the fundamental building blocks.
    *   **Generalize to Complex Exponentials as Basis Functions:** Real-world signals can be seen as a sum of many complex exponentials ($e^{i 2\pi f t}$) at different frequencies.
    *   **How to find the contribution of each frequency?** To find how much of a specific frequency $f_k$ is in a signal $x(t)$, we "correlate" $x(t)$ with a complex exponential of that frequency. Mathematically, this involves integrating $x(t) \cdot e^{-i 2\pi f_k t}$ over time. The negative sign is crucial for projection.
    *   **Discretize for computers (DFT):** Replace continuous time $t$ with discrete samples $n$, continuous frequency $f$ with discrete frequency bins $k$, and the integral with a summation. This directly leads to the DFT formula:
        $$X[k] = \sum_{n=0}^{N-1} x[n] e^{-i 2\pi k n / N}$$
    *   **Why "Fast"?** The FFT is just a clever way to compute this sum much faster by exploiting redundancies and symmetries in the complex exponential terms.

## 10. Connections — what this leads to

The `np.fft` module and the underlying principles of the Fourier Transform are foundational to many advanced topics in Computer Science, Engineering, and Scientific Computing:

1.  **Digital Signal Processing (DSP):** FFT is the cornerstone of DSP. It enables filtering (removing unwanted frequencies), equalization, modulation/demodulation, spectral estimation, and audio/video effects. This leads to understanding concepts like FIR/IIR filters, convolution, and correlation.
2.  **Image Processing:** Beyond basic compression, FFT is used for image filtering (e.g., blurring, sharpening), edge detection, noise reduction, and pattern recognition in the frequency domain. It's crucial for understanding 2D Fourier Transforms.
3.  **Convolution Theorem:** One of the most powerful applications of the Fourier Transform is the Convolution Theorem, which states that convolution in the time domain is equivalent to multiplication in the frequency domain. This vastly speeds up operations like applying filters to signals or images, which would otherwise be computationally expensive convolutions.
4.  **Wavelet Transforms:** While FFT decomposes signals into sine waves (fixed frequency, infinite duration), Wavelet Transforms decompose them into wavelets (variable frequency, finite duration). This allows for better time-frequency localization and is used in areas like image compression (JPEG 2000), medical imaging, and seismic analysis.
5.  **Spectral Analysis & Feature Engineering:** In machine learning, especially with time-series data, FFT can extract powerful features (e.g., dominant frequencies, power spectral density) that describe the underlying patterns of the data, which can then be fed into classification or regression models.
6.  **Quantum Mechanics:** The Fourier Transform has a profound connection to quantum mechanics, where it represents the transformation between position space and momentum space. A particle's wavefunction in position space can be Fourier transformed to obtain its wavefunction in momentum space.
7.  **Partial Differential Equations (PDEs):** Fourier Transforms are extensively used to solve PDEs, particularly in physics and engineering. They convert differential equations into algebraic equations in the frequency domain, which are often much easier to solve.
8.  **Data Compression Algorithms:** Many modern compression algorithms (e.g., MP3, JPEG, MPEG) are built upon the principles of Fourier analysis (or related transforms like Discrete Cosine Transform) to efficiently represent and discard less perceptually important frequency components.

## 11. Self-check questions

1.  A continuous signal contains frequencies up to 500 Hz. What is the minimum sampling rate required to avoid aliasing if you want to perfectly reconstruct this signal from its samples? Explain your reasoning.
2.  You perform an FFT on a real-valued signal with 1024 samples. How many unique positive frequency components will be in the output spectrum (excluding the DC component)? If the sampling rate was 1000 Hz, what would be the maximum positive frequency represented?
3.  Describe a scenario where applying a window function *before* performing an FFT would be critical, and explain what problem it helps to mitigate.
4.  Consider a signal $x[n]$ that is the sum of a 2 Hz sine wave (amplitude 1.0) and a 3 Hz cosine wave (amplitude 0.5). If you compute its DFT, what would you expect to see in the magnitude spectrum, and how might the phase spectrum differ for the 2 Hz and 3 Hz components?
5.  You have a time-series dataset from a sensor, and you want to detect if a specific machine component is vibrating abnormally at 60 Hz. Outline the steps you would take using NumPy's `np.fft` module to analyze this data and identify the 60 Hz vibration.