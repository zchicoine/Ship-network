class AddMarineGasolineOilToShipDetails < ActiveRecord::Migration
  def change
    add_column :ship_details, :marine_gasoline_oil?, :boolean
  end
end
