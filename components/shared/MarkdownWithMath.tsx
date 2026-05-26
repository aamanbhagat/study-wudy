"use client";

import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import { cn } from "@/lib/utils";

interface Props {
  content: string;
  className?: string;
}

/**
 * Normalize math delimiters to the dollar form remark-math understands.
 * Some models emit LaTeX-style `\[ ... \]` and `\( ... \)`, which Markdown
 * treats as escapes and strips, breaking the math. We convert them to
 * `$$ ... $$` and `$ ... $` outside of code fences and inline code.
 */
function normalizeMath(input: string): string {
  if (!input) return input;

  // Split on fenced code blocks and inline code so we don't touch their content.
  // Pattern matches: ```...``` (fenced), `...` (inline). We keep delimiters in the
  // captured pieces so the output reconstructs the original.
  const parts = input.split(/(```[\s\S]*?```|`[^`\n]*`)/g);

  return parts
    .map((part) => {
      if (!part) return part;
      if (part.startsWith("```") || (part.startsWith("`") && part.endsWith("`"))) {
        return part; // leave code untouched
      }
      let s = part;

      // \[ ... \] (display) — supports multi-line content. Run before \( handling.
      s = s.replace(/\\\[([\s\S]*?)\\\]/g, (_m, inner: string) => `\n$$\n${inner.trim()}\n$$\n`);
      // \( ... \) (inline)
      s = s.replace(/\\\(([\s\S]*?)\\\)/g, (_m, inner: string) => `$${inner.trim()}$`);

      // After Markdown has already eaten the backslash, we sometimes see the bare
      // `[ ... ]` form on its own line containing LaTeX commands. Detect these
      // conservatively: a line that begins with `[ ` and contains a backslash-
      // escape, then closes with ` ]`. This catches the common case in the
      // screenshot while leaving normal prose `[link](...)` style intact.
      s = s.replace(
        /(^|\n)\[\s*([^\n\]]*\\[a-zA-Z]+[^\n\]]*)\s*\](?=\n|$)/gm,
        (_m, lead: string, inner: string) => `${lead}\n$$\n${inner.trim()}\n$$\n`,
      );

      return s;
    })
    .join("");
}

export function MarkdownWithMath({ content, className }: Props) {
  const normalized = useMemo(() => normalizeMath(content), [content]);

  return (
    <div
      className={cn(
        "prose prose-slate min-w-0 max-w-none break-words",
        "prose-headings:tracking-tight prose-headings:font-semibold",
        "prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg",
        "prose-p:leading-relaxed prose-p:my-3",
        // <pre> blocks
        "prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:overflow-x-auto",
        "prose-pre:p-4 prose-pre:rounded-lg",
        // Inline code
        "prose-code:before:content-none prose-code:after:content-none",
        "prose-code:rounded prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:text-[0.9em] prose-code:text-slate-900",
        // Reset code styling when nested inside <pre> so the diagram/code block stays readable
        "[&_pre_code]:bg-transparent [&_pre_code]:text-slate-100 [&_pre_code]:p-0 [&_pre_code]:rounded-none [&_pre_code]:whitespace-pre [&_pre_code]:font-mono [&_pre_code]:text-[0.85em] [&_pre_code]:leading-snug",
        "prose-li:my-1 prose-ul:my-2 prose-ol:my-2",
        "prose-strong:text-foreground",
        "prose-a:text-brand-navy hover:prose-a:underline prose-a:break-all",
        "prose-table:text-sm",
        // Tables — wrap them in horizontal scroll so wide tables never push the column wider.
        "[&_table]:block [&_table]:w-full [&_table]:overflow-x-auto",
        // KaTeX block layout — let display math wrap on small screens instead of overflowing.
        "[&_.katex-display]:my-4 [&_.katex-display]:overflow-x-auto",
        "[&_.katex-display]:py-1",
        // KaTeX inline math should not stretch the line; allow wrap around it.
        "[&_.katex]:break-words",
        "dark:prose-invert",
        "dark:[&_pre_code]:text-slate-100",
        className,
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>
        {normalized}
      </ReactMarkdown>
    </div>
  );
}
