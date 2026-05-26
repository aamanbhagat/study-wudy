## 1. The one-sentence answer
**A pulley system multiplies input force by the number of rope segments supporting the load, delivering mechanical advantage while conserving energy under ideal conditions.**

A single fixed pulley merely redirects tension; the force you apply equals the weight you lift. Adding a movable pulley changes the picture: the same rope now supports the load with two segments, so each segment carries only half the weight. You therefore pull with half the force, though you must pull the rope twice as far.

The pattern continues with compound systems. Each additional movable pulley doubles the number of supporting segments. The ideal mechanical advantage therefore equals the count of those segments. Real systems lose some advantage to friction and rope mass, yet the underlying force balance remains the same.

> [!NOTE]
> The “extra” rope length you pay out exactly compensates for the reduced force; work input still equals work output when friction is absent.

## 2. Why this matters — concrete and current
SpaceX uses multi-sheave block-and-tackle assemblies inside the Falcon 9 strongback erector to raise the 70 m rocket from horizontal to vertical; the 20-to-1 mechanical advantage lets two hydraulic winches handle a 500 t load that would otherwise require far larger actuators.

Modern construction cranes from Liebherr employ nested pulley sets with 8–16 supporting falls to lift prefabricated modules weighing hundreds of tonnes while the operator applies only a few tonnes at the winch drum, directly reducing motor size and power draw.

Elevator manufacturers such as Otis and KONE incorporate 2:1 or 4:1 roping ratios so the counterweight and car each move half the distance the hoisting machine travels; this halves the required motor torque and allows smaller gearless machines to serve high-rise buildings.

In materials-science laboratories, custom pulley rigs apply precise, low-vibration tensile loads to nanowire specimens; researchers at MIT’s NanoEngineering group routinely achieve sub-micronewton control by counting supporting strands rather than relying on delicate force sensors alone.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Newton’s second law      | Determines net force when tension and weight act on masses |
| Free-body diagrams       | Isolates every tension segment acting on each pulley      |
| Ideal-string assumptions | Tension is uniform and pulleys are massless and frictionless |
| Work–energy principle    | Shows why force reduction is paid for by increased distance |

## 4. Building the idea — from intuition to formalism

### Step 1 — Tension is the same throughout an ideal rope
A light, inextensible rope transmits the same pulling force at every point when no friction or mass is present.  
Example: a rope over a frictionless peg feels identical tension on both sides whether you pull one end or hang equal weights.  
Formal statement:  
$$T = \text{constant along the rope}.$$  
> [!WARNING]
> Treating tension as varying along the rope when pulleys have mass or friction will produce inconsistent free-body diagrams.

### Step 2 — Fixed pulleys only redirect force
A pulley anchored to the ceiling changes direction but does not alter magnitude.  
Example: pulling downward on a rope that passes over a ceiling pulley still requires force equal to the hanging weight.  
Formal statement: mechanical advantage of a single fixed pulley is 1.  
> [!WARNING]
> Assuming a fixed pulley multiplies force leads to immediate violation of equilibrium at the support.

### Step 3 — Movable pulleys double supporting strands
When a pulley can rise with the load, the rope passes under it and both ends are supported.  
Example: two vertical rope segments each carry half the load weight \(mg\).  
Formal statement:  
$$2T = mg \implies T = \frac{mg}{2}.$$  
> [!WARNING]
> Forgetting that the movable pulley accelerates with the load produces the wrong net-force equation.

### Step 4 — Mechanical advantage equals the number of supporting rope segments
Count every upward rope segment attached to the moving load block.  
Example: a system with four supporting segments yields \(T = mg/4\).  
Formal statement:  
$$\text{MA}_\text{ideal} = n,$$  
where \(n\) is the number of supporting strands.  
> [!WARNING]
> Counting the free end you pull as an extra strand overcounts advantage by one.

### Step 5 — Energy conservation fixes the distance trade-off
Work input equals work output for an ideal system:  
$$F_\text{in} \cdot d_\text{in} = mg \cdot d_\text{load}.$$  
Because \(F_\text{in} = mg/n\), it follows that \(d_\text{in} = n \cdot d_\text{load}\).  
> [!WARNING]
> Ignoring the distance increase leads to the false conclusion that energy is created.

### Step 6 — Real systems include efficiency
Efficiency \(\eta < 1\) reduces output force:  
$$F_\text{out} = \eta \cdot n \cdot F_\text{in}.$$  
The textbook definition of ideal mechanical advantage therefore assumes \(\eta = 1\).

## 5. Worked examples — every step shown

**Example 1 — Single fixed pulley**  
*Given:* A 200 N weight hangs from a rope over a frictionless fixed pulley; you pull the free end.  
*Find:* Tension and mechanical advantage.  
Draw free-body diagram of weight: \(T - mg = 0\).  
*Why:* Equilibrium requires net force zero.  
Thus \(T = 200\) N.  
Mechanical advantage = \(mg/T = 1\).  
**200 N**  
*Reflection:* Direction changes but magnitude does not; the single strand sets MA = 1.

**Example 2 — Single movable pulley**  
*Given:* Movable pulley attached to 200 N load; rope fixed at ceiling, passes under movable pulley, then over fixed pulley to hand.  
*Find:* Hand tension for equilibrium.  
Two upward tensions on movable pulley: \(2T = 200\) N.  
*Why:* Both segments support the load.  
\(T = 100\) N.  
**100 N**  
*Reflection:* The movable pulley introduces the second supporting strand.

**Example 3 — Block and tackle with four strands**  
*Given:* Four supporting strands, 800 N load, ideal pulleys.  
*Find:* Input force.  
\(n = 4\), so \(T = 800/4 = 200\) N.  
*Why:* Direct application of MA = n.  
**200 N**  
*Reflection:* Strand count is the only quantity needed once ideal assumptions hold.

**Example 4 — Movable pulley with acceleration**  
*Given:* Movable pulley and 200 N load accelerate upward at \(1.2\) m s\(^{-2}\).  
*Find:* Tension.  
Net force on system: \(2T - mg = ma\).  
*Why:* Newton’s second law for the accelerating load.  
\(2T = 200 + (200/9.8)\times1.2 \approx 224.5\) N, so \(T \approx 112.2\) N.  
**112.2 N**  
*Reflection:* Acceleration modifies the simple MA relation; free-body diagrams must include \(ma\).

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Counting the free end as a strand | Visual miscount of rope segments            | Label each upward segment attached to load   |
| Assuming tension changes at pulley| Forgetting ideal-string model               | Restate “massless, frictionless” before each diagram |
| Treating movable pulley as fixed  | Overlooking that it rises with the load     | Draw velocity or displacement arrows on every pulley |
| Forgetting acceleration term      | Defaulting to static equilibrium            | Write \(\sum F = ma\) explicitly each time   |
| Ignoring rope mass                | Treating rope as weightless by habit        | Add rope weight to load when mass per length is given |
| Confusing MA with velocity ratio  | Mixing force gain with speed loss           | Calculate both separately and compare        |
| Applying real efficiency to ideal case | Mixing practical and theoretical statements | State \(\eta = 1\) first, then adjust later  |

## 7. The textbook-precise statement
An ideal pulley system consisting of \(n\) rope segments supporting a load \(mg\) transmits tension \(T = mg/n\) throughout each segment when every pulley is massless and frictionless and the rope is light and inextensible. The ideal mechanical advantage is therefore exactly \(n\). (See Young & Freedman, *University Physics*, 15th ed., §5.4, “Applications of Newton’s Laws: Mechanical Advantage of Pulley Systems”.)

## 8. Visual — diagram or schematic
```text
Ceiling
   │
   ● fixed pulley
  / \
 /   \
T     T
 |     |
 |     ● movable pulley
 |    / \
 |   /   \
 |  /     \
 | /       \
 |/         \
load (mg)     (rope continues to hand)
```
Labelled segments: two vertical strands support the movable pulley; tension \(T\) is identical in every segment.

## 9. The memory technique
1. **The hook** — Picture a weightlifter holding a barbell with four friends each lifting one corner: the four strands share the load exactly as four rope segments share tension.
2. **What to overlearn** — MA = n (number of supporting strands); \(T = mg/n\) for equilibrium; distance trade-off \(d_\text{in} = n \cdot d_\text{load}\).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Redraw the free-body diagram of the load block, count upward rope vectors, set net force to zero (or \(ma\)), solve for \(T\).

## 10. What this unlocks
Pulley systems supply the force-multiplication language used in Atwood’s machine, differential pulleys, and elevator roping ratios. The same counting principle appears in gear trains, lever classes, and hydraulic lifts.

- Next: Atwood’s machine and variable-mass systems
- Next: Static equilibrium of extended bodies
- Next: Efficiency and power in real machines

## 11. Self-check — five questions, no answers
1. A system has three movable pulleys arranged so that eight rope segments support the load. What ideal mechanical advantage results?

2. Draw the free-body diagram of a movable pulley whose load accelerates upward at \(a\); write the tension equation.

3. A crane operator pulls 50 m of rope to raise a load 10 m. How many supporting strands are present?

4. Why does adding a fourth strand to an ideal system reduce tension to one-fourth yet require four times the rope travel?

5. Identify the hidden assumption that fails when a student claims “the ceiling support feels only half the load” for a single movable pulley.