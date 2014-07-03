module SideBarHelper


    def vessel_classes
        ['Capesize','Post-Panamax','Panamax','Supramax','Handymax','Handysize','Mini/MPP']
    end

    def regions_names_coordinates
        Region::all_with_coordinates
    end
    # parameters :
    # return ports name, coordinates
    def ports_at_region region_name, region_coordinates

    end


    # return ship number by classes
    def ships_at_region_based_on_vessel_classes region_name, region_coordinates

    end
end