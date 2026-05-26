## 1. The one-sentence answer
**SQL clauses filter, group, further filter groups, sort and cap result rows in a precise execution order.**

WHERE removes individual rows before any grouping happens. GROUP BY collapses matching rows into summary groups so you can compute aggregates such as COUNT or SUM. HAVING then keeps or drops entire groups using those aggregates. ORDER BY sorts the surviving rows, and LIMIT simply returns only the first N rows of that sorted set.  

The clauses must appear in the fixed sequence SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT; any other order produces a syntax error or wrong results. Understanding this sequence is the single most important mental model for writing correct queries.

> [!NOTE]
> The “aha” moment is realising that WHERE works on raw rows while HAVING works on groups; they are not interchangeable even though both use a condition.

## 2. Why this matters — concrete and current
Google’s BigQuery billing engine uses WHERE on timestamp and project_id columns to scan only the last 24 hours of petabyte-scale logs, cutting query cost by more than 90 %.  

Stripe’s fraud-detection pipeline groups daily transactions by merchant_id and card_bin, then applies HAVING COUNT(*) > 50 to surface merchants that suddenly receive an unusual volume of small payments.  

NASA’s Mars 2020 rover telemetry store keeps the last 30 days of sensor readings with LIMIT 1000 plus ORDER BY timestamp DESC so ground engineers can quickly retrieve the most recent high-priority packets over a low-bandwidth link.  

Amazon Redshift’s nightly ETL jobs rely on GROUP BY + HAVING to detect duplicate primary-key violations across 200 million rows before they reach the fact table, preventing silent data corruption that would otherwise appear days later in finance reports.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| SELECT and FROM      | They produce the row set that all later clauses operate on |
| Aggregate functions  | COUNT, SUM, AVG etc. are the only expressions allowed inside HAVING |
| NULL handling        | NULL comparisons in WHERE or HAVING behave differently from ordinary values |
| Execution order      | SQL evaluates clauses in a fixed sequence, not the order you write them |

If any row above is unfamiliar, pause and review basic single-table SELECT queries first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Raw rows exist before any clause runs
A table is simply an unordered bag of rows. The FROM clause materialises this bag; nothing has been filtered or summarised yet.  

Example: the table orders(id, customer_id, amount, order_date) contains every historical order exactly once.  

Formally:  
$$ R_0 = \pi_{id,customer\_id,amount,order\_date}(orders) $$  

> [!WARNING]  
> If you assume rows are already sorted or grouped you will mis-predict which rows reach later clauses.

### Step 2 — WHERE keeps or drops individual rows
WHERE evaluates a predicate on every row of R0 and retains only those rows for which the predicate is true.  

Example: WHERE order_date >= '2024-01-01' removes all 2023 orders.  

Formally:  
$$ R_1 = \{ r \in R_0 \mid P(r) \} $$  
where P is a boolean predicate that may reference only columns, constants and scalar functions.

> [!WARNING]  
> Aggregate functions are illegal inside WHERE; the engine has not yet formed groups.

### Step 3 — GROUP BY partitions the filtered rows
GROUP BY collects rows that share identical values on the grouping columns into disjoint groups.  

Example: GROUP BY customer_id creates one group per distinct customer who placed an order after 2024-01-01.  

Formally the partition is  
$$ G = R_1 / \sim_{customer\_id} $$  

### Step 4 — HAVING filters the groups themselves
HAVING applies a predicate that may reference aggregates computed over each group. Groups that fail the predicate are discarded.  

Example: HAVING COUNT(*) > 5 keeps only customers with more than five orders.  

Formally:  
$$ G' = \{ g \in G \mid Q(\text{agg}(g)) \} $$  

### Step 5 — ORDER BY sorts the surviving groups or rows
ORDER BY defines a total order on the final rows (or on one representative row per group).  

Example: ORDER BY total_amount DESC puts the highest-spending customers first.  

### Step 6 — LIMIT truncates the ordered result
LIMIT n returns only the first n rows of the ordered set, discarding the rest.  

Formally the final relation is the prefix of length n of the ordered sequence.

## 5. Worked examples — har step show karo

**Example 1 — Simple row filter**  
*Given:* table users(id, country, created_at)  
*Find:* users created in 2023 who live in India.  
Step 1: FROM produces all rows.  
Step 2: WHERE created_at BETWEEN '2023-01-01' AND '2023-12-31' AND country = 'IN' keeps matching rows.  
*Why:* both predicates are row-level, so WHERE is the correct clause.  
**Final answer**  
```sql
SELECT * FROM users
WHERE created_at BETWEEN '2023-01-01' AND '2023-12-31'
  AND country = 'IN';
```

*Reflection:* the query never needed grouping, so GROUP BY and HAVING were omitted.

**Example 2 — Count per group with threshold**  
*Given:* orders(customer_id, amount)  
*Find:* customers whose total order value exceeds 10 000.  
Step 1–2: no WHERE needed.  
Step 3: GROUP BY customer_id.  
Step 4: HAVING SUM(amount) > 10000.  
*Why:* SUM is defined only after groups exist.  
**Final answer**  
```sql
SELECT customer_id, SUM(amount) AS total
FROM orders
GROUP BY customer_id
HAVING SUM(amount) > 10000;
```

*Reflection:* replacing HAVING with WHERE would produce a syntax error.

**Example 3 — Combine WHERE, GROUP BY, HAVING, ORDER BY, LIMIT**  
*Given:* same orders table plus order_date.  
*Find:* top 5 customers in 2024 whose average order exceeds 500, ranked by total spend.  
Step-by-step clauses applied in engine order produce exactly five rows.  
**Final answer**  
```sql
SELECT customer_id,
       SUM(amount) AS total,
       AVG(amount) AS avg_order
FROM orders
WHERE order_date >= '2024-01-01'
GROUP BY customer_id
HAVING AVG(amount) > 500
ORDER BY total DESC
LIMIT 5;
```

*Reflection:* changing the order of clauses would break the query.

**Example 4 — Edge case with NULL**  
*Given:* table events(user_id, event_type) where event_type may be NULL.  
*Find:* users who have at least one non-NULL event_type.  
WHERE event_type IS NOT NULL removes NULL rows before grouping.  
**Final answer**  
```sql
SELECT user_id
FROM events
WHERE event_type IS NOT NULL
GROUP BY user_id
HAVING COUNT(*) >= 1;
```

*Reflection:* NULL never satisfies = or !=; the IS NOT NULL test is mandatory.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using WHERE instead of HAVING on aggregates | Students forget groups are created after WHERE | Write the query, then move aggregate conditions to HAVING |
| Placing LIMIT before ORDER BY     | Intuitive desire to “limit first”           | Always write ORDER BY immediately before LIMIT |
| Grouping by a column that contains NULL | NULLs form their own group                  | Decide explicitly whether NULLs should be grouped or filtered first |
| Forgetting that SELECT may only contain grouped columns or aggregates | SQL standard rule                           | List only expressions that are either grouping keys or wrapped in aggregates |
| Assuming rows are sorted without ORDER BY | Some engines return data in insertion order by accident | Always add ORDER BY when order matters       |
| Using column aliases defined in SELECT inside HAVING | Aliases are not yet visible at HAVING time  | Repeat the aggregate expression or use a sub-query |

## 7. The textbook-precise statement
In SQL:1999 and later, a <query specification> is evaluated in the following order (Elmasri & Navathe, Fundamentals of Database Systems, 7e, §6.3):  
1. FROM → Cartesian product of tables  
2. WHERE → row filter  
3. GROUP BY → formation of groups  
4. HAVING → group filter  
5. SELECT → projection and aggregation  
6. ORDER BY → sort  
7. OFFSET/FETCH (or LIMIT) → slice  

All predicates in HAVING must be “group-invariant”; that is, they must yield the same truth value for every row inside a group.

## 8. Visual — diagram or schematic
```
Raw rows (FROM)
      │
      ▼ WHERE (row filter)
   filtered rows
      │
      ▼ GROUP BY
   groups G1 G2 G3 …
      │
      ▼ HAVING (group filter)
   surviving groups
      │
      ▼ ORDER BY
   sorted rows
      │
      ▼ LIMIT
   final N rows
```

## 9. The memory technique
1. **The hook** — picture a factory conveyor belt: WHERE inspects each box, GROUP BY bundles identical boxes, HAVING checks each bundle, ORDER BY stacks bundles by size, LIMIT takes only the top few.  
2. **What to overlearn** — the exact clause order “W G H O L” and that aggregates are forbidden in WHERE.  
3. **Spaced-repetition schedule** — review the order mnemonic after 1 day, 3 days, 7 days, 16 days and 35 days.  
4. **First-principles fallback** — if you forget the order, rebuild from the definition: filtering must precede aggregation, aggregation must precede sorting.

## 10. What this unlocks
Mastery of these clauses lets you write any single-table analytical query and prepares you for joins, window functions and common table expressions.  

- Next topic: INNER/LEFT JOIN semantics and join order optimisation  
- Window functions OVER (PARTITION BY … ORDER BY …) reuse the same grouping and ordering concepts  
- Query planners in PostgreSQL and MySQL rely on these clause boundaries for index selection

## 11. Self-check — five questions, no answers
1. Write a query that returns the three customers with the highest number of orders placed after 2023-06-01.  
2. Explain why SELECT customer_id, amount FROM orders GROUP BY customer_id produces an error.  
3. A query contains both WHERE created_at > '2024-01-01' and HAVING COUNT(*) > 10. Which clause executes first?  
4. What happens to rows whose grouping column is NULL when you write GROUP BY country?  
5. Rewrite the following query so that it is both correct and uses HAVING instead of WHERE: SELECT * FROM sales WHERE SUM(revenue) > 1000 GROUP BY region;