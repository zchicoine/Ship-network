module AdminHelpers
    module ShipmentsHelperC

        # :description
        # :param [Json]
        # :return [Hash] {data: , error:}
        def update_shipments (object)
            temp_hash = {}
            temp_hash[:error] = []
            temp_hash[:data] = {}
            # Open the alternative port file
            open_json_temp_file = File.open(Rails.root.join('app', 'assets', 'javascripts', 'json', 'alternative_port_names.json'))    # Read the json file containing the alternative port names
            read_port_names_file = open_json_temp_file.read
            hash_port_names_object = JSON.parse(read_port_names_file)
            object.each do |shipment|
                begin

                    port_name = shipment['portName'].downcase
                    open_port = hash_port_names_object[port_name]        # Look for the port where this ship is supposed to be
                    raise "port name is not in the json port database --> #{shipment['portName']}" if open_port.blank?
                    port = UnitOfWork.instance.port.get_by_name(open_port)
                    vessel = UnitOfWork.instance.ship.get_by_name(shipment['shipName'])
                    raise "port name is not in the port database --> #{shipment['portName']}" unless port[:error].blank?
                    raise "ship name is not in the ship database --> #{shipment['shipName']}" unless vessel[:error].blank?

                    if shipment['openDate'].blank?
                        open_date = Time.now.to_s
                    else
                        open_date = shipment['openDate']
                    end
                    open_date_string = open_date
                    date, time = open_date_string.split("T")
                    start_date =  Date.parse(date)
                    temp_hash[:data][shipment['brokerId'].to_i] = [] if temp_hash[:data][shipment['brokerId'].to_i].blank?
                    temp_hash[:data][shipment['brokerId'].to_i].push(Shipment.find_or_initialize_by(ship: vessel[:value],
                                                                         open_start_date: start_date,
                                                                         open_end_date: start_date.advance({days: 5}),
                                                                         port: port[:value])
                    )

                rescue => e
                    temp_hash[:error].push( "Error: #{e.message} -> broker: #{shipment['brokerId']} -> vessel: #{shipment['shipName']} -> port: #{ shipment['portName']}")
                end

            end
            # assciste shipment to brokers
            temp_hash[:data].each do |key,value|
                begin
                    broker = Broker.find_by!(id:key)
                    broker.shipments = value
                    broker.save!
                rescue => e
                    temp_hash[:error].push( "Error: #{e.message} ")
                end

            end
            return temp_hash
        end
    end
end
