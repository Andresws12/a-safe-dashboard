import { z } from 'zod';

export const addPostSchema = z.object({
  id: z.string().uuid().optional(),
  title: z
    .string()
    .trim()
    .min(1, 'Title is too short')
    .max(32, 'Title is too long'),
  text: z.string().trim().min(1, 'Text is required'),
  test: z.string().trim().min(1, 'Test is required'),
});

export const listPostsSchema = z.object({
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.string().nullish(),
});

export const postByIdSchema = z.object({
  id: z.string(),
});
