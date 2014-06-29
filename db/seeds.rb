#Destroy everything that is in the db to start from blank
Ship.destroy_all 
Port.destroy_all 

#DateTime objects for Shipments
#require 'date'
#start_date = DateTime.new(2014,2,10)
#end_date = DateTime.new(2014,2,15)


#Create ships by passing an array into the create method 
montreal = Port.create!(name: 'Montreal', latitude: 11, longitude: 3)
new_york = Port.create!(name: 'New York', latitude: 2, longitude: 6)
vancouver = Port.create!(name: 'Vancouver', latitude: 6, longitude: 7)

Ship.create!([{
	name: "ship 1",
	vessel_type: "Cargo",
	built: 15,
	ports: [montreal, new_york]

	},
	{
	name: "ship 2",
	vessel_type: "Commerce",
	built: 10,	
	ports: [new_york]
	},
	{
	name: "ship 3",
	vessel_type: "Cargo",
	built: 20,	
	ports: [vancouver, new_york]
	}])



p "Created #{Ship.count} ships"
