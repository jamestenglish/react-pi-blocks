#!/bin/bash -eux

yarn setup
sudo cp /home/pi/Development/react-pi-blocks/scripts/service/react-pi-blocks.service /etc/systemd/system/react-pi-blocks.service
mkdir -p /home/pi/Development/johnny-five
mkdir -p /home/pi/react-pi-blocks/files
cd /home/pi/Development/johnny-five
npm install johnny-five raspi-io

sudo systemctl enable react-pi-blocks

echo "You must reboot now, run 'sudo reboot'"