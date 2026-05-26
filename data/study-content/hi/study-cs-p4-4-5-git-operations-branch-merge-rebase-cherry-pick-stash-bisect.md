## 1. The one-sentence answer
**Git operations — branch, merge, rebase, cherry-pick, stash, and bisect — give you precise control over parallel histories, selective change application, temporary state preservation, and systematic debugging inside a distributed version-control graph.**

These commands operate on the directed acyclic graph of commits. Branch creates a new pointer to an existing commit so independent lines of work can evolve. Merge and rebase reconcile those lines, while cherry-pick copies individual commits across branches. Stash temporarily shelves uncommitted changes, and bisect performs binary search over the commit history to locate the first faulty commit.

The power comes from treating history as data rather than a linear log. Once you internalise that every commit is an immutable snapshot with parent pointers, each operation becomes a graph transformation rather than a file-copy action.

> [!NOTE]
> The single most important mental shift is to stop thinking “files change” and start thinking “commits are nodes; these commands only move or copy pointers between nodes.”

## 2. Why this matters — concrete and current
Linux kernel maintainers use `git bisect` on every release cycle to isolate regressions across tens of thousands of commits; the same workflow is embedded in the kernel’s automated test infrastructure.

Google’s monorepo (Piper + CitC) still exports daily snapshots to Git; engineers rely on `git rebase` and `git cherry-pick` to keep thousands of internal branches aligned with the single trunk without creating merge-commit noise that would break the global build cache.

SpaceX’s flight software team maintains separate branches for each Falcon and Starship variant; `git merge` with explicit merge strategies guarantees that only reviewed avionics patches reach the certified branch used for hardware-in-the-loop testing.

Stripe’s core payments platform runs `git stash` inside every developer’s pre-commit hook so that partial refactors never leak into CI pipelines even when an urgent hot-fix must be applied on top of a dirty working tree.

The Rust compiler repository uses `git rebase` in its bors merge queue; every approved PR is rebased onto the current master before the final test run, eliminating diamond-shaped merge histories that previously caused spurious CI failures.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Directed acyclic graph   | Every Git operation is a transformation on the commit DAG; without this model, rebase versus merge behaviour remains mysterious. |
| HEAD and branch pointers | All commands ultimately move or copy these pointers; understanding that a branch is just a movable label is required before any advanced operation. |
| Working directory / index / commit distinction | Stash, merge conflicts, and cherry-pick all interact with these three layers; confusion here produces lost changes. |
| Basic command-line navigation | You must be able to run `git status`, `git log --oneline`, and read diff output without hesitation. |

If any row above is unfamiliar, pause and master it first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Creating an independent line of history
A branch is simply a named pointer to a commit. Creating one does not copy files; it only adds a new reference.

Concrete example: you are on commit `C0` and run `git branch feature`. Now both `main` and `feature` point at `C0`.

Formal statement:  
$$B_{\text{new}} \leftarrow \text{ref}(C_{\text{current}})$$

> [!WARNING]
> If you create the branch but forget to switch to it with `git switch`, subsequent commits will still advance the original pointer, silently polluting the wrong line of history.

### Step 2 — Merging two pointers
Merge walks both branches back to their common ancestor and creates a new commit whose parents are the tips of both branches.

Formal statement:  
$$C_{\text{merge}} = \text{merge}(C_a, C_b) \quad \text{where parents}(C_{\text{merge}}) = \{C_a, C_b\}$$

> [!WARNING]
> A merge commit is the only object that can have more than one parent; any later rebase or bisect that does not account for this will traverse unexpected paths.

### Step 3 — Replaying commits instead of joining histories
Rebase takes a sequence of commits and reapplies each one on top of a new base, rewriting commit hashes.

Formal statement:  
For each $C_i$ in the range $[C_{\text{base}}, C_{\text{head}}]$, create $C_i'$ such that  
$$\text{tree}(C_i') = \text{apply}(\text{tree}(C_i), \text{tree}(C_{\text{new-base}}))$$

> [!WARNING]
> Because hashes change, any commit that has already been pushed and shared with teammates must never be rebased; doing so forces every downstream clone to perform manual recovery.

### Step 4 — Transplanting a single commit
Cherry-pick applies the diff of one commit onto the current HEAD and creates a new commit with a fresh hash but the original commit message and author date preserved.

Formal statement:  
$$C_{\text{new}} = \text{apply}(\Delta(C_{\text{src}}), \text{HEAD})$$

> [!WARNING]
> If the same logical change already exists on the target branch (identical tree state), Git will still create a duplicate commit unless you explicitly check with `git log --cherry-pick`.

### Step 5 — Shelving uncommitted state
Stash serialises the working directory and index into a temporary commit-like object and resets the working tree to HEAD.

Formal statement:  
$$\text{stash}\{n\} = \text{commit}(\text{index} \cup \text{working-tree}, \text{parent}=\text{HEAD})$$

> [!WARNING]
> Stash does not preserve untracked files unless you pass `--include-untracked`; those files will be deleted on `git stash pop` if you later run a command that cleans the tree.

### Step 6 — Binary search over the DAG
Bisect repeatedly checks out the midpoint commit between a known-good and known-bad revision and lets you mark the result, narrowing the search space by half each time.

Formal state space size after $k$ steps:  
$$O\left(\frac{N}{2^k}\right)$$ where $N$ is the number of commits between the two endpoints.

> [!WARNING]
> If the bug was introduced by a merge commit rather than a linear change, you must explicitly tell bisect to treat merge commits as suspects (`git bisect run` with a proper script) or the search may terminate on the wrong side of the merge.

## 5. Worked examples — har step show karo

**Example 1 — Create and switch to a branch**  
*Given:* You are on `main` at commit `a1b2c3`.  
*Find:* A new branch `login` and switch to it.  
Run:  
```bash
git branch login
git switch login
```  
*Why:* The first command only creates the pointer; the second moves `HEAD` to it.  
**Final answer:** `HEAD` now points at `login` which itself points at `a1b2c3`.

*Reflection:* This example is trivial yet demonstrates that branch creation and checkout are separate operations; many later mistakes stem from forgetting the second step.

**Example 2 — Merge versus rebase on the same graph**  
*Given:* `main` at `M`, `feature` branched at `F1` then added `F2`.  
*Find:* Integrate `feature` into `main` both ways.  
Merge produces commit `Merge-M-F2` with two parents.  
Rebase produces `F1'`, `F2'` whose parent chain is linear on top of `M`.  
**Final answer:** Merge keeps original hashes; rebase rewrites them.

*Reflection:* The choice affects future bisect ranges and the readability of `git log --graph`.

**Example 3 — Cherry-pick a single fix**  
*Given:* Commit `bugfix` on `hotfix` branch contains only the diff you need.  
*Find:* Apply it to `release/2.3` without merging the entire branch.  
```bash
git switch release/2.3
git cherry-pick bugfix
```  
*Why:* Only the tree delta is replayed; metadata is copied but the hash is new.  
**Final answer:** New commit `cherry-bugfix` sits on `release/2.3`.

*Reflection:* This pattern is the standard way to back-port security patches without pulling unrelated features.

**Example 4 — Bisect a regression**  
*Given:* `v1.0` good, `v2.0` bad, 128 commits between them.  
*Find:* First bad commit.  
```bash
git bisect start v2.0 v1.0
git bisect run ./test.sh
```  
After seven iterations the range collapses to a single commit.  
**Final answer:** `3f4e2a1` is the first bad commit.

*Reflection:* The logarithmic reduction is why bisect scales to repositories with hundreds of thousands of commits.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Force-pushing after rebase        | Forgetting that teammates already have the old hashes | Always coordinate with the team or use `--force-with-lease` |
| Losing stashed changes            | Running `git stash drop` before verifying `pop` succeeded | Use `git stash list` and `git stash show` before dropping |
| Bisect landing on merge commits   | Not telling bisect that merges are possible culprits | Supply a test script that returns 1 on any bad tree state |
| Merge conflict resolved incorrectly | Editing the wrong side of `<<<<<<<` markers       | Use `git checkout --ours/--theirs` only after reading both sides |
| Cherry-pick creating duplicates   | Same patch already present under different hash     | Run `git log --cherry-pick` before applying          |
| Stash including untracked files   | Forgetting `--include-untracked` flag               | Explicitly pass the flag when you need those files   |
| Branch pointer moved accidentally | Using `git branch -f` without realising current HEAD | Prefer `git switch -c` for new branches              |

## 7. The textbook-precise statement
A branch is a movable reference to a commit object. Merge creates a new commit with multiple parents. Rebase constructs a new sequence of commits whose trees are the result of transplanting each original change onto a new base commit. Cherry-pick creates a single new commit whose tree is the result of applying one original commit’s diff. Stash stores the index and working-tree state as a commit whose parent is the current HEAD. Bisect performs binary search on the partial order induced by the commit DAG. (Chacon and Straub, *Pro Git*, 2e, Chapters 3 and 7.)

## 8. Visual — diagram or schematic
```
        main
          |
C0──C1──C2──C3──C4
          \
           F1──F2   feature
```
After `git rebase main` on feature:  
```
        main
          |
C0──C1──C2──C3──C4
                  \
                   F1'──F2'   feature (new hashes)
```

## 9. The memory technique

**The hook**  
Picture six coloured arrows taped to a whiteboard: a blue “branch” arrow splitting, a green “merge” arrow joining, a red “rebase” arrow lifting and replanting commits, a yellow “cherry” arrow copying one fruit, a brown “stash” box hiding under the desk, and a purple “bisect” magnifying glass scanning the timeline.

**What to overlearn**  
- `git switch -c <name>` always creates and switches in one step.  
- Rebase rewrites history; merge preserves it.  
- `git bisect run ./test` is the only command you need to remember for automated search.

**Spaced-repetition schedule**  
Review the six-command mental model after 1 day, 3 days, 7 days, 16 days, and 35 days.

**First-principles fallback**  
If you forget a command, draw the commit DAG on paper, mark the pointers you want to move or copy, then look up only the flag that performs that exact graph operation.

## 10. What this unlocks
Once these operations are second nature you can safely manage concurrent feature development, perform production hot-fixes, maintain long-lived release branches, and locate regressions in minutes instead of hours. The immediate next topics that rest on this foundation are:

- Advanced history rewriting with `git filter-repo` and `git replace`
- Monorepo-scale workflows (sparse checkout, partial clones)
- CI/CD pipelines that rely on deterministic linear histories
- Signed commits and verified merge strategies for supply-chain security

## 11. Self-check — five questions, no answers
1. After `git rebase` on a branch that has already been pushed, what single command will your teammate need to run to realign their local copy?  
2. In a graph containing one merge commit with two parents, how many commits will `git bisect` examine in the worst case between the merge and the root?  
3. You have uncommitted changes and must urgently apply a hot-fix commit. Which two commands (in order) let you preserve your work without creating a commit?  
4. Why does `git cherry-pick` sometimes produce a commit whose diff is empty even though the source commit changed files?  
5. A teammate ran `git push --force` after a rebase. What exact sequence of commands recovers the original commits on your machine if you have already fetched the new ref?