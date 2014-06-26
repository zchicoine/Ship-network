class Ship < ActiveRecord::Base
	has_many :shipments
	has_many :ports, :through => :shipments

  validates :name,
            presence: true
  validates :built,
            presence: true
  validates :category,
            presence: true
end
