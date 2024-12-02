package repositories

import (
	"context"
	"fmt"
	"time"

	"github.com/VBS1998/base-web-app/src/db"
	"github.com/VBS1998/base-web-app/src/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

const (
	REQUESTS_MONGO_COLLECTION_NAME = "requests"
)

type RequestMongoRepository struct {
	RequestRepositoryInterface
	Database *mongo.Database
}

func NewRequestMongoRepository(client *db.MongoClient) *RequestMongoRepository {
	return &RequestMongoRepository{
		Database: client.GetDatabase(MONGO_DATABASE_NAME),
	}
}

func (repo *RequestMongoRepository) GetAll() ([]*models.Request, error) {
	// Create a context with a timeout
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Get the collection from the client
	collection := repo.Database.Collection(REQUESTS_MONGO_COLLECTION_NAME)

	// Find all documents in the collection
	cursor, err := collection.Find(ctx, bson.D{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	// Slice to hold the results
	results := []*models.Request{}

	// Iterate through the cursor and decode each document
	for cursor.Next(ctx) {
		var doc *models.Request
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

func (repo *RequestMongoRepository) GetAllWithStatus(status string) ([]*models.Request, error) {
	return nil, nil
}

func (repo *RequestMongoRepository) Get(id string) (*models.Request, error) {
	// Create a context with a timeout
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Get the collection from the client
	collection := repo.Database.Collection(REQUESTS_MONGO_COLLECTION_NAME)

	id_obj, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	filter := bson.D{{Key: "_id", Value: id_obj}}

	// Variable to hold the result
	var result *models.Request

	// Find the document
	err = collection.FindOne(ctx, filter).Decode(&result)
	if err != nil {
		return nil, err
	}

	return result, nil

}

func (repo *RequestMongoRepository) Add(request *models.Request) (string, error) {
	// Create a context with a timeout
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Get the collection from the client
	collection := repo.Database.Collection(REQUESTS_MONGO_COLLECTION_NAME)

	results, err := collection.InsertOne(ctx, request)

	if err != nil {
		return "", err
	}

	// Assert the type and convert to string
	id, ok := results.InsertedID.(primitive.ObjectID)
	if !ok {
		return "", fmt.Errorf("InsertedID is not of type ObjectID")
	}

	return id.Hex(), nil
}
