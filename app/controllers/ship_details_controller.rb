class ShipDetailsController < ApplicationController


    def show
        @name_test = params[:name]

        render 'ship_details/js/index'
    end


end
