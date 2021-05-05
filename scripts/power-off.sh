#!/bin/bash -eux

WHO=`whoami`

if [[ "${WHO}" == "node" ]]; then
   echo "in dev container"
else
   sudo shutdown -h now
fi