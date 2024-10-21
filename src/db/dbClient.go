package db

type DbClient interface {
	Connect(database string)
	Disconnect()
	GetAll(collectionName string)
	Get(collectionName string, id string)
	Add(collectionName string, obj []byte)
	Update(collectionName string, obj []byte)
	Remove(collectionName string, id string)
}
