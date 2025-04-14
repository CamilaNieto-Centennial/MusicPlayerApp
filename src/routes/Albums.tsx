import { useEffect, useState } from 'react'
import { BaseCardDataType } from '../types/spotify';
import { fetchNewAlbumsReleases, getAccessToken } from '../api/spotify';
import { McCardRectangle } from '../components';
import { Skeleton } from '@nextui-org/react';

export default function Albums() {
  const [albums, setAlbums] = useState<BaseCardDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = await getAccessToken();
        const albumsData = await fetchNewAlbumsReleases(token);
        setAlbums(albumsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData()
  }, []);

  return (
    <main className="flex flex-col gap-4 p-8 overflow-y-auto">
      <h3 className="text-xl font-bold">Albums</h3>
      <div className="relative w-full flex gap-4 flex-wrap">
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
                <McCardRectangle item={album} />
              ))}
          </>
        }
      </div>
    </main>
  )
}
