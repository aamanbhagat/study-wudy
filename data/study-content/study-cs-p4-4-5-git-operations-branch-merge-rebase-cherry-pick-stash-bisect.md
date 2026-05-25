## 1. What it is — in plain English

Imagine you're writing a story. You have the main storyline, but suddenly you get an idea for a side plot. You don't want to mess up your main story, so you grab a separate notebook and start writing the side plot there. That separate notebook is like a **branch** in Git. It's a parallel version of your work where you can experiment without affecting the main project.

Once your side plot is perfect, you might want to weave it back into your main story. Combining the side plot notebook with your main story notebook is like a **merge**. It takes the changes from your separate work and brings them into the main line of development. Sometimes, this can be tricky if you've changed the same sentences in both notebooks, leading to a "conflict" you need to resolve.

Now, what if you wrote your side plot, but then realized the main story had advanced significantly, and you wanted your side plot to appear as if it was written *after* those new main story developments, rather than alongside the older version? **Rebase** is like rewriting your side plot, making it look like it started from the *very latest* version of the main story, rather than an older one. It makes your history cleaner, but it's like erasing and re-writing, which can be risky if others are also reading your side plot notebook.

Sometimes, you don't want to combine an entire side plot, but just grab one brilliant paragraph from it and insert it into your main story. That's **cherry-pick**: taking a single, specific change from one place and applying it to another. If you're in the middle of writing and need to quickly switch to another task, but your current work isn't ready to be saved permanently, you can **stash** it away. It's like putting your current messy draft into a drawer, cleaning your desk, doing other work, and then pulling the draft back out later.

Finally, imagine your story suddenly has a plot hole, and you don't know when it appeared. You know the story was good yesterday, but it's bad today. **Bisect** is like a detective tool: it helps you quickly pinpoint the exact moment (the specific paragraph or change) when the plot hole was introduced, by systematically checking different points in your story's history.

## 2. Why it matters — real-world applications

These Git operations are the bedrock of collaborative software development, enabling teams of any size to build complex systems efficiently and reliably.

1.  **Large-scale Software Development (e.g., Google Chrome, Linux Kernel):** Imagine thousands of engineers worldwide contributing to a single codebase. Without branching, merging, and rebasing, this would be chaos. Developers create feature branches for new functionalities, bugfix branches for issues, and release branches for stable versions. They merge their changes back into the main development line, often using rebase to keep history clean before merging, preventing a tangled mess of overlapping work. This allows parallel development, dramatically accelerating product cycles.

2.  **Aerospace and Mission-Critical Systems (e.g., SpaceX Falcon 9 Flight Software):** In environments where software bugs can have catastrophic consequences, rigorous version control is non-negotiable. Git's branching model allows engineers to develop and test new features or bug fixes in isolated branches, ensuring they don't destabilize the main flight software. `git bisect` is invaluable for quickly pinpointing the exact commit that introduced a critical bug during testing, saving countless hours and ensuring the highest levels of reliability for rocket launches or satellite operations.

3.  **Machine Learning Model Development and Experimentation (e.g., OpenAI's GPT models):** ML engineers constantly experiment with different model architectures, hyperparameters, and data preprocessing techniques. Each experiment can be a distinct branch, allowing them to track specific changes, revert easily, and compare results. When a promising experiment yields a significant performance improvement, `git cherry-pick` might be used to extract just the relevant code changes (e.g., a specific optimization function or data augmentation script) and apply it to the main model training pipeline, without bringing over unrelated experimental code.

4.  **Open Source Contribution (e.g., TensorFlow, PyTorch):** Open source projects thrive on contributions from a global community. Developers fork repositories, create branches for their proposed features or bug fixes, and then submit pull requests. Project maintainers review these changes, often suggesting rebasing to clean up commit history before merging. This structured approach ensures code quality and maintainability across a diverse contributor base. `git stash` is frequently used by contributors who need to quickly switch contexts to review another pull request or fix a hot issue without committing their work-in-progress.

## 3. Prerequisites — what you must know first

Before diving deep into these advanced Git operations, ensure you have a solid grasp of the following foundational concepts:

*   **Version Control Systems (VCS) Basics:** Understanding what a VCS is, why it's used (tracking changes, collaboration, history), and the difference between centralized (CVCS) and distributed (DVCS) systems.
*   **Git Fundamentals:**
    *   **Repository (repo):** The `.git` directory containing all history and metadata.
    *   **Commit:** A snapshot of your project at a specific point in time, with a unique hash, author, message, and parent pointer(s).
    *   **HEAD:** A symbolic reference pointing to the currently checked-out commit or branch.
    *   **Working Directory:** The actual files you see and edit on your file system.
    *   **Staging Area (Index):** An intermediate area where you prepare changes before committing them.
    *   **Basic Git Commands:** `git init`, `git add`, `git commit`, `git status`, `git log`, `git checkout <commit/branch>`, `git diff`.
*   **Command Line Interface (CLI) Familiarity:** Comfortably navigating directories, executing commands, and understanding standard input/output.
*   **Text Editor Proficiency:** Being able to quickly edit files, especially for resolving merge conflicts.
*   **Basic Understanding of Code Changes:** Recognizing additions, deletions, and modifications in files.

## 4. The core idea — step by step

Let's break down each Git operation, building intuition and understanding how they manipulate your project's history. Git's history is fundamentally a Directed Acyclic Graph (DAG) where commits are nodes and parent pointers are directed edges.

### Step 1: Branch

**Plain-English Statement:** A branch is simply a lightweight, movable pointer to a commit. It allows you to create an independent line of development without affecting the main project. Think of it as labeling a specific point in your project's history and saying, "I want to start a new feature from here."

**Small Concrete Example:**
You are on the `main` branch, and you want to start a new feature called "user-profile."

```bash
git branch user-profile
```
This command creates a new pointer named `user-profile` that points to the *same commit* that your `main` branch currently points to. To start working on it, you'd then switch to it:
```bash
git checkout user-profile
```
Or, more concisely:
```bash
git checkout -b user-profile
```

**Formal/Mathematical Version:**
Let $C_{HEAD}$ be the current commit pointed to by the `HEAD` reference. A new branch $B_{new}$ is created such that $B_{new}$ is a reference to $C_{HEAD}$.
$$B_{new} \leftarrow C_{HEAD}$$
When you switch to $B_{new}$, `HEAD` is updated to point to $B_{new}$.
$$HEAD \leftarrow B_{new}$$
Subsequent commits will advance $B_{new}$ (and `HEAD`) while $B_{old}$ remains pointing to $C_{HEAD}$.

**What Could Go Wrong:**
*   **Creating a branch from the wrong commit:** If you don't `checkout` the correct commit or branch before creating a new branch, your new branch might start from an older or unrelated point in history. Always check `git status` or `git log --oneline` to confirm your `HEAD` position.

### Step 2: Merge

**Plain-English Statement:** Merging is the process of integrating changes from one branch into another. Git attempts to combine the histories of two branches into a single new commit, resolving any conflicting changes along the way.

**Small Concrete Example:**
You have a `main` branch and a `feature-x` branch. You've made some commits on `feature-x`, and now you want to bring those changes into `main`.

```bash
# First, switch to the branch you want to merge INTO
git checkout main

# Now, merge the feature-x branch into main
git merge feature-x
```
If there are no conflicting changes, Git will perform a "fast-forward" merge (if possible) or create a new "merge commit" that has two parents.

**Formal/Mathematical Version:**
Given two branches, $B_{current}$ (pointing to commit $C_1$) and $B_{other}$ (pointing to commit $C_2$). Git finds their common ancestor, $A$.
*   **Fast-forward merge:** If $C_1$ is a direct ancestor of $C_2$ (i.e., $A = C_1$), Git simply moves $B_{current}$ to point to $C_2$.
    $$B_{current} \leftarrow C_2$$
*   **Three-way merge (merge commit):** If $C_1$ is not a direct ancestor of $C_2$, Git creates a new commit $M$. This commit $M$ has two parents: $C_1$ and $C_2$. The content of $M$ combines the changes from $C_1$ relative to $A$, and $C_2$ relative to $A$. Then, $B_{current}$ is updated to point to $M$.
    $$M = \text{combine}(C_1, C_2, A)$$
    $$\text{parents}(M) = \{C_1, C_2\}$$
    $$B_{current} \leftarrow M$$

**What Could Go Wrong:**
*   **Merge Conflicts:** If both branches modified the same lines in the same file, Git can't automatically decide which change to keep. It will pause the merge and require you to manually resolve the conflicts in the affected files. This is a common and critical skill to master.
*   **Messy History:** If you merge frequently without careful planning, your commit history can become a complex web of merge commits, making it harder to follow the linear progression of changes.

### Step 3: Rebase

**Plain-English Statement:** Rebasing is like taking a stack of your commits from one branch, putting them aside, updating your base branch to the latest version, and then re-applying your stack of commits on top of that new base. It rewrites history to make it appear as if your changes were made directly on the latest version of the base branch, resulting in a linear history.

**Small Concrete Example:**
You have a `feature-x` branch that diverged from `main` a while ago. Meanwhile, `main` has received new commits. You want your `feature-x` branch to incorporate these new `main` commits and appear as if it started from the latest `main`.

```bash
# First, switch to your feature branch
git checkout feature-x

# Now, rebase it onto main
git rebase main
```
Git will find the common ancestor of `feature-x` and `main`, then take all commits on `feature-x` *after* that ancestor, temporarily remove them, fast-forward `feature-x` to `main`'s HEAD, and then re-apply those commits one by one.

**Formal/Mathematical Version:**
Let $B_{feature}$ be the branch to be rebased (pointing to commit $C_f$), and $B_{target}$ be the target branch (pointing to commit $C_t$). Let $A$ be the common ancestor of $C_f$ and $C_t$.
The set of commits to be replayed is $S = \{C_i | C_i \text{ is an ancestor of } C_f \text{ and not an ancestor of } A \}$.
Git performs the following sequence:
1.  Temporarily detaches $S$ from $C_f$.
2.  Moves `HEAD` to $C_t$.
3.  For each commit $C_i \in S$ (in chronological order):
    a.  A new commit $C_i'$ is created, applying the same changes as $C_i$ but with its parent set to the current `HEAD`.
    b.  `HEAD` is moved to $C_i'$.
4.  Finally, $B_{feature}$ is updated to point to the last replayed commit $C_k'$.
    $$B_{feature} \leftarrow C_k'$$
This effectively "moves" the entire branch $B_{feature}$ to start from $C_t$.

**What Could Go Wrong:**
*   **Rewriting Public History:** The golden rule of rebase is: **Never rebase commits that have already been pushed to a shared remote repository and other people might have based their work on.** Rebasing creates *new* commits with new hashes. If others have the *old* commits, their history will diverge from yours, leading to major confusion and requiring forced pushes (`git push --force`) which can overwrite others' work.
*   **Rebase Conflicts:** Similar to merge conflicts, if the commits being replayed conflict with changes on the target branch, Git will pause the rebase, requiring you to resolve conflicts for *each* conflicting commit in the sequence.

### Step 4: Cherry-pick

**Plain-English Statement:** Cherry-picking allows you to select a specific commit from anywhere in your repository's history and apply its changes as a *new* commit on your current branch. It's like finding a perfect patch in one version of your code and wanting to apply just that patch to your current working version, without bringing in all the other changes from that source.

**Small Concrete Example:**
You're on the `main` branch, and a critical bug fix was made in commit `a1b2c3d` on a `hotfix` branch. You want to apply *only* that fix to `main` without merging the entire `hotfix` branch.

```bash
# Ensure you are on the target branch
git checkout main

# Apply the specific commit's changes
git cherry-pick a1b2c3d
```
A new commit will be created on `main` that has the exact same changes as `a1b2c3d`.

**Formal/Mathematical Version:**
Let $C_{HEAD}$ be the current commit on the target branch. Given a source commit $C_{source}$ with parent $P_{source}$.
A new commit $C_{new}$ is created such that:
1.  The changes (diff) applied by $C_{new}$ are identical to the changes applied by $C_{source}$ relative to $P_{source}$.
    $$\text{diff}(C_{new}, C_{HEAD}) = \text{diff}(C_{source}, P_{source})$$
2.  The parent of $C_{new}$ is $C_{HEAD}$.
    $$\text{parent}(C_{new}) = C_{HEAD}$$
3.  The current branch pointer moves to $C_{new}$.
    $$B_{current} \leftarrow C_{new}$$

**What Could Go Wrong:**
*   **Conflicts:** If the changes introduced by the cherry-picked commit conflict with the current state of your branch, you'll encounter a conflict that needs to be resolved manually.
*   **Duplicate Changes:** Cherry-picking can lead to duplicated changes in history if the same commit is later merged in its entirety, though Git is usually smart enough to handle this gracefully during a merge.
*   **Loss of Context:** A cherry-picked commit loses its original historical context. While the changes are applied, the connection to its original branch and purpose might be less clear in the new branch's history.

### Step 5: Stash

**Plain-English Statement:** Stashing takes your uncommitted changes (both staged and unstaged) and saves them in a temporary "shelf" or "stack" so your working directory becomes clean, matching the `HEAD` commit. It's perfect when you need to switch contexts quickly without committing incomplete work.

**Small Concrete Example:**
You're working on a feature, but your boss just asked you to fix an urgent bug on the `main` branch. Your current work isn't ready for a commit.

```bash
# Save your current uncommitted changes
git stash save "WIP: user profile changes"
```
Your working directory is now clean. You can switch branches, fix the bug, commit it, and then switch back and retrieve your stashed changes.

```bash
git checkout main
# ... fix bug, commit ...
git checkout feature-branch
git stash pop # Applies the latest stash and removes it from the stack
```

**Formal/Mathematical Version:**
When `git stash` is executed:
1.  Git records the current state of the working directory and the staging area as a set of temporary commit objects. Typically, three commit objects are created:
    *   One for the working directory (parent is `HEAD`).
    *   One for the index (parent is `HEAD`).
    *   One for untracked files (optional, with `git stash -u`).
    These commits are not part of any branch history but are stored in a special reference `refs/stash`.
2.  The working directory and staging area are reverted to the state of the `HEAD` commit.
    $$WorkingDir \leftarrow \text{ContentOf}(HEAD)$$
    $$StagingArea \leftarrow \text{ContentOf}(HEAD)$$
When `git stash pop` (or `apply`) is executed:
1.  The changes recorded in the top stash entry are applied to the working directory and staging area.
2.  If `pop` is used, the stash entry is removed from the stack.
    $$WorkingDir \leftarrow WorkingDir \cup \text{StashChanges}$$
    $$StagingArea \leftarrow StagingArea \cup \text{StashIndexChanges}$$

**What Could Go Wrong:**
*   **Stash Conflicts:** If you apply a stash to a branch that has diverged significantly or made conflicting changes, you might encounter conflicts when applying the stash.
*   **Forgetting Stashes:** Stashes are local to your repository and can be forgotten. Use `git stash list` to see them.
*   **Losing Untracked Files:** By default, `git stash` does not stash untracked files. You need `git stash -u` or `git stash --include-untracked` for that.

### Step 6: Bisect

**Plain-English Statement:** Bisect is a powerful debugging tool that uses a binary search algorithm to find the exact commit that introduced a bug. You tell Git a known "bad" commit (where the bug exists) and a known "good" commit (where the bug didn't exist), and Git will systematically check out commits in between, asking you to mark each one as "good" or "bad" until it narrows down to the single offending commit.

**Small Concrete Example:**
Your application was working yesterday, but it's broken today. You know `v1.0` was good, and `HEAD` is bad.

```bash
# Start the bisect session
git bisect start

# Tell Git the current commit (HEAD) is bad
git bisect bad

# Tell Git a known good commit (e.g., a tag or an older commit hash)
git bisect good v1.0
```
Git will then check out a commit roughly in the middle of the good and bad range. You test the application.

```bash
# If the bug is present in the checked-out commit:
git bisect bad

# If the bug is NOT present:
git bisect good
```
Repeat this process. Git will keep checking out commits until it finds the first bad commit.

```bash
# After finding the commit, end the bisect session and return to original HEAD
git bisect reset
```

**Formal/Mathematical Version:**
Given a range of commits $[C_{good}, C_{bad}]$ (where $C_{good}$ is an ancestor of $C_{bad}$).
The `git bisect` algorithm performs a binary search:
1.  Initialize search range: $L = \text{commit_index}(C_{good})$, $R = \text{commit_index}(C_{bad})$.
2.  While $R - L > 1$:
    a.  Calculate middle commit: $M = \text{commit_at_index}((L+R)/2)$.
    b.  Checkout $M$.
    c.  User tests $M$ and marks it as `good` or `bad`.
    d.  If $M$ is marked `bad`, set $R = \text{commit_index}(M)$.
    e.  If $M$ is marked `good`, set $L = \text{commit_index}(M)$.
3.  The first bad commit is $C_{bad\_final}$ (the one just after the last `good` one).
The number of steps required is approximately $\log_2 N$, where $N$ is the number of commits in the range.

**What Could Go Wrong:**
*   **Incorrectly Marking Commits:** If you accidentally mark a good commit as bad or vice-versa, the bisect process will lead you to the wrong commit.
*   **Non-Reproducible Bugs:** If the bug isn't consistently reproducible, bisecting can be difficult or misleading.
*   **Broken Commits:** If some commits in the history range are simply broken (e.g., don't compile) but don't contain the *target bug*, it can complicate testing. You can use `git bisect skip` in such cases.
*   **Complex Build Steps:** If each commit requires a lengthy build process, bisecting can still be time-consuming. Automated bisect (`git bisect run <script>`) can help here.

## 5. Worked examples — multiple, with every step shown

Let's walk through several scenarios to solidify your understanding. We'll use a simple text file `story.txt` to represent our code.

### Example 1: Basic Branch, Commit, and Merge (Fast-Forward)

**Problem:** Start a new project, create a feature branch, add a new line, commit it, and then merge it back into the main branch.

**Given:** An empty directory.
**Want:** A `main` branch with the new feature integrated.

**Steps:**

1.  **Initialize a new Git repository:**
    ```bash
    git init
    ```
    *Explanation:* This command creates a new, empty Git repository in the current directory, setting up the `.git` folder.

2.  **Create an initial file and commit it to `main`:**
    ```bash
    echo "Once upon a time, there was a story." > story.txt
    git add story.txt
    git commit -m "Initial commit: Start the story"
    ```
    *Explanation:* We create our first file, add it to the staging area, and then commit it. This establishes our `main` branch's starting point.

3.  **Create a new branch for a feature:**
    ```bash
    git branch add-character
    ```
    *Explanation:* This creates a new pointer called `add-character` that points to the same commit as `main`.

4.  **Switch to the new feature branch:**
    ```bash
    git checkout add-character
    ```
    *Explanation:* `HEAD` now points to `add-character`, so any new commits will be added to this branch.

5.  **Make changes on the feature branch and commit them:**
    ```bash
    echo "A brave knight named Sir Lancelot joined the quest." >> story.txt
    git add story.txt
    git commit -m "Feature: Added Sir Lancelot"
    ```
    *Explanation:* We modify `story.txt`, stage the change, and create a new commit on the `add-character` branch. `main` remains unchanged.

6.  **Switch back to the `main` branch:**
    ```bash
    git checkout main
    ```
    *Explanation:* We move `HEAD` back to `main`. Notice that `story.txt` reverts to its state *before* Sir Lancelot was added, because those changes are only on `add-character`.

7.  **Merge the feature branch into `main`:**
    ```bash
    git merge add-character
    ```
    *Explanation:* Since `main` has not diverged (no new commits were made on `main` since `add-character` was created), Git performs a "fast-forward" merge. It simply moves the `main` pointer forward to the latest commit on `add-character`.

8.  **Verify the history and file content:**
    ```bash
    git log --oneline --graph
    cat story.txt
    ```
    *Explanation:* `git log` shows a linear history. `cat story.txt` confirms the content now includes Sir Lancelot.

**Final Answer:**
```text
* 456defg (HEAD -> main, add-character) Feature: Added Sir Lancelot
* 123abcd Initial commit: Start the story
```
The `story.txt` file now contains:
```
Once upon a time, there was a story.
A brave knight named Sir Lancelot joined the quest.
```

**Reflection:** This was an easy example because the `main` branch didn't have any new commits after `add-character` was created. Git could simply "fast-forward" the `main` pointer, making the history perfectly linear.

---

### Example 2: Branch, Commit, and Merge (Three-Way Merge with Conflict)

**Problem:** Create a feature branch, make changes. Meanwhile, make conflicting changes on the `main` branch. Then, merge the feature branch into `main` and resolve the conflict.

**Given:** The state from Example 1 (initial commit with "Once upon a time...").
**Want:** `main` branch with changes from both branches, conflict resolved.

**Steps:**

1.  **Start from the initial commit state (or reset to it):**
    ```bash
    # Assuming we are continuing from Example 1, let's reset to the initial commit
    # and remove the add-character branch to start clean for this scenario.
    git reset --hard 123abcd # Replace 123abcd with your actual initial commit hash
    git branch -D add-character # Delete the old branch if it exists
    git checkout main
    ```
    *Explanation:* We ensure our `main` branch is at the initial commit, ready for a new scenario.

2.  **Create a new feature branch and switch to it:**
    ```bash
    git checkout -b new-plot-line
    ```
    *Explanation:* We create a new branch `new-plot-line` and immediately switch to it.

3.  **Make changes on `new-plot-line` and commit:**
    ```bash
    echo "The knight embarked on a perilous journey." >> story.txt
    git add story.txt
    git commit -m "Feature: Added journey description"
    ```
    *Explanation:* We add a new line to `story.txt` on the `new-plot-line` branch.

4.  **Switch back to `main`:**
    ```bash
    git checkout main
    ```
    *Explanation:* We return to `main`. `story.txt` again reverts to its original state.

5.  **Make conflicting changes on `main` and commit:**
    ```bash
    echo "A wise wizard appeared to guide the hero." >> story.txt
    git add story.txt
    git commit -m "Main: Introduced a wizard"
    ```
    *Explanation:* We add a *different* new line to `story.txt` on the `main` branch. Now, both branches have added a line at the same logical position (end of file).

6.  **Attempt to merge `new-plot-line` into `main`:**
    ```bash
    git merge new-plot-line
    ```
    *Explanation:* Git tries to combine the changes. It sees that both branches added lines at the end of the file, which it can't automatically reconcile. It declares a merge conflict.

    The output will look something like:
    ```
    Auto-merging story.txt
    CONFLICT (content): Merge conflict in story.txt
    Automatic merge failed; fix conflicts and then commit the result.
    ```

7.  **Resolve the merge conflict:**
    Open `story.txt` in your editor. It will look like this:
    ```
    Once upon a time, there was a story.
    <<<<<<< HEAD
    A wise wizard appeared to guide the hero.
    =======
    The knight embarked on a perilous journey.
    >>>>>>> new-plot-line
    ```
    *Explanation:* Git uses special markers (`<<<<<<<`, `=======`, `>>>>>>>`) to show the conflicting sections. `HEAD` refers to the `main` branch's changes, and `new-plot-line` refers to the feature branch's changes.

    Edit `story.txt` to combine the changes as you desire. For example, you might want both lines:
    ```
    Once upon a time, there was a story.
    A wise wizard appeared to guide the hero.
    The knight embarked on a perilous journey.
    ```

8.  **Stage the resolved file and commit the merge:**
    ```bash
    git add story.txt
    git commit -m "Merge branch 'new-plot-line' into main, resolved conflict"
    ```
    *Explanation:* After resolving the conflict, you `add` the file to mark it as resolved, and then `commit`. Git automatically creates a merge commit with two parents.

9.  **Verify the history and file content:**
    ```bash
    git log --oneline --graph
    cat story.txt
    ```
    *Explanation:* `git log` now shows a merge commit with two parent lines. `cat story.txt` confirms the combined content.

**Final Answer:**
```text
*   fedcba9 (HEAD -> main) Merge branch 'new-plot-line' into main, resolved conflict
|\
| * 7654321 (new-plot-line) Feature: Added journey description
* | abcdef0 Main: Introduced a wizard
|/
* 123abcd Initial commit: Start the story
```
The `story.txt` file now contains:
```
Once upon a time, there was a story.
A wise wizard appeared to guide the hero.
The knight embarked on a perilous journey.
```

**Reflection:** This example highlights the common scenario of merge conflicts. Understanding the conflict markers and how to manually edit files to resolve them is crucial. The resulting history is non-linear, showing the point where the two branches diverged and then merged.

---

### Example 3: Branch, Rebase, and Push (for a personal feature branch)

**Problem:** Create a feature branch, make commits. Meanwhile, the `main` branch gets new commits. Rebase your feature branch onto the latest `main` to maintain a linear history, then merge it.

**Given:** An initial project state (let's assume the `story.txt` from previous examples).
**Want:** `main` branch with feature changes, but with a perfectly linear history.

**Steps:**

1.  **Start from a clean `main` branch:**
    ```bash
    git checkout main
    # Ensure it's up-to-date if you had a remote: git pull origin main
    ```
    *Explanation:* We start on `main`.

2.  **Create and switch to a new feature branch:**
    ```bash
    git checkout -b add-villain
    ```
    *Explanation:* We're creating a branch to add a villain.

3.  **Make commits on `add-villain`:**
    ```bash
    echo "An evil sorcerer, Malakor, cast a dark spell." >> story.txt
    git add story.txt
    git commit -m "Feature: Introduced Malakor"

    echo "The land fell into despair." >> story.txt
    git add story.txt
    git commit -m "Feature: Despair spreads"
    ```
    *Explanation:* Two commits are made on the `add-villain` branch.

4.  **Switch back to `main` and make a new commit:**
    ```bash
    git checkout main
    echo "The prophecy spoke of a hero." >> story.txt
    git add story.txt
    git commit -m "Main: Added prophecy detail"
    ```
    *Explanation:* `main` now has a new commit that `add-villain` doesn't know about. The histories have diverged.

5.  **Rebase `add-villain` onto `main`:**
    ```bash
    git checkout add-villain
    git rebase main
    ```
    *Explanation:* Git will:
    1.  Find the common ancestor.
    2.  Take the two commits from `add-villain` (`Introduced Malakor`, `Despair spreads`).
    3.  Move `add-villain`'s base to the latest `main` commit (`Added prophecy detail`).
    4.  Re-apply the two commits on top of the new base. New commit hashes will be generated.

    The output will show commits being replayed:
    ```
    Successfully rebased and updated refs/heads/add-villain.
    ```

6.  **Switch back to `main` and perform a fast-forward merge:**
    ```bash
    git checkout main
    git merge add-villain
    ```
    *Explanation:* After the rebase, `add-villain` now contains all commits from `main` plus its own replayed commits on top. `main` is an ancestor of `add-villain`. Thus, Git can perform a fast-forward merge, simply moving the `main` pointer forward.

7.  **Verify the history and file content:**
    ```bash
    git log --oneline --graph
    cat story.txt
    ```
    *Explanation:* The history is perfectly linear, as if the `add-villain` commits were always made after the `main` commits.

**Final Answer:**
```text
* 987zyxw (HEAD -> main, add-villain) Feature: Despair spreads
* 654vuts Feature: Introduced Malakor
* 321qwer Main: Added prophecy detail
* 123abcd Initial commit: Start the story
```
The `story.txt` file now contains:
```
Once upon a time, there was a story.
A wise wizard appeared to guide the hero.
The knight embarked on a perilous journey.
The prophecy spoke of a hero.
An evil sorcerer, Malakor, cast a dark spell.
The land fell into despair.
```

**Reflection:** Rebasing successfully created a clean, linear history. This is often preferred in team workflows for feature branches before merging them into `main`, provided the feature branch hasn't been pushed to a shared remote. If it had, we'd need a `git push --force` (which is dangerous) or a regular merge would be more appropriate.

---

### Example 4: Cherry-pick a Hotfix

**Problem:** A critical bug is found and fixed on a `hotfix` branch. We need to apply *only* that specific fix to the `main` branch immediately, without merging the entire `hotfix` branch (which might contain other unfinished changes).

**Given:**
*   `main` branch with some commits.
*   `hotfix` branch with a specific bug fix commit, plus other development.
**Want:** `main` branch to include the bug fix, but not the other `hotfix` changes.

**Steps:**

1.  **Set up the scenario:**
    ```bash
    git checkout main
    # Assume main has commits: C1 -> C2 -> C3 (C3 is HEAD)
    echo "Line 1" > file.txt
    git add file.txt
    git commit -m "C1: Initial file"
    echo "Line 2" >> file.txt
    git add file.txt
    git commit -m "C2: Add line 2"
    echo "Buggy Line 3" >> file.txt # Introduce a bug
    git add file.txt
    git commit -m "C3: Introduce buggy line 3"

    git checkout -b hotfix
    echo "Fixed Line 3" > file.txt # Fix the bug
    git add file.txt
    git commit -m "C4: Hotfix: Fixed buggy line 3" # This is the commit we want to cherry-pick

    echo "New feature on hotfix" >> file.txt # Other changes on hotfix
    git add file.txt
    git commit -m "C5: Feature: Add new feature on hotfix"
    ```
    *Explanation:* We've created `main` with a bug in C3. Then, we branched `hotfix`, fixed the bug in C4, and added another feature in C5.

2.  **Identify the commit to cherry-pick:**
    We need the hash of commit C4 ("Hotfix: Fixed buggy line 3").
    ```bash
    git log --oneline hotfix
    ```
    Let's assume C4's hash is `d1e2f3g`.

3.  **Switch to the target branch (`main`):**
    ```bash
    git checkout main
    ```
    *Explanation:* We need to be on the branch where the fix will be applied.

4.  **Cherry-pick the hotfix commit:**
    ```bash
    git cherry-pick d1e2f3g
    ```
    *Explanation:* Git takes the changes from commit `d1e2f3g` and applies them as a *new* commit on top of `main`.

    If there are no conflicts, you'll see:
    ```
    [main h9i8j7k] Hotfix: Fixed buggy line 3
     1 file changed, 1 insertion(+), 1 deletion(-)
    ```

5.  **Verify the history and file content on `main`:**
    ```bash
    git log --oneline --graph
    cat file.txt
    ```
    *Explanation:* `main` now has a new commit (h9i8j7k) that mirrors the fix from `d1e2f3g`. The `file.txt` content on `main` should now be fixed. The `hotfix` branch still contains C5, which is not on `main`.

**Final Answer:**
`git log --oneline --graph` on `main`:
```text
* h9i8j7k (HEAD -> main) Hotfix: Fixed buggy line 3
* c3b2a1d C3: Introduce buggy line 3
* b2a1d0c C2: Add line 2
* a1d0c9b C1: Initial file
```
`cat file.txt` on `main`:
```
Line 1
Line 2
Fixed Line 3
```
The `hotfix` branch history would still look like:
```text
* e5f4g3h (hotfix) C5: Feature: Add new feature on hotfix
* d1e2f3g C4: Hotfix: Fixed buggy line 3
* c3b2a1d C3: Introduce buggy line 3
* b2a1d0c C2: Add line 2
* a1d0c9b C1: Initial file
```

**Reflection:** Cherry-picking is powerful for surgical application of specific changes. It's often used for hotfixes or backporting features to older release branches. The key is that it creates a *new* commit, so the original commit hash is not preserved in the new branch's history.

---

### Example 5: Stash and Bisect

**Problem:** You're working on a feature, but need to quickly switch to another branch to debug a problem. You then use `bisect` to find the commit that introduced the bug.

**Given:**
*   A `main` branch with a known bug that appeared recently.
*   You have uncommitted changes on a `feature-A` branch.
**Want:**
*   To temporarily save your `feature-A` changes.
*   To identify the problematic commit on `main`.
*   To restore your `feature-A` changes.

**Steps:**

1.  **Set up the scenario (creating a history with a bug):**
    ```bash
    git init
    echo "Initial content" > bug_app.py
    git add bug_app.py
    git commit -m "C1: Initial app"

    echo "def func_a(): return 1" >> bug_app.py
    git add bug_app.py
    git commit -m "C2: Add func_a"

    echo "def func_b(): return 2" >> bug_app.py
    git add bug_app.py
    git commit -m "C3: Add func_b"

    echo "def func_c(): return 3" >> bug_app.py
    git add bug_app.py
    git commit -m "C4: Add func_c"

    # Introduce the bug in C5
    echo "def buggy_func(): return 'error'" >> bug_app.py # This is the bug!
    git add bug_app.py
    git commit -m "C5: Introduce buggy_func"

    echo "def func_d(): return 4" >> bug_app.py
    git add bug_app.py
    git commit -m "C6: Add func_d"

    # Create a feature branch and make uncommitted changes
    git checkout -b feature-A
    echo "# Working on feature A" >> feature_a.py
    echo "def new_feature(): pass" >> feature_a.py
    git add feature_a.py
    echo "Temporary change in bug_app.py" >> bug_app.py # Uncommitted change
    ```
    *Explanation:* We have a `main` branch with 6 commits, where C5 introduces a bug. We're currently on `feature-A` with uncommitted changes.

2.  **Stash the uncommitted changes:**
    ```bash
    git stash save "WIP on feature-A"
    ```
    *Explanation:* This saves all changes in `feature_a.py` and the temporary change in `bug_app.py` to the stash stack and cleans the working directory.

    Output:
    ```
    Saved working directory and index state WIP on feature-A: 7890abc WIP on feature-A
    HEAD is now at 7890abc C6: Add func_d
    ```

3.  **Switch to `main` to start debugging:**
    ```bash
    git checkout main
    ```
    *Explanation:* We are now on a clean `main` branch, ready to bisect.

4.  **Start `git bisect`:**
    ```bash
    git bisect start
    ```
    *Explanation:* Initializes the bisect session.

5.  **Mark `HEAD` as bad and a known good commit:**
    ```bash
    git bisect bad # Current HEAD (C6) is bad
    git bisect good C1 # C1 (Initial app) is known good
    ```
    *Explanation:* We tell Git the range to search. Git will then check out a commit in the middle (likely C3).

    Output will show something like:
    ```
    Bisecting: 2 revisions left to test after this (roughly 1 step)
    [<commit_hash_C3>] C3: Add func_b
    ```

6.  **Test the current commit (C3) and mark it:**
    *   Examine `bug_app.py`. Does it contain `buggy_func`? No.
    *   So, C3 is good.
    ```bash
    git bisect good
    ```
    *Explanation:* Git narrows the search. It will now check out C5 (the actual bad commit).

    Output:
    ```
    Bisecting: 0 revisions left to test after this (roughly 0 steps)
    [<commit_hash_C5>] C5: Introduce buggy_func
    ```

7.  **Test the current commit (C5) and mark it:**
    *   Examine `bug_app.py`. Does it contain `buggy_func`? Yes.
    *   So, C5 is bad.
    ```bash
    git bisect bad
    ```
    *Explanation:* Git has found the first bad commit.

    Output:
    ```
    <commit_hash_C5> is the first bad commit
    author John Doe <john.doe@example.com>
    date   Mon Jan 1 12:00:00 2023 -0500

        C5: Introduce buggy_func

    bug_app.py | 1 +
    1 file changed, 1 insertion(+)
    ```

8.  **End the bisect session:**
    ```bash
    git bisect reset
    ```
    *Explanation:* This returns `HEAD` to its original position (C6 on `main`) before `bisect start` was called.

9.  **Switch back to your feature branch and apply the stash:**
    ```bash
    git checkout feature-A
    git stash pop
    ```
    *Explanation:* We return to `feature-A` and retrieve our saved changes from the stash. `git stash pop` applies the changes and removes the stash entry.

    Output:
    ```
    On branch feature-A
    Changes to be committed:
      (use "git restore --staged <file>..." to unstage)
        new file:   feature_a.py

    Changes not staged for commit:
      (use "git add <file>..." to update what will be committed)
      (use "git restore <file>..." to discard changes in working directory)
        modified:   bug_app.py

    Dropped refs/stash@{0} (7890abc...)
    ```

**Final Answer:**
The bisect identified commit `C5` as the first bad commit.
Your `feature-A` branch is now back to its state before the stash, with `feature_a.py` staged and `bug_app.py` modified but unstaged.

**Reflection:** This example demonstrates the power of `git stash` for context switching and `git bisect` for efficient debugging. `bisect` is a crucial tool for maintaining large codebases, especially when bugs are introduced subtly over many commits. The logarithmic search time makes it incredibly efficient.

## 6. Common mistakes and traps

1.  **Rebasing Public History:** The cardinal rule of Git. If you rebase a branch that you've already pushed to a shared remote, and others have pulled those commits, you create a divergent history. When you then try to push your rebased branch, you'll need `git push --force`, which overwrites the remote history and can cause significant problems for collaborators.
    *   *Why it happens:* Desire for a clean, linear history without understanding the implications for shared work.

2.  **Not Resolving Merge/Rebase Conflicts Correctly:** Panicking when conflicts appear, deleting important code, or leaving conflict markers in the file.
    *   *Why it happens:* Lack of familiarity with conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) and the manual process of editing files to combine changes.

3.  **Losing Stashed Changes:** Forgetting what's in the stash, stashing over important work, or not realizing `git stash pop` removes the entry.
    *   *Why it happens:* Stashes are local and temporary. Without `git stash list` or `git stash show`, they can be out of sight, out of mind.

4.  **Confusing `merge` and `rebase`:** Not understanding when to use which, leading to either a messy history (too many merges) or dangerous history rewriting (rebasing public branches).
    *   *Why it happens:* Both combine histories, but their methods (new merge commit vs. replaying commits) and impact on history are fundamentally different.

5.  **Not Understanding `HEAD` and Branch Pointers:** Making commits on the wrong branch or detaching `HEAD` unintentionally.
    *   *Why it happens:* A mental model of Git as merely "saving files" rather than manipulating a graph of commits and pointers. `git status` and `git log` are essential for staying oriented.

6.  **Incorrectly Using `git bisect`:** Marking commits as good/bad incorrectly, or not `reset`ting the bisect session, leaving the repository in a detached HEAD state.
    *   *Why it happens:* Rushing the testing phase or not understanding that `bisect` modifies `HEAD` to check out intermediate commits.

## 7. Textbook-precise explanation

In Git, the repository's history is modeled as a Directed Acyclic Graph (DAG) where each node is a **commit** and directed edges represent parent-child relationships. A commit $C$ is uniquely identified by a SHA-1 hash $H(C)$ and contains a snapshot of the project's files, metadata (author, committer, timestamp), and pointers to its parent commit(s).

1.  **Branch ($B$):** A branch is a lightweight, mutable reference (a pointer) to a commit. When a branch $B$ is created from a commit $C$, $B$ simply points to $C$. Subsequent commits made while $B$ is checked out (`HEAD` points to $B$) cause $B$ to advance to the newly created commit. Formally, given a commit $C_0$ and a new branch name $B_{new}$, the operation `git branch $B_{new}$` establishes $B_{new} \equiv C_0$. If `HEAD` is currently pointing to $C_0$ via $B_{old}$, then `git checkout $B_{new}$` updates `HEAD` to point to $B_{new}$, such that `HEAD` then indirectly points to $C_0$. (See: Chacon & Straub, *Pro Git*, §3.1 "Git Branching - What a Branch Is").

2.  **Merge ($M$):** The merge operation integrates changes from a source branch $B_S$ into a target branch $B_T$.
    *   **Fast-forward Merge:** If $B_T$ is an ancestor of $B_S$ (i.e., $C(B_T)$ is a direct ancestor of $C(B_S)$), Git simply moves the pointer $B_T$ to $C(B_S)$. The history remains linear.
    *   **Three-way Merge:** If $B_T$ is not an ancestor of $B_S$, Git identifies a common ancestor commit $A = \text{LCA}(C(B_T), C(B_S))$ (Lowest Common Ancestor). It then computes three diffs: $\Delta_{A \to C(B_T)}$, $\Delta_{A \to C(B_S)}$. These diffs are applied to $A$ to produce a new **merge commit** $C_M$. This $C_M$ has two parents: $C(B_T)$ and $C(B_S)$. The pointer $B_T$ is then updated to $C_M$. If the diffs conflict on the same lines, a merge conflict occurs, requiring manual resolution before $C_M$ can be created. (See: Chacon & Straub, *Pro Git*, §3.2 "Git Branching - Basic Branching and Merging").

3.  **Rebase ($R$):** The rebase operation is designed to move a sequence of commits to a new base commit, effectively rewriting history. Given a feature branch $B_F$ (pointing to $C_F$) and a target branch $B_T$ (pointing to $C_T$), `git rebase $B_T$` operates as follows:
    1.  It finds the common ancestor $A = \text{LCA}(C_F, C_T)$.
    2.  It identifies the set of commits $S = \{C_i | C_i \text{ is an ancestor of } C_F \text{ and not an ancestor of } A \}$. These are the commits unique to $B_F$ since it diverged from $B_T$.
    3.  Git temporarily detaches $S$.
    4.  It moves the `HEAD` reference to $C_T$.
    5.  For each commit $C_i \in S$ (in chronological order), Git computes the patch $\text{diff}(P(C_i), C_i)$ (where $P(C_i)$ is the parent of $C_i$) and applies this patch to the current `HEAD`. A *new* commit $C_i'$ is created with `HEAD` as its parent.
    6.  The branch pointer $B_F$ is then updated to point to the last replayed commit.
    This process creates a new, linear history where $B_F$ appears to have diverged directly from $C_T$. Rebase should be used with caution on branches that have been pushed to a shared remote, as it rewrites history by creating new commit hashes. (See: Chacon & Straub, *Pro Git*, §3.6 "Git Branching - Rebasing").

4.  **Cherry-pick ($CP$):** The cherry-pick operation applies the changes introduced by one or more existing commits as new commits on the current `HEAD`. Given a target commit $C_{target}$ and a source commit $C_{source}$ with parent $P_{source}$, `git cherry-pick $H(C_{source})$` creates a new commit $C_{new}$ on top of $C_{target}$. The content of $C_{new}$ is derived by applying the patch $\text{diff}(P_{source}, C_{source})$ to the content of $C_{target}$. The parent of $C_{new}$ is $C_{target}$, and the current branch pointer is advanced to $C_{new}$. (See: Chacon & Straub, *Pro Git*, §7.5 "Git Tools - Cherry-Pick").

5.  **Stash ($S_t$):** The stash operation temporarily saves changes that are not ready to be committed, allowing the user to switch context. When `git stash` is invoked, Git records the state of the working directory and the staging area (index) into a stack of temporary commit objects (typically three: one for the working directory, one for the index, and one for the base `HEAD` commit). These commits are not part of the main branch history. The working directory and staging area are then reverted to the state of the `HEAD` commit. Stashed changes can later be re-applied using `git stash apply` or `git stash pop`. (See: Chacon & Straub, *Pro Git*, §7.3 "Git Tools - Stashing and Cleaning").

6.  **Bisect ($B_i$):** The bisect operation is a debugging tool that performs a binary search on the commit history to find the first commit that introduced a regression. Given a known "good" commit $C_{good}$ and a known "bad" commit $C_{bad}$ (where $C_{good}$ is an ancestor of $C_{bad}$), `git bisect start` initializes the process. Git then checks out a commit $C_{mid}$ roughly in the middle of the range $[C_{good}, C_{bad}]$. The user tests $C_{mid}$ and marks it as `good` or `bad`. Based on this feedback, Git iteratively narrows the search range, checking out a new $C_{mid}$ until only one commit remains as the culprit. The number of steps is logarithmic with respect to the number of commits in the range, i.e., $O(\log N)$. (See: Chacon & Straub, *Pro Git*, §7.8 "Git Tools - Debugging with Git").

## 8. ASCII diagrams

Here are some ASCII diagrams to visualize the operations. Circles represent commits, and arrows represent parent pointers (pointing from child to parent). Branch names are pointers to commits. `HEAD` points to the current branch.

### 1. Branching and Merging (Three-Way Merge)

```text
Initial state:
      A -- B -- C (main, HEAD)
           ^
           |
         (feature) -- not yet created

After `git branch feature`:
      A -- B -- C (main, HEAD, feature)

After `git checkout feature`, then commit D, E:
      A -- B -- C (main)
           \
            D -- E (feature, HEAD)

After `git checkout main`, then commit F, G:
      A -- B -- C -- F -- G (main, HEAD)
           \
            D -- E (feature)

After `git merge feature` (from main):
      A -- B -- C -- F -- G -- H (main, HEAD)
           \                 /
            D ----- E ------
                      ^
                      |
                     (feature)

Note: H is the new merge commit with two parents (G and E).
The common ancestor is B. Git combines changes from (B->G) and (B->E).
```

### 2. Rebasing

```text
Initial state (same as before merge, but we want a linear history):
      A -- B -- C -- F -- G (main)
           \
            D -- E (feature, HEAD)

After `git checkout feature`, then `git rebase main`:
(Git finds common ancestor B. Takes D, E. Moves feature to G. Re-applies D, E)

      A -- B -- C -- F -- G (main)
                         \
                          D' -- E' (feature, HEAD)

Note: D' and E' are *new* commits. They have the same changes as D and E,
but their parent is G (for D') and D' (for E').
The old commits D and E are effectively abandoned (will be garbage collected later).
```

### 3. Cherry-picking

```text
Initial state:
      A -- B -- C (main, HEAD)
           \
            D -- E -- F (feature)
                 ^
                 |--- We want to cherry-pick commit E

After `git checkout main`, then `git cherry-pick E_hash`:

      A -- B -- C -- E' (main, HEAD)
           \
            D -- E -- F (feature)

Note: E' is a *new* commit on main, containing the same changes as E.
It has a new hash and its parent is C.
```

### 4. Bisect (Conceptual Binary Search)

```text
Commits in chronological order:
C1 -- C2 -- C3 -- C4 -- C5 -- C6 -- C7 -- C8 -- C9 -- C10 -- C11 -- C12 -- C13 (HEAD)
^                                                                      ^
|                                                                      |
Good (C1)                                                            Bad (C13)
Range: 13 commits

Step 1: `git bisect start`, `git bisect bad C13`, `git bisect good C1`
        Checks out C7 (middle)
        Test C7. If C7 is good:
        Range becomes [C7, C13]

C1 -- C2 -- C3 -- C4 -- C5 -- C6 -- C7 -- C8 -- C9 -- C10 -- C11 -- C12 -- C13 (HEAD)
                            ^        ^
                            |        |
                         (Good)    (Bad)
Range: 6 commits (C7-C13)

Step 2: Checks out C10 (middle of C7-C13)
        Test C10. If C10 is bad:
        Range becomes [C7, C10]

C1 -- C2 -- C3 -- C4 -- C5 -- C6 -- C7 -- C8 -- C9 -- C10 -- C11 -- C12 -- C13 (HEAD)
                            ^             ^
                            |             |
                         (Good)          (Bad)
Range: 3 commits (C7-C10)

Step 3: Checks out C8 (middle of C7-C10)
        Test C8. If C8 is good:
        Range becomes [C8, C10]

C1 -- C2 -- C3 -- C4 -- C5 -- C6 -- C7 -- C8 -- C9 -- C10 -- C11 -- C12 -- C13 (HEAD)
                                  ^        ^
                                  |        |
                               (Good)    (Bad)
Range: 2 commits (C8-C10)

Step 4: Checks out C9 (middle of C8-C10)
        Test C9. If C9 is bad:
        Range becomes [C8, C9]

C1 -- C2 -- C3 -- C4 -- C5 -- C6 -- C7 -- C8 -- C9 -- C10