class Ship < ActiveRecord::Base

  validates_presence_of :name
  validates_uniqueness_of :name
  validates_numericality_of :deadweight, :greater_than => 0

  enum vessel_type: [:notype, :sdbc, :ohbs , :mpp, :tween, :roro]

	has_many :shipments
	has_many :ports, :through => :shipments, :dependent => :destroy

end
