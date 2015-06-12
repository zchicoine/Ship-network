module AdminHelpers
    module ShipmentsHelperC

        # :description
        # :param [Json]
        # :return [Hash] {data: , error:}
        def update_shipments (object)
            temp_hash = {}
            temp_hash[:error] = []
            temp_hash[:data] = {brokerId:{},email:{}} # if the email id is blank then use broker ID
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
                    date, time = open_date_string.split('T')
                    start_date =  Date.parse(date)

                    if shipment['emailId'].blank?
                        temp_hash[:data][:brokerId][shipment['brokerId'].to_i] = [] if temp_hash[:data][:brokerId][shipment['brokerId'].to_i].blank?
                        temp_hash[:data][:brokerId][shipment['brokerId'].to_i].push(Shipment.find_or_initialize_by(ship: vessel[:value],
                                                                                                        open_start_date: start_date,
                                                                                                        open_end_date: start_date.advance({days: 5}),
                                                                                                        port: port[:value])
                        )
                    else
                        temp_hash[:data][:email][shipment['emailId'].to_i] = {shipments:[],original_email:shipment['originalSender']} if temp_hash[:data][:email][shipment['emailId'].to_i].blank?
                        temp_hash[:data][:email][shipment['emailId'].to_i][:shipments].push(Shipment.find_or_initialize_by(ship: vessel[:value],
                                                                                                                   open_start_date: start_date,
                                                                                                                   open_end_date: start_date.advance({days: 5}),
                                                                                                                   port: port[:value])
                        )
                    end


                rescue => e
                    temp_hash[:error].push( "Error: #{e.message}, Broker: #{shipment['brokerId']} , Email: #{shipment['emailId']} , Vessel: #{shipment['shipName']} , Port: #{ shipment['portName']}")
                end


            end
            temp_hash[:error].concat(insert_shipments_via_broker(temp_hash[:data][:brokerId]))
            temp_hash[:error].concat(insert_shipments_via_email(temp_hash[:data][:email]))
            temp_hash
        end

        private

        # :description associate shipment to brokers
        def insert_shipments_via_broker(shipments)
            errors = []
            shipments.each do |key,value|
                begin
                    broker = Broker.find_by!(id:key)
                    broker.shipments.push(value)
                    broker.save!
                rescue => e
                    errors.push( "Error: insert_shipments_via_broker -> Broker ID  #{key}  --> cause #{e}")
                end
            end
            return errors
        end

        # :param [Hash] {'1':{shipments:[],original_email:''},'2': {shipments:[],original_email:''}, etc}
        def insert_shipments_via_email(shipments)
            errors = []
            shipments.each do |key,value|
                begin
                    ship_email = ShipEmail.find_by!(id:key)
                    ship_email.original_email_address = value[:original_email]
                    ship_email.save!
                    ship_email.shipments.push(value[:shipments])
                    ship_email.broker.shipments.push(value[:shipments])
                    ship_email.save!
                rescue => e
                    errors.push("Error: insert_shipments_via_email: -> Email ID  #{key} --> cause: #{e}  ")
                end
            end
            return errors
        end
    end
end
