class AddDeadweightCapacityToShips < ActiveRecord::Migration
  def change
    add_column :ships, :deadweight_cargo_capacity, :integer
  end
end
