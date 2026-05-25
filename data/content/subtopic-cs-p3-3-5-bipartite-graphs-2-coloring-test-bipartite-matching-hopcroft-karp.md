## What it is
A bipartite graph is a graph whose vertices can be divided into two disjoint and independent sets, $U$ and $V$, such that every edge connects a vertex in $U$ to one in $V$. A bipartite matching is a subset of the edges where no two edges share a common vertex, and the goal is often to find a *maximum matching*—the largest such subset. The Hopcroft-Karp algorithm is an efficient method for finding a maximum matching in a bipartite graph.

## Why it matters
Bipartite matching is the foundation for solving optimal assignment problems. This appears in scheduling pilots to flights in aerospace, assigning tasks to processors in distributed computing, or modeling particle interactions where one class of particle only interacts with another. In machine learning, it's used in recommendation systems to match users to items they are most likely to prefer.

## When to study it
Before tackling this, you must be fluent with basic graph theory: what vertices, edges, and paths are. You must also have a solid understanding of graph traversal algorithms, specifically Breadth-First Search (BFS) and Depth-First Search (DFS), as both are used to implement the tests and algorithms discussed here. Familiarity with the concept of augmenting paths from the max-flow min-cut theorem is helpful but not strictly necessary, as we will re-introduce the idea.

## How to study it (step by step)
1.  **Define Bipartite:** Start with the formal definition. Draw several graphs and try to partition their vertices into two sets $U$ and $V$ such that no edge connects two vertices within the same set. Develop an intuition for what such a graph "looks like".
2.  **Derive the 2-Coloring Test:** Understand that the two sets $U$ and $V$ can be thought of as two "colors" (e.g., red and black). Prove to yourself that a graph is bipartite if and only if it can be colored with two colors. Use this idea to build a testing algorithm using BFS or DFS.
3.  **Connect to Odd-Length Cycles:** Prove the key theorem: a graph is bipartite if and only if it contains no odd-length cycles. This is the formal underpinning of the 2-coloring test. When your BFS/DFS traversal finds an edge back to a vertex of the same color, you've found an odd-length cycle.
4.  **Define Matching:** Understand the concepts of matching, maximal matching, and maximum matching. A maximal matching is one where you can't add any more edges. A maximum matching is the largest possible matching. Realize that a maximal matching is not always maximum.
5.  **Learn Augmenting Paths:** Study the concept of an "augmenting path" relative to a given matching $M$. This is a path that alternates between edges not in $M$ and edges in $M$, starting and ending with unmatched vertices. Understand Berge's theorem: a matching is maximum if and only if it has no augmenting path.
6.  **Understand Hopcroft-Karp:** Grasp the high-level idea of the Hopcroft-Karp algorithm. It repeatedly finds a *maximal set of shortest vertex-disjoint augmenting paths* in phases. This "batch processing" of paths is why it's faster ($O(E\sqrt{V})$) than finding one path at a time ($O(VE)$).

## Key ideas, with intuition
1.  **The Two-Team Rule:** The core intuition of a bipartite graph is that you can split all the players (vertices) into two teams ($U$ and $V$) where interactions (edges) only happen *between* teams, never *within* a team. Any attempt to draw an edge between two members of the same team violates the rule.

2.  **Odd Cycles are the Enemy:** Why are odd-length cycles a problem? Imagine a 3-cycle (a triangle) with vertices $v_1, v_2, v_3$. If you color $v_1$ red, then $v_2$ must be black. This forces $v_3$ to be red. But there's an edge between $v_3$ and $v_1$, which are both red. This violates the two-team rule. This logic extends to any cycle of odd length.
    $$ G \text{ is bipartite} \iff G \text{ has no odd-length cycles} $$

3.  **The 2-Coloring Test (via BFS):** This is the practical application of the odd-cycle idea. Start a BFS from an arbitrary uncolored vertex and color it red. All its neighbors must be colored black. All of their uncolored neighbors must be colored red, and so on. If you ever find an edge connecting two vertices that have already been assigned the same color, you have found an odd cycle and the graph is not bipartite.

4.  **Augmenting Paths Improve the Matching:** Given a matching $M$, an augmenting path is a "secret weapon" to increase its size. It's a path that starts at an unmatched vertex in $U$, ends at an unmatched vertex in $V$, and alternates between edges not in $M$ and edges in $M$. If we find one, we can "flip" the edges along the path (add the unmatched edges to $M$, remove the matched ones). The new matching $M'$ will have exactly one more edge than $M$.
    $$ |M'| = |M| + 1 $$

5.  **Hopcroft-Karp is Batch Augmentation:** Finding one augmenting path at a time is slow. Hopcroft-Karp is a more sophisticated approach. In each phase, it uses BFS to find the length of the *shortest possible* augmenting paths. Then, it uses DFS to find as many vertex-disjoint augmenting paths of that specific length as it can in one go. By dealing with multiple paths at once, it reaches the maximum matching much faster.

## Worked example
**Problem:** Find the maximum matching for the bipartite graph below.

**Graph:**
Vertices $U = \{1, 2, 3, 4\}$, $V = \{A, B, C, D\}$.
Edges $E = \{(1,A), (1,B), (2,A), (3,B), (3,C), (4,C), (4,D)\}$.

**Step 1: Start with an empty matching $M_0$.**
$M_0 = \emptyset$. All vertices are unmatched.

**Step 2: Find an augmenting path.**
An augmenting path must start and end at unmatched vertices. A simple one is $2 - A - 1 - B$.
*   Vertices $2$ and $B$ are unmatched.
*   Edge $(2,A)$ is not in $M_0$.
*   Edge $(A,1)$ is not in $M_0$ (we need an alternating path, let's find a better one).

Let's retry finding an augmenting path.
Path 1: $2 - A$. This path starts and ends with unmatched vertices. We can augment along it.
Let's define our matching based on this.
$M_1 = \{(2,A)\}$. Now 2 and A are matched.

**Step 3: Find another augmenting path relative to $M_1$.**
Unmatched vertices: $U' = \{1, 3, 4\}$, $V' = \{B, C, D\}$.
Let's search for a path from $U'$ to $V'$.
Path 2: $1 - B$. This is a simple augmenting path. Let's augment.
$M_2 = M_1 \cup \{(1,B)\} = \{(2,A), (1,B)\}$.

**Step 4: Find another augmenting path relative to $M_2$.**
Unmatched vertices: $U'' = \{3, 4\}$, $V'' = \{C, D\}$.
Let's search.
Path 3: $3 - C - 4 - D$.
*   $3$ and $D$ are unmatched.
*   Edge $(3,C)$ is not in $M_2$.
*   Edge $(C,4)$ is not in $M_2$.
*   This is an alternating path: (not in M), (in M), (not in M)... Let's trace it carefully.
*   The path is $3 - C - 4 - D$. Wait, there is no edge $(C,4)$. The edge is $(4,C)$.
*   Let's find a correct alternating path.
*   Path: $3 - B - 1 - A - 2$. This path ends in a matched vertex (2). Not an augmenting path.
*   Path: $3 - C$. This is a simple augmenting path. Let's add it.
$M_3 = M_2 \cup \{(3,C)\} = \{(2,A), (1,B), (3,C)\}$.

**Step 5: Find another augmenting path relative to $M_3$.**
Unmatched vertices: $U''' = \{4\}$, $V''' = \{D\}$.
Let's search from vertex 4.
Path 4: $4 - D$. This is a simple augmenting path.
$M_4 = M_3 \cup \{(4,D)\} = \{(2,A), (1,B), (3,C), (4,D)\}$.

**Step 6: Search for any more augmenting paths.**
All vertices are now matched. A matching that includes all vertices is called a *perfect matching*. A perfect matching is always a maximum matching. Therefore, we can't find any more augmenting paths because there are no unmatched vertices to start/end from.

**Final Answer:** The maximum matching is $M = \{(1,B), (2,A), (3,C), (4,D)\}$, with size 4.

**Reflection:** Each step involved finding a valid augmenting path—a path alternating between non-matching and matching edges, starting and ending with free vertices. By "flipping" the status of edges along this path, we increased the matching size by one. We stopped when no such paths could be found, which by Berge's theorem guarantees the matching is maximum. Hopcroft-Karp would have found all paths of length 1 (like $(2,A), (1,B), ...$) in one phase, then moved to longer paths if necessary.

## Diagrams
A bipartite graph with sets U and V.

```text
  U            V
-----        -----
(1)----------(A)
 | \        /
 |  \      /
 |   \    /
 |    \--/---(B)
 |       \   /
 |        \ /
(2)--------X
           |
(3)--------(C)
 |         / \
 |        /   \
(4)------/----(D)
```

The maximum matching found in the worked example. Matched edges are marked with `==`.

```text
  U            V
-----        -----
(1)----------(A)
   \        //
    \      //
     \    //
      \--//---(B)
         \\
          \\
(2)========\\
           |
(3)========(C)
 |         / \
 |        /   \
(4)------/====(D)
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Think of a high school dance. The vertices are students, split into two groups, $U$ and $V$ (e.g., "Juniors" and "Seniors"). The rule (bipartite) is that a Junior can only dance with a Senior. An "odd cycle" would be like "Alice (J) dances with Bob (S), who dances with Carol (J)..." which is impossible if Carol also has to dance with Alice. A "matching" is a set of dance partners with no one dancing with two people. An "augmenting path" is a chain of students where you can create a new pairing: "Unmatched Junior asks out a Senior, whose current partner then asks out another Junior... ending with an unmatched Senior." This chain reaction creates one extra happy couple (a larger matching).

2.  **Must-Memorize Facts:**
    *   A graph $G$ is bipartite $\iff$ it has no odd-length cycles.
    *   A matching $M$ is maximum $\iff$ there is no $M$-augmenting path.
    *   Hopcroft-Karp Complexity: $O(E\sqrt{V})$

3.  **Spaced Repetition Schedule:** Review this material in 1 day, 3 days, 7 days, 16 days, and 35 days. Each time, try to re-derive the 2-coloring test from BFS and explain why an augmenting path increases matching size.

4.  **First Principles Pathway:** If you forget everything, rebuild from this:
    *   **Bipartite Test:** Start at any vertex, color it 'A'. Use BFS. Color all its neighbors 'B'. Color their uncolored neighbors 'A'. If you ever find an edge connecting two vertices that are already the same color, it's not bipartite. Why? Because you've just found a path from the source to each vertex, and the path lengths differ by an even number, but an edge connects them, creating an odd cycle.
    *   **Maximum Matching:** Start with any matching. Look for a path from an unmatched vertex to another unmatched vertex, alternating edges `not-in-matching`, `in-matching`, ... If you find one, flip the edges on the path to get a bigger matching. Repeat until you can't find any. This is the core logic of all matching algorithms.

## Common mistakes
1.  **Assuming a graph is bipartite.** Always run the 2-coloring test first if the problem doesn't guarantee it. A non-bipartite graph has no such partition, and these matching algorithms do not apply.
2.  **Stopping at a maximal matching.** A maximal matching (can't add any more edges) is not necessarily a maximum matching (the largest possible). The augmenting path method is required to guarantee a maximum matching.
3.  **Incorrectly identifying an augmenting path.** Remember the strict alternating pattern (not-in-M, in-M, not-in-M, ...) and that it must start and end with *unmatched* vertices.
4.  **Implementing Hopcroft-Karp when a simpler algorithm suffices.** For programming contests or simple problems, a standard augmenting path search using BFS/DFS (effectively Ford-Fulkerson on the corresponding flow network) is $O(VE)$, easier to code, and often fast enough. Hopcroft-Karp's complexity is mainly of theoretical importance or for very large, dense graphs.

## Self-check
1.  Is the complete graph $K_5$ (5 vertices, all connected to each other) bipartite? Justify your answer using the odd-cycle theorem.
2.  Given the bipartite graph $U=\{1,2,3\}, V=\{A,B,C\}$ with edges $E = \{(1,A), (1,B), (2,B), (2,C), (3,A)\}$, find a maximum matching. What is its size? Is it a perfect matching?
3.  Consider a matching $M$ in a bipartite graph $G$. If we find two different shortest augmenting paths, $P_1$ and $P_2$, both of length $k$. If $P_1$ and $P_2$ share a vertex, can we always augment the matching along both paths simultaneously? Why or why not?