package db

type DbClient interface {
	Connect()
	Disconnect()
}
