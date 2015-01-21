class ShipDetail < ActiveRecord::Base
  belongs_to :ship

  validates :built, numericality: {less_than_or_equal_to: Time.now.year}
end
