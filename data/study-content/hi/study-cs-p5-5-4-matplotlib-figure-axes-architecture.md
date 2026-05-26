## 1. The one-sentence answer
**Matplotlib ka figure/axes architecture ek hierarchy hai jismein Figure top-level container hota hai aur Axes uske andar actual plotting region define karta hai.**

Yeh structure aapko ek hi window mein multiple plots, precise control over labels, legends aur layouts dene ki flexibility deta hai. Jab aap `plt.plot()` call karte ho, Matplotlib internally ek Figure aur uske andar ek Axes create karta hai, lekin advanced scientific work ke liye aapko directly in dono objects se kaam karna padta hai.

Is architecture ko samajhna zaroori hai kyunki har visual element (line, text, tick) ultimately ek Artist object ke roop mein Axes ya Figure ke saath attached hota hai.

> [!NOTE]
> Sabse bada aha moment yeh hai ki ek Figure multiple Axes hold kar sakta hai, lekin har Axes sirf ek hi coordinate system aur set of data ke saath juda hota hai — yeh hi reason hai ki subplots aur inset plots itne clean tarike se kaam karte hain.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover team regularly uses Matplotlib’s object-oriented interface to generate multi-panel telemetry plots from Mars surface data; ek hi Figure mein six Axes real-time sensor readings ko align karte hain.

In semiconductor fabs, process engineers at TSMC Matplotlib Figures ko custom Axes grids ke saath use karte hain taaki wafer map aur defect heatmaps ek hi PDF report mein publish ho sakein.

AlphaFold team ke researchers Nature papers mein protein structure visualizations banate waqt multiple Axes ko share karke torsion angles aur confidence scores ko side-by-side plot karte hain.

Modern reinforcement learning frameworks jaise Stable-Baselines3 training curves ko ek Figure ke andar four Axes (reward, loss, entropy, gradient norm) mein simultaneously render karte hain taaki hyperparameter sweeps ek glance mein compare kiye ja sakein.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Python classes & objects | Figure aur Axes dono class instances hain; methods unpe call hote hain |
| NumPy arrays         | Data ko Axes mein pass karne ke liye 1-D/2-D arrays chahiye |
| Basic pyplot usage   | Quick `plt.plot` se shuru karke OO interface mein migrate karna padta hai |

Agar upar ke teen concepts comfortable nahi hain to pehle unhe revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — pyplot hides the hierarchy
Jab aap `import matplotlib.pyplot as plt` aur `plt.plot(x, y)` likhte ho, Matplotlib ek implicit current Figure aur current Axes create karta hai. Yeh shortcut chhote scripts ke liye theek hai lekin badi scientific figures ke liye control kho deta hai.

Example: `plt.plot([0,1],[0,1])` ek 640×480 Figure aur uske andar ek Axes banata hai bina aapke dekhe.

Formal statement: `pyplot` module ek state machine maintain karta hai jismein `gcf()` aur `gca()` functions current Figure aur Axes return karte hain.

> [!WARNING]
> Agar aap multiple windows khol rahe ho aur `plt.plot` use kar rahe ho to galat window mein plot ho sakta hai — state machine race conditions create karti hai.

### Step 2 — Figure is the top-level container
Figure ek canvas hai jismein size, dpi, facecolor aur tight_layout jaise global properties set ki jaati hain. Har Figure ek ya zyada Axes objects ko hold karta hai.

Formal: `fig = plt.figure(figsize=(8,6), dpi=150)` ek `Figure` instance deta hai.

### Step 3 — Axes is the actual plotting area
Axes ek rectangular region hai jismein x-y (ya 3-D) coordinate system, spines, ticks, labels aur data Artists rehte hain. Ek Figure ke andar kai Axes ho sakte hain.

Formal: `ax = fig.add_subplot(2,2,1)` ya `ax = fig.add_axes([0.1,0.1,0.8,0.8])`.

### Step 4 — Every visual element is an Artist
Lines, Text, Patches, Collections sab `matplotlib.artist.Artist` ke subclasses hain aur har ek ka owner ya to Figure ya Axes hota hai.

Formal: `ax.plot` ek `Line2D` Artist return karta hai jo `ax.lines` list mein append hota hai.

### Step 5 — The explicit object-oriented contract
Best practice yeh hai ki aap hamesha `fig, ax = plt.subplots()` se shuru karo aur phir `ax.method()` aur `fig.method()` calls karo. Isse koi hidden state nahi bachta.

Formal: `Figure` aur `Axes` dono `matplotlib.artist.Artist` ke subclasses hain aur unke methods deterministic hain.

## 5. Worked examples — har step show karo

**Example 1 — Minimal explicit figure**
*Given:* x = [0,1,2], y = [0,1,4]  
*Find:* Explicit Figure aur Axes se plot  
```python
fig = plt.figure()
ax = fig.add_subplot(111)
ax.plot([0,1,2],[0,1,4])
fig.savefig("ex1.png")
```
*Why:* `add_subplot(111)` ek hi Axes create karta hai jo poore Figure ko cover kare.  
**Final answer:** `ex1.png` mein ek clean line plot.  
*Reflection:* Yeh pattern har advanced figure ka seed hai.

**Example 2 — Two axes side-by-side**
*Given:* Same data  
*Find:* Ek row mein do Axes  
```python
fig, (ax1, ax2) = plt.subplots(1,2, figsize=(10,4))
ax1.plot([0,1,2],[0,1,4])
ax2.plot([0,1,2],[0,4,1])
```
*Why:* `plt.subplots` dono Axes ko ek hi Figure mein pack karta hai.  
**Final answer:** Shared figure with two panels.  
*Reflection:* Layout control yahin se shuru hota hai.

**Example 3 — Inset axes**
*Given:* Main plot + zoomed region  
*Find:* Manually placed inset  
```python
fig, ax = plt.subplots()
ax.plot([0,1,2,3],[0,1,4,9])
ax_inset = fig.add_axes([0.55,0.55,0.3,0.3])
ax_inset.plot([1,1.5,2],[1,2.25,4])
```
*Why:* `add_axes` normalized coordinates mein position define karta hai.  
**Final answer:** Main plot ke andar zoomed inset.  
*Reflection:* Multiple coordinate systems ek hi Figure mein.

**Example 4 — Sharing axes**
*Given:* Two subplots with identical x-axis  
*Find:* sharex=True ka effect  
```python
fig, (ax1, ax2) = plt.subplots(2,1, sharex=True)
ax1.plot([0,1,2],[0,1,4])
ax2.plot([0,1,2],[4,2,0])
```
*Why:* Shared x-axis tick labels sirf neeche dikhate hain.  
**Final answer:** Clean stacked plots without duplicate labels.  
*Reflection:* sharex/sharey memory aur visual clutter dono kam karta hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using `plt.plot` inside loops | Implicit current Axes har baar badalta hai | Hamesha explicit `ax` objects rakho          |
| Forgetting `fig.tight_layout()` | Axes labels overlap ho jaate hain           | Save se pehle `fig.tight_layout()` call karo |
| Mixing `pyplot` aur OO calls  | State machine aur explicit objects clash karte hain | Poora script OO style mein likho             |
| Wrong subplot index         | 1-based indexing yaad nahi rehti            | `plt.subplots(2,2)` ke baad indexing check karo |
| Not closing figures         | Memory leak hoti hai long scripts mein      | `plt.close(fig)` ya `plt.close('all')`       |
| Hard-coded pixel sizes      | Different dpi par layout toot jaata hai     | `figsize` aur `dpi` dono specify karo        |
| sharex=True ke saath labels | X-label sirf last Axes pe dikhta hai        | `ax.tick_params(labelbottom=True)` use karo  |

## 7. The textbook-precise statement
A Matplotlib `Figure` is a container class that holds one or more `Axes` objects together with figure-level artists (suptitle, legends, colorbars). An `Axes` is a 2-D (or 3-D) coordinate system that owns spines, ticks, labels and all data artists. All drawing occurs through the `Artist` hierarchy; every `Line2D`, `Text` or `Patch` instance maintains a reference to its parent `Axes` or `Figure`. The recommended interface (Hunter, Matplotlib: A 2D Graphics Environment, Computing in Science & Engineering, 2007) is therefore:

```python
fig, ax = plt.subplots()
ax.plot(...)
fig.savefig(...)
```
No pyplot state-machine functions should be used once the script exceeds a single cell.

## 8. Visual — diagram or schematic
```text
Figure (fig)
├── Axes ax1          Axes ax2
│   ├── Line2D        │   ├── Line2D
│   ├── Text (title)  │   ├── XAxis
│   └── YAxis         │   └── YAxis
└── Figure-level Text (suptitle)
```
Coordinates: ax1 occupies [left=0.1, bottom=0.1, width=0.35, height=0.7] in normalized figure units.

## 9. The memory technique
1. **The hook** — Figure ko “canvas” aur Axes ko “frame” samjho; canvas ek hi hota hai, andar kai frames lag sakte hain.
2. **What to overlearn** — `fig, ax = plt.subplots()` signature aur `ax.plot` return type (`list[Line2D]`).
3. **Spaced-repetition schedule** — 1 din, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Agar bhool jaaye to `plt.gcf()` aur `plt.gca()` se current objects inspect karo aur unke `__class__` print karo.

## 10. What this unlocks
Yeh architecture aapko advanced visualization libraries aur techniques ke liye taiyar karti hai.

- Seaborn aur Plotly ke underlying Axes objects ko customize karna
- Matplotlib animations (`FuncAnimation`) mein multiple Axes update karna
- Custom `GridSpec` aur nested grids
- Publication-ready multi-panel figures with shared colorbars

## 11. Self-check — five questions, no answers
1. `plt.subplots(2,2)` call karne ke baad `ax` variable ka type kya hota hai?
2. Ek hi Figure ke andar do Axes ke x-limits alag-alag rakhne ke liye kaunsa method use karoge?
3. `ax.plot` ke baad returned Line2D object ko kaise style kar sakte ho bina naye plot call kiye?
4. Agar `figsize=(6,4)` aur `dpi=100` diya ho to saved PNG ki width pixels mein kitni hogi?
5. `sharex=True` ke saath bhi agar aap chahte ho ki dono Axes ke x-tick labels dikhein, kaunsa parameter change karoge?