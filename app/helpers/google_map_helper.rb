=begin
    This file is to provide functions that Google map API will use.

=end

module GoogleMapHelper


    def get_name_of_ports_and_coordinates_per_region region_name = "null"
        result =  UnitOfWork.instance.port.retrieve_name_and_coordinates_of_ports_per_region region_name
        if result[:error].nil?
            return result[:value]
        end
    end

    def get_ship_information ship_name = "null", port_name = "null"

    end

    def get_ship_details_first_table ship_name = "null"
        @ship_id = Ship.find_by_name(ship_name).id
        @return_ship_details = ShipDetail.select(:draft, :built, :tons_per_centimeter, :flag,
                                                 :classification_society, :length_over_all, :beam, :holds).find_by(ship_id: @ship_id)
    end

    def get_ship_details_second_table ship_name = "null"
      @ship_id_two = Ship.find_by_name(ship_name).id
      @return_ship_details_two = ShipDetail.select(:hatches, :gross_registered_tonnage, :net_registered_tonnage, :total_cubic_meters_GR,
                         :total_cubic_meters_BL, :total_cubic_feet_GR, :total_cubic_feet_BL, :intermediate_fuel_oil_180?, :intermediate_fuel_oil_380?).find_by(ship_id: @ship_id)
    end

    # To make just one query to the database

    #def get_ship_details_first_table ship_name = "null"
     # @ship_id = Ship.find_by_name(ship_name).id
      #@all_ship_details = ShipDetail.find_by(ship_id: @ship_id)
      #@return_ship_details_table_one = @all_ship_details.pluck(:draft, :built, :tons_per_centimeter, :flag,
       #                                        :classification_society, :length_over_all, :beam, :holds)

      #@return_ship_details_table_two = @all_ship_details.select(:hatches, :gross_registered_tonnage, :net_registered_tonnage, :total_cubic_meters_GR,
                                                 #:total_cubic_meters_BL, :total_cubic_feet_GR, :total_cubic_feet_BL, :intermediate_fuel_oil_180?, :intermediate_fuel_oil_380?)

      #@table_details_array = [@return_ship_details_table_one, @return_ship_details_table_two]
   # end



end




