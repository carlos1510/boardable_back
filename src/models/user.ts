import { z } from "zod";

export const UserSchema = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string"
    })
    .min(1),
    email: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string"
    }).email({
        message: "Invalid email address"
    }),
});

export type UserData = z.infer<typeof UserSchema>;

export type User = UserData & { id: number};