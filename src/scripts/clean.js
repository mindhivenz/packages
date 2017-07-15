import init from 'init-package-json'
import path from 'path'
import fs from 'fs'
import ncp from 'ncp'
import exit from 'shelljs'

import {
  logBr,
  logSuccess,
  logError,
  logWarn,
  logTitle,
  logPackage,
} from './lib/utils'

const command = `${process.argv[2]}`

logError('CLEAN BUILD')

