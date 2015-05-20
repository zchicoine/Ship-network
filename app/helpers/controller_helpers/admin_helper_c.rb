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

  ### TODO delete this once the shipment done
  def store_shipment_file_in_app(object)
    File.open('app/assets/javascripts/json/shipments.json', 'w') do |f|
      f.write(object.to_json)
    end
  end

  def require_admin_authentication
    unless current_broker.try(:admin?)
      redirect_to root_path                    #if a broker tries to view an admin_helpers page/action, they will be redirected to the main page.
    end
  end


end