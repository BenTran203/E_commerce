import * as z from "zod";

export const registerValidator = z.object({
    email: z.string().email(),
    password: z.string().min(6, 'atleast 6 character')
        .regex(/[A-Z]/, 'must have an uppercase')
        .regex(/[a-z]/, 'must have a lowercase')
        .regex(/[0-9]/, 'must contain a number')
        .regex(/[^a-zA-Z0-9]/, 'must contain a special character'),
    fisrtName: z.string().min(2, 'at least 2 character'),
    lastName: z.string().min(2),
    role: z.enum(['CUSTOMER', 'ADMIN']).optional()
})