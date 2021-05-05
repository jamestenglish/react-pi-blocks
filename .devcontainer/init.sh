#!/bin/bash -eux

rm -rf /home/node/.ssh 
mkdir -p /home/node/.ssh 
sudo cp -a /home/node/.ssh_other/* /home/node/.ssh 
sudo chown -R node /home/node/.ssh 
sudo mkdir -p /home/pi/ 
sudo chown -R node /home/pi 
sudo chown -R node node_modules 
sudo chown -R node ui/node_modules 
sudo chown -R node server/node_modules