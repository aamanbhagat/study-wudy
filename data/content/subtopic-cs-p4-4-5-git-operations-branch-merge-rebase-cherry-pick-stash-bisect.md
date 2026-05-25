## What it is
The Git operations of `branch`, `merge`, `rebase`, `cherry-pick`, `stash`, and `bisect` are tools for managing the history of a software project. They allow you to isolate work, combine different lines of development, rewrite history for clarity, move specific changes, temporarily save work, and efficiently find bugs. These are the fundamental verbs for manipulating the commit graph.

## Why it matters
In any large-scale project—from flight control software for a spacecraft to a complex physics simulation—multiple developers or researchers work in parallel. These operations prevent chaos by enabling isolated feature development (`branch`), controlled integration (`merge`), and a clean, understandable project history (`rebase`). For example, in machine learning, you might use branches to track different experiments; in aerospace, a hotfix for guidance software can be `cherry-pick`ed onto a release branch without bringing in unfinished features.

## When to study it
You must be comfortable with the foundational Git concepts and commands. Specifically, you should understand the structure of a repository, the staging area, and the commit graph. Ensure you have mastered `git init`, `git add`, `git commit`, `git log`, `git status`, `git push`, and `git pull`. If the idea of a "commit hash" or a "directed acyclic graph" is unfamiliar, review those basics first.

## How to study it (step by step)
1.  **Setup:** Create a new directory and initialize a Git repository: `mkdir git-practice && cd git-practice && git init`. Create an initial file `main.txt` with the content "Commit A" and commit it.
2.  **Branch & Merge:** Create a new branch `feature` with `git checkout -b feature`. Add "Commit B" to `main.txt` and commit. Switch back to `main` (`git checkout main`). Add "Commit C" to `main.txt` and commit. Now, merge the feature branch with `git merge feature`. Observe the new "merge commit" in `git log --graph`.
3.  **Branch & Rebase:** Undo the merge (`git reset --hard HEAD~1`). You are back on `main` before the merge. Now, switch to the `feature` branch (`git checkout feature`) and run `git rebase main`. Check `git log --graph` on both branches. Notice how the history is now linear, as if "Commit B" was written after "Commit C".
4.  **Cherry-pick:** Create a new branch `hotfix` from `main`. Add a critical file `fix.txt` and commit it with a message "Urgent Fix D". You need this fix on your `feature` branch but not the rest of `hotfix`. Switch to `feature` and run `git cherry-pick <hash-of-commit-D>`. Verify that `fix.txt` is now on your `feature` branch.
5.  **Stash:** On your `feature` branch, modify `main.txt` but do not commit it. Imagine you need to switch to `main` immediately. Run `git stash` to save your changes. Switch to `main`, do some work (or not), then switch back to `feature`. Run `git stash pop` to re-apply your uncommitted changes.
6.  **Bisect:** Manually edit the history to introduce a bug. Find the hash of your very first commit ("Commit A"). Create a script `test.sh` with `#!/bin/sh; grep -q "BUG" main.txt && exit 1 || exit 0` and make it executable with `chmod +x test.sh`. Now, start the bisect: `git bisect start`, `git bisect bad HEAD`, `git bisect good <hash-of-commit-A>`. Then run `git bisect run ./test.sh`. Git will automatically check out commits and run the script until it finds the exact commit that introduced the bug.

## Key ideas, with intuition
1.  **Git is a Graph:** Every operation is a manipulation of a Directed Acyclic Graph (DAG). Commits are nodes, and parent-child relationships are directed edges. `C_3 \rightarrow C_2 \rightarrow C_1`. A branch is just a named pointer to a node (a commit). `main \rightarrow C_3`.
2.  **Branching is a Pointer:** Creating a branch (`git branch new-feature`) does not copy your files. It simply creates a new pointer, `new-feature`, that points to the same commit you are currently on. It's an extremely lightweight operation.
3.  **Merge: Weaving History Together:** A merge takes two divergent branches and creates a *new* commit that has two parents. This "merge commit" preserves the exact history of both branches, showing precisely when and how they were combined. It answers the question, "What work was done and when was it brought together?"
4.  **Rebase: Retelling History Linearly:** A rebase takes the commits from your current branch and "re-plays" them, one by one, on top of another branch. It rewrites history to make it appear as if you did your work sequentially, not in parallel. It answers the question, "How would my work look if I had started it today, based on the latest main branch?"
5.  **Detached HEAD:** `HEAD` is a special pointer that indicates your current location in the graph. Usually, `HEAD` points to a branch name (e.g., `main`), which in turn points to a commit. If you `checkout` a specific commit hash, `HEAD` points directly to that commit. This is a "detached HEAD" state—useful for inspection, but be careful about committing here, as the new commits don't belong to any branch.

## Worked example
Let's walk through the most common workflow: updating a feature branch with the latest changes from the `main` branch using `rebase`.

**Initial State:** You started work on `feature/login` when `main` was at commit `A`. Since then, `main` has advanced to commit `C`, and you've added commit `B` on your branch.

```text
      B -- (feature/login)
     /
A -- C -- (main)
```

**Goal:** Incorporate the changes from `C` into your `feature/login` branch so that your feature is built on the latest code, and the final history is clean and linear.

**Steps:**
1.  **Ensure `main` is up to date:**
    ```bash
    git checkout main
    git pull origin main
    ```
    This ensures your local `main` pointer is at commit `C`.

2.  **Switch to your feature branch:**
    ```bash
    git checkout feature/login
    ```
    You are now at commit `B`.

3.  **Perform the rebase:**
    ```bash
    git rebase main
    ```
    **What Git does:**
    a. It "unwinds" your branch, finding the common ancestor (`A`).
    b. It temporarily saves the changes you made in your branch (the patch for `B`).
    c. It fast-forwards your branch pointer `feature/login` to where `main` is (`C`).
    d. It "re-plays" your saved patch on top of `C`, creating a *new* commit, `B'`. The changes are the same, but the parent and the hash are different.

**Final State:**
```text
A -- C -- B' -- (feature/login)
     ^
     |
    (main)
```

**Reflection:**
- The `git checkout` commands moved our `HEAD` pointer to the correct starting points for the operation.
- The `git rebase main` command performed the graph surgery. It rewrote the history of `feature/login`.
- The final graph is linear, making it easy to read `git log` and to fast-forward merge into `main` later. We avoided a "merge bubble".

## Diagrams
Here are the commit graphs for `merge` vs. `rebase`.

**Scenario:** You branched from `main` at commit `A`, added `B` and `C` to your `feature` branch, while someone else added `D` and `E` to `main`.

**1. Using `git merge`:**
`git checkout main`
`git merge feature`

```text
      B ------ C -- (feature)
     /            \
A -- D ------ E -- M -- (main)
```
- `M` is a new merge commit.
- It has two parents: `E` and `C`.
- The history is preserved exactly as it happened, showing parallel development.

**2. Using `git rebase`:**
`git checkout feature`
`git rebase main`

```text
                  B' --- C' -- (feature)
                 /
A -- D ------ E -- (main)
```
- Commits `B` and `C` are re-written as new commits `B'` and `C'` on top of `E`.
- The history is now linear and easier to read.
- It looks as if the feature work began *after* `E` was completed.

## Memory technique — remember this forever
1.  **The Story: The Gardener's Code Tree**
    - Your repository is a tree. `main` is the trunk.
    - `git branch feature`: You graft a **new branch** onto the trunk to grow a feature.
    - `git merge feature`: You wait for the branch to grow, then **tie it back** to the trunk. This creates a knot (the merge commit) but shows where the branch came from.
    - `git rebase main`: You see the trunk has grown taller. You carefully **saw off your branch** and **re-plant its base** at the new tip of the trunk. It looks cleaner, like it grew there all along.
    - `git cherry-pick`: You see one perfect apple (a commit) on a colleague's branch. You **pick that single fruit** and place it in your own basket (branch).
    - `git stash`: A storm is coming (urgent bug fix). You quickly put your gardening tools (your uncommitted changes) in a **stash box** to deal with the storm, then take them out later.
    - `git bisect`: A branch is sick (has a bug). You use **binary search** on the timeline, checking halfway points (`good`/`bad`) to find the exact moment the sickness was introduced.

2.  **Overlearn these commands:**
    - `git checkout -b <new-branch-name>` (Create and switch to a new branch)
    - `git rebase -i <base>` (Interactive rebase: the master tool for history surgery)
    - `git stash pop` (Apply the most recently stashed changes and remove them from the stash list)

3.  **Spaced Repetition Schedule:**
    - Review these concepts and re-do the "How to study it" steps after **1 day**.
    - Review again after **3 days**.
    - Review again after **7 days**.
    - Review again after **16 days**.
    - Review again after **35 days**.

4.  **First Principles Pathway:**
    If you forget everything, remember this: **Git is a directed acyclic graph of commits, and branches are just pointers.** From there, you can reason about any operation. "I want my branch's history to look like it started from the current `main`." That sounds like moving the base of my branch... `re-base`. "I want to combine two lines of work." That sounds like `merge`.

## Common mistakes
1.  **Rebasing a Public Branch:** Never, ever rebase a branch that other people are using (like `main`, or a shared feature branch). Rebasing rewrites history. If you change the history others have based their work on, you create immense confusion and difficult-to-fix repository states. Merge is safe for public branches.
2.  **Resolving Merge/Rebase Conflicts by "Choosing Mine":** When a conflict occurs, Git asks you to manually fix a file. A common mistake is to blindly accept your version (`--ours`) or the incoming version (`--theirs`) without understanding the code. You must read the conflicting sections and integrate them logically.
3.  **Losing Work with `git stash`:** `git stash` is great, but it's easy to stash something, forget about it, and then have a confusingly clean working directory. Always check `git stash list` if you think you're missing changes.
4.  **Excessive Cherry-Picking:** Using `cherry-pick` once in a while for a hotfix is fine. If you find yourself constantly cherry-picking commits between long-lived branches, your branching strategy is likely flawed. It's often a sign that you should have merged or rebased sooner.

## Self-check
1.  You have two branches, `feature-a` and `feature-b`, which have diverged from `main`. You want to combine them. Describe the state of the `git log --graph` after running `git merge feature-b` from `feature-a`, versus running `git rebase feature-b` from `feature-a`.
2.  You are three commits into a new feature on a branch called `exp-feature`. The second commit fixed a critical typo in a shared utility file. This typo fix needs to go into `main` *now*, but the rest of your feature is not ready. What single Git command would you run from the `main` branch to accomplish this?
3.  A user reports that a bug was introduced into the `main` branch sometime in the last 200 commits. The last known good version is tagged as `v1.2`. You have a script, `./run-tests.sh`, that exits with code `0` on success and `1` on failure. What is the most efficient sequence of Git commands to find the exact commit that introduced the bug?