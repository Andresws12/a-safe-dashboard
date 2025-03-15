interface DinamicSkeletonProps {
  children: React.ReactNode;
}
export const DinamicSkeleton = ({ children }: DinamicSkeletonProps) => {
  return (
    <article>
      <section>{children}</section>
    </article>
  );
};
