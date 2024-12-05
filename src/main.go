package main

import (
	"log"
	"net/http"
	"os"

	"github.com/VBS1998/base-web-app/src/db"
	"github.com/VBS1998/base-web-app/src/services"
	"github.com/gorilla/handlers"
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
	services.SetupRequestService(mongoClient)
	services.SetupImageService(nil)

	if os.Getenv("ENV") == "dev" {
		corsObj := handlers.AllowedOrigins([]string{"*"})
		corsHeaders := handlers.AllowedHeaders([]string{"Content-Type", "X-Requested-With"})
		corsMethods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"})

		log.Printf("serving at port %s", port)
		log.Fatal(http.ListenAndServe(":"+port, handlers.CORS(corsObj, corsHeaders, corsMethods)(server.Router)).Error())
	} else {
		log.Printf("serving at port %s", port)
		log.Fatal(http.ListenAndServe(":"+port, server.Router).Error())
	}

}
