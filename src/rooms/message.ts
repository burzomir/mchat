export class Message {

  id: string
  authorId: string
  creationDate: Date
  content: string
  isUnread: boolean

  constructor ({ id, authorId, creationDate, content, isUnread }: MessageAttrs) {
    this.id = id
    this.authorId = authorId
    this.creationDate = new Date(creationDate)
    this.content = content
    this.isUnread = isUnread
  }

  static create (attrs: MessageAttrs) {
    return new Message(attrs)
  }
}

export interface MessageAttrs {
  id: string
  authorId: string
  /** Date in ISO format */
  creationDate: string
  content: string
  isUnread: boolean
}
