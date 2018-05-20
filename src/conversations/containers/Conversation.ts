import { connect } from 'react-redux'
import { Conversation as ConversationComponent } from '../components/Conversation'
import { RouteComponentProps } from 'react-router-dom'

const mapState = (state: any, { match }: RouteComponentProps<{ id: string }>) => ({
  conversation: {
    id: '2',
    members: [
      { name: `Conversation ${match.params.id}` }
    ]
  }

})

export const Conversation = connect(mapState)(ConversationComponent)
