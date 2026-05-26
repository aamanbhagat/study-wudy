## 1. The one-sentence answer
**A basis of a vector space is a linearly independent set that spans the entire space, and this property forces every vector to have a unique representation as a finite linear combination of basis elements.**

A basis gives you a coordinate system inside an abstract vector space. Once you fix a basis, each vector becomes a unique tuple of scalars—the coordinates—with respect to that basis. Without linear independence you lose uniqueness; without spanning you lose existence. Together they turn the vector space into something you can compute with, exactly as \(\mathbb{R}^n\) behaves once you choose the standard basis.

The uniqueness result is not an extra theorem; it follows directly from the two defining properties. If two different combinations produced the same vector, their difference would be a non-trivial linear dependence relation, contradicting independence.

> [!NOTE]
> The single “aha” is that a basis simultaneously solves the existence problem (every vector can be written) and the uniqueness problem (the writing is unique). These two facts are inseparable once both conditions are satisfied.

## 2. Why this matters — concrete and current
In computer graphics, game engines such as Unity and Unreal choose a basis for each local coordinate frame attached to an object. Changing that basis (via transformation matrices) moves the object rigidly while preserving all linear relations; uniqueness guarantees that the same point never receives two conflicting coordinate tuples after the change.

In quantum information, the computational basis \(\{|0\rangle, |1\rangle\}\) for a qubit is used by IBM and Google quantum processors to read out measurement outcomes. Any other state is a unique linear combination of these two vectors; the uniqueness guarantees that the Born-rule probabilities are well-defined and reproducible across different runs.

In data science, principal-component analysis (as implemented in scikit-learn’s PCA) produces an orthonormal basis for the column space of a data matrix. Each data point then receives unique coordinates in this lower-dimensional basis, enabling lossless reconstruction up to the chosen rank and direct comparison of datasets across different laboratories.

In finite-element engineering software (COMSOL, ANSYS), the chosen nodal basis functions on each mesh element guarantee that any admissible displacement field inside the element has a unique representation. This uniqueness converts the continuous PDE into a square linear system whose solution is the vector of nodal coefficients.

In algebraic coding theory, the Reed–Solomon code used by QR codes and DVDs treats messages as coefficient vectors with respect to the monomial basis \(\{1,x,x^2,\dots,x^{k-1}\}\). Unique representation ensures that two distinct messages produce distinct codewords, which is exactly the minimum-distance property required for error correction.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector space axioms      | Defines the ambient setting in which linear combinations live |
| Linear combination       | The only operation allowed when expressing vectors        |
| Span of a set            | Captures the “every vector can be written” requirement    |
| Linear independence      | Captures the “the writing is unique” requirement          |

If any of these four ideas are shaky, pause and review them before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Linear combinations give coordinates
Any finite collection of vectors \(v_1,\dots,v_k\) lets you form all possible sums \(\alpha_1 v_1 + \dots + \alpha_k v_k\). Each choice of scalars \((\alpha_1,\dots,\alpha_k)\) is a potential “address” for a vector.

Take the plane \(\mathbb{R}^2\) and the two vectors \(e_1=(1,0)\), \(e_2=(0,1)\). The address \((3,-2)\) means exactly the combination \(3e_1-2e_2\).

Formally, the set of all linear combinations is denoted \(\operatorname{span}\{v_1,\dots,v_k\}\).

> [!WARNING]
> If you allow two different tuples of scalars to label the same vector, you have already lost uniqueness; the later steps will show why that happens precisely when dependence appears.

### Step 2 — Spanning guarantees existence
A set \(B\) spans \(V\) when every vector of \(V\) lies in \(\operatorname{span}(B)\). Existence of at least one representation is therefore assured.

In \(\mathbb{R}^2\), \(\{e_1,e_2\}\) spans because any \((x,y)\) equals \(x e_1 + y e_2\).

Formally: \(\operatorname{span}(B)=V\).

### Step 3 — Independence removes redundancy
A set is linearly independent when the only way to obtain the zero vector is the trivial combination with all coefficients zero. This forbids “wasteful” relations that would allow multiple addresses for the same point.

Continuing the same example, suppose \(a e_1 + b e_2 = 0\). Then \((a,b)=(0,0)\) is forced, so \(\{e_1,e_2\}\) is independent.

Formally: \(\sum\alpha_i v_i=0\) implies every \(\alpha_i=0\).

> [!WARNING]
> Students often confuse “independent” with “orthogonal”. Orthogonality is a stronger geometric property that implies independence but is not required for the definition.

### Step 4 — Basis = span + independence
A set \(B\) is a **basis** of \(V\) when it is linearly independent and spans \(V\).

### Step 5 — Uniqueness follows at once
Let \(B=\{v_1,\dots,v_n\}\) be a basis and suppose
\[
v=\sum\alpha_i v_i=\sum\beta_i v_i.
\]
Subtracting yields \(\sum(\alpha_i-\beta_i)v_i=0\). Independence forces every coefficient \(\alpha_i-\beta_i=0\), hence the tuples \((\alpha_i)\) and \((\beta_i)\) are identical.

This is the precise statement that representation is unique.

## 5. Worked examples — har step show karo

**Example 1 — Standard basis of \(\mathbb{R}^3\)**
*Given:* Vectors \(e_1=(1,0,0)\), \(e_2=(0,1,0)\), \(e_3=(0,0,1)\) in \(\mathbb{R}^3\).
*Find:* Show they form a basis and find the unique coordinates of \((5,-1,2)\).

Check spanning: any \((x,y,z)=x e_1 + y e_2 + z e_3\).  
Check independence: suppose \(a e_1 + b e_2 + c e_3=0\) gives the system \(a=0\), \(b=0\), \(c=0\).  
Hence \(\{e_1,e_2,e_3\}\) is a basis.  
The vector \((5,-1,2)\) equals \(5e_1-1e_2+2e_3\), so its coordinate tuple is \((5,-1,2)\).

*Why each move:* The component-wise equality directly exhibits both spanning and independence; uniqueness is then automatic.

**Example 2 — Monomials in \(\mathcal{P}_2\)**
*Given:* Space of polynomials of degree at most 2.
*Find:* Verify that \(\{1,x,x^2\}\) is a basis.

Any \(a+bx+cx^2\) is already the linear combination with coefficients \((a,b,c)\).  
Suppose \(a\cdot1+b\cdot x+c\cdot x^2=0\) (the zero polynomial). All coefficients must vanish, hence independence.  
Thus the set is a basis and every quadratic has unique coefficients.

*Reflection:* The example shows that “coordinates” need not be numbers in \(\mathbb{R}^n\); they can be the familiar polynomial coefficients once a basis is chosen.

**Example 3 — A dependent set fails uniqueness**
*Given:* Vectors \(v_1=(1,0)\), \(v_2=(0,1)\), \(v_3=(1,1)\) in \(\mathbb{R}^2\).
*Find:* Show two different representations of \((1,1)\).

Observe \(1\cdot v_1+1\cdot v_2+0\cdot v_3=(1,1)\) and also \(0\cdot v_1+0\cdot v_2+1\cdot v_3=(1,1)\).  
The difference gives a non-trivial relation \(v_1+v_2-v_3=0\), proving dependence and therefore non-uniqueness.

*Why the move:* Explicitly exhibiting two combinations demonstrates the concrete cost of losing independence.

**Example 4 — Infinite-dimensional case (sketch)**
*Given:* Space of all polynomials \(\mathcal{P}\).
*Find:* Show that the infinite set \(\{1,x,x^2,\dots\}\) is a basis.

Every polynomial uses only finitely many powers, so it lies in the span.  
Any finite linear dependence would involve only finitely many powers and reduce to the finite-degree case already shown independent.  
Hence the set is a basis and each polynomial again has unique coefficients.

*Reflection:* The definition extends verbatim to infinite dimensions provided every vector uses only a finite combination.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                              | How to avoid it                                      |
|-------------------------------------|---------------------------------------------|------------------------------------------------------|
| Forgetting to check both conditions | Students remember only “spanning”           | Always verify independence after spanning            |
| Assuming any spanning set is a basis| Confusing minimal spanning set with basis   | Prove that removing any vector destroys spanning     |
| Treating orthogonality as necessary | Over-generalising from \(\mathbb{R}^n\)     | Independence is purely algebraic; orthogonality optional |
| Writing infinite sums in infinite dimensions | Forgetting the finite-support rule        | Explicitly state each vector uses finitely many terms |
| Confusing “unique representation” with “unique basis” | Misreading the quantifiers             | Remember: representation is unique for a fixed basis |
| Using the zero vector in a basis    | Zero is always dependent                    | Immediately reject any set containing 0              |
| Claiming two bases must have same cardinality without proof | Jumping to dimension theorem too early | First prove the replacement lemma or exchange lemma  |

## 7. The textbook-precise statement
Let \(V\) be a vector space over a field \(F\). A subset \(B\subseteq V\) is called a **basis** for \(V\) if  
1. \(B\) is linearly independent, i.e., whenever \(v_1,\dots,v_n\in B\) are distinct and \(\alpha_1,\dots,\alpha_n\in F\) satisfy \(\sum_{i=1}^n\alpha_i v_i=0\), then \(\alpha_i=0\) for all \(i\);  
2. \(\operatorname{span}(B)=V\).

Theorem (Uniqueness of coordinates). If \(B=\{v_i\}_{i\in I}\) is a basis and \(v\in V\), then there exists a unique finitely supported family \((\alpha_i)_{i\in I}\) such that \(v=\sum\alpha_i v_i\).

(Source: Sheldon Axler, *Linear Algebra Done Right*, 3rd ed., Springer 2015, §2.3, Theorem 2.7 and Corollary 2.8.)

## 8. Visual — diagram or schematic
```
          y
          ^
          |
     v2   |   (3,2) = 3 e1 + 2 e2
       \  |  /
        \ | /  
         \|/____> x
          e1
```
Labelled vectors: horizontal arrow = \(e_1\), vertical arrow = \(e_2\), diagonal arrow from origin to point (3,2) showing the unique parallelogram decomposition.

## 9. The memory technique

1. **The hook** — Picture a city grid: streets (one basis vector) and avenues (the other). Every address is unique only when the two directions are independent; otherwise two different routes reach the same building.
2. **What to overlearn** — “Basis = independent + spanning” and the one-line uniqueness argument: difference of two representations yields a dependence relation.
3. **Spaced-repetition schedule** — Review the definition after 1 day, 3 days, 7 days, 16 days, 35 days, each time writing the uniqueness proof from memory.
4. **First-principles fallback** — If the wording slips, start from the two definitions, subtract the two combinations, and invoke independence; the algebra rebuilds the theorem.

## 10. What this unlocks
With a basis in hand you can define coordinates, dimension, matrix representations of linear maps, change-of-basis matrices, and dual bases. The next immediate topics are:

- Dimension theorem and replacement lemma
- Matrix of a linear operator with respect to a chosen basis
- Isomorphism theorems between spaces of equal dimension
- Dual space and dual basis construction

## 11. Self-check — five questions, no answers
1. Prove that any two bases of a finite-dimensional space have the same number of elements.
2. Give an explicit linear dependence relation showing that \(\{(1,1),(2,2)\}\) cannot be a basis of \(\mathbb{R}^2\).
3. In the space of continuous functions, is the set \(\{1,x,x^2\}\) still a basis for the subspace of polynomials of degree ≤2? Why?
4. Suppose \(B\) is a basis and you replace one vector by a scalar multiple of itself. Does the new set remain a basis?
5. A student claims “any maximal linearly independent set is automatically a basis.” Identify the missing verification and supply it.