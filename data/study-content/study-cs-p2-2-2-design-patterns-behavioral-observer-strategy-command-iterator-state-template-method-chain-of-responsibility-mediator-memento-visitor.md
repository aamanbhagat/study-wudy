## 1. What it is — in plain English

Imagine you're building something complex, like a house or a car. You wouldn't invent every single tool or technique from scratch for every new project, would you? Instead, you'd use established blueprints, best practices, and specialized tools that experienced builders have found work well over time.

In computer science, "Design Patterns" are exactly like those proven blueprints or recipes. They are elegant, reusable solutions to common problems that arise when designing software. They aren't finished code that you can just paste in; rather, they are templates for how to structure your code to solve a particular design problem effectively.

"Behavioral Design Patterns" are a specific category of these blueprints. They focus on how objects communicate with each other and how responsibilities are distributed among them. Think of it as defining the "social rules" or "communication protocols" for the different parts of your software system. They help objects talk to each other efficiently, manage tasks, and react to changes without getting tangled up in messy, hard-to-maintain code.

For example, if you have a weather station (one object) and many different display screens (other objects) that all need to show the current temperature, a behavioral pattern like "Observer" helps the weather station tell all the screens about temperature changes without needing to know *exactly* what kind of screen they are. Or, if you have a character in a video game that needs to fight, run, or sneak, a pattern like "Strategy" lets you swap out these different behaviors easily without changing the character's core identity.

## 2. Why it matters — real-world applications

Behavioral design patterns are everywhere in modern software, often working behind the scenes to make complex systems manageable, flexible, and robust.

1.  **User Interfaces and Event Handling (Observer, Command, Chain of Responsibility):**
    *   **Actual Product:** Any modern graphical user interface (GUI) framework (e.g., React, Angular, iOS UIKit, Android Jetpack Compose, Java Swing, C# WPF).
    *   **Application:** When you click a button, type in a text box, or drag an item, these actions are "events." The GUI framework often uses the **Observer pattern** to notify various components (observers) that are "listening" for these events. For instance, a button (subject) might notify a controller (observer) when it's clicked. The **Command pattern** can encapsulate these actions, allowing for undo/redo functionality (like in a text editor) or queueing actions. The **Chain of Responsibility pattern** can be used to pass an event up a hierarchy of UI components until one of them handles it (e.g., a click event on a nested component might propagate to its parent if not handled).
    *   **Connection:** In aerospace, cockpit controls often use similar patterns for handling pilot input and updating various display systems, ensuring that a single input can trigger multiple coordinated responses.

2.  **E-commerce and Business Logic (Strategy, State):**
    *   **Actual Company/Product:** Online retailers like Amazon, payment gateways like Stripe.
    *   **Application:** Consider calculating shipping costs or applying discounts on an e-commerce site. Different rules apply based on customer loyalty, shipping destination, product type, or promotional codes. The **Strategy pattern** allows you to encapsulate each discount rule or shipping calculation algorithm into its own class and swap them out dynamically. For example, a "PremiumCustomerDiscountStrategy" might be applied versus a "FirstTimeBuyerDiscountStrategy." Similarly, the **State pattern** can model the lifecycle of an order (e.g., "Pending," "Processing," "Shipped," "Delivered"), where different actions are valid or behave differently depending on the order's current state.
    *   **Connection:** In financial modeling, different algorithms for risk assessment or portfolio optimization can be implemented as strategies. In machine learning, various training algorithms (e.g., gradient descent variants) can be seen as strategies applied to a model.

3.  **Game Development and AI (State, Strategy, Command):**
    *   **Actual Product:** Any complex video game (e.g., Elden Ring, StarCraft II, Grand Theft Auto V).
    *   **Application:** Game characters often have different behaviors based on their current situation. A character might be in an "Idle" state, "Attacking" state, "Running" state, or "Dead" state. The **State pattern** is perfect for this, allowing the character object to change its behavior (e.g., what happens when it takes damage) dynamically based on its internal state. AI opponents might use the **Strategy pattern** to choose between different tactical approaches (e.g., "AggressiveStrategy," "DefensiveStrategy," "FlankingStrategy") based on game conditions. The **Command pattern** can be used for player inputs, allowing for replay of actions or complex macro systems.
    *   **Connection:** Robotics control systems often use state machines (similar to the State pattern) to manage robot behaviors and transitions between them (e.g., "Moving," "Gripping," "Charging").

4.  **Logging, Auditing, and System Monitoring (Observer, Memento):**
    *   **Actual Phenomenon:** Enterprise logging systems, database transaction logs, system health dashboards.
    *   **Application:** When critical events occur in a system (e.g., a user logs in, a transaction fails, a sensor reading exceeds a threshold), multiple monitoring components might need to be informed. The **Observer pattern** allows these components to subscribe to relevant events and react accordingly without the core system needing to know about all its monitors. The **Memento pattern** can be used to save the internal state of an object (like a complex transaction or a critical system configuration) at a particular point in time, allowing it to be restored later if something goes wrong, crucial for auditing or crash recovery.
    *   **Connection:** In physics simulations, saving the state of a simulation at various checkpoints to allow for rollback or analysis is a direct application of the Memento pattern.

## 3. Prerequisites — what you must know first

Before diving deep into behavioral design patterns, a solid understanding of fundamental Object-Oriented Programming (OOP) concepts is absolutely critical. These patterns are built upon these principles.

*   **Classes and Objects:** The basic building blocks of OOP. A `class` is a blueprint, and an `object` is an instance of that blueprint.
*   **Encapsulation:** The principle of bundling data (attributes) and methods (functions) that operate on the data within a single unit (a class), and restricting direct access to some of the object's components. This hides the internal workings.
*   **Inheritance:** A mechanism where a new class (subclass/derived class) is created from an existing class (superclass/base class), inheriting its attributes and methods. This promotes code reuse.
*   **Polymorphism:** The ability of an object to take on many forms. In OOP, this often means that objects of different classes can be treated as objects of a common superclass or interface, and a single method call can produce different results depending on the actual type of the object.
*   **Abstraction (Abstract Classes and Interfaces):**
    *   **Abstract Class:** A class that cannot be instantiated on its own and may contain abstract methods (methods declared but not implemented). It serves as a blueprint for other classes.
    *   **Interface:** A contract that defines a set of methods that a class must implement. It specifies *what* a class should do, not *how*.
*   **Delegation:** The act of an object passing responsibility for a particular task to another object. Instead of doing the work itself, it asks another object to do it.
*   **Loose Coupling:** A design principle where components or modules are designed to be largely independent of each other. Changes in one module have minimal impact on others.
*   **High Cohesion:** A design principle where the elements within a module (e.g., a class) belong together and are functionally related, focusing on a single, well-defined responsibility.

If any of these terms are unclear, pause here and review them thoroughly. Without them, understanding design patterns will be like trying to read a complex novel without knowing the alphabet.

## 4. The core idea — step by step

Let's walk through two fundamental behavioral patterns: **Observer** and **Strategy**. These patterns illustrate different aspects of object interaction and responsibility distribution.

### Understanding the Observer Pattern

The Observer pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

#### ### Step 1: The Problem (Tight Coupling)

*   **Plain English Statement:** Imagine you have a central "information provider" (like a news agency) and many "information consumers" (like individual newspapers, TV stations, and radio stations). If the news agency directly calls each consumer by name every time there's a new story, it becomes a problem. If a new TV station opens, the news agency's code needs to be changed. If a newspaper closes, its name needs to be removed. This direct, explicit connection makes the news agency rigid and hard to manage.
*   **Small Concrete Example:**
    ```
    class StockMarket {
        private double googlePrice;
        private UserInterface ui; // Directly coupled
        private Logger logger;   // Directly coupled

        public void setGooglePrice(double price) {
            this.googlePrice = price;
            ui.updateStockDisplay(price); // Direct call
            logger.logPriceChange(price); // Direct call
        }
    }
    ```
    Here, `StockMarket` explicitly knows about `UserInterface` and `Logger`.
*   **Formal/Mathematical Version:**
    Let $S$ be a *Subject* object (the information provider) and $O_1, O_2, \dots, O_n$ be *Observer* objects (the information consumers). Without the pattern, $S$ contains direct references to $O_i$ and invokes methods on them:
    $$ S \implies O_1, S \implies O_2, \dots, S \implies O_n $$
    This creates a direct, inflexible dependency where $S$ is tightly coupled to concrete $O_i$ types.
*   **What could go wrong:** Adding a new type of display or logging mechanism requires modifying the `StockMarket` class. Removing one also requires modification. This violates the Open/Closed Principle (software entities should be open for extension, but closed for modification).

#### ### Step 2: Introduce an Interface (The Contract)

*   **Plain English Statement:** Instead of the news agency knowing *specific* consumers, let's establish a general "contract" for anyone who wants to receive news. This contract says: "If you want news, you must be able to receive an update." Similarly, the news agency will have a contract saying: "I can let people sign up, unsubscribe, and I can broadcast news."
*   **Small Concrete Example:**
    ```java
    // The contract for anyone who wants to receive updates
    interface Observer {
        void update(double data);
    }

    // The contract for anything that can be observed
    interface Subject {
        void attach(Observer o);
        void detach(Observer o);
        void notifyObservers();
    }
    ```
*   **Formal/Mathematical Version:**
    Define an `Observer` interface $I_O$ with an `update` method:
    $$ I_O = \{ \text{update}(\text{data}) \} $$
    Define a `Subject` interface $I_S$ with `attach`, `detach`, and `notify` methods:
    $$ I_S = \{ \text{attach}(O), \text{detach}(O), \text{notify}() \mid O \in I_O \} $$
*   **What could go wrong:** If the `update` method's signature is too specific, it might not be flexible enough for all observers. If it's too generic, observers might need to query the subject for specific data, leading to a "pull" model instead of "push."

#### ### Step 3: Decouple Publisher and Subscriber

*   **Plain English Statement:** Now, the news agency (Subject) doesn't know *who* specifically is signed up, only that *some generic "news receivers"* (Observers) are on its mailing list. When there's a new story, it simply goes through its list and tells each one, "Hey, here's an update!" Each receiver then knows how to process that update for itself.
*   **Small Concrete Example:**
    ```java
    class StockMarket implements Subject {
        private List<Observer> observers = new ArrayList<>(); // List of generic Observers
        private double googlePrice;

        @Override
        public void attach(Observer o) {
            observers.add(o);
        }

        @Override
        public void detach(Observer o) {
            observers.remove(o);
        }

        @Override
        public void notifyObservers() {
            for (Observer o : observers) {
                o.update(googlePrice); // Calls generic update() method
            }
        }

        public void setGooglePrice(double price) {
            this.googlePrice = price;
            notifyObservers(); // Broadcasts the change
        }
    }

    class UserInterfaceDisplay implements Observer {
        @Override
        public void update(double price) {
            System.out.println("UI: Google price updated to " + price);
        }
    }

    class PriceLogger implements Observer {
        @Override
        public void update(double price) {
            System.out.println("LOG: Price change detected: " + price);
        }
    }
    ```
    Now, `StockMarket` only depends on the `Observer` interface, not specific `UserInterfaceDisplay` or `PriceLogger` classes.
*   **Formal/Mathematical Version:**
    A concrete `Subject` $C_S$ maintains a collection $L_O$ of references to $I_O$. When its state changes, $C_S.\text{notifyObservers}()$ iterates through $L_O$ and invokes $o.\text{update}(\text{data})$ for each $o \in L_O$. Concrete `Observer` classes $C_{O_A}, C_{O_B}, \dots$ implement $I_O$.
    $$ C_S \text{ holds } L_O = \{O_1, O_2, \dots, O_n\} \text{ where } O_i \in I_O $$
    $$ \text{When state changes in } C_S \implies \forall o \in L_O: o.\text{update}(\text{data}) $$
*   **What could go wrong:** If there are too many observers, `notifyObservers()` can become a performance bottleneck. If observers perform complex operations in their `update` method, it can slow down the subject.

#### ### Step 4: Advantages

*   **Plain English Statement:** The biggest win is flexibility. You can add new types of news receivers (e.g., a mobile app, a smart speaker) without ever touching the news agency's code. You just need to make sure the new receiver implements the "news receiver contract" and signs up. This makes the system much easier to extend and maintain.
*   **Small Concrete Example:**
    ```java
    // In main:
    StockMarket stock = new StockMarket();
    UserInterfaceDisplay ui = new UserInterfaceDisplay();
    PriceLogger logger = new PriceLogger();
    MobileAppDisplay mobileApp = new MobileAppDisplay(); // New observer

    stock.attach(ui);
    stock.attach(logger);
    stock.attach(mobileApp); // Added easily without changing StockMarket

    stock.setGooglePrice(1500.00);
    // Output shows all three observers updated.
    ```
*   **Formal/Mathematical Version:**
    The `Subject` is loosely coupled from its `Observers`. It depends only on the `Observer` interface, not concrete `Observer` implementations. This promotes the Open/Closed Principle.
    $$ C_S \text{ depends on } I_O \text{ (interface), not concrete } C_O \text{ (classes). } $$
*   **What could go wrong:** Managing observer subscriptions can become complex in large systems, potentially leading to memory leaks if observers aren't properly detached.

### Understanding the Strategy Pattern

The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it.

#### ### Step 1: The Problem (Conditional Logic)

*   **Plain English Statement:** Imagine you have a task to do, like sorting a list of numbers. There are many ways to sort (bubble sort, quicksort, merge sort, etc.). If your code has a big `if-else if-else` statement to choose which sorting method to use based on a setting, it becomes a mess. Adding a new sorting method means modifying that big `if-else` block, which is error-prone and tedious.
*   **Small Concrete Example:**
    ```java
    class ShoppingCart {
        private List<Item> items;
        private String discountType; // e.g., "percentage", "fixed", "none"

        public double calculateTotal() {
            double total = items.stream().mapToDouble(Item::getPrice).sum();

            if ("percentage".equals(discountType)) {
                return total * 0.90; // 10% discount
            } else if ("fixed".equals(discountType)) {
                return total - 20.00; // $20 discount
            } else if ("none".equals(discountType)) {
                return total;
            }
            // What if a new discount type like "buyOneGetOne" comes along?
            // This method needs to be modified.
            return total;
        }
    }
    ```
    The `calculateTotal` method is cluttered with conditional logic for different discount types.
*   **Formal/Mathematical Version:**
    A client object $C$ contains conditional logic to select and execute an algorithm $A_i$ from a family of algorithms $\{A_1, A_2, \dots, A_n\}$:
    $$ C.\text{executeTask}() \implies \text{if}(\text{condition}_1) \text{ then } A_1() \text{ else if } (\text{condition}_2) \text{ then } A_2() \dots $$
*   **What could go wrong:** The `if-else` block becomes very large and hard to manage as more algorithms are added. It violates the Open/Closed Principle. The client object has too many responsibilities (calculating the total *and* knowing how to apply different discounts).

#### ### Step 2: Define a Strategy Interface

*   **Plain English Statement:** Let's create a common "how-to" guide or contract for *any* method of sorting numbers, or *any* method of calculating a discount. This contract simply says: "If you are a discount calculator, you must be able to calculate a final price given a base price."
*   **Small Concrete Example:**
    ```java
    // The contract for any discount calculation method
    interface DiscountStrategy {
        double applyDiscount(double total);
    }
    ```
*   **Formal/Mathematical Version:**
    Define a `Strategy` interface $I_{Strat}$ with a common method, e.g., `execute`:
    $$ I_{Strat} = \{ \text{applyDiscount}(\text{total}) \} $$
*   **What could go wrong:** If the interface method signature is too specific, it might not accommodate all potential strategies. If it's too generic, concrete strategies might require too much context from the client.

#### ### Step 3: Implement Concrete Strategies

*   **Plain English Statement:** Now, each specific way of doing the task (each sorting algorithm, each discount type) becomes its own separate, specialized piece of code. Each of these pieces of code follows the common "how-to" guide (the interface).
*   **Small Concrete Example:**
    ```java
    class PercentageDiscount implements DiscountStrategy {
        private double percentage;
        public PercentageDiscount(double percentage) { this.percentage = percentage; }
        @Override
        public double applyDiscount(double total) {
            return total * (1 - percentage); // e.g., 0.10 for 10%
        }
    }

    class FixedDiscount implements DiscountStrategy {
        private double fixedAmount;
        public FixedDiscount(double fixedAmount) { this.fixedAmount = fixedAmount; }
        @Override
        public double applyDiscount(double total) {
            return total - fixedAmount;
        }
    }

    class NoDiscount implements DiscountStrategy {
        @Override
        public double applyDiscount(double total) {
            return total;
        }
    }
    ```
*   **Formal/Mathematical Version:**
    Concrete `Strategy` classes $C_{StratA}, C_{StratB}, \dots$ implement $I_{Strat}$. Each concrete strategy provides its own implementation of the `execute` method.
    $$ C_{StratA} \text{ implements } I_{Strat} \implies C_{StratA}.\text{applyDiscount}(\text{total}) = \text{logic for strategy A} $$
    $$ C_{StratB} \text{ implements } I_{Strat} \implies C_{StratB}.\text{applyDiscount}(\text{total}) = \text{logic for strategy B} $$
*   **What could go wrong:** Strategies might become too complex if they try to do too much. They should ideally focus on a single algorithm.

#### ### Step 4: Create a Context

*   **Plain English Statement:** The "client" (our `ShoppingCart`) that needs the task done no longer contains the `if-else` logic. Instead, it holds a reference to *whichever* specific "how-to" guide (strategy object) it needs at the moment. When it's time to do the task, it simply tells *that strategy object* to do it. The client doesn't care *how* the strategy does it, only that it *can* do it.
*   **Small Concrete Example:**
    ```java
    class ShoppingCart {
        private List<Item> items;
        private DiscountStrategy discountStrategy; // Holds a generic strategy

        public ShoppingCart(DiscountStrategy strategy) {
            this.items = new ArrayList<>();
            this.discountStrategy = strategy; // Set initial strategy
        }

        public void addItem(Item item) {
            items.add(item);
        }

        public void setDiscountStrategy(DiscountStrategy strategy) { // Can change dynamically
            this.discountStrategy = strategy;
        }

        public double calculateTotal() {
            double baseTotal = items.stream().mapToDouble(Item::getPrice).sum();
            return discountStrategy.applyDiscount(baseTotal); // Delegates to the strategy
        }
    }
    ```
*   **Formal/Mathematical Version:**
    A `Context` class $C_{Ctx}$ holds a reference to an instance of $I_{Strat}$. It delegates the algorithm execution to its currently configured strategy:
    $$ C_{Ctx}.\text{calculateTotal}() \implies C_{Ctx}.\text{discountStrategy}.\text{applyDiscount}(\text{baseTotal}) $$
    The strategy can be set dynamically (e.g., via a constructor or setter method).
*   **What could go wrong:** The Context might need to pass a lot of data to the strategy if the strategy doesn't have access to the necessary information. This can make method signatures long.

#### ### Step 5: Advantages

*   **Plain English Statement:** Now, if a new discount type (e.g., "Buy One Get One Free") comes along, you simply create a new class for it that implements the `DiscountStrategy` interface. You don't need to touch the `ShoppingCart` class at all! This makes your code much more flexible, extensible, and easier to test because each strategy is a separate, self-contained unit.
*   **Small Concrete Example:**
    ```java
    // In main:
    ShoppingCart cart = new ShoppingCart(new NoDiscount()); // Start with no discount
    cart.addItem(new Item("Laptop", 1200.00));
    cart.addItem(new Item("Mouse", 25.00));
    System.out.println("Total with no discount: " + cart.calculateTotal()); // 1225.0

    cart.setDiscountStrategy(new PercentageDiscount(0.10)); // Change strategy
    System.out.println("Total with 10% discount: " + cart.calculateTotal()); // 1102.5

    cart.setDiscountStrategy(new FixedDiscount(50.00)); // Change again
    System.out.println("Total with $50 discount: " + cart.calculateTotal()); // 1175.0
    ```
*   **Formal/Mathematical Version:**
    The `Context` is decoupled from concrete `Strategy` implementations. New strategies can be added without modifying the `Context`, satisfying the Open/Closed Principle. It also promotes high cohesion by separating the algorithm implementation from its usage.
    $$ C_{Ctx} \text{ depends on } I_{Strat} \text{ (interface), not concrete } C_{Strat} \text{ (classes). } $$
*   **What could go wrong:** Introducing a new class for every minor variation of an algorithm can lead to a proliferation of classes, sometimes making the system seem more complex than necessary for very simple cases.

## 5. Worked examples — multiple, with every step shown

Here are several fully worked examples demonstrating different behavioral patterns.

### Example 1 (Easy): Observer - Simple Stock Price Tracker

**Problem:** We want to build a system where a `Stock` object can notify multiple `Display` objects whenever its price changes. Each `Display` should update itself with the new price.

**Given:**
*   A `Stock` class that holds a price.
*   Multiple `Display` instances that need to show the price.

**What we want:**
*   When `Stock.setPrice()` is called, all registered `Display` objects automatically receive the new price and print it.
*   The `Stock` class should not need to know the concrete types of `Display` objects.

**Solution Steps:**

1.  **Define `Subject` and `Observer` interfaces.** This establishes the contract.
    ```java
    // 1. Observer Interface: Defines the update method for observers
    interface StockObserver {
        void update(String stockSymbol, double price);
    }

    // 2. Subject Interface: Defines methods for attaching, detaching, and notifying observers
    interface StockSubject {
        void attach(StockObserver observer);
        void detach(StockObserver observer);
        void notifyObservers();
    }
    ```
    *Explanation:* We create `StockObserver` for anything that wants to *observe* a stock, and `StockSubject` for anything that *can be observed*. The `update` method is how the subject will push data to its observers. The `attach`/`detach` methods are for managing the list of observers, and `notifyObservers` is how the subject will broadcast changes.

2.  **Implement the `Stock` class as a `StockSubject`.** It will maintain a list of `StockObserver`s.
    ```java
    import java.util.ArrayList;
    import java.util.List;

    // 3. Concrete Subject: The Stock class
    class Stock implements StockSubject {
        private String symbol;
        private double price;
        private List<StockObserver> observers; // Holds a list of generic observers

        public Stock(String symbol, double price) {
            this.symbol = symbol;
            this.price = price;
            this.observers = new ArrayList<>();
        }

        public String getSymbol() {
            return symbol;
        }

        public double getPrice() {
            return price;
        }

        public void setPrice(double newPrice) {
            // Only update and notify if the price actually changed
            if (this.price != newPrice) {
                this.price = newPrice;
                notifyObservers(); // Notify all attached observers
            }
        }

        @Override
        public void attach(StockObserver observer) {
            observers.add(observer);
            System.out.println(observer.getClass().getSimpleName() + " attached to " + symbol);
        }

        @Override
        public void detach(StockObserver observer) {
            observers.remove(observer);
            System.out.println(observer.getClass().getSimpleName() + " detached from " + symbol);
        }

        @Override
        public void notifyObservers() {
            System.out.println("\n--- Notifying observers for " + symbol + " ---");
            for (StockObserver observer : observers) {
                observer.update(symbol, price); // Call update on each observer
            }
        }
    }
    ```
    *Explanation:* The `Stock` class now implements `StockSubject`. It has a `List` of `StockObserver` references. When `setPrice` is called, it updates its internal state and then calls `notifyObservers()`, which iterates through its list and calls `update()` on each registered observer, passing the stock symbol and new price.

3.  **Implement concrete `StockObserver` classes.**
    ```java
    // 4. Concrete Observer: A simple console display
    class ConsoleDisplay implements StockObserver {
        private String name;

        public ConsoleDisplay(String name) {
            this.name = name;
        }

        @Override
        public void update(String stockSymbol, double price) {
            System.out.println(name + " (Console): " + stockSymbol + " is now $" + String.format("%.2f", price));
        }
    }

    // 5. Concrete Observer: Another type of display, maybe for a GUI widget
    class GuiWidgetDisplay implements StockObserver {
        private String widgetId;

        public GuiWidgetDisplay(String widgetId) {
            this.widgetId = widgetId;
        }

        @Override
        public void update(String stockSymbol, double price) {
            System.out.println(widgetId + " (GUI Widget): Displaying " + stockSymbol + " price: $" + String.format("%.2f", price));
        }
    }
    ```
    *Explanation:* `ConsoleDisplay` and `GuiWidgetDisplay` both implement `StockObserver`, so they both have an `update` method. Each can react to the price change in its own specific way.

4.  **Client code to demonstrate the interaction.**
    ```java
    public class StockTrackerDemo {
        public static void main(String[] args) {
            // Create a stock (subject)
            Stock googleStock = new Stock("GOOG", 1500.00);

            // Create observers
            StockObserver display1 = new ConsoleDisplay("MyStockApp");
            StockObserver display2 = new GuiWidgetDisplay("TopGainersWidget");
            StockObserver display3 = new ConsoleDisplay("PortfolioMonitor"); // New observer

            // Attach observers to the subject
            googleStock.attach(display1);
            googleStock.attach(display2);
            googleStock.attach(display3);

            // Simulate price changes
            System.out.println("\n--- Simulating price changes ---");
            googleStock.setPrice(1505.50); // This will notify all observers
            googleStock.setPrice(1505.50); // No change, no notification
            googleStock.setPrice(1510.20); // Another change, notify again

            // Detach an observer
            System.out.println("\n--- Detaching an observer ---");
            googleStock.detach(display2);

            // Simulate another price change
            googleStock.setPrice(1512.00); // Only remaining observers will be notified
        }
    }
    ```
    *Explanation:* The `main` method sets up the `Stock` and multiple `Display` objects. It then attaches them. When `setPrice` is called on `googleStock`, all attached displays are updated automatically. When `display2` is detached, it no longer receives updates. The `Stock` object never needed to know the specific types of `ConsoleDisplay` or `GuiWidgetDisplay`.

**Output:**
```
ConsoleDisplay attached to GOOG
GuiWidgetDisplay attached to GOOG
PortfolioMonitor attached to GOOG

--- Simulating price changes ---

--- Notifying observers for GOOG ---
MyStockApp (Console): GOOG is now $1505.50
TopGainersWidget (GUI Widget): Displaying GOOG price: $1505.50
PortfolioMonitor (Console): GOOG is now $1505.50

--- Notifying observers for GOOG ---
MyStockApp (Console): GOOG is now $1510.20
TopGainersWidget (GUI Widget): Displaying GOOG price: $1510.20
PortfolioMonitor (Console): GOOG is now $1510.20

--- Detaching an observer ---
GuiWidgetDisplay detached from GOOG

--- Simulating another price change ---

--- Notifying observers for GOOG ---
MyStockApp (Console): GOOG is now $1512.00
PortfolioMonitor (Console): GOOG is now $1512.00
```
**Reflection:** This example demonstrates the core of the Observer pattern: loose coupling between the subject (stock) and its observers (displays). The `Stock` class doesn't need to know concrete observer types, making it easy to add new display types without modifying `Stock`. The trickiest part is often ensuring proper `attach` and `detach` logic to prevent memory leaks or unexpected behavior.

### Example 2 (Medium): Strategy - Payment Processing

**Problem:** An e-commerce system needs to process payments using different methods (e.g., Credit Card, PayPal, Bitcoin). The payment processing logic should be interchangeable without modifying the core `Order` or `PaymentProcessor` classes.

**Given:**
*   An `Order` class with a total amount.
*   Various payment methods, each with slightly different processing steps.

**What we want:**
*   A `PaymentProcessor` that can accept an `Order` and process it using a dynamically chosen payment strategy.
*   Adding new payment methods should not require changes to `PaymentProcessor`.

**Solution Steps:**

1.  **Define the `PaymentStrategy` interface.**
    ```java
    // 1. Strategy Interface: Defines the common method for all payment strategies
    interface PaymentStrategy {
        boolean pay(double amount);
    }
    ```
    *Explanation:* This interface establishes the contract. Any class that wants to be a payment method must implement `pay(double amount)`. It returns `boolean` to indicate success or failure.

2.  **Implement concrete `PaymentStrategy` classes.**
    ```java
    // 2. Concrete Strategy: Credit Card Payment
    class CreditCardPayment implements PaymentStrategy {
        private String cardNumber;
        private String name;

        public CreditCardPayment(String cardNumber, String name) {
            this.cardNumber = cardNumber;
            this.name = name;
        }

        @Override
        public boolean pay(double amount) {
            System.out.println("Processing credit card payment for $" + String.format("%.2f", amount) +
                               " using card " + cardNumber + " (Name: " + name + ")");
            // Simulate payment gateway interaction
            if (amount > 0 && Math.random() > 0.1) { // 90% chance of success
                System.out.println("Credit Card payment successful.");
                return true;
            } else {
                System.out.println("Credit Card payment failed.");
                return false;
            }
        }
    }

    // 3. Concrete Strategy: PayPal Payment
    class PayPalPayment implements PaymentStrategy {
        private String email;

        public PayPalPayment(String email) {
            this.email = email;
        }

        @Override
        public boolean pay(double amount) {
            System.out.println("Processing PayPal payment for $" + String.format("%.2f", amount) +
                               " using email " + email);
            // Simulate PayPal API interaction
            if (amount > 0 && Math.random() > 0.05) { // 95% chance of success
                System.out.println("PayPal payment successful.");
                return true;
            } else {
                System.out.println("PayPal payment failed.");
                return false;
            }
        }
    }

    // 4. Concrete Strategy: Bitcoin Payment
    class BitcoinPayment implements PaymentStrategy {
        private String walletAddress;

        public BitcoinPayment(String walletAddress) {
            this.walletAddress = walletAddress;
        }

        @Override
        public boolean pay(double amount) {
            System.out.println("Processing Bitcoin payment for $" + String.format("%.2f", amount) +
                               " to wallet " + walletAddress);
            // Simulate Bitcoin blockchain transaction
            if (amount > 0 && Math.random() > 0.2) { // 80% chance of success
                System.out.println("Bitcoin payment initiated (requires confirmation).");
                return true;
            } else {
                System.out.println("Bitcoin payment failed.");
                return false;
            }
        }
    }
    ```
    *Explanation:* Each payment method (Credit Card, PayPal, Bitcoin) gets its own class. Each class implements the `PaymentStrategy` interface and provides its unique `pay` method, encapsulating its specific logic and data (card number, email, wallet address).

3.  **Create the `Order` class (Context).** This class will hold a reference to the chosen `PaymentStrategy`.
    ```java
    // 5. Context: The Order class that uses a PaymentStrategy
    class Order {
        private double totalAmount;
        private PaymentStrategy paymentStrategy; // Holds a generic PaymentStrategy

        public Order(double totalAmount) {
            this.totalAmount = totalAmount;
        }

        // Method to dynamically set or change the payment strategy
        public void setPaymentStrategy(PaymentStrategy strategy) {
            this.paymentStrategy = strategy;
            System.out.println("Payment strategy set to: " + strategy.getClass().getSimpleName());
        }

        public boolean processPayment() {
            if (paymentStrategy == null) {
                System.err.println("Error: No payment strategy set for the order.");
                return false;
            }
            System.out.println("\nAttempting to process order for $" + String.format("%.2f", totalAmount));
            // Delegate the payment processing to the current strategy
            return paymentStrategy.pay(totalAmount);
        }
    }
    ```
    *Explanation:* The `Order` class is the "context." It doesn't know *how* payments are processed, only that it has a `PaymentStrategy` object that *can* process payments. The `setPaymentStrategy` method allows the payment method to be changed dynamically at runtime. `processPayment` simply delegates the actual payment logic to the currently selected strategy.

4.  **Client code to demonstrate different payment scenarios.**
    ```java
    public class PaymentProcessorDemo {
        public static void main(String[] args) {
            // Create an order
            Order order1 = new Order(120.75);

            // Pay with Credit Card
            order1.setPaymentStrategy(new CreditCardPayment("1234-5678-9012-3456", "John Doe"));
            boolean success1 = order1.processPayment();
            System.out.println("Order 1 payment status: " + (success1 ? "SUCCESS" : "FAILED"));

            // Create another order
            Order order2 = new Order(50.00);

            // Pay with PayPal
            order2.setPaymentStrategy(new PayPalPayment("jane.doe@example.com"));
            boolean success2 = order2.processPayment();
            System.out.println("Order 2 payment status: " + (success2 ? "SUCCESS" : "FAILED"));

            // Create a third order
            Order order3 = new Order(2500.00);

            // Pay with Bitcoin
            order3.setPaymentStrategy(new BitcoinPayment("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"));
            boolean success3 = order3.processPayment();
            System.out.println("Order 3 payment status: " + (success3 ? "SUCCESS" : "FAILED"));

            // Demonstrate changing strategy for the same order (less common for payment, but possible)
            System.out.println("\n--- Changing strategy for an order ---");
            Order order4 = new Order(75.00);
            order4.setPaymentStrategy(new NoPaymentStrategy()); // A strategy that always fails
            order4.processPayment(); // This will fail
            order4.setPaymentStrategy(new CreditCardPayment("9876-5432-1098-7654", "Alice Smith"));
            order4.processPayment(); // This might succeed

        }
    }

    // Helper: A strategy for demonstration that always fails or does nothing
    class NoPaymentStrategy implements PaymentStrategy {
        @Override
        public boolean pay(double amount) {
            System.out.println("No payment strategy selected, payment cannot proceed.");
            return false;
        }
    }
    ```
    *Explanation:* The `main` method creates `Order` objects and then dynamically assigns different `PaymentStrategy` implementations to them. When `processPayment()` is called, the `Order` object delegates to its current strategy. Adding a new payment method (e.g., "Google Pay") would only require creating a new `GooglePayStrategy` class implementing `PaymentStrategy`, without touching `Order` or `PaymentProcessorDemo`.

**Output (will vary slightly due to `Math.random()`):**
```
Payment strategy set to: CreditCardPayment

Attempting to process order for $120.75
Processing credit card payment for $120.75 using card 1234-5678-9012-3456 (Name: John Doe)
Credit Card payment successful.
Order 1 payment status: SUCCESS
Payment strategy set to: PayPalPayment

Attempting to process order for $50.00
Processing PayPal payment for $50.00 using email jane.doe@example.com
PayPal payment successful.
Order 2 payment status: SUCCESS
Payment strategy set to: BitcoinPayment

Attempting to process order for $2500.00
Processing Bitcoin payment for $2500.00 to wallet 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
Bitcoin payment initiated (requires confirmation).
Order 3 payment status: SUCCESS

--- Changing strategy for an order ---
Payment strategy set to: NoPaymentStrategy

Attempting to process order for $75.00
No payment strategy selected, payment cannot proceed.
Order 4 payment status: FAILED
Payment strategy set to: CreditCardPayment

Attempting to process order for $75.00
Processing credit card payment for $75.00 using card 9876-5432-1098-7654 (Name: Alice Smith)
Credit Card payment successful.
Order 4 payment status: SUCCESS
```
**Reflection:** The Strategy pattern successfully decouples the `Order` (context) from the specific payment processing algorithms. This makes the system highly flexible and extensible. A common trap here is creating a "God Context" that tries to manage too much logic itself, or strategies that are too tightly coupled to the context's internal state. The key is that the context *uses* the strategy, but the strategy encapsulates the *how*.

### Example 3 (Harder): Command - Text Editor Undo/Redo

**Problem:** Implement basic undo/redo functionality for a simple text editor. The editor can append characters and delete the last character.

**Given:**
*   A `TextEditor` that holds a `StringBuilder` for its content.
*   Operations like `append` and `deleteLast`.

**What we want:**
*   Be able to `undo` the last performed operation.
*   Be able to `redo` an undone operation.
*   The `TextEditor` itself should not be cluttered with undo/redo logic.

**Solution Steps:**

1.  **Define the `Command` interface.**
    ```java
    // 1. Command Interface: Defines the contract for all commands
    interface Command {
        void execute(); // Perform the action
        void undo();    // Revert the action
    }
    ```
    *Explanation:* This interface is crucial. Every action that can be undone must implement `execute()` (to do the action) and `undo()` (to reverse it).

2.  **Create the `TextEditor` (Receiver).** This is the object that actually performs the operations.
    ```java
    // 2. Receiver: The object that knows how to perform the actual operations
    class TextEditor {
        private StringBuilder content;

        public TextEditor() {
            this.content = new StringBuilder();
        }

        public void append(char c) {
            content.append(c);
            System.out.println("Appended '" + c + "'. Current content: '" + content + "'");
        }

        public void deleteLast() {
            if (content.length() > 0) {
                char deletedChar = content.charAt(content.length() - 1);
                content.deleteCharAt(content.length() - 1);
                System.out.println("Deleted '" + deletedChar + "'. Current content: '" + content + "'");
            } else {
                System.out.println("Cannot delete, content is empty.");
            }
        }

        public String getContent() {
            return content.toString();
        }

        // Helper for undo/redo to set content directly (used by commands)
        public void setContent(String newContent) {
            this.content.setLength(0); // Clear current content
            this.content.append(newContent); // Set new content
            System.out.println("Content set to: '" + content + "'");
        }
    }
    ```
    *Explanation:* `TextEditor` is the receiver. It has the actual logic for `append` and `deleteLast`. Notice it also has a `setContent` helper, which will be useful for commands to restore previous states.

3.  **Implement concrete `Command` classes.** Each command will encapsulate an operation and its reversal.
    ```java
    // 3. Concrete Command: Appending a character
    class AppendCharCommand implements Command {
        private TextEditor editor;
        private char charToAppend;
        private String previousContent; // Memento-like: store state needed for undo

        public AppendCharCommand(TextEditor editor, char charToAppend) {
            this.editor = editor;
            this.charToAppend = charToAppend;
        }

        @Override
        public void execute() {
            previousContent = editor.getContent(); // Save state before executing
            editor.append(charToAppend);
        }

        @Override
        public void undo() {
            editor.setContent(previousContent); // Restore previous state
            System.out.println("Undo: Appended '" + charToAppend + "'");
        }
    }

    // 4. Concrete Command: Deleting the last character
    class DeleteLastCharCommand implements Command {
        private TextEditor editor;
        private char deletedChar; // Store the character that was deleted
        private String previousContent; // Memento-like: store state needed for undo

        public DeleteLastCharCommand(TextEditor editor) {
            this.editor = editor;
        }

        @Override
        public void execute() {
            previousContent = editor.getContent(); // Save state before executing
            if (previousContent.length() > 0) {
                deletedChar = previousContent.charAt(previousContent.length() - 1); // Store the char to be deleted
                editor.deleteLast();
            } else {
                System.out.println("Cannot delete, content is empty. Command did nothing.");
                deletedChar = '\0'; // Indicate no char was deleted
            }
        }

        @Override
        public void undo() {
            if (deletedChar != '\0') { // Only undo if something was actually deleted
                editor.setContent(previousContent); // Restore previous state
                System.out.println("Undo: Deleted '" + deletedChar + "'");
            } else {
                System.out.println("Undo: DeleteLastCharCommand did nothing, no undo needed.");
            }
        }
    }
    ```
    *Explanation:* `AppendCharCommand` and `DeleteLastCharCommand` each encapsulate an action. They both hold a reference to the `TextEditor` (receiver) and store enough information (`previousContent`, `deletedChar`) to reverse their action in the `undo()` method. This storage of state for undo is a common characteristic of the Command pattern, sometimes leveraging the Memento pattern implicitly.

4.  **Create an `Invoker` (e.g., `TextEditorInvoker`) and `HistoryManager`.** The invoker will trigger commands, and the history manager will manage the undo/redo stacks.
    ```java
    import java.util.Stack;

    // 5. Invoker and History Manager: Manages the execution and history of commands
    class TextEditorInvoker {
        private Stack<Command> undoStack = new Stack<>();
        private Stack<Command> redoStack = new Stack<>();
        private TextEditor editor; // The receiver

        public TextEditorInvoker(TextEditor editor) {
            this.editor = editor;
        }

        public void executeCommand(Command command) {
            command.execute(); // Execute the command
            undoStack.push(command); // Add to undo history
            redoStack.clear();       // Clear redo history on new action
            System.out.println("Command executed. Undo stack size: " + undoStack.size());
        }

        public void undo() {
            if (!undoStack.isEmpty()) {
                Command command = undoStack.pop(); // Get the last command
                command.undo();                    // Undo it
                redoStack.push(command);           // Add to redo history
                System.out.println("Undo performed. Undo stack size: " + undoStack.size() + ", Redo stack size: " + redoStack.size());
            } else {
                System.out.println("Nothing to undo.");
            }
        }

        public void redo() {
            if (!redoStack.isEmpty()) {
                Command command = redoStack.pop(); // Get the last undone command
                command.execute();                 // Re-execute it
                undoStack.push(command);           // Add back to undo history
                System.out.println("Redo performed. Undo stack size: " + undoStack.size() + ", Redo stack size: " + redoStack.size());
            } else {
                System.out.println("Nothing to redo.");
            }
        }

        public String getCurrentEditorContent() {
            return editor.getContent();
        }
    }
    ```
    *Explanation:* `TextEditorInvoker` is the central control. It has `undoStack` and `redoStack` (stacks are perfect for LIFO behavior). `executeCommand` runs a command and pushes it to `undoStack`. Crucially, any new command clears the `redoStack`. `undo` pops from `undoStack`, calls `undo()` on the command, and pushes it to `redoStack`. `redo` does the reverse.

5.  **Client code to simulate editor actions with undo/redo.**
    ```java
    public class TextEditorDemo {
        public static void main(String[] args) {
            TextEditor editor = new TextEditor();
            TextEditorInvoker invoker = new TextEditorInvoker(editor);

            // Initial state
            System.out.println("Initial content: '" + editor.getContent() + "'");

            // Perform some actions
            invoker.executeCommand(new AppendCharCommand(editor, 'H'));
            invoker.executeCommand(new AppendCharCommand(editor, 'e'));
            invoker.executeCommand(new AppendCharCommand(editor, 'l'));
            invoker.executeCommand(new AppendCharCommand(editor, 'l'));
            invoker.executeCommand(new AppendCharCommand(editor, 'o'));
            System.out.println("Final content after appends: '" + editor.getContent() + "'");

            // Undo operations
            invoker.undo(); // Undo 'o'
            invoker.undo(); // Undo 'l'
            System.out.println("Content after two undos: '" + editor.getContent() + "'");

            // Redo operations
            invoker.redo(); // Redo 'l'
            System.out.