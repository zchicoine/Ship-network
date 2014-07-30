module SideBarHelper


    def vessel_classes
        ['Capesize ','Post-Panamax','Panamax','Supramax','Handymax','Handysize','Mini-bulker']
    end

    def regions_names_coordinates
        Region::all_with_coordinates
    end


    # return ship number by classes
    def ships_at_region_based_on_vessel_classes region_name, region_coordinates

    end
    # return
    def get_number_of_ships_for_all_class


    end

    def get_number_of_ships_for_all_regions


    end

    def get_number_of_ships_per_region_for_all_class region_name

    end

end