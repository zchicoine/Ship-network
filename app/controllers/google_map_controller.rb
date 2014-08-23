class GoogleMapController < ApplicationController


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
            respond_to do |format|
                format.json{  render :json => { :errors => result[:error] }, :status => 422}
            end
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
