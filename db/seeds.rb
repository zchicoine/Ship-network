#Destroy everything that is in the db to start from blank
Ship.destroy_all
Port.destroy_all
ShipDetail.destroy_all
Broker.destroy_all
regions = Region::all

#Read .txt file of ship data and add it to database
open("db/data/ship_db.txt") do |ships|
    ships.read.each_line do |ship|
        # .encode to fix UTF-8-encoded text (or it will not split the string in the next line)
        ship.encode!('UTF-8', 'binary', invalid: :replace, undef: :replace, replace: '')
        name, vessel_type, deadweight, deadweight_cargo_capacity, draft, built, tons_per_centimeter, flag, classification_society,
            length_over_all, beam, holds, hatches,gross_registered_tonnage, net_registered_tonnage,total_cubic_meters_GR,total_cubic_meters_BL,
            total_cubic_feet_GR,total_cubic_feet_BL,intermediate_fuel_oil_180,intermediate_fuel_oil_380,marine_diesel_oil,marine_gasoline_oil,
            laden,ballast,economic,consumption_at_sea_L,consumption_at_sea_B,eco_consumption_L,marine_diesel_oil_at_sea,marine_gasoline_oil_at_sea,consumption_in_port_Working,
            consumption_in_port_Idle,marine_diesel_in_port,marine_gasoline_oil_in_port,number_of_cranes,crane_capacity,combined_crane_capacity,
            aussie_holds_ladders, co_system_on_board,twenty_foot_equivalent_unit,lakes_fitted,ice_classed,log_fitted,grabber,gearless,double_hull,
            imo_fitted,appendix_B_fitted,box_shaped_holds,cement_holes_fitted= ship.chomp.split(";")

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

        unless(deadweight.to_i == 0)
            case deadweight.to_i
                when 100000..10000000000
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
                when 1..18000
                    category_name = 1
            end
        else
            case deadweight_cargo_capacity.to_i
                when 100000..10000000000
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
                when 1..18000
                    category_name = 1
            end
        end

        begin
            b =    Ship.create!(name: name, vessel_type: temp, deadweight: deadweight.to_i, deadweight_cargo_capacity: deadweight_cargo_capacity.to_i,
                                vessel_category: category_name)

            a =  ShipDetail.create!(draft: draft.strip.to_f, built: built.strip.to_i, tons_per_centimeter: tons_per_centimeter.to_f,
                                    flag: flag, classification_society: classification_society, length_over_all: length_over_all.to_f, beam: beam.to_f, holds: holds.to_i,
                                    hatches: hatches.to_i, gross_registered_tonnage: gross_registered_tonnage, net_registered_tonnage: net_registered_tonnage, total_cubic_meters_GR: total_cubic_meters_GR,
                                    total_cubic_meters_BL: total_cubic_meters_BL,total_cubic_feet_GR:total_cubic_feet_GR, total_cubic_feet_BL: total_cubic_feet_BL, intermediate_fuel_oil_180?: intermediate_fuel_oil_180,
                                    intermediate_fuel_oil_380?: intermediate_fuel_oil_380,marine_diesel_oil?: marine_diesel_oil,laden: laden, ballast: ballast, economic: economic,
                                    consumption_at_sea_L: consumption_at_sea_L, consumption_at_sea_B: consumption_at_sea_B, eco_consumption_L: eco_consumption_L,
                                    marine_diesel_oil_at_sea: marine_diesel_oil_at_sea, marine_gasoline_oil_at_sea: marine_gasoline_oil_at_sea, consumption_in_port_Working: consumption_in_port_Working,
                                    consumption_in_port_Idle: consumption_in_port_Idle, marine_diesel_in_port: marine_diesel_in_port, marine_gasoline_oil_in_port: marine_gasoline_oil_in_port,
                                    number_of_cranes: number_of_cranes, crane_capacity: crane_capacity, combined_crane_capacity: combined_crane_capacity, aussie_holds_ladders?: aussie_holds_ladders,
                                    CO2_system_on_board?: co_system_on_board, twenty_foot_equivalent_unit?: twenty_foot_equivalent_unit,lakes_fitted?: lakes_fitted,
                                    log_fitted?: log_fitted, grabber?: grabber,gearless?: gearless, double_hull?: double_hull,imo_fitted?: imo_fitted, appendix_B_fitted?: appendix_B_fitted,
                                    box_shaped_holds?: box_shaped_holds, cement_holes_fitted?: cement_holes_fitted,marine_gasoline_oil?: marine_gasoline_oil, ice_classed?: ice_classed)
            b.ship_detail = a
        rescue => e
            puts e.message + " for  vessel: " + name
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
            # _shipment = Shipment.new(open_start_date: Time.now,open_end_date:  Time.new.advance({days:6}))
            #   Geocoder.search("#{latitude},#{longitude}").last.data["address_components"].first["long_name"]

            #  sleep(1.0/2)
            Port.create!(name: name, latitude: latitude.to_f, longitude: longitude.to_f, region: regions.sample,
                         ships: [all_ships.sample, all_ships.sample,all_ships.sample,all_ships.sample,all_ships.sample,all_ships.sample,all_ships.sample,all_ships.sample,all_ships.sample,all_ships.sample]

            )
        rescue => e
            puts e.message + " for  port: " + name
        end
    end
end
all_shipments = Shipment.all
begin
    Broker.create!(username: "Zack", password: "shipment", email: "z.chicoine@gmail.com", shipments:all_shipments)

rescue => e
    puts e.message
end
p "Created #{Port.count} ports and #{Ship.count} ships and #{Broker.count} broker"

# here some rails query that would be helpful for the developer later on
