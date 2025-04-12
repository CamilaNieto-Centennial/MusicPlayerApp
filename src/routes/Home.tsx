import { useEffect, useState } from 'react'
import { Button, Skeleton } from '@nextui-org/react'
import { getAccessToken, fetchNewAlbumsReleases } from '../api/spotify'
import { SpotifyAlbumType } from '../types/spotify'
import { McCard } from '../components'
import { MdPlayArrow } from 'react-icons/md'

export default function Home() {
  const [albums, setAlbums] = useState<SpotifyAlbumType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide
  const itemsPerSlide = 7; // Number of items per slide
  const [fade, setFade] = useState(false);

  const maxSlide = albums.length - itemsPerSlide

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const token = await getAccessToken();
        const newReleases = await fetchNewAlbumsReleases(token);
        setAlbums(newReleases);
      } catch (error) {
        console.error('Error fetching albums:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAlbums()
  }, []);

  // Next and Previous buttons to control the slider
  const handlePrev = () => {
    if (currentSlide > 0) {
      setFade(true);
      setTimeout(() => {
        setCurrentSlide(prev => Math.max(prev - itemsPerSlide, 0));
        setFade(false);
      }, 150);
    }
  };

  const handleNext = () => {
    if (currentSlide < maxSlide) {
      setFade(true);
      setTimeout(() => {
        setCurrentSlide(prev => Math.min(prev + itemsPerSlide, maxSlide));
        setFade(false);
      }, 150);
    }
  }

  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-xl font-bold">Popular Albums</h3>
          <p className='font-bold hover:underline cursor-pointer'>Show all</p>
        </div>
        <div className="relative w-full">
          <div className="overflow-hidden">
            <div
              className="flex gap-4"
            >
              {isLoading ?
                <>
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-3 w-[240px] shrink-0"
                    >
                      <Skeleton className="rounded-md">
                        <div className="w-[240px] h-[140px] rounded-md bg-default-300" />
                      </Skeleton>
                      <Skeleton className="w-4/5 rounded-lg">
                        <div className="h-3 w-4/5 rounded-lg bg-default-200" />
                      </Skeleton>
                      <Skeleton className="w-2/5 rounded-lg">
                        <div className="h-3 w-2/5 rounded-lg bg-default-300" />
                      </Skeleton>
                    </div>
                  ))}
                </>
                :
                <div className={`flex gap-4 transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'}`}>
                  {
                    albums.slice(currentSlide, currentSlide + itemsPerSlide).map((album) => (
                      <div
                        key={album.id}
                        className="flex justify-center"
                      >
                        <McCard key={album.id} album={album} className='' />
                      </div>
                    ))
                  }
                </div>
              }
            </div>
          </div>

          {/* Previous Button */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 px-3 z-10">
            <Button
              size="sm"
              variant="flat"
              isIconOnly
              onClick={handlePrev}
              className="bg-black/40 text-white border-none hover:bg-black/60 transition-all duration-300"
            >
              <MdPlayArrow />
            </Button>
          </div>

          {/* Next Button */}
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 px-3 z-10">
            <Button
              size="sm"
              variant="flat"
              isIconOnly
              onClick={handleNext}
              className="bg-black/40 text-white border-none hover:bg-black/60 transition-all duration-300"
            ><MdPlayArrow />
            </Button>
          </div>

        </div>

        <h1 className="text-3xl font-bold mb-4">Welcome to <span className='text-[#07c8f9]'>Outlier</span> Music <span className='text-[#09a6f3]'>Outlier</span> 🎧 <span className='text-[#0a85ed]'>Outlier</span>  🎧 <span className='text-[#0c63e7]'>Outlier</span>  🎧 <span className='text-[#0d41e1]'>Outlier</span></h1>
        <h1 className="text-3xl font-bold mb-4">Welcome to <span className='text-[#006ba6]'>Outlier</span> Music <span className='text-[#0496ff]'>Outlier</span> 🎧 <span className='text-[#ffbc42]'>Outlier</span>  🎧 <span className='text-[#d81159]'>Outlier</span>  🎧 <span className='text-[#8f2d56]'>Outlier</span></h1>
        <h1 className="text-3xl font-bold mb-4">Welcome to <span className='text-[#42BBFF]'>Outlier</span> Music <span className='text-[#0496ff]'>Outlier</span> 🎧 <span className='text-[#0274DB]'>Outlier</span>  🎧 <span className='text-[#0256B7]'>Outlier</span>  🎧 <span className='text-[#013D93]'>Outlier</span></h1>
        <Button color="danger">Button</Button>
      </div>
    </main >
  )
}
