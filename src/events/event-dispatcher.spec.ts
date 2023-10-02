import { beforeEach, describe, expect, it, vi } from 'vitest'
import { EventInterface } from './interfaces/event-interface'
import { EventHandlerInterface } from './interfaces/event-handler-interface'
import { EventDispatchInterface } from './interfaces/event-dispatch-interface'
import { EventDispatcher } from './event-dispatcher'

class TestEventClass implements EventInterface {
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

class TestEventClassTwo implements EventInterface {
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

class TestEventClassThree implements EventInterface {
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

class TestEventHandlerClass implements EventHandlerInterface {
  handle(event: EventInterface): void {
    event.getPayload()
  }
}

let testEvent: EventInterface
let testEventTwo: EventInterface
let testEventThree: EventInterface
let testEventHandler: EventHandlerInterface
let eventDispatcher: EventDispatchInterface

describe('Event Dispatcher', () => {
  // Setup Test
  beforeEach(() => {
    testEvent = new TestEventClass('Test Event', { payload: 'Test Payload' })
    testEventTwo = new TestEventClassTwo('Test Event Two', {
      payload: 'Test Payload Two',
    })
    testEventThree = new TestEventClassThree('Test Event Three', {
      payload: 'Test Payload Three',
    })
    testEventHandler = new TestEventHandlerClass()
    eventDispatcher = new EventDispatcher()
    vi.restoreAllMocks()
  })

  it('should by able register event', async () => {
    eventDispatcher.register(testEvent.getName(), testEventHandler)

    expect(() =>
      eventDispatcher.has(testEvent.getName(), testEventHandler),
    ).toBeTruthy()
  })

  it('not should be able to register event with same name', () => {
    eventDispatcher.register(testEvent.getName(), testEventHandler)
    expect(() => {
      eventDispatcher.register(testEvent.getName(), testEventHandler)
    }).toThrowError('Event exists error.')
  })

  it('should be able to clean events', () => {
    eventDispatcher.register(testEvent.getName(), testEventHandler)
    eventDispatcher.register(testEventTwo.getName(), testEventHandler)
    eventDispatcher.register(testEventThree.getName(), testEventHandler)

    eventDispatcher.clear()

    const count = eventDispatcher.count()

    expect(count).equal(0)
  })

  it('should be able to verify if event is registered', () => {
    eventDispatcher.register(testEvent.getName(), testEventHandler)
    eventDispatcher.register(testEventTwo.getName(), testEventHandler)
    eventDispatcher.register(testEventThree.getName(), testEventHandler)

    const eventIsRegistered = eventDispatcher.has(
      testEventTwo.getName(),
      testEventHandler,
    )

    expect(eventIsRegistered).toBeTruthy()
  })

  it('should be able to call dispatch method', () => {
    const spy = vi.spyOn(eventDispatcher, 'dispatch')
    eventDispatcher.register(testEvent.getName(), testEventHandler)
    eventDispatcher.register(testEventTwo.getName(), testEventHandler)
    eventDispatcher.register(testEventThree.getName(), testEventHandler)

    eventDispatcher.dispatch(testEvent)
    eventDispatcher.dispatch(testEventTwo)
    eventDispatcher.dispatch(testEventThree)

    expect(spy.getMockName()).toEqual('dispatch')

    expect(spy).toHaveBeenCalledTimes(3)
  })

  it('should be able to remove event', () => {
    eventDispatcher.register(testEvent.getName(), testEventHandler)
    eventDispatcher.register(testEventTwo.getName(), testEventHandler)
    eventDispatcher.register(testEventThree.getName(), testEventHandler)

    eventDispatcher.remove(testEventTwo.getName(), testEventHandler)

    const count = eventDispatcher.count()

    expect(count).equal(2)
    expect(
      eventDispatcher.has(testEventTwo.getName(), testEventHandler),
    ).toBeFalsy()
  })
})
