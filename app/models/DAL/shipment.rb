class Shipment < ActiveRecord::Base
	belongs_to :port
	belongs_to :ship
    has_and_belongs_to_many :brokers
end
