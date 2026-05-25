## What it is
The Hamilton product is the rule for multiplying two quaternions. This operation is fundamental because it directly corresponds to composing two 3D rotations. If quaternion $q_1$ represents rotation $R_1$ and $q_2$ represents rotation $R_2$, their product $q_p = q_2 q_1$ yields a new quaternion $q_p$ that represents applying rotation $R_1$ *first*, followed by rotation $R_2$.

## Why it matters
In aerospace GNC, a vehicle's attitude (its orientation in space) is tracked using a quaternion. As the vehicle rotates, its attitude quaternion is updated every control cycle by multiplying it with a small quaternion representing the incremental rotation measured by gyroscopes. This process, called attitude propagation, is the computational core of every modern inertial navigation system, from satellites to interplanetary probes.

## When to study it
Before tackling the Hamilton product, you must be fluent with:
1.  **Complex Numbers:** Specifically, the multiplication of two complex numbers of the form $(a+bi)(c+di)$.
2.  **Vector Algebra:** You must know the vector dot product ($\mathbf{a} \cdot \mathbf{b}$) and the vector cross product ($\mathbf{a} \times \mathbf{b}$) cold.
3.  **Quaternion Definition:** You should understand that a quaternion $q$ is an extension of complex numbers, representable as a scalar part $s$ and a 3D vector part $\mathbf{v}$, written as $q = (s, \mathbf{v})$.

If any of these are weak, master them first. The Hamilton product builds directly upon them.

## How to study it (step by step)
1.  **Master the Basis:** Write down the fundamental Hamilton rules for the basis vectors $i, j, k$: $i^2 = j^2 = k^2 = ijk = -1$. Use these to derive the cyclic relations: $ij=k$, $jk=i$, $ki=j$, and the anti-cyclic relations: $ji=-k$, $kj=-i$, $ik=-j$. Spend 15 minutes drilling these until they are automatic.
2.  **Derive from First Principles:** Write two quaternions in their full form: $q_1 = s_1 + x_1 i + y_1 j + z_1 k$ and $q_2 = s_2 + x_2 i + y_2 j + z_2 k$. Multiply them term-by-term as you would with polynomials, applying the basis rules from step 1. Collect all the resulting scalar terms and all the $i, j, k$ terms separately.
3.  **Connect to Vector Algebra:** Look at the result from step 2. Show that the final scalar part is $s_1 s_2 - \mathbf{v}_1 \cdot \mathbf{v}_2$ and the final vector part is $s_1 \mathbf{v}_2 + s_2 \mathbf{v}_1 + \mathbf{v}_2 \times \mathbf{v}_1$. This compact formula is what you will use in practice.
4.  **Perform a Hand Calculation:** Choose two simple quaternions, e.g., $q_1 = (1, [2, 0, 0])$ and $q_2 = (0, [0, 3, 0])$. Calculate $q_2 q_1$ using the formula from step 3. Then, calculate $q_1 q_2$ to prove to yourself that the product is non-commutative.
5.  **Build Rotational Intuition:** Consider $q_x$ as a 90-degree rotation about the x-axis and $q_y$ as a 90-degree rotation about the y-axis. Grab a book or your phone. Physically perform the rotation $q_y q_x$ (x-rot then y-rot). Now perform $q_x q_y$ (y-rot then x-rot). The final orientation is different, cementing the non-commutative nature of rotations and thus quaternion multiplication.

## Key ideas, with intuition
1.  **Product as Composition:** The most important intuition is that **multiplication is composition**. The product $q_2 q_1$ is not just an abstract algebraic operation; it means "do rotation $q_1$, then do rotation $q_2$". The order is critical and reads right-to-left, just like function composition $f(g(x))$.

2.  **Non-Commutativity is Physical:** The fact that $q_1 q_2 \neq q_2 q_1$ is not a mathematical quirk; it's a reflection of physical reality. The order in which you apply 3D rotations matters. The quaternion algebra correctly captures this essential property of the physical world, which is why it's so powerful for GNC.

3.  **Generalization of Complex Multiplication:** A complex number $a+bi$ can be thought of as a 2D vector that rotates and scales other 2D vectors in the complex plane. A quaternion $s + x i + y j + z k$ is a 4D number that does the same for 3D vectors (via a slightly different operation, $p' = qpq^{-1}$, which we will cover later). The Hamilton product is the rule that makes this rotational machinery work.

4.  **The Basis Rules are the Engine:** The entire structure of the Hamilton product derives from one simple set of rules given by William Rowan Hamilton:
    $$ i^2 = j^2 = k^2 = ijk = -1 $$
    From this, everything else follows. For example, to find $ij$:
    $$ (ijk)k = (-1)k \implies ij(k^2) = -k \implies ij(-1) = -k \implies ij = k $$
    All the complexity of the final product formula is just careful bookkeeping based on this single, elegant axiom.

## Worked example
Let's calculate the product $q_p = q_2 q_1$ for the quaternions:
$q_1 = (3, [1, 0, -2])$ representing the first rotation.
$q_2 = (1, [5, 1, 3])$ representing the second rotation.

Here, $s_1=3$, $\mathbf{v}_1 = [1, 0, -2]$, and $s_2=1$, $\mathbf{v}_2 = [5, 1, 3]$.

We use the compact formula derived from the basis rules:
$$ q_p = q_2 q_1 = (s_2 s_1 - \mathbf{v}_2 \cdot \mathbf{v}_1, s_2 \mathbf{v}_1 + s_1 \mathbf{v}_2 + \mathbf{v}_2 \times \mathbf{v}_1) $$

**Step 1: Calculate the scalar part, $s_p = s_2 s_1 - \mathbf{v}_2 \cdot \mathbf{v}_1$.**
First, the dot product:
$\mathbf{v}_2 \cdot \mathbf{v}_1 = (5)(1) + (1)(0) + (3)(-2) = 5 + 0 - 6 = -1$.
Now, the full scalar part:
$s_p = (1)(3) - (-1) = 3 + 1 = 4$.

**Step 2: Calculate the vector part, $\mathbf{v}_p = s_2 \mathbf{v}_1 + s_1 \mathbf{v}_2 + \mathbf{v}_2 \times \mathbf{v}_1$.**
First, the scaled vectors:
$s_2 \mathbf{v}_1 = 1 \cdot [1, 0, -2] = [1, 0, -2]$.
$s_1 \mathbf{v}_2 = 3 \cdot [5, 1, 3] = [15, 3, 9]$.
Next, the cross product:
$$
\mathbf{v}_2 \times \mathbf{v}_1 =
\begin{vmatrix}
\mathbf{i} & \mathbf{j} & \mathbf{k} \\
5 & 1 & 3 \\
1 & 0 & -2
\end{vmatrix}
= \mathbf{i}( (1)(-2) - (3)(0) ) - \mathbf{j}( (5)(-2) - (3)(1) ) + \mathbf{k}( (5)(0) - (1)(1) )
$$
$$
= \mathbf{i}(-2) - \mathbf{j}(-13) + \mathbf{k}(-1) = [-2, 13, -1]
$$
Finally, sum the three vector components:
$\mathbf{v}_p = [1, 0, -2] + [15, 3, 9] + [-2, 13, -1] = [1+15-2, 0+3+13, -2+9-1] = [14, 16, 6]$.

**Step 3: Combine the parts.**
The resulting quaternion is $q_p = (s_p, \mathbf{v}_p) = (4, [14, 16, 6])$.

*Reflection:* Each component of the formula has a purpose. The dot product term in the scalar part and the cross product term in the vector part capture the geometric interaction between the rotation axes. The scaled vector terms ensure that the scalar parts of the original quaternions (related to the angle of rotation) correctly influence the final orientation.

## Diagrams
The cyclic relationship of the quaternion basis vectors is key.

```text
      +--> j --+
      |        |
      i <------+ k

  Clockwise (positive):
  ij = k
  jk = i
  ki = j

  Counter-clockwise (negative):
  ji = -k
  kj = -i
  ik = -j
```

This diagram helps visualize the non-commutative multiplication rules for the vector part.

## Memory technique — remember this forever
1.  **Mnemonic/Visual Hook:** Think of the product $q_2 q_1$ as a "vector-scalar sandwich". The new scalar part is the product of the old scalars ($s_2 s_1$) minus the interaction of the vectors ($\mathbf{v}_2 \cdot \mathbf{v}_1$). The new vector part is a mix: each scalar gets paired with the *other* vector ($s_2\mathbf{v}_1 + s_1\mathbf{v}_2$), plus the pure vector interaction term ($\mathbf{v}_2 \times \mathbf{v}_1$).

2.  **Overlearn these formulas:**
    *   The basis rule: $$i^2 = j^2 = k^2 = ijk = -1$$
    *   The full product: $$q_2 q_1 = (s_2 s_1 - \mathbf{v}_2 \cdot \mathbf{v}_1, s_2 \mathbf{v}_1 + s_1 \mathbf{v}_2 + \mathbf{v}_2 \times \mathbf{v}_1)$$

3.  **Spaced Repetition Schedule:**
    *   Day 1: Re-derive the full product from the basis rule.
    *   Day 3: Write the full product formula from memory. Do one numerical example.
    *   Day 7: Write the basis rule and the full product formula from memory.
    *   Day 16: Explain to an imaginary colleague why the product is non-commutative, using a physical object.
    *   Day 35: Re-derive the formula from first principles in under 5 minutes.

4.  **First Principles Pathway:** If you forget the formula, you can *always* rebuild it.
    *   Write $q_1 = s_1 + \mathbf{v}_1$ and $q_2 = s_2 + \mathbf{v}_2$.
    *   Multiply them like binomials: $q_2 q_1 = (s_2 + \mathbf{v}_2)(s_1 + \mathbf{v}_1) = s_2 s_1 + s_2 \mathbf{v}_1 + s_1 \mathbf{v}_2 + \mathbf{v}_2 \mathbf{v}_1$.
    *   Now, you only need to remember the rule for multiplying two vectors as quaternions: $\mathbf{v}_2 \mathbf{v}_1 = -\mathbf{v}_2 \cdot \mathbf{v}_1 + \mathbf{v}_2 \times \mathbf{v}_1$. Substitute this in, and the full formula reappears. This sub-rule is easier to remember as it cleanly separates the dot (scalar) and cross (vector) products.

## Common mistakes
1.  **Assuming Commutativity:** The most common error is thinking $q_1 q_2 = q_2 q_1$. It is not true for quaternions, just as it is not true for 3D rotations. Always respect the order.
2.  **Order of Operations:** The product $q_2 q_1$ means apply rotation $q_1$ first, then $q_2$. This right-to-left convention is standard in mathematics and GNC but can be counter-intuitive.
3.  **Cross Product Sign Errors:** The vector part of the product is $s_2 \mathbf{v}_1 + s_1 \mathbf{v}_2 + \mathbf{v}_2 \times \mathbf{v}_1$. Many students accidentally write $\mathbf{v}_1 \times \mathbf{v}_2$, which flips the sign of that term. Remember that the "first" quaternion in the cross product term is the "first" quaternion in the multiplication itself (i.e., $q_2$).
4.  **Forgetting the Negative Sign:** The scalar part is $s_2 s_1 - \mathbf{v}_2 \cdot \mathbf{v}_1$. It is very easy to forget the minus sign before the dot product.

## Self-check
1.  Let $q_1 = (1, [1, 2, 3])$ and $q_2 = (2, [-1, 4, 0])$. Calculate $q_p = q_2 q_1$.
2.  A "pure quaternion" has a scalar part of zero. Let $p_1 = (0, [1, 0, 0])$ and $p_2 = (0, [0, 1, 0])$. What is their product $p_2 p_1$? What does the result represent?
3.  Let $q_{x,90}$ be the quaternion for a +90 degree rotation about the x-axis and $q_{y,90}$ be the quaternion for a +90 degree rotation about the y-axis. A point vector is at $[1, 0, 0]$. Describe its final position after the rotation represented by $q_{y,90} q_{x,90}$. Now describe its final position after the rotation $q_{x,90} q_{y,90}$. Use this to argue why the products must be different.