package controllers

import (
	"encoding/json"
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

	listing, err := services.GetListingService().GetListing(id)

	if err != nil {
		http.Error(w, "Error Getting Listing", http.StatusInternalServerError)
		return
	}

	encondeAndSend(w, listing)

}

func AddListing(w http.ResponseWriter, r *http.Request) {

	auth := r.Header.Get("Authorization")

	var listing models.Listing

	if err := json.NewDecoder(r.Body).Decode(&listing); err != nil {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	addedId, err := services.GetListingService().AddListing(&listing, auth)

	if err != nil {
		if err.Error() == "wrong password" {
			http.Error(w, "Password is not right", http.StatusUnauthorized)
		} else {
			http.Error(w, "Error adding Listing", http.StatusInternalServerError)
		}
		return
	}

	encondeAndSend(w, addedId)
}

func UpdateListing(w http.ResponseWriter, r *http.Request) {

}

func DeleteListing(w http.ResponseWriter, r *http.Request) {

}
