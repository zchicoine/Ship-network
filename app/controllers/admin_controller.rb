#require "json"
#require "rchardet"

class AdminController < ApplicationController
  include  AdminHelperC

  before_action :require_admin_authentication #the admin controller has to be protected to only let admins in.

  def index
      render ('index')  #render the admin view. The main page controller calls this action after the admin logs in
  end

  def update_shipments_table
    @error_messages_for_shipments = []
    json_file = open_the_json_file
    hash_object = hash_the_json_file (json_file)
    @error_messages_for_shipments = update_shipments (hash_object)
    update_broker
    render ('update_ships_table')
  end

  def upload_ports_file
    uploaded_file = read_uploaded_file (params[:ports].read.encode!('UTF-8', 'binary', invalid: :replace, undef: :replace, replace: ''))
    hash_format = convert_it_to_hash_format (uploaded_file)
    alternative_port_name_file = update_and_create_ports (hash_format)
    store_alternative_port_name_file_in_app (alternative_port_name_file)
    render "index"
#    flash[:notice] = "File uploaded"
  end

  def upload_ships_file
    uploaded_file = read_uploaded_file (params[:ships].read.encode!('UTF-8', 'binary', invalid: :replace, undef: :replace, replace: ''))
    hash_format = convert_it_to_hash_format (uploaded_file)
    shipment_file = update_and_create_ships (hash_format)
    store_shipment_file_in_app (shipment_file)
    render "index"
  end

end
