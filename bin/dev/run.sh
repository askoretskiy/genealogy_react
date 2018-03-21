#!/bin/sh -e

cd "$(dirname "$0")/../../"

docker-compose stop
docker-compose rm -f
exec docker-compose up "$@"
