## 1. What it is — in plain English

Imagine you're trying to find the quickest way from your house to a friend's house across town. You could just wander around randomly until you get there, but that would take forever. You could also try every single road, meticulously checking every possible route, but that's also a lot of work.

A* (pronounced "A-star") is like a super-smart navigation system. Instead of just wandering or checking *every* path equally, it uses a clever trick: it estimates how far away your friend's house is from your current location, even if you haven't driven there yet. It combines this estimate with the actual distance you've already driven.

So, at every intersection, A* looks at all the immediate options and picks the one that *seems* most promising – the one that has the lowest total estimated cost (the actual distance driven so far *plus* the estimated distance remaining). It's like saying, "I've driven 5 miles, and I *think* I have about 10 miles left. That path looks better than this other one where I've driven 7 miles and still *think* I have 12 miles left."

This "smart guessing" helps A* quickly home in on the best path without wasting time exploring dead ends or obviously longer routes. It's a balance between being thorough (like checking actual distances) and being efficient (like using a good guess).

## 2. Why it matters — real-world applications

The A* algorithm is incredibly important because it efficiently finds optimal paths in vast search spaces, which is critical in many complex systems.

1.  **GPS Navigation Systems (e.g., Google Maps, Waze):** This is perhaps the most common application. When you ask for directions, A* is often working behind the scenes. It finds the shortest (or fastest, or least traffic-congested) route from your current location to your destination. The "heuristic" here could be the straight-line distance (Euclidean distance) to the destination, or a more sophisticated estimate based on historical traffic data.

2.  **Robotics and Autonomous Vehicles (e.g., Self-driving Cars, Factory Robots):** For a robot to move from point A to point B without hitting obstacles, it needs a pathfinding algorithm. A* allows self-driving cars to plan routes on a map, and factory robots to navigate their workspace, avoiding collisions and optimizing movement time. In these scenarios, the "cost" might be distance, energy consumption, or time.

3.  **Game AI (e.g., Strategy Games, RPGs):** Non-player characters (NPCs) in video games often use A* to navigate game worlds. Whether it's an enemy trying to find the player, a friendly character following a quest path, or units in a real-time strategy game moving across a battlefield, A* helps them find efficient paths around terrain and obstacles, making their behavior seem intelligent and natural.

4.  **Aerospace Guidance, Navigation, and Control (GNC):** This is a high-stakes application. For spacecraft, drones, or missiles, A* can be used for trajectory planning. The "nodes" might represent different states (position, velocity, orientation) and the "edges" represent control inputs or maneuvers. A* can find an optimal trajectory that minimizes fuel consumption, time to target, or avoids no-fly zones. The heuristic could be a simplified physics model estimating the minimum theoretical fuel/time to reach the target state. Its ability to find *provably optimal* paths (given an admissible heuristic) is paramount for mission success and safety in GNC.

5.  **Logistics and Supply Chain Optimization:** Companies like Amazon or FedEx need to optimize delivery routes for thousands of packages. A* can be adapted to find optimal routes for delivery vehicles, minimizing travel time and fuel costs, even with dynamic constraints like traffic or package priorities.

## 3. Prerequisites — what you must know first

Before diving deep into A*, ensure you have a solid grasp of these fundamental concepts:

*   **Graphs:** A collection of `nodes` (or `vertices`) connected by `edges`. You should understand directed vs. undirected graphs, and weighted vs. unweighted graphs.
*   **Graph Traversal:** Algorithms like Breadth-First Search (BFS) and Depth-First Search (DFS) for systematically visiting all nodes in a graph.
*   **Dijkstra's Algorithm:** A classic algorithm for finding the shortest paths between nodes in a graph, especially useful for graphs with non-negative edge weights. A* builds upon Dijkstra's by adding a heuristic.
*   **Priority Queues:** An abstract data type that stores elements with priorities and allows efficient retrieval of the element with the highest (or lowest) priority. Essential for A* to efficiently select the "most promising" node to explore next.
*   **Basic Search Concepts:** Understanding what a `state space` is, how to define `start states` and `goal states`, and the general idea of searching for a path.

## 4. The core idea — step by step

The A\* algorithm's power comes from intelligently combining information about the path already taken with an estimate of the path yet to come. Let's break down its core components.

### Step 1: The Goal - Finding the Shortest Path

*   **Plain English:** We want to find the "cheapest" way to get from a starting point to a destination. "Cheapest" could mean shortest distance, least time, minimum fuel, etc.
*   **Concrete Example:** On a map, finding the route with the fewest miles from New York City to Los Angeles.
*   **Formal/Mathematical Version:** Given a graph $G = (V, E)$ with non-negative edge weights $w(u, v) \ge 0$ for all $(u, v) \in E$, and a start node $S$ and a goal node $G_{goal}$, find a path $P = \langle S=v_0, v_1, \dots, v_k=G_{goal} \rangle$ such that the total cost $\sum_{i=0}^{k-1} w(v_i, v_{i+1})$ is minimized.
*   **What Could Go Wrong:** Without a systematic approach, we might find *a* path, but not necessarily the *shortest* one.

### Step 2: Cost So Far ($g(n)$)

*   **Plain English:** This is the actual, measured cost of the path you've already traveled from your starting point to the current location (node $n$). It's a precise, known value.
*   **Concrete Example:** If you're driving from NYC and have already passed through Chicago, $g(\text{Chicago})$ would be the actual mileage driven from NYC to Chicago.
*   **Formal/Mathematical Version:** For any node $n$, $g(n)$ is the exact cost of the optimal path found *so far* from the start node $S$ to $n$.
    $$ g(n) = \text{cost}(\text{path from } S \text{ to } n) $$
*   **What Could Go Wrong:** If $g(n)$ is calculated incorrectly (e.g., by summing edge weights wrong, or not updating it when a shorter path to $n$ is found), the algorithm will make poor decisions and might not find the optimal path.

### Step 3: Estimated Cost to Goal ($h(n)$ - The Heuristic)

*   **Plain English:** This is your "smart guess" about how much more it will cost to get from your current location (node $n$) to the final destination. It's an estimate, not an exact value, and it's what makes A* "informed."
*   **Concrete Example:** From Chicago, the straight-line distance (as the crow flies) to Los Angeles. This is an easy-to-calculate estimate that usually underestimates the actual driving distance.
*   **Formal/Mathematical Version:** For any node $n$, $h(n)$ is the estimated cost from $n$ to the goal node $G_{goal}$. This function is called the **heuristic function**.
    $$ h(n) = \text{estimated\_cost}(n \text{ to } G_{goal}) $$
*   **What Could Go Wrong:** A bad heuristic can severely degrade A*'s performance. If $h(n)$ is too high, A* might explore many unpromising paths. If it's too low, it might still be slow. Most critically, if it's not "admissible" (see Step 5), A* might not find the optimal path at all.

### Step 4: The Evaluation Function ($f(n)$)

*   **Plain English:** This is the total estimated cost of a path that *goes through* the current node $n$. It's the sum of the actual cost to get to $n$ ($g(n)$) and the estimated cost to get from $n$ to the goal ($h(n)$). A* always prioritizes exploring the node with the lowest $f(n)$ value.
*   **Concrete Example:** From Chicago, if $g(\text{Chicago})$ is 2000 miles (from NYC) and $h(\text{Chicago})$ is 1500 miles (straight-line to LA), then $f(\text{Chicago}) = 2000 + 1500 = 3500$ miles. This is A*'s current best guess for the *total* path cost if it goes through Chicago.
*   **Formal/Mathematical Version:** For any node $n$, the evaluation function $f(n)$ is defined as:
    $$ f(n) = g(n) + h(n) $$
*   **What Could Go Wrong:** Since $f(n)$ relies on $g(n)$ and $h(n)$, any errors or issues with those components will directly impact $f(n)$ and thus A*'s search direction.

### Step 5: Admissibility of the Heuristic

*   **Plain English:** A heuristic is "admissible" if it *never overestimates* the true cost to reach the goal. It's always optimistic or exactly right, but never too high. Think of it as a promise: "I'll tell you an estimate, and I guarantee it's either the real cost or less."
*   **Concrete Example:** The straight-line distance (Euclidean distance) between two points on a map is always less than or equal to any actual path (roads, paths, etc.) between those points. You can't travel less than a straight line. So, straight-line distance is an admissible heuristic for road networks.
*   **Formal/Mathematical Version:** A heuristic function $h(n)$ is admissible if for every node $n$ in the graph, $h(n) \le h^*(n)$, where $h^*(n)$ is the true, optimal cost from $n$ to the goal node $G_{goal}$.
*   **What Could Go Wrong:** If a heuristic is *not* admissible (i.e., it sometimes overestimates the true cost), A* is no longer guaranteed to find the optimal (shortest) path. It might prematurely discard a path that *looks* longer based on the overestimated heuristic, but is actually shorter. This is a critical property for GNC applications where optimality (e.g., minimum fuel) is often a requirement.

### Step 6: Consistency of the Heuristic (Monotonicity)

*   **Plain English:** A heuristic is "consistent" (also called "monotonic") if the estimated cost from node $n$ to the goal is no more than the actual cost to move from $n$ to an adjacent node $n'$, plus the estimated cost from $n'$ to the goal. It's like saying, "As you get closer to the goal, your estimate of the remaining distance shouldn't suddenly drop by more than the cost of the step you just took."
*   **Concrete Example:** If it costs 5 units to travel from node A to node B, and your estimated cost from A to the goal is 10, then your estimated cost from B to the goal must be at least $10 - 5 = 5$. It can't be 3, because that would mean the estimate "dropped too much" for a single step.
*   **Formal/Mathematical Version:** A heuristic function $h(n)$ is consistent if for every node $n$ and every neighbor $n'$ of $n$:
    $$ h(n) \le \text{cost}(n, n') + h(n') $$
    where $\text{cost}(n, n')$ is the actual cost of the edge from $n$ to $n'$.
    An important property is that **every consistent heuristic is also admissible**. However, an admissible heuristic is not necessarily consistent.
*   **What Could Go Wrong:** If a heuristic is not consistent, A* might have to "reopen" nodes. This means it might find a node $n$ through one path, then later find a *shorter* path to $n$ and need to re-process all of $n$'s neighbors. While A* with an admissible but inconsistent heuristic still guarantees optimality, it can be less efficient because of these re-expansions. With a consistent heuristic, $g(n)$ values are guaranteed to be optimal the first time a node is expanded, leading to more efficient performance.

### Step 7: The A* Algorithm Steps (High-Level)

1.  **Initialization:**
    *   Create an `open list` (a priority queue) to store nodes to be evaluated, ordered by their $f(n)$ value (lowest first).
    *   Create a `closed list` (a set) to store nodes that have already been evaluated.
    *   Set $g(S) = 0$ for the start node $S$, and $h(S)$ to its heuristic value. Calculate $f(S) = g(S) + h(S)$.
    *   Add $S$ to the open list.
    *   Keep track of the parent of each node to reconstruct the path later.

2.  **Loop:** While the open list is not empty:
    *   Extract the node $current$ with the lowest $f(current)$ from the open list.
    *   Add $current$ to the closed list.
    *   **Goal Check:** If $current$ is the goal node, reconstruct the path by backtracking from $current$ to $S$ using parent pointers, and return the path.
    *   **Explore Neighbors:** For each neighbor $n'$ of $current$:
        *   If $n'$ is in the closed list, ignore it (we've already found the best path to it, assuming a consistent heuristic).
        *   Calculate the tentative $g$ value for $n'$: $g_{tentative}(n') = g(current) + \text{cost}(current, n')$.
        *   If $n'$ is not in the open list OR $g_{tentative}(n') < g(n')$ (meaning we found a shorter path to $n'$):
            *   Set $g(n') = g_{tentative}(n')$.
            *   Set $h(n')$ to its heuristic value.
            *   Calculate $f(n') = g(n') + h(n')$.
            *   Set $current$ as the parent of $n'$.
            *   If $n'$ is not already in the open list, add it. If it is, update its priority in the open list.

## 5. Worked examples — multiple, with every step shown

Let's use a grid-based map for our examples, where movement is restricted to 4 directions (up, down, left, right) and each step costs 1 unit. We'll use the Manhattan distance as our heuristic, which is admissible and consistent for grid maps with 4-directional movement.

**Manhattan Distance:** $h(n) = |n_x - G_x| + |n_y - G_y|$

### Example 1: Simple Grid Pathfinding

**Problem:** Find the shortest path from Start (S) to Goal (G) on the 3x3 grid below. Each move (up, down, left, right) costs 1.
```text
(0,2) (1,2) (2,2)
(0,1) (1,1) (2,1)
(0,0) (1,0) (2,0)
```
Start is (0,0), Goal is (2,2).

**Given:**
*   Grid: 3x3
*   Start Node S: (0,0)
*   Goal Node G: (2,2)
*   Movement Cost: 1 per step (horizontal/vertical)
*   Heuristic $h(n)$: Manhattan Distance to (2,2)

**What we want:** The optimal path from (0,0) to (2,2).

**Heuristic Values for all nodes (Manhattan distance to (2,2)):**
*   h(0,0) = |0-2| + |0-2| = 2+2 = 4
*   h(1,0) = |1-2| + |0-2| = 1+2 = 3
*   h(2,0) = |2-2| + |0-2| = 0+2 = 2
*   h(0,1) = |0-2| + |1-2| = 2+1 = 3
*   h(1,1) = |1-2| + |1-2| = 1+1 = 2
*   h(2,1) = |2-2| + |1-2| = 0+1 = 1
*   h(0,2) = |0-2| + |2-2| = 2+0 = 2
*   h(1,2) = |1-2| + |2-2| = 1+0 = 1
*   h(2,2) = |2-2| + |2-2| = 0+0 = 0

---

**Step-by-step Execution:**

**Initialization:**
*   `open_list` (Priority Queue): Empty
*   `closed_list`: Empty
*   `g_scores`: All $\infty$ except $g(0,0) = 0$
*   `f_scores`: All $\infty$ except $f(0,0) = g(0,0) + h(0,0) = 0 + 4 = 4$
*   `parents`: Empty

Add S=(0,0) to `open_list` with $f=4$.
`open_list`: `[( (0,0), f=4 )]`

---

**Iteration 1:**
*   **Pop:** `(0,0)` (f=4) from `open_list`. Add to `closed_list`.
    *   `current = (0,0)`
    *   `g(0,0) = 0`
    *   `h(0,0) = 4`
    *   `f(0,0) = 4`
*   **Goal Check:** `(0,0)` is not `(2,2)`.
*   **Neighbors of (0,0):**
    *   `(1,0)`:
        *   `g_tentative = g(0,0) + cost((0,0),(1,0)) = 0 + 1 = 1`.
        *   Since `1 < g(1,0)` (which is $\infty$), update `g(1,0) = 1`.
        *   `h(1,0) = 3`.
        *   `f(1,0) = g(1,0) + h(1,0) = 1 + 3 = 4`.
        *   Set parent of `(1,0)` to `(0,0)`. Add `(1,0)` to `open_list`.
    *   `(0,1)`:
        *   `g_tentative = g(0,0) + cost((0,0),(0,1)) = 0 + 1 = 1`.
        *   Since `1 < g(0,1)` (which is $\infty$), update `g(0,1) = 1`.
        *   `h(0,1) = 3`.
        *   `f(0,1) = g(0,1) + h(0,1) = 1 + 3 = 4`.
        *   Set parent of `(0,1)` to `(0,0)`. Add `(0,1)` to `open_list`.
`open_list`: `[( (1,0), f=4 ), ( (0,1), f=4 )]` (order might vary for ties, but both are valid choices)
`closed_list`: `[(0,0)]`

---

**Iteration 2:** (Let's assume `(1,0)` is popped due to tie-breaking, e.g., lexicographical order)
*   **Pop:** `(1,0)` (f=4) from `open_list`. Add to `closed_list`.
    *   `current = (1,0)`
    *   `g(1,0) = 1`
    *   `h(1,0) = 3`
    *   `f(1,0) = 4`
*   **Goal Check:** `(1,0)` is not `(2,2)`.
*   **Neighbors of (1,0):**
    *   `(0,0)`: In `closed_list`. Ignore.
    *   `(2,0)`:
        *   `g_tentative = g(1,0) + cost((1,0),(2,0)) = 1 + 1 = 2`.
        *   Since `2 < g(2,0)` (which is $\infty$), update `g(2,0) = 2`.
        *   `h(2,0) = 2`.
        *   `f(2,0) = g(2,0) + h(2,0) = 2 + 2 = 4`.
        *   Set parent of `(2,0)` to `(1,0)`. Add `(2,0)` to `open_list`.
    *   `(1,1)`:
        *   `g_tentative = g(1,0) + cost((1,0),(1,1)) = 1 + 1 = 2`.
        *   Since `2 < g(1,1)` (which is $\infty$), update `g(1,1) = 2`.
        *   `h(1,1) = 2`.
        *   `f(1,1) = g(1,1) + h(1,1) = 2 + 2 = 4`.
        *   Set parent of `(1,1)` to `(1,0)`. Add `(1,1)` to `open_list`.
`open_list`: `[( (0,1), f=4 ), ( (2,0), f=4 ), ( (1,1), f=4 )]`
`closed_list`: `[(0,0), (1,0)]`

---

**Iteration 3:** (Let's assume `(0,1)` is popped)
*   **Pop:** `(0,1)` (f=4) from `open_list`. Add to `closed_list`.
    *   `current = (0,1)`
    *   `g(0,1) = 1`
    *   `h(0,1) = 3`
    *   `f(0,1) = 4`
*   **Goal Check:** `(0,1)` is not `(2,2)`.
*   **Neighbors of (0,1):**
    *   `(0,0)`: In `closed_list`. Ignore.
    *   `(0,2)`:
        *   `g_tentative = g(0,1) + cost((0,1),(0,2)) = 1 + 1 = 2`.
        *   Since `2 < g(0,2)` (which is $\infty$), update `g(0,2) = 2`.
        *   `h(0,2) = 2`.
        *   `f(0,2) = g(0,2) + h(0,2) = 2 + 2 = 4`.
        *   Set parent of `(0,2)` to `(0,1)`. Add `(0,2)` to `open_list`.
    *   `(1,1)`:
        *   `g_tentative = g(0,1) + cost((0,1),(1,1)) = 1 + 1 = 2`.
        *   Current `g(1,1)` is `2`. `g_tentative` is `2`. `2` is not less than `2`. No update needed (or update to same value, parent remains `(1,0)`).
        *   *Self-correction:* If we strictly follow `g_tentative < g(n')`, then no update here. If `g_tentative <= g(n')`, we might update parent. For optimality, it doesn't matter as long as $g$ is correct.
`open_list`: `[( (2,0), f=4 ), ( (1,1), f=4 ), ( (0,2), f=4 )]`
`closed_list`: `[(0,0), (1,0), (0,1)]`

---

**Iteration 4:** (Let's assume `(2,0)` is popped)
*   **Pop:** `(2,0)` (f=4) from `open_list`. Add to `closed_list`.
    *   `current = (2,0)`
    *   `g(2,0) = 2`
    *   `h(2,0) = 2`
    *   `f(2,0) = 4`
*   **Goal Check:** `(2,0)` is not `(2,2)`.
*   **Neighbors of (2,0):**
    *   `(1,0)`: In `closed_list`. Ignore.
    *   `(2,1)`:
        *   `g_tentative = g(2,0) + cost((2,0),(2,1)) = 2 + 1 = 3`.
        *   Since `3 < g(2,1)` (which is $\infty$), update `g(2,1) = 3`.
        *   `h(2,1) = 1`.
        *   `f(2,1) = g(2,1) + h(2,1) = 3 + 1 = 4`.
        *   Set parent of `(2,1)` to `(2,0)`. Add `(2,1)` to `open_list`.
`open_list`: `[( (1,1), f=4 ), ( (0,2), f=4 ), ( (2,1), f=4 )]`
`closed_list`: `[(0,0), (1,0), (0,1), (2,0)]`

---

**Iteration 5:** (Let's assume `(1,1)` is popped)
*   **Pop:** `(1,1)` (f=4) from `open_list`. Add to `closed_list`.
    *   `current = (1,1)`
    *   `g(1,1) = 2`
    *   `h(1,1) = 2`
    *   `f(1,1) = 4`
*   **Goal Check:** `(1,1)` is not `(2,2)`.
*   **Neighbors of (1,1):**
    *   `(1,0)`: In `closed_list`. Ignore.
    *   `(0,1)`: In `closed_list`. Ignore.
    *   `(1,2)`:
        *   `g_tentative = g(1,1) + cost((1,1),(1,2)) = 2 + 1 = 3`.
        *   Since `3 < g(1,2)` (which is $\infty$), update `g(1,2) = 3`.
        *   `h(1,2) = 1`.
        *   `f(1,2) = g(1,2) + h(1,2) = 3 + 1 = 4`.
        *   Set parent of `(1,2)` to `(1,1)`. Add `(1,2)` to `open_list`.
    *   `(2,1)`:
        *   `g_tentative = g(1,1) + cost((1,1),(2,1)) = 2 + 1 = 3`.
        *   Current `g(2,1)` is `3`. `g_tentative` is `3`. Not less than. No update needed.
`open_list`: `[( (0,2), f=4 ), ( (2,1), f=4 ), ( (1,2), f=4 )]`
`closed_list`: `[(0,0), (1,0), (0,1), (2,0), (1,1)]`

---

**Iteration 6:** (Let's assume `(0,2)` is popped)
*   **Pop:** `(0,2)` (f=4) from `open_list`. Add to `closed_list`.
    *   `current = (0,2)`
    *   `g(0,2) = 2`
    *   `h(0,2) = 2`
    *   `f(0,2) = 4`
*   **Goal Check:** `(0,2)` is not `(2,2)`.
*   **Neighbors of (0,2):**
    *   `(0,1)`: In `closed_list`. Ignore.
    *   `(1,2)`:
        *   `g_tentative = g(0,2) + cost((0,2),(1,2)) = 2 + 1 = 3`.
        *   Current `g(1,2)` is `3`. `g_tentative` is `3`. Not less than. No update needed.
`open_list`: `[( (2,1), f=4 ), ( (1,2), f=4 )]`
`closed_list`: `[(0,0), (1,0), (0,1), (2,0), (1,1), (0,2)]`

---

**Iteration 7:** (Let's assume `(2,1)` is popped)
*   **Pop:** `(2,1)` (f=4) from `open_list`. Add to `closed_list`.
    *   `current = (2,1)`
    *   `g(2,1) = 3`
    *   `h(2,1) = 1`
    *   `f(2,1) = 4`
*   **Goal Check:** `(2,1)` is not `(2,2)`.
*   **Neighbors of (2,1):**
    *   `(2,0)`: In `closed_list`. Ignore.
    *   `(1,1)`: In `closed_list`. Ignore.
    *   `(2,2)` (Goal!):
        *   `g_tentative = g(2,1) + cost((2,1),(2,2)) = 3 + 1 = 4`.
        *   Since `4 < g(2,2)` (which is $\infty$), update `g(2,2) = 4`.
        *   `h(2,2) = 0`.
        *   `f(2,2) = g(2,2) + h(2,2) = 4 + 0 = 4`.
        *   Set parent of `(2,2)` to `(2,1)`. Add `(2,2)` to `open_list`.
`open_list`: `[( (1,2), f=4 ), ( (2,2), f=4 )]`
`closed_list`: `[(0,0), (1,0), (0,1), (2,0), (1,1), (0,2), (2,1)]`

---

**Iteration 8:** (Let's assume `(1,2)` is popped)
*   **Pop:** `(1,2)` (f=4) from `open_list`. Add to `closed_list`.
    *   `current = (1,2)`
    *   `g(1,2) = 3`
    *   `h(1,2) = 1`
    *   `f(1,2) = 4`
*   **Goal Check:** `(1,2)` is not `(2,2)`.
*   **Neighbors of (1,2):**
    *   `(0,2)`: In `closed_list`. Ignore.
    *   `(1,1)`: In `closed_list`. Ignore.
    *   `(2,2)` (Goal!):
        *   `g_tentative = g(1,2) + cost((1,2),(2,2)) = 3 + 1 = 4`.
        *   Current `g(2,2)` is `4`. `g_tentative` is `4`. Not less than. No update needed.
`open_list`: `[( (2,2), f=4 )]`
`closed_list`: `[(0,0), (1,0), (0,1), (2,0), (1,1), (0,2), (2,1), (1,2)]`

---

**Iteration 9:**
*   **Pop:** `(2,2)` (f=4) from `open_list`. Add to `closed_list`.
    *   `current = (2,2)`
    *   `g(2,2) = 4`
    *   `h(2,2) = 0`
    *   `f(2,2) = 4`
*   **Goal Check:** `(2,2)` IS THE GOAL NODE!

**Path Reconstruction:**
Start from Goal `(2,2)` and backtrack using parent pointers:
*   `(2,2)` parent is `(2,1)`
*   `(2,1)` parent is `(2,0)`
*   `(2,0)` parent is `(1,0)`
*   `(1,0)` parent is `(0,0)` (Start!)

**Final Answer:**
The optimal path is: **(0,0) -> (1,0) -> (2,0) -> (2,1) -> (2,2)**
The total cost $g(\text{Goal})$ is **4**.

**Reflection:** This example was straightforward. All `f` values were initially 4, leading to many nodes being explored with the same priority. The Manhattan distance heuristic correctly guided the search towards the goal, and since it's admissible and consistent for this grid, an optimal path was guaranteed and found efficiently.

---

### Example 2: Grid with Obstacles

**Problem:** Find the shortest path from S=(0,0) to G=(2,2) on the 3x3 grid with an obstacle at (1,1). Each move costs 1.

```text
(0,2) (1,2) (2,2)
(0,1)  X   (2,1)
(0,0) (1,0) (2,0)
```
Start is (0,0), Goal is (2,2), Obstacle X is (1,1).

**Given:**
*   Grid: 3x3
*   Start Node S: (0,0)
*   Goal Node G: (2,2)
*   Obstacle: (1,1) (cannot be traversed)
*   Movement Cost: 1 per step
*   Heuristic $h(n)$: Manhattan Distance to (2,2) (same as Example 1)

**Heuristic Values (Manhattan distance to (2,2)):**
*   h(0,0) = 4
*   h(1,0) = 3
*   h(2,0) = 2
*   h(0,1) = 3
*   h(1,1) = (Obstacle)
*   h(2,1) = 1
*   h(0,2) = 2
*   h(1,2) = 1
*   h(2,2) = 0

---

**Step-by-step Execution:**

**Initialization:**
*   `open_list`: Empty
*   `closed_list`: Empty
*   `g_scores`: All $\infty$ except $g(0,0) = 0$
*   `f_scores`: All $\infty$ except $f(0,0) = 0 + 4 = 4$
*   `parents`: Empty

Add S=(0,0) to `open_list` with $f=4$.
`open_list`: `[( (0,0), f=4 )]`

---

**Iteration 1:**
*   **Pop:** `(0,0)` (f=4). Add to `closed_list`.
*   **Neighbors:** `(1,0)` and `(0,1)`.
    *   `(1,0)`: $g=1, h=3, f=4$. Parent `(0,0)`. Add to `open_list`.
    *   `(0,1)`: $g=1, h=3, f=4$. Parent `(0,0)`. Add to `open_list`.
`open_list`: `[( (1,0), f=4 ), ( (0,1), f=4 )]`
`closed_list`: `[(0,0)]`

---

**Iteration 2:** (Pop `(1,0)`)
*   **Pop:** `(1,0)` (f=4). Add to `closed_list`.
*   **Neighbors:** `(0,0)` (closed), `(2,0)`, `(1,1)` (obstacle).
    *   `(2,0)`: $g=g(1,0)+1 = 1+1=2$. $h=2$. $f=2+2=4$. Parent `(1,0)`. Add to `open_list`.
    *   `(1,1)`: **Obstacle. Ignore.**
`open_list`: `[( (0,1), f=4 ), ( (2,0), f=4 )]`
`closed_list`: `[(0,0), (1,0)]`

---

**Iteration 3:** (Pop `(0,1)`)
*   **Pop:** `(0,1)` (f=4). Add to `closed_list`.
*   **Neighbors:** `(0,0)` (closed), `(0,2)`, `(1,1)` (obstacle).
    *   `(0,2)`: $g=g(0,1)+1 = 1+1=2$. $h=2$. $f=2+2=4$. Parent `(0,1)`. Add to `open_list`.
    *   `(1,1)`: **Obstacle. Ignore.**
`open_list`: `[( (2,0), f=4 ), ( (0,2), f=4 )]`
`closed_list`: `[(0,0), (1,0), (0,1)]`

---

**Iteration 4:** (Pop `(2,0)`)
*   **Pop:** `(2,0)` (f=4). Add to `closed_list`.
*   **Neighbors:** `(1,0)` (closed), `(2,1)`.
    *   `(2,1)`: $g=g(2,0)+1 = 2+1=3$. $h=1$. $f=3+1=4$. Parent `(2,0)`. Add to `open_list`.
`open_list`: `[( (0,2), f=4 ), ( (2,1), f=4 )]`
`closed_list`: `[(0,0), (1,0), (0,1), (2,0)]`

---

**Iteration 5:** (Pop `(0,2)`)
*   **Pop:** `(0,2)` (f=4). Add to `closed_list`.
*   **Neighbors:** `(0,1)` (closed), `(1,2)`.
    *   `(1,2)`: $g=g(0,2)+1 = 2+1=3$. $h=1$. $f=3+1=4$. Parent `(0,2)`. Add to `open_list`.
`open_list`: `[( (2,1), f=4 ), ( (1,2), f=4 )]`
`closed_list`: `[(0,0), (1,0), (0,1), (2,0), (0,2)]`

---

**Iteration 6:** (Pop `(2,1)`)
*   **Pop:** `(2,1)` (f=4). Add to `closed_list`.
*   **Neighbors:** `(2,0)` (closed), `(1,1)` (obstacle), `(2,2)` (Goal!).
    *   `(2,2)`: $g=g(2,1)+1 = 3+1=4$. $h=0$. $f=4+0=4$. Parent `(2,1)`. Add to `open_list`.
`open_list`: `[( (1,2), f=4 ), ( (2,2), f=4 )]`
`closed_list`: `[(0,0), (1,0), (0,1), (2,0), (0,2), (2,1)]`

---

**Iteration 7:** (Pop `(1,2)`)
*   **Pop:** `(1,2)` (f=4). Add to `closed_list`.
*   **Neighbors:** `(0,2)` (closed), `(1,1)` (obstacle), `(2,2)` (Goal!).
    *   `(2,2)`: `g_tentative = g(1,2)+1 = 3+1=4`. Current `g(2,2)` is 4. `4` is not less than `4`. No update to `g(2,2)` or its parent.
`open_list`: `[( (2,2), f=4 )]`
`closed_list`: `[(0,0), (1,0), (0,1), (2,0), (0,2), (2,1), (1,2)]`

---

**Iteration 8:**
*   **Pop:** `(2,2)` (f=4). Add to `closed_list`.
*   **Goal Check:** `(2,2)` IS THE GOAL NODE!

**Path Reconstruction:**
Start from Goal `(2,2)` and backtrack using parent pointers:
*   `(2,2)` parent is `(2,1)`
*   `(2,1)` parent is `(2,0)`
*   `(2,0)` parent is `(1,0)`
*   `(1,0)` parent is `(0,0)` (Start!)

**Final Answer:**
The optimal path is: **(0,0) -> (1,0) -> (2,0) -> (2,1) -> (2,2)**
The total cost $g(\text{Goal})$ is **4**.

**Reflection:** The obstacle at (1,1) prevented the algorithm from considering paths directly through it. Notice that `(1,1)` was never added to the `open_list` as a valid neighbor. The algorithm still found the optimal path, which in this case was the same as the obstacle-free path. This demonstrates how A* naturally handles obstacles by simply not considering them as valid nodes to traverse.

---

### Example 3: Weighted Graph with Admissible Heuristic (Non-Grid)

**Problem:** Find the shortest path from S to G in the following directed graph. Edge weights are given. Heuristic values $h(n)$ are provided.

```text
Nodes: S, A, B, C, D, G
Edges:
S -> A (cost 1)
S -> B (cost 4)
A -> C (cost 2)
B -> C (cost 1)
C -> D (cost 3)
C -> G (cost 6)
D -> G (cost 1)

Heuristic values h(n) to G:
h(S) = 7
h(A) = 6
h(B) = 3
h(C) = 4
h(D) = 1
h(G) = 0
```

**Given:**
*   Directed graph with specified edges and costs.
*   Start Node S.
*   Goal Node G.
*   Heuristic values $h(n)$ for all nodes.

**What we want:** The optimal path from S to G.

**Check Admissibility:** (Is $h(n) \le h^*(n)$?)
*   $h^*(S)$: Path S->A->C->D->G = 1+2+3+1 = 7. Path S->B->C->D->G = 4+1+3+1 = 9. Path S->A->C->G = 1+2+6 = 9. Path S->B->C->G = 4+1+6 = 11. So, $h^*(S) = 7$. $h(S)=7$. $7 \le 7$. (Admissible)
*   $h^*(A)$: Path A->C->D->G = 2+3+1 = 6. Path A->C->G = 2+6 = 8. So, $h^*(A) = 6$. $h(A)=6$. $6 \le 6$. (Admissible)
*   $h^*(B)$: Path B->C->D->G = 1+3+1 = 5. Path B->C->G = 1+6 = 7. So, $h^*(B) = 5$. $h(B)=3$. $3 \le 5$. (Admissible)
*   $h^*(C)$: Path C->D->G = 3+1 = 4. Path C->G = 6. So, $h^*(C) = 4$. $h(C)=4$. $4 \le 4$. (Admissible)
*   $h^*(D)$: Path D->G = 1. So, $h^*(D) = 1$. $h(D)=1$. $1 \le 1$. (Admissible)
All heuristics are admissible.

**Check Consistency:** (Is $h(n) \le \text{cost}(n, n') + h(n')$?)
*   S -> A: $h(S)=7$, $\text{cost}(S,A)=1$, $h(A)=6$. $7 \le 1+6 \Rightarrow 7 \le 7$. (Consistent)
*   S -> B: $h(S)=7$, $\text{cost}(S,B)=4$, $h(B)=3$. $7 \le 4+3 \Rightarrow 7 \le 7$. (Consistent)
*   A -> C: $h(A)=6$, $\text{cost}(A,C)=2$, $h(C)=4$. $6 \le 2+4 \Rightarrow 6 \le 6$. (Consistent)
*   B -> C: $h(B)=3$, $\text{cost}(B,C)=1$, $h(C)=4$. $3 \le 1+4 \Rightarrow 3 \le 5$. (Consistent)
*   C -> D: $h(C)=4$, $\text{cost}(C,D)=3$, $h(D)=1$. $4 \le 3+1 \Rightarrow 4 \le 4$. (Consistent)
*   C -> G: $h(C)=4$, $\text{cost}(C,G)=6$, $h(G)=0$. $4 \le 6+0 \Rightarrow 4 \le 6$. (Consistent)
*   D -> G: $h(D)=1$, $\text{cost}(D,G)=1$, $h(G)=0$. $1 \le 1+0 \Rightarrow 1 \le 1$. (Consistent)
All heuristics are consistent. This means A* will be efficient and find the optimal path.

---

**Step-by-step Execution:**

**Initialization:**
*   `open_list`: Empty
*   `closed_list`: Empty
*   `g_scores`: All $\infty$ except $g(S) = 0$
*   `f_scores`: All $\infty$ except $f(S) = g(S) + h(S) = 0 + 7 = 7$
*   `parents`: Empty

Add S to `open_list` with $f=7$.
`open_list`: `[( S, f=7 )]`

---

**Iteration 1:**
*   **Pop:** `S` (f=7). Add to `closed_list`.
    *   `current = S`, `g(S)=0`, `h(S)=7`, `f(S)=7`
*   **Neighbors of S:**
    *   `A`:
        *   `g_tentative = g(S) + cost(S,A) = 0 + 1 = 1`.
        *   Update `g(A)=1`. `h(A)=6`. `f(A)=1+6=7`. Parent `S`. Add `A` to `open_list`.
    *   `B`:
        *   `g_tentative = g(S) + cost(S,B) = 0 + 4 = 4`.
        *   Update `g(B)=4`. `h(B)=3`. `f(B)=4+3=7`. Parent `S`. Add `B` to `open_list`.
`open_list`: `[( A, f=7 ), ( B, f=7 )]`
`closed_list`: `[S]`

---

**Iteration 2:** (Pop `A` due to tie-breaking)
*   **Pop:** `A` (f=7). Add to `closed_list`.
    *   `current = A`, `g(A)=1`, `h(A)=6`, `f(A)=7`
*   **Neighbors of A:**
    *   `C`:
        *   `g_tentative = g(A) + cost(A,C) = 1 + 2 = 3`.
        *   Update `g(C)=3`. `h(C)=4`. `f(C)=3+4=7`. Parent `A`. Add `C` to `open_list`.
`open_list`: `[( B, f=7 ), ( C, f=7 )]`
`closed_list`: `[S, A]`

---

**Iteration 3:** (Pop `B`)
*   **Pop:** `B` (f=7). Add to `closed_list`.
    *   `current = B`, `g(B)=4`, `h(B)=3`, `f(B)=7`
*   **Neighbors of B:**
    *   `C`:
        *   `g_tentative = g(B) + cost(B,C) = 4 + 1 = 5`.
        *   Current `g(C)` is `3`. `5` is NOT less than `3`. No update to `g(C)` or its parent. This is important: the path S->A->C (cost 3) is better than S->B->C (cost 5).
`open_list`: `[( C, f=7 )]`
`closed_list`: `[S, A, B]`

---

**Iteration 4:** (Pop `C`)
*   **Pop:** `C` (f=7). Add to `closed_list`.
    *   `current = C`, `g(C)=3`, `h(C)=4`, `f(C)=7`
*   **Neighbors of C:**
    *   `D`:
        *   `g_tentative = g(C) + cost(C,D) = 3 + 3 = 6`.
        *   Update `g(D)=6`. `h(D)=1`. `f(D)=6+1=7`. Parent `C`. Add `D` to `open_list`.
    *   `G`: (Goal!)
        *   `g_tentative = g(C) + cost(C,G) = 3 + 6 = 9`.
        *   Update `g(G)=9`. `h(G)=0`. `f(G)=9+0=9`. Parent `C`. Add `G` to `open_list`.
`open_list`: `[( D, f=7 ), ( G, f=9 )]`
`closed_list`: `[S, A, B, C]`

---

**Iteration 5:** (Pop `D` because $f(D)=7$ is less than $f(G)=9$)
*   **Pop:** `D` (f=7). Add to `closed_list`.
    *   `current = D`, `g(D)=6`, `h(D)=1`, `f(D)=7`
*   **Neighbors of D:**
    *   `G`: (Goal!)
        *   `g_tentative = g(D) + cost(D,G) = 6 + 1 = 7`.
        *   Current `g(G)` is `9`. `7` IS less than `9`. Update `g(G)=7`.
        *   `h(G)=0`. `f(G)=7+0=7`. **Update parent of G to D**.
        *   (G is already in open list, its priority is updated).
`open_list`: `[( G, f=7 )]` (G's f-score changed from 9 to 7)
`closed_list`: `[S, A, B, C, D]`

---

**Iteration 6:** (Pop `G`)
*   **Pop:** `G` (f=7). Add to `closed_list`.
    *   `current = G`, `g(G)=7`, `h(G)=0`, `f(G)=7`
*   **Goal Check:** `G` IS THE GOAL NODE!

**Path Reconstruction:**
Start from Goal `G` and backtrack using parent pointers:
*   `G` parent is `D`
*   `D` parent is `C`
*   `C` parent is `A`
*   `A` parent is `S` (Start!)

**Final Answer:**
The optimal path is: **S -> A -> C -> D -> G**
The total cost $g(\text{Goal})$ is **7**.

**Reflection:** This example highlights how A* uses the heuristic to guide its search. Even though `G` was discovered earlier via `C` (path S->A->C->G with cost 9), its $f$-score was 9, which was higher than `D`'s $f$-score of 7. A* correctly prioritized exploring `D` first, which led to discovering the shorter path S->A->C->D->G with a total cost of 7. The consistency of the heuristic ensured that `G`'s $g$-score was correctly updated when a shorter path was found, and because it was consistent, we didn't need to reopen `C` or `A`.

---

### Example 4: The Impact of a Non-Admissible Heuristic

**Problem:** Find the shortest path from S to G in the same graph as Example 3, but with a *non-admissible* heuristic.

```text
Nodes: S, A, B, C, D, G
Edges: (same as Ex 3)
S -> A (cost 1)
S -> B (cost 4)
A -> C (cost 2)
B -> C (cost 1)
C -> D (cost 3)
C -> G (cost 6)
D -> G (cost 1)

**NON-ADMISSIBLE** Heuristic values h(n) to G:
h(S) = 7
h(A) = **8** (Overestimates $h^*(A)=6$)
h(B) = 3
h(C) = 4
h(D) = 1
h(G) = 0
```

**Given:**
*   Directed graph (same as Ex 3).
*   Start Node S, Goal Node G.
*   **Non-admissible** heuristic values $h(n)$.

**What we want:** The path from S to G found by A* (it might not be optimal).

**Check Admissibility:**
*   $h(A)=8$. True optimal $h^*(A)=6$. Since $8 > 6$, this heuristic is **NOT ADMISSIBLE**.

---

**Step-by-step Execution:**

**Initialization:**
*   `open_list`: Empty
*   `closed_list`: Empty
*   `g_scores`: All $\infty$ except $g(S) = 0$
*   `f_scores`: All $\infty$ except $f(S) = g(S) + h(S) = 0 + 7 = 7$
*   `parents`: Empty

Add S to `open_list` with $f=7$.
`open_list`: `[( S, f=7 )]`

---

**Iteration 1:**
*   **Pop:** `S` (f=7). Add to `closed_list`.
*   **Neighbors of S:**
    *   `A`:
        *   `g_tentative = g(S) + cost(S,A) = 0 + 1 = 1`.
        *   Update `g(A)=1`. `h(A)=8`. `f(A)=1+8=9`. Parent `S`. Add `A` to `open_list`.
    *   `B`:
        *   `g_tentative = g(S) + cost(S,B) = 0 + 4 = 4`.
        *   Update `g(B)=4`. `h(B)=3`. `f(B)=4+3=7`. Parent `S`. Add `B` to `open_list`.
`open_list`: `[( B, f=7 ), ( A, f=9 )]` (B is prioritized over A now)
`closed_list`: `[S]`

---

**Iteration 2:** (Pop `B` because $f(B)=7$ is lower than $f(A)=9$)
*   **Pop:** `B` (f=7). Add to `closed_list`.
    *   `current = B`, `g(B)=4`, `h(B)=3`, `f(B)=7`
*   **Neighbors of B:**
    *   `C`:
        *   `g_tentative = g(B) + cost(B,C) = 4 + 1 = 5`.
        *   Update `g(C)=5`. `h(C)=4`. `f(C)=5+4=9`. Parent `B`. Add `C` to `open_list`.
`open_list`: `[( A, f=9 ), ( C, f=9 )]`
`closed_list`: `[S, B]`

---

**Iteration 3:** (Pop `A` due to tie-breaking, or `C` if tie-breaking is different)
*   **Pop:** `A` (f=9). Add to `closed_list`.
    *   `current = A`, `g(A)=1`, `h(A)=8`, `f(A)=9`
*   **Neighbors of A:**
    *   `C`:
        *   `g_tentative = g(A) + cost(A,C) = 1 + 2 = 3`.
        *   Current `g(C)` is `5`. `3` IS less than `5`. Update `g(C)=3`.
        *   `h(C)=4`. `f(C)=3+4=7`. **Update parent of C to A**.
        *   (C is already in open list, its priority is updated to $f=7$).
`open_list`: `[( C, f=7 )]` (C's f-score changed from 9 to 7, making it the highest priority)
`closed_list`: `[S, B, A]`

---

**Iteration 4:** (Pop `C`)
*   **Pop:** `C` (f=7). Add to `closed_list`.
    *   `current = C`, `g(C)=3`, `h(C)=4`, `f(C)=7`
*   **Neighbors of C:**
    *   `D`:
        *   `g_tentative = g(C) + cost(C,D) = 3 + 3 = 6`.
        *   Update `g(D)=6`. `h(D)=1`. `f(D)=6+1=7`. Parent `C`. Add `D` to `open_list`.
    *   `G`: (Goal!)
        *   `g_tentative = g(C) + cost(C,G) = 3 + 6 = 9`.
        *   Update `g(G)=9`. `h(G)=0`. `f(G)=9+0=9`. Parent `C`. Add `G` to `open_list`.
`open_list`: `[( D, f=7 ), ( G, f=9 )]`
`closed_list`: `[S, B, A, C]`

---

**Iteration 5:** (Pop `D`)
*   **Pop:** `D` (f=7). Add to `closed_list`.
*   **Neighbors of D:**
    *   `G`: (Goal!)
        *   `g_tentative = g(D) + cost(D,G) = 6 + 1 = 7`.
        *   Current `g(G)` is `9`. `7` IS less than `9`.