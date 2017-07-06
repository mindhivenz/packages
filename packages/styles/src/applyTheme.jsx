import { compose, withProps } from 'recompose'
import inject from '@mindhive/mobx/inject'

import classSheetInjector from './classSheetInjector'
import instanceSheetInjector from './instanceSheetInjector'

export default ({ mapThemeToStyles, mapThemeToProps, sheetPerInstance, classesName } = { }) => {
  const _mapThemeToStyles = mapThemeToStyles || (() => ({ }))
  const _mapThemeToProps = mapThemeToProps || (() => ({ }))
  return compose(
    inject(['themeDomain']),
    withProps(({ themeDomain: { muiTheme }, ...props }, context) => ({
      ..._mapThemeToProps(muiTheme, props, context),
      themeStyles: _mapThemeToStyles(muiTheme, props, context),
    })),
    sheetPerInstance ? instanceSheetInjector(classesName) : classSheetInjector(classesName),
  )
}
