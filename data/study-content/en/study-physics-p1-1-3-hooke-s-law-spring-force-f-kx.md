## 1. The one-sentence answer
**Hooke's law states that the restoring force exerted by an ideal spring equals the negative of the product of its stiffness and its displacement from equilibrium.**

A spring that has been stretched or compressed stores potential energy and pushes or pulls back toward its natural length. The magnitude of that push or pull grows linearly with how far the end of the spring has moved; the negative sign simply records that the force always points toward the equilibrium position. This linear relationship holds only while the spring material itself behaves elastically and the displacement remains small compared with the spring's coil diameter or length.

The law therefore supplies the simplest model of a linear restoring force. Once the force is known as a function of position, every subsequent calculation in work, energy, and oscillatory motion follows directly from Newton's second law or from the work-energy theorem.

> [!NOTE]
> The negative sign is not decorative: it guarantees that the force is always a restoring force, which is why a mass on a spring oscillates rather than runs away.

## 2. Why this matters — concrete and current
SpaceX uses coil-spring isolators inside the Falcon 9 interstage to protect avionics from the 5–7 g axial vibration that peaks at main-engine cutoff; the springs are sized with Hooke's law so that the resonant frequency lies well below the dominant combustion modes.

In semiconductor lithography, ASML's EUV scanners employ hundreds of voice-coil actuators whose flexure mounts are modeled as Hookean springs; the linear force-displacement relation allows sub-nanometer positioning loops to be closed at kilohertz bandwidths.

The James Webb Space Telescope's sun-shield deployment employed constant-force springs whose preload was calculated from Hooke's law to guarantee that the membrane tension remained within 2 % of design value after five years of storage.

Seismic isolation platforms beneath LIGO's test-mass chambers use blade springs whose effective stiffness is deliberately lowered by geometric cancellation; the resulting 0.5 Hz resonance still obeys \(F=-kx\) and therefore decouples the 10–100 Hz gravitational-wave band from ground motion.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Position, displacement, vectors | Force and displacement are both vectors; the minus sign lives in vector space. |
| Newton's second law      | \(F=ma\) converts the position-dependent spring force into an equation of motion. |
| Work as line integral    | Work done by the spring is \(\int F\cdot dx\), which yields elastic potential energy only after Hooke's law is substituted. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Equilibrium length
A spring that is neither stretched nor compressed exerts zero net force along its axis.  
Example: an unstretched slinky lying on a frictionless table stays at rest.  
Mathematically the equilibrium length \(L_0\) satisfies  
\[ F(L_0)=0. \]  
> [!WARNING]  
> Treating any observed length as \(L_0\) will produce a fictitious constant force that ruins every energy calculation that follows.

### Step 2 — Small displacement produces proportional force
Pull or push the free end a distance \(x\) while keeping the other end fixed. For modest \(x\) the measured force grows linearly.  
Example: a 200 N/m laboratory spring stretched 3 cm requires 6 N.  
The linear relation is written  
\[ F \propto x. \]

### Step 3 — Direction opposes the displacement
The force you feel when stretching the spring is toward you; when compressing it, the force is away from you. Both point toward the equilibrium position.  
Hence the proportionality constant must be negative:  
\[ F = -kx. \]  
> [!WARNING]  
> Omitting the minus sign turns the spring into an unstable “anti-spring” whose solutions diverge exponentially.

### Step 4 — Stiffness \(k\) as material and geometric property
The constant \(k\) (units N m^{-1}) incorporates wire diameter, coil diameter, number of turns, and shear modulus. Different springs therefore have different slopes on an \(F\)–\(x\) graph.  
The law is now complete for one dimension.

### Step 5 — Vector generalization and domain of validity
In three dimensions the force is a vector antiparallel to the displacement vector of the free end:  
\[ \vec{F} = -k\vec{x}. \]  
The model assumes linear elasticity, small strain, and negligible mass of the spring itself.

## 5. Worked examples — every step shown

**Example 1 — Static stretch**  
*Given:* A spring of stiffness \(k=150\) N m^{-1} is fixed at one end; a 0.45 kg mass is hung from the other.  
*Find:* Extension \(x\) at equilibrium.  

1. At equilibrium net force is zero:  
   \[ mg + F_\text{spring}=0 \]  
   *Why:* Newton's first law.  
2. Substitute Hooke's law:  
   \[ mg - kx=0 \]  
   *Why:* \(F_\text{spring}=-kx\) and upward is taken positive.  
3. Solve:  
   \[ x=\frac{mg}{k}=\frac{0.45\times9.8}{150}=0.0294\,\text{m}. \]  

**0.0294 m**

*Reflection:* The only subtlety is choosing the sign convention once and keeping it.

**Example 2 — Work to stretch**  
*Given:* Same spring, stretch from \(x=0\) to \(x=0.10\) m.  
*Find:* Work done by the external agent.  

1. External force equals \(-F_\text{spring}\):  
   \[ F_\text{ext}=kx. \]  
   *Why:* Action-reaction.  
2. Work is the integral:  
   \[ W=\int_0^{0.10} kx\,dx=\frac12 k(0.10)^2. \]  
   *Why:* Definition of work for a variable force.  
3. Numerically:  
   \[ W=0.75\,\text{J}. \]  

**0.75 J**

*Reflection:* The factor of one-half appears because force grows with \(x\).

**Example 3 — Energy conservation**  
*Given:* Spring above, mass 0.45 kg released from rest at \(x=0.10\) m.  
*Find:* Speed at \(x=0\).  

1. Initial elastic energy:  
   \[ U_i=\frac12 k(0.10)^2=0.75\,\text{J}. \]  
2. At \(x=0\), \(U_f=0\), all energy kinetic:  
   \[ \frac12 mv^2=0.75. \]  
3. Solve:  
   \[ v=\sqrt{\frac{1.5}{0.45}}=1.826\,\text{m s}^{-1}. \]  

**1.83 m s^{-1} (3 sig figs)**

*Reflection:* Mechanical energy is conserved only while the spring force is the sole non-conservative force.

**Example 4 — Two springs in series**  
*Given:* Two springs \(k_1=200\) N m^{-1}, \(k_2=300\) N m^{-1}\) attached end-to-end; total extension 5 cm.  
*Find:* Effective stiffness \(k_\text{eff}\).  

1. Same force \(F\) through both:  
   \[ x_1=\frac{F}{k_1},\quad x_2=\frac{F}{k_2}. \]  
2. Total displacement:  
   \[ x=x_1+x_2=F\left(\frac1{k_1}+\frac1{k_2}\right). \]  
3. Hence  
   \[ k_\text{eff}=\frac{F}{x}=\left(\frac1{k_1}+\frac1{k_2}\right)^{-1}=120\,\text{N m}^{-1}. \]  

**120 N m^{-1}**

*Reflection:* Series springs always soften; the harmonic sum is the direct algebraic consequence of Hooke's law.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting the minus sign         | Students think “force is positive”          | Always draw the free-body diagram before writing \(F=-kx\). |
| Using \(k\) as weight or mass     | Confusion between stiffness and inertia     | Keep units: \(k\) has units N m^{-1}, never kg. |
| Applying the law beyond elastic limit | Real springs yield or buckle               | Verify \(x\ll\) coil diameter or consult material yield strain. |
| Treating springs in parallel as additive displacements | Intuitive but wrong                         | Displacements are identical; forces add.     |
| Ignoring spring mass in oscillation problems | Only valid for \(m_\text{spring}\ll m\)     | Use effective mass \(m+\frac13 m_\text{spring}\) when needed. |
| Sign error when defining coordinate origin | Origin placed at arbitrary point            | Place \(x=0\) at the unstretched position each time. |
| Using \(F=kx\) for compression without checking buckling | Thin springs buckle under compression       | Confirm geometry or use guided plungers.     |

## 7. The textbook-precise statement
For an ideal Hookean spring whose one end is fixed and whose other end is displaced by a vector \(\vec{x}\) from the position at which the spring is undeformed, the force exerted by the spring on the movable end is exactly
\[ \vec{F}=-k\vec{x}, \]
where \(k>0\) is the spring constant. The relation holds within the linear-elastic regime, i.e., for \(|\vec{x}|\) small enough that higher-order terms in the strain-energy density remain negligible (see Goldstein, *Classical Mechanics*, 3e, §1.3).

## 8. Visual — diagram or schematic
```text
Fixed wall ───[///////]───●  mass m
              ↑           ↑
           x = 0        x > 0 (stretched)
Force on mass: F = −kx  (leftward arrow)
```
The diagram shows the equilibrium position marked at the leftmost coil attachment; positive \(x\) increases to the right. The arrow labeled \(F=-kx\) points left whenever \(x>0\).

## 9. The memory technique
1. **The hook** — Picture an archer pulling a bow: the farther the string is drawn, the harder it fights to return; the “negative” direction is back toward the archer’s face.
2. **What to overlearn** — \(F=-kx\), \(U=\frac12 kx^2\), and the units of \(k\) (N m^{-1}).
3. **Spaced-repetition schedule** — Review the sign convention at 1 day, derive elastic energy at 3 days, solve a two-spring system at 7 days, treat a damped oscillator at 16 days, and design a simple isolation mount at 35 days.
4. **First-principles fallback** — Start from the definition of work, integrate \(F(x)\) to obtain potential energy, differentiate to recover force; the linear assumption \(F\propto -x\) is the only extra ingredient required.

## 10. What this unlocks
Hooke's law supplies the potential-energy function that turns Newton's second law into the simple-harmonic-oscillator equation, which in turn underpins every later treatment of normal modes, resonance, and small-amplitude stability.

- Simple harmonic motion and its differential equation
- Elastic potential energy and conservative forces
- Coupled oscillators and normal-mode analysis
- Vibration isolation in rocket payloads
- Linearization of nonlinear restoring forces about equilibrium

## 11. Self-check — five questions, no answers
1. A spring of unknown \(k\) stretches 2.7 cm under a 5 N load. What is \(k\)?  
2. Derive the effective stiffness of three identical springs placed in parallel.  
3. A mass \(m\) is attached to a vertical spring and released from the unstretched position. At what extension is kinetic energy maximum?  
4. Why does the period of a mass-spring system remain independent of amplitude only while Hooke's law holds?  
5. A coil spring of \(k=500\) N m^{-1}\) is compressed 4 cm and then allowed to launch a 10 g projectile vertically. Estimate the launch speed, stating every assumption.