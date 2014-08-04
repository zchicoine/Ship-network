class ChangeVesselClassFormatInShip < ActiveRecord::Migration
  def change
    change_column :ships, :vessel_class, :integer, default: 0 , 'integer USING CAST(vessel_class AS integer)'
  end
end
