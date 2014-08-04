class ChangeVesselClassFormatInShip < ActiveRecord::Migration
  def change
    change_column :ships, :vessel_class, 'integer USING CAST(vessel_class AS integer)', default: 0
  end
end
