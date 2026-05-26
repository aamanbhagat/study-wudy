## 1. The one-sentence answer
**DRY (Don't Repeat Yourself) is the principle that every piece of knowledge or logic in a system must have a single, authoritative representation.**

Aap jab ek hi calculation, validation rule, ya UI rendering logic ko multiple jagah copy-paste karte ho, toh future mein usme change karna padta hai toh har copy ko alag-alag update karna padta hai. DRY is duplication ko functions, classes, modules, ya configuration files mein centralize karke solve karta hai. Iska matlab yeh nahi hai ki har line ko aggressively extract karo; asal goal knowledge aur behaviour ki single source of truth banana hai.

DRY ko sirf "copy-paste mat karo" ke roop mein mat socho. Yeh abstraction, modularity, aur maintainability ke beech ek direct link banata hai. Jab code DRY hota hai, toh bugs fix karna, features add karna, aur testing karna dramatically simpler ho jaata hai.

> [!NOTE]
> DRY ka sabse bada "aha" yeh hai: duplication sirf lines ki nahi, intent aur knowledge ki bhi hoti hai — agar do jagah same business rule likhi hai, toh woh already DRY violation hai, chahe syntax alag ho.

## 2. Why this matters — concrete and current
Google's internal monorepo mein bazel build rules DRY ko aggressively apply karte hain taaki same compilation flags aur dependency declarations har microservice mein repeat na ho; ek change se thousands of targets update ho jaate hain.

SpaceX ke flight software mein sensor fusion logic ko ek hi library mein rakha jaata hai taaki Falcon aur Starship dono same Kalman filter implementation use karein — ek bug fix dono vehicles mein turant propagate hota hai.

TensorFlow codebase mein low-level ops (jaise matrix multiplication kernels) ko core C++ files mein ek baar define kiya gaya hai; har higher-level Python API usi single implementation ko call karti hai, isliye numerical stability improvements ek jagah se saare models tak pahunchte hain.

Modern semiconductor design tools (Synopsys aur Cadence) mein timing analysis algorithms ko shared libraries mein rakha jaata hai taaki same STA engine multiple process nodes (7 nm, 5 nm, 3 nm) ke liye reuse ho sake bina re-implementation ke.

React ka component model DRY ko UI level par enforce karta hai — ek `<Button>` component likhne ke baad har screen par usi ka reuse hota hai, isliye styling ya accessibility fixes ek jagah se poore product mein apply ho jaate hain.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Functions        | DRY ka sabse basic tool hai — repeated logic ko ek jagah band karna |
| Abstraction      | Duplication detect karne ke liye patterns aur common behaviour ko pehchanna |
| Scope & visibility | Extracted code ko sahi jagah rakhna taaki dependencies clear rahein |
| Refactoring      | Existing duplicated code ko safely DRY karne ki process   |

Agar functions aur basic abstraction aapko abhi clear nahi hain, toh pehle unhe solid kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Spotting duplication of knowledge
Aap dekhte ho ki ek hi formula ya validation rule do alag-alag functions mein likha hua hai. Yeh duplication sirf text ki nahi, business rule ki hai.

Example: dono `calculateTax()` aur `generateInvoice()` mein `price * 0.18` likha hai.  
Formal statement: agar ek logical rule \( R \) system ke \( n > 1 \) locations par independently maintain kiya ja raha hai, toh woh DRY violation hai.  
> [!WARNING]
> Agar aap sirf text match kar ke duplication count karoge, toh semantically same lekin syntactically different code (jaise ek jagah `0.18` aur doosri jagah `18/100`) miss ho jaayega.

### Step 2 — Identifying the single source of truth
Rule ko ek jagah nikaal ke ek function, constant, ya class mein daal do jo baaki sab use karein.

Example: `const TAX_RATE = 0.18;` aur `applyTax(amount) { return amount * TAX_RATE; }` banao.  
Formal: ek knowledge fragment \( K \) ko ek canonical definition \( D(K) \) mein band karo jise har consumer reference kare.

### Step 3 — Choosing the right abstraction level
Sirf function nahi, kabhi class, kabhi module, kabhi configuration file sahi hota hai.

Example: agar tax logic multiple countries ke liye hai, toh ek `TaxStrategy` interface better hai.  
Formal: abstraction boundary aisi honi chahiye ki uske andar ka change sirf us boundary ke andar hi rahe.

### Step 4 — Verifying single point of change
Ab rule change karne par sirf ek jagah edit karna padna chahiye aur saare consumers automatically update ho jaayein.

Example: `TAX_RATE` ko `0.20` karne se dono tax aur invoice dono sahi ho jaayein.  
Formal: system ka change propagation graph acyclic aur single-source hona chahiye.

### Step 5 — Balancing with other principles
DRY ko blindly apply karne se over-abstraction ho sakta hai; kabhi WET (Write Everything Twice) better hota hai short-term experiments ke liye.

Formal: DRY ko coupling aur cohesion ke saath trade-off karke apply karo.

## 5. Worked examples — har step show karo

**Example 1 — Simple constant extraction**  
*Given:* Do functions mein same magic number `0.18` use ho raha hai.  
*Find:* DRY version.  
Pehle dono jagah `price * 0.18` likha tha.  
Phir ek top-level constant `TAX_RATE = 0.18` define kiya.  
*Why* — constant ek hi jagah change karne ki guarantee deta hai.  
**Final answer**  
```js
const TAX_RATE = 0.18;
function calculateTax(p) { return p * TAX_RATE; }
```
*Reflection:* Magic numbers hamesha duplication ka signal hote hain; inko nikaalna sabse easy DRY win hai.

**Example 2 — Function extraction**  
*Given:* User validation logic teen jagah repeat ho rahi hai.  
*Find:* Single reusable validator.  
Teen jagah `if (!email.includes('@'))` check tha.  
Ek `isValidEmail` function bana diya aur teeno jagah call kiya.  
*Why* — validation rule ab sirf ek jagah evolve karegi.  
**Final answer**  
```js
function isValidEmail(e) { return e.includes('@') && e.includes('.'); }
```
*Reflection:* Jab logic teen se zyada jagah repeat ho, function extraction almost always justified hai.

**Example 3 — Class-level DRY (Strategy pattern)**  
*Given:* Multiple payment processors mein almost identical fee calculation.  
*Find:* DRY design.  
Ek `PaymentProcessor` abstract class banayi jisme `calculateFee()` method hai; concrete classes sirf algorithm override karti hain.  
*Why* — common fee logic ek jagah, differences polymorphism se handle.  
**Final answer**  
```java
abstract class PaymentProcessor {
    double calculateFee(double amt) { return amt * 0.02; }
}
```
*Reflection:* Jab data aur behaviour dono repeat ho rahe hon, class abstraction next level ka DRY step hai.

**Example 4 — Configuration-driven DRY**  
*Given:* Same API endpoint strings multiple microservices mein hard-coded.  
*Find:* Single source.  
Ek central `service-registry.json` banaya aur sab services usko read karte hain.  
*Why* — endpoint change sirf config file mein hota hai.  
**Final answer**  
```json
{ "user-service": "https://api.example.com/users" }
```
*Reflection:* Infrastructure-level duplication ko config ya shared libraries se solve karna production systems mein standard practice hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                          | How to avoid it                              |
|-----------------------------|-----------------------------------------|----------------------------------------------|
| Over-abstraction too early  | Premature DRY for code jo abhi 2 baar hi repeat hua | Pehle 3 occurrences hone ka wait karo        |
| Extracting only syntax      | Sirf text match kiya, intent nahi dekha | Semantic duplication check karo              |
| Shared mutable state        | DRY ke naam par global variables banaye | Pure functions ya immutable objects use karo |
| Wrong abstraction level     | Function ki jagah class nikaal diya     | Cohesion metric dekho pehle                  |
| Ignoring performance        | Har chhoti cheez ko function bana diya  | Hot paths ko measure karke decide karo       |
| Copy-paste of tests         | Test duplication ko DRY se alag maana   | Test helpers aur fixtures banao              |
| Forgetting documentation    | Code toh DRY hai lekin comments repeat  | Doc generation tools use karo                |

## 7. The textbook-precise statement
"Every piece of knowledge must have a single, unambiguous, authoritative representation within a system." — Hunt & Thomas, *The Pragmatic Programmer*, 20th Anniversary Edition, Chapter 2 (DRY principle). The statement assumes that the system is under active maintenance and that changes to business rules are expected; it does not apply to throw-away prototypes where the cost of abstraction exceeds the cost of duplication.

## 8. Visual — diagram or schematic
```text
Before DRY (duplication):
[Module A] --> calculateTax() { price * 0.18 }
[Module B] --> calculateTax() { price * 0.18 }
[Module C] --> calculateTax() { price * 0.18 }

After DRY (single source):
[Shared] --> applyTax(price) { return price * TAX_RATE }
    ^               ^               ^
    |               |               |
[Module A]     [Module B]     [Module C]
```
Arrows show single point of change; all modules reference the same implementation.

## 9. The memory technique
1. **The hook** — Imagine a single golden ledger book; every time someone wants the tax rate they must come to this book instead of keeping their own scribbled notes.
2. **What to overlearn** — "Single source of truth" phrase + the three-word trigger "Where does this knowledge live?"
3. **Spaced-repetition schedule** — Review the definition after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Agar yaad na rahe toh poochho: "Agar yeh rule kal change ho jaaye toh kitni files edit karni padegi?" — jitna zyada answer utna zyada DRY violation.

## 10. What this unlocks
DRY solid hone ke baad aap cleanly higher-order design patterns (Factory, Strategy, Template Method) apply kar paoge kyunki repeated code already nikaala hua hoga.

- SOLID ke Single Responsibility Principle ko practically apply karna
- Refactoring legacy codebases without fear
- Writing testable, mockable modules
- Creating shared libraries across microservices
- Configuration-driven systems (feature flags, environment settings)

## 11. Self-check — five questions, no answers
1. Ek 200-line file mein same 4-line validation block 6 baar repeat ho raha hai — yeh DRY violation hai ya nahi, aur kyun?
2. Aapne ek constant `MAX_RETRIES = 3` nikala lekin usi file mein ab bhi `3` hard-coded jagahon par use ho raha hai — ab kya karna chahiye?
3. Dono `User` aur `Admin` classes mein identical `getFullName()` method hai; DRY karne ke liye best abstraction kya hai?
4. Performance-critical loop ke andar ek chhota calculation repeat ho raha hai — DRY apply karna sahi rahega ya nahi?
5. Agar aap ek rule ko config file mein daal dete ho lekin code ab bhi us config ko 4 jagah alag-alag parse kar raha hai, toh DRY achieve hua ya nahi?