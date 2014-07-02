class SideBarController < ApplicationController
    include SideBarHelper

    @table # to decide which table will be display
    @region_info

    def region

        @region_info = params.require(:region).permit(:name, :coordinates)

      # @ports_info =   ports_at_region @region_info[:name], @region_info[:coordinates]


    #  @region_info = { name:region_info[:name]}

        #redirect_to root_path
        render :partial =>  'side_bar/table_body/region'


    end
    def default


    end

    def ship

        @region_info = { name:'North America'}
        render :partial =>  'side_bar/table_body/ship'
    end

    def port

    end

end