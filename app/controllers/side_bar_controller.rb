class SideBarController < ApplicationController
    include SideBarHelper
    include GoogleMapHelper
    

    def index
        parameters = params.require(:side_info).permit(:name, :level)
        _level = parameters[:level].to_i

        case _level
            when REGION_LEVEL
                @side_info = {region_name: parameters[:name]}
                session[:region_name] = @side_info[:region_name]
                render :partial =>  'side_bar/table_body/after_click_a_region/index'
            when PORT_LEVEL
                @side_info = {region_name: session[:region_name] || "No region selected" }
                @side_info[:port_name] = parameters[:name]
                session[:port_name] = @side_info[:port_name]
               # @side_info[:port_coordinates] = parameters[:port_coordinates]
                result =  UnitOfWork.instance.ship.get_all_ships_at_specific_port @side_info[:port_name]
                if result[:error].nil?
                    @ships_at_port = result[:value]
                end
                respond_to do |format|
                    format.html {render :partial =>  'side_bar/table_body/after_click_a_port/index'}
                    format.js {render 'side_bar/table_body/after_click_a_port/js/index'}
                end
            when SHIP_LEVEL

                @side_info = {region_name: session[:region_name] || "No region selected" }
                @side_info[:ship_name] = parameters[:name]
                @side_info[:port_name] = session[:port_name]

                result =  UnitOfWork.instance.shipment.get_ship_category_deadweight_open_start_and_end_date @side_info[:ship_name], @side_info[:port_name]
                if result[:error].nil?
                    @ship_info = result[:value]
                end
                respond_to do |format|
                    format.html {render :partial =>  'side_bar/table_body/after_click_a_ship/index'}
                    format.js {render 'side_bar/table_body/after_click_a_ship/js/index'}
                end
        end
    end



    def region

        parameters = params.require(:region_info).permit(:name, :coordinates)
        @side_info = {region_name: parameters[:name].downcase}
        session[:region_name] = @side_info[:region_name]



        #redirect_to root_path
        render :partial =>  'side_bar/table_body/after_click_a_region/index'


    end
    def default
        @side_info = { region_name:'General Information'}
        render :partial =>  'side_bar/table_body/default/index'
    end

    def ship
       #  parameters = params.require(:ship_info).permit(:ship_name )
       #  @side_info = {region_name: session[:region_name] || "No region selected" }
       #  @side_info[:ship_name] = parameters[:ship_name]
       #  @side_info[:port_name] = session[:port_name]
       # @ship_info =  get_ship_information @side_info[:ship_name], @side_info[:port_name]
       #  respond_to do |format|
       #      format.html {render :partial =>  'side_bar/table_body/after_click_a_ship/index'}
       #      format.js {render 'side_bar/table_body/after_click_a_ship/js/index'}
       #  end

    end

    def port
        parameters = params.require(:port_info).permit(:port_name)

         @side_info = {region_name: session[:region_name] || "No region selected" }
         @side_info[:port_name] = parameters[:port_name]
        session[:port_name] = @side_info[:port_name]
        @side_info[:port_coordinates] = parameters[:port_coordinates]
       @ships_at_port =  get_all_ships_at_specific_port [0,0], @side_info[:port_name]

        respond_to do |format|
            format.html {render :partial =>  'side_bar/table_body/after_click_a_port/index'}
            format.js {render 'side_bar/table_body/after_click_a_port/js/index'}
        end

    end

end