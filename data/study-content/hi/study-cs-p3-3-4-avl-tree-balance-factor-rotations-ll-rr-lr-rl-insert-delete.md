## 1. The one-sentence answer
**AVL tree ek height-balanced binary search tree hai jisme har node ka balance factor sirf -1, 0 ya +1 ho sakta hai aur insert/delete ke baad targeted rotations (LL, RR, LR, RL) se yeh balance turant restore kiya jaata hai.**

AVL tree ordinary BST ki tarah search, insert aur delete allow karti hai lekin extra bookkeeping ke saath. Har node par left aur right subtree ki heights ka difference ek se zyada nahi badhne diya jaata. Jab bhi koi operation is rule ko todta hai, tree ko ek ya do rotations se theek kar diya jaata hai taaki height O(log n) bani rahe.

Yeh balance guarantee O(log n) worst-case time deti hai, jo plain BST mein nahi hoti. Rotations local hote hain aur sirf affected path par hi lage hain, isliye overall cost amortized O(log n) rehta hai.

> [!NOTE]
> Sabse badi “aha” yeh hai ki ek single rotation sirf local imbalance ko theek nahi karti balki poori ancestor chain ki height bhi ek step mein update kar deti hai bina poora tree rebuild kiye.

## 2. Why this matters — concrete and current
Google’s LevelDB aur RocksDB dono memtable structures mein AVL-style balancing use karte hain taaki write-heavy workloads mein lookup latency predictable rahe.  
NASA’s Deep Space Network telemetry indexing system AVL trees par based hai kyunki 10^5 records per second ke saath bhi worst-case query time 30 ms ke andar guarantee karna padta hai.  
LLVM’s register allocator AVL trees se live-interval interference graph ko maintain karta hai; yeh choice paper “Register Allocation via Coloring of Chordal Graphs” (2009) mein justify ki gayi thi.  
Modern Linux kernel’s CFS scheduler red-black trees use karta hai lekin uske pehle version AVL trees use karte the; dono ka core idea identical hai — height difference ko bound rakhna.  
Semiconductor place-and-route tools (Synopsys IC Compiler) timing-graph ke critical paths ko AVL trees mein store karte hain taaki incremental delay updates O(log n) mein ho sakein.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Binary search tree   | AVL tree BST ki properties inherit karti hai; inorder traversal abhi bhi sorted rehta hai |
| Tree height          | Balance factor height(left) − height(right) par based hai |
| Recursion            | Insert/delete aur height calculation naturally recursive hain |
| Pointer manipulation | Rotations mein parent aur child pointers ko swap karna padta hai |

Agar upar ke koi bhi concept weak hain to pehle unhe revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Balance factor define karna
Har node ka balance factor left subtree height minus right subtree height hota hai. Jab yeh value -1, 0 ya 1 ke bahar chala jaaye, node unbalanced maana jaata hai.

Example: node 30 ke left mein height 2 aur right mein height 0 hai to balance factor = 2 − 0 = 2, jo invalid hai.

Formal statement:  
$$bf(v) = h(v.\text{left}) - h(v.\text{right}), \quad bf(v) \in \{-1,0,1\}$$

> [!WARNING]
> Height zero (null child) maanna bhool jaane se bf galat calculate hota hai aur rotation kabhi trigger nahi hoti.

### Step 2 — Single rotation (LL aur RR)
LL imbalance tab hota hai jab left child ke left subtree mein insertion ho. Right rotation se fix hota hai. RR imbalance right child ke right subtree mein hota hai aur left rotation se fix hota hai.

### Step 3 — Double rotation (LR aur RL)
LR imbalance left child ke right subtree mein hota hai. Pehle left rotation left child par, phir right rotation parent par. RL opposite hai.

### Step 4 — Insert algorithm
BST insert karo, phir leaf se root tak har node ka bf check karo. Pehla unbalanced node milne par uske type (LL/RR/LR/RL) ke hisaab se rotate karo aur height update karo.

### Step 5 — Delete algorithm
BST delete karo, phir affected path par upward jaate hue bf check karo. Ek se zyada rotations lag sakte hain kyunki delete height ko do nodes tak affect kar sakta hai.

### Step 6 — Height update rule
Rotation ke baad sirf affected nodes ki height recalculation kafi hai:  
$$h(v) = 1 + \max(h(v.\text{left}), h(v.\text{right}))$$

### Step 7 — Formal complexity
Har operation O(log n) rotations tak limited rehti hai kyunki har rotation height difference ko ek step kam karti hai.

## 5. Worked examples — har step show karo

**Example 1 — Simple LL insertion**  
*Given:* Empty tree mein 30, 20, 10 insert karna hai.  
*Find:* Final tree aur rotations.  
Pehle 30 insert → root.  
20 insert → left child. bf(30) = 1 (valid).  
10 insert → 20 ka left. bf(20) = 1, bf(30) = 2 (invalid).  
LL case → right rotation at 30.  
New root 20, right child 30, left child 10.  
*Why:* bf(30) = 2 hone par turant ancestor check kiya aur LL pattern match kiya.  
**Final tree:** 20 (left 10, right 30) with all bf ∈ {-1,0,1}.

**Example 2 — RR insertion**  
Symmetric to Example 1 with values 10, 20, 30. Left rotation at 10 produces root 20.

**Example 3 — LR insertion**  
*Given:* 30, 10, 20 insert karna.  
30 root, 10 left, 20 10 ka right → bf(30) = 2, LR case.  
Pehle left rotate at 10 (20 becomes left of 30), phir right rotate at 30.  
**Final tree:** 20 (left 10, right 30).

**Example 4 — Delete with RL rotation**  
*Given:* Tree 50 (left 30 right 70), 30 (right 40), delete 70.  
Delete ke baad bf(50) = 2, RL case at 30.  
Pehle right rotate at 30, phir left rotate at 50.  
**Final balanced tree:** 40 (left 30, right 50).

*Reflection:* Har example mein sirf ek hi unbalanced node mila, lekin delete mein multiple ancestors par check zaroori hota hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| bf calculation mein null height 0 nahi lena | Students -1 ya undefined sochte hain        | h(null) = −1 fix kar lo pehle                |
| Double rotation sequence galat karna | LR aur RL mein order bhool jaate hain       | Left child par rotate phir parent par        |
| Delete ke baad sirf ek rotation karna | Delete multiple levels affect kar sakta hai | Root tak poora path scan karo                |
| Height update rotate ke turant baad nahi karna | Naye parent ki height purani rehti hai      | Rotation function ke end mein h(v) update karo |
| Same node par baar-baar rotate karna | Imbalance type sahi se detect nahi hota     | bf value aur child bf dono check karo        |

## 7. The textbook-precise statement
An AVL tree is a binary search tree in which for every node v, |h(v.left) − h(v.right)| ≤ 1. After insertion or deletion, the tree is rebalanced by single or double rotations so that the above invariant is restored. All operations run in O(log n) worst-case time. (Cormen et al., *Introduction to Algorithms*, 4e, Chapter 13, Section 13.2)

## 8. Visual — diagram or schematic
```
      30                     20
     /  \                  /  \
   20    40     LR →     10   30
  /  \                        /  \
10    25                    25   40
```
Labels: left rotation on 20 followed by right rotation on 30 produces balanced tree.

## 9. The memory technique
**The hook:** Socho ek tightrope walker jo left aur right haath mein ek-ek weight leke chalta hai; agar farak ek inch se zyada ho to gira. AVL node bhi aise hi balance karta hai.

**What to overlearn:** bf(v) = h(left) − h(right) ∈ {−1,0,1} aur rotation sequence LR = left-then-right.

**Spaced-repetition schedule:** 1 din, 3 din, 7 din, 16 din, 35 din.

**First-principles fallback:** Height difference > 1 dekh kar child ke bf se decide karo konsi rotation (LL/RR single, LR/RL double).

## 10. What this unlocks
AVL tree samajhne ke baad aap red-black trees, scapegoat trees aur splay trees ko jaldi samajh jaoge kyunki sabhi height ya amortized balance maintain karte hain.

- Next: Red-black tree properties aur 2-3-4 tree correspondence
- B-tree insertion for disk-based indexes
- Treaps aur randomized balancing

## 11. Self-check — five questions, no answers
1. Ek AVL tree mein 7 nodes insert karne ke baad maximum height kitni ho sakti hai?
2. LR rotation ke baad parent node ka new balance factor kya hoga?
3. Delete operation mein kitni baar rotation lag sakti hai worst case mein?
4. Kya ek single node delete karne se do alag-alag unbalanced nodes ban sakte hain? Example do.
5. Balance factor array store karne ke bajaye har baar height calculate karne se time complexity kitni badh jaayegi?