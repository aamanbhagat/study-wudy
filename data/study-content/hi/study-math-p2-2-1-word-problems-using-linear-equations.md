## 1. The one-sentence answer
**Word problems using linear equations** ka matlab hai real-life situations ko ek single linear equation mein translate karke unknown value nikaalna.

Aap pehle situation ko carefully padhte ho, unknown quantity ko ek variable se represent karte ho, phir given conditions ko ek equation ki form mein likhte ho. Us equation ko solve karke numerical answer nikaalte ho aur phir usko original situation mein check karte ho.

Yeh technique sirf school problems tak limited nahi hai; yeh aapko sikhaati hai ki kaise language ko precise mathematical relationships mein badla jaaye.

> [!NOTE]
> Sabse badi “aha” yeh hai ki equation sirf numbers ka khel nahi hai — woh ek aisa bridge hai jo words mein chhupe relationships ko exact numbers mein badal deta hai. Ek galat translation poora answer barbaad kar deta hai, chahe calculation bilkul sahi ho.

## 2. Why this matters — concrete and current
SpaceX rocket landing calculations mein descent rate aur fuel burn ko linear relationships se model kiya jaata hai taaki real-time trajectory updates possible hon.

Uber aur Lyft jaise ride-sharing platforms surge pricing ke liye base fare aur distance ko linear equations se link karte hain, jisse har ride ke liye optimal price turant calculate ho jaaye.

Semiconductor fabs mein wafer yield optimization ke liye defect density aur production volume ke beech linear models use kiye jaate hain, jaise Intel aur TSMC ke process-control teams karte hain.

Personal finance apps jaise Mint aur YNAB budget allocation problems solve karne ke liye linear equations ka use karte hain jab multiple expense categories fixed total ke andar fit kiye jaate hain.

Agricultural research papers (jaise FAO ke reports) crop yield aur fertilizer quantity ke beech linear relationships model karke optimal input levels decide karte hain.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                      |
|----------------------------|-----------------------------------------------------------|
| Solving linear equations   | Final numerical answer nikaalne ke liye zaroori hai       |
| Variables and expressions  | Unknown quantity ko represent karne ke liye               |
| Translating phrases        | “more than”, “is”, “total” jaise words ko symbols mein badalne ke liye |
| Basic arithmetic           | Equation solve karte waqt addition, subtraction, multiplication handle karne ke liye |

Agar upar ke koi bhi concept weak hain to pehle unko solid kar lo warna word-problem steps adhure rahenge.

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the unknown quantity
Aap situation ko padhkar decide karte ho ki asal mein kis cheez ki value nikaalni hai.  
Example: “Rohan ki umar uske bhai se 5 saal zyada hai aur dono ki combined umar 27 hai.” Yahan unknown hai Rohan ki umar.  
Formal statement: Let \(x\) represent the unknown quantity.  
> [!WARNING] Agar aap galat quantity ko unknown maan lete ho to baaki saari conditions uske hisaab se fit nahi baithengi aur equation banega hi nahi.

### Step 2 — Assign a single variable
Sirf ek variable use karo kyunki yeh single linear equation ka topic hai.  
Example: Rohan ki umar \(x\) maano, bhai ki umar \(x-5\).  
Formal: \(x \in \mathbb{R}\), \(x > 5\).  
> [!WARNING] Do variables introduce karne se equation system ban jaata hai jo abhi is stage par allowed nahi hai.

### Step 3 — Translate every condition into an equation
Har sentence ko ek mathematical relationship mein badlo.  
Example: “Combined umar 27 hai” → \(x + (x-5) = 27\).  
Formal: \(\text{sum of expressions} = \text{given total}\).  
> [!WARNING] “Is” aur “more than” jaise words ko galat symbol se replace karna sabse common error hai.

### Step 4 — Simplify and solve the equation
Combine like terms aur standard linear-equation methods se solve karo.  
Example: \(2x - 5 = 27\) → \(2x = 32\) → \(x = 16\).  
Formal: \(ax + b = c\) form mein laakar \(x = \frac{c-b}{a}\).  
> [!WARNING] Arithmetic mistakes yahan chhup jaati hain kyunki focus translation par hota hai.

### Step 5 — Verify the answer in the original problem
Calculated value ko wapas words mein daal kar check karo.  
Example: Rohan 16, bhai 11, total 27 — sahi hai.  
Formal: Substitute \(x\) back into all verbal conditions.  
> [!WARNING] Verification step skip karne se unit mismatch ya sign error detect nahi hota.

### Step 6 — State the final answer with units/context
Sirf number nahi, uska matlab bhi likho.  
Formal: The required quantity is \(x = 16\) years.

## 5. Worked examples — har step show karo

**Example 1 — Simple age difference**  
*Given:* A father is 28 years older than his son. In 5 years, father will be 4 times as old as the son.  
*Find:* Present ages.  
Let son’s present age be \(x\) years.  
Father’s present age = \(x + 28\).  
In 5 years: \(x + 28 + 5 = 4(x + 5)\).  
\(x + 33 = 4x + 20\).  
\(-3x = -13\).  
\(x = \frac{13}{3}\).  
**Final answer: son is \(\frac{13}{3}\) years old, father is \(\frac{109}{3}\) years old.**  
*Reflection:* Translation of “4 times” into multiplication is the only non-obvious step; once done, algebra is routine.

**Example 2 — Distance-speed-time**  
*Given:* A car travels 240 km at a constant speed. If speed were 20 km/h more, time would reduce by 1 hour.  
*Find:* Original speed.  
Let speed = \(v\) km/h.  
Time = \(\frac{240}{v}\).  
New equation: \(\frac{240}{v+20} = \frac{240}{v} - 1\).  
Multiply both sides by \(v(v+20)\): \(240v = 240(v+20) - v(v+20)\).  
\(240v = 240v + 4800 - v^2 - 20v\).  
\(v^2 + 20v - 4800 = 0\).  
\((v + 80)(v - 60) = 0\).  
\(v = 60\) (discard negative).  
**Final answer: 60 km/h.**  
*Reflection:* Units must stay consistent; forgetting “per hour” leads to dimension error.

**Example 3 — Mixture problem**  
*Given:* How many litres of 20 % acid solution must be added to 10 litres of 50 % solution to get 30 % solution?  
*Find:* Volume of 20 % solution.  
Let \(x\) litres of 20 % solution.  
Acid balance: \(0.2x + 0.5 \times 10 = 0.3(x + 10)\).  
\(0.2x + 5 = 0.3x + 3\).  
\(2 = 0.1x\).  
\(x = 20\).  
**Final answer: 20 litres.**  
*Reflection:* Percentages must be converted to decimals before forming the equation.

**Example 4 — Ticket sales with two prices**  
*Given:* 1200 tickets sold; adult tickets ₹150, child tickets ₹80; total revenue ₹144000.  
*Find:* Number of adult tickets.  
Let adult tickets = \(a\).  
Child tickets = \(1200 - a\).  
\(150a + 80(1200 - a) = 144000\).  
\(150a + 96000 - 80a = 144000\).  
\(70a = 48000\).  
\(a = \frac{48000}{70} \approx 685.71\) (must be integer, check context).  
**Final answer: 686 adult tickets (rounded after verification).**  
*Reflection:* Real data may require rounding; always verify total revenue after rounding.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using two variables         | Student thinks every quantity needs its own symbol | Force yourself to express everything in terms of one variable |
| Ignoring units              | Focus only on numbers                       | Write units beside every quantity            |
| Misreading “more than” as subtraction | Language habit overrides math meaning       | Underline comparison words before translating |
| Forgetting to verify        | Relief after getting a number               | Make verification a mandatory last step      |
| Treating percentages as numbers | 20 % looks like 20                          | Always convert % to decimal or fraction first |
| Assuming all answers positive | Real life can have negative quantities      | Check domain restrictions after solving      |
| Skipping “in 5 years” shift | Time offset missed in age problems          | Add or subtract the time offset to every age |

## 7. The textbook-precise statement
A word problem involving one unknown is solved by (1) identifying the unknown quantity, (2) assigning a variable to it, (3) translating each verbal condition into an algebraic equation using the four arithmetic operations and equality, (4) solving the resulting linear equation \(ax + b = c\) where \(a \neq 0\), and (5) verifying that the obtained value satisfies every original condition. (Sullivan, *Algebra & Trigonometry*, 11e, §2.3)

## 8. Visual — diagram or schematic
```text
Word Problem
      │
      ▼
Identify unknown → Let x = ...
      │
      ▼
Translate each sentence → Build equation
      │
      ▼
Simplify & solve → ax+b=c
      │
      ▼
Substitute back & check units
      │
      ▼
State answer with context
```

## 9. The memory technique

**The hook**  
Imagine a bridge made of the word “LET”: one end is the English sentence, the other end is the equation; the single pillar in the middle is the variable you define with “Let”.

**What to overlearn**  
- “Is” always becomes “=”.  
- “More than” or “less than” becomes “+” or “−” the given quantity.  
- Percentages convert to decimals before any arithmetic.

**Spaced-repetition schedule**  
Review the five translation rules after 1 day, 3 days, 7 days, 16 days and 35 days.

**First-principles fallback**  
Agar koi rule yaad na rahe to har sentence ko do hisson mein todo — “left side” aur “right side” — aur dono ko alag-alag algebraic expressions mein likho.

## 10. What this unlocks
Yeh technique aapko systems of linear equations, quadratic word problems, aur exponential growth models tak le jaati hai.

- Systems of equations (two or more unknowns)  
- Rate-time-distance problems with multiple objects  
- Mixture and concentration problems in chemistry  
- Break-even analysis in microeconomics  
- Linear programming constraints (later stage)

## 11. Self-check — five questions, no answers
1. A number increased by 12 is equal to twice the number minus 3. Find the number.  
2. The sum of three consecutive even integers is 48. What are the integers?  
3. A boat travels 36 km downstream in 2 hours and returns upstream in 3 hours. Find the speed of the boat in still water and the speed of the current.  
4. How many millilitres of pure acid must be added to 300 ml of 15 % solution to raise the concentration to 25 %?  
5. In a family the father’s age is presently three times his daughter’s age. Five years ago the father was five times as old as the daughter. Find their present ages.