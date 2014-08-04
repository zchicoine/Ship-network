class Shipment < ActiveRecord::Base
	belongs_to :port
	belongs_to :ship 
end
