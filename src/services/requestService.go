package services

import (
	"log"
	"net/url"
	"strconv"
	"sync"

	"github.com/VBS1998/base-web-app/src/db"
	"github.com/VBS1998/base-web-app/src/models"
	repositories "github.com/VBS1998/base-web-app/src/repositories/requests"
)

type RequestService struct {
	repository repositories.RequestRepositoryInterface
}

var request_service *RequestService
var request_service_once sync.Once

func SetupRequestService(client db.DbClient) {
	request_service_once.Do(func() {

		var repository repositories.RequestRepositoryInterface

		switch c := client.(type) {
		case *db.MongoClient:
			repository = repositories.NewRequestMongoRepository(c)
		default:
			log.Fatal("Client type not supported")
		}

		request_service = &RequestService{
			repository: repository,
		}
	})
}

func GetRequestService() *RequestService {
	if listing_service == nil {
		log.Print("ERROR: Request Service not initialized. Call Setup first.")
	}
	return request_service
}

func (service *RequestService) GetAllRequests(query url.Values) ([]*models.Request, error) {
	statusInt, err := strconv.ParseInt(query.Get("status"), 10, 8)
	if err != nil {
		return service.repository.GetAll()
	}
	status := models.RequestStatus(statusInt)

	return service.repository.GetAllWithStatus(status)
}

func (service *RequestService) GetRequest(id string) (*models.Request, error) {
	return service.repository.Get(id)
}

func (service *RequestService) AddRequest(request *models.Request) (string, error) {
	request.Status = models.Pending
	return service.repository.Add(request)
}
