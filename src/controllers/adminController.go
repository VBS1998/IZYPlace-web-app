package controllers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/VBS1998/base-web-app/src/services"
	"github.com/gorilla/mux"
)

func CallRequest(w http.ResponseWriter, r *http.Request) {

	type CallModel struct {
		Call bool `json:"call,omitempty"`
	}

	var callBody CallModel

	if err := json.NewDecoder(r.Body).Decode(&callBody); err != nil {
		log.Print(err)
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	call := callBody.Call

	request_id := mux.Vars(r)["id"]

	listing_id, err := services.GetAdminService().Call(request_id, call)
	if err != nil {
		log.Print(err)

		if err.Error() == "request not pending" {
			http.Error(w, "Request is not pending", http.StatusBadRequest)
			return
		}

		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	encondeAndSend(w, listing_id)
}
