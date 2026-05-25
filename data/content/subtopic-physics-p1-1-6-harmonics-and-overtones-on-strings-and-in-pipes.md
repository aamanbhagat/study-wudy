## What it is
Harmonics are the set of frequencies at which a system, like a string or a column of air, naturally vibrates. The lowest frequency is the fundamental ($n=1$), and all other harmonics are integer multiples of this fundamental frequency ($f_n = n f_1$). Overtones are all frequencies produced by the system *higher* than the fundamental; the first overtone is the second harmonic, the second overtone is the third harmonic, and so on.

## Why it matters
This concept is the foundation of resonance, a critical phenomenon in engineering and physics. In aerospace, understanding the harmonic frequencies of structures like wings or turbine blades is essential to prevent catastrophic failure from resonant vibrations (flutter). In computer science, the principle that any complex wave can be decomposed into a sum of simple harmonics is the basis of the Fourier Transform, a cornerstone of signal processing, data compression, and machine learning models that analyze frequency data.

## When to study it
You must have a firm grasp of **standing waves**, including the definitions of **nodes** (points of zero amplitude) and **antinodes** (points of maximum amplitude). You should also be fluent with the universal wave relationship, $v = f\lambda$, where $v$ is wave speed, $f$ is frequency, and $\lambda$ is wavelength. Finally, you need to understand **boundary conditions**—how the physical constraints at the ends of a system dictate the wave's shape.

## How to study it (step by step)
1.  **Derive for a String:** Take a string of length $L$ fixed at both ends. Draw the simplest possible standing wave (the fundamental). Then draw the next two simplest waves. For each drawing, determine the relationship between the string length $L$ and the wavelength $\lambda$.
2.  **Find String Frequencies:** For each case in step 1, use the relationship $f = v/\lambda$ to express the frequency $f$ in terms of $L$, $v$, and an integer $n$. This will give you the formula for harmonics on a string.
3.  **Derive for an Open-Open Pipe:** A pipe open at both ends has antinodes at the ends. Realize that the mathematical constraint (integer number of half-wavelengths fitting in length $L$) is identical to the string fixed at both ends. Conclude that the frequency formula is the same.
4.  **Derive for a Closed-Open Pipe:** Take a pipe of length $L$ closed at one end and open at the other. The closed end must be a node, and the open end must be an antinode. Draw the first three possible standing waves that satisfy this.
5.  **Find Closed-Open Pipe Frequencies:** For each case in step 4, relate $L$ to $\lambda$. You will find that only an odd number of quarter-wavelengths can fit. Use $f = v/\lambda$ to derive the frequency formula and note that only odd harmonics exist.
6.  **Distinguish Terminology:** Solve a few problems that explicitly use the word "overtone". For example, "Find the frequency of the third overtone." Your task is to correctly map this to the corresponding harmonic number ($n$) for both open and closed systems.

## Key ideas, with intuition
1.  **Boundary Conditions are King.** The entire analysis rests on one idea: the ends of the system dictate the wave's shape. A fixed string end or a closed pipe end cannot move, so it must be a **node**. An open pipe end is free to oscillate with maximum amplitude, so it must be an **antinode**.
2.  **The System's Length Must "Fit" an Integer Number of Wave Segments.** The wave must fit perfectly within the length $L$.
    -   For strings (node-node) and open-open pipes (antinode-antinode), the wave must fit an integer number of half-wavelengths:
        $$L = n \frac{\lambda_n}{2} \quad \text{for } n = 1, 2, 3, ...$$
    -   For a closed-open pipe (node-antinode), the wave must fit an odd number of quarter-wavelengths:
        $$L = n \frac{\lambda_n}{4} \quad \text{for } n = 1, 3, 5, ...$$
3.  **Frequency Follows Wavelength.** The wave speed $v$ is fixed by the medium (string tension/density or air temperature). Since we know the allowed wavelengths $\lambda_n$ from the geometry, the allowed frequencies $f_n$ are directly determined by the wave equation:
    $$f_n = \frac{v}{\lambda_n}$$
    Substituting the relations for $\lambda_n$ from the "fit" conditions above gives the two key formulas for harmonic frequencies.

## Worked example
**Problem:** An organ pipe is 0.68 m long and closed at one end. The speed of sound in the air inside is 340 m/s. What is the frequency of the second overtone this pipe can produce?

**Solution:**
1.  **Identify the system and boundary conditions.** The system is a pipe closed at one end and open at the other. This means we have a node at the closed end and an antinode at the open end. This system only supports odd harmonics.

2.  **Translate "overtone" to "harmonic number" ($n$).**
    -   The fundamental frequency is the 1st harmonic ($n=1$).
    -   The first overtone is the next possible frequency, which is the 3rd harmonic ($n=3$).
    -   The second overtone is the next one after that, which is the 5th harmonic ($n=5$).
    So, we need to find the frequency for $n=5$.

3.  **Establish the length-wavelength relationship.** For a closed-open pipe, the length must contain an odd number of quarter-wavelengths:
    $$L = n \frac{\lambda_n}{4}, \quad \text{where } n = 1, 3, 5, ...$$

4.  **Solve for the specific wavelength $\lambda_5$.**
    $$L = 5 \frac{\lambda_5}{4} \implies \lambda_5 = \frac{4L}{5}$$
    $$\lambda_5 = \frac{4 \times 0.68 \text{ m}}{5} = 0.544 \text{ m}$$

5.  **Calculate the frequency using the wave speed.**
    $$f_n = \frac{v}{\lambda_n}$$
    $$f_5 = \frac{v}{\lambda_5} = \frac{340 \text{ m/s}}{0.544 \text{ m}} = 625 \text{ Hz}$$

**Reflection:** Each step was necessary. Step 1 identified the correct physical model. Step 2 was a crucial translation of terminology; confusing overtone and harmonic number is a common failure mode. Steps 3-5 are the mechanical application of the first principles: relating geometry ($L$) to wavelength ($\lambda$) and then wavelength to frequency ($f$) via the constant wave speed ($v$).

## Diagrams
Here are the first three harmonics for a string fixed at both ends (nodes at x=0 and x=L).

```text
n=1 (Fundamental):
  x=0 +-----------------+ x=L
      |        ^        |
      |       / \       |
      |      /   \      |
      |     /     \     |
      +----'-------'----+
      |   /         \   |
      |  /           \  |
      | v             v |
      +-----------------+
      L = (1/2)λ

n=2 (1st Overtone):
  x=0 +--------+--------+ x=L
      |   ^    |    ^   |
      |  / \   |   / \  |
      | /   \  |  /   \ |
      +/-----\-+-/-----\+
      |\     / | \     /|
      | \   /  |  \   / |
      |  v v   |   v v  |
      +--------+--------+
      L = (2/2)λ = λ

n=3 (2nd Overtone):
  x=0 +-----+-----+-----+ x=L
      | ^   | ^   | ^   |
      |/ \  |/ \  |/ \  |
      +-\-+-+-\-+-+-\-+
      | / | | / | | / |
      |v v  |v v  |v v  |
      +-----+-----+-----+
      L = (3/2)λ
```

Here are the first three allowed harmonics for a pipe closed at one end (node at x=0) and open at the other (antinode at x=L). Note only odd harmonics appear.

```text
n=1 (Fundamental):
  x=0 +--^--+ x=L
      | /   |
      |/    |
      +     |
      |\    |
      | \   |
      +--v--+
      L = (1/4)λ

n=3 (1st Overtone):
  x=0 +--^--+--^--+ x=L
      | /   | /   |
      |/    |/    |
      +-----+-    |
      |\    |\    |
      | \   | \   |
      +--v--+--v--+
      L = (3/4)λ

n=5 (2nd Overtone):
  x=0 +--^--+--^--+--^--+ x=L
      | /   | /   | /   |
      |/    |/    |/    |
      +-----+-    +-    |
      |\    |\    |\    |
      | \   | \   | \   |
      +--v--+--v--+--v--+
      L = (5/4)λ
```

## Memory technique — remember this forever
1.  **Mnemonic:** "Strings and Open pipes are **S-O-S**... **S**ame **O**ld **S**tory. Closed pipes are just **O**dd." This reminds you that the formulas for strings and open-open pipes are identical (all harmonics present), while closed-open pipes are the odd ones out (only odd harmonics).
2.  **Formulas to overlearn:**
    -   String fixed at both ends / Pipe open at both ends:
        $$f_n = n \frac{v}{2L}, \quad n = 1, 2, 3, ...$$
    -   Pipe closed at one end / open at the other:
        $$f_n = n \frac{v}{4L}, \quad n = 1, 3, 5, ...$$
3.  **Spaced Repetition Schedule:** Review these formulas and their derivations at **1 day, 3 days, 7 days, 16 days, and 35 days**. Do not just read them. Re-derive them from a blank sheet each time.
4.  **First Principles Pathway:** If you forget the formulas, you can always rebuild them.
    -   **Step A:** Identify boundary conditions (Node or Antinode at each end?).
    -   **Step B:** Draw the simplest wave pattern that fits these conditions.
    -   **Step C:** Relate the system length $L$ to the wavelength $\lambda$.
    -   **Step D:** Substitute $\lambda$ into the universal wave equation $f = v/\lambda$.

## Common mistakes
1.  **Overtone vs. Harmonic Confusion:** Stating that the "second overtone" is $n=2$. It is not. For a string/open pipe, it's $n=3$. For a closed pipe, it's $n=5$. Always map overtone number to harmonic number first.
2.  **Using the Wrong Denominator:** Applying the $v/2L$ formula to a closed pipe, or the $v/4L$ formula to a string. The denominator ($2$ or $4$) comes directly from the boundary conditions (half-wavelength segments vs. quarter-wavelength segments).
3.  **Forgetting "Odd Only":** Calculating an even harmonic ($n=2, 4, 6, ...$) for a pipe closed at one end. These frequencies are physically impossible for that system because a standing wave cannot form.
4.  **Node/Antinode Mix-up:** Assuming a closed end of a pipe is an antinode. A closed end is a hard boundary where air molecules cannot have displacement; it must be a displacement node.

## Self-check
1.  A 1.5 m long guitar string has a wave speed of 180 m/s. What is its fundamental frequency of vibration?
2.  A flute is an open-open pipe 0.60 m long. A clarinet is a closed-open pipe 0.60 m long. Find the frequency of the first overtone for both instruments. (Use $v_{sound} = 343$ m/s).
3.  A string and a closed-open pipe are constructed to have the same fundamental frequency. If the length of the string is $L_s$ and the length of the pipe is $L_p$, what is the ratio $L_s/L_p$?