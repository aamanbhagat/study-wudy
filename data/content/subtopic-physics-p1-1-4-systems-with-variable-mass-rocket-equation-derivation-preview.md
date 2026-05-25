## What it is
A system with variable mass is a physical system whose total mass changes over time because mass is either entering or leaving it. The classic example is a rocket, which accelerates by ejecting burnt fuel, thus decreasing its own mass. We analyze these systems by applying the principle of conservation of momentum to a larger, isolated system that includes both the main body and the mass being ejected or accreted.

## Why it matters
This concept is the absolute foundation of rocketry; without it, there is no spaceflight. The Tsiolkovsky rocket equation, which we will derive fully later, dictates the maximum velocity change ($\Delta v$) a rocket can achieve and is the central formula in mission design. Understanding this also provides a more general and powerful view of Newton's Second Law, applicable to problems like conveyor belts being loaded with material or comets gathering mass as they travel through dust clouds.

## When to study it
Before tackling this, you must have a firm grasp of the following prerequisites. If any of these are weak, review them first.
*   **Newton's Laws of Motion:** Specifically the Second Law in its general form ($F_{ext} = \frac{dp}{dt}$) and the Third Law (action-reaction pairs).
*   **Linear Momentum:** The definition ($p = mv$) and the principle of conservation of linear momentum for an isolated system ($\sum p_i = \sum p_f$).
*   **Calculus:** Basic differentiation and the concept of infinitesimals ($dt$, $dm$, $dv$).

## How to study it (step by step)
1.  **Isolate the System:** Start by drawing two diagrams: the system at time $t$ and the same system at an infinitesimally later time $t+dt$. The key is to define your *isolated* system as "the rocket plus the fuel it is about to eject."
2.  **Write Initial Momentum:** At time $t$, the rocket has mass $M$ and velocity $v$. The total momentum of your isolated system is simply $p(t) = Mv$.
3.  **Write Final Momentum:** At time $t+dt$, the rocket's mass is now $M+dM$ (where $dM$ will be a negative quantity) and its velocity is $v+dv$. The ejected fuel has mass $-dM$ and a velocity we must carefully define relative to our inertial frame.
4.  **Handle Relative Velocity:** The exhaust is ejected with velocity $v_{ex}$ *relative to the rocket*. An observer on the ground sees the exhaust moving at velocity $v_{exhaust} = v - v_{ex}$ (assuming the rocket moves in the positive direction). The momentum of the exhaust is therefore $(-dM)(v-v_{ex})$.
5.  **Apply Conservation of Momentum:** For an isolated system with no external forces, $p(t) = p(t+dt)$. Set your expressions from steps 2 and 3 equal.
6.  **Simplify and Solve:** Expand the terms, cancel where possible, and discard any "second-order" infinitesimal terms (like $dM \cdot dv$, which is negligibly small). The resulting expression will be the foundation of the rocket equation.

## Key ideas, with intuition
1.  **The System is Everything:** You cannot analyze the rocket alone. The rocket accelerates because it pushes on the exhaust, and the exhaust pushes back on it (Newton's Third Law). To use conservation of momentum, your system must contain both parts: the rocket *and* the ejected fuel. This combined system is isolated, even if the rocket itself is not.

2.  **Momentum is Traded:** The rocket gains forward momentum by giving an equal and opposite amount of momentum to the exhaust gas. Think of it as a continuous series of perfectly inelastic collisions in reverse. Instead of objects sticking together, one object is continuously breaking into two pieces flying apart.
    $$ \Delta p_{rocket} = - \Delta p_{exhaust} $$

3.  **Thrust is Momentum Flow:** Thrust is a force. Force is the rate of change of momentum ($F = dp/dt$). The thrust force on the rocket is created by the rate at which momentum is carried away by the exhaust gas. A higher mass flow rate ($\frac{dm}{dt}$) or a higher exhaust velocity ($v_{ex}$) both result in a greater rate of momentum change, and therefore greater thrust.
    $$ F_{thrust} = \frac{d(p_{exhaust})}{dt} = v_{ex} \frac{dm}{dt} $$
    Here, $\frac{dm}{dt}$ is the mass flow rate, a positive quantity representing the mass of fuel ejected per second.

4.  **Use the General Form of Newton's Second Law:** Many are taught $F=ma$. This is a special case for constant mass. The true, more powerful form is $F_{ext} = \frac{dp}{dt}$. When mass is not constant, you must use this form.
    $$ F_{ext} = \frac{d(mv)}{dt} = m\frac{dv}{dt} + v\frac{dm}{dt} = ma + v\frac{dm}{dt} $$
    This equation shows that an external force can change a system's momentum by changing its velocity (the $ma$ term) or by changing its mass (the second term). The rocket thrust is an internal force, but this equation is essential for analyzing the rocket's motion when external forces like gravity or drag are present.

## Worked example
Let's derive the fundamental equation of motion for a rocket in deep space (no external forces, $F_{ext}=0$).

**Problem:** A rocket of total mass $M$ is moving at velocity $v$ at time $t$. In a time interval $dt$, it ejects a small mass of fuel $dm_{fuel}$ at an exhaust speed $v_{ex}$ relative to the rocket. Find the rocket's change in velocity, $dv$.

**Solution:**
1.  **Define the System and State at time $t$:**
    Our isolated system is the rocket plus the fuel it's about to eject.
    *   Total mass of system: $M$
    *   Velocity of system: $v$
    *   Initial momentum: $p_i = Mv$

2.  **Define the State at time $t+dt$:**
    The rocket has ejected the fuel.
    *   Mass of rocket: $M_{rocket} = M - dm_{fuel}$
    *   Velocity of rocket: $v_{rocket} = v + dv$
    *   Mass of exhaust: $dm_{fuel}$
    *   Velocity of exhaust (in inertial frame): The exhaust moves at $v_{ex}$ relative to the rocket, which is now moving at $v+dv$. So, its velocity relative to the ground is $(v+dv) - v_{ex}$. For simplicity, since $dv$ is an infinitesimal change, we can approximate the rocket's velocity as $v$ when calculating the exhaust velocity. Thus, $v_{exhaust} \approx v - v_{ex}$.
    *   Final momentum: $p_f = p_{rocket} + p_{exhaust} = (M - dm_{fuel})(v+dv) + (dm_{fuel})(v - v_{ex})$

3.  **Apply Conservation of Momentum ($p_i = p_f$):**
    $$ Mv = (M - dm_{fuel})(v+dv) + dm_{fuel}(v - v_{ex}) $$

4.  **Expand and Simplify:**
    $$ Mv = Mv + Mdv - v \cdot dm_{fuel} - dv \cdot dm_{fuel} + v \cdot dm_{fuel} - v_{ex} \cdot dm_{fuel} $$
    The $Mv$ terms on both sides cancel out. The $v \cdot dm_{fuel}$ terms also cancel.
    $$ 0 = Mdv - dv \cdot dm_{fuel} - v_{ex} \cdot dm_{fuel} $$

5.  **Discard Second-Order Infinitesimals:**
    The term $dv \cdot dm_{fuel}$ is a product of two infinitesimally small quantities, making it negligible compared to the other terms. We discard it.
    $$ 0 = Mdv - v_{ex} \cdot dm_{fuel} $$

6.  **Solve for $dv$:**
    $$ Mdv = v_{ex} \cdot dm_{fuel} $$
    This is the key result. It shows that the increase in the rocket's momentum ($Mdv$) is equal to the momentum of the ejected mass relative to the rocket ($v_{ex} \cdot dm_{fuel}$).

**Reflection:** Each step follows logically from the conservation of momentum. The trickiest part is step 2, correctly stating the velocity of the ejected mass in the inertial frame. The simplification in step 5 is a standard and valid technique when working with differentials. This final equation, $Mdv = v_{ex}dm_{fuel}$, is the differential form of the rocket equation, ready to be integrated later.

## Diagrams
Here is the system at time $t$ and $t+dt$. `v_ex` is the exhaust velocity relative to the rocket.

```text
Time: t
System: [Rocket + Fuel]
Mass: M
Velocity: v
Momentum: p = Mv

      ---> v
   [==Rocket==]


Time: t + dt
System: [Rocket] + [Ejected Fuel]
Mass: M-dm      +   dm
Velocity: v+dv    +   v-v_ex
Momentum: p = (M-dm)(v+dv) + dm(v-v_ex)

         ------> v+dv
      [=Rocket=]

          <--- v_ex (relative to rocket)
     <-- dm
     <---- v-v_ex (relative to ground)
```

## Memory technique — remember this forever
1.  **The Story:** A rocket is a machine that achieves freedom (velocity) by sacrificing parts of itself (mass). To move forward, it must violently throw a piece of itself backward. The force it feels is the "recoil" from this continuous, rapid-fire ejection. **Thrust is the recoil from throwing mass overboard.**

2.  **Must-Know Formulas:**
    *   General form of Newton's Second Law: $$F_{ext} = \frac{dp_{sys}}{dt}$$
    *   Thrust Equation: $$F_{thrust} = v_{ex} \frac{dm}{dt}$$

3.  **Spaced Repetition Schedule:** Review this derivation and these key ideas at these intervals:
    *   Tomorrow (1 day)
    *   In 3 days
    *   In 1 week (7 days)
    *   In 2 more weeks (16 days)
    *   In 3 more weeks (35 days)

4.  **First Principles Pathway:** If you forget everything, rebuild it from this:
    *   Define an isolated system: Rocket + a tiny bit of fuel $\Delta m$.
    *   Momentum before: $p_i = M_{total} v$.
    *   Momentum after: $p_f = (M_{total}-\Delta m)(v+\Delta v) + (\Delta m)(v-v_{ex})$.
    *   Set $p_i = p_f$.
    *   Algebraically solve for $\Delta v$. The formula will reappear.

## Common mistakes
1.  **Velocity Frame Confusion:** Adding exhaust velocity ($v_{ex}$, relative to the rocket) to the rocket's velocity ($v$, relative to the ground) without proper vector addition. Remember, if the rocket moves at $v$ and shoots gas out its back at $v_{ex}$, an observer on the ground sees the gas moving at $v - v_{ex}$.
2.  **Applying $F=ma$ Incorrectly:** You cannot just say $F_{thrust} = M(t) \cdot a(t)$ for a rocket. The mass $M(t)$ is changing. The correct formulation is $F_{net} = \frac{d(Mv)}{dt}$, which accounts for both the change in $v$ and the change in $M$.
3.  **Sign Errors:** The mass of the rocket *decreases*. So the change in rocket mass $dM_{rocket}$ is a negative number. It's often easier to define a positive mass flow rate $R = \frac{dm_{fuel}}{dt}$ and write the rocket's mass as $M(t) = M_0 - Rt$. Be consistent with your signs.

## Self-check
1.  Why is the system "rocket + its unburnt fuel" not a useful isolated system for deriving the thrust equation? What must the isolated system contain?
2.  A rocket engine ejects fuel at a rate of $50 \text{ kg/s}$ with an exhaust velocity of $3000 \text{ m/s}$. What is the magnitude of the thrust produced?
3.  A $10,000 \text{ kg}$ rocket, starting from rest in deep space, fires the engine from question 2. What is its instantaneous acceleration at the moment the engine ignites? What is its acceleration after $20$ seconds of firing? (Ignore the mass of the fuel in the total mass for the second part of the question for simplicity, just consider the change in mass).