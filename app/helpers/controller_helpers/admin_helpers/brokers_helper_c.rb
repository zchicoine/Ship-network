module AdminHelpers
    module BrokersHelperC
        # :description update or create a broker
        # :param [Json]
        # :return [Hash] {data: , error:}
        def update_and_create_broker(object)
            temp_hash ={}
            temp_hash[:error] = []
            temp_hash[:data] = []
            object.each do |broker|
                begin
                    result = UnitOfWork.instance.broker.get_by_email(broker['emailAddress'])
                    if (result[:error].nil?)
                        result[:value].update!(password: broker['password'],
                                               email: broker['emailAddress'],
                                               website:broker['website'],
                                               telephone: broker['telephone'],
                                               country: broker['country'],
                                               city:broker['city']
                        )
                    else
                        Broker.create!(username: broker['username'],
                                       password: broker['password'],
                                       email: broker['emailAddress'],
                                       website:broker['website'],
                                       telephone: broker['telephone'],
                                       country: broker['country'],
                                       city: broker['city']
                        )
                    end
                rescue => e
                    temp_hash[:error].push("#{e.message} for broker #{broker['emailAddress']}")
                end
            end
            temp_hash
        end
    end
end