class CreateShips < ActiveRecord::Migration
  def change
    create_table :ships do |t|
      t.string :name
      t.integer :built
      t.decimal :draft
      t.integer :deadweight
      t.integer :beam
      t.integer :loa
      t.string :vessel_type
      t.string :vessel_class

      t.timestamps
    end
  end
end
