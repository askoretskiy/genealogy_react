#!/bin/sh

cd "$(dirname "$0")/../../"

exec docker-compose build --pull "$@"
