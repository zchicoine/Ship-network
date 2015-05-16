# TODO review this file and delete unnecessary comments and code


=begin
    This file is to provide functions that Google google_map API will use.

=end
module GoogleMapHelper



    # this function has to change, for now I will over ride them

    # def get_name_of_ports_and_coordinates_per_region region_name = "null"
    #     result =  UnitOfWork.instance.port.retrieve_name_and_coordinates_of_ports_per_region region_name
    #     if result[:error].nil?
    #         return result[:value]
    #     end
    # end

    def get_name_of_ports_and_coordinates_per_region region_name = "null"
        result =  UnitOfWork.instance.shipment.get_name_and_coordinates_of_Ports_that_has_ships_per_Region region_name
        if result[:error].nil?
            return result[:value]
        end
    end


    #
    # def get_ship_details_blue_table ship_name = "null"
    #     @ship_details_first_table = Ship.joins(:ship_detail).select(:deadweight,:deadweight_cargo_capacity,'ship_details.draft',
    #                     'ship_details.built', :vessel_type, 'ship_details.tons_per_centimeter', 'ship_details.flag',:vessel_category,
    #                     'ship_details.length_over_all', 'ship_details.beam', 'ship_details.holds', 'ship_details.hatches',
    #                     'ship_details.gross_registered_tonnage', 'ship_details.net_registered_tonnage').where(name: ship_name).take
    # end
    #
    # def get_ship_details_green_table ship_name = "null"
    #   @ship_id_two = Ship.find_by_name(ship_name).id
    #   @return_ship_details_two = ShipDetail.select(:total_cubic_meters_GR, :total_cubic_meters_BL, :total_cubic_feet_GR,
    #                                                                             :total_cubic_feet_BL).find_by(ship_id: @ship_id_two)
    #   @hash_is_nil = true
    #   @return_ship_details_two.as_json.each do |k, v|
    #     unless v.blank? || v == 0
    #       @hash_is_nil = false
    #     end
    #   end
    #
    #   @return_ship_details_table_two = [@return_ship_details_two, @hash_is_nil]
    # end
    #
    # def get_ship_details_red_table ship_name = "null"
    #   @ship_id_two = Ship.find_by_name(ship_name).id
    #   @return_ship_details_two = ShipDetail.select(:intermediate_fuel_oil_180?, :intermediate_fuel_oil_380?,
    #                     :marine_diesel_oil?, :marine_gasoline_oil?, :laden, :ballast, :economic, :consumption_at_sea_L, :consumption_at_sea_B,
    #                     :eco_consumption_L, :marine_diesel_oil_at_sea, :marine_gasoline_oil_at_sea, :consumption_in_port_Working,
    #                     :consumption_in_port_Idle, :marine_diesel_in_port, :marine_gasoline_oil_in_port).find_by(ship_id: @ship_id_two)
    #   @hash_is_nil = true
    #   @return_ship_details_two.as_json.each do |k, v|
    #     unless v.blank? || v == 0
    #       @hash_is_nil = false
    #     end
    #   end
    #
    #   @return_ship_details_table_red = [@return_ship_details_two, @hash_is_nil]
    # end
    #
    # def get_ship_details_yellow_table ship_name = "null"
    #   @ship_id_two = Ship.find_by_name(ship_name).id
    #   @return_ship_details_three = ShipDetail.select(:number_of_cranes, :crane_capacity, :combined_crane_capacity, :aussie_holds_ladders?,
    #                             :CO2_system_on_board?, :lakes_fitted?, :ice_classed?, :log_fitted?,  :twenty_foot_equivalent_unit?, :grabber?,
    #                             :gearless?, :double_hull?, :imo_fitted?, :appendix_B_fitted?, :box_shaped_holds?, :cement_holes_fitted?
    #                             ).find_by(ship_id: @ship_id_two)
    #   @hash_is_nil = true
    #   @return_ship_details_three.as_json.each do |k, v|
    #   unless v.blank? || v == 0
    #     @hash_is_nil = false
    #   end
    # end
    #
    # @return_ship_details_table_three = [@return_ship_details_three, @hash_is_nil]
    #
    # end


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




