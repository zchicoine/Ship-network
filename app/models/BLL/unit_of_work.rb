class UnitOfWork
    include Singleton
    attr_accessor :_ship,:_port

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

end