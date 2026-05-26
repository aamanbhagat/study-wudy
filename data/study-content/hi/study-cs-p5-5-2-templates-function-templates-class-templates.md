## 1. The one-sentence answer
**Templates let you write one piece of code that the compiler automatically turns into separate, type-specific versions for every data type you need.**

Aap ek function ya class likhte ho jisme type ka naam nahi fix karte; uski jagah ek placeholder (jaise T) daal dete ho. Jab aap us function ya class ko int, double, string ya kisi bhi custom type ke saath use karte ho, compiler turant ek nayi copy bana deta hai jisme T ko us type se replace kar diya jaata hai. Iska matlab yeh hai ki aapko same logic baar-baar nahi likhna padta; compiler repetition handle karta hai.

Yeh approach compile-time pe hoti hai, isliye runtime overhead zero hota hai. Ek hi source file se dozens of efficient, type-safe versions ban jaati hain bina macros ke dangers ke.

> [!NOTE]
> The single most important “aha” is that templates are not runtime polymorphism; they are compile-time code generation. Once the compiler finishes, every template has disappeared and you are left with ordinary, concrete functions and classes.

## 2. Why this matters — concrete and current
- In the Eigen linear-algebra library used by TensorFlow and robotics stacks, every matrix operation is written once as a class template so the same source supports float, double, and complex numbers without any runtime cost.
- LLVM’s code-generation passes rely on heavy template metaprogramming to produce specialised instruction selectors for x86, ARM and RISC-V back-ends from a single description.
- The C++ standard library containers (std::vector, std::map) are class templates; every competitive-programming solution and almost every high-frequency trading engine depends on them being instantiated for user-defined types.
- NASA’s flight-software framework (cFS) uses function templates to implement endian-safe serialisation routines that must work identically on 32-bit and 64-bit targets without duplicating source.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Ordinary functions   | Templates are just functions whose argument types are parameters |
| Classes and members  | Class templates extend the same idea to data + methods    |
| Compile-time vs runtime | Templates are expanded before any code runs, so errors appear at compile time |
| Type deduction rules | Needed to understand how the compiler decides what T really is |

If any row above feels shaky, pause and revise that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — The duplication problem
Aapne ek max function likha int ke liye. Ab double aur std::string ke liye bhi chahiye. Copy-paste karne se maintenance nightmare ban jaata hai.

```cpp
int max(int a, int b) { return a > b ? a : b; }
```
Agar aap yeh teen baar likhte ho, teen jagah bugs fix karne padte hain.

### Step 2 — Introduce the template keyword
Ek placeholder type daal do aur compiler ko bata do ki yeh ek template hai.

```cpp
template<typename T>
T max(T a, T b) { return a > b ? a : b; }
```
Ab yeh code kisi bhi type ke liye valid hai jisme > operator defined ho.

### Step 3 — Implicit instantiation
Jab aap max(3, 5) likhte ho, compiler turant ek nayi function bana deta hai jisme T = int ho jaata hai. Yeh process instantiation kehlata hai.

### Step 4 — Explicit type specification
Kabhi compiler ko help deni padti hai:

```cpp
double d = max<double>(3, 4.5);   // T forced to double
```

### Step 5 — Class templates
Same idea data members aur methods par apply karo.

```cpp
template<typename T>
class Vector {
    T* data;
    std::size_t sz;
public:
    Vector(std::size_t n) : sz(n), data(new T[n]) {}
    // ...
};
```

### Step 6 — Separate compilation and .cpp rules
Template definitions must be visible at the point of instantiation; therefore the entire definition usually lives in the header.

### Step 7 — Two-phase lookup and dependent names
Compiler do baar code dekhta hai: pehli baar template likhte waqt, doosri baar jab T pata chal jaaye. Isliye typename aur scope resolution carefully likhna padta hai.

### Step 8 — Textbook-grade statement
A template is a family of functions or classes parametrised by one or more template parameters. Each unique combination of template arguments produces a distinct instantiation that is compiled independently.

## 5. Worked examples — har step show karo

**Example 1 — Simple function template**  
*Given:* Need a max that works for any comparable type.  
*Find:* Call it with int and double.  

```cpp
template<typename T>
T max(T a, T b) { return a > b ? a : b; }

int main() {
    int    i = max(3, 5);          // T deduced as int
    double d = max(2.7, 1.4);      // T deduced as double
}
```
*Why* first call: compiler sees two ints, replaces T with int and emits a normal function.  
**Final answer**  
Two separate functions are generated; both run at full speed.  

*Reflection:* The example is simple yet shows that no runtime cost is paid.

**Example 2 — Multiple template parameters**  
*Given:* A function that swaps two values of possibly different types (rare but illustrative).  
*Find:* Write and call it.  

```cpp
template<typename T, typename U>
void swapDifferent(T& a, U& b) {
    T tmp = static_cast<T>(b);
    b = static_cast<U>(a);
    a = tmp;
}
```
*Why* static_cast: types may differ, so explicit conversion is required.  
**Final answer**  
swapDifferent<int,double>(x,y) compiles to a concrete function with the casts baked in.

*Reflection:* Demonstrates that the number of template parameters is independent of the number of function parameters.

**Example 3 — Minimal class template**  
*Given:* A fixed-size buffer that can store any type.  
*Find:* Instantiate for float and access size.  

```cpp
template<typename T, int N>
class Buffer {
    T arr[N];
public:
    constexpr int size() const { return N; }
};

Buffer<float, 8> buf;
```
*Why* constexpr: size is known at compile time, so it can be used in constant expressions.  
**Final answer**  
buf.size() returns 8 with zero runtime cost.

*Reflection:* Non-type parameters (int N) are also possible and are compile-time constants.

**Example 4 — Explicit specialization**  
*Given:* max works for most types, but for const char* we want lexicographic comparison via strcmp.  
*Find:* Provide a special version.  

```cpp
template<>
const char* max(const char* a, const char* b) {
    return std::strcmp(a, b) > 0 ? a : b;
}
```
*Why* template<>: tells the compiler this is not a new template but a concrete replacement for T = const char*.  
**Final answer**  
max("apple","banana") now uses the specialised version.

*Reflection:* Specialisation lets you keep the same interface while changing implementation for selected types.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Putting template definition in .cpp | Compiler needs the body to instantiate     | Keep definitions in headers or use explicit instantiation |
| Missing typename for dependent types | Compiler cannot tell if name is a type     | Write typename T::value_type when required   |
| Assuming all instantiations compile | Each instantiation is compiled separately  | Test at least with the types you intend to use |
| Forgetting const T& in parameters | Unnecessary copies for large T             | Use const T& or T&& when appropriate         |
| Trying to separate declaration and definition across translation units | ODR and instantiation rules violated     | Either put everything in header or use .tpp files included at the end |
| Specialising only the class, not its member functions | Member functions are separate templates    | Specialise the member function as well when needed |

## 7. The textbook-precise statement
A function template is a declaration whose declarator contains a template-parameter-list; similarly for a class template. “An instantiation of a function template is a function whose type is determined by substituting the template arguments for the corresponding template parameters.” (Bjarne Stroustrup, The C++ Programming Language, 4th ed., §25.2.1). All template definitions must be available at the point of use; there is no separate compilation model for templates themselves.

## 8. Visual — diagram or schematic
```
Source code (header)
+-----------------------+
| template<typename T>  |
| T max(T a, T b);      |
+-----------------------+
            |
            |  instantiation requests
            v
Compiler
   +------+   +------+
   | T=int|   |T=double|
   +------+   +------+
       |          |
       v          v
Generated object code
  max(int,int)   max(double,double)
```

## 9. The memory technique
1. **The hook** — Imagine a photocopier that only wakes up when you hand it a concrete type; it instantly prints a perfect, typed copy of your code.
2. **What to overlearn** — The syntax `template<typename T>` and the fact that the definition must be visible at call site.
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — If syntax slips, remember: write the concrete function first, then replace the type with T and wrap the whole thing with `template<typename T>`.

## 10. What this unlocks
Templates are the foundation of the entire C++ standard library and of most generic-programming techniques.

- You can now read and write STL containers and algorithms.
- You are ready for template metaprogramming and SFINAE.
- Concepts (C++20) become a natural next step for constraining template parameters.
- Expression templates and policy-based design become accessible.

## 11. Self-check — five questions, no answers
1. Write a function template that returns the minimum of three values.
2. What happens if you call max(3, 4.5) without any explicit type?
3. Why must a class template’s member definitions usually reside in the header file?
4. Give one situation where an explicit specialisation is required and show its syntax.
5. Identify the error in the following snippet and explain why the compiler complains only at instantiation time:
   ```cpp
   template<typename T>
   void f(T x) { x.nonexistent(); }
   ```