## What it is
Stored procedures, triggers, and functions are blocks of SQL and procedural code that are stored and executed directly on the database server. A **function** takes inputs and returns a single value, a **stored procedure** executes a series of actions without necessarily returning a value, and a **trigger** is a special procedure that automatically runs in response to a data modification event (like `INSERT`, `UPDATE`, or `DELETE`).

## Why it matters
This moves logic from the application layer to the data layer, which is critical for performance, security, and integrity. In aerospace, a trigger on a telemetry table can instantly validate new sensor data against physical constraints or calculate derived values like thrust-to-weight ratio. For ML, a stored procedure can encapsulate the entire feature engineering pipeline for a given dataset, ensuring that training and inference use the exact same transformations, executed efficiently on the server.

## When to study it
You must have a solid grasp of fundamental SQL before tackling these. Be confident with:
*   Data Manipulation Language (DML): `INSERT`, `UPDATE`, `DELETE`, `SELECT`.
*   Data Definition Language (DDL): `CREATE TABLE`.
*   Complex queries involving `JOIN`s, `GROUP BY`, and aggregate functions.
*   Basic programming concepts like variables, conditional logic (`IF/ELSE`), and loops (`WHILE`/`FOR`).

If you are not comfortable writing a multi-table `JOIN` from memory, review that first.

## How to study it (step by step)
1.  **Write a simple function.** Create a function `to_fahrenheit(celsius REAL)` that converts a temperature. Use this function in a `SELECT` statement on a table with temperature data to see it in action.
2.  **Write a simple stored procedure.** Create a procedure `add_user(username TEXT, password_hash TEXT)` that performs the `INSERT` into a `users` table. Call it to add a few users. Notice how this abstracts the `INSERT` statement.
3.  **Set up for a trigger.** Create two tables: `accounts` (`id`, `name`, `balance`) and `transaction_log` (`id`, `account_id`, `change_amount`, `timestamp`).
4.  **Write an `AFTER UPDATE` trigger.** Create a trigger that fires after an `UPDATE` on the `accounts` table. The trigger should insert a new row into `transaction_log` detailing the change in balance.
5.  **Modify the trigger for different events.** Adapt the trigger to also handle `INSERT` events on the `accounts` table (logging the initial balance).
6.  **Analyze the `OLD` and `NEW` keywords.** Inside your trigger, print or log the values of the special `OLD` and `NEW` records, which represent the row's state before and after the triggering DML operation. This is key to understanding how triggers work.

## Key ideas, with intuition
1.  **Moving Logic to the Data:** Instead of your application fetching data, processing it, and then sending an update back, you send a single command to the database to run the logic right where the data lives. This drastically reduces network traffic. Imagine you need to calculate the average of a million numbers.
    *   *Without stored procedures:* Transfer 1,000,000 numbers over the network, calculate the average in your app, result is `1` number.
    *   *With a stored procedure:* Send `1` command (`CALL calculate_average()`), the database calculates it locally, and sends `1` number back.

2.  **On-Demand vs. Event-Driven:** This is the core difference between procedures/functions and triggers.
    *   **Procedures/Functions are On-Demand:** You must explicitly `CALL` a procedure or `SELECT` a function. It's like pressing a light switch.
    *   **Triggers are Event-Driven:** They fire automatically when a specified event occurs. You don't call them. It's like a motion sensor turning on a light.

3.  **The Function Contract: `f(x) -> y`**: A user-defined function (UDF) is conceptually like a pure mathematical function. It takes arguments and is primarily used to compute and `RETURN` a single value. This allows them to be seamlessly embedded within `SELECT` statements, `WHERE` clauses, and other expressions.
    $$
    \text{SELECT product_name, calculate_tax(price, region) FROM products;}
    $$
    Here, `calculate_tax` acts just like a built-in function. They are not meant to have side effects (like modifying tables).

4.  **The Procedure as a "Verb"**: A stored procedure is a named sequence of actions. It's a database script that can take parameters, declare variables, execute multiple SQL statements, and modify data across multiple tables. It encapsulates a business process, like `enroll_student_in_course` or `process_monthly_billing`.

## Worked example
Let's create a trigger to maintain an audit trail. We want to log every salary change for an `employees` table. We'll use PostgreSQL syntax.

**Step 1: Define the tables.**
We need the main table and a table to store the audit logs.

```sql
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    salary NUMERIC(10, 2) NOT NULL
);

CREATE TABLE salary_audits (
    audit_id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL,
    old_salary NUMERIC(10, 2),
    new_salary NUMERIC(10, 2),
    changed_on TIMESTAMP NOT NULL DEFAULT current_timestamp
);
```
*Reflection:* This setup separates the current state (`employees`) from the history of changes (`salary_audits`), which is a clean design.

**Step 2: Create the trigger function.**
In PostgreSQL, a trigger executes a special type of function that returns a `TRIGGER` type. This function contains the logic we want to run.

```sql
CREATE OR REPLACE FUNCTION log_salary_change()
  RETURNS TRIGGER AS $$
BEGIN
    -- Check if the salary was actually changed.
    -- OLD is a special variable holding the row's values BEFORE the update.
    -- NEW is a special variable holding the row's values AFTER the update.
    IF NEW.salary <> OLD.salary THEN
        INSERT INTO salary_audits(employee_id, old_salary, new_salary)
        VALUES(OLD.id, OLD.salary, NEW.salary);
    END IF;

    -- The return value for an AFTER trigger is ignored, but it's good practice.
    -- For a BEFORE trigger, returning NEW allows the operation to proceed.
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```
*Reflection:* The use of `OLD` and `NEW` is the core mechanism. The conditional `IF NEW.salary <> OLD.salary` prevents creating pointless audit entries for updates that don't affect the salary.

**Step 3: Bind the trigger to the table.**
Now we create the trigger itself and attach it to the `employees` table. It will call our function whenever a row is updated.

```sql
CREATE TRIGGER employees_salary_update_trigger
  AFTER UPDATE ON employees
  FOR EACH ROW
  EXECUTE FUNCTION log_salary_change();
```
*Reflection:* This declaration is explicit. `AFTER UPDATE` specifies the timing and event. `FOR EACH ROW` means the trigger runs once for every row affected by the `UPDATE` statement.

**Step 4: Test it.**
Let's see it in action.

```sql
-- Insert a sample employee
INSERT INTO employees (name, salary) VALUES ('Alice', 70000);

-- Update the salary (this will fire the trigger)
UPDATE employees SET salary = 75000 WHERE name = 'Alice';

-- Check the audit log
SELECT * FROM salary_audits;
```
You will see a new row in `salary_audits` with the `employee_id` for Alice, `old_salary` of 70000, and `new_salary` of 75000. It worked.

## Diagrams
Here is the data flow for an application making a logical change, first without and then with a stored procedure.

**Diagram 1: Without Stored Procedure (Chatty)**
```text
Application Logic                Network                  Database Server
-----------------                -------                  ---------------
1. SELECT balance
   FROM accounts
   WHERE id=123;  ------------> (request) ------------>   (Executes query)
                  <------------ (response: 500) <------------

2. new_bal = 500 - 100

3. UPDATE accounts
   SET balance=400
   WHERE id=123;  ------------> (request) ------------>   (Executes query)
                  <------------ (response: OK) <------------
```

**Diagram 2: With Stored Procedure (Efficient)**
```text
Application Logic                Network                  Database Server
-----------------                -------                  ---------------
                                                          PROCEDURE withdraw(id, amt)
                                                          BEGIN
                                                            bal = SELECT balance...
                                                            UPDATE accounts...
                                                          END;
1. CALL withdraw(123, 100); ---> (request) ------------>   (Executes procedure)
                            <--- (response: OK) <----------
```

## Memory technique — remember this forever
1.  **The Database Butler Mnemonic:**
    *   **Function:** The expert librarian. You ask for a specific piece of information (`SELECT calculate_pi(100)`), and he returns *only that information*. He doesn't touch the shelves.
    *   **Stored Procedure:** The head butler. You give a high-level command (`CALL prepare_for_winter`), and he executes a complex checklist: checks the furnace, closes storm windows, stocks the pantry. He performs *actions*.
    *   **Trigger:** The silent bodyguard. He stands by the king (`employees` table). If someone tries to attack (`UPDATE salary`), he automatically acts (`INSERT INTO security_log`). He is an automatic *reaction*.

2.  **Formulas to Overlearn (PostgreSQL syntax):**
    *   `CREATE FUNCTION name(args) RETURNS type AS $$ BEGIN ... RETURN value; END; $$ LANGUAGE plpgsql;`
    *   `CREATE PROCEDURE name(args) AS $$ BEGIN ... ; END; $$ LANGUAGE plpgsql;`
    *   `CREATE TRIGGER name {BEFORE|AFTER} {INSERT|UPDATE|DELETE} ON table FOR EACH ROW EXECUTE FUNCTION trigger_function();`

3.  **Spaced Repetition Schedule:** Review your notes and rewrite the worked example from scratch on Day 1, Day 3, Day 7, Day 16, and Day 35.

4.  **First Principles Pathway:** If you forget the syntax, remember the intent.
    *   **Function:** "I need to compute a value to use in a query." It must `RETURN` something.
    *   **Procedure:** "I need to bundle a sequence of commands." It's a named block of code.
    *   **Trigger:** "I need to react to a change." It must be tied to a `TABLE`, an `EVENT` (`INSERT`, etc.), and a `TIMING` (`BEFORE`/`AFTER`).

## Common mistakes
*   **Recursive Triggers:** An `UPDATE` trigger on `TableA` that itself performs an `UPDATE` on `TableA`. This can cause an infinite loop that crashes the server or transaction.
*   **"Invisible" Logic:** Overusing triggers can make it very hard to debug application behavior. When an `INSERT` statement mysteriously fails or causes side effects, a hidden trigger is often the culprit. Keep application logic in the application unless there's a strong reason (performance, integrity) to move it.
*   **Functions with Side Effects:** Writing a function that modifies a table (`INSERT`, `UPDATE`). This violates the expectation that functions are read-only and can lead to unpredictable results, especially since the database planner can execute functions in unexpected orders.
*   **Forgetting `FOR EACH ROW`:** If you write a trigger to react to a specific row's change but omit `FOR EACH ROW`, it becomes a "statement-level" trigger. It fires only once for the entire `UPDATE` statement and won't have access to the `OLD` and `NEW` row values.

## Self-check
1.  Write a SQL function `is_prime(n INT)` that returns `BOOLEAN`. Test it in a `SELECT` statement.
2.  Create a `products` table with `id`, `name`, `quantity_on_hand`, and `reorder_level` columns. Write a stored procedure `check_stock(product_id INT)` that checks if the quantity is below the reorder level and, if so, prints a notice (e.g., using `RAISE NOTICE` in PostgreSQL).
3.  Expand on the previous question. Create a `purchase_orders` table. Now, create a trigger on the `products` table that fires `AFTER UPDATE`. If the `quantity_on_hand` drops below the `reorder_level`, the trigger should automatically insert a new record into the `purchase_orders` table to order more of that product.