## 1. The one-sentence answer
**Amortized O(1) operations** ka matlab hai ki hash table mein insert, search aur delete ka average cost har operation ke liye constant time rehta hai, even jab resizing hoti hai.

Hash tables collision handling ke saath direct addressing use karte hain, isliye load factor low rakhne par har operation expected O(1) hota hai. Lekin jab table full hone lage, tab double size karna padta hai aur saare elements rehash karne padte hain. Yeh costly step lagta hai, par agar us cost ko pehle ke kai operations par spread kar diya jaaye to overall per-operation cost abhi bhi O(1) hi rehta hai. Amortized analysis isi spreading ko formally prove karti hai.

> [!NOTE]
> Sabse badi aha yeh hai ki ek badi costly operation (resizing) ko kai sasti operations ke saath milakar dekhne se overall time bound O(1) ban jaati hai, bina worst-case guarantee ke.

## 2. Why this matters — concrete and current
Google’s LevelDB aur Bigtable dono internal hash tables par rely karte hain jahaan write-heavy workloads ke liye amortized O(1) insert zaroori hai; resizing spikes ko background compaction ke saath absorb kiya jaata hai taaki tail latency controlled rahe.

Redis ke hash table implementation mein incremental resizing use hoti hai, jisse ek single client command kabhi bhi O(n) time na le; yeh technique Amazon DynamoDB ke high-throughput key-value paths mein bhi dikhti hai.

Modern JVM ki HashMap class (Java 8+) treeified bins ke saath amortized O(1) maintain karti hai, aur yeh behaviour Spark aur Flink jaise distributed frameworks ke shuffle phase ko directly affect karti hai.

Semiconductor design tools jaise Synopsys VCS mein signal-name lookup tables hash-based hote hain; millions of gates ke liye fast lookup ke bina simulation runtime exponentially badh jaata hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Load factor          | Resize kab trigger hoga yeh decide karta hai              |
| Collision resolution | Chaining ya open addressing ke cost ko samajhna zaroori hai |
| Dynamic array resize | Resizing ka actual O(n) cost kya hota hai                 |
| Aggregate method     | Total cost ko n operations par divide karke average nikaalna |

Agar inme se koi bhi weak hai to pehle us section ko revise karo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Hash table without resizing
Plain hash table fixed size ka hota hai. Agar load factor low rahe to har insert/search expected O(1) hota hai kyunki collisions kam hote hain.

Example: 8-slot table mein 3 elements daalne par koi collision nahi, har operation ek array access hai.

Formal statement: Expected time for search = \(1 + \alpha\) jahaan \(\alpha = n/m\) load factor hai.

> [!WARNING]
> Agar table fixed rahe aur n badhe to \(\alpha > 1\) ho jaane par chains lambi ho jaati hain aur time O(n) ban jaata hai.

### Step 2 — Trigger for resizing
Jab \(\alpha\) threshold (usually 0.7) cross kare, table size double kar dete hain. Yeh step O(n) time leta hai kyunki har element naya hash location paata hai.

Example: 8 slots se 16 slots par jaane ke liye 8 elements ko rehash karna padta hai.

Formal: Resize cost = \(\Theta(n)\) jab n = current number of elements.

### Step 3 — Aggregate cost over sequence
m insertions ke sequence mein sirf \(\log m\) baar resize hoti hai (size 1, 2, 4, …, m). Har resize ka cost us time ke elements jitna hota hai.

Total cost = \(O(m) + \sum_{i=1}^{\log m} O(2^i) = O(m)\).

Isliye per operation amortized cost \(O(1)\).

### Step 4 — Accounting method view
Har insert operation se 3 “coins” charge karo. 1 coin actual insert ke liye, 2 coins future resizing ke liye save karo. Jab resize aaye to saved coins kaafi hote hain.

Formal: Potential function \(\Phi = 2n - m\) (m = capacity). Har operation potential badalta hai lekin total amortized cost bounded rehta hai.

### Step 5 — Load factor control
Resize ke baad naya \(\alpha \leq 0.5\) ho jaata hai. Isse agle resize tak kaafi operations chal sakte hain bina performance girne ke.

### Step 6 — Textbook bound
Cormen et al. ke hisaab se, dynamic table operations ka amortized cost exactly \(O(1)\) hota hai jab doubling strategy use ki jaaye.

## 5. Worked examples — har step show karo

**Example 1 — Simple insert without resize**
- *Given:* 8-slot hash table, 3 inserts.
- *Find:* Total cost.
Pehle insert: 1 probe → cost 1.  
Doosra insert: 1 probe → cost 1.  
Teesra insert: 1 probe → cost 1.  
*Why:* No collision aur no resize.  
**Total cost = 3, amortized per op = 1**

*Reflection:* Yeh case trivial hai; asli complexity resize ke time aati hai.

**Example 2 — Sequence with one resize**
- *Given:* Start with size 4, insert 5 elements (load factor threshold 0.75).
- *Find:* Amortized cost.
Pehle 3 inserts: each O(1), total 3.  
4th insert triggers resize (cost 4) + insert (1) = 5.  
5th insert: O(1) = 1.  
Total cost = 3 + 5 + 1 = 9.  
*Why:* 9 operations ka total 9, per op 9/5 = 1.8.  
**Amortized cost ≈ 1.8**

*Reflection:* Single O(n) step ko spread karne se average abhi bhi constant dikhta hai.

**Example 3 — Full power-of-two sequence**
- *Given:* n = 8 inserts starting from size 1.
- *Find:* Exact total cost.
Resizes at 1→2 (cost 1), 2→4 (cost 2), 4→8 (cost 4).  
Normal inserts: 8.  
Total = 1 + 2 + 4 + 8 = 15.  
*Why:* Geometric series sums to less than 2n.  
**Amortized cost < 2 per insert**

*Reflection:* Doubling strategy ki wajah se sum 2n - 1 hota hai.

**Example 4 — Accounting method calculation**
- *Given:* Same 8 inserts.
- *Find:* Coins collected vs spent.
Har insert 3 coins lete hain → 24 coins.  
Actual spent: 15.  
*Why:* Extra coins future resizes ke liye safe hain.  
**Amortized cost exactly 3 (constant)**

*Reflection:* Accounting method potential function ke through formal guarantee deta hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Worst-case O(n) ko amortized se confuse karna | Students ek badi resize ko dekh kar sochte hain har op costly hai | Aggregate ya accounting method se total cost calculate karo |
| Fixed-size table assume karna | Resize logic ko ignore kar dete hain        | Hamesha doubling threshold check karo        |
| Load factor 1.0 par resize  | Threshold galat set karna                   | 0.7 ya 0.75 threshold use karo               |
| Rehash cost ko O(1) samajhna | Har element ko naya slot milna padta hai    | Rehash ko explicitly O(n) likho              |
| Incremental resize bhoolna  | Modern systems mein hota hai                | Basic analysis ke liye full resize use karo  |
| Potential function galat set karna | Coins ya potential mismatch hota hai     | \(\Phi = 2n - m\) verify karo                |

## 7. The textbook-precise statement
A dynamic table supports INSERT and DELETE in amortized \(O(1)\) time using the doubling/halving strategy. Let \(T\) be a table of size \(m\) containing \(n\) elements. Whenever \(n = m\), the table is immediately replaced by a new table of size \(2m\) and all elements are rehashed. The aggregate analysis shows that the total cost of a sequence of \(n\) insertions starting from an empty table is at most \(3n - 2\), hence the amortized cost per insertion is at most 3. (Cormen et al., *Introduction to Algorithms*, 4e, Chapter 17, Theorem 17.1)

## 8. Visual — diagram or schematic
```text
Time (ops) → 1 2 3 4 5 6 7 8 9 ...
Cost spikes:   1 1 1 5 1 1 1 9 1 ...
             |   resize@4   |   resize@8
```
Y-axis: cost per op (height of bar).  
X-axis: operation number.  
Spikes exactly power-of-two positions par aate hain aur height current n ke barabar hoti hai.

## 9. The memory technique
1. **The hook** — Resize ko “mehngi shadi” samjho; har mahine thoda paisa (coin) side mein rakho, jab shadi aaye to ek saath sab jama ho jaaye.
2. **What to overlearn** — Total cost ≤ 3n for n insertions; doubling factor = 2; threshold ≈ 0.7.
3. **Spaced-repetition schedule** — 1 din baad, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Aggregate method: saare resizes ka sum geometric series = < 2n, plus n normal inserts = < 3n.

## 10. What this unlocks
Yeh concept aage ke advanced data structures ke liye foundation banata hai.

- Dynamic perfect hashing
- Cuckoo hashing analysis
- Real-time garbage collection write barriers
- Concurrent hash maps (Java ConcurrentHashMap resizing)

## 11. Self-check — five questions, no answers
1. 16 inserts ke baad total cost upper bound kya hai doubling table mein?
2. Agar threshold 1.0 rakh diya jaaye to amortized bound kyun toot jaata hai?
3. Accounting method mein har insert se kitne coins lene chahiye taaki resize safe rahe?
4. Potential function \(\Phi = 2n - m\) negative kab hota hai aur kya yeh problem hai?
5. Ek sequence mein ek hi O(n) resize ko detect karke uske amortized contribution ko kaise nikaalein?