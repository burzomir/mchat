export class Member {

  id: string
  name: string
  status: string

  constructor ({ id, name, status }: MemberAttrs) {
    this.id = id
    this.name = name
    this.status = status
  }

  static create (attrs: MemberAttrs) {
    return new Member(attrs)
  }
}

export interface MemberAttrs {
  id: string
  name: string
  status: string
}
