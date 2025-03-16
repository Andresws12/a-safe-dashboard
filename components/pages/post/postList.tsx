'use client';
import { Button } from '@/components/UI/atoms/button';
import { Badge } from '@/components/UI/atoms/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/UI/molecules/card';

import { inferProcedureOutput } from '@trpc/server';
import { AppRouter } from '~/server/api/root';

import { useTranslations } from 'next-intl';
import { Clock } from 'lucide-react';

interface PostListProps {
  data: inferProcedureOutput<AppRouter['post']['list']>[] | undefined;
  status: 'pending' | 'error' | 'success';
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export const PostList: React.FC<PostListProps> = ({
  data,
  status,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}) => {
  const t = useTranslations('Posts');

  return (
    <section className="w-full py-6 md:py-12 lg:py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map((page) =>
            page.items.map((post) => (
              <Card key={post.id} className="flex flex-col h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">
                      {post.category || t('list.defaultCategory')}
                    </Badge>
                    {post.readTime && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {post.date || new Date().toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{post.description}</p>
                </CardContent>
              </Card>
            )),
          )}
        </div>

        <div className="flex justify-center mt-12">
          {hasNextPage && (
            <Button
              variant="outline"
              size="lg"
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? t('list.loading')
                : hasNextPage
                  ? t('list.viewMore')
                  : t('list.noPosts')}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
