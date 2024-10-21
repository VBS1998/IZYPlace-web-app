package controllers

import (
	"encoding/json"
	"net/http"
)

func encondeAndSend(w http.ResponseWriter, obj interface{}) {

	w.Header().Set("Content-Type", "application/json")

	err := json.NewEncoder(w).Encode(obj)

	if err != nil {
		// Handle encoding error if any
		http.Error(w, "Error encoding JSON", http.StatusInternalServerError)
		return
	}
}
