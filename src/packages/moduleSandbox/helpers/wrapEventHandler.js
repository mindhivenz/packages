//@flow

type EventHandler = (event: {}) => mixed

export default (parentHandler: EventHandler) => (childHandler: EventHandler) => (event: {}) => {
  childHandler(event)
  setTimeout(() => parentHandler(event), 1)
}
