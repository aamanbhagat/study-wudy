## 1. The one-sentence answer
**Contiguous memory allocation ke teen popular heuristics — first-fit, best-fit aur worst-fit — ek process ko ek hi continuous block mein memory dene ke liye alag-alag tareeke hain.**

Pehla fit wala rule sirf pehla free block dhundta hai jo process ke size se bada ya barabar ho. Best-fit wala sabse chhote suitable block ko choose karta hai taaki baaki space kam waste ho. Worst-fit wala sabse bade free block ko pakadta hai taaki badi chunks bachi rahein. Yeh teen algorithms external fragmentation ko handle karne ke alag-alag tareeke hain lekin koi bhi perfect nahi hota.

In teeno ka asli kaam yeh hai ki jab operating system ko ek process ke liye contiguous space chahiye, tab woh free list mein se ek block turant de sake. Har algorithm ka apna trade-off hai speed aur fragmentation ke beech.

> [!NOTE]
> Sabse badi aha yeh hai ki yeh algorithms sirf placement decide karte hain; woh fragmentation ko khatam nahi karte, sirf uske pattern ko badalte hain.

## 2. Why this matters — concrete and current
Linux kernel ke buddy allocator mein first-fit jaisa fast path use hota hai jab chhote pages jaldi chahiye hote hain, jaise network packet buffers ke liye. Google ke data-center schedulers (Borg/Omega) best-fit style heuristics lagate hain taaki large ML training jobs ke liye contiguous GPU memory mile bina baar-baar compaction ke.

Semiconductor fabs mein real-time process control systems (jaise ASML ke lithography machines) worst-fit allocation choose karte hain kyunki unke buffers bahut bade aur irregular hote hain aur ek baar allocate hone ke baad kabhi move nahi kar sakte. Modern Android ART runtime bhi first-fit variant use karta hai native heap allocation ke liye taaki low-end devices par allocation latency kam rahe.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Contiguous address space | Process ko ek hi continuous range chahiye, warna pointer arithmetic toot jaayegi |
| Free list / hole list    | Available blocks ko track karna padta hai                 |
| Internal vs external fragmentation | Samajhna zaroori hai kyunki yeh algorithms external fragmentation ko affect karte hain |
| Process size request     | Har allocation request ek fixed integer size hoti hai     |

Agar upar wale concepts clear nahi hain to pehle basic memory management section padho.

## 4. Building the idea — from intuition to formalism

### Step 1 — Memory ko ek line of boxes ki tarah socho
Ek contiguous memory ko ek line of fixed-size boxes maano jisme kuch boxes occupied hain aur kuch free. Jab naya process aata hai to usko ek continuous sequence of free boxes chahiye. Agar free boxes beech-beech mein scattered hain to allocation fail ho sakti hai even if total free space kaafi ho.

Example: 10 boxes hain, positions 0-9. Agar 2-4 aur 6-7 occupied hain to 8,9,0,1 free hain lekin koi bhi 5-box wala process nahi chalega.

Formal statement: Let \( M = [0..N-1] \) be the address space aur let \( F \) ek set of free intervals ho. Allocation ke liye ek interval \( [s, s + p - 1] \subseteq F \) chahiye jahaan \( p \) process size hai.

> [!WARNING]
> Agar aap sirf total free space count karoge aur contiguous check nahi karoge to allocation galat ho jaayegi.

### Step 2 — First-fit rule define karo
First-fit free list ko front se scan karta hai aur pehla block choose karta hai jo \( p \) se bada ya barabar ho. Iska matlab list ordering matter karti hai.

Formal: \( \text{first-fit}(F, p) = \min \{ b \in F \mid |b| \ge p \} \) jahaan min list order ke hisaab se liya jaata hai.

### Step 3 — Best-fit rule define karo
Best-fit har free block ko check karta hai aur sabse chhota block choose karta hai jo \( p \) ko accommodate kar sake. Yeh search poori list par hota hai.

Formal: \( \text{best-fit}(F, p) = \arg\min_{b \in F, |b| \ge p} (|b| - p) \).

### Step 4 — Worst-fit rule define karo
Worst-fit sabse bada free block choose karta hai. Idea yeh hai ki bada block todne se baaki badi chunks bach jaayein jo future badi requests ke liye kaam aa sakein.

Formal: \( \text{worst-fit}(F, p) = \arg\max_{b \in F, |b| \ge p} |b| \).

### Step 5 — Fragmentation impact formalise karo
External fragmentation tab hoti hai jab free space total mein kaafi ho lekin koi single contiguous block process size ke barabar na ho. Har algorithm ka alag fragmentation signature hota hai.

## 5. Worked examples — har step show karo

**Example 1 — Simple first-fit**
*Given:* Free blocks: [0-4], [6-9], [12-15]. Process request = 3 units.
*Find:* Kaunsa block milega.
Pehle block [0-4] check karo, size 5 ≥ 3, isliye yahi allocate.  
*Why:* First-fit list ke starting se dekhta hai aur pehla suitable block le leta hai.  
**Allocated block: [0-2]**

*Reflection:* Yeh example simple hai lekin dikhata hai ki ordering list ke hisaab se kaise result change karti hai.

**Example 2 — Best-fit on same memory**
*Given:* Same free blocks aur request = 3.
Sabse chhota suitable block dhundo: [0-4] waste 2, [6-9] waste 1, [12-15] waste 2. [6-9] sabse chhota waste deta hai.  
*Why:* Best-fit har block ka remainder calculate karta hai aur minimum remainder wala block leta hai.  
**Allocated block: [6-8]**

*Reflection:* Best-fit chhote holes banata hai jo baad mein aur bhi mushkil se use hote hain.

**Example 3 — Worst-fit allocation**
*Given:* Free blocks [0-4], [6-9], [12-20]. Request = 3.
Sabse bada block [12-20] hai, isliye wahi allocate.  
*Why:* Worst-fit bade blocks ko todta hai taaki future badi requests ke liye space bachi rahe.  
**Allocated block: [12-14]**

*Reflection:* Yeh strategy tab useful hoti hai jab request sizes bahut vary karti hain.

**Example 4 — Mixed sequence with all three**
*Given:* Memory 0-19, free initially [0-19]. Requests in order: 5, 3, 6, 4. Use first-fit, then repeat with best-fit.
First-fit: 5 → [0-4], 3 → [5-7], 6 → [8-13], 4 → [14-17].  
Best-fit: 5 → [0-4], 3 → [5-7], 6 → [8-13], 4 → [14-17] (same in this case).  
*Why:* Sequence aur sizes decide karte hain kab algorithms alag result dete hain.  
**Final free blocks (first-fit): [18-19]**

*Reflection:* Real systems mein request sequence unpredictable hoti hai isliye simulation zaroori hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Assuming best-fit always best | Students sochte hain chhota block waste kam karega | Simulate multiple sequences before deciding  |
| Ignoring list ordering      | First-fit result list ke order par depend karta hai | Free list ko address order mein maintain karo |
| Forgetting to split blocks  | Block pura allocate kar dete hain           | Allocation ke baad remainder ko naye free block ke roop mein daalo |
| Comparing only average case | Worst-case fragmentation miss ho jaata hai  | At least 3-4 different request patterns try karo |
| Not updating free list      | Allocate karne ke baad list update nahi karte | Har allocation/deallocation ke baad list rebuild karo |

## 7. The textbook-precise statement
In contiguous allocation, given a set of free holes \( H = \{h_1, h_2, \dots, h_k\} \) where each \( h_i = [a_i, b_i] \) with \( b_i - a_i + 1 \ge p \), first-fit returns the hole with smallest starting address, best-fit returns the hole minimizing \( (b_i - a_i + 1) - p \), and worst-fit returns the hole maximizing \( b_i - a_i + 1 \). All three maintain the invariant that the allocated region remains a single contiguous interval. (Silberschatz, Galvin, Gagne, *Operating System Concepts*, 10e, §9.3)

## 8. Visual — diagram or schematic
```
Address: 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15
State:   [P1][P1][  ][  ][P2][P2][  ][  ][  ][  ][P3][P3][  ][  ][  ][  ]
Free:        hole1(2)         hole2(4)               hole3(4)
```
Labels: P1=occupied by process 1, hole1 = first free interval of size 2, etc.

## 9. The memory technique
**The hook** — Imagine three shopkeepers: first-fit wala pehla customer jo aaye usko pehla shelf deta hai, best-fit wala sabse chhoti jagah deta hai, worst-fit wala sabse badi khali jagah tod ke deta hai.

**What to overlearn** — First-fit = O(n) average but fast in practice; best-fit minimises immediate waste; worst-fit maximises largest remaining block.

**Spaced-repetition schedule** — 1 din baad ek example solve karo, 3 din baad do alag sequences compare karo, 7 din baad fragmentation calculate karo, 16 din baad textbook statement likho, 35 din baad ek chhota simulator mentally run karo.

**First-principles fallback** — Agar rule bhool jaaye to yaad karo: list scan karo, size condition check karo, aur ek hi rule (min address / min remainder / max size) apply karo.

## 10. What this unlocks
Yeh section aapko samjhaata hai ki contiguous allocation ka placement policy kaise kaam karta hai. Iske baad aap non-contiguous schemes (paging, segmentation), compaction algorithms aur buddy allocator samajh sakte ho.

- Next: Paging and page tables
- Next: Internal vs external fragmentation comparison
- Next: Compaction and coalescing techniques

## 11. Self-check — five questions, no answers
1. Ek free list [0-9], [12-19] par first-fit aur best-fit mein 4-unit request ke liye kaunsa block milega?
2. Kyun best-fit kabhi-kabhi external fragmentation badha deta hai?
3. Worst-fit ka worst-case time complexity kya hai aur kyun?
4. Agar free list address order mein nahi rakhi to first-fit ka result kya hoga?
5. Ek sequence do jisme first-fit successful ho lekin best-fit fail ho jaaye (ya vice-versa).