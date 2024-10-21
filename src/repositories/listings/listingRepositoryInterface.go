package repositories

import (
	"github.com/VBS1998/base-web-app/src/models"
)

type ListingRepositoryInterface interface {
	GetAll(collectionName string) ([]*models.Listing, error)
}
