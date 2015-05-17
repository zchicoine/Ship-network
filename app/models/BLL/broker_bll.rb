class BrokerBLL < Broker
    extend CustomQuery
    # :param [String] email address of a broker
    # :description get and return the number of ship personal order and not ship emails
    # :return [Hash] {value: {ship:, personal, order:, not_ship:}, error:nil}
    def get_emails_status(email_address)
        begin
            result = BrokerBLL.select(:num_ship_emails,:num_personal_emails,:num_order_emails,:num_not_ship_emails).where(email:email_address).execute_query(1)
            unless result.blank?
                {value:{ship:result.num_ship_emails,personal:result.num_personal_emails,order:result.num_order_emails,not_ship:result.num_not_ship_emails}, error:nil}
            else
                {value:'',error:'No information is available '}
            end
        rescue Exception => e
            {value:'',error:e}
        end
    end
end