import { EventInterface } from './event-interface'

interface EventHandlerInterface {
  handle(event: EventInterface): void
}

export { EventHandlerInterface }
