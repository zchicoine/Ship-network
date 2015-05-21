###
# update or create shipment
###
class Admin::ShipmentController < ApplicationController
    include  AdminHelperC

    layout 'admin'
    before_action :require_admin_authentication #the admin_helpers controller has to be protected to only let admins in.

    def index
        render ('index')
    end

    def upload_shipments_file

    end
end