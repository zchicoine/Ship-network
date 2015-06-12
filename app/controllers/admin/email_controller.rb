###
# Emails
###
class Admin::EmailController < ApplicationController
    include  AdminHelperC
    layout 'admin'
    before_action :require_admin_authentication #the admin_helpers controller has to be protected to only let admins in.

    def index
        @emails = ShipEmailBLL.order('id').paginate(page: params[:page] )
        render ('index')
    end

    def reset
        Kee.new.remove_stars
        ShipEmailBLL.destroy_all
        flash[:success] = 'Has been reset'
        redirect_to(admin_email_path)
    end

    def categorize
        flash[:success] = " #{Kee.new.categorize_emails(50)} has been categorize"
        redirect_to(admin_email_path)
    end

    def categorize_update
            Broker.all.each do |broker|
                begin
                    status = Kee.new.obtain_emails_status(broker.email)
                    broker.num_ship_emails = status[:num_ship]
                    broker.num_not_ship_emails = status[:num_not_ship]
                    broker.num_order_emails = status[:num_order]
                    broker.num_personal_emails = status[:num_personal]
                    broker.save!
                rescue => e
                    flash[:error] =[] if flash[:error].blank?
                    flash[:error].push("#{e} for #{broker.email}")
                end
            end
            if flash[:error].blank?
                flash[:success]= 'successful'
            end
        redirect_to(admin_email_path)
    end
    def update_broker_ship_emails
        broker_result = UnitOfWork.instance.broker.get_by_email(params[:broker_email])
        if broker_result[:error].nil?
            emails = Kee.new.obtain_ship_emails(broker_result[:value].email,10)
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
        redirect_to(admin_email_path)
    end
end