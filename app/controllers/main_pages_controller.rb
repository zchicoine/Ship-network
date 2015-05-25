# TODO review this file and delete unnecessary comments and code

=begin
    This is the main pages of the ship network
=end

class MainPagesController < ApplicationController

    def index

    # Redirect admin to the admin view (through its controller)
    #     if current_broker.try(:admin?)
    #       redirect_to(controller: 'admin', action: 'index')
    #     end

        create_admin_if_none_exists
    end

    # def loginpage
    #
    #     respond_to do |format|
    #         format.html {render :partial =>  'main_pages/login'}
    #         format.js {render 'main_pages/js/login'}
    #     end
    #
    # end

    def region
        parameters = params.require(:region_info).permit(:name)
        @saved_name = parameters[:name]
        cookies[:region_name] = @saved_name
        respond_to do |format|
            format.js {render 'js/region_view'}
        end
    end

    def port
        parameters = params.require(:port_info).permit(:port_name)
        parameters[:port_coordinates] = params[:port_info][:port_coordinates]
        @saved_name = parameters[:port_name]
        region_name = cookies[:region_name]
        respond_to do |format|
            format.js {render 'js/port_view', :locals => {region_name:region_name, port_coordinates: parameters[:port_coordinates]}}
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

    def create_admin_if_none_exists
      admin = Broker.exists?(admin: true)

      unless (admin)

        begin
          Broker.create!(username: 'Zack', password: 'adminoftheshipnetwork', admin: true, email: 'admin@shipnetwork.com')
        rescue => e
          puts "#{e.message} for broker Admin"
        end

      end

    end

end
