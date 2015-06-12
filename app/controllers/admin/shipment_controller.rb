###
# update or create shipment
###
class Admin::ShipmentController < ApplicationController
    include  AdminHelperC
    include AdminHelpers::ShipmentsHelperC

    layout 'admin'
    before_action :require_admin_authentication #the admin_helpers controller has to be protected to only let admins in.

    def index
        @shipments = ShipmentBLL.paginate(page: params[:page])
        render ('index')
    end

    def reset
        ShipmentBLL.destroy_all
        flash[:success] = 'Has been reset'
        redirect_to(admin_shipment_path)
    end

    def upload_shipments_file
        begin
            uploaded_file = read_uploaded_file(params[:shipments])
            if uploaded_file[:error].blank?
                hash_format = convert_it_to_hash_format(uploaded_file[:data])
                result = update_shipments(hash_format)
                @error_messages = result[:error]
            else
                @error_messages = [uploaded_file[:error]]
            end
        rescue => e
            @error_messages = ["Error in upload_shipments_file: #{e.message}"]
        end
        render('logs')
    end
end