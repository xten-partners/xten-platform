"use server";

export type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; code: "consent" | "server" }
  | {
      status: "invalid";
      fields: Partial<Record<"name" | "email" | "message", string>>;
    };

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const consent = formData.get("consent") === "on";
  if (!consent) {
    return { status: "error", code: "consent" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const fields: Partial<Record<"name" | "email" | "message", string>> = {};

  if (name.length < 2) fields.name = "name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fields.email = "email";
  if (message.length < 20) fields.message = "messageShort";

  if (Object.keys(fields).length > 0) {
    return { status: "invalid", fields };
  }

  // V1 : brancher ici Resend, Supabase ou une file d’attente sécurisée.
  // Ne pas journaliser le contenu des messages en clair sans politique de rétention.
  return { status: "success" };
}
