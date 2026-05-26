## 1. The one-sentence answer
**TDD ka Red-Green-Refactor cycle ek disciplined workflow hai jisme aap pehle ek failing test likhte ho, phir us test ko pass karne ke liye minimal code likhte ho, aur finally code ko improve karte ho bina uske behaviour badle.**

Yeh cycle aapko force karti hai ki pehle requirements ko executable tests mein translate karo. Isse aapko turant feedback milta hai ki aapka code sahi direction mein ja raha hai ya nahi. Har iteration chhoti hoti hai, isliye bugs jaldi pakde jaate hain aur design naturally simple rehta hai.

Red phase mein test likhkar aap apni expectation ko clearly define karte ho. Green phase mein aap sirf itna code likhte ho jo test pass kare. Refactor phase mein aap duplication hataate ho aur readability badhaate ho.

> [!NOTE]
> Sabse badi aha yeh hai ki tests aapke design ko drive karte hain, na ki baad mein add-on ban kar aate hain.

## 2. Why this matters — concrete and current
Google apne internal production code ke liye TDD ka extensively use karta hai, khas kar Chrome aur Search infrastructure teams mein, kyunki yeh unke massive monorepo mein regressions ko prevent karta hai jab hazaron engineers ek saath changes karte hain.

SpaceX ke flight software teams TDD practices follow karte hain jab wo real-time control loops likhte hain, jahaan ek chhota logical error bhi mission failure ka cause ban sakta hai.

Microsoft ka TypeScript compiler team ne documented kiya hai ki unke major refactors TDD cycle ke through kiye gaye, jisse unhe breaking changes jaldi detect hue bina external test suites ke.

Modern ML infrastructure mein, jaise Hugging Face ke model deployment pipelines, TDD cycle use hoti hai data preprocessing functions ke liye taaki tensor shape mismatches aur numerical instability jaldi catch ho jaaye.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Unit test basics     | TDD cycle tests par based hai; aapko assert aur test runner samajhna zaroori hai |
| Function behaviour   | Har test ek specific behaviour ko target karta hai        |
| Code duplication recognition | Refactor step mein duplicate logic ko spot karna padta hai |

Agar aap inme se koi bhi weak feel karte ho, pehle basic unit testing practice kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Write a failing test first
Aap ek test likhte ho jo abhi exist nahi karti functionality ko describe karta hai. Yeh test compile ya run hone par fail hona chahiye.

Example: `add(2, 3)` function ke liye test likho jo expect kare ki result 5 aaye, lekin function abhi sirf stub hai.

Formal statement: Let \( T \) be a test case such that \( \text{execute}(T) = \text{fail} \) before any implementation exists.

> [!WARNING]
> Agar test pehle se pass ho raha hai to aapne actually koi naya requirement nahi add kiya.

### Step 2 — Make the test pass with minimal code
Sirf utna code likho jo current test ko pass kar de. Duplication ya elegance ki chinta mat karo.

Example: `add` function mein hardcode `return 5;` likh do.

Formal statement: Find smallest \( I \) such that \( \text{execute}(T, I) = \text{pass} \).

> [!WARNING]
> Zyada code yahan likhna future tests ko weak bana deta hai.

### Step 3 — Run the test suite to confirm green
Pura suite execute karo taaki sirf yeh test pass na ho, balki pehle wale tests bhi pass rahein.

### Step 4 — Refactor for clarity and removal of duplication
Code ko improve karo lekin tests ko pass rakhkar. Duplication hatao, names better karo.

Formal statement: Apply semantics-preserving transformations until no further improvement is possible without changing observable behaviour.

### Step 5 — Repeat with next smallest test
Ek naya failing test add karke cycle restart karo. Yeh incremental growth ensure karta hai.

## 5. Worked examples — har step show karo

**Example 1 — Simple addition**
- *Given:* Koi bhi `add` function nahi hai.
- *Find:* `add(2, 3)` should return 5.
- Write test: `assert add(2, 3) == 5` → fails (Red).  
  *Why:* Yeh test requirement ko clearly encode karta hai.
- Implement: `def add(a, b): return 5` → passes (Green).  
  *Why:* Minimal code se test pass hota hai.
- Refactor: `def add(a, b): return a + b` → still passes.  
  *Why:* Behaviour same rehta hai lekin code general ho gaya.

**Final answer**  
**add function now correctly implements addition after one cycle.**

*Reflection:* Yeh example isliye simple thi kyunki ek hi test tha; generalisation yeh hai ki har cycle ek constraint add karti hai.

**Example 2 — Sum of list**
- *Given:* Empty list ka sum 0 hona chahiye.
- *Find:* `sum_list([])` should return 0.
- Red: Test fails on undefined function.  
- Green: `def sum_list(lst): return 0`.  
- Refactor: `def sum_list(lst): return sum(lst)`.

**Final answer**  
**sum_list handles empty input correctly.**

*Reflection:* Hardcoded value se general built-in use tak jaana typical refactor move hai.

**Example 3 — String reversal with edge case**
- *Given:* Empty string aur normal string dono handle karne hain.
- *Find:* `reverse("") == ""` and `reverse("abc") == "cba"`.
- Red: First test fails.  
- Green: `return ""`.  
- New Red: Second test fails.  
- Green: `return s[::-1]`.  
- Refactor: Extract helper if needed.

**Final answer**  
**reverse handles both empty and non-empty strings.**

*Reflection:* Multiple tests force incremental implementation without over-engineering.

**Example 4 — Bank account withdraw with overdraft rule**
- *Given:* Balance check before withdrawal.
- *Find:* Withdraw only if sufficient funds.
- Red: Test for insufficient funds fails.  
- Green: Simple if-check.  
- Refactor: Move validation to separate method.

**Final answer**  
**Account class maintains invariant after refactor.**

*Reflection:* Business rule ko test-driven banana design ko clean rakhta hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                        | How to avoid it                          |
|-----------------------------|---------------------------------------|------------------------------------------|
| Writing too much code in Green | Fear that minimal code will break later | Remember: next test will force the right logic |
| Skipping Refactor           | Green milne ke baad jaldi aage badhna | Set timer for 2 minutes of refactoring   |
| Tests that are too broad    | One test mein multiple behaviours     | Har test ek single behaviour target kare |
| Forgetting to run full suite| Only new test check karna             | Always run entire suite after each phase |
| Refactoring that changes behaviour | Over-eagerness to optimise            | Run tests after every small edit         |
| Starting with implementation| Old habit of coding first             | Literally type the test file first       |

## 7. The textbook-precise statement
Test-Driven Development requires that each new capability is expressed first as a failing test, implemented with the smallest possible change that causes the test to pass, and then improved through behaviour-preserving refactorings. All tests must remain passing after every change. (Beck, *Test-Driven Development: By Example*, 2002, Chapter 2)

## 8. Visual — diagram or schematic
```text
          +-------------+
          |   Red       |  <- Write failing test
          +------+------+
                 |
                 v
          +------+------+
          |   Green     |  <- Minimal code to pass
          +------+------+
                 |
                 v
          +------+------+
          |  Refactor   |  <- Clean code, same behaviour
          +------+------+
                 |
                 +------ back to Red (repeat)
```

## 9. The memory technique
1. **The hook** — Picture a traffic light: Red (stop and write test), Green (go and make it pass), Refactor (smooth the road).
2. **What to overlearn** — Order is always Red → Green → Refactor; never skip Red.
3. **Spaced-repetition schedule** — Review cycle after 1 day, 3 days, 7 days, 16 days, 35 days by implementing one small function each time.
4. **First-principles fallback** — Bhool jaaye to socho: “Test se shuru karo, sirf utna code likho jo pass kare, phir saaf karo.”

## 10. What this unlocks
Yeh cycle aapko clean architecture, continuous integration, aur safe refactoring ki taraf le jaati hai.

- Next: Mock objects and test doubles
- Next: Behaviour-Driven Development (BDD)
- Next: Property-based testing
- Next: Legacy code refactoring using TDD

## 11. Self-check — five questions, no answers
1. Ek function ke liye pehla test likhne ke baad woh test kyun fail hona chahiye?
2. Green phase mein aap kitna code likh sakte ho?
3. Refactor step mein kaunsi cheez allowed nahi hai?
4. Agar aap Refactor ke baad ek test fail ho jaaye to kya galti hui?
5. Kaise pata chalega ki aapka TDD cycle sach mein incremental design produce kar raha hai?