## What it is
Radioactive decay is the process by which an unstable atomic nucleus spontaneously loses energy by emitting radiation. The three primary types of decay are alpha ($\alpha$), beta ($\beta$), and gamma ($\gamma$), each involving the emission of a different particle or photon. These mechanisms are the nucleus's way of transitioning to a more stable, lower-energy configuration.

## Why it matters
This is not just textbook physics; it's the engine for deep space exploration. Radioisotope Thermoelectric Generators (RTGs), which power probes like Voyager and the Mars rovers, use the heat from the alpha decay of Plutonium-238 to generate electricity. Understanding these mechanisms is also fundamental to nuclear reactor design, medical imaging (like PET scans, which use beta-plus decay), and accurately dating ancient materials.

## When to study it
Before tackling decay mechanisms, you must have a firm grasp of the following:
*   **Nuclear Structure:** What protons, neutrons, and electrons are. You must be fluent in the ${}_Z^A X$ notation, where $A$ is the mass number (protons + neutrons) and $Z$ is the atomic number (protons).
*   **Isotopes:** Understanding that elements can have different numbers of neutrons.
*   **Conservation Laws:** You must be comfortable applying the conservation of mass-energy, charge, and momentum.
*   **Fundamental Forces:** A conceptual understanding of the strong nuclear force (which holds the nucleus together) and the weak nuclear force (which governs beta decay) is essential.

If any of these are weak, pause and review them. We build on them directly.

## How to study it (step by step)
1.  **Master the Notation:** Take 10 minutes. Write down five different isotopes (e.g., Carbon-14, Uranium-238, Cobalt-60) in ${}_Z^A X$ notation. For each, state the number of protons and neutrons. This must be second nature.
2.  **Derive Alpha Decay:** Start with a generic heavy nucleus ${}_Z^A X$. Assume it emits an alpha particle, which is a helium nucleus, ${}_2^4 \text{He}$. Apply the conservation of charge ($Z$) and mass number ($A$) to derive the properties of the daughter nucleus, ${}_{Z'}^{A'} Y$.
3.  **Derive Beta Decay:** This is mediated by the weak force.
    *   For **beta-minus** decay, start with a neutron converting to a proton: $n \rightarrow p^+ + e^-$. Note that charge is conserved. Write the decay for a nucleus ${}_Z^A X$ with too many neutrons. You will find a particle is missing to conserve energy and momentum; this is the electron antineutrino, $\bar{\nu}_e$.
    *   For **beta-plus** decay, do the same for a proton converting to a neutron: $p^+ \rightarrow n + e^+$. This emits a positron ($e^+$). Identify the missing particle needed for conservation: the electron neutrino, $\nu_e$.
4.  **Model Gamma Decay:** Think of this as an analogy to an electron in an atom dropping to a lower energy level and emitting a photon. A nucleus, often the product of a prior alpha or beta decay, is in an "excited state" ($X^*$). It relaxes to its ground state ($X$) by emitting a high-energy photon, a gamma ray ($\gamma$). Write the generic equation and note that $A$ and $Z$ do not change.
5.  **Compare Penetrating Power:** Draw a simple diagram showing a source emitting $\alpha$, $\beta$, and $\gamma$ radiation. Show that alpha is stopped by paper, beta by aluminum foil, and gamma requires thick lead or concrete. Relate this to the mass and charge of the emitted particles.
6.  **Solve a Decay Chain:** Take a nucleus like ${}^{238}\text{U}$ and trace its first two decay steps: an alpha decay followed by a beta-minus decay. Write the full equation for each step, identifying each daughter nuclide.

## Key ideas, with intuition
1.  **The Goal is Stability:** The entire process is driven by the nucleus seeking a more stable neutron-to-proton ratio ($N/Z$). The "valley of stability" is a region on the chart of nuclides where nuclei are stable. Decay is the process of "rolling down the hill" into this valley.
2.  **Alpha Decay is for the "Too-Heavy":** For very large nuclei ($A > 200$), the repulsive electrostatic force between many protons begins to overwhelm the short-range strong nuclear force. The most efficient way to reduce this strain is to eject a large, tightly-bound chunk: the alpha particle (${}_2^4\text{He}$). Think of it as the nucleus throwing off ballast.
    $$ {}_Z^A X \rightarrow {}_{Z-2}^{A-4} Y + {}_2^4 \alpha $$
3.  **Beta Decay Adjusts the $N/Z$ Ratio:** This is the fine-tuning mechanism.
    *   If a nucleus has too many neutrons (neutron-rich), it undergoes **beta-minus decay**. A neutron turns into a proton, emitting an electron to conserve charge. The nucleus moves towards stability by decreasing its $N/Z$ ratio.
        $$ n \rightarrow p^+ + e^- + \bar{\nu}_e \quad \implies \quad {}_Z^A X \rightarrow {}_{Z+1}^{A} Y + e^- + \bar{\nu}_e $$
    *   If a nucleus has too many protons (proton-rich), it undergoes **beta-plus decay**. A proton turns into a neutron, emitting a positron (the antimatter electron). The nucleus increases its $N/Z$ ratio.
        $$ p^+ \rightarrow n + e^+ + \nu_e \quad \implies \quad {}_Z^A X \rightarrow {}_{Z-1}^{A} Y + e^+ + \nu_e $$
4.  **Gamma Decay is the Afterglow:** Alpha and beta decays often leave the new daughter nucleus in an excited, high-energy state. To settle down, it emits a high-energy photon (a gamma ray). This doesn't change what the nucleus *is* (same $A$ and $Z$), only its energy level. It's the nuclear equivalent of a hot piece of metal glowing red.
    $$ {}_Z^A X^* \rightarrow {}_Z^A X + \gamma $$

## Worked example
**Problem:** Radium-226 (${}_{88}^{226}\text{Ra}$) is an alpha emitter. Its daughter product, Radon-222 (${}_{86}^{222}\text{Rn}$), is also radioactive and undergoes a subsequent alpha decay. Write the full nuclear equations for both steps.

**Step 1: Write the equation for the first alpha decay.**
We start with Radium-226. The decay is alpha, so the emitted particle is ${}_2^4\text{He}$.
$$ {}_{88}^{226}\text{Ra} \rightarrow {}_{Z'}^{A'} Y + {}_2^4\text{He} $$

**Step 2: Apply conservation laws to find the daughter nucleus Y.**
*   Conservation of mass number ($A$): The total number of nucleons must be the same before and after.
    $226 = A' + 4 \implies A' = 222$
*   Conservation of charge ($Z$): The total charge (number of protons) must be the same.
    $88 = Z' + 2 \implies Z' = 86$
The daughter nucleus has $A'=222$ and $Z'=86$. The element with $Z=86$ is Radon (Rn).
So, the first decay is:
$$ {}_{88}^{226}\text{Ra} \rightarrow {}_{86}^{222}\text{Rn} + {}_2^4\text{He} $$
*Reflection:* This worked because we treated the reaction like an algebraic equation, ensuring the superscripts ($A$) and subscripts ($Z$) balanced on both sides of the arrow.

**Step 3: Write the equation for the second alpha decay.**
Now, the Radon-222 nucleus decays by emitting another alpha particle.
$$ {}_{86}^{222}\text{Rn} \rightarrow {}_{Z''}^{A''} W + {}_2^4\text{He} $$

**Step 4: Apply conservation laws again.**
*   Conservation of $A$: $222 = A'' + 4 \implies A'' = 218$
*   Conservation of $Z$: $86 = Z'' + 2 \implies Z'' = 84$
The element with $Z=84$ is Polonium (Po).
So, the second decay is:
$$ {}_{86}^{222}\text{Rn} \rightarrow {}_{84}^{218}\text{Po} + {}_2^4\text{He} $$
*Reflection:* The process is identical for the second step. The key is to correctly identify the starting nucleus for each subsequent decay and consistently apply the conservation laws.

## Diagrams
This diagram shows how each decay type shifts a nucleus's position on a chart of nuclides, where the vertical axis is the proton number ($Z$) and the horizontal axis is the neutron number ($N = A - Z$).

```text
       ^
       |
     Z |                  /
(Proton|                 /
Number)|                *<---- Beta-minus decay (N--, Z++)
       |               / \
       |              /   \
       |             /     \
       |            v       \ Alpha decay (N--, Z--)
       |           /
       |          *---------> Beta-plus decay (N++, Z--)
       |
       +-------------------------------------------->
                                           N (Neutron Number)

(Gamma decay does not move the nucleus on this chart)
```

## Memory technique — remember this forever
1.  **The Story:** Imagine a large, unstable kingdom (the nucleus).
    *   **Alpha Decay:** The kingdom is too big and bloated. To restore order, it exiles a stubborn, four-person noble family (2 protons, 2 neutrons = Helium nucleus). The kingdom becomes smaller and slightly different.
    *   **Beta-Minus Decay:** The kingdom has too many peasants (neutrons) and not enough knights (protons). A peasant undergoes a magical transformation to become a knight, and a troublesome imp (electron) is banished from the kingdom to keep things balanced. The kingdom's population is the same, but it's stronger.
    *   **Gamma Decay:** After the turmoil of exiling a family or transforming a peasant, the kingdom is in an excited, chaotic state. The king gives a royal decree (gamma ray) that calms everyone down to a ground state. The kingdom itself doesn't change, it just settles down.

2.  **Must Overlearn These Formulas:**
    *   Alpha: ${}_Z^A X \rightarrow {}_{Z-2}^{A-4} Y + {}_2^4 \alpha$
    *   Beta-Minus: ${}_Z^A X \rightarrow {}_{Z+1}^{A} Y + e^- + \bar{\nu}_e$
    *   Gamma: ${}_Z^A X^* \rightarrow {}_Z^A X + \gamma$

3.  **Spaced Repetition Schedule:** Review these formulas and the "kingdom" story at these intervals:
    *   24 hours
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:** If you forget everything, rebuild from the **conservation laws**.
    *   What is an alpha particle? A Helium nucleus. It has 2 protons and 2 neutrons. So its charge is +2 and its mass number is 4. The daughter nucleus *must* have $Z-2$ and $A-4$ to balance the equation.
    *   What is beta-minus decay? A neutron becomes a proton. The total nucleon count ($A$) doesn't change. The proton count ($Z$) increases by 1. To conserve charge, a negative particle must be emitted (the electron).

## Common mistakes
1.  **Forgetting the Neutrino:** In beta decay, failing to include the antineutrino ($\bar{\nu}_e$) or neutrino ($\nu_e$) is a critical error. Without it, energy, momentum, and lepton number are not conserved.
2.  **Changing A in Beta Decay:** Beta decay converts a neutron to a proton or vice-versa. The total number of nucleons ($A$) *does not change*. Students often mistakenly decrement $A$.
3.  **Thinking Gamma Decay is Transmutation:** Gamma decay does not change the element or the isotope. ${}_{27}^{60}\text{Co}^*$ decaying to ${}_{27}^{60}\text{Co}$ is still Cobalt-60. It has only released energy.
4.  **Confusing the Positron and Proton:** A positron is $e^+$, the antimatter electron. A proton is $p^+$. They have the same charge but vastly different masses and are fundamentally different particles. Do not mix them up in decay equations.

## Self-check
1.  Write the complete and balanced nuclear equation for the beta-minus decay of Strontium-90 (${}_{38}^{90}\text{Sr}$).
2.  A sample of Thorium-230 (${}_{90}^{230}\text{Th}$) decays into a stable isotope of Lead-206 (${}_{82}^{206}\text{Pb}$). This involves a series of alpha and beta-minus decays. Determine how many of each type of decay must occur.
3.  Electron capture is another decay mode where a proton-rich nucleus captures an inner-shell electron to convert a proton into a neutron ($p^+ + e^- \rightarrow n + \nu_e$). Derive the general equation for electron capture for a nucleus ${}_Z^A X$. How does the result compare to beta-plus decay on the chart of nuclides?