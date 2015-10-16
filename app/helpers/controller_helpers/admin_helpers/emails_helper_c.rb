# AdminHelpers::EmailsHelperC.recognition_script(email)

module AdminHelpers
	module EmailsHelperC
  	class << self
	    def find_vessels_in_email_and_their_index (body_of_email)
	        list_of_vessels_and_their_indices = Array.new
	        body_of_email.downcase!

	        ShipBLL.find_each do |ship|
	        	name = ship.name.downcase
	          if (body_of_email.include? name)
	            list_of_vessels_and_their_indices.push([body_of_email.index(name), name])
	          end
	        end
	        # Sort the vessels in ascending order based on their location in the email body
	        if (list_of_vessels_and_their_indices.empty?)
	        	raise "No ships found in the body of the email"
	          # return {value: {}, error: "Error 0: no ships were found in the body of the email"}
	        else
	          list_of_vessels_and_their_indices = list_of_vessels_and_their_indices.sort {|a,b| a[0] <=> b[0]}
	          return {value: list_of_vessels_and_their_indices, error: nil}
	        end
	    end


	    def chunk_of_text_between_vessel_names(vessels_and_their_indices, body_of_email)
	        list_of_slices_of_text = Array.new
	        length_of_vessels_array = vessels_and_their_indices.length
	        index_at_vessel = vessels_and_their_indices
	        # Cut text from one ship name's index to the next
	        for i in 0..vessels_and_their_indices.length - 2
	          list_of_slices_of_text.push(body_of_email[index_at_vessel[i][0]..(index_at_vessel[i+1][0]-1)])
	        end
	        # Cut text from last ship name's index to the end of the text
	        list_of_slices_of_text.push(body_of_email[index_at_vessel[length_of_vessels_array - 1][0]..-1])
	        return list_of_slices_of_text
	    end

	    def find_port_names(vessels_and_their_indices, list_of_slices_of_text, body_of_email)
	      list_of_ports_associated_to_ships = Array.new
	      all_ports_in_each_chunk_of_text = Array.new
	      p beginning_of_email = body_of_email[0...(vessels_and_their_indices[0][0])]
	      #For each chunk of text, we collect the ports it includes
	      for i in 0...list_of_slices_of_text.length
	        PortBLL.find_each {|port|
	        	name = port.name.downcase
	          if(list_of_slices_of_text[i].include? name)
	            all_ports_in_each_chunk_of_text.push([list_of_slices_of_text[i].index(name), name])
	          end
	          #We check also if from the beginning of the email until the first vessel found there are any ports found which would mean that we missed a vessel
	          #usually vessels always come before ports
	          if(beginning_of_email.include? name)
	          	raise "Error 1: a human should handle this message because port name: '#{name}' was found before the first found vessel which indicates that we might have missed a previous vessel"
	            # return{value: {}, error: "Error 1: a human should handle this message because port name: \'" + name +
	                # " \' was found before the first found vessel which indicates that we might have missed a previous vessel"}
	          end
	        }
	        if(all_ports_in_each_chunk_of_text.length == 0)
	          vessel = vessels_and_their_indices[i][1]
	          raise "Error 1: a human should handle this message because vessel: '#{vessel}' is missing its associated port"
	          # return {value: {}, error: "Error 1: a human should handle this message because vessel: \'" + vessel + "\' is missing its associated port"}
	        end
	        # We sort all the ports found in the chunk of text based on their index position in that text
	        all_ports_in_each_chunk_of_text = all_ports_in_each_chunk_of_text.sort {|a,b| a[0] <=> b[0]}

	        # We associate the first port found to the ship in that chunk
	        list_of_ports_associated_to_ships.push([vessels_and_their_indices[i][1], all_ports_in_each_chunk_of_text[0][1]])
	        # We clear the ports array so that it will be available for next iteration of this for loop
	        all_ports_in_each_chunk_of_text.clear
	      end
	      return {value: list_of_ports_associated_to_ships, error: nil}
	    end

	    def find_email_addresses(vessels_and_their_indices, body_of_email)
	      list_of_email_addresses_and_their_indices = Array.new
	      # Cut from beginning of text to first vessel name to find email address
	      first_chunk_of_text = [body_of_email[0..vessels_and_their_indices[0][0]]]
	      # split that chunk of text by white space to have a list of words
	      first_chunk_of_text = first_chunk_of_text[0].split
	      # look for words containing '@'
	      first_chunk_of_text.each { |word|
	        if(word.include? '@')
	          list_of_email_addresses_and_their_indices.push([body_of_email.index(word), word])
	        end
	      }
	      # sort them by index and return list, but first make sure that an email address was retrieved.
	      if(list_of_email_addresses_and_their_indices.length == 0)
	      	raise "Error 2: The body of email did not contain any email addresses (from beginning of text to the first vessel name)."
	        # return {value: {}, error: "Error 2: The body of email did not contain any email addresses (from beginning of text to the first vessel name)."}
	      else
	        list_of_email_addresses_and_their_indices = list_of_email_addresses_and_their_indices.sort {|a,b| a[0] <=> b[0]}
	        return {value: list_of_email_addresses_and_their_indices, error: nil}
	      end
	    end

	    def recognition_script(email, broker, ship_email)
	      list_of_vessel_and_their_indices_in_text = Array.new
	      list_of_ports_and_ships = Array.new
	      list_of_email_address_and_their_indices = Array.new
	      list_of_chunks_of_text_between_vessels = Array.new
	      # We get all the vessels in the body of the email received
	      list_of_vessel_and_their_indices_in_text = find_vessels_in_email_and_their_index(email)
	      unless(list_of_vessel_and_their_indices_in_text[:error].nil?)
	        return list_of_vessel_and_their_indices_in_text[:error]
	      end
	      # We will split our received email in chunks from one vessel name to the next until the end using the retrieved indices
	      list_of_chunks_of_text_between_vessels = chunk_of_text_between_vessel_names(list_of_vessel_and_their_indices_in_text[:value], email)
	      # We will go through each chunk of text and scan it for port names and return a list of (port-ship) associations
	      list_of_ports_and_ships = find_port_names(list_of_vessel_and_their_indices_in_text[:value],list_of_chunks_of_text_between_vessels, email)
	      unless(list_of_ports_and_ships[:error].nil?)
	        return list_of_ports_and_ships[:error]
	      end
	      #  We get the emails in the addresses ("@") found in the body of the email received
	      list_of_email_address_and_their_indices = find_email_addresses(list_of_vessel_and_their_indices_in_text[:value], email)
	      unless(list_of_email_address_and_their_indices[:error].nil?)
	        return list_of_email_address_and_their_indices[:error]
	      end
	      shipment_count = 0
	      list_of_ports_and_ships[:value].each_with_index do |ps|
	        ship = Ship.find_by_name(ps[0].downcase)
	        port = Port.find_by_name(ps[1].downcase)
	        today = Date.today
	        open_start_date = Date.new(today.year, today.month, 5)
	        open_end_date = Date.new(today.year, today.month, 25)
	        shipment =  ShipmentBLL.create(ship_id: ship.id, port_id: port.id, open_start_date: open_start_date, open_end_date: open_end_date)
	        broker.shipments << shipment
	        ship_email.shipments << shipment
	        shipment_count += 1
	      end
	      return shipment_count
	    end
	  end
  end
 end