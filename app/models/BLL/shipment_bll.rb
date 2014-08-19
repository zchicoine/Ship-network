class ShipmentBLL < Shipment
    extend CustomQuery
    # this class will have special query that involved shipment table

    #get_shipCategory_deadweight_brokerName_openStartDate_and_endDate

        #  return {value: result/0, error: nil/message}
    def get_shipCategory_deadweight_brokerName_openStartDate_and_endDate ship_name = "", port_name = ""
        result = ShipBLL.joins(:ports, :shipments => [:brokers]).select("brokers.*",
                                "shipments.open_start_date","shipments.open_end_date",:deadweight_cargo_capacity, :deadweight,:vessel_category).where(
                                                    "ports.name" => port_name,name:ship_name).execute_query 1

        unless result.blank?
                coverted_to_ruby_hash = {broker_name: result[:username], broker_email: result[:email], deadweight_cargo_capacity: result[:deadweight_cargo_capacity], deadweight: result[:deadweight],open_start_date: result[:open_start_date],
                                         open_end_date:  result[:open_end_date], vessel_category: result[:vessel_category],
                                         ship_name:  ship_name ,  port_name:  port_name
                                        }
            return {value: coverted_to_ruby_hash, error: nil}
        else
            return {value: 0, error: "Error:  #{ship_name }  and  #{port_name} has no relationship "}
        end

    end


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