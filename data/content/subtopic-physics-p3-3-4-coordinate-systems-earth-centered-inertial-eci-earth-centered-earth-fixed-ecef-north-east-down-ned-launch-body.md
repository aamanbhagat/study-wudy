## What it is
Coordinate systems in astrodynamics are standardized frameworks for specifying an object's position, velocity, and orientation. Each system is defined by an origin (where $(0,0,0)$ is) and a set of three orthogonal axes (which way $x, y, z$ point). We use different systems because some are better suited for describing orbital motion under physical laws, while others are more convenient for specifying locations on Earth or the orientation of a vehicle.

## Why it matters
These coordinate systems are the bedrock of guidance, navigation, and control (GNC). Newton's laws of motion are valid in an inertial frame (ECI), so all orbital mechanics calculations happen there. GPS provides position in an Earth-fixed frame (ECEF), and your rocket's sensors (IMUs) measure acceleration and rotation in the body frame. To fly a trajectory, you must constantly transform data between these frames to know where you are (navigation), where you're going (guidance), and how to orient the engines to get there (control).

## When to study it
Before tackling this, you must have a firm grasp of several prerequisites:
1.  **Vectors:** Full mastery of vector addition, subtraction, dot products, and cross products.
2.  **Linear Algebra:** Specifically, matrix multiplication and the properties of rotation matrices (orthogonality, i.e., $R^T R = I$, and $\det(R)=1$).
3.  **Kinematics:** Understanding of position, velocity, and acceleration as vectors, and their derivatives.
4.  **Newtonian Mechanics:** A clear understanding of inertial versus non-inertial reference frames and Newton's Second Law ($F=ma$).

If you are shaky on rotation matrices or inertial frames, review those topics first. This subtopic is entirely about applying those concepts.

## How to study it (step by step)
1.  **Define the Frames (30 min):** For each of the five frames (ECI, ECEF, NED, launch, body), write down its origin and the precise definition of its three axes. Draw a simple sketch for each one relative to the Earth or the rocket. Do not proceed until you can do this from memory.
2.  **Master Single-Axis Rotations (20 min):** Derive the three principal rotation matrices, $R_x(\theta)$, $R_y(\theta)$, and $R_z(\theta)$, from first principles using trigonometry on a 2D projection of the axes. Understand that these matrices transform the *components* of a vector from one frame to another.
3.  **Derive the ECI to ECEF Transformation (30 min):** The ECEF frame co-rotates with the Earth. This means the transformation from ECI is a single rotation about the shared Z-axis. Derive the rotation matrix $R_{ECI \to ECEF}(t)$, noting that the angle is time-dependent, $\theta(t) = \omega_E t + \theta_0$, where $\omega_E$ is Earth's rotational speed.
4.  **Derive the ECEF to NED Transformation (30 min):** This is a sequence of two rotations. Place an origin on the Earth's surface at latitude $\phi$ and longitude $\lambda$. First, rotate around the ECEF Z-axis by $\lambda$. Then, rotate around the new intermediate Y-axis by $90^\circ - \phi$. Combine these matrices to find the full transformation.
5.  **Solve a Transformation Problem (20 min):** Find the coordinates of the launch pad at Kennedy Space Center (Lat: 28.6° N, Lon: 80.6° W) in the ECEF frame, assuming a spherical Earth with radius $R_E = 6378$ km. Then, find the ECI coordinates of a satellite directly overhead, assuming its ECI Z-coordinate is $R_E + 500$ km and its X/Y coordinates lie in the plane of the launch site's meridian at that instant.

## Key ideas, with intuition
1.  **Inertial vs. Rotating Frames:** Newton's laws are clean in an inertial frame ($F=ma$). The ECI frame is our best local approximation: its origin is Earth's center, but its axes are fixed relative to distant stars, so it doesn't rotate with the Earth. In a rotating frame like ECEF, objects appear to be acted upon by "fictitious" forces (Coriolis, centrifugal) because the frame itself is accelerating.
    *   **Intuition:** Imagine being on a merry-go-round (a rotating frame). If you slide a puck straight towards the center, it appears to curve. This is the Coriolis effect. In an inertial frame (standing on the ground), the puck moves in a straight line. The physics is the same, but the description changes with the frame.

2.  **A Coordinate System = Origin + Basis Vectors:** Every frame is defined by two things: where its origin is, and which directions its basis vectors $(\hat{i}, \hat{j}, \hat{k})$ point. ECI and ECEF share an origin but have different basis vectors (one is fixed, one rotates). NED has a different origin (a local point on the surface) and different basis vectors.

3.  **Rotation Matrices Change Your Point of View:** A rotation matrix $R_{A \to B}$ does not change a physical vector, it changes the coordinate system in which you express that vector's components. The operation $\vec{v}_B = R_{A \to B} \vec{v}_A$ answers the question: "If a vector has components $\vec{v}_A$ in frame A, what are its components in frame B?"
    $$
    \vec{v}_B = \begin{bmatrix} v_{Bx} \\ v_{By} \\ v_{Bz} \end{bmatrix} = R_{A \to B} \begin{bmatrix} v_{Ax} \\ v_{Ay} \\ v_{Az} \end{bmatrix}
    $$

4.  **The Transport Equation (The Formalism):** The time derivative of a vector depends on the frame you're in. If frame B rotates with angular velocity $\vec{\omega}_{A/B}$ relative to frame A, then the time derivative of any vector $\vec{r}$ is:
    $$
    \left(\frac{d\vec{r}}{dt}\right)_A = \left(\frac{d\vec{r}}{dt}\right)_B + \vec{\omega}_{A/B} \times \vec{r}
    $$
    This is the key to relating velocities and accelerations between frames, and it's where the fictitious forces formally come from when you apply it to Newton's second law.

## Worked example
**Problem:** A radar station is located at latitude $\phi = 30^\circ$ N and longitude $\lambda = 60^\circ$ E. It tracks an aircraft and reports its position in the local NED frame as $\vec{p}_{NED} = [10, 20, -5]^T$ km. Find the aircraft's position vector in the ECEF frame. Assume a spherical Earth with radius $R_E = 6378$ km.

**Step 1: Find the position of the radar station (the origin of the NED frame) in ECEF.**
The transformation from geodetic coordinates (latitude $\phi$, longitude $\lambda$, altitude $h$) to ECEF coordinates $(X, Y, Z)$ is:
$$
X = (R_E + h) \cos\phi \cos\lambda \\
Y = (R_E + h) \cos\phi \sin\lambda \\
Z = (R_E + h) \sin\phi
$$
Here, the station is on the surface, so $h=0$.
$R_E = 6378$ km, $\phi = 30^\circ$, $\lambda = 60^\circ$.
$X_{st} = 6378 \cos(30^\circ) \cos(60^\circ) = 6378 \cdot (\sqrt{3}/2) \cdot (1/2) \approx 2761.8$ km.
$Y_{st} = 6378 \cos(30^\circ) \sin(60^\circ) = 6378 \cdot (\sqrt{3}/2) \cdot (\sqrt{3}/2) = 4783.5$ km.
$Z_{st} = 6378 \sin(30^\circ) = 6378 \cdot (1/2) = 3189$ km.
So, $\vec{p}_{st, ECEF} = [2761.8, 4783.5, 3189]^T$ km.

**Step 2: Determine the rotation matrix from NED to ECEF.**
We need to transform the vector $\vec{p}_{NED}$ into the ECEF frame. This means we need the rotation matrix $R_{NED \to ECEF}$. It's often easier to first find $R_{ECEF \to NED}$ and then use the property $R_{NED \to ECEF} = R_{ECEF \to NED}^T$.

The transformation from ECEF to NED is a rotation by $\lambda$ about Z, then a rotation by $90^\circ - \phi$ about the new Y-axis. A more direct construction is to define the NED basis vectors in the ECEF frame:
$\hat{n} = [-\sin\phi \cos\lambda, -\sin\phi \sin\lambda, \cos\phi]^T$
$\hat{e} = [-\sin\lambda, \cos\lambda, 0]^T$
$\hat{d} = [-\cos\phi \cos\lambda, -\cos\phi \sin\lambda, -\sin\phi]^T$
$R_{NED \to ECEF} = [\hat{n} | \hat{e} | \hat{d}]$ is incorrect. The columns of the rotation matrix $R_{A \to B}$ are the basis vectors of frame A expressed in frame B. So, the columns of $R_{NED \to ECEF}$ are the NED basis vectors $(\hat{n}, \hat{e}, \hat{d})$ expressed in ECEF coordinates.
$$
R_{NED \to ECEF} =
\begin{bmatrix}
-\sin\phi \cos\lambda & -\sin\lambda & -\cos\phi \cos\lambda \\
-\sin\phi \sin\lambda & \cos\lambda & -\cos\phi \sin\lambda \\
\cos\phi & 0 & -\sin\phi
\end{bmatrix}
$$
Plugging in $\phi = 30^\circ, \lambda = 60^\circ$:
$\sin\phi = 1/2$, $\cos\phi = \sqrt{3}/2$
$\sin\lambda = \sqrt{3}/2$, $\cos\lambda = 1/2$
$$
R_{NED \to ECEF} =
\begin{bmatrix}
-1/4 & -\sqrt{3}/2 & -\sqrt{3}/4 \\
-\sqrt{3}/4 & 1/2 & -3/4 \\
\sqrt{3}/2 & 0 & -1/2
\end{bmatrix}
$$

**Step 3: Transform the aircraft's local position vector into the ECEF frame.**
$\vec{p}_{acft\_local, ECEF} = R_{NED \to ECEF} \cdot \vec{p}_{NED}$
$$
\vec{p}_{acft\_local, ECEF} =
\begin{bmatrix}
-0.25 & -0.866 & -0.433 \\
-0.433 & 0.5 & -0.75 \\
0.866 & 0 & -0.5
\end{bmatrix}
\begin{bmatrix} 10 \\ 20 \\ -5 \end{bmatrix}
=
\begin{bmatrix}
-2.5 - 17.32 + 2.165 \\
-4.33 + 10 + 3.75 \\
8.66 + 0 + 2.5
\end{bmatrix}
=
\begin{bmatrix} -17.655 \\ 9.42 \\ 11.16 \end{bmatrix} \text{km}
$$

**Step 4: Add the station's position to get the aircraft's absolute ECEF position.**
The aircraft's total position is the station's position plus the aircraft's position relative to the station.
$\vec{p}_{acft, ECEF} = \vec{p}_{st, ECEF} + \vec{p}_{acft\_local, ECEF}$
$$
\vec{p}_{acft, ECEF} = \begin{bmatrix} 2761.8 \\ 4783.5 \\ 3189 \end{bmatrix} + \begin{bmatrix} -17.655 \\ 9.42 \\ 11.16 \end{bmatrix} = \begin{bmatrix} 2744.145 \\ 4792.92 \\ 3200.16 \end{bmatrix} \text{km}
$$

**Reflection:**
- Step 1 worked because any local measurement must be referenced to a global frame, which requires finding the origin of the local frame (the station) in the global frame (ECEF).
- Step 2 worked because a rotation matrix is the correct mathematical tool to change the representation of a vector between two frames with different orientations but a shared origin (instantaneously).
- Step 3 applied this transformation.
- Step 4 correctly combined the relative position vector with the origin's position vector using simple vector addition to get the final absolute position.

## Diagrams

ECI and ECEF Frames:
```text
      Vernal Equinox (direction of X_ECI)
          /
         /
        *
        | Z_ECI, Z_ECEF (North Pole)
        |
        |
        |----------- Y_ECEF (rotating with Earth)
       /|
      / |
     /  |
    O---|----------- X_ECEF (rotating with Earth, Prime Meridian)
   / \  |
  /   \ |
 /     \|
Y_ECI   (Earth's rotation ω_E about Z axis)
```

ECEF and NED Frames:
```text
          Z_ECEF (North Pole)
             ^
            /
           /
          /
         * P (Lat φ, Lon λ)
        /|\
       / | \ -> East (e)
      /  |  \
     /   |   -> North (n)
    O----|--------------> X_ECEF (Prime Meridian)
     \   |
      \  |
       \ |
        \|
         Y_ECEF

(At point P on the surface, the Down (d) vector points towards the origin O.
 The North (n) vector is tangent, pointing towards the North Pole.
 The East (e) vector is tangent, completing the right-handed system.)
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Imagine you are launching a rocket.
    -   The laws of **I**nertia govern its orbit in space (**ECI**).
    -   You track it from the ground, which is **F**ixed to the **E**arth (**ECEF**).
    -   The local launch tower operator cares about **N**orth, **E**ast, and **D**own (**NED**).
    -   The rocket itself only knows its own **Body** frame (forward, sideways, up).
    -   The story flows from universal physics -> global position -> local position -> vehicle orientation.

2.  **Must-Overlearn Formulas:**
    -   The relationship between a rotation matrix and its inverse (transpose): $R_{B \to A} = R_{A \to B}^{-1} = R_{A \to B}^T$.
    -   The three principal rotation matrices. You must be able to write them down instantly. Example for Z-axis:
        $$
        R_z(\theta) = \begin{bmatrix} \cos\theta & \sin\theta & 0 \\ -\sin\theta & \cos\theta & 0 \\ 0 & 0 & 1 \end{bmatrix}
        $$
        *(Note: This is for rotating the frame. Rotating the vector is the transpose. Be consistent with your convention. The convention used here is for transforming vector components from the old frame to the new, rotated frame.)*

3.  **Spaced Repetition Schedule:**
    -   Review these definitions and the ECEF-to-NED derivation in **1 day**.
    -   Re-derive it from scratch in **3 days**.
    -   Solve a new transformation problem in **7 days**.
    -   Explain the difference between ECI and ECEF to a friend (or a wall) in **16 days**.
    -   Derive the transport equation in **35 days**.

4.  **First Principles Pathway:** If you forget a complex rotation matrix like $R_{ECEF \to NED}$, rebuild it. Remember that the columns of the matrix $R_{A \to B}$ are just the basis vectors of frame A expressed in the coordinates of frame B. Draw the ECEF axes, draw the NED axes at a point $(\phi, \lambda)$, and use trigonometry to project $\hat{n}, \hat{e}, \hat{d}$ onto the $\hat{X}, \hat{Y}, \hat{Z}$ axes.

## Common mistakes
1.  **Inverse/Transpose Confusion:** Using $R_{A \to B}$ when you need $R_{B \to A}$. Always write the subscripts clearly and remember $R_{B \to A} = R_{A \to B}^T$. If you transform a vector to a new frame and it doesn't make sense, the first thing to check is if you used the transpose.
2.  **Forgetting Time-Dependence:** The transformation between ECI and ECEF is not constant. It's $R_{ECI \to ECEF}(t)$. A fixed location in ECEF is moving in ECI. This is a critical error in orbital calculations.
3.  **Mixing up NED and ENU:** Aerospace often uses North-East-Down (NED), while other fields use East-North-Up (ENU). They are different frames with different basis vectors. Using the wrong one will flip signs and swap axes, leading to catastrophic failure in a real system.
4.  **Adding Vectors from Different Frames:** You cannot add $\vec{v}_A + \vec{w}_B$. All vectors in an equation must be expressed in the same coordinate system before performing additions or subtractions. You must transform one to the other's frame first: $\vec{v}_A + R_{B \to A}\vec{w}_B$.

## Self-check
1.  What is the fundamental physical difference between the ECI and ECEF frames, and why does this difference matter when applying Newton's laws of motion?
2.  A launch site is at the equator ($\phi=0^\circ$) and prime meridian ($\lambda=0^\circ$). A rocket is launched straight up. In the launch frame, its velocity vector is $[0, 0, 1000]^T$ m/s (Up is the Z-axis). What is its velocity vector expressed in the ECEF frame at the moment of launch?
3.  A satellite is in a circular orbit in the ECI XY-plane. Its position vector is $\vec{r}_{ECI}(t) = [R\cos(\omega t), R\sin(\omega t), 0]^T$. Derive an expression for its acceleration vector as measured in the ECEF frame, $\vec{a}_{ECEF}$. Identify the terms corresponding to centripetal, Coriolis, and centrifugal acceleration.