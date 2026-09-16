// zod/mini with named imports keeps the validator tree-shakable (the classic
// `z` namespace pulls in every locale and adds ~100kb gzipped to the route).
import {
  array,
  boolean,
  email,
  enum as zEnum,
  extend,
  minLength,
  object,
  optional,
  refine,
  string,
  trim,
  type infer as Infer,
} from "zod/mini";

const yesNo = optional(zEnum(["yes", "no"]));

const websitePattern = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i;

export const businessSchema = object({
  legalName: string().check(trim(), minLength(2, "Enter your business legal name.")),
  industry: string().check(minLength(1, "Choose the industry closest to your business.")),
  website: string().check(
    trim(),
    refine((v) => v === "" || websitePattern.test(v), "Enter a website address, like example.com."),
  ),
  yearsInBusiness: optional(string()),
  salesChannels: array(string()),
});

export const processingSchema = object({
  monthlyVolume: string().check(minLength(1, "Choose your estimated monthly card volume.")),
  averageTicket: optional(string()),
  subscriptions: yesNo,
  currentlyProcessing: yesNo,
  currentProcessor: optional(string().check(trim())),
  declined: yesNo,
});

export const contactSchema = object({
  firstName: string().check(trim(), minLength(1, "Enter your first name.")),
  lastName: string().check(trim(), minLength(1, "Enter your last name.")),
  email: email("Enter an email address, like name@company.com."),
  phone: string().check(
    trim(),
    refine((v) => v.replace(/\D/g, "").length >= 10, "Enter a 10-digit phone number."),
  ),
  bestTime: optional(string()),
  consent: boolean().check(refine((v) => v, "Agree to be contacted so we can review your application.")),
});

export const applySchema = extend(extend(businessSchema, processingSchema.shape), contactSchema.shape);

export type ApplyValues = Infer<typeof applySchema>;

export const stepSchemas = [businessSchema, processingSchema, contactSchema] as const;

export const stepFields: (keyof ApplyValues)[][] = [
  Object.keys(businessSchema.shape) as (keyof ApplyValues)[],
  Object.keys(processingSchema.shape) as (keyof ApplyValues)[],
  Object.keys(contactSchema.shape) as (keyof ApplyValues)[],
];

export const defaultValues: ApplyValues = {
  legalName: "",
  industry: "",
  website: "",
  yearsInBusiness: undefined,
  salesChannels: [],
  monthlyVolume: "",
  averageTicket: undefined,
  subscriptions: undefined,
  currentlyProcessing: undefined,
  currentProcessor: "",
  declined: undefined,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  bestTime: undefined,
  consent: false,
};
