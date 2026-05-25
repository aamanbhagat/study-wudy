## What it is
Verification is the rigorous process of proving that a system meets its specified requirements ("Did we build the system right?"). In aerospace systems engineering, every single requirement must be closed out using one of four strictly defined methods: **Analysis** (math and simulations), **Test** (physical measurement with instrumentation), **Inspection** (visual or physical examination), or **Demonstration** (observable operation without detailed measurement). 

## Why it matters
Spacecraft are unrepairable once they leave the launch pad. You cannot swap a blown fuse in orbit. Verification is how you guarantee a multi-million dollar asset will survive the violent physics of launch and the extreme thermal/radiation environment of space. In the real world, the choice of verification method dictates the entire Assembly, Integration, and Testing (AI&T) schedule and budget. 

## When to study it
You must already understand the Systems Engineering V-Model and Requirements Engineering (specifically, how to write unambiguous "shall" statements). You also need a foundational understanding of classical mechanics, thermodynamics, and structural physics to understand *what* you are verifying. If you cannot distinguish between a requirement and a design goal, return to Phase 2 Systems Engineering.

## How to study it (step by step)
1. **Memorize the definitions:** Write down the strict engineering definitions of Analysis, Test, Inspection, and Demonstration.
2. **Understand the Cost-Rigor trade-off:** Map the four methods on a spectrum of cost and confidence. (Test is highest confidence but highest cost).
3. **Distinguish Test from Demonstration:** Spend 10 minutes defining the boundary between these two. (Hint: Instrumentation and quantitative pass/fail criteria).
4. **Draft a VCRM:** Take 3 random objects in your room. Write one requirement for each. Create a Verification Cross-Reference Matrix (VCRM) assigning A, T, I, or D to each requirement.
5. **Analyze the limits of testing:** Identify physical scenarios where testing on Earth is impossible (e.g., deploying a massive, flimsy solar sail in a $1g$ environment) and realize why Analysis becomes mandatory.

## Key ideas, with intuition

**1. The ATID Framework**
Every requirement must have a planned verification method. 
*   **Analysis:** Using mathematical models, simulations (FEA, CFD), or logical proofs. Used when testing is physically impossible, dangerous, or prohibitively expensive. 
*   **Test:** Operating the system under specified conditions, using external instrumentation to collect quantitative data, and comparing it against strict pass/fail criteria.
*   **Inspection:** Non-destructive examination using the physical senses (sight, touch) or simple tools to verify physical characteristics (e.g., dimensions, labels, part numbers, weld quality).
*   **Demonstration:** Operating the system to verify it performs a specific function, but *without* quantitative instrumentation. It is a qualitative "pass/fail" observation.

**2. Test vs. Demonstration**
If a requirement says "The rover shall drive forward," you can verify by **Demonstration**—turn it on, watch it drive forward. 
If a requirement says "The rover shall drive forward at $2.5 \pm 0.1 \text{ m/s}$," you must verify by **Test**—you need a radar gun, encoders, and a data log to prove the tolerance.

**3. The Margin of Safety (Analysis)**
When verifying structural integrity via Analysis, we do not just calculate stress; we calculate the Margin of Safety ($MS$). A positive $MS$ verifies the requirement.
$$MS = \frac{\sigma_{\text{allowable}}}{\sigma_{\text{applied}} \times FOS} - 1$$
Where $FOS$ is the Factor of Safety (e.g., $1.25$ for yield, $1.4$ for ultimate).

## Worked example

**Requirement:** *STR-045: The spacecraft primary structure shall survive a quasi-static axial launch load of $15g$ without yielding.*

Let's evaluate how to verify this, step by step.

1.  **Inspection:** Can we look at the aluminum chassis and know it will survive $15g$? No. Visuals do not reveal internal stress limits. *Discard.*
2.  **Demonstration:** Can we just "turn it on" and watch it? No, it requires a specific dynamic environment. *Discard.*
3.  **Test:** We could mount the spacecraft to a centrifuge or a shaker table, apply a $15g$ equivalent load, and use strain gauges to ensure no permanent deformation occurs. 
    *   *Pros:* Absolute physical proof. 
    *   *Cons:* Highly expensive, requires massive test facilities, risks damaging flight hardware.
4.  **Analysis:** We build a Finite Element Model (FEM) of the structure. We apply an acceleration field of $a = 15g \times 9.81 \text{ m/s}^2$. We extract the maximum Von Mises stress ($\sigma_{\text{applied}}$). We calculate the Margin of Safety using the yield strength of the material ($\sigma_{\text{allowable}}$).
    *   *Pros:* Cheap, zero risk to hardware.
    *   *Cons:* The model might be wrong (garbage in, garbage out).

**Conclusion:** In practice, aerospace engineers use **Analysis** to verify this specific requirement, but they will use a lower-level **Test** (like a modal survey or a static load test on a qualification unit) to *correlate and validate* the FEM. Once the math model is trusted, Analysis closes the requirement.

## Diagrams

The Verification Selection Decision Tree:

```text
                       [ REQUIREMENT ]
                              |
                 Is it a physical property?
                 (Color, weight, part number)
                 /                          \
              YES                            NO
              /                               \
        [ INSPECTION ]               Is it a functional action
                                     requiring exact tolerances/data?
                                     /                              \
                                   NO                               YES
                                  /                                   \
                         [ DEMONSTRATION ]                   Is it safe/possible to
                                                             replicate on Earth?
                                                             /                 \
                                                           YES                  NO
                                                           /                      \
                                                      [ TEST ]               [ ANALYSIS ]
```

## Memory technique — remember this forever

1. **The Mnemonic:** **A**stronauts **T**ake **I**nterstellar **D**ogs. 
   *   **A**nalysis (Math)
   *   **T**est (Data)
   *   **I**nspection (Look)
   *   **D**emonstration (Watch it work)
2. **The Fact to Overlearn:** *Verification* is "Did we build the thing right?" (ATID). *Validation* is "Did we build the right thing?" (Customer acceptance). Never confuse the two.
3. **Spaced-repetition schedule:** Review this matrix and the decision tree diagram at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you forget the methods, derive them from human senses and logic. How can I prove something to you? I can prove it with math (Analysis). I can measure it with tools (Test). I can look at it (Inspection). Or I can just turn it on and show you (Demonstration). There are no other ways to prove a physical fact.

## Common mistakes

*   **Confusing Test and Demonstration:** Students frequently assign "Test" to software requirements like "The GUI shall display a red warning light." That is a Demonstration. You don't need a spectrometer to measure the wavelength of the red light; you just need to see it.
*   **Over-testing:** Defaulting to "Test" for every requirement. Testing a spacecraft in a thermal vacuum chamber costs upwards of \$10,000 a day. If you can verify it by Analysis, do it.
*   **Testing Flight Hardware to Failure:** You never verify ultimate strength limits by testing the actual flight unit. You either test a dedicated "qualification unit" to failure, or you test the flight unit to a lower "acceptance" level and use Analysis to prove the rest.

## Self-check

1. A requirement states: "The flight software shall be written in C++." Which verification method is appropriate, and why?
2. A requirement states: "The antenna shall deploy completely within 30 seconds of receiving the deployment command." Is this a Test or a Demonstration? Defend your answer.
3. You are building a 10-meter wide solar sail. The requirement states it must deploy in zero gravity. You cannot achieve sustained zero gravity on Earth for the 5 minutes it takes to deploy. How do you verify this requirement, and what intermediate steps are necessary to trust your verification?