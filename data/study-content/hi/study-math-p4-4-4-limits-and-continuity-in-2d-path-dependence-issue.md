## 1. The one-sentence answer
**Limits in two variables are path-dependent: the same point can be approached along different curves and the resulting limiting values may disagree, so the overall limit fails to exist.**

Aap already 1D limits samajh chuke ho, jahaan left aur right se approach karne par value match karni padti hai. 2D mein yeh idea expand hota hai — ab aap kisi bhi curve ke along (0,0) tak ja sakte ho. Agar do alag curves par function ke values alag-alag limit dete hain, to limit exist hi nahi karta. Continuity ke liye limit exist karna zaroori hai, isliye path test continuity ko turant reject kar deta hai.

Yeh issue tabhi ubharta hai jab function mein terms jaise \(xy/(x^2+y^2)\) ya \(\frac{x^2-y^2}{x^2+y^2}\) hote hain. Inme numerator aur denominator dono zero ho jaate hain at origin, aur ratio kis direction se aate ho uspar depend karta hai.

> [!NOTE]
> The single “aha” moment yeh hai: unlike 1D, 2D space mein infinitely many independent directions hain, aur ek hi point par sab directions se same value aana zaroori hai — warna limit nahi banta.

## 2. Why this matters — concrete and current
In semiconductor process simulation, ASML ke lithography models mein 2D intensity fields \(I(x,y)\) ka limit origin par check karna padta hai taaki photoresist threshold accurately predict ho; path dependence seedha overlay error ban jaata hai.

Aerospace trajectory planning mein NASA ke entry-descent-landing algorithms 2D wind-field functions ke limits dekhte hain; agar path dependence ignore kiya to parachute deployment timing galat ho sakti hai, jaise Mars 2020 mission ke sensitivity studies mein dikha.

Modern machine-learning optimizers (AdamW, Lion) jab non-convex loss surfaces par gradient descent karte hain, to saddle points ke aas-paas 2D slices mein limit existence decide karti hai ki optimizer stuck hoga ya nahi — Google Research ke 2023 papers yeh explicitly test karte hain.

In quantum-dot device modelling, Intel aur TSMC 2D electrostatic potential \(\phi(x,y)\) ke continuity ko path tests se verify karte hain; discontinuity seedha charge-trap density mein error daal deti hai.

Fundamental physics mein, 2D fluid vorticity fields ke limits vortex-core analysis mein use hote hain — path mismatch matlab enstrophy calculation galat ho jaati hai.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Single-variable limits   | Baseline intuition for what “approaching a value” means   |
| \(\epsilon\)-\(\delta\) definition | Formal way to say limit exists independent of path     |
| Polar coordinates        | Natural tool to parameterise all paths at once            |
| Basic curve parametrisation | Ability to substitute \(x(t), y(t)\) along any route   |

Agar upar ke koi bhi concept weak hain to pehle unhe solid karo; warna path tests surface-level rahenge.

## 4. Building the idea — from intuition to formalism

### Step 1 — Different routes can give different numbers
Plain Hinglish claim: jab aap (0,0) ki taraf alag-alag curves par jaate ho, function ka value alag limit pakad sakta hai.

Concrete example: \(f(x,y)=\frac{xy}{x^2+y^2}\). x-axis par (\(y=0\)) limit 0 aata hai, lekin line \(y=x\) par limit \(\frac12\) aata hai.

Formal statement: \(\lim_{(x,y)\to(0,0)}f(x,y)=L\) tabhi exist karta hai jab har path \(\gamma(t)\to(0,0)\) ke liye \(\lim f(\gamma(t))=L\) ho.

> [!WARNING]
> Agar aap sirf do paths check karke “limit nahi hai” bol dete ho lekin actually teesra path bhi alag value de, to aap sirf existence disprove kar paaye ho — existence prove karne ke liye sab paths chahiye.

### Step 2 — Polar substitution collapses all linear paths
Plain Hinglish claim: \(x=r\cos\theta\), \(y=r\sin\theta\) daalne se har straight line ek hi parameter \(r\to0\) mein aa jaati hai.

Formal: \(f(r\cos\theta,r\sin\theta)=\frac12\sin(2\theta)\), jo \(r\) se independent hai lekin \(\theta\) par depend karti hai. Isliye jab \(r\to0\) karte ho, value \(\theta\) ke hisaab se badalti rehti hai.

> [!WARNING]
> Polar form sirf radial lines cover karti hai; parabolic ya exponential paths alag ho sakte hain.

### Step 3 — Path-specific parametrisation
Plain Hinglish claim: ek arbitrary curve \(y=x^2\) ya \(y=e^{-1/x}\) ke liye \(x=t\), \(y=g(t)\) substitute karo aur \(t\to0\) lo.

Formal: let \(\gamma(t)=(t,t^2)\). Phir \(f(\gamma(t))=\frac{t^3}{t^2+t^4}\to0\) as \(t\to0\).

### Step 4 — Squeeze theorem for existence (rare case)
Agar \(|f(x,y)|\leq g(r)\) jahaan \(g(r)\to0\) as \(r\to0\), to limit 0 hai, chahe path kuch bhi ho.

### Step 5 — Textbook-grade negation
\(\lim_{(x,y)\to(a,b)}f(x,y)\) exist nahi karta agar aise do sequences \((x_n,y_n)\to(a,b)\) aur \((u_n,v_n)\to(a,b)\) hain ki \(\lim f(x_n,y_n)\neq\lim f(u_n,v_n)\).

## 5. Worked examples — har step show karo

**Example 1 — Classic rational function**  
*Given:* \(f(x,y)=\frac{x^2-y^2}{x^2+y^2}\).  
*Find:* Does \(\lim_{(x,y)\to(0,0)}f\) exist?  

Along x-axis (\(y=0\)): \(f(x,0)=1\), so limit = 1.  
Along y-axis (\(x=0\)): \(f(0,y)=-1\), so limit = −1.  
*Why:* Dono paths origin tak le jaate hain lekin values match nahi karte.  
**Limit does not exist.**

**Example 2 — Polar test**  
*Given:* \(f(x,y)=\frac{xy}{x^2+y^2}\).  
*Find:* Limit along any straight line.  
Substitute \(x=r\cos\theta\), \(y=r\sin\theta\): \(f=\frac12\sin 2\theta\).  
*Why:* Result independent of \(r\) but depends on \(\theta\), hence different lines give different limits.  
**Limit does not exist.**

**Example 3 — Path that agrees with axes**  
*Given:* same \(f\). Path \(y=x^2\).  
\(f(x,x^2)=\frac{x^3}{x^2+x^4}\to0\) as \(x\to0\).  
*Why:* Parabolic path zero deta hai, lekin pehle examples se already mismatch hai.  
**Existence already ruled out.**

**Example 4 — Existence via squeeze**  
*Given:* \(f(x,y)=\frac{x^2y}{x^4+y^2}\).  
Show \(|f|\leq\frac12|x|\) (by AM-GM).  
As \((x,y)\to(0,0)\), right side \(\to0\).  
*Why:* Bound forces every path to give 0.  
**Limit = 0.**

*Reflection:* Pehle teen examples existence disprove karte hain; chautha rare case dikhaata hai jab limit actually exist karta hai.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Sirf x-axis aur y=x check karna   | Comfort zone mein rehna                     | Kam se kam ek aur nonlinear path try karo    |
| Polar form ko “proof” samajhna    | Sirf radial lines cover hoti hain           | Polar ko existence prove ke liye mat use karo |
| Sequence test bhool jaana         | Sequences visually obvious nahi lagte       | Hamesha do sequences ready rakho             |
| \(\epsilon\)-\(\delta\) directly try karna | Bahut time waste hota hai               | Pehle path mismatch se reject karo           |
| Denominator zero ignore karna     | Algebraic habit 1D se aati hai              | Domain check pehle kar lo                    |
| Limit 0 assume kar lena           | “Sab jagah zero dikhta hai” illusion      | Ek bhi mismatch milte hi reject kar do       |

## 7. The textbook-precise statement
A function \(f:\mathbb{R}^2\setminus\{(a,b)\}\to\mathbb{R}\) has limit \(L\) as \((x,y)\to(a,b)\) if and only if for every \(\epsilon>0\) there exists \(\delta>0\) such that \(0<\sqrt{(x-a)^2+(y-b)^2}<\delta\) implies \(|f(x,y)-L|<\epsilon\). Equivalently, the limit exists only when every path approaching \((a,b)\) yields the same value. (Stewart, *Calculus*, 9e, §14.2, Theorem 1 and the subsequent path test discussion.)

## 8. Visual — diagram or schematic
```
          y
          ^
          |
   y=x -->+--> (0,0) <-- y=0 (x-axis)
          |     ^
          |    /
   y=x^2 -+---/---> x
          |
```
Three labelled paths (x-axis, line y=x, parabola y=x²) all reach (0,0) but can return different function values.

## 9. The memory technique
1. **The hook** — Socho ek spider origin par baitha hai; har pair ek alag path hai. Agar har pair ka “colour” (function value) same nahi, spider confuse ho jaata hai — limit nahi banta.
2. **What to overlearn** — \(\frac{xy}{x^2+y^2}\) along y=mx gives \(\frac{m}{1+m^2}\); yeh ek line memory mein rakh lo.
3. **Spaced-repetition schedule** — 1 din, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Bhool jaaye to do sequences choose karo: \((t,0)\) aur \((t,t)\), values compare karo.

## 10. What this unlocks
Yeh concept partial derivatives, directional derivatives, differentiability aur double integrals ke liye foundation daalta hai.

- Differentiability test (limit definition) directly path test use karta hai.
- Green’s theorem aur line integrals mein path independence tabhi aati hai jab limit conditions satisfy hon.
- Vector calculus identities (curl, div) continuity assumptions par depend karte hain.

## 11. Self-check — five questions, no answers
1. \(f(x,y)=\frac{x^3-y^3}{x^3+y^3}\) ka limit (0,0) par exist karta hai kya? Prove ya disprove karo.
2. Path \(y=x^3\) aur \(y=x\) par \(f(x,y)=\frac{x y^2}{x^2+y^4}\) ke limits compare karo.
3. Kya polar substitution existence prove kar sakta hai? Ek counter-example do.
4. \(\epsilon\)-\(\delta\) definition ka use karke dikhao ki \(f(x,y)=x+y\) ka limit (1,2) par 3 hai.
5. Ek function banao jahaan teen alag paths teen alag limits dete hon.