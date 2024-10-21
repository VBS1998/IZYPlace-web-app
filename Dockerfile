# API Build
FROM golang:1.23.2
RUN mkdir /api_build
WORKDIR /api_build
COPY . .

RUN make build-api

# UI Build
FROM node:21.7.1
RUN mkdir /ui_build
WORKDIR /ui_build
COPY ./ui .

RUN make build


# App
FROM ubuntu:latest
WORKDIR /app
RUN mkdir /app/bin
COPY --from=0 /api_build/src/izy_api /app/bin
RUN mkdir /app/ui/
RUN mkdir /app/ui/out
COPY --from=1 /ui_build/out/. /app/ui/out
USER 1001
WORKDIR /app/bin
CMD ["/app/bin/izy_api"]
