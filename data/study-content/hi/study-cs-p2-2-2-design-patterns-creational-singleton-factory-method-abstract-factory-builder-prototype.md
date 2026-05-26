## 1. The one-sentence answer
**Creational design patterns provide reusable templates that control how objects are instantiated so that creation logic stays decoupled from the classes that use those objects.**

Aap in patterns ko use karte ho jab aapko yeh control karna ho ki ek object kaise banta hai — kitni copies allowed hain, kis subclass ka instance milega, ya complex construction steps ko kaise manage karna hai. Har pattern ek specific problem solve karta hai: Singleton sirf ek hi instance allow karta hai, Factory Method subclass ko decide karta hai kaunsa object banega, Abstract Factory related families ko ek saath create karta hai, Builder step-by-step construction deta hai, aur Prototype existing object ko copy karke naya banata hai.

In sabka core idea yeh hai ki `new` keyword ko directly client code mein mat daalo — uske bajaye ek controlled creation mechanism rakho taaki future changes sirf ek jagah par ho.

> [!NOTE]
> Sabse badi aha moment yeh hai ki creational patterns aapko “creation” aur “usage” ko alag karne dete hain, isliye aap baad mein object creation strategy badal sakte ho bina saare client code ko chhune.

## 2. Why this matters — concrete and current
Google’s Guice aur Spring dependency-injection frameworks internally Abstract Factory aur Singleton patterns ka heavy use karte hain taaki bean creation aur lifecycle management ek jagah centralised rahe.

NASA’s Mars Perseverance rover ke flight software mein Builder pattern ka use hota tha telemetry packet construction ke liye kyunki har packet mein 30+ optional fields the aur unki order aur validation step-by-step honi chahiye thi.

Java ke `java.util.Calendar` class internally Prototype pattern follow karti hai jab aap `clone()` call karte ho existing calendar state ko copy karne ke liye bina constructor logic repeat kiye.

Modern ML training frameworks jaise PyTorch Lightning mein Factory Method pattern use hota hai LightningModule ke different dataloader variants banane ke liye bina trainer class ko modify kiye.

Android Jetpack ViewModelProvider.Factory Abstract Factory ka ek real-world implementation hai jo Activity aur Fragment lifecycle ke hisaab se sahi ViewModel subclass inject karta hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Class vs Object      | Patterns decide kaunsi class ka object kab aur kaise banta hai |
| Inheritance & Polymorphism | Factory aur Abstract Factory subclassing par depend karte hain |
| Interfaces & Abstract classes | Decoupling ke liye client sirf interface se baat karta hai |
| Copy constructor / clone semantics | Prototype pattern deep aur shallow copy par based hai     |

Agar upar ke concepts clear nahi hain to pehle unhe revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the creation problem
Jab client code mein `new` keyword scattered hota hai to har baar class change karne par multiple files edit karni padti hain. Iska solution yeh hai ki creation logic ko ek alag entity mein daal do.

Example: Agar aap `new MySQLConnection()` 50 jagah likh rahe ho aur baad mein PostgreSQL chahiye, to 50 jagah badalna padega.

Formal statement: Creation logic ko encapsulate karne ke liye ek dedicated creator entity introduce karo.

> [!WARNING]
> Agar aap sirf ek hi jagah `new` use kar rahe ho to pattern add karna over-engineering ban jaata hai.

### Step 2 — Choose the right creational pattern
Har pattern ek alag constraint solve karta hai: uniqueness (Singleton), family grouping (Abstract Factory), step-by-step build (Builder), subclass decision (Factory Method), ya cloning (Prototype).

Example: Agar aapko sirf ek database connection chahiye to Singleton; agar multiple related UI themes chahiye to Abstract Factory.

Formal statement: Problem ke constraint (uniqueness, family, steps, subclass, copy) ko identify karke uske hisaab se pattern select karo.

### Step 3 — Define the creator interface or class
Creator client ko actual concrete class se chhupata hai. Client sirf interface ya abstract class dekhta hai.

Example: `ConnectionFactory` interface with method `createConnection()`.

Formal statement: $$Creator \rightarrow create(): Product$$

### Step 4 — Implement concrete creators
Har concrete creator apna specific product return karta hai, lekin client ko yeh pata nahi chalta.

Example: `MySQLConnectionFactory` aur `PostgresConnectionFactory` dono `createConnection()` implement karte hain.

### Step 5 — Client uses only the creator
Client code `new` nahi karta, sirf creator object se maangta hai.

Formal statement: Client depends only on `Creator` interface, not on concrete products.

### Step 6 — Add lifecycle or caching rules (Singleton case)
Singleton mein creator ensure karta hai ki ek hi instance kabhi bhi return ho.

Formal statement: $$Instance = \begin{cases} \text{existing} & \text{if exists} \\ \text{new} & \text{otherwise} \end{cases}$$

### Step 7 — Handle cloning or deep copy (Prototype case)
Prototype creator existing object ko copy karta hai.

Formal statement: $$newObj = prototype.clone()$$

### Step 8 — Ensure all patterns follow “program to interface”
Final textbook-grade rule: har creational pattern ka client sirf abstractions se baat karta hai, concrete classes se nahi.

## 5. Worked examples — har step show karo

**Example 1 — Singleton logger**
*Given:* Ek global logger chahiye jo sirf ek hi baar initialise ho.
*Find:* Correct Singleton implementation.
```java
public class Logger {
    private static Logger instance;
    private Logger() {}
    public static Logger getInstance() {
        if (instance == null) instance = new Logger();
        return instance;
    }
}
```
*Why* first check kiya: kyuki har baar naya object na bane.  
**Final answer:** `Logger.getInstance()` hamesha same object deta hai.

*Reflection:* Thread-safety abhi missing hai, isliye real code mein double-checked locking ya enum use karna padta hai.

**Example 2 — Factory Method for documents**
*Given:* `Document` interface with `PDFDocument` aur `WordDocument` implementations.
*Find:* Factory jo sahi subclass choose kare.
```java
public abstract class DocumentFactory {
    public abstract Document createDocument();
}
public class PDFDocumentFactory extends DocumentFactory {
    public Document createDocument() { return new PDFDocument(); }
}
```
*Why* abstract method use kiya: taaki subclass decide kare kaunsa object banna hai.  
**Final answer:** Client `DocumentFactory f = new PDFDocumentFactory(); Document d = f.createDocument();`

*Reflection:* Naya document type add karne ke liye sirf ek naya factory subclass banana padta hai.

**Example 3 — Abstract Factory for UI themes**
*Given:* `LightButton`/`DarkButton` aur `LightMenu`/`DarkMenu`.
*Find:* Ek factory jo matching pair de.
```java
public interface UIFactory {
    Button createButton();
    Menu createMenu();
}
public class DarkUIFactory implements UIFactory { ... }
```
*Why* dono methods ek interface mein: taaki family consistent rahe.  
**Final answer:** `UIFactory f = new DarkUIFactory();` se dono dark components milte hain.

*Reflection:* Agar family badalni ho to sirf factory object swap karna padta hai.

**Example 4 — Builder for SQL query**
*Given:* Complex query with many optional clauses.
*Find:* Step-by-step construction.
```java
Query q = new QueryBuilder()
    .select("name")
    .from("users")
    .where("age > 18")
    .build();
```
*Why* method chaining use kiya: har step state update karta hai aur final `build()` object deta hai.  
**Final answer:** `Query` object ready without exposing 10+ constructor parameters.

*Reflection:* Builder pattern mutable intermediate state ko hide karta hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Making every class Singleton | “Global access” ki aadat                    | Sirf tab use karo jab uniqueness proven ho   |
| Forgetting thread-safety in Singleton | Single-threaded testing environment         | Enum ya double-checked locking use karo      |
| Abstract Factory returning wrong family | Factory methods mein if-else logic          | Har family ke liye alag concrete factory banao |
| Builder object mutable after build | `build()` ke baad bhi setters expose       | Builder ko immutable banao ya copy return karo |
| Prototype shallow copy causing bugs | Reference fields copy nahi hue             | Deep copy implement karo ya `Cloneable` carefully use karo |
| Factory Method becoming God class | Saare creation logic ek jagah daal diye     | Har product family ke liye alag factory rakho |
| Client still calling `new` inside | Pattern syntax yaad hai lekin intent nahi   | Code review mein `new` keyword search karo   |

## 7. The textbook-precise statement
Gamma et al., *Design Patterns: Elements of Reusable Object-Oriented Software*, 1994, Chapter 3 states: “Creational patterns abstract the instantiation process, making a system independent of how its objects are created, composed, and represented.” All five patterns (Singleton, Factory Method, Abstract Factory, Builder, Prototype) share the intent that clients interact solely with interfaces or abstract classes; concrete classes are chosen and instantiated only inside the creational participant.

## 8. Visual — diagram or schematic
```
Client
  |
  v
Creator (interface)
  |
  +-- ConcreteCreator1 --> ProductA
  +-- ConcreteCreator2 --> ProductB
```
Client sirf `Creator` ko jaanta hai. Actual `new` ConcreteCreator ke andar hota hai.

## 9. The memory technique
1. **The hook** — Socho ek “creation factory” jisme har machine alag product banati hai lekin aap sirf ek button dabate ho.
2. **What to overlearn** — Singleton: private constructor + static instance; Factory Method: abstract `create()` method; Abstract Factory: multiple `createX()` methods returning family.
3. **Spaced-repetition schedule** — 1 din baad, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Agar pattern bhool jaaye to poochho: “Yahan creation kis cheez se tightly coupled hai?” Us coupling ko todne wala pattern hi sahi hai.

## 10. What this unlocks
Yeh patterns aapko SOLID ke Open-Closed Principle ko practically implement karne dete hain. Aage aap easily Dependency Injection, Plugin architectures, aur Domain-Driven Design ke factories samajh paoge.

- Next: Structural patterns (Adapter, Decorator)
- Next: Behavioural patterns (Strategy, Observer)
- Next: Dependency Injection containers

## 11. Self-check — five questions, no answers
1. Agar aapko ek configuration object sirf ek baar load karna hai, kaunsa pattern use karoge aur kyun?
2. Ek naya payment gateway add karne ke liye Abstract Factory mein kitne classes change karne padenge?
3. Builder pattern mein `build()` method ko call karne se pehle agar koi mandatory field missing ho to kya hona chahiye?
4. Prototype pattern shallow copy mein kaunsi field sabse zyada bugs create karti hai?
5. Factory Method aur Abstract Factory mein woh ek difference batao jo code mein clearly dikhe.