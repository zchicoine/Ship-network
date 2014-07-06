class SideBarController < ApplicationController
    include SideBarHelper




    def region

        parameters = params.require(:region_info).permit(:name, :coordinates)
        @side_info = {region_name: parameters[:name]}
        session[:region_name] = @side_info[:region_name]
      # @ports_info =   ports_at_region @region_info[:name], @region_info[:coordinates]


    #  @region_info = { name:region_info[:name]}

        #redirect_to root_path
        render :partial =>  'side_bar/table_body/region'


    end
    def default
        @side_info = { region_name:'General Information'}
        render :partial =>  'side_bar/table_body/default'
    end

    def ship
        parameters = params.require(:ship_info).permit(:ship_name)
        @side_info = {region_name: session[:region_name] || "No region selected" }
        @side_info[:ship_name] = parameters[:ship_name]
        respond_to do |format|
            format.html {render :partial =>  'side_bar/table_body/ship'}
            format.js {render 'side_bar/table_body/js/ship'}
        end
        # render :partial =>  'side_bar/table_body/ship'
    end

    def port
        parameters = params.require(:port_info).permit(:port_name)
         @side_info = {region_name: session[:region_name] || "No region selected" }
         @side_info[:port_name] = parameters[:port_name]
         @side_info[:port_coordinates] = parameters[:port_coordinates]

        respond_to do |format|
            format.html {render :partial =>  'side_bar/table_body/port'}
            format.js {render 'side_bar/table_body/js/port'}
        end

    end

end