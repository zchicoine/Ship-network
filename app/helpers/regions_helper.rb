module RegionsHelper

    def get_region_names
        Region::all
    end

    def regions_names_coordinates
        Region::all_with_coordinates
    end


end
