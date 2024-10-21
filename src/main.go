package main

import (
	"log"
	"net/http"

	"github.com/VBS1998/base-web-app/src/db"
	"github.com/VBS1998/base-web-app/src/services"
)

var (
	port = "8000"
)

func main() {

	server := CreateServer()

	mongoClient := db.GetMongoClient()
	mongoClient.Connect()
	defer mongoClient.Disconnect()

	services.SetupListingService(mongoClient)

	log.Printf("serving at port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, server.Router).Error())

}
