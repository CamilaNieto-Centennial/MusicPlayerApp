import { BaseArtistType, BaseCardDataType } from "../types/spotify";

const authHeader = btoa(`${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}`);

export const getAccessToken = async (): Promise<string> => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${authHeader}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ 'grant_type': 'client_credentials' }),
  });

  const data = await response.json();
  return data.access_token;
};

export const fetchNewAlbumsReleases = async (accessToken: string) => {
  const apiUrl = 'https://api.spotify.com/v1/browse/new-releases';

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  console.log("New Releases:", data); // 👈 inspect the actual structure
  return data.albums.items;
};

// export const fetchPopularArtists = async (accessToken: string): Promise<BaseArtistType[]> => {
//   const newAlbums: BaseCardDataType[] = await fetchNewAlbumsReleases(accessToken);

//   const artists: BaseArtistType[] = [];

//   newAlbums.forEach((album: BaseCardDataType) => {
//     album.artists.forEach((artist: BaseArtistType) => {
//       // Ensure the artist has an id (as required by BaseArtistType)
//       if (artist.id && artist.name) {
//         artists.push(artist);
//       }
//     });
//   });

//   // Deduplicate artists by id
//   const uniqueArtists = Object.values(
//     artists.reduce((acc: Record<string, BaseArtistType>, artist: BaseArtistType) => {
//       acc[artist.id] = artist;
//       return acc;
//     }, {})
//   );
//   console.log('uniqueArtists', uniqueArtists);

//   return uniqueArtists;
// };


export const fetchPopularArtists = async (accessToken: string): Promise<BaseArtistType[]> => {
  const newAlbums: BaseCardDataType[] = await fetchNewAlbumsReleases(accessToken);
  const artistIds = new Set<string>();

  newAlbums.forEach(album => {
    album.artists.forEach(artist => {
      artistIds.add(artist.id);
    });
  });

  // Spotify allows up to 50 artist IDs in a batch
  const artistIdChunks = Array.from(artistIds).slice(0, 50); // You can paginate if needed
  const response = await fetch(`https://api.spotify.com/v1/artists?ids=${artistIdChunks.join(',')}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  const data = await response.json();
  console.log('data', data)
  return data.artists;
};