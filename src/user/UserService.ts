import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
  private users = [
    { id: 1, name: 'Tom' },
    { id: 2, name: 'Sashko' },
    { id: 3, name: 'Mikhail' },
  ]

  find(id: number) {
    return this.users.find(user => user.id === id)
  }

  create(name: string) {
    const newUser = {
      id: Math.random(),
      name,
    }
    this.users.push(newUser)
    return newUser
  }
}
