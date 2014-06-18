class Ship < ActiveRecord::Base
	has_many :shipments
	has_many :ports, :through => :shipments
end
