export class User {

  id: string
  name: string
  status: UserStatus

  constructor ({ id, name, status }: UserAttrs) {
    this.id = id
    this.name = name
    this.status = status
  }

  static create (attrs: UserAttrs) {
    return new User(attrs)
  }
}

export interface UserAttrs {
  id: string
  name: string
  status: UserStatus
}

export enum UserStatus {
  Online,
  Offline
}
