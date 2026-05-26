## 1. The one-sentence answer
**Area-velocity relation** batata hai ki compressible flow mein duct ke cross-section area change hone par velocity kaise badlegi, aur yeh relation \( \frac{dA}{A} = (M^2 - 1) \frac{dV}{V} \) ke through Mach number par depend karta hai.

Yeh equation de Laval nozzle ke design ka core hai. Jab flow subsonic hota hai (\( M < 1 \)), area badhane se velocity ghat ti hai; jab supersonic hota hai (\( M > 1 \)), area badhane se velocity badhti hai. Isliye nozzle mein pehle area kam karke throat tak flow accelerate karte hain, phir area badha ke supersonic speeds tak le jaate hain.

Iska matlab yeh hai ki ek hi geometry dono regimes mein alag-alag behaviour dikha sakti hai, lekin sirf tab jab flow compressible ho aur Mach number cross kare.

> [!NOTE]
> Sabse badi “aha” yeh hai ki throat par \( M = 1 \) hone par hi \( dA = 0 \) ke bawajood velocity change ho sakti hai — yeh hi choked flow aur supersonic acceleration ka secret hai.

## 2. Why this matters — concrete and current
SpaceX Merlin aur Raptor engines ke de Laval nozzles exactly isi relation ke hisaab se design kiye jaate hain taaki throat ke baad diverging section mein flow supersonic ho aur exhaust velocity maximum mile.

ISRO ke GSLV cryogenic upper stage mein yakshini nozzle ka area ratio isi equation se calculate kiya gaya tha, jisse 10–12 km altitude par optimum expansion mil sake.

NASA’s X-59 QueSST aur supersonic inlet research mein variable-geometry ducts is relation ka use karke shock waves ko control karte hain bina flow separation ke.

General Electric aur Pratt & Whitney ke high-bypass turbofan engines ke fan ducts mein subsonic diffuser design isi equation se hota hai taaki pressure recovery maximum rahe.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Continuity equation  | Mass conservation se \( \frac{d\rho}{\rho} + \frac{dA}{A} + \frac{dV}{V} = 0 \) nikalti hai |
| Euler’s equation     | Inviscid momentum balance se \( dp + \rho V dV = 0 \) milta hai |
| Speed of sound & isentropic relation | \( a^2 = \left( \frac{\partial p}{\partial \rho} \right)_s \) aur \( dp = a^2 d\rho \) compressible link deta hai |
| Mach number definition | \( M = V/a \) relation ko non-dimensional banata hai     |

Agar upar ke teen concepts clear nahi hain to pehle 1-D isentropic flow aur speed-of-sound derivation padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Mass conservation in variable area duct
Compressible flow mein density bhi change ho sakti hai, isliye continuity sirf area aur velocity se nahi chalti.  
Ek chhote control volume ke liye mass flow rate constant rehta hai.  
$$ \rho A V = \text{constant} \implies \frac{d\rho}{\rho} + \frac{dA}{A} + \frac{dV}{V} = 0 $$

> [!WARNING]
> Agar aap density change ko zero maan lete ho (incompressible assumption) to yeh poora relation galat ho jaata hai aur nozzle behaviour samajh nahi aata.

### Step 2 — Momentum equation along streamline
Inviscid, steady flow ke liye Euler equation streamline direction mein pressure gradient ko velocity change se jodta hai.  
$$ dp + \rho V\, dV = 0 $$

### Step 3 — Thermodynamic link through speed of sound
Isentropic process mein pressure aur density ka relation speed of sound se aata hai.  
$$ dp = a^2\, d\rho \implies \frac{d\rho}{\rho} = \frac{dp}{\rho a^2} $$

### Step 4 — Non-dimensionalise with Mach number
Mach number \( M = V/a \) daal kar pressure term ko velocity term mein badalte hain.  
\( dp = -\rho V\, dV \) ko upar wale expression mein daalne par:  
$$ \frac{d\rho}{\rho} = -M^2 \frac{dV}{V} $$

### Step 5 — Combine all three equations
Continuity mein \( \frac{d\rho}{\rho} \) ko replace karo:  
$$ -M^2 \frac{dV}{V} + \frac{dA}{A} + \frac{dV}{V} = 0 $$  
Rearrange karo:  
$$ \frac{dA}{A} = (M^2 - 1) \frac{dV}{V} $$

Yeh final textbook-grade form hai.

## 5. Worked examples — har step show karo

**Example 1 — Subsonic diffuser**  
*Given:* \( M = 0.4 \), \( dV/V = +0.05 \) (velocity badh rahi hai)  
*Find:* \( dA/A \)  
Step: \( dA/A = (0.16 - 1)(0.05) = (-0.84)(0.05) = -0.042 \)  
*Why*: Mach term negative hai isliye area kam karna padega velocity badhane ke liye.  
**Final answer**  
\( dA/A = -0.042 \) (area decrease)

**Example 2 — Supersonic nozzle section**  
*Given:* \( M = 2.0 \), \( dV/V = +0.03 \)  
*Find:* \( dA/A \)  
Step: \( dA/A = (4 - 1)(0.03) = 3 \times 0.03 = 0.09 \)  
*Why*: Mach term positive hai, isliye area badhana padega velocity aur badhane ke liye.  
**Final answer**  
\( dA/A = +0.09 \)

**Example 3 — Exactly at throat**  
*Given:* \( M = 1.0 \), \( dV/V = +0.02 \)  
*Find:* \( dA/A \)  
Step: \( dA/A = (1 - 1)(0.02) = 0 \)  
*Why*: Relation zero deta hai, matlab area constant (throat) par bhi velocity change ho sakta hai.  
**Final answer**  
\( dA/A = 0 \)

**Example 4 — Find Mach from area change**  
*Given:* \( dA/A = +0.15 \), \( dV/V = -0.05 \)  
*Find:* \( M \)  
Step: \( 0.15 = (M^2 - 1)(-0.05) \)  
\( M^2 - 1 = -3 \)  
\( M^2 = -2 \) (impossible) → flow must be subsonic with opposite sign.  
Correct sign check: \( dV/V \) positive hona chahiye subsonic mein.  
**Final answer**  
No physical solution for given signs; flow regime galat liya gaya.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Sign of \( dA \) aur \( dV \) ulta laga dena | Subsonic aur supersonic regimes confuse ho jaate hain | Har baar \( M^2-1 \) ka sign pehle check karo |
| Throat par \( dA = 0 \) ko “no acceleration” samajhna | Relation zero dekh kar ruk jaate hain       | Yaad rakho \( M=1 \) par bhi \( dV \) ho sakta hai |
| Density change ko neglect karna | Incompressible habit se aata hai            | Continuity mein \( d\rho \) term hamesha rakho |
| \( a \) ko constant maan lena | Temperature change ignore kar dete hain     | Isentropic relations se \( a(T) \) yaad rakho |
| Negative Mach number nikal aana | Sign error se equation galat solve hoti hai | Final \( M \) physical range mein hona chahiye |

## 7. The textbook-precise statement
For steady, one-dimensional, isentropic flow of a perfect gas, the differential area-velocity relation is
\[
\frac{dA}{A} = (M^2 - 1)\frac{dV}{V},
\]
where \( M = V/a \) is the local Mach number and \( a = \sqrt{\gamma R T} \) is the local speed of sound. The derivation assumes inviscid flow, no body forces, and isentropic thermodynamic process (\( ds = 0 \)). (Anderson, *Modern Compressible Flow*, 4e, §3.5)

## 8. Visual — diagram or schematic
```
          Subsonic          Throat          Supersonic
   A decreasing ───────► A minimum ───────► A increasing
   V increasing          M=1               V increasing
   M<1                                       M>1
```

## 9. The memory technique
1. **The hook** — Socho throat ek “gate” hai: subsonic taraf gate kholne se flow tez hota hai, supersonic taraf gate kholne se aur tez hota hai.  
2. **What to overlearn** — \( \frac{dA}{A} = (M^2-1)\frac{dV}{V} \) aur throat condition \( M=1 \Rightarrow dA=0 \).  
3. **Spaced-repetition schedule** — 1 din, 3 din, 7 din, 16 din, 35 din.  
4. **First-principles fallback** — Continuity + Euler + \( dp = a^2 d\rho \) → Mach se non-dimensionalise.

## 10. What this unlocks
Yeh relation aapko de Laval nozzle design, supersonic inlet sizing, aur choked mass-flow calculation sikhaata hai. Agla step yeh hai:

- Isentropic area-Mach relation \( A/A^* = f(M) \) derive karna
- Normal shock relations aur Fanno/Rayleigh flow
- Method of characteristics for 2-D nozzle design

## 11. Self-check — five questions, no answers
1. Agar \( M = 0.7 \) aur \( dA/A = +0.1 \), to \( dV/V \) ka sign aur magnitude kya hoga?  
2. Throat ke turant baad \( M = 1.1 \) par area 5 % badha diya; velocity kitni badlegi?  
3. Kya incompressible flow mein yeh equation valid ho sakti hai? Kyun?  
4. Agar signs galat laga kar \( M = 0.8 \) par \( dA \) positive aur \( dV \) positive nikle, to flow kis regime mein hai?  
5. Real nozzle mein boundary layer hone par yeh 1-D relation kitna galat ho jaata hai?