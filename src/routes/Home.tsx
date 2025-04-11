import { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import { getAccessToken, fetchNewAlbumsReleases } from '../api/spotify'
import { SpotifyAlbumType } from '../types/spotify'
import { McCard } from '../components'


export default function Home() {
  const [albums, setAlbums] = useState<SpotifyAlbumType[]>([]);

  useEffect(() => {
    const loadAlbums = async () => {
      const token = await getAccessToken()
      const newReleases = await fetchNewAlbumsReleases(token)
      setAlbums(newReleases)
    }

    loadAlbums()
  }, []);

  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-xl font-bold">Popular Albums</h3>
          <p className='font-bold hover:underline cursor-pointer'>Show all</p>
        </div>
        <div className="gap-2 grid grid-cols-8">
          {albums.map((album) => (
            <McCard key={album.id} album={album} />
          ))}
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-4">Welcome to <span className='text-[#07c8f9]'>Outlier</span> Music <span className='text-[#09a6f3]'>Outlier</span> 🎧 <span className='text-[#0a85ed]'>Outlier</span>  🎧 <span className='text-[#0c63e7]'>Outlier</span>  🎧 <span className='text-[#0d41e1]'>Outlier</span></h1>
      <h1 className="text-3xl font-bold mb-4">Welcome to <span className='text-[#006ba6]'>Outlier</span> Music <span className='text-[#0496ff]'>Outlier</span> 🎧 <span className='text-[#ffbc42]'>Outlier</span>  🎧 <span className='text-[#d81159]'>Outlier</span>  🎧 <span className='text-[#8f2d56]'>Outlier</span></h1>
      <h1 className="text-3xl font-bold mb-4">Welcome to <span className='text-[#42BBFF]'>Outlier</span> Music <span className='text-[#0496ff]'>Outlier</span> 🎧 <span className='text-[#0274DB]'>Outlier</span>  🎧 <span className='text-[#0256B7]'>Outlier</span>  🎧 <span className='text-[#013D93]'>Outlier</span></h1>
      <Button color="danger">Button</Button>
    </main>
  )
}
