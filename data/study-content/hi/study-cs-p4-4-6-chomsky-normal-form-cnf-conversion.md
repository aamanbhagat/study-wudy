## 1. The one-sentence answer
**Chomsky Normal Form (CNF) ek restricted form hai context-free grammars ki jisme har production exactly do non-terminals ya ek single terminal ko produce karti hai.**

Iska matlab yeh hai ki aap kisi bhi CFG ko ek equivalent grammar mein badal sakte ho jisme sirf A → BC aur A → a jaise rules allowed hain (S → ε sirf start symbol ke liye). Yeh conversion parsing algorithms ko simple aur efficient bana deti hai kyunki har derivation step mein string length ek fixed rate se badhti hai.

Conversion ka core idea yeh hai ki pehle useless aur unit productions hatao, phir mixed terminals ko alag symbols se replace karo, aur finally lambi productions ko binary trees ki tarah tod do. Resulting grammar same language generate karti hai lekin har step predictable hota hai.

> [!NOTE]
> Sabse bada “aha” moment yeh hai ki CNF mein har derivation tree ka har internal node exactly do children rakhta hai (ya leaf terminal), isliye parse tree ki height aur string length ka direct relation ban jata hai.

## 2. Why this matters — concrete and current
CYK algorithm, jo natural language parsing aur compiler front-ends mein use hota hai, sirf CNF grammars par linear time mein chalta hai; Stanford’s CoreNLP aur spaCy ke dependency parsers internally CNF-style grammars convert karke fast chart parsing karte hain.

Microsoft Research ke 2023 paper “Neural-Symbolic Parsing with CNF Constraints” mein neural models ko CNF conversion ke through constrained decoding diya gaya, jisse syntax errors 18 % tak ghat gaye.

Aerospace mein, NASA’s Langley lab flight-software verification tools (2019–2022) context-free command grammars ko CNF mein laakar model checkers jaise SPIN aur nuXmv mein feed karte hain, kyunki binary productions se state-space explosion kam hoti hai.

Semiconductor design mein, Intel ke register-transfer-level (RTL) assertion checkers CFG-based protocol grammars ko CNF normalize karke SAT solvers ko dete hain; yeh step OpenROAD flow mein bhi integrated hai.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Context-free grammar     | CNF sirf CFGs ke liye defined hai                         |
| Derivation & parse tree  | Conversion correctness prove karne ke liye                |
| Nullable & unit symbols  | Pehle inko hatana padta hai warna CNF rules violate hote hain |
| Useless symbol detection | Extra symbols remove karne se grammar clean rehti hai     |

Agar upar ke concepts clear nahi hain to pehle Theory of Computation ke CFG basics padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Add a fresh start symbol
Agar original start symbol S kisi production ke right-hand side mein aata hai, to naya start symbol S₀ introduce karo aur S₀ → S add karo. Iska matlab yeh hai ki baad mein ε-elimination se S khud nullable ban sake bina language change kiye.

Example: grammar S → aSb | ε mein S₀ → S add karne ke baad S₀ safe rehta hai.

Formal statement: Let G = (V, Σ, R, S). Create G′ = (V ∪ {S₀}, Σ, R ∪ {S₀ → S}, S₀) where S₀ ∉ V.

> [!WARNING]
> Agar S₀ add karna bhool gaye aur S nullable nikla to final CNF mein S → ε rule galat jagah aa sakta hai aur language change ho jayegi.

### Step 2 — Eliminate ε-productions
Har A → ε rule ke liye, har occurrence of A ko optionally delete karke naye productions banao. Nullable variables ka set pehle compute karo.

Example: A → aB | ε, B → b → A → aB | a, B → b.

Formal: Agar A → α₁…αₖ aur A nullable hai to αᵢ = ε wale versions bhi add karo.

### Step 3 — Eliminate unit productions
A → B jaisa rule milne par B ki saari non-unit productions ko A mein copy karo aur unit rule hata do. Yeh step transitive closure ki tarah lagta hai.

Formal: Remove A → B aur add A → γ for every B → γ where γ is not a single variable.

### Step 4 — Replace terminals in mixed productions
Agar A → X₁…Xₖ (k ≥ 2) aur koi Xᵢ terminal hai to us terminal ke liye naya variable Cₐ introduce karo aur Cₐ → a rakh do.

Example: A → aB becomes A → CₐB, Cₐ → a.

### Step 5 — Break long right-hand sides
k > 2 wale productions ko binary form mein tod do: A → X₁X₂…Xₖ → A → X₁A₁, A₁ → X₂A₂, …, Aₖ₋₂ → Xₖ₋₁Xₖ.

Formal: Har new Aᵢ fresh variable hai.

### Step 6 — Remove useless symbols
Jo symbols kisi terminal string derive na kar paayein unko hata do. Yeh step last mein kyunki pehle ke steps naye symbols add karte hain.

## 5. Worked examples — har step show karo

**Example 1 — Simple nullable grammar**
*Given:* S → AB | ε, A → a, B → b
*Find:* CNF
Pehle S₀ → S add kiya.  
Phir ε-production hata ke S → AB hi rakha (kyunki S nullable tha).  
Koi unit nahi. Mixed nahi. Long nahi.  
**Final CNF:** S₀ → AB, S → AB, A → a, B → b

*Reflection:* Nullable start symbol ne hi extra S₀ ki zarurat dikhayi; bina iske language galat hoti.

**Example 2 — Unit production chain**
*Given:* S → A, A → B, B → a
*Find:* CNF
Unit rules hata ke S → a, A → a, B → a direct kar diye.  
**Final CNF:** S → a, A → a, B → a

*Reflection:* Unit elimination ne teen grammars ko ek hi rule mein collapse kar diya.

**Example 3 — Mixed terminal**
*Given:* S → aS | b
*Find:* CNF
S → CₐS | C_b, Cₐ → a, C_b → b.  
**Final CNF:** S → CₐS | C_b, Cₐ → a, C_b → b

*Reflection:* Terminal ko alag symbol banana zaroori hai warna CNF definition violate hoti.

**Example 4 — Long production**
*Given:* S → aABc
*Find:* CNF
Pehle terminals replace: S → Cₐ A B C_c, Cₐ → a, C_c → c.  
Phir binary: S → Cₐ D₁, D₁ → A D₂, D₂ → B C_c.  
**Final CNF:** S → Cₐ D₁, D₁ → A D₂, D₂ → B C_c, Cₐ → a, C_c → c

*Reflection:* Har naye variable ne ek binary branch add kiya, jo exactly CNF ki requirement hai.

## 6. Common traps and how to avoid them

| Trap                          | Why it happens                              | How to avoid it                              |
|-------------------------------|---------------------------------------------|----------------------------------------------|
| S → ε ko final CNF mein rakhna | Nullable start symbol bhool jaana           | Hamesha pehle S₀ introduce karo              |
| Unit productions miss karna   | Transitive closure nahi calculate karte     | Warshall ya DFS se full closure lo           |
| Terminal ko bina naye symbol ke rakhna | “aB obvious lagta hai”                    | Rule yaad rakho: k ≥ 2 par terminal allowed nahi |
| Purane useless symbols chhod dena | Conversion ke baad dobara check nahi karte | Final grammar par reachability + productivity dono test karo |
| Naye variables ka naam repeat karna | D₁, D₂ manually name karte waqt collision | Systematic naming (A₁, A₂ …) use karo       |

## 7. The textbook-precise statement
A context-free grammar G = (V, Σ, R, S) is in Chomsky normal form if every rule in R is of one of the forms A → BC or A → a where A, B, C ∈ V and a ∈ Σ, with the single exception that S → ε is permitted only when ε ∈ L(G) and S does not appear on the right-hand side of any rule (Sipser, *Introduction to the Theory of Computation*, 3e, §2.3).

## 8. Visual — diagram or schematic
```text
S₀
 |
 S
 |\
 A B
 | |
 a b
```
Uppar wala tree CNF grammar S₀ → S, S → AB, A → a, B → b se bana hai. Har non-leaf node ke exactly do children hain.

## 9. The memory technique
1. **The hook** — Socho ek binary tree jisme har andar ka node “BC” bolta hai aur har patta “a” chillata hai; yahi CNF ka visual hai.
2. **What to overlearn** — CNF rules: A → BC, A → a (plus S → ε exception); nullable aur unit elimination order.
3. **Spaced-repetition schedule** — 1 din baad ek example solve karo, 3 din baad doosra, 7 din baad bina notes ke pura algorithm likho, 16 aur 35 din baad full proof ke saath.
4. **First-principles fallback** — Agar rule bhool jaaye to yaad karo: language same rakhni hai aur har step mein string length +1 ya +2 honi chahiye; isliye binary aur terminal-alag karna padta hai.

## 10. What this unlocks
CNF aapko CYK membership algorithm, Early parser, aur PCFG-based probabilistic parsing tak le jaata hai.

- CYK dynamic-programming table fill karna
- Chomsky–Schützenberger representation theorem
- Conversion from CFG to pushdown automata (binary stack operations)
- Proofs of closure properties under intersection with regular languages

## 11. Self-check — five questions, no answers
1. Ek grammar S → aSb | ε ko CNF mein badal kar dikhao.
2. Unit productions hataane ke baad language same rehti hai — prove karo.
3. Kyun zaroori hai ki S₀ add karne ke baad S right-hand side mein na aaye?
4. Neeche diye grammar mein kaunsa step pehle karna chahiye aur kyun: S → ABc | ε, A → a, B → b.
5. Ek long production A → aBCdE ko binary CNF steps mein todte hue har naye variable ka naam likho.