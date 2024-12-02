package models

type Owner struct {
	ID    string `json:"id,omitempty" bson:"id,omitempty"`
	Name  string `json:"name,omitempty" bson:"name,omitempty"`
	Phone string `json:"phone,omitempty" bson:"phone,omitempty"`
}
