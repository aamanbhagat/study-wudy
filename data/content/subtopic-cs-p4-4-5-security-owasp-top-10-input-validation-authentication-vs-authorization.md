## What it is
Web application security is the discipline of protecting web services and user data from malicious actors. It primarily involves understanding common attack vectors (like the OWASP Top 10), enforcing strict rules on all incoming data (input validation), and correctly managing user permissions through two distinct steps: proving identity (authentication) and granting access (authorization).

## Why it matters
In aerospace, a compromised ground control system's web interface could lead to incorrect commands being sent to a rocket or satellite, with catastrophic results. For machine learning, an attacker could use an input validation flaw to inject malicious training data (data poisoning), corrupting a physics simulation model or a neural network that predicts satellite component failure. Secure systems are the bedrock of any application where correctness and safety are non-negotiable.

## When to study it
Before tackling this, you must have a solid grasp of the client-server model, the HTTP protocol (especially GET and POST requests), and basic database interactions with SQL. You should also be comfortable with at least one server-side programming language and web framework (e.g., Python with Flask/Django, or Node.js with Express). Without this foundation, the attack vectors and their defenses will be too abstract.

## How to study it (step by step)
1.  **Read the List:** Go to the official OWASP website and read the full description for each of the current Top 10 vulnerabilities. For each one, write down a single sentence explaining the core threat.
2.  **Build a Vulnerable App:** Create a minimal web application with a single HTML form that takes a username. The server-side code should take this username and use it to query a simple user database (e.g., SQLite) to retrieve user info. Intentionally write the SQL query using unsafe string concatenation.
3.  **Become the Attacker:** Craft a malicious input string for your username field that demonstrates a SQL Injection attack. A classic to try is `' OR '1'='1' --`. Observe how the database returns all users instead of just one.
4.  **Fix Your Code:** Refactor your database query to use parameterized queries (also called prepared statements). Verify that your previous attack string no longer works and is now treated as a literal string.
5.  **Implement Authentication:** Add a password field to your app. Use a standard, secure library (e.g., `werkzeug.security` in Flask) to hash and store passwords. Build a login page that verifies a user's password against the stored hash.
6.  **Implement Authorization:** Add a `role` column to your user table (e.g., `user` or `admin`). Create a special page (e.g., `/admin`) and write logic that checks if the logged-in user has the `admin` role. If not, deny access, even if they are correctly authenticated.

## Key ideas, with intuition
1.  **The OWASP Top 10 is a "Most Wanted" List:** The Open Web Application Security Project (OWASP) regularly publishes a list of the ten most critical web security risks. Think of it not as a complete encyclopedia of all possible attacks, but as a prioritized field guide to the most common and dangerous threats you'll face. It tells you where to focus your defensive efforts first.

2.  **Input Validation: The Distrustful Bouncer:** Assume all data arriving from outside your system (user forms, API calls, URL parameters) is hostile until proven otherwise. Input validation is the process of checking this data against a strict set of rules—a whitelist—before processing it. It's like a bouncer at a club who doesn't just look for known troublemakers (a blacklist) but checks every single ID against an official guest list (a whitelist).
    -   **Whitelist (Good):** Only allow inputs that match a known-good pattern. For a US zip code, the pattern is `^[0-9]{5}$`. Any input not matching this regular expression is rejected.
    -   **Blacklist (Bad):** Try to block known-bad inputs, like `<script>` tags. An attacker can always find a variation you didn't think of, like `<ScRiPt>` or `<img src=x onerror=alert(1)>`.

3.  **Authentication (AuthN): "Who are you?"** This is the process of verifying a claimed identity. When you log in with a username and password, you are authenticating. The system is challenging you to prove you are the user you claim to be. Other forms include biometrics, hardware keys (YubiKey), or one-time codes. It's all about establishing *identity*.

4.  **Authorization (AuthZ): "What are you allowed to do?"** This happens *after* successful authentication. Once the system knows who you are, it checks what permissions you have. Just because you've successfully logged into your online banking portal (authentication) doesn't mean you are allowed to view someone else's account balance (authorization). It's all about establishing *permissions*.

## Worked example
Let's look at a classic **A03:2021-Injection** vulnerability using Python and a database.

**The Scenario:** A simple web page has a feature to look up a user by their ID. The ID is passed as a URL parameter, like `https://example.com/users?id=123`.

**Vulnerable Code (using an f-string):**
```python
import sqlite3

def get_user(user_id):
    db = sqlite3.connect('users.db')
    cursor = db.cursor()
    # THIS IS DANGEROUS!
    query = f"SELECT * FROM users WHERE id = {user_id}"
    cursor.execute(query)
    user = cursor.fetchone()
    db.close()
    return user
```
**The Attack:**
An attacker doesn't provide a normal ID. Instead, they craft a malicious URL:
`https://example.com/users?id=123 OR 1=1`

The server substitutes this `user_id` string directly into the query, resulting in this SQL:
```sql
SELECT * FROM users WHERE id = 123 OR 1=1
```
The `WHERE` clause `id = 123 OR 1=1` is always true for every row because `1=1` is always true. The database will therefore return *all* users, not just user 123, leading to a massive data leak.

**The Fix (using a parameterized query):**
The correct approach is to separate the SQL command from the user-provided data. The database driver then safely combines them, treating the input as literal data, not executable code.

```python
import sqlite3

def get_user_safe(user_id):
    db = sqlite3.connect('users.db')
    cursor = db.cursor()
    # This is SAFE. The '?' is a placeholder.
    query = "SELECT * FROM users WHERE id = ?"
    # The user_id is passed as a separate argument.
    cursor.execute(query, (user_id,))
    user = cursor.fetchone()
    db.close()
    return user
```
**Reflection:**
- The vulnerable code mixed *code* (the `SELECT` statement) and *data* (the `user_id`) in a single string. This allowed the attacker's data to be misinterpreted as code by the database.
- The fixed code uses a placeholder (`?`) to clearly separate the SQL command logic from the user-supplied data. The database driver handles the substitution safely, preventing the `OR 1=1` from being executed as part of the command. This is a fundamental form of input validation at the database layer.

## Diagrams
Here is a diagram illustrating the flow of Authentication vs. Authorization.

```text
      [User Request: "GET /admin/dashboard"]
                 |
                 v
+------------------------------------+
|          Web Server / App          |
|                                    |
|  1. Is user logged in? (AuthN) ----+-----> [NO] ---> Redirect to Login Page
|                 |                  |
|               [YES]                |
|                 |                  |
|  2. Does user have 'admin' role? --+-----> [NO] ---> Return "403 Forbidden" Error
|    (AuthZ)                         |
|                 |                  |
|               [YES]                |
|                 |                  |
|  3. Serve /admin/dashboard page    |
+------------------------------------+
                 |
                 v
         [User sees Admin Dashboard]
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:**
    Imagine you're trying to enter a secure military base.
    -   At the main gate, a guard asks for your ID. You show it, and they verify your face matches the photo. This is **Authentication** (proving who you are).
    -   Once inside, you try to enter the command center. The door has a special lock. Your ID card is scanned, and the system checks if you have "Command Center Access" clearance. This is **Authorization** (checking what you're allowed to do).
    -   **AuthN is the gate guard, AuthZ is the lock on the door.**

2.  **Facts to Overlearn (verbatim):**
    -   **Authentication (AuthN):** Are you who you say you are? (Deals with *identity*).
    -   **Authorization (AuthZ):** Are you permitted to do that? (Deals with *permissions*).
    -   **Core Principle:** Never trust user input. Whitelist, don't blacklist.

3.  **Spaced Repetition Schedule:**
    Review these concepts and the worked example at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Each time, try to re-derive the SQL injection example from memory.

4.  **First Principles Pathway:**
    If you forget everything, start with this axiom: **An adversary controls every byte of data that enters your system.** From this single assumption, you can rebuild the entire framework.
    -   If an adversary controls input, you cannot trust it. Therefore, you must *validate* it.
    -   If an adversary can pretend to be a legitimate user, you need a way to verify identity. This leads to *authentication*.
    -   If an authenticated adversary can access things they shouldn't, you need a way to check permissions for every action. This leads to *authorization*.

## Common mistakes
1.  **Confusing Authentication with Authorization:** A classic error is to check if a user is logged in (`AuthN`) and then assume they can perform any action. Always perform a separate `AuthZ` check for sensitive operations.
2.  **Using Blacklists for Validation:** Trying to block "bad" strings like `<script>`, `SELECT`, `--` is a losing game. Attackers will always find an encoding or variation you missed (e.g., `S%45LECT`). Always validate against a strict whitelist of what is allowed (e.g., "this string must be 8-16 alphanumeric characters").
3.  **Rolling Your Own Cryptography:** Never, ever invent your own functions for hashing passwords, encrypting data, or managing sessions. Use well-vetted, standard libraries for these tasks. The creators of these libraries have spent years studying attacks you haven't even heard of.
4.  **Leaking Information in Error Messages:** Displaying a full stack trace or a detailed database error to the user gives an attacker a roadmap of your system's internals. Catch exceptions and show generic, uninformative error messages to the user while logging the full details on the server for debugging.

## Self-check
1.  You are building a system for a space launch facility. Describe the security checks needed for an action like `ignite_engine(rocket_id)`. Map each check to either Authentication or Authorization.
2.  A user profile page allows users to enter their university name into a text field, which is then displayed on their public profile. What OWASP Top 10 vulnerability is most relevant here? Describe a whitelisting validation strategy to mitigate it.
3.  Examine the following pseudo-code for a bank API. Identify at least two distinct security flaws, name their OWASP categories, and explain how an attacker could exploit them.
    ```
    function transfer_funds(sender_id, recipient_account, amount):
        // Check 1: User is logged in
        if not session.is_authenticated():
            return "Error: Not logged in"

        // Check 2: Transfer funds
        db.execute("UPDATE accounts SET balance = balance - " + amount + " WHERE id = " + sender_id)
        db.execute("UPDATE accounts SET balance = balance + " + amount + " WHERE account_number = '" + recipient_account + "'")
        return "Success"
    ```