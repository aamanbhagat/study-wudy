## 1. The one-sentence answer

**YAGNI (You Aren't Gonna Need It) ek design principle hai jo kehta hai ki aap sirf woh functionality implement karo jo abhi zaruri hai, future speculation ke basis par extra code mat likho.**

Yeh principle Object-Oriented Programming mein over-engineering ko rokta hai. Jab aap kisi class ya method ko design kar rahe hote ho aur sochte ho “shayad baad mein yeh feature chahiye hoga”, YAGNI aapko rokta hai aur kehta hai ki uss feature ko tab tak mat add karo jab tak actual requirement na aa jaaye. Iska core idea yeh hai ki extra code maintainability ko kharab karta hai, testing burden badhata hai aur future changes ko mushkil bana deta hai.

Aap jab kisi problem ko solve kar rahe hote ho, toh current use-case par focus rakho. Agar ek simple class kaafi hai toh usme inheritance, interfaces ya design patterns mat daalo sirf isliye kyunki “ek din zaruri pad sakta hai”.

> [!NOTE]
> Sabse bada “aha” moment yeh hai ki YAGNI time aur complexity dono bachata hai kyunki jo code aap aaj nahi likhte, usko kabhi debug, test ya refactor bhi nahi karna padta.

## 2. Why this matters — concrete and current

Google ke internal microservices teams ne 2018-2022 ke dauran YAGNI ko aggressively apply kiya jab woh apne core search infrastructure ko modular bana rahe the. Unhone sirf woh endpoints expose kiye jo current query patterns ke liye zaroori the, jisse unnecessary API surface area kam hua aur security surface bhi chhoti rahi.

SpaceX ke flight software teams Flight Software 9.0 release mein YAGNI ka use karte hue sirf woh telemetry modules implement kiye jo actual Falcon 9 recovery ke liye chahiye the. Extra predictive failure modules ko tab tak hold kiya jab tak real flight data uski zarurat na dikhaaye.

Kubernetes ke early contributors ne Custom Resource Definitions (CRDs) ko tab tak nahi banaya jab tak actual user workloads ne unki demand na ki. Is approach ne initial codebase ko lean rakha aur contributors ko unnecessary abstraction layers se bachaya.

Modern ML training pipelines mein, jaise Hugging Face ke Transformers library ke kuch contributors, sirf woh tokenizer features implement karte hain jo current model training scripts mein use ho rahe hain. Baaki speculative features ko alag PRs mein rakha jaata hai.

Android Jetpack Compose team ne bhi YAGNI apply kiya jab unhone sirf woh composables banaye jo existing View system ke migration path ke liye zaroori the, future “declarative everything” vision ko tab tak code mein nahi daala.

## 3. Mental prerequisites

| Concept              | Why you need it here                              |
|----------------------|---------------------------------------------------|
| Current requirements | YAGNI sirf tab kaam karta hai jab aapko pata ho ki abhi kya chahiye |
| Code maintainability | Extra code ka long-term cost samajhna zaroori hai |
| Incremental design   | Step-by-step feature addition ka comfort hona chahiye |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the actual need right now
Aap pehle yeh clearly likho ki current requirement kya hai. Koi bhi “future proofing” wala feature abhi mat socho.

Example: Ek `User` class mein sirf `name` aur `email` store karna hai. Abhi `address` field mat add karo.

Formal statement: Implement only the behaviour that satisfies the present specification \( S \).

> [!WARNING]
> Agar aap current requirement ko galat samajh lete ho toh YAGNI bhi galat direction mein kaam karega.

### Step 2 — Detect speculative code
Jab aap likhte waqt soch rahe ho “ek din yeh bhi chahiye hoga”, woh speculation hai.

Example: `User` class mein `getFullAddress()` method abhi mat likho kyunki “shayad delivery feature aayega”.

### Step 3 — Measure the cost of extra code
Har extra method ya field ka cost hota hai — testing, documentation aur future refactoring.

Formal statement: Let \( C(f) \) be the total lifecycle cost of feature \( f \). YAGNI asserts \( C(f) > 0 \) even when \( f \) is not yet used.

### Step 4 — Defer until the need is proven
Jab actual requirement aa jaaye tabhi code likho. Isse aapko real usage pattern pata rehta hai.

### Step 5 — Refactor only when needed
Agar baad mein zarurat padi toh existing simple code ko refactor karo, pehle se complex mat banao.

## 5. Worked examples — har step show karo

**Example 1 — Simple user class**
*Given:* System ko sirf user ka naam aur email store aur retrieve karna hai.
*Find:* Class design.
Pehle sirf do fields rakho. Koi aur method mat add karo.  
*Why:* Current requirement mein aur kuch nahi maanga gaya.  
**Final answer:**  
```java
class User {
    String name;
    String email;
}
```
*Reflection:* Yeh example isliye simple thi kyunki koi temptation nahi tha, lekin asli projects mein yahi temptation sabse zyada hoti hai.

**Example 2 — Adding a method later**
*Given:* Ab delivery address chahiye.
*Find:* Kab add karna hai.
Pehle requirement aa jaane ke baad hi `address` field aur getter add karo.  
*Why:* Ab concrete use-case aa gaya hai.  
**Final answer:** Address-related code tab add kiya jaaye jab ticket ya user story actually assign ho.

**Example 3 — Avoiding premature interface**
*Given:* Ek `PaymentProcessor` class hai.
*Find:* Interface banayein ya nahi.
Abhi sirf ek implementation hai toh interface mat banao.  
*Why:* Extra abstraction abhi kisi ko bhi nahi chahiye.  
**Final answer:** Interface tab extract karo jab doosra implementation actually likha jaaye.

**Example 4 — Refactoring after real need**
*Given:* Do payment methods aa gaye hain.
*Find:* Ab design improve karo.
Ab `PaymentProcessor` interface extract karo aur dono classes usko implement karein.  
*Why:* Ab multiple implementations exist karti hain, isliye abstraction justified hai.  
**Final answer:** Interface extraction after second implementation.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                        | How to avoid it                          |
|-----------------------------|---------------------------------------|------------------------------------------|
| “Future proofing” features  | Developer ko lagta hai woh smart hai  | Requirement document ko strictly follow karo |
| Adding getters “just in case” | Convenience ke naam par speculation   | Sirf woh getters likho jo current code use kar raha hai |
| Early design patterns       | Patterns cool lagte hain              | Pattern tab apply karo jab problem clearly dikhe |
| Over-generalising methods   | Ek method sab kuch handle kare        | Method ko single responsibility tak limit rakho |
| Ignoring deletion cost      | Code likhna easy lagta hai            | Har naye method ka future delete cost socho |
| Team pressure for “complete” design | Manager ko lagta hai project mature nahi dikhega | YAGNI ko team guideline mein clearly likho |

## 7. The textbook-precise statement

YAGNI states that a software feature should be implemented only when it is actually needed, not when it is anticipated. In the words of Ron Jeffries: “Always implement things when you actually need them, never when you just foresee that you need them.” This principle appears in the Extreme Programming literature and is discussed at length in Martin Fowler’s *Refactoring: Improving the Design of Existing Code*, 2nd edition, Chapter 2.

## 8. Visual — diagram or schematic

```text
Current Need
     |
     v
[Simple Code] --> (No speculation)
     |
     +-- Requirement arrives --> [Add only needed code]
     |
     +-- No requirement --> [Do nothing]
```

## 9. The memory technique

1. **The hook** — Imagine aap fridge mein sirf aaj ki sabzi rakhte ho, kal ki nahi. Extra sabzi sada jaati hai — waise hi extra code sada jaata hai.
2. **What to overlearn** — “Implement only what is asked today.”
3. **Spaced-repetition schedule** — 1 din baad, 3 din baad, 7 din baad, 16 din baad, 35 din baad review karo.
4. **First-principles fallback** — Agar yaad na rahe toh poochho: “Agar yeh feature aaj use nahi ho raha toh iska code likhne ka kya justification hai?”

## 10. What this unlocks

YAGNI aapko clean, maintainable code likhne mein madad karta hai aur aage ke design patterns (Strategy, Factory, etc.) ko sahi time par apply karne deta hai.

- Next: Single Responsibility Principle ko gehraai se samajhna
- Refactoring without fear
- Agile story slicing techniques
- Technical debt management

## 11. Self-check — five questions, no answers

1. Ek `Order` class mein `calculateTax()` method tab add karna chahiye jab?
2. Agar aapko lagta hai ki “ek din multi-currency support chahiye hoga”, aap kya karoge?
3. YAGNI aur “premature optimisation” mein kya farak hai?
4. Ek team member extra interface add kar raha hai. Kaise usse baat karoge?
5. Kya YAGNI ka matlab yeh hai ki aap kabhi bhi planning nahi kar sakte?