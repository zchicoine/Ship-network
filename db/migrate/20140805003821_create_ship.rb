class CreateShip < ActiveRecord::Migration
  def change
    create_table :ships do |t|
        t.string :name
        t.integer :deadweight
        t.integer :deadweight_cargo_capacity
        t.integer :vessel_type
        t.integer :vessel_category

        t.timestamps
    end
  end
end
