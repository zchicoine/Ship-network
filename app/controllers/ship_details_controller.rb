class ShipDetailsController < ApplicationController


    def show
        @name_test = params[:name]

        respond_to do |format|
            format.html {render :partial =>  'ship_details/index'}
            format.js { render 'ship_details/js/index'}
        end

    end


end