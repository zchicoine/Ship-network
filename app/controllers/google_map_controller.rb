class GoogleMapController < ApplicationController
 include GoogleMapHelper
  def display_ship_on_side_bar

      parameters = params.require(:port_info).permit(:port_name)

      @side_info = {region_name: session[:region_name] || "No region selected" }
      @side_info[:port_name] = parameters[:port_name]
      session[:port_name] = @side_info[:port_name]
      @side_info[:port_coordinates] = parameters[:port_coordinates]
      @ships_at_port =  get_all_ships_at_specific_port [0,0], @side_info[:port_name]
        port_page =  render_to_string(:partial => 'side_bar/table_body/port')
         render :json => { partial_page: port_page  , number_ships: @ships_at_port.size }

  end

    # return ports coordinates array
    def port_coordinates
        parameters = params.require(:region_info).permit(:name)
        ports_coordinates =  get_name_of_ports_and_coordinates_per_region parameters[:name]
         ports_coordinates_array = ports_coordinates.all.map { |var| [ var.latitude, var.longitude] }
        #  ports_coordinates.as_json
        #   return ports_coordinates_array
        render :json => {name:ports_coordinates.all.map { |var| var.name }, coordinates: ports_coordinates_array}

    end

  private


end
