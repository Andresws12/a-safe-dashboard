import { renderHook, act } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { api } from '@/src/trpc/react';

import { usePost } from './usePost';

vi.mock('@/src/trpc/react', () => ({
  api: {
    useUtils: vi.fn(),
    post: {
      list: { useInfiniteQuery: vi.fn() },
      add: { useMutation: vi.fn() },
    },
  },
}));

vi.mock('next-auth/react', () => ({ useSession: vi.fn() }));
vi.mock('react-hook-form', () => ({ useForm: vi.fn() }));
vi.mock('@hookform/resolvers/zod', () => ({
  zodResolver: vi.fn((schema) => schema),
}));

interface PostFormData {
  id: string;
  title: string;
  description: string;
  readTime: string;
  category: 'OTHER';
}

interface ApiUtils {
  post: {
    list: { invalidate: () => void };
  };
}

interface PostItem {
  id: string;
  title: string;
}

interface InfiniteQueryResult {
  data: { pages: Array<{ items: PostItem[]; nextCursor: string }> };
  status: string;
  hasNextPage: boolean | null;
  isFetchingNextPage: boolean | null;
  fetchNextPage: () => void;
}

interface Mutation {
  mutateAsync: (input: unknown) => Promise<void>;
  isPending: boolean;
  error: null | Error;
  trpc: { path: string };
}

describe('usePost hook', () => {
  const DEFAULT_LIMIT = 10;
  const TEST_EMAIL = 'test@example.com';
  const TEST_POST = { id: '1', title: 'Test Post' };
  const MOCK_DATE_ISO = '2023-01-01T00:00:00.000Z';

  const mockReset = vi.fn();
  const mockMutateAsync = vi.fn();
  const mockInvalidate = vi.fn();
  const mockFetchNextPage = vi.fn();
  const mockHandleSubmit = vi.fn((cb) => cb);

  const testFormData = {
    id: '1',
    title: 'Test Title',
    description: 'Test Description',
    readTime: '5',
    category: 'OTHER' as const,
  };

  beforeEach(() => {
    vi.mocked(useSession).mockReturnValue({
      data: {
        user: { email: TEST_EMAIL },
        expires: '',
      },
      status: 'authenticated',
      update: vi.fn(),
    });

    vi.mocked(useForm).mockReturnValue({
      reset: mockReset,
      handleSubmit: mockHandleSubmit,
      register: vi.fn(),
      formState: { errors: {} },
    } as UseFormReturn<PostFormData>);

    vi.mocked(api.useUtils).mockReturnValue({
      post: {
        list: { invalidate: mockInvalidate },
      },
    } as ApiUtils);

    vi.mocked(api.post.list.useInfiniteQuery).mockReturnValue({
      data: {
        pages: [
          {
            items: [TEST_POST],
            nextCursor: '2',
          },
        ],
      },
      status: 'success',
      hasNextPage: true,
      isFetchingNextPage: false,
      fetchNextPage: mockFetchNextPage,
    } as InfiniteQueryResult);

    vi.mocked(api.post.add.useMutation).mockImplementation(
      (options: unknown): Mutation => {
        const opts = options as { onSuccess?: (input: unknown) => unknown };
        return {
          mutateAsync: async (input: unknown) => {
            await mockMutateAsync(input);
            if (opts?.onSuccess) {
              await opts.onSuccess(input);
            }
          },
          isPending: false,
          error: null,
          trpc: {
            path: 'post.add',
          },
        };
      },
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Initialization', () => {
    it('should initialize with correct values', () => {
      const { result } = renderHook(() => usePost(DEFAULT_LIMIT));

      expect(result.current.postList.status).toBe('success');
      expect(result.current.postList.hasNextPage).toBe(true);
      expect(result.current.postList.isFetchingNextPage).toBe(false);
      expect(result.current.postCreation.isPending).toBe(false);
      expect(result.current.postCreation.error).toBeNull();
    });

    it('should pass the limit to useInfiniteQuery', () => {
      renderHook(() => usePost(DEFAULT_LIMIT));

      expect(api.post.list.useInfiniteQuery).toHaveBeenCalledWith(
        { limit: DEFAULT_LIMIT },
        { getNextPageParam: expect.any(Function) },
      );
    });
  });

  describe('Post Creation', () => {
    it('should handle form submission successfully', async () => {
      const { result } = renderHook(() => usePost(DEFAULT_LIMIT));
      const mockDate = new Date(MOCK_DATE_ISO);
      vi.spyOn(global, 'Date').mockImplementation(() => mockDate as Date);

      await act(async () => {
        await result.current.postCreation.onSubmit(testFormData);
      });

      expect(mockMutateAsync).toHaveBeenCalledWith({
        ...testFormData,
        readTime: '5 min',
        date: MOCK_DATE_ISO,
        author: TEST_EMAIL,
      });
      expect(mockReset).toHaveBeenCalled();
      expect(mockInvalidate).toHaveBeenCalled();
    });

    it('should handle submission errors properly', async () => {
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      mockMutateAsync.mockRejectedValueOnce(new Error('Failed to add post'));

      const { result } = renderHook(() => usePost(DEFAULT_LIMIT));

      await act(async () => {
        await result.current.postCreation.onSubmit(testFormData);
      });

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to add post',
        expect.any(Error),
      );
      expect(mockReset).not.toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });

    it('should use empty author when session is undefined', async () => {
      vi.mocked(useSession).mockReturnValue({
        data: null,
        status: 'unauthenticated',
        update: vi.fn(),
      });

      const { result } = renderHook(() => usePost(DEFAULT_LIMIT));

      await act(async () => {
        await result.current.postCreation.onSubmit(testFormData);
      });

      expect(mockMutateAsync).toHaveBeenCalledWith(
        expect.objectContaining({ author: '' }),
      );
    });
  });

  describe('Post List', () => {
    it('should handle fetchNextPage correctly', () => {
      const { result } = renderHook(() => usePost(DEFAULT_LIMIT));

      act(() => {
        result.current.postList.fetchNextPage();
      });

      expect(mockFetchNextPage).toHaveBeenCalled();
    });

    it('should handle null pagination values gracefully', () => {
      vi.mocked(api.post.list.useInfiniteQuery).mockReturnValue({
        data: undefined,
        status: 'loading',
        hasNextPage: null,
        isFetchingNextPage: null,
      } as Partial<InfiniteQueryResult>);

      const { result } = renderHook(() => usePost(DEFAULT_LIMIT));

      expect(result.current.postList.hasNextPage).toBe(false);
      expect(result.current.postList.isFetchingNextPage).toBe(false);
    });
  });
});
