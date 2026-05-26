## 1. The one-sentence answer
**Git workflows define disciplined rules for creating, merging, and protecting branches so that multiple developers can ship code reliably without breaking the main line.**

Gitflow organises work into long-lived branches (main, develop) plus short-lived feature, release, and hotfix branches that follow strict naming and merge rules. Trunk-based development keeps a single protected main branch and forces every change through short-lived branches or direct commits that must pass automated checks before merging. The choice between them depends on release cadence, team size, and how much process you want around integration.

Aap jab bhi team ke saath code likhte ho, branch strategy decide karti hai ki kab aur kaise changes ek dusre se milenge. Galat strategy se merge conflicts, broken builds, aur delayed releases hote hain.

> [!NOTE]
> The real “aha” is that both workflows are just different policies on top of the same Git objects; the objects never change, only the human rules around them change.

## 2. Why this matters — concrete and current
Google uses trunk-based development at massive scale: every engineer commits to a single trunk multiple times a day and relies on a fleet of presubmit tests that finish in minutes. This model supports thousands of daily merges while keeping the trunk green.

SpaceX flight software teams adopted a strict trunk-based flow with mandatory code review and hardware-in-the-loop tests on every commit; any regression would delay rocket launches, so the workflow enforces that no commit ever leaves the trunk in a broken state.

GitHub itself runs Gitflow-style release branches for its enterprise product line so that hotfixes can be prepared on release branches without disturbing ongoing feature work on develop.

Kubernetes adopted trunk-based development after early Gitflow attempts created painful merge storms; now every pull request merges directly to main after passing a large test matrix, enabling weekly minor releases.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Git commit graph     | All workflows are policies applied to the same DAG of commits |
| Branch and merge     | You must understand fast-forward vs three-way merges      |
| Pull request / merge request | Both workflows rely on protected branches and reviews   |
| CI pipeline          | Automated checks are the only way trunk-based stays stable |

Agar aap upar ke concepts mein comfortable nahi ho, to pehle basic Git branching aur merging padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start with the shared source of truth
Aap ek single repository se shuru karte ho jisme ek protected branch hoti hai jo “production-ready” state ko represent karti hai.  
Example: origin/main hamesha deployable code rakhta hai.  
Formal statement: Let \( B \) be the set of branches; exactly one branch \( b_0 \in B \) is designated the integration target.  
> [!WARNING] Agar aap multiple branches ko “main” maanne lagte ho, to deployment scripts aur release tags kabhi bhi consistent nahi rahenge.

### Step 2 — Decide the lifetime of a change
Gitflow mein feature branches develop se banate ho aur unki lifetime weeks tak ho sakti hai. Trunk-based mein har branch 1–2 din se zyada nahi chalti.  
Example: “add-user-auth” branch Gitflow mein 10 commits le sakti hai; trunk-based mein wohi kaam 3 commits mein main par aa jaata hai.  
Formal statement: Let \( L(b) \) be the lifetime of branch \( b \); Gitflow allows \( L(b) \gg 1 \) day while trunk-based enforces \( L(b) \leq 2 \) days.

### Step 3 — Define merge direction and guards
Gitflow: develop → release → main; hotfix branches sirf release ya main se nikalte hain. Trunk-based: har branch sirf main ki taraf merge hoti hai aur merge ke pehle CI must pass.  
Formal statement: A merge \( m: b \to b_0 \) is permitted only when predicate \( C(b) \) (CI green) evaluates to true.

### Step 4 — Introduce release isolation
Gitflow release branches copy develop at a point in time and freeze new features. Trunk-based releases are cut by tagging main at any green commit.  
Example: Gitflow release/v2.3 branch par sirf bug fixes jaate hain; trunk-based v2.3 tag main ke kisi bhi commit par laga sakte ho.

### Step 5 — Handle production emergencies
Gitflow hotfix branch release branch se banta hai aur dono jagah merge hota hai. Trunk-based hotfix bhi main par hi jaata hai aur turant tag kiya jaata hai.  
Formal statement: Emergency change \( e \) must satisfy \( C(e) \) and be merged into every active release line that still needs it.

### Step 6 — Enforce the policy in the repository
Protected branch settings, required reviewers, and status checks turn the chosen workflow into an enforceable rule instead of a convention.

## 5. Worked examples — har step show karo

**Example 1 — Creating a feature under Gitflow**  
*Given:* Clean repo with main and develop branches.  
*Find:* Start work on “login-page”.  
```
git checkout develop
git checkout -b feature/login-page
```
*Why:* develop se naya feature branch nikalna Gitflow ka rule hai.  
```
git commit -am "Add login form"
git checkout develop
git merge --no-ff feature/login-page
```
*Why:* --no-ff merge commit feature ki history ko preserve karta hai.  
**Final answer:** develop now contains the merged feature commit.

*Reflection:* Short example, lekin yeh pattern har feature par repeat hota hai.

**Example 2 — Trunk-based daily merge**  
*Given:* main protected, CI requires green build.  
*Find:* Land a one-line bug fix.  
```
git checkout -b fix/typo
git commit -am "Fix typo in README"
git push origin fix/typo
```
Open PR, CI passes, merge via GitHub UI (squash).  
*Why:* Squash keeps main linear.  
**Final answer:** main advanced by one commit, branch deleted.

*Reflection:* Linear history easy to bisect karne deta hai.

**Example 3 — Gitflow release cut**  
*Given:* develop ready for v1.4.  
```
git checkout -b release/1.4 develop
git checkout main
git merge --no-ff release/1.4
git tag -a v1.4 -m "Version 1.4"
```
*Why:* release branch future hotfixes ke liye alag rehta hai.  
**Final answer:** main and release/1.4 both point at v1.4 tag.

*Reflection:* Release branch freeze karta hai feature inflow ko.

**Example 4 — Trunk-based hotfix on tag**  
*Given:* v2.0 already deployed, bug reported.  
```
git checkout -b hotfix/crash main
git commit -am "Fix null dereference"
git tag -a v2.0.1
```
Merge back to main only.  
*Why:* No separate release branch exists.  
**Final answer:** New tag v2.0.1 created from main.

*Reflection:* Trunk-based hotfix bhi main par hi rehta hai, isliye history simple rehti hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Long-lived feature branches | Fear of merge conflicts                     | Rebase daily onto develop/main               |
| Direct commits to main      | Convenience or missing branch protection    | Enable “require pull request” setting        |
| Merge commits on every PR   | Default GitHub behaviour                    | Choose squash or rebase merge in repo settings |
| Forgetting to delete branches | No automation                               | Add branch cleanup rule in GitHub            |
| Mixing hotfix into develop late | Manual cherry-pick mistakes               | Always merge hotfix back to develop immediately |
| Release branch receiving new features | Unclear process                        | Document and enforce “no new features” rule  |
| CI not required on release branches | Oversight                              | Apply same status checks to all protected branches |

## 7. The textbook-precise statement
A Git workflow is a set of conventions \( W = (B, M, C, T) \) where \( B \) is the set of branch names with distinguished integration branch \( b_0 \), \( M \) defines allowed merge directions, \( C \) is the set of predicates that must hold before a merge is accepted, and \( T \) defines tagging rules. Gitflow specifies five branch types and the cycle develop → release → main; trunk-based development restricts \( |B \setminus \{b_0\}| \) to short lifetimes and requires \( C(b) \) to include a green CI run for every merge into \( b_0 \). (Chacon & Straub, Pro Git, 2e, Chapter 5, “Branching Workflows”.)

## 8. Visual — diagram or schematic
```
          main (protected, always green)
            ↑
            |  (merge only after CI)
   feature/* or hotfix/*   (short-lived)
            ↑
         origin/main
```
Gitflow adds two extra long-lived branches:
```
          main
            ↑
         release/*   (frozen, only hotfixes)
            ↑
         develop     (integration of features)
            ↑
         feature/*
```

## 9. The memory technique
1. **The hook** — Imagine a tree: trunk-based is a straight oak trunk; Gitflow is an oak with three extra thick branches (develop, release, hotfix) growing out of it.
2. **What to overlearn** — main is always deployable; every merge into main must pass CI; feature branches never live more than a few days in trunk-based.
3. **Spaced-repetition schedule** — Review the two diagrams after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Agar rules bhool jaayein to poochho: “Is branch ka purpose kya hai aur isko kab delete karna hai?” Us jawab se workflow rebuild ho jaata hai.

## 10. What this unlocks
Mastering these workflows lets you design release processes that scale from solo projects to hundreds of engineers.  
- You can now evaluate GitLab Flow, GitHub Flow, and environment-branch models.  
- You can configure branch-protection rules and required status checks confidently.  
- You can mentor teams on reducing merge pain by choosing the right workflow for their release rhythm.

## 11. Self-check — five questions, no answers
1. Ek team jo hafte mein ek baar release karti hai, uske liye Gitflow ya trunk-based zyada suitable hai?  
2. Agar aapko ek production bug fix karna hai jo sirf v2.3 release mein chahiye, Gitflow mein kaunsi branch se shuru karoge?  
3. Trunk-based mein linear history maintain karne ke liye kaunsa merge strategy use karte ho?  
4. Kyun hotfix branch ko develop mein bhi merge karna zaroori hai Gitflow mein?  
5. Agar CI check release branch par nahi chal raha, kaunsa trap ho sakta hai?