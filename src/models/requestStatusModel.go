package models

type RequestStatus uint8

const (
	Pending RequestStatus = iota
	Approved
	Rejected
)
