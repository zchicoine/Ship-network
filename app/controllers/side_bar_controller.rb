class SideBarController < ApplicationController

    @table # to decide which table will be display
    @region_info

    def region

        region_name = params.require(:region).permit(:name, :coordinates)




      @region_info = { name:region_name[:name]}
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