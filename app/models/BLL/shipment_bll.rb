# TODO review this file and delete unnecessary comments and code

class ShipmentBLL < Shipment
    extend CustomQuery
    # this class will have special query that involved shipment table

    # :param [String] email address of a broker, port name,  ship name
    # :description  this method should return all the data for the shipments
    # :return {value:{broker_name:, broker_email:, broker_company:, broker_website:,
    # broker_telephone:, roker_country:, broker_city:, email_body:, email_subject:,
    # email_date:, open_start_date:, open_end_date:, deadweight_cargo_capacity:,
    # deadweight:, vessel_category:, ship_name:, port_name:}, error:nil}
    def get_shipment_data(email_address,port_name,ship_name)
        begin
            # get shipment
            shipment = ShipmentBLL.joins(:port).includes(:ship).where(
                'ports.name' => port_name, 'ships.name' => ship_name).execute_query(1)
            # TODO
            ship_email = ShipEmailBLL.joins(:shipments).includes(:broker).where(
                'brokers.email' => email_address, 'shipments.id' => shipment.id).execute_query(1)

            unless ship_email.nil?
                convert_to_ruby_hash = {
                    broker_name: ship_email.broker.username,
                    broker_email: email_address,
                    broker_company:ship_email.broker.company,
                    broker_website:ship_email.broker.website,
                    broker_telephone:ship_email.broker.telephone,
                    broker_country:ship_email.broker.country,
                    broker_city:ship_email.broker.city,
                    email_body:ship_email[:email_body],
                    email_subject:ship_email[:email_subject],
                    email_date:ship_email[:email_date],
                    open_start_date: shipment[:open_start_date].to_date,
                    deadweight_cargo_capacity: shipment.ship.deadweight_cargo_capacity,
                    deadweight: shipment.ship.deadweight,
                    vessel_category: shipment.ship.vessel_category,
                    ship_name: ship_name,
                    port_name:  port_name
                }
                return {value:convert_to_ruby_hash, error:nil}
            else
                return {value:'', error:"No data for #{email_address} with ship: #{ship} and port: #{port}"}
            end

        rescue Exception => e

            {value:'', error:e}
        end
    end




    def get_open_port_date_and_end ship_name = "", port_name = ""
      result = ShipBLL.joins(:ports).select("shipments.open_start_date","shipments.open_end_date", "ports.name").where(
          "ports.name" => port_name,name:ship_name).execute_query 1
      unless result.blank?
        coverted_to_ruby_hash = {open_start_date: result[:open_start_date].to_date , open_end_date: result[:open_end_date], name: result[:name] }
        return {value: coverted_to_ruby_hash, error: nil}
      else
        return {value: 0, error: "Error:  #{ship_name }  and  #{port_name} has no relationship "}
      end
    end

    def get_ship_broker ship_name = "", port_name = ""
      result = ShipBLL.joins(:ports, :shipments => [:brokers]).select("brokers.*",
                      ).where(
          "ports.name" => port_name,name:ship_name).execute_query 1

      unless result.blank?
        coverted_to_ruby_hash = {broker_name: result[:username], broker_email: result[:email],broker_company:result[:company]}
        return {value: coverted_to_ruby_hash, error: nil}
      else
        return {value: 0, error: "Error:  #{ship_name }  and  #{port_name} has no relationship "}
      end
    end


    # the format return
    # return hash {value: result/0 and error: nil/message}
    #result = ["region name", latitude,longitude ]=>shipNumber
    def get_name_And_coordinates_of_Ports_and_number_of_ship_per_Region region_name = "null"

        result =  PortBLL.joins(:shipments).query_at_a_region(region_name).group(:name, :latitude, :longitude).count

         unless result.blank?
             return {value: result, error: nil}
         else
             return {value: 0, error: "Error: either #{region_name } has no ports or it does not support by the system"}
         end
    end
    #result = ["region name", latitude,longitude ]
    def get_name_and_coordinates_of_Ports_that_has_ships_per_Region region_name = "null"

        result =  PortBLL.joins(:shipments).select(:name, :latitude, :longitude).query_at_a_region(region_name).group(:name, :latitude, :longitude)

        unless result.blank?
            return {value: result, error: nil}
        else
            return {value: 0, error: "Error: either #{region_name } has no ports or it does not support by the system"}
        end
    end
    def get_name_of_Ports_that_has_ships_per_Region region_name = "null"

        result =  PortBLL.joins(:shipments).select(:name).query_at_a_region(region_name).group(:name)

        unless result.blank?
            return {value: result, error: nil}
        else
            return {value: 0, error: "Error: either #{region_name } has no ports or it does not support by the system"}
        end
    end

    # return total number of ships global,
    # each ship will be count once
    def get_total_number_of_ships_count_once
       result = Shipment.distinct().count(:ship_id)
        unless result.blank?
            return {value: result, error:nil}
        else
            return {value: 0, error: "Error: in ShipmentBLL get_total_number_of_ships_count_once()"}
        end
    end

end