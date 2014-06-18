class CreatePorts < ActiveRecord::Migration
  def change
    create_table :ports do |t|
      t.string :name
      t.float :latitude_coordinate
      t.float :longitude_coordinate

      t.timestamps
    end
  end
end
