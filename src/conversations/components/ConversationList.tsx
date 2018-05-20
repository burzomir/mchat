import * as React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'

type Props = {
  conversations: Conversation[],
  onSelect: (conversation: Conversation) => void
}

export const ConversationList: React.SFC<Props> = ({ conversations, onSelect }) => {
  return (
    <ListGroup>
      {
        conversations.map((conversation) => (
          <ListGroupItem
            action
            onClick={() => onSelect(conversation)}
            tag='button'
            key={conversation.id}
            className='border-left-0 border-right-0 text-truncate'
          >
            {
              conversation.members.map(m => m.name).join(', ')
            }
          </ListGroupItem>)
        )
      }
    </ListGroup>
  )
}

type Conversation = {
  id: string,
  members: Member[]
}

type Member = {
  name: string
}
