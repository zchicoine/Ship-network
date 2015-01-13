# this class will have special query that involved ShipDetail table
class ShipDetailBLL < ShipDetail
    extend CustomQuery
    # get all info about ship_details
    def get_ship_detail(ship_name)
       result  = ShipDetailBLL.joins(:ship).where("ships.name" => ship_name).execute_query 1

        unless result.blank?
            return {value: result, error: nil}
        else
            return {value: 0, error: "Error: Ship name: #{ship_name} does not exist on the system. "}
        end
    end
    # @param
    # column_names: an array of column names
    def get_ship_detail_with_specific_column(ship_name,column_names)
        result  = ShipDetailBLL.joins(:ship).query_select_parameters(column_names).where("ships.name" => ship_name).execute_query 1

        unless result.blank?
            return {value: result, error: nil}
        else
            return {value: 0, error: "Error: Ship name: #{ship_name} does not exist on the system. "}
        end
    end
end