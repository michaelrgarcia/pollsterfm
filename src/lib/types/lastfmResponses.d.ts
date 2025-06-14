import type { Album, Artist } from "./lastfm";

export type LastfmArtistSearchResponse = {
  results: {
    artistmatches: {
      artist: Artist[];
    };
  };
};

export type LastfmArtistTagsResponse = {
  toptags: {
    tag: Tag[];
  };
};

export type LastfmArtistTopAlbumsResponse = {
  topalbums: {
    album: Album[];
  };
};

export type LastfmArtistAlbumsResponse = {
  topalbums: {
    album: Album[];
    "@attr": {
      page: string;
      totalPages: string;
    };
  };
};
