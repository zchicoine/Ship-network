module GoogleMapHelper


  def get_ships_at_specific_port


  end
  def all_ports
    @ports_coordinate = Port.select(:latitude_coordinate , :longitude_coordinate)
   @ports_coordinate =  @ports_coordinate.map {|l| [l.latitude_coordinate ,  l.longitude_coordinate]}
  end

  def all_ships_at_specific_port port_coordinate = [0,0] , port_name ="null"

    if (! port_name.blank? && !port_coordinate.empty?)
    _port = Port.includes(:ships)
    _port = _port.find_by(name:port_name) ||
        _port.find_by(latitude_coordinate: port_coordinate[0] ,
                      longitude_coordinate: port_coordinate[1])
    else
        "the parameters invalid"
    end
    unless _port.nil?
      # extract the information depended on the user level of access
      ship_array =  _port.ships.all.map { |var| [var.name , var.built, var.category]}
      ship_array

    else
      "Either the parameters invalid or the port does not exist in the system."
    end


  end
end
