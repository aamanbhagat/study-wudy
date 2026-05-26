## 1. The one-sentence answer
**A process is an executing program whose complete runtime context is captured inside a Process Control Block (PCB), and whose life-cycle is tracked through five distinct states: new, ready, running, blocked and terminated.**

Jab aap ek program run karte ho, OS usko ek independent entity bana deta hai jise process kehte hain. Har process ka apna address space, registers, open files aur scheduling information hota hai; yeh sab ek data structure mein store hota hai jise PCB kehte hain. Process apni life mein different states se guzarta hai — woh memory mein load hone se leke CPU pe execute hone, I/O wait karne aur finally khatam hone tak.

State transitions strictly defined hain. Ek process sirf ready se running ban sakta hai jab scheduler usko CPU deta hai; running se blocked tab hota hai jab woh I/O ya resource maangta hai. Yeh rules OS ko multitasking, protection aur fair CPU allocation karne dete hain.

> [!NOTE]
> PCB ek process ka “passport” hai — bina iske OS ko pata hi nahi chalega ki process exist karti hai ya uske resources kya hain.

## 2. Why this matters — concrete and current
Linux kernel har running task ke liye `task_struct` naam ka PCB maintain karta hai; yeh structure directly scheduler, memory manager aur signal delivery ko control karta hai jo aaj ke cloud workloads (AWS EC2, Google Cloud VMs) ko power deta hai.

Android application lifecycle (Activity states) ultimately Linux process states par map hota hai; jab aap koi app background mein daalte ho to uska process blocked state mein chala jata hai taaki battery aur memory bach sake.

Modern container runtimes jaise Docker aur containerd har container ko ek separate process tree ke roop mein treat karte hain; container ka PCB Linux namespace aur cgroup information store karta hai jo isolation guarantee karta hai.

Microsoft Windows Task Manager aur Resource Monitor dono NT kernel ke EPROCESS block (equivalent of PCB) se hi data lete hain; yeh engineers ko real-time mein thread states aur CPU utilisation dekhne deta hai.

Safety-critical systems jaise NASA’s flight software (VxWorks based) process state machine ko deterministic banate hain taaki ek blocked process poori system ko hang na kar sake.

## 3. Mental prerequisites

| Concept              | Why you need it here                                                                 |
|----------------------|--------------------------------------------------------------------------------------|
| Program vs Process   | Program sirf code hota hai; process uska runtime instance hai jiske liye PCB chahiye |
| CPU registers & PC   | Running state mein in values ko save karna padta hai jab context switch hota hai     |
| Interrupt & syscall  | Blocked state trigger karne ke liye process ko interrupt ya system call karna padta hai |
| Scheduler basics     | Ready queue aur running state ke beech transition samajhna zaroori hai               |

Agar upar ke concepts clear nahi hain to pehle unhe padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Process as an independent unit of execution
Ek program jab load hota hai aur uske liye resources allocate kiye jaate hain, tab woh ek process ban jaata hai. Yeh process OS ke liye ek alag entity hoti hai jise schedule, preempt aur terminate kiya ja sakta hai.

Concrete example: `gcc main.c` command ek naya process banata hai jiska PID 1234 ho sakta hai.

Formal statement: A process \(P\) is defined by the tuple \((id, state, PCB)\), where \(PCB\) holds all execution context.

> [!WARNING]
> Agar aap program aur process ko ek hi cheez samajhoge to PCB ki zaroorat samajh nahi aayegi aur context-switch ka logic toot jaayega.

### Step 2 — PCB as the sole descriptor
PCB ek kernel data structure hai jo process ki har zaroori detail store karta hai: process ID, state, program counter, registers, memory limits, open file descriptors, parent/child pointers aur accounting info.

Formal: \(PCB = \{PID, state, PC, regs, mem\_limits, fd\_table, \dots\}\).

### Step 3 — New state
Jab process create hoti hai (fork/exec), woh pehle new state mein hoti hai. Yahan OS memory allocate karta hai aur PCB initialise karta hai lekin process abhi ready queue mein nahi daali jaati.

### Step 4 — Ready and Running states
Ready state mein process CPU ke liye wait karti hai. Scheduler ek ready process ko pick karke running state mein le aata hai aur usko CPU deta hai. Sirf ek hi process ek CPU core par running ho sakti hai.

### Step 5 — Blocked state
Jab running process I/O request karti hai ya kisi resource (semaphore, disk) ka intezaar karti hai, woh blocked state mein chali jaati hai. Blocked process CPU waste nahi karti.

### Step 6 — Terminated state
Process apna kaam khatam karne ke baad ya signal se maarne par terminated state mein jaati hai. OS resources free karta hai aur PCB ko eventually delete karta hai.

### Step 7 — State transition rules
Transitions sirf allowed edges par hi ho sakte hain: new → ready, ready → running, running → ready/blocked/terminated, blocked → ready, etc. Koi bhi arbitrary transition allowed nahi.

Formal: Let \(S = \{new, ready, running, blocked, terminated\}\). The transition function \(\delta: S \times Event \to S\) is defined by the OS scheduler and only permits the edges listed above.

### Step 8 — Textbook-grade summary
Ek process apni lifetime mein in paanch states se guzarti hai aur har state change PCB ke state field ko update karta hai. Yeh model modern operating systems (Linux, Windows, macOS) mein process management ka foundation hai.

## 5. Worked examples

**Example 1 — Simple state change on fork**
*Given:* Parent process calls `fork()`.
*Find:* Child process ka initial state.
Step 1: `fork()` syscall execute hoti hai → running state.
Step 2: Kernel child PCB allocate karta hai → new state.
Step 3: Memory copy complete hone ke baad child ko ready queue mein daal diya jaata hai.
*Why:* Fork ke baad child ko turant CPU nahi milta, isliye woh ready state mein jaata hai.
**Final answer: ready**

*Reflection:* Yeh example isliye simple hai kyunki fork ke baad child ka state deterministic hota hai.

**Example 2 — I/O causes block**
*Given:* Running process `read(fd, buf, 1024)` call karti hai.
*Find:* Naya state.
Step 1: System call enter → kernel mode.
Step 2: Disk driver se data maanga jaata hai → process ko sleep queue mein daal diya jaata hai.
Step 3: PCB.state = blocked.
*Why:* Process ko CPU waste nahi karna chahiye jab tak data nahi aata.
**Final answer: blocked**

*Reflection:* I/O wait ko block state mein daalna hi sahi design hai warna system slow ho jaayega.

**Example 3 — Preemption**
*Given:* Running process ka time slice khatam.
*Find:* Naya state.
Step 1: Timer interrupt aata hai.
Step 2: Kernel scheduler check karta hai → process ko ready queue mein wapas daal deta hai.
Step 3: PCB.state = ready.
**Final answer: ready**

*Reflection:* Preemption ready state ki taraf jaane ka classic rasta hai.

**Example 4 — Exit syscall**
*Given:* Process `exit(0)` call karti hai.
*Find:* Final state aur PCB ka fate.
Step 1: exit syscall → running se terminated.
Step 2: Kernel resources free karta hai lekin zombie PCB temporarily rehta hai parent ke liye.
Step 3: Parent `wait()` karta hai → PCB delete.
**Final answer: terminated (PCB later deleted)**

*Reflection:* Terminated state resources turant free nahi karti, isliye wait() zaroori hai.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| New state ko ready ke saath mix karna | Creation aur scheduling ko ek hi cheez samajhna     | New state sirf allocation tak hai, ready queue entry alag hai |
| Blocked aur terminated ko same samajhna | Dono mein process “inactive” dikhti hai             | Blocked ko wapas ready jaana padta hai, terminated nahi |
| PCB ko user-space structure samajhna | PCB kernel memory mein hota hai                     | User programs PCB ko directly access nahi kar sakte  |
| Multiple running states per core allow karna | Multithreading confusion                            | Ek core par ek hi process running ho sakti hai       |
| Terminated process ko turant delete kar dena | Zombie processes bhool jaana                        | Parent wait() kare tab hi PCB free hota hai          |
| Blocked se directly running par jaana | Event complete hone par galat transition            | Blocked → ready → running hi allowed hai             |

## 7. The textbook-precise statement
A process is an instance of a program in execution. Each process is represented in the operating system by a process control block (PCB) that contains at minimum the process state, program counter, CPU registers, scheduling information, memory-management information, accounting information and I/O status information. The possible process states are new, ready, running, blocked (waiting) and terminated. State transitions occur only on well-defined events and are performed by the operating-system scheduler. (Silberschatz, Galvin, Gagne, *Operating System Concepts*, 10e, §3.1–3.2)

## 8. Visual — diagram or schematic
```
          new
           |
           v
         ready <--- blocked
           ^          ^
           |          |
           v          |
         running -----+
           |
           v
       terminated
```
Labels: arrows show allowed transitions only; running se hi blocked, ready (preempt) aur terminated ja sakta hai.

## 9. The memory technique
1. **The hook**: Panch states ko ek train journey samajh lo — new (platform par chadhna), ready (train ka wait), running (train chalna), blocked (signal par rukna), terminated (last station).
2. **What to overlearn**: Five states ke naam aur unke transitions ke rules; PCB mein state field ka role.
3. **Spaced-repetition schedule**: 1 din baad, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback**: Agar rules bhool jaao to yaad karo ki CPU waste na ho isliye blocked state exist karti hai aur sirf ek process ek core par chal sakti hai.

## 10. What this unlocks
Yeh concept aapko scheduler design, context switching, inter-process communication aur deadlock detection samajhne ke liye ready karta hai.

- Next: CPU scheduling algorithms (FCFS, SJF, Round-Robin)
- Process creation & termination system calls
- Thread vs process distinction
- Multiprocessor scheduling aur affinity

## 11. Self-check — five questions, no answers
1. Ek process new state se directly running state mein ja sakti hai kya? Justify karo.
2. PCB ka kaunsa field context-switch ke time sabse zyada update hota hai?
3. Agar parent process child ke terminate hone ka intezaar nahi karta, PCB ka kya hota hai?
4. Blocked process ko ready state mein laane ke liye kaunsa event zaroori hai?
5. Ek 4-core machine par maximum kitni processes simultaneously running state mein ho sakti hain?