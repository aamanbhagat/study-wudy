## What it is
A Git workflow is a prescribed strategy for how a team uses Git to manage code, specifically focusing on branching and merging conventions. Gitflow is a complex model with multiple long-lived branches (e.g., `main`, `develop`) designed for projects with scheduled releases. Trunk-based development is a simpler model where all developers work on short-lived branches that merge frequently into a single main branch, called the "trunk."

## Why it matters
These workflows are the heartbeat of collaborative software engineering, directly impacting stability and development velocity. In aerospace, flight control software for a Mars rover might use a strict, Gitflow-like process to manage versions and critical hotfixes, ensuring absolute stability for each deployment. In machine learning, a team rapidly iterating on a recommendation engine would use trunk-based development to continuously integrate and deploy new models, prioritizing speed of experimentation.

## When to study it
You must be comfortable with the fundamental Git operations before tackling workflows. Specifically, you need to understand and have used: `git init`, `git clone`, `git add`, `git commit`, `git branch`, `git checkout`, `git merge` (including resolving basic conflicts), `git push`, and `git pull`. Without this mechanical fluency, the strategic layer of a workflow will be abstract and confusing.

## How to study it (step by step)
1.  **Setup:** Create a new directory and initialize a Git repository (`git init`). Create an initial `README.md` file with a single line and commit it to the `main` branch. This is your baseline.
2.  **Simulate Gitflow (Feature):** Create and check out a `develop` branch from `main`. From `develop`, create and check out a `feature/user-auth` branch. Make a commit on this feature branch (e.g., add a file `auth.py`). Merge `feature/user-auth` back into `develop`. Observe the history with `git log --graph --oneline --all`.
3.  **Simulate Gitflow (Release):** From `develop`, create a `release/v1.0` branch. Make a "release prep" commit on it (e.g., update a version number in a file). Now, merge `release/v1.0` into `main` and add a tag (`git tag -a v1.0 -m "Version 1.0"`). Crucially, also merge `release/v1.0` back into `develop` to ensure `develop` has the version number update.
4.  **Simulate Gitflow (Hotfix):** Imagine a bug is found in `v1.0`. From `main`, create a `hotfix/v1.0.1` branch. Make a commit fixing the bug. Merge `hotfix/v1.0.1` into `main` and tag it `v1.1.1`. Just as with a release, you must also merge the hotfix back into `develop`.
5.  **Reset and Simulate TBD:** Delete the repository and start over with a fresh one with one commit on `main`.
6.  **TBD Cycle:** From `main`, create a branch `feature/add-header`. Make one commit. Immediately merge it back into `main`. Delete the feature branch. Repeat this process two more times with different feature names (`feature/add-footer`, `feature/update-css`).
7.  **Compare Histories:** Run `git log --graph --oneline --all` on both the final Gitflow repository and the final TBD repository. The visual difference is the entire lesson: Gitflow is a complex, multi-railed graph, while TBD is a nearly-linear sequence of commits on `main`.

## Key ideas, with intuition
1.  **Work Isolation vs. Integration Cost:** All branching models are a trade-off. Long-lived branches (Gitflow's `develop`) provide strong isolation for new work, preventing unstable code from affecting others. The cost is a large, complex merge when you finally integrate. Short-lived branches (TBD) reduce merge complexity by integrating tiny changes frequently, but require a robust automated testing pipeline to catch bugs immediately, as the "trunk" is always considered releasable.
2.  **`main` Represents Truth:** In both models, the `main` (or `master`) branch is the sacred, canonical history of production-ready code. Commits to `main` correspond to released versions of the software. The workflows are simply different paths code takes to be worthy of being included in `main`.
3.  **Cadence Dictates Strategy:** The choice of workflow is determined by your release schedule. If you release software in discrete, planned versions (e.g., monthly or quarterly), Gitflow provides structure for managing what goes into each version. If you practice continuous deployment (shipping code multiple times a day), TBD is necessary to support that velocity.
4.  **The Role of Automation:** Trunk-based development is untenable without a high degree of automation. Because changes are integrated so quickly into the main line, you need a Continuous Integration (CI) system that automatically builds and runs a comprehensive test suite on every single proposed change *before* it gets merged. This automated gatekeeper replaces the manual stabilization phase of a Gitflow `release` branch.

## Worked example
Let's walk through adding a feature in Gitflow. The repository starts with a `main` branch and a `develop` branch that was created from `main`. Both are currently at the same commit, `C1`.

**Goal:** Add a new user authentication feature.

**Step 1: Branch from `develop` for the new feature.**
The `develop` branch is the integration point for all upcoming features, so all new work starts there. We never branch from `main` for feature work in Gitflow.
```bash
# Ensure we are on the develop branch
git checkout develop

# Create and switch to a new feature branch
git checkout -b feature/user-auth
```
*Reflection:* This step isolates our new work. Any commits we make on `feature/user-auth` will not affect `main` or `develop` until we are ready.

**Step 2: Do the work and commit.**
Now, we write the code. We'll simulate this by creating a file and committing it.
```bash
# Create a new file representing our feature
echo "def authenticate(user, pass): return True" > auth.py

# Stage and commit the change
git add auth.py
git commit -m "feat: Add basic user authentication"
```
*Reflection:* This commit, let's call it `C2`, now exists only on our feature branch. The `develop` branch is still at `C1`.

**Step 3: Merge the completed feature back into `develop`.**
Once the feature is complete and has passed local tests, it is integrated back into the `develop` branch to be included in the next release.
```bash
# Switch back to the develop branch
git checkout develop

# Merge the feature branch into develop
git merge --no-ff feature/user-auth
```
*Reflection:* We use `--no-ff` (no fast-forward) to create an explicit merge commit. This preserves the historical context that these commits belonged to a specific feature branch, making the Git history easier to read. The `develop` branch now contains commit `C2`.

**Step 4: Clean up the feature branch.**
The feature branch has served its purpose and can now be deleted.
```bash
git branch -d feature/user-auth
```
*Reflection:* This keeps the repository clean. The work is not lost; it is safely integrated into `develop`. The feature is now "done" and awaits the next release cycle.

## Diagrams
Here are the two workflows visualized.

**Gitflow:**
```text
      hotfix/v1.0.1--.
     /               `v
main -----C1---v1.0---C2---v1.0.1---> (Production)
     \     `---^---.---^
      \   release/v1.0 |
       \       /     |
develop --C3--C4------C5--C6--------> (Next Release Integration)
         \       /
          `-C7--'
      feature/user-auth
```
*   `main` is the stable production history.
*   `develop` is the integration branch for features.
*   Features, releases, and hotfixes are temporary branches with strict merge rules.

**Trunk-Based Development (TBD):**
```text
      feat/A --.
     /         `v
main --C1--C2--C3--C4--C5--C6--C7--> (Production / Trunk)
         ^   ^         ^   ^
         |   |         |   `-- feat/D
         |   `-- feat/C
         `-- feat/B
```
*   `main` is the trunk.
*   Feature branches are very short-lived (hours or a day).
*   Everything merges directly and frequently back to `main`.

## Memory technique — remember this forever
1.  **The Story:**
    *   **Gitflow is a River Delta:** `main` is the deep, main channel to the ocean (production). `develop` is a major river feeding it. Features are small tributaries that flow into the `develop` river. Releases are when you dredge a channel from the river to the main channel. Hotfixes are emergency canals dug directly from the main channel and back.
    *   **Trunk-Based Development is a Highway:** `main` is a multi-lane highway. A feature is you exiting, building something small on the access road, and immediately merging back into traffic. Everyone does this constantly. The flow of traffic is fast, but you need good cars (tests) to avoid causing a pile-up.

2.  **Must Overlearn:**
    *   **Gitflow's Five Branch Types:** `main`, `develop`, `feature/*`, `release/*`, `hotfix/*`.
    *   **TBD's Core Rule:** Create short-lived branches from `main`, merge back to `main` within a day.
    *   **The Trade-Off:** Gitflow buys stability with process overhead. TBD buys velocity with an automation/testing requirement.

3.  **Spaced Repetition Schedule:** Review these diagrams and facts in **1 day, 3 days, 7 days, 16 days, and 35 days**. Actively redraw the diagrams from memory each time.

4.  **First Principles Pathway:** If you forget, ask: **"What is the release cadence and risk tolerance?"**
    *   *Slow, scheduled releases? High cost of failure?* You need isolation and a stabilization phase. This naturally leads to separate `develop` and `release` branches. You've re-derived Gitflow.
    *   *Continuous releases? Low cost of failure (or fast rollback)?* You need to minimize merge friction and integrate constantly. This naturally leads to merging small changes directly to a single trunk. You've re-derived TBD.

## Common mistakes
1.  **Gitflow: Merging Features into `main`:** A developer finishes their `feature/` branch and merges it directly into `main`, bypassing `develop` and the release process. This pollutes the production branch with untested code.
2.  **Gitflow: Forgetting to Merge Back to `develop`:** After merging a `release/` or `hotfix/` branch into `main`, a developer forgets the second merge back into `develop`. `develop` now lacks the critical bug fix or release preparations, causing future branches to be based on an incomplete history.
3.  **TBD: Creating "Mega-Branches":** A developer works on a feature branch for two weeks in a trunk-based project. This is no longer TBD; it's a "long-running feature branch." The eventual merge will be massive and conflict-prone, defeating the entire purpose of TBD. The fix is to break the feature into smaller chunks that can be merged daily.
4.  **Misusing Feature Flags:** In TBD, incomplete features are often merged to `main` but hidden behind "feature flags" (runtime configuration switches). A common mistake is shipping code with the flag turned on prematurely, or writing code that is not truly isolated by the flag, causing production incidents.

## Self-check
1.  You are using Gitflow. A critical security vulnerability is discovered in production version `v2.3`. What is the exact sequence of branch operations (creation, source branch, merge destinations) to fix this?
2.  Your team is switching from Gitflow to Trunk-Based Development. What is the single most important piece of engineering infrastructure you must have in place to make this transition successful, and why?
3.  Consider a hybrid scenario: a team uses TBD for their web application but maintains a separate, critical C++ physics simulation library that the web app depends on. This library has a release every 6 months. Propose a sensible, multi-workflow strategy for this organization. Justify your choices.