class RemoveFieldsFromShips < ActiveRecord::Migration
  def change
    remove_column :ships, :built
    remove_column :ships, :draft
    remove_column :ships, :beam
    remove_column :ships, :loa
  end
end
