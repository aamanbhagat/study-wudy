## 1. The one-sentence answer
**NumPy FFT** np.fft module discrete signals aur arrays ke liye Fast Fourier Transform aur uske variants implement karta hai taaki time-domain data ko frequency-domain mein efficiently convert kiya ja sake.

Yeh module direct DFT ki O(n²) complexity ko Cooley-Tukey algorithm se O(n log n) tak le aata hai. Aap np.fft.fft, np.fft.ifft, np.fft.fftfreq jaise functions use karke real signals, images aur higher-dimensional data ka frequency content nikaal sakte ho bina khud mathematical implementation likhe.

np.fft output hamesha complex numbers deta hai jisme real part amplitude aur imaginary part phase represent karta hai. Isliye magnitude ke liye np.abs aur phase ke liye np.angle routinely use karna padta hai.

> [!NOTE]
> Sabse badi aha yeh hai ki ek hi line np.fft.fft(signal) aapko poora frequency spectrum de deta hai — lekin us spectrum ko sahi se interpret karne ke liye sampling rate aur frequency bins ko alag se track karna zaroori hai.

## 2. Why this matters — concrete and current
SpaceX Falcon 9 telemetry data mein vibration patterns detect karne ke liye np.fft ka use karta hai real-time engine health monitoring ke dauran.  
Google Photos JPEG compression pipeline mein related DCT (Discrete Cosine Transform) aur FFT variants background mein run karte hain taaki image blocks ko frequency space mein quantize kiya ja sake.  
LIGO gravitational-wave observatory raw strain data ko np.fft-style algorithms se clean karta hai taaki 10⁻²¹ strain sensitivity tak pahunch sake.  
Semiconductor fabs mein Applied Materials optical inspection tools wafer surface defects ko 2D FFT se spot karte hain sub-micron resolution par.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Complex numbers      | FFT output hamesha complex hota hai (real + imaginary)    |
| Sampling theorem     | Nyquist frequency samajhna zaroori hai aliasing avoid karne ke liye |
| Vectorised array ops | np.fft sirf NumPy arrays par fast chalta hai              |
| Basic trigonometry   | Sine/cosine waves frequency decomposition ka base hain    |

Agar complex numbers ya sampling theorem weak hai to pehle unhe revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Time domain se frequency domain tak
Ek signal time ke saath kaise change hota hai usko dekhna alag baat hai aur usme kaun-kaun si pure frequencies chhupi hain yeh dekhna alag baat hai.  
Example: 5 Hz aur 12 Hz ke do sine waves ka sum ek irregular waveform dikhaata hai; FFT usko do alag peaks mein tod deta hai.  
Formal statement: kisi discrete sequence \(x[n]\), \(n=0\dots N-1\) ke liye uska Discrete Fourier Transform \(X[k]\) hota hai  
$$X[k]=\sum_{n=0}^{N-1}x[n]e^{-2\pi i kn/N}.$$  
> [!WARNING] Agar aap signal ko window nahi karte (jaise Hann window) to spectral leakage ho jaati hai aur peaks spread ho jaate hain.

### Step 2 — Direct summation O(N²) kyun slow hai
Har frequency bin \(k\) ke liye N multiplications chahiye, aur N bins hote hain, isliye total N² operations.  
10 000 samples par yeh already ~10⁸ operations ban jaata hai — real-time audio ke liye unacceptable.

### Step 3 — Cooley-Tukey recursion ka intuition
N ko even-odd split karke chhote sub-problems mein tod do:  
$$X[k]=E[k]+W_N^k O[k],$$  
jahan \(E\) even indices ka FFT hai aur \(O\) odd indices ka.  
Yeh recursion log N levels tak jaati hai aur total cost N log N ho jaati hai.

### Step 4 — np.fft.fft ka interface
np.fft.fft(x) automatically optimal algorithm choose karta hai (radix-2, radix-3, bluestein etc.) aur complex128 output deta hai.  
Aap sirf `np.fft.fft(signal)` likho — baaki NumPy handle karta hai.

### Step 5 — Frequency axis banana
Bins ko actual Hz mein convert karne ke liye  
`freq = np.fft.fftfreq(N, d=1/sampling_rate)` use karo.  
Zero-frequency component hamesha index 0 par hota hai aur negative frequencies N/2 ke baad aati hain.

### Step 6 — Inverse transform aur Parseval’s relation
`np.fft.ifft(X)` original signal ko (almost) exact wapas laata hai.  
Energy conservation: `np.sum(np.abs(x)**2) == np.sum(np.abs(X)**2)/N`.

### Step 7 — 2D aur higher-dimensional FFT
Images ke liye `np.fft.fft2(img)` rows aur columns dono par FFT karta hai.  
Medical imaging (MRI) aur astronomy (radio interferometry) mein yeh routinely use hota hai.

### Step 8 — Textbook-grade statement
np.fft module Cooley-Tukey aur related algorithms ka highly-optimised, multi-threaded implementation deta hai jo IEEE-754 floating-point par deterministic results produce karta hai (NumPy 1.17+).

## 5. Worked examples — har step show karo

**Example 1 — Simple 5 Hz sine wave**  
*Given:* 128 samples, sampling rate 64 Hz, pure 5 Hz sine.  
*Find:* dominant frequency bin.  
```python
import numpy as np
t = np.arange(128)/64
x = np.sin(2*np.pi*5*t)
X = np.fft.fft(x)
mag = np.abs(X)
peak_bin = np.argmax(mag[:64])
freqs = np.fft.fftfreq(128, 1/64)
print(freqs[peak_bin])   # 5.0
```
*Why:* np.argmax sirf positive frequencies mein dekhta hai taaki DC aur negative side ignore ho.  
**Final answer:** 5.0 Hz  
*Reflection:* Trivial case leakage nahi dikhata kyunki signal exactly ek bin par pada.

**Example 2 — Two-tone signal with leakage**  
*Given:* 5 Hz + 5.5 Hz, rectangular window.  
*Find:* leakage effect.  
Same code se do peaks dikhte hain lekin dono spread hote hain.  
*Why:* Non-integer number of cycles in window → discontinuity.  
**Final answer:** Spread spectrum around 5 Hz aur 5.5 Hz  
*Reflection:* Real data mein hamesha window function lagao.

**Example 3 — Low-pass filter via FFT**  
*Given:* noisy signal.  
*Find:* cutoff ke neeche wale bins zero karo.  
```python
X = np.fft.fft(noisy)
X[np.abs(freqs)>10] = 0
clean = np.fft.ifft(X).real
```
*Why:* Frequency domain mein filtering multiplication ban jaati hai.  
**Final answer:** clean time signal  
*Reflection:* Circular convolution se bachne ke liye zero-padding zaroori hoti hai.

**Example 4 — 2D FFT on image**  
*Given:* 256×256 grayscale image.  
*Find:* radial power spectrum.  
```python
F = np.fft.fft2(img)
Fshift = np.fft.fftshift(F)
power = np.abs(Fshift)**2
```
*Why:* fftshift low frequencies ko centre laata hai visual inspection ke liye.  
**Final answer:** 2D power spectrum image  
*Reflection:* Astronomy aur microscopy mein yeh pattern analysis ka standard tool hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting np.abs on output | Complex numbers print karne se confusion    | Hamesha magnitude ke liye np.abs use karo    |
| Wrong axis in fft2          | Default axis=(0,1) galat ho sakta hai       | Explicit axis parameter pass karo            |
| No window before FFT        | Spectral leakage                          | np.hanning ya scipy.signal windows lagao     |
| Normalisation mismatch      | ifft(fft(x)) = N*x                          | Divide by N ya np.fft.ifft use karo          |
| Negative frequencies ignore | fftfreq output symmetric hota hai           | [:N//2] slice ya np.fft.rfft use karo        |
| dtype float32 overflow      | Large dynamic range                         | float64 ya complex128 force karo             |
| fftfreq sampling interval galat | d=1/sr bhool jaana                        | d parameter hamesha seconds mein do          |

## 7. The textbook-precise statement
The NumPy FFT routines compute the one-dimensional discrete Fourier transform  
$$X[k] = \sum_{n=0}^{N-1} x[n] \exp(-2\pi i kn/N), \quad k=0,\dots,N-1$$  
and its inverse using a Cooley–Tukey or Bluestein algorithm chosen at runtime for the given length. All transforms are unnormalised; the inverse therefore scales by 1/N. The implementation follows the same conventions as FFTW and guarantees bit-wise reproducibility across runs when the same array length and dtype are used (NumPy Reference Manual, v1.26, section “Discrete Fourier Transform (numpy.fft)”).

## 8. Visual — diagram or schematic
```text
Time-domain signal          Frequency-domain spectrum
x[0] x[1] ... x[N-1]   -->  |X[0]| |X[1]| ... |X[N//2]|
   ^ sampling points            ^ DC   ^ positive freqs
                                (negative freqs mirrored)
```

## 9. The memory technique
1. **The hook** — “FFT ek prism hai jo white-light signal ko rainbow frequencies mein tod deta hai.”  
2. **What to overlearn** — `np.fft.fft(x)`, `np.fft.fftfreq(N, d)`, `np.abs(X)`, `np.fft.ifft(X)`.  
3. **Spaced-repetition schedule** — 1 din baad, 3 din, 7 din, 16 din, 35 din.  
4. **First-principles fallback** — Formula $$X[k]=\sum x[n]e^{-2\pi i kn/N}$$ yaad na ho to sirf even-odd split recursion likh lo aur complexity N log N derive kar lo.

## 10. What this unlocks
- Fast convolution via FFT multiplication  
- Digital filter design (FIR/IIR)  
- Spectrogram aur STFT pipelines  
- Image compression aur denoising  
- Next topics: scipy.fft, cupy.fft (GPU), real-time DSP with PyAudio

## 11. Self-check — five questions, no answers
1. 1024 samples, 100 Hz sampling par 25 Hz sine wave ka peak bin index kya hoga?  
2. Kyun `np.fft.ifft(np.fft.fft(x))` exactly x nahi deta?  
3. 2D image ke liye `fft2` aur `fft` row-wise karne mein kya farak hai?  
4. Rectangular window use karne par 5.3 Hz component ka spectrum kaisa dikhega?  
5. Agar signal mein DC offset hai to fft output ke kis index par uska effect dikhega aur kaise hataye?