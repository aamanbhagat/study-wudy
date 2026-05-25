"use client";

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import { cn } from "@/lib/utils";

interface Props {
  content: string;
  className?: string;
}

export function MarkdownWithMath({ content, className }: Props) {
  return (
    <div
      className={cn(
        "prose prose-slate max-w-none",
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
        "prose-a:text-brand-navy hover:prose-a:underline",
        "prose-table:text-sm",
        "dark:prose-invert",
        "dark:[&_pre_code]:text-slate-100",
        className,
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
