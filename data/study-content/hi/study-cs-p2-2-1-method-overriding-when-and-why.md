## 1. The one-sentence answer
**Method overriding** lets a subclass replace the implementation of a method it inherits from its superclass so that the same method call can produce different behaviour depending on the actual object type at runtime.

Aap already jaante ho ki inheritance ek class ko doosri class ke members de deti hai. Override karne ka matlab hai ki subclass usi method ka apna version likh sakta hai. Jab aap superclass type ke variable mein subclass object store karte ho aur method call karte ho, JVM ya runtime environment subclass wala version chunta hai. Iska seedha faayda yeh hai ki aapko har naye subclass ke liye alag-alag if-else blocks nahi likhne padte.

> [!NOTE]
> The real “aha” moment is that overriding is not about changing the method signature; it is about changing only the body while keeping the contract identical so that existing code written against the superclass continues to work without modification.

## 2. Why this matters — concrete and current
In Android’s Activity lifecycle, the base `Activity` class defines `onCreate(Bundle)`. Every app screen overrides this method to set its own layout and initialise views; the framework calls the overridden version without knowing the concrete screen class in advance.

In Spring Framework’s dependency injection container, classes such as `Repository` and `Service` often extend base classes or implement interfaces; developers override methods like `save()` or `findById()` to supply JPA-specific or custom logic while the framework still invokes them through the declared interface type.

In game engines such as Unity’s C# scripting layer, `MonoBehaviour` provides an empty `Update()` method. Every custom player, enemy, or projectile script overrides `Update()` so that the engine’s main loop can call a single `Update()` on millions of components polymorphically each frame.

In the Linux kernel’s device-driver model (written in C but using OOP-like vtables), each hardware driver registers its own implementation of operations such as `open`, `read`, and `ioctl`; the virtual file-system layer calls these overridden functions without any knowledge of the underlying device.

In machine-learning pipelines built with PyTorch, custom `nn.Module` subclasses override the `forward()` method to define unique computation graphs; the training loop only ever calls `model(x)` and the correct subclass behaviour executes.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Inheritance              | Overriding only exists when one class extends another     |
| Polymorphism (runtime)   | The mechanism that selects the overridden method          |
| Method signature         | Must remain identical; any change turns override into overload |
| Access modifiers         | Subclass cannot reduce visibility of the overridden method |

Agar aapko inheritance ya method signature abhi bhi fuzzy lag rahe hain, toh Phase 1 ke inheritance section ko pehle revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Same method name, different body
Aap ek superclass method ko inherit karte ho lekin uska behaviour subclass mein badalna chahte ho.  
Example: `Animal` class mein `makeSound()` print karta hai “Some sound”. `Dog` class usi method ko override karke “Woof” print karegi.  
Formal statement:  
If \(C\) extends \(B\) and \(B\) declares \(m(\textit{params})\), then \(C\) may declare a method with identical signature whose body differs.  
> [!WARNING] Agar signature mein koi bhi difference (return type, parameter order, exception list) aa gaya toh compiler override nahi maanta; woh overload samajh leta hai.

### Step 2 — Reference type vs actual object type
Variable ka type superclass ho sakta hai lekin object subclass ka hota hai. Method call actual object ke type se decide hoti hai.  
Example: `Animal a = new Dog(); a.makeSound();` → “Woof”.  
Formal: Dynamic dispatch selects the most specific implementation reachable from the runtime class of the receiver.

### Step 3 — Contract must stay the same
Return type, parameter list aur checked exceptions ka set exactly match karna zaroori hai (Java 5+ covariant return allowed).  
> [!WARNING] Agar aap access modifier ko stricter kar dete ho (public → protected) toh compile-time error aata hai.

### Step 4 — @Override annotation (optional but recommended)
Annotation compiler ko batata hai ki aap override karna chahte ho. Galti se signature match na ho toh error mil jaata hai.  
Formal: The annotation is metadata; it does not change semantics but enables early detection of signature drift.

### Step 5 — super keyword for extension, not replacement
Aap overridden method ke andar `super.makeSound()` call karke superclass behaviour reuse kar sakte ho.  
Formal: `super.m(...)` resolves to the implementation in the immediate superclass.

### Step 6 — Static vs instance methods
Static methods kabhi override nahi hote; woh hide hote hain. Sirf instance methods override hote hain.  
Formal: Overriding requires dynamic dispatch; static methods are resolved at compile time using the reference type.

### Step 7 — Final methods cannot be overridden
Agar superclass method `final` hai toh subclass usko redefine nahi kar sakta.  
Formal: The `final` modifier on an instance method prevents any subclass from supplying a new implementation.

## 5. Worked examples — har step show karo

**Example 1 — Minimal override**  
*Given:*  
```java
class Shape {
    void draw() { System.out.println("Drawing shape"); }
}
class Circle extends Shape {
    void draw() { System.out.println("Drawing circle"); }
}
```
*Find:* Output of `Shape s = new Circle(); s.draw();`  
Step 1: Reference `s` is of type `Shape`.  
Step 2: Actual object is `Circle`.  
Step 3: Runtime selects `Circle.draw()`.  
**Drawing circle**  

*Reflection:* Signature identical hone se hi override hua; agar parameter hota toh overload ban jaata.

**Example 2 — Using super**  
*Given:* Same `Shape` and `Circle`, lekin `Circle` mein:  
```java
void draw() {
    super.draw();
    System.out.println("…with radius");
}
```
*Find:* Output  
Step 1: `super.draw()` calls `Shape.draw()`.  
Step 2: Extra line executes after.  
**Drawing shape  
…with radius**  

*Reflection:* `super` reuse dikhata hai bina pura code copy kiye.

**Example 3 — Covariant return (Java 5+)**  
*Given:*  
```java
class Parent { Number getValue() { return 1; } }
class Child extends Parent {
    Integer getValue() { return 42; }   // covariant
}
```
*Find:* `Parent p = new Child(); System.out.println(p.getValue());`  
**42**  

*Reflection:* Return type subclass ho sakta hai lekin parameter list same rahni chahiye.

**Example 4 — Common mistake turned correct**  
*Given:* Developer ne `public void draw(int x)` likha `Circle` mein.  
*Find:* Kya override hua?  
Step 1: Signature mismatch → overload.  
Step 2: `Shape s = new Circle(); s.draw();` ab bhi “Drawing shape” print karega.  
Correct fix: parameter hatao.  

*Reflection:* Signature check karna har baar zaroori hai.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Changing parameter list           | Developer sochta hai “thoda change kar doon”| Signature copy-paste karke edit karo         |
| Reducing visibility               | “Protected kaafi hoga”                      | Original access modifier exactly rakho       |
| Overriding static method          | Static aur instance method mix-up           | Static methods hide hote hain, override nahi |
| Forgetting @Override              | Annotation optional lagta hai               | Har override pe @Override lagaao             |
| Calling overridden method from constructor | Early binding samajh na aana          | Constructor mein overrideable methods mat call karo |
| Expecting compile-time polymorphism | Overloading aur overriding confuse karna   | Yaad rakho: overloading compile-time, overriding runtime |

## 7. The textbook-precise statement
A method declaration \(d_1\) in class \(C_1\) overrides a method declaration \(d_2\) in class \(C_2\) if and only if all of the following hold: (i) \(C_1\) is a subclass of \(C_2\), (ii) \(d_1\) and \(d_2\) have the same name and identical formal parameter types (after type erasure), (iii) the return type of \(d_1\) is substitutable for the return type of \(d_2\) (Java allows covariant returns), (iv) the access modifier of \(d_1\) is no more restrictive than that of \(d_2\), and (v) \(d_2\) is not declared `final` or `private`. (Gosling et al., *The Java Language Specification*, Java SE 17 Edition, §8.4.8.1)

## 8. Visual — diagram or schematic
```
Animal (superclass)
  + makeSound()
       |
       +-- Dog (subclass)
       |     override makeSound() → "Woof"
       |
       +-- Cat (subclass)
             override makeSound() → "Meow"

Reference variable: Animal a;
a = new Dog();   // dynamic type = Dog
a.makeSound();   // calls Dog version
```

## 9. The memory technique
1. **The hook** — Picture a remote-control car. The remote (superclass reference) stays the same, but the actual car (subclass object) decides whether it turns left or spins. Overriding = remote same, car different.  
2. **What to overlearn** — Signature must be identical; only the body changes. `@Override` is your safety net.  
3. **Spaced-repetition schedule** — Review the definition after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Agar definition bhool jaao toh yeh socho: “Ek hi method call, do alag objects → alag behaviour chahiye?” → override.

## 10. What this unlocks
Method overriding runtime polymorphism ki buniyad hai. Iske baad aap abstract classes, interfaces, strategy pattern, template method pattern aur dependency-injection frameworks ko asani se samajh paoge.

- Next: Abstract classes and methods  
- Next: Interface default methods (Java 8+)  
- Next: Strategy and Template Method design patterns  

## 11. Self-check — five questions, no answers
1. Agar subclass mein method ka return type superclass ke method se incompatible ho toh kya hoga?  
2. `final` method ko override karne ki koshish karne par compiler kya karega?  
3. Ek static method ko subclass mein same signature ke saath likhna override hai ya hiding?  
4. Neeche diye code mein output kya aayega aur kyun?  
   ```java
   class A { void m() { System.out.print("A"); } }
   class B extends A { void m() { System.out.print("B"); } }
   A ref = new B(); ref.m();
   ```  
5. Agar aap `@Override` hata dete ho aur signature mein ek parameter add kar dete ho, toh runtime behaviour kaise badlega?