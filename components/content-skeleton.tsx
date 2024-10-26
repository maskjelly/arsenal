import { Skeleton } from "@/components/ui/skeleton";

export const ContentSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4 bg-zinc-800" />
      <Skeleton className="h-4 w-full bg-zinc-800" />
      <Skeleton className="h-4 w-5/6 bg-zinc-800" />
      <Skeleton className="h-4 w-4/5 bg-zinc-800" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full bg-zinc-800" />
        <Skeleton className="h-4 w-3/4 bg-zinc-800" />
      </div>
    </div>
  );
};