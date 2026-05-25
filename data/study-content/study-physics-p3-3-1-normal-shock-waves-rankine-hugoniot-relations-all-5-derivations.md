## 1. What it is — in plain English

Imagine you're driving a car really fast, faster than the speed of sound. If you suddenly hit a wall of air, what happens? Instead of a gentle breeze, you'd experience an incredibly sudden, violent change in the air's properties. That sudden change, compressed into an almost infinitesimally thin sheet, is what we call a **shock wave**.

A **normal shock wave** is a specific type of shock wave where this "wall of air" is perfectly perpendicular to the direction the air is flowing. Think of it like a perfectly flat, invisible barrier that the supersonic air slams into head-on. As the air passes through this barrier, it instantly slows down from supersonic to subsonic speed, while its pressure, temperature, and density suddenly jump up.

The **Rankine-Hugoniot relations** are a set of five mathematical equations that describe exactly *how much* these properties change across such a normal shock wave. They are like a cheat sheet that tells you, "If the air goes into the shock at this speed and pressure, it will come out at that speed and pressure." They connect the conditions *before* the shock to the conditions *after* it, based purely on fundamental physics principles.

## 2. Why it matters — real-world applications

Understanding normal shock waves and their associated Rankine-Hugoniot relations is absolutely critical in any field dealing with high-speed fluid flow, especially in aerospace.

1.  **Supersonic Aircraft Design (e.g., Concorde, Fighter Jets):** When an aircraft flies faster than sound, shock waves naturally form around its body. Normal shock waves, in particular, can form in engine inlets if not designed carefully. These shocks cause a significant loss in the air's total pressure (stagnation pressure), which directly translates to a loss in engine thrust and efficiency. Engineers at companies like Lockheed Martin or Boeing use these relations to design variable geometry inlets that prevent or manage normal shocks, ensuring optimal engine performance at supersonic speeds.
2.  **Rocket Nozzle Design (e.g., SpaceX Falcon 9, NASA SLS):** Rocket engines accelerate exhaust gases to extremely high speeds. While the flow in an ideal nozzle is assumed to be shock-free, over-expansion or under-expansion can lead to shock waves forming inside or at the exit of the nozzle. For instance, if a nozzle is designed for high altitude but operates at sea level, the exhaust might over-expand, causing a normal shock to form *inside* the nozzle, leading to flow separation and reduced thrust. The Rankine-Hugoniot relations help predict these conditions and optimize nozzle geometry for different operating environments.
3.  **Atmospheric Re-entry Vehicles (e.g., Space Shuttle, Orion Capsule):** When a spacecraft re-enters Earth's atmosphere, it's traveling at hypersonic speeds (many times the speed of sound). A strong bow shock wave forms in front of the vehicle. While this is often an *oblique* shock, the principles of normal shocks are foundational. The compression across this shock wave causes a dramatic increase in temperature, leading to significant aerodynamic heating that requires robust heat shields (like those on the Space Shuttle or the Orion capsule from NASA). The Rankine-Hugoniot relations help estimate the temperature and pressure jumps, informing the design of these crucial thermal protection systems.
4.  **High-Speed Wind Tunnels:** To test aircraft and spacecraft designs at supersonic and hypersonic speeds, engineers use specialized wind tunnels. Normal shock waves are intentionally generated and studied in these facilities to calibrate instruments and understand how models behave under specific flow conditions. The relations are used to calculate the exact flow properties downstream of a shock generated in the test section, ensuring accurate experimental data.

## 3. Prerequisites — what you must know first

Before diving into the derivations, ensure you have a solid grasp of these fundamental concepts:

*   **Conservation Laws:** The bedrock of fluid dynamics. You need to understand the principles of conservation of mass, conservation of momentum, and conservation of energy, especially as applied to a control volume.
*   **Thermodynamics:**
    *   **Ideal Gas Law:** $P = \rho RT$ (Pressure, density, specific gas constant, temperature).
    *   **Specific Heats:** $c_p$ (specific heat at constant pressure) and $c_v$ (specific heat at constant volume), and their ratio $\gamma = c_p/c_v$.
    *   **Enthalpy:** $h = e + P/\rho$, where $e$ is internal energy. For an ideal gas, $h = c_p T$ and $e = c_v T$.
    *   **Entropy:** A measure of disorder. You should know that entropy increases across a shock wave, indicating an irreversible process.
*   **Fluid Dynamics Fundamentals:**
    *   **Steady Flow:** Properties at any point in the flow field do not change with time.
    *   **Control Volume Analysis:** How to apply conservation laws to a fixed region in space.
    *   **Mach Number ($M$):** The ratio of flow speed to the local speed of sound ($M = V/a$).
    *   **Speed of Sound ($a$):** For an ideal gas, $a = \sqrt{\gamma RT}$.
    *   **Isentropic Flow:** Flow where entropy remains constant (no friction, no heat transfer, no shocks). Crucially, flow *across a shock* is *not* isentropic.
*   **Basic Calculus and Algebra:** While the derivations primarily involve algebraic manipulation, understanding the concept of differentials and integrals (e.g., in deriving the energy equation) is helpful for a deeper appreciation. You'll need to be comfortable solving systems of equations.

## 4. The core idea — step by step

The core idea behind deriving the Rankine-Hugoniot relations is to apply the fundamental conservation laws (mass, momentum, energy) across a very thin, stationary control volume that encompasses the normal shock wave. We treat the shock as a discontinuity where properties change instantaneously.

### Step 1: Define the Control Volume and Assumptions

**Plain English:** Imagine a tiny, imaginary box that is perfectly still in space. This box is so thin that it just barely contains the shock wave inside it. Air flows into one side of the box (upstream, condition 1) and flows out the other side (downstream, condition 2). We assume the air is an ideal gas, the flow is steady (nothing changes with time), one-dimensional (properties only change in the direction of flow), and adiabatic (no heat enters or leaves the box).

**Concrete Example:** Picture a very thin slice of air, like a piece of paper. On one side, air is flowing at Mach 2. On the other side, it's flowing at Mach 0.8. The "paper" itself is the shock wave. Our control volume is just slightly thicker than this paper, enclosing the entire transition.

**Formal/Mathematical Version:**
Consider a stationary control volume, $\text{CV}$, enclosing a normal shock wave.
Let subscript '1' denote properties immediately upstream of the shock, and '2' denote properties immediately downstream.
Assumptions:
1.  **Steady Flow:** $\frac{\partial}{\partial t} (\dots) = 0$.
2.  **One-Dimensional Flow:** Properties vary only in the direction perpendicular to the shock.
3.  **Adiabatic:** No heat transfer into or out of the control volume ($q=0$).
4.  **No Work Done:** No shaft work or other forms of work ($w=0$).
5.  **Negligible Body Forces:** Gravitational effects are negligible over the small distance.
6.  **Ideal Gas:** $P = \rho RT$ and $h = c_p T$.

```text
       <----------------- Flow Direction ----------------->

       +-------------------------------------------------+
       |                                                 |
       |  Fluid (1)        | Normal Shock | Fluid (2)    |
       |  P1, V1, T1, ...  |      Wave    | P2, V2, T2, ...|
       |                   |              |                |
       +-------------------------------------------------+
       <---- Control Volume Boundary ---->
```

**What could go wrong:** Forgetting these assumptions. If the flow isn't steady, or if there's significant heat transfer, these relations won't hold. The "one-dimensional" assumption is key; for oblique shocks, the analysis is more complex.

### Step 2: Conservation of Mass (Continuity Equation)

**Plain English:** Whatever amount of air flows into our imaginary box per second must also flow out of it per second. The shock wave doesn't create or destroy air.

**Concrete Example:** If 1 kilogram of air enters the box every second, then 1 kilogram of air must leave the box every second. Even though the air might slow down and get denser, the mass flow rate remains constant.

**Formal/Mathematical Version:**
For steady, one-dimensional flow through a control volume, the mass flow rate $\dot{m}$ is constant.
$$ \dot{m} = \rho A V $$
Where $\rho$ is density, $A$ is cross-sectional area, and $V$ is velocity.
Since the shock is assumed to be a plane perpendicular to the flow, the cross-sectional area $A$ across the shock is constant.
Therefore,
$$ \rho_1 A V_1 = \rho_2 A V_2 $$
Dividing by $A$:
$$ \rho_1 V_1 = \rho_2 V_2 \quad \text{(1)} $$
This is the **continuity equation** for a normal shock.

**What could go wrong:** Forgetting that $A$ is constant *across the shock*. If you were analyzing flow through a varying area duct, $A$ would not cancel out.

### Step 3: Conservation of Momentum

**Plain English:** The net force acting on the air inside our imaginary box must be equal to the rate of change of momentum of the air as it passes through the box. Since the flow is steady, this means the difference in momentum flux (mass flow rate times velocity) between the inlet and outlet must be balanced by the pressure forces acting on the faces of the box.

**Concrete Example:** Imagine pushing a heavy cart (the air) that suddenly slows down. To slow it down, you must apply a force. In our case, the pressure difference across the shock provides this force. The higher pressure downstream "pushes back" on the faster upstream flow.

**Formal/Mathematical Version:**
Applying the momentum equation in the x-direction (direction of flow) for a steady control volume:
$$ \sum F_x = \dot{m}_{out} V_{x,out} - \dot{m}_{in} V_{x,in} $$
The forces acting on the control volume are due to pressure on the inlet and outlet faces.
$$ P_1 A - P_2 A = \dot{m} V_2 - \dot{m} V_1 $$
Substitute $\dot{m} = \rho A V$:
$$ P_1 A - P_2 A = (\rho_2 A V_2) V_2 - (\rho_1 A V_1) V_1 $$
Divide by $A$:
$$ P_1 - P_2 = \rho_2 V_2^2 - \rho_1 V_1^2 $$
Rearranging gives the **momentum equation** for a normal shock:
$$ P_1 + \rho_1 V_1^2 = P_2 + \rho_2 V_2^2 \quad \text{(2)} $$

**What could go wrong:** Incorrectly assigning the sign of pressure forces. Pressure always acts *inward* on a surface. Forgetting the $V^2$ term, which comes from momentum flux ($\dot{m}V$).

### Step 4: Conservation of Energy

**Plain English:** For our adiabatic box, no heat is added or removed, and no work is done. This means the total energy of the air entering the box must be the same as the total energy of the air leaving the box. This total energy includes its internal energy, its kinetic energy from motion, and the "flow work" required to push it into or out of the control volume.

**Concrete Example:** Think of a roller coaster. If there's no friction and no engine, its total energy (potential + kinetic) remains constant. Here, for a fluid, it's internal energy + kinetic energy + pressure energy (flow work).

**Formal/Mathematical Version:**
The steady-flow energy equation for an adiabatic, no-work control volume is:
$$ \dot{m} (h_1 + \frac{V_1^2}{2}) = \dot{m} (h_2 + \frac{V_2^2}{2}) $$
Dividing by $\dot{m}$:
$$ h_1 + \frac{V_1^2}{2} = h_2 + \frac{V_2^2}{2} \quad \text{(3)} $$
This is the **energy equation** for a normal shock.
Recall that for an ideal gas, enthalpy $h = c_p T$. So, we can also write:
$$ c_p T_1 + \frac{V_1^2}{2} = c_p T_2 + \frac{V_2^2}{2} $$
The term $h + V^2/2$ is also known as the **stagnation enthalpy**, $h_0$. So, the energy equation implies $h_{01} = h_{02}$. This means stagnation temperature $T_0$ is also conserved across a normal shock for an ideal gas, since $h_0 = c_p T_0$.
$$ T_1 (1 + \frac{V_1^2}{2c_p T_1}) = T_2 (1 + \frac{V_2^2}{2c_p T_2}) $$
We know $c_p = \frac{\gamma R}{\gamma-1}$ and $a^2 = \gamma R T$.
So, $\frac{V^2}{2c_p T} = \frac{V^2}{2 \frac{\gamma R}{\gamma-1} T} = \frac{\gamma-1}{2\gamma R T} V^2 = \frac{\gamma-1}{2} \frac{V^2}{a^2} = \frac{\gamma-1}{2} M^2$.
Thus, the energy equation can be written in terms of Mach number and temperature:
$$ T_1 (1 + \frac{\gamma-1}{2} M_1^2) = T_2 (1 + \frac{\gamma-1}{2} M_2^2) \quad \text{or} \quad T_{01} = T_{02} $$
This also means the stagnation temperature ratio is 1:
$$ \frac{T_{02}}{T_{01}} = 1 $$

**What could go wrong:** Confusing static properties with stagnation properties. While stagnation enthalpy (and thus stagnation temperature) is conserved, static enthalpy (and static temperature) is not.

### Step 5: Combining the Equations and Introducing Mach Number

**Plain English:** Now we have three fundamental equations (mass, momentum, energy). These equations relate the upstream (1) and downstream (2) properties. To make them more useful, especially in aerodynamics, we'll introduce the Mach number and the ideal gas law to convert everything into ratios of pressure, temperature, density, and Mach number. This is where the real algebraic work begins!

**Formal/Mathematical Version:**
We have:
1.  $\rho_1 V_1 = \rho_2 V_2$
2.  $P_1 + \rho_1 V_1^2 = P_2 + \rho_2 V_2^2$
3.  $h_1 + \frac{V_1^2}{2} = h_2 + \frac{V_2^2}{2}$

And auxiliary relations:
*   $P = \rho R T$
*   $h = c_p T = \frac{\gamma R}{\gamma-1} T$
*   $a = \sqrt{\gamma R T} \implies a^2 = \gamma R T$
*   $M = V/a$

Let's derive the 5 Rankine-Hugoniot relations:

#### Relation 1: Density Ratio ($\rho_2/\rho_1$)

From (1), $V_1 = \frac{\rho_2}{\rho_1} V_2$. Substitute into (2):
$P_1 + \rho_1 (\frac{\rho_2}{\rho_1} V_2)^2 = P_2 + \rho_2 V_2^2$
$P_1 + \frac{\rho_2^2}{\rho_1} V_2^2 = P_2 + \rho_2 V_2^2$
$P_1 - P_2 = V_2^2 (\rho_2 - \frac{\rho_2^2}{\rho_1}) = V_2^2 \rho_2 (1 - \frac{\rho_2}{\rho_1})$
From (1), $V_2 = \frac{\rho_1}{\rho_2} V_1$. Substitute into (2) rearranged ($P_2 - P_1 = \rho_1 V_1^2 - \rho_2 V_2^2$):
$P_2 - P_1 = \rho_1 V_1^2 - \rho_2 (\frac{\rho_1}{\rho_2} V_1)^2 = \rho_1 V_1^2 - \frac{\rho_1^2}{\rho_2} V_1^2 = \rho_1 V_1^2 (1 - \frac{\rho_1}{\rho_2})$

Now, consider the energy equation (3):
$c_p T_1 + \frac{V_1^2}{2} = c_p T_2 + \frac{V_2^2}{2}$
Multiply by $2/c_p$: $2 T_1 + \frac{V_1^2}{c_p} = 2 T_2 + \frac{V_2^2}{c_p}$
Recall $c_p = \frac{\gamma R}{\gamma-1}$.
$2 T_1 + \frac{\gamma-1}{\gamma R} V_1^2 = 2 T_2 + \frac{\gamma-1}{\gamma R} V_2^2$
$2 T_1 + \frac{\gamma-1}{\gamma R T_1} V_1^2 T_1 = 2 T_2 + \frac{\gamma-1}{\gamma R T_2} V_2^2 T_2$
$2 T_1 + \frac{\gamma-1}{a_1^2} V_1^2 T_1 = 2 T_2 + \frac{\gamma-1}{a_2^2} V_2^2 T_2$
$2 T_1 + (\gamma-1) M_1^2 T_1 = 2 T_2 + (\gamma-1) M_2^2 T_2$
$T_1 (1 + \frac{\gamma-1}{2} M_1^2) = T_2 (1 + \frac{\gamma-1}{2} M_2^2)$

This is the stagnation temperature relation, $T_{01} = T_{02}$.
Now, let's derive the density ratio directly from the continuity and momentum equations.
From (1): $V_1 = \frac{\rho_2}{\rho_1} V_2$.
From (2): $P_2 - P_1 = \rho_1 V_1^2 - \rho_2 V_2^2$.
Substitute $V_1$ from (1) into (2):
$P_2 - P_1 = \rho_1 (\frac{\rho_2}{\rho_1} V_2)^2 - \rho_2 V_2^2 = \frac{\rho_2^2}{\rho_1} V_2^2 - \rho_2 V_2^2 = \rho_2 V_2^2 (\frac{\rho_2}{\rho_1} - 1)$
Also, from (3) and $h = c_p T = \frac{\gamma}{\gamma-1} \frac{P}{\rho}$:
$\frac{\gamma}{\gamma-1} \frac{P_1}{\rho_1} + \frac{V_1^2}{2} = \frac{\gamma}{\gamma-1} \frac{P_2}{\rho_2} + \frac{V_2^2}{2}$
This is the **Rankine-Hugoniot energy equation**.
Rearranging, $\frac{\gamma}{\gamma-1} (\frac{P_1}{\rho_1} - \frac{P_2}{\rho_2}) = \frac{1}{2} (V_2^2 - V_1^2)$.
From (1), $V_2 = V_1 \frac{\rho_1}{\rho_2}$. Substitute into this equation:
$\frac{\gamma}{\gamma-1} (\frac{P_1}{\rho_1} - \frac{P_2}{\rho_2}) = \frac{V_1^2}{2} ((\frac{\rho_1}{\rho_2})^2 - 1)$
From (2), $V_1^2 = \frac{P_2 - P_1 + \rho_2 V_2^2}{\rho_1}$. This is getting complicated.

A more direct way to get the density ratio is to manipulate the momentum and energy equations.
From (2): $P_2 - P_1 = \rho_1 V_1^2 - \rho_2 V_2^2$.
From (1): $V_1 = \frac{\rho_2}{\rho_1} V_2$.
Substitute $V_1$ into the energy equation ($h_1 + \frac{V_1^2}{2} = h_2 + \frac{V_2^2}{2}$):
$h_1 + \frac{1}{2} (\frac{\rho_2}{\rho_1} V_2)^2 = h_2 + \frac{V_2^2}{2}$
$h_1 - h_2 = \frac{V_2^2}{2} (1 - (\frac{\rho_2}{\rho_1})^2)$
From (2), $V_2^2 = \frac{P_2 - P_1 + \rho_1 V_1^2}{\rho_2}$. This is not simplifying.

Let's use a common trick: define $G = \rho_1 V_1 = \rho_2 V_2$.
Then $V_1 = G/\rho_1$ and $V_2 = G/\rho_2$.
Substitute into (2):
$P_1 + \rho_1 (G/\rho_1)^2 = P_2 + \rho_2 (G/\rho_2)^2$
$P_1 + G^2/\rho_1 = P_2 + G^2/\rho_2$
$P_2 - P_1 = G^2 (\frac{1}{\rho_1} - \frac{1}{\rho_2}) = G^2 \frac{\rho_2 - \rho_1}{\rho_1 \rho_2} \quad \text{(A)}$

Substitute into (3) using $h = \frac{\gamma}{\gamma-1} \frac{P}{\rho}$:
$\frac{\gamma}{\gamma-1} \frac{P_1}{\rho_1} + \frac{1}{2} (\frac{G}{\rho_1})^2 = \frac{\gamma}{\gamma-1} \frac{P_2}{\rho_2} + \frac{1}{2} (\frac{G}{\rho_2})^2$
$\frac{\gamma}{\gamma-1} (\frac{P_1}{\rho_1} - \frac{P_2}{\rho_2}) = \frac{G^2}{2} (\frac{1}{\rho_2^2} - \frac{1}{\rho_1^2}) = \frac{G^2}{2} \frac{\rho_1^2 - \rho_2^2}{\rho_1^2 \rho_2^2}$
$\frac{\gamma}{\gamma-1} (\frac{P_1 \rho_2 - P_2 \rho_1}{\rho_1 \rho_2}) = \frac{G^2}{2} \frac{(\rho_1 - \rho_2)(\rho_1 + \rho_2)}{\rho_1^2 \rho_2^2} \quad \text{(B)}$

From (A), $G^2 = (P_2 - P_1) \frac{\rho_1 \rho_2}{\rho_2 - \rho_1}$. Substitute this into (B):
$\frac{\gamma}{\gamma-1} (\frac{P_1 \rho_2 - P_2 \rho_1}{\rho_1 \rho_2}) = \frac{(P_2 - P_1)}{2} \frac{\rho_1 \rho_2}{\rho_2 - \rho_1} \frac{(\rho_1 - \rho_2)(\rho_1 + \rho_2)}{\rho_1^2 \rho_2^2}$
$\frac{\gamma}{\gamma-1} (\frac{P_1 \rho_2 - P_2 \rho_1}{\rho_1 \rho_2}) = \frac{(P_2 - P_1)}{2} \frac{-(\rho_1 + \rho_2)}{\rho_1 \rho_2}$
Multiply by $\rho_1 \rho_2$:
$\frac{\gamma}{\gamma-1} (P_1 \rho_2 - P_2 \rho_1) = \frac{P_1 - P_2}{2} (\rho_1 + \rho_2)$
$2\gamma (P_1 \rho_2 - P_2 \rho_1) = (\gamma-1) (P_1 - P_2) (\rho_1 + \rho_2)$
$2\gamma P_1 \rho_2 - 2\gamma P_2 \rho_1 = (\gamma-1) (P_1 \rho_1 + P_1 \rho_2 - P_2 \rho_1 - P_2 \rho_2)$
Divide by $\rho_1 \rho_2$:
$2\gamma (\frac{P_1}{\rho_1} - \frac{P_2}{\rho_2}) = (\gamma-1) (\frac{P_1}{\rho_2} + \frac{P_1}{\rho_1} - \frac{P_2}{\rho_1} - \frac{P_2}{\rho_2})$
This is still not the standard form. Let's try to get $\rho_2/\rho_1$ and $P_2/P_1$.
Divide the equation $2\gamma (P_1 \rho_2 - P_2 \rho_1) = (\gamma-1) (P_1 - P_2) (\rho_1 + \rho_2)$ by $P_1 \rho_1$:
$2\gamma (\frac{\rho_2}{\rho_1} - \frac{P_2}{P_1}) = (\gamma-1) (1 - \frac{P_2}{P_1}) (1 + \frac{\rho_2}{\rho_1})$
Let $\chi = \rho_2/\rho_1$ and $\pi = P_2/P_1$.
$2\gamma (\chi - \pi) = (\gamma-1) (1 - \pi) (1 + \chi)$
$2\gamma \chi - 2\gamma \pi = (\gamma-1) (1 + \chi - \pi - \pi \chi)$
$2\gamma \chi - 2\gamma \pi = (\gamma-1) + (\gamma-1)\chi - (\gamma-1)\pi - (\gamma-1)\pi \chi$
Collect terms with $\chi$:
$\chi [2\gamma - (\gamma-1) + (\gamma-1)\pi] = (\gamma-1) - (\gamma-1)\pi + 2\gamma \pi$
$\chi [\gamma+1 + (\gamma-1)\pi] = \gamma-1 + (\gamma+1)\pi$
$$ \frac{\rho_2}{\rho_1} = \frac{(\gamma+1)P_2/P_1 + (\gamma-1)}{(\gamma-1)P_2/P_1 + (\gamma+1)} \quad \text{(R-H Relation 1: Density Ratio in terms of Pressure Ratio)} $$
This is one form of the Rankine-Hugoniot relations, often called the **Rankine-Hugoniot equation** itself, relating pressure and density ratios.

#### Relation 2: Pressure Ratio ($P_2/P_1$) in terms of Mach Number

We start from the momentum equation: $P_1 + \rho_1 V_1^2 = P_2 + \rho_2 V_2^2$.
Rearrange: $P_2 - P_1 = \rho_1 V_1^2 - \rho_2 V_2^2$.
From continuity $\rho_1 V_1 = \rho_2 V_2$, so $V_2 = V_1 (\rho_1/\rho_2)$.
$P_2 - P_1 = \rho_1 V_1^2 - \rho_2 (V_1 \rho_1/\rho_2)^2 = \rho_1 V_1^2 - \rho_1^2 V_1^2 / \rho_2 = \rho_1 V_1^2 (1 - \rho_1/\rho_2)$.
This isn't directly giving $P_2/P_1$ in terms of $M_1$. Let's use the definition of Mach number and speed of sound.
$P_2 - P_1 = \rho_1 V_1^2 - \rho_2 V_2^2$.
Divide by $P_1$:
$\frac{P_2}{P_1} - 1 = \frac{\rho_1 V_1^2}{P_1} - \frac{\rho_2 V_2^2}{P_1}$.
We know $P = \rho R T$ and $a^2 = \gamma R T$. So $P = \rho a^2 / \gamma$.
$\frac{\rho V^2}{P} = \frac{\rho V^2}{\rho a^2 / \gamma} = \frac{\gamma V^2}{a^2} = \gamma M^2$.
So, $\frac{P_2}{P_1} - 1 = \gamma M_1^2 - \frac{\rho_2 V_2^2}{P_1}$.
From continuity, $\rho_2 V_2 = \rho_1 V_1$. So $\rho_2 V_2^2 = \rho_1 V_1 V_2$.
$\frac{P_2}{P_1} - 1 = \gamma M_1^2 - \frac{\rho_1 V_1 V_2}{P_1} = \gamma M_1^2 - \gamma M_1^2 \frac{V_2}{V_1}$.
This is still not clean. Let's use the energy equation in terms of Mach numbers:
$T_1 (1 + \frac{\gamma-1}{2} M_1^2) = T_2 (1 + \frac{\gamma-1}{2} M_2^2)$.
Also, from the continuity and momentum equations, after some algebraic manipulation (similar to the density ratio derivation but solving for $P_2/P_1$):
Start with $P_1 + \rho_1 V_1^2 = P_2 + \rho_2 V_2^2$.
Substitute $\rho_1 = P_1/RT_1$, $\rho_2 = P_2/RT_2$.
$P_1 + \frac{P_1}{RT_1} V_1^2 = P_2 + \frac{P_2}{RT_2} V_2^2$.
$P_1 (1 + \frac{V_1^2}{RT_1}) = P_2 (1 + \frac{V_2^2}{RT_2})$.
Recall $a^2 = \gamma R T \implies RT = a^2/\gamma$.
$P_1 (1 + \frac{\gamma V_1^2}{a_1^2}) = P_2 (1 + \frac{\gamma V_2^2}{a_2^2})$.
$P_1 (1 + \gamma M_1^2) = P_2 (1 + \gamma M_2^2)$.
So, $\frac{P_2}{P_1} = \frac{1 + \gamma M_1^2}{1 + \gamma M_2^2}$. This relates $P_2/P_1$ to both $M_1$ and $M_2$.
To get it in terms of $M_1$ only, we need $M_2$ in terms of $M_1$.

Let's derive $M_2$ first.
From (1) $\rho_1 V_1 = \rho_2 V_2$.
From (2) $P_1 + \rho_1 V_1^2 = P_2 + \rho_2 V_2^2$.
From (3) $h_1 + V_1^2/2 = h_2 + V_2^2/2$.
Substitute $h = c_p T = \frac{\gamma}{\gamma-1} RT = \frac{a^2}{\gamma-1}$.
$\frac{a_1^2}{\gamma-1} + \frac{V_1^2}{2} = \frac{a_2^2}{\gamma-1} + \frac{V_2^2}{2}$.
Divide by $V_1^2$: $\frac{a_1^2}{(\gamma-1)V_1^2} + \frac{1}{2} = \frac{a_2^2}{(\gamma-1)V_1^2} + \frac{V_2^2}{2V_1^2}$.
Recall $M = V/a$. So $1/M^2 = a^2/V^2$.
$\frac{1}{(\gamma-1)M_1^2} + \frac{1}{2} = \frac{1}{(\gamma-1)M_2^2} \frac{a_2^2}{a_1^2} \frac{a_1^2}{V_1^2} + \frac{1}{2} (\frac{V_2}{V_1})^2$.
From continuity, $\frac{V_2}{V_1} = \frac{\rho_1}{\rho_2} = \frac{P_1/RT_1}{P_2/RT_2} = \frac{P_1 T_2}{P_2 T_1}$.
From $a^2 = \gamma R T$, $\frac{T_2}{T_1} = \frac{a_2^2}{a_1^2}$.
So $\frac{V_2}{V_1} = \frac{P_1}{P_2} \frac{a_2^2}{a_1^2}$.
This is turning into a messy simultaneous equation solution.
The standard way involves the Prandtl-Meyer relation (which is a consequence of the Rankine-Hugoniot equations, not a separate input).

Let's use a simpler approach for the pressure ratio:
From $P_2 - P_1 = \rho_1 V_1^2 - \rho_2 V_2^2$.
Divide by $P_1$: $\frac{P_2}{P_1} - 1 = \frac{\rho_1 V_1^2}{P_1} - \frac{\rho_2 V_2^2}{P_1}$.
We know $\frac{\rho V^2}{P} = \gamma M^2$.
So $\frac{P_2}{P_1} - 1 = \gamma M_1^2 - \frac{\rho_2}{\rho_1} \frac{\rho_1 V_2^2}{P_1}$.
Using continuity $\rho_1 V_1 = \rho_2 V_2 \implies \rho_2/\rho_1 = V_1/V_2$.
$\frac{P_2}{P_1} - 1 = \gamma M_1^2 - \frac{V_1}{V_2} \frac{\rho_1 V_2^2}{P_1} = \gamma M_1^2 - \frac{\rho_1 V_1 V_2}{P_1}$.
Multiply by $P_1$: $P_2 - P_1 = \rho_1 V_1^2 - \rho_1 V_1 V_2$.
$P_2 - P_1 = \rho_1 V_1 (V_1 - V_2)$.
From the energy equation, $h_1 + V_1^2/2 = h_2 + V_2^2/2$.
$\frac{\gamma}{\gamma-1} \frac{P_1}{\rho_1} + \frac{V_1^2}{2} = \frac{\gamma}{\gamma-1} \frac{P_2}{\rho_2} + \frac{V_2^2}{2}$.
Multiply by $2(\gamma-1)$:
$2\gamma \frac{P_1}{\rho_1} + (\gamma-1)V_1^2 = 2\gamma \frac{P_2}{\rho_2} + (\gamma-1)V_2^2$.
Rearrange: $2\gamma (\frac{P_1}{\rho_1} - \frac{P_2}{\rho_2}) = (\gamma-1) (V_2^2 - V_1^2)$.
From continuity $\rho_2 = \rho_1 (V_1/V_2)$.
$2\gamma (\frac{P_1}{\rho_1} - \frac{P_2 V_2}{\rho_1 V_1}) = (\gamma-1) (V_2^2 - V_1^2)$.
$2\gamma (P_1 V_1 - P_2 V_2) = \rho_1 (\gamma-1) V_1 (V_2^2 - V_1^2)$.
This is also getting complicated.

Let's use the standard Mach number form of the momentum equation:
$P_1(1 + \gamma M_1^2) = P_2(1 + \gamma M_2^2)$.
And the stagnation temperature relation:
$T_1(1 + \frac{\gamma-1}{2} M_1^2) = T_2(1 + \frac{\gamma-1}{2} M_2^2)$.
Also, the ideal gas law gives $\frac{P_2}{P_1} = \frac{\rho_2}{\rho_1} \frac{T_2}{T_1}$.
From continuity, $\frac{\rho_2}{\rho_1} = \frac{V_1}{V_2}$.
From $M=V/a$ and $a^2=\gamma RT$, we have $V = M \sqrt{\gamma RT}$.
So $\frac{V_1}{V_2} = \frac{M_1 \sqrt{\gamma R T_1}}{M_2 \sqrt{\gamma R T_2}} = \frac{M_1}{M_2} \sqrt{\frac{T_1}{T_2}}$.
So $\frac{\rho_2}{\rho_1} = \frac{M_1}{M_2} \sqrt{\frac{T_1}{T_2}}$.
Substitute this and $T_2/T_1$ from stagnation temperature relation into $P_2/P_1 = \frac{\rho_2}{\rho_1} \frac{T_2}{T_1}$:
$\frac{P_2}{P_1} = (\frac{M_1}{M_2} \sqrt{\frac{T_1}{T_2}}) (\frac{T_2}{T_1}) = \frac{M_1}{M_2} \sqrt{\frac{T_2}{T_1}}$.
Substitute $T_2/T_1 = \frac{1 + \frac{\gamma-1}{2} M_1^2}{1 + \frac{\gamma-1}{2} M_2^2}$ into the previous equation:
$\frac{P_2}{P_1} = \frac{M_1}{M_2} \sqrt{\frac{1 + \frac{\gamma-1}{2} M_1^2}{1 + \frac{\gamma-1}{2} M_2^2}}$.
This looks like it will be very complicated to solve for $M_2$ or $P_2/P_1$.

Let's use the momentum equation and continuity combined with $P = \rho a^2 / \gamma$.
$P_1 + \rho_1 V_1^2 = P_2 + \rho_2 V_2^2$.
$P_1 + \rho_1 V_1^2 = P_2 + \rho_1 V_1 V_2$. (using $\rho_2 V_2 = \rho_1 V_1$)
$P_2 - P_1 = \rho_1 V_1 (V_1 - V_2)$.
Also, from the energy equation, $h_1 + V_1^2/2 = h_2 + V_2^2/2$.
Substitute $h = \frac{\gamma}{\gamma-1} \frac{P}{\rho}$.
$\frac{\gamma}{\gamma-1} \frac{P_1}{\rho_1} + \frac{V_1^2}{2} = \frac{\gamma}{\gamma-1} \frac{P_2}{\rho_2} + \frac{V_2^2}{2}$.
Multiply by $2(\gamma-1)$: $2\gamma \frac{P_1}{\rho_1} + (\gamma-1)V_1^2 = 2\gamma \frac{P_2}{\rho_2} + (\gamma-1)V_2^2$.
Rearrange: $2\gamma (\frac{P_1}{\rho_1} - \frac{P_2}{\rho_2}) = (\gamma-1) (V_2^2 - V_1^2)$.
From the momentum equation $P_2 - P_1 = \rho_1 V_1^2 - \rho_2 V_2^2$.
Divide by $\rho_1$: $\frac{P_2}{\rho_1} - \frac{P_1}{\rho_1} = V_1^2 - \frac{\rho_2}{\rho_1} V_2^2 = V_1^2 - \frac{V_1}{V_2} V_2^2 = V_1^2 - V_1 V_2$.
So $\frac{P_1}{\rho_1} - \frac{P_2}{\rho_1} = V_1 V_2 - V_1^2$.
Substitute $\frac{P_2}{\rho_2} = \frac{P_2}{\rho_1} \frac{\rho_1}{\rho_2} = \frac{P_2}{\rho_1} \frac{V_2}{V_1}$.
$2\gamma (\frac{P_1}{\rho_1} - \frac{P_2 V_2}{\rho_1 V_1}) = (\gamma-1) (V_2^2 - V_1^2)$.
$2\gamma (P_1 V_1 - P_2 V_2) = \rho_1 (\gamma-1) V_1 (V_2^2 - V_1^2)$.
Let's divide by $P_1 V_1$:
$2\gamma (1 - \frac{P_2 V_2}{P_1 V_1}) = \frac{\rho_1 (\gamma-1) (V_2^2 - V_1^2)}{P_1}$.
We know $\frac{\rho_1 V_1^2}{P_1} = \gamma M_1^2$.
$2\gamma (1 - \frac{P_2 V_2}{P_1 V_1}) = (\gamma-1) \gamma M_1^2 (\frac{V_2^2}{V_1^2} - 1)$.
This is the key relation. From $P_2 - P_1 = \rho_1 V_1 (V_1 - V_2)$, divide by $P_1$:
$\frac{P_2}{P_1} - 1 = \frac{\rho_1 V_1^2}{P_1} (1 - \frac{V_2}{V_1}) = \gamma M_1^2 (1 - \frac{V_2}{V_1})$.
So $\frac{V_2}{V_1} = 1 - \frac{1}{\gamma M_1^2} (\frac{P_2}{P_1} - 1)$.
Substitute this into the equation $2\gamma (1 - \frac{P_2}{P_1} \frac{V_2}{V_1}) = (\gamma-1) \gamma M_1^2 ((\frac{V_2}{V_1})^2 - 1)$.
This is getting very intense. Let's use the result from standard textbooks.
The derivation is typically done by solving the system of equations for $V_2$ in terms of $V_1$ (or vice versa) and then substituting back.
A common intermediate step is the **Prandtl-Meyer relation**, which relates $V_1 V_2 = a^{*2}$ where $a^*$ is the sonic speed at the throat of a CD nozzle. This is not directly useful here, as it's for isentropic flow, not across a shock.

Let's restart the pressure ratio derivation with the standard approach:
From momentum: $P_2 - P_1 = \rho_1 V_1^2 - \rho_2 V_2^2$.
From continuity: $\rho_1 V_1 = \rho_2 V_2 \implies V_2 = V_1 \frac{\rho_1}{\rho_2}$.
Substitute $V_2$ into momentum:
$P_2 - P_1 = \rho_1 V_1^2 - \rho_2 (V_1 \frac{\rho_1}{\rho_2})^2 = \rho_1 V_1^2 - \frac{\rho_1^2}{\rho_2} V_1^2 = \rho_1 V_1^2 (1 - \frac{\rho_1}{\rho_2})$.
Divide by $P_1$:
$\frac{P_2}{P_1} - 1 = \frac{\rho_1 V_1^2}{P_1} (1 - \frac{\rho_1}{\rho_2})$.
Recall $\frac{\rho_1 V_1^2}{P_1} = \gamma M_1^2$.
So $\frac{P_2}{P_1} - 1 = \gamma M_1^2 (1 - \frac{\rho_1}{\rho_2})$.
$\frac{P_2}{P_1} = 1 + \gamma M_1^2 (1 - \frac{\rho_1}{\rho_2})$. This is an intermediate form.

Now, from the energy equation:
$h_1 + \frac{V_1^2}{2} = h_2 + \frac{V_2^2}{2}$.
Using $h = \frac{\gamma}{\gamma-1} \frac{P}{\rho}$ and $V = M a = M \sqrt{\gamma R T} = M \sqrt{\gamma P/\rho}$.
$\frac{\gamma}{\gamma-1} \frac{P_1}{\rho_1} + \frac{M_1^2 \gamma P_1}{2\rho_1} = \frac{\gamma}{\gamma-1} \frac{P_2}{\rho_2} + \frac{M_2^2 \gamma P_2}{2\rho_2}$.
Divide by $\frac{\gamma}{\gamma-1}$:
$\frac{P_1}{\rho_1} (1 + \frac{\gamma-1}{2} M_1^2) = \frac{P_2}{\rho_2} (1 + \frac{\gamma-1}{2} M_2^2)$.
Rearrange to get $\frac{P_2}{P_1}$:
$\frac{P_2}{P_1} = \frac{\rho_2}{\rho_1} \frac{1 + \frac{\gamma-1}{2} M_1^2}{1 + \frac{\gamma-1}{2} M_2^2}$.

Now we have a system of three equations for $\frac{P_2}{P_1}$, $\frac{\rho_2}{\rho_1}$, and $\frac{T_2}{T_1}$ (or $M_2$).
Let's use the **Rankine-Hugoniot equation** derived earlier:
$\frac{\rho_2}{\rho_1} = \frac{(\gamma+1)P_2/P_1 + (\gamma-1)}{(\gamma-1)P_2/P_1 + (\gamma+1)}$.
Substitute this into $\frac{P_2}{P_1} = 1 + \gamma M_1^2 (1 - \frac{\rho_1}{\rho_2})$:
$\frac{P_2}{P_1} = 1 + \gamma M_1^2 \left(1 - \frac{(\gamma-1)P_2/P_1 + (\gamma+1)}{(\gamma+1)P_2/P_1 + (\gamma-1)}\right)$.
Let $\pi = P_2/P_1$.
$\pi = 1 + \gamma M_1^2 \left(\frac{(\gamma+1)\pi + (\gamma-1) - ((\gamma-1)\pi + (\gamma+1))}{(\gamma+1)\pi + (\gamma-1)}\right)$.
$\pi = 1 + \gamma M_1^2 \left(\frac{(\gamma+1-\gamma+1)\pi + (\gamma-1-\gamma-1)}{(\gamma+1)\pi + (\gamma-1)}\right)$.
$\pi = 1 + \gamma M_1^2 \left(\frac{2\pi - 2}{(\gamma+1)\pi + (\gamma-1)}\right)$.
$\pi - 1 = \frac{2\gamma M_1^2 (\pi - 1)}{(\gamma+1)\pi + (\gamma-1)}$.
If $\pi = 1$ (no shock), then this is $0=0$.
If $\pi \neq 1$, we can divide by $(\pi - 1)$:
$1 = \frac{2\gamma M_1^2}{(\gamma+1)\pi + (\gamma-1)}$.
$(\gamma+1)\pi + (\gamma-1) = 2\gamma M_1^2$.
$(\gamma+1)\pi = 2\gamma M_1^2 - (\gamma-1)$.
$$ \frac{P_2}{P_1} = 1 + \frac{2\gamma}{\gamma+1}(M_1^2 - 1) \quad \text{(R-H Relation 2: Pressure Ratio)} $$
This is one of the most important Rankine-Hugoniot relations. It shows that $P_2 > P_1$ if $M_1 > 1$.

#### Relation 3: Density Ratio ($\rho_2/\rho_1$) in terms of Mach Number

Now that we have $P_2/P_1$ in terms of $M_1$, we can substitute it back into the general Rankine-Hugoniot equation relating $\rho_2/\rho_1$ and $P_2/P_1$:
$\frac{\rho_2}{\rho_1} = \frac{(\gamma+1)P_2/P_1 + (\gamma-1)}{(\gamma-1)P_2/P_1 + (\gamma+1)}$.
Substitute $P_2/P_1 = 1 + \frac{2\gamma}{\gamma+1}(M_1^2 - 1)$:
$\frac{\rho_2}{\rho_1} = \frac{(\gamma+1) [1 + \frac{2\gamma}{\gamma+1}(M_1^2 - 1)] + (\gamma-1)}{(\gamma-1) [1 + \frac{2\gamma}{\gamma+1}(M_1^2 - 1)] + (\gamma+1)}$.
Numerator: $(\gamma+1) + 2\gamma(M_1^2 - 1) + (\gamma-1) = 2\gamma + 2\gamma M_1^2 - 2\gamma = 2\gamma M_1^2$.
Denominator: $(\gamma-1) + \frac{2\gamma(\gamma-1)}{\gamma+1}(M_1^2 - 1) + (\gamma+1)$.
Multiply numerator and denominator by $(\gamma+1)$:
$\frac{\rho_2}{\rho_1} = \frac{2\gamma M_1^2 (\gamma+1)}{(\gamma-1)(\gamma+1) + 2\gamma(\gamma-1)(M_1^2 - 1) + (\gamma+1)^2}$.
This is getting messy. Let's use simpler substitution:
From $P_2/P_1 = 1 + \gamma M_1^2 (1 - \rho_1/\rho_2)$, we have $1 - \rho_1/\rho_2 = \frac{P_2/P_1 - 1}{\gamma M_1^2}$.
So $\frac{\rho_1}{\rho_2} = 1 - \frac{P_2/P_1 - 1}{\gamma M_1^2}$.
Then $\frac{\rho_2}{\rho_1} = \frac{1}{1 - \frac{P_2/P_1 - 1}{\gamma M_1^2}}$.
Substitute $P_2/P_1 - 1 = \frac{2\gamma}{\gamma+1}(M_1^2 - 1)$:
$\frac{\rho_2}{\rho_1} = \frac{1}{1 - \frac{\frac{2\gamma}{\gamma+1}(M_1^2 - 1)}{\gamma M_1^2}} = \frac{1}{1 - \frac{2(M_1^2 - 1)}{(\gamma+1)M_1^2}}$.
$\frac{\rho_2}{\rho_1} = \frac{(\gamma+1)M_1^2}{(\gamma+1)M_1^2 - 2(M_1^2 - 1)} = \frac{(\gamma+1)M_1^2}{(\gamma+1-2)M_1^2 + 2} = \frac{(\gamma+1)M_1^2}{(\gamma-1)M_1^2 + 2}$.
$$ \frac{\rho_2}{\rho_1} = \frac{(\gamma+1)M_1^2}{(\gamma-1)M_1^2 + 2} \quad \text{(R-H Relation 3: Density Ratio)} $$
This shows that $\rho_2 > \rho_1$ for $M_1 > 1$.
Also, as $M_1 \to \infty$, $\frac{\rho_2}{\rho_1} \to \frac{\gamma+1}{\gamma-1}$. For air ($\gamma=1.4$), this limit is $\frac{2.4}{0.4} = 6$. The density can increase by at most 6 times across a normal shock.

#### Relation 4: Temperature Ratio ($T_2/T_1$) in terms of Mach Number

We use the ideal gas law: $\frac{P_2}{P_1} = \frac{\rho_2}{\rho_1} \frac{T_2}{T_1}$.
So, $\frac{T_2}{T_1} = \frac{P_2}{P_1} \frac{\rho_1}{\rho_2}$.
Substitute the expressions for $P_2/P_1$ and $\rho_2/\rho_1$:
$\frac{T_2}{T_1} = \left[1 + \frac{2\gamma}{\gamma+1}(M_1^2 - 1)\right] \left[\frac{(\gamma-1)M_1^2 + 2}{(\gamma+1)M_1^2}\right]$.
This is one form. Another form is by using the stagnation temperature relation:
$\frac{T_{02}}{T_{01}} = 1 \implies T_1 (1 + \frac{\gamma-1}{2} M_1^2) = T_2 (1 + \frac{\gamma-1}{2} M_2^2)$.
So $\frac{T_2}{T_1} = \frac{1 + \frac{\gamma-1}{2} M_1^2}{1 + \frac{\gamma-1}{2} M_2^2}$.
To get $T_2/T_1$ in terms of $M_1$ only, we need $M_2$ in terms of $M_1$.

#### Relation 5: Downstream Mach Number ($M_2$) in terms of Upstream Mach Number ($M_1$)

We have $\frac{\rho_2}{\rho_1} = \frac{M_1}{M_2} \sqrt{\frac{T_1}{T_2}}$.
Squaring both sides: $(\frac{\rho_2}{\rho_1})^2 = (\frac{M_1}{M_2})^2 \frac{T_1}{T_2}$.
Substitute $\frac{T_1}{T_2} = \frac{1 + \frac{\gamma-1}{2} M_2^2}{1 + \frac{\gamma-1}{2} M_1^2}$.
$(\frac{\rho_2}{\rho_1})^2 = (\frac{M_1}{M_2})^2 \frac{1 + \frac{\gamma-1}{2} M_2^2}{1 + \frac{\gamma-1}{2} M_1^2}$.
Now substitute $\frac{\rho_2}{\rho_1} = \frac{(\gamma+1)M_1^2}{(\gamma-1)M_1^2 + 2}$:
$\left(\frac{(\gamma+1)M_1^2}{(\gamma-1)M_1^2 + 2}\right)^2 = (\frac{M_1}{M_2})^2 \frac{1 + \frac{\gamma-1}{2} M_2^2}{1 + \frac{\gamma-1}{2} M_1^2}$.
This is a very complex equation to solve for $M_2$.
A more straightforward way is to use the **Prandtl relation** (not Prandtl-Meyer, but a specific relation for normal shocks) which is derived from the momentum and energy equations:
$V_1 V_2 = a^{*2}$ where $a^{*2} = \frac{2}{\gamma+1} (\frac{\gamma-1}{2} a_0^2 + V_1^2)$ (this is not correct, the $a^{*2}$ is the sonic velocity at the throat of an isentropic flow).
The correct Prandtl relation for normal shocks is:
$V_1 V_2 = a^{*2} = (\frac{\gamma-1}{\gamma+1}) V_{max}^2$ where $V_{max}$ is maximum velocity.
Let's use the $P_1(1 + \gamma M_1^2) = P_2(1 + \gamma M_2^2)$ relation and the $T_1 (1 + \frac{\gamma-1}{2} M_1^2) = T_2 (1 + \frac{\gamma-1}{2} M_2^2)$ relation.
And $\frac{P_2}{P_1} = \frac{\rho_2}{\rho_1} \frac{T_2}{T_1}$.
Substitute for $P_2/P_1$ and $T_2/T_1$:
$\frac{1 + \gamma M_1^2}{1 + \gamma M_2^2} = \frac{\rho_2}{\rho_1} \frac{1 + \frac{\gamma-1}{2} M_1^2}{1 + \frac{\gamma-1}{2} M_2^2}$.
Now substitute $\frac{\rho_2}{\rho_1} = \frac{(\gamma+1)M_1^2}{(\gamma-1)M_1^2 + 2}$:
$\frac{1 + \gamma M_1^2}{1 + \gamma M_2^2} = \frac{(\gamma+1)M_1^2}{(\gamma-1)M_1^2 + 2} \frac{1 + \frac{\gamma-1}{2} M_1^2}{1 + \frac{\gamma-1}{2} M_2^2}$.
This is still very complex.

A more direct derivation for $M_2$:
From the momentum equation: $P_2 - P_1 = \rho_1 V_1^2 - \rho_2 V_2^2$.
Divide by $\rho_1 V_1^2$: $\frac{P_2}{\rho_1 V_1^2} - \frac{P_1}{\rho_1 V_1^2} = 1 - \frac{\rho_2 V_2^2}{\rho_1 V_1^2}$.
$\frac{P_2}{\rho_1 V_1^2} - \frac{1}{\gamma M_1^2} = 1 - \frac{V_2}{V_1}$. (Using continuity $\rho_2 V_2 = \rho_1 V_1$)
Also from the energy equation: $c_p T_1 + \frac{V_1^2}{2} = c_p T_2 + \frac{V_2^2}{2}$.
$\frac{c_p T_1}{V_1^2} + \frac{1}{2} = \frac{c_p T_2}{V_1^2} + \frac{V_2^2}{2V_1^2}$.
$\frac{\gamma R T_1}{(\gamma-1)V_1^2} + \frac{1}{2} = \frac{\gamma R T_2}{(\gamma-1)V_1^2} + \frac{V_2^2}{2V_1^2}$.
$\frac{a_1^2}{(\gamma-1)V_1^2} + \frac{1}{2} = \frac{a_2^2}{(\gamma-1)V_1^2} + \frac{V_2^2}{2V_1^2}$.
$\frac{1}{(\gamma-1)M_1^2} + \frac{1}{2} = \frac{1}{(\gamma