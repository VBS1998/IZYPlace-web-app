package controllers

import (
	"net/http"

	"github.com/VBS1998/base-web-app/src/services"
	"github.com/gorilla/mux"
)

func GetListings(w http.ResponseWriter, r *http.Request) {
	listings, err := services.GetListingService().GetAllListings()

	if err != nil {
		http.Error(w, "Error Getting Listings", http.StatusInternalServerError)
		return
	}

	encondeAndSend(w, listings)
}

func GetListing(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	listing, err := services.GetListingService().GetListing(id)

	if err != nil {
		http.Error(w, "Error Getting Listing", http.StatusInternalServerError)
		return
	}

	encondeAndSend(w, listing)

}
