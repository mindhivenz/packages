import { version as VERSION } from './package.json'

import formModule from './module/FormModule'

import Form from './components/Form'
import ActionsBar from './components/ActionsBar'
import TextField from './components/TextField'
import SubmitButton from './components/SubmitButton'
import CancelButton from './components/CancelButton'

import CoreForm from './provider/CoreForm'
import * as ctxKeys from './provider/ctxKeys'

import { controllerAsContextFromContextName as contextIntoFormContext } from './components/internal/ControlledForm'
import { controllerAsContextFromPropName as propIntoFormContext } from './components/internal/ControlledForm'
import { controllerAsPropFromContextName as contextIntoFormProp } from './components/internal/ControlledForm'
import { controllerAsPropFromPropName as propIntoFormProp } from './components/internal/ControlledForm'

module.exports = {
  formModule,
  Form,
  ActionsBar,
  TextField,
  SubmitButton,
  CancelButton,
  CoreForm,
  ctxKeys,
  contextIntoFormContext,
  propIntoFormContext,
  contextIntoFormProp,
  propIntoFormProp,
  getVersion: () => VERSION,
}
