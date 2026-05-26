## 1. The one-sentence answer

**A complex number written as \(a + bi\) has two real-number components: the real part \(a\) (denoted \(\operatorname{Re}(z)\)) and the imaginary part \(b\) (denoted \(\operatorname{Im}(z)\)).**

Iska matlab yeh hai ki har complex number ko ek ordered pair \((a, b)\) ki tarah soch sakte ho, jahaan \(a\) x-axis par real direction deta hai aur \(b\) y-axis par imaginary direction. Dono parts alag-alag real numbers hote hain; \(i\) sirf unko combine karta hai. Jab aap \(z = a + bi\) padhte ho, toh pehle \(a\) ko alag karo, phir \(b\) ko — yeh dono milke pura number define karte hain.

Yeh separation isliye zaroori hai kyunki operations jaise addition aur multiplication real aur imaginary parts ko alag-alag treat karte hain. Agar aap sirf \(a\) ya sirf \(b\) dekho, toh aapko number ka poora behaviour nahi samajh aayega.

> [!NOTE]
> Sabse badi aha yeh hai ki real aur imaginary parts dono real numbers hain; sirf unka combination complex banata hai. \(b\) khud imaginary nahi hai — woh real coefficient hai jo \(i\) ke saath multiply hota hai.

## 2. Why this matters — concrete and current

In AC circuit design, engineers at companies like Texas Instruments split voltage into real (resistive) and imaginary (reactive) parts using \(V = V_r + i V_i\) to calculate impedance precisely and avoid power loss in chips.

In quantum computing, Google’s Sycamore processor represents qubit states as complex amplitudes \(\alpha + i\beta\), where the real and imaginary parts directly determine measurement probabilities via \(|\alpha|^2 + |\beta|^2\).

In radar and signal processing at organisations like ISRO, Fourier transforms decompose received signals into real and imaginary frequency components so that phase information can be extracted for target velocity.

In control systems for electric vehicles, Tesla’s motor controllers model sinusoidal currents as complex numbers; separating real and imaginary parts lets the algorithm compute torque and reactive power independently in real time.

In optics, smartphone camera chips from Sony use complex-wavefront analysis where the imaginary part of the electric field captures phase shifts that improve low-light image reconstruction.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Real numbers     | Both \(a\) and \(b\) must be real; without this the definition collapses |
| Basic algebra    | You must comfortably add, subtract and multiply expressions containing \(i\) |
| Ordered pairs    | Understanding that \(a + bi\) is just the pair \((a, b)\) makes the geometry immediate |

Agar aap real numbers aur unke basic operations mein comfortable nahi ho, toh pehle wahi revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Everyday numbers are not enough
- Kabhi-kabhi equations jaise \(x^2 + 1 = 0\) ka koi real solution nahi hota. Hum ek naya symbol \(i\) introduce karte hain jiska square \(-1\) ho.
- Example: \(x^2 = -4\) ka real mein koi jawab nahi, lekin \(x = 2i\) formal solution deta hai.
- Formal statement: Let \(i\) satisfy \(i^2 = -1\). Then any expression of the form \(a + bi\) with \(a, b \in \mathbb{R}\) is called a complex number.
> [!WARNING] Agar aap \(i\) ko real number samajh kar treat karoge toh \(i^2 = -1\) wala rule toot jaayega aur saare calculations galat ho jaayenge.

### Step 2 — Splitting the expression
- Jab aap \(3 + 4i\) dekhte ho, toh naturally do hisson mein todte ho: 3 aur 4.
- Example: \(z = -2 + 7i\) mein real hissa \(-2\) hai, imaginary hissa 7.
- Formal statement: For \(z = a + bi\), define \(\operatorname{Re}(z) := a\) and \(\operatorname{Im}(z) := b\).
> [!WARNING] Log aksar bhool jaate hain ki \(\operatorname{Im}(z)\) mein \(i\) nahi aata — sirf coefficient \(b\) hota hai.

### Step 3 — Two independent real coordinates
- Real aur imaginary parts ek dusre se independent hote hain; dono alag-alag real numbers hain.
- Example: \(5 + 0i\) ka imaginary part zero hai, lekin yeh abhi bhi complex number hai.
- Formal statement: \(\operatorname{Re}(z), \operatorname{Im}(z) \in \mathbb{R}\) for every complex \(z\).

### Step 4 — Notation and identification
- Hum likhte hain \(z = \operatorname{Re}(z) + i \operatorname{Im}(z)\).
- Example: Agar \(\operatorname{Re}(z) = 0\) aur \(\operatorname{Im}(z) = 1\), toh \(z = i\).
- Formal statement: The map \(z \mapsto (\operatorname{Re}(z), \operatorname{Im}(z))\) is a bijection between \(\mathbb{C}\) and \(\mathbb{R}^2\).

### Step 5 — Textbook-grade definition
- Ab poora formal definition: A complex number is an ordered pair \((a, b)\) of real numbers equipped with addition \((a,b) + (c,d) = (a+c, b+d)\) and multiplication \((a,b)(c,d) = (ac-bd, ad+bc)\), written compactly as \(a + bi\).

## 5. Worked examples — har step show karo

**Example 1 — Simple identification**  
*Given:* \(z = 4 - 5i\)  
*Find:* \(\operatorname{Re}(z)\) and \(\operatorname{Im}(z)\)  
Step 1: Compare with \(a + bi\).  
Step 2: \(a = 4\), \(b = -5\).  
*Why:* Direct matching of coefficients.  
**Final answer**  
\(\operatorname{Re}(z) = 4\), \(\operatorname{Im}(z) = -5\)

*Reflection:* Yeh example easy thi kyunki koi grouping nahi thi; general rule yahi hai ki \(i\) ke saath wala coefficient imaginary part hai.

**Example 2 — Zero imaginary part**  
*Given:* \(z = 7\)  
*Find:* \(\operatorname{Re}(z)\) and \(\operatorname{Im}(z)\)  
Step 1: Rewrite as \(7 + 0i\).  
Step 2: \(a = 7\), \(b = 0\).  
*Why:* Har real number complex number bhi hota hai jiska imaginary part zero hota hai.  
**Final answer**  
\(\operatorname{Re}(z) = 7\), \(\operatorname{Im}(z) = 0\)

*Reflection:* Students aksar sochte hain real numbers alag hote hain; yeh dikhata hai ki real numbers complex numbers ka subset hain.

**Example 3 — Pure imaginary**  
*Given:* \(z = -3i\)  
*Find:* \(\operatorname{Re}(z)\) and \(\operatorname{Im}(z)\)  
Step 1: Rewrite as \(0 + (-3)i\).  
Step 2: \(a = 0\), \(b = -3\).  
*Why:* Jab real term missing ho toh uska coefficient zero maana jaata hai.  
**Final answer**  
\(\operatorname{Re}(z) = 0\), \(\operatorname{Im}(z) = -3\)

*Reflection:* Yeh case important hai kyunki yeh origin se vertical line par points represent karta hai.

**Example 4 — Variable coefficients**  
*Given:* Let \(z = (2k + 1) + k^2 i\) where \(k \in \mathbb{R}\).  
*Find:* \(\operatorname{Re}(z)\) and \(\operatorname{Im}(z)\) in terms of \(k\).  
Step 1: Identify the coefficient of the non-\(i\) term: \(2k + 1\).  
Step 2: Identify the coefficient of \(i\): \(k^2\).  
*Why:* Variables ko bhi real numbers maana jaata hai jab tak explicitly complex na kaha jaaye.  
**Final answer**  
\(\operatorname{Re}(z) = 2k + 1\), \(\operatorname{Im}(z) = k^2\)

*Reflection:* Yeh dikhata hai ki real aur imaginary parts functions bhi ho sakte hain, lekin phir bhi dono real-valued hi rehte hain.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Writing \(\operatorname{Im}(z) = 4i\) | Thinking the whole term with \(i\) is imaginary part | Remember: \(\operatorname{Im}(z)\) is only the real coefficient |
| Forgetting that real numbers are complex | Old habit that “complex” means “not real”   | Always rewrite a real number as \(a + 0i\)   |
| Confusing conjugate with imaginary part | Both involve sign change of \(b\)           | Conjugate is \(a - bi\); imaginary part is only \(b\) |
| Assuming \(a\) and \(b\) must be integers | School examples mostly use integers         | Explicitly allow any real numbers            |
| Writing \(i\) inside \(\operatorname{Re}(z)\) | Notation slip                               | Keep \(\operatorname{Re}(z)\) and \(\operatorname{Im}(z)\) strictly real |

## 7. The textbook-precise statement

A complex number is an expression of the form \(a + bi\) where \(a, b \in \mathbb{R}\) and \(i\) is a symbol satisfying \(i^2 = -1\). The real part of \(z = a + bi\) is the real number \(a\), written \(\operatorname{Re}(z) = a\). The imaginary part of \(z\) is the real number \(b\), written \(\operatorname{Im}(z) = b\). (See: Churchill, Brown, *Complex Variables and Applications*, 9e, §1.2.)

## 8. Visual — diagram or schematic

```text
Imaginary axis (Im)
      ^
      |       • z = a + bi   (point (a,b))
      |      /
      |     /
      |    /
------+----+-----------> Real axis (Re)
      |   0
      |
```
Horizontal axis labelled “Real axis”, vertical axis labelled “Imaginary axis”. The point \((a, b)\) is marked; its x-coordinate is exactly \(\operatorname{Re}(z)\) and y-coordinate is exactly \(\operatorname{Im}(z)\).

## 9. The memory technique

**The hook**  
Picture a bank account: real part \(a\) is the actual cash balance you can spend; imaginary part \(b\) is the “dream loan” that only exists when multiplied by \(i\).

**What to overlearn**  
- \(\operatorname{Re}(a + bi) = a\)  
- \(\operatorname{Im}(a + bi) = b\)  
- Both \(a\) and \(b\) are always real numbers.

**Spaced-repetition schedule**  
Review after 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Agar notation bhool jaaye, toh wapas \(z = a + bi\) likho aur seedha poochho “kaunsa term mein \(i\) nahi hai?” — woh real part hai; baaki coefficient imaginary part.

## 10. What this unlocks

Yeh distinction aapko complex conjugation, modulus, argument, polar form, aur Euler’s formula tak le jaata hai.  

- Next: modulus \(|z| = \sqrt{a^2 + b^2}\)  
- Next: argument \(\arg(z) = \tan^{-1}(b/a)\) with quadrant correction  
- Next: multiplication via \((a + bi)(c + di)\) using separate real/imaginary arithmetic  

## 11. Self-check — five questions, no answers

1. For \(z = 0\), what are \(\operatorname{Re}(z)\) and \(\operatorname{Im}(z)\)?  
2. If \(\operatorname{Im}(z) = -2\) and \(\operatorname{Re}(z) = 3\), write \(z\) in standard form.  
3. True or false: \(\operatorname{Im}(5) = 5\)? Explain.  
4. Let \(z = x + yi\) where \(x, y\) real. Show that \(\operatorname{Re}(iz) = -y\).  
5. A student claims “the imaginary part of \(2 - 3i\) is \(-3i\)”. Identify the mistake and correct it.