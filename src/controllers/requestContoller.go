package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/VBS1998/base-web-app/src/models"
	"github.com/VBS1998/base-web-app/src/services"
	"github.com/gorilla/mux"
)

func GetRequests(w http.ResponseWriter, r *http.Request) {
	requests, err := services.GetRequestService().GetAllRequests()

	if err != nil {
		http.Error(w, "Error Getting Requests", http.StatusInternalServerError)
		return
	}

	encondeAndSend(w, requests)
}

func GetRequest(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	requests, err := services.GetRequestService().GetRequest(id)

	if err != nil {
		http.Error(w, "Error Getting Request", http.StatusInternalServerError)
		return
	}

	encondeAndSend(w, requests)

}

func AddRequest(w http.ResponseWriter, r *http.Request) {
	var request models.Request

	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	addedId, err := services.GetRequestService().AddRequest(&request)

	if err != nil {
		http.Error(w, "Error adding Request", http.StatusInternalServerError)
		return
	}

	encondeAndSend(w, addedId)
}
