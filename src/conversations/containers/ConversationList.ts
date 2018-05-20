import { connect } from 'react-redux'
import { ConversationList as ConversationListComponent, ConversationListProps } from '../components/ConversationList'

export const ConversationList = connect((state, { onSelect }: Pick<ConversationListProps, 'onSelect'>) => ({
  conversations: [
    {
      id: '1',
      members: [
        { name: 'Michał Kłobukowski' },
        { name: 'Mateusz Ollik' }]
    },
    {
      id: '2',
      members: [
        { name: 'Mateusz Ollik' }
      ]
    }
  ],
  onSelect
}))(ConversationListComponent)
