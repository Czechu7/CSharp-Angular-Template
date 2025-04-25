import { z } from 'zod';

export const userSchema = z.object({
    name: z.string(),
    avatar: z.string().url(),
});

export type User = z.infer<typeof userSchema>;
