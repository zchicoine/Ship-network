#Destroy everything that is in the db to start from blank
Ship.destroy_all 
Port.destroy_all 

#DateTime objects for Shipments
require 'date'
start_date = DateTime.new(2014,2,10)
end_date = DateTime.new(2014,2,15)


#Create ships by passing an array into the create method 
montreal = Port.create!(name: 'Montreal', latitude_coordinate: 11, longitude_coordinate: 3)
new_york = Port.create!(name: 'New York', latitude_coordinate: 2, longitude_coordinate: 6)
vancouver = Port.create!(name: 'Vancouver', latitude_coordinate: 6, longitude_coordinate: 7)

Ship.create!([{
	name: "Ruby",
	category: "Cargo",
	built: "rails",
	ports: [montreal, new_york]

	},
	{
	name: "Clara",
	category: "Commerce",
	built: "metal",	
	ports: [new_york]
	},
	{
	name: "Santa",
	category: "Cargo",
	built: "whatever",	
	ports: [vancouver, new_york]
	}])



p "Created #{Ship.count} ships"
