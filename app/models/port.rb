class Port < ActiveRecord::Base
	has_many :shipments, :dependent => :delete
	has_many :ships, :through => :shipments
end
