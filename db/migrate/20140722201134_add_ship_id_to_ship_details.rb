class AddShipIdToShipDetails < ActiveRecord::Migration
  def change
    add_column :ship_details, :ship_id, :integer
    add_index :ship_details, :ship_id
  end
end
