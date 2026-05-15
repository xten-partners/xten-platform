"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  submitContact,
  type ContactFormState,
} from "@/app/[locale]/contact/actions";

const initialState: ContactFormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("Contact");

  return (
    <Button type="submit" disabled={pending} className="mt-2 w-full sm:w-auto">
      {pending ? t("sending") : t("submit")}
    </Button>
  );
}

export function ContactForm() {
  const t = useTranslations("Contact");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q")?.trim() ?? "";
  const consentLabel = t.rich("consentRich", {
    privacy: (chunks) => (
      <Link href="/privacy" className="underline underline-offset-4">
        {chunks}
      </Link>
    ),
  });
  const [state, formAction] = useActionState(submitContact, initialState);

  return (
    <form action={formAction} className="mt-10 max-w-xl space-y-6">
      <div className="grid gap-2">
        <label htmlFor="name" className="xten-eyebrow text-foreground">
          {t("name")}
        </label>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          required
          aria-invalid={state.status === "invalid" && !!state.fields.name}
        />
        {state.status === "invalid" && state.fields.name ? (
          <p className="text-sm text-destructive">
            {t(`validation.${state.fields.name}` as "validation.name")}
          </p>
        ) : null}
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          {t("email")}
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={state.status === "invalid" && !!state.fields.email}
        />
        {state.status === "invalid" && state.fields.email ? (
          <p className="text-sm text-destructive">
            {t(`validation.${state.fields.email}` as "validation.email")}
          </p>
        ) : null}
      </div>
      <div className="grid gap-2">
        <label
          htmlFor="organization"
          className="text-sm font-medium text-foreground"
        >
          {t("organization")}
        </label>
        <Input id="organization" name="organization" autoComplete="organization" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="role" className="text-sm font-medium text-foreground">
          {t("role")}
        </label>
        <Input id="role" name="role" autoComplete="organization-title" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          {t("message")}
        </label>
        <Textarea
          id="message"
          name="message"
          required
          rows={6}
          className="min-h-32 resize-y"
          defaultValue={searchQuery}
          aria-invalid={state.status === "invalid" && !!state.fields.message}
        />
        <p className="text-xs text-muted-foreground">{t("messageHint")}</p>
        {state.status === "invalid" && state.fields.message ? (
          <p className="text-sm text-destructive">
            {t(
              `validation.${state.fields.message}` as "validation.messageShort",
            )}
          </p>
        ) : null}
      </div>
      <div className="flex gap-3 border border-border/70 bg-muted/25 p-5">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1 size-4 shrink-0 rounded border-input accent-foreground"
        />
        <label htmlFor="consent" className="text-sm leading-relaxed text-foreground">
          {consentLabel}
        </label>
      </div>
      {state.status === "error" && state.code === "consent" ? (
        <p className="text-sm text-destructive">{t("consentError")}</p>
      ) : null}
      {state.status === "error" && state.code === "server" ? (
        <p className="text-sm text-destructive">{t("error")}</p>
      ) : null}
      {state.status === "success" ? (
        <p className="text-sm text-foreground">{t("success")}</p>
      ) : null}
      <SubmitButton />
      <p className="text-xs leading-relaxed text-muted-foreground">{t("note")}</p>
    </form>
  );
}
