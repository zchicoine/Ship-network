class BrokerBLL < Broker
    extend CustomQuery
    # :param [String] email address of a broker
    # :description get and return the number of ship personal order and not ship emails
    # :return [Hash] {value: {ship:, personal, order:, not_ship:}, error:nil}
    def get_emails_status(email_address)
        begin
            result = BrokerBLL.select(:ship_emails,:personal_emails,:order_emails,:not_ship_emails).where(email:email_address).execute_query(1)
            unless result.blank?
                {value:{ship:result.ship_emails,personal:result.personal_emails,order:result.order_emails,not_ship:result.not_ship_emails}, error:nil}
            else
                {value:'',error:'No information is available '}
            end
        rescue Exception => e
            {value:'',error:e}
        end
    end
end