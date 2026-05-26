## 1. The one-sentence answer
**A net of a 3D shape is a 2D pattern of connected polygons that folds along its edges into the surface of that 3D shape without overlaps or gaps.**

Aap jab kisi 3D object jaise cube ya pyramid ko khol kar ek flat paper pattern mein dekhna chahte hain, toh woh pattern uska net hota hai. Har face ek polygon hota hai aur shared edges fold lines ban jaati hain. Yeh pattern aapko surface area calculate karne aur manufacturing mein cutting templates banane mein madad karta hai.

Net sirf ek visual tool nahi hai; yeh prove karta hai ki 3D polyhedron ki surface topologically ek connected 2D region hai jo edge identifications ke through close hoti hai. Different nets ek hi shape ke liye possible hote hain, lekin unmein overlapping faces ya disconnected parts nahi hona chahiye.

> [!NOTE]
> The key "aha" is that every valid net must preserve the exact adjacency of faces from the 3D shape; changing which edges touch changes whether the net actually folds into the target polyhedron.

## 2. Why this matters — concrete and current
Packaging engineers at Amazon use nets to design cardboard boxes that fold from single sheets with minimal waste; the optimisation of net layouts directly reduces material cost in high-volume fulfilment centres.

In aerospace, NASA’s Jet Propulsion Laboratory unfolds solar arrays and antenna reflectors from compact nets during launch; the 2021 Perseverance rover’s radar antenna employed a precise net folding sequence to achieve a 2-metre aperture from a stowed volume smaller than a briefcase.

Additive manufacturing firms such as Stratasys slice STL models into nets for support-structure planning; the 2D net representation allows collision-free tool-path generation on the build plate before the part is reconstructed layer by layer.

Video-game engines such as Unreal Engine 5 employ net-based UV unwrapping to map 3D mesh surfaces onto texture atlases; artists edit the resulting 2D net to paint seamless textures that wrap back onto characters and environments without stretching artefacts.

Architectural firms like Foster + Partners generate net diagrams of complex façades for CNC cutting of cladding panels; each panel’s net encodes fold angles that match the building’s curvature when assembled on site.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Polygon          | Each face of the 3D shape is a polygon that appears flat in the net. |
| Edge             | Shared edges become the fold lines that must match when the net is folded. |
| Vertex           | Vertices determine how many faces meet; their arrangement prevents overlaps in the net. |
| 2D adjacency     | You must verify that faces connected in 3D remain correctly adjacent in the 2D layout. |

If any of these four ideas are unclear, pause and review the corresponding section on polygons and polyhedra before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Visualise the surface as a flat pattern
Aap ek 3D shape ki har face ko alag-alag paper pieces ki tarah sochiye aur unhe edge-to-edge chipka kar ek single flat sheet bana lijiye.  
Example: ek cube ke 6 square faces ko ek row mein chipka kar ek 1×6 rectangle ban sakta hai, lekin yeh net fold hone par overlapping ho jaayega.  
Formal statement: A net is a connected, edge-to-edge union of the faces of a polyhedron whose interior is homeomorphic to an open disk.  
> [!WARNING]  
> If two non-adjacent faces of the 3D shape end up sharing an edge in your drawing, the net will intersect itself when folded.

### Step 2 — Count faces, edges and vertices
Cube mein 6 faces, 12 edges aur 8 vertices hote hain. Net mein bhi yahi 6 polygons honge aur 12 fold lines.  
Formal statement: For any net \(N\) of a polyhedron \(P\), \(\sum_{f\in F(P)} \text{area}(f) = \text{area}(N)\).  
> [!WARNING]  
> Miscounting faces immediately produces a net missing a required polygon.

### Step 3 — Ensure tree-like dual graph
The dual graph of the net must be a spanning tree of the polyhedron’s face-adjacency graph; cycles in the dual create closed loops that cannot lie flat.  
Example: cube ke face graph ka koi bhi spanning tree 5 edges ka hota hai, isliye net mein exactly 5 internal fold lines hote hain.  
Formal statement: A net corresponds to a spanning tree \(T\) of the dual graph \(G^*\) where \(G^*\) has vertices = faces and edges = shared edges.  
> [!WARNING]  
> Adding an extra fold line that creates a cycle forces two faces to occupy the same plane region.

### Step 4 — Verify no overlaps after folding
Har possible fold sequence check karna padta hai; ek net valid tabhi hai jab 3D mein koi do faces ek hi jagah overlap na karein.  
Formal statement: The net is valid if the folding map \(\phi: N\to \partial P\) is injective on the interior of every face.  
> [!WARNING]  
> Visual inspection alone often misses overlaps that appear only after several folds.

### Step 5 — Textbook-grade definition
A net of a convex polyhedron \(P\) is a simply-connected polygonal region formed by the union of the faces of \(P\) such that the boundary consists entirely of edges of \(P\) and the identification of those boundary edges reconstructs \(P\).

## 5. Worked examples — har step show karo

**Example 1 — Cube net**  
*Given:* Cube with 6 square faces of side 1.  
*Find:* One valid net.  
Draw a central square. Attach one square to each of its four sides. Attach one more square to the bottom edge of the lower square.  
*Why:* The four side squares correspond to the equatorial belt; the extra square becomes the top or bottom face.  
**Valid net obtained.**

**Example 2 — Cuboid net**  
*Given:* Cuboid 2×3×4.  
*Find:* Net with minimal bounding rectangle.  
Place three 2×3 rectangles in a row (length 9). Attach 3×4 rectangles above and below the middle rectangle.  
*Why:* This uses the longest faces as the spine, keeping total width 4+3+4 = 11.  
**Bounding rectangle 9 by 11.**

**Example 3 — Square pyramid net**  
*Given:* Square base side 2, slant height 3.  
*Find:* Net.  
Draw square base. Attach four isosceles triangles (base 2, equal sides 3) to each side of the square.  
*Why:* Triangles meet only at base edges; their apexes converge to the single apex vertex when folded.  
**Valid net with no overlaps.**

**Example 4 — Hexagonal prism net**  
*Given:* Regular hexagonal prism, height 5.  
*Find:* A non-overlapping net.  
Draw two regular hexagons separated by a rectangle strip of six 5-unit rectangles. Attach one extra rectangle to the side of the strip to allow closure.  
*Why:* The rectangle strip unfolds the lateral surface; the two hexagons cap the ends.  
**Valid net confirmed by checking vertex figures at each fold.**

*Reflection:* These examples show that the same polyhedron admits many nets; choosing the right one depends on manufacturing constraints such as sheet size and fold direction.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Drawing a cross with arms too long | Counting only face adjacency, ignoring spatial angles | Limit arm length to at most three squares for a cube |
| Forgetting a face                 | Miscounting total faces before drawing      | Write the face count on paper first          |
| Overlapping triangles in pyramid net | Placing triangles adjacent on the same base edge | Leave at least 60° gaps between adjacent triangles |
| Using a cycle in the dual graph   | Adding an extra internal edge               | Verify the dual graph is a tree (n−1 edges)  |
| Cutting along the wrong edges     | Confusing fold lines with cut lines         | Mark fold lines with dashed lines before cutting |
| Assuming all nets look like Latin crosses | Over-generalising from the cube example     | Enumerate spanning trees of the dual graph   |
| Ignoring dihedral angles          | Thinking only about 2D layout               | Check that the sum of face angles at each vertex ≤ 360° |

## 7. The textbook-precise statement
A net of a polyhedron \(P\) is a connected plane graph \(N\) whose faces are in bijection with the faces of \(P\), whose edges correspond to either fold lines or boundary edges, and whose dual graph is a spanning tree of the face-adjacency graph of \(P\). When the boundary edges of \(N\) are identified in pairs according to the original polyhedron, the resulting quotient space is homeomorphic to the boundary of \(P\). (See Cromwell, *Polyhedra*, Cambridge University Press, 1997, §2.3.)

## 8. Visual — diagram or schematic
```
      [ ]  
    [ ][ ][ ]  
      [ ]  
      [ ]  
```
Label: top square = top face; middle row of three = front, right, back; bottom two squares = bottom and left faces (one will fold underneath).

## 9. The memory technique
1. **The hook** — Picture a cube as a cross-shaped cardboard cut-out that you fold into a dice; the cross is the net, and every extra square you add risks an overlap like an arm fighting for space.
2. **What to overlearn** — Cube has exactly 11 distinct nets; dual graph of any net must be a tree with \(F-1\) edges.
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — If you forget the count, rebuild by listing all faces, drawing the dual graph, then choosing any spanning tree and laying the faces flat along those tree edges.

## 10. What this unlocks
Mastering nets lets you compute surface area by simply adding polygonal areas and prepares you for volume formulas, Euler’s formula, and classification of convex polyhedra.

- Surface area of any polyhedron via net decomposition  
- Unfolding problems in differential geometry (developable surfaces)  
- Mesh parameterisation in computer graphics  
- Design of foldable structures in origami mathematics and robotics  

## 11. Self-check — five questions, no answers
1. Draw at least two distinct valid nets of a regular tetrahedron.  
2. A cube net has six squares. How many internal fold lines must it contain?  
3. Why does a net of a square pyramid never contain more than four triangles attached to the base?  
4. Identify the mistake in a drawing where five squares meet at a single point in a cube net.  
5. Given a polyhedron with 8 faces, what is the exact number of fold lines in any of its nets?