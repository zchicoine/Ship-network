class ChangeVesselClassFormatInShip < ActiveRecord::Migration
  def change
    change_column :ships, :vessel_class, :integer, default: 0
  end
end
