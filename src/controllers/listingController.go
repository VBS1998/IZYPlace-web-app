package controllers

import (
	"net/http"

	"github.com/VBS1998/base-web-app/src/models"
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

	for _, listing := range models.ListingsMock() {
		if listing.ID == id {
			encondeAndSend(w, listing)
			break
		}
	}

}

func AddListing(w http.ResponseWriter, r *http.Request) {

}

func UpdateListing(w http.ResponseWriter, r *http.Request) {

}

func DeleteListing(w http.ResponseWriter, r *http.Request) {

}
