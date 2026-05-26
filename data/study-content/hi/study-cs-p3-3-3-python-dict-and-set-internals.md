## 1. The one-sentence answer
**Python dict and set are implemented as dynamic hash tables that store keys via their hash values and resolve collisions through open addressing with a custom probing sequence.**

Iska matlab yeh hai ki jab aap `d[key] = value` likhte ho, Python pehle key ka hash calculate karta hai, phir us hash ko table ke size ke hisaab se index mein convert karta hai. Agar index already occupied hai, toh woh ek deterministic sequence follow karke agla slot dhundta hai. Sets bilkul same mechanism use karte hain lekin sirf keys store karte hain bina values ke.

Yeh design average-case O(1) lookup, insert aur delete deta hai kyunki collisions kam rakhe jaate hain aur table resize hoti rehti hai jab load factor threshold cross karta hai. Har key ko hashable hona zaroori hai taaki uska hash value stable rahe.

> [!NOTE]
> Sabse badi aha yeh hai ki dict aur set mein order nahi hota by design; order sirf CPython 3.6+ mein insertion order preserve hone ki side-effect hai, lekin aap ispe depend nahi kar sakte jab algorithm likh rahe ho.

## 2. Why this matters — concrete and current
Python dicts power the core of Django’s ORM caching layer at Instagram, jahaan har request ke liye millions of model instances ko O(1) mein fetch kiya jaata hai.  
Redis, jo ek in-memory key-value store hai, apne internal hash table design ko Python’s dict se directly inspired maanta hai jab high-throughput caching clusters banaye jaate hain.  
NumPy aur pandas dono internally Python dicts ko column-name lookups ke liye use karte hain jab DataFrame ko slice kiya jaata hai, isliye large-scale ML training pipelines mein yeh bottleneck ban sakta hai.  
CPython’s own attribute lookup mechanism (`__dict__`) ek dict hota hai, isliye har method call aur variable access ka performance directly is hash table implementation par depend karta hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Hash function        | Keys ko fixed-size integer mein map karta hai             |
| Collision            | Do alag keys same index de sakte hain                     |
| Load factor          | Table kitna bhara hua hai, resize decide karta hai        |
| Hashable object      | `__hash__` aur `__eq__` implement kiye bina dict key nahi ban sakta |

Agar aapko hash function ya collision ka basic idea nahi hai toh pehle “Hashing basics” padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Hash maps a key to an index
Python har key par `hash(key)` call karta hai aur us result ko table size ke modulo se index banata hai.  
Example: key `"apple"` ka hash 123456789 hai aur table size 8 hai toh index `123456789 % 8 = 5` banega.  
Formal statement:  
$$i = hash(k) \bmod m$$  
jahaan $m$ table ka current size hai.  
> [!WARNING]  
> Agar aap khud custom class ko key bana rahe ho aur `__hash__` define nahi kiya toh Python default id-based hash dega jo objects ke mutable hone par galat ho sakta hai.

### Step 2 — Collision handling via open addressing
Jab do keys same index maangte hain, Python linear probing ka modified version use karta hai jisme ek perturbation value add hoti rehti hai.  
Example: index 5 already occupied hai toh next candidate `(5 + perturb) % m` try kiya jaata hai.  
Formal statement: probing sequence $i_j = (hash(k) + f(j)) \bmod m$ jahaan $f(j)$ ek quadratic-like function hai.  
> [!WARNING]  
> Agar probing sequence galat samajhoge toh clustering banega aur worst-case O(n) ho jaayega.

### Step 3 — Load factor triggers resize
Jab entries / slots > 2/3 ho jaaye, table double size mein resize hoti hai aur saari entries rehash ki jaati hain.  
Formal statement: resize jab $\frac{n}{m} > \frac{2}{3}$.  
> [!WARNING]  
> Resize ek costly operation hai; agar aap loop mein repeatedly dict bana rahe ho toh performance gir sakti hai.

### Step 4 — Keys must be immutable
Sirf hashable objects (int, str, tuple of hashables) hi keys ban sakte hain kyunki unka hash value lifetime mein constant rehna chahiye.  
Formal statement: $\forall k \in K, hash(k_1) = hash(k_2) \implies k_1 = k_2$ (ya `__eq__` define ho).  
> [!WARNING]  
> List ya dict ko key banana TypeError dega.

### Step 5 — Sets reuse the same table
Set sirf keys store karta hai, values nahi, isliye uska memory footprint chhota hota hai lekin collision logic bilkul same rehta hai.

## 5. Worked examples — har step show karo

**Example 1 — Simple insertion**  
*Given:* empty dict, insert `{"a": 1}`.  
*Find:* final table state.  
Step 1: `hash("a") % 8 = 3`.  
Step 2: slot 3 empty hai, store kar do.  
*Why*: pehla insertion collision nahi dega.  
**Final answer**  
`dict` ka slot 3: key `"a"`, value `1`.

**Example 2 — Collision case**  
*Given:* `d = {"a":1, "b":2}` jahaan `hash("b") % 8 = 3`.  
*Find:* kya hota hai.  
Step 1: index 3 already occupied.  
Step 2: perturbation ke saath agla free slot dhundo.  
*Why*: open addressing se collision resolve hota hai.  
**Final answer**  
`"b"` slot 4 par jaata hai.

**Example 3 — Resize trigger**  
*Given:* 6 items already in 8-slot table.  
*Find:* next insertion ka effect.  
Step 1: load factor = 7/8 > 2/3.  
Step 2: new table of size 16 banao aur rehash karo.  
*Why*: performance maintain karne ke liye.  
**Final answer**  
Table ab 16 slots ki hai.

**Example 4 — Non-hashable key**  
*Given:* `d[[1,2]] = 5`.  
*Find:* error.  
Step 1: list hashable nahi.  
Step 2: TypeError utha.  
*Why*: hash value stable nahi reh sakta.  
**Final answer**  
`TypeError: unhashable type: 'list'`

*Reflection*: har example collision aur resize ke real mechanics ko highlight karti hai jo interview mein aksar pooche jaate hain.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Mutable object as key       | Student list/dict ko key banata hai         | Sirf immutable types use karo                |
| Assuming insertion order    | CPython 3.6+ side-effect samajh lete hain   | Order ki zaroorat ho toh OrderedDict lo      |
| Ignoring resize cost        | Bar-bar dict grow karte hain                | `dict.fromkeys` ya pre-size estimate lo      |
| Custom class without __hash__ | Default id hash use hota hai               | `__eq__` ke saath `__hash__` implement karo  |
| Hash collision attack       | Attacker same-hash keys bhejta hai          | Python 3.3+ se random hash seed use hota hai |

## 7. The textbook-precise statement
In CPython, both `dict` and `set` are implemented as open-addressed hash tables with a load-factor threshold of 2/3. The table is an array of entries; each entry stores a hash value, key, and (for dict) value. Collision resolution uses a perturbed linear probe sequence defined in `Objects/dictobject.c`. Keys must satisfy the invariant that equal keys produce equal hashes and that the hash value of a key does not change while the key is in the table. Resizing doubles the table size and rehashes every entry. (Source: CPython 3.12 source, Objects/dictobject.c and Objects/setobject.c.)

## 8. Visual — diagram or schematic
```
Index   0     1     2     3     4     5     6     7
       [   ] [   ] [   ] [k1]  [k2]  [   ] [   ] [   ]
              ↑           ↑     ↑
           empty      occupied occupied
Probing path for colliding key at index 3:
3 → (3 + p) % 8 → (3 + 2p) % 8 …
```

## 9. The memory technique
1. **The hook** — Socho ek bada parking lot jahaan har car ka number (hash) usko ek spot deta hai; agar spot bhara hai toh next numbered spot try karo.
2. **What to overlearn** — Load-factor threshold = 2/3; keys must define both `__hash__` and `__eq__`; average O(1) lookup.
3. **Spaced-repetition schedule** — 1 din baad, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Agar probing sequence bhool jaao toh yaad karo: “empty slot milne tak deterministic offset add karte raho aur modulo lo”.

## 10. What this unlocks
Yeh knowledge aapko custom hash tables likhne, performance debugging, aur advanced structures jaise LRU cache samajhne mein madad karegi.  
- Next: implement your own `MyDict` class  
- Next: understand Java HashMap aur C++ unordered_map internals  
- Next: analyse time complexity of algorithms that use dict-heavy code

## 11. Self-check — five questions, no answers
1. Agar `hash("x") % 8 == 4` aur slot 4 occupied hai, toh Python agla index kaise choose karega?  
2. Kyun list ko dict key nahi bana sakte? Ek line mein reason do.  
3. Load factor 0.9 hone par kya hoga?  
4. Ek custom class banao jisme `__eq__` defined ho lekin `__hash__` nahi; usko dict key banane par kya error aayega?  
5. Resize ke baad purani entries ka kya hota hai — explain the rehash step.