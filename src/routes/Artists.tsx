import { useEffect, useState } from 'react'
import { McCardRounded, McCarousel } from '../components';
import { BaseArtistType } from '../types/spotify';
// import { fetchPopularArtists, getAccessToken } from '../api/spotify';
import { Skeleton } from '@nextui-org/react';
import { trendingArtists } from '../constants/artists';

export default function Artists() {
  const [artists, setArtists] = useState<BaseArtistType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setArtists(trendingArtists);
        // const token = await getAccessToken();
        // const artistsData = await fetchPopularArtists(token);
        // setArtists(artistsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setArtists(trendingArtists);
      } finally {
        setIsLoading(false);
      }
    };

    loadData()
  }, []);

  return (
    <main className="flex flex-col gap-4 h-[100dvh] px-12 py-8 xl:px-8 overflow-y-auto">
      <h3 className="hidden md:block text-xl font-bold">Artists</h3>
      <div className="relative w-full flex gap-[17px] flex-wrap justify-center lg:justify-between">
        {isLoading
          ? Array.from({ length: 27 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3 w-fit shrink-0 items-center">
              <Skeleton className="rounded-full">
                <img className="w-[180px] h-[180px] rounded-full bg-default-300" />
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200" />
              </Skeleton>
            </div>
          ))
          : <>
            {
              artists.map((artist) => (
                <div className='hidden md:block w-fit'>
                  <McCardRounded item={artist} />
                </div>
              ))}

            <div className="block md:hidden">
              <McCarousel
                title="Artists"
                items={artists}
                isLoading={isLoading}
                isRounded
                renderItem={(artist) => <McCardRounded item={artist} />}
                hideUrl
              />
            </div>
          </>
        }
      </div>
    </main>
  )
}
