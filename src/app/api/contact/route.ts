import { NextResponse } from "next/server";

import { getFormApiMessage, getValidationMessage } from "@/lib/forms/content";
import { validateContactForm } from "@/lib/forms/validation";
import { deliverLead, isDuplicateLead } from "@/lib/server/lead-delivery";
import type { ContactFormValues } from "@/types/forms";

const MAX_BODY_BYTES = 64 * 1024;

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, message: await getValidationMessage("en", "server_error") },
      { status: 413 }
    );
  }

  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, message: await getValidationMessage("en", "server_error") },
      { status: 400 }
    );
  }

  const locale = "en";
  const successMessage = await getFormApiMessage(locale, "contactSuccess");

  const payload: ContactFormValues = {
    locale,
    name: String(body.name ?? ""),
    email: String(body.email ?? ""),
    message: String(body.message ?? ""),
    website: String(body.website ?? ""),
  };

  if (payload.website?.trim()) {
    return NextResponse.json(
      { ok: true, message: successMessage },
      { status: 200 }
    );
  }

  const fieldErrors = validateContactForm(payload);
  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      {
        ok: false,
        message: await getValidationMessage(locale, "server_error"),
        fieldErrors,
      },
      { status: 400 }
    );
  }

  if (isDuplicateLead([payload.name, payload.email, payload.message])) {
    return NextResponse.json(
      {
        ok: false,
        message: await getValidationMessage(locale, "duplicate_submission"),
      },
      { status: 429 }
    );
  }

  try {
    await deliverLead(process.env.CONTACT_WEBHOOK_URL, {
      type: "contact",
      locale,
      name: payload.name.trim(),
      email: payload.email.trim(),
      message: payload.message.trim(),
      receivedAt: new Date().toISOString(),
      destinationEmail: process.env.CONTACT_EMAIL ?? null,
    });

    return NextResponse.json({
      ok: true,
      message: successMessage,
    });
  } catch (error) {
    console.error("Contact delivery failed", {
      error: error instanceof Error ? error.message : "unknown error",
    });

    return NextResponse.json(
      {
        ok: false,
        message: await getValidationMessage(locale, "server_error"),
      },
      { status: 500 }
    );
  }
}
