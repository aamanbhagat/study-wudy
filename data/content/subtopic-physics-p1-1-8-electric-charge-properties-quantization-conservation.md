## What it is
Electric charge is a fundamental, intrinsic property of matter that causes it to experience a force when placed in an electromagnetic field. It is the source of all electromagnetic phenomena. Just as mass is the source of the gravitational field, electric charge is the source of the electric field.

## Why it matters
Understanding charge is non-negotiable for your fields of study. In aerospace, charge buildup on spacecraft surfaces can damage electronics, while ion thrusters work by accelerating charged particles (ions) to generate thrust. In computer science, the flow of charge (current) is the basis of all modern electronics, and understanding its quantum nature is key to developing next-generation quantum computers.

## When to study it
You are ready for this topic. The only prerequisites are a conceptual understanding of the basic atomic model (protons, neutrons, electrons) and proficiency with basic algebra. We are starting from first principles.

## How to study it (step by step)
1.  **Internalize the types:** Take 10 minutes. Write down "Like charges repel, opposite charges attract." Draw diagrams of two positive charges pushing apart, and a positive and negative charge pulling together. This is the most fundamental rule.
2.  **Master quantization:** Read about the Millikan oil-drop experiment (the concept, not the full derivation). Then, solve 5 problems that require you to convert between a number of electrons/protons and total charge in Coulombs using $Q=ne$.
3.  **Grasp conservation:** Find three examples of particle interactions (e.g., pair production $\gamma \to e^- + e^+$, beta decay $n \to p^+ + e^- + \bar{\nu}_e$). For each, sum the total charge before and after the interaction to prove to yourself that it is conserved.
4.  **Compare and contrast:** Create a table comparing electric charge and mass. Include columns for: sign (positive/negative/both), conservation law, and the force it generates. This will solidify its unique properties.
5.  **Teach it back:** Explain the concepts of quantization and conservation to an imaginary student, out loud, without looking at your notes. If you get stuck, you've found a weak point.

## Key ideas, with intuition
1.  **Duality (Two Types):** Unlike mass, which is only positive and always attractive, charge comes in two types: positive and negative. This duality allows for both attraction and repulsion. Think of it as a binary property that determines the nature of the interaction. The convention is that protons are positive and electrons are negative.
    $$
    \text{Like charges repel, Opposite charges attract.}
    $$
2.  **Quantization:** Charge is not a continuous fluid. It exists in discrete, integer multiples of a fundamental unit called the elementary charge, $e$. You can have a charge of $-e$, $+2e$, or $-1000e$, but you can never have a charge of $+0.5e$ or $-\pi e$. This is a profound and non-intuitive fact about our universe, first demonstrated by Robert Millikan.
    $$
    Q = ne
    $$
    where $Q$ is the total charge, $n$ is an integer ($n \in \{\dots, -2, -1, 0, 1, 2, \dots\}$), and $e \approx 1.602 \times 10^{-19}$ Coulombs is the elementary charge.

3.  **Conservation:** The net electric charge of an isolated system is constant. You cannot create or destroy net charge. You can create a positive charge and a negative charge together (e.g., in pair production), because their sum is zero, maintaining the net charge of the system. This is one of the most fundamental conservation laws in physics, on par with the conservation of energy and momentum.
    $$
    \sum Q_{\text{initial}} = \sum Q_{\text{final}} \quad (\text{for an isolated system})
    $$

## Worked example
**Problem:** A neutral piece of amber is rubbed with fur. As a result, the amber acquires a charge of $-3.204 \text{ nC}$ (nanocoulombs). How many electrons have been transferred from the fur to the amber? What is the final charge on the fur?

**Solution:**
1.  **Identify the principle:** The charge on the amber is due to an excess of electrons. Since charge is quantized, the total charge $Q$ must be an integer multiple $n$ of the elementary charge $e$. We are looking for $n$.
    $$
    Q = ne
    $$
2.  **Isolate the variable:** We need to find the number of electrons, $n$.
    $$
    n = \frac{Q}{e}
    $$
3.  **Substitute known values:**
    -   The charge on the amber is $Q = -3.204 \text{ nC} = -3.204 \times 10^{-9} \text{ C}$.
    -   The charge of a single electron is $-e$, so we use $e = -1.602 \times 10^{-19} \text{ C}$ in our conceptual model. The formula $Q=ne$ uses the magnitude of the elementary charge, but here $Q$ is negative because electrons were gained. Let's be precise: $Q_{\text{amber}} = n \times q_{\text{electron}}$.
    $$
    n = \frac{Q_{\text{amber}}}{q_{\text{electron}}} = \frac{-3.204 \times 10^{-9} \text{ C}}{-1.602 \times 10^{-19} \text{ C}}
    $$
4.  **Calculate the result:**
    $$
    n = 2.00 \times 10^{10}
    $$
    So, $2 \times 10^{10}$ electrons were transferred to the amber. Note that $n$ is a positive integer, as it must be.

5.  **Apply conservation of charge:** The amber-fur system is isolated. Initially, both were neutral, so $Q_{\text{initial}} = 0$. After the transfer, the total charge must still be zero.
    $$
    Q_{\text{initial}} = Q_{\text{final}}
    $$
    $$
    0 = Q_{\text{amber}} + Q_{\text{fur}}
    $$
    $$
    Q_{\text{fur}} = -Q_{\text{amber}} = -(-3.204 \times 10^{-9} \text{ C}) = +3.204 \text{ nC}
    $$
    The fur has a final charge of $+3.204 \text{ nC}$.

**Reflection:** Step 1 identified quantization as the key. Step 3 required careful handling of units (nC to C) and signs. Step 5 used the conservation principle to find the state of the other part of the system without needing new calculations.

## Diagrams
Interaction between charges:

```text
      Repulsion (Like Charges)                Attraction (Opposite Charges)

      -----> F      F <-----                     F <-----       -----> F
     +--------------+                           +--------------+
     |      q1      |                           |      q1      |
     +--------------+                           +--------------+
           (+)                                        (+)


     +--------------+                           +--------------+
     |      q2      |                           |      q2      |
     +--------------+                           +--------------+
           (+)                                        (-)
      -----> F      F <-----                     F <-----       -----> F

```
The arrows `F` represent the electrostatic force vectors acting on each charge. In the repulsion case, the forces push the charges apart. In the attraction case, they pull them together.

## Memory technique — remember this forever
1.  **Story:** Imagine charge is like colored sand. There are two colors, **P**ositive Purple and **N**egative Navy. You can only move sand in tiny, identical packets (Quantization). If you have a closed box (isolated system) containing both colors, you can move them around inside, but the total net color (e.g., 10 purple packets and 10 navy packets cancel to "neutral") never changes (Conservation).

2.  **Must-know formulas:**
    *   Quantization: $Q = ne$, where $n$ is an integer and $e = 1.602 \times 10^{-19} \text{ C}$.
    *   Conservation: $\sum Q_{\text{initial}} = \sum Q_{\text{final}}$ for an isolated system.

3.  **Spaced Repetition Schedule:** Review these ideas and formulas right now. Then again in **1 day**, **3 days**, **7 days**, **16 days**, and **35 days**. Create flashcards for the two formulas.

4.  **First Principles Pathway:** These properties *are* the first principles for this topic. They are axioms derived from observation. If you forget, rebuild from the experimental facts:
    *   *Observation:* Rubbing amber with fur creates an attraction. Some things attract, some repel. -> **Conclusion:** There must be at least two types of charge.
    *   *Observation (Millikan):* The charge on oil drops is always a multiple of a smallest value. -> **Conclusion:** Charge is quantized ($Q=ne$).
    *   *Observation (Particle Physics):* In every known interaction, from chemistry to nuclear reactions, the total charge before and after is identical. -> **Conclusion:** Charge is conserved.

## Common mistakes
1.  **Sign Errors:** Forgetting that the electron's charge is negative ($-e$) and the proton's is positive ($+e$). This is the most frequent error in introductory problems. Always double-check your signs.
2.  **Continuity Assumption:** Calculating a non-integer number of elementary charges (e.g., $n=2.5$ electrons) and stating it as the answer. If you get a non-integer $n$, you have made a calculation error. $n$ must be an integer.
3.  **Ignoring the System:** Applying conservation of charge to a non-isolated system. If a charged object is connected to the ground, for example, charge is not conserved for the object alone because it's part of the larger object-ground system.

## Self-check
1.  An ion has a net charge of $+4.806 \times 10^{-19}$ C. Is it missing electrons or does it have excess protons? How many?
2.  In a nuclear reaction, a Uranium-238 nucleus ($_{92}^{238}\text{U}$, containing 92 protons) decays into a Thorium-234 nucleus ($_{90}^{234}\text{Th}$) and an alpha particle ($_{2}^{4}\text{He}$). Explicitly verify that electric charge is conserved in this decay.
3.  Two identical, isolated conducting spheres are placed near each other. Sphere A has a charge of $+6e$ and Sphere B has a charge of $-2e$. They are touched together and then separated. What is the final charge on each sphere, and why?