class BrokersShipments < ActiveRecord::Base
    belongs_to :shipment
    belongs_to :broker
end