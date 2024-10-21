package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/VBS1998/base-web-app/src/models"
	"github.com/VBS1998/base-web-app/src/services"
	"github.com/gorilla/mux"
)

func GetListings(w http.ResponseWriter, r *http.Request) {
	listings, _ := services.GetListingService().GetAllListings() //TODO: Handle Error

	w.Header().Set("Content-Type", "application/json")

	err := json.NewEncoder(w).Encode(listings)

	if err != nil {
		// Handle encoding error if any
		http.Error(w, "Error encoding JSON", http.StatusInternalServerError)
		return
	}
}

func GetListing(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	for _, listing := range models.ListingsMock() {
		if listing.ID == id {
			err := json.NewEncoder(w).Encode(listing)

			if err != nil {
				// Handle encoding error if any
				http.Error(w, "Error encoding JSON", http.StatusInternalServerError)
				return
			}
		}
	}

}

func AddListing(w http.ResponseWriter, r *http.Request) {

}

func UpdateListing(w http.ResponseWriter, r *http.Request) {

}

func DeleteListing(w http.ResponseWriter, r *http.Request) {

}
