package controllers

import (
	"log"
	"net/http"

	"github.com/VBS1998/base-web-app/src/services"
)

func UploadImage(w http.ResponseWriter, r *http.Request) {
	// Parse our multipart form, 10 << 20 specifies a maximum
	// upload of 10 MB files.
	r.ParseMultipartForm(10 << 20)

	// FormFile returns the first file for the given key `myFile`
	// it also returns the FileHeader so we can get the Filename,
	// the Header and the size of the file
	file, _, err := r.FormFile("myFile")
	if err != nil {
		log.Println(err)
		http.Error(w, "Error Uploading Image", http.StatusInternalServerError)
		return
	}
	defer file.Close()

	url, err := services.GetImageService().UploadImage(file)

	if err != nil {
		log.Println(err)
		http.Error(w, "Error Uploading Image", http.StatusInternalServerError)
		return
	}

	encondeAndSend(w, url)
}
