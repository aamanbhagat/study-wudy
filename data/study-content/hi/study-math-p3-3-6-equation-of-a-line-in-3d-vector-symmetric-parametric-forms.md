## 1. The one-sentence answer
**A line in 3D space is completely determined by one fixed point on it and one direction vector parallel to it.**

Iska matlab yeh hai ki ek line ko aap ek point \(\vec{a}\) aur ek direction vector \(\vec{d}\) se define kar sakte ho. Jab aap in dono ko combine karte ho, toh aapko line ke har point ka position vector mil jaata hai. Yeh idea 2D se alag nahi hai, lekin 3D mein coordinates teen hote hain, isliye expressions thodi lambi ho jaati hain.

Aapko teen alag-alag forms milengi — vector form sabse compact hai, parametric form coordinates ko alag-alag equations mein todti hai, aur symmetric form in equations ko ek hi ratio mein likhti hai. Teenon ek hi line ko represent karti hain, bas likhne ka tareeka badalta hai.

> [!NOTE]
> Sabse badi aha yeh hai ki direction vector \(\vec{d}\) line ke saare points ke beech difference vectors ka scalar multiple hota hai — yeh property hi teenon forms ko ek dusre se connect karti hai.

## 2. Why this matters — concrete and current
NASA ke Mars rovers (Perseverance aur Curiosity) apne path planning mein 3D line equations use karte hain jab woh straight-line trajectories calculate karte hain surface pe navigation ke liye. Har waypoint ko ek point aur direction vector se represent kiya jaata hai taaki onboard computer minimal computation mein path update kar sake.

Semiconductor lithography machines (ASML ke EUV scanners) mein stage movement ko 3D lines ke parametric equations se model kiya jaata hai. Yeh equations exact velocity profiles generate karte hain jo sub-nanometer accuracy ke liye zaroori hote hain.

Computer graphics pipelines (Unreal Engine aur Unity ke ray-tracing modules) har ray ko vector form mein store karte hain. Ek camera se nikalne wali ray ko \(\vec{r}(t) = \vec{o} + t\vec{d}\) likh kar fast intersection tests kiye jaate hain triangles ke saath.

Particle detectors jaise CERN ke CMS mein charged particle tracks ko helical paths ke local linear approximations se fit kiya jaata hai. Yeh local lines symmetric form mein likhe jaate hain taaki magnetic field ke andar momentum reconstruction efficient ho.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Position vector          | Line ke ek fixed point ko 3D space mein locate karta hai  |
| Direction vector         | Line ki orientation aur slope teenon directions mein deta hai |
| Scalar multiplication    | Vector ko stretch ya shrink karke line ke saare points generate karta hai |
| Vector addition          | Fixed point se direction vector add karke naya point milta hai |
| Ratio and proportion     | Symmetric form mein coordinates ko ek common parameter se link karta hai |

Agar direction vector ya position vector abhi clear nahi hai, toh pehle 3D vectors ka basic section padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — A line needs only a point and a direction
Ek line infinite points ka set hota hai lekin usko sirf ek anchor point aur ek arrow (direction) chahiye. Socho aap (1,2,3) par khade ho aur (2,1,0) direction mein chal rahe ho — har step mein aap usi direction mein aage badhte ho.

Concrete example: point (0,0,0) aur direction (1,1,1) se line banegi jo origin se (1,1,1), (2,2,2), (3,3,3) … jaati hai.

Formal statement: Line par koi bhi point \(\vec{r}\) satisfy karta hai \(\vec{r} = \vec{a} + \lambda \vec{d}\), jahaan \(\lambda \in \mathbb{R}\).

> [!WARNING]
> Agar aap direction vector ko zero vector le lete ho toh equation sirf ek point deta hai aur line nahi banti — yeh galti computation mein zero division ya degenerate cases paida karti hai.

### Step 2 — Breaking the vector equation into coordinates
Vector equation \(\vec{r} = \vec{a} + \lambda \vec{d}\) ko components mein likho. Let \(\vec{a} = (x_0,y_0,z_0)\) aur \(\vec{d} = (l,m,n)\). Tab x, y, z alag-alag equations ban jaate hain.

Formal:  
$$x = x_0 + \lambda l, \quad y = y_0 + \lambda m, \quad z = z_0 + \lambda n.$$

### Step 3 — Eliminating the parameter to get symmetric form
Agar \(l,m,n\) koi bhi zero nahi hai, toh \(\lambda\) ko har equation se nikaal sakte ho aur teeno ko equal set kar sakte ho.

Formal:  
$$\frac{x-x_0}{l} = \frac{y-y_0}{m} = \frac{z-z_0}{n}.$$

### Step 4 — Handling zero components in direction vector
Agar koi component (jaise \(l=0\)) zero ho, toh us coordinate fixed rehti hai aur symmetric form mein us term ko alag se likhna padta hai.

Example: agar \(l=0\) toh equation ban jaati hai \(x=x_0\), \(\frac{y-y_0}{m}=\frac{z-z_0}{n}\).

### Step 5 — All three forms represent the identical set of points
Vector form se parametric nikalta hai, parametric se symmetric nikalta hai. Teeno ek hi set of points describe karte hain jab direction vector non-zero ho.

### Step 6 — Textbook-grade definition
Ek line in 3D space is the set \(\{ \vec{a} + \lambda \vec{d} \mid \lambda \in \mathbb{R} \}\) where \(\vec{d} \neq \vec{0}\). Iski parametric aur symmetric representations upar diye gaye equations hain.

## 5. Worked examples — har step show karo

**Example 1 — Basic vector to parametric conversion**  
*Given:* Point \(A(1,2,3)\), direction vector \(\langle 2,-1,4\rangle\).  
*Find:* Parametric equations.  

Vector form: \(\vec{r} = \langle 1,2,3\rangle + \lambda\langle 2,-1,4\rangle\).  
Ab components alag karo:  
\(x=1+2\lambda\), \(y=2-\lambda\), \(z=3+4\lambda\).  
*Why:* Har coordinate ko alag equation mein likhna parametric form deta hai.  

**Final answer**  
$$x=1+2\lambda,\quad y=2-\lambda,\quad z=3+4\lambda.$$

*Reflection:* Yeh sabse simple case hai; zero components nahi the isliye conversion seedha tha.

**Example 2 — Symmetric form from parametric**  
*Given:* Parametric equations \(x=3+2t\), \(y=-1+3t\), \(z=4-t\).  
*Find:* Symmetric equations.  

\(\lambda\) ko solve karo:  
\(\frac{x-3}{2}=t\), \(\frac{y+1}{3}=t\), \(\frac{z-4}{-1}=t\).  
Teeno equal kar do.  
*Why:* Parameter ko eliminate karke ek common ratio mil jaata hai.  

**Final answer**  
$$\frac{x-3}{2}=\frac{y+1}{3}=\frac{z-4}{-1}.$$

*Reflection:* Agar koi denominator zero hota toh alag handling chahiye hoti.

**Example 3 — Line through two points**  
*Given:* Points \(P(2,1,0)\) aur \(Q(5,3,4)\).  
*Find:* Vector equation.  

Direction vector \(\vec{d}=Q-P=\langle 3,2,4\rangle\).  
Vector form: \(\vec{r}=\langle 2,1,0\rangle + \lambda\langle 3,2,4\rangle\).  
*Why:* Do points ka difference hi direction deta hai.  

**Final answer**  
$$\vec{r}=\langle 2,1,0\rangle + \lambda\langle 3,2,4\rangle.$$

*Reflection:* Yeh method tab useful hai jab direction vector directly na diya ho.

**Example 4 — Line parallel to a given line**  
*Given:* Line \(\frac{x-1}{2}=\frac{y+3}{1}=\frac{z}{4}\) aur point (0,0,0).  
*Find:* Parametric equations of parallel line.  

Direction same rahega \(\langle 2,1,4\rangle\).  
Parametric: \(x=0+2\lambda\), \(y=0+\lambda\), \(z=0+4\lambda\).  
*Why:* Parallel lines ka direction vector proportional hota hai.  

**Final answer**  
$$x=2\lambda,\quad y=\lambda,\quad z=4\lambda.$$

*Reflection:* Point change karne se sirf constant term badalta hai, direction nahi.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Direction vector ko zero le lena  | Students (0,0,0) as direction soch lete hain | Pehle check karo ki vector non-zero hai      |
| Zero component ko ignore karna    | Symmetric form mein division by zero        | Zero wale coordinate ko constant equation banao |
| Direction vector ko normal vector samajhna | 2D plane equations se confusion           | Yaad rakho line ke liye direction chahiye, normal nahi |
| Parameter ko sirf positive maanna | \(\lambda\) negative bhi ho sakta hai       | \(\lambda \in \mathbb{R}\) clearly likho     |
| Two lines ko parallel bol dena jab direction proportional nahi | Proportionality check bhool jaate hain     | Direction vectors ka cross product zero check karo |
| Point aur direction swap kar dena | Equation galat ban jaati hai                | Hamesha point fixed aur direction multiplier ke saath likho |

## 7. The textbook-precise statement
A straight line in three-dimensional space may be represented by the vector equation \(\vec{r}=\vec{r}_0+t\vec{v}\), where \(\vec{r}_0\) is the position vector of a fixed point on the line, \(\vec{v}\neq\vec{0}\) is a direction vector, and \(t\in\mathbb{R}\). The corresponding parametric equations are \(x=x_0+tv_x\), \(y=y_0+tv_y\), \(z=z_0+tv_z\). When \(v_x,v_y,v_z\) are all nonzero, the symmetric equations are \(\frac{x-x_0}{v_x}=\frac{y-y_0}{v_y}=\frac{z-z_0}{v_z}\). (Thomas’ Calculus, 15th ed., §12.5)

## 8. Visual — diagram or schematic
```
z
|
|     / line
|    /
|   /   direction vector d
|  /
| /_______________ y
|/
origin
x
```
Line ek anchor point se shuru hoti hai aur direction vector ke parallel infinite dono taraf jaati hai. Coordinates (x,y,z) teen axes par project hote hain.

## 9. The memory technique
1. **The hook** — Imagine a train starting from station \(\vec{a}\) and always moving in fixed direction \(\vec{d}\); every position is \(\vec{a}+\lambda\vec{d}\).
2. **What to overlearn** — Vector form \(\vec{r}=\vec{a}+\lambda\vec{d}\), parametric three equations, symmetric single-ratio form.
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Agar form bhool jaaye toh do points le lo, unka difference direction vector banao, phir vector addition se equation likho.

## 10. What this unlocks
Yeh line equations aapko planes ke saath intersection, shortest distance between skew lines, aur angle between lines nikaalne ke liye taiyaar karte hain.

- Plane-line intersection problems
- Distance between two skew lines using cross product
- Angle between two lines via dot product of direction vectors
- Ray-triangle intersection in computational geometry
- Parametric curves aur space curves ka introduction

## 11. Self-check — five questions, no answers
1. Ek line ka vector equation likho jo point (3,-1,2) se guzarti ho aur direction vector \(\langle 1,1,1\rangle\) ke parallel ho.
2. Parametric equations \(x=2+3t\), \(y=1-t\), \(z=4+2t\) ko symmetric form mein convert karo.
3. Do points (0,0,0) aur (1,2,3) se guzarn<|eos|>