#!/bin/sh -e

exec docker exec -ti -e COLUMNS=$(tput cols) -e LINES=$(tput lines) genealogyreact_frontend_1 "$@"
