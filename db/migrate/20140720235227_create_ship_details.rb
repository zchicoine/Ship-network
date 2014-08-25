class CreateShipDetails < ActiveRecord::Migration
  def change
    create_table :ship_details do |t|
      t.float :draft
      t.integer :built
      t.float :tons_per_centimeter
      t.string :flag
      t.string :classification_society
      t.float :length_over_all
      t.float :beam
      t.integer :holds
      t.integer :hatches
      t.integer :gross_registered_tonnage
      t.integer :net_registered_tonnage
      t.float :total_cubic_meters_GR
      t.float :total_cubic_meters_BL
      t.float :total_cubic_feet_GR
      t.float :total_cubic_feet_BL
      t.boolean :intermediate_fuel_oil_180?
      t.boolean :intermediate_fuel_oil_380?
      t.boolean :marine_diesel_oil?
      t.float :laden
      t.float :ballast
      t.integer :economic
      t.float :consumption_at_sea_L
      t.float :consumption_at_sea_B
      t.float :eco_consumption_L
      t.float :marine_diesel_oil_at_sea
      t.float :marine_gasoline_oil_at_sea
      t.float :consumption_in_port_Working
      t.float :consumption_in_port_Idle
      t.float :marine_diesel_in_port
      t.float :marine_gasoline_oil_in_port
      t.integer :number_of_cranes
      t.float :crane_capacity
      t.integer :combined_crane_capacity
      t.boolean :aussie_holds_ladders?
      t.boolean :CO2_system_on_board?
      t.boolean :twenty_foot_equivalent_unit?
      t.boolean :lakes_fitted?
      t.boolean :ice_classed?
      t.boolean :log_fitted?
      t.boolean :grabber?
      t.boolean :gearless?
      t.boolean :double_hull?
      t.boolean :imo_fitted?
      t.boolean :appendix_B_fitted?
      t.boolean :box_shaped_holds?
      t.boolean :cement_holes_fitted?
      t.boolean :marine_gasoline_oil?

      t.integer :ship_id
      t.timestamps
    end
    add_index :ship_details, :ship_id
  end
end
