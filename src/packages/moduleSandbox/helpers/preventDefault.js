//@flow

type EventHandler = (event: {}) => mixed

export default (handler: EventHandler) => (event: Object) => {
  event.preventDefault()
  handler(event)
}
