import { EventExistsError } from './errors/event-exists-error'
import { EventDispatchInterface } from './interfaces/event-dispatch-interface'
import { EventHandlerInterface } from './interfaces/event-handler-interface'
import { EventInterface } from './interfaces/event-interface'

export interface EventListItem {
  eventName: string
  eventHandle: EventHandlerInterface
}

class EventDispatcher implements EventDispatchInterface {
  constructor(private events: EventListItem[] = []) {}

  register(eventName: string, eventHandle: EventHandlerInterface): void {
    const eventExists = this.events.find(
      (item) =>
        item.eventName === eventName && item.eventHandle === eventHandle,
    )

    if (eventExists) {
      throw new EventExistsError()
    }

    this.events.push({ eventName, eventHandle })
  }

  dispatch(event: EventInterface): void {
    this.events.forEach((item) => {
      if (item.eventName === event.getName()) {
        item.eventHandle.handle(event)
      }
    })
  }

  remove(eventName: string, eventHandle: EventHandlerInterface): void {
    this.events = this.events.filter(
      (item) =>
        !(item.eventName === eventName && item.eventHandle === eventHandle),
    )
  }

  has(eventName: string, eventHandle: EventHandlerInterface): boolean {
    const eventExists = this.events.find(
      (item) =>
        item.eventName === eventName && item.eventHandle === eventHandle,
    )

    return !!eventExists
  }

  clear(): void {
    this.events = []
  }

  count(): number {
    return this.events.length
  }
}

export { EventDispatcher }
