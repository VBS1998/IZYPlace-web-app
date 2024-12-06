all: build-api run-api

build-api:
	cd src && go build -o izy_api . 

run-api:
	cd src && ./izy_api

build-ui:
	cd ui && make build

run-ui:
	cd ui && make run

dev-ui:
	cd ui && make dev
	
clear:
	rm ./izy_api && cd ui && make clear

docker/all: docker/build docker/run

docker/build: docker/build_api docker/build_ui

docker/build_api:
	docker build -t izyplace .

docker/build_ui:
	docker build -t izyplace-ui ./ui

docker/run:
	cd deploy/stg && docker compose up

docker/run_dettached:
	cd deploy/stg && docker compose up -d

docker/run_db:
	cd deploy/dev && docker compose up mongo -d