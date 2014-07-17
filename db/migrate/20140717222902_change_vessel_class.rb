class ChangeVesselClass < ActiveRecord::Migration
  def change
    rename_column :ships, :vessel_class, :vessel_category
  end
end
