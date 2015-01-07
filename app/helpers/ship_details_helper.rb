module ShipDetailsHelper
    included ShipsHelper

    # the general info attributes based on blue column of the Ship database sheet
    def get_ship_details_general_info(ship_name)
        column_name = ['ships.deadweight','ships.deadweight_cargo_capacity','ship_details.draft', 'ship_details.built',
                  'ships.vessel_type', 'ship_details.tons_per_centimeter', 'ship_details.flag','ships.vessel_category',
                  'ship_details.length_over_all', 'ship_details.beam', 'ship_details.holds', 'ship_details.hatches',
                  'ship_details.gross_registered_tonnage', 'ship_details.net_registered_tonnage']

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

        column_name = ['ship_details.total_cubic_meters_GR', 'ship_details.total_cubic_meters_BL',
                       'ship_details.total_cubic_feet_GR', 'ship_details.total_cubic_feet_BL']

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
        column_name = ["ship_details.'intermediate_fuel_oil_180?'", "ship_details.'intermediate_fuel_oil_380?'", "ship_details.'marine_diesel_oil?'",
                       "ship_details.'marine_gasoline_oil?'", 'ship_details.laden', 'ship_details.ballast', 'ship_details.economic',
                       'ship_details.consumption_at_sea_L', 'ship_details.consumption_at_sea_B', 'ship_details.eco_consumption_L',
                       'ship_details.marine_diesel_oil_at_sea', 'ship_details.marine_gasoline_oil_at_sea', 'ship_details.consumption_in_port_Working',
                       'ship_details.consumption_in_port_Idle', 'ship_details.marine_diesel_in_port', 'ship_details.marine_gasoline_oil_in_port']

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
        column_name = ['ship_details.number_of_cranes', 'ship_details.crane_capacity', 'ship_details.combined_crane_capacity', "ship_details.'aussie_holds_ladders?'",
                       "ship_details.'CO2_system_on_board?'", "ship_details.'lakes_fitted?'", "ship_details.'ice_classed?'", "ship_details.'log_fitted?'",
                       "ship_details.'twenty_foot_equivalent_unit?'", "ship_details.'grabber?'", "ship_details.'gearless?'", "ship_details.'double_hull?'",
                       "ship_details.'imo_fitted?'", "ship_details.'appendix_B_fitted?'", "ship_details.'box_shaped_holds?'", "ship_details.'cement_holes_fitted?'"]

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