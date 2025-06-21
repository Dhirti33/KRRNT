import { z } from "zod";

// Signup schema
export const signupSchema = z.object({
  name: z.string().min(2, "Name is required"),
  username: z.string().min(2, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPwd: z.string().min(6, "Confirm password is required"),
  location: z.string().min(2, "Location is required"),
  gender: z.string().min(1, "Gender is required"),
  dob: z.string().min(1, "Date of birth is required"),
}).refine((data) => data.password === data.confirmPwd, {
  message: "Passwords do not match",
  path: ["confirmPwd"],
});

// Login schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});