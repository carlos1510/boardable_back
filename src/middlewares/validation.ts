import { ZodError, ZodIssue, ZodSchema } from "zod";
import { ApiError } from "./error";
import { NextFunction, Request, Response } from "express";

export function validationHandler<T>(schema: ZodSchema<T>) {
    return async (req: Request, _res: Response, next: NextFunction) => {
        try{
            const bodyParsed = schema.parse(req.body);
            req.body = bodyParsed;
            next();
        }catch(error){
            if(error instanceof ZodError){
                console.log(error);
                next(
                    new ApiError("Error de validación", 400, formatIssues(error.issues))
                );
            }else {
                next(error);
            }
        }
    };
}

function formatIssues(issues: ZodIssue[]) {
    const formattedIssues: Record<string, string> = {};

    issues.forEach((issues) => {
        formattedIssues[issues.path.join(".")] = issues.message;
    });

    return formattedIssues;
}

