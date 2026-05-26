## 1. The one-sentence answer
**ext4 structures the disk into one superblock plus many identical block groups, where each block group stores its own bitmaps and inode table so that files can be located and managed efficiently.**

ext4 divides the entire partition into a fixed number of block groups. The superblock sits at the beginning and holds global constants such as total block count, block size, and the location of the first inode table. Inside every block group you find an inode bitmap, a block bitmap, and a contiguous inode table; data blocks for files are allocated from the same group whenever possible.

This layout removes the need for one gigantic central table and lets the kernel repair or check only the affected group after a crash. Because inodes themselves are stored in fixed-size tables, the kernel can translate an inode number directly into a disk offset without searching.

> [!NOTE]
> The single most important “aha” is that an inode number is not a file name; it is simply an index into one of the inode tables scattered across the block groups.

## 2. Why this matters — concrete and current
Android 10–14 devices format userdata partitions with ext4; the block-group layout lets the flash translation layer keep hot inodes and their data blocks physically close, cutting random-read latency by 30–40 % compared with an F2FS conversion on the same hardware.

In Kubernetes, the container runtime (containerd) stores image layers on ext4 volumes inside the node’s root filesystem. The superblock’s `s_feature_ro_compat` flags tell the kernel whether the volume supports metadata checksums, which prevents silent corruption from propagating into running pods.

CERN’s LHC computing grid uses ext4 on thousands of storage nodes that hold RAW detector data. The fixed inode table size chosen at mkfs time directly determines how many files (events) can be stored; operators therefore calculate inode density from expected event cardinality before formatting.

Modern databases such as PostgreSQL on Linux rely on ext4’s delayed allocation inside block groups. When a checkpoint writes several gigabytes of WAL and data files, the allocator can place them contiguously within a single block group, reducing fragmentation and improving crash-recovery time from minutes to seconds.

## 3. Mental prerequisites

| Concept              | Why you need it here                                                                 |
|----------------------|--------------------------------------------------------------------------------------|
| Block device         | ext4 sits directly on a block device; you must know that the device exports fixed-size sectors. |
| Inode number         | Every file is identified by an inode number; the mapping from name to inode lives in directories. |
| Bitmap               | Bitmaps track free/used blocks and inodes inside each group; you must understand bit operations. |
| Filesystem mount     | The kernel reads the superblock at mount time; you must know what happens when that read fails. |

If any row is unfamiliar, pause and read the corresponding prerequisite first.

## 4. Building the idea — from intuition to formalism

### Step 1 — The superblock is the filesystem’s identity card
The superblock occupies the first 1024 bytes after the boot sector and stores immutable parameters chosen at mkfs time.  
Example: an 8 GiB partition formatted with 4 KiB blocks yields roughly two million blocks; the superblock records this number in `s_blocks_count_lo`.  
Formal statement:  
$$s\_blocks\_count = \left\lfloor\frac{device\_size}{block\_size}\right\rfloor$$  
> [!WARNING]  
> Changing the superblock after mkfs without updating checksums will make the kernel refuse to mount the volume read-write.

### Step 2 — Block groups slice the disk into manageable chunks
The total blocks are divided into groups of size `s_blocks_per_group`. Each group therefore owns its own 4 KiB block bitmap and inode bitmap.  
Example: with 32768 blocks per group, group 0 covers blocks 0–32767 and group 1 covers 32768–65535.  
Formal statement:  
$$group\_id = \left\lfloor\frac{block\_nr}{s\_blocks\_per\_group}\right\rfloor$$

### Step 3 — Inodes live in per-group tables
Inside every block group an inode table occupies `s_inodes_per_group` consecutive blocks. An inode number is therefore a direct offset into one of these tables.  
Example: inode 12345 belongs to group \(\lfloor 12345 / s\_inodes\_per\_group \rfloor\).  
Formal statement:  
$$inode\_block = inode\_table\_start + \left\lfloor\frac{(ino-1) \bmod s\_inodes\_per\_group}{inodes\_per\_block}\right\rfloor$$

### Step 4 — Bitmaps enforce allocation locality
When creating a new file the allocator first tries to set a bit inside the same block group’s inode bitmap and then allocates data blocks from the same group’s block bitmap.  
Formal rule: if both bitmaps have a free bit, the file’s inode and its first data block reside in the same group.

### Step 5 — Directory entries map names to inode numbers
A directory is itself a file whose data blocks contain `ext4_dir_entry_2` records. Each record stores name, inode number, and record length.  
Formal record layout (little-endian):  
```text
u32 inode; u16 rec_len; u8 name_len; u8 file_type; char name[255];
```

### Step 6 — The kernel rebuilds the in-memory inode cache from disk inodes
On lookup the VFS calls `ext4_iget`, which reads the on-disk inode, populates `struct ext4_inode_info`, and inserts it into the inode hash table.  
Textbook-grade statement appears in section 7.

## 5. Worked examples

**Example 1 — Locate the superblock**  
*Given:* 1 TiB NVMe drive, 4096-byte blocks.  
*Find:* byte offset of the superblock.  
Step 1: ext4 places the superblock at byte 1024.  
Step 2: 1024 / 4096 = 0.25, therefore the superblock sits inside block 0 at offset 1024.  
*Why:* the first 1024 bytes are reserved for the boot sector.  
**Final answer**  
1024 bytes from the start of the device.

**Example 2 — Compute group of inode 45678**  
*Given:* `s_inodes_per_group = 8192`.  
*Find:* group number.  
45678 − 1 = 45677; 45677 / 8192 = 5 (integer division).  
*Why:* inode numbers start at 1; subtracting 1 converts to zero-based indexing.  
**Final answer**  
Group 5.

**Example 3 — Calculate blocks occupied by an inode table**  
*Given:* `s_inodes_per_group = 8192`, inode size = 256 bytes, block size = 4096 bytes.  
Inodes per block = 4096 / 256 = 16.  
Blocks for table = 8192 / 16 = 512.  
*Why:* every block holds an integer number of inodes; no partial block is allowed.  
**Final answer**  
512 blocks.

**Example 4 — Verify a directory entry record length**  
*Given:* name “report.pdf”, inode = 78234.  
Record length must be rounded up to 4-byte boundary:  
name_len = 10, base = 8 bytes, total = 18 → pad to 20.  
*Why:* the next record must start on a 4-byte boundary for alignment.  
**Final answer**  
`rec_len = 20`.

*Reflection:* these calculations are mechanical once the constants from the superblock are known; the same arithmetic appears in every filesystem-walking tool.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Treating inode 2 as the root      | inode 2 is conventional but not guaranteed          | Always read `s_inode_size` and locate the root via `s_first_ino` |
| Ignoring 64-bit fields            | Old tools read only `s_blocks_count_lo`             | Check `s_feature_incompat` for `EXT4_FEATURE_INCOMPAT_64BIT` |
| Assuming block size equals sector size | Modern drives expose 4 KiB sectors but ext4 may use 4 KiB blocks | Read `s_log_block_size` from the superblock          |
| Forgetting group-descriptor checksums | ext4 stores checksums in the group descriptor itself | Use `debugfs` or `e2fsck -c` to verify               |
| Overwriting the superblock backup | `dd` of the whole disk can destroy backups at 0, 32768, … | Keep a separate superblock backup before low-level writes |

## 7. The textbook-precise statement
From “The Linux Programming Interface” by Michael Kerrisk, §14.5 and the ext4 kernel documentation (linux/fs/ext4/super.c):

An ext4 filesystem is described by a superblock `struct ext4_super_block` located at byte offset 1024. The superblock contains the fields `s_blocks_count_lo`, `s_blocks_per_group`, `s_inodes_per_group`, `s_inode_size`, and `s_first_ino`. The volume is partitioned into block groups of `s_blocks_per_group` blocks each. Within group \(g\) the inode table begins at the block address stored in the group descriptor `bg_inode_table_lo` (plus the high part when `64BIT` is set). An inode number \(i\) maps to group \(g = \lfloor(i-1)/s\_inodes\_per\_group\rfloor\) and to the local index \((i-1) \bmod s\_inodes\_per\_group\). All on-disk structures are little-endian; metadata checksums are mandatory when `EXT4_FEATURE_RO_COMPAT_METADATA_CSUM` is set.

## 8. Visual — diagram or schematic
```
Disk layout (4 KiB blocks, 32768 blocks/group)

Block 0          Superblock (1024 B offset) + Group 0 Descriptors
Blocks 1-512     Group 0 Inode Table (8192 inodes)
Blocks 513-514   Group 0 Block Bitmap + Inode Bitmap
Blocks 515-...   Data blocks belonging to Group 0

Block 32768      Superblock backup + Group 1 Descriptors
...              (identical layout for Group 1)
```

## 9. The memory technique
1. **The hook** — picture a giant library index card (superblock) that tells you how many shelves (block groups) exist; each shelf has its own checkout ledger (inode table) and two stamp pads (bitmaps).
2. **What to overlearn** — `s_blocks_per_group`, `s_inodes_per_group`, and the formula `group = (ino-1) / s_inodes_per_group`.
3. **Spaced-repetition schedule** — review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — if you forget the constants, reread the superblock at offset 1024 with `dd bs=1 skip=1024 count=1024 | od -tx1`; the first four bytes after the magic number give `s_blocks_count_lo`.

## 10. What this unlocks
Understanding the on-disk layout lets you write `debugfs` scripts, design forensic tools, and tune `mkfs.ext4` parameters for database workloads.  
- Next topics: ext4 extent trees, journaling (jbd2), online resizing, and `fallocate` behaviour.  
- You can now read the source of `ext4_iget`, `ext4_bread`, and `ext4_find_entry` without getting lost.

## 11. Self-check — five questions, no answers
1. Given a superblock dump showing `s_blocks_per_group = 32768` and `s_inodes_per_group = 8192`, what is the group number of inode 100000?
2. If the block size is 4096 bytes and inode size is 256 bytes, how many blocks does one inode table occupy when `s_inodes_per_group = 16384`?
3. Why does ext4 keep a superblock copy every 32768 blocks instead of only at block 0?
4. A directory entry claims `rec_len = 12` for a 9-character name; is this valid? Show the arithmetic.
5. What single superblock field tells the kernel whether 64-bit block counts are in use, and what happens if that flag is ignored during mount?