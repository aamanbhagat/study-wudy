## 1. The one-sentence answer
**Paging** divides both logical and physical memory into fixed-size blocks called pages and frames so that any logical address can be translated into a physical address using a page table.

Logical address space ko fixed-size chunks (pages) mein tod dete hain aur physical memory ko bhi same size ke frames mein. Har process ka apna page table hota hai jo batata hai ki uska koi page kis physical frame mein mapped hai. Translation hardware (MMU) page number ko index ki tarah use karke page table se frame number nikaalta hai aur offset ko add karke final physical address banata hai. Iska result yeh hota hai ki process ko contiguous memory ki zaroorat nahi padti aur external fragmentation khatam ho jaata hai.

> [!NOTE]
> Sabse badi aha yeh hai ki page size ek power-of-two hoti hai, isliye logical address ko sirf bit-splitting se page number aur offset mein tod sakte hain — koi division ya modulo nahi chahiye.

## 2. Why this matters — concrete and current
Modern x86-64 processors (Intel Core, AMD Ryzen) 4 KiB pages use karte hain default mein, lekin 2 MiB aur 1 GiB huge pages bhi support karte hain taaki TLB misses kam hon. Google’s Borg aur Kubernetes jaise cluster schedulers page-size aware ho kar large ML training jobs ke liye huge pages allocate karte hain.

Android aur iOS dono ART aur Swift runtime mein per-app page tables maintain karte hain; jab ek app background mein jaati hai to uske pages ko compress ya swap kar dete hain bina pura process maarne ke.

Linux kernel (v5.10+) ka HugeTLB subsystem aur Transparent Huge Pages (THP) feature directly page table structure ko modify karke database workloads (PostgreSQL, MySQL) mein 10-30 % performance gain dete hain.

NVIDIA GPU drivers CUDA Unified Memory ke andar page migration tables use karte hain jo CPU aur GPU ke beech 64 KiB pages ko migrate karte hain, bina application code badle.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Binary address representation | Page number aur offset nikaalne ke liye bit mask aur shift use hote hain |
| Array indexing       | Page table ek array hai jisme index page number hota hai  |
| Power-of-two arithmetic | Page size 2^k hone se multiplication/division sirf shifts ban jaate hain |

Agar upar ke teen concepts comfortable nahi hain to pehle unko revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Memory ko fixed blocks mein todna
Logical address space ko equal-size pages mein aur physical memory ko equal-size frames mein tod dete hain. Yeh size usually 4 KiB hoti hai.

Example: 16-bit logical address space aur 4 KiB page size.  
Formal statement:  
$$P = 2^{12},\quad\text{page offset bits}=12.$$

> [!WARNING]
> Agar page size power-of-two na ho to bit-splitting ka simple mechanism toot jaata hai aur har address translation mein actual division lagni padti hai.

### Step 2 — Logical address ko page number + offset mein split karna
Address ke high-order bits page number aur low-order bits offset ban jaate hain.

Example: address 0x1A3F (16-bit) with 12-bit offset → page number = 0x1, offset = 0xA3F.  
Formal:  
$$p = \lfloor A / P \rfloor,\quad d = A \bmod P.$$

### Step 3 — Page table ka basic structure
Page table ek array hai jiska har entry ek page table entry (PTE) hai. Index page number hota hai, value mein frame number aur control bits hote hain.

Formal:  
$$\text{PT}[p] = f \cdot 2^{o} + \text{control bits},$$  
jahan $f$ physical frame number aur $o$ offset bits hain.

### Step 4 — Address translation ka mechanism
MMU page number ko page table mein index karta hai, frame number nikaalta hai aur offset add karta hai.

Physical address:  
$$PA = f \cdot P + d.$$

### Step 5 — PTE ke andar kya fields hote hain
Typical PTE mein: frame number, valid bit, dirty bit, accessed bit, protection bits (R/W/X), user/supervisor bit.

### Step 6 — Multi-level page tables (optional extension)
Jab address space bada ho (64-bit) to single-level table memory waste karti hai, isliye page table ko bhi pages mein tod ke multi-level tree bana dete hain.

## 5. Worked examples — har step show karo

**Example 1 — Simple 16-bit address, 4 KiB pages**  
*Given:* Logical address = 0x0F2C, page size = 4 KiB.  
*Find:* Page number and offset.  
Step 1: 4 KiB = 2^12 → offset mask = 0x0FFF.  
Step 2: offset = 0x0F2C & 0x0FFF = 0xF2C.  
Step 3: page number = 0x0F2C >> 12 = 0.  
*Why:* Masking low 12 bits directly offset deta hai kyunki page size power-of-two hai.  
**Final answer**  
Page = 0, Offset = 0xF2C

*Reflection:* Yeh sabse basic case hai; galti sirf tab hoti hai jab student mask galat le.

**Example 2 — Frame calculation**  
*Given:* Physical memory = 256 MiB, page size = 4 KiB.  
*Find:* Total frames.  
Step 1: 256 MiB = 2^28 bytes.  
Step 2: frames = 2^28 / 2^12 = 2^16 = 65536.  
*Why:* Division power-of-two se shift ban jaati hai.  
**Final answer**  
65536 frames

*Reflection:* Real systems mein yeh number hardware registers mein store hota hai.

**Example 3 — Address translation with page table**  
*Given:* Page table[3] = 0x0002A (frame 42), address = 0x3A14.  
*Find:* Physical address.  
Step 1: page = 0x3A14 >> 12 = 3.  
Step 2: frame = 42.  
Step 3: PA = 42 * 4096 + 0xA14 = 172032 + 2580 = 174612 (0x2AA14).  
*Why:* Frame ko shift karke offset add karna hi translation hai.  
**Final answer**  
0x2AA14

*Reflection:* Valid bit check yahan dikhaya nahi gaya lekin real hardware pehle valid check karta hai.

**Example 4 — Page table memory overhead**  
*Given:* 32-bit VAS, 4 KiB pages, each PTE = 4 bytes.  
*Find:* Single-level page table size.  
Step 1: pages = 2^32 / 2^12 = 2^20.  
Step 2: table size = 2^20 * 4 = 4 MiB.  
*Why:* Har process ke liye 4 MiB extra memory chahiye.  
**Final answer**  
4 MiB per process

*Reflection:* Isi wajah se 64-bit systems multi-level tables use karte hain.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Page size ko 1000 ke multiple samajhna | Decimal habit                                 | Hamesha 2^10 = 1 KiB yaad rakho                |
| PTE size ko page size ke barabar samajhna | Dono “page” word use hote hain               | PTE size alag hoti hai (usually 4-8 bytes)   |
| Offset bits galat nikaalna        | Mask ke bajaye direct divide karna          | Sirf >> aur & operators use karo             |
| Valid bit check bhool jaana       | Translation diagram mein dikh nahi hota     | Har example mein pehle valid bit check karo  |
| Single-level table ko 64-bit pe assume karna | Textbook diagrams chhote address spaces ke hote hain | 64-bit ke liye multi-level ya 5-level paging yaad rakho |

## 7. The textbook-precise statement
In a paged virtual memory system the logical address space is divided into fixed-length pages of size \(P = 2^k\) bytes. A logical address \(A\) is partitioned into a page number \(p = A \div P\) and a page offset \(d = A \bmod P\). The page table is an array indexed by \(p\); each page-table entry contains at least a frame number \(f\) and a valid bit. The corresponding physical address is \(PA = f \cdot P + d\) provided the valid bit is set. (Silberschatz, Galvin, Gagne, *Operating System Concepts*, 10e, §9.3–9.4)

## 8. Visual — diagram or schematic
```text
Logical Address (32-bit)
[31:12] page number (20 bits) | [11:0] offset (12 bits)
          │
          ▼
Page Table (array)
Index 0 → PTE0 (frame 5, V=1)
Index 1 → PTE1 (frame 12, V=1)
Index 2 → PTE2 (frame 0, V=0)   ← invalid
Index 3 → PTE3 (frame 42, V=1)
          │
          ▼
Physical Address = frame<<12 | offset
```

## 9. The memory technique

1. **The hook** — Page table ko “phone directory” samjho: page number “naam” hai aur frame number “phone number”.
2. **What to overlearn** — Page size = 4 KiB → offset mask = 0xFFF; PTE mein valid bit hamesha pehle check hota hai.
3. **Spaced-repetition schedule** — 1 din baad, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Bhool jaaye to address = page_number × page_size + offset likh ke bits count karo.

## 10. What this unlocks
Paging samajh lene ke baad aap demand paging, page replacement algorithms (LRU, Clock), TLB operation, aur multi-level page table design samajh sakte hain.

- Demand paging aur page-fault handling
- TLB miss handling aur hardware vs software TLB
- Copy-on-write aur fork() optimisation
- NUMA-aware page placement

## 11. Self-check — five questions, no answers
1. 64-bit system mein 4 KiB pages ke liye kitne bits page number ke liye chahiye?
2. Ek PTE ka size 8 bytes hai. 48-bit VAS aur 4 KiB pages ke liye single-level page table kitni memory lega?
3. Logical address 0x12345678, page size 2 MiB ho to page number aur offset kya hoga?
4. Valid bit clear hone par kya hota hai aur kaunsa exception generate hota hai?
5. Agar page size double kar di jaaye to page table size aur TLB coverage ka kya asar padta hai?