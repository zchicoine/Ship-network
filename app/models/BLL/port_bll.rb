
    class PortBLL < Port

        # return hash {value: result/0 and error: nil/message}
        def retrieve_port_by_name port_name = ""
            port_name
           result =   Port.find_by(name: port_name)
            unless result.blank?
                return {value: result, error: nil}
            else
                return {value: 0, error: "Error: port name: #{port_name } does not exist"}
            end
        end

        # return hash {value: result/0 and error: nil/message}
        def retrieve_ports_at_a_region region = ""
           result =  PortBLL.query_port_at_a_region region
            unless result.blank?
                return {value: result, error: nil}
            else
                return {value: 0, error: "Error: either #{region_name } has no ports or it does not support by the system"}
            end
        end


        # return hash {value: result/0 and error: nil/message}
        def retrieve_name_and_coordinates_of_ports_per_region region_name = "null"
            result = PortBLL.query_port_at_a_region(region_name).query_select_parameters([:name, :latitude, :longitude]).execute_query
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
        def self.query_at_a_region region
            region = region.downcase
            where(region: region)
        end

        # pass arguments to select function
        # [:key1,:key2]
        def self.query_select_parameters array_params = []
            p "1"
            unless array_params.blank?
                p "2"
                   return select(array_params)
            else
                p "3"
                return select("*")
            end

        end

        def self.execute_query limit = -1
            if limit == -1
                all
            else
                take(limit)[0]
            end


        end

        # end of query section


    end
