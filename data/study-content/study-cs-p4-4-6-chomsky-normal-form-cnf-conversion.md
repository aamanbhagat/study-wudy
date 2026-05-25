## 1. What it is — in plain English

Imagine you're trying to build something complex, like a model airplane, using a set of instructions. If these instructions were written in a very messy, inconsistent way – sometimes telling you to attach a wing, sometimes to attach two wings and a tail at once, and sometimes just to make a part disappear – it would be incredibly hard to follow.

Chomsky Normal Form (CNF) is like taking those messy instructions (which we call a "Context-Free Grammar" or CFG) and rewriting them into a super-standardized, simplified recipe. In this standardized format, every single instruction (or "production rule") must follow one of two very strict patterns.

These patterns are:
1.  **"Make two parts from one part"**: A single component always breaks down into exactly two other components. For example, "Wing Assembly" breaks into "Left Wing" and "Right Wing".
2.  **"Make one basic piece from one part"**: A single component always turns into one fundamental, unbreakable piece. For example, "Left Wing" turns into an actual physical "left wing piece".

The goal is to make all the rules incredibly simple and consistent. This doesn't change what you can build with the instructions, just the way the instructions themselves are written. It makes it much easier for a machine (like a computer) to understand and process these rules.

## 2. Why it matters — real-world applications

Chomsky Normal Form isn't just a theoretical curiosity; it's a fundamental concept with practical implications across several domains where structured data and language processing are critical.

1.  **Compiler Design and Parsing (e.g., C++, Python, Java Compilers):**
    *   **Application:** When you write code in a programming language, a compiler needs to understand its structure (syntax) to translate it into machine code. This process is called parsing.
    *   **How CNF helps:** Many efficient parsing algorithms, like the CYK (Cocke-Younger-Kasami) algorithm, require the grammar to be in CNF. By converting a programming language's grammar into CNF, compiler writers can use these algorithms to quickly and reliably check if your code follows the language's rules and to build an internal representation (parse tree) of your program. Companies like Microsoft (for C#), Google (for Go), or Apple (for Swift) use formal grammars, and while they might not *directly* parse using CNF, the theoretical underpinnings and algorithms derived from CNF are crucial.

2.  **Natural Language Processing (NLP) and Computational Linguistics (e.g., Google Translate, Siri/Alexa):**
    *   **Application:** Understanding human language involves parsing sentences to extract their grammatical structure. This is vital for tasks like machine translation, sentiment analysis, and voice assistants.
    *   **How CNF helps:** Human languages are notoriously complex. By converting a grammar representing a subset of natural language into CNF, researchers can apply algorithms like CYK to parse sentences, identifying noun phrases, verb phrases, and other grammatical components. This helps systems like Google Translate accurately determine the grammatical relationships between words in a sentence, improving translation quality. Companies like Google, Amazon, and Apple heavily rely on robust parsing for their NLP products.

3.  **Bioinformatics (e.g., RNA Secondary Structure Prediction):**
    *   **Application:** In molecular biology, RNA molecules fold into complex 3D structures critical for their function. Predicting these "secondary structures" (patterns of base pairing) from the linear sequence of nucleotides is a major challenge.
    *   **How CNF helps:** RNA folding can be modeled using context-free grammars, where the "language" consists of valid sequences of paired bases. Grammars in CNF, combined with dynamic programming algorithms (similar to CYK), can be used to predict the most stable secondary structures by finding optimal parse trees for the RNA sequence. This is used in research at institutions like the NIH or companies developing new therapeutics, where understanding RNA structure is key.

4.  **Formal Verification and Model Checking:**
    *   **Application:** Ensuring that critical software or hardware systems behave as expected without errors or security vulnerabilities. This often involves checking if a system's behavior (represented as a sequence of states or actions) conforms to a specified property.
    *   **How CNF helps:** Properties of systems can sometimes be expressed using formal languages, and checking these properties might involve parsing the system's trace against a grammar. CNF provides a canonical form that can simplify the algorithms used in model checking tools to verify system properties, particularly when dealing with context-free properties.

## 3. Prerequisites — what you must know first

Before diving into Chomsky Normal Form conversion, you must have a solid understanding of the following concepts. If any of these are unfamiliar, pause and review them first.

*   **Formal Languages:** The mathematical study of languages, defined as sets of strings over an alphabet.
*   **Alphabets ($\Sigma$):** A finite set of symbols (e.g., $\{a, b, c\}$, $\{0, 1\}$).
*   **Strings:** A finite sequence of symbols from an alphabet (e.g., $aba$, $0011$).
*   **Languages:** A set of strings (e.g., the set of all binary strings with an equal number of 0s and 1s).
*   **Grammars:** A formal system for describing a language, consisting of a set of rules.
*   **Context-Free Grammars (CFGs):** A specific type of grammar where the left-hand side of each production rule is a single non-terminal symbol. They are defined by a 4-tuple $(V, \Sigma, P, S)$.
*   **Non-terminal Symbols (Variables, $V$):** Symbols that can be replaced by other symbols according to the production rules (e.g., $S, A, B$). They represent abstract syntactic categories.
*   **Terminal Symbols ($\Sigma$):** The actual characters that make up the strings in the language. These cannot be replaced (e.g., $a, b, 0, 1$).
*   **Production Rules ($P$):** Rules of the form $A \rightarrow \alpha$, where $A \in V$ and $\alpha \in (V \cup \Sigma)^*$.
*   **Start Symbol ($S$):** A designated non-terminal symbol from which all derivations begin.
*   **Derivations:** The process of applying production rules repeatedly to transform the start symbol into a string of terminal symbols.
*   **Parse Trees:** A graphical representation of a derivation, showing how a string is derived from the start symbol according to the grammar rules.
*   **Empty String ($\epsilon$):** A string containing no symbols. Represented as $\epsilon$ or $\lambda$.

## 4. The core idea — step by step

The core idea of Chomsky Normal Form (CNF) is to transform any given Context-Free Grammar (CFG) into an equivalent CFG where every production rule adheres to one of two simple forms:

1.  $A \rightarrow BC$: A non-terminal $A$ produces two other non-terminals $B$ and $C$.
2.  $A \rightarrow a$: A non-terminal $A$ produces a single terminal symbol $a$.

The conversion process involves a series of steps to systematically eliminate any production rules that violate these forms. The order of these steps is crucial to ensure correctness and avoid reintroducing problems that were previously fixed.

### Step 1: Eliminate $\epsilon$-productions (Null Productions)

**Plain-English Statement:** Get rid of any rule that allows a non-terminal to simply disappear (turn into nothing). For example, if 'Noun' can become nothing, we need to adjust other rules that use 'Noun' to account for its potential absence.

**Small Concrete Example:**
Given a rule $S \rightarrow AB$ and an $\epsilon$-production $A \rightarrow \epsilon$.
If $A$ can disappear, then $S \rightarrow AB$ could effectively become $S \rightarrow B$ if $A$ is replaced by $\epsilon$. So, we add $S \rightarrow B$ as a new rule.

**Formal/Mathematical Version:**
A production of the form $A \rightarrow \epsilon$ is an $\epsilon$-production.
To eliminate $\epsilon$-productions:
1.  Identify all "nullable" non-terminals. A non-terminal $A$ is nullable if $A \stackrel{*}{\Rightarrow} \epsilon$ (i.e., $A$ can derive the empty string).
    *   Initially, any $A$ with $A \rightarrow \epsilon$ is nullable.
    *   If there is a production $A \rightarrow X_1 X_2 \dots X_k$ where all $X_i$ are nullable non-terminals, then $A$ is also nullable. Repeat until no new nullable non-terminals can be found.
2.  For each production $A \rightarrow \alpha$, where $\alpha = X_1 X_2 \dots X_k$ and some $X_i$ are nullable:
    *   Create new productions by removing all possible combinations of nullable non-terminals from $\alpha$.
    *   For example, if $A \rightarrow BCD$ and $B, C$ are nullable, then new productions would include $A \rightarrow CD$, $A \rightarrow BD$, $A \rightarrow D$.
    *   **Crucially:** Do not remove all symbols from $\alpha$ unless $A$ is the start symbol and the language *must* contain $\epsilon$. If $A \rightarrow \epsilon$ was the *only* way the start symbol could derive $\epsilon$, this step will remove it. We'll handle the start symbol's $\epsilon$-production separately if needed at the end.
3.  Remove all $A \rightarrow \epsilon$ productions from $P$.

**What Could Go Wrong:**
*   Forgetting to identify all nullable non-terminals, especially those that become nullable through a chain (e.g., $A \rightarrow B$, $B \rightarrow \epsilon$).
*   Missing some of the new productions when a rule has multiple nullable non-terminals (e.g., $A \rightarrow BCD$ with $B, C$ nullable. You need $A \rightarrow CD$, $A \rightarrow BD$, $A \rightarrow BCD$, $A \rightarrow D$).
*   Incorrectly handling the start symbol's $\epsilon$-production. The standard approach is to eliminate $S \rightarrow \epsilon$ if $S$ is nullable, and then add a new start symbol $S_0$ and the rules $S_0 \rightarrow S$ and, if the original language contained $\epsilon$, $S_0 \rightarrow \epsilon$.

### Step 2: Eliminate Unit Productions

**Plain-English Statement:** Get rid of any rule where one non-terminal simply turns into another single non-terminal (e.g., "Verb Phrase" becomes "Verb"). These rules don't actually build anything; they just rename things. We want to replace them with the actual "building" rules.

**Small Concrete Example:**
Given rules $A \rightarrow B$ and $B \rightarrow a$.
Since $A$ can become $B$, and $B$ can become $a$, then $A$ can effectively become $a$. So, we add $A \rightarrow a$ and remove $A \rightarrow B$.

**Formal/Mathematical Version:**
A production of the form $A \rightarrow B$, where $A, B \in V$, is a unit production.
To eliminate unit productions:
1.  For each unit production $A \rightarrow B$:
    *   Find all productions $B \rightarrow \gamma$ (where $\gamma$ is *not* a single non-terminal, i.e., not a unit production itself, and not $\epsilon$).
    *   Add the productions $A \rightarrow \gamma$ to the grammar.
    *   Repeat this process transitively. If $A \rightarrow B$ and $B \rightarrow C$ and $C \rightarrow D$ and $D \rightarrow a$, then $A$ should eventually get $A \rightarrow a$.
2.  Remove all unit productions from $P$.

**What Could Go Wrong:**
*   Failing to handle transitive unit productions (e.g., $A \rightarrow B$, $B \rightarrow C$, $C \rightarrow D$). You must follow the chain until you reach a non-unit production or a terminal.
*   Introducing infinite loops if not careful: $A \rightarrow B, B \rightarrow A$. This implies $A$ and $B$ are equivalent. The algorithm should correctly merge their derivations.
*   Missing some productions for $A$ that $B$ could derive.

### Step 3: Eliminate Mixed Productions (Terminals mixed with Non-terminals in rules of length > 1)

**Plain-English Statement:** In rules that create more than one symbol (e.g., "Sentence" becomes "Noun Phrase" followed by "Verb"), all those symbols *must* be non-terminals. If there's a basic piece (a terminal) mixed in, we need to create a temporary non-terminal to represent that basic piece.

**Small Concrete Example:**
Given a rule $A \rightarrow aB$.
This rule has a terminal ($a$) and a non-terminal ($B$). We need to replace $a$ with a new non-terminal, say $X_a$, and add a new rule $X_a \rightarrow a$.
So, $A \rightarrow aB$ becomes $A \rightarrow X_a B$.

**Formal/Mathematical Version:**
For any production $A \rightarrow X_1 X_2 \dots X_k$ where $k > 1$:
1.  If any $X_i$ is a terminal symbol $a$:
    *   Create a new non-terminal $N_a$ (if one doesn't already exist for $a$).
    *   Add the production $N_a \rightarrow a$ to $P$.
    *   Replace all occurrences of $a$ in $A \rightarrow X_1 X_2 \dots X_k$ with $N_a$.
2.  Repeat for all such productions and terminals.

**What Could Go Wrong:**
*   Forgetting to create a new non-terminal for *every* distinct terminal that appears in a long production.
*   Applying this rule to productions of length 1 (e.g., $A \rightarrow a$). These are already in CNF and should not be modified.

### Step 4: Break Down Long Productions (Rules with more than two non-terminals)

**Plain-English Statement:** Any rule that creates more than two non-terminals (e.g., "Phrase" becomes "Article" "Adjective" "Noun") needs to be broken down into a sequence of rules that each create exactly two non-terminals.

**Small Concrete Example:**
Given a rule $A \rightarrow BCD$.
This has three non-terminals. We break it down:
$A \rightarrow BC_1$
$C_1 \rightarrow CD$
Here, $C_1$ is a new non-terminal.

**Formal/Mathematical Version:**
For any production $A \rightarrow X_1 X_2 \dots X_k$ where $k > 2$ and all $X_i \in V$:
1.  Replace the production with:
    $A \rightarrow X_1 N_1$
    $N_1 \rightarrow X_2 N_2$
    ...
    $N_{k-2} \rightarrow X_{k-1} X_k$
    where $N_1, N_2, \dots, N_{k-2}$ are new, unique non-terminal symbols.
2.  Repeat for all such productions.

**What Could Go Wrong:**
*   Incorrectly chaining the new non-terminals, especially at the end of the chain. The last new non-terminal should produce the final two non-terminals.
*   Forgetting to make new non-terminals unique for each transformation (e.g., using $N_1$ for two different long rules).

### Step 5: Handle the Start Symbol's $\epsilon$-production (if language includes $\epsilon$)

**Plain-English Statement:** The very first symbol (the Start Symbol) might be able to disappear, meaning the language it generates includes the empty string. If we removed $S \rightarrow \epsilon$ in Step 1, we need to make sure the language still contains $\epsilon$.

**Formal/Mathematical Version:**
If the original grammar $G$ generated $\epsilon$ (i.e., $S \stackrel{*}{\Rightarrow} \epsilon$), but $S \rightarrow \epsilon$ was removed in Step 1 (because $S$ was nullable), then the new grammar $G'$ will not generate $\epsilon$.
To fix this:
1.  Create a new start symbol $S_0$.
2.  Add the production $S_0 \rightarrow S$ to $P'$.
3.  If the original grammar generated $\epsilon$, also add $S_0 \rightarrow \epsilon$ to $P'$.
4.  The new start symbol for $G'$ is $S_0$.

**What Could Go Wrong:**
*   Forgetting this step entirely.
*   Adding $S_0 \rightarrow \epsilon$ when the original grammar *did not* generate $\epsilon$.

**Important Note on Order:** The order of these steps is crucial. For example, eliminating $\epsilon$-productions often creates new unit productions, so unit productions must be eliminated *after* $\epsilon$-productions. Eliminating mixed terminals and breaking long rules are independent of each other but should happen after $\epsilon$ and unit productions are gone.

## 5. Worked examples — multiple, with every step shown

### Example 1: Easy Conversion

**Problem Statement:** Convert the following Context-Free Grammar to Chomsky Normal Form.
$G = (\{S, A, B\}, \{a, b\}, P, S)$ where $P$ is:
1.  $S \rightarrow aAB$
2.  $A \rightarrow a$
3.  $B \rightarrow b$

**Given:** $V = \{S, A, B\}$, $\Sigma = \{a, b\}$, $S$ is the start symbol, $P = \{S \rightarrow aAB, A \rightarrow a, B \rightarrow b\}$.
**Want:** An equivalent grammar $G'$ in Chomsky Normal Form.

**Step-by-step transformation:**

**Initial Grammar $P_0$:**
$S \rightarrow aAB$
$A \rightarrow a$
$B \rightarrow b$

**Step 1: Eliminate $\epsilon$-productions.**
*   Are there any $\epsilon$-productions ($X \rightarrow \epsilon$)? No.
*   Therefore, no changes are made in this step.
*   **Current Productions $P_1$:**
    $S \rightarrow aAB$
    $A \rightarrow a$
    $B \rightarrow b$

**Step 2: Eliminate Unit Productions.**
*   Are there any unit productions ($X \rightarrow Y$)? No.
*   Therefore, no changes are made in this step.
*   **Current Productions $P_2$:**
    $S \rightarrow aAB$
    $A \rightarrow a$
    $B \rightarrow b$

**Step 3: Eliminate Mixed Productions (Terminals mixed with Non-terminals in rules of length > 1).**
*   Examine $S \rightarrow aAB$. This rule has a terminal 'a' mixed with non-terminals 'A' and 'B'.
    *   Create a new non-terminal for 'a', say $X_a$, and add the rule $X_a \rightarrow a$.
    *   Replace 'a' in $S \rightarrow aAB$ with $X_a$. This gives $S \rightarrow X_a AB$.
*   Rules $A \rightarrow a$ and $B \rightarrow b$ are already in CNF form $A \rightarrow a$ and don't need modification.
*   **Current Productions $P_3$:**
    $S \rightarrow X_a AB$
    $A \rightarrow a$
    $B \rightarrow b$
    $X_a \rightarrow a$

**Step 4: Break Down Long Productions (Rules with more than two non-terminals).**
*   Examine $S \rightarrow X_a AB$. This rule has three non-terminals ($X_a, A, B$). This violates CNF.
    *   Break it down by introducing a new non-terminal, say $N_1$.
    *   Replace $S \rightarrow X_a AB$ with two rules:
        $S \rightarrow X_a N_1$
        $N_1 \rightarrow AB$
*   All other rules are of length 1 or 2 and consist of only non-terminals or a single terminal.
*   **Current Productions $P_4$:**
    $S \rightarrow X_a N_1$
    $N_1 \rightarrow AB$
    $A \rightarrow a$
    $B \rightarrow b$
    $X_a \rightarrow a$

**Step 5: Handle Start Symbol's $\epsilon$-production.**
*   Did the original grammar generate $\epsilon$? No, because $S \rightarrow aAB$ and $a,b$ are terminals.
*   So, no new start symbol or $\epsilon$-production is needed. $S$ remains the start symbol.

**Final Answer:**
The grammar in Chomsky Normal Form is:
$$
\begin{align*} S &\rightarrow X_a N_1 \\ N_1 &\rightarrow AB \\ A &\rightarrow a \\ B &\rightarrow b \\ X_a &\rightarrow a \end{align*}
$$

**Reflection:** This example was straightforward because it had no $\epsilon$-productions or unit productions, simplifying the initial steps. The main work involved handling the mixed terminal/non-terminal rule and then breaking down the resulting long rule.

---

### Example 2: Medium Conversion (with $\epsilon$-productions and unit productions)

**Problem Statement:** Convert the following Context-Free Grammar to Chomsky Normal Form.
$G = (\{S, A, B, C\}, \{a, b\}, P, S)$ where $P$ is:
1.  $S \rightarrow ABC$
2.  $A \rightarrow aA | \epsilon$
3.  $B \rightarrow bB | A$
4.  $C \rightarrow c$

**Given:** $V = \{S, A, B, C\}$, $\Sigma = \{a, b, c\}$, $S$ is the start symbol, $P = \{S \rightarrow ABC, A \rightarrow aA | \epsilon, B \rightarrow bB | A, C \rightarrow c\}$.
**Want:** An equivalent grammar $G'$ in Chomsky Normal Form.

**Step-by-step transformation:**

**Initial Grammar $P_0$:**
$S \rightarrow ABC$
$A \rightarrow aA$
$A \rightarrow \epsilon$
$B \rightarrow bB$
$B \rightarrow A$
$C \rightarrow c$

**Step 1: Eliminate $\epsilon$-productions.**
*   **Identify nullable non-terminals:**
    *   $A \rightarrow \epsilon$, so $A$ is nullable.
    *   $B \rightarrow A$, and $A$ is nullable, so $B$ is nullable.
    *   $S \rightarrow ABC$. Since $A$ and $B$ are nullable, $S$ can derive $\epsilon$ (if $C$ was also nullable, which it's not). So $S$ is not nullable from this rule alone.
    *   Nullable non-terminals: $\{A, B\}$.
*   **Process productions:**
    *   $S \rightarrow ABC$:
        *   Remove $A$: $S \rightarrow BC$
        *   Remove $B$: $S \rightarrow AC$
        *   Remove $A, B$: $S \rightarrow C$
        *   (Note: $A, B$ are nullable, $C$ is not. So we don't get $S \rightarrow \epsilon$)
    *   $A \rightarrow aA$:
        *   Remove $A$: $A \rightarrow a$
    *   $B \rightarrow bB$:
        *   Remove $B$: $B \rightarrow b$
    *   $B \rightarrow A$: No change (unit production, will be handled later).
    *   $C \rightarrow c$: No change.
*   **Remove $\epsilon$-productions:** Remove $A \rightarrow \epsilon$.
*   **Current Productions $P_1$:**
    $S \rightarrow ABC \mid BC \mid AC \mid C$
    $A \rightarrow aA \mid a$
    $B \rightarrow bB \mid b$
    $B \rightarrow A$
    $C \rightarrow c$

**Step 2: Eliminate Unit Productions.**
*   **Identify unit productions:** $B \rightarrow A$.
*   **Process $B \rightarrow A$:**
    *   $A$ can derive $aA$ and $a$. So, add these to $B$.
    *   New rules for $B$: $B \rightarrow aA \mid a$.
*   **Remove unit productions:** Remove $B \rightarrow A$.
*   **Current Productions $P_2$:**
    $S \rightarrow ABC \mid BC \mid AC \mid C$
    $A \rightarrow aA \mid a$
    $B \rightarrow bB \mid b \mid aA \mid a$
    $C \rightarrow c$

**Step 3: Eliminate Mixed Productions (Terminals mixed with Non-terminals in rules of length > 1).**
*   **Identify rules with mixed terminals/non-terminals (length > 1):**
    *   $S \rightarrow ABC$ (all non-terminals, but length > 2, will be handled in Step 4)
    *   $S \rightarrow BC$ (all non-terminals, will be handled in Step 4 if needed)
    *   $S \rightarrow AC$ (all non-terminals, will be handled in Step 4 if needed)
    *   $S \rightarrow C$ (unit production, already handled)
    *   $A \rightarrow aA$: Terminal 'a' mixed with non-terminal 'A'.
        *   Create $X_a \rightarrow a$.
        *   Replace $a$ in $A \rightarrow aA$ with $X_a$: $A \rightarrow X_a A$.
    *   $A \rightarrow a$: Already in CNF form.
    *   $B \rightarrow bB$: Terminal 'b' mixed with non-terminal 'B'.
        *   Create $X_b \rightarrow b$.
        *   Replace $b$ in $B \rightarrow bB$ with $X_b$: $B \rightarrow X_b B$.
    *   $B \rightarrow b$: Already in CNF form.
    *   $B \rightarrow aA$: Terminal 'a' mixed with non-terminal 'A'.
        *   Use $X_a \rightarrow a$.
        *   Replace $a$ in $B \rightarrow aA$ with $X_a$: $B \rightarrow X_a A$.
    *   $B \rightarrow a$: Already in CNF form.
    *   $C \rightarrow c$: Already in CNF form.
*   **Current Productions $P_3$:**
    $S \rightarrow ABC \mid BC \mid AC \mid C$
    $A \rightarrow X_a A \mid a$
    $B \rightarrow X_b B \mid b \mid X_a A \mid a$
    $C \rightarrow c$
    $X_a \rightarrow a$
    $X_b \rightarrow b$

**Step 4: Break Down Long Productions (Rules with more than two non-terminals).**
*   **Identify long productions:**
    *   $S \rightarrow ABC$: Three non-terminals.
        *   Replace with: $S \rightarrow A N_1$, $N_1 \rightarrow BC$. (where $N_1$ is a new non-terminal)
    *   $S \rightarrow BC$: Already length 2, all non-terminals. OK.
    *   $S \rightarrow AC$: Already length 2, all non-terminals. OK.
    *   $S \rightarrow C$: Unit production (error in step 2, $S \rightarrow C$ should have been replaced by $S \rightarrow c$ because $C \rightarrow c$). Let's re-evaluate $S \rightarrow C$ from Step 2.
        *   Looking back at $P_1$: $S \rightarrow C$. $C \rightarrow c$. So, $S \rightarrow c$ should have been added. Let's correct this.

**Re-evaluation of Step 2 (Correction):**
*   From $P_1$: $S \rightarrow ABC \mid BC \mid AC \mid C$.
*   Unit production: $S \rightarrow C$.
    *   $C$ derives $c$. So, add $S \rightarrow c$.
*   Unit production: $B \rightarrow A$.
    *   $A$ derives $aA, a$. So, add $B \rightarrow aA, B \rightarrow a$.
*   **Corrected $P_2$:**
    $S \rightarrow ABC \mid BC \mid AC \mid c$
    $A \rightarrow aA \mid a$
    $B \rightarrow bB \mid b \mid aA \mid a$
    $C \rightarrow c$

**Re-evaluation of Step 3 (based on Corrected $P_2$):**
*   $S \rightarrow ABC$ (long)
*   $S \rightarrow BC$ (OK)
*   $S \rightarrow AC$ (OK)
*   $S \rightarrow c$ (OK)
*   $A \rightarrow aA \Rightarrow A \rightarrow X_a A$, $X_a \rightarrow a$
*   $A \rightarrow a$ (OK)
*   $B \rightarrow bB \Rightarrow B \rightarrow X_b B$, $X_b \rightarrow b$
*   $B \rightarrow b$ (OK)
*   $B \rightarrow aA \Rightarrow B \rightarrow X_a A$, $X_a \rightarrow a$ (already added)
*   $B \rightarrow a$ (OK)
*   $C \rightarrow c$ (OK)
*   **Corrected $P_3$:**
    $S \rightarrow ABC \mid BC \mid AC \mid c$
    $A \rightarrow X_a A \mid a$
    $B \rightarrow X_b B \mid b \mid X_a A \mid a$
    $C \rightarrow c$
    $X_a \rightarrow a$
    $X_b \rightarrow b$

**Back to Step 4: Break Down Long Productions.**
*   **Identify long productions:**
    *   $S \rightarrow ABC$: Three non-terminals.
        *   Replace with: $S \rightarrow A N_1$, $N_1 \rightarrow BC$.
*   All other rules are of length 1 or 2 and consist of only non-terminals or a single terminal.
*   **Current Productions $P_4$:**
    $S \rightarrow A N_1 \mid BC \mid AC \mid c$
    $N_1 \rightarrow BC$
    $A \rightarrow X_a A \mid a$
    $B \rightarrow X_b B \mid b \mid X_a A \mid a$
    $C \rightarrow c$
    $X_a \rightarrow a$
    $X_b \rightarrow b$

**Step 5: Handle Start Symbol's $\epsilon$-production.**
*   Did the original grammar generate $\epsilon$? Yes, $A \rightarrow \epsilon$ was present, and $S \rightarrow ABC$ with $A, B$ nullable means $S \stackrel{*}{\Rightarrow} C$, and $C \rightarrow c$. So $S$ cannot derive $\epsilon$.
    *   Wait, let's recheck if $S$ is nullable. $S \rightarrow ABC$. $A$ is nullable, $B$ is nullable. $C$ is not nullable. So $S$ is *not* nullable. The language $L(G)$ does *not* contain $\epsilon$.
    *   Therefore, no new start symbol or $\epsilon$-production is needed. $S$ remains the start symbol.

**Final Answer:**
The grammar in Chomsky Normal Form is:
$$
\begin{align*} S &\rightarrow A N_1 \mid BC \mid AC \mid c \\ N_1 &\rightarrow BC \\ A &\rightarrow X_a A \mid a \\ B &\rightarrow X_b B \mid b \mid X_a A \mid a \\ C &\rightarrow c \\ X_a &\rightarrow a \\ X_b &\rightarrow b \end{align*}
$$

**Reflection:** The trickiness here was primarily in Step 1 (identifying all nullable non-terminals and generating all combinations of new rules) and Step 2 (transitive closure of unit productions and ensuring all $B \rightarrow \gamma$ rules were included, not just non-unit ones). The correction in Step 2 for $S \rightarrow C$ highlights the importance of thoroughness. Also, careful re-evaluation of whether the start symbol can derive $\epsilon$ is critical.

---

### Example 3: Medium-Hard Conversion (Multiple nullable symbols, chained unit productions)

**Problem Statement:** Convert the following Context-Free Grammar to Chomsky Normal Form.
$G = (\{S, A, B, C, D\}, \{a, b\}, P, S)$ where $P$ is:
1.  $S \rightarrow AB | AC$
2.  $A \rightarrow aA | \epsilon$
3.  $B \rightarrow bB | \epsilon$
4.  $C \rightarrow D$
5.  $D \rightarrow AB | b$

**Given:** $V = \{S, A, B, C, D\}$, $\Sigma = \{a, b\}$, $S$ is the start symbol, $P$ as above.
**Want:** An equivalent grammar $G'$ in Chomsky Normal Form.

**Step-by-step transformation:**

**Initial Grammar $P_0$:**
$S \rightarrow AB$
$S \rightarrow AC$
$A \rightarrow aA$
$A \rightarrow \epsilon$
$B \rightarrow bB$
$B \rightarrow \epsilon$
$C \rightarrow D$
$D \rightarrow AB$
$D \rightarrow b$

**Step 1: Eliminate $\epsilon$-productions.**
*   **Identify nullable non-terminals:**
    *   $A \rightarrow \epsilon \Rightarrow A$ is nullable.
    *   $B \rightarrow \epsilon \Rightarrow B$ is nullable.
    *   $D \rightarrow AB$. Since $A, B$ are nullable, $D$ is nullable.
    *   $C \rightarrow D$. Since $D$ is nullable, $C$ is nullable.
    *   $S \rightarrow AB$. Since $A, B$ are nullable, $S$ is nullable.
    *   $S \rightarrow AC$. Since $A, C$ are nullable, $S$ is nullable.
    *   Nullable non-terminals: $\{A, B, C, D, S\}$. (All non-terminals are nullable in this grammar!)
*   **Process productions:**
    *   $S \rightarrow AB$: $A, B$ nullable.
        *   Keep $AB$.
        *   Remove $A$: $B$.
        *   Remove $B$: $A$.
    *   $S \rightarrow AC$: $A, C$ nullable.
        *   Keep $AC$.
        *   Remove $A$: $C$.
        *   Remove $C$: $A$.
    *   $A \rightarrow aA$: $A$ nullable.
        *   Keep $aA$.
        *   Remove $A$: $a$.
    *   $B \rightarrow bB$: $B$ nullable.
        *   Keep $bB$.
        *   Remove $B$: $b$.
    *   $C \rightarrow D$: No change (unit production).
    *   $D \rightarrow AB$: $A, B$ nullable.
        *   Keep $AB$.
        *   Remove $A$: $B$.
        *   Remove $B$: $A$.
*   **Remove $\epsilon$-productions:** Remove $A \rightarrow \epsilon$, $B \rightarrow \epsilon$.
*   **Current Productions $P_1$:**
    $S \rightarrow AB \mid B \mid A \mid AC \mid C$
    $A \rightarrow aA \mid a$
    $B \rightarrow bB \mid b$
    $C \rightarrow D$
    $D \rightarrow AB \mid B \mid A \mid b$

**Step 2: Eliminate Unit Productions.**
*   **Identify unit productions:** $S \rightarrow B$, $S \rightarrow A$, $S \rightarrow C$, $C \rightarrow D$.
*   **Process $S \rightarrow B$:** $B$ derives $bB, b$. Add $S \rightarrow bB, S \rightarrow b$.
*   **Process $S \rightarrow A$:** $A$ derives $aA, a$. Add $S \rightarrow aA, S \rightarrow a$.
*   **Process $S \rightarrow C$:** $C$ derives $D$. This is a chain!
    *   $S \rightarrow C \Rightarrow S \rightarrow D$.
    *   Now $S \rightarrow D$. $D$ derives $AB, B, A, b$. Add $S \rightarrow AB, S \rightarrow B, S \rightarrow A, S \rightarrow b$.
    *   (Note: $S \rightarrow B, S \rightarrow A$ are already handled by previous expansions, but $S \rightarrow AB$ and $S \rightarrow b$ are new from this path for $S$.)
*   **Process $C \rightarrow D$:** $D$ derives $AB, B, A, b$. Add $C \rightarrow AB, C \rightarrow B, C \rightarrow A, C \rightarrow b$.
*   **Remove unit productions:** Remove $S \rightarrow B, S \rightarrow A, S \rightarrow C, C \rightarrow D$.
*   **Current Productions $P_2$:**
    $S \rightarrow AB \mid AC \mid bB \mid b \mid aA \mid a$ (from $S \rightarrow B, S \rightarrow A$)
    $S \rightarrow AB \mid B \mid A \mid b$ (from $S \rightarrow C \Rightarrow S \rightarrow D$)
    *   Consolidating $S$: $S \rightarrow AB \mid AC \mid bB \mid b \mid aA \mid a$
    $A \rightarrow aA \mid a$
    $B \rightarrow bB \mid b$
    $C \rightarrow AB \mid B \mid A \mid b$
    $D \rightarrow AB \mid B \mid A \mid b$

**Step 3: Eliminate Mixed Productions (Terminals mixed with Non-terminals in rules of length > 1).**
*   **Identify rules with mixed terminals/non-terminals (length > 1):**
    *   $S \rightarrow bB$: Create $X_b \rightarrow b$. Replace: $S \rightarrow X_b B$.
    *   $S \rightarrow aA$: Create $X_a \rightarrow a$. Replace: $S \rightarrow X_a A$.
    *   $A \rightarrow aA$: Replace: $A \rightarrow X_a A$.
    *   $B \rightarrow bB$: Replace: $B \rightarrow X_b B$.
*   Other rules are already in CNF form ($A \rightarrow a$, $B \rightarrow b$, $S \rightarrow b$, $S \rightarrow a$, $C \rightarrow b$, $D \rightarrow b$) or are all non-terminals (to be handled in Step 4).
*   **Current Productions $P_3$:**
    $S \rightarrow AB \mid AC \mid X_b B \mid b \mid X_a A \mid a$
    $A \rightarrow X_a A \mid a$
    $B \rightarrow X_b B \mid b$
    $C \rightarrow AB \mid B \mid A \mid b$
    $D \rightarrow AB \mid B \mid A \mid b$
    $X_a \rightarrow a$
    $X_b \rightarrow b$

**Step 4: Break Down Long Productions (Rules with more than two non-terminals).**
*   **Identify long productions:** None. All rules are of length 1 (terminal) or 2 (two non-terminals).
*   For example, $S \rightarrow AB$ is length 2, $S \rightarrow AC$ is length 2. $S \rightarrow X_b B$ is length 2. All are good.
*   No changes needed.
*   **Current Productions $P_4$:** (Same as $P_3$)
    $S \rightarrow AB \mid AC \mid X_b B \mid b \mid X_a A \mid a$
    $A \rightarrow X_a A \mid a$
    $B \rightarrow X_b B \mid b$
    $C \rightarrow AB \mid B \mid A \mid b$
    $D \rightarrow AB \mid B \mid A \mid b$
    $X_a \rightarrow a$
    $X_b \rightarrow b$

**Step 5: Handle Start Symbol's $\epsilon$-production.**
*   Did the original grammar generate $\epsilon$? Yes, we found $S$ is nullable in Step 1.
*   Therefore, we need a new start symbol $S_0$.
*   Add $S_0 \rightarrow S$ and $S_0 \rightarrow \epsilon$.
*   **Final Start Symbol:** $S_0$.

**Final Answer:**
The grammar in Chomsky Normal Form is:
$$
\begin{align*} S_0 &\rightarrow S \mid \epsilon \\ S &\rightarrow AB \mid AC \mid X_b B \mid b \mid X_a A \mid a \\ A &\rightarrow X_a A \mid a \\ B &\rightarrow X_b B \mid b \\ C &\rightarrow AB \mid B \mid A \mid b \\ D &\rightarrow AB \mid B \mid A \mid b \\ X_a &\rightarrow a \\ X_b &\rightarrow b \end{align*}
$$

**Reflection:** This example was tricky due to all non-terminals being nullable, leading to many new rules in Step 1. The chained unit productions ($S \rightarrow C \rightarrow D \rightarrow \dots$) also required careful expansion in Step 2. The fact that $S$ was nullable meant Step 5 was essential to preserve the language.

---

### Example 4: Hard Conversion (A classic language $a^n b^n$)

**Problem Statement:** Convert the following Context-Free Grammar for the language $L = \{a^n b^n \mid n \ge 1\}$ to Chomsky Normal Form.
$G = (\{S\}, \{a, b\}, P, S)$ where $P$ is:
1.  $S \rightarrow aSb$
2.  $S \rightarrow ab$

**Given:** $V = \{S\}$, $\Sigma = \{a, b\}$, $S$ is the start symbol, $P = \{S \rightarrow aSb, S \rightarrow ab\}$.
**Want:** An equivalent grammar $G'$ in Chomsky Normal Form.

**Step-by-step transformation:**

**Initial Grammar $P_0$:**
$S \rightarrow aSb$
$S \rightarrow ab$

**Step 1: Eliminate $\epsilon$-productions.**
*   Are there any $\epsilon$-productions? No.
*   Is any non-terminal nullable? No, because $S$ must always produce at least one 'a' and one 'b'.
*   No changes.
*   **Current Productions $P_1$:**
    $S \rightarrow aSb$
    $S \rightarrow ab$

**Step 2: Eliminate Unit Productions.**
*   Are there any unit productions? No.
*   No changes.
*   **Current Productions $P_2$:**
    $S \rightarrow aSb$
    $S \rightarrow ab$

**Step 3: Eliminate Mixed Productions (Terminals mixed with Non-terminals in rules of length > 1).**
*   **Identify rules with mixed terminals/non-terminals (length > 1):**
    *   $S \rightarrow aSb$: Terminal 'a', Non-terminal 'S', Terminal 'b'.
        *   Create $X_a \rightarrow a$.
        *   Create $X_b \rightarrow b$.
        *   Replace: $S \rightarrow X_a S X_b$.
    *   $S \rightarrow ab$: Terminal 'a', Terminal 'b'.
        *   Use $X_a \rightarrow a$.
        *   Use $X_b \rightarrow b$.
        *   Replace: $S \rightarrow X_a X_b$.
*   **Current Productions $P_3$:**
    $S \rightarrow X_a S X_b$
    $S \rightarrow X_a X_b$
    $X_a \rightarrow a$
    $X_b \rightarrow b$

**Step 4: Break Down Long Productions (Rules with more than two non-terminals).**
*   **Identify long productions:**
    *   $S \rightarrow X_a S X_b$: This rule has three non-terminals.
        *   Break it down using a new non-terminal, say $N_1$.
        *   Replace with: $S \rightarrow X_a N_1$
        *   And: $N_1 \rightarrow S X_b$
*   $S \rightarrow X_a X_b$: This rule has two non-terminals. It's already in CNF form.
*   $X_a \rightarrow a$ and $X_b \rightarrow b$: These are already in CNF form.
*   **Current Productions $P_4$:**
    $S \rightarrow X_a N_1$
    $N_1 \rightarrow S X_b$
    $S \rightarrow X_a X_b$
    $X_a \rightarrow a$
    $X_b \rightarrow b$

**Step 5: Handle Start Symbol's $\epsilon$-production.**
*   Did the original grammar generate $\epsilon$? No, the language is $a^n b^n$ for $n \ge 1$, so it does not include $\epsilon$.
*   No new start symbol or $\epsilon$-production is needed. $S$ remains the start symbol.

**Final Answer:**
The grammar in Chomsky Normal Form is:
$$
\begin{align*} S &\rightarrow X_a N_1 \\ N_1 &\rightarrow S X_b \\ S &\rightarrow X_a X_b \\ X_a &\rightarrow a \\ X_b &\rightarrow b \end{align*}
$$

**Reflection:** This example demonstrates how a recursive grammar for a simple language like $a^n b^n$ is transformed. The crucial steps were creating new non-terminals for terminals and then breaking down the three-non-terminal rule. The language $L = \{a^n b^n \mid n \ge 0\}$ (which includes $\epsilon$) would have required Step 1 and Step 5 to handle $S \rightarrow \epsilon$.

---

## 6. Common mistakes and traps

1.  **Forgetting to identify all nullable non-terminals:** Students often miss non-terminals that become nullable through a chain (e.g., $A \rightarrow B$, $B \rightarrow C$, $C \rightarrow \epsilon$). You need to iterate until no new nullable non-terminals can be found.
2.  **Missing new productions when eliminating $\epsilon$-productions:** When a rule has multiple nullable non-terminals on its RHS (e.g., $A \rightarrow BCD$ with $B, C$ nullable), students might only generate $A \rightarrow BCD, A \rightarrow CD$, forgetting $A \rightarrow BD, A \rightarrow D$. All combinations must be considered.
3.  **Not fully resolving unit production chains:** If you have $A \rightarrow B$, $B \rightarrow C$, $C \rightarrow D$, and $D \rightarrow a$, you must eventually add $A \rightarrow a$. Just adding $A \rightarrow C$ and stopping is incorrect. The process must follow the chain until a non-unit production (or terminal) is reached.
4.  **Incorrectly breaking down long productions:** For $A \rightarrow BCD$, a common mistake is to break it as $A \rightarrow BC, C \rightarrow D$. This is wrong because $C \rightarrow D$ is a unit production. The correct way is $A \rightarrow B N_1, N_1 \rightarrow CD$. The last rule in the chain must produce exactly two non-terminals.
5.  **Confusing terminals and non-terminals when creating $X_a$ rules:** Step 3 applies only to terminals that appear *within* a production of length greater than one (e.g., $A \rightarrow aB$). It does *not* apply to productions of the form $A \rightarrow a$, which are already valid CNF rules.
6.  **Incorrectly handling the start symbol's $\epsilon$-production:** If the original grammar generated $\epsilon$ via its start symbol, and $S \rightarrow \epsilon$ was removed in Step 1, you *must* add a new start symbol $S_0$ and the rule $S_0 \rightarrow \epsilon$ (along with $S_0 \rightarrow S$) to ensure the language generated by the CNF grammar is equivalent. Forgetting this means the new grammar won't generate $\epsilon$.

## 7. Textbook-precise explanation

A Context-Free Grammar (CFG) $G = (V, \Sigma, P, S)$ is in **Chomsky Normal Form (CNF)** if every production in $P$ is of one of two forms:

1.  $A \rightarrow BC$, where $A, B, C \in V$ (i.e., $B$ and $C$ are non-terminal symbols).
2.  $A \rightarrow a$, where $A \in V$ and $a \in \Sigma$ (i.e., $a$ is a terminal symbol).

Additionally, if the language $L(G)$ generated by $G$ contains the empty string $\epsilon$, then the production $S \rightarrow \epsilon$ is allowed, but in this case, $S$ must not appear on the right-hand side of any production. If $S$ does appear on the RHS, a new start symbol $S_0$ is introduced, and the rules $S_0 \rightarrow S$ and $S_0 \rightarrow \epsilon$ are added, with $S_0$ becoming the new start symbol.

The conversion process for a general CFG $G$ into an equivalent CFG $G'$ in CNF typically follows these ordered steps:

1.  **Introduce a new start symbol ($S_0$):** If the original start symbol $S$ appears on the RHS of any production, or if $S \rightarrow \epsilon$ is a production, create a new start symbol $S_0$ and add the production $S_0 \rightarrow S$. If $S \rightarrow \epsilon$ was in $P$, add $S_0 \rightarrow \epsilon$. This ensures that the original $S$ can be treated like any other non-terminal without special constraints related to its being the start symbol. (Some texts place this step first, others implicitly handle it during $\epsilon$-elimination).
2.  **Eliminate $\epsilon$-productions:** For every $A \rightarrow \epsilon$ in $P$ (except possibly for $S_0 \rightarrow \epsilon$ if introduced in step 1):
    *   Identify all nullable non-terminals (those that can derive $\epsilon$).
    *   For each production $B \rightarrow X_1 X_2 \dots X_k$, where $X_i \in (V \cup \Sigma)$, add all productions $B \rightarrow \alpha'$ where $\alpha'$ is formed by deleting one or more nullable non-terminals from $X_1 X_2 \dots X_k$. Ensure $\alpha'$ is not $\epsilon$.
    *   Remove all $A \rightarrow \epsilon$ productions from $P$.
3.  **Eliminate unit productions:** For every $A \rightarrow B$ in $P$ (where $A, B \in V$):
    *   For all productions $B \rightarrow \gamma$ (where $\gamma$ is not a single non-terminal), add the production $A \rightarrow \gamma$.
    *   Repeat this process until no unit productions remain. This often requires a transitive closure approach, where if $A \rightarrow B$ and $B \rightarrow C$ and $C \rightarrow D \alpha$, then $A \rightarrow D \alpha$ is eventually added.
    *   Remove all $A \rightarrow B$ productions from $P$.
4.  **Eliminate terminals on the RHS of productions with length > 1:** For every production $A \rightarrow X_1 X_2 \dots X_k$ where $k > 1$ and some $X_i \in \Sigma$:
    *   For each terminal $a \in \Sigma$ appearing as $X_i$, create a new non-terminal $N_a$ (if not already created) and add the production $N_a \rightarrow a$.
    *   Replace every occurrence of $a$ in $X_1 X_2 \dots X_k$ with $N_a$.
5.  **Break up productions with RHS length > 2:** For every production $A \rightarrow X_1 X_2 \dots X_k$ where $k > 2$ and all $X_i \in V$:
    *   Replace it with $A \rightarrow X_1 N_1$, $N_1 \rightarrow X_2 N_2$, ..., $N_{k-2} \rightarrow X_{k-1} X_k$, where $N_1, \dots, N_{k-2}$ are new, unique non-terminal symbols.

This systematic conversion ensures that the resulting grammar $G'$ generates the same language as $G$, except possibly for the empty string $\epsilon$ if $S \rightarrow \epsilon$ was originally present and not explicitly handled by a new start symbol. The common convention is that $L(G') = L(G) - \{\epsilon\}$ if $S \rightarrow \epsilon$ is removed and $S$ is not the start symbol of $G'$, otherwise $L(G') = L(G)$. The $S_0$ step addresses this precisely.

**References:**
*   Sipser, M. (2012). *Introduction to the Theory of Computation* (3rd ed.). Cengage Learning. (Chapter 2, Section 2.1, "Chomsky Normal Form")
*   Hopcroft, J. E., Motwani, R., & Ullman, J. D. (2006). *Introduction to Automata Theory, Languages, and Computation* (3rd ed.). Pearson. (Chapter 7, Section 7.1, "Simplification of CFGs")

## 8. ASCII diagrams

Here's an ASCII diagram illustrating how a production rule with more than two symbols on the right-hand side (RHS) is broken down into CNF.

```text
Original Production Rule:
A -> B C D E

This rule has 4 non-terminals on the RHS.
CNF requires at most 2 non-terminals on the RHS.

Step-by-step breakdown using new non-terminals:

1.  Introduce a new non-terminal, say N1, to represent C D E.
    The rule A -> B C D E becomes:
    A -> B N1
    N1 -> C D E

    Visualizing the first split:
          A
         / \
        B   N1
            /|\
           C D E  (N1 still has > 2 symbols on RHS)

2.  Now, N1 -> C D E still has 3 non-terminals.
    Introduce another new non-terminal, say N2, to represent D E.
    The rule N1 -> C D E becomes:
    N1 -> C N2
    N2 -> D E

    Visualizing the second split:
          A
         / \
        B   N1
           /  \
          C    N2
              /  \
             D    E

All resulting production rules are now in CNF:
A  -> B N1  (Form: A -> BC)
N1 -> C N2  (Form: A -> BC)
N2 -> D E   (Form: A -> BC)

Each rule has exactly two non-terminals on the RHS.
If any of B, C, D, E were terminals, they would have been replaced by new non-terminals
in an earlier step (Step 3).
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    Remember the acronym **"E.U.T.L.S."** (or "EULT" if S is handled as part of E):
    *   **E**psilon ($\epsilon$): Eliminate $\epsilon$-productions. (Make sure nothing disappears without a trace.)
    *   **U**nit: Eliminate Unit productions. (No 'renaming' rules allowed.)
    *   **T**erminals (in long rules): Eliminate Terminals mixed with non-terminals in rules of length > 1. (Terminals only allowed alone, or as part of a single $A \rightarrow a$ rule.)
    *   **L**ong: Break down Long productions (RHS has > 2 symbols). (Keep rules short and sweet: max 2 non-terminals.)
    *   **S**tart Symbol: Handle the Start Symbol's $\epsilon$-production if the language contains $\epsilon$. (Special care for the very beginning.)

    Visualize a factory assembly line:
    *   **Epsilon**: No parts just vanish! If a part can vanish, adjust the instructions for assemblies using it.
    *   **Unit**: No "part $A$ becomes part $B$" instructions. If $A$ becomes $B$, then $A$ simply does whatever $B$ does directly.
    *   **Terminals**: Basic pieces (terminals) can only be made directly from a single instruction. If a basic piece is part of a larger assembly, give it a temporary "sub-assembly name" (new non-terminal).
    *   **Long**: No instruction should make more than two sub-assemblies at once. Break complex assemblies into binary steps.
    *   **Start Symbol**: The very first instruction can make nothing (epsilon) only if explicitly allowed and handled carefully by a new 'master' instruction.

2.  **1-3 Formulas/Facts They MUST Overlearn:**
    *   **CNF Rule Forms:** $A \rightarrow BC$ or $A \rightarrow a$. (This is the target!)
    *   **Order of Steps:** Epsilon $\rightarrow$ Unit $\rightarrow$ Terminals $\rightarrow$ Long $\rightarrow$ Start Symbol (E.U.T.L.S.). The order is critical.
    *   **Language Equivalence:** The converted grammar generates the *same language* as the original grammar (except possibly for $\epsilon$ if not handled by $S_0$).

3.  **Spaced-Repetition Schedule:**
    *   **Review 1:** Immediately after completing this lesson. Try to convert a new grammar.
    *   **Review 2:** In 3 days. Re-derive the E.U.T.L.S. steps from memory.
    *   **Review 3:** In 7 days. Work through a hard example from scratch, explaining each step.
    *   **Review 4:** In 16 days. Explain the "why" behind each step of the conversion process.
    *   **Review 5:** In 35 days. Explain the real-world applications and how CNF simplifies algorithms like CYK.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the exact steps, always go back to the definition of CNF:
    *   "What makes a rule *not* in CNF?"
        1.  **$A \rightarrow \epsilon$**: This is not $A \rightarrow BC$ or $A \rightarrow a$. How to fix it? If $A$ can disappear, then any rule using $A$ might effectively be shorter. So, create new rules that reflect $A$'s absence.
        2.  **$A \rightarrow B$ (unit production)**: This is not $A \rightarrow BC$ or $A \rightarrow a$. How to fix it? If $A$ just becomes $B$, then $A$ should just become whatever $B$ becomes. Substitute $B$'s derivations into $A$.
        3.  **$A \rightarrow aB$ or $A \rightarrow Ba$ or $A \rightarrow ab$ (mixed terminals/non-terminals or multiple terminals)**: This is not $A \rightarrow BC$ (because of terminals) and not $A \rightarrow a$ (because of length > 1). How to fix it? Terminals only belong alone. So, for any terminal in a longer rule, create a new non-terminal to represent it, e.g., $X_a \rightarrow a$.
        4.  **$A \rightarrow BCD$ (too long)**: This is not $A \rightarrow BC$ or $A \rightarrow a$. How to fix it? Break it down. $A \rightarrow B N_1$, $N_1 \rightarrow CD$. Use new non-terminals to keep each rule binary.
    *   "What about the start symbol?" If $S \rightarrow \epsilon$ was allowed, and you removed it, the language might change. Create a new $S_0$ to preserve $\epsilon$ if needed.
    *   "What order should I do these in?" Think about dependencies. Removing $\epsilon$-productions can create unit productions, so $\epsilon$ first. Unit productions can simplify rules that might otherwise be long, so unit next. Then handle terminals and long rules. The order E.U.T.L.S. naturally emerges from fixing the most fundamental violations first.

## 10. Connections — what this leads to

Chomsky Normal Form is a foundational concept in formal language theory and has direct implications for several advanced topics:

*   **CYK Algorithm (Cocke-Younger-Kasami Algorithm):** This is the most direct and important consequence. The CYK algorithm is a dynamic programming algorithm for parsing context-free languages. It *requires* the input grammar to be in Chomsky Normal Form to work efficiently. It determines whether a given string can be generated by a CFG and, if so, constructs a parse tree for it. This algorithm is widely used in computational linguistics and bioinformatics.
*   **Equivalence of CFGs and Pushdown Automata (PDAs):** The ability to convert any CFG to CNF is a crucial step in proving