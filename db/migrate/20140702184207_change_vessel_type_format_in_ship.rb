class ChangeVesselTypeFormatInShip < ActiveRecord::Migration
    def change
        change_column :ships, :vessel_type, :integer, default: 0
    end
end