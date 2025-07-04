import { findFirstAlbumByName } from "@/lib/pollster/album";
import { findFirstArtistByName } from "@/lib/pollster/artist";
import LastfmAlbumTracks from "./lastfm";
import SpotifyAlbumTracks from "./spotify";

type AlbumTracksProps = {
  artistName: string;
  albumName: string;
};

async function AlbumTracks({ artistName, albumName }: AlbumTracksProps) {
  const artistData = await findFirstArtistByName(artistName);

  if (!artistData) return null;

  const albumData = await findFirstAlbumByName(artistData, albumName);

  if (!albumData) return null;

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">Tracks</h2>
      {!albumData.spotifyUrl ? (
        <LastfmAlbumTracks
          artistName={artistData.name}
          albumName={albumData.name}
        />
      ) : (
        <SpotifyAlbumTracks
          artistName={artistData.name}
          albumName={albumData.name}
          spotifyUrl={albumData.spotifyUrl}
        />
      )}
    </section>
  );
}

export default AlbumTracks;
