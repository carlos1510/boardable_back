import { z } from "zod";

export const boardSchema = z.object({
    name_title: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string"
    }),
    color: z.string({
        required_error: "Color is required",
        invalid_type_error: "Color must be a string"
    }),
});

export type BoardParams = z.infer<typeof boardSchema>;

export type Board = BoardParams & { id: number, id_user: number };