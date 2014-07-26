=begin
    This is the main pages of the ship network
=end

class MainPagesController < ApplicationController


    def index
       @ship_sum =  ShipBLL.new
       @ship_sum = @ship_sum.get_total_number_of_ship
    end
    def loginpage
        respond_to do |format|
            format.html {render :partial =>  'main_pages/login'}
            format.js {render 'main_pages/js/login'}
        end
    end



end
