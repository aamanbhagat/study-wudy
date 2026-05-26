## 1. The one-sentence answer

**Fault Tree Analysis (FTA)** ek top-down deductive method hai jo Boolean logic gates (AND/OR) use karke kisi system failure (top event) ko uske root causes tak break down karta hai.

Iska core idea simple hai: aap ek undesired top-level failure define karte ho, phir usko logically decompose karte ho jab tak aap basic component failures tak na pahunch jaao. AND gate tab trigger hota hai jab saare inputs fail ho; OR gate tab trigger hota hai jab koi bhi ek input fail ho. Yeh approach spacecraft jaise complex systems mein reliability aur safety analysis ke liye use hoti hai kyunki yeh failure propagation ko visually aur mathematically track karti hai.

> [!NOTE]
> Sabse bada “aha” moment yeh hai ki FTA sirf ek diagram nahi hai — yeh ek Boolean expression banata hai jo probability calculations aur cut-set analysis dono ke liye seedha use ho sakta hai.

## 2. Why this matters — concrete and current

NASA’s Mars 2020 Perseverance rover mission mein FTA ka use rover’s entry-descent-landing sequence ke critical failure paths (parachute deployment, retro-propulsion) ko model karne ke liye kiya gaya tha; isse mission assurance team ko single-point failures identify karne mein madad mili.

SpaceX Starship flight tests (IFT-1 se IFT-5 tak) ke baad public failure reports mein OR-gate structures dikhaayi dete hain jab multiple independent tank pressurization failures ko top-level “loss of vehicle” event se connect kiya gaya.

European Space Agency (ESA) ke Sentinel-1 satellite constellation ke design phase mein FTA ne attitude control thruster redundancy ko quantify kiya; AND-gate chains ne dikhaya ki dono primary aur backup reaction wheels fail hone par hi mission loss hota hai.

James Webb Space Telescope (JWST) ke sunshield deployment mechanism ke risk assessment papers (NASA GSFC technical reports) mein FTA ne layered deployment motors aur tensioning cables ko model kiya, jisse launch vibration ke baad possible jam scenarios ko quantify kiya ja sake.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Boolean algebra          | AND/OR gates directly map to multiplication and addition in probability calculations |
| Basic probability        | Top-event probability nikaalne ke liye minimal cut sets aur gate equations chahiye |
| System block diagrams    | Physical components ko basic events mein map karne ke liye structure samajhna zaroori hai |
| Deductive reasoning      | Top-down approach ko follow karne ke liye failure hierarchy build karna padta hai |

## 4. Building the idea — from intuition to formalism

### Step 1 — Define the top event clearly
Top event ek single, measurable failure state hota hai jaise “spacecraft loses attitude control”. Iska matlab yeh hai ki aap pehle exactly decide karte ho kya galat hona nahi chahiye.

Example: “Loss of communication with ground station for more than 10 minutes”.

Formal statement:  
Let \( T \) be the top event. Then \( T \) is a Boolean variable that equals 1 when the undesired state occurs.

> [!WARNING]
> Agar top event vague raha (jaise “mission fails”) to poora tree ambiguous ho jaayega aur cut sets meaningless ban jaayenge.

### Step 2 — Identify immediate causes using OR logic
Agar koi bhi ek cause top event ko trigger kar sakta hai to OR gate lagta hai. Har cause ko intermediate event ke roop mein likho.

Example: Loss of communication = (transmitter failure) OR (antenna pointing error) OR (ground station outage).

Formal:  
\( T = A + B + C \)

### Step 3 — Introduce AND gates for redundancy
Jab multiple independent failures ek saath hone par hi top event hota hai tab AND gate use hota hai. Yeh redundancy ko capture karta hai.

Example: Both primary and backup power supplies must fail for “total power loss”.

Formal:  
\( P = X \cdot Y \)

### Step 4 — Continue decomposition until basic events
Har intermediate event ko aur break karte raho jab tak aap component-level failures (basic events) tak na pahunch jaao jinka probability data available ho.

Formal requirement: Basic events must be statistically independent and have known failure rates \( \lambda_i \).

### Step 5 — Translate the tree into Boolean expression and minimal cut sets
Poore tree ko ek Boolean polynomial mein likho aur phir minimal cut sets nikaalo — wo smallest sets of basic events jo top event ko cause karte hain.

Formal:  
Minimal cut sets \( C_1, C_2, \dots, C_k \) satisfy \( T = \bigcup C_i \) aur koi bhi proper subset \( C_i \) ko nahi cause karta.

### Step 6 — Compute top-event probability (rare-event approximation)
Agar events rare hain (\( P_i \ll 1 \)) to  
$$ P(T) \approx \sum P(C_i) $$

Yeh last rigorous step hai jo quantitative safety assessment deta hai.

## 5. Worked examples — har step show karo

**Example 1 — Simple OR gate**  
*Given:* Transmitter failure (A) ya antenna failure (B) se communication loss hota hai.  
*Find:* Boolean expression aur top-event probability jab \( P(A)=0.01 \), \( P(B)=0.02 \).  

\( T = A + B \)  
Agar rare-event approximation use karein to \( P(T) \approx 0.03 \).  
*Why:* OR gate addition deta hai kyunki dono events independent hain.  
**Final answer**  
**\( P(T) \approx 0.03 \)**  
*Reflection:* Yeh example isliye simple thi kyunki sirf ek gate tha; real trees mein multiple layers cut sets ko complex bana dete hain.

**Example 2 — Single AND gate**  
*Given:* Redundant power supplies X aur Y dono fail hone par total power loss hota hai.  
*Find:* Expression aur probability jab \( P(X)=P(Y)=0.005 \).  

\( P = X \cdot Y \)  
\( P(P) = 0.005 \times 0.005 = 2.5 \times 10^{-5} \).  
*Why:* AND gate multiplication karta hai kyunki dono events chahiye.  
**Final answer**  
**\( 2.5 \times 10^{-5} \)**  
*Reflection:* AND gate redundancy ka quantitative benefit dikhata hai.

**Example 3 — Mixed gates**  
*Given:* Top event = (transmitter OR antenna) AND power loss.  
*Find:* Minimal cut sets.  

Tree: \( T = (A + B) \cdot P \)  
Minimal cut sets: {A,P} aur {B,P}.  
*Why:* Distribution property se cut sets nikalte hain.  
**Final answer**  
**Cut sets: {A,P}, {B,P}**  
*Reflection:* Mixed trees mein cut-set enumeration zaroori hoti hai probability ke liye.

**Example 4 — Three-event tree with probability**  
*Given:* \( T = (X \cdot Y) + Z \), \( P(X)=P(Y)=0.01 \), \( P(Z)=0.03 \).  
*Find:* Approximate \( P(T) \).  

\( P(T) \approx P(X)P(Y) + P(Z) = 0.0001 + 0.03 = 0.0301 \).  
*Why:* Rare-event approximation dono terms ko alag-alag add karti hai.  
**Final answer**  
**\( 0.0301 \)**  
*Reflection:* Yeh dikhata hai ki OR term dominant hai jab AND term bahut chhota ho.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Vague top event                   | Engineer “mission loss” jaisa broad term use karta hai | Top event ko measurable failure mode mein define karo |
| Missing common-cause failures     | Independent-event assumption galat lagta hai | Common-cause gates alag se add karo          |
| Not going to basic events         | Intermediate events pe ruk jaate hain       | Har leaf event ka failure rate data hona chahiye |
| Ignoring NOT gates                | Students sirf AND/OR yaad rakhte hain       | Inhibit gates aur NOT logic ko explicitly model karo |
| Over-counting cut sets            | Same minimal set ko multiple baar count karte hain | Boolean simplification ya software use karo  |
| Using exact probability without rare-event check | High-probability events par approximation toot jaati hai | Exact inclusion-exclusion formula apply karo |

## 7. The textbook-precise statement

Fault Tree Analysis is a deductive, top-down reliability and safety analysis technique that represents the logical combinations of basic events leading to a defined top event through Boolean gates. Formally, the structure function \( \phi(\mathbf{x}) \) of a coherent system satisfies \( \phi(\mathbf{x}) = 1 \) if and only if the top event occurs, where \( \mathbf{x} \in \{0,1\}^n \) denotes the state vector of basic events. The probability of the top event is given by  
$$ P(T) = P(\phi(\mathbf{x})=1). $$  
All basic events are assumed statistically independent unless common-cause failures are explicitly modelled. Reference: Vesely et al., *Fault Tree Handbook*, NUREG-0492, U.S. Nuclear Regulatory Commission, 1981, Chapter 3.

## 8. Visual — diagram or schematic

```
Top Event: Loss of Attitude Control (T)
          |
       OR gate
      /   |   \
   Gyro   Thruster   Power
   fail    fail      loss
             |         |
          AND gate   OR gate
         /     \     /     \
      Prim   Backup  Batt  Solar
      gyro    gyro    fail  array
```

## 9. The memory technique

1. **The hook** — Imagine a detective tree: top event “body found” ko AND/OR gates se clues tak todte ho; har gate ek “must all” ya “any one” rule hai.

2. **What to overlearn** — AND = multiply probabilities, OR = add probabilities (rare-event approx); minimal cut set = smallest set of basic events that alone cause top event.

3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback** — Agar formula bhool jaaye to tree ko Boolean expression mein likho, phir distribution property se minimal cut sets nikaalo aur unki probabilities add karo.

## 10. What this unlocks

FTA aapko quantitative risk numbers deta hai jo directly FMECA, PRA aur reliability block diagrams mein feed hote hain.

- Minimal cut-set analysis
- Monte-Carlo simulation of fault trees
- Dynamic fault trees with priority AND gates
- Integration with model-based systems engineering (MBSE) tools

## 11. Self-check — five questions, no answers

1. Ek spacecraft ke reaction wheel assembly ke liye ek simple FTA tree banao jismein ek AND gate aur do OR gates hon.

2. Calculate approximate top-event probability jab teen independent basic events probabilities 0.001, 0.002 aur 0.005 hon aur tree structure (A·B)+C ho.

3. Identify the minimal cut sets of the tree \( T = (X+Y)\cdot(Z+W) \).

4. Ek real spacecraft subsystem choose karo aur usmein common-cause failure ko FTA mein kaise model karoge, yeh explain karo.

5. Yeh check karo ki kya “top event probability > 1” possible hai — agar haan to kaunsa assumption toota hai.