## 1. What it is — in plain English

Imagine you're standing on a street corner, and an ambulance with its siren wailing approaches you, passes you, and then drives away. What do you notice about the sound of the siren? As it comes towards you, the pitch (how high or low the sound is) seems higher than usual. As it passes you and moves away, the pitch suddenly drops and sounds lower.

This change in the perceived pitch or frequency of a sound (or any wave) due to the relative motion between the source of the wave and the person or device observing it is called the **Doppler effect**. It's not that the ambulance's siren is actually changing its sound; it's that *your perception* of the sound changes because of the way the sound waves are "squished" or "stretched" by the motion.

Think of it like this: If the ambulance is coming towards you, it's constantly emitting sound waves. But because the ambulance itself is moving forward, each new wave crest it sends out starts from a slightly closer position to you than the previous one. This effectively compresses the waves in front of the ambulance, making them arrive at your ear more frequently, which you perceive as a higher pitch.

Conversely, as the ambulance moves away, each new wave crest is emitted from a position further away from you. This stretches out the waves behind the ambulance, making them arrive at your ear less frequently, which you perceive as a lower pitch. The same principle applies if *you* are moving towards or away from a stationary sound source, or if both of you are moving.

## 2. Why it matters — real-world applications

The Doppler effect isn't just a curious auditory phenomenon; it's a fundamental principle with incredibly widespread and vital applications across science and technology, including rocket science and aerospace.

1.  **Radar Guns and Weather Radar:** Police use radar guns to measure the speed of cars. These devices emit radio waves (a type of electromagnetic wave) which bounce off a moving vehicle. Because the vehicle is moving, the reflected waves experience a Doppler shift in frequency. By measuring this shift, the radar gun calculates the car's speed. Similarly, weather radar uses the Doppler effect to measure the speed and direction of rain, snow, and hail within storms, helping meteorologists predict severe weather and track storm systems.
2.  **Medical Ultrasound:** In medicine, ultrasound machines use high-frequency sound waves to create images inside the body. Doppler ultrasound specifically uses the Doppler effect to measure blood flow. By sending sound waves into the body and analyzing the frequency shift of the waves reflected from moving red blood cells, doctors can assess blood flow through arteries and veins, detect blockages, and monitor fetal heartbeats. This is crucial for diagnosing heart conditions, vascular diseases, and complications during pregnancy.
3.  **Astronomy and Cosmology (Redshift/Blueshift):** The Doppler effect is a cornerstone of modern astronomy. Light from distant stars and galaxies also experiences a Doppler shift. If a celestial object is moving away from Earth, the light waves it emits are stretched, shifting towards the red end of the spectrum (called **redshift**). If it's moving towards Earth, the light waves are compressed, shifting towards the blue end (called **blueshift**). By measuring these shifts, astronomers can determine the speed and direction of stars, galaxies, and even infer the expansion of the universe (cosmological redshift). This is directly relevant to understanding the dynamics of celestial bodies, which is foundational for planning space missions.
4.  **Satellite and Rocket Tracking:** In aerospace, the Doppler effect is used to track the velocity of satellites, rockets, and other spacecraft. Ground stations transmit radio signals to a moving craft and receive reflected or retransmitted signals. The frequency shift of these signals allows engineers to precisely calculate the craft's speed and trajectory, which is essential for navigation, orbital adjustments, and mission control. This is a critical component of any space launch or orbital operation.

## 3. Prerequisites — what you must know first

Before diving deep into the Doppler effect, ensure you have a solid grasp of these fundamental concepts:

*   **Waves (Basic Properties):** Understanding what a wave is, and its key properties:
    *   **Wavelength ($\lambda$):** The spatial period of the wave, the distance over which the wave's shape repeats.
    *   **Frequency ($f$):** The number of wave cycles that pass a point per unit time (measured in Hertz, Hz).
    *   **Period ($T$):** The time it takes for one complete wave cycle to pass a point ($T = 1/f$).
    *   **Wave Speed ($v$):** The speed at which the wave propagates through a medium.
*   **Relationship between Wave Properties:** The fundamental wave equation: $v = f \lambda$. This equation links wave speed, frequency, and wavelength.
*   **Relative Velocity:** How to calculate the velocity of one object relative to another. For example, if you're walking on a train, your speed relative to the ground depends on your speed relative to the train and the train's speed relative to the ground.
*   **Basic Algebra:** Manipulating equations, solving for unknowns, and understanding fractions.

If any of these concepts are unclear, it's highly recommended to review them before proceeding, as they form the bedrock of understanding the Doppler effect.

## 4. The core idea — step by step

Let's build the understanding of the Doppler effect step by step, starting from the simplest case and progressively adding complexity. We'll primarily use sound waves as our example medium, as the intuition is often clearer, but the principles apply to all waves.

Throughout this section, we'll use the following notation:
*   $f$: The actual frequency of the wave emitted by the source (the "source frequency").
*   $f'$: The perceived (observed) frequency of the wave (the "apparent frequency").
*   $v$: The speed of the wave in the medium (e.g., speed of sound in air, speed of light in vacuum).
*   $v_O$: The speed of the observer relative to the medium.
*   $v_S$: The speed of the source relative to the medium.

### Step 1: Stationary Source, Stationary Observer

*   **Plain-English Statement:** If both the source of the wave and the observer are standing still relative to the medium, there's no Doppler effect.
*   **Concrete Example:** An ambulance with its siren on is parked next to you, and you are also standing still. The pitch of the siren you hear is exactly the pitch the siren is emitting.
*   **Formal/Mathematical Version:**
    $$f' = f$$
    $$v_O = 0, v_S = 0$$
    The observed frequency is equal to the source frequency.
*   **What Could Go Wrong:** This seems trivial, but it's the baseline. Forgetting this means you might overcomplicate things when there's no relative motion.

### Step 2: Stationary Source, Moving Observer

*   **Plain-English Statement:** When the source is stationary but the observer is moving, the observer encounters wave crests at a different rate than if they were stationary.
*   **Concrete Example:** An ambulance is parked with its siren blaring. You are running towards it. As you run, you "run into" the sound waves more quickly, so you hear a higher pitch. If you run away from it, you "run away" from the waves, so they catch up to you less frequently, and you hear a lower pitch.
*   **Intuition Building:**
    *   The source emits waves with frequency $f$ and wavelength $\lambda = v/f$.
    *   These waves travel through the medium at speed $v$.
    *   If the observer is stationary, they encounter $f$ wave crests per second.
    *   If the observer moves *towards* the source with speed $v_O$, their effective speed relative to the incoming wave crests is $v + v_O$.
    *   The rate at which they encounter crests (the new perceived frequency $f'$) will be higher.
    *   If the observer moves *away* from the source with speed $v_O$, their effective speed relative to the incoming wave crests is $v - v_O$.
    *   The rate at which they encounter crests will be lower.
*   **Formal/Mathematical Version:**
    The speed of the waves relative to the observer is $(v \pm v_O)$.
    The wavelength $\lambda$ does not change, as the source is stationary.
    The observed frequency $f'$ is given by the relative speed divided by the wavelength:
    $$f' = \frac{v_{relative}}{\lambda} = \frac{v \pm v_O}{\lambda}$$
    Since $\lambda = v/f$, we can substitute:
    $$f' = \frac{v \pm v_O}{v/f} = f \left( \frac{v \pm v_O}{v} \right)$$
    $$f' = f \left( 1 \pm \frac{v_O}{v} \right)$$
    *   Use the **+** sign for $v_O$ when the observer is moving **towards** the source.
    *   Use the **-** sign for $v_O$ when the observer is moving **away** from the source.
*   **What Could Go Wrong:** Forgetting that the wavelength *doesn't* change in this case. The waves are emitted by a stationary source, so their spacing in the medium remains constant. Only the rate at which the observer *intercepts* them changes.

### Step 3: Moving Source, Stationary Observer

*   **Plain-English Statement:** When the source is moving but the observer is stationary, the source's motion compresses the waves in the direction of motion and stretches them out behind it. This changes the wavelength, and thus the perceived frequency.
*   **Concrete Example:** You are standing still, and an ambulance with its siren on drives towards you. As it comes closer, the pitch is higher. As it drives away, the pitch is lower.
*   **Intuition Building:**
    *   The source emits waves with frequency $f$.
    *   In one period $T = 1/f$, the source emits one wave crest.
    *   During this time $T$, the wave crest travels a distance $vT$.
    *   However, the source itself moves a distance $v_S T$ in the same direction.
    *   If the source moves *towards* the observer, the next wave crest is emitted from $v_S T$ closer. So, the effective wavelength in front of the source is reduced: $\lambda' = vT - v_S T = (v - v_S)T$.
    *   If the source moves *away* from the observer, the next wave crest is emitted from $v_S T$ further. So, the effective wavelength behind the source is increased: $\lambda' = vT + v_S T = (v + v_S)T$.
    *   The observer is stationary, so they perceive waves travelling at speed $v$.
    *   The observed frequency $f'$ is $v/\lambda'$.
*   **Formal/Mathematical Version:**
    The wavelength observed by the stationary observer is:
    $$\lambda' = \frac{v}{f} \mp \frac{v_S}{f} = \frac{v \mp v_S}{f}$$
    *   Use the **-** sign for $v_S$ when the source is moving **towards** the observer (wavelength is compressed, frequency increases).
    *   Use the **+** sign for $v_S$ when the source is moving **away** from the observer (wavelength is stretched, frequency decreases).
    The observed frequency $f'$ is $v/\lambda'$:
    $$f' = \frac{v}{\lambda'} = \frac{v}{(v \mp v_S)/f}$$
    $$f' = f \left( \frac{v}{v \mp v_S} \right)$$
*   **What Could Go Wrong:** Confusing this with the previous case. Here, the *wavelength* changes because the source is moving relative to the medium, altering the spacing of the wave crests. The speed of the wave *relative to the observer* remains $v$.

### Step 4: Both Source and Observer Moving (General Case)

*   **Plain-English Statement:** When both the source and the observer are moving, we combine the effects from Step 2 and Step 3. The wavelength is affected by the source's motion, and the rate at which the observer intercepts these altered waves is affected by the observer's motion.
*   **Concrete Example:** You are riding a bicycle towards an ambulance that is also driving towards you, with its siren on. Or, you are riding away from it, and it's also moving away from you.
*   **Intuition Building:**
    *   First, consider the effect of the moving source on the wavelength, as if the observer were stationary. The effective wavelength is $\lambda' = (v \mp v_S)/f$.
    *   Now, consider this altered wave (with speed $v$ and wavelength $\lambda'$) being observed by a moving observer. The observer's relative speed to these waves is $(v \pm v_O)$.
    *   The perceived frequency will be $f' = \frac{v_{relative, observer}}{\lambda'}$.
*   **Formal/Mathematical Version:**
    $$f' = \frac{v \pm v_O}{\lambda'} = \frac{v \pm v_O}{(v \mp v_S)/f}$$
    $$f' = f \left( \frac{v \pm v_O}{v \mp v_S} \right)$$
    This is the general Doppler effect formula for sound waves (or any wave in a medium).

    **Sign Convention (CRITICAL):**
    *   **Numerator ($v \pm v_O$):**
        *   Use **+** if the observer is moving **towards** the source. (Increases perceived frequency)
        *   Use **-** if the observer is moving **away** from the source. (Decreases perceived frequency)
    *   **Denominator ($v \mp v_S$):**
        *   Use **-** if the source is moving **towards** the observer. (Decreases effective wavelength, increases perceived frequency)
        *   Use **+** if the source is moving **away** from the observer. (Increases effective wavelength, decreases perceived frequency)

    A good way to remember the signs:
    *   **"Top is towards, bottom is back"** (meaning if the *observer* is moving *towards* the source, it's a plus in the numerator; if the *source* is moving *away* from the observer, it's a plus in the denominator). This mnemonic helps ensure you get higher frequency when approaching and lower when receding.
    *   Alternatively, think: to get a *higher* frequency (approaching), you want the numerator to be larger and the denominator to be smaller.
        *   Observer towards source: $v+v_O$ (larger numerator).
        *   Source towards observer: $v-v_S$ (smaller denominator).
    *   To get a *lower* frequency (receding), you want the numerator to be smaller and the denominator to be larger.
        *   Observer away from source: $v-v_O$ (smaller numerator).
        *   Source away from observer: $v+v_S$ (larger denominator).

*   **What Could Go Wrong:** The most common mistake here is getting the signs wrong. Always relate the sign choice back to whether the motion should *increase* or *decrease* the perceived frequency. Also, remember that $v_O$ and $v_S$ are speeds, so they are always positive values. The signs in the formula account for direction.

### Important Note on Light Waves (Electromagnetic Waves)

The Doppler effect for light waves (and other electromagnetic waves) is slightly different because light does not require a medium and its speed $c$ is constant for all inertial observers (Special Relativity). The formula for the relativistic Doppler effect is:

$$f' = f \sqrt{\frac{1 \pm \beta}{1 \mp \beta}}$$
where $\beta = v_{rel}/c$ is the ratio of the relative speed between source and observer ($v_{rel}$) to the speed of light ($c$).
*   Use **+** in the numerator and **-** in the denominator when the source and observer are **approaching** each other.
*   Use **-** in the numerator and **+** in the denominator when the source and observer are **receding** from each other.

For speeds much less than the speed of light ($v_{rel} \ll c$), this simplifies to the non-relativistic (classical) Doppler effect for light, which is similar in form to the sound wave equation, but with only relative velocity:

$$f' = f \left( 1 \pm \frac{v_{rel}}{c} \right)$$
where $v_{rel}$ is the relative speed. This simpler form is often used in astronomy for objects moving at non-relativistic speeds. However, for this foundational lesson, we will focus on the classical Doppler effect in a medium.

## 5. Worked examples — multiple, with every step shown

Let's apply the general formula $f' = f \left( \frac{v \pm v_O}{v \mp v_S} \right)$ to several scenarios. Assume the speed of sound in air $v = 343 \text{ m/s}$ unless otherwise specified.

### Example 1: Observer Moving Towards Stationary Source (Easy)

**Problem:** A stationary ambulance emits a siren with a frequency of $1000 \text{ Hz}$. You are riding a bicycle towards the ambulance at a speed of $10 \text{ m/s}$. What frequency do you hear? (Speed of sound $v = 343 \text{ m/s}$).

**Given:**
*   Source frequency, $f = 1000 \text{ Hz}$
*   Speed of observer, $v_O = 10 \text{ m/s}$
*   Speed of source, $v_S = 0 \text{ m/s}$ (stationary)
*   Speed of sound, $v = 343 \text{ m/s}$

**Want:**
*   Observed frequency, $f'$

**Solution:**

1.  **Write down the general Doppler effect formula:**
    $$f' = f \left( \frac{v \pm v_O}{v \mp v_S} \right)$$
    This is our starting point for all Doppler effect problems involving waves in a medium.

2.  **Determine the signs for $v_O$ and $v_S$:**
    *   The observer is moving **towards** the source. When the observer moves towards the source, the perceived frequency increases. To make the numerator larger, we use the **+** sign for $v_O$.
    *   The source is **stationary**, so $v_S = 0$. The sign choice for $v_S$ becomes irrelevant, as it will be $v \pm 0 = v$.

3.  **Substitute the known values and signs into the formula:**
    $$f' = 1000 \text{ Hz} \left( \frac{343 \text{ m/s} + 10 \text{ m/s}}{343 \text{ m/s} - 0 \text{ m/s}} \right)$$
    We are plugging in the given values for $f$, $v$, $v_O$, and $v_S$, along with the determined signs.

4.  **Perform the arithmetic in the numerator and denominator:**
    $$f' = 1000 \text{ Hz} \left( \frac{353 \text{ m/s}}{343 \text{ m/s}} \right)$$
    Calculating the sum in the numerator.

5.  **Calculate the ratio:**
    $$f' = 1000 \text{ Hz} \times (1.02915)$$
    Dividing 353 by 343.

6.  **Multiply to find the final observed frequency:**
    $$f' = 1029.15 \text{ Hz}$$
    Multiplying the source frequency by the calculated ratio.

7.  **Box the final answer:**
    $$\boxed{f' \approx 1029 \text{ Hz}}$$

**Reflection:** This example was straightforward because only the observer was moving, simplifying the denominator. The key was correctly choosing the sign for $v_O$ based on the direction of motion relative to the source and its effect on perceived frequency. As expected, moving towards the source resulted in a higher perceived frequency.

### Example 2: Moving Source Away from Stationary Observer (Medium)

**Problem:** A train horn emits a sound at a frequency of $400 \text{ Hz}$. The train is moving away from a stationary observer at a speed of $25 \text{ m/s}$. What frequency does the observer hear? (Speed of sound $v = 343 \text{ m/s}$).

**Given:**
*   Source frequency, $f = 400 \text{ Hz}$
*   Speed of observer, $v_O = 0 \text{ m/s}$ (stationary)
*   Speed of source, $v_S = 25 \text{ m/s}$
*   Speed of sound, $v = 343 \text{ m/s}$

**Want:**
*   Observed frequency, $f'$

**Solution:**

1.  **Write down the general Doppler effect formula:**
    $$f' = f \left( \frac{v \pm v_O}{v \mp v_S} \right)$$
    Always start with the general formula.

2.  **Determine the signs for $v_O$ and $v_S$:**
    *   The observer is **stationary**, so $v_O = 0$. The sign choice for $v_O$ is irrelevant.
    *   The source (train) is moving **away** from the observer. When the source moves away, the perceived frequency decreases. To make the denominator larger (and thus the overall fraction smaller), we use the **+** sign for $v_S$.

3.  **Substitute the known values and signs into the formula:**
    $$f' = 400 \text{ Hz} \left( \frac{343 \text{ m/s} - 0 \text{ m/s}}{343 \text{ m/s} + 25 \text{ m/s}} \right)$$
    Plug in values and chosen signs.

4.  **Perform the arithmetic in the numerator and denominator:**
    $$f' = 400 \text{ Hz} \left( \frac{343 \text{ m/s}}{368 \text{ m/s}} \right)$$
    Calculate the sum in the denominator.

5.  **Calculate the ratio:**
    $$f' = 400 \text{ Hz} \times (0.932065)$$
    Divide 343 by 368.

6.  **Multiply to find the final observed frequency:**
    $$f' = 372.826 \text{ Hz}$$
    Multiply the source frequency by the ratio.

7.  **Box the final answer:**
    $$\boxed{f' \approx 373 \text{ Hz}}$$

**Reflection:** In this case, only the source was moving. The critical step was choosing the correct sign for $v_S$ (positive, as moving away increases the effective wavelength and decreases frequency). As expected, moving away from the observer resulted in a lower perceived frequency.

### Example 3: Both Moving Towards Each Other (Harder)

**Problem:** A car horn emits a sound at $600 \text{ Hz}$. The car is moving towards you at $20 \text{ m/s}$. You are running towards the car at $5 \text{ m/s}$. What frequency do you hear? (Speed of sound $v = 343 \text{ m/s}$).

**Given:**
*   Source frequency, $f = 600 \text{ Hz}$
*   Speed of observer, $v_O = 5 \text{ m/s}$
*   Speed of source, $v_S = 20 \text{ m/s}$
*   Speed of sound, $v = 343 \text{ m/s}$

**Want:**
*   Observed frequency, $f'$

**Solution:**

1.  **Write down the general Doppler effect formula:**
    $$f' = f \left( \frac{v \pm v_O}{v \mp v_S} \right)$$
    The standard starting point.

2.  **Determine the signs for $v_O$ and $v_S$:**
    *   The observer is moving **towards** the source. This increases the perceived frequency, so we use the **+** sign for $v_O$.
    *   The source is moving **towards** the observer. This also increases the perceived frequency (by compressing the waves), so we use the **-** sign for $v_S$.

3.  **Substitute the known values and signs into the formula:**
    $$f' = 600 \text{ Hz} \left( \frac{343 \text{ m/s} + 5 \text{ m/s}}{343 \text{ m/s} - 20 \text{ m/s}} \right)$$
    Carefully plug in all values and chosen signs.

4.  **Perform the arithmetic in the numerator and denominator:**
    $$f' = 600 \text{ Hz} \left( \frac{348 \text{ m/s}}{323 \text{ m/s}} \right)$$
    Calculate the sums/differences.

5.  **Calculate the ratio:**
    $$f' = 600 \text{ Hz} \times (1.077399)$$
    Divide the numerator by the denominator.

6.  **Multiply to find the final observed frequency:**
    $$f' = 646.439 \text{ Hz}$$
    Multiply the source frequency by the ratio.

7.  **Box the final answer:**
    $$\boxed{f' \approx 646 \text{ Hz}}$$

**Reflection:** This example involved both source and observer moving, requiring careful selection of both signs. Since both were moving towards each other, both effects contributed to an *increase* in the observed frequency, as reflected by the numerator being larger and the denominator being smaller than $v$. This resulted in the largest frequency shift of the examples so far.

### Example 4: Source Moving at an Angle (Trickier Scenario)

**Problem:** A fire truck siren emits a frequency of $800 \text{ Hz}$. The fire truck is moving at $30 \text{ m/s}$ along a straight road. You are standing $40 \text{ m}$ from the road. What frequency do you hear when the truck is $50 \text{ m}$ away from you, approaching? (Speed of sound $v = 343 \text{ m/s}$).

**Given:**
*   Source frequency, $f = 800 \text{ Hz}$
*   Speed of source, $v_S = 30 \text{ m/s}$
*   Speed of observer, $v_O = 0 \text{ m/s}$ (stationary)
*   Speed of sound, $v = 343 \text{ m/s}$
*   Distance from road, $d_{perp} = 40 \text{ m}$
*   Distance from truck, $d_{diag} = 50 \text{ m}$

**Want:**
*   Observed frequency, $f'$

**Solution:**

1.  **Understand the effective velocity:** The Doppler effect depends on the component of the source's (or observer's) velocity that is *along the line connecting the source and the observer*. The truck is moving along the road, but you are off to the side. We need the component of $v_S$ that points directly towards you.

2.  **Draw a diagram (or visualize):**
    Imagine a right triangle. The distance from you to the road is one leg ($40 \text{ m}$). The distance from you to the truck is the hypotenuse ($50 \text{ m}$). The other leg is the distance along the road from the point closest to you to the truck.
    Let $\theta$ be the angle between the line connecting you to the truck and the road.
    We can use trigonometry: $\cos(\theta) = \frac{\text{adjacent}}{\text{hypotenuse}}$.
    The adjacent side is the distance along the road from the point perpendicular to you. Let's call this $x$.
    By Pythagorean theorem: $x^2 + (40 \text{ m})^2 = (50 \text{ m})^2 \Rightarrow x^2 + 1600 = 2500 \Rightarrow x^2 = 900 \Rightarrow x = 30 \text{ m}$.
    The cosine of the angle between the truck's velocity vector (along the road) and the line connecting you to the truck is $\cos(\alpha)$, where $\alpha$ is the angle between the velocity vector and the line of sight.
    From the diagram, the angle between the line of sight (hypotenuse) and the road (adjacent leg) is $\theta$.
    The component of the source's velocity *towards* the observer is $v_S \cos(\theta)$.
    In our triangle, $\cos(\theta) = \frac{\text{adjacent}}{\text{hypotenuse}} = \frac{x}{d_{diag}} = \frac{30 \text{ m}}{50 \text{ m}} = 0.6$.
    So, the effective speed of the source *towards* the observer is $v_{S,eff} = v_S \cos(\theta) = 30 \text{ m/s} \times 0.6 = 18 \text{ m/s}$.

3.  **Write down the general Doppler effect formula:**
    $$f' = f \left( \frac{v \pm v_O}{v \mp v_S} \right)$$

4.  **Determine the signs for $v_O$ and $v_{S,eff}$:**
    *   The observer is **stationary**, so $v_O = 0$.
    *   The source (truck) is moving **towards** the observer (along the line of sight, with effective speed $v_{S,eff}$). This increases the perceived frequency, so we use the **-** sign for $v_S$.

5.  **Substitute the known values and signs into the formula, using $v_{S,eff}$:**
    $$f' = 800 \text{ Hz} \left( \frac{343 \text{ m/s} - 0 \text{ m/s}}{343 \text{ m/s} - 18 \text{ m/s}} \right)$$
    Note that we use $v_{S,eff}$ in the denominator, not the full $v_S$.

6.  **Perform the arithmetic in the numerator and denominator:**
    $$f' = 800 \text{ Hz} \left( \frac{343 \text{ m/s}}{325 \text{ m/s}} \right)$$

7.  **Calculate the ratio:**
    $$f' = 800 \text{ Hz} \times (1.05538)$$

8.  **Multiply to find the final observed frequency:**
    $$f' = 844.304 \text{ Hz}$$

9.  **Box the final answer:**
    $$\boxed{f' \approx 844 \text{ Hz}}$$

**Reflection:** This example was trickier because the source's motion was not directly along the line of sight to the observer. The crucial step was to correctly identify and calculate the *component* of the source's velocity that is directly towards or away from the observer. This highlights that the Doppler effect depends on the *relative radial velocity* (velocity component along the line connecting source and observer), not just the total speed.

## 6. Common mistakes and traps

1.  **Incorrect Sign Convention:** This is by far the most frequent error. Students often randomly pick signs or apply a single rule (e.g., "plus for towards") without considering whether it's the numerator or denominator, and whether it's the observer or source.
    *   *Why it happens:* Lack of intuitive understanding of how each motion affects frequency.
    *   *Correction:* Always think: "Does this motion increase or decrease the perceived frequency?" Then choose the sign that achieves that effect in the formula: $f' = f \left( \frac{v \pm v_O}{v \mp v_S} \right)$.
        *   Observer towards source: higher $f'$, so $v+v_O$.
        *   Observer away from source: lower $f'$, so $v-v_O$.
        *   Source towards observer: higher $f'$, so $v-v_S$ (making denominator smaller).
        *   Source away from observer: lower $f'$, so $v+v_S$ (making denominator larger).

2.  **Confusing Source and Observer Velocities ($v_S$ vs. $v_O$):** Mixing up which velocity belongs in the numerator and which in the denominator.
    *   *Why it happens:* Not understanding the physical basis of each term (observer's motion affects relative speed of waves, source's motion affects wavelength).
    *   *Correction:* Remember the structure: $v_O$ (observer) is always with $v$ in the numerator, $v_S$ (source) is always with $v$ in the denominator. A simple mnemonic is "Observer on Top."

3.  **Using Total Velocity Instead of Radial Velocity:** When motion is not directly along the line connecting source and observer (like Example 4), using the total speed instead of its component along the line of sight.
    *   *Why it happens:* Forgetting that the Doppler effect is only caused by the relative motion *along the line of sight*.
    *   *Correction:* Always resolve velocities into components along the line connecting the source and observer. The perpendicular component of velocity causes no Doppler shift.

4.  **Incorrectly Applying the Speed of Light vs. Speed of Sound Formulas:** Using the classical formula for light waves at relativistic speeds, or vice-versa.
    *   *Why it happens:* Not appreciating the fundamental difference in how light propagates (no medium, constant $c$) versus sound (in a medium, speed relative to medium).
    *   *Correction:* For sound or water waves, use $f' = f \left( \frac{v \pm v_O}{v \mp v_S} \right)$. For light, if speeds are small compared to $c$, use the approximate $f' = f \left( 1 \pm \frac{v_{rel}}{c} \right)$. For relativistic speeds, use the full relativistic Doppler formula.

5.  **Forgetting the Medium's Role:** For sound waves, the velocities $v_O$ and $v_S$ are measured relative to the *medium* in which the sound travels. If the medium itself is moving (e.g., wind), its speed must be factored into the effective speed of sound $v$.
    *   *Why it happens:* Assuming the medium is always stationary or neglecting wind effects.
    *   *Correction:* If there's a wind, the effective speed of sound becomes $v \pm v_{wind}$, where the sign depends on whether the wind is with or against the direction of wave propagation. This adjusted speed should be used for $v$ in the formula.

## 7. Textbook-precise explanation

The Doppler effect describes the change in frequency or wavelength of a wave in relation to an observer who is moving relative to the wave source. For waves propagating in a medium, such as sound waves, the effect depends on the velocities of both the source and the observer relative to the medium.

Consider a source $S$ emitting waves of frequency $f$ and wavelength $\lambda$ that propagate through a medium at a speed $v$. An observer $O$ perceives an apparent frequency $f'$. Let $v_S$ be the speed of the source relative to the medium and $v_O$ be the speed of the observer relative to the medium.

The general equation for the observed frequency $f'$ for waves in a medium is given by:

$$f' = f \left( \frac{v \pm v_O}{v \mp v_S} \right)$$

where:
*   $f$ is the frequency of the source.
*   $v$ is the speed of the wave in the medium.
*   $v_O$ is the speed of the observer relative to the medium.
*   $v_S$ is the speed of the source relative to the medium.

**Sign Convention:**
*   In the numerator, the plus sign ($+v_O$) is used when the observer moves **towards** the source, and the minus sign ($-v_O$) is used when the observer moves **away** from the source.
*   In the denominator, the minus sign ($-v_S$) is used when the source moves **towards** the observer, and the plus sign ($+v_S$) is used when the source moves **away** from the observer.

This convention ensures that the observed frequency $f'$ increases when the source and observer are approaching each other and decreases when they are receding from each other. The velocities $v_O$ and $v_S$ represent the magnitudes of the speeds and are always taken as positive values; the signs in the formula account for the direction of motion.

**Derivation Rationale:**
1.  **Effect of moving observer:** If the source is stationary ($v_S = 0$), the wavelength $\lambda = v/f$ remains unchanged. However, the observer's relative speed with respect to the wave crests changes to $v \pm v_O$. The observed frequency $f'$ is then this relative speed divided by the constant wavelength:
    $$f' = \frac{v \pm v_O}{\lambda} = \frac{v \pm v_O}{v/f} = f \left( \frac{v \pm v_O}{v} \right)$$
2.  **Effect of moving source:** If the observer is stationary ($v_O = 0$), the source's motion alters the wavelength. In one period $T = 1/f$, the source travels $v_S T$ and emits a wave that travels $vT$. The effective wavelength $\lambda'$ becomes $(v \mp v_S)T$. The observed frequency $f'$ is the wave speed $v$ divided by this altered wavelength:
    $$f' = \frac{v}{\lambda'} = \frac{v}{(v \mp v_S)T} = \frac{v}{(v \mp v_S)/f} = f \left( \frac{v}{v \mp v_S} \right)$$
3.  **Combined effect:** When both are moving, the altered wavelength due to the source's motion is perceived by the moving observer. The frequency observed by an observer moving with speed $v_O$ relative to the medium, when waves of speed $v$ and altered wavelength $\lambda' = (v \mp v_S)/f$ are propagating, is:
    $$f' = \frac{v \pm v_O}{\lambda'} = f \left( \frac{v \pm v_O}{v \mp v_S} \right)$$

This explanation aligns with standard university physics textbooks such as *Fundamentals of Physics* by Halliday, Resnick, and Walker (Chapter 17, "Waves—II") or *Physics for Scientists and Engineers* by Serway and Jewett (Chapter 17, "Sound Waves").

## 8. ASCII diagrams

Here are two ASCII diagrams illustrating the Doppler effect for a moving source.

```text
Diagram 1: Source Moving Towards Observer

Observer (O)
  |
  |
  V
  .

                           -> Direction of Source Motion
                  S -------->
                    \
                     \
                      \  Wavefronts are compressed in front of the source.
                       \
                        \
                         \
                          \
                           \
                            \
                             \
                              \
                               \
                                VVVVVVVV (High Frequency, Shorter Wavelength)
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                                ^^^^^^^^
                               