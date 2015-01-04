#Database cannot contain any seed data if we want to add data form controller or other places in the app (bug in rails).
def clean_database
    Ship.destroy_all
    Port.destroy_all
    ShipDetail.destroy_all
end
=begin
    Broker.destroy_all
end


# function
def read_region_file

    open("db/data/region.txt") do |ports|
        ports.read.each_line do |port|
            # .encode to fix UTF-8-encoded text (or it will not split the string in the next line)
            port.encode!('UTF-8', 'binary', invalid: :replace, undef: :replace, replace: '')
            region, name, latitude, longitude = port.chomp.split(";")

            begin

                Port.create!(name: name, latitude: latitude.to_f, longitude: longitude.to_f, region: region)
            rescue => e
                puts e.message + " for  port: " + name
            end
        end
    end
end

def return_boolean(attribute)
  unless attribute.blank?
    if attribute.to_s.strip == "yes"
      return true
    else
      return false
    end
  end
end

def read_ship_db_file
#Read .txt file of ship data and add it to database

    open("db/data/ship.txt") do |ships|
        ships.read.each_line do |ship|

            # .encode to fix UTF-8-encoded text (or it will not split the string in the next line)
            ship.encode!('UTF-8', 'binary', invalid: :replace, undef: :replace, replace: '')
            name,  deadweight, deadweight_cargo_capacity, draft, built, vessel_type, tons_per_centimeter, flag, classification_society,
                length_over_all, beam, holds, hatches, gross_registered_tonnage, net_registered_tonnage, total_cubic_meters_GR, total_cubic_meters_BL,
                total_cubic_feet_GR, total_cubic_feet_BL, intermediate_fuel_oil_180, intermediate_fuel_oil_380, marine_diesel_oil, marine_gasoline_oil,
                laden, ballast, economic, consumption_at_sea_L, consumption_at_sea_B, eco_consumption_L, marine_diesel_oil_at_sea, marine_gasoline_oil_at_sea, consumption_in_port_Working,
                consumption_in_port_Idle, marine_diesel_in_port, marine_gasoline_oil_in_port, number_of_cranes, crane_capacity, combined_crane_capacity,
                aussie_holds_ladders, co_system_on_board, twenty_foot_equivalent_unit, lakes_fitted, ice_classed, log_fitted, grabber, gearless, double_hull,
                imo_fitted, appendix_B_fitted, box_shaped_holds, cement_holes_fitted= ship.chomp.split(";")

            vessel_type = vessel_type.strip unless vessel_type.nil?
            case vessel_type

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
                else
                    temp = 0
            end

            unless (deadweight.to_i == 0)
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



                    b = Ship.create!(name: name, vessel_type: temp, deadweight: deadweight.to_i, deadweight_cargo_capacity: deadweight_cargo_capacity.to_i,
                                     vessel_category: category_name)

                    a = ShipDetail.create!(draft: draft.strip.to_f, built: built.strip.to_i, tons_per_centimeter: tons_per_centimeter.to_f,
                                           flag: flag, classification_society: classification_society, length_over_all: length_over_all.to_f, beam: beam.to_f, holds: holds.to_i,
                                           hatches: hatches.to_i, gross_registered_tonnage: gross_registered_tonnage, net_registered_tonnage: net_registered_tonnage, total_cubic_meters_GR: total_cubic_meters_GR,
                                           total_cubic_meters_BL: total_cubic_meters_BL, total_cubic_feet_GR: total_cubic_feet_GR, total_cubic_feet_BL: total_cubic_feet_BL, intermediate_fuel_oil_180?: return_boolean(intermediate_fuel_oil_180),
                                           intermediate_fuel_oil_380?: return_boolean(intermediate_fuel_oil_380), marine_diesel_oil?: return_boolean(marine_diesel_oil), laden: laden, ballast: ballast, economic: economic,
                                           consumption_at_sea_L: consumption_at_sea_L, consumption_at_sea_B: consumption_at_sea_B, eco_consumption_L: eco_consumption_L,
                                           marine_diesel_oil_at_sea: marine_diesel_oil_at_sea, marine_gasoline_oil_at_sea: marine_gasoline_oil_at_sea, consumption_in_port_Working: consumption_in_port_Working,
                                           consumption_in_port_Idle: consumption_in_port_Idle, marine_diesel_in_port: marine_diesel_in_port, marine_gasoline_oil_in_port: marine_gasoline_oil_in_port,
                                           number_of_cranes: number_of_cranes, crane_capacity: crane_capacity, combined_crane_capacity: combined_crane_capacity, aussie_holds_ladders?: return_boolean(aussie_holds_ladders),
                                           CO2_system_on_board?: return_boolean(co_system_on_board), twenty_foot_equivalent_unit?: return_boolean(twenty_foot_equivalent_unit), lakes_fitted?: return_boolean(lakes_fitted),
                                           log_fitted?: return_boolean(log_fitted), grabber?: return_boolean(grabber), gearless?: return_boolean(gearless), double_hull?: return_boolean(double_hull), imo_fitted?: return_boolean(imo_fitted), appendix_B_fitted?: return_boolean(appendix_B_fitted),
                                           box_shaped_holds?: return_boolean(box_shaped_holds), cement_holes_fitted?: return_boolean(cement_holes_fitted), marine_gasoline_oil?: return_boolean(marine_gasoline_oil), ice_classed?: return_boolean(ice_classed))
                    b.ship_detail = a


            rescue => e
                puts e.message + " for  vessel: " + name
            end


        end
    end

end

def create_random_shipments

    all_ships = Ship.all
    _shipments = []
    for i in 1..[*1..8].sample
        _shipments.push(Shipment.new(open_start_date: Time.new.advance({days: [*1..25].sample}), open_end_date: Time.new.advance({days: [*30..55].sample}),
                                     ship: all_ships.sample))
    end
    _shipments
end

def create_shipments
    #open the json file
    alter_port = read_alter_port_name_file


    open("db/data/shipments.txt") do |ships|
        ships.read.each_line do |ship|
            # .encode to fix UTF-8-encoded text (or it will not split the string in the next line)
            ship.encode!('UTF-8', 'binary', invalid: :replace, undef: :replace, replace: '')
            ship_name, open_port , estimated_time = ship.chomp.split(";")

            open_port =  alter_port[open_port] if  alter_port[open_port]

            _port_associate_to_ship = Port.find_by_name(open_port)
            unless _port_associate_to_ship.blank?

                month, day, year = estimated_time.chomp.split("/")

                start_date = Time.new(year, month, day)


                _ship_associate_to_port = Ship.find_by_name(ship_name)
                unless _ship_associate_to_port.blank?

                    Shipment.create(ship: _ship_associate_to_port, open_start_date: start_date, open_end_date: start_date.advance({days: 5}), port: _port_associate_to_ship)


                else
                    p "Ship #{ship_name}"
                end
            else
                p "Port #{open_port}"
            end

        end
    end

end

def read_alter_port_name_file
    file = File.read("db/data/alter_port_name.json")
    JSON.parse(file)
end

#Destroy everything that is in the db to start from blank
clean_database
read_region_file
read_ship_db_file
create_shipments


begin
    all_shipments = Shipment.all
    Broker.create!(username: "Zack", password: "shipment", company: "Sterling Ocean Transport Inc.",
                   email: "brokers@sterlingoceantransport.com", shipments: all_shipments, website:"www.sterlingoceantransport.com",
                   telephone:"+1(514)807-3707", country:"Canada", city:"Montreal")

rescue => e
    puts "#{e.message} for broker Zack"
end

begin
  Broker.create!(username: "Admin", password: "database", admin: true, email: "admin@shipnetwork.com")

rescue => e
  puts "#{e.message} for broker Admin"
end

p "Created #{Port.count} ports and #{Ship.count} ships and #{Shipment.count} shipments and #{Broker.count} brokers"


# # here some rails query that would be helpful for the developer later on
=end