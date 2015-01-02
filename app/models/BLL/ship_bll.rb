
class ShipBLL < Ship

    extend CustomQuery
    extend LocalizationHelper

    # return hash {value: result/0 and error: nil/message}
    def retrieve_a_ship ship_name = ""

        unless ship_name.blank?
            # take method return an array with one object only
            result =  Ship.where(name: ship_name).take(1)[0]
            unless result.blank?
                return {value: result, error: nil}
            else
                return {value: 0, error: "Error: ship name #{ship_name} does not exist"}
            end
        else
            return {value: 0, error: "Error:  the parameters invalid"}
        end



    end


    # return hash {value: result/0 and error: nil/message}
    def get_number_of_ships_for_all_categories

        result = Port.joins(:ships).group(:vessel_category).count
        unless result.nil?
            return {value: result, error: nil}
        else
            return {value: {}, error: "Error: calculate the number of ships for all categories."}
        end

    end
    # return hash {value: result/0 and error: nil/message}
    # each ship count only once
    def get_number_of_ships_count_once_for_all_categories

        result = Port.joins(:ships).group(:vessel_category).distinct.count(:ship_id)
        unless result.nil?
            return {value: result, error: nil}
        else
            return {value: {}, error: "Error: calculate the number of ships for all categories."}
        end

    end

    # return hash {value: result/0 and error: nil/message}
    def get_number_of_ships_for_all_regions

        result =Port.joins(:ships).group(:region).count
        unless result.nil?
            return {value: result, error: nil}
        else
            return {value: {}, error: "Error: calculate the number of ships for all regions."}
        end

    end

    # each ship count only once
    # return hash {value: result/0 and error: nil/message}
    def get_number_of_ships_count_once_for_all_regions

        result =Port.joins(:ships).group(:region).distinct.count(:ship_id)
        unless result.nil?
            return {value: result, error: nil}
        else
            return {value: {}, error: "Error: calculate the number of ships for all regions."}
        end

    end

    # return hash {value: result/0 and error: nil/message}
    def get_total_number_of_ships

        result =   Ship.count
        if result.nil? or result <= 0
            return {value: 0, error: "Error: calculate number of ships."}
        else
            return {value: result, error: nil}
        end
    end

    # return hash {value: result/0 and error: nil/message}
    def get_total_deadweight_of_ships

        result =   PortBLL.joins(:ships).sum(:deadweight)
        if result.nil? or result <= 0
            return {value: 0, error: "Error: calculate the total deadwieght."}
        else
            return {value: result, error: nil}
        end

    end


    # return hash {value: result/0 and error: nil/message}
    def get_number_of_ships_per_category category_name = ""

        number = Ship.vessel_categories[category_name]

        unless number.blank?
            result = Ship.where(vessel_category: number).count
        else
            return {value: 0, error: "#{category_name} does not exist in the system"}
        end

        unless number.nonzero?.nil?
            return {value: result, error: nil}
        else
            return {value: 0, error: "Error: There is no ship has category '#{category_name }'in the database."}
        end
    end

    # return hash {value: result/0 and error: nil/message}
    def get_deadweight_of_ships_per_region region_name = ""

        result = PortBLL.joins(:ships).query_at_a_region(region_name).sum(:deadweight)

        if result.nil? or result <= 0
            return {value: 0, error: "Error: either #{region_name } has no ships or it does not support by the system"}
        else
            return {value: result, error: nil}

        end
    end
    # return hash {value: result/0 and error: nil/message}
    def get_number_of_ships_per_region region_name = ""

        result = PortBLL.joins(:ships).query_at_a_region(region_name).count

        if result.nil? or result <= 0
            return {value: 0, error: "Error: either #{region_name } has no ships or it does not support by the system"}
        else
            return {value: result, error: nil}

        end


    end
    # return hash {value: result/0 and error: nil/message}
    def get_number_of_ships_count_once_per_region region_name = ""

        result = PortBLL.joins(:ships).query_at_a_region(region_name).distinct.count(:ship_id)

        if result.nil? or result <= 0
            return {value: 0, error: "Error: either #{region_name } has no ships or it does not support by the system"}
        else
            return {value: result, error: nil}

        end


    end

    def get_number_of_ships_per_region_for_all_category region_name = ""

        result = PortBLL.joins(:ships).query_at_a_region(region_name).group(:vessel_category).count

        if result.nil?
            return {value: 0, error: "Error: either #{region_name } has no ships or it does not support by the system"}
        else
            return {value: result, error: nil}

        end


    end
    # each ship count only once
    # return hash {value: result/0 and error: nil/message}
    def get_number_of_ships_count_once_per_region_for_all_category region_name = ""

        result = PortBLL.joins(:ships).query_at_a_region(region_name).group(:vessel_category).distinct.count(:ship_id)

        if result.nil?
            return {value: 0, error: "Error: either #{region_name } has no ships or it does not support by the system"}
        else
            return {value: result, error: nil}

        end


    end

    # return hash {value: result/0 and error: nil/message}
    def get_all_ships_at_specific_port port_name = ""

        unless port_name.blank?
            result = query_ships_at_a_port port_name

            unless result.blank?
                return {value: result, error: nil}
            else
                return {value: 0, error: "Error: #{port_name} has no ships"}
            end

        else
            return {value: 0, error: "Error:  the parameters invalid"}

        end

    end

    # return hash {value: result/0 and error: nil/message}
    def get_number_ships_at_specific_port port_name = ""

        unless port_name.blank?
            result = query_ships_at_a_port(port_name).count

            if result > 0
                return {value: result, error: nil}
            else
                return {value: 0, error: "Error: #{port_name} has no ships"}
            end

        else
            return {value: 0, error: "Error:  the parameters invalid"}

        end
    end

    # return hash {value: result/0 and error: nil/message}
    def get_number_of_ships_per_region_per_category region_name = "" , category_name = ""

        unless region_name.blank? and category_name.blank?
            category_id = Ship.vessel_categories[category_name]
            unless category_id.blank?
                result = Ship.joins(:ports).where("ports.region" => region_name.downcase, vessel_category:category_id).count
                if result > 0
                    return {value: result, error: nil}
                else
                    return {value: 0, error: "Error: no ship at #{region_name} with #{category_name} category exist"}
                end
            else
                return {value: 0, error: "Error: There is no ship has category '#{category_name }'in the database."}

            end
        end

    end

    # in this section, helper functions will be add

    # pass the (number) of category based on enum define in Ship class.
    # return user friendly  string array
    def self.get_categories_as_hash_string

        categories = Hash.new

        categories['MiniBulker']  = locales_CEW.miniBulker
        categories['Handysize']   = locales_CEW.handysize
        categories['Handymax' ]   = locales_CEW.handymax
        categories['Supramax']    = locales_CEW.supramax
        categories['Panamax']     = locales_CEW.panamax
        categories['PostPanamax'] = locales_CEW.postPanamax
        categories['Capesize']    = locales_CEW.capesize

        categories
    end
    # end of helper functions

    # in this section, we will define methods that only return rails query
    # begin of query section
    def query_ships_at_a_port port_name
        Ship.joins(:ports).where("ports.name" => port_name)
    end

    def query_ship_joins_ports
        Ship.joins(:ports)
    end
    # end of query section
end
