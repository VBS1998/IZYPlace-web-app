package main

import (
	"log"
	"net/http"
)

var (
	port = "8000"
)

func main() {

	server := CreateServer()

	log.Printf("serving at port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, server.Router).Error())

}
