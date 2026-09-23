"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { m } from "motion/react";
import { Controller, useForm, useWatch, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Lock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Confirm } from "@/components/ui/confirm";
import { Input } from "@/components/ui/input";
import { TextLink } from "@/components/ui/text-link";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Field, FieldError, describedBy } from "@/components/forms/Field";
import { contactDefaults, contactFields, contactSchema, type ContactValues } from "@/components/forms/contact-schema";
import { useContactTopicHandler } from "@/components/sections/ContactTopic";
import { contactPage, contactTopics, type ContactTopicId } from "@/content/contact";
import { lenisRef } from "@/lib/lenis";
import { duration, ease } from "@/lib/motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { cn } from "@/lib/utils";

const SUBMIT_DELAY = 1200;
/** Screen readers hear the character count once typing pauses (GOV.UK character count pattern). */
const COUNT_ANNOUNCE_DELAY = 1000;
/** The topic note is cleared first and re-set after this pause, so a repeat press is announced again. */
const TOPIC_ANNOUNCE_DELAY = 150;

const copy = contactPage.form;
const fieldId = (name: keyof ContactValues) => `contact-${name}`;
const SUBMIT_ID = "contact-submit";

/**
 * Contact message form (/contact-us, D-054). Same field primitives and error
 * pattern as the application form: inline errors, focus on the first invalid
 * field, a simulated send and a drawn check on success. Nothing is sent
 * anywhere: there is no action, no fetch, and the wait is a timer.
 */
export function ContactForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    setFocus,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: contactDefaults,
    // Errors appear on submit, then clear as each field is fixed. Validating on blur
    // would flag First name as soon as a directory button moves focus there.
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: false,
  });
  const [status, setStatus] = useState<"editing" | "sending" | "sent">("editing");
  const [sentName, setSentName] = useState("");
  const [topicFrom, setTopicFrom] = useState<ContactTopicId | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const announceTimer = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const focusOnMount = useRef(false);
  const reduce = useReducedMotionSafe();

  const topic = useWatch({ control, name: "topic" });
  const message = useWatch({ control, name: "message" });

  // Demo: no network request. The "send" is a short wait, then the success panel.
  useEffect(() => {
    if (status !== "sending") return;
    const t = window.setTimeout(() => setStatus("sent"), SUBMIT_DELAY);
    return () => window.clearTimeout(t);
  }, [status]);

  useEffect(() => () => window.clearTimeout(announceTimer.current), []);

  // After "Send another message", or a directory button pressed while the success
  // panel shows, the fields mount again: focus the first one once it is attached.
  const formRef = useCallback((el: HTMLFormElement | null) => {
    if (!el || !focusOnMount.current) return;
    focusOnMount.current = false;
    document.getElementById(fieldId("firstName"))?.focus({ preventScroll: true });
  }, []);

  useContactTopicHandler((next) => {
    const card = cardRef.current;
    if (!card) return;

    if (status !== "sending") {
      if (status === "sent") {
        reset(contactDefaults);
        focusOnMount.current = true;
        setStatus("editing");
      }
      setValue("topic", next, { shouldDirty: true, shouldValidate: isSubmitted });
      setTopicFrom(next);
      if (status === "editing") document.getElementById(fieldId("firstName"))?.focus({ preventScroll: true });

      // The live region stays mounted outside the form, and is emptied before the new text lands,
      // so the topic is announced after a send and when the same button is pressed twice.
      const label = contactTopics.find((t) => t.id === next)?.label ?? "";
      setAnnouncement("");
      window.clearTimeout(announceTimer.current);
      announceTimer.current = window.setTimeout(
        () => setAnnouncement(`${copy.topicNote(label)}.`),
        TOPIC_ANNOUNCE_DELAY,
      );
    }

    // Bring the card's top (heading and topic note) under the sticky header. Both paths
    // honour the root scroll-padding-top; Lenis owns the scroll position when it is running.
    if (reduce) card.scrollIntoView({ block: "start" });
    else if (lenisRef.current) {
      // Lenis measures from its own last-seen position, which lags a frame behind a scroll
      // made in the same task (a screen reader or voice command scrolls the button into view
      // and presses it at once). Syncing first keeps the landing point exact.
      lenisRef.current.resize();
      lenisRef.current.scrollTo(card);
    } else card.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  const onSubmit = handleSubmit(
    (data) => {
      // The fieldset is disabled while sending; move focus off a field first so it doesn't fall to <body>.
      const submit = document.getElementById(SUBMIT_ID);
      if (submit && document.activeElement?.closest("fieldset")) submit.focus();
      setSentName(data.firstName);
      setStatus("sending");
    },
    (errs) => {
      const first = contactFields.find((f) => errs[f]);
      if (first) setFocus(first);
    },
  );

  function sendAnother() {
    reset(contactDefaults);
    setTopicFrom(null);
    setAnnouncement("");
    focusOnMount.current = true;
    setStatus("editing");
  }

  const sending = status === "sending";
  const topicLabel = contactTopics.find((t) => t.id === topic)?.label;
  const topicNote = topicFrom && topic === topicFrom && topicLabel ? copy.topicNote(topicLabel) : "";

  const text = (
    name: "firstName" | "lastName" | "email" | "phone" | "businessName",
    props: React.ComponentProps<"input">,
    { required = false, className }: { required?: boolean; className?: string } = {},
  ) => {
    const id = fieldId(name);
    return (
      <Field id={id} label={copy.labels[name]} required={required} error={errors[name]?.message} className={className}>
        <Input
          id={id}
          aria-required={required || undefined}
          aria-invalid={!!errors[name]}
          aria-describedby={describedBy(id, { error: !!errors[name] })}
          {...props}
          {...register(name)}
        />
      </Field>
    );
  };

  return (
    <div ref={cardRef} id="contact-form" className="rounded-lg border border-line bg-surface">
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
      {status === "sent" ? (
        <ContactSuccess firstName={sentName} onAgain={sendAnother} />
      ) : (
        <form
          ref={formRef}
          noValidate
          onSubmit={(e) => (sending ? e.preventDefault() : onSubmit(e))}
          aria-labelledby="contact-form-title"
          aria-describedby="contact-required-hint"
        >
          <div className="border-b border-line px-6 pt-7 pb-6 sm:px-8 lg:px-9">
            <h2 id="contact-form-title" className="type-h3">
              {copy.title}
              {/* The heading always renders; only the demo marker depends on the flag. */}
              <Confirm variant="marker" note={copy.confirmNote}>
                {null}
              </Confirm>
            </h2>
            <p id="contact-required-hint" className="mt-2 type-small text-muted">
              {copy.requiredHint}
            </p>
            {topicNote && (
              <p className="mt-4 inline-flex items-start gap-2 rounded-sm bg-paper px-3 py-1.5 type-small text-ink-900 ring-1 ring-line ring-inset">
                <Tag aria-hidden strokeWidth={1.75} className="mt-[3px] size-3.5 shrink-0 text-muted" />
                {topicNote}
              </p>
            )}
          </div>

          {/* Groups nothing for assistive tech (the form is already named); it only disables the fields while sending. */}
          <fieldset
            role="none"
            disabled={sending}
            className="grid min-w-0 gap-6 px-6 py-8 sm:grid-cols-2 sm:px-8 lg:px-9"
          >
            {text("firstName", { autoComplete: "given-name" }, { required: true })}
            {text("lastName", { autoComplete: "family-name" }, { required: true })}
            {text("email", { type: "email", autoComplete: "email", inputMode: "email" }, { required: true })}
            {text("phone", { type: "tel", autoComplete: "tel", inputMode: "tel" })}
            {text("businessName", { autoComplete: "organization" }, { className: "sm:col-span-2" })}

            <Field
              id={fieldId("topic")}
              label={copy.labels.topic}
              required
              error={errors.topic?.message}
              className="sm:col-span-2"
            >
              <Controller
                control={control}
                name="topic"
                render={({ field }) => (
                  // An empty value shows the placeholder, so a reset clears the choice.
                  <Select value={field.value} onValueChange={field.onChange} name={field.name}>
                    <SelectTrigger
                      id={fieldId("topic")}
                      ref={field.ref}
                      onBlur={field.onBlur}
                      aria-required
                      aria-invalid={!!errors.topic}
                      aria-describedby={describedBy(fieldId("topic"), { error: !!errors.topic })}
                    >
                      <SelectValue placeholder={copy.topicPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {contactTopics.map((t) => (
                        <SelectItem key={t.id} value={t.id}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <MessageField
              length={message.length}
              error={errors.message?.message}
              className="sm:col-span-2"
              {...register("message")}
            />
          </fieldset>

          <div className="flex flex-col gap-5 border-t border-line px-6 py-6 sm:flex-row sm:items-center sm:gap-6 sm:px-8 lg:px-9">
            <Button id={SUBMIT_ID} type="submit" aria-disabled={sending || undefined} className="w-full sm:w-auto">
              {sending ? (
                <span className="inline-flex items-center gap-2">
                  <LoaderCircle aria-hidden strokeWidth={2} className="size-4 animate-spin" />
                  {copy.submitting}
                </span>
              ) : (
                copy.submit
              )}
            </Button>
            {/* Where visitors hand over their details: what happens to them. */}
            <div className="grid gap-1.5 type-small text-muted">
              <p className="flex items-start gap-2">
                <Lock aria-hidden strokeWidth={1.75} className="mt-0.5 size-4 shrink-0" />
                <span>
                  {copy.privacy.before}
                  <TextLink href={copy.privacy.href} className="text-brand-700">
                    {copy.privacy.link}
                  </TextLink>
                  {copy.privacy.after}
                </span>
              </p>
            </div>
          </div>
          <p aria-live="polite" className="sr-only">
            {sending ? copy.submitting : ""}
          </p>
        </form>
      )}
    </div>
  );
}

/**
 * Message textarea with a character count. The visible count is for sighted
 * visitors; screen readers hear it only near or over the limit, after a pause.
 */
function MessageField({
  length,
  error,
  className,
  ...field
}: { length: number; error?: string; className?: string } & UseFormRegisterReturn<"message">) {
  const id = fieldId("message");
  const { max, announceWithin } = copy.message;
  const left = max - length;
  const [spoken, setSpoken] = useState("");

  useEffect(() => {
    const next = left < 0 ? copy.message.over(-left) : left <= announceWithin ? copy.message.remaining(left) : "";
    const t = window.setTimeout(() => setSpoken(next), COUNT_ANNOUNCE_DELAY);
    return () => window.clearTimeout(t);
  }, [left, announceWithin]);

  return (
    // No `error` on Field: the error renders in the row beside the count instead of below it.
    <Field id={id} label={copy.labels.message} required className={className}>
      <p id={`${id}-hint`} className="sr-only">
        {copy.message.hint}
      </p>
      <Textarea
        id={id}
        rows={6}
        aria-required
        aria-invalid={!!error}
        aria-describedby={describedBy(id, { hint: true, error: !!error })}
        {...field}
      />
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <FieldError id={`${id}-error`} message={error} />
        </div>
        <p
          aria-hidden
          className={cn("shrink-0 pt-2 type-small tabular", left < 0 ? "font-medium text-danger-600" : "text-muted")}
        >
          {length.toLocaleString("en-US")}/{max.toLocaleString("en-US")}
        </p>
      </div>
      <p aria-live="polite" className="sr-only">
        {spoken}
      </p>
    </Field>
  );
}

/** Success panel shown in place of the form. Focuses its heading on mount; the check draws itself. */
function ContactSuccess({ firstName, onAgain }: { firstName: string; onAgain: () => void }) {
  const heading = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotionSafe();

  useEffect(() => {
    heading.current?.focus();
  }, []);

  const draw = (delay: number, d: number) => (reduce ? { duration: 0 } : { delay, duration: d, ease: ease.inOut });

  return (
    <m.div
      className="px-6 py-10 sm:px-8 sm:py-12 lg:px-9"
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : duration.base, ease: ease.out }}
    >
      <svg viewBox="0 0 64 64" className="size-16" aria-hidden>
        <m.circle
          cx="32"
          cy="32"
          r="29"
          fill="none"
          stroke="var(--color-success-600)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={draw(duration.instant, duration.slow)}
          style={{ rotate: -90, transformOrigin: "32px 32px" }}
        />
        <m.path
          d="M20 33l8 8 16-17"
          fill="none"
          stroke="var(--color-success-600)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={draw(duration.slow, duration.base)}
        />
      </svg>

      {/* The thank-you line describes the focused heading, so it is read with it. */}
      <h2 ref={heading} tabIndex={-1} aria-describedby="contact-success-body" className="mt-8 type-h2 outline-none">
        {copy.success.title}
      </h2>
      <p id="contact-success-body" className="mt-4 max-w-[36rem] type-body-lg text-muted">
        {copy.success.body(firstName)}
      </p>

      <div className="mt-10 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:gap-6">
        <Button variant="secondary" onClick={onAgain} className="w-full sm:w-auto">
          {copy.success.again}
        </Button>
      </div>
    </m.div>
  );
}
