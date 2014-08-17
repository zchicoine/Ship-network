class CreatePorts < ActiveRecord::Migration
  def change
    create_table :ports do |t|
      t.string :name
      t.float :latitude
      t.float :longitude
      t.string :region

      t.timestamps
    end
    add_index :ports, :name, :unique => true
  end
end
