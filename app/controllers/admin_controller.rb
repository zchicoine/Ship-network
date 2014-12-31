class AdminController < ApplicationController

  before_action :require_admin_authentification #the admin controller has to be protected to only let admins in.

  def require_admin_authentification
    unless current_broker.try(:admin?)
      redirect_to root_path                    #if a broker tries to view an admin page/action, they will be redirected to the main page.
    end
  end

  def index
      render ('index')  #render the admin view. The main page controller calls this action after the admin logs in
  end

  def update_ships_table
    # For now, when the admin presses the button to update ship db, we open the local json file obtained from google drive
    # and update the db. Later we will fetch the data from Google Drive directly.
    begin
      open_json_ships_file = File.open(Rails.root.join('public', 'ship_data.json'))
      read_file = open_json_ships_file.read
      json_object = JSON.parse(read_file)
      
      #json_object.each do |ship|
      #  vessel = Ship.find_or_create_by!(name: ship['motorVessel'])
      #end
      
      render ('create')
    rescue => e
      puts e.message
    end

  end

  def create
    render ('create')
  end
end
=begin
begin
b = Ship.create!(name: name, vessel_type: temp, deadweight: deadweight.to_i, deadweight_cargo_capacity: deadweight_cargo_capacity.to_i,
                 vessel_category: category_name)

a = ShipDetail.create!(draft: draft.strip.to_f, built: built.strip.to_i, tons_per_centimeter: tons_per_centimeter.to_f,
                       flag: flag, classification_society: classification_society, length_over_all: length_over_all.to_f, beam: beam.to_f, holds: holds.to_i,
                       hatches: hatches.to_i, gross_registered_tonnage: gross_registered_tonnage, net_registered_tonnage: net_registered_tonnage, total_cubic_meters_GR: total_cubic_meters_GR,
                       total_cubic_meters_BL: total_cubic_meters_BL, total_cubic_feet_GR: total_cubic_feet_GR, total_cubic_feet_BL: total_cubic_feet_BL, intermediate_fuel_oil_180?: return_boolean(intermediate_fuel_oil_180),
                       intermediate_fuel_oil_380?: return_boolean(intermediate_fuel_oil_380), marine_diesel_oil?: return_boolean(marine_diesel_oil), laden: laden, ballast: ballast, economic: economic,
                       consumption_at_sea_L: consumption_at_sea_L, consumption_at_sea_B: consumption_at_sea_B, eco_consumption_L: eco_consumption_L,
                       marine_diesel_oil_at_sea: marine_diesel_oil_at_sea, marine_gasoline_oil_at_sea: marine_gasoline_oil_at_sea, consumption_in_port_Working: consumption_in_port_Working,
                       consumption_in_port_Idle: consumption_in_port_Idle, marine_diesel_in_port: marine_diesel_in_port, marine_gasoline_oil_in_port: marine_gasoline_oil_in_port,
                       number_of_cranes: number_of_cranes, crane_capacity: crane_capacity, combined_crane_capacity: combined_crane_capacity, aussie_holds_ladders?: return_boolean(aussie_holds_ladders),
                       CO2_system_on_board?: return_boolean(co_system_on_board), twenty_foot_equivalent_unit?: return_boolean(twenty_foot_equivalent_unit), lakes_fitted?: return_boolean(lakes_fitted),
                       log_fitted?: return_boolean(log_fitted), grabber?: return_boolean(grabber), gearless?: return_boolean(gearless), double_hull?: return_boolean(double_hull), imo_fitted?: return_boolean(imo_fitted), appendix_B_fitted?: return_boolean(appendix_B_fitted),
                       box_shaped_holds?: return_boolean(box_shaped_holds), cement_holes_fitted?: return_boolean(cement_holes_fitted), marine_gasoline_oil?: return_boolean(marine_gasoline_oil), ice_classed?: return_boolean(ice_classed))
b.ship_detail = a


rescue => e
puts e.message + " for  vessel: " + name
end
=end