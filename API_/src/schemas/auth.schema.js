import { z } from "zod";

export const registerSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ required_error: "Email invalid" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(4, { required_error: "Password must be at least 6 characters" }),
  status: z.boolean({ required_error: "Status is required" }),
  role: z.string({ required_error: "Role is required" }),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ required_error: "Email invalid" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(4, { required_error: "Password must be at least 6 characters" }),
});
