## 1. The one-sentence answer
**Stored procedures, triggers, and functions are named, precompiled blocks of SQL code stored inside the database that let you encapsulate logic, automate responses to data changes, and return computed values without sending repeated queries from the application.**

Pehla block stored procedure hota hai jo parameters le sakta hai aur multiple SQL statements ko ek saath execute karta hai. Trigger automatically fire hota hai jab koi DML event (INSERT, UPDATE, DELETE) table par hota hai. Function ek value return karta hai aur isliye SELECT statements ke andar use ho sakta hai jaise built-in functions.

In teeno ka core fayda yeh hai ki business logic database ke paas rehti hai, network round-trips kam hote hain, aur security bhi improve hoti hai kyunki application ko direct table access nahi dena padta.

> [!NOTE]
> Sabse badi aha yeh hai ki yeh objects database server par compile aur cache ho jaate hain, isliye har baar parse nahi karna padta — yeh performance aur consistency dono deta hai ek saath.

## 2. Why this matters — concrete and current
Banking core systems jaise HDFC aur ICICI ke transaction engines Oracle stored procedures ka use karte hain fund transfer aur balance update ke liye taaki ACID properties ek hi call mein guarantee ho.

E-commerce platforms jaise Amazon ke order placement workflow mein triggers automatically inventory decrement aur audit log entry create karte hain jab ORDER table mein row insert hoti hai.

PostgreSQL-based SaaS companies (Supabase, Neon) functions ka use karke row-level security aur computed columns implement karte hain bina application code badle.

Machine learning feature stores (Feast, Tecton) stored procedures se derived features ko real-time calculate karke training tables mein daalte hain, jisse data drift kam hota hai.

Semiconductor design databases (Synopsys, Cadence) triggers ka use karke design rule violations detect karte hain jab layout tables update hote hain.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Basic SQL (SELECT, INSERT, UPDATE, DELETE) | Stored procedures aur triggers inhi statements ko wrap karte hain |
| Transactions & ACID  | Procedures aur triggers aksar multiple statements ko atomic banana padta hai |
| Primary & foreign keys | Triggers frequently referential integrity enforce karte hain |
| Client-server model  | Samajhna zaroori hai kyunki yeh objects server par run hote hain |

Agar upar ke concepts clear nahi hain to pehle basic SQL aur transaction lessons complete karo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Encapsulating SQL into a named routine
Aap ek baar SQL statements likh dete ho aur usko naam de dete ho taaki baar-baar na likhna pade.  
Example: ek procedure jo customer balance update karta hai.  
Formal statement:  
$$ \text{CREATE PROCEDURE UpdateBalance}(cid INT, amt DECIMAL) \dots $$  
> [!WARNING]  
> Agar procedure ko sirf “query” samajh kar har baar drop-create karoge to caching ka fayda khatam ho jaayega.

### Step 2 — Precompilation and parameter binding
Database engine procedure ko parse karke execution plan cache kar leta hai. Parameters bind hote hain runtime par.  
Formal:  
$$ \text{EXEC UpdateBalance}(@cid=101, @amt=500.00) $$  
> [!WARNING]  
> Dynamic SQL andar likhna (string concatenation) plan cache ko bypass kar deta hai aur SQL injection ka risk laata hai.

### Step 3 — Event-driven execution with triggers
Trigger ek special procedure hai jo table event se automatically invoke hota hai.  
Example: AFTER INSERT ON Orders.  
Formal:  
$$ \text{CREATE TRIGGER trg\_Audit AFTER INSERT ON Orders FOR EACH ROW} \dots $$  
> [!WARNING]  
> Trigger ke andar DML karna recursion ya mutating table error create kar sakta hai.

### Step 4 — Return value semantics of functions
Function hamesha ek scalar ya table value return karta hai aur SELECT ke andar call ho sakta hai.  
Formal:  
$$ \text{CREATE FUNCTION GetBalance}(cid INT) RETURNS DECIMAL} $$  
> [!WARNING]  
> Function ke andar side-effects (INSERT/UPDATE) allowed nahi hote kai DBMS mein, warna determinism khatam.

### Step 5 — Choosing the right construct
Agar automation chahiye to trigger; agar value chahiye to function; agar multiple statements aur transaction control chahiye to procedure.  
Formal decision rule: side-effect + no return → procedure; event-driven → trigger; pure computation → function.

### Step 6 — Security and schema binding
Objects ko schema bind karke table structure change hone par dependency track ki jaati hai.  
Formal:  
$$ \text{GRANT EXECUTE ON PROCEDURE UpdateBalance TO app\_role} $$

## 5. Worked examples — har step show karo

**Example 1 — Simple stored procedure**  
*Given:* Customer table with id and balance.  
*Find:* Procedure to add amount to balance.  
```sql
CREATE PROCEDURE AddToBalance(IN cid INT, IN amt DECIMAL(10,2))
BEGIN
  UPDATE Customers SET balance = balance + amt WHERE id = cid;
END;
```
*Why:* BEGIN-END block multiple statements ko group karta hai.  
**Final answer**  
Procedure created and callable as `CALL AddToBalance(5, 100.00);`

*Reflection:* Yeh example trivial hai lekin parameter mode (IN/OUT) samajhna zaroori hai jab complex logic aaye.

**Example 2 — AFTER INSERT trigger**  
*Given:* Orders aur AuditLog tables.  
*Find:* Har naye order par log entry.  
```sql
CREATE TRIGGER trg_LogOrder AFTER INSERT ON Orders
FOR EACH ROW
INSERT INTO AuditLog(action, order_id) VALUES('INSERT', NEW.id);
```
*Why:* NEW. pseudo-row nayi values access karti hai.  
**Final answer**  
Trigger automatically fire hoga jab INSERT hota hai.

*Reflection:* Trigger ne application code se logging hata di, consistency badhi.

**Example 3 — Scalar function**  
*Given:* Need age from birth_date.  
*Find:* Reusable function.  
```sql
CREATE FUNCTION GetAge(bd DATE) RETURNS INT
RETURN TIMESTAMPDIFF(YEAR, bd, CURDATE());
```
*Why:* Function SELECT mein directly use ho sakti hai.  
**Final answer**  
`SELECT name, GetAge(birth_date) FROM Users;`

*Reflection:* Deterministic nature ki wajah se query optimizer cache kar sakta hai.

**Example 4 — Procedure with transaction**  
*Given:* Two tables: Accounts aur Transactions.  
*Find:* Atomic transfer.  
```sql
CREATE PROCEDURE Transfer(IN from INT, IN to INT, IN amt DECIMAL)
BEGIN
  START TRANSACTION;
  UPDATE Accounts SET bal=bal-amt WHERE id=from;
  UPDATE Accounts SET bal=bal+amt WHERE id=to;
  INSERT INTO Transactions VALUES(from,to,amt,NOW());
  COMMIT;
END;
```
*Why:* START TRANSACTION se dono updates atomic hain.  
**Final answer**  
`CALL Transfer(1,2,500.00);` succeeds ya dono changes rollback.

*Reflection:* Procedure ne business rule ko database ke andar lock kar diya.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Writing heavy logic inside trigger | Developers treat trigger as “free” automation | Keep trigger thin; move logic to procedure   |
| Using SELECT inside function | Side-effect ban jaata hai                   | Only computation allowed functions mein      |
| No error handling in procedure | MySQL/Postgres silently fail kar jaata hai  | Always declare handlers aur ROLLBACK         |
| Recursion in trigger        | Trigger calls itself via another DML        | Check nested trigger depth limit             |
| Hard-coded schema names     | Portability khatam ho jaati hai             | Use schema-qualified names ya synonyms       |
| Ignoring execution plan cache | Dynamic SQL har baar re-parse karta hai     | Prepared statements ya sp_executesql use karo|
| Missing GRANT on objects    | Application runtime error aata hai          | Role-based execute permission dena           |

## 7. The textbook-precise statement
A stored procedure is a schema object that contains a sequence of SQL statements and control-of-flow statements and is stored in the database catalog. A trigger is a special kind of stored procedure that is automatically executed when a specified event (INSERT, UPDATE, DELETE) occurs on a table. A function is a routine that accepts parameters, performs an action, and returns a single value; unlike procedures, functions can be invoked from within SQL expressions (Silberschatz, Korth, Sudarshan, *Database System Concepts*, 7e, §5.2–5.4).

## 8. Visual — diagram or schematic
```text
Client App
   |
   v
CALL UpdateBalance(101,500)
   |
   +--> Stored Procedure (cached plan)
            |
            +--> UPDATE Customers
            |
            +--> INSERT AuditLog
                     ^
                     |
                AFTER UPDATE Trigger
```

## 9. The memory technique
1. **The hook** — Socho ek restaurant ka kitchen: procedure = chef ka recipe book, trigger = automatic fire alarm jab order aaye, function = dessert jo sirf taste karke lautaaya jaata hai.
2. **What to overlearn** — CREATE PROCEDURE vs CREATE TRIGGER vs CREATE FUNCTION syntax, NEW/OLD pseudo-rows, aur transaction boundaries.
3. **Spaced-repetition schedule** — 1 din baad syntax yaad karo, 3 din baad ek example khud likho, 7 din baad trigger recursion case solve karo, 16 din baad performance comparison, 35 din baad full schema review.
4. **First-principles fallback** — Agar syntax bhool jaaye to yaad karo: “event → automatic” = trigger, “return value” = function, “multiple statements + transaction” = procedure.

## 10. What this unlocks
Yeh objects aapko application-layer se database-layer logic shift karne ka power dete hain, jisse next topics jaise query optimization, row-level security, aur materialized views samajhna easy ho jaata hai.

- Performance tuning via cached plans
- Fine-grained access control using procedures
- Event sourcing aur audit patterns
- Materialized view refresh triggers

## 11. Self-check — five questions, no answers
1. Ek procedure aur function mein sabse badi semantic difference kya hai?
2. Kyun ek trigger ke andar SELECT … INTO multiple rows laana dangerous ho sakta hai?
3. Agar ek procedure ke andar dynamic SQL likha jaaye to execution plan cache ka kya hota hai?
4. Ek table par dono BEFORE UPDATE aur AFTER UPDATE trigger hain; kaunsa pehle chalega aur kyun?
5. Design a scenario jahaan stored procedure use karna galat choice hoga aur function behtar rahega.