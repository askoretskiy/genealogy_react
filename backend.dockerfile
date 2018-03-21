FROM python:3.6-alpine3.7

COPY pip.lock /home/

RUN PKG="gcc musl-dev yaml-dev"\
 && apk add --no-cache curl yaml gettext $PKG\
 && python -m pip install --no-cache -r /home/pip.lock\
 && apk del --no-cache $PKG

ENTRYPOINT ["dumb-init", "--verbose", "--single-child"]
