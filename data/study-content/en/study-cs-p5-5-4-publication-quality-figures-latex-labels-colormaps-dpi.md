## 1. The one-sentence answer
**Publication-quality figures in Python are produced by rendering vector or high-resolution raster output whose text is typeset by LaTeX, whose colour scale is perceptually uniform, and whose pixel density meets or exceeds journal requirements.**

Matplotlib’s default settings produce screen-resolution images with Computer Modern or sans-serif fonts and arbitrary colour maps. Replacing those defaults with explicit LaTeX rendering, a colour-map chosen for uniform perceptual spacing, and a DPI value of at least 300 yields figures that survive reduction, colour-blind review, and archival printing without visible degradation.

The three controls—text engine, colour map, and resolution—are orthogonal yet must be set together; changing only DPI on a jet-coloured plot still produces an unpublishable result.

> [!NOTE]
> The single most important realisation is that “publication quality” is not an aesthetic judgment but a set of measurable, machine-enforceable constraints on font embedding, colour-space linearity, and spatial sampling frequency.

## 2. Why this matters — concrete and current
Nature journals require 300 dpi TIFF or 600 dpi EPS for raster elements and embed all fonts; a figure generated at 72 dpi will be rejected at submission and must be regenerated from source data weeks later.

The Event Horizon Telescope collaboration published the first image of a black-hole shadow in 2019; every panel was produced with matplotlib using the `inferno` colour map and `rcParams["text.usetex"] = True` so that Greek letters in the scale bar matched the surrounding LaTeX manuscript exactly.

Semiconductor foundries such as TSMC publish process-control charts that compare wafer maps across multiple process nodes; a non-perceptually-uniform map such as `jet` can hide a 2 nm critical-dimension variation that a viridis map reveals immediately.

In reinforcement-learning papers from DeepMind and OpenAI, learning curves are routinely saved at 600 dpi with LaTeX labels so that axis limits and legend entries survive both the arXiv compression pipeline and the final camera-ready reformatting without re-rendering.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Matplotlib `Figure` and `Axes` objects | All parameter changes are attached to these objects or to `rcParams`. |
| Python `dict` and context-manager usage | `plt.rc_context` temporarily overrides style without polluting global state. |
| Perceptual uniformity of colour spaces | Guarantees that equal steps in data produce equal steps in perceived colour, satisfying journal accessibility rules. |
| Vector (PDF/EPS) versus raster (PNG/TIFF) formats | Determines whether LaTeX text remains infinitely sharp after scaling. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Separate content from presentation
Store numerical data and plotting commands in a script; keep every visual attribute in a configuration dictionary or `matplotlibrc` file.  
Example: `data = np.loadtxt("spectrum.dat")`; later decide that the x-axis label must be `$\lambda\,/\,\mathrm{nm}$`.  
Formal statement:  
$$
\text{Figure} = f(\text{data},\;\theta_{\text{style}})
$$  
where \(\theta_{\text{style}}\) contains font, colour-map and DPI entries.  
> [!WARNING]  
> Hard-coding `plt.xlabel("lambda (nm)")` inside the analysis script forces a complete re-run when the journal changes its house style.

### Step 2 — Activate the LaTeX text engine
Set `rcParams["text.usetex"] = True` and ensure a working TeX distribution is on the path.  
Example: after the switch, `plt.title(r"$\int_0^\infty e^{-x}\,dx$")` renders with proper kerning.  
Formal statement:  
$$
\text{render}(s) = \text{LaTeX}(s) \quad\text{iff}\quad \texttt{text.usetex}=\texttt{True}.
$$  
> [!WARNING]  
> Forgetting to escape backslashes (`\\int` not `\int`) produces a silent fallback to mathtext and mismatched fonts.

### Step 3 — Choose a perceptually uniform colour map
Replace the default `jet` with `viridis`, `plasma`, `cividis` or `cmcrameri` maps.  
Example: `plt.imshow(Z, cmap="viridis")`.  
Formal statement: a map \(C:[0,1]\to\text{sRGB}\) is uniform when the CIEDE2000 distance between adjacent samples is constant.  
> [!WARNING]  
> Using `jet` on a diverging data set creates artificial boundaries at yellow and cyan that do not exist in the data.

### Step 4 — Set output resolution and container
Use `fig.savefig("fig.pdf", dpi=300, bbox_inches="tight")` or `dpi=600` for TIFF.  
Formal statement: required pixel density satisfies  
$$
\text{DPI} \ge \frac{\text{line width in print (mm)}}{\text{desired feature size (mm)}} \times 25.4.
$$  
> [!WARNING]  
> Saving at 72 dpi and later up-sampling in PowerPoint re-introduces aliasing that referees notice immediately.

### Step 5 — Verify font embedding and colour-space
After export, run `pdfinfo` or `mutool info`; all fonts must be embedded and the colour space must be DeviceRGB or DeviceCMYK.  
Formal statement: a PDF is publication-ready when  
$$
\forall \text{fonts }f:\; \texttt{Embedded}(f)=\texttt{True}.
$$  
> [!WARNING]  
> Subsetting fonts without the journal’s required glyphs produces “missing character” boxes after final typesetting.

## 5. Worked examples — every step shown

**Example 1 — Minimal LaTeX label**  
*Given:* a simple line plot.  
*Find:* an x-label rendered by LaTeX.  
```python
import matplotlib.pyplot as plt
plt.rcParams["text.usetex"] = True
plt.plot([0,1],[0,1])
plt.xlabel(r"$\xi$")
plt.savefig("ex1.pdf", dpi=300)
```
*Why* the `rcParams` line precedes any plotting call: global settings are read at artist creation time.  
*Why* the raw string `r"..."` is required: it prevents Python from interpreting backslashes.  
**Final answer**  
`ex1.pdf` contains an embedded Type-1 font for \(\xi\).

*Reflection*  
The only non-obvious step was the placement of the `rcParams` assignment; moving it after `plot` silently fails.

**Example 2 — Switch to viridis**  
*Given:* a 2-D Gaussian on a grid.  
*Find:* an image free of artificial yellow rings.  
```python
import numpy as np
x = np.linspace(-2,2,200)
X,Y = np.meshgrid(x,x)
Z = np.exp(-(X**2+Y**2))
plt.imshow(Z, cmap="viridis", extent=[-2,2,-2,2])
plt.savefig("ex2.pdf", dpi=300)
```
*Why* `extent` is supplied: it restores data coordinates after `imshow`’s default pixel indexing.  
**Final answer**  
The colour bar now varies monotonically in both luminance and hue.

*Reflection*  
Choosing the colour map is independent of the LaTeX setting; both must be present for a journal figure.

**Example 3 — High-DPI TIFF for a journal that forbids PDF**  
*Given:* the same image.  
*Find:* a 600 dpi TIFF with LZW compression.  
```python
plt.imsave("ex3.tif", Z, cmap="viridis", dpi=600)
# or via savefig
plt.savefig("ex3.tif", dpi=600, pil_kwargs={"compression":"tiff_lzw"})
```
*Why* `pil_kwargs` is passed: matplotlib delegates raster compression to Pillow.  
**Final answer**  
The resulting file is 600 pixels per inch and under 2 MB.

*Reflection*  
File-size considerations appear only after the perceptual and mathematical constraints are satisfied.

**Example 4 — Temporary style override for a multi-panel manuscript**  
*Given:* two figures that must obey different journal styles.  
*Find:* isolated configuration.  
```python
with plt.rc_context({"text.usetex":True, "font.size":9}):
    fig,ax = plt.subplots()
    ax.plot(np.random.randn(100))
    fig.savefig("ex4.pdf", dpi=300)
```
*Why* the context manager restores the previous state automatically.  
**Final answer**  
No global side-effects leak into subsequent cells.

*Reflection*  
Context managers are the only safe way to vary style inside a notebook.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| `text.usetex` left at its default False | Matplotlib starts with a fast mathtext backend | Place the assignment in the first cell or in a `matplotlibrc` file loaded at import time |
| Using `jet` because “it has high contrast” | Legacy tutorials and MATLAB heritage | Add `cmap="viridis"` to every colour-mapping call and enforce via a project style sheet |
| Saving at `dpi=100` “to keep files small” | Confusion between screen and print resolution | Always compute required DPI from the journal’s instructions before the first `savefig` |
| Forgetting `bbox_inches="tight"` | Axis labels clipped at the figure edge | Make it the default argument in a helper function |
| Mixing LaTeX and mathtext in the same figure | Partial `rc` changes | Use a single `rc_context` for the entire figure |
| Colour-map not colour-blind safe | viridis is safe, but `plasma` is not for all deficiencies | Test with `colorspacious` or the journal’s colour-blindness simulator |
| EPS output with Type-3 fonts | Ghostscript subsetting defaults | Add `rcParams["pdf.fonttype"]=42` and prefer PDF over EPS |

## 7. The textbook-precise statement
A figure is publication-ready when (i) every text element is typeset by a conforming TeX engine and embedded as a Type-1 or TrueType font, (ii) every scalar-to-colour mapping is realised by a colour map whose CIEDE2000 gradient is constant to within 5 %, and (iii) the final raster or vector container meets or exceeds the spatial sampling frequency stated by the target journal (typically 300 dpi).  
See Hunter, J. D. “Matplotlib: A 2D graphics environment”, *Computing in Science & Engineering* **9** (2007) 90–95, §4 “Text rendering”.

## 8. Visual — diagram or schematic
```text
Screen (72 dpi)          Print (300 dpi)
+-------------+          +-----------------------------+
|  jet map    |  -->     |  viridis map, LaTeX labels  |
|  blurry text|          |  embedded fonts, 300 dpi    |
+-------------+          +-----------------------------+
      ^                           ^
   default                   rcParams + savefig
```

## 9. The memory technique
**The hook**  
Imagine the figure as a passport: LaTeX is the photograph that must be crisp, the colour map is the security hologram that must not change under different lights, and DPI is the watermark that proves the document has not been enlarged.

**What to overlearn**  
- `plt.rcParams["text.usetex"] = True`  
- `cmap="viridis"` (or `plasma`, `cividis`)  
- `savefig(..., dpi=300, bbox_inches="tight")`

**Spaced-repetition schedule**  
Review the three lines above after 1 day, 3 days, 7 days, 16 days and 35 days by regenerating the same test figure each time.

**First-principles fallback**  
If you forget the incantation, start from the requirement that text must survive scaling: only an external typesetting engine (LaTeX) plus an embedded font satisfies that requirement; everything else follows.

## 10. What this unlocks
Once these controls are internalised, the next layer of figure craftsmanship—multi-panel alignment with `GridSpec`, precise control of tick locators for logarithmic data, and automatic generation of supplementary material—becomes mechanical rather than artisanal.

- Publication-ready multi-panel layouts (`constrained_layout`, `GridSpec`)  
- Colour-map creation with `LinearSegmentedColormap`  
- Automated figure assembly pipelines (`pypdf`, `svgutils`)  
- Integration with LaTeX documents via `\includegraphics` and the `pgf` backend

## 11. Self-check — five questions, no answers
1. A journal demands 600 dpi TIFF files. If your data span 8 cm on the printed page, how many pixels wide must the saved image be?  
2. Why does placing `plt.rcParams["text.usetex"] = True` after the first `plot` call often produce mixed fonts?  
3. Which colour map among `jet`, `viridis`, `seismic` and `flag` is guaranteed to be perceptually uniform?  
4. What happens to a PDF figure if `pdf.fonttype` remains at its default value of 3 when submitted to a publisher that forbids Type-3 fonts?  
5. Construct a minimal script that produces a 300 dpi PDF whose axis label contains both a Greek letter and a unit in Roman type; verify font embedding with an external tool.