//@flow
import branch from 'recompose/branch'
import renderNothing from 'recompose/renderNothing'

export default (shouldHide: () => mixed) => branch(shouldHide, renderNothing)
