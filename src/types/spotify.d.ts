export interface BaseArtist {
  id: string;
  name: string;
  images?: { url: string }[]; // Add this
}
export interface BaseCardData {
  id: string;
  name: string;
  images: { url: string }[];
  artists: BaseArtist[]
}
