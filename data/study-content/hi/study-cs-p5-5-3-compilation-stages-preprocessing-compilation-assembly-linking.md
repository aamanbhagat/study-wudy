## 1. The one-sentence answer
**Compilation stages break the transformation of human-readable source code into a runnable executable into four sequential, well-defined phases: preprocessing, compilation, assembly, and linking.**

Pehla stage preprocessing mein preprocessor directives jaise `#include` aur `#define` ko handle kiya jaata hai, jo source file ko expanded text mein convert karta hai. Compilation phase us expanded text ko architecture-specific assembly language mein badalta hai. Assembly phase assembly code ko relocatable object code (machine instructions with unresolved symbols) mein translate karti hai. Last stage linking multiple object files aur libraries ko combine karke ek single executable binary banati hai jismein sab symbols resolve ho jaate hain.

Iska core idea yeh hai ki har stage ek alag tool (cpp, cc1, as, ld) ke through hota hai aur har stage ka output agle stage ka input ban jaata hai, jisse build system ko fine-grained control milta hai.

> [!NOTE]
> Sabse badi aha yeh hai ki ek hi `.c` file se final binary tak jaane mein actually teen intermediate files (`.i`, `.s`, `.o`) ban sakte hain, aur linking tabhi hoti hai jab multiple `.o` files ya external libraries involved hon.

## 2. Why this matters — concrete and current
Linux kernel build system `make` har `.c` file ke liye alag-alag preprocessing aur compilation steps run karta hai taaki parallel builds (`-j`) efficiently ho sakein; yeh directly GCC ke four-stage pipeline par depend karta hai.

CUDA toolkit mein NVIDIA ke `nvcc` compiler pehle C++ code ko host aur device parts mein split karta hai, phir host part ko normal GCC pipeline se guzarta hai aur device part ko PTX assembly stage tak le jaata hai.

Modern WebAssembly toolchain (Emscripten) source C++ ko LLVM IR tak compile karta hai, phir us IR ko assembly aur linking stages se guzarkar `.wasm` binary banata hai jo browser mein run hota hai.

Apple Silicon par Xcode build system har Objective-C file ke liye clang ke preprocessing aur compilation steps ko alag karta hai taaki incremental builds sirf modified files par hi chalein, jo large apps jaise Final Cut Pro ke liye critical hai.

Android NDK mein `ndk-build` multiple `.so` shared libraries banane ke liye linking stage ko carefully control karta hai, jisse cross-architecture symbol resolution sahi se ho.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| C preprocessor directives | Preprocessing stage inko expand karta hai                |
| Assembly language mnemonics | Compilation stage inko generate karta hai                |
| Symbol table & relocation | Linking stage symbols ko resolve aur relocate karta hai  |
| Object file format (ELF/COFF) | Assembly aur linking dono is format par kaam karte hain |

Agar aapko upar ke koi bhi concept clear nahi hain to pehle unko revise karo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Preprocessing expands directives
Preprocessor source code ko padhta hai aur saare `#` wale directives ko replace karta hai bina kisi syntax check kiye.  
Example: `main.c` mein `#include <stdio.h>` aur `#define MAX 100` hone par output `.i` file mein actual stdio.h ka content aur har `MAX` ki jagah `100` aa jaata hai.  
Formal statement: Preprocessing produces a single translation unit \( T \) from source \( S \) by applying macro expansion and file inclusion rules defined in ISO C standard §6.10.  
> [!WARNING] Agar macro expansion galat ho jaaye (circular macro) to pura compilation fail ho sakta hai bina kisi useful error ke.

### Step 2 — Compilation produces assembly
Compiler translation unit \( T \) ko lexical, syntax aur semantic analysis ke baad architecture-specific assembly code mein convert karta hai.  
Example: `int x = MAX + 1;` ka assembly version `movl $101, -4(%rbp)` ban jaata hai.  
Formal statement: Compilation is the function \( C: T \to A \) where \( A \) is a sequence of assembly statements for a given target ISA.  
> [!WARNING] Agar target architecture galat specify ki (x86 vs arm64) to assembly code incompatible ho jaayega.

### Step 3 — Assembly emits relocatable object code
Assembler assembly statements ko machine instructions mein translate karta hai lekin external symbols ko abhi bhi unresolved chhod deta hai.  
Example: `call printf` instruction object file mein ek relocation entry ke saath store hoti hai.  
Formal statement: Assembly produces an object file \( O \) containing sections `.text`, `.data`, symbol table \( Sym \), and relocation table \( Rel \).  
> [!WARNING] Agar symbol table galat bani to linker baad mein undefined reference error dega.

### Step 4 — Linking resolves symbols across objects
Linker multiple object files aur static libraries ko combine karta hai, har relocation entry ko sahi address par patch karta hai.  
Example: `main.o` ka `printf` reference `libc.a` ke definition se resolve hota hai.  
Formal statement: Linking computes final addresses and produces executable \( E = L(O_1, O_2, \dots, Lib) \).  
> [!WARNING] Agar two libraries mein same symbol define ho to linker order-dependent conflict create kar sakta hai.

### Step 5 — Final executable contains loadable segments
Linker output ek ELF/PE file hota hai jismein program headers, section headers aur entry point defined hote hain jo OS loader seedha use kar sakta hai.  
Formal statement: The resulting binary satisfies the ABI requirements for process creation on the target operating system.

## 5. Worked examples — har step show karo

**Example 1 — Simple macro expansion**  
*Given:* `main.c` containing `#define PI 3.14` and `double r = PI;`.  
*Find:* Preprocessed content.  
Step 1: Preprocessor reads the `#define`.  
Step 2: Replaces every occurrence of `PI` with `3.14`.  
*Why:* Macro substitution happens before any C syntax is examined.  
**Final preprocessed line:** `double r = 3.14;`  

*Reflection:* Yeh example isliye simple thi kyunki koi nested macro nahi tha; general rule yeh hai ki har macro ko textually replace karo.

**Example 2 — Compilation to assembly**  
*Given:* `int add(int a, int b) { return a+b; }` compiled for x86-64.  
*Find:* Assembly output.  
Step 1: Compiler generates function prologue.  
Step 2: Emits `addl %esi, %edi`.  
Step 3: Emits return instruction.  
*Why:* Each C expression maps to one or more ISA instructions.  
**Final assembly snippet:**  
```asm
add:
    addl %esi, %edi
    movl %edi, %eax
    ret
```  
*Reflection:* Assembly stage already shows register usage; later optimisation passes can change this.

**Example 3 — Assembly producing relocation**  
*Given:* `extern int global; int f() { return global; }`.  
*Find:* Object file relocation entry.  
Step 1: Assembler sees `global` is undefined.  
Step 2: Creates `R_X86_64_32` relocation for the memory operand.  
*Why:* Address of `global` is unknown until link time.  
**Final answer:** Object file contains one relocation record pointing at the instruction that reads `global`.  

*Reflection:* Relocations are the reason `.o` files are not directly executable.

**Example 4 — Linking two objects**  
*Given:* `main.o` calls `foo()` defined in `lib.o`.  
*Find:* Final executable after linking.  
Step 1: Linker reads both symbol tables.  
Step 2: Matches `foo` definition with its call site.  
Step 3: Patches the call instruction with correct offset.  
*Why:* Linking is the only stage that sees the complete program.  
**Final answer:** Single executable with resolved `call foo` instruction at a concrete address.  

*Reflection:* Order of object files on the linker command line can affect which definition is chosen when duplicates exist.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting `-c` flag              | Student expects executable but gets `.o`    | Always use `-c` when you only want object files |
| Macro side-effects                | `#define SQR(x) x*x` expands wrongly        | Use parentheses: `#define SQR(x) ((x)*(x))` |
| Missing library at link time      | Symbol defined in `.a` but not passed to ld | Explicitly list `-l` flags after objects     |
| Wrong architecture flags          | `-m32` vs `-m64` mismatch                   | Keep consistent flags across all stages      |
| Circular `#include`               | Header A includes B and B includes A        | Use include guards or forward declarations   |
| Undefined reference to `main`     | Linker cannot find entry point              | Ensure one `.c` file defines `main`          |
| Stripped debug symbols too early  | `-s` flag used before final binary          | Apply stripping only in release builds       |

## 7. The textbook-precise statement
Compilation is the sequence of four transformations  
\[ S \xrightarrow{\text{preprocess}} T \xrightarrow{\text{compile}} A \xrightarrow{\text{assemble}} O \xrightarrow{\text{link}} E \]  
where each arrow denotes a distinct program (cpp, cc1, as, ld) whose contract is defined by the target ABI and the ISO C standard. All hypotheses on macro hygiene, relocation kinds, and symbol resolution order must be satisfied for the final executable \( E \) to be well-formed. (See Aho, Lam, Sethi & Ullman, *Compilers: Principles, Techniques, and Tools*, 2e, §1.2 and GCC Internals manual §2.)

## 8. Visual — diagram or schematic
```text
source.c
   │
   ▼  cpp (preprocess)
source.i
   │
   ▼  cc1 (compile)
source.s
   │
   ▼  as (assemble)
source.o
   │
   ▼  ld (link)  +  libc.a  other.o
executable
```

## 9. The memory technique
**The hook:** Socho ek chain reaction jaise kitchen assembly line: raw ingredients (source) → chopped & measured (preprocess) → cooked recipe (compile) → plated dish (assemble) → final plated meal served to customer (link).

**What to overlearn:**  
- Preprocess → `.i`  
- Compile → `.s`  
- Assemble → `.o`  
- Link → executable  

**Spaced-repetition schedule:** Review the four-stage names after 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback:** Agar order bhool jaaye to yaad karo “source text ko pehle expand karna padta hai, phir usko machine code mein badalna padta hai, phir usko address dena padta hai”.

## 10. What this unlocks
Yeh stages samajh lene ke baad aap build scripts, Makefiles, CMake custom commands, compiler optimisation flags, static vs dynamic linking, aur even linker scripts ko confidently design kar sakte ho.

- Incremental build systems (Ninja, Bazel)  
- Link-time optimisation (LTO)  
- Position-independent code (PIC) for shared libraries  
- Cross-compilation toolchains  

## 11. Self-check — five questions, no answers
1. Agar aap sirf preprocessing stage run karna chahte ho bina compilation kiye, kaunsa GCC flag use karoge?  
2. Ek `.o` file mein relocation entries kyun hoti hain?  
3. Macro `#define MAX 100` aur `const int MAX = 100;` mein preprocessing stage ke hisaab se kya farak hai?  
4. Agar do `.o` files mein ek hi global variable define ho to linker kya karega?  
5. `-Wl,--as-needed` flag kis stage ko affect karta hai aur kyun useful hai?