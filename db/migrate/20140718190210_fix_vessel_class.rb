class FixVesselClass < ActiveRecord::Migration
  def change
    rename_column :ships, :vessel_category, :vessel_class
  end
end
