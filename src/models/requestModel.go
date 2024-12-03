package models

type Request struct {
	ID      string        `json:"id,omitempty" bson:"_id,omitempty"`
	Listing Listing       `json:"listing,omitempty" bson:"listing,omitempty"`
	Owner   Owner         `json:"owner,omitempty" bson:"owner,omitempty"`
	Status  RequestStatus `json:"status,omitempty" bson:"status,omitempty"`
}
