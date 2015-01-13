require "json"
#require "rchardet"

class AdminController < ApplicationController
#  include  AdminHelperC

  before_action :require_admin_authentification #the admin controller has to be protected to only let admins in.
  @@error_messages = Array.new
  def require_admin_authentification
    unless current_broker.try(:admin?)
      redirect_to root_path                    #if a broker tries to view an admin page/action, they will be redirected to the main page.
    end
  end

  def index
      render ('index')  #render the admin view. The main page controller calls this action after the admin logs in
  end

  def update_ships_table
    # For now, when the admin presses the button to update ship db, we open the local json file obtained from google drive
    # and update the db. Later we will fetch the data from Google Drive directly.
    #This code will move to the controller helper later.
    @error_messages_for_ships, @error_messages_for_ports, @error_messages_for_shipments = [], [], []

    # update port database
    @error_messages_for_ports = update_port_db
    # update ship database
    @error_messages_for_ships = update_ship_db
    #update shipment database
    @error_messages_for_shipments
    update_broker
    render ('update_ships_table')
  end

  def upload_ports_file
#    cd = CharDet.detect(params[:ports].read)
#    encoding = cd['encoding']
#    string_port.encode!('UTF-8', 'binary', invalid: :replace, undef: :replace, replace: '')

    # Upload a file
    string_port = params[:ports].read.encode!('UTF-8', 'binary', invalid: :replace, undef: :replace, replace: '')
    File.open(Rails.root.join('public', 'port_data.json'), 'wb') do |file|   # open a directory in the app where to save the file
          file.write(string_port)
    end
    flash[:notice] = "File uploaded"   # This is not yet used in front end
    render "index"
  end

  def upload_ships_file
    string_ship = params[:ships].read.encode!('UTF-8', 'binary', invalid: :replace, undef: :replace, replace: '')
    File.open(Rails.root.join('public', 'ship_data.json'), 'wb') do |file|
      file.write(string_ship)
    end
    flash[:notice] = "File uploaded"
    render "index"
  end

  def update_port_db
    tempHash = {}
    open_json_ports_file = File.open(Rails.root.join('public', 'port_data.json'))
    read_file = open_json_ports_file.read
    hash_object = JSON.parse(read_file)
    error_for_ports = Array.new
    error_for_ports << 'port'
    begin
      hash_object.each do |port|

        # to support non-ascii characters like é for example
        #port.encode!('UTF-8', 'binary', invalid: :replace, undef: :replace, replace: '')

        region, @name, latitude, longitude = port['region'].to_s, port['portNames'].to_s, port['latitudeDecimal'].to_f,
            port['longitudeDecimal'].to_f

        # create a hash for alternative port name. Alternative port name are in the same file as port info, so we can do this here.
        # The key is the alt. name. So for shipments, we will look at the hash file to find the real name of the port (the value)

        alternative_port_names_array = port['alternatePortNames'].to_s.split(",")

        unless alternative_port_names_array.empty?
          alternative_port_names_array.each do |alt_name|
            tempHash[alt_name.to_s.downcase] = @name.to_s.downcase
          end
        end
        tempHash[@name.to_s.downcase] = @name.to_s.downcase           #add also the real name of the port to map to itself



        current_port = Port.find_by_name(@name.to_s)
        unless current_port.nil?
          current_port.update(latitude: latitude.to_f, longitude: longitude.to_f, region: region.to_s)
        else
          current_port = Port.create(name: @name.to_s, latitude: latitude.to_f, longitude: longitude.to_f, region: region.to_s)
        end
      end
    rescue => e
      error_for_ports << e.message + ' for port: ' + @name.to_s
    end
    File.open("public/temp.json","w") do |f|
      f.write(tempHash.to_json)
    end
    return error_for_ports
  end

  def update_ship_db
    Shipment.destroy_all
    open_json_temp_file = File.open(Rails.root.join('public', 'temp.json'))    # Read the json file containing the alternative port names
    read_port_names_file = open_json_temp_file.read
    hash_port_names_object = JSON.parse(read_port_names_file)
    open_json_ships_file = File.open(Rails.root.join('public', 'ship_data.json'))
    read_file = open_json_ships_file.read
    hash_object = JSON.parse(read_file)
    error_for_ships = Array.new
    error_for_ships << 'ship'
    begin
      hash_object.each do |ship|

        @name, deadweight, deadweight_cargo_capacity, vessel_type = ship['motorVessel'].force_encoding('UTF-8'), ship['deadweight'], ship['deadweightCargoCapacity'],
            ship['typeOfVessel']

        deadweight = deadweight.to_i
        deadweight_cargo_capacity = deadweight_cargo_capacity.to_i

        #next if (deadweight == 0 and deadweight_cargo_capacity == 0)

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

        unless (deadweight == 0)
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
          case deadweight_cargo_capacity
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

        vessel = Ship.find_by_name(@name.to_s)
        unless vessel.nil?
          vessel.update!(vessel_type: temp, deadweight: deadweight.to_i, deadweight_cargo_capacity: deadweight_cargo_capacity.to_i,
                        vessel_category: category_name.to_i)
        end
        if !(ship['deadweight'].nil? and ship['deadweightCargoCapacity'].nil?)
          vessel = Ship.create(name: @name.to_s, vessel_type: temp, deadweight: deadweight.to_i, deadweight_cargo_capacity: deadweight_cargo_capacity.to_i,
                                vessel_category: category_name.to_i)
        end


        draft, built = ship['draft'].to_f, ship['yearBuilt'].to_i

        unless (ship['deadweight'].nil? and ship['deadweightCargoCapacity'].nil?)
        vessel_details = ShipDetail.create(draft: draft, built: built,tons_per_centimeter: ship['tpc'].to_f,
                                            flag: ship['flag'], classification_society: ship['classificationSociety'], length_over_all: ship['loa'].to_f, beam: ship['beam'].to_f, holds: ship['holds'].to_i,
                                            hatches: ship['hatches'].to_i, gross_registered_tonnage: ship['grt'], net_registered_tonnage: ship['nrt'], total_cubic_meters_GR: ship['totalCbmGrain'],
                                            total_cubic_meters_BL: ship['totalCbmBale'], total_cubic_feet_GR: ship['totalCbftGrain'], total_cubic_feet_BL: ship['totalCbftBale'], intermediate_fuel_oil_180?: return_boolean(ship['ifo180']),
                                            intermediate_fuel_oil_380?: return_boolean(ship['ifo380']), marine_diesel_oil?: return_boolean(ship['mdo']), laden: ship['ladenSpeed'], ballast: ship['ballastSpeed'], economic: ship['ecoSpeed'],
                                            consumption_at_sea_L: ship['consumptionL'], consumption_at_sea_B: ship['consumptionB'], eco_consumption_L: ship['consupmtionEcoL'],
                                            marine_diesel_oil_at_sea: ship['mdoAtSea'], marine_gasoline_oil_at_sea: ship['mgoAtSea'], consumption_in_port_Working: ship['inPortWorking'],
                                            consumption_in_port_Idle: ship['inPortIdle'], marine_diesel_in_port: ship['mdoInPort'], marine_gasoline_oil_in_port: ship['mgoInPort'],
                                            number_of_cranes: ship['cranes'], crane_capacity: ship['craneCapacity'], combined_crane_capacity: ship['combinedCraneCapacity'], aussie_holds_ladders?: return_boolean(ship['aussieHoldsLadders']),
                                            CO2_system_on_board?: return_boolean(ship['co2Fitted']), twenty_foot_equivalent_unit?: return_boolean(ship['twentyfootEquivalentUnits']), lakes_fitted?: return_boolean(ship['lakesFitted']),
                                            log_fitted?: return_boolean(ship['logFitted']), grabber?: return_boolean(ship['grabs']), gearless?: return_boolean(ship['gearless']), double_hull?: return_boolean(ship['doubleHull']), imo_fitted?: return_boolean(ship['imoFitted']), appendix_B_fitted?: return_boolean(ship['appendixBFitted']),
                                            box_shaped_holds?: return_boolean(ship['boxShapedHolds']), cement_holes_fitted?: return_boolean(ship['cementHolesFitted']), marine_gasoline_oil?: return_boolean(ship['mgo']), ice_classed?: return_boolean(ship['iceClassed']))


        vessel.ship_detail = vessel_details
        end
        # The ship object in this loop also contains the open port and open date, so after updating the ship info,
        # we can can create the shipment (By this moment in the code, the port json file has already been used to update the database)

        open_port = hash_port_names_object[ship['openPort'].to_s.downcase]        # Look for the port where this ship is supposed to be
        port = Port.find_by_name(open_port)
        # We then get the open date
        next if (ship['openDate'].nil? or ship['openPort'].nil?)
        open_date_string = ship['openDate'].to_s
        date, time = open_date_string.split("T")
        year, month, day = date.to_s.split("-")
        start_date = Date.new(year.to_i, month.to_i, day.to_i)

        Shipment.create(ship: vessel, open_start_date: start_date, open_end_date: start_date.advance({days: 5}), port: port)
      end


    rescue => e
      error_for_ships <<  e.message + " for vessel: " + @name.to_s
    end
      return error_for_ships
  end

  def update_broker
#    Broker.destroy_all
        begin
          all_shipments = Shipment.all
          zack = Broker.find_by(username: 'Zack')
          if (zack.nil?)
            Broker.create!(username: "Zack", password: "shipment", company: "Sterling Ocean Transport Inc.",
                           email: "brokers@sterlingoceantransport.com", shipments: all_shipments, website:"www.sterlingoceantransport.com",
                           telephone:"+1(514)807-3707", country:"Canada", city:"Montreal")
          else
            zack.shipments = all_shipments
          end

        rescue => e
          puts "#{e.message} for broker Zack"
        end

  end

  def return_boolean(attribute)
    unless attribute.blank?
      if attribute.to_s == "yes"
        return true
      else
        return false
      end
    end
  end


end
