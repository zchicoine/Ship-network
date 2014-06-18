class CreateShips < ActiveRecord::Migration
  def change
    create_table :ships do |t|
      t.string :name
      t.string :category
      t.string :built

      t.timestamps
    end
  end
end
