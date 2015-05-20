module AdminHelperC

  def open_the_json_file
    open_json_temp_file = File.open(Rails.root.join('app', 'assets', 'javascripts', 'json', 'shipments.json'))    # Read the json file containing the alternative port names
    read_port_names_file = open_json_temp_file.read
    return read_port_names_file
  end

  def hash_the_json_file object
    hash_json_object = JSON.parse(object)
    return hash_json_object
  end

  def update_shipments (object)
    Shipment.destroy_all
    begin
      # Store the errors for bad port names
      error_for_ships = Array.new
      # Open the alternative port file
      open_json_temp_file = File.open(Rails.root.join('app', 'assets', 'javascripts', 'json', 'alternative_port_names.json'))    # Read the json file containing the alternative port names
      read_port_names_file = open_json_temp_file.read
      hash_port_names_object = JSON.parse(read_port_names_file)
      object.each do |shipment|
        port_name = shipment['open_port'].to_s.downcase
        open_port = hash_port_names_object[port_name]        # Look for the port where this ship is supposed to be
        port = Port.find_by_name(open_port)
        vessel = Ship.find_by_name(shipment['vessel_name'].to_s.downcase)
        # We then get the open date
        # Since we might not have the open port, we store the name
        if (hash_port_names_object[shipment['open_port'].to_s.strip.downcase].nil?)
          error_for_ships << "This open port is not in the port database for port name nor alternative port name --> " + shipment['open_port'].to_s
        end
        next if (shipment['open_date'].nil? or shipment['open_port'].nil?)
        open_date_string = shipment['open_date'].to_s
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

  # :description update or create new port
  # :param [Array of hash] {'region' =>, 'portNames' =>,'alternatePortNames' =>,'latitudeDecimal' =>,'longitudeDecimal' =>,}
  # :return [Hash] of all the ports name and their alternative names
  #  As an example {'a':'a','aa':'a'} so both a and aa are same port with different names
  #  {error:[Array of errors]}
  def update_and_create_ports(object)
      tempHash = {}
      tempHash[:error] = [] # store all the errors
      tempHash[:data] = {} # store all the data
      object.each do |port|
          begin
              region =  port['region'].to_s
              @name = port['portNames'].to_s
              latitude = port['latitudeDecimal'].to_f
              longitude = port['longitudeDecimal'].to_f

              # create a hash for alternative port name. Alternative port name are in the same file as port info, so we can do this here.
              # The key is the alt. name. So for shipments, we will look at the hash file to find the real name of the port (the value)

              alternative_port_names_array = port['alternatePortNames'].to_s.split(',')

              unless alternative_port_names_array.empty?
                alternative_port_names_array.each do |alt_name|
                    tempHash[:data][alt_name.to_s.strip.downcase] = @name.to_s.downcase
                end
              end
              tempHash[:data][@name.to_s.strip.downcase] = @name.to_s.downcase           #add also the real name of the port to map to itself

              current_port = UnitOfWork.instance.port.get_by_name(@name.to_s)
              if current_port[:error].nil?
                  current_port[:value].update(latitude: latitude.to_f, longitude: longitude.to_f, region: region.to_s)
              else
                  Port.create!(name: @name.to_s, latitude: latitude.to_f, longitude: longitude.to_f, region: region.to_s)
              end
          rescue => e
              tempHash[:error].push(e.message + ' for port: ' + @name.to_s)
          end
      end
    return tempHash
  end

  # :description TODO
  # :param [Hash] where a key is a port name and value the actual port name
  def store_alternative_port_name_file_in_app(object)
    File.open('app/assets/javascripts/json/alternative_port_names.json', 'w') do |f|
      f.write(object.to_json)
    end
  end

  # :param [File]
  # :return {data: ,error:}
  def read_uploaded_file(object)
      temp_hash = {}
    if object.blank?
        temp_hash[:error] = 'No file to read'
    else
        temp_hash[:data]= object.read.encode!('UTF-8', 'binary', invalid: :replace, undef: :replace, replace: '')
    end
      temp_hash
  end

  # :description  Convert a json object to ruby hash
  # :param [Json]
  # :return [Hash]
  def convert_it_to_hash_format(object)
    JSON.parse(object)
  end

  # :description update or create a ship
  # :param [Json]
  # :return [Hash] {data: , error:}
 def update_and_create_ships(object)
     temp_hash = {}
     temp_hash[:data] = []
     temp_hash[:error] =[]
     object.each do |ship|
         begin
             @name = ship['motorVessel']
             deadweight = ship['deadweight']
             deadweight_cargo_capacity =  ship['deadweightCargoCapacity']
             vessel_type = ship['typeOfVessel']

             deadweight = deadweight.to_i
             deadweight_cargo_capacity = deadweight_cargo_capacity.to_i

             vessel_type_to_i = convert_vessel_type(vessel_type)

             if deadweight == 0
                 category_name = convert_category_name(deadweight_cargo_capacity)
             else
                 category_name = convert_category_name(deadweight)
             end

             draft = ship['draft'].to_f
             built = ship['yearBuilt'].to_i

             ship = {vessel_type: vessel_type_to_i,
                     deadweight: deadweight.to_i,
                     deadweight_cargo_capacity: deadweight_cargo_capacity.to_i,
                     vessel_category: category_name.to_i,
                     ship_detail_attributes: {draft: draft,
                                              built: built,
                                              tons_per_centimeter: ship['tpc'].to_f,
                                              flag: ship['flag'],
                                              classification_society: ship['classificationSociety'],
                                              length_over_all: ship['loa'].to_f,
                                              beam: ship['beam'].to_f,
                                              holds: ship['holds'].to_i,
                                              hatches: ship['hatches'].to_i,
                                              gross_registered_tonnage: ship['grt'],
                                              net_registered_tonnage: ship['nrt'],
                                              total_cubic_meters_GR: ship['totalCbmGrain'],
                                              total_cubic_meters_BL: ship['totalCbmBale'],
                                              total_cubic_feet_GR: ship['totalCbftGrain'],
                                              total_cubic_feet_BL: ship['totalCbftBale'],
                                              intermediate_fuel_oil_180?: return_boolean(ship['ifo180']),
                                              intermediate_fuel_oil_380?: return_boolean(ship['ifo380']),
                                              marine_diesel_oil?: return_boolean(ship['mdo']),
                                              laden: ship['ladenSpeed'],
                                              ballast: ship['ballastSpeed'],
                                              economic: ship['ecoSpeed'],
                                              consumption_at_sea_L: ship['consumptionL'],
                                              consumption_at_sea_B: ship['consumptionB'],
                                              eco_consumption_L: ship['consupmtionEcoL'],
                                              marine_diesel_oil_at_sea: ship['mdoAtSea'],
                                              marine_gasoline_oil_at_sea: ship['mgoAtSea'],
                                              consumption_in_port_Working: ship['inPortWorking'],
                                              consumption_in_port_Idle: ship['inPortIdle'],
                                              marine_diesel_in_port: ship['mdoInPort'],
                                              marine_gasoline_oil_in_port: ship['mgoInPort'],
                                              number_of_cranes: ship['cranes'],
                                              crane_capacity: ship['craneCapacity'],
                                              combined_crane_capacity: ship['combinedCraneCapacity'],
                                              aussie_holds_ladders?: return_boolean(ship['aussieHoldsLadders']),
                                              CO2_system_on_board?: return_boolean(ship['co2Fitted']),
                                              twenty_foot_equivalent_unit?: return_boolean(ship['twentyfootEquivalentUnits']),
                                              lakes_fitted?: return_boolean(ship['lakesFitted']),
                                              log_fitted?: return_boolean(ship['logFitted']),
                                              grabber?: return_boolean(ship['grabs']),
                                              gearless?: return_boolean(ship['gearless']),
                                              double_hull?: return_boolean(ship['doubleHull']),
                                              imo_fitted?: return_boolean(ship['imoFitted']),
                                              appendix_B_fitted?: return_boolean(ship['appendixBFitted']),
                                              box_shaped_holds?: return_boolean(ship['boxShapedHolds']),
                                              cement_holes_fitted?: return_boolean(ship['cementHolesFitted']),
                                              marine_gasoline_oil?: return_boolean(ship['mgo']),
                                              ice_classed?: return_boolean(ship['iceClassed'])
                     }
             }

             vessel = UnitOfWork.instance.ship.get_by_name(@name.to_s)
             if vessel[:error].nil?
                 vessel[:value].update!(ship)
             else
                 # add the name of the ship once created
                 ship[:name] =  @name.to_s
                 Ship.create!(ship)

             end

             ### TODO delete this once the shipment done
             # The ship object in this loop also contains the open port and open date, so after updating the ship info,
             # we can can create a json file containing the open port and date for each ship
             unless (ship['openPort'].nil? or ship['openDate'].nil?)
                 open_port_open_date_for_ships = {:vessel_name => @name.to_s.downcase,
                                                  :open_port => ship['openPort'].to_s.downcase,
                                                  :open_date => ship['openDate'].to_s}

                 temp_hash[:data].push(open_port_open_date_for_ships)
             end

         rescue => e
             temp_hash[:error].push(e.message + ' for vessel: ' + @name.to_s)
         end
     end
     return temp_hash
 end

  ### TODO delete this once the shipment done
  def store_shipment_file_in_app(object)
    File.open('app/assets/javascripts/json/shipments.json', 'w') do |f|
      f.write(object.to_json)
    end
  end

=begin
  def update_port_db
    begin
      tempHash = {}
      open_json_ports_file = File.open(Rails.root.join('public', 'port_data.json'))
      read_file = open_json_ports_file.read
      hash_object = JSON.parse(read_file)
      error_for_ports = Array.new


      hash_object.each do |port|

        region, @name, latitude, longitude = port['region'].to_s, port['portNames'].to_s, port['latitudeDecimal'].to_f,
            port['longitudeDecimal'].to_f

        # create a hash for alternative port name. Alternative port name are in the same file as port info, so we can do this here.
        # The key is the alt. name. So for shipments, we will look at the hash file to find the real name of the port (the value)

        alternative_port_names_array = port['alternatePortNames'].to_s.split(",")

        unless alternative_port_names_array.empty?
          alternative_port_names_array.each do |alt_name|
            tempHash[alt_name.to_s.strip.downcase] = @name.to_s.downcase
          end
        end
        tempHash[@name.to_s.strip.downcase] = @name.to_s.downcase           #add also the real name of the port to map to itself



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
  end
=end

=begin
  def update_ship_db
    Shipment.destroy_all
    open_json_temp_file = File.open(Rails.root.join('public', 'temp.json'))    # Read the json file containing the alternative port names
    read_port_names_file = open_json_temp_file.read
    hash_port_names_object = JSON.parse(read_port_names_file)
    open_json_ships_file = File.open(Rails.root.join('public', 'ship_data.json'))
    read_file = open_json_ships_file.read
    hash_object = JSON.parse(read_file)
    error_for_ships = Array.new
    begin
      hash_object.each do |ship|

        @name, deadweight, deadweight_cargo_capacity, vessel_type = ship['motorVessel'], ship['deadweight'], ship['deadweightCargoCapacity'],
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
        port_name = ship['openPort'].to_s.downcase
        open_port = hash_port_names_object[ship['openPort'].to_s.strip.downcase]        # Look for the port where this ship is supposed to be
        port = Port.find_by_name(open_port)
        vessel = Ship.find_by_name(ship['motorVessel'].to_s.downcase)
        # We then get the open date
        # Since we might not have the open port, we store the name
        if (hash_port_names_object[ship['openPort'].to_s.strip.downcase].nil?)
          error_for_ships << "This open port is not in the port database for port name nor alternative port name --> " + ship['openPort'].to_s
        end
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
=end

  def update_broker
#    Broker.destroy_all
    begin
      all_shipments = Shipment.all
      andrey = Broker.find_by(username: 'Andrey')
      if (andrey.nil?)
        Broker.create!(username: "Andrey", password: "lightshipusa",
                       email: "brokers@noemail.com", shipments: all_shipments, website:"www.theshipnetwork.com",
                       telephone:"+1(555)555-5555", country:"Canada", city:"Montreal")
      else
        andrey.shipments = all_shipments
      end
    rescue => e
      puts "#{e.message} for broker Andrey"
    end

  end

  def require_admin_authentication
    unless current_broker.try(:admin?)
      redirect_to root_path                    #if a broker tries to view an admin page/action, they will be redirected to the main page.
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

    ### ============================================ private ================================================
    private

  # :param [String]
  # :return [Int]
    def convert_vessel_type(vessel_type)
        temp = 0
        case vessel_type

            when 'SDBC'
                temp = 1
            when 'OHBS'
                temp = 2
            when 'MPP'
                temp = 3
            when 'TWEEN'
                temp = 4
            when 'RORO'
                temp = 5
        end
        temp
    end

  # :param [String]
  # :return [Int]
    def convert_category_name(dwt)
        case dwt
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
        category_name
    end
end