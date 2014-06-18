class CreateShipments < ActiveRecord::Migration
  def change
    create_table :shipments do |t|
      t.integer :port_id
      t.integer :ship_id
      t.datetime :open_start_date
      t.datetime :open_end_date
      
      t.timestamps
    end
  end
end
