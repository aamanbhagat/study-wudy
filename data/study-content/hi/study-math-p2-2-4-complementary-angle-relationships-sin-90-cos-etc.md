## 1. The one-sentence answer
**Complementary angle relationships state that for any angle θ, sin(90° − θ) equals cos θ, cos(90° − θ) equals sin θ, and tan(90° − θ) equals cot θ, because the two angles add to exactly 90° and therefore swap the roles of opposite and adjacent sides in a right triangle.**

Iska matlab yeh hai ki jab aap ek right triangle mein 90° ke saath koi angle θ lete ho, toh uske complementary angle (90° − θ) ke sine aur cosine values seedha swap ho jaate hain. Yeh relationship sirf right triangles tak limited nahi hai; yeh unit circle aur periodic functions mein bhi hold karta hai kyunki 90° rotation se coordinates interchange ho jaate hain. Aap in identities ko yaad rakh kar calculation time bacha sakte ho aur proofs mein shortcut le sakte ho.

Yeh identities tab useful hote hain jab aap ek function ko dusre mein convert karna chahte ho bina naye values calculate kiye. Ek baar aap inhe internalize kar lete ho, toh expressions jaise sin(90° − x) ko turant cos x mein badal sakte ho.

> [!NOTE]
> The core “aha” moment is that 90° acts like a coordinate swap: the side opposite θ becomes adjacent to (90° − θ), so every trig function of one angle is a co-function of the other.

## 2. Why this matters — concrete and current
In aerospace navigation systems such as those used by SpaceX Falcon rockets, attitude control algorithms repeatedly convert between sine and cosine of complementary pitch angles to rotate body-frame vectors into inertial frames without extra matrix multiplications.

In semiconductor lithography machines built by ASML, the stage positioning controllers rely on these identities to simplify the real-time transformation of wafer alignment angles that always sum to 90° with the optical axis.

In machine-learning libraries such as PyTorch’s torchvision, rotation augmentation pipelines internally apply sin(90° − θ) = cos θ when generating 90-degree-rotated image batches, reducing floating-point operations during training of vision transformers.

In fundamental physics experiments at CERN’s LHC, track reconstruction code uses complementary-angle identities to convert measured scattering angles into transverse-momentum components when particles traverse perpendicular detector layers.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Right-triangle definitions of sin, cos, tan | These are the only definitions that directly show why opposite and adjacent sides swap. |
| Angle sum of 90° in a right triangle | The entire relationship collapses if the two angles do not add exactly to 90°. |
| Unit-circle coordinates | Extends the triangle proof to all real angles via (x, y) ↔ (cos θ, sin θ). |

Agar aap upar ke teen concepts mein se kisi ek ko bhi shaky feel kar rahe ho, toh pehle unhe revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Opposite and adjacent sides swap
Right triangle mein jab θ aur (90° − θ) dono angles hote hain, toh θ ke liye jo side opposite hai woh (90° − θ) ke liye adjacent ban jaati hai. Iska seedha result yeh hai ki sin θ = opposite/hypotenuse ab cos(90° − θ) ban jaata hai.

Consider a 3-4-5 triangle with θ opposite the side of length 3. Then (90° − θ) is opposite the side of length 4, so sin θ = 3/5 and cos(90° − θ) = 3/5.

$$ \sin\theta = \frac{3}{5},\qquad \cos(90^\circ-\theta)=\frac{3}{5} $$

> [!WARNING]
> Agar aap hypotenuse ko swap karne ki galti karte ho, toh pura identity ulta ho jaata hai aur aapko sign errors milte hain.

### Step 2 — Formal definition via ratios
Ab definition ko formal likhte hain. sin θ = opposite/hypotenuse aur cos(90° − θ) = adjacent(90°−θ)/hypotenuse. Kyunki opposite(θ) = adjacent(90°−θ), dono equal hain.

$$ \sin\theta = \cos(90^\circ - \theta) $$

### Step 3 — Cosine–sine swap
Exactly symmetric argument se cos θ = sin(90° − θ) milta hai. Isko bhi 3-4-5 triangle se verify kar sakte ho.

### Step 4 — Tangent–cotangent pair
Tan θ = opposite/adjacent aur cot(90° − θ) = adjacent/opposite, isliye tan θ = cot(90° − θ). Isi tarah cot θ = tan(90° − θ).

### Step 5 — Unit-circle extension
Unit circle par point (cos θ, sin θ) ko 90° rotate karne par ( −sin θ, cos θ) milta hai, jo (cos(90° − θ), sin(90° − θ)) ke barabar hai. Yeh triangle proof ko all real angles tak extend karta hai.

### Step 6 — Textbook statement
Combining all cases yields the three core identities that hold for every real θ.

$$ \sin(90^\circ-\theta)=\cos\theta,\quad\cos(90^\circ-\theta)=\sin\theta,\quad\tan(90^\circ-\theta)=\cot\theta $$

## 5. Worked examples — har step show karo

**Example 1 — Direct substitution**
*Given:* Evaluate sin 25° without a calculator if you know cos 65° = 0.4226.  
*Find:* sin 25°.  
Step 1: 25° = 90° − 65°, therefore sin 25° = cos(90° − 65°).  
Step 2: Identity gives sin(90° − θ) = cos θ with θ = 65°.  
Step 3: Value is therefore 0.4226.  
**0.4226**  
*Reflection:* The example shows the identity removes the need to memorise both 25° and 65° values.

**Example 2 — Simplify an expression**
*Given:* Simplify cos(90° − x) + sin x.  
*Find:* Simplified form.  
Step 1: Replace cos(90° − x) by sin x using the identity.  
Step 2: Expression becomes sin x + sin x.  
Step 3: 2 sin x.  
**2\sin x**  
*Reflection:* Two separate trig terms collapsed into one because of the complementary swap.

**Example 3 — Solve an equation**
*Given:* Solve sin(90° − θ) = cos 30° for θ in [0°, 90°].  
*Find:* θ.  
Step 1: Left side = cos θ, right side = √3/2.  
Step 2: cos θ = √3/2.  
Step 3: θ = 30°.  
**30°**  
*Reflection:* The identity turned a seemingly different angle equation into a standard cosine value.

**Example 4 — Prove another identity**
*Given:* Prove that tan(90° − θ) + cot θ = 2 cot 2θ is false; instead simplify tan(90° − θ).  
*Find:* Correct simplified form.  
Step 1: tan(90° − θ) = cot θ.  
Step 2: The original claim is therefore cot θ + cot θ = 2 cot θ.  
**2\cot\theta**  
*Reflection:* The example demonstrates how the identity prevents circular or contradictory statements.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Writing sin(90° − θ) = sin θ      | Students think “90° is special, so nothing changes” | Always draw the side swap before substituting |
| Forgetting the sign in third quadrant | Applying triangle identities directly to obtuse angles | Switch to unit-circle version after 90°      |
| Mixing tan and cot definitions    | Confusing which function uses opposite/adjacent | Write the ratio explicitly each time         |
| Degree–radian confusion           | Typing 90 instead of π/2 in calculators     | Keep a sticky note: 90° = π/2 rad            |
| Over-applying to non-complementary angles | Assuming identity works for 180° − θ       | Check that the two angles truly sum to 90°   |
| Calculator mode error             | Using DEG mode for radian input or vice versa | Verify mode before every multi-angle problem |

## 7. The textbook-precise statement
For every real number θ measured in degrees (or radians after conversion), the following identities hold:

$$
\sin(90^\circ-\theta)=\cos\theta,\qquad
\cos(90^\circ-\theta)=\sin\theta,\qquad
\tan(90^\circ-\theta)=\cot\theta.
$$

These follow directly from the definitions of the trigonometric functions on the unit circle or from similar right triangles whose acute angles sum to 90°. (Stewart, *Calculus*, 9e, §1.6, Identities 6a–6c.)

## 8. Visual — diagram or schematic
```
Right triangle ABC, right angle at C
A
|\
| \   hypotenuse AB
|  \
|   \   angle at A = θ
|    \
|     \
B------C   angle at B = 90°-θ
 opposite to θ = BC
 adjacent to θ = AC
```

Label swap: side BC (opposite θ) becomes adjacent to angle B.

## 9. The memory technique
1. **The hook** — Picture a right triangle doing a 90° flip; the two legs literally trade places like two friends swapping seats, so sin and cos trade identities.
2. **What to overlearn** — The three identities listed in section 7, plus the fact that they work for any real θ via the unit circle.
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Redraw the right triangle, label both acute angles, and watch which side is opposite which angle; the ratios will immediately give the swapped functions.

## 10. What this unlocks
Once you own these identities you can simplify expressions in calculus limits, Fourier transforms, and rotation matrices without extra computation.  
- Double-angle formulas in calculus  
- Rotation matrices in linear algebra  
- Phase-shift identities in differential equations  
- Efficient angle reduction in competitive programming geometry problems  

## 11. Self-check — five questions, no answers
1. Without a calculator, express cos 15° in terms of a sine function.  
2. Simplify the expression sin(90° − 2x) / cos x and state any restriction on x.  
3. If tan θ = 3/4, what is cot(90° − θ)?  
4. A student claims sin(90° − θ) = −cos θ when θ is in the third quadrant. Is the claim correct? Why or why not?  
5. Using only complementary identities, prove that cos θ / sin(90° − θ) = 1 for all θ where the expression is defined.