## 1. The one-sentence answer
**Multicore coherence protocols are finite-state machines that keep every core’s private cache copy of a memory block identical in value whenever that block is readable.**

Jab multiple cores ek hi memory location ko cache karte hain, toh ek core write kare toh baaki cores ke purane copies turant invalid ya update ho jaani chahiye. Warna program galat result dega. Yeh protocols har cache line ke liye states (jaise Modified, Exclusive, Shared, Invalid) maintain karte hain aur bus ya directory messages ke through state transitions karte hain.

Aap soch sakte ho ki yeh ek distributed “book-keeping” system hai jisme har core apni cache line ki “permission” track karta hai — read permission ya write permission. Permission badalne ke liye messages jaate hain, aur yeh messages hi latency aur bandwidth ka kharcha banate hain.

> [!NOTE]
> Sabse badi aha yeh hai ki coherence sirf “data same rakhna” nahi hai; yeh actually har line ke liye ownership aur permission ka distributed lock table hai jo hardware mein fast chalta hai.

## 2. Why this matters — concrete and current
Intel’s Sapphire Rapids server CPUs 56 cores tak MESI-based directory coherence use karte hain taaki cloud VMs mein shared-memory workloads sahi chale.

ARM’s AMBA CHI protocol Apple M-series chips mein use hota hai; iske bina 8–20 performance cores ek dusre ke cache ko corrupt kar dete.

NVIDIA’s Grace CPU + Hopper GPU system mein directory-based coherence CPU aur GPU memory ke beech data movement ko control karti hai, jo exascale scientific simulations ke liye zaroori hai.

Google’s TPU v4 pods mein custom coherence protocol multi-chiplet training jobs ko consistent weight updates dikhata hai bina software-level locking ke.

ISCA 2022 paper “Cohere” ne dikhaya ki coherence traffic ko 40 % tak kam karne se datacenter power bill mein millions bach sakte hain.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Cache hierarchy          | Coherence protocols sirf L1/L2 ke beech kaam karte hain   |
| Write-back vs write-through | Protocol state sirf write-back caches ke liye define hota hai |
| Bus vs directory         | Message traffic ka source decide karta hai                |
| Memory consistency model | Coherence sirf single address ki correctness deti hai, ordering alag baat hai |

Agar cache hierarchy aur write-back policy clear nahi hai toh pehle woh padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Single cache line ownership
Ek cache line ek time pe sirf ek core ke paas Modified state mein ho sakti hai.  
Example: Core 0 ne address 0x1000 pe write kiya. Line ab Modified hai aur baaki sab Invalid.  
Formal statement:  
$$ \text{For any block } b, \sum_{c \in C} \mathbb{I}[\text{state}_c(b) = M] \le 1 $$  
> [!WARNING]
> Agar do cores simultaneously Modified claim kar lein toh data race aur silent corruption ho jaati hai.

### Step 2 — Read permission via Shared state
Jab koi core read maangta hai aur line Modified state mein hai, toh owner line ko flush karke Shared state mein daalta hai.  
Example: Core 1 read 0x1000 maangta hai. Core 0 line ko Shared kar deta hai aur data deta hai.  
Formal:  
$$ \text{state}_c(b) = S \implies \forall c' \neq c, \text{state}_{c'}(b) \in \{S, I\} $$

### Step 3 — Write permission via invalidation
Write karne ke liye core sab dusre cores ko invalidate message bhejta hai.  
Formal transition:  
$$ S \xrightarrow{\text{GetX}} M \quad \text{(all other copies become I)} $$

### Step 4 — Directory indirection (scale)
Bus-based protocols O(n) traffic dete hain. Directory har line ka home node rakhta hai jo current owners ki list store karta hai.  
Formal: Directory entry = (state, owner list).

### Step 5 — Silent eviction rule
Agar line Shared ya Exclusive state mein hai aur cache se nikal jaati hai toh directory ko batane ki zaroorat nahi. Sirf Modified line ko write-back karna padta hai.

## 5. Worked examples — har step show karo

**Example 1 — Simple read after write**  
*Given:* Core 0 writes 42 to address A; Core 1 later reads A.  
*Find:* Final states.  
Step 1: Core 0 issues GetX → line becomes M in Core 0. *Why:* write permission chahiye.  
Step 2: Core 1 issues GetS → Core 0 downgrades to S and supplies data. *Why:* read permission distribute karna hai.  
**Final states: Core 0 = S, Core 1 = S**

*Reflection:* Yeh example dikhaata hai ki read permission multiple cores mein ho sakti hai.

**Example 2 — Write after shared read**  
*Given:* A already Shared in Core 0 and Core 1. Core 0 ab write karta hai.  
Step 1: Core 0 issues GetX (upgrade). *Why:* Shared se Modified chahiye.  
Step 2: Directory/Core 1 ko invalidate bhejta hai. *Why:* exclusive ownership dena hai.  
**Final answer: Core 0 = M, Core 1 = I**

*Reflection:* Invalidation traffic coherence ka sabse bada overhead hai.

**Example 3 — Writeback on eviction**  
*Given:* Core 0 has line in M; OS decides to evict.  
Step: PutX message + data writeback. *Why:* Modified data memory mein daalna zaroori hai.  
**Final answer: Memory updated, line I everywhere**

**Example 4 — Directory forwarding**  
*Given:* 64-core system, directory at Core 0’s home. Core 5 reads, Core 17 has M.  
Directory Core 17 ko forward karta hai. *Why:* direct data transfer se latency kam hoti hai.  
**Final answer: Core 5 = S, Core 17 = S**

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Assuming bus is free        | Students sochte hain har request turant pahunchegi | Directory latency + contention model yaad rakho |
| Forgetting silent eviction  | Shared line nikal jaane par kuch nahi hota lagta | Sirf Modified lines ko writeback rule yaad rakho |
| Mixing coherence with consistency | Dono alag layers hain                       | Coherence = single address, Consistency = ordering |
| Ignoring false sharing      | Same cache line mein alag variables         | Padding ya different lines use karo          |
| Deadlock in directory       | Circular wait on GetX/GetS messages         | Virtual channels ya timeout rules yaad rakho |

## 7. The textbook-precise statement
Hennessy & Patterson, *Computer Architecture: A Quantitative Approach*, 6e, §5.8:  
“A cache-coherence protocol is a finite-state protocol that guarantees that (1) every read returns the value written by the most recent write to the same address and (2) writes to the same address are serialized.” All hypotheses: write-back caches, single-writer/multiple-reader invariant, and either snooping or directory interconnect.

## 8. Visual — diagram or schematic
```
          M (Modified)  <-- GetX --  E (Exclusive)
               |                       |
             PutX                    GetS
               |                       |
               v                       v
          I (Invalid)  <--- Invalidate ---  S (Shared)
```
States: M, E, S, I (MESI). Arrows show bus/directory messages.

## 9. The memory technique
**The hook:** Socho har cache line ek “hot potato” hai; sirf ek core usse khel sakta hai (Modified), warna sab dekh sakte hain (Shared).

**What to overlearn:** MESI four states and their transitions; directory entry = (state, sharer bit-vector).

**Spaced-repetition schedule:** 1 din baad, 3 din, 7 din, 16 din, 35 din.

**First-principles fallback:** Agar states bhool jaayein toh do rules yaad rakho — “single writer” aur “writeback on eviction” — uske hisaab se states derive kar lo.

## 10. What this unlocks
Yeh topic aapko memory consistency models, relaxed memory ordering, aur hardware transactional memory samajhne ke liye taiyaar karta hai.

- Next: Sequential consistency vs TSO
- Next: Directory vs snooping trade-offs at 128+ cores
- Next: Cache coherence in GPUs and CXL-attached memory

## 11. Self-check — five questions, no answers
1. Ek 4-core system mein jab Core 2 GetX bhejta hai tab kitne invalidate messages ban sakte hain?
2. Agar directory har line ke liye 64-bit sharer vector rakhe toh 1 GB cache ke liye kitna directory storage lagega?
3. MESI protocol mein Exclusive state ka fayda kya hai?
4. False sharing kis tarah coherence traffic badhaata hai?
5. Agar aap MOESI add kar dein toh Owner state kis problem ko solve karti hai?