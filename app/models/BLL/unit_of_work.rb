class UnitOfWork
    include Singleton
    attr_accessor :_ship,:_port,:_shipment,:_ship_detail

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
    def ship_detail
        if _ship_detail.nil?
            return _ship_detail =  ShipDetailBLL.new
        end
        _ship_detail
    end

end