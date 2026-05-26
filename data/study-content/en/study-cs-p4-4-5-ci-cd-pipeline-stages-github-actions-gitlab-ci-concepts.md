## 1. The one-sentence answer
**A CI/CD pipeline is an automated sequence of stages that continuously integrates code changes, verifies them through testing and builds, and delivers or deploys the resulting artifacts.**

Continuous integration merges developer commits into a shared repository multiple times per day, triggering an automated build and test process that detects integration errors immediately. Continuous delivery extends this by producing a release candidate that can be deployed to any environment at any time, while continuous deployment removes the final manual gate and pushes every verified change directly to production. The resulting pipeline therefore replaces manual hand-offs with a repeatable, observable workflow expressed in declarative configuration files.

In GitHub Actions the workflow is defined in YAML under `.github/workflows`, where events trigger jobs composed of steps that run on virtual runners. In GitLab CI the equivalent file is `.gitlab-ci.yml`, which declares named stages and jobs that execute in order or in parallel according to explicit dependencies. Both systems expose the same conceptual model: an event-driven graph of tasks whose success or failure determines whether the next stage may proceed.

> [!NOTE]
> The decisive insight is that every stage after the first must be reproducible from the exact artifact produced by the preceding stage; any manual step or hidden environmental assumption breaks the chain of trust.

## 2. Why this matters — concrete and current
SpaceX uses a GitLab CI pipeline to compile flight software, run hardware-in-the-loop simulations, and sign binaries before they are uploaded to vehicles; a failed unit test on a propulsion module aborts the entire deployment within minutes rather than days.

Google’s internal monorepo triggers thousands of GitHub-Actions-style presubmit jobs on every change; the system enforces that no commit reaches the main branch unless it passes hermetic builds and distributed tests across language runtimes and target architectures.

The Large Hadron Collider’s data-acquisition firmware at CERN is built and validated nightly by a GitLab CI pipeline that cross-compiles for multiple FPGA families, runs gate-level simulations, and archives bitstreams only after formal equivalence checking completes.

Stripe’s payment-processing services rely on GitHub Actions to execute contract tests against every pull request; a single pipeline failure blocks production rollout, protecting the integrity of financial transactions processed at global scale.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Version control (Git)    | Pipelines are triggered by repository events and operate on specific commits or branches. |
| Basic shell scripting    | Steps inside jobs are shell commands or scripts executed on runners. |
| YAML syntax              | Pipeline definitions are expressed as structured YAML documents. |
| Build systems (Make, Maven, npm, etc.) | The build and test stages invoke these tools to produce artifacts. |

## 4. Building the idea — from intuition to formalism

### Step 1 — An event produces a change set
A developer pushes a commit or opens a pull request. This single event is the only external input the pipeline receives.

Example: pushing commit `a1b2c3d` to branch `main` on a GitHub repository.

Formal statement:  
Let \( E \) be an event drawn from a finite set of repository events (push, pull_request, schedule). The pipeline \( P \) is a function \( P(E) \to \{ \text{success}, \text{failure} \} \).

> [!WARNING]
> Treating the working directory state as part of the event rather than the commit SHA alone leads to non-reproducible runs.

### Step 2 — The pipeline declares ordered stages
Stages are named phases that must complete before later phases begin. Typical stage names are `build`, `test`, `deploy`.

Example: a pipeline declares stages `[build, test, deploy]`.

Formal statement:  
Stages form a total order \( S_1 \prec S_2 \prec \dots \prec S_n \). A job belongs to exactly one stage.

### Step 3 — Jobs within a stage may run in parallel
Jobs are independent units of work that share only the artifacts produced by earlier stages.

Example: three test jobs—unit, integration, lint—execute concurrently after the build stage finishes.

Formal statement:  
Within stage \( S_i \), the set of jobs \( J_i \) satisfies that for any two jobs \( j, k \in J_i \), neither \( j \) nor \( k \) depends on the other.

### Step 4 — Each job is a sequence of steps
Steps are atomic commands or script blocks executed sequentially on a runner.

Example: a job step runs `npm ci` followed by `npm test`.

Formal statement:  
A job \( j \) is a finite sequence of steps \( (s_1, s_2, \dots, s_m) \) where each \( s_k \) is either a shell command or an action reference.

### Step 5 — Success propagates artifacts; failure halts the pipeline
Only when every job in a stage succeeds are its output artifacts made available to subsequent stages.

Formal statement:  
Let \( A_i \) be the artifact set produced by stage \( S_i \). Then \( P \) succeeds if and only if \( \forall i, \) every job in \( S_i \) terminates with exit code 0 and \( A_i \) is well-defined.

## 5. Worked examples — every step shown

**Example 1 — Minimal GitHub Actions pipeline**  
*Given:* A repository containing `main.py` and `requirements.txt`.  
*Find:* A workflow that builds and tests on every push.  

Create `.github/workflows/ci.yml`:  
```yaml
name: CI
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pip install -r requirements.txt
      - run: python -m pytest
```
*Why* — The `on` key binds the workflow to the push event.  
*Why* — `actions/checkout` materializes the commit that triggered the run.  
*Why* — The two `run` steps execute sequentially inside the single job.  

**Final answer**  
The pipeline succeeds only when `pytest` exits with code 0.

*Reflection* — The example isolates the event-to-job mapping; adding a second job immediately introduces parallelism.

**Example 2 — GitLab CI with explicit stages**  
*Given:* The same Python project.  
*Find:* A `.gitlab-ci.yml` that separates build and test.  

```yaml
stages: [build, test]
build:
  stage: build
  script: pip install -r requirements.txt
test:
  stage: test
  script: python -m pytest
  dependencies: [build]
```
*Why* — The `stages` list defines execution order.  
*Why* — `dependencies` declares the artifact flow from build to test.  

**Final answer**  
Test jobs wait for build artifacts before execution.

*Reflection* — Explicit stages make the partial order visible and allow future parallel jobs inside the same stage.

**Example 3 — Conditional deployment**  
*Given:* The pipeline from Example 2 plus a production environment.  
*Find:* Deploy only on the `main` branch.  

Add to `.gitlab-ci.yml`:
```yaml
deploy:
  stage: deploy
  script: ./deploy.sh
  only: [main]
```
*Why* — The `only` keyword restricts job scheduling to the named branch.  

**Final answer**  
Deployment occurs solely after successful test on `main`.

*Reflection* — Branch filtering is the simplest policy; more complex rules use `rules` or `workflow` keywords.

**Example 4 — Matrix build across Python versions**  
*Given:* Need to verify compatibility with Python 3.9 and 3.10.  
*Find:* Parallel jobs using a matrix.  

In GitHub Actions:
```yaml
strategy:
  matrix:
    python-version: ['3.9', '3.10']
steps:
  - uses: actions/setup-python@v5
    with:
      python-version: ${{ matrix.python-version }}
```
*Why* — The matrix expands into two independent jobs at runtime.  

**Final answer**  
Both Python versions must pass before the pipeline succeeds.

*Reflection* — Matrix expansion multiplies compute cost linearly; caching and artifact reuse become essential at larger scales.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Hard-coded secrets in YAML        | Copy-paste from local development           | Use repository secrets and environment variables only |
| Non-hermetic builds               | Reliance on global packages or caches       | Pin every dependency and use container images        |
| Missing artifact upload           | Assumption that workspace persists          | Explicitly upload artifacts between jobs             |
| Long-running jobs without timeout | Optimism about test duration                | Set per-job `timeout-minutes`                        |
| Ignoring runner labels            | Treating all runners as identical           | Pin jobs to self-hosted runners with required labels |
| Over-parallelism without caching  | Matrix jobs each download the world         | Share a dependency cache across matrix dimensions    |
| Manual approval steps inside CI   | Confusion between CI and release management | Move approvals to deployment environments or CD gates |

## 7. The textbook-precise statement
A CI/CD pipeline is a directed acyclic graph of jobs partitioned into totally ordered stages. Execution begins on a repository event \( E \). Each job \( j \) is a finite sequence of deterministic steps whose termination status and output artifacts are visible to dependent jobs. The pipeline succeeds if and only if every job terminates with exit status zero and all required artifacts are produced. (See Humble & Farley, *Continuous Delivery*, 2010, Chapter 5, “Anatomy of a Deployment Pipeline”.)

## 8. Visual — diagram or schematic
```text
Event (push / MR) 
      │
      ▼
┌─────────────┐
│   Stage 1   │  build
│  jobs: 1..k │  (parallel)
└──────┬──────┘
       │ artifacts
       ▼
┌─────────────┐
│   Stage 2   │  test
│  jobs: 1..m │  (parallel)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Stage 3   │  deploy
│  jobs: 1..p │  (parallel or gated)
└─────────────┘
Success → release candidate
Failure → pipeline aborted
```
Each horizontal box is a stage; vertical arrows represent artifact flow and the strict ordering constraint between stages.

## 9. The memory technique
1. **The hook** — Picture a relay race where each runner (stage) must hand off a baton (artifact) cleanly; dropping the baton anywhere stops the entire race.
2. **What to overlearn** — The four canonical stages (build, test, package, deploy) and the fact that jobs inside a stage run concurrently while stages themselves are strictly sequential.
3. **Spaced-repetition schedule** — Review the stage/job distinction at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the pipeline from the single invariant that every step after the first must consume only artifacts emitted by prior successful steps.

## 10. What this unlocks
Mastery of pipeline stages and runner semantics allows direct progression to advanced deployment patterns, infrastructure-as-code verification, and automated canary releases.

- Feature-flag orchestration inside deployment jobs
- Policy-as-code gates (OPA, Kyverno) between stages
- Observability integration (Prometheus metrics emitted by pipeline jobs)
- Multi-environment promotion with environment-specific runners

## 11. Self-check — five questions, no answers
1. A pipeline declares three stages but only two jobs. Which stage must contain zero jobs, and why does the pipeline still succeed?
2. In GitHub Actions, a job uses `strategy.matrix` with two Python versions and uploads an artifact named `dist`. How many copies of the artifact exist after the job completes?
3. A GitLab CI job fails intermittently only on the self-hosted runner tagged `gpu`. List the minimal diagnostic steps required to isolate the cause.
4. Why does placing a manual approval inside a CI job violate the definition of continuous delivery?
5. Given a pipeline that succeeds on `main` but fails on a feature branch, identify the single configuration change most likely to restore parity without altering source code.