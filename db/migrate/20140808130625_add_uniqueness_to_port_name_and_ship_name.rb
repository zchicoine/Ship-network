class AddUniquenessToPortNameAndShipName < ActiveRecord::Migration
  def change
      add_index :ports, :name, :unique => true
      add_index :ships, :name, :unique => true
  end
end
