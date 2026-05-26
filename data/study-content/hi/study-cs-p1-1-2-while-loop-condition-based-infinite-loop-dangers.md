## 1. The one-sentence answer
**A while loop keeps executing its indented block only while its controlling boolean condition stays True; if that condition never flips to False, execution never exits and you get an infinite loop.**

The core mechanism is simple: Python evaluates the condition before every iteration. If the result is True, the body runs; if False, control jumps to the statement after the loop. The danger appears the moment the body forgets to change any variable that the condition depends on. In that case the same True value is re-checked forever.

Think of it like a traffic light that stays green only as long as a sensor detects cars. If the sensor is broken and always reports “car present,” the light never turns red and traffic never stops. The same logic applies to code: the loop itself is not the problem; the missing update inside the body is.

> [!NOTE]
> The single most important insight is that termination is not automatic; it is your responsibility to make the condition False inside the loop.

## 2. Why this matters — concrete and current
In the flight software of the Perseverance rover, a while loop waits for the next telemetry packet from the UHF radio. The loop condition checks a hardware flag that the interrupt handler sets; once the packet arrives the flag becomes False and the loop exits, allowing the scheduler to move to the next task. If that flag were never cleared, the entire guidance thread would freeze.

Production web servers written in Python (Gunicorn’s sync workers) use a while True loop around the accept() call. The only way the worker exits is when the master process sends SIGTERM and the loop condition is changed by a signal handler. A missing signal handler turns the worker into a zombie that holds the port forever.

Inside PyTorch’s DataLoader, the worker processes run a while loop that keeps fetching batches until an internal “stop” event is set by the main process. If the event is never set because of a deadlock in the prefetch queue, the worker leaks memory until the machine runs out of RAM.

Real-time stock-ticker applications at Jane Street keep a while loop alive as long as the WebSocket connection reports status code 101. Network jitter that never triggers a proper close frame can leave the loop spinning and burning CPU at 100 % on the monitoring machine.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Boolean expression   | The while condition must evaluate to True or False        |
| Variable assignment  | You must change a variable inside the body to make the condition False later |
| Indentation / block  | Python uses indentation to know what belongs to the loop  |

If any of these three ideas are shaky, pause and review them before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — The condition is checked before every iteration
Aap already know an if statement runs its body once when the condition is True. A while statement repeats that check until the condition becomes False.  
Concrete example:  
```python
x = 3
while x > 0:
    print(x)
    x = x - 1
```
Formal statement:  
$$
\text{while } B: S \quad \equiv \quad \text{if } B \text{ then } (S; \text{while } B: S)
$$
> [!WARNING]
> If you treat the first check as optional, you will later forget that an already-False condition skips the body completely.

### Step 2 — The body must change the condition’s variables
The only way the loop stops is if something inside the body makes B evaluate to False on the next check. In the example above, x = x - 1 is that change. Without it the loop is infinite.

### Step 3 — Syntax in Python
The keyword while, followed by a boolean expression, a colon, then an indented block. No parentheses are required around the condition, but the colon and indentation are mandatory.

### Step 4 — Infinite loop as a defined state
When the condition remains True after every execution of S, the program counter never leaves the loop. The operating system eventually shows the process as “not responding.”

### Step 5 — Controlled versus uncontrolled non-termination
A deliberate while True with an explicit break is controlled. A while whose condition variables are never written is uncontrolled and almost always a bug.

### Step 6 — Formal termination argument
For any while loop to be guaranteed to terminate, there must exist a strictly decreasing non-negative integer quantity (a variant) that is reduced inside the body and is bounded below by zero.

## 5. Worked examples — har step show karo

**Example 1 — Simple countdown**  
*Given:* x starts at 3.  
*Find:* print 3, 2, 1 and stop.  
```python
x = 3
while x > 0:          # check: 3>0 True
    print(x)
    x = x - 1         # x becomes 2
# next check: 2>0 True … eventually 0>0 False
```
*Why:* each iteration lowers x by 1 until the guard fails.  
**Final answer**  
3  
2  
1  

*Reflection:* The example is safe because the decrement is impossible to miss; any real program that copies this pattern must keep the decrement on every path.

**Example 2 — Reading until sentinel**  
*Given:* user keeps typing numbers until they type 0.  
*Find:* sum of all numbers except the 0.  
```python
total = 0
num = int(input())
while num != 0:
    total = total + num
    num = int(input())
```
*Why:* the second input statement is the only line that can change num, so it must sit inside the body.  
**Final answer** total contains the required sum.  

*Reflection:* forgetting the second input is the classic “infinite loop on user input” trap.

**Example 3 — List processing with index**  
*Given:* a list lst of unknown length.  
*Find:* print every element.  
```python
i = 0
while i < len(lst):
    print(lst[i])
    i = i + 1
```
*Why:* len(lst) never changes, but i grows until it equals the length.  
**Final answer** every element printed once.  

*Reflection:* using < instead of <= prevents an IndexError on the last iteration.

**Example 4 — Accidental infinite loop**  
*Given:* the programmer writes a loop that should run 5 times but forgets the update.  
```python
count = 0
while count < 5:
    print("looping")
    # no count = count + 1
```
*Why:* count stays 0 forever, condition stays True.  
**Final answer** program hangs.  

*Reflection:* always ask “which variable in the condition is written inside the body?”

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to update variable | Copy-paste from an if statement             | After writing the body, ask “does any line change a variable in the condition?” |
| Off-by-one in condition     | Using <= when < is needed                   | Draw the first and last iteration on paper   |
| Modifying loop variable in condition itself | Writing while i < 10: i = i + 1 on same line | Keep the condition side-effect free          |
| Infinite input loop         | input() call placed outside the loop        | Place every read that can change the guard inside the body |
| Using float equality        | while x != 0.0 with floating-point x        | Use a small epsilon or an integer iteration count |
| Nested while without separate counters | Re-using the same index variable            | Give each loop its own index or use for loops when possible |

## 7. The textbook-precise statement
A while statement has the form  
while ⟨expression⟩: ⟨suite⟩  
Execution proceeds as follows: the expression is evaluated in the current scope; if it is true, the suite is executed, then control returns to the while statement. The process repeats until the expression evaluates to false or an exception, return, break or continue statement transfers control out of the loop.  
If the expression never becomes false and none of the transfer statements execute, the loop does not terminate.  
Source: Python Language Reference, §8.3 “The while statement”, release 3.12.

## 8. Visual — diagram or schematic
```
          +-------------------+
          | evaluate condition|
          +-------------------+
                   |
                   v
             True / \ False
                 /   \
                v     v
          +-------+   +-------+
          |  body |   |  exit |
          | (update vars) |   +-------+
          +-------+        
              |
              +-- back to condition check
```

## 9. The memory technique
1. **The hook** — Picture a hungry dog on a treadmill. The belt keeps moving only while the dog sees a treat in front of it. The moment the treat is removed (condition becomes False), the belt stops. If the treat is never removed, the dog runs forever.  
2. **What to overlearn** — The three-line skeleton: initialise, while condition, update inside body.  
3. **Spaced-repetition schedule** — Review the skeleton after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — If you forget the syntax, remember: “check, run, change, repeat” until the check fails.

## 10. What this unlocks
Mastery of the while loop lets you write any iteration that cannot be expressed by a simple range, and it is the foundation for understanding event loops, state machines and recursion.  
- for loops become a convenient special case when you know the iteration count in advance.  
- Recursion can be rewritten as an explicit while loop using a stack.  
- Threading primitives (wait/notify) are essentially while loops around a condition variable.  
- Understanding infinite-loop detection helps when you later study termination proofs in program analysis.

## 11. Self-check — five questions, no answers
1. Write a while loop that prints every even number from 2 to 20 inclusive.  
2. What single-line change turns the countdown example into an infinite loop?  
3. A loop must read integers until the user enters a negative number. Where must the input() call be placed?  
4. Why does while x != 0.1: with x = x + 0.1 create an infinite loop even though mathematically it should stop?  
5. A colleague claims “adding a print statement inside the body can never fix an infinite loop.” Is the claim true or false, and why?