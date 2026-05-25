## 1. What it is — in plain English

Imagine you're on a train, and your friend is standing still on the platform. When you throw a ball, how you describe its path and speed is different from how your friend describes it. This is about *frames of reference* – different viewpoints. For everyday speeds, we use something called the Galilean transformation, which is basically just adding or subtracting the train's speed. Simple!

But what if the train was moving incredibly fast, close to the speed of light? Here's the mind-bending part: the speed of light itself is always measured to be the same, no matter how fast you or your friend are moving. This is a fundamental law of nature. If the speed of light is constant for everyone, then our old way of adding and subtracting speeds (the Galilean transformation) must be wrong.

The Lorentz transformation is a new set of rules, discovered by Hendrik Lorentz and later formalized by Albert Einstein, that tells us how to correctly translate measurements of space (like distance) and time (like duration) between these super-fast moving frames of reference. It's the "correct language" for describing events in the universe when things move at speeds approaching light speed.

Essentially, it's a mathematical recipe that tells you: if you see an event happen at a certain place and time, what place and time would someone else, moving very fast relative to you, say that same event happened? It reveals that space and time aren't absolute and separate, but are interwoven into a single "spacetime" fabric, and how we slice that fabric depends on our motion.

## 2. Why it matters — real-world applications

The Lorentz transformation isn't just an abstract theoretical concept; it has profound implications and practical applications in our modern world, especially when dealing with high-speed phenomena.

1.  **Global Positioning System (GPS) Satellites:** This is perhaps the most famous everyday application. GPS satellites orbit Earth at speeds of about 14,000 km/h, and their clocks run slightly slower than clocks on Earth due to special relativistic effects (time dilation, a direct consequence of the Lorentz transformation). Without correcting for this, and for general relativistic effects, GPS would accumulate errors of about 10 kilometers per day, rendering it useless for precise navigation. Companies like Garmin and TomTom, and even your smartphone's GPS, rely on these relativistic corrections.

2.  **Particle Accelerators and High-Energy Physics:** Facilities like CERN's Large Hadron Collider (LHC) accelerate particles (protons, electrons) to speeds incredibly close to the speed of light (e.g., 0.999999991 *c*). Understanding how these particles behave, their lifetimes, their momentum, and their energy requires the Lorentz transformation. Without it, the entire design of these accelerators, the detectors used to observe particle collisions, and the interpretation of experimental results would be fundamentally flawed. Particle decay rates, for instance, are significantly extended (time dilation) in the lab frame due to their high speeds.

3.  **Astrophysics and Cosmology:** When observing distant galaxies, quasars, and supernovae, astronomers deal with objects moving at relativistic speeds. The light we receive from these objects is affected by their motion, leading to phenomena like relativistic beaming (where light is concentrated in the direction of motion) and redshift/blueshift (Doppler effect for light, which is relativistically modified). The Lorentz transformation is crucial for correctly interpreting these observations and understanding the dynamics of the universe on large scales.

4.  **Medical Imaging (e.g., PET Scans):** Positron Emission Tomography (PET) scanners use radioactive isotopes that emit positrons. These positrons travel a short distance before annihilating with electrons, producing gamma rays. The precise timing and detection of these gamma rays are critical for creating detailed images. The positrons themselves are often moving at relativistic speeds, and their behavior and interaction with matter need to be understood through the lens of special relativity, which is built upon the Lorentz transformation.

## 3. Prerequisites — what you must know first

Before diving into the derivation of the Lorentz transformation, ensure you have a solid grasp of the following concepts:

*   **Inertial Frames of Reference:** A frame of reference where an object not subject to any forces experiences no acceleration. Essentially, a non-accelerating viewpoint.
*   **Galilean Transformation:** The classical (pre-relativistic) set of equations used to transform coordinates between two inertial frames moving at a constant relative velocity. It assumes absolute time and space.
*   **Postulates of Special Relativity:**
    *   **Principle of Relativity:** The laws of physics are the same for all observers in all inertial frames of reference.
    *   **Constancy of the Speed of Light:** The speed of light in a vacuum ($c$) is the same for all inertial observers, regardless of the motion of the light source.
*   **Cartesian Coordinate Systems:** Understanding how to represent positions in 3D space using $(x, y, z)$ coordinates.
*   **Basic Algebra:** Solving linear equations, substitution, and manipulating algebraic expressions.
*   **Pythagorean Theorem:** $a^2 + b^2 = c^2$, for calculating distances in Euclidean space.
*   **Understanding of Functions:** How one variable depends on another, e.g., $f(x) = y$.

## 4. The core idea — step by step

The goal of the Lorentz transformation is to find a set of equations that relate the coordinates $(x, y, z, t)$ of an event in one inertial frame (let's call it S) to the coordinates $(x', y', z', t')$ of the *same* event in another inertial frame (S'), where S' is moving at a constant velocity $v$ relative to S. We will assume the relative motion is along the common x-axis, and that the y and z axes are parallel.

### Step 1: Setting up the Frames and Assuming Linearity

*   **Plain-English Statement:** We have two observers, S and S'. S' is moving at a constant speed $v$ in the positive x-direction relative to S. At the moment their origins ($x=0$ and $x'=0$) coincide, both their clocks read zero ($t=0$ and $t'=0$). We expect the transformation equations to be linear, meaning an event's coordinates in one frame map directly to coordinates in the other frame without squaring or other complex functions, as this preserves the idea of uniform motion.

*   **Small Concrete Example:** If an object is at $x=1$ meter in S, and the transformation is linear, then if it's at $x=2$ meters, its $x'$ coordinate should be proportionally related. If non-linear, say $x' = x^2$, then $x=1 \rightarrow x'=1$ but $x=2 \rightarrow x'=4$, which would distort uniform motion.

*   **Formal/Mathematical Version:**
    Let frame S have coordinates $(x, y, z, t)$ and frame S' have coordinates $(x', y', z', t')$.
    S' moves with velocity $v$ along the positive x-axis relative to S.
    We assume the transformation equations are linear:
    $$x' = A x + B t$$
    $$y' = C y + D z$$
    $$z' = E y + F z$$
    $$t' = G x + H t$$
    Due to the motion being purely along the x-axis, and assuming no rotation or shear between the frames, and for simplicity that the y and z axes are parallel, we can immediately simplify the transverse coordinates:
    $$y' = y$$
    $$z' = z$$
    This is because there's no relative motion or preferred direction in the y or z dimensions to cause any change. If an object is at $y=1$ in S, it should be at $y'=1$ in S'.

*   **What could go wrong:** Assuming non-linear transformations or that transverse dimensions ($y, z$) are also affected by motion along $x$. This would unnecessarily complicate the problem and violate symmetry.

### Step 2: Incorporating Relative Motion and the Galilean Limit

*   **Plain-English Statement:** The origin of the S' frame (where $x'=0$) is moving at velocity $v$ in the S frame. So, in the S frame, this origin is located at $x=vt$. We can use this to simplify our linear transformation for $x'$. We also know that for very low speeds ($v \ll c$), the transformation should reduce to the classical Galilean transformation, where $x' = x - vt$. This suggests a form for $x'$ that incorporates $(x-vt)$.

*   **Small Concrete Example:** If your friend is on a train moving at $10 \text{ m/s}$ and you're at the station. After $1 \text{ second}$, your friend's origin ($x'=0$) is at $x=10 \text{ m}$ in your frame. So, if your friend measures an object at $x'=5 \text{ m}$, you would measure it at $x=10+5=15 \text{ m}$. This implies $x' = x - vt$ (or $x = x' + vt$).

*   **Formal/Mathematical Version:**
    From Step 1, we have $x' = A x + B t$.
    Consider the origin of S' (where $x'=0$). In frame S, this point moves according to $x = vt$.
    Substitute $x=vt$ and $x'=0$ into the equation for $x'$:
    $$0 = A(vt) + B t$$
    Since this must hold for any $t \neq 0$:
    $$B = -Av$$
    So, the transformation for $x'$ becomes:
    $$x' = A x - A v t = A(x - vt)$$
    Let's denote the constant $A$ as $\gamma$ (gamma). This factor $\gamma$ is known as the Lorentz factor.
    $$x' = \gamma(x - vt) \quad (Eq. 1)$$
    By the Principle of Relativity (the first postulate), the inverse transformation (from S' to S) must have the same form, but with the relative velocity reversed (S moves at $-v$ relative to S'):
    $$x = \gamma(x' + vt') \quad (Eq. 2)$$
    And as established, $y'=y$ and $z'=z$.

*   **What could go wrong:** Forgetting to apply the relative motion condition ($x=vt$ for $x'=0$), or not recognizing the symmetry for the inverse transformation. Assuming $\gamma=1$ at this stage would lead back to Galilean transformations, which we know are incorrect at high speeds.

### Step 3: Applying the Constancy of the Speed of Light

*   **Plain-English Statement:** This is the crucial step that distinguishes special relativity from classical physics. Imagine a flash of light emitted from the common origin at $t=t'=0$. According to the second postulate of special relativity, this light expands as a perfect sphere in *both* frames, S and S', and its speed is $c$ in both frames. This means the equation describing the light sphere must be the same in both frames.

*   **Small Concrete Example:** If a light pulse travels $300,000 \text{ km}$ in $1 \text{ second}$ in your frame, your friend on the super-fast train will *also* measure it traveling $300,000 \text{ km}$ in $1 \text{ second}$ in *their* frame. This seemingly impossible fact forces space and time to warp.

*   **Formal/Mathematical Version:**
    In frame S, the equation for a spherical light wave emitted at the origin at $t=0$ is:
    $$x^2 + y^2 + z^2 = (ct)^2$$
    $$x^2 + y^2 + z^2 - c^2t^2 = 0 \quad (Eq. 3)$$
    Similarly, in frame S', the equation for the same light wave emitted at the origin at $t'=0$ is:
    $$x'^2 + y'^2 + z'^2 = (ct')^2$$
    $$x'^2 + y'^2 + z'^2 - c^2t'^2 = 0 \quad (Eq. 4)$$
    Since $y'=y$ and $z'=z$, we can substitute these into Eq. 4:
    $$x'^2 + y^2 + z^2 - c^2t'^2 = 0 \quad (Eq. 5)$$
    Now, we have $x^2 - c^2t^2 = 0$ and $x'^2 - c^2t'^2 = 0$. This implies that the quantity $(x^2 - c^2t^2)$ must be proportional to $(x'^2 - c^2t'^2)$. Given the linearity and symmetry, this proportionality constant must be 1. (More rigorously, the invariant interval $ds^2 = -c^2dt^2 + dx^2 + dy^2 + dz^2$ must be the same in all inertial frames).
    So, for any event, not just light:
    $$x^2 - c^2t^2 = x'^2 - c^2t'^2 \quad (Eq. 6)$$
    This is a fundamental invariant of special relativity.

*   **What could go wrong:** Forgetting the $y'=y, z'=z$ part, or not understanding that the speed of light postulate implies an invariant relationship between space and time coordinates.

### Step 4: Deriving the Lorentz Factor ($\gamma$)

*   **Plain-English Statement:** We have equations for $x'$ and $x$, and we know the light sphere condition. We can use these to find the mysterious factor $\gamma$. We will substitute our expressions for $x'$ and $x$ into the invariant relationship derived from the constancy of the speed of light.

*   **Small Concrete Example:** Imagine you have two rulers, one made of regular material and one "relativistic" ruler. If you say a point is at $5 \text{ cm}$ on your regular ruler, the relativistic ruler might say it's at $5 \times \gamma \text{ cm}$. We're trying to figure out what that $\gamma$ factor is, based on how light behaves.

*   **Formal/Mathematical Version:**
    We have:
    1.  $x' = \gamma(x - vt)$
    2.  $x = \gamma(x' + vt')$
    3.  $x^2 - c^2t^2 = x'^2 - c^2t'^2$ (from Eq. 6, using $y'=y, z'=z$)

    Substitute Eq. 1 into Eq. 3:
    $$x^2 - c^2t^2 = [\gamma(x - vt)]^2 - c^2t'^2$$
    $$x^2 - c^2t^2 = \gamma^2(x - vt)^2 - c^2t'^2 \quad (Eq. 7)$$
    Now we need an expression for $t'$. Let's assume a linear form for $t'$:
    $$t' = G x + H t$$
    We can find $G$ and $H$ by using Eq. 2 and Eq. 7.
    From Eq. 2, $x' = x/\gamma - vt'$. Substitute this into Eq. 1:
    $$x/\gamma - vt' = \gamma(x - vt)$$
    $$x - \gamma v t' = \gamma^2(x - vt)$$
    $$\gamma v t' = x - \gamma^2(x - vt)$$
    $$\gamma v t' = x - \gamma^2 x + \gamma^2 v t$$
    $$t' = \frac{1}{\gamma v} [x(1 - \gamma^2) + \gamma^2 v t]$$
    $$t' = \gamma t + \frac{x}{\gamma v}(1 - \gamma^2) \quad (Eq. 8)$$
    This gives us a form for $t'$. Now we need to find $\gamma$.
    Let's go back to Eq. 6: $x^2 - c^2t^2 = x'^2 - c^2t'^2$.
    Substitute $x' = \gamma(x-vt)$ and $t' = \gamma(t - vx/c^2)$ (we're anticipating the result for $t'$ to make the derivation of $\gamma$ cleaner, but let's derive $t'$ properly first).

    A cleaner way to derive $\gamma$ and $t'$ simultaneously:
    We know $x' = \gamma(x-vt)$ and $x = \gamma(x'+vt')$.
    Also, $y'=y$ and $z'=z$.
    We need to find $t'$ in terms of $x$ and $t$. Let's assume $t' = \alpha t + \beta x$.
    Substitute $x', y', z', t'$ into the invariant interval:
    $$x^2 - c^2t^2 = x'^2 - c^2t'^2$$
    $$x^2 - c^2t^2 = [\gamma(x-vt)]^2 - c^2(\alpha t + \beta x)^2$$
    $$x^2 - c^2t^2 = \gamma^2(x^2 - 2xvt + v^2t^2) - c^2(\alpha^2 t^2 + 2\alpha\beta xt + \beta^2 x^2)$$
    $$x^2 - c^2t^2 = (\gamma^2 - c^2\beta^2)x^2 + (\gamma^2 v^2 - c^2\alpha^2)t^2 + (-2\gamma^2 v - 2c^2\alpha\beta)xt$$
    For this equation to hold for all $x$ and $t$, the coefficients of $x^2$, $t^2$, and $xt$ on both sides must match.
    Comparing coefficients:
    1.  Coefficient of $x^2$: $1 = \gamma^2 - c^2\beta^2 \quad (Eq. A)$
    2.  Coefficient of $t^2$: $-c^2 = \gamma^2 v^2 - c^2\alpha^2 \quad (Eq. B)$
    3.  Coefficient of $xt$: $0 = -2\gamma^2 v - 2c^2\alpha\beta \implies \gamma^2 v = -c^2\alpha\beta \quad (Eq. C)$

    From Eq. C, $\beta = -\frac{\gamma^2 v}{c^2\alpha}$.
    Substitute $\beta$ into Eq. A:
    $$1 = \gamma^2 - c^2 \left(-\frac{\gamma^2 v}{c^2\alpha}\right)^2$$
    $$1 = \gamma^2 - c^2 \frac{\gamma^4 v^2}{c^4\alpha^2}$$
    $$1 = \gamma^2 - \frac{\gamma^4 v^2}{c^2\alpha^2} \quad (Eq. D)$$
    From Eq. B, $c^2\alpha^2 = \gamma^2 v^2 + c^2 \implies \alpha^2 = \frac{\gamma^2 v^2}{c^2} + 1$.
    Substitute $\alpha^2$ into Eq. D:
    $$1 = \gamma^2 - \frac{\gamma^4 v^2}{c^2 \left(\frac{\gamma^2 v^2}{c^2} + 1\right)}$$
    $$1 = \gamma^2 - \frac{\gamma^4 v^2}{\gamma^2 v^2 + c^2}$$
    $$1 = \gamma^2 \left(1 - \frac{\gamma^2 v^2}{\gamma^2 v^2 + c^2}\right)$$
    $$1 = \gamma^2 \left(\frac{\gamma^2 v^2 + c^2 - \gamma^2 v^2}{\gamma^2 v^2 + c^2}\right)$$
    $$1 = \gamma^2 \left(\frac{c^2}{\gamma^2 v^2 + c^2}\right)$$
    $$\gamma^2 v^2 + c^2 = \gamma^2 c^2$$
    $$\gamma^2 c^2 - \gamma^2 v^2 = c^2$$
    $$\gamma^2 (c^2 - v^2) = c^2$$
    $$\gamma^2 = \frac{c^2}{c^2 - v^2} = \frac{1}{1 - v^2/c^2}$$
    $$\gamma = \frac{1}{\sqrt{1 - v^2/c^2}} \quad (Eq. 9)$$
    This is the Lorentz factor!

*   **What could go wrong:** Algebraic errors are very common here. Also, confusing $v$ with $c$ or forgetting the $c^2$ in the denominator. Not realizing that the coefficients must match for the equation to hold for all $x$ and $t$.

### Step 5: Deriving the Time Transformation ($t'$)

*   **Plain-English Statement:** Now that we have $\gamma$, we can go back and find the exact form for $t'$. Remember we assumed $t' = \alpha t + \beta x$. We can use the $\alpha$ and $\beta$ relationships we found earlier, now that we know $\gamma$.

*   **Small Concrete Example:** In classical physics, time is absolute ($t'=t$). But because the speed of light is constant, observers in relative motion disagree on the simultaneity of events, meaning time itself must transform. This transformation is what we're solving for.

*   **Formal/Mathematical Version:**
    We have $\gamma = \frac{1}{\sqrt{1 - v^2/c^2}}$.
    From Eq. B: $\alpha^2 = \frac{\gamma^2 v^2}{c^2} + 1$.
    Substitute $\gamma^2 = \frac{1}{1 - v^2/c^2}$:
    $$\alpha^2 = \frac{1}{1 - v^2/c^2} \frac{v^2}{c^2} + 1$$
    $$\alpha^2 = \frac{v^2/c^2}{1 - v^2/c^2} + \frac{1 - v^2/c^2}{1 - v^2/c^2}$$
    $$\alpha^2 = \frac{v^2/c^2 + 1 - v^2/c^2}{1 - v^2/c^2} = \frac{1}{1 - v^2/c^2}$$
    So, $\alpha = \frac{1}{\sqrt{1 - v^2/c^2}} = \gamma$.
    For the sign, we choose $\alpha = \gamma$ so that for $v \rightarrow 0$, $t' \rightarrow t$.

    From Eq. C: $\beta = -\frac{\gamma^2 v}{c^2\alpha}$.
    Substitute $\alpha = \gamma$:
    $$\beta = -\frac{\gamma^2 v}{c^2\gamma} = -\frac{\gamma v}{c^2}$$
    Now substitute $\alpha$ and $\beta$ back into $t' = \alpha t + \beta x$:
    $$t' = \gamma t - \frac{\gamma v}{c^2} x$$
    $$t' = \gamma \left(t - \frac{vx}{c^2}\right) \quad (Eq. 10)$$
    This is the time transformation equation!

*   **What could go wrong:** Sign errors for $\beta$, or forgetting the $c^2$ in the denominator of the $vx/c^2$ term. It's common to misremember this as just $vx$.

### Step 6: The Complete Lorentz Transformation

*   **Plain-English Statement:** We've successfully derived all the pieces! We now have a full set of equations that tell us how space and time coordinates change when moving between inertial frames at relativistic speeds.

*   **Formal/Mathematical Version:**
    The complete set of Lorentz transformation equations for frame S' moving with velocity $v$ along the positive x-axis relative to frame S are:
    $$x' = \gamma(x - vt)$$
    $$y' = y$$
    $$z' = z$$
    $$t' = \gamma\left(t - \frac{vx}{c^2}\right)$$
    where $\gamma = \frac{1}{\sqrt{1 - v^2/c^2}}$ is the Lorentz factor.

    The inverse Lorentz transformation (from S' to S) is found by simply replacing $v$ with $-v$ and swapping primed and unprimed coordinates:
    $$x = \gamma(x' + vt')$$
    $$y = y'$$
    $$z = z'$$
    $$t = \gamma\left(t' + \frac{vx'}{c^2}\right)$$

*   **What could go wrong:** Not being able to recall all four equations, or confusing the forward and inverse transformations.

## 5. Worked examples — multiple, with every step shown

We will use $c = 3 \times 10^8 \text{ m/s}$ unless specified.

### Example 1: Simple Coordinate Transformation (Easy)

**Problem:** An event occurs at position $x = 1000 \text{ m}$ and time $t = 5 \times 10^{-6} \text{ s}$ in frame S. What are the coordinates $(x', t')$ of this event in frame S', which is moving at a velocity $v = 0.6c$ along the positive x-axis relative to S?

**Given:**
*   $x = 1000 \text{ m}$
*   $t = 5 \times 10^{-6} \text{ s}$
*   $v = 0.6c$
*   $c = 3 \times 10^8 \text{ m/s}$

**Want:** $x'$ and $t'$

**Solution:**

**Step 1: Calculate the Lorentz factor $\gamma$.**
The Lorentz factor $\gamma$ depends only on the relative speed $v$.
$$\gamma = \frac{1}{\sqrt{1 - v^2/c^2}}$$
We are given $v = 0.6c$.
$$v^2/c^2 = (0.6c)^2 / c^2 = 0.36c^2 / c^2 = 0.36$$
So, substitute this value into the $\gamma$ equation:
$$\gamma = \frac{1}{\sqrt{1 - 0.36}}$$
$$\gamma = \frac{1}{\sqrt{0.64}}$$
$$\gamma = \frac{1}{0.8}$$
$$\gamma = 1.25$$
*Explanation: We first calculate the Lorentz factor, $\gamma$, which quantifies the relativistic effects. It's a fundamental part of the Lorentz transformation and depends solely on the relative velocity between the frames.*

**Step 2: Calculate $x'$ using the Lorentz transformation equation.**
The equation for $x'$ is:
$$x' = \gamma(x - vt)$$
Substitute the known values: $\gamma = 1.25$, $x = 1000 \text{ m}$, $v = 0.6c$, $t = 5 \times 10^{-6} \text{ s}$.
First, calculate $vt$:
$$vt = (0.6c) \times (5 \times 10^{-6} \text{ s})$$
$$vt = (0.6 \times 3 \times 10^8 \text{ m/s}) \times (5 \times 10^{-6} \text{ s})$$
$$vt = (1.8 \times 10^8 \text{ m/s}) \times (5 \times 10^{-6} \text{ s})$$
$$vt = 900 \text{ m}$$
Now substitute $vt$ into the $x'$ equation:
$$x' = 1.25(1000 \text{ m} - 900 \text{ m})$$
$$x' = 1.25(100 \text{ m})$$
$$x' = 125 \text{ m}$$
*Explanation: We use the Lorentz transformation equation for the spatial coordinate $x'$. This equation shows how the position of the event changes due to both the relative motion ($vt$) and the relativistic stretching/shrinking of space ($\gamma$ factor).*

**Step 3: Calculate $t'$ using the Lorentz transformation equation.**
The equation for $t'$ is:
$$t' = \gamma\left(t - \frac{vx}{c^2}\right)$$
Substitute the known values: $\gamma = 1.25$, $t = 5 \times 10^{-6} \text{ s}$, $v = 0.6c$, $x = 1000 \text{ m}$.
First, calculate $vx/c^2$:
$$\frac{vx}{c^2} = \frac{(0.6c) \times (1000 \text{ m})}{c^2}$$
$$\frac{vx}{c^2} = \frac{0.6 \times 1000 \text{ m}}{c}$$
$$\frac{vx}{c^2} = \frac{600 \text{ m}}{3 \times 10^8 \text{ m/s}}$$
$$\frac{vx}{c^2} = 2 \times 10^{-6} \text{ s}$$
Now substitute $vx/c^2$ into the $t'$ equation:
$$t' = 1.25(5 \times 10^{-6} \text{ s} - 2 \times 10^{-6} \text{ s})$$
$$t' = 1.25(3 \times 10^{-6} \text{ s})$$
$$t' = 3.75 \times 10^{-6} \text{ s}$$
*Explanation: We use the Lorentz transformation equation for the temporal coordinate $t'$. This equation is crucial as it demonstrates that time is not absolute; the time of an event is also transformed, depending on its position and the relative velocity. The $vx/c^2$ term accounts for the relativity of simultaneity.*

**Final Answer:**
The coordinates of the event in frame S' are:
$\boxed{x' = 125 \text{ m}}$
$\boxed{t' = 3.75 \times 10^{-6} \text{ s}}$

**Reflection:** This example demonstrates the fundamental application of the Lorentz transformation equations. The tricky part is ensuring correct calculation of $\gamma$ and careful substitution, especially with the $vx/c^2$ term for time, which often catches students out. Note that both the position and time measurements are different in the moving frame, as expected.

### Example 2: Inverse Transformation and Simultaneity (Medium)

**Problem:** Two events, A and B, occur in frame S' at $x'_A = 0 \text{ m}$, $t'_A = 0 \text{ s}$ and $x'_B = 300 \text{ m}$, $t'_B = 0 \text{ s}$. Frame S' moves at $v = 0.8c$ relative to frame S along the common x-axis. What are the coordinates $(x, t)$ for both events in frame S? Are the events simultaneous in frame S?

**Given:**
*   For Event A: $x'_A = 0 \text{ m}$, $t'_A = 0 \text{ s}$
*   For Event B: $x'_B = 300 \text{ m}$, $t'_B = 0 \text{ s}$
*   $v = 0.8c$
*   $c = 3 \times 10^8 \text{ m/s}$

**Want:** $(x_A, t_A)$ and $(x_B, t_B)$ in frame S. Determine if $t_A = t_B$.

**Solution:**

**Step 1: Calculate the Lorentz factor $\gamma$.**
$$v = 0.8c \implies v^2/c^2 = (0.8c)^2 / c^2 = 0.64$$
$$\gamma = \frac{1}{\sqrt{1 - v^2/c^2}}$$
$$\gamma = \frac{1}{\sqrt{1 - 0.64}}$$
$$\gamma = \frac{1}{\sqrt{0.36}}$$
$$\gamma = \frac{1}{0.6}$$
$$\gamma = \frac{5}{3} \approx 1.6667$$
*Explanation: As before, we start by calculating the Lorentz factor, which will be applied to both events.*

**Step 2: Apply the inverse Lorentz transformation for Event A.**
The inverse Lorentz transformation equations are:
$$x = \gamma(x' + vt')$$
$$t = \gamma\left(t' + \frac{vx'}{c^2}\right)$$
For Event A: $x'_A = 0 \text{ m}$, $t'_A = 0 \text{ s}$.
$$x_A = \gamma(0 \text{ m} + v \times 0 \text{ s})$$
$$x_A = \gamma(0)$$
$$x_A = 0 \text{ m}$$
$$t_A = \gamma\left(0 \text{ s} + \frac{v \times 0 \text{ m}}{c^2}\right)$$
$$t_A = \gamma(0)$$
$$t_A = 0 \text{ s}$$
*Explanation: For an event at the origin of S' at $t'=0$, its coordinates in S are also $(0,0)$ because the origins coincide at $t=t'=0$. This serves as a good check for the equations.*

**Step 3: Apply the inverse Lorentz transformation for Event B.**
For Event B: $x'_B = 300 \text{ m}$, $t'_B = 0 \text{ s}$.
$$x_B = \gamma(x'_B + vt'_B)$$
$$x_B = \frac{5}{3}(300 \text{ m} + (0.8c) \times 0 \text{ s})$$
$$x_B = \frac{5}{3}(300 \text{ m})$$
$$x_B = 500 \text{ m}$$
$$t_B = \gamma\left(t'_B + \frac{vx'_B}{c^2}\right)$$
$$t_B = \frac{5}{3}\left(0 \text{ s} + \frac{(0.8c) \times (300 \text{ m})}{c^2}\right)$$
$$t_B = \frac{5}{3}\left(\frac{0.8 \times 300 \text{ m}}{c}\right)$$
$$t_B = \frac{5}{3}\left(\frac{240 \text{ m}}{3 \times 10^8 \text{ m/s}}\right)$$
$$t_B = \frac{5}{3}(8 \times 10^{-7} \text{ s})$$
$$t_B = \frac{40}{3} \times 10^{-7} \text{ s} \approx 13.33 \times 10^{-7} \text{ s}$$
$$t_B \approx 1.333 \times 10^{-6} \text{ s}$$
*Explanation: We apply the inverse transformation for Event B. Notice that even though $t'_B=0$, $t_B$ is not zero. This is the phenomenon of the relativity of simultaneity.*

**Step 4: Check for simultaneity in frame S.**
In frame S', both events occurred at $t'_A = 0 \text{ s}$ and $t'_B = 0 \text{ s}$, so they are simultaneous in S'.
In frame S, we found:
$t_A = 0 \text{ s}$
$t_B \approx 1.333 \times 10^{-6} \text{ s}$
Since $t_A \neq t_B$, the events are **not simultaneous** in frame S.

**Final Answer:**
For Event A: $\boxed{x_A = 0 \text{ m}, t_A = 0 \text{ s}}$
For Event B: $\boxed{x_B = 500 \text{ m}, t_B \approx 1.333 \times 10^{-6} \text{ s}}$
The events are **not simultaneous** in frame S.

**Reflection:** This example highlights the relativity of simultaneity, a direct consequence of the Lorentz transformation. Events that are simultaneous in one frame ($t'_A = t'_B$) are generally not simultaneous in another frame moving relative to the first ($t_A \neq t_B$), unless they occur at the same spatial location ($x'_A = x'_B$). The $vx'/c^2$ term in the time transformation is responsible for this effect.

### Example 3: Invariant Spacetime Interval (Hard)

**Problem:** An event occurs at $x = 2 \times 10^8 \text{ m}$ and $t = 1 \text{ s}$ in frame S. A second event occurs at $x_2 = 3 \times 10^8 \text{ m}$ and $t_2 = 2 \text{ s}$ in frame S. Calculate the spacetime interval squared $(\Delta s)^2$ between these two events in frame S. Then, transform these events to frame S' moving at $v = 0.5c$ relative to S, and calculate $(\Delta s')^2$ to verify its invariance.

**Given:**
*   Event 1 (in S): $(x_1, t_1) = (2 \times 10^8 \text{ m}, 1 \text{ s})$
*   Event 2 (in S): $(x_2, t_2) = (3 \times 10^8 \text{ m}, 2 \text{ s})$
*   Relative velocity $v = 0.5c$
*   $c = 3 \times 10^8 \text{ m/s}$

**Want:** $(\Delta s)^2$ in S, $(\Delta s')^2$ in S', and verify $(\Delta s)^2 = (\Delta s')^2$.

**Solution:**

**Step 1: Calculate the spacetime interval squared $(\Delta s)^2$ in frame S.**
The spacetime interval squared is given by:
$$(\Delta s)^2 = -c^2(\Delta t)^2 + (\Delta x)^2 + (\Delta y)^2 + (\Delta z)^2$$
Since motion is only along x, and we are not given y or z coordinates, we assume $\Delta y = 0$ and $\Delta z = 0$.
$$\Delta x = x_2 - x_1 = 3 \times 10^8 \text{ m} - 2 \times 10^8 \text{ m} = 1 \times 10^8 \text{ m}$$
$$\Delta t = t_2 - t_1 = 2 \text{ s} - 1 \text{ s} = 1 \text{ s}$$
Substitute these values:
$$(\Delta s)^2 = -(3 \times 10^8 \text{ m/s})^2 (1 \text{ s})^2 + (1 \times 10^8 \text{ m})^2$$
$$(\Delta s)^2 = -(9 \times 10^{16} \text{ m}^2/\text{s}^2) (1 \text{ s}^2) + (1 \times 10^{16} \text{ m}^2)$$
$$(\Delta s)^2 = -9 \times 10^{16} \text{ m}^2 + 1 \times 10^{16} \text{ m}^2$$
$$(\Delta s)^2 = -8 \times 10^{16} \text{ m}^2$$
*Explanation: We calculate the spacetime interval in the initial frame S. This interval is a fundamental quantity in special relativity, representing the "distance" between two events in spacetime. Its sign (negative here) indicates a time-like interval, meaning enough time passes for light to travel between the events.*

**Step 2: Calculate the Lorentz factor $\gamma$.**
$$v = 0.5c \implies v^2/c^2 = (0.5c)^2 / c^2 = 0.25$$
$$\gamma = \frac{1}{\sqrt{1 - 0.25}}$$
$$\gamma = \frac{1}{\sqrt{0.75}}$$
$$\gamma = \frac{1}{\sqrt{3/4}} = \frac{2}{\sqrt{3}} \approx 1.1547$$
*Explanation: Calculate $\gamma$ for the given relative velocity, as it's needed for the transformation.*

**Step 3: Transform Event 1 to frame S'.**
$$x'_1 = \gamma(x_1 - vt_1)$$
$$x'_1 = \frac{2}{\sqrt{3}}(2 \times 10^8 \text{ m} - (0.5c)(1 \text{ s}))$$
$$x'_1 = \frac{2}{\sqrt{3}}(2 \times 10^8 \text{ m} - (0.5 \times 3 \times 10^8 \text{ m/s})(1 \text{ s}))$$
$$x'_1 = \frac{2}{\sqrt{3}}(2 \times 10^8 \text{ m} - 1.5 \times 10^8 \text{ m})$$
$$x'_1 = \frac{2}{\sqrt{3}}(0.5 \times 10^8 \text{ m}) = \frac{1}{\sqrt{3}} \times 10^8 \text{ m} \approx 0.577 \times 10^8 \text{ m}$$
$$t'_1 = \gamma\left(t_1 - \frac{vx_1}{c^2}\right)$$
$$t'_1 = \frac{2}{\sqrt{3}}\left(1 \text{ s} - \frac{(0.5c)(2 \times 10^8 \text{ m})}{c^2}\right)$$
$$t'_1 = \frac{2}{\sqrt{3}}\left(1 \text{ s} - \frac{0.5 \times 2 \times 10^8 \text{ m}}{c}\right)$$
$$t'_1 = \frac{2}{\sqrt{3}}\left(1 \text{ s} - \frac{1 \times 10^8 \text{ m}}{3 \times 10^8 \text{ m/s}}\right)$$
$$t'_1 = \frac{2}{\sqrt{3}}\left(1 \text{ s} - \frac{1}{3} \text{ s}\right)$$
$$t'_1 = \frac{2}{\sqrt{3}}\left(\frac{2}{3} \text{ s}\right) = \frac{4}{3\sqrt{3}} \text{ s} \approx 0.7698 \text{ s}$$
*Explanation: Apply the Lorentz transformation to the coordinates of the first event to find its coordinates in the moving frame S'.*

**Step 4: Transform Event 2 to frame S'.**
$$x'_2 = \gamma(x_2 - vt_2)$$
$$x'_2 = \frac{2}{\sqrt{3}}(3 \times 10^8 \text{ m} - (0.5c)(2 \text{ s}))$$
$$x'_2 = \frac{2}{\sqrt{3}}(3 \times 10^8 \text{ m} - (0.5 \times 3 \times 10^8 \text{ m/s})(2 \text{ s}))$$
$$x'_2 = \frac{2}{\sqrt{3}}(3 \times 10^8 \text{ m} - 3 \times 10^8 \text{ m})$$
$$x'_2 = \frac{2}{\sqrt{3}}(0 \text{ m}) = 0 \text{ m}$$
$$t'_2 = \gamma\left(t_2 - \frac{vx_2}{c^2}\right)$$
$$t'_2 = \frac{2}{\sqrt{3}}\left(2 \text{ s} - \frac{(0.5c)(3 \times 10^8 \text{ m})}{c^2}\right)$$
$$t'_2 = \frac{2}{\sqrt{3}}\left(2 \text{ s} - \frac{0.5 \times 3 \times 10^8 \text{ m}}{c}\right)$$
$$t'_2 = \frac{2}{\sqrt{3}}\left(2 \text{ s} - \frac{1.5 \times 10^8 \text{ m}}{3 \times 10^8 \text{ m/s}}\right)$$
$$t'_2 = \frac{2}{\sqrt{3}}\left(2 \text{ s} - 0.5 \text{ s}\right)$$
$$t'_2 = \frac{2}{\sqrt{3}}(1.5 \text{ s}) = \frac{3}{\sqrt{3}} \text{ s} = \sqrt{3} \text{ s} \approx 1.732 \text{ s}$$
*Explanation: Apply the Lorentz transformation to the coordinates of the second event to find its coordinates in the moving frame S'.*

**Step 5: Calculate the spacetime interval squared $(\Delta s')^2$ in frame S'.**
$$\Delta x' = x'_2 - x'_1 = 0 \text{ m} - \frac{1}{\sqrt{3}} \times 10^8 \text{ m} = -\frac{1}{\sqrt{3}} \times 10^8 \text{ m}$$
$$\Delta t' = t'_2 - t'_1 = \sqrt{3} \text{ s} - \frac{4}{3\sqrt{3}} \text{ s} = \left(\frac{3 \times 3 - 4}{3\sqrt{3}}\right) \text{ s} = \frac{5}{3\sqrt{3}} \text{ s}$$
Now calculate $(\Delta s')^2$:
$$(\Delta s')^2 = -c^2(\Delta t')^2 + (\Delta x')^2$$
$$(\Delta s')^2 = -(3 \times 10^8 \text{ m/s})^2 \left(\frac{5}{3\sqrt{3}} \text{ s}\right)^2 + \left(-\frac{1}{\sqrt{3}} \times 10^8 \text{ m}\right)^2$$
$$(\Delta s')^2 = -(9 \times 10^{16}) \left(\frac{25}{9 \times 3}\right) + \left(\frac{1}{3} \times 10^{16}\right)$$
$$(\Delta s')^2 = -(9 \times 10^{16}) \left(\frac{25}{27}\right) + \left(\frac{1}{3} \times 10^{16}\right)$$
$$(\Delta s')^2 = -\frac{25}{3} \times 10^{16} + \frac{1}{3} \times 10^{16}$$
$$(\Delta s')^2 = -\frac{24}{3} \times 10^{16}$$
$$(\Delta s')^2 = -8 \times 10^{16} \text{ m}^2$$
*Explanation: We calculate the spacetime interval in the second frame S' using the newly transformed coordinates. The critical check here is to see if this value matches the interval calculated in the first frame.*

**Step 6: Verify invariance.**
We found $(\Delta s)^2 = -8 \times 10^{16} \text{ m}^2$ and $(\Delta s')^2 = -8 \times 10^{16} \text{ m}^2$.
Thus, $(\Delta s)^2 = (\Delta s')^2$. The spacetime interval is invariant under Lorentz transformations.

**Final Answer:**
The spacetime interval squared in frame S is $\boxed{(\Delta s)^2 = -8 \times 10^{16} \text{ m}^2}$.
The spacetime interval squared in frame S' is $\boxed{(\Delta s')^2 = -8 \times 10^{16} \text{ m}^2}$.
The invariance is **verified**.

**Reflection:** This example is harder due to the multiple steps and the need for meticulous algebraic handling of fractions and powers of 10. The core idea is to demonstrate the invariance of the spacetime interval, a cornerstone of special relativity. This invariance is what the Lorentz transformations are designed to preserve, and seeing it work out numerically provides a strong confirmation of the theory.

### Example 4: Finding Velocity from Transformed Coordinates (Harder)

**Problem:** An event occurs at $(x, t) = (100 \text{ m}, 1 \times 10^{-7} \text{ s})$ in frame S. The same event is observed in frame S' at $(x', t') = (50 \text{ m}, 0 \text{ s})$. Assuming the relative velocity $v$ is along the x-axis, find the magnitude and direction of $v$.

**Given:**
*   In S: $x = 100 \text{ m}$, $t = 1 \times 10^{-7} \text{ s}$
*   In S': $x' = 50 \text{ m}$, $t' = 0 \text{ s}$
*   $c = 3 \times 10^8 \text{ m/s}$

**Want:** $v$

**Solution:**

**Step 1: Write down the Lorentz transformation equations for $x'$ and $t'$.**
$$x' = \gamma(x - vt) \quad (Eq. 1)$$
$$t' = \gamma\left(t - \frac{vx}{c^2}\right) \quad (Eq. 2)$$
We also know $\gamma = \frac{1}{\sqrt{1 - v^2/c^2}}$.
*Explanation: Start by writing the relevant Lorentz transformation equations that connect the known quantities in both frames.*

**Step 2: Substitute the known values into Eq. 2.**
We are given $t' = 0$:
$$0 = \gamma\left(t - \frac{vx}{c^2}\right)$$
Since $\gamma$ cannot be zero (unless $v=c$, which is a special case we'll address later, but $\gamma$ is generally positive and finite for $v<c$), the term in the parenthesis must be zero:
$$t - \frac{vx}{c^2} = 0$$
Now, substitute the given $t$ and $x$ values:
$$1 \times 10^{-7} \text{ s} - \frac{v(100 \text{ m})}{(3 \times 10^8 \text{ m/s})^2} = 0$$
$$1 \times 10^{-7} - \frac{100v}{9 \times 10^{16}} = 0$$
$$1 \times 10^{-7} = \frac{100v}{9 \times 10^{16}}$$
Solve for $v$:
$$v = \frac{(1 \times 10^{-7}) \times (9 \times 10^{16})}{100}$$
$$v = \frac{9 \times 10^9}{100}$$
$$v = 9 \times 10^7 \text{ m/s}$$
*Explanation: The fact that $t'=0$ is a strong condition. It allows us to simplify the time transformation equation and directly solve for $v$ without needing $\gamma$ yet. This is a common trick for such problems.*

**Step 3: Convert $v$ to a multiple of $c$ and check if it's less than $c$.**
$$v = 9 \times 10^7 \text{ m/s}$$
We know $c = 3 \times 10^8 \text{ m/s}$.
$$v = \frac{9 \times 10^7}{3 \times 10^8} c = \frac{9}{30} c = \frac{3}{10} c = 0.3c$$
Since $v = 0.3c < c$, this is a valid relativistic speed.
*Explanation: It's good practice to express relativistic velocities as a fraction of $c$ and to ensure the calculated speed is physically possible (i.e., less than $c$).*

**Step 4: (Optional) Verify with Eq. 1.**
Now that we have $v$, we can calculate $\gamma$ and check if Eq. 1 holds true.
$$v = 0.3c \implies v^2/c^2 = (0.3c)^2/c^2 = 0.09$$
$$\gamma = \frac{1}{\sqrt{1 - 0.09}} = \frac{1}{\sqrt{0.91}} \approx 1.0483$$
Now substitute into Eq. 1:
$$x' = \gamma(x - vt)$$
$$50 \text{ m} = 1.0483(100 \text{ m} - (0.3c)(1 \times 10^{-7} \text{ s}))$$
$$50 \text{ m} = 1.0483(100 \text{ m} - (0.3 \times 3 \times 10^8 \text{ m/s})(1 \times 10^{-7} \text{ s}))$$
$$50 \text{ m} = 1.0483(100 \text{ m} - (9 \times 10^7 \text{ m/s})(1 \times 10^{-7} \text{ s}))$$
$$50 \text{ m} = 1.0483(100 \text{ m} - 9 \text{ m})$$
$$50 \text{ m} = 1.0483(91 \text{ m})$$
$$50 \text{ m} \approx 95.39 \text{ m}$$
This doesn't match! What went wrong? Ah, I made a mistake in the prompt: $x'=50$. Let me re-evaluate the problem.

Let's re-solve Step 2 and 4.
The issue is that I used $x'=50$ directly as a check, but it *must* be consistent. If $t'=0$, then $v=0.3c$. Now, *given* $v=0.3c$, what should $x'$ be?
$$x' = \gamma(x - vt)$$
$$x' = 1.0483(100 \text{ m} - (0.3c)(1 \times 10^{-7} \text{ s}))$$
$$x' = 1.0483(100 \text{ m} - (0.3 \times 3 \times 10^8 \text{ m/s})(1 \times 10^{-7} \text{ s}))$$
$$x' = 1.0483(100 \text{ m} - 9 \text{ m})$$
$$x' = 1.0483(91 \text{ m})$$
$$x' \approx 95.39 \text{ m}$$
So, if $t'=0$, then $x'$ must be $95.39 \text{ m}$, not $50 \text{ m}$. This means the problem setup itself was slightly inconsistent for a simple check. This is an important lesson in physics: if your derived values don't match the given ones, there might be an issue with the premise or the math.

Let's assume the given $x'$ and $t'$ are correct, and we need to solve for $v$ using *both* equations. This is the "Harder" part.

**Revised Step 2: Use both equations to solve for $v$.**
From Eq. 2, $t' = \gamma(t - vx/c^2)$:
$$0 = \gamma(1 \times 10^{-7} - v(100)/c^2)$$
Since $\gamma \neq 0$, we have:
$$1 \times 10^{-7} - \frac{100