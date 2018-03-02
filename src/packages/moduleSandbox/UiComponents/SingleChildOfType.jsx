//@flow

import React, { isValidElement } from 'react'
import type { Element } from 'react';
import PropTypes from 'prop-types'

export const isComponentOfType = (element: any, typeField: string, childType: string) =>
  isValidElement(element) && element.type[typeField] === childType

export type Props = {
  /**
   * The content of the button.
   */
  children: Element<*>,
  /**
   * The name of the element found in the 'typeField'.
   */
  childType: string,
  /**
   * lement to output if the child isn't correct
   */
  defaultChild: Element<*>,
  /**
   * Element field to look for name.
   */
  typeField: 'muiName' | 'hiveName',
}

const SingleChildOfType = (props: Props) => {
  const { typeField, childType, defaultChild, children } = props
  const child = children && React.Children.only(children)
  return isComponentOfType(child, typeField, childType) ? child : defaultChild
}

SingleChildOfType.propTypes = {
  /**
   * The name of the element found in the 'typeField'
   */
  childType: PropTypes.string.isRequired,
  /**
   * Pass a single Element
   */
  children: PropTypes.element,
  /**
   * Element to output if the child isn't correct
   */
  defaultChild: PropTypes.element.isRequired,
  /**
   * Element field to look for name
   */
  typeField: PropTypes.oneOf(['muiName', 'hiveName']).isRequired,
}

SingleChildOfType.defaultProps = {
  typeField: 'muiName',
}

export default SingleChildOfType
