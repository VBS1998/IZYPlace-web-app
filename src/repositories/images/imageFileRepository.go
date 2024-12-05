package repositories

import (
	"fmt"
	"io"
	"mime/multipart"
	"os"

	"github.com/google/uuid"
)

type ImageFileRepository struct {
	ImageRepositoryInterface
}

func NewImageFileRepository() *ImageFileRepository {
	return &ImageFileRepository{}
}

func (repo *ImageFileRepository) Upload(file multipart.File) (string, error) {
	dir := "/app/images"
	uniqueName := fmt.Sprintf("upload-%s.png", uuid.New().String())
	filePath := fmt.Sprintf("%s/%s", dir, uniqueName)
	// Create a temporary file within our temp-images directory that follows
	// a particular naming pattern
	createdFile, err := os.Create(filePath)
	if err != nil {
		return "", err
	}
	defer createdFile.Close()

	// read all of the contents of our uploaded file into a
	// byte array
	fileBytes, err := io.ReadAll(file)
	if err != nil {
		return "", err
	}
	// write this byte array to our temporary file
	createdFile.Write(fileBytes)

	return createdFile.Name(), nil
}
