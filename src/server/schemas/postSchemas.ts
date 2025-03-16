import { z } from 'zod';

export const addPostSchema = z.object({
  id: z.string().uuid().optional(),
  title: z
    .string()
    .trim()
    .min(1, 'Title is too short')
    .max(32, 'Title is too long'),
  description: z.string().trim().min(1, 'Test is required'),
  date: z.string().optional(),
  category: z.enum(['TUTORIAL', 'REVIEW', 'NEWS', 'OTHER']),
  readTime: z.string().optional(),
  author: z.string().optional(),
});

export const listPostsSchema = z.object({
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.string().nullish(),
});

export const postByIdSchema = z.object({
  id: z.string(),
});
