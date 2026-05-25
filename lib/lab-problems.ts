import type { FieldKey } from "@/lib/types";

export interface LabProblem {
  id: string;
  topicId: string;
  topicTitle: string;
  field: FieldKey;
  title: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  kind: "derivation" | "computation" | "code" | "concept";
  language?: "python" | "cpp";
  starterCode?: string;
  prompt: string;
  hints: string[];
  solution: string;
}

export const LAB_PROBLEMS: LabProblem[] = [
  {
    id: "math-derive-quadratic",
    topicId: "math-p2-2-1-algebra-introduction-intermediate",
    topicTitle: "Algebra — Introduction & Intermediate",
    field: "math",
    title: "Derive the quadratic formula",
    difficulty: 2,
    kind: "derivation",
    prompt:
      "Starting from $ax^2 + bx + c = 0$ with $a \\neq 0$, derive the quadratic formula by completing the square. Show every step.",
    hints: [
      "Divide both sides by $a$ first.",
      "Add $(b/2a)^2$ to both sides to complete the square.",
      "Take square roots and isolate $x$.",
    ],
    solution:
      "Divide by $a$: $x^2 + (b/a)x + c/a = 0$. Move constant: $x^2 + (b/a)x = -c/a$. Add $(b/2a)^2$: $x^2 + (b/a)x + (b/2a)^2 = (b/2a)^2 - c/a$. The left side is $(x + b/2a)^2$. Right side: $(b^2 - 4ac)/(4a^2)$. Take roots: $x + b/2a = \\pm\\sqrt{b^2-4ac}/(2a)$. So $x = (-b \\pm \\sqrt{b^2-4ac})/(2a)$.",
  },
  {
    id: "calc-chain-rule",
    topicId: "math-p4-4-1-calculus-i-limits-derivatives",
    topicTitle: "Calculus I — Limits & Derivatives",
    field: "math",
    title: "Differentiate $f(x) = \\sin(x^2 e^x)$",
    difficulty: 3,
    kind: "computation",
    prompt: "Compute $f'(x)$ where $f(x) = \\sin(x^2 e^x)$. Show the application of the chain rule clearly.",
    hints: [
      "Identify the outer and inner functions.",
      "The inner function is $u = x^2 e^x$. Use the product rule for $u'$.",
      "$\\frac{d}{dx}\\sin u = \\cos u \\cdot u'$.",
    ],
    solution:
      "Let $u = x^2 e^x$. Then $u' = 2x e^x + x^2 e^x = e^x(2x + x^2)$. Therefore $f'(x) = \\cos(x^2 e^x)\\cdot e^x(2x + x^2) = e^x(2x + x^2)\\cos(x^2 e^x)$.",
  },
  {
    id: "physics-rocket-eq",
    topicId: "physics-p3-3-3-rocket-propulsion",
    topicTitle: "Rocket Propulsion",
    field: "physics",
    title: "Tsiolkovsky from first principles",
    difficulty: 4,
    kind: "derivation",
    prompt:
      "Starting from conservation of momentum for a variable-mass rocket in free space, derive the Tsiolkovsky rocket equation $\\Delta v = v_e \\ln(m_0 / m_f)$.",
    hints: [
      "Consider a rocket of mass $m$ with velocity $v$. In time $dt$ it expels mass $-dm$ at exhaust velocity $v_e$ relative to the rocket.",
      "Apply conservation of momentum to the rocket + expelled mass system.",
      "After cancellation you'll get $m\\,dv = -v_e\\,dm$. Integrate from $m_0$ to $m_f$.",
    ],
    solution:
      "Initial momentum: $mv$. After $dt$: rocket has mass $m + dm$ (with $dm < 0$) and velocity $v + dv$; expelled mass $-dm$ moves at $v - v_e$. Setting initial = final and dropping second-order terms: $m\\,dv = -v_e\\,dm$. Integrate: $\\int_0^{\\Delta v} dv = -v_e \\int_{m_0}^{m_f} dm/m$, giving $\\Delta v = v_e \\ln(m_0/m_f)$.",
  },
  {
    id: "physics-circular",
    topicId: "physics-p1-1-2-newton-s-laws-dynamics",
    topicTitle: "Newton's Laws & Dynamics",
    field: "physics",
    title: "Banked curve",
    difficulty: 2,
    kind: "concept",
    prompt:
      "A car moves at speed $v$ on a banked curve of radius $R$ inclined at angle $\\theta$. Assuming no friction, find the relation between $v$, $g$, $R$, and $\\theta$ for the car to traverse the curve without sliding.",
    hints: [
      "Draw the free-body diagram. Only normal force and gravity act.",
      "Decompose normal force into horizontal (centripetal) and vertical (balances gravity) components.",
      "Combine the two equations to eliminate $N$.",
    ],
    solution:
      "Vertical equilibrium: $N\\cos\\theta = mg$. Horizontal centripetal: $N\\sin\\theta = mv^2/R$. Dividing: $\\tan\\theta = v^2/(gR)$, so $v = \\sqrt{gR\\tan\\theta}$.",
  },
  {
    id: "cs-two-sum",
    topicId: "cs-p3-3-3-hashing",
    topicTitle: "Hashing",
    field: "cs",
    title: "Two Sum (hash table)",
    difficulty: 1,
    kind: "code",
    language: "python",
    starterCode: `def two_sum(nums: list[int], target: int) -> list[int]:
    """Return indices i, j such that nums[i] + nums[j] == target.
    Each input has exactly one solution; you may not use the same element twice.
    """
    # Your code here
    pass
`,
    prompt:
      "Given an array `nums` and an integer `target`, return the indices of the two numbers that sum to `target`. Solve in $O(n)$ using a hash table.",
    hints: [
      "Iterate once and remember each value's index.",
      "For each number $x$ at index $i$, check if $\\text{target} - x$ has been seen.",
      "When found, return the stored index and the current index.",
    ],
    solution: `def two_sum(nums, target):
    seen = {}
    for i, x in enumerate(nums):
        complement = target - x
        if complement in seen:
            return [seen[complement], i]
        seen[x] = i`,
  },
  {
    id: "cs-dijkstra",
    topicId: "cs-p3-3-5-graphs",
    topicTitle: "Graphs",
    field: "cs",
    title: "Dijkstra with binary heap",
    difficulty: 3,
    kind: "code",
    language: "python",
    starterCode: `import heapq

def dijkstra(graph: dict[int, list[tuple[int, int]]], src: int) -> dict[int, int]:
    """graph[u] = list of (v, weight). Return shortest distance from src to each node."""
    # Your code here
    pass
`,
    prompt:
      "Implement Dijkstra's algorithm using a binary heap. Return a dict mapping each node to its shortest distance from `src`. Assume non-negative weights.",
    hints: [
      "Initialize all distances to infinity except `src` which is 0.",
      "Use a min-heap of (distance, node). Pop, relax outgoing edges, push updates.",
      "Skip stale entries by comparing the popped distance to your current best for that node.",
    ],
    solution: `def dijkstra(graph, src):
    dist = {u: float('inf') for u in graph}
    dist[src] = 0
    pq = [(0, src)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, w in graph[u]:
            nd = d + w
            if nd < dist[v]:
                dist[v] = nd
                heapq.heappush(pq, (nd, v))
    return dist`,
  },
  {
    id: "cs-bigo",
    topicId: "cs-p3-3-1-complexity-analysis",
    topicTitle: "Complexity Analysis",
    field: "cs",
    title: "Big-O of mystery function",
    difficulty: 2,
    kind: "concept",
    prompt:
      "What is the time complexity of the following pseudocode in terms of $n$? Justify.\n\n```\nfor i = 1..n:\n    j = i\n    while j > 1:\n        j = j / 2\n```",
    hints: [
      "The inner loop divides $j$ by 2 each iteration — count its iterations.",
      "How many times does $j$ halve before reaching 1?",
      "Sum the inner cost over all values of $i$.",
    ],
    solution:
      "Inner loop runs $\\Theta(\\log i)$ times. Total work: $\\sum_{i=1}^{n} \\log i = \\log(n!) = \\Theta(n \\log n)$ by Stirling's approximation.",
  },
];
