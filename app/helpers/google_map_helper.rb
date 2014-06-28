=begin
    This file is to provide functions that Google map API will use.

=end

module GoogleMapHelper


    def get_ports quantity = 100, region = "all"
        # check the type.
        unless quantity.is_a?(Integer) && region.is_a?(String)
            "Error: Expected integer and String."
        end
        # check if region is equal all
        if region.eql?("all")
            @ports_coordinate = Port.select(:latitude, :longitude).take(quantity)
        else

            # @ports_coordinate = Port.select(:latitude_coordinate , :longitude_coordinate)
        end

        # convert to an array
        @ports_coordinate = @ports_coordinate.map { |l| [l.latitude, l.longitude] }
    end


    def all_ships_at_specific_port port_coordinate = [0, 0], port_name ="null"

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
            ship_array = _port.ships.all.map { |var| [var.name, var.built, var.vessel_type] }
            ship_array

        else
            "Either the parameters invalid or the port does not exist in the system."
        end


    end

    private

end
