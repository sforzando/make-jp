#!/usr/bin/env bash

FROM=src/variables.scss
DST=node_modules/materialize-css/sass/components/_variables.scss
DST_ORG=node_modules/materialize-css/sass/components/_variables.scss.bak

if [ -f $DST ]; then
  if [ -f $DST_ORG ]; then
    echo "Original file already exists."
  else
    echo "Backup original file."
    cp $DST $DST_ORG
  fi
  cp -f $FROM $DST && echo "SUCCESS: Overwrite completed."
else
  echo "ERROR: Destination file not found!"
fi
