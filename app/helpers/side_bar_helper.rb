module SideBarHelper



    def vessel_classes
        Ship.vessel_categories.keys[1..7]
    end

    def regions_names_coordinates
        Region::all_with_coordinates
    end


    def get_number_of_ships_per_region region_name
        result =   UnitOfWork.instance.ship.get_number_of_ships_per_region region_name
        if result[:error].nil?
            return result[:value]
        end
    end
    # return
    def get_number_of_ships_for_all_category
      result =   UnitOfWork.instance.ship.get_number_of_ships_for_all_categories
        if result[:error].nil?
            return result[:value]
        end
    end


    def get_number_of_ships_for_all_regions
        result =  UnitOfWork.instance.ship.get_number_of_ships_for_all_regions
        if result[:error].nil?
            return result[:value]
        end

    end

    def get_number_of_ships_per_region_for_all_category region_name
        result =  UnitOfWork.instance.ship.get_number_of_ships_per_region_for_all_category region_name
        if result[:error].nil?
            return result[:value]
        end
    end
    def get_total_deadweight_for_total_ships
        result =  UnitOfWork.instance.ship.get_total_deadweight_of_ships
        if result[:error].nil?
            return result[:value]
        end
    end

    def get_total_deadweight_for_total_ships_per_region region_name
      result = UnitOfWork.instance.ship.get_deadweight_of_ships_per_region region_name
      if result[:error].nil?
        return result[:value]
      end
    end

    #not query methods
    def get_vessel_category_number name
        Ship.vessel_categories[name]
    end

    def get_vessel_category_name number
        Ship.vessel_categories.keys[number]
    end


end