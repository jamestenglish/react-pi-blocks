#!/bin/bash -eux

cd /home/pi/Development/react-pi-blocks
git pull --rebase
yarn setup

sudo systemctl restart react-pi-blocks