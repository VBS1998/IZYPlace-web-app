package main

import (
	"log"
	"net/http"

	"github.com/VBS1998/base-web-app/src/controllers"
	"github.com/gorilla/mux"
)

const (
	LISTINGS_ROUTE         = "/listings"
	LISTINGS_ROUTE_WITH_ID = "/listings/{id}"
)

type IZYServer struct {
	Router          *mux.Router
	AnonymousRoutes *mux.Router
}

func (r *IZYServer) setupAnonymousRoutes(router *mux.Router) {
	anonymousRoutes := router.PathPrefix("/api/").Subrouter()

	anonymousRoutes.HandleFunc(LISTINGS_ROUTE, controllers.GetListings).Methods(http.MethodGet)
	anonymousRoutes.HandleFunc(LISTINGS_ROUTE_WITH_ID, controllers.GetListing).Methods(http.MethodGet)
	anonymousRoutes.HandleFunc(LISTINGS_ROUTE, controllers.AddListing).Methods(http.MethodPost)
	anonymousRoutes.HandleFunc(LISTINGS_ROUTE_WITH_ID, controllers.UpdateListing).Methods(http.MethodPut)
	anonymousRoutes.HandleFunc(LISTINGS_ROUTE_WITH_ID, controllers.DeleteListing).Methods(http.MethodDelete)

	r.AnonymousRoutes = anonymousRoutes

}

func (r *IZYServer) setupImages(router *mux.Router) {

	fileServer := http.FileServer(http.Dir("../images"))

	router.PathPrefix("/images/").Handler(http.StripPrefix("/images/", fileServer))
	log.Print("Handle imagess")
}

func CreateServer() *IZYServer {

	r := IZYServer{
		Router: mux.NewRouter(),
	}

	r.setupAnonymousRoutes(r.Router)
	r.setupImages(r.Router)

	return &r
}
