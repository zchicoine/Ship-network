module AdminHelpers
    module ShipmentsHelperC

        # :description
        # :param [Json]
        # :return [Hash] {data: , error:}
        def update_shipments (object)
            broker = Broker.new # get a broker
            temp_hash = {}
            temp_hash[:error] = []
            temp_hash[:data] = []
            # Open the alternative port file
            open_json_temp_file = File.open(Rails.root.join('app', 'assets', 'javascripts', 'json', 'alternative_port_names.json'))    # Read the json file containing the alternative port names
            read_port_names_file = open_json_temp_file.read
            hash_port_names_object = JSON.parse(read_port_names_file)
            object.each do |shipment|
                begin
                    if broker.id == shipment['brokerID'].to_i
                        broker.shipments = temp_hash[:data]
                    else
                        broker.save!
                        temp_hash[:data] = []
                        broker = Broker.find_by!(shipment['brokerID'].to_i)
                    end
                    port_name = shipment['PortName'].to_s.downcase
                    open_port = hash_port_names_object[port_name]        # Look for the port where this ship is supposed to be

                    port = UnitOfWork.instance.port.get_by_name(open_port)
                    vessel = UnitOfWork.instance.port.get_by_name(shipment['ShipName'])
                    temp_hash[:error].push("port name is not in the port database nor alternative name --> #{shipment['PortName']}") unless port[:error].blank?
                    temp_hash[:error].push("ship name is not in the ship database --> #{shipment['ShipName']}") unless vessel[:error].blank?

                    if shipment['OpenDate'].blank?
                        open_date = Time.now.to_s
                    else
                        open_date = shipment['OpenDate']
                    end
                    open_date_string = open_date
                    date, time = open_date_string.split("T")
                    start_date =  Date.parse(date)
                    temp_hash[:data].push(Shipment.new(ship: vessel[:value], open_start_date: start_date, open_end_date: start_date.advance({days: 5}), port: port[:value]))
                rescue => e
                    temp_hash[:error].push( " #{e.message} vessel: #{shipment['ShipName']} port: #{ shipment['PortName']}")
                end

            end
            begin

            rescue => e
                temp_hash[:error].push( " #{e.message} for vessel: #{shipment['ShipName']}")
            end

            return temp_hash
        end
    end
end
