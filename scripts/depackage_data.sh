#!/bin/bash

SCRIPT_DIR=$(cd $(dirname $0); pwd)
MERGED_TEXT_FILENAME=data.txt
SQLITE_FILENAME=data.db

[[ -e ../earthquake-zip/unziped/ ]] && rm -R ../earthquake-zip/unziped/
mkdir -p ../earthquake-zip/unziped

cd ../earthquake-zip
unzip '*.zip' -d unziped/

cd unziped
touch $MERGED_TEXT_FILENAME
find . -name "h*" | xargs -L 1 cat >> $MERGED_TEXT_FILENAME
rm h*

# # for debug
# chmod +w $MERGED_TEXT_FILENAME
# mv $MERGED_TEXT_FILENAME org_$MERGED_TEXT_FILENAME
# head org_$MERGED_TEXT_FILENAME > $MERGED_TEXT_FILENAME

cd $SCRIPT_DIR
npm i
node ./make_db.js
