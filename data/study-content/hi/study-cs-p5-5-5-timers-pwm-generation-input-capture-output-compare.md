## 1. The one-sentence answer
**Timers in microcontrollers use hardware counters plus compare/capture registers to generate precise PWM waveforms, measure external signal timing, and trigger actions at exact instants without CPU intervention.**

Yeh basically ek free-running counter hota hai jo clock ticks count karta hai. Jab aap us count ko ek register se compare karte ho to pin state change ho sakta hai ya interrupt aa sakta hai. Input capture mein external edge aane par counter ki current value ko ek register mein copy kar dete hain. PWM iska ek special case hai jisme on-time aur period dono ko compare registers se control kiya jata hai.

Iska matlab yeh hai ki real-time constraints meet karne ke liye aap software loops ki bajaye hardware timer modules ka use karte ho. Ek baar configure karne ke baad timer independently chalta rehta hai aur deterministic timing deta hai.

> [!NOTE]
> Sabse badi aha yeh hai ki ek hi timer peripheral teeno kaam (PWM, input capture, output compare) ek saath kar sakta hai kyunki woh sirf ek counter aur kuch compare/capture channels share karta hai.

## 2. Why this matters — concrete and current
STM32F4 series microcontrollers mein TIM1–TIM14 modules drone flight controllers (Betaflight, ArduPilot) mein ESC signals generate karne ke liye PWM mode mein chalte hain. Har motor ko 50 µs resolution chahiye hota hai.

Tesla Model 3 inverter gate drivers output-compare channels se dead-time controlled PWM banate hain. 100 kHz switching frequency par timing error 10 ns se kam rakhna padta hai.

NASA’s Perseverance rover ke motor controllers input-capture mode mein wheel encoder pulses capture karte hain. 1 µs resolution se wheel odometry calculate hoti hai.

Infineon AURIX TC3xx automotive MCUs mein ASIL-D safety ke liye output-compare se redundant PWM pairs banaye jaate hain. Agar ek channel fail ho to backup channel automatically switch ho jata hai.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                      |
|----------------------------|-----------------------------------------------------------|
| Prescaler & counter overflow | Period aur resolution decide karne ke liye                |
| Interrupt latency          | Output-compare events ko deterministic banane ke liye     |
| GPIO alternate functions   | Timer channels ko physical pins se connect karne ke liye  |
| Edge polarity              | Input capture mein rising/falling edge choose karne ke liye |

Agar upar ke concepts clear nahi hain to pehle basic timer overflow aur NVIC interrupt handling padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Counter as a free-running clock
Ek timer module ek n-bit counter rakhta hai jo har clock tick par increment hota hai. Aap prescaler se effective tick rate kam kar sakte ho.

Example: 16 MHz clock, prescaler = 15 → har microsecond ek tick.

Formal statement:  
$$ CNT(t) = \left\lfloor \frac{f_{clk}}{PSC+1} \cdot t \right\rfloor \bmod 2^N $$

> [!WARNING]
> Agar aap overflow flag clear karna bhool gaye to next compare event miss ho sakta hai.

### Step 2 — Output Compare channel
Compare register (CCR) mein value load karo. Jab CNT == CCR ho to hardware pin state change kar deta hai aur interrupt flag set ho jata hai.

Formal:  
$$ \text{Action occurs when } CNT = CCR_x $$

### Step 3 — PWM as two chained compares
PWM mode mein ek channel period (ARR) set karta hai aur dusra duty cycle (CCR) set karta hai. Counter reset hone par pin high aur CCR match par low ho jata hai.

### Step 4 — Input Capture
External pin par edge aane par hardware CNT ki current value ko CCR mein latch kar deta hai aur interrupt generate karta hai. Isse pulse width ya period measure hota hai.

Formal:  
$$ t_{event} = \frac{CCR_{captured}}{f_{timer}} $$

### Step 5 — Combining modes on same timer
Ek hi timer ke alag channels alag modes mein chal sakte hain. Example: channel 1 PWM generate kare, channel 2 input capture kare.

## 5. Worked examples — har step show karo

**Example 1 — Simple 1 kHz 50 % PWM**
*Given:* 16 MHz timer clock, 16-bit timer.  
*Find:* ARR aur CCR values.

Step 1: Prescaler = 15 → 1 MHz tick rate.  
*Why:* 16 MHz / 16 = 1 MHz.  
Step 2: Period = 1000 ticks → ARR = 999.  
*Why:* 1 MHz / 1000 Hz = 1000.  
Step 3: 50 % duty → CCR = 499.  
**Final answer**  
ARR = 999, CCR = 499

*Reflection:* Yeh example isliye simple thi kyunki frequency aur duty dono directly ARR aur CCR se map ho rahe the.

**Example 2 — Input capture for 1 ms pulse**
*Given:* Rising edge par capture, falling edge par capture.  
*Find:* Pulse width.

Captured values: CCR_rise = 1200, CCR_fall = 2200 (same timer overflow nahi hua).  
Pulse width = (2200 − 1200) / 1 MHz = 1 ms.  
**Final answer**  
1 ms

*Reflection:* Overflow handle karna padta hai jab difference negative aaye.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to enable timer clock in RCC | Peripheral clock gate off by default        | RCC->APB1ENR |= (1<<3) likhna yaad rakho     |
| Reading CCR before clearing flag  | Flag clear karne se pehle naya capture overwrite ho jata hai | Capture flag clear karne ke baad hi read karo |
| Wrong polarity on input capture   | Rising/falling bit galat set               | Datasheet mein TI1FP1 polarity check karo    |
| ARR update immediate vs buffered  | PWM glitch hota hai jab ARR turant change ho | Use preload bit (ARPE)                       |

## 7. The textbook-precise statement
From Yiu, *The Definitive Guide to ARM Cortex-M3 and Cortex-M4 Processors*, 3e, §14.3:  
“A general-purpose timer provides up to four independent channels. Each channel can be configured as output compare, PWM, or input capture. In output-compare mode the counter value is continuously compared with the content of the CCRx register. When a match occurs the corresponding output pin is set, cleared or toggled according to the OCxM bits and an interrupt or DMA request can be generated.”

## 8. Visual — diagram or schematic
```text
Timer Clock → Prescaler → CNT (16-bit)
                  ↑            ↓
               ARR (period)   == CCR1 → Output pin (PWM)
                              == CCR2 → Output pin (OC)
External pin → Edge Detect → CCR3 (capture)
```

## 9. The memory technique
**The hook** — Socho timer ek “digital stopwatch” hai jisme aap alarm (compare) laga sakte ho aur “lap time” (capture) bhi le sakte ho.

**What to overlearn**  
- PWM period = (ARR+1) / f_timer  
- Capture resolution = 1 / f_timer

**Spaced-repetition schedule**  
1 din, 3 din, 7 din, 16 din, 35 din.

**First-principles fallback**  
Agar formula bhool jao to CNT ko clock se count karte hue dekho aur match hone par action socho.

## 10. What this unlocks
Yeh concept real-time control loops, motor control aur sensor timestamping ki foundation hai.

- Next: DMA + timer triggered ADC sampling
- Next: Quadrature encoder interface mode
- Next: HRTIM (high-resolution timer) in STM32G4

## 11. Self-check — five questions, no answers
1. 20 MHz clock, prescaler 7, ARR 1999 se PWM frequency kya hogi?
2. Input capture mein agar overflow flag set ho to captured value kaise adjust karoge?
3. Output-compare interrupt latency 5 µs hai. 100 kHz PWM par kitna jitter ho sakta hai?
4. Ek hi timer ke do channels mein se ek PWM aur dusra input capture mode mein chal sakta hai? Kyun ya kyun nahi?
5. ARR preload off karne par kya galat ho sakta hai jab aap running PWM ki frequency badal rahe ho?