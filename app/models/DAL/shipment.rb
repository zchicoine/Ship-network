class Shipment < ActiveRecord::Base


    # validation
    validates :port, :presence => true
    validates :ship, :presence => true
    # relationship
	belongs_to :port
	belongs_to :ship
    has_one :brokers_shipments
    has_many :brokers, :through => :brokers_shipments, :dependent => :destroy
end
