## 1. The one-sentence answer
**DFS ek graph traversal technique hai jo ek vertex se shuru hokar uske adjacent vertices mein se ek ko choose karke recursively ya stack ke through depth tak jaati hai, phir backtrack karti hai.**

DFS ka core idea yeh hai ki aap breadth ki bajaye depth ko prefer karte ho. Ek node visit karne ke baad aap uske kisi unvisited neighbour ko turant explore karte ho, jaise maze mein ek raasta pakad ke end tak jaana aur phir wapas aana. Iska natural implementation recursion se hota hai kyunki call stack khud hi backtracking handle karta hai, lekin aap explicitly stack data structure bhi use kar sakte ho.

Time complexity \(O(V+E)\) isliye aati hai kyunki har vertex ek baar visit hota hai aur har edge ko check kiya jaata hai. Visited array yeh guarantee deti hai ki koi bhi vertex do baar process na ho.

> [!NOTE]
> Sabse badi aha moment yeh hai ki visited array ke bina DFS infinite loop mein phas jaata hai jab graph mein cycle hoti hai; visited array hi traversal ko acyclic aur efficient banati hai.

## 2. Why this matters — concrete and current
Google ke web crawler mein DFS variations backlinks aur page hierarchies ko depth-first explore karte hain taaki indexing efficient ho jaaye. Facebook ke friend-of-friend suggestions aur community detection algorithms DFS ka use karte hain social graphs mein tightly connected components dhundhne ke liye. Compiler design mein dependency graphs par topological ordering DFS se nikaala jaata hai, jaise LLVM mein instruction scheduling ke time. NASA ke Mars rover path-planning modules mein DFS-based maze solving ka use hota hai jab local obstacles ko recursively explore karna padta hai. Semiconductor design tools (Synopsys ke place-and-route engines) circuit graphs par DFS chalate hain timing violations detect karne ke liye.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Adjacency list or matrix | Graph ko efficiently represent karne ke liye              |
| Stack (LIFO)             | Recursion ke alternative ke roop mein traversal store karne ke liye |
| Recursion basics         | Backtracking aur call-stack behaviour samajhne ke liye    |
| Set / boolean array      | Visited state track karne ke liye taaki cycles handle ho  |

Agar upar ke concepts clear nahi hain to pehle unhe revise karo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Traversal order define karna
DFS mein aap hamesha depth ko prefer karte ho. Plain Hinglish claim: ek node ko visit karte hi uske neighbours mein se ek ko turant pick karo aur usi direction mein jaate raho. Concrete example: graph \(A \to B \to C\) aur \(A \to D\) mein DFS \(A,B,C\) ke baad backtrack karke \(D\) jaayega. Formal statement: DFS ordering ek path \(v_0, v_1, \dots, v_k\) produce karti hai jahaan har \(v_{i+1}\) ka parent \(v_i\) hota hai.  
> [!WARNING] Agar aap order ko breadth-first samajh baitho to algorithm BFS ban jaayega aur depth property khatam ho jaayegi.

### Step 2 — Stack ya recursion ka role
Recursion inherently stack jaise behave karti hai. Har recursive call current path ko stack frame mein store karti hai. Formal: recursion tree ki height worst-case \(O(V)\) hoti hai jab graph ek straight line ho.

### Step 3 — Visited array add karna
Har vertex ke liye ek boolean flag rakhna zaroori hai. Jab pehli baar visit karo to flag true kar do. Iska matlab: doosri baar us vertex par aane par ignore karo. Formal: \(\text{visited}[v] = \text{true}\) pehle visit ke time.

### Step 4 — Edge relaxation aur backtracking
Har neighbour ke liye check karo: agar visited nahi to recurse/stack-push karo. Wapas aane par (post-order) processing kar sakte ho jaise topological sort mein.

### Step 5 — Complexity derivation
Har vertex ek baar visit hota hai (\(O(V)\)) aur har edge ko do baar check karte hain (\(O(E)\)). Isliye total \(O(V+E)\).

### Step 6 — Textbook algorithm (pseudocode level)
```
DFS(G, v):
    visited[v] = true
    for each neighbour u of v:
        if not visited[u]:
            DFS(G, u)
```

## 5. Worked examples — har step show karo

**Example 1 — Simple line graph**  
*Given:* Vertices \(A,B,C\) with edges \(A-B\), \(B-C\). Start at \(A\).  
*Find:* DFS traversal order.  
Step 1: visit \(A\), mark visited.  
Step 2: neighbour \(B\) unvisited, recurse.  
Step 3: visit \(B\), mark, recurse to \(C\).  
Step 4: visit \(C\), backtrack.  
*Why* each step: visited array ensure karti hai ki koi repeat na ho.  
**Final answer:** \(A, B, C\)

*Reflection:* Linear graph mein DFS aur BFS same order dete hain, isliye cycle wale graphs zaroori hain testing ke liye.

**Example 2 — Graph with branch**  
*Given:* \(A\) connected to \(B\) and \(D\); \(B\) to \(C\). Start at \(A\).  
*Find:* Order using recursion.  
Visit \(A\), pick \(B\) first, reach \(C\), backtrack, then \(D\).  
**Final answer:** \(A, B, C, D\)

*Reflection:* Neighbour ordering decide karti hai final sequence; adjacency list order matter karti hai.

**Example 3 — Cycle handling**  
*Given:* Triangle \(A-B-C-A\). Start at \(A\).  
Without visited: infinite recursion. With visited: \(C\) se \(A\) ignore.  
**Final answer:** Traversal \(A,B,C\) with back edges detected.

*Reflection:* Visited array hi cycle ko safe banati hai.

**Example 4 — Explicit stack version**  
*Given:* Same graph as Example 2.  
Push \(A\), pop and push its neighbours in reverse.  
**Final answer:** Same order \(A,B,C,D\) lekin iterative.

*Reflection:* Stack version recursion stack overflow se bachata hai bade graphs mein.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                          | How to avoid it                              |
|-----------------------------|-----------------------------------------|----------------------------------------------|
| Missing visited array       | Cycle ko ignore karna                   | Har DFS call se pehle visited check          |
| Wrong neighbour order       | Adjacency list ordering galat samajhna  | List ko explicitly sort ya document karo     |
| Recursion depth overflow    | Deep graphs mein stack overflow         | Iterative stack version use karo             |
| Counting edges twice        | Directed vs undirected confusion        | Graph type clearly define karo pehle         |
| Forgetting back edges       | Cycle detection miss ho jaati hai       | Parent pointer alag se maintain karo         |
| Starting from wrong vertex  | Disconnected graph ignore              | Har unvisited vertex se alag DFS call karo   |

## 7. The textbook-precise statement
Depth-first search of a graph \(G = (V, E)\) explores each vertex \(v \in V\) by recursively visiting every unvisited adjacent vertex before returning. The algorithm maintains a color or boolean array to record the state of each vertex (white = unvisited, gray = visiting, black = finished). For every vertex \(u\) that is discovered, the procedure records a discovery time and, upon finishing all its descendants, a finishing time. The running time is \(\Theta(V + E)\) when the graph is represented by adjacency lists. (Cormen et al., *Introduction to Algorithms*, 4e, Ch. 22.3)

## 8. Visual — diagram or schematic
```
A -- B -- C
|    |
D    E
```
Start at A: visit A → B → C (back) → E (back) → D.  
Arrows show recursion path; dashed lines show back edges.

## 9. The memory technique
1. **The hook** — DFS ko “jaise tunnel mein ek hi raasta pakad ke end tak jaana, phir wapas aana” visualise karo.  
2. **What to overlearn** — Visited array must, \(O(V+E)\) complexity, recursion = implicit stack.  
3. **Spaced-repetition schedule** — 1 din baad, 3 din, 7 din, 16 din, 35 din.  
4. **First-principles fallback** — Agar kuch bhool jaaye to adjacency list se har edge ko ek baar touch karne ka count yaad karo.

## 10. What this unlocks
DFS connected components, topological sort, cycle detection, strongly connected components (Tarjan/Kosaraju), aur maze/path problems ke liye foundation banata hai.

- Topological ordering on DAGs
- Finding articulation points
- Solving 2-SAT problems
- Game-tree search with backtracking

## 11. Self-check — five questions, no answers
1. Ek cycle wale graph mein visited array hata do to kya hoga?  
2. DFS aur BFS ka order same kab hota hai?  
3. Recursion depth \(V=10^5\) hone par kya problem aayegi?  
4. Directed graph mein back edge kaise detect karoge?  
5. \(O(V+E)\) ko prove karne ke liye kitni baar har edge touch hoti hai?