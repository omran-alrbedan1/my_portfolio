"use client";

import { Send } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import { FormStatus } from "@/components/forms/form-status";
import { validateContactForm } from "@/lib/forms/validation";
import { cn } from "@/lib/utils";
import type {
  ContactField,
  ContactFormValues,
  FormApiResult,
  ValidationErrors,
} from "@/types/forms";

const initialValues = (locale: ContactFormValues["locale"]): ContactFormValues => ({
  locale,
  name: "",
  email: "",
  message: "",
  website: "",
});

export function ContactForm() {
  const locale = useLocale();
  const t = useTranslations("forms.contactForm");
  const errorsT = useTranslations("forms.errors");
  const [values, setValues] = useState<ContactFormValues>(initialValues(locale));
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<ValidationErrors<ContactField>>(
    {}
  );
  const [status, setStatus] = useState<{
    tone: "success" | "error";
    message: string;
  } | null>(null);
  const fieldClassName =
    "min-w-0 w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-primary/50 focus:ring-1 focus:ring-primary/50";

  function updateField<K extends keyof ContactFormValues>(
    field: K,
    value: ContactFormValues[K]
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: undefined }));
    setStatus(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateContactForm(values);
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setStatus({
        tone: "error",
        message: t("error"),
      });
      return;
    }

    setSubmitting(true);
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as FormApiResult<ContactField>;

      if (result.ok) {
        setValues(initialValues(locale));
        setStatus({ tone: "success", message: result.message });
      } else {
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }
        setStatus({ tone: "error", message: result.message || t("error") });
      }
    } catch {
      setStatus({ tone: "error", message: t("error") });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
      <div className="space-y-3 text-start">
        <h2 className="max-w-full break-words text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
          {t("title")}
        </h2>
        <span className="block h-1 w-12 rounded-full bg-primary" />
      </div>

      <label htmlFor="contact-name" className="grid gap-2">
        <span className="text-sm font-medium text-white/80">
          {t("fields.name")}
        </span>
        <input
          id="contact-name"
          name="name"
          required
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          aria-label={t("fields.name")}
          className={cn(
            fieldClassName,
            fieldErrors.name && "border-red-500/50 focus:border-red-400"
          )}
          placeholder={t("placeholders.name")}
          autoComplete="name"
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
        />
        {fieldErrors.name ? (
          <span id="contact-name-error" role="alert" className="text-sm text-red-300">
            {errorsT(fieldErrors.name)}
          </span>
        ) : null}
      </label>

      <label htmlFor="contact-email" className="grid gap-2">
        <span className="text-sm font-medium text-white/80">
          {t("fields.email")}
        </span>
        <input
          id="contact-email"
          name="email"
          required
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
          type="email"
          aria-label={t("fields.email")}
          className={cn(
            fieldClassName,
            fieldErrors.email && "border-red-500/50 focus:border-red-400"
          )}
          placeholder={t("placeholders.email")}
          autoComplete="email"
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
        />
        {fieldErrors.email ? (
          <span id="contact-email-error" role="alert" className="text-sm text-red-300">
            {errorsT(fieldErrors.email)}
          </span>
        ) : null}
      </label>

      <label htmlFor="contact-message" className="grid gap-2">
        <span className="text-sm font-medium text-white/80">
          {t("fields.message")}
        </span>
        <textarea
          id="contact-message"
          name="message"
          required
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          aria-label={t("fields.message")}
          className={cn(
            fieldClassName,
            "min-h-48 resize-none",
            fieldErrors.message && "border-red-500/50 focus:border-red-400"
          )}
          placeholder={t("placeholders.message")}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={
            fieldErrors.message ? "contact-message-error" : undefined
          }
        />
        {fieldErrors.message ? (
          <span id="contact-message-error" role="alert" className="text-sm text-red-300">
            {errorsT(fieldErrors.message)}
          </span>
        ) : null}
      </label>

      <input
        id="contact-website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        name="website"
        value={values.website ?? ""}
        onChange={(event) => updateField("website", event.target.value)}
        aria-hidden="true"
      />

      {status ? <FormStatus tone={status.tone} message={status.message} /> : null}

      <button
        type="submit"
        disabled={submitting}
        className="group flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary/5 to-primary px-6 py-4 font-semibold text-black transition-all hover:from-primary hover:to-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span>{submitting ? t("submitting") : t("submit")}</span>
        <Send
          aria-hidden="true"
          className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </button>

      <p className="text-left text-xs text-white/50">
        {t("description")}
      </p>
    </form>
  );
}
