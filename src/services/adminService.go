package services

import (
	"errors"
	"log"
	"sync"

	"github.com/VBS1998/base-web-app/src/models"
)

type AdminService struct {
}

var admin_service *AdminService
var admin_service_once sync.Once

func SetupAdminService() {
	admin_service_once.Do(func() {
		admin_service = &AdminService{}
	})
}

func GetAdminService() *AdminService {
	if admin_service == nil {
		log.Print("ERROR: Admin Service not initialized. Call Setup first.")
	}
	return admin_service
}

func (service *AdminService) Call(request_id string, call bool) (string, error) {
	request, err := GetRequestService().GetRequest(request_id)
	if err != nil {
		return "", err
	}

	if request.Status != models.Pending {
		return "", errors.New("request not pending")
	}

	listing := request.Listing

	if !call {
		return "", GetRequestService().UpdateRequestStatus(request_id, models.Rejected)
	}

	listing_id, err := GetListingService().AddListing(&listing)
	if err != nil {
		return "", err
	}

	return listing_id, GetRequestService().UpdateRequestStatus(request_id, models.Approved)
}
