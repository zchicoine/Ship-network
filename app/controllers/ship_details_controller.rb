class ShipDetailsController < ApplicationController


    def show
        @name_of_ship = params[:name]

        respond_to do |format|
            format.html {render :partial =>  'ship_details/index'}
            format.js { render 'ship_details/js/index'}
        end

    end

    def close

        respond_to do |format|
            format.html {render :partial =>  'ship_details/index'}
            format.js { render 'ship_details/js/close_button'}
        end

    end
end
