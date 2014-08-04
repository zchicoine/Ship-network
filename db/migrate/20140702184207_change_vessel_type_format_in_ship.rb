class ChangeVesselTypeFormatInShip < ActiveRecord::Migration
    def change
        change_column :ships, :vessel_type,'integer USING CAST(vessel_type AS integer)', default: 0
    end
end
