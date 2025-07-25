import Link from "next/link";

import type { TopAlbum } from "@/lib/types/pollster";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";
import Image from "next/image";

type AlbumProps = {
  artistName: string;
  albumData: TopAlbum; // add other types (ratings)
  className?: string;
  imgIndex?: number;
};

function Album({ artistName, albumData, className, imgIndex = 0 }: AlbumProps) {
  return (
    <Link
      href={`/catalog/${encodeURIComponent(artistName)}/discography/${encodeURIComponent(albumData.name)}`}
      className={cn(
        "bg-card hover:bg-accent block rounded-xl border p-4 no-underline shadow-md transition-all hover:transform-[scale(1.02)] dark:shadow-none",
        className,
      )}
    >
      <div className="relative mb-3 aspect-square w-full rounded-sm">
        {albumData.images[imgIndex].url !== "" && (
          <Image
            src={albumData.images[imgIndex].url}
            alt={albumData.name}
            fill
            sizes="100%"
            className="rounded-sm object-cover"
          />
        )}
      </div>
      <h3 className="m-0 overflow-hidden overflow-ellipsis whitespace-nowrap">
        {albumData.name}
      </h3>
      <div className="mt-1 flex items-center justify-between">
        <span className="text-muted-foreground text-sm">
          {albumData.releaseDate}
        </span>
        <div className="flex items-center">
          <Star className="text-primary fill-primary h-3.5 w-3.5 shrink-0" />
          <span className="text-muted-foreground ml-1 text-sm">5</span>
        </div>
      </div>
    </Link>
  );
}

export default Album;
