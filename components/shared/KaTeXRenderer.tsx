"use client";

import { InlineMath, BlockMath } from "react-katex";
import { cn } from "@/lib/utils";

interface KaTeXRendererProps {
  expression: string;
  block?: boolean;
  className?: string;
}

export function KaTeXRenderer({ expression, block = false, className }: KaTeXRendererProps) {
  return (
    <span className={cn(block && "block py-2", className)}>
      {block ? <BlockMath math={expression} /> : <InlineMath math={expression} />}
    </span>
  );
}
