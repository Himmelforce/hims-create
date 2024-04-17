#!/bin/bash
if [ "$#" -eq 0 ]; then
    echo "Usage: $0 [command]"
    exit 0
fi

if [ "$1" == "init" ]; then
    ./scripts/init.sh
    exit 0
elif [ "$1" == "start" ]; then
    ./scripts/start.sh
    exit 0
elif [ "$1" == "stop" ]; then
    ./scripts/stop.sh
    exit 0
elif [ "$1" == "purge" ]; then
    ./scripts/purge.sh
    exit 0
else
    echo "Error: Unknown command '$1'"
    exit 1
fi