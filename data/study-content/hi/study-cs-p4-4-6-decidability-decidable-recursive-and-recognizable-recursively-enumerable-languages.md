## 1. The one-sentence answer
**A language is decidable (recursive) if a Turing machine exists that always halts and correctly says yes or no; it is recognizable (recursively enumerable) if a Turing machine exists that halts and accepts on yes-instances but may loop forever on no-instances.**

Yeh distinction isliye important hai kyunki har problem ka solution deterministic aur finite time mein nahi milta. Decidable languages ke liye aap ek algorithm likh sakte ho jo guaranteed terminate karega. Recognizable languages mein sirf “haan” cases pe guarantee hai; “na” cases pe machine infinite loop mein ja sakti hai. Dono classes ko samajhna Theory of Computation ka foundation hai kyunki yeh batata hai ki computation ki limits kahan khatam hoti hain.

> [!NOTE]
> Sabse badi “aha” yeh hai ki halting problem recognizable toh hai lekin decidable nahi; isliye recognizable class decidable class se strictly badi hai.

## 2. Why this matters — concrete and current
Modern compilers (LLVM, GCC) mein type-checking aur certain static analyses decidable problems par based hain; agar koi check undecidable hota toh compiler kabhi terminate nahi karta. NASA’s model checkers (SPIN, CBMC) safety properties ko decidable fragments tak limit karte hain taaki rocket control software ka verification guaranteed time mein ho. Google’s malware scanners aur antivirus engines recognizable languages use karte hain: ek signature-matching TM accept karta hai jab virus mila, lekin unknown variants pe loop kar sakta hai. Database query optimizers mein containment checking (SQL subset) ko decidable fragments mein rakha jata hai warna query planner kabhi jawab nahi dega. Semiconductor formal verification tools (Cadence JasperGold) liveness properties ko recognizable automata par model karte hain aur finite unrolling se decidable approximation banate hain.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Turing machine definition | Dono classes ki formal definition TM par based hai |
| Language acceptance & rejection | Halting vs looping behaviour ko distinguish karne ke liye |
| Enumerable sets (countable infinity) | Recognizable languages ko strings ke enumeration se link karta hai |
| Diagonalization argument | Halting problem ko undecidable dikhane ke liye zaroori |

Agar upar ke concepts clear nahi hain toh pehle basic Turing machine aur language definitions padho.

## 4. Building the idea — from intuition to formalism

### Step 1 — Turing machine as language decider
Aap ek TM ko language L ka decider tab kehte ho jab woh har input string pe hamesha halt karta hai aur accept karta hai sirf tab jab string L mein ho.  
Example: Even-length binary strings ka TM har input pe do states mein count karta hai aur last bit dekh kar halt karta hai.  
Formal statement:  
$$L\text{ is decidable}\iff\exists\text{ TM }M\text{ such that }M\text{ halts on every }w\in\Sigma^*\text{ and }L(M)=L.$$

> [!WARNING]
> Agar aap sirf “halts on yes instances” likh dete ho toh definition recognizable ban jati hai aur decidable nahi.

### Step 2 — Recognizer allows non-halting on no instances
Recognizer TM L ko tab recognize karta hai jab woh sirf L ke strings ko accept karta hai; baaki strings pe woh loop kar sakta hai.  
Example: {aⁿbⁿcⁿ | n≥0} ko ek TM recognize karta hai lekin n galat hone pe tape khatam nahi karta.  
Formal statement:  
$$L\text{ is recognizable}\iff\exists\text{ TM }M\text{ such that }w\in L\implies M\text{ accepts }w\text{ and }w\notin L\implies M\text{ loops}.$$

### Step 3 — Recursive vs recursively enumerable sets
Recursive languages exactly decidable languages hain; recursively enumerable languages recognizable languages hain. Dono terms set theory se aaye hain jahaan recursive set ka characteristic function computable hota hai.

### Step 4 — Closure properties
Decidable languages closed hain under complement, union, intersection. Recognizable languages closed hain under union aur intersection lekin complement ke under nahi. Yeh difference proof techniques mein kaam aati hai.

### Step 5 — Halting problem as canonical example
Halting language  
$$H=\{\langle M,w\rangle\mid M\text{ halts on }w\}$$  
recognizable hai (universal TM simulate karke) lekin undecidable (diagonalization se).

### Step 6 — Rice’s theorem boundary
Koi bhi non-trivial property of recognizable languages undecidable hoti hai. Yeh batata hai ki formal verification mein kitni cheezein automatically nahi ki ja sakti.

### Step 7 — Textbook-grade separation
A language L decidable hai agar aur sirf agar L aur uska complement dono recognizable hain. Yeh theorem dono classes ko ek dusre se tightly relate karta hai.

## 5. Worked examples — har step show karo

**Example 1 — Even length strings**  
*Given:* L = {w ∈ {0,1}* | |w| even}.  
*Find:* Decide whether L is decidable.  
Step 1: TM M even-odd counter state se shuru hota hai.  
Step 2: Har symbol read karke state flip karta hai.  
Step 3: Input khatam hone pe even state mein accept karta hai.  
*Why:* Counter state finite hai isliye har input pe halt hota hai.  
**L is decidable.**

**Example 2 — {aⁿbⁿ | n ≥ 0}**  
*Given:* L = {aⁿbⁿ | n ≥ 0}.  
*Find:* Check recognizability.  
Step 1: TM tape pe ‘a’ count karta hai aur har ‘a’ ke liye ek mark lagata hai.  
Step 2: ‘b’ section mein marks match karta hai.  
Step 3: Agar match nahi toh reject nahi karta, balki loop karta hai (ya deliberately reject kar sakte hain).  
*Why:* Agar n galat hai toh machine extra symbols pe atak sakti hai.  
**L is decidable (actually context-free bhi).**

**Example 3 — Halting language**  
*Given:* H = {⟨M,w⟩ | M halts on w}.  
*Find:* Show H recognizable but not decidable.  
Step 1: Universal TM U simulate karta hai M on w.  
Step 2: Agar simulation halt hoti hai toh accept.  
Step 3: Agar nahi halt hoti toh U bhi nahi halt.  
*Why:* Simulation faithful hai isliye recognizable; diagonalization se undecidable.  
**H recognizable, undecidable.**

**Example 4 — Complement of halting language**  
*Given:* H̄.  
*Find:* Show H̄ not recognizable.  
Step 1: Assume H̄ recognizable by some TM N.  
Step 2: H recognizable by U (from Example 3).  
Step 3: Dono se H decidable ban jaata hai (Theorem Step 7).  
Step 4: Contradiction.  
*Why:* Isliye H̄ recognizable nahi ho sakta.  
**H̄ not recognizable.**

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| “Recognizer bhi hamesha halt karega” | Students TM simulation ko deterministic algorithm samajhte hain | Har definition mein “may loop” clause ko explicitly likho |
| Complement ko recognizable maan lena | Closure properties confuse ho jaate hain | Pehle theorem “L and complement both RE ⇒ decidable” yaad rakho |
| Halting problem ko “undecidable isliye unrecognizable” bolna | “Undecidable” aur “unrecognizable” ko synonym samajhna | Hamesha do alag classes draw karo |
| Rice theorem ko har property pe apply karna | Non-trivial property ka matlab nahi samajhte | Sirf language properties jo TM ke language par depend karti hain unpe apply karo |
| Finite automata ko TM samajhna | Regular languages ko directly generalize karte hain | Yaad rakho TM infinite tape aur arbitrary loops le sakta hai |

## 7. The textbook-precise statement
A language L ⊆ Σ* is decidable (recursive) if there exists a Turing machine M that halts on every input w ∈ Σ* and accepts w if and only if w ∈ L. L is recognizable (recursively enumerable) if there exists a Turing machine M such that w ∈ L implies M accepts w, while w ∉ L implies M either rejects or loops forever. A language is decidable if and only if both it and its complement are recognizable (Sipser, *Introduction to the Theory of Computation*, 3e, Theorem 4.22).

## 8. Visual — diagram or schematic
```
          All Languages
               |
       Recognizable (RE)
         /           \
   Decidable (R)     RE but not decidable
       |                   |
   Regular, CFL, CSL     Halting problem, A_TM
```

Diagram labels: top box “All languages”, middle box “RE”, left child “Recursive = decidable”, right child “RE \ R (e.g. A_TM)”.

## 9. The memory technique
1. **The hook** — Socho ek dost jo sirf “haan” bolta hai jab sach mein haan ho; warna chup ho jaata hai ya ghumta rehta hai — woh recognizable machine hai. Jo hamesha haan ya na bolta hai woh decidable.
2. **What to overlearn** — “L decidable ⇔ L ∈ RE aur complement(L) ∈ RE”.
3. **Spaced-repetition schedule** — 1 din baad, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Agar definition bhool jaao toh universal TM simulate karke recognizer banao aur phir complement check karke decidable decide karo.

## 10. What this unlocks
Yeh section aapko Rice’s theorem, undecidability proofs, aur reduction techniques samajhne ke liye taiyar karta hai.  
- Rice’s theorem  
- Many-one reductions  
- Post Correspondence Problem  
- Undecidability of context-free language properties  
- Gödel’s incompleteness theorems (logic connection)

## 11. Self-check — five questions, no answers
1. Kya har decidable language regular bhi hoti hai? Counter-example do.  
2. Ek language L ko do jo recognizable ho lekin uska complement recognizable na ho.  
3. Halting problem ko formal statement likho aur prove karo ki woh recognizable hai.  
4. Agar dono L aur complement(L) recognizable hain toh L decidable kyun hai? Step-by-step proof do.  
5. Rice’s theorem ke hisaab se “kya TM kabhi blank symbol print karta hai” wali property decidable hai ya nahi?