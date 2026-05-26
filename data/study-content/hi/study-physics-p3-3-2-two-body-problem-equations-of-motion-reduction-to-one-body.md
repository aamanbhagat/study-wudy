## 1. The one-sentence answer

**Two-body problem ko reduce karke ek equivalent one-body problem mein badla jaata hai jahaan reduced mass \(\mu\) ek fixed central mass \(M = m_1 + m_2\) ke gravitational field mein move karti hai.**

Newton ke laws se dono bodies par gravitational force equal aur opposite hoti hai. Iska matlab relative motion sirf unke mass difference par depend karta hai. Jab aap relative vector \(\mathbf{r} = \mathbf{r}_1 - \mathbf{r}_2\) define karte ho, dono equations ek single differential equation mein collapse ho jaati hain. Yeh equation bilkul waisi dikhti hai jaise ek body fixed origin ke aas-paas ghum rahi ho, lekin mass ab reduced mass \(\mu = \frac{m_1 m_2}{m_1 + m_2}\) hoti hai.

Yeh reduction sirf inverse-square force ke liye kaam karti hai, lekin gravity ke liye perfect hai. Isse orbit calculation bahut simple ho jaati hai kyunki ab aapko sirf ek trajectory solve karni padti hai.

> [!NOTE]
> Sabse badi “aha” yeh hai ki two-body system ka relative motion exactly ek fixed central body ke around ek test particle jaisa dikhta hai — lekin effective mass \(\mu\) aur effective central mass \(M\) ke saath.

## 2. Why this matters — concrete and current

SpaceX Starlink constellation mein har satellite pair ka relative orbit is reduced one-body model se hi calculate kiya jaata hai taaki collision avoidance maneuvers sahi timing par ho sakein. ISRO ke Chandrayaan-3 mission planning team ne Earth-Moon two-body reduction use karke low-energy transfer trajectory design ki thi.

LIGO gravitational-wave data analysis mein binary black-hole inspirals ko effective one-body formalism mein map kiya jaata hai; 2023 ke GW230529 event ke parameter estimation mein yahi reduction lagrangian equations ko numerically integrate karne mein madad ki. ESA’s Juice mission Jupiter-Io-Europa three-body effects ko pehle two-body Jupiter-Io reduction se isolate karke study kar rahi hai.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                      |
|----------------------------|-----------------------------------------------------------|
| Vector calculus            | Position, velocity aur acceleration vectors likhne ke liye |
| Newton’s second law        | Force = mass × acceleration equations likhne ke liye      |
| Gravitational force law    | \(F = G m_1 m_2 / r^2\) seedha equations mein aata hai    |
| Reference frames           | Inertial frame choose karna zaroori hai warna fictitious forces aa jaayenge |

Agar vector derivatives ya Newton’s laws weak hain to pehle unhe revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Write the vector equations for both bodies
Dono masses ek dusre par gravitational pull karti hain. Force magnitude \(G m_1 m_2 / r^2\) hai aur direction line joining ke along.

Example: Earth-Sun system mein Sun (m1) aur Earth (m2) dono ek dusre ko attract karte hain.

Formal statement:
\[
m_1 \ddot{\mathbf{r}}_1 = -G m_1 m_2 \frac{\mathbf{r}_1 - \mathbf{r}_2}{|\mathbf{r}_1 - \mathbf{r}_2|^3}, \quad
m_2 \ddot{\mathbf{r}}_2 = -G m_1 m_2 \frac{\mathbf{r}_2 - \mathbf{r}_1}{|\mathbf{r}_1 - \mathbf{r}_2|^3}
\]

> [!WARNING]
> Agar aap sign galat kar doge (direction of force), to orbits diverge instead of closed ellipses.

### Step 2 — Define the relative vector
Relative position \(\mathbf{r} = \mathbf{r}_1 - \mathbf{r}_2\) lo. Iska second derivative dono accelerations ka difference deta hai.

### Step 3 — Subtract the two equations
m1 wali equation ko m2 se divide karke subtract karo. Reduced mass \(\mu\) naturally appear karti hai.

Formal result:
\[
\ddot{\mathbf{r}} = -G(m_1 + m_2) \frac{\mathbf{r}}{r^3}
\]

### Step 4 — Introduce reduced mass
\(\mu = m_1 m_2 / (m_1 + m_2)\) define karo. Equation ab ek single body jaisi ho jaati hai:
\[
\mu \ddot{\mathbf{r}} = -G M \mu \frac{\mathbf{r}}{r^3}, \quad M = m_1 + m_2
\]

### Step 5 — Reduce to one-body form
\(\mu\) cancel ho jaata hai:
\[
\ddot{\mathbf{r}} = - \frac{G M}{r^3} \mathbf{r}
\]
Ab yeh ek fixed mass \(M\) ke gravitational field mein ek particle ka motion hai.

## 5. Worked examples — har step show karo

**Example 1 — Equal masses**
*Given:* \(m_1 = m_2 = m\)
*Find:* Reduced mass and central mass
\(\mu = m/2\), \(M = 2m\)
*Why:* Equal masses ka relative motion exactly half-mass particle ka hota hai jo double-mass center ke around ghumta hai.

**Example 2 — Satellite around Earth**
*Given:* \(m_2 \ll m_1\), \(m_1 = 5.97 \times 10^{24}\) kg
*Find:* Effective one-body equation
\(\mu \approx m_2\), \(M \approx m_1\)
*Why:* Jab ek body bahut badi ho to reduced mass chhoti body ke equal ho jaati hai.

**Example 3 — Binary star separation 1 AU**
*Given:* \(m_1 = m_2 = M_\odot\), separation 1 AU
*Find:* Relative acceleration magnitude
\(\ddot{r} = 4 \times 4\pi^2 / (1)^2 = 39.48\) AU/yr²
*Why:* Total mass double hone se acceleration double ho jaata hai.

**Example 4 — Derive period of circular orbit**
*Given:* Circular relative orbit radius \(a\)
*Find:* Period \(T\)
From \(\ddot{r} = -GM/r^2 = -\omega^2 r\) we get \(\omega^2 a^3 = GM\), hence \(T = 2\pi\sqrt{a^3/GM}\).
*Why:* Kepler’s third law directly emerges from the reduced equation.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to subtract equations  | Students sirf ek equation likh ke ruk jaate hain | Hamesha relative vector define karo pehle    |
| Sign error in force direction     | Vector subtraction mein minus sign bhool jaate hain | Diagram banao aur arrows clearly label karo  |
| Treating \(\mu\) as total mass    | Notation confusion                          | \(\mu\) aur \(M\) ko alag alag define rakho  |
| Ignoring that reduction works only for 1/r potential | Inverse-square specific property            | Yaad rakho: sirf gravity aur Coulomb ke liye |

## 7. The textbook-precise statement

In an inertial frame the equations of motion for two particles interacting via Newtonian gravity are
\[
m_i \ddot{\mathbf{r}}_i = -G m_1 m_2 \frac{\mathbf{r}_i - \mathbf{r}_j}{|\mathbf{r}_i - \mathbf{r}_j|^3},\quad i,j=1,2;\ i\neq j.
\]
Defining the relative vector \(\mathbf{r}=\mathbf{r}_1-\mathbf{r}_2\) and the total mass \(M=m_1+m_2\) yields the one-body equation
\[
\ddot{\mathbf{r}} = -\frac{GM}{r^3}\mathbf{r}.
\]
(Curtis, *Orbital Mechanics for Engineering Students*, 4e, §2.2)

## 8. Visual — diagram or schematic

```
          m1
           *
            \ 
             \   r = r1 - r2
              \
               *------> origin (barycentre approx at M)
              /
             /
            *
           m2
```
Relative vector r m1 se m2 ki taraf point karta hai; effective motion ek fixed M ke around hota hai.

## 9. The memory technique

**The hook** — Socho ki dono planets ek rubber band se jude hain; relative motion band ke center par ek chhoti ball ka oscillation jaisa hai.

**What to overlearn** — \(\mu = m_1 m_2/(m_1+m_2)\) aur final equation \(\ddot{\mathbf{r}} = -GM\mathbf{r}/r^3\).

**Spaced-repetition schedule** — 1 din, 3 din, 7 din, 16 din, 35 din.

**First-principles fallback** — Newton’s law likho, relative vector subtract karo, \(\mu\) define karo.

## 10. What this unlocks

Yeh reduction aapko Keplerian orbits, vis-viva equation, aur Lambert’s problem solve karne deta hai.

- Two-body conic sections
- Specific angular momentum conservation
- Orbital elements from state vectors

## 11. Self-check — five questions, no answers

1. Agar \(m_1 = 3m_2\) ho to reduced mass kitni hai?
2. Relative acceleration ka sign kaise decide karte ho?
3. Jab \(m_2 \to 0\) kya hota hai equation mein?
4. Circular orbit ke liye centripetal force kis equation se aata hai?
5. Kaunsa step fail ho jaayega agar force 1/r³ hoti?