#!/bin/bash -eux

if [[ `whoami` != "node" ]]; then
    cp -f "/home/pi/react-pi-blocks/files/$1" "/home/pi/Development/johnny-five/index.js"
else
    echo "in devcontainer"
fi
