require 'DAL/ship'
class ShipBLL < Ship

  def get_total_number_of_ship
    self.vessel_category_validates?
  end

end
