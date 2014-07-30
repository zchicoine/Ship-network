class ShipmentBLL < Shipment
    extend CustomQuery
    # this class will have special query that involved shipment table




    def get_ship_category_deadweight_open_start_and_end_date ship_name = "", port_name = ""
        result = ShipBLL.joins(:shipments,:ports).select(
                                "shipments.open_start_date","shipments.open_end_date",:deadweight,:vessel_category).where(
                                                    "ports.name" => port_name,name:ship_name).execute_query

        unless result.blank?
            return {value: result, error: nil}
        else
            return {value: 0, error: "Error:  #{ship_name }  and  #{port_name} has no relationship "}
        end

    end


    # the format return
    # return hash {value: result/0 and error: nil/message}
    #result = ["region name", latitude,longitude ]=>shipNumber
    def get_name_And_coordinates_of_Ports_and_number_of_ship_per_Region region_name = "null"

        result =  Port.joins(:shipments).query_at_a_region(region_name).group(:name, :latitude, :longitude).count

         unless result.blank?
             return {value: result, error: nil}
         else
             return {value: 0, error: "Error: either #{region_name } has no ports or it does not support by the system"}
         end
    end


end