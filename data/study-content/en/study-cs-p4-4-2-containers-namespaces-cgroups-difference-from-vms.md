## 1. The one-sentence answer
**Containers achieve process isolation and resource control by partitioning a single shared kernel through namespaces and cgroups rather than emulating separate hardware.**

A container therefore runs on the host kernel; every process inside it sees only the resources the kernel has been instructed to expose to its namespace and is throttled by the accounting rules attached to its cgroup. This removes the need to boot a second kernel or emulate devices, which is exactly why containers start in milliseconds and occupy megabytes instead of gigabytes.

In contrast, a virtual machine loads a complete guest kernel on top of a hypervisor that virtualizes the entire instruction set and I/O devices; the guest therefore carries its own scheduler, memory manager, and device drivers even when it runs the identical distribution as the host. The two approaches trade off different layers of the stack: containers isolate at the system-call boundary, VMs isolate at the hardware boundary.

> [!NOTE]
> The decisive “aha” is that namespaces change what a process *sees* while cgroups change what a process *can consume*; together they give the illusion of a private machine without duplicating the kernel.

## 2. Why this matters — concrete and current
Google’s Borg and its successor Kubernetes schedule millions of containers daily across shared fleets; each container’s memory cgroup prevents a single job from starving the node while its PID and network namespaces keep logs and sockets from colliding.

In machine-learning training clusters at Meta and OpenAI, container images pin exact CUDA driver versions inside a mount namespace; researchers therefore reproduce identical GPU environments on any host without reinstalling the host kernel or risking driver conflicts.

Semiconductor design houses run thousands of EDA tool instances inside CPU and memory cgroups on the same high-core servers; the accounting data exported by the cgroup controllers feeds the company’s internal charge-back system that bills each design team for actual core-hours used.

Aerospace simulation farms at NASA and ESA launch Monte-Carlo trajectory jobs inside network namespaces so that each simulation believes it owns the entire 10 GbE link; the jobs therefore require no modification when moved from development laptops to the production supercomputer.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Process and system-call interface | Namespaces filter the view returned by calls such as `getpid`, `mount`, and `socket`. |
| Resource limits and accounting | cgroups attach controllers that the kernel consults on every scheduling decision and page fault. |
| Kernel vs. user mode       | Containers never cross into a second kernel; VMs do, which is the source of their overhead. |

## 4. Building the idea — from intuition to formalism

### Step 1 — A process sees the world through kernel tables
The kernel maintains a single set of global tables for PIDs, mount points, network interfaces, and user IDs. Every system call that returns an identifier simply indexes into those tables.

A concrete example: on an unmodified system, `ps` lists every process because it reads `/proc`, which is backed by the single PID table.

Formally, let \( T \) be the global table and \( P \) a process; the visible set is \( T \).  
> [!WARNING]
> Treating the table as per-process without an indirection layer will make every later isolation claim appear magical rather than mechanical.

### Step 2 — A namespace supplies an indirection layer
A namespace is a kernel object that holds a pointer to a filtered or remapped subset of a global table. When a process is attached to a namespace, the kernel substitutes the namespace’s view for the global table on every relevant system call.

Example: after `unshare(CLONE_NEWPID)`, the process and its children see a new PID table that starts at 1; the global table still contains the original PIDs.

Formally, the visible set becomes \( \pi_N(T) \) where \( \pi_N \) is the projection defined by namespace \( N \).

### Step 3 — cgroups attach resource controllers to a subtree of processes
A cgroup is a node in a hierarchy; each controller (memory, cpu, blkio, …) registers callbacks that are invoked on resource events for every process in the subtree.

Example: writing 512M to `memory.limit_in_bytes` causes the memory controller to reclaim or OOM-kill processes once the aggregate resident set exceeds that value.

Formally, for resource \( r \) and limit \( L \), every allocation \( a \) satisfies \( \sum_{p \in C} a(p,r) \le L \).

### Step 4 — Namespaces and cgroups compose orthogonally
A container is the conjunction of one namespace of each type plus membership in one leaf cgroup per controller. The kernel enforces both mechanisms independently on every system call and scheduling event.

### Step 5 — The resulting isolation boundary is the system-call interface
Because the kernel itself is shared, no second scheduler or page-table root is created; only the *names* returned by the kernel and the *quantities* it permits are altered. This is the precise distinction from a virtual machine, whose hypervisor must trap and emulate every privileged instruction and device access.

## 5. Worked examples — every step shown

**Example 1 — Minimal PID isolation**  
*Given:* A shell running as PID 1234 on the host.  
*Find:* The PID seen by a process after entering a new PID namespace.  
Step 1: `unshare --pid --fork /bin/bash` creates a new `struct pid_namespace` and attaches the child.  
*Why* — The `CLONE_NEWPID` flag tells the kernel to allocate a fresh namespace object.  
Step 2: Inside the new shell, `echo $$` prints 1.  
*Why* — The kernel now indexes the new namespace’s PID map instead of the global map.  
**1**

*Reflection* — The global PID 1235 still exists; only the view changed.

**Example 2 — Memory limit via cgroup**  
*Given:* A process that allocates 600 MiB.  
*Find:* Outcome when attached to a 512 MiB memory cgroup.  
Step 1: `cgcreate -g memory:limited && cgset -r memory.limit_in_bytes=536870912 limited`.  
*Why* — The controller records the limit in its internal structure.  
Step 2: `cgexec -g memory:limited ./alloc 600M`.  
*Why* — On each page fault the memory controller checks aggregate usage.  
Step 3: The process is OOM-killed.  
*Why* — Usage exceeded the limit and no reclaim was possible.  
**OOM kill**

*Reflection* — The limit is enforced asynchronously by the controller, not by the allocator itself.

**Example 3 — Network namespace separation**  
*Given:* Two processes, A and B.  
*Find:* Can A see a socket created by B after each enters its own network namespace?  
Step 1: `ip netns add netA && ip netns add netB`.  
*Why* — Each netns owns a separate network stack.  
Step 2: In netA create a listening socket on 0.0.0.0:8080.  
*Why* — The socket is inserted into netA’s `struct net`.  
Step 3: In netB, `ss -ltn` shows no socket on port 8080.  
*Why* — The lookup walks only the current namespace’s tables.  
**No**

*Reflection* — The same port number can be reused safely across namespaces.

**Example 4 — Container versus VM resource accounting**  
*Given:* A 4 GiB host.  
*Find:* Maximum number of 512 MiB isolated workloads that can run without swapping.  
Step 1: Each container is placed in its own memory cgroup limited to 512 MiB.  
*Why* — The controller guarantees the sum never exceeds host RAM.  
Step 2: Eight such containers fit exactly.  
*Why* — 8 × 512 MiB = 4 GiB; the shared kernel occupies a few hundred MiB that is already reserved outside the cgroups.  
Step 3: Eight VMs each configured with 512 MiB fail once the hypervisor and eight guest kernels exceed remaining memory.  
*Why* — Each VM duplicates kernel structures.  
**8 containers succeed; 8 VMs do not**

*Reflection* — The difference is exactly the duplicated kernel state.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Believing containers contain a kernel | Marketing slides say “lightweight VM” | Always draw the stack: user space, container runtime, shared kernel, hardware |
| Forgetting mount namespaces when using volumes | `/proc` and `/sys` are not automatically isolated | Explicitly create a mount namespace or bind-mount the correct `/proc` |
| Setting only cpu.shares without a period | Shares are relative weights, not hard caps | Combine with `cpu.cfs_quota_us` for absolute limits |
| Assuming PID 1 inside a container is the host init | New PID namespace starts its own numbering | Use `docker run --init` or run a dedicated init process |
| Ignoring user namespaces | UID 0 inside container maps to a high UID on host | Enable user namespaces to reduce privilege-escalation surface |
| Measuring container density by image size only | Memory cgroup limits, not image size, determine packing | Query `memory.usage_in_bytes` of each cgroup |
| Treating cgroups v1 and v2 limits identically | v2 unifies controllers under a single hierarchy | Check `cgroup.controllers` and use the v2 API when available |

## 7. The textbook-precise statement
A container is a set of processes that share a common set of Linux namespaces (one of each type) and are members of a leaf node in each cgroup hierarchy. Formally, for namespaces \( N_{\text{pid}}, N_{\text{net}}, \dots \) and cgroups \( C_{\text{mem}}, C_{\text{cpu}}, \dots \), the container comprises exactly the processes \( P \) such that  
\[ \forall p\in P,\; \text{ns}(p) = N_i \quad\text{and}\quad p\in C_j. \]  
No additional kernel or hypervisor is required. (See “Namespaces and Cgroups”, *The Linux Programming Interface*, Kerrisk, §10.7 and the kernel documentation `Documentation/cgroup-v2.txt`.)

## 8. Visual — diagram or schematic
```text
Hardware
  |
Hypervisor (KVM, Xen, …)
  |                  \
Guest kernel A      Guest kernel B      Host kernel
  |                  |                   |
Guest user space   Guest user space     +---------------------+
                                        | namespace A | cgroup X |
                                        | namespace B | cgroup Y |
                                        +---------------------+
```
The left branch duplicates an entire kernel per VM; the right branch keeps one kernel and partitions its tables and controllers.

## 9. The memory technique
**The hook** — Imagine the kernel’s global tables as one giant library; a namespace is a personal card catalogue that only lists the books you are allowed to see, while a cgroup is the librarian who stops you from checking out more books than your quota.

**What to overlearn** — (1) Namespaces remap identifiers, cgroups enforce quantities. (2) The container boundary is the system-call interface, not the hardware instruction set. (3) Seven namespace types exist: pid, net, mnt, uts, ipc, user, time.

**Spaced-repetition schedule** — Review the one-sentence definition after 1 day, draw the VM-versus-container stack after 3 days, list all namespace types from memory after 7 days, explain a concrete cgroup controller after 16 days, and reproduce the formal statement after 35 days.

**First-principles fallback** — Start from the single global table \( T \); ask “what changes if I add an indirection layer before indexing \( T \)?” then “what changes if I add callbacks on every resource event?”

## 10. What this unlocks
Mastery of namespaces and cgroups lets you reason about every container runtime (Docker, containerd, CRI-O, systemd-nspawn) and every orchestrator policy (Kubernetes resource requests/limits, QoS classes). It also opens the next layer: seccomp filters, capabilities, and user-namespace UID mapping that together produce production-grade sandboxing.

- Next: seccomp-bpf and Linux capabilities  
- Next: user namespaces and rootless containers  
- Next: Kubernetes QoS and eviction logic  
- Next: eBPF-based observability inside cgroups

## 11. Self-check — five questions, no answers
1. A process inside a new PID namespace calls `getpid()`. Which table does the kernel consult, and what value is guaranteed to be returned for the first process in that namespace?  
2. Write the exact sequence of `unshare` flags required to create a container that has its own PID, mount, and network views but still sees the host’s UTS name.  
3. Given a memory cgroup whose `memory.limit_in_bytes` is 1 GiB and whose current usage is 900 MiB, what happens on the next 200 MiB allocation when no reclaim is possible?  
4. Why can two containers safely bind the same TCP port 80 while two processes on the host cannot?  
5. A developer observes that adding `--cpu-period=100000 --cpu-quota=50000` halves throughput of a container. Explain the controller arithmetic and predict the effect of also setting `--cpu-shares=512`.