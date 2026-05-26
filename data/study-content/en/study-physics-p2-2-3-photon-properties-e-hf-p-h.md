## 1. The one-sentence answer
**Photons are discrete quanta of electromagnetic radiation whose energy is strictly proportional to frequency and whose momentum is inversely proportional to wavelength.**

Light that behaves like a continuous wave in diffraction experiments also behaves like a stream of particles when it ejects electrons from metal or scatters off electrons. Each particle, called a photon, carries a fixed packet of energy set by its frequency and a fixed momentum set by its wavelength. These two relations replace the classical picture in which energy could be added continuously and momentum followed only from Poynting’s vector.

The constant of proportionality in both relations is Planck’s constant \(h\). Because frequency and wavelength are linked by the universal speed of light, the two statements are not independent; one implies the other once special relativity is accepted. The result is that every electromagnetic wave, regardless of intensity, is built from indivisible units whose individual properties are fixed by \(f\) or \(\lambda\).

> [!NOTE]
> The single deepest insight is that \(E = hf\) and \(p = h/\lambda\) together force light to carry both energy and momentum in exact proportion to its frequency, so that intensity only changes the number of photons, never the size of each photon’s “kick.”

## 2. Why this matters — concrete and current
NASA’s Solar Cruiser mission (launch planned 2025) uses solar-sail attitude control that relies on the momentum transfer \(p = h/\lambda\) from sunlight; attitude torques are calculated directly from photon momentum rather than classical radiation pressure.

Compton cameras on the ESA’s INTEGRAL satellite measure gamma-ray polarization and source direction by tracking the wavelength shift \(\Delta\lambda = (h/m_ec)(1-\cos\theta)\), which is the direct experimental signature of \(p = h/\lambda\).

Single-photon avalanche diodes in SpaceX Starlink laser cross-links count individual photons to maintain 10 Gbps inter-satellite links at received powers below 1 nW, where classical wave detection fails.

In semiconductor process metrology, extreme-ultraviolet lithography tools at ASML measure absorbed dose via photoelectron yield; the yield is linear in photon number only because each 13.5 nm photon delivers a fixed \(E = hf \approx 92\) eV.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Planck’s constant \(h\)  | Universal scale that converts frequency to energy         |
| \(E = mc^2\) and \(p = E/c\) for massless particles | Links photon energy to momentum without rest mass         |
| Wave relation \(c = f\lambda\) | Converts between the energy and momentum expressions      |
| Photoelectric effect     | First experiment that demanded quantized energy           |

## 4. Building the idea — from intuition to formalism

### Step 1 — Energy cannot be added continuously
Classical waves allow any amount of energy to be delivered to a surface. Experiments show that electrons leave a metal only when the light frequency exceeds a sharp threshold, regardless of intensity. This forces the conclusion that energy arrives in indivisible packets whose size grows with frequency.

Formal statement:  
$$E = hf.$$

> [!WARNING]
> Treating intensity as the sole determinant of energy transfer predicts no frequency threshold and immediate emission at any brightness; both predictions contradict data.

### Step 2 — Momentum must accompany the energy packet
Special relativity requires any entity with energy \(E\) and zero rest mass to carry momentum \(p = E/c\). Substituting the energy relation immediately gives a momentum tied to wavelength.

Formal statement:  
$$p = \frac{E}{c} = \frac{hf}{c} = \frac{h}{\lambda}.$$

> [!WARNING]
> Omitting the relativistic link leaves \(E = hf\) without a corresponding momentum, making radiation pressure and Compton scattering inexplicable.

### Step 3 — The same constant governs both relations
Because \(c = f\lambda\) is an identity for all electromagnetic waves, the factor \(h\) appears in both formulas. No additional constant is required.

### Step 4 — Number of photons sets intensity, not size of each packet
Doubling source power doubles the number of photons per second; each photon’s energy and momentum remain fixed by \(f\) or \(\lambda\).

### Step 5 — Wave and particle descriptions coexist
Diffraction patterns are built by many photons whose individual arrival positions are random yet whose statistical distribution reproduces the classical interference fringes.

### Step 6 — Textbook statement of the result
The energy and momentum of a photon are therefore  
$$E = hf, \qquad p = \frac{h}{\lambda}.$$

## 5. Worked examples — every step shown

**Example 1 — Energy of a red photon**  
*Given:* \(\lambda = 650\) nm.  
*Find:* \(E\) in eV.  

Convert wavelength to frequency:  
$$f = \frac{c}{\lambda} = \frac{3.00 \times 10^8}{650 \times 10^{-9}} = 4.615 \times 10^{14}$$ Hz.  
*Why:* definition of wave speed.  

Insert into energy relation:  
$$E = hf = 6.626 \times 10^{-34} \times 4.615 \times 10^{14} = 3.058 \times 10^{-19}$$ J.  
*Why:* direct application of \(E = hf\).  

Convert to electron-volts:  
$$E = 3.058 \times 10^{-19} / 1.602 \times 10^{-19} = 1.91$$ eV.  

**1.91 eV**

*Reflection:* The arithmetic is elementary; the conceptual step is remembering to convert units after using SI constants.

**Example 2 — Momentum of the same photon**  
*Given:* \(E = 1.91\) eV.  
*Find:* \(p\).  

Use \(p = E/c\):  
$$p = \frac{1.91 \times 1.602 \times 10^{-19}}{3.00 \times 10^8} = 1.016 \times 10^{-27}$$ kg m/s.  
*Why:* relativistic relation for massless particles.  

Cross-check with \(p = h/\lambda\): identical result within rounding.  

**1.016 \times 10^{-27} kg m/s**

*Reflection:* Two independent routes converge only because \(c = f\lambda\) holds.

**Example 3 — Compton shift at 90°**  
*Given:* incident \(\lambda = 0.071\) nm, \(\theta = 90^\circ\).  
*Find:* \(\Delta\lambda\).  

Apply Compton formula derived from \(p = h/\lambda\):  
$$\Delta\lambda = \frac{h}{m_ec}(1-\cos 90^\circ) = 2.426 \times 10^{-12}$$ m = 0.00243 nm.  

**0.00243 nm**

*Reflection:* The shift is independent of incident wavelength, a direct consequence of photon momentum conservation.

**Example 4 — Number of photons in a laser pulse**  
*Given:* 1 mJ pulse at 532 nm.  
*Find:* photon count.  

Energy per photon:  
$$E = \frac{hc}{\lambda} = 3.73 \times 10^{-19}$$ J.  
*Why:* \(E = hf\) rewritten with \(c/\lambda\).  

Number:  
$$N = 10^{-3} / 3.73 \times 10^{-19} = 2.68 \times 10^{15}.$$  

**2.68 \times 10^{15} photons**

*Reflection:* Intensity enters only through the count \(N\); each photon’s properties stay fixed.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                              | How to avoid it                                      |
|-------------------------------------|---------------------------------------------|------------------------------------------------------|
| Using \(E = hf\) with classical intensity | Habit from wave optics                      | Always compute number of photons separately          |
| Forgetting \(p = E/c\) for photons  | Treating photons as massive particles       | Insert rest mass = 0 before applying relativity      |
| Confusing \(\lambda\) with de Broglie wavelength of electrons | Same symbol, different context              | Keep photon label explicit until units are checked   |
| Reporting energy in J when eV is conventional | SI default in formulas                      | Convert immediately after calculation                |
| Assuming photons have rest mass     | Misreading \(E = mc^2\) without \(m=0\)     | Write four-vector \((E/c, \mathbf{p})\) with \(E = pc\) |
| Neglecting that \(f\) is frame-dependent | Non-relativistic intuition                  | Use invariant phase \(\phi = k\cdot x - \omega t\)    |
| Applying \(p = h/\lambda\) to sound waves | Over-generalizing quantization              | Restrict to massless bosons obeying Maxwell equations |

## 7. The textbook-precise statement
A photon of frequency \(f\) (measured in the observer’s inertial frame) carries energy \(E = hf\) and momentum magnitude \(p = hf/c = h/\lambda\), where \(\lambda = c/f\). These relations follow from the quantization of the free electromagnetic field and the requirement that the photon four-momentum be null. (Feynman, Leighton & Sands, *The Feynman Lectures on Physics*, Vol. III, §4–3, 1965.)

## 8. Visual — diagram or schematic

```text
Energy–momentum line for photons
p
↑
│          /
│        /
│      /   slope = 1/c   (E = pc)
│    /
│  /
└──────────────────────→ E
0
```
The straight line through the origin with slope \(1/c\) contains every possible photon state. Vertical or horizontal displacement changes only the number of photons, never their individual \(E\) or \(p\).

## 9. The memory technique

1. **The hook** — Picture a photon as a tiny “surfboard” riding its own wave; the faster the wave oscillates (higher \(f\)), the more energy the board carries and the harder it hits when it arrives.
2. **What to overlearn** — \(E = hf\), \(p = h/\lambda\), and \(E = pc\) for any massless particle.
3. **Spaced-repetition schedule** — Review relations at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.
4. **First-principles fallback** — Re-derive from \(E = hf\) plus \(E = pc\) and \(c = f\lambda\).

## 10. What this unlocks
Mastery of photon kinematics is the gateway to quantum field theory, quantum optics, and relativistic particle kinematics.

- Quantization of the electromagnetic field and creation/annihilation operators
- Klein–Nishina cross section for Compton scattering
- Laser cooling and optical molasses
- Photon rocket thrust calculations (\(F = \dot{N}h/\lambda\))

## 11. Self-check — five questions, no answers
1. A 100 W monochromatic source emits at 500 nm. How many photons leave the source each second?
2. Show that the momentum of a photon equals its energy divided by \(c\) using only \(E = hf\) and \(c = f\lambda\).
3. A 0.10 nm X-ray photon scatters at 180°. Calculate the wavelength of the scattered photon and the kinetic energy imparted to the electron.
4. Why does doubling the intensity of a radio wave not change the momentum transferred per photon, yet does change the force on a sail?
5. Identify the hidden assumption that would make \(E = hf\) appear to violate energy conservation in a gravitational field.