## What it is
The Maxwell relations are a set of equations in thermodynamics derived from the symmetry of second derivatives. They equate changes in one pair of thermodynamic variables to changes in another pair, providing powerful connections between quantities like temperature, pressure, volume, and entropy. Essentially, they transform abstract quantities (like entropy) into measurable ones (like pressure and temperature).

## Why it matters
These relations are indispensable for practical engineering and theoretical physics. In rocket science, they allow you to calculate the change in temperature of a gas during a rapid (isentropic) expansion in a nozzle using only pressure and volume data, which are directly measurable. In materials science, they are used to understand properties like thermal expansion and compressibility from fundamental principles.

## When to study it
Before tackling this, you must have a firm grasp of the following:
1.  **First and Second Laws of Thermodynamics:** The concepts of internal energy ($U$), entropy ($S$), and the fundamental thermodynamic relation ($dU = TdS - PdV$).
2.  **Thermodynamic Potentials:** The definitions and physical interpretations of Internal Energy ($U$), Enthalpy ($H$), Helmholtz Free Energy ($F$), and Gibbs Free Energy ($G$).
3.  **Multivariable Calculus:** Specifically, total and partial derivatives, and Clairaut's Theorem on the equality of mixed partial derivatives for well-behaved functions.

If you are not confident with exact differentials and Legendre transforms, review them first. This derivation depends entirely on them.

## How to study it (step by step)
1.  **Master the Foundation:** Write down the definition of an exact differential for a function $f(x, y)$: $df = M(x,y)dx + N(x,y)dy$. Review why for an exact differential, Clairaut's Theorem implies $(\frac{\partial M}{\partial y})_x = (\frac{\partial N}{\partial x})_y$. This is the mathematical key.
2.  **Derive from Internal Energy (U):** Start with the fundamental relation $dU = TdS - PdV$. Identify $M$ and $N$, and their corresponding variables. Apply the exactness condition from step 1 to derive the first Maxwell relation.
3.  **Legendre Transforms:** Starting from $U$, perform the three necessary Legendre transforms to find the differentials for Enthalpy ($H = U + PV$), Helmholtz Free Energy ($F = U - TS$), and Gibbs Free Energy ($G = H - TS$). Do not just write them down; derive $dH$, $dF$, and $dG$ from $dU$.
4.  **Derive the Remaining Three:** Apply the exactness condition (Clairaut's Theorem) to the differentials $dH$, $dF$, and $dG$ one by one. This will yield the other three Maxwell relations.
5.  **Consolidate and Connect:** Create a table with four rows (one for each potential) and three columns: Potential Differential, Natural Variables, and the resulting Maxwell Relation. Observe the pattern.
6.  **Solve a "Substitution" Problem:** Find a problem where a thermodynamic derivative involving entropy (e.g., $(\partial S / \partial P)_T$) is needed. Use the appropriate Maxwell relation to substitute it with a derivative involving only $P, V, T$.

## Key ideas, with intuition
1.  **Potentials are State Functions:** The value of a thermodynamic potential like internal energy ($U$) depends only on the current state of the system (e.g., its entropy $S$ and volume $V$), not the path taken to get there. Mathematically, this means their differentials are *exact*. This is the physical justification for applying the math of exact differentials.
2.  **Clairaut's Theorem is the Engine:** The entire derivation rests on the fact that for any well-behaved function $f(x,y)$, the order of differentiation doesn't matter.
    $$ \frac{\partial}{\partial y}\left(\frac{\partial f}{\partial x}\right)_y = \frac{\partial}{\partial x}\left(\frac{\partial f}{\partial y}\right)_x $$
    Since the potentials are state functions, this property must hold. The Maxwell relations are simply the physical expression of this mathematical fact.
3.  **Legendre Transforms Choose Your Viewpoint:** We don't always control entropy and volume in an experiment. More often, we control temperature and pressure. The Legendre transform is a mathematical tool to create new potentials ($H, F, G$) that are most naturally expressed in terms of the variables we can actually control. Each new potential gives us a new "view" of the system and, through Clairaut's theorem, a new Maxwell relation.

## Worked example
Let's derive the Maxwell relation from the Helmholtz Free Energy, $F$.

**Step 1: Define the potential and its differential.**
The Helmholtz Free Energy is defined as $F = U - TS$. We need its differential, $dF$. Using the product rule and the fundamental relation $dU = TdS - PdV$:
$$ dF = dU - d(TS) $$
$$ dF = (TdS - PdV) - (TdS + SdT) $$
$$ dF = -SdT - PdV $$
This is the fundamental relation for Helmholtz energy. Its natural variables are temperature ($T$) and volume ($V$).

**Step 2: Identify the components for Clairaut's Theorem.**
Our differential is in the form $df = Mdx + Ndy$, where $f=F$, $x=T$, and $y=V$.
By comparison:
$$ M = \left(\frac{\partial F}{\partial T}\right)_V = -S $$
$$ N = \left(\frac{\partial F}{\partial V}\right)_T = -P $$

**Step 3: Apply Clairaut's Theorem.**
The theorem states $(\frac{\partial M}{\partial y})_x = (\frac{\partial N}{\partial x})_y$. Let's substitute our terms:
$$ \left(\frac{\partial (-S)}{\partial V}\right)_T = \left(\frac{\partial (-P)}{\partial T}\right)_V $$

**Step 4: Simplify to get the Maxwell Relation.**
The negative signs cancel, yielding the final relation:
$$ \left(\frac{\partial S}{\partial V}\right)_T = \left(\frac{\partial P}{\partial T}\right)_V $$

**Reflection:** This worked because $F$ is a state function, making $dF$ an exact differential. This allowed us to apply Clairaut's theorem. The result is powerful: it tells us that how entropy changes with volume in an isothermal process is exactly equal to how pressure changes with temperature in an isochoric (constant volume) process. The left side is hard to measure; the right side is easy.

## Diagrams
The Thermodynamic Square (or Born Square) is a powerful mnemonic device for recalling both the potentials and the Maxwell relations.

```text
      V (Volume)
      ^
      |
  F ----- G
  |       |
  |       |
  U ----- H
      |
      v
      S (Entropy)

<---- T (Temperature) ---->
P (Pressure)
```

**How to read it:**
*   **Potentials:** Are in the middle, in alphabetical order clockwise from the bottom left if you read "U H G F".
*   **Natural Variables:** The natural variables for each potential are its neighbors. For $U$, they are $S$ and $V$. For $G$, they are $T$ and $P$.
*   **Differentials:** To find the differential (e.g., $dU$), start at $U$. Its neighbors are $S$ and $V$, so the terms are $dS$ and $dV$. The coefficient for each is the variable *diagonally opposite*. For $dS$, the opposite is $T$. For $dV$, the opposite is $P$. The sign is determined by the arrow: if you move *away* from the coefficient (e.g., from $T$ to get to $dS$), the sign is positive. If you move *towards* it (e.g., from $P$ to get to $dV$), it's negative. So, $dU = TdS - PdV$.
*   **Maxwell Relations:** Form an 'H' shape on its side. The partial derivative of the top-left corner with respect to the bottom-left corner equals the partial derivative of the top-right with respect to the bottom-right. For the corners V, S, T, P: $(\partial V / \partial S)_P = (\partial T / \partial P)_S$. Signs are positive if arrows point the same way, negative if opposite.

## Memory technique — remember this forever
1.  **Mnemonic:** The Thermodynamic Square. A common phrase is "**G**ood **P**hysicists **H**ave **S**tudied **U**nder **V**ery **F**ine **T**eachers". Arrange the letters clockwise around the square starting from the top: G, P, H, S, U, V, F, T. This builds the diagram above.
2.  **Overlearn these formulas:** Don't just paraphrase; burn these into memory. They are the source of everything else.
    $$ dU = TdS - PdV $$
    $$ dH = TdS + VdP $$
    $$ dF = -SdT - PdV $$
    $$ dG = -SdT + VdP $$
3.  **Spaced Repetition Schedule:** Re-derive all four Maxwell relations from these potentials on this schedule:
    *   In 24 hours.
    *   In 3 days.
    *   In 7 days.
    *   In 16 days.
    *   In 35 days.
    The goal is not to memorize the final relations, but to make the derivation process automatic.
4.  **First Principles Pathway:** If you forget everything, rebuild it.
    *   Start with the combined first and second laws: $dU = TdS - PdV$.
    *   Define $H=U+PV$, $F=U-TS$, $G=U+PV-TS$.
    *   Calculate the total differentials $dH, dF, dG$.
    *   Apply Clairaut's theorem $(\frac{\partial M}{\partial y})_x = (\frac{\partial N}{\partial x})_y$ to each of the four exact differentials.

## Common mistakes
1.  **Sign Errors:** The most common mistake. A negative sign dropped from $dF = -SdT - PdV$ will flip the sign of the final Maxwell relation. Use the Thermodynamic Square to double-check your signs.
2.  **Incorrect Constant Variable:** Writing $(\partial S/\partial V)_P$ when it should be $(\partial S/\partial V)_T$. The variable held constant is always the *other* natural variable for that potential. For $F(T,V)$, derivatives are taken with either $T$ or $V$ held constant.
3.  **Confusing Potentials:** Applying the derivative rule to the wrong potential, e.g., trying to derive a relation from $dU(T,P)$. The relations only emerge when potentials are expressed in their natural variables.

## Self-check
1.  Write the differential for Enthalpy, $dH$, and identify its natural variables.
2.  From the Helmholtz free energy $F(T,V)$, we derived $(\frac{\partial S}{\partial V})_T = (\frac{\partial P}{\partial T})_V$. Now, derive the analogous relation that comes from the Gibbs free energy, $G(T,P)$.
3.  For an ideal gas, $P=\frac{nRT}{V}$. Show explicitly that $(\frac{\partial P}{\partial T})_V = (\frac{\partial S}{\partial V})_T$ holds for this system by first calculating the left-hand side, and then using the Sackur-Tetrode equation for entropy $S(U,V,N)$ to calculate the right-hand side. Does your result make physical sense?