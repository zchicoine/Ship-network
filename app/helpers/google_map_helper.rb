module GoogleMapHelper


  def get_ships_at_specific_port


  end
  def all_ports
    @ports_coordinate = Port.select(:latitude_coordinate , :longitude_coordinate)
    @ports_coordinate.map {|lat| [lat.latitude_coordinate ,  lat.longitude_coordinate]}
  end

end
#a = 5