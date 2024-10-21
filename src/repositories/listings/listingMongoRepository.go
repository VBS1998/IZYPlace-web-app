package repositories

import (
	"context"
	"log"
	"time"

	"github.com/VBS1998/base-web-app/src/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type ListingMongoRepository struct {
	ListingRepositoryInterface
	Database *mongo.Database
}

func NewListingMongoRepository(database *mongo.Database) *ListingMongoRepository {
	return &ListingMongoRepository{
		Database: database,
	}
}

func (repo *ListingMongoRepository) GetAll(collectionName string) ([]*models.Listing, error) {
	// Create a context with a timeout
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Get the collection from the client
	collection := repo.Database.Collection(collectionName)

	// Find all documents in the collection
	cursor, err := collection.Find(ctx, bson.D{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	// Slice to hold the results
	var results []*models.Listing

	// Iterate through the cursor and decode each document
	for cursor.Next(ctx) {
		var doc *models.Listing
		if err := cursor.Decode(&doc); err != nil {
			return nil, err
		}
		results = append(results, doc)
	}

	// Check for errors during iteration
	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return results, nil
}

func (repo *ListingMongoRepository) Get(collection string, id string) {
	log.Fatal("Method not implemented!")
}

func (repo *ListingMongoRepository) Add(collection string, obj []byte) {
	log.Fatal("Method not implemented!")
}

func (repo *ListingMongoRepository) Update(collection string, obj []byte) {
	log.Fatal("Method not implemented!")
}

func (repo *ListingMongoRepository) Remove(collection string, id string) {
	log.Fatal("Method not implemented!")
}
