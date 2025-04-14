import { useEffect, useState } from 'react'
import { getAccessToken, fetchNewAlbumsReleases, fetchPopularArtists } from '../api/spotify'
import { BaseArtistType, BaseCardDataType } from '../types/spotify'
import { McCardColor, McCardRectangle, McCardRounded, McCarousel } from '../components'
import { podcasts } from '../constants/podcasts';
import { genres } from '../constants/genres';

export default function Home() {
  const [newAlbums, setNewAlbums] = useState<BaseCardDataType[]>([]);
  const [popularArtists, setPopularArtists] = useState<BaseArtistType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  //const itemsPerSlide = 7; // Number of items per slide (carousel)

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = await getAccessToken();
        const [
          newAlbumsData,
          popularArtistsData,
        ] = await Promise.all([
          fetchNewAlbumsReleases(token),
          fetchPopularArtists(token)
        ]);
        setNewAlbums(newAlbumsData);
        setPopularArtists(popularArtistsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData()
  }, []);

  return (
    <main className="flex flex-col gap-12 p-8 overflow-y-auto">
      <McCarousel
        title="Recommended For You"
        items={newAlbums.slice(10, 20)}
        isLoading={isLoading}
        renderItem={(album) => <McCardRectangle item={album} />}
        url="/albums"
      />
      <McCarousel
        title="Popular Artists"
        items={popularArtists}
        isLoading={isLoading}
        itemsPerSlide={8}
        renderItem={(artist) => <McCardRounded item={artist} />}
        url="/artists"
      />
      <McCarousel
        title="Genres"
        items={genres}
        isLoading={isLoading}
        itemsPerSlide={7}
        isSmall
        renderItem={(genre) => <McCardColor item={genre} />}
        url="/genres"
      />
      <McCarousel
        title="Popular Playlists"
        items={newAlbums}
        isLoading={isLoading}
        renderItem={(album) => <McCardRectangle item={album} />}
        url="/albums"
      />
      <McCarousel
        title="New Releases"
        items={newAlbums.slice(10, 20)}
        isLoading={isLoading}
        renderItem={(album) => <McCardRectangle item={album} />}
        url="/albums"
      />
      <McCarousel
        title="Popular Podcasts"
        items={podcasts}
        isLoading={isLoading}
        renderItem={(podcast) => <McCardRectangle item={podcast} />}
        url="/podcasts"
      />
    </main >
  )
}
