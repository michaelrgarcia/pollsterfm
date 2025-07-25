import { api } from "@/lib/convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { fetchAction } from "convex/nextjs";
import { redirect } from "next/navigation";
import ClientTrackHeader from "./client";

type TrackHeaderProps = {
  artistName: string;
  albumName: string;
  trackName: string;
};

async function TrackHeader({
  artistName,
  albumName,
  trackName,
}: TrackHeaderProps) {
  const token = await convexAuthNextjsToken();

  const artistData = await fetchAction(
    api.pollster.artist.getCachedArtist,
    { artistName },
    { token },
  );

  if (!artistData) redirect("/not-found");

  const albumData = await fetchAction(
    api.pollster.album.getCachedAlbum,
    { artistName: artistData.name, albumName },
    { token },
  );

  if (!albumData) redirect("/not-found");

  const trackData = await fetchAction(
    api.pollster.track.getCachedTrack,
    {
      artistName: artistData.name,
      albumName: albumData.name,
      albumImage: albumData.image,
      trackName,
    },
    { token },
  );

  if (!trackData) redirect("/not-found");

  return <ClientTrackHeader trackData={trackData} />;
}

export default TrackHeader;
