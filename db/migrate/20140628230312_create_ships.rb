class CreateShips < ActiveRecord::Migration
  def change
    create_table :ships do |t|
      t.string :name
      t.integer :deadweight
      t.integer :deadweight_cargo_capacity
      t.integer :vessel_type , default: 0
      t.integer :vessel_category, default: 0

      t.timestamps
    end

    add_index :ships, :name, :unique => true
  end
end
