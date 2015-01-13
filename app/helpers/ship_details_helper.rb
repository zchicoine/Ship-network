module ShipDetailsHelper
    included ShipsHelper

    # the general info attributes based on blue column of the Ship database sheet
    def get_ship_details_general_info(ship_name)
        column_name = ['ships.deadweight','ships.deadweight_cargo_capacity',:draft, :built,
                  'ships.vessel_type', :tons_per_centimeter, 'ship_details.flag','ships.vessel_category',
                  :length_over_all, :beam, :holds, :hatches,
                  :gross_registered_tonnage, :net_registered_tonnage]

        result = UnitOfWork.instance.ship_detail.get_ship_detail_with_specific_column(ship_name,column_name)
        if(result[:error].nil?)
           value = result[:value]
           # get the vessel_category
           value[:vessel_category] =  get_vessel_category_name(value[:vessel_category])
           value[:vessel_type] =  get_vessel_type_name(value[:vessel_type])
            return value
        end
    end

    # the capacity attributes based on green column of the Ship database sheet
    def get_ship_details_capacity(ship_name)

        column_name = [:total_cubic_meters_GR, :total_cubic_meters_BL,
                       :total_cubic_feet_GR, :total_cubic_feet_BL]

        result = UnitOfWork.instance.ship_detail.get_ship_detail_with_specific_column(ship_name,column_name)
        if(result[:error].nil?)
            hash_is_nil = true
            result[:value].as_json.each do |k, v|
                unless v.blank? || v == 0
                    hash_is_nil = false
                end
            end
             return [result[:value], hash_is_nil]
        end
    end

    # the speed and consumption attributes based on red column of the Ship database sheet
    def get_ship_details_speed_and_consumption(ship_name)
        column_name = [:intermediate_fuel_oil_180?, :intermediate_fuel_oil_380?, :marine_diesel_oil?,
                       :marine_gasoline_oil?, :laden, :ballast, :economic, :consumption_at_sea_L, :consumption_at_sea_B,
                       :eco_consumption_L, :marine_diesel_oil_at_sea, :marine_gasoline_oil_at_sea, :consumption_in_port_Working,
                       :consumption_in_port_Idle, :marine_diesel_in_port, :marine_gasoline_oil_in_port]

        result = UnitOfWork.instance.ship_detail.get_ship_detail_with_specific_column(ship_name,column_name)
        if(result[:error].nil?)
            hash_is_nil = true
            result[:value].as_json.each do |k, v|
                unless v.blank? || v == 0
                    hash_is_nil = false
                end
            end
            return   [result[:value], hash_is_nil]
        end
    end
    # the Equipment, Fittings and Special Class attributes based on yellow column of the Ship database sheet
    def get_ship_details_EF_SC(ship_name)
        column_name = [:number_of_cranes, :crane_capacity, :combined_crane_capacity, :aussie_holds_ladders?,
                       :CO2_system_on_board?, :lakes_fitted?, :ice_classed?, :log_fitted?,
                       :twenty_foot_equivalent_unit?, :grabber?, :gearless?, :double_hull?,
                       :imo_fitted?, :appendix_B_fitted?, :box_shaped_holds?, :cement_holes_fitted?]

        result = UnitOfWork.instance.ship_detail.get_ship_detail_with_specific_column(ship_name,column_name)
        if(result[:error].nil?)
            hash_is_nil = true
            result[:value].as_json.each do |k, v|
                unless v.blank? || v == 0
                    hash_is_nil = false
                end
            end
            return   [result[:value], hash_is_nil]
        end
    end
end