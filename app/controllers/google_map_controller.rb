class GoogleMapController < ApplicationController
 include GoogleMapHelper
  def display_ship_on_side_bar

      parameters = params.require(:port_info).permit(:port_name)
      @side_info = {region_name: cookies[:region_name] || "No region selected" }
      @side_info[:port_name] = parameters[:port_name]
      cookies[:port_name] = @side_info[:port_name]
       result =  UnitOfWork.instance.ship.get_all_ships_at_specific_port  @side_info[:port_name]
      if result[:error].nil?
          @ships_at_port = result[:value]
          port_page =  render_to_string(:partial => 'side_bar/table_body/after_click_a_port/index')
          render :json => { partial_page: port_page  , number_ships: @ships_at_port.size }
      end

  end

    # return ports coordinates array
    def port_coordinates
        parameters = params.require(:region_info).permit(:name)
        result =  UnitOfWork.instance.shipment.get_name_And_coordinates_of_Ports_and_number_of_ship_per_Region parameters[:name]
        if result[:error].nil?
            ports_name_coordinates__shipNumber_array = result[:value].to_a
            array_length = ports_name_coordinates__shipNumber_array.length
            port_coordinates_array = ports_name_coordinates__shipNumber_array.map {|v| [v[0][1], v[0][2]]  }
            render :json => {name:ports_name_coordinates__shipNumber_array.map {|v| v[0][0]}, coordinates: port_coordinates_array, shipNumber:ports_name_coordinates__shipNumber_array.map {|v| v[1]}}
        else

        end

    end

 def close

   respond_to do |format|
     format.html {render :partial =>  'google_map/index'}
     format.js { render 'google_map/js/close_button'}
   end

 end

  private


end
