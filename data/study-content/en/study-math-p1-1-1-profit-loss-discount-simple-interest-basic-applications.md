## 1. The one-sentence answer
**These four concepts are percentage-based differences applied to buying, selling, and lending money over time.**

Profit arises when a seller receives more than the purchase cost; loss is the opposite. Discount reduces the listed price to reach the actual transaction price. Simple interest measures the fixed-fee growth of a principal amount at a constant rate for a given period. Each quantity is obtained by subtracting two monetary values or scaling a principal by a rate and time fraction.

The underlying arithmetic is identical in every case: identify the two reference amounts, subtract to obtain an absolute difference, and (when required) divide by the reference amount to convert the difference into a percentage. This single pattern covers retail pricing, bank loans, and any transaction where value changes by a fixed proportion.

The same subtraction-and-scaling logic appears in tax calculations, depreciation schedules, and performance metrics, so mastery here removes repeated obstacles later.

> [!NOTE]
> The single most important insight is that “percent of what?” must be answered before any calculation; the reference base changes between profit (cost price), discount (marked price), and interest (principal).

## 2. Why this matters — concrete and current
Amazon’s dynamic pricing engine recomputes selling prices every few minutes using real-time cost, competitor marked prices, and target profit margins expressed as percentages; an error of one percentage point on high-volume items alters daily revenue by millions of dollars.

SpaceX’s supplier contracts for Starship components include simple-interest penalty clauses for late delivery; the finance team therefore converts each clause into an exact daily accrual so cash-flow forecasts remain accurate to the cent.

Apple’s education pricing applies an institutional discount to the marked price of MacBooks; procurement officers at universities must verify that the final invoice reflects both the published discount rate and any volume-based profit adjustments Apple may have layered on top.

Micro-lending platforms such as Kiva publish simple-interest schedules so borrowers in developing regions can see the exact repayment amount after N days without needing compound-interest formulas; regulators audit these schedules against the arithmetic definitions below.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Place value and decimal arithmetic | All monetary amounts are expressed with two decimal places; misaligned decimals produce rounding errors in percentages. |
| Fraction-to-percentage conversion | Profit, loss, discount, and interest are almost always stated as percentages; the conversion  p/100  must be instantaneous. |
| Order of operations (PEMDAS) | Interest formulas contain multiplication and division that must be performed left-to-right after parentheses. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Cost price versus selling price
Any transaction begins with two distinct monetary values: what the seller paid (cost price, CP) and what the buyer paid (selling price, SP).  
Example: a shop buys a pen for 8 and sells it for 10.  
Formally:  
CP and SP are positive real numbers with the same currency unit.  
> [!WARNING]
> Treating SP as the reference base when calculating profit percentage produces an incorrect ratio that does not reflect the seller’s actual return on outlay.

### Step 2 — Profit and loss as signed differences
Subtract the two prices. A positive result is profit; a negative result is loss.  
Example continued: SP − CP = 10 − 8 = +2 (profit).  
Formally:  
Profit = SP − CP  or  Loss = CP − SP.  
> [!WARNING]
> Omitting the absolute-value step when stating “percentage loss” leads to negative percentages that confuse downstream comparisons.

### Step 3 — Expressing the difference as a percentage of the cost price
Divide the absolute difference by CP and multiply by 100.  
Example: (2 / 8) × 100 = 25 %.  
Formally:  
Profit % = ((SP − CP) / CP) × 100.  
> [!WARNING]
> Using SP in the denominator instead of CP yields the “markup percentage,” a different quantity used in retail planning.

### Step 4 — Marked price and discount
A seller may first announce a marked price (MP) higher than CP, then reduce it by a discount D to obtain the final SP.  
Example: MP = 12, D = 2, SP = 10.  
Formally:  
SP = MP − D  or  Discount % = (D / MP) × 100.  
> [!WARNING]
> Applying the discount percentage to CP rather than MP understates the reduction actually offered to the customer.

### Step 5 — Simple interest as proportional growth
When money is lent, the lender charges a fixed percentage of the principal P each year. For time t years at annual rate r percent the interest I is obtained by scaling.  
Example: P = 1000, r = 5, t = 2 → I = 100.  
Formally:  
I = (P × r × t) / 100.  
> [!WARNING]
> Inserting a fractional year without converting t to a consistent unit (days/365) violates the simple-interest assumption of uniform daily accrual.

### Step 6 — Total amount due
The borrower repays principal plus interest.  
Formally:  
A = P + I = P(1 + rt/100).  
This is the textbook statement of simple interest.

## 5. Worked examples — every step shown

**Example 1 — Single-item profit**  
*Given:* CP = 240, SP = 300.  
*Find:* Profit percentage.  
Step 1: Compute difference → 300 − 240 = 60.  
*Why:* Subtraction isolates the absolute profit.  
Step 2: Divide by CP → 60 / 240 = 0.25.  
*Why:* The ratio expresses profit relative to outlay.  
Step 3: Convert to percent → 0.25 × 100 = 25 %.  
**25 %**  
*Reflection:* The example is straightforward; the same three lines generalise to any single transaction.

**Example 2 — Discount calculation**  
*Given:* MP = 450, discount rate 20 %.  
*Find:* Selling price.  
Step 1: Discount amount = 450 × 0.20 = 90.  
*Why:* 20 % of the marked price is the reduction.  
Step 2: SP = 450 − 90 = 360.  
*Why:* Subtraction yields the price the customer actually pays.  
**360**  
*Reflection:* The reference base is MP, not CP; confusing the two is the most common slip.

**Example 3 — Simple interest over fractional year**  
*Given:* P = 8000, r = 6, t = 9 months.  
*Find:* Interest earned.  
Step 1: Convert months to years → t = 9/12 = 0.75.  
*Why:* The formula expects time in years.  
Step 2: I = (8000 × 6 × 0.75) / 100 = 360.  
*Why:* Multiplication by rate and time scales the principal linearly.  
**360**  
*Reflection:* The fraction 9/12 must be written explicitly; omitting it produces an answer nine times too large.

**Example 4 — Loss followed by discount**  
*Given:* CP = 500, MP = 600, discount 15 %, sold at discounted price.  
*Find:* Final profit or loss percentage on CP.  
Step 1: Discount amount = 600 × 0.15 = 90.  
*Why:* Discount is taken on marked price.  
Step 2: SP = 600 − 90 = 510.  
*Why:* Net amount received by seller.  
Step 3: Profit = 510 − 500 = 10.  
*Why:* Positive difference shows net gain.  
Step 4: Profit % = (10 / 500) × 100 = 2 %.  
**2 %**  
*Reflection:* Two successive percentage operations require an intermediate absolute price; attempting to combine percentages directly yields an incorrect 5 % figure.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using SP as base for profit %     | Habit of thinking “percent of final price”          | Always write “/ CP” immediately after the difference |
| Applying discount to CP           | Visual proximity of CP and MP on the page           | Circle the word “marked” before calculating          |
| Forgetting to convert months to years | Calendar intuition stronger than algebraic units   | Insert a one-line unit-conversion step first         |
| Treating loss percentage as negative | Desire to keep sign information                     | Compute absolute loss then attach “loss” label       |
| Adding percentages (20 % + 10 % = 30 %) | Linear intuition fails on successive % changes    | Convert each percentage to an absolute amount first  |
| Using 365 days for leap years in interest | Over-generalising “year = 365”                      | Check whether the contract specifies 365 or 360      |
| Rounding intermediate money values | Desire for “nice” numbers mid-calculation           | Keep at least four decimal places until the final line |

## 7. The textbook-precise statement
Let CP, SP, MP, P be positive real numbers denoting cost price, selling price, marked price, and principal respectively. Let r, t be non-negative reals denoting annual interest rate (percent) and time (years). Then:

Profit = SP − CP, Loss = CP − SP,  
Discount = MP − SP,  
Simple interest I = (P r t)/100, Amount A = P + I.

These identities appear in any standard arithmetic text; see, for example, Hall & Knight, *Higher Arithmetic*, §47–§52.

## 8. Visual — diagram or schematic
```text
Cost Price (CP) ──► [add Profit] ──► Selling Price (SP)
                  │
                  └──► [if SP < CP] ──► Loss

Marked Price (MP) ──[subtract Discount]──► SP

Principal (P) ──[× (r/100) × t]──► Interest (I)
               │
               └──[add I]──► Amount Due (A)
```
Horizontal arrows represent arithmetic operations; vertical branches show mutually exclusive paths (profit vs. loss).

## 9. The memory technique

**The hook**  
Picture a shopkeeper’s till: money going in (CP) versus money going out (SP). A green arrow labelled “+” means profit; a red arrow labelled “−” means loss. A second till on the wall shows the marked price tag being torn down by a discount scissors. A third till grows like a plant watered at a constant rate (simple interest).

**What to overlearn**  
1. Profit % = ((SP − CP)/CP) × 100  
2. Discount % = ((MP − SP)/MP) × 100  
3. I = P r t / 100

**Spaced-repetition schedule**  
Review the three formulas at 1 day, 3 days, 7 days, 16 days, and 35 days after first mastery.

**First-principles fallback**  
If the formulas vanish, return to the definition: subtract the two reference amounts, then divide by the chosen base (CP, MP, or P) and multiply by 100 when a percentage is required.

## 10. What this unlocks
These four operations are the arithmetic substrate for every subsequent financial model.  

- Compound interest replaces the linear factor rt with the exponential (1 + r/n)^(nt).  
- Present-value calculations invert the simple-interest formula to solve for P.  
- Depreciation schedules apply repeated loss percentages.  
- Break-even analysis equates total revenue (SP × quantity) to total cost (CP × quantity) plus fixed overhead.

## 11. Self-check — five questions, no answers
1. A trader buys 120 articles at ₹15 each and sells them at ₹18 each. What is the profit percent?  
2. The marked price of a watch is ₹2 400. A 12 % discount is offered. What is the selling price?  
3. ₹5 000 is lent at 7 % per annum simple interest for 8 months. Calculate the interest due.  
4. An item is bought for ₹800, marked at ₹1 000, sold after a 15 % discount. Did the seller make a profit or loss, and by what percent on cost price?  
5. A shopkeeper claims “20 % profit and 10 % discount.” Show, with explicit numbers, why the net profit percentage is not 10 %.