## 1. The one-sentence answer
**Tombstone markers** ek special flag hain jo open-addressing hash tables mein deletion ke baad probe sequences ko intact rakhne ke liye use kiye jaate hain.

Jab linear probing ya quadratic probing mein koi key delete karte ho, us slot ko seedha empty mark karna galat hai kyunki baad mein search karte waqt probe chain toot jaati hai aur correct key milna band ho jaata hai. Iske bajaye us slot ko “deleted” state mein chhod dete hain, jise tombstone kehte hain. Tombstone search aur insertion dono ke liye alag-alag behave karta hai: search ke time probe continue hota hai, lekin insertion ke time us slot ko reuse kiya ja sakta hai.

> [!NOTE]
> Tombstone actually ek “soft delete” hai — element logically nahi hai, lekin physically probe path abhi bhi zinda hai.

## 2. Why this matters — concrete and current
Google’s Bigtable aur LevelDB jaise LSM-based storage engines open-addressing variants use karte hain jahaan deletion markers (tombstones) background compaction ke dauran lazily remove kiye jaate hain, warna read amplification badh jaati hai.

In aerospace flight-control software (NASA’s cFS), configuration hash tables mein real-time deletion ke liye tombstone markers lagaye jaate hain taaki probe latency deterministic rahe aur single-cycle lookup guarantee ho.

Modern GPU hash tables (NVIDIA’s cuCollections library) tombstone-based deletion implement karte hain kyunki warp-level divergence avoid karna padta hai; empty slot seedha likhna warp divergence create karta hai.

Redis ke dictionary implementation (dict.c) mein long-lived hash tables ke liye tombstone-style lazy deletion ka pattern dikhta hai jab rehashing ke beech mein keys expire hote hain.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Linear probing           | Tombstone ka behaviour linear probe sequence par depend karta hai |
| Cluster formation        | Deletion marker cluster size aur probe length dono ko affect karta hai |
| Search vs insertion path | Dono paths tombstone ko alag-alag treat karte hain        |

## 4. Building the idea — from intuition to formalism

### Step 1 — Probe sequence must stay connected
Agar aap ek slot ko empty kar dete ho, toh uske baad wale keys ka probe path toot jaata hai.  
Example: slots [h(k1), h(k1)+1, h(k1)+2] mein k2 aur k3 hain. k2 delete karne par slot 1 empty ho jaaye toh k3 dhundte waqt search ruk jaayega.  
Formal: probe sequence \( p(i) = (h(k) + i) \mod m \) tab tak valid hai jab tak koi intermediate slot “empty” na ho.

> [!WARNING]
> Empty slot daalne se search algorithm prematurely stop ho jaayega aur false negative dega.

### Step 2 — Introduce a third state
Har slot teen states mein se ek ho sakta hai: occupied, empty, deleted (tombstone).  
Deleted state search ko continue karne deta hai lekin insertion ko wahan likhne deta hai.

### Step 3 — Search behaviour with tombstone
Search tab tak continue karta hai jab tak empty slot na mile; deleted slots ko ignore karke aage badhta hai.  
Mathematically: search stops only when slot = empty, not when slot = deleted.

### Step 4 — Insertion behaviour with tombstone
Pehla deleted slot milte hi insertion wahan ho jaata hai (lazy reuse). Isse cluster size control mein rehta hai.

### Step 5 — Rehashing cleans tombstones
Load factor threshold cross karne par rehashing ke time saare tombstones hata diye jaate hain, naya table sirf live keys se banaaya jaata hai.

## 5. Worked examples — har step show karo

**Example 1 — Simple deletion**
*Given:* Table size 7, hash = key % 7, linear probing. Insert 14, 21, 28.  
*Find:* 21 delete karne ke baad state.  
Step 1: positions 0, 0, 0 (collision). Actual: [14, 21, 28, _, _, _, _].  
Step 2: 21 ko deleted mark karo → [14, D, 28, _, _, _, _].  
*Why* search 28 ko dhundhe toh D ke aage jaayega.  
**Final state:** [14, D, 28, _, _, _, _]

*Reflection:* Yeh example isliye simple thi kyunki koi further insertion nahi tha.

**Example 2 — Reuse of tombstone**
*Given:* Same table, ab 35 insert karo (35 % 7 = 0).  
*Find:* Kahan jaayega?  
Step 1: index 0 occupied.  
Step 2: index 1 = D mila → wahan likho.  
**Final state:** [14, 35, 28, _, _, _, _]  
*Why* D ko reuse kiya kyunki insertion D par ruk jaata hai.

*Reflection:* Tombstone insertion aur search ke liye dual semantics rakhta hai.

**Example 3 — Search after deletion**
*Given:* [14, D, 28, _, _, _, _]  
*Find:* 28 present hai?  
Probe 0: 14 ≠ 28, continue; 1: D, continue; 2: 28 == 28 → found.  
**Answer:** Found at index 2.

*Reflection:* D ne search ko block nahi kiya.

**Example 4 — Multiple tombstones & load factor**
*Given:* 5 tombstones ke baad load factor 0.7 cross.  
*Find:* Rehashing action.  
Naya table size double karo, sirf occupied keys copy karo, tombstones discard.  
**Final answer:** Fresh table without any D markers.

*Reflection:* Rehashing hi tombstones ko permanently hataata hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Empty slot daal dena        | “delete = free” intuition                   | Always use three-state enum                  |
| Search mein D par ruk jaana | Code mein sirf occupied/empty check         | Search loop: stop only on empty              |
| Tombstone count na badhana  | Load factor calculation galat ho jaati hai  | Deleted slots ko load-factor mein count karo |
| Rehash pe D copy karna      | memcpy pura table copy karta hai            | Rehash ke time sirf live keys copy karo      |
| Infinite probe              | Table full of tombstones                    | Load-factor threshold strictly enforce karo  |

## 7. The textbook-precise statement
Cormen et al., *Introduction to Algorithms*, 4e, Chapter 11, Section 11.4 states: “In open addressing, deletion is handled by marking the slot as deleted rather than empty. A search continues past deleted slots, while an insertion may reuse the first deleted slot encountered. The load factor is computed using the number of non-empty slots (including deleted).”

## 8. Visual — diagram or schematic
```
Index:  0   1   2   3   4   5   6
State: [14][D][28][D][35][ ][ ]
Probe path for key 28: 0 → 1(D) → 2(hit)   [continues past D]
Insertion of 42 (42%7=0): 0(occ) → 1(D) → place at 1
```

## 9. The memory technique
1. **The hook** — Socho tombstone ek “haunted” chair hai: chair khali dikhti hai lekin agar koi baithna chahe toh allowed hai, lekin dhoondhne waale ko pata hai ke yeh chair exist karti thi.
2. **What to overlearn** — Search rukta hai sirf EMPTY par; INSERT rukta hai pehle DELETED par.
3. **Spaced-repetition schedule** — 1 din, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Probe sequence yaad karo: empty = barrier, deleted = transparent, occupied = possible match.

## 10. What this unlocks
Tombstone deletion samajhne ke baad aap advanced open-addressing variants (Robin Hood hashing, Hopscotch hashing) aur concurrent hash tables samajh sakte ho.

- Robin Hood hashing mein tombstone distance metric ko affect karta hai
- Concurrent deletion algorithms tombstone ko atomic flag ki tarah treat karte hain
- Cuckoo hashing deletion policies tombstone ideas se inspire hain

## 11. Self-check — five questions, no answers
1. Linear probing table mein 3 tombstones ke baad ek naya key insert karne par kitne comparisons lagenge agar load factor 0.6 hai?
2. Agar aap tombstone ke bajaye slot ko empty kar do toh kaunsa search case fail ho jaayega?
3. Rehashing ke time tombstones copy karne se load factor par kya asar padta hai?
4. Quadratic probing mein tombstone marker ka placement linear probing se kaise alag hota hai?
5. Ek table jismein 40 % slots tombstones hain, uska effective load factor kitna maana jaayega?