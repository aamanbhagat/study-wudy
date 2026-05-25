## 1. What it is — in plain English

Imagine you have a number, let's say 100. And you want to know what power you need to raise the number 10 to, to get 100. The answer is 2, because $10^2 = 100$. A logarithm is just a fancy way of asking this question: "What power do I need?"

When we talk about the "common logarithm," we're specifically asking this question for the base number 10. So, if you see "$\log 100$", it's silently asking "10 to what power gives me 100?" The answer is 2. It's like a special button on your calculator that always assumes you're talking about powers of 10.

Now, the "natural logarithm" is the same idea, but it uses a very special and important number as its base, not 10. This number is called *e*, and it's approximately 2.71828. So, if you see "$\ln x$", it's asking "what power do I need to raise *e* to, to get $x$?" It's called "natural" because this number *e* pops up naturally in many growth processes and in advanced mathematics like calculus.

Think of it like this: if an exponential function ($10^x$ or $e^x$) is like building something up, logarithms ($\log_{10} x$ or $\ln x$) are like taking it apart to find the original blueprint – specifically, the power that was used. They are inverse operations, meaning they "undo" each other, just like subtraction undoes addition or division undoes multiplication.

## 2. Why it matters — real-world applications

Logarithms, especially common and natural logs, are not just abstract mathematical concepts; they are fundamental tools for understanding and quantifying phenomena across science, engineering, and finance. They allow us to compress vast ranges of numbers into manageable scales and describe continuous growth and decay.

1.  **Measuring Intensity (Common Log - $\log_{10}$):**
    *   **Sound (Decibels):** The human ear perceives sound intensity logarithmically. The decibel (dB) scale uses base-10 logarithms to measure sound levels. A 10 dB increase represents a tenfold increase in sound power. This is crucial in audio engineering, acoustics, and noise control.
    *   **Earthquakes (Richter Scale):** The Richter scale, used to measure the magnitude of earthquakes, is a base-10 logarithmic scale. An earthquake of magnitude 7 is ten times more powerful than a magnitude 6 earthquake. This allows seismologists to quantify and compare earthquakes ranging from tiny tremors to catastrophic events on a single, understandable scale.
    *   **Acidity (pH Scale):** In chemistry, the pH scale measures the acidity or alkalinity of a solution. It's defined as the negative base-10 logarithm of the hydrogen ion concentration ($pH = -\log_{10}[H^+]$). This allows chemists to easily work with very small concentrations that vary over many orders of magnitude.

2.  **Growth, Decay, and Finance (Natural Log - $\ln x$):**
    *   **Population Dynamics & Biology:** Natural logarithms are essential for modeling continuous growth and decay processes. For example, bacterial growth in a petri dish or the decay of a drug in the bloodstream often follow exponential patterns that are naturally described using base *e* and thus analyzed with the natural logarithm.
    *   **Radioactive Decay (Physics):** The decay of radioactive isotopes, a process fundamental to carbon dating and nuclear physics, follows an exponential decay model $N(t) = N_0 e^{-\lambda t}$. The natural logarithm is used to calculate half-lives or determine the age of ancient artifacts by solving for $t$.
    *   **Compound Interest & Finance:** When interest is compounded continuously, the formula $A = Pe^{rt}$ (where A is the final amount, P is the principal, r is the annual interest rate, and t is time) arises. The natural logarithm is used to solve for any of these variables, for example, to find out how long it takes for an investment to double.
    *   **Machine Learning (e.g., Logistic Regression):** In machine learning, the natural logarithm appears prominently in algorithms like logistic regression, which models the probability of a binary outcome. The "log-odds" (the natural logarithm of the odds ratio) are often used because they transform probabilities (which are bounded between 0 and 1) into a continuous range from negative infinity to positive infinity, simplifying mathematical analysis and optimization.

## 3. Prerequisites — what you must know first

Before diving deep into common and natural logarithms, ensure you have a solid grasp of these foundational concepts:

*   **Exponents and Exponential Functions:** Understanding what $b^x$ means, especially for integer, rational, and irrational exponents.
*   **Rules of Exponents:** How to multiply powers with the same base ($b^m \cdot b^n = b^{m+n}$), divide powers ($b^m / b^n = b^{m-n}$), raise a power to a power ($(b^m)^n = b^{mn}$), and handle negative and zero exponents ($b^0 = 1$, $b^{-x} = 1/b^x$).
*   **Definition of a Logarithm (General Base):** The fundamental relationship that $b^y = x \iff \log_b x = y$. This is the core idea that logarithms are "the inverse of exponentiation."
*   **Inverse Functions:** What it means for two functions to be inverses of each other (e.g., $f(g(x)) = x$ and $g(f(x)) = x$), and how their graphs are reflections across the line $y=x$.
*   **The Number *e*:** An acquaintance with the mathematical constant $e \approx 2.71828$, understanding that it arises naturally in continuous growth and calculus, and is defined as $e = \lim_{n \to \infty} (1 + \frac{1}{n})^n$.
*   **Basic Algebra:** Proficiency in solving linear and simple exponential equations, manipulating expressions, and understanding function notation.

## 4. The core idea — step by step

Let's break down the common and natural logarithms, building from the general concept of a logarithm.

### Step 1: Recap the General Logarithm

**Plain-English Statement:** A logarithm is essentially a question: "What power do I need to raise a specific 'base' number to, in order to get another specific number?" It's the inverse operation of exponentiation.

**Small Concrete Example:** If you see $\log_2 8$, it's asking "2 to what power equals 8?" Since $2^3 = 8$, the answer is 3. So, $\log_2 8 = 3$.

**Formal/Mathematical Version:**
The relationship between an exponential statement and a logarithmic statement is:
$$b^y = x \iff \log_b x = y$$
Here, $b$ is the base (a positive number not equal to 1), $x$ is the argument (a positive number), and $y$ is the exponent or logarithm.

**What Could Go Wrong:** Students often confuse the base $b$ with the argument $x$. Remember, the base is the number being raised to a power, and the argument is the result of that exponentiation. The logarithm *is* the power. Also, the base $b$ must be positive and $b \neq 1$. The argument $x$ must be positive ($x > 0$). You cannot take the logarithm of zero or a negative number.

### Step 2: Introducing the Common Logarithm ($\log_{10}$)

**Plain-English Statement:** The common logarithm is simply a logarithm with a base of 10. Because we use a base-10 number system (decimal system), logarithms with base 10 are very frequently used. So much so that mathematicians often don't bother writing the '10' as a subscript. If you see "$\log$" without any base written, assume it's base 10.

**Small Concrete Example:**
*   $\log 100$ means $\log_{10} 100$. This asks "10 to what power equals 100?" The answer is 2, because $10^2 = 100$.
*   $\log 0.1$ means $\log_{10} 0.1$. This asks "10 to what power equals 0.1?" Since $0.1 = \frac{1}{10} = 10^{-1}$, the answer is -1.

**Formal/Mathematical Version:**
The common logarithm of $x$ is denoted as:
$$\log x \quad \text{or sometimes} \quad \text{Log } x$$
And it is formally defined as:
$$\log x \equiv \log_{10} x$$
This means that if $10^y = x$, then $\log x = y$.

**What Could Go Wrong:** The biggest trap here is forgetting the implied base. If your calculator has a "log" button, it's almost certainly $\log_{10}$. If you're solving a problem and see "log", do not assume it's the natural log or some other base. Always assume 10 unless explicitly stated otherwise.

### Step 3: Why Base 10 is "Common"

**Plain-English Statement:** Our entire number system is built around powers of 10. When we write a number like 345, it means $3 \times 10^2 + 4 \times 10^1 + 5 \times 10^0$. Because of this, base-10 logarithms are incredibly useful for understanding "orders of magnitude" – how many factors of 10 larger or smaller one number is compared to another.

**Small Concrete Example:**
*   A number like 1,000,000 is $10^6$. $\log 1,000,000 = 6$.
*   A number like 0.001 is $10^{-3}$. $\log 0.001 = -3$.
The common logarithm directly tells you the power of 10. This is why scales like the Richter, pH, and Decibel scales use $\log_{10}$—they are designed to compress very large ranges of values into a more manageable scale based on powers of 10.

**Formal/Mathematical Version:**
The utility of $\log_{10} x$ stems from its direct relationship to our decimal number system and scientific notation. For any number $N = a \times 10^k$ where $1 \le a < 10$, we have $\log_{10} N = \log_{10}(a \times 10^k) = \log_{10} a + \log_{10} 10^k = \log_{10} a + k$. The integer part, $k$, is called the characteristic, and $\log_{10} a$ is the mantissa. This neatly separates the order of magnitude ($k$) from the significant digits ($a$).

**What Could Go Wrong:** Not appreciating that "common" doesn't mean "simple" for all contexts, but rather "aligned with our everyday counting system." While simple for powers of 10, it's not always the most "natural" choice in higher mathematics.

### Step 4: Introducing the Natural Logarithm ($\ln x$)

**Plain-English Statement:** The natural logarithm is a logarithm with a very special and fundamental number as its base: *e*. The number *e* is an irrational constant, approximately 2.71828. It's often called "natural" because it frequently appears in descriptions of natural growth, decay, and in calculus. Just like "$\log$" implies base 10, "$\ln$" (pronounced "ell-en") always implies base *e*.

**Small Concrete Example:**
*   $\ln e$ means $\log_e e$. This asks "e to what power equals e?" The answer is 1, because $e^1 = e$.
*   $\ln e^5$ means $\log_e e^5$. This asks "e to what power equals $e^5$?" The answer is 5.
*   $\ln 1$ means $\log_e 1$. This asks "e to what power equals 1?" The answer is 0, because $e^0 = 1$.

**Formal/Mathematical Version:**
The natural logarithm of $x$ is denoted as:
$$\ln x$$
And it is formally defined as:
$$\ln x \equiv \log_e x$$
This means that if $e^y = x$, then $\ln x = y$.

**What Could Go Wrong:** Students sometimes think "natural" means easier or more intuitive. In fact, *e* is an irrational number, so its powers aren't as immediately obvious as powers of 10. The "naturalness" comes from its mathematical properties in calculus, not from its ease of mental calculation. Also, remember that $\ln x$ has the same domain restriction as any other logarithm: $x > 0$.

### Step 5: Why Base *e* is "Natural"

**Plain-English Statement:** The number *e* isn't just a random constant; it's the mathematical constant that describes continuous growth. Imagine an investment that grows by 100% in a year. If it grows once at the end of the year, it doubles. If it grows twice (50% then 50%), it grows more. If it grows continuously, infinitely many times, it grows by a factor of *e*. This continuous growth factor makes *e* and the natural logarithm essential for modeling anything that changes continuously over time, from populations to radioactive decay. In calculus, the derivative of $e^x$ is simply $e^x$, and the derivative of $\ln x$ is $1/x$, which are incredibly elegant and simplify many calculations.

**Small Concrete Example:**
Consider the formula for continuous compound interest: $A = Pe^{rt}$. If you invest $P=1$ dollar at an annual interest rate $r=100\%$ (or 1) for $t=1$ year, compounded continuously, your money grows to $A = 1 \cdot e^{1 \cdot 1} = e \approx \$2.718$. The natural log allows us to solve for $t$ or $r$ in such equations.

**Formal/Mathematical Version:**
The number $e$ is defined as the limit:
$$e = \lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n$$
Its "naturalness" in calculus is highlighted by its derivatives:
$$\frac{d}{dx}(e^x) = e^x$$
$$\frac{d}{dx}(\ln x) = \frac{1}{x}$$
These simple derivatives make $e^x$ and $\ln x$ foundational in differential equations, probability, and many areas of advanced mathematics and applied sciences.

**What Could Go Wrong:** Not appreciating the profound mathematical significance of *e*. It's not just another base; it's a fundamental constant like $\pi$ or $i$. Its appearance in calculus is a key reason it's so widely used in scientific modeling.

### Step 6: The Change of Base Formula

**Plain-English Statement:** Sometimes you have a logarithm in one base (say, base 2) but your calculator only has buttons for $\log_{10}$ (common log) and $\ln$ (natural log). The change of base formula is a powerful tool that lets you convert a logarithm from any base to any other base, which is especially useful for converting to base 10 or base *e* to use a calculator.

**Small Concrete Example:**
Let's say you want to calculate $\log_2 8$. You know the answer is 3. Using the change of base formula with common log:
$\log_2 8 = \frac{\log_{10} 8}{\log_{10} 2} \approx \frac{0.903}{0.301} \approx 3$.
Using the change of base formula with natural log:
$\log_2 8 = \frac{\ln 8}{\ln 2} \approx \frac{2.079}{0.693} \approx 3$.
Both methods give the same correct answer.

**Formal/Mathematical Version:**
The change of base formula states that for any positive numbers $a, b, x$ where $a \neq 1$ and $b \neq 1$:
$$\log_b x = \frac{\log_a x}{\log_a b}$$
The most common applications involve setting $a=10$ or $a=e$:
$$\log_b x = \frac{\log_{10} x}{\log_{10} b} \quad \text{and} \quad \log_b x = \frac{\ln x}{\ln b}$$

**What Could Go Wrong:** A common error is mixing up the numerator and denominator. Remember, the argument of the original logarithm ($x$) goes in the numerator, and the original base ($b$) goes in the denominator. A good mnemonic is "log of the top over log of the bottom." Also, ensure you use the *same* new base ($a$) for both the numerator and denominator.

## 5. Worked examples — multiple, with every step shown

Here are several worked examples to solidify your understanding of common and natural logarithms.

### Example 1: Evaluate a Common Logarithm

**Problem:** Evaluate $\log 10000$.

**Given:** The expression $\log 10000$.
**Want:** The numerical value of the expression.

**Solution:**
1.  **Identify the base:**
    Since no base is explicitly written, it is the common logarithm, meaning the base is 10.
    $$ \log 10000 \equiv \log_{10} 10000 $$
    *This is the definition of the common logarithm.*

2.  **Translate to an exponential question:**
    We are asking: "10 to what power equals 10000?"
    $$ 10^y = 10000 $$
    *This uses the fundamental definition of a logarithm: $\log_b x = y \iff b^y = x$.*

3.  **Express the argument as a power of the base:**
    We know that 10000 can be written as $10 \times 10 \times 10 \times 10$, which is $10^4$.
    $$ 10^y = 10^4 $$
    *This step leverages our knowledge of exponents and powers of 10.*

4.  **Solve for the exponent:**
    Since the bases are the same, the exponents must be equal.
    $$ y = 4 $$
    *This is a direct comparison of exponents.*

**Final Answer:**
$$ \boxed{\log 10000 = 4} $$

**Reflection:** This example was straightforward because the argument (10000) was a perfect power of 10. The key is to remember the implied base of the common logarithm.

---

### Example 2: Evaluate a Natural Logarithm with an Exponential Term

**Problem:** Evaluate $\ln (e^7)$.

**Given:** The expression $\ln (e^7)$.
**Want:** The numerical value of the expression.

**Solution:**
1.  **Identify the base:**
    The notation $\ln$ indicates the natural logarithm, meaning the base is *e*.
    $$ \ln (e^7) \equiv \log_e (e^7) $$
    *This is the definition of the natural logarithm.*

2.  **Translate to an exponential question:**
    We are asking: "*e* to what power equals $e^7$?"
    $$ e^y = e^7 $$
    *This uses the fundamental definition of a logarithm: $\log_b x = y \iff b^y = x$.*

3.  **Solve for the exponent:**
    Since the bases are the same (*e*), the exponents must be equal.
    $$ y = 7 $$
    *This is a direct comparison of exponents.*

**Final Answer:**
$$ \boxed{\ln (e^7) = 7} $$

**Reflection:** This example highlights a crucial property: $\log_b b^x = x$. The logarithm "undoes" the exponentiation when the base of the logarithm matches the base of the exponential term. This is a direct consequence of logarithms and exponentials being inverse functions.

---

### Example 3: Solve an Exponential Equation using Common Logarithm

**Problem:** Solve for $x$: $10^{2x-1} = 50$.

**Given:** The equation $10^{2x-1} = 50$.
**Want:** The value of $x$.

**Solution:**
1.  **Isolate the exponential term (if necessary):**
    The exponential term $10^{2x-1}$ is already isolated on one side of the equation.
    $$ 10^{2x-1} = 50 $$
    *This is an initial check to ensure the equation is ready for the next step.*

2.  **Apply the common logarithm to both sides:**
    Since the base of the exponential term is 10, applying $\log_{10}$ (common log) to both sides will simplify the left side.
    $$ \log(10^{2x-1}) = \log(50) $$
    *Applying the same operation to both sides maintains the equality. We choose $\log_{10}$ because it's the inverse of $10^x$.*

3.  **Use the logarithm property $\log_b b^A = A$ on the left side:**
    The logarithm and the exponential with the same base cancel each other out, leaving only the exponent.
    $$ 2x-1 = \log(50) $$
    *This is the fundamental property of inverse functions: $\log_{10}(10^A) = A$.*

4.  **Solve for $x$ using algebraic manipulation:**
    First, add 1 to both sides.
    $$ 2x = \log(50) + 1 $$
    *This isolates the $2x$ term.*

    Next, divide both sides by 2.
    $$ x = \frac{\log(50) + 1}{2} $$
    *This isolates $x$.*

5.  **Calculate the numerical value (optional, but often required):**
    Using a calculator, $\log(50) \approx 1.69897$.
    $$ x \approx \frac{1.69897 + 1}{2} $$
    $$ x \approx \frac{2.69897}{2} $$
    $$ x \approx 1.349485 $$
    *This step provides a numerical approximation for practical applications.*

**Final Answer:**
$$ \boxed{x = \frac{\log(50) + 1}{2} \approx 1.349} $$

**Reflection:** This example demonstrates how common logarithms are used to solve exponential equations with base 10. The key step is applying the appropriate logarithm (matching the base of the exponential) to "bring down" the exponent.

---

### Example 4: Solve an Exponential Equation using Natural Logarithm

**Problem:** Solve for $x$: $e^{3x+2} = 7$.

**Given:** The equation $e^{3x+2} = 7$.
**Want:** The value of $x$.

**Solution:**
1.  **Isolate the exponential term (if necessary):**
    The exponential term $e^{3x+2}$ is already isolated on one side of the equation.
    $$ e^{3x+2} = 7 $$
    *This is an initial check to ensure the equation is ready for the next step.*

2.  **Apply the natural logarithm to both sides:**
    Since the base of the exponential term is *e*, applying $\ln$ (natural log) to both sides will simplify the left side.
    $$ \ln(e^{3x+2}) = \ln(7) $$
    *Applying the same operation to both sides maintains the equality. We choose $\ln$ because it's the inverse of $e^x$.*

3.  **Use the logarithm property $\ln e^A = A$ on the left side:**
    The natural logarithm and the exponential with base *e* cancel each other out, leaving only the exponent.
    $$ 3x+2 = \ln(7) $$
    *This is the fundamental property of inverse functions: $\ln(e^A) = A$.*

4.  **Solve for $x$ using algebraic manipulation:**
    First, subtract 2 from both sides.
    $$ 3x = \ln(7) - 2 $$
    *This isolates the $3x$ term.*

    Next, divide both sides by 3.
    $$ x = \frac{\ln(7) - 2}{3} $$
    *This isolates $x$.*

5.  **Calculate the numerical value (optional, but often required):**
    Using a calculator, $\ln(7) \approx 1.9459$.
    $$ x \approx \frac{1.9459 - 2}{3} $$
    $$ x \approx \frac{-0.0541}{3} $$
    $$ x \approx -0.01803 $$
    *This step provides a numerical approximation for practical applications.*

**Final Answer:**
$$ \boxed{x = \frac{\ln(7) - 2}{3} \approx -0.018} $$

**Reflection:** This example demonstrates the process of solving exponential equations with base *e* using natural logarithms. The methodology is identical to using common logs for base 10 exponentials: apply the inverse function (the corresponding logarithm) to both sides.

---

### Example 5: Using the Change of Base Formula

**Problem:** Calculate $\log_5 125$ using both common logarithms and natural logarithms, and verify the result.

**Given:** The expression $\log_5 125$.
**Want:** The numerical value using change of base, and verification.

**Solution:**
**Part A: Using Common Logarithms**
1.  **Apply the Change of Base Formula to $\log_{10}$:**
    The formula is $\log_b x = \frac{\log_{10} x}{\log_{10} b}$. Here, $b=5$ and $x=125$.
    $$ \log_5 125 = \frac{\log_{10} 125}{\log_{10} 5} $$
    *This applies the change of base formula to convert to base 10.*

2.  **Calculate the numerical values:**
    Using a calculator:
    $\log_{10} 125 \approx 2.09691$
    $\log_{10} 5 \approx 0.69897$
    $$ \log_5 125 \approx \frac{2.09691}{0.69897} $$
    *This uses a calculator to get decimal approximations.*

3.  **Perform the division:**
    $$ \log_5 125 \approx 3.000004 \approx 3 $$
    *The slight deviation from 3 is due to rounding of the decimal approximations.*

**Part B: Using Natural Logarithms**
1.  **Apply the Change of Base Formula to $\ln$:**
    The formula is $\log_b x = \frac{\ln x}{\ln b}$. Here, $b=5$ and $x=125$.
    $$ \log_5 125 = \frac{\ln 125}{\ln 5} $$
    *This applies the change of base formula to convert to base *e*.*

2.  **Calculate the numerical values:**
    Using a calculator:
    $\ln 125 \approx 4.82831$
    $\ln 5 \approx 1.60944$
    $$ \log_5 125 \approx \frac{4.82831}{1.60944} $$
    *This uses a calculator to get decimal approximations.*

3.  **Perform the division:**
    $$ \log_5 125 \approx 3.000006 \approx 3 $$
    *Again, the slight deviation from 3 is due to rounding.*

**Part C: Verification**
To verify, we can use the definition of a logarithm: $\log_5 125 = y \iff 5^y = 125$.
We know that $5 \times 5 \times 5 = 125$, so $5^3 = 125$.
Therefore, $\log_5 125 = 3$.

**Final Answer:**
Using common logs: $\boxed{\log_5 125 \approx 3}$
Using natural logs: $\boxed{\log_5 125 \approx 3}$
Verification shows the exact answer is 3.

**Reflection:** This example demonstrates the versatility of the change of base formula. It allows us to compute logarithms in any base using only the common or natural log functions available on most calculators. It also reinforces the idea that the choice of base for the conversion (10 or *e*) does not affect the final result.

## 6. Common mistakes and traps

Students often stumble on similar points when learning common and natural logarithms. Being aware of these traps can help you avoid them.

1.  **Confusing $\log x$ with $\ln x$:** This is perhaps the most frequent error. $\log x$ means $\log_{10} x$, while $\ln x$ means $\log_e x$. They are different functions with different bases. Always pay attention to the notation.
2.  **Incorrectly applying logarithm properties, especially for sums/differences:** A common mistake is assuming $\log(A+B) = \log A + \log B$ or $\log(A-B) = \log A - \log B$. These are **incorrect**. The correct properties are for products and quotients: $\log(AB) = \log A + \log B$ and $\log(A/B) = \log A - \log B$.
3.  **Forgetting the domain restriction:** Logarithms are only defined for positive arguments. You cannot take the logarithm of zero or a negative number. So, $\log(-5)$ or $\ln(0)$ are undefined. Always check the domain when solving equations involving logarithms.
4.  **Misapplying the change of base formula:** Errors occur when mixing up the numerator and denominator, e.g., $\log_b x = \frac{\log_a b}{\log_a x}$ (incorrect). Remember, it's "log of the argument over log of the base."
5.  **Not knowing key values:** Forgetting that $\log 1 = 0$, $\ln 1 = 0$, $\log 10 = 1$, and $\ln e = 1$. These are fundamental and simplify many problems.
6.  **Calculator errors:** Using the wrong log button (e.g., using $\log$ for a natural log calculation) or not knowing how to input the change of base formula correctly into a calculator.

## 7. Textbook-precise explanation

The common logarithm and natural logarithm are specific instances of the general logarithm function, distinguished by their fixed bases.

**Definition of the General Logarithm:**
For any positive real numbers $b$ and $x$, where $b \neq 1$, the logarithm of $x$ with base $b$, denoted $\log_b x$, is the unique real number $y$ such that $b^y = x$.
In formal terms:
$$ y = \log_b x \quad \iff \quad b^y = x $$
The domain of $\log_b x$ is $(0, \infty)$, and its range is $(-\infty, \infty)$. The function $f(x) = \log_b x$ is the inverse of the exponential function $g(x) = b^x$.

**The Common Logarithm:**
The common logarithm is the logarithm with base 10. It is typically denoted without an explicit base subscript.
$$ \log x \equiv \log_{10} x $$
Thus, $y = \log x \iff 10^y = x$.
Its properties are identical to those of the general logarithm, specialized for $b=10$. For example, $\log 10^k = k$ for any real number $k$.
(Refer to: Stewart, Calculus, 9e, §1.5, "Logarithmic Functions"; Larson, Precalculus, 11e, §3.2, "Logarithmic Functions")

**The Natural Logarithm:**
The natural logarithm is the logarithm with base $e$, where $e$ is Euler's number, an irrational and transcendental constant approximately equal to $2.71828$. It is denoted by $\ln x$.
$$ \ln x \equiv \log_e x $$
Thus, $y = \ln x \iff e^y = x$.
The natural logarithm holds particular significance in calculus due to its derivative: $\frac{d}{dx}(\ln x) = \frac{1}{x}$. Consequently, $\int \frac{1}{x} dx = \ln|x| + C$. Also, $\ln e^k = k$ for any real number $k$.
(Refer to: Stewart, Calculus, 9e, §3.1, "The Natural Logarithm Function"; Larson, Precalculus, 11e, §3.2, "The Natural Logarithmic Function")

**Change of Base Formula:**
To convert a logarithm from an arbitrary base $b$ to a new base $a$ (where $a \neq 1$), the change of base formula is used:
$$ \log_b x = \frac{\log_a x}{\log_a b} $$
This formula is particularly useful for evaluating logarithms using calculators, which typically only have $\log_{10}$ and $\ln$ functions:
$$ \log_b x = \frac{\log_{10} x}{\log_{10} b} \quad \text{and} \quad \log_b x = \frac{\ln x}{\ln b} $$
(Refer to: Stewart, Calculus, 9e, §1.5, "Logarithmic Functions"; Larson, Precalculus, 11e, §3.3, "Properties of Logarithms")

## 8. ASCII diagrams

Here's an ASCII diagram illustrating the inverse relationship between exponential and logarithmic functions, using $y=10^x$ and $y=\log_{10} x$ as an example. The graph of a logarithm is a reflection of its corresponding exponential function across the line $y=x$.

```text
       ^ y
       |
       |                   / y = 10^x
       |                  /
       |                 /
       |                /
       |               * (1, 10)
       |            /
       |           /
       |          /
       |         /
       |        /
       |       /
       |      /
       |     * (0, 1)
-------+-----------------------> x
       |   /
       |  /
       | /
       * (1, 0)
      /|
     / |
    /  |
   /   |
  /    |
 /     |
y = log_10 x
```

**Description:**
*   The horizontal axis is $x$, and the vertical axis is $y$.
*   The function $y = 10^x$ (the exponential function) rapidly increases as $x$ increases. It passes through the point $(0, 1)$ because $10^0 = 1$. It also passes through $(1, 10)$ because $10^1 = 10$.
*   The function $y = \log_{10} x$ (the common logarithm) increases, but much more slowly. It passes through the point $(1, 0)$ because $\log_{10} 1 = 0$. It also passes through $(10, 1)$ because $\log_{10} 10 = 1$.
*   Notice how the points $(0,1)$ on $y=10^x$ and $(1,0)$ on $y=\log_{10} x$ are swapped. Similarly, $(1,10)$ on $y=10^x$ and $(10,1)$ on $y=\log_{10} x$ are swapped. This is characteristic of inverse functions.
*   If you were to draw the line $y=x$, the graph of $y=\log_{10} x$ would be the mirror image of $y=10^x$ across that line.
*   The $y$-axis is a horizontal asymptote for $y=10^x$ (as $x \to -\infty$, $y \to 0$).
*   The $x$-axis is a vertical asymptote for $y=\log_{10} x$ (as $x \to 0^+$, $y \to -\infty$).

The same visual relationship holds for $y=e^x$ and $y=\ln x$. The graph of $y=e^x$ passes through $(0,1)$ and $(1, e \approx 2.718)$, while $y=\ln x$ passes through $(1,0)$ and $(e, 1)$.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    *   **"LOG has a 'O' which looks like a zero, reminding you of 10."** (It's not perfect, but "log" usually implies base 10.)
    *   **"LN has an 'N' for Natural, and Natural means base *e*."**
    *   **Visual:** Imagine a calculator. The "log" button is for base 10 (common). The "ln" button is for base *e* (natural). They're usually right next to each other.

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    1.  **Definition of Common Log:** $\log x \equiv \log_{10} x$ (If no base is written, it's 10).
    2.  **Definition of Natural Log:** $\ln x \equiv \log_e x$ (The 'natural' base is $e \approx 2.718$).
    3.  **Inverse Property:** $\log_b b^y = y$ and $b^{\log_b x} = x$. (Specifically, $\log 10^y = y$, $10^{\log x} = x$, $\ln e^y = y$, $e^{\ln x} = x$).

3.  **Spaced-Repetition Schedule:**
    To truly embed these concepts and properties, review them actively:
    *   **1 Day:** After completing this lesson.
    *   **3 Days:** Review definitions, properties, and try a few simple problems.
    *   **7 Days:** Review all concepts, focus on common mistakes, and try a mix of problems.
    *   **16 Days:** Attempt harder problems, explain the concepts in your own words without referring to notes.
    *   **35 Days:** Revisit the entire topic, ensuring you can derive properties and apply them fluently.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget a specific log rule or how to approach a problem, you can always go back to the fundamental definition:
    *   **Start with the exponential form:** $b^y = x$.
    *   **Translate to logarithmic form:** $\log_b x = y$.
    *   **To understand $\log x$:** Just substitute $b=10$. So $10^y = x \iff \log_{10} x = y$.
    *   **To understand $\ln x$:** Just substitute $b=e$. So $e^y = x \iff \log_e x = y$.
    *   **To derive the Change of Base Formula:**
        1.  Let $y = \log_b x$.
        2.  Convert to exponential form: $b^y = x$.
        3.  Take the logarithm with a new base $a$ on both sides: $\log_a (b^y) = \log_a x$.
        4.  Use the power rule of logarithms ($\log_a M^p = p \log_a M$): $y \log_a b = \log_a x$.
        5.  Solve for $y$: $y = \frac{\log_a x}{\log_a b}$.
        6.  Substitute back $y = \log_b x$: $\log_b x = \frac{\log_a x}{\log_a b}$.
    This pathway ensures that even if you forget the formula, you can rebuild it from the ground up using the basic definition of a logarithm and its core properties.

## 10. Connections — what this leads to

A solid understanding of common and natural logarithms is absolutely crucial for advancing in mathematics and its applications. This subtopic unlocks pathways to:

*   **Solving Complex Exponential Equations:** Many real-world problems involve exponential growth or decay (e.g., population models, radioactive decay, financial investments). Logarithms are the primary tool for solving for the exponent (time, rate) in these equations.
*   **Logarithmic Scales and Data Visualization:** Understanding how and why quantities like pH, decibels, and Richter scale magnitudes are expressed logarithmically is essential for interpreting scientific data and phenomena that span many orders of magnitude.
*   **Calculus of Exponential and Logarithmic Functions:**
    *   **Derivatives:** The derivatives of $e^x$ and $\ln x$ are remarkably simple ($\frac{d}{dx}e^x = e^x$ and $\frac{d}{dx}\ln x = \frac{1}{x}$), making them fundamental in differential calculus.
    *   **Integrals:** The corresponding integrals, $\int e^x dx = e^x + C$ and $\int \frac{1}{x} dx = \ln|x| + C$, are equally important in integral calculus.
    *   **Logarithmic Differentiation:** A powerful technique for differentiating complex functions by first taking the natural logarithm of both sides.
*   **Differential Equations:** Many natural processes are modeled by differential equations, and solutions often involve exponential and logarithmic functions, particularly those with base *e*.
*   **Complex Numbers (Euler's Formula):** The constant *e* plays a central role in Euler's formula, $e^{i\theta} = \cos\theta + i\sin\theta$, which beautifully connects exponential functions, trigonometric functions, and complex numbers.
*   **Probability and Statistics:** Natural logarithms appear in probability density functions (e.g., log-normal distribution) and in maximum likelihood estimation.
*   **Information Theory:** The natural logarithm is used in the definition of entropy, a measure of information or uncertainty, particularly in units of "nats" (natural units).
*   **Machine Learning and Data Science:**
    *   **Logistic Regression:** Uses the natural logarithm to model the log-odds of an event.
    *   **Cross-Entropy Loss:** A common loss function in classification problems that heavily relies on natural logarithms.
    *   **Feature Scaling:** Logarithmic transformations are often used to normalize skewed data distributions, making them more suitable for certain machine learning algorithms.

## 11. Self-check questions

1.  Without using a calculator, evaluate:
    a) $\log 100,000$
    b) $\ln e^{-2}$
    c) $\log 0.001$
    d) $\ln \sqrt{e}$

2.  Solve for $x$ in the equation $10^{3x} = 75$. Express your answer exactly and then approximate it to three decimal places.

3.  Solve for $t$ in the equation $5e^{0.04t} = 25$. Express your answer exactly and then approximate it to three decimal places.

4.  Given $\log_7 49$, use the change of base formula to calculate its value using both common logarithms and natural logarithms. Show that both methods yield the same result.

5.  A sound has an intensity $I = 10^{-4}$ watts per square meter. The decibel level (dB) is given by the formula $dB = 10 \log_{10} \left(\frac{I}{I_0}\right)$, where $I_0 = 10^{-12}$ watts per square meter is the threshold of hearing. Calculate the decibel level of this sound.