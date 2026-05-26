## 1. The one-sentence answer
**ext4 organises a storage device as one superblock that describes the entire filesystem, followed by a sequence of identical block groups each holding its own bitmaps, inode table, and data blocks.**

The superblock records global constants such as total block count, inode count, block size, and the location of the first data block. Every block group then repeats a smaller set of management structures so that allocation decisions remain local to a region of the disk. Inside each group the inode table stores fixed-size records that point to the actual file data; the bitmaps simply mark which inodes and blocks inside that group are already in use.

This layout replaces the older ext2/ext3 single-table approach with a scalable, failure-resistant division of labour. The superblock supplies the constants, the block groups supply locality, and the inodes supply per-file identity.

> [!NOTE]
> The superblock is the only structure whose corruption can render the whole filesystem unmountable; every other piece of metadata is replicated once per block group precisely to survive the loss of any single copy.

## 2. Why this matters — concrete and current
Linux distributions running on billions of Android phones and data-centre servers mount ext4 volumes at boot; the superblock read performed by the kernel in the first few milliseconds determines whether the subsequent journal replay and block-group scans can even begin.

In high-performance computing clusters, parallel file-system benchmarks (e.g., IOR on Lustre back-end ext4) rely on the fact that inode allocation within separate block groups can proceed without cross-group lock contention, directly affecting job throughput reported in SC’23 papers.

Solid-state-drive firmware that implements FTL wear-levelling still sees ext4’s block-group layout as contiguous LBA runs; misalignment between ext4 block-group size and erase-block size produces measurable write-amplification factors documented in recent Samsung and Micron technical reports.

Database engines such as PostgreSQL place their WAL and heap files on ext4; the inode size and block-size fields read from the superblock at `mount` time dictate the alignment chosen by `initdb`, affecting both latency and durability under power-loss tests performed by the PostgreSQL build farm.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Block device addressing  | Every offset in the superblock and inode is expressed as a logical block number on the raw device. |
| Bitmap as occupancy map  | Block and inode bitmaps are simple bit vectors whose set bits indicate “already allocated”. |
| Fixed-size record arrays | The inode table is an array of identical 256-byte (or larger) structs; random access is an integer index calculation. |

## 4. Building the idea — from intuition to formalism

### Step 1 — A filesystem must advertise its own geometry
A raw disk is an undifferentiated sequence of sectors. The operating system therefore writes a single well-known block—the superblock—at a fixed offset so that any subsequent mount operation can discover the device’s logical parameters without external configuration.

Example: on a 1 TiB drive formatted with 4 KiB blocks the superblock at byte offset 1024 records “total blocks = 268 435 456, block size = 4096”.

Formally,
$$
s = \text{superblock at LBA } 0 \quad\text{with fields } (b_{\text{total}}, b_{\text{size}}, i_{\text{total}}, \dots).
$$

> [!WARNING]
> Reading the superblock from the wrong offset (for example, sector 0 instead of byte 1024) yields garbage values and an immediate mount failure.

### Step 2 — Global constants are factored out once
Because the superblock already stores total block and inode counts, every other structure can be derived from these constants plus a small number of group-size parameters. This eliminates repetition of the same numbers across the disk.

### Step 3 — The disk is partitioned into fixed-size block groups
Let \( g \) be the number of blocks per group (usually 32 768 for 4 KiB blocks). The group descriptor table, also pointed to by the superblock, then contains exactly
$$
G = \left\lceil \frac{b_{\text{total}}}{g} \right\rceil
$$
entries. Each entry records the location of that group’s bitmap blocks and inode table.

### Step 4 — Each group receives its own allocation bitmaps
Inside group \( k \) the block bitmap occupies one block and contains exactly \( g \) bits; the inode bitmap likewise contains \( i_g \) bits where \( i_g \) is the number of inodes assigned to the group. Setting bit \( j \) in the block bitmap atomically claims block \( k\cdot g + j \).

### Step 5 — Inodes live in per-group tables
The inode table for group \( k \) is an array of \( i_g \) contiguous inode structures. The global inode number \( i \) maps to group
$$
k = \left\lfloor \frac{i-1}{i_g} \right\rfloor
$$
and local index
$$
j = (i-1) \bmod i_g.
$$

### Step 6 — Data blocks are referenced only from inodes
An inode stores up to 12 direct pointers, plus single-, double- and triple-indirect pointers. All pointers are 32-bit or 64-bit block numbers; the superblock’s `s_feature_ro_compat` flag decides which format is active.

### Step 7 — The textbook layout equation
Combining the preceding steps yields the canonical ext4 on-disk layout:
$$
\text{disk} = \underbrace{\text{superblock}}_{\text{LBA 0}} + \underbrace{\text{group descriptors}} + \sum_{k=0}^{G-1} \bigl( \text{block bitmap}_k + \text{inode bitmap}_k + \text{inode table}_k + \text{data blocks}_k \bigr).
$$

## 5. Worked examples — every step shown

**Example 1 — Locate the superblock on a fresh image**
- *Given:* A 1 GiB file representing a block device, 4 KiB blocks.
- *Find:* Byte offset of the ext4 superblock.
- Read the first 2048 bytes; the magic signature 0xEF53 begins at byte 56 of the superblock.
- The superblock itself therefore starts at byte 1024 (standard ext4 placement).
- *Why* the offset is 1024: the boot sector occupies the first 1024 bytes on legacy PC media.
**Final answer: byte 1024**

*Reflection:* The example forces explicit conversion between LBA and byte offsets; forgetting the 1024-byte boot sector is a common initial error.

**Example 2 — Compute number of block groups**
- *Given:* \( b_{\text{total}}=262144 \), \( g=32768 \).
- *Find:* \( G \).
- Division: \( 262144 / 32768 = 8 \).
- No remainder, therefore exactly 8 groups.
**Final answer: 8**

*Reflection:* Integer division here is exact; a remainder would require an extra partial group whose last bitmap must be masked.

**Example 3 — Map inode 12345 to its group and local index**
- *Given:* \( i_g=2048 \), inode number 12345.
- *Find:* group \( k \) and local index \( j \).
- \( k = \lfloor (12345-1)/2048 \rfloor = 6 \).
- \( j = (12345-1) \bmod 2048 = 48 \).
**Final answer: group 6, local index 48**

*Reflection:* Subtracting one before division converts the 1-based inode numbering into 0-based arithmetic.

**Example 4 — Size of the inode table in blocks**
- *Given:* 2048 inodes per group, inode size 256 bytes, block size 4096 bytes.
- *Find:* blocks occupied by one inode table.
- Bytes required: \( 2048 \times 256 = 524288 \).
- Blocks: \( 524288 / 4096 = 128 \).
**Final answer: 128 blocks**

*Reflection:* The calculation shows why inode size must be a power-of-two divisor of block size; otherwise padding or fragmentation appears inside the table.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating the superblock as residing at LBA 0 | The first 1024 bytes are historically reserved for the MBR or boot loader. | Always add 1024 bytes (or two 512-byte sectors) when computing the superblock offset from the raw device. |
| Assuming every block group contains the same number of inodes | The last group may be truncated; the superblock stores both `s_inodes_per_group` and `s_inodes_count`. | Read `s_inodes_count` and compute the final group’s inode count separately. |
| Forgetting that 64-bit features move the group descriptor table | When `s_feature_incompat & EXT4_FEATURE_INCOMPAT_64BIT` the GDT follows the superblock at a variable offset. | Check the feature flag before calculating GDT location. |
| Reading inode pointers as byte offsets instead of block numbers | Pointers inside inodes are logical block numbers, not byte addresses. | Multiply by block size only after the pointer arithmetic is complete. |
| Ignoring the journal inode | ext4 journals are stored in an inode (usually 8) whose location is recorded in the superblock; mounting without replay leaves the filesystem inconsistent. | Always replay the journal (or mount with `norecovery` only for read-only inspection). |
| Overlooking backup superblocks | Backup copies exist at 1-block offsets inside groups whose number is a power of 3, 5 or 7. | Use `dumpe2fs -h` or `debugfs` to locate them before attempting manual repair. |
| Confusing `i_size` with allocated blocks | `i_size` records logical length; actual blocks are given by the extent tree or block map. | Use `stat` or `debugfs` `stat` command to see both values side-by-side. |

## 7. The textbook-precise statement
An ext4 filesystem is a tuple
\[
(s, G, \{BG_k\}_{k=0}^{G-1})
\]
where \( s \) is the superblock (bytes 1024–2047 of the device), \( G = \lceil s.s\_blocks\_count / s.s\_blocks\_per\_group \rceil \), and each \( BG_k \) consists of a block bitmap, an inode bitmap, an inode table of \( s.s\_inodes\_per\_group \) inodes each of size \( s.s\_inode\_size \), followed by data blocks. All block numbers are relative to the start of the device. (Reference: Mathur et al., “The New ext4 Filesystem: Current Status and Future Plans”, Ottawa Linux Symposium 2007, §3.)

## 8. Visual — diagram or schematic
```text
LBA 0
+-------------+  superblock (1024 B offset, 1 KiB long)
|  superblock |
+-------------+
| group desc  |  (variable length, usually 1–2 blocks)
+-------------+
| BG 0        |  bitmap blocks | inode table | data blocks
+-------------+
| BG 1        |  ...
+-------------+
| ...         |
+-------------+
| BG G-1      |  (may be partial)
+-------------+
```
Each BG occupies exactly `s_blocks_per_group` blocks except possibly the last.

## 9. The memory technique

1. **The hook** — Picture a single lighthouse (superblock) whose beam illuminates identical warehouses (block groups) lined up along the shore; each warehouse has a sign-in sheet (inode table) and two clipboards (bitmaps) at the door.
2. **What to overlearn** — Superblock always starts at byte 1024; inode number 2 is the root directory; group descriptor table follows the superblock.
3. **Spaced-repetition schedule** — Review layout equation after 1 day, recompute a group-to-inode mapping after 3 days, sketch the ASCII diagram from memory after 7 days, derive the number of groups from a fresh `mkfs` output after 16 days, and implement a minimal superblock parser after 35 days.
4. **First-principles fallback** — Start from the single fact that the kernel must discover block size and total size; everything else follows by dividing the device into manageable regions whose management structures are stored locally.

## 10. What this unlocks
Understanding the superblock–group–inode decomposition lets you reason about allocation locality, crash recovery via the journal inode, and the design of copy-on-write or log-structured successors. The same mental model transfers directly to:

- Btrfs and XFS extent-based allocators
- Flash Translation Layer (FTL) grouping strategies
- User-space filesystem fuzzers that mutate only the superblock or a single group descriptor

## 11. Self-check — five questions, no answers
1. Given a 4 KiB block size and `s_blocks_per_group = 32768`, how many bits does the block bitmap of each group contain, and what happens to the final group when the device size is not a multiple of this value?
2. An inode whose number equals `s_inodes_per_group + 5` resides in which block group? Write the exact arithmetic expression.
3. If the superblock reports `s_inode_size = 256` but a particular inode contains an extent header whose magic is 0xF30A, what compatibility flag must be set and why?
4. A power failure occurs after the block bitmap of group 3 is updated but before the corresponding inode is written. Which structure will the journal replay examine first on the next mount, and what single bit pattern indicates the inconsistency?
5. You are handed a raw 2 TiB image whose first 512-byte sector contains an MBR. Derive, in one expression, the LBA that must be read to obtain the first ext4 superblock copy.