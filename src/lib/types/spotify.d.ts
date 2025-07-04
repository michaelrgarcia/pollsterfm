// will extend as i go

export type SimplifiedArtist = {
  name: string;
};

export type Image = {
  url: string;
};

export type Artist = {
  genres: string[];
  /**
   * The {@link https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids|Spotify ID} for the artist.
   */
  id: string;
  images: Image[];
  name: string;
  external_urls: {
    /**
     * The {@link https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids|Spotify URL} for the object.
     */
    spotify: string;
  };
};

export type Album = {
  id: string;
  external_urls: {
    /**
     * The {@link https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids|Spotify URL} for the object.
     */
    spotify: string;
  };
  name: string;
  artists: SimplifiedArtist[];
  images: Image[];
  release_date: string;
};

export type Track = {
  album: Album;
  duration_ms: number;
  name: string;
  is_local: boolean;
  external_urls: {
    /**
     * The {@link https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids|Spotify URL} for the object.
     */
    spotify: string;
  };
};

export type PlayHistory = {
  track: {
    album: Album;
    artists: SimplifiedArtist[];
    id: string;
    name: string;
    is_local: boolean;
  };
  /**
   * A string in the ISO 8601 format.
   */
  played_at: string;
};

export type SimplifiedAlbum = {
  images: Image[];
  name: string;
  release_date: string;
  external_urls: {
    /**
     * The {@link https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids|Spotify URL} for the object.
     */
    spotify: string;
  };
  artists: SimplifiedArtist[];
};

export type SimplifiedTrack = {
  artists: SimplifiedArtist[];
  duration_ms: number;
  name: string;
  track_number: number;
};
