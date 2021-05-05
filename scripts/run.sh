#!/bin/bash -ex

cp -f "/home/pi/react-pi-blocks/files/$1" "/home/pi/Development/johnny-five/index.js"
cd /home/pi/Development/johnny-five/
sudo node index.js