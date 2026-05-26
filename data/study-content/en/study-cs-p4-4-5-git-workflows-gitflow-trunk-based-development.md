## 1. The one-sentence answer
**Git workflows are disciplined rules for creating, naming, and merging branches in a Git repository that determine how code changes move from individual work to production releases.**

Gitflow codifies a multi-branch hierarchy in which *develop* serves as the integration line, *feature* branches are long-lived, and *release* plus *hotfix* branches isolate stabilization work from ongoing development. Trunk-based development collapses this hierarchy to a single protected *main* (or *trunk*) branch; every change is either committed directly to it or merged through short-lived branches that live for at most a day or two. The practical difference appears in merge frequency, release cadence, and the amount of parallel divergence the team tolerates.

The choice between the two is therefore not aesthetic but operational: Gitflow buys explicit separation between “done” and “shipped,” while trunk-based development buys continuous integration at the cost of stricter testing and smaller batch sizes.

> [!NOTE]
> The decisive insight is that branch lifetime, not branch count, is the variable that controls integration pain; shortening branch life from weeks to hours removes the need for most of Gitflow’s auxiliary branches.

## 2. Why this matters — concrete and current
Google’s internal monorepo and its “submit-queue” system enforce trunk-based development at planetary scale; every change passes through a single main line that is continuously built and tested by TAP, allowing thousands of engineers to integrate without long-lived feature branches.

SpaceX’s flight-software teams use a trunk-based model with mandatory pre-merge simulation runs on hardware-in-the-loop rigs; any divergence longer than a few commits would break the rapid iteration cycle required between Falcon 9 launches.

The Linux kernel, by contrast, still follows a Gitflow-like pattern around *linux-next* and release branches because its global contributor base and six-week release cadence make a single trunk impractical.

Modern continuous-deployment platforms such as GitHub Actions and GitLab CI now ship first-class support for trunk-based pipelines that automatically promote every green main commit to production, reducing the median time-to-production at companies such as Stripe from days to minutes.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Directed acyclic graph   | Git’s commit history is a DAG; branches are just movable labels on nodes. |
| Merge vs. rebase         | The two operations produce different histories and different conflict surfaces. |
| Continuous integration   | Automated build-and-test on every push is the safety net that makes frequent merges viable. |
| Protected branch rules   | Server-side enforcement that only reviewed, green commits reach the trunk. |

## 4. Building the idea — from intuition to formalism

### Step 1 — A branch is a named pointer to a commit
A branch in Git is simply a lightweight, movable reference that points to one node in the commit DAG.  
Example: after `git checkout -b feature/login`, the name `feature/login` and the name `main` both point to the same commit until new commits are added.  
Formally, let \( B \) be the set of branch names and \( C \) the set of commits; each \( b \in B \) maps to exactly one \( c \in C \).  
> [!WARNING] Treating a branch as a container rather than a pointer leads to the mistaken belief that deleting a branch deletes commits.

### Step 2 — Divergence is measured by commit distance
Two branches diverge when their pointers no longer share a common descendant; the length of the shortest path between their heads quantifies integration cost.  
Example: 17 commits on `feature/login` and 4 on `main` since the last common ancestor imply at least 21 commits must be reconciled.  
Let \( d(b_1, b_2) \) be the number of commits reachable from one head but not the other.  
> [!WARNING] Ignoring \( d(b_1, b_2) \) produces merge commits whose conflict sets exceed human review capacity.

### Step 3 — Gitflow introduces long-lived integration branches
Gitflow designates *develop* as the perpetual integration line and creates *release/* and *hotfix/* branches only when a version is frozen.  
Formal rule set: every feature branch must be forked from *develop*; *release/* branches may receive only bug-fix commits; *main* receives only merges from *release/* or *hotfix/*.  
> [!WARNING] Allowing feature work on a *release/* branch violates the isolation invariant and re-introduces the very divergence Gitflow was meant to contain.

### Step 4 — Trunk-based development collapses lifetime
Trunk-based development requires that every branch other than *main* be deleted within a policy-defined horizon (commonly 24 h).  
The merge invariant becomes: after merge, the feature branch pointer is immediately deleted and the trunk pointer advances.  
> [!WARNING] A “short-lived” branch that survives a sprint re-creates the Gitflow problem under a different name.

### Step 5 — Release semantics follow from branch policy
Under Gitflow a release tag is placed on a *release/* branch; under trunk-based development a release tag is placed directly on *main* at a green commit chosen by a release manager or automated promotion.  
The observable outcome is identical—immutable version snapshots—but the path that produced the snapshot differs in number of intermediate divergent lines.

## 5. Worked examples — every step shown

**Example 1 — Single hotfix under Gitflow**  
*Given:* `main` at tag v1.2.0, `develop` at commit C42, a production bug reported.  
*Find:* The exact sequence that produces v1.2.1 without disturbing ongoing feature work.  
1. `git checkout -b hotfix/1.2.1 main` — fork from the release line.  
   *Why:* Hotfix policy requires isolation from *develop*.  
2. Fix, commit, push; open PR targeting `main`.  
   *Why:* Only reviewed changes reach the protected release line.  
3. After merge to `main`, also merge `main` into `develop`.  
   *Why:* Prevents the same bug from reappearing in the next release.  
4. Tag `main` as v1.2.1 and delete the hotfix branch.  
**Final answer**  
`main` now carries v1.2.1; `develop` incorporates the fix; no feature branch was affected.  
*Reflection:* The extra merge step is the price paid for explicit separation of concerns.

**Example 2 — Trunk-based daily feature merge**  
*Given:* `main` at C100, developer finishes a one-day login refactor on `login-otp`.  
*Find:* Merge path that keeps `main` always releasable.  
1. Rebase `login-otp` onto latest `main` (C105).  
   *Why:* Linear history reduces future conflict surface.  
2. Run full CI suite; require green status.  
   *Why:* Trunk must remain green at every commit.  
3. Merge with `--no-ff` or fast-forward per team convention and delete branch.  
**Final answer**  
`main` advanced to C108; branch `login-otp` no longer exists.  
*Reflection:* The rebase step is mandatory once branch lifetime is measured in hours.

(Examples 3 and 4 escalate to multi-team release trains and automated promotion pipelines; each follows the same pattern of fork-merge-delete with explicit lifetime constraints.)

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Long-lived “feature” branches in a trunk-based repo | Team measures progress by branch existence rather than merged commits | Enforce branch-age alerts in CI              |
| Merging release branches back into develop in Gitflow | Misunderstanding the direction of integration | Script the merge direction once and reuse    |
| Treating `main` as both trunk and release line | No separate stabilization phase | Introduce a release-candidate tag instead    |
| Rebase of shared branches         | Developer forgets that history is public    | Never rebase anything pushed to origin       |
| Ignoring merge-commit noise       | Default Git settings hide integration cost  | Require `--no-ff` on protected branches      |
| Hotfix created from `develop`     | Habit from older workflows                  | Add a pre-create hook that checks parent     |
| Deleting `main` locally           | Confusion between remote and local refs     | Protect the default branch in repository settings |

## 7. The textbook-precise statement
A Git workflow is a pair \( (P, M) \) where \( P \) is a set of branch-naming predicates and \( M \) is a merge policy mapping each predicate to an allowed target branch and a maximum lifetime. Gitflow is the concrete policy defined by Driessen (2010) that contains the predicates *develop*, *feature/*, *release/*, *hotfix/*, *main* together with the merge rules given in Step 3. Trunk-based development is the policy that restricts \( P \) to a single predicate *main* and enforces lifetime \( \leq 1 \) day for every other branch (Hammant & Fowler, 2019). Reference: Driessen, “A successful Git branching model,” 2010; Fowler, “Trunk-based development,” martinfowler.com, 2019.

## 8. Visual — diagram or schematic
```text
Gitflow (simplified)                Trunk-based (simplified)
main  ───●────────────●────▶      main ─●──●──●──●──●──▶
         │            │                 ↑  ↑  ↑  ↑  ↑
release/ │            │                 │  │  │  │  │
         │            │              f1─┘  │  │  │  │  (deleted <24 h)
develop ─●────●────●──┼────▶           f2────┘  │  │
         │    │    │  │                       │  │
feature/ │    │    │  │                    f3────┘  │
hotfix/  │    │    │  │                       │     │
         │    │    │  │                    f4───────┘
```
Labels show branch pointers; arrows indicate merge direction; dashed lines indicate deletion.

## 9. The memory technique
1. **The hook** — Picture a tree: Gitflow is an oak with many thick limbs that stay for seasons; trunk-based development is bamboo—new shoots appear daily and are harvested the same day.  
2. **What to overlearn** — (a) Gitflow branch names and their allowed parents; (b) trunk-based lifetime rule ≤ 1 day; (c) the single merge arrow `hotfix → main → develop`.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from the DAG: locate the longest-lived pointer that must remain green; all other pointers must be shorter-lived than the integration pain threshold of the team.

## 10. What this unlocks
Mastery of these workflows lets you design CI pipelines that scale from a solo project to a 2000-engineer monorepo. The immediate next concepts are:  
- Protected-branch rules and required status checks  
- Release-train automation and semantic versioning hooks  
- Environment-promotion models (dev → staging → prod) that map directly onto branch predicates  
- Observability overlays that measure “time from commit to production” per workflow.

## 11. Self-check — five questions, no answers
1. In Gitflow, which branch must receive the merge of a hotfix before that hotfix can be deleted?  
2. A trunk-based team discovers a branch that has existed for nine days. What single policy change would have prevented this?  
3. Draw the commit DAG after a developer rebases a two-commit feature branch onto an advanced trunk and then merges with `--no-ff`.  
4. Why does Gitflow require an extra merge step that trunk-based development does not?  
5. A repository shows 47 open branches whose tips are more than 30 days old. Which workflow is almost certainly in use, and what observable symptom will appear at the next release?