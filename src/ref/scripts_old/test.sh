#!/usr/bin/env bash

PACKAGE=$(basename $PWD)
TEST_FILE_PATTERN="${PWD}/src/**/*.spec.js"

for i in ${TEST_FILE_PATTERN}; do
  if [ -f "$i" ]; then
    echo "Running tests in package '${PACKAGE}'"
    mocha --compilers js:babel-core/register --reporter spec ${TEST_FILE_PATTERN}
    break
  else
    echo "No tests found in package '${PACKAGE}'"
  fi
done
