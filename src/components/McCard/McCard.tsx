// src/components/AlbumCard.tsx
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import { SpotifyAlbumType } from '../../types/spotify'

export const McCard = ({ album }: { album: SpotifyAlbumType }) => (
  <Card key={album.id} isPressable shadow="sm">
    <CardBody className="overflow-visible p-0">
      <Image
        alt={album.name}
        className="w-full object-cover h-[140px]"
        radius="lg"
        shadow="sm"
        src={album.images[0].url}
        width="100%"
      />
    </CardBody>
    <CardFooter className="text-small justify-between">
      <b>{album.name}</b>
      <p className="text-default-500">{album.artists[0].name}</p>
    </CardFooter>
  </Card>
)
