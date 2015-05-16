class CreateBrokersShipments < ActiveRecord::Migration
  def change
    create_table :brokers_shipments , id: false do |t|
        t.belongs_to :shipment
        t.belongs_to :broker
    end
  end
end
