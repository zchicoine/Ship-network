class SideBarController < ApplicationController
    include SideBarHelper
    include GoogleMapHelper
    

    def index
        parameters = params.require(:side_info).permit(:name, :level)
        _level = parameters[:level].to_i

        case _level
            when REGION_LEVEL
                @side_info = {region_name: parameters[:name].downcase}
                session[:region_name] = @side_info[:region_name]
                render :partial =>  'side_bar/table_body/region'
            when PORT_LEVEL
                @side_info = {region_name: session[:region_name] || "No region selected" }
                @side_info[:port_name] = parameters[:name]
                session[:port_name] = @side_info[:port_name]
               # @side_info[:port_coordinates] = parameters[:port_coordinates]
                @ships_at_port =  get_all_ships_at_specific_port [0,0], @side_info[:port_name]
               return render :partial =>  'side_bar/table_body/port'
        end
    end



    def region

        parameters = params.require(:region_info).permit(:name, :coordinates)
        @side_info = {region_name: parameters[:name].downcase}
        session[:region_name] = @side_info[:region_name]



        #redirect_to root_path
        render :partial =>  'side_bar/table_body/region'


    end
    def default
        @side_info = { region_name:'General Information'}
        render :partial =>  'side_bar/table_body/default'
    end

    def ship
        parameters = params.require(:ship_info).permit(:ship_name )
        @side_info = {region_name: session[:region_name] || "No region selected" }
        @side_info[:ship_name] = parameters[:ship_name]
        @side_info[:port_name] = session[:port_name]
       @ship_info =  get_ship_information @side_info[:ship_name], @side_info[:port_name]
        respond_to do |format|
            format.html {render :partial =>  'side_bar/table_body/ship'}
            format.js {render 'side_bar/table_body/js/ship'}
        end

    end

    def port
        parameters = params.require(:port_info).permit(:port_name)

         @side_info = {region_name: session[:region_name] || "No region selected" }
         @side_info[:port_name] = parameters[:port_name]
        session[:port_name] = @side_info[:port_name]
        @side_info[:port_coordinates] = parameters[:port_coordinates]
       @ships_at_port =  get_all_ships_at_specific_port [0,0], @side_info[:port_name]

        respond_to do |format|
            format.html {render :partial =>  'side_bar/table_body/port'}
            format.js {render 'side_bar/table_body/js/port'}
        end

    end

end