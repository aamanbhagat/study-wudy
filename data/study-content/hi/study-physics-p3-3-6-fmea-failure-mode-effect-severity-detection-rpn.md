## 1. The one-sentence answer
**FMEA ek systematic engineering process hai jisme har possible failure mode ko identify karke uske effect, severity (S), occurrence (O), detection (D) score diye jaate hain aur RPN = S × O × D calculate karke risk ko prioritise kiya jaata hai.**

FMEA spacecraft structures mein use hota hai taaki launch, orbit aur re-entry ke dauran koi bhi single-point failure mission ko destroy na kar sake. Aap pehle har component (tank, valve, solar array, avionics bus) ko lete ho, phir uske saare failure modes likhte ho — crack, leak, short, software hang — aur har mode ke liye effect chain banate ho. Severity 1–10 scale par decide hoti hai (10 = loss of crew), detection score batata hai kitni jaldi sensor ya inspection us failure ko pakdega.

RPN high hone par aap design change, redundancy ya extra inspection add karte ho. Yeh process iterative hai — jab bhi design badalta hai, FMEA update hota hai.

> [!NOTE]
> Sabse badi aha yeh hai ki FMEA sirf ek checklist nahi, balki ek living document hai jo har design review mein re-score hota rehta hai; ek baar likh ke rakhne se mission khatre mein pad sakta hai.

## 2. Why this matters — concrete and current
NASA ne Space Shuttle Main Engine ke liye FMEA perform kiya tha jisme 1970s se lekar STS-135 tak har turbopump failure mode ko track kiya gaya; iske bina single seal leak bhi catastrophic ho sakta tha.

SpaceX Falcon 9 Block 5 development mein FMEA ne grid-fin actuator aur COPV burst modes ko high RPN diya, jiske result mein COPV ke around extra thermal protection aur redundant valves add kiye gaye — yehi changes ne Crew Dragon Demo-2 ko safe banaya.

ISRO ke Chandrayaan-2 lander ke Vikram module ke descent thrusters aur onboard computer bus ke liye FMEA report 2019 mein public kiya gaya tha; usme throttle valve stuck-open mode ko RPN 280 diya gaya tha aur uske baad extra watchdog timer add kiya gaya.

ESA ne JUICE mission ke radiation-hardened power distribution unit par FMEA kiya jisme total-ionising-dose induced latch-up ko severity 9 aur detection 4 diya gaya; is analysis ne spare power rail aur current-limiting fuses ko justify kiya.

Boeing Starliner orbital flight test ke baad software timing failure modes ko FMEA mein daal kar RPN reduce kiya gaya, jo ab Commercial Crew Program ke certification documents mein cited hai.

## 3. Mental prerequisites

| Concept              | Why you need it here |
|----------------------|----------------------|
| Systems decomposition (block diagrams) | Har component aur interface ko alag-alag failure mode ke liye define karna padta hai |
| Severity–occurrence–detection scoring scales | RPN tabhi meaningful hota hai jab 1–10 scales consistent aur mission-specific hon |
| Basic probability concepts (qualitative) | Occurrence score ko failure rate data se link karne ke liye chahiye |
| Redundancy and fault tolerance | High-RPN modes ko mitigate karne ke liye single-point failures ko eliminate karna padta hai |

Agar aapko block diagrams ya scoring scales nahi aate, to pehle spacecraft systems engineering ka basic chapter padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Decompose the spacecraft into functional blocks
Aap spacecraft ko chhote-chhote functional blocks mein todte ho jaise propellant tank, regulator, thruster valve, flight computer. Har block ka ek clear input–output boundary hota hai.

Example: Pressurisation system ko “helium bottle → regulator → check valve → tank” ke roop mein likho.

Formal statement: Let the spacecraft be partitioned into subsystems \( S_i, i=1\dots n \) such that each \( S_i \) has defined interfaces.

> [!WARNING]
> Agar boundary galat define ki (jaise regulator aur check valve ko ek block maana), to failure propagation miss ho jaayegi aur RPN under-estimate hoga.

### Step 2 — List every credible failure mode per block
Har block ke liye saare physically possible failure modes likho — leak, rupture, stuck open, stuck closed, drift, software exception.

Example: Helium regulator ke modes: “set-point drift high”, “set-point drift low”, “internal leak”, “external leak”.

Formal statement: For each subsystem \( S_i \), enumerate the set \( FM_{i,j}, j=1\dots m_i \).

### Step 3 — Determine local and end effects
Har failure mode ke liye immediate local effect aur spacecraft-level end effect likho.

Example: Regulator internal leak → ullage pressure rise → tank over-pressurisation → possible rupture.

### Step 4 — Assign Severity (S) on 1–10 scale
Severity mission consequence par based hoti hai: 10 = loss of crew/vehicle, 1 = negligible.

Formal statement: \( S_{i,j} \in \{1,2,\dots,10\} \) where higher value indicates greater mission loss potential.

### Step 5 — Assign Occurrence (O) on 1–10 scale
O score failure probability ya expected rate se aata hai (heritage data, test data, physics-of-failure models).

### Step 6 — Assign Detection (D) on 1–10 scale
D batata hai kitni jaldi aur kitni reliability se failure detect hoga (telemetry, inspection, BIT).

### Step 7 — Compute Risk Priority Number
RPN = \( S \times O \times D \). High RPN wale modes pehle mitigate kiye jaate hain.

Formal statement: \( RPN_{i,j} = S_{i,j} \times O_{i,j} \times D_{i,j} \).

### Step 8 — Recommend actions and re-score
Design change, redundancy ya extra sensor add karke naye S, O, D values calculate karo aur RPN ko acceptable threshold ke neeche laao.

## 5. Worked examples — har step show karo

**Example 1 — Helium regulator internal leak**
*Given:* Regulator part number REG-042, heritage failure rate 2.3 × 10^{-6} per hour.
*Find:* RPN before mitigation.
Severity = 8 (tank burst risk). Occurrence = 4 (heritage data). Detection = 6 (pressure telemetry only).
RPN = 8 × 4 × 6 = **192**.
*Why:* Direct multiplication kiya kyunki RPN definition hi product hai.
**192**  
*Reflection:* Low detection score ne RPN ko medium banaya; extra pressure switch add karne se D = 3 ho jaayega.

**Example 2 — Thruster valve stuck-closed**
*Given:* Propellant valve VLV-017 on main engine.
Severity = 9 (loss of delta-V). Occurrence = 3. Detection = 7 (chamber pressure sensor).
RPN = 9 × 3 × 7 = **189**.
*Why:* Severity high hai kyunki single engine failure mission abort kar sakta hai.
**189**  
*Reflection:* Redundant valve pair laga kar O ko 2 kar sakte hain.

**Example 3 — Flight computer watchdog timeout**
*Given:* OBC-003 with radiation-induced SEU rate.
Severity = 10. Occurrence = 5. Detection = 2 (no hardware watchdog).
RPN = 10 × 5 × 2 = **100**.
*Why:* Detection score bahut low hai isliye RPN high nahi dikhta lekin actual risk high hai.
**100**  
*Reflection:* Hardware watchdog add karne se D = 8 ho jaayega aur RPN = 400 ban jaayega — phir mitigation zaroori ho jaayegi.

**Example 4 — Solar array deployment hinge binding**
*Given:* Hinge mechanism after 3-year storage.
Severity = 7. Occurrence = 6. Detection = 4.
RPN = 7 × 6 × 4 = **168**.
*Why:* Ground test data se O = 6 liya gaya.
**168**  
*Reflection:* Pre-launch torque test add karne se D = 2 ho jaayega.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using generic 1–10 scales without mission context | Team members alag-alag missions se aate hain | Project-specific severity table pehle lock karo |
| Ignoring interaction failures between blocks | FMEA bottom-up hota hai, system-level coupling miss ho jaata hai | Functional fault tree bhi saath mein rakho |
| Keeping old RPN values after design change | Document version control nahi hota | Configuration-managed living FMEA database use karo |
| Over-estimating detection by telemetry alone | Telemetry packet loss ya sensor failure ko ignore karte hain | End-to-end detection probability calculate karo |
| Treating RPN as absolute risk number | RPN sirf ranking ke liye hai, absolute probability nahi | RPN ko sirf priority list ke liye use karo, quantitative PRA ke saath combine karo |
| Missing human-error failure modes | Focus sirf hardware par hota hai | Operator procedures ko bhi blocks mein daalo |

## 7. The textbook-precise statement
Failure Mode and Effects Analysis (FMEA) is a systematic, inductive, bottom-up method for identifying potential failure modes, determining their causes and effects, and prioritising mitigation actions. For each item \( i \) and failure mode \( j \), the Risk Priority Number is defined as \( RPN_{ij}=S_{ij}\times O_{ij}\times D_{ij} \), where \( S_{ij} \), \( O_{ij} \), and \( D_{ij} \) are integer ratings (typically 1–10) assigned under explicitly stated ranking criteria. All hypotheses regarding operating environments, mission phases, and detection methods must be documented. The process is iterative and must be updated whenever the design baseline changes. (Source: SAE J1739_202008, “Potential Failure Mode and Effects Analysis (FMEA) Including Design FMEA, Process FMEA, and Supplemental FMEA-MSR”, Section 4.3.)

## 8. Visual — diagram or schematic
```
Spacecraft
├── Helium Bottle
│   └── Regulator ──► [FM: internal leak] ──► Tank over-pressure
├── Valve Manifold
│   └── Thruster Valve ──► [FM: stuck closed] ──► Loss of Δv
└── OBC
    └── Watchdog ──► [FM: timeout] ──► Safe mode entry
```
Arrows show failure propagation; each bracketed FM gets its own S, O, D row in the FMEA worksheet.

## 9. The memory technique
1. **The hook** — Imagine a detective board with red strings: every failure mode is a suspect, severity is how dangerous the crime, detection is how fast you catch him, and RPN is the “most wanted” number.
2. **What to overlearn** — RPN = S × O × D; severity 10 = loss of crew/vehicle; detection 1 = failure is obvious before it happens.
3. **Spaced-repetition schedule** — Review the RPN formula and one real spacecraft FMEA table at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Agar RPN bhool jaaye to yaad karo: risk = consequence × likelihood × (1/detectability). Phir numbers 1–10 par map kar do.

## 10. What this unlocks
FMEA aapko fault tree analysis, probabilistic risk assessment (PRA) aur reliability block diagrams ke liye solid input deta hai.

- Next you can build quantitative FTA from the high-RPN modes.
- You can feed occurrence scores into Weibull failure-rate models.
- You can perform trade studies between hardware redundancy and software detection.

## 11. Self-check — five questions, no answers
1. Ek spacecraft propellant valve ke liye S = 9, O = 2, D = 8 ho to RPN kya hoga aur kyun high priority milegi?
2. Agar telemetry packet loss ka chance 15 % hai, to detection score kaise adjust karoge?
3. “Regulator aur tank ke beech interaction failure” ko FMEA worksheet mein kaise likhoge?
4. Severity scale mein “loss of science mission” aur “loss of crew” ke beech difference kitna points ka hona chahiye?
5. Jab design mein ek extra pressure sensor add karte ho, to kaunsa score (S, O ya D) sabse zyada badlega aur kyun?