## What it is
YAGNI, or "You Aren't Gonna Need It," is a principle from Extreme Programming (XP) that states you should not add functionality until it is demonstrably necessary. It is a disciplined refusal to implement features based on speculation about future needs. Instead, you build only what is required to pass the current set of tests or satisfy the current, concrete requirements.

## Why it matters
In high-stakes fields like aerospace, unnecessary code is a liability. Every line of code in flight software for a rocket or satellite increases the system's complexity, the surface area for bugs, and the verification & validation (V&V) burden. YAGNI forces a minimalist, highly-testable codebase, which is paramount for mission-critical systems. In physics simulations or machine learning, adding speculative features (e.g., an untested physics model, a hypothetical data preprocessing step) bloats the code, slows down computation, and makes it harder to reason about the results.

## When to study it
You are ready for this topic. The only prerequisites are a basic understanding of functions and classes in a language like Python or C++, and having written a small project (500+ lines of code). This experience gives you a reference point for the temptation to add features "just in case." Familiarity with the Single Responsibility Principle (SRP) is helpful but not mandatory.

## How to study it (step by step)
1.  **Read the source.** Find the original description of YAGNI in the context of Extreme Programming. Note its relationship to the mantra, "Do the simplest thing that could possibly work."
2.  **Perform a code audit.** Take a small program you have written. Go through it line-by-line and flag any function, method, variable, or class that exists not to serve a current feature, but a hypothetical future one.
3.  **Refactor by deletion.** Create a new branch in your version control system. Delete all the code you flagged in the previous step. Run your tests or manually verify that the program still meets all of its *original* requirements.
4.  **Quantify the cost.** Calculate the lines of code you deleted. This is a direct measure of wasted effort. Now consider the "invisible" costs: the time spent writing it, debugging it, and the mental overhead it added each time you read the code.
5.  **Distinguish from architecture.** Write a one-paragraph summary contrasting YAGNI with good architectural design. YAGNI is about not building *features* prematurely. Good architecture is about making foundational choices (e.g., interfaces, data structures) that make it *cheaper* to add the right features later, when they are actually needed.

## Key ideas, with intuition
1.  **Cost of Features is Superlinear.** The total complexity, $C$, of a system does not scale linearly with the number of features, $F$. A better model is that complexity grows with the number of interactions between features. If every feature can potentially interact with every other feature, the cost of complexity can approach $C \propto F^2$.
    $$ C(F) \approx k_1 F + k_2 \binom{F}{2} = k_1 F + k_2 \frac{F(F-1)}{2} $$
    YAGNI ruthlessly minimizes $F$ to the set of required features, $F_{req}$, keeping complexity at a minimum. Adding a speculative feature, $F_{spec}$, adds not just its own complexity, but complexity through its interactions with all existing features.

2.  **The Expected Value of Speculative Work is Negative.** Let's model the value of building a feature. The value of a required feature is positive. For a speculative feature $i$, let $p_i$ be the probability you will actually need it. The cost to build it is $E_i$ (effort, time). The cost to maintain it until it's needed (or removed) is $M_i$. The cost of removing it if it's wrong is $R_i$. The value is only realized if you need it *and* your speculation was correct. The expected value is negative because $p_i$ is almost always overestimated and the costs ($E_i, M_i, R_i$) are always paid. YAGNI avoids this by only working on features where $p_i = 1$.

3.  **YAGNI Maximizes Options.** By not committing to a specific implementation for a future problem, you retain the flexibility to solve that problem in the best way using the information you will have *at that time*. Prematurely building a feature locks you into a solution based on incomplete, speculative information. Deferring the decision keeps your options open.

## Worked example
**Requirement:** We need a class to represent a 2D vector for a simple physics simulation. The only current requirement is to be able to add two vectors together.

**Non-YAGNI approach (speculative):**
"We're doing physics, so we'll probably need dot products, cross products, normalization, magnitude, etc. later. Let's add them now to be prepared."

```python
import math

class Vector2D:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector2D(self.x + other.x, self.y + other.y)

    # --- Speculative features ---
    def magnitude(self):
        return math.sqrt(self.x**2 + self.y**2)

    def normalize(self):
        mag = self.magnitude()
        if mag == 0:
            return Vector2D(0, 0)
        return Vector2D(self.x / mag, self.y / mag)

    def dot_product(self, other):
        return self.x * other.x + self.y * other.y
```

**YAGNI approach (disciplined):**
"The requirement is vector addition. We will implement vector addition and nothing else."

```python
class Vector2D:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector2D(self.x + other.x, self.y + other.y)
```

**Reflection:**
*   **Step 1 (Initial class):** The YAGNI version created the simplest possible class that could hold state (`__init__`).
*   **Step 2 (Addition):** It then implemented *only* the required `__add__` method.
*   **Result:** The YAGNI code is smaller, easier to read, has no external dependencies (`math`), and is trivial to test. When the requirement for `magnitude()` appears, we can add it then. The cost of adding it later is tiny, but the cost of carrying, testing, and maintaining the speculative methods until then is real.

## Diagrams
Here are two development paths. The YAGNI path is direct. The non-YAGNI path is full of wasted effort on features that are either never needed or need to be rewritten because the initial speculation was wrong.

```text
Path 1: YAGNI Development

Req_A -----> Impl_A -----> Req_B -----> Impl_B -----> Req_C -----> Impl_C [Clean, direct path]


Path 2: Non-YAGNI Development

                      /--> Impl_Spec_X (Never needed, deleted later)
                     /
Req_A -----> Impl_A --+--> Impl_Spec_Y (Wrong, needs total rewrite for Req_C)
                     \
                      \--> Req_B -----> Impl_B -----> Req_C -----> Rewrite_Y [Wasted effort]
```

## Memory technique — remember this forever
1.  **Mnemonic Story:** Imagine you are packing for a mission to Mars. Your launch vehicle has a strict mass budget. You pack the essentials: life support, water, basic tools. An engineer suggests, "What if we encounter a silicon-based lifeform? We should pack a specialized sonic drill." YAGNI is the mission director who says, "We have no evidence for that. It's dead weight. We aren't gonna need it. We'll solve that problem if and when it arises." **Code has mass.** Don't launch with unnecessary mass.

2.  **Facts to Overlearn:**
    *   "You Aren't Gonna Need It."
    *   "Do the simplest thing that could possibly work."

3.  **Spaced Repetition Schedule:** Review this principle when you start a new project or feature. Then, review it again in 1 day, 3 days, 7 days, 16 days, and 35 days. The best review is to actively apply it to code you are writing.

4.  **First Principles Pathway:** If you forget the details, rebuild from this question: "What is the absolute minimum amount of code I can write to make the current test pass or to satisfy the immediate, concrete requirement?" The answer to that question is the YAGNI path.

## Common mistakes
1.  **Gold Plating.** This is adding extra polish or features that weren't requested because the developer thinks it's "better." For example, adding complex logging and configuration options to a simple script when `print()` statements suffice for now. YAGNI forbids this.
2.  **Confusing YAGNI with Bad Design.** YAGNI does not mean "write messy, unmaintainable code." You should still use good design practices (e.g., clear names, small functions, appropriate abstractions). The YAGNI version of the `Vector2D` class is clean and well-designed; it's just minimal.
3.  **Ignoring The "Last Responsible Moment".** YAGNI is about deferring decisions. Some decisions have a very high cost to change later (e.g., choice of database, core architectural patterns). You should make these foundational decisions, but still avoid implementing specific features within that architecture until they are required. YAGNI applies more to application features than to core infrastructure.

## Self-check
1.  You are writing a command-line tool that takes a filename as an argument. Your only requirement is to read from the file. Should you implement argument parsing to handle flags like `-v` for verbose or `--help` right now? Justify using YAGNI.
2.  You are building a class to manage a user's permissions in a system. The only current permission is `can_edit_document`. Should your internal data structure be a simple boolean `self.can_edit = True`, or a more "future-proof" dictionary like `self.permissions = {'can_edit_document': True}`? Analyze the trade-offs through the lens of YAGNI and the cost of refactoring later.
3.  Consider the task of writing a function `is_prime(n)` to check for primality. A simple implementation iterates from $2$ to $\sqrt{n}$. A more complex but faster implementation uses the Miller-Rabin primality test. If your application currently only ever calls this function with small numbers ($n < 1000$) where performance is irrelevant, which implementation does YAGNI suggest you write first? How does this relate to the principle of "premature optimization"?