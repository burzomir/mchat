import * as React from 'react'
import { ListGroup } from 'reactstrap'
import { Link } from 'react-router-dom'
import { RoomTile } from '../../rooms/room-tile/room-tile'

export type RoomListProps = {
  rooms: string[]
  roomUrl?: string
}

export const RoomList: React.SFC<RoomListProps> = ({ rooms, ...props }) => {
  return (
    <ListGroup className='border-0'>
      {rooms.map(renderRoomListItem(props))}
    </ListGroup>
  )
}

const renderRoomListItem = ({ roomUrl = '' }: Pick<RoomListProps, 'roomUrl'>) => (roomId: string) => (
  <Link to={roomUrl + roomId} key={roomId} className='list-group-item-action list-group-item text-truncate'>
    <RoomTile id={roomId} />
  </Link>
)
