import type { SiteLocale } from "@/config/site";

export type ContactFormValues = {
  locale: SiteLocale;
  name: string;
  email: string;
  message: string;
  website?: string;
};

export type ContactField = "name" | "email" | "message";

export type ValidationCode =
  | "required"
  | "invalid_email"
  | "min_name"
  | "min_message"
  | "duplicate_submission"
  | "server_error";

export type ValidationErrors<TField extends string> = Partial<
  Record<TField, ValidationCode>
>;

export type FormApiSuccess = {
  ok: true;
  message: string;
};

export type FormApiFailure<TField extends string> = {
  ok: false;
  message: string;
  fieldErrors?: ValidationErrors<TField>;
};

export type FormApiResult<TField extends string> =
  | FormApiSuccess
  | FormApiFailure<TField>;
