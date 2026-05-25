## What it is
A Control Moment Gyroscope (CMG) is an attitude control device consisting of a spinning rotor with constant speed, mounted on a motorized gimbal. Instead of changing the rotor's speed to generate torque (like a reaction wheel), a CMG rotates the gimbal to change the *direction* of the rotor's angular momentum. This forced precession produces a massive, instantaneous gyroscopic torque on the spacecraft.

## Why it matters
CMGs are the muscle behind large spacecraft maneuvers. The International Space Station (ISS) and highly agile Earth-observation satellites use CMGs because they offer orders of magnitude more torque per unit of power and mass than reaction wheels. However, steering multiple CMGs introduces complex non-linear control problems—specifically "singularities," where the system mathematically locks up and cannot produce torque in certain directions. Mastering this bridges classical mechanics and advanced non-linear control theory.

## When to study it
Do not attempt this until you have mastered:
1. 3D rigid body dynamics and Euler's equations of motion.
2. The transport theorem (taking the derivative of a vector in a rotating reference frame).
3. Linear algebra—specifically the Jacobian matrix, rank deficiency, and the Moore-Penrose pseudoinverse.

If you do not intuitively grasp why $\vec{\tau} = \frac{d\vec{L}}{dt}$ requires a cross-product term in a rotating frame, return to classical mechanics. 

## How to study it (step by step)
1. Derive the basic gyroscopic torque equation for a single-gimbal CMG using $\vec{\tau} = \vec{\omega} \times \vec{h}$.
2. Calculate the torque output for a given gimbal rate and rotor momentum. Compare this to the power required to accelerate a reaction wheel to achieve the same torque. 
3. Write out the total angular momentum vector $\vec{H}$ for an array of $n$ CMGs as a function of their gimbal angles $\vec{\delta}$.
4. Differentiate $\vec{H}$ with respect to $\vec{\delta}$ to form the Jacobian matrix $A(\vec{\delta})$.
5. Set up a simple 2-CMG or 3-CMG configuration and find the gimbal angles where the determinant of $A A^T$ is zero. These are your singularities.
6. Study the difference between "saturation singularities" (maximum momentum envelope reached) and "internal singularities" (momentum is not maxed out, but vectors are locked).

## Key ideas, with intuition

**1. Torque Amplification (The Gyroscopic Effect)**
Let $\vec{h}$ be the rotor's constant angular momentum. If we rotate the gimbal at rate $\vec{\dot{\delta}}$, the change in $\vec{h}$ creates a torque. Because the rotor is spinning extremely fast, $|\vec{h}|$ is very large. Thus, even a tiny gimbal rate $\vec{\dot{\delta}}$ produces massive torque. You are steering momentum, not creating it from scratch.

**2. The Jacobian Matrix**
For an array of $n$ CMGs, the total angular momentum is a vector function of the gimbal angles: $\vec{H}(\vec{\delta})$. The output torque is the time derivative of this momentum:
$$ \vec{\tau} = \frac{\partial \vec{H}}{\partial \vec{\delta}} \vec{\dot{\delta}} = A(\vec{\delta}) \vec{\dot{\delta}} $$
Here, $A(\vec{\delta})$ is a $3 \times n$ Jacobian matrix mapping gimbal rates to 3D spacecraft torque. 

**3. Singularity**
To command a specific torque $\vec{\tau}_{cmd}$, the flight computer must solve for the required gimbal rates: $\vec{\dot{\delta}} = A^+ \vec{\tau}_{cmd}$, where $A^+$ is the pseudoinverse of $A$. 
A singularity occurs when the rank of $A(\vec{\delta})$ drops below 3. Physically, the CMG angular momentum vectors have aligned such that no combination of gimbal rates can produce torque along a specific axis. The matrix cannot be inverted. The spacecraft loses a degree of freedom.

## Worked example
**Scenario:** A single-gimbal CMG is mounted on a spacecraft. The rotor spins at a constant rate $\Omega$ about the local z-axis. The gimbal rotates about the local x-axis at a rate $\dot{\delta}$. The spacecraft is currently at rest ($\vec{\omega}_{s/c} = 0$). Find the output torque exerted on the spacecraft.

**Step 1: Define the rotor's angular momentum.**
$$ \vec{h} = I_r \Omega \hat{k} $$
where $I_r$ is the rotor's moment of inertia.

**Step 2: Define the gimbal's angular velocity.**
$$ \vec{\omega}_{gimbal} = \dot{\delta} \hat{i} $$

**Step 3: Apply the transport theorem for the rate of change of momentum.**
The torque required to precess the gyro is $\vec{\tau}_{req} = \frac{d\vec{h}}{dt} = \vec{\omega}_{gimbal} \times \vec{h}$. 
By Newton's Third Law, the output torque *on the spacecraft* is equal and opposite:
$$ \vec{\tau}_{output} = - (\vec{\omega}_{gimbal} \times \vec{h}) $$

**Step 4: Compute the cross product.**
$$ \vec{\tau}_{output} = - (\dot{\delta} \hat{i} \times I_r \Omega \hat{k}) $$
$$ \vec{\tau}_{output} = - I_r \Omega \dot{\delta} (\hat{i} \times \hat{k}) $$
Since $\hat{i} \times \hat{k} = -\hat{j}$:
$$ \vec{\tau}_{output} = I_r \Omega \dot{\delta} \hat{j} $$

**Reflection:** The output torque appears on the y-axis, orthogonal to both the spin axis (z) and the gimbal axis (x). This orthogonal response is the defining characteristic of gyroscopic physics. 

## Diagrams

```text
      z (Rotor Spin Axis, h)
      ^
      |      ___
      |     /   \  <-- Spinning Rotor
      |    |  +  |     |h| = constant
      |     \___/
      |
------+---------------------> x (Gimbal Axis, \dot{\delta})
     /
    /
   /
  v
 y (Output Torque Axis, \tau)

Right-Hand Rule Check: 
Rotate x-axis (\dot{\delta}) into z-axis (h). 
Thumb points in -y. 
Output torque on spacecraft is opposite (-(-y) = +y).
```

## Memory technique — remember this forever
**1. Mnemonic:** "Reaction wheels *build* the wheel; CMGs *steer* the wheel." 
**2. Core Formulas to overlearn:**
*   Single CMG Torque: $$ \vec{\tau} = \vec{\dot{\delta}} \times \vec{h} $$
*   CMG Array Control: $$ \vec{\tau}_{cmd} = A(\vec{\delta}) \vec{\dot{\delta}} $$
**3. Spaced-repetition schedule:** Review the derivation of the Jacobian and the cross-product torque at 1 day, 3 days, 7 days, 16 days, and 35 days.
**4. First principles pathway:** If you forget the torque equation, start at conservation of angular momentum. $\vec{H}_{total} = \vec{H}_{spacecraft} + \vec{h}_{cmg} = \text{constant}$. Take the time derivative: $\dot{\vec{H}}_{spacecraft} + \dot{\vec{h}}_{cmg} = 0$. The derivative of a vector in a rotating frame is $\vec{\omega} \times \vec{v}$. Therefore, $\vec{\tau}_{spacecraft} = - (\vec{\omega}_{gimbal} \times \vec{h}_{cmg})$.

## Common mistakes
* **Confusing CMGs with Reaction Wheels:** Students often try to change the magnitude of $\vec{h}$ in CMG math. In a CMG, $|\vec{h}|$ is strictly constant. Only the direction changes.
* **Sign errors on the output torque:** The torque required to move the gimbal is $\vec{\omega} \times \vec{h}$. The torque exerted *on the vehicle* is $-(\vec{\omega} \times \vec{h})$. Missing this minus sign will cause your control loop to drive the spacecraft into a spin.
* **Assuming singularities only happen at maximum momentum:** Students assume a singularity means the CMGs are fully saturated. "Internal singularities" occur when the net angular momentum is zero, but the individual $\vec{h}$ vectors are locked in anti-parallel configurations where the Jacobian rank still drops.

## Self-check
1. Derive the output torque vector for a single-gimbal CMG whose rotor spins about the y-axis and gimbals about the z-axis.
2. Set up the Jacobian matrix $A(\vec{\delta})$ for two single-gimbal CMGs whose gimbal axes are both aligned with the spacecraft x-axis. Prove mathematically why this system cannot provide 3-axis attitude control.
3. Explain physically what happens to the required gimbal rates $\vec{\dot{\delta}}$ as the matrix $A(\vec{\delta})$ approaches a singularity while the flight computer demands a constant non-zero torque $\vec{\tau}_{cmd}$.