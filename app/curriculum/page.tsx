"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { KnowledgeBadge } from "@/components/shared/KnowledgeBadge";
import { CURRICULUM, type CurriculumTopic, type CurriculumField } from "@/lib/curriculum-data";
import type { FieldKey, KnowledgeLevel } from "@/lib/types";
import { cn } from "@/lib/utils";

const FIELD_THEME: Record<FieldKey, { chip: string; bar: string; ring: string; rail: string }> = {
  math: {
    chip: "bg-field-math-bg text-field-math",
    bar: "bg-field-math",
    ring: "ring-field-math/30",
    rail: "border-field-math/40",
  },
  cs: {
    chip: "bg-field-cs-bg text-field-cs",
    bar: "bg-field-cs",
    ring: "ring-field-cs/30",
    rail: "border-field-cs/40",
  },
  physics: {
    chip: "bg-field-physics-bg text-field-physics",
    bar: "bg-field-physics",
    ring: "ring-field-physics/30",
    rail: "border-field-physics/40",
  },
};

function pseudoLevel(id: string): KnowledgeLevel {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return (Math.abs(h) % 6) as KnowledgeLevel;
}

export default function CurriculumPage() {
  const router = useRouter();
  const [activeField, setActiveField] = useState<FieldKey>("math");
  const [search, setSearch] = useState("");
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());

  const filteredFields = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return CURRICULUM;
    return CURRICULUM.map((field) => ({
      ...field,
      phases: field.phases
        .map((phase) => ({
          ...phase,
          topics: phase.topics.filter(
            (t) =>
              t.title.toLowerCase().includes(q) ||
              t.number.includes(q) ||
              t.subtopics.some((s) => s.title.toLowerCase().includes(q)),
          ),
        }))
        .filter((p) => p.topics.length > 0),
    }));
  }, [search]);

  function toggleTopic(id: string) {
    setExpandedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function onSubtopicClick(subId: string) {
    router.push(`/learn/${encodeURIComponent(subId)}`);
  }

  return (
    <div className="space-y-6">
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Curriculum Map</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Every topic, every subtopic. From absolute zero to elite level.
          </p>
        </div>
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search topics, subtopics..."
            className="pl-9"
          />
        </div>
      </motion.header>

      <Tabs value={activeField} onValueChange={(v) => setActiveField(v as FieldKey)} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:max-w-2xl">
          {CURRICULUM.map((field) => (
            <TabsTrigger key={field.key} value={field.key} className="gap-2">
              <span className={cn("h-2 w-2 rounded-full", FIELD_THEME[field.key].bar)} />
              {field.name.split(" ")[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        {filteredFields.map((field) => (
          <TabsContent key={field.key} value={field.key} className="mt-4 space-y-4">
            <motion.p
              key={field.key + "-tag"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-muted-foreground"
            >
              {field.tagline}
            </motion.p>
            <Accordion
              type="multiple"
              defaultValue={field.phases.slice(0, 1).map((p) => p.id)}
              className="space-y-3"
            >
              {field.phases.map((phase, pi) => {
                const topics = phase.topics;
                const completion = Math.round(
                  (topics.reduce((acc, t) => acc + pseudoLevel(t.id), 0) /
                    Math.max(1, topics.length * 5)) *
                    100,
                );
                return (
                  <motion.div
                    key={phase.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: pi * 0.04 }}
                  >
                    <Card className={cn("overflow-hidden ring-1", FIELD_THEME[field.key].ring)}>
                      <AccordionItem value={phase.id} className="border-b-0">
                        <AccordionTrigger className="px-5 py-4 hover:no-underline">
                          <div className="flex flex-1 items-center justify-between pr-3">
                            <div className="flex items-center gap-3 text-left">
                              <Badge
                                variant="outline"
                                className={cn("h-7 rounded-md px-2", FIELD_THEME[field.key].chip)}
                              >
                                Phase {phase.number}
                              </Badge>
                              <div>
                                <p className="font-semibold">{phase.title}</p>
                                <p className="text-xs text-muted-foreground">
                                  {phase.subtitle} · {phase.duration}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-muted-foreground">{completion}%</span>
                              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-secondary">
                                <div
                                  className={cn("h-full", FIELD_THEME[field.key].bar)}
                                  style={{ width: `${completion}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-3 pb-4 sm:px-5">
                          <ul className="divide-y divide-border rounded-md border bg-card">
                            {topics.map((topic, ti) => (
                              <TopicNode
                                key={topic.id}
                                field={field}
                                topic={topic}
                                expanded={expandedTopics.has(topic.id)}
                                onToggle={() => toggleTopic(topic.id)}
                                onSubtopicClick={(subId) => onSubtopicClick(subId)}
                                index={ti}
                              />
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Card>
                  </motion.div>
                );
              })}
            </Accordion>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function TopicNode({
  field,
  topic,
  expanded,
  onToggle,
  onSubtopicClick,
  index,
}: {
  field: CurriculumField;
  topic: CurriculumTopic;
  expanded: boolean;
  onToggle: () => void;
  onSubtopicClick: (subId: string) => void;
  index: number;
}) {
  const level = pseudoLevel(topic.id);
  const theme = FIELD_THEME[field.key];

  return (
    <motion.li
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.015 }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={`subtopics-${topic.id}`}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-accent/40"
      >
        <div className="flex flex-1 items-center gap-3">
          <ChevronRight
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
              expanded && "rotate-90",
            )}
          />
          <span className="w-12 shrink-0 font-mono text-xs text-muted-foreground">
            {topic.number}
          </span>
          <div>
            <p className="text-sm font-medium">{topic.title}</p>
            <p className="text-xs text-muted-foreground">{topic.subtopics.length} subtopics</p>
          </div>
        </div>
        <KnowledgeBadge level={level} size="sm" />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={`subtopics-${topic.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <ul
              className={cn(
                "ml-[34px] my-1 space-y-0.5 border-l-2 pl-3 pr-3 pb-3",
                theme.rail,
              )}
            >
              {topic.subtopics.map((s, i) => {
                const subLevel = pseudoLevel(s.id);
                return (
                  <motion.li
                    key={s.id}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.01 }}
                  >
                    <button
                      type="button"
                      onClick={() => onSubtopicClick(s.id)}
                      className="group flex w-full items-center gap-3 rounded-md px-3 py-1.5 text-left text-sm transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 shrink-0 rounded-full",
                          theme.bar,
                          "opacity-50 group-hover:opacity-100",
                        )}
                      />
                      <span className="flex-1">{s.title}</span>
                      <KnowledgeBadge level={subLevel} size="sm" />
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}
