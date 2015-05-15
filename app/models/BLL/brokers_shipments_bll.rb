class BrokersShipmentsBLL < BrokersShipments
    extend CustomQuery

    # :param [String] email address of a broker, port name,  ship name
    # :description TODO this function should return all the data for the shipments
    # :return TODO
    def get_email(email_address,port,ship)
        shipment_id = ShipmentBLL.joins(:port, :ship).select(:id).where('ports.name' => port, 'ships.name' => ship).execute_query(1)
        BrokersShipmentsBLL.joins(:broker,:shipment).select(:email_body,:email_date,:email_subject).where('brokers.email' => email_address, 'shipments.id' => shipment_id).execute_query(1)
    end
end