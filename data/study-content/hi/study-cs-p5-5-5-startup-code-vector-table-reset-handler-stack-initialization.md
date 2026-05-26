## 1. The one-sentence answer

**Startup code sets up the vector table, reset handler, and initial stack pointer so that a bare-metal embedded program can begin execution from hardware reset without relying on any operating system.**

Yeh code har baar jab microcontroller power-on ya reset hota hai sabse pehle run hota hai. Iska kaam hai processor ke internal registers ko sahi state mein laana, memory ko initialise karna, aur finally main() function tak pahunchna. Bina iske C program kabhi execute nahi hoga kyunki stack pointer aur interrupt vectors undefined rehte hain.

Aap soch sakte ho ki yeh ek chhota bootloader jaisa hai jo sirf reset ke turant baad chalta hai. Modern MCUs (jaise ARM Cortex-M) mein yeh code linker script aur assembly files ke through chip ke memory map mein pehle se place hota hai.

> [!NOTE]
> Vector table ka pehla entry hamesha initial stack pointer hota hai aur doosra entry reset handler ka address; yeh dono values hardware directly read karta hai reset ke baad.

## 2. Why this matters — concrete and current

In automotive ECUs from Bosch and Continental, the startup code must finish within 5 ms after power-on so that safety-critical CAN communication can start before the vehicle’s 12 V rail stabilises.

NASA’s Perseverance rover uses a Cortex-R5 reset handler that configures the stack in TCM (Tightly Coupled Memory) before any C++ exception tables are initialised, ensuring radiation-induced resets do not corrupt the call stack.

STM32H7 series MCUs in high-end audio equipment from Sony initialise the stack pointer to the top of DTCM before enabling the FPU; missing this step causes silent floating-point register corruption on the first interrupt.

In the SiFive HiFive Unmatched board, the reset handler copies the vector table from flash into SRAM so that interrupt latency stays deterministic when running real-time Linux alongside bare-metal control loops.

Infineon’s Aurix TC3xx safety MCUs require the startup code to lock the stack pointer into a protected memory region before any ASIL-D task begins; this is verified by hardware CRC checks at every reset.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Memory map & sections    | Linker places vector table and stack at exact addresses   |
| ARM Cortex-M calling convention | Reset handler must set SP before any C function call     |
| Interrupt vector layout  | Hardware fetches the first two words directly from address 0x00000000 |
| Linker script syntax     | .isr_vector and .stack sections must be defined explicitly |

Agar aap inme se kisi bhi concept ko nahi jaante, toh pehle woh padh lo warna yeh lesson adhura rahega.

## 4. Building the idea — from intuition to formalism

### Step 1 — Reset vector fetch
Processor reset ke turant baad address 0x00000000 se do 32-bit words read karta hai. Pehla word initial stack pointer ban jaata hai, doosra word reset handler ka entry point.

Concrete example: STM32F103 reset pe 0x20005000 (stack top) aur 0x08000041 (reset handler address +1 for Thumb) padhta hai.

Formal statement:
$$
\text{SP}_\text{init} \leftarrow \text{Mem}[0x00000000],\quad \text{PC} \leftarrow \text{Mem}[0x00000004]
$$

> [!WARNING]
> Agar yeh dono words flash ke valid region mein na hon toh processor lock-up state mein chala jaata hai aur koi debug message nahi milta.

### Step 2 — Vector table placement
Vector table ek array of function pointers hoti hai jisme har entry ek interrupt ka handler address rakhti hai. Table ka base address SCB->VTOR register se set hota hai.

### Step 3 — Reset handler responsibilities
Reset handler sabse pehle clock, watchdog aur memory protection ko configure karta hai, phir data sections ko RAM mein copy karta hai aur .bss ko zero karta hai.

### Step 4 — Stack pointer initialisation
SP ko ek valid RAM address pe set karna zaroori hai warna pehla function call stack overflow kar dega. Aksar yeh value linker script se aati hai.

### Step 5 — C runtime startup
Reset handler ke end mein __libc_init_array aur main() ko call kiya jaata hai. Iske baad interrupts enable hote hain.

### Step 6 — Formal startup contract
Ek correct startup sequence satisfy karti hai:
$$
\text{ResetHandler} \equiv \text{InitClocks} \circ \text{CopyData} \circ \text{ZeroBss} \circ \text{SetSP} \circ \text{main}
$$

## 5. Worked examples — har step show karo

**Example 1 — Minimal vector table in assembly**
*Given:* 4-entry vector table for Cortex-M0.
*Find:* Correct placement of initial SP and reset handler.
```
    .section .isr_vector,"a",%progbits
    .word 0x20001000          /* initial SP */
    .word Reset_Handler + 1   /* Thumb bit set */
    .word 0
    .word 0
```
*Why:* Linker is section ko address 0x08000000 pe place karega jahaan hardware reset pe padhega.

**Final answer**
```
0x08000000: 0x20001000
0x08000004: 0x08000009   (Reset_Handler + 1)
```

*Reflection:* Yeh example isliye simple thi kyunki koi runtime initialisation nahi thi; asli code mein data copy bhi add karna padta hai.

**Example 2 — Reset handler with stack setup**
*Given:* Linker defined symbol _estack.
*Find:* Assembly to set SP before calling C code.
```
Reset_Handler:
    LDR   r0, =_estack
    MOV   sp, r0
    BL    SystemInit
    BL    main
```
*Why:* Pehle SP set karna zaroori hai warna BL instruction stack use karega aur crash hoga.

**Final answer**
SP = _estack before any C call.

*Reflection:* Agar SystemInit ke andar bhi stack operations hain toh yeh order galat ho jaayega.

**Example 3 — Full data and bss initialisation**
*Given:* Symbols _sidata, _sdata, _edata, _sbss, _ebss.
*Find:* Correct copy and zero loops.
```
    ldr r0, =_sidata
    ldr r1, =_sdata
    ldr r2, =_edata
copy_loop:
    cmp r1, r2
    ittt lt
    ldrlt r3, [r0], #4
    strlt r3, [r1], #4
    blt copy_loop
```
*Why:* Flash se RAM mein .data copy karna padta hai kyunki initialised variables flash mein stored hote hain.

**Final answer**
.data copied, .bss zeroed, then main called.

*Reflection:* Missing the compare-before-write loop is a common source of random RAM corruption.

**Example 4 — VTOR relocation after SRAM copy**
*Given:* Vector table copied to 0x20000000.
*Find:* Correct SCB write.
```
    LDR r0, =0xE000ED08   /* SCB_VTOR */
    LDR r1, =0x20000000
    STR r1, [r0]
```
*Why:* SRAM mein vector table rakhne se runtime mein interrupt handlers ko patch karna possible hota hai.

**Final answer**
VTOR = 0x20000000

*Reflection:* Agar yeh step reset handler ke bahut late kiya jaaye toh early interrupts galat vector le sakte hain.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                | How to avoid it                              |
|-----------------------------------|-----------------------------------------------|----------------------------------------------|
| Forgetting Thumb bit (+1)         | ARM/Thumb interworking rule                   | Always add +1 to function addresses in vectors |
| Stack placed in uninitialised RAM | .stack section after .bss in linker script    | Place .stack at the highest valid RAM address |
| VTOR not updated after copy       | Default vector table stays in flash           | Write SCB->VTOR immediately after RAM copy   |
| main() called before .bss zero    | Uninitialised globals contain garbage         | Zero .bss before any C call                  |
| Watchdog not fed during long init | Long clock configuration exceeds timeout      | Feed watchdog in the middle of Reset_Handler |
| Multiple definition of Reset_Handler | Same symbol in both startup.s and HAL        | Use weak attribute or remove duplicate file  |
| SP set after first BL             | First C function already used stack           | Set SP in the very first two instructions    |

## 7. The textbook-precise statement

In Joseph Yiu’s “The Definitive Guide to Arm Cortex-M0 and Cortex-M0+ Processors”, 2nd ed., §4.3, the reset sequence is defined as: “On reset, the processor reads the initial Main Stack Pointer (MSP) value from address 0x00000000 and the reset vector from address 0x00000004. Execution begins in Privileged Thread mode with the MSP selected. All interrupts are disabled until explicitly enabled by software.”

## 8. Visual — diagram or schematic

```
Flash (0x08000000)          SRAM (0x20000000)
+------------------+        +------------------+
| 0x20005000       | SP --> |                  |
| Reset_Handler+1  |        | .data            |
| NMI_Handler+1    |        | .bss             |
| HardFault+1      |        | Heap             |
| ...              |        | Stack (downward) |
+------------------+        +------------------+
          ^                         ^
          | hardware reads          | SP grows
          | at reset                | downward
```

## 9. The memory technique

**The hook** — Picture a soldier standing at address zero holding two pieces of paper: the top paper is the stack address (where he can safely put his backpack), the second paper is the map to the reset tent.

**What to overlearn** — Vector table must start at 0x00000000 (or VTOR value); first word = initial SP, second word = reset handler address with Thumb bit set.

**Spaced-repetition schedule** — Review the two-word reset fetch rule after 1 day, 3 days, 7 days, 16 days and 35 days.

**First-principles fallback** — Agar rule bhool jaaye toh yaad karo ki hardware ko sirf do values chahiye: ek valid stack aur ek valid code address; baaki sab software kar sakta hai.

## 10. What this unlocks

Yeh concept aapko real-time operating system porting, bootloader development aur safety-critical firmware certification ke liye taiyar karta hai.

- Writing bare-metal drivers jo pehle interrupt se pehle run hote hain
- Implementing OTA update mechanisms jo apne aap vector table relocate karte hain
- Meeting ISO 26262 ASIL-D requirements jo deterministic stack initialisation maangte hain

## 11. Self-check — five questions, no answers

1. Agar vector table ka pehla entry 0x00000000 hai toh processor kya karega?
2. Reset handler mein SP set karne ke pehle BL instruction use karna kyun fatal hai?
3. Linker script mein .stack section ko .bss ke baad rakhne se kya problem aayegi?
4. VTOR register update karna kab zaroori ho jaata hai aur kab nahi?
5. Ek reset handler jo 200 ms clock setup mein busy rehta hai, watchdog ke saath kaise coexist karega?