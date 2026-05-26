## 1. The one-sentence answer
**Interrupts ek hardware/software event-driven mechanism hain jisme processor apna current execution temporarily suspend karke ek dedicated Interrupt Service Routine (ISR) execute karta hai, jisme NVIC priority levels decide karte hain kaunsa interrupt pehle serve hoga aur interrupt latency uss response time ko measure karti hai jo event se lekar ISR ke pehle instruction tak lagti hai.**

Iska matlab yeh hai ki jab koi external pin, timer overflow, ya peripheral event hota hai, CPU ko turant uss event ko handle karna padta hai bina normal code flow ko permanently todhe. Aap soch sakte ho ki yeh ek real-time phone call jaisa hai jo aapke ongoing kaam ko rok ke important message deliver karta hai. ISR design mein aapko minimal work rakhna hota hai taaki system responsive rahe, aur NVIC ke 8-bit priority fields nested interrupts allow karte hain jab higher-priority event aaye.

> [!NOTE]
> Sabse badi aha yeh hai ki latency sirf hardware delay nahi hoti — aapke ISR ka design aur priority configuration directly decide karti hai ki system hard real-time deadlines meet karega ya miss karega.

## 2. Why this matters — concrete and current
STMicroelectronics ke STM32H7 microcontrollers mein NVIC priority grouping ko tune karke automotive ECUs braking systems mein sub-10 µs latency achieve karte hain, jisse ABS sensors ke sudden wheel-lock events turant handle hote hain.

NASA ke Mars Perseverance rover ke flight software mein timer interrupts ko highest NVIC priority diya gaya tha taaki actuator commands deterministic timing par execute hon, bina background telemetry tasks ke interfere kiye.

ARM Cortex-M33 based chips jo Apple ke AirTag mein use hote hain, low-power BLE advertising ke liye interrupt-driven wakeups employ karte hain jisme latency ko sub-microsecond level par rakhna battery life ko directly affect karta hai.

Texas Instruments ke C2000 real-time MCUs mein motor-control applications mein PWM timer interrupts ko pre-emptively nest kiya jata hai, jisse current-loop calculations 100 kHz sampling rate par bhi stable rahte hain.

Infineon Aurix TC3xx series jo autonomous driving ECUs mein deploy hote hain, multi-core NVIC configurations use karte hain taaki safety-critical ASIL-D interrupts lower-priority diagnostic tasks ko interrupt kar sakein.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| CPU register file & stack| ISR entry/exit par context save/restore samajhne ke liye  |
| Memory-mapped peripherals| Interrupt flags aur enable bits ko directly access karne ke liye |
| Binary priority encoding | NVIC ke 8-bit priority fields aur pre-emption logic samajhne ke liye |

Agar upar ke teeno concepts clear nahi hain to pehle basic microcontroller architecture padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Event to pending flag
Jab koi interrupt source active hota hai to uska pending bit set ho jata hai. Yeh bit hardware register mein hota hai aur software se bhi set/clear kiya ja sakta hai.  
Concrete example: GPIO pin 5 par rising edge aata hai to EXTI5 pending bit 1 ho jata hai.  
Formal statement:  
$$P_i \leftarrow 1 \quad \text{when event condition on source } i \text{ is true}$$  
> [!WARNING]
> Agar aap pending bit ko manually clear karna bhool jaayein to ISR baar-baar fire hota rahega aur system hang ho sakta hai.

### Step 2 — NVIC priority comparison
NVIC har pending interrupt ki priority ko current running priority se compare karta hai. Higher priority (lower numerical value) wala interrupt pre-empt karta hai.  
Formal statement:  
$$\text{Pre-empt if } \text{prio}(i) < \text{prio}(\text{current})$$

### Step 3 — Context save and vector fetch
Processor automatically R0–R3, R12, LR, PC aur PSR ko stack par push karta hai, phir vector table se ISR address load karta hai. Yeh latency ka bada hissa hota hai.

### Step 4 — ISR body design rules
ISR ke andar sirf minimal work karo: flag clear, data copy, aur scheduler wake-up signal. Heavy computation ko deferred task mein daalo.  
Formal rule: ISR execution time \(T_{\text{ISR}}\) must satisfy \(T_{\text{ISR}} \ll T_{\text{deadline}}\).

### Step 5 — Tail-chaining and late-arriving optimisation
Agar do interrupts almost same time par aayein to NVIC tail-chaining karta hai bina full context restore kiye, latency ko kam karta hai.

### Step 6 — Latency equation
Total interrupt latency:  
$$L = T_{\text{entry}} + T_{\text{vector}} + T_{\text{lockout}} + T_{\text{ISR-preamble}}$$

### Step 7 — Priority grouping and sub-priority
Cortex-M mein AIRCR register se 0–7 bits priority grouping configure karte hain, pre-emption aur sub-priority levels decide karte hain.

### Step 8 — Textbook-grade guarantee
Agar priorities unique hain aur ISR deterministic hai to worst-case latency bounded rehta hai aur system schedulability analysis possible hoti hai.

## 5. Worked examples — har step show karo

**Example 1 — Simple GPIO ISR flag clear**  
*Given:* EXTI0 pending bit set, priority 5.  
*Find:* ISR ka minimal code.  
Code:  
```c
void EXTI0_IRQHandler(void) {
    EXTI->PR = (1 << 0);   // clear pending
}
```  
*Why:* Pending bit clear karna zaroori hai warna interrupt repeat hoga.  
**Final answer**  
ISR sirf flag clear karta hai.  

*Reflection:* Yeh example trivial lagta hai lekin missing clear statement se system livelock mein ja sakta hai.

**Example 2 — UART receive with data copy**  
*Given:* 115200 baud UART, 32-byte buffer.  
*Find:* ISR latency contribution.  
Step-by-step: read DR register (1 cycle), store in circular buffer (3 cycles), increment head (1 cycle). Total 5 cycles @ 168 MHz = 30 ns.  
**Final answer**  
30 ns added to latency.  

*Reflection:* Buffer copy ko ISR mein rakhna sahi hai kyunki data loss ka risk hota hai.

**Example 3 — Priority pre-emption calculation**  
*Given:* Task A (prio 6) running, Timer (prio 3) arrives.  
*Find:* Pre-emption delay.  
NVIC turant switch karta hai kyunki 3 < 6. Latency = 12 cycles entry + 6 cycles vector.  
**Final answer**  
18 cycles worst-case.  

*Reflection:* Numerical priority values ulta sochna common galti hai.

**Example 4 — Latency bound with tail-chaining**  
*Given:* Two back-to-back timer interrupts, same group.  
*Find:* Combined latency.  
Normal entry 12 + tail-chain 6 = 18 cycles total.  
**Final answer**  
18 cycles instead of 24.  

*Reflection:* Tail-chaining real-time analysis mein latency ko significantly kam karta hai.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| ISR mein printf ya heavy loops    | Debugging convenience                       | ISR ko < 10 µs rakhna, use event flags       |
| Priority inversion by accident    | Low-priority ISR long time le leta hai      | Priority ceiling ya inheritance protocols     |
| Nested interrupt stack overflow   | Deep nesting without stack check            | Maximum nesting depth limit set karo         |
| Clearing wrong pending bit        | Bit-mask galti se likhna                    | Use (1 << n) macro                           |
| Disabling global interrupts too long | Critical section ko bada banana          | Use interrupt masking only for few instructions |
| Forgetting memory barriers        | Compiler reordering                         | __DSB() ya __ISB() use karo                  |
| Vector table misalignment         | Linker script galti                         | 128-byte aligned vector table ensure karo    |

## 7. The textbook-precise statement
In ARMv7-M architecture an interrupt i is taken when its pending bit is set, its priority is higher than the current execution priority, and it is enabled in the NVIC. The processor performs a context save of eight registers, fetches the vector from the table pointed by VTOR, and begins execution of the handler. Worst-case latency is bounded by the sum of the interrupt entry sequence (12 cycles) plus any ongoing instruction with interrupt-disable semantics. Source: ARM Cortex-M Technical Reference Manual, Section 5.3, “Interrupt Latency”.

## 8. Visual — diagram or schematic
```text
          Event arrives
               |
               v
   +-------------------+
   |  Pending bit set  |
   +-------------------+
               |
               v
   NVIC compares prio
   (lower number = higher prio)
               |
       +-------+-------+
       |               |
   Higher than     Lower or equal
   current            |
       |              v
       v          Wait in pending
  Context save
       |
       v
  Vector fetch
       |
       v
     ISR runs
```

## 9. The memory technique

1. **The hook** — NVIC ko ek strict traffic police inspector socho jo sabse urgent (lowest number) ambulance ko pehle raasta deta hai.
2. **What to overlearn** — Entry cost 12 cycles, tail-chain cost 6 cycles, aur priority numerical value jitna chhota utna urgent.
3. **Spaced-repetition schedule** — 1 din baad basic latency equation, 3 din baad priority grouping, 7 din baad ISR design rules, 16 din baad full pre-emption example, 35 din baad worst-case analysis.
4. **First-principles fallback** — Agar formula bhool jaayein to cycle-by-cycle processor manual se entry sequence count karo aur har register push ko alag-alag add karo.

## 10. What this unlocks
Yeh topic aapko deterministic real-time software likhne ke liye taiyar karta hai. Agla concepts directly depend karte hain:

- Rate-monotonic scheduling analysis
- Sporadic server design
- DMA + interrupt hybrid patterns
- Safety-critical certification (ISO 26262 ASIL levels)

## 11. Self-check — five questions, no answers
1. Ek ISR jo 50 µs leta hai usme 200 µs deadline wale event ko handle karna possible hai kya?
2. NVIC priority 0x00 aur 0x10 mein kaunsa interrupt pehle execute hoga?
3. Tail-chaining se latency kitni bach jaati hai jab do interrupts 1 cycle ke andar aate hain?
4. Agar aap global interrupt disable 100 µs ke liye karte hain to kaunsa worst-case latency impact padta hai?
5. AIRCR ke PRIGROUP field ko 3 set karne se kitne pre-emption levels milte hain?