class BrokersShipmentsBLL < BrokersShipments
    extend CustomQuery

    # :param [String] email address of a broker, port name,  ship name
    # :description  this method should return all the data for the shipments
    # :return {value:{broker_name:, broker_email:, broker_company:, broker_website:,
    # broker_telephone:, roker_country:, broker_city:, email_body:, email_subject:,
    # email_date:, open_start_date:, open_end_date:, deadweight_cargo_capacity:,
    # deadweight:, vessel_category:, ship_name:, port_name:}, error:nil}
    def get_shipment_data(email_address,port,ship)
        begin
            shipment_id = ShipmentBLL.joins(:port, :ship).select('ships.*','ports.*').where('ports.name' => port, 'ships.name' => ship).execute_query(1)
            broker_data = BrokersShipmentsBLL.joins(:broker,:shipment).select(:*,'brokers.*','shipments.*').where(
                'brokers.email' => email_address, 'shipments.id' => shipment_id.id).execute_query(1)

            unless broker_data.nil?
                convert_to_ruby_hash = {
                    broker_name: broker_data[:username],
                    broker_email: broker_data[:email],
                    broker_company:broker_data[:company],
                    broker_website:broker_data[:website] ,
                    broker_telephone:broker_data[:telephone],
                    broker_country:broker_data[:country],
                    broker_city:broker_data[:city],
                    email_body:broker_data[:email_body],
                    email_subject:broker_data[:email_subject],
                    email_date:broker_data[:email_date],
                    open_start_date: broker_data[:open_start_date].to_date,
                    open_end_date:  broker_data[:open_end_date],
                    deadweight_cargo_capacity: shipment_id[:deadweight_cargo_capacity],
                    deadweight: shipment_id[:deadweight],
                    vessel_category: shipment_id[:vessel_category],
                    ship_name: ship,
                    port_name:  port
                }
                return {value:convert_to_ruby_hash, error:nil}
            else
                return {value:'', error:"No data for #{email_address} with ship: #{ship} and port: #{port}"}
            end

        rescue Exception => e

            {value:'', error:e}
        end
    end
end