## What it is
Disk scheduling is the process by which an operating system determines the order to service read/write requests for a hard disk drive (HDD). The primary goal is to improve efficiency by minimizing the total time the disk's read/write head spends moving between cylinders, a process known as seeking. These algorithms are a classic example of optimizing mechanical latency in a computer system.

## Why it matters
While Solid State Drives (SSDs) are now common, large-scale data systems, such as those used for training massive machine learning models or storing raw data from physics experiments (e.g., at CERN), still rely on cost-effective HDDs. In aerospace, flight data recorders and satellite telemetry archives often use robust, high-capacity magnetic storage. An efficient disk scheduler ensures high I/O throughput, preventing data access from becoming the bottleneck in computationally intensive tasks.

## When to study it
You should understand the basic physical structure of a hard disk drive: platters, cylinders, tracks, sectors, and the read/write head. You also need a foundational knowledge of operating systems, specifically what a system call is and how processes issue I/O requests to the kernel. Without this context, the problem that scheduling algorithms solve will seem abstract.

## How to study it (step by step)
1.  **Visualize the Hardware:** Draw a simplified diagram of a hard disk platter and a read/write head. Imagine the head having to move from the innermost cylinder to the outermost. This physical movement is what we want to minimize.
2.  **Implement FCFS:** Take a sample list of cylinder requests. Calculate the total head movement for the First-Come, First-Served (FCFS) algorithm. Note its simplicity and its obvious inefficiency.
3.  **Derive SCAN (The Elevator):** Ask yourself, "How can I improve on FCFS?" The most natural idea is to not jump back and forth. Service all requests in one direction until you hit the end, then reverse. This is the SCAN algorithm. Recalculate the head movement for the same request list and compare.
4.  **Identify SCAN's Flaw:** Consider a stream of requests arriving. SCAN will favor requests in the middle of the disk and provide poor service to requests at the very edges, especially those just behind the head's reversal point. This is a fairness problem.
5.  **Invent C-SCAN:** To fix the fairness issue, modify SCAN. Instead of reversing, make the return trip a single, fast sweep back to the beginning without servicing any requests (like a typewriter's carriage return). This is Circular SCAN (C-SCAN). It provides more uniform wait times.
6.  **Optimize with LOOK:** Realize that SCAN and C-SCAN waste time traveling to the absolute ends of the disk (cylinder 0 and the max cylinder) if no requests are pending there. Modify them to only travel as far as the last request in the current direction before reversing (LOOK) or resetting (C-LOOK).

## Key ideas, with intuition
1.  **Seek Time is the Enemy:** For an HDD, the time taken to service a request is dominated by seek time (moving the head to the correct cylinder) and rotational latency (waiting for the correct sector to spin under the head). Disk scheduling focuses almost exclusively on minimizing total seek time.
    $$ T_{\text{access}} = T_{\text{seek}} + T_{\text{rotation}} + T_{\text{transfer}} $$
    Our goal is to minimize $\sum T_{\text{seek}}$ over a batch of requests.

2.  **The Elevator Analogy (SCAN/LOOK):** This is the most powerful intuition. Imagine an elevator in a tall building. FCFS is like the elevator responding to button presses in the exact order they were pushed, leading to wild, inefficient trips up and down. SCAN is how a real elevator works: it continues in one direction (e.g., up), servicing all requests on its way, until it reaches the highest requested floor, then it reverses.

3.  **Throughput vs. Fairness (SCAN vs. C-SCAN):** SCAN maximizes throughput by minimizing head movement, but it's unfair. Requests near the middle get serviced more frequently than requests at the edges. C-SCAN sacrifices a small amount of throughput for better fairness. By always sweeping in the same direction (e.g., low cylinder to high) and then resetting, it prevents requests at the edges from being starved for long periods.

4.  **Pragmatic Optimization (LOOK/C-LOOK):** The LOOK algorithms are simple, pragmatic improvements on SCAN/C-SCAN. They embody the principle of not doing unnecessary work. Why travel to cylinder 199 if the highest-numbered request is at cylinder 183? Just go to 183 and turn around.

## Worked example
Let's analyze C-SCAN for a given scenario.

-   **Disk Cylinders:** 0 to 199.
-   **Initial Head Position:** Cylinder 53.
-   **Request Queue (in order of arrival):** 98, 183, 37, 122, 14, 124, 65, 67.
-   **Initial Direction:** Moving towards higher cylinder numbers (increasing).

**Steps:**

1.  **Sort the requests:** First, for clarity, let's sort the request queue: 14, 37, 65, 67, 98, 122, 124, 183.
2.  **Service in the initial direction:** The head is at 53 and moving towards 199. It will service all requests in its path greater than or equal to 53.
    -   The path is: $53 \rightarrow 65 \rightarrow 67 \rightarrow 98 \rightarrow 122 \rightarrow 124 \rightarrow 183$.
    -   After servicing 183, C-SCAN moves to the end of the disk, cylinder 199.
3.  **Perform the circular reset:** From cylinder 199, the head performs a fast return sweep to cylinder 0 without servicing any requests.
4.  **Service the remaining requests:** From cylinder 0, the head again moves towards 199 and services the remaining requests in its path.
    -   The path is: $0 \rightarrow 14 \rightarrow 37$.
5.  **Calculate total head movement:** We sum the absolute distances for each segment of the journey.
    -   Movement part 1 (initial sweep up): $(65-53) + (67-65) + (98-67) + (122-98) + (124-122) + (183-124) + (199-183) = 12 + 2 + 31 + 24 + 2 + 59 + 16 = 146$.
    -   Movement part 2 (reset sweep): $(199-0) = 199$.
    -   Movement part 3 (second sweep up): $(14-0) + (37-14) = 14 + 23 = 37$.
    -   **Total Head Movement:** $146 + 199 + 37 = 382$ cylinders.

**Reflection:** Each step follows the strict logic of C-SCAN. We first exhaust all requests in the current direction, continue to the disk's physical boundary, perform a full reset to the other boundary, and then resume servicing. This rigid procedure guarantees that no request waits for more than one full sweep of the disk.

## Diagrams
Here is the head movement for the C-SCAN worked example. The numbers represent the cylinder locations.

```text
Cylinder #
  ^
199-|----------------------------------------------------------O (end of sweep)
  |                                                          /
183-|----------------------------------------------------O---/
  |                                                    /
124-|--------------------------------------O-----------/
  |                                      /
122-|------------------------------------O-------------/
  |                                    /
 98-|-----------------------O-----------/
  |                       /
 67-|-------------O-------/
  |             /
 65-|-----------O---------/
  |           /
 53-|-O-------/  (start)
  | |
 37-|-----O----------------------------------------------------O (serviced after reset)
  |   /
 14-|-O--------------------------------------------------------O (serviced after reset)
  |/
  0-O (reset point) -------------------------------------------
  +------------------------------------------------------------> Time / Request Sequence
```

## Memory technique — remember this forever
1.  **The Story:** Imagine you're a delivery driver with a list of addresses (cylinder requests) on a single long road (the disk).
    -   **FCFS:** You drive to each address in the chaotic order you received the calls. Madness.
    -   **SCAN:** You're smarter. You drive to one end of the road, making all deliveries on your way, then turn around and do the same in the other direction. You're an **elevator**.
    -   **C-SCAN:** You're a newspaper delivery person. You only throw papers on the right side of the street. You drive down the road, delivering, then take the highway back to the start to do the next run. This is a **Circular** or **C**arriage-return motion.
    -   **LOOK:** You're an even smarter SCAN driver. You don't drive to the absolute end of the road if your last delivery is miles before it. You just **look** at your list, go to the last stop, and turn around there.

2.  **Overlearn this Formula:** The performance metric for all these algorithms is the same.
    $$ \text{Total Head Movement} = \sum_{i=1}^{n} | \text{pos}_{\text{current}} - \text{pos}_{\text{previous}} | $$
    You must be able to calculate this flawlessly. The only difference between algorithms is the *order* of the positions visited.

3.  **Spaced Repetition Schedule:**
    -   Review this material in **1 day**: Redo the worked example from memory.
    -   Review in **3 days**: Solve a new problem with a different queue.
    -   Review in **7 days**: Explain the fairness vs. throughput trade-off of SCAN vs. C-SCAN to a friend (or a rubber duck).
    -   Review in **16 days**: Implement FCFS and LOOK in pseudocode.
    -   Review in **35 days**: Derive the worst-case head movement for each algorithm.

4.  **First Principles Pathway:** If you forget everything, remember the physical device: a spinning platter and a moving head. The head movement is slow. How can I reorder a list of numbers to minimize the total travel distance? This will lead you to the sorted, sweeping motion of SCAN/LOOK. The fairness problem (starvation) will then lead you to the reset motion of C-SCAN.

## Common mistakes
1.  **Forgetting the Endpoints in SCAN/C-SCAN:** Students often forget that the pure SCAN and C-SCAN algorithms travel to the absolute ends of the disk (cylinder 0 and the max cylinder), even if no requests are there. LOOK/C-LOOK are the optimized versions that don't.
2.  **Servicing on the C-SCAN Return Trip:** A very common error is to have the head service requests on its high-speed return trip from the end back to the beginning. This is incorrect; the return sweep in C-SCAN is dead time, used only for repositioning.
3.  **Incorrectly Handling the Initial Direction:** For SCAN/LOOK, the initial direction of head movement is a given parameter. If the head is at 53 and moving towards 0, it must service 37 and 14 *before* reversing to get the requests at 65, 67, etc.
4.  **Mixing up LOOK and SCAN:** Using a LOOK-style reversal point (the last request) when you're supposed to be executing a pure SCAN (the disk edge). Read the question carefully.

## Self-check
1.  Given a disk with cylinders 0-499, a starting head position at 210, and a request queue of {88, 14, 450, 120, 300, 25, 175}, what is the total head movement for the FCFS algorithm?
2.  Using the same setup as question 1, compare the total head movement for SCAN and LOOK. Assume the initial direction is towards lower cylinder numbers. Which algorithm is more efficient here and by how much?
3.  Construct a small request queue and a specific arrival pattern of new requests that would cause a request at cylinder 0 to experience near-starvation under the SCAN algorithm but be serviced promptly under C-SCAN. Explain precisely why this happens.