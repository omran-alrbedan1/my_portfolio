import type {
  ContactField,
  ContactFormValues,
  ValidationErrors,
} from "@/types/forms";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(values: ContactFormValues) {
  const fieldErrors: ValidationErrors<ContactField> = {};

  if (!values.name.trim()) {
    fieldErrors.name = "required";
  } else if (values.name.trim().length < 2) {
    fieldErrors.name = "min_name";
  }

  if (!values.email.trim()) {
    fieldErrors.email = "required";
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    fieldErrors.email = "invalid_email";
  }

  if (!values.message.trim()) {
    fieldErrors.message = "required";
  } else if (values.message.trim().length < 10) {
    fieldErrors.message = "min_message";
  }

  return fieldErrors;
}
