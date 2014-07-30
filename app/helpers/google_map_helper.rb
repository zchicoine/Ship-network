=begin
    This file is to provide functions that Google map API will use.

=end

module GoogleMapHelper


    def get_ship_information ship_name = "null", port_name = "null"
        @port_id_info = Port.find_by_name(port_name).id
        @ship_info = Ship.includes(:shipments).find_by_name(ship_name)
        @ship_id_info = @ship_info.id

           @ship_info_array = [@ship_info.vessel_category, @ship_info[:deadweight], port_name]
                              # @open_date_info = [@ship_info.shipments.find_by(port_id: @port_id_info).open_start_date,
                                               #   @ship_info.shipments.find_by(port_id: @port_id_info).open_end_date]


    end

    def get_ship_details ship_name = "null"
        @ship_id = Ship.find_by_name(ship_name).id
        @return_ship_details = ShipDetail.find_by(ship_id: @ship_id)
    end

end




