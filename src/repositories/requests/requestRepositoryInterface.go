package repositories

import (
	"github.com/VBS1998/base-web-app/src/models"
)

const (
	MONGO_DATABASE_NAME = "izyplace"
)

type RequestRepositoryInterface interface {
	GetAll() ([]*models.Request, error)
	GetAllWithStatus(status string) ([]*models.Request, error)
	Get(id string) (*models.Request, error)
	Add(listing *models.Request) (string, error)
}
