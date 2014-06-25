class Port < ActiveRecord::Base
	has_many :shipments
	has_many :ships, :through => :shipments

	validates :name,
		presence: true
	validates :built,
		presence: true
	validates :category,
		presence :true
		
end
