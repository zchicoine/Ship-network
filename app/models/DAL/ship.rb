class Ship < ActiveRecord::Base

    validates_presence_of :name
    validates_uniqueness_of :name, case_sensitive: false
    validates :deadweight, numericality: {greater_than_or_equal_to: 0}
    validates :deadweight_cargo_capacity, numericality: {greater_than_or_equal_to: 0}, if: :deadweight_validates?
    validates :vessel_category,presence: true, if: :vessel_category_validates?
    validate  :vessel_type_validates?

    enum vessel_type: [:notype, :sdbc, :ohbs , :mpp, :tween, :roro]
    enum vessel_category: [:No_Type, :MiniBulker, :Handysize, :Handymax , :Supramax, :Panamax, :PostPanamax, :Capesize]

    has_one :ship_detail, :dependent => :destroy
    accepts_nested_attributes_for :ship_detail, update_only: true
    has_many :shipments
    has_many :ports, :through => :shipments, :dependent => :destroy

    def deadweight_validates?
        if deadweight <= 0 and deadweight_cargo_capacity <= 0
            errors.add(:deadweight, 'and Deadweight cargo capacity cannot both be <= 0 or nil')
        else
            true
        end
    end

    def vessel_category_validates?
        unless (deadweight == 0)
            case deadweight
                when 100000..10000000000
                    if (Ship.vessel_categories[vessel_category] != 7)

                        errors.add(:vessel_category, "vessel_category doesn't correspond to deadweight")
                    end
                when 80000..100000

                    if (Ship.vessel_categories[vessel_category] != 6)
                        errors.add(:vessel_category, "vessel_category doesn't correspond to deadweight")
                    end

                when 65000..80000
                    if (Ship.vessel_categories[vessel_category] != 5)
                        errors.add(:vessel_category, "vessel_category doesn't correspond to deadweight")
                    end
                when 50000..65000
                    if (Ship.vessel_categories[vessel_category] != 4)
                        errors.add(:vessel_category, "vessel_category doesn't correspond to deadweight")
                    end
                when 38000..50000
                    if (Ship.vessel_categories[vessel_category] != 3)
                        errors.add(:vessel_category, "vessel_category doesn't correspond to deadweight")
                    end
                when 18000..38000
                    if  (Ship.vessel_categories[vessel_category] !=2)
                        errors.add(:vessel_category, "vessel_category doesn't correspond to deadweight")
                    end
                when 0..18000
                    if (Ship.vessel_categories[vessel_category] != 1)
                        errors.add(:vessel_category, "vessel_category doesn't correspond to deadweight")
                    end
            end
        #else
         # if (deadweight_cargo_capacity == 0)
         #   errors.add(:deadweight_cargo_capacity, "Either deadweight or deadweight cargo capacity must be present")
         # end
        end

    end

    def vessel_type_validates?
        if vessel_type.nil?
                 errors.add(:vessel_type, "vessel_type cannot be  nil")
        end

    end
end
