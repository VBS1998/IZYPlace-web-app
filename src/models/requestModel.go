package models

type Request struct {
	ID           string        `json:"id,omitempty" bson:"_id,omitempty"`
	Name         string        `json:"name,omitempty" bson:"name,omitempty"`
	Description  string        `json:"description,omitempty" bson:"description,omitempty"`
	Capacity     float64       `json:"capacity,omitempty" bson:"capacity,omitempty"`
	Location     string        `json:"location,omitempty" bson:"location,omitempty"`
	PricePerHour float64       `json:"pricePerHour,omitempty" bson:"pricePerHour,omitempty"`
	Rating       float64       `json:"rating,omitempty" bson:"rating,omitempty"`
	ImageURL     []string      `json:"imageUrl,omitempty" bson:"imageUrl,omitempty"`
	Owner        Owner         `json:"owner,omitempty" bson:"owner,omitempty"`
	Status       RequestStatus `json:"status,omitempty" bson:"status,omitempty"`
}
