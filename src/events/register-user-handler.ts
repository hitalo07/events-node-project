import { EventHandlerInterface } from './interfaces/event-handler-interface'
import { EventInterface } from './interfaces/event-interface'

class RegisterUserHandler implements EventHandlerInterface {
  handle(event: EventInterface): void {
    throw new Error('Method not implemented.')
  }
}

export { RegisterUserHandler }
