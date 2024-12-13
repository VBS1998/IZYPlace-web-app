package services

import (
	"log"
	"sync"

	"github.com/VBS1998/base-web-app/src/db"
	"github.com/VBS1998/base-web-app/src/models"
	repositories "github.com/VBS1998/base-web-app/src/repositories/listings"
)

type ListingService struct {
	repository repositories.ListingRepositoryInterface
}

var listing_service *ListingService
var listing_service_once sync.Once

func SetupListingService(client db.DbClient) {
	listing_service_once.Do(func() {

		var repository repositories.ListingRepositoryInterface

		switch c := client.(type) {
		case *db.MongoClient:
			repository = repositories.NewListingMongoRepository(c)
		default:
			log.Fatal("Client type not supported")
		}

		listing_service = &ListingService{
			repository: repository,
		}
	})
}

func GetListingService() *ListingService {
	if listing_service == nil {
		log.Print("ERROR: Listing Service not initialized. Call Setup first.")
	}
	return listing_service
}

func (service *ListingService) GetAllListings() ([]*models.Listing, error) {
	return service.repository.GetAll()
}

func (service *ListingService) GetListing(id string) (*models.Listing, error) {
	return service.repository.Get(id)
}

func (service *ListingService) AddListing(listing *models.Listing) (string, error) {
	return service.repository.Add(listing)
}
