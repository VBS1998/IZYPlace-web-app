package services

import (
	"errors"
	"log"
	"os"
	"sync"

	"github.com/VBS1998/base-web-app/src/db"
	"github.com/VBS1998/base-web-app/src/models"
	repositories "github.com/VBS1998/base-web-app/src/repositories/listings"
)

const (
	DEFAULT_ADD_PWD = "D3f4ultP@55"
)

type ListingService struct {
	repository repositories.ListingRepositoryInterface
}

var service *ListingService
var service_once sync.Once

func SetupListingService(client db.DbClient) {
	service_once.Do(func() {

		var repository repositories.ListingRepositoryInterface

		switch c := client.(type) {
		case *db.MongoClient:
			repository = repositories.NewListingMongoRepository(c)
		default:
			log.Fatal("Client type not supported")
		}

		service = &ListingService{
			repository: repository,
		}
	})
}

func GetListingService() *ListingService {
	if service == nil {
		log.Print("ERROR: Listing Service not initialized. Call Setup first.")
	}
	return service
}

func (service *ListingService) GetAllListings() ([]*models.Listing, error) {
	return service.repository.GetAll()
}

func (service *ListingService) AddListing(listing *models.Listing, pwd string) (string, error) {
	expectedPwd := os.Getenv("IZYPLACE_ADD_PWD")

	if expectedPwd == "" {
		expectedPwd = DEFAULT_ADD_PWD
	}

	if pwd != expectedPwd {
		return "", errors.New("wrong password")
	}

	return service.repository.Add(listing)
}
