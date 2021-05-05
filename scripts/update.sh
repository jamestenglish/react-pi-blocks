#!/bin/bash -eux

sudo cp /home/pi/Development/react-pi-blocks/scripts/service/react-pi-blocks.service /etc/systemd/system/react-pi-blocks.service

cd /home/pi/Development/react-pi-blocks
git pull --rebase
yarn setup

sudo systemctl daemon-reload
sudo systemctl restart react-pi-blocks