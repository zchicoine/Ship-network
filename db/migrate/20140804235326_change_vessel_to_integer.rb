class ChangeVesselToInteger < ActiveRecord::Migration
  def change
      change_column :ships, :vessel_type,'integer USING CAST(vessel_type AS integer)', default: 0
      change_column :ships, :vessel_category, 'integer USING CAST(vessel_category AS integer)', default: 0

  end
end
