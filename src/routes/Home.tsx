import { useEffect, useState } from 'react'
// import { getAccessToken, fetchNewAlbumsReleases, fetchPopularArtists } from '../api/spotify'
import { BaseArtistType, BaseCardDataType } from '../types/spotify'
import { McCardColor, McCardRectangle, McCardRounded, McCarousel } from '../components'
import { podcasts } from '../constants/podcasts';
import { genres } from '../constants/genres';
import { Button } from '@nextui-org/react';
import { MdFavorite } from 'react-icons/md';
import singerImage from '../assets/adele.png'
import { topAlbums } from '../constants/albums';
import { trendingArtists } from '../constants/artists';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [newAlbums, setNewAlbums] = useState<BaseCardDataType[]>([]);
  const [popularArtists, setPopularArtists] = useState<BaseArtistType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  return (
    <main className="w-full relative h-[100dvh] overflow-y-auto">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0 h-[500px]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(18,18,18,0.95), rgba(18,18,18,0.6)) lg:linear-gradient(to right, rgba(18,18,18,0.95), rgba(18,18,18,0.4))`,
          backgroundSize: 'contain',
          backgroundPosition: '80% top',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className='relative flex flex-col gap-12 h-full'>
        <section className="relative w-full h-fit">
          <div
            className="absolute inset-0 z-0 h-[900px] lg:h-[590px]"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(18,18,18,0.95), rgba(18,18,18,0.4)), url(${singerImage})`,
              backgroundSize: 'contain',
              backgroundPosition: '80% top',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <div className="relative z-10 flex flex-col gap-3 sm:gap-4 md:gap-10 w-full pt-8 pb-0 sm:pb-10 sm:pt-14 md:pt-16 md:pb-14 lg:pt-20 lg:pb-16 px-8">
            <h1 className="text-sm sm:text-base font-semibold text-primary500">Trending New Hits</h1>
            <div className="flex flex-col gap-5 md:gap-8 w-full mb-2 md:ml-4">
              <div className="flex flex-col gap-2 sm:gap-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">Rolling in the Deep</h1>
                <div className='flex flex-row gap-3 md:gap-4 items-center'>
                  <p className="text-sm sm:text-base md:text-lg font-semibold text-zinc-200">Adele</p>
                  <p className="text-sm sm:text-base md:text-base font-medium text-zinc-500">80 Million Plays</p>
                </div>
              </div>
              <div className="flex flex-row gap-3">
                <Button
                  onClick={() => handleNavigation("/favourites")}
                  className="w-fit bg-primary600 px-5 py-2 text-xs sm:text-base sm:px-6 sm:py-4"
                  radius="full"
                  color="danger">
                  <p className="text-base font-semibold">Listen Now</p>
                </Button>
                <Button onClick={() => handleNavigation("/favourites")} isIconOnly variant="bordered" aria-label="Like" radius="full" color="default" className="p-2 md:p-2">
                  <MdFavorite className='text-primary600 w-5 h-5 md:w-[1.6rem] md:h-[1.6rem]' />
                </Button>
              </div>
            </div>
          </div>
        </section>
        <div
          className=" z-10 flex flex-col gap-11 md:gap-12 px-8 pb-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(9,9,11,0.005) 0%, rgba(9,9,11,0.7) 10%, rgba(9,9,11,1) 15%)',
          }}
        >
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
            isRounded
            renderItem={(artist) => <McCardRounded item={artist} />}
            url="/artists"
          />
          <McCarousel
            title="Genres"
            items={genres}
            isLoading={isLoading}
            itemsPerSlide={8}
            isColor
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
        </div>
      </div>
    </main >
  )
}
