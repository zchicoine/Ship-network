=begin
    This is the main pages of the ship network
=end

class MainPagesController < ApplicationController
    include LinkListBackHistoryHelperC

    def index
   create_history
    # a = PortBLL.new
    #     @hi = a.retrieve_ports_coordinate_at_a_region "North America"
    end

    def loginpage
        respond_to do |format|
            format.html {render :partial =>  'main_pages/login'}
            format.js {render 'main_pages/js/login'}
        end

    end

    def region
        parameters = params.require(:region_info).permit(:name)
        @saved_name = parameters[:name]
        respond_to do |format|
            format.js {render 'js/region_view'}
        end
    end

    def port
        parameters = params.require(:port_info).permit(:port_name)
        @saved_name = parameters[:port_name]

        respond_to do |format|
            format.js {render 'js/port_view'}
        end

    end

    def ship
        parameters = params.require(:ship_info).permit(:ship_name)
        @saved_name = parameters[:ship_name]

        respond_to do |format|
            format.js {render 'js/ship_view'
            }
        end

    end
end
