#!/bin/bash
set -e

if [[ "$1" == "runserver" ]]; then
    cd /usr/src/app
    
    npm run start
fi

exec "$@"