import * as React from 'react'
import { Conversation as TConversation } from '../types'
import { Card, CardHeader } from '../../ui'

export type ConversationProps = {
  conversation: TConversation
}

export const Conversation: React.SFC<ConversationProps> = ({ conversation }) => {
  return (
    <Card className='border-0'>
      <CardHeader>
        {
          conversation.members.map(m => m.name).join(', ')
        }
      </CardHeader>
    </Card>
  )
}
