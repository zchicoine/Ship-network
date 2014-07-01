#Destroy everything that is in the db to start from blank
Ship.destroy_all 
Port.destroy_all 

#Read .txt file of port data and add it to database
open("db/data/port_db.txt") do |ports|  
  ports.read.each_line do |port|  
  	#Encode it to read foreign characters or it will not read the file.
  	port.encode!('UTF-8', 'binary', invalid: :replace, undef: :replace, replace: '') 	
    name, latitude, longitude = port.chomp.split(";")
    Port.create!(name: name, latitude: latitude.to_f, longitude: longitude.to_f)  
  end  
end  



Ship.create!([{
	name: "ship 1",
	vessel_type: "Cargo",
	built: 15,
	#ports: [montreal, new_york]

	},
	{
	name: "ship 2",
	vessel_type: "Commerce",
	built: 10,	
	#ports: [new_york]
	},
	{
	name: "ship 3",
	vessel_type: "Cargo",
	built: 20,	
	#ports: [vancouver, new_york]
	}])



p "Created #{Port.count} ports"
