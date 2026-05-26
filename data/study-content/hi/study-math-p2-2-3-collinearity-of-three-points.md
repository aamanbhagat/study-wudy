## 1. The one-sentence answer
**Three points are collinear when they lie on exactly the same straight line in the plane.**

Aap already coordinates use karte ho to describe position. Jab teen points ek hi line par hote hain, unke beech ka distance aur direction ek dusre se related hota hai. Iska matlab slope jo pehle do points ke beech banta hai, wohi slope teesre point ke liye bhi aayega. Ya phir un teeno points se bana triangle ka area zero ho jaata hai.

Yeh idea coordinate geometry ki buniyad hai kyunki line ki equation nikaalne ke liye pehle yeh confirm karna padta hai ki points line par hain ya nahi. Agar points collinear nahi hain to unke beech ek unique triangle banta hai jiska area non-zero hota hai.

> [!NOTE]
> Sabse badi "aha" yeh hai ki collinearity ek single algebraic condition (determinant ya slope equality) mein capture ho jaati hai — geometry ko numbers mein badal deta hai bina diagram khenche.

## 2. Why this matters — concrete and current
In GPS receivers (Garmin aur u-blox chips), three consecutive satellite positions ko check kiya jaata hai taaki straight-line trajectory validate ho sake; agar collinear nahi to multipath error detect hota hai.

Computer vision pipelines mein OpenCV ki Hough transform line detection step pehle three-point collinearity test use karti hai taaki noisy edge points ko discard kiya ja sake before fitting final line.

Semiconductor mask alignment (ASML lithography machines) mein three fiducial marks ki collinearity confirm ki jaati hai; thodi si bhi deviation se overlay error nanometers mein badh jaata hai.

Robotics path planning (Boston Dynamics Spot robot) straight-line segments generate karti hai jahaan successive waypoints ki collinearity check karke unnecessary turns avoid kiye jaate hain.

Fundamental physics experiments jaise LHC track reconstruction mein three consecutive silicon detector hits ko collinear mana jaata hai taaki particle trajectory ko seed diya ja sake before Kalman filtering.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Cartesian coordinates | Points ko (x, y) pairs ke roop mein represent karne ke liye |
| Slope of a line       | Do points ke beech direction compare karne ke liye        |
| Distance formula      | Line segment length verify karne ke liye (optional check) |

Agar slope ya coordinates abhi weak hain to pehle wohi revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Straight line means constant direction
Aap sochiye ki ek line par chalte hue har point ka direction (rise over run) same rehta hai.  
Example: points (0,0), (1,1), (2,2) — har baar y/x = 1.  
Formal statement: slope between first-second equals slope between second-third.  
> [!WARNING] Agar aap slope ko sirf visually soch kar equality likh dete ho bina denominator zero check kiye to vertical line par undefined slope aa jaayega.

### Step 2 — Slope equality as first test
Do points (x₁,y₁) aur (x₂,y₂) ke beech slope m = (y₂ − y₁)/(x₂ − x₁).  
Teesra point (x₃,y₃) tabhi collinear hai jab (y₃ − y₁)/(x₃ − x₁) = m.  
Display math:  
$$\frac{y_2-y_1}{x_2-x_1}=\frac{y_3-y_1}{x_3-x_1}$$

### Step 3 — Cross-multiplication removes fractions
Cross multiply karke ek equation mil jaati hai:  
(y₂ − y₁)(x₃ − x₁) = (y₃ − y₁)(x₂ − x₁)

### Step 4 — Area of triangle becomes zero
Teen points se triangle ka area formula zero set kar do:  
$$x_1(y_2-y_3)+x_2(y_3-y_1)+x_3(y_1-y_2)=0$$

### Step 5 — Determinant view (compact form)
Wohi area condition determinant ke roop mein:  
$$\begin{vmatrix}x_1&y_1&1\\x_2&y_2&1\\x_3&y_3&1\end{vmatrix}=0$$

### Step 6 — Vector approach
Vector AB = k · AC for some scalar k.  
Iska matlab direction vectors linearly dependent hain.

### Step 7 — All methods equivalent
Slope, area, determinant aur vector — sab ek dusre se logically derive hote hain, isliye koi bhi ek test kaafi hai.

## 5. Worked examples — har step show karo

**Example 1 — Basic horizontal check**  
*Given:* (1,4), (3,4), (5,4)  
*Find:* Are they collinear?  
Slope between first two: (4-4)/(3-1) = 0.  
Slope between second and third: (4-4)/(5-3) = 0.  
0 = 0, hence collinear.  
*Why:* Horizontal line par y constant rehta hai.  
**Final answer: collinear**

*Reflection:* Simple case jahaan slope zero hota hai; generalise karne par y₁ = y₂ = y₃ condition nikalti hai.

**Example 2 — Slope equality with fractions**  
*Given:* (−2,1), (1,3), (4,5)  
*Find:* Collinearity?  
m₁₂ = (3-1)/(1-(-2)) = 2/3  
m₂₃ = (5-3)/(4-1) = 2/3  
Equal, hence collinear.  
*Why:* Cross-check dono slopes se kiya taaki fraction error na ho.  
**Final answer: collinear**

*Reflection:* Fractions same aaye toh bhi cross-multiply karke verify karna safe rehta hai.

**Example 3 — Using area formula**  
*Given:* (0,0), (2,3), (4,6)  
*Find:* Collinearity via area?  
0(3-6) + 2(6-0) + 4(0-3) = 0 + 12 − 12 = 0.  
*Why:* Area zero matlab points line par.  
**Final answer: collinear**

*Reflection:* Area method vertical lines ke liye bhi kaam karta hai.

**Example 4 — Non-collinear case with determinant**  
*Given:* (1,2), (3,4), (5,7)  
*Find:* Status?  
Determinant = 1(4-7) + 3(7-2) + 5(2-4) = −3 + 15 − 10 = 2 ≠ 0.  
*Why:* Non-zero value seedha proof hai ki triangle bana hai.  
**Final answer: not collinear**

*Reflection:* Determinant method ek hi calculation mein final verdict deta hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                          | How to avoid it                              |
|-----------------------------|-----------------------------------------|----------------------------------------------|
| Forgetting vertical line (division by zero) | Slope formula mein x₂ = x₁ hota hai     | Pehle x-coordinates check kar lo             |
| Sign error in area formula  | Cyclic order galat yaad                 | Points ko counterclockwise order mein likho  |
| Using only two points       | Teesra point ignore ho jaata hai        | Hamesha teenon points ka test lo             |
| Assuming integer slopes     | Rational slopes ko overlook karte hain  | Cross-multiply karke fraction compare karo   |
| Calculator rounding         | 2/3 aur 0.666… ko alag samajhna         | Exact fractions ya determinant use karo      |
| Duplicate points            | (x,y) aur (x,y) collinear dikh jaate hain | Pehle points distinct hain ya nahi check karo |

## 7. The textbook-precise statement
Three distinct points A(x₁,y₁), B(x₂,y₂), C(x₃,y₃) in the Cartesian plane are collinear if and only if the determinant  
$$\begin{vmatrix}x_1 & y_1 & 1 \\ x_2 & y_2 & 1 \\ x_3 & y_3 & 1\end{vmatrix} = 0.$$  
Equivalently, the vectors AB and AC are linearly dependent: there exists a scalar k such that (x₂−x₁, y₂−y₁) = k(x₃−x₁, y₃−y₁).  
This is stated in Anton, *Elementary Linear Algebra*, 12e, §1.2 and also appears as the degenerate case of the triangle area formula in Stewart, *Calculus*, 9e, §1.8.

## 8. Visual — diagram or schematic
```
y
↑
|     C(4,6)
|    /
|   /
|  B(2,3)
| /
A(0,0)--------→ x
```
Teeno points ek hi straight line par hain; slope constant = 3/2.

## 9. The memory technique

1. **The hook** — “Three on a line, determinant zero shine.”
2. **What to overlearn** — Area formula x₁(y₂−y₃)+x₂(y₃−y₁)+x₃(y₁−y₂)=0 aur slope equality condition.
3. **Spaced-repetition schedule** — 1 din, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Slope compare karo; agar vertical line dikhe to area formula use karo.

## 10. What this unlocks
Collinearity seedha line equation nikaalne, concurrency of lines, aur area-based proofs ki taraf le jaata hai.

- Equation of line through two points
- Checking concurrency of three lines
- Barycentric coordinates in triangle geometry
- Convex hull algorithms in computational geometry

## 11. Self-check — five questions, no answers
1. (0,0), (√2,√2), (2,2) collinear hain kya? Slope method se verify karo.
2. Area formula use karke (1,−1), (2,3), (3,7) ki collinearity decide karo.
3. Vertical line par teen points (5,1), (5,4), (5,9) ke liye kaunsa test sabse safe hai?
4. Agar determinant 0.0002 aaye to points collinear maane ja sakte hain? Reasoning do.
5. Vector AB = 2·AC hai lekin points distinct hain; kya yeh collinearity prove karta hai? Example ke saath explain karo.