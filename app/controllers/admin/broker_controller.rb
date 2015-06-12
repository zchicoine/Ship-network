class Admin::BrokerController < ApplicationController
    include  AdminHelperC
    include  AdminHelpers::BrokersHelperC

    layout 'admin'
    before_action :require_admin_authentication #the admin_helpers controller has to be protected to only let admins in.

    def index
        @brokers = BrokerBLL.all
        render ('index')
    end
    def reset
        BrokerBLL.destroy_all(:admin => false)
        flash[:success] = 'Has been reset'
        redirect_to(admin_broker_path)
    end
    def upload_brokers_file
        begin
            uploaded_file = read_uploaded_file(params[:brokers])
            if uploaded_file[:error].blank?
                hash_format = convert_it_to_hash_format(uploaded_file[:data])
                result = update_and_create_broker(hash_format)
                flash[:error] = result[:error]
            else
                flash[:error] =[] if flash[:error].blank?
                flash[:error].push(uploaded_file[:error])

            end

        rescue => e
            flash[:error] =[] if flash[:error].blank?
            flash[:error].push(e.message)

        end
        if flash[:error].blank?
            flash[:success]= 'successful'
        end
        redirect_to(admin_broker_path)
    end
end