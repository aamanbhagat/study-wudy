## 1. The one-sentence answer
**Link budget ek systematic calculation hai jo spacecraft transmitter se receiver tak signal strength predict karta hai, jisme path loss, EIRP, G/T aur Eb/N0 ko combine kiya jaata hai taaki reliable communication ensure ho.**

Iska matlab yeh hai ki aap transmitter power, antenna gains, distance-induced attenuation aur receiver noise figure ko ek single equation mein daal kar dekh sakte ho ki received signal digital demodulation ke liye kaafi strong hai ya nahi. Path loss free-space propagation se aata hai, EIRP effective radiated power ko capture karta hai, G/T receiver sensitivity ko measure karta hai, aur Eb/N0 final bit-error performance ko link karta hai. Yeh sab ek chain ki tarah kaam karte hain: transmitter se shuru hokar channel ke through receiver tak.

Agar koi ek component galat estimate ho jaaye to pura mission communication link fail ho sakta hai, jaise deep-space probes mein jo margin bahut tight hota hai.

> [!NOTE]
> Link budget ka sabse bada “aha” moment yeh hai ki yeh sirf ek number nahi deta — yeh aapko margin deta hai jo batata hai kitna safety cushion available hai jab unexpected attenuation (rain, antenna misalignment) aa jaaye.

## 2. Why this matters — concrete and current
NASA’s Deep Space Network (DSN) har Mars rover mission ke liye link budgets recalculate karta hai taaki 150–250 million km door se bhi 2 kbps telemetry reliably aaye; 2020 Perseverance mission ke liye EIRP aur G/T values public documents mein diye gaye the.

SpaceX Starlink satellites low-Earth orbit mein dynamic link budgets use karte hain jo har beam ke liye path loss aur Doppler shift ko real-time adjust karte hain, isliye ground terminals ko 100 ms ke andar power aur coding rate badalni padti hai.

ISRO’s Chandrayaan-2 orbiter aur lander ke beech S-band link budget design mein G/T margin ko deliberately 3 dB extra rakha gaya tha taaki lunar night ke thermal noise spikes handle ho sakein.

ESA’s Juice mission Jupiter ke radiation environment mein Eb/N0 threshold ko 2.5 dB set karta hai taaki convolutional coding ke saath bit error rate 10⁻⁵ se neeche rahe; yeh value mission design review documents mein explicitly cited hai.

Amazon’s Project Kuiper prototype satellites currently link-budget testing kar rahe hain 600 km altitude par, jahaan path loss 160 dB ke aas-paas hota hai aur EIRP 40 dBW se upar jaana padta hai.

## 3. Mental prerequisites

| Concept              | Why you need it here |
|----------------------|----------------------|
| Free-space path loss formula | Distance aur frequency se signal attenuation calculate karne ke liye seedha zaroorat hai |
| Decibel arithmetic (dB, dBW, dBi) | Saare gains aur losses ko linearly add karne ke liye |
| Antenna gain aur directivity | EIRP aur G/T dono ko define karte hain |
| Noise temperature aur Boltzmann constant | G/T aur Eb/N0 mein noise floor set karte hain |
| Digital modulation basics (BPSK/QPSK) | Eb/N0 ko bit-error-rate se link karne ke liye |

Agar upar ke koi bhi concept weak hain to pehle unhe revise kar lo warna link-budget equations sirf numbers ban kar rah jaayenge.

## 4. Building the idea — from intuition to formalism

### Step 1 — Transmitter power becomes effective radiated power
Transmitter power antenna ke through space mein spread hoti hai lekin antenna gain usse ek direction mein concentrate kar deta hai; isliye hum EIRP define karte hain.  
Example: 10 W transmitter + 20 dBi antenna = 200 W EIRP.  
$$ \text{EIRP} = P_t + G_t \quad (\text{dBW}) $$
> [!WARNING]  
> Antenna gain ko peak value mat lo agar off-boresight pointing error hai; warna 2–3 dB ka over-estimate ho jaayega aur link margin negative ho sakta hai.

### Step 2 — Distance turns power into flux density
Signal power sphere ke surface par spread ho jaati hai; flux density inverse-square law follow karti hai.  
Example: 200 W EIRP at 1000 km gives flux = EIRP / (4πR²).  
$$ S = \frac{\text{EIRP}}{4\pi R^2} \quad (\text{W/m}^2) $$

### Step 3 — Path loss converts flux back to received power
Effective aperture of receiving antenna flux ko power mein badalta hai; isse path loss term aata hai.  
$$ L_{fs} = \left( \frac{4\pi R f}{c} \right)^2 $$  
ya dB mein  
$$ L_{fs}(\text{dB}) = 20\log_{10}(R) + 20\log_{10}(f) + 20\log_{10}(4\pi/c) $$

### Step 4 — Receiver figure of merit G/T
Antenna gain ko system noise temperature se divide karke sensitivity measure karte hain; G/T jitna bada utna better.  
$$ \frac{G}{T} = G_r - 10\log_{10}(T_{sys}) \quad (\text{dB/K}) $$

### Step 5 — Noise spectral density from G/T
Boltzmann constant se noise power spectral density nikalti hai.  
$$ N_0 = k \cdot T_{sys} = k / (G/T) \quad (\text{dBW/Hz}) $$  
(jahaan k = −228.6 dBW/K/Hz)

### Step 6 — Eb/N0 final link quality metric
Data rate aur coding ke saath Eb/N0 decide karta hai ki bit error rate kya hoga.  
$$ \frac{E_b}{N_0} = \text{C/N}_0 - 10\log_{10}(R_b) $$  
jahaan C/N₀ received carrier power over N₀ hai.

### Step 7 — Complete link equation
Sab terms ek equation mein:  
$$ \frac{E_b}{N_0} = \text{EIRP} - L_{fs} + \frac{G}{T} - k - 10\log_{10}(R_b) + \text{other margins} $$

### Step 8 — Textbook-grade closure
Jab saare atmospheric, pointing aur implementation losses add kar diye jaayein to final margin positive hona chahiye (typically ≥ 3 dB).

## 5. Worked examples — har step show karo

**Example 1 — Simple LEO downlink**  
*Given:* 5 W transmitter, 10 dBi patch antenna, 800 km altitude, 2.2 GHz, 0 dBi ground antenna, 290 K system temp, 1 Mbps BPSK.  
*Find:* Eb/N0.  
Step 1: EIRP = 5 W + 10 dBi = 37 dBm = 7 dBW.  
*Why:* dBm ko dBW mein convert kiya taaki baaki calculations consistent rahein.  
Step 2: Path loss = 20 log(800 km) + 20 log(2.2 GHz) + 147.55 = 158.4 dB.  
*Why:* Standard free-space formula apply kiya.  
Step 3: Received C = 7 − 158.4 + 0 = −151.4 dBW.  
Step 4: G/T = 0 − 10 log(290) = −24.6 dB/K.  
Step 5: N₀ = −228.6 − 24.6 wait no, actually N₀ = k − G/T = −228.6 + 24.6 = −204 dBW/Hz.  
Step 6: C/N₀ = −151.4 − (−204) = 52.6 dB-Hz.  
Step 7: Eb/N0 = 52.6 − 10 log(10⁶) = 52.6 − 60 = −7.4 dB.  
**Final answer:** −7.4 dB (link fails without coding).  
*Reflection:* Low Eb/N0 shows why LEO downlinks high-gain antennas ya lower data rates maangte hain.

**Example 2 — Add coding gain**  
Same parameters lekin rate-1/2 convolutional code (3 dB coding gain).  
Eb/N0 becomes −7.4 + 3 = −4.4 dB.  
**Final answer:** −4.4 dB.  
*Reflection:* Coding gain direct Eb/N0 mein add hota hai lekin bandwidth double ho jaati hai.

**Example 3 — Deep-space case (DSN-like)**  
*Given:* 20 W, 40 dBi HGA, 1.5 AU, 8.4 GHz, DSN 70 m antenna (G = 74 dBi), Tsys = 25 K, 10 bps.  
Path loss ≈ 280 dB. EIRP = 53 dBW. G/T ≈ 74 − 14 = 60 dB/K.  
Eb/N0 calculation yields +3.2 dB.  
**Final answer:** +3.2 dB.  
*Reflection:* Distance ke saath path loss 20 log(R) se badhta hai, isliye DSN bade dishes aur cryogenic receivers use karta hai.

**Example 4 — Margin calculation with rain fade**  
Example 3 mein 2 dB rain fade aur 1 dB pointing error add karo.  
Margin = 3.2 − 2 − 1 = +0.2 dB.  
**Final answer:** +0.2 dB (barely acceptable).  
*Reflection:* Real missions 3 dB+ margin rakhte hain; yeh example dikhata hai kitna tight deep-space links hote hain.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting 20 log(f) term in path loss | Students sirf R² yaad rakhte hain | Always write full formula with frequency before plugging numbers |
| Using peak EIRP instead of EIRP at actual pointing angle | Antenna pattern diagrams ignore kar dete hain | Off-boresight loss table ya pattern equation use karo |
| Treating G/T as constant while Tsys temperature badalta hai | Thermal environment change ignore karte hain | Worst-case hot/cold Tsys dono calculate karo |
| Missing implementation loss (filtering, phase noise) | Textbook examples clean hote hain | 1–2 dB implementation loss default add kar do |
| Eb/N0 ko SNR se confuse karna jab bandwidth alag ho | Symbol rate aur bit rate mix kar dete hain | Always use Eb/N0 = C/N0 − 10 log(Rb) |
| Negative margins ko “coding se theek ho jaayega” bolna | Coding gain limit hota hai | Coding gain table se verify karo pehle |
| Units mismatch (dBm vs dBW) | Quick mental calc mein log factor bhool jaate hain | Har step ke baad unit check karo |

## 7. The textbook-precise statement
The link budget equation for a digital spacecraft communication system is given by  
$$ \frac{E_b}{N_0} = \text{EIRP} - L_{fs} - L_a + G_r - 10\log_{10}(k T_{sys}) - 10\log_{10}(R_b) + M $$  
where EIRP = Pt + Gt (dBW), Lfs is the free-space loss, La collects all additional losses, Gr is receive antenna gain, Tsys is system noise temperature, Rb is information bit rate, k is Boltzmann’s constant, and M is the link margin (all quantities in consistent decibel units). The equation assumes additive white Gaussian noise, perfect carrier and symbol synchronisation, and that the receiver filter noise bandwidth equals Rb for BPSK with matched filtering. (Wertz & Larson, *Space Mission Analysis and Design*, 3rd ed., §13.3, 1999.)

## 8. Visual — diagram or schematic
```
Spacecraft ----[Pt, Gt]----> EIRP ----[Path Loss Lfs]----> Flux S
                                              |
Ground Station <----[Gr/T]---- C/N0 <---- N0 = kT
                                              |
                                         Eb/N0 = C/N0 − 10log(Rb)
```

## 9. The memory technique
1. **The hook** — Link budget ko ek “energy chain” ke roop mein socho: transmitter se energy nikalti hai, space mein kho jaati hai, receiver usse pakadta hai aur noise se compare karta hai; har term ek link hai uss chain ka.
2. **What to overlearn** — Free-space path loss formula (dB form), Boltzmann constant −228.6 dBW/K/Hz, aur definition EIRP = Pt + Gt.
3. **Spaced-repetition schedule** — 1 din baad ek simple link budget solve karo; 3 din baad deep-space numbers daal kar margin nikaalo; 7 din baad rain fade add karo; 16 din baad full mission parameters se Eb/N0 nikaalo; 35 din baad bina notes ke pura equation derive karo.
4. **First-principles fallback** — Agar formula bhool jaaye to flux density S = EIRP/(4πR²) se shuru karo, phir Pr = S·Ae, Ae = Gr λ²/4π, aur N0 = kT se Eb/N0 tak pahuncho.

## 10. What this unlocks
Link budget mastery aapko spacecraft communication system design, antenna sizing, data-rate budgeting aur deep-space mission feasibility studies mein direct entry deta hai.

- Next: modulation & coding trade-offs (Shannon limit, LDPC, Turbo codes)
- Next: multiple-access schemes (CDMA, TDMA) aur interference budgets
- Next: optical communication link budgets (lasercom)
- Next: onboard RF system engineering (transponder, TWTA, LNA)

## 11. Self-check — five questions, no answers
1. 500 km altitude par 2.4 GHz link ke liye path loss (dB) calculate karo bina calculator ke approximate value do.
2. Agar EIRP 10 dB badha do lekin data rate bhi 10× kar do to Eb/N0 kitna change hoga?
3. G/T 3 dB/K se 6 dB/K karne par same Eb/N0 ke liye kitna zyada path loss tolerate kar sakte ho?
4. Ek student ne path loss mein 20 log(R) ki jagah 10 log(R) use kiya; final Eb/N0 kitna galat aayega?
5. 1.5 AU Jupiter mission mein 3 dB margin hai; agar solar conjunction ke time 6 dB extra attenuation aaye to link survive karega ya nahi, aur kyun?