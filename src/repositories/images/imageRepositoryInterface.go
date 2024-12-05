package repositories

import "mime/multipart"

type ImageRepositoryInterface interface {
	Upload(multipart.File) (string, error)
}
