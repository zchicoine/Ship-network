class SidePanelController < ApplicationController

    def index
        parameters = params.require(:side_info).permit(:name, :level)
        _level = parameters[:level].to_i
        case _level
            when GLOBAL_LEVEL
                global parameters[:name]
            when REGION_LEVEL
                region parameters[:name]
            when PORT_LEVEL
                port parameters[:name]
            when SHIP_LEVEL
                ship parameters[:name]

        end

    end

    def region_short_info
        parameters = params.require(:side_info).permit(:name)
        @region_name = parameters[:name]

        table_body = render_to_string(:partial => 'side_panel/table_body/after_click_a_region/index', :locals => {region_name: @region_name})
        table_footer = render_to_string(:partial => 'side_panel/table_foot/region_deadweight', :locals => {region_name: @region_name})
            respond_to do |format|
                format.html {render :partial =>  'side_panel/table_body/when_hover_over_a_region/index'}
                format.json{ render :json => { body: table_body  , footer: table_footer }}
            end
    end

    def broker_contact
      parameters = params.require(:side_info).permit(:ship_name, :port_name)
      result = UnitOfWork.instance.shipment.get_ship_broker parameters[:ship_name], parameters[:port_name]
      if result[:error].nil?
        @ship_info = result[:value]
      end
      respond_to do |format|
        format.html {render :partial => 'side_panel/table_body/after_click_a_ship/broker_contact'}
        format.js {render 'side_panel/table_body/after_click_a_ship/js/broker_contact'}
      end
    end






    private
    # so far param: name is not being used
    def global(name)

        table_body = render_to_string(:partial => 'side_panel/table_body/global/index')
        table_footer = render_to_string(:partial => 'side_panel/table_foot/total_deadweight')
        respond_to do |format|
            format.html { render :partial => 'side_panel/table_body/global/index'}
            format.json { render :json => {body: table_body, footer: table_footer} }

        end

    end

    def region(region_name)

        if region_name.is_a? String
            _region_name = region_name
        end
        cookies[:region_name] = _region_name

            table_body = render_to_string(:partial => 'side_panel/table_body/after_click_a_region/index', :locals => {region_name: _region_name})
            table_footer = render_to_string(:partial => 'side_panel/table_foot/region_deadweight', :locals => {region_name: _region_name})
            respond_to do |format|
                format.html { render :partial => 'side_panel/table_body/after_click_a_region/index', :locals => {region_name: _region_name} }
                format.json { render :json => {body: table_body, footer: table_footer} }

            end
    end

    def port(port_name)
        @side_info = {region_name: cookies[:region_name] || "No region selected"}
        @side_info[:port_name] = port_name
        cookies[:port_name] = @side_info[:port_name]
        result = UnitOfWork.instance.ship.get_all_ships_at_specific_port @side_info[:port_name]
        if result[:error].nil?
            @ships_at_port = result[:value]
        end
        respond_to do |format|
            format.html { render :partial => 'side_panel/table_body/after_click_a_port/index' }
            format.js { render 'side_panel/table_body/after_click_a_port/js/index' }
        end
    end



    def ship(ship_name)
        @side_info = {region_name: cookies[:region_name] || "No region selected"}
        @side_info[:ship_name] = ship_name
        @side_info[:port_name] = cookies[:port_name]
        result = UnitOfWork.instance.shipment.get_shipment_data(current_broker[:email],@side_info[:port_name],@side_info[:ship_name])
        if result[:error].nil?
            @ship_info = result[:value]
        end
        respond_to do |format|
            format.html { render :partial => 'side_panel/table_body/after_click_a_ship/index' }
            format.js { render 'side_panel/table_body/after_click_a_ship/js/index' }
        end
    end







end