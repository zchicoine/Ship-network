class Ship < ActiveRecord::Base
	has_many :shipments
	has_many :ports, :through => :shipments

	validates :name,
		presence: true
	validates :latitude_coordinate,
		presence: true
	valdates :longitude_coordinate,
		presence: true
end
