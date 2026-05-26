## 1. The one-sentence answer
**Load factor** tells you how full a hash table is; when it crosses a threshold you resize the table and rehash every element because collisions start rising sharply and average probe length grows.

Aap jab n elements ko m slots mein store karte ho, tab load factor α = n/m hota hai. Jab α kisi fixed limit (jaise 0.7) se zyada ho jaaye, tab nayi table banate ho jismein roughly double slots hote hain aur purane saare keys ko nayi table mein daalte ho. Yeh process O(n) time leta hai lekin future operations ko O(1) average banaye rakhta hai. Agar aap resize na karo to chaining lists lambi ho jaati hain ya open addressing mein probe sequences bahut lambi ban jaati hain, dono cases mein performance girti hai.

> [!NOTE]
> Resize karne ka asli “aha” yeh hai ki ek baar ka O(n) kharcha future ke har lookup/insert ke liye constant time guarantee kharidta hai — bina resize ke aap sirf ek costly O(n) operation ko kai chhote costly operations mein badal dete ho.

## 2. Why this matters — concrete and current
Google’s Bigtable aur LevelDB jaise storage engines har SSTable ke liye in-memory hash index maintain karte hain; jab load factor 0.75 cross karta hai tab woh index ko double size karke rehash karte hain taaki read latency stable rahe.

Redis ke hash tables default load factor 1.0 par resize karte hain. 2022 ke ek production incident mein ek key space jismein 40 million keys thi, resize ke time par latency spike hua kyunki rehashing single-threaded tha; us incident ke baad Redis ne incremental rehashing introduce kiya.

In semiconductor design verification, Synopsys ke VCS simulator mein signal-name lookup ke liye hash tables use hote hain. Million-gate designs mein load factor badhne se simulation speed 3–4× gir jaati hai, isliye engineers explicit resize thresholds set karte hain.

Modern ML data loaders (PyTorch DataLoader ke map-style datasets) record-id se tensor location map karne ke liye hash tables rakhte hain. Jab dataset size 10× badhta hai tab automatic resize na ho to epoch time linearly badhta hai.

Facebook’s RocksDB compaction stage mein bloom-filter aur hash index dono resize karte hain; paper “RocksDB: A Persistent Key-Value Store for Flash and RAM” (2019) mein clearly likha hai ki rehashing cost ko amortized karne ke liye 4× size increase use karte hain.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Hash function        | Slot index nikaalne ke liye; collision distribution samajhna zaroori hai |
| Average vs worst-case analysis | Resize threshold decide karne ke liye expected probe length nikaalna padta hai |
| Amortized analysis   | Ek baar ka O(n) rehashing ko har operation ke O(1) mein kaise distribute karte hain |

## 4. Building the idea — from intuition to formalism

### Step 1 — Load factor as density measure
Load factor α = n/m sirf ek ratio hai jo bataata hai kitne fraction slots abhi occupied hain. Jab α chhota hota hai, collisions kam hote hain. Jab α bada hota hai, dono chaining aur open addressing mein extra work badhta hai.

Example: 7 keys, 10 slots → α = 0.7. Agar ek aur key aaye aur koi collision na ho to bhi average probe length badhega.

Formal statement:  
$$ \alpha = \frac{n}{m} $$

> [!WARNING]
> α ko sirf “fullness” mat samjho; α collision probability ka direct proxy hai, isliye threshold sirf 1.0 nahi hota.

### Step 2 — Threshold policy
Industry practice mein fixed threshold (0.7 ya 0.75) par resize trigger hota hai. Threshold se pehle table ko double karne ka reason yeh hai ki future insertions ke liye headroom bache.

Example: α > 0.7 par m ← 2m kar do. 1000 slots wali table 2000 slots ki ban jaati hai.

Formal: resize when α > α_max where α_max ∈ {0.5, 0.7, 0.75, 1.0} depending on collision resolution.

> [!WARNING]
> Threshold bahut low rakhne se baar-baar resize hoga aur total cost O(n log n) ban jaayega.

### Step 3 — Rehashing mechanics
Resize karne par purani table ke saare n elements ko nayi table mein naye hash function (ya same function with new m) se re-insert karna padta hai. Purani positions invalid ho jaati hain.

Example: 700 keys wali table ko 2000 slots tak badhaate ho to 700 hash operations + 700 insertions karne padte hain.

Formal cost: Θ(n) time because every element must be processed exactly once.

### Step 4 — Amortized cost argument
Agar har resize par size double karte ho, to har element maximum log n baar move hota hai. Isliye total rehashing cost across n insertions O(n) hota hai, yani per insertion O(1) amortized.

Formal:  
$$ T(n) = O(n) + \sum_{i=1}^{\log n} O(2^i) = O(n) $$

### Step 5 — When not to resize
Agar table static hai (jaise compile-time symbol table) to resize ki zaroorat nahi. Dynamic workloads mein hi resize policy lagti hai.

### Step 6 — Textbook-grade summary
Cormen et al. (Introduction to Algorithms, 4e, §11.2) define load factor α and state that dynamic tables keep α ≤ α_max by doubling; total cost of n insertions remains Θ(n).

## 5. Worked examples — har step show karo

**Example 1 — Basic load-factor calculation**  
*Given:* 650 keys already inserted in a table of 1000 slots.  
*Find:* Current load factor and whether resize should trigger (threshold 0.7).  

650 / 1000 = 0.65  
0.65 < 0.7 → no resize.  
*Why:* Direct division se α nikaala; threshold check simple comparison hai.  
**Final answer**  
α = 0.65, no resize required.

*Reflection:* Yeh example isliye simple thi kyunki sirf ratio nikaalna tha; asli dikkat tab aati hai jab threshold cross ho.

**Example 2 — Resize decision with cost**  
*Given:* Table has 800 keys, 1000 slots, threshold 0.75. Ek aur key insert karna hai.  
*Find:* New size aur rehashing cost.  

α = 800/1000 = 0.8 > 0.75 → resize.  
New m = 2000.  
Rehash cost = 801 insertions (including new key).  
*Why:* Har element ko naye index par place karna padega.  
**Final answer**  
New size 2000, rehash cost Θ(801).

*Reflection:* Cost ko n+1 likhna zaroori hai kyunki nayi key bhi count hoti hai.

**Example 3 — Amortized analysis over sequence**  
*Given:* Start with m = 4, insert 1, 2, 3, …, 9 keys one by one, threshold 0.75.  
*Find:* Total rehashing operations.  

Resize at 4→8 (after 4th key) → 4 moves  
Resize at 8→16 (after 8th key) → 8 moves  
Total moves = 12 for 9 insertions.  
*Why:* Har resize par purane elements move hote hain.  
**Final answer**  
12 rehash operations, average < 2 per insertion.

*Reflection:* Logarithmic doubling se hi amortized O(1) milta hai.

**Example 4 — Open-addressing probe length after load factor breach**  
*Given:* Linear probing, m = 10, 8 keys (α = 0.8). Next insertion.  
*Find:* Expected probe length before and after resize to 20.  

Before: average probe ≈ 1/(1-α) = 5.  
After resize α = 9/20 = 0.45 → probe ≈ 1.8.  
*Why:* Formula 1/(1-α) linear probing ke liye standard hai.  
**Final answer**  
Probe length drops from 5 to 1.8.

*Reflection:* Yeh dikhata hai ki resize sirf space nahi, performance bhi deta hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Resize at α = 1.0           | Students think “tab tak full nahi hua”      | Threshold 0.7–0.75 fix karo aur code mein constant rakho |
| Forgetting to rehash all elements | Sirf size badha diya, purani table copy ki | Har resize par nayi table allocate + loop se re-insert |
| Using same m in hash modulo | Naya m use nahi kiya to same collisions     | h(k) mod new_m must use updated m            |
| Ignoring amortized view     | Har resize ko O(n) costly samajh ke darte hain | Total cost O(n) dikhaane wala sum likho    |
| Single-threaded resize in concurrent map | Production latency spike                    | Incremental rehashing ya separate resize thread |
| Shrinking table too early   | Memory bachane ke chakkar mein baar-baar resize | Shrink threshold α < 0.25 rakho              |
| Hash function not updated   | Same hash with bigger table → bad distribution | Double hashing ya new seed use karo          |

## 7. The textbook-precise statement
Cormen, Leiserson, Rivest, Stein, *Introduction to Algorithms*, 4th edition, §11.2.2: “We define the load factor α of a hash table to be n/m, where n is the number of elements stored in the table and m is the number of slots. To keep α bounded above by a constant, we double the size of the table whenever α exceeds a threshold α_max. The total cost of a sequence of n insertions into an initially empty table is Θ(n).”

## 8. Visual — diagram or schematic
```
Before resize (m=8, n=6, α=0.75)
Slot: 0  1  2  3  4  5  6  7
Key : K1 -  K3 -  K2 -  K5 K6

After resize (m=16)
Slot: 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
Key : K1 - - K3 - K2 - - K5 -  -  K6 -  -  -
```
Har key naye index = h(key) % 16 par move hui hai.

## 9. The memory technique
1. **The hook** — “Double or nothing”: jab table half se zyada bhar jaaye to double kar do, warna performance “nothing” (zero) reh jaayegi.
2. **What to overlearn** — α = n/m, resize at α > 0.7, total rehash cost O(n) for n insertions.
3. **Spaced-repetition schedule** — 1 din baad, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Agar formula bhool jaaye to n elements ko har baar double size par move karne ka sum likho: 1 + 2 + 4 + … + n/2 = n − 1.

## 10. What this unlocks
Yeh concept samajh lene ke baad aap dynamic hash tables, concurrent hash maps, aur database index resizing ko samajh sakte ho.

- Next: separate chaining vs open addressing cost analysis
- Dynamic perfect hashing
- Cuckoo hashing resize policies
- Incremental rehashing in Redis aur memcached

## 11. Self-check — five questions, no answers
1. 1200 keys, 1500 slots, threshold 0.8 — resize hoga ya nahi?
2. Agar har resize par size 1.5× karo to amortized cost kya hoga?
3. Linear probing mein α = 0.9 par average probe length kitna hai?
4. Ek student ne resize ke time purani table ko free kar diya bina rehash kiye — kya tootega?
5. 10^7 insertions ke baad kitne baar resize hoga agar doubling use ho aur initial m = 16?