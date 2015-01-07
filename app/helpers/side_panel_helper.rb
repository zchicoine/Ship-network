module SidePanelHelper
    included ShipsHelper


    def get_number_of_ships_globally
        result =  UnitOfWork.instance.shipment.get_total_number_of_ships_count_once
        return result[:value] if result[:error].nil?
    end

    def get_number_of_ships_per_region(region_name)
        result = UnitOfWork.instance.ship.get_number_of_ships_count_once_per_region(region_name)
        return result[:value] if result[:error].nil?
    end


    # return a hash {categories_name, number}
    def get_number_of_ships_for_all_categories
      result =   UnitOfWork.instance.ship.get_number_of_ships_count_once_for_all_categories
        if result[:error].nil?
            # initialize values as a hash
            values = Hash.new
            Ship.vessel_categories.except(:No_Type).each do |key, value|
                readable_key = ShipBLL::get_categories_as_hash_string[key]
                values[readable_key] = result[:value][value] || 0
            end
            return values

        end
    end

    def get_number_of_ships_for_all_regions
        result =  UnitOfWork.instance.ship.get_number_of_ships_count_once_for_all_regions
        if result[:error].nil?

            values = Hash.new
            Region.instance.all.each do |key, display_name|
                values[display_name] = result[:value][key.downcase] || 0
            end
            return values

        end

    end

    def get_number_of_ships_per_region_for_all_category(region_name)
        result = UnitOfWork.instance.ship.get_number_of_ships_count_once_per_region_for_all_category(region_name)
        if result[:error].nil?
            # initialize values as a hash
            values = Hash.new
            Ship.vessel_categories.except(:No_Type).each do |key, value|
                readable_key = ShipBLL::get_categories_as_hash_string[key]
                values[readable_key] = result[:value][value] || 0
            end
            return values

        end
    end
    def get_total_deadweight_for_total_ships
        result =  UnitOfWork.instance.ship.get_total_deadweight_of_ships
        return result[:value] if result[:error].nil?
    end

    def get_total_deadweight_for_total_ships_per_region(region_name)
        result = UnitOfWork.instance.ship.get_deadweight_of_ships_per_region region_name
        if result[:error].nil?
            return result[:value]
        end
    end



end