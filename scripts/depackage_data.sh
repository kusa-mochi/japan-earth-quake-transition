#!/bin/bash

mkdir -p ../earthquake-zip/unziped
cd ../earthquake-zip
unzip '*.zip' -d unziped/
cd unziped
[[ -e data.txt ]] && rm data.txt
touch data.txt

find . -name "h*" | xargs -L 1 cat >> data.txt
rm h*
