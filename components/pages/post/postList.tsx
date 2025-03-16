'use client';
import { inferProcedureOutput } from '@trpc/server';
import { Clock } from 'lucide-react';
import { useTranslations, useFormatter } from 'next-intl';

import { Badge } from '@/components/UI/atoms/badge';
import { Button } from '@/components/UI/atoms/button';
import { ListLayout } from '@/components/UI/layout/ListLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/UI/molecules/card';
import { AppRouter } from '~/server/api/root';

interface PostListProps {
  data: inferProcedureOutput<AppRouter['post']['list']>[];
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
  const format = useFormatter();

  const parseDate = (dateString: string) => {
    const date: Date = new Date(dateString);
    const formattedDate = format
      .dateTime(date, {
        minute: 'numeric',
        hour: 'numeric',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
      .toString();
    return formattedDate;
  };

  return (
    <ListLayout>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((page) =>
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
                  {parseDate(post.date)}
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
        {(hasNextPage || status === 'pending') && (
          <Button
            variant="outline"
            size="lg"
            onClick={() => fetchNextPage()}
            disabled={
              !hasNextPage || isFetchingNextPage || status === 'pending'
            }
          >
            {status === 'pending' || isFetchingNextPage
              ? t('list.loading')
              : hasNextPage
                ? t('list.viewMore')
                : t('list.noPosts')}
          </Button>
        )}
      </div>
    </ListLayout>
  );
};
