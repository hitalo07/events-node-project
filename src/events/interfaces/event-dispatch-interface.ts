import { EventInterface } from './event-interface'
import { EventHandlerInterface } from './event-handler-interface'

interface EventDispatchInterface {
  register(eventName: string, eventHandle: EventHandlerInterface): void
  dispatch(event: EventInterface): void
  remove(eventName: string, eventHandle: EventHandlerInterface): void
  has(eventName: string, eventHandle: EventHandlerInterface): boolean
  clear(): void
  count(): number
}

export { EventDispatchInterface }
