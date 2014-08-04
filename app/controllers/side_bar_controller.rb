class SideBarController < ApplicationController
    include SideBarHelper
    include GoogleMapHelper
    

    def index
        parameters = params.require(:side_info).permit(:name, :level)
        _level = parameters[:level].to_i
        case _level
            when REGION_LEVEL
                region parameters[:name]
            when PORT_LEVEL
                port parameters[:name]
            when SHIP_LEVEL
                ship parameters[:name]

        end

    end


    private

    def region region_name

        @side_info ={region_name: region_name}
        cookies[:region_name] = @side_info[:region_name]
        render :partial =>  'side_bar/table_body/after_click_a_region/index'

    end
    def default
        @side_info = { region_name:'General Information'}
        render :partial =>  'side_bar/table_body/default/index'
    end

    def port port_name
        @side_info = {region_name: cookies[:region_name] || "No region selected" }
        @side_info[:port_name] = port_name
        cookies[:port_name] = @side_info[:port_name]
        result =  UnitOfWork.instance.ship.get_all_ships_at_specific_port @side_info[:port_name]
        if result[:error].nil?
            @ships_at_port = result[:value]
        end
        respond_to do |format|
            format.html {render :partial =>  'side_bar/table_body/after_click_a_port/index'}
            format.js {render 'side_bar/table_body/after_click_a_port/js/index'}
        end
    end



    def ship ship_name
        @side_info = {region_name: cookies[:region_name] || "No region selected" }
        @side_info[:ship_name] =  ship_name
        @side_info[:port_name] = cookies[:port_name]
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