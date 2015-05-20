
    class PortBLL < Port
        extend CustomQuery


        # :param port name
        # :return hash {value: result/0 and error: nil/message}
        def by_name(port_name)
            port_name
           result =   Port.find_by(name: port_name.downcase)
            unless result.blank?
                return {value: result, error: nil}
            else
                return {value: 0, error: "Error: port name: #{port_name } does not exist"}
            end
        end

        # return hash {value: result/0 and error: nil/message}
        def retrieve_ports_at_a_region region = ""
           result =  PortBLL.query_at_a_region region
            unless result.blank?
                return {value: result, error: nil}
            else
                return {value: 0, error: "Error: either #{region_name } has no ports or it does not support by the system"}
            end
        end


        # return hash {value: result/0 and error: nil/message}
        def retrieve_name_and_coordinates_of_ports_per_region region_name = "null"
            result = PortBLL.query_at_a_region(region_name).query_select_parameters([:name, :latitude, :longitude]).execute_query
            unless result.blank?
                return {value: result, error: nil}
            else
                return {value: 0, error: "Error: either #{region_name } has no ports or it does not support by the system"}
            end
        end



        # return hash {value: result/0 and error: nil/message}
        def get_number_of_ports_per_region region_name = ""

            result = PortBLL.query_at_a_region(region).count

            unless result.blank? and result <= 0
                return {value: result, error: nil}
            else
                return {value: 0, error: "Error: either #{region_name } has no ports or it does not support by the system"}
            end

        end







        # in this section, we will define methods that only return ActiveRecord relation query
        # begin of query section

        # end of query section


    end
