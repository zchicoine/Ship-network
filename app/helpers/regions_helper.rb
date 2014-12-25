module RegionsHelper

    def get_region_names
        Region.instance.all.values
    end
    # @return all the region names with their keys
    # these keys will be used when frontend call backend.

    def get_region_names_with_keys
        Region.instance.all
    end

    def regions_names_coordinates
        Region.instance.all_with_coordinates
    end
    def display_region_name(name)
        Region.instance.all[name]
    end


end
