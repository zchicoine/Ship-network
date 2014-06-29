class ChangeDateFormatInShipment < ActiveRecord::Migration
  def change
  	change_column :shipments, :open_start_date, :date
  	change_column :shipments, :open_end_date, :date
  end
end
