## 1. The one-sentence answer
**Profit, loss, discount aur simple interest sab percentage-based comparisons hain jo cost price, selling price aur time ke beech relative change measure karte hain.**

Yeh concepts aapko batate hain ki jab koi cheez kharido aur becho to kitna extra ya kam paisa aata hai, aur jab paisa time ke saath badhe to uska hisaab kaise lage. Profit tab banta hai jab selling price cost price se zyada ho; loss tab hota hai jab selling price kam ho. Discount ek artificial price reduction hota hai jo effective selling price ko badalta hai, jabki simple interest time ke hisaab se principal par fixed rate se calculate hota hai. In sab mein ek common pattern hai: har cheez ko ek reference value (jaise cost price ya principal) ke against percentage mein compare karna.

> [!NOTE]
> Sabse badi aha yeh hai ki profit/loss aur interest mein koi bhi calculation sirf do numbers ke beech percentage difference nikalne ka naam hai — baaki sab usi ek formula ka expansion hai.

## 2. Why this matters — concrete and current
Amazon ke warehouse operations mein daily inventory turnover par profit margin track kiya jata hai taaki dynamic pricing algorithms sahi discount decide kar sakein. Jab bhi koi item return hota hai, loss calculation seedha unke restocking cost aur resale price mein difference batata hai.

RBI-regulated fintech apps jaise PhonePe aur Paytm Savings accounts mein simple interest daily basis par calculate hota hai; yeh calculation unke fractional reserve models aur liquidity forecasting ke liye critical hai.

ISRO ke PSLV launch missions mein component suppliers ke saath contracts profit-loss clauses par based hote hain — agar koi part late deliver hota hai to penalty (negative profit) apply hoti hai jo mission timeline ko directly affect karti hai.

Semiconductor foundries jaise TSMC apne wafer pricing mein volume discounts use karte hain; yeh discounts effective cost of production ko change karte hain aur quarterly margin reports mein simple interest-based carrying cost ke saath combine hote hain.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Basic percentage     | Har profit, loss, discount aur interest percentage change par based hai |
| Arithmetic operations (+, −, ×, ÷) | Cost price, selling price aur interest ke hisaab mein yeh operations bar-bar lagega |
| Fraction to decimal conversion | Percentage ko decimal form mein badalna padta hai calculations ke liye |

Agar aapko percentage ka matlab ya uska fraction/decimal conversion clear nahi hai, to pehle woh padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Cost price aur selling price ki pehchaan
Profit ya loss tabhi samajh aata hai jab aap jaan lo ki kisi cheez ko kharidne mein kitna kharcha aaya aur bechne mein kitna mila. Cost price (CP) woh original kharidne ki kimat hai; selling price (SP) woh kimat hai jis par becha jaata hai.

Example: Ek kitab ₹200 mein kharidi aur ₹250 mein bechi. Yahan CP = 200, SP = 250.

Formal statement:  
$$ \text{Profit/Loss} = SP - CP $$

> [!WARNING]
> Agar aap CP aur SP ko ulat-pulat kar do to sign galat ho jaayega aur profit ko loss samajh aa sakta hai.

### Step 2 — Profit aur loss ko percentage mein badalna
Absolute difference (SP − CP) se kuch nahi pata chalta; relative change jaanna zaroori hai. Isliye difference ko CP ke against percentage mein nikaalte hain.

Example: Upar wali kitab mein difference = 50. 50 ko 200 se divide karke ×100 karo to 25% profit.

Formal statement:  
$$ \text{Profit \%} = \frac{SP - CP}{CP} \times 100 $$

### Step 3 — Discount ka asar
Discount ek temporary price cut hai jo marked price (MP) par lagta hai. Effective SP = MP − discount. Discount percentage ko bhi CP ke hisaab se nahi, MP ke hisaab se calculate karte hain.

Example: MP = ₹300, 20% discount → effective SP = 300 − 60 = 240.

Formal statement:  
$$ \text{Discount amount} = \frac{\text{Discount \%}}{100} \times MP $$

### Step 4 — Simple interest ka basic model
Simple interest mein har period ke liye interest sirf original principal par calculate hota hai, compound nahi hota. Formula time ke saath linear hota hai.

Formal statement:  
$$ I = \frac{P \times R \times T}{100} $$
jahan P = principal, R = annual rate (%), T = time in years.

### Step 5 — Amount aur total repayment
Interest ke baad final amount principal plus interest hota hai. Yeh step loan repayment ya maturity value nikaalne ke liye zaroori hai.

Formal statement:  
$$ A = P + I = P\left(1 + \frac{RT}{100}\right) $$

## 5. Worked examples — har step show karo

**Example 1 — Simple profit calculation**  
*Given:* Ek pen ₹45 mein kharida aur ₹54 mein becha.  
*Find:* Profit percentage.  

Step 1: CP = 45, SP = 54.  
Step 2: Profit = 54 − 45 = 9.  
Step 3: Profit % = (9 / 45) × 100 = 20.  
*Why:* Har baar difference ko original CP se divide karte hain taaki relative measure mile.  

**20**

*Reflection:* Yeh sabse basic case hai; yahin se aap seekhte ho ki percentage hamesha reference value (CP) ke against nikalti hai.

**Example 2 — Loss with discount**  
*Given:* Ek watch marked price ₹800 par 15% discount ke baad bechi, lekin asli CP ₹650 tha.  
*Find:* Net profit ya loss percentage.  

Step 1: Discount amount = 0.15 × 800 = 120.  
Step 2: Effective SP = 800 − 120 = 680.  
Step 3: Profit = 680 − 650 = 30.  
Step 4: Profit % = (30 / 650) × 100 ≈ 4.615.  
*Why:* Discount pehle MP se nikaalte hain, phir final SP ko CP ke saath compare karte hain.  

**≈ 4.62% profit**

*Reflection:* Discount aur profit dono ek saath aane par reference value sahi rakhna padta hai warna percentage galat nikalti hai.

**Example 3 — Simple interest on savings**  
*Given:* ₹5000 ko 6% annual rate par 2 saal ke liye deposit kiya.  
*Find:* Total interest aur maturity amount.  

Step 1: I = (5000 × 6 × 2) / 100 = 600.  
Step 2: A = 5000 + 600 = 5600.  
*Why:* Interest sirf principal par calculate hota hai, time linear multiply hota hai.  

**Interest = 600, Amount = 5600**

*Reflection:* Simple interest mein har saal same interest aata hai; yeh samajhna zaroori hai compound interest se farak ke liye.

**Example 4 — Combined discount and interest scenario**  
*Given:* Ek item CP ₹1200, MP ₹1600, 25% discount ke baad becha. Paise ko 8% simple interest par 9 months ke liye invest kiya.  
*Find:* Final amount after interest.  

Step 1: Discount = 0.25 × 1600 = 400.  
Step 2: SP = 1600 − 400 = 1200.  
Step 3: Profit = 0 (break-even).  
Step 4: I = (1200 × 8 × 9/12) / 100 = 72.  
Step 5: Final A = 1200 + 72 = 1272.  
*Why:* Time ko years mein convert karna zaroori hai formula mein.  

**Final amount = 1272**

*Reflection:* Real problems mein multiple concepts ek saath aate hain; har step ko alag reference value se link karna padta hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Percentage ko MP par calculate karna jab CP maanga ho | Students marked price ko hi base maan lete hain | Hamesha poochho “kis value ke against percentage chahiye?” |
| Time ko months mein hi chhod dena | Formula years maangta hai                   | T ko hamesha years mein convert karo (months/12) |
| Profit % mein CP ki jagah SP use karna | Sign confusion aur reference galti          | Formula mein denominator hamesha CP ya P hota hai |
| Discount ke baad bhi purana CP yaad rakhna | Calculation steps bhool jaana               | Har step ke baad updated SP likho            |
| Negative profit ko “loss %” ke sign ke saath compare karna | Absolute value bhool jaana                  | Loss % bhi positive number hota hai, sirf label “loss” lagta hai |

## 7. The textbook-precise statement
Profit percentage is defined as  
\[
\text{Profit \%} = \left( \frac{\text{Selling Price} - \text{Cost Price}}{\text{Cost Price}} \right) \times 100
\]  
provided Cost Price > 0. Discount is applied to Marked Price and the resulting price becomes the effective Selling Price. Simple interest is given by  
\[
I = P \times R \times T / 100,
\]  
where T is expressed in years and R is the annual rate in percent (NCERT Class 7 Mathematics, Chapter 8, “Comparing Quantities”, 2023-24 edition).

## 8. Visual — diagram or schematic
```
CP ----> [Add Profit %] ----> SP
          or
MP ----> [Subtract Discount %] ----> Effective SP
P ----> [× (R×T/100)] ----> Interest ----> A = P + I
```

## 9. The memory technique
1. **The hook** — Socho ek dukaan wala “CP ko haath mein pakadta hai, SP ko aankh se dekhta hai, aur percentage us haath aur aankh ke beech ka faasla hai.”
2. **What to overlearn** — Profit % = (SP−CP)/CP × 100; I = PRT/100; Amount = P(1 + RT/100).
3. **Spaced-repetition schedule** — 1 din baad, 3 din baad, 7 din baad, 16 din baad, 35 din baad ek-ek example solve karo.
4. **First-principles fallback** — Formula bhool jaaye to sirf “difference ko reference value se divide karo aur ×100” yaad rakho; baaki sab usi se ban jaata hai.

## 10. What this unlocks
Yeh foundation aapko compound interest, successive discounts, profit-loss partnerships aur depreciation jaise advanced arithmetic topics ke liye taiyaar karta hai.

- Successive discount calculations
- Compound interest derivation
- Percentage change in successive periods
- Basic depreciation models in accounting

## 11. Self-check — five questions, no answers
1. Ek item CP ₹800 par 25% profit se becha gaya. SP kya hoga?
2. 12% discount ke baad bhi 8% profit chahiye to marked price CP ka kitna hona chahiye?
3. ₹2500 ko 9% per annum par 8 months ke liye simple interest par rakhne par kitna interest milega?
4. Agar SP = CP × 1.2 to profit % kya hai? Agar SP = CP × 0.85 to loss % kya hai?
5. Ek dukaan ne 30% discount diya lekin phir bhi 5% loss hua. CP aur MP mein kya relation tha?