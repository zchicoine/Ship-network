class Admin::BrokerController < ApplicationController
    include  AdminHelperC

    layout 'admin'
    before_action :require_admin_authentication #the admin_helpers controller has to be protected to only let admins in.

    def index
        @brokers = BrokerBLL.all
        render ('index')
    end

end