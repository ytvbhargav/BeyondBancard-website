// zod/mini with named imports keeps the validator tree-shakable (D-036), as in schema.ts.
import { email, maxLength, minLength, object, refine, string, trim, type infer as Infer } from "zod/mini";
import { contactPage, contactTopics } from "@/content/contact";

const { errors, message } = contactPage.form;
const topicIds = contactTopics.map((t) => t.id) as string[];

export const contactSchema = object({
  firstName: string().check(trim(), minLength(1, errors.firstName)),
  lastName: string().check(trim(), minLength(1, errors.lastName)),
  email: email(errors.email),
  // Optional, but when given it must be a full number.
  phone: string().check(
    trim(),
    refine((v) => v === "" || v.replace(/\D/g, "").length >= 10, errors.phone),
  ),
  businessName: string().check(trim()),
  topic: string().check(refine((v) => topicIds.includes(v), errors.topic)),
  message: string().check(
    trim(),
    minLength(message.min, errors.messageShort),
    maxLength(message.max, errors.messageLong),
  ),
});

export type ContactValues = Infer<typeof contactSchema>;

/** Field order in the form, used to focus the first invalid field. */
export const contactFields = Object.keys(contactSchema.shape) as (keyof ContactValues)[];

export const contactDefaults: ContactValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  businessName: "",
  topic: "",
  message: "",
};
