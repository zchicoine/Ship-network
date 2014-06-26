class Port < ActiveRecord::Base

    # we need to add region column.

	has_many :shipments
	has_many :ships, :through => :shipments
  validates :name,
            presence: true
  validates :latitude_coordinate,
            presence: true
  validates :longitude_coordinate,
            presence: true

		
end
