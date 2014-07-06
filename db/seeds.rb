#Destroy everything that is in the db to start from blank
Ship.destroy_all

regions = ["North America","South America" , "Africa" ,"Persian Gulf" ,
                   "Australia"  ,"Europe"  , "India","Mid to North China" , "South East Asia" ]

#Read .txt file of port data and add it to database
open("db/data/port_db.txt") do |ports|
  ports.read.each_line do |port|  
  	# .encode to fix UTF-8-encoded text (or it will not split the string in the next line) 
  	port.encode!('UTF-8', 'binary', invalid: :replace, undef: :replace, replace: '') 	
    name, latitude, longitude = port.chomp.split(";")
    Port.create!(name: name, latitude: latitude.to_f, longitude: longitude.to_f, region: regions.sample)  
  end  
end  


#Read .txt file of ship data and add it to database
open("db/data/ship_db.txt") do |ships|  
  ships.read.each_line do |ship|  
  	# .encode to fix UTF-8-encoded text (or it will not split the string in the next line) 
  	ship.encode!('UTF-8', 'binary', invalid: :replace, undef: :replace, replace: '') 	
    name, built, draft, deadweight, beam, loa, vessel_type, vessel_class = ship.chomp.split(";")

    temp = 0
    case vessel_type.strip
        when "SDBC"
           temp = 1
        when "OHBS"
            temp = 2
        when "MPP"
            temp = 3
        when "TWEEN"
            temp = 4
        when "RORO"
            temp = 5
    end

    class_name = " "
    case deadweight.to_i
        when 80000..100000
           class_name = "Capesize "
        when 80000..100000
            class_name = "Post-Panamax"
        when 65000..80000
            class_name = "Panamax"
        when 50000..65000
            class_name = "Supramax"
        when 38000..50000
            class_name = "Handymax"
        when 18000..38000
            class_name = "Handysize"
        when 1000..18000
            class_name = "Mini-bulker"
    end

    Ship.create!(name: name, built: built.to_i, draft: draft.to_d, deadweight: deadweight.to_i, beam: beam.to_i, 
		loa: loa.to_i, vessel_type: temp, vessel_class: class_name, ports: [Port.all.sample, Port.all.sample])
  end  
end  



p "Created #{Port.count} ports and #{Ship.count} ships"


