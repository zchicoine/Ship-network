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
        @ship_details_first_table = Ship.joins(:ship_detail).select(:deadweight,:vessel_type,:deadweight_cargo_capacity,
                        'ship_details.draft', 'ship_details.built', 'ship_details.combined_crane_capacity', 'ship_details.crane_capacity',
                        'ship_details.number_of_cranes', 'ship_details.laden').where(name: ship_name).take

         @ship_details_first_table
    end

    def get_ship_details_second_table ship_name = "null"
      @ship_id_two = Ship.find_by_name(ship_name).id
      @return_ship_details_two = ShipDetail.select(:hatches, :gross_registered_tonnage, :net_registered_tonnage, :total_cubic_meters_GR,
                         :total_cubic_meters_BL, :total_cubic_feet_GR, :total_cubic_feet_BL, :intermediate_fuel_oil_180?, :intermediate_fuel_oil_380?,
                         :tons_per_centimeter, :length_over_all, :beam, :holds).find_by(ship_id: @ship_id_two)
      @hash_is_nil = true
      @return_ship_details_two.as_json.each do |k, v|
        unless v.blank? || v == 0
          @hash_is_nil = false
        end
      end

      @return_ship_details_table_two = [@return_ship_details_two, @hash_is_nil]
    end

    def get_ship_details_third_table ship_name = "null"
      @ship_id_two = Ship.find_by_name(ship_name).id
      @return_ship_details_three = ShipDetail.select(:marine_diesel_oil?, :ballast, :economic,
                                :consumption_at_sea_L, :consumption_at_sea_B, :eco_consumption_L, :marine_diesel_oil_at_sea, :marine_gasoline_oil_at_sea,
                                :consumption_in_port_Working, :consumption_in_port_Idle, :marine_diesel_in_port, :marine_gasoline_oil_in_port,
                                :marine_gasoline_oil?, :aussie_holds_ladders?, :CO2_system_on_board?, :twenty_foot_equivalent_unit?, :lakes_fitted?,
                                :ice_classed?, :log_fitted?, :grabber?, :gearless?, :double_hull?, :imo_fitted?, :appendix_B_fitted?, :box_shaped_holds?,
                                :cement_holes_fitted?).find_by(ship_id: @ship_id_two)
      @hash_is_nil = true
      @return_ship_details_three.as_json.each do |k, v|
      unless v.blank? || v == 0
        @hash_is_nil = false
      end
    end

    @return_ship_details_table_three = [@return_ship_details_three, @hash_is_nil]

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




