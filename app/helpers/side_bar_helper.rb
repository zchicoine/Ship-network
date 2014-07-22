module SideBarHelper


    def vessel_classes
        ['Capesize ','Post-Panamax','Panamax','Supramax','Handymax','Handysize','Mini-bulker']
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
    # return
    def get_number_of_ships_for_all_class
        ships_per_class = Port.joins(:ships).group(:vessel_class).size

    end

    def get_number_of_ships_for_all_regions
        ships_per_region = Port.joins(:ships).group(:region).size

    end

    def get_number_of_ships_per_region_for_all_class region_name
        ships_per_region_based_on_classes = Port.joins(:ships).where(region: region_name).group(:vessel_class).size

    end

end