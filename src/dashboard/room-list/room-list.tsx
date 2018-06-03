import * as React from 'react'
import { ListGroup } from 'reactstrap'
import { Link } from 'react-router-dom'
import { RoomTile } from '../../rooms/room-tile/room-tile'

export type RoomListProps = {
  rooms: Room[]
  roomUrl?: string
}

export type Room = {
  id: string,
  members: Member[]
}

export type Member = {
  id: string
  name: string
}

export const RoomList: React.SFC<RoomListProps> = ({ rooms, ...props }) => {
  return (
    <ListGroup className='border-0'>
      {rooms.map(renderRoomListItem(props))}
    </ListGroup>
  )
}

const renderRoomListItem = ({ roomUrl = '' }: Pick<RoomListProps, 'roomUrl'>) => (room: Room) => (
  <Link to={roomUrl + room.id} key={room.id} className='list-group-item-action list-group-item text-truncate'>
    <RoomTile id={room.id} />
  </Link>
)
