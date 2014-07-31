class UnitOfWork
    include Singleton
    attr_accessor :_ship,:_port,:_shipment

    def ship
        if _ship.nil?
          return _ship =  ShipBLL.new
        end
         _ship
    end
    def port
        if _port.nil?
            return _port =  PortBLL.new
        end
        _port
    end
    def shipment
        if _shipment.nil?
            return _shipment =  ShipmentBLL.new
        end
        _shipment
    end

end