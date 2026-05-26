## 1. The one-sentence answer
**Git operations manage a directed acyclic graph of commits by creating lightweight pointers (branches), combining histories (merge), rewriting linear histories (rebase), selecting individual commits (cherry-pick), saving transient states (stash), and searching commit sequences (bisect).**

A commit records a snapshot of the working tree together with parent pointers. Every Git operation therefore amounts to adding vertices or edges to this graph while preserving the invariant that the graph remains acyclic and every reachable commit is immutable. Branches are simply movable references to vertices; merge and rebase differ only in whether new merge commits are created or existing commits are copied. Cherry-pick, stash, and bisect are graph traversals or selections that leave the underlying structure unchanged except for the addition of new vertices when necessary.

The same graph model explains why certain sequences produce conflicts, why rebasing after a push is dangerous, and why bisect can locate a regression in logarithmic time.

> [!NOTE]
> The decisive insight is that every Git command ultimately edits a set of references into an immutable DAG; once this picture is internalised, the surface syntax of the commands becomes secondary.

## 2. Why this matters — concrete and current
The Linux kernel project, which receives thousands of patches daily, relies on rebasing and cherry-picking to maintain a clean, linear history on the mainline while still allowing maintainers to test individual contributions in isolation.

SpaceX uses Git to version flight software across multiple hardware branches; a single faulty commit discovered after integration must be isolated with `bisect` and then excised via `cherry-pick` onto a release branch without disturbing the certification trail.

In machine-learning research, reproducibility of training runs is achieved by stashing uncommitted experiment code, branching for hyper-parameter sweeps, and later merging only those runs whose metrics satisfy statistical tests.

Semiconductor design teams at TSMC and Intel maintain separate branches for each process node; merge conflicts between analog and digital layout changes are resolved daily, and `stash` preserves intermediate states during long-running physical verification jobs.

Google’s monorepo workflow applies `rebase` at scale through their internal Piper-to-Git bridge so that thousands of engineers can keep a single linear history while still isolating experimental changes.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Directed acyclic graph   | Commits form vertices; parent links form edges; all operations preserve acyclicity. |
| Reference (pointer)      | Branches and HEAD are movable names for specific commit hashes. |
| Tree isomorphism         | Merge and rebase correctness rest on detecting when two sub-trees can be combined without textual conflict. |
| Binary search            | `bisect` performs binary search over the partial order of commits. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Commits as immutable vertices
A commit captures a tree object and a list of parent hashes. Once written, its SHA-1 identifier never changes.  
Example: `echo "hello" > f && git add f && git commit -m "c0"` produces vertex `c0` whose content hash begins `a1b2c3…`.  
Formally:  
$$C = (T, P, M) \quad\text{where } T\text{ is a tree hash, }P\text{ is a sequence of parent hashes, }M\text{ is metadata.}$$  
> [!WARNING] Treating a commit as mutable (e.g., force-pushing the same hash) violates the DAG invariant and breaks every downstream clone.

### Step 2 — Branches as movable references
A branch is an entry in `.git/refs/heads/` that stores a single commit hash. Updating the branch moves the pointer; the commit objects remain untouched.  
Example: `git checkout -b feature` writes the current HEAD hash into `refs/heads/feature`.  
Formal statement: a branch \(B\) is a function \(B : \text{time} \to C\) that is updated by assignment.

### Step 3 — Merge as creation of a new vertex
A three-way merge finds the lowest common ancestor (LCA) of the two tips, applies both diff sets to the LCA tree, and records a new commit whose parents are the two tips.  
Example: merging `main` (tip `c3`) and `feature` (tip `c7`) with LCA `c1` yields `c8` whose parents are `c3` and `c7`.  
Formal statement:  
$$\text{merge}(c_i, c_j) = c_k \quad\text{where } c_k.\text{parents} = \{c_i, c_j\} \text{ and } c_k.\text{tree} = \text{resolve}(\text{LCA}(c_i,c_j), \Delta(c_i),\Delta(c_j)).$$

### Step 4 — Rebase as commit copying
Rebase walks the sequence of commits unique to the source branch and reapplies each patch onto a new base, producing new commit objects with identical changes but different parents and hashes.  
Formal statement: given a sequence \(c_1 \dots c_n\) and new base \(b\), produce \(c'_i\) such that \(c'_i.\text{tree} = \text{apply}(\Delta(c_i), c'_{i-1}.\text{tree})\).

### Step 5 — Cherry-pick as single-commit copy
Cherry-pick is rebase restricted to one commit; it creates exactly one new vertex whose tree is the result of applying the selected patch to the current HEAD.  
Formal statement: \(\text{cherry-pick}(c) = c'\) where \(c'.\text{parents} = \{\text{HEAD}\}\) and \(c'.\text{tree} = \text{apply}(\Delta(c), \text{HEAD.tree})\).

### Step 6 — Stash as a temporary commit pair
`git stash` records the working-tree and index differences as two commits (WIP and index) dangling from the current HEAD, then resets the working tree.  
Formal statement: stash stores a pair \((c_w, c_i)\) reachable only via the reflog.

### Step 7 — Bisect as binary search on the DAG
Bisect maintains two frontiers, good and bad, and repeatedly checks the midpoint commit until the first bad commit is isolated.  
Formal statement: locate the minimal \(c\) such that \(\text{property}(c) = \text{bad}\) under the partial order induced by ancestry.

### Step 8 — Unified graph view (textbook statement)
All six operations are therefore either reference updates or vertex-addition transformations on the commit DAG; the only invariants are acyclicity and immutability of existing vertices.

## 5. Worked examples — every step shown

**Example 1 — Simple branch and merge**  
*Given:* Repository with commits `c0 → c1` on `main`; current HEAD at `c1`.  
*Find:* Create branch `feature`, add `c2`, then merge back.  
1. `git checkout -b feature` — moves pointer `feature` to `c1`. *Why:* Branch creation is reference assignment.  
2. Edit file, `git commit` produces `c2` with parent `c1`. *Why:* New vertex attached to current tip.  
3. `git checkout main && git merge feature` — finds LCA `c1`, creates `c3` with parents `c1,c2`. *Why:* Merge adds a vertex of in-degree 2.  
**Final answer:**  
`main` now points to `c3`; history contains a diamond.  
*Reflection:* The merge commit records the join; deleting the branch pointer later does not remove any commit object.

**Example 2 — Rebase versus merge**  
*Given:* `main` at `c3`, `feature` branched at `c1` with `c4,c5`.  
*Find:* Rebase `feature` onto latest `main`.  
1. `git rebase main` — detaches HEAD at `c3`, reapplies \(\Delta(c4)\) then \(\Delta(c5)\).  
2. Produces `c4',c5'` with parents `c3,c4'`. *Why:* Each reapplication yields a new hash.  
**Final answer:**  
Linear history `c0-c1-c3-c4'-c5'`; original `c4,c5` become unreachable except via reflog.  
*Reflection:* Rebase rewrites SHA-1 values; sharing the branch afterward requires a force push.

**Example 3 — Cherry-pick a single fix**  
*Given:* Bug-fix commit `c9` on `hotfix` branch; current work on `release` at `c8`.  
*Find:* Bring only the fix into `release`.  
`git cherry-pick c9` creates `c10` whose tree equals `apply(\Delta(c9), c8.tree)`.  
**Final answer:** `release` now at `c10`; `c9` remains on `hotfix`.  
*Reflection:* No new merge commit appears; the change is duplicated under a different parent.

**Example 4 — Bisect locating a regression**  
*Given:* 128 commits between known-good `v1.0` and known-bad `HEAD`.  
*Find:* First bad commit.  
1. `git bisect start HEAD v1.0` — sets good/bad bounds.  
2. Git checks midpoint; user marks “bad”. Bounds halve.  
After seven steps the single offending commit is reported.  
**Final answer:** Commit `c47` introduced the bug.  
*Reflection:* Logarithmic search works because ancestry supplies a total order on any linear branch.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Force-pushing a rebased branch that teammates have already fetched | Teammates’ local branches now point to orphaned commits | Use `--force-with-lease` and coordinate via pull requests |
| Merging the same feature branch twice | Second merge creates an unnecessary merge commit whose diff is empty | Prefer rebase-then-merge or delete the branch after the first merge |
| Stashing, then switching branches and popping without checking index | Pop may apply changes to the wrong tree, producing silent conflicts | Always run `git stash list` and `git stash show -p` before popping |
| Bisecting across merges without `--first-parent` | The search may land inside a merged topic branch whose internal history is irrelevant | Add `--first-parent` when the mainline is the only lineage of interest |
| Cherry-picking a merge commit without `-m` | Git cannot decide which parent’s diff to apply | Explicitly supply `-m 1` or `-m 2` |
| Rebasing a branch that contains published merge commits | The merge structure is flattened, breaking any downstream `git describe` or release tooling | Rebase only local, non-merge commits; preserve merges with `--rebase-merges` |
| Using `stash` to store large binary artifacts | Stash objects bloat the repository and are never garbage-collected automatically | Use a temporary branch or `git worktree` instead of stash for heavy changes |

## 7. The textbook-precise statement
A Git history is a directed acyclic graph \(G = (V,E)\) where each vertex \(v\in V\) is a commit object containing a tree hash and an ordered list of parent hashes. A branch is a distinguished name mapping to an element of \(V\). The merge of tips \(b_1,b_2\) produces a new vertex whose parents are exactly \(\{b_1,b_2\}\) provided a three-way merge of their trees succeeds. Rebase and cherry-pick are functions that, given a sequence of commits and a new base vertex, emit a new sequence of vertices whose trees are obtained by sequential patch application. Bisect performs binary search over the ancestor relation. (Chacon & Straub, *Pro Git*, 2nd ed., §3 and §7.)

## 8. Visual — diagram or schematic
```text
          c4'--c5'          (after rebase)
         /
c0--c1--c3--c6              (main)
    \     /
     c2--c7                 (feature before merge)
```
Labels: each `cN` is a commit vertex; solid arrows point from child to parents; dashed arrows indicate branch pointers (omitted for brevity). The diamond `c1-c2-c3-c7` is the classic merge pattern; the linear chain `c3-c4'-c5'` is the rebased equivalent.

## 9. The memory technique
1. **The hook** — Picture the commit DAG as a subway map; branches are coloured lines, merges are transfer stations, rebasing is tearing up track and laying new rails ahead of the train, bisect is the inspector riding the line and asking “did the fault occur before or after this station?”
2. **What to overlearn** — `git branch`, `git merge`, `git rebase`, `git cherry-pick`, `git stash`, `git bisect`; the fact that every command either moves a reference or adds a vertex.
3. **Spaced-repetition schedule** — Review the graph model at 1 day, 3 days, 7 days, 16 days, 35 days after first study.
4. **First-principles fallback** — Re-derive every operation from the single rule “commits are immutable vertices; branches are pointers; the only legal edits are pointer moves or vertex additions that preserve acyclicity.”

## 10. What this unlocks
Mastery of these operations lets you treat version control as a precise algebraic system rather than a collection of ad-hoc commands.  

- Next: advanced history rewriting with `filter-branch` / `filter-repo` and signed commits.  
- Parallel topic: monorepo build systems that exploit the same DAG for incremental compilation.  
- Downstream technique: semantic versioning derived from the shape of the merge graph.

## 11. Self-check — five questions, no answers
1. Given a commit graph containing a merge commit of in-degree 3, what is the minimum number of `git merge` invocations that could have produced it?  
2. After `git rebase --onto main topic~3 topic`, how many new commit objects are created if `topic` originally contained five commits beyond the branch point?  
3. Explain why `git bisect` may report a merge commit as the first bad commit even though the bug was introduced in one of its parents.  
4. Construct a sequence of commands that leaves a stash entry whose parent commit is no longer reachable from any branch; what risk does this pose?  
5. In a repository where `main` receives only fast-forward merges, show that `git cherry-pick` of a commit from a short-lived feature branch can never create a merge conflict with the current tip of `main`.