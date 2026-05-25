## What it is
Git is fundamentally a content-addressable filesystem. At its core, it's not about files or branches, but about four simple data structures called "objects": the **blob** (file content), **tree** (directory structure), **commit** (a snapshot in time), and **tag** (a named pointer). These objects are linked together to form a Directed Acyclic Graph (DAG), which represents the entire history of a project.

## Why it matters
This internal model is the key to Git's speed, integrity, and power. For large-scale physics simulations or aerospace flight software, guaranteeing that version `v3.1.4-final` is *exactly* the same code that was tested is non-negotiable; the content-addressing (hashing) provides this cryptographic guarantee. When debugging a machine learning model's performance regression, you can traverse the DAG of commits to pinpoint the exact change that introduced the issue, even across complex merges and branches.

## When to study it
Before diving into Git internals, you must be proficient with the user-facing commands and concepts. Ensure you understand:
1.  **Basic Git Usage:** You should be comfortable with `git init`, `add`, `commit`, `branch`, `checkout`, and `merge` on the command line.
2.  **Hashing Functions:** You need to understand what a cryptographic hash function (like SHA-1, which Git uses) is, and its key properties: deterministic output and collision resistance.
3.  **Graph Theory Basics:** You must know the definitions of a directed graph, a node (vertex), an edge, and a cycle. Understanding what makes a graph "acyclic" is critical.

If you are not comfortable with these, pause and review them first. The internal model will be opaque otherwise.

## How to study it (step by step)
1.  **Create a disposable repository.** In a new directory, run `git init`. This creates the `.git` directory, which is the entire database. Spend 10 minutes exploring it with `ls -aR .git`. Notice the `objects`, `refs`, and `HEAD` files/directories.
2.  **Create a blob manually.** Create a file, e.g., `echo 'hello world' > test.txt`. Use the low-level `git hash-object -w test.txt` command. This command calculates the object's hash and writes it to the database. Look in `.git/objects` to see the new object, stored in a directory named with the first two characters of its hash.
3.  **Examine the blob.** Use the hash returned from the previous step with the command `git cat-file -p <hash>`. The `-p` flag "pretty-prints" the content. Then use `git cat-file -t <hash>` to see its type. You've now manually done half of what `git add` does.
4.  **Create a tree.** Now, stage the file with `git add test.txt`. This creates the blob (if you hadn't done it manually) and also creates a *tree* object. Run `git write-tree`. This command creates a tree object representing the current state of the staging area (the index) and returns its hash.
5.  **Examine the tree.** Use `git cat-file -p <tree-hash>` on the hash from the previous step. You will see it contains a line with the file mode, object type (blob), the blob's hash, and the filename (`test.txt`).
6.  **Create a commit.** Finally, create the commit object with `git commit-tree <tree-hash> -m "My first commit"`. This command takes a tree hash and a message and creates a commit object, printing its new hash. Note: this command doesn't update your branch.
7.  **Examine the commit.** Use `git cat-file -p <commit-hash>`. You will see it points to the tree you created and lists author/committer information. Notice it has no parent, as it's the first commit. Now make another change, add it, and use `git commit-tree <new-tree-hash> -p <first-commit-hash> -m "Second commit"`. Examine this new commit and see that it now has a `parent` field pointing to the first commit. You have just manually built a two-node DAG.

## Key ideas, with intuition
1.  **Everything is Content-Addressed.** The "name" or ID of any object is the SHA-1 hash of its content plus a small header. For a blob containing the text "hello", the process is roughly: `ID = SHA1("blob " + length(content) + "\0" + content)`. This means if even one bit changes in a file, it becomes a completely new blob with a new ID. It also means identical files are stored only once, regardless of where they appear in the project history.

2.  **Objects are Immutable.** Because an object's ID is the hash of its content, an object can never be changed. If you "change" it, you are actually creating a *new* object with a new ID. This is the foundation of Git's integrity; history cannot be secretly altered because all parent commit hashes are part of the child commit's content, so changing a parent would change its hash, which would change the child's hash, and so on up to the present.

3.  **The Hierarchy of Pointers.** The objects form a simple hierarchy of references.
    *   **Commit:** Points to one `tree` and one or more `parent` commits. It represents a complete snapshot of the project at a point in time.
    *   **Tree:** Points to `blobs` (files) and other `trees` (subdirectories). It represents a directory.
    *   **Blob:** Points to nothing. It is raw content.
    This creates the fundamental relationship: A commit object captures a snapshot of the project's directory structure (the root tree), which in turn captures the content of all files (the blobs).

4.  **The DAG Structure.** A commit object contains the hash(es) of its parent(s). This creates a directed graph where edges point from a child commit to its parent. Since a commit's hash depends on its parent's hash, it's impossible to create a cycle (a commit cannot be its own ancestor). Therefore, the commit history is a **Directed Acyclic Graph**. A branch is just a named pointer to the tip of a line of development (a specific commit).

## Worked example
Let's trace the objects created by a single commit in a new repository.

**Initial state:** An empty directory with a `.git` folder.
**Action 1:** Create a file.
`echo 'y=x^2' > formula.txt`

**Action 2:** Stage the file.
`git add formula.txt`

**Step-by-step object creation by Git:**
1.  **Blob Creation:** Git takes the content `y=x^2\n`. It prepends a header, `blob 6\0` (type, space, content length, null byte), resulting in the string `blob 6\0y=x^2\n`.
2.  **Blob Hashing:** Git computes the SHA-1 hash of this combined string. Let's say the result is `3f49f51...`. This is the blob's ID. The blob object (compressed) is stored in `.git/objects/3f/49f51...`.
3.  **Tree Creation:** When we commit, Git builds a tree for the root directory. Its content is a single line: `100644 blob 3f49f51...    formula.txt`. This line contains the file mode, object type, the blob's hash, and the filename.
4.  **Tree Hashing:** Git prepends a header to the tree's content (`tree 38\0...`) and hashes it. Let's say the result is `d8329fc...`. This is the tree's ID.
5.  **Commit Creation:** We run `git commit -m "Add formula"`. Git constructs the commit object's content:
    ```
    tree d8329fc...
    author User <user@example.com> 167... +0000
    committer User <user@example.com> 167... +0000

    Add formula
    ```
    Since this is the first commit, there is no `parent` line.
6.  **Commit Hashing:** Git prepends a header (`commit 178\0...`) and hashes this entire block of text. Let's say the result is `f7ab267...`. This is the commit's ID.
7.  **Branch Update:** Finally, Git updates the file at `.git/refs/heads/main` to contain the single line `f7ab267...`. The branch `main` now points to our new commit.

**Reflection:** Each step builds upon the last, using the hash generated by the previous step as a pointer. The commit doesn't know or care about file content; it only knows about a single tree hash that represents the entire state of the project. This decoupling is what makes Git so efficient.

## Diagrams
Here is the object graph for the worked example above. `main` is a reference (a branch), not an object itself.

```text
             [Reference]
             refs/heads/main
                   |
                   v
+------------------+------+
| Commit f7ab267         |
|-------------------------|
| tree: d8329fc           |  <-- Points to the root tree
| author: ...             |
| committer: ...          |
|                         |
|    "Add formula"        |
+-------------------------+
                   |
                   v
+------------------+------+
| Tree d8329fc            |
|-------------------------|
| 100644 blob 3f49f51 ... |  <-- Points to the blob for our file
|        formula.txt      |
+-------------------------+
                   |
                   v
+------------------+------+
| Blob 3f49f51            |
|-------------------------|
|                         |
|      y=x^2\n            |  <-- Raw, compressed content
|                         |
+-------------------------+
```

## Memory technique — remember this forever
1.  **The Story:** Think of yourself as a librarian archiving the history of science.
    *   A **Blob** is a single page of text or data (e.g., `E=mc^2`). It's just content.
    *   A **Tree** is the table of contents for a book. It doesn't contain the content, it just lists chapter titles (filenames) and tells you which page (blob) to find them on.
    *   A **Commit** is an entry on a library card. It says: "As of 5:00 PM on Tuesday, the 'Physics' collection is defined by the book with table of contents `d8329fc...`. This entry follows the previous one I made, `a1b2c3d...`."
    *   A **Tag** is a "Pulitzer Prize" sticker you put on a specific library card entry.

2.  **Must-Overlearn Facts:**
    *   `ID = SHA1(header + content)`
    *   `Commit -> Tree -> (Tree | Blob)`
    *   Objects are immutable. Branches are just pointers to commits.

3.  **Spaced Repetition Schedule:** Review these key ideas and the librarian story at **1 day, 3 days, 7 days, 16 days, 35 days**. Actively redraw the diagram from memory each time.

4.  **First Principles Pathway:** If you forget everything, start from the goal: create a verifiable, historical record of a directory of files.
    *   To verify content, you need to hash it. This gives you the **blob**.
    *   To represent a directory, you need a list of its contents (filenames) and pointers to that content. This gives you the **tree**.
    *   To represent history, you need to link snapshots together. A snapshot is a tree plus metadata (who, when) and a pointer to the previous snapshot(s). This gives you the **commit**. The pointers naturally form a **DAG**.

## Common mistakes
1.  **Thinking a commit is a diff.** A commit is a full snapshot of the project, referenced by its root tree. Git is very efficient at calculating diffs between any two commits on demand, but it doesn't *store* diffs as the primary object.
2.  **Confusing blobs with files.** A file in your working directory is mutable. A blob in the `.git/objects` database is immutable. When you `git add` a modified file, you are creating a *new* blob; the old one remains in the database to be used by older commits.
3.  **Believing branches are heavy.** Students often imagine `git branch new-feature` copies all the files. This is false. Creating a branch is trivial: Git just creates a new file in `.git/refs/heads/` and writes the 40-character hash of the commit you're on. It's a cheap, lightweight pointer.

## Self-check
1.  You have a repository with a single file, `constants.py`. You commit it. Then you rename it to `physical_constants.py` without changing its contents and commit again. How many blob objects exist in your repository? How many tree objects?
2.  Imagine a commit object `C3` that was created by merging two parent commits, `C1` and `C2`. Draw the DAG for these three commits. What specific lines of text would you expect to find inside the `C3` commit object's data that would not be in `C1` or `C2`?
3.  If Git used a non-cryptographic hashing function (like a simple checksum) instead of SHA-1, what fundamental guarantee would be lost? How could a malicious actor exploit this to alter project history without it being detected by `git log`?