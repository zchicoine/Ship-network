module SideBarHelper



    def vessel_classes
        Ship.vessel_categories.keys[1..7]
    end

    def regions_names_coordinates
        Region::all_with_coordinates
    end


    # return ship number by classes
    def ships_at_region_based_on_vessel_classes region_name, region_coordinates

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

    def get_number_of_ships_per_region_for_all_class region_name

    end
    def get_total_deadweight_for_total_ships
        result =  UnitOfWork.instance.ship.get_total_deadwieght_of_ships
        if result[:error].nil?
            return result[:value]
        end
    end

end