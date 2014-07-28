=begin
    This file is to provide functions that Google map API will use.

=end

module GoogleMapHelper


    def get_ports quantity = 10, region = "all"
        # check the type.
        unless quantity.is_a?(Integer) && region.is_a?(String)
            "Error: Expected integer and String."
        end
        # check if region is equal all
        if region.eql?("all")
            @ports_coordinate = Port.select(:latitude, :longitude).take(quantity)
        else

             @ports_coordinate = Port.select(:latitude , :longitude).where(region: region).take(quantity)
        end

        # convert to an array
        @ports_coordinate = @ports_coordinate.map { |l| [l.latitude, l.longitude] }
    end

    def get_total_deadweight_for_total_ships
        @total_deadweight= Ship.sum(:deadweight)
    end
    def get_total_number_of_ship
        Ship.all.size
    end
    def get_number_of_ships_per_class category_name
      @ships_per_class = Ship.select(:vessel_category).where(vessel_category: category_name).size
    end

    def get_number_of_ships_per_region region_name
      @ships_per_region = Port.includes(:ships).where(region: region_name)
      @ship_count = 0
      @ships_per_region.each do |port|
        @ship_count += port.ships.size
      end
      @ship_count
    end

    def get_number_of_ships_per_region_per_class region_name , category_name
        @ships_per_region = Port.includes(:ships).where(region: region_name)
        @ship_count = 0
        @ships_per_region.each do |port|
            @ship_count += port.ships.where(vessel_category: category_name).size
        end
        @ship_count
    end

    def get_number_of_ports_per_region region_name
      @ports_per_region = Port.where(region: region_name).size
    end

    def get_number_ships_at_specific_port port_name = "null"
        get_all_ships_at_specific_port([0,0],  port_name).size
    end
    def get_all_ships_at_specific_port port_coordinate = [0, 0], port_name ="null"

        if (!port_name.blank? && !port_coordinate.empty?)
            _port = Port.includes(:ships)
            _port = _port.find_by(name: port_name) ||
                _port.find_by(latitude: port_coordinate[0],
                              longitude: port_coordinate[1])
        else
            "the parameters invalid"
        end
        unless _port.nil?
            # extract the information depended on the user level of access
           # @ship_array = _port.ships.all.map { |var| [var.name, var.built, var.vessel_type] }
            @ship_array = _port.ships.all

        else
            "Either the parameters invalid or the port does not exist in the system."
        end
    end

    def get_ship_information ship_name = "null", port_name = "null"
        @port_id_info = Port.find_by_name(port_name).id
        @ship_info = Ship.includes(:shipments).find_by_name(ship_name)
        @ship_id_info = @ship_info.id

           @ship_info_array = [@ship_info.vessel_category, @ship_info[:deadweight], port_name]
                              # @open_date_info = [@ship_info.shipments.find_by(port_id: @port_id_info).open_start_date,
                                               #   @ship_info.shipments.find_by(port_id: @port_id_info).open_end_date]


    end

    def get_name_of_ports_and_coordinates_per_region region_name = "null"
      @name_of_ports_per_region = Port.select(:name, :latitude, :longitude).where(region: region_name)
    end

    # the format return
    #["region name", latitude,longitude ]=>shipNumber
    def get_nameAndCoordinatesOfPorts_and_shipNumber_perRegion region_name = "null"
        @name_of_ports_per_region = Port.joins(:shipments).where(region: region_name).group(:name, :latitude, :longitude).size
    end

    def get_ship_details ship_name = "null"
        @ship_id = Ship.find_by_name(ship_name).id
        @return_ship_details = ShipDetail.find_by(ship_id: @ship_id)
    end

end




