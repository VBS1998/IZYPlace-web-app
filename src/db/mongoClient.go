package db

import (
	"context"
	"fmt"
	"log"
	"os"
	"sync"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	MONGO_HOSTNAME_DEFAULT = "localhost"
	MONGO_PORT_DEFAULT     = "27017"
)

type MongoClient struct {
	// DbClient
	Hostname string
	Port     string
	Database *mongo.Database
	c        *mongo.Client
}

var mongoClient *MongoClient
var mongoClientOnce sync.Once

func GetMongoClient() *MongoClient {
	mongoClientOnce.Do(func() {
		hostname := os.Getenv("MONGO_DB_HOSTNAME")
		port := os.Getenv("MONGO_DB_PORT")

		if hostname == "" {
			hostname = MONGO_HOSTNAME_DEFAULT
		}
		if port == "" {
			port = MONGO_PORT_DEFAULT
		}

		mongoClient = newMongoClient(hostname, port)
	})
	return mongoClient
}

func newMongoClient(hostname string, port string) *MongoClient {
	return &MongoClient{
		Hostname: hostname,
		Port:     port,
	}
}

func (client *MongoClient) Connect(database string) {

	user := os.Getenv("MONGO_DB_USERNAME")
	pass := os.Getenv("MONGO_DB_PASSWORD")

	uri := fmt.Sprintf("mongodb://%s:%s@%s:%s/%s?authSource=admin", user, pass, client.Hostname, client.Port, database)

	// Set up a context with a timeout for the MongoDB connection
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var err error
	client.c, err = mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal(err)
	}

	client.Database = client.c.Database(database)

	// Ping the database to ensure connection is established
	if err := client.c.Ping(ctx, nil); err != nil {
		log.Fatal(err)
	}

	log.Print("MongoDB connected!")
}

func (client *MongoClient) Disconnect() {
	if client.c != nil {
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		if err := client.c.Disconnect(ctx); err != nil {
			log.Fatal(err)
		}

		log.Print("MongoDB connection closed.")
	}
}

func (client *MongoClient) GetAll(collectionName string) ([]bson.M, error) {
	// Create a context with a timeout
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Get the collection from the client
	collection := client.Database.Collection(collectionName)

	// Find all documents in the collection
	cursor, err := collection.Find(ctx, bson.D{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	// Slice to hold the results
	var results []bson.M

	// Iterate through the cursor and decode each document
	for cursor.Next(ctx) {
		var doc bson.M
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

func (client *MongoClient) Get(collection string, id string) {
	log.Fatal("Method not implemented!")
}

func (client *MongoClient) Add(collection string, obj []byte) {
	log.Fatal("Method not implemented!")
}

func (client *MongoClient) Update(collection string, obj []byte) {
	log.Fatal("Method not implemented!")
}

func (client *MongoClient) Remove(collection string, id string) {
	log.Fatal("Method not implemented!")
}
