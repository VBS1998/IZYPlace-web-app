package main

import (
	"log"
	"net/http"

	"github.com/VBS1998/base-web-app/src/db"
)

var (
	port = "8000"
)

func main() {

	server := CreateServer()

	mongoClient := db.GetMongoClient()
	mongoClient.Connect("izyplace")
	defer mongoClient.Disconnect()

	log.Print(mongoClient.GetAll("listings"))

	log.Printf("serving at port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, server.Router).Error())

}
