import { useEffect, useState } from 'react'
import { getAccessToken, fetchNewAlbumsReleases, fetchPopularArtists } from '../api/spotify'
import { BaseArtistType, BaseCardDataType } from '../types/spotify'
import { McCardColor, McCardRectangle, McCardRounded, McCarousel } from '../components'
import { podcastData } from '../constants/podcasts';
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
        console.log('popularArtists', popularArtists)
      } catch (error) {
        console.error('Error fetching albums:', error);
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
      />
      <McCarousel
        title="Popular Artists"
        items={popularArtists}
        isLoading={isLoading}
        itemsPerSlide={8}
        renderItem={(artist) => <McCardRounded item={artist} />}
      />
      <McCarousel
        title="Genres"
        items={genres}
        isLoading={isLoading}
        itemsPerSlide={7}
        isSmall
        renderItem={(genre) => <McCardColor item={genre} />}
      />
      <McCarousel
        title="Popular Playlists"
        items={newAlbums}
        isLoading={isLoading}
        renderItem={(album) => <McCardRectangle item={album} />}
      />
      <McCarousel
        title="New Releases"
        items={newAlbums.slice(10, 20)}
        isLoading={isLoading}
        renderItem={(album) => <McCardRectangle item={album} />}
      />
      <McCarousel
        title="Popular Podcasts"
        items={podcastData}
        isLoading={isLoading}
        renderItem={(podcast) => <McCardRectangle item={podcast} />}
      />

      {/* <h1 className="text-3xl font-bold mb-4">Welcome to <span className='text-[#07c8f9]'>Outlier</span> Music <span className='text-[#09a6f3]'>Outlier</span> 🎧 <span className='text-[#0a85ed]'>Outlier</span>  🎧 <span className='text-[#0c63e7]'>Outlier</span>  🎧 <span className='text-[#0d41e1]'>Outlier</span></h1>
      <h1 className="text-3xl font-bold mb-4">Welcome to <span className='text-[#006ba6]'>Outlier</span> Music <span className='text-[#0496ff]'>Outlier</span> 🎧 <span className='text-[#ffbc42]'>Outlier</span>  🎧 <span className='text-[#d81159]'>Outlier</span>  🎧 <span className='text-[#8f2d56]'>Outlier</span></h1>
      <h1 className="text-3xl font-bold mb-4">Welcome to <span className='text-[#42BBFF]'>Outlier</span> Music <span className='text-[#0496ff]'>Outlier</span> 🎧 <span className='text-[#0274DB]'>Outlier</span>  🎧 <span className='text-[#0256B7]'>Outlier</span>  🎧 <span className='text-[#013D93]'>Outlier</span></h1>
      <Button color="danger">Button</Button> */}
    </main >
  )
}
