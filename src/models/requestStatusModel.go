package models

type RequestStatus uint8

const (
	None RequestStatus = iota
	Pending
	Approved
	Rejected
)
