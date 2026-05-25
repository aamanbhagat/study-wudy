## What it is
Equivalent fractions are different ways of writing the exact same numerical value by scaling the numerator (top) and denominator (bottom) by the same multiplicative factor. Simplifying a fraction means finding the equivalent fraction with the smallest possible integer values, which is achieved by dividing out their greatest common divisor (GCD).

## Why it matters
In physics and engineering, you will constantly manipulate ratios—like thrust-to-weight ratios or dimensional unit conversions. Keeping these ratios unsimplified leads to massive, error-prone calculations. More importantly, in algebra, simplifying rational expressions (fractions with variables) is mandatory to solve equations. If you cannot simplify numbers now, you will be entirely unable to simplify polynomials later. 

## When to study it
You must already understand basic multiplication, division, and the concept of prime factorization. If you cannot confidently find the factors of an integer or break a number down into its prime components, stop and review primes and factors first. 

## How to study it (step by step)
1. **Visualize the geometry:** Draw physical representations (rectangles or circles) to visually prove to yourself that cutting a shape into more pieces does not change the total area shaded.
2. **Master the "Disguised 1":** Write out equations showing how multiplying a fraction by $2/2$, $3/3$, or $x/x$ is mathematically identical to multiplying by $1$.
3. **Use the X-Ray method:** Take a complex fraction (e.g., $24/36$) and write out the full prime factorization of both the numerator and denominator.
4. **Cancel common primes:** Cross out the prime factors that appear on both the top and bottom. Observe how the fraction shrinks to its simplest form.
5. **Optimize with the GCD:** Practice finding the Greatest Common Divisor of the top and bottom directly, allowing you to simplify in one single division step instead of multiple prime cancellations. 
6. **Drill:** Solve 15 simplification problems, ranging from small numbers ($8/12$) to larger ones ($144/256$).

## Key ideas, with intuition

**The Identity Property of Multiplication**
Multiplying any number by $1$ changes its appearance, but never its value. Because any non-zero number divided by itself is $1$ (e.g., $3/3 = 1$), multiplying a fraction by $\frac{c}{c}$ creates an equivalent fraction:
$$ \frac{a}{b} \times 1 = \frac{a}{b} \times \frac{c}{c} = \frac{a \cdot c}{b \cdot c} $$
This is the engine behind all equivalent fractions. 

**Reversibility (Simplification)**
If multiplying the top and bottom by $c$ scales a fraction up, dividing the top and bottom by $c$ scales it down. This is mathematically valid because dividing by $c/c$ is still just dividing by $1$. This only yields integers if $c$ is a common factor of both $a$ and $b$.

**Prime Factorization is the X-Ray**
To simplify $\frac{a}{b}$ completely, you must break $a$ and $b$ into their atomic prime components. Any prime number that appears in both the numerator and denominator forms a "disguised 1" and cancels out. When no common primes remain, the fraction is in its absolute simplest form.

## Worked example
**Problem:** Simplify the fraction $\frac{60}{84}$ to its lowest terms.

**Step 1: Prime factorize the numerator.**
$60 = 6 \times 10 = (2 \times 3) \times (2 \times 5) = 2^2 \cdot 3 \cdot 5$

**Step 2: Prime factorize the denominator.**
$84 = 2 \times 42 = 2 \times (6 \times 7) = 2 \times (2 \times 3) \times 7 = 2^2 \cdot 3 \cdot 7$

**Step 3: Write the fraction in factored form.**
$$ \frac{60}{84} = \frac{2 \cdot 2 \cdot 3 \cdot 5}{2 \cdot 2 \cdot 3 \cdot 7} $$

**Step 4: Cancel the common factors.**
The factors $2$, $2$, and $3$ appear on both top and bottom. 
$$ \frac{\not{2} \cdot \not{2} \cdot \not{3} \cdot 5}{\not{2} \cdot \not{2} \cdot \not{3} \cdot 7} = \frac{5}{7} $$

**Reflection:** By breaking the numbers down to their prime "atoms," we guarantee we haven't missed any hidden common factors. The remaining numbers ($5$ and $7$) share no common divisors other than $1$. The fraction is fully simplified.

## Diagrams

```text
Equivalent fractions represent the same geometric area.

1/2 (One out of two blocks shaded)
+---------+---------+
|/////////|         |
|/////////|         |
+---------+---------+

2/4 (Two out of four blocks shaded)
+----+----+----+----+
|////|////|    |    |
|////|////|    |    |
+----+----+----+----+

4/8 (Four out of eight blocks shaded)
+--+--+--+--+--+--+--+--+
|//|//|//|//|  |  |  |  |
|//|//|//|//|  |  |  |  |
+--+--+--+--+--+--+--+--+

Notice the physical boundary of the shaded region NEVER moves. 
We are only changing the resolution of the grid.
```

## Memory technique — remember this forever

1. **The Hook:** "Multiply by a disguised 1." Whenever you change a fraction's numbers without changing its value, you are just multiplying or dividing by a ninja $1$ (like $3/3$ or $7/7$).
2. **The Facts to Overlearn:** 
   * $\frac{a \cdot c}{b \cdot c} = \frac{a}{b}$ (for $c \neq 0$).
   * A fraction $\frac{a}{b}$ is in simplest form if and only if $\text{GCD}(a,b) = 1$.
3. **Spaced-repetition schedule:** Review this concept and do 3 practice problems at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **The First Principles Pathway:** If you forget the algebraic rules, draw a rectangle. Cut it in half ($1/2$). Cut each half in half again. You now have $2$ out of $4$ pieces ($2/4$). The amount of the rectangle didn't change, only the number of cuts. This proves that $\frac{1}{2} = \frac{1 \cdot 2}{2 \cdot 2} = \frac{2}{4}$.

## Common mistakes

* **Adding instead of multiplying:** Students sometimes think $\frac{2+1}{3+1}$ is equivalent to $\frac{2}{3}$. It is not. $\frac{3}{4} \neq \frac{2}{3}$. You can only scale fractions by multiplication and division, never by addition or subtraction.
* **Canceling terms instead of factors:** When faced with $\frac{2 + 3}{2}$, a common fatal error is to cross out the $2$s to leave just $3$. This is completely illegal. $\frac{5}{2}$ is $2.5$, not $3$. You can only cancel numbers that are *multiplied* together, never numbers that are *added*.
* **Stopping too early:** Simplifying $\frac{24}{36}$ to $\frac{12}{18}$ and stopping. Always check the final numbers. Both $12$ and $18$ are even, meaning they still share a factor of $2$ (and $3$). You must continue until the GCD is $1$.

## Self-check

1. Simplify $\frac{42}{56}$ to its lowest terms.
2. Find the missing numerator that makes these fractions equivalent: $\frac{5}{13} = \frac{?}{169}$.
3. Simplify the following fraction by fully prime factoring the numerator and denominator first: $\frac{315}{441}$.