class UnitOfWork
    include Singleton
    attr_accessor :_ship

    def ship
        if _ship.nil?
          return _ship =  ShipBLL.new
        end
         _ship
    end



end