class ShipDetailsController < ApplicationController

    def show
        @name_of_ship,@name_of_port,@name_of_region = params[:ship_name],params[:port_name],params[:region_name]
        @get_open_port_and_date = UnitOfWork.instance.shipment.get_open_port_date_and_end @name_of_ship, @name_of_port
        respond_to do |format|
            format.html {render :partial =>  'ship_details/index'}
            format.js { render 'ship_details/js/index'}
        end

    end

    def close
        name_of_port,name_of_region = params[:port_name],params[:region_name]
        respond_to do |format|
            format.html {render :partial =>  'ship_details/index'}
            format.js { render 'ship_details/js/close_button', :locals => { region_name: name_of_region,port_name:name_of_port }}
        end

    end
end
