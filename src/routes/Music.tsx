import { useEffect, useState } from 'react'
// import { getAccessToken, fetchNewAlbumsReleases, fetchPopularArtists } from '../api/spotify'
import { BaseArtistType, BaseCardDataType } from '../types/spotify'
import { McCardColor, McCardRectangle, McCardRounded, McCarousel } from '../components'
import { genres } from '../constants/genres';
import { topAlbums } from '../constants/albums';
import { trendingArtists } from '../constants/artists';

export default function Music() {
  const [newAlbums, setNewAlbums] = useState<BaseCardDataType[]>([]);
  const [popularArtists, setPopularArtists] = useState<BaseArtistType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  //const itemsPerSlide = 7; // Number of items per slide (carousel)

  useEffect(() => {
    const loadData = async () => {
      try {
        setNewAlbums(topAlbums);
        setPopularArtists(trendingArtists);
        // const token = await getAccessToken();
        // const [newAlbumsData, popularArtistsData] = await Promise.all([
        //   fetchNewAlbumsReleases(token),
        //   fetchPopularArtists(token)
        // ]);
        // setNewAlbums(newAlbumsData);
        // setPopularArtists(popularArtistsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setNewAlbums(topAlbums);
        setPopularArtists(trendingArtists);
      } finally {
        setIsLoading(false);
      }
    };

    loadData()
  }, []);

  return (
    <main className="flex flex-col gap-12 p-8 overflow-y-auto">
      <McCarousel
        title="Popular Playlists"
        items={newAlbums}
        isLoading={isLoading}
        renderItem={(album) => <McCardRectangle item={album} />}
        url="/albums"
      />
      <McCarousel
        title="Popular Artists"
        items={popularArtists}
        isLoading={isLoading}
        itemsPerSlide={8}
        isRounded
        renderItem={(artist) => <McCardRounded item={artist} />}
        url="/artists"
      />
      <McCarousel
        title="Genres"
        items={genres}
        isLoading={isLoading}
        itemsPerSlide={7}
        isColor
        renderItem={(genre) => <McCardColor item={genre} />}
        url="/genres"
      />
      <McCarousel
        title="New Releases"
        items={newAlbums.slice(10, 20)}
        isLoading={isLoading}
        renderItem={(album) => <McCardRectangle item={album} />}
        url="/albums"
      />
    </main >
  )
}
