## 1. What it is — in plain English

Imagine you have a single tool in your toolbox that tries to do everything: it's a hammer, a screwdriver, a wrench, and a saw, all in one. While it might seem convenient at first, what happens if you need a better hammer? You'd have to change the *entire* tool, which might accidentally break its screwdriver function or make it a worse saw.

The Single Responsibility Principle (SRP) is like saying: "Each tool in your toolbox should have *one specific job*." So, you have a hammer for hammering, a screwdriver for screwing, and a saw for sawing. If you need a better hammer, you just replace or improve the hammer, without affecting your screwdriver or saw.

In programming, this means that every piece of your code – usually a "class" or a "module" – should have *only one reason to change*. Think of a "reason to change" as a specific job or a particular group of people (stakeholders) who would ask for a change in that part of the code. If your class handles displaying information *and* saving it to a database, that's two reasons to change: one for how information looks, and another for how it's stored. SRP says these two jobs should be in separate classes.

## 2. Why it matters — real-world applications

The Single Responsibility Principle isn't just an academic concept; it's fundamental to building robust, scalable, and maintainable systems across various industries.

1.  **Aerospace Engineering (e.g., SpaceX Falcon 9):** A rocket like the Falcon 9 is an incredibly complex machine. Imagine if the same software module was responsible for calculating the trajectory, controlling the engine thrust, *and* managing communication with ground control. If the propulsion team needed to update the thrust algorithm, it could inadvertently introduce bugs into the communication system, potentially leading to mission failure. Instead, SRP dictates separate, highly specialized modules: a "Guidance Module" for trajectory, a "Propulsion Control Module" for engines, and a "Telemetry Module" for communication. Each has one reason to change, driven by distinct engineering teams (guidance, propulsion, communications).

2.  **Machine Learning Systems (e.g., Google's Recommendation Engines):** Consider a recommendation system that suggests products to users. A single, monolithic component might be responsible for:
    *   Loading user data.
    *   Training the recommendation model.
    *   Serving real-time predictions.
    *   Logging model performance and user interactions.
    Applying SRP would lead to separate components: a `DataLoader` (reason to change: data source format), a `ModelTrainer` (reason to change: algorithm updates), a `PredictionService` (reason to change: API or deployment scaling), and a `Logger` (reason to change: logging format or destination). This separation allows ML engineers to iterate on models without disrupting data loading, or DevOps teams to scale the prediction service independently.

3.  **Financial Trading Platforms (e.g., High-Frequency Trading Systems):** In a system handling millions of transactions per second, reliability and speed are paramount. A `TradeExecutionService` might initially be built to:
    *   Validate trade requests.
    *   Match buy/sell orders.
    *   Persist trades to a database.
    *   Send confirmations to users.
    SRP would break this down: a `TradeValidator` (reason to change: new regulatory rules), an `OrderMatcher` (reason to change: new matching algorithms), a `TradeRepository` (reason to change: database schema changes), and a `NotificationService` (reason to change: new communication channels like SMS). This modularity prevents a database migration from impacting trade validation logic or a new notification requirement from destabilizing the core matching engine.

4.  **Physics Simulations (e.g., Climate Modeling):** Large-scale climate models simulate complex interactions between atmosphere, oceans, land, and ice. A single "simulation engine" class handling everything would be a nightmare. Instead, SRP is implicitly applied by having distinct modules for:
    *   Atmospheric dynamics (reason to change: new atmospheric physics equations).
    *   Ocean current modeling (reason to change: new oceanographic models).
    *   Land surface processes (reason to change: new vegetation models).
    *   Data visualization and output (reason to change: new visualization techniques or data formats).
    This allows specialized physicists and computer scientists to work on their respective domains without interfering with others, leading to more accurate and maintainable models.

## 3. Prerequisites — what you must know first

To fully grasp the Single Responsibility Principle, you should be comfortable with the following foundational Computer Science concepts:

*   **Object-Oriented Programming (OOP) Fundamentals:** The core paradigm within which SOLID principles are most commonly applied.
*   **Classes:** Blueprints for creating objects, encapsulating data and behavior.
*   **Objects:** Instances of classes, representing real-world entities or abstract concepts.
*   **Methods (or Functions):** Blocks of code associated with a class or object, defining its behavior.
*   **Encapsulation:** The bundling of data (attributes) and methods that operate on the data into a single unit (a class), and restricting direct access to some of an object's components.
*   **Abstraction:** The concept of hiding complex implementation details and showing only the essential features of an object.
*   **Modularity:** The degree to which a system's components can be separated and recombined, often leading to easier maintenance and development.
*   **Coupling:** A measure of how dependent two or more modules or classes are on each other. High coupling means changes in one often necessitate changes in another.
*   **Cohesion:** A measure of how related and focused the responsibilities of a single module or class are. High cohesion means a class does one thing well.

If any of these terms are unfamiliar, it's highly recommended to pause and review them before proceeding. SRP directly influences and leverages these concepts.

## 4. The core idea — step by step

The Single Responsibility Principle, often abbreviated as SRP, is the "S" in SOLID, a set of five fundamental design principles for writing understandable, flexible, and maintainable object-oriented code. Its core idea is deceptively simple but profoundly impactful.

### Step 1: Defining "Responsibility"

**Plain-English statement:** A "responsibility" for a class is essentially a single, distinct job or concern that the class has. More formally, it's a *reason why the class might need to change*.

**Small concrete example:** Imagine a class called `Employee`. If this class contains methods like `calculateSalary()`, `saveToDatabase()`, and `printReport()`, it has at least three distinct responsibilities.
*   `calculateSalary()`: Its job is related to business logic for payroll.
*   `saveToDatabase()`: Its job is related to data persistence.
*   `printReport()`: Its job is related to presentation/reporting.

**The formal/mathematical version:** Robert C. Martin (Uncle Bob), who popularized the SOLID principles, defined it as: "A class should have only one reason to change." We can formalize this by saying that for a class $C$, if there exists a set of stakeholders $S = \{S_1, S_2, \dots, S_k\}$ who can request changes to $C$, then for SRP to hold, $k$ must be equal to 1. That is, there should be only one group of stakeholders whose requirements could cause $C$ to change.

**What could go wrong:** A common mistake is to interpret "responsibility" as a single *method*. A class can have many methods, but they should all serve *one overarching responsibility*. For example, an `EmployeeRepository` class might have `addEmployee()`, `getEmployeeById()`, `updateEmployee()`, and `deleteEmployee()`. All these methods contribute to its single responsibility: managing the persistence of `Employee` data. The "reason to change" for `EmployeeRepository` would be a change in how employee data is stored or retrieved (e.g., switching from SQL to NoSQL).

### Step 2: The "One Reason to Change" Principle

**Plain-English statement:** The principle states that a class should have one, and only one, reason to change. If you can think of more than one independent reason why a class might need modification, then it likely has more than one responsibility.

**Small concrete example:** Continuing with our `Employee` class from Step 1:
```java
// Before SRP
class Employee {
    private String name;
    private double salary;

    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    public double calculateSalary() {
        // Complex payroll logic
        return salary * 1.10; // Example: 10% bonus
    }

    public void saveToDatabase() {
        // Logic to save employee data to a database
        System.out.println("Saving " + name + " to database.");
    }

    public void printReport() {
        // Logic to format and print employee report
        System.out.println("Printing report for " + name);
    }
}
```
Here, `Employee` has three reasons to change:
1.  Changes in salary calculation rules (e.g., new tax laws, bonus structure).
2.  Changes in how data is stored (e.g., switching database type, schema update).
3.  Changes in report formatting or output (e.g., new layout, printing to PDF instead of console).

**The formal/mathematical version:** Let $C$ be a class and $R_1, R_2, \dots, R_n$ be its distinct responsibilities. The Single Responsibility Principle states that for $C$ to be compliant, $n$ must be equal to 1. That is, $C$ should embody exactly one responsibility.

$$ \forall C: \text{responsibilities}(C) = \{R_1, R_2, \dots, R_n\} \implies n = 1 $$

**What could go wrong:** Over-fragmentation. Sometimes, new developers might take SRP too literally and create a separate class for every single method or even every line of code. This can lead to an explosion of tiny classes that are hard to manage and understand, making the system *more* complex rather than less. The key is to identify *distinct axes of change*, not just distinct actions.

### Step 3: Identifying Responsibilities

**Plain-English statement:** To find responsibilities, ask yourself: "Who would ask for a change to this class?" or "What different aspects of the system would cause this class to be modified?" Each distinct "who" or "aspect" is a separate responsibility.

**Small concrete example:** Consider a `User` class in a web application.
*   If the `User` class has methods like `authenticate()` and `authorize()`, one responsibility is "security/access control."
*   If it also has `displayProfile()` and `updateProfile()`, another responsibility is "user profile management/presentation."
*   If it has `sendWelcomeEmail()`, that's a "notification" responsibility.

These responsibilities are likely driven by different stakeholders: security engineers for authentication, UX designers for profile display, and marketing for welcome emails.

**The formal/mathematical version:** Let $C$ be a class. A responsibility $R$ of $C$ is defined by a stakeholder group $S_R$ whose requirements lead to changes in $C$ pertaining to $R$. SRP implies that for any class $C$, there should be only one such $S_R$.

$$ \text{Responsibility}(C) = \{R \mid \exists S_R \text{ such that } S_R \text{ dictates changes to } C \text{ related to } R\} $$
$$ \text{SRP} \implies |\text{Responsibility}(C)| = 1 $$

**What could go wrong:** Fuzzy boundaries. Sometimes, responsibilities can feel intertwined. For instance, `User` data and `User` authentication are related. The trick is to ask: "If the *way* we authenticate changes (e.g., from password to OAuth), does the *way* we store user data need to change, assuming the data itself remains the same?" If not, they are distinct responsibilities.

### Step 4: The Impact on Cohesion and Coupling

**Plain-English statement:** Applying SRP generally leads to higher cohesion and lower coupling, which are highly desirable traits in software design.
*   **High Cohesion:** Means that the elements within a module (e.g., methods within a class) belong together conceptually and work towards a single, well-defined purpose. SRP directly promotes this by ensuring a class focuses on one responsibility.
*   **Low Coupling:** Means that modules are relatively independent of each other. Changes in one module have minimal impact on others. By separating responsibilities, SRP reduces the need for classes to know about or depend on the internal workings of other classes.

**Small concrete example:**
*   **Before SRP (Low Cohesion, High Coupling):** Our `Employee` class from Step 1 has methods for payroll, saving, and printing. These are conceptually distinct. If `printReport()` needs to change, it's tightly coupled to the `Employee` class, even though printing is not an inherent "employee" characteristic.
*   **After SRP (High Cohesion, Low Coupling):** We would have `EmployeeData` (for employee attributes), `PayrollCalculator` (for salary logic), `EmployeeRepository` (for saving), and `ReportPrinter` (for printing).
    *   `PayrollCalculator` has high cohesion; all its methods relate to payroll.
    *   `PayrollCalculator` is loosely coupled to `EmployeeRepository`; it might *use* an `EmployeeData` object, but it doesn't know *how* `EmployeeData` is saved. If the storage mechanism changes, `PayrollCalculator` is unaffected.

**The formal/mathematical version:**
*   **Cohesion:** Let $M$ be a module (class). Let $F_M = \{f_1, f_2, \dots, f_m\}$ be the set of functionalities (methods) within $M$. High cohesion implies that all $f_i \in F_M$ are strongly related to a single, well-defined purpose $P_M$. SRP ensures that $P_M$ is that single responsibility.
*   **Coupling:** Let $M_1$ and $M_2$ be two modules. Coupling $C(M_1, M_2)$ is a measure of the degree of interdependence between them. SRP aims to minimize $C(M_1, M_2)$ by ensuring that $M_1$ and $M_2$ do not share responsibilities or arbitrary dependencies. If $M_1$ needs a service from $M_2$, it should interact through a well-defined interface, not by knowing $M_2$'s internal implementation details.

**What could go wrong:** Misinterpreting high cohesion as "putting everything related to X in one class." For example, a `Customer` class might have data, methods to calculate loyalty points, and methods to send promotional emails. While all are "customer-related," they represent different *reasons to change* (data structure, business rules for loyalty, marketing communication strategy). SRP would separate these.

### Step 5: Practical Application and Granularity

**Plain-English statement:** SRP is a guideline, not a rigid law. The "single responsibility" can sometimes be at a higher level of abstraction, depending on the context and the size of your project. It's about finding the right balance to avoid both monolithic "god objects" and overly fragmented "anemic domain models."

**Small concrete example:**
*   In a small utility library, a `StringUtils` class might contain many methods like `capitalize()`, `reverse()`, `trim()`, etc. Its single responsibility is "providing string utility functions." If a new string utility is needed, this is the place to add it. If the *definition* of what a "string utility" is changes, or if you decide to split it into `TextFormattingUtils` and `StringManipulationUtils`, that's a design decision based on a new axis of change.
*   In a complex enterprise system, a `UserService` might be responsible for "managing user accounts." This single responsibility might encompass methods like `createUser()`, `findUser()`, `updateUser()`, and `deleteUser()`. The *reason to change* would be a change in how user accounts are managed (e.g., new business rules for account creation, changes in user data structure). It would *not* include sending emails or processing payments, as those are distinct responsibilities.

**The formal/mathematical version:** The "single responsibility" $R_C$ for a class $C$ is often a conceptual grouping of related functionalities that share a common *axis of change*. The granularity of $R_C$ is determined by the domain's natural boundaries and the distinct stakeholder groups. It's not about minimizing the number of methods, but minimizing the number of *distinct reasons for modification* that originate from different concerns or actors.

**What could go wrong:** Being too dogmatic. Sometimes, a very small class might naturally have two minor responsibilities that are unlikely to change independently. Forcing a split might introduce unnecessary complexity. Use judgment, but err on the side of applying SRP when in doubt, especially for critical or frequently changing parts of the system.

## 5. Worked examples — multiple, with every step shown

### Example 1 (Easy): `Employee` class managing data and payroll calculation.

**Problem:** We have an `Employee` class that stores employee information, calculates their salary, and also prints their payslip. This class has multiple responsibilities.

**Identify what's given and what we want:**
*   **Given:** A single `Employee` class with methods for data management, salary calculation, and payslip printing.
*   **Want:** Refactor this class to adhere to the Single Responsibility Principle, separating distinct responsibilities into different classes.

**Initial (non-SRP compliant) `Employee` class:**
```java
class Employee {
    private String employeeId;
    private String name;
    private double baseSalary;
    private double hoursWorked;

    public Employee(String employeeId, String name, double baseSalary, double hoursWorked) {
        this.employeeId = employeeId;
        this.name = name;
        this.baseSalary = baseSalary;
        this.hoursWorked = hoursWorked;
    }

    // --- Data Access/Management Responsibility ---
    public String getEmployeeId() { return employeeId; }
    public String getName() { return name; }
    public double getBaseSalary() { return baseSalary; }
    public double getHoursWorked() { return hoursWorked; }
    public void setHoursWorked(double hoursWorked) { this.hoursWorked = hoursWorked; }

    // --- Payroll Calculation Responsibility ---
    public double calculateGrossPay() {
        // Assume a simple hourly rate calculation for demonstration
        return baseSalary * hoursWorked;
    }

    public double calculateNetPay(double taxRate) {
        double grossPay = calculateGrossPay();
        return grossPay * (1 - taxRate);
    }

    // --- Payslip Printing Responsibility ---
    public void printPayslip(double taxRate) {
        System.out.println("-------------------------");
        System.out.println("Payslip for: " + name);
        System.out.println("Employee ID: " + employeeId);
        System.out.println("Base Salary: $" + baseSalary);
        System.out.println("Hours Worked: " + hoursWorked);
        System.out.println("Gross Pay: $" + calculateGrossPay());
        System.out.println("Net Pay (after " + (taxRate*100) + "% tax): $" + calculateNetPay(taxRate));
        System.out.println("-------------------------");
    }
}
```

**Show every logical step:**

1.  **Identify Responsibilities:**
    *   **Responsibility 1: Employee Data Management.** This involves storing and providing access to employee attributes like ID, name, base salary, and hours worked. The reason to change here would be a change in the employee's data structure (e.g., adding an address, changing salary type).
    *   **Responsibility 2: Payroll Calculation.** This involves determining gross and net pay based on business rules. The reason to change here would be a change in tax laws, bonus structures, or how pay is calculated.
    *   **Responsibility 3: Payslip Printing/Reporting.** This involves formatting and presenting the payroll information. The reason to change here would be a change in the payslip layout, output format (e.g., to PDF, web), or printing mechanism.

2.  **Create Separate Classes for Each Responsibility:**

    *   **For Employee Data Management:** We'll create an `EmployeeData` class (or simply rename and keep the core data in `Employee` and extract the others). Let's keep `Employee` for core data and identity for clarity.

        ```java
        // Represents the core employee data
        class Employee {
            private String employeeId;
            private String name;
            private double baseSalary;
            private double hoursWorked;

            public Employee(String employeeId, String name, double baseSalary, double hoursWorked) {
                this.employeeId = employeeId;
                this.name = name;
                this.baseSalary = baseSalary;
                this.hoursWorked = hoursWorked;
            }

            // Getters and setters for employee data
            public String getEmployeeId() { return employeeId; }
            public String getName() { return name; }
            public double getBaseSalary() { return baseSalary; }
            public double getHoursWorked() { return hoursWorked; }
            public void setHoursWorked(double hoursWorked) { this.hoursWorked = hoursWorked; }
            // Reason to change: Employee data structure changes.
        }
        ```
        *Explanation:* We've isolated the core data and its access methods into the `Employee` class. Now, if we need to add a new field like `department` or change the type of `employeeId`, only this class needs modification.

    *   **For Payroll Calculation:** We'll create a `PayrollCalculator` class.

        ```java
        // Handles the business logic for calculating payroll
        class PayrollCalculator {
            public double calculateGrossPay(Employee employee) {
                // Uses employee data to perform calculation
                return employee.getBaseSalary() * employee.getHoursWorked();
            }

            public double calculateNetPay(Employee employee, double taxRate) {
                double grossPay = calculateGrossPay(employee);
                return grossPay * (1 - taxRate);
            }
            // Reason to change: Payroll calculation rules change.
        }
        ```
        *Explanation:* This class now solely focuses on payroll logic. It takes an `Employee` object as input, but doesn't modify it or know how it's stored or displayed. If tax laws change, only `PayrollCalculator` needs updating.

    *   **For Payslip Printing/Reporting:** We'll create a `PayslipPrinter` class.

        ```java
        // Handles the formatting and printing of payslips
        class PayslipPrinter {
            public void printPayslip(Employee employee, PayrollCalculator calculator, double taxRate) {
                System.out.println("-------------------------");
                System.out.println("Payslip for: " + employee.getName());
                System.out.println("Employee ID: " + employee.getEmployeeId());
                System.out.println("Base Salary: $" + employee.getBaseSalary());
                System.out.println("Hours Worked: " + employee.getHoursWorked());
                System.out.println("Gross Pay: $" + calculator.calculateGrossPay(employee)); // Uses calculator
                System.out.println("Net Pay (after " + (taxRate*100) + "% tax): $" + calculator.calculateNetPay(employee, taxRate)); // Uses calculator
                System.out.println("-------------------------");
            }
            // Reason to change: Payslip format or output mechanism changes.
        }
        ```
        *Explanation:* This class is responsible only for presentation. It *uses* the `Employee` data and the `PayrollCalculator` to get the necessary information, but it doesn't perform the calculations itself. If the payslip needs to be outputted to HTML instead of the console, only `PayslipPrinter` changes.

3.  **Demonstrate Usage:**

    ```java
    public class PayrollApplication {
        public static void main(String[] args) {
            // 1. Create employee data
            Employee emp1 = new Employee("E001", "Alice Smith", 25.0, 160.0);

            // 2. Perform payroll calculations
            PayrollCalculator calculator = new PayrollCalculator();
            double gross = calculator.calculateGrossPay(emp1);
            double net = calculator.calculateNetPay(emp1, 0.20); // 20% tax rate

            System.out.println("Alice's Gross Pay: $" + gross);
            System.out.println("Alice's Net Pay: $" + net);

            // 3. Print payslip
            PayslipPrinter printer = new PayslipPrinter();
            printer.printPayslip(emp1, calculator, 0.20);
        }
    }
    ```

**Final Answer:** The original `Employee` class has been refactored into three SRP-compliant classes: `Employee`, `PayrollCalculator`, and `PayslipPrinter`.

**Reflection:** This example was relatively straightforward because the responsibilities (data, calculation, presentation) are quite distinct. The trickiest part is ensuring that the new classes only take what they *need* as input and don't try to manage other responsibilities. For instance, `PayslipPrinter` doesn't implement `calculateGrossPay`; it *delegates* that to `PayrollCalculator`. This demonstrates low coupling and high cohesion.

---

### Example 2 (Medium): `OrderProcessor` in an e-commerce system.

**Problem:** An `OrderProcessor` class in an e-commerce system is responsible for validating an order, saving it to the database, and sending a confirmation email to the customer.

**Identify what's given and what we want:**
*   **Given:** A single `OrderProcessor` class with methods for validation, persistence, and email notification.
*   **Want:** Refactor to apply SRP.

**Initial (non-SRP compliant) `OrderProcessor` class:**
```java
class Order {
    private String orderId;
    private String customerEmail;
    private double amount;
    private boolean isValid;
    private boolean isSaved;

    public Order(String orderId, String customerEmail, double amount) {
        this.orderId = orderId;
        this.customerEmail = customerEmail;
        this.amount = amount;
        this.isValid = false;
        this.isSaved = false;
    }

    public String getOrderId() { return orderId; }
    public String getCustomerEmail() { return customerEmail; }
    public double getAmount() { return amount; }
    public void setValid(boolean valid) { isValid = valid; }
    public boolean isValid() { return isValid; }
    public void setSaved(boolean saved) { isSaved = saved; }
    public boolean isSaved() { return isSaved; }
}

class OrderProcessor {
    public void processOrder(Order order) {
        // 1. Validate the order
        if (!validateOrder(order)) {
            System.out.println("Order " + order.getOrderId() + " validation failed.");
            return;
        }
        order.setValid(true);
        System.out.println("Order " + order.getOrderId() + " validated successfully.");

        // 2. Save the order to the database
        if (!saveOrder(order)) {
            System.out.println("Order " + order.getOrderId() + " failed to save.");
            return;
        }
        order.setSaved(true);
        System.out.println("Order " + order.getOrderId() + " saved to database.");

        // 3. Send confirmation email
        sendConfirmationEmail(order);
        System.out.println("Confirmation email sent for order " + order.getOrderId());
    }

    private boolean validateOrder(Order order) {
        // Simulate validation logic
        if (order.getAmount() <= 0) {
            System.out.println("Validation Error: Order amount must be positive.");
            return false;
        }
        if (!order.getCustomerEmail().contains("@")) {
            System.out.println("Validation Error: Invalid customer email.");
            return false;
        }
        return true;
    }

    private boolean saveOrder(Order order) {
        // Simulate database save operation
        System.out.println("Saving order " + order.getOrderId() + " to DB...");
        // In a real app, this would interact with a DB. For now, assume success.
        return true;
    }

    private void sendConfirmationEmail(Order order) {
        // Simulate email sending
        System.out.println("Sending email to " + order.getCustomerEmail() + " for order " + order.getOrderId());
    }
}
```

**Show every logical step:**

1.  **Identify Responsibilities:**
    *   **Responsibility 1: Order Validation.** Ensuring the order data is correct and meets business rules. Reason to change: new validation rules (e.g., minimum order value, specific product combinations).
    *   **Responsibility 2: Order Persistence.** Storing the order data reliably. Reason to change: database schema changes, switching database technology, or changes in how data is accessed.
    *   **Responsibility 3: Order Notification (Email).** Informing the customer about the order. Reason to change: email template changes, switching email service provider, adding SMS notifications.
    *   **Responsibility 4: Order Orchestration/Workflow.** The `processOrder` method itself, which coordinates the other responsibilities. This is a higher-level responsibility.

2.  **Create Separate Classes for Each Responsibility (except orchestration, which can remain in a higher-level service):**

    *   **For Order Validation:** `OrderValidator`

        ```java
        class OrderValidator {
            public boolean isValid(Order order) {
                if (order.getAmount() <= 0) {
                    System.out.println("Validation Error: Order amount must be positive.");
                    return false;
                }
                if (!order.getCustomerEmail().contains("@")) {
                    System.out.println("Validation Error: Invalid customer email.");
                    return false;
                }
                // Add more complex validation rules here
                return true;
            }
            // Reason to change: Order validation rules change.
        }
        ```
        *Explanation:* This class is purely focused on validating an `Order` object. It doesn't know how to save or send emails.

    *   **For Order Persistence:** `OrderRepository`

        ```java
        class OrderRepository {
            public void save(Order order) {
                System.out.println("Saving order " + order.getOrderId() + " to DB...");
                // Real implementation would use JDBC, JPA, etc.
                order.setSaved(true); // Update order status after successful save
            }

            public Order findById(String orderId) {
                // Simulate fetching from DB
                System.out.println("Fetching order " + orderId + " from DB...");
                return new Order(orderId, "customer@example.com", 100.0); // Dummy
            }
            // Reason to change: Database schema, ORM framework, or storage mechanism changes.
        }
        ```
        *Explanation:* This class abstracts away the database interactions. Its sole purpose is to store and retrieve `Order` objects.

    *   **For Order Notification (Email):** `EmailNotifier` (or `OrderNotifier`)

        ```java
        class EmailNotifier {
            public void sendConfirmationEmail(Order order) {
                System.out.println("Sending confirmation email to " + order.getCustomerEmail() + " for order " + order.getOrderId());
                // Real implementation would use an email API
            }
            // Reason to change: Email content, sender, or email service provider changes.
        }
        ```
        *Explanation:* This class is solely responsible for sending emails. If we later want to send SMS, we could create an `SmsNotifier` or extend this concept with an `OrderNotifier` interface.

3.  **Re-design the `OrderProcessor` to orchestrate these new classes:**

    ```java
    class OrderProcessingService { // Renamed to reflect its service/orchestration role
        private OrderValidator validator;
        private OrderRepository repository;
        private EmailNotifier notifier;

        // Constructor for dependency injection
        public OrderProcessingService(OrderValidator validator, OrderRepository repository, EmailNotifier notifier) {
            this.validator = validator;
            this.repository = repository;
            this.notifier = notifier;
        }

        public void processOrder(Order order) {
            // 1. Validate the order
            if (!validator.isValid(order)) {
                System.out.println("Order " + order.getOrderId() + " validation failed. Aborting.");
                return;
            }
            order.setValid(true);
            System.out.println("Order " + order.getOrderId() + " validated successfully.");

            // 2. Save the order to the database
            repository.save(order);
            System.out.println("Order " + order.getOrderId() + " saved to database.");

            // 3. Send confirmation email
            notifier.sendConfirmationEmail(order);
            System.out.println("Confirmation email sent for order " + order.getOrderId());
        }
        // Reason to change: The *workflow* of processing an order changes (e.g., add fraud check, inventory update).
    }
    ```
    *Explanation:* The new `OrderProcessingService` (renamed from `OrderProcessor` to better reflect its role) now *coordinates* the process. It doesn't implement the details of validation, saving, or emailing. It delegates these responsibilities to its collaborators. This makes the `OrderProcessingService` itself SRP-compliant because its single responsibility is orchestrating the order processing workflow.

4.  **Demonstrate Usage:**

    ```java
    public class EcommerceApp {
        public static void main(String[] args) {
            // Instantiate dependencies
            OrderValidator validator = new OrderValidator();
            OrderRepository repository = new OrderRepository();
            EmailNotifier notifier = new EmailNotifier();

            // Inject dependencies into the processing service
            OrderProcessingService service = new OrderProcessingService(validator, repository, notifier);

            // Create an order
            Order customerOrder1 = new Order("ORD001", "customer1@example.com", 150.75);
            Order customerOrder2 = new Order("ORD002", "invalid-email", 50.0);
            Order customerOrder3 = new Order("ORD003", "customer3@example.com", -10.0);

            System.out.println("\n--- Processing Order 1 ---");
            service.processOrder(customerOrder1);

            System.out.println("\n--- Processing Order 2 ---");
            service.processOrder(customerOrder2); // Should fail validation

            System.out.println("\n--- Processing Order 3 ---");
            service.processOrder(customerOrder3); // Should fail validation
        }
    }
    ```

**Final Answer:** The monolithic `OrderProcessor` has been decomposed into `OrderValidator`, `OrderRepository`, `EmailNotifier`, and an orchestrating `OrderProcessingService`, each with a single reason to change.

**Reflection:** This example highlights that SRP often leads to a pattern where a "service" class orchestrates the work of several specialized "component" classes. The `Order` class itself is a data carrier (anemic domain model here, but could have behavior if its data had complex invariants). The `OrderProcessingService`'s single responsibility is to manage the *flow* of order processing, not the individual steps. This separation makes the system much more flexible: changing the validation rules only affects `OrderValidator`, changing the database only affects `OrderRepository`, etc.

---

### Example 3 (Hard): `GameCharacter` in a game engine.

**Problem:** A `GameCharacter` class in a game engine handles its position and movement, renders itself on screen, and manages its health and status.

**Identify what's given and what we want:**
*   **Given:** A single `GameCharacter` class with methods for movement, rendering, and health management.
*   **Want:** Decompose this class using SRP.

**Initial (non-SRP compliant) `GameCharacter` class:**
```java
class Vector2D {
    public double x, y;
    public Vector2D(double x, double y) { this.x = x; this.y = y; }
    public void add(Vector2D other) { this.x += other.x; this.y += other.y; }
    public String toString() { return "(" + x + ", " + y + ")"; }
}

class GameCharacter {
    private String name;
    private Vector2D position;
    private Vector2D velocity;
    private int health;
    private int maxHealth;
    private String spritePath; // Path to the image file for rendering

    public GameCharacter(String name, Vector2D initialPosition, int maxHealth, String spritePath) {
        this.name = name;
        this.position = initialPosition;
        this.velocity = new Vector2D(0, 0);
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.spritePath = spritePath;
    }

    // --- Movement Responsibility ---
    public void move(double deltaTime) {
        position.add(new Vector2D(velocity.x * deltaTime, velocity.y * deltaTime));
        System.out.println(name + " moved to " + position);
    }

    public void setVelocity(Vector2D newVelocity) {
        this.velocity = newVelocity;
    }

    // --- Rendering Responsibility ---
    public void render() {
        // Imagine complex rendering logic here, using spritePath and position
        System.out.println("Rendering " + name + " at " + position + " using sprite " + spritePath);
    }

    // --- Health Management Responsibility ---
    public void takeDamage(int amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.health = 0;
            System.out.println(name + " has been defeated!");
        } else {
            System.out.println(name + " took " + amount + " damage. Health: " + health + "/" + maxHealth);
        }
    }

    public void heal(int amount) {
        this.health += amount;
        if (this.health > maxHealth) {
            this.health = maxHealth;
        }
        System.out.println(name + " healed " + amount + ". Health: " + health + "/" + maxHealth);
    }

    public boolean isAlive() {
        return health > 0;
    }

    // Getters for properties
    public String getName() { return name; }
    public Vector2D getPosition() { return position; }
    public int getHealth() { return health; }
    public String getSpritePath() { return spritePath; }
}
```

**Show every logical step:**

1.  **Identify Responsibilities:**
    *   **Responsibility 1: Core Character Identity/Data.** The name, and perhaps a reference to its components. Reason to change: fundamental character properties.
    *   **Responsibility 2: Movement Logic.** How the character moves, its position, and velocity. Reason to change: physics engine updates, new movement types (e.g., flying, jumping).
    *   **Responsibility 3: Rendering Logic.** How the character is drawn on screen. Reason to change: graphics engine updates, new animation systems, different visual effects.
    *   **Responsibility 4: Health and Status Management.** How the character takes damage, heals, and its overall vital status. Reason to change: new game mechanics (e.g., temporary invulnerability, status effects).

2.  **Create Separate Classes (Components) for Each Responsibility:** In game development, this often leads to a "Component-based architecture" where a `GameObject` (or `GameCharacter`) is composed of various specialized components.

    *   **For Core Character Identity/Data:** The `GameCharacter` class will now primarily act as an identifier and a container for its components.

        ```java
        // Core character identity and container for components
        class GameCharacter {
            private String name;
            private MovementComponent movementComponent;
            private RenderComponent renderComponent;
            private HealthComponent healthComponent;

            public GameCharacter(String name, Vector2D initialPosition, int maxHealth, String spritePath) {
                this.name = name;
                // Initialize components
                this.movementComponent = new MovementComponent(initialPosition);
                this.renderComponent = new RenderComponent(spritePath);
                this.healthComponent = new HealthComponent(maxHealth);
            }

            // Methods to access components or delegate to them
            public String getName() { return name; }
            public Vector2D getPosition() { return movementComponent.getPosition(); } // Delegate
            public int getHealth() { return healthComponent.getHealth(); } // Delegate
            public boolean isAlive() { return healthComponent.isAlive(); } // Delegate

            // Public methods to interact with the character, delegating to components
            public void update(double deltaTime) {
                movementComponent.move(deltaTime);
                // Other game logic updates can go here or in a separate GameLoop class
            }

            public void render() {
                renderComponent.render(movementComponent.getPosition()); // Pass current position for rendering
            }

            public void takeDamage(int amount) {
                healthComponent.takeDamage(amount);
            }

            public void heal(int amount) {
                healthComponent.heal(amount);
            }

            public void setVelocity(Vector2D newVelocity) {
                movementComponent.setVelocity(newVelocity);
            }
            // Reason to change: If the character needs a new component, or the way components interact changes.
        }
        ```
        *Explanation:* The `GameCharacter` now primarily holds the character's name and references to its specialized components. Its methods largely delegate to these components. Its own "reason to change" is related to its identity or the composition of its components.

    *   **For Movement Logic:** `MovementComponent`

        ```java
        class MovementComponent {
            private Vector2D position;
            private Vector2D velocity;

            public MovementComponent(Vector2D initialPosition) {
                this.position = initialPosition;
                this.velocity = new Vector2D(0, 0);
            }

            public void move(double deltaTime) {
                position.add(new Vector2D(velocity.x * deltaTime, velocity.y * deltaTime));
            }

            public void setVelocity(Vector2D newVelocity) {
                this.velocity = newVelocity;
            }

            public Vector2D getPosition() { return position; }
            public Vector2D getVelocity() { return velocity; }
            // Reason to change: Movement physics, collision detection (if integrated here), or new movement types.
        }
        ```
        *Explanation:* This component encapsulates all movement-related logic and data (position, velocity).

    *   **For Rendering Logic:** `RenderComponent`

        ```java
        class RenderComponent {
            private String spritePath;

            public RenderComponent(String spritePath) {
                this.spritePath = spritePath;
            }

            public void render(Vector2D currentPosition) {
                // In a real engine, this would use graphics APIs (OpenGL, DirectX, etc.)
                System.out.println("Rendering sprite '" + spritePath + "' at " + currentPosition);
            }
            // Reason to change: Graphics engine changes, animation system updates, or visual effects.
        }
        ```
        *Explanation:* This component is solely responsible for drawing the character. It needs the character's current position, which it gets from the `MovementComponent` (via delegation from `GameCharacter`).

    *   **For Health Management:** `HealthComponent`

        ```java
        class HealthComponent {
            private int health;
            private int maxHealth;

            public HealthComponent(int maxHealth) {
                this.maxHealth = maxHealth;
                this.health = maxHealth;
            }

            public void takeDamage(int amount) {
                this.health -= amount;
                if (this.health <= 0) {
                    this.health = 0;
                    System.out.println("Character defeated!");
                } else {
                    System.out.println("Took " + amount + " damage. Health: " + health + "/" + maxHealth);
                }
            }

            public void heal(int amount) {
                this.health += amount;
                if (this.health > maxHealth) {
                    this.health = maxHealth;
                }
                System.out.println("Healed " + amount + ". Health: " + health + "/" + maxHealth);
            }

            public boolean isAlive() {
                return health > 0;
            }

            public int getHealth() { return health; }
            public int getMaxHealth() { return maxHealth; }
            // Reason to change: Game mechanics related to health, damage, healing, or status effects.
        }
        ```
        *Explanation:* This component manages all health-related attributes and behaviors.

3.  **Demonstrate Usage:**

    ```java
    public class Game {
        public static void main(String[] args) {
            GameCharacter player = new GameCharacter("Hero", new Vector2D(0, 0), 100, "hero_sprite.png");
            GameCharacter enemy = new GameCharacter("Goblin", new Vector2D(10, 5), 50, "goblin_sprite.png");

            System.out.println(player.getName() + " starts at " + player.getPosition());
            System.out.println(enemy.getName() + " starts at " + enemy.getPosition());

            // Game loop simulation
            double deltaTime = 0.1; // Small time step

            System.out.println("\n--- Game Tick 1 ---");
            player.setVelocity(new Vector2D(1, 0)); // Move right
            player.update(deltaTime);
            player.render();
            enemy.takeDamage(10);

            System.out.println("\n--- Game Tick 2 ---");
            player.setVelocity(new Vector2D(0, 1)); // Move up
            player.update(deltaTime);
            player.render();
            enemy.takeDamage(45); // Defeat enemy
            enemy.render(); // Still renders even if defeated, rendering is separate from health

            System.out.println("\n--- Game Tick 3 ---");
            player.heal(5);
            player.render();
        }
    }
    ```

**Final Answer:** The `GameCharacter` class has been transformed into a composite entity, delegating movement, rendering, and health management to `MovementComponent`, `RenderComponent`, and `HealthComponent` respectively, each adhering to SRP.

**Reflection:** This example is harder because `GameCharacter` itself is still a central entity. The key is to realize its *own* single responsibility becomes "being a game character entity and orchestrating its components." This leads to a powerful "Component-based architecture" widely used in game engines (like Unity's GameObject-Component model). The `GameCharacter` class doesn't *do* the movement or rendering; it *has* components that do. This allows for immense flexibility: you can add a `MagicComponent` or `InventoryComponent` without modifying the core `GameCharacter` or existing components.

---

### Example 4 (Harder, more abstract): A `ConfigurationManager` in a complex application.

**Problem:** A `ConfigurationManager` class is responsible for loading application settings from various sources (e.g., a file, a database, environment variables), validating these settings, and providing a unified interface to access them.

**Identify what's given and what we want:**
*   **Given:** A single `ConfigurationManager` class handling loading, validation, and access.
*   **Want:** Apply SRP to separate these concerns.

**Initial (non-SRP compliant) `ConfigurationManager` class:**
```java
import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

class ConfigurationManager {
    private Map<String, String> settings = new HashMap<>();

    public ConfigurationManager() {
        // Default constructor might load some default settings
    }

    // --- Loading Responsibility ---
    public void loadFromFile(String filePath) {
        Properties props = new Properties();
        try (FileInputStream fis = new FileInputStream(filePath)) {
            props.load(fis);
            props.forEach((key, value) -> settings.put(key.toString(), value.toString()));
            System.out.println("Loaded settings from file: " + filePath);
        } catch (IOException e) {
            System.err.println("Error loading config from file: " + e.getMessage());
        }
    }

    public void loadFromDatabase(String dbConnectionString) {
        // Simulate loading from DB
        System.out.println("Loading settings from database: " + dbConnectionString);
        settings.put("db.user", "admin");
        settings.put("db.password", "secure_pass");
        settings.put("app.mode", "production");
    }

    public void loadFromEnvironment() {
        System.out.println("Loading settings from environment variables.");
        if (System.getenv("APP_PORT") != null) {
            settings.put("app.port", System.getenv("APP_PORT"));
        }
        if (System.getenv("API_KEY") != null) {
            settings.put("api.key", System.getenv("API_KEY"));
        }
    }

    // --- Validation Responsibility ---
    public boolean validateSettings() {
        System.out.println("Validating settings...");
        if (!settings.containsKey("app.port") || settings.get("app.port").isEmpty()) {
            System.err.println("Validation Error: 'app.port' is missing or empty.");
            return false;
        }
        try {
            Integer.parseInt(settings.get("app.port"));
        } catch (NumberFormatException e) {
            System.err.println("Validation Error: 'app.port' must be a number.");
            return false;
        }
        // More validation rules...
        System.out.println("Settings validated successfully.");
        return true;
    }

    // --- Access Responsibility ---
    public String getSetting(String key) {
        return settings.get(key);
    }

    public String getSetting(String key, String defaultValue) {
        return settings.getOrDefault(key, defaultValue);
    }

    public int getIntSetting(String key, int defaultValue) {
        try {
            return Integer.parseInt(settings.getOrDefault(key, String.valueOf(defaultValue)));
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }
}
```

**Show every logical step:**

1.  **Identify Responsibilities:**
    *   **Responsibility 1: Configuration Source Loading.** This involves knowing how to read configurations from a *specific type* of source (file, database, environment variable). Each source type is a distinct reason to change (e.g., file format changes, DB schema for configs changes, environment variable naming conventions).
    *   **Responsibility 2: Configuration Validation.** Ensuring the loaded settings meet application requirements. Reason to change: new application requirements for specific settings, data type checks.
    *   **Responsibility 3: Configuration Access/Querying.** Providing a consistent way for the application to retrieve settings. Reason to change: new data types needed (e.g., `getBooleanSetting`), or changes in how settings are looked up.
    *   **Responsibility 4: Configuration Aggregation/Orchestration.** The high-level process of combining settings from multiple sources, applying validation, and making them available. This is the main orchestrator.

2.  **Create Separate Classes/Interfaces for Each Responsibility:**

    *   **For Configuration Source Loading:** Define an interface for `ConfigurationSource` and concrete implementations for each source type.

        ```java
        // Interface for any configuration source
        interface ConfigurationSource {
            Map<String, String> load();
            // Reason to change: Interface definition changes (rare).
        }

        // Concrete implementation for loading from a properties file
        class FileConfigurationSource implements ConfigurationSource {
            private String filePath;
            public FileConfigurationSource(String filePath) { this.filePath = filePath; }

            @Override
            public Map<String, String> load() {
                Map<String, String> loadedSettings = new HashMap<>();
                Properties props = new Properties();
                try (FileInputStream fis = new FileInputStream(filePath)) {
                    props.load(fis);
                    props.forEach((key, value) -> loadedSettings.put(key.toString(), value.toString()));
                    System.out.println("Loaded settings from file: " + filePath);
                } catch (IOException e) {
                    System.err.println("Error loading config from file " + filePath + ": " + e.getMessage());
                }
                return loadedSettings;
            }
            // Reason to change: File format changes, file access methods change.
        }

        // Concrete implementation for loading from a database
        class DatabaseConfigurationSource implements ConfigurationSource {
            private String dbConnectionString;
            public DatabaseConfigurationSource(String dbConnectionString) { this.dbConnectionString = dbConnectionString; }

            @Override
            public Map<String, String> load() {
                Map<String, String> loadedSettings = new HashMap<>();
                System.out.println("Loading settings from database: " + dbConnectionString);
                // Simulate DB fetch
                loadedSettings.put("db.user", "admin_db");
                loadedSettings.put("db.password", "secure_pass_db");
                loadedSettings.put("app.mode", "production_db");
                return loadedSettings;
            }
            // Reason to change: Database schema for configs changes, DB driver changes.
        }

        // Concrete implementation for loading from environment variables
        class EnvironmentConfigurationSource implements ConfigurationSource {
            @Override
            public Map<String, String> load() {
                Map<String, String> loadedSettings = new HashMap<>();
                System.out.println("Loading settings from environment variables.");
                if (System.getenv("APP_PORT") != null) {
                    loadedSettings.put("app.port", System.getenv("APP_PORT"));
                }
                if (System.getenv("API_KEY") != null) {
                    loadedSettings.put("api.key", System.getenv("API_KEY"));
                }
                return loadedSettings;
            }
            // Reason to change: Environment variable naming conventions change.
        }
        ```
        *Explanation:* We now have an interface `ConfigurationSource` and specific implementations. Each implementation has one reason to change: how *its specific source type* is read.

    *   **For Configuration Validation:** `ConfigurationValidator`

        ```java
        class ConfigurationValidator {
            public boolean validate(Map<String, String> settings) {
                System.out.println("Validating settings...");
                if (!settings.containsKey("app.port") || settings.get("app.port").isEmpty()) {
                    System.err.println("Validation Error: 'app.port' is missing or empty.");
                    return false;
                }
                try {
                    Integer.parseInt(settings.get("app.port"));
                } catch (NumberFormatException e) {
                    System.err.println("Validation Error: 'app.port' must be a number.");
                    return false;
                }
                // More complex validation rules can be added here
                System.out.println("Settings validated successfully.");
                return true;
            }
            // Reason to change: Application's requirements for configuration values change.
        }
        ```
        *Explanation:* This class is solely responsible for applying validation rules to a given set of settings.

    *   **For Configuration Access/Querying:** `ConfigurationProvider` (or similar)

        ```java
        // This class provides a consistent interface to access the merged settings.
        class ConfigurationProvider {
            private final Map<String, String> settings;

            public ConfigurationProvider(Map<String, String> settings) {
                this.settings = new HashMap<>(settings); // Defensive copy
            }

            public String getSetting(String key) {
                return settings.get(key);
            }

            public String getSetting(String key, String defaultValue) {
                return settings.getOrDefault(key, defaultValue);
            }

            public int getIntSetting(String key, int defaultValue) {
                try {
                    return Integer.parseInt(settings.getOrDefault(key, String.valueOf(defaultValue)));
                } catch (NumberFormatException e) {
                    return defaultValue;
                }
            }
            // Reason to change: New types of access methods needed (e.g., getBooleanSetting), or default lookup logic.
        }
        ```
        *Explanation:* This class provides a read-only view and utility methods for accessing the aggregated configuration. Its reason to change is strictly about how settings are *retrieved* by other parts of the application.

    *   **For Configuration Aggregation/Orchestration:** The new `ApplicationConfiguration` class (replaces the original `ConfigurationManager` in its orchestrating role).

        ```java
        // Orchestrates loading, validating, and providing configuration
        class ApplicationConfiguration {
            private final ConfigurationProvider provider;
            private final ConfigurationValidator validator;
            private final ConfigurationSource[] sources; // Can accept multiple sources

            public ApplicationConfiguration(ConfigurationValidator validator, ConfigurationSource... sources) {
                this.validator = validator;
                this.sources = sources;
                this.provider = initializeConfiguration();
            }

            private ConfigurationProvider initializeConfiguration() {
                Map<String, String> aggregatedSettings = new HashMap<>();
                // Load from all sources, allowing later sources to override earlier ones (common pattern)
                for (ConfigurationSource source : sources) {
                    aggregatedSettings.putAll(source.load());
                }

                if (!validator.validate(aggregatedSettings)) {
                    throw new IllegalStateException("Application configuration is invalid. Cannot proceed.");
                }
                return new ConfigurationProvider(aggregatedSettings);
            }

            // Delegate access to the underlying provider
            public String getSetting(String key) {
                return provider.getSetting(key);
            }

            public String getSetting(String key, String defaultValue) {
                return provider.getSetting(key, defaultValue);
            }

            public int getIntSetting(String key, int defaultValue) {
                return provider.getIntSetting(key, defaultValue);
            }
            // Reason to change: The *process* of loading, merging, and validating configurations changes.
            // E.g., change the order of sources, add encryption/decryption during load.
        }
        ```
        *Explanation:* This class brings everything together. Its single responsibility is to manage the *lifecycle* of the application's configuration. It depends on (is composed of) the specific sources, a validator, and a provider.

3.  **Demonstrate Usage:**

    ```java
    public class AppRunner {
        public static void main(String[] args) {
            // Simulate environment variable for testing
            System.setProperty("APP_PORT", "8080"); // For testing EnvironmentConfigurationSource

            // 1. Create a dummy config file for FileConfigurationSource
            // (In a real scenario, this file would exist)
            // Example: config.properties content:
            // app.name=MyAwesomeApp
            // app.version=1.0.0

            // 2. Instantiate individual SRP-compliant components
            ConfigurationSource fileSource = new FileConfigurationSource("config.properties"); // Create this file
            ConfigurationSource dbSource = new DatabaseConfigurationSource("jdbc:mysql://localhost/app_config");
            ConfigurationSource envSource = new EnvironmentConfigurationSource();

            ConfigurationValidator appValidator = new ConfigurationValidator();

            // 3. Create the main ApplicationConfiguration, injecting dependencies
            ApplicationConfiguration appConfig = new ApplicationConfiguration(
                appValidator,
                fileSource, // Load from file first
                dbSource,   // Then from DB (overrides file if keys overlap)
                envSource   // Then from environment (overrides DB/file)
            );

            // 4. Access settings through the ApplicationConfiguration
            System.out.println("\n--- Application Settings ---");
            System.out.println("App Name: " + appConfig.getSetting("app.name", "DefaultApp"));
            System.out.println("App Version: " + appConfig.getSetting("app.version", "0.0.0"));
            System.out.println("DB User: " + appConfig.getSetting("db.user", "guest"));
            System.out.println("DB Password: " + appConfig.getSetting("db.password", ""));
            System.out.println("App Mode: " + appConfig.getSetting("app.mode", "development"));
            System.out.println("App Port: " + appConfig.getIntSetting("app.port", 80));
            System.out.println("API Key: " + appConfig.getSetting("api.key", "N/A"));

            // Test invalid config (e.g., if app.port was missing or non-numeric)
            // To test this, you'd need to modify the EnvironmentConfigurationSource or not set APP_PORT.
            // Or create a source that specifically provides an invalid value.
        }
    }
    ```

**Final Answer:** The monolithic `ConfigurationManager` has been decomposed into an interface `ConfigurationSource` with multiple implementations (`FileConfigurationSource`, `DatabaseConfigurationSource`, `EnvironmentConfigurationSource`), `ConfigurationValidator`, `ConfigurationProvider`, and an orchestrating `ApplicationConfiguration` class. Each now has a single, clear reason to change.

**Reflection:** This example demonstrates how SRP can lead to a more abstract and flexible design, especially when dealing with multiple data sources or complex workflows. The use of an interface (`ConfigurationSource`) is crucial here, as it allows the `ApplicationConfiguration` to be decoupled from the concrete source types. Adding a new configuration source (e.g., a cloud secret manager) would only require creating a new `ConfigurationSource` implementation, without touching the existing logic for other sources, validation, or the orchestration itself. This is a powerful outcome of SRP.

## 6. Common mistakes and traps

1.  **Misinterpreting "Responsibility" as a Single Method:** A class can have many methods, but they should all contribute to its *one overarching responsibility*. For example, an `AccountRepository` might have `saveAccount()`, `findAccountById()`, `updateAccount()`, and `deleteAccount()`. All these methods serve the single responsibility of "managing account persistence." The mistake is to think each method needs its own class.
2.  **Over-fragmentation (Too Many Tiny Classes):** Taking SRP too literally can lead to an explosion of classes, where each class does almost nothing. This can make the codebase harder to navigate and understand, increasing complexity rather than reducing it. The key is to find the right level of abstraction for a "reason to change."
3.  **Ignoring Stakeholder Groups:** The "reason to change" is often tied to different stakeholder groups. If the accounting department, the IT operations team, and the marketing team would each ask for changes to a particular class, it likely has at least three responsibilities. Forgetting to consider these distinct groups can lead to missed opportunities for separation.
4.  **Confusing SRP with "Do One Thing" (for Methods):** While individual methods should ideally "do one thing," SRP applies to classes/modules. A class's "one thing" (its responsibility) can involve multiple internal