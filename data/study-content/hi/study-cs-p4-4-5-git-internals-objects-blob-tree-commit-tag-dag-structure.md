## 1. The one-sentence answer
**Git stores every version of your code as immutable objects (blob, tree, commit, tag) whose references form a directed acyclic graph (DAG).**

Git ka core yeh hai ki har file ka content ek blob object ban jaata hai, directories tree objects se represent hote hain, har save point commit object hota hai, aur tags extra labels hote hain. In objects ke beech ke pointers ek DAG banate hain jisme koi cycles nahi hote, isliye history ko efficiently traverse aur merge kiya ja sakta hai. Yeh structure Git ko fast, reliable aur distributed banata hai kyunki har object ka SHA-1 hash uska unique identifier banta hai.

Aap jab `git add` ya `git commit` karte ho, Git actually new objects create karta hai aur unhe `.git/objects` mein store karta hai. Pointers (parent commits) backward links banate hain, lekin forward links nahi, isliye graph acyclic rehta hai.

> [!NOTE]
> Sabse badi aha yeh hai ki Git mein “history” ek graph hai, files ka list nahi; har commit sirf ek tree pointer + metadata hai, isliye branching aur merging trivial ho jaate hain.

## 2. Why this matters — concrete and current
Linux kernel development mein Linus Torvalds ne Git design kiya tha kyunki 2005 mein BitKeeper license withdraw ho gaya; DAG structure ne  thousands of developers ko simultaneous branching allow ki bina central server ke.

Google’s Android codebase (billions of lines) Git + repo tool use karta hai; tree objects ki hierarchy se partial checkouts possible hote hain bina poora history download kiye.

GitHub Actions aur GitLab CI har push par commit object ka hash use karke exact state reproduce karte hain; yeh reproducibility ML training pipelines mein bhi use hoti hai jaise Hugging Face model versioning.

Semiconductor companies (Intel, TSMC) hardware design files (Verilog, GDSII) ko Git se version karte hain; blob objects se binary diffs efficiently store hote hain bina poora file rewrite kiye.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| SHA-1 / content hashing | Har object ka naam uske content se derive hota hai        |
| Pointer / reference   | Tree aur commit objects dusre objects ko point karte hain |
| Directed graph        | Commits ke parent pointers ek directed structure banate hain |
| Immutability          | Ek baar likha object kabhi change nahi hota               |

Agar aapko hashing ya basic graph terminology nahi pata, pehle woh padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Content becomes a blob
Git file content ko read karke uska SHA-1 hash calculate karta hai aur us hash ko naam dekar store karta hai.  
Example: `hello.txt` mein “hello” likha hai to blob ka naam `ce013625030ba8dba906f756967f9e9ca394464a` ban jaata hai.  
Formal: blob = `header("blob", len(content)) + content`, then `SHA-1(blob)`.  
> [!WARNING] Agar aap content change karte ho to naya blob banta hai; purana kabhi overwrite nahi hota.

### Step 2 — Directories become trees
Ek tree object list of (mode, name, hash) entries rakhta hai jo files ya sub-directories ko point karte hain.  
Example: directory `src/` mein `main.c` aur `utils/` subfolder hai to tree ek entry `100644 main.c <blob-hash>` aur `040000 utils <tree-hash>` rakhega.  
Formal: tree = sorted list of `(mode, name, SHA-1)` tuples.  
> [!WARNING] Tree sorting galat karne se merge conflicts badh jaate hain.

### Step 3 — Snapshots become commits
Commit object ek tree hash, parent commit(s) hashes, author, message aur timestamp store karta hai.  
Formal: commit = `header("commit", len(metadata)) + tree <hash>\nparent <hash>\nauthor …`.  
> [!WARNING] Multiple parents allowed hain (merge commits); single parent nahi hone ka matlab root commit hai.

### Step 4 — Lightweight labels become tags
Tag object ya lightweight reference ek commit hash ko naam deta hai. Annotated tag ek extra object bhi create karta hai jisme signature hoti hai.  
Formal: tag = `header("tag", …) + object <commit-hash> type commit tag v1.0`.  
> [!WARNING] Lightweight tags move ho sakte hain; annotated tags immutable objects hote hain.

### Step 5 — Objects form a DAG
Har commit apne parent(s) ki taraf edge banata hai. Koi bhi object dusre object ko point kar sakta hai lekin cycle nahi ban sakta kyunki parents hamesha pehle ke commits hote hain.  
Formal: G = (V, E) where V = {all object hashes}, E = {commit → parent commit}. G is acyclic by construction.  
> [!WARNING] Force-push se remote DAG alag ho sakta hai; local DAG kabhi violate nahi hota.

### Step 6 — Reachability defines history
`git log` sirf reachable commits dikhata hai root se current HEAD tak. Unreachable objects garbage collection mein delete ho sakte hain.

## 5. Worked examples — har step show karo

**Example 1 — Creating a blob**  
*Given:* File `a.txt` contains “hi”.  
*Find:* Git object name.  
`printf "blob 3\0hi" | sha1sum` → `45b983be36b84ee0f0d66e278765e7b9e9b2e3c4`.  
*Why:* Header + null byte + content ka hash hi naam hai.  
**45b983be36b84ee0f0d66e278765e7b9e9b2e3c4**

*Reflection:* Yeh step content-addressable storage ka basic mechanism dikhata hai.

**Example 2 — Building a tree**  
*Given:* Blob `45b9…` aur mode 100644.  
*Find:* Tree object.  
Tree content: `100644 a.txt\0` + raw SHA bytes.  
Hash nikalta hai `d3b8c4…`.  
**d3b8c4…**

*Reflection:* Tree sirf pointers ki sorted list hai.

**Example 3 — Single commit**  
*Given:* Tree `d3b8…`, parent none, message “init”.  
Commit object banake hash `c1a2b3…` milta hai.  
**c1a2b3…**

*Reflection:* Commit ek tree snapshot + metadata hai.

**Example 4 — Two commits forming DAG**  
*Given:* Commit `c1a2…` ka child commit `e4f5…`.  
Graph: `e4f5 → c1a2`.  
Koi cycle nahi.  
**DAG edge created**

*Reflection:* Har naya commit purane ko point karta hai, isliye history linear ya branching ban sakti hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| `git rm` file but object remains | Object immutable hai                        | `git gc` ya `git prune` samajh lo            |
| Tag move karna              | Lightweight tag sirf reference hai          | Annotated tag use karo production releases ke liye |
| Large binary files          | Har change naya blob banata hai             | Git LFS ya separate asset repo               |
| SHA collision fear          | 160-bit space bahut badi hai                | Ignore; practical attacks nahi hue           |
| HEAD vs branch confusion    | HEAD ek pointer hai, branch bhi             | `git symbolic-ref HEAD` samajh lo            |
| Reachable vs unreachable    | Deleted branches objects chhod jaate hain   | `git fsck --unreachable` regularly chalao    |
| Merge commit parents order  | Left-right order merge strategy affect karti hai | `git log --graph` se verify karo             |

## 7. The textbook-precise statement
A Git repository is a content-addressable object store whose objects are of four types: blob, tree, commit and tag. Each object is identified by the SHA-1 hash of its header-prefixed content. A commit object contains exactly one tree reference and zero or more parent commit references. The resulting parent relation defines a directed acyclic graph on the set of commit objects. (Chacon & Straub, *Pro Git*, 2e, §10.2)

## 8. Visual — diagram or schematic
```
          tag v1.0
             │
             ▼
commit C3 ◀── commit C4 (merge)
   │              │
   ▼              ▼
commit C1      commit C2
   │              │
   ▼              ▼
  tree T1        tree T2
   │              │
   ▼              ▼
 blob B1        blob B2
```
Labels: arrows point from child to parent; every node is an immutable SHA-1 object.

## 9. The memory technique
1. **The hook** — Socho har commit ek photo hai, tree us photo ka album page, blob har photo ka pixel file, aur DAG ek family tree jisme koi bhi ancestor apne descendant ko nahi dekh sakta.
2. **What to overlearn** — Blob = file content, Tree = directory, Commit = snapshot + parents, Tag = named pointer; graph acyclic by construction.
3. **Spaced-repetition schedule** — 1 din baad `git cat-file -p` try karo, 3 din baad apna repo ka DAG draw karo, 7 din baad `git fsck`, 16 din baad merge commit banakar verify karo, 35 din baad theory notes revise karo.
4. **First-principles fallback** — Agar hash yaad na aaye to `echo -n "blob X\0content" | sha1sum` chala ke dekh lo; structure turant clear ho jaayega.

## 10. What this unlocks
Yeh foundation aage ke topics jaise branching strategies, rebase, reflog, packfiles aur distributed workflows ko samajhne ke liye zaroori hai.

- `git rebase` ka internal working
- Shallow clones aur partial clones
- Git’s garbage collection algorithm
- Custom merge strategies likhna

## 11. Self-check — five questions, no answers
1. Ek 10-byte file ka blob hash nikaalne ke liye header kya hoga?
2. Agar do commits ek hi tree ko point karein to unme kya farak hai?
3. Ek tag object ko delete karne ke baad bhi commit kaise reachable rehta hai?
4. Force-push se remote par kaunsa DAG property violate ho sakti hai?
5. `git cat-file -t <hash>` ka output “commit” aane ka kya matlab hai aur aap kaise verify karoge ki yeh object kisi branch se reachable hai?