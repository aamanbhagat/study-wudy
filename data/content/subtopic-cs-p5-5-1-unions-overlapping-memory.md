## What it is
A `union` is a user-defined data type in C that allows you to store different data types in the same memory location. Unlike a `struct`, which allocates memory for all its members sequentially, a `union` allocates only enough memory to hold its largest member. Consequently, only one member of the union can hold a value at any given time.

## Why it matters
Unions are critical for low-level systems programming where you must interpret a single block of memory in multiple ways. This appears in network programming (parsing protocol headers), graphics (representing a pixel as an integer or as RGBA components), and embedded systems for aerospace (reading hardware registers that have different meanings depending on a status flag). They are also used for a technique called "type punning," a performance optimization that reinterprets the bit pattern of one type as another, avoiding slower conversions.

## When to study it
Before tackling unions, you must have a solid understanding of C `structs`, pointers and memory addresses, the `sizeof` operator, and fundamental data types (`int`, `char`, `float`, `double`) including their typical sizes in memory. Without this foundation, the concept of overlapping memory will be abstract and confusing.

## How to study it (step by step)
1.  **Contrast with `struct`:** Write a program that defines a `struct` and a `union` with the exact same members (e.g., an `int`, a `long`, and a `double`). Print the result of `sizeof` for both. Observe that the `struct`'s size is the sum of its members' sizes (plus padding), while the `union`'s size is the size of its largest member.
2.  **Witness the overlap:** Create a `union` with an `int` and a `char` array of size 4. Assign a value to the `int` member (e.g., `0x41424344` in hexadecimal). Then, iterate through the `char` array and print each character. You will see the individual bytes of the integer printed as characters ('D', 'C', 'B', 'A' on a little-endian system). This directly demonstrates the shared memory.
3.  **Implement a tagged union:** The safe way to use a union is to know which member is active. Create a `struct` that contains two fields: an `enum` to act as a "tag" (e.g., `IS_INT`, `IS_FLOAT`) and a `union` that holds the possible data types. This is called a tagged or discriminated union.
4.  **Write a safe access function:** Write a function that takes a pointer to your tagged union struct. The function should use a `switch` statement on the tag (`enum`) to correctly access and print the active member of the inner `union`. This enforces safe usage.
5.  **Explore type punning:** Define a `union` with a `float` and a `uint32_t`. Assign a value to the `float` member. Then, print the value of the `uint32_t` member in hexadecimal. This reveals the underlying IEEE 754 bit-level representation of the floating-point number, a classic and powerful use of unions.

## Key ideas, with intuition
1.  **A Single Storage Space:** Think of a `union` as a single box. You can put a book in it, or you can put a laptop in it, but you can't put both in at the same time. The box must be large enough to hold the biggest item you might want to store (the laptop). The size of the `union` is therefore the size of its largest member.
    $$ \text{sizeof}(\text{union U}) = \max(\text{sizeof}(\text{member}_1), \text{sizeof}(\text{member}_2), \dots) $$
    (Plus potential padding for alignment).

2.  **Shared Starting Line:** All members of a union start at the exact same memory address. When you write to `u.my_int`, you are placing bytes at address `&u`. When you then write to `u.my_char`, you are placing a byte at the *very same address* `&u`, overwriting whatever was there before.
    $$ \&(\text{u.member}_1) = \&(\text{u.member}_2) = \dots = \&u $$

3.  **The Active Member Rule:** C specifies that you should only read from the member of the union that was most recently written. Writing to `u.a` makes `a` the active member. Reading from `u.b` after this (when `b` is not the active member) is technically implementation-defined behavior. The exception is for inspecting the object representation, as in type punning.

4.  **The Tagged Union Pattern:** Because the compiler doesn't track which union member is active, you must do it yourself. The most robust pattern is to wrap the union in a struct alongside a tag variable (usually an `enum`).

    ```c
    typedef enum { INT_TYPE, FLOAT_TYPE } Tag;
    typedef struct {
        Tag type;
        union {
            int i;
            float f;
        } data;
    } TaggedUnion;
    ```
    You *always* check `my_tagged_union.type` before accessing `my_tagged_union.data`.

## Worked example
Let's model a system that can receive a sensor reading as either an integer ID or a floating-point temperature value. A tagged union is perfect for this.

```c
#include <stdio.h>

// 1. The tag: defines what kind of data we are holding
typedef enum {
    SENSOR_ID,
    TEMPERATURE
} SensorDataType;

// 2. The data container: a struct holding the tag and the union
typedef struct {
    SensorDataType type;
    union {
        int id;
        float temp_celsius;
    } value;
} SensorReading;

// 3. A function to safely print the reading based on its tag
void print_sensor_reading(SensorReading reading) {
    switch (reading.type) {
        case SENSOR_ID:
            printf("Sensor Type: ID, Value: %d\n", reading.value.id);
            break;
        case TEMPERATURE:
            printf("Sensor Type: Temperature, Value: %.2f C\n", reading.value.temp_celsius);
            break;
        default:
            printf("Unknown sensor type.\n");
    }
}

int main() {
    // 4. Create and initialize a reading for a sensor ID
    SensorReading reading1;
    reading1.type = SENSOR_ID;
    reading1.value.id = 101;
    print_sensor_reading(reading1);

    // 5. Re-use the same variable to store a temperature reading
    SensorReading reading2;
    reading2.type = TEMPERATURE;
    reading2.value.temp_celsius = 25.7f;
    print_sensor_reading(reading2);

    // 6. Demonstrate the memory size
    printf("\nSize of SensorReading: %zu bytes\n", sizeof(SensorReading));
    printf("Size of int: %zu bytes\n", sizeof(int));
    printf("Size of float: %zu bytes\n", sizeof(float));
    printf("Size of enum: %zu bytes\n", sizeof(SensorDataType));


    return 0;
}
```

### Reflection
- **Step 1 & 2:** We defined the possible states (`SENSOR_ID`, `TEMPERATURE`) and then bundled the state (`type`) with the data container (`value`). This is the core of the tagged union pattern.
- **Step 3:** The `print_sensor_reading` function is the gatekeeper. It refuses to access the union's data without first checking the tag, preventing misinterpretation of the underlying bytes.
- **Step 4 & 5:** We demonstrate how to correctly populate the `SensorReading` struct: first set the tag, then set the corresponding union member.
- **Step 6:** The output for sizes will show that `sizeof(SensorReading)` is roughly `sizeof(enum) + sizeof(float)` (its largest member), not `sizeof(enum) + sizeof(int) + sizeof(float)`. This confirms the memory efficiency.

## Diagrams
Here is the memory layout for a `struct` versus a `union`, each containing a 4-byte `int` and a `char`. Assume a system where `int` is 4 bytes and `char` is 1 byte.

**Struct Memory Layout (`struct S { int i; char c; };`)**

Members are laid out sequentially in memory (padding may be added for alignment).

```text
Memory Address
&s + 0  ┌───────────┐
        │ i (byte 0)│
&s + 1  ├───────────┤
        │ i (byte 1)│
&s + 2  ├───────────┤
        │ i (byte 2)│
&s + 3  ├───────────┤
        │ i (byte 3)│
&s + 4  ├───────────┤
        │ c (byte 0)│
&s + 5  ├───────────┤
        │ padding   │
...     └───────────┘
Total size >= 5 bytes (likely 8 due to alignment)
```

**Union Memory Layout (`union U { int i; char c; };`)**

Members overlap, starting at the same memory address.

```text
Memory Address
&u + 0  ┌───────────┐
        │ i (byte 0)│  <--+
        │ c (byte 0)│  <--+-- Both start here
&u + 1  ├───────────┤
        │ i (byte 1)│
&u + 2  ├───────────┤
        │ i (byte 2)│
&u + 3  ├───────────┤
        │ i (byte 3)│
        └───────────┘
Total size = 4 bytes (size of largest member, int)
```

## Memory technique — remember this forever
1.  **The Mnemonic Story:** Think of a **Union Hall**. It's one single, large room. You can set it up for a wedding banquet (`float reception_budget`), a political rally (`int voter_count`), or a small book club (`char club_initial`). You can only use the hall for **one event at a time**, and the hall's size must accommodate the largest possible event (the wedding). A `struct` is like a house with separate, dedicated rooms for each purpose.

2.  **Must Overlearn:**
    *   `sizeof(union U) == sizeof(largest_member_of_U)` (plus padding).
    *   `&u.member1 == &u.member2` for any members of union `u`.
    *   The **Tagged Union Pattern:** `struct { enum tag; union { ... } data; }`. This is the safe way.

3.  **Spaced Repetition Schedule:**
    *   Review this lesson in: **1 day**.
    *   Then: **3 days**.
    *   Then: **7 days**.
    *   Then: **16 days**.
    *   Final lock-in: **35 days**.

4.  **First Principles Pathway:** If you forget how a union works, you can always rebuild it.
    *   Declare `union U { int i; char c; };` and `struct S { int i; char c; };`.
    *   Print `sizeof(U)` and `sizeof(S)`. The difference will remind you about memory allocation.
    *   Declare `union U u;` and print the addresses `(void*)&u.i` and `(void*)&u.c`. Seeing they are identical will remind you of the memory overlap.

## Common mistakes
1.  **Struct-like Thinking:** Assuming you can store a valid `int` and a valid `float` in a union simultaneously. Writing to one member invalidates all others.
2.  **Forgetting the Tag:** Using a union for different data types without a separate variable to track which type is currently stored. This leads to reading memory as the wrong type, resulting in garbage values or crashes.
3.  **Ignoring Endianness:** When using unions for type punning (e.g., reading an `int` as a `char` array), the byte order (little-endian vs. big-endian) of the machine will determine the order of the bytes in the `char` array. Forgetting this leads to non-portable code.
4.  **Mishandling Pointers:** Storing pointers to different types in a union can be dangerous. If you store a `char*` and then read it as an `int*`, dereferencing that pointer will almost certainly cause a segmentation fault.

## Self-check
1.  What is the `sizeof` a `union` containing a `char c;`, a `short s;`, and a `long long l;` on a typical 64-bit system? Why?
2.  Implement a tagged union named `Vector` that can represent either a 2D vector (`float x, y;`) or a 3D vector (`float x, y, z;`). Write a function `float magnitude(Vector v);` that correctly calculates the magnitude based on the vector's dimension.
3.  Using a union for type punning, write a C function `int get_exponent(float f);` that takes a single-precision float and returns its biased exponent as an integer. You will need to bit-shift and mask the integer representation of the float. Do not use the `frexpf` library function.