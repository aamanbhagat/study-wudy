## 1. The one-sentence answer
**Significant figures rules for operations decide exactly how many digits you must retain in the final answer so that its uncertainty matches the uncertainty present in the original measurements.**

When you add or subtract numbers, the result can keep only as many decimal places as the number with the fewest decimal places. When you multiply or divide, the result can keep only as many significant figures as the factor that has the fewest significant figures. These two separate rules exist because addition and subtraction care about absolute uncertainty while multiplication and division care about relative uncertainty.

Aap already know that every measured value carries some uncertainty. The rules simply propagate that uncertainty through arithmetic so the final number does not pretend to be more precise than the data allow.

> [!NOTE]
> The deepest insight is that significant-figure rules are not about counting digits; they are a quick, practical way to carry forward the absolute or relative uncertainty of every measurement without writing explicit ± values at every step.

## 2. Why this matters — concrete and current
ISRO’s PSLV and GSLV trajectory teams round every intermediate velocity and position value to the correct number of significant figures before feeding them into the next integration step; otherwise accumulated rounding errors shift the injection point by kilometres.

In semiconductor fabs, the thickness of a deposited atomic layer is measured with an ellipsometer whose last reliable digit is known; when engineers compute etch rates from before-and-after thicknesses, they apply the subtraction rule so the reported rate does not claim precision the instrument never had.

LIGO’s strain data are recorded with 19 significant figures, yet when physicists subtract the modelled noise floor they deliberately keep only the digits allowed by the subtraction rule; any extra digit would be pure noise masquerading as signal.

In undergraduate rocket-lab courses at IIT Madras, students measure thrust with a load cell that reads to 0.1 N; when they later compute specific impulse they must apply the division rule so the final Isp value does not imply 0.001 s precision that the thrust sensor never delivered.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Place value and decimals | Addition/subtraction rules act on the decimal-place column, not on the count of digits. |
| Definition of significant figures | Multiplication/division rules act on the count of reliable digits. |
| Absolute versus relative uncertainty | Explains why the two rules are different. |

If any of these three ideas are shaky, pause and review them first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Absolute uncertainty lives in the decimal place
A measured length 12.34 m ± 0.01 m and another length 3.7 m ± 0.1 m are added. The second measurement is uncertain in the tenths place, so the sum cannot claim certainty beyond the tenths place.

Example: 12.34 + 3.7 = 16.04, but we must round to 16.0 m.

Formal statement: after addition or subtraction, retain the smallest number of decimal places present in any input value.

> [!WARNING]
> If you keep extra decimal places here, the reported uncertainty becomes smaller than the actual uncertainty of the worst measurement.

### Step 2 — Relative uncertainty lives in the count of significant digits
When two quantities are multiplied, their relative uncertainties add. The quickest way to track this is to keep only as many significant figures as the factor that has the fewest.

Example: 2.5 (two sig figs) × 3.42 (three sig figs) must be reported with two sig figs.

Formal statement: after multiplication or division, retain the smallest number of significant figures present in any input value.

### Step 3 — Identify significant figures before applying any rule
Non-zero digits are always significant. Zeros between non-zero digits are significant. Leading zeros are never significant. Trailing zeros after a decimal point are significant.

### Step 4 — Apply the correct rule according to the operation
Scan the expression, locate every + or − and every × or ÷, then group operations by type. Apply the decimal-place rule to all additions/subtractions first, then apply the significant-figure count rule to all multiplications/divisions.

### Step 5 — Round only at the very end
Intermediate results must be carried with at least one extra guard digit so that rounding errors do not propagate. Final reported answer is rounded once.

### Step 6 — Textbook-grade statement
The result of an arithmetic operation must be expressed with a precision no greater than the precision of the least precise measurement entering that operation, where “precision” is quantified either by the rightmost reliable decimal place (addition/subtraction) or by the number of significant figures (multiplication/division).

## 5. Worked examples — har step show karo

**Example 1 — Simple addition**
- *Given:* 4.56 m + 1.3 m
- *Find:* correct sum
4.56 has hundredths place; 1.3 has only tenths place. Smallest decimal place present is tenths.  
4.56 + 1.3 = 5.86 → round to tenths: **5.9 m**  
*Why:* The rule forces us to discard the hundredths digit because it is meaningless once the coarser measurement is included.

**Example 2 — Multiplication**
- *Given:* 2.45 × 0.80
- *Find:* correct product
2.45 has three significant figures; 0.80 has two.  
2.45 × 0.80 = 1.96 → round to two significant figures: **2.0**  
*Why:* Relative uncertainty is dominated by the two-significant-figure factor.

**Example 3 — Mixed operations**
- *Given:* (12.34 + 3.7) × 2.5
- *Find:* final value
First addition: 12.34 + 3.7 = 16.04 → 16.0 (one decimal place).  
Then multiplication: 16.0 × 2.5. 16.0 has three significant figures, 2.5 has two.  
16.0 × 2.5 = 40 → round to two significant figures: **40**  
*Why:* The addition step first reduced precision; that reduced precision then limited the multiplication step.

**Example 4 — Subtraction with trailing zeros**
- *Given:* 100.0 g − 0.23 g
- *Find:* difference
100.0 has one decimal place; 0.23 has two. Smallest decimal place is tenths.  
100.0 − 0.23 = 99.77 → round to tenths: **99.8 g**  
*Why:* Even though 100.0 looks precise, the rule still respects the coarser decimal place.

*Reflection:* Each example forces the student to locate the limiting measurement first, then apply only one rule at a time.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Keeping extra decimals after addition because “the calculator shows them” | Calculator has no knowledge of measurement precision | Always identify the coarsest decimal place before looking at the calculator result |
| Counting trailing zeros in 100 as significant | Ambiguous notation in whole numbers | Write 1.00 × 10² when three figures are intended |
| Applying significant-figure count rule to addition | Confusion between absolute and relative uncertainty | Ask: “Is the operation +/− or ×/÷?” before choosing the rule |
| Rounding intermediate results too early | Desire to write a clean number at every step | Carry one guard digit until the final answer |
| Treating 0.00034 as having five significant figures | Mistaking leading zeros for significant | Leading zeros only locate the decimal point; they are never significant |
| Forgetting that 2.0 has two significant figures | Thinking the decimal alone decides significance | Count all digits from first non-zero to last reliable digit |

## 7. The textbook-precise statement
After any addition or subtraction the result shall contain no more digits to the right of the decimal point than the input quantity that possesses the fewest such digits. After any multiplication or division the result shall contain no more significant figures than the input quantity that possesses the fewest significant figures. All intermediate calculations shall retain at least one extra digit beyond the final reported precision. (Young & Freedman, *University Physics*, 15th ed., §1.6)

## 8. Visual — diagram or schematic
```
Measurement A:  12.34 m   (uncertainty in 0.01 m column)
Measurement B:   3.7  m   (uncertainty in 0.1  m column)
Addition line:  ------
Result column:  16.0  m   <-- limited by B’s tenths place
                ↑
          keep only up to here
```

## 9. The memory technique
1. **The hook** — Imagine two rulers lying end-to-end; the shorter ruler’s markings decide how finely you can mark the total length.
2. **What to overlearn** — “Addition looks at decimals, multiplication looks at sig-fig count.”
3. **Spaced-repetition schedule** — Review the two rules after 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — Ask: “Which measurement contributes the largest absolute (or relative) uncertainty?” The answer tells you which rule to apply.

## 10. What this unlocks
Correct handling of significant figures is the gateway to formal error propagation, Monte-Carlo uncertainty analysis used in trajectory optimisation, and the honest reporting of experimental results required by every peer-reviewed journal.

- Next topics: propagation of uncertainty formulas, least-squares fitting with weights, and covariance matrices in vector kinematics.
- Later applications: Kalman-filter sensor fusion in rockets and GPUs performing reduced-precision arithmetic.

## 11. Self-check — five questions, no answers
1. Add 7.894 + 2.3 and give the answer with correct significant-figure discipline.
2. Multiply 0.045 × 1200 and state how many significant figures the product must have.
3. Why does the addition rule care about decimal places while the multiplication rule cares about significant-figure count?
4. A student reports 9.80 after subtracting 2.345 from 12.15. Identify the mistake.
5. In the expression (23.4 − 0.02) / 4.56, which measurement ultimately limits the number of significant figures in the final answer, and why?