class Port < ActiveRecord::Base
	has_many :shipments
	has_many :ships, :through => :shipments
end
