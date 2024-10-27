import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface SourceCardProps {
  title: string;
  domain: string;
  imageUrl: string;
  index: number;
}



export const SourceCard = ({ title, domain, imageUrl, index }: SourceCardProps) => {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800/50 transition-colors w-[280px] flex-shrink-0">
      <div className="p-3">
        <div className="aspect-video bg-zinc-800 rounded mb-2 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={`Source ${index + 1} preview`} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-start gap-2">
          <div className="h-5 w-5 rounded bg-zinc-800 flex-shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1"> {/* Added min-w-0 to enable text truncation */}
            <p className="text-zinc-100 text-xs font-medium line-clamp-2 mb-1">
              {title}
            </p>
            <div className="flex items-center gap-1 text-xs text-zinc-500">
              <span className="truncate">{domain}</span>
              <ExternalLink className="h-3 w-3 flex-shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};