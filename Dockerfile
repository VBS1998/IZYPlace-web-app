# API Build
FROM golang:1.23.2
RUN mkdir /api_build
WORKDIR /api_build
COPY . .

RUN make build-api

# App
FROM ubuntu:latest
WORKDIR /app
RUN mkdir /app/bin
COPY --from=0 /api_build/src/izy_api /app/bin/izy_api
USER 1001
WORKDIR /app/bin
CMD ["/app/bin/izy_api"]
