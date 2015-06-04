class CreateBrokersShipments < ActiveRecord::Migration
  def change
    create_table :brokers_shipments , id: false do |t|
        t.belongs_to :shipment
        t.belongs_to :broker
    end
    add_index 'brokers_shipments', %w(shipment_id broker_id), :unique => true
  end
end
