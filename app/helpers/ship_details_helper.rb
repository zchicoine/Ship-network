module ShipDetailsHelper
    # the general info attributes based on blue column of the Ship database sheet
    def get_ship_details_general_info(ship_name)
        column_name = ['ships.deadweight','ships.deadweight_cargo_capacity','ship_details.draft', 'ship_details.built',
                  'ships.vessel_type', 'ship_details.tons_per_centimeter', 'ship_details.flag','ships.vessel_category',
                  'ship_details.length_over_all', 'ship_details.beam', 'ship_details.holds', 'ship_details.hatches',
                  'ship_details.gross_registered_tonnage', 'ship_details.net_registered_tonnage']

        result = UnitOfWork.instance.ship_detail.get_ship_detail_with_specific_column(ship_name,column_name)
        if(result[:error].nil?)
            return result[:value]
        end
    end


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
end