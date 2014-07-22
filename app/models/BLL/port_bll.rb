
    class PortBLL < Port

        def retrieve_port_by_name port_name = ""
            port_name.downcase
            Port.find_by(name: port_name)
        end

    end
