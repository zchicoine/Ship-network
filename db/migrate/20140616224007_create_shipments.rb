class CreateShipments < ActiveRecord::Migration
  def change
    create_table :shipments do  |t|
      t.belongs_to :ship
      t.belongs_to :port
      t.date :open_start_date, null: false
      t.date :open_end_date
      
      t.timestamps
    end
    add_index 'shipments', %w(ship_id port_id), :unique => true
  end
end
