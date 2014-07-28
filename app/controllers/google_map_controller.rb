class GoogleMapController < ApplicationController
 include GoogleMapHelper
  def display_ship_on_side_bar

      parameters = params.require(:port_info).permit(:port_name)

      @side_info = {region_name: session[:region_name] || "No region selected" }
      @side_info[:port_name] = parameters[:port_name]
      session[:port_name] = @side_info[:port_name]
      @side_info[:port_coordinates] = parameters[:port_coordinates]
      @ships_at_port =  get_all_ships_at_specific_port [0,0], @side_info[:port_name]
        port_page =  render_to_string(:partial => 'side_bar/table_body/after_click_a_port/index')
         render :json => { partial_page: port_page  , number_ships: @ships_at_port.size }

  end

    # return ports coordinates array
    def port_coordinates
        parameters = params.require(:region_info).permit(:name)
        ports_name_coordinates__shipNumber =  get_nameAndCoordinatesOfPorts_and_shipNumber_perRegion parameters[:name]
        ports_name_coordinates__shipNumber_array = ports_name_coordinates__shipNumber.to_a
        array_length = ports_name_coordinates__shipNumber_array.length
        port_coordinates_array = ports_name_coordinates__shipNumber_array.map {|v| [v[0][1], v[0][2]]  }

        render :json => {name:ports_name_coordinates__shipNumber_array.map {|v| v[0][0]}, coordinates: port_coordinates_array, shipNumber:ports_name_coordinates__shipNumber_array.map {|v| v[1]}}

    end

  private


end
