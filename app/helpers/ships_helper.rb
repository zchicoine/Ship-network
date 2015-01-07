module ShipsHelper

    def vessel_classes
        ShipBLL::get_categories_as_hash_string.values
    end

    def get_vessel_category_name(number)
        ShipBLL::get_categories_as_hash_string[Ship.vessel_categories.keys[number]]
    end

    def get_vessel_type_name(number)
        if(number == 0)
            return nil
        end
        ShipBLL.vessel_types.keys[number].upcase
    end
end