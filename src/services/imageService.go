package services

import (
	"log"
	"mime/multipart"
	"path/filepath"
	"sync"

	"github.com/VBS1998/base-web-app/src/db"
	repositories "github.com/VBS1998/base-web-app/src/repositories/images"
)

type ImageService struct {
	repository repositories.ImageRepositoryInterface
}

var image_service *ImageService
var image_service_once sync.Once

func SetupImageService(client db.DbClient) {
	image_service_once.Do(func() {

		var repository repositories.ImageRepositoryInterface

		switch client.(type) {
		default:
			repository = repositories.NewImageFileRepository()
		}

		image_service = &ImageService{
			repository: repository,
		}
	})
}

func GetImageService() *ImageService {
	if image_service == nil {
		log.Print("ERROR: Image Service not initialized. Call Setup first.")
	}
	return image_service
}

func (service *ImageService) UploadImage(file multipart.File) (string, error) {
	url, err := service.repository.Upload(file)
	return filepath.Base(url), err
}
