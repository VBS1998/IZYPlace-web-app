all: build run

build-ui:
	cd ui && make build

build-api:
	cd src && go build -o izy_api . 

build: build-ui build-api

run:
	cd src && ./izy_api

run-api: build-api run

clear:
	rm ./izy_api && cd ui && make clear

docker/all: docker/build docker/run

docker/build:
	docker build -t izyplace .

docker/run:
	docker compose up

docker/run_dettached:
	docker compose up -d

docker/run_db:
	docker compose up mongo -d