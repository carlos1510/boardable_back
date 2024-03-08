import { z } from "zod";

export const userSchema = z.object({
    username: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string"
    }),
    password: z
    .string({
      required_error: "Password es requerido",
      invalid_type_error: "Password debe ser un string",
    })
    .min(6, "Password debe tener al menos 6 caracteres"),
    email: z
    .string({
      required_error: "Email es requerido",
      invalid_type_error: "Email debe ser un string",
    })
    .email({
      message: "Email no es un email válido",
    }),
    name: z.string().toUpperCase(),
});

export const userSchemaUpd = z.object({
  username: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string"
  }),
  password: z
    .string({
      required_error: "Password es requerido",
      invalid_type_error: "Password debe ser un string",
    })
    .min(6, "Password debe tener al menos 6 caracteres"),
    email: z
    .string({
      required_error: "Email es requerido",
      invalid_type_error: "Email debe ser un string",
    })
    .email({
      message: "Email no es un email válido",
    }),
    name: z.string().toUpperCase(),
    id: z.number()
});

export type UserParams = z.infer<typeof userSchema>;

export type UserParamsUpd = z.infer<typeof userSchemaUpd>;

export type User = UserParams & { id: number };