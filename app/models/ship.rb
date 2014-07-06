class Ship < ActiveRecord::Base
    before_create{

    }
    enum vessel_type: [:notype, :sdbc, :ohbs , :mpp, :tween, :roro]

	has_many :shipments, dependent: :delete
	has_many :ports, :through => :shipments

end
