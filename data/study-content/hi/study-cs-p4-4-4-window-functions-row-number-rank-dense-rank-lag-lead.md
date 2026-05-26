## 1. The one-sentence answer
**Window functions compute values across a set of rows that are related to the current row without collapsing the result set into a single row like GROUP BY does.**

Window functions let aap ek row ke saath uske surrounding rows ka context use karke calculations karo — jaise ranking, running totals, ya previous/next values. ROW_NUMBER, RANK, DENSE_RANK row ordering aur ties handle karte hain, jabki LAG aur LEAD ek row se pehle ya baad wali row ki values directly access karte hain. Iska core idea yeh hai ki query result set ko partitions aur order mein divide karke har row par ek function apply hota hai, lekin rows ka count same rehta hai.

Yeh functions SQL standard ka hissa hain aur modern databases (PostgreSQL, MySQL 8+, SQL Server, Oracle) mein widely supported hain. Without them aapko correlated subqueries ya self-joins ka use karna padta tha, jo slow aur complex hote the.

> [!NOTE]
> Sabse badi aha moment yeh hai ki window functions rows ko aggregate karne ke bawajood unhe delete nahi karte — result set ka shape waisa hi rehta hai, sirf naye columns add hote hain.

## 2. Why this matters — concrete and current
In e-commerce platforms jaise Amazon, window functions power real-time ranking of products within each category for personalized recommendations; without them daily batch jobs would require expensive self-joins on billions of rows.

In financial trading systems at firms like Jane Street, LAG aur LEAD ka use karke consecutive tick prices compare kiye jaate hain to detect arbitrage opportunities within microsecond-level order books.

In semiconductor manufacturing analytics at TSMC, ROW_NUMBER aur RANK se wafer defect logs ko priority order mein sort karke engineers ko top failure patterns instantly dikhaaye jaate hain during yield optimization.

In aerospace telemetry pipelines at SpaceX, DENSE_RANK ka use karke sensor readings ko time windows mein rank kiya jaata hai to identify anomalous engine performance across thousands of Falcon 9 flights without losing any raw data points.

In machine-learning feature stores at companies like Uber, LAG functions generate time-series lag features for demand forecasting models directly inside SQL before data reaches Python training pipelines.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| SQL SELECT + ORDER BY | Window functions require explicit ordering inside OVER clause |
| PARTITION BY logic   | Defines independent groups inside which calculations run  |
| Basic aggregate functions | Window functions extend the same idea without grouping rows away |
| NULL handling        | LAG/LEAD can produce NULLs at boundaries that must be understood |

Agar aapko PARTITION BY aur ORDER BY ka basic flow nahi pata, to pehle simple GROUP BY queries revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Rows keep their identity
Window functions ek row ke liye uske “window” (set of related rows) par kaam karte hain lekin result mein har original row ko preserve karte hain.  
Example: ek sales table mein har salesperson ke total calculate karo bina rows ghataaye.  
Formal statement:  
$$f(\text{window}) \text{ is attached as a new column while } |\text{result}| = |\text{input}|.$$  
> [!WARNING] Agar aap socho ki yeh GROUP BY jaisa hi hai, to aap rows lose kar doge aur query result ka shape galat ho jaayega.

### Step 2 — The OVER clause defines the window
OVER (PARTITION BY … ORDER BY …) se aap window ki boundary decide karte ho. PARTITION BY groups banata hai, ORDER BY andar ordering lagata hai.  
Formal: window specification \( W = (P, O) \) jahaan \( P \) partition columns aur \( O \) ordering columns hain.

### Step 3 — ROW_NUMBER assigns unique sequence
Har partition ke andar rows ko 1 se shuru karke strictly increasing numbers milte hain, ties mein bhi unique values.  
$$ \text{ROW_NUMBER}() \text{ OVER } (P, O) = \text{position of row in ordered partition} $$

### Step 4 — RANK vs DENSE_RANK handle ties differently
RANK() ties ko same number deta hai aur agla number skip karta hai (1,1,3). DENSE_RANK() skip nahi karta (1,1,2).  
Formal difference:  
$$ \text{RANK} = 1 + |\{x < \text{current}\}|, \quad \text{DENSE_RANK} = 1 + |\{x < \text{current}, \text{distinct}\}| $$

### Step 5 — LAG and LEAD access offset rows
LAG(col, offset) current row se pehle wali row ki value laata hai; LEAD aage wali. Default value NULL hoti hai jab offset boundary cross kare.

### Step 6 — Framing and execution model
Window functions logically SELECT ke baad evaluate hote hain lekin ORDER BY se pehle, isliye unhe WHERE mein directly use nahi kar sakte.

## 5. Worked examples — har step show karo

**Example 1 — Simple ROW_NUMBER**  
*Given:*  
```sql
sales(person, amount) = [('A', 100), ('A', 200), ('B', 150)]
```  
*Find:* Har person ke andar amount ke hisaab se rank.  
```sql
SELECT person, amount,
       ROW_NUMBER() OVER (PARTITION BY person ORDER BY amount) AS rn
FROM sales;
```  
Step 1: Partition by person → two windows.  
Step 2: Order by amount inside each.  
Step 3: Assign 1,2…  
**Final answer**  
person | amount | rn  
A | 100 | 1  
A | 200 | 2  
B | 150 | 1  

*Reflection:* Yeh example simple hai lekin dikhata hai ki rows preserve rehte hain.

**Example 2 — RANK vs DENSE_RANK with ties**  
*Given:* amounts 100, 150, 150, 200.  
Query dono functions saath mein chalao.  
Result: RANK → 1,2,2,4; DENSE_RANK → 1,2,2,3.  
*Why:* RANK ne ek number skip kiya kyunki tie ke baad position count hua.  

**Example 3 — LAG for previous value**  
*Given:* daily prices 10, 12, 11.  
```sql
LAG(price, 1) OVER (ORDER BY date) → NULL, 10, 12
```  
*Why:* Offset 1 matlab ek pehle wali row; pehli row ke liye boundary cross hone se NULL.  

**Example 4 — Combined ranking + lag in one query**  
*Given:* employee salary table with department.  
Query mein RANK() aur LAG(salary) dono OVER (PARTITION BY dept ORDER BY salary) use karo. Result mein har employee ka department rank aur previous salary column dono saath dikhte hain.  
*Reflection:* Real production queries mein multiple window functions ek hi SELECT mein combine kiye jaate hain.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using window function in WHERE | Window functions execute after WHERE        | Move condition to QUALIFY (BigQuery) or subquery |
| Forgetting PARTITION BY     | All rows ek hi window ban jaati hain        | Hamesha partition columns explicitly likho   |
| Assuming RANK == ROW_NUMBER | Ties mein behaviour alag hota hai           | Requirement ke hisaab se choose karo         |
| LAG/LEAD without default    | NULLs silently aa jaate hain                | Third argument mein default value do         |
| ORDER BY missing            | Non-deterministic results                   | ORDER BY clause hamesha daalo                |
| Framing clause misuse       | Running totals galat calculate hote hain    | ROWS/RANGE BETWEEN clearly likho             |
| Multiple windows with same OVER | Code duplication aur maintenance issues   | Named window clause (WINDOW w AS …) use karo |

## 7. The textbook-precise statement
A window function is a function that, for each row \( r \) in the input relation, computes a value from a window \( W(r) \) of rows defined by the OVER clause. The window is specified by a partition clause \( P \), an order clause \( O \), and optionally a frame clause \( F \). The result relation contains all columns of the input plus the computed window values; cardinality is unchanged. (Silberschatz, Korth, Sudarshan, *Database System Concepts*, 7e, §3.5. Window functions are defined in SQL:2011 standard, section 6.10.)

## 8. Visual — diagram or schematic
```
Row | Dept | Salary | ROW_NUMBER() | RANK() | LAG(Salary)
----|------|--------|--------------|--------|------------
1   | Eng  |  90000 |            1 |      1 | NULL
2   | Eng  |  90000 |            2 |      1 | 90000
3   | Eng  | 100000 |            3 |      3 | 90000
4   | HR   |  80000 |            1 |      1 | NULL
```
Partition boundary between Eng and HR; LAG starts fresh in each partition.

## 9. The memory technique
1. **The hook** — Socho har row ek “window seat” hai train mein; us seat se aap peeche (LAG) aur aage (LEAD) dekh sakte ho, aur seat number (ROW_NUMBER) bhi pata hota hai.
2. **What to overlearn** — ROW_NUMBER hamesha unique deta hai; RANK ties ke baad skip karta hai; LAG/LEAD boundary par NULL laate hain.
3. **Spaced-repetition schedule** — 1 din baad ek simple query likho, 3 din baad ties wala case, 7 din baad multi-function query, 16 din baad framing clause, 35 din baad production-style query.
4. **First-principles fallback** — Agar syntax bhool jaaye to yaad karo: OVER (PARTITION BY groups ORDER BY sequence) → function apply per row.

## 10. What this unlocks
Window functions ke baad aap running totals, moving averages, sessionization, time-series feature engineering aur gap-and-island problems directly SQL mein solve kar sakte ho.

- Next: Analytic functions with framing (ROWS BETWEEN …)
- Cumulative distribution functions (CUME_DIST, PERCENT_RANK)
- Pattern matching with MATCH_RECOGNIZE
- Integration with CTEs for recursive analytics

## 11. Self-check — five questions, no answers
1. Ek table mein 3 rows same salary par hain. ROW_NUMBER, RANK aur DENSE_RANK ke values kya hongi?
2. LAG(col, 2, 0) boundary cross karne par kya return karega?
3. Window function ko WHERE clause mein daalne par error kyun aata hai?
4. Dono partitions mein same ORDER BY hone par bhi RANK values alag kyun ho sakti hain?
5. Ek query mein 3 alag window functions likhne ke baad performance impact kaise measure karoge?