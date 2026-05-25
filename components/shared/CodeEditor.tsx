"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <Skeleton className="h-[260px] w-full" />,
});

type EditorProps = ComponentProps<typeof Editor>;

export function CodeEditor(props: EditorProps) {
  return (
    <div className="overflow-hidden rounded-md border bg-slate-900">
      <Editor
        height={props.height ?? 260}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          scrollBeyondLastLine: false,
          tabSize: 2,
          ...(props.options ?? {}),
        }}
        {...props}
      />
    </div>
  );
}
