## 1. The one-sentence answer

**A stack is a linear data structure that enforces LIFO (Last-In-First-Out) semantics through the operations push, pop, and peek.**

Iska matlab yeh hai ki jo element sabse last mein daala jaata hai, wohi sabse pehle bahar niklega. Aap isko ek vertical pipe ki tarah soch sakte ho jismein sirf top end se hi cheezein add ya remove hoti hain. Is structure ki wajah se backtracking, expression evaluation, aur recursion jaise patterns naturally handle ho jaate hain.

Array implementation mein fixed size hota hai aur overflow/underflow check karna padta hai, jabki linked-list implementation mein dynamic growth milta hai lekin extra memory pointers ke liye lagti hai. Dono cases mein push, pop, aur peek ka interface bilkul same rehta hai.

> [!NOTE]
> Sabse badi aha yeh hai ki stack sirf ek ordering rule (LIFO) enforce karta hai; baaki saari flexibility (random access, searching) deliberately hata di jaati hai taaki higher-level algorithms reliable ban sakein.

## 2. Why this matters — concrete and current

Java Virtual Machine har method call ke liye ek dedicated stack frame banata hai; agar aap recursion depth exceed kar jaayein to StackOverflowError aata hai. Google Chrome ka JavaScript engine bhi call stack aur event loop dono stack-based structures par depend karta hai.

Git version control system har commit ke parent pointer ko stack-style traversal se resolve karta hai jab aap `git rebase` ya `git log --graph` chalate ho. VLSI design tools (Synopsys, Cadence) expression trees ko postfix notation mein convert karke stack par evaluate karte hain during timing analysis.

Compiler back-ends (LLVM, GCC) register allocation ke liye graph coloring ke saath stack-based live-range analysis use karte hain. Aerospace flight software (NASA’s cFS) command sequencing mein deterministic undo aur error-recovery ke liye stack ko hardware-level par implement karta hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Array                | Fixed-size contiguous memory model samajhna zaroori hai   |
| Singly linked list   | Dynamic node allocation aur pointer manipulation          |
| Reference / pointer  | Linked-list implementation mein next pointer handle karna |

Agar aap in teeno mein se koi bhi weak feel kar rahe ho, to pehle wohi revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — LIFO ordering rule
Ek stack mein sirf wohi element sabse pehle nikal sakta hai jo sabse last daala gaya tha. Concrete example: browser history mein Back button dabane par sabse recent page pehle aata hai. Formally, agar sequence of pushes \(x_1, x_2, \dots, x_n\) hai to pop sequence ka prefix \(x_n, x_{n-1}, \dots\) hi valid hai.

> [!WARNING]
> Agar aap LIFO ko FIFO ke saath confuse karoge to queue aur stack dono galat implement ho jaayenge.

### Step 2 — Core operations
**Push(x)** top par element daalta hai, **Pop()** top element hata kar return karta hai, **Peek()** sirf top element dekhta hai bina hataye. In teeno ka time complexity ideally \(O(1)\) hona chahiye.

### Step 3 — Array-based implementation
Top index maintain karo. Push par `arr[++top] = x`, pop par `return arr[top--]`. Size fixed hoti hai, isliye overflow check zaroori hai.

### Step 4 — Linked-list implementation
Har node mein data aur next pointer. Top pointer ko head maano. Push naya node banakar uska next = current top, phir top update. Extra memory har node ke liye lagegi.

### Step 5 — Complexity guarantees
Dono implementations mein push, pop, peek \(O(1)\) amortized hain. Array mein space \(O(n)\) fixed, linked-list mein \(O(n)\) dynamic lekin pointer overhead ke saath.

### Step 6 — Invariants
Stack kabhi bhi empty state se pop nahi hona chahiye aur full array mein push nahi hona chahiye. Yeh invariants violate karne par runtime error aata hai.

## 5. Worked examples — har step show karo

**Example 1 — Basic push and pop sequence**  
*Given:* Empty stack, operations: push(5), push(3), pop(), peek()  
*Find:* Final top value aur stack state  

Push(5) → stack = [5], top = 5  
Push(3) → stack = [5, 3], top = 3  
Pop() → returns 3, stack = [5], top = 5  
Peek() → returns 5  

*Why* har step: har operation sirf top ko touch karta hai, isliye LIFO preserved rehta hai.  
**Final answer:** top = 5

*Reflection:* Yeh example isliye simple thi kyunki koi implementation detail nahi thi; sirf semantics test ho rahi thi.

**Example 2 — Array implementation trace**  
*Given:* int stack[4]; top = -1  
*Find:* push(10), push(20), push(30) ke baad array state  

stack[0] = 10, top = 0  
stack[1] = 20, top = 1  
stack[2] = 30, top = 2  

*Why* har step: index increment pehle hota hai, phir assignment, taaki top hamesha valid index point kare.  
**Final answer:** array = [10, 20, 30, _], top = 2

*Reflection:* Boundary check yaad rakhna padta hai jab top == capacity-1 ho.

**Example 3 — Parenthesis matching**  
*Given:* string “((()))”  
*Find:* Valid hai ya nahi (stack use karke)  

Push ‘(’ three times → size = 3  
Pop three times on ‘)’ → size = 0  
End par empty stack → valid  

*Why* har step: har opening ka corresponding closing LIFO order mein aana chahiye.  
**Final answer:** valid

*Reflection:* Real compilers isi pattern ko extend karke nested scopes handle karte hain.

**Example 4 — Linked-list push with pointers**  
*Given:* top = NULL  
*Find:* push(7) ke baad node diagram  

newNode.data = 7, newNode.next = NULL  
top = newNode  

*Why* har step: naya node purane top ko point karta hai, phir top update hota hai.  
**Final answer:** top points to node(7)

*Reflection:* Memory leak tab hota hai jab pop ke time node ko free nahi kiya jaaye.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Pop on empty stack          | Boundary check bhool jaana                  | Always test top != -1 (array) ya != NULL     |
| Array overflow              | Size fixed hone ke bawajood push karna      | Resize ya exception throw karo               |
| Forgetting to update top    | Pointer manipulation galat                  | Push/pop ke baad top ko re-assign karo       |
| Returning popped value late | Variable overwrite ho jaana                 | Value pehle store karo, phir top decrement   |
| Memory leak in linked list  | Pop ke time node free nahi kiya             | delete/free call karna yaad rakho            |
| Using stack for FIFO task   | LIFO aur FIFO confuse karna                 | Problem statement mein order clearly dekho   |

## 7. The textbook-precise statement

A stack is an abstract data type that stores a sequence of elements and supports the following operations: PUSH(S, x) inserts element x at the top of stack S; POP(S) removes and returns the most recently inserted element; PEEK(S) returns the top element without removing it. Both array-based and linked-list realizations must satisfy the LIFO property that the sequence of pops is exactly the reverse of the sequence of pushes. (Cormen et al., *Introduction to Algorithms*, 4e, Chapter 10, Section 10.1)

## 8. Visual — diagram or schematic

```
Array form (capacity=5, top=2)
[ 10 | 20 | 30 |  _  |  _  ]   top ↑

Linked-list form
top → [7] → [14] → [9] → NULL
```

## 9. The memory technique

**The hook** — Stack ko ek plate stack ki tarah socho: sabse upar wali plate hi pehle utha sakte ho.

**What to overlearn** — Push/pop/peek teeno \(O(1)\), LIFO order, aur empty/full checks.

**Spaced-repetition schedule** — 1 din baad, 3 din, 7 din, 16 din, 35 din.

**First-principles fallback** — Agar implementation bhool jaaye to sirf yeh yaad rakho: “top pointer ko update karo aur data ko top ke through access karo.”

## 10. What this unlocks

Stack samajh lene ke baad aap recursion, depth-first search, expression parsing, aur undo mechanisms ko asani se implement kar sakte ho.

- Queue aur deque jaise structures ka foundation
- Tree aur graph traversal algorithms (DFS)
- Function call management in compilers
- Backtracking problems (N-Queens, Sudoku solver)

## 11. Self-check — five questions, no answers

1. Ek empty stack par teen push aur do pop ke baad peek kya return karega?
2. Array implementation mein top == capacity-1 hone par push karne ki koshish karne par kya hoga?
3. Linked-list stack mein pop ke time kaunsa pointer update karna zaroori hai?
4. Parenthesis string “(()” ko stack se validate karne par final state kya hoga?
5. Kyun ek stack ko array aur linked-list dono se implement kiya ja sakta hai lekin interface same rehta hai?