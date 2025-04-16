import { useEffect, useState } from 'react'
import { BaseCardDataType } from '../types/spotify';
// import { fetchNewAlbumsReleases, getAccessToken } from '../api/spotify';
import { McCardRectangle, McCarousel } from '../components';
import { Skeleton } from '@nextui-org/react';
import { topAlbums } from '../constants/albums';

export default function Albums() {
  const [albums, setAlbums] = useState<BaseCardDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setAlbums(topAlbums);
        // const token = await getAccessToken();
        // const albumsData = await fetchNewAlbumsReleases(token);
        // setAlbums(albumsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setAlbums(topAlbums);
      } finally {
        setIsLoading(false);
      }
    };

    loadData()
  }, []);

  return (
    <main className="flex flex-col gap-4 px-12 py-8 xl:px-8 overflow-y-auto">
      <h3 className="hidden md:block text-xl font-bold">Albums</h3>
      <div className="relative w-full gap-4 flex flex-wrap justify-center lg:justify-between">
        {isLoading
          ? Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3 w-fit shrink-0">
              <Skeleton className="rounded-md">
                <img className="w-[240px] h-[140px] rounded-md bg-default-300" />
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300" />
              </Skeleton>
            </div>
          ))
          : <>
            {
              albums.map((album) => (
                <div className='hidden md:block w-fit'>
                  <McCardRectangle item={album} />
                </div>
              ))}

            <div className="block md:hidden">
              <McCarousel
                title="Albums"
                items={albums}
                isLoading={isLoading}
                renderItem={(album) => <McCardRectangle item={album} />}
                hideUrl
              />
            </div>
          </>
        }
      </div>
    </main>
  )
}
