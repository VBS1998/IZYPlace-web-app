package models

type Listing struct {
	ID       string
	Name     string
	Location string
	Rating   float32
	ImageURL string
}

func ListingsMock() []Listing {

	return []Listing{
		{ID: "1", Name: "Rustic Barn", Location: "Countryside", Rating: 4.6, ImageURL: "https://nationaltoday.com/wp-content/uploads/2022/05/133-Barn-Day-1200x834.jpg?quality=60"},
		{ID: "2", Name: "Elegant Ballroom", Location: "Downtown", Rating: 4.8, ImageURL: "https://www.theknot.com/tk-media/images/30f341d8-b9fa-a0e9-7c6a-a943e99f4365~rs_1458.h?quality=60"},
		{ID: "3", Name: "Modern Loft", Location: "City Center", Rating: 4.7, ImageURL: "https://img.freepik.com/premium-photo/interior-design-modern-loft-apartment-living-room-3d-rendering_1040322-228.jpg?quality=60"},
		{ID: "4", Name: "Beachfront Pavilion", Location: "Coastal Area", Rating: 4.9, ImageURL: "https://www.fullerholidays.com.au/wp-content/uploads/2024/08/beachfront-pavilion-belongil-1.jpg?quality=60"},
		{ID: "5", Name: "Garden Terrace", Location: "Suburban", Rating: 4.5, ImageURL: "https://www.editionhotels.com/wp-content/uploads/2020/12/201117_EDT_Tokyo2_30_RGB_V2-scaled.jpg?quality=60"},
		{ID: "6", Name: "Historic Mansion", Location: "Old Town", Rating: 4.8, ImageURL: "https://media.architecturaldigest.com/photos/5d012732c9f2f20ac8f26900/16:9/w_6144,h_3456,c_limit/housefront12x8.jpg?quality=60"},
	}

}
