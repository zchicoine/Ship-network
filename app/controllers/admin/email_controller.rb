###
# Emails
###
class Admin::EmailController < ApplicationController
    include  AdminHelperC

    layout 'admin'
    before_action :require_admin_authentication #the admin_helpers controller has to be protected to only let admins in.

    def index
        render ('index')
    end

    def categorize
        flash[:success] = " #{Kee.new.categorize_emails(50)} has been categorize"
        render('index')
    end

    def categorize_update
        flash[:success] = 'successful but this feature is not yet implement'
        render('index')
    end
    def update_broker_ship_emails
        broker_result = UnitOfWork.instance.broker.get_by_email(params[:broker_email])
        if broker_result[:error].nil?
            emails = Kee.new.obtain_ship_emails(broker_result[:value].email)
            if emails.blank?
                flash[:error] = "There are no ship emails for #{broker_result[:value].email}"
            else
                emails.each do |email|
                    begin
                    ShipEmail.create! do |s|
                        s.email_subject = email[:subject]
                        s.email_body = email[:body]
                        s.email_date =  DateTime.parse(email[:date].to_s).to_date
                        s.broker_id = broker_result[:value].id
                    end
                    rescue => e
                        flash[:error] =[] if flash[:error].blank?
                        flash[:error].push("#{e}   for #{email[:subject]}")
                    end
                end
               if flash[:error].blank?
                   flash[:success]= 'successful'
               end
            end
        else
            flash[:error] = broker_result[:error]
        end
        render('index')

    end
end