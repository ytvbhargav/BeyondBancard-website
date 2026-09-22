"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import type { FaqExplorerCopy, FaqTopic } from "@/content/faqs";
import type { Faq } from "@/types/content";

/**
 * FAQ help centre state (D-054). The search field sits in the PageHero and the
 * answers in the section below it, so this provider holds the query and hands
 * both halves the filtered topics. It renders no markup of its own: the page
 * wraps its server-rendered hero in it.
 *
 * Matching is case- and accent-insensitive; every word of the query must appear
 * in the question, its answer or its topic's title (so "security" or "nutra"
 * finds the topic the page names). Unconfirmed answers are dropped in production
 * mode before anything is indexed, exactly as FaqSection does.
 */

/** Start and end offsets of a match in the original text. */
export type Range = [number, number];

export type FaqResult = { id: string; faq: Faq; q: Range[]; a: Range[] };
export type TopicResult = {
  id: string;
  title: string;
  /** Matches in the topic title, highlighted in its heading. */
  titleRanges: Range[];
  /** Every answer in the topic is unconfirmed, so production mode hides the whole topic. */
  unconfirmed: boolean;
  items: FaqResult[];
};

/** Queries shorter than this (letters, not spaces) filter and highlight but don't open answers, so the first keystroke doesn't expand the whole page. */
const OPEN_MIN_LENGTH = 3;

/* ------------------------------ Text folding ------------------------------ */

type Folded = { text: string; start: number[]; end: number[] };

/** Smart quotes typed on phones should find the straight quotes in the copy. */
const QUOTES: Record<string, string> = { "‘": "'", "’": "'", "“": '"', "”": '"' };

/**
 * Lower-cases, strips accents and straightens quotes, remembering which source
 * characters each folded character came from, so a match in the folded text can
 * be highlighted in the original.
 */
function fold(source: string): Folded {
  let text = "";
  const start: number[] = [];
  const end: number[] = [];
  let i = 0;
  for (const ch of source) {
    const folded = (QUOTES[ch] ?? ch).normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
    if (folded === "") {
      // A lone combining mark: keep it inside the highlight of the letter before it.
      for (let k = end.length - 1; k >= 0 && end[k] === i; k--) end[k] = i + ch.length;
    }
    for (let k = 0; k < folded.length; k++) {
      start.push(i);
      end.push(i + ch.length);
    }
    text += folded;
    i += ch.length;
  }
  return { text, start, end };
}

function findRanges(f: Folded, terms: string[]): Range[] {
  const found: Range[] = [];
  for (const term of terms) {
    let at = f.text.indexOf(term);
    while (at !== -1) {
      found.push([f.start[at], f.end[at + term.length - 1]]);
      at = f.text.indexOf(term, at + term.length);
    }
  }
  // Sort and merge overlaps ("charge" and "chargeback" in one query).
  found.sort((x, y) => x[0] - y[0]);
  const merged: Range[] = [];
  for (const r of found) {
    const last = merged[merged.length - 1];
    if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]);
    else merged.push([r[0], r[1]]);
  }
  return merged;
}

/** Fills {name} placeholders in content strings. */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

/** Picks the singular or plural sentence. */
export function plural(n: number, forms: { one: string; other: string }) {
  return n === 1 ? forms.one : forms.other;
}

/* --------------------------------- Context --------------------------------- */

type FaqExplorerValue = {
  copy: FaqExplorerCopy;
  query: string;
  setQuery: (value: string) => void;
  /** The query as typed, trimmed; shown back to the visitor. */
  term: string;
  searching: boolean;
  /** Questions on the page (after production filtering) and questions matching the query. */
  total: number;
  count: number;
  /** Every topic, with only its matching questions (possibly none). */
  topics: TopicResult[];
  openFor: (topicId: string) => string[];
  setOpenFor: (topicId: string, ids: string[]) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  resultsRef: React.RefObject<HTMLDivElement | null>;
  /** Empties the search and returns focus to the field. */
  clear: () => void;
  /** Enter in the field: scroll to the first result and focus its question. */
  showResults: () => void;
};

const FaqExplorerContext = createContext<FaqExplorerValue | null>(null);

export function useFaqExplorer() {
  const value = useContext(FaqExplorerContext);
  if (!value) throw new Error("useFaqExplorer must be used inside <FaqExplorer>");
  return value;
}

const itemId = (topicId: string, index: number) => `${topicId}:${index}`;

export function FaqExplorer({
  topics,
  copy,
  children,
}: {
  topics: FaqTopic[];
  copy: FaqExplorerCopy;
  children: React.ReactNode;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();

  // Fold every question and answer once. Item ids use the index in the full topic
  // list, so they stay stable while the search hides and shows items. A topic whose
  // answers are all unconfirmed is dropped in production mode (e.g. Accounts today).
  const index = useMemo(
    () =>
      topics
        .map((t) => ({
          id: t.id,
          title: t.title,
          folded: fold(t.title),
          unconfirmed: t.faqs.every((faq) => faq.confirm),
          items: t.faqs
            .map((faq, i) => ({ id: itemId(t.id, i), faq, q: fold(faq.q), a: fold(faq.a) }))
        }))
        .filter((t) => t.items.length > 0),
    [topics],
  );

  const terms = useMemo(() => [...new Set(fold(query).text.split(/\s+/).filter(Boolean))], [query]);
  const key = terms.join(" ");
  const searching = terms.length > 0;

  const results = useMemo<TopicResult[]>(
    () =>
      index.map((t) => ({
        id: t.id,
        title: t.title,
        titleRanges: findRanges(t.folded, terms),
        unconfirmed: t.unconfirmed,
        items: t.items
          .filter((it) =>
            terms.every((term) => it.q.text.includes(term) || it.a.text.includes(term) || t.folded.text.includes(term)),
          )
          .map((it) => ({ id: it.id, faq: it.faq, q: findRanges(it.q, terms), a: findRanges(it.a, terms) })),
      })),
    [index, terms],
  );

  const total = index.reduce((n, t) => n + t.items.length, 0);
  const count = results.reduce((n, t) => n + t.items.length, 0);

  // Open answers: without a search, whatever the visitor opened. While searching,
  // every match opens; the visitor can still close some, until the query changes.
  // Clearing the search restores what was open before it.
  const [browseOpen, setBrowseOpen] = useState<string[]>([]);
  const [searchOpen, setSearchOpen] = useState<{ key: string; ids: string[] }>({ key: "", ids: [] });
  const autoOpen = useMemo(
    () => (key.replace(/\s/g, "").length >= OPEN_MIN_LENGTH ? results.flatMap((t) => t.items.map((it) => it.id)) : []),
    [key, results],
  );
  const open = !searching ? browseOpen : searchOpen.key === key ? searchOpen.ids : autoOpen;

  const openFor = useCallback((topicId: string) => open.filter((id) => id.startsWith(`${topicId}:`)), [open]);
  const setOpenFor = useCallback(
    (topicId: string, ids: string[]) => {
      const next = [...open.filter((id) => !id.startsWith(`${topicId}:`)), ...ids];
      if (searching) setSearchOpen({ key, ids: next });
      else setBrowseOpen(next);
    },
    [open, searching, key],
  );

  const clear = useCallback(() => {
    setQuery("");
    inputRef.current?.focus();
  }, []);

  const showResults = useCallback(() => {
    const first = resultsRef.current?.querySelector<HTMLElement>('[data-slot="accordion-trigger"]');
    if (!first) return;
    first.focus({ preventScroll: true });
    // html scroll-padding keeps the topic heading clear of the sticky header.
    first.closest("section")?.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
  }, [reduce]);

  const value: FaqExplorerValue = {
    copy,
    query,
    setQuery,
    term: query.trim(),
    searching,
    total,
    count,
    topics: results,
    openFor,
    setOpenFor,
    inputRef,
    resultsRef,
    clear,
    showResults,
  };

  return <FaqExplorerContext.Provider value={value}>{children}</FaqExplorerContext.Provider>;
}

/**
 * Text with its matches marked. Screen readers announce <mark> boundaries
 * ("highlighted … out of highlighted") and some split the sentence at them, so the
 * marked copy is hidden from assistive technology and a plain copy is read instead.
 * `select-none` keeps the plain copy out of copy and paste.
 */
export function Highlighted({ text, ranges }: { text: string; ranges: Range[] }) {
  if (ranges.length === 0) return <span>{text}</span>;
  const parts: React.ReactNode[] = [];
  let last = 0;
  ranges.forEach(([s, e]) => {
    if (s > last) parts.push(text.slice(last, s));
    parts.push(
      <mark key={s} className="bg-brand-100 text-ink-900">
        {text.slice(s, e)}
      </mark>,
    );
    last = e;
  });
  if (last < text.length) parts.push(text.slice(last));
  return (
    <span>
      <span className="sr-only select-none">{text}</span>
      <span aria-hidden>{parts}</span>
    </span>
  );
}
