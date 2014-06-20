class CreateShipments < ActiveRecord::Migration
  def change
    create_table :shipments do |t|
      t.integer :port_id
      t.integer :ship_id
      t.datetime :open_start_date
      t.datetime :open_end_date
      
      t.timestamps
    end
    # add_index lines make it faster to access information via the join model
    add_index :shipments, :port_id
    add_index :shipments, :ship_id
  end
end
