class ShipmentBLL < Shipment
    require_relative 'PortBLL'
    # this class will have special query that involved shipment table


    # the format return
    # return hash {value: result/0 and error: nil/message}
    #result = ["region name", latitude,longitude ]=>shipNumber
    def get_name_And_coordinates_of_Ports_and_number_of_ship_per_Region region_name = "null"

        result =  PortBLL.joins(:shipments).query_at_a_region(region_name).group(:name, :latitude, :longitude).count

         unless result.blank?
             return {value: result, error: nil}
         else
             return {value: 0, error: "Error: either #{region_name } has no ports or it does not support by the system"}
         end
    end


end