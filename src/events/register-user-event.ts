import { EventInterface } from './interfaces/event-interface'

class RegisterUserEvent implements EventInterface {
  constructor(private name: string, private payload: any) {}

  getName(): string {
    return this.name
  }

  getDateTime(): Date {
    return new Date()
  }

  getPayload() {
    return this.payload
  }
}

export { RegisterUserEvent }
