//@flow
import React from 'react'

type ChildMapper = (child: {}) => {}

export default (children: Object[], child_props_mapper: ChildMapper) =>
  React.Children.map(children, child => React.cloneElement(child, child_props_mapper(child)))
