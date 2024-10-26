export function ContentSkeleton() {
    return (
      <div className="space-y-4">
        {/* Using explicit zinc colors instead of CSS variables */}
        <div className="h-4 w-3/4 bg-zinc-800 rounded animate-pulse" />
        <div className="h-4 w-1/2 bg-zinc-800 rounded animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
          <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-zinc-800 rounded animate-pulse" />
        </div>
      </div>
    );
  }