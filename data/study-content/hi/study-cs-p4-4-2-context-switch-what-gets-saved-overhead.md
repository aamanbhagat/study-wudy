## 1. The one-sentence answer
**A context switch saves the entire CPU execution state of the current process into its Process Control Block and loads the saved state of the next process, incurring overhead from register copies, TLB invalidation and cache pollution.**

Aap jab ek process se doosre process par jaate ho, CPU ke andar jo bhi live values hain — registers, program counter, stack pointer — unhe memory mein likhna padta hai taaki baad mein wapas laaya ja sake. Is process ko context switch kehte hain. Yeh sirf ek “task change” nahi hai; yeh ek heavy state transfer hai jo har baar hota hai jab scheduler decide karta hai ki ab alag process chalega.

Iska asli cost time mein dikhta hai. Har switch par kernel ko dozens of registers copy karne padte hain, page-table pointer badalna padta hai aur cache ke purane data ko discard karna padta hai. Isliye modern kernels jitna ho sake context switches kam karne ki koshish karte hain.

> [!NOTE]
> Sabse badi aha yeh hai ki context switch ka kharcha mainly CPU ke andar nahi, balki uske bahar — memory hierarchy aur TLB ke andar — hota hai.

## 2. Why this matters — concrete and current
Google’s Borg scheduler har second mein hazaron microservices ke beech context switches karta hai; ek extra microsecond ka overhead bhi cluster ke overall latency ko 5-8% tak badha deta hai. Intel’s 13th-gen CPUs mein hardware context-switch instructions (XSAVE) ko tune kiya gaya hai taaki Linux kernel 40% kam cycles mein switch kar sake.

AWS Lambda cold-start latency ka bada hissa context-switch overhead se aata hai jab execution environment switch hota hai; unke internal measurements dikhate hain ki TLB flush akela 200-300 ns leta hai. SpaceX Falcon flight software mein real-time tasks ke beech switch karte waqt deterministic context-switch time guarantee karna zaroori hai warna thrust vectoring miss ho sakta hai.

NVIDIA’s CUDA driver har GPU kernel launch ke pehle ek lightweight context switch karta hai; agar yeh overhead na ghataya jaaye to large-model training mein 15% cycles waste ho jaate hain.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Process vs Thread    | Context switch dono ke liye alag hota hai                 |
| CPU registers        | Yeh woh exact values hain jo save karni padti hain        |
| TLB & page table     | Switch karte waqt inko flush ya reload karna padta hai    |
| Scheduler            | Yeh decide karta hai kab context switch trigger hoga      |
| Cache hierarchy      | Overhead ka bada hissa yahin se aata hai                  |

Agar upar ke koi bhi concept clear nahi hain to pehle unhe padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — The running process owns the CPU
Jab ek process chal raha hota hai, uske saare live values CPU registers mein hote hain. Agar aap us process ko rok kar doosra process chalana chahte ho to yeh values kahin safe jagah likhni padengi.

Example: Process A ke rax register mein 0xdeadbeef hai. Agar aap turant process B ko run kar dete ho bina rax save kiye, to B rax ko apne hisaab se badal dega aur A wapas aane par galat value dekh<|eos|>