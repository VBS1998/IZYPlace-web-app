package server

import (
	"log"
	"net/http"

	"github.com/VBS1998/base-web-app/src/controllers"
	"github.com/gorilla/mux"
)

const (
	LISTINGS_ROUTE         = "/listings"
	LISTINGS_ROUTE_WITH_ID = "/listings/{id}"
	REQUESTS_ROUTE         = "/requests"
	REQUESTS_ROUTE_WITH_ID = "/requests/{id}"
	IMAGES_ROUTE           = "/images"
	ADMIN_CALL_WITH_ID     = "/admin/call/{id}"
)

type IZYServer struct {
	Router          *mux.Router
	AnonymousRoutes *mux.Router
	AdminRoutes     *mux.Router
}

func (r *IZYServer) setupAnonymousRoutes(router *mux.Router) {
	anonymousRoutes := router.PathPrefix("/api/").Subrouter()
	anonymousRoutes.Use(AnonymousMiddleware)

	anonymousRoutes.HandleFunc(LISTINGS_ROUTE, controllers.GetListings).Methods(http.MethodGet)
	anonymousRoutes.HandleFunc(LISTINGS_ROUTE_WITH_ID, controllers.GetListing).Methods(http.MethodGet)

	anonymousRoutes.HandleFunc(REQUESTS_ROUTE, controllers.AddRequest).Methods(http.MethodPost)

	anonymousRoutes.HandleFunc(IMAGES_ROUTE, controllers.UploadImage).Methods(http.MethodPost)

	r.AnonymousRoutes = anonymousRoutes

}

func (r *IZYServer) setupAdminRoutes(router *mux.Router) {
	adminRoutes := router.PathPrefix("/api/").Subrouter()
	adminRoutes.Use(AdminMiddleware)

	adminRoutes.HandleFunc(REQUESTS_ROUTE, controllers.GetRequests).Methods(http.MethodGet)
	adminRoutes.HandleFunc(REQUESTS_ROUTE_WITH_ID, controllers.GetRequest).Methods(http.MethodGet)

	adminRoutes.HandleFunc(ADMIN_CALL_WITH_ID, controllers.CallRequest).Methods(http.MethodPost)

	r.AdminRoutes = adminRoutes

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
	r.setupAdminRoutes(r.Router)

	return &r
}
