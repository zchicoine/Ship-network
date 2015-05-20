#require "json"
#require "rchardet"

class Admin::MainController < ApplicationController
  include  AdminHelperC
  include  AdminHelpers::BrokersHelperC
  include  AdminHelpers::ShipsHelperC
  include  AdminHelpers::PortsHelperC

  before_action :require_admin_authentication #the admin_helpers controller has to be protected to only let admins in.

  def index
      render ('index')  #render the admin_helpers view. The main page controller calls this action after the admin_helpers logs in
  end

  # def update_shipments_table
  #   @error_messages_for_shipments = []
  #   json_file = open_the_json_file
  #   hash_object = hash_the_json_file (json_file)
  #   @error_messages_for_shipments = update_shipments (hash_object)
  #   update_broker
  #   render('update_ships_table')
  # end

  def upload_brokers_file
      begin
          uploaded_file = read_uploaded_file(params[:brokers])
          if uploaded_file[:error].blank?
              hash_format = convert_it_to_hash_format(uploaded_file[:data])
              result = update_and_create_broker(hash_format)
              @error_messages = result[:error]
          else
              @error_messages = [uploaded_file[:error]]
          end
          render('update_ships_table')
      rescue => e
          @error_messages = [e.message]
      end
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
          render('update_ships_table')
      rescue => e
          @error_messages = [e.message]
      end
  end

  def upload_ships_file
      begin
          uploaded_file = read_uploaded_file(params[:ships])

          if uploaded_file[:error].blank?
              hash_format = convert_it_to_hash_format(uploaded_file[:data])
              result = update_and_create_ships(hash_format)
              store_shipment_file_in_app(result[:data])
              @error_messages = result[:error]
          else
              @error_messages = [uploaded_file[:error]]
          end
          render('update_ships_table')
      rescue => e
          @error_messages = [e.message]
      end


  end

end
