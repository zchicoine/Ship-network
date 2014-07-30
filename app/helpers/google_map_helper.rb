=begin
    This file is to provide functions that Google map API will use.

=end

module GoogleMapHelper


    def get_ship_information ship_name = "null", port_name = "null"

    end

    def get_ship_details ship_name = "null"
        @ship_id = Ship.find_by_name(ship_name).id
        @return_ship_details = ShipDetail.find_by(ship_id: @ship_id)
    end

end




