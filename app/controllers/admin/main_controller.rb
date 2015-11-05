#require "json"
#require "rchardet"

class Admin::MainController < ApplicationController
  include  AdminHelperC
  include  AdminHelpers::ShipsHelperC
  include  AdminHelpers::PortsHelperC

  layout 'admin'
  before_action :require_admin_authentication #the admin_helpers controller has to be protected to only let admins in.

  def index
      render ('index')  #render the admin_helpers view. The main page controller calls this action after the admin_helpers logs in
  end

  def reset_ports
      PortBLL.destroy_all
      flash[:success] = 'Has been reset'
      render('update_ships_table')
  end
  def upload_ports_file
      begin
          uploaded_file = read_uploaded_file(params[:ports])

          if uploaded_file[:error].blank?
              hash_format = convert_it_to_hash_format(uploaded_file[:data])
              result = update_and_create_ports(hash_format)
              store_alternative_port_name_file_in_app(result[:data])
              @error_messages = result[:error]
          else
              @error_messages = [uploaded_file[:error]]
          end
      rescue => e
          @error_messages = [e.message]
      end
      render('update_ships_table')
  end

  def reset_ships
      ShipBLL.destroy_all
      flash[:success] = 'Has been reset'
      render('update_ships_table')
  end
  def upload_ships_file
      begin
          uploaded_file = read_uploaded_file(params[:ships])

          if uploaded_file[:error].blank?
              hash_format = convert_it_to_hash_format(uploaded_file[:data])
              result = update_and_create_ships(hash_format)
              @error_messages = result[:error]
          else
              @error_messages = [uploaded_file[:error]]
          end

      rescue => e
          @error_messages = [e.message]
      end
      render('update_ships_table')
  end

end
