module AdminHelpers
    module PortsHelperC
        # :description update or create new port
        # :param [Array of hash] {'region' =>, 'portNames' =>,'alternatePortNames' =>,'latitudeDecimal' =>,'longitudeDecimal' =>,}
        # :return [Hash] of all the ports name and their alternative names
        #  As an example {'a':'a','aa':'a'} so both a and aa are same port with different names
        #  {error:[Array of errors]}
        def update_and_create_ports(object)
            tempHash = {}
            tempHash[:error] = [] # store all the errors
            tempHash[:data] = {} # store all the data
            object.each do |port|
                begin
                    region =  port['region'].to_s
                    @name = port['portNames'].to_s
                    latitude = port['latitudeDecimal'].to_f
                    longitude = port['longitudeDecimal'].to_f

                    # create a hash for alternative port name. Alternative port name are in the same file as port info, so we can do this here.
                    # The key is the alt. name. So for shipments, we will look at the hash file to find the real name of the port (the value)

                    alternative_port_names_array = port['alternatePortNames'].to_s.split(',')

                    unless alternative_port_names_array.empty?
                        alternative_port_names_array.each do |alt_name|
                            tempHash[:data][alt_name.to_s.strip.downcase] = @name.to_s.downcase
                        end
                    end
                    tempHash[:data][@name.to_s.strip.downcase] = @name.to_s.downcase           #add also the real name of the port to map to itself

                    current_port = UnitOfWork.instance.port.get_by_name(@name.to_s)
                    if current_port[:error].nil?
                        current_port[:value].update(latitude: latitude.to_f, longitude: longitude.to_f, region: region.to_s)
                    else
                        Port.create!(name: @name.to_s, latitude: latitude.to_f, longitude: longitude.to_f, region: region.to_s)
                    end
                rescue => e
                    tempHash[:error].push(e.message + ' for port: ' + @name.to_s)
                end
            end
            return tempHash
        end

        # :description TODO
        # :param [Hash] where a key is a port name and value the actual port name
        def store_alternative_port_name_file_in_app(object)
            File.open('app/assets/javascripts/json/alternative_port_names.json', 'w') do |f|
                f.write(object.to_json)
            end
        end
    end
end