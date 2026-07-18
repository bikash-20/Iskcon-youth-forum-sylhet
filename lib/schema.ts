import { z } from "zod";

/**
 * Validation schemas for the public-facing forms.
 *
 * Rules of thumb:
 *   - All user input is untrusted. Validate on the server even when the
 *     client already does.
 *   - Coerce emails to lowercase; trim every string field.
 *   - Cap text lengths — generous, but not unlimited — to keep the inboxes
 *     sane and Redis storage bounded.
 */

const trimmed = (max: number) =>
  z
    .string()
    .transform((s) => s.trim())
    .pipe(z.string().min(1).max(max));

export const ContactSchema = z.object({
  name: trimmed(120),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.string().email("Please enter a valid email")),
  phone: z
    .string()
    .trim()
    .max(40)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  message: trimmed(4000),
  // Honeypot — must be empty. Bots fill every field they see.
  hp: z
    .string()
    .optional()
    .refine((v) => !v || v.length === 0, "spam"),
});

export const VolunteerSchema = z.object({
  name: trimmed(120),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.string().email("Please enter a valid email")),
  phone: trimmed(40),
  // Skills as strings (the form sends strings; we sanitise at boundary).
  skills: z
    .array(trimmed(80))
    .max(16, "Too many skills selected")
    .default([]),
  availability: z.enum([
    "Weekday mornings",
    "Weekday evenings",
    "Weekends",
    "Festival days only",
  ]),
  note: z
    .string()
    .trim()
    .max(2000)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  hp: z
    .string()
    .optional()
    .refine((v) => !v || v.length === 0, "spam"),
});

export type ContactInput = z.infer<typeof ContactSchema>;
export type VolunteerInput = z.infer<typeof VolunteerSchema>;

export const AdminLoginSchema = z.object({
  password: z.string().min(1).max(200),
});
