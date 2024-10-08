all: build run

build-front:
	cd frontend && npm run build

build-back:
	cd src && go build -o a.out . 

build: build-front build-back

run:
	cd src && ./a.out
