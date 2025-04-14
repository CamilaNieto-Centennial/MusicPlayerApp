export interface BaseArtistType {
  id: string;
  name: string;
  images?: { url: string }[]; // Add this
}
export interface BaseCardDataType {
  id: string;
  name: string;
  images: { url: string }[];
  artists: BaseArtistType[]
}
