// src/types/spotify.d.ts
export interface SpotifyAlbumType {
  id: string;
  name: string;
  images: { url: string }[];
  artists: { name: string }[];
}
