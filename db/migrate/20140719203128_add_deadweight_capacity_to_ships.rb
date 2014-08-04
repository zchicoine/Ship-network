class AddDeadweightCapacityToShips < ActiveRecord::Migration
  def change
    add_column :ships, :deadweight_cargo_capacity, :integer #'integer USING CAST(vessel_type AS integer)'
  end
end
