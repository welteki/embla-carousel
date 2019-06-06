type Subscribers = { [key in Event]: Callback[] }
export type Callback = (...args: any[]) => void
export type Event =
  | 'init'
  | 'select'
  | 'scroll'
  | 'dragStart'
  | 'dragEnd'
  | 'destroy'

export type EventDispatcher = {
  dispatch: (evt: Event, ...args: any[]) => EventDispatcher
  on: (evt: Event, cb: Callback) => EventDispatcher
  off: (evt: Event, cb: Callback) => EventDispatcher
}

export function EventDispatcher(): EventDispatcher {
  const subscribers: Subscribers = {
    destroy: [],
    dragEnd: [],
    dragStart: [],
    init: [],
    scroll: [],
    select: [],
  }

  function dispatch(evt: Event, ...args: any[]): EventDispatcher {
    const eventListeners = subscribers[evt]
    eventListeners.forEach(e => e(...args))
    return self
  }

  function on(evt: Event, cb: Callback): EventDispatcher {
    const eventListeners = subscribers[evt]
    subscribers[evt] = eventListeners.concat([cb])
    return self
  }

  function off(evt: Event, cb: Callback): EventDispatcher {
    const eventListeners = subscribers[evt]
    subscribers[evt] = eventListeners.filter(e => e !== cb)
    return self
  }

  const self: EventDispatcher = {
    dispatch,
    off,
    on,
  }
  return Object.freeze(self)
}
