#Destroy everything that is in the db to start from blank
Ship.destroy_all
Port.destroy_all

regions = ["North America","South America" , "Africa" ,"Persian Gulf" ,
                   "Australia"  ,"Europe"  , "India","Mid to North China" , "South East Asia" ]

#Read .txt file of ship data and add it to database
open("db/data/ship_db.txt") do |ships|  
  ships.read.each_line do |ship|  
  	# .encode to fix UTF-8-encoded text (or it will not split the string in the next line) 
  	ship.encode!('UTF-8', 'binary', invalid: :replace, undef: :replace, replace: '') 	
    name, built, draft, deadweight, beam, loa, vessel_type, vessel_category = ship.chomp.split(";")

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

    case deadweight.to_i
        when deadweight.to_i > 100000
           category_name = 7
        when 80000..100000
          category_name = 6
        when 65000..80000
          category_name = 5
        when 50000..65000
          category_name = 4
        when 38000..50000
          category_name = 3
        when 18000..38000
          category_name = 2
        when 1000..18000
          category_name = 1
    end

    begin
    Ship.create!(name: name, built: built.to_i, draft: draft.to_d, deadweight: deadweight.to_i, beam: beam.to_i,
		             loa: loa.to_i, vessel_type: temp, vessel_category: category_name)
    rescue => e
      puts e.message + name
    end
  end
end

  all_ships = Ship.all
  #Read .txt file of port data and add it to database
  open("db/data/port_db.txt") do |ports|
    ports.read.each_line do |port|
      # .encode to fix UTF-8-encoded text (or it will not split the string in the next line)
      port.encode!('UTF-8', 'binary', invalid: :replace, undef: :replace, replace: '')
      name, latitude, longitude = port.chomp.split(";")

      begin
        Port.create!(name: name, latitude: latitude.to_f, longitude: longitude.to_f, region: regions.sample, ships: [all_ships.sample,
                                 all_ships.sample,all_ships.sample,all_ships.sample,all_ships.sample,all_ships.sample,all_ships.sample,all_ships.sample,all_ships.sample,all_ships.sample])
      rescue => e
        puts e.message + name
      end
    end
  end


p "Created #{Port.count} ports and #{Ship.count} ships"


