#!/usr/bin/env bash

if [[ "$1" != "" ]]; then
    PACKAGE_NAME="$1"
else
    read -p "Enter <package-name>: " PACKAGE_NAME
fi
cd ./packages
if [ ! -d "$PACKAGE_NAME" ]; then
  mkdir -p "$PACKAGE_NAME";
  cd "$PACKAGE_NAME"
  npm init
echo "$PACKAGE_NAME" created
else
    echo "$PACKAGE_NAME" already exists
    exit
fi