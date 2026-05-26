## 1. The one-sentence answer
**GPU architecture executes programs under the SIMT model by bundling 32 threads into warps that fetch and execute a single instruction in lockstep on each streaming multiprocessor, while the CUDA programming model exposes this hardware through a hierarchy of grids, blocks, and threads.**

A CPU core runs one thread at a time and switches context when that thread stalls. A GPU instead keeps thousands of threads resident and issues the same instruction to an entire warp; every thread in the warp must be ready or the warp stalls. Divergence inside a warp forces the hardware to serialize the differing paths, so performance depends on keeping control flow uniform across the warp.

The CUDA model maps this hardware directly: a kernel launch creates a grid of thread blocks, each block is assigned to one streaming multiprocessor, and the threads inside the block are partitioned into warps by the hardware scheduler. The programmer therefore reasons about both the logical hierarchy (grid–block–thread) and the physical execution unit (warp).

> [!NOTE]
> The decisive insight is that SIMT is not SIMD with explicit vectors; it is implicit lockstep execution of scalar threads, and warp divergence is the dominant source of lost throughput.

## 2. Why this matters — concrete and current
NVIDIA’s A100 and H100 GPUs, built on the Ampere and Hopper architectures, power the training of large language models at OpenAI, Google, and Meta; each SM schedules warps from thousands of threads to hide memory latency while matrix-multiply units operate on warp-synchronous fragments.

In computational fluid dynamics, NASA’s FUN3D solver and the open-source Nek5000 code launch CUDA kernels whose thread blocks map to warps that update velocity fields across millions of mesh cells; warp-level reductions replace slower global atomics and cut iteration time by roughly 3× on Summit.

Modern real-time ray tracing in games and film (Unreal Engine 5, Pixar’s RenderMan) relies on warp-coherent ray bundles; NVIDIA’s OptiX and DXR APIs schedule warps so that nearby rays traverse the BVH together, keeping instruction fetch and L1 cache utilization high.

Tesla’s Full Self-Driving hardware uses NVIDIA Orin SoCs whose GPU executes perception networks; the CUDA scheduler maps convolutional layers to warps that process 32 adjacent pixels in lockstep, enabling the 250 TOPS throughput required for 360-degree inference at 30 fps.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Basic von Neumann pipeline and instruction fetch | Explains why a warp shares a single program counter |
| Thread versus process distinction | Clarifies that GPU threads are lightweight and lack separate address spaces |
| Memory hierarchy (registers, cache, DRAM) | Shows why warp scheduling hides latency only when enough warps are resident |
| Simple data-parallel loop | Provides the mental model that CUDA kernels replace with thread indices |

## 4. Building the idea — from intuition to formalism

### Step 1 — Threads outnumber cores by orders of magnitude
A modern GPU contains dozens of streaming multiprocessors, yet each SM holds only a few thousand registers and a few tens of kilobytes of shared memory. The hardware therefore keeps far more threads resident than physical ALUs so that when one warp waits for memory another warp issues compute. Formally, occupancy is defined as
\[
\text{occupancy} = \frac{\text{active warps per SM}}{\text{maximum warps per SM}}.
\]
If occupancy drops below roughly 50 %, latency hiding collapses.

> [!WARNING]
> Treating each CUDA thread as an independent core leads to the false expectation that 1 000 000 threads implies 1 000 000 simultaneous ALUs; only 32 threads per warp actually execute at once.

### Step 2 — Warps are the atomic scheduling unit
Hardware partitions every block of threads into groups of 32 consecutive threads; each group is a warp. All 32 threads share a single program counter and execute the same instruction unless divergence occurs. The scheduler issues one instruction per warp per cycle on each of the four warp schedulers inside an SM.

### Step 3 — SIMT versus SIMD
SIMD applies one instruction to a fixed vector register. SIMT applies one instruction to 32 scalar threads that each have their own registers and can take independent addresses; the hardware merely forces them to execute in lockstep. The distinction matters when threads compute different addresses or follow different branches.

### Step 4 — Divergence serializes execution
When threads inside a warp evaluate a conditional differently, the warp executes both sides sequentially while masking inactive threads. The cost is proportional to the number of distinct paths taken. After the divergent region the warp reconverges at the immediate post-dominator.

### Step 5 — CUDA hierarchy maps onto hardware
A kernel launch specifies a grid of blocks; each block is assigned to one SM and split into warps. Thread indices (`threadIdx`, `blockIdx`) are simply arithmetic expressions evaluated at launch time; the hardware never sees them until they are used to compute memory addresses.

### Step 6 — Memory spaces reflect warp execution
Registers are per-thread and private. Shared memory is per-block and visible to all warps inside that block. Global memory is visible to the entire grid. Because warps execute in lockstep, coalesced accesses (consecutive threads reading consecutive addresses) merge into single memory transactions.

### Step 7 — The formal CUDA execution model
A CUDA program is a grid \(G\) of thread blocks \(B_{i}\). Each block contains \(T\) threads. The hardware maps each block to an SM and partitions the \(T\) threads into \(\lceil T/32\rceil\) warps. Execution proceeds by issuing ready warps to SIMT pipelines until the kernel terminates.

## 5. Worked examples — every step shown

**Example 1 — Warp formation**
*Given:* A block of 128 threads is launched on an SM that supports 4 warps per scheduler.  
*Find:* How many warps are created and which threads belong to warp 2.  
Step 1: Divide block size by warp size: \(128 / 32 = 4\).  
*Why:* Hardware definition of warp size is 32.  
Step 2: Warp 2 contains threads whose indices satisfy \(64 \le \text{threadIdx.x} < 96\).  
*Why:* Threads are assigned consecutively starting at 0.  
**Final answer**  
4 warps; warp 2 = threads 64–95.

*Reflection* The mapping is deterministic and independent of runtime scheduling.

**Example 2 — Divergence cost**
*Given:* A warp reaches an `if (threadIdx.x % 2 == 0)` statement.  
*Find:* Number of cycles spent inside the conditional relative to uniform control flow.  
Step 1: Two paths exist (even/odd).  
*Why:* The predicate splits the warp mask.  
Step 2: Hardware executes the true path with mask 0x55555555, then the false path with mask 0xAAAAAAAA.  
*Why:* SIMT serialization rule.  
Step 3: Total cycles = 2× the longest path.  
**Final answer**  
Execution time doubles.

*Reflection* Even a single divergent branch inside a hot loop can halve throughput.

**Example 3 — Coalesced versus strided access**
*Given:* 32 threads read 32 consecutive 4-byte floats.  
*Find:* Number of 128-byte cache-line transactions.  
Step 1: Addresses form one contiguous 128-byte region.  
*Why:* 32 × 4 = 128.  
Step 2: Memory controller merges the requests into one transaction.  
**Final answer**  
1 transaction.

*Reflection* Changing the stride to 4 immediately produces 32 separate transactions.

**Example 4 — Occupancy calculation**
*Given:* Each thread uses 32 registers, each block uses 4096 bytes of shared memory, SM limits are 65536 registers and 48 KB shared memory, maximum 32 warps per SM.  
*Find:* Maximum blocks per SM limited by registers.  
Step 1: Registers per block = 32 × 256 = 8192 (assume 256 threads).  
*Why:* 256 threads per block.  
Step 2: 65536 / 8192 = 8 blocks.  
*Why:* Register file is the binding constraint.  
Step 3: Shared memory permits 48 000 / 4096 ≈ 11 blocks.  
*Why:* Compare both limits.  
**Final answer**  
8 blocks per SM.

*Reflection* Occupancy is the minimum of all resource ceilings, not merely thread count.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming every thread runs concurrently | CUDA exposes millions of threads; hardware only runs 32 at a time per SM | Count resident warps, not total threads |
| Ignoring divergence inside loops | Compiler cannot prove uniformity; hardware still pays the cost | Use `__any_sync` / `__all_sync` or restructure data |
| Treating shared memory as a cache | Shared memory is explicitly managed scratchpad, not automatic | Allocate and synchronize explicitly with `__syncthreads` |
| Expecting global-memory coalescing after pointer arithmetic | Strided indexing breaks adjacency | Ensure consecutive threads access consecutive addresses |
| Over-subscribing registers | High register pressure lowers occupancy faster than expected | Compile with `--ptxas-options=-v` and inspect register count |
| Confusing block size with warp size | Blocks can be any multiple of 32; warps are always 32 | Choose block sizes that are multiples of 32 to avoid wasted lanes |
| Assuming warp synchronous execution without intrinsics | Volta+ introduced independent thread scheduling; old code breaks | Use `__syncwarp` when relying on lockstep |

## 7. The textbook-precise statement
A CUDA kernel launch creates a grid \(G\) of thread blocks. Each block \(B\) is a collection of threads whose indices range over a three-dimensional domain. The hardware partitions each block into warps of exactly 32 threads that execute under the SIMT rule: at most one instruction is issued per warp per cycle, and all threads within the warp share the same program counter unless masked by divergence. Divergence is resolved by sequential execution of distinct control-flow paths followed by reconvergence at the immediate post-dominator. The model is defined in the NVIDIA CUDA C++ Programming Guide, version 12.0, §2.2–2.3 and §5.2 (warp-level primitives).

## 8. Visual — diagram or schematic
```text
Grid
├── Block (0,0) ──► SM 0
│   ├── Warp 0 (threads 0-31)
│   ├── Warp 1 (threads 32-63)
│   └── ...
├── Block (1,0) ──► SM 1
│   └── ...
└── ...
```
Each SM contains four warp schedulers, a register file, an L1/shared-memory partition, and SIMT execution pipelines. Threads inside one warp share the instruction fetch unit but hold independent register state.

## 9. The memory technique
**The hook**  
Picture 32 soldiers marching in a single-file line; they must all step forward together or the line breaks. That line is a warp.

**What to overlearn**  
- Warp size = 32 (fixed on all current NVIDIA GPUs).  
- Divergence cost = number of distinct paths executed.  
- Coalescing rule: addresses from a warp must lie inside a single 128-byte sector.

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Re-derive from the fact that a single program counter is fetched per warp; any control-flow split forces the fetch unit to issue multiple distinct instructions for the same warp.

## 10. What this unlocks
Mastery of SIMT and warps lets you reason about kernel performance at the instruction-issue level and prepares you for tensor-core programming, cooperative groups, and asynchronous memory copies. Next concepts include warp-matrix multiply-accumulate (WMMA) intrinsics, persistent threads, and multi-GPU communication with NVLink.

## 11. Self-check — five questions, no answers
1. A block of 100 threads is launched. How many warps are created and how many threads are inactive in the last warp?  
2. Inside a warp, 17 threads take the `if` branch and 15 take the `else`. What fraction of peak instruction throughput remains during that region?  
3. Threads 0–31 read addresses `base + threadIdx.x * 8`. Are the accesses coalesced on a device with 128-byte cache lines?  
4. An SM has 65536 registers. If each thread uses 64 registers, what is the maximum number of warps that can be resident before registers become the limit?  
5. A programmer removes all branches inside a hot loop yet occupancy stays at 25 %. Which resource is most likely still constraining the scheduler?