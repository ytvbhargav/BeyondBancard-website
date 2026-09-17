"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useRef } from "react";
import { MessageSquareText } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ContactTopicId } from "@/content/contact";

type TopicHandler = (topic: ContactTopicId) => void;

const ContactTopicContext = createContext<{ current: TopicHandler | null } | null>(null);

/**
 * Links the need directory to the message form on /contact-us (D-054). The form
 * registers a handler; each quadrant's "Message us about this" button calls it.
 * Only a ref is shared, so pressing a button never re-renders the directory.
 */
export function ContactTopicProvider({ children }: { children: React.ReactNode }) {
  const handlerRef = useRef<TopicHandler | null>(null);
  return <ContactTopicContext.Provider value={handlerRef}>{children}</ContactTopicContext.Provider>;
}

/**
 * Registers the form's topic handler once. The latest callback is kept in a ref,
 * so re-renders (every keystroke in the message) do not re-register it.
 */
export function useContactTopicHandler(onTopic: TopicHandler) {
  const handlerRef = useContext(ContactTopicContext);
  const latest = useRef(onTopic);

  useLayoutEffect(() => {
    latest.current = onTopic;
  });

  useEffect(() => {
    if (!handlerRef) return;
    const handler: TopicHandler = (topic) => latest.current(topic);
    handlerRef.current = handler;
    return () => {
      if (handlerRef.current === handler) handlerRef.current = null;
    };
  }, [handlerRef]);
}

/**
 * Quiet text button that picks a topic in the form below and moves focus to its
 * first field. The need's title is part of the accessible name, so the four
 * buttons stay distinct in a screen reader's list of controls.
 */
export function MessageUsButton({
  topic,
  needTitle,
  className,
  children,
}: {
  topic: ContactTopicId;
  needTitle: string;
  className?: string;
  children: React.ReactNode;
}) {
  const handlerRef = useContext(ContactTopicContext);
  return (
    <button
      type="button"
      aria-controls="contact-form"
      onClick={() => handlerRef?.current?.(topic)}
      className={cn(
        "link-draw-parent inline-flex min-h-11 w-fit items-center gap-2 justify-self-start text-left text-[0.9375rem] font-medium text-brand-700",
        className,
      )}
    >
      <MessageSquareText aria-hidden strokeWidth={1.75} className="size-4 shrink-0" />
      <span className="link-draw">
        {children}
        <span className="sr-only">: {needTitle}</span>
      </span>
    </button>
  );
}
