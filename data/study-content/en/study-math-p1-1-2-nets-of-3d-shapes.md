## 1. The one-sentence answer
A **net** of a three-dimensional polyhedron is a connected, edge-to-edge arrangement of its faces in the plane that folds into the polyhedron without overlaps or gaps.

Imagine slicing every edge of a cardboard box except those needed to keep the faces attached, then flattening the box into a single sheet. The resulting pattern is a net. Each face remains a rigid polygon, and the shared edges become the fold lines that reconstruct the original solid when lifted out of the plane. Because the faces must meet exactly along their boundaries and cover the surface once, any gap or overlap in the plane prevents the pattern from forming a closed shape.

The same polyhedron can have multiple distinct nets. A cube, for instance, admits eleven different nets. The variety arises from the different sequences in which the six squares can be attached while remaining connected and non-overlapping.

> [!NOTE]
> The decisive insight is that a net encodes the entire surface connectivity of the polyhedron in two dimensions; once the correct edges are identified as hinges, three-dimensional closure is automatic.

## 2. Why this matters — concrete and current
Packaging engineers at companies such as WestRock and DS Smith generate nets algorithmically to minimise cardboard waste when producing the millions of shipping boxes used daily by Amazon and other retailers; each net must fold into a rectangular prism with precise glue flaps while using the least material.

Architectural model makers and aerospace firms such as Lockheed Martin print unfolded nets of complex polyhedral components so that flat composite sheets can be cut, folded, and assembled into lightweight satellite brackets whose surface areas and joint angles are known exactly before fabrication.

In computational geometry, algorithms that compute surface unfoldings are used by 3-D printing slicers and by molecular-visualisation software such as PyMOL to produce printable models of protein surfaces, which are treated as polyhedra whose nets allow flat diagrams of curved molecular interfaces.

Video-game studios rely on UV-unwrapping techniques that are mathematically identical to net construction; the resulting 2-D layouts determine how texture pixels are mapped onto 3-D character meshes without distortion along seams.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Polygon                  | Every face of the polyhedron is a polygon that appears unchanged in the net. |
| Edge identification      | Nets are assembled by attaching polygons only along edges that exist in the 3-D shape. |
| Connectivity             | The net must remain a single connected piece; disconnected pieces cannot fold into one solid. |
| Planar non-overlap       | Faces must lie flat without interior intersections so that folding produces a manifold surface. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Faces remain rigid polygons
A net is assembled from the actual faces of the polyhedron; each face keeps its shape and size.

Consider a cube. Each of its six faces is a square of side length \(a\). In any net these six squares appear with the same side length \(a\).

Formally, if \(F\) is the set of faces of a polyhedron \(P\), then a net realises a collection of congruent copies of the polygons in \(F\).

> [!WARNING]
> Replacing a square face with a rectangle of different aspect ratio immediately produces a pattern that cannot close into the original cube.

### Step 2 — Attachments occur only along existing edges
Two polygons in the net may share a side only if that side corresponds to an actual edge of the polyhedron.

A cube has twelve edges. Each internal segment in the net represents one of these twelve edges and will become a hinge.

Formally, the dual graph of the net must be a spanning tree of the dual graph of the polyhedron.

> [!WARNING]
> Attaching two squares along a length that does not match any edge length of the polyhedron creates a fold that has no counterpart in 3-D space.

### Step 3 — The arrangement must be connected and acyclic in the dual sense
The polygons must form a single connected region, and their dual graph must contain no cycles.

A cycle in the dual graph would imply a closed loop of faces that cannot lie flat without enclosing volume prematurely.

Formally, a net corresponds to a spanning tree of the face-adjacency graph of the polyhedron.

> [!WARNING]
> Introducing a cycle produces an overlapping or self-intersecting region when the pattern is laid flat.

### Step 4 — No interior overlaps are permitted
When the polygons are placed in the plane, their interiors must be disjoint.

Overlapping interiors would require two distinct surface patches to occupy the same planar region, which is impossible.

Formally, the union of the polygons in the net is a simply-connected polygonal region whose boundary consists of edges that will be identified in pairs during folding.

> [!WARNING]
> Even a small overlap of two squares renders the pattern invalid; folding forces material to occupy the same space.

### Step 5 — The pattern must fold to the original polyhedron
When the internal segments are folded by the correct dihedral angles, every pair of boundary edges that correspond to the same 3-D edge must meet exactly, and the resulting solid must be homeomorphic to the original polyhedron.

This final closure condition distinguishes a valid net from a merely non-overlapping unfolding.

Formally, the net, together with the identification of its boundary edges according to the polyhedron’s edge pairing, realises a metric on the surface that matches the intrinsic geometry of \(P\).

## 5. Worked examples — every step shown

**Example 1 — Single valid net of a unit cube**  
*Given:* Six unit squares.  
*Find:* One connected, non-overlapping arrangement that folds into a cube.  

Place one square. Attach a second square to its right edge. Attach a third square above the second. Attach a fourth square to the right of the third. Attach a fifth square below the first. Attach the sixth square below the fifth.  

The dual graph is a path of length five, hence a tree. No interiors intersect. Folding the four equatorial squares upward and the top and bottom squares inward closes the cube.  

**Final answer**  
The classic “zigzag” or “cross” net with four squares in a row and one square attached above and below the second square.

*Reflection*  
The example is easy because the tree structure is linear; the same principle scales to any tree of six squares.

**Example 2 — An invalid net of a cube**  
*Given:* Six unit squares arranged as a 3-by-2 rectangle.  
*Find:* Verify validity.  

The dual graph contains a 4-cycle. When folded, the four central squares attempt to occupy the same four side positions while the top and bottom squares collide.  

**Final answer**  
Invalid; overlaps appear upon attempted closure.

*Reflection*  
A rectangular block always contains cycles; only tree-like arrangements survive.

**Example 3 — Net of a square pyramid**  
*Given:* One square base and four congruent isosceles triangles.  
*Find:* A valid net.  

Place the square. Attach one triangle to each of the four sides of the square.  

The four triangles lie adjacent; their lateral edges will meet when folded upward. No overlaps occur provided the apex angle permits the triangles to meet without gap or overlap.  

**Final answer**  
A central square with four triangles forming a larger star; valid when the triangle height satisfies the closure condition.

*Reflection*  
The base must be surrounded; any triangle attached to another triangle instead of the base risks disconnection or overlap.

**Example 4 — Distinguishing two tetrahedron nets**  
*Given:* Four equilateral triangles.  
*Find:* All distinct nets up to rotation and reflection.  

Two non-congruent trees exist: a central triangle with three triangles attached to its sides (the “triakis” form), and a chain of four triangles. The chain folds correctly; the triakis form overlaps at the centre.  

**Final answer**  
Only the chain and the “branched” tree with two triangles on one side of a central edge are valid.

*Reflection*  
For any regular polyhedron the enumeration of spanning trees of the dual graph yields the complete set of nets.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Counting a 3-by-2 rectangle as a cube net | Visual symmetry misleads; cycles are overlooked     | Verify that the dual graph is acyclic                |
| Attaching faces along wrong-length edges | Ignoring metric compatibility                       | Check every shared segment against the 3-D edge lengths |
| Allowing a triangle to fold over itself   | Underestimating apex angles                         | Compute the total angle around each vertex           |
| Treating mirror-image nets as distinct    | Forgetting congruence under rotation/reflection     | Normalise each net to a canonical orientation        |
| Drawing disconnected components           | Forgetting the spanning-tree requirement            | Ensure a single path exists between any two faces    |
| Overlapping flaps in complex polyhedra    | Visualising only local attachments                  | Draw the net at actual scale and test fold on paper  |
| Assuming every tree yields a net          | Some trees still produce global overlaps            | Simulate the folding or check total curvature at vertices |

## 7. The textbook-precise statement
A net of a convex polyhedron \(P\) is a spanning tree of the dual graph of \(P\) realised in the plane so that the faces remain congruent to those of \(P\) and their interiors are pairwise disjoint. When the tree edges are folded by the exterior dihedral angles of \(P\), the boundary edges are identified in pairs to reconstruct the 1-skeleton of \(P\). (See O’Rourke, *Geometric Folding Algorithms*, Cambridge University Press, 2007, §6.2.)

## 8. Visual — diagram or schematic
```text
          ┌───┐
          │   │   ← top face
      ┌───┼───┼───┐
      │   │   │   │   ← four side faces in a row
      └───┼───┼───┘
          │   │   ← bottom face attached to the second square
          └───┘
```
Labelled edges: each internal horizontal or vertical segment is a hinge; the outer perimeter consists of edges that will be taped or glued together.

## 9. The memory technique

1. **The hook** — Picture a cardboard box exploding outward into a flat cross; the arms of the cross are the faces that must later fold back together like a flower closing at dusk.
2. **What to overlearn** — A net is exactly a spanning tree of the face-adjacency graph; every valid net has \(F-1\) hinges where \(F\) is the number of faces.
3. **Spaced-repetition schedule** — Review the cube’s eleven nets at 1 day, 3 days, 7 days, 16 days, and 35 days; each session redraw one net from memory and fold it.
4. **First-principles fallback** — Rebuild the net by listing all faces, choosing any face as root, then recursively attaching adjacent faces while maintaining planarity and avoiding cycles.

## 10. What this unlocks
Mastery of nets supplies the concrete foundation for surface-area calculations, Euler’s formula derivations, and the study of polyhedral metrics.  

- Surface area of any polyhedron is obtained simply by summing the areas visible in any net.  
- Euler’s formula \(V-E+F=2\) can be verified by counting vertices, edges, and faces directly on the net before folding.  
- The theory of unfoldings extends immediately to non-convex polyhedra and to the design of origami tessellations.  
- In differential geometry the same idea appears as the development of a ruled surface or the intrinsic metric of a polyhedral manifold.

## 11. Self-check — five questions, no answers
1. Draw two distinct nets of a regular tetrahedron and prove they are incongruent.  
2. A certain arrangement of eleven squares is connected and acyclic in the dual graph yet fails to be a net of any polyhedron. What geometric obstruction must be present?  
3. Given the net of a triangular prism, compute its surface area without folding.  
4. Show that any net of a cube must contain at least one “branch point” of degree three or higher.  
5. A student claims that gluing two valid nets of a square pyramid along a triangular face produces a valid net of an octahedron. Identify the flaw in the reasoning.