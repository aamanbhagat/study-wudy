## 1. The one-sentence answer
**A hypervisor is a software layer that creates and runs virtual machines by mediating all access between guest operating systems and physical hardware; Type 1 hypervisors run directly on the hardware while Type 2 hypervisors run as applications inside a conventional host operating system.**

Virtualization lets one physical computer pretend to be several independent computers. The hypervisor is the piece of software that performs the pretending. It intercepts every instruction a guest operating system issues to the CPU, memory, or devices and decides whether that instruction can execute directly or must be emulated or translated.

Type 1 and Type 2 differ only in where they sit relative to the hardware. A Type 1 hypervisor boots first and owns the machine; guest operating systems become its only workloads. A Type 2 hypervisor is started by an already-running host operating system and must ask that host for every hardware service it needs.

> [!NOTE]
> The decisive performance difference is not “speed of the CPU” but the number of context switches and privilege-level crossings required for every I/O operation; Type 1 removes the host OS layer entirely and therefore removes those crossings.

## 2. Why this matters — concrete and current
Amazon EC2 runs on a customized Xen hypervisor (Type 1) that partitions each physical server into hundreds of customer instances; the same physical silicon therefore yields revenue from many tenants simultaneously while maintaining strong isolation.

Google’s internal Titan security chip and its KVM-based fleet rely on Type 1 virtualization to enforce workload separation between production jobs and administrative control planes, a design described in their 2019 OSDI paper on “Borg to Kubernetes” evolution.

VMware Workstation and Oracle VirtualBox (both Type 2) are the standard development environments for kernel engineers who must test drivers against multiple Windows and Linux versions on a single laptop without rebooting.

Microsoft Hyper-V (Type 1) underpins Azure’s largest regions and also ships inside Windows 10/11 as a developer feature, allowing the same binary hypervisor to serve both cloud-scale and desktop-scale use cases.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Privilege rings (Ring 0/3) | Hypervisors must intercept privileged instructions that only Ring 0 can execute.     |
| Context switch            | Every VM entry/exit is a controlled context switch between hypervisor and guest.     |
| Hardware virtualization extensions (Intel VT-x, AMD-V) | Modern Type 1 and Type 2 hypervisors rely on these CPU features to avoid binary translation. |
| Device driver model       | Understanding how a guest sees virtual versus physical devices clarifies I/O paths.  |

## 4. Building the idea — from intuition to formalism

### Step 1 — A machine can run only one operating system at a time unless something arbitrates
An operating system assumes it owns the entire machine. When two operating systems run on the same hardware they will each try to write to the same physical addresses and configure the same devices, producing immediate conflicts.

Consider a developer who wants to test a Linux driver while also running Windows applications. Without arbitration, both kernels would attempt to program the same interrupt controller.

Formally, the physical address space and I/O port space are singletons:  
$$P = \{ \text{all physical addresses and ports} \}$$  
must be multiplexed among guests \(G_1, G_2, \dots, G_n\).

> [!WARNING]
> Treating the hypervisor as “just another OS process” hides the fact that it must protect its own code and data from guests that run in Ring 0 inside their virtual machines.

### Step 2 — The hypervisor is the sole owner of the real hardware
The hypervisor boots first, initializes the MMU and interrupt controllers, and then creates isolated execution environments for each guest. Guests never see raw hardware registers; they see only the virtual devices the hypervisor emulates.

A concrete illustration: Xen’s dom0 domain starts, then domU guests are launched; each domU receives a virtual NIC whose packets are actually transmitted by dom0’s real driver.

The invariant is that the hypervisor’s code and page tables are never directly accessible to any guest.

### Step 3 — Type 1 places the hypervisor at the root of the boot chain
A Type 1 hypervisor is loaded by the firmware (BIOS/UEFI) and runs in the most privileged mode. The host operating system, if any, becomes merely the first guest.

ESXi boots from a small VFAT partition, loads the vmkernel directly, then starts the management console as a Linux-based virtual machine.

### Step 4 — Type 2 places the hypervisor inside an existing operating system
A Type 2 hypervisor is compiled as a set of kernel modules and user-space daemons that load after the host OS has already claimed the hardware. Every privileged operation must be forwarded through the host kernel.

VirtualBox on Linux loads the `vboxdrv` kernel module; that module then uses the host’s existing drivers to access disks and network cards.

### Step 5 — The architectural difference appears in the I/O path length
In Type 1 the guest → hypervisor → device path is short. In Type 2 the path is guest → hypervisor → host kernel → device, adding at least one extra privilege transition per I/O.

### Step 6 — The textbook distinction follows directly from the boot and I/O placement
A hypervisor \(H\) is Type 1 if \(H\) executes at system boot with no intervening general-purpose kernel; it is Type 2 otherwise.

## 5. Worked examples — every step shown

**Example 1 — Classifying a bare-metal product**  
*Given:* VMware ESXi 7.0 boots from USB and lists no host OS in its console.  
*Find:* Hypervisor type.  
Step 1: Check whether any general-purpose kernel runs before the hypervisor. ESXi’s vmkernel loads directly from firmware.  
*Why:* Direct firmware load satisfies the Type 1 definition.  
Step 2: Confirm absence of host OS layer. No Windows or Linux kernel owns hardware first.  
**Type 1**

*Reflection:* The classification hinges on boot order, not marketing labels.

**Example 2 — Classifying a desktop product**  
*Given:* VirtualBox 6.1 runs inside Ubuntu 20.04 and uses that Ubuntu kernel to access /dev/sda.  
*Find:* Hypervisor type.  
Step 1: Identify the first kernel that owns hardware. Ubuntu boots first.  
*Why:* Satisfies Type 2 placement.  
Step 2: Verify hypervisor is loaded later as modules. vboxdrv.ko is inserted after boot.  
**Type 2**

*Reflection:* The same VirtualBox binary could theoretically be recompiled as a Type 1 component, but the distribution model keeps it Type 2.

**Example 3 — Estimating I/O latency difference**  
*Given:* A 4K random read workload on NVMe. Type 1 overhead measured at 8 µs, Type 2 at 22 µs.  
*Find:* Extra crossings introduced by Type 2.  
Step 1: Subtract baseline device latency (≈ 3 µs).  
*Why:* Isolates software overhead.  
Step 2: Remaining difference (11 µs) is attributable to host-kernel transitions.  
**Type 2 adds two extra ring transitions per I/O**

*Reflection:* Numbers vary with hardware acceleration (IOMMU, SR-IOV), but the structural extra layer remains.

**Example 4 — Choosing for a CI farm**  
*Given:* 200 build agents, each needing a clean Windows environment nightly. Hardware is a rack of dual-socket servers.  
*Find:* Preferred hypervisor type.  
Step 1: Calculate density requirement. Type 1 permits 60 VMs per host; Type 2 permits 45 because of host OS overhead.  
*Why:* Production density favors Type 1.  
Step 2: Evaluate management surface. Type 1 exposes only the hypervisor API; Type 2 exposes full host OS.  
**Select Type 1 (Xen or Hyper-V)**

*Reflection:* The decision is driven by operational surface area, not raw CPU speed.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming Type 2 is always slower | Ignores hardware virtualization extensions and paravirtual drivers that close the gap | Benchmark the actual workload with and without VT-x/AMD-V enabled |
| Calling containers “Type 3 hypervisors” | Containers share the host kernel; they are not hypervisors at all | Remember a hypervisor must virtualize hardware, not merely isolate processes |
| Believing Type 1 cannot run a desktop OS | Some Type 1 products (Hyper-V with Quick VM) do run on laptops | Distinguish server-oriented Type 1 from desktop-oriented Type 1 |
| Forgetting that Type 2 still needs CPU virtualization support | Modern CPUs refuse to run Ring 0 guests without VT-x | Check BIOS settings before installing any hypervisor |
| Equating “hosted” with “Type 2” without checking boot order | Some exotic setups boot a minimal hypervisor then load a host OS inside it | Trace the actual boot sequence with firmware logs |
| Ignoring driver signing requirements on Type 2 | Host kernel may reject unsigned hypervisor modules | Use vendor-signed modules or disable driver signature enforcement only in test environments |
| Assuming live migration works identically | Type 1 usually integrates migration in the hypervisor; Type 2 often relies on host tools | Read the migration protocol documentation for the specific product |

## 7. The textbook-precise statement
A hypervisor is a privileged software layer that implements a faithful emulation of the hardware interface for each virtual machine while multiplexing the physical resources among them. It is classified as Type 1 if it executes directly on the physical hardware with no intervening host operating system, and Type 2 if it is installed as an application or kernel extension inside an existing host operating system (Silberschatz, Galvin, Gagne, *Operating System Concepts*, 10e, §18.2).

## 8. Visual — diagram or schematic

```text
Type 1 (bare-metal)                  Type 2 (hosted)
+-------------------+               +-------------------+
|   Hypervisor      |               |   Host OS         |
|  (Xen, ESXi, KVM) |               | (Linux/Windows)   |
+-------------------+               +-------------------+
|   Hardware        |               |   Hypervisor      |
+-------------------+               |  (VirtualBox,     |
                                    |   VMware WS)      |
                                    +-------------------+
                                    |   Hardware        |
                                    +-------------------+
```

Label key: The horizontal line in Type 1 is the first software-to-hardware boundary; in Type 2 two such boundaries exist.

## 9. The memory technique

1. **The hook** — Picture a Type 1 hypervisor as the landlord who owns the building and rents apartments directly; a Type 2 hypervisor is the tenant who sublets rooms inside an apartment they themselves rent.
2. **What to overlearn** — Type 1 boots from firmware; Type 2 boots after a host OS; every extra kernel crossing adds latency.
3. **Spaced-repetition schedule** — Review classification criteria at 1 day, 3 days, 7 days, 16 days, 35 days after first study.
4. **First-principles fallback** — Re-derive the type by asking only one question: “Which kernel owns the physical interrupt controller at power-on?”

## 10. What this unlocks
Mastery of hypervisor types is the prerequisite for understanding modern container runtimes, unikernels, confidential computing (SEV-SNP, TDX), and cloud orchestration layers.

- Next: OS-level virtualization and cgroups/namespaces
- Next: Paravirtualization versus full virtualization
- Next: Live migration and checkpoint/restart mechanisms
- Next: Hardware-assisted I/O virtualization (SR-IOV, virtio)

## 11. Self-check — five questions, no answers
1. A new firmware feature boots a minimal Linux kernel that then loads a hypervisor binary. Is the resulting hypervisor Type 1 or Type 2?
2. On the same physical server, a Type 1 hypervisor sustains 1.2 M 4K IOPS while a Type 2 sustains 0.9 M. What is the most likely source of the 25 % difference?
3. Why can a Type 2 hypervisor never expose a virtual machine whose kernel is more privileged than the host kernel?
4. Intel VT-x root mode is occupied by the hypervisor. Which hypervisor type must therefore occupy root mode at all times when any guest is running?
5. A security audit discovers that a management daemon running inside a Type 2 host OS can read the memory of every guest. Would the same attack surface exist if the identical hypervisor were re-architected as Type 1?