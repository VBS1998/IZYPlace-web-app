all: build run

build-ui:
	cd ui && make build

build-api:
	cd src && go build -o izy_api . 

build: build-ui build-api

run:
	cd src && ./izy_api

clear:
	rm ./izy_api && cd ui && make clear