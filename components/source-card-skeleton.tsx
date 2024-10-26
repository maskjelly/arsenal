import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SourceCardSkeleton = () => {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800 w-[280px] flex-shrink-0">
      <div className="p-3">
        <Skeleton className="aspect-video w-full bg-zinc-800 rounded mb-2" />
        <div className="flex items-start gap-2">
          <Skeleton className="h-5 w-5 rounded bg-zinc-800 flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-full bg-zinc-800" />
            <Skeleton className="h-3 w-2/3 bg-zinc-800" />
            <Skeleton className="h-2 w-1/3 bg-zinc-800" />
          </div>
        </div>
      </div>
    </Card>
  );
};