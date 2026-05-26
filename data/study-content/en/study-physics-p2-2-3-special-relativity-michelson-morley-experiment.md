## 1. The one-sentence answer
**The Michelson-Morley experiment is a precise optical interferometer measurement that returned a null result for any directional dependence of light speed, falsifying the luminiferous-ether hypothesis and supplying the empirical foundation for the constancy of c.**

In classical physics an ether was required to carry light waves, and Earth’s orbital velocity through that ether should have produced a detectable difference in light travel time along parallel versus perpendicular paths. The apparatus split a light beam, sent the halves along equal-length arms at right angles, and recombined them to look for a shift in interference fringes as the whole instrument was rotated.

No shift appeared at any orientation or season, to within the experimental precision of a few kilometers per second against an orbital speed of 30 km/s. The outcome forced physicists to abandon the idea of an absolute rest frame for light.

> [!NOTE]
> The decisive insight is that the null result is not a failure of measurement but direct evidence that light speed is independent of the observer’s motion through any supposed medium.

## 2. Why this matters — concrete and current
Global navigation satellite systems (GPS, Galileo, BeiDou) must correct onboard clock rates for both special-relativistic time dilation arising from orbital velocity and the Michelson-Morley-verified isotropy of c; without the latter correction, positional errors accumulate at roughly 10 km per day.

Particle-physics detectors at the LHC rely on the same isotropy to synchronize arrival times of photons and charged particles across baselines of tens of meters; any ether-like anisotropy at the level once expected would shift reconstructed invariant masses outside the observed 10^{-4} resolution.

Modern laser interferometric gravitational-wave observatories (LIGO, Virgo) inherit the exact optical topology of Michelson and Morley; their ability to measure strains of 10^{-21} rests on the experimental fact, first established in 1887, that light travel time is insensitive to absolute orientation.

Precision tests of Lorentz invariance in atomic clocks and astrophysical neutrinos continue to tighten the same bound; the 1887 null result remains the historical anchor for all such limits quoted in the Particle Data Group reviews.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Wave interference        | Fringe shift is the observable that encodes path-length difference |
| Galilean velocity addition | Classical expectation for light speed relative to ether   |
| Pythagorean theorem      | Used to compute light path length in the transverse arm   |
| Definition of fringe     | One fringe = one wavelength path difference               |

## 4. Building the idea — from intuition to formalism

### Step 1 — Classical ether and absolute motion
A medium (ether) was postulated to support electromagnetic waves, furnishing an absolute rest frame. Light speed relative to that frame is c; an observer moving at velocity v through the ether therefore measures a direction-dependent speed given by Galilean addition.

A concrete example: if Earth moves at 30 km s^{-1} through the ether, light traveling “downstream” should have speed c − v while light traveling “upstream” should have speed c + v.

Formally, the expected one-way speeds are  
$$c_{\parallel}^{+} = c + v,\qquad c_{\parallel}^{-} = c - v.$$

> [!WARNING]
> Treating these speeds as isotropic in the lab frame at this stage already discards the very hypothesis the experiment was designed to test.

### Step 2 — The interferometer geometry
A beam splitter divides a monochromatic source into two coherent beams that travel along perpendicular arms of equal proper length L and are reflected back to recombine. Rotation of the apparatus interchanges the roles of the arms relative to the putative ether wind.

### Step 3 — Longitudinal arm transit time
For the arm parallel to v the outbound and return times differ. The total round-trip time is  
$$t_{\parallel} = \frac{L}{c-v} + \frac{L}{c+v} = \frac{2L}{c}\frac{1}{1-v^2/c^2}.$$

### Step 4 — Transverse arm transit time
The perpendicular arm requires a diagonal path in the ether frame. The effective speed is obtained from the Pythagorean relation  
$$c^2 = c_{\perp}^2 + v^2 \implies c_{\perp} = c\sqrt{1-v^2/c^2}.$$  
Hence  
$$t_{\perp} = \frac{2L}{c}\frac{1}{\sqrt{1-v^2/c^2}}.$$

### Step 5 — Expected fringe shift
The time difference expressed in wavelengths is  
$$\Delta N = \frac{c}{\lambda}(t_{\parallel}-t_{\perp})\approx\frac{L}{\lambda}\frac{v^2}{c^2}.$$  
For L = 11 m, λ = 590 nm and v/c = 10^{-4}, ΔN ≈ 0.4 fringes—easily visible.

### Step 6 — Null observation and its logical consequence
No shift was detected at any rotation angle. The only consistent interpretation within the data is that t∥ = t⊥ for every orientation, which is possible only if the speed of light is independent of the observer’s velocity relative to any absolute frame.

### Step 7 — Emergence of the two postulates
The experimental outcome is summarized by the statements that (i) the laws of electrodynamics take the same form in all inertial frames and (ii) light propagates at c in every inertial frame, irrespective of the motion of the source. These are precisely the postulates Einstein adopted in 1905.

## 5. Worked examples — every step shown

**Example 1 — Order-of-magnitude estimate**  
*Given:* L = 11 m, λ = 590 nm, v = 30 km s^{-1}.  
*Find:* Expected fringe shift ΔN.  
Step 1: compute β = v/c = 1.0 × 10^{-4}.  
*Why:* Converts orbital speed into dimensionless ratio required by the formula.  
Step 2: insert into ΔN ≈ (L/λ)β².  
*Why:* Directly follows from the second-order time difference.  
**0.37 fringes**

*Reflection:* Shows why the experiment was feasible yet still surprising when the shift vanished.

**Example 2 — Exact longitudinal time**  
*Given:* c = 3 × 10^8 m s^{-1}, v = 3 × 10^4 m s^{-1}, L = 11 m.  
*Find:* t∥.  
Step 1: t∥ = 2L/(c − v) + 2L/(c + v) wait—no, use the compact form already derived.  
*Why:* Algebraic identity avoids separate outbound/return arithmetic.  
**7.333 400 07 × 10^{-8} s**

*Reflection:* Demonstrates that the difference appears only at order (v/c)².

**Example 3 — Fringe shift after 90° rotation**  
*Given:* Same parameters; rotation swaps arms.  
*Find:* Change in fringe count.  
Step 1: compute Δt before and after rotation.  
*Why:* Rotation reverses the sign of the difference.  
Step 2: ΔN = (c/λ)·2Δt.  
**0 fringes observed (null result)**

*Reflection:* The decisive datum; any non-zero value would have supported ether.

**Example 4 — Modern bound from LIGO arm**  
*Given:* L = 4 km, strain sensitivity 10^{-21}, λ = 1064 nm.  
*Find:* Upper limit on residual anisotropy δc/c.  
Step 1: δ(ΔN) < 10^{-9} fringes.  
*Why:* Converts strain into optical-path resolution.  
Step 2: δc/c < (λ/L)·10^{-9} ≈ 3 × 10^{-19}.  
**δc/c ≲ 3 × 10^{-19}**

*Reflection:* Illustrates how the same geometry now constrains Lorentz violation far beyond 1887 reach.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Confusing one-way with round-trip times | Textbooks often quote only round-trip formulas | Always derive outbound and return legs separately before adding |
| Treating arm length contraction as the explanation | Length contraction was introduced after the experiment | Use only pre-1905 physics when calculating expected classical shift |
| Forgetting that both arms are affected by rotation | Mental picture fixes one arm as “parallel” | Explicitly recompute t∥ and t⊥ after 90° rotation |
| Inserting c′ = c ± v into the transverse arm | Misapplication of Galilean addition in two dimensions | Apply Pythagorean relation in the ether frame only |
| Quoting first-order Doppler shift | Intuition from sound waves | Recognize that first-order terms cancel in any closed path |
| Assuming source motion affects light speed | Everyday experience with projectiles | Keep source velocity out of the propagation-speed algebra |
| Neglecting finite coherence length | Modern lasers hide the issue | Verify that expected ΔN lies within the coherence envelope of the source |

## 7. The textbook-precise statement
In any inertial frame the two-way speed of light is isotropic and equal to c, independent of the frame’s velocity relative to any hypothetical preferred frame. Consequently the phase difference  
$$\Delta\phi = \frac{2\pi}{\lambda}(ct_{\parallel}-ct_{\perp})$$  
vanishes for all orientations when arm lengths are equal. This empirical result is codified in Einstein’s second postulate (Einstein, *Ann. Phys.* 17, 891 (1905), §2).

## 8. Visual — diagram or schematic
```text
          Laser
            |
            v
        Beam splitter
       /             \
      /               \
  Mirror A          Mirror B
     ^                 ^
     |                 |
   Arm L             Arm L
      \               /
       \             /
        Recombine --> Detector
```
Horizontal arm aligned with putative velocity vector v; vertical arm perpendicular. Rotation about the beam-splitter axis interchanges the arms relative to v.

## 9. The memory technique
**The hook** — Picture the interferometer as two identical swimmers racing in a river with a steady current; any current that affects one direction must affect the return, yet the finish-line photo always shows a dead heat.

**What to overlearn**  
- Round-trip time formulas t∥ and t⊥ to O(v²/c²)  
- Fringe shift ΔN = (L/λ)(v²/c²)  
- The logical jump: null result ⇒ isotropy of c

**Spaced-repetition schedule** — Review the three formulas at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — Re-derive both transit times from the definitions of speed and the Pythagorean theorem in the hypothetical ether frame; the algebra itself forces the conclusion once the null result is inserted.

## 10. What this unlocks
The Michelson-Morley null result supplies the empirical warrant for the Lorentz transformation and the entire kinematic structure of special relativity.

- Time dilation and length contraction derived from invariance of c  
- Relativistic velocity addition  
- Minkowski space-time and the invariant interval  
- Relativistic Doppler effect and aberration  
- Mass-energy equivalence via the work-energy theorem in relativity

## 11. Self-check — five questions, no answers
1. Compute the numerical value of ΔN for an arm length of 2 m, sodium light, and an ether wind equal to Earth’s escape velocity.  
2. Show algebraically that a first-order ether wind produces zero net fringe shift after a round trip.  
3. If the apparatus were placed on a spacecraft moving at 0.1c, what classical prediction would change and why?  
4. Identify the hidden assumption in the statement “the transverse light path is longer because the mirror is moving.”  
5. Design a one-sentence modification to the 1887 apparatus that would have made a first-order effect visible if the ether hypothesis were true.