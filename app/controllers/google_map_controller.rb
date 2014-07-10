class GoogleMapController < ApplicationController
 include GoogleMapHelper
  def map


  end

    # return ports coordinates array
    def port_coordinates
        parameters = params.require(:region_info).permit(:name)
        ports_coordinates =  get_name_of_ports_and_coordinates_per_region parameters[:name]
         ports_coordinates_array = ports_coordinates.all.map { |var| [ var.latitude, var.longitude] }
        #  ports_coordinates.as_json
        #   return ports_coordinates_array
        render :json => {coordinates: ports_coordinates_array}

    end

  private


end
