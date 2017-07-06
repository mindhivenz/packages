#!/usr/bin/env bash

set -o errexit # Exit on error

babel src --ignore *.spec.js --out-dir build
