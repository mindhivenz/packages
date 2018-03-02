export default ({ children, level='log' }) => {
  console[level](children)
  return null
}
