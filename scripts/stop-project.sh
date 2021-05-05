#!/bin/bash -eux

for i in {1..5}
do
   echo "Checking"
   RESULT=`ps -ef | grep "sudo node /home/pi/Development/johnny-five/index.js" | grep "root" | awk '{print $2}'`
   echo "  RESULT: ${RESULT}"
   if [[ "${RESULT}" == "" ]]; then
      echo "project exited successfully"
     exit 0
    fi
   sleep 1
done

RESULT=`ps -ef | grep "sudo node /home/pi/Development/johnny-five/index.js" | grep "root" | awk '{print $2}'`
echo "killing ${RESULT}"

sudo kill -9 "${RESULT}"