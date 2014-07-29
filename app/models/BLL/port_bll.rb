
    class PortBLL < Port

        def retrieve_port_by_name port_name = ""
            port_name
           port =   Port.find_by(name: port_name)
           port[:name] = port
        end


        def retrieve_ports_at_a_region region = ""

            region = region.downcase
            Port.where(region: region)

        end

        def retrieve_ports_coordinate_at_a_region region
            region = region.downcase
             Port.select(:latitude , :longitude).where(region: region).map { |l| [l.latitude, l.longitude] }
        end

    end
