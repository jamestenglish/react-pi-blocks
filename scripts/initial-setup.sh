#!/bin/bash -eux

NODE_VERSION="14.16.1"
WHAT_AM_I=$(uname -m)
DO_NODE_INSTALL=${DO_NODE_INSTALL:-true}
if [[ "${DO_NODE_INSTALL}" == "true" ]]; then

    if [[ "${WHAT_AM_I}" == "armv6l" ]]; then
        echo "This is a pi zero, installing node"
        PREV_DIR=`pwd`
        mkdir -p /tmp/react-pi-blocks-install
        cd /tmp/react-pi-blocks-install
        wget "https://unofficial-builds.nodejs.org/download/release/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-armv6l.tar.gz"
        tar -xf "node-v${NODE_VERSION}-linux-armv6l.tar.gz"
        sudo mv "node-v${NODE_VERSION}-linux-armv6l" /usr/local/node
        cd /usr/bin
        sudo ln -s /usr/local/node/bin/node node
        sudo ln -s /usr/local/node/bin/npm npm
        node -v  # Verifying that the Node.js install worked
        npm -v   # Verifying that the npm install worked
        cd "$PREV_DIR"
    else
        echo "not a pi zero, please install node yourself"
    fi
else
    echo "skipping node install"
fi

sudo npm install --global yarn   
# sudo ln -s /usr/local/node/bin/yarn /usr/local/bin/yarn
# sudo ln -s /usr/local/node/bin/yarnpkg /usr/local/bin/yarnpkg

yarn
# https://github.com/dhis2/notes/issues/29
yarn config set network-timeout 600000 -g
yarn setup
sudo cp /home/pi/Development/react-pi-blocks/scripts/service/react-pi-blocks.service /etc/systemd/system/react-pi-blocks.service
mkdir -p /home/pi/Development/johnny-five
mkdir -p /home/pi/react-pi-blocks/files
cd /home/pi/Development/johnny-five
npm install johnny-five raspi-io

sudo systemctl enable react-pi-blocks

echo "You must reboot now, run 'sudo reboot'"