package repositories

import (
	"github.com/VBS1998/base-web-app/src/models"
)

const (
	MONGO_DATABASE_NAME = "izyplace"
)

type ListingRepositoryInterface interface {
	GetAll() ([]*models.Listing, error)
	Get(id string) (*models.Listing, error)
	Add(listing *models.Listing) (string, error)
}
