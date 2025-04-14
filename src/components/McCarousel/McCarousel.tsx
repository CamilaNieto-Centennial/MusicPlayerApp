import { Skeleton } from '@nextui-org/react';
import { useState } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

type McCarouselType<T> = {
  title: string;
  items: T[];
  isLoading: boolean;
  renderItem: (item: T, index: number) => React.ReactNode;
  url: string;
  isSmall?: boolean;
  itemsPerSlide?: number;
};

export const McCarousel = <T,>({
  title,
  items,
  isLoading,
  renderItem,
  url,
  isSmall,
  itemsPerSlide = 7
}: McCarouselType<T>) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(false);
  const maxSlide = Math.max(items.length - itemsPerSlide, 0);

  const handleNavigation = (route: string) => {
    navigate(route);
  };

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
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <h3 className="text-xl font-bold">{title}</h3>
        <p onClick={() => handleNavigation(url)} className="font-bold hover:underline cursor-pointer">Show all</p>
      </div>
      <div className="relative w-full">
        <div className="overflow-hidden">
          <div className="flex gap-4">
            {isLoading
              ? Array.from({ length: itemsPerSlide }).map((_, i) => (
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
              : <div className={`${itemsPerSlide === 7 ? "gap-4" : itemsPerSlide === 8 ? "gap-12" : itemsPerSlide === 9 ? "gap-2" : ""} flex transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'}`}>
                {
                  items.slice(currentSlide, currentSlide + itemsPerSlide).map((item, id) => (
                    <div key={id} className="flex justify-center">
                      {renderItem(item, id)}
                    </div>
                  ))}
              </div>
            }
          </div>
        </div>

        {/* Prev Button */}
        <div className={`absolute top-[40%] left-0 transform -translate-y-1/2 px-2 z-10 ${isSmall ? "top-[50%]" : "top-[40%]"}`}>
          <div
            onClick={handlePrev}
            className="bg-zinc-900 p-2 rounded-full shadow-md transform scale-95 hover:scale-100 hover:bg-zinc-800 transition-transform duration-300 ease-in-out cursor-pointer"
          >
            <MdArrowBackIos className="pl-[5px]" size="24" />
          </div>
        </div>

        {/* Next Button */}
        <div className={`absolute top-[40%] right-0 transform -translate-y-1/2 px-2 z-10 ${isSmall ? "top-[50%]" : "top-[40%]"}`}>
          <div
            onClick={handleNext}
            className="bg-zinc-900 p-2 rounded-full shadow-md transform scale-95 hover:scale-100 hover:bg-zinc-800 transition-transform duration-300 ease-in-out cursor-pointer"
          >
            <MdArrowForwardIos className="pl-[5px]" size="24" />
          </div>
        </div>
      </div>
    </div>
  )
}